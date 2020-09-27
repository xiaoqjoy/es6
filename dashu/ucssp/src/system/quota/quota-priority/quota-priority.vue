<style lang="less" scoped>
.pagination {
  margin-top: 20px;
}
.del {
  color: #f55f5f;
}
</style>

<template>
  <div class="contain">
    <el-select v-model="configStatus" placeholder="配置选择" @change="changeConfig">
      <el-option label="配置开启" :value="1"></el-option>
      <el-option label="配置关闭" :value="0"></el-option>
    </el-select>
    <button class="add" @click="add()">+ 新增</button>
    <el-form ref="form" :inline="true" :model="form" class="demo-form-inline">
      <el-form-item prop="schemeCode">
        <el-select clearable v-model="form.schemeCode" filterable placeholder="方案名称">
          <el-option
            v-for="(item, index) in schemeNames"
            :key="index"
            :label="item.schemeName"
            :value="item.schemeCode">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="fundCode">
        <el-select clearable v-model="form.fundCode" filterable placeholder="资金方名称">
          <el-option
            v-for="(item, index) in fundNames"
            :key="index"
            :label="item.fundName"
            :value="item.fundCode">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="areaCodes">
        <el-cascader
          v-model="form.areaCodes"
          placeholder="适用地区"
          collapse-tags
          clearable
          :options="areaOptions"
          :props="areaProps">
        </el-cascader>
      </el-form-item>
      <el-button type="primary" @click="search" class="add check">查询</el-button>
      <el-button type="primary" @click="clear" class="add check clear">清空</el-button>
    </el-form>
    <el-table
    :data="tableData"
    style="width: 100%">
      <el-table-column
        type="index"
        label="序号">
      </el-table-column>
      <el-table-column
        prop="schemeName"
        label="方案名称">
      </el-table-column>
      <el-table-column
        :formatter="formatChannelName"
        prop="channelName"
        label="适用渠道">
      </el-table-column>
      <el-table-column
        width="200"
        label="优先级方案">
        <template slot-scope="scope">
          <div v-html="getPriority(scope.row.fundList)">
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="适用地区">
        <template slot-scope="scope">
          {{ getArea(scope.row.areaList) }}
          <!-- <el-tooltip effect="dark" :content="getArea(scope.row.areaList)" placement="top">
            <div class="ellipsis">
              {{ getArea(scope.row.areaList) }}
            </div>
          </el-tooltip> -->
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
      >
        <template slot-scope="scope">
          <div>
            <el-button type="text" size="small" @click="edit(scope.row)">配置</el-button>
            <el-button type="text" size="small" class="del" @click="del(scope.row)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <pagination @jump-page='getList' :page='pageConfig' class="pagination"></pagination>
    <info-detail v-if="show" @close="close" :row="row" :fundNames="fundNames" :channelCodes="channelCodes" :areaOptions="areaOptions"></info-detail>
  </div>
</template>

<script type="text/ecmascript-6">
import {quotaApi} from '../js/server.js';
import infoDetail from "./info-details/info-details";
import pagination from "@components/pagination"; // 分页条

export default {
  data() {
    return {
      configStatus: 1,
      form: {},
      areaOptions: [],
      areaProps: {
        label: 'areaName',
        value: 'areaCode',
        multiple: true,
        disabled: ''
      },
      pageConfig: {
        account: 0,
        pageSize: 10,
        currentPage: 1,
        showJumpButton: true
      },
      schemeNames: [],
      fundNames: [],
      channelCodes: [],
      tableData: [],
      row: {},
      show: false
    };
  },
  components: {
    infoDetail,
    pagination
  },
  methods: {
    getArea(areaList) {
      let arr = [];
      areaList.forEach((fund) => {
        arr.push(fund.areaName);
      });
      arr = [...new Set(arr)];
      return arr.join("、");
    },
    getPriority(fundList) {
      let arr = [];
      fundList.forEach((fund) => {
        arr.push(fund.fundName + ": " + fund.priority);
      });
      return arr.join("<br>");
    },
    getGlobalSetting() {
      this.$MyFetch.get(quotaApi.getGlobalSetting)
        .then((data) => {
          this.configStatus = data.onoff;
        })
        .catch((err) => {
          this.$error(err.message);
        });
    },
    changeConfig() {
      let status = this.configStatus === 0 ? "关闭" : "开启";
      this.confirmFn(`确定${status}配置吗？`, 'warning')
        .then(() => {
          this.$MyFetch.post(`${quotaApi.globalSetting}?onof=${this.configStatus}`, {})
          .then((data) => {
            this.$message.success("修改配置成功！");
          })
          .catch((err) => {
            this.$error(err.message);
          });
        })
        .catch(() => {
          this.configStatus = 1 - this.configStatus;
        });
    },
    getSelector() {
      this.$MyFetch.get(quotaApi.schemeNames)
        .then((data) => {
          this.schemeNames = data;
        })
        .catch((err) => {
          this.$error(err.message);
        });
      this.$MyFetch.get(quotaApi.fundNames)
        .then((data) => {
          this.fundNames = data;
        })
        .catch((err) => {
          this.$error(err.message);
        });
      this.$MyFetch.get(quotaApi.areaTree)
        .then((data) => {
          this.areaOptions = data;
        })
        .catch((err) => {
          this.$error(err.message);
        });
      this.$MyFetch.get(quotaApi.getChannel)
        .then((data) => {
          this.channelCodes = data;
        })
        .catch((err) => {
          this.$error(err.message);
        });
    },
    formatChannelName(row, column, cellValue, index) {
      return row.channelList.map((channel) => {
        return channel.channelName;
      }).join("、");
    },
    getList(pageNum) {
      let areaCodes = [];
      if (this.form.areaCodes) {
        this.form.areaCodes.forEach((area) => {
          areaCodes.push(area[area.length - 1]);
        });
      }
      if (!pageNum) {
        pageNum = this.pageConfig.currentPage;
      }
      let pageSize = this.pageConfig.pageSize;
      this.$MyFetch.post(`${quotaApi.schemeList}?pageNum=${pageNum}&pageSize=${pageSize}`, {
        areaCodes,
        fundCode: this.form.fundCode,
        schemeCode: this.form.schemeCode
      })
      .then((data) => {
        this.tableData = data.list;
        this.pageConfig.account = data.total || 0;
        this.pageConfig.currentPage = data.pageNum || 1;
      })
      .catch((err) => {
        this.$error(err.message);
      });
    },
     search() {
      this.getList(1);
    },
    add() {
      this.row = {};
      this.show = true;
    },
    edit(row) {
      this.row = row;
      this.show = true;
    },
    del(row) {
      this.confirmFn("确认删除该数据吗？", 'warning')
        .then(() => {
          this.$MyFetch.post(`${quotaApi.delScheme}/${row.id}`)
          .then(() => {
            this.$message.success("删除成功！");
            this.getList();
          })
          .catch((err) => {
            this.$error(err.message);
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    clear () {
      this.form = {};
    },
    close(flag) {
      this.show = false;
      if (flag) {
        this.getList();
        this.getSelector();
      }
    }
  },
  created() {
    this.getGlobalSetting();
    this.search();
    this.getSelector();
  }
};
</script>
