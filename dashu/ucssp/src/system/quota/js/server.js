let host = 'api/clms';
if (process.env.NODE_ENV !== 'production') {
  // host = "http://dsapp13.intsit.dsfdc.com:8102";
  // host = "http://dsapp135.sit.dashuf.com:8102"; // sit3
  host = "sit3/api/clms";
  host = "http://10.3.114.153:8080";
}

const quotaApi = {
  warningConfigs: host + "/warningConfigs",
  EditWarningConfig: host + "/warningConfig",
  CompanyList: host + "/company/list",
  BranchCombinations: host + "/branch/combinations",
  ProductsFunds: host + "/products/funds",
  ProductsCorps: host + "/products/corps",
  ProductsModelsAndTypes: host + "/products/modelsAndTypes",
  BranchInitialize: host + "/branch/initialize",
  BranchBranchs: host + "/branch/branchs",
  BranchCompanys: host + "/branch/companys",
  Groups: host + "/groups",
  BranchImportfile: host + "/branch/importfile",
  ProductsElements: host + "/products/elements",
  DownloadTemplate: host + "/branch/template",
  schemeList: host + "/scheme/list",
  schemeNames: host + "/scheme/priority/selector",
  fundNames: host + "/scheme/fund/selector",
  selectorByChannel: host + "/scheme/fund/selectorbyChannel",
  globalSetting: host + "/scheme/globalsetting",
  delScheme: host + "/scheme/delete",
  areaTree: host + "/scheme/areatree",
  addScheme: host + "/scheme/add",
  editScheme: host + "/scheme/edit",
  getChannel: host + "/scheme/priority/channel",
  getGlobalSetting: host + "/scheme/getGlobalSetting"
};

export {
  quotaApi
};
