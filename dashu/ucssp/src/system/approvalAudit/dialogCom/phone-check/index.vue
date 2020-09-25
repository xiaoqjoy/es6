<style lang="less" rel="stylesheet/less" scoped>
  .dialog-box {
    background: #ececec;
    width: 1200px;
    height: 688px;
  }
  .el-icon-close {
    position: absolute;
    top: 21px;
    right: 43px;
    cursor: pointer;
    width: 12.4px;
    font-weight: bold;
  }
  .save {
    width: 200px;
    height: 40px;
    color: #fff;
    background: #538Bf1;
    margin-top: 30px;
  }
  .product_title_head{
    line-height: 60px;
  }
  .small-btn {
    width: 80px;
    height: 30px;
    background: #fff;
    color: #538Bf1;
    border: 1px solid #538Bf1;
    padding: 0;
    margin-top: 5px;
  }
  .list {
    width: 1160px;
    font-size: 14px;
    border: 1px solid #d0d0d0;
    border-radius: 4px;
    margin: 0 auto;
    height: 550px;
    overflow-y: auto;
    .line {
      line-height: 40px;
      background: #ececec;
      color: #666;
      font-size: 12px;
      border-bottom: 1px solid #d0d0d0;
      padding-top: 5px;
    }
    .item {
      font-size: 14px;
      color: #000;
      background: #fff;
      padding-bottom: 5px;
    }
    .blue-font {
      color: #538BF1;
      cursor: pointer;
    }
    .txt {
      width: 90%;
      margin: 0 auto;
    }
    .add {
      float: left;
      margin-left: 50px;
    }
    .nowrap {
      white-space:nowrap;
      overflow: hidden;
      cursor: pointer;
      text-overflow:ellipsis;
    }
  }
</style>
<template>
  <div class="import-message">
    <div class="dialog-mask" @click="close_()"></div>
    <div class="dialog-box">
      <div class="product-title">
        <span class="product_title_head strong_font">拨打电话</span>
        <span class="el-icon-close button button__close" @click="close_()"></span>
      </div>
      <div class="list">
        <el-row class="line">
          <el-col :span="2"><div class="grid-content bg-purple">姓名</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple-light">与借款人关系</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple">联系电话</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple-light">备注信息1</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple-light"  v-if="!appOrAud || sendBackFlg">备注信息2</div></el-col>
          <el-col :span="3"><div class="grid-content bg-purple">拨打</div></el-col>
          <el-col :span="3"><div class="grid-content bg-purple-light">查询录音</div></el-col>
        </el-row>
        <el-row
        class="line item"
        v-if="list.length > 0"
        v-for="(item, index) in list"
        :key="index">
          <el-form
          :model="item"
          :ref='"form"+index'
          label-width="100px"
          :rules="rules"
          label-position="top">
            <el-col :span="2">
              <div class="grid-content bg-purple">
                <el-tooltip placement="top">
                  <div slot="content">{{item.phoneCheckName}}</div>
                  <p class="nowrap">{{item.phoneCheckName || "---"}}</p>
                </el-tooltip>
              </div>
            </el-col>
            <el-col :span="4">
              <el-form-item prop="contactRelationCode">
                <el-select clearable v-if="item.phoneCheckNameCode === '003'" v-model="item.contactRelationCode" placeholder="请选择" :disabled="true">
                  <el-option
                  v-for="items in relationShip1"
                  :key = "items.itemCode"
                  :label="items.itemDesc"
                  :value="items.itemCode">
                  </el-option>
                </el-select>
                <el-select clearable v-if="item.phoneCheckNameCode === '001'" v-model="item.contactRelationCode" placeholder="请选择" :disabled="disabled || item.phoneCheckInd">
                  <el-option
                  v-for="items in relationShip"
                  :key = "items.itemCode"
                  :label="items.itemDesc"
                  :value="items.itemCode">
                  </el-option>
                </el-select>
                <el-select clearable v-if="item.phoneCheckNameCode === '002'" v-model="item.contactRelationCode" placeholder="请选择" :disabled="true">
                  <el-option
                  v-for="items in relationShip2"
                  :key = "items.itemCode"
                  :label="items.itemDesc"
                  :value="items.itemCode">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col
            :span="4">
              <div class="grid-content bg-purple">
                <el-form-item prop="phoneCheckPhoneNum">
                  <el-input maxlength="20" v-model="item.phoneCheckPhoneNum" :disabled="!item.canEdit || disabled || item.phoneCheckInd"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple-light">
                <el-tooltip placement="top">
                  <div slot="content">{{item.contactRemarkTxt1}}</div>
                  <p class="nowrap">{{item.contactRemarkTxt1 || "---"}}</p>
                </el-tooltip>
              </div>
            </el-col>
            <el-col :span="4" v-if="!appOrAud || sendBackFlg">
              <div class="grid-content bg-purple-light">
                <el-tooltip placement="top">
                  <div slot="content">{{item.contactRemarkTxt2}}</div>
                  <p class="nowrap">{{item.contactRemarkTxt2 || "---"}}</p>
                </el-tooltip>
              </div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple">
                <el-button :disabled="disabled"  class="small-btn" @click="makePhone(item, index)">
                  拨打电话
                </el-button>
              </div>
            </el-col>
            <el-col :span="3">
              <div
              class="grid-content bg-purple-light blue-font"
              v-if="item.id || !item.phoneCheckInd"
              @click="alert_phone_video(item.id)">
                查询录音
              </div>
            </el-col>
            <el-input
            v-if="item.showTxt1"
            maxlength="200"
            :disabled="disabled || !appOrAud"
            class="txt"
            v-model="item.phoneCheckRemarkTxt1"
            placeholder="请填写审批备注">
            </el-input>
            <el-input
            v-if="item.showTxt2" maxlength="200"
            :disabled="disabled  || appOrAud"
            class="txt"
            v-model="item.phoneCheckRemarkTxt2"
            placeholder="请填写审计备注">
            </el-input>
          </el-form>
        </el-row>
        <el-button plain class="small-btn add" @click="add" v-if="!disabled">+</el-button>
      </div>
      <el-button class="save"  @click="save()" v-if="!disabled">
        保存
      </el-button>
    </div>
    <!-- 电核勾选-查询录音 -->
    <phoneVideo v-if="alertPhoneVideo" :id="id"  @clsoe_videoList='close_phonevideo' :appOrAud="appOrAud"/>
  </div>
</template>

<script>
import "@common/css/dialog";
import {aprAudApi} from "../../js/server.js";
import myRules from '@common/js/rules.js';
import phoneVideo from "../phone-video/index.vue";

let item = {
  approveRemarkTxt: "",
  auditRemarkTxt: "",
  contactRelationCode: "",
  // id: "",
  phoneCheckName: "第三方",
  phoneCheckNameCode: "001",
  phoneCheckPhoneNum: "",
  apraudRemarkTxt: "  ",
  canEdit: true,
  canEditContact: true
};
  export default {
    data() {
      return {
        originalList: [],
        url: '',
        id: "",
        list: [],
        alertPhoneVideo: false, // 查看录音
        dialogImageUrl: '',
        dialogVisible: false,
        relationShip: [],
        relationShip1: [],
        relationShip2: [],
        rules: {
          contactRelationCode: [
            { required: true, message: '请选择联系人关系', trigger: 'change' }
          ],
          phoneCheckPhoneNum: [
            { required: true, message: '请填写联系电话', trigger: 'change' },
            { validator: myRules.allPhoneRule, message: '请填写正确的电话号码', trigger: 'blur' }
          ]
        }
      };
    },
    props: {
      disabled: Boolean,
      appOrAud: Boolean,
      sendBackFlg: Boolean
    },
    components: {
      phoneVideo
    },
    methods: {
      alert_phone_video(id) {
        this.id = id;
        this.alertPhoneVideo = true;
      },
      close_phonevideo() {
        this.alertPhoneVideo = false;
        this.id = "";
      },
      save () {
        if (this.appOrAud) {
          this.url = `${aprAudApi.taskDetail.phoneCheckOper}/${this.$route.query.appID}`;
        } else {
          this.url = `${aprAudApi.aud.taskDetail.phoneCheckOper}/${this.$route.query.appID}`;
        };
        let hasPass = 0;
        for (var i = 0; i < this.list.length; i++) {
          if (!this.checkForm('form' + i)) {
            hasPass += 1;
          }
        }
        if (hasPass === 0) {
          let data = JSON.parse(JSON.stringify(this.list));
          for (let i = 0; i < data.length; i++) {
            data[i].approveRemarkTxt = data[i].phoneCheckRemarkTxt1;
            data[i].auditRemarkTxt = data[i].phoneCheckRemarkTxt2;
            delete data[i].canEditContact;
            delete data[i].canEdit;
          }
          this.$MyFetch.post(this.url, {applicationId: this.$route.query.appID, contactPerson: data})
          .then((data = {}) => {
            this.$message({
              message: '保存成功',
              center: true,
              onClose: this.init()
            });
          })
          .catch(err => {
            this.$error(err.message);
          });
        }
      },
      checkForm (formName) {
        let hasPass = true;
        this.$refs[formName][0].validate((valid) => {
          if (!valid) {
            hasPass = false;
          }
        });
        return hasPass;
      },
      add () {
        this.list.push(JSON.parse(JSON.stringify(item)));
      },
      makePhone (item, index) {
        this.$refs['form' + index][0].validateField('phoneCheckPhoneNum', (valid) => {
          if (!valid) {
            if (((this.originalList.length - 1) >= index) && (item.phoneCheckPhoneNum === this.originalList[index].phoneCheckPhoneNum)) {
              let list = JSON.parse(JSON.stringify(this.list));
              if (this.appOrAud) {
                list[index].showTxt1 = true;
              } else {
                list[index].showTxt2 = true;
              }
              this.list = list;
              let url = "";
              if (this.appOrAud) {
                url = `${aprAudApi.taskDetail.phonecheckCall}/${this.$route.query.appID}`;
              } else {
                url = `${aprAudApi.aud.taskDetail.phonecheckCall}/${this.$route.query.appID}`;
              };
              let data = JSON.parse(JSON.stringify(item));
              delete data.remarkTxt;
              this.$MyFetch.post(url, {contactPerson: [data]})
              .then((data = {}) => {
                let list = JSON.parse(JSON.stringify(this.list));
                list[index].phoneCheckInd = true;
                this.list = list;
                console.log(data, "打电话成功");
              })
              .catch(err => {
                this.$error(err.message);
              });
            } else {
              this.$error("请先保存！");
            }
          }
        });
      },
      close_() {
        console.log(this.$lodash.isEqual(this.list, this.originalList));
        if (this.disabled || this.$lodash.isEqual(this.list, this.originalList)) {
          this.$emit("clsoe_windowAlert");
        } else {
          this.confirmFn('您已修改电核内容，是否确认关闭电核弹窗？', 'warning')
          .then(() => {
            this.$emit("clsoe_windowAlert");
          });
        }
      },
      init () {
        let url = "";
        let data = {
          readonlyFlg: false
        };
        if (this.disabled) {
          data.readonlyFlg = true;
        } else {
          data.readonlyFlg = false;
        }
        if (this.appOrAud) {
          url = `${aprAudApi.taskDetail.phonecheckRecord}/${this.$route.query.appID}`;
        } else {
          url = `${aprAudApi.aud.taskDetail.phonecheckRecord}/${this.$route.query.appID}`;
        };
        this.$MyFetch.get(url, data)
        .then((data = {}) => {
          this.list = this.fomatData(data.phoneCheckRecord);
          this.originalList = this.fomatData(data.phoneCheckRecord);
          console.log(this.list);
        })
        .catch(err => {
          this.$error(err.message);
        });
      },
      fomatData (arr) {
        let data = JSON.parse(JSON.stringify(arr));
        for (let i = 0; i < data.length; i++) {
          if (this.appOrAud) { // 审批
            if (data[i].phoneCheckRemarkTxt1 || data[i].phoneCheckInd) {
              data[i].showTxt1 = true;
            } else {
              data[i].showTxt1 = false;
            }
            if (data[i].phoneCheckRemarkTxt2 && this.sendBackFlg) {
              data[i].showTxt2 = true;
            } else {
              data[i].showTxt2 = false;
            }
          } else { // 审计
            if (data[i].phoneCheckRemarkTxt1) {
              data[i].showTxt1 = true;
            } else {
              data[i].showTxt1 = false;
            }
            if (data[i].phoneCheckRemarkTxt2 || data[i].phoneCheckInd) {
              data[i].showTxt2 = true;
            } else {
              data[i].showTxt2 = false;
            }
          }
          if (data[i].phoneCheckNameCode === "003") {
            data[i].canEdit = false;
          }
          if (data[i].phoneCheckNameCode === "002") {
            data[i].canEdit = true;
          }
          if (data[i].phoneCheckNameCode === "001") {
            data[i].canEdit = true;
          }
        }
        return data;
      }
    },
    created() {
      this.$getDictCode("phone_check_third_party").then(res => {
        this.relationShip = res;
      });
      this.$getDictCode("phone_check_people").then(res => {
        this.relationShip2 = res;
      });
      this.$getDictCode("apr_contact_relation").then(res => {
        this.relationShip1 = res;
      });
      this.init();
    }
  };
</script>
