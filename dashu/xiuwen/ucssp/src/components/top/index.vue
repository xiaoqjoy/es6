<template>
  <div class="common__top clearfix font__white" >
    <img class="logo f__left" src="./img/img_logo.png">
    <span class="icon icon__split f__left text__center">|</span>
    <span class="title f__left">{{systemName}}</span>
    <div class="drop-menu" :class="{active: menuIsOpen}">
      <img src="./img/ic_user.png" alt="">
      <span @click.stop="showMenu" class="name" id="topMenu"><span class="name__text">{{userInfo.userName}}</span><i class="el-icon-caret-bottom el-icon--right" :class="{'el-icon-caret-top': menuIsOpen}"></i></span>
      <transition name="el-zoom-in-top">
        <ul class="menu bg__white" v-show="menuIsOpen">
          <li class="item" @click="quit(true)">退出</li>
          <li class="item" @click="quit(false)">注销</li>
        </ul>
      </transition>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import { token, menu, userInfo, localStorageClear } from '@common/js/localStorage';
  import api from '@components/login/server';
  export default{
    data() {
      return {
        menuIsOpen: false,
        userInfo: {}
      };
    },
    created() {
      this.userInfo = JSON.parse(userInfo.getUserInfo());
    },
    methods: {
      showMenu() {
        this.menuIsOpen = !this.menuIsOpen;
        // console.log(this.menuIsOpen);
      },
      quit(flag) {
        let msg = flag ? '退出' : '注销';
        this.$confirm('是否确定' + msg + '登录？')
        .then(_ => {
          this.$MyFetch.post(api.quit).then(data => {
            let userId = this.userInfo.userId;
            token.removeToken();
            menu.removeMenu();
            userInfo.removeUserInfo();
            if (flag) {
              // localStorage.clear();
              localStorageClear.clearAll();
              this.$router.push({path: '/login'});
            } else {
              this.$router.push({
                name: 'login',
                params: {
                  userId: userId
                }
              });
            }
          }).catch(err => {
            this.confirmFn(err.message, 'error');
          });
        })
        .catch(_ => {});
      }
    },
    mounted() {
      let self = this;
      let dom = document.getElementById('topMenu');
      // let dom1 = document.getElementById('topMenu1');
      document.body.addEventListener('click', function(e) {
        e = window.event || e;
        var target = e.target || e.srcElement;
        if (target !== dom) {
          self.menuIsOpen = false;
        }
      });
    },
    computed: {
      systemName() {
        return this.$store.getters.getSystemName;
      }
    }
  };
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .common__top{
    position: relative;
    height: 60px;
    padding: 11px 10px;
    background: #283650;
    font-size: 16px;
    z-index: 1001;
    .logo{
      display: block;
      width: 78px;
      margin-top: 7px;
    }
    .icon__split{
      width: 21px;
      line-height: 38px;
    }
    .title{
      line-height: 38px;
    }
    .drop-menu{
      position: absolute;
      right: 0;
      top: 0;
      width: 146px;
      padding: 13px 0;
      line-height: 34px;
      text-align: center;
      background: none;
      transition: all 0.5s;

      img{
        display: inline-block;
        vertical-align: top;
      }
      .name{
       font-size: 14px;
        cursor: pointer;
        position: relative;
        z-index: 1;
        display: inline-block;
        .name__text{
          display: inline-block;
          max-width: 84px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .el-icon--right{
          position: relative;
          z-index: -1;
        }
      }
      .menu{
        position: absolute;
        top: 60px;
        width: 146px;
        padding-top: 30px;
        z-index: 10;
        line-height: 100%;
        font-size: 14px;
        color: #333;
        border-radius:0 0 5px 5px;
        .item{
          padding-bottom: 30px;
          cursor: pointer;
        }
        .item:hover{
          color: #538bf1;
        }
      }
    }
    .drop-menu.active{
      background: #538bf1;
    }
  }
</style>
