<style lang="less" scoped>
.dialog-box {
  width: 500px;
  // height: 770px;
}
.el-form {
  padding: 10px 20px;
}
.el-form-item {
  width: 100%;
}
.table-wrap {
  width: 100%;
  height: 200px;
  border: 1px solid #d0d0d0;
  overflow: auto;
}
.table {
  width: 100%;
  th {
    width: 40%;
    background: #ececec !important;
    padding: 8px 0;
    font-size: 12px;
    text-align: center;
    line-height: 23px;
    &:last-child {
      width: 20%;
    }
  }
  td {
    text-align: center;
    padding: 6px 14px;
  }
  .icon {
    vertical-align: middle;
    margin: 0 6px;
    color: #538bf1;
  }
}
.el-cascader-panel {
  width: 100%;
}
.btn-wrap {
  text-align: center;
  margin-bottom: 0;
}
.btn-ok {
  background: #538bf1;
  width: 320px;
  color: #fff;
  text-align: center;
}
</style>

<template>
  <div class="drop_loan">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <div class="dialog-box__top">
        <h5 class="title">配置方案</h5>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <div class="complete-product">
        <div class="dialog-box__middle-form">
          <el-form ref="form">
            <el-form-item label="方案名称" prop="schemeName">
              <el-input v-model="schemeName" placeholder="请填写方案名称" maxlength="10"></el-input>
            </el-form-item>
            <el-form-item label="适用渠道" prop="channelCode">
              <el-select v-model="channelList" multiple clearable filterable placeholder="请选择适用渠道" @change="getAreaList">
                <el-option v-for="(fund, index) in channelCodes" :value="fund.channelCode" :label="fund.channelName" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="优先级方案" class="table-item">
              <div class="table-wrap">
                <table class="table">
                  <tr>
                    <th>资金方名称</th>
                    <th>优先级</th>
                    <th>操作</th>
                  </tr>
                  <tr v-for="(item, index) in priorityRequestList" :key="index">
                    <td>
                      <el-select v-model="item.fundCode" clearable filterable placeholder="请选择资金方名称">
                        <el-option v-for="(fund, index) in fundNames" :value="fund.fundCode" :label="fund.fundName" :key="index"></el-option>
                      </el-select>
                    </td>
                    <td>
                      <el-select v-model="item.priority" clearable filterable placeholder="请选择优先级">
                        <el-option v-for="priority in priorityList" :value="priority" :label="priority" :key="priority"></el-option>
                      </el-select>
                    </td>
                    <td>
                      <i class="icon el-icon-plus cursor__pointer" @click="add" v-if="index === priorityRequestList.length-1"></i>
                      <i class="icon el-icon-minus cursor__pointer" @click="del(index)" v-if="priorityRequestList.length > 1"></i>
                    </td>
                  </tr>
                </table>
              </div>
            </el-form-item>
            <el-form-item label="适用地区" prop="areaList">
              <el-cascader-panel
                v-model="areaList"
                placeholder="请选择适用地区"
                :options="areaOwnOptions"
                :props="areaProps">
              </el-cascader-panel>
            </el-form-item>
            <el-form-item class="btn-wrap">
              <el-button class="btn-ok" @click="save">确定</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { quotaApi } from '../../js/server';
export default {
  data() {
    return {
      schemeName: '',
      channelList: [],
      areaList: '',
      areaSelectList: [],
      priorityRequestList: [{
        fundCode: '',
        priority: ''
      }],
      priorityList: [],
      areaOwnOptions: JSON.parse(JSON.stringify(this.areaOptions)),
      areaProps: {
        label: 'areaName',
        value: 'areaCode',
        multiple: true,
        disabled: 'setting'
      }
    };
  },
  props: {
    fundNames: Array,
    channelCodes: Array,
    row: Object,
    areaOptions: Array
  },
  methods: {
    close() {
      this.$emit("close", false);
    },
    add() {
      let len = this.priorityRequestList.length;
      let lastPriority = this.priorityRequestList[len - 1];
      if (lastPriority.fundCode && lastPriority.priority) {
        this.priorityRequestList.push({
          fundCode: '',
          priority: ''
        });
      } else {
        this.$message("请先完善当前优先级方案");
      }
    },
    del(index) {
      this.confirmFn("确定删除此优先级方案？", "warning")
        .then(() => {
          this.priorityRequestList.splice(index, 1);
        });
    },
    getChannelName(code) {
      for (let i = 0, len = this.channelCodes.length; i < len; i++) {
        if (this.channelCodes[i].channelCode === code) {
          return this.channelCodes[i].channelName;
        }
      }
    },
    save() {
      if (!this.schemeName) {
        this.$message("请填写方案名称");
        return;
      }
      let priorityRequestList = [];
      let flag = true;
      this.priorityRequestList.forEach((priorityReques) => {
        if (priorityReques.fundCode && priorityReques.priority) {
          priorityRequestList.push({
            fundCode: priorityReques.fundCode,
            priority: priorityReques.priority
          });
        } else if (!priorityReques.fundCode && !priorityReques.priority) {
          if (this.priorityRequestList.length === 1) {
            flag = false;
          }
        } else {
          flag = false;
        }
      });
      if (!flag) {
        this.$message("请完善优先级方案");
        return;
      }
      let areaList = [];
      if (this.areaList) {
        this.areaList.forEach((area) => {
          areaList.push({
            areaCode: area[area.length - 1]
          });
        });
      }
      if (areaList.length === 0) {
        this.$message("请选择适用地区");
        return;
      }
      let channelList = this.channelList.map((code) => {
        return {
          channelCode: code,
          channelName: this.getChannelName(code)
        };
      });
      let data = {
        schemeName: this.schemeName,
        schemeCode: this.row.schemeCode,
        channelList,
        priorityRequestList,
        areaList
      };
      if (this.row.id) {
        data.id = this.row.id;
        this.editScheme(data);
      } else {
        delete data.schemeCode;
        this.addScheme(data);
      }
    },
    addScheme(data) {
      this.$MyFetch.post(quotaApi.addScheme, data)
        .then((data) => {
          this.$message.success("新增成功！");
          this.$emit("close", true);
        })
        .catch((err) => {
          this.$error(err.message);
        });
    },
    editScheme(data) {
      this.$MyFetch.post(`${quotaApi.editScheme}/${this.row.id}`, data)
        .then((data) => {
          this.$message.success("修改成功！");
          this.$emit("close", true);
        })
        .catch((err) => {
          this.$error(err.message);
        });
    },
    getAreaList() {
      let channelList = this.channelList;
      if (channelList.length === 0) {
        channelList = this.row.channelList.map(channel => channel.channelCode);
      }
      this.$MyFetch.get(quotaApi.areaTree, {
          channelList,
          schemeCode: this.row.schemeCode || ''
        })
        .then((data) => {
          this.areaOwnOptions = data;
          this.area2Cascade();
        })
        .catch((err) => {
          this.$error(err.message);
        });
    },
    area2Cascade() {
      let areas = [];
      this.areaSelectList.forEach((area) => {
        this.areaOwnOptions.forEach((option) => {
          let code = area.areaCode;
          if (option.areaCode === code) {
            option.setting = false;
            areas.push([code]);
          }
          let childs = option.children;
          let province = option.areaCode;
          if (childs) {
            childs.forEach((child) => {
              if (child.areaCode === code) {
                child.setting = false;
                areas.push([province, code]);
              }
              let sons = child.children;
              let city = child.areaCode;
              if (sons) {
                sons.forEach((son) => {
                  if (son.areaCode === code) {
                    son.setting = false;
                    areas.push([province, city, code]);
                  }
                });
              }
            });
          }
        });
      });
      this.areaList = areas;
    }
  },
  mounted() {
    let data = JSON.parse(JSON.stringify(this.row));
    if (data.id) {
      this.schemeName = data.schemeName;
      this.channelList = data.channelList.map((channel) => {
        return channel.channelCode;
      });
      this.priorityRequestList = data.fundList;
      this.areaSelectList = data.areaList;
      this.getAreaList();
    }
    for (let i = 1; i < 100; i++) {
      this.priorityList.push(i);
    }
  }
};
</script>
