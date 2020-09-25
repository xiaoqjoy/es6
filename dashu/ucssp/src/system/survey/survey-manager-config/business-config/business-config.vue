<template>
  <div class="survey_config_list">
    <!-- 新增按钮 -->
    <button class="add" @click="addConfig()">+ 新增</button>
    <!-- 查询表单 -->
    <el-form class="search" :inline="true" :model="searchInfo" ref="searchInfo" :rules="searchRule">
      <city-picker :value="searchInfo.areaId" @change="checkedAddress"></city-picker>
      <el-form-item prop="surveyAreaName">
        <el-input v-model.trim="searchInfo.surveyAreaName" clearable placeholder="商圈名称" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item>
          <el-button class="width100" type="primary" @click="search">查询</el-button>
          <el-button class="width100" type="primary" plain @click="clearSearch">清空</el-button>
        </el-form-item>
    </el-form>

    <div class="table_box">
      <!-- 表格数据 -->
      <el-table class="feild_table" :data="pageData.list" style="100%">
        <el-table-column label="序号">
          <template slot-scope="scope"><span>{{scope.$index+1}} </span></template>
        </el-table-column>
        <el-table-column prop="provinceCity" label="省市"></el-table-column>
        <el-table-column prop="areaName" label="区域"></el-table-column>
        <el-table-column prop="surveyAreaId" label="商圈编号"></el-table-column>
        <el-table-column prop="surveyAreaName" label="商圈名称"></el-table-column>
        <el-table-column prop="availableInd" label="是否启用">
          <template slot-scope="scope">
            <el-switch :width="50" v-model="scope.row.availableInd" :active-value="true" :inactive-value="false" @change="editBusiness(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editConfig(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="page_box">
      <pagination @jump-page='handleCurrentChange' :page='searchInfo' class="pagination"></pagination>
    </div>

    <el-dialog class="dialog" :title="configDialog.title" :visible.sync="configDialog.dialogVisible" :before-close="handleClose" width="500px" center>
      <el-form class="dialog_form" :inline="true" :model="configInfo" ref="configInfo" :rules="configInfoRules" label-position="top">
        <div class="dialog_con">
          <div class="top_conten"><span class="top_conten_title">商圈编号：</span><span class="top_content_font">{{configInfo.surveyAreaId}}</span></div>
        </div>
        <el-form-item label="商圈名称" prop="surveyAreaName" class="width225">
          <el-input v-model="configInfo.surveyAreaName" placeholder="请填写商圈名称" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="是否启用" prop="availableInd">
          <el-switch :width="50" v-model="configInfo.availableInd" active-text="是" inactive-text="否" :active-value="true" :inactive-value="false"></el-switch>
        </el-form-item>
        <div class="dialog_city_picker" v-if= "configDialog.hasCityPicker">
          <label class="label_areaId" for="areaId">所属省市区</label>
          <city-picker class="adress_control_wrap" id="areaId" :value="configInfo.areaId" @change="checkedAreaAddress"></city-picker>
        </div>
        <div class="dialog_btn_group clearfloat">
          <el-button type="primary" style="width:200px" @click ="saveConfig">{{configDialog.button}}</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import pagination from "@components/pagination"; // 分页条
import CityPicker from "@/components/cityPicker/CityPicker";
import {surveyApi} from "../../js/server.js";
import {deepClone, parseTime, parseAddress} from "../../js/utils.js";
export default {
  name: "business-config",
  data() {
    return {
      pageData: {},
      // 查询信息
      searchInfo: {
        pageNum: 1,
        pageSize: 10,
        areaId: "",
        surveyAreaName: "",
        account: 0,
        currentPage: 1,
        showJumpButton: true
      },
      searchRule: {
        surveyAreaName: [
          { max: 20, trigger: 'blur', message: '请输入20字符以内' }
        ]
      },
      address: [], // 地址数据
      place: {}, // 地址校验
      configInfo: {},
      configInfoRules: {
        surveyAreaName: [
          { required: true, trigger: 'blur', message: '请填写' },
          { max: 20, trigger: 'blur', message: '请输入20字符以内' }
        ]
      },
      configDialog: {},
      municipalitiesArr: ['110000', '120000', '310000', '500000']
    };
  },
  created() {
    // dialog初始化
    this.initConfig();
    // 获取数据列表
    this.getAddressData();
  },
  methods: {
    // dialog初始化
    initConfig() {
      this.configDialog = {
        title: '',
        dialogVisible: false,
        hasCityPicker: true,
        button: ''
      };
      this.configInfo = {
        areaId: "", // 商圈地址编号
        availableInd: true, // 是否启用
        surveyAreaId: "", // 商圈编号
        surveyAreaName: "" // 商圈名称
      };
    },
    // 获取数据列表
    getList() {
      this.$MyFetch.post(surveyApi.surveyAreas, this.searchInfo).then(data => {
        this.pageData = data;
        this.searchInfo.account = data.total;
        this.formatAddress();
      }).catch((err) => {
        this.$error(err.message);
      });
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
        let stepObj = parseAddress(x.areaId, this.address);
        if (stepObj.province === stepObj.city) {
          x.provinceCity = stepObj.province;
        } else {
          x.provinceCity = stepObj.province + stepObj.city;
        }
        x.areaName = stepObj.area;
      }
    },
    // 获取地址数据
    getAddressData() {
      this.getArea().then(res => {
        this.address = this.initAddress(res);
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
      this.searchInfo.areaId = "";
      this.searchInfo.pageNum = 1;
      this.searchInfo.currentPage = 1;
      this.getList();
    },
    // 地址选择器(查询)
    checkedAddress(val) {
      this.searchInfo.areaId = val.areaCode;
    },
    handleCurrentChange(val) {
      this.searchInfo.pageNum = val;
      this.searchInfo.currentPage = val;
      this.getList();
    },
    // 新增配置
    addConfig() {
      let time = parseTime(new Date());
      this.areaSerialNumber = 'SQ' + time.replace(/\D/g, '') + parseInt((Math.random() * 9 + 1) * 1000);
      this.configInfo = {
        areaId: "",
        availableInd: true,
        surveyAreaId: this.areaSerialNumber,
        surveyAreaName: ""
      };
      this.configDialog = {
        title: '新增商圈',
        dialogVisible: true,
        hasCityPicker: true,
        button: '保存'
      };
      this.$nextTick(() => {
        this.$refs.configInfo.clearValidate();
      });
    },
    // 新增 地址选择器
    checkedAreaAddress(val) {
      this.configInfo.areaId = val.areaCode;
      this.place = val;
    },
    // 修改配置
    editConfig(item) {
      this.configInfo = deepClone(item);
      this.configDialog = {
        title: '修改',
        dialogVisible: true,
        hasCityPicker: false,
        button: '修改'
      };
      this.$nextTick(() => {
        this.$refs.configInfo.clearValidate();
      });
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
        if (this.configDialog.dialogVisible) {
          this.$refs.configInfo.validate(valid => {
            if (valid) {
              resolve();
            } else {
              reject(Error);
            }
          });
        } else {
          resolve();
        }
      });
    },
    // 修改一级字段状态
    editBusiness(item) {
      this.configInfo = item;
      this.sendUpdate();
    },
    saveConfig() {
      if (this.configDialog.hasCityPicker && (!this.configInfo.areaId || !this.place.area)) {
        this.$message({
          showClose: true,
          message: '请选择商圈所在区域',
          type: 'warning'
        });
        return;
      }
      this.sendUpdate();
    },
    sendUpdate() {
      this.validConfig().then(() => {
        this.$MyFetch.post(surveyApi.areaMeger, this.configInfo).then(data => {
          if (data) {
            this.$message({
              showClose: true,
              message: '保存成功',
              type: 'success'
            });
            this.initConfig();
            this.getList();
          }
        }).catch(err => {
          this.$error(err.message);
        });
      });
    }
  },
  components: {
    CityPicker,
    pagination
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
.dialog_city_picker{
  margin-bottom: 30px;
  .label_areaId{
    display: block;
    padding-bottom: 10px;
    font-size: 12px;
    line-height: 17px;
    color: #666;
  }
  .adress_control_wrap{
    margin-right:0;
    float:none;
  }
}
</style>
