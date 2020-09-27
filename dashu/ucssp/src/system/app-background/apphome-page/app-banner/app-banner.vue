<template>
  <div>
    <div class="content">
      <div class="box">
        <el-row
          v-if="tableData.length>0"
          v-for="(item, index) in tableData"
          :key="index"
        >
          <el-col>
            <el-card :body-style="{ padding: '0px' }">
              <img
                :src=item.bannerImgUrl
                class="image"
              >
            </el-card>
            <div style="padding: 20px;">
              <span>标题：</span>
              <span>{{item.bannerTitle}}</span>
              <div class="bottom clearfix">
                <span>网址：</span>
                <span>{{item.websiteUrl}}</span>
                <el-button
                  type="text"
                  class="button del"
                  @click="del_alert(item)"
                >删除</el-button>
                <el-button
                  type="text"
                  class="button"
                  @click="redact(item)"
                >编辑</el-button>
              </div>
            </div>
          </el-col>
        </el-row>
        <div class="addition">
          <div @click="add"><img
              src="../../../../assets/img/ic_new.png"
              alt=""
            ></div>
        </div>
      </div>
    </div>
    <newlyIncreased
      v-if="alert_"
      :refer="refer"
      :uploadUrl="uploadUrl"
      @clsoe_windowAlert='close_1'
    />
    <compile
      v-if="alert_a"
      :refer="refer"
      :uploadUrl="uploadUrl"
      :compile_data="compile_data"
      @clsoe_windowAlert='close_2'
    />
    <delRuleConfig
      v-if="alert_s"
      :refer="refer"
      :del="del"
      @clsoe_windowAlert_s='close_3'
    />
  </div>
</template>

<script type="text/ecmascript-6">
import "@common/css/dialog";
import newlyIncreased from "./newly-increased"; // 新增页面组件
import delRuleConfig from "./delRuleConfig"; // 删除页面组件
import compile from "./compile"; // 编辑页面组件
import { configApi } from "../../js/server.js";
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      alert_: false, // 控制是否打开新增页面
      alert_a: false, // 控制是否打开编辑页面
      alert_s: false,
      uploadUrl: "",
      tableData: [], // 查询数据
      compile_data: "" // 编辑页面数据
    };
  },
  methods: {
    // 图片上传
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 新增页面跳转
    add() {
      this.alert_ = true;
    },
    // 编辑页面跳转
    redact(data) {
      this.alert_a = true;
      this.compile_data = data;
    },
    // 关闭新增页面
    close_1() {
      this.alert_ = false;
    },
    // 关闭新增页面
    close_2() {
      this.alert_a = false;
    },
    // 删除页面
    del_alert(data) {
      this.alert_s = true;
      this.del_data = data;
    },
    // 关闭删除
    close_3() {
      this.alert_s = false;
    },
    // 删除接口
    del() {
      let url = `${configApi.banner_remove}/${this.del_data.id}`;
      this.$MyFetch
        .get(url)
        .then((data = {}) => {
          this.confirmFn("删除成功", "success");
          this.refer(1);
          this.close_3();
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    uploadurl() {
      // this.uploadUrl = "https://mloan.dashuf.com/ftb/api/ftb/v1/simple-upload";
      let url = window.location.href.split("/");
      for (let i = 0; i < url.length; i++) {
        this.uploadUrl =
          url[0].toString() +
          "//" +
          url[2].toString() +
          "/ftb/api/ftb/v1/simple-upload";
      }
    },
    // 查询数据
    refer() {
      this.tableData = [];
      let url = configApi.banner_list;
      this.$MyFetch
        .post(url)
        .then((data = {}) => {
          for (let i = 0; i < data.length; i++) {
            if (data[i].bannerType === "home_page") {
              this.tableData.push(data[i]);
            }
          }
        })
        .catch(err => {
          this.$error(err.message);
        });
    }
  },
  components: {
    newlyIncreased,
    compile,
    delRuleConfig
  },
  mounted() {
    this.refer();
    this.uploadurl();
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
/deep/ .el-tabs__nav-wrap {
  -webkit-box-shadow: 1px 2px 20px #ccc;
  box-shadow: 1px 2px 20px #ccc;
  padding-left: 30px;
  padding-top: 10px;
  border-radius: 4px;
}
/deep/ .el-tabs__nav-wrap .el-tabs__item.is-active {
  font-family: PingFangSC-Semibold;
  font-size: 18px;
  color: #538bf1;
  letter-spacing: 1.38px;
}
/deep/ .el-tabs__nav-wrap .el-tabs__item.is-active .el-tabs__item {
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #333333;
  letter-spacing: 1.22px;
  text-align: center;
}
// 中间部分
.content {
  height: 794px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.08);
  overflow: hidden;
  overflow-y: auto;
  // 去掉element表格的默认全选按钮
  .tables /deep/ th .el-checkbox {
    display: none;
  }
  .box {
    padding: 20px 30px;
    // 上传按钮大盒子样式
    .upload {
      display: inline-block;
    }
    // 上传按钮大盒子样式
    /deep/ .el-upload--picture-card {
      width: 560px;
      height: 438px;
      border: 1px solid #c0ccda;
      line-height: 438px;
      .plusMark {
        // display: inline-block;
        // text-align:center;
        vertical-align: middle;
      }
    }
    /deep/.el-row {
      display: inline-block;
      width: 560px;
      height: 438px;
      background: #ececec;
      border-radius: 4px;
      margin-right: 20px;
      margin-bottom: 20px;
      .el-col {
        .el-card {
          width: 520px;
          height: 318px;
          margin: 20px 20px 0 20px;
          border-radius: 4px;
          .el-card__body {
            width: 520px;
            height: 322px;
            line-height: 318px;
            overflow: hidden;
            .image {
              display: inline-block;
              text-align: center;
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
    // Element图片显示自带样式
    .time {
      font-size: 13px;
      color: #666;
    }
    .bottom {
      margin-top: 20px;
      line-height: 12px;
    }
    .button {
      padding: 0;
      float: right;
    }
    .del {
      color: #f55f5f;
      margin-left: 20px;
    }
    .image {
      display: inline-block;
      text-align: center;
    }
    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }
    .clearfix:after {
      clear: both;
    }
    .addition {
      width: 560px;
      height: 438px;
      display: inline-block;
      background-color: #ececec;
      position: relative;
      top: -10px;
      left: -5px;
      div {
        display: inline-block;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-top: -40px;
        margin-left: -40px;
        cursor: pointer;
        img {
          width: 80px;
          height: 80px;
        }
      }
    }
  }
}
</style>
