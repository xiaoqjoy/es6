<template>
  <section class="dialog-box bgceee contract-info-dialog">
    <div class="contract-info-body">
      <div class="right-div">
        <el-button size="mini" class="down-btn" v-if="contractData.leaseContractUrl" @click="previewContract">查看合同</el-button>
        <el-button size="mini" class="down-btn" v-if="contractData.leaseContractUrl" @click="downFile(contractData.leaseContractUrl,'租客合同')">下载合同</el-button>
        <el-button size="mini" class="down-btn" v-if="contractData.contractStatus === 'DELETE'&&contractData.terminationAgreementUrl" @click="downFile(contractData.terminationAgreementUrl,'租客合同终止协议')">下载终止协议</el-button>
      </div>
      <el-tabs v-model="tabIndex">
        <el-tab-pane label="合同" name="1">
          <div class="tab-pane-wrapper contract-pdf-wrapper">
            <div class="model-border boder">
              <el-row class="pd-20">
                <el-col :span="12">
                  <h4>
                    {{contractData.gardenName}} {{contractData.buildingName}} {{contractData.roomNo}} {{contractData.bedRoomName}}
                  </h4>
                </el-col>
                <el-col :span="12" class="font-r">
                  <span class="content-item-label">签约管家：</span>{{contractData.managerName}}
                </el-col>
              </el-row>
              <el-row class="model-title-status">
                <el-col :span="12">
                  <span>{{contractData.tenantModel.name}} </span>
                  （合同周期：{{contractData.startTime}}至{{contractData.endTime}}）
                </el-col>
                <el-col :span="8">
                  <span v-if="contractData.promotionTotalAmount > 0">已参加“{{contractData.promotionName}}”，减免{{contractData.promotionTotalAmount}}元</span>&nbsp;
                </el-col>
                <el-col :span="4" class="font-r c-blue">
                  <span>{{contractData.contractStatusDesc}}</span>
                </el-col>
              </el-row>
            </div>
            <div class="model-border">
              <header class="model-header">基本信息</header>
              <div class="pd-20">
                <div class="model-header-title">
                  承租人信息
                </div>
                <div class="renter-info">
                  <el-row :gutter="10">
                    <el-col :span="8">
                      <p class="content-item-twelve">
                        <span class="content-item-label-auto c-9">
                          <span class="content-item-label-justify-four">租客姓名</span>：
                        </span>
                        {{contractData.tenantModel.name}}
                      </p>
                    </el-col>
                    <el-col :span="8">
                      <p class="content-item-twelve">
                        <span class="content-item-label-auto c-9">
                          <span class="content-item-label-justify-four">手机号码</span>：
                        </span>
                        {{contractData.tenantModel.phone}}
                      </p>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="8">
                      <p class="content-item-twelve">
                        <span class="content-item-label-auto c-9">
                          <span class="content-item-label-justify-four">证件类型</span>：
                        </span>
                        {{contractData.tenantModel.certTypeDesc}}
                      </p>
                    </el-col>
                    <el-col :span="8">
                      <p class="content-item-twelve">
                        <span class="content-item-label-auto c-9">
                          <span class="content-item-label-justify-four">证件号</span>：
                        </span>
                        {{contractData.tenantModel.certNo}}
                      </p>
                    </el-col>
                  </el-row>
                </div>
                <div class="" v-if="contractData.renterModelList&&contractData.renterModelList.length">
                  <div class="model-header-title">
                    合租人信息
                  </div>
                  <div v-for="(renterItem,index) in contractData.renterModelList" :key="index" class="renter-info">
                    <el-row :gutter="10">
                      <el-col :span="8">
                        <p class="content-item-twelve">
                          <span class="content-item-label-auto c-9">
                            <span class="content-item-label-justify-four">租客姓名</span>：
                          </span>
                          {{renterItem.name}}
                        </p>
                      </el-col>
                      <el-col :span="8">
                        <p class="content-item-twelve">
                          <span class="content-item-label-auto c-9">
                            <span class="content-item-label-justify-four">手机号码</span>：
                          </span>
                          {{renterItem.phone}}
                        </p>
                      </el-col>
                    </el-row>
                    <el-row :gutter="10">
                      <el-col :span="8">
                        <p class="content-item-twelve">
                          <span class="content-item-label-auto c-9">
                            <span class="content-item-label-justify-four">证件类型</span>：
                          </span>
                          {{renterItem.certTypeDesc}}
                        </p>
                      </el-col>
                      <el-col :span="8">
                        <p class="content-item-twelve">
                          <span class="content-item-label-auto c-9">
                            <span class="content-item-label-justify-four">证件号</span>：
                          </span>
                          {{renterItem.certNo}}
                        </p>
                      </el-col>
                    </el-row>
                  </div>
                </div>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <p class="content-item-twelve">
                      <span class="content-item-label-auto c-9">
                        <span class="content-item-label-justify-four">纸质编号</span>：
                      </span>
                      {{contractData.paperContractNo}}
                    </p>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <p class="content-item-twelve">
                      <span class="content-item-label-auto c-9">
                        <span class="content-item-label-justify-four">合同备注</span>：
                      </span>
                      {{contractData.remark}}
                    </p>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div class="model-border">
              <header class="model-header">租赁信息</header>
              <div class="pd-20 clearfix">
                <el-row :gutter="10">
                  <el-col :span="8">
                    <p class="content-item-twelve">
                      <span class="content-item-label-auto c-9">
                        <span class="content-item-label-justify-four">租赁时间</span>：
                      </span>
                      {{contractData.startTime}} ~ {{contractData.endTime}}
                    </p>
                  </el-col>
                  <el-col :span="8">
                    <p class="content-item-twelve">
                      <span class="content-item-label-auto c-9">
                        <span class="content-item-label-justify-four">签约时间</span>：
                      </span>
                      {{contractData.signTime}}
                    </p>
                  </el-col>
                  <el-col :span="8">
                    <p class="content-item-twelve">
                      <span class="content-item-label-auto c-9">
                        <span class="content-item-label-justify-four">租金</span>：
                      </span>
                      {{contractData.rentPreMonth}}元/月
                    </p>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <p class="content-item-twelve">
                      <span class="content-item-label-auto c-9">
                        <span class="content-item-label-justify-four">押金</span>：
                      </span>
                      {{contractData.deposit}}元
                    </p>
                  </el-col>
                  <el-col :span="8">
                    <p class="content-item-twelve">
                      <span class="content-item-label-auto c-9">
                        <span class="content-item-label-justify-four">支付方式</span>：
                      </span>
                      {{contractData.payMethodDesc}}
                    </p>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col v-if="contractData.extrasType&&contractData.extrasType.includes('INTERNET_CHARGES')" :span="8">
                    <p class="content-item-twelve">
                      <span class="content-item-label-auto c-9">
                        <span class="content-item-label-justify-four">宽带费</span>：
                      </span>
                      {{contractData.broadbandFee}}元/月
                    </p>
                  </el-col>
                  <el-col v-if="contractData.extrasType&&contractData.extrasType.includes('PROPERTY_CHARGES')" :span="8">
                    <p class="content-item-twelve">
                      <span class="content-item-label-auto c-9">
                        <span class="content-item-label-justify-four">物业费</span>：
                      </span>
                      {{contractData.manageFee}}元/月
                    </p>
                  </el-col>
                  <el-col v-if="contractData.extrasType&&contractData.extrasType.includes('WATER_CHARGES')" :span="8">
                    <p class="content-item-twelve">
                      <span class="content-item-label-auto c-9">
                        <span class="content-item-label-justify-four">水费</span>：
                      </span>
                      {{contractData.waterFee}}元/吨
                    </p>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col v-if="contractData.extrasType&&contractData.extrasType.includes('ELECTRIC_CHARGES')" :span="8">
                    <p class="content-item-twelve">
                      <span class="content-item-label-auto c-9">
                        <span class="content-item-label-justify-four">电费</span>：
                      </span>
                      {{contractData.powerFee}}元/度
                    </p>
                  </el-col>
                  <el-col v-if="contractData.extrasType&&contractData.extrasType.includes('GAS_CHARGES')" :span="8">
                    <p class="content-item-twelve">
                      <span class="content-item-label-auto c-9">
                        <span class="content-item-label-justify-four">燃气费</span>：
                      </span>
                      {{contractData.gasFee}}元/立方
                    </p>
                  </el-col>
                  <el-col v-if="(+contractData.serviceFee) > 0" :span="8">
                    <p class="content-item-twelve">
                      <span class="content-item-label-auto c-9">
                        <span class="content-item-label-justify-four">服务费</span>：
                      </span>
                      {{contractData.serviceFee}}元/月
                    </p>
                  </el-col>
                  <el-col v-if="(+contractData.serviceFee) > 0" :span="8">
                    <p class="content-item-twelve">
                      <span class="content-item-label-auto c-9">
                        <span>服务费支付方式</span>：
                      </span>
                      {{contractData.serviceFeeMethodEnumDesc || '--'}}
                    </p>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="附件" name="2">
          <div class="tab-pane-wrapper">
            <!-- <div class="model-border">
              <header class="model-header">
                <span>承租人身份证</span>
              </header>
              <div v-if="contractData.tenantAttachList&&contractData.tenantAttachList.length" class="clearfix pdv-ten">
                <viewer :options="options" :images="contractData.tenantAttachList" class="viewer" ref="viewer">
                  <template slot-scope="scope">
                    <div v-for="(imgItem, index) in contractData.tenantAttachList" :key="index" class="img-item-box">
                      <img :src="imgItem.picAddr.replace('{size}', '160x120')" :data-source="imgItem.picAddr.replace('{size}', '800x600')+'?tailor=false'" class="img-content">
                    </div>
                  </template>
                </viewer>
              </div>
              <div v-else class="noimg">
                暂无图片
              </div>
            </div>
            <div class="model-border">
              <header class="model-header">
                <span>合租人身份证</span>
              </header>
              <div v-if="contractData.renterAttachList&&contractData.renterAttachList.length" class="clearfix pdv-ten">
                <viewer :options="options" :images="contractData.renterAttachList" class="viewer" ref="viewer">
                  <template slot-scope="scope">
                    <div v-for="(imgItem, index) in contractData.renterAttachList" :key="index" class="img-item-box">
                      <img :src="imgItem.picAddr.replace('{size}', '160x120')" :data-source="imgItem.picAddr.replace('{size}', '800x600')+'?tailor=false'" class="img-content">
                    </div>
                  </template>
                </viewer>
              </div>
              <div v-else class="noimg">
                暂无图片
              </div>
            </div> -->
            <div class="model-border">
              <header class="model-header">
                <span>证件附件</span>
              </header>
              <div v-if="contractData.certAttachList&&contractData.certAttachList.length" class="clearfix pdv-ten">
                <viewer :options="options" :images="contractData.certAttachList" class="viewer" ref="viewer">
                  <div v-for="(imgItem, index) in contractData.certAttachList" :key="index" class="img-item-box">
                    <img :src="imgItem.picAddr.replace('{size}', '160x120')" :data-source="imgItem.picAddr.replace('{size}', '800x600')+'?tailor=false'" class="img-content">
                  </div>
                </viewer>
              </div>
              <div v-else class="noimg">
                暂无图片
              </div>
            </div>
            <div class="model-border">
              <header class="model-header">
                <span>合同附件</span>
              </header>
              <div v-if="contractData.contractAttachList&&contractData.contractAttachList.length" class="clearfix pdv-ten">
                <viewer :options="options" :images="contractData.contractAttachList" class="viewer" ref="viewer">
                  <div v-for="(imgItem, index) in contractData.contractAttachList" :key="index" class="img-item-box">
                    <img :src="imgItem.picAddr.replace('{size}', '160x120')" :data-source="imgItem.picAddr.replace('{size}', '800x600')+'?tailor=false'" class="img-content">
                  </div>
                </viewer>
              </div>
              <div v-else class="noimg">
                暂无图片
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="终止协议" name="3" v-if="contractData.contractStatus === 'DELETE'&&contractData.terminationAgreementUrl">
          <div class="tab-pane-wrapper contract-pdf-wrapper">
            <slot v-if="contractData.terminationAgreementUrl">
              <!-- <iframe class="iframe-block" :src="getDownloadUrl(contractData.terminationAgreementUrl)" frameborder="0"></iframe> -->
              <!-- 测试大佬的电脑用 “iframe” 看不到 ‘中止协议’，改用 “embed” -->
              <embed width="100%" height="100%" :src="getDownloadUrl(contractData.terminationAgreementUrl)" type="application/pdf">
            </slot>
            <div v-else class="nodata">暂无终止协议</div>
          </div>
        </el-tab-pane>
        <el-tab-pane v-if="showRecord" label="合同记录" name="4">
          <ContarctRecord :contractId="contractId" />
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog title="合同预览" :visible.sync='showPdfDialog' append-to-body :close-on-click-modal="false" width="950px">
      <ContractPreview :contractData="previewContractData" />
    </el-dialog>
  </section>
</template>
<script>
import ContractPreview from './ContractPreview';
import ContarctRecord from './ContarctRecord';
export default {
  name: 'ContarctInfo',
  data() {
    return {
      tabIndex: '1',
      options: {
        url: 'data-source',
        title: false,
        zIndex: 99999
      },
      showPdfDialog: false,
      previewContractData: {}
    };
  },
  components: {
    ContractPreview, ContarctRecord
  },
  props: {
    contractData: {
      type: Object,
      default() {
        return {
          contractStatus: '',
          leaseContractUrl: '',
          terminationAgreementUrl: '',
          tenantModel: {},
          renterModelList: [],
          renterAttachList: [],
          tenantAttachList: [],
          certAttachList: [],
          extrasType: []
        };
      }
    },
    contractId: String,
    showRecord: {
      type: Boolean,
      default: true
    }
  },
  inject: ['getDownloadUrl', 'downloadPdfFile'],
  created() {

  },
  mounted() {

  },
  methods: {
    downFile(url, fileName) {
      this.downloadPdfFile(url, fileName + '.pdf');
    },
    previewContract() {
      this.previewContractData = JSON.parse(JSON.stringify(this.contractData));
      this.previewContractData.terminationUrl = this.contractData.terminationAgreementUrl;
      this.showPdfDialog = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.contract-info-dialog {
  padding: 10px;
  background: #fff;
  .contract-info-body {
    position: relative;
  }
  .right-div {
    position: absolute;
    right: 0;
    top: 7px;
    z-index: 10;
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
  .iframe-block {
    width: 100%;
    height: 100%;
    display: block;
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
  .model-title-status {
    padding: 0 20px;
    height: 35px;
    line-height: 35px;
    background-color: #f5f5f5;
  }
  .model-border {
    padding: 0 10px;
    border: none;
    margin: 0;
    display: flex;
    flex-direction: column;
    &.boder {
      border: 1px solid #eee;
      padding: 0;
      margin: 0 10px;
    }
    .model-header {
      padding: 0;
      text-align: left;
      font-weight: 600;
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #dddddd;
      color: #333;
      background: #fff;
      font-size: 14px;
    }
  }
  .img-item-box {
    width: auto;
    height: auto;
    margin: 4px;
    .img-content {
      width: 160px;
      height: 120px;
    }
  }
  .noimg {
    height: 150px;
    line-height: 150px;
    text-align: center;
    font-size: 14px;
  }
  .model-header-title {
    padding: 10px 0;
    font-weight: bold;
    font-size: 13px;
  }
}
.no-img-box {
  height: 120px;
}
</style>
