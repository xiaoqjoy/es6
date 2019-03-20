<template>
  <section class="follow-box dialog-box">
    <div class="border-ddd">
      <slot v-if="type === 'longCont'">
        <el-table :data="followData" style="width: 100%" size="mini" v-loading="loading">
          <!-- 5-300字 -->
          <el-table-column prop="content" label="操作内容" align="left">
          </el-table-column>
          <el-table-column prop="opertrator" label="操作人" align="left" width="180">
          </el-table-column>
          <el-table-column prop="createTime" label="操作时间" align="left" width="180">
          </el-table-column>
        </el-table>
      </slot>
      <slot v-else>
        <el-table :data="followData" style="width: 100%" size="mini" v-loading="loading">
          <!-- 5-300字 -->
          <el-table-column prop="content" label="操作内容" align="left">
          </el-table-column>
          <el-table-column prop="operatorName" label="操作人" align="left" width="180">
          </el-table-column>
          <el-table-column prop="createTimeDesc" label="操作时间" align="left" width="180">
          </el-table-column>
        </el-table>
      </slot>

    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      url: '',
      loading: false,
      followInfo: '',
      roomId: '',
      bdName: '柚子',
      followData: [
        // {
        //   'content': 'string',
        //   'createTimeDesc': 'string',
        //   'id': 'string',
        //   'operatorName': 'string',
        //   'roomId': 'string'
        // }
      ]
    };
  },
  props: ['id', 'type', 'contractId'],
  created() {
    if (this.type === 'contract') {
      this.url = '/security/room/contract/queryContractModify';
      this.requestData(this.id);
    } else if (this.type === 'longCont') {
      this.url = '/security/roomStatus/contract/queryLogByContractId';
      this.requestData(this.id);
    } else if (this.type === 'longSituation') {
      this.url = '/security/room/longSituation/queryLongSituationModify';
      this.requestData(this.id);
    } else {
      this.url = '/security/room/manage/querymodify';
      this.requestData(this.id);
    }
  },
  methods: {
    // 获取
    requestData(id) {
      this.loading = true;
      this.$axios.get(
        this.url,
        {
          params: {
            id: id
          }
        }
      ).then((res) => {
        this.loading = false;
        if (res.data.status === 'C0000') {
          this.followData = res.data.result;
        } else {
          this.followData = [];
        }
      }).catch((res) => {
        console.log(res);
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
</style>

