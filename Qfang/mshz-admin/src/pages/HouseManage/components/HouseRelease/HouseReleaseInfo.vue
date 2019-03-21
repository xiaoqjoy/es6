<template>
  <section>
    <div class="dialog-box">
      <div class="head-info pd-10-20">

        <h3 class="font-l pdb-10">{{houseForm.room.gardenName}}</h3>

        <div class="font-l">
          <span class="head-info-item">楼栋：{{houseForm.room.buildingName}}</span>

          <span class="head-info-item">房号：{{houseForm.room.number}}</span>

          <span class="head-info-item">{{houseForm.room.bedRoom}}房{{houseForm.room.livingRoom}}厅{{houseForm.room.toilet}}卫{{houseForm.room.kitchen}}厨{{houseForm.room.balcony}}阳</span>

          <span class="head-info-item">{{houseForm.room.area}}平方</span>

          <span class="head-info-item">{{houseForm.room.rentUseTypeDesc}}</span>
        </div>
      </div>
      <div class="pd-20 bgceee">
        <div class="house-base-info model-border pdt-20 pdl-20">
          <el-row>
            <el-col>
              <p class="content-item">
                <span class="content-item-label">房间标题：</span>{{houseForm.title}}
              </p>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <p class="content-item">
                <span class="content-item-label">平日价格：</span>{{houseForm.price}}
              </p>
            </el-col>
            <el-col :span="10">
              <p class="content-item">
                <span class="content-item-label">周末价格：</span>{{houseForm.priceWeekend}} （
                <span v-for="(item, index) in houseForm.weekendDesc"
                  :key="index">
                  <span v-if="index !== 0">，</span> 周{{item}}</span>）
              </p>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <p class="content-item">
                <span class="content-item-label">床数：</span>{{houseForm.bedCount}}
              </p>
            </el-col>
            <el-col :span="6">
              <p class="content-item">
                <span class="content-item-label">床规格：</span>{{houseForm.bedDesc}}m
              </p>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <p class="content-item">
                <span class="content-item-label">宜住人数：</span>{{houseForm.customerCount}}
              </p>
            </el-col>
          </el-row>
        </div>
        <div class="manager model-border house-info">
          <header class="model-header header-info">
            <span>管家</span>
          </header>
          <div class="pd-ten pdt-20">
            <el-row :gutter="15"
              v-for="(item, index) in houseForm.managers"
              :key="index">
              <el-col :span="9">
                <p class="content-item">
                  <span class="content-item-label">管家：</span>{{item.name}}
                </p>
              </el-col>
              <el-col :span="9">
                <p class="content-item">
                  <span class="content-item-label">手机：</span>{{item.phone}}
                </p>
              </el-col>
              <el-col :span="6">
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="model-border ">
          <header class="model-header">设施服务</header>
          <div class="pd-ten pdt-20">
            <div class="font-l checkbox-label">
              <span class="c-9">居家：</span>
              <span class="facility-item"
                v-for="(item,index) in facilityForm.JUJIA"
                :key="index">{{item.nameDesc}}</span>
            </div>
            <div class="font-l checkbox-label">
              <span class="c-9">卫浴：</span>
              <span class="facility-item"
                v-for="(item,index) in facilityForm.WEIYU"
                :key="index">{{item.nameDesc}}</span>
            </div>
            <div class="font-l checkbox-label">
              <span class="c-9">厨房：</span>
              <span class="facility-item"
                v-for="(item,index) in facilityForm.CHUFANG"
                :key="index">{{item.nameDesc}}</span>
            </div>
            <div class="font-l checkbox-label">
              <span class="c-9">娱乐：</span>
              <span class="facility-item"
                v-for="(item,index) in facilityForm.YUYE"
                :key="index">{{item.nameDesc}}</span>
            </div>
          </div>
        </div>
        <div class="model-border">
          <header class="model-header">入住须知</header>
          <div class="pd-ten pdt-20 pdl-20 pdr-20">
            <el-row :gutter="20">
              <el-col :span="6">
                <p class="content-item">
                  <span class="content-item-label">入住时间：</span>{{houseForm.inTimeDesc}}
                </p>
              </el-col>
              <el-col :span="6">
                <p class="content-item">
                  <span class="content-item-label">退房时间：</span>{{houseForm.outTimeDesc}}
                </p>
              </el-col>
              <el-col :span="6">
                <p class="content-item">
                  <span class="content-item-label">押金：</span>{{houseForm.deposit}}元
                </p>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <span class="c-9 pdl-ten">房屋守则：</span>{{houseForm.remark}}
                <!-- <el-input type="textarea"
                  v-model="houseForm.remark"
                  :maxlength="300"
                  :autosize="{ minRows: 2}"
                  :readonly="true">
                </el-input> -->
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="model-border">
          <header class="model-header">退订说明</header>
          <div class="pd-ten pdt-20 pdl-20 pdr-20">
            <el-row :gutter="20">
              <el-col :span="6">
                <p class="content-item">
                  <span class="content-item-label">是否允许：</span>
                  <span v-if="houseForm.cancelAble">是</span>
                  <span v-else>否</span>
                </p>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="10">
                    <span class="c-9">离入住时间大于：</span>
                    <span class="font-l">{{houseForm.cancelDays}}</span>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <span class="c-9 pdl-ten">退订说明：</span> {{houseForm.cancelRemark}}
                <!-- <el-input type="textarea"
                  v-model="houseForm.cancelRemark"
                  :maxlength="300"
                  :autosize="{ minRows: 2}"
                  :readonly="true">
                </el-input> -->
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="model-border">
          <header class="model-header">房源描述</header>
          <div class="form-desc">
            <el-input type="textarea"
              v-model="houseForm.desc"
              :maxlength="300"
              :autosize="{ minRows: 2}"
              :readonly="true">
            </el-input>
          </div>
        </div>
        <div class="model-border">
          <header class="header-info">房源图片
          </header>
          <div class="clearfix pdt-5 pdb-30">
            <viewer :options="options"
              :images="houseForm.pictures"
              @inited="inited"
              class="viewer"
              ref="viewerReleasein">
              <template slot-scope="scope">
                <div v-for="(imgItem, index) in houseForm.pictures"
                  :key="index"
                  class="img-item-box">
                  <img :src="imgItem.url.replace('{size}', '160x120')"
                    :data-source="imgItem.url.replace('{size}', '800x600')+'?tailor=false'"
                    class="img-content">
                  <p v-if="scope.images.length> 0"
                    class="font-c">{{scope.images[index].pictureType}}</p>
                </div>
              </template>
            </viewer>
            <!-- <div class="img-item" v-for="(imgItem, index) in houseForm.pictures" :key="index">
                <div class="img-item-content">
                  <img class="img-content" v-if="imgItem.url" :src="imgItem.url.replace('{size}', '160x120')" />
                </div>
                <p>{{imgItem.pictureType}}</p>
              </div> -->
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
      facilityForm: {
        JUJIA: [],
        WEIYU: [],
        CHUFANG: [],
        YUYE: []
      },
      houseForm: {
        'bedCount': 0, // 床数
        'bedDesc': '', // 床规格
        'cancelAble': false, // 是否允许退订
        'cancelDays': 0, // 离入住时间大于
        'cancelRemark': '', // 离入住时间大于
        'customerCount': 0, // 适宜居住人数
        'deposit': 0, // 押金
        'desc': '', // 房源描述
        'furnitureForm': [],
        'id': '',
        'inTime': '14：00', // 入住时间
        'managers': [ // 管家
          {
            'id': '',
            'managerId': '',
            'name': ''
          }
        ],
        'outTime': '12：00', // 离店时间
        'pictures': [ // 房源图片
          {
            'id': '',
            'main': false,
            'type': '',
            'url': '',
            pictureType: ''
          }
        ],
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
        'price': 200, // 平日价格
        'priceWeekend': 300, // 周末价格
        'remark': '', // 补充说明
        'title': '', // 标题
        'weekend': [] // 周末日设置，‘5，6，7’
      }
    };
  },
  props: ['roomId', 'id'],
  created() {
    this.requestData();
  },
  methods: {

    // 获取楼盘基本信息
    requestData() {
      this.$axios.get(
        '/security/room/situation/pickSituation',
        {
          params: {
            id: this.id
          }
        }
      ).then((res) => {
        if (res.data.status === 'C0000') {
          const houseBase = res.data.result;
          this.houseForm.id = houseBase.id;
          this.houseForm = houseBase;
          this.furnitureForm();
        } else {
          this.$message.error(res.data.message + res.data.result);
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
      const list = this.houseForm.furnitures;
      for (let i = 0; i < list.length; i++) {
        const { type } = list[i];
        this.facilityForm[type].push(list[i]);
      }
      this.houseForm.weekendDesc = this.houseForm.weekendDesc.split(',');
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
  margin-left: 10px;
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
.form-desc>>>.el-textarea .el-textarea__inner {
  border: none;
}
</style>
