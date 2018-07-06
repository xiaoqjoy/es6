<template>
  <div class="nav">
    <dl>
      <dt><img src="../../../images/leftTop/logo.png"/></dt>
      <!--<li v-for="(it,index) in arrs" v-bind:class="{actives:'/basedDiction/'+it.typeCode == $route.path}" @click="myTabss(index,it)">{{it.typeName}}</li>-->
      <!--<dd v-for="(it,index) in datas" @click='hover(it,index)' v-bind:class="{activess:'/'+it.typeCode == $route.path}"><img v-bind:src="it.imgSrc"/>{{it.mes}}</dd>-->
      <!--<dd v-for="(it,index) in datas" @click='hover(it,index)' v-bind:class="{activess:index == myIndex}"><img v-bind:src="it.imgSrc"/>{{it.mes}}</dd>-->
      <dd v-for="(it,index) in datas" @click='hover(it,index)' :class="[{activess:index == myIndex},it.icon]">
        <span :class="{special:index == myIndex}"></span>{{it.name}}
      </dd>
    </dl>
  </div>
</template>

<script>
  export default {
    name: 'commons',
    data() {
      return {
        datas: [
          // {imgSrc:"../../../images/leftTop/home_menu_icon_home_press.png",mes:"首页",typeCode:"homePage"},
          // {imgSrc:"../../../images/leftTop/home_menu_icon_patient_normal.png",mes:"患者",typeCode:"patientManage"},
          // {imgSrc:"../../../images/leftTop/home_menu_icon_talk_normal.png",mes:"随访",typeCode:"followup"},
          // // {imgSrc:"../../../images/leftTop/home_menu_icon_ask_normal.png",mes:"互动",typeCode:"interactive"},
          // // {imgSrc:"../../../images/leftTop/home_menu_icon_search_normal.png",mes:"查询",typeCode:"query"},
          // {imgSrc:"../../../images/leftTop/home_menu_icon_sys_normal.png",mes:"系统",typeCode:"agencyInfor/agenInfor"}
        ],
        myIndex: 0
      }
    },
    created: function () {
      this.reloadNav();
    },
    methods: {
      reloadNav(){
        if (JSON.parse(sessionStorage.getItem("meunList"))) {
          this.datas = JSON.parse(sessionStorage.getItem("meunList"));
          this.changeLeftNav();
        }
      },
      hover(it) {
        //页面跳转
        this.$router.push("/" + it.url);
      },
      changeLeftNav () {
        for (let i = 0, len = this.datas.length; i < len; i++) {
          if (this.datas[i].url == this.$route.path.split('/')[1]) {
              this.myIndex = i
              return;
          } else if (this.$route.path.split('/')[1] == 'sugerHighLow') {
              this.myIndex = 1;
          } else if (this.$route.path.split('/')[1] == 'sugarWarningPage') {
              this.myIndex= null;
          } else {
              this.myIndex = this.datas.length-1;
          }
        }
      }
    },
    watch: {
      '$route' () {
        if (this.datas) {
          this.changeLeftNav();
        }
      }
    }
  }
</script>

<style lang="less">
  .nav {
    dl {
      dt {
        span {
          vertical-align: middle;
        }
      }
      dd {
        span {
          display: inline-block;
          vertical-align: middle;
          width: 24px;
          height: 22px;
          margin: -3px 12px 0 -16px;
          background-repeat: no-repeat;
        }
      }
     .homePage1{
        span {
          background-image: url("../../../images/leftTop/home_menu_icon_home_normal.png");
        }
      }
      .patientManage1 {
        span {
          background-image: url("../../../images/leftTop/home_menu_icon_patient_normal.png");
        }
      }
      .followup1 {
        span {
          background-image: url("../../../images/leftTop/home_menu_icon_talk_normal.png");
        }
      }
     .information1{
        span {
          background-image: url("../../../images/leftTop/home_menu_icon_data.png");
        }
      }
      .agencyInfo1 {
        span {
          background-image: url("../../../images/leftTop/home_menu_icon_sys_normal.png");
        }
      }
      .homePage1{
        span.special {
          background-image: url("../../../images/leftTop/home_menu_icon_home_press.png");
        }
      }
      .patientManage1  {
        span.special {
          background-image: url("../../../images/leftTop/home_menu_icon_patient_press.png");
        }
      }
      .followup1 {
        span.special {
          background-image: url("../../../images/leftTop/home_menu_icon_talk_press.png");
        }
      }
      .information1 {
        span.special {
          background-image: url("../../../images/leftTop/home_menu_icon_data---hover.png");
        }
      }
      .agencyInfo1 {
        span.special {
          background-image: url("../../../images/leftTop/home_menu_icon_sys_press.png");
        }
      }
    }
  }

  .nav {
    background: white;
    z-index: 20;
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 160px;
    box-shadow: 3px 0px 3px 0px rgba(129, 156, 173, 0.1);
  }

  .nav dl {
    width: 100%;
  }

  .nav dl dt, .nav dl dd {
    height: 60px;
    line-height: 60px;
    cursor: pointer;
    font-size: 16px;
    text-align: center;
    color: #8b9eba;
  }

  .activess {
    background-color: rgba(38, 123, 247, 0.1) !important;
    color: #267bf7 !important;
  }

  /*.nav dl dt img,.nav dl dd img{
        vertical-align: middle;
    }

    .nav dl dd img{
        width: 24px;
        height:22px;
        margin:-3px 12px 0 -16px;
    }*/

</style>
