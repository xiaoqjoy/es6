import { fileCos } from "@/common/js/fileCos";
let host = "api/pfcs";
let host2 = fileCos.getFileHost() + '/ftb/api';
// let host = "http://10.21.0.13:8101";
if (process.env.NODE_ENV !== 'production') {
	// host = 'http://10.1.114.132:9090';
	host = 'http://10.3.114.69:8081'; // 刘超
	// host = 'http://10.3.113.219:8081'; // 黄保华
	// host = 'http://10.3.113.225:8080'; // 思婷
	host2 = fileCos.getFileHost() + '/ftb/api'; // 文件平台
// host = 'http://10.1.114.84:8080';
}
const poductApi = {
	newFile: host2 + "/ftb/v1/newfile", // 上传/文件
	// 数据字典
	getDictionaryCatalogList: host + "/pfcs/v1/code/get/dictionarycataloglist",
	saveDictionaryCatalog: host + "/pfcs/v1/code/save/dictionarycatalog",
	deleteDictionaryCatalog: host + "/pfcs/v1/code/delete/dictionarycatalog",
	getDictionaryCatalog: host + "/pfcs/v1/code/get/dictionarycatalog",
	getDictionaryList: host + "/pfcs/v1/code/get/dictionarylist",
	deleteDictionary: host + "/pfcs/v1/code/delete/dictionary",
	saveDictionary: host + "/pfcs/v1/code/save/dictionary",
	// 参数
	getParameterList: host + "/pfcs/v1/template/get/parameterlist",
	getNumber: host + "/pfcs/v1/template/get/number ",
	saveParameter: host + "/pfcs/v1/template/save/parameter",
	getParameterDetail: host + "/pfcs/v1/template/get/parameterdetail",
	deleteParameter: host + "/pfcs/v1/template/delete/parameter",
	// 元件
	getElementList: host + "/pfcs/v1/template/get/elementlist",
	saveElement: host + "/pfcs/v1/template/save/element",
	getElementDetail: host + "/pfcs/v1/template/get/elementdetail",
	deleteElement: host + "/pfcs/v1/template/delete/element",
	getElementParamterList: host + "/pfcs/v1/template/get/elementparamterlist",
	sortElementParamter: host + "/pfcs/v1/template/sort/elementparamter",
	saveElementParamter: host + "/pfcs/v1/template/save/elementparamter",
	addElementParamter: host + "/pfcs/v1/template/add/elementparamter",
	deleteElementParamter: host + "/pfcs/v1/template/delete/elementparamter",
	getelement: host + "/pfcs/v1/template/get/element",
	// 模板
	getTemplateDetail: host + "/pfcs/v1/template/get/templatedetail",
	getElementParamterDetail: host + "/pfcs/v1/template/get/elementparamterdetail",
	saveTemplate: host + "/pfcs/v1/template/save/template",
	// 部件
	getPartList: host + "/pfcs/v1/source/get/partlist",
	getParts: host + "/pfcs/v1/source/get/parts",
	copyPart: host + "/pfcs/v1/source/copy/part",
	getPartDetail: host + "/pfcs/v1/source/get/partdetail",
	savePart: host + "/pfcs/v1/source/save/part",
	releasePart: host + "/pfcs/v1/source/release/part",
	interactiveParser: host + "/pfcs/v1/interactive/parser",
	interactiveUpload: host + "/pfcs/v1/interactive/upload",
	sourceIsinuse: host + "/pfcs/v1/source/update/isinuse",
	// 产品
	getProductList: host + "/pfcs/v1/product/get/productlist",
	copyProduct: host + "/pfcs/v1/product/copy/product",
	getProductPublishedList: host + "/pfcs/v1/product/get/productpublishedlist",
	exportProduct: host + "/pfcs/v1/product/export/product",
	getProductDetail: host + "/pfcs/v1/product/get/productdetail",
	saveProduct: host + "/pfcs/v1/product/save/product",
	releaseProduct: host + "/pfcs/v1/product/release/product",
	addProduct: host + "/pfcs/v1/product/add/product",
	updateIsinuse: host + "/pfcs/v1/product/update/isinuse",
	deleteProduct: host + "/pfcs/v1/product/delete/product"
};

export {
	poductApi
};
