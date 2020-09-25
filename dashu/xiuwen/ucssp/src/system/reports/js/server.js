let host = "api/rtrs";

if (process.env.NODE_ENV !== "production") {
  // host = "http://yapi.dashuf.com/mock/48";
  // host = "http://10.20.0.17:8282";
  // host = "http://10.3.114.52:8080";
  // host = "http://10.3.113.123:8080";
}

const reportsApi = {
  reports: host + "/reports/{reportCode}",
  export: host + "/reports/{reportCode}/export",
  query: host + "/reports/{reportCode}/queries",
  select: host + "/reports/select/{categoryCode}"
};

export {
  reportsApi
};
