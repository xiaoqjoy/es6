<template>
  <div>
    <sys-tem></sys-tem>
    <div class="temManage">
      <h3>参数设置</h3>
      <div class="temManages contentBorder">
        <div class="tabss">
          <ul>
            <li v-for="(it,index) in arrs" v-bind:class="{actives:'/parameter/'+it.typeCode}" @click="myTabss(index, it)">{{it.typeName}}
            </li>
          </ul>
        </div>
        <router-view></router-view>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        myIndex: 3,
        arrs: [
          {
            typeCode: "scope",
            typeName: "血糖正常范围"
          }]
        }
    },
    created: function () {
      let meunList = JSON.parse(sessionStorage.getItem("meunList"))
      this.myIndex = meunList.length-1
    },
    methods: {
      myTabss(index, it) {
        this.$router.push(it.typeCode);
      },
    }
  }
</script>
<style>
  .actives {
    background-color: #e9f2fe;
    color: #267bf7 !important;
  }
  .temManage {
    width: 89.5%;
    padding: 19px 20px;
    background: #f7f8fa;
    position: absolute;
    top: 60px;
    left: 160px;
  }
  .temManages {
    border: 1px solid #dddddd;
    width: 100%;
    /*height: 851px;*/
    background-color: #ffffff;
    /*padding: 20px;*/
    /*position: relative;*/
    margin-top: 19px;
    overflow: hidden;
  }
  .tabss {
    /*position: absolute;*/
    /*height: 850px;*/
    width: 159px;
    /*border-right: 1px solid #ccc;*/
    float: left;
  }

  .tabss ul li {
    width: 100%;
    height: 50px;
    text-align: center;
    line-height: 50px;
    cursor: pointer;
    color: #8b9eba;
  }
</style>
