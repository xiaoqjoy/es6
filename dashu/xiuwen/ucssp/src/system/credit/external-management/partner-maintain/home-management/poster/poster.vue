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
                :src=item.imgUrl
                class="image"
              >
            </el-card>
            <div style="padding: 20px;">
              <span class="title">{{item.title}}</span>
              <el-button
                type="text"
                class="button del"
                @click="del_alert(item)"
              >删除</el-button>
              <el-button
                type="text"
                class="button"
                @click="compile(item)"
              >编辑</el-button>
              <div class="bottom clearfix">
                <span class="webSite">{{item.webSite}}</span>
              </div>
            </div>
          </el-col>
        </el-row>
        <div class="addition">
          <div @click="add"><img
              src="../../../../../common/img/ic_new.png"
              alt=""
            ></div>
        </div>
      </div>
      <pagination
        :page="pageConfig"
        class="pagination"
        @jump-page="jump"
      ></pagination>
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
      @clsoe_windowAlert_b='close_2'
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
import pagination from "@components/pagination";
import newlyIncreased from "./newly-increased"; // 新增页面组件
import compile from "./compile"; // 编辑页面组件
import delRuleConfig from "../notice/delRuleConfig"; // 删除页面组件
import { partnerApi } from "../../../js/server.js";
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      alert_: false, // 控制是否打开新增页面
      alert_a: false, // 控制是否打开编辑页面
      alert_s: false, // 控制是否打开删除页面
      tableData: [], // 查询数据
      compile_data: "", // 编辑页面数据
      uploadUrl: "",
      pageConfig: {
        account: 0, // 总条数
        pageSize: 7, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      } // 分页
    };
  },
  methods: {
    // 分页
    jump(pageNum) {
      this.pageConfig.currentPage = pageNum;
      this.refer(this.pageConfig.currentPage);
      // this.defaultList(this.pageConfig.currentPage);
    },
    // 新增页面跳转
    add() {
      this.alert_ = true;
    },
    // 编辑页面跳转
    compile(data) {
      let url = `${partnerApi.poster}/${data.id}`;
      this.$MyFetch
        .get(url)
        .then((data = {}) => {
          this.compile_data = data;
          this.alert_a = true;
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 删除页面
    del_alert(data) {
      this.alert_s = true;
      this.del_data = data;
    },
    // 删除接口
    del() {
      let url = `${partnerApi.poster}${this.del_data.id}`;
      this.$MyFetch
        .delete(url)
        .then((data = {}) => {
          this.confirmFn("删除成功", "success");
          this.refer(1);
          this.close_3();
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 关闭新增页面
    close_1() {
      this.alert_ = false;
    },
    // 关闭编辑页面
    close_2() {
      this.alert_a = false;
    },
    // 关闭删除页面
    close_3() {
      this.alert_s = false;
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
    // // 查询数据
    refer(pageNum) {
      let data = {
        orderBy: "",
        pageNum: pageNum, // 当前页
        pageSize: this.pageConfig.pageSize // 当前多少条数据
      };
      let url = partnerApi.poster;
      this.$MyFetch
        .get(url, data)
        .then((data = {}) => {
          this.tableData = data.list;
          console.log(data);
          this.pageConfig.account = data.total;
          this.pageConfig.currentPage = data.pageNum;
        })
        .catch(err => {
          this.$error(err.message);
        });
    }
  },
  components: {
    newlyIncreased,
    pagination,
    compile,
    delRuleConfig
  },
  mounted() {
    this.refer(1);
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
  position: relative;
  height: 805px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 1px 2px 20px #ccc;
  overflow: hidden;
  overflow-y: auto;
  // 去掉element表格的默认全选按钮
  .tables /deep/ th .el-checkbox {
    display: none;
  }
  .box {
    padding: 20px 30px;
    min-height: 730px;
    // 上传按钮大盒子样式
    .upload {
      display: inline-block;
    }
    // 上传按钮大盒子样式
    /deep/ .el-upload--picture-card {
      width: 374px;
      height: 302px;
      border: 1px solid #c0ccda;
      line-height: 374px;
      .plusMark {
        vertical-align: middle;
      }
    }
    /deep/.el-row {
      display: inline-block;
      width: 374px;
      height: 302px;
      background: #f9fafb;
      border-radius: 4px;
      margin-right: 20px;
      margin-bottom: 20px;
      .el-col {
        .el-card {
          width: 334px;
          height: 188px;
          margin: 20px 20px 0px 20px;
          border-radius: 4px;
          .el-card__body {
            width: 334px;
            height: 188px;
            line-height: 188px;
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
      .title {
        font-family: PingFang-SC-Medium;
        font-size: 18px;
        color: #333333;
        letter-spacing: 1.37px;
        font-weight:900;
      }
      .button {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #538bf1;
        letter-spacing: 1.07px;
        text-align: right;
        margin-left: 20px;
      }
      .del {
        color: #f55f5f;
      }
      .webSite {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #333333;
        letter-spacing: 1.07px;
      }
    }
    // Element图片显示自带样式
    .time {
      font-size: 13px;
      color: #666;
    }
    .bottom {
      margin-top: 13px;
      line-height: 12px;
    }
    .button {
      padding: 0;
      float: right;
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
      width: 374px;
      height: 302px;
      display: inline-block;
      background-color: #f9fafb;
      position: relative;
      margin-right: 20px;
      margin-bottom: 20px;
      // top: -10px;
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
  // 分页样式
  .pagination {
    // position: absolute;
    bottom: 50px;
    margin-right: 83px;
  }
}
</style>
