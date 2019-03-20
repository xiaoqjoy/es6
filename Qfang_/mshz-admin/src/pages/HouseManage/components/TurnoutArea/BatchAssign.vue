<template>
  <section>
    <section class="take-dialog">
      <div class="pd-20 flex-start-grow">
        <div class="batch-label line-h-40 font-r">
          选择组织：
        </div>
        <div class="selection-box">
          <el-form :inline="true"
            size="mini">
            <el-form-item prop="levelOneId">
              <el-select v-model="DutyRoomLoad.levelOneId"
                :disabled="tier >= 2"
                @change="handleSelectLevelOne"
                placeholder="请选择大区">
                <el-option v-for="(item,idnex) in organizationOptions"
                  :label="item.name"
                  :value="item.id"
                  :key="idnex">
                </el-option>
              </el-select>
            </el-form-item>
            <slot v-if="tier >= 2">
              <el-form-item prop="levelTwoId">
                <el-select v-model="DutyRoomLoad.levelTwoId"
                  :disabled="tier >= 3"
                  @change="handleSelectLevelTwo"
                  placeholder="请选择片区">
                  <el-option v-for="(item,idnex) in levelTwoList"
                    :label="item.name"
                    :value="item.id"
                    :key="idnex ">
                  </el-option>
                </el-select>
              </el-form-item>
            </slot>
            <slot v-if="tier >= 3">
              <el-form-item prop="levelThreeId">
                <el-select v-model="DutyRoomLoad.levelThreeId"
                  :disabled="tier >= 4"
                  @change="handleSelectLevelThree"
                  placeholder="请选择组别">
                  <el-option v-for="(item,idnex) in levelThreeList"
                    :label="item.name"
                    :value="item.id"
                    :key="idnex ">
                  </el-option>
                </el-select>
              </el-form-item>
            </slot>
            <slot v-if="tier >= 4">
              <!-- 服务管家 -->
              <el-form-item>
                <el-select v-model="DutyRoomLoad.serviceManagerId"
                  filterable
                  remote
                  placeholder="检索服务管家"
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
              <!-- 综合管家 -->
              <el-form-item>
                <el-select v-model="DutyRoomLoad.gardenManagerId"
                  filterable
                  remote
                  placeholder="检索综合管家"
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
            </slot>
          </el-form>
        </div>
      </div>
      <div class="border-ddd selection-box bgc-myeee">
        <div class="pdt-10 pdl-20">
          <el-form :inline="true"
            :model="requestParams"
            size="mini">
            <!-- 楼盘级别 -->
            <el-form-item>
              <el-select v-model="requestParams.hasAllot"
                placeholder="请选择是否分配"
                clearable>
                <el-option label="已分配"
                  :value="true">
                </el-option>
                <el-option label="未分配"
                  :value="false">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="requestParams.tab"
                placeholder="请选择楼盘级别"
                clearable>
                <el-option label="聚焦"
                  value="FOCUS">
                </el-option>
                <el-option label="非聚焦"
                  value="NONE">
                </el-option>
                <!-- <el-option v-for="(item, index) in queryTabEnum.tab"
                  :label="item.desc"
                  :value="item.name"
                  :key="index">
                </el-option> -->
              </el-select>
            </el-form-item>
            <!-- <el-form-item>
              <el-select v-model="requestParams.area"
                placeholder="请选择地理区域"
                clearable>
                <el-option v-for="(item, index) in cityList"
                  :label="item.name"
                  :value="item.city"
                  :key="index">
                </el-option>
              </el-select>
            </el-form-item> -->
            <!-- 地理片区 -->
            <el-form-item>
              <el-cascader :options="queryAreaOptions"
                placeholder="区域/片区"
                v-model="areaOption"
                change-on-select
                :props="orgProps"
                clearable>
              </el-cascader>
            </el-form-item>
            <!-- 物业类型 -->
            <el-form-item>
              <el-select v-model="requestParams.property"
                placeholder="请选择物业类型"
                clearable>
                <el-option v-for="(item, index) in queryTabEnum.property"
                  :label="item.desc"
                  :value="item.name"
                  :key="index">
                </el-option>
              </el-select>
            </el-form-item>
            <!-- 关键字 -->
            <el-form-item>
              <el-input class="search-key"
                placeholder="楼盘名称/编号"
                v-model="requestParams.keyword"
                clearable
                size="mini" />
            </el-form-item>
            <!-- 按钮 -->
            <el-form-item>
              <el-button type="success"
                size="mini"
                @click="handlePageChange(1)">搜索
              </el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-row>
          <el-col :span="11"
            class="bd-ddd batch">
            <el-table :data="dataList"
              border
              height="348"
              ref="selectionBox"
              @selection-change="handleSelectionChange"
              style="width: 100%"
              v-loading="loading"
              size="mini">

              <el-table-column type="selection"
                width="50">
              </el-table-column>

              <el-table-column label="级别"
                :min-width="60"
                align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.tab ==='FOCUS'">聚焦</span>
                  <span v-if="scope.row.tab === 'NONE'">非聚焦</span>
                </template>
              </el-table-column>

              <el-table-column label="楼盘名称"
                show-overflow-tooltip
                :min-width="100"
                class-name="barch-garden"
                align="left">
                <template slot-scope="scope">
                  <span class="identify-box">
                    <span v-if="scope.row[identifyId]"
                      class="identify">分</span>
                  </span>
                  <span v-if="scope.row.gardenName.indexOf('，') !== -1">{{scope.row.gardenName.split('，')[0]}}</span>
                  <span v-else>{{scope.row.gardenName.split(',')[0]}}</span>
                </template>
              </el-table-column>
              <el-table-column label="栋数"
                prop="buildingCount"
                :min-width="60"
                align="center" />

              <el-table-column label="户数"
                prop="roomCount"
                :min-width="80"
                align="center">
                <template slot-scope="scope">
                  {{scope.row.roomCount}}
                </template>
              </el-table-column>

              <el-table-column label="物业类型"
                :min-width="80"
                align="center">
                <template slot-scope="scope">
                  <span>{{scope.row.property}}</span>
                </template>
              </el-table-column>

            </el-table>
            <el-pagination class="take-pagination"
              @size-change="handleSizeChange"
              @current-change="handlePageChange"
              :current-page="currentPage"
              :page-sizes="[20, 30, 50]"
              :page-size="pageSize"
              layout="prev, pager, next"
              :total="recordCount">
            </el-pagination>
          </el-col>
          <el-col :span="2">
            <div class="font-c batch-icon">
              <i class="el-icon-arrow-right"></i>
            </div>
          </el-col>
          <el-col :span="11"
            class="bd-ddd">
            <el-table :data="selectionList"
              border
              height="380"
              style="width: 100%"
              size="mini">
              <el-table-column label="楼盘名称"
                show-overflow-tooltip
                prop="gardenName"
                :min-width="100"
                align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.gardenName.indexOf('，') !== -1">{{scope.row.gardenName.split('，')[0]}}</span>
                  <span v-else>{{scope.row.gardenName.split(',')[0]}}</span>
                </template>
              </el-table-column>

              <el-table-column label="栋数"
                prop="buildingCount"
                :min-width="50"
                align="center" />

              <el-table-column label="户数"
                prop="roomCount"
                :min-width="60"
                align="center">
                <template slot-scope="scope">
                  {{scope.row.roomCount}}
                </template>
              </el-table-column>

              <el-table-column label="物业类型"
                :min-width="80"
                align="center">
                <template slot-scope="scope">
                  <span>{{scope.row.property}}</span>
                </template>
              </el-table-column>

              <el-table-column label="级别"
                :min-width="60"
                align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.tab ==='FOCUS'">聚焦</span>
                  <span v-if="scope.row.tab === 'NONE'">非聚焦</span>
                </template>
              </el-table-column>
              <el-table-column label="操作"
                align="center">
                <template slot-scope="scope">
                  <el-button type="text"
                    size="small"
                    @click.stop="delSelectionItem(scope.$index)">删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- <el-pagination class="take-pagination"
              @size-change="handleSizeChange"
              @current-change="handlePageChange"
              :current-page="currentPage"
              :page-sizes="[20, 30, 50]"
              :page-size="pageSize"
              layout="prev, pager, next"
              :total="selectionList.length">
            </el-pagination> -->
          </el-col>
        </el-row>
      </div>
    </section>
    <section class="dialog-footer">
      <el-button type="primary"
        size="mini"
        @click="handleAssignCommit">确 定
      </el-button>
      <el-button size="mini"
        @click="closeDialog">取 消
      </el-button>
    </section>
  </section>
</template>
<script>
import { handlePages, selectBD } from '@/components/common/mixin';
export default {
  mixins: [handlePages, selectBD],
  data() {
    return {
      loading: false,
      handleGetParams: null,
      showMessage: null,
      dataList: [],
      orgOption: [],
      areaOption: [],
      cityList: [],
      gardenIdList: [],
      orgProps: {
        value: 'id',
        label: 'name',
        children: 'children'
      },
      requestParams: {
        cityOrgId: '',
        city: '',
        levelOneOrgId: '',
        area: '',
        region: '',
        property: '',
        keyword: '',
        hasAllot: undefined,
        tab: undefined
      },
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
        serviceManagerId: ''
      },
      tier: 1,
      identifyId: '',
      selectionList: [], // 所有已选
      myAlreadyList: [], // 上页已选
      levelTwoList: [],
      levelThreeList: [],
      formList: []
    };
  },
  props: {
    organizationOptions: {
      type: Array
    },
    reqParams: {
      type: Object
    },
    myActiveIndex: {
      type: String
    },
    batchAssignDialog: {
      type: Boolean
    },
    queryTabEnum: {
      type: Object,
      default: () => ({})
    },
    queryAreaOptions: {
      type: Array,
      default: () => []
    }
  },
  created() {
    this.DutyRoomLoad.levelOneId = this.reqParams.levelOneOrgId;
    this.DutyRoomLoad.levelTwoId = this.reqParams.levelTwoOrgId;
    this.DutyRoomLoad.levelThreeId = this.reqParams.levelThreeOrgId;
    this.initAssign();
    this.requestData();
  },
  methods: {

    requestData() {
      this.myAlreadyList = this.selectionList;
      this.loading = true;
      this.$axios
        .get(this.requsetUrl, {
          params: this.getParams()
        })
        .then(res => {
          this.loading = false;
          if (res.data.status === 'C0000') {
            let { result } = res.data;
            // this.currentPage = result.currentPage;
            this.pageCount = result.page.pageCount;
            this.recordCount = result.page.recordCount;
            this.dataList = result.page.items;
            this.gardenIdList = [];
            this.dataList.forEach((item, index) => {
              this.gardenIdList.push(encodeURIComponent(item.gardenId));
            });
            this.requestGardenCount(this.gardenIdList);
            this.$nextTick(() => {
              // 所有已选的，如果当前页有，选上
              this.handleFitrate(this.myAlreadyList, true);
            });
          } else {
            this.$message({
              type: 'warning',
              message: res.data.message
            });
          }
        })
        .catch(err => {
          this.loading = false;
          console.log(err);
          this.$message.error(err.message || '服务器异常');
        });
    },

    getParams() {
      return {
        pageSize: this.pageSize,
        currentPage: this.currentPage,
        levelOneOrgId: this.reqParams.levelOneOrgId || undefined,
        levelThreeOrgId: this.reqParams.levelThreeOrgId || undefined,
        levelTwoOrgId: this.reqParams.levelTwoOrgId || undefined,
        cityOrgId: this.reqParams.cityOrgId || undefined, // 城市分公司id
        // city: 'SHENZHEN' || undefined, // 城市枚举
        city: this.reqParams.city || undefined, // 城市枚举
        areaId: this.areaOption[0] || undefined, // 地理区域
        regionId: this.areaOption[1] || undefined, // 地理片区
        property: this.requestParams.property || undefined, // 物业类型
        keyword: this.requestParams.keyword || undefined,
        tab: this.requestParams.tab || undefined,
        hasAllot: this.requestParams.hasAllot
      };
    },

    // 选择服务管家
    handleSelectServId(val) {
      const orgItem = this.BDList.find((item, index) => {
        return item.id === val;
      });
      if (!orgItem) { return false; }
      this.DutyRoomLoad.serviceManagerName = orgItem.bdName;
    },

    // 选择综合管家
    handleSelectManagerId(val) {
      const orgItem = this.BDList.find((item, index) => {
        return item.id === val;
      });
      if (!orgItem) { return false; }
      this.DutyRoomLoad.gardenManagerName = orgItem.bdName;
    },

    handleSelectOrgId(val) {
      console.log(val);
    },

    // 选择发生变化
    handleSelectionChange(val) {
      // concat
      // 已选的合并当前页选的
      this.selectionList = this.myAlreadyList.concat(val);
      // 超过5条 不给选择，提示
      // if (this.selectionList.length > 5) {
      //   // let delList = this.selectionList.slice(5);
      //   this.toggleSelection(this.selectionList.slice(5), false);
      // }
    },

    // 当前页的数据是否有已选的
    handleFitrate(arr, flag) {
      // flag 选择 ture 不选 false
      if (!(arr instanceof Array) && !arr.length) {
        return;
      }
      // this.toggleSelection(this.alreadyList);
      // 遍历当前业的数据，是否有已选的 筛选出已选的 传入列表组件
      let mySelectList = [];
      for (let i = arr.length - 1; i >= 0; i--) {
        // 两条数据的 id 相等，
        let currentItem = this.dataList.find((value, j) => {
          return value.gardenId === arr[i].gardenId;
        });
        if (currentItem) {
          currentItem.currentPage = true;
          mySelectList.unshift(currentItem);
          // 截掉已经传入组件并已选的数据
          this.myAlreadyList.splice(i, 1);
        }
      }
      this.toggleSelection(mySelectList, flag);
    },

    delSelectionItem(index) {
      // this.handleFitrate(this.selectionList, false);
      // 如果索引大于 上页已选 的索引，则是当前页选的，就调用方法从组件内删除。
      if (this.myAlreadyList.length - 1 < index) {
        this.$refs.selectionBox.toggleRowSelection(this.selectionList[index], false);
      } else {
        this.selectionList.splice(index, 1);
      }
    },

    toggleSelection(rows, flag) {
      // 改变 列表 选择框的状态 ，true 选上，false 取消选择。
      rows.forEach(row => {
        if (!row) {
          return;
        }
        this.$refs.selectionBox.toggleRowSelection(row, flag);
      });
    },

    // 选择大区
    handleSelectLevelOne(val) {
      const orgItem = this.organizationOptions.find((item, index) => {
        return item.id === val;
      });
      if (!orgItem) { return false; }
      this.DutyRoomLoad.levelOne = orgItem.name;
      this.levelTwoList = orgItem.children;
    },

    // 片区
    handleSelectLevelTwo(val) {
      const orgItem = this.levelTwoList.find((item, index) => {
        return item.id === val;
      });
      if (!orgItem) { return false; }
      this.DutyRoomLoad.levelTwo = orgItem.name;
      this.levelThreeList = orgItem.children;
    },

    // 组别
    handleSelectLevelThree(val) {
      const orgItem = this.levelThreeList.find((item, index) => {
        return item.id === val;
      });
      if (!orgItem) { return false; }
      this.DutyRoomLoad.levelThree = orgItem.name;
    },

    // 获取请求参数
    initAssign() {
      // 大区、片区、组别、个人 的分配 请求参数分类
      // let assignParams = { formList: [] };
      switch (this.myActiveIndex) {
        // 大区
        case 'region':
          this.handleAssignUrl = '/security/oms/duty/allotLevelOneBatch';
          this.requsetUrl = '/security/oms/duty/queryLevelOne';
          this.tier = 1;
          this.identifyId = 'levelOne';
          this.handleGetParams = (item) => {
            let paramsItem = {
              city: item.city || undefined,
              gardenId: item.gardenId || undefined,
              levelOneId: this.DutyRoomLoad.levelOneId || undefined,
              levelOneName: this.DutyRoomLoad.levelOne || undefined,
              id: item.id || undefined,
              reset: false,
              tab: item.tab || undefined
            };
            this.formList.push(paramsItem);
          };
          this.showMessage = () => {
            return this.DutyRoomLoad.levelOne;
          };
          break;
        // 片区
        case 'district':
          this.handleAssignUrl = '/security/oms/duty/allotLevelTwoBatch';
          this.requsetUrl = '/security/oms/duty/queryLevelTwo';
          this.tier = 2;
          this.identifyId = 'levelTwo';
          this.handleGetParams = (item) => {
            let paramsItem = {
              levelTwoId: this.DutyRoomLoad.levelTwoId || undefined,
              id: item.id || undefined,
              reset: false,
              levelTwoName: this.DutyRoomLoad.levelTwo || undefined
            };
            this.formList.push(paramsItem);
          };
          this.handleSelectLevelOne(this.reqParams.levelOneOrgId);
          this.showMessage = () => {
            return this.DutyRoomLoad.levelTwo;
          };
          break;
        // 组别
        case 'groups':
          this.handleAssignUrl = '/security/oms/duty/allotLevelThreeBatch';
          this.requsetUrl = '/security/oms/duty/queryLevelThree';
          this.tier = 3;
          this.identifyId = 'levelThree';
          this.handleGetParams = (item) => {
            let paramsItem = {
              city: item.city || undefined,
              gardenId: item.gardenId || undefined,
              levelThreeId: this.DutyRoomLoad.levelThreeId || undefined,
              levelThreeName: this.DutyRoomLoad.levelThree || undefined,
              reset: false,
              id: item.id || undefined,
              tab: item.tab || undefined
            };
            this.formList.push(paramsItem);
          };
          this.showMessage = () => {
            return this.DutyRoomLoad.levelThree;
          };
          this.handleSelectLevelOne(this.reqParams.levelOneOrgId);
          this.handleSelectLevelTwo(this.reqParams.levelTwoOrgId);
          break;
        // 个人
        case 'person':
          this.handleAssignUrl = '/security/oms/duty/allotLevelFourBatch';
          this.requsetUrl = '/security/oms/duty/queryLevelFour';
          this.tier = 4;
          this.identifyId = 'serviceManager';
          this.handleGetParams = (item) => {
            let paramsItem = {
              gardenManagerId: this.DutyRoomLoad.gardenManagerId || undefined,
              gardenManagerName: this.DutyRoomLoad.gardenManagerName || undefined,
              serviceManagerId: this.DutyRoomLoad.serviceManagerId || undefined,
              id: item.id || undefined,
              reset: false,
              serviceManagerName: this.DutyRoomLoad.serviceManagerName || undefined
            };
            this.formList.push(paramsItem);
          };
          this.showMessage = () => {
            return this.DutyRoomLoad.gardenManagerName;
          };
          this.handleSelectLevelOne(this.reqParams.levelOneOrgId);
          this.handleSelectLevelTwo(this.reqParams.levelTwoOrgId);
          this.handleSelectLevelThree(this.reqParams.levelThreeOrgId);
          break;
        default:
          this.handleGetParams = () => { return {}; };
      }
    },

    handleCheck() {
      if (!this.selectionList.length) {
        this.$message.warning('请先选择要分配的楼盘');
        return true;
      }
      switch (this.myActiveIndex) {
        // 大区
        case 'region':
          if (!this.DutyRoomLoad.levelOneId) {
            this.$message.warning('请先选择大区');
            return true;
          }
          break;
        // 片区
        case 'district':
          if (!this.DutyRoomLoad.levelTwoId) {
            this.$message.warning('请先选择片区');
            return true;
          }
          break;
        // 组别
        case 'groups':
          if (!this.DutyRoomLoad.levelThreeId) {
            this.$message.warning('请先选择组别');
            return true;
          }
          break;
        // 个人
        case 'person':
          if (!this.DutyRoomLoad.gardenManagerId || !this.DutyRoomLoad.serviceManagerId) {
            this.$message.warning('请先选择服务管家和综合管家');
            return true;
          }
          break;
        default:
          return true;
      }
    },

    // 分配
    handleAssignCommit() {
      if (this.handleCheck()) {
        return false;
      }
      const h = this.$createElement;
      this.$msgbox({
        message: h('div', null, [
          h('p', null, `确定要分配${this.selectionList.length}套房源给：${this.showMessage()}吗?`)
        ]),
        showCancelButton: true,
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '执行中...';

            this.formList = [];
            for (let i = 0; i < this.selectionList.length; i++) {
              this.handleGetParams(this.selectionList[i]);
            }
            this.$axios.post(this.handleAssignUrl, { formList: this.formList }).then((res) => {
              if (res.data.status === 'C0000') {
                this.$message.success('处理成功！');
                this.$emit('refresh');
                this.selectionList = [];
                this.requestData();
              } else {
                this.$message.error(res.data.message);
              }
              instance.confirmButtonLoading = false;
              done();
            }).catch((err) => {
              console.log(err);
              this.$message.error(err.message || '服务异常了！');
              done();
            });
          } else {
            instance.confirmButtonLoading = false;
            done();
          }
        }
      }).then(action => {
        // console.log(action);
      }).catch((e) => {
        console.log(e);
      });
    },

    closeDialog() {
      this.$emit('update:batchAssignDialog', false);
    },
    requestGardenCount(list) {
      let gerUrl = '?gardenIds=';
      gerUrl = gerUrl + list.join('&gardenIds=') + '&city=' + this.reqParams.city;
      this.$axios.get('/security/oms/duty/queryGardenCount' + gerUrl
      ).then((res) => {
        if (res.data.status === 'C0000' && res.data.result.length === this.dataList.length) {
          this.dataList.forEach((item, index) => {
            item.roomCount = res.data.result[index].roomCount;
            item.buildingCount = res.data.result[index].buildingCount;
          });
        } else {

        }
      }).catch(err => {
        console.log(err);
      });
    }
  },
  watch: {
    BDList(val) {
      this.DutyRoomLoad.serviceManagerId && this.initBdList(this.DutyRoomLoad.serviceManagerId, this.DutyRoomLoad.serviceManagerName);
      this.DutyRoomLoad.gardenManagerId && this.initBdList(this.DutyRoomLoad.gardenManagerId, this.DutyRoomLoad.gardenManagerName);
    }
  }
};
</script>
<style scoped>
.batch-label {
  width: 100px;
}
.take-dialog {
  min-height: 550px;
  margin-bottom: 2px;
  box-sizing: border-box;
}
.take-pagination {
  width: 100%;
  box-sizing: border-box;
  background-color: #fafafa;
}
/* .selection-box {
  height: 333px;
} */

.selection-box >>> .el-select--mini {
  width: 150px;
}
.bgc-myeee {
  background-color: #eee;
  padding: 10px;
}
.batch-icon {
  height: 300px;
  line-height: 300px;
  font-size: 30px;
}
.identify-box {
  display: inline-block;
  width: 14px;
}
.identify {
  width: 14px;
  height: 14px;
  line-height: 14px;
  text-align: center;
  display: inline-block;
  border-radius: 3px;
  color: #fff;
  background-color: #d66666;
}
</style>


