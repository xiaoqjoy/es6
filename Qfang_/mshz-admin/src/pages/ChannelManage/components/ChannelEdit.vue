<template>
  <section>
    <div class="dialog-box bgc-e">
      <el-row>
        <el-col>
          <div class="dialog-l">
            <el-form ref="editForm" :model="editForm" :rules="editFormRules" size="mini" label-position="right" label-width="90px">
              <div class="house-info">
                <header class="header-info">基本信息</header>
                <div class="info-box">
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <el-form-item label="姓名：" prop="brokerName">
                        <el-input placeholder="请输入姓名" v-model="editForm.brokerName"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="手机号：">
                        <el-input placeholder="请输入手机号" disabled v-model="editForm.phone"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <el-form-item label="管家：">
                        <div @click="manageDialog = true">
                          <el-input placeholder="请选择管家" readonly v-model="editForm.managerName"></el-input>
                        </div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="区域：">
                        <el-input placeholder="请输入区域" disabled v-model="editForm.area"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <div class="house-info">
                <header class="header-info">转介信息</header>
                <div class="info-box">
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <el-form-item label="最后转介：">
                        <el-date-picker v-model="editForm.lastDate" disabled size="mini">
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="最后跟进：">
                        <el-date-picker v-model="editForm.lastFollowDate" disabled size="mini">
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <el-form-item label="注册日期：">
                        <el-date-picker v-model="editForm.creatDate" disabled size="mini">
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="累计转介：">
                        <el-input disabled v-model="editForm.totalAmount">
                          <template slot="append">套</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <el-form-item label="转介中：">
                        <el-input disabled v-model="editForm.introducingAmount">
                          <template slot="append">套</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="已成交：">
                        <el-input disabled v-model="editForm.dealAmount">
                          <template slot="append">套</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="dialog-footer">
      <el-button type="primary" size="mini" :loading="submitting" @click="handleSubmit">{{submitting? '保存中...' : '确定'}}
      </el-button>
      <el-button size="mini" @click="closeDialog">取 消</el-button>
    </div>
    <el-dialog :visible.sync='manageDialog' top="20vh" title="选择管家" :close-on-click-modal="false" width="950px" append-to-body>
      <organization v-if="manageDialog" type="addhouse" :managerName="editForm.managerName" v-on:selectManager="handleSelectManager">
      </organization>
    </el-dialog>
  </section>
</template>
<script>
import Organization from '@/pages/HouseManage/components/HouseRelease/Organization';
export default {
  name: 'channelEdit',
  data() {
    return {
      submitting: false, // 正在提交保存
      editForm: {}, // 编辑表单
      editFormRules: {
        brokerName: [
          { required: true, message: '请输入姓名', trigger: 'change' },
          { pattern: /^[\u4E00-\u9FA5A-Za-z0-9]{2,20}$/, message: '请输入姓名，2-20个中英文字符', trigger: 'change' }
        ]
      },
      manageDialog: false // 选择管家
    };
  },
  props: {
    id: String,
    detailsData: Object
  },
  created() {
    this.editForm = Object.assign({}, this.detailsData);
  },
  methods: {
    // 关闭表格
    closeDialog(flag) {
      this.$emit('changeDialog', false);
    },
    // 保存表单
    handleSubmit() {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.submitting = true;
          this.$axios.post('/security/broker/manage/editBroker', {
            brokerId: this.id,
            newManagerId: this.editForm.managerId,
            newManagerName: this.editForm.managerName,
            newName: this.editForm.brokerName
          }).then((res) => {
            this.submitting = false;
            if (res.data.status === 'C0000') {
              this.$message.success('修改成功');
              this.$emit('refreshData');
              this.$emit('changeDialog', false);
            } else {
              this.$message.error(res.data.message);
            }
          }).catch((res) => {
            this.$message.error('服务异常');
            console.log(res);
          });
        }
      });
    },
    // 选择管家
    handleSelectManager(data) {
      this.editForm.managerName = data.name;
      this.editForm.managerId = data.id;
      this.manageDialog = data.flag;
    }
  },
  components: {
    Organization
  }
};
</script>
<style scoped>
.house-info {
  border: 1px solid #dddddd;
  margin-bottom: 10px;
  background-color: #fff;
}

.header-info {
  text-align: left;
  height: 35px;
  line-height: 35px;
  font-weight: 600;
  padding: 0 20px;
  border-bottom: 1px solid #dddddd;
  background-color: #fafafa;
  color: #333;
}
.info-box {
  padding: 20px 20px 0 20px;
}
.dialog-l {
  padding: 10px;
  background-color: #eeeeee;
}
</style>

