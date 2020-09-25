import { fileCos } from "@/common/js/fileCos";
let host = 'api/cpms';

if (process.env.NODE_ENV !== 'production') {
  host = fileCos.getHost()[1];
}

const customerConfigApi = {
  list: host + '/cs/exchange/application/list',
  save: host + '/cs/exchange/save',
  exchangeSave: host + '/cs/batch/exchange/save',
  userInfoList: host + '/user/userInfo/list'
};

export {
  customerConfigApi
};
