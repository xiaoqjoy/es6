<style lang="less" rel="stylesheet/less" scoped>
  .table-wrap {
    padding: 0 30px 18px;
    background: #fff;
    .el-date-editor--date {
      width: 100%;
    }
  }
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
        .el-table {
          border: 1px solid #e5e5e5;
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
            margin-bottom: 20px;
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
            margin-bottom: 0;
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
    <div class="dialog-box" v-show="detail">
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
                  <h5 class="title">姓名：</h5>
                  <span class="content">{{ form.userName }}</span>
                </li>
                <!-- <li class="f__left item">
                  <h5 class="title">团队长：</h5>
                  <span class="content">{{ form.teamLeaderUserName }}</span>
                </li> -->
                <li class="f__left item">
                  <h5 class="title">公司邮箱：</h5>
                  <span class="content">{{ form.workEmail }}</span>
                </li>
                <li class="f__left item">
                  <h5 class="title">维护人员：</h5>
                  <span class="content">{{ userInfo.userName }}</span>
                </li>
                <li class="f__left item">
                  <h5 class="title">维护日期：</h5>
                  <span class="content">{{ today }}</span>
                </li>
                <li class="f__left item" v-if="type==='edit'">
                  <h5 class="title">UM账号：</h5>
                  <span class="content">{{ form.userId }}</span>
                </li>
              </ul>
              <div class="dialog-box__form__group">
                <el-form-item label="UM账号" prop="userId" v-if="type==='add'">
                  <el-input v-model="form.userId" @change="getFromUserId"></el-input>
                </el-form-item>
                <el-form-item label="证件类型" prop="certificateTypeCode">
                  <el-select v-model="form.certificateTypeCode" placeholder="请选择">
                    <el-option v-for="setting in certificate_type" :key="setting.itemCode" :label="setting.itemDesc" :value="setting.itemCode"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="证件号码" prop="certificateNum">
                  <el-input v-model="form.certificateNum" @change="getFromCert"></el-input>
                </el-form-item>
                <!-- <el-form-item label="所属营销单位" prop="marketTeamId">
                  <el-select v-model="form.marketTeamId" placeholder="请选择" @change="getFromTeam">
                    <el-option v-for="team in marketingManagementTeams" :key="team.marketTeamId" :label="team.marketTeamName" :value="team.marketTeamId"></el-option>
                  </el-select>
                </el-form-item> -->
                <el-form-item label="岗位级别" prop="postLevelId">
                  <el-select v-model="form.postLevelId" placeholder="请选择">
                    <el-option v-for="setting in post_level" :key="setting.itemCode" :label="setting.itemDesc" :value="setting.itemCode"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="性别" prop="genderTypeCode">
                  <el-select v-model="form.genderTypeCode" placeholder="请选择">
                    <el-option label="男" value="1"></el-option>
                    <el-option label="女" value="2"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="出生日期" prop="birthDate">
                  <el-date-picker
                    v-model="form.birthDate"
                    type="date"
                    value-format="yyyy-MM-dd hh:mm:ss"
                    placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="手机号码" prop="mobileTelephoneNum">
                  <el-input v-model="form.mobileTelephoneNum"></el-input>
                </el-form-item>
                <el-form-item label="个贷资格" prop="memberProduct">
                  <el-select multiple v-model="form.memberProduct" placeholder="请选择">
                    <el-option v-for="type in ProductTopBusinessType" :key="type.codeValue" :label="type.codeText" :value="type.codeValue"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
          </el-form>
          <div class="table-wrap" v-if="tableData.length > 0">
            <el-table
              :data="tableData"
              style="width: 100%">
                <el-table-column
                  prop="team.marketTeamName"
                  label="营销团队">
                </el-table-column>
                <el-table-column
                  prop="postTypes.itemDesc"
                  label="工种">
                </el-table-column>
                <el-table-column
                  prop="team.teamLeaderUserName"
                  label="团队长">
                </el-table-column>
                <el-table-column
                  prop="availableDate"
                  label="生效日期">
                  <template slot-scope="scope">
                    <el-date-picker
                    v-model="scope.row.availableDate"
                    type="date"
                    value-format="yyyy-MM-dd hh:mm:ss"
                    placeholder="选择日期">
                    </el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="unavailableDate"
                  label="终止日期">
                  <template slot-scope="scope">
                    <el-date-picker
                    v-model="scope.row.unavailableDate"
                    :disabled="!scope.row.team.id"
                    type="date"
                    value-format="yyyy-MM-dd hh:mm:ss"
                    placeholder="选择日期">
                    </el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="postTypes.takeOverUserName"
                  label="接管客户经理">
                </el-table-column>
                <el-table-column
                  fixed="right"
                  width="200"
                  label="操作">
                  <template slot-scope="scope">
                    <el-button @click="showTransfer(scope.$index, scope.row)" type="text" size="small" :disabled="scope.row.postTypes.postTypeCode === 'BS' || !!scope.row.team.takeOverUserName || !scope.row.team.id">管户移交</el-button>
                    <el-button @click="showTranHistory(scope.row)" type="text" size="small">移交记录</el-button>
                  </template>
                </el-table-column>
              </el-table>
          </div>
          <div class="form__bottom">
            <el-button class="finish" type="success" @click="showHistory" v-if="type === 'edit'">历史记录</el-button>
            <el-button class="finish" type="warning" @click="showAuthority">角色授权</el-button>
            <el-button class="add finish" type="primary" @click="finish">保存</el-button>
          </div>
        </div>
      </div>
    </div>
    <authority v-if="authority"
      :post_type="post_type"
      :post_level="post_level"
      :marketingManagementTeams="marketingManagementTeams"
      :tableData="tableData"
      @finish="finishAuthority"
      @close="closeAuthority"
    ></authority>
    <history v-if="history"
      :userId="userId"
      :post_type="post_type"
      :post_level="post_level"
      @close="closeInfoHistory"></history>
    <transfer v-if="transfer"
      :post_type="post_type"
      :rowProp="row"
      @finish="finishTransfer"
      @close="closeInfoTransfer"></transfer>
    <transfer-history v-if="transferHistory"
      :userId="userId"
      :marketTeamId="marketTeamId"
      @close="closeInfoTransferHistory"></transfer-history>
  </div>
</template>
<script type="text/ecmascript-6">
  import authority from '../authority/authority.vue';
  import history from '../history/history.vue';
  import transfer from '../transfer/transfer.vue';
  import transferHistory from '../transfer-history/transfer-history.vue';
  import '@common/css/dialog';
  import rules from "@common/js/rules";
  import {marketingApi} from '../../js/server.js';
  import { userInfo } from '@common/js/localStorage';
  import { fileCos } from '../../../../common/js/fileCos.js';
  export default{
    props: {
      type: String,
      post_type: Array,
      post_level: Array,
      certificate_type: Array,
      marketingManagementTeams: Array,
      ProductTopBusinessType: Array,
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
      detail() {
        return !this.authority && !this.history && !this.transfer && !this.transferHistory;
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
      let checkPostLevelId = (rule, value, callback) => {
        if (this.tableData && this.tableData.length > 0) {
          let flag = false;
          this.tableData.forEach((data) => {
            if (data.postTypes.itemCode === "CM") {
              flag = true;
            }
          });
          if (flag && !value) {
            return callback(new Error('请选择岗位级别'));
          }
        }
        callback();
      };
      return {
        today: this.$Moment().format('YYYY-MM-DD'),
        userInfo: JSON.parse(userInfo.getUserInfo()),
        authority: false,
        history: false,
        transfer: false,
        transferHistory: false,
        tableData: [],
        userId: '',
        index: '',
        postTypeCode: '',
        marketTeamId: '',
        organizationId: '',
        row: {},
        form: {
          userId: '',
          userName: '',
          leaderName: '',
          workEmail: '',
          genderTypeCode: '',
          postTypeCode: '',
          birthDate: '',
          certificateTypeCode: '',
          certificateNum: '',
          marketTeamId: '',
          postLevelId: '',
          takeOverUserId: '',
          mobileTelephoneNum: '',
          memberProduct: []
        },
        rules: {
          userId: [
            { required: true, message: '请填写UM账号', trigger: 'blur' }
          ],
          genderTypeCode: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          postTypeCode: [
            { required: true, message: '请选择工种', trigger: 'change' }
          ],
          birthDate: [
            { required: true, message: '请选择出生日期', trigger: 'change' }
          ],
          certificateTypeCode: [
            { required: true, message: '请选择证件类型', trigger: 'change' }
          ],
          certificateNum: [
            { required: true, message: '请填写证件号码', trigger: 'blur' },
            { validator: checkCertificateNum, message: '请填写正确的证件号码', trigger: 'blur' }
          ],
          marketTeamId: [
            { required: true, message: '请选择所属营销单位', trigger: 'change' }
          ],
          postLevelId: [
            { validator: checkPostLevelId, message: '请选择岗位级别', trigger: 'change' }
          ],
          mobileTelephoneNum: [
            { required: true, message: '请填写手机号码', trigger: 'blur' },
            { validator: rules.phoneRule, trigger: 'blur' }
          ],
          memberProduct: [
            { required: true, message: '请选择个贷资格', trigger: 'change' }
          ]
        }
      };
    },
    components: {
      authority,
      history,
      transfer,
      transferHistory
    },
    methods: {
      close() {
        this.$emit('close');
      },
      update() {
        this.$emit('update');
      },
      showAuthority() {
        this.authority = true;
      },
      closeAuthority() {
        this.authority = false;
      },
      closeInfoHistory () {
        this.history = false;
      },
      closeInfoTransfer () {
        this.transfer = false;
      },
      closeInfoTransferHistory () {
        this.transferHistory = false;
      },
      finishAuthority(roles) {
        this.tableData = roles;
        this.authority = false;
        this.$emit('show');
      },
      finishTransfer(row) {
        this.transfer = false;
        let postTypes = this.tableData[this.index].postTypes;
        postTypes = Object.assign({}, postTypes, {
          takeOverUserId: row.userId,
          takeOverUserName: row.userName
        });
        let data = Object.assign({}, this.tableData[this.index], {postTypes});
        this.$set(this.tableData, this.index, data);
      },
      finish() {
        this.$refs.form.validate(valid => {
          let data = {
            alterFlag: 'F',
            memberRole: []
          };
          if (!this.form.userName) {
            this.$error("请输入正确的UM账号");
            return;
          }
          if (this.tableData.length > 0) {
            data.alterFlag = "T";
            this.tableData.forEach((table) => {
              if (!table.availableDate) {
                valid = false;
                this.$error("请填写生效日期");
              }
              if (this.type === "edit" && table.postTypes.postTypeCode !== 'BS' && table.unavailableDate && (!table.postTypes.takeOverUserId || table.postTypes.takeOverUserId === "--")) {
                valid = false;
                this.$error("请完善接管客户经理");
              }
              data.memberRole.push({
                availableDate: table.availableDate || '',
                marketTeamId: table.team.marketTeamId,
                postTypeCode: table.postTypes.postTypeCode,
                takeOverUserId: table.postTypes.takeOverUserId || '',
                unavailableDate: table.unavailableDate || ''
              });
            });
          }
          if (valid) {
            let form = Object.assign({}, this.form, data);
            let method = this.type === 'add' ? 'post' : 'put';
            this.$MyFetch[method](marketingApi.marketingManagementMembers, form)
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
      },
      showHistory() {
        this.userId = this.form.userId;
        this.history = true;
      },
      showTransfer(index, row) {
        this.organizationId = row.team.organizationId;
        this.index = index;
        this.row = row;
        this.transfer = true;
      },
      showTranHistory(row) {
        this.userId = this.form.userId;
        this.marketTeamId = row.team.marketTeamId;
        this.transferHistory = true;
      },
      getFromUserId() {
        this.$MyFetch.get(marketingApi.UIUserInfo.replace("$userId", this.form.userId))
        .then((data = {}) => {
          if (data.list && data.list.length === 1) {
            let list = data.list[0];
            this.form.userName = list.name;
            this.form.mobileTelephoneNum = list.homePhoneNumber;
            this.form.workEmail = this.form.userId + "@dashuf.com";
          } else {
            this.$error("请输入正确的UM账号");
          }
        });
      },
      getFromCert() {
        let certNum = this.form.certificateNum;
        if (this.form.certificateTypeCode === "Ind01" && certNum && /^[1-9][0-9]{5}(19[0-9]{2}|200[0-9]|2010)(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])[0-9]{3}[0-9xX]$/.test(certNum)) {
          if (certNum[16] % 2 === 1) {
            this.form.genderTypeCode = '1';
          } else {
            this.form.genderTypeCode = "2";
          }
          this.form.birthDate = certNum.substring(6, 10) + "-" + certNum.substring(10, 12) + "-" + certNum.substring(12, 14) + " 00:00:00";
        }
      },
      getFromTeam() {
        this.marketingManagementTeams.forEach((team) => {
          if (this.form.marketTeamId === team.marketTeamId) {
            this.form.teamLeaderUserName = team.teamLeaderUserName;
          }
        });
      }
    },
    mounted() {
      if (this.type !== 'add') {
        this.form = this.$lodash.cloneDeep(this.data);
        this.postTypeCode = this.form.postTypeCode;
        this.marketTeamId = this.form.marketTeamId;
        if (this.form.memberRole && this.form.memberRole.length > 0) {
          let arr = [];
          this.form.memberRole.forEach((role) => {
            this.post_type.forEach((type) => {
              if (role.postTypeCode === type.itemCode) {
                role.itemDesc = type.itemDesc;
              }
            });
            arr.push({
              team: role,
              postTypes: role,
              availableDate: role.availableDate,
              unavailableDate: role.unavailableDate
            });
          });
          this.tableData = arr;
        }
      } else {
        this.form.certificateTypeCode = "Ind01";
      }
    }
  };
</script>
