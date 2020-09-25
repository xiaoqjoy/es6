let host = "api/cpms";
if (process.env.NODE_ENV !== 'production') {
	// host = "http://10.3.114.47:8080";
  host = 'http://10.3.114.11:8080';
}
const authorizationApi = {
	// 查询征信授权待处理列表
	pendingList: host + "/userMgnt/creditAuth/pending/list",
	// 下拉框信息接口方法1
	commonSelection: host + "/common/selection",
	// 新增关联人
	relatedInfo: host + "/userMgnt/creditAuth/related/info",
	// 查询征信授权已处理列表
	processedList: host + "/userMgnt/creditAuth/processed/list",
	// 新增授权人列表
	relatedList: host + "/userMgnt/creditAuth/related/list",
	// 查询征信授权回退处理列表
	rollbackList: host + "/userMgnt/creditAuth/rollback/list",
	// 删除新增授权人
	delInfo: host + "/userMgnt/creditAuth/related/del/info",
	// 征信回退操作
	rollbackProcessed: host + "/userMgnt/creditAuth/rollback/processed",
	// 查询征信授权处理项
	creditAuthInfo: host + "/userMgnt/creditAuth/info"
};

export {
	authorizationApi
};
