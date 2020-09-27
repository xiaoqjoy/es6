import {fileCos} from '../../../common/js/fileCos';
// let host = 'http://dsapp13.intsit.dsfdc.com:8103';
let host = 'api/cpms';
if (process.env.NODE_ENV !== 'production') {
  // host = 'http://dsapp18.intuat.dsfdc.com/h5/api/cpms';
  // host = 'http://dsapp13.intsit.dsfdc.com:8080/h5/api/cpms';
  // host = 'http://10.3.113.66:8080';

  // host = '/sit3/api/cpms'; // sit3环境
  // host = '/sit3/api/cpms'; // sit3环境
  // host3 = '/sit3/api/cpms'; // sit3环境
  host = fileCos.getHost()[1];
  // host = 'http://10.3.113.158:8080'; // 本地
}

const faHaiApi = {
  queryDetail: host + '/apr/taskDetail/fahai/detail'
};

export {faHaiApi};
