<template>
  <div class="top">
      <div class="userMain pr">
          <div class="userMain-left" @click="goOut">
              <!--如有科室权限，则显示科室名称，昵称位置上移，为科室名称挪位置-->
              <!-- <span class="nikeName" :class="{existDept:isShowDept}" >{{name}}</span>
              <span  v-if="isShowDept" class="deptName">{{departmentName}}</span> -->
            <el-dropdown trigger="click">
              <span class="el-dropdown-link leftClickArea">
                  <span class="nikeName" :class="{existDept:isShowDept}" >{{name}}</span>
                  <span v-if="isShowDept" class="deptName">{{departmentName}}</span>
              </span>
              <span class="bgImg userMain-right"></span>
              <el-dropdown-menu class="userSet" slot="dropdown">
                <el-dropdown-item @click.native="resetPass"><span class="bgImg userSetItemIcon" ></span>修改密码</el-dropdown-item>
                <el-dropdown-item @click.native="goLogin"><span class="bgImg loginOut" ></span>退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
      </div>
      <div class="bgImg topHead"><!--头像--></div>
      <div class="floatRight sugarWarning pr">
        <span @click="showWarningInfoList">血糖预警</span>
        <span class="bgImg userMain-right"></span>
        <span class="sugarWarningSum tac" v-show="!!unreadSum">{{unreadSum * 1 > 0 ? (unreadSum * 1 > 99 ? '99+' : unreadSum) :''}}</span>
      </div>
      <div class="bgImg bellIcon"><!--铃铛--></div>

      <!-- 修改密码弹窗 -->
      <changePassDialog source='userChangePassword' :userId="userId" :isOldPwd='isOldPwd' ref='changePassDialog'></changePassDialog>
  </div>
</template>

<script>
  import changePassDialog from './commonDialog/changePassDialog';
  export default {
    name: 'top',
    data() {
      return {
        name: '',
        departmentName:'',
        isShow: false,
        isShowDept:true, // 是否显示科室名称
        unreadSum:'', //预警数量
        isOldPwd: true, //修改密码弹窗是否显示旧密码栏
        userId: '',
      }
    },
    components: {
      changePassDialog
    },
    methods: {
      goOut(event) {
        var that = this;
        this.$parent.$parent.hiddenWarningInfoList();
        document.addEventListener('click', function (e) {
          var eles = ['userMain','userMain-right','userMain-left','nikeName','deptName'];
          // 获取点击元素的第一个class类，匹配是否存在eles数组中，存在则显示退出按钮
          if (eles.indexOf(e.target.className.split(' ')[0])>=0) {
            that.isShow = true;
          } else {
            that.isShow = false;
          }
        })
      },
      goLogin() {
        sessionStorage.setItem("token", "");
        sessionStorage.setItem("user", "");
        sessionStorage.setItem("refreshToken", "");
        sessionStorage.setItem("orgList", "");
        sessionStorage.setItem("meunList", "");
        this.isShow = false;
        this.$router.push({
          path: '/',
        })
      },
      reloadTop(){
        if (sessionStorage.getItem('user')) {
          let user = JSON.parse(sessionStorage.getItem('user'));
          this.name = user.nickname;
          this.departmentName = user.departmentName;
          if (!this.unreadSum) {
            this.getUnreadSum();
          }
        }
      },
      resetPass() {
        this.userId = JSON.parse(sessionStorage.getItem('user')).userId;
        this.$refs.changePassDialog.isShowChangePassDialog = true;
      },
      showWarningInfoList () {
        this.$parent.$parent.showWarningInfoList();
      },
      // 用作更新未读消息数
      getUnreadSum () {
        let _this = this;
        this.$api.getSugarWarningDataList({currentPage: 1,pageSize: 5,isRead:'2'}, res => {
          _this.unreadSum = res.data.data.totalNum * 1 > 0 ? res.data.data.totalNum : '';
        });
      }
    },
    created: function () {
      this.reloadTop();
    }
  }
</script>

<style scoped>
  .pr{
    position: relative;
    left: 0;
    top: 0;
  }
  .userMain-right{
      position: absolute;
      right: -22px;
      top: 28px;
      height: 5px;
      width: 8px;
      margin-right: 10px;
      background-position: -66px -27px;
  }
  .userSet {
    width: 114px;
  }
  .userSet .el-dropdown-menu__item {
    color: #8b9eba;
    padding-left: 10px;
  }
  .userSet .userSetItemIcon,
  .userSet .loginOut{
    display: inline-block;
    width: 14px;
    height: 14px;
    margin-right: 6px;
    margin-bottom: -2px;
  }
  .userSet .userSetItemIcon {
    background-position: -136px 0;
  }
  .userSet .loginOut{
    background-position: -136px -14px;
  }
  .leftClickArea{
    cursor: pointer;
  }
  .userMain {
      float: right;
      height: 60px;
  }
  .userMain-left {
      margin: 0 20px 0 0;
      min-width: 70px;
  }

  .nikeName {
    display: block;
    margin-top: 20px;
    margin-right: 20px;
    color: #8b9eba;
    font-size: 14px;
  }
  .existDept {
    margin-top: 12px;
  }
  .deptName {
    display: block;
    color: #8b9eba;
    font-size: 14px;
  }
  .goOut {
    position: absolute;
    right: 10px;
    top: 55px;
    cursor: pointer;
  }
  .top {
    z-index: 10;
    position: fixed;
    top: 0;
    background-color: #ffffff;
    width: 100%;
    height: 60px;
    padding-right: 20px;
    box-sizing: border-box;
    -webkit-box-shadow: 0px 2px 2px 0px rgba(129, 156, 173, 0.1);
    box-shadow: 0px 2px 2px 0px rgba(129, 156, 173, 0.1);
  }

  .bellIcon {
    background-position: -710px 0;
    cursor: pointer;
    width: 21px;
    height: 21px;
    float: right;
    margin-top: 20px;
    margin-right: 10px;    
  }
  .inform {
    cursor: pointer;
    margin-top: 20px;
    margin-right: 10px;
  }
  .topHead {
    background-position: -659px 0;
    width: 39px;
    height: 39px;
    cursor: pointer;
    float: right;
    margin-top: 11px;
    margin-right: 10px;
  }
  .logo {
    /*position: absolute;*/
    /*top: 11px;*/
    /*right: 40px;*/
    /*width: 39px;*/
    /*height: 39px;*/
    cursor: pointer;
    float: right;
    margin-top: 11px;
    margin-right: 10px;
  }
  .changePwdMask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10000;
  }

  /* 血糖预警 */
  .sugarWarning {
    height: 60px;
    line-height: 60px;
    margin-right: 30px;
    font-size: 14px;
    color: #8b9eba;
  }
  .sugarWarning span:first-child{
    cursor: pointer;
  }
  .sugarWarningSum {
    width: 35px;
    height: 20px;
    line-height: 20px;
    background-color: #F65A5A;
    position: absolute;
    right: -32px;
    top: 8px;
    border-radius: 10px;
    color: #fff;
  }
</style>
