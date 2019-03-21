<template>
  <section class="house-details-section">
    <div class="house-details-header">
      <div class="font-l">
        <p class="font-bold">
          <span v-if="houseInfo.gardenName.indexOf('，') !== -1">{{houseInfo.gardenName.split('，')[0]}}</span>
          <span v-else>{{houseInfo.gardenName.split(',')[0]}}</span>
          <span class="font-12 c-9">（{{houseInfo.cityDtoDesc}}）</span>
        </p>
        <p class="font-default">{{houseInfo.buildingName}}，{{houseInfo.tier}}层，{{houseInfo.roomNumber}}，
          <span class="font-b">{{houseInfo.area}}㎡</span>，
          <span>{{houseInfo.bedRoom}}房</span>
          <span>{{houseInfo.livingRoom}}厅</span>
          <span>{{houseInfo.kitchen}}厨</span>
          <span>{{houseInfo.toilet}}卫</span>
        </p>
      </div>
      <div>
        <el-button size="small"
          @click="mapDialog=true"
          type="text">
          <i class="icon iconfont icon-dizhi"></i>{{houseInfo.areaName}}
        </el-button>
      </div>
    </div>
    <div>
      <el-tabs v-model="activeName"
        @tab-click="handleClick">
        <el-tab-pane label="委托信息"
          name="entrustInfo">
          <entrust-info :entrustData="houseInfo"
            @refreshData="requestData"
            :entrustId="entrustId">
          </entrust-info>
        </el-tab-pane>
        <el-tab-pane label="小区信息"
          name="communityInfo">
          <community-info :city="houseInfo.cityDto"
            :gardenId="houseInfo.gardenId"
            :gardenName="houseInfo.gardenName">
          </community-info>
        </el-tab-pane>
        <el-tab-pane name="followInfo">
          <span slot="label"
            class="point-label">
            <el-badge :is-dot="showPoint"
              class="point-item">跟进信息</el-badge>
          </span>
          <entrust-follow-info :entrustId="entrustId"
            :refreshList.sync="refreshList"
            @refreshData="requestData">
          </entrust-follow-info>
        </el-tab-pane>
      </el-tabs>
    </div>

    <el-dialog :visible.sync='mapDialog'
      :title="'地址：'+houseInfo.areaName"
      :close-on-click-modal="false"
      width="950px"
      append-to-body>
      <house-map :city="houseInfo.cityDto"
        :gardenName="houseInfo.gardenName"
        :address="houseInfo.areaName"
        :gardenId="houseInfo.gardenId"
        roomCount="0">
      </house-map>
    </el-dialog>

  </section>
</template>
<script>
import entrustInfo from './entrustInfo'; // 房源详情
import CommunityInfo from '@/pages/HouseManage/components/Housing/CommunityInfo';
import HouseMap from '@/pages/HouseManage/components/Housing/HouseMap';
import entrustFollowInfo from './entrustFollowInfo';

export default {
  data() {
    return {
      activeName: 'entrustInfo',
      showPoint: false,
      refreshList: false, // 关闭 是否刷新 列表
      houseInfo: {
        gardenName: '',
        cityDto: '',
        gardenId: ''
      },
      mapDialog: false
    };
  },
  props: {
    entrustId: {
      type: String,
      default: ''
    },
    refreshListData: {
      type: Boolean,
      default: false
    }
  },
  created() {
    this.updatedPoint = true;
    this.requestData();
    this.requestPoint();
  },
  methods: {
    requestData() {
      this.$axios.get(
        '/security/room/entrust/selectEntrustDetail',
        {
          params: {
            entrustId: this.entrustId
          }
        }
      ).then((res) => {
        if (res.data.status === 'C0000') {
          // this.houseInfo = res.data.result;
          this.$set(this, 'houseInfo', res.data.result);
        } else {
          this.$message.error(res.data.message);
        }
      }).catch((err) => {
        this.$message.error(err.message || '服务器异常');
        console.log(err);
      });
    },
    requestPoint() {
      this.$axios.get(
        '/security/room/entrust/checkNeedPoint',
        {
          params: {
            id: this.entrustId
          }
        }
      ).then((res) => {
        // console.log(res, '-----获取红点');
        if (res.data.status === 'C0000') {
          this.showPoint = res.data.result;
        };
      }).catch((err) => {
        this.$message.error(err.message || '服务器异常');
        console.log(err);
      });
    },
    handleClick(tab, event) {
      if (tab.name === 'followInfo' && this.updatedPoint) {
        this.$axios.post('/security/room/entrust/updateFollowReadState',
          { id: this.entrustId }
        ).then((res) => {
          if (res.data.status === 'C0000') {
            this.updatedPoint = false;
          }
          // console.log(res, '--------更新红点');
        }).catch(err => {
          console.log(err);
        });
      }
    }
  },
  watch: {
    refreshList(val) {
      // console.log(val);
      if (val) {
        this.$emit('update:refreshListData', true);
      }
    }
  },
  components: {
    entrustInfo,
    CommunityInfo,
    entrustFollowInfo,
    HouseMap
  }
};
</script>
<style lang="scss" scoped>
// .house-details-section {
//   .dialog-box {
//     height: 551px;
//   }
// }
.house-details-header {
  padding: 20px;
  margin-bottom: 5px;
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
.point-label /deep/ .el-badge__content {
  top: 5px;
}
</style>

