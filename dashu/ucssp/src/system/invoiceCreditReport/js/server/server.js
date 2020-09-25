import { fileCos } from "@/common/js/fileCos";
let host = 'api/cpms';
if (process.env.NODE_ENV !== 'production') {
  host = fileCos.getHost()[1];
  // host = 'sit3/api/cpms';
  // host = 'uat/api/cpms';
  host = "http://yapi.dashuf.com/mock/30";
  // host = "http://yapi.dashuf.com/mock/320";
  // host = "http://10.3.114.153:8080";
  // host = "http://10.21.3.62:8080";
}

export default {
  nuonuoInvoice: host + "/channel/nuonuo/invoice-data",
  kingdeeInvoice: host + "/channel/kingdee/invoice",
  chanjetInvoice: host + "/channel/chanjet/invoice",
  dcgInvoice: host + "/channel/dcg/invoice",
  channel: host + "/channel"
};
