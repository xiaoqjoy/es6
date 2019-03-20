<template>
  <section class="dialog-box">
    <el-row>
      <el-col :span="17">
        <div class="dialog-l">
          <div class="owner-info box_div">
            <header class="header-info">
              <span>联系信息</span>
            </header>
            <div class="info-box">
              <el-row :gutter="10" v-for="(item, index) in houseInfo.ownerList" :key="index">
                <el-col :span="8">
                  <p class="content-item">
                    <span class="content-item-label">
                      <span class="content-item-label-justify">姓名</span>：</span>{{item.ownerName}}
                  </p>
                </el-col>
                <el-col :span="8">
                  <p class="content-item">
                    <span class="content-item-label">
                      <span class="content-item-label-justify">手机</span>：</span>{{item.ownerPhone}}
                  </p>
                </el-col>
                <el-col :span="8">
                  <p class="content-item">
                    <span class="content-item-label">
                      <span class="content-item-label-justify">关系</span>：</span>{{item.personRoomRelationDesc}}
                  </p>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="lease-info box_div">
            <header class="header-info">租金信息</header>
            <div class="info-box">
              <el-row :gutter="10">
                <el-col :span="8">
                  <p class="content-item">
                    <span class="content-item-label">
                      <span class="content-item-label-justify">租金</span>：</span>
                    <span class="color_red">{{houseInfo.leaseholdModel.rentMoney}}元/月</span>
                  </p>
                  <p class="content-item">
                    <span class="content-item-label">
                      <span class="content-item-label-justify">保证金</span>：</span>{{houseInfo.leaseholdModel.earnestMoney}}元
                  </p>
                  <p class="content-item">
                    <span class="content-item-label">
                      <span class="content-item-label-justify">免租期</span>：</span>{{houseInfo.leaseholdModel.rentFreeDays}}天/年
                  </p>
                </el-col>
                <el-col :span="8">
                  <p class="content-item">
                    <span class="content-item-label">
                      <span class="content-item-label-justify">押金</span>：</span>{{houseInfo.leaseholdModel.depositMoney}}元
                  </p>
                  <p class="content-item">
                    <span class="content-item-label">
                      <span class="content-item-label-justify">装修期</span>：</span>{{houseInfo.leaseholdModel.decorateDays}}天
                  </p>
                </el-col>
                <el-col :span="8">
                  <!-- <p class="content-item">
                    <span class="content-item-label"><span class="content-item-label-justify">单价</span>：</span>{{houseInfo.leaseholdModel.leaseRoomPrice}}元/平方/月
                  </p> -->
                  <p class="content-item">
                    <span class="content-item-label">
                      <span class="content-item-label-justify">付款方式</span>：</span>{{houseInfo.leaseholdModel.payTypeDesc}}
                  </p>
                  <p class="content-item">
                    <span class="content-item-label">
                      <span class="content-item-label-justify">租期</span>：</span>{{houseInfo.leaseholdModel.leaseDays}}年
                  </p>
                </el-col>
                <el-col>
                  <p class="content-item">
                    <span class="content-item-label">
                      <span class="content-item-label-justify">租金递增</span>：</span>{{rentCount(houseInfo.leaseholdModel.leasePriceRateDesc)}}
                  </p>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="box_div">
            <header class="header-info">
              <span>装修信息</span>
            </header>
            <div class="info-box">
              <el-row :gutter="10">
                <el-col :span="8">
                  <p class="content-item">
                    <span class="content-item-label">
                      <span class="content-item-label-justify">装修风格</span>：</span>{{houseInfo.decorationDesc}}
                  </p>
                </el-col>
                <el-col :span="8">
                  <p class="content-item">
                    <span class="content-item-label">
                      <span class="content-item-label-justify">增加隔间</span>：</span>{{houseInfo.leaseholdModel.compartStateDesc}}
                  </p>
                </el-col>
                <el-col :span="8">
                  <p class="content-item">
                    <span class="content-item-label">
                      <span class="content-item-label-justify">预计成本</span>：</span>{{houseInfo.leaseholdModel.expectDecorationCost}}元
                  </p>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="box_div">
            <header class="header-info">
              <span>其他</span>
            </header>
            <div class="info-box">
              <el-row :gutter="10">
                <el-col :span="8">
                  <p class="content-item">
                    <span class="content-item-label">
                      <span class="content-item-label-justify">模式</span>：</span>{{houseInfo.patternDesc}}
                  </p>
                </el-col>
                <el-col :span="8">
                  <p class="content-item">
                    <span class="content-item-label">
                      <span class="content-item-label-justify">来源</span>：</span>{{houseInfo.sourceDesc}}
                  </p>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="8">
                  <p class="content-item">
                    <span class="content-item-label">
                      <span class="content-item-label-justify">录入人</span>：</span>{{houseInfo.bdName}}
                  </p>
                </el-col>
                <el-col :span="8">
                  <p class="content-item">
                    <span class="content-item-label">
                      <span class="content-item-label-justify">所属部门</span>：</span>{{houseInfo.orgName}}
                  </p>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="8">
                  <p class="content-item">
                    <span class="content-item-label">
                      <span class="content-item-label-justify">综合管家</span>：</span>{{houseInfo.gardenManagerName || '--'}}
                  </p>
                </el-col>
                <el-col :span="8">
                  <p class="content-item">
                    <span class="content-item-label">
                      <span class="content-item-label-justify">所属部门</span>：</span>{{houseInfo.gardenManagerOrg || '--'}}
                  </p>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="note-info box_div">
            <header class="header-info">备注说明</header>
            <div>
              <!-- <el-input type="textarea" :maxlength="300" :autosize="{ minRows: 2}" placeholder="请输入要备注的内容" v-model="textarea2">
              </el-input> -->
              <div class="mark-div" >
                <p v-if="!houseInfo.roomDescription.trim()" class="font-c">暂无说明</p>
                <div v-else v-html="houseInfo.roomDescription.replace(/(\r\n)|(\n)/g,'<br/>')"></div>
              </div>
            </div>
          </div>
          <div class="house-img box_div">
            <header class="header-info">房源图片</header>
            <div v-if="houseInfo.pictureList.length > 0" class="clearfix pdv-ten">
              <viewer :options="options" :images="houseInfo.pictureList" @inited="inited" class="viewer" ref="viewer">
                <template slot-scope="scope">
                  <div v-for="(imgItem, index) in houseInfo.pictureList" :key="index" class="img-item-box">
                    <img :src="imgItem.pictureUrl.replace('{size}', '160x120')" :data-source="imgItem.pictureUrl.replace('{size}', '800x600')+'?tailor=false'" class="img-content">
                    <p v-if="scope.images.length> 0" class="p-title">{{scope.images[index].pictureTypeDesc}}</p>
                  </div>
                </template>
              </viewer>
            </div>
            <div v-else class="noimg">
              暂无图片
            </div>
          </div>
        </div>
      </el-col>
      <!-- 计算模型暂时隐藏
      <el-col :span="8">
        <reck-model v-if="showReckModel"
          :decoration="decorationCost"
          :rentMoney="houseInfo.leaseholdModel.rentMoney"
          :expectHouse="houseInfo.expectHousePrice"
          :expectLive="houseInfo.expectLiveRate"
          :type="readonly"></reck-model>
      </el-col> -->
      <el-col :span="7">
        <house-out :houseInfo="houseInfo"></house-out>
      </el-col>
    </el-row>
  </section>
</template>
<script>
import ReckModel from './ReckModel';
import HouseOut from './HouseOut';
export default {
  data() {
    return {
      options: {
        url: 'data-source',
        title: false,
        zIndex: 99999
      },
      showReckModel: false,
      mapDialog: false,
      mapShow: false,
      readonly: 'readonly',
      decorationCost: '',
      dialogVisible: false, // 弹框
      mapVisible: false, // 图片
      leaseholdModelShow: false,
      // 房源信息
      houseInfo: {
        address: '',
        bedRoom: '', // 房间数
        livingRoom: '', // 客厅数
        toilet: '', // 厕所数
        kitchen: '', // 厨房数
        balcony: '', // 阳台数
        roomType: '', // 类型
        district: '', // 区域
        gardenName: '', // 楼盘
        city: 'SHENZHEN',
        number: '', // 房号
        area: '', // 面积
        decoration: '', // 装修
        bdName: '', // BD
        rentUseType: '', // 用途
        buildingName: '', // 楼栋
        totalFloor: '', // 总楼层
        floor: '', // 所在的楼层
        gardenId: '1',
        houseType: '', // 户型
        direction: '', // 朝向
        // roomState: '', // 房源审核状态
        roomDescription: '', // 备注说明
        expectHousePrice: '', // 预计出房价
        expectLiveRate: '', // 预计住房率
        leaseholdModel: {
          rentMoney: '', // 租金
          depositMoney: '', // 押金
          payType: '', // 付款方式
          payRate: '', // 付款增率
          rentFreeDays: '', // 免租期
          decorateDays: '', // 装修期
          leaseDays: '', // 租期
          // leaseCreateTime: '2017-10-23', // 租约创造时间
          // leaseFinalTime: '2020-10-23', // 租约结束时间
          leaseRoomPrice: '' // 租约房源价格
        },
        ownerList: [
          {
            ownerName: '',
            ownerPhone: ''
          }
        ],
        pictureList: [
          {
            pictureType: '',
            pictureUrl: '',
            pictureTypeDesc: ''
          }
        ],
        roomCount: 0
      }

    };
  },
  props: ['id'],
  created() {
    this.requestData();
  },
  methods: {
    // 编辑房源的数据
    requestData() {
      this.$axios.get(
        '/security/room/manage/queryRoomDetail',
        {
          params: {
            // id: '1a0962a2-54a3-447f-8bfe-0fd5ef5fd65d'
            id: this.id
          }
        }
      ).then((res) => {
        if (res.data.status === 'C0000') {
          this.houseInfo = res.data.result;
          if (!(this.houseInfo.leaseholdModel && Object.values(this.houseInfo.leaseholdModel).length > 0)) {
            this.houseInfo.leaseholdModel = {
              rentMoney: '', // 租金
              depositMoney: '', // 押金
              payType: '', // 付款方式
              payRate: '', // 付款增率
              rentFreeDays: '', // 免租期
              decorateDays: '', // 装修期
              leaseDays: '', // 租期
              // leaseCreateTime: '2017-10-23', // 租约创造时间
              // leaseFinalTime: '2020-10-23', // 租约结束时间
              leaseRoomPrice: '' // 租约房源价格
            };
          }
          this.mapShow = true;
          // 暂时隐藏 计算模型
          // this.showReckModel = true;

          // this.houseInfo.contractId = '无合同id,合同尚未添加!';
          this.postHouseInfo();
        } else {
          this.$message.error(res.data.message);
          // this.showReckModel = true;
        }
      }).catch((err) => {
        this.$message.error(err.message || '服务器异常');
        console.log(err);
      });
    },
    // 计算租金
    rentCount(val) {
      if (val && val['RADIO_INCREASE']) {
        let rentStr = val['RADIO_INCREASE'];
        let rentAry = rentStr.split(',').map((e, i) => {
          return '第' + (i + 2) + '年' + (e || 0) + '%';
        });
        return rentAry.join('，');
      } else if (val && val['PRICE_INCREASE']) {
        let rentStr = val['PRICE_INCREASE'];
        let rentAry = rentStr.split(',').map((e, i) => {
          return '第' + (i + 2) + '年增加' + (e || 0);
        });
        return rentAry.join('，');
      } else {
        return '';
      }
    },
    // setData() {
    //   this.$emit('setParam', {
    //     bdName: this.houseInfo.bdName,
    //     gardenName: this.houseInfo.gardenName,
    //     buildingName: this.houseInfo.buildingName,
    //     number: this.houseInfo.number,
    //     contractId: this.houseInfo.contractId,
    //     positionInfo: this.houseInfo.positionInfo
    //   });
    // },
    postHouseInfo() {
      this.$emit('getHouseInfo', this.houseInfo);
    },
    inited(viewer) {
      this.$viewer = viewer;
    },

    show() {
      this.$viewer.show();
    }
  },

  components: {
    ReckModel, HouseOut
  }
};
</script>
<style lang="scss" scoped>
.box_div {
  background-color: #fff;
  padding: 0 20px;
}
.color_red {
  color: #fa5555;
}
.content-item {
  font-size: 12px;
  .content-item-label {
    width: auto;
    .content-item-label-justify {
      display: inline-block;
      width: 48px;
      text-align: justify;
      text-align-last: justify;
    }
  }
}
.mark-div {
  font-size: 12px;
  line-height: 18px;
  padding: 15px 0;
}
.house-img {
  min-height: 240px;
  .img-item-box {
    width: auto;
    height: auto;
    margin: 4px;
    .img-content {
      width: 137px;
      height: 103px;
    }
  }
  .p-title {
    font-size: 12px;
    color: #333;
    margin-top: 10px;
  }
}

.header-info {
  text-align: left;
  font-weight: 600;
  height: 40px;
  line-height: 40px;
  /* padding: 0 20px; */
  border-bottom: 1px solid #dddddd;
  /* background-color: #fafafa; */
  color: #333;
}
.info-box {
  padding: 20px 0px;
}
.owner-label {
  display: inline-block;
  width: 100px;
}
.owner-info-item {
  margin-bottom: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.owner-del {
  border-left: 1px solid #666;
}
.dialog-l {
  padding: 10px;
  background-color: #eeeeee;
}

/* .content-item {
  padding-bottom: 15px;
  text-align: left;
}
.content-item-label {
  display: inline-block;
  width: 80px;
  text-align: right;
  color: #999;
} */

.img-item {
  margin: 15px;
  width: 160px;
  height: 120px;
  float: left;
}
.img-item-content {
  width: 160px;
  height: 120px;
  position: relative;
}
.del-img {
  display: block;
  width: 30px;
  height: 30px;
  position: absolute;
  top: 0;
  right: 0;
  line-height: 30px;
  text-align: center;
  color: #999;
  background-color: #333;
}
.upload-info {
  position: absolute;
  top: 30px;
  left: 0;
}
.map-box {
  padding: 5px;
}
.noimg {
  height: 200px;
  line-height: 200px;
  text-align: center;
  font-size: 14px;
}
/* .img-content {
  display: block;
  width: 100%;
  height: 100%;
  outline: 0;
  border: 0;
} */
</style>
