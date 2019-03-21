<template>
  <section>
    <div class="bgceee">
      <el-row>
        <el-col :span="6"
          class="font-c">
          <div class="img-content">
            <img v-if="userInfo.photoUrl"
              :src="userInfo.photoUrl.replace(/{size}/g, '120x120')+'?tailor=false'"
              class="head-img">
            <span v-else class="default-head-bgc">
              <i class="icon iconfont icon-morentouxiang default-head"></i>
            </span>
          </div>
        </el-col>
        <el-col :span="16">
          <p class="line-h-40 font-12">
            <span class="c-9">姓名：</span>{{userInfo.name}}
          </p>
          <p class="line-h-40 font-12">
            <span class="c-9">部门：</span>{{userInfo.orgName}}
          </p>
          <p class="line-h-40 font-12">
            <span class="c-9">岗位：</span>{{userInfo.positionName}}
          </p>
          <div class="flex-start-grow pdt-10">
            <span class="c-9 font-12">签名：</span>
            <div class="flex-1">
              <my-textarea :model.sync="remark"
                placeholder="请输入"
                :rows="7"
                :minlength="8"
                :maxlength="300">
              </my-textarea>
              <p class="c-9 line-h-40 font-12">注：签名客户可见，请认真填写</p>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="dialog-footer">
      <el-button type="primary"
        @click="handle"
        size="mini">提交</el-button>
      <el-button size="mini"
        @click="closeDialog">取消</el-button>
    </div>
  </section>
</template>
<script>
import { mapState } from 'vuex';
import myTextarea from '@/components/MyTextarea';
export default {
  computed: {
    ...mapState([
      'userInfo'
    ])
  },
  components: {
    myTextarea
  },
  data() {
    return {
      remark: ''
    };
  },
  props: {

  },
  methods: {
    handle() {
      this.$axios.post(
        '/security/org/person/updatePerson',
        {
          personIntro: this.remark
        }
      ).then((res) => {
        if (res.data.status === 'C0000') {
          this.$message.success('处理成功');
          this.closeDialog();
        } else {
          this.$message.error(res.data.message);
        }
      }).catch((e) => {
        this.$message.error('处理失败');
      });
    },
    closeDialog() {
      this.$emit('update:personDialog', false);
    }
  }
};
</script>
<style scoped>
.img-content {
  display: inline-block;
  width: 120px;
  height: 120px;
  margin: 0 20px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid #ccc;
}
.default-head-bgc {
  display: inline-block;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #ccc;
  line-height: 144px;
  text-align: center;
  vertical-align: bottom;
}
.default-head {
  font-size: 100px;
  color: #fff;
}
</style>

