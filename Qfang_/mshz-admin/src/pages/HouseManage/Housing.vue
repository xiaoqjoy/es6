<template>
  <section class="house-box">
    <header class="house-header">
      <div class="tab-pane">
        <el-menu :default-active="myActiveIndex"
          class="el-menu-demo"
          mode="horizontal"
          active-text-color="#008842"
          @select="handleSelect">
          <el-menu-item index="COMMIT_ROOM">已收房源</el-menu-item>
          <el-menu-item index="INTENTION_ROOM">意向房源</el-menu-item>
          <el-menu-item index="INFORMATION_ROOM">资料房源</el-menu-item>
        </el-menu>
        <div class="house-add">
          <el-button v-if="checkPermission('ROOM_MANAGE_EDIT')"
            type="success"
            size="mini"
            @click="dialogVisible = true ,DialogType = 'add', houseTitle = '添加房源'">添加房源</el-button>
        </div>
      </div>
      <div class="filtrate-box">
        <el-form ref="filtrateForm"
          :inline="true"
          :model="filtrateForm"
          size="mini">
          <el-row :gutter="3">
            <el-col :span="2">
              <el-form-item prop="gardenName">
                <el-select v-model="filtrateForm.gardenName"
                  filterable
                  remote
                  placeholder="楼盘"
                  :remote-method="remoteMethod"
                  @change="selectGardenName"
                  clearable>
                  <el-option v-for="(item, index) in options"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
                    <p>
                      <span>{{ item.label }}</span>
                      <span class="c-9">({{ item.geographyArea }})</span>
                    </p>
                  </el-option>
                  <!-- <el-option v-for="(item, index) in options"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option> -->
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item prop="buildingName">
                <el-select v-model="filtrateForm.buildingName"
                  :disabled="!filtrateForm.gardenName"
                  placeholder="楼栋"
                  @change="selectBuild"
                  clearable>
                  <el-option v-for="(item, index) in optionsBuild"
                    :key="index"
                    :label="item.buildingName"
                    :value="item.buildingName">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="2">

              <el-form-item prop="number">
                <el-select v-model="filtrateForm.number"
                  :disabled="!filtrateForm.buildingName"
                  placeholder="房号"
                  @change="handleFilter"
                  clearable>
                  <el-option v-for="(item, index) in optionsRoomNum"
                    :key="index"
                    :label="item.number"
                    :value="item.number">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item prop="bedRoom">
                <el-select v-model="filtrateForm.bedRoom"
                  placeholder="户型"
                  @change="handleFilter"
                  clearable>
                  <el-option label="全部"
                    value="">
                  </el-option>
                  <el-option label="一房"
                    value="1">
                  </el-option>
                  <el-option label="二房"
                    value="2">
                  </el-option>
                  <el-option label="三房"
                    value="3">
                  </el-option>
                  <el-option label="四房"
                    value="4">
                  </el-option>
                  <el-option label="五房及以上"
                    value="5">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item prop="decoration">
                <el-select v-model="filtrateForm.decoration"
                  placeholder="装修"
                  @change="handleFilter"
                  clearable>
                  <el-option label="全部"
                    value=""></el-option>
                  <el-option :label="item.value"
                    :value="item.key"
                    v-for="(item, index) in baseData.decoration"
                    :key="index"></el-option>
                </el-select>
              </el-form-item>

            </el-col>
            <el-col :span="2">
              <el-form-item prop="rentUseType">
                <el-select v-model="filtrateForm.rentUseType"
                  placeholder="房屋类型"
                  @change="handleFilter"
                  clearable>
                  <el-option label="全部"
                    value="">
                  </el-option>
                  <el-option :label="item.value"
                    :value="item.key"
                    v-for="(item, index) in baseData.rentUseType"
                    :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item prop="roomState">
                <el-select v-model="filtrateForm.roomState"
                  placeholder="房源状态"
                  @change="handleFilter"
                  clearable>
                  <el-option label="待初审"
                    value="WAIT_AUDIT">
                  </el-option>
                  <el-option label="初审未通过"
                    value="AUDIT_FAIL">
                  </el-option>
                  <el-option label="待复审"
                    value="WAIT_SECOND_AUDIT">
                  </el-option>
                  <el-option label="复审未通过"
                    value="SECOND_AUDIT_FAIL">
                  </el-option>
                  <el-option label="待签约"
                    value="WAIT_ADD_CONTRACT">
                  </el-option>
                  <el-option label="已签约"
                    value="SIGNED">
                  </el-option>
                  <!-- <el-option label="已取消"
                    value="CANCEL_COMMIT_ROOM">
                  </el-option> -->
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item prop="bdName">
                <el-autocomplete v-model="filtrateForm.bdName"
                  popper-class="house-bdNmae"
                  :fetch-suggestions="querySearchBD"
                  :trigger-on-focus="false"
                  placeholder="管家"
                  @select="handleFilter"
                  clearable>
                  <template slot-scope="props">
                    <div class="name font-12">{{ props.item.value }}
                      <span class="c-9">({{props.item.orgName}})</span>
                    </div>
                  </template>
                </el-autocomplete>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item prop="keyWord">
                <!-- placeholder="输入:楼盘/楼栋/房号/房源编号/收房编号" -->
                <el-input v-model="filtrateForm.keyWord"
                  placeholder="输入关键字检索"
                  clearable>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3"
              class="min-wid162">
              <el-form-item>
                <el-button type="primary"
                  size="mini"
                  @click="handleFilter">查询</el-button>
                <el-button type="danger"
                  size="mini"
                  @click="resetForm">清空</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </header>
    <keep-alive>
      <house-table activeIndex="COMMIT_ROOM"
        ref="commitRoom"
        :filtrateForm="filtrateForm"
        v-if="myActiveIndex === 'COMMIT_ROOM'">
      </house-table>
    </keep-alive>
    <keep-alive>
      <house-table activeIndex="INTENTION_ROOM"
        ref="intentionRoom"
        :filtrateForm="filtrateForm"
        v-if="myActiveIndex === 'INTENTION_ROOM'">
      </house-table>
    </keep-alive>
    <keep-alive>
      <house-table activeIndex="INFORMATION_ROOM"
        ref="informationRoom"
        :filtrateForm="filtrateForm"
        v-if="myActiveIndex === 'INFORMATION_ROOM'">
      </house-table>
    </keep-alive>

    <!-- 弹框 -->
    <el-dialog :title="houseTitle"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="950px">
      <add-house :DialogType="DialogType"
        :roomId="roomId"
        v-if="dialogVisible && DialogType !== 'Contract'"
        v-on:changeDialog='getChange'
        v-on:refreshData="handleFilter">
      </add-house>
    </el-dialog>

  </section>
</template>
<script>
import AddHouse from './components/Housing/Addhouse';
import HouseDetails from './components/Housing/HouseDetails';
import HouseTable from './components/Housing/HouseTable';
import AddContract from '../OrdersManage/components/OwnerContract/AddContarct';
import ContarctDetail from '../OrdersManage/components/OwnerContract/ContarctDetail';
import { mapState } from 'vuex';

/*
    EDITING("编辑中"),
    WAIT_AUDIT("待初审"),
    FIRST_AUDIT_FAIL("初审未通过"),
    WAIT_SECOND_AUDIT("待复审"),
    SECOND_AUDIT_FAIL("复审未通过"),
    WAIT_ADD_CONTRACT("待添加合同"),
    WAIT_CONTRACT_AUDIT("合同待审核"),
    CONTRACT_AUDIT_FAIL("合同审核不通过"),
    SIGNED("已签约"),
*/

export default {
  name: 'Housing',
  data() {
    return {
      houseTitle: '',
      loading: false,
      roomId: '',
      city: '',
      gardenId: '',
      gardenName: '',
      contractId: '',
      auditState: '',
      readOnly: '',
      DialogType: '', // 弹框类型
      myActiveIndex: 'COMMIT_ROOM',
      detailTitle: '',
      currentPage: 1, // 分页当前第几页
      total: 0, // 数据总数
      pageSize: 20, // 每页的数据量
      pageCount: null, /// 总页数
      dialogVisible: false, // 弹框
      detailsDialog: false, // 房源详情
      contractVisible: false, // 添加合同
      contractDialogVisible: false, // 合同审核
      filtrateVisible: false, // 搜索
      baseData: {},
      data: [],
      filtrateForm: {
        gardenName: null,
        buildingName: null,
        number: null,
        roomType: null,
        bedRoom: null,
        rentUseType: null,
        bdName: null,
        decoration: null,
        keyWord: '',
        roomState: null,
        process: 'COMMIT_ROOM'
      },

      bdNameList: [],
      options: [],
      optionsBuild: [],
      optionsRoomNum: []
    };
  },

  mounted() {
    this.refreKey = '';
    // this.sortType = 'DESC'; // DESC和ASC
    // this.orderByCreateTime = false; // 录入时间
    // this.orderByBdName = false; // bd姓名
    // this.orderByFollowTime = false; // 跟进时间
    // this.orderByCommitTime = true; // 提交时间
    // this.orderByLeaseCreateTime = false;
    // this.requestData();
    this.requestBaseData();
  },
  methods: {
    // 筛选
    handleFilter() {
      switch (this.myActiveIndex) {
        case 'COMMIT_ROOM':
          this.$refs.commitRoom.handlePageChange(1);
          break;
        case 'INTENTION_ROOM':
          this.$refs.intentionRoom.handlePageChange(1);
          break;
        case 'INFORMATION_ROOM':
          this.$refs.informationRoom.handlePageChange(1);
          break;
        default:
          break;
      }
    },

    // getParams() {
    //   return {
    //     gardenName: this.filtrateForm.gardenName,
    //     buildingName: this.filtrateForm.buildingName,
    //     number: this.filtrateForm.number,
    //     roomType: this.filtrateForm.roomType,
    //     bedRoom: this.filtrateForm.bedRoom,
    //     rentUseType: this.filtrateForm.rentUseType,
    //     bdName: this.filtrateForm.bdName,
    //     decoration: this.filtrateForm.decoration,
    //     roomState: this.filtrateForm.roomState,
    //     keyWord: this.filtrateForm.keyWord,
    //     currentPage: this.currentPage,
    //     pageSize: this.pageSize,
    //     sortType: this.sortType, // DESC和ASC
    //     orderByCreateTime: this.orderByCreateTime, // 录入时间
    //     orderByBdName: this.orderByBdName, // bd姓名
    //     orderByFollowTime: this.orderByFollowTime, // 跟进时间
    //     orderByCommitTime: this.orderByCommitTime,
    //     orderByLeaseCreateTime: this.orderByLeaseCreateTime
    //   };
    // },

    // 子组件传来的
    getChange(data) {
      if (this.DialogType === 'Contract') {
        this.contractVisible = data;
      } else {
        this.dialogVisible = data;
        this.detailsDialog = data;
      }
    },

    // 切换房源状态
    handleSelect(key, keyPath) {
      this.myActiveIndex = key;
      // if (key === 'COMMIT_ROOM') {
      //   this.handleSort({ prop: 'auditTimeDesc', order: 'descending' });
      // } else {
      //   this.handleSort({ prop: 'createTimeDesc', order: 'descending' });
      // }
    },

    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
      };
    },

    // BD联想
    querySearchBD(queryString, cb) {
      let results;
      this.$axios.get(
        '/security/room/queryReturnBd',
        {
          params: {
            personKey: this.filtrateForm.bdName
          }
        }
      ).then((res) => {
        if (res.data.status === 'C0000') {
          res.data.result.forEach((item) => {
            item.value = item.bdName;
          });
          this.bdNameList = res.data.result;
          let bdNameList = this.bdNameList;
          results = queryString ? bdNameList.filter(this.createFilter(queryString)) : bdNameList;
          // 调用 callback 返回建议列表的数据
          cb(results);
        } else {
          results = [];
          cb(results);
        }
      }).catch((res) => {
        results = [];
        cb(results);
        console.log(res);
      });
    },

    // 楼盘联想
    remoteMethod(query) {
      if (query) {
        this.$axios.get(
          '/security/room/manage/searchGarden',
          {
            params: {
              searchName: query
            }
          }
        ).then((res) => {
          if (res.data.status === 'C0000') {
            this.bdNameList = res.data.result.map((item) => {
              return {
                value: item.gardenName,
                label: item.gardenName,
                geographyArea: item.geographyArea
              };
            });
            this.options = this.bdNameList;
            // .filter(item => {
            //   return item.label.toLowerCase()
            //     .indexOf(query.toLowerCase()) > -1;
            // });
          } else {
            this.options = [];
          }
        }).catch((res) => {
          console.log(res);
        });
      } else {
        this.options = [];
      }
    },

    // 楼盘名
    selectGardenName(val) {
      this.filtrateForm.buildingName = '';
      this.filtrateForm.number = '';
      this.handleFilter();
      this.$axios.get(
        '/security/room/manage/searchBuilding',
        {
          params: {
            gardenName: this.filtrateForm.gardenName
          }
        }
      ).then((res) => {
        if (res.data.status === 'C0000') {
          this.optionsBuild = res.data.result;
        } else {
          this.optionsBuild = [];
        }
      });
    },

    // 楼栋
    selectBuild(val) {
      this.handleFilter();
      this.filtrateForm.number = '';
      this.$axios.get(
        '/security/room/manage/searchRoomNum',
        {
          params: {
            gardenName: this.filtrateForm.gardenName,
            buildingName: this.filtrateForm.buildingName
          }
        }
      ).then((res) => {
        if (res.data.status === 'C0000') {
          this.optionsRoomNum = res.data.result;
        } else {
          this.optionsRoomNum = [];
        }
      });
    },

    // 筛选下拉框数据
    requestBaseData() {
      this.$axios.get(
        '/security/room/queryReturn'
      ).then((res) => {
        this.baseData = JSON.parse(res.data.result);
      }).catch((e) => {
        console.log(e);
      });
    },

    resetForm() {
      this.$refs['filtrateForm'].resetFields();
      this.handleFilter();
    }
  },

  components: {
    AddHouse,
    HouseDetails,
    AddContract,
    ContarctDetail,
    HouseTable
  },
  computed: {
    ...mapState(['refreshHouseTable'])
  },
  watch: {
    filtrateForm: {
      handler(val, oldVal) {
        //  "COMMIT_ROOM">已收房源
        //  "INTENTION_ROOM">意向房源
        //  "INFORMATION_ROOM">资料房源
        // 刷新对应的列表
        switch (this.myActiveIndex) {
          case 'COMMIT_ROOM':
            this.refreKey = 'INTENTION_ROOM,INFORMATION_ROOM';
            break;
          case 'INTENTION_ROOM':
            this.refreKey = 'COMMIT_ROOM,INFORMATION_ROOM';
            break;
          case 'INFORMATION_ROOM':
            this.refreKey = 'COMMIT_ROOM,INTENTION_ROOM';
            break;
          default:
            this.refreKey = 'COMMIT_ROOM,INTENTION_ROOM,INFORMATION_ROOM';
            break;
        }
        this.$store.commit('handleRefreshHouseTable', this.refreKey);
      },
      deep: true
    }
  }
};
</script>

<style scoped>

.talbe-box {
  width: 100%;
  height: 100%;
}
.default-color {
  background-color: #333;
}
/* 类型 */
.type-item {
  padding: 0 2px;
  border-width: 1px;
  border-style: solid;
  border-radius: 3px;
}
.green {
  border-color: #008842;
  color: #008842;
}
.red {
  border-color: #c55454;
  color: #c55454;
}
.state-green {
  color: #008842;
}
.state-black {
  color: #000;
}
.room-number {
  font-size: 14px;
  font-weight: 600;
  color: #008842;
}

.filtrate-box {
  padding: 10px 0 0 10px;
  min-width: 1080px;
}
.filtrate-box .el-form-item--mini.el-form-item {
  margin-bottom: 10px !important;
}

.min-wid162 {
  min-width: 162px;
}

</style>

