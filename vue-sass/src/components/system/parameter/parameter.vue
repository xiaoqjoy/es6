<template>
  <div>
    <sys-tem></sys-tem>
    <div class="temManage positionContent">
      <h3>参数设置</h3>
      <div class="temManages contentBorder">
        <div class="tabss">
          <ul>
            <li v-for="(it,index) in arrs" v-bind:class="{actives:'/parameter/'+it.typeCode}" @click="myTabss(index, it)">{{it.typeName}}
            </li>
          </ul>
        </div>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        arrs: [{
          typeCode: "scope",
          typeName: "血糖正常范围"
        }]
      }
    },
    created: function () {

    },
    methods: {
      myTabss(index, it) {
        this.$router.push(it.typeCode);
      },
    }
  }
</script>