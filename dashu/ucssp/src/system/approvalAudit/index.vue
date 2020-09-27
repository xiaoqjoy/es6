<template>
    <div class="approvalAudit">
          <router-view/>
    </div>
</template>

<script>
    export default {
    name: "approvalAudit",
    data() {
      return {};
    }
  };
</script>

<style lang="less" rel="stylesheet/less" scoped>
.approvalAudit{
  text-align: center;
  // padding-top: 200px;
  td{
    border-bottom: 0;
  }
  //中间部分
  .content {
    // min-height: 620px;
    border-radius: 4px;
    background: #fff;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.08);
    overflow: hidden;
    padding: 10px;
      // 查询和清空的公有样式
      .b_button {
        width: 100px;
        height: 40px;
        border-radius: 4px;
        font-size: 14px;
      }
      // 查询单独样式
      .query {
        background: #538bf1;
        color: #ffffff;
        margin-left: 40px;
      }
      // 清空单独样式
      .empty {
        background: #ffffff;
        color: #538bf1;
        border: 1px solid #538bf1;
      }
  }
        /* 表头部分样式 */
    .el-tabs__nav-wrap{
      -webkit-box-shadow: 1px 2px 20px #ccc;
      padding-left: 30px;
      padding-top: 10px;
      border-radius: 4px;
      background: #FFFFFF;
      box-shadow: 0 2px 6px 0 rgba(0,0,0,0.08);
      }
    .el-tabs__nav-wrap .el-tabs__item.is-active{
        font-size: 18px;
        color: #538BF1;
        letter-spacing: 1.38px;
    }
    .el-tabs__nav-wrap .el-tabs__item.is-active .el-tabs__item{
        font-size: 16px;
        color: #333333;
        letter-spacing: 1.22px;
        text-align: center;
      }
    /* 头字体样式 */
    .content_head{
        height: 20px;
        width: 1138px;
        margin-left: 30px;
        margin-top: 30px;
    }
    .content_title{
        font-size: 14px;
        color: #3F3F3F;
        font-family:PingFangSC-Regular;
        font-weight: bold;
    }
    .title_num{
        color: orange;
    }
    .title_tail{
        font-size: 14px;
        color: gray;
    }
    /* 表格按钮位置 */
    .el-col>div {
      float: left;
    }
    .pagination{
        margin-top: 60px;
    }
    .tail_btn{
        margin-top: 50px;
    }
}
</style>
