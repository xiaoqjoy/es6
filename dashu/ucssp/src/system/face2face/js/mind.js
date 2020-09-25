import myRule from "@common/js/rules";
const customerInfoSelectArry = [
  'customer_tax_cd', 'gender_code', 'marital_status_code', 'house_condition_code',
  'career_type_code', 'share_percent', 'education_level_cd', 'registered_area_cd',
  'organization_type_cd', 'position_type_cd', 'certificate_type_code', 'personal_type_cd',
  'family_relationship_code', 'non_family_relationship_code', 'report_source_code', 'auth_reason_code',
  'business_type_code'
];
const productListSelectArr = [
  'report_source_code', 'insurance_company', 'ins_payment_mode_code', 'payment_mode_code',
  'estate_type_code', 'car_loan_status_code', 'certificate_type_code'
];
const productInfoSelectArr = [
  'report_source_code', 'payment_mode_code', 'certificate_type_code', 'career_code',
  'loan_purpose_type', 'repayment_cycle_code', 'repayment_mode_code'
];
const workYear = (rule, value, callback) => {
  var reg = /(^\d{1,2}$)/;
  if (!reg.test(value) && !!value) {
    callback(new Error("请填写正确的工作年限(最大99)"));
  } else {
    callback();
  }
};
/**
 * 监测是否含有否决-其他项
 * @param {Array}
 * @returns {Boloon} true表示含有,false表示不含有
 */
function filterOH1(_list) {
  if (!(_list instanceof Array)) {
    console.error(`filterOH1 handler argument _list is not a Array`);
    throw new Error('filterOH1 handler argument _list is not a Array');
  }
  if (_list.length === 0) {
    return false;
  }
  for (let i = 0; i < _list.length; i++) {
    if (_list[i].code === 'OH1') {
      return true;
    }
  }
  return false;
};

// const markOpenTab = {
//   markOpen() {
//     const tabNumber = sessionStorage.getItem('tabNumber');
//     if (tabNumber > 0) {
//       return false;
//     }
//     if (!tabNumber || tabNumber === '0') {
//       sessionStorage.setItem('tabNumber', 1);
//       return 1;
//     }
//   },
//   removeTabNumber() {
//     sessionStorage.removeItem('tabNumber');
//     return 0;
//   }
// };

function custBasicRule() {
  return {
    maritalStatusCode: [
      { required: true, message: "请选择婚姻状况", trigger: "change" }
    ],
    registeredAddressCode: [
      { required: true, message: "请选择户籍地址", trigger: "change" }
    ],
    registeredAddressDesc: [
      { required: true, message: "请选填写户籍详细地址", trigger: "blur" },
      { validator: myRule.addressRule, trigger: "blur" }
    ],
    houseConditionCode: [
      { required: true, message: "请选择居住状况", trigger: "change" }
    ],
    certificateGrantorName: [
      { required: true, message: "请填写身份证签发机关", trigger: "blur" }
    ],
    houseAddressCode: [
      { required: true, message: "请填选择居住地址", trigger: "change" }
    ],
    houseAddressDesc: [
      { required: true, message: "请填写居住详细地址", trigger: "blur" },
      { validator: myRule.addressRule, trigger: "blur" }
    ],
    workplaceName: [
      { required: true, message: "请填单位名称", trigger: "blur" },
      { validator: myRule.companyNameRule, trigger: "blur" }
    ],
    workAddressCode: [
      { required: true, message: "请选择单位地址", trigger: "visible-change" }
    ]
  };
};

function custDetailedRule() {
  return {
    jobTitle: [
      { required: true, message: '请输入职务名称', trigger: 'blur' },
      { validator: myRule.allChart, trigger: 'blur' }
    ],
    departmentName: [
      { required: true, message: '请输入所在部门', trigger: 'blur' },
      { validator: myRule.allChart, trigger: 'blur' }
    ],
    wechat: [{ required: true, message: "请输入微信号", trigger: "blur" }],
    workAddressDesc: [
      { required: true, message: "请输入详细地址", trigger: "blur" },
      { validator: myRule.addressRule, trigger: "blur" }
    ],
    monthlyIncomeAmt: [
      { required: true, message: "请输入月收入", trigger: "blur" },
      { validator: myRule.positiveRule, trigger: "blur" }
    ],
    workAreaNum: [{ validator: myRule.areaNumRule, trigger: "blur" }],
    workPhoneNum: [{ validator: myRule.fix_only_phoneRule, trigger: "blur" }],
    houseZipcode: [
      { required: true, message: "请输入邮编", trigger: "blur" },
      { validator: myRule.postRule, trigger: "blur" }
    ],
    workZipcode: [
      { required: true, message: "请输入邮编", trigger: "blur" },
      { validator: myRule.postRule, trigger: "blur" }
    ],
    educationLevelCd: [
      { required: true, message: "请选教育类型", trigger: "change" }
    ],
    customerTaxCd: [
      { required: true, message: "请选客户类型", trigger: "change" }
    ],
    registeredAreaCd: [
      { required: true, message: "请选择户口所在地", trigger: "change" }
    ],
    haveChildInd: [
      { required: true, message: "请选择有无子女", trigger: "change" }
    ],
    organizationTypeCd: [
      { required: true, message: "请选择单位性质", trigger: "change" }
    ],
    presentWorkYearCnt: [
      { required: true, message: "请填写现工作单位工作年限", trigger: "blur" },
      { validator: workYear, trigger: "blur" }
    ],
    positionTypeCd: [
      { required: true, message: "请选择职务类型", trigger: "change" }
    ],
    personalTypeCd: [
      { required: true, message: '请选择个人类型', 'trigger': 'change' }
    ]
  };
};

const policyRule = {
  insuranceCompanyCode: [
    { required: true, message: "请填写寿险公司名称", trigger: "change" }
  ],
  mainRiskName: [
    { required: true, message: "请填写主险名称", trigger: "blur" },
    { max: 50, message: "长度不超过50个字符", trigger: "blur" }
  ],
  policyNum: [
    { required: true, message: "请填写保单号", trigger: "blur" },
    { validator: this.checkPolicyNum, trigger: "blur" }
  ],
  effectiveDate: [
    { required: true, message: "请选择生效日期", trigger: "blur" }
  ],
  policyStatusInd: [
    { required: true, message: "请选择保单状态", trigger: "change" }
  ],
  paymentModeCode: [
    { required: true, message: "请选择缴费方式", trigger: "change" }
  ],
  premiumCycleAmt: [
    { required: true, message: '请填写期缴保费', trigger: 'blur' },
    { validator: myRule.numTwoBit, trigger: 'blur' },
    {validator: (rule, value, callback) => {
      if ((value - 0) >= 100000000 && !!value) {
        return callback(new Error('最多只能输入8位'));
      } else {
        callback();
      }
    },
    trigger: 'blur'}
  ],
  premiumTimesCnt: [
    { required: true, message: "请填写缴费次数", trigger: "blur" },
    { validator: myRule.nonNegative4, trigger: 'blur' }
  ]
};
const coownerRule = {
  coownerName: [
    { required: true, message: '请填写共有人产权姓名', trigger: 'blur' },
    { validator: myRule.nameRule, trigger: 'blur' }
  ],
  certificateTypeCode: [
    { required: true, message: '请填选择证件类型', trigger: 'blur' }
  ],
  propertySharePercent: [
    { required: true, message: '请填写共有人产权份额', trigger: 'blur' },
    { validator: myRule.percentTwoBitRule, trigger: 'blur' }
  ],
  contactNum: [
    { required: true, message: '请填写共有人产权联系方式', trigger: 'blur' },
    { validator: myRule.phoneRule, trigger: 'blur' }
  ]
};
const houseRule = {
  addressCode: [
    { required: true, message: '请选择房产证地址', trigger: 'change' }
  ],
  addressDesc: [
    { required: true, message: '请填写房产证详细地址', trigger: 'blur' },
    { validator: myRule.addressRule, trigger: 'blur' }
  ],
  estateTypeCode: [
    { required: true, message: '请选择房屋性质', trigger: 'change' }
  ],
  obtainDate: [
    { required: true, message: '请选择房屋持有时间', trigger: 'change' }
  ],
  propertySharePercent: [
    { required: true, message: '请填写共有人产权份额', trigger: 'blur' },
    { validator: myRule.percentTwoBitRule, trigger: 'blur' }
  ],
  houseSizeMeas: [
    { required: true, message: '请填写房屋面积', trigger: 'blur' },
    { validator: myRule.numTwoBit, trigger: 'blur' }
  ],
  coownersCnt: [
    { required: true, message: '请选择共有产权人数', trigger: 'change' }
  ],
  inputAverageAmt: [
    { validator: myRule.numTwoBit, trigger: 'blur' }
  ]
};
const guarantorRule = {
  estateNum: [
    { required: true, message: '请选择对应房产证编号', trigger: 'change' }
  ],
  guaranteeName: [
    { required: true, message: '请填写担保人姓名', trigger: 'blur' },
    { validator: myRule.nameRule, trigger: 'blur' }
  ],
  certificateTypeCode: [
    { required: true, message: '请选择证件类型', trigger: 'change' }
  ],
  contactNum: [
    { required: true, message: '请填写手机号', trigger: 'blur' },
    { validator: myRule.phoneRule, trigger: 'blur' }
  ],
  houseInternationalCode: [
    { validator: myRule.houseInternationalCode1, trigger: 'blur' }
  ],
  houseAreaNum: [
    { required: true, message: '请填区号', trigger: 'blur' },
    { validator: myRule.areaNumRule, trigger: 'blur' }
  ],
  housePhoneNum: [
    { required: true, message: '请填写电话', trigger: 'blur' },
    { validator: myRule.fix_only_phoneRule, trigger: 'blur' }
  ],
  houseBranchNum: [
    { validator: myRule.nonNegative, trigger: 'blur' }
  ],
  houseAddress: [
    { required: true, message: '请填写家庭住址', trigger: 'blur' },
    { validator: myRule.addressRule, trigger: 'blur' }
  ],
  workContractName: [
    { required: true, message: '请填写单位联系人姓名', trigger: 'blur' },
    { validator: myRule.nameRule, trigger: 'blur' }
  ],
  workplaceName: [
    { required: true, message: '请填写单位名称', trigger: 'blur' },
    { validator: myRule.companyNameRule, trigger: "blur" }
  ],
  workInternationalCode: [
    { required: true, message: '请填写单位电话国际区号', trigger: 'blur' },
    { validator: myRule.internationalCode, trigger: 'blur' }
  ],
  workAreaNum: [
    { required: true, message: '请填写电话区号', trigger: 'blur' },
    { validator: myRule.areaNumRule, trigger: 'blur' }
  ],
  workPhoneNum: [
    { required: true, message: '请填写单位电话', trigger: 'blur' },
    { validator: myRule.fix_only_phoneRule, trigger: 'blur' }
  ],
  workBranchNum: [
    { validator: myRule.nonNegative, trigger: 'blur' }
  ],
  workAddress: [
    { required: true, message: '请填单位地址', trigger: 'blur' },
    { validator: myRule.addressRule, trigger: "blur" }
  ]
};
const carRule = {
  bankCode: [
    { required: true, message: '请填写贷款发放银行', trigger: 'blur' },
    { validator: myRule.bankNameRule, trigger: 'blur' }
  ],
  loanAmt: [
    { required: true, message: "请填写贷款发放金额", trigger: "blur" },
    { validator: myRule.nonNegative, trigger: "blur" }
  ],
  date: [{ required: true, message: "请选择日期", trigger: "blur" }],
  loanStatusCode: [
    { required: true, message: "请选择贷款状态", trigger: "blur" }
  ],
  monthlyRepaymentAmt: [
    { required: true, message: "请填写贷款月还金额", trigger: "blur" },
    { validator: myRule.nonNegative, trigger: 'blur' }
  ],
  loanDate: [{ required: true, message: "请选择日期", trigger: "blur" }],
  dueDate: [{ required: true, message: "请选择日期", trigger: "blur" }],
  firstRepaymentDate: [
    { required: true, message: "请选择日期", trigger: "blur" }
  ]
};
const organizationTaxRule = {
  taxpayerNum: [
    { required: true, message: '纳税人识别码 不能为空' }
  ],
  tlTaxOrganizationId: [
    { required: true, message: '税务数据接入机构 不能为空' }
  ],
  nearly1YrAnnlPayTaxAmt: [
    { required: true, message: '近一年企业年缴税额（元） 不能为空' },
    { validator: myRule.numTwoBit, trigger: 'blur', message: '只能输入数字，最多只能输入两位小数' }
  ],
  nearly1YrOrgCrLvlCd: [
    { required: true, message: '近一年企业信用评级 不能为空' }
  ],
  custPayTaxStartDate: [
    { required: true, message: '借款人最早缴税日期 不能为空' }
  ],
  notPayUpTaxInd: [
    { required: true, message: '当前是否有未缴清税款 不能为空' }
  ]
};
export {
  filterOH1,
  custBasicRule,
  customerInfoSelectArry,
  custDetailedRule,
  productListSelectArr,
  organizationTaxRule,
  policyRule,
  coownerRule,
  houseRule,
  guarantorRule,
  carRule,
  productInfoSelectArr
  // markOpenTab
};
