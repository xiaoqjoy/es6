let host = 'api/cpms';

if (process.env.NODE_ENV !== 'production') {
  // host = 'http://cpms.intdev.dsfdc.com:8080';
  // host = 'http://dsapp13.intsit.dsfdc.com:8106/cpms';
  // host = 'http://dsapp13.intsit.dsfdc.com:8103';
  host = 'http://dsapp13.intsit.dsfdc.com:8108/cpms';
  // host = 'http://10.3.113.81:8080';
  // host = 'http://10.1.114.157:8080';
}
const patchApi = {
  commonSelect: host + '/common/selection/all',
  dispose: {
    newTasksPut: host + '/cpms/v1/supplement-information/new-tasks', // put
    newTasks: host + '/cpms/v1/supplement-information/new-tasks/third', // 获取待处理任务
    handledTasks: host + '/cpms/v1/supplement-information/handled-tasks', // 获取已处理任务
    patchReview: host + '/cpms/v1/supplement-information/patchReview/info', // 获取补件信息
    coowner: host + '/cpms/v1/supplement-information/estate-coowner-information', // 共有产权人
    guarantees: host + '/cpms/v1/supplement-information/estate-guarantees-information', // 担保人
    estate: host + '/cpms/v1/supplement-information/estate-num-list' // 获取房产证号
},
  review: {
    pending: host + '/cpms/v1/supplement-information/pending/list', // 待处理列表
    processed: host + '/cpms/v1/supplement-information/processed/list', // 已处理列表
    rollback: host + '/cpms/v1/supplement-information/rollback/info', // 提交退回原因
    submit: host + '/cpms/v1/supplement-information/submit/info', // 提交
    patchReview: host + '/cpms/v1/supplement-information/patchReview/save' // 详情按钮
  }
};
export {
  patchApi
};
