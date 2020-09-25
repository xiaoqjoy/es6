import popup from "@components/popup/index"; // 拖动弹框组件
// import videoData from "../../../dialogCom/video-data"; // 影像资料组件
import remark from "../../../dialogCom/remark"; // 备注组件
import survey from "../../../dialogCom/survey"; // 调查
import survey2 from "../../../dialogCom/survey2"; // 调查
import addGuarantor from "../../../dialogCom/add_guarantor"; // 担保人信息
import houseMessage from "../../../dialogCom/house_message"; // 房产信息
import detectionMsg from "../../../dialogCom/detectionMsg"; // 关注信息检测
import addLoan from "../../../dialogCom/add-loan"; // 共借人信息
import houseMessage2 from "../../../dialogCom/house_message2"; // 大道房产信息
import tobaccoLoan from "../../../dialogCom/tobacco_loan"; // 烟草贷
import taxcredit from "../../../dialogCom/tax_credit"; // 烟草贷
import threedataNowday from "@system/approvalAudit/dialogCom/threedataNowday"; // 汇法网
import threedataNowdayB from "@system/approvalAudit/dialogCom/threedataNowdayB"; // 汇法网
import icInfo from '@components/businessComponents/ICInfo';
import thirdPartFaHai from '@components/businessComponents/thirdPartFaHai';
import {
  mapActions
} from "vuex";
import myRules from '@common/js/rules.js';
import '@common/css/dialog';
import {
  aprAudApi, autoIc
} from "../../../../../js/server";
import customerTaxInfo from '@system/spare/solving/complete_info/complete-product/customer_tax_info';
import {
  fileCos
} from '../../../../../../../common/js/fileCos.js';

// let contactPerson = {
//   relationshipCode: "",
//   approveRemarkTxt: "-",
//   auditRemarkTxt: "",
//   contactName: "",
//   id: "",
//   mobileNum: ""
// };
let newcontactPerson = {
  contactRelationCode: "",
  approveRemarkTxt: "",
  auditRemarkTxt: "",
  contactInfoId: "",
  id: "",
  phoneCheckInd: false,
  phoneCheckName: "",
  phoneCheckNameCode: "003",
  phoneCheckPhoneNum: null,
  aprPhoneCheckRemark: null,
  audPhoneCheckRemark: null,
  apraudAddedInd: true
};
let newcontactThird = {
  contactRelationCode: "",
  approveRemarkTxt: "",
  auditRemarkTxt: "",
  contactInfoId: "",
  id: "",
  phoneCheckInd: false,
  phoneCheckName: "",
  phoneCheckNameCode: "001",
  phoneCheckPhoneNum: null,
  aprPhoneCheckRemark: null,
  audPhoneCheckRemark: null,
  apraudAddedInd: true
};
export default {
  // name: 'aaa',
  // inject: ['reload'],
  data() {
    let checkPrice = (rule, value, callback) => {
      const valReg = /^\d{1,14}(\.\d{1,4})?$/;
      if (!valReg.test(value) && !!value) {
        return callback(new Error('请输入整数部分不超14位，小数部分不超4位的数'));
      }
      callback();
    };
    return {
      derateOptions: [],
      alertThreedataNowday: false, // 汇法网
      alertThreedataNowdayB: false, // 汇法网
      icInfo_url: autoIc,
      ftfOpinion: [],
      extranetStatusCodes: [],
      authReasonArr: [],
      onelist: [],
      originalonelist: [], // 人行单电
      third: [],
      originalthird: [], // 第三方
      originalList: [], // 联系人原数组
      list: [], // 联系人展示数组
      relationShip: [], // 码表
      relationShip2: [], // 码表
      remarkRatio2: 5,
      id: '',
      alertPhoneVideo: false, // 听取录音开关
      detaineesEdit: {},
      detaineesList: [],
      detaineesRule: {
        detainees: [
          { required: true, message: '请填写在押机构', trigger: 'blur' }
        ],
        mortgageTerm: [
          { required: true, message: '请填写一押期限', trigger: 'blur' },
          { validator: myRules.number, trigger: 'blur' }
        ],
        preStartedDt: [
          { required: true, message: '请选择一押放款日期', trigger: 'change' }
        ],
        loanSettleDt: [
          { required: true, message: '请选择贷款预计结清日期', trigger: 'change' }
        ],
        pledgeTypeCd: [
          { required: true, message: '请选择一押抵押方式', trigger: 'change' }
        ],
        repaymentCd: [
          { required: true, message: '请选择一押还款方式', trigger: 'change' }
        ],
        mortgageInd: [
          { required: true, message: '请选择一押是否按揭', trigger: 'change' }
        ],
        creditAmt: [
          { required: true, message: '请填写一押授信金额', trigger: 'blur' },
          { validator: checkPrice, trigger: 'blur' }
        ],
        loanBalanceAmt: [
          { required: true, message: '请填写一押贷款余额', trigger: 'blur' },
          { validator: checkPrice, trigger: 'blur' }
        ],
        pledgeAmt: [
          { required: true, message: '请填写一押抵押债权金额', trigger: 'blur' },
          { validator: checkPrice, trigger: 'blur' }
        ],
        orgName: [
          { required: true, message: '请填写一押抵押机构名称', trigger: 'blur' }
        ],
        orgType: [
          { required: true, message: '请选择一押机构类型', trigger: 'change' }
        ]
      },
      detaineesAddDg: false,
      select: {
        autReason: [{
            itemCode: "1",
            itemDesc: '正常'
          },
          {
            itemCode: "2",
            itemDesc: '准入复议'
          },
          {
            itemCode: "3",
            itemDesc: '提额复议'
          },
          {
            itemCode: "4",
            itemDesc: '准入提额复议'
          },
          {
            itemCode: "5",
            itemDesc: '其他'
          }
        ]
      },
      nuonuoMsg: {},
      relDate: new Date(), // 相对日期
      salesInvoiceInfo: [], // 企业开票明细
      isNuonuo: false, // 是否诺诺
      IsSuper: false, // 是否转超分贷
      isSave: true,
      threePerson: false, // 三方数据个人查询按钮是否置灰
      threeCompany: false, // 三方数据公司查询按钮是否置灰
      survey2IsOpen: false,
      zxc: true,
      qwer: true,
      asd: [{
        title: '成人票'
      }],
      scrollTopList: [],
      f2fTypeCode: [], // 面签类型字典
      f2fType: '',
      attentionNum: '', // 关注信息检测数量
      isTaxLoan: false,
      queryTax: true,
      openTaxInfoDg: false,
      taxAgencyList: [],
      creditLevelList: [],
      // 企业税 授权控制开关
      impowerFlag: false,
      queryImpowerBtnStatus: false,
      organizationTax: {
        // notPayUpTaxInd: false
      },
      isfrimTaxDataChange: false,
      saveStatus: false, // 暂存开关
      queryBtnStatus: false,
      dialogVisible: false,
      creditReportId: "",
      oldApplicationId: "",
      showBtn: true, // 调查是否存在影像
      // isDisabled: this.$route.query.edit || true,
      isEdit: this.$route.query.isEdit,
      isSourceSurvey: this.$route.query.sourceSystem === 'survey', // 调查详情中关联检测信息详情特殊处理
      isFromList: this.$route.query.isFromList, // 是否来源于待处理列表
      isDadao: false, // 是否大道来源
      estateNum: '',
      aprResult: [],
      aduResult: [],
      applicationId: this.$route.query.appID,
      selectSpan: [],
      creditReport: "", // 征信报告url
      isShowCredit: false, // 查看征信报告弹框的显示与隐藏
      workplaceName: '',
      careerTypeCode: '', // 客户类型
      Address: '', // 户籍地址
      residential: '', // 居住地址
      pOrCalert: true,
      curIndex: 0, // 锚点
      timer: '',
      curPosY: 0,
      appOrAud: false,
      MapJumpPosy: [],
      descriptionData: [],
      hasSubmit: false,
      // 车供表格数据
      carList: [],
      carEdit: {},
      carCurrentEdit: {},
      carEditDg: false,
      carRule: {
        bankCode: [{
            required: true,
            message: '请填写贷款发放银行',
            trigger: 'blur'
          },
          {
            validator: (rule, value, callback) => {
              const valReg = /^[\u4E00-\u9FA5\uf900-\ufa2d]+$/gi;
              if (!valReg.test(value) && !!value) {
                return callback(new Error('只能输入中文'));
              } else {
                callback();
              }
            },
            trigger: 'blur'
          }
        ],
        loanAmt: [{
            required: true,
            message: '请填写贷款发放金额',
            trigger: 'blur'
          },
          {
            validator: myRules.nonNegative,
            trigger: 'blur'
          }
        ],
        date: [{
          required: true,
          message: '请选择日期',
          trigger: 'blur'
        }],
        loanStatusCode: [{
          required: true,
          message: '请选择贷款状态',
          trigger: 'blur'
        }],
        monthlyRepaymentAmt: [{
            required: true,
            message: '请填写贷款月还金额',
            trigger: 'blur'
          },
          {
            validator: myRules.nonNegative,
            trigger: 'blur'
          }
        ],
        loanDate: [{
          required: true,
          message: '请选择日期',
          trigger: 'blur'
        }],
        dueDate: [{
          required: true,
          message: '请选择日期',
          trigger: 'blur'
        }],
        settlementDate: [{
          validator: (rule, value, callback) => {
            if (this.carEdit.loanStatusCode === '20' && !value) {
              return callback(new Error('请选择贷款结清日期!'));
            } else {
              callback();
            }
          },
          trigger: 'blur'
        }],
        firstRepaymentDate: [{
          required: true,
          message: '请选择日期',
          trigger: 'blur'
        }]
      },
      // 房屋性质字典
      houseClass: {
        // 'H': '住宅',
        // 'HB': '商住两用',
        // 'W': '写字楼',
        // 'V': '别墅'
      },
      TabActiveName: 'first', // 显示房产担保人列表
      // 房产信息
      houseList: [],
      loanList: [],
      loanRow: {},
      houseIdList: [],
      houseEdit: {},
      houseCurrentEdit: {},
      houseEditDg: false,
      openHouseMessageDg: false,
      openHouseMessageDg2: false,
      houseId: null,
      openAddLoanDg: false,
      openAddGuarantorDg: false,
      // 担保人信息
      // 证件类型字典
      // 贷款状态字典
      carLoanStatusCodeLibrary: [],
      // 证件类型字典
      certificateLibrary: [],
      certificateClass: {},
      guarantorList: [],
      guarantorId: '', // 被选中编辑的列表
      guarantorHouseId: '', // 被选中的列表 房产证号
      guarantorHouseIdList: [], // 已经有担保人的房产证号
      enableHouseIdList: [], // 可被选中的房产证号
      infoRules: {
        maritalStatusCode: [{
          required: true,
          message: '请选择婚姻状况',
          trigger: 'change'
        }],
        spouseName: [{
            validator: this.checkSpouseName,
            trigger: 'blur'
          },
          {
            validator: myRules.chineseName,
            trigger: 'blur'
          }
        ],
        spouseIdTypeCode: [{
          validator: this.checkspouseIdTypeCode
        }],
        spouseIdNum: [{
          validator: this.checkSpouseID,
          trigger: 'blur'
        }],
        houseConditionCode: [{
          required: true,
          message: '请选择居住情况',
          trigger: 'change'
        }],
        wechatNum: [{
          required: true,
          message: '请填写微信号',
          trigger: 'blur'
        }],
        houseAddressDesc: [{
            required: true,
            message: '请填写居住详细地址',
            trigger: 'blur'
          },
          {
            validator: myRules.addressRule,
            trigger: 'blur'
          }
        ],
        sharePercent: [{
          validator: this.checkSharePercent,
          trigger: 'change'
        }],
        dadaoPricingGrade: [{
          required: true,
          message: '请选择大道定价类型',
          trigger: 'blur'
        }]
      },
      contactRelationShip: [], // 与借款人关系
      navTitle: [
        '个人信息',
        '单位信息',
        '联系人信息',
        '产品信息',
        '面签备注',
        '三方数据',
        '历史申请',
        '关联信息',
        '电核结论'
      ],
      activeBtn: 0,
      houseCondition: [],
      percentCondition: [],
      maritalStatus: [],
      dadaoPricingGrade: [],
      productTable: true, // 产品信息人选项卡
      productTable2: false, // 产品担保人选项卡
      alertAddGuarantor: false, // 新增担保人弹窗
      alertVideo: false, // 影像资料弹窗
      alertPhoneCheck: false, // 电核勾选弹窗
      alertRemark: false, // 备注弹窗
      alertPatchBolt: false, // 补件弹窗
      alertPatchBolt2: false, // 补件弹窗
      imageExistFlg: true,
      alertSurvey: false, // 调查
      alertSurvey2: false, // 调查2
      alertDetectionMsg: false, // 关注信息检测
      alertComebackA: false, // 退回一
      alertComebackB: false, // 退回二
      alertComebackC: false, // 退回三
      riskFlag: [],
      riskResult: [],
      riskAble: true,
      combinLabel: "合并负债",
      patchBoltNum: 0,
      promptInfo: [], // 信息提示
      businessStatus: [], // 业务状态评分
      personalInfo: {}, // 个人信息
      ftfOpinion: false, // 面签意见
      aplRiskPara: {}, // 风险参数
      workInfo: {}, // 单位信息
      personalInfoTitle: [],
      patchBoltValue: [], // 本次补件内容
      surveyReasonCode: [], // 调查下拉框
      patchClassCode: [], // 补件分类内容
      PatchHisDto: {}, // 历史补件内容
      surveyHis: [], // 历史调查记录
      aprConclusion: [], // 审批结论
      audConclusion: [], // 审计结论
      conclusion: "", // 新增审批结论
      aprRelatedCredit: [], // 信用报告列表
      aprLoanRecord: [], // 历史贷款记录
      hisRiskTxt: [], // 历史贷款记录异常提示列表
      phoneCheckConclusion: {}, // 电核结论
      aprPhoneCheckInfo: {
        riskMarkCode: [],
        decisionCode: [],
        derateReason: [] // 降额原因
      }, // 电核结论保存内容
      isSaveOperAll: false, // 是否保存
      certificateType: [], // 证件类型
      comebackReasonCode: [], // 退回下拉框
      options: [],
      value: "",
      formInline: {
        user: "",
        region: ""
      },
      tabPosition: "top",
      ruleForm: {
        houseAddressDesc: "", // 居住详细地址
        houseFund6mInd: true, // boolean6个月内是否正常缴纳公积金
        localEstateInd: true, // boolean是否有本地房产
        maritalStatusCode: "", // string婚姻状况
        registeredInd: false, // boolean是否注册
        sharePercent: 2, // number占股情况
        spouseIdNum: "", // string配偶身份证号码
        spouseName: "", // string配偶姓名
        wechatNum: "", // string微信号
        dadaoPricingGrade: '' // 大道定价类型
      },
      ruleWorkInfo: {
        workAddressCode: [],
        workplaceName: "", // 单位名称
        workAddressDesc: " " // 单位地址
      },
      personList: [], // 三方数据--个人
      companyList: [], // 三方数据--公司
      threeDataPerson: {}, // 三方数据--搜索 个人条件
      threeDataCompany: {}, // 三方数据--搜索 公司条件
      aplContactInfo: [{
        id: 2,
        contactName: "",
        relationshipCode: "",
        mobileNum: "",
        approveRemarkTxt: ""
      }],
      aprPhoneCheckInfoRule: {
        riskMarkCode: [
          // { required: true, message: '请选择', trigger: 'blur' }
        ],
        decisionCode: [{
          required: true,
          message: '请选择',
          trigger: 'blur'
        }]
      },
      workRules: {
        workAddressCode: [
          {
            required: true,
            message: '请选择单位地区',
            trigger: 'change'
          }
        ],
        workplaceName: [{
            required: true,
            message: '请填写单位名称',
            trigger: 'blur'
          },
          {
            validator: myRules.addressRule,
            trigger: 'blur'
          }
        ],
        workAddressDesc: [{
            required: true,
            message: '请填写详细单位地址',
            trigger: 'blur'
          },
          {
            validator: myRules.addressRule,
            trigger: 'blur'
          }
        ]
      },
      contactRules: {
        phoneCheckName: [{
            required: true,
            message: '请填写联系人姓名',
            trigger: 'blur'
          },
          {
            validator: myRules.chineseName,
            message: '请填写正确的姓名',
            trigger: 'blur'
          }
        ],
        contactRelationCode: [{
          required: true,
          message: '请选择与借款人关系',
          trigger: 'change'
        }],
        phoneCheckPhoneNum: [{
            required: true,
            message: '请填写联系电话',
            trigger: 'blur'
          },
          {
            validator: myRules.allPhoneRule,
            message: '请填写正确的电话号码',
            trigger: 'blur'
          }
        ],
        phoneCheckRemarkTxt1: [{
          message: '请填写备注信息',
          trigger: 'blur'
        }],
        phoneCheckPhoneNum2: [{
            required: true,
            message: '请填写第三方联系电话',
            trigger: 'blur'
          },
          {
            validator: (rule, value, callback) => {
              const valReg = /^[\d-]*$/;
              if (!valReg.test(value) && !!value) {
                return callback(new Error('请输入正确的第三方联系电话'));
              } else {
                callback();
              }
            },
            trigger: 'blur'
          }
        ]
      },
      threeDataRuleP: {
        name: [{
            required: true,
            message: '请填写姓名',
            trigger: 'blur'
          }
          // { validator: myRules.chineseName, message: '请填写正确的姓名', trigger: 'blur' }
        ],
        cerid: [{
            required: true,
            message: '请填写身份证号码',
            trigger: 'blur'
          },
          {
            validator: myRules.identityCardRule,
            message: '请填写正确的身份证号码',
            trigger: 'blur'
          }
        ]
      },
      riskRule: {
        allCreditLimitAmt: [{
            required: true,
            message: '请填写',
            trigger: 'blur'
          },
          {
            validator: myRules.numTwoBit,
            message: '请填写数字，并请保留两位小数',
            trigger: 'blur'
          }
        ],
        unsecuredLoanPaymentAmt: [{
            required: true,
            message: '请填写',
            trigger: 'blur'
          },
          {
            validator: myRules.numTwoBit,
            message: '请填写数字，并请保留两位小数',
            trigger: 'blur'
          }
        ],
        adjustmentAmt: [{
            required: true,
            message: '请填写',
            trigger: 'blur'
          },
          {
            validator: myRules.numTwoBitAndNegative,
            message: '请填写数字，并请保留两位小数',
            trigger: 'blur'
          }
        ],
        autReason: [{
          required: true,
          message: '请填写',
          trigger: 'change'
        }],
        adjustmentLtv: [{ // 可调整成数
            required: true,
            message: '请填写',
            trigger: 'blur'
          },
          {
            validator: myRules.numTwoBit,
            message: '请填写正数，并请保留两位小数',
            trigger: 'blur'
          }
        ]
      },
      threeDataRuleC: {
        companyName: [{
          required: true,
          message: '请填写公司名称',
          trigger: 'blur'
        }]
      },
      rules: {
        name: [{
            required: true,
            message: "请输入活动名称",
            trigger: "blur"
          },
          {
            min: 3,
            max: 5,
            message: "长度在 3 到 5 个字符",
            trigger: "blur"
          }
        ],
        region: [{
          required: true,
          message: "请选择活动区域",
          trigger: "change"
        }],
        date1: [{
          type: "date",
          required: true,
          message: "请选择日期",
          trigger: "change"
        }],
        date2: [{
          type: "date",
          required: true,
          message: "请选择时间",
          trigger: "change"
        }],
        type: [{
          type: "array",
          required: true,
          message: "请至少选择一个活动性质",
          trigger: "change"
        }],
        resource: [{
          required: true,
          message: "请选择活动资源",
          trigger: "change"
        }],
        desc: [{
          required: true,
          message: "请填写活动形式",
          trigger: "blur"
        }]
      },
      // 企业税相关的验证
      organizationTaxRule: {
        taxpayerNum: [{
          required: true,
          message: '纳税人识别码 不能为空'
        }],
        tlTaxOrganizationId: [{
          required: true,
          message: '税务数据接入机构 不能为空'
        }],
        nearly1YrAnnlPayTaxAmt: [{
            required: true,
            message: '近一年企业年缴税额（元） 不能为空'
          },
          {
            validator: myRules.numTwoBit,
            trigger: 'blur',
            message: '只能输入数字，最多只能输入两位小数'
          }
        ],
        nearly1YrOrgCrLvlCd: [{
          required: true,
          message: '近一年企业信用评级 不能为空'
        }],
        custPayTaxStartDate: [{
          required: true,
          message: '借款人最早缴税日期 不能为空'
        }],
        notPayUpTaxInd: [{
          required: true,
          message: '当前是否有未缴清税款 不能为空'
        }]
      },
      tobaccoLoanList: [],
      tobaccoLoanFlag: false,
      tobaccoLoanValue: {},
      taxInfoList: {},
      taxInfoTableList: {},
      getTaxFlag: false,
      ftFlag: false,
      tbFlag: false
    };
  },
  created() {
    this.$getDictCode('auth_reason_code').then(res => {
      this.authReasonArr = res;
    });
    // this.init();
    if (this.isEdit === 'true') {
      this.isEdit = true;
    } else if (this.isEdit === 'false') {
      this.isEdit = false;
    }
    this.getCreditLevelList();
    // // 共借人信息
    this.getAplCoborrowerInfos();
    // console.log(this.$route.query.isEdit, '是否可编辑');
    this.getLibraryApi('estate_type_code')
      .then(data => {
        data.forEach((v) => {
          this.$set(this.houseClass, v.itemCode, v.itemDesc);
        });
      });
    this.$getDictCode("extranet_status_code")
      .then(data => {
        this.extranetStatusCodes = data;
      }).catch(e => {
        this.$error(e.message);
      });
    this.getRiskFlag(); // 初始化获取风险参数

    this.getHouseList(); // 获取房产列表;
    this.getHouseCondition(); // 获取居住状况
    this.getMaritalStatus(); // 获取婚姻状况
    this.getCertificateType(); // 获取证件类型
    this.getsharePercent(); // 获取占股状况
    this.getCarList(this.applicationId); // 获取车供列表
    // this.getAreaList(); // 获取地区列表值
    this.getGuarantorList(this.applicationId); // 获取担保人列表
    this.getTreeData(); // 初始化获取第三方数据
    // this.getTobaccoLoan(); // 获取烟草贷信息
    this.getTaxInfo(); // 获取飞钛税务带信息
    this.getAreaList() // 获取地区列表值
      .then(() => {
        // 获取总操作列表
        this.gettaskDetail();
      });
    // 获取下拉字典
    // this.getLibraryApi('certificate_type_code')
    //   .then(data => {
    //     this.certificateLibrary = data;
    //     data.forEach((v) => {
    //       this.$set(this.certificateClass, v.itemCode, v.itemDesc);
    //     });
    //   });
    // this.getLibraryApi('car_loan_status_code')
    //   .then((data) => {
    //     this.carLoanStatusCodeLibrary = data;
    //   });
    // test
    // this.getPhoneCheckConfig('060');
    // this.getDerateReason();
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll, true);
    this.getScrollTopList();
    this.watchTax();
  },
  computed: {
    remarkRatio: function () {
      return (10 - this.remarkRatio2);
    },
    ishighScoreSupportFlg: function () {
      if (!this.aplRiskPara.highScoreSupportFlg && !this.aplRiskPara.switchHighScoreInd) {
        return true;
      } else {
        return false;
      }
    },
    opnionCode: function () {
      if (this.phoneCheckConclusion.opnionCode === "P") {
        return "建议通过";
      } else if (this.phoneCheckConclusion.opnionCode === "D") {
        return "建议否决";
      } else {
        return "建议谨慎";
      }
    },
    remarkTxt: function () {
      // return this.aprConclusion.join();
      return this.aprConclusion.decisionTxt;
    },
    surveyState: function () {
      if (!this.businessStatus.patchStatusCode) {
        return '';
      } else {
        return this.businessStatus.patchStatusCode === 'Finish' ? "补件完成" : "补件中";
      }
    }
  },
  methods: {
    // TODO:获取第三方数据
    getTreeData(v) {
      // let url = `${aprAudApi.taskDetail.threedataList}/TEST201809247013`;
      let url = `${aprAudApi.taskDetail.threedataList}/${this.applicationId}`;
      this.$MyFetch.get(url).then((data = {}) => {
        // this.ruleDetection = data;
        this.orangeList = JSON.parse(data);
        let personList = [];
        let companyList = [];
        for (var i = 0; i < this.orangeList.data.length; i++) {
          if (this.orangeList.data[i].search_type === 1) {
            if (this.orangeList.data[i].hasOwnProperty("fxmsgnum")) {
              this.orangeList.data[i].totalnumber = this.orangeList.data[i].fxmsgnum;
            }
            personList.push(this.orangeList.data[i]);
          }
          if (this.orangeList.data[i].search_type === 2) {
            if (this.orangeList.data[i].hasOwnProperty("n")) {
              this.orangeList.data[i].q = this.orangeList.data[i].n;
              this.orangeList.data[i].totalnumber = this.orangeList.data[i].fxmsgnum;
            }
            companyList.push(this.orangeList.data[i]);
          }
        }
        this.personList = personList;
        // this.newPersonList = newPersonList;
        // this.oldPersonList = oldPersonList;
        this.companyList = companyList;

        if (v) {
          this.$message({
            message: '查询成功',
            center: true
          });
        }
      }).catch(err => {
        this.$error(err.message).then(() => {
          if (this.isFromList) {
            this.backToList();
          }
        });
      });
    },
    // 三方数据--个人搜索
    searchPersonList() {
      this.threePerson = true;
      let url = `${aprAudApi.aud.taskDetail.threedataNowday}/${this.applicationId}`;
      let data = {
        ...this.threeDataPerson,
        applicationId: this.applicationId
      };
      this.$refs["threeDataPerson"].validate((valid) => {
        if (valid) {
          this.$MyFetch
            .post(url, data)
            .then((data = {}) => {
              this.getTreeData(true);
              this.threePerson = false;
            })
            .catch(err => {
              this.$error(err.message);
              this.threePerson = false;
            });
        } else {
          this.threePerson = false;
        }
      });
    },
    // 三方数据--公司搜索
    searchCompanyList() {
      this.threeCompany = true;
      let url = `${aprAudApi.aud.taskDetail.vagueNowday}/${this.applicationId}`;
      let data = {
        ...this.threeDataCompany,
        applicationId: this.applicationId
      };
      this.$refs["threeDataCompany"].validate((valid) => {
        if (valid) {
          this.$MyFetch
            .post(url, data)
            .then((data = {}) => {
              this.getTreeData(true);
              this.threeCompany = false;
            })
            .catch(err => {
              this.$error(err.message);
              this.threeCompany = false;
            });
        } else {
          this.threeCompany = false;
        }
      });
    },
    // 三方数据详情
    //  personMsgFun(i) {
    //    return this.orangeList.data[i];
    //  },
    openCompanyList(i) {
      this.pOrCalert = true;
      this.personMsgFun = JSON.parse(JSON.stringify(this.companyList[i]));
      // this.alertThreedataNowday = true;
      let routeMsg = null;
      let objStr = JSON.stringify(this.companyList[i]);
      // console.log(objStr);
      console.log('1', this.companyList[i]);
      localStorage.setItem("huifaMSG", objStr);
      if (this.appOrAud) {
        routeMsg = this.$router.resolve({
          name: "huifaA",
          query: {
            pOrCalert: this.pOrCalert,
            appOrAud: this.appOrAud
          }
        });
      } else {
        routeMsg = this.$router.resolve({
          name: "huifaB",
          query: {
            pOrCalert: this.pOrCalert,
            appOrAud: this.appOrAud
          }
        });
      }
      window.open(routeMsg.href, "_blank");
      console.log(routeMsg);
    },
    threedataNowday(i) {
      this.pOrCalert = false;
      this.personMsgFun = JSON.parse(JSON.stringify(this.personList[i]));
      // console.log(this.personList);
      // this.alertThreedataNowday = true;
      let routeMsg = null;
      let objStr = JSON.stringify(this.personList[i]);
      localStorage.setItem("huifaMSG", objStr);
      if (this.appOrAud) {
        routeMsg = this.$router.resolve({
          name: "huifaA",
          query: {
            pOrCalert: this.pOrCalert,
            appOrAud: this.appOrAud
          }
        });
      } else {
        routeMsg = this.$router.resolve({
          name: "huifaB",
          query: {
            pOrCalert: this.pOrCalert,
            appOrAud: this.appOrAud
          }
        });
      }
      window.open(routeMsg.href, "_blank");
      console.log(routeMsg);
      // console.log(this.$router)
    },
    close_threedataNowday() {
      this.alertThreedataNowday = false;
    },
    getExtranetStatus(code) {
      let desc;
      this.extranetStatusCodes.forEach((item) => {
        if (item.itemCode === code) {
          desc = item.itemDesc;
        }
      });
      return desc;
    },
    // 更新当前电核内容
    updateCall() {
      this.phoneCheckConclusion.phoneCheckContentArray = [];
      let data = this.list.concat(this.onelist, this.third);
      let msg = [];
      msg = this.contactRelationShip.concat(this.relationShip, this.relationShip2);
      let string = '';
      // this.getDescFromCode(this.contactRelationShip, data[i].contactRelationCode);
      for (let i = 0; i < data.length; i++) {
        if (data[i].audPhoneCheckRemark) {
          string = this.getDescFromCode(msg, data[i].contactRelationCode) + ':' + data[i].audPhoneCheckRemark;
          this.phoneCheckConclusion.phoneCheckContentArray.push(string);
        }
      }
    },
    thirdCall(item) {
      if (item) {
        item.phoneCheckPhoneNum = item.phoneCheckPhoneNum2;
      }
    },
    // 获取联系人列表
    init(msg) {
      console.log(msg, '联系人信息');
      this.list = [];
      this.third = [];
      this.onelist = [];
      this.originalList = [];
      this.originalonelist = [];
      this.originalthird = [];
      for (let i = 0; i < msg.length; i++) {
        if (this.appOrAud) { // 审批
          if (msg[i].aprPhoneCheckRemark || msg[i].phoneCheckInd) {
            msg[i].showTxt1 = true;
          } else {
            msg[i].showTxt1 = false;
          }
          if (msg[i].audPhoneCheckRemark && this.sendBackFlg) {
            msg[i].showTxt2 = true;
          } else {
            msg[i].showTxt2 = false;
          }
        } else { // 审计
          if (msg[i].aprPhoneCheckRemark) {
            msg[i].showTxt1 = true;
          } else {
            msg[i].showTxt1 = false;
          }
          if (msg[i].audPhoneCheckRemark || msg[i].phoneCheckInd) {
            msg[i].showTxt2 = true;
          } else {
            msg[i].showTxt2 = false;
          }
        }
        if (msg[i].phoneCheckNameCode === '003') { // 联系人
          this.list.push(msg[i]);
          // this.originalList.push(msg[i]);
          console.log(msg[i], '联系人');
        } else if (msg[i].phoneCheckNameCode === '002') { // 人行单电
          // msg[i].canEdit = true;
          this.onelist.push(msg[i]);
          // this.originalonelist.push(msg[i]);
        } else { // 第三方
          msg[i].canEdit = true;
          msg[i].phoneCheckPhoneNum2 = msg[i].phoneCheckPhoneNum;
          this.third.push(msg[i]);
          // this.originalthird.push(msg[i]);
        }
      }
      this.originalList = JSON.parse(JSON.stringify(this.list));
      this.originalonelist = JSON.parse(JSON.stringify(this.onelist));
      this.originalthird = JSON.parse(JSON.stringify(this.third));
      console.log(this.list, '我的联系人');
    },
    // 电核备注是否展示
    fomatData (arr) {
      let data = JSON.parse(JSON.stringify(arr));
      for (let i = 0; i < data.length; i++) {
        if (this.appOrAud) { // 审批
          if (data[i].phoneCheckInd) {
            data[i].showTxt1 = true;
          } else {
            data[i].showTxt1 = false;
          }
          if (data[i].phoneCheckRemarkTxt2 && this.sendBackFlg) {
            data[i].showTxt2 = true;
          } else {
            data[i].showTxt2 = false;
          }
        } else { // 审计
          if (data[i].phoneCheckRemarkTxt1) {
            data[i].showTxt1 = true;
          } else {
            data[i].showTxt1 = false;
          }
          if (data[i].phoneCheckInd) {
            data[i].showTxt2 = true;
          } else {
            data[i].showTxt2 = false;
          }
        }
        if (data[i].phoneCheckNameCode === "003") {
          data[i].canEdit = false;
        }
        if (data[i].phoneCheckNameCode === "002") {
          data[i].canEdit = true;
        }
        if (data[i].phoneCheckNameCode === "001") {
          data[i].canEdit = true;
        }
      }
      return data;
    },
    // 开关录音
    alert_phone_video(id) {
      this.id = id;
      let relevanceData = null;
        if (this.appOrAud) {
          relevanceData = this.$router.resolve({
            name: "phoneVideoA",
            query: {
              id: this.id,
              appOrAud: this.appOrAud
            }
          });
        } else {
          relevanceData = this.$router.resolve({
            name: "phoneVideoB",
            query: {
              id: this.id,
              appOrAud: this.appOrAud
            }
          });
        }
        window.open(relevanceData.href, "_blank");
      // this.alertPhoneVideo = true;
    },
    // 拨打电话
    makePhone(model, item, index, i) {
      // this.$refs[model + index][0].validateField('phoneCheckPhoneNum', (valid) => {
    this.$refs[model][0].validate((valid) => {
        if (valid) {
          let oldList = [];
          let newList = [];
          if (i === 'list') {
            oldList = this.originalList;
            newList = this.list;
          } else if (i === 'third') {
            oldList = this.originalthird;
            newList = this.third;
          } else {
            oldList = this.originalonelist;
            newList = this.onelist;
          }
          if (((oldList.length - 1) >= index) && (item.phoneCheckPhoneNum === oldList[index].phoneCheckPhoneNum)) {
            let list = JSON.parse(JSON.stringify(newList));
            if (this.appOrAud) {
              list[index].showTxt1 = true;
            } else {
              list[index].showTxt2 = true;
            }
            if (i === 'list') {
              this.list = list;
            } else if (i === 'third') {
              this.third = list;
            } else {
              this.onelist = list;
            }
            let url = "";
            if (this.appOrAud) {
              url = `${aprAudApi.taskDetail.phonecheckCall}/${this.$route.query.appID}`;
            } else {
              url = `${aprAudApi.aud.taskDetail.phonecheckCall}/${this.$route.query.appID}`;
            };
            let data = JSON.parse(JSON.stringify(item));
            delete data.remarkTxt;
            this.$MyFetch.post(url, {
                contactPerson: [data]
              })
              .then((data = {}) => {
                list[index].phoneCheckInd = true;
                let msg = JSON.parse(JSON.stringify(list));
                if (i === 'list') {
                  this.list = msg;
                } else if (i === 'third') {
                  this.third = msg;
                } else {
                  this.onelist = msg;
                }
                console.log(data, "打电话成功");
              })
              .catch(err => {
                this.$error(err.message);
              });
          } else {
            this.$error("请先保存！");
          }
        }
      });
    },
    formatTime(time) {
      if (time) {
        return this.$Moment(time).format("YYYY-MM-DD");
      }
    },
    // 获取在押机构信息
    getDetainees() {
      this.$MyFetch.get(aprAudApi.dadao.detainees.replace("{applicationId}", this.applicationId))
        .then((data = {}) => {
          if (data) {
            console.log(data, '看看看在押');
            // this.coownerList = data.aplEstateCoownerList;
            this.detaineesList = data;
            // data.aplEstateInfo.addressCode = this.getAddressArr(data.aplEstateInfo.addressCode, this.areaList);
            // this.houseEdit = Object.assign({}, data.aplEstateSupplement, data.aplEstateInfo);
          }
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 在押机构信息
    openAddDetainees() {
      let isEditing = false;
      /* if (this.detaineesList.length >= 3) {
        this.confirmFn('在押机构信息满三条,无法继续新增！', 'error');
        return;
      } */
      this.detaineesList.forEach((v) => {
        if (v.showEle) {
          isEditing = true;
        }
      });
      if (isEditing) {
        this.confirmFn('请先完成正在编辑的表格', 'error');
        return;
      }
      this.detaineesEdit = {};
      this.detaineesAddDg = true;
    },
    // 打开在押机构信息编辑窗口
    openEditDetaineesEle(obj) {
      let isEditing = false;
      this.detaineesList.forEach((v) => {
        if (v.showEle) {
          isEditing = true;
        }
      });
      if (this.detaineesAddDg || isEditing) {
        this.confirmFn('请先完成正在编辑的表格', 'error');
        return;
      }
      this.$set(obj, 'showEle', true);
      this.detaineesEdit = JSON.parse(JSON.stringify(obj));
    },
    // 保存在押机构信息编辑
    saveDetaineesEdit(formName, index) {
      this.$refs[formName][0].validate((valid) => {
        if (valid) {
          this.detaineesEdit.creditAmt = parseInt(this.detaineesEdit.creditAmt);
            this.detaineesEdit.loanBalanceAmt = parseInt(this.detaineesEdit.loanBalanceAmt);
            this.detaineesEdit.pledgeAmt = parseInt(this.detaineesEdit.pledgeAmt);
            let msg = {
              applicationId: this.applicationId,
              creditAmt: this.detaineesEdit.creditAmt,
              detainees: this.detaineesEdit.detainees,
              estateNum: this.detaineesEdit.estateNum,
              id: this.detaineesEdit.id,
              loanBalanceAmt:	this.detaineesEdit.loanBalanceAmt,
              loanSettleDt: this.detaineesEdit.loanSettleDt,
              mortgageInd: this.detaineesEdit.mortgageInd,
              mortgageTerm: this.detaineesEdit.mortgageTerm,
              orgName: this.detaineesEdit.orgName,
              orgType: this.detaineesEdit.orgType,
              pledgeAmt: this.detaineesEdit.pledgeAmt,
              pledgeTypeCd: this.detaineesEdit.pledgeTypeCd,
              preLoanAgency: this.detaineesEdit.preLoanAgency,
              preStartedDt: this.detaineesEdit.preStartedDt,
              repaymentCd: this.detaineesEdit.repaymentCd
            };
          this.$MyFetch.post(aprAudApi.dadao.update, msg)
          .then((data) => {
            console.log(data);
            this.confirmFn('编辑成功', 'success');
            this.getDetainees();
            this.$set(this.detaineesEdit, 'showEle', false);
            // this.detaineesList[index] = JSON.parse(JSON.stringify(this.detaineesEdit));
            this.detaineesEdit = {};
          })
          .catch(err => {
            this.confirmFn(err.message);
          });
        } else {
          console.log('error');
        }
      });
    },
    // 删除在押机构信息项
    deleteDetainees(index) {
      this.confirmFn('是否删除该条信息！', 'warning')
        .then(() => {
          this.$MyFetch.get(aprAudApi.dadao.delete.replace("{id}", this.detaineesList[index].id))
            .then(data => {
              this.getDetainees();
              this.confirmFn('删除成功', 'success');
              // this.detaineesList.splice(index, 1);
            })
            .catch(err => {
              this.confirmFn(err.message);
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 在押
    closeAddDetainees() {
      this.detaineesEdit = {};
      this.detaineesAddDg = false;
    },
    saveDetainees() {
      this.$refs.detaineesAddForm.validate((valid) => {
          if (valid) {
            this.detaineesEdit.creditAmt = parseInt(this.detaineesEdit.creditAmt);
            this.detaineesEdit.loanBalanceAmt = parseInt(this.detaineesEdit.loanBalanceAmt);
            this.detaineesEdit.pledgeAmt = parseInt(this.detaineesEdit.pledgeAmt);
            let msg = {
              applicationId: this.applicationId,
              creditAmt: this.detaineesEdit.creditAmt,
              detainees: this.detaineesEdit.detainees,
              estateNum: this.detaineesEdit.estateNum,
              id: this.detaineesEdit.id,
              loanBalanceAmt:	this.detaineesEdit.loanBalanceAmt,
              loanSettleDt: this.detaineesEdit.loanSettleDt,
              mortgageInd: this.detaineesEdit.mortgageInd,
              mortgageTerm: this.detaineesEdit.mortgageTerm,
              orgName: this.detaineesEdit.orgName,
              orgType: this.detaineesEdit.orgType,
              pledgeAmt: this.detaineesEdit.pledgeAmt,
              pledgeTypeCd: this.detaineesEdit.pledgeTypeCd,
              preLoanAgency: this.detaineesEdit.preLoanAgency,
              preStartedDt: this.detaineesEdit.preStartedDt,
              repaymentCd: this.detaineesEdit.repaymentCd
            };
            this.$MyFetch.post(aprAudApi.dadao.add, msg)
            .then(data => {
              this.confirmFn('新增成功', 'success');
              this.detaineesEdit = {};
              this.detaineesAddDg = false;
              this.getDetainees();
            })
            .catch(err => {
              this.confirmFn(err.message);
            });
            // var data = Object.assign(this.detaineesEdit);
            // this.detaineesList.push(data);
            // this.detaineesEdit = {};
            // this.detaineesAddDg = false;
          } else {
            console.log('不通过');
          }
      });
    },
    nearMonthCount(num, key) {
      let now = this.$Moment(this.relDate);
      let startNow = now.clone().startOf("month");
      let sum = 0;
      this.salesInvoiceInfo.forEach((item) => {
        let last = this.$Moment(item.month);
        let endLast = last.clone().endOf("month");
        let dis = endLast.add(num, "months");
        if (last < now && dis > startNow) {
          sum += (item[key] - 0);
        }
      });
      return (sum + "").split(".").length > 1 ? sum.toFixed(2) : sum;
    },
    nearMonthCountRatio(num, key) {
      let sum = this.nearMonthCount(num, "validNum");
      let part = this.nearMonthCount(num, key);
      let ratio = part / sum * 100;
      return (ratio + "").split(".").length > 1 ? ratio.toFixed(4) : ratio;
    },
    nearMonthMoneyRatio(num, key) {
      let sum = this.nearMonthCount(num, "taxSales");
      let part = this.nearMonthCount(num, key);
      let ratio = part / sum * 100;
      return (ratio + "").split(".").length > 1 ? ratio.toFixed(4) : ratio;
    },
    diffMonth(date) {
      let StartDate = this.$Moment(date);
      let EndDate = this.$Moment(this.relDate);
      let len = 0;
      while (StartDate <= EndDate) {
        len++;
        StartDate = StartDate.add(1, 'months');
      }
      return len;
    },
    goNuonuo() {
      let route = this.$router.resolve({
        name: "invoiceCreditReport",
        query: {
          applicationId: this.applicationId
        }
      });
      window.open(route.href);
    },
    getNuonuo() {
      this.$MyFetch.get(aprAudApi.nuonuo.getNuonuoMsg, {
          applicationId: this.applicationId
        })
        .then((data) => {
          let busiData = data.busiData;
          if (busiData) {
            this.nuonuoMsg.enterpriseName = busiData.basicInfo.enterpriseName;
            this.nuonuoMsg.legalName = busiData.basicInfo.legalName;
            this.nuonuoMsg.registrationState = busiData.basicInfo.registrationState;
            this.nuonuoMsg.taxpayerIdentityNum = busiData.basicInfo.taxpayerIdentityNum;
            this.nuonuoMsg.nonDealDays = busiData.dealRecordInfo.nonDealDays;
            this.nuonuoMsg.minInvoiceDate = busiData.dealRecordInfo.minInvoiceDate;
            this.nuonuoMsg.maxInvoiceDate = busiData.dealRecordInfo.maxInvoiceDate;
            this.salesInvoiceInfo = busiData.salesInvoiceInfo;
          }
          let extendedData = data.extendedData;
          if (extendedData) {
            this.relDate = new Date(extendedData.createdDate.replace(/-/, "/"));
          }
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 保留两位小数
    formatMoney(objName, key) {
      if (!isNaN(this[objName][key])) {
        if (this[objName][key] === '') return;
        this[objName][key] = (Math.round(this[objName][key] * 100) / 100).toString();
        let rs = this[objName][key].indexOf('.');
        if (rs < 0) {
          this[objName][key] += '.00';
        } else {
          while (this[objName][key].length <= (rs + 2)) {
            this[objName][key] += '0';
          }
        }
      }
    },
    // 调整调查和退回html242行
    backToList() {
      this.$router.push({
        name: 'audit-pending'
      });
      location.reload();
      this.$router.go(0);
    },
    qwe() {
      this.qwer = false;
    },
    // 获取每个模块位置
    getScrollTopList() {
      let scrollNum = 18;
      this.scrollTopList = [];
      for (let i = 0; i < this.navTitle.length; i++) {
        let docID = this.$el.querySelector('#selfGo-' + i);
        if (docID) {
          let scrollObj = {
            anchorIndex: i,
            scrollStart: scrollNum,
            scrollEnd: docID.offsetHeight + scrollNum + 10
          };
          scrollNum = scrollObj.scrollEnd;
          this.scrollTopList.push(scrollObj);
        }
      }
    },
    // 滚动导航
    handleScroll() {
      this.getScrollTopList();
      let anchor = this.$el.querySelector('#test1');
      for (let i = 0; i < this.scrollTopList.length; i++) {
        if (anchor.scrollTop >= this.scrollTopList[i].scrollStart && anchor.scrollTop <= this.scrollTopList[i].scrollEnd) {
          this.curIndex = this.scrollTopList[i].anchorIndex;
        }
      }
    },
    goAnchor(selector, index) {
      document.getElementById(selector).scrollIntoView(true);
    },
    dynamicColumn(item) {
      // if (item === 5 && !this.ftfOpinion && !this.isSourceSurvey) {
      //   return true;
      // } else if (item === 10) {
      //   return !this.tbFlag;
      // } else if (item === 11) {
      //   return !this.ftFlag;
      // } else if (item === 12) {
      //   return !this.isTaxLoan;
      // } else if (item === 13 && !this.isSourceSurvey) {
      //   return !this.isNuonuo;
      // } else if (item === 15 && this.isDadao && !this.isSourceSurvey) {
      //   return true;
      // } else {
      //   let hideIndex = [0, 3, 4, 5, 9, 13, 14, 15, 16];
      //   let flag = false;
      //   for (let x of hideIndex) {
      //     if (item === x) {
      //       flag = true;
      //       break;
      //     }
      //   }
      //   return flag && this.isSourceSurvey;
      // }
    },
    goHistory(id, certificateId, type) {
      let goto = {
        '2': 'approvalCollection',
        '3': 'approvalCollection',
        '4': 'approvalCollection',
        '5': 'auditCollection'
      };
      if (type === '1') {
        this.oldApplicationId = id;
        this.creditReportId = certificateId;
        this.dialogVisible = true;
        return;
      }
      let routeData = this.$router.resolve({
        name: goto[type],
        query: {
          appID: id,
          isEdit: true
        }
      });
      window.open(routeData.href, '_blank');
    },
    getDadaoPricingGrade() {
      this.getLibraryApi('dadao_pricing_grade')
        .then((data) => {
          this.dadaoPricingGrade = data;
        });
    },
    // 大道 复议金额
    getReconsiderationAmt() {
      this.$MyFetch.get(aprAudApi.dadao.reconsiderationAmountValue.replace("{applicationId}", this.applicationId))
        .then((data) => {
          this.$set(this.aplRiskPara, "reconsiderationAmount", data.reconsiderationAmount);
          this.$set(this.aplRiskPara, "autReason", data.autReason);
        });
    },
    getAplCoborrowerInfos() {
      this.$MyFetch.get(aprAudApi.dadao.getAplCoborrowerInfos.replace("{applicationId}", this.applicationId))
        .then((data) => {
          this.loanList = data;
        });
    },
    getDescFromCode(arr, code) {
      if (code !== undefined && arr !== undefined) {
        let obj = arr.filter((obj) => obj.itemCode.toString() === code.toString());
        if (obj && obj[0]) {
          return obj[0].itemDesc;
        }
      }
    },
    getCertificateFromCode(code) {
      return this.getDescFromCode(this.certificateLibrary, code);
    },
    // 获取下拉菜单
    getLibraryApi(name) {
      return new Promise((resolve, reject) => {
        this.$MyFetch.get(aprAudApi.commonSelect, {
            categoryCode: name,
            getAll: this.isEdit
          })
          .then(data => {
            resolve(data);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    watchTax() {
      // TODO:监听税务贷信息是否被改动；若改动，需重新测算
      this.$watch('organizationTax.nearly1YrAnnlPayTaxAmt', (_n, _o) => {
        if (_o !== undefined && _n !== _o) {
          this.isfrimTaxDataChange = true;
        }
      });
      this.$watch('organizationTax.nearly1YrOrgCrLvlCd', (_n, _o) => {
        if (_o !== undefined && _n !== _o) {
          this.isfrimTaxDataChange = true;
        }
      });
      this.$watch('organizationTax.custPayTaxStartDate', (_n, _o) => {
        if (_o !== undefined && _n !== _o) {
          this.isfrimTaxDataChange = true;
        }
      });
      this.$watch('organizationTax.notPayUpTaxInd', (_n, _o) => {
        if (_o !== undefined && _n !== _o) {
          this.isfrimTaxDataChange = true;
        }
      });
      this.$watch('organizationTax.tlTaxOrganizationId', (_n, _o) => {
        if (_o !== undefined && _n !== _o) {
          this.saveStatus = true;
          this.isfrimTaxDataChange = true;
          this.queryBtnStatus = true;
          if (_n === 1) {
            this.saveStatus = false;
            this.isfrimTaxDataChange = false;
          }
        }
      });
    },
    organizationTaxRuleChange(_bloon) {
      this.organizationTaxRule.nearly1YrAnnlPayTaxAmt[0].required = _bloon;
      this.organizationTaxRule.nearly1YrOrgCrLvlCd[0].required = _bloon;
      this.organizationTaxRule.custPayTaxStartDate[0].required = _bloon;
      this.organizationTaxRule.notPayUpTaxInd[0].required = _bloon;
    },
    taxAgencyChange(_data) {
      this.queryImpowerBtnStatus = (_data === 1);
      if (this.queryImpowerBtnStatus) {
        this.organizationTaxRuleChange(true);
      }
    },
    taxLoan(_data) {
      this.isTaxLoan = _data.organizationTaxInd && !!_data.taxLoanPrepareDto;
      return this.isTaxLoan;
    },
    getTaxAgencyList() {
      return new Promise((resolve, reject) => {
        this.$MyFetch.get(aprAudApi.taxConfig.careerworkOrganizationList, {
          applicationId: this.applicationId
        }).then((_data) => {
          if (this.$lodash.isEmpty(_data) && !this.isEdit) {
            this.confirmFn('客户单位地址所在省市无有效税务数据接入机构，请重新配置', 'error');
          }
          this.$lodash.each(_data, (_e, _i) => {
            _e.value = _e.tlTaxOrganizationId;
            _e.label = _e.tlTaxOrganizationName;
          });
          resolve(_data);
        }).catch((_erro) => {
          reject(_erro);
          this.$error('获取税务数据接入机构失败');
        });
      });
    },
    // 过滤税务数据接入机构
    async filerTaxAgency(_taxData) {
      let tlTaxOrganizationId = _taxData.tlTaxOrganizationId;
      let tlTaxOrganizationName = _taxData.tlTaxOrganizationName;
      let tlTaxOrganizationIdFlag = '';
      this.taxAgencyList = await this.getTaxAgencyList();
      // 修复修改了TaxAgencyList列表的时候，下拉框匹配不上显示为数字的bug
      tlTaxOrganizationIdFlag = this.$lodash.find(this.taxAgencyList, (_e) => {
        return tlTaxOrganizationId === _e.tlTaxOrganizationId;
      });
      if (!tlTaxOrganizationIdFlag && tlTaxOrganizationId) {
        // 如果税务接入机构与历史数据匹配不到，那想历史数据添加到税务接入机构下拉框
        if (!this.isEdit) {
          // 在可编辑时
          this.organizationTax.tlTaxOrganizationId = null;
          delete this.organizationTax.tlTaxOrganizationName;
        } else {
          this.taxAgencyList.push({
            value: tlTaxOrganizationId,
            label: tlTaxOrganizationName
          });
        }
      }
    },
    getCreditLevelList() {
      this.creditLevelList = [{
          value: 'A',
          label: 'A'
        },
        {
          value: 'B',
          label: 'B'
        },
        {
          value: 'C',
          label: 'C'
        },
        {
          value: 'D',
          label: 'D'
        },
        {
          value: 'M',
          label: 'M'
        },
        {
          value: 'X',
          label: '暂无评级'
        }
      ];
    },
    queryAuthorizationInfo() {
      // 请求客户授权信息
      if (!this.organizationTax.tlTaxOrganizationId) {
        this.confirmFn('税务接入机构不能为空', 'error');
        this.$refs.organizationTaxForm.validateField('tlTaxOrganizationId');
        return false;
      }
      if (this.queryBtnStatus) {
        // 纳税人识别码变了,提醒用户保存
        this.confirmFn('税务接入机构被更改过，请重新保存后再获取授权信息');
        return false;
      }
      this.impowerFlag = true;
      this.$MyFetch.get(aprAudApi.taxConfig.queryAuthory, {
        applicationId: this.applicationId
      }).then((_data = {}) => {
        // TP 第三方 DS 大数客户
        this.saveStatus = false;
        this.impowerFlag = false;
        this.queryBtnStatus = false;
        if (!_data.thirdPartyCustomerCd) {
          this.confirmFn('查无数据');
          return false;
        }
        if (_data.thirdPartyCustomerCd === 'TP') {
          this.confirmFn('客户授权成功且客户为第三方客户，可获取税务信息');
        } else if (_data.thirdPartyCustomerCd === 'DS') {
          this.confirmFn('客户授权成功，且客户为非第三方客户，请保证综合信息已填');
        }
        // 审批审计页面无论是三方还是非三方，获取税务信息都要至亮
        this.queryTax = false;
      }).catch((_erro) => {
        this.impowerFlag = false;
        this.confirmFn(_erro.message);
        console.log(_erro);
      });
    },
    queryTaxInfo() {
      // 调用税务信息查询接口、接口及异常的话能重新调用
      // 获取到信息后，综合信息必填信息变成非必填
      // 若无该客户税务信息记录，提示 该客户无查询记录
      this.queryTax = true;
      this.$MyFetch.get(aprAudApi.taxConfig.queryTaxInfoApi, {
        applicationId: this.applicationId
      }).then((_data) => {
        this.confirmFn('获取税务信息成功');
        this.queryTax = false;
        this.organizationTaxRuleChange(false);
      }).catch(_erro => {
        this.confirmFn(_erro.message);
        this.queryTax = false;
        console.log('error', _erro);
      });
    },
    checkTaxInfo() {
      this.openTaxInfoDg = true;
      this.$store.dispatch('setNum', this.applicationId);
    },
    closeCustomerTaxInfo() {
      this.openTaxInfoDg = false;
    },
    clearSel() {
      this.aprPhoneCheckInfo.decisionCode = [];
    },
    // 电核结论--修改电核结论下拉
    changePhoneCheck(value) {
      this.selectSpan = this.getTypesName(JSON.parse(JSON.stringify(value)));
    },
    getTypesName(value) {
      let arr = [];
      for (let i = 0; i < this.riskResult.length; i++) {
        for (let k = 0; k < value.length; k++) {
          if (value[k] === this.riskResult[i].level2Code) {
            arr.push(this.riskResult[i].level1Desc + "+" + this.riskResult[i].level2Desc);
          }
        }
      }
      return arr;
    },
    changeMarrie(value) {
      if (value !== "20" && value !== "22") {
        this.ruleForm.spouseName = "";
        this.ruleForm.spouseIdTypeCode = "";
        this.ruleForm.spouseIdNum = "";
        this.$refs.ruleForm.clearValidate(['spouseName', 'spouseIdTypeCode', 'spouseIdNum']);
      }
    },
    // 验证配偶姓名
    checkSpouseName(rule, value, callback) {
      if ((this.ruleForm.maritalStatusCode === '22' || this.ruleForm.maritalStatusCode === '20') && !value) {
        callback(new Error('请输入配偶姓名！'));
      } else {
        callback();
      }
    },
    // 验证配偶证件类型
    checkspouseIdTypeCode(rule, value, callback) {
      if ((this.ruleForm.maritalStatusCode === '22' || this.ruleForm.maritalStatusCode === '20') && !value) {
        callback(new Error('请选择配偶证件类型！'));
      } else {
        callback();
      }
    },
    checkSharePercent(rule, value, callback) {
      if ((this.ruleForm.careerTypeCode === '060') && !value) {
        // callback(new Error('请选择占股情况'));
      } else {
        callback();
      }
    },
    // 验证配偶证件号
    checkSpouseID(rule, value, callback) {
      let errMsg = '请输入正确的';
      let valReg;
      switch (this.ruleForm.spouseIdTypeCode) {
        case 'Ind01':
          errMsg += '身份证';
          valReg = fileCos.checkIdcard(value);
          break;
        case 'Ind04':
          errMsg += '军官证';
          valReg = true;
          break;
        case 'Ind06':
          errMsg += '港澳居民往来内地通行证';
          valReg = true;
          break;
        case 'Ind07':
          errMsg += '台湾同胞往来内地通行证';
          valReg = true;
          break;
        case 'Ind15':
          errMsg += '护照';
          valReg = true;
          break;
        default:
          break;
      }
      if ((this.ruleForm.maritalStatusCode === '20' || this.ruleForm.maritalStatusCode === '22')) {
        if (!this.ruleForm.spouseIdTypeCode) {
          callback(new Error('请先选择配偶证件类型！'));
        } else if (!value) {
          callback(new Error('请填写配偶证件号码！'));
        } else if (!valReg) {
          callback(new Error(errMsg));
        } else {
          callback();
        }
      } else {
        callback();
      }
    },
    // 局部刷新联系人信息
    reloadContact() {
      let url = "";
        let data = {
          readonlyFlg: true
        };
        // if (this.disabled) {
        //   data.readonlyFlg = true;
        // } else {
        //   data.readonlyFlg = false;
        // }
        url = `${aprAudApi.detail.replace("{applicationId}", this.applicationId)}`;
        this.$MyFetch.get(url, data)
        .then((date = {}) => {
          if (date.phoneCheckContactList !== undefined) {
            let newdate = JSON.parse(JSON.stringify(date.phoneCheckContactList));
            this.init(newdate);
            this.relationOnly(newdate);
          }
          // this.aplContactInfo = data.aplContactInfo;
          this.getContactRelationShip();
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 获取总操作列表
    gettaskDetail() {
      return new Promise((resolve, reject) => {
        let url = '';
        url = `${aprAudApi.detail.replace("{applicationId}", this.applicationId)}`;
        this.$MyFetch
          .get(url)
          .then((data = {}) => {
            resolve(data);
            if (data.promptInfo.businessSourceCode && data.promptInfo.businessSourceCode.toUpperCase() === "DADAO") {
              this.isDadao = true;
              // this.navTitle.splice(this.navTitle.indexOf("电核结论"), 1);
              this.getHouseList();
              this.getDadaoPricingGrade();
              this.getDetainees(); // 获取房屋信息
            }
            // 获取联系人信息
            // if (data.phoneCheckContactList) {
            //   this.init(data.phoneCheckContactList);
            // }
            if (data.phoneCheckContactList !== undefined) {
              let newdate = JSON.parse(JSON.stringify(data.phoneCheckContactList));
              this.init(newdate);
              this.relationOnly(newdate);
            }
            // this.aplContactInfo = data.aplContactInfo;
            // 信息提示
            this.data = data;
            this.promptInfo = data.promptInfo;
            this.businessStatus = data.businessStatus;
            this.survey2IsOpen = true;
            this.personalInfo = data.personalInfo; // 个人信息
            this.workInfo = data.workInfo; // 单位信息
            this.aprLoanRecord = data.aprLoanRecord; // 历史贷款记录
            if (data.workInfo.workAddressCode.length !== 0) {
              this.ruleWorkInfo.workAddressCode = this.getAddressArr(data.workInfo.workAddressCode, this.options);
              data.workInfo.workAddressCode = this.ruleWorkInfo.workAddressCode;
            } else {
              data.workInfo.workAddressCode = this.ruleWorkInfo.workAddressCode;
            }
            this.ruleWorkInfo = data.workInfo; // 单位信息输入框
            this.ftfOpinion = data.ftfOpinions;
            this.aplContactInfo = data.aplContactInfo;
            this.aprConclusion = data.aprConclusion;
            this.phoneCheckConclusion = data.phoneCheckConclusion; // 电核结论
            this.audConclusion = data.audConclusion;
            this.personalInfo.dadaoPricingGrade = "Ⅰ";
            this.ruleForm = JSON.parse(JSON.stringify(this.personalInfo));
            console.log(this.promptInfo, '个人信息');
            this.attentionNum = data.attentionNum; // 关注信息检测
            // 监测是否有税务贷信息
            let arrApr = [];
            let arrAdu = [];
            for (let i = 0; i < data.phoneCheckConclusion.aprPhoneCheckInfoDto.length; i++) {
              arrApr = [...arrApr, ...data.phoneCheckConclusion.aprPhoneCheckInfoDto[i].phoneCheckContentArray];
            }
            for (let i = 0; i < data.phoneCheckConclusion.audPhoneCheckInfoDto.length; i++) {
              arrAdu = [...arrAdu, ...data.phoneCheckConclusion.audPhoneCheckInfoDto[i].phoneCheckContentArray];
            }
            this.aprResult = arrApr;
            this.aduResult = arrAdu;
            // 历史贷款记录异常提示列表
            // 电核勾选两个form表单
            if (data.phoneCheckConclusion.decisionCode && data.phoneCheckConclusion.decisionCode.length > 0) {
              // this.aprPhoneCheckInfo.decisionCode = data.phoneCheckConclusion.decisionCode.split("|");
              this.aprPhoneCheckInfo.decisionCode = this.initCascader(data.phoneCheckConclusion.decisionCode);
            } else {
              this.aprPhoneCheckInfo.decisionCode = [];
            }
            // 降额原因查询值
            if (data.phoneCheckConclusion.derateReason && data.phoneCheckConclusion.derateReason.length > 0) {
              this.aprPhoneCheckInfo.derateReason = this.initCascader(data.phoneCheckConclusion.derateReason);
            } else {
              this.aprPhoneCheckInfo.derateReason = [];
            }
            this.getPhoneCheckConfig(data.personalInfo.careerTypeCode); // 获取电核结论里面的配置
            this.getDerateReason(); // 获取降额原因

            // this.aprPhoneCheckInfo.riskMarkCode = data.phoneCheckConclusion.riskMarkCode;
            if (data.phoneCheckConclusion.riskMarkCode && data.phoneCheckConclusion.riskMarkCode.length > 0) {
              this.aprPhoneCheckInfo.riskMarkCode = data.phoneCheckConclusion.riskMarkCode.split('|');
            } else {
              this.aprPhoneCheckInfo.riskMarkCode = [];
            }

            let hisRiskTxt = [];
            this.hisRiskTxt = hisRiskTxt;
            this.getContactRelationShip(); // 获取借款人关系
            this.getf2fType(); // 获取面签类型字典
            this.$getDictCode("gender_code").then(res => {
                if (this.changeGender(res, this.ruleForm.genderCode).length > 0) {
                  let genderCode = this.changeGender(res, this.ruleForm.genderCode);
                  if (genderCode && genderCode.length > 0) {
                    this.ruleForm.genderCode = genderCode[0].itemDesc;
                  }
                }
                // this.ruleForm.genderCode = res;
              })
              .catch(err => {
                this.$error(err.message);
              });
            this.$getDictCode("career_type_code").then(res => {
                console.log(res, '客户类型');
                let careerTypeCode = this.changeGender(res, this.ruleForm.careerTypeCode);
                if (careerTypeCode && careerTypeCode.length > 0) {
                  this.careerTypeCode = careerTypeCode[0].itemDesc;
                }
              })
              .catch(err => {
                this.$error(err.message);
              });
            this.getAreaList()
              .then(datae => {
                this.workplaceName = this.getAddressStr(data.workInfo.workAddressCode, this.options);
                if (this.workplaceName) {
                  this.workplaceName = this.workplaceName.replace(/\//g, '');
                }
                this.Address = this.getAddressStr(data.personalInfo.registeredAddressCode, this.options);
                if (this.Address) {
                  this.Address = this.Address.replace(/\//g, '');
                }
                this.residential = this.getAddressStr(data.personalInfo.houseAddressCode, this.options);
                if (this.residential) {
                  this.residential = this.residential.replace(/\//g, '');
                }
              })
              .catch(err => {
                this.$error(err.message);
              });
          })
          .catch(err => {
            this.$error(err.message).then(err => {
              console.log(err);
              if (this.isFromList) {
                this.backToList();
              }
            });
          });
          // 获取下拉字典
        this.getLibraryApi('certificate_type_code')
        .then(data => {
          this.certificateLibrary = data;
          data.forEach((v) => {
            this.$set(this.certificateClass, v.itemCode, v.itemDesc);
          });
        });
      this.getLibraryApi('car_loan_status_code')
        .then((data) => {
          this.carLoanStatusCodeLibrary = data;
        });
      });
    },
    // 性别转换
    changeGender(res, i) {
      // var num=this.size;
      return res.filter(function (arr) {
        return arr.itemCode === i;
      });
    },
    // 借款人信息只存在一条
    relationOnly(val) {
      // let what = this.list.filter(item => {
      //   return item.relationshipCode === '0000';
      // });
      // let zeroOne = this.aplContactInfo.filter(item => {
      //   return item.relationshipCode === '0001';
      // });
      // if (what.length > 0) {
      //   this.contactRelationShip[0].disabled = true;
      // } else {
      //   this.contactRelationShip[0].disabled = false;
      // }
      // if (zeroOne.length > 0) {
      //   this.contactRelationShip[10].disabled = true;
      // } else {
      //   this.contactRelationShip[10].disabled = false;
      // }
    },
    // 修改与借款人关系
    changeRelation(val) {
      this.relationOnly(val);
    },
    // 获取居住状况配置列表
    getHouseCondition() {
      this.$getDictCode("house_condition_code").then(res => {
          this.houseCondition = res;
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 获取占股状况配置列表
    getsharePercent() {
      this.$getDictCode("share_percent").then(res => {
          this.percentCondition = res;
          console.log(11111, res);
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 获取婚姻状况配置列表
    getMaritalStatus() {
      this.$getDictCode("marital_status_code").then(res => {
          this.maritalStatus = res;
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    getContactRelationShip() {
      this.$getDictCode("apr_contact_relation").then(res => {
        this.contactRelationShip = res;
        console.log(this.contactRelationShip);
        this.relationOnly();
      })
      .catch(err => {
        this.$error(err.message);
      });
      this.$getDictCode("phone_check_people").then(res => {
        this.relationShip = res;
        // this.relationOnly();
        console.log(this.relationShip, '第一码表');
      })
      .catch(err => {
        this.$error(err.message);
      });
      this.$getDictCode("phone_check_third_party").then(res => {
        this.relationShip2 = res;
        console.log(this.relationShip2, '第二码表');
        // this.relationOnly();
      })
      .catch(err => {
        this.$error(err.message);
      });
    },
    ...mapActions([
      'set_certificateType'
    ]),
    // 获取证件类型状况配置列表
    getCertificateType() {
      this.$getDictCode("certificate_type_code").then(res => {
          this.certificateType = res;
          this.set_certificateType(res);
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 获取面签类型状况配置列表
    getf2fType() {
      this.$getDictCode("f2f_type_code").then(res => {
          this.f2fTypeCode = res;
          console.log(this.f2fTypeCode, 'res');
          this.f2fType = this.changeGender(res, this.promptInfo.f2fTypeCode);
          console.log(this.f2fType, '这是什么123');
          if (this.f2fType.length > 0) {
            this.$set(this.promptInfo, 'f2fTypeCode', this.f2fType[0].itemDesc);
          }
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 个人信息必填验证
    personMsg(formName) {
      let isPass = true;
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          isPass = false;
        }
      });
      return isPass;
    },
    checkPhoneCheckDecision() {
      let data = this.aprPhoneCheckInfo.decisionCode.map(group => group[1]);
      data = data.join("|");
      console.log(data, "zifuchuan");
      let isPass = 0;
      if (data.indexOf("S01") < 0) {
        isPass += 1;
        return false;
      }
      if (data.indexOf("D01") >= 0 && data.indexOf("D02") >= 0) {
        isPass += 1;
        return false;
      }
      if (data.indexOf("P01") >= 0 && data.indexOf("P02") >= 0) {
        isPass += 1;
        return false;
      }
      if (data.indexOf("H01") >= 0) {
        if (data.indexOf("H02") >= 0 || data.indexOf("H03") >= 0 || data.indexOf("H04") >= 0 || data.indexOf("H05") >= 0) {
          isPass += 1;
          return false;
        }
      }
      return isPass;
    },
    // 保存总按钮
    saveOperAll() {
      if (!this.isSave) {
        this.confirmFn("请先完成正在编辑的表格", "error");
        return;
      }
      if (!this.checkTaxForm('organizationTaxForm')) {
        // 税务贷信息不完整
        this.$message({
          message: '税务贷信息不完整',
          type: 'warning'
        });
        return false;
      }
      console.log(this.ruleForm);

      if (!this.isDadao && this.checkPhoneCheckDecision() !== 0) {
        this.$message({
          message: '请选择正确的电核结论',
          type: 'warning'
        });
        return false;
      }
      let isPass = 0;
      for (let i = 0; i < this.list.length; i++) {
        // debugger;
        if (!this.checkForm('list' + i)) {
          isPass += 1;
          this.confirmFn("请先完成编辑联系人表格", "error");
          return;
        }
      }
      for (let i = 0; i < this.onelist.length; i++) {
        // debugger;
        if (!this.checkForm('onelist' + i)) {
          isPass += 1;
          this.confirmFn("请先完成编辑联系人表格", "error");
          return;
        }
      }
      for (let i = 0; i < this.third.length; i++) {
        // debugger;
        if (!this.checkForm('third' + i)) {
          isPass += 1;
          this.confirmFn("请先完成编辑联系人表格", "error");
          return;
        }
      }
      if (!this.personMsg('ruleForm')) {
        isPass += 1;
      }
      if (!this.personMsg('ruleWorkInfo')) {
        isPass += 1;
      }
      if (!this.isDadao && !this.personMsg('aprPhoneCheck')) {
        isPass += 1;
      }
      console.log(isPass);
      if (isPass === 0) {
        let aplContactInfoMSG = this.list.concat(this.onelist, this.third);
        for (let k = 0; k < aplContactInfoMSG.length; k++) {
          delete aplContactInfoMSG[k].showTxt1;
          delete aplContactInfoMSG[k].showTxt2;
        }
        let workAddressEndCode = this.ruleWorkInfo.workAddressCode.slice(-1);
        let data = {
          "phoneCheckContactList": aplContactInfoMSG, // 联系人信息
          "personalInfo": this.ruleForm,
          "remarkTxt": this.audConclusion.decisionTxt, // 审批结论
          "workInfo": { // 单位信息
            "workAddressCode": workAddressEndCode[0], // 单位地区
            "workAddressDesc": this.ruleWorkInfo.workAddressDesc, // 详细单位地址
            "workplaceName": this.ruleWorkInfo.workplaceName // 单位名称
          }
        };
        if (!this.$lodash.isEmpty(this.organizationTax)) {
          let num = this.organizationTax.nearly1YrAnnlPayTaxAmt;
          if (isNaN(Number(num)) && num !== undefined) {
            this.confirmFn(`${num} 不是数字`, 'error');
            return false;
          }
          if (num) {
            this.organizationTax.nearly1YrAnnlPayTaxAmt = this.$returnFloat(this.organizationTax.nearly1YrAnnlPayTaxAmt, 2);
          }
          data.taxLoanPrepareDto = this.organizationTax;
        }
        if (!this.isDadao) {
          const decisionCode = this.aprPhoneCheckInfo.decisionCode.map(group => group[1]).join('|');
          const derateReason = this.aprPhoneCheckInfo.derateReason.map(group => group[1]).join('|');
          data.aprPhoneCheck = { // 电核结论
            "decisionCode": decisionCode, // 电核结论
            "id": this.applicationId, // 主键
            "riskMarkCode": this.aprPhoneCheckInfo.riskMarkCode.join('|'), // 风险标识
            "derateReason": derateReason // 降额原因
          };
        }
        this.$MyFetch
          .post(`${aprAudApi.aud.taskDetail.saveOper}/${this.applicationId}`, data)
          .then((data) => {
            console.log('保存成功');
            this.isSaveOperAll = true;
            // 关掉税务贷测算保存的开关
            this.isfrimTaxDataChange = false;
            this.queryBtnStatus = false;
            this.reloadContact();
            this.updateCall();
            this.$message({
              message: '操作成功',
              center: true
            });
          })
          .catch(err => {
            this.$error(err.message);
          });
      } else {
        this.$message({
          message: '请检查必填选项是否为空',
          type: 'warning'
        });
      }
    },
    open2() {
      this.$message({
        message: '保存成功',
        type: 'success'
      });
    },
    // 删除联系人
    deleteContact(index, item) {
      this.confirmFn('是否删除该条信息？', 'warning')
        .then(() => {
          if (item === 'list') {
            let data = JSON.parse(JSON.stringify(this.list));
            data.splice(index, 1);
            this.list = data;
            this.relationOnly();
          }
          if (item === 'third') {
            let data = JSON.parse(JSON.stringify(this.third));
            data.splice(index, 1);
            this.third = data;
            this.relationOnly();
          }
        });
    },
    // 获取电核结论里面的配置
    getPhoneCheckConfig(type) {
      let param = {};
      if (type === "060") {
        param = {
          configType: "phone_check_code_self_employed"
        };
      } else {
        param = {
          configType: "phone_check_code_salary"
        };
      }
      // this.$MyFetch
      //   .get(aprAudApi.taskDetail.phoneCheckConfig, param)
      //   .then((data = {}) => {
      //     console.log(data, 121212121);
      //     this.riskResult = data;
      //     this.selectSpan = this.getTypesName(JSON.parse(JSON.stringify(this.aprPhoneCheckInfo.decisionCode)));
      //   })
      //   .catch(err => {
      //     this.$error(err.message);
      //   });
      this.$MyFetch
        .get(`${aprAudApi.taskDetail.levelList}/${param.configType}/levelList`)
        .then((data) => {
          this.riskResult = data;
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 电核结论保存按钮
    saveAprPhoneCheckInfo() {
      if (this.checkPhoneCheckDecision() !== 0) {
        this.$message({
          message: '请选择正确的电核结论',
          type: 'warning'
        });
        return false;
      }
      let riskMarkCode = this.aprPhoneCheckInfo.riskMarkCode.join('|');
      let decisionCode = this.aprPhoneCheckInfo.decisionCode.map(group => group[1]).join('|');
      // let derateReason = this.aprPhoneCheckInfo.derateReason.map(group => group[1]).join('|');
      let data = {
        riskMarkCode: riskMarkCode,
        decisionCode: decisionCode,
        // derateReason: derateReason
      };
      console.log(data);
      // return;
      this.$refs["aprPhoneCheck"].validate((valid) => {
        if (valid) {
          this.$MyFetch
            .post(`${aprAudApi.aud.taskDetail.phoneCheckConclusion}/${this.applicationId}`, data)
            .then((data = {}) => {
              this.$message({
                message: '刷新成功',
                center: true
              });
              this.phoneCheckConclusion.opnionCode = data;
            })
            .catch(err => {
              this.$error(err.message);
            });
        }
      });
    },
    //  历史贷款记录--跳转详情页面
    historyLink(id) {
      console.log(id);
    },
    // 查询电核风险标识
    getRiskFlag() {
      this.$getDictCode("phone_check_risk_flag").then(res => {
          this.riskFlag = res;
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 车供信息
    // 日期格式转换
    // 获取车供信息列表
    getCarList(id) {
      this.$MyFetch.post(aprAudApi.completeProduct.getCarList, {
          applicationId: id
        })
        .then((data = {}) => {
          this.carList = [...data.list];
          this.carList.forEach((v) => {
            if (v.loanDate) {
              v.loanDate = (new Date(v.loanDate.replace(/-/g, "/"))).getTime();
            }
            if (v.dueDate) {
              v.dueDate = (new Date(v.dueDate.replace(/-/g, "/"))).getTime();
            }
            if (v.firstRepaymentDate) {
              v.firstRepaymentDate = (new Date(v.firstRepaymentDate.replace(/-/g, "/"))).getTime();
            }
            if (v.settlementDate) {
              v.settlementDate = (new Date(v.settlementDate.replace(/-/g, "/"))).getTime();
            }
          });
        })
        .catch((err) => {
          this.$error(err.message);
        });
    },
    // 删除车供信息
    deleteCar(id) {
      if (this.carCurrentEdit.id) {
        this.confirmFn('请先完成正在编辑的表格', 'error');
        return;
      };
      this.confirmFn('是否删除该条信息!', 'warning')
        .then(() => {
          return this.deleteCarApi(id);
        })
        .then(() => {
          this.getCarList(this.applicationId);
        });
      // .catch(err => {
      //   this.$error(err.message);
      // });
    },
    deleteCarApi(id) {
      return new Promise((resolve, reject) => {
        this.$MyFetch.get(aprAudApi.completeProduct.deleteCar + id)
          .then((data = {}) => {
            resolve(data);
          })
          .catch(err => {
            this.$error(err.message);
            reject(err);
          });
      });
    },
    // 打开新增
    openAddCar() {
      if (this.carCurrentEdit.id) {
        this.confirmFn('请先完成正在编辑的表格', 'error');
        return;
      };
      this.carEdit = JSON.parse(JSON.stringify({
        settlementDate: ''
      }));
      if (this.carList.length >= 3) {
        this.confirmFn('车贷信用卡满三份，无法继续新增！', 'error');
        return;
      }
      this.carEditDg = true;
    },
    // 关闭新增
    closeAddCar() {
      this.carEditDg = false;
    },
    // 新增车贷信息
    addCar() {
      this.$refs.carAddForm.validate((valid) => {
        if (valid) {
          this.carEdit.applicationId = this.applicationId;
          this.addCarApi(this.carEdit)
            .then(() => {
              this.carEditDg = false;
              this.getCarList(this.applicationId);
            });
        } else {
          console.log('不通过');
        }
      });
    },
    addCarApi(data) {
      return new Promise((resolve, reject) => {
        this.$MyFetch.post(aprAudApi.completeProduct.addCar, data)
          .then((data) => {
            resolve(data);
          })
          .catch(err => {
            this.$error(err.message);
          });
      });
    },
    // 打开编辑车贷表格
    editCarELe(obj) {
      if (this.carEditDg) {
        this.confirmFn('请先完成正在编辑的表格', 'error');
        return;
      };
      this.isSave = false;
      this.$set(obj, 'showFormEle', true);
      this.carEdit = Object.assign({}, obj);
      this.carCurrentEdit = Object.assign({}, obj);
    },
    // 关闭编辑车贷表格
    closeCarEle(obj) {
      this.isSave = true;
      this.carCurrentEdit = {};
      this.carEdit = {};
      this.$set(obj, 'showFormEle', false);
    },
    // 保存编辑
    saveEditCar(formName, obj) {
      this.$refs[formName][0].validate((valid) => {
        if (valid) {
          this.saveEditCarApi(this.carEdit, obj);
          this.isSave = true;
        } else {
          console.log('error');
        }
      });
    },
    saveEditCarApi(data, obj) {
      console.log(data, this.carList);
      this.$MyFetch.post(aprAudApi.completeProduct.editCar, data)
        .then(() => {
          this.getCarList(this.applicationId);
          this.confirmFn('修改成功', 'success');
          this.closeCarEle(obj);
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 车贷状态为正常时 结清日期清空
    clearCarDate() {
      if (this.carEdit.loanStatusCode === '10') {
        this.carEdit.settlementDate = '';
      }
    },
    // 根据时间搓返回时间
    getTime(time) {
      var str = '/';
      if (time) {
        time = (typeof time === 'string') ? time.replace(/-/g, "/") : time;
        str = (new Date(time)).normalizeTime().strDate;
      }
      return str;
    },
    // 获取地区列表值
    getAreaList() {
      return new Promise((resolve, reject) => {
        this.getArea({
            getAll: this.isEdit
          })
          .then(data => {
            resolve(data);
            this.options = data;
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    // 获取房产客户信息列表
    getHouseList() {
      if (!this.isDadao) {
        this.$MyFetch.post(aprAudApi.completeProduct.getHourseList, {
            applicationId: this.applicationId
          })
          .then((data = {}) => {
            this.houseList = [...data.list];
            this.houseIdList = [];
            data.list.forEach((v) => {
              this.houseIdList.push(v.estateNum);
            });
          })
          .catch(err => {
            console.log(err.message, '获取房产失败');
            this.$error(err.message);
          });
      } else {
        this.$MyFetch.get(aprAudApi.dadao.getHouseList.replace("{applicationId}", this.applicationId))
          .then((data) => {
            this.houseList = [...data];
            this.houseIdList = [];
            this.houseList.forEach((v) => {
              this.houseIdList.push(v.estateNum);
            });
          })
          .catch((err) => {
            console.log(err.message, '获取房产失败');
            this.$error(err.message);
          });
      }
    },
    // 打开房产信息 或担保人信息 新增（编辑窗口）
    openMessageBox(obj = {}) {
      switch (this.TabActiveName) {
        case 'first':
          if (!obj.id && this.houseList.length >= 2) {
            this.confirmFn('最多添加两条房产信息！', 'error');
            return;
          }
          if (!this.isDadao) {
            this.openHouseMessageDg = true;
            this.houseId = obj.id;
          } else {
            this.openHouseMessageDg2 = true;
            this.houseId = obj.id;
            this.estateNum = obj.estateNum;
          }
          break;
        case 'second':
          if (!obj.id && this.guarantorList.length >= 2) {
            this.confirmFn('最多添加两条担保人信息！', 'error');
            return;
          } else if (this.houseIdList.length <= 0) {
            this.confirmFn('请先添加房产信息！', 'error');
            return;
          }
          // 过滤掉已经有担保人的房产
          // 保证每一条房产只有一个担保人
          this.enableHouseIdList = [];
          this.houseIdList.forEach((v) => {
            this.enableHouseIdList.push(v);
          });
          this.guarantorId = obj.id;
          this.guarantorHouseId = obj.estateNum;
          this.openAddGuarantorDg = true;
          break;
        case 'third':
          if (obj.id) {
            this.loanRow = obj;
          } else {
            this.loanRow = {};
          }
          this.openAddLoanDg = true;
          break;
        default:
          break;
      }
    },
    // 关闭房产信息弹出层
    closeHouseMessage() {
      this.openHouseMessageDg = false;
      this.houseEdit = {};
      this.getHouseList();
      this.getGuarantorList(this.applicationId);
    },
    // 关闭大道房产信息弹出层
    closeHouseMessage2() {
      this.openHouseMessageDg2 = false;
      this.getHouseList();
    },
    // 删除房产信息
    deleteHouseMessage(id, estateNum) {
      this.confirmFn('是否删除该条信息？', 'warning')
        .then(() => {
          if (!this.isDadao) {
            this.$MyFetch.get(aprAudApi.completeProduct.deleteHouse + id)
              .then((data = {}) => {
                this.confirmFn('删除成功', 'success');
                this.getHouseList();
                this.getGuarantorList(this.applicationId);
              })
              .catch(err => {
                this.$error(err.message);
              });
          } else {
            this.$MyFetch.get(aprAudApi.dadao.deleteHouse.replace("{applicationId}", this.applicationId).replace("{estateNum}", estateNum))
              .then((data) => {
                this.confirmFn('删除成功', 'success');
                this.getHouseList();
                this.getGuarantorList(this.applicationId);
              });
            // .catch(err => {
            //   this.$error(err.message);
            // });
          }
        });
      // .catch(err => {
      //   this.$error(err.message);
      // });
    },
    // 删除共借人信息
    deleteLoanMessage(id) {
      this.confirmFn('是否删除该条信息？', 'warning')
        .then(() => {
          this.$MyFetch.get(aprAudApi.dadao.delAplCoborrowerInfo.replace("{applicationId}", id))
            .then((data) => {
              this.getAplCoborrowerInfos();
            }).catch((e) => {
              this.$error(e);
            });
        });
      // .catch(err => {
      // this.$error(err.message);
      // });
    },
    closeLoan() {
      this.openAddLoanDg = false;
      this.getAplCoborrowerInfos();
    },
    // 担保人信息
    // 获取担保人信息
    getGuarantorList(id) {
      this.$MyFetch.post(aprAudApi.completeProduct.getGuaranteeList, {
          applicationId: id
        })
        .then(data => {
          this.guarantorList = [...data.list];
          this.guarantorHouseIdList = [];
          data.list.forEach((v) => {
            this.guarantorHouseIdList.push(v.estateNum);
          });
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    closeGuarantor() {
      this.getGuarantorList(this.applicationId);
      this.openAddGuarantorDg = false;
    },
    deleteGuarantor(id) {
      this.confirmFn('是否删除该条信息？', 'warning')
        .then(() => {
          this.$MyFetch.get(aprAudApi.completeProduct.deleteGuarantee + id)
            .then(() => {
              this.confirmFn('删除成功！', 'success');
              this.getGuarantorList(this.applicationId);
            })
            .catch(err => {
              this.$error(err.message);
            });
        });
      // .catch(err => {
      //   this.$error(err.message);
      // });
    },
   // 保存联系人信息
   saveContact(item) {
    let url = null;
    if (this.appOrAud) {
      url = `${aprAudApi.taskDetail.phoneCheckOper}/${this.$route.query.appID}`;
    } else {
      url = `${aprAudApi.aud.taskDetail.phoneCheckOper}/${this.$route.query.appID}`;
    };
    for (let i = 0; i < this.list.length; i++) {
      if (!this.checkForm('list' + i)) {
        this.confirmFn("请先完成正在编辑的表格", "error");
        return;
      }
    };
    let data = JSON.parse(JSON.stringify(this.list));
    for (let k = 0; k < data.length; k++) {
      delete data[k].canEdit;
      delete data[k].showTxt1;
      delete data[k].showTxt2;
    }
    for (let i = 0; i < this.onelist.length; i++) {
      if (!this.checkForm('onelist' + i)) {
        this.confirmFn("请先完成正在编辑的表格", "error");
        return;
      }
    };
    for (let i = 0; i < this.third.length; i++) {
      if (!this.checkForm('third' + i)) {
        this.confirmFn("请先完成正在编辑的表格", "error");
        return;
      }
    };
    let msg = JSON.parse(JSON.stringify(this.third));
    if (msg.length > 0) {
      for (let i = 0; i < msg.length; i++) {
        msg[i].phoneCheckPhoneNum = msg[i].phoneCheckPhoneNum2;
        delete msg[i].canEdit;
        delete msg[i].phoneCheckPhoneNum2;
        delete msg[i].showTxt1;
        delete msg[i].showTxt2;
      }
    }
    let dataMsg = data.concat(msg, this.onelist);
      this.$MyFetch
      .post(url, {
        contactPerson: dataMsg
      })
      .then((data = {}) => {
        this.reloadContact(); // 刷新联系人信息
        this.updateCall();
        this.$message({
          message: '操作成功',
          center: true
        });
      })
      .catch(err => {
        this.$error(err.message);
      });
  },
    checkForm(formName) {
      let hasPass = true;
      this.$refs[formName][0].validate((valid) => {
        if (!valid) {
          hasPass = false;
        }
      });
      return hasPass;
    },
    // 检查表单是否合法
    checkTaxForm(_name) {
      let flag = true;
      if (this.$refs[_name]) {
        this.$refs[_name].validate((_valid) => {
          flag = _valid;
        });
      }
      return flag;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log('submit');
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    product_tabshow1() {
      this.productTable = true;
    },
    product_tabshow2() {
      this.productTable = false;
    },
    // 新增联系人信息
    addContactPerson(item) {
      if (item === 'list') {
        console.log(this.list);
        let data = JSON.parse(JSON.stringify(this.list));
        data.push(JSON.parse(JSON.stringify(newcontactPerson)));
        this.list = data;
        console.log(data, this.list);
        this.relationOnly();
        return;
      }
      if (item === 'third') {
        let data = JSON.parse(JSON.stringify(this.third));
        data.push(JSON.parse(JSON.stringify(newcontactThird)));
        this.third = data;
        this.relationOnly();
      }
    },
    // 关闭新增担保人弹窗组件
    close_addGuarantor() {
      this.alertAddGuarantor = false;
    },
    // 打开新增担保人弹窗组件
    alert_addGuarantor() {
      this.alertAddGuarantor = true;
    },
    // 关闭影像资料弹窗组件
    close_video() {
      this.alertVideo = false;
    },
    // 关闭电核勾选弹窗组件
    close_phonecheck() {
      this.alertPhoneCheck = false;
      // location.reload();
      this.gettaskDetail();
    },
    // 打开影像资料弹窗组件
    alert_video() {
      this.alertVideo = true;
    },
    // 打开电核勾选弹窗组件
    alert_phone_check() {
      this.alertPhoneCheck = true;
    },
    // 关闭备注弹窗组件
    close_remark() {
      this.alertRemark = false;
    },
    // 打开备注弹窗组件
    alert_remark() {
      this.alertRemark = true;
    },
    // 关闭补件弹窗组件
    close_patchBolt() {
      this.alertPatchBolt = false;
    },
    close_patchBolt2() {
      this.alertPatchBolt2 = false;
    },
    getTreeValue() {
      var query = {
        configType: 'patch_reason'
      };
      this.getReason(query)
        .then((data) => {
          this.patchClassCode = data;
          console.log(this.patchClassCode, '补件分类码');
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 获取历史值
    getPatch() {
      return new Promise((resolve, reject) => {
        this.$MyFetch.get(`${aprAudApi.aud.taskDetail.patchPage}/${this.applicationId}`)
          .then((data = {}) => {
            this.imageExistFlg = data.imageExistFlg;
            this.PatchHisDto = data.patchHis;
            resolve(data);
          })
          .catch(err => {
            this.$error(err.message);
          });
      });
    },
    reset() {
      this.PatchHisDto = [];
    },
    addPatch() {
      this.alertPatchBolt = true;
    },
    alert_patchBolt() {
      this.getTreeValue();
      this.getPatch()
        .then((data = {}) => {
          // console.log(this.PatchHisDto, '历史值123');
          if (this.PatchHisDto.length) {
            this.alertPatchBolt2 = true;
          } else {
            this.alertPatchBolt = true;
          }
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 打开调查
    getReason(data) {
      return new Promise((resolve, reject) => {
        this.$MyFetch.get(aprAudApi.taskDetail.OperationConfig, data)
          .then((data = {}) => {
            resolve(data);
          })
          .catch(err => {
            this.$error(err.message);
          });
      });
    },
    getSurvey() {
      var query = {
        configType: 'investigation_reason'
      };
      this.getReason(query)
        .then((data) => {
          // for (let i = 0; i < data.length; i++) {
          //   this.surveyReasonCode.push(data[i]);
          // }
          this.surveyReasonCode = data;
          console.log(this.surveyReasonCode, '调查4564');
        })
        .catch(err => {
          console.log(err, '下拉框失败');
        });
    },
    alert_survey() {
      if (this.isDadao) {
        this.confirmFn("大道业务不需要调查");
        return;
      }
      this.getSurvey();
      this.$MyFetch.get(`${aprAudApi.aud.taskDetail.surveyPage}/${this.applicationId}`)
        .then((data = {}) => {
          this.showBtn = data.imageExistFlg;
          this.surveyHis = data.surveyHis;
          console.log(this.surveyHis, '东西');
          if (!this.surveyHis.length) {
            this.alertSurvey = true;
          } else if (this.survey2IsOpen) {
            this.alertSurvey2 = true;
          }
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    close_survey() {
      this.alertSurvey = false;
    },
    close_survey2() {
      this.alertSurvey2 = false;
    },
    // 关注信息检测关闭
    alert_detectionMsg() {
      let relevanceData = null;
      if (this.appOrAud) {
        relevanceData = this.$router.resolve({
          name: "approvalRelevanceInformation",
          query: {
            appID: this.applicationId,
            appOrAud: this.appOrAud,
            disabled: this.isEdit
          }
        });
      } else {
        relevanceData = this.$router.resolve({
          name: "auditRelevanceInformation",
          query: {
            appID: this.applicationId,
            appOrAud: this.appOrAud,
            disabled: this.isEdit
          }
        });
      }
      window.open(relevanceData.href, "_blank");
      // console.log('打开');
      // this.alertDetectionMsg = true;
    },
    close_detectionMsg() {
      this.alertDetectionMsg = false;
    },
    // 退回
    getComeback() {
      var query = {
        configType: 'aud_return_reason'
      };
      this.getReason(query)
        .then((data) => {
          this.comebackReasonCode = data;
          console.log(this.comebackReasonCode, '退回下拉框');
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    getComebackcode() {
      return new Promise((resolve, reject) => {
        var query = {
          configType: 'aud_return_reason'
        };
        this.getReason(query)
          .then((data) => {
            this.comebackReasonCode = data;
            console.log(this.comebackReasonCode, '退回下拉框');
            resolve(data);
          })
          .catch(err => {
            this.$error(err.message);
          });
      });
    },
    alert_comeback() {
      var query = {
        configType: 'aud_return_reason'
      };
      this.getReason(query)
        .then((data) => {
          this.comebackReasonCode = data;
          console.log(this.comebackReasonCode, '退回下拉框');
        })
        .then(data => {
          this.$MyFetch.get(`${aprAudApi.aud.taskDetail.sendBackPage}/${this.applicationId}`)
            .then((data = {}) => {
              this.comebackHis = data.aprConclusion;
              console.log(data, '退回历史');
              if (this.comebackHis.length === 0) {
                this.alertComebackA = true;
              } else if (this.comebackHis.length === 1) {
                console.log('打开2');
                this.alertComebackB = true;
              } else {
                this.alertComebackC = true;
              }
            })
            .catch(err => {
              this.$error(err.message);
            });
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 获取烟草贷信息
    getTobaccoLoan() {
      this.$MyFetch.get(`${aprAudApi.aud.taskDetail.aprInfo}${this.applicationId}/aprInfo`)
        .then((data = {}) => {
          console.log(data.tabacInfo.applicationId);
          this.tobaccoLoanList = data.tabacInfo;
          if (this.tobaccoLoanList.applicationId) {
            this.tbFlag = true;
          }
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 烟草税弹窗
    tobaccoPopup(value) {
      this.tobaccoLoanFlag = !this.tobaccoLoanFlag;
      console.log(value);
      this.tobaccoLoanValue = value;
    },
    // 获取飞钛烟税务贷信息 测试
    getTaxInfo() {
      this.$MyFetch.get(`${aprAudApi.aud.taskDetail.aprInfo}${this.applicationId}/taxInfo`)
        .then((data = {}) => {
          this.taxInfoList = data;
          console.log(data.basicInfo.applicationId, 'feitai');
          if (data.basicInfo) {
            this.taxInfoTableList = data.basicInfo;
          } else {
            this.taxInfoTableList = {};
          };
          if (this.taxInfoTableList.applicationId) {
            this.ftFlag = true;
          }
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 飞钛税务贷弹窗
    getTaxPopup() {
      this.getTaxFlag = !this.getTaxFlag;
    },
    close_comebackA() {
      this.alertComebackA = false;
    },
    close_comebackB() {
      this.alertComebackB = false;
    },
    close_comebackC() {
      this.alertComebackC = false;
    },
    getDerateReason() {
      this.$MyFetch
        .get(`${aprAudApi.taskDetail.levelList}/derate_reason/levelList`)
        .then((data) => {
          this.derateOptions = data;
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    initCascader(data) { // 形如 'D01-01|D01-02'
      if (data) {
        let result = data.split('|');
        result = result.map(item => [item.split('-')[0], item]);
        return result;
      } else {
        return [];
      }
    },
    getFontColor(newInd, veto) {
      let result = '';
      if (newInd) {
        result = 'blue';
      }
      if (veto) {
        result = 'red';
      }
      return result;
    }
  },
  components: {
    // videoData,
    remark,
    survey,
    survey2,
    addGuarantor,
    addLoan,
    houseMessage,
    houseMessage2,
    detectionMsg,
    popup,
    customerTaxInfo,
    tobaccoLoan,
    taxcredit,
    icInfo,
    threedataNowday,
    threedataNowdayB,
    thirdPartFaHai
  }
};
