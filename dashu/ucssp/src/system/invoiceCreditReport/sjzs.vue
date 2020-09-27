@@ -0,0 +1,775 @@
<template>
  <div>
    <div class="invoice">
      <el-container>
        <el-header>企业税务征信报告</el-header>
        <el-main>
          <el-card>
            <div slot="header">
              <h3>企业基本信息</h3>
            </div>
            <div class="content">
              <section>
                <el-row>
                  <el-col :span="6">
                    <label>企业名称：</label>
                    <span>{{ invoiceInfo.nsrjbxxVO.nsrmc }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>法人姓名：</label>
                    <span>{{ companyInfo.basic.frname }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>纳税人状态：</label>
                    <span>{{ getTdm(invoiceInfo.nsrjbxxVO.nsrztdm) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>纳税人识别号：</label>
                    <span>{{ invoiceInfo.nsrjbxxVO.sh }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <label>注册地址：</label>
                    <span>{{ invoiceInfo.nsrjbxxVO.zcdz }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>经营地址：</label>
                    <span>{{ invoiceInfo.nsrjbxxVO.scjydz }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>企业类型：</label>
                    <span>{{ companyInfo.basic.enttype }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>行业：</label>
                    <span>{{ companyInfo.basic.industryphyname }} - {{ companyInfo.basic.industryconame }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <label>注册资金：</label>
                    <span>{{ companyInfo.basic.regcap }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>币种：</label>
                    <span>{{ companyInfo.basic.regcapcur }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>营业期限起：</label>
                    <span>{{ companyInfo.basic.opfrom }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>营业期限止：</label>
                    <span>{{ companyInfo.basic.opto }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <label>纳税信用评级：</label>
                    <span>{{ invoiceInfo.nsrjbxxVO.xydj }}</span>
                  </el-col>
                  <el-col :span="18">
                    <label>经营范围：</label>
                    <span>{{ companyInfo.basic.zsopscope }}</span>
                  </el-col>
                </el-row>
              </section>
            </div>
          </el-card>
          <el-card>
            <div slot="header">
              <h3>法人&股东信息</h3>
            </div>
            <div class="content">
              <section>
                <h5>法人信息</h5>
                <el-table
                  :data="companyInfo.persons"
                  class="common__table"
                  header-cell-class-name="table-head"
                  row-class-name="table-tr">
                  <el-table-column prop="pername" label="高管姓名"></el-table-column>
                  <el-table-column prop="position" label="高管职务"></el-table-column>
                </el-table>
              </section>
              <section>
                <h5>股东出资情况</h5>
                <el-table
                  :data="companyInfo.shareholders"
                  class="common__table"
                  header-cell-class-name="table-head"
                  row-class-name="table-tr">
                  <el-table-column prop="shaname" label="股东名称"></el-table-column>
                  <el-table-column prop="subconam" label="投资金额"></el-table-column>
                  <el-table-column prop="fundedratio" label="投资比例"></el-table-column>
                  <el-table-column prop="invtype" label="股东性质"></el-table-column>
                </el-table>
              </section>
              <section>
                <h5>企业变更信息</h5>
                <el-table
                  :data="companyInfo.alters"
                  class="common__table"
                  header-cell-class-name="table-head"
                  row-class-name="table-tr">
                  <el-table-column type="index" width="50" label=" "></el-table-column>
                  <el-table-column prop="altitem" label="变更事项"></el-table-column>
                  <el-table-column prop="altbe" label="变更前内容"></el-table-column>
                  <el-table-column prop="altaf" label="变更后内容"></el-table-column>
                  <el-table-column prop="altdate" label="变更日期"></el-table-column>
                </el-table>
              </section>
            </div>
          </el-card>
          <el-card class="base-info">
            <div slot="header">
              <h3>企业纳税征收基本信息</h3>
            </div>
            <div class="content">
              <section>
                <el-row>
                  <el-col :span="6">
                    <span>最近一次增值税实缴距今月份数：</span>
                    <span>{{ lastMonth("skssqZ", "增值税") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>最近一次企业所得税实缴距今月份数：</span>
                    <span>{{ lastMonth("skssqZ", "企业所得税") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>最近一次增值税申报距今月份数：</span>
                    <span>{{ lastMonth("sssqZ", "增值税") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>最近一次企业所得税申报距今月份数：</span>
                    <span>{{ lastMonth("sssqZ", "企业所得税") }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <span>最近3个月销售额：</span>
                    <span>{{ lastXSE(3) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>最近6个月销售额：</span>
                    <span>{{ lastXSE(6) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>最近12个月销售额：</span>
                    <span>{{ lastXSE(12) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>最近24个月销售额：</span>
                    <span>{{ lastXSE(24) }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <span>最近3个月缴纳所得税金额：</span>
                    <span>{{ lastSDS(3) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>最近6个月缴纳所得税金额：</span>
                    <span>{{ lastSDS(6) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>最近12个月缴纳所得税金额：</span>
                    <span>{{ lastSDS(12) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>最近24个月缴纳所得税金额：</span>
                    <span>{{ lastSDS(24) }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <span>最近3个月缴纳增值税金额：</span>
                    <span>{{ lastZZS(3) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>最近6个月缴纳增值税金额：</span>
                    <span>{{ lastZZS(6) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>最近12个月缴纳增值税金额：</span>
                    <span>{{ lastZZS(12) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>最近24个月缴纳增值税金额：</span>
                    <span>{{ lastZZS(24) }}</span>
                  </el-col>
                </el-row>
              </section>
            </div>
          </el-card>
          <el-card class="base-info">
            <div slot="header">
              <h3>企业纳税征收明细信息</h3>
            </div>
            <div class="content">
              <section>
                <h5>增值税征收明细</h5>
                <el-table
                  :data="zzs"
                  class="common__table"
                  header-cell-class-name="table-head"
                  row-class-name="table-tr">
                  <el-table-column prop="skssqQ" label="税款所属期起"></el-table-column>
                  <el-table-column prop="skssqZ" label="税款所属期止"></el-table-column>
                  <el-table-column prop="zsxmmc" label="征收项目名称"></el-table-column>
                  <el-table-column prop="zspmmc" label="征收品目名称"></el-table-column>
                  <el-table-column prop="skzl" label="税款种类名称"></el-table-column>
                  <el-table-column prop="sksx" label="税款属性名称"></el-table-column>
                  <el-table-column prop="je" label="扣款金额"></el-table-column>
                </el-table>
              </section>
              <section>
                <h5>企业所得税征收明细</h5>
                <el-table
                  :data="qys"
                  class="common__table"
                  header-cell-class-name="table-head"
                  row-class-name="table-tr">
                  <el-table-column prop="skssqQ" label="税款所属期起"></el-table-column>
                  <el-table-column prop="skssqZ" label="税款所属期止"></el-table-column>
                  <el-table-column prop="zsxmmc" label="征收项目名称"></el-table-column>
                  <el-table-column prop="zspmmc" label="征收品目名称"></el-table-column>
                  <el-table-column prop="skzl" label="税款种类名称"></el-table-column>
                  <el-table-column prop="sksx" label="税款属性名称"></el-table-column>
                  <el-table-column prop="je" label="扣款金额"></el-table-column>
                </el-table>
              </section>
              <section>
                <h5>企业销售额明细</h5>
                <el-table
                  :data="invoiceInfo.xseList"
                  class="common__table"
                  header-cell-class-name="table-head"
                  row-class-name="table-tr">
                  <el-table-column prop="sssqQ" label="所属期起"></el-table-column>
                  <el-table-column prop="sssqZ" label="所属期止"></el-table-column>
                  <el-table-column prop="xse" label="销售额"></el-table-column>
                </el-table>
              </section>
            </div>
          </el-card>
          <el-card class="base-info">
            <div slot="header">
              <h3>企业利润表明细信息</h3>
            </div>
            <div class="content">
              <section>
                <el-table
                  :data="qylr"
                  class="common__table"
                  header-cell-class-name="table-head"
                  row-class-name="table-tr">
                  <el-table-column prop="year" label="年度"></el-table-column>
                  <el-table-column prop="yysr" label="营业收入"></el-table-column>
                  <el-table-column prop="yycb" label="营业成本"></el-table-column>
                  <el-table-column prop="mlr" label="毛利润"></el-table-column>
                  <el-table-column prop="mll" label="毛利率"></el-table-column>
                  <el-table-column prop="jlr" label="净利润"></el-table-column>
                  <el-table-column prop="jll" label="净利率"></el-table-column>
                </el-table>
              </section>
            </div>
          </el-card>
          <el-card class="base-info">
            <div slot="header">
              <h3>企业资产负债表明细信息</h3>
            </div>
            <div class="content">
              <section>
                <el-table
                  :data="fzlr"
                  class="common__table"
                  header-cell-class-name="table-head"
                  row-class-name="table-tr">
                  <el-table-column prop="year" label="年度"></el-table-column>
                  <el-table-column prop="yszs" label="应收账款"></el-table-column>
                  <el-table-column prop="ldzchj" label="流动资产合计"></el-table-column>
                  <el-table-column prop="fldzchj" label="非流动资产合计"></el-table-column>
                  <el-table-column prop="zczj" label="资产总计"></el-table-column>
                  <el-table-column prop="ldfzhj" label="流动负债合计"></el-table-column>
                  <el-table-column prop="fzhj" label="负债合计"></el-table-column>
                  <el-table-column prop="syzhj" label="所有者权益（或股东权益）合计"></el-table-column>
                  <el-table-column prop="fzhzj" label="负债和所有者权益（或股东权益）总计"></el-table-column>
                </el-table>
              </section>
            </div>
          </el-card>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import api from "./js/server/server";
export default {
  data() {
    return {
      createdDate: '',
      companyInfo: {
        basic: {}
      },
      invoiceInfo: {
        nsrjbxxVO: {}
      }
    };
  },
  computed: {
    zzs() {
      let list = this.invoiceInfo.jkxxList || [];
      return list.filter(item => item.zsxmmc === "增值税").sort((a, b) => {
        if (a.skssqZ < b.skssqZ) {
          return 1;
        } else {
          return -1;
        }
      });
    },
    qys() {
      let list = this.invoiceInfo.jkxxList || [];
      return list.filter(item => item.zsxmmc === "企业所得税").sort((a, b) => {
        if (a.skssqZ < b.skssqZ) {
          return 1;
        } else {
          return -1;
        }
      });
    },
    qylr() {
      let list = this.invoiceInfo.cwbbList || [];
      let arr = [];
      list.forEach((item) => {
        let obj = { year: item.year };
        item.lrb.forEach((it) => {
          let dict = {
            yysr: "一、营业收入",
            yycb: "减：营业成本",
            jlr: "四、净利润（净亏损以“-”号填列）"
          };
          for (let k in dict) {
            if (it.xm.replace(/\s+/g, "") === dict[k]) {
              obj[k] = it.bnljs;
            }
          }
          obj.mlr = (obj.yysr - obj.yycb).toFixed(2);
          obj.mll = ((obj.yysr - obj.yycb) / obj.yysr).toFixed(2);
          obj.jll = (obj.jlr / obj.yysr).toFixed(2);
        });
        arr.push(obj);
      });
      return arr.sort((a, b) => {
        if (a.year > b.year) {
          return -1;
        } else {
          return 1;
        }
        // return a.year > b.year;
      });
    },
    fzlr() {
      let list = this.invoiceInfo.cwbbList || [];
      let arr = [];
      list.forEach((item) => {
        let obj = { year: item.year };
        item.zcfzb.forEach((it) => {
          let dict = {
            yszs: "应收帐款",
            ldzchj: "流动资产合计",
            fldzchj: "非流动资产合计",
            zczj: "资产总计",
            ldfzhj: "流动负债合计",
            fzhj: "负债合计",
            syzhj: "所有者权益（或股东权益）合计",
            fzhzj: "负债和所有者权益（或股东权益）总计"
          };
          for (let k in dict) {
            if (it.xm.replace(/\s+/g, "") === dict[k]) {
              obj[k] = it.qms;
            }
          }
        });
        arr.push(obj);
      });
      return arr.sort((a, b) => {
        if (a.year > b.year) {
          return -1;
        } else {
          return 1;
        }
        // return a.year > b.year;
      });
    }
  },
  methods: {
    getTdm(key) {
      let dict = {
        "01": "受理",
        "02": "筹建期",
        "03": "正常",
        "04": "停业",
        "05": "非正常",
        "06": "清算",
        "07": "注销",
        "08": "非正常户注销",
        "09": "报验",
        "10": "核销报验",
        "11": "中断缴费",
        "12": "恢复缴费",
        "13": "简易注销无异议",
        "99": "其他"
      };
      if (key) {
        return dict[key];
      } else {
        return "";
      }
    },
    lastMonth(key, title) {
      let list;
      switch (key) {
        case 'skssqZ':
          list = this.invoiceInfo.jkxxList || [];
          break;
        case 'sssqZ':
          list = this.invoiceInfo.sbxxList || [];
          break;
      }
      if (list) {
        list = list.filter(item => item.zsxmmc === title).sort((a, b) => {
          if (a[key] > b[key]) {
            return -1;
          } else {
            return 1;
          }
        });
        if (list && list.length > 0) {
          let date = list[0][key];
          if (date > this.createdDate) {
            return -9999;
          } else {
            let dateYear = date.split("-")[0];
            let dateMonth = date.split("-")[1];
            let createYear = this.createdDate.split("-")[0];
            let createMonth = this.createdDate.split("-")[1];
            return (createYear - dateYear) * 12 + (createMonth - dateMonth);
          }
        }
      }
    },
    lastXSE(num) {
      let list = this.invoiceInfo.xseList;
      let sum = 0;
      if (list && list.length > 0) {
        let createYear = this.createdDate.split("-")[0];
        let createMonth = this.createdDate.split("-")[1];
        list.forEach((item) => {
          let date = item.sssqQ;
          let dateYear = date.split("-")[0];
          let dateMonth = date.split("-")[1];
          let month = (createYear - dateYear) * 12 + (createMonth - dateMonth);
          if (month >= 0 && month <= num) {
            sum += item.xse;
          }
        });
      }
      return sum.toFixed(2);
    },
    lastSDS(num) {
      let list = this.invoiceInfo.jkxxList;
      let sum = 0;
      if (list && list.length > 0) {
        let createYear = this.createdDate.split("-")[0];
        let createMonth = this.createdDate.split("-")[1];
        list.forEach((item) => {
          if (item.zsxmmc === "企业所得税") {
            let q = item.skssqQ;
            let z = item.skssqZ;
            let qMonth = q.split("-")[1];
            let zMonth = z.split("-")[1];
            let a = {};
            if (qMonth === "01" && zMonth === "12") {
              a = {
                year: q.split("-")[0] - 0 + 1,
                month: "05"
              };
            } else {
              let year = q.split("-")[0];
              let month = zMonth - 0 + 1;
              if (zMonth === "12") {
                year = year - 0 + 1;
                month = "01";
              }
              a = {
                year,
                month
              };
            }
            let month = (createYear - a.year) * 12 + (createMonth - a.month);
            if (month >= 0 && month <= num) {
              sum += item.je;
            }
          }
        });
      }
      return sum.toFixed(2);
    },
    lastZZS(num) {
      let list = this.invoiceInfo.jkxxList;
      let sum = 0;
      if (list && list.length > 0) {
        let createYear = this.createdDate.split("-")[0];
        let createMonth = this.createdDate.split("-")[1];
        list.forEach((item) => {
          if (item.zsxmmc === "增值税") {
            let date = item.skssqZ;
            let dateYear = date.split("-")[0];
            let dateMonth = date.split("-")[1];
            let month = (createYear - dateYear) * 12 + (createMonth - dateMonth);
            if (month >= 0 && month <= num) {
              sum += item.je;
            }
          }
        });
      }
      return sum.toFixed(2);
    }
  },
  created() {
    let applicationId = this.$route.query.applicationId;
    this.$MyFetch.post(`${api.channel}/SJZS/invoice/${applicationId}`)
    .then((data) => {
      this.createdDate = data.createdDate;
      this.companyInfo = data.companyInfo;
      data.invoiceInfo.xseList = data.invoiceInfo.xseList.sort((a, b) => {
        if (a.sssqZ < b.sssqZ) {
          return 1;
        } else {
          return -1;
        }
      });
      this.invoiceInfo = data.invoiceInfo;
    })
    .catch((e) => {
      this.$error(e.message);
    });
  }
};
</script>

<style lang="less" scoped>
  .invoice {
    position: fixed;
    top: 60px;
    left: 0;
    width: 100%;
    height: calc(100% - 60px);
    background: #fff;
    z-index: 999;
  }
  .el-container {
    height: 100%;
  }
  .el-header {
    position: relative;
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 1.38px;
    color: #333333;
    background: #FFFFFF;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    z-index: 9;
  }
  .el-main {
    padding: 15px 15px 60px;
    background: #ececec;
  }
  .el-card {
    margin-top: 20px;
    &:first-child {
      margin-top: 0;
    }
    /deep/ .el-card__header {
      margin: 0 20px;
      padding: 20px 0;
    }
    section {
      padding: 20px 0;
      border-bottom: 1px solid #d0d0d0;
      &:first-child {
        padding-top: 0;
      }
      &:last-child {
        border-bottom: 0;
        padding-bottom: 0;
      }
    }
    h3 {
      position: relative;
      font-size: 16px;
      font-weight: 600;
      padding-left: 12px;
      color: #000;
      &:before {
        content: "";
        position: absolute;
        top: 50%;
        margin-top: -8px;
        left: 0;
        width: 2px;
        height: 16px;
        background: #538BF1;
      }
    }
    h5 {
      color: #000;
      margin-bottom: 12px;
    }
    .content {
      font-size: 14px;
      color: #151515;
      .el-row {
        margin-bottom: 14px;
        &:last-child {
          margin-bottom: 0;
        }
      }
      label {
        color: #999;
        white-space: nowrap;
      }
      .el-col {
        display: flex;
        padding-right: 10px;
      }
      label, span {
        display: block;
      }
    }
  }
  .base-info {
    .content {
      color: #666;
    }
  }
</style>
