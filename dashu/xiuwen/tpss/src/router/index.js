import Vue from 'vue';
import Router from 'vue-router';
import system from '@system/js/router/index';
import { Loading } from 'element-ui';
import { token, menu } from '@common/js/localStorage';
import store from '@/store';
Vue.use(Router);

let routes = [
  {
    path: '/',
    redirect: '/system/system_page'
  },
  {
    name: 'login',
    path: '/login',
    component: resolve => require(['@components/login/index'], resolve),
    meta: {name: "login"}
  },
  // 影像平台路由
  {
    name: 'image',
    path: '/image',
    component: resolve => require(['@components/image/index'], resolve)
  },
  {
    name: 'changePassword',
    path: '/change_password',
    component: resolve => require(['@components/login/change_password'], resolve),
    meta: {name: "password"}
  },
  system
];

let router = new Router({
  linkActiveClass: 'active',
  routes
});

var loading = null;
router.beforeEach((to, from, next) => {
  to.matched.forEach((v) => {
    if (v.meta.systemName) {
      store.dispatch('setSystemName', v.meta.systemName);
    }
  });
  if (!token.getToken() || !menu.getMenu()) {
    if (to.path === '/login') {
      next();
    } else if (to.path === '/change_password') {
      next();
    } else {
      next({path: '/login'});
    }
  } else {
    if (to.path === '/login' && menu.getMenu()) {
      next({path: '/'});
      return;
    }
    loading = Loading.service({ target: document.getElementById('system') });
    next();
  }
});
router.afterEach(() => {
  if (loading) {
    loading.close();
  }
});
export default router;
