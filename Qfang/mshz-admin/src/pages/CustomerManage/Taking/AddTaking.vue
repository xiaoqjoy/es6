<template>
  <section>
    <section class="take-dialog pd-20">
      <el-form ref="addTaking"
        :model="addTakingData"
        :rules="addTakingRules"
        size="mini"
        label-position="right"
        label-width="90px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="客户："
              prop="customerId">
              <el-input v-if="addType === 'complete' || addType === 'edit' || source === 'custDetail'"
                readonly
                disabled
                v-model="addTakingData.userName"
                :maxlength="12">
              </el-input>
              <el-select v-else
                v-model="addTakingData.customerId"
                filterable
                placeholder="请输入关键字"
                remote
                @change="selectCustomer"
                :remote-method="remoteCustomer"
                clearable>
                <el-option v-for="(item, index) in optionsCustList"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="手机号："
              prop="phone">
              <el-input placeholder="请输入手机号"
                readonly
                :disabled="true"
                v-model="addTakingData.phone"
                :maxlength="12">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <slot v-if="addType!=='add' && addType !== 'edit'">
            <el-col :span="8">
              <el-form-item label="带看时间："
                prop="leadLookDate">
                <!-- value-format="yyyy-MM-dd:HH:MM" -->
                <el-date-picker v-model="addTakingData.leadLookDate"
                  popper-class="taking-time"
                  :picker-options="comptelePickerOptions"
                  format="yyyy-MM-dd HH:mm"
                  value-format="yyyy-MM-dd HH:mm"
                  type="datetime"
                  size="mini">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </slot>
          <slot v-else>
            <el-col :span="8">
              <el-form-item label="预约时间："
                prop="appointTime">
                <!-- value-format="yyyy-MM-dd:HH:MM" -->
                <el-date-picker v-model="addTakingData.appointTime"
                  popper-class="taking-time"
                  clearable
                  format="yyyy-MM-dd HH:mm"
                  value-format="yyyy-MM-dd HH:mm"
                  :picker-options="pickerOptions"
                  type="datetime"
                  size="mini">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </slot>
        </el-row>
        <el-row v-if="addType !== 'add' && addType !== 'edit'"
          class="pdv-ten">
          <el-col>
            <p class="content-item">
              <span class="content-item-label">陪看人：</span>
            </p>
            <el-button @click="handleAddlookAccompany('company')"
              size="mini"
              icon="el-icon-circle-plus-outline">添加
            </el-button>
            <span class="line-h-40 pd-ten"
              v-for="(item,index) in lookAccompanyList"
              :key="index">
              <el-button size="mini">
                {{item.managerName}}
                <i @click="delLookCompany(index)"
                  class="escort-close el-icon-close"></i>
              </el-button>
            </span>
          </el-col>
        </el-row>
        <div class="pdv-ten marb-10">
          <div>
            <p class="content-item">
              <span class="content-item-label">
                <i class="c-red">*</i> 带看物业：</span>
            </p>
            <el-button size="mini"
              @click="handleAddlookAccompany('house')"
              icon="el-icon-circle-plus-outline">添加
            </el-button>
          </div>
          <el-row class="marg-l-90"
            v-for="(item, index) in longSituationList"
            :key="index">
            <el-col :span="16">
              <span class="line-h-40 pdr-10">
                <el-button size="mini">
                  {{item.gardenName}} {{item.buildingName}} {{item.roomNumber}} {{item.bedRoomNum}}
                  <i @click="delSituationList(index)"
                    class="escort-close el-icon-close"></i>
                </el-button>
              </span>
            </el-col>
            <el-col class="line-h-40"
              v-if="addType !== 'add' && addType !== 'edit'"
              :span="8">
              <!-- intentionEnum -->
              <el-radio-group v-model="item.intentionEnum">
                <el-radio label="HVAE">有意向</el-radio>
                <el-radio label="THINK">再考虑</el-radio>
                <el-radio label="HVAE_NOT">无意向</el-radio>
              </el-radio-group>
            </el-col>
          </el-row>
        </div>
        <el-form-item v-if="addType === 'complete' || addType === 'trcking'"
          label="带看反馈："
          prop="remark">
          <el-input :maxlength="200"
            placeholder="请输入带看反馈"
            type="textarea"
            :rows="3"
            v-model="addTakingData.remark"
            size="mini" />
        </el-form-item>

        <el-form-item v-else
          label="备注："
          prop="remark">
          <el-input :maxlength="200"
            placeholder="请输入备注"
            type="textarea"
            :rows="3"
            v-model="addTakingData.remark"
            size="mini" />
        </el-form-item>

      </el-form>
    </section>
    <section class="dialog-footer">
      <el-button type="primary"
        size="mini"
        :loading="submitting"
        @click="handleSubmit">{{submitting? '执行中...' : '确定'}}</el-button>
      <el-button size="mini"
        @click="closeDialog">取 消</el-button>
    </section>

    <el-dialog :title="title"
      :visible.sync="escortDialogVisible"
      append-to-body
      :close-on-click-modal="false"
      width="950px">
      <taking-escort :addLookType="addLookType"
        v-if="escortDialogVisible"
        :alreadyList="alreadyList"
        @closeDialog="closeChildDialog"
        @updateSelectionList="getSelectionList" />
    </el-dialog>

  </section>
</template>
<script>
import TakingEscort from './TakingEscort';
export default {
  components: {
    TakingEscort
  },
  data() {
    const dateTimeRules = (rule, value, callback) => {
      // value = value.trim();
      if ((+new Date(value)) < (+new Date())) {
        callback(new Error('请选择现在时刻之后的时间'));
      }
      callback();
    };
    const completeDateTimeRules = (rule, value, callback) => {
      // value = value.trim();
      if ((+new Date(value)) > (+new Date())) {
        callback(new Error('请选择现在时刻之前的时间'));
      }
      callback();
    };
    return {
      dateTimeRules,
      completeDateTimeRules,

      title: '选择陪看人',
      addLookType: 'house',
      escortDialogVisible: false,
      submitting: false,
      alreadyList: [],
      longSituationList: [],
      lookAccompanyList: [],
      optionsCustList: [],

      addTakingData: {
        appointTime: '',
        leadLookDate: '',
        phone: '',
        longSituationItem: [],
        lookAccompanyItem: [],
        roomOfIntentionItem: [],
        customerId: '',
        managerId: '',
        lookTime: '',
        remark: ''
      },

      addTakingRules: {
        leadLookDate: [
          { required: true, message: '请选择带看时间', trigger: 'blur' },
          { validator: completeDateTimeRules, trigger: 'change' }
        ],
        appointTime: [
          { required: true, message: '请选择预约时间', trigger: 'blur' },
          { validator: dateTimeRules, trigger: 'change' }
        ],
        customerId: [
          { required: true, message: '请输入客户姓名', trigger: 'blur' }
          // { pattern: /^\S+$/, message: '请输入正确姓名' },
          // { min: 2, max: 10, message: ' 长度在 2 到 10 个字符 ', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
          // { pattern: /^(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[8|9])\d{8,10}$/, message: '请输入正确的电话号码' }
        ],
        custSource: [
          { required: true, message: '请输入选择客户来源', trigger: 'change' }
        ]
      },

      pickerOptions: {
        disabledDate(time) {
          return time.getTime() + 86400000 < +Date.now();
        }
      },
      comptelePickerOptions: {
        disabledDate(time) {
          return time.getTime() > +Date.now();
        }
      }
    };
  },
  props: ['addType', 'leadLookNo', 'source', 'custId', 'custName'],
  created() {
    this.requiredUrl = '/security/leadLook/addReserveLeadLook';
    if (this.source === 'custDetail') {
      (async () => {
        try {
          await this.remoteCustomer(this.custName);
          this.selectCustomer(this.custId);
        } catch (e) {
          console.log(e);
        }
        this.addTakingData.customerId = this.custId;
      })();
    }
    switch (this.addType) {
      case 'add':
        // 新增
        this.requiredUrl = '/security/leadLook/addReserveLeadLook';
        break;
      case 'trcking':
        // 补录
        this.requiredUrl = '/security/leadLook/addRepairLeadLook';
        break;
      case 'edit':
        // 编辑
        this.requiredUrl = '/security/leadLook/updateLeadLook';
        this.requestData();
        break;
      case 'complete':
        // 完成
        this.requiredUrl = '/security/leadLook/modifyLeadLookStatus';
        this.requestData();
        break;
      default:
        this.requiredUrl = '/security/leadLook/addReserveLeadLook';
    }
  },
  methods: {
    requestData() {
      this.$axios
        .get('/security/leadLook/selectLeadLookDetail', {
          params: {
            id: this.leadLookNo
          }
        })
        .then(res => {
          if (res.data.status === 'C0000') {
            let { result } = res.data;
            this.lookAccompanyList = result.lookAccompanyItem.map((item, index) => {
              return {
                managerName: item.accompanyName,
                id: item.accompanyManager
              };
            });
            this.longSituationList = result.roomModels;
            const patchAddTaking = JSON.parse(JSON.stringify(this.addTakingData));
            patchAddTaking.leadLookDate = result.leadLookDateDesc;
            patchAddTaking.appointTime = result.reserveDateDesc;
            patchAddTaking.managerId = result.managerId;
            patchAddTaking.remark = result.remark;
            patchAddTaking.phone = result.prvtCustInfo.phone;
            patchAddTaking.userName = result.prvtCustInfo.name;
            patchAddTaking.customerId = result.prvCustId;
            patchAddTaking.leadLookNo = result.leadLookNo;
            if (this.addType === 'complete') {
              patchAddTaking.leadLookStatusEnum = 'ALREADY_LEAD_LOOK';
            }
            this.$set(this, 'addTakingData', patchAddTaking);
          } else {
            this.$message({
              type: 'warning',
              message: res.data.message
            });
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error(err.message || '服务器异常');
        });
    },

    remoteCustomer(query) {
      if (query !== '') {
        return this.$axios.get(
          '/security/leadLook/blurSearchUser',
          {
            params: {
              userName: query
            }
          }
        ).then((res) => {
          if (res.data.status === 'C0000' && res.data.result.items.length > 0) {
            let myList = res.data.result.items.map((item) => {
              return {
                value: item.id,
                label: item.name,
                phone: item.phone
              };
            });
            this.optionsCustList = myList.filter(item => {
              return item.label.toLowerCase().indexOf(query.toLowerCase()) !== -1;
            });
          } else {
            if (this.source === 'custDetail') {
              this.$message.warning('暂无租客信息');
            }
            this.optionsCustList = [];
          }
        }).catch((err) => {
          console.log(err);
        });
      } else {
        this.optionsCustList = [];
      }
    },

    selectCustomer(val) {
      this.addTakingData.phone = '';
      for (let i = 0; i < this.optionsCustList.length; i++) {
        if (this.optionsCustList[i].value === val) {
          this.addTakingData.phone = this.optionsCustList[i].phone;
          if (this.source === 'custDetail') {
            this.addTakingData.userName = this.optionsCustList[i].label;
          }
          break;
        }
      }
    },

    handleAddlookAccompany(type) {
      if (type === 'house') {
        this.title = '选择带看物业';
        this.alreadyList = this.longSituationList;
      } else {
        this.title = '选择陪看人';
        this.alreadyList = this.lookAccompanyList;
      }
      this.addLookType = type;
      this.escortDialogVisible = true;
    },

    delSituationList(index) {
      this.longSituationList.splice(index, 1);
    },

    delLookCompany(index) {
      this.lookAccompanyList.splice(index, 1);
    },

    getSelectionList(data) {
      if (data.type === 'house') {
        this.longSituationList = data.list;
      } else {
        this.lookAccompanyList = data.list;
      }
    },

    handleSubmit() {
      if (!this.longSituationList.length > 0) {
        this.$message({
          type: 'error',
          message: '至少要选择一个带看物业',
          duration: 3000
        });
        return;
      }
      this.$refs.addTaking.validate((valid) => {
        if (valid) {
          this.addTakingData.longSituationItem = [];
          this.addTakingData.lookAccompanyItem = [];
          this.addTakingData.roomOfIntentionItem = [];
          let myLookAccompanyList = this.lookAccompanyList.length;
          let myLongSituationList = this.longSituationList.length;
          // 获取 带看人 id
          for (let i = 0; i < myLookAccompanyList; i++) {
            this.addTakingData.lookAccompanyItem.push(this.lookAccompanyList[i].id);
          }
          // 获取带看物业的 id
          for (let i = 0; i < myLongSituationList; i++) {
            if (this.addType !== 'add' && this.addType !== 'edit') {
              this.addTakingData.roomOfIntentionItem.push({ situationId: this.longSituationList[i].id, intentionEnum: this.longSituationList[i].intentionEnum });
              delete this.addTakingData.longSituationItem;
            } else {
              this.addTakingData.longSituationItem.push(this.longSituationList[i].id);
              delete this.addTakingData.roomOfIntentionItem;
            }
          }
          this.submitting = true;
          this.$axios.post(
            this.requiredUrl,
            this.addTakingData
          ).then((res) => {
            // this.addTakingData.longSituationItem = [];
            // this.addTakingData.lookAccompanyItem = [];
            this.submitting = false;
            if (res.data.status === 'C0000') {
              this.$message.success('处理成功');
              if (this.source === 'takeList' || (this.source === 'custDetail' && this.addType === 'trcking')) {
                this.$emit('refreshData');
              }
              this.closeDialog();
            } else {
              this.$message.error(res.data.message);
            }
          }).catch(err => {
            // this.addTakingData.longSituationItem = [];
            // this.addTakingData.lookAccompanyItem = [];
            this.submitting = false;
            this.$message.error(err.message || '保存租客信息异常！');
            console.log(err);
          });
        } else {
          console.log('error submit!!');
          this.$message.error('请完善表单信息');
        }
      });
    },

    closeDialog() {
      this.$emit('update:addTakingDialogVisible', false);
    },

    closeChildDialog() {
      this.escortDialogVisible = false;
    },
    handleCloseAllDialog() {
      this.escortDialogVisible = false;
      return true;
    }
  }
};
</script>
<style scoped>
.take-dialog {
  min-height: 500px;
  margin-bottom: 2px;
  box-sizing: border-box;
}

.content-item {
  width: 90px;
  text-align: right;
  display: inline-block;
}
.content-item-label {
  display: inline-block;
  width: 90px;
  text-align: right;
  color: #000;
}
.escort-close.el-icon-close {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  text-align: center;
  line-height: 16px;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  transform-origin: 100% 50%;
}
.escort-close.el-icon-close:before {
  transform: scale(0.8);
  display: inline-block;
}
.escort-close.el-icon-close:hover {
  background-color: #b4bccc;
  color: #fff;
}
.marg-l-90 {
  margin-left: 90px;
}
</style>


