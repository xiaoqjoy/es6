const taxLoan = {
  state: {
    // 这里是applicationId,总是变来变去,懒得改了
    taxpayerNum: ''
  },
  mutations: {
    setTaxpayerNum(_state, _num) {
      _state.taxpayerNum = _num;
    }
  },
  actions: {
    setNum({commit}, _num) {
      commit('setTaxpayerNum', _num);
    }
  }
};

export default taxLoan;
