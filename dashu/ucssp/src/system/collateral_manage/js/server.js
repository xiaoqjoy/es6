import { fileCos } from "@/common/js/fileCos";
let host = "api/cpms";
let host6 = 'api/ucss';
let host3 = fileCos.getFileHost() + '/ftb/api';
if (process.env.NODE_ENV !== "production") {
  host = fileCos.getHost()[1];
  host6 = fileCos.getHost()[4];
  // console.log(host);
}

const collateralApi = {
  queryList: host + '/mortgage/review/list',
  otherList: host + '/mortgage/other/list',
  mortageDetail: host + '/mortgage/review/details',
  uploadDetail: host + '/mortgage/other/details',
  submit: host + '/mortgage/review/submit',
  submitUpload: host + '/mortgage/other/upload',
  upload: host + '/mortgage/other/upload',
  multipleSelect: host + '/common/selection/all/params',
  Organizations: host6 + '/v1/UserAuthorizationSystem/Organizations', // 分公司
  id2Url: host3 + '/ftb/v1/id-to-url'
};

export {
  collateralApi
};
