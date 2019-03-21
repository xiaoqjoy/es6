<template>
  <div class="contentbox">
    <CircleProgress
      :percent="percent"
      unit="200"
      :strokeBgColor="strokeBgColor"
      :strokeColor="strokeColor"
      :canvasId="canvasId"
      canvasId="progress"
      strokeType="round"
    >
      <span slot="txt">{{percent * 100}}%</span>
    </CircleProgress>
  </div>
</template>

<script>
import CircleProgress from "../../components/mini-circleprogress";
export default {
  data() {
    return {
      percent: 0.3,
      canvasId: true,
      strokeBgColor: "#D7D7D7",
      strokeColor: "#008842"
    };
  },
  components: {
    CircleProgress
  },
  computed: {
    count() {}
  },
  mounted() {},
  methods: {}
};
</script>

<style>
.contentbox {
  width: 200rpx;
  height: 200rpx;
}
</style>
