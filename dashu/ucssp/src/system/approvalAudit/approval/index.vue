<template>
  <div class="approval-index">
    <el-tabs v-model="activeName" class="ata" @tab-click="handleClick" >
      <el-tab-pane label="待处理" name="first"></el-tab-pane>
      <!-- <el-tab-pane label="已处理" name="second"></el-tab-pane> -->
    </el-tabs>
    <router-view v-if="isRouterAlive"/>
  </div>
</template>

<script>
  export default {
    provide() {
      return {
        reload: this.reload
      };
    },
    data() {
      return {
        activeName: 'first',
        isRouterAlive: true
      };
    },
    methods: {
      reload() {
        this.isRouterAlive = false;
        this.$nextTick(function() {
          this.isRouterAlive = true;
        });
      },
      handleClick(tab, event) {
        let type = tab.index;
        console.log(type);
        switch (type) {
        case "0":
          console.log(this.$router);
          this.$router.push({ name: "approval-pending" });
          break;
        case "1":
          this.$router.push({ name: "approval-processed" });
          break;
      }
      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less" scoped>
/* 表头部分样式 */
/deep/.el-tabs__active-bar{
  background-color: #538BF1;
}
/deep/ .el-tabs__nav-wrap{
  -webkit-box-shadow: 1px 2px 20px #ccc;
  padding-left: 30px;
  padding-top: 10px;
  border-radius: 4px;
  background: #FFFFFF;
  box-shadow: 0 2px 6px 0 rgba(0,0,0,0.08);
  }
/deep/ .el-tabs__nav-wrap .el-tabs__item.is-active{
    font-size: 18px;
    color: #538BF1;
    letter-spacing: 1.38px;
}
/deep/ .el-tabs__nav-wrap .el-tabs__item.is-active .el-tabs__item{
    font-size: 16px;
    color: #333333;
    letter-spacing: 1.22px;
    text-align: center;
  }
</style>
