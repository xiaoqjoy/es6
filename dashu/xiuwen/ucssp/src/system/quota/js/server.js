let host = 'api/clms';
if (process.env.NODE_ENV !== 'production') {
  host = "http://dsapp13.intsit.dsfdc.com:8102";
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
  ProductsElements: host + "/products/elements"
};

export {
  quotaApi
};
