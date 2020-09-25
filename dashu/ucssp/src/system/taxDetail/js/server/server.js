let host = 'api/cpms';
if (process.env.NODE_ENV !== 'production') {
  // host = 'sit3/api/cpms';
  // host = 'uat/api/cpms';
  // host = "http://yapi.dashuf.com/mock/30";
  // host = "http://yapi.dashuf.com/mock/320";
  // host = "http://10.3.113.41:8080";
}

export default {
  cbhb: host + "/channel/cbhb/addition"
};
