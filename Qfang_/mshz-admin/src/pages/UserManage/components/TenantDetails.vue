<template>
  <section class="dialog-box bgceee">
    <el-row :gutter="10" style="height:100%;">
      <el-col :span="6" class="border-r">
        <div class="userinfo">
          <div class="head-img-box">
            <div class="img-content">
              <img v-if="tenantData.headPortrait" :src="tenantData.headPortrait.replace(/{size}/g, '60x60')" class="head-img">
              <span v-else class="default-head-bgc">
                <i class="icon iconfont icon-morentouxiang default-head"></i>
              </span>
            </div>
            <div class="users-info">
              <p class="hg-1 font-l pdl-20 font-w">
                <!-- <span class="content-item-label">姓名：</span> -->
                {{tenantData.name}}
              </p>
              <!-- <p class="content-item font-l">
            <span class="content-item-label">昵称：</span>{{tenantData.nickname}}
          </p> -->
              <p class="content-item font-l pdl-20 font-w">
                <!-- <span class="content-item-label">手机：</span> -->
                {{tenantData.phone}}
              </p>
            </div>
          </div>

          <p class="content-item font-l pdl-20">
            <span class="content-item-label">性别：</span>{{tenantData.sex}}
            <!-- <span v-if="tenantData.sex === 'MALE'">男</span>
            <span v-else-if="tenantData.sex === 'FEMALE'">女</span>
            <span v-else>未知</span> -->
          </p>
          <p class="content-item font-l pdl-20">
            <span class="content-item-label">生日：</span>{{tenantData.birthday}}
          </p>
          <p class="content-item font-l pdl-20">
            <span class="content-item-label">身份证：</span>{{tenantData.idcard}}
          </p>
          <p class="content-item font-l pdl-20">
            <span class="content-item-label">微信：</span>{{tenantData.weixin}}
          </p>
          <p class="content-item font-l pdl-20">
            <span class="content-item-label">地址：</span>{{tenantData.address}}
          </p>
          <p class="content-item font-l pdl-20">
            <span class="content-item-label">最后入住时间：</span>{{tenantData.lastStayTimeDesc}}
          </p>
        </div>
      </el-col>
      <el-col :span="18">
        <div>
          <el-radio-group v-model="choose" size="mini">
            <el-radio-button label="checkin">入住记录</el-radio-button>
          </el-radio-group>
        </div>
        <el-table :data="tenantOrderPage" header-align="center" ref="tenantOrderPage" size="mini" height="460" cell-class-name="default-color" class="talbe-box">
          <el-table-column prop="orderid" label="订单号" :min-width="80" align="center">
          </el-table-column>
          <el-table-column prop="orderDetailModel.cityDesc" label="城市" :min-width="50" align="center">
          </el-table-column>
          <el-table-column prop="orderDetailModel.orderChannelEnumDesc" label="来源" :min-width="80" align="center">
          </el-table-column>
          <el-table-column label="房源" :min-width="150" align="center">
            <template slot-scope="scope">
              {{ scope.row.orderDetailModel.gardenName }}-{{scope.row.orderDetailModel.gardenName }}-{{scope.row.orderDetailModel.number}}
            </template>
          </el-table-column>
          <el-table-column prop="orderDetailModel.inRoomStartTimeDesc" label="入住日期" :min-width="100" align="center">
          </el-table-column>
          <el-table-column prop="orderDetailModel.inRoomEndTimeDesc" label="离店日期" :min-width="100" align="center">
          </el-table-column>
          <el-table-column prop="orderDetailModel.days" label="天数" :min-width="50" align="center">
          </el-table-column>
          <el-table-column prop="orderDetailModel.orderStateEnumDesc" label="订单状态" :min-width="70" align="center">
          </el-table-column>
        </el-table>

      </el-col>
    </el-row>
  </section>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'first',
      choose: 'checkin',
      tenantData: {
        'address': '',
        'birthday': '',
        'createOperatorId': '',
        'guestCount': 0,
        'headPortrait': '',
        'id': '',
        'idcard': '',
        'lastStayTime': null,
        'lastStayTimeDesc': '',
        'name': '',
        'orderPage': null,
        'phone': '',
        'sex': 0,
        'status': 0,
        'updateOperatorId': '',
        'userSourceEnum': null,
        'weixin': ''
      },
      tenantOrderPage: []
    };
  },
  props: ['id'],
  created() {
    this.requestData();
  },
  methods: {
    // 获取列表数据
    requestData() {
      this.$axios.get(
        '/security/guest/queryGuestDetails',
        {
          params: {
            guestId: this.id
          }
        }
      ).then((res) => {
        if (res.data.status === 'C0000') {
          let { result } = res.data;
          this.tenantData = result;
          let { items = [] } = result.orderPage;
          if (items && items.length > 0) {
            this.tenantOrderPage = items;
          }
        } else {
          this.$message.error('请求数据失败！');
        }
      }).catch((res) => {
        this.$message.error('服务异常');
        console.log(res);
      });
    },

    handleClick(tab, event) {
      // console.log(tab, event);
    }
  }
};
</script>

<style scoped>
.talbe-box {
  margin-top: 10px;
}
.border-r {
  height: 100%;
}
.userinfo {
  height: 100%;
  background-color: #fff;
}
.head-img-box {
  height: 100px;
  margin-bottom: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #fafafa;
}
.head-img {
  display: inline-block;
  outline: none;
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.img-content {
  display: inline-block;
  width: 60px;
  height: 60px;
  margin: 0 20px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid #ccc;
}
.default-head-bgc {
  display: inline-block;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #ccc;
  line-height: 80px;
  text-align: center;
  vertical-align: bottom;
}
.default-head {
  font-size: 60px;
  color: #fff;
}

.users-info {
  flex: 1;
}
.content-item {
  height: 26px;
  line-height: 26px;
}
.hg-1 {
  line-height: 1;
}
</style>
