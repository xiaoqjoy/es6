const getOperateCls = function(type) {
  switch (type) {
    case 'TASK_GENERATE':
    case 'TASK_ASSIGN':
    case 'START_PAINT':
      return 'ongoing';
    case 'SAVE_DRAFT':
    case 'SUBMIT':
    case 'APPROVED_OK':
      return 'finish';
    case 'APPROVED_FAIL':
    case 'TASK_TAKE_BACK':
    case 'TASK_TAKE_BACK_APPROVE':
      return 'wait';
  }
};

const formatOperate = function(data) {
  let cls = getOperateCls(data.operateType);
  let content = data.content.replace(data.keywords, '@#$').split('@#$');
  return content[0] + '<span class="' + cls + '">' + data.keywords + '</span>' + content[1];
};

export default {
  formatOperate: formatOperate
};
