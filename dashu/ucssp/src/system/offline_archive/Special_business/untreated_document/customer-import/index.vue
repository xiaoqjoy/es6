<style lang="less" rel="stylesheet/less" scoped>
// 公共样式
.margin_r_60 {
  margin-right: 60px;
}
// 弹窗总box
.drop_loan {
  .dialog-mask {
    z-index: 1000;
  }
  .dialog-box {
    height: 564px;
    width: 900px;
    padding: 0px;
    .dialog-box__top {
      margin: 0px;
    }
    .title_type {
      text-align: center;
      background: #fff;
      font-size: 18px;
      color: #000;
      letter-spacing: 1.3px;
      padding-left: 20px;
      font-weight: normal;
      font-family: PingFangSC-Regular;
    }
    .dialog-box__middle-form {
      height: auto;
      // 中间内容区域
      .form__block {
        height: auto;
        padding: 20px 30px;
        box-shadow: 0 2px 6px 0 #d0d0d0;
      }
      // 按钮部分
      .form__bottom {
        left: 50%;
        padding-bottom: 30px;
        background-color: rgba(255, 255, 255);
        .add {
          width: 200px;
        }
      }
    }
  }
  /*表单区块*/
  .dialog-box__middle-form {
    .form__bottom {
      text-align: center;
      padding-bottom: 20px;
    }
  }
  // 弹窗下部分
  .complete-product {
    width: 100%;
    // height: 720px;
    // 输入框和下拉框部分样式
    .b_content {
      text-align: left;
      height: 40px;
      // margin-left: 28px;
      // margin-top: 20px;
      // 输入框和下拉框170*40
      .select_7 {
        width: 170px;
        height: 40px;
        margin-right: 15px;
      }
      // 输入框和下拉框172*40
      .select_72 {
        width: 200px;
        height: 40px;
        margin-right: 15px;
      }
      // 查询和清空的公有样式
      .b_button {
        width: 100px;
        height: 40px;
        border-radius: 4px;
        font-size: 14px;
      }
      // 查询单独样式
      .query {
        background: #538bf1;
        color: #ffffff;
      }
      // 清空单独样式
      .empty {
        background: #ffffff;
        color: #538bf1;
        border: 1px solid #538bf1;
      }
      .span {
        position: absolute;
      }
      .effective {
        left: 25.3%;
        top: 8%;
        font-size: 12px;
        color: #bbbbbb;
        letter-spacing: 1.09px;
      }
      .transverse {
        left: 35.1%;
        top: 12.5%;
        color: #bbbbbb;
      }
    }
    // 表格
    .table_box {
        width: 100%;
        height: 280px;
        margin: 20px 0;
        overflow: auto;
    }
  }
}
</style>
<template>
  <div class="drop_loan">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <!-- 弹窗上部分 -->
      <div class="dialog-box__top">
        <h5 class="title_type">引入客户信息</h5>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <!-- 弹窗下部分 -->
      <div class="complete-product">
        <div class="dialog-box__middle-form">
          <!-- 内容区 -->
            <div class="form__block bg__white border__radius-5" >
              <!-- 输入框和下拉框 -->
              <div class="b_content">
                <el-input class="select_72" v-model="custName" placeholder="客户名称"></el-input>
                <el-input class="select_72" v-model="certificateNum" placeholder="证件编号"></el-input>
                <el-button class="b_button query button " @click="refer(1)">查询</el-button>
                <el-button class="b_button empty button " @click="empty()">清空</el-button>
              </div>
              <!-- 带全选的表格 -->
              <div class="table_box">
                  <el-table
                  :default-sort = "{prop: 'date', order: 'descending'}"
                  :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#ececec'}"
                  ref="multipleTable"
                  :data="for_"
                  tooltip-effect="dark"
                  style="width: 100%; border: 1px solid #E9E9E9;"
                  >
                    <el-table-column
                        prop="applicationId"
                        label="申请编号">
                    </el-table-column>
                    <el-table-column
                        prop="custName"
                        label="客户姓名">
                    </el-table-column>
                    <el-table-column
                        prop="certificateNum"
                        label="身份证号">
                    </el-table-column>
                  </el-table>
              </div>
            </div>
            <div class="form__bottom">
              <el-button class="add finis button h" type="primary" @click="finish">引人</el-button>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { configApi } from "../../../js/server.js"; // 接口
import "@common/css/dialog";
export default {
  data() {
    return {
      custName: "", // 客户名称
      certificateNum: "", // 身份证号码
      for_: [] // 渲染数据列表
    };
  },
  methods: {
    // 清空按钮
    empty() {
      this.custName = ''; // 客户名称
      this.certificateNum = ''; // 身份证号码
    },
    // 查询按钮
    refer() {
      if (this.certificateNum === "" && this.custName === "") {
         this.confirmFn("请填写客户名称和证件编码");
      } else if (this.certificateNum === "") {
        this.confirmFn("请填写证件编码");
      } else if (this.custName === "") {
        this.confirmFn("请填写客户名称");
      } else if (this.certificateNum !== "" && this.custName !== "") {
         this.for_ = [];
      let url = configApi.lastRejectApl;
      let data = {
          certificateNum: this.certificateNum, // 身份证号码
          custName: this.custName // 客户名称
      };
      this.$MyFetch
        .get(url, data)
        .then((data = {}) => {
          this.for_.push(data);
          console.log(data);
        })
        .catch(err => {
          this.$error(err.message);
        });
      }
    },
    // 关闭弹窗
    close() {
      this.$emit("clsoe_windowAlert_y");
    },
    // 打开保存修改配置
    finish() {
        let url = configApi.pullin;
        let data = {
          applicationId: this.for_[0].applicationId,
          certificateNum: this.for_[0].certificateNum,
          custName: this.for_[0].custName
        };
        this.$MyFetch.post(url, data)
          .then((data = {}) => {
            this.$emit('clsoe_windowAlert_y');
            this.refer_y(1);
          })
          .catch((err) => {
              this.$error(err.message);
          });
    }
  },
  components: {
  },
  props: ["refer_y"],
  mounted() {
  }
};
</script>
