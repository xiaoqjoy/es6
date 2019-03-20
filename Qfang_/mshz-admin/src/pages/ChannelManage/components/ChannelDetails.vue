<template>
  <section class="house-details-section">
    <div class="house-details-header">
      <div class="font-l">
        <div class="mb-10 broker-info">
          <h4 class="font-18">{{detailsData.brokerName}}<small class="font-12">（{{detailsData.area}}，{{detailsData.phone}}）</small> </h4>
          <i v-if="detailsData.rollOut" class="tips-i">该渠道已转出</i>
        </div>
        <p class="font-default">
          <span class="padr-15">最后转介：{{detailsData.lastDateDesc}}</span>
          <span class="padr-15">最后跟进：{{detailsData.lastFollowDateDesc}}</span>
          <span class="padr-15">注册日期：{{detailsData.creatDateDesc}}</span>
          <span>管家：{{detailsData.managerName}}</span>
        </p>
      </div>
      <div class="right-count">
        <div class="item">
          <span>{{detailsData.totalAmount}}套</span>
          <p>累计转介</p>
        </div>
        <div class="item">
          <span>{{detailsData.introducingAmount}}套</span>
          <p>转介中</p>
        </div>
        <div class="item">
          <span>{{detailsData.dealAmount}}套</span>
          <p>已成交</p>
        </div>
      </div>
    </div>
    <div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="转介记录" name="1">
          <referrals-record :id="id"></referrals-record>
        </el-tab-pane>
        <el-tab-pane v-if="!detailsData.isManager||!detailsData.rollOut" label="跟进信息" name="2">
          <follow-info :id="id" :managerId="detailsData.managerId" :orgId="detailsData.orgId"></follow-info>
        </el-tab-pane>
        <el-tab-pane v-if="!detailsData.isManager||!detailsData.rollOut" label="修改记录" name="3">
          <amendant-record :id="id" :managerId="detailsData.managerId" :orgId="detailsData.orgId"></amendant-record>
        </el-tab-pane>
      </el-tabs>
    </div>
  </section>
</template>
<script>
import ReferralsRecord from './ReferralsRecord'; // 转介记录
import FollowInfo from './FollowInfo'; // 跟进信息
import AmendantRecord from './AmendantRecord'; // 修改记录

export default {
  data() {
    return {
      activeName: '1'
    };
  },
  props: {
    id: String,
    detailsData: Object
  },
  created() {
  },
  methods: {

  },
  components: {
    ReferralsRecord,
    FollowInfo,
    AmendantRecord
  }
};
</script>
<style lang="scss" scoped>
.house-details-section {
  .dialog-box {
    height: 551px;
  }
  .padr-15 {
    padding-right: 15px;
  }
  .broker-info {
    display: flex;
    align-items: flex-end;
    height: 24px;
    small {
      font-weight: 400;
    }
  }
  .tips-i {
    font-size: 12px;
    font-style: normal;
    color: #fff;
    height: 24px;
    line-height: 24px;
    padding: 0 5px;
    background: #fa5555;
    color: #fff;
    border-radius: 3px;
  }
}
.house-details-header {
  padding: 20px;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border: 1px solid #dddddd;
  .mb-10 {
    margin-bottom: 10px;
  }
  .right-count {
    display: flex;
    align-items: center;
    .item {
      text-align: center;
      padding: 0 20px;
      border-right: 1px solid #eee;
      font-size: 12px;
      &:last-child {
        border: none;
      }
      p {
        margin-top: 10px;
        color: #999;
      }
      span {
        color: #333;
      }
    }
  }
}
</style>

