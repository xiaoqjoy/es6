<template>
  <section>
    <section class="dialog-box bgceee">
      <el-form ref="addCustomer"
        :model="addCustomerData"
        :rules="addCustomerRules"
        size="mini"
        label-position="right"
        label-width="90px">
        <div class="model-border">
          <header class="model-header">基本信息</header>
          <div class="pd-20">
            <el-row>
              <el-col :span="8">
                <el-form-item label="姓名："
                  prop="name">
                  <el-input placeholder="请输入姓名"
                    :disabled="cutDialogType === 'edit'"
                    v-model="addCustomerData.name"
                    :maxlength="12">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="手机："
                  prop="phone">
                  <el-input placeholder="请输入手机号"
                    :disabled="cutDialogType === 'edit'"
                    v-model="addCustomerData.phone"
                    :maxlength="11">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="客户来源："
                  prop="custSource">
                  <el-select v-model="addCustomerData.custSource"
                    placeholder="请选择客户来源">
                    <el-option label="新浪网"
                      value="Sina">
                    </el-option>
                    <el-option label="安居客"
                      value="ANJUKE">
                    </el-option>
                    <el-option label="赶集网"
                      value="GANJI">
                    </el-option>
                    <el-option label="搜房网"
                      value="SOFANG">
                    </el-option>
                    <el-option label="焦点网"
                      value="JIAODIAN">
                    </el-option>
                    <el-option label="百度"
                      value="BAIDU">
                    </el-option>
                    <el-option label="house365"
                      value="HOUSE365">
                    </el-option>
                    <!-- <el-option label="新浪"
                      value="Sina">
                    </el-option> -->
                    <el-option label="报纸广告"
                      value="NEWSPAPER">
                    </el-option>
                    <el-option label="老客户"
                      value="OLDCUST">
                    </el-option>
                    <el-option label="街霸客"
                      value="JIEBAKE">
                    </el-option>
                    <el-option label="电话客"
                      value="PHONE">
                    </el-option>
                    <el-option label="短信客"
                      value="MESSAGE">
                    </el-option>
                    <el-option label="转介客"
                      value="ZHUANJIE">
                    </el-option>
                    <el-option label="系统洗客"
                      value="SYSTEM">
                    </el-option>
                    <el-option label="其他"
                      value="OTHER">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="model-border">
          <header class="model-header">
            <span>意向信息</span>
          </header>
          <div class="pd-20">
            <el-row class="height-60">
              <el-col :span="8"
                class="house-type-list">
                <el-form-item label="户型："
                  prop="intentionAddForm.houseTypeList">
                  <!-- <el-select v-model="addCustomerData.intentionAddForm.houseTypeList"
                    multiple
                    placeholder="户型"
                    size="mini">
                    <el-option label="单身公寓"
                      value="SINGLE">
                    </el-option>
                    <el-option label="一房"
                      value="ONE_ROOM">
                    </el-option>
                    <el-option label="二房"
                      value="TWO_ROOM">
                    </el-option>
                    <el-option label="三房"
                      value="THREE_ROOM">
                    </el-option>
                    <el-option label="四房"
                      value="FOUR_ROOM">
                    </el-option>
                    <el-option label="五室及以上"
                      value="FIVE_OR_MORE">
                    </el-option>
                  </el-select> -->
                  <el-popover ref="houseTypePopover"
                    @show="myhouseType=addCustomerData.intentionAddForm.houseTypeList"
                    placement="bottom-start"
                    width="174"
                    v-model="houseTypePopoverVisible">
                    <div class="pd-ten">
                      <el-checkbox-group v-model="myhouseType"
                        size="medium">
                        <p class="font-l pdh-20 font-14 line-h-30">
                          <el-checkbox label="SINGLE">单身公寓</el-checkbox>
                        </p>
                        <p class="font-l pdh-20 font-14 line-h-30">
                          <el-checkbox label="ONE_ROOM">一房</el-checkbox>
                        </p>
                        <p class="font-l pdh-20 font-14 line-h-30">
                          <el-checkbox label="TWO_ROOM">二房</el-checkbox>
                        </p>
                        <p class="font-l pdh-20 font-14 line-h-30">
                          <el-checkbox label="THREE_ROOM">三房</el-checkbox>
                        </p>
                        <p class="font-l pdh-20 font-14 line-h-30">
                          <el-checkbox label="FOUR_ROOM">四房</el-checkbox>
                        </p>
                        <p class="font-l pdh-20 font-14 line-h-30">
                          <el-checkbox label="FIVE_OR_MORE">五室及以上</el-checkbox>
                        </p>
                      </el-checkbox-group>
                      <div class="pdt-10"
                        style="text-align: center">
                        <el-button type="primary"
                          @click="selectHouseType"
                          size="mini">确定</el-button>
                        <el-button @click="clearHouseType"
                          size="mini">清空</el-button>
                      </div>
                    </div>
                  </el-popover>
                  <div class="house-type">
                    <el-input readonly
                      v-popover:houseTypePopover
                      placeholder="请选择户型"
                      v-model="showHouseType">
                    </el-input>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-popover @hide="cancelChangeEare"
                  @show="showSopced('area')"
                  ref="eareaPopover"
                  placement="bottom-start"
                  width="200"
                  v-model="areaPopoverVisible">
                  <el-form ref="areaRef"
                    size="mini"
                    :model="scopeData"
                    :rules="scopeDataRules">
                    <el-row class="pd-ten l-height-30">
                      <el-col :span="10">
                        <el-form-item prop="areaStart">
                          <el-input placeholder="最小"
                            v-model.number="scopeData.areaStart"
                            :maxlength="5"
                            size="mini" />
                        </el-form-item>
                      </el-col>
                      <el-col :span="4"
                        class="font-c">
                        至
                      </el-col>
                      <el-col :span="10">
                        <el-form-item prop="areaEnd">
                          <el-input placeholder="最大"
                            :maxlength="5"
                            v-model.number="scopeData.areaEnd"
                            size="mini" />
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-form>
                  <div class="pd-ten font-r">
                    <el-button type="primary"
                      size="mini"
                      @click="confirmChangeEare">确定</el-button>
                    <el-button size="mini"
                      @click="cancelChangeEare('clear')">清空</el-button>
                  </div>
                </el-popover>
                <el-form-item label="面积："
                  prop="showEarea">
                  <el-input class="search-key"
                    placeholder="面积"
                    readonly
                    v-popover:eareaPopover
                    v-model="addCustomerData.showEarea"
                    size="mini" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-popover @hide="cancelChangeEare"
                  @show="showSopced('price')"
                  ref="pricePopover"
                  placement="bottom-start"
                  width="200"
                  v-model="pricePopoverVisible">
                  <el-form ref="priceRef"
                    size="mini"
                    :model="scopeData"
                    :rules="scopeDataRules">
                    <el-row class="pd-ten l-height-30">
                      <el-col :span="10">
                        <el-form-item prop="priceStart">
                          <el-input placeholder="最低"
                            v-model.number="scopeData.priceStart"
                            :maxlength="5"
                            size="mini" />
                        </el-form-item>
                      </el-col>
                      <el-col :span="4"
                        class="font-c">
                        至
                      </el-col>
                      <el-col :span="10">
                        <el-form-item prop="priceEnd">
                          <el-input placeholder="最高"
                            :maxlength="5"
                            v-model.number="scopeData.priceEnd"
                            size="mini" />
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-form>
                  <div class="pd-ten font-r">
                    <el-button type="primary"
                      size="mini"
                      @click="confirmChangePrice">确定</el-button>
                    <el-button size="mini"
                      @click="cancelChangePrice('clear')">清空</el-button>
                  </div>
                </el-popover>
                <el-form-item label="价格："
                  prop="showPrice">
                  <el-input class="search-key"
                    placeholder="价格"
                    readonly
                    v-model="addCustomerData.showPrice"
                    v-popover:pricePopover
                    size="mini" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="客户要求："
              prop="intentionAddForm.remark">
              <el-input :maxlength="100"
                placeholder="客户要求"
                type="textarea"
                :rows="3"
                v-model="addCustomerData.intentionAddForm.remark"
                size="mini" />
            </el-form-item>
          </div>
        </div>
      </el-form>
    </section>
    <section class="dialog-footer">
      <el-button type="primary"
        size="mini"
        :loading="submitting"
        @click="handleSubmit">{{submitting? '执行中...' : '确定'}}</el-button>
      <el-button size="mini"
        @click="closeDialog">取 消</el-button>
    </section>
  </section>
</template>
<script>
export default {
  data() {
    let phoneRuler = (rules, value, callback) => {
      if (this.cutDialogType === 'add') {
        if (!(/(^[0-9]{11,11}$)/).test(value)) {
          callback(new Error('请正确输入手机号'));
        }
      }
      callback();
    };
    let areadEndRules = (rule, value, callback) => {
      if (+value > 0) {
        if (!(/^[0-9]\d*$/).test(value)) {
          callback(new Error('请输入正整数'));
        } else if (+this.scopeData.areaStart > value) {
          callback(new Error('最大面积必须大于或等于最小面积'));
        } else if (!(/^[0-9]{1,5}$/).test(value)) {
          callback(new Error('输入数字长度在 1 到 5 位'));
        }
      }
      callback();
    };
    let priceEndRules = (rule, value, callback) => {
      if (+value > 0) {
        if (!(/^[0-9]\d*$/).test(value)) {
          callback(new Error('请输入正整数'));
        } else if (+this.scopeData.priceStart > value) {
          callback(new Error('最高价格必须大于或者等于最低价格'));
        } else if (!(/^[0-9]{1,5}$/).test(value)) {
          callback(new Error('输入数字长度在 1 到 5 位'));
        }
      }
      callback();
    };
    return {
      phoneRuler,
      areadEndRules,
      priceEndRules,

      addCustomerData: {
        name: '',
        phone: '',
        custSource: '',
        intentionAddForm: {
          houseTypeList: [],
          areaStart: '',
          areaEnd: '',
          priceStart: '',
          priceEnd: ''
        },
        showEarea: '',
        showPrice: ''
      },
      showHouseType: '',
      myhouseType: [],

      scopeData: {
        areaStart: '', // 起始面积区间
        areaEnd: '', // 截止面积区间
        priceStart: '', // 价格
        priceEnd: '' // 价格
      },
      scopeDataRules: {
        areaStart: [{ pattern: /(^[0-9]{1,5}$)/, message: '请输入数字' }], // 起始面积区间
        areaEnd: [{ validator: areadEndRules, trigger: 'change' }], // 截止面积区间
        priceStart: [{ pattern: /(^[0-9]{1,5}$)/, message: '请输入数字' }], // 价格
        priceEnd: [{ validator: priceEndRules, trigger: 'change' }] // 价格
      },

      areaPopoverVisible: false,
      pricePopoverVisible: false,
      houseTypePopoverVisible: false,
      submitting: false,
      refundLeaseNo: '',
      addCustomerRules: {
        name: [
          { required: true, message: '请输入客户姓名', trigger: 'blur' },
          { pattern: /^\S+$/, message: '请输入正确姓名' },
          { min: 2, max: 10, message: ' 长度在 2 到 10 个字符 ', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: phoneRuler, trigger: 'change' }
          // { pattern: /(^[0-9]{11,11}$)/, message: '请正确输入手机号' }
          // { pattern: /^(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[8|9])\d{8,10}$/, message: '请输入正确的电话号码' }
        ],
        custSource: [
          { required: true, message: '请输入选择客户来源', trigger: 'change' }
        ],
        showEarea: [
          { required: true, message: '至少输入一个面积意向', trigger: 'change' }
        ],
        showPrice: [
          { required: true, message: '至少输入一个价格意向', trigger: 'change' }
        ],
        'intentionAddForm.houseTypeList': [
          { type: 'array', required: true, message: '请至少选择一个意向类型', trigger: 'change' }
        ],
        'intentionAddForm.remark': [
          { pattern: /^\S+$/, message: '请规范输入' }
        ]
      }
    };
  },
  props: ['addCutDialogVisible', 'cutDialogType', 'custId'],
  created() {
    if (this.cutDialogType === 'edit') {
      this.requestData();
    }
  },
  methods: {
    // 获取
    requestData() {
      this.$axios.get(
        '/security/customer/queryCustomerDetail',
        {
          params: {
            id: this.custId
          }
        }
      ).then((res) => {
        if (res.data.status === 'C0000') {
          const { result } = res.data;
          this.addCustomerData.intentionAddForm = result.intentionModel;
          this.addCustomerData.id = result.id;
          // this.addCustomerData.intentionAddForm.houseTypeList = result.intentionModel.houseTypeList;
          this.addCustomerData.name = result.name;
          this.addCustomerData.phone = result.phone;
          this.addCustomerData.custSource = result.custSource;
          this.handleShowInfo('area');
          this.handleShowInfo('price');
          this.selectHouseType('fist');
        } else {
          this.$message.error(res.data.message);
        }
      }).catch((err) => {
        this.$message.error(err.message || '获取租客信息异常！');
        console.log(err);
      });
    },

    showSopced(type) {
      if (type === 'area') {
        this.scopeData.areaStart = this.addCustomerData.intentionAddForm.areaStart;
        this.scopeData.areaEnd = this.addCustomerData.intentionAddForm.areaEnd;
      } else {
        this.scopeData.priceStart = this.addCustomerData.intentionAddForm.priceStart;
        this.scopeData.priceEnd = this.addCustomerData.intentionAddForm.priceEnd;
      }
    },

    handleShowInfo(type) {
      let myCustData = this.addCustomerData;
      let myStart = type === 'area' ? myCustData.intentionAddForm.areaStart : myCustData.intentionAddForm.priceStart;
      let myEnd = type === 'area' ? myCustData.intentionAddForm.areaEnd : myCustData.intentionAddForm.priceEnd;
      if (myStart > 0 && myEnd > 0 && myStart !== myEnd) {
        if (type === 'area') {
          myCustData.showEarea = myStart + '-' + myEnd + '平方米';
        } else {
          myCustData.showPrice = myStart + '-' + myEnd + '元/月';
        }
      } else if (myStart > 0 && !myEnd > 0) {
        if (type === 'area') {
          myCustData.showEarea = myStart + '平方以上';
        } else {
          myCustData.showPrice = myStart + '元/月以上';
        }
      } else if (!myStart > 0 && myEnd > 0) {
        if (type === 'area') {
          myCustData.showEarea = myEnd + '平方以下';
        } else {
          myCustData.showPrice = myEnd + '元/月以下';
        }
      } else if (myStart > 0 && myStart === myEnd) {
        if (type === 'area') {
          myCustData.showEarea = myStart + '平方';
        } else {
          myCustData.showPrice = myStart + '元/月';
        }
      } else {
        if (type === 'area') {
          myCustData.showEarea = '';
        } else {
          myCustData.showPrice = '';
        }
      }
    },

    cancelChangeEare(type) {
      if (type === 'clear') {
        this.scopeData.areaStart = '';
        this.scopeData.areaEnd = '';
        this.addCustomerData.intentionAddForm.areaStart = '';
        this.addCustomerData.intentionAddForm.areaEnd = '';
        this.handleShowInfo('area');
      }
      this.areaPopoverVisible = false;
    },

    confirmChangeEare() {
      this.$refs.areaRef.validate((valid) => {
        if (valid) {
          this.addCustomerData.intentionAddForm.areaStart = this.scopeData.areaStart;
          this.addCustomerData.intentionAddForm.areaEnd = this.scopeData.areaEnd;

          this.handleShowInfo('area');
          this.cancelChangeEare();
        } else {
          this.$message.error('请完善表单信息');
        }
      });
    },

    cancelChangePrice(type) {
      if (type === 'clear') {
        this.scopeData.priceStart = '';
        this.addCustomerData.intentionAddForm.priceStart = '';
        this.scopeData.priceEnd = '';
        this.addCustomerData.intentionAddForm.priceEnd = '';
        this.handleShowInfo('price');
      }
      this.pricePopoverVisible = false;
    },

    confirmChangePrice() {
      this.$refs.priceRef.validate((valid) => {
        if (valid) {
          this.addCustomerData.intentionAddForm.priceStart = this.scopeData.priceStart;
          this.addCustomerData.intentionAddForm.priceEnd = this.scopeData.priceEnd;
          this.handleShowInfo('price');
          this.cancelChangePrice();
        } else {
          this.$message.error('请完善表单信息');
        }
      });
    },

    handleSubmit() {
      this.$refs.addCustomer.validate((valid) => {
        if (valid) {
          let myAddCudtomerData = JSON.parse(JSON.stringify(this.addCustomerData));
          let url;
          if (this.cutDialogType === 'edit') {
            myAddCudtomerData.intentionUpdateForm = myAddCudtomerData.intentionAddForm;
            delete myAddCudtomerData.intentionAddForm;
            url = '/security/customer/updateCustomerById';
          } else {
            url = '/security/customer/addCustomer';
          }
          this.submitting = true;
          this.$axios.post(
            url,
            myAddCudtomerData
          ).then((res) => {
            this.submitting = false;
            if (res.data.status === 'C0000') {
              this.$message.success('处理成功');
              // if (this.cutDialogType !== 'edit') {
              this.$emit('refreshData');
              // }
              this.closeDialog();
            } else {
              this.$message.error(res.data.message);
            }
          }).catch(err => {
            this.submitting = false;
            this.$message.error(err.message || '保存租客信息异常！');
            console.log(err);
          });
        } else {
          this.$message.error('请完善表单信息');
        }
      });
    },

    //  确认选择房子的类别
    selectHouseType(type) {
      // type === fist 接口请求数据回来第一打开。
      if (type !== 'fist') {
        if (!this.myhouseType.length) {
          this.houseTypePopoverVisible = false;
          return;
        }
        this.addCustomerData.intentionAddForm.houseTypeList = this.myhouseType;
      }

      // this.showHouseType = this.houseType.jion(',');
      let showInfo = '';
      for (let i = 0; i < this.addCustomerData.intentionAddForm.houseTypeList.length; i++) {
        switch (this.addCustomerData.intentionAddForm.houseTypeList[i]) {
          case 'SINGLE':
            showInfo = showInfo + '、单身公寓';
            break;
          case 'ONE_ROOM':
            showInfo = showInfo + '、一房';
            break;
          case 'TWO_ROOM':
            showInfo = showInfo + '、二房';
            break;
          case 'THREE_ROOM':
            showInfo = showInfo + '、三房';
            break;
          case 'FOUR_ROOM':
            showInfo = showInfo + '、四房';
            break;
          case 'FIVE_OR_MORE':
            showInfo = showInfo + '、五室及以上';
            break;
        }
      }
      this.showHouseType = showInfo.slice(1);
      this.houseTypePopoverVisible = false;
    },

    clearHouseType() {
      this.addCustomerData.intentionAddForm.houseTypeList = [];
      this.showHouseType = '';
      this.houseTypePopoverVisible = false;
    },

    closeDialog() {
      this.$emit('update:addCutDialogVisible', false);
    }
  }
};
</script>
<style scoped>
.height-60 {
  height: 60px;
}
.house-type-list >>> .el-select .el-select__tags {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.house-type-list >>> .el-select .el-select__tags > span {
  display: inline-block;
  text-overflow: ellipsis;
  /* overflow: hidden; */
  white-space: nowrap;
}
</style>


