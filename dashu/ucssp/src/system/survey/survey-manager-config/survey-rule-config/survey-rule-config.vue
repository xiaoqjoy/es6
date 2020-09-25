<template>
  <div class="survey_config_list">
    <!-- 查询表单 -->
    <el-form class="search" :inline="true" :model="searchInfo" ref="searchInfo" :rules="searchRule">
      <el-form-item prop="serviceName">
        <el-input v-model.trim="searchInfo.serviceName" clearable placeholder="处理中心" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item prop="userName">
        <el-input v-model.trim="searchInfo.userName" clearable placeholder="调查经理" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="width100" type="primary" @click="search">查询</el-button>
        <el-button class="width100" type="primary" plain @click="clearSearch">清空</el-button>
      </el-form-item>
    </el-form>

    <div class="table_box">
      <!-- 表格数据 -->
      <el-table :data="pageData.list" style="100%" @row-dblclick="jumpToLocal">
        <el-table-column label="序号" width="80">
          <template slot-scope="scope"><span>{{scope.$index+1}} </span></template>
        </el-table-column>
        <el-table-column prop="serviceName" label="所属处理中心"></el-table-column>
        <el-table-column prop="serviceNameNew" label="所属面签中心"></el-table-column>
        <el-table-column prop="userId" label="调查经理编号" width="260"></el-table-column>
        <el-table-column prop="userName" label="调查经理姓名"></el-table-column>
        <el-table-column prop="mobileNum" label="手机号码"></el-table-column>
        <el-table-column prop="provinceCity" label="省市" width="250">
          <template slot-scope="scope">
            <el-popover width="400" trigger="hover" placement="top" v-if="scope.row.provinceCity">
              <p class="ellipsis">
                {{scope.row.provinceCity.join('；')}}
              </p>
              <div slot="reference">
                <p class="yincan ellipsis">
                  {{scope.row.provinceCity.join('；')}}
                </p>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="areaArr" label="地区" width="250">
          <template slot-scope="scope">
            <el-popover width="400" trigger="hover" placement="top" v-if="scope.row.areaArr">
              <p>
                {{scope.row.areaArr.join('；')}}
              </p>
              <div slot="reference">
                <p class="yincan ellipsis">
                  {{scope.row.areaArr.join('；')}}
                </p>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="workingStatusCode" label="目前工作状态">
          <template slot-scope="scope">
            <span v-if="scope.row.workingStatusCode">{{reserveWorkState(scope.row.workingStatusCode)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
                  <el-button
                  type="text"
                  size="small" @click="editConfig(scope.row)">
                  调整
                  </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="page_box">
      <pagination @jump-page='handleCurrentChange' :page='searchInfo' class="pagination"></pagination>
    </div>

    <el-dialog class="dialog rule-dialog" title="调整" :visible.sync="dialogVisible" :before-close="handleClose" width="700px" center>
      <el-form class="search" :inline="true" :model="configInfo" :rules="configRule" ref="configInfo" label-position="top">
        <div class="dialog_con">
          <div class="top_conten"><span class="top_conten_title">调查经理编号：</span><span class="top_content_font">{{configInfo.userId}}</span></div>
          <div class="top_conten"><span class="top_conten_title">调查经理姓名：</span><span class="top_content_font">{{configInfo.userName}}</span></div>
        </div>
        <el-form-item label="所属面签中心" prop="serviceNameNew">
          <el-select class="width246" v-model="configInfo.serviceNameNew" placeholder="请选择" @change="changeServiceName">
            <el-option v-for="(item,index) in serviceList" :key="index" :label="item.organizationName" :value="item.organizationName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="目前工作状态" prop="workingStatusCode">
          <el-select class="width246" v-model="configInfo.workingStatusCode" placeholder="请选择">
            <el-option v-for="item in fieldConfig.working_status_code.children" :key="item.sortNum" :label="item.itemDesc" :value="item.itemCode"></el-option>
          </el-select>
        </el-form-item>
        <div class="dialog_city_picker">
          <label class="label_areaId" for="areaId">所属省市</label>
          <el-cascader class="width246" filterable placeholder="请选择" v-model="selectedCity" :options="provinceList" :separator="null" @change="checkedAreaAddress"></el-cascader>
        </div>
        <el-form-item label="手机号码" prop="mobileNum">
          <el-input class="width246" placeholder="请填写" v-model="configInfo.mobileNum" max-length="11"></el-input>
        </el-form-item>
      </el-form>
      <div class="checkbox_group">
        <div class="checkbox_group_title">
          区域:
        </div>
        <el-checkbox-group v-model="editAreaIdList">
          <el-checkbox v-for="area of areaList" :key="area.value" :label="area.value" @change="changeCheckBox(area, arguments)">{{area.label}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="checked_area">
        <div class="checkbox_group_title">选择结果</div>
        <div class="checkbox_group_content">
          <ul class="all-area-list">
            <li class="city-area" v-for="item of placeList" :key="item.cityCode">
              <div class="city-name">{{item.provinceCity + '：'}}</div>
              <el-tag v-for="area in item.areaList" :key="area.value" closable @close="removeArea(item, area)">{{area.label}}</el-tag>
            </li>
          </ul>
        </div>
      </div>
      <div class="dialog_btn_group">
        <el-button type="primary" style="width:200px" @click="sureConfig">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import pagination from "@components/pagination"; // 分页条
import reportValidator from "../../js/reportRules.js";
import myRules from "@common/js/rules.js";
import { surveyApi } from '../../js/server.js';
import { parseAddress, reserveWorkState } from '../../js/utils.js';
import { mapGetters } from 'vuex';
export default {
  name: "survey-rule",
  data() {
    return {
      dialogVisible: false, // 弹窗状态
      pageData: {},
      // 查询信息
      searchInfo: {
        pageNum: 1,
        pageSize: 10,
        serviceName: "",
        userName: "",
        account: 0,
        currentPage: 1,
        showJumpButton: true
      },
      searchRule: {
        serviceName: [
          { max: 20, trigger: 'blur', message: '请输入20字符以内' },
          { trigger: 'blur', validator: reportValidator.chineseRule }
        ],
        userName: [
          { max: 20, trigger: 'blur', message: '请输入20字符以内' },
          { trigger: 'blur', validator: reportValidator.chineseRule }
        ]
      },
      serviceList: [], // 处理中心列表
      address: [], // 所有地址数据
      provinceList: [], // 省列表数据
      selectedCity: [], // 级联选择器默认值为空
      configInfo: {}, // 列表中正在编辑的行数据
      editPlace: {}, // 编辑中的省市区对象
      deletePlace: {}, // tag删除中的省市区对象
      areaList: [], // 备选区域
      flag: false, // 区域操作是判断增减状态
      checkedArea: {}, // 正在操作的区域
      editAreaIdList: [], // 备选区域中选出的区域
      placeList: [], // 所有选出的数据，多选列表
      configRule: {
        serviceNameNew: [
          { required: true, trigger: 'change', message: '请选择' }
        ],
        workingStatusCode: [
          { required: true, trigger: 'change', message: '请选择' }
        ],
        mobileNum: [
          { required: true, trigger: 'blur', message: '请填写' },
          { trigger: 'blur', validator: myRules.phoneRule }
        ]
      },
      municipalitiesArr: ['110000', '120000', '310000', '500000', '710000', '810000', '820000'] // 直辖市,特别行政区
    };
  },
  created() {
    // 获取数据列表
    this.getAddressData();
    // 获取处理中心列表
    this.getServiceList();
  },
  computed: {
    ...mapGetters([
      'fieldConfig'
    ])
  },
  watch: {
    dialogVisible: function(newVal, oldVal) {
      if (oldVal) {
        this.initEdit();
      }
    }
  },
  methods: {
    reserveWorkState,
    // 获取处理中心列表
    getServiceList() {
      this.$MyFetch.get(surveyApi.getServiceList).then(data => {
        this.serviceList = data.list;
      }).catch((err) => {
        this.$error(err.message);
      });
    },
    // 获取数据列表
    getList() {
      this.$MyFetch.post(surveyApi.surveyRules, this.searchInfo).then(data => {
        this.pageData = data;
        this.searchInfo.account = data.total;
        this.formatAddress();
      }).catch((err) => {
        this.$error(err.message);
      });
    },
    // 关闭弹窗 初始化地址选择数据
    initEdit() {
      this.selectedCity = []; // 级联选择器默认值
      this.editPlace = {}; // 编辑中的省市区对象
      this.deletePlace = {}; // tag删除中的省市区对象
      this.areaList = []; // 备选区域
      this.flag = false; // 区域操作是判断增减状态
      this.checkedArea = {}; // 正在操作的区域
      this.editAreaIdList = []; // 备选区域中选出的区域
      this.placeList = []; // 所有选出的数据，多选列表
    },
    // 改写地址数据格式，处理直辖市级别不一致的问题
    initAddress(res) {
      let address = [];
      for (let p of res) {
        if (this.municipalitiesArr.indexOf(p.value) !== -1) {
          let c = {
            label: p.label,
            value: p.value,
            children: []
          };
          c.children.push(p);
          address.push(c);
        } else {
          address.push(p);
        }
      }
      return address;
    },

    // 解析地址数据
    formatAddress() {
      for (let x of this.pageData.list) {
        if (!x.areaInfoList) {
          continue;
        }
        x.areaArr = [];
        x.provinceCity = [];
        for (let i in x.areaInfoList) {
          if (x.areaInfoList[i].cityCode && x.areaInfoList[i].provinceCity) {
            x.provinceCity.push(x.areaInfoList[i].provinceCity);
            x.areaInfoList[i].areaNameList = [];
            for (let j in x.areaInfoList[i].areaList) {
              if (x.areaInfoList[i].areaList[j].label) {
                x.areaInfoList[i].areaNameList.push(x.areaInfoList[i].areaList[j].label);
              }
            }
            x.areaArr.push(x.areaInfoList[i].areaNameList.join('/'));
          }
        }
      }
    },

    // 拆分待选区域组合
    setAreaList() {
      for (let p of this.address) {
        if (this.editCityCode.substr(0, 2) === p.value.substr(0, 2)) {
          for (let c of p.children) {
            if (this.editCityCode.substr(0, 4) === c.value.substr(0, 4)) {
              this.areaList = c.children;
            }
          }
        }
      }
    },

    // 省市多选数据 用于级联选择器 省市二级列表
    cascaderData() {
      let province = {};
      for (let p of this.address) {
        if (this.municipalitiesArr.indexOf(p.value) !== -1) {
          province = {
            label: p.label,
            value: p.value
          };
        } else {
          province = {
            label: p.label,
            value: p.value,
            children: []
          };
          for (let i in p.children) {
            let city = {
              label: p.children[i].label,
              value: p.children[i].value
            };
            province.children.push(city);
          }
        }
        this.provinceList.push(province);
      }
    },

    // 获取地址数据
    getAddressData() {
      this.getArea().then(res => {
        this.address = this.initAddress(res);
        this.cascaderData();
        this.getList();
      }).catch(err => {
        this.$message({
          showClose: true,
          message: '获取地址数据失败',
          type: 'error'
        });
        this.$error(err.message);
      });
    },
    // 查询
    search() {
      this.$refs.searchInfo.validate(valid => {
        if (valid) {
          this.searchInfo.pageNum = 1;
          this.searchInfo.currentPage = 1;
          this.getList();
        }
      });
    },
    // 清空查询信息
    clearSearch() {
      this.$refs["searchInfo"].resetFields();
      this.searchInfo.pageNum = 1;
      this.searchInfo.currentPage = 1;
      this.getList();
    },
    // 列表翻页
    handleCurrentChange(val) {
      this.searchInfo.pageNum = val;
      this.searchInfo.currentPage = val;
      this.getList();
    },
    // 变更省市并设置待选区域
    checkedAreaAddress(val) {
      if (val.length === 1) {
        this.editPlace = {
          provinceCode: '',
          cityCode: val[0],
          provinceCity: '',
          areaList: []
        };
      } else if (val.length === 2) {
        this.editPlace = {
          provinceCode: val[0],
          cityCode: val[1],
          provinceCity: '',
          areaList: []
        };
      }
      this.editPlace.provinceCity = this.setProvinceCity();
      this.editCityCode = this.editPlace.cityCode;
      this.areaList = [];
      this.setAreaList();
      if (this.placeList && this.placeList.length > 0) {
        for (let x of this.placeList) {
          if (this.editPlace.cityCode === x.cityCode) {
            this.editPlace.areaList = x.areaList;
          }
        }
      } else {
        this.placeList = [];
      }
    },

    // 根据市区编码解析省市
    setProvinceCity() {
      let stepObj = parseAddress(this.editPlace.cityCode, this.address);
      if (stepObj.city === '') {
        return stepObj.province;
      } else {
        return stepObj.province + stepObj.city;
      }
    },
    checkAll() {
        for (let x of this.areaList) {
          if (this.editAreaIdList.indexOf(x.value) === -1) {
            this.editAreaIdList.push(x.value);
            this.changeCheckBox(x, [true]);
          }
        }
    },
    clearAll() {
      for (let x of this.areaList) {
        this.removeArea(this.editPlace, x);
      }
    },
    // 复选框改变事件
    changeCheckBox(area, arg) {
      this.flag = arg[0]; // 用于判断区域是增还是减的状态
      this.checkedArea = area; // 当前正在操作的区域
      this.setEditPlace();
    },
    // 关闭标签
    removeArea(item, area) {
      this.flag = false;
      this.deletePlace = item;
      this.checkedArea = area;
      this.deleteArea();
      let index = this.editAreaIdList.indexOf(area.value);
      if (index !== -1) {
        this.editAreaIdList.splice(index, 1);
      }
    },
    // 设置当前正在操作的市区
    setEditPlace() {
      if (this.flag) {
        this.editPlace.areaList.push(this.checkedArea);
      } else {
        for (let i in this.editPlace.areaList) {
          if (this.editPlace.areaList[i].value === this.checkedArea.value) {
            this.editPlace.areaList.splice(i, 1);
            i--;
          }
        }
      }
      this.setPlaceList();
    },
    // 同步设置已选中列表
    setPlaceList() {
      if (this.placeList.length === 0 && this.flag) {
        this.placeList.push(this.editPlace);
      } else if (this.placeList.length > 0 && this.flag) {
        for (let i in this.placeList) {
          if (this.placeList[i].cityCode === this.editPlace.cityCode) {
            this.$set(this.placeList, i, this.editPlace);
            return;
          }
        }
        this.placeList.push(this.editPlace);
      } else if (!this.flag) {
        for (let i in this.placeList) {
          if (this.placeList[i].cityCode === this.editPlace.cityCode) {
            if (this.editPlace.areaList.length === 0) {
              this.placeList.splice(i, 1);
            } else {
              this.$set(this.placeList, i, this.editPlace);
            }
          }
        }
      }
    },
    // 关闭标签时同步设置已选中列表
    deleteArea() {
      for (let i in this.deletePlace.areaList) {
        if (this.deletePlace.areaList[i].value === this.checkedArea.value) {
          this.deletePlace.areaList.splice(i, 1);
          i--;
        }
      }
      for (let i in this.placeList) {
        if (this.placeList[i].cityCode === this.deletePlace.cityCode) {
          if (this.deletePlace.areaList.length === 0) {
            this.placeList.splice(i, 1);
          } else {
            this.$set(this.placeList, i, this.deletePlace);
          }
        }
      }
    },
    // 编辑数据列表行
    editConfig(item) {
      this.configInfo = {...item};
      this.placeList = item.areaInfoList; // 编辑行中已有区域
      this.setEditAreaIdList(item.areaInfoList);
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.$refs.configInfo.clearValidate();
      });
    },
    // 编辑行已选中的区域数组
    setEditAreaIdList(list) {
      if (!list || !list.length) {
        return;
      }
      for (let x of list) {
        for (let a of x.areaList) {
          if (a.value) {
            this.editAreaIdList.push(a.value);
          }
        }
      }
    },
    changeServiceName(val) {
      for (let x of this.serviceList) {
        if (x.organizationName === val) {
          this.configInfo.serviceIdFace = x.organizationId;
        }
      }
    },
    handleClose(done) {
      this.$confirm('是否关闭弹窗？')
      .then(_ => {
        done();
      })
      .catch(_ => {});
    },
    validConfig() {
      return new Promise((resolve, reject) => {
        this.$refs.configInfo.validate(valid => {
          if (valid) {
            resolve();
          } else {
            reject(Error);
          }
        });
      });
    },
    sureConfig() {
      this.configInfo.areaInfoList = this.placeList;
      if (!this.configInfo.areaInfoList || this.configInfo.areaInfoList.length === 0) {
        this.$message({
          showClose: true,
          message: '区域不能为空',
          type: 'warning'
        });
        return;
      }
      this.validConfig().then(() => {
        this.$MyFetch.post(surveyApi.surveyRulesUpdate, this.configInfo).then(data => {
          if (data) {
            this.dialogVisible = false;
            this.$message({
              showClose: true,
              message: '保存成功',
              type: 'success'
            });
            this.getList();
          }
        }).catch(err => {
          this.$error(err.message);
        });
      });
    },
    // 双击跳转到调查经理配置页
    jumpToLocal(row, event) {
      this.$router.push({
        path: 'rule-configuration',
        name: 'rule-configuration',
        params: {
          id: row.id,
          parentCode: row.itemCode
        }
      });
    }
  },
  components: {
    pagination
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
.dialog{
  .el-form{
    height:200px;
  }
  .dialog_btn_group{
    height:42px;
  }
  .checkbox_group_title {
    width: 100px;
  }
}
.dialog .search .el-form-item {
  margin-right: 20px;
}
.dialog_city_picker{
  float:left;
  margin-right: 20px;
  margin-bottom: 20px;
  .label_areaId{
    display: block;
    padding-bottom: 10px;
    font-size: 12px;
    line-height: 17px;
    color: #666;
  }
  .adress_control_wrap{
    width:300px;
    margin-right:0;
    float:none;
  }
}
.el-checkbox+.el-checkbox{
  margin-left: 0;
}
.el-checkbox{
  min-width: 90px;
  margin-right:30px;
  padding: 3px 0;
}

.checked_area{
  margin-top: 20px;
}
.checkbox_group_content{
  margin-top: 7px;
  margin-bottom: 30px;
  padding: 10px;
  height: 170px;
  overflow-y:scroll;
  border: 1px solid #e9e9e9;
  border-radius: 4px;
}
.city-area {
  margin-bottom: 19px;
  .city-name {
    margin: 5px;
    font-size: 14px;
    color: #333333;
    height:20px;
    line-height:20px;
  }
  .el-tag {
    min-width:94px;
    height:30px;
    margin: 5px;
    background-color: #ececec;
    border-color:#DDDDDD;
    color: #333333;
    /deep/.el-icon-close {
      top:6px;
      float:right;
      color:#333333;
    }
  }
}
</style>
