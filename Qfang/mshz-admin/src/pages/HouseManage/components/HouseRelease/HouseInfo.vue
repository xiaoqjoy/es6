<template>
  <section>
    <div class="dialog-box">
      <div class="pd-20 bgceee">
        <div class="house-base-info model-border pd-20">
          <el-row>
            <el-col>
              <p class="content-item-twelve">
                <span class="content-item-label-auto c-9">
                  <span class="content-item-label-justify-four">房间标题</span>：
                </span>{{LRentHouseForm.title}}
              </p>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <p class="content-item-twelve">
                <span class="content-item-label-auto c-9">
                  <span class="content-item-label-justify-four">出租方式</span>：
                </span>{{LRentHouseForm.leaseTypeDesc}}
              </p>
            </el-col>
            <el-col :span="6">
              <p class="content-item-twelve">
                <span class="content-item-label-auto c-9">
                  <span class="content-item-label-justify-four">押金</span>：
                </span>{{LRentHouseForm.depositTypeDesc}}
              </p>
            </el-col>
            <el-col :span="6">
              <p class="content-item-twelve">
                <span class="content-item-label-auto c-9">
                  <span class="content-item-label-justify-four">管家</span>：
                </span>{{LRentHouseForm.managerName}}
              </p>
            </el-col>
          </el-row>
          <slot v-if="LRentHouseForm.leaseType === 'ENTIRE_RENT'">
            <div class="flex-start-grow pdb-20">
              <div>
                <p class="content-item-twelve">
                  <span class="content-item-label-auto c-9">
                    <span class="content-item-label-justify-four">租金</span>：
                  </span>
                </p>
              </div>
              <div class="font-12">
                <div class="line-30">
                  <span>月付：</span>
                  <span class="font-w">{{LRentHouseForm.longChamberList[0].monthPrice}}</span>
                  元/月；
                  <span>服务费</span>
                  <span class="font-w">{{LRentHouseForm.longChamberList[0].monthServicePrice}}</span>% （
                  <span class="font-w">{{(LRentHouseForm.longChamberList[0].monthPrice * LRentHouseForm.longChamberList[0].monthServicePrice /100).toFixed(2)}}</span>元/月）
                </div>
                <div class="line-30">
                  <span>季付：</span>
                  <span class="font-w">{{LRentHouseForm.longChamberList[0].seasonPrice}}</span>
                  元/月；
                  <span>服务费</span>
                  <span class="font-w">{{LRentHouseForm.longChamberList[0].seasonServicePrice}}</span>% （
                  <span class="font-w">{{(LRentHouseForm.longChamberList[0].seasonPrice * LRentHouseForm.longChamberList[0].seasonServicePrice /100).toFixed(2)}}</span>元/月）
                </div>
                <div class="line-30">
                  <span>半年：</span>
                  <span class="font-w">{{LRentHouseForm.longChamberList[0].halfYearPrice}}</span>
                  元/月；
                  <span>服务费</span>
                  <span class="font-w">{{LRentHouseForm.longChamberList[0].halfYearServicePrice}}</span>% （
                  <span class="font-w">{{(LRentHouseForm.longChamberList[0].halfYearPrice * LRentHouseForm.longChamberList[0].halfYearServicePrice /100).toFixed(2)}}</span>元/月）
                </div>
                <div class="line-30">
                  <span>年付：</span>
                  <span class="font-w">{{LRentHouseForm.longChamberList[0].yearPrice}}</span>
                  元/月；
                  <span>服务费</span>
                  <span class="font-w">{{LRentHouseForm.longChamberList[0].yearServicePrice}}</span>% （
                  <span class="font-w">{{(LRentHouseForm.longChamberList[0].yearPrice * LRentHouseForm.longChamberList[0].yearServicePrice /100).toFixed(2)}}</span>元/月）
                </div>
              </div>
            </div>
          </slot>
        </div>
        <div class="model-border">
          <header class="model-header header-info">
            <span>房间信息</span>
          </header>
          <div class="pd-20 room-info">
            <slot>
              <el-tabs type="border-card"
                tabPosition="left">
                <el-tab-pane v-for="(roomItem, index) in LRentHouseForm.longChamberList"
                  :label="roomItem.name"
                  :key="index">
                  <div class="h-280">
                    <el-row>
                      <el-col :span="3">
                        <p class="content-item-twelve">
                          <span class="content-item-label-auto c-9">
                            <span class="content-item-label-justify-four">面积</span>：
                          </span>
                        </p>
                      </el-col>
                      <el-col :span="2"
                        class="pdv-ten font-12">
                        <span>{{roomItem.area ? roomItem.area + '㎡' : '未知'}}</span>
                      </el-col>
                      <el-col :span="3">
                        <p class="content-item-twelve">
                          <span class="content-item-label-auto c-9">
                            <span class="content-item-label-justify-four">朝向</span>：
                          </span>
                        </p>
                      </el-col>
                      <el-col :span="2"
                        class="pdv-ten font-12">
                        <span>{{roomItem.directionDesc || '未知'}}</span>
                      </el-col>
                      <el-col :span="3">
                        <p class="content-item-twelve">
                          <span class="content-item-label-auto c-9">
                            <span class="content-item-label-justify-four">阳台</span>：
                          </span>
                        </p>
                      </el-col>
                      <el-col :span="2"
                        class="pdv-ten font-12">
                        <span>{{roomItem.attachedChamber.indexOf('BALCONY')===-1?'无':'有'}}</span>
                      </el-col>
                      <el-col :span="3">
                        <p class="content-item-twelve">
                          <span class="content-item-label-auto c-9">
                            <span class="content-item-label-justify-four">卫生间</span>：
                          </span>
                        </p>
                      </el-col>
                      <el-col :span="2"
                        class="pdv-ten font-12">
                        <span>{{roomItem.attachedChamber.indexOf('TOILET')===-1?'无':'有'}}</span>
                      </el-col>
                    </el-row>
                    <el-row v-if="roomItem.canPublish && LRentHouseForm.leaseType !== 'ENTIRE_RENT'">
                      <el-col :span="3">
                        <p class="content-item-twelve line-30"
                          style="padding: 0">
                          <span class="content-item-label-auto c-9">
                            <span class="content-item-label-justify-four">租金</span>：
                          </span>
                        </p>
                      </el-col>
                      <el-col :span="12"
                        class="font-12">
                        <div class="line-30">
                          <span>月付：</span>
                          <span class="font-w">{{roomItem.monthPrice}}</span>
                          元/月；
                          <span>服务费</span>
                          <span class="font-w">{{roomItem.monthServicePrice}}</span>% （
                          <span class="font-w">{{(roomItem.monthPrice * roomItem.monthServicePrice /100).toFixed(2)}}</span>元/月）
                        </div>
                        <div class="line-30">
                          <span>季付：</span>
                          <span class="font-w">{{roomItem.seasonPrice}}</span>
                          元/月；
                          <span>服务费</span>
                          <span class="font-w">{{roomItem.seasonServicePrice}}</span>% （
                          <span class="font-w">{{(roomItem.seasonPrice * roomItem.seasonServicePrice /100).toFixed(2)}}</span>元/月）
                        </div>
                        <div class="line-30">
                          <span>半年：</span>
                          <span class="font-w">{{roomItem.halfYearPrice}}</span>
                          元/月；
                          <span>服务费</span>
                          <span class="font-w">{{roomItem.halfYearServicePrice}}</span>% （
                          <span class="font-w">{{(roomItem.halfYearPrice * roomItem.halfYearServicePrice /100).toFixed(2)}}</span>元/月）
                        </div>
                        <div class="line-30">
                          <span>年付：</span>
                          <span class="font-w">{{roomItem.yearPrice}}</span>
                          元/月；
                          <span>服务费</span>
                          <span class="font-w">{{roomItem.yearServicePrice}}</span>% （
                          <span class="font-w">{{(roomItem.yearPrice * roomItem.yearServicePrice /100).toFixed(2)}}</span>元/月）
                        </div>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="3">
                        <p class="content-item-twelve facility-label">
                          <span class="content-item-label-auto c-9">
                            <span class="content-item-label-justify-four">设施</span>：
                          </span>
                        </p>
                      </el-col>
                      <el-col :span="20">
                        <p class="line-30 clearfix">
                          <span class="facility-item float-l font-12"
                            v-for="(item,index) in roomItem.furnitureDesc"
                            :key="index">{{item}}</span>
                        </p>
                      </el-col>
                    </el-row>
                    <el-row v-if="roomItem.canPublish && LRentHouseForm.leaseType !== 'ENTIRE_RENT'"
                      class="pdt-20">
                      <el-col :span="3">
                        <p class="font-l c-9 font-12 line-h-20">
                          <span>房源点评：</span>
                        </p>
                      </el-col>
                      <el-col :span="20">
                        <!-- <p class="line-h-40 font-red font-12">请认真填写，客户在Q房网外网可见
                          </p> -->
                        <div class="reak-all line-h-20 font-12">
                          {{roomItem.roomRemark || '暂无点评'}}
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </slot>
          </div>
        </div>
        <div v-if="LRentHouseForm.leaseType === 'ENTIRE_RENT'"
          class="model-border">
          <header class="model-header">房源点评
            <span class="float-r font-red">请认真填写，客户在Q房网外网可见</span>
          </header>
          <div class="pd-20 break-all line-h-20">
            {{LRentHouseForm.longChamberList[0].roomRemark || '暂无点评'}}
          </div>
        </div>
        <div class="model-border">
          <header class="model-header">生活费信息
            <span class="float-r c-9">注：未勾选水、电、燃气表示不收租客对应费用</span>
          </header>
          <div class="pd-20">
            <!-- 发布房源去掉 宽带费 需求（1.24.0）2018-10-18
              <div class="inb"
              style="width:33%">
              <p class="content-item-twelve">
                <span class="content-item-label-auto c-9">
                  <span class="content-item-label-justify-four">宽带费</span>：
                </span>{{LRentHouseForm.extras.includes('INTERNET_CHARGES')? LRentHouseForm.internetCharges :0}}元/月
              </p>
            </div> -->
            <div class="inb"
              style="width:33%">
              <p class="content-item-twelve">
                <span class="content-item-label-auto c-9">
                  <span class="content-item-label-justify-four">水费</span>：
                </span>{{ LRentHouseForm.extras.includes('WATER_CHARGES')? LRentHouseForm.waterCharges : 0}}元/吨
                <span class="font-12 c-9">（抄表：{{LRentHouseForm.waterMeterReading || 0}}吨）</span>
              </p>
            </div>
            <div class="inb"
              style="width:33%">
              <p class="content-item-twelve">
                <span class="content-item-label-auto c-9">
                  <span class="content-item-label-justify-four">电费</span>：
                </span>{{ LRentHouseForm.extras.includes('ELECTRIC_CHARGES')? LRentHouseForm.electricCharges : 0}}元/度
                <span class="font-12 c-9">（抄表：{{LRentHouseForm.electricMeterReading || 0}}度）</span>
              </p>
            </div>
            <div class="inb"
              style="width:33%">
              <p class="content-item-twelve">
                <span class="content-item-label-auto c-9">
                  <span class="content-item-label-justify-four">燃气费</span>：
                </span>{{ LRentHouseForm.extras.includes('GAS_CHARGES')? LRentHouseForm.gasCharges : 0}}元/立方
                <span class="font-12 c-9">（抄表：{{LRentHouseForm.gasMeterReading || 0}}立方）</span>
              </p>
            </div>
            <!-- <div class="inb" style="width:33%">
              <p class="content-item-twelve">
                <span class="content-item-label-auto c-9">物业费：</span>{{ LRentHouseForm.extras.includes('PROPERTY_CHARGES')? LRentHouseForm.propertyCharges : 0}}元/月
              </p>
            </div> -->
          </div>
        </div>
        <div class="model-border">
          <header class="header-info">房源图片
          </header>
          <div class="clearfix pdt-5 pdb-30 pdl-ten">
            <viewer :options="options"
              :images="LRentHouseForm.pictureList"
              @inited="inited"
              class="viewer"
              ref="viewerReleasein">
              <template slot-scope="scope">
                <div v-for="(imgItem, index) in LRentHouseForm.pictureList"
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
        </div>
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
      LRentHouseForm: {
        extras: '',
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
        longChamperList: [],
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
  props: ['id'],
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
            id: this.id
          }
        }
      ).then((res) => {
        // longSituationList里的longChamberId关联longChamberList的id
        if (res.data.status === 'C0000') {
          this.LRentHouseForm = res.data.result;
        } else {
          this.$message.error(res.data.message);
        }
      }).catch((err) => {
        this.$message.error(err.message || '服务异常');
        console.log(err);
      });
    },

    inited(viewer) {
      this.$viewerReleasein = viewer;
    },
    show() {
      this.$viewerReleasein.show();
    },

    furnitureForm() {
      const list = this.LRentHouseForm.furnitures;
      for (let i = 0; i < list.length; i++) {
        const { type } = list[i];
        this.facilityForm[type].push(list[i]);
      }
      this.LRentHouseForm.weekendDesc = this.LRentHouseForm.weekendDesc.split(',');
    },
    // 关闭表格
    closeDialog() {
      this.$emit('changeDialog', false);
    }

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
  margin: 2px 5px;
  padding: 2px 15px;
  border-radius: 12px;
  height: 24px;
  line-height: 24px;
  border: 1px solid #eee;
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

.img-item-box {
  margin: 15px;
  width: 160px;
  height: 120px;
  float: left;
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
