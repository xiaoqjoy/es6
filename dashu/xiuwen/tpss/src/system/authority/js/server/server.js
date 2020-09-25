let host = 'api';

if (process.env.NODE_ENV !== 'production') {
  host = 'http://dsapp13.intsit.dsfdc.com:8080/tpss/api';
}
export default {
  role: {
    queryRole: host + '/tcss/v1/ThirdPartyUserAuthorizationSystem/Roles/', // 根据角色编号获取菜单及页面
    queryRoleMenu: host + '/tcss/v1/ThirdPartyUserAuthorizationSystem/Roles', // 角色详情表单
    editRole: host + '/tcss/v1/ThirdPartyUserAuthorizationSystem/Roles' // 修改角色
  },
  company: {
    queryCompany: host + '/tcss/v1/ThirdPartyUserAuthorizationSystem/Organizations', // 分公司名称,编号模糊查询
    addCompany: host + '/tcss/v1/ThirdPartyUserAuthorizationSystem/Organizations',
    editCompany: host + '/tcss/v1/ThirdPartyUserAuthorizationSystem/Organizations', // 编辑分公司
    queryCompanyByArea: host + '/tcss/v1/ThirdPartyUserAuthorizationSystem/Organizations/ByAreaList' // 由区域获取分公司
  },
  serviceCenter: {
    getAllCenter: host + '/tcss/v1/ThirdPartyUserAuthorizationSystem/Services', // 获取所有个贷服务中心
    add: host + '/tcss/v1/ThirdPartyUserAuthorizationSystem/Services', // 新增个贷服务中心
    edit: host + '/tcss/v1/ThirdPartyUserAuthorizationSystem/Services', // 编辑个贷服务中心
    queryServiceCenterByArea: host + '/tcss/v1/ThirdPartyUserAuthorizationSystem/Services/ByAreaList' // 获取个贷服务中心由区域
  },
  user: {
    getAllDepartments: host + '/tcss/v1/ThirdPartyUserAuthorizationSystem/Departments', // 获取所有部门
    getUserByDepartment: host + '/tcss/v1/ThirdPartyUserAuthorizationSystem/Departments/Users', // 获取部门下的用户
    queryUser: host + '/tcss/v1/ThirdPartyUserAuthorizationSystem/Users', // 模糊查询用户
    getUserInfo: host + '/tcss/v1/ThirdPartyUserAuthorizationSystem/Users/', // 由um账号获取用户信息
    getRoleInfo: host + '/tcss/v1/ThirdPartyUserAuthorizationSystem/Users/', // 由um账号获取角色信息
    add: host + '/tcss/v1/ThirdPartyUserAuthorizationSystem/Users',
    edit: host + '/tcss/v1/ThirdPartyUserAuthorizationSystem/Users',
    userGetRole: host + '/tcss/v1/ThirdPartyUserAuthorizationSystem/Users/', // 用户授权角色 + {userId}/Roles
    queryServiceByUser: host + '/tcss/v1/ThirdPartyUserAuthorizationSystem/Users/' // 根据UM用户名获取个贷服务中心 + {userId}/Services
  }
};
