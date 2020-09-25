<template>
  <div class="approval-index">
    <div class="tab-home">
      <el-tabs v-model="activeName" class="ata" @tab-click="handleClick">
        <el-tab-pane label="待处理" name="first"></el-tab-pane>
      </el-tabs>
    </div>
    <router-view :key="key" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: 'first'
    };
  },
  methods: {
    handleClick(tab, event) {
      let type = tab.index;
      console.log(type);
      switch (type) {
        case "0":
          console.log(this.$router);
          this.$router.push({ name: "audit-pending" });
          break;
        case "1":
          this.$router.push({ name: "audit-processed" });
          break;
      }
    }
  },
  computed: {
    key() {
      return this.$route.name !== undefined ? this.$route.name + new Date() : this.$route + new Date();
    }
  }
};

</script>
<style lang="less" rel="stylesheet/less" scoped>
/deep/.el-tabs__active-bar {
  background-color: #538BF1;
}

.approval-index {
  .content {
    border-radius: 4px;
    background: #fff;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.08);
    overflow: hidden;
  }

  /* 表头部分样式 */
  /deep/ .el-tabs__nav-wrap {
    -webkit-box-shadow: 1px 2px 20px #ccc;
    padding-left: 30px;
    padding-top: 10px;
    border-radius: 4px;
    background: #FFFFFF;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.08);
  }

  /deep/ .el-tabs__nav-wrap .el-tabs__item.is-active {
    font-size: 18px;
    color: #538BF1;
    letter-spacing: 1.38px;
  }

  /deep/ .el-tabs__nav-wrap .el-tabs__item.is-active .el-tabs__item {
    font-size: 16px;
    color: #333333;
    letter-spacing: 1.22px;
    text-align: center;
  }
}

</style>
