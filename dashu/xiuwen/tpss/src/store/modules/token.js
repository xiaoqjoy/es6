/**
 * Created by liuzhe on 2018/11/12.
 */
const token = {
  state: {
    token: ''
  },
  mutations: {
    setToken(state, msg) {
      state.token = msg;
    }
  },
  actions: {
    setToken({commit}, msg) {
      commit('setToken', msg);
    }
  }
};

export default token;
