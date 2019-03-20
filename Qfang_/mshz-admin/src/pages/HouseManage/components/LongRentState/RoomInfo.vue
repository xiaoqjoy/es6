<template>
  <section class="bgceee long-rent-dialog">
    <div class="bd-ddd bgc-f"
      v-if="roomInfo.longChamberList.length >0">
      <div class="pd-20">
        <header class="header-info">基础信息</header>

        <div class="pdt-20 lr-roomInfo">
          <slot v-if="roomInfo.leaseType === 'ENTIRE_RENT'">
            <el-tabs style="height: auto;"
              v-model="activeName"
              tabPosition="left">
              <el-tab-pane v-for="(roomItem, index) in roomInfo.longChamberList"
                :label="roomItem.name"
                :name="roomItem.name"
                :key="index">
                <el-row>
                  <el-col :span="5">
                    <p class="content-item-twelve">
                      <span class="content-item-label-auto c-9">
                        <span class="content-item-label-justify-four">面积</span>：
                      </span>{{roomItem.area || '--'}}㎡
                    </p>
                  </el-col>
                  <el-col :span="5">
                    <p class="content-item-twelve">
                      <span class="content-item-label-auto c-9">
                        <span class="content-item-label-justify-four">朝向</span>：
                      </span>{{roomItem.directionDesc || '--'}}
                    </p>
                  </el-col>
                  <slot v-if="roomItem.canPublish">
                    <el-col :span="5">
                      <p class="content-item-twelve">
                        <span class="content-item-label-auto c-9">
                          <span class="content-item-label-justify-four">独卫生间</span>：
                        </span>{{roomItem.attachedChamber.indexOf('TOILET')===-1?'无':'有'}}
                      </p>
                    </el-col>
                    <el-col :span="5">
                      <p class="content-item-twelve">
                        <span class="content-item-label-auto c-9">
                          <span class="content-item-label-justify-four">独立阳台</span>：
                        </span>{{roomItem.attachedChamber.indexOf('BALCONY')===-1?'无':'有'}}
                      </p>
                    </el-col>
                  </slot>
                </el-row>
                <el-row>
                  <el-col>
                    <p class="content-item-twelve">
                      <span class="content-item-label-auto c-9">
                        <span class="content-item-label-justify-four">设施</span>：
                      </span>
                      <span v-for="(item,index) in roomItem.furnitureDesc"
                        :key="index"
                        class="funiture-item">{{item}}</span>
                    </p>
                  </el-col>
                </el-row>
              </el-tab-pane>
            </el-tabs>
          </slot>
          <slot v-else>
            <el-row>
              <el-col :span="5">
                <p class="content-item-twelve">
                  <span class="content-item-label-auto c-9">
                    <span class="content-item-label-justify-four">面积</span>：
                  </span>{{roomInfo.longChamberList[0].area || '--'}}㎡
                </p>
              </el-col>
              <el-col :span="5">
                <p class="content-item-twelve">
                  <span class="content-item-label-auto c-9">
                    <span class="content-item-label-justify-four">朝向</span>：
                  </span>{{roomInfo.longChamberList[0].directionDesc}}
                </p>
              </el-col>
              <el-col :span="5">
                <p class="content-item-twelve">
                  <span class="content-item-label-auto c-9">
                    <span class="content-item-label-justify-four">独卫生间</span>：
                  </span>{{roomInfo.longChamberList[0].attachedChamber.indexOf('TOILET')===-1?'无':'有'}}
                </p>
              </el-col>
              <el-col :span="5">
                <p class="content-item-twelve">
                  <span class="content-item-label-auto c-9">
                    <span class="content-item-label-justify-four">独立阳台</span>：
                  </span>{{roomInfo.longChamberList[0].attachedChamber.indexOf('BALCONY')===-1?'无':'有'}}
                </p>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <p class="content-item-twelve">
                  <span class="content-item-label-auto c-9">
                    <span class="content-item-label-justify-four">设施</span>：
                  </span>
                  <span v-for="(item,index) in roomInfo.longChamberList[0].furnitureDesc"
                    :key="index"
                    class="funiture-item">{{item}}</span>
                </p>
              </el-col>
            </el-row>
          </slot>
        </div>
      </div>
      <div class="pd-20">
        <header class="header-info">租金信息</header>
        <div class="pdt-20">
          <el-row>
            <el-col>
              <p class="content-item-twelve">
                <span class="content-item-label-auto c-9">
                  <span class="content-item-label-justify-four">押金</span>：
                </span>{{roomInfo.depositTypeDesc}}
              </p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <p class="content-item-twelve">
                <span class="content-item-label-auto c-9">
                  <span class="content-item-label-justify-four">月付</span>：
                </span>
                <span class="font-w">{{roomInfo.longChamberList[0].monthPrice}}</span>
                元/月；
                <span>服务费</span>
                <span class="font-w">{{roomInfo.longChamberList[0].monthServicePrice}}</span>% （
                <span class="font-w">{{(roomInfo.longChamberList[0].monthPrice * roomInfo.longChamberList[0].monthServicePrice /100).toFixed(2)}}</span>元/月）
              </p>
            </el-col>
            <el-col :span="10">
              <p class="content-item-twelve">
                <span class="content-item-label-auto c-9">
                  <span class="content-item-label-justify-four">季付</span>：
                </span>
                <span class="font-w">{{roomInfo.longChamberList[0].seasonPrice}}</span>
                元/月；
                <span>服务费</span>
                <span class="font-w">{{roomInfo.longChamberList[0].seasonServicePrice}}</span>% （
                <span class="font-w">{{(roomInfo.longChamberList[0].seasonPrice * roomInfo.longChamberList[0].seasonServicePrice /100).toFixed(2)}}</span>元/月）
              </p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <p class="content-item-twelve">
                <span class="content-item-label-auto c-9">
                  <span class="content-item-label-justify-four">半年</span>：
                </span>
                <span class="font-w">{{roomInfo.longChamberList[0].halfYearPrice}}</span>
                元/月；
                <span>服务费</span>
                <span class="font-w">{{roomInfo.longChamberList[0].halfYearServicePrice}}</span>% （
                <span class="font-w">{{(roomInfo.longChamberList[0].halfYearPrice * roomInfo.longChamberList[0].halfYearServicePrice /100).toFixed(2)}}</span>元/月）
              </p>
            </el-col>
            <el-col :span="10">
              <p class="content-item-twelve">
                <span class="content-item-label-auto c-9">
                  <span class="content-item-label-justify-four">年付</span>：
                </span>
                <span class="font-w">{{roomInfo.longChamberList[0].yearPrice}}</span>
                元/月；
                <span>服务费</span>
                <span class="font-w">{{roomInfo.longChamberList[0].yearServicePrice}}</span>% （
                <span class="font-w">{{(roomInfo.longChamberList[0].yearPrice * roomInfo.longChamberList[0].yearServicePrice /100).toFixed(2)}}</span>元/月）
              </p>
            </el-col>
          </el-row>
        </div>
      </div>

      <div class="pd-20">
        <header class="header-info">生活费用信息</header>
        <div class="pdt-20">
          <el-row>
            <!-- <el-col :span="5">
              <p class="content-item-twelve">
                <span class="content-item-label-auto c-9">
                  <span class="content-item-label-justify-four">宽带费</span>：
                </span>{{roomInfo.extras.includes('INTERNET_CHARGES')? roomInfo.internetCharges :0}}元/月
              </p>
            </el-col> -->
            <el-col :span="5">
              <p class="content-item-twelve">
                <span class="content-item-label-auto c-9">
                  <span class="content-item-label-justify-four">水费</span>：
                </span>{{ roomInfo.extras.includes('WATER_CHARGES')? roomInfo.waterCharges : 0}}元/吨
              </p>
            </el-col>
            <el-col :span="5">
              <p class="content-item-twelve">
                <span class="content-item-label-auto c-9">
                  <span class="content-item-label-justify-four">电费</span>：
                </span>{{ roomInfo.extras.includes('ELECTRIC_CHARGES')? roomInfo.electricCharges : 0}}元/度
              </p>
            </el-col>
            <el-col :span="5">
              <p class="content-item-twelve">
                <span class="content-item-label-auto c-9">
                  <span class="content-item-label-justify-four">燃气费</span>：
                </span>{{ roomInfo.extras.includes('GAS_CHARGES')? roomInfo.gasCharges : 0}}元/立方
              </p>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="pd-20">
        <header class="header-info">图片信息</header>
        <slot v-if="roomInfo.pictureList.length">
          <div class="clearfix pdt-5 pdb-30 info-item-right">
            <viewer :options="options"
              :images="roomInfo.pictureList"
              class="viewer"
              ref="viewerReleasein">
              <template slot-scope="scope">
                <div v-for="(imgItem, index) in roomInfo.pictureList"
                  :key="index"
                  class="img-item-box">
                  <img :src="imgItem.url.replace('{size}', '160x120')"
                    :data-source="imgItem.url.replace('{size}', '800x600')+'?tailor=false'"
                    class="img-content">
                  <p v-if="scope.images.length> 0"
                    class="font-c">{{scope.images[index].picDepend}}</p>
                </div>
              </template>
            </viewer>
          </div>
        </slot>
        <slot v-else>
          <div class="flex-center h120">
            暂无数据
          </div>
        </slot>

      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      options: {
        url: 'data-source',
        title: false,
        zIndex: 99999
      },
      activeName: '01卧室',
      roomInfo: {
        depositType: '',
        electricCharges: 0, // 电费
        waterCharges: 0, // 水费
        propertyCharges: 0, // 物业费
        internetCharges: 0, // 宽带费
        managerName: '',
        leaseType: '',
        pictureList: [ // 房源图片
          {
            roomLongId: '',
            picDepend: '',
            url: '',
            pictureType: ''
          }
        ],
        longChamberList: [],
        room: {
          gardenName: '',
          bulidingName: '',
          bedRoom: '', // 房间数
          livingRoom: '', // 客厅数
          toilet: '', // 厕所数
          kitchen: '', // 厨房数
          balcony: '', // 阳台数
          rentUseTypeDesc: '',
          area: ''
        },
        title: '' // 标题
      }
    };
  },
  props: {
    longRoomId: {
      // 房情 id （长租发布id）
      type: String,
      required: true
    },
    id: {
      // 该房间的 id。
      // SHARED_RENT 合租的 必传
      type: String
    },
    roomName: {
      // 房间的名字
      type: String
    },
    propsLeaseType: {
      // SHARED_RENT 合租？ENTIRE_RENT 整租
      type: String,
      default: 'SHARED_RENT'
    }
  },
  created() {
    this.requestData();
  },
  methods: {
    // 获取楼盘基本信息
    requestData() {
      this.$axios.get(
        '/security/room/longSituation/pickSituationDetail',
        {
          params: {
            id: this.longRoomId
          }
        }
      ).then((res) => {
        // longSituationList里的longChamberId关联longChamberList的id
        if (res.data.status === 'C0000') {
          // 如果是合租，则找到该房间的数据展示
          const { result } = res.data;
          if (this.propsLeaseType === 'SHARED_RENT') {
            this.roomInfo = JSON.parse(JSON.stringify(result));
            // 如果是合租，选取该房间的信息展示
            let myIndex = result.longChamberList.findIndex((value, index, arr) => {
              return value.id === this.id;
            });
            // 筛选该卧室的图片
            let myPicList = result.pictureList.filter((item, index) => {
              // console.log(item);
              if (item.picDepend.indexOf('卧室') === -1) {
                return true;
              } else {
                return item.picDepend === this.roomName;
              }
            });
            this.$set(this.roomInfo, 'pictureList', myPicList);
            (myIndex !== -1) && (this.$set(this.roomInfo, 'longChamberList', [result.longChamberList[myIndex]]));
          } else {
            this.$set(this, 'roomInfo', result);
          }
          this.roomInfo.longChamberList[0] && (this.activeName = this.roomInfo.longChamberList[0].name);
        } else {
          this.$message.error(res.data.message);
        }
      }).catch((err) => {
        console.log(err);
      });
    }
  },
  components: {

  }
};
</script>
<style scoped>
.line {
  display: inline-block;
  width: 1px;
  height: 15px;
  background-color: #cccccc;
}
.long-rent-dialog {
  height: 550px;
  overflow: hidden;
  overflow-y: auto;
  box-sizing: border-box;
}
.status-house-info-item {
  height: 40px;
  line-height: 40px;
}
.info-item-left {
  width: 80px;
  text-align: center;
}
.info-item-right {
  flex: 1;
}

.flex-grow-1 {
  flex-grow: 1;
  height: 100%;
}
.facility-item {
  margin: 5px 10px;
  padding: 2px 15px;
  border-radius: 24px;
  height: 24px;
  line-height: 24px;
  border: 1px solid #ddd;
}
.line-30 {
  line-height: 30px;
}
.room-info >>> .el-tabs--border-card {
  width: 100%;
  border: none;
  box-shadow: none;
}
.room-info >>> .el-tabs__nav-scroll {
  padding: 0;
}
.room-info >>> .el-tabs__nav-prev {
  display: none;
}
.room-info >>> .el-tabs__nav-next {
  display: none;
}
.facility-label {
  margin: 7px 5px;
}
.img-item-box {
  margin: 15px;
  width: 160px;
  height: 120px;
  float: left;
}

.header-info {
  text-align: left;
  font-weight: 600;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #dddddd;
  color: #333;
}
.info-box {
  padding: 20px 0px;
}
.funiture-item {
  display: inline-block;
  padding: 0 7px;
  border-right: 1px solid #999;
}
.funiture-item:last-of-type {
  border: none;
}
.lr-roomInfo >>> .el-tabs__nav {
  border-right: 1px solid #ddd;
}
.h120{
  height: 120px;
}
</style>
