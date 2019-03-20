<template>
  <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" custom-class="dialog" width="800px" @close="close">
    <div class="steps">
      <el-steps :active="1" process-status="error" align-center>
        <el-step icon="icon-base iconfont icon-gouxuan-yuan" title="发起流程" description="张三(2018-11-12)"></el-step>
        <el-step title="部门经理审批" description="张三(2018-11-12)"></el-step>
        <el-step title="业务总监审批" description="张三(2018-11-12)"></el-step>
        <el-step title="城市经理审批" description="张三(2018-11-12)"></el-step>
      </el-steps>
    </div>

    <div class="status_info">
      <span>单据号:</span>12324
      <span>操作人:</span>张三(03112)担保一部
      <span class="status">审批通过</span>
    </div>

    <div class="table_data">
      <table border="1" cellspacing="0" cellpadding="0">
        <tr>
          <td>客户来源：</td>
          <td>客户推荐</td>
          <td>卖方姓名：</td>
          <td>22</td>
          <td>买方姓名：</td>
          <td>11</td>
        </tr>
        <tr>
          <td>物业：</td>
          <td colspan="3">龙辉花园2期4栋</td>
          <td>公证日期：</td>
          <td>2019-12-12</td>
        </tr>
        <tr>
          <td>交易类型：</td>
          <td>交易类</td>
          <td>资金类型：</td>
          <td>额度</td>
          <td>业务类型：</td>
          <td>交易类赎楼</td>
        </tr>
        <tr>
          <td>预计用款日期：</td>
          <td>2018-12-23</td>
          <td>担保天数：</td>
          <td>90</td>
          <td>担保金额：</td>
          <td>800000</td>
        </tr>
        <tr>
          <td>手续费：</td>
          <td>300</td>
          <td>担保费：</td>
          <td>9000</td>
          <td>申请折扣：</td>
          <td>0.8</td>
        </tr>
        <tr>
          <td>折后担保费：</td>
          <td>20000</td>
          <td>应收合计：</td>
          <td colspan="3">90235</td>
        </tr>
      </table>

      <table class="reason" border="1" cellspacing="0" cellpadding="0">
        <tr>
          <td>打折原因：</td>
          <td colspan="5">同行竞争</td>
        </tr>
      </table>

      <table class="opinion" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td>审批意见：</td>
          <td colspan="5">
            <input type="text" v-model="opinion" @input="getLength">
            <span>{{ len }}/20</span>
          </td>
        </tr>
      </table>
    </div>

    <span slot="footer" class="dialog-footer">
      <el-button @click="close">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>

export default {
  props: {
    discount: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      dialogTitle: '查看',
      opinion: '',
      len: 0
    }
  },
  mounted(){
  },
  computed: {
      dialogVisible: {
        get: function (){
          return this.discount
        },
        set: function (){}
      },
    },
  methods: {
    close(){
      this.$emit("hideDiscount", false)
      
    },
    getLength(val){
      if(this.opinion.length > 20){
        this.opinion = this.opinion.substring(0,20)
        return;
      }
      this.len = this.opinion.length;
    }
  }
};
</script>

<style scoped lang="less">
.table_data {
  padding: 0px 20px 20px;
  .reason{
    margin-top: 15px;
    td:first-child{
      width: 115px;
    }
  }
  .opinion{
    margin-top: 15px;
    td:first-child{
      width: 115px;
      background: white;
    }
    td{
      border: none;
      text-indent: 0px;
      position: relative;
      input{
        width: 99.5%;
        height: 25px;
        text-indent: 8px;
      }
      span{
        position: absolute;
        right: 5px;
        top: 12px;
        color: #999999;
      }
    }
  }
  table{
    border-collapse: collapse;
    width: 100%;
    td:nth-child(odd){
      width: 100px;
      background-color: #f3f3f3;
      text-align: right;
    }
    td{
      border: 1px solid #e5e5e5;
      height: 40px;
      width: 120px;
      text-indent: 10px;
    }
  }
}
.steps{
  height: 110px;
  background-color: #f3f3f3;
  width: 100%;
  padding-top: 15px;
}
.status_info{
  height: 40px;
  width: 100%;
  line-height: 40px;
  padding: 0 20px;
  span{
    color: #999999;
    margin-right: 6px;
  }
  span:nth-child(2){
    margin-left: 20px;
  }
  span.status{
    float: right;
    color: #01b286;
    font-size: 14px;
  }
}
</style>
