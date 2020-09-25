/**
 * Created by liuzhe on 2018/12/6.
 */
let host = 'api/cpms';
let host2 = 'api';
if (process.env.NODE_ENV !== 'production') {
  host = 'http://10.1.114.72:8080';
  // host2 = 'http://10.20.0.4:8080';
}

const api = {
  getTableList: host + '/accompanies',
  getDetail: host, // 由编码获取详情;
  delete: host + '/accompany/delete', // 删除
  add: {
    getAllDepartments: host2 + '/ucss/v1/UserAuthorizationSystem/Departments', // 获取所有可用部门
    queryUser: host2 + '/ucss/v1/UserAuthorizationSystem/Users',
    save: host + '/accompany/save', // 新增
    update: host + '/accompany/update' // 修改,
  }
};

module.exports = api;
