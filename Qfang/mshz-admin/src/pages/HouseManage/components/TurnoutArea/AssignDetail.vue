<template>
  <section class="dialog-box">
    <div class="house-details-header">
      <div class="font-l">
        <p class="font-bold">
          <span v-if="assignItem.gardenName.indexOf('，') !== -1">{{assignItem.gardenName.split('，')[0]}}</span>
          <span v-else>{{assignItem.gardenName.split(',')[0]}}</span>
          <!-- <span class="font-12 c-9">（{{assignDetailData.cityDesc}}）</span> -->
        </p>
        <p class="font-default">
          <span class="font-b">栋数：</span>{{assignItem.buildingCount || 0}}栋

          <span class="font-b">户数：</span>{{assignItem.roomCount || 0}}户
        </p>
      </div>
    </div>
    <div class="bgceee">
      <div class="pd-20 bgc-f">
        <header class="header-info">当前归属</header>
        <div class="pd-20">
          <el-row class="line-h-40">
            <el-col :span="4"
              class="font-12 font-c bd-ddd mg-retract">
              级别
            </el-col>
            <el-col :span="4"
              class="font-12 font-c bd-ddd mg-retract">
              大区
            </el-col>
            <el-col :span="4"
              class="font-12 font-c bd-ddd mg-retract">
              片区
            </el-col>
            <el-col :span="4"
              class="font-12 font-c bd-ddd mg-retract">
              组别
            </el-col>
            <el-col :span="4"
              class="font-12 font-c bd-ddd mg-retract">
              综合管家
            </el-col>
            <el-col :span="4"
              class="font-12 font-c bd-ddd mg-retract">
              服务管家
            </el-col>
          </el-row>
          <el-row class="line-h-40">
            <el-col :span="4"
              class="font-12 font-c bd-ddd mg-retract">
              {{assignDetailData.tabDesc || '--'}}
            </el-col>
            <el-col :span="4"
              class="font-12 font-c bd-ddd mg-retract">
              {{assignDetailData.levelOne || '--'}}
            </el-col>
            <el-col :span="4"
              class="font-12 font-c bd-ddd mg-retract">
              {{assignDetailData.levelTwo || '--'}}
            </el-col>
            <el-col :span="4"
              class="font-12 font-c bd-ddd mg-retract">
              {{assignDetailData.levelThree || '--'}}
            </el-col>
            <el-col :span="4"
              class="font-12 font-c bd-ddd mg-retract">
              {{assignDetailData.gardenManager || '--'}}
            </el-col>
            <el-col :span="4"
              class="font-12 font-c bd-ddd mg-retract">
              {{assignDetailData.serviceManager || '--'}}
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="pd-20 bgc-f">
        <header class="header-info">分配记录</header>
        <div class="mgrt-20 border-ddd">
          <el-table :data="assignDetailData.infoList"
            style="width: 100%"
            size="mini">
            <el-table-column prop="info"
              label="分配记录"
              align="left">
            </el-table-column>
            <el-table-column prop="allotDateDesc"
              label="分配时间"
              align="left"
              width="180">
            </el-table-column>
            <el-table-column prop="allotPerson"
              label="分配人"
              align="left"
              width="180">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      assignDetailData: {
        infoList: []
      }
    };
  },
  props: {
    id: {
      type: String,
      required: true
    },
    assignItem: {
      type: Object,
      default: () => ({})
    },
    assignDetailDialog: {
      type: Boolean
    }
  },
  created() {
    this.id && this.requestData();
  },
  methods: {
    requestData() {
      this.$axios.get(
        '/security/oms/duty/pickDetail',
        {
          params: {
            id: this.id
          }
        }
      ).then((res) => {
        if (res.data.status === 'C0000') {
          this.assignDetailData = res.data.result;
        } else {
          this.$message.error(res.data.message);
          this.handleInitData();
        }
      }).catch((err) => {
        this.$message.error(err.message || '服务异常');
        this.handleInitData();
        console.log(err);
      });
    },
    handleInitData() {
      this.assignDetailData = {
        infoList: []
      };
    }
  },
  watch: {
    // id(val) {
    //   val && this.requestData();
    // },
    assignDetailDialog(val) {
      if (!val) {
        this.handleInitData();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.house-details-header {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border: 1px solid #dddddd;
  .font-bold {
    margin-bottom: 10px;
  }
  .font-b {
    font-weight: bold;
    color: #999;
  }
}
.header-info {
  text-align: left;
  font-weight: 600;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #dddddd;
  color: #333;
}
.mg-retract {
  margin-right: -1px;
  margin-bottom: -1px;
}
</style>


