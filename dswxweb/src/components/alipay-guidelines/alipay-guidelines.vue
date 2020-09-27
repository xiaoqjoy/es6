<template>
  <div id="alipayimg">
    <img :src="img" alt="协议支付绑卡指引" id="img">
  </div>
</template>

<script>
import { laappApi } from "../js/server.js"; // 接口
import { Indicator } from 'mint-ui';
export default {
  data() {
    return {
      img: `${laappApi.alipayGuidelines}`,
    };
  },
  created() {
    Indicator.open();
  },
  mounted() {
    document.getElementById('img').onload = function() {
      Indicator.close();
    }
  },
  beforeDestroy () {
    Indicator.close();
  }
};
</script>

<style scoped>
* {
  -webkit-overflow-scrolling: touch;
}
#alipayimg {
  overflow-y: auto;
  height: 667px;
}
#alipayimg img{
  width: 100%;
}
</style>