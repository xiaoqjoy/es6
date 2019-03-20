<template>
  <section class="house-box">
    <header class="house-header pdb-10">
      <el-menu :default-active="myActiveIndex"
        mode="horizontal"
        active-text-color="#008842"
        @select="handleToggleActiveIndex">
        <slot v-if="checkPermission('OMS_ROOM_DUTY_1_QUERY')">
          <el-menu-item index="region">大区责任盘</el-menu-item>
        </slot>
        <slot v-if="checkPermission('OMS_ROOM_DUTY_2_QUERY')">
          <el-menu-item index="district">片区责任盘</el-menu-item>
        </slot>
        <slot v-if="checkPermission('OMS_ROOM_DUTY_3_QUERY')">
          <el-menu-item index="groups">组别责任盘</el-menu-item>
        </slot>
        <slot v-if="checkPermission('OMS_ROOM_DUTY_4_QUERY')">
          <el-menu-item index="person">个人责任盘</el-menu-item>
        </slot>
      </el-menu>
    </header>
    <slot v-for="(item, index) in activeIndexList">
      <keep-alive>
        <turnout-area-table v-if="myActiveIndex === item"
          :ref="item"
          :key="index"
          :baseData="baseData"
          :queryTabEnum="queryTabEnum"
          :myActiveIndex="myActiveIndex">
        </turnout-area-table>
      </keep-alive>
    </slot>
    <!-- <keep-alive>
      <turnout-area-table :myActiveIndex="myActiveIndex">
      </turnout-area-table>
    </keep-alive> -->
  </section>
</template>

<script>
import { mapState } from 'vuex';
import turnoutAreaTable from './components/TurnoutArea/TurnoutAreaTable';
export default {
  name: 'TurnoutAreaManage',
  components: {
    turnoutAreaTable
  },
  computed: {
    ...mapState([
      'userInfo'
    ])
  },
  data() {
    return {
      activeIndexList: ['region', 'district', 'groups', 'person'],
      myActiveIndex: undefined,
      count: {
        allCount: 0,
        hasAllot: 0,
        noAllot: 0
      },
      baseData: [],
      queryTabEnum: {
        property: []
      }
    };
  },
  created() {
    if (this.checkPermission('OMS_ROOM_DUTY_1_QUERY')) {
      this.myActiveIndex = 'region';
    } else if (this.checkPermission('OMS_ROOM_DUTY_2_QUERY')) {
      this.myActiveIndex = 'district';
    } else if (this.checkPermission('OMS_ROOM_DUTY_3_QUERY')) {
      this.myActiveIndex = 'groups';
    } else if (this.checkPermission('OMS_ROOM_DUTY_4_QUERY')) {
      this.myActiveIndex = 'person';
    }
    this.requestBaseData();
    this.requestQueryTabEnum();
  },
  methods: {
    handleToggleActiveIndex(key, path) {
      this.myActiveIndex = key;
    },
    closeDetail() {
      this.DetailDialog = false;
    },
    requestBaseData() {
      this.$axios.get('/security/oms/duty/orgQuery').then((res) => {
        if (res.data.status === 'C0000') {
          res.data.result && this.$set(this, 'baseData', res.data.result);
          // let myFlatOptions = this.flattenOptions(this.baseData);
          // console.log(myFlatOptions);
          // this.initParams(myFlatOptions);
        } else {
          this.$message.error(`组织数据获取：${res.data.message}`);
        }
      }).catch(err => {
        console.log(err);
        this.$message.error(err.message || '组织数据获取：服务异常！');
      });
    },
    requestQueryTabEnum() {
      this.$axios.get('/security/oms/duty/queryTabEnum').then((res) => {
        if (res.data.status === 'C0000') {
          this.$set(this, 'queryTabEnum', res.data.result);
        } else {
          this.$message.error(`区域数据获取：${res.data.message}`);
        }
      }).catch(err => {
        console.log(err);
        this.$message.error(err.message || '区域数据获取：服务异常！');
      });
    }

  },
  watch: {

  }
};
</script>
<style scoped>
.el-menu--horizontal {
  border-width: 0;
}
.list-wrapper {
  position: relative;
  padding-bottom: 20px;
  box-sizing: border-box;
  height: 100%;
  padding-top: 133px;
}
.list-header {
  position: relative;
  display: block;
  padding-left: 20px;
  margin-top: -133px;
  text-align: left;
  background-color: #fff;
}
.list-header-row {
  line-height: 60px;
  padding: 0 20px;
}
</style>
