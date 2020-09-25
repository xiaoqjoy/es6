let host = "api/rtrs";
let host2 = "api/de-monitor";

if (process.env.NODE_ENV !== "production") {
  // host = "http://yapi.dashuf.com/mock/48";
  // host = "http://10.3.114.28:8888";
  // host = "http://10.3.114.52:8080";
  // host = "http://10.3.113.123:8080";
  // host2 = "http://10.3.114.28:8888";
  // host = "http://10.3.114.45:9999";
}

const reportsApi = {
  reports: host + "/reports/{reportCode}",
  export: host + "/reports/{reportCode}/export",
  query: host + "/reports/{reportCode}/queries",
  select: host + "/reports/select/{categoryCode}",
  monitorReportQuery: host2 + "/api/monitorReportQuery",
  monitorReportexport: host2 + "/api/export",
  getCascadeCode: host2 + "/api/getCascadeCode"
};

export {
  reportsApi
};
