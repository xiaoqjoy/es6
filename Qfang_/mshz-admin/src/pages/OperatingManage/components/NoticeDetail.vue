<template>
  <section class="dialog-box notice-dialog">
    <div class="notice-header">
      <h2>{{notice.title}}</h2>
      <div>{{notice.publisherName}} {{notice.publishTimeDesc}} 浏览{{notice.views}}次</div>
    </div>
    <div class="notice-content origin-style" v-html="notice.content"></div>
    <div class="attachment-list">
      <el-row>
        <el-col :span="2" class="font-c hg-2">
          附件：
        </el-col>
        <el-col :span="20">
          <p v-if="notice.attachmentList.length > 0" class="hg-2">
            <el-button class="marb-10" v-bind:key="file.name" v-for="file in notice.attachmentList" size="mini" @click="download(file)">{{file.name}}
              <i class="el-icon-download"></i>
            </el-button>
          </p>
          <p v-else>
            无
          </p>
        </el-col>
      </el-row>

    </div>
  </section>
</template>
<script>
export default {

  data() {
    return {
      notice: {
        title: '',
        publisher: '',
        publishTime: '',
        attachmentList: [],
        content: '',
        views: 0
      }
    };
  },
  props: ['noticeId'],
  mounted() {
    this.requestData();
  },
  methods: {
    requestData() {
      this.$axios
        .get('security/oms/firmAdvert/queryFirmAdvertInfo', {
          params: {
            id: this.noticeId
          }
        })
        .then(res => {
          // console.log(res, '公告详情');
          if (res.data.status === 'C0000') {
            this.notice = res.data.result;
            this.notice.content = this.notice.content.replace(/\n/g, '<br>');
          } else {
            this.$message({
              type: 'warning',
              message: res.data.message
            });
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error(err.message || '服务器异常');
        });
    },
    download(file) {
      location.href = '/mshz-mgr/common/fileDownload?url=' + file.url + '&fileName=' + file.name;
    }
  }
};
</script>
<style scoped>
section.notice-dialog {
  height: 680px;
}
.notice-header {
  padding: 20px 20px 10px;
  background-color: #eee;
}
.notice-header h2 {
  margin-top: 0;
  margin-bottom: 10px;
}
.notice-content {
  text-align: left;
  max-height: 520px;
  padding: 10px 20px;
  overflow: auto;
}
.attachment-list {
  background-color: #eee;
  text-align: left;
  padding: 10px 20px;
  position: absolute;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
}
.hg-2 {
  line-height: 2;
}
p.hg-2 .marb-10 {
  margin-bottom: 10px;
  margin-left: 10px;
}
</style>
