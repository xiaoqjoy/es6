<style lang="less" rel="stylesheet/less" scoped>
  .drop_loan{
    .dialog-box{
      width: 960px;
      background: #fff;
      .title_type {
        text-align: center;
        background: #fff;
        font-size: 18px;
        letter-spacing: 1.3px;
        padding-left: 20px;
        font-weight: bold;
        box-shadow: 0 2px 6px 0 #d0d0d0;
      }
      .complete-product {
        margin: 20px 30px;
        height: 628px;
        overflow: scroll;
      }
      .adddiv {
        padding: 5px;
      }
      .qr-group {
        box-shadow: 0 2px 6px 0 #d0d0d0;
      }
      .check {
        margin: 0 auto;
        display: block;
        width: 140px;
      }
      .comfirm-btn {
        margin-top: 40px;
        margin-bottom: 0px;
      }
      .qrinfo {
        width: 48%;
        display: inline-block;
      }
      .additem {
        font-size: 32px;
        color: #538bf1;
      }
      .additem:hover {
        cursor: pointer;
      }
      .toptitle {
        line-height: 1.5;
        margin-bottom: 10px;
      }
      .middle {
        margin-top: 16px;
      }
      .titledesc {
        background: #ececec;
        color: #666;
        font-size: 16px;
        margin-bottom: 10px;
        height: 30px;
        line-height: 30px;
      }
      .itemdet {
        border: 1px solid #e5e5e5;
        text-align: center;
      }
    }
  }

</style>
<template>
  <div class="drop_loan">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <div class="dialog-box__top">
        <h5 class="title_type">专属二维码</h5>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <div class="qr-group adddiv">
        <button type="button" @click="addNew" class="add check"> + 新增</button>
      </div>
      <div class="complete-product">
        <div v-for="(item, k) in form" :key="item.id" class="demo-form-inline qr-group">
          <div class="qrinfo">
            <span>二维码产品</span>
            <el-select :disabled="item.isDisabled" v-model="item.qrProduct" placeholder="二维码产品">
              <el-option v-for="setting in qrProduct" :key="setting.itemCode" :label="setting.itemDesc" :value="setting.itemCode"></el-option>
            </el-select>
          </div>
          <div class="qrinfo">
            <span>二维码状态</span>
            <el-select v-model="item.qrStatus" placeholder="二维码状态">
              <el-option v-for="setting in qrStatus" :key="setting.itemCode" :label="setting.itemDesc" :value="setting.itemCode"></el-option>
            </el-select>
          </div>
          <i class="el-icon-circle-plus additem" @click="addItem(k)" circle></i>
          <div class="itemdet">
            <el-row class="titledesc">
              <el-col :span="5"><div class="grid-content toptitle">客户经理:</div></el-col>
              <el-col :span="5"><div class="grid-content toptitle">所属团队:</div></el-col>
              <el-col :span="12"><div class="grid-content toptitle">归属时间:</div></el-col>
            </el-row>
            <el-row
              class="line item"
              v-if="item.customerManagers.length > 0"
              v-for="(line, lineIndex) in item.customerManagers"
              :key="lineIndex"
            >
              <el-form
                :model="line"
                :ref="'customerManagers'+lineIndex"
                label-width="100px"
                :rules="rule"
                label-position="top"
              >
                <el-col :span="5"  v-if="line.isDisabled">
                  <div class="grid-content bg-purple">
                    <el-form-item prop="umAccount">
                        <el-select
                          clearable
                          filterable
                          v-model="line.umAccount"
                          placeholder="请选择"
                          @change="getGroup(line.umAccount, k, lineIndex)"
                        >
                          <el-option
                            v-for="(items, count) in customerMangerList"
                            :key="items.userId + count"
                            :label="items.userName"
                            :value="items.userIdValue"
                          ></el-option>
                        </el-select>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="5"  v-if="line.isDisabled">
                  <div class="grid-content bg-purple">
                    <el-form-item prop="teamNoValue">
                      <el-select
                        clearable
                        filterable
                        v-model="line.teamNoValue"
                        placeholder="请选择">
                        <el-option
                          v-for="items in groupListArr[k][lineIndex]"
                          :key="items.teamNoValue"
                          :label="items.teamName"
                          :value="items.teamNoValue"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="5"  v-if="!line.isDisabled">
                  <div class="grid-content bg-purple middle">
                    {{line.umName}}
                  </div>
                </el-col>
                <el-col :span="5"  v-if="!line.isDisabled">
                  <div class="grid-content bg-purple middle">
                    {{line.teamName}}
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <el-form-item prop="effectiveTime">
                       <el-date-picker
                        v-model="line.effectiveTime"
                        class="select_7"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="开始时间">
                      </el-date-picker>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <el-form-item prop="invalidTime">
                      <el-date-picker
                        v-model="line.invalidTime"
                        class="select_7"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="结束时间">
                      </el-date-picker>
                    </el-form-item>
                  </div>
                </el-col>
              </el-form>
              <el-col :span="1">
                <div class="grid-content bg-purple">
                  <i v-if="line.isDisabled" class="el-icon-remove-outline middle" @click="delLine(k, lineIndex)" circle></i>
                </div>
              </el-col>
            </el-row>
          </div>
          <div>
            <button type="button" @click="comfirm(item)" class="add comfirm-btn">确定</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import '@common/css/dialog';
  import {marketingApi} from '../../js/server.js';
  export default{
    props: {
      row: Object
      // userId: String,
      // marketTeamId: String,
      // organizationId: String,
      // umName: String,
      // teamName: String,
      // companyName: String
    },
    data() {
      return {
        groupListArr: [],
        loading: false,
        originForm: [],
        form: [],
        qrProduct: [],
        qrStatus: [{itemCode: true, itemDesc: "启用"}, {itemCode: false, itemDesc: "停用"}],
        customerManagers: [],
        customerMangerList: [{userId: "1212", userName: "测试"}],
        groupList: [],
        rule: {
          umAccount: [{
            required: true,
            message: '请选择客户经理',
            trigger: 'change'
          }],
          teamNoValue: [{
            required: true,
            message: '请选择所属团队',
            trigger: 'change'
          }],
          effectiveTime: [{
            required: true,
            message: '请选择归属时间',
            trigger: 'change'
          }],
          invalidTime: [{
            required: true,
            message: '请选择归属时间',
            trigger: 'change'
          }]
        }
      };
    },
    methods: {
      loadingOpen() {
        this.loading = this.$loading({
          lock: true,
          text: '处理中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      },
      loadingClose() {
        this.loading && this.loading.close();
      },
      getGroup (umAccount, k, lineIndex) {
        if (!umAccount) {
          return false;
        }
        console.log(umAccount, k, lineIndex);
        if (!this.groupListArr[k]) {
          this.groupListArr[k] = [];
        }
        let param = umAccount.split("|")[0];
        // this.groupListArr[k][lineIndex] = [{teamNo: "1", teamName: "绿叶队", companyNo: "001", campanyName: "北京分公司"}];
        this.loadingOpen();
        this.$MyFetch.get(marketingApi.teamOfManager, {userId: param})
        .then((res = {}) => {
          for (let i = 0; i < res.length; i++) {
            res[i].teamNoValue = res[i].companyName + "|" + res[i].companyNo + "|" + res[i].teamName + "|" + res[i].teamNo;
          }
          // let arr = this.groupListArr[k];
          // arr[lineIndex] = res;
          // this.groupListArr.splice(k, 0, arr);
          this.groupListArr[k][lineIndex] = res;
          this.groupListArr = JSON.parse(JSON.stringify(this.groupListArr));
          console.log(this.groupListArr, "所属团队列表");
          this.loadingClose();
        })
        .catch((e) => {
          this.loadingClose();
          this.$error(e.message);
        });
      },
      close() {
        this.$emit('close');
      },
      delLine (k, delLine) {
        console.log(k, delLine);
        this.form[k].customerManagers.splice(delLine, 1);
      },
      addNew() {
        let data = {
          qrProduct: "CBHB",
          qrProductName: "渤海银行(联合运营)",
          qrStatus: true,
          customerManagers: []
        };
        this.form.push(data);
      },
      addItem(k) {
        console.log(k);
        let newData = {
          ticket: "",
          umAccount: "",
          umName: "",
          teamNo: "",
          teamName: "",
          companyNo: "",
          companyName: "",
          effectiveTime: "",
          invalidTime: "",
          isDisabled: true
        };
        this.form[k].customerManagers.push(newData);
        if (!this.groupListArr[k]) {
          this.groupListArr[k] = [];
        }
      },
      checkForm(formName) {
        let hasPass = true;
        this.$refs[formName][0].validate((valid) => {
          if (!valid) {
            hasPass = false;
          }
        });
        return hasPass;
      },
      // 数组去重
      unique (arr) {
        return Array.from(new Set(arr));
      },
      comfirm(value) {
        console.log(value, "初始化");
        let item = this.$lodash.cloneDeep(value);
        let webkey = [];
        for (let i = 0; i < item.customerManagers.length; i++) {
          if (!this.checkForm('customerManagers' + i)) {
            this.confirmFn("请先完成正在编辑的表格", "error");
            return false;
          }
          if (item.customerManagers[i].effectiveTime > item.customerManagers[i].invalidTime) {
            this.$error("起始时间不能大于终止时间!");
            return false;
          }
          if (item.customerManagers[i].umAccount.indexOf("|") > -1) {
            item.customerManagers[i].umName = item.customerManagers[i].umAccount.split("|")[1];
            item.customerManagers[i].umAccount = item.customerManagers[i].umAccount.split("|")[0];
          }
          if (!item.customerManagers[i].teamNo) {
            item.customerManagers[i].teamNo = item.customerManagers[i].teamNoValue.split("|")[3];
          }
          item.customerManagers[i].webkey = item.customerManagers[i].umAccount + item.customerManagers[i].teamNo;
          webkey.push(item.customerManagers[i].webkey);
        }
        for (let i = 0; i < this.originForm.length; i++) {
          if (this.originForm[i].qrProduct === item.qrProduct && this.originForm[i].isDisabled && !item.isDisabled) {
            this.$error("此二维码产品已生成二维码，无法重复生成！");
            return false;
          }
        };
        console.log(webkey, "webkey", this.unique(webkey));
        if (webkey.length !== this.unique(webkey).length) {
          this.$error("相同客户经理无法重复绑定！");
          return false;
        }
        item.channelNo = this.row.exclusiveChannelId;
        item.channelName = this.row.channelName;
        for (let i = 0; i < this.qrProduct.length; i++) {
          if (this.qrProduct[i].itemCode === item.qrProduct) {
            item.qrProductName = this.qrProduct[i].itemDesc;
          }
        }
        for (let i = 0; i < item.customerManagers.length; i++) {
          if (!item.customerManagers[i].ticket) {
            item.customerManagers[i].companyName = item.customerManagers[i].teamNoValue.split("|")[0];
            item.customerManagers[i].companyNo = item.customerManagers[i].teamNoValue.split("|")[1];
            item.customerManagers[i].teamName = item.customerManagers[i].teamNoValue.split("|")[2];
            // item.customerManagers[i].teamNo = item.customerManagers[i].teamNoValue.split("|")[3];
            // item.customerManagers[i].umName = item.customerManagers[i].umAccount.split("|")[1];
            // item.customerManagers[i].umAccount = item.customerManagers[i].umAccount.split("|")[0];
          }
        }
        console.log(item, this.originForm);
        this.$MyFetch.post(marketingApi.exclusiveQrcodeSave, item)
        .then((data = {}) => {
          this.$alert(data, "提示", {
            confirmButtonText: '确定'
          });
          this.getData();
        })
        .catch((err) => {
          this.$error(err.message);
        });
      },
      getAllMembers () {
      // 获取所有成员
      this.$MyFetch.get(marketingApi.allMembers)
      .then((res = {}) => {
        for (let i = 0; i < res.length; i++) {
          res[i].userIdValue = res[i].userId + "|" + res[i].userName;
        }
        this.customerMangerList = res;
        console.log("all member", res);
      })
      .catch((e) => {
        this.$error(e.message);
      });
      },
      getData() {
        this.$MyFetch.get(marketingApi.commonSetting, {categoryCode: 'qrcode_bizsrc'})
        .then((res = {}) => {
          this.qrProduct = res;
          this.$MyFetch.get(marketingApi.exclusivQrcodeList, {channelNo: this.row.exclusiveChannelId})
          .then((data) => {
            for (var i = 0; i < data.length; i++) {
              data[i].isDisabled = true;
            }
            console.log(data);
            this.originForm = this.$lodash.cloneDeep(data);
            this.form = data;
          })
          .catch((e) => {
            this.$error(e.message);
          });
        });
      }
    },
    mounted() {
      this.getAllMembers();
      this.getData();
    }
  };
</script>
