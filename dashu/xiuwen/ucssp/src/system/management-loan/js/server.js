let xx = "api/cpms";
if (process.env.NODE_ENV !== 'production') {
  //  xx = 'http://dsapp13.intsit.dsfdc.com:8103'; // 测试地址
  //  xx = 'http://dsapp18.intuat.dsfdc.com:8103'; // 测试地址
   xx = 'http://10.3.113.5:8080'; // 本地地址
}
const loanApi = {
  // 远程中心档案调整配置列表页面
  archives_config: xx + "/archives/config", // 查询远程档案中心列表頁面-调整操作
  archives_config_restore: xx + "/archives/config/restore", // 查询远程档案中心列表頁面-恢复操作
  archives_configs: xx + "/archives/configs", // 查询远程档案中心调整配置数据列表
  archives_org: xx + "/archives/org", // 查询远程档案中心列表頁面-分公司下拉数据
  archives_service: xx + "/archives/service", // 查询远程档案中心列表頁面-处理中心下拉数据
  archivesService_exclude: xx + "/archives/service/exclude", // 查询远程档案中心列表頁面-处理中心下拉数据(排除当前处理中心)
  // 档案制作/档案复核
  archives_archives: xx + "/archives/archives", // 档案制作/档案复核列表数据
  archives_cancel: xx + "/archives/cancel", // 档案制作/复核页面关闭按钮
  archives_commit: xx + "/archives/commit", // 档案制作/复核提交
  archives_detail: xx + "/archives/detail", // 档案制作、复核列表(待处理/已处理)-点击详情
  image_archives: xx + '/archives/image/archives',
  image_commit: xx + '/archives/image/commit',
  archives_exist: xx + "/archives/image/exist" // 是否影像
};

export {
  loanApi
};
