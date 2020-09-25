/**
 * Created by liuzhe on 2018/11/13.
 */
const face2face = {
  state: {
    systemName: '' // 客户的证件类型
  },
  mutations: {
    setSystemName(state, msg) {
      state.systemName = msg;
    }
  },
  actions: {
    setSystemName({commit}, msg) {
      commit('setSystemName', msg);
    }
  }
};

export default face2face;
