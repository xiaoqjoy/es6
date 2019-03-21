<template>
  <section class="import-data">
    <div class="dialog-box" v-if="uploadStatus==='SUCCESS'">
      <div class="success-box">
        <div class="success-info">
          导入成功
          <span class="c-green">{{successData.successCount}}</span> 条数据，失败
          <span class="c-red">{{successData.errCount}}</span> 条
        </div>
        <el-button size="mini" v-if="successData.errCount" @click="downError">下载失败内容</el-button>
      </div>
    </div>
    <div class="dialog-box" v-else>
      <div class="down-div">
        <el-button type="text" icon="el-icon-download" @click="downloadTemplate">下载导入模版</el-button>
      </div>
      <div class="upload-div">
        <el-row>
          <el-col :span="8" class="font-r">
            <span class="c-9">所在城市：</span>
          </el-col>
          <el-col :span="16">
            <span>{{city.desc}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" class="font-r">
            <span class="c-9 line-30">选择文件：</span>
          </el-col>
          <el-col :span="16" v-if="uploadStatus==='BEFORE_UPLOAD'">
            <span class="line-30">{{fileName}}</span>
          </el-col>
          <el-col :span="16" v-else>
            <el-upload class="upload-demo" accept="application/vnd.ms-excel" :show-file-list="false" action="" :http-request="beforeUpload">
              <el-button size="mini" type="success">选择文件</el-button>
              <div slot="tip" class="c-red font-12 mart-10" v-if="uploadStatus==='UN_UPLOAD'">未选择任何文件/文件名称</div>
              <div slot="tip" class="c-red font-12 mart-10" v-if="uploadStatus==='FAIL'">上传文件失败，请稍后再试</div>
            </el-upload>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="dialog-footer">
      <el-button type="primary" size="mini" @click="handelConfirm" v-if="uploadStatus==='SUCCESS'">确定</el-button>
      <slot v-else>
        <el-button type="primary" size="mini" @click="uploadFile">导入</el-button>
        <el-button size="mini" @click="closeDialog">取消</el-button>
      </slot>
    </div>
  </section>
</template>
<script>
import { $downloadFile } from '@/assets/js/utils';
export default {
  name: 'ImportData',
  data() {
    return {
      uploadStatus: 'UN_UPLOAD', // 上层文件的状态（'UN_UPLOAD','BEFORE_UPLOAD','UPLOADING','SUCCESS','FAIL'）
      fileName: '',
      fileData: null
    };
  },
  props: {
    city: Object, // 上传文件的城市 {city: String,value: String}
    uploadUrl: String, // 上传文件的地址
    downloadTemplateUrl: String, // 下载导入模板的地址
    downErrorUrl: String // 下载导入后的错误信息地址
  },
  created() {

  },
  methods: {
    // 选择文件后，上传之前
    beforeUpload(e) {
      this.uploadStatus = 'BEFORE_UPLOAD';
      this.fileName = e.file.name;
      this.fileData = e;
    },
    // 上传文件
    uploadFile() {
      if (this.uploadStatus !== 'BEFORE_UPLOAD') {
        this.$message.warning('请先选择需要导入的文件');
        return;
      }
      let loading = this.$loading({
        lock: true,
        text: '导入中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
        customClass: 'export-loaing'
      });
      let formData = new FormData();
      let file = this.fileData.file;
      formData.append('file', file);
      this.$axios.post(this.uploadUrl, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        params: {
          city: this.city.value
        }
      }).then(({ data }) => {
        loading.close();
        if (data.status === 'C0000') {
          this.uploadStatus = 'SUCCESS';
          this.successData = data.result;
        } else {
          this.uploadStatus = 'FAIL';
          this.fileData = null;
          this.$message.error(data.message);
        }
      }).catch(err => {
        loading.close();
        this.uploadStatus = 'FAIL';
        this.fileData = null;
        this.$message.error(err.message || '服务器异常');
      });
    },
    // 关闭弹窗
    closeDialog() {
      this.$emit('changeDialog', false);
    },
    // 导入后的确认
    handelConfirm() {
      this.$emit('refreshData');
    },
    // 下载导入模版
    downloadTemplate() {
      // window.location.href = window.location.origin + this.$axios.defaults.baseURL + this.downloadTemplateUrl;
      this.$axios.get(this.downloadTemplateUrl, {
        responseType: 'blob'
      }).then((res) => {
        if (res.data.size) {
          let fileName = decodeURI(res['headers']['content-disposition'].split('filename = ')[1]);
          let blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' });
          $downloadFile(window.URL.createObjectURL(blob), fileName);
        } else {
          this.$message.error(res.data.message || '下载模版失败，请稍后再试');
        }
      }).catch(err => {
        this.$message.error(err.message || '下载模版失败，请稍后再试');
      });
    },
    // 下载导入后的错误信息
    downError() {
      // window.location.href = window.location.origin + this.$axios.defaults.baseURL + this.downErrorUrl + '?id=' + this.successData.errId;
      this.$axios.get(this.downErrorUrl, {
        params: {
          id: this.successData.errId
        },
        responseType: 'blob'
      }).then((res) => {
        if (res.data.size) {
          let fileName = decodeURI(res['headers']['content-disposition'].split('filename = ')[1]);
          let blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' });
          $downloadFile(window.URL.createObjectURL(blob), fileName);
        } else {
          this.$message.error(res.data.message || '下载错误信息失败，请稍后再试');
        }
      }).catch(err => {
        this.$message.error(err.message || '下载错误信息失败，请稍后再试');
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.import-data {
  .dialog-box {
    height: 250px;
    overflow-y: auto;
  }
  .down-div {
    text-align: center;
    padding: 5px 0;
    background: #eeeeee;
  }
  .upload-div {
    padding: 20px 0;
    .el-row {
      margin-top: 20px;
    }
    .line-30 {
      line-height: 30px;
    }
  }
  .success-box {
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    .success-info {
      font-size: 20px;
      color: #333;
      font-weight: bold;
      margin-bottom: 20px;
    }
  }
  .error-info {
    padding: 20px;
    p {
      color: #666;
      font-size: 12px;
      line-height: 18px;
    }
  }
}
</style>
<style lang="scss">
.export-loaing {
  .el-icon-loading {
    font-size: 36px;
    color: #fff;
  }
  .el-loading-text {
    color: #fff;
    font-size: 18px;
    font-weight: 400;
  }
}
</style>


