/**
 * Created by liuzhe on 2018/11/10.
 */
let host = 'api';

if (process.env.NODE_ENV !== 'production') {
  // host = 'http://dsapp13.intsit.dsfdc.com:8080/h5/api';
  // host = 'http://dsapp18.intuat.dsfdc.com/h5/api';
  // host = 'http://dsapp135.sit.dashuf.com/h5/api'; // ST3环境
  // host = 'http://dsapp57.intsit.dsfdc.com:8080/h5/api'; // 修文环境
}
// host = 'http://dsapp13.intsit.dsfdc.com:8080/h5/api';
export default {
  login: host + '/ucss/v1/UserAuthorizationSystem/Login',
  setDepartment: host + '/ucss/v1/UserAuthorizationSystem/Login/Departments',
  quit: host + '/ucss/v1/UserAuthorizationSystem/Login/logout', // 退出登录
  changePsd: host + '/ucss/v1/UserAuthorizationSystem/Login/Password', // 修改密码
  getPublicKey: host + '/ucss/v1/UserAuthorizationSystem/Login/PublicKey', // 获取公钥
  checkToken: host + '/ucss/v1/UserAuthorizationSystem/Login/Token' // 验证token是否有效
};
