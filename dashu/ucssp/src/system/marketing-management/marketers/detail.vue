<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-13 15:05:45
 * @LastEditTime: 2019-08-28 11:47:21
 * @LastEditors: Please set LastEditors
 -->

<style lang="less" rel="stylesheet/less" scoped>
.static{
  /deep/ .el-input.is-disabled .el-input__inner{
    cursor: initial;
    color: inherit;
  }
}
/deep/ .el-table--scrollable-x .el-table__body-wrapper{
  max-height: 550px;
  overflow: auto;
}
/deep/ .dialog-box .el-form-item{
    margin-right: 20px;
    font-size: 0;
    width: 250px;
}
/deep/ .el-button.el-button--primary{
  width: 200px;
  height: 40px;
  margin-left: 317px;
}
// 公共样式
.height_60 {
  height: 60px;
}
// 弹窗总box
.drop_loan {
  .dialog-mask {
    z-index: 1000;
  }
  .dialog-box {
    height: 500px;
    width: 915px;
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
      height: 440px;
      overflow-y: auto;
      // 中间内容区域
      .form__block {
        height: 440px;
        padding: 20px 30px 0 60px;
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
    height: 720px;
    // 表格
    .table_box {
        width: 100%;
        overflow: hidden;
        .el-table__row {
          height: 60px;
        }
    }
  }
  // icon样式
  .img-icon{
    position:absolute;
    top:50%;
    right:10px;
    width:16px;
    height:16px;
    margin-top:-8px;
    z-index: 2;
  }
}
</style>

<template>
  <div class="drop_loan">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <!-- 弹窗上部分 -->
      <div class="dialog-box__top">
        <h5 class="title_type">{{title}}</h5>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <!-- 弹窗下部分 -->
      <div class="complete-product">
        <div class="dialog-box__middle-form">
          <!-- 内容区 -->
            <div class="form__block bg__white border__radius-5" >
              <!-- 带全选的表格 -->
              <div class="table_box marketers-detail">
                  <el-form label-position="top" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="申请编号" prop="applicationId">
                      <el-input :disabled="true" v-model="ruleForm.applicationId"></el-input>
                    </el-form-item>
                    <el-form-item label="借款人名称" prop="customerName">
                      <el-input :disabled="true" v-model="ruleForm.customerName"></el-input>
                    </el-form-item>
                    <el-form-item label="借款人身份证号" prop="certificateNum">
                      <el-input :disabled="true" v-model="ruleForm.certificateNum"></el-input>
                    </el-form-item>
                    <el-form-item label="产品一名称" prop="productName1">
                      <el-input :disabled="true" v-model="ruleForm.productName1"></el-input>
                    </el-form-item>
                    <el-form-item label="产品二名称" prop="productName2">
                      <el-input :disabled="true" v-model="ruleForm.productName2"></el-input>
                    </el-form-item>
                    <el-form-item class="static" label="初始客户经理" prop="initialCustManagerName" @click.native="getMsg('初始客户经理')">
                      <el-input :disabled="true" v-model="ruleForm.initialCustManagerName"></el-input>
                      <img class="img-icon" src="../../../assets/img/more.png" alt="">
                    </el-form-item>
                    <el-form-item class="static" label="客户经理" prop="custManagerName" @click.native="getMsg('客户经理')">
                      <el-input :disabled="true" v-model="ruleForm.custManagerName"></el-input>
                      <img class="img-icon" src="../../../assets/img/more.png" alt="">
                    </el-form-item>
                    <el-form-item class="static" label="业务助理" prop="assistantName" @click.native="getMsg('业务助理')">
                      <el-input :disabled="true" v-model="ruleForm.assistantName"></el-input>
                      <img class="img-icon" src="../../../assets/img/more.png" alt="">
                    </el-form-item>
                    <el-form-item label="变更人员" prop="updateBy">
                      <el-input :disabled="true" v-model="ruleForm.updateBy"></el-input>
                    </el-form-item>
                    <el-form-item label="变更时间" prop="updateDate">
                      <el-input :disabled="true" v-model="ruleForm.updateDate"></el-input>
                    </el-form-item>
                  </el-form>
                  <el-button type="primary" @click="editSave">保存</el-button>
              </div>
            </div>
        </div>
      </div>
    </div>
    <addPriorMatch :titleMsg='titleMsg' :tetail_data='dataMsg' @clsoeMsg='clsoeMsg' v-if='addPriorMatchFlag'></addPriorMatch>
  </div>
</template>
<script type="text/ecmascript-6">
import addPriorMatch from './addPriorMatch';
import "@common/css/dialog";
import {marketingApi} from "../js/server"; // 接口
export default {
  // 父组件传来的值
  props: ["tetail_data", "title"],
  data() {
    return {
      titleMsg: '',
      addPriorMatchFlag: false,
      form: {
        guarantee_name: "",
        certificate_type_code: "",
        contact_num: "",
        house_area_num: ""
      },
      for_: [], // 渲染数据列表
      pageConfig: {
          account: 1, // 总条数
          pageSize: 1, // 当前多少条数据
          currentPage: 1, // 当前页
          showJumpButton: true // 显示跳转按钮
      }, // 分页
      ruleForm: {},
       rules: {
          applicationId: [
            {required: true, message: ' '}
          ],
          customerName: [
            {required: true, message: ' '}
          ],
          certificateNum: [
            {required: true, message: ' '}
          ],
          productName1: [
            {required: true, message: ' '}
          ],
          productName2: [
            {required: true, message: ' '}
          ],
          custManagerName: [
            {required: true, message: ' '}
          ],
          initialCustManagerName: [
            {required: true, message: ' '}
          ],
          assistantName: [
            {required: true, message: ' '}
          ],
          updateBy: [
            {required: true, message: ' '}
          ],
          updateDate: [
            {required: true, message: ' '}
          ]
        }
    };
  },
  components: {
    addPriorMatch
  },
  methods: {
    // 关闭弹窗
    close() {
      this.$emit("clsoe_windowDetail");
    },
    getMsg(title) {
      this.titleMsg = title;
      this.addPriorMatchFlag = true;
      this.dataMsg = this.ruleForm;
    },
    clsoeMsg(val) {
      if (val) {
        this.ruleForm.marketTeamId = val.multipleSelection.marketTeamId ? val.multipleSelection.marketTeamId : this.ruleForm.marketTeamId; // 营销单位
        this.ruleForm.initialMarketTeamId = val.multipleSelection.initialMarketTeamId ? val.multipleSelection.initialMarketTeamId : this.ruleForm.initialMarketTeamId; // 初始营销单位
        if (val.select === 'initialCustManagerSelect') { // 初始客户经理
          this.ruleForm.initialCustManagerId = val.multipleSelection.initialCustManagerId;
          this.ruleForm.initialCustManagerName = val.multipleSelection.initialCustManagerName;
        } else if (val.select === 'custManagerSelect') { // 客户经理
          this.ruleForm.custManagerId = val.multipleSelection.custManagerId;
          this.ruleForm.custManagerName = val.multipleSelection.custManagerName;
        } else if (val.select === 'assistantSelect') { // 业务助理
          this.ruleForm.assistantId = val.multipleSelection.assistantId;
          this.ruleForm.assistantName = val.multipleSelection.assistantName;
        }
      }
      this.addPriorMatchFlag = false;
    },
    editSave() {
      let res = {
        "applicationId": this.ruleForm.applicationId,
        "assistantId": this.ruleForm.assistantId ? this.ruleForm.assistantId : '',
        "custManagerId": this.ruleForm.custManagerId ? this.ruleForm.custManagerId : '',
        "initialMarketTeamId": this.ruleForm.initialMarketTeamId ? this.ruleForm.initialMarketTeamId : '',
        "marketTeamId": this.ruleForm.marketTeamId ? this.ruleForm.marketTeamId : '',
        "initialCustManagerId": this.ruleForm.initialCustManagerId ? this.ruleForm.initialCustManagerId : ''
      };
      this.$MyFetch.post(marketingApi.memberExchangeSave, res)
            .then((data = {}) => {
              this.$emit("clsoe_windowDetail", 'success');
              this.$message({
                message: '保存成功',
                type: "success"
              });
            })
            .catch(err => {
            console.log(err);
            this.$error(err.message);
            });
    }
  },
  created() {
    },
  mounted() {
    this.ruleForm = JSON.parse(this.tetail_data);
  }
};
</script>
