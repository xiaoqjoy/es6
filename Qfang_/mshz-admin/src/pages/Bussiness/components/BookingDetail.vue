<template>
  <section>
    <section class="dialog-box">
      <div class="bookingStatusNote">
        {{bookingInfo.bookingStatusDesc}}
      </div>
      <div class="info-box">
        <div class="info-title">
          房间信息
        </div>
        <div class="pd-20">
          <el-row :gutter="20">
            <el-col :span="6">
              <p class="content-item-twelve">
                <span class="content-item-label-auto c-9">
                  <span class="content-item-label-justify-four">楼盘</span>：
                </span>{{bookingInfo.gardenName}}
              </p>
            </el-col>
            <el-col :span="6">
              <p class="content-item-twelve">
                <span class="content-item-label-auto c-9">
                  <span class="content-item-label-justify-four">楼栋</span>：
                </span>{{bookingInfo.building}}
              </p>
            </el-col>
            <el-col :span="6">
              <p class="content-item-twelve">
                <span class="content-item-label-auto c-9">
                  <span class="content-item-label-justify-four">房号</span>：
                </span>{{bookingInfo.premisesNumber}}
              </p>
            </el-col>
            <el-col :span="6">
              <p class="content-item-twelve">
                <span class="content-item-label-auto c-9">
                  <span class="content-item-label-justify-four">房间</span>：
                </span>{{bookingInfo.roomChamber}}
              </p>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <p class="content-item-twelve">
                <span class="content-item-label-auto c-9">
                  <span class="content-item-label-justify-four">管家</span>：
                </span>{{bookingInfo.bookingManager.managerName}}
              </p>
            </el-col>
          </el-row>
        </div>
      </div>

      <div class="info-box">
        <div class="info-title">
          预订人信息
        </div>
        <div class="pd-20">
          <el-row :gutter="20"
            class="pdt-10">
            <el-col :span="8">
              <p class="content-item-twelve">
                <span class="content-item-label-auto c-9">
                  <span class="content-item-label-justify-four">姓名</span>：
                </span>{{bookingInfo.customerName}}
              </p>
            </el-col>
            <el-col :span="8">
              <p class="content-item-twelve">
                <span class="content-item-label-auto c-9">
                  <span class="content-item-label-justify-four">{{bookingInfo.certTypeDesc}}</span>：
                </span>{{bookingInfo.certNo}}
              </p>
            </el-col>
            <el-col :span="8">
              <p class="content-item-twelve">
                <span class="content-item-label-auto c-9">
                  <span class="content-item-label-justify-four">联系方式</span>：
                </span>{{bookingInfo.customerPhone}}
              </p>
            </el-col>
          </el-row>
          <el-row :gutter="20"
            class="pdt-10">
            <viewer :options="options"
              :images="bookingInfo.pictures"
              @inited="inited"
              class="viewer"
              ref="viewerReleasein">
              <template slot-scope="scope">
                <div v-for="(imgItem, index) in bookingInfo.pictures"
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

          </el-row>
        </div>
      </div>

      <div class="info-box">
        <div class="info-title">
          支付信息
        </div>
        <div class="pd-20">
          <el-row :gutter="20"
            class="pdt-10">
            <el-col :span="8">
              <p class="content-item-twelve">
                <span class="content-item-label-auto c-9">
                  <span class="content-item-label-justify-four">客户</span>：
                </span>{{bookingInfo.customerName}}
              </p>
            </el-col>
            <el-col :span="10">
              <p class="content-item-twelve">
                <span class="content-item-label-auto c-9">
                  <span class="content-item-label-justify-four">支付单号</span>：
                </span>{{bookingInfo.payNumber}}
              </p>
            </el-col>
            <el-col :span="6">
              <p class="content-item-twelve">
                <span class="content-item-label-auto c-9">
                  <span class="content-item-label-justify-four">支付渠道</span>：
                </span>{{bookingInfo.payChannelDesc}}
              </p>
            </el-col>
          </el-row>
          <el-row :gutter="20"
            class="pdt-10">
            <el-col :span="24">
              <p class="content-item-twelve">
                <span class="content-item-label-auto c-9">
                  <span class="content-item-label-justify-four">付款时间</span>：
                </span>{{bookingInfo.rentDateDesc}}
              </p>
            </el-col>
          </el-row>
        </div>
      </div>

    </section>

  </section>
</template>
<script>

export default {
  name: 'BookingDetail',
  components: {
  },
  data() {
    return {
      messagesInfo: '',
      bookingInfo: {
        bookingBillStatusDesc: '',
        gardenName: '',
        building: '',
        premisesNumber: '',
        roomChamber: '',
        bookingManager: {},
        customerName: '',
        certNo: '',
        customerPhone: '',
        pictures: [],
        payNumber: '',
        payChannelDesc: '',
        rentDateDesc: ''
      },
      options: {
        url: 'data-source',
        title: false,
        zIndex: 99999
      }
    };
  },
  computed: {

  },
  props: ['bookingNo'],
  mounted() {
    this.requestData();
  },
  methods: {
    requestData() {
      this.$axios
        .get('security/longorder/booking/queryBookingInfoByBookingNo', {
          params: {
            bookingNo: this.bookingNo
          }
        })
        .then(res => {
          if (res.data.status === 'C0000') {
            let { result } = res.data;
            this.bookingInfo = result;
          } else {
            this.$message({
              type: 'warning',
              message: res.data.message
            });
          }
        })
        .catch(err => {
          this.loading = false;
          console.log(err);
          this.$message.error(err.message || '服务器异常');
        });
    },
    closeDialog() {
      this.$emit('toggleDialog', false);
    },
    inited(viewer) {
      this.$viewerReleasein = viewer;
    }
  }
};
</script>
<style scoped>
.dialog-box {
  background: #eee;
  padding: 15px 20px 0;
}
.info-box {
  border: 1px solid #dddddd;
  margin-bottom: 15px;
  background-color: #fff;
}
.info-title {
  text-align: left;
  font-weight: 600;
  height: 35px;
  line-height: 35px;
  padding: 0 20px;
  border-bottom: 1px solid #ddd;
  background-color: #fafafa;
  color: #333;
}
.info-item {
  padding-bottom: 15px;
  text-align: left;
}
.info-item-lable {
  display: inline-block;
  width: 80px;
  text-align: right;
  color: #999;
}
.bookingStatusNote {
  margin: 10px;
  color: #008842;
}
.expense-list {
  width: 100%;
  margin-top: -20px;
}
</style>
