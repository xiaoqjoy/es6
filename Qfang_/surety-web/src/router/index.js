import Vue from 'vue';
import Router from 'vue-router';
import Cookie from 'js-cookie';

import store from '../store';
import asyncRouter from './asyncRouter';

import Login from '@/pages/Login/login';
import Layout from '@/pages/Layout/Layout';
import Home from '@/pages/Home/Home';
import applyForm from '@/pages/suretyBusiness/applyForm';

Vue.use(Router);

// 创建路由
function createRouter(menuList, routers) {
  menuList.forEach((item) => {
    if (item.children && item.children.length) {
      // 递归
      createRouter(item.children, routers);
    } else {
      let name = item.name;
      // 循环异步路由，根据接口返回的有权限的菜单生成对应的路由加入到routers中
      asyncRouter.find((s) => {
        if (s.name === name) {
          // s.meta.permission = item.permission;
          routers.children.push(s);
          // 将路由信息缓存到对应菜单项中，用于渲染左边菜单
          item.path = s.path;
        }
      });
    }
  });
}

function routerMatch(menuList, asyncRouter) {
  return new Promise((resolve) => {
    const routers = asyncRouter[0];
    createRouter(menuList, routers);
    resolve([routers]);
  });
}

// 初始标签
let routes = [
  {
    path: '/',
    redirect: '/Home',
    meta: { keepAlive: false }
  },
  {
    path: '/Login',
    component: Login,
    name: '登录页面',
    meta: { keepAlive: false }
  },
  {
    path: '/applyForm',
    component: applyForm,
    name: '报单',
    meta: { keepAlive: false }
  },
  {
    path: '/defaultLayout',
    component: Layout,
    children: [{
      path: '/Home',
      component: Home,
      meta: { keepAlive: true, elementName: 'Home' }
    }],
    meta: { keepAlive: false }
  },
  {
    path: '/Logout',
    redirect: () => {
      // 先调用登出接口，但由于是异步，暂时无法返回 redirect 的路径，只能在 then 回调中再次跳转到 Login
      store.dispatch('logout').then(() => {
        router.replace('/Login');
      });
    },
    meta: { keepAlive: false }
  }
];

const router = new Router({
  routes: routes
});

// 路由跳转前验证
router.beforeEach((to, from, next) => {
  // 判断用户是否登录
  if (Cookie.get('userinfos')) {
    if (to.path === '/Login') {
      router.replace('/Home');
    } else if (to.path !== '/Logout') {
      // 页面跳转前先判断是否存在用户和菜单导航，如果没有则请求一次
      if (!store.state.userInfo.id && store.state.menuList.length === 0) {
        store.dispatch('getUserInfo').then(res => {
          // 获取权限列表，如果失败则跳回登录页重新登录
          // 匹配并生成需要添加的路由对象
          routerMatch(store.state.menuList, asyncRouter).then(routers => {
            router.addRoutes(routers);
            next(to.path);
          });
        }).catch(() => {
          console.log('登录错误');
          Cookie.remove('userinfos');
          router.replace('/Login');
        });
      } else {
        if (to.matched.length) {
          // 是否可添加tag
          if (!store.state.isAddVisitedTags) {
            // 如果已在标签导航的标签可跳转
            for (let item of store.state.visitedTags) {
              if (item.path === to.path) {
                next();
              } else {
                next(false);
              }
            }
          } else {
            next();
          }
        } else {
          router.replace('/Login');
        }
      };
    }
  } else {
    if (['/Login'].indexOf(to.path) >= 0) {
      next();
    } else {
      router.replace('/Login');
    }
  }
});

export default router;
