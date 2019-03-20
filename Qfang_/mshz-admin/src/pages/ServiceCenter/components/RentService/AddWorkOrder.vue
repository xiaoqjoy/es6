<template>
  <section>
    <section class="refund-box">
      <el-form ref="addWork"
        size="mini"
        :model="addWorkData"
        :rules="addRules"
        label-width="100px"
        class="refund-form">

        <el-row>
          <el-col :span="10"
            :offset="1">
            <el-form-item label="服务类型："
              prop="serviceType">
              <el-select v-model="addWorkData.serviceType"
                :disabled="addDialogType === 'asssign' || addDialogType === 'edit'"
                placeholder="请选择服务类型"
                size="mini">
                <el-option label="维修"
                  value="FIX"></el-option>
                <el-option label="个人保洁"
                  value="CLEAN"></el-option>
                <el-option v-if="addDialogType === 'asssign' || addDialogType === 'edit'" label="双周保洁"
                  value="CLEAN_PERIOD"></el-option>
                <el-option v-if="addDialogType === 'asssign' || addDialogType === 'edit'" label="退租保洁"
                  value="CLEAN_REFUND"></el-option>
              </el-select>
              <!-- <el-cascader v-model="addWorkData.serviceType"
                :disabled="addDialogType === 'asssign' || addDialogType === 'edit'"
                :options="serverStatusOptions"
                placeholder="请选择服务类型"
                expand-trigger="hover">
              </el-cascader> -->
            </el-form-item>
          </el-col>
          <el-col :span="10"
            :offset="1">
            <slot v-if="addDialogType !== 'asssign' && addDialogType !== 'edit'">
              <el-form-item label="租客楼盘："
                prop="gardenName"
                :rules="[ { required: true, message: '楼盘不能为空', trigger: 'change' }]">
                <el-select v-model="addWorkData.gardenName"
                  filterable
                  placeholder="请输入关键字"
                  remote
                  :remote-method="remoteGardenName"
                  @change="selectGardenName"
                  clearable>
                  <el-option v-for="(item, index) in optionsGarden"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </slot>
            <slot v-else>
              <el-form-item label="租客房间：">
                <el-input v-model="addWorkData.roomInfo"
                  :disabled="true" />
              </el-form-item>
            </slot>

          </el-col>
        </el-row>

        <el-row v-if="addDialogType !== 'asssign' && addDialogType !== 'edit'">
          <el-col :span="10"
            :offset="1">
            <el-form-item label="租客楼栋："
              prop="buildingName"
              :rules="[ { required: true, message: '楼栋不能为空', trigger: 'change' }]">
              <el-select v-model="addWorkData.buildingName"
                :disabled="!addWorkData.gardenName"
                placeholder="请输入关键字"
                filterable
                remote
                :remote-method="remoteBuild"
                @change="selectBuild"
                clearable>
                <el-option v-for="(item, index) in optionsBuild"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10"
            :offset="1">
            <el-form-item label="租客房间："
              prop="roomId">
              <el-select v-model="addWorkData.roomId"
                :disabled="!addWorkData.buildingName"
                placeholder="请选择房间"
                @change="selectRoomNum"
                clearable>
                <el-option v-for="(item, index) in optionsRoomNum"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10"
            :offset="1">
            <el-form-item label="租客姓名："
              prop="customerName">
              <el-input :disabled="addWorkData.serviceType === 'CLEAN_PERIOD' || addWorkData.serviceType === 'CLEAN_REFUND'" v-model="addWorkData.customerName" />
            </el-form-item>
          </el-col>
          <el-col :span="10"
            :offset="1">
            <el-form-item label="手机号："
              prop="customerPhone">
              <el-input :disabled="addWorkData.serviceType === 'CLEAN_PERIOD' || addWorkData.serviceType === 'CLEAN_REFUND'" v-model="addWorkData.customerPhone"
                :maxlength="11" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10"
            :offset="1">
            <el-form-item prop="workerName">
              <slot slot="label">
                <label for="workerName"
                  class="el-form-item__label"
                  style="width: 100px;">
                  <span class="label"
                    v-if="addDialogType !== 'add'">*</span> 指派给：</label>
              </slot>
              <el-input v-model="addWorkData.workerName" />
            </el-form-item>
          </el-col>
          <el-col :span="10"
            :offset="1">
            <el-form-item prop="workerPhone">
              <slot slot="label">
                <label for="workerName"
                  class="el-form-item__label"
                  style="width: 100px;">
                  <span class="label"
                    v-if="addDialogType !== 'add'">*</span> 手机号：</label>
              </slot>
              <el-input v-model="addWorkData.workerPhone"
                :maxlength="11" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="addWorkData.serviceType !== 'CLEAN_PERIOD' && addWorkData.serviceType !== 'CLEAN_REFUND'">
          <el-col :span="10"
            :offset="1">
            <el-form-item label="费用类型："
              prop="chargeType">
              <el-select v-model="addWorkData.chargeType"
                placeholder="请选择支付方式"
                @change="changeChargeType"
                size="mini">
                <el-option label="免费"
                  value="FREE"></el-option>
                <el-option label="收费"
                  value="CHARGE"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10"
            :offset="1">
            <el-form-item label="服务金额："
              prop="charge">
              <el-input v-model="addWorkData.charge"
                :disabled="this.addWorkData.chargeType !== 'CHARGE'" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10"
            :offset="1">
            <el-form-item label="服务日期："
              prop="serviceTime">
              <el-date-picker v-model="addWorkData.serviceTime"
                :disabled="addWorkData.serviceType === 'CLEAN_PERIOD' || addWorkData.serviceType === 'CLEAN_REFUND'"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :offset="1"
            :span="21">
            <el-form-item label="备注信息："
              prop="remark">
              <my-textarea :maxlength="100"
                placeholder="请输入你要备注的内容"
                :rows="3"
                :model.sync="addWorkData.remark">
              </my-textarea>
              <!-- <el-input type="textarea"
                :maxlength="200"
                :max="200"
                :min="6"
                :autosize="{ minRows: 2}"
                placeholder="请输入你要备注的内容"
                v-model="addWorkData.remark">
              </el-input> -->
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </section>
    <section class="dialog-footer">
      <el-button type="primary"
        size="mini"
        @click="handleSubmit">确 定</el-button>
      <el-button size="mini"
        @click="closeDialog">取 消</el-button>
    </section>
  </section>
</template>
<script>
import myTextarea from '@/components/MyTextarea';
export default {
  data() {
    // let curDate = new Date();
    // let refundTime = curDate.getFullYear() + '-' + ('0' + (curDate.getMonth() + 1)).substring(-2) + '-' + curDate.getDate();
    let chargeRules = (rule, value, callback) => {
      if (this.addWorkData.chargeType === 'CHARGE' && (!value)) {
        callback(new Error('请输入服务金额'));
      }
      callback();
    };
    let workerNameRules = (rule, value, callback) => {
      if ((this.addDialogType === 'asssign' || this.addDialogType === 'edit') && (!value)) {
        callback(new Error('请输入工人名字'));
      }
      callback();
    };
    let workerPhoneRules = (rule, value, callback) => {
      if ((this.addDialogType === 'asssign' || this.addDialogType === 'edit') && (!value)) {
        callback(new Error('请输入工人手机号'));
      }
      callback();
    };
    return {
      chargeRules,
      workerNameRules,
      workerPhoneRules,
      requirRul: '/security/server/roomServer/addServer',
      addWorkData: {
        'charge': 0.00,
        'chargeType': undefined,
        'customerName': '',
        'customerPhone': '',
        'roomId': '',
        'serviceTime': undefined,
        'serviceType': '',
        'workerName': '',
        'workerPhone': '',
        'remark': '',
        'gardenName': '',
        'buildingName': '',
        'roomName': '',
        'bedRoomName': ''
      },
      // addWorkData: {
      // },
      addRules: {
        charge: [
          { validator: chargeRules, trigger: 'change' },
          { pattern: /^\d{1,4}(\.\d+)?$/, message: '整数长度在 1 到 4 位' },
          { pattern: /^[0-9]+(.[0-9]{1,2})?$/, message: '最多支持两位小数' }
        ],
        chargeType: [],
        customerName: [
          { required: true, message: '姓名不能为空', trigger: 'change' },
          { min: 2, max: 12, message: ' 长度在 2 到 12 个字符 ', trigger: 'change' }
        ],
        customerPhone: [
          { required: true, message: '手机号码不能为空', trigger: 'blur' },
          { pattern: /^1(3|4|5|6|7|8|9)\d{9}$/, message: '手机号码为11位有效数字', trigger: 'blur' }
        ],
        roomId: { required: true, message: '房间号不能为空', trigger: 'change' },
        serviceTime: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        serviceType: { required: true, message: '请选择服务类型', trigger: 'change' },
        workerName: [
          { validator: workerNameRules, trigger: 'change' },
          { min: 2, max: 12, message: ' 长度在 2 到 12 个字符 ', trigger: 'change' },
          { pattern: /^\S+$/, message: '请规范输入' }
        ],
        workerPhone: [
          { validator: workerPhoneRules, trigger: 'change' },
          { pattern: /^1(3|4|5|6|7|8|9)\d{9}$/, message: '手机号码为11位有效数字', trigger: 'blur' }
        ],
        remark: [
          { pattern: /^\S+$/, message: '请规范输入' }
        ]
      },
      optionsGarden: [], // 楼盘
      optionsBuild: [], // 楼栋
      optionsRoomNum: [], // 房号
      optionsChamber: [] // 卧室
    };
  },
  props: ['addDialogType', 'itemprop'],
  created() {
    if ((this.addDialogType === 'asssign' || this.addDialogType === 'edit') && this.itemprop) {
      this.addWorkData = JSON.parse(JSON.stringify(this.itemprop));
      this.addWorkData.serviceTime = (new Date(this.addWorkData.serviceTime)).toLocaleDateString().replace(/\//g, '-');
      if (this.addWorkData.chargeType === 'FREE') {
        this.addWorkData.charge = 0.00;
      }
    }
    if (this.addDialogType === 'asssign') {
      this.requirRul = '/security/server/roomServer/editServer';
    } else if (this.addDialogType === 'edit') {
      this.requirRul = '/security/server/roomServer/editServer';
    } else if (this.addDialogType === 'add') {
      this.requirRul = '/security/server/roomServer/addServer';
    }
  },
  methods: {
    closeDialog() {
      this.$emit('toggleRefundDialog', false);
    },
    handleSubmit() {
      this.$refs.addWork.validate((valid) => {
        if (valid) {
          let myAddWorkData = JSON.parse(JSON.stringify(this.addWorkData));
          myAddWorkData.remark = myAddWorkData.remark.trim().length > 0 && myAddWorkData.remark.replace(/\|/g, '');
          // 删去接口不需要的
          delete myAddWorkData.buildingName;
          delete myAddWorkData.roomName;
          delete myAddWorkData.bedRoomName;
          this.$axios
            .post(this.requirRul,
              myAddWorkData)
            .then(res => {
              console.log(res, '------新增服务');
              if (res.data.status === 'C0000') {
                this.$message({
                  type: 'success',
                  message: '处理成功'
                });

                if (this.requirRul === '/security/server/roomServer/addServer') {
                  if (myAddWorkData.workerName.trim().length > 0 && myAddWorkData.workerPhone) {
                    this.$store.commit('handleToggleRentService', 'ASSIGNED');
                  } else {
                    this.$store.commit('handleToggleRentService', 'NONE');
                  }
                } else if (this.addDialogType === 'asssign' && this.requirRul === '/security/server/roomServer/editServer') {
                  this.$store.commit('handleToggleRentService', 'ASSIGNED');
                }

                this.$emit('toggleRefundDialog', true);
              } else {
                this.$message({
                  type: 'warning',
                  message: res.data.message
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          this.$message.warning('请完善表单信息');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    // 楼盘联想
    remoteGardenName(query) {
      if (query !== '') {
        this.$axios.get(
          '/security/room/longSituation/searchGarden',
          {
            params: {
              searchName: query
            }
          }
        ).then((res) => {
          console.log(res, '------查询楼盘data');
          if (res.data.status === 'C0000') {
            let myList = res.data.result.map((item) => {
              return {
                value: item.gardenName,
                label: item.gardenName
              };
            });
            this.optionsGarden = myList.filter(item => {
              return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
            });
          } else {
            this.optionsGarden = [];
          }
        }).catch((res) => {
          console.log(res);
        });
      } else {
        this.optionsGarden = [];
      }
    },

    requestBuild() {
      this.$axios.get(
        '/security/room/longSituation/searchBuilding',
        {
          params: {
            gardenName: this.addWorkData.gardenName,
            searchName: undefined
          }
        }
      ).then((res) => {
        console.log(res, '------查询楼栋data');
        if (res.data.status === 'C0000') {
          this.optionsBuild = res.data.result.map((item) => {
            return {
              value: item.buildingName,
              label: item.buildingName
            };
          });
        } else {
          this.optionsBuild = [];
        }
      }).catch((res) => {
        console.log(res);
      });
    },
    // 楼栋模糊查询
    remoteBuild(query) {
      if (query !== '') {
        this.$axios.get(
          '/security/room/longSituation/searchBuilding',
          {
            params: {
              gardenName: this.addWorkData.gardenName,
              searchName: query
            }
          }
        ).then((res) => {
          console.log(res, '------查询楼栋data');
          if (res.data.status === 'C0000') {
            let myList = res.data.result.map((item) => {
              return {
                value: item.buildingName,
                label: item.buildingName
              };
            });
            this.optionsBuild = myList.filter(item => {
              return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
            });
          } else {
            this.optionsBuild = [];
          }
        }).catch((res) => {
          console.log(res);
        });
      } else {
        this.requestBuild();
        // this.optionsBuild = [];
      }
    },

    // 房号模糊查询
    // remoteRoom(query) {
    //   if (query !== '') {
    //     this.$axios.get(
    //       '/security/room/longSituation/searchNum',
    //       {
    //         params: {
    //           gardenName: this.addWorkData.gardenName,
    //           buildingName: this.addWorkData.buildingName,
    //           searchName: query
    //         }
    //       }
    //     ).then((res) => {
    //       console.log(res, '------查询房号data');
    //       if (res.data.status === 'C0000') {
    //         let myList = res.data.result.map((item) => {
    //           return {
    //             value: item.roomId,
    //             label: item.number,
    //             roomId: item.roomId,
    //             leaseType: item.leaseType
    //           };
    //         });
    //         this.optionsRoomNum = myList.filter(item => {
    //           return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
    //         });
    //       } else {
    //         this.optionsRoomNum = [];
    //       }
    //     }).catch((res) => {
    //       console.log(res);
    //     });
    //   } else {
    //     this.optionsRoomNum = [];
    //   }
    // },

    // 卧室号模糊查询
    remoteChamber(query) {
      if (query !== '') {
        this.$axios.get(
          '/security/room/longSituation/searchChamber',
          {
            params: {
              roomId: 'f41776d9-07a6-4fa8-8b6b-3865115f61bc'
            }
          }
        ).then((res) => {
          console.log(res, '------查询卧室data');
          if (res.data.status === 'C0000') {
            let myList = res.data.result.map((item) => {
              return {
                value: item.chamberId,
                label: item.chamberName
              };
            });
            this.optionsChamber = myList.filter(item => {
              return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
            });
          } else {
            this.optionsChamber = [];
          }
        }).catch((res) => {
          console.log(res);
        });
      } else {
        this.optionsChamber = [];
      }
    },

    // 选择楼盘
    selectGardenName(val) {
      if (val) {
        this.requestBuild();
      }
      // this.$axios.get(
      //   '/security/room/manage/searchBuilding',
      //   {
      //     params: {
      //       gardenName: this.AddContract.leaseForm.gardenName
      //     }
      //   }
      // ).then((res) => {
      //   if (res.data.status === 'C0000') {
      //     this.optionsBuild = res.data.result;
      //   } else {
      //     this.optionsBuild = [];
      //   }
      // });
    },

    selectBuild(val) {
      this.$axios.get(
        '/security/room/longSituation/searchNum',
        {
          params: {
            gardenName: this.addWorkData.gardenName,
            buildingName: this.addWorkData.buildingName
          }
        }
      ).then((res) => {
        console.log(res, '------查询房号data');
        if (res.data.status === 'C0000') {
          this.optionsRoomNum = res.data.result.map((item) => {
            return {
              value: item.roomId,
              label: item.number,
              roomId: item.roomId,
              leaseType: item.leaseType
            };
          });
          // this.optionsRoomNum = myList.filter(item => {
          //   return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
          // });
        } else {
          this.optionsRoomNum = [];
        }
      }).catch((res) => {
        console.log(res);
      });
    },

    // 选择房间号，获取 roomId
    selectRoomNum(val) {
      console.log(val);
      if (!val) {

      }
    },

    // 选择房间号
    searchChamber(val) {
      // console.log(val, '-------卧室id');
      // // 传空不用发请求
      // if (!val) {
      //   return;
      // }
      // for (let i = 0; i < this.optionsChamber.length; i++) {
      //   if (this.optionsChamber[i].chamberId === val) {
      //     this.AddContract.bedRoomId = val;
      //     this.AddContract.bedRoomName = this.optionsChamber[i].label;
      //     break;
      //   }
      // }
      // console.log(this.AddContract.roomId, this.AddContract.roomNo);
      // // 如是 合租 则选择房间号后请求 基本数据
      // this.getHouseInfo(this.AddContract.roomId, this.AddContract.bedRoomId);
    },
    changeChargeType(val) {
      if (val === 'FREE') {
        this.addWorkData.charge = 0;
      }
    }

  },
  components: {
    myTextarea
  }
};
</script>
<style scoped>
.refund-form {
  margin-top: 1rem;
  margin-right: 2rem;
}
.message {
  color: #e6a23c;
}
.label {
  color: #fa5555;
  margin-right: 4px;
}
</style>
