<template>
  <section>
    <el-dialog title="维修详情" :visible="true" :before-close="handleClose" width="600px" :close-on-click-modal="false">
      <div class="bgceee pd-ten">
        <el-form ref="fixedForm" :model="maintainDetailData" size="mini" label-position="right" label-width="100px">

          <el-form-item label="维修类型：" prop="roomRepairType">
            <el-row>
              <el-col>
                <el-checkbox-group v-model="maintainDetailData.roomRepairType">
                  <el-checkbox disabled v-for="(val,key) in fixEnumData" :key="key" :label="key">{{val}}</el-checkbox>
                </el-checkbox-group>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item label="房间停用：" prop="isUseable">
            <el-row>
              <el-col :span="6">
                <el-radio-group v-model="maintainDetailData.isUseable">
                  <el-radio disabled label="YES">是</el-radio>
                  <el-radio disabled label="NO">否</el-radio>
                </el-radio-group>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item label="维修时间：" prop="fixedDateRange">
            <el-row>
              <el-col :span="14">
                <el-date-picker disabled v-model="maintainDetailData.fixedDateRange" format="yyyy-MM-dd" value-format="yyyy-MM-dd" clearable type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="mini">
                </el-date-picker>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item label="维修说明：">
            <el-row>
              <el-col :span="14">
                <el-input disabled type="textarea" :maxlength="300" :autosize="{ minRows: 5}" placeholder="请输入要备注的内容" v-model="maintainDetailData.repairRemark">
                </el-input>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </div>

      <div class="dialog-footer">
        <el-button type="primary" size="mini" @click="finishFixedConfirm">完成维修</el-button>
        <el-button type="primary" size="mini" @click="houseMaintainEditVisible=true">修改维修</el-button>
        <el-button size="mini" @click="roomRepairCancelConfirm">取消维修</el-button>
      </div>
    </el-dialog>

    <house-maintain-edit v-if="houseMaintainEditVisible" @closeHouseMaintainEdit="closeHouseMaintainEdit" :maintainDetailData="maintainDetailData">
    </house-maintain-edit>
  </section>
</template>

<script>
import HouseMaintainEdit from './HouseMaintainEdit'; // 维修

export default {
  components: {
    HouseMaintainEdit
  },
  props: ['addOrderParams', 'fixedId'],
  data() {
    return {
      houseMaintainEditVisible: false,
      maintainDetailData: {},
      fixEnumData: {}
    };
  },
  mounted() {
    // 维修类型枚举
    this.getFixEnum();
    this.getRoomRepairData();
  },
  methods: {
    // 打开房屋维修详情
    getRoomRepairData() {
      this.$axios.get('security/room/fix/queryRoomRepair', {
        params: { id: this.fixedId }
      })
        .then((res) => {
          // console.log(res, '维修详情');
          if (res.data.status === 'C0000') {
            this.maintainDetailData = res.data.result;
            this.initFormData();
          }
        });
    },

    // 确认取消维修 弹窗
    roomRepairCancelConfirm() {
      this.$confirm('确认取消维修?')
        .then(() => {
          this.getRoomRepairCancel();
        });
    },

    // 取消维修 请求
    getRoomRepairCancel() {
      this.$axios.get('security/room/fix/roomRepairCancel', {
        params: { id: this.fixedId }
      })
        .then((res) => {
          // console.log(res, '取消维修 返回数据');

          if (res.data.status === 'C0000') {
            this.$emit('closeHouseMaintainDetail', 'success');
            this.$store.commit('handleRefreshHouseStatusS', true);
            this.$store.commit('handleRefreshHouseStatusF', true);
            this.$message({
              message: '取消维修成功',
              type: 'success'
            });
          } else {
            this.$message.error('取消维修失败');
          };
        })
        .catch((err) => {
          console.log(err, '取消维修 err ');
        });
    },

    // 初始化 日期弹窗 默认值
    initFormData() {
      this.maintainDetailData.fixedDateRange = [this.maintainDetailData.repairStartTimeDesc, this.maintainDetailData.repairEndTimeDesc];
    },

    // 确认完成维修 弹窗
    finishFixedConfirm() {
      this.$confirm('确认完成维修?')
        .then(() => {
          this.finishFixed();
        });
    },

    // 完成维修 请求
    finishFixed() {
      this.$axios.get('security/room/fix/roomRepairComplete', { params: { id: this.maintainDetailData.id } })
        .then((res) => {
          // console.log(res, '完成维修 提交 返回结果');

          if (res.data.status === 'C0000') {
            this.$emit('closeHouseMaintainDetail', 'success');
            this.$store.commit('handleRefreshHouseStatusS', true);
            this.$store.commit('handleRefreshHouseStatusF', true);
            this.$message({
              message: '完成维修成功',
              type: 'success'
            });
          } else {
            this.$message.error('完成维修失败');
          };
        })
        .catch((err) => {
          console.log(err, '完成维修 err ');
        });
    },

    // 计算valueTime天后的日期
    transferCouponValueTime(startDate, valueTime) {
      const date = new Date(startDate);
      const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + valueTime);
      const year2 = newDate.getFullYear();
      const month2 = newDate.getMonth() + 1 < 10 ? '0' + (newDate.getMonth() + 1) : newDate.getMonth() + 1;
      const day2 = newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate();
      return year2 + '-' + month2 + '-' + day2;
    },

    // 维修类型枚举
    getFixEnum() {
      this.$axios.get('security/room/fix/queryFixEnum')
        .then((res) => {
          // console.log(res, 'queryRoomRepair');
          if (res.data.status === 'C0000') {
            this.fixEnumData = res.data.result.FixTypeEnum;
          }
        });
    },

    // 关闭修改维修弹窗
    closeHouseMaintainEdit(s) {
      this.houseMaintainEditVisible = false;
      if (s === 'success') {
        this.getRoomRepairData();
      }
    },

    // 关闭维修详情
    handleClose() {
      this.$emit('closeHouseMaintainDetail');
    }

  }
};
</script>

<style scoped>
.el-range-editor.el-input__inner {
  padding: 0;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
</style>

