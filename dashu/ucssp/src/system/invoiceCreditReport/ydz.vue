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
                    <span>{{ invoiceInfo.baseinfoVo.nsrmc }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>法人姓名：</label>
                    <span>{{ companyInfo.basic.frname }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>纳税人状态：</label>
                    <span>{{ getTdm(invoiceInfo.baseinfoVo.nsrztdm) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>纳税人识别号：</label>
                    <span>{{ invoiceInfo.baseinfoVo.nsrsbh }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <label>注册地址：</label>
                    <span>{{ invoiceInfo.baseinfoVo.zcdz }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>经营地址：</label>
                    <span>{{ invoiceInfo.baseinfoVo.scjydz }}</span>
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
                    <label>纳税类型：</label>
                    <span>{{ getTaxType(invoiceInfo.baseinfoVo.nsrzg) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>当前是否欠税：</label>
                    <span>{{ getTaxOwe(invoiceInfo.baseinfoVo.taxCurrPayUpSys) }}</span>
                  </el-col>
                  <el-col :span="12">
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
                  row-class-name="table-tr"
                >
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
                  row-class-name="table-tr"
                >
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
                  row-class-name="table-tr"
                >
                  <el-table-column type="index" width="50" label=" "></el-table-column>
                  <el-table-column prop="altitem" label="变更事项"></el-table-column>
                  <el-table-column prop="altbe" label="变更前内容"></el-table-column>
                  <el-table-column prop="altaf" label="变更后内容"></el-table-column>
                  <el-table-column prop="altdate" label="变更日期"></el-table-column>
                </el-table>
              </section>
              <section>
                <h5>纳税信用等级</h5>
                <el-table
                  :data="invoiceInfo.Rating"
                  class="common__table"
                  header-cell-class-name="table-head"
                  row-class-name="table-tr"
                >
                  <el-table-column prop="appraisal_year" label="评价年度"></el-table-column>
                  <el-table-column prop="evaluation_result" label="评价等级"></el-table-column>
                </el-table>
              </section>
              <section>
                <h5>企业税务违规违章信息</h5>
                <el-table
                  :data="invoiceInfo.Inspection"
                  class="common__table"
                  header-cell-class-name="table-head"
                  row-class-name="table-tr"
                >
                  <el-table-column type="index" width="50" label=" "></el-table-column>
                  <el-table-column prop="illegal_facts" label="违法事实"></el-table-column>
                  <el-table-column prop="r_data" label="登记日期"></el-table-column>
                  <el-table-column prop="start_at" label="所属期间起"></el-table-column>
                  <el-table-column prop="end_at" label="所属期间止"></el-table-column>
                  <el-table-column prop="status_tax_illegal" label="案件状态"></el-table-column>
                </el-table>
              </section>
            </div>
          </el-card>
          <el-card>
            <div slot="header">
              <h3>企业纳税征收基本信息</h3>
            </div>
            <div class="content">
              <section>
                <el-row>
                  <el-col :span="6">
                    <label>最近一次增值税实缴距今月份数：</label>
                    <span>{{ blazeVaris.zZSSJMthLast }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>最近一次企业所得税实缴距今月份数：</label>
                    <span>{{ blazeVaris.qSDSSJMthLast }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>最近一次增值税申报距今月份数：</label>
                    <span>{{ blazeVaris.zZSJJMthLast }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>最近一次企业所得税申报距今月份数：</label>
                    <span>{{ blazeVaris.qSDSJJMthLast }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <label>最近12个月欠税月份数：</label>
                    <span>{{ blazeVaris.qSNL12 }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>最近12个月违法违规月份数：</label>
                    <span>{{ blazeVaris.wGMthL12 }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>最近12个月销售额：</label>
                    <span>{{ blazeVaris.l12MLowerAmt }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>最近24个月销售额：</label>
                    <span>{{ blazeVaris.l24MLowerAmt }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <label>最近3个月缴纳所得税金额：</label>
                    <span>{{ blazeVaris.taxSDL3MPayAmtSys }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>最近6个月缴纳所得税金额：</label>
                    <span>{{ blazeVaris.taxSDL6MPayAmtSys }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>最近12个月缴纳所得税金额：</label>
                    <span>{{ blazeVaris.taxSDL12MPayAmtSys }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>最近24个月缴纳所得税金额：</label>
                    <span>{{ blazeVaris.taxSDL24MPayAmtSys }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <label>最近3个月缴纳增值税金额：</label>
                    <span>{{ blazeVaris.taxZZL3MPayAmtSys }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>最近6个月缴纳增值税金额：</label>
                    <span>{{ blazeVaris.taxZZL6MPayAmtSys }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>最近12个月缴纳增值税金额：</label>
                    <span>{{ blazeVaris.taxZZL12MPayAmtSys }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>最近24个月缴纳增值税金额：</label>
                    <span>{{ blazeVaris.taxZZL24MPayAmtSys }}</span>
                  </el-col>
                </el-row>
              </section>
            </div>
          </el-card>
          <el-card>
            <div slot="header">
              <h3>企业纳税征收明细信息</h3>
            </div>
            <div class="content">
              <section>
                <h5>增值税征收明细</h5>
                <el-table
                  :data="invoiceInfo.zzs"
                  class="common__table"
                  header-cell-class-name="table-head"
                  row-class-name="table-tr"
                >
                  <el-table-column prop="skssqQ" label="所属期"></el-table-column>
                  <el-table-column prop="yzfsrq" label="缴款发生日期"></el-table-column>
                  <el-table-column prop="zspmmc" label="征收品目名称"></el-table-column>
                  <el-table-column prop="skzl" label="税款种类名称"></el-table-column>
                  <el-table-column prop="sksx" label="税款属性名称"></el-table-column>
                  <el-table-column prop="jsyj" label="计税金额（万元）"></el-table-column>
                  <el-table-column prop="ynse" label="应缴金额（万元）"></el-table-column>
                  <el-table-column prop="ybtse" label="实缴金额（万元）"></el-table-column>
                </el-table>
              </section>
              <section>
                <h5>企业所得税征收明细</h5>
                <el-table
                  :data="invoiceInfo.qysds"
                  class="common__table"
                  header-cell-class-name="table-head"
                  row-class-name="table-tr"
                >
                  <el-table-column prop="skssqQ" label="所属期"></el-table-column>
                  <el-table-column prop="yzfsrq" label="缴款发生日期"></el-table-column>
                  <el-table-column prop="zspmmc" label="征收品目名称"></el-table-column>
                  <el-table-column prop="skzl" label="税款种类名称"></el-table-column>
                  <el-table-column prop="sksx" label="税款属性名称"></el-table-column>
                  <el-table-column prop="jsyj" label="计税金额（万元）"></el-table-column>
                  <el-table-column prop="ynse" label="应缴金额（万元）"></el-table-column>
                  <el-table-column prop="ybtse" label="实缴金额（万元）"></el-table-column>
                </el-table>
              </section>
              <section>
                <h5>企业销售额明细</h5>
                <el-table
                  :data="invoiceInfo.xseList"
                  class="common__table"
                  header-cell-class-name="table-head"
                  row-class-name="table-tr"
                >
                  <el-table-column prop="sssqQ" label="所属期起"></el-table-column>
                  <el-table-column prop="sssqZ" label="所属期止"></el-table-column>
                  <el-table-column prop="xse" label="销售额"></el-table-column>
                </el-table>
              </section>
            </div>
          </el-card>
        </el-main>
      </el-container>
      <el-container>
        <el-header>企业发票明细信息</el-header>
        <el-main>
          <el-card class="base-info">
            <div class="content">
              <section>
                <h5>年度发票汇总数据</h5>
                <el-table
                  :data="invoiceInfo.qyfpxxList"
                  class="common__table"
                  header-cell-class-name="table-head"
                  row-class-name="table-tr"
                >
                  <el-table-column prop="nd" label="年度"></el-table-column>
                  <el-table-column prop="xsfSl" label="上游供应商数量（个）"></el-table-column>
                  <el-table-column prop="jyzsSy" label="上游供应商交易次数（次）"></el-table-column>
                  <el-table-column prop="jyjeSy" label="上游供应商交易金额（万元）"></el-table-column>
                  <el-table-column prop="gmfSl" label="下游经销商数量(个)"></el-table-column>
                  <el-table-column prop="jyzsXy" label="下游经销商交易次数(次)"></el-table-column>
                  <el-table-column prop="jyjeXy" label="下游经销商交易金额(万元)"></el-table-column>
                </el-table>
              </section>
              <section>
                <h5>最近一年Top10上游供应商</h5>
                <el-table
                  :data="list2top(invoiceInfo.ndQyfpsygysList)"
                  class="common__table"
                  header-cell-class-name="table-head"
                  row-class-name="table-tr"
                >
                  <el-table-column prop="nd" label="年度"></el-table-column>
                  <el-table-column prop="xsfMc" label="供应商名称"></el-table-column>
                  <el-table-column prop="jyje" label="交易金额(万元)"></el-table-column>
                  <el-table-column prop="zb" label="占比(%)"></el-table-column>
                  <el-table-column prop="jyzs" label="交易次数(次)"></el-table-column>
                </el-table>
              </section>
              <section>
                <h5>最近一年Top10上游原材料</h5>
                <el-table
                  :data="list2top(invoiceInfo.ndQyfpsyycList)"
                  class="common__table"
                  header-cell-class-name="table-head"
                  row-class-name="table-tr"
                >
                  <el-table-column prop="nd" label="年度"></el-table-column>
                  <el-table-column prop="yclmc" label="原材料名称"></el-table-column>
                  <el-table-column prop="jyje" label="交易金额(万元)"></el-table-column>
                  <el-table-column prop="zb" label="占比(%)"></el-table-column>
                  <el-table-column prop="jyzs" label="交易次数(次)"></el-table-column>
                </el-table>
              </section>
              <section>
                <h5>最近一年Top10下游经销商</h5>
                <el-table
                  :data="list2top(invoiceInfo.ndQyfpxyjxsList)"
                  class="common__table"
                  header-cell-class-name="table-head"
                  row-class-name="table-tr"
                >
                  <el-table-column prop="nd" label="年度"></el-table-column>
                  <el-table-column prop="gmfMc" label="供应商名称"></el-table-column>
                  <el-table-column prop="jyje" label="交易金额(万元)"></el-table-column>
                  <el-table-column prop="zb" label="占比(%)"></el-table-column>
                  <el-table-column prop="jyzs" label="交易次数(次)"></el-table-column>
                </el-table>
              </section>
              <section>
                <h5>最近一年Top10下游产品</h5>
                <el-table
                  :data="list2top(invoiceInfo.ndQyfpxycpList)"
                  class="common__table"
                  header-cell-class-name="table-head"
                  row-class-name="table-tr"
                >
                  <el-table-column prop="nd" label="年度"></el-table-column>
                  <el-table-column prop="cpMc" label="原材料名称"></el-table-column>
                  <el-table-column prop="jyje" label="交易金额(万元)"></el-table-column>
                  <el-table-column prop="zb" label="占比(%)"></el-table-column>
                  <el-table-column prop="jyzs" label="交易次数(次)"></el-table-column>
                </el-table>
              </section>
            </div>
          </el-card>
          <el-card>
            <div slot="header">
              <h3>企业利润表明细信息</h3>
            </div>
            <div class="content">
              <section>
                <el-table
                  :data="lrb"
                  class="common__table"
                  header-cell-class-name="table-head"
                  row-class-name="table-tr"
                >
                  <el-table-column prop="year" label="年度"></el-table-column>
                  <el-table-column prop="xh" label="序号"></el-table-column>
                  <el-table-column prop="xm" label="项目"></el-table-column>
                  <el-table-column prop="bnljs" label="本年累计数"></el-table-column>
                </el-table>
              </section>
            </div>
          </el-card>
          <el-card>
            <div slot="header">
              <h3>企业资产负债表明细信息</h3>
            </div>
            <div class="content">
              <section>
                <el-table
                  :data="zcfzb"
                  class="common__table"
                  header-cell-class-name="table-head"
                  row-class-name="table-tr"
                >
                  <el-table-column prop="year" label="年度"></el-table-column>
                  <el-table-column prop="xh" label="序号"></el-table-column>
                  <el-table-column prop="xm" label="项目"></el-table-column>
                  <el-table-column prop="qms" label="本年累计数"></el-table-column>
                </el-table>
              </section>
            </div>
          </el-card>
          <el-card>
            <div slot="header">
              <h3>企业现金流量表明细信息</h3>
            </div>
            <div class="content">
              <section>
                <el-table
                  :data="xjllb"
                  class="common__table"
                  header-cell-class-name="table-head"
                  row-class-name="table-tr"
                >
                  <el-table-column prop="year" label="年度"></el-table-column>
                  <el-table-column prop="xh" label="序号"></el-table-column>
                  <el-table-column prop="xm" label="项目"></el-table-column>
                  <el-table-column prop="qms" label="本年累计数"></el-table-column>
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
      companyInfo: {
        basic: {},
        persons: [],
        shareholders: [],
        alters: []
      }, // 基础工商信息
      invoiceInfo: {
        baseinfoVo: {},
        dsjrNszsxx: {}
      }, // 发票汇总信息
      blazeVaris: {},
      lrb: [],
      zcfzb: [],
      xjllb: [],
      channels: {
        YDZ: '易代账',
        ZWY: '账无忧',
        KYKOL: '客一客'
      }
    };
  },
  methods: {
    getTaxOwe(str) {
      let dict = {
        '0': '不欠税',
        '1': '欠税',
        '2': '其他/未知'
      };
      return dict[str];
    },
    getTaxType(str) {
      let dict = {
        '1': '一般纳税人',
        '2': '小规模',
        '3': '其他纳税人'
      };
      return dict[str];
    },
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
    list2top(list) {
      if (list && list.length > 0) {
        list = list.slice().sort((a, b) => {
          return b - a;
        });
        list = list[0];
        let records = list.record;
        let nd = list.nd;
        records.forEach(item => {
          item.nd = nd;
        });
        return records;
      } else {
        return [];
      }
    }
  },
  created() {
    let applicationId = this.$route.query.applicationId;
    let channel = this.$route.query.channel || "YDZ";
    this.$store.dispatch("setSystemName", this.channels[channel] + "企业税务征信报告");
    if (applicationId) {
      this.$MyFetch
        .post(`${api.channel}/${channel}/invoice/${applicationId}`)
        .then(data => {
          this.blazeVaris = data.blazeVaris;
          if (data.companyInfo.shareholders) {
            data.companyInfo.shareholders = data.companyInfo.shareholders.sort(
              (a, b) => {
                if (a.subconam > b.subconam) {
                  return -1;
                } else {
                  return 1;
                }
              }
            );
          }
          if (data.companyInfo.alters) {
            data.companyInfo.alters = data.companyInfo.alters.sort((a, b) => {
              if (a.altdate > b.altdate) {
                return -1;
              } else {
                return 1;
              }
            });
          }
          this.companyInfo = data.companyInfo;
          if (data.invoiceInfo.Rating) {
            data.invoiceInfo.Rating = data.invoiceInfo.Rating.sort((a, b) => {
              if (a.appraisal_year > b.appraisal_year) {
                return -1;
              } else {
                return 1;
              }
            });
          }
          if (data.invoiceInfo.Inspection) {
            data.invoiceInfo.Inspection = data.invoiceInfo.Inspection.sort((a, b) => {
              if (a.end_at > b.end_at) {
                return -1;
              } else {
                return 1;
              }
            });
          }
          if (data.invoiceInfo.jkxx) {
            data.invoiceInfo.zzs = data.invoiceInfo.jkxx.filter((item) => {
              return item.zsxmmc === "增值税";
            });
          }
          if (data.invoiceInfo.zzs) {
            data.invoiceInfo.zzs = data.invoiceInfo.zzs.sort((a, b) => {
              if (a.yzfsrq > b.yzfsrq) {
                return -1;
              } else {
                return 1;
              }
            });
          }
          if (data.invoiceInfo.jkxx) {
            data.invoiceInfo.qysds = data.invoiceInfo.jkxx.filter((item) => {
              return item.zsxmmc === "企业所得税";
            });
          }
          if (data.invoiceInfo.qysds) {
            data.invoiceInfo.qysds = data.invoiceInfo.qysds.sort((a, b) => {
              if (a.yzfsrq > b.yzfsrq) {
                return -1;
              } else {
                return 1;
              }
            });
          }
          if (data.invoiceInfo.xseList) {
            data.invoiceInfo.xseList = data.invoiceInfo.xseList.sort((a, b) => {
              if (a.sssqZ > b.sssqZ) {
                return -1;
              } else {
                return 1;
              }
            });
          }
          if (data.invoiceInfo.qyfpxxList) {
            data.invoiceInfo.qyfpxxList.forEach(item => {
              for (let key in item.record) {
                item[key] = item.record[key];
              }
            });
            data.invoiceInfo.qyfpxxList = data.invoiceInfo.qyfpxxList.sort((a, b) => {
              if (a.nd > b.nd) {
                return -1;
              } else {
                return 1;
              }
            });
          }
          let lrb = [];
          if (data.invoiceInfo.lrb) {
            data.invoiceInfo.lrb.forEach(item => {
              item.record.forEach((obj) => {
                obj.year = item.year;
                lrb.push(obj);
              });
            });
            lrb = lrb.sort(
              (a, b) => {
                if (a.year > b.year) {
                  return -1;
                } else {
                  return 1;
                }
              }
            );
          }
          this.lrb = lrb;
          let zcfzb = [];
          if (data.invoiceInfo.zcfzb) {
            data.invoiceInfo.zcfzb.forEach(item => {
              item.record.forEach((obj) => {
                obj.year = item.year;
                zcfzb.push(obj);
              });
            });
            zcfzb = zcfzb.sort(
              (a, b) => {
                if (a.year > b.year) {
                  return -1;
                } else {
                  return 1;
                }
              }
            );
          }
          this.zcfzb = zcfzb;
          let xjllb = [];
          if (data.invoiceInfo.xjllb) {
            data.invoiceInfo.xjllb.forEach(item => {
              item.record.forEach((obj) => {
                obj.year = item.year;
                xjllb.push(obj);
              });
            });
            xjllb = xjllb.sort(
              (a, b) => {
                if (a.year > b.year) {
                  return -1;
                } else {
                  return 1;
                }
              }
            );
          }
          this.xjllb = xjllb;
          if (data.invoiceInfo.qyfpxxList) {
            data.invoiceInfo.qyfpxxList = data.invoiceInfo.qyfpxxList.sort(
              (a, b) => {
                if (a.nd > b.nd) {
                  return -1;
                } else {
                  return 1;
                }
              }
            );
          }
          this.invoiceInfo = data.invoiceInfo;
        })
        .catch(e => {
          this.$error(e.message);
        });
    }
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
  overflow: auto;
}
.el-container {
  display: block;
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
  background: #ffffff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  z-index: 9;
}
.el-main {
  padding: 15px 15px 60px;
  background: #f9fafb;
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
    border-bottom: 1px solid #e5e5e5;
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
    color: #333;
    &:before {
      content: "";
      position: absolute;
      top: 50%;
      margin-top: -8px;
      left: 0;
      width: 2px;
      height: 16px;
      background: #538bf1;
    }
  }
  h5 {
    color: #333;
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
    label,
    span {
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
