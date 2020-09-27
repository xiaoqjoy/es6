<template>
  <div class="new-increase">
    <el-dialog
      :title="title"
      :visible="dialogVisible"
      width="400px" center top="0px"
      custom-class="customer-center-dialog"
      @close="$emit('close-dialog', false, false)"
      :close-on-click-modal='false'
      :close-on-press-escape='false'>
      <div>
        <el-form :model="formData"
          :rules="configRule" ref="configRule"
          label-position="top">
            <el-form-item label="个贷服务中心" prop="serviceIds">
              <el-select v-model="formData.serviceIds"
                placeholder="个贷服务中心" multiple clearable collapse-tags
                v-if="!editFlag">
                <el-option
                  v-for="item in serviceIdList"
                  :key="item.itemCode"
                  :label="item.itemDesc"
                  :value="item.itemCode">
                </el-option>
              </el-select>
              <el-select v-model="formData.serviceId"
                placeholder="个贷服务中心" clearable collapse-tags
                v-if="editFlag">
                <el-option
                  v-for="item in serviceIdList"
                  :key="item.itemCode"
                  :label="item.itemDesc"
                  :value="item.itemCode">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="调整日期" prop="adjustDate">
               <el-date-picker
                v-model="formData.adjustDate"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="daterange"
                range-separator="至"
                start-placeholder="调整日期（始）"
                end-placeholder="调整日期（终）"
                :editable='false'
                clearable>
              </el-date-picker>
            </el-form-item>
            <el-form-item label="调整时间段" prop="adjustTime">
               <el-time-picker
                v-model="formData.adjustTime"
                is-range
                value-format="HH:mm:ss"
                range-separator="至"
                start-placeholder="调整时间（始）"
                end-placeholder="调整时间（终）"
                :editable='false'
                clearable>
              </el-time-picker>
            </el-form-item>
            <el-form-item label="是否有效" prop="status" >
              <el-switch
                v-model="formData.status"
                :width=50
                @change="statusCdChange"
              ></el-switch>
              <span>{{formData.status ? '是':'否'}}</span>
            </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="query width200" @click="confirmHandler">确 认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { accountApi } from "../../js/server.js"; // 接口
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String
    },
    serviceIdList: {
      type: Array,
      default: function() {
        return [];
      }
    },
    rowData: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      formData: {
        serviceIds: [],
        adjustDate: '',
        adjustTime: '',
        status: false
      },
      configRule: {
        serviceIds: [
          { required: true, message: '个贷服务中心不可为空' }
        ],
        adjustDate: [
          { required: true, message: '调整日期不可为空' }
        ],
        adjustTime: [
          { required: true, message: '调整时间段不可为空' }
        ]
      }
    };
  },
  methods: {
    statusCdChange(_val) {
      this.formData.statusCd = _val ? 'N' : 'U';
    },
    confirmHandler() {
      this.$refs.configRule.validate(_v => {
        if (!_v) {
          return false;
        }
        this.formData.cutoverStartDate = this.formData.adjustDate[0];
        this.formData.cutoverEndDate = this.formData.adjustDate[1];
        this.formData.cutoverStartTime = this.formData.adjustTime[0];
        this.formData.cutoverEndTime = this.formData.adjustTime[1];
        // 这里需要请求后台相关接口
        if (this.editFlag) {
          this.editUpdate(this.formData);
        } else {
          this.insert(this.formData);
        }
      });
    },
    insert(_data) {
      this.$MyFetch.post(accountApi.f2fRemoteCfg.cutoverTime, _data)
        .then(_res => {
          this.confirmFn('创建成功', 'success');
          this.$emit('close-dialog', false, true);
        }).catch(_err => {
          this.$error(_err.message);
          this.$emit('close-dialog', false, true);
        });
    },
    editUpdate(_data) {
      this.$MyFetch.put(accountApi.f2fRemoteCfg.cutoverTime, _data)
        .then(_res => {
          this.confirmFn('更新成功', 'success');
          this.$emit('close-dialog', false, true);
        }).catch(_err => {
          this.$error(_err.message);
          this.$emit('close-dialog', false, true);
        });
    },
    initData() {
      if (!this.$lodash.isEmpty(this.rowData)) {
        let data = JSON.parse(JSON.stringify(this.rowData));
        data.serviceIds = [];
        data.serviceIds.push(this.rowData.serviceId);
        for (let i = 0; i < data.adjustDate.length; i++) {
          data.adjustDate[i] = data.adjustDate[i] + ' 00:00:00';
        }
        this.formData = data;
      }
    }
  },
  mounted() {
    this.initData();
  },
  computed: {
    editFlag() {
      return this.title === '编辑';
    }
  }
};
</script>

<style lang="less" scoped>
  .new-increase {
    /deep/ .el-dialog__wrapper{
      .el-dialog__header {
        box-shadow: 0 1px 10px 0 rgba(0,0,0,0.05);
      }
      .el-dialog.el-dialog--center.customer-center-dialog {
        top: 50%;
        transform: translate(0, -50%);
      }
      .el-date-editor--datetimerange.el-input__inner {
        width: 350px;
      }
      .el-date-editor .el-range-separator {
        width: 7%;
      }
      .el-dialog__body {
        padding-bottom: 0px;
        text-align: left;
      }
      .query {
        background: #538bf1;
        color: #ffffff;
        border: 1px solid #538bf1;
      }
    }
  }
</style>
