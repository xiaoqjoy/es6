const productFactory = {
  state: {
    searchJson: {}
  },
  mutations: {
    setSearchJson(state, json) {
      state.searchJson = json;
    }
  },
  actions: {
    setSearchJson({commit}, json) {
      commit('setSearchJson', json);
    }
  }
};

export default productFactory;
