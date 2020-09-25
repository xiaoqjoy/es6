/**
 * Created by liuzhe on 2018/11/10.
 */
import { fileCos } from '../../../common/js/fileCos';
let host = 'api';

if (process.env.NODE_ENV !== 'production') {
  //  host = 'http://dsapp13.intsit.dsfdc.com:8080/h5/api';
  // host = '/uat/api'; // uat环境
  // host = '/sit3/api'; // ST3环境
  // host = 'http://dsapp18.intuat.dsfdc.com/h5/api';
  host = fileCos.getHost()[0];
}
// host = 'http://dsapp13.intsit.dsfdc.com:8080/h5/api';
export default {
  login: host + '/ucss/v1/UserAuthorizationSystem/Login',
  setDepartment: host + '/ucss/v1/UserAuthorizationSystem/Login/Departments',
  quit: host + '/ucss/v1/UserAuthorizationSystem/Login/logout', // 退出登录
  verifyCode: host + '/ucss/v1/UserAuthorizationSystem/GraphicVerificationCode'
};
