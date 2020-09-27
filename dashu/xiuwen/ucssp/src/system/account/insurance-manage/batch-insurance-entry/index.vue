<template>
  <div class="import-message" >
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <!-- 头部 -->
      <div class="dialog-box__top">
        <h5 class="title bg__white">保险批量回执录入</h5>
        <span class="el-icon-close button button__close" @click="close_()"></span>
      </div>
      <!-- 主体部分 -->
      <div class="dialog-box__body" v-loading='loading'>
        <div class="anti-fraud_dialog-box__middle">
          <el-form class="form" :inline="true" :model="formData" :rules="rules" ref="formData" size="medium">
            <el-form-item label="保险审批状态" prop="insuranceApproveInd">
              <el-select
              v-model="formData.insuranceApproveInd"
              @change='insuranceApproveIndChange'>
                <el-option
                v-for="item in insuranceApproveInds"
                :key="item.value"
                :value="item.value"
                :label="item.label">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="否决原因" prop="rejectCode" >
              <el-select
              v-model.trim="formData.rejectCode"
              @change='rejectCodeChange'
              :disabled="formData.insuranceApproveInd!== false">
                <el-option
                v-for="item2 in rejectCodes"
                :key="item2"
                :value="item2"
                :label="item2">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="其他" prop="otherReasonTxt">
              <el-input v-model.trim="formData.otherReasonTxt"
              :disabled="formData.rejectCode !== '其他'" placeholder="请填写">
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="anti-fraud_dialog-box__middle" style="padding: 0px;">
          <el-table
          class="common__table"
          :data="tableData"
          header-cell-class-name="table-head"
          row-class-name="table-tr"
          style="100%"
          max-height='400'
          ref="dialogTableData">
            <el-table-column prop="orgName" label="合作机构"></el-table-column>
            <el-table-column prop="subcompanyName" width="120" label="分公司"></el-table-column>
            <el-table-column prop="cusName" label="客户姓名"></el-table-column>
            <el-table-column prop="applicationId" width="160" label="申请编号"></el-table-column>
            <el-table-column prop="approveAmt" label="放款金额"></el-table-column>
            <el-table-column prop="loanTerm" label="期限">
              <template slot-scope="scope">
                <span>{{scope.row.loanTerm}}月</span>
              </template>
            </el-table-column>
            <el-table-column prop="reject_reason" label="否决原因">
              <template slot-scope="scope">
                <!-- <span>{{scope.row.reject_reason}}</span> -->
                <span>{{formData.rejectCode}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="delete_submit">
          <div>
            <el-button class="t_button export_t button" @click="submitDialog">提交</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import "@common/css/dialog";
import { userInfo } from "@common/js/localStorage";
import { accountApi } from "../../../account/js/server.js"; // 接口
export default {
  data() {
    var checkRejectCode = (rule, value, callback) => {
      if (this.formData.insuranceApproveInd === false) {
        // console.log(value);
        // console.log(typeof value);
        if (!value) {
          return callback(new Error("否决原因不能为空"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    return {
      formData: {
        insuranceApproveInd: "",
        rejectCode: "",
        otherReasonTxt: ""
      },
      // 加载状态
      loading: false,
      // 产品审批状态
      insuranceApproveInds: [
        {
          value: false,
          label: "保险审批否决"
        },
        {
          value: true,
          label: "保险审批通过"
        }
      ],
      // 其他原因
      rejectCodes: [
        "客户申请否决",
        "机构停额否决",
        "机构政策否决",
        "资料错误否决",
        "机构黑名单",
        "其他"
      ],
      // 正则验证
      rules: {
        insuranceApproveInd: [
          {
            required: true,
            message: "请选择保险审批状态",
            trigger: "change"
          }
        ],
        rejectCode: [
          { required: true, validator: checkRejectCode, trigger: "change" }
        ]
      }
    };
  },
  props: ["tableData"],
  // 组件
  components: {},
  methods: {
    // 关闭弹窗
    close_() {
      this.$emit("clsoe_windowAlert");
    },
    // 保险审批状态改变
    insuranceApproveIndChange(val) {
      // console.log(val);
      if (val === true) {
        this.formData.rejectCode = '';
        this.rejectCodes = [];
        this.rejectCodeChange();
      } else {
        this.rejectCodes = [
          "客户申请否决",
          "机构停额否决",
          "机构政策否决",
          "资料错误否决",
          "机构黑名单",
          "其他"
        ];
      }
    },
    // 否决原因改变
    rejectCodeChange(val) {
      // console.log(val);
      if (val !== "其他") {
        this.formData.otherReasonTxt = "";
      }
      for (var i = 0; i < this.tableData.length; i++) {
        this.tableData[i].reject_reason = val;
      }
      // console.log(this.formData);
    },
    // 提交保险批量回执录入
    submitDialog() {
      // console.log(JSON.parse(userInfo.getUserInfo()));
      let userId = JSON.parse(userInfo.getUserInfo())
        ? JSON.parse(userInfo.getUserInfo()).userId
        : "";
      this.$refs.formData.validate(valid => {
        if (valid) {
          let msg = this.formData.insuranceApproveInd ? "通过" : "否决";
          this.confirmFn(
            `确认提交<span class="warning">【${msg}】</span>吗？`,
            "warning"
          )
            .then(() => {
              var accountApplyIds = this.tableData.map(
                item => item.accountAllotId + "-" + item.applicationId
              );
              // console.log(temp);
              let data = {
                account_applyId: accountApplyIds,
                insuranceApproveInd: this.formData.insuranceApproveInd,
                otherReasonTxt: this.formData.otherReasonTxt,
                rejectCode: this.formData.insuranceApproveInd
                  ? ""
                  : this.formData.rejectCode,
                userId: userId
              };
              // console.log(data);
              this.loading = true;
              this.$MyFetch
                .post(
                  accountApi.insurance_manage.saveAprInsuranceReceiptBatch,
                  data
                )
                .then((res = {}) => {
                  this.loading = false;
                  this.confirmFn("录入成功", "success");
                  this.$parent.refer(1);
                  this.close_();
                  // console.log(res);
                })
                .catch(err => {
                  this.loading = false;
                  this.$message({
                    message: err.message,
                    type: "error"
                  });
                  this.$parent.refer(1);
                  this.close_();
                });
            })
            .catch(() => {
              this.confirmFn("是否继续批量回执录入？", "warning")
                .then(() => {})
                .catch(() => {
                  this.close_();
                });
            });
        }
      });
    }
  },
  created() {}
};
</script>
<style lang="less" rel="stylesheet/less">
// .import-message {
//   .el-form-item__label {
//     display: block;
//     text-align: left;
//     font-family: PingFangSC-Regular;
//     font-size: 12px;
//     color: #bbbbbb;
//     letter-spacing: 1.09px;
//   }
//   .el-input__inner {
//     background: #f9fafb;
//   }
//   .el-input--suffix .el-input__inner {
//     background: #ffffff;
//   }
// }
</style>

<style lang="less" rel="stylesheet/less" scoped>
.import-message {
  .dialog-box {
    width: 946px;
    background: #ffffff;
    .el-form-item {
      margin-right: 20px;
      margin-bottom: 0px;
    }
    .dialog-box__middle {
      padding-bottom: 20px;
    }
    .dialog-box__body {
      overflow-y: auto;
      overflow-x: hidden;
      height: 598px;
    }
  }
}
// 底部按钮
.delete_submit {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 20px 0;
  // 删除提交公共样式
  .t_button {
    width: 200px;
    height: 40px;
  }
  .export_t {
    background: #538bf1;
    font-size: 14px;
    color: #ffffff;
    letter-spacing: 1.07px;
    text-align: center;
  }
}
//关闭按钮
.el-icon-close {
  position: absolute;
  font-size: 32px;
  top: 12px;
  right: 10px;
  cursor: pointer;
}
.anti-fraud_dialog-box__middle {
  width: 883px;
  overflow: hidden;
  padding: 10px 0;
  padding-bottom: 20px;
  border-radius: 4px;
  margin: 0px auto 0px auto;
}
</style>
