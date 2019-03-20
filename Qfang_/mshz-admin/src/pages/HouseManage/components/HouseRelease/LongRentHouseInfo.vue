<template>
  <section>
    <div>
      <div class="head-info pd-10-20">

        <h3 class="font-l pdb-10">{{houseItemData.gardenName}}</h3>

        <div class="font-l">
          <span class="head-info-item">楼栋：{{houseItemData.buildingName}}</span>

          <span class="head-info-item">房号：{{houseItemData.number}}</span>

          <span class="head-info-item">{{houseItemData.houseStyle}}</span>

          <span class="head-info-item">{{houseItemData.area}}平米</span>

        </div>
      </div>
      <div>
        <el-tabs v-model="activeName">
          <el-tab-pane label="房源信息"
            name="first">
            <house-info :id="houseItemData.id"></house-info>
          </el-tab-pane>
          <el-tab-pane label="修改记录" name="sixth">
            <amendant-record :id="houseItemData.roomId" type="longSituation"></amendant-record>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </section>

</template>

<script>
import AmendantRecord from '../Housing/AmendantRecord';
import HouseInfo from './HouseInfo';
export default {
  data() {
    return {
      activeName: 'first'
    };
  },
  components: {
    AmendantRecord, HouseInfo
  },
  props: ['houseItemData', 'id'],
  created() {
  },
  methods: {

  }
};
</script>

<style scoped>
/* .head-info {
  padding-left: 20px;
} */
.head-info-item {
  display: inline-block;
  padding: 0 15px;
  font-size: 14px;
  line-height: 16px;
  color: #999;
  border-left: 1px solid #eee;
}
.head-info-item:first-of-type {
  padding: 0 15px 0 0;
  border-left: none;
}
.header-info {
  text-align: left;
  height: 35px;
  line-height: 35px;
  font-weight: 600;
  padding: 0 20px;
  border-bottom: 1px solid #dddddd;
  background-color: #fafafa;
  color: #333;
}

.facility-item {
  margin: 5px 10px;
  padding: 2px 15px;
  border-radius: 24px;
  height: 24px;
  line-height: 24px;
  border: 1px solid #ddd;
}

.checkbox-label {
  padding-left: 30px;
  padding-bottom: 5px;
}

.pd-10-20 {
  padding: 10px 20px;
}
/* .room-info {
  height: 300px;
} */
.room-info >>> .el-tabs__nav-scroll {
  padding: 0;
}
.room-info >>> .el-tabs--border-card {
  height: 100%;
  box-shadow: none;
  border-color: #dddddd;
}

.huanhang {
  word-break: break-all;
  word-wrap: break-word;
}
.line-30 {
  line-height: 30px;
}
.facility-label {
  padding: 7px 0;
  box-sizing: border-box;
}
</style>
