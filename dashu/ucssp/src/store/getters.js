const getters = {
  customertype: state => state.antifraud.customertype,
  // nameS: state => state.antifraud.nameS,
  // toSave: state => state.antifraud.toSave,
  // toSaveD: state => state.antifraud.toSaveD,
  // toSaveH: state => state.antifraud.toSaveH,
  // toSaveF: state => state.antifraud.toSaveF,
  getSystemName: state => state.systemName.systemName,
  surveyId: state => state.survey.surveyId,
  applicationId: state => state.survey.applicationId,
  surveySource: state => state.survey.surveySource,
  certificateType: state => state.commonSelect.certificateType,
  fieldConfig: state => state.survey.fieldConfig,
  taxpayerNum: state => state.taxLoan.taxpayerNum,

  breakPoint: state => state.face2face.breakPoint,
  selectRowInfo: state => state.face2face.selectRowInfo,
  speechOptionMap: state => state.face2face.speechOptionMap,
  openVideo: state => state.face2face.openVideo,
  selectOption: state => state.face2face.selectOption,
  searchJson: state => state.productFactory.searchJson,
  f2fTypeCodeList: state => state.face2face.f2fTypeCodeList
};

export default getters;
