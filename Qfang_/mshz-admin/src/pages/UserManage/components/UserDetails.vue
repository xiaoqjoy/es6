<template>
  <section class="dialog-box bgceee">
    <div v-if="useData.status === 'FREEZE'">
      <div class="step-info">
        <div>
          <i class="font-25 c-red el-icon-warning"></i>
        </div>
        <div class="info-content font-l">
          <p class="content-text c-red">该账户已被冻结</p>
          <p v-if="useData.freezeReason" class="content-time">原因：{{useData.freezeReason}}</p>
        </div>
      </div>
    </div>
    <el-row :gutter="10" style="height:100%;">
      <el-col :span="6" class="border-r">
        <div class="userinfo">
          <div class="head-img-box">
            <div class="img-content">
              <img v-if="useData.headPortrait" :src="useData.headPortrait.replace(/{size}/g, '60x60')" class="head-img">
              <span v-else class="default-head-bgc">
                <i class="icon iconfont icon-morentouxiang default-head"></i>
              </span>
            </div>
            <div class="users-info">
              <div class="hg-1 font-l font-w">
                {{useData.realName}}
              </div>
              <p class="content-item font-l font-w">
                {{useData.phone}}
              </p>
            </div>
          </div>

          <p class="content-item font-l pdl-20">
            <span class="content-item-label">昵称：</span>{{useData.nickname}}
          </p>

          <p class="content-item font-l pdl-20">
            <span class="content-item-label">性别：</span>
            <span v-if="useData.sex === 'MALE'">男</span>
            <span v-else-if="useData.sex === 'FEMALE'">女</span>
            <span v-else>未知</span>
          </p>
          <p class="content-item font-l pdl-20">
            <span class="content-item-label">生日：</span>{{useData.birthday}}
          </p>
          <p class="content-item font-l pdl-20">
            <span class="content-item-label">身份证：</span>{{useData.identityCard}}
          </p>
          <p class="content-item font-l pdl-20">
            <span class="content-item-label">微信：</span>{{useData.weixin}}
          </p>
          <p class="content-item font-l pdl-20">
            <span class="content-item-label">地址：</span>{{useData.address}}
          </p>
          <p class="content-item font-l pdl-20">
            <span class="content-item-label">注册时间：</span>{{useData.createTimeDesc}}
          </p>
          <p class="content-item font-l pdl-20">
            <span class="content-item-label">最后登录：</span>{{useData.lastlyTime}}
          </p>
          <!-- <p class="content-item font-l pdl-20">
            <span class="content-item-label">状态：</span>
            <span v-if="useData.status === 'NORMAL'">正常</span>
            <span v-else>冻结</span>
          </p>
          <p v-if="useData.status === 'FREEZE'" class="content-item font-l pdl-20">
            <span class="content-item-label">冻结原因：{{useData.freezeReason}}</span>
          </p> -->
        </div>
      </el-col>
      <el-col :span="18" class="border-r">
        <div class="header-box">
          <div>
            <el-radio-group v-model="choose" size="mini">
              <el-radio-button label="integration">积分记录</el-radio-button>
              <el-radio-button label="orderHistory">订单记录</el-radio-button>
            </el-radio-group>
          </div>
          <div>
            <h3 v-if="choose === 'integration'" class="pd-ten font-l">积分：
              <span class="c-red">{{useData.integral}}</span>
            </h3>
            <h3 v-else class="pd-ten font-l">订房次数：
              <span class="c-red">{{useData.orderCount}}</span> 消费金额：
              <span class="c-red">{{useData.allOrderMoney}}</span>
            </h3>
          </div>
        </div>
        <section v-show="choose === 'integration'" class="bgcfff">
          <el-table :data="UserRecordData" header-align="center" ref="UserRecordData" size="mini" height="395" cell-class-name="default-color" class="talbe-box">
            <el-table-column prop="title" label="积分动态" :min-width="80" align="center">
            </el-table-column>
            <el-table-column prop="points" label="积分变化" :min-width="150" align="center">
            </el-table-column>
            <!-- <el-table-column prop="money" label="消费金额" :min-width="150" align="center">
              </el-table-column> -->
            <el-table-column prop="createTimeDesc" label="日期" :min-width="150" align="center">
            </el-table-column>
          </el-table>
          <div class="user-pagination">
            <el-pagination class="user-page" @size-change="handleSizeChange" @current-change="handlePageChange" :current-page.sync="currentPage" :page-sizes="[5, 10, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :page-count="pageCount" :total="total">
            </el-pagination>
          </div>
        </section>

        <section v-show="choose === 'orderHistory'" class="bgcfff">
          <el-table :data="UserOdersData" header-align="center" ref="UserOdersData" size="mini" height="395" cell-class-name="default-color" class="talbe-box">
            <el-table-column prop="orderNo" label="订单号" :min-width="80" align="center">
            </el-table-column>
            <el-table-column prop="city" label="城市" :min-width="80" align="center">
            </el-table-column>
            <el-table-column label="房源" :min-width="150" align="center">
              <template slot-scope="scope">
                {{ scope.row.garden }}-{{scope.row.building }}-{{scope.row.number}}
              </template>
            </el-table-column>
            <el-table-column prop="startTime" label="入住日期" :min-width="100" align="center">
            </el-table-column>
            <el-table-column prop="endTime" label="离店日期" :min-width="100" align="center">
            </el-table-column>
            <el-table-column prop="days" label="天数" :min-width="50" align="center">
            </el-table-column>
            <el-table-column prop="money" label="消费金额" :min-width="80" align="center">
            </el-table-column>
            <el-table-column prop="orderStateDesc" label="订单状态" :min-width="80" align="center">
            </el-table-column>
          </el-table>
          <div class="user-pagination">
            <el-pagination class="user-page" @size-change="oRhandleSizeChange" @current-change="oRhandlePageChange" :current-page.sync="orcurrentPage" :page-sizes="[5, 10, 20]" :page-size="orpageSize" layout="total, sizes, prev, pager, next, jumper" :page-count="orpageCount" :total="ortotal">
            </el-pagination>
          </div>
        </section>

      </el-col>
    </el-row>
  </section>
</template>

<script>
export default {
  data() {
    return {
      choose: 'integration',
      currentPage: 1, // 分页当前第几页
      total: 0, // 数据总数
      pageSize: 10, // 每页的数据量
      pageCount: null, /// 总页数
      orcurrentPage: 1, // 分页当前第几页
      ortotal: 0, // 数据总数
      orpageSize: 10, // 每页的数据量
      orpageCount: null, /// 总页数
      activeName: 'first',
      useData: {
        address: '',
        allOrderMoney: 0,
        birthday: '',
        createOperatorId: '',
        createTime: '',
        createTimeDesc: '',
        headPortrait: '',
        id: '',
        identityCard: '',
        integral: 0,
        lastlyTime: '',
        nickname: '',
        orderCount: 0,
        password: '',
        phone: '',
        realName: '',
        sex: '',
        source: '',
        status: '',
        updateOperatorId: '',
        updateTime: null,
        weixin: ''
      },
      UserRecordData: [],
      UserOdersData: [],
      UserRecord: {
        'createTimeDesc': 'string',
        'id': 'string',
        'money': 0,
        'points': 0,
        'remark': 'string',
        'title': 'string',
        'type': 'OBTAIN',
        'uid': 'string',
        'usage': 'string'
      },
      UserOders: {
        'createOperatorId': '',
        'createTime': 1514540416000,
        'createTimeDesc': '2017-12-29',
        'id': '46d7c403-ec7c-11e7-bdd4-782bcb6ea7f4',
        'money': 0,
        'points': 10,
        'remark': '',
        'title': '茶树菇',
        'type': 'OBTAIN',
        'uid': '7e9e6e28-da57-11e7-bdd4-782bcb6ea7f4',
        'updateOperatorId': '',
        'updateTime': null,
        'usage': ''
      }
    };
  },
  props: ['id'],
  created() {
    this.requestData();
    this.requestOdersData();
    this.requestRecordData();
  },
  methods: {
    // 获取列表数据
    requestData() {
      this.$axios.get(
        '/security/user/info/query',
        {
          params: {
            uid: this.id
          }
        }
      ).then((res) => {
        if (res.data.status === 'C0000') {
          this.useData = res.data.result;
        } else {
          this.$message.error('请求数据失败！');
        }
      }).catch((res) => {
        this.$message.error('请求数据失败！');
        console.log(res);
      });
    },

    requestRecordData() {
      this.$axios.get(
        '/security/user/points/queryUserRecord',
        {
          params: {
            uid: this.id,
            pageSize: this.pageSize,
            currentPage: this.currentPage
          }
        }
      ).then((res) => {
        if (res.data.status === 'C0000') {
          this.UserRecordData = res.data.result.items;
          this.pageCount = res.data.result.pageCount;
          this.total = res.data.result.recordCount;
        } else {
          this.$message.error('请求用户积分数据失败！');
        }
      }).catch((res) => {
        this.$message.error('请求用户积分数据失败！');
        console.log(res);
      });
    },

    requestOdersData() {
      this.$axios.get(
        '/security/user/order/queryPage',
        {
          params: {
            uid: this.id,
            pageSize: this.orpageSize,
            currentPage: this.orcurrentPage
          }
        }
      ).then((res) => {
        if (res.data.status === 'C0000') {
          this.UserOdersData = res.data.result.items;
          this.orpageCount = res.data.result.pageCount;
          this.ortotal = res.data.result.recordCount;
        } else {
          this.$message.error('请求用户订单数据失败！');
        }
      }).catch((res) => {
        this.$message.error('请求用户订单数据失败！');
        console.log(res);
      });
    },

    // 分页每页几条
    handleSizeChange(val) {
      this.pageSize = val;
      this.requestRecordData();
    },

    // 跳到第几页
    handlePageChange(val) {
      this.currentPage = val;
      this.requestRecordData();
    },
    // 分页每页几条
    oRhandleSizeChange(val) {
      this.orpageSize = val;
      this.requestOdersData();
    },

    // 跳到第几页
    oRhandlePageChange(val) {
      this.orcurrentPage = val;
      this.requestOdersData();
    },

    handleClick(tab, event) {
      // console.log(tab, event);
    }
  }
};
</script>

<style scoped>
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
/* .talbe-box {
  height: 100%;
} */
.user-pagination {
  /* display: none; */
  width: 100%;
  left: 0;
  bottom: 0;
  height: 50px;
  /* padding-top: 9px; */
  box-sizing: border-box;
  background-color: #fafafa;
}
.users-info {
  flex: 1;
}
.user-page {
  margin-top: 8px;
  float: left;
}
.content-item {
  height: 26px;
  line-height: 26px;
}
.header-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.integration {
  height: 100%;
}
.step-info {
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 10px;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
}
i.font-25 {
  font-size: 25px;
}
.info-content {
  padding-left: 10px;
}
.content-text {
  font-size: 16px;
  /* color: #d66666; */
}
.content-time {
  font-size: 12px;
  color: #999;
}
.hg-1 {
  line-height: 1;
}
/* .ds-flex {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.flex-1 {
  flex: 1;
} */
</style>
