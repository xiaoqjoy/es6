<template>
  <div class="import-message accountprint" id="exportToWord" >
    <object id="printWB" style="dispaly:none" classid="clsid:8856F961-340A-11D0-A96B-00C04FD705A2" height="0"></object>
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <!-- 头部 -->
      <div class="dialog-box__top">
        <h5 class="title bg__white">担保确认函</h5>
      </div>
      <!-- 主体部分 -->
      <div class="dialog-box__body bg__white">
          <div class="anti-fraud_dialog-box__middle">
              <div class="content clearfix">
                <div class="conten_top">
                  <span class="conten_title">东营银行小企业专营中心：</span>
                  <span class="conten_info">我公司自愿为下列清单中的客户在《个人借款合同》项下对贵行所负债务按照与贵行、深圳前海大数金融服务有限公司签订的《个人贷款业务合作协议》及《贷款担保函》的约定承担担保代偿责任。</span>
                  <span class="conten_list">{{startAndEndDate}}办理借款的客户清单如下:</span>
                </div>
              </div>
          </div>
          <el-table
          border
          class="common__table"
          :data="tableData"
          header-cell-class-name="table-head"
          row-class-name="table-tr"
          style="width: 640px;margin: 0 auto;"
          ref="multipleTable"
          v-loading='loading'>
            <el-table-column
            type="index"
            width="48"
            label='序号'>
            </el-table-column>
            <el-table-column
            width="80"
            prop="customerName"
            label="客户姓名">
            </el-table-column>
            <el-table-column
            width="150"
            prop="customerCertID"
            label="身份证号">
            </el-table-column>
            <el-table-column
            width="120"
            prop="businessSum"
            label="贷款金额（万元）">
            </el-table-column>
            <el-table-column
            width="80"
            prop="loanTerm"
            label="贷款期限">
            </el-table-column>
            <el-table-column
            width="160"
            prop="gatheringCardId"
            label="银行卡号">
            </el-table-column>
          </el-table>
          <div class="anti-fraud_dialog-box__middle">
            <div class="content clearfix">
              <div class="conten_bot f__right">
                <span class="conten_sign">{{companyName}}</span>
                <span class="conten_seal">（公章）</span>
              </div>
            </div>
            <div class="content desc text__center"><span>{{companyAddress}}</span></div>
          </div>
          <div class="btn text-center" id="hide_btn">
            <el-button class="width100" type="primary" @click="print">打印</el-button>
            <el-button class="width100" style='margin-left: 30px;' type="primary" @click="close_">返回</el-button>
          </div>
        </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
/* eslint-disable */
import "@common/css/dialog";
import { baseApi } from "@common/js/server.js";
export default {
  name: "accountprint",
  data() {
    return {
      startAndEndDate: "",
      loading: false,
      // 表格信息
      tableData: [],
      collaborateModeCode: "",
      companyName: "",
      companyAddress: ""
    };
  },
  created() {
    let query = this.$route.query;
    // console.log(query);
    this.collaborateModeCode = query.collaborateModeCode;
    if(this.collaborateModeCode === "DSRD") {
      this.companyName = "深圳市大数融资担保有限公司";
      this.companyAddress = "（注：本公司注册地址为深圳市南山区粤海街道铜鼓路39号大冲国际中心5号楼24层）";
    } else if (this.collaborateModeCode === "RSRD") {
      this.companyName = "武汉融生融资担保有限公司";
      this.companyAddress = "（注：本公司注册地址为武昌区和平大道750号绿地国际金融城A04地块第B2幢23层1、2、3、4号）";
    } else {
      this.companyName = "";
      this.companyAddress = "";
    }
    let accountAllotIdList = query.accountAllotIds.split(",");
    let url = baseApi.getPrintLetter;
    // console.log(url);
    this.loading = true;
    this.$MyFetch
      .post(url, accountAllotIdList)
      .then((data = {}) => {
        this.loading = false;
        // console.log(data);
        this.tableData = data.customertLetterInfoList;
        this.startAndEndDate = data.startAndEndDate;
      })
      .catch(err => {
        this.loading = false;
        this.$error(err.message);
      });
  },
  // 组件
  components: {},
  methods: {
    // 关闭弹窗
    close_() {
      window.close();
    },
    // 还款计划表数据导出
    print() {
      window.print();
    }
  }
};
</script>
<style lang="less" rel="stylesheet/less" >
.import-message.accountprint {
  width: 100%;
  height: 100%;
  /*表格修改*/
  .el-table.common__table {
    border: 1px solid @border-line;
    border-radius: 4px;
    .table-head {
      height: 38px;
      padding: 0;
      background: @bg-light;
      border-bottom: 1px solid @border-line;
      font-size: 12px;
    }
    .table-tr {
      td {
        height: 40px;
        padding: 0;
        font-size: 14px;
        border-bottom: 1px solid @border-line;
      }
    }
    .cell {
      font-size: 12px;
    }
  }
}
</style>
<style lang="less" rel="stylesheet/less" scoped>
.import-message {
  .dialog-box {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    .el-form-item {
      margin-right: 0;
    }
    .dialog-box__body {
      overflow-y: auto;
      overflow-x: hidden;
    }
    .dialog-box__top {
      margin-bottom: 0;
      box-shadow: none;
    }
  }
}
//关闭按钮
.el-icon-close {
  position: absolute;
  font-size: 28px;
  top: 12px;
  right: 10px;
  cursor: pointer;
}
.anti-fraud_dialog-box__middle {
  padding: 0 30px;
}
.content {
  margin: 40px 0;
  &.desc {
    margin-top: 80px;
  }
  span {
    font-size: 14px;
  }
  .conten_top {
    width: 100%;
    .conten_title {
      margin-bottom: 10px;
      display: block;
    }
    .conten_info {
      text-indent: 32px;
      margin-bottom: 10px;
      line-height: 28px;
      display: block;
    }
  }
  .conten_bot {
    span {
      display: block;
      text-align: center;
    }
    .conten_sign {
      display: block;
      margin-bottom: 10px;
      margin-top: 30px;
    }
    .conten_seal {
    }
  }
}
// 保存按钮
.btn.text-center {
  text-align: center;
}
.el-button--primary {
  width: 200px;
  height: 40px;
  margin: 10px 0px;
  background: #538bf1;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #fff;
}
</style>
