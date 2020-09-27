/**
 * Created by liuzhe on 2018/11/10.
 */
import { fileCos } from "@common/js/fileCos.js";
let host = 'api';

if (process.env.NODE_ENV !== 'production') {
  // host = 'http://dsapp13.intsit.dsfdc.com:8080/tpss/api';
  // host = 'http:///dsapp18.intuat.dsfdc.com:8080/tpss/api';
  // host = '/uat/api'; // uat环境
  host = fileCos.getHost()[0];
}
export default {
  login: host + '/tcss/v1/ThirdPartyUserAuthorizationSystem/Login',
  setDepartment: host + '/tcss/v1/ThirdPartyUserAuthorizationSystem/Login/Departments',
  changePsd: host + '/tcss/v1/ThirdPartyUserAuthorizationSystem/Login/Password', // 修改密码
  getPublicKey: host + '/tcss/v1/ThirdPartyUserAuthorizationSystem/Login/PublicKey', // 获取公钥
  checkToken: host + '/tcss/v1/ThirdPartyUserAuthorizationSystem/Login/Token', // 验证token是否有效
  quit: host + '/tcss/v1/ThirdPartyUserAuthorizationSystem/Login/logout' // 退出登录
};
