<template>
  <section class="dialog-box">
    <div class="dialog-l">
      <div class="community_info">
        <div class="right_pic">
          <!-- <viewer :options="options" v-if="communityInfo.gardenCover.length" :images="communityInfo.gardenCoverOriginal" class="viewer" ref="viewer">
            <template slot-scope="scope">
              <div class="display_img_div">
                <img :src="v" :data-source="communityInfo.gardenCoverOriginal[k]" v-for="(v,k) in communityInfo.gardenCover" v-show="k==0" :key="k" alt="">
                <span>共{{communityInfo.gardenCover.length}}张</span>
              </div>
            </template>
          </viewer> -->
          <div class="display_img_div"
            @click="showViewer(communityInfo.gardenCover)"
            v-if="communityInfo.gardenCover.length">
            <img :src="communityInfo.gardenCover[0].replace('{size}', '255x192')"
              alt="">
            <span>共{{communityInfo.gardenCover.length}}张</span>
          </div>
          <div class="display_img_div"
            v-else>
            <img src="../../../../../static/img/notImage.jpg"
              alt="">
          </div>
        </div>
        <div class="left_info">
          <div class="info-box">
            <el-row :gutter="20">
              <el-col :span="12">
                <p class="content-item">
                  <span class="content-item-label">
                    <span class="content-item-label-justify">登记名</span>：</span>{{communityInfo.registerName}}
                </p>
                <p class="content-item">
                  <span class="content-item-label">
                    <span class="content-item-label-justify">绿化率</span>：</span>{{communityInfo.greenRatio}}%
                </p>
                <p class="content-item">
                  <span class="content-item-label">
                    <span class="content-item-label-justify">总栋数</span>：</span>{{communityInfo.buildingCount}}栋
                </p>
                <p class="content-item">
                  <span class="content-item-label">
                    <span class="content-item-label-justify">车位比例</span>：</span>{{communityInfo.carportRatio}}
                </p>
                <p class="content-item">
                  <span class="content-item-label">
                    <span class="content-item-label-justify">地址</span>：</span>{{communityInfo.address}}
                </p>
              </el-col>
              <el-col :span="12">
                <p class="content-item">
                  <span class="content-item-label">
                    <span class="content-item-label-justify">建筑年代</span>：</span>{{communityInfo.completionDateDesc}}
                </p>
                <p class="content-item">
                  <span class="content-item-label">
                    <span class="content-item-label-justify">容积率</span>：</span>{{communityInfo.plotRatio}}
                </p>
                <p class="content-item">
                  <span class="content-item-label">
                    <span class="content-item-label-justify">总户数</span>：</span>{{communityInfo.roomCount}}户
                </p>
                <p class="content-item">
                  <span class="content-item-label">
                    <span class="content-item-label-justify">停车费</span>：</span>{{communityInfo.overGroundStopCharge}}元/月
                </p>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <div class="q_history_info">
        <div class="model-border">
          <header class="model-header">
            <span>Q房历史成交</span>
          </header>
          <div class="bd-ddd">
            <el-table :data="transactionInfoList"
              border
              stripe
              style="width: 100%"
              height="100%"
              :max-height="420"
              size="mini">
              <!-- 5-300字 -->
              <el-table-column label="房型"
                :min-width="200"
                align="left">
                <template slot-scope="scope">
                  <div class="room_type_div">
                    <!-- <viewer :options="options" v-if="scope.row.pictureUrl.length" :images="scope.row.pictureUrl">
                      <img :src="v.replace('{size}', '43x32')" :data-source="v.replace('{size}', '800x600')" v-show="k===0" :key="k" v-for="(v,k) in scope.row.pictureUrl" class="room_type_img" alt="">
                    </viewer> -->
                    <img @click="showViewer(scope.row.pictureUrl)"
                      :src="scope.row.pictureUrl[0].replace('{size}', '43x32')"
                      v-if="scope.row.pictureUrl.length"
                      class="room_type_img"
                      alt="">
                    <img v-else
                      src="../../../../../static/img/notImage.jpg"
                      alt="">
                    <div class="right">
                      <h4>{{scope.row.roomType}}</h4>
                      <p>{{scope.row.area}}平米 朝{{scope.row.direction}} {{scope.row.decoration}}</p>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="面积"
                :min-width="100"
                align="center">
                <template slot-scope="scope">
                  <span>{{scope.row.area}}㎡</span>
                </template>
              </el-table-column>
              <el-table-column prop="tradeDateDesc"
                label="签约时间"
                align="center">
              </el-table-column>
              <el-table-column label="成交价"
                align="center"
                :min-width="80">
                <template slot-scope="scope">
                  <span>{{scope.row.price}}元/月</span>
                </template>
              </el-table-column>
              <el-table-column prop="sourceDesc"
                label="数据来源"
                align="center"
                :min-width="100">
              </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination class="page"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="page.currentPage"
                :page-sizes="[20, 30, 50]"
                :page-size="page.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :page-count="page.pageCount"
                :total="page.total">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <viewer :options="options"
      v-show="false"
      ref="$viewer"
      @inited="inited"
      :images="viewerList">
      <template slot-scope="scope">
        <img :src="v"
          :key="k"
          v-for="(v,k) in viewerList">
      </template>
    </viewer>
  </section>
</template>
<script>
import { $formDate } from '@/assets/js/utils.js';
export default {
  data() {
    return {
      options: {
        url: 'data-source',
        title: false,
        zIndex: 99999
      },
      viewerOptions: {
        title: false,
        zIndex: 99999
      },
      viewerList: [],
      $viewer: null,
      transactionInfoList: [],
      // 小区信息
      communityInfo: {
        gardenCover: [],
        gardenCoverOriginal: []
      },
      page: {
        currentPage: 1, // 分页当前第几页
        total: 0, // 数据总数
        pageSize: 20, // 每页的数据量
        pageCount: null  // 总页数
      }
    };
  },
  props: ['id', 'city', 'gardenId', 'gardenName'],
  watch: {
    city() {
      this.requestData();
      this.getTransactionRecord();
    }
  },
  methods: {
    inited(viewer) {
      this.$viewer = viewer;
    },
    showViewer(list) {
      this.viewerList = list.map((e) => {
        return e.replace('{size}', '800x600');
      });
      setTimeout(() => {
        this.$viewer.show();
      });
    },
    // 获取小区信息
    requestData() {
      this.$axios.post(
        '/security/room/returnGardenAndTransaction',
        {
          city: this.city,
          gardenId: this.gardenId,
          gardenName: this.gardenName
        }
      ).then((res) => {
        if (res.data.status === 'C0000') {
          this.communityInfo = res.data.result;
          // let gardenCover = res.data.result.gardenCover.map(e => {
          //   return e.replace('{size}', '255x192');
          // });

          // let gardenCoverOriginal = res.data.result.gardenCover.map(e => {
          //   return e.replace('{size}', '800x600');
          // });
          // this.communityInfo.gardenCover = gardenCover;
          // this.communityInfo.gardenCoverOriginal = gardenCoverOriginal;
        } else {
          this.$message.error(res.data.message);
        }
      }).catch((err) => {
        this.$message.error(err.message || '服务器异常');
        console.log(err);
      });
    },
    // 获取历史成交记录
    getTransactionRecord() {
      this.$axios.post(
        '/security/room/queryTransactionHistory',
        {
          city: this.city,
          gardenId: this.gardenId,
          tradeDate: $formDate(new Date(), 'yyyy-MM-dd'),
          currentPage: this.page.currentPage,
          pageSize: this.page.pageSize
        }
      ).then((res) => {
        if (res.data.status === 'C0000') {
          this.transactionInfoList = res.data.result.items;
          this.page.total = res.data.result.recordCount;
        }
      });
    },

    // 分页每页几条
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.getTransactionRecord();
    },

    // 跳到第几页
    handleCurrentChange(val) {
      this.page.currentPage = val;
      this.getTransactionRecord();
    }
  }
};
</script>
<style lang="scss" scoped>
.dialog-l {
  padding: 10px;
  background-color: #eeeeee;
  box-sizing: border-box;
}


.room_type_div {
  display: flex;
  align-items: center;
  padding: 10px 0;
  img {
    margin-right: 10px;
    width: 43px;
    height: 32px;
    display: block;
    &.room_type_img {
      cursor: pointer;
    }
  }
  .right {
    line-height: 1.4;
    h4 {
      font-size: 14px;
      color: #333;
    }
    p {
      font-size: 12px;
      color: #999;
    }
  }
}
.community_info {
  margin-bottom: 10px;
  background-color: #fff;
  display: flex;
  padding: 20px;
  .right_pic {
    margin-right: 40px;
    .display_img_div {
      width: 255px;
      height: 192px;
      position: relative;
      cursor: pointer;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
      span {
        position: absolute;
        right: 10px;
        bottom: 10px;
        background: rgba(0, 0, 0, 0.6);
        border-radius: 3px;
        height: 24px;
        line-height: 24px;
        padding: 0 5px;
        color: #fff;
        font-size: 12px;
      }
    }
  }
  .left_info {
    flex: 1;
  }
  .content-item {
    padding: 10px 0;
    font-size: 12px;
  }
  .content-item-label {
    width: auto;
    .content-item-label-justify {
      display: inline-block;
      width: 48px;
      text-align: justify;
      text-align-last: justify;
    }
  }
}
.q_history_info {
  .bd-ddd {
    position: relative;
    padding-bottom: 50px;
    margin-top: 20px;
    flex: 1;
    min-height: 175px;
  }
  .model-border {
    padding: 0 20px;
    border: none;
    margin: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    .model-header {
      padding: 0;
      text-align: left;
      font-weight: 600;
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #dddddd;
      color: #333;
      background: #fff;
      font-size: 14px;
    }
  }
}
</style>
<style lang="scss" >
.q_history_info {
  td {
    color: #999;
  }
}


</style>
<style scoped>
>>> .el-table td  .cell {
  min-height: 60px;
  line-height: 60px;
}

</style>

