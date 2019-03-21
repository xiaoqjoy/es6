import method from './method';
var get = method.get
var post = method.post
var suretyInterface = {
  processPage: function (data, success, fail) { // 分页查询所有生效的流程定义
    var url = '/security/workflow/process/processPage';
    return get(url, data, success, fail);
  },
  processDefinition: function (data, success, fail) { // 流程中心-保存或更新流程定义信息
    var url = ' /security/workflow/process/processDefinition';
    return post(url, data, success, fail);
  },
  pickFlowCenterNodeByName: function (data, success, fail) { // 流程配置-输入节点名称模糊查询节点中所有信息
    var url = '/security/workflow/node/pickFlowCenterNodeByName';
    return get(url, data, success, fail);
  },
  pickFlowCenterAllNode: function (data, success, fail) { // 担保导航-查出所有子节点信息
    var url = '/security/workflow/node/pickFlowCenterAllNode';
    return get(url, data, success, fail);
  },
  pickProcessDefinitionByBizCod: function (data, success, fail) { // 根据流程bizCod查询流程定义
    var url = '/security/workflow/process/pickProcessDefinitionByBizCod';
    return get(url, data, success, fail);
  },
  subNodeTemplate: function (data, success, fail) { // 流程配置-保存子流程节点模板信息
    var url = '/security/workflow/node/subNodeTemplate';
    return post(url, data, success, fail);
  },
  queryTaskOfCurrentPerson: function (data, success, fail) { // 查询当前登录人的所有任务分页接口
    var url = '/security/workflow/workflowapprove/queryTaskOfCurrentPerson';
    return get(url, data, success, fail);
  },
  nodeTemplate: function (data, success, fail) { //流程配置-分页查询节点模板信息
    var url = '/security/workflow/node/nodeTemplate';
    return get(url, data, success, fail);
  },
  itemTemplate: function (data, success, fail) { // 分页查询事项模板
    var url = '/security/workflow/item/itemTemplate';
    return get(url, data, success, fail);
  },
}
export default suretyInterface
