const antifraud = {
  state: {
    customertype: '2'
    // nameS: false
    // toSave: false, // 是否保存已经修改的状态(补件原因)
    // toSaveD: false, // 是否保存已经修改的状态(调查原因)
    // toSaveH: false, // 是否保存已经修改的状态(电核勾选)
    // toSaveF: false, // 是否保存已经修改的状态(否决原因)
    // toSaveT: false // 是否保存已经修改的状态(退回原因)
  },
  mutations: {
    set_customertype(state, msg) {
      state.customertype = msg;
    }
    // set_nameS(state, msg) {
    //   state.nameS = msg;
    // }
    // set_toSave(state, msg) {
    //   state.toSave = msg;
    // },
    // set_toSaveD(state, msg) {
    //   state.toSaveD = msg;
    // },
    // set_toSaveH(state, msg) {
    //   state.toSaveH = msg;
    // },
    // set_toSaveF(state, msg) {
    //   state.toSaveF = msg;
    // },
    // set_toSaveT(state, msg) {
    //   state.toSaveT = msg;
    // }
  },
  actions: {
    set_customertype({
      commit
    }, msg) {
      commit('set_customertype', msg);
    }
    // set_nameS({
    //   commit
    // }, msg) {
    //   commit('set_nameS', msg);
    // }
    // set_toSave({
    //   commit
    // }, msg) {
    //   commit('set_toSave', msg);
    // },
    // set_toSaveD({
    //   commit
    // }, msg) {
    //   commit('set_toSaveD', msg);
    // },
    // set_toSaveH({
    //   commit
    // }, msg) {
    //   commit('set_toSaveH', msg);
    // },
    // set_toSaveF({
    //   commit
    // }, msg) {
    //   commit('set_toSaveF', msg);
    // },
    // set_toSaveT({
    //   commit
    // }, msg) {
    //   commit('set_toSaveT', msg);
    // }
  }
};

export default antifraud;
