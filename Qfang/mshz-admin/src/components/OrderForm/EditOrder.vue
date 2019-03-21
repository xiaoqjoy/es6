<template>
  <section class="add-orders">
    <el-dialog title="修改订单" :visible="true" :before-close="handleClose" width="950px" :close-on-click-modal="false">
      <div class="dialog-box bgceee">
        <el-form ref="editOrderForm" :model="myDetailData" :rules="rules" size="mini" label-position="right" label-width="90px">
          <div class="model-border">
            <header class="model-header">
              <el-row>
                <el-col :span="12">
                  <span>订单信息</span>
                </el-col>
                <el-col :span="12">
                  <span class="float-r" style="color:red">{{detailData.orderStateDesc}}</span>
                </el-col>
              </el-row>
            </header>
            <div class="pdt-20">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="订单号：">
                    <el-input :disabled="true" v-model="myDetailData.orderNo"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="订单来源：" prop="orderChannel">
                    <el-select :disabled="/民宿/.test(myDetailData.orderChannelDesc)?true:false" @change="changeOrderChannel" placeholder="请选择" v-model="myDetailData.orderChannelDesc" clearable>
                      <el-option :disabled="/民宿/.test(val)?true:false" v-for="(val,key)  in orderChannelEnum" :key="key" :label="val" :value="val">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item v-if="(/民宿|线下/g).test(myDetailData.orderChannelDesc)?false:true" :label="myDetailData.orderChannelDesc+'订单号：'" prop="orderNo" label-width="100px">
                    <el-input v-model="myDetailData.channelNo" :disabled="isEdit" :minlength="10" :maxlength="14"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="model-border">
            <header class="model-header">房间信息</header>
            <div class="pdt-20">
              <el-row :gutter="10">
                <el-col :span="5">
                  <el-popover @show="roomNoObj={}" @hide="cancelChangeRoomId" ref="roomNoPopover" placement="bottom-start" width="600" v-model="roomNoPopoverVisible">
                    <el-row :gutter="10" style="width:600px;height:100px;padding:20px 20px 0px 20px;line-height:30px;">
                      <el-col :span="10">
                        楼盘：
                        <el-autocomplete v-model="roomNoObj.gardenName" @select="getGardenData" :fetch-suggestions="getAvailableGardenData" :placeholder="this.myDetailData.gardenName" size="mini">
                        </el-autocomplete>
                      </el-col>

                      <el-col :span="7">
                        楼栋：
                        <el-select v-model="roomNoObj.buildingName" :placeholder="this.myDetailData.buildingName" @change="getRoomNoData" clearable size="mini">
                          <el-option v-for="(item, index) in buildingOptions" :key="index" :label="item.buildingName" :value="item.buildingName">
                          </el-option>
                        </el-select>
                      </el-col>

                      <el-col :span="7">
                        房间号：
                        <el-select v-model="roomNoObj.roomNo" :placeholder="this.myDetailData.roomNo" @change="selectedRoomNo" clearable size="mini">
                          <el-option v-for="(item, index) in roomNoOptions" :key="index" :label="item.number" :value="item.number">
                          </el-option>
                        </el-select>
                      </el-col>
                    </el-row>

                    <div style="text-align: right; margin-right: 20px" class="pdb-20">
                      <el-button type="primary" size="mini" @click="confirmChangeRoomId">确定</el-button>
                      <el-button size="mini" @click="cancelChangeRoomId">取消</el-button>
                    </div>
                  </el-popover>
                  <el-form-item label="房间：" prop="roomNo" @click="roomNoObj={}">
                    <el-input readonly v-popover:roomNoPopover v-model="myDetailData.roomNo"> </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="日期：" label-width="60px" prop="orderCreatTime">
                    <input :disabled="isCalendar" class="date-input" type="text" @click="openByDrop($event)" v-model="calendar.display" readonly>
                    <transition name="fade">
                      <div class="calendar-dropdown" :style="{'left':calendar.left+'px','top':calendar.top+'px'}" v-if="calendar.show">
                        <calendar :range="calendar.range" :fixedStart="calendar.fixedStart" :events="calendar.events" :zero="calendar.zero" :lunar="calendar.lunar" :value="calendar.value" @select="calendar.select" :begin="calendar.begin" :end="calendar.end"></calendar>
                      </div>
                    </transition>
                  </el-form-item>

                </el-col>
                <el-col :span="5">
                  <el-form-item label="天数：" prop="bookedDays" label-width="60px">
                    <el-input-number :disabled="isEdit" v-model.number="myDetailData.bookedDays" @change="changeDayCount" :min="1" :max="this.bookDayCount" label="天数"></el-input-number>
                  </el-form-item>
                </el-col>
                <el-col :span="6" class="pdl-20">
                  <el-form-item label="房费：">
                    <el-input :disabled="true" placeholder="房费" v-model.number="myDetailData.roomRate">
                      <template slot="append">元</template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="model-border">
            <header class="model-header">
              <el-row>
                <el-col :span="12">
                  <span>住客信息</span>
                </el-col>
                <el-col :span="12">
                  <div class="float-r" @click="addCustomer">
                    <el-button type="text" size="mini">
                      <i class="icon iconfont icon-tianjia font-14"></i>
                      添加
                    </el-button>
                  </div>
                </el-col>
              </el-row>
            </header>
            <div class="pdt-20 pdr-20">
              <el-row :gutter="20" v-if="custModel.recordState!=='DELETED'" v-for="(custModel, index) in myDetailData.custFormList" :key="index">
                <el-col :span="6">
                  <div @keyup="myGetIndex(index)">
                    <el-form-item label="姓名：" :prop="'custFormList.' + index + '.custName'" :rules="[{ required: true, message: '姓名不能为空', trigger: 'change'},
                    { min: 2, max: 12, message: ' 长度在 2 到 12 个字符 ', trigger: 'change'}]">
                      <!-- <el-input :disabled="isEdit" v-model="custModel.custName" :minlength="2" :maxlength="5"></el-input> -->
                      <el-autocomplete :disabled="isEdit" v-model="custModel.custName" :fetch-suggestions="querySearchLodger" :trigger-on-focus="false" popper-class="cust-name" placeholder="请输入内容" @select="selectCutName" :index="index">
                        <template slot-scope="props">
                          <div class="name-list">
                            <!-- {{props.item.value }} -->
                            <span v-html="props.item.name"></span> (
                            <span class="c-9">{{props.item.hideIdcard}}</span>
                            <span class="c-9">{{props.item.phone}}</span>)
                          </div>
                        </template>
                      </el-autocomplete>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="身份证：" :prop="'custFormList.' + index + '.custIdCard'" :rules="[{ required: true, message: '身份证号码不能为空', trigger: 'blur'},{ pattern: /^(\d{18}$|^\d{17}(\d|X|x))$/, message: '请输入18位身份证号', trigger: 'blur' }]">
                    <el-input :disabled="isEdit" v-model="custModel.custIdCard" :minlength="18" :maxlength="18"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="手机：" :prop=" 'custFormList.' + index + '.custPhone'" :rules="[{ required: true, message: '手机号码不能为空', trigger: 'blur'},{ pattern: /^1(3|4|5|6|7|8|9)\d{9}$/, message: '手机号码为11位有效数字', trigger: 'blur' }]">
                    <el-input :disabled="isEdit" v-model.number="custModel.custPhone" :minlength="11" :maxlength="11"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="3" v-if="index !==0">
                  <el-button type="primary" size="mini" icon="el-icon-delete" @click="deleteCustomer(index)"></el-button>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="model-border">
            <header class="model-header">
              <el-row>
                <el-col :span="12">
                  <span>收款信息</span>
                </el-col>
                <el-col :span="12">
                  <el-popover ref="addFundsInfo" placement="bottom" width="60" v-model="fundsTypeVisible">
                    <div style="text-align: center; margin: 0">
                      <el-button v-if="!isDeposit" type="text" size="mini" @click="addFundsModel('押金')">押金</el-button>
                    </div>
                    <div style="text-align: center; margin: 0">
                      <el-button type="text" size="mini" @click="addFundsModel('其他')">其他</el-button>
                    </div>
                  </el-popover>
                  <div class="float-r">
                    <el-button type="text" size="mini" v-popover:addFundsInfo>
                      <i class="icon iconfont icon-tianjia font-14"></i>
                      添加</el-button>
                  </div>
                </el-col>
              </el-row>
            </header>
            <div class="pdt-20">
              <div>
                <el-row :gutter="20" v-if="fundsModel.recordState!=='DELETED'" v-for="(fundsModel, index) in myDetailData.fundsFormList" :key="index">
                  <el-col :span="10">
                    <el-form-item label-width="30px" label=" " :prop="'fundsFormList.' + index + '.itemName'" :rules="[{ required: true, message: '收款类型名称不能为空', trigger: 'blur'}]">
                      <el-input :disabled="fundsModel.id!==''||fundsModel.itemType!=='OTHER'" placeholder="请输入收款金额类型" v-model="fundsModel.itemName" :minlength="2" :maxlength="10">
                        <template v-if="fundsModel.itemType==='ROOM_RATE'&&fundsModel.id!==''" slot="suffix">({{fundsModel.remark}})</template>
                        <template v-if="fundsModel.itemType==='ROOM_RATE'&&fundsModel.id===''" slot="suffix">({{roomRateRemark}})</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label-width="60px" label="金额：" :prop="'fundsFormList.' + index + '.itemMoney'" :rules="[{ required: true, message: '收款金额不能为空', trigger: 'blur'},
                    { type: 'number', message: '收款金额必须为数字值'},
                    { pattern: /(^(-)?[1-9](\d+)?(\.\d{1,2})?$)|(^(-)?\d\.\d{1,2}?$)/, message: '整数或最多两位小数', trigger: 'blur' }]">
                      <el-input :disabled="fundsModel.id!==''||fundsModel.itemType==='ROOM_RATE'" placeholder="请输入收款金额" v-model.number="fundsModel.itemMoney" :minlength="1" :maxlength="6">
                        <template slot="append">元</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item v-if="fundsModel.itemMoney>0 || fundsModel.itemType!=='ROOM_RATE'" label="支付渠道：" :prop="'fundsFormList.' + index + '.payChannel'" :rules="{ required: true, message: '请选择支付渠道', trigger: 'change' }" label-width="100px">
                      <el-select :disabled="fundsModel.disablePayChannel" placeholder="请选择" @change="changePayChannel(fundsModel.payChannelDesc,index)" v-model="fundsModel.payChannelDesc">
                        <el-option v-for="(val, key) in payChannelEnum" :key="key" :label="val" :value="key"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="3" v-if="fundsModel.itemType!=='ROOM_RATE'&&fundsModel.id===''">
                    <el-button type="primary" size="mini" icon="el-icon-delete" @click="deleteFundsModel(index)"></el-button>
                  </el-col>
                </el-row>
              </div>

              <div class="funds-info pdr-20 pdb-20">
                <p class="funds-info-item">
                  订单金额：
                  <span class="font-red font-w">{{this.orderPrice}}</span>
                  元
                </p>
                <p class="funds-info-item">
                  押金：
                  <span class="font-red font-w">{{myDeposit===0?'无':myDeposit}}</span> {{myDeposit===0?'':'元'}}
                </p>
                <p class="funds-info-item">
                  已收金额：
                  <span class="font-red">{{this.amountReceived}}</span>
                  元
                </p>
                <p class="funds-info-item">
                  <span>{{refund>=0?'应退金额：':'未收金额：'}}</span>
                  <span v-if="refund>=0" class="font-red">{{Math.abs(amountReceived - orderPrice).toFixed(2)}}</span>
                  <span v-else class="font-red">{{Math.abs(refund)}}</span>
                  元
                </p>
              </div>

            </div>
          </div>
          <div class="model-border">
            <header class="model-header">订单备注
              <span class="font-default">(300字内)</span>
            </header>
            <div class="my-remark">
              <el-input type="textarea" :maxlength="300" :autosize="{ minRows: 2}" placeholder="请输入要备注的内容" v-model="myDetailData.remark">
              </el-input>
            </div>
          </div>
        </el-form>

      </div>
      <div class="dialog-footer">
        <el-button type="primary" size="mini" @click="save('editOrderForm')">保存</el-button>
        <el-button size="mini" @click="handleClose">取消</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>

import Calendar from '../Calendar/calendar.vue';

export default {
  components: {
    'calendar': Calendar
  },

  props: ['detailData', 'isMiddle'],

  data() {
    const today = (new Date()).toLocaleDateString();
    const endOrderDay = this.transferCouponValueTime(today, 90);
    const begin = today.split('/');
    const end = endOrderDay.split('-');

    return {
      canUseCashFlag: true,
      canUseCash: 0,
      bookDayCount: 90,
      roomNoObj: {},
      buildingOptions: [],
      roomNoOptions: [],
      roomNoPopoverVisible: false,
      rules: {
        orderNo: [
          { required: true, message: '请输入订单号', trigger: 'blur' },
          { min: 10, max: 14, message: '长度在 10 到 14 个字符', trigger: 'blur' }
        ],
        orderChannel: [
          { required: true, message: '请选择订单渠道', trigger: 'change' }
        ],
        roomNo: [
          { required: true, message: '请选择房间号', trigger: 'change' }
        ],
        bookedDays: [
          { required: true, message: '可预定天数为1到90', trigger: 'blur' }
        ],
        custName: [
          { required: true, message: '请输入姓名', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        idCard: [
          { required: true, message: '请输入身份证号码', trigger: 'blur' },
          { pattern: /^(\d{18}$|^\d{17}(\d|X|x))$/, message: '请输入18位身份证号', trigger: 'blur' }
        ]
      },

      orderChannelEnum: {},
      payChannelEnum: {},
      myDetailData: {},
      isEdit: false, // true为开启disabled
      calendar: {
        display: '',
        show: false,
        range: true,
        fixedStart: false, // 价格日历是否可以选择起始时间
        zero: true,
        value: [['2018', '01', '01'], ['2018', '01', '02']], // 默认日期
        lunar: true, // 显示农历
        events: {
        },
        begin, // 可选开始日期
        end, // 可选结束日期
        select: (begin, end) => {
          // console.log(begin, end, '开始和结束日期');
          // console.log(this.calendar.events, 'this.calendar.events');
          this.bookDayCount = 90;
          // 开始和结束日期不能相同，他们之间也不能包含 不可预定房间的日期
          if (begin.join('-') !== end.join('-') && Object.entries(this.calendar.events).length > 0) {
            // if (this.calendar.events[begin.join('-')].disabled || this.calendar.events[end.join('-')].disabled) {
            //   return;
            // }
            this.calendar.show = false;

            this.calendar.value = [begin, end];

            this.calendar.display = begin.join('-') + '至' + end.join('-');

            this.myDetailData.startTime = begin.join('-');
            this.myDetailData.endTime = end.join('-');

            if (this.eventsArr.length > 0) {
              this.eventsArr.forEach((val, key) => {
                if (val[0] === begin.join('-')) {
                  this.startKey = key;
                }
                if (val[0] === end.join('-')) {
                  this.endKey = key;
                }
              });
            }
            // this.eventsArr.slice(this.startKey, this.endKey + 1).

            this.rateArr = this.eventsArr.slice(this.startKey, this.endKey).map((val) => {
              return val[1].price;
            });

            this.myDetailData.roomRate = +this.rateArr.reduce((x, y) => x + y).toFixed(2);

            this.myDetailData.bookedDays = this.rateArr.length;

            // console.log(this.myDetailData.bookedDays, '预定天数');

            this.newAddRoomRate();
          }
        }
      },
      roomRate: 0,
      eventsArr: [],
      rateArr: [],
      rateOldArr: [],
      startKey: 0,
      endKey: 0,
      arr: [],
      // dateObj: {},
      fundsTypeVisible: false,
      isCalendar: false,
      isDeposit: false, // 收款信息 是否 有删除押金的按钮
      changeRoomIdFlag: false,
      changeDateFlag: false,
      addRoomRateFlag: false, // 收款信息是否有  新增的房费项
      newRoomRateIndex: 0, // 收款信息 新增的 房费项 位置
      roomRateNew: 0, // 收款信息 新增的 房费项 money值
      paidRoom: 0, // 已付房费
      custListIndex: ''
    };
  },

  computed: {

    // 房费备注
    roomRateRemark: {
      get() {
        let s = '';
        if (this.myDetailData.roomNo) {
          if (this.changeRoomIdFlag) {
            s = '换房间：';
          } else {
            s = '换日期：';
          }
          if (this.roomRateNew < 0) { // 是减少预定天数
            s += '退差价 ';
          } else {
            s += '补差价 ';
          }
          s += this.myDetailData.roomNo + '房';// + this.dateRange(); // this.myDetailData.startTime.substring(5, 10) + '至' + this.myDetailData.endTime.substring(5, 10);
        }
        return s;
      }
    },

    // 订单金额
    orderPrice: {
      get() {
        let allMoney = 0;
        if (this.myDetailData.fundsFormList) {
          this.myDetailData.fundsFormList.forEach((val, key) => {
            if (val.itemType !== 'DEPOSIT' && val.recordState !== 'DELETED') {
              allMoney += val.itemMoney;
            }
          });
        }
        return (+allMoney).toFixed(2); // 转为Number类型
      }
    },

    // 押金
    myDeposit: {
      get() {
        let deposit = 0;
        // this.detailData.fundsModelList ===> this.myDetailData.fundsFormList 080228
        if (this.myDetailData.fundsFormList) {
          this.myDetailData.fundsFormList.forEach((val, key) => {
            if (val.itemType === 'DEPOSIT') {
              deposit = val.itemMoney;
              this.depositFlag = true;
            }
          });
        }
        return (+deposit).toFixed(2);
      }
    },

    // 已收金额
    amountReceived: {
      get() {
        let allMoney = 0;
        if (this.myDetailData.fundsFormList) {
          this.myDetailData.fundsFormList.forEach((val, key) => {
            if (val.payChannel !== 'NONE' && val.itemMoney > 0) {
              allMoney += val.itemMoney;
            }
          });
        }
        // if (roomRate <= this.canUseCash && this.canUseCashFlag) {
        //   roomRate = this.canUseCash;
        // }
        return (+allMoney).toFixed(2);
      }
    },

    // 大于0为退款 小于0为未收金额
    refund: {
      get() {
        return (this.amountReceived - this.orderPrice - this.myDeposit).toFixed(2);
      }
    }
  },

  mounted() {
    // 处理初始化表单数据
    this.handleDetailData();
    // 获取页面需要的下拉枚举数据
    this.getSelectEnum();
  },

  methods: {

    checkIfPaid() {
      let rateCash = 0;
      this.myDetailData.fundsFormList.forEach((item) => {
        if (item.itemType === 'ROOM_RATE' && item.payChannel !== 'NONE') {
          rateCash += item.itemMoney;
        }
      });
      return rateCash > 0;
    },

    dateRange() {
      const orderState = this.myDetailData.orderState;
      let today = (new Date()).toLocaleDateString().replace(/\//g, '-');
      today = this.transferCouponValueTime(today, 0);
      if (orderState === 'BOOKED') {  // 只要是预定状态， 新增项的房费日期备注
        return this.myDetailData.startTime.substring(5, 10) + '至' + this.myDetailData.endTime.substring(5, 10);
      } else {
        if (orderState === 'CHECKED' && this.changeRoomIdFlag) { // 入住，并且换房间时，判断 新增项的房费日期备注
          return today.substring(5, 10) + '至' + this.myDetailData.endTime.substring(5, 10);
        } else { // 入住，并且没换房间时，判断 新增项的房费日期备注
          let tmp = this.detailData.bookedDays - this.myDetailData.bookedDays;
          if (tmp > 0) {   // 日期缩短
            return this.myDetailData.endTime.substring(5, 10) + '至' + this.detailData.endTime.substring(5, 10);
          } else { // 日期增加
            return this.detailData.endTime.substring(5, 10) + '至' + this.myDetailData.endTime.substring(5, 10);
          }
        }
      }
    },

    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
      };
    },

    // 点击楼盘输入框时，请求楼盘数据
    getAvailableGardenData(queryString, cb) {
      this.$axios.get('security/room/manage/searchAvailableGarden', {
        params: { searchName: '', startTime: this.myDetailData.startTime, endTime: this.myDetailData.endTime }
      })
        .then((res) => {
          res.data.result.forEach((item) => {
            item.value = item.gardenName;
          });
          this.restaurants = res.data.result;
          var restaurants = this.restaurants;
          var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
          // 调用 callback 返回建议列表的数据
          cb(results);
          // console.log(results);
        });
    },

    // 选中楼盘时，请求楼栋数据
    getGardenData(garden) {
      this.roomNoObj.gardenName = garden.gardenName;

      this.$axios.get('security/room/manage/searchAvailableBuilding', {
        params: {
          searchName: '',
          gardenName: garden.gardenName,
          startTime: this.myDetailData.startTime,
          endTime: this.myDetailData.endTime
        }
      })
        .then((res) => {
          if (res.data.status === 'C0000') {
            this.buildingOptions = res.data.result;
          } else {
            this.$message({
              message: res.data.message,
              type: 'error'
            });
          }
        });
    },

    // 选中楼栋时，请求房号数据
    getRoomNoData(building) {
      this.roomNoObj.buildingName = building;
      this.$axios.get('security/room/manage/searchAvailableNumber', {
        params: {
          searchName: '',
          gardenName: this.roomNoObj.gardenName,
          buildingName: building,
          startTime: this.myDetailData.startTime,
          endTime: this.myDetailData.endTime
        }
      })
        .then((res) => {
          if (res.data.status === 'C0000') {
            this.roomNoOptions = res.data.result;
          } else {
            this.$message({
              message: res.data.message,
              type: 'error'
            });
          }
        });
    },

    // 选中房间号时
    selectedRoomNo(roomNo) {
      this.roomNoObj.roomNo = roomNo;

      this.roomNoOptions.forEach((item) => {
        if (item.number === roomNo) {
          this.roomNoObj.roomId = item.roomId;
        }
      });
    },

    // 选房间号取消按钮
    cancelChangeRoomId() {
      this.roomNoPopoverVisible = false;
    },

    // 选中房间号确认按钮，请求房号对应的价格日历
    confirmChangeRoomId() {
      if (this.myDetailData.orderState === 'CHECKED') {
        // 若 改变了房间，那么“入住”订单的 预定起始日期 变为今天
        let today = (new Date()).toLocaleDateString().replace(/\//g, '-');
        today = this.transferCouponValueTime(today, 0);
        this.calendar.value = [today.split('-'), this.calendar.value[1]];
        this.calendar.display = today + '至' + this.calendar.value[1].join('-');
        this.myDetailData.startTime = today;
      }

      this.roomNoPopoverVisible = false;
      this.bookDayCount = 90;
      const data = this.myDetailData;
      const roomNoObj = this.roomNoObj;
      if (!roomNoObj.roomId) {
        return;
      }
      data.gardenName = roomNoObj.gardenName;
      data.buildingName = roomNoObj.buildingName;
      data.roomNo = roomNoObj.roomNo;
      data.roomId = roomNoObj.roomId;

      this.getEveryDayPrice(this.myDetailData.roomId);
      // 换房间号时，重置支付状态
      this.myDetailData.fundsFormList.forEach((item) => {
        if (item.itemType === 'ROOM_RATE' && item.id === '') {
          item.payChannel = 'NONE';
          item.payChannelDesc = '未支付';
        }
      });
    },

    // 获取页面需要的下拉枚举数据
    getSelectEnum() {
      this.$axios.get('security/order/getAllEnum')
        .then((res) => {
          const { result } = res.data;
          if (res.data.status === 'C0000') {
            this.payChannelEnum = result.PayChannelEnum;
            this.orderChannelEnum = result.OrderChannelEnum;
          } else {
            this.$message({
              message: res.data.message,
              type: 'error'
            });
          }
        });
    },

    // 处理初始化表单数据
    handleDetailData() {
      this.myDetailData = JSON.parse(JSON.stringify(this.detailData)); // 不修改父组件的对象
      // console.log(this.myDetailData);
      // 如果已入住，日期插件的起始值不可改
      if (this.myDetailData.orderStateDesc === '已入住') {
        this.$set(this.calendar, 'fixedStart', true);
      }

      // 收款信息的 下拉添加按钮 是否有押金选项
      this.myDetailData.fundsModelList.forEach((item) => {
        if (item.itemType === 'DEPOSIT' && item.itemMoney !== 0) {
          this.isDeposit = true;// 收款信息 是否 有删除押金的按钮
        };
        if (item.payChannel !== 'NONE') {
          item.disablePayChannel = true; // 如果请求的数据 支付状态是未支付, 那么支付方式 可以改，保存提交后才不可选择
        }
        if (item.itemType === 'ROOM_RATE' && item.payChannel !== 'NONE') {
          // 计算已付房费
          this.paidRoom += item.itemMoney;
        }
      });

      // 新建2个后台需要的数组 fundsFormList custFormList
      const fundsModelList = this.myDetailData.fundsModelList.slice(0, this.myDetailData.fundsModelList.length);
      this.myDetailData = Object.assign({}, this.myDetailData, {
        fundsFormList: fundsModelList,
        fundsModelList: ''
      });

      const custModelList = this.myDetailData.custModelList.slice(0, this.myDetailData.custModelList.length);
      this.myDetailData = Object.assign({}, this.myDetailData, {
        custFormList: custModelList,
        custModelList: ''
      });

      // 找到第一个不是房费的收款项下标,为了新增房费类型时插入
      const fundsFormListLen = this.myDetailData.fundsFormList.length;
      for (let i = 0; i < fundsFormListLen; i++) {
        if (this.myDetailData.fundsFormList[i].itemType !== 'ROOM_RATE') {
          this.newRoomRateIndex = i;
          break;
        } else {
          this.newRoomRateIndex = fundsFormListLen;
        }
      }

      // let allCanUseCash = 0;
      // this.detailData.fundsModelList.forEach((item) => {
      //   if (item.itemType === 'ROOM_RATE' && item.payChannel !== 'NONE') {
      //     allCanUseCash += item.itemMoney;
      //   }
      // });

      // this.canUseCash = this.detailData.orderPrice - this.detailData.usedCash;
      // this.myDetailData.usedCash 当前已使用的金额，
      this.canUseCash = this.paidRoom - this.myDetailData.usedCash;
      if (this.canUseCash <= 0) {
        this.canUseCashFlag = false;
      }

      // console.log(this.canUseCash, this.canUseCashFlag, '修改订单，房费减少时，需要用到这个 未消耗 房费');

      // this.roomRate = this.myDetailData.roomRate;

      // 设置日期默认展示的值
      this.$set(this.calendar, 'display', this.myDetailData.startTime + '至' + this.myDetailData.endTime);

      // 设置 日期弹出框 默认选中的日期
      let startTimeList = this.myDetailData.startTime.split('-');
      let endTimeList = this.myDetailData.endTime.split('-');
      this.$set(this.calendar, 'value', [startTimeList, endTimeList]);

      // 检测是否已超入住时间，但还没到结束时间
      // let MSnowTime = new Date().getTime();
      // let MSstartTime = (new Date(+startTimeList[0], (+startTimeList[1] - 1), +startTimeList[2], 14, 0, 0)).getTime();
      // let MSLastTime = (new Date(+endTimeList[0], (+endTimeList[1] - 1), +endTimeList[2], 12, 0, 0)).getTime();
      // if (MSnowTime > MSstartTime && MSnowTime < MSLastTime) {
      //   this.isMiddle = true;
      //   this.$set(this.calendar, 'fixedStart', true);
      //   console.log('------------超了，但还没到');
      // } else {
      //   this.isMiddle = false;
      // }
      if (this.isMiddle) {
        this.$set(this.calendar, 'fixedStart', true);
      }

      // 获取价格日历数据
      this.getEveryDayPrice(this.detailData.roomId, this.detailData.orderNo);
    },

    // 创建计算房费的数组
    initRateArr() {
      // 确定 订单详情的预定开始和结束日期 在 价格日历中的下标, 是为了天数的 +  - 按钮做房费计算使用
      this.eventsArr = Object.entries(this.calendar.events);

      this.eventsArr.forEach((val, key) => {
        if (new Date(val[0]).toString() === (new Date(this.myDetailData.startTime)).toString()) {
          this.startKey = key;
        }
        if (new Date(val[0]).toString() === (new Date(this.myDetailData.endTime)).toString()) {
          this.endKey = key;
        }
      });

      if (this.detailData.roomId === this.myDetailData.roomId) {
        this.rateOldArr = this.eventsArr.slice(this.startKey, this.endKey);
      }

      this.rateArr = this.eventsArr.slice(this.startKey, this.endKey).map((val) => {
        return val[1].price;
      });
      // console.log(this.rateArr);
      this.myDetailData.roomRate = +this.rateArr.reduce((x, y) => x + y).toFixed(2);

      this.newAddRoomRate();
    },

    // 创建 calendar.events 对象
    initEventsObj(dateObj) {
      let tempArr = [];

      // 创建 calendar.events 对象
      Object.values(dateObj).forEach((val) => {
        tempArr = tempArr.concat(val);
      });

      const left = Number(new Date(this.detailData.startTime));
      const right = Number(new Date(this.detailData.endTime));

      tempArr.forEach((val) => {
        this.$set(this.calendar.events, val.date, val);

        const time = Number(new Date(val.date));

        if (val.status === 'VALID' || (left <= time && time <= right)) { // left <= time <= right 因为接口返回来的数据是预定的，所以改为可点
          this.$set(this.calendar.events[val.date], 'disabled', false);

          // 如果房费改了，把历史订单房费 覆盖最新价格日历房费
          if (left <= time && time <= right && this.calendar.events[val.date].orderPrice > 0) {
            this.$set(this.calendar.events[val.date], 'price', this.calendar.events[val.date].orderPrice);
          }
        } else {
          this.$set(this.calendar.events[val.date], 'disabled', true);
        }
      });
      // console.log(this.calendar.events, 'this.calendar.events');
      this.initRateArr();
    },

    // 获取价格日历数据
    getEveryDayPrice(roomId, orderNo) {
      let today = (new Date()).toLocaleDateString().replace(/\//g, '-');
      today = this.transferCouponValueTime(today, 0);

      if (this.myDetailData.orderState === 'CHECKED' || this.isMiddle) {
        today = this.myDetailData.startTime;
      }
      // console.log(today);
      const params = {
        startDate: today,
        endDate: this.transferCouponValueTime(today, 90),
        roomId: roomId,
        orderNo: orderNo || ''
      };

      this.$axios.get('security/room/price/calendarEveryDay', { params })
        .then((res) => {
          if (res.data.status === 'C0000') {
            this.dateObj = res.data.result.map;

            this.initEventsObj(this.dateObj);
          } else {
            this.$message({
              message: res.data.message,
              type: 'error'
            });
          }
        });
    },

    // 按 换房或者改预定日期 新增 房费收款信息，并计算
    newAddRoomRate() {
      // 换日期
      this.changeDateFlag = this.calendar.display !== this.detailData.startTime + '至' + this.detailData.endTime;
      // 换房
      this.changeRoomIdFlag = this.myDetailData.roomId !== this.detailData.roomId;

      // 换了房间或者预定日期，但是未增加过房费项
      if ((this.changeDateFlag || this.changeRoomIdFlag) && !this.addRoomRateFlag) {
        if (this.myDetailData.orderState === 'BOOKED' || this.myDetailData.orderState === 'CHECKED') { // 若预定 入住修改订单后 有未支付的 那么全部删除未支付的
          this.myDetailData.fundsFormList.forEach((item) => {
            if (item.payChannel === 'NONE' && item.itemType === 'ROOM_RATE') {
              item.recordState = 'DELETED';
              this.hadDeletedBooked = true;
            }
          });
        }
        // 增加房费项
        this.addFundsModel('房费');
        this.addRoomRateFlag = true;
      }

      // 已经增加过房费项
      if (this.addRoomRateFlag) {
        // 恢复初始预定日期时，删除新增的 房费项
        if (!this.changeRoomIdFlag && !this.changeDateFlag) {
          if (!this.hadDeletedBooked) {
            this.deleteFundsModel(this.newRoomRateIndex);
            this.addRoomRateFlag = false;
            return;
          }
        }
        // 计算费用
        if (this.canUseCash > 0) { // 有已支付的房费
          this.roomRateNew = this.myDetailData.roomRate - this.paidRoom;
          // this.roomRateNew = this.myDetailData.roomRate - this.detailData.roomRate;
          // if (this.myDetailData.usedCash > 0) { // 入住，并且房费已抵扣
          // } else { // 有已支付的房费，房费 未抵扣过
          //   let oldRoomRate = 0;
          //   this.myDetailData.fundsFormList.forEach((item) => {
          //     if (item.itemType === 'ROOM_RATE' && item.payChannel !== 'NONE' && item.disablePayChannel) {
          //       oldRoomRate += item.itemMoney;
          //     }
          //   });
          //   this.roomRateNew = this.myDetailData.roomRate - oldRoomRate;
          // }
        } else { // 没有支付过房费
          this.roomRateNew = this.myDetailData.roomRate;
        }
        const payType = this.roomRateNew >= 0 ? 'INCOME' : 'EXPENDITURE';

        const tmp = +this.roomRateNew.toFixed(2);
        this.$set(this.myDetailData.fundsFormList[this.newRoomRateIndex], 'itemMoney', tmp);
        this.$set(this.myDetailData.fundsFormList[this.newRoomRateIndex], 'payType', payType);
        this.$set(this.myDetailData.fundsFormList[this.newRoomRateIndex], 'disablePayChannel', payType === 'EXPENDITURE');

        // 如果 新增的收款项 金额为0，那么该项的记录状态 改为删除，否则为null
        if (tmp === 0) {
          this.$set(this.myDetailData.fundsFormList[this.newRoomRateIndex], 'recordState', 'DELETED');
        } else {
          this.$set(this.myDetailData.fundsFormList[this.newRoomRateIndex], 'recordState', null);
        }
      }
    },

    // 点击加减按钮改变顾客住的天数
    changeDayCount(val) {
      const len = this.rateArr.length;

      if (val > len) { // 增加天数
        if (val - 1 === len) { // 使用“+”按钮 增加天数
          this.endKey += 1;
          const nextDayRate = this.eventsArr[this.endKey - 1][1].price;
          this.rateArr.push(nextDayRate);
        } else { // 手动输入，增加了天数
          const addCount = val - this.myDetailData.bookedDays;
          this.endKey += addCount;

          this.rateArr = this.eventsArr.slice(this.startKey, this.endKey).map((val) => {
            return val[1].price;
          });
        }
      } else { // 减少天数
        if (val + 1 === len) { // 使用“-”按钮 减少天数
          this.rateArr.pop();
          this.endKey -= 1;
        } else { // 手动输入，减少了天数
          const reduceCount = this.myDetailData.bookedDays - val;
          this.endKey -= reduceCount;

          this.rateArr = this.eventsArr.slice(this.startKey, this.endKey).map((val) => {
            return val[1].price;
          });
        }
      }

      // 确定最大可预订天数
      let endDisableKey = 0;
      const firstDisableArr = this.eventsArr.slice(this.startKey, this.eventsArr.length);
      for (let i = 0; i < firstDisableArr.length; i++) {
        if (firstDisableArr[i][1].disabled === true) {
          endDisableKey = i;
          break;
        }
      }

      if (endDisableKey === 0) {
        endDisableKey = firstDisableArr.length - 1;
      }

      if (this.rateArr.length > endDisableKey) {
        this.endKey = this.startKey + endDisableKey;
        this.rateArr = this.eventsArr.slice(this.startKey, this.endKey).map((val) => {
          return val[1].price;
        });
        this.$message({
          message: '已经到最大可预订天数',
          type: 'error'
        });
        this.bookDayCount = endDisableKey;
        return;
      }

      this.myDetailData.bookedDays = this.rateArr.length;

      this.$set(this.calendar, 'display', this.calendar.value[0].join('-') + '至' + this.eventsArr[this.endKey][0]);
      this.$set(this.calendar, 'value', [this.calendar.value[0], this.eventsArr[this.endKey][0].split('-')]);

      this.myDetailData.startTime = this.calendar.value[0].join('-');
      this.myDetailData.endTime = this.eventsArr[this.endKey][0];

      this.myDetailData.roomRate = +this.rateArr.reduce((x, y) => x + y).toFixed(2);

      this.newAddRoomRate();
    },

    // 取消 或者关闭 修改订单 弹窗
    handleClose() {
      this.addRoomRateFlag = false;
      this.$emit('closeEditOrder');
    },

    // 保存提交修改订单
    save(formName) {
      this.$refs[formName].validate(
        (valid) => {
          if (valid) {
            const params = JSON.parse(JSON.stringify(this.myDetailData));
            params.fundsFormList.forEach((item, index) => {
              item.payType = item.itemMoney > 0 ? 'INCOME' : 'EXPENDITURE';
              item.itemMoney = Math.abs(+item.itemMoney);
              if (item.id === '') {
                if (item.itemType === 'ROOM_RATE' && index === this.newRoomRateIndex) {
                  item.remark = this.roomRateRemark;
                  // if (item.itemMoney < 0) {
                  //   item.payChannel = 'ALIPAY';
                  //   item.payChannelDesc = '支付宝';
                  // }
                }
                // if (item.recordState === '') { // 后台接口 recordState不允许传 空字符串
                //   item.recordState = null;
                // }
              }
            });
            this.$axios.post('security/order/updateOrder', params)
              .then((res) => {
                if (res.data.status === 'C0000') {
                  this.$emit('closeEditOrder', 'success');

                  // 刷新 房态页面
                  let today = this.transferCouponValueTime((new Date()).toLocaleDateString(), 0);
                  if (today === params.startTime || today === this.detailData.startTime) {
                    this.$store.commit('handleRefreshHouseStatusS', true);
                  }
                  this.$store.commit('handleRefreshHouseStatusF', true);

                  this.addRoomRateFlag = false;
                  this.$message({
                    message: '修改订单成功',
                    type: 'success'
                  });
                } else {
                  this.$message({
                    message: '订单修改失败' + res.data.message,
                    type: 'error'
                  });
                };
              });
          } else {
            this.$message.error('订单修改失败');
          }
        });
    },

    // 增加住客
    addCustomer() {
      if (this.myDetailData.custFormList.length >= this.myDetailData.custCount) {
        this.$message.warning('住客人数超过了宜住人数了！');
        return;
      }
      this.myDetailData.custFormList.push({
        custName: '',
        custIdCard: '',
        custPhone: '',
        id: ''
      });
    },

    // 删除住客
    deleteCustomer(index) {
      // id 为空时代表当前记录为用户手工添加的
      if (this.myDetailData.custFormList[index].id === '' || !this.myDetailData.custFormList[index].id) {
        this.myDetailData.custFormList.splice(index, 1);
      } else {
        this.$set(this.myDetailData.custFormList[index], 'recordState', 'DELETED');
      }
    },

    // 增加收款信息选项
    addFundsModel(val) {
      if (val === '房费') {
        this.myDetailData.fundsFormList.splice(this.newRoomRateIndex, 0, {
          itemName: '房费',
          itemType: 'ROOM_RATE',
          itemMoney: 0,
          payChannel: 'NONE',
          payChannelDesc: '未支付',
          id: ''
        });

        return;
      }

      this.fundsTypeVisible = false;
      this.myDetailData.fundsFormList.push({
        itemName: val,
        itemType: val === '其他' ? 'OTHER' : 'DEPOSIT',
        itemMoney: 0,
        payChannel: 'NONE',
        payChannelDesc: '未支付',
        id: ''
      });
    },

    // 删除收款信息选项
    deleteFundsModel(index) {
      // id为空时,代表当前记录为用户手工添加的
      if (this.myDetailData.fundsFormList[index].id === '') {
        this.myDetailData.fundsFormList.splice(index, 1);
      } else {
        this.$set(this.myDetailData.fundsFormList[index], 'recordState', 'DELETED');
      }
    },
    // 价格日历 下拉弹窗
    openByDrop(e) {
      this.initEventsObj(this.dateObj);// 重新初始化

      this.calendar.show = true;
      this.calendar.left = e.target.offsetLeft + 0;
      this.calendar.top = e.target.offsetTop + 35;

      e.stopPropagation();
      window.setTimeout(() => {
        document.addEventListener('click', (e) => {
          this.calendar.show = false;
          document.removeEventListener('click', () => { }, false);
        }, false);
      }, 1000);
    },

    // 计算90天后的日期
    transferCouponValueTime(startDate, valueTime) {
      const date = new Date(startDate);
      const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + valueTime);
      const year2 = newDate.getFullYear();
      const month2 = newDate.getMonth() + 1 < 10 ? '0' + (newDate.getMonth() + 1) : newDate.getMonth() + 1;
      const day2 = newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate();
      return year2 + '-' + month2 + '-' + day2;
    },

    // 修改订单渠道
    changeOrderChannel(val) {
      this.$set(this.myDetailData, 'orderChannel', val);
    },

    // 修改支付渠道
    changePayChannel(val, index) {
      this.$set(this.myDetailData.fundsFormList[index], 'payChannel', val);
    },

    // 住客联想
    querySearchLodger(queryString, cb) {
      this.$axios.get(
        '/security/guest/queryGuestPage',
        {
          params: {
            keyword: queryString
          }
        }
      ).then((res) => {
        let resultList = [];
        if (res.data.status === 'C0000') {
          let { result } = res.data;
          // console.log(result);
          result.items.forEach((item) => {
            item.value = item.name;
            item.name = item.name.replace(new RegExp('(' + queryString + ')', 'ig'), '<mark>' + queryString + '</mark>');
            // item.name = item.name.replace(new RegExp('(' + queryString + ')', 'ig'), '<p>' + queryString + '</p>');
          });
          this.seachLodgerList = result.items;
          let seachLodgerList = this.seachLodgerList;
          resultList = queryString ? seachLodgerList.filter(this.createFilter(queryString)) : seachLodgerList;
          // 调用 callback 返回建议列表的数据
        }
        cb(resultList);
      }).catch((res) => {
        console.log(res);
      });
    },

    // 选择住客
    selectCutName(data) {
      if (this.custListIndex === '') {
        this.myDetailData.custFormList.forEach((item, idex) => {
          if (item.custName === data.value && item.custIdCard === '') {
            item.custPhone = data.phone;
            item.custIdCard = data.idcard;
          }
        });
      } else {
        this.myDetailData.custFormList[this.custListIndex].custName = data.value;
        this.myDetailData.custFormList[this.custListIndex].custPhone = data.phone;
        this.myDetailData.custFormList[this.custListIndex].custIdCard = data.idcard;
      }

      // console.log(this.myAddOrderData.custFormList);
    },

    myGetIndex(index) {
      this.custListIndex = index;
    }
  }
};
</script>
<style scoped>
/* el-select el-select--mini */
.date-input {
  width: 180px;
  height: 26px;
  border-radius: 4px;
  border: 1px solid #d8dce5;
  margin-right: 30px;
}
.funds-info {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 40px;
  line-height: 40px;
  border-top: 1px solid #dddddd;
}
.funds-info-item {
  margin-left: 10px;
}
/*transition*/
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease-in-out;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
  transform: translateY(-10px);
}

/*下拉框*/
.calendar-dropdown {
  z-index: 9999;
  background: #fff;
  position: absolute;
  left: 0;
  top: 0;
  width: 500px;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 2px;
}
.calendar-dropdown:before {
  position: absolute;
  left: 30px;
  top: -10px;
  content: "";
  border: 5px solid rgba(0, 0, 0, 0);
  border-bottom-color: #dedede;
}
.calendar-dropdown:after {
  position: absolute;
  left: 30px;
  top: -9px;
  content: "";
  border: 5px solid rgba(0, 0, 0, 0);
  border-bottom-color: #fff;
}

/*价格日期弹出框*/
.calendar-dialog {
  z-index: 9999;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}

.calendar-dialog-mask {
  background: rgba(255, 255, 255, 0.5);
  width: 100%;
  height: 100%;
}

.calendar-dialog-body {
  background: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 2px;
}
.my-remark>>>.el-textarea .el-textarea__inner {
  border: none;
}
</style>
  