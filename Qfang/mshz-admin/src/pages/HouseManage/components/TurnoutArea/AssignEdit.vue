<template>
  <section>
    <div class="pd-20">
      <div class="bdb-ddd">
        <p class="font-w font-16 pdb-20">{{assignItem.gardenName}}</p>
        <p class="font-12">
          <el-row>
            <el-col :span="20">
              <span class="c-9">栋数：</span>{{assignItem.buildingCount || 0 }} 栋
              <span class="c-9">户数：</span>{{assignItem.roomCount || 0 }} 户
            </el-col>
            <el-col :span="4"
              class="font-r">
              <el-button type="text"
                @click="handleReset"
                size="mini">重置
              </el-button>
            </el-col>
          </el-row>
        </p>
      </div>
      <div class="pdt-20">
        <el-form ref="assignForm"
          :model="DutyRoomLoad"
          size="mini"
          label-position="right"
          label-width="90px">
          <el-form-item label="楼盘级别："
            prop="tab">
            <el-select v-model="DutyRoomLoad.tab"
              :disabled="tier >= 2 || isReset"
              placeholder="请选择楼盘级别">
              <el-option label="聚焦"
                value="FOCUS">
              </el-option>
              <el-option label="非聚焦"
                value="NONE">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="归属大区："
            prop="levelOneId">
            <el-select v-model="DutyRoomLoad.levelOneId"
              :disabled="tier >= 2 || isReset"
              @change="handleSelectLevelOne"
              placeholder="请选择楼盘大区">
              <el-option v-for="(item,idnex) in organizationOptions"
                :label="item.name"
                :value="item.id"
                :key="idnex
                ">
              </el-option>
            </el-select>
          </el-form-item>
          <slot v-if="tier >= 2">
            <el-form-item label="归属片区："
              prop="levelTwoId">
              <el-select v-model="DutyRoomLoad.levelTwoId"
                :disabled="tier >= 3 || isReset"
                @change="handleSelectLevelTwo"
                placeholder="请选择楼盘片区">
                <el-option v-for="(item,idnex) in levelTwoList"
                  :label="item.name"
                  :value="item.id"
                  :key="idnex
                ">
                </el-option>
              </el-select>
            </el-form-item>
          </slot>
          <slot v-if="tier >= 3">
            <el-form-item label="归属组别："
              prop="levelThreeId">
              <el-select v-model="DutyRoomLoad.levelThreeId"
                :disabled="tier >= 4 || isReset"
                @change="handleSelectLevelThree"
                placeholder="请选择组别">
                <el-option v-for="(item,idnex) in levelThreeList"
                  :label="item.name"
                  :value="item.id"
                  :key="idnex
                ">
                </el-option>
              </el-select>
            </el-form-item>
          </slot>
          <slot v-if="tier >= 4">
            <el-form-item label="综合管家："
              prop="gardenManagerId">
              <el-select v-model="DutyRoomLoad.gardenManagerId"
                :disabled="isReset"
                filterable
                remote
                placeholder="请输入关键字"
                :remote-method="remoteMethodBD"
                @change="handleSelectManagerId"
                clearable>
                <el-option v-for="(item, index) in BDList"
                  :label="item.bdName"
                  :value="item.id"
                  :key="index">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="服务管家："
              prop="serviceManagerId">
              <el-select v-model="DutyRoomLoad.serviceManagerId"
                :disabled="isReset"
                filterable
                remote
                placeholder="请输入关键字"
                :remote-method="remoteMethodBD"
                @change="handleSelectServId"
                clearable>
                <el-option v-for="(item, index) in BDList"
                  :label="item.bdName"
                  :value="item.id"
                  :key="index">
                </el-option>
              </el-select>
            </el-form-item>
          </slot>
        </el-form>
      </div>
    </div>
    <div class="dialog-footer">
      <el-button type="primary"
        size="mini"
        @click="handleAssignCommit">确 定
      </el-button>
      <el-button size="mini"
        @click="closeDialog">取 消
      </el-button>
    </div>
  </section>
</template>

<script>
import { selectBD } from '@/components/common/mixin';
export default {
  mixins: [selectBD],
  data() {
    return {
      handleGetParams: null,
      isReset: false,
      DutyRoomLoad: {
        gardenId: '',
        gardenManager: '',
        gardenManagerId: '',
        gardenName: '',
        id: '',
        levelOne: '',
        levelOneId: '',
        levelThree: '',
        levelThreeId: '',
        levelTwo: '',
        levelTwoId: '',
        serviceManager: '',
        serviceManagerId: '',
        tab: null
      },
      backupData: {},
      levelTwoList: [],
      levelThreeList: []
    };
  },
  props: {
    id: {
      type: String
    },
    assignItem: {
      type: Object,
      default: () => ({})
    },
    organizationOptions: {
      type: Array
    },
    myActiveIndex: {
      type: String
    },
    assignEditDialog: {
      type: Boolean
    },
    tier: {
      type: Number,
      default: 0
    }
  },
  created() {
    if (this.assignItem.id) {
      this.requestData();
    } else {
      this.$set(this.DutyRoomLoad, 'tab', this.assignItem.tab);
      this.initAssign();
    }
  },
  methods: {

    requestData() {
      this.$axios.get(
        '/security/oms/duty/loadDetail',
        {
          params: {
            id: this.assignItem.id
          }
        }
      ).then((res) => {
        if (res.data.status === 'C0000') {
          let { result } = res.data;
          this.DutyRoomLoad = result;
          this.$set(this.DutyRoomLoad, 'tab', this.assignItem.tab);
          if (result.serviceManagerId && result.gardenManagerId) {
            this.initBdList(this.DutyRoomLoad.serviceManagerId, this.DutyRoomLoad.serviceManager);
            this.initBdList(this.DutyRoomLoad.gardenManagerId, this.DutyRoomLoad.gardenManager);
          }
          this.initAssign();
        } else {
          this.$massage.error(res.data.message);
        }
      }).catch((err) => {
        this.$massage.error(err.message || '服务异常');
        console.log(err);
      });
    },

    // 选择大区
    handleSelectLevelOne(val) {
      const orgItem = this.organizationOptions.find((item, index) => {
        return item.id === val;
      });
      if (!orgItem) { return false; }
      this.DutyRoomLoad.levelOne = orgItem.name;
      // 片区list
      this.levelTwoList = orgItem.children;
    },

    // 片区
    handleSelectLevelTwo(val) {
      const orgItem = this.levelTwoList.find((item, index) => {
        return item.id === val;
      });
      if (!orgItem) { return false; }
      this.DutyRoomLoad.levelTwo = orgItem.name;
      // 组织list
      this.levelThreeList = orgItem.children;
    },

    // 组别
    handleSelectLevelThree(val) {
      const orgItem = this.levelThreeList.find((item, index) => {
        return item.id === val;
      });
      if (!orgItem) { return false; }
      // 组织名
      this.DutyRoomLoad.levelThree = orgItem.name;
    },

    // 服务管家
    handleSelectServId(val) {
      const orgItem = this.BDList.find((item, index) => {
        return item.id === val;
      });
      if (!orgItem) { return false; }
      this.DutyRoomLoad.serviceManager = orgItem.bdName;
    },

    // 综合管家
    handleSelectManagerId(val) {
      const orgItem = this.BDList.find((item, index) => {
        return item.id === val;
      });
      console.log(orgItem);
      if (!orgItem) { return false; }
      this.DutyRoomLoad.gardenManager = orgItem.bdName;
    },

    // 获取请求参数
    initAssign() {
      // 大区、片区、组别、个人 的分配 请求参数分类
      // let assignParams = { formList: [] };
      switch (this.myActiveIndex) {
        // 大区
        case 'region':
          this.handleAssignUrl = '/security/oms/duty/allotLevelOne';
          this.handleGetParams = (data) => {
            let paramsItem = {
              city: this.assignItem.city || undefined,
              gardenId: this.assignItem.gardenId || undefined,
              levelOneId: data.levelOneId || undefined,
              levelOneName: data.levelOne || undefined,
              id: this.id || undefined,
              reset: this.isReset,
              tab: data.tab || undefined
            };
            return {
              formList: [
                paramsItem
              ]
            };
          };
          break;
        // 片区
        case 'district':
          this.handleAssignUrl = '/security/oms/duty/allotLevelTwo';
          this.handleGetParams = (data) => {
            let paramsItem = {
              levelTwoId: data.levelTwoId || undefined,
              id: this.id || undefined,
              reset: this.isReset,
              levelTwoName: data.levelTwo || undefined
            };
            return {
              formList: [
                paramsItem
              ]
            };
          };
          this.DutyRoomLoad.levelOneId && this.handleSelectLevelOne(this.DutyRoomLoad.levelOneId);
          break;
        // 组别
        case 'groups':
          this.handleAssignUrl = '/security/oms/duty/allotLevelThree';
          this.handleGetParams = (data) => {
            let paramsItem = {
              city: this.assignItem.city || undefined,
              gardenId: this.assignItem.gardenId || undefined,
              levelThreeId: data.levelThreeId || undefined,
              levelThreeName: data.levelThree || undefined,
              reset: this.isReset,
              id: this.id || undefined,
              tab: data.tab || undefined
            };
            return {
              formList: [
                paramsItem
              ]
            };
          };
          this.DutyRoomLoad.levelOneId && this.handleSelectLevelOne(this.DutyRoomLoad.levelOneId);
          this.DutyRoomLoad.levelTwoId && this.handleSelectLevelTwo(this.DutyRoomLoad.levelTwoId);
          break;
        // 个人
        case 'person':
          this.handleAssignUrl = '/security/oms/duty/allotLevelFour';
          this.handleGetParams = (data) => {
            let paramsItem = {
              gardenManagerId: data.gardenManagerId || undefined,
              gardenManagerName: data.gardenManager || undefined,
              serviceManagerId: data.serviceManagerId || undefined,
              id: this.id || undefined,
              reset: this.isReset,
              serviceManagerName: data.serviceManager || undefined
            };
            return {
              formList: [
                paramsItem
              ]
            };
          };
          this.DutyRoomLoad.levelOneId && this.handleSelectLevelOne(this.DutyRoomLoad.levelOneId);
          this.DutyRoomLoad.levelTwoId && this.handleSelectLevelTwo(this.DutyRoomLoad.levelTwoId);
          this.DutyRoomLoad.levelThreeId && this.handleSelectLevelThree(this.DutyRoomLoad.levelThreeId);
          break;
        default:
          this.handleGetParams = () => { return {}; };
      }
    },

    // 重置操作
    handleReset() {
      if (!this.assignItem.id) {
        this.$message.warning('该楼盘还没分配，支持重置');
        return false;
      }
      this.isReset = true;
      // 备份 用于请求。
      this.backupData = JSON.parse(JSON.stringify(this.DutyRoomLoad));
      // this.resetForm('assignForm');
      switch (this.myActiveIndex) {
        // 大区
        case 'region':
          this.DutyRoomLoad.levelOneId = '';
          this.DutyRoomLoad.levelOne = '';
          break;
        // 片区
        case 'district':
          this.DutyRoomLoad.levelTwoId = '';
          this.DutyRoomLoad.levelTwo = '';
          break;
        // 组别
        case 'groups':
          this.DutyRoomLoad.levelThreeId = '';
          this.DutyRoomLoad.levelThree = '';
          break;
        // 个人
        case 'person':
          this.DutyRoomLoad.gardenManagerId = '';
          this.DutyRoomLoad.gardenManager = '';
          this.DutyRoomLoad.serviceManagerId = '';
          this.DutyRoomLoad.serviceManager = '';
          break;
        default:
          break;
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 分配
    handleAssignCommit() {
      let assignParams;
      if (this.isReset) {
        assignParams = this.handleGetParams(this.backupData);
      } else {
        assignParams = this.handleGetParams(this.DutyRoomLoad);
      }
      this.$axios.post(this.handleAssignUrl, assignParams).then((res) => {
        if (res.data.status === 'C0000') {
          this.$message.success('处理成功！');
          this.$emit('refresh');
          this.closeDialog();
        } else {
          this.$message.error(res.data.message);
        }
      }).catch((err) => {
        console.log(err);
        this.$message.error(err.message || '服务异常了！');
      });
    },

    closeDialog() {
      this.$emit('update:assignEditDialog', false);
    }
  },
  watch: {
    BDList(val) {
      this.DutyRoomLoad.serviceManagerId && this.initBdList(this.DutyRoomLoad.serviceManagerId, this.DutyRoomLoad.serviceManager);
      this.DutyRoomLoad.gardenManagerId && this.initBdList(this.DutyRoomLoad.gardenManagerId, this.DutyRoomLoad.gardenManager);
    }
  }
};
</script>

