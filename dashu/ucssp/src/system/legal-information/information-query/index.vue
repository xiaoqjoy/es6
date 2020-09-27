<template>
  <div class="legal_info_query dash-board">
    <div class="data-box"><span class="maintenance">客户影像下载</span></div>
    <div class="main">
      <h3 class="info_query_label">客户出账编号清单</h3>
      <p class="tips">请录入客户出账编号，可从excel列复制粘贴，最多一次20条</p>
      <el-input type="textarea" v-model="applicationIds" placeholder="" rows="25" spellcheck="false"></el-input>
      <div>
        <el-button type="primary" class="btn b_button query width140" @click="checkNexport">检查&导入</el-button>
      </div>
    </div>
    <el-dialog
      title="检查结果"
      :visible.sync="checkRes"
      width="720px"
      center
      :before-close="dialogBeforeClose">
      <div class="result">
        <p>
          <span class="title">录入条数: </span>
          <span class="content">{{sum}}</span>
        </p>
        <p>
          <span class="title">检查通过条数: </span>
          <span class="content">{{checkPassCount}}</span>
        </p>
        <p>
          <span class="title">以下编号无记录: </span>
          <span class="content">{{noPassData.join(',')}}</span>
        </p>
      </div>
      <div slot="footer">
        <el-button type="primary" class="btn b_button query width120" @click="checkRes = false">确认</el-button>
        <el-button type="primary" class="btn b_button query width120" @click="exportFn">确认并导出</el-button>
        <input style="width:0px;height:0px;border:none;" type="text" id="path">
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {legalInfoApi} from '../js/server';
export default {
  data() {
    return {
      applicationIds: '',
      checkRes: false,
      checkPassCount: '',
      sum: '',
      noPassData: [],
      names: [],
      applicationList: []
    };
  },
  methods: {
    checkNexport() {
      this.checkRes = true;
      let list = this.applicationIds.split(/\s/);
      let targetList = list.filter(item => item);
      // 取前20个，后20个忽略
      targetList.length = targetList.length > 20 ? 20 : targetList.length;
      this.$MyFetch.post(legalInfoApi.imageDownLoad, {
        accountAllotIds: targetList
      }).then(_data => {
        this.checkPassCount = _data.checkPassCount;
        this.sum = _data.sum;
        this.noPassData = _data.noPassData;
        this.names = _data.data;
        this.applicationList = this.names.map(_item => {
          let strList = _item.split('_');
          return strList[strList.length - 1];
        });
      }).catch(_err => {
        this.$error(_err.message);
      });
    },
    dialogBeforeClose() {
      this.checkRes = false;
    },
    exportFn() {
      this.checkRes = false;
      // 需要在模板中添加id为paht的input标签
      // 打开系统文件夹，并获取路径
      let path = window.browseFolder("path");
      path = path.slice(0, path.length - 1);
      let newPath = path.replace(new RegExp(/\\/g), "\\\\");
      let query = {
        applicationList: this.applicationList.toString(),
        names: this.names.toString(),
        path: newPath
      };
      localStorage.setItem('imageDownloadParam', JSON.stringify(query));
      let href = this.$router.resolve({
        name: 'imageDownload',
        query: {
          applicationList: '',
          names: '',
          path: newPath,
          readLocal: true // 旧的传值方式存在url地址过长，浏览器解析有问题
        }
      });
      window.open(
        href.href,
        "_blank",
        "width=1200,height=800,left=200,top=100"
      );
    }
  }
};
</script>

<style lang="less">
  .legal_info_query {
    .boxShadow(0, 0);
    padding: 10px 31px;
    min-height: 820px;
    .tips {
      color: red;
      font-size: 12px;
      line-height: 25px;
      height: 25px;
    }
    > div.main {
      .el-textarea {
        margin-bottom: 20px;
      }
      > div {
        text-align: right;
      }
    }
    .title {
      color: #666;
    }
    .content {
      color: #000;
      letter-spacing: 0.86px;
    }
    .result {
      text-align: left;
      > p {
        // height: 30px;
        line-height: 30px;
      }
    }
  }
</style>
