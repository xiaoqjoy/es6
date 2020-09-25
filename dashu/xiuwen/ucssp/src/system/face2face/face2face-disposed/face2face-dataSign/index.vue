<template>
  <div>
        <!-- 资料签署 -->
    <el-dialog class="documents" title="资料签署" :visible="documentsVisible" @close="$emit('closeDocDialog')" width="1200px" center :close-on-click-modal="false" top="0">
      <div class="dialog-top-right theme">
        <i class="iconfont icon-video"></i>
        <span @click="$showImage(applicationId, '柜面面签',{selectProductId:productId, menuId: 'face2face/face2face-disposed/loanData'}), doClick()">上传影像资料</span>
      </div>
      <div class="documents-home">
        <div class="documents-left">
          <div class="info-title">合同打印</div>
          <div class="info-table">
            <div class="info-table-header">
              <p>材料名称</p>
              <p v-if="isSupportOnlinePrint">份数</p>
            </div>
            <div class="info-table-body">
              <table>
                <tbody>
                  <tr v-for="item in documentsData" :key="item.name">
                    <td>
                      <el-checkbox v-model="item.is_select" @change="documentsChange">{{item.contractName}}</el-checkbox>
                    </td>
                    <td v-if="isSupportOnlinePrint">
                      <el-input-number v-model="item.printCopies" controls-position="right" :min="0" :max="1000" size="mini"></el-input-number>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="all-choose">
            <el-checkbox v-model="is_all_choose" @change="allChoose(is_all_choose, documentsData)">全选</el-checkbox>
          </div>

          <div class="printer" v-if="isSupportOnlinePrint">
            <span>服务中心打印机</span>
            <el-select v-model="printerId" placeholder="请选择">
              <el-option v-for="item in printerList" :key="item.id" :value="item.id" :label="item.name"></el-option>
            </el-select>
            <el-button class="width100 button-default" @click="printCompact">打印</el-button>
          </div>
          <div class="download-wrap" v-else>
            <el-button class="width100 button-default btn-download" @click="downloadCompact">下载</el-button>
          </div>
        </div>
      </div>

      <div class="submit-btn no-require">
        <el-button class="width200 button-primary" @click="loanDataComplete">完成</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {baseApi} from './../../js/server.js';
export default {
  props: ['documentsVisible', 'selectData'],
  data() {
    return {
      isSupportOnlinePrint: false, // 是否支持一键打印
      is_all_choose: '',
      printerId: '',
      printerList: [],
      documentsData: []
    };
  },
  created() {
    // console.log(this.selectData);
    this.isSupportOnlinePrint = true;
    // this.queryPrinter();
    this.getData();
  },
  beforeDestroy() {
    window.loanDataComponent = null;
  },
  methods: {
    // 下载合同
    downloadCompact() {
      // 过滤未选择项
      let printFiles = JSON.parse(JSON.stringify(this.documentsData)).filter(_e => _e.is_select);
      printFiles.forEach(item => {
        delete item.contractId;
        delete item.is_select;
        delete item.printCopies;
      });
      if (printFiles.length === 0) {
        this.confirmFn("请先选择下载资料", "error");
        return;
      }
      let loading = this.$loading({
        text: "",
        spinner: "",
        background: "transparent"
      });
      this.$MyFetch.post(baseApi.contractDownload, {
        applicationId: this.applicationId,
        printFiles,
        productId: this.productId,
        productVersion: this.productVersion
      }, 'blob')
      .then((res) => {
        this.$download(res);
        loading.close();
      })
      .catch((e) => {
        console.log(e);
        this.confirmFn(e.message, "error");
        loading.close();
      });
    },
    doClick() {
      // 便于index.html代码流能用到
      window.loanDataComponent = this;
    },
    // 用于标记用户何时上传影像
    signature() {
      this.$MyFetch.post(baseApi.imageOperation, {
        applicationId: this.applicationId,
        productId: this.productId
      }).then(_data => {

      }).catch(_erro => {
          this.confirmFn(_erro.message, "error");
      });
    },
    // 打印合同
    printCompact() {
      let printFiles = JSON.parse(JSON.stringify(this.documentsData)).filter(_e => _e.is_select);
      printFiles.forEach(item => {
        delete item.contractId;
        delete item.is_select;
      });
      if (printFiles.length === 0) {
        this.confirmFn("请选择产品需打印的合同列表", "error");
        return;
      }
      if (!this.printerId) {
        this.confirmFn("请选择处理中心打印机", "error");
        return;
      }
      let loading = this.$loading({
        text: "",
        spinner: "",
        background: "transparent"
      });
      this.$MyFetch.post(baseApi.productContract_print, {
        applicationId: this.applicationId,
        printFiles,
        productId: this.productId,
        printerId: this.printerId,
        productVersion: this.productVersion
      }).then(_data => {
        this.confirmFn("打印合同成功", "success");
        loading.close();
      }).catch(_err => {
        this.confirmFn(_err.message, "error");
        loading.close();
      });
    },
    allChoose(_val, _documentsData) {
      // _val为checkbox的值，_documentsData为this.documentsData
      this.$lodash.each(_documentsData, (_e, _i) => {
        _e.is_select = _val;
      });
    },
    // 选中资料签署的数据，是否全选
    documentsChange() {
      this.is_all_choose = this.documentsData.every((item, index) => {
        return item.is_select;
      });
    },
    getData() {
      let data = `${baseApi.getContractList}${this.productId}/${
        this.productVersion
      }`;
      this.$MyFetch
        .get(data)
        .then(res => {
          res = res || {};
          this.isSupportOnlinePrint = res.supportOnlinePrint;
          let data = res.contracts;
          data.forEach((item, index) => {
            item.is_select = false;
          });
          this.documentsData = data;

          // 是否全选
          this.documentsChange();

          // 查询处理中心打印机列表
          if (this.isSupportOnlinePrint) {
            this.queryPrinter();
          }

          this.documentsVisible = true;
        })
        .catch(err => {
          console.error(err);
          this.confirmFn(err.message, "error");
        });
      // this.documentsData = [
      //   {contractName: 'xxxx', is_select: true, printCopies: 4},
      //   {contractName: 'xxxx', is_select: true, printCopies: 4}
      // ];
    },
    // 查询打印机
    queryPrinter() {
      let url = `${baseApi.centerPrinters}/${this.applicationId}/centerPrinters`;
      this.$MyFetch.get(url)
        .then(_data => {
          this.printerList = _data;
        }).catch(_error => {
          this.confirmFn(_error.message, 'error');
        });
    },
    loanDataComplete() {
      this.$emit('closeDocDialog');
    }
  },
  computed: {
    applicationId() {
      return this.selectData.applicationId;
      // return 'RL20190430000011';
    },
    productId() {
      return this.selectData.productId;
    },
    productVersion() {
      return this.selectData.productVersionCode;
    }
  }
};
</script>

<style lang="less" scoped>
.documents {
  /deep/ div.el-dialog {
    margin-top: 0 !important;
    border-radius: 4px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    height: 670px;
    .el-dialog__header {
      height: 60px;
      box-shadow: 0 1px 10px 0 rgba(0,0,0,0.05);
      span.el-dialog__title {
        font-family: 'PingFangSC-Regular';
        color: #333333;
        letter-spacing: 1.38px;
      }
      button.el-dialog__headerbtn {
        top: 23px;
        i.el-dialog__close.el-icon.el-icon-close {
          font-weight: 600;
        }
      }
    }
    .el-dialog__body {
      padding: 20px;
      .dialog-top-right {
        top: 23px;
        font-family: 'PingFangSC-Regular';
      }
    }
  }
  .documents-home {
    display: flex;
    height: 482px;

    .documents-left {
      width: 100%;
      // height: 670px;
      text-align: left; //el-dialog的内容在IE11中默认居中，需要设置
      .boxShadow(20px, 30px);
      .info-title {
        font-family: 'PingFangSC-Medium';
        font-size: 16px;
        color: #333333;
        padding: 15px 0;
        .border(bottom, @gray);
        .selectorBefore(16px);
      }
      .info-table {
        margin-top: 20px;
        .info-table-header {
          background-color: #f9fafb;
          height: 40px;
          line-height: 40px;
          display: flex;
          text-align: center;
          border-top-right-radius: 5px;
          border-top-left-radius: 5px;
          border: 1px solid #e9e9e9;
          border-bottom: none;
          p {
            &:nth-child(1) {
              width: 75%;
            }
            &:nth-child(2) {
              flex: 1;
            }
          }
        }
        .info-table-body {
          width: 100%;
          text-align: center;
          margin-bottom: 20px;
          max-height: 190px;
          overflow-y: auto;
          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;
          table {
            width: 100%;
            tr {
              border: 1px solid #e5e5e5;
              td {
                height: 60px;
                line-height: 60px;
                &:first-child {
                  width: 75%;
                  text-align: left;
                  .el-checkbox {
                    margin-left: 20px;
                  }
                }
              }
            }
          }
        }
      }

      .all-choose {
        .border(bottom, #e9e9e9);
        padding-bottom: 20px;
        margin-bottom: 20px;
      }
      .printer {
        display: flex;
        align-items: center;
        .el-select {
          margin-left: 10px;
        }
        .el-button {
          margin-left: auto;
        }
      }
    }
    .documents-right {
      width: 388px;
      height: 500px;
      margin-left: 20px;
      .boxShadow(0, 0);
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .no-require{
    margin-top: 20px;
  }
}
</style>
