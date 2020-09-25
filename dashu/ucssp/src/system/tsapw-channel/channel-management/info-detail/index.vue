<template>
  <div class="channel-manage">
    <el-page-header @back="goBack" content="渠道引流管理配置"></el-page-header>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h5>信贷</h5>
        <el-button type="primary" @click="saveLoan">保存</el-button>
      </div>
      <el-form
        :inline="true"
        label-width="100px"
        :model="form"
        :rules="loanRules"
        ref="loanForm"
        class="demo-form-inline">
        <el-form-item prop="channelName" label="一级渠道名称">
          <el-input
            v-model="form.channelName"
            @blur="changeChannelName"
            :disabled="disabled"
          ></el-input>
        </el-form-item>
        <el-form-item prop="channelNum" label="一级渠道编码">
          <el-input
            v-model="form.channelNum"
            @blur="changeChannelNum"
            :disabled="disabled"
          ></el-input>
        </el-form-item>
        <el-form-item prop="smsVariable" label="短信名称变量">
          <el-input
            v-model="form.smsVariable"
          ></el-input>
        </el-form-item>
        <el-form-item prop="emailVariable" label="报错业务邮箱">
          <el-input
            v-model="form.emailVariable"
          >
            <template slot="append">@dashuf.com</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="checkInvoiceDateInd" label="出账是否校验发票数据">
          <el-select v-model="form.checkInvoiceDateInd">
            <el-option :value="true" label="是"></el-option>
            <el-option :value="false" label="否"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="patchManager" label="审批补件联系人">
          <el-input
            v-model="form.patchManager"
          ></el-input>
        </el-form-item>
        <el-form-item prop="sendTBSMSInd" label="是否发送太保短信">
          <el-select v-model="form.sendTBSMSInd">
            <el-option :value="true" label="是"></el-option>
            <el-option :value="false" label="否"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h5>第三方接入平台</h5>
        <el-button type="primary" @click="saveThird">保存</el-button>
      </div>
      <el-form
        :inline="true"
        label-width="100px"
        :model="form"
        :rules="thirdRules"
        ref="thirdForm"
        class="demo-form-inline">
        <el-form-item prop="channelName" label="一级渠道名称">
          <el-input
            v-model="form.channelName"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item prop="channelNum" label="一级渠道编码">
          <el-input
            v-model="form.channelNum"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item prop="cooperationDate" label="合作开始日期">
          <el-date-picker v-model="form.cooperationDate" type="date" placeholder="请选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item prop="productList" label="产品">
          <el-select v-model="form.productList" multiple @change="changeProduct">
            <el-option v-for="product in productList" :key="product.id" :value="product.id" :label="product.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="contact" label="渠道联系人">
          <el-input
            v-model="form.contact"
          ></el-input>
        </el-form-item>
        <el-form-item prop="contactTel" label="渠道联系人手机">
          <el-input
            v-model="form.contactTel"
          ></el-input>
        </el-form-item>
        <el-row>
          <el-form-item prop="personProtocol" label="信息查询书变量" class="protoLine">
            <el-input
              type="textarea"
              v-model="form.personProtocol"
            ></el-input>
          </el-form-item>
        </el-row>
        <el-form-item prop="permission" label="合伙人权限">
          <el-select v-model="form.permission">
            <el-option value="OPENED" label="开"></el-option>
            <el-option value="CLOSED" label="关"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="password" label="合伙人平台密码">
          <el-input
            v-model="form.password"
            readonly
          ></el-input>
          <el-button class="inner-btn" @click="generatePass">生成</el-button>
        </el-form-item>
        <div class="link-generate">
          <label>首页链接</label>
          <el-input v-model="form.homeLink" readonly></el-input>
        </div>
        <div class="link-generate" v-for="(product, index) in productLinks" :key="index">
          <label>{{product.name}}链接</label>
          <el-input v-model="product.link" readonly></el-input>
        </div>
        <el-card>
          <div slot="header" class="clearfix">
            <h5>二级渠道</h5>
            <div class="operate">
              <el-button type="text" icon="el-icon-plus" @click="addSub"></el-button>
              <el-button type="text" icon="el-icon-minus" @click="delSub"></el-button>
            </div>
          </div>
          <el-card v-for="(item, index) in form.channelSubList" :key="index">
            <el-form-item :prop="'channelSubList.' + index + '.channelName'" :rules="{required: true, message: '请输入二级渠道名称', trigger: 'blur'}" label="二级渠道名称">
              <el-input
                v-model="item.channelName"
              ></el-input>
            </el-form-item>
            <el-form-item :prop="'channelSubList.' + index + '.channelNum'" :rules="{required: true, message: '请输入二级渠道编码', trigger: 'blur'}" label="二级渠道编码">
              <el-input
                v-model="item.channelNum"
                @input="changeSubChannelUrl(index)"
              ></el-input>
            </el-form-item>
            <el-form-item :prop="'channelSubList.' + index + '.status'" :rules="{required: true, message: '请选择进件状态', trigger: 'change'}" label="进件状态">
              <el-select v-model="item.status">
                <el-option value="OPENED" label="启用"></el-option>
                <el-option value="CLOSED" label="停用"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :prop="'channelSubList.' + index + '.contact'" :rules="{required: true, message: '请输入渠道联系人', trigger: 'blur'}" label="渠道联系人">
              <el-input
                v-model="item.contact"
              ></el-input>
            </el-form-item>
            <el-form-item :prop="'channelSubList.' + index + '.contactTel'" :rules="{required: true, message: '请输入渠道联系人手机', trigger: 'blur'}" label="渠道联系人手机">
              <el-input
                v-model="item.contactTel"
              ></el-input>
            </el-form-item>
            <el-form-item :prop="'channelSubList.' + index + '.permission'" :rules="{required: true, message: '请选择合伙人权限', trigger: 'change'}" label="合伙人权限">
              <el-select v-model="item.permission">
                <el-option value="OPENED" label="开"></el-option>
                <el-option value="CLOSED" label="关"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :prop="'channelSubList.' + index + '.password'" :rules="{required: true, message: '请输入合伙人平台密码', trigger: 'blur'}" label="合伙人平台密码">
              <el-input
                v-model="item.password"
                readonly
                ref="subpass"
              ></el-input>
              <el-button class="inner-btn" @click="generateSubPass(index)">生成</el-button>
            </el-form-item>
            <div class="link-generate">
              <label>首页链接</label>
              <el-input v-model="item.homeLink" readonly></el-input>
            </div>
            <div class="link-generate" v-for="(product, i) in productSubLinks[index]" :key="i">
              <label>{{product.name}}链接</label>
              <el-input v-model="product.link" readonly></el-input>
            </div>
          </el-card>
        </el-card>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h5>BLAZE前置</h5>
        <el-button type="primary" @click="saveBlaze">同步</el-button>
      </div>
      <el-form
        :inline="true"
        label-width="100px"
        :model="form"
        :rules="blazeRules"
        ref="blazeForm"
        class="demo-form-inline">
        <el-form-item prop="channelName" label="一级渠道名称">
          <el-input
            v-model="form.channelName"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item prop="channelNum" label="一级渠道编码">
          <el-input
            v-model="form.channelNum"
            disabled
          ></el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h5>融担</h5>
        <el-button type="primary" @click="saveEcn">同步</el-button>
      </div>
      <el-form
        :inline="true"
        label-width="100px"
        :model="form"
        :rules="ecnRules"
        ref="ecnForm"
        class="demo-form-inline">
        <el-form-item prop="channelName" label="一级渠道名称">
          <el-input
            v-model="form.channelName"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item prop="channelNum" label="一级渠道编码">
          <el-input
            v-model="form.channelNum"
            disabled
          ></el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h5>征信平台</h5>
        <el-button type="primary" @click="saveCredit">保存</el-button>
      </div>
      <el-form
        :inline="true"
        label-width="100px"
        :model="form"
        :rules="creditRules"
        ref="creditForm"
        class="demo-form-inline">
        <el-form-item prop="channelName" label="一级渠道名称">
          <el-input
            v-model="form.channelName"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item prop="channelNum" label="一级渠道编码">
          <el-input
            v-model="form.channelNum"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item prop="mode" label="合作模式">
          <el-select v-model="form.mode">
            <el-option :value="0" label="不区分"></el-option>
            <el-option value="DSRD" label="大数融担"></el-option>
            <el-option value="WHRS" label="武汉融生"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="originid" label="征信报告提供机构">
          <el-select v-model="form.originid">
            <el-option value="DSRD00001" label="大数担保"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h5>APP服务端</h5>
        <el-button type="primary" @click="saveApp">同步</el-button>
      </div>
      <el-form
        :inline="true"
        label-width="100px"
        :model="form"
        :rules="appRules"
        ref="appForm"
        class="demo-form-inline">
        <el-form-item prop="channelName" label="一级渠道名称">
          <el-input
            v-model="form.channelName"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item prop="channelNum" label="一级渠道编码">
          <el-input
            v-model="form.channelNum"
            disabled
          ></el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card credit-card">
      <div slot="header" class="clearfix">
        <h5>资金接入平台</h5>
        <el-button type="primary" @click="saveFund()" v-if="form.funds.length>0">保存</el-button>
      </div>
      <el-card class="box-card" v-for="(fund, index) in form.funds" :key="index">
        <el-form
          :inline="true"
          label-width="130px"
          :model="form"
          :rules="fundRules"
          ref="fundForm"
          class="demo-form-inline">
          <el-form-item prop="channelName" label="一级渠道名称">
            <el-input
              v-model="form.channelName"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item prop="channelNum" label="一级渠道编码">
            <el-input
              v-model="form.channelNum"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item :prop="'funds.'+index+'.topBusinessType'" :rules="{required: true, message: '请选择一级产品', trigger: 'blur'}" label="一级产品">
            <el-select v-model="fund.topBusinessType" disabled>
              <el-option v-for="product in primaryProduct" :key="product.code" :value="product.code" :label="product.name"></el-option>
            </el-select>
          </el-form-item>
          <div class="el-row">
            <el-form-item :prop="'funds.'+index+'.ZXN'">
              <el-checkbox v-model="fund.ZXN">振兴银行</el-checkbox>
            </el-form-item>
            <el-form-item :prop="'funds.'+index+'.ZXNtopBusinessType'" :rules="{validator: checkFund(fund.ZXN), tirgger: 'blur'}" label="topBusinessType">
              <el-input v-model="fund.ZXNtopBusinessType"></el-input>
            </el-form-item>
          </div>
          <div class="el-row">
            <el-form-item :prop="'funds.'+index+'.DYN'">
              <el-checkbox v-model="fund.DYN">东营银行</el-checkbox>
            </el-form-item>
            <el-form-item :prop="'funds.'+index+'.DYNTOPBUSINESSTYPE'" :rules="{validator: checkFund(fund.DYN), tirgger: 'blur'}" label="TOPBUSINESSTYPE">
              <el-input v-model="fund.DYNTOPBUSINESSTYPE"></el-input>
            </el-form-item>
            <el-form-item :prop="'funds.'+index+'.DYNCHANNLE'" :rules="{validator: checkFund(fund.DYN), tirgger: 'blur'}" label="CHANNLE">
              <el-input v-model="fund.DYNCHANNLE"></el-input>
            </el-form-item>
          </div>
          <div class="el-row">
            <el-form-item :prop="'funds.'+index+'.CZN'">
              <el-checkbox v-model="fund.CZN">稠州银行</el-checkbox>
            </el-form-item>
            <el-form-item :prop="'funds.'+index+'.CZNtopBusinessType'" :rules="{validator: checkFund(fund.CZN), tirgger: 'blur'}" label="topBusinessType">
              <el-input v-model="fund.CZNtopBusinessType"></el-input>
            </el-form-item>
            <el-form-item :prop="'funds.'+index+'.CZNproductId'" :rules="{validator: checkFund(fund.CZN), tirgger: 'blur'}" label="productId">
              <el-input v-model="fund.CZNproductId"></el-input>
            </el-form-item>
          </div>
          <div class="el-row">
            <el-form-item :prop="'funds.'+index+'.TPN'">
              <el-checkbox v-model="fund.TPN">太保-上海银行</el-checkbox>
            </el-form-item>
            <el-form-item :prop="'funds.'+index+'.TPNTOPBUSINESSTYPE'" :rules="{validator: checkFund(fund.TPN), tirgger: 'blur'}" label="TOPBUSINESSTYPE">
              <el-input v-model="fund.TPNTOPBUSINESSTYPE"></el-input>
            </el-form-item>
            <el-form-item :prop="'funds.'+index+'.TPNSCENEPARTY'" :rules="{validator: checkFund(fund.TPN), tirgger: 'blur'}" label="SCENEPARTY">
              <el-input v-model="fund.TPNSCENEPARTY"></el-input>
            </el-form-item>
          </div>
          <div class="el-row">
            <el-form-item :prop="'funds.'+index+'.DJX'">
              <el-checkbox v-model="fund.DJX">蝶金小贷</el-checkbox>
            </el-form-item>
            <el-form-item :prop="'funds.'+index+'.DJXcustomerChannel'" :rules="{validator: checkFund(fund.DJX), tirgger: 'blur'}" label="customerChannel">
              <el-input v-model="fund.DJXcustomerChannel"></el-input>
            </el-form-item>
          </div>
        </el-form>
      </el-card>
    </el-card>
  </div>
</template>
<script type="text/ecmascript-6">
import { partnerApi, loanApi, thirdApi, blazeApi, ecnApi, creditApi, appApi, fundApi } from '../../js/server';
export default {
  data() {
    return {
      loanEdit: false,
      blazeEdit: false,
      ecnEdit: false,
      creditEdit: false,
      appEdit: false,
      fundEdit: false,
      form: {
        links: [],
        funds: [],
        channelSubList: []
      },
      productLinks: [],
      productSubLinks: [],
      primaryProduct: [],
      productList: [],
      loanRules: {
        channelName: [{required: true, message: '请输入一级渠道名称', trigger: 'blur'}],
        channelNum: [{required: true, message: '请输入一级渠道编码', trigger: 'blur'}],
        smsVariable: [{required: true, message: '请输入短信名称变量', trigger: 'blur'}],
        emailVariable: [{required: true, message: '请输入报错业务邮箱', trigger: 'blur'}],
        checkInvoiceDateInd: [{required: true, message: '请选择出账是否校验发票数据', trigger: 'change'}],
        patchManager: [{required: true, message: '请输入审批补件联系人', trigger: 'blur'}],
        sendTBSMSInd: [{required: true, message: '请选择是否发送太保短信', trigger: 'change'}]
      },
      thirdRules: {
        channelName: [{required: true, message: '请输入一级渠道名称', trigger: 'blur'}],
        channelNum: [{required: true, message: '请输入一级渠道编码', trigger: 'blur'}],
        cooperationDate: [{required: true, message: '请选择合作开始日期', trigger: 'change'}],
        productList: [{required: true, message: '请选择产品', trigger: 'change'}],
        contact: [{required: true, message: '请输入渠道联系人', trigger: 'blur'}],
        contactTel: [{required: true, message: '请输入渠道联系人手机', trigger: 'blur'}],
        personProtocol: [{required: true, message: '请输入信息查询书变量', trigger: 'blur'}],
        permission: [{required: true, message: '请选择合伙人权限', trigger: 'change'}],
        password: [{required: true, message: '请生成合伙人平台密码', trigger: 'blur'}]
      },
      blazeRules: {
        channelName: [{required: true, message: '请输入一级渠道名称', trigger: 'blur'}],
        channelNum: [{required: true, message: '请输入一级渠道编码', trigger: 'blur'}]
      },
      ecnRules: {
        channelName: [{required: true, message: '请输入一级渠道名称', trigger: 'blur'}],
        channelNum: [{required: true, message: '请输入一级渠道编码', trigger: 'blur'}]
      },
      creditRules: {
        channelName: [{required: true, message: '请输入一级渠道名称', trigger: 'blur'}],
        channelNum: [{required: true, message: '请输入一级渠道编码', trigger: 'blur'}],
        mode: [{required: true, message: '请选择合作模式', trigger: 'change'}],
        originid: [{required: true, message: '请选择征信报告提供机构', trigger: 'change'}]
      },
      appRules: {
        channelName: [{required: true, message: '请输入一级渠道名称', trigger: 'blur'}],
        channelNum: [{required: true, message: '请输入一级渠道编码', trigger: 'blur'}]
      },
      fundRules: {
        channelName: [{required: true, message: '请输入一级渠道名称', trigger: 'blur'}],
        channelNum: [{required: true, message: '请输入一级渠道编码', trigger: 'blur'}]
      }
    };
  },
  computed: {
    disabled() {
      return !!this.$route.query.id;
    }
  },
  async created() {
    await this.getDictPrimaryProduct();
    await this.getProducts();
    if (this.$route.query.channelNum) {
      Object.assign(this.form, {
        channelNum: this.$route.query.channelNum,
        channelName: this.$route.query.channelName
      });
      this.getLoan();
      if (this.$route.query.id) {
        this.getThird();
      }
      this.getCredit();
    }
  },
  methods: {
    generateSubPass(index) {
      let password = "";
      for (let i = 0; i < 6; i++) {
        password += Math.floor(Math.random() * 10);
      }
      let obj = this.form.channelSubList[index];
      obj.password = password;
      this.form.channelSubList.splice(index, 1, obj);
      this.$nextTick(() => {
        let input = this.$refs.subpass[index];
        input.focus();
        input.blur();
      });
    },
    generatePass() {
      let password = "";
      for (let i = 0; i < 6; i++) {
        password += Math.floor(Math.random() * 10);
      }
      this.$set(this.form, "password", password);
      this.$refs.thirdForm.clearValidate("password");
    },
    changeChannelName() {
      if (this.form.channelName) {
        this.$refs.thirdForm.clearValidate("channelName");
        this.$refs.blazeForm.clearValidate("channelName");
        this.$refs.ecnForm.clearValidate("channelName");
        this.$refs.creditForm.clearValidate("channelName");
        this.$refs.appForm.clearValidate("channelName");
        if (this.$refs.fundForm) {
          this.$refs.fundForm.forEach((form) => {
            form.clearValidate("channelName");
          });
        }
      }
    },
    changeChannelNum() {
      if (this.form.channelNum) {
        this.$refs.thirdForm.clearValidate("channelNum");
        this.$refs.blazeForm.clearValidate("channelNum");
        this.$refs.ecnForm.clearValidate("channelNum");
        this.$refs.creditForm.clearValidate("channelNum");
        this.$refs.appForm.clearValidate("channelNum");
        if (this.$refs.fundForm) {
          this.$refs.fundForm.forEach((form) => {
            form.clearValidate("channelNum");
          });
        }
      }
      this.changeChannelUrl();
    },
    changeChannelUrl() {
      if (this.form.channelNum) {
        let homeLink = location.href.split("#")[0].replace("ucssp", "tsapw") + "#/index?channelNum=" + this.form.channelNum;
        this.$set(this.form, "homeLink", homeLink);
        let productLinks = [];
        this.form.productList.forEach((product) => {
          this.productList.forEach((pro) => {
            let link = location.href.split("#")[0].replace("ucssp", "tsapw") + "#/product?channelNum=" + this.form.channelNum + "&siteProductId=" + product;
            if (product === pro.id) {
              this.primaryProduct.forEach((item) => {
                if (pro.primaryProductCode === item.code) {
                  productLinks.push({
                    name: item.name,
                    link
                  });
                }
              });
            }
          });
        });
        this.productLinks = productLinks;
      } else {
        this.$set(this.form, "homeLink", "");
        this.productLinks = [];
      }
      this.form.channelSubList.forEach((item, index) => {
        this.changeSubChannelUrl(index);
      });
    },
    changeSubChannelUrl(index) {
      if (this.form.channelSubList[index].channelNum) {
        let channelNum = this.form.channelSubList[index].channelNum;
        let homeLink = location.href.split("#")[0].replace("ucssp", "tsapw") + "#/index?channelNum=" + this.form.channelNum + "&channelSubNum=" + channelNum;
        let obj = this.form.channelSubList[index];
        obj.homeLink = homeLink;
        let productSubLinks = [];
        this.form.productList.forEach((product) => {
          this.productList.forEach((pro) => {
            let link = location.href.split("#")[0].replace("ucssp", "tsapw") + "#/product?channelNum=" + this.form.channelNum + "&channelSubNum=" + channelNum + "&siteProductId=" + product;
            if (product === pro.id) {
              this.primaryProduct.forEach((item) => {
                if (pro.primaryProductCode === item.code) {
                  productSubLinks.push({
                    name: item.name,
                    link
                  });
                }
              });
            }
          });
        });
        this.productSubLinks.splice(index, 1, productSubLinks);
      } else {
        let obj = this.form.channelSubList[index];
        obj.homeLink = "";
        this.productSubLinks.splice(index, 1, []);
      }
    },
    checkFund(val) {
      return (rule, value, callback) => {
        if (val && !value) {
          callback(new Error('请输入该字段'));
        }
        callback();
      };
    },
    getProducts() {
      return this.$MyFetch.get(partnerApi.products + "/list")
      .then((data = {}) => {
        this.productList = data;
        this.$refs.thirdForm.clearValidate("productList");
      })
      .catch((err) => {
        this.$error(err.message);
      });
    },
    getDictPrimaryProduct() {
      return this.$MyFetch.get(partnerApi.dictPrimaryProduct)
      .then((data = {}) => {
        this.primaryProduct = data;
      })
      .catch((err) => {
        this.$error(err.message);
      });
    },
    goBack() {
      this.$router.go(-1);
    },
    addSub() {
      if (!this.form.channelSubList) {
        this.form.channelSubList.push({
          links: []
        });
      } else {
        this.form.channelSubList.push({
          links: []
        });
      }
    },
    delSub() {
      this.form.channelSubList.pop();
      this.productSubLinks.pop();
    },
    changeProduct() {
      this.changeChannelUrl();
      this.form.funds = [];
      this.form.productList.forEach((item) => {
        this.productList.forEach((product) => {
          if (item === product.id) {
            this.form.funds.push({
              topBusinessType: product.primaryProductCode
            });
          }
        });
      });
    },
    getLoan() {
      this.$MyFetch.get(`${loanApi.getChannel}/${this.form.channelNum.toUpperCase()}`).then((data) => {
        Object.assign(this.form, {
          smsVariable: data.smsVariable,
          emailVariable: data.emailVariable,
          patchManager: data.patchManager,
          checkInvoiceDateInd: data.checkInvoiceDateInd,
          sendTBSMSInd: data.sendTBSMSInd
        });
        this.form = JSON.parse(JSON.stringify(this.form));
        this.loanEdit = true;
      }).catch((err) => {
        if (err.code !== "CPMS000834") {
          this.$error(err.message);
        }
      });
    },
    getThird() {
      this.$MyFetch.get(`${thirdApi.getChannel}/${this.$route.query.id}`).then((data) => {
        data.channelSubList.forEach((item) => {
          item.links = [];
          this.primaryProduct.forEach((product) => {
            item.links.push("");
          });
        });
        let products = [];
        data.siteProductList.forEach((product) => {
          products.push(product.id);
        });
        this.form.productList = products;
        Object.assign(this.form, data);
        this.form = JSON.parse(JSON.stringify(this.form));

        this.changeChannelUrl();
        data.channelSubList.forEach((item, index) => {
          this.changeSubChannelUrl(index);
        });

        let topBusinessType = [];
        data.siteProductList.forEach((product) => {
          topBusinessType.push(product.primaryProductCode);
        });
        this.getFund(topBusinessType.join(";"));
      }).catch((err) => {
        this.$error(err.message);
      });
    },
    getCredit() {
      this.$MyFetch.post(creditApi.getChannel, {
        channelName: this.form.channelName,
        channel: this.form.channelNum
      }).then((data) => {
        if (data.mode !== "DSRD" && data.mode !== "WHRS") {
          data.mode = 0;
        }
        Object.assign(this.form, {
          mode: data.mode,
          originid: data.originid,
          serialNo: data.serialNo
        });
        this.form = JSON.parse(JSON.stringify(this.form));
        this.creditEdit = true;
      }).catch((err) => {
        if (err.code !== "201") {
          this.$error(err.message);
        }
      });
    },
    getFund(topBusinessType) {
      this.$MyFetch.post(fundApi.getChannel, {
        channleCode: this.form.channelNum,
        topBusinessType
      }).then((data) => {
        data.configList.forEach((config) => {
          let obj = {
            topBusinessType: config.topBusinessType
          };
          config.fieldList.forEach((field) => {
            obj[field.bankCode] = true;
            obj[field.bankCode + field.fieldName] = field.fieldValue;
          });
          this.form.funds.push(obj);
        });
        this.form = JSON.parse(JSON.stringify(this.form));
      }).catch((err) => {
        this.$error(err.message);
      });
    },
    saveLoan() {
      this.$refs.loanForm.validate((valid) => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          let api = loanApi.addChannel;
          if (this.loanEdit) {
            api = loanApi.updateChannel;
          }
          this.$MyFetch.post(api, {
            businessSourceCode: this.form.channelNum.toUpperCase(),
            businessSourceName: this.form.channelName,
            smsVariable: this.form.smsVariable,
            emailVariable: this.form.emailVariable,
            patchManager: this.form.patchManager,
            checkInvoiceDateInd: this.form.checkInvoiceDateInd,
            sendTBSMSInd: this.form.sendTBSMSInd
          }).then((data) => {
            loading.close();
            this.$message.success("信贷保存成功！");
          }).catch((err) => {
            loading.close();
            this.$error(err.message);
          });
        }
      });
    },
    saveThird() {
      let data = {
        channelNum: this.form.channelNum,
        channelName: this.form.channelName,
        permission: this.form.permission,
        cooperationDate: this.form.cooperationDate,
        contact: this.form.contact,
        contactTel: this.form.contactTel,
        password: this.form.password,
        personProtocol: this.form.personProtocol,
        productList: this.form.productList,
        channelSubList: this.form.channelSubList
      };
      let method = "post";
      if (this.$route.query.id) {
        data.id = this.$route.query.id;
        method = "put";
      }
      this.$refs.thirdForm.validate((valid) => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          this.$MyFetch[method](thirdApi.addChannel, data).then((data) => {
            loading.close();
            this.$message.success("第三方接入平台保存成功！");
          }).catch((err) => {
            loading.close();
            this.$error(err.message);
          });
        }
      });
    },
    saveBlaze() {
      this.$refs.blazeForm.validate((valid) => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          this.$MyFetch.post(blazeApi.addChannel, {
            channelCode: this.form.channelNum,
            channelName: this.form.channelName
          }).then((data) => {
            loading.close();
            this.$message.success("BLAZE前置同步成功！");
          }).catch((err) => {
            loading.close();
            this.$error(err.message);
          });
        }
      });
    },
    saveEcn() {
      this.$refs.ecnForm.validate((valid) => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          this.$MyFetch.post(ecnApi.addChannel, {
            channelCode: this.form.channelNum,
            channelName: this.form.channelName,
            processCode: this.$route.query.id ? "02" : "01"
          }).then((data) => {
            loading.close();
            this.$message.success("融担同步成功！");
          }).catch((err) => {
            loading.close();
            this.$error(err.message);
          });
        }
      });
    },
    saveCredit() {
      this.$refs.creditForm.validate((valid) => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          let api = creditApi.addChannel;
          let mode = this.form.mode;
          if (mode === 0) {
            mode = this.form.channelNum;
          }
          let data = {
            channel: this.form.channelNum,
            channelName: this.form.channelName,
            mode,
            originid: this.form.originid
          };
          if (this.creditEdit) {
            api = creditApi.updateChannel;
            data.serialNo = this.form.serialNo;
          }
          this.$MyFetch.post(api, data).then((data) => {
            loading.close();
            this.$message.success("征信平台保存成功！");
          }).catch((err) => {
            loading.close();
            this.$error(err.message);
          });
        }
      });
    },
    saveApp() {
      this.$refs.appForm.validate((valid) => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          let data = {
            channelSource: this.form.channelNum,
            channelName: this.form.channelName
          };
          if (this.form.appId) {
            data.id = this.form.appId;
          }
          this.$MyFetch.get(appApi.addChannel, data).then((data) => {
            loading.close();
            this.$message.success("APP服务端同步成功！");
          }).catch((err) => {
            loading.close();
            this.$error(err.message);
          });
        }
      });
    },
    saveFundPromise(data) {
      return new Promise((resolve, reject) => {
        this.$MyFetch.post(fundApi.addChannel, data).then((data) => {
          resolve();
        }).catch((err) => {
          reject(err);
        });
      });
    },
    generateConfigList(fund) {
      let configList = [];
      if (fund.ZXN) {
        configList.push({
          bankCode: "ZXN",
          fieldName: "topBusinessType",
          fieldValue: fund.ZXNtopBusinessType
        });
      }
      if (fund.DYN) {
        configList.push({
          bankCode: "DYN",
          fieldName: "TOPBUSINESSTYPE",
          fieldValue: fund.DYNTOPBUSINESSTYPE
        }, {
          bankCode: "DYN",
          fieldName: "CHANNLE",
          fieldValue: fund.DYNCHANNLE
        });
      }
      if (fund.CZN) {
        configList.push({
          bankCode: "CZN",
          fieldName: "productId",
          fieldValue: fund.CZNproductId
        }, {
          bankCode: "CZN",
          fieldName: "topBusinessType",
          fieldValue: fund.CZNtopBusinessType
        });
      }
      if (fund.TPN) {
        configList.push({
          bankCode: "TPN",
          fieldName: "TOPBUSINESSTYPE",
          fieldValue: fund.TPNTOPBUSINESSTYPE
        }, {
          bankCode: "TPN",
          fieldName: "SCENEPARTY",
          fieldValue: fund.TPNSCENEPARTY
        });
      }
      if (fund.DJX) {
        configList.push({
          bankCode: "DJX",
          fieldName: "customerChannel",
          fieldValue: fund.DJXcustomerChannel
        });
      }
      return configList;
    },
    async saveFund() {
      let isValid = true;
      this.form.funds.forEach((fund, index) => {
        this.$refs.fundForm[index].validate((valid) => {
          if (!valid) {
            isValid = false;
          }
        });
      });
      if (isValid) {
        let loading;
        let isError = false;
        for (let i = 0; i < this.form.funds.length; i++) {
          let configList = this.generateConfigList(this.form.funds[i]);
          if (configList.length === 0) {
            isError = true;
          }
        }
        if (isError) {
          this.$message.error("请至少勾选一个银行输入");
          return;
        }
        for (let i = 0; i < this.form.funds.length; i++) {
          let configList = this.generateConfigList(this.form.funds[i]);
          let data = {
            channleCode: this.form.channelNum,
            topBusinessType: this.form.funds[i].topBusinessType,
            data: {
              configList
            }
          };
          loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          try {
            await this.saveFundPromise(data);
          } catch (err) {
            isError = true;
            this.$error(err.message);
          }
        }
        loading.close();
        if (!isError) {
          this.$message.success("资金接入平台保存成功！");
        }
      }
    }
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
.channel-manage {
  position: relative;
  min-height: 820px;
  .boxShadow(0,0);
  padding: 20px 31px;
  .el-card {
    margin-top: 20px;
    /deep/ .el-card__header {
      padding: 10px 20px;
    }
    h5 {
      float: left;
      font-size: 18px;
      line-height: 40px;
    }
    .el-button {
      float: right;
    }
  }
  .el-form {
    margin-top: 20px;
    .el-form-item {
      font-size: 0;
    }
    .el-input, .el-select {
      vertical-align: middle;
      width: 200px;
      line-height: 34px;
    }
    .inner-btn {
      float: none;
      display: inline-block;
      vertical-align: middle;
      padding: 8px 20px;
      margin-left: 10px;
    }
    /deep/ .el-input-group__append {
      padding: 0 4px;
      line-height: 32px;
      font-size: 12px;;
    }
    /deep/ input {
      height: 34px;
      line-height: 34px;
    }
    /deep/ label {
      // line-height: 40px;
    }
    /deep/ .el-form-item__content {
      vertical-align: middle;
    }
    .protoLine {
      width: 100%;
      /deep/ .el-form-item__content {
        width: 516px;
      }
    }
  }
  .link-generate {
    font-size: 0;
    margin-bottom: 10px;
    label {
      display: inline-block;
      padding-right: 12px;
      width: 100px;
      font-size: 14px;
      text-align: right;
    }
    .el-input {
      width: 436px;
    }
  }
  .operate .el-button {
    margin: 0 10px;
  }
  .credit-card {
    .el-checkbox {
      width: 100px;
    }
    .el-row {
      .el-form-item {
        margin-bottom: 12px;
        &:first-child {
          margin-right: 40px;
        }
      }
    }
  }
}
</style>
