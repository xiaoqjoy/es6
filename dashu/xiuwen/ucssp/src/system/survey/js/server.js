import { fileCos } from "@/common/js/fileCos";
let host = 'api/cpms';
let host2 = fileCos.getFileHost() + '/ftb/api';
let host3 = 'api';
// let host = 'http://dsapp13.intsit.dsfdc.com:8080/h5/api/cpms'; // 测试环境
if (process.env.NODE_ENV !== 'production') {
  // host = 'http://10.3.114.203:8080';
  host2 = fileCos.getFileHost() + '/ftb/api';
  // host2 = 'http://dsapp17.dev.dashuf.com:8113'; // 文件平台
  // host = 'http://dsapp57.intsit.dsfdc.com:8080/h5/api/cpms';
}
const surveyApi = {
  // getServiceList: host3 + "/ucss/v1/UserAuthorizationSystem/Services", // 用户模块处理中心列表
  getServiceList: host3 + "/ucss/v1/UserAuthorizationSystem/Organizations", // 用户模块处理中心列表
  newFile: host2 + "/ftb/v1/newfile", // 上传/文件
  fileUpload: host + "/survey/pad/file/upload", // 上传记录
  fileList: host + "/survey/pad/file/upload/check", // 文件列表
  fileDelete: host + "/survey/pad/file/delete", // 删除已上传的文件
  managerList: host + "/survey/task/managers", // 调查经理任务列表数据接口
  allocatingList: host + "/survey/task/directors", // 调查管理者任务列表数据接口
  surveyTaskDetails: host + "/survey/task/details/", // 调查详情，参数surveyId拼接
  surveyTaskDetails1: host + "/survey/task/details1/",
  surveyTaskDetails2: host + "/survey/task/details2/",
  surveyTaskDetails3: host + "/survey/task/details3/",
  surveyTaskDetails4: host + "/survey/task/details4/",
  surveyTaskDetails5: host + "/survey/task/details5/",
  surveyTaskDetails6: host + "/survey/task/details6/",
  surveyTaskDetails7: host + "/survey/task/details7/",
  surveyTaskDetails8: host + "/survey/task/details8/",
  surveyTaskDetails9: host + "/survey/task/details9/",
  reserveSave: host + "/survey/task/reserve/save", // 保存/提交 预约信息接口
  taskReturn: host + "/survey/task/return", // 退回调查接口
  taskAllacats: host + "/survey/task/allocats", // 任务分配列表
  taskAllocatSubmit: host + "/survey/task/allocat/submit", // 任务分配
  surveyCheck: host + "/survey/task/surveyReport/check", // 调查复核
  surveyRules: host + "/survey/config/rules", // 调查规则
  surveyRulesUpdate: host + "/survey/config/rule/update", // 调查规则更新
  surveyAreas: host + "/survey/config/areas", // 商圈配置列表
  areaMeger: host + "/survey/config/areas/meger", // 商圈配置信息新增、修改
  industrysConfig: host + "/survey/config/industrys", // 行业列表
  industrysMeger: host + "/survey/config/industry/meger", // 一级、二级行业信息修改
  fieldsConfig: host + "/survey/config/fields", // 标准字段列表
  fieldsUpdate: host + "/survey/config/field/meger", // 修改标准字段配置
  surveyFieldConfig: host + "/survey/config/field/config", // 前端字段配置
  bossReportSave: host + "/survey/task/bossReport/save", // 自雇报告录入
  staffReportSave: host + "/survey/task/staffReport/save", // 受薪报告录入
  getsurveyReport: host + "/survey/task/surveyReport/get/" // 获取调查报告 参数surveyId拼接
};
// 审计审批模块数据来源
const aprAudApi = {
  attentionInfo: host + "/apr/taskDetail/attentionInfo/record", // 关注信息检测
  taskDetail: host + "/aud/taskDetail" // 历史贷款信息
};
export {
  surveyApi,
  aprAudApi
};
