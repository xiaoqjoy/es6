const getters = {
  customertype: state => state.antifraud.customertype,
  nameS: state => state.antifraud.nameS,
  // toSave: state => state.antifraud.toSave,
  // toSaveD: state => state.antifraud.toSaveD,
  // toSaveH: state => state.antifraud.toSaveH,
  // toSaveF: state => state.antifraud.toSaveF,
  getSystemName: state => state.systemName.systemName,
  taxpayerNum: state => state.taxLoan.taxpayerNum
};

export default getters;
