<template>
  <div class="ic_info_detail_wrap fahai_list" style="padding:0px; overflow: hidden">
    <el-header>法海网</el-header>
    <el-main>
      <div>
        <div v-for="(item,index) in allList" :key="index" class="fahai_list_detail">
          <el-button type="text"
            @click="openDetail(item, index)" :class="{change_color: item.open}">
            {{item.title}}{{item.dataType | titleFilter}}
          </el-button>
          <p>
            <span v-if="!item.companyOnly"><span>案号：</span><span>{{item.caseNo}} </span></span>
            <span v-if="item.companyOnly"><span>企业名称：</span><span>{{item.pname}} </span></span>
            <span>{{item.dataType | subheadFitler}}</span><span>{{item.sortTime}} </span>
          </p>
        </div>
      </div>
    </el-main>
  </div>
</template>

<script>
import {faHaiApi} from './../js/server.js';
export default {
  data() {
    return {
      allList: [],
      readOnlyFlag: false,
      partyPositionT: {
        p: '原告',
        d: '被告',
        t: '第三人',
        u: '当事人'
      },
      partyType: {
        C: '公司',
        P: '自然人'
      },
      authorityRank: {
        1: '国税总局',
        2: '省级（国税、地税）',
        3: '地市级（国税、地税）',
        4: '区县级（国税、地税）',
        5: '基层税务分局（所）（国税、地税）',
        6: '其他'
      }
    };
  },
  methods: {
    async openDetail(row, index) {
      let {faHaiType, applicationId} = this.$route.query;
      let type = decodeURIComponent(atob(faHaiType)).split('&+&')[0];
      let name = decodeURIComponent(atob(faHaiType)).split('&+&')[1];
      const params = {
        applicationId: applicationId,
        dataType: type,
        id: row[`${row.dataType}Id`],
        readOnlyFlag: this.readOnlyFlag,
        dimension: row.dataType
      };
      let bodyInfo = await this.queryBodyInfo(params);
      if (!bodyInfo.success) {
        this.confirmFn(bodyInfo.error.message);
        return;
      }
      this.$set(this.allList[index], 'open', true);
      row.body = bodyInfo.detail ? bodyInfo.detail[row.dataType][0].body : '';
      row.keyName = name;
      row.partyPositionT = this.partyPositionT[row.partyPositionT];
      row.partyType = this.partyType[row.partyType];
      row.authorityRank = this.authorityRank[row.authorityRank];
      sessionStorage.setItem('fahaiInfo', JSON.stringify(row));
      let dataType = btoa(row.dataType);
      let route = this.$router.resolve({
        name: 'faHaiInfoDetail',
        query: {
          dataType
        }
      });
      window.open(route.href, '_blank');
    },
    async queryBodyInfo(params) {
      // let errorMsg = '';
      try {
        const detail = await this.$MyFetch.post(faHaiApi.queryDetail, params);
        return {detail, success: true};
      } catch (error) {
        return {error, success: false};
      }
    },
    preprocess() {
      let exclude = ['satparty_xin', 'satparty_reg', 'satparty_xuke'];
      let companyOnly = ['satparty_qs', 'satparty_chufa', 'satparty_fzc'];
      let filterList = [];
      let allList = JSON.parse(sessionStorage.getItem('fahaiInfoList'));
      if (!allList) {
        this.$message.error('数据有误');
        return;
      }
      allList.forEach(ele => {
        if (companyOnly.includes(ele.dataType)) {
          ele.companyOnly = true;
        }
        if (!exclude.includes(ele.dataType)) {
          ele.sortTime = this.$Moment(ele.sortTime).locale('zh-cn').format('ll');
          if (ele.postTime) {
            ele.postTime = this.$Moment(ele.postTime).locale('zh-cn').format('ll');
          }
          filterList.push(ele);
        }
      });
      this.allList = filterList;
    }
  },
  mounted() {
    this.preprocess();
    this.readOnlyFlag = this.$route.query.readOnlyFlag === 'true';
  },
  filters: {
    titleFilter(key) {
      let map = {
        cpws: '（裁判文书）',
        zxgg: '（执行公告）',
        shixin: '（失信公告）',
        ktgg: '（开庭公告）',
        fygg: '（法院公告）',
        ajlc: '（案件流程）',
        bgt: '（曝光台）',
        satparty_qs: '（欠税公告）',
        satparty_chufa: '（涉税处罚公示）',
        satparty_fzc: '（税务非正常户公示）'
      };
      return map[key];
    },
    subheadFitler(key) {
      let map = {
        cpws: '审结日期：',
        zxgg: '立案日期：',
        shixin: '立案日期：',
        ktgg: '开庭时间：',
        fygg: '立案时间：',
        ajlc: '案件时间：',
        bgt: '立案时间：',
        satparty_qs: '欠税时间：',
        satparty_chufa: '处罚时间：',
        satparty_fzc: '认定时间：'
      };
      return map[key];
    }
  }
};
</script>

<style lang="less">
  .fahai_list {
    .change_color {
      color: #EC7272;
    }
    .fahai_list_detail {
      width: 50%;
      padding-bottom: 5px;
      border-bottom: 1px solid #eee;
      > p {
        color: #666;
      }
    }
    .el-main > div {
      overflow: auto;
      height: 98%;
    }
  }
</style>
