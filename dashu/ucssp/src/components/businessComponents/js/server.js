import { fileCos } from "@/common/js/fileCos";
let host = 'api/cpms';
if (process.env.NODE_ENV !== 'production') {
  host = fileCos.getHost()[1];
}

const faHaiApi = {
  searchApi: host + '/apr/taskDetail/fahai/fetch',
  queryApi: host + '/apr/taskDetail/fahai/data'
};

export {
  faHaiApi
};
