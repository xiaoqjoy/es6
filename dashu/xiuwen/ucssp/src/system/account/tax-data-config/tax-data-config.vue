<template>
  <div class="page-company">
    <div class="data-box"><span class="maintenance">税务数据调用配置</span></div>
    <el-button
      type="primary"
      class="button button__blue btn__add width100"
      icon="el-icon-plus"
      @click="add_alert(1)"
    >新增</el-button>
    <div class="b_content">
      <!-- <el-cascader class="select_245"
        placeholder="省-市"
        filterable
        :options="regionOptions"
        v-model="areaId">
      </el-cascader> -->
       <el-select
        class="select_72"
        v-model="areaId"
        filterable
        placeholder="省/市">
        <el-option
          v-for="item in regionOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select
        class="select_72"
        v-model="tlTaxOrganizationId"
        filterable
        placeholder="税务数据接入机构">
        <el-option
          v-for="item in taxOrganizationIdList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select
        class="select_72 select_72_0"
        v-model="statusCd"
        placeholder="是否有效"
      >
        <el-option
          v-for="item in validityList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-button
        class="b_button query"
        @click="getTabData(1)"
      >查询</el-button>
      <el-button
        class="b_button empty"
        @click="empty()"
      >清空</el-button>
    </div>
    <!-- 表格 -->
    <el-table
      :data="tableData"
      class="common__table"
      header-cell-class-name="table-head"
      row-class-name="table-tr"
      style="width: 100%"
      height="500"
    >
      <el-table-column
        prop="region"
        label="省-市"
      >
      </el-table-column>
      <el-table-column
        prop="tlTaxOrganizationName"
        label="个税数据接入机构"
      >
      </el-table-column>
      <el-table-column
        prop="statusCd"
        label="是否有效">
        <template slot-scope='scope'>
          {{scope.row.statusCd | statusFilter}}
        </template>
      </el-table-column>
      <el-table-column
        prop="updatedBy"
        label="更新人"
      >
      </el-table-column>
      <el-table-column
        prop="updatedDate"
        label="更新时间"
      >
      </el-table-column>
      <el-table-column
        prop="option"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
          <el-button class="del" @click="del(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :page="pageConfig"
      class="pagination"
      @jump-page="jump"
    ></pagination>
    <!-- 新增 -->
    <v-add
      v-if="alert1"
      :refer="getTabData"
      :regOption="regionOptionsTemp"
      :taxOrganizationIdList="taxOrganizationIdList"
      :title="'新增'"
      :show="1"
      @clsoe_windowAlert='close("1")'
    />
    <!-- 新增结束 -->
    <!-- 修改 -->
    <v-add
      v-if="alert2"
      :refer="getTabData"
      :regOption="regionOptions"
      :taxOrganizationIdList="taxOrganizationIdList"
      :rowData="rowData"
      :title="'修改'"
      :show="0"
      @clsoe_windowAlert='close(2)'
    />
    <!-- 修改结束 -->
    <!-- <deleted
      v-if="alert3"
      :refer="getTabData"
      @clsoe_windowAlert_c='close(3)'
    /> -->
  </div>
</template>
<script type="text/ecmascript-6">
import pagination from "@components/pagination";
import { accountApi } from "../js/server.js";
import vAdd from "./newly-increased";
// import deleted from "./deleted";
export default {
  data() {
    return {
      tlTaxOrganizationId: "", // 税务接入机构
      statusCd: '', // 是否有效
      regionOptions: [],
      regionOptionsTemp: [],
      areaId: '',
      cityArry: ['北京市', '天津市', '重庆市', '上海市'],
      specialCity: ['台湾省', '香港特别行政区', '澳门特别行政区'],
      tableData: [],
      alert1: false, // 默认关闭新增页面
      alert2: false, // 默认关闭编辑页面
      alert3: false, // 默认关闭删除页面
      rowData: {}, // 传入编辑页的数据
      pageConfig: {
        account: 0, // 总条数
        pageSize: 10, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      }, // 分页
      taxOrganizationIdList: [],
      validityList: [
        {value: 'N', label: '是'},
        {value: 'U', label: '否'}
      ]
    };
  },
  components: {
    pagination,
    vAdd
  },
  methods: {
    getTaxOrganizationIdList() {
      this.$MyFetch.get(accountApi.taxConfig.tax_loan_organization_list)
        .then((_data) => {
          this.$lodash.each(_data, (_e, _i) => {
            _e.value = _e.tlTaxOrganizationId;
            _e.label = _e.taxOrganizationName;
          });
          this.taxOrganizationIdList = _data;
        })
        .catch((_erro) => {
          console.log(_erro);
          this.$error('获取税务数据接入机构失败');
        });
    },
    getTabData(_pageNum) {
      let params = {
        pageNum: _pageNum,
        pageSize: this.pageConfig.pageSize,
        tlTaxOrganizationId: this.tlTaxOrganizationId,
        areaId: this.areaId,
        statusCd: this.statusCd
      };
      this.tableLoading = true;
      this.$MyFetch
        .post(accountApi.taxConfig.area_tax_organization_list, params)
        .then((data = {}) => {
          this.tableLoading = false;
          this.pageConfig.account = data.total;
          this.pageConfig.currentPage = data.pageNum;
          this.tableData = data.list;
          if (!this.$lodash.isEmpty(this.regionOptions)) {
            this.$lodash.each(this.tableData, (_e) => {
              _e.regionType = this.getAddressArr(_e.areaId, this.regionOptions);
              _e.region = this.getAddressStr(_e.regionType[_e.regionType.length - 1], this.regionOptions);
            });
          }
        }).catch(err => {
          this.tableLoading = false;
          this.$error(err.message);
        });
    },
    // 分页
    jump(pageNum) {
      this.pageConfig.currentPage = pageNum;
      this.getTabData(this.pageConfig.currentPage);
    },
    add_alert(_val) {
      this['alert' + _val] = true;
    },
    edit(_row) {
      this.alert2 = true;
      this.rowData = _row;
    },
    del(_row) {
      // this.alert3 = true;
      this.$confirm('确认要删除此条的记录？')
        .then(() => {
          if (this.tableData.length === 1 && this.pageConfig.currentPage > 1) {
            // 当前页表格数据只有一条并且当前页数大于1的时候，当前页数－1
            this.pageConfig.currentPage--;
          }
          this.$MyFetch.get(accountApi.taxConfig.tax_loan_area_del, {
            tlAreaTaxOrganizationId: _row.tlAreaTaxOrganizationId
          }).then((_data) => {
            // this.$confirm('删除成功');
            this.getTabData(this.pageConfig.currentPage);
          }).catch((_erro) => {
            console.log(_erro);
          });
        })
        .catch(() => {
          console.log('cancal');
        });
    },
    // 新增
    close(_val) {
      // 1 为新增，2为编辑，3为删除
      this['alert' + _val] = false;
    },
    // 清空按钮
    empty() {
      if (this.areaId || this.tlTaxOrganizationId || this.statusCd) {
        this.areaId = '';
        this.tlTaxOrganizationId = '';
        this.statusCd = '';
        this.getTabData(1);
      }
    },
    handleTheRegion() {
      this.getArea().then(async (res) => {
        let specialCity = this.$lodash.concat(this.cityArry, this.specialCity);
        let that = this;
        let reg = this.getLocations(res);
        let temp = JSON.parse(JSON.stringify(reg));
        reg = this.treeToList(reg);
        this.$lodash.each(temp, (_item) => {
          if (!that.checkCity(specialCity, _item.label)) {
            _item.disabled = true;
          }
        });
        this.regionOptionsTemp = temp;
        this.regionOptions = reg;
        await this.getTabData(1);
      });
    },
    checkCity(_city, _cityName) {
      // 检查是否直辖市：
      for (let i = 0; i < _city.length; i++) {
        if (_city[i] === _cityName) {
          return true;
        }
      }
    },
    getLocations(_locations) {
      let reg = [];
      for (let x of _locations) {
        // get province
        let city = [];
        if (x.children) {
          for (let j of x.children) {
            // get city
            if (!this.checkCity(this.cityArry, x.label)) {
              city.push({
                value: j.value,
                label: j.label,
                path: `${x.label}-${j.label}`
              });
            }
          }
          reg.push({
            value: x.value,
            label: x.label,
            children: !this.$lodash.isEmpty(city) ? city : [],
            path: x.label
          });
        } else {
          // cant get province,eg. HK
          reg.push({
            value: x.value,
            label: x.label,
            path: x.label
          });
        }
      }
      return reg;
    },
    treeToList(_locations) {
      let reg = [];
      // function flatten(_locations) {
      //   return _locations.reduce((arr, {label, value, children = []}) => arr.concat([{label, value}], flatten(children)), []);
      // }
      // reg = flatten(_locations);
      for (let x of _locations) {
        if (x.children) {
          for (let j of x.children) {
            if (!this.checkCity(this.cityArry, x.label)) {
              reg.push({value: j.value, label: `${x.label}/${j.label}`});
            }
          }
          if (this.checkCity(this.cityArry, x.label)) {
            reg.push({value: x.value, label: x.label});
          }
        } else {
          reg.push({value: x.value, label: x.label});
        }
      }
      return reg;
    },
     // 根据最后一位地区编码返回数组 code 后端返回的字符, option地区字典
    getAddressArr(code = '', options = []) {
      let arr = [];
      options.forEach((p) => {
        let currentArr = [p.value];
        if (p.value === code) {
          arr = [...currentArr];
        } else if (p.children) {
          p.children.forEach((c) => {
            currentArr[1] = c.value;
            if (c.value === code) {
              arr = [...currentArr];
            } else if (c.children) {
              c.children.forEach((a) => {
                currentArr[2] = a.value;
                if (a.value === code) {
                  arr = [...currentArr];
                }
              });
            }
          });
        }
      });
      return arr;
    }
  },
  created() {
    // this.getList(1);
    this.getTabData(1);
    this.getTaxOrganizationIdList();
  },
  mounted() {
    // this.drop_down();
    // this.refer(1);
    this.handleTheRegion();
  },
  filters: {
    statusFilter(_val) {
      return _val === 'N' ? '是' : '否';
    }
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
.page-company {
  position: relative;
  min-height: 820px;
  .boxShadow(0, 0);
  padding: 20px 31px;
  .btn__add {
    /deep/ .el-icon-plus {
      line-height: 1.2;
      font-weight: 600;
    }
    margin-bottom: 20px;
  }
  .pagination {
    position: absolute;
    bottom: 20px;
    right: 31px;
  }
  .common__table {
    /deep/.el-table__body-wrapper {
      max-height: 550px;
      overflow-y: auto;
    }
  }
  .data-box {
    height: 60px;
    border-bottom: 1px solid #e5e5e5;
    margin-bottom: 20px;
    .maintenance {
      border-left: 2px solid #538bf1;
      padding-left: 5px;
      font-family: PingFangSC-Medium;
      font-size: 16px;
      color: #333333;
      line-height: 60px;
    }
  }
  .b_content {
    text-align: left;
    height: 60px;
    // 输入框和下拉框172*40
    .select_72 {
      width: 172px;
      height: 40px;
      margin-right: 15px;
    }
    .select_72.select_72_0 {
      margin-right: 35px;
    }
    // 查询和清空的公有样式
    .b_button {
      width: 100px;
      height: 40px;
      border-radius: 4px;
      font-size: 14px;
    }
    // 查询单独样式
    .query {
      background: #538bf1;
      color: #ffffff;
      border: 1px solid #538bf1;
    }
    // 清空单独样式
    .empty {
      margin-left: 15px;
      background: #ffffff;
      color: #538bf1;
      border: 1px solid #538bf1;
    }
  }
  .del {
    color: #f55f5f;
  }
}
</style>
