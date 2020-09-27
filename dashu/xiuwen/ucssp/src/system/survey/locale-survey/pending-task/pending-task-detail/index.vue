<template>
  <div>
    <div class="audit_box" id="audit_box">
      <div class="audit_top" id="audit_top" ref="auditTop">
        <div class="backAudit">
          <router-link to="/system/survey/locale-survey/pending-task">
            <span class="blue_font bold">待预约任务</span>
          </router-link>
          <span class="el-icon-arrow-left"></span>
          <span class="black_font">预约</span>
        </div>
        <div class="content">
          <div class="content_head_title" :class="{'head_border_bottom' : isShowInfo}">调查预约<div class="btn_select" :class="{'btn_select_clicked' : isShowInfo}" @click="showInfo"></div></div>
          <div class="top_content_full_line" v-if="isShowInfo"><span class="top_conten_title">总预约数：</span><span class="top_content_font">{{branchesNum}}</span></div>
          <div class="clearfloat" v-for = "(item, index) in surveyReserveInfo.reserveInfo" :key="index" v-if="isShowInfo">
            <div class="top_conten"><span class="top_conten_title">预约时间{{index+1}}：</span><span class="top_content_font">{{item.reserveTime}}</span></div>
            <div class="top_conten"><span class="top_conten_title">预约状态：</span><span class="top_content_font">{{item.reserveStatus}}</span></div>
            <div class="top_conten" v-show="item.isAbnormal"><span class="top_conten_title">异常情况说明：</span><span class="top_content_font">{{item.exceptionDesc}}</span></div>
            <div class="top_conten" v-show="!item.isAbnormal"><span class="top_conten_title">计划调查时间：</span><span class="top_content_font">{{item.plannedSurveyTime}}</span></div>
            <div class="top_conten" v-show="item.isAbnormal && item.hasRemark"><span class="top_conten_title">备注：</span><span class="top_content_font">{{item.otherRemark}}</span></div>
          </div>

          <el-form :model="editingModel" :rules="editingModelRules" ref="editingModel" label-width="100px" class="demo-ruleForm text_left" label-position="top" v-if="isShowInfo">
            <div class="clearfloat margin10" v-if = "!isEdit && showEditing">
              <div class="top_conten"><span class="top_conten_title">预约时间{{branchesNum+1}}：</span><span class="top_content_font">{{editingModel.reserveTime}}</span></div>
              <div class="top_conten"><span class="top_conten_title">预约状态：</span><span class="top_content_font">{{editingModel.reserveStatus}}</span></div>
              <div class="top_conten" v-show="editingModel.isAbnormal"><span class="top_conten_title">异常情况说明：</span><span class="top_content_font">{{editingModel.exceptionDesc}}</span></div>
              <div class="top_conten" v-show="!editingModel.isAbnormal"><span class="top_conten_title">计划调查时间：</span><span class="top_content_font">{{editingModel.plannedSurveyTime}}</span></div>
              <div class="top_conten" v-show="editingModel.isAbnormal && editingModel.hasRemark"><span class="top_conten_title">备注：</span><span class="top_content_font">{{editingModel.otherRemark}}</span></div>
              <div class="operation_btn_group">
                <div class="edit" @click="editReserveInfo"></div>
              </div>
            </div>
            <div class="input_box" v-if="isEdit && showEditing">
              <el-form-item :label="'预约时间'+ (branchesNum+1)" prop="reserveTime">
                <el-date-picker class="width340" v-model="editingModel.reserveTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptions" placeholder="请选择"></el-date-picker>
              </el-form-item>
              <el-form-item label="预约状态" prop="reserveStatus">
                <el-select class="width250" v-model="editingModel.reserveStatus" placeholder="请选择" @change="changeEditReserveStatus">
                  <el-option v-for="(item, arrIndex) in fieldConfig.reserve_status.children" v-if="arrIndex===0 && !hasNormal || arrIndex===0 && !editingModel.isAbnormal || arrIndex!==0" :key="item.sortNum" :label="item.itemDesc" :value="item.itemCode"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="异常情况说明" prop="exceptionDesc" v-show="editingModel.isAbnormal">
                <el-select class="width340" v-model="editingModel.exceptionDesc" placeholder="请选择" @change = "setHasRemark">
                  <el-option v-for="item in fieldConfig.exception_desc.children" :key="item.sortNum" :label="item.itemDesc" :value="item.itemCode"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="备注" prop="otherRemark" v-show="editingModel.isAbnormal && editingModel.hasRemark">
                <el-input class="width_auto" v-model="editingModel.otherRemark" placeholder="请填写" maxlength="100"></el-input>
              </el-form-item>

              <el-form-item label="计划调查时间" prop="plannedSurveyTime" v-show="!editingModel.isAbnormal">
                <el-date-picker class="width340" v-model="editingModel.plannedSurveyTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptions" placeholder="请选择" @change="changeEditPlannedSurveyTime"></el-date-picker>
              </el-form-item>
              <div class="operation_btn_group operation_btn_group_sure">
                <div class="sure" @click="sureReserveInfo"></div>
              </div>
            </div>
          </el-form>

          <!-- 保存提交按钮 -->
          <div class="clearfloat content_btn" v-if="isShowInfo">
            <div class="tail_btn">
              <el-button type="warning" style="width:140px" @click="doSave">保存</el-button>
              <el-button type="primary" style="width:140px" @click="doSend">预约提交</el-button>
              <el-button type="primary" style="width:140px" plain @click="doBack">退回调查主管</el-button>
            </div>
          </div>

        </div>
      </div>
      <survey-detail @setReserveInfo="setReserveInfo" :audit-top="auditTop" ref="surveyDeatil"></survey-detail>

    </div>
  </div>
</template>

<script>
import surveyDetail from './../../../survey-detail/survey-detail';
import { surveyApi } from './../../../js/server.js';
import { deepClone, reserveStatusConversion } from './../../../js/utils.js';
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      surveyInfo: {}, // 调查任务关键识别信息 退回按钮传送数据
      surveyReserveInfo: {
        reserveInfo: []
      }, // 预约信息数据
      surveyReserveInfoRequest: {}, // 请求数据
      branchesNum: 0, // 预约信息数组长度
      isEdit: true, // 编辑按钮状态
      hasNormal: false, // 数据中是否有正常状态
      resCanSubmit: false, // 接口返回数据是否符合提交条件
      canSubmit: false, // 新編輯的預約信息是否可提交
      auditTop: 0, // top信息框动态高度
      isShowInfo: true, // 收起展开按钮
      saved: false, // 保存后更新页面
      clicked: false, // 保存按钮防重（请求未完成前再次保存，重复保存bug）
      pickerOptions: { // 时间选择范围
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      editingModel: {},
      editingModelRules: { // 防止新增信息与编辑信息规则相互影响
        reserveTime: [
          { required: true, message: "请选择时间", trigger: "change" }
        ],
        reserveStatus: [
          { required: true, message: "请选择预约状态", trigger: "change" }
        ],
        exceptionDesc: [
          { required: true, message: "请选择", trigger: "change" }
        ],
        plannedSurveyTime: [
          { required: true, message: "请选择时间", trigger: "change" }
        ],
        otherRemark: [
          { required: true, message: "请输入异常备注", trigger: "blur" }
        ]
      },
      exceptionDesc: [{ required: true, message: "请选择", trigger: "change" }],
      plannedSurveyTime: [{ required: true, message: "请选择时间", trigger: "change" }],
      otherRemark: [{ required: true, message: "请输入异常备注", trigger: "blur" }]
    };
  },
  computed: {
    ...mapGetters([
      'surveyId', // vuex 传参
      'fieldConfig'
    ]),
    exception_desc() {
      return this.fieldConfig.exception_desc;
    },
    // 展示编辑中数据
    showEditing() {
      return this.fieldConfig && this.branchesNum < 3 && !this.hasNormal && !this.resCanSubmit;
    },
    hasCancel() {
      return this.editingModel.isAbnormal && (this.editingModel.exceptionDesc === '1' || this.editingModel.exceptionDesc === '取消贷款');
    }
  },
  created() {
    this.initEditingModel();
  },
  mounted() {
    this.getAuditTopHeight();
  },
  methods: {
    // 获取auditTop 动态高度
    getAuditTopHeight() {
      this.$nextTick(() => {
        this.auditTop = this.$refs.auditTop.offsetHeight;
      });
    },
    // 切换待预约信息的显示状态
    showInfo() {
      this.isShowInfo = !this.isShowInfo;
      this.getAuditTopHeight();
    },
    // 异常信息编码与展示转换
    exceptionDescConversion(value) {
      if (parseInt(value) % 1 === 0) {
        return this.exception_desc.children[parseInt(value) - 1].itemDesc;
      } else {
        for (let i in this.exception_desc.children) {
          if (this.exception_desc.children[i].itemDesc === value) {
            return (Number(i) + 1).toString();
          }
        }
      }
    },
    initEditingModel() {
      this.editingModel = {
        isAbnormal: true, // 是否可选异常情况
        reserveTime: "",
        reserveStatus: "",
        exceptionDesc: null,
        plannedSurveyTime: null,
        otherRemark: null
      };
      this.$nextTick(() => {
        this.$refs.editingModel.clearValidate();
      });
    },
    // 从详情接口取到预约信息 子组件请求传参父组件实现方案
    setReserveInfo(val) {
      this.surveyReserveInfo = val;
      this.branchesNum = this.surveyReserveInfo.reserveInfo.length;
      if (this.branchesNum > 0) {
        for (let x of this.surveyReserveInfo.reserveInfo) {
          if (x.reserveStatus === '0' || x.reserveStatus === '正常') {
            x.isAbnormal = false;
            this.hasNormal = true; // 后台数据源已有正常状态 可提交
            if (this.surveyReserveInfo.plannedSurveyTime) {
              x.plannedSurveyTime = this.surveyReserveInfo.plannedSurveyTime;
            } else {
              x.plannedSurveyTime = "";
            }
          } else {
            x.isAbnormal = true;
            if (x.exceptionDesc === '6' || x.exceptionDesc === '其他') { // 是否有其他情况
              x.hasRemark = true;
            } else {
              x.hasRemark = false;
            }
            if (x.exceptionDesc === '1' || x.exceptionDesc === '取消贷款') { // 是否选了取消贷款
              this.resCanSubmit = true; // 取消贷款 可提交
            }
          }
          x.reserveStatus = reserveStatusConversion(x.reserveStatus);
          x.exceptionDesc = this.exceptionDescConversion(x.exceptionDesc);
        }
        this.getAuditTopHeight();
      } else {
        this.$set(this.editingModelRules, 'exceptionDesc', this.exceptionDesc); // 初始无数据需要校验异常情况说明
      }
      if (this.branchesNum >= 3) {
        this.isEdit = false;
      } else {
        this.isEdit = true;
      }
      if (this.saved) {
        this.initEditingModel();
      }
    },
    // 编辑预约信息
    editReserveInfo() {
      this.isEdit = true;
      this.getAuditTopHeight();
      if (this.editingModel.reserveStatus === '正常' || this.editingModel.reserveStatus === '异常') {
        this.$set(this.editingModel, 'reserveStatus', reserveStatusConversion(this.editingModel.reserveStatus));
      }
      if (parseInt(this.editingModel.exceptionDesc) % 1 !== 0) {
        this.$set(this.editingModel, 'exceptionDesc', this.exceptionDescConversion(this.editingModel.exceptionDesc));
      }
    },
    // 确认编辑信息
    sureReserveInfo() {
      this.validEdit().then(flag => {
        if (flag) {
          this.isEdit = false;
          this.getAuditTopHeight();
          if (this.editingModel.reserveStatus === '0' || this.editingModel.reserveStatus === '1') {
            this.$set(this.editingModel, 'reserveStatus', reserveStatusConversion(this.editingModel.reserveStatus));
          }
          if (parseInt(this.editingModel.exceptionDesc) % 1 === 0) {
            this.$set(this.editingModel, 'exceptionDesc', this.exceptionDescConversion(this.editingModel.exceptionDesc));
          }
        }
      }).catch(err => {
        this.$error(err.message);
      });
    },
    setHasRemark() {
      if (this.editingModel.exceptionDesc === '6') {
        this.editingModel.hasRemark = true;
        this.$set(this.editingModelRules, 'otherRemark', this.otherRemark);
      } else {
        this.editingModel.hasRemark = false;
        this.$set(this.editingModelRules, 'otherRemark', []);
      }
      this.$refs.editingModel.validateField('exceptionDesc');
    },
    changeEditReserveStatus(val) {
      if (val === '1') {
        // 异常状态计划调查时间置空 改变校验规则
        this.editingModel.isAbnormal = true;
        this.editingModel.plannedSurveyTime = null;
        this.$set(this.editingModelRules, 'exceptionDesc', this.exceptionDesc);
        this.$set(this.editingModelRules, 'plannedSurveyTime', []);
      } else {
        // 正常状态异常信息置空 改变校验规则校验
        this.editingModel.isAbnormal = false;
        this.editingModel.exceptionDesc = null;
        this.$set(this.editingModelRules, 'plannedSurveyTime', this.plannedSurveyTime);
        this.$set(this.editingModelRules, 'exceptionDesc', []);
        this.$set(this.editingModelRules, 'otherRemark', []);
      }
      this.$refs.editingModel.clearValidate();
      if (this.editingModel.reserveTime) { // 预约时间有值则校验
        this.$refs.editingModel.validateField('reserveTime');
      }
      this.$refs.editingModel.validateField('reserveStatus');
    },
    changeEditPlannedSurveyTime() {
      this.$refs.editingModel.validateField('plannedSurveyTime');
    },
    // 校验编辑信息表单
    validEdit() {
      return new Promise((resolve, reject) => {
        this.$refs.editingModel.validate(valid => {
          if (valid) {
            resolve(true);
          } else {
            reject(Error);
          }
        });
      });
    },
    // 请求数据校验 拼装
    processingRequestData() {
      this.surveyReserveInfoRequest = deepClone(this.surveyReserveInfo);
      this.surveyReserveInfoRequest.surveyId = this.surveyId;
      if ((this.isEdit && !this.hasNormal && !this.resCanSubmit) || (!this.isEdit && this.branchesNum <= 2)) { // 正在编辑且没有正常状态 || 编辑完成且预约次数不大于2次且后台返回没有可提交状态
        this.surveyReserveInfoRequest.reserveInfo.push(deepClone(this.editingModel));
      }
      this.surveyReserveInfoRequest.appointmentSum = this.surveyReserveInfoRequest.reserveInfo.length;
      for (let i in this.surveyReserveInfoRequest.reserveInfo) {
        this.surveyReserveInfoRequest.reserveInfo[i].sort = Number(i) + 1;
        if (this.surveyReserveInfoRequest.reserveInfo[i].reserveStatus === '0' || this.surveyReserveInfoRequest.reserveInfo[i].reserveStatus === '正常') { // 是否已存在正常状态
          this.surveyReserveInfoRequest.plannedSurveyTime = this.surveyReserveInfoRequest.reserveInfo[i].plannedSurveyTime;
        } else {
          this.surveyReserveInfoRequest.plannedSurveyTime = '';
        }
        if (parseInt(this.surveyReserveInfoRequest.reserveInfo[i].reserveStatus) % 1 !== 0) {
          this.surveyReserveInfoRequest.reserveInfo[i].reserveStatus = reserveStatusConversion(this.surveyReserveInfoRequest.reserveInfo[i].reserveStatus);
        }
        if (parseInt(this.surveyReserveInfoRequest.reserveInfo[i].exceptionDesc) % 1 !== 0) {
          this.surveyReserveInfoRequest.reserveInfo[i].exceptionDesc = this.exceptionDescConversion(this.surveyReserveInfoRequest.reserveInfo[i].exceptionDesc);
        }
      }
    },
    // 预约信息保存
    doSave() {
      if (!this.clicked) {
        this.clicked = true;
        this.beforeSave();
      }
    },
    // 保存之前
    beforeSave() {
      if (this.isEdit) {
        this.validEdit().then(flag => {
          if (flag) {
            this.processingRequestData();
            this.surveyReserveInfoRequest.flag = false;
            this.saveRequest();
          }
        });
      } else {
        this.processingRequestData();
        this.surveyReserveInfoRequest.flag = false;
        if (this.surveyReserveInfoRequest.reserveInfo.length <= 3) {
          this.saveRequest();
        }
      }
    },
    // 保存请求
    saveRequest() {
      this.$MyFetch.post(surveyApi.reserveSave, this.surveyReserveInfoRequest).then(data => {
        if (data) {
          this.$message({
            showClose: true,
            message: '保存成功',
            type: 'success'
          });
          this.saved = true;
          this.$refs.surveyDeatil.getData();
          setTimeout(() => {
            this.clicked = false;
          }, 1500);
        }
      }).catch((err) => {
        this.$error(err.message);
      });
    },
    // 预约信息提交
    doSend() {
      if (this.hasNormal || this.resCanSubmit || this.branchesNum === 3 || !this.editingModel.isAbnormal || this.hasCancel) { // 可提交条件
        this.canSubmit = true; // 可提交
      } else {
        this.canSubmit = false;
      }
      if (this.isEdit) {
        this.validEdit().then(flag => {
          if (flag && this.canSubmit) {
            this.processingRequestData();
            this.surveyReserveInfoRequest.flag = true;
            this.sendRequest();
          } else {
            this.$message({
              showClose: true,
              message: '该状态不可提交',
              type: 'warning'
            });
          }
        });
      } else {
        if (this.canSubmit) {
          this.processingRequestData();
          this.surveyReserveInfoRequest.flag = true;
          this.sendRequest();
        } else {
          this.$message({
            showClose: true,
            message: '该状态不可提交',
            type: 'warning'
          });
        }
      }
    },
    // 提交请求
    sendRequest() {
      this.$MyFetch.post(surveyApi.reserveSave, this.surveyReserveInfoRequest).then(data => {
        if (data) {
          this.$message({
            showClose: true,
            message: '提交成功',
            type: 'success'
          });
          this.$router.push({
            path: 'pending-task'
          });
        }
      }).catch((err) => {
        this.$error(err.message);
      });
    },
    // 任务退还主管
    doBack() {
      this.surveyInfo = {
        surveyId: this.surveyId
      };
      this.$MyFetch.post(surveyApi.taskReturn, this.surveyInfo).then(data => {
        if (data) {
          this.$message({
            showClose: true,
            message: '回退成功',
            type: 'success'
          });
          this.$router.push({
            path: 'pending-task'
          });
        }
      }).catch((err) => {
        this.$error(err.message);
      });
    }
  },
  components: {
    surveyDetail
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
.audit_box .audit_top {
  .content {
    padding-bottom: 0;
  }
  .top_conten {
    width: auto;
    padding-top: 0;

    &:first-child {
      width:340px;
      margin-right:0;
    }
    &:nth-child(2) {
      margin-left:27px;
      margin-right: 0;
      width:250px;
    }
    &:nth-child(3) {
      margin-left:30px;
      margin-right: 0;
      width:340px;
    }
  }
}
.top_content_full_line {
  margin-left: 33px;
  margin-bottom: 10px;
  padding-top: 10px;
}

.operation_btn_group {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  float: left;
  margin-left: 33px;
  // margin-right: 87px;
  margin-bottom: 10px;

  & > div {
    width: 14px;
    height: 14px;
    background-size: 14px;
  }
  .plus {
    background: url(../../../../../assets/img/icon_plus.png) no-repeat center;
    background-size: 14px;
  }
  .minus {
    margin: 0 12px;
    background: url(../../../../../assets/img/icon_minus.png) no-repeat center;
    background-size: 14px;
  }
  .edit {
    background: url(../../../../../assets/img/icon_edit.png) no-repeat center;
    background-size: 14px;
  }
  .sure {
    background: url(../../../../../assets/img/icon_sure.png) no-repeat center;
    background-size: 14px;
  }
}
.operation_btn_group_sure{
  height:30px;
  margin-top:25px;
  padding-top: 10px;
}

/* 新增按钮 */
.add {
 width: 100px;
 height: 40px;
 border: none;
 background: #538bf1;
 border-radius: 4px;
 color: #fff;
 display: block;
 cursor: pointer;
 margin: 20px 30px;
}
.content_btn {
  clear:both;
  margin: 10px 20px;
}
.tail_btn {
  float: right;
  margin-right: 10px;
}
.el-form-item {
  float: left;
}
.margin10{
  margin: 10px 0;
}
.input_box {
  // width: 1440px;
  clear: both;
  overflow: auto;

  .width340{
    width: 340px;
  }
  .width345{
    width: 345px;
  }
}

@media screen and (min-width: 1915px) {
  .input_box .width_auto {
      width: 705px;
  }
}

@media screen and (max-width: 1915px) {
  .input_box .width_auto {
      width: 815px;
  }
}
.input_box_last {
  padding-top: 30px;
  margin-left: 30px;
  margin-right: 30px;
  clear:both;
  border-top: 1px solid #e5e5e5;

  .is-required {
    margin-left: 0;
  }
}
.margin_left30{
  margin-left: 30px;
}
.is-required {
  margin-left: 30px;
}
.is-required-button {
  width: 100px;
}
</style>
