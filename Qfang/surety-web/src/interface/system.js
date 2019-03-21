import method from './method';
var get = method.get
var post = method.post
var suretyInterface = {
  queryPersonLink: function (data, success, fail) { // 账号查询
    var url = '/security/erp/auth/person/queryPersonLink';
    return get(url, data, success, fail);
  },
  queryAuthTypeTree: function (data, success, fail) { // 菜单树查询
    var url = '/security/erp/auth/auth/queryAuthTypeTree';
    return get(url, data, success, fail);
  },
  batchSaveAuthType: function (data, success, fail) { // 批量菜单保存
    var url = '/security/erp/auth/auth/batchSaveAuthType';
    return post(url, data, success, fail);
  },
  saveAuthType: function (data, success, fail) { // 菜单保存
    var url = '/security/erp/auth/auth/saveAuthType';
    return post(url, data, success, fail);
  },
  deleteAuthType: function (data, success, fail) { // 菜单删除
    var url = '/security/erp/auth/auth/deleteAuthType';
    return post(url, data, success, fail);
  },
  pageQueryAuthLeaf: function (data, success, fail) { // 功能分页查询
    var url = '/security/erp/auth/auth/pageQueryAuthLeaf';
    return get(url, data, success, fail);
  },
  suretyStatusChange: function (data, success, fail) { // 更改人员在万通担保系统的状态
    var url = '/security/erp/auth/person/suretyStatusChange';
    return get(url, data, success, fail);
  },
  saveAuthLeaf: function (data, success, fail) { // 功能保存
    var url = '/security/erp/auth/auth/saveAuthLeaf';
    return post(url, data, success, fail);
  },
  deleteAuthLeaf: function (data, success, fail) { // 功能删除
    var url = '/security/erp/auth/auth/deleteAuthLeaf';
    return post(url, data, success, fail);
  },
  processnodeTemplate: function (data, success, fail) { // 流程节点分页查询事项模板
    var url = '/workflow/processnodeTemplate';
    return get(url, data, success, fail);
  },
  pageQueryPositionLink: function (data, success, fail) { // 岗位信息(数据授权分页查询)
    var url = '/security/erp/auth/position/pageQueryPositionLink';
    return get(url, data, success, fail);
  },
  pageQueryPosition: function (data, success, fail) { // 岗位管理分页查询
    var url = '/security/erp/auth/position/pageQueryPosition';
    return get(url, data, success, fail);
  },
  queryDataAuthTree: function (data, success, fail) {// 数据权限树查询(数据授权 点击出来的组织树)
    var url = '/security/open/dataAuth/queryDataAuthTree';
    return get(url, data, success, fail);
  },
  savePositionAuth: function (data, success, fail) { // 保存岗位菜单功能权限
    var url = '/security/erp/auth/position/savePositionAuth';
    return post(url, data, success, fail);
  },
  savePositionLinkDataAuth: function (data, success, fail) { // 保存岗位数据权限
    var url = '/security/erp/auth/position/savePositionLinkDataAuth';
    return post(url, data, success, fail);
  },
  // 合作方管理分页查询
  partnerPageQuery: function (data, success, fail) {
    var url = '/security/baseconfig/partner/pageQuery';
    return get(url, data, success, fail);
  },
  // 合作方管理保存
  partnerSave: function (data, success, fail) {
    var url = '/security/baseconfig/partner/save';
    return post(url, data, success, fail);
  },
  // 合作方管理启用/禁用
  partnerStatusChange: function (data, success, fail) {
    var url = '/security/baseconfig/partner/statusChange';
    return post(url, data, success, fail);
  },
  // 合作方删除
  partnerDeleteById: function (data, success, fail) {
    var url = '/security/baseconfig/partner/deleteById';
    return post(url, data, success, fail);
  },
  // 资料设置分页查询
  materialPageQuery: function (data, success, fail) {
    var url = '/security/baseconfig/material/pageQuery';
    return get(url, data, success, fail);
  },
  // 资料设置保存
  materialSave: function (data, success, fail) {
    var url = '/security/baseconfig/material/save';
    return post(url, data, success, fail);
  },
  // 资料设置删除
  materialDeleteById: function (data, success, fail) {
    var url = '/security/baseconfig/material/deleteById';
    return post(url, data, success, fail);
  },
  // 资料设置启用/禁用
  materialStatusChange: function (data, success, fail) {
    var url = '/security/baseconfig/material/statusChange';
    return post(url, data, success, fail);
  },
  // 单据分配设置分页查询
  intentionConfigPageQuery: function (data, success, fail) {
    var url = '/security/baseconfig/intentionConfig/pageQuery';
    return get(url, data, success, fail);
  },
  // 单据分配设置删除
  intentionConfigDeleteById: function (data, success, fail) {
    var url = '/security/baseconfig/intentionConfig/deleteById';
    return post(url, data, success, fail);
  },
  // 单据分配设置保存
  intentionConfigSave: function (data, success, fail) {
    var url = '/security/baseconfig/intentionConfig/save';
    return post(url, data, success, fail);
  },
  // 单据分配设置启用/禁用
  intentionStatusChange: function (data, success, fail) {
    var url = '/security/baseconfig/intentionConfig/statusChange';
    return post(url, data, success, fail);
  },
  // 资金方案删除
  fundRuleDeleteById: function (data, success, fail) {
    var url = '/security/baseconfig/fundRule/deleteById';
    return post(url, data, success, fail);
  },
  // 资方查询
  fundProviderPageQuery: function (data, success, fail) {
    var url = '/security/open/fundProvider/pageQuery';
    return get(url, data, success, fail);
  },
  // 资金方案管理分页查询
  fundRulePageQuery: function (data, success, fail) {
    var url = '/security/baseconfig/fundRule/pageQuery';
    return get(url, data, success, fail);
  },
  // 资金方案管理保存
  fundRuleSaveFundRule: function (data, success, fail) {
    var url = '/security/baseconfig/fundRule/saveFundRule';
    return post(url, data, success, fail);
  },
  // 资金方案管理启用/禁用
  fundRuleStatusChange: function (data, success, fail) {
    var url = '/security/baseconfig/fundRule/statusChange';
    return post(url, data, success, fail);
  },
  // 总行分页查询
  baseconfigFundProviderPageQuery: function (data, success, fail) {
    var url = '/security/baseconfig/fundProvider/pageQuery';
    return get(url, data, success, fail);
  },
  // 根据总行查询下属分行和支行
  queryAllChildByParent: function (data, success, fail) {
    var url = '/security/baseconfig/fundProvider/queryAllChildByParent';
    return get(url, data, success, fail);
  },
  // 资方管理保存
  fundProviderSave: function (data, success, fail) {
    var url = '/security/baseconfig/fundProvider/save';
    return post(url, data, success, fail);
  },
  // 资方管理启用/禁用
  fundProviderStatusChange: function (data, success, fail) {
    var url = '/security/baseconfig/fundProvider/statusChange';
    return post(url, data, success, fail);
  },
  // 资方管理删除
  fundProviderDeleteById: function (data, success, fail) {
    var url = '/security/baseconfig/fundProvider/deleteById';
    return post(url, data, success, fail);
  },
  // 资金账号管理分页查询
  fundAccountPageQuery: function (data, success, fail) {
    var url = '/security/baseconfig/fundAccount/pageQuery';
    return get(url, data, success, fail);
  },
  // 资金账号管理保存
  fundAccountSave: function (data, success, fail) {
    var url = '/security/baseconfig/fundAccount/save';
    return post(url, data, success, fail);
  },
  // 资金账号管理启用/禁用
  fundAccountStatusChange: function (data, success, fail) {
    var url = '/security/baseconfig/fundAccount/statusChange';
    return post(url, data, success, fail);
  },
  // 资金账号删除
  fundAccountDeleteById: function (data, success, fail) {
    var url = '/security/baseconfig/fundAccount/deleteById';
    return post(url, data, success, fail);
  },

  // 指令配置分页查询
  commandPageQuery: function (data, success, fail) {
    var url = '/security/baseconfig/command/pageQuery';
    return get(url, data, success, fail);
  },
  // 指令配置保存
  commandSave: function (data, success, fail) {
    var url = '/security/baseconfig/command/save';
    return post(url, data, success, fail);
  },
  // 资金方案管理启用/禁用
  commandStatusChange: function (data, success, fail) {
    var url = '/security/baseconfig/command/statusChange';
    return post(url, data, success, fail);
  },
  // 指令配置删除
  commandDeleteById: function (data, success, fail) {
    var url = '/security/baseconfig/command/deleteById';
    return post(url, data, success, fail);
  },
  // 业务类型名称查询, 用于担保导航菜单栏筛选条件
  queryBusinessTypeAllName: function (data, success, fail) {
    var url = '/security/open/businessType/queryBusinessTypeAllName';
    return get(url, data, success, fail);
  },
}
export default suretyInterface
