<template>
  <div class="survey-index">
    <el-tabs v-model="activeName" @tab-click="handleClick" class="tab">
      <el-tab-pane label="待预约任务" name="pending-task"></el-tab-pane>
      <el-tab-pane label="调查中任务" name="surveying-task"></el-tab-pane>
      <el-tab-pane label="已完成任务" name="processed-task"></el-tab-pane>
      <el-tab-pane label="额度失效" name="line-failure"></el-tab-pane>
    </el-tabs>
    <router-view/>

  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data() {
    return {
      activeName: "pending-task",
      tabArr: ["pending-task", "surveying-task", "processed-task", "line-failure"]
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
