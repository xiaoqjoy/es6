import { fileCos } from "@/common/js/fileCos";
let host = 'api/cpms';
if (process.env.NODE_ENV !== 'production') {
  host = fileCos.getHost()[1];
}
const legalInfoApi = {
  imageDownLoad: host + '/image/dowm-load/info'
};

export {
  legalInfoApi
};
