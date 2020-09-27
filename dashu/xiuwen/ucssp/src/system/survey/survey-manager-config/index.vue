<template>
  <div class="survey-index">
    <el-tabs v-model="activeName" @tab-click="handleClick" class="tab">
      <el-tab-pane label="调查规则配置" name="survey-rule-config"></el-tab-pane>
      <el-tab-pane label="商圈配置" name="business-config"></el-tab-pane>
      <el-tab-pane label="行业配置" name="industry-config"></el-tab-pane>
      <el-tab-pane label="标准字段配置" name="field-config"></el-tab-pane>
    </el-tabs>
    <router-view/>

  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data() {
    return {
      activeName: "survey-rule-config",
      tabArr: ["survey-rule-config", "business-config", "industry-config", "field-config"]
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
  .content_title {
    margin-bottom: 18px;
  }
  .search {
    margin-left: 30px;
  }
  .content_table_wrap{
    margin:0 30px 30px;
  }
  .tail_btn{
    float: none;
    margin-right:30px;
    margin-bottom:30px;
    display:flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }
}
/deep/.survey_config_list{
  .feild_table.el-table .cell{
    line-height:32px;
  }
  /*开关样式修改*/
  .el-switch{
    .el-switch__label{
      display: none;
      margin-right: 0;
      position: absolute;
      right: -30px;
    }
    .el-switch__label.is-active{
      display: inline-block;
      color: #333;
    }
    .el-switch__core{
      width: 50px;
      height: 30px;
      border-radius: 15px;

    }
    .el-switch__core:after {
      width: 26px;
      height: 26px;
    }
  }
  .el-switch.is-checked .el-switch__core:after{
    left: 100%;
    margin-left: -27px;
  }
  .el-switch.is-checked .el-switch__core:before{
    position: absolute;
    display: inline-block;
    height: 25px;
    width: 25px;
    content: '';
    top: 2px;
    left: 0%;
    background: url('../../../common/img/check.png') center center no-repeat;
    background-size: 15px 15px;
  }
  // 新增按钮
  .add {
    width: 100px;
    height: 40px;
    border: none;
    background: #538bf1;
    border-radius: 4px;
    color: #fff;
    display: block;
    cursor: pointer;
    margin-bottom:20px;
  }

  .dialog_con{
    display:flex;
    flex-direction: row;
    flex-wrap: wrap;

    .top_conten {
      margin-bottom: 10px;
      &:nth-child(odd){
        margin-right:30px;
      }
    }
    .top_conten_title {
      font-size: 14px;
      color: #333333;
      text-align: center;
      line-height: 20px;
    }
    .top_content_font {
      font-size: 14px;
      color:  #151515;
      letter-spacing: 0.86px;
      line-height: 20px;
    }
  }
  .width246{
    width:246px;
  }
  .width225{
    width:225px;
  }
  .width190{
    width:190px;
    margin-top:20px;
  }
  .width120{
    width:120px;
  }
  .margin_top27{
    margin-top:27px;
  }

  .checkbox_group{
    margin-top:10px;
    .checkbox_group_title{
      font-size: 12px;
      color: #333333;
      letter-spacing: 1.38px;
      margin-bottom:10px;
    }
  }
  .dialog_btn_group{
    width: 100%;
    text-align: center;

    .el-button--primary {
      display:inline-block;
    }
  }

  .dialog{

    .dialog_field_btn .el-button--primary.is-plain {
      background:#fff;
      color:#409EFF;
      &:hover{
        color: #fff;
        background:#409EFF;
      }
      &:active{
        color: #fff;
        background:#409EFF;
      }
    }
  }
}
</style>
