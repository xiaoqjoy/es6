<template>
  <section class="refund-box bgceee">
    <el-row :gutter="20">
      <el-col :span="12">
        <p class="content-item line-h-30">
          <span class="content-item-label">服务类型：</span>{{itemprop.serviceTypeDesc}}
        </p>
         <p class="content-item line-h-30">
          <span class="content-item-label">租客房间：</span>{{itemprop.roomInfo}}
        </p>
        <p class="content-item line-h-30">
          <span class="content-item-label">租客姓名：</span>{{itemprop.customerName}}
        </p>

        <p class="content-item line-h-30">
          <span class="content-item-label">接单工人：</span>{{itemprop.workerName}}
        </p>
        <p v-if="itemprop.serviceType !== 'CLEAN_PERIOD' && itemprop.serviceType !== 'CLEAN_REFUND'" class="content-item line-h-30">
          <span class="content-item-label">费用类型：</span>{{itemprop.chargeTypeDesc}}
        </p>

        <div class="content-item l-heighy-30">
          <span class="content-item-label">备注说明：</span>{{itemprop.remark.split('||')[0]}}
        </div>
      </el-col>
      <el-col :span="12">

        <p class="content-item line-h-30">
          <span class="content-item-label">房源编码：</span>{{itemprop.roomCode}}
        </p>
         <p class="content-item line-h-30">
          <span class="content-item-label">服务日期：</span>{{(new Date(itemprop.serviceTime)).toLocaleDateString().replace(/\//g, '-')}}
        </p>
        <p class="content-item line-h-30">
          <span class="content-item-label">联系方式：</span>{{itemprop.customerPhone}}
        </p>
        <p class="content-item line-h-30">
          <span class="content-item-label">手机号：</span>{{itemprop.workerPhone}}
        </p>
        <p v-if="itemprop.serviceType !== 'CLEAN_PERIOD' && itemprop.serviceType !== 'CLEAN_REFUND'" class="content-item line-h-30">
          <span class="content-item-label">收费金额：</span>{{itemprop.charge}}
        </p>
        <p class="content-item line-h-30">
          <span class="content-item-label">服务进度：</span>{{itemprop.serviceStatusDesc}}
        </p>
      </el-col>
    </el-row>
    <div class="pd-20 bd-ddd bgc-f"
      v-if="itemprop.assignStatus !== 'NONE' && itemprop.serviceStatus === 'DONE'">
      <p class="content-item line-h-30 c-red bdb-ddd">
        <span class="content-item-label">服务评分：</span>{{((itemprop.attributeRate + itemprop.serviceRate + itemprop.speedRate) / 3).toFixed()}}
      </p>
      <div class="content-item flex-start line-h-30 pdv-ten">
        <span class="content-item-label">服务质量：</span>
        <el-rate v-model="itemprop.serviceRate"
          disabled
          :colors="['#008842', '#008842', '#008842']">
        </el-rate>
      </div>
      <div class="content-item flex-start line-h-30 pdv-ten">
        <span class="content-item-label">服务态度：</span>
        <el-rate v-model="itemprop.attributeRate"
          disabled
          :colors="['#008842', '#008842', '#008842']">
        </el-rate>
      </div>
      <div class="content-item flex-start line-h-30 pdv-ten bdb-ddd">
        <span class="content-item-label">响应速度：</span>
        <el-rate v-model="itemprop.speedRate"
          disabled
          :colors="['#008842', '#008842', '#008842']">
        </el-rate>
      </div>
      <p class="content-item l-heighy-30">
        <span class="content-item-label">评价内容：</span>{{itemprop.remark.split('||')[1]}}
      </p>

    </div>
    <div v-if="itemprop.serviceStatus === 'CANCEL'">
      <div class="content-item l-heighy-30">
        <span class="content-item-label">取消原因：</span>{{itemprop.cancelRemark}}
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {

    };
  },
  props: ['itemprop'],
  methods: {
    // 暂时不需要详情接口，数据从列表传来。
  }
};
</script>
<style scoped>
.l-heighy-30 {
  line-height: 30px;
}
</style>

