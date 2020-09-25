let xx = "http://10.20.0.4:8080";
let host = "http://10.1.114.118:8081";
let host1 = "http://10.1.114.118:8084";
let host2 = "http://10.1.114.118:8082";
let x1 = "api/cpms";
if (process.env.NODE_ENV !== 'production') {
  x1 = 'http://dsapp13.intsit.dsfdc.com:8103'; // 测试地址
  // xx = 'http://cpms.dev.dashuf.com:8080'; // 服务器地址
}
const creditApi = {
  // 征信权限管理岗位名称下拉框
  roles: xx + "/ucss/v1/UserAuthorizationSystem/Roles", // 岗位名称模糊搜索
  // 征信权限管理
  addRoleTemplate: host + "/api/role_template_relation", // 征信权限新增
  export: host + "/api/export", // 征信权限列表导出
  querydate: host + "/api/querydate_status", // 征信权限编辑
  roleTemplate: host + "/api/role_template_relation", // 征信权限查询列表
  // 征信权限模板
  template: host1 + "/api/template_config", // 征信权限模板修改
  template_config: host1 + "/api/template_config/{templateNo}", // 通过模板编号获取征信权限模板配置
  // 黑盒子接口
  crrService: host2 + "/api/CrrService/bbm/deletePartner.do", // 黑盒子删除
  partnerBbm: host2 + "/api/CrrService/bbm/partner", // 获取所有机构数据
  download: host2 + "/api/CrrService/bbm/download.do", // 黑盒子下载
  editPartnerConfig: host2 + "/api/CrrService/bbm/editPartnerConfig.do", // 规则配置
  getPartnerConfig: host2 + "/api/CrrService/bbm/getPartnerConfig.do", // 根据机构编号获取配置
  partnerNo: host2 + "/api/CrrService/bbm/partner", // 通过机构编号获取机构
  partnerlist: host2 + "/api/CrrService/bbm/page.do", // 黑盒子查询列表
  savePartner: host2 + "/api/CrrService/bbm/savePartner.do", // 黑盒子新增/修改
  showImage: host2 + "/api/CrrService/showImage.do", // 通过fileId获取图片流
  uploadImage: host2 + "/api/CrrService/uploadImage.do", // 黑盒子logo图片上传
  // 产品工厂的接口
  partner: x1 + "/product/partner/list" // 产品工厂合作机构
};

export {
  creditApi
};
