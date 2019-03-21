<template>
  <section>
    <el-dialog title="房源维修" :visible="true" :before-close="handleClose" width="600px" :close-on-click-modal="false">
      <div class="bgceee pd-ten">
        <el-form ref="fixedForm" :model="myMaintainDetailData" :rules="rules" size="mini" label-position="right" label-width="100px">
          <el-form-item label="维修类型：" prop="roomRepairType">
            <el-row>
              <el-col>
                <el-checkbox-group v-model="myMaintainDetailData.roomRepairType">
                  <el-checkbox v-for="(val,key) in fixEnumData" :key="key" :label="key">{{val}}</el-checkbox>
                </el-checkbox-group>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item label="房间停用：" prop="isUseable">
            <el-row>
              <el-col :span="6">
                <el-radio-group v-model="myMaintainDetailData.isUseable">
                  <el-radio label="YES">是</el-radio>
                  <el-radio label="NO">否</el-radio>
                </el-radio-group>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item label="维修时间：" prop="fixedDateRange">
            <el-row>
              <el-col :span="14">
                <el-date-picker v-model="myMaintainDetailData.fixedDateRange" format="yyyy-MM-dd" value-format="yyyy-MM-dd" clearable type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="mini">
                </el-date-picker>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item label="维修说明：">
            <el-row>
              <el-col :span="14">
                <el-input type="textarea" :maxlength="300" :autosize="{ minRows: 5}" placeholder="请输入要备注的内容" v-model="myMaintainDetailData.repairRemark">
                </el-input>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </div>

      <div class="dialog-footer">
        <el-button type="primary" size="mini" @click="save('fixedForm')">保存</el-button>
        <el-button size="mini" @click="handleClose">取消</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
export default {
  props: ['maintainDetailData'],
  data() {
    return {
      rules: {
        roomRepairType: [
          { required: true, message: '请选择维修类型', trigger: 'change' }
        ],
        isUseable: [
          { required: true, message: '请选择房间是否停用', trigger: 'change' }
        ],
        fixedDateRange: [
          { required: true, message: '请选择维修时间范围', trigger: 'change' }
        ]
      },
      myMaintainDetailData: {
        roomId: '',
        isUseable: '',
        repairStartTime: '',
        repairEndTime: '',
        repairRemark: '',
        roomRepairType: [],
        fixedDateRange: []
      },
      fixEnumData: {}
    };
  },
  mounted() {
    // 初始化默认值
    this.initFormData();

    // 维修类型枚举
    this.getFixEnum();
  },
  methods: {
    // 初始化默认值
    initFormData() {
      this.myMaintainDetailData = JSON.parse(JSON.stringify(this.maintainDetailData));
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

    save(formName) {
      this.$refs[formName].validate(
        (valid) => {
          if (valid) {
            this.$confirm('确认修改维修?')
              .then(() => {
                this.getUpdateRoomRepair();
              });
          } else {
            this.$message.error(' 修改的内容不符合规则');
          }
        });
    },

    getUpdateRoomRepair() {
      const params = JSON.parse(JSON.stringify(this.myMaintainDetailData));

      params.repairStartTime = params.fixedDateRange[0];
      params.repairEndTime = params.fixedDateRange[1];

      delete params.fixedDateRange;

      this.$axios.post('security/room/fix/updateRoomRepair', params)
        .then((res) => {
          if (res.data.status === 'C0000') {
            this.$emit('closeHouseMaintainEdit', 'success');

            // 更新房态页面
            let today = this.transferCouponValueTime((new Date()).toLocaleDateString(), 0);
            if (today === params.repairStartTime) {
              this.$store.commit('handleRefreshHouseStatusS', true);
            }
            this.$store.commit('handleRefreshHouseStatusF', true);

            this.$message({
              message: '修改 维修成功',
              type: 'success'
            });
          } else {
            this.$message({
              message: '修改 维修失败：' + res.data.message,
              type: 'error'
            });
          };
        })
        .catch((err) => {
          console.log(err, '修改 维修 err ');
        });
    },

    addNewFixed() {
      const params = JSON.parse(JSON.stringify(this.maintainInfo));

      params.repairStartTime = params.fixedDateRange[0];
      params.repairEndTime = params.fixedDateRange[1];

      delete params.fixedDateRange;

      this.$axios.post('security/room/fix/addRoomRepair', params)
        .then((res) => {
          // console.log(res, '新增维修 提交返回结果');

          if (res.data.status === 'C0000') {
            this.$emit('closeHouseMaintain', 'success');

            this.$message({
              message: '新增维修成功',
              type: 'success'
            });
          } else {
            this.$message.error('新增维修失败');
          };
        })
        .catch((err) => {
          console.log(err, '新增维修 err ');
        });
    },

    handleClose() {
      this.$emit('closeHouseMaintainEdit');
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

