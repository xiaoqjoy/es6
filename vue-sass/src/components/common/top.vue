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
              <span class="userMain-right"></span>
              <el-dropdown-menu class="userSet" slot="dropdown">
                <el-dropdown-item @click.native="showChangePwd"><img class="userSetItemIcon" src="../../../images/leftTop/home_menu_icon_home_normal.png" alt="">修改密码</el-dropdown-item>
                <el-dropdown-item @click.native="goLogin"><img class="userSetItemIcon" src="../../../images/leftTop/home_menu_icon_home_normal.png" alt="">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
      </div>
      <img src="../../../images/leftTop/top_but_pic_normal.png" alt="" class="logo"/>
      <div class="floatRight sugarWarning pr">
        <span @click="showWarningInfoList">血糖预警</span>
        <span class="userMain-right"></span>
        <span class="sugarWarningSum tac" v-show="!!unreadSum">{{unreadSum * 1 > 0 ? (unreadSum * 1 > 99 ? '99+' : unreadSum) :''}}</span>
      </div>
      <img src="../../../images/leftTop/top_but_message_normal.png" alt="" class="inform floatRight"/>
      <!-- <img class="goOut" v-if="isShow" @click="goLogin" src="../../../images/leftTop/top_pic_down_bg .png"/> -->
  </div>
</template>

<script>
  export default {
    name: 'top',
    data() {
      return {
        name: '',
        departmentName:'',
        isShow: false,
        isShowDept:true, // 是否显示科室名称
        dialogFormVisible: false, // 是否显示修改密码弹窗
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px',
        unreadSum:''
      }
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
        this.isShow = false;
        console.log(this.$parent)
        this.$router.push({
          path: '/',
        })
      },
      reloadTop(){
        if (sessionStorage.getItem('user')) {
          let user = JSON.parse(sessionStorage.getItem('user'));
          this.name = user.nickname;
          this.departmentName = user.departmentName;
          this.isShowDept = user.existDepartment
          if (!this.unreadSum) {
            this.getUnreadSum();
          }
        }
      },
      showChangePwd () {
        this.$parent.dialogFormVisible = true;
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
    },
    watch: {
      /*'$route'(to,from){
        var path = to.path;
        console.log(path);
        if(path == '/homePage'){
          this.reloadTop();
        }
      }*/
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
      right: -20px;
      top: 28px;
      height: 5px;
      width: 8px;
      margin-right: 10px;
      background: url("../../../images/leftTop/top_name_down_but.png") no-repeat;
      background-size: cover;
  }
  .userSet {
    width: 114px;
  }
  .userSet .el-dropdown-menu__item {
    color: #8b9eba;
    padding-left: 10px;
  }
  .userSet .userSetItemIcon{
    display: inline-block;
    width: 14px;
    height: 14px;
    margin-right: 6px;
    margin-bottom: -2px;
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
      margin-top: 15px;
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

  .inform {
    cursor: pointer;
    margin-top: 20px;
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
