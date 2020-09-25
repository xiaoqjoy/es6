<template>
    <div class="product-printer-pop">
      <div class="dialog-mask"></div>
      <div
        class="dialog-box"
        v-loading="showLoading"
        element-loading-text="打印中"
        element-loading-background="rgba(255, 255, 255, 0.5)">
        <div class="dialog-box__top">
          <h5 class="title">是否打印资料</h5>
          <span class="el-icon-close button button__close" @click="$emit('close')"></span>
        </div>
        <div class="content">
          <el-row>
            <el-col :span="24">
              <div class="product-table">
                <div class="product-table-header">
                  <div>材料名称</div>
                  <div>份数</div>
                </div>
                <div class="product-table-body">
                  <table>
                    <tbody>
                      <tr v-for="item in contractList" :key="item.contractId">
                        <td>
                          <div class="ellipsis">
                            <el-checkbox v-model="item.checked" @change="checkChange">{{ item.contractName }}</el-checkbox>
                          </div>
                        </td>
                        <td>
                          <el-input-number v-model="item.printCopies" controls-position="right" :min="0" :max="1000" size="mini"></el-input-number>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-checkbox :value="checkAll" @change="checkAllChange">全选</el-checkbox>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <span style="color:#606266;">服务中心打印机</span>
              <el-select v-model="printer" size="small" placeholder="请选择">
                <el-option
                  v-for="item in printerList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row type="flex" justify="center">
            <el-col :span="4"><el-button class="btn-ok" type="primary" size="small" @click="okFn">是</el-button></el-col>
            <el-col :span="4" :offset="1"><el-button class="btn-no" size="small" @click="cancelFn">否</el-button></el-col>
          </el-row>
        </div>
      </div>
    </div>
</template>
<script>
import { patchApi } from "../../js/server.js";  // eslint-disable-line

export default {
  props: ['applicationId'],
  data() {
    return {
      showLoading: false,
      contractList: [],
      printerList: [],
      printer: '',
      checkAll: false
    };
  },
  created() {
    this.getContractList();
    this.getPrinterList();
  },
  methods: {
    checkChange() {
      this.checkAll = this.contractList.every(item => item.checked);
    },
    checkAllChange(value) {
      this.checkAll = value;
      if (value) {
        this.contractList = this.contractList.map(item => ({...item, checked: true}));
      } else {
        this.contractList = this.contractList.map(item => ({...item, checked: false}));
      }
    },
    getContractList() {
      this.$MyFetch.get(patchApi.print.contractList, {
        applicationId: this.applicationId
      }).then(data => {
        this.contractList = (data.contracts || []).map(item => ({ ...item, checked: false }));
      }).catch(err => {
        this.$error(err.message, 'error');
      });
      /*
      setTimeout(() => {
        const list = [
          {
            "contractId": "c1",
            "contractName": "合同名称1",
            "printCopies": 1,
            "templateId": "num1"
          },
          {
            "contractId": "c2",
            "contractName": "合同名称2",
            "printCopies": 1,
            "templateId": "num2"
          },
          {
            "contractId": "c3",
            "contractName": "合同名称3",
            "printCopies": 1,
            "templateId": "num3"
          }
        ];
        this.contractList = list.map(item => ({ ...item, checked: false }));
      }, 100);
      */
    },
    getPrinterList() {
      this.$MyFetch.get(patchApi.print.printerList, {
        applicationId: this.applicationId
      }).then(data => {
        this.printerList = data || [];
      }).catch(err => {
        this.$error(err.message, 'error');
      });
      /*
      setTimeout(() => {
        this.printerList = [
          { "id": "p1", "installName": "aute", "ip": "127.0.0.1", "name": "打印机1 ", "position": "位置1", "status": "1" },
          { "id": "p2", "installName": "aute", "ip": "127.0.0.1", "name": "打印机2 ", "position": "位置2", "status": "1" },
          { "id": "p3", "installName": "aute", "ip": "127.0.0.1", "name": "打印机3 ", "position": "位置3", "status": "1" }
        ];
      }, 100);
      */
    },
    checkContract() {
      return this.contractList.filter(item => item.checked);
    },
    okFn() {
      const constractList = this.checkContract();
      if (constractList.length === 0) {
        this.$message({
          message: '请勾选打印资料',
          type: 'error'
        });
        return;
      }
      if (!this.printer) {
        this.$message({
          message: '请选择服务中心打印机',
          type: 'error'
        });
        return;
      }
      this.showLoading = true;
      this.$MyFetch.post(patchApi.print.printContract, {
        applicationId: this.applicationId,
        printFiles: constractList.map(item => ({
          contractName: item.contractName,
          printCopies: item.printCopies,
          templateId: item.templateId
        })),
        printerId: this.printer
      }).then(data => {
        this.showLoading = false;
        if (data) {
          this.$message({
            message: '打印成功',
            type: 'success'
          });
          this.$emit('close');
        }
        this.$emit('close');
      }).catch((err) => {
        this.$error(err.message, 'error');
        this.showLoading = false;
      });
    },
    cancelFn() {
      this.$emit('close');
    }
  }
};
</script>
<style lang="less" scoped>
.product-printer-pop {
    .dialog-box {
        width: 700px;
    }
}
.content {
  padding: 20px;
}
.el-row {
  margin-top: 10px;
}
.el-col {
    text-align: left;
    font-size: 14px;
}
.btn-ok, .btn-no {
  width: 100%;
}
.product-table {
  &-header {
    display: flex;
    height: 40px;
    line-height: 40px;
    background-color: #ececec;
    border: 1px solid #e9e9e9;
    border-bottom: 0;
    div:first-of-type {
      flex: 3;
      text-align: center;
    }
    div:last-of-type {
      flex: 1;
      text-align: center;
    }
  }
  &-body {
    max-height: 190px;
    overflow: hidden;
    overflow-y: auto;
    table {
      width: 100%;
      table-layout: fixed;
    }
    tr {
      border: 1px solid #d0d0d0;
    }
    td {
      box-sizing: border-box;
      height: 60px;
      line-height: 60px;
      padding: 0 20px
    }
    td:first-of-type {
      width: 75%;
    }
    td:last-of-type {
      width: 25%;
    }
  }
}
.ellipsis {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
