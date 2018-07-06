<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="isRouterAlive"></router-view>
    </keep-alive>
    <baseModel v-if="showBaseModel" ref="baseModel"></baseModel>
    <!-- <sugarWarning ref="sugarWarningDialog"></sugarWarning> -->
    <!-- 异常血糖设置弹窗 -->
    <sugarWarningSet v-if="showBaseModel" ref="sugarWarningSetDialog"></sugarWarningSet>
    <!-- 右下角血糖提示弹窗 -->
    <sugarWarningTips v-if="showBaseModel" ref="sugarWarningTips">
      <p slot="tipContent">您的患者<span>{{patientName}}</span>测量血糖异常, <a @click="toSugarWarning">点击查看</a></p>
    </sugarWarningTips>
    <!-- 右上角血糖预警弹窗 -->
    <sugarWarningInfoList v-if="showBaseModel" ref="showWarningInfoList"></sugarWarningInfoList>
    <!-- 批量随访弹窗 -->
    <batchFollowUp v-if="showBaseModel" ref="batchFollowUp"></batchFollowUp>
    <!-- 批量干预弹窗 -->
    <batchInter v-if="showBaseModel" ref="batchInter"></batchInter>
    <!-- 批量提醒弹窗 -->
    <batchRemind v-if="showBaseModel" ref="batchRemind"></batchRemind>

    <!--新增干预-->
    <interventionDialog v-if="showBaseModel" ref='interventionDialog'></interventionDialog>

    <!--推送提醒-->
    <remindDialog v-if="showBaseModel" ref='remindDialog'></remindDialog>

    <!--随访-->
    <followUpDialog v-if="showBaseModel" ref='followUpDialog'></followUpDialog>

  </div>
</template>
<script>
  import API_ROOT from './api/index';
  import baseModel from './components/common/baseModel'
  import sugarWarning from './components/common/commonDialog/sugarWarning';
  import sugarWarningSet from './components/common/commonDialog/sugarWarningSet';
  import sugarWarningTips from './components/common/commonDialog/sugarWarningTips';
  import sugarWarningInfoList from './components/common/commonDialog/sugarWarningInfoList';
  import batchFollowUp from './components/common/commonDialog/batchFollowUp'
  import batchInter from './components/common/commonDialog/batchInter'
  import batchRemind from './components/common/commonDialog/batchRemind'

  import interventionDialog from './components/common/commonDialog/interventionDialog'
  import remindDialog from './components/common/commonDialog/remindDialog'
  import followUpDialog from './components/common/commonDialog/followUpDialog'

  export default {
    name: 'app',
    provide(){
      return {
        reload: this.reload
      }
    },
    data () {
      return {
        isRouterAlive: true,
        patientName:'',
        showBaseModel: false
      }
    },
    components: {
      baseModel,
      sugarWarning,
      sugarWarningSet,
      sugarWarningTips,
      sugarWarningInfoList,
      batchFollowUp,
      batchInter,
      batchRemind,
      interventionDialog, // 添加干预
      remindDialog, // 推送提醒
      followUpDialog // 随访
    },
    methods: {
      reload(){
        this.isRouterAlive = false;
        this.$nextTick(function(){
          this.isRouterAlive = true;
        })
      },
      showWarningInfoList () {
        let _this = this;
        this.$refs.showWarningInfoList.sugarWarningTableShow = !this.$refs.showWarningInfoList.sugarWarningTableShow;
        if (this.$refs.showWarningInfoList.sugarWarningTableShow) {
          this.$api.getSugarWarningDataList({currentPage: 1,pageSize: 5}, res => {
            _this.$refs.showWarningInfoList.tableData = res.data.data.items.map(item => {
              let obj = {};
              obj.patientName = item.patientName;
              obj.diabetesType = item.diabetesType;
              obj.sugarTestTime = _this.formatDate(item.sugarTestTime).substring(5, 16);
              obj.timeType = item.timeType;
              obj.sugar = item.sugar;
              obj.isRead = item.isRead;
              obj.customerId = item.customerId;
              obj.userCustomerId = item.userCustomerId;
              obj.fileNumber = item.fileNumber;
              obj.id = item.id;
              return obj;
            });
          });
        }
      },
      showSugarWarningSet () {
        this.$refs.sugarWarningSetDialog.dialogVisible = true;
      },
      // 用作更新未读消息数
      getUnreadSum () {
        let _this = this;
        this.$api.getSugarWarningDataList({currentPage: 1,pageSize: 5,isRead:'2'}, res => {
          _this.$children.forEach(element => {
            if(element.$children[0] && element.$children[0].$refs.top){
               element.$children[0].$refs.top.unreadSum = res.data.data.totalNum * 1 > 0 ? res.data.data.totalNum : '';
            }
          });
        });
      },
      toSugarWarning () {
        this.$router.push('/sugarWarningPage');
        this.$refs.sugarWarningTips.tipsShow = false;
      },
      //隐藏预警列表
      hiddenWarningInfoList () {
        this.$refs.showWarningInfoList.sugarWarningTableShow = false;
      }
    },
    created () {
      if (!!JSON.parse(sessionStorage.getItem("meunList"))) {
        this.showBaseModel = true;
      }
    }
  }
</script>
<style>
  #app {
    font-family: microsoft yahei, serif, 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    height: 100%;
    width: 100%;
    overflow: auto;
    position: absolute;
  }
</style>
