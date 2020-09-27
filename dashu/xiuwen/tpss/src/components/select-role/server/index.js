/**
 * Created by liuzhe on 2018/11/12.
 */
let host = 'http://10.20.0.4:8080';

if (process.env.NODE_ENV !== 'production') {
  host = 'http://10.20.0.4:8080';
}
export default {
  setDepartment: host + '/ucss/v1/UserAuthorizationSystem/Login/Departments'
};
