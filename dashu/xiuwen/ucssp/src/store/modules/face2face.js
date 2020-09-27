const face2face = {
  state: {
    identity_type: '身份证', // 客户的证件类型
    // 录制断点
    breakPoint: {
      isBreakPoint: false,
      msg: "",
      applicationId: "",
      customerName: "",
      productId: "",
      videoType: "1"
    },
    selectRowInfo: {},
    seatNickName: "", // 坐席ID
    isCallAllow: true, // 叫号是否置灰

    originX: 0, // 记录云屋视频图标的横坐标
    originY: 0 // 记录云屋视频图标的纵坐标
  },
  mutations: {
    set_identity_type(state, msg) {
      state.identity_type = msg;
    },
    set_breakPoint(state, msg) {
      state.breakPoint = msg;
    },
    set_seatNickName(state, msg) {
      state.seatNickName = msg;
    },
    set_selectCustomInfo(state, msg) {
      state.selectRowInfo = msg;
    },
    set_isCallAllow(state, msg) {
      state.isCallAllow = msg;
    },
    set_originX(state, msg) {
      // console.log(msg);
      state.originX = msg;
    },
    set_originY(state, msg) {
      state.originY = msg;
    }
  },
  actions: {
    set_identity_type({
      commit
    }, msg) {
      commit('set_identity_type', msg);
    },
    set_breakPoint({
      commit
    }, msg) {
      commit('set_breakPoint', msg);
    },
    set_seatNickName({commit}, msg) {
      commit("set_seatNickName", msg);
    },
    set_selectCustomInfo({commit}, msg) {
      commit('set_selectCustomInfo', msg);
    },
    set_isCallAllow({commit}, msg) {
      commit("set_isCallAllow", msg);
    },
    set_originX({commit}, msg) {
      commit("set_originX", msg);
    },
    set_originY({commit}, msg) {
      commit("set_originY", msg);
    }
  }
};

export default face2face;
