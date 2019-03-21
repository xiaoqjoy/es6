import method from './method';
var get = method.get
var suretyInterface = {
  login: function (data, success, fail) {// 示例
    var url = '/login/login';
    return get(url, data, success, fail);
  },
  logOut: function (data, success, fail) {
    var url = '/login/logOut';
    return get(url, data, success, fail);
  },
  pageQueryPerson: function (data, success, fail) { // 查询分页人员信息
    var url = '/security/open/person/pageQueryPerson';
    return get(url, data, success, fail);
  },
  accountTypeEnum: function (data, success, fail) { // 账号类型枚举
    var url = '/security/open/enum/accountTypeEnum';
    return get(url, data, success, fail);
  },
  queryAuthTree: function (data, success, fail) { // 权限树查询
    var url = '/security/open/auth/queryAuthTree';
    return get(url, data, success, fail);
  },
  queryFollowerAndDeclarerCodeByCityOrg: function (data, success, fail) { // 根据指定城市组织ID查询跟单员和报单员岗位编码
    var url = '/security/open/constant/queryFollowerAndDeclarerCodeByCityOrg';
    return get(url, data, success, fail);
  },
  queryOrgTreeByPosition: function (data, success, fail) { // 查城市
    var url = '/security/open/org/queryOrgTreeByPosition';
    return get(url, data, success, fail);
  },
  queryOrgTree: function (data, success, fail) { // 根据指定的根查询所有指定类型的下级组织，而且会带出所有的父亲节点
    var url = '/security/open/org/queryOrgTree';
    return get(url, data, success, fail);
  },
}
export default suretyInterface
