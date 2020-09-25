<template>
  <div class="survey">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "survey",
  data() {
    return {};
  },
  created() {
    this.$store.dispatch('getSurveyFieldConfig').then(() => {}).catch(err => {
      this.$error(err.message);
    });
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
.survey {
   // elemnt-ui樣式重置
   /deep/ .el-select .el-select__tags-text {
     word-spacing: normal;
   }
  /deep/.tab {
    box-shadow: 0 2px 6px 0 rgba(0,0,0,0.08);
    border-radius: 4px;
    background: #fff;
    padding: 18px 30px 0 30px;
  }
  /deep/.el-tabs__header {
    margin-bottom: 0;
  }
  /deep/ .el-tabs__active-bar {
    background-color: #538BF1;
  }
  /deep/.el-message-box--center .el-message-box__message {
    margin-bottom: 20px;
    font-size: 14px;
    color: #333333;
    letter-spacing: 1.07px;
    text-align: center;
  }
  /deep/.el-table {
    border: 1px solid #d0d0d0;
    border-right: 1px solid #d0d0d0;
  }
  /deep/.el-table__footer-wrapper, .el-table__header-wrapper {
    border-bottom: 1px solid #d0d0d0;
  }
  /deep/.el-table thead tr th {
    background: #ececec;
    color: #666;
    padding: 8px 0;
  }
  /deep/.audit_top .el-table thead tr th {
    padding:2px 0;
  }
  /deep/.audit_top .el-table td {
    padding:6px 0;
  }
  /deep/.el-table td, .el-table th.is-leaf {
    border: none;
  }
  /deep/.el-tabs__item.is-active {
    font-size: 18px;
    color: #538bf1;
    letter-spacing: 1.38px;
    text-align: center;
  }
  /deep/.el-tabs__item {
    font-size: 16px;
  }
  /deep/.el-tabs__nav-wrap::after{
    border: none;
    background: none;
  }
  /deep/.el-dialog--center .el-dialog__body{
      text-align: left;
    }
  /deep/.el-dialog__header{
    box-shadow: 0 1px 6px 0 rgba(239,239,239,0.74);
  }

  /deep/.el-select__tags-text{
    display:inline-block;
    width:20px;
    overflow: hidden;
    word-spacing: 10px;
  }

  /deep/.survey_task_list, /deep/.survey_config_list {
    padding: 30px;
    margin-top: 15px;
    min-height: 800px;
    border-radius: 4px;
    background: #fff;
    box-shadow: 1px 2px 20px #ccc;
    overflow: hidden;
  }

  /deep/ .table_box {
    width: 100%;
    overflow: auto;

    .ellipsis {
      display: block;
      width: 200px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: context-menu;
    }
  }
  /deep/.page_box {
    margin-top: 21px;
  }
  /deep/ .el-switch.is-checked .el-switch__core {
    border-color: #538bf1;
    background-color: #538bf1;
  }
}

/deep/ .survey_detail .el-table td, .survey_detail .el-table th {
  position: static;
}

/deep/ .popup {
  box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 15px 3px;
}
// 详情样式
/deep/.audit_box {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 60px;
  z-index: 500;
  overflow: auto;
  background: #f5f5f5;

  &.no-scroll {
    overflow: hidden;
  }

  /* 清浮动 */
  .clearfloat:after {
    display: block;
    clear: both;
    content: "";
    visibility: hidden;
    height: 0;
  }
  .clearfloat {
    zoom: 1;
  }
  .content {
    border-radius: 4px;
    background: #fff;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.08);
    overflow: hidden;
    /* margin-left: 30px;
      margin-top: 10px; */
    margin: 10px 30px 0 30px;
    padding-bottom: 6px;
  }

  .content_title_on {
    .content_title_headA{
      background: #ffffff;
      border: 4px solid #538bf1;
    }
    .content_title_headB{
      color: #538bf1;
    }
  }
  .entry-report-wrap {
    height:44px;
    line-height:44px;
    margin-top:10px;
    background: #fff;
    text-align: center;
  }
  .entry-report {
    padding-left: 20px;
    font-size: 14px;
    color: #538bf1;
    background:url('../../assets/img/survey_report.png') no-repeat left center;
    background-size: 16px;
  }
  // .icon_btn_line{
  //   display: flex;
  //   flex-direction: row;
  //   justify-content: center;
  //   align-items: center;
  //   height:44px;
  //   margin-top:10px;
  //   background: #fff;
  //
  //   .icon_left_btn{
  //     padding-left: 20px;
  //     font-size: 14px;
  //     color: #538bf1;
  //     &:nth-child(1){
  //       background:url('../../assets/img/survey_report.png') no-repeat left center;
  //       background-size: 16px;
  //     }
  //     &:nth-child(2){
  //       margin-left:59px;
  //       background:url('../../assets/img/Group10.png') no-repeat left center;
  //       background-size: 16px;
  //     }
  //     &:nth-child(3){
  //       margin-left:59px;
  //       background:url('../../assets/img/icon_record.png') no-repeat left center;
  //       background-size: 16px;
  //     }
  //   }
  //
  //   .icon_lf_btn{
  //     padding-left: 20px;
  //     font-size: 14px;
  //     color: #538bf1;
  //     &:nth-child(1){
  //       background:url('../../assets/img/icon_winfo.png') no-repeat left center;
  //       background-size: 16px;
  //     }
  //     &:nth-child(2){
  //       margin-left:59px;
  //       background:url('../../assets/img/icon_eye.png') no-repeat left center;
  //       background-size: 16px;
  //     }
  //     &:nth-child(3){
  //       margin-left:59px;
  //       background:url('../../assets/img/icon_play.png') no-repeat left center;
  //       background-size: 14px;
  //     }
  //   }
  //
  // }
  .text_left {
    text-align: left;
  }
  .float_left {
    float: left;
  }
  .float_right {
    float: right;
  }
  /* 上内容 */
  /* 返回 */
  .backAudit {
    text-align: left;
    height:20px;
    margin-left: 30px;
    margin-top: 10px;

  a{
    display: inline-block;
    vertical-align: middle;
    height:20px;
  }

  .el-icon-arrow-left{
    display: inline-block;
    height:20px;
    line-height: 20px;
    vertical-align: middle;
  }

  .black_font{
    display: inline-block;
    height:20px;
    line-height: 20px;
    vertical-align: middle;
  }
}
  /* 加粗 */
  .bold {
    font-weight: bold;
  }
  /* 蓝色字体 */
  .blue_font {
    font-size: 14px;
    color: #538bf1;
    letter-spacing: -0.34px;
  }
  a {
    text-decoration: none;
  }
  /* 黑色字体 */
  .black_font {
    font-size: 14px;
    color: #333333;
    letter-spacing: -0.34px;
  }
  .audit_top {
    background: #f5f5f5;
    overflow: hidden;
    position: fixed;
    z-index: 600;
    width: 100%;
    padding-bottom: 30px;
  }
  .top_conten {
    float: left;
    margin-left: 33px;
    margin-right: 20px;
    margin-bottom: 10px;
    padding-top: 10px;
    width:21%;
  }
  .top_conten_title {
    font-size: 14px;
    color: #666;
    text-align: center;
    line-height: 20px;
  }
  .top_content_font {
    font-size: 14px;
    color: #000000;
    letter-spacing: 0.86px;
    line-height: 20px;
  }
  .orange {
    font-size: 14px;
    color: orange;
  }
  .grade {
    float: left;
    margin-left: 53px;
  }
  .image_blue {
    float: right;
    margin-right: 30px;
    font-size: 14px;
  }
  /* 表格 */
  .tables {
    margin: 20px;
  }
  // .tables_width {
  //   width: 1342px;
  //   border: 1px solid #d0d0d0;
  //   border-radius: 4px;
  // }

  /* 导航栏 */
  .content_nav {
    position: fixed;
    margin: 19px 0 0 0;
    width: 142px;
    border-radius: 4px;
    background: #fff;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.08);
    .nav-button {
      text-align: left;
      line-height: 36px;
      text-indent: 24px;
      font-size: 14px;
      color: #333333;
      letter-spacing: -0.34px;
      cursor:pointer;

      &:hover {
        background: #eef1f6;
      }
    }
    .clickNav {
      border-left: 4px solid #538bf1;
      text-indent: 20px;
      background: #f0f8fc;
    }
  }

  .content_title {
    margin: 20px 0 10px 30px;
    font-size: 14px;
    color: #333333;
    letter-spacing: 0;
    text-indent: 6px;
    border-left: 2px solid #538bf1;
  }

  .content_head_title{
    margin-left:30px;
    margin-right:30px;
    padding-top:20px;
    padding-bottom:20px;
    font-size: 14px;
    color: #333333;
    letter-spacing: 0;
    text-indent: 6px;
    position:relative;
    &::before{
      content:'';
      position:absolute;
      left:0;
      top:20px;
      height:14px;
      border-left: 2px solid #538bf1;
    }

    .btn_select{
      width:30px;
      height:20px;
      float:right;
      background: url('../../assets/img/icon_select.png') no-repeat center;
      background-size: 12px;
    }

    .btn_select_clicked{
      transform: rotate(180deg);
      -ms-transform:rotate(180deg); /* IE 9 */
      -moz-transform:rotate(180deg); /* Firefox */
      -webkit-transform:rotate(180deg); /* Safari and Chrome */
      -o-transform:rotate(180deg); /* Opera */
    }
  }
  .head_border_bottom {
    border-bottom: 1px solid #d0d0d0;
  }
  .point{
    cursor: pointer;
  }
}

/deep/.content_border {
  border-left: 2px solid #cfd7e6; // 左侧分界线
  padding-top: 10px;
  padding-bottom: 10px;
  margin-top: 10px;
  position: relative;

  /*调查预约*/
  .content_top_padding{
    padding-top: 10px
  }

  .content_bottom_border{
    margin: 0 30px;
    padding-bottom: 10px;
    border-bottom:1px solid #d0d0d0;

    .content_title{
      margin-left: 0;
    }
  }
  .topology_margin{
    margin: 0 -30px;
  }
  .content_title_head {
    // display:flex;
    // justify-content: flex-start;
    // align-items: center;
    position: absolute;
    top: -10px;
    left: -10px;
  }
  .content_title_headA {
    border-radius: 50px;
    display: -moz-inline-box;
    display: inline-block;
    width: 17px;
    height: 17px;
    background: #cfd7e6;
    border: 4px solid #fff;
  }
  .content_title_headB {
    padding-left: 9px;
    font-weight: bold;
    font-size: 14px;
    color: #000;
  }
}
/deep/ .el-switch__label--right{
  -ms-transform:translateY(-10px);
}
/deep/ .el-button--text {
  color: #538bf1;
}
/deep/ .el-button--primary{
  color: #fff;
  background: #538bf1;
  border-color: #538bf1;

  &:focus {
    color: #fff;
    background: #66b1ff;
    border-color: #66b1ff;
  }

  &:hover {
    color: #fff;
    background: #66b1ff;
    border-color: #66b1ff;
  }

  &:active {
    color: #fff;
    background: #3a8ee6;
    border-color: #3a8ee6;
  }

  &:visited {
    color: #fff;
    background: #538bf1;
    border-color: #538bf1;
  }
}
/deep/ .el-dialog__wrapper {
    position: fixed;
    top: 50%;
    right:auto;
    bottom:auto;
    left: 50%;
    margin: auto;
    transform: translate(-50%, -50%);

    .el-dialog{
      margin:0 !important;
    }
}
/deep/ .dialog-fade-enter-active {
  -webkit-animation: dialog-fade-in 0;
  animation: dialog-fade-in 0
}

/deep/ .dialog-fade-leave-active {
  -webkit-animation: dialog-fade-out 0;
  animation: dialog-fade-out 0
}

@keyframes dialog-fade-in {
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 0;
  }
  100% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

@keyframes dialog-fade-out {
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  100% {
    transform: translate3d(0, 0, 0);
    opacity: 0;
  }
}
/deep/ .el-button--primary.is-plain{
  color: #538bf1;
  background: #fff;
  border-color: #538bf1;

  &:focus {
    color: #fff;
    background: #66b1ff;
    border-color: #66b1ff;
  }

  &:hover {
    color: #fff;
    background: #66b1ff;
    border-color: #66b1ff;
  }

  &:active {
    color: #fff;
    background: #3a8ee6;
    border-color: #3a8ee6;
  }

  &:visited {
    color: #538bf1;
    background: #fff;
    border-color: #538bf1;
  }
}

/deep/ .el-button--warning {
  color: #fff;
  background-color: #eeb352;
  border-color: #eeb352;

  &:focus {
    background: #f5d583;
    border-color: #f5d583;
    color: #fff;
  }

  &:hover {
    background: #f5d583;
    border-color: #f5d583;
    color: #fff;
  }

  &:active {
    background: #cf9236;
    border-color: #cf9236;
    color: #fff;
  }

  &:visited {
    color: #fff;
    background-color: #eeb352;
    border-color: #eeb352;
  }
}
/deep/ input::-ms-clear{
  display: none;
}
</style>
