
const face2face = {
  state: {
    identity_type: '身份证' // 客户的证件类型
  },
  mutations: {
    set_identity_type(state, msg) {
      state.identity_type = msg;
    }
  },
  actions: {
    set_identity_type({commit}, msg) {
      commit('set_identity_type', msg);
    }
  }
};

export default face2face;
