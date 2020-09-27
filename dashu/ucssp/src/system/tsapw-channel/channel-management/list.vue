<template>
  <div class="channel-manage">
    <el-button
      type="primary"
      class="button button__blue btn__add width100"
      icon="el-icon-plus"
      @click="edit('add')"
    >新增</el-button>
    <el-form
      :inline="true"
      :model="form"
      ref="checkForm"
      class="demo-form-inline"
    >
      <el-form-item prop="channelName">
        <el-input
          v-model="form.channelName"
          placeholder="一级渠道名称"
          clearable
          class="width160"
        ></el-input>
      </el-form-item>
      <el-form-item prop="channelNum">
        <el-input
          v-model="form.channelNum"
          clearable
          placeholder="一级渠道编码"
          class="width160"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="search"
          class="button width100 button__blue"
        >查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="loading"
      :data="channels"
      class="common__table"
      header-cell-class-name="table-head"
      row-class-name="table-tr">
      <el-table-column type="index">
      </el-table-column>
      <el-table-column
        prop="channelName"
        label="一级渠道名称">
      </el-table-column>
      <el-table-column
        prop="channelNum"
        label="一级渠道编码">
      </el-table-column>
      <el-table-column
        prop="cooperationDate"
        :formatter="formatDate"
        label="合作开始日期">
      </el-table-column>
      <el-table-column
        prop="status"
        :formatter="formatStatus"
        label="进件状态">
      </el-table-column>
      <el-table-column
        prop="products"
        label="一级产品">
      </el-table-column>
      <el-table-column
        prop="permission"
        :formatter="formatPermission"
        label="合伙人平台权限">
      </el-table-column>
      <el-table-column
        prop="updatedName"
        label="维护人员">
      </el-table-column>
      <el-table-column
        prop="updatedDate"
        :formatter="formatDate"
        label="维护日期">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button @click="changeStatus(scope.row)" type="text" size="small" v-if="scope.row.status">{{scope.row.status === "OPENED" ? "停用" : "启用"}}</el-button>
          <el-button @click="edit('edit', scope.row)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script type="text/ecmascript-6">
import { loanApi, thirdApi, blazeApi, ecnApi, creditApi, appApi, fundApi } from "../js/server";
export default {
  data() {
    return {
      form: {},
      channels: [],
      loading: false
    };
  },
  created() {
    this.getChannels();
  },
  methods: {
    formatStatus(row, column, cellValue, index) {
      if (cellValue) {
        return cellValue === "OPENED" ? "启用" : "停用";
      } else {
        return "";
      }
    },
    formatPermission(row, column, cellValue, index) {
      if (cellValue) {
        return cellValue === "OPENED" ? "开" : "关";
      } else {
        return "";
      }
    },
    formatDate(row, column, cellValue, index) {
      if (cellValue) {
        return this.$Moment(cellValue).format('YYYY-MM-DD');
      } else {
        return "";
      }
    },
    getLoan(channelNum) {
      return new Promise((resolve, reject) => {
        this.$MyFetch.get(`${loanApi.getChannel}/${channelNum.toUpperCase()}`).then((data) => {
          resolve();
        }).catch((err) => {
          reject(err);
        });
      });
    },
    getBlaze(channelCode, channelName) {
      return new Promise((resolve, reject) => {
        this.$MyFetch.post(blazeApi.getChannel, {
          channelName,
          channelCode
        }).then((data) => {
          resolve();
        }).catch((err) => {
          reject(err);
        });
      });
    },
    getEcn(channelCode, channelName) {
      return new Promise((resolve, reject) => {
        this.$MyFetch.get(`${ecnApi.getChannel}/${channelCode}`).then((data) => {
          resolve();
        }).catch((err) => {
          reject(err);
        });
      });
    },
    getCredit(channel, channelName) {
      return new Promise((resolve, reject) => {
        this.$MyFetch.post(creditApi.getChannel, {
          channelName,
          channel
        }).then((data) => {
          resolve(data);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    getApp(channelSource) {
      return new Promise((resolve, reject) => {
        this.$MyFetch.get(appApi.getChannel, {
          channelSource
        }).then((data) => {
          resolve(data);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    getFund(channleCode, topBusinessType) {
      return new Promise((resolve, reject) => {
        this.$MyFetch.post(fundApi.getChannel, {
          channleCode,
          topBusinessType
        }).then((data) => {
          if (data.configList[0].fieldList.length > 0) {
            resolve();
          } else {
            reject(new Error("false"));
          }
        }).catch((err) => {
          reject(err);
        });
      });
    },
    changeStatus(row) {
      let text = row.status === "OPENED" ? "停用" : "启用";
      let status = row.status === "OPENED" ? "CLOSED" : "OPENED";
      this.confirmFn(`确定${text}进件状态？`, 'warning')
        .then(() => {
          let topBusinessType = [];
          row.siteProductList.forEach((product) => {
            topBusinessType.push(product.primaryProductCode);
          });
          Promise.all([
            this.getLoan(row.channelNum, row.channelName),
            this.getBlaze(row.channelNum, row.channelName),
            this.getEcn(row.channelNum, row.channelName),
            this.getCredit(row.channelNum, row.channelName),
            this.getApp(row.channelNum, row.channelName),
            this.getFund(row.channelNum, topBusinessType.join(";"))
          ]).then((data) => {
            this.loading = true;
            this.$MyFetch.put(`${thirdApi.updateStatus}/${row.channelNum}/${status}`).then((data) => {
              this.loading = false;
              this.$message.success(`${text}进件状态成功！`);
              this.getChannels();
            }).catch((err) => {
              this.loading = false;
              this.$error(err.message);
            });
          }).catch((err) => {
            console.log(err);
            this.$error("请检查该渠道是否配置完整");
          });
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
    edit(type, row) {
      let query = {};
      if (type === "edit") {
        query = {
          id: row.id,
          channelNum: row.channelNum,
          channelName: row.channelName,
          type: 'edit'
        };
      }
      this.$router.push({
        name: 'channel-management-detail',
        query
      });
    },
    search() {
      this.getChannels();
    },
    getLoanList() {
      return new Promise((resolve, reject) => {
        this.$MyFetch.get(loanApi.getChannelList).then((data) => {
          resolve(data);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    getThirdList() {
      return new Promise((resolve, reject) => {
        this.$MyFetch.get(thirdApi.getChannels, {
          pageNum: 1,
          pageSize: 9999
        }).then((data) => {
          data.records.forEach((record) => {
            let products = [];
            record.siteProductList.forEach((item) => {
              products.push(item.name);
            });
            record.products = products.join(", ");
          });
          resolve(data.records);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    getChannels() {
      this.loading = true;
      Promise.all([this.getLoanList(), this.getThirdList()]).then((data) => {
        this.loading = false;
        let loanList = data[0];
        let thirdList = data[1];
        let channelList = [];
        thirdList.forEach((channel) => {
          channelList.push(channel.channelNum);
        });
        loanList.forEach((channel) => {
          if (!channelList.includes(channel.businessSourceCode)) {
            thirdList.push({
              channelNum: channel.businessSourceCode,
              channelName: channel.businessSourceName
            });
          }
        });
        thirdList = thirdList.filter((channel) => {
          if (!this.form.channelName && !this.form.channelNum) {
            return true;
          }
          if (this.form.channelName && this.form.channelNum) {
            return channel.channelName.indexOf(this.form.channelName) >= 0 && channel.channelNum.indexOf(this.form.channelNum) >= 0;
          }
          if (this.form.channelName) {
            return channel.channelName.indexOf(this.form.channelName) >= 0;
          }
          if (this.form.channelNum) {
            return channel.channelNum.indexOf(this.form.channelNum) >= 0;
          }
        });
        this.channels = thirdList;
      }).catch((err) => {
        this.loading = false;
        this.$error(err.message);
      });
    }
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
.channel-manage {
  position: relative;
  min-height: 820px;
  .boxShadow(0,0);
  padding: 20px 31px;
  .btn__add {
    /deep/ .el-icon-plus {
      line-height: 1.2;
      font-weight: 600;
    }
    margin-bottom: 20px;
  }
  .pagination {
    margin-top: 10px;
  }
}
</style>
