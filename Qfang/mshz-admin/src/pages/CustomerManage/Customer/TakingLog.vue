<template>
  <section class="follow-box dialog-box">
    <slot v-if="CustRentLogData.length > 0">
      <div class="c-green font-14 pdb-10">
        <i class="el-icon-view"></i> 已带看{{CustRentLogData.length}}次
      </div>
      <div v-for="(item, index) in CustRentLogData"
        :key="index"
        class="model-border">
        <header class="model-header">带看时间：{{item.leadLookDateDesc}}</header>
        <div class="pd-20 clearfix">
          <el-row>
            <el-col :span="12">
              <p class="content-item">
                <span class="content-item-label">带看房源：</span>{{item.roomModels.length}}套
              </p>
            </el-col>
            <el-col :span="12">
              <p class="content-item">
                <span class="content-item-label">陪看人：</span>
                <slot v-if="item.lookAccompanyItem.length > 0">
                  <span v-for="(rent,i) in item.lookAccompanyItem"
                    :key="i"> <i v-if="i>0">，</i> {{rent}}</span>
                </slot>
                <slot v-else>
                  --
                </slot>
              </p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <p class="content-item flex-start-grow">
                <span class="content-item-label">带看反馈：</span>
                <span style="flex:1;word-break: break-all;">{{item.remark ? item.remark : '--'}}</span>
              </p>
            </el-col>
          </el-row>
          <div class="border-ddd">
            <el-table :data="item.roomModels"
              style="width: 100%"
              size="mini">
              <el-table-column label="房源"
                align="left"
                :min-width="250">
                <template slot-scope="scope">
                  {{scope.row.gardenName}} <br/> {{scope.row.buildingName}} {{scope.row.roomNumber}} {{scope.row.bedRoomNum}}
                </template>
              </el-table-column>
              <el-table-column prop="longLeaseTypeDesc"
                label="模式"
                :min-width="50">
              </el-table-column>
              <el-table-column prop="houseType"
                label="户型"
                :min-width="80">
                <template slot-scope="scope">
                  {{scope.row.bedRoom}}房{{scope.row.livingRoom}}厅
                </template>
              </el-table-column>
              <el-table-column label="面积"
                :min-width="100">
                <template slot-scope="scope">
                  {{scope.row.area}}㎡
                </template>
              </el-table-column>
              <el-table-column prop="managerName"
                label="管家"
                :min-width="100">
              </el-table-column>
              <el-table-column prop="intentionEnumDesc"
                label="意向"
                :min-width="100">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </slot>
    <slot v-else>
      <div class="font-14 flex-center hg-100">暂无带看记录</div>
    </slot>
  </section>
</template>
<script>
export default {
  data() {
    return {
      url: '',
      followInfo: '',
      roomId: '',
      CustRentLogData: [
        {
          roomModels: [],
          lookAccompanyItem: []
        }
      ]
    };
  },
  props: ['custId'],
  created() {
    this.requestData();
  },
  methods: {
    // 获取
    requestData() {
      this.$axios.get(
        '/security/leadLook/queryCustomerLeadData',
        {
          params: {
            customerId: this.custId
          }
        }
      ).then((res) => {
        if (res.data.status === 'C0000' && res.data.result && res.data.result.items) {
          this.CustRentLogData = res.data.result.items;
        } else {
          this.CustRentLogData = [];
        }
      }).catch((res) => {
        this.CustRentLogData = [];
        console.log(res);
      });
    }
  }
};
</script>
<style scoped>
.follow-box {
  padding: 20px;
  background-color: #eeeeee;
  box-sizing: border-box;
}
</style>

