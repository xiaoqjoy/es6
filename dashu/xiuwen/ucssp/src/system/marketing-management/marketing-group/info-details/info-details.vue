<style lang="less" rel="stylesheet/less" scoped>
  .drop_loan{
    .dialog-box{
      width: 1200px;
      .title_type {
        text-align: center;
        background: #fff;
        font-size: 18px;
        letter-spacing: 1.3px;
        padding-left: 20px;
        font-weight: bold;
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
            background: #E5E5E5;
          }
        }
      }
      .dialog-box__middle-1200{
        height: 442px;
        overflow-y: auto;
        margin: 0 20px;
        padding: 25px 30px;
        box-shadow:  0 1px 10px 0 rgba(0,0,0,0.05);
        .dialog-box__middle-top{
          padding: 20px 0;
          border-bottom: 1px solid  #E5E5E5;
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
        // padding: 0 20px;
        .table-wrap {
          padding: 0 30px 30px;
          background: #fff;
        }
        .el-table {
          border-left: 1px solid #e5e5e5;
        }
        .form__block{
          padding: 20px 30px;
          // margin-bottom: 20px;
          box-shadow:  0 1px 10px 0 rgba(0,0,0,0.05);
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
  <div class="drop_loan">
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
              label-width="100px"
              class="demo-form-inline" label-position="top" >
              <div class="form__block bg__white border__radius-5" >
                <ul class="message__list clearfix">
                  <li class="f__left item">
                    <h5 class="title">团队代码：</h5>
                    <span class="content">{{ form.marketTeamId }}</span>
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
                  <el-form-item label="所属分公司" prop="organizationId">
                    <el-select v-model="form.organizationId" filterable placeholder="所属分公司">
                      <el-option v-for="oid in organizationIds" :key="oid.id" :label="oid.organizationName" :value="oid.organizationId"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="团队名称" prop="marketTeamName">
                    <el-input v-model="form.marketTeamName" @change="updateAvailableDate"></el-input>
                  </el-form-item>
                  <el-form-item label="团队长" prop="teamLeaderUserId">
                    <el-select v-model="form.teamLeaderUserId" filterable placeholder="请选择团队长" @change="updateAvailableDate">
                      <el-option v-for="tid in teamLeaderUserIds" :key="tid.userId" :label="tid.userName" :value="tid.userId"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="联系电话" prop="mobileTelephoneNum">
                    <el-input v-model="form.mobileTelephoneNum" @change="updateAvailableDate"></el-input>
                  </el-form-item>
                  <el-form-item label="岗位级别" prop="teamLeaderPostLevelCd">
                    <el-select v-model="form.teamLeaderPostLevelCd" placeholder="请选择">
                      <el-option v-for="setting in team_leader_post_level" :key="setting.itemCode" :label="setting.itemDesc" :value="setting.itemCode"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="证件类型" prop="certificateTypeCode">
                    <el-select v-model="form.certificateTypeCode" placeholder="请选择">
                      <el-option v-for="setting in certificate_type" :key="setting.itemCode" :label="setting.itemDesc" :value="setting.itemCode"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="证件号码" prop="certificateNum">
                    <el-input v-model="form.certificateNum"></el-input>
                  </el-form-item>
                  <el-form-item label="生效日期" prop="availableDate">
                    <el-date-picker
                      v-model="form.availableDate"
                      type="date"
                      @change="dateChange"
                      :picker-options="availableOption"
                      value-format="yyyy-MM-dd hh:mm:ss"
                      placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="终止日期" prop="unavailableDate">
                    <el-date-picker
                      v-model="form.unavailableDate"
                      type="date"
                      @change="dateChange"
                      :picker-options="unavailableOption"
                      value-format="yyyy-MM-dd hh:mm:ss"
                      placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
                </div>
              </div>
            </el-form>
            <div class="table-wrap" v-if="type == 'edit'">
              <el-table
                :data="tableData"
                border
                max-height="250"
                style="width: 100%">
                  <el-table-column
                    prop="marketTeamName"
                    label="团队名称">
                  </el-table-column>
                  <el-table-column
                    prop="teamLeaderUserName"
                    label="团队长">
                  </el-table-column>
                  <el-table-column
                    prop="mobileTelephoneNum"
                    label="联系电话">
                  </el-table-column>
                  <el-table-column
                    prop="teamLeaderPostLevel"
                    label="岗位级别">
                  </el-table-column>
                  <el-table-column
                    prop="certificateType"
                    label="证件类型">
                  </el-table-column>
                  <el-table-column
                    prop="certificateNum"
                    label="证件号码">
                  </el-table-column>
                  <el-table-column
                    prop="availableDate"
                    label="生效日期">
                  </el-table-column>
                  <el-table-column
                    prop="unavailableDate"
                    label="终止日期">
                  </el-table-column>
                </el-table>
            </div>
            <div class="form__bottom">
              <el-button class="add finish" type="primary" @click="finish">确认</el-button>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import '@common/css/dialog';
  import rules from "@common/js/rules";
  import {marketingApi} from '../../js/server.js';
  import { userInfo } from '@common/js/localStorage';
  import { fileCos } from '../../../../common/js/fileCos.js';
  export default{
    props: {
      type: String,
      teamLeaderUserIds: Array,
      organizationIds: Array,
      team_leader_post_level: Array,
      certificate_type: Array,
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
      let checkMarketTeamName = (rule, value, callback) => {
        const valReg = /^[\u4e00-\u9fa5]{1,15}$/;
        if (!valReg.test(value)) {
          return callback(new Error('请输入15个以内的汉字'));
        } else {
          callback();
        }
      };
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
      return {
        today: this.$Moment().format('YYYY-MM-DD'),
        userInfo: JSON.parse(userInfo.getUserInfo()),
        tableData: [],
        marketTeamName: '',
        teamLeaderUserId: '',
        mobileTelephoneNum: '',
        availableOption: {},
        unavailableOption: {},
        form: {
          organizationId: '',
          marketTeamName: '',
          teamLeaderUserId: '',
          mobileTelephoneNum: '',
          teamLeaderPostLevelCd: '',
          certificateTypeCode: '',
          certificateNum: '',
          availableDate: '',
          unavailableDate: ''
        },
        rules: {
          organizationId: [
            { required: true, message: '请选择所属分公司', trigger: 'change' }
          ],
          marketTeamName: [
            { required: true, message: '请输入团队名称', trigger: 'blur' },
            { validator: checkMarketTeamName, trigger: 'blur' }
          ],
          teamLeaderUserId: [
            { required: true, message: '请选择团队长', trigger: 'change' }
          ],
          mobileTelephoneNum: [
            { required: true, message: '请输入联系电话', trigger: 'blur' },
            { validator: rules.allPhoneRule, message: '请填写正确的联系电话', trigger: 'blur' }
          ],
          teamLeaderPostLevelCd: [
            { required: true, message: '请选择岗位级别', trigger: 'change' }
          ],
          certificateTypeCode: [
            { required: true, message: '请选择证件类型', trigger: 'change' }
          ],
          certificateNum: [
            { required: true, message: '请输入证件号码', trigger: 'blur' },
            { validator: checkCertificateNum, trigger: 'blur' }
          ],
          availableDate: [
            { required: true, message: '请选择生效日期', trigger: 'change' }
          ],
          unavailableDate: [
            // { required: true, message: '请选择终止日期', trigger: 'change' }
          ]
        }
      };
    },
    methods: {
      dateChange() {
        let start = this.form.availableDate;
        let end = this.form.unavailableDate;
        start = start && new Date(start).setHours(0);
        end = end && new Date(end).setHours(23);
        if (start) {
          this.unavailableOption = Object.assign({}, this.unavailableOption, {
            disabledDate(time) {
              return time.getTime() < new Date(start).getTime();
            }
          });
        }
        if (end) {
          this.availableOption = Object.assign({}, this.availableOption, {
            disabledDate(time) {
              return time.getTime() > new Date(end).getTime();
            }
          });
        }
      },
      updateAvailableDate() {
        if (this.type === "edit") {
          this.form.availableDate = this.$Moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
        }
      },
      update() {
        this.$emit('update');
      },
      close() {
        this.$emit('close');
      },
      finish() {
        this.$refs.form.validate(valid => {
          if (valid) {
            let form = Object.assign({}, this.form);
            if (this.type === 'edit') {
              if (form.marketTeamName !== this.marketTeamName || form.teamLeaderUserId !== this.teamLeaderUserId || form.mobileTelephoneNum !== this.mobileTelephoneNum) {
                form.alterFlag = 'T';
              }
            }
            let method = this.type === 'add' ? 'post' : 'put';
            this.$MyFetch[method](marketingApi.marketingManagementTeams, form)
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
        this.marketTeamName = this.form.marketTeamName;
        this.teamLeaderUserId = this.form.teamLeaderUserId;
        this.mobileTelephoneNum = this.form.mobileTelephoneNum;
        this.$MyFetch.get(marketingApi.marketingManagementTeamHistory.replace("{marketTeamId}", this.form.marketTeamId))
          .then((data) => {
            if (data && data.list) {
              this.tableData = data.list;
              let dates = ['availableDate', 'unavailableDate'];
              for (let i = this.tableData.length - 1; i >= 0; i--) {
                dates.forEach((date) => {
                  this.tableData[i][date] = this.tableData[i][date] ? this.$Moment(this.tableData[i][date]).format('YYYY-MM-DD') : '';
                });

                this.team_leader_post_level.forEach((code) => {
                  if (code.itemCode === this.tableData[i].teamLeaderPostLevelCd) {
                    this.tableData[i].teamLeaderPostLevel = code.itemDesc;
                  }
                });
                this.certificate_type.forEach((code) => {
                  if (code.itemCode === this.tableData[i].certificateTypeCode) {
                    this.tableData[i].certificateType = code.itemDesc;
                  }
                });
              }
            }
          });
      } else {
        this.form.certificateTypeCode = "Ind01";
      }
    }
  };
</script>
