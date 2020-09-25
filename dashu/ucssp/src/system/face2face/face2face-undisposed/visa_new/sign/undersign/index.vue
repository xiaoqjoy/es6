<template>
  <div>
    <el-dialog class="documents" title="资料签署" :visible="documentsVisible" @close="$emit('closeDocDialog', true)" width="1200px" center :close-on-click-modal="false" top="0">
      <div class="dialog-top-right theme">
        <i class="iconfont icon-video"></i>
        <span @click="$showImage(applicationId, '柜面面签', {selectProductId:productId})">上传影像资料</span>
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
              <el-option v-for="item in printers" :key="item.id" :value="item.id" :label="item.name"></el-option>
            </el-select>
            <el-button class="width100 button-default" @click="printCompact">打印</el-button>
          </div>
          <div class="download-wrap" v-else>
            <el-button class="width100 button-default btn-download" @click="downloadCompact">下载</el-button>
          </div>
        </div>
        <div class="documents-right">
          <video-component v-if="documentsVisible"
            :width="388" :height="480"
            :applicationId="applicationId"
            :customerName="customerName"
            :productId="productId" videoType="0"
            ref="video" name="video"
            @noRequire="noRequireHandle"
            @documentsResult="documentsResultHandle">
          </video-component>
        </div>
      </div>
      <div class="submit-btn no-require">
        <el-button class="button-warning" @click="noRequireStopVideo">不符合合作机构准入要求</el-button>
        <el-button class="width200 button-primary" @click="loanDataComplete">完成</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { baseApi } from "../../../../js/server";
import videoComponent from "@components/video/index"; // 影像组件
import { mapGetters } from 'vuex';
export default {
  name: 'undersign',
  props: ['documentsVisible', 'selectData', 'applicationId', 'customerName'],
  data() {
    return {
      documentsData: [], // 资料签署的数据列表
      is_all_choose: false, // 是否全选资料签署的数据列表
      printerId: "", // 选中的打印机id
      printers: [], // 打印机列表
      isSupportOnlinePrint: false // 是否支持一键打印
    };
  },
  methods: {
    delvModuleClass() {
      let timer = setInterval(() => {
        const eleM = document.getElementsByClassName('v-modal')[0];
        if (eleM) {
          eleM.setAttribute('style', 'z-index: 400 !important');
          clearInterval(timer);
        }
      }, 300);
    },
    getDocData() {
      // 726需求，查询产品需打印的合同列表
      this.$MyFetch.post(baseApi.getContractList, {
        applicationId: this.applicationId,
        productId: this.productId,
        productVersion: this.productVersion
      }).then(res => {
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
          this.getPrinters();
        }
        // 录像初始化
        this.$nextTick(() => {
          // 具体看vuex中的face2face模块
          if (this.openVideo) {
            this.$refs["video"].$emit("showVideo");
          }
        });
      }).catch(err => {
        console.error(err);
        this.confirmFn(err.message, "error");
      });
    },
    // 选中资料签署的数据，是否全选
    documentsChange() {
      this.is_all_choose = this.documentsData.every((item, index) => {
        return item.is_select;
      });
    },
    // 查询处理中心打印机列表
    getPrinters() {
      this.$MyFetch
        .get(baseApi.centerPrinters + this.applicationId + "/centerPrinters")
        .then(res => {
          // console.log(res);
          this.printers = res;
        })
        .catch(err => {
          console.error(err);
          this.confirmFn(err.message, "error");
        });
    },
    // 全选资料签署的数据列表
    allChoose(val) {
      if (val) {
        for (let item of this.documentsData) {
          item.is_select = true;
        }
      } else {
        for (let item of this.documentsData) {
          item.is_select = false;
        }
      }
    },
    // 下载合同
    downloadCompact() {
      let printFiles = JSON.parse(
        JSON.stringify(this.documentsData.filter(item => item.is_select))
      );
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
      console.log(this.applicationId);
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
    // 打印合同
    printCompact() {
      let printFiles = JSON.parse(
        JSON.stringify(this.documentsData.filter(item => item.is_select))
      );
      printFiles.forEach(item => {
        delete item.contractId;
        delete item.is_select;
      });
      // console.log(printFiles);

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

      const data = {
        applicationId: this.applicationId, // 贷款申请编号
        printFiles, // 打印文件列表（查询产品需打印的合同列表传过来）
        printerId: this.printerId, // 打印机ID（查询处理中心打印机列表传过来）
        productId: this.productId, // 产品编号（产品面签列表传过来）
        productVersion: this.productVersion // 产品版本号（产品面签列表传过来）
      };
      // console.log(data);
      this.$MyFetch.post(baseApi.productContract_print, data)
        .then(res => {
          // console.log(res);
          this.confirmFn("打印合同成功", "success");
          loading.close();
        }).catch(err => {
          console.error(err);
          this.confirmFn(err.message, "error");
          loading.close();
        });
    },
    documentsResult() {
      console.log("---------点击资料签署完成--------");
      let url = `${baseApi.faceInterview}/${this.applicationId}/${
        this.productId
      }/submit`;
      this.$MyFetch.post(url).then(res => {
          this.$emit('closeDocDialog', false);
        }).catch(err => {
          console.error(err);
          this.confirmFn(err.message, "error");
        });
    },
    // 捕获视频组件抛出的事件
    documentsResultHandle() {
      this.documentsResult();
    },
    loanDataComplete() {
      this.confirmFn("产品资料签署是否完成", "warning").then(() => {
        if (this.openVideo) {
          this.$refs["video"].$emit("stopVideo", "documentsResult");
        } else {
          this.documentsResult();
        }
      });
    },
    // 停止录像成功后，不符合合作机构准入要求 - 拒绝产品申请
    noRequireStopVideo() {
      this.confirmFn("确认不符合合作机构准入要求？", "warning").then(() => {
        if (this.openVideo) {
          this.$refs["video"].$emit("stopVideo", "noRequire");
        } else {
          this.noRequire();
        }
      });
    },
    noRequireHandle() {
      this.noRequire();
    },
    noRequire() {
      console.log("--------不符合合作机构准入要求---------");
      const data = {
        applicationId: this.applicationId,
        productId: this.productId
      };

      this.$MyFetch.post(baseApi.loanProductDeny, data)
        .then(res => {
          // 不符合合作机构准入要求，贷款申请已否决
          // console.log(res);
          this.confirmFn(
            `产品${this.productId}【${this.productName}】已否决`,
            "warning",
            false
          ).then(() => {
            this.$emit('closeDocDialog', false);
          });
        }).catch(err => {
          console.error(err);
          this.confirmFn(err.message, "error");
          // code为CPMS000424时，不符合合作机构准入要求，贷款申请已否决，跳转到已处理页面，改成统一用CPMS000499判断
          if (err.code === "CPMS000424" || err.code === "CPMS000499") {
            this.$router.push({ name: "face2face-disposed" });
          }
        });
    }
  },
  mounted() {
    // this.delvModuleClass();
    this.getDocData();
  },
  components: {
    videoComponent
  },
  computed: {
    ...mapGetters(['openVideo']),
    productId() {
      return this.selectData.productId;
    },
    productVersion() {
      return this.selectData.productVersion;
    },
    productName() {
      return this.selectData.productName;
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
          background-color: #ececec;
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
              border: 1px solid #d0d0d0;
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
      min-width: 388px;
      // height: 500px;
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
