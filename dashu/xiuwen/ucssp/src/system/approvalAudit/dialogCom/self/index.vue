<template>
  <div>
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <div class="dialog-box__top">
        xxxxxxxx
        <span class="product_title_head strong_font">退回</span>
        <span class="el-icon-close button button__close" @click="close_()"></span>
      </div>
    </div>
    <!-- <v-self1></v-self1> -->
    <div class="wsnd" v-for="(item, index) in asd" :key="index">
      <div v-if="item"><v-self1 class="nmsl" :asd="item.children"></v-self1></div>
    </div>
  </div>
</template>

<script>
// import vSelf1 from "../../approval/approval-pending/approval-pending-start";
// import vSelf1 from "../returnC";
  export default {
    name: 'vSelf1',
    props: [ 'asd' ],
    data() {
      return {
        // zxc: true
        // a: true
      };
    },
    created() {
      console.log(this.asd);
    },
    methods: {
      close_() {
      this.$emit("clsoe_windowAlert");
    }
    },
    components: {
      // vSelf1
    }
  };
</script>

<style scoped>
.dialog-box{
  width: 100%;
  height: 100%;
  z-index: 1001;
}
</style>
