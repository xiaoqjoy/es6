<template>
  <div class="contract-dailog-body">
    <div class="right-div">
      <el-button size="mini" class="down-btn" v-if="contractData.leaseContractUrl" @click="downloadPdfFile(contractData.leaseContractUrl,'租客合同')">下载合同</el-button>
      <el-button size="mini" class="down-btn" v-if="contractData.terminationUrl&&contractData.contractStatus === 'DELETE'" @click="downloadPdfFile(contractData.terminationUrl,'租客合同终止协议')">下载终止协议</el-button>
    </div>
    <el-tabs v-model="tabIndex">
      <el-tab-pane label="合同" name="1">
        <div class="tab-pane-wrapper contract-pdf-wrapper">
          <embed v-if="contractData.leaseContractUrl" width="100%" height="100%" class="iframe-block" :src="getDownloadUrl(contractData.leaseContractUrl,'租客合同')" type="application/pdf" frameborder="0">
          <div v-else class="nodata">暂无合同</div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="终止协议" name="2" v-if="contractData.terminationUrl&&contractData.contractStatus === 'DELETE'">
        <div class="tab-pane-wrapper contract-pdf-wrapper">
          <!-- <iframe v-if="contractData.terminationUrl" class="iframe-block" :src="getDownloadUrl(contractData.terminationUrl)" frameborder="0"></iframe> -->
          <!-- 测试大佬的电脑用 “iframe” 看不到 ‘中止协议’，改用 “embed” -->
          <embed v-if="contractData.terminationUrl" width="100%" height="100%" :src="getDownloadUrl(contractData.terminationUrl,'租客合同终止协议')" type="application/pdf">
          <div v-else class="nodata">暂无终止协议</div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tabIndex: '1'
    };
  },
  props: {
    contractData: {
      type: Object,
      default() {
        return {
          leaseContractUrl: '',
          terminationUrl: ''
        };
      }
    }
  },
  inject: ['getDownloadUrl', 'downloadPdfFile'],
  computed: {

  }
};
</script>
<style lang="scss" scoped>
.contract-dailog-body {
  padding: 10px 0;
  background: #fff;
  .contract-info-body {
    position: relative;
  }
  .right-div {
    position: absolute;
    right: 10px;
    top: 53px;
    z-index: 10;
  }
  .iframe-block {
    width: 100%;
    height: 640px;
    display: block;
  }
  .down-btn {
    padding: 6px 12px;
  }
  .tab-pane-wrapper {
    padding: 10px;
    background: #fff;
    height: 420px;
    overflow-y: auto;
  }
  .contract-pdf-wrapper {
    .nodata {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
    }
  }
}
</style>
