<template>
  <div id="house-table" class="dialog__table-box">
    <el-tabs v-model="TabActiveName" class="tab-box">
      <el-tab-pane label="房产信息" name="first"></el-tab-pane>
      <el-tab-pane label="担保人信息" name="second"></el-tab-pane>
      <span class="button font__blue add__btn" @click="openMessageBox" v-if="!isDetail&&!ydApproveMode2"><span class="icon icon__add">+</span>新增</span>
    </el-tabs>
    <div class="dialog__table-box" v-show="TabActiveName === 'first'">
      <table>
        <thead>
        <tr>
          <th>房产证号</th>
          <th>房产证地址</th>
          <th>房产详细地址</th>
          <th>房屋性质</th>
          <th>持有房产日期</th>
          <th>是否抵押</th>
          <th>共有产权人数</th>
          <th>借款人产权份额</th>
          <th>面积</th>
          <th>均价</th>
          <th>人工录入均价</th>
          <th v-if="nodeStatus !== 'beforeApprovalAudit'">房贷是否有效</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item) in houseList" :key="item.id">
          <td>{{item.estateNum}}</td>
          <td>{{getAddressStr(item.addressCode, options)}}</td>
          <td>{{item.addressDesc}}</td>
          <td>{{houseClass[item.estateTypeCode]}}</td>
          <td>{{getTime(item.obtainDate)}}</td>
          <td>{{item.mortgageInd === null ? '' : item.mortgageInd ? '是': '否'}}</td>
          <td>{{item.coownersCnt}}</td>
          <td>{{item.propertySharePercent}}%</td>
          <td>{{item.houseSizeMeas}}平方米</td>
          <td>{{item.slAverageAmt}}</td>
          <td>{{item.inputAverageAmt}}</td>
          <td v-if="nodeStatus !== 'beforeApprovalAudit'">{{item.incomeInd === null ? '' : item.incomeInd ? '是': '否'}}</td>
          <td>
            <div class="operate-box">
              <i class="icon el-icon-minus cursor__pointer" @click="deleteHouseMessage(item.id)" v-if="!isDetail&&!ydApproveMode2"></i>
              <i class="icon icon__edit cursor__pointer" @click="openMessageBox(item)"></i>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="dialog__table-box">
      <table v-show="TabActiveName === 'second'">
        <thead>
        <tr>
          <th>担保人编号</th>
          <th>担保人姓名</th>
          <th>证件类型</th>
          <th>证件号码</th>
          <th>担保人手机号</th>
          <th>单位联系人姓名</th>
          <th v-if="!isDetail&&!ydApproveMode2">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item) in guarantorList" :key="item.id">
          <td>{{item.id}}</td>
          <td>{{item.guaranteeName}}</td>
          <td>{{certificateClass[item.certificateTypeCode]}}</td>
          <td>{{item.certificateNum}}</td>
          <td>{{item.contactNum}}</td>
          <td>{{item.workContractName}}</td>
          <td v-if="!isDetail&&!ydApproveMode2">
            <div class="operate-box" v-if="!isDetail&&!ydApproveMode2">
              <i class="icon el-icon-minus cursor__pointer" @click="deleteGuarantor(item.id)"></i>
              <i class="icon icon__edit cursor__pointer" @click="openMessageBox(item)"></i>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div>
      <house-message
        v-if="openHouseMessageDg"
        :has-submit="isDetail || ydApproveMode2 "
        @close="closeHouseMessage"
        :house-id="houseId"
        :house-id-list="houseIdList"
        :areaList="options"
        :application-id="applicationId"
      ></house-message>
    </div>
    <div>
      <add-guarantor
        v-if="openAddGuarantorDg"
        @close="closeGuarantor"
        :application-id="applicationId"
        :house-id-list="enableHouseIdList"
        :house-id="guarantorHouseId"
        :guarantor-id="guarantorId"
        :has-submit="isDetail || ydApproveMode2 "
      ></add-guarantor>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import {baseApi} from '@system/face2face/js/server';
import houseMessage from '@system/spare/solving/complete_info/complete-product/house_message';
import addGuarantor from '@system/spare/solving/complete_info/complete-product/add_guarantor';
export default {
  name: 'houseTable',
  props: {
    dictLib: {
      type: Object,
      default: () => ({})
    },
    isDetail: {
      type: Boolean,
      default: false
    },
    // 易贷面核面签（除收款账户信息）不可编辑
    ydApproveMode2: {
      type: Boolean,
      default: false
    },
    applicationId: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => ([])
    },
    nodeStatus: {
      type: String,
      default: 'approvalAudit'
    }
  },
  data() {
    return {
      houseList: [],
      houseEdit: {},
      openHouseMessageDg: false,
      openAddGuarantorDg: false,
      estateTypeCodeLibrary: [],
      houseId: '',
      houseIdList: [],
      // 担保人信息
      guarantorList: [],
      guarantorHouseIdList: [], // 已经有担保人的房产证号
      guarantorHouseId: "", // 被选中的列表 房产证号
      certificateClass: {},
      enableHouseIdList: [], // 可被选中的房产证号,
      guarantorId: "", // 被选中编辑的列表
      houseClass: {}, // 房屋性质字典
      TabActiveName: "first" // 房产信息数据
    };
  },
  methods: {
    // 关闭房产信息弹出层
    closeHouseMessage() {
      this.openHouseMessageDg = false;
      this.houseEdit = {};
      this.getHouseList();
      this.getGuarantorList(this.applicationId);
    },
    // 获取担保人信息
    getGuarantorList(id) {
      this.$MyFetch
        .post(baseApi.completeProduct.getGuaranteeList, { applicationId: id })
        .then(data => {
          if (data && data.list && data.list.length >= 0) {
            this.guarantorList = [...data.list];
            this.guarantorHouseIdList = [];
            data.list.forEach(v => {
              this.guarantorHouseIdList.push(v.estateNum);
            });
          }
        }).catch(err => {
          console.error(err);
          this.confirmFn(err.message, "error");
        });
    },
    closeGuarantor() {
      this.getGuarantorList(this.applicationId);
      this.openAddGuarantorDg = false;
    },
    deleteGuarantor(id) {
      // 具体看vuex中的face2face.js文件
      if (!this.openVideo) {
        return;
      }
      this.confirmFn("是否删除该条信息？", "warning").then(() => {
          this.$MyFetch.get(baseApi.completeProduct.deleteGuarantee + id)
            .then(() => {
              this.confirmFn("删除成功！", "success");
              this.getGuarantorList(this.applicationId);
            });
        }).catch(err => {
          err.message && this.confirmFn(err.message, "error");
        });
    },
    // 获取房产客户信息列表
    getHouseList() {
      this.$MyFetch.post(baseApi.completeProduct.getHourseList, {applicationId: this.applicationId}).then((data) => {
        data = data || {};
        this.houseList = data.list;
        // this.guarantorList = data.estateGuarantees;
        this.houseIdList = [];
          this.houseList.forEach(v => {
            this.houseIdList.push(v.estateNum);
          });
        // this.guarantorHouseIdList = [];
        //   this.guarantorList.forEach(v => {
        //     this.guarantorHouseIdList.push(v.estateNum);
        //   });
      }).catch(err => {
        console.error(err);
        this.confirmFn(err.message, "error");
      });
    },
    // 打开房产信息 或担保人信息 新增（编辑窗口）
    openMessageBox(obj = {}) {
      // 具体看vuex中的face2face.js文件
      if (!this.openVideo) {
        return;
      }
      if (this.TabActiveName === "first") {
        // 新增房产信息
        if (!obj.id && this.houseList.length >= 2) {
          this.confirmFn("最多添加两条房产信息！", "error");
          return;
        }
        this.openHouseMessageDg = true;
        this.houseId = obj.id;
      } else {
        if (!obj.id && this.guarantorList.length >= 2) {
          this.confirmFn("最多添加两条担保人信息！", "error");
          return;
        } else if (this.houseIdList.length <= 0) {
          this.confirmFn("请先添加房产信息！", "error");
          return;
        }
        // 过滤掉已经有担保人的房产
        // 保证每一条房产只有一个担保人
        this.enableHouseIdList = [];
        this.houseIdList.forEach(v => {
          this.enableHouseIdList.push(v);
        });
        this.guarantorId = obj.id;
        this.guarantorHouseId = obj.estateNum;
        this.openAddGuarantorDg = true;
      }
    },
    // 删除房产信息
    deleteHouseMessage(id) {
      // console.log("删除房产信息");
      // 具体看vuex中的face2face.js文件
      if (!this.openVideo) {
        return;
      }
      this.confirmFn("是否删除该条信息？", "warning")
        .then(() => {
          this.$MyFetch
            .get(baseApi.completeProduct.deleteHouse + id)
            .then((data = {}) => {
              this.confirmFn("删除成功", "success");
              this.getHouseList();
              this.getGuarantorList(this.applicationId);
            });
        })
        .catch(err => {
          console.error(err);
        });
    },
    // 获取多个下拉项
    getMultipleLibrary(arr, isReadonly = false) {
      let data = {
        categoryCodes: arr,
        getAll: isReadonly
      };
      return this.$MyFetch.get(baseApi.multipleSelect, data);
    },
    // 根据时间搓返回时间
    getTime(time) {
      var str = "/";
      if (time) {
        time = typeof time === "string" ? time.replace(/-/g, "/") : time;
        str = new Date(time).normalizeTime().strDate;
      }
      return str;
    }
  },
  mounted() {
    this.getHouseList();
    this.getGuarantorList(this.applicationId);
  },
  created() {
    let selectArr = [
      "estate_type_code", 'certificate_type_code'
    ];
    this.getMultipleLibrary(selectArr, this.isDetail)
      .then(data => {
        data.estate_type_code.forEach(v => {
          this.$set(this.houseClass, v.itemCode, v.itemDesc);
        });
        data.certificate_type_code.forEach((v) => {
        this.$set(this.certificateClass, v.itemCode, v.itemDesc);
      });
      })
      .catch(err => {
        this.confirmFn(err.message);
      });
  },
  computed: {
    ...mapGetters(['openVideo'])
  },
  components: {
    houseMessage,
    addGuarantor
  }
};
</script>

<style lang="less">
  #house-table {
    position: relative;
    .button.add__btn {
      position: absolute;
      right: 1%;
      top: -34px;
      line-height: 30px;
      font-size: 14px;
      padding: 0 12px;
      background: #538bf1;
      border-radius: 3px;
      color: #fff;
      .icon__add {
        padding-right: 8px;
        font-size: 20px;
        font-weight: 900;
      }
      .icon {
        display: inline-block;
        vertical-align: top;
      }
    }
    .tab-box {
      height: 40px;
      padding-left: 20px;
      border: 1px solid #e9e9e9;
      border-bottom: none;
      .el-tabs__nav-wrap {
        padding: 0;
        background: none;
        .el-tabs__nav {
          height: 40px;
        }
      }
      .el-tabs__item {
        font-size: 14px;
      }
      .el-tabs__content{
        overflow: visible;
      }
    }
    .dialog__table-box {
      table {
        width: 100%;
        border: 1px solid #e9e9e9;
        text-align: center;
        th {
          height: 60px;
          background: #F5F5F5;
          line-height: 20px;
          color: #666;
          min-width: 80px;
          border-bottom: 1px solid #d0d0d0;
          font-size: 12px;
          vertical-align: middle;
        }
        td {
          font-size: 14px;
          vertical-align: middle;
          height: 60px;
        }
      }
    }
  }
</style>
