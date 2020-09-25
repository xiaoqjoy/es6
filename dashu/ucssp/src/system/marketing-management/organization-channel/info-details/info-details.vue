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
                    <span class="content">{{ form.organizationChannelId }}</span>
                  </li>
                  <li class="f__left item">
                    <h5 class="title">维护日期：</h5>
                    <span class="content">{{ today }}</span>
                  </li>
                  <li class="f__left item">
                    <h5 class="title">维护人员：</h5>
                    <span class="content">{{ userInfo.userName }}</span>
                  </li>
                  <li class="f__left item">
                    <h5 class="title">录入机构：</h5>
                    <span class="content">{{ organization }}</span>
                  </li>
                </ul>
                <div class="dialog-box__form__group">
                  <el-form-item label="渠道类型" prop="organizationChannelTypeCode">
                    <el-select v-model="form.organizationChannelTypeCode" placeholder="请选择">
                      <el-option v-for="setting in exclusive_channel_type" :key="setting.itemCode" :label="setting.itemDesc" :value="setting.itemCode"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="渠道名称" prop="channelName">
                    <el-input v-model="form.channelName"></el-input>
                  </el-form-item>
                  <el-form-item label="中介类型" prop="agencyTypeCode">
                    <el-select v-model="form.agencyTypeCode" placeholder="请选择">
                      <el-option v-for="setting in agency_type" :key="setting.itemCode" :label="setting.itemDesc" :value="setting.itemCode"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="法人代表" prop="corporateRepresentativeName">
                    <el-input v-model="form.corporateRepresentativeName"></el-input>
                  </el-form-item>
                  <el-form-item label="所在行业" prop="industryTypeCode">
                    <el-select v-model="form.industryTypeCode" placeholder="请选择">
                      <el-option v-for="setting in industry_type" :key="setting.itemCode" :label="setting.itemDesc" :value="setting.itemCode"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="注册时间" prop="registrationDate">
                    <el-date-picker
                      v-model="form.registrationDate"
                      type="date"
                      value-format="yyyy-MM-dd hh:mm:ss"
                      placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="证件类型" prop="organizationCertificateTypeCode">
                    <el-select v-model="form.organizationCertificateTypeCode" placeholder="请选择">
                      <el-option v-for="setting in organization_certificate_type" :key="setting.itemCode" :label="setting.itemDesc" :value="setting.itemCode"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="证件号码" prop="organizationCertificateNum">
                    <el-input v-model="form.organizationCertificateNum"></el-input>
                  </el-form-item>
                  <el-form-item label="所属分公司" prop="organizationId">
                    <el-select v-model="form.organizationId" filterable placeholder="请选择">
                      <el-option v-for="oid in organizationIds" :key="oid.id" :label="oid.organizationName" :value="oid.organizationId"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="合作起始时间" prop="cooperateStartDate">
                    <el-date-picker
                      v-model="form.cooperateStartDate"
                      type="date"
                      @change="coopChange"
                      :picker-options="coopStartOption"
                      value-format="yyyy-MM-dd hh:mm:ss"
                      placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="合作终止时间" prop="cooperateEndDate">
                    <el-date-picker
                      v-model="form.cooperateEndDate"
                      type="date"
                      @change="coopChange"
                      :picker-options="coopEndOption"
                      value-format="yyyy-MM-dd hh:mm:ss"
                      placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="单位地址" prop="addressTxt">
                    <el-input v-model="form.addressTxt" maxlength="50"></el-input>
                  </el-form-item>
                  <el-form-item label="第一联系人" prop="contact1Name">
                    <el-input v-model="form.contact1Name"></el-input>
                  </el-form-item>
                  <el-form-item label="第一联系人电话" prop="contact1MobilePhoneNum">
                    <el-input v-model="form.contact1MobilePhoneNum"></el-input>
                  </el-form-item>
                  <el-form-item label="第二联系人" prop="contact2Name">
                    <el-input v-model="form.contact2Name"></el-input>
                  </el-form-item>
                  <el-form-item label="第二联系人电话" prop="contact2MobilePhoneNum">
                    <el-input v-model="form.contact2MobilePhoneNum"></el-input>
                  </el-form-item>
                  <el-form-item label="停止进件起始日期" prop="rejectApplicationStartDate">
                    <el-date-picker
                      v-model="form.rejectApplicationStartDate"
                      type="date"
                      @change="rejectChange"
                      :picker-options="rejectStartOption"
                      value-format="yyyy-MM-dd hh:mm:ss"
                      placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="停止进件终止日期" prop="rejectApplicationStopDate">
                    <el-date-picker
                      v-model="form.rejectApplicationStopDate"
                      type="date"
                      @change="rejectChange"
                      :picker-options="rejectEndOption"
                      value-format="yyyy-MM-dd hh:mm:ss"
                      placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="停止进件标志" prop="rejectApplicationStatusCode">
                    <el-select v-model="form.rejectApplicationStatusCode" placeholder="请选择">
                      <el-option label="正常进件" value="N"></el-option>
                      <el-option label="停用进件" value="U"></el-option>
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
                  <el-form-item label="邮政编码" prop="zipCode">
                    <el-input v-model="form.zipCode"></el-input>
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
  export default{
    props: {
      type: String,
      exclusive_channel_type: Array,
      agency_type: Array,
      industry_type: Array,
      organization_certificate_type: Array,
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
      },
      organization() {
        if (this.isAdmin) {
          return "大数信息总部";
        } else {
          return this.userInfo.departmentName;
        }
      }
    },
    data() {
      let checkOrganizationCertificateNum = (rule, value, callback) => {
        const valReg = /^[0-9a-zA-Z]+$/;
        if (!valReg.test(value)) {
          return callback(new Error('请输入正确的证件号码'));
        } else {
          callback();
        }
      };
      let checkChannelName = (rule, value, callback) => {
        const valReg = /^[\u4e00-\u9fa5]{1,30}$/;
        if (!valReg.test(value)) {
          return callback(new Error('请输入30个字符以内的汉字'));
        } else {
          callback();
        }
      };
      let checkContact2Name = (rule, value, callback) => {
        if (value && value === this.form.contact1Name) {
          return callback(new Error('联系人姓名不能一样'));
        }
        if (this.form.contact2MobilePhoneNum && !value) {
          return callback(new Error('请填写第二联系人姓名'));
        }
        callback();
      };
      let checkContact2MobilePhoneNum = (rule, value, callback) => {
        if (value && value === this.form.contact1MobilePhoneNum) {
          return callback(new Error('联系人电话不能一样'));
        }
        if (this.form.contact2Name && !value) {
          return callback(new Error('请填写第二联系人电话'));
        }
        callback();
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
        rejectStartOption: {},
        rejectEndOption: {},
        belongToManager: this.belongToUserIds,
        loading: false,
        form: {
          "addressTxt": "",
          "agencyTypeCode": "",
          "belongToUserId": "",
          "channelName": "",
          "contact1MobilePhoneNum": "",
          "contact1Name": "",
          "cooperateEndDate": "",
          "cooperateStartDate": "",
          "corporateRepresentativeName": "",
          "industryTypeCode": "",
          "organizationCertificateNum": "",
          "organizationCertificateTypeCode": "",
          "organizationChannelId": "",
          "organizationChannelTypeCode": "",
          "organizationId": "",
          "registrationDate": "",
          "rejectApplicationStartDate": "",
          "rejectApplicationStatusCode": "",
          "rejectApplicationStopDate": "",
          "zipCode": ""
        },
        rules: {
          organizationChannelTypeCode: [
            { required: true, message: '请选择渠道类型', trigger: 'change' }
          ],
          channelName: [
            { required: true, message: '请填写渠道名称', trigger: 'blur' },
            { required: true, validator: checkChannelName, trigger: 'blur' }
          ],
          agencyTypeCode: [
            { required: true, message: '请选择中介类型', trigger: 'change' }
          ],
          corporateRepresentativeName: [
            { required: true, message: '请填写法人代表', trigger: 'blur' },
            { validator: checkName, trigger: 'blur' }
          ],
          industryTypeCode: [
            { required: true, message: '请选择所在行业', trigger: 'change' }
          ],
          registrationDate: [
            { required: true, message: '请选择注册时间', trigger: 'change' }
          ],
          organizationCertificateTypeCode: [
            { required: true, message: '请选择证件类型', trigger: 'change' }
          ],
          organizationCertificateNum: [
            { required: true, message: '请填写证件号码', trigger: 'blur' },
            { validator: checkOrganizationCertificateNum, trigger: 'blur' }
          ],
          organizationId: [
            { required: true, message: '请选择所属分公司', trigger: 'change' }
          ],
          cooperateStartDate: [
            { required: true, message: '请选择合作起始时间', trigger: 'change' }
          ],
          cooperateEndDate: [
            // { required: true, message: '请选择合作终止时间', trigger: 'change' }
          ],
          addressTxt: [
            { required: true, message: '请填写单位地址', trigger: 'blur' }
          ],
          contact1Name: [
            { required: true, message: '请填写第一联系人', trigger: 'blur' },
            { validator: checkName, trigger: 'blur' }
          ],
          contact1MobilePhoneNum: [
            { required: true, message: '请填写第一联系人电话', trigger: 'blur' },
            { validator: rules.allPhoneRule, trigger: 'blur' }
          ],
          contact2Name: [
            { validator: checkName, trigger: 'blur' },
            { validator: checkContact2Name, trigger: 'blur' }
          ],
          contact2MobilePhoneNum: [
            { validator: rules.allPhoneRule, trigger: 'blur' },
            { validator: checkContact2MobilePhoneNum, trigger: 'blur' }
          ],
          rejectApplicationStartDate: [
            // { required: true, message: '请选择停止进件起始日期', trigger: 'change' }
          ],
          rejectApplicationStopDate: [
            // { required: true, message: '请选择停止进件终止日期', trigger: 'change' }
          ],
          rejectApplicationStatusCode: [
            // { required: true, message: '请选择停止进件标志', trigger: 'change' }
          ],
          belongToUserId: [
            { required: true, message: '请输入所属客户经理', trigger: 'change' }
          ],
          zipCode: [
            { required: true, message: '请填写邮政编码', trigger: 'blur' },
            { validator: rules.postRule, trigger: 'blur' }
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
      rejectChange() {
        let start = this.form.rejectApplicationStartDate;
        let end = this.form.rejectApplicationStopDate;
        start = start && new Date(start).setHours(0);
        end = end && new Date(end).setHours(23);
        if (start) {
          this.rejectEndOption = Object.assign({}, this.rejectEndOption, {
            disabledDate(time) {
              return time.getTime() < new Date(start).getTime();
            }
          });
        }
        if (end) {
          this.rejectStartOption = Object.assign({}, this.rejectStartOption, {
            disabledDate(time) {
              return time.getTime() > new Date(end).getTime();
            }
          });
        }
        if (start && end) {
          if (this.$Moment().isBetween(start, end)) {
            this.form.rejectApplicationStatusCode = 'U';
          } else {
            this.form.rejectApplicationStatusCode = 'N';
          }
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
            this.$MyFetch[method](marketingApi.OrganizationChannels, form)
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
