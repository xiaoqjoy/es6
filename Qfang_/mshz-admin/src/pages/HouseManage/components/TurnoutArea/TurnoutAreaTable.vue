<template>
  <section class="turnout-box">
    <div class="total-box font-w font-14 c-red">
      <span class="inb pdr-20">
        楼盘：{{count.allCount || 0}}
      </span>
      <span class="inb pdr-20">
        已经分配：{{count.hasAllot || 0}}
      </span>
      <span class="inb pdr-20">
        未分配：{{count.noAllot || 0}}
      </span>
    </div>
    <div class="house-header">
      <el-form :inline="true"
        :model="requestParams"
        class="filter-form"
        size="mini">
        <el-row>
          <el-col :span="3">
            <!-- 城市分公司 -->
            <el-form-item>
              <el-select v-model="requestParams.cityOrgId"
                placeholder="请选择城市分公司"
                @change="handleSelectCityOrgId"
                clearable>
                <el-option v-for="(item, index) in baseData"
                  :label="item.name"
                  :value="item.id"
                  :key="index">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <!-- 城市 -->
            <el-form-item>
              <el-select v-model="requestParams.city"
                @change="getQueryAreaOptions"
                placeholder="请选择城市"
                clearable>
                <el-option v-for="(item, index) in cityList"
                  :label="item.name"
                  :value="item.city"
                  :key="index">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <!-- 大区/片区/组别 -->
            <el-form-item>
              <el-cascader :options="organizationOptions"
                placeholder="大区/片区/组别"
                v-model="orgOption"
                change-on-select
                :props="orgProps"
                clearable>
              </el-cascader>
            </el-form-item>
          </el-col>

          <el-col :span="2">
            <!-- <el-form-item>
                <el-select v-model="requestParams.serviceManagerId"
                  filterable
                  remote
                  placeholder="检索服务管家"
                  @change="handleSelectServId"
                  :remote-method="remoteMethodBD"
                  clearable>
                  <el-option v-for="(item, index) in BDList"
                    :label="item.bdName"
                    :value="item.id"
                    :key="index">
                  </el-option>
                </el-select>
              </el-form-item> -->
            <el-form-item>
              <el-select v-model="requestParams.hasAllot"
                placeholder="是否分配"
                clearable>
                <el-option label="已分配"
                  :value="true">
                </el-option>
                <el-option label="未分配"
                  :value="false">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <slot v-if="myActiveIndex === 'person'">
            <el-col :span="2">
              <!-- 综合管家 -->
              <el-form-item>
                <el-select v-model="requestParams.gardenManagerId"
                  filterable
                  remote
                  placeholder="检索综合管家"
                  @change="handleSelectManagerId"
                  :remote-method="remoteMethodBD"
                  clearable>
                  <el-option v-for="(item, index) in BDList"
                    :label="item.bdName"
                    :value="item.id"
                    :key="index">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </slot>

          <el-col :span="3">
            <!-- 地理区域 -->
            <el-form-item>
              <el-cascader :options="queryAreaOptions"
                placeholder="区域/片区"
                v-model="areaOption"
                change-on-select
                :props="orgProps"
                clearable>
              </el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="2">
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
          </el-col>
          <el-col :span="3">
            <!-- 关键字 -->
            <el-form-item>
              <el-input class="search-key"
                placeholder="楼盘名称/编号"
                v-model="requestParams.keyword"
                clearable
                size="mini" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <!-- 按钮 -->
            <div class="button-box">
              <el-form-item>
                <el-button type="success"
                  size="mini"
                  @click="handlePageChange(1)">搜索
                </el-button>
                <el-button type="success"
                  v-if="batchButton"
                  @click="handleBatchAssign"
                  size="mini">
                  批量分配
                </el-button>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <!-- 地理片区 -->
        <!-- <el-form-item>
          <el-select v-model="requestParams.region"
            placeholder="请选择地理片区"
            clearable>
            <el-option v-for="(item, index) in cityList"
              :label="item.name"
              :value="item.city"
              :key="index">
            </el-option>
          </el-select>
        </el-form-item> -->
      </el-form>
    </div>

    <section class="house-list"
      v-loading="loading">
      <el-table :data="tableData"
        border
        header-align="center"
        ref="multipleTable"
        size="mini"
        height="100%"
        cell-class-name="default-color"
        @row-click="handleRow"
        >

        <el-table-column type="index"
          label="序号"
          align="center"
          :index="indexMethod"
          width="50">
        </el-table-column>

        <el-table-column label="楼盘级别"
          :min-width="80"
          align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.tab ==='FOCUS'">聚焦</span>
            <span v-if="scope.row.tab === 'NONE'">非聚焦</span>
          </template>
        </el-table-column>

        <el-table-column label="楼盘名称"
          show-overflow-tooltip
          prop="gardenName"
          :min-width="100"
          align="left">
          <template slot-scope="scope">
            <span v-if="scope.row.gardenName.indexOf('，') !== -1">{{scope.row.gardenName.split('，')[0]}}</span>
            <span v-else>{{scope.row.gardenName.split(',')[0]}}</span>
          </template>
        </el-table-column>

        <el-table-column label="栋数"
          prop="buildingCount"
          :min-width="100"
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

        <el-table-column label="地理位置"
          prop="region"
          :min-width="80"
          align="center">
        </el-table-column>

        <el-table-column label="归属大区"
          prop="levelOne"
          :min-width="80"
          align="center" />

        <slot v-if="myActiveIndex !== 'region'">
          <el-table-column label="归属片区"
            prop="levelTwo"
            :min-width="80"
            align="center" />
        </slot>

        <slot v-if="myActiveIndex === 'person' || myActiveIndex === 'groups'">
          <el-table-column label="归属组别"
            prop="levelThree"
            :min-width="80"
            align="center" />
        </slot>

        <slot v-if="myActiveIndex ==='person'">
          <el-table-column label="综合管家"
            prop="gardenManager"
            :min-width="80"
            align="center" />

          <el-table-column label="服务管家"
            prop="serviceManager"
            :min-width="80"
            align="center" />
        </slot>

        <el-table-column label="分配时间"
          :min-width="80"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.levelOneTime && handleFormDate(new Date(scope.row.levelOneTime)) || '--'}}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作"
          :min-width="130"
          align="center">
          <template slot-scope="scope">
            <!-- v-if="checkPermission('OMS_SERVER_ROOMSERVER_CANCEL')" -->
            <el-button type="text"
              v-if="assignButton"
              size="small"
              @click.stop="handleAssign(scope.$index, scope.row)">分配
            </el-button>
          </template>
        </el-table-column>

      </el-table>
      <div class="house-pagination">
        <el-pagination class="page"
          @size-change="handleSizeChange"
          @current-change="handlePageChange"
          :current-page.sync="currentPage"
          :page-sizes="[20, 30, 50]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :page-count="pageCount"
          :total="recordCount">
        </el-pagination>
      </div>
    </section>

    <el-dialog title="楼盘分配"
      width="500px"
      :visible.sync="assignEditDialog"
      :close-on-click-modal="false">
      <assign-edit v-if="assignEditDialog"
        :assignEditDialog.sync="assignEditDialog"
        :id="itemId"
        :tier="tier"
        :myActiveIndex="myActiveIndex"
        :organizationOptions="organizationOptions"
        :assignItem="assignItem"
        @refresh="requestData">
      </assign-edit>
    </el-dialog>

    <el-dialog title="批量分配"
      width="1000px"
      :visible.sync="batchAssignDialog"
      :close-on-click-modal="false">
      <batch-assign v-if="batchAssignDialog"
        :queryTabEnum="queryTabEnum"
        :reqParams="getParams()"
        :queryAreaOptions="queryAreaOptions"
        :batchAssignDialog.sync="batchAssignDialog"
        :myActiveIndex="myActiveIndex"
        :organizationOptions="organizationOptions"
        @refresh="requestData">
      </batch-assign>
    </el-dialog>

    <el-dialog title="分配详情"
      width="950px"
      :visible.sync="assignDetailDialog"
      :close-on-click-modal="false">
      <assign-detail :assignItem="assignItem"
        v-if="assignDetailDialog"
        :id="itemId"
        :assignDetailDialog.sync="assignDetailDialog">
      </assign-detail>
    </el-dialog>

  </section>
</template>

<script>
import { $formDate } from '@/assets/js/utils';
import { handlePages, selectBD } from '@/components/common/mixin';
import { mapState } from 'vuex';
import batchAssign from './BatchAssign';
import assignEdit from './AssignEdit';
import assignDetail from './AssignDetail';
export default {
  name: 'TurnoutAreaTable',
  mixins: [handlePages, selectBD],
  computed: {
    // orgLongNumber
    ...mapState([
      'userInfo'
    ])
  },
  components: {
    batchAssign,
    assignEdit,
    assignDetail
  },
  data() {
    return {
      loading: false,
      assignDetailDialog: false,
      assignEditDialog: false,
      batchAssignDialog: false,
      tableData: [],
      count: {
        allCount: 0,
        hasAllot: 0,
        noAllot: 0
      },
      organizationOptions: [], // 组织级联选择器
      queryAreaOptions: [], // 区域级联选择器
      cityList: [],
      orgOption: [],
      areaOption: [],
      orgProps: {
        value: 'id',
        label: 'name',
        children: 'children'
      },
      assignItem: {},
      itemId: '',
      tier: 0,

      requestParams: {
        cityOrgId: '',
        city: '',
        levelOneOrgId: '',
        area: '',
        region: '',
        property: '',
        levelTwoOrgId: '',
        levelThreeOrgId: '',
        serviceManagerId: '',
        gardenManagerId: '',
        keyword: '',
        hasAllot: undefined
      }

    };
  },
  props: {
    myActiveIndex: {
      type: String,
      default: 'region',
      required: true
    },
    baseData: {
      type: Array,
      default: () => []
    },
    queryTabEnum: {
      type: Object,
      default: () => {
        return {
          property: []
        };
      }
    }
  },
  created() {
    this.gardenIdList = [];
    this.servOrgItem = {};
    this.managerOrgItem = {};
    this.orgTier = undefined;
    switch (this.myActiveIndex) {
      case 'region':
        this.requsetUrl = '/security/oms/duty/queryLevelOne';
        this.tier = 1;
        this.assignButton = this.checkPermission('OMS_ROOM_DUTY_1_EDIT');
        this.batchButton = this.checkPermission('OMS_ROOM_DUTY_1_EDIT_BATCH');
        break;
      case 'district':
        this.requsetUrl = '/security/oms/duty/queryLevelTwo';
        this.tier = 2;
        this.assignButton = this.checkPermission('OMS_ROOM_DUTY_2_EDIT');
        this.batchButton = this.checkPermission('OMS_ROOM_DUTY_2_EDIT_BATCH');
        break;
      case 'groups':
        this.requsetUrl = '/security/oms/duty/queryLevelThree';
        this.tier = 3;
        this.assignButton = this.checkPermission('OMS_ROOM_DUTY_3_EDIT');
        this.batchButton = this.checkPermission('OMS_ROOM_DUTY_3_EDIT_BATCH');
        break;
      case 'person':
        this.requsetUrl = '/security/oms/duty/queryLevelFour';
        this.tier = 4;
        this.assignButton = this.checkPermission('OMS_ROOM_DUTY_4_EDIT');
        this.batchButton = this.checkPermission('OMS_ROOM_DUTY_4_EDIT_BATCH');
        break;
      default:
        break;
    }
    if (this.baseData.length) {
      let myFlatOptions = this.flattenOptions(this.baseData);
      this.initParams(myFlatOptions);
    }
  },

  methods: {
    requestData() {
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
            this.count = result.count || {};
            this.recordCount = result.page.recordCount;
            this.tableData = result.page.items;
            this.gardenIdList = [];
            this.tableData.forEach((item, index) => {
              this.gardenIdList.push(encodeURIComponent(item.gardenId));
            });
            this.requestGardenCount(this.gardenIdList);
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
      // this.userInfo.cityOrgLongNumber[0]
      return {
        pageSize: this.pageSize,
        currentPage: this.currentPage,
        cityOrgId: this.requestParams.cityOrgId || undefined, // 城市分公司id
        // city: 'SHENZHEN' || undefined, // 城市枚举
        city: this.requestParams.city || undefined, // 城市枚举
        levelOneOrgId: this.orgOption[0] || undefined, // 大区组织ID
        areaId: this.areaOption[0] || undefined, // 地理区域
        regionId: this.areaOption[1] || undefined, // 地理片区
        property: this.requestParams.property || undefined, // 物业类型
        levelTwoOrgId: this.orgOption[1] || undefined, // 片区组织ID
        levelThreeOrgId: this.orgOption[2] || undefined, // 组别组织ID
        serviceManagerId: this.requestParams.serviceManagerId || undefined, // 服务管家Id
        gardenManagerId: this.requestParams.gardenManagerId || undefined, // 综合管家Id
        keyword: this.requestParams.keyword || undefined,
        hasAllot: this.requestParams.hasAllot
      };
    },

    requestGardenCount(list) {
      let gerUrl = '?gardenIds=';
      gerUrl = gerUrl + list.join('&gardenIds=') + '&city=' + this.requestParams.city;
      this.$axios.get('/security/oms/duty/queryGardenCount' + gerUrl
      ).then((res) => {
        if (res.data.status === 'C0000' && res.data.result.length === this.tableData.length) {
          this.tableData.forEach((item, index) => {
            item.roomCount = res.data.result[index].roomCount;
            item.buildingCount = res.data.result[index].buildingCount;
          });
        } else {

        }
      }).catch(err => {
        console.log(err);
      });
    },

    // 获取请求默认值
    initParams(data) {
      if (!Array.isArray(data)) { return; }
      let initItme;
      // 如果当前登录人有分配到组织
      if (this.orgTier && this.tier >= this.orgTier) {
        // 选取当前登录人的组织
        initItme = data.find((item, index) => {
          if (this.tier === this.orgTier) {
            // 当前默认选取的组织层级等于 当前登录人分配的
            return item.length === this.orgTier && this.userInfo.orgLongNumber === item[this.orgTier - 1].longNumber;
          } else if (this.tier > this.orgTier) {
            // 当前默认选取的组织层级大于 当前登录人分配的
            return item.length > this.orgTier && this.userInfo.orgLongNumber === item[this.orgTier - 1].longNumber;
          }
        });
      } else {
        // 获取第一个为默认值
        initItme = data.find((item, index) => {
          return item.length >= this.tier;
        });
      }
      let initOrgOption = [];
      if (initItme) {
        // 去掉第一个，第一个是城市分公司
        let initCityOrgId = initItme.shift();
        initItme.forEach((item, i) => {
          initOrgOption.push(item.id);
        });
        this.requestParams.cityOrgId = initCityOrgId.id;
        // 获取城市分公司下的组织数据
        this.handleSelectCityOrgId(initCityOrgId.id);
        // 默认是第一个城市
        this.requestParams.city = initCityOrgId.citys[0].city;
        this.$set(this, 'orgOption', initOrgOption);

        this.requestData();
        this.getQueryAreaOptions();
      }
    },

    // requestBaseData() {
    //   this.$axios.get('/security/oms/duty/orgQuery').then((res) => {
    //     console.log(res, '-----basedata');
    //     if (res.data.status === 'C0000') {
    //       this.$set(this, 'baseData', res.data.result);
    //       let myFlatOptions = this.flattenOptions(this.baseData);
    //       console.log(myFlatOptions);
    //       this.initParams(myFlatOptions);
    //     } else {
    //       this.$message.error(res.data.message);
    //     }
    //   }).catch(err => {
    //     console.log(err);
    //   });
    // },

    flattenOptions(options, ancestor = []) {
      let flatOptions = [];
      options.forEach((option) => {
        let optionsStack;
        // if (ancestor.length >= 3) {
        //   option['children'] = null;
        // } else {

        // }
        optionsStack = ancestor.concat(option);
        // 找到当前登录人分配的组织
        if (this.userInfo.orgLongNumber === option.longNumber) {
          this.orgTier = optionsStack.length;
        }
        if (!option['children']) {
          flatOptions.push(optionsStack);
        } else {
          flatOptions.push(optionsStack);
          // 如果联动数据级别超过了 三级，就不做渲染
          if (optionsStack.length >= 4) {
            option['children'] = null;
          } else {
            // 递归 children
            flatOptions = flatOptions.concat(this.flattenOptions(option['children'], optionsStack));
          }
          if (option['children'] && !option['children'].length) {
            // 空数组不渲染
            option['children'] = null;
          };
        }
      });
      return flatOptions;
    },

    getQueryAreaOptions() {
      this.$axios.get('/security/oms/duty/queryArea',
        { params: { city: this.requestParams.city } }
      ).then((res) => {
        if (res.data.status === 'C0000') {
          res.data.result && this.$set(this, 'queryAreaOptions', res.data.result);
        } else {
          this.queryAreaOptions = [];
          this.$message.error(res.data.message);
        }
      }).catch(err => {
        console.log(err);
      });
    },

    handleFormDate(val) {
      return $formDate(val, 'yyyy-MM-dd');
    },

    // 点击当前行
    handleRow(row, event, column) {
      this.assignItem = row;
      this.itemId = row.id;
      this.assignDetailDialog = true;
    },

    // 选择城市分公司
    handleSelectCityOrgId(val) {
      const orgItem = this.baseData.find((item, index) => {
        return item.id === val;
      });
      if (!orgItem) { return false; }
      this.organizationOptions = orgItem.children || [];
      this.cityList = orgItem.citys;
      this.requestParams.city = orgItem.citys[0].city;
    },

    // handleSelectOrgId(val) {
    //   console.log(val);

    // },

    handleSelectServId(val) {
      // console.log(val);
      this.servOrgItem = this.BDList.find((item, index) => {
        return item.id === val;
      });
    },

    handleSelectManagerId(val) {
      // console.log(val);
      this.managerOrgItem = this.BDList.find((item, index) => {
        return item.id === val;
      });
    },
    // handleItemChange(val) {
    //   console.log('active item:', val);
    // },
    // 打开分配
    handleAssign(index, row) {
      this.assignItem = row;
      this.itemId = row.id;
      this.assignEditDialog = true;
    },

    handleBatchAssign() {
      this.batchAssignDialog = true;
    },

    closeDetail() {
      this.DetailDialog = false;
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    indexMethod(index) {
      if (+index < 9) {
        return '0' + (index + 1);
      }
      return index + 1;
    }
  },
  watch: {
    baseData(val) {
      let myFlatOptions = this.flattenOptions(this.baseData);
      this.initParams(myFlatOptions);
    },
    BDList(val) {
      this.requestParams.serviceManagerId && this.initBdList(this.requestParams.serviceManagerId, this.servOrgItem.bdName);
      this.requestParams.gardenManagerId && this.initBdList(this.requestParams.gardenManagerId, this.managerOrgItem.bdName);
    }
  }
};
</script>
<style scoped>

.turnout-box {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.list-header-row {
  line-height: 60px;
  padding: 0 20px;
}

.filter-form {
  padding-left: 10px;
}


.filter-form-box {
  padding-left: 20px;
  background-color: #eeeeee;
}
.filter-form-box >>> .el-range-editor.el-input__inner {
  padding: 3px;
}
.filter-form-box >>> .el-input__icon.el-range__icon.el-icon-date {
  display: none;
}
.filter-form-box >>> .el-input__icon.el-range__close-icon {
  width: 18px;
}
.filter-form-box >>> .el-date-editor .el-range__close-icon {
  width: 16px;
}
.text-ellips {
  width: 100px;
}
.total-box {
  height: 50px;
  line-height: 50px;
  position: absolute;
  right: 0;
  top: 50px;
  z-index: 10;
}
.button-box {
  min-width: 190px;
}
</style>


