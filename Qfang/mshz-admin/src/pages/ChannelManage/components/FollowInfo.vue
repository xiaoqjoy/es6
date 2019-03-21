<template>
  <section class="follow-box dialog-box">
    <div>
      <el-row>
        <el-col :span="22">
          <textarea type="textarea" rows="2" v-model="followInfo" autocomplete="off" validateevent="true" class="v-textarea" style="min-height: 33px;"></textarea>
        </el-col>
        <el-col :span="2">
          <button class="v-button" @click="handleSubmit">
            <span>保存</span>
          </button>
        </el-col>
      </el-row>
    </div>
    <div class="follow-table border-ddd">
      <el-table :data="followData" style="width: 100%" size="mini" v-loading="loading">
        <!-- 5-300字 -->
        <el-table-column prop="follow" label="跟进内容" align="left">
        </el-table-column>
        <el-table-column prop="managerName" label="跟进人" align="left" width="180">
        </el-table-column>
        <el-table-column prop="followTimeDesc" label="跟进时间" align="left" width="180">
        </el-table-column>
      </el-table>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      followInfo: '',
      followData: []
    };
  },
  props: ['id', 'managerId', 'orgId'],
  created() {
    this.requestData();
  },
  methods: {
    // 获取
    requestData() {
      this.loading = true;
      this.$axios.get('/security/broker/manage/queryBrokerFollow', {
        params: {
          brokerId: this.id,
          managerId: this.managerId,
          orgId: this.orgId
        }
      }).then((res) => {
        this.loading = false;
        if (res.data.status === 'C0000') {
          this.followData = res.data.result;
        } else {
          this.followData = [];
        }
      }).catch((res) => {
        console.log(res);
      });
    },
    // 提交
    handleSubmit() {
      this.loading = true;
      this.$axios.post('/security/broker/manage/addBrokerFollow', {
        follow: this.followInfo,
        brokerId: this.id
      }).then((res) => {
        this.loading = false;
        if (res.data.status === 'C0000' && res.data.result) {
          this.$message.success('操作成功');
          this.followInfo = '';
          this.requestData();
        } else {
          this.$message.error(res.data.message);
        }
      }).catch((e) => {
        this.$message.error('服务异常');
      });
    }
  }
};
</script>
<style scoped>
.follow-box {
  padding: 10px;
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

/* .el-button--success:active {
  outline: 0;
}

.el-button--success.is-active,
.el-button--success:active {
  background: #5daf34;
  border-color: #5daf34;
  color: #fff;
}

.el-button:active {
  color: #3a8ee6;
  border-color: #3a8ee6;
  outline: 0;
}
.el-button--success:focus,
.el-button--success:hover {
  background: #85ce61;
  border-color: #85ce61;
  color: #fff;
} */
</style>

