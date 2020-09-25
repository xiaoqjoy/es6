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
      videoType: "1",
      isStart: false, // 是否开始录像true，结束录像false
      oper: null // 0表示身份认证不通过，1表示提交面核，2表示不符合合作机构准入要求，3表示资料签署完成
    },
    isSubmitOperate: false, // 是否是提交操作，默认false
    currentState: "", // 云屋返回的当前状态
    selectRowInfo: {},
    seatNickName: "", // 坐席ID
    isCallAllow: false, // 云屋是否加载完毕

    originX: 0, // 记录云屋视频图标的横坐标
    originY: 0, // 记录云屋视频图标的纵坐标
    speechOptionMap: { optionList: [], remark: '' }, // 话术库还有话术库的备注
    openVideo: true, // 我司否决复议，不需要开启摄像头，表单不能编辑
    selectOption: {},
    /**
     * 用于记录历史贷款记录俄罗斯套娃层数相关的f2fTypeCode,
     * 详情看src\components\businessComponents\loanHistoryOffline\index.vue
     */
    f2fTypeCodeList: ['']
  },
  mutations: {
    set_f2fTypeCode(state, msg) {
      state.f2fTypeCodeList.push(msg);
    },
    pop_f2fTypeCode(state) {
      if (state.f2fTypeCodeList.length > 1) {
        state.f2fTypeCodeList.pop();
      }
    },
    set_identity_type(state, msg) {
      state.identity_type = msg;
    },
    set_breakPoint(state, msg) {
      state.breakPoint = msg;
    },
    set_isSubmitOperate(state, msg) {
      state.isSubmitOperate = msg;
    },
    set_currentState(state, msg) {
      state.currentState = msg;
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
    },
    // 更新话术库勾选
    updateSpeechOption(_state, _msg) {
      _state.speechOptionMap.optionList = _msg.optionList;
    },
    // 更新话术库备注
    updateSpeechRemark(_state, _msg) {
      _state.speechOptionMap.remark = _msg.remark;
    },
    clearSpeech(_state, _msg) {
      _state.speechOptionMap = _msg;
    },
    updateOpenVideo(_state, _msg) {
      _state.openVideo = _msg;
    },
    updateSelectOption(_state, _msg) {
      _state.selectOption = _msg;
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
    set_isSubmitOperate({
      commit
    }, msg) {
      commit('set_isSubmitOperate', msg);
    },
    set_currentState({
      commit
    }, msg) {
      commit('set_currentState', msg);
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
    },
    updateSpeechHandler({commit}, _msg) {
      // target 为 updateSpeechOption，更新话术库勾选项,updateSpeechRemark 更新备注
      commit(_msg.target, _msg);
    },
    clearSpeechHandler({commit}, _msg) {
      commit('clearSpeech', _msg);
    },
    updateOpenVideoHandler({commit}, _msg) {
      commit('updateOpenVideo', _msg);
    },
    updateSelectOptionHadler({commit}, _msg) {
      commit('updateSelectOption', _msg);
    }
  }
};

export default face2face;
