<style lang="less" rel="stylesheet/less" scoped>
  .drop_loan{
    .dialog-box{
      width: 1200px;
      .dialog-box__middle-form {
        height: auto;
      }
      .title_type {
      text-align: center;
      background: #fff;
      font-size: 18px;
      letter-spacing: 1.3px;
      padding-left: 20px;
      font-weight: bold;
      box-shadow: 0 2px 6px 0 #d0d0d0;
    }
      .mgtop {
        margin-top: 20px;
      }
      .el-form-item {
        width: 245px;
        margin-right: 30px;
        &:nth-child(4n) {
          margin-right: 0;
        }
      }
      .remark-item {
        width: 806px;
        margin-right: 0;
      }
      .dialog-box__middle{
        height: 495px;
        .middle{
          .el-select{
            display: block;
          }
          .el-textarea__inner{
            background: #d0d0d0;
          }
        }
      }
      .dialog-box__middle-1200{
        height: 442px;
        overflow-y: auto;
        margin: 0 20px;
        padding: 25px 30px;
        box-shadow: 0 2px 6px 0 #d0d0d0;
        .dialog-box__middle-top{
          padding: 20px 0;
          border-bottom: 1px solid  #d0d0d0;
          .title{
            font-size: 16px;
            .icon__gan{
              margin-right: 10px;
            }
          }
        }
      }
      .dialog-box__middle-form{
        overflow-y: auto;
        padding: 0 20px;
        .form__block{
          padding: 20px 30px;
          // margin-bottom: 20px;
          box-shadow: 0 2px 6px 0 #d0d0d0;
          .dialog-box__middle-top{
            padding-bottom: 20px;
            border-bottom: 1px solid  #E9E9E9;
            .title{
              font-size: 16px;
              .icon__gan{
                margin-right: 10px;
              }
            }
          }
        }
        .demo-form-inline {
          margin-bottom: 0;
        }
        .message__list{
          display: inline-block;
          white-space: nowrap;
          margin-right: 60px;
          margin-bottom: 20px;
          .item{
            margin-right: 60px;
            font-size: 0;
            .title{
              display: inline-block;
              margin-right: 5px;
              font-size: 14px;
              color: #666;
            }
            .content{
              font-size: 14px;
              display: inline-block;
            }
          }
          .item:last-child{
            margin-right: 0;
          }
        }
        .form__bottom {
          left: 50%;
          padding-bottom: 30px;
          background-color: rgba(255, 255, 255);
          text-align: center;
          padding-bottom: 20px;
          .add {
            width: 200px;
            height: 41px;
          }
        }
      }
    }
  }
</style>
<template>
  <div class="drop_loan exclusive_box">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <div class="dialog-box__top">
        <h5 class="title_type">{{ typeStr }}</h5>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <div class="complete-product">
        <div class="dialog-box__middle-form">
            <el-form :model="form"
              :rules="rules"
              ref="form"
              :disabled="limitEdit"
              label-width="100px"
              class="demo-form-inline" label-position="top" >
              <div class="form__block bg__white border__radius-5" >
                <ul class="message__list clearfix">
                  <li class="f__left item">
                    <h5 class="title">渠道编码：</h5>
                    <span class="content">{{ form.personalChannelId }}</span>
                  </li>
                  <li class="f__left item">
                    <h5 class="title">维护人员：</h5>
                    <span class="content">{{ userInfo.userName }}</span>
                  </li>
                  <li class="f__left item">
                    <h5 class="title">维护日期：</h5>
                    <span class="content">{{ today }}</span>
                  </li>
                </ul>
                <div class="dialog-box__form__group">
                  <el-form-item label="姓名" prop="personalName">
                    <el-input v-model="form.personalName"></el-input>
                  </el-form-item>
                  <el-form-item label="证件类型" prop="certificateTypeCode">
                    <el-select v-model="form.certificateTypeCode" placeholder="请选择">
                      <el-option v-for="setting in certificate_type" :key="setting.itemCode" :label="setting.itemDesc" :value="setting.itemCode"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="证件号码" prop="certificateNum">
                    <el-input v-model="form.certificateNum"></el-input>
                  </el-form-item>
                  <el-form-item label="手机号码" prop="mobileTelephoneNum">
                    <el-input v-model="form.mobileTelephoneNum"></el-input>
                  </el-form-item>
                  <el-form-item label="合作起始时间" prop="cooperateStartDate">
                    <el-date-picker
                      v-model="form.cooperateStartDate"
                      value-format="yyyy-MM-dd hh:mm:ss"
                      type="date"
                      @change="coopChange"
                      :picker-options="coopStartOption"
                      placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="合作终止时间" prop="cooperateEndDate">
                    <el-date-picker
                      v-model="form.cooperateEndDate"
                      value-format="yyyy-MM-dd hh:mm:ss"
                      type="date"
                      @change="coopChange"
                      :picker-options="coopEndOption"
                      placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="进件状态" prop="rejectApplicationStatusCode">
                    <el-select v-model="form.rejectApplicationStatusCode" placeholder="请选择">
                      <el-option label="正常进件" value="N"></el-option>
                      <el-option label="停用进件" value="U"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="所属分公司" prop="organizationId">
                    <el-select v-model="form.organizationId" filterable placeholder="请选择">
                      <el-option v-for="oid in organizationIds" :key="oid.id" :label="oid.organizationName" :value="oid.organizationId"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="所属客户经理" prop="belongToUserId">
                    <el-select
                      v-model="form.belongToUserId"
                      :remote-method="getManagerOptionsByName"
                      clearable
                      remote
                      filterable
                      placeholder="请输入客户经理"
                      @focus="focusHandler"
                      :disabled="limitManager">
                        <el-option v-for="bid in belongToManager" :key="bid.userId" :label="bid.userName" :value="bid.userId"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="备注" prop="remarkTxt" class="remark-item">
                    <el-input maxlength="100" v-model="form.remarkTxt"></el-input>
                  </el-form-item>
                </div>
              </div>
            </el-form>
            <div class="form__bottom">
              <el-button class="add finish" type="primary " @click="finish" v-if="!limitEdit">保存</el-button>
              <el-button class="add finish" type="primary " @click="close" v-else>关闭</el-button>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import '@common/css/dialog';
  import rules from '@common/js/rules';
  import {marketingApi} from '../../js/server.js';
  import { userInfo } from '@common/js/localStorage';
  import { fileCos } from '../../../../common/js/fileCos.js';

  export default{
    props: {
      type: String,
      exclusive_channel_type: Array,
      agency_type: Array,
      industry_type: Array,
      certificate_type: Array,
      organizationIds: Array,
      belongToUserIds: Array,
      belongToUserId: String,
      isAdmin: Boolean,
      isManager: Boolean,
      isTeamLeader: Boolean,
      data: Object
    },
    computed: {
      typeStr() {
        let type = "";
        switch (this.type) {
          case 'add':
            type = '新增';
            break;
          case 'edit':
            type = '编辑';
            break;
        }
        return type;
      }
    },
    data() {
      let checkCertificateNum = (rule, value, callback) => {
        if (this.form.certificateTypeCode === "Ind01") {
          if (!fileCos.checkIdcard(value) && !!value) {
            callback(new Error('请输入正确的身份证号码'));
          } else {
            callback();
          }
        } else {
          const valReg2 = /^[0-9a-zA-Z]+$/;
          if (!valReg2.test(value)) {
            callback(new Error('请输入正确的证件号码'));
          } else {
            callback();
          }
        }
      };
      let checkName = (rule, value, callback) => {
        const valReg = /^[\u4e00-\u9fa5·]{1,15}$/;
        if (!valReg.test(value) && !!value) {
          return callback(new Error('请输入15个以内的汉字'));
        } else {
          callback();
        }
      };
      return {
        limitEdit: !this.isAdmin && this.type === 'edit',
        limitManager: !this.isAdmin && !this.isTeamLeader && this.isManager,
        today: this.$Moment().format('YYYY-MM-DD'),
        userInfo: JSON.parse(userInfo.getUserInfo()),
        coopStartOption: {},
        coopEndOption: {},
        belongToManager: this.belongToUserIds,
        loading: false,
        form: {
          "belongToUserId": "",
          "certificateNum": "",
          "certificateTypeCode": "",
          "cooperateEndDate": "",
          "cooperateStartDate": "",
          "mobileTelephoneNum": "",
          "organizationId": "",
          "personalChannelId": "",
          "personalName": "",
          "rejectApplicationStatusCode": "",
          "remarkTxt": ""
        },
        rules: {
          personalName: [
            { required: true, message: '请填写姓名', trigger: 'blur' },
            { validator: checkName, trigger: 'blur' }
          ],
          certificateTypeCode: [
            { required: true, message: '请选择证件类型', trigger: 'change' }
          ],
          certificateNum: [
            { required: true, message: '请填写证件号码', trigger: 'blur' },
            { validator: checkCertificateNum, message: '请填写正确的证件号码', trigger: 'blur' }
          ],
          mobileTelephoneNum: [
            { required: true, message: '请填写手机号码', trigger: 'blur' },
            { validator: rules.phoneRule, trigger: 'blur' }
          ],
          cooperateStartDate: [
            { required: true, message: '请选择合作起始时间', trigger: 'change' }
          ],
          cooperateEndDate: [
            // { required: true, message: '请选择合作终止时间', trigger: 'change' }
          ],
          rejectApplicationStatusCode: [
            // { required: true, message: '请选择进件状态', trigger: 'change' }
          ],
          organizationId: [
            { required: true, message: '请选择所属分公司', trigger: 'change' }
          ],
          belongToUserId: [
            { required: true, message: '请输入所属客户经理', trigger: 'change' }
          ]
        }
      };
    },
    methods: {
      getManagerOptionsByName(userName) {
        if (!userName) {
          return;
        }
        if (!this.isTeamLeader || this.isAdmin) {
          this.loading = true;
          this.belongToManager = [];
          this.$MyFetch.get(marketingApi.marketingManagementMembers, {
            postTypeCodeList: ['CM', 'EC'],
            userName
          })
          .then((data) => {
            this.loading = false;
            data = data || {};
            this.belongToManager = data.list;
          })
          .catch((e) => {
            this.loading = false;
            this.$error(e.message);
          });
        }
      },
      focusHandler() {
        if ((!this.isTeamLeader || this.isAdmin) && !this.form.belongToUserId) {
          this.belongToManager = [];
        }
      },
      coopChange() {
        let start = this.form.cooperateStartDate;
        let end = this.form.cooperateEndDate;
        start = start && new Date(start).setHours(0);
        end = end && new Date(end).setHours(23);
        if (start) {
          this.coopEndOption = Object.assign({}, this.coopEndOption, {
            disabledDate(time) {
              return time.getTime() < new Date(start).getTime();
            }
          });
        }
        if (end) {
          this.coopStartOption = Object.assign({}, this.coopStartOption, {
            disabledDate(time) {
              return time.getTime() > new Date(end).getTime();
            }
          });
        }
      },
      close () {
        this.form = {};
        this.$emit('close');
      },
      update() {
        this.$emit('update');
      },
      finish() {
        this.$refs.form.validate(valid => {
          if (valid) {
            let form = Object.assign({}, this.form);
            if (!form.rejectApplicationStatusCode) {
              form.rejectApplicationStatusCode = 'N';
            }
            let method = this.type === 'add' ? 'post' : 'put';
            this.$MyFetch[method](marketingApi.PersonalChannels, form)
              .then((data = {}) => {
                this.$alert("保存成功！");
                this.update();
                this.close();
              })
              .catch((e) => {
                this.$error(e.message);
              });
          }
        });
      }
    },
    mounted() {
      if (this.type !== 'add') {
        this.form = this.$lodash.cloneDeep(this.data);
      } else {
        this.form.certificateTypeCode = "Ind01";
      }
      if (this.belongToManager.length === 0) {
        this.belongToManager = [{
          userId: this.data.belongToUserId,
          userName: this.data.belongToUserName
        }];
      }
      if (this.form.belongToUserId === this.userInfo.userId) {
        this.limitEdit = false;
      }
      if (!this.isAdmin && !this.isTeamLeader && this.isManager) {
        this.$set(this.form, "belongToUserId", this.belongToUserId);
      }
    }
  };
</script>
