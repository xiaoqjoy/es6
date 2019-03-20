<template>
  <section class="dialog-box bgc-e">
    <div class="dialog-l">
      <div class="owner-info box_div">
        <header class="header-info">
          <span>委托信息</span>
        </header>
        <div class="info-box">
          <el-row :gutter="10">
            <el-col :span="8">
              <p class="content-item">
                <span class="content-item-label">
                  <span class="content-item-label-justify">姓名</span>：</span>{{entrustData.nickname || '--'}}
              </p>
            </el-col>
            <el-col :span="8">
              <p class="content-item">
                <span class="content-item-label">
                  <span class="content-item-label-justify">手机</span>：</span>{{entrustData.phoneDesc || '--'}}
                <el-button @click="handleShowPhone"
                  v-if="entrustData.phoneFlag == 1"
                  size="mini"
                  type="text">查看</el-button>
              </p>
            </el-col>
            <el-col :span="8">
              <p class="content-item">
                <span class="content-item-label">
                  <span class="content-item-label-justify">期望租金</span>：</span>{{entrustData.rent || '--'}} 元/月
              </p>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <p class="content-item">
                <span class="content-item-label">
                  <span class="content-item-label-justify">来源</span>：</span>{{entrustData.entrustSourceDesc || '--'}}
              </p>
            </el-col>
            <el-col :span="8">
              <p class="content-item">
                <span class="content-item-label">
                  <span class="content-item-label-justify">委托日期</span>：</span>{{entrustData.entrustDateDesc || '--'}}
              </p>
            </el-col>
            <el-col :span="8">
              <p class="content-item">
                <span class="content-item-label">
                  <span class="content-item-label-justify">核查日期</span>：</span>{{entrustData.checkDateDesc || '--'}}
              </p>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <p class="content-item">
                <span class="content-item-label">
                  <span class="content-item-label-justify">跟进人</span>：</span>{{entrustData.lastFollowName || '--'}}
              </p>
            </el-col>
            <el-col :span="8">
              <p class="content-item">
                <span class="content-item-label">
                  <span class="content-item-label-justify">跟进时间</span>：</span>{{entrustData.lastFollowDateDesc || '--'}}
              </p>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      showPhone: false
    };
  },
  props: {
    entrustData: {
      type: Object
    },
    entrustId: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleShowPhone() {
      this.$axios.post('/security/room/entrust/showPhone',
        { entrustId: this.entrustId }
      ).then((res) => {
        if (res.data.status === 'C0000') {
          this.$emit('refreshData');
        } else {
          this.$message.warning(res.data.message);
        }
      }).catch(err => {
        this.$message.warning('查看手机号码失败！');
        console.log(err);
      });
    }
  }

};
</script>
<style lang="scss" scoped>
.box_div {
  background-color: #fff;
  padding: 0 20px;
}
.color_red {
  color: #fa5555;
}
.content-item {
  font-size: 12px;
  line-height: 30px;
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

.house-img {
  min-height: 240px;
  .img-item-box {
    width: auto;
    height: auto;
    margin: 4px;
    .img-content {
      width: 137px;
      height: 103px;
    }
  }
  .p-title {
    font-size: 12px;
    color: #333;
    margin-top: 10px;
  }
}
.header-info {
  text-align: left;
  font-weight: 600;
  height: 40px;
  line-height: 40px;
  /* padding: 0 20px; */
  border-bottom: 1px solid #dddddd;
  /* background-color: #fafafa; */
  color: #333;
}
.info-box {
  padding: 20px 0px;
}

.dialog-l {
  padding: 10px;
  background-color: #eeeeee;
}

/* .content-item {
  padding-bottom: 15px;
  text-align: left;
}
.content-item-label {
  display: inline-block;
  width: 80px;
  text-align: right;
  color: #999;
} */
</style>
