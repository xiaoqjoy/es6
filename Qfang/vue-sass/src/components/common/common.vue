<template>
  <div class="nav">
    <dl>
      <dt>
        <div class="bgImg logo"></div>
      </dt>
      <dd v-for="(it,index) in datas" @click='hover(it,index)' :class="[{active:index == myIndex},it.icon]">
        <span class="bgImg menubg" :class="{special:index == myIndex}"></span>{{it.name}}
      </dd>
    </dl>
  </div>
</template>

<script>
  export default {
    name: 'commons',
    data() {
      return {
        datas: [],
        myIndex: 0
      }
    },
    created: function () {
      this.reloadNav();
    },
    methods: {
      reloadNav(){
        if (!!sessionStorage.getItem("meunList")) {
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
              this.myIndex = this.datas.length - 1;
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
        height: 60px;
        padding-top: 15px;
        box-sizing: border-box;
        .logo {
          background-position: -535px 0;
          width: 115px;
          height: 30px;
          margin: 0 auto;
        }
        span {
          vertical-align: middle;
        }
      }
      dd {
        span {
          display: inline-block;
          vertical-align: middle;
          width: 24px;
          height: 25px;
          margin: -3px 12px 0 -16px;
          background-repeat: no-repeat;
        }
      }
      .homePage1{
        span.menubg {
          background-position: 0 -48px;
        }
        span.special {
          background-position: -24px -48px;
        }
      }
      .patientManage1 {
        span.menubg {
          background-position: 0 -72px;
        }
        span.special {
          background-position: -24px -72px;
        }
      }
      .followup1 {
        span.menubg {
          background-position: 0 -144px;
        }
        span.special {
          background-position: -24px -144px;
        }
      }
      .information1{
        span.menubg {
          background-position: 0 -24px;
        }
        span.special {
          background-position: -24px -24px;
        }
      }
      .agencyInfo1 {
        span.menubg {
          background-position: 0 -120px;
        }
        span.special {
          background-position: -24px -120px;
        }
      }
      .total1 {
        span.menubg {
          background-position: 0 -168px;
        }
        span.special {
          background-position: -24px -168px;
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
    width: 130px;
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

</style>
