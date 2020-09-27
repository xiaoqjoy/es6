<template>
  <div class="ic_info_detail_wrap fahai_detail">
    <el-header>{{detail.title}}（{{detail.dataType | dataFilter}}）</el-header>
    <el-main>
      <div>
        <p v-for="item in config[detail.dataType]" :key="item.code">
          <span v-if="item.code === 'dataType'" class="content_title">{{item.desc}}:&nbsp;&nbsp;</span>
          <span v-if="item.code === 'dataType'">{{detail[item.code] | dataFilter}}</span>
          <span v-if="item.code !== 'dataType'" class="content_title">{{item.desc}}:&nbsp;&nbsp;</span>
          <span v-if="item.code !== 'dataType'" v-html="formatText(detail[item.code])"></span>
        </p>
      </div>
    </el-main>
  </div>
</template>

<script>
import config from './../js/router/config.json';
export default {
  name: 'faHaiInfoDetail',
  data() {
    return {
      detail: '',
      dataType: '',
      config: config
    };
  },
  created() {
    this.dataType = atob(this.$route.query.dataType);
    this.detail = JSON.parse(sessionStorage.getItem('fahaiInfo'));
  },
  methods: {
    formatText(str) {
      str = str || '';
      if (typeof str !== 'string') return str;
      const name = this.detail.keyName;
      const arr = [name, '判决结果', '判决'];
      const reg = new RegExp(arr.join('|'), 'g');
      return str.replace(reg, '<i class="b">$&</i>');
    }
  },
  filters: {
    dataFilter(key) {
      let map = {
        cpws: '裁判文书',
        zxgg: '执行公告',
        shixin: '失信公告',
        ktgg: '开庭公告',
        fygg: '法院公告',
        ajlc: '案件流程',
        bgt: '曝光台',
        satparty_qs: '欠税公告',
        satparty_chufa: '涉税处罚公示',
        satparty_fzc: '税务非正常户公示'
      };
      return map[key] || key;
    }
  }
};
</script>

<style lang="less">
  .ic_info_detail_wrap.fahai_detail {
    padding: 0px;
    overflow: hidden;
    background: #ececec;
    .el-main > div {
      height: 98%;
      overflow: auto;
      > p {
        .content_title {
          color: #666;
        }
        line-height: 35px;
        font-size: 20px;
      }
    }
    .b {
      background: blue;
      color: #fff;
      font-style: normal;
      font-weight: normal;
    }
  }
</style>
