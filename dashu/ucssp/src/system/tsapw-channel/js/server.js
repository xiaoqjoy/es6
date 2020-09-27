import { fileCos } from "@/common/js/fileCos";
let path = "api";
if (process.env.NODE_ENV !== 'production') {
  path = fileCos.getHost()[0]; // 测试地址
  // path = 'http://10.21.3.242:8080';
}
const partnerApi = {
  banner: path + "/tsap/site/manage/index/banners",
  products: path + "/tsap/site/manage/index/products",
  dictPrimaryProduct: path + "/tsap/site/manage/dict/primary_product",
  dictProductFlowModel: path + "/tsap/site/manage/dict/product_flow_model",
  notes: path + "/tsap/site/manage/index/notes"
};

const loanApi = {
  getChannelList: path + "/cpms/innovation-platform/getInnovationChannelList",
  getChannel: path + "/cpms/innovation-platform/getChannelConfig",
  addChannel: path + "/cpms/innovation-platform/addChannelConfig",
  updateChannel: path + "/cpms/innovation-platform/updateChannelConfig"
};

const thirdApi = {
  updateStatus: path + "/tsap/site/manage/channels",
  getChannels: path + "/tsap/site/manage/channels",
  addChannel: path + "/tsap/site/manage/channels",
  getChannel: path + "/tsap/site/manage/channels"
};

const blazeApi = {
  getChannel: path + "/de-frontinterface/api/queryChannel",
  addChannel: path + "/de-frontinterface/api/addNewChannelConfig"
};

const ecnApi = {
  getChannel: path + "/tsap/site/manage/channels/rongdan",
  addChannel: path + "/tsap/site/manage/channels/rongdan"
};

const creditApi = {
  getChannel: path + "/szsbcreditreportgain/api/thirdChannelConfig/queryThirdChannelConfig",
  addChannel: path + "/szsbcreditreportgain/api/thirdChannelConfig/addThirdChannelConfig",
  updateChannel: path + "/szsbcreditreportgain/api/thirdChannelConfig/updateThirdChannelConfig"
};
const appApi = {
  getChannel: path + "/laapp/laapp/v1/reservation/queryConfigByChannel",
  addChannel: path + "/laapp/laapp/v1/reservation/addOrUpdateChannel"
};

const fundApi = {
  getChannel: path + "/blri-bankloanrepayapi/api/queryOnlineChannelConfig.do",
  addChannel: path + "/blri-bankloanrepayapi/api/syncOnlineChannelConfig.do"
};

export {
  partnerApi,
  loanApi,
  thirdApi,
  blazeApi,
  ecnApi,
  creditApi,
  appApi,
  fundApi
};
