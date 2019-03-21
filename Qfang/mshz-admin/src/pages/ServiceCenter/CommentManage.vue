<template>
  <section class="house-box">
    <header class="house-header">
      <div class="search-box pdl-ten">
        <el-row :gutter="10">
          <el-col :span="3">
            <el-select v-model="replyStatus"
              placeholder="评价状态"
              size="mini"
              @change="handleReplaySataus">
              <el-option label="已回复"
                value="ALREADY_REPLY"></el-option>
              <el-option label="未回复"
                value="NOT_REPLY"></el-option>
            </el-select>
          </el-col>
          <el-col :span="7">
            <el-input v-model="keyword"
              placeholder="输入房间标题/楼盘/楼栋/房号/用户姓名搜索"
              size="mini"
              clearable/>
          </el-col>
          <el-col :span="3">
            <el-button size="mini"
              type="primary"
              @click="handlePageChange(1)">搜索</el-button>
          </el-col>
        </el-row>
      </div>
    </header>
    <slot v-if="commentData && commentData.length > 0">
      <div class="house-list"
        v-loading="loading">
        <div class="contet-box">
          <div class="comments model-border"
            v-for="(item,index) in commentData"
            :key="index">
            <div class="comment-content">
              <div class="head-img-box">
                <div class="img-contennt">
                  <img v-if="item.headPortrait"
                    :src="item.headPortrait.replace('{size}', '60x60')"
                    class="head-img">
                  <span v-else
                    class="default-head-bgc">
                    <i class="icon iconfont icon-morentouxiang default-head"></i>
                  </span>
                  <!-- headPortrait -->
                </div>
              </div>
              <div class="comment-info">
                <!-- 头部 -->
                <div class="pdt-20 comment-haeder clearfix">
                  <div class="user-grade float-l">
                    <div class="user-name">{{item.nickName}}</div>
                    <div class="font-default check-box">
                      <el-rate v-model="item.score"
                        disabled
                        show-score
                        text-color="#008842"
                        :score-template="item.score + '分'"
                        :colors="['#008842', '#008842', '#008842']">
                      </el-rate>
                      <div class="check-info font-default pdl-ten">
                        <span>环境：{{item.roomEnvironment}} 分</span>
                        <span>服务：{{item.serviceAttitude}} 分</span>
                        <span class="pdl-ten">入住时间：{{item.startTimeDesc}}至{{item.endTimeDesc}}（共{{item.days}}天）</span>
                      </div>
                    </div>
                  </div>
                  <div class="float-r">
                    <span class="mgr-20 inb font-12"
                      v-if="item.replyStatus === 'ALREADY_REPLY'">已回复</span>
                    <span class="mgr-20 inb c-red font-12"
                      v-else>未回复</span>
                    <el-button size="mini"
                      v-if="item.shield ==='NOT_SHIELD'"
                      @click="handleShield(item.id,'ALREADY_SHIELD',item.nickName, index)">屏蔽</el-button>
                    <el-button size="mini"
                      v-else
                      @click="handleShield(item.id,'NOT_SHIELD',item.nickName, index)">取消屏蔽</el-button>
                  </div>
                </div>
                <!-- 文字 -->
                <div class="pdt-10 font-default reply-content ">
                  {{item.content}}
                </div>
                <!-- 图片 -->
                <div v-if="item.commentPicture.trim().length > 0"
                  class="user-commit pdt-10">
                  <viewer :options="options"
                    :images="(item.commentPicture.split(','))"
                    class="commitviewer"
                    ref="commitviewer">
                    <template slot-scope="scope">
                      <div class="user-commit-img"
                        v-for="(imgs,index) in item.commentPicture.split(',')"
                        :key="index">
                        <img :src="imgs.replace('{size}', '60x60')"
                          :data-source="imgs.replace('{size}', '800x600')+'?tailor=false'"
                          class="commit-img-item">
                      </div>
                      <!-- <div v-for="(imgItem, index) in houseInfo.pictureList" :key="index" class="img-item-box">
                        <img :src="imgItem.pictureUrl.replace('{size}', '160x120')" :data-source="imgItem.pictureUrl.replace('{size}', '800x600')" class="img-content">
                        <p v-if="scope.images.length> 0" class="font-c">{{scope.images[index].pictureTypeDesc}}</p>
                      </div> -->
                    </template>
                  </viewer>

                </div>
                <!-- 时间 -->
                <div class="user-commit-tiem pdt-10">
                  <span class="float-l font-default">{{item.commentTime}}</span>
                  <div class="float-r ">
                    <i class="icon iconfont icon-pingjiashumutubiao font-12"></i>
                    <el-button type="text"
                      size="small"
                      @click="handleAnswer(item.id ,index)">
                      <span class="font-12">回复</span>
                    </el-button>
                  </div>
                </div>
                <!-- 回复 -->
                <div v-if="item.replyList.length > 0"
                  class="bubble-dialog">
                  <div class="reply-content"
                    v-for="(replys,index) in item.replyList"
                    :key="index">
                    <span class="c-0 font-w">{{replys.replyName}}</span>
                    <span v-if="replys.positionName">({{replys.positionName}})</span>
                    回复：{{replys.replyContent}}
                  </div>
                  <i class="t"></i>
                  <b class="t"></b>
                </div>
              </div>
              <div class="comment-house-info flex-center">
                <a :href="'//www.mshz.com/houseDetails?id=' + item.situationId"
                  target="_blank"
                  class="db">
                  <div class="house-house-content">
                    <div class="house-img">
                      <img :src="item.mainPic.replace(/{size}/g, '200x150')"
                        class="commit-img-item">
                    </div>
                    <p class="pdt-20 font-c">{{item.title}}</p>
                    <p class="font-default font-c pdt-10">{{item.gardenName}}/{{item.buildingName}}/{{item.roomNumber}}</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
          
        </div>
        <div class="house-pagination">
            <el-pagination class="page"
              @size-change="handleSizeChange"
              @current-change="handlePageChange"
              :current-page="currentPage"
              :page-sizes="[20, 30, 50]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="recordCount">
            </el-pagination>
          </div>
      </div>
    </slot>
    <slot v-else>
      <div class="no-data-found flex-center">
        暂无数据！
      </div>
    </slot>
    <!-- 弹框 -->
    <el-dialog width="50%"
      title="回复"
      :visible.sync="innerVisible">
      <div>
        <el-input type="textarea"
          :rows="7"
          placeholder="请输入回复内容"
          v-model="textarea"
          :maxlength="200"
          :max="200"
          :min="2"></el-input>
      </div>
      <div class="dialog-footer">
        <el-button type="primary"
          size="mini"
          @click="sendAnswer">确定</el-button>
        <el-button size="mini"
          @click="innerVisible = false,textarea='',commentId='' ">取消</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import { handlePages } from '@/components/common/mixin';
export default {
  name: 'CommentManage',
  mixins: [handlePages],
  data() {
    return {
      loading: true,
      options: {
        url: 'data-source',
        title: false,
        zIndex: 99999
      },

      replyStatus: '',
      keyword: '',
      textarea: '',
      commentId: '',
      innerVisible: false,
      commentData: [],
      currentIndex: '',
      value5: 3.7
    };
  },
  created() {
    this.requestData();
  },
  methods: {
    // 获取列表数据
    requestData() {
      this.loading = true;
      this.$axios.get('/security/order/comment/searchComment', {
        params: {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          replyStatus: this.replyStatus,
          keyword: this.keyword
        }
      }
      ).then((res) => {
        this.loading = false;
        if (res.data.status === 'C0000') {
          let { result } = res.data;
          this.currentPage = result.currentPage;
          this.pageCount = result.pageCount;
          this.recordCount = result.recordCount;
          this.commentData = result.items;
        } else {
          this.$message.error('请求数据失败！');
        }
      }).catch((err) => {
        this.loading = false;
        this.$message.error(err.message || '服务器异常');
        console.log(err);
      });
    },

    handleReplaySataus(key, keyPath) {
      this.replyStatus = key;
      this.handlePageChange(1);
    },

    // 屏蔽
    handleShield(id, status, name, i) {
      let handle = '屏蔽';
      if (status === 'NOT_SHIELD') {
        handle = '取消屏蔽';
      }
      this.$confirm('确实' + handle + name + '的评论吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post('/security/order/comment/shieldComment', {
          commentId: id,
          shield: status
        }).then((res) => {
          if (res.data.status === 'C0000') {
            if (res.data.result) {
              if (status === 'NOT_SHIELD') {
                this.$set(this.commentData[i], 'shield', 'NOT_SHIELD');
              } else {
                this.$set(this.commentData[i], 'shield', 'ALREADY_SHIELD');
              }
              this.$message({
                type: 'success',
                message: res.data.message
              });
            } else {
              this.$message({
                type: 'error',
                message: '处理失败'
              });
            }
          } else {
            this.$message({
              type: 'error',
              message: res.data.message
            });
          }
        }).catch((e) => {
          this.$message({
            type: 'error',
            message: '服务异常'
          });
        });
      }).catch(() => {

      });
    },

    // 回复
    handleAnswer(id, i) {
      this.innerVisible = true;
      this.textarea = '';
      this.commentId = id;
      this.currentIndex = i;
    },

    sendAnswer() {
      this.$axios.post('/security/order/comment/reply', {
        commentId: this.commentId,
        replyContent: this.textarea
      }).then((res) => {
        if (res.data.status === 'C0000') {
          if (res.data.result) {
            // this.commentData[]
            this.commentData[this.currentIndex].replyList.push({
              replyName: '小李',
              replyContent: this.textarea,
              positionName: '房源BD'
            });
            this.$set(this.commentData[this.currentIndex], 'replyStatus', 'ALREADY_REPLY');
            this.innerVisible = false;
            this.textarea = '';
            this.commentId = '';
            this.$message({
              type: 'success',
              message: res.data.message
            });
          } else {
            this.$message({
              type: 'error',
              message: '处理失败'
            });
          }
        } else {
          this.$message({
            type: 'error',
            message: res.data.message
          });
        }
      }).catch((e) => {
        this.$message({
          type: 'error',
          message: '服务异常'
        });
      });
    }
  }
};
</script>

<style scoped>
a:link {
  color: #000000;
  text-decoration: none;
}

.list-wrapper {
  position: relative;
  padding-bottom: 20px;
  box-sizing: border-box;
  height: 100%;
  padding-top: 80px;
}
.header {
  display: block;
  margin-top: -80px;
  height: 60px;
  width: 100%;
  position: relative;
  top: 0;
  left: 0;
  background-color: #fff;
}
.search-box {
  height: 50px;
  line-height: 50px;
}
.list-header {
  display: block;
  height: 60px;
  line-height: 60px;
  padding: 0 20px;
  margin-top: -80px;
  text-align: left;
  background-color: #fff;
}

.houseing-table {
  position: relative;
  margin: 20px 20px 0 20px;
  padding-bottom: 50px;
  height: 100%;
  box-sizing: border-box;
  background-color: #eee;
}

.default-color {
  background-color: #333;
}

.contet-box {
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
}
.comments {
  /* min-height: 360px; */
  /* height: 100%; */
  width: 100%;
  /* display: flex;
  justify-content: flex-start;
  align-items: flex-start; */
}
.check-box {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.check-info {
  padding-top: 8px;
}
.comment-content {
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  /* align-items: flex-start; */
  height: 100%;
}

.comment-house-info {
  /* height: 100%; */
  width: 200px;
  padding: 20px;
  background-color: #fafafa;
  border-left: 1px solid #ddd;
}
.comment-haeder {
  /* height: 50px; */
  padding-bottom: 10px;
}
.head-img-box {
  /* height: 360px; */
  width: 60px;
  padding: 20px 0 20px 20px;
  /* display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center; */
}
.img-contennt {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
}
.head-img {
  display: inline-block;
  outline: none;
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.comment-info {
  width: 100%;
  height: 100%;
  text-align: left;
  padding: 10px 20px;
}

.user-commit-img {
  display: inline-block;
  width: 60px;
  height: 60px;
  margin-right: 10px;
}
.commit-img-item {
  display: inline-block;
  outline: none;
  width: 100%;
  height: 100%;
}
.user-commit-tiem {
  height: 30px;
  line-height: 30px;
}
.house-img {
  width: 200px;
  height: 150px;
}
.bubble-dialog {
  min-height: 50px;
  padding: 10px;
  position: relative;
  background-color: #fafafa;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-top: 5px;
}
.bubble-dialog i,
.bubble-dialog b {
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
  border-width: 5px;
  display: block;
}
/*上*/
.bubble-dialog i.t,
.bubble-dialog b.t {
  border-style: dashed dashed solid dashed;
}
.bubble-dialog i.t {
  top: -10px;
  left: 20px;
  border-color: transparent transparent #ccc transparent;
}
.bubble-dialog b.t {
  top: -9px;
  left: 20px;
  border-color: transparent transparent #fafafa transparent;
}
.reply-content {
  padding-top: 5px;
  font-size: 14px;
  color: #666;
  /* word-wrap: break-word; */
  word-break: break-all;
  width: 100%;
  line-height: 1.5;
}
.default-head-bgc {
  display: inline-block;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #ccc;
  line-height: 70px;
  text-align: center;
  vertical-align: bottom;
}
.default-head {
  font-size: 50px;
  color: #fff;
}
.no-data {
  height: 90%;
  margin-right: 20px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.no-data-found {
  box-sizing: border-box;
  margin: 20px 20px 0 20px;
  height: 100%;
  font-size: 14px;
  text-align: center;
  background-color: #fff;
  border: 1px solid #dddddd;
}

i.font-12 {
  font-size: 12px;
}
.check-box >>> .el-rate__icon {
  margin-right: 0;
}
.check-box >>> .el-rate__text {
  padding-left: 5px;
  line-height: 27px;
}
</style>
