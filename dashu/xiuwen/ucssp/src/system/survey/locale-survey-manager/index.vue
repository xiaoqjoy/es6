<template>
  <div class="survey-index">
    <el-tabs v-model="activeName" @tab-click="handleClick" class="tab">
      <el-tab-pane label="待分配任务" name="assigning-task"></el-tab-pane>
      <el-tab-pane label="调查中任务" name="under-investigation"></el-tab-pane>
      <el-tab-pane label="待复核任务" name="recheck-task"></el-tab-pane>
      <el-tab-pane label="已完成任务" name="finished-task"></el-tab-pane>
      <el-tab-pane label="额度失效" name="limit-failure"></el-tab-pane>
      <el-tab-pane label="现场调查规则配置" name="rule-configuration"></el-tab-pane>
    </el-tabs>
    <router-view/>

  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data() {
    return {
      activeName: "assigning-task",
      tabArr: ["assigning-task", "under-investigation", "recheck-task", "finished-task", "limit-failure", "rule-configuration"]
    };
  },
  methods: {
    handleClick(tab, event) {
      let type = tab.index;
      this.$router.push({ name: this.tabArr[type] });
    }
  },
  created() {
    this.activeName = this.$route.name;
  },
  updated() {
    this.activeName = this.$route.name;
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
/deep/.audit_top {
  .content{
    padding:0;
  }
  .page_box {
    margin:0;
  }
  .content_title {
    margin-bottom: 18px;
  }
  .search {
    margin-left: 30px;
  }
  .content_table_wrap{
    margin:0 30px 10px;
  }
  .tail_btn{
    float: none;
    margin-right:30px;
    margin-bottom:10px;
    display:flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
