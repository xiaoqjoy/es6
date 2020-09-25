import { fileCos } from "@/common/js/fileCos";
let host = 'api';

if (process.env.NODE_ENV !== 'production') {
  // host = 'http://dsapp13.intsit.dsfdc.com:8106';
  // host = '/sit3/api'; // sit3环境
  host = fileCos.getHost()[1];
}
export default {
  role: {
    queryRole: host + '/ucss/v1/UserAuthorizationSystem/Roles',
    queryRoleMenu: host + '/ucss/v1/UserAuthorizationSystem/Roles/' // 角色详情表单
  },
  company: {
    queryCompany: host + '/ucss/v1/UserAuthorizationSystem/Organizations', // 分公司名称,编号模糊查询
    addCompany: host + '/ucss/v1/UserAuthorizationSystem/Organizations',
    editCompany: host + '/ucss/v1/UserAuthorizationSystem/Organizations' // 编辑分公司
  },
  serviceCenter: {
    getAllCenter: host + '/ucss/v1/UserAuthorizationSystem/Services', // 获取所有个贷服务中心
    queryService: host + '/ucss/v1/UserAuthorizationSystem/Services', // 个贷服务中心模糊查询
    add: host + '/ucss/v1/UserAuthorizationSystem/Services', // 新增个贷服务中心
    edit: host + '/ucss/v1/UserAuthorizationSystem/Services'
  },
  user: {
    getAllDepartments: host + '/ucss/v1/UserAuthorizationSystem/Departments', // 获取所有部门
    queryUser: host + '/ucss/v1/UserAuthorizationSystem/Users',
    getUserInfo: host + '/ucss/v1/UserAuthorizationSystem/Users/', // 由um账号获取用户信息
    getRoleInfo: host + '/ucss/v1/UserAuthorizationSystem/Users/', // 由um账号获取角色信息
    add: host + '/ucss/v1/UserAuthorizationSystem/Users',
    edit: host + '/ucss/v1/UserAuthorizationSystem/Users'
  }
};
