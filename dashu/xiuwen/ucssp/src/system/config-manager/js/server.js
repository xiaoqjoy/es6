let xx = "api/cpms";
// let xx = "http://dsapp13.intsit.dsfdc.com:8103";
// let xx = "http://10.3.121.202:8080"; // 本地地址
if (process.env.NODE_ENV !== 'production') {
   xx = 'http://dsapp13.intsit.dsfdc.com:8103'; // 测试地址
   xx = 'http://dsapp18.intuat.dsfdc.com:8103'; // UAT地址
  //  xx = 'http://cpms.dev.dashuf.com:8080'; // 服务器地址
  // xx = 'http://10.3.114.211:8080'; // 本地地址
}
const configApi = {
  // 审批业务分配
  approver_list: xx + "/apr/config/approver/list", // 查询审批人员列表
  approver_save: xx + "/apr/config/approver/save", // 保存审批人员
  approver_takeOverUsers: xx + "/apr/config/approver/takeOverUsers", // 查询对接人列表
  businessLimit_change: xx + "/apr/config/businessLimit/changeStatus", // 停用或启用业务量限制
  businessLimit_list: xx + "/apr/config/businessLimit/list", // 查询业务量限制列表
  businessLimit_save: xx + "/apr/config/businessLimit/save", // 保存业务量限制
  businessPriority_change: xx + "/apr/config/businessPriority/changeStatus", // 停用或启用业务优先配置
  businessPriority_column: xx + "/apr/config/businessPriority/column/detail", // 业务优先配置字段详情分类
  businessPriority_columns: xx + "/apr/config/businessPriority/columns", // 业务优先配置字段列表
  businessPriority_detail: xx + "/apr/config/businessPriority/detail", // 查询业务优先配置详情
  businessPriority_list: xx + "/apr/config/businessPriority/list", // 查询审批业务优先配置列表
  businessPriority_save: xx + "/apr/config/businessPriority/save", // 保存业务优先配置
  // 审批人员管理配置
  aprModelInfo_change: xx + "/apr/config/aprModelInfo/changeStatus", // 停用或启用审批模型
  aprModelInfo_detail: xx + "/apr/config/aprModelInfo/detail", // 查询审批模型详情
  aprModelInfo_list: xx + "/apr/config/aprModelInfo/list", // 查询审批模型列表
  aprModelInfo_save: xx + "/apr/config/aprModelInfo/save", // 保存审批模型
  modelUser_change: xx + "/apr/config/modelUser/changeStatus", // 停用或启用授权人员
  modelUser_list: xx + "/apr/config/modelUser/list", // 查询授权人员列表
  modelUser_save: xx + "/apr/config/modelUser/save", // 保存授权人员
  first_class_product: xx + "/product/topBusinessType/list", // 一级产品
  modeler_rolecpms: xx + "/apr/config/role/list", // 模型角色
  modeler_username: xx + "/apr/config/modelUser/userNameAndModels", // 查询用户名和可选模型
  // 审批操作配置
  levelone_changeStatus: xx + "/apr/config/operationConfig", // 启用或停用配置
  levelone_checkAndSave: xx + "/apr/config/operationConfig", // 复核并保存配置
  levelone_checkModify: xx + "/apr/config/operationConfig", // 查询是否有新增或修改
  levelone_effectiveLevelOne: xx + "/apr/config/operationConfig", // 查询一级下拉框
  levelone_effect: xx + "/apr/config/operationConfig", // 否决原因新增页面提示内容下拉框
  levelone_levelOne: xx + "/apr/config/operationConfig", // 查询单级配置列表
  levelone_levelTwo: xx + "/apr/config/operationConfig", // 查询双级配置列表
  operationConfig_newLevel: xx + "/apr/config/operationConfig", // 新纪录编号第一级
  operationConfig_save: xx + "/apr/config/operationConfig", // 保存单级配置
  operationConfig_revokeSave: xx + "/apr/config/operationConfig", // 撤销保存
  operationConfig_twoLevel: xx + "/apr/config/operationConfig", // 保存双级配置
  // 审计进件规则配置
  audit_columns: xx + "/apr/config/auditIngressRule/columns", // 审计进件规则字段列表
  audit_delete: xx + "/apr/config/auditIngressRule/delete", // 删除审计进件规则
  audit_detail: xx + "/apr/config/auditIngressRule/detail", // 审计进件规则详情
  audit_list: xx + "/apr/config/auditIngressRule/list", // 查询审计进件规则列表
  audit_RecordNum: xx + "/apr/config/auditIngressRule/newRecordNum", // 新纪录编号
  audit_save: xx + "/apr/config/auditIngressRule/save", // 保存审计进件规则
  details_category: xx + "/apr/config/auditIngressRule/column/detail", // 审计进件规则字段详情分类
  risklevel: xx + "/apr/businessList/risklevel/list"
};

export {
  configApi
};
