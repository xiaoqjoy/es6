<template>
  <!-- 批量下载 -->
  <div class="imageDownload-component">
    <object class="internal" id="DownLoad" classid="clsid:C11D0F49-2D60-4571-A537-4C794F7A5939" style="width:100%; height:100%;" ></object>
  </div>
</template>
<script>
import { baseApi } from "@common/js/server.js";
export default {
  name: "imageDownload-component",
  data() {
    return {
      applicationList: [],
      path: "",
      names: []
    };
  },
  created() {
    let query = this.$route.query;
    this.applicationList = query.applicationList.split(',');
    this.names = query.names.split(',');
    this.path = query.path;
    // alert(JSON.stringify(this.applicationList));
    // alert(this.path);
    // alert(JSON.stringify(this.names));
    // 开启批量下载
    this.cutImg();
  },
  methods: {
    // 开启批量下载
    cutImg() {
      this.$nextTick(() => {
        // 批量下载接口
        this.imageInit();
      });
    },
    // 批量下载接口
    imageInit() {
      let downLoadPath = this.path;
      let token = localStorage.getItem('DSF-token');
      let para = {
        applicationList: this.applicationList,
        names: this.names
      };
      this.$MyFetch
        .post(baseApi.batchInit, para)
        .then(res => {
          // alert(JSON.stringify(res));
          // console.log(JSON.stringify(res));
          // 批量下载
          // console.log(window.DownLoad);
          // console.log(typeof (res));
          window.DownLoad.init(JSON.stringify(res), downLoadPath, token);
          // window.DownLoad.SetToken(localStorage.getItem('DSF-token'), '');
        })
        .catch(err => {
          this.confirmFn(err.message, 'error');
          // alert(err.message);
        });
    }
  }
};
</script>

<style lang="less" scoped>
.image-component {
}
</style>
