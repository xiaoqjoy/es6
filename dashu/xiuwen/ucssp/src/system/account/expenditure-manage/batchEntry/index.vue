<template>
  <div class="import-message" >
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <!-- 头部 -->
      <div class="dialog-box__top">
        <h5 class="title bg__white">批量回执录入</h5>
        <span class="el-icon-close button button__close" @click="close()"></span>
        <div
        :class="formData.approveStatus === 'SUCCESS'
        || formData.approveStatus === 'RECOVER'
        ? 'upload-export theme info'
        : 'upload-export theme'"
        @click="openUpload">
          <i class="iconfont icon__upload"></i>
          <span >上传相关资料</span>
        </div>
      </div>
      <!-- 主体部分 -->
      <div class="dialog-box__body" v-loading='batchEntryLoading'>
        <div class="anti-fraud_dialog-box__middle">
          <el-form class="form" :inline="true" :model="formData" :rules="rules" ref="formData" size="medium">
            <el-form-item prop="approveStatus">
              <el-select
              v-model="formData.approveStatus"
              placeholder="放款状态"
              @change="approveStatusChange"
              filterable
              clearable>
                <el-option
                v-for="item in approveStatuss"
                :key="item.key"
                :value="item.value"
                :label="item.label"
                :disabled="item.disabled">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="finishDate" class="el-form-item-finishDate">
              <el-date-picker
              v-model="formData.finishDate"
              :picker-options="pickerOptions"
              value-format="yyyy-MM-dd HH:mm:ss"
              align="left"
              type="date"
              placeholder="完成日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item prop="operationReason">
              <el-select
              v-model="formData.operationReason"
              placeholder="操作原因"
              :disabled="formData.approveStatus === 'SUCCESS'
              || formData.approveStatus === 'RECOVER'"
              filterable
              clearable>
                <el-option
                v-for="item in operationReasons"
                :key="item.itemCode"
                :value="item.itemCode"
                :label="item.itemDesc">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="relativeFileIds">
              <el-input v-show="false"></el-input>
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
          max-height='360'
          ref="dialogTableData">
            <el-table-column prop="orgName" label="合作机构"></el-table-column>
            <el-table-column prop="cusName" label="客户姓名"></el-table-column>
            <el-table-column prop="applicationId" width="160" label="申请编号"></el-table-column>
            <el-table-column prop="approveAmt" label="放款金额"></el-table-column>
            <el-table-column prop="loanTerm" label="期限">
              <template slot-scope="scope">
                <span>{{scope.row.loanTerm}}月</span>
              </template>
            </el-table-column>
          </el-table>
          <el-form class="search remarkForm">
            <el-form-item label="其他备注：">
              <el-input v-model="formData.remark" align="left" ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="delete_submit">
          <div>
            <el-button class="t_button export_t button" @click="submit">提交</el-button>
          </div>
        </div>
      </div>
      <!-- 上传相关资料 -->
      <introductionList v-if="uploadDialogVisible" @getFileId='getFileId' :title="title" :accept='accept' :multiple='multiple' @clsoe_upload_s='clsoe_upload'></introductionList>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { accountApi } from "../../../account/js/server";
import { userInfo } from "@common/js/localStorage";
import introductionList from "../introductionList"; // 上传组件
export default {
  components: {
    introductionList // 上传组件
  },
  data() {
    var checkOperationReason = (rule, value, callback) => {
      // console.log(this.formData.approveStatus === "VETO");
      // console.log(value === "");
      if (
        this.formData.approveStatus === "VETO" ||
        this.formData.approveStatus === "PAUSE"
      ) {
        if (value === "") {
          return callback(new Error("操作原因不能为空"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    var checkRelativeFileIds = (rule, value, callback) => {
      // console.log(this.formData.approveStatus === "VETO");
      // console.log(value === "");
      if (
        (this.formData.approveStatus === "VETO" ||
          this.formData.approveStatus === "PAUSE") &&
        value === ""
      ) {
        // this.$error("请上传相关资料");
        return callback(new Error(" "));
      } else {
        callback();
      }
    };
    return {
      // 上传相关资料
      uploadDialogVisible: false,
      batchEntryList: true, // 关闭窗口
      hint: false, // 提示信息
      // 查询信息
      formData: {
        approveStatus: "",
        finishDate: "",
        operationReason: "",
        remark: "",
        relativeFileIds: ""
      },
      // 设定选择日期区间
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      flag: false,
      // 正则验证
      rules: {
        approveStatus: [
          {
            required: true,
            message: "请选择放款状态",
            trigger: "change"
          }
        ],
        finishDate: [
          {
            required: true,
            // validator: checkFinishDate,
            message: "完成日期不能为空",
            trigger: "change"
          }
        ],
        operationReason: [
          {
            required: true,
            validator: checkOperationReason,
            trigger: "change"
          }
        ],
        relativeFileIds: [
          {
            required: true,
            validator: checkRelativeFileIds,
            trigger: "change"
          }
        ]
      },
      // 放款状态
      approveStatuss: [
        {
          key: 0,
          label: "放款成功",
          value: "SUCCESS",
          disabled: true
        },
        {
          key: 1,
          label: "放款否决",
          value: "VETO"
        },
        {
          key: 2,
          label: "暂停放款",
          value: "PAUSE"
        },
        {
          key: 3,
          label: "暂停恢复",
          value: "RECOVER"
        }
      ],
      operationReasons: [], // 操作原因
      title: "", // 上传组件标题
      accept: [], // 上传格式
      multiple: false, // 上传组件是否可以多选
      batchEntryLoading: false
    };
  },
  props: {
    tableData: {
      type: Array,
      default: function() {
        return [];
      }
    },
    org: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  created() {
    // console.log(this.tableData);
    // this.formData.approveStatus = this.tableData[0].putoutApproveStatus;
    this.relativeFileIds = "";
    // this.formData.approveStatus = '暂停放款';
    if (this.formData.putoutApproveStatus === "PAUSE") {
      this.approveStatuss[0].disabled = true;
    }
    // console.log(this.org);
    for (var i = 0; i < this.tableData.length; i++) {
      this.tableData[i].orgName = this.org.partnerName;
    }
    // console.log(this.tableData);
  },
  methods: {
    // 放款状态改变时
    approveStatusChange(val) {
      // console.log(val);
      this.operationReasons = [];
      this.formData.operationReason = "";
      var para = {};
      if (val === "VETO") {
        para = {
          categoryCode: "putout_reject_reason"
        };
      } else if (val === "PAUSE") {
        para = {
          categoryCode: "putout_pause_reason"
        };
      } else {
        return;
      }
      this.$MyFetch
        .get(accountApi.areaSelection, para)
        .then((data = {}) => {
          // console.log(data);
          this.operationReasons = data;
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 关闭窗口
    close() {
      this.introductionList = false;
      this.$emit("clsoe_batchEntry_s");
    },
    // 绑定file输入框事件
    tirggerFile(event) {
      this.hint = false;
      this.file = event.target.files[0];
      this.fileName = this.file.name;
    },
    getFileId(val) {
      // console.log(val);
      this.relativeFileIds = val;
      this.formData.relativeFileIds = val;
      this.$message({
        message: "上传成功",
        type: "success"
      });
    },
    // 确定按钮事件
    submit() {
      let _that = this;
      this.$refs.formData.validate(valid => {
        if (valid) {
          this.confirmFn(`确认提交吗？`, "warning")
            .then(() => {
              let userId = JSON.parse(userInfo.getUserInfo())
                ? JSON.parse(userInfo.getUserInfo()).userId
                : "";
              var accountApplyIds = _that.tableData.map(
                item => item.accountAllotId + "-" + item.applicationId
              );
              // console.log(accountApplyIds);
              var para = {
                account_applyId: accountApplyIds,
                endDate: _that.formData.finishDate,
                otherReasonTxt: _that.formData.remark,
                putoutApproveInd: _that.formData.approveStatus,
                rejectCode: _that.formData.operationReason,
                userId: userId
              };
              if (
                _that.formData.approveStatus === "VETO" ||
                _that.formData.approveStatus === "PAUSE"
              ) {
                para.relativeFileIds = _that.relativeFileIds;
              } else {
                _that.relativeFileIds = "";
              }
              // console.log(para);
              _that.batchEntryLoading = true;
              this.$MyFetch
                .post(
                  accountApi.expenditure_manage.saveAprPutoutReceiptBatch,
                  para
                )
                .then((data = {}) => {
                  // console.log(data);
                  _that.batchEntryLoading = false;
                  let msg = "";
                  if (data) {
                    msg = data;
                  } else {
                    if (_that.formData.approveStatus === "SUCCESS") {
                      msg = "记账成功";
                    } else if (_that.formData.approveStatus === "VETO") {
                      msg = "否决成功";
                    } else if (_that.formData.approveStatus === "PAUSE") {
                      msg = "暂停放款成功";
                    } else {
                      msg = "暂停恢复成功";
                    }
                  }
                  this.confirmFn(msg, "success");
                  _that.$parent.refer();
                  _that.close();
                  // console.log(data);
                })
                .catch(err => {
                  _that.$parent.refer();
                  _that.close();
                  // console.log(err);
                  this.$error(err.message);
                });
            })
            .catch(() => {
              // _that.close();
            });
        } else {
          this.$error("请补充放款状态、放款日期、暂停/否决原因、上传相关资料");
        }
      });
    },
    // 关闭上传
    clsoe_upload() {
      // console.log('ccccc');
      this.uploadDialogVisible = false;
    },
    // 打开上传
    openUpload() {
      this.title = "上传相关资料";
      this.accept = ["JPG", "PDF", "PNG"];
      this.multiple = true;
      // console.log(this.formData.approveStatus);
      if (
        this.formData.approveStatus !== "SUCCESS" &&
        this.formData.approveStatus !== "RECOVER"
      ) {
        this.uploadDialogVisible = true;
      } else {
        this.$error("放款成功/暂停恢复，此功能不可用。");
      }
    },
    disabledDate(val) {
      // console.log(val);
    }
  }
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
//   .el-form-item-finishDate .el-input--prefix .el-input__inner {
//     padding-left: 15px;
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
    .upload-export {
      position: absolute;
      right: 64px;
      top: 0px;
      z-index: 1;
      cursor: pointer;
      span {
        font-size: 14px;
      }
    }
    .icon__upload:after {
      display: inline-block;
      content: "";
      height: 14px;
      width: 14px;
      background: url("~@common/img/ic_upload.png") center center no-repeat;
      background-size: 12px 12px;
    }
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
  .common__table {
    width: 100%;
  }
  .remarkForm {
    margin-top: 20px;
    .el-form-item {
      width: 100%;
      margin: 0;
    }
  }
}
// 按钮颜色
.el-button--primary {
  background: #538bf1;
  color: #fff;
}
// 底部按钮
.delete_submit {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 20px 0;
  // 提交公共样式
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
</style>
