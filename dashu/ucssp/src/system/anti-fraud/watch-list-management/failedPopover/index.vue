<template>
    <div class="import-message">
      <div class="dialog-mask"></div>
      <div class="dialog-box">
        <div class="dialog-box__top">
          <h5 class="title bg__white">批量导入失败</h5>
          <span class="el-icon-close button button__close" @click="close"></span>
        </div>
        <div class="failure_f">数据导入不成功,请检查失败原因,并重新导入</div>
        <div class="dialog-box__middle color_1">
          <div class="dial_title">
            <p>下载失败原因:<span @click="downloadFile">下载</span></p>
          </div>
        </div>
      </div>
    </div>
</template>
<script type="text/ecmascript-6">
import { fqzApi } from "../../../anti-fraud/js/server";
export default {
  data() {
    return {
      url: fqzApi // 下载模板方法
    };
  },
  components: {},
  props: ["urlF"],
  // computed: {
  //   customertype() {
  //     return this.$store.getters.customertype;
  //   }
  // },
  created() {},
  methods: {
    downloadFile() {
      this.$MyFetch
        .get(this.url.downloadErrorFile, { path: this.urlF })
        .then((data = {}) => {
          this.$download(data);
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 关闭窗口
    close() {
      this.$emit("clsoe_windowImport_f");
    },
    // 确定按钮事件
    save() {}
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
.import-message {
  .dialog-box {
    width: 570px;
    height: 280px;
    .failure_f {
      text-align: left;
      margin-left: 26px;
      margin-top: 30px;
    }
    .dialog-box__middle {
      width: 510px;
      height: 130px;
      margin-left: 30px;
      margin-top: 40px;
      box-shadow: 0 0 0 #fff;
    }
    .color_1 {
      background: none;
    }
  }
}
.dial_title {
  text-align: left;
  margin-top: -36px;
  margin-left: -34px;
}
.dial_title > p {
  font-size: 14px;
  color: #333333;
  margin-bottom: 23px;
}
.dial_title > p > span {
  margin-left: 20px;
  font-size: 12px;
  color: #538bf1;
}
</style>
