const commonSelect = {
  state: {
    certificateTypeCode: "",
    certificateType: []
  },
  mutations: {
    set_certificateTypeCode(state, code) {
      state.certificateTypeCode = code;
    },
    set_certificateType(state, obj) {
      state.certificateType = obj;
    }
  },
  actions: {
    set_certificateTypeCode({commit}, code) {
      commit("set_certificateTypeCode", code);
    },
    set_certificateType({commit}, obj) {
      commit("set_certificateType", obj);
    }
  }
};

export default commonSelect;
