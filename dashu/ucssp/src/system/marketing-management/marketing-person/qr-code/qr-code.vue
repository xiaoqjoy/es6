<style lang="less" rel="stylesheet/less" scoped>
  .drop_loan{
    .dialog-box{
      width: 790px;
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
    }
    .el-form-item {
      margin-right: 20px;
    }
  }
  .check {
    margin: 20px 10px 20px 30px;
  }
  .comfirm-btn {
    margin-top: 40px;
    margin-bottom: 0px;
  }
</style>
<template>
  <div class="drop_loan">
    <div class="dialog-mask"></div>
    <div class="dialog-box" v-show="!isShowHandle && !isShowLog">
      <div class="dialog-box__top">
        <h5 class="title_type">专属二维码</h5>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <button type="button" @click="addNew" class="add check"> + 新增</button>
      <button type="button" @click="showLog()" class="add comfirm-btn">移交记录</button>
      <div class="complete-product">
        <el-form v-for="item in form" :key="item.id" :model="item" class="demo-form-inline" label-position="top">
            <el-form-item label="二维码产品" prop="qrProduct">
              <el-select :disabled="item.disable" v-model="item.qrProduct" placeholder="二维码产品">
                <el-option v-for="setting in qrProduct" :key="setting.itemCode" :label="setting.itemDesc" :value="setting.itemCode"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="二维码状态" prop="qrStatus">
              <el-select v-model="item.qrStatus" placeholder="二维码状态">
                <el-option v-for="setting in qrStatus" :key="setting.itemCode" :label="setting.itemDesc" :value="setting.itemCode"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="">
              <button type="button" @click="comfirm(item)" class="add comfirm-btn">确定</button>
              <button type="button" @click="showHandle(item)" class="add comfirm-btn" v-if="item.disable">移交</button>
            </el-form-item>
          </el-form>
      </div>
    </div>
    <handleover
      :rowProp="row"
      :umAccount="userId"
      :post_type="post_type"
      @finish="finishHandle"
      @close="closeHandle"
      v-if="isShowHandle"></handleover>
    <handleover-log :umAccount="userId" :teamNo="marketTeamId" v-if="isShowLog" @close="closeLog"></handleover-log>
  </div>
</template>
<script type="text/ecmascript-6">
  import '@common/css/dialog';
  import {marketingApi} from '../../js/server.js';
  import handleover from "../handleover/handleover";
  import handleoverLog from "../handleover-log/handleover-log";
  import { userInfo } from '@common/js/localStorage';
  export default{
    props: {
      post_type: Array,
      userId: String,
      umName: String,
      marketTeamId: String,
      organizationId: String,
      teamName: String,
      companyName: String
    },
    data() {
      return {
        originForm: [],
        form: [],
        qrProduct: [],
        qrStatus: [{itemCode: true, itemDesc: "启用"}, {itemCode: false, itemDesc: "停用"}],
        row: {},
        isShowHandle: false,
        isShowLog: false
      };
    },
    components: {
      handleover,
      handleoverLog
    },
    methods: {
      close() {
        this.$emit('close');
      },
      addNew() {
        let newData = {
          qrProduct: "CBHB",
          qrStatus: true
        };
        this.form.push(newData);
      },
      showLog() {
        console.log(this.marketTeamId);
        this.isShowLog = true;
      },
      closeLog() {
        this.isShowLog = false;
      },
      showHandle(row) {
        console.log(row);
        if (!row.qrStatus) {
          this.confirmFn("此二维码已停用，不能进行移交！", "warning", false);
          return;
        }
        this.isShowHandle = true;
        this.row = Object.assign({}, row, {
          marketTeamId: this.marketTeamId,
          organizationId: this.organizationId
        });
      },
      closeHandle() {
        this.isShowHandle = false;
      },
      finishHandle(row) {
        console.log(row);
        row.teamNo = row.marketTeamId; // 避免被覆盖
        row.companyNo = row.organizationId;
        Object.assign(row, this.row);
        this.addCustomerQr(row, "handleOver");
      },
      addCustomerQr(item, operate) {
        let qrProductName = "";
        for (var k = 0; k < this.qrProduct.length; k++) {
          if (this.qrProduct[k].itemCode === item.qrProduct) {
            qrProductName = this.qrProduct[k].itemDesc;
          }
        }
        let param = {
          umAccount: this.userId,
          umName: this.umName,
          teamNo: this.marketTeamId,
          companyNo: this.organizationId,
          teamName: this.teamName,
          companyName: this.companyName,
          qrProductName: qrProductName,
          operate,
          ...item
        };
        if (operate === "handleOver") {
          param = {
            umAccount: item.userId,
            umName: item.userName,
            teamNo: item.teamNo,
            companyNo: item.companyNo,
            teamName: item.marketTeamName,
            companyName: item.organizationName,
            qrProductName: qrProductName,
            qrProduct: this.row.qrProduct,
            qrStatus: this.row.qrStatus,
            operate,
            oldUmAccount: this.userId,
            oldUmName: this.umName,
            oldTeamNo: this.marketTeamId,
            oldTeamName: this.teamName,
            oldCompanyNo: this.organizationId,
            oldCompanyName: this.companyName,
            handleOverAccount: JSON.parse(userInfo.getUserInfo()).userName
          };
        }
        console.log(item);
        this.$MyFetch.post(marketingApi.marketingManagementNewQrCode, param)
        .then((data = {}) => {
          let msg = "恭喜您，二维码已经生成，编号" + data;
          if (operate === "handleOver") {
            this.isShowHandle = false;
            msg = data;
          }
          this.$message({
            message: msg,
            type: "success"
          });
          this.getData();
        })
        .catch((err) => {
          this.$error(err.message);
        });
      },
      comfirm(item) {
        console.log(item, this.originForm);
        if (item.serialNo) {
          let status = encodeURIComponent(item.qrStatus);
          let serialNo = encodeURIComponent(item.serialNo);
          this.$MyFetch.get(marketingApi.marketingManagementSwitch, {
            onOff: status,
            serialNo: serialNo,
            umAccount: this.userId,
            teamNo: this.marketTeamId,
            qrProduct: item.qrProduct
          })
          .then((data = {}) => {
            let msg = "恭喜您，二维码状态修改成功";
            this.$message({
              message: msg,
              type: "success"
            });
          })
          .catch((err) => {
            this.$error(err.message);
          });
        } else {
          for (var i = 0; i < this.originForm.length; i++) {
            if (this.originForm[i].qrProduct === item.qrProduct && this.originForm[i].serialNo && !item.serialNo) {
              this.$error("此二维码产品已生成二维码，无法重复生成！");
              return false;
            }
          };
          this.addCustomerQr(item, 'new');
        }
      },
      getData() {
        this.$MyFetch.get(marketingApi.commonSetting, {categoryCode: 'qrcode_bizsrc'})
        .then((res = {}) => {
          this.qrProduct = res;
          this.$MyFetch.get(marketingApi.marketingManagementGetQrCodeList, {umAccount: this.userId, teamNo: this.marketTeamId})
          .then((data) => {
            for (var i = 0; i < data.length; i++) {
              data[i].disable = true;
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
      this.getData();
      console.log(this.teamName, this.userId, this.marketTeamId, this.organizationId);
    }
  };
</script>
