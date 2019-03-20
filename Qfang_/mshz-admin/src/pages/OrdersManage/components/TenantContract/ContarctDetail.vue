<template>
  <section>
    <div class="contartct-detail">
      <div class="contartct-detail-header">
        <div class="title">
          {{contractData.gardenName}} {{contractData.buildingName}} {{contractData.roomNo}} {{contractData.bedRoomName}}
          <span class="status">{{contractData.contractStatusDesc}}</span>
        </div>
        <p>{{contractData.address}}
          <span>管家：{{contractData.managerName}}</span>
        </p>
      </div>
      <contarct-info :contractData="contractData" :contractId="contractId" />
      <!-- <el-tabs v-model="activeName">
        <el-tab-pane label="合同信息" name="1">
          <contarct-info :contractData="contractData">
          </contarct-info>
        </el-tab-pane>
        <el-tab-pane label="合同记录" name="2">
          <contarct-record :contractId="contractId"></contarct-record>
        </el-tab-pane>
      </el-tabs> -->
    </div>
  </section>
</template>
<script>
// import FollowInfo from '@/pages/HouseManage/components/Housing/FollowInfo'; // 跟进信息
// import AuditLog from '@/pages/HouseManage/components/Housing/AuditLog'; // 审核记录
// import AmendantRecord from '@/pages/HouseManage/components/Housing/AmendantRecord';
import ContarctInfo from './ContarctInfo';
// import ContarctRecord from './ContarctRecord';
import { $downloadFile } from '@/assets/js/utils';
export default {
  name: 'ContarctDetail',
  data() {
    return {
      activeName: '1',
      contractData: {
        tenantModel: {}
      }
    };
  },
  props: ['contractId'],
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$axios.get('/security/roomStatus/contract/queryContractDetail', {
        params: {
          id: this.contractId
        }
      }).then(({ data }) => {
        if (data.status === 'C0000') {
          this.contractData = data.result;
        } else {
          this.$message.error(data.message);
        }
      }).catch((err) => {
        this.$message.error(err.message || '服务器异常');
      });
    },
    // 获取pdf下载地址
    getDownloadUrl(fdfsUrl, fileName = '') {
      return fdfsUrl ? this.$axios.defaults.baseURL + 'security/roomStatus/contract/downloadSignedPDF?url=' + fdfsUrl + '&fileName=' + fileName + '.pdf' : '';
    },
    downloadPdfFile(url, fileName) {
      $downloadFile(this.getDownloadUrl(url, fileName), fileName + '.pdf');
    }
  },
  provide() {
    return {
      getDownloadUrl: this.getDownloadUrl,
      downloadPdfFile: this.downloadPdfFile
    };
  },
  components: {
    // FollowInfo,
    // AuditLog,
    // AmendantRecord,
    // ContarctRecord,
    ContarctInfo
  }
};
</script>
<style lang="scss" scoped>
.contartct-detail {
  position: relative;
  .contartct-detail-header {
    padding: 20px;
    background-color: #fff;
    border: 1px solid #dddddd;
    .title {
      font-size: 18px;
      color: #000;
      font-weight: bold;
      display: flex;
      align-items: center;
      margin-bottom: 5px;
      span {
        height: 24px;
        line-height: 24px;
        border: 1px solid #d66666;
        border-radius: 3px;
        padding: 0 5px;
        font-size: 14px;
        color: #d66666;
        font-weight: 400;
        margin-left: 10px;
      }
    }
    p {
      font-size: 12px;
      color: #999;
      display: flex;
      align-items: center;
      span {
        margin-left: 20px;
      }
    }
  }
}
.contartct-info {
  width: 20px;
  height: 20px;
  position: absolute;
  top: 50px;
  left: 107px;
  background-color: red;
}
.org_box {
  margin-bottom: 30px;
  padding: 5px 10px;
  color: #c55454;
  background: #fff;
  position: absolute;
  top: 50px;
  left: 107px;
  z-index: 9999;
  font-size: 12px;
  box-shadow: -2px 2px 10px #ccc;
}
.org_bot_cor {
  width: 0;
  height: 0;
  font-size: 0;
  border-width: 10px;
  border-style: solid;
  border-color: transparent transparent white;
  _border-color: white white white;
  overflow: hidden;
  position: absolute;
  left: 20px;
  top: -20px;
}
.info-close {
  display: inline-block;
  margin: 5px;
  color: #666;
  font-size: 14px;
  cursor: pointer;
}
.el-icon-close:hover {
  background-color: #b4bccc;
  color: #fff;
  border-radius: 50%;
}
.cont-detail >>> .dialog-box {
  height: 540px;
}
</style>

