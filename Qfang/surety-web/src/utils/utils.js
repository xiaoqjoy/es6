import Vue from 'vue';
// 定义统一的时间处理函数
Vue.prototype.formatDate = function (time) {
  if (!time) { return '' }
  var date = new Date(time);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var newTime = year + '-' +
    month + '-' +
    day;
  return newTime;
};

Vue.prototype.confirm = function (txt, f, callback) {
  this.$confirm(txt, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    center: true
  }).then(() => {
    callback();
    this.$message({
      type: 'success',
      message: f + '成功!'
    });
  }).catch(() => {
    this.$message({
      type: 'info',
      message: '已取消' + f
    });
  });
};
