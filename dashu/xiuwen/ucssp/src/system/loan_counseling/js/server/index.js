/**
 * Created by liuzhe on 2018/12/29.
 */
let host = 'api/cpms';
if (process.env.NODE_ENV !== 'production') {
  host = 'http://10.3.113.82:8080';
}
const api = {
  check: host + '/api/v1/queryAmount',
  commonSelect: host + '/common/selection',
  productList: host + '/product/topBusinessType/list', // 一级产品
  partnerList: host + '/partner/queryPartnerInfoList', // 意向合作机构
  querySysDictItem: host + '/api/v1/querySysDictItem' // 证件类型
};

module.exports = api;
