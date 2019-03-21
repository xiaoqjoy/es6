<template>
  <section class="add-orders">
    <el-dialog title="新增订单" :visible="myAddOrder" :before-close="handleClose" width="950px" :close-on-click-modal="false">
      <div class="dialog-box bgceee">
        <el-form ref="addOrderForm" :model="myAddOrderData" :rules="rules" size="mini" label-position="right" label-width="80px">
          <div class="model-border">
            <header class="model-header">
              <el-row>
                <el-col :span="12">
                  <span>订单信息</span>
                </el-col>
              </el-row>
            </header>
            <div class="pdt-20 pdl-20">
              <el-row :gutter="20">

                <el-col :span="6">
                  <el-form-item label="订单渠道：" prop="orderChannel" label-width="90px">
                    <el-select @change="changeOrderChannel" placeholder="请选择" v-model="myAddOrderData.orderChannelDesc" clearable>
                      <el-option v-for="(val,key)  in orderChannelEnum" :key="key" :label="val" :value="val">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item v-if="(/民宿|线下/g).test(myAddOrderData.orderChannelDesc)?false:true" :label="myAddOrderData.orderChannelDesc+'订单号：'" prop="channelNo" label-width="140px">
                    <el-input v-model="myAddOrderData.channelNo" :disabled="false" :minlength="10" :maxlength="14"></el-input>
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
                  <el-popover popper-class="roomNoPopover" @show="roomNoObj={}" @hide="cancelChangeRoomId" ref="roomNoPopover" placement="bottom-start" width="600" v-model="roomNoPopoverVisible">
                    <el-row :gutter="10" style="width:600px;height:100px;padding:20px;">
                      <el-col :span="10">
                        楼盘：
                        <el-autocomplete v-model="roomNoObj.gardenName" @select="getGardenData" :fetch-suggestions="getAvailableGardenData" :placeholder="this.myAddOrderData.gardenName">
                        </el-autocomplete>
                      </el-col>

                      <el-col :span="7">
                        楼栋：
                        <el-select v-model="roomNoObj.buildingName" :placeholder="this.myAddOrderData.buildingName" @change="getRoomNoData" clearable>
                          <el-option v-for="(item, index) in buildingOptions" :key="index" :label="item.buildingName" :value="item.buildingName">
                          </el-option>
                        </el-select>
                      </el-col>

                      <el-col :span="7">
                        房间号：
                        <el-select v-model="roomNoObj.roomNo" :placeholder="this.myAddOrderData.roomNo" @change="selectedRoomNo" clearable>
                          <el-option v-for="(item, index) in roomNoOptions" :key="index" :label="item.number" :value="item.number">
                          </el-option>
                        </el-select>
                      </el-col>
                    </el-row>

                    <div style="text-align: right; margin-right: 20px">
                      <el-button type="primary" size="mini" @click="confirmChangeRoomId">确定</el-button>
                      <el-button size="mini" @click="cancelChangeRoomId">取消</el-button>
                    </div>
                  </el-popover>
                  <el-form-item label="房间：" prop="roomNo" @click="roomNoObj={}">
                    <el-input readonly v-popover:roomNoPopover v-model="myAddOrderData.roomNo"> </el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="7">
                  <el-form-item label="日期：" label-width="60px" prop="orderCreatTime">
                    <input :disabled="isCalendar" class="date-input" type="text" @click="openByDrop($event)" v-model="calendar3.display" readonly>
                    <transition name="fade">
                      <div class="calendar-dropdown" :style="{'left':calendar3.left+'px','top':calendar3.top+'px'}" v-if="calendar3.show">
                        <calendar :range="calendar3.range" :fixedStart="calendar3.fixedStart" :events="calendar3.events" :zero="calendar3.zero" :lunar="calendar3.lunar" :value="calendar3.value" @select="calendar3.select" :begin="calendar3.begin" :end="calendar3.end"></calendar>
                      </div>
                    </transition>
                  </el-form-item>

                </el-col>
                <el-col :span="5">
                  <el-form-item label="天数：" prop="bookedDays">
                    <el-input-number :disabled="isEdit" v-model.number="myAddOrderData.bookedDays" @change="changeDayCount" :min="1" :max="this.bookDayCount" label="天数"></el-input-number>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="房费：">
                    <el-input :disabled="true" placeholder="房费" v-model.number="myAddOrderData.roomRate">
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
            <div class="pdt-20">
              <el-row :gutter="20" v-for="(custModel, index) in myAddOrderData.custFormList" :key="index">
                <el-col :span="6">
                  <div @keyup="myGetIndex(index)">
                    <el-form-item label="姓名：" :prop="'custFormList.' + index + '.custName'" :rules="[{ required: true, message: '姓名不能为空', trigger: 'change'},
                    { min: 2, max: 12, message: ' 长度在 2 到 12 个字符 ', trigger: 'change'}]">
                      <!-- <el-input :disabled="isEdit" v-model="custModel.custName" :minlength="2" :maxlength="5"></el-input> -->
                      <el-autocomplete v-model="custModel.custName" :fetch-suggestions="querySearchLodger" :trigger-on-focus="false" popper-class="cust-name" placeholder="请输入内容" @select="selectCutName" :index="index">
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
                    <el-input :disabled="isEdit" v-model="custModel.custIdCard" :minlength="18" :maxlength="18" @blur="checkIdCar(index)"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="手机：" :prop=" 'custFormList.' + index + '.custPhone'" :rules="[{ required: true, message: '手机号码不能为空', trigger: 'blur'},{ pattern: /^1(3|4|5|6|7|8|9)\d{9}$/, message: '手机号码为11位有效数字', trigger: 'blur' }]">
                    <el-input :disabled="isEdit" v-model.number="custModel.custPhone" :minlength="11" :maxlength="11"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="3" v-if="myAddOrderData.custFormList.length > 1">
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
                      <el-button v-if="isDeposit" type="text" size="mini" @click="addFundsModel('押金')">押金</el-button>
                    </div>
                    <div style="text-align: center; margin: 0">
                      <el-button type="text" size="mini" @click="addFundsModel('其他')">其他</el-button>
                    </div>
                  </el-popover>
                  <div class="float-r">
                    <el-button type="text" size="mini" v-popover:addFundsInfo>
                      <i class="icon iconfont icon-tianjia font-14"></i>
                      添加
                    </el-button>
                  </div>
                </el-col>
              </el-row>
            </header>
            <div class="pdt-20 pdb-20">
              <div>
                <el-row :gutter="10" v-if="fundsModel.recordState!=='DELETED'" v-for="(fundsModel, index) in myAddOrderData.fundsFormList" :key="index" class="pdl-20">
                  <el-col :span="9">
                    <el-form-item label="类型：" label-width="60px" :prop="'fundsFormList.' + index + '.itemName'" :rules="[{ required: true, message: '收款类型名称不能为空', trigger: 'blur'}]">
                      <el-input :disabled="fundsModel.itemType!=='OTHER'" placeholder="请输入收款金额类型" v-model="fundsModel.itemName" :minlength="2" :maxlength="10">
                        <template v-if="fundsModel.itemType==='ROOM_RATE'" slot="suffix">（ {{roomRateRemark}} ）</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="金额：" :prop="'fundsFormList.' + index + '.itemMoney'" :rules="[{ required: true, message: '收款金额不能为空', trigger: 'blur'},{ type: 'number', message: '收款金额必须为数字值'},{ pattern: /(^(-)?[1-9](\d+)?(\.\d{1,2})?$)|(^(0){1}$)|(^(-)?\d\.\d{1,2}?$)/, message: '请输入0，整数或者1~2位小数的金额数字', trigger: 'blur' }]">
                      <el-input :disabled="fundsModel.itemType==='ROOM_RATE'||(fundsModel.itemType==='DEPOSIT'&&!!myAddOrderData.roomDeposit)" placeholder="请输入收款金额" v-model.number="fundsModel.itemMoney" :minlength="1" :maxlength="5">
                        <template slot="append">元</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="支付渠道：" v-if="fundsModel.itemMoney>=0||fundsModel.payType==='INCOME'" :prop="'fundsFormList.' + index + '.payChannel'" :rules="{ required: true, message: '请选择支付渠道', trigger: 'change' }" label-width="100px">
                      <el-select :disabled="fundsModel.disablePayChannel" placeholder="请选择支付渠道" @change="changePayChannel(fundsModel.payChannelDesc,index)" v-model="fundsModel.payChannelDesc">
                        <el-option v-for="(val, key) in payChannelEnum" :key="key" :label="val" :value="key"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="3" v-if="fundsModel.itemType!=='ROOM_RATE'">
                    <el-button type="primary" size="mini" icon="el-icon-delete" @click="deleteFundsModel(index)"></el-button>
                  </el-col>
                </el-row>
              </div>
              <div class="funds-info pdr-20">
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
                  <span>{{this.refund>=0?'应退金额：':'未收金额：'}}</span>
                  <span v-if="this.refund>=0" class="font-red">{{Math.abs(amountReceived - orderPrice)}}</span>
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
            <div class="pd-ten">
              <el-input type="textarea" :maxlength="300" :autosize="{ minRows: 2}" placeholder="请输入你要备注的内容" v-model="myAddOrderData.remark">
              </el-input>
            </div>
          </div>
        </el-form>

      </div>
      <div class="dialog-footer">
        <el-button size="mini" type="primary" @click="save('CHECKED_IN')">入住</el-button>
        <el-button size="mini" @click="save('BOOKED')">预定</el-button>
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

  props: ['addOrder', 'addOrderParams'],

  data() {
    // const idCardRuler = (rule, value, callback) => {
    //   // console.log(this.idCardIndex);
    //   const { custFormList = [] } = this.myAddOrderData;
    //   if (custFormList && custFormList.length > 1) {
    //     for (var i = 0; i < custFormList.length; i++) {
    //       if (i === this.idCardIndex) {
    //         continue;
    //       }
    //       if (value === custFormList[i].custIdCard) {
    //         callback(new Error('身份证不能重复'));
    //       }
    //     }
    //   }
    //   callback();
    // };
    const today = (new Date()).toLocaleDateString();
    const endOrderDay = this.transferCouponValueTime(today, 90);
    const begin = today.split('/');
    const end = endOrderDay.split('-');

    return {
      // idCardRuler,
      idCardIndex: 0,
      bookDayCount: 90,
      roomNoObj: {},
      buildingOptions: [],
      roomNoOptions: [],
      roomNoPopoverVisible: false,
      rules: {
        channelNo: [
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
      isEdit: false, // true为开启disabled
      myEditOrder: this.editOrder,
      num1: 1,
      calendar3: {
        display: '',
        show: false,
        range: true,
        zero: true,
        value: [['2018', '01', '01'], ['2018', '01', '02']], // 默认日期
        lunar: true, // 显示农历
        events: {
        },
        begin, // 可选开始日期
        end, // 可选结束日期
        select: (begin, end) => {
          // console.log(begin, end, '开始和结束日期');
          this.bookDayCount = 90;

          const beginDate = begin.join('-');
          const endDate = end.join('-');

          // 开始和结束日期不能相同，他们之间也不能包含 不可预定房间的日期
          if (beginDate !== endDate && Object.entries(this.calendar3.events).length > 0) {
            this.calendar3.show = false;

            this.calendar3.value = [begin, end];
            this.calendar3.display = beginDate + '至' + endDate;

            this.myAddOrderData.startTime = beginDate;
            this.myAddOrderData.endTime = endDate;

            if (this.eventsArr.length > 0) {
              this.eventsArr.forEach((val, key) => {
                if (val[0] === beginDate) {
                  this.startKey = key;
                }
                if (val[0] === endDate) {
                  this.endKey = key;
                }
              });
            }

            this.rateArr = this.eventsArr.slice(this.startKey, this.endKey).map((val) => {
              return +val[1].price;
            });

            this.myAddOrderData.roomRate = this.rateArr.reduce((x, y) => {
              return x + y;
            });

            this.myAddOrderData.bookedDays = this.rateArr.length;
            // this.newAddRoomRate();
            this.myAddOrderData.fundsFormList[0].itemMoney = this.myAddOrderData.roomRate;
          }
        }
      },
      roomRate: 0,
      eventsArr: [],
      rateArr: [],
      startKey: '',
      endKey: '',
      arr: [],
      fundsTypeVisible: false,
      isCalendar: false,
      isDeposit: false, // 收款信息 是否 有删除押金的按钮
      depositIndex: -1,
      myAddOrderData: {},
      myAddOrder: true,
      changeRoomIdFlag: false,
      seachLodgerList: [],
      custListIndex: 0
    };
  },

  computed: {
    // 房费备注
    roomRateRemark: {
      get() {
        let s = '';
        if (this.myAddOrderData.roomNo) {
          s = this.myAddOrderData.roomNo + '房，  ' + this.myAddOrderData.startTime.substring(5, 10) + '至' + this.myAddOrderData.endTime.substring(5, 10);
        }
        return s;
      }
    },

    // 订单金额
    orderPrice: {
      get() {
        let allMoney = 0;
        if (this.myAddOrderData.fundsFormList) {
          this.myAddOrderData.fundsFormList.forEach((val, key) => {
            if (val.itemType !== 'DEPOSIT') {
              allMoney += val.itemMoney;
            }
          });
        }
        return allMoney;
      }
    },

    // 押金
    myDeposit: {
      get() {
        let deposit = 0;
        if (this.myAddOrderData.fundsFormList) {
          this.myAddOrderData.fundsFormList.forEach((val, key) => {
            // 增加 val.recordState !== 'DELETED' 条件
            if (val.itemType === 'DEPOSIT' && val.recordState !== 'DELETED') {
              deposit = val.itemMoney;
              this.depositFlag = true;
            }
          });
        }
        return deposit;
      }
    },

    // 已收金额
    amountReceived: {
      // 已收金额调整，判断计算条件 val.payType !== 'EXPENDITURE' ==> val.payChannel !== 'NONE'
      get() {
        let allMoney = 0;
        if (this.myAddOrderData.fundsModelList) {
          this.myAddOrderData.fundsModelList.forEach((val, key) => {
            if (val.payChannel !== 'NONE') {
              allMoney += val.itemMoney;
            }
          });
        }
        return allMoney;
      }
    },

    // 大于0为退款 小于0为未收金额
    refund: {
      get() {
        return this.amountReceived - this.orderPrice - this.myDeposit;
      }
    }
  },

  mounted() {
    // 获取页面需要的下拉枚举数据
    this.getSelectEnum();

    // 请求 初始表单数据
    this.getAddOrderInitPageData();
  },

  watch: {
    addOrder(newVal) {
      this.myAddOrder = newVal;
    }
  },

  methods: {

    getAddOrderInitPageData() {
      this.$axios.get('security/order/addOrderInitPage', { params: this.addOrderParams })
        .then((res) => {
          // console.log(res, '新增订单 初始数据');
          if (res.data.status === 'C0000') {
            this.addOrderData = res.data.result;
            this.myAddOrderData = JSON.parse(JSON.stringify(this.addOrderData));

            this.handleInitData();
          }
        });
    },

    // 选择房间号时 触发请求
    handleRoomNoItemChange(val) {
      if (val.length === 1) { // 请求二级菜单数据
        this.roomNoOptions.forEach((item, index) => {
          if (item.label === val[0]) {
            this.$set(this.roomNoOptions[index], 'children', []);// 每次进来先清空
          }
        });

        this.$axios.get('security/room/manage/searchBuilding', {
          params: {
            searchName: '',
            gardenName: val[0]
          }
        })
          .then((res) => {
            const children = [];

            res.data.result.forEach((item) => {
              children.push({
                label: item.buildingName,
                value: item.buildingName,
                children: []
              });
            });

            this.roomNoOptions.forEach((item, index) => {
              if (item.label === val[0]) {
                // this.$set(this.roomNoOptions[index][val[0]], 'children', []);// 每次进来先清空
                this.$set(this.roomNoOptions[index], 'children', children);
              }
            });
          });
      }
      if (val.length === 2) { // 请求三级菜单数据
        this.roomNoOptions.forEach((item, index) => {
          if (item.label === val[0]) {
            this.roomNoOptions[index].children.forEach((subItem, subIndex) => {
              if (subItem.label === val[1]) {
                this.$set(this.roomNoOptions[index].children[subIndex], 'children', []); // 每次先清空
              }
            });
          }
        });

        this.$axios.get('security/room/manage/searchRoomNum', {
          params: {
            searchName: '',
            gardenName: val[0],
            buildingName: val[1]
          }
        })
          .then((res) => {
            this.roomIdArr = res.data.result;

            const children = [];

            res.data.result.forEach((item) => {
              children.push({
                label: item.number,
                value: item.number,
                roomId: item.roomId
              });
            });

            this.roomNoOptions.forEach((item, index) => {
              if (item.label === val[0]) {
                this.roomNoOptions[index].children.forEach((subItem, subIndex) => {
                  if (subItem.label === val[1]) {
                    this.$set(this.roomNoOptions[index].children[subIndex], 'children', children);
                  }
                });
              }
            });
          });
      }
    },

    // 第一次点击选择房号时，请求楼盘数据
    openRoomNo() {
      this.$axios.get('security/room/manage/searchGarden', {
        params: { searchName: '' }
      })
        .then((res) => {
          const dataArr = res.data.result;
          dataArr.forEach((item, index) => {
            this.roomNoOptions.push({
              value: item.gardenName,
              label: item.gardenName,
              children: []
            });
          });
          // console.log(this.roomNoOptions);
        });
    },

    // 选中新的房间号时，触发请求价格日历, 重新计算房费
    changeRoomNo(val) {
      // console.log(val);
      if (val.length === 3) {
        this.roomIdArr.forEach((item) => {
          if (item.number === val[2]) {
            this.myAddOrderData.roomId = item.roomId;
            this.myAddOrderData.roomNo = item.number;
            this.myAddOrderData.buildingName = item.buildingName;
            this.myAddOrderData.gardenName = item.gardenName;
          }
        });
      }
      // console.log(val, '选好的房号', this.myAddOrderData);
      // 获取价格日历数据
      this.getEveryDayPrice(this.myAddOrderData.roomId);
    },

    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
      };
    },

    // 点击楼盘输入框时，请求楼盘数据
    getAvailableGardenData(queryString, cb) {
      this.$axios.get('security/room/manage/searchAvailableGarden', {
        params: { searchName: '', startTime: this.myAddOrderData.startTime, endTime: this.myAddOrderData.endTime }
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
          startTime: this.myAddOrderData.startTime,
          endTime: this.myAddOrderData.endTime
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
          startTime: this.myAddOrderData.startTime,
          endTime: this.myAddOrderData.endTime
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
      // this.roomNoObj = {};
    },

    // 选中房间号确认时，请求房号对应的价格日历
    confirmChangeRoomId() {
      this.roomNoPopoverVisible = false;
      const data = this.myAddOrderData;
      const roomNoObj = this.roomNoObj;
      if (!roomNoObj.roomId) {
        return;
      }
      this.changeRoomIdFlag = true;
      data.gardenName = roomNoObj.gardenName;
      data.buildingName = roomNoObj.buildingName;
      data.roomNo = roomNoObj.roomNo;
      data.roomId = roomNoObj.roomId;
      this.getEveryDayPrice(this.myAddOrderData.roomId);
    },

    // 获取页面需要的下拉枚举数据
    getSelectEnum() {
      this.$axios.get('security/order/getAllEnum')
        .then((res) => {
          const { result } = res.data;
          this.payChannelEnum = result.PayChannelEnum;
          this.orderChannelEnum = result.OrderChannelEnum;
        });
    },

    // 处理初始化表单数据
    handleInitData() {
      if (this.myAddOrderData.roomDeposit > 0) {
        this.myAddOrderData = Object.assign({}, this.myAddOrderData, {
          channelNo: '',
          orderChannelDesc: '',
          custFormList: [
            {
              id: '',
              custIdCard: '',
              custName: '',
              custPhone: ''
            }
          ],
          fundsFormList: [
            {
              id: '',
              itemName: '房费',
              itemMoney: this.myAddOrderData.roomRate,
              itemType: 'ROOM_RATE',
              payChannel: 'NONE',
              payChannelDesc: '未支付'
            },
            {
              id: '',
              itemName: '押金',
              itemMoney: this.myAddOrderData.roomDeposit,
              itemType: 'DEPOSIT',
              payChannel: 'NONE',
              payChannelDesc: '未支付'
            }
          ],
          orderChannel: '',
          orderType: '',
          remark: '',
          totalPrice: 0
        });
      }
      if (this.myAddOrderData.roomDeposit === 0) {
        this.myAddOrderData = Object.assign({}, this.myAddOrderData, {
          channelNo: '',
          orderChannelDesc: '',
          custFormList: [
            {
              custIdCard: '',
              custName: '',
              custPhone: ''
            }
          ],
          fundsFormList: [
            {
              itemName: '房费',
              itemMoney: this.myAddOrderData.roomRate,
              itemType: 'ROOM_RATE',
              payChannel: 'NONE',
              payChannelDesc: '未支付'
            }
          ],
          orderChannel: '',
          orderType: '',
          remark: '',
          totalPrice: 0
        });
      }

      // console.log(this.myAddOrderData, '处理后的 新增订单数据');

      // 设置日期默认展示的值
      this.$set(this.calendar3, 'display', this.myAddOrderData.startTime + '至' + this.myAddOrderData.endTime);

      // 设置 日期弹出框 默认选中的日期
      this.$set(this.calendar3, 'value', [this.myAddOrderData.startTime.split('-'), this.myAddOrderData.endTime.split('-')]);

      // 获取价格日历数据
      this.getEveryDayPrice(this.myAddOrderData.roomId);
    },

    // 创建计算房费的数组
    initRateArr() {
      // 确定 订单详情的预定开始和结束日期 在 价格日历中的下标, 是为了天数的 +  - 按钮做房费计算使用
      this.eventsArr = Object.entries(this.calendar3.events);

      this.eventsArr.forEach((val, key) => {
        if (new Date(val[0]).toString() === (new Date(this.myAddOrderData.startTime)).toString()) {
          this.startKey = key;
        }
        if (new Date(val[0]).toString() === (new Date(this.myAddOrderData.endTime)).toString()) {
          this.endKey = key;
        }
      });

      this.rateArr = this.eventsArr.slice(this.startKey, this.endKey).map((val) => {
        return +val[1].price;
      });

      this.newAddRoomRate();
    },

    // 创建 calendar3.events 对象
    initEventsObj(dateObj) {
      let tempArr = [];

      Object.values(dateObj).forEach((val) => {
        tempArr = tempArr.concat(val);
      });

      tempArr.forEach((val) => {
        this.$set(this.calendar3.events, val.date, val);
        if (val.status !== 'VALID') {
          this.$set(this.calendar3.events[val.date], 'disabled', true);
        } else {
          this.$set(this.calendar3.events[val.date], 'disabled', false);
        }
      });

      // console.log(this.calendar3.events, '创建的 this.calendar3.events');

      this.initRateArr();
    },

    // 获取价格日历数据
    getEveryDayPrice(roomId) {
      let today = (new Date()).toLocaleDateString().replace(/\//g, '-');
      today = this.transferCouponValueTime(today, 0);

      const params = {
        startDate: today,
        endDate: this.transferCouponValueTime(today, 90),
        roomId: roomId
      };
      this.$axios.get('security/room/price/calendarEveryDay', { params })
        .then((res) => {
          if (res.data.status === 'C0000') {
            // this.isCalendar = false;

            this.dateObj = res.data.result.map;

            this.initEventsObj(this.dateObj);
          }
        });
    },

    // 计算收款项 新增的房费
    newAddRoomRate() {
      if (this.changeRoomIdFlag) {
        this.myAddOrderData.roomRate = this.rateArr.reduce((x, y) => {
          return x + y;
        });
        this.$set(this.myAddOrderData.fundsFormList[0], 'itemMoney', this.myAddOrderData.roomRate);
      }
    },

    // 点击加减按钮改变顾客住的天数
    changeDayCount(val) {
      const len = this.rateArr.length;
      // console.log(val, 'val', len, 'len');

      if (val > len) { // 增加天数
        if (val - 1 === len) { // 使用“+”按钮 增加天数
          this.endKey += 1;
          const nextDayRate = this.eventsArr[this.endKey - 1][1].price;
          this.rateArr.push(nextDayRate);
        } else { // 手动输入，增加了天数
          const addCount = val - this.myAddOrderData.bookedDays;
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
          const reduceCount = this.myAddOrderData.bookedDays - val;
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

      this.$set(this.calendar3, 'display', this.calendar3.value[0].join('-') + '至' + this.eventsArr[this.endKey][0]);
      this.$set(this.calendar3, 'value', [this.calendar3.value[0], this.eventsArr[this.endKey][0].split('-')]);

      this.myAddOrderData.startTime = this.calendar3.value[0].join('-');
      this.myAddOrderData.endTime = this.eventsArr[this.endKey][0];

      this.myAddOrderData.roomRate = this.rateArr.reduce((x, y) => {
        return x + y;
      });
      // this.newAddRoomRate();
      this.myAddOrderData.fundsFormList[0].itemMoney = this.myAddOrderData.roomRate;
    },

    // 取消 或者关闭 修改订单 弹窗
    handleClose() {
      this.myAddOrder = false;
      this.$emit('closeAddOrder');
    },

    // 办理新增订单
    handleAddOrder(type) {
      const params = JSON.parse(JSON.stringify(this.myAddOrderData));

      this.$set(params, 'orderType', type);

      this.$set(params.fundsFormList[0], 'remark', this.roomRateRemark);// 房费备注

      params.fundsFormList.forEach((item, index) => {
        item.payType = item.itemMoney > 0 ? 'INCOME' : 'EXPENDITURE';
        item.itemMoney = Math.abs(+item.itemMoney);
      });

      this.$axios.post('security/order/addOrder', params)
        .then((res) => {
          if (res.data.status === 'C0000') {
            this.$emit('closeAddOrder');

            // 刷新 房态
            let today = this.transferCouponValueTime((new Date()).toLocaleDateString(), 0);
            if (today === params.startTime) {
              this.$store.commit('handleRefreshHouseStatusS', true);
            }
            this.$store.commit('handleRefreshHouseStatusF', true);

            this.$message({
              message: '新增订单成功',
              type: 'success'
            });
          } else {
            this.$message({
              message: '新增订单失败：' + res.data.message,
              type: 'error'
            });
          };
        });
    },

    // 保存
    save(type) {
      this.$refs.addOrderForm.validate(
        (valid) => {
          // console.log(this.myAddOrderData.fundsFormList);

          if (valid) {
            const tip = type === 'BOOKED' ? '预定' : '入住';

            if (tip === '入住') {
              let canCheckin = true;
              this.myAddOrderData.fundsFormList.forEach((item) => {
                if (item.payChannel === 'NONE' && item.recordState !== 'DELETED') {
                  canCheckin = false;
                }
              });

              if (canCheckin) {
                this.$confirm('确认办理' + tip + '?')
                  .then(() => {
                    this.handleAddOrder(type);
                  });
              } else {
                this.$message({
                  message: '收款信息包含未支付项，不能办理入住，请先支付再办理入住！',
                  type: 'error'
                });
              }
            } else {
              this.$confirm('确认办理' + tip + '?')
                .then(() => {
                  this.handleAddOrder(type);
                });
            }
          } else {
            this.$message.error('订单修改的内容不符合规则');
          }
        });
    },

    // 增加住客
    addCustomer() {
      if (this.myAddOrderData.custFormList.length >= this.myAddOrderData.custCount) {
        this.$message.warning('住客人数超过了宜住人数了！');
        return;
      }
      this.myAddOrderData.custFormList.push({
        custName: '',
        custIdCard: '',
        custPhone: '',
        id: ''
      });
    },

    // 删除住客
    deleteCustomer(index) {
      // id 为空时代表当前记录为用户手工添加的
      if (this.myAddOrderData.custFormList[index].id === '' || !this.myAddOrderData.custFormList[index].id) {
        this.myAddOrderData.custFormList.splice(index, 1);
      } else {
        this.$set(this.myAddOrderData.custFormList[index], 'recordState', 'DELETED');
      }
    },

    // 增加收款信息选项
    addFundsModel(val) {
      this.fundsTypeVisible = false;
      if (val === '押金') {
        this.isDeposit = false;

        if (this.depositIndex === -1) {
          for (let i = 0; i < this.myAddOrderData.fundsFormList.length; i++) {
            if (this.myAddOrderData.fundsFormList[i].itemType !== 'ROOM_RATE') {
              this.depositIndex = i + 1;
              this.myAddOrderData.fundsFormList.splice(i, 0, {
                itemName: '押金',
                itemMoney: this.myAddOrderData.deposit,
                payChannel: '',
                itemType: 'ROOM_RATE',
                id: ''
              });
              return;
            }
          }
        } else {
          this.$set(this.myAddOrderData.fundsFormList[this.depositIndex], 'recordState', '');
          return;
        }
      }

      this.myAddOrderData.fundsFormList.push({
        itemName: val,
        itemType: val === '其他' ? 'OTHER' : 'DEPOSIT',
        itemMoney: '',
        payChannel: 'NONE',
        payChannelDesc: '未支付',
        id: ''
      });
    },

    // 删除收款信息选项
    deleteFundsModel(index) {
      // 新增订单时，所有id都为空
      if (this.myAddOrderData.fundsFormList[index].itemType === 'DEPOSIT') { // 新增订单的押金不用真的删除，为了重新添加押金可以恢复
        this.depositIndex = index;
        this.$set(this.myAddOrderData.fundsFormList[index], 'recordState', 'DELETED');
        this.isDeposit = true;
      } else {
        this.myAddOrderData.fundsFormList.splice(index, 1);
      }
    },
    // 价格日历 下拉弹窗
    openByDrop(e) {
      this.initEventsObj(this.dateObj);// 重新初始化

      this.calendar3.show = true;
      this.calendar3.left = e.target.offsetLeft + 0;
      this.calendar3.top = e.target.offsetTop + 30;

      e.stopPropagation();
      window.setTimeout(() => {
        document.addEventListener('click', (e) => {
          this.calendar3.show = false;
          document.removeEventListener('click', () => { }, false);
        }, false);
      }, 1000);
    },

    // 计算valueTime天后的日期 valueTime可以为负值
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
      Object.entries(this.orderChannelEnum).forEach((item) => {
        if (item[1] === val) {
          this.$set(this.myAddOrderData, 'orderChannel', item[0]);
        }
      });
    },

    // 修改支付渠道
    changePayChannel(val, index) {
      this.$set(this.myAddOrderData.fundsFormList[index], 'payChannel', val);
    },

    checkIdCar(index) {
      this.idCardIndex = index;
      // const { custFormList = [] } = this.myAddOrderData;
      // if (custFormList && custFormList.length > 1) {
      //   for (var i = 0; i < custFormList.length - 1; i++) {
      //     if (i === index) {
      //       continue;
      //     }
      //     if (custFormList[i].custIdCard === custFormList[index].custIdCard) {
      //       this.$message.error('身份证不能重复');
      //     }
      //   }
      // }
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
        this.myAddOrderData.custFormList.forEach((item, idex) => {
          if (item.custName === data.value && item.custIdCard === '') {
            item.custPhone = data.phone;
            item.custIdCard = data.idcard;
          }
        });
      } else {
        this.myAddOrderData.custFormList[this.custListIndex].custName = data.value;
        this.myAddOrderData.custFormList[this.custListIndex].custPhone = data.phone;
        this.myAddOrderData.custFormList[this.custListIndex].custIdCard = data.idcard;
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
.dialog-box>>>.el-autocomplete-suggestion {
  z-index: 2081 !important;
}

.name-list {
  width: 100%;
}
</style>
