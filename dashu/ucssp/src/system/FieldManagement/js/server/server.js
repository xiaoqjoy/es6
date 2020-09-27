import { fileCos } from "@/common/js/fileCos";
let host = 'api/cpms';
if (process.env.NODE_ENV !== 'production') {
  // host = "http://dsapp135.sit.dashuf.com:8103";
  // host = "http://dsapp13.intsit.dsfdc.com:8103";
  // host = 'http://cpms.intdev.dsfdc.com:8080';
  // host = 'http://10.3.114.195:8080';
  host = fileCos.getHost()[1];
}

export default {
  user: { // 顶岗管理
    getflow: host + '/takeOver/task/list', // 获取流程环节
    foundList: host + '/product/found/list', // 资金方
    partnerList: host + '/product/partner/list', // 合作方
    businessList: host + '/takeOver/business/list', // 顶岗管理业务列表
    userList: host + '/takeOver/user/list', // 顶岗用户列表
    confirmList: host + '/takeOver/confirm', // 确定顶岗
    historyList: host + '/takeOver/list', // 顶岗记录列表
    opsList: host + '/takeOver/toops'// 调至OPS
  }
};
