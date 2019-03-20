import Vue from 'vue';
import VueRouter from 'vue-router';
import Cookie from 'js-cookie';

import store from '../store';
import asyncRouter from './asyncRouter';

import Login from '../pages/Login/Login';
import Layout from '../pages/Layout/Layout';
import Home from '../pages/Home/Home';
const InventoryHouseDetail = () => import('../pages/InventoryControl/InventoryHouseDetail');
const InventoryHouseEdit = () => import('../pages/InventoryControl/InventoryHouseEdit');

Vue.use(VueRouter);

function routerMatch(menuList, asyncRouter) {
  return new Promise((resolve) => {
    const routers = asyncRouter[0];
    // 创建路由
    function createRouter(menuList) {
      menuList.forEach((item) => {
        if (item.children && item.children.length) {
          // 递归
          createRouter(item.children);
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

    createRouter(menuList);
    resolve([routers]);
  });
}

// 默认路由表，不需要权限
const routes = [
  {
    path: '/',
    redirect: '/Home',
    meta: { keepAlive: false }
  },
  {
    path: '/Login',
    component: Login,
    name: '登录页',
    meta: { keepAlive: false }
  },
  {
    path: '/defaultLayout',
    component: Layout,
    // 需要进行用户登录验证
    children: [{
      path: '/Home',
      component: Home,
      meta: { keepAlive: true, elementName: 'Home' }
    },
    {
      path: '/InventoryHouseDetail/:id/:situationId',
      component: InventoryHouseDetail,
      name: 'InventoryHouseDetail',
      meta: { keepAlive: false, elementName: 'InventoryHouseDetail' }
    },
    {
      path: '/InventoryHouseEdit/:id/:situationId',
      component: InventoryHouseEdit,
      name: 'InventoryHouseEdit',
      meta: { keepAlive: false, elementName: 'InventoryHouseEdit' }
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

const router = new VueRouter({
  // mode: 'history',
  routes: routes
});

// 路由跳转前验证
router.beforeEach((to, from, next) => {
  // 判断用户是否登录
  if (Cookie.get('mgrSid')) {
    // 如果当前处于登录状态，并且跳转地址为login，则自动跳回系统首页
    // 这种情况出现在手动修改地址栏地址时
    if (to.path === '/Login') {
      next({
        path: '/Home',
        replace: true
      });
      // router.replace('/Home');
    } else if (to.path !== '/Logout') {
      // 页面跳转前先判断是否存在权限列表，如果存在则直接跳转，如果没有则请求一次
      if (store.state.menuList.length === 0) {
        store.dispatch('getUserInfo').then(res => {
          // 获取权限列表，如果失败则跳回登录页重新登录
          // 匹配并生成需要添加的路由对象
          routerMatch(store.state.menuList, asyncRouter).then(routers => {
            // console.log(routers);
            router.addRoutes(routers);
            // 用fullpath代替path，防止参数丢失
            next({
              path: to.fullPath,
              replace: true
            });
          });
        }).catch(() => {
          console.log('登录错误');
          // store.dispatch('logout').then(() => {
          //   router.replace('/Login');
          // });
        });
      } else {
        if (to.matched.length) {
          // 是否不可添加tag了？
          if (!store.state.isAddVisitedTags) {
            // 如果已在标签导航的标签可跳转
            for (let item of store.state.visitedTags) {
              if (item.path === to.path) {
                next();
              } else if (to.path.indexOf('/InventoryHouse') > -1) {
                // 库存详情 编辑 不添加到 tags
                next();
              } else {
                next(false);
              }
            }
            console.log('matched:', to.path);
          } else {
            next();
          }
        } else {
          next({
            path: '/Login',
            replace: true
          });
          // router.replace('/Login');
        }
      };
    }
  } else {
    if (['/Login'].indexOf(to.path) >= 0) {
      next();
    } else {
      next({
        path: '/Login',
        replace: true
      });
      // router.replace('/Login');
    }
  }
});

export default router;
