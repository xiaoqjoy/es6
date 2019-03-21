import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import Cookie from 'js-cookie';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {},
    menuList: [],
    permission: [],
    // 顶部标签栏
    visitedTags: [
      {
        path: '/Home',
        name: '首页'
      }
    ],
    // 缓存标签栏
    cachedTags: [],
    isAddVisitedTags: true,
    refreshHouseStatusF: false, // 远期
    isRealHose: false, // 是否在“实时”中刷新“远期”
    refreshHouseStatusS: false, // 实时
    freshenJointHouseStatus: false,
    freshenEntireHouseStatus: false,
    toggleRentService: 'NONE',
    refreshHouseTable: ''
  },
  mutations: {
    // 更新用户信息
    updateUserInfo(state, newUserInfo) {
      state.userInfo = newUserInfo;
    },
    updateMenuList(state, newMenuList) {
      state.menuList = newMenuList;
    },
    updatePermission(state, newPermission) {
      state.permission = newPermission;
    },
    // tags
    handleAddTags(state, view) {
      // console.log(view);
      // 如果已有该路由则返回
      if (state.visitedTags.some(v => v.path === view.path)) {
        return;
      }
      // 添加到 tags
      state.visitedTags.push({
        name: view.name,
        path: view.path,
        meta: view.meta
      });
      // tag 存在 sessionStorage
      let visitedTagStr = JSON.stringify(state.visitedTags);
      sessionStorage.setItem('visitedTagSession', visitedTagStr);
      // 是否需要缓存
      if (view.meta.keepAlive) {
        // 添加到缓存的 tags
        state.cachedTags.push(view.meta.elementName);
      }
      // 缓存的 tags
      let cachedTagStr = JSON.stringify(state.cachedTags);
      sessionStorage.setItem('chachedTagSession', cachedTagStr);
      // console.log(state.cachedTags);
    },
    // 删除顶部标签栏
    handelDelTages(state, view) {
      for (let i = 0; i < state.visitedTags.length; i++) {
        if (state.visitedTags[i].path === view.path) {
          state.visitedTags.splice(i, 1);
          break;
        }
      }
      let visitedTagStr = JSON.stringify(state.visitedTags);
      sessionStorage.setItem('visitedTagSession', visitedTagStr);
      for (let j = 0; j < state.cachedTags.length; j++) {
        // console.log(state.cachedTags);
        if (state.cachedTags[j] === view.meta.elementName) {
          state.cachedTags.splice(j, 1);
          break;
        }
      }
      // 缓存的 tags
      let cachedTagStr = JSON.stringify(state.cachedTags);
      sessionStorage.setItem('chachedTagSession', cachedTagStr);
    },
    updateVisitedTages(state, tagList) {
      state.visitedTags = tagList;
    },
    updateChachedTages(state, tagList) {
      state.cachedTags = tagList;
    },
    handleChangeiSAdd(state, status) {
      state.isAddVisitedTags = status;
    },
    handleWipeTages(state) {
      state.cachedTags = [];
      state.visitedTags = [
        {
          path: '/Home',
          name: '首页'
        }
      ];
    },
    // 刷新远期房态
    handleRefreshHouseStatusF(state, newRefreshHouseStatus) {
      state.refreshHouseStatusF = newRefreshHouseStatus;
    },
    // 刷新实时房态
    handleRefreshHouseStatusS(state, newRefreshHouseStatus) {
      state.refreshHouseStatusS = newRefreshHouseStatus;
    },
    handleisRealHose(state, newRefreshHouseStatus) {
      state.isRealHose = newRefreshHouseStatus;
    },
    // 刷新长租合租房态
    freshenLRJointHouseStataus(state, status) {
      state.freshenJointHouseStatus = status;
    },
    // 刷新长租整租房态
    freshenLREntireHouseStataus(state, status) {
      state.freshenEntireHouseStatus = status;
    },
    // 切换租后服务列表
    handleToggleRentService(state, status) {
      state.toggleRentService = status;
    },
    // 刷新列表
    handleRefreshHouseTable(state, status) {
      state.refreshHouseTable = status;
    }
  },
  actions: {
    wipeData({ commit }) {
      return new Promise((resolve) => {
        sessionStorage.clear('visitedTagSession');
        sessionStorage.clear('chachedTagSession');
        commit('updateUserInfo', {});
        commit('updateMenuList', []);
        commit('updatePermission', []);
        commit('handleWipeTages');
        resolve();
      });
    },
    // 登出后重置用户状态
    logout({ commit }) {
      return new Promise((resolve) => {
        axios
          .get('login/logout')
          .then(res => {
            Cookie.remove('mgrSid');

            commit('updateUserInfo', {});
            commit('updateMenuList', []);
            commit('updatePermission', []);
            sessionStorage.clear('visitedTagSession');
            sessionStorage.clear('chachedTagSession');
            resolve();
          })
          .catch(err => {
            console.log(err);
          });
      });
    },
    getUserInfo({ commit, rootState }) {
      return new Promise((resolve, reject) => {
        axios({
          url: '/security/org/person/pickPersonInfo',
          methods: 'get'
        }).then((res) => {
          // 更新权限列表
          let data = res.data.result;
          commit('updateUserInfo', data);

          data.currentMenu[2].children.push({
            name: '库存统计',
            path: '/HouseTotal'
          })
          commit('updateMenuList', data.currentMenu);
          console.log(data.currentMenu[2].children)
          commit('updatePermission', data.currentAuthMap);
          // 登录后看是 sessionStorage 中是否有缓存的 tags
          // 刷新后检测是否有缓存的 tags
          let sessionTages = sessionStorage.getItem('visitedTagSession');
          if (sessionTages && JSON.parse(sessionTages).length > 1) {
            commit('updateVisitedTages', JSON.parse(sessionTages));
          }
          // keep-alive 缓存的 tags
          let cachedTages = sessionStorage.getItem('chachedTagSession');
          if (cachedTages && JSON.parse(cachedTages).length > 1) {
            commit('updateChachedTages', JSON.parse(cachedTages));
          }
          resolve(data);
        }).catch(() => {
          reject(new Error({ error: '获取用户信息失败' }));
        });
      });
    },
    addVisitedTags({ commit }, view) {
      commit('handleAddTags', view);
    },
    delVisitedTags({ state, commit }, view) {
      return new Promise((resolve) => {
        commit('handelDelTages', view);
        resolve([...state.visitedTags]);
      });
    }

  }
});
