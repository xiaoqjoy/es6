<template>
  <section>
    <section class="dialog-box">
      <el-form :model="notice" :rules="rules" ref="notice" label-width="100px" class="notice-form" size="mini">
        <el-form-item label="标题：" prop="title">
          <el-input v-model="notice.title"></el-input>
        </el-form-item>
        <el-form-item label="附件：">
          <el-upload class="upload-box" action="security/oms/firmAdvert/upAttachment" multiple :limit="MAX_FILE_COUNT" :on-exceed="handleOnExceed" :on-change="handleFileChange" :on-success="onUploadSuccess" :file-list="files" :http-request="uploadFile" :on-remove="removeFile" :before-upload="beforeAvatarUpload" accept="application/vnd.ms-excel,application/ms-word,application/pdf,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.presentationml.presentation,aplication/zip,application/x-rar-compressed">
            <el-button size="mini" type="primary">点击上传</el-button>
            <span slot="tip" class="el-upload__tip"> 只能上传 pdf, docx, xlsx, ppt, rar, zip 文件，且每个文件大小不超过 1M</span>
          </el-upload>
        </el-form-item>
        <el-form-item label="内容：" required>
          <v-editor class="origin-style" :content="notice.content" :height="300" @change="updateData" ref="editor"></v-editor>
        </el-form-item>
      </el-form>
    </section>
    <section class="dialog-footer">
      <el-button type="primary" size="mini" @click="handleSubmit('notice')">保 存</el-button>
      <el-button size="mini" @click="closeDialog">取 消</el-button>
    </section>
  </section>
</template>
<script>
import VueHtml5Editor from 'vue-html5-editor';
export default {
  components: {
    'v-editor': new VueHtml5Editor({
      language: 'zh-cn',
      i18n: {
        // specify your language here
        'zh-cn': {
          'align': '对齐方式',
          'image': '图片',
          'list': '列表',
          'link': '链接',
          'unlink': '去除链接',
          'table': '表格',
          'font': '文字',
          'full screen': '全屏',
          'text': '排版',
          'eraser': '格式清除',
          'info': '关于',
          'color': '颜色',
          'please enter a url': '请输入地址',
          'create link': '创建链接',
          'bold': '加粗',
          'italic': '倾斜',
          'underline': '下划线',
          'strike through': '删除线',
          'subscript': '上标',
          'superscript': '下标',
          'heading': '标题',
          'font name': '字体',
          'font size': '文字大小',
          'left justify': '左对齐',
          'center justify': '居中',
          'right justify': '右对齐',
          'ordered list': '有序列表',
          'unordered list': '无序列表',
          'fore color': '前景色',
          'background color': '背景色',
          'row count': '行数',
          'column count': '列数',
          'save': '确定',
          'upload': '上传',
          'progress': '进度',
          'unknown': '未知',
          'please wait': '请稍等',
          'error': '错误',
          'abort': '中断',
          'reset': '重置'
        }
      },
      visibleModules: [
        'text',
        'color',
        'font',
        'align',
        'list',
        'link',
        'unlink',
        'tabulation',
        'image',
        'hr',
        'eraser',
        'undo'
      ]
    })
  },
  data() {
    return {
      MAX_FILE_COUNT: 5,
      files: [],
      notice: {
        title: '',
        attachmentList: [],
        content: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 2, max: 30, message: '标题长度在 2 到 30 个字符', trigger: 'blur' }
        ]
      }
    };
  },
  props: ['noticeId', 'noticeUrl'],
  mounted() {
    this.noticeId !== -1 && this.requestData();
  },
  methods: {
    requestData() {
      this.$axios
        .get('security/oms/firmAdvert/queryFirmAdvertInfo', {
          params: {
            id: this.noticeId
          }
        })
        .then(res => {
          // console.log(res, '公告详情');
          if (res.data.status === 'C0000') {
            this.notice = res.data.result;
            this.files = this.notice.attachmentList;
          } else {
            this.$message({
              type: 'warning',
              message: res.data.message
            });
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error(err.message || '服务器异常');
        });
    },
    updateData(content) {
      this.notice.content = content;
    },
    closeDialog() {
      this.$emit('togglePublishNotieDialog', false);
    },
    handleSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.notice.content.length === 0) {
            this.$message({
              type: 'warning',
              message: '请输入公告内容'
            });
          } else {
            this.saveNotice();
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    saveNotice() {
      this.notice.attachmentList = [];
      this.files.forEach((item) => {
        this.notice.attachmentList.push({
          name: item.name,
          url: item.url
        });
      });

      this.$axios
        .post(this.noticeUrl, this.notice)
        .then(res => {
          if (res.data.status === 'C0000') {
            this.$emit('togglePublishNotieDialog', true);
            this.$message({
              type: 'success',
              message: '处理成功'
            });
          } else {
            this.$message({
              type: 'warning',
              message: res.data.message
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleFileChange(file, fileList) {
      this.files = fileList;
      // console.log(file);
    },
    handleOnExceed(file, fileList) {
      this.$message({
        type: 'warning',
        message: '最多只可上传 5 个附件！'
      });
    },
    onUploadSuccess(res, file, fileList) {
      // 重置 file 对象中的 url 属性为后台返回的实际 fast dsf 地址，用于提交到后台
      file.url = res.data.result.fdfsUrl;
    },
    uploadFile(file) {
      const curFileIndex = this.files.length;
      console.log('curFileIndex=', curFileIndex);
      let param = new FormData();
      param.append('file', file.file, file.name);
      let config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      };
      return this.$axios
        .post(file.action, param, config)
        .then(res => {
          // console.log('curFileIndex=', curFileIndex);
          // console.log('post file=', res.data);
          // console.log('res, file, this.files=', res, file, this.files);

          if (res.data.status === 'C0000') {
            return Promise.resolve(res);
          } else {
            this.$message({
              type: 'warning',
              message: res.data.message
            });
            return Promise.reject(new Error(res.data.message));
          }
        });
    },
    removeFile(file, fileList) {
      this.files = fileList;
      // console.log('this.files=', this.files);
    },
    beforeAvatarUpload(file) {
      const isLt = +(file.size / 1024 / 1024) > 19.9;
      // const isJPG = file.type === 'image/jpeg';
      // const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      if (isLt) {
        this.$message.error('上传文件大小不能超过 20MB!');
      }
      return (!isLt);
    }
  }
};
</script>
<style scoped>
.notice-form {
  margin-top: 1rem;
  margin-right: 2rem;
}
.upload-box {
  text-align: left;
}
</style>
