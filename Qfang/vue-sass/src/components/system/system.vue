<template>
  <div class="sysTab">
    <ul>
      <li v-for="(it,index) in tabs" @click="myTabs(index)" v-bind:class="{actives:actives == index}">{{it}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'patient',
    data() {
      return {
        actives: (this.$route.path.substring(0, this.$route.path.lastIndexOf("\/")) == '/agencyInfor') ? 0 : (this.$route.path.substring(0, this.$route.path.lastIndexOf("\/")) == '/basedDiction') ? 1 : (this.$route.path.substring(0, this.$route.path.lastIndexOf("\/")) == '/temManage') ? 2 : 3,
        // tabs:['机构信息','基础字典','模板管理','系统设置']
        tabs: ['机构信息', '基础字典', '模板管理', '参数范围']
      }
    },
    methods: {
      myTabs(index) {
        this.actives = index;
        if (index == 0) {
          this.$router.push("/agencyInfor/agenInfor")
        }
        if (index == 1) {
          //this.$router.push("/basedDiction/diabetes_type")
          this.$router.push("/basedDiction/interType")
        }
        if (index == 2) {
          this.$router.push("/temManage/interTemplate")
        }
        if (index == 3) {
          this.$router.push("/parameter/scope")
        }
      }
    }

  }
</script>