<template>
  <div class="mortgage_review">
    <el-tabs v-model="activeName" class="mortgage_review_tabs" @tab-click="handleClick" >
      <el-tab-pane label="待处理" name="other-items-upload-unprocessed"></el-tab-pane>
      <el-tab-pane label="已处理" name="other-items-upload-processed"></el-tab-pane>
    </el-tabs>
    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'other-items-upload-unprocessed'
    };
  },
  methods: {
    handleClick(tab) {
      this.$router.push({name: tab.name});
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

<style lang="less">
  .mortgage_review {
    .mortgage_review_tabs {
      padding: 18px 30px 0;
      box-shadow: 0 2px 6px rgba(0,0,0,.1);
      display: flex;
      align-items: center;
      justify-content: space-between;
      > .el-tabs__header {
        margin: 0;
      }
    }
    .mortgage_review_tabs + div {
      padding: 30px;
      margin-top: 15px;
      min-height: 700px;
      background-color: #fff;
      box-shadow: 1px 2px 20px #ccc;
      .clearfix.pagination {
        margin-top: 30px;
      }
    }
  }
</style>
