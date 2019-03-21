import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import Cookie from 'js-cookie';

Vue.use(Vuex);

export default new Vuex.Store({
  // 初始对象
  state: {
    // 用户信息
    userInfo: {},
    // 用户菜单
    menuList: [],
    // 顶部标签栏
    visitedTags: [{
      path: '/Home',
      name: '首页'
    }],
    // 缓存标签栏
    cachedTags: [],
    // 是否可继续增加菜单
    isAddVisitedTags: true
  },

  mutations: {
    // 更新用户信息
    updateUserInfo(state, newUserInfo) {
      state.userInfo = newUserInfo;
    },
    updatePermission(state, newPermission) {
      state.permission = newPermission;
    },
    // 更新用户菜单列表
    updateMenuList(state, newMenuList) {
      state.menuList = newMenuList;
    },
    // 新增打开标签
    handleAddTag(state, view) {
      // 已经存在
      if (state.visitedTags.some(v => v.patt === view.path)) {
        return;
      }
      // 添加tag
      state.visitedTags.push({
        name: view.name,
        path: view.path,
        meta: view.meta
      });
      // 是否需要缓存
      if (view.meta.keepAlive) {
        state.cachedTags.push(view.meta.elementName);
      }
    },
    // 删除打开标签
    handleDelTag(state, view) {
      for (let i = 0; i < state.visitedTags.length; i++) {
        if (state.visitedTags[i].path === view.path) {
          state.visitedTags.splice(i, 1);
          break;
        }
      }
      for (let j = 0; j < state.cachedTags.length; j++) {
        // console.log(state.cachedTags);
        if (state.cachedTags[j] === view.meta.elementName) {
          state.cachedTags.splice(j, 1);
          break;
        }
      }
    },
    handleChangeiSAdd(state, status) {
      state.isAddVisitedTags = status;
    }
  },

  actions: {
    // 登出
    logout({
      commit
    }) {
      return new Promise((resolve) => {
        axios
          .get('/surety/login/logOut')
          .then(res => {
            commit('updateUserInfo', {});
            commit('updateMenuList', []);
            Cookie.remove('userinfos');
            Cookie.remove('sid');

            resolve();
          })
          .catch(err => {
            console.log(err);
          });
      });
    },
    // 获取用户信息
    getUserInfo({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        axios({
          url: '/security/open/personalInfo/pickPersonInfo',
          methods: 'get'
        }).then((res) => {
          // 更新权限列表

          let data = res.data.result;
          commit('updateUserInfo', data);
          commit('updateMenuList', data.currentMenu);
          commit('updatePermission', data.currentAuthMap);

          resolve(data);
        }).catch(() => {
          reject(new Error({ error: '获取用户信息失败' }));
        });
      });
    },
    // 增加标签
    addTag({
      commit
    }, view) {
      commit('handleAddTag', view);
    },
    // 删除标签
    delVisitedTag({
      state,
      commit
    }, view) {
      return new Promise((resolve) => {
        commit('handleDelTag', view);
        resolve([...state.visitedTags]);
      });
    }
  }
});
