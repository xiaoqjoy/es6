<template>
  <section class="follow-box dialog-box">
    <div>
      <el-row>
        <el-col :span="22">
          <textarea type="textarea"
            rows="2"
            :minlength="5"
            :maxlength="300"
            v-model="followInfo"
            autocomplete="off"
            validateevent="true"
            class="v-textarea"
            style="min-height: 33px;">
          </textarea>
        </el-col>
        <el-col :span="2">
          <button class="v-button"
            @click="handleSubmit">
            <span>保存</span>
          </button>
        </el-col>
      </el-row>
    </div>
    <div class="follow-table border-ddd">
      <el-table :data="followData"
        height="350px"
        style="width: 100%;height:350px"
        size="mini"
        v-loading="loading">
        <!-- 5-300字 -->
        <el-table-column prop="content"
          label="跟进内容"
          align="left">
        </el-table-column>
        <el-table-column prop="followPeople"
          label="跟进人"
          align="left"
          width="180">
        </el-table-column>
        <el-table-column prop="followDateDesc"
          label="跟进时间"
          align="left"
          width="180">
        </el-table-column>
      </el-table>
      <el-pagination class="take-pagination"
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
        :current-page="currentPage"
        :page-sizes="[20, 30, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="recordCount">
      </el-pagination>
    </div>
  </section>
</template>
<script>
import { mapState } from 'vuex';
import { handlePages } from '@/components/common/mixin';
export default {
  computed: {
    ...mapState(['userInfo'])
  },
  mixins: [handlePages],
  data() {
    return {
      loading: false,
      followInfo: '',
      followData: [
        // {
        //   'followInfo': '跟进房源',
        //   'followPersonName': '',
        //   'followTime': 1514890961320,
        //   'id': '',
        //   'roomId': '00f1cf6f-2eb9-4b4b-ad3c-95a03795dea4'
        // }
      ]
    };
  },
  // props: ['entrustId'],
  props: {
    entrustId: {
      type: String
    },
    refreshList: {
      type: Boolean,
      default: false
    }
  },
  created() {
    this.isRefresh = false; // 是否刷新列表
    this.requestData();
  },
  methods: {
    // 获取
    requestData() {
      this.loading = true;
      this.$axios.get(
        '/security/room/entrust/selectFollowPage',
        {
          params: {
            pageSize: this.pageSize,
            currentPage: this.currentPage,
            entrustId: this.entrustId
          }
        }
      ).then((res) => {
        this.loading = false;
        if (res.data.status === 'C0000') {
          this.recordCount = res.data.result.recordCount;
          this.followData = res.data.result.items;
        } else {
          this.followData = [];
        }
      }).catch((res) => {
        console.log(res);
      });
    },
    // 提交
    handleSubmit() {
      if (this.followInfo.trim().length < 5) {
        this.$message.warning('至少要填5个字符！');
        return;
      }
      this.$axios.post(
        '/security/room/entrust/addFollow',
        {
          content: this.followInfo,
          entrustId: this.entrustId,
          createOperatorId: this.userInfo.createOperatorId,
          followPeople: this.userInfo.name
        }
      ).then((res) => {
        if (res.data.status === 'C0000') {
          this.$message.success('操作成功');
          this.followInfo = '';
          this.requestData();
          this.$emit('refreshData');
          // 打开窗口，操作多次跟进，限制只刷新一次列表，列表的跟进 时间只展示最少单位为天 ,如展示到 小时与分钟，需实时刷。
          if (!this.isRefresh) {
            this.isRefresh = true;
            this.$emit('update:refreshList', true);
          }
        } else {
          this.$message.error(res.data.message);
        }
      }).catch((err) => {
        this.$message.error(err.message || '服务异常');
      });
    }
  }
};
</script>
<style scoped>
.follow-box {
  padding: 20px;
  background-color: #eeeeee;
  box-sizing: border-box;
}

.v-textarea {
  display: block;
  resize: vertical;
  padding: 5px 15px;
  line-height: 1.5;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  font-size: 14px;
  color: #5a5e66;
  background-color: #fff;
  border: 1px solid #a6a6a6;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.v-textarea:focus {
  outline: 0;
  border: 1px solid #008842;
}
.v-button {
  display: inline-block;
  height: 54px;
  width: 100%;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #008842;
  border: 1px solid #42905b;
  color: #ffffff;
  -webkit-appearance: none;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  -webkit-transition: 0.1s;
  transition: 0.1s;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 14px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}

.v-button:hover {
  background-color: #4c9c65;
  border: 1px solid #26743f;
}
.v-button:active {
  background: #5daf34;
  border-color: #5daf34;
  color: #fff;
}

.follow-table {
  margin-top: 20px;
}
.v-success {
  color: #fff;
  background-color: #67c23a;
  border-color: #67c23a;
}
.take-pagination {
  /* display: none; */
  width: 100%;
  /* padding-top: 9px; */
  box-sizing: border-box;
  background-color: #fafafa;
}
</style>

