<template>
  <el-dialog :title="contarctTitle"
    :visible.sync='dialogVisible'
    :close-on-click-modal="false"
    :before-close="closeDialog"
    width="950px">
    <div class="dialog-box bgceee">
      <div v-if="DialogType === 'Editor' && AddContract.state==='AUDIT_FAIL'"
        class="model-title-status c-red font-14 pd-20 marb-10 model-border">
        <span class="font-w font-16">审核不通过原因：</span> {{AddContract.auditFailInfo}}</div>
      <el-form ref="AddContract"
        :model="AddContract"
        :rules="ownerContRules"
        size="mini"
        label-position="right"
        label-width="95px">
        <div class="model-border">
          <header class="model-header">房间信息</header>
          <div class="pd-ten pdt-20 pdr-20">
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item label="楼盘："
                  prop="leaseForm.gardenName"
                  :rules="[
                      { required: true, message: '楼盘', trigger: 'change' },
                      ]">
                  <el-input v-if="DialogType === 'Editor' || DialogType === 'Contract' || DialogType === 'Revise'"
                    v-model="AddContract.leaseForm.gardenName"
                    :disabled="true"></el-input>
                  <el-select v-else
                    v-model="AddContract.leaseForm.gardenName"
                    filterable
                    remote
                    placeholder="请输入关键字"
                    :remote-method="remoteMethod"
                    :loading="loading"
                    @change="selectGardenName"
                    clearable>
                    <el-option v-for="(item, index) in options"
                      :key="index"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="楼栋："
                  prop="leaseForm.buildingName"
                  :rules="[
                      { required: true, message: '楼栋', trigger: 'change' },
                      ]">
                  <el-input v-if="DialogType === 'Editor' || DialogType === 'Contract' || DialogType === 'Revise'"
                    v-model="AddContract.leaseForm.buildingName"
                    :disabled="true"></el-input>
                  <el-select v-else
                    v-model="AddContract.leaseForm.buildingName"
                    placeholder="请输入关键字"
                    filterable
                    remote
                    :disabled="!AddContract.leaseForm.gardenName"
                    :remote-method="remoteBuildName"
                    @change="selectBuild"
                    clearable>
                    <el-option v-for="(item, index) in optionsBuild"
                      :key="index"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="房号："
                  prop="leaseForm.number"
                  :rules="[
                      { required: true, message: '房号', trigger: 'change' },
                      ]">
                  <el-input v-if="DialogType === 'Editor' || DialogType === 'Contract' || DialogType === 'Revise'"
                    v-model="AddContract.leaseForm.number"
                    :disabled="true"></el-input>
                  <el-select v-else
                    v-model="AddContract.leaseForm.number"
                    placeholder="请选择"
                    :loading="loading"
                    :disabled="!AddContract.leaseForm.buildingName"
                    @change="selectRoomNum"
                    clearable>
                    <el-option v-for="(item, index) in optionsRoomNum"
                      :key="index"
                      :label="item.number"
                      :value="item.roomId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item label="面积："
                  prop="leaseForm.area"
                  :rules="[
                       { required: true, message: '请输入面积', trigger: 'blur' },
                      ]">
                  <el-input disabled
                    v-model="AddContract.leaseForm.area"
                    @change="countPrice">
                    <template slot="append">平米</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="租金："
                  prop="leaseForm.rentMoney"
                  :rules="[
                      { required: true, message: '请输入租金', trigger: 'blur' },
                      { pattern: /^[0-9]+(.[0-9]{1,2})?$/, message: '请输入正整数' },
                      ]">
                  <el-input disabled
                    v-model="AddContract.leaseForm.rentMoney"
                    @change="countPrice">
                    <template slot="append">元/月</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="单价："
                  prop="leaseForm.leaseRoomPrice"
                  :rules="[
                      { required: true, message: '请输入单价', trigger: 'blur' },
                      { pattern: /^[0-9]+(.[0-9]{1,2})?$/, message: '最多支持两位小数' }
                      ]">
                  <el-input disabled
                    v-model="AddContract.leaseForm.leaseRoomPrice">
                    <template slot="append">元/平方/月</template>
                  </el-input>
                </el-form-item>
              </el-col>

            </el-row>
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item label="押金："
                  prop="leaseForm.depositMoney"
                  :rules="[
                      { required: true, message: '请输入租金', trigger: 'blur' },
                      { pattern: /^[0-9]\d*$/, message: '请输入正整数' },
                      ]">
                  <el-input disabled
                    v-model="AddContract.leaseForm.depositMoney">
                    <template slot="append">元</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="付租方式："
                  prop="leaseForm.payType"
                  :rules="[{ required: true, message: '请选择一种付款方式', trigger: 'change' }]">
                  <!-- <el-input v-model="AddContract.leaseForm.payType"></el-input> -->
                  <el-select disabled
                    v-model="AddContract.leaseForm.payType"
                    placeholder="付款方式">
                    <el-option label="月付"
                      value="MONTHLY_PAYMENT">
                    </el-option>
                    <el-option label="二月付"
                      value="DOUBLE_MONTH_PAY">
                    </el-option>
                    <el-option label="季付"
                      value="QUARTERLY_PAYMENT">
                    </el-option>
                    <el-option label="半年付"
                      value="HALF_YEAR_PAY">
                    </el-option>
                    <el-option label="年付"
                      value="YEARLY_PAYMENT">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="免租期："
                  prop="leaseForm.rentFreeDays"
                  :rules="[
                      { pattern: /^[0-9]{1,3}$/, message: '输入长度在 1 到 3 位' },
                      { pattern: /^[0-9]\d*$/, message: '请输入正整数' }
                      ]">
                  <el-input disabled
                    v-model="AddContract.leaseForm.rentFreeDays">
                    <template slot="append">天/年</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="8">
                <el-form-item label="租金递增："
                  prop="leaseForm.payRate"
                  :rules="[
                       { pattern: /^(([1-9]|[12][0-9]|30)|(([1-9]|[12][0-9])\.[0-9]{1,2}))$/, message: '必须为小于30' },
                      ]">
                  <el-input v-model="AddContract.leaseForm.payRate">
                    <template slot="append">%/年</template>
                  </el-input>
                </el-form-item>
              </el-col> -->
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="装修期："
                  prop="leaseForm.decorateDays"
                  :rules="[
                      { required: true, message: '请输入装修期', trigger: 'blur' },
                      { pattern: /^[0-9]\d*$/, message: '请输入正整数' }
                      ]">
                  <el-input disabled
                    v-model="AddContract.leaseForm.decorateDays">
                    <template slot="append">天</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <div class="pay-rate-box flex-start-grow">
                  <div class="pdh-ten">
                    租金递增：
                  </div>
                  <div class="show-pay-rate flex-1 font-12 c-6">
                    <div v-if="Object.entries(AddContract.leaseForm.leasePriceRateDesc).length > 0"
                      class="pdh-ten text-ellips">
                      <span v-for="(item,index) in Object.values(AddContract.leaseForm.leasePriceRateDesc)[0].split(',')"
                        :key="index">
                        <span v-if="index !==0">，
                        </span>第{{index + 2}}年{{item || 0}}{{Object.keys(AddContract.leaseForm.leasePriceRateDesc)[0] === 'RADIO_INCREASE' ? '%' : '元'}}
                      </span>
                    </div>
                    <div class="pdh-ten">暂无递增计划</div>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item label="交房日期："
                  prop="commitHouse"
                  type="date"
                  size="mini"
                  :rules="[{ required: true, message: '请输入交房日期', trigger: 'blur' }]">
                  <el-date-picker v-model="AddContract.commitHouse"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    type="date">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="签约日期："
                  prop="signupTime"
                  :rules="[{ required: true, message: '请输入签约日期', trigger: 'blur' }]">
                  <el-date-picker v-model="AddContract.signupTime"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    type="date"
                    size="mini">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">

              <el-col :span="8">
                <el-form-item label="租期起始："
                  prop="leaseForm.leaseCreateTime"
                  type="date"
                  size="mini"
                  :rules="[{ required: true, message: '请输入租期起始', trigger: 'blur' }]">
                  <el-date-picker v-model="AddContract.leaseForm.leaseCreateTime"
                    format="yyyy-MM-dd"
                    :disabled="isRenew || DialogType === 'Revise'"
                    value-format="yyyy-MM-dd"
                    type="date">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="租期结束："
                  prop="leaseForm.leaseFinalTime"
                  type="date"
                  size="mini">
                  <el-date-picker v-model="AddContract.leaseForm.leaseFinalTime"
                    :disabled="DialogType === 'Revise' || !AddContract.leaseForm.leaseCreateTime"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    type="date">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="8">
                <el-form-item label="租期：" required>
                  <el-date-picker v-model="leaseDays" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
                  </el-date-picker>
                </el-form-item>
              </el-col> -->
            </el-row>
          </div>
        </div>
        <div class="model-border">
          <header class="model-header">交接信息</header>
          <div class="pd-ten pdt-20 pdr-20">
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item label="交接水表："
                  prop="chargeForm.waterYield"
                  :rules="[
                      { required: true, message: '请输入交接水表', trigger: 'blur' },
                      { pattern: /^[0-9]{1,5}$/, message: '请输入整数，最多5位数' }
                      ]">
                  <el-input v-model="AddContract.chargeForm.waterYield"
                    :maxlength="5">
                    <template slot="append">吨</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="交接电表："
                  prop="chargeForm.electricConsume"
                  :rules="[
                      { required: true, message: '请输入交接电表', trigger: 'blur' },
                      { pattern: /^[0-9]{1,5}$/, message: '请输入整数，最多5位数' }
                      ]">
                  <el-input v-model="AddContract.chargeForm.electricConsume"
                    :maxlength="5">
                    <template slot="append">度</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="交接燃气："
                  prop="chargeForm.gasYield"
                  :rules="[
                      { required: true, message: '请输入交接燃气', trigger: 'blur' },
                      { pattern: /^[0-9]{1,5}$/, message: '请输入整数，最多5位数' }
                      ]">
                  <el-input v-model="AddContract.chargeForm.gasYield"
                    :maxlength="5">
                    <template slot="append">立方</template>
                  </el-input>
                </el-form-item>
              </el-col>

            </el-row>
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item label="水费："
                  prop="chargeForm.waterCharges"
                  :rules="[
                      { required: true, message: '请输入0~99的数字', trigger: 'blur' },
                      { pattern: /^\d\.([0-9]{1,2}|[0-9][1-9])$|^[0-9]\d{0,1}(\.\d{1,2}){0,1}$|^99(\.0{1,2}){0,1}$/, message: '请输入0~99的数字，支持两位小数' }
                      ]">
                  <el-input v-model="AddContract.chargeForm.waterCharges">
                    <template slot="append">元/吨</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="电费："
                  prop="chargeForm.electricCharges"
                  :rules="[
                      { required: true, message: '请输入0~99的数字', trigger: 'blur' },
                      { pattern: /^\d\.([0-9]{1,2}|[0-9][1-9])$|^[0-9]\d{0,1}(\.\d{1,2}){0,1}$|^99(\.0{1,2}){0,1}$/, message: '请输入0~99的数字，支持两位小数' }
                      ]">
                  <el-input v-model="AddContract.chargeForm.electricCharges">
                    <template slot="append">元/度</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="燃气费："
                  prop="chargeForm.gasCharges"
                  :rules="[
                      { required: true, message: '请输入0~99的数字', trigger: 'blur' },
                      { pattern: /^\d\.([0-9]{1,2}|[0-9][1-9])$|^[0-9]\d{0,1}(\.\d{1,2}){0,1}$|^99(\.0{1,2}){0,1}$/, message: '请输入0~99的数字，支持两位小数' }
                      ]">
                  <el-input v-model="AddContract.chargeForm.gasCharges">
                    <template slot="append">元/立方</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- <el-row>
              <el-col :span="8">
                <el-form-item label="宽带："
                  prop="chargeForm.internetCharges"
                  :rules="[
                      { required: true, message: '请输入数字', trigger: 'blur' },
                      { pattern: /^\d{1,3}$/, message: '输入限制1-3位正整数' },
                      ]">
                  <el-input v-model="AddContract.chargeForm.internetCharges"
                    :maxlength="5">
                    <template slot="append">元/月</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row> -->
          </div>
        </div>
        <div class="model-border">
          <header class="model-header">业主信息</header>
          <div class="pd-ten pdt-20 pdr-20">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="姓名："
                  prop="rentAcctName"
                  :rules="[
                            { required: true, message: '请输入业主姓名', trigger: 'blur'},
                            { pattern: /^\S+$/, message: '请正确输入业主姓名' },
                            { min: 2, max: 12, message: ' 长度在 2 到 12 个字符 ', trigger: 'blur'}
                          ]">
                  <el-input v-model="AddContract.rentAcctName"
                    :maxlength="14"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="开户银行："
                  prop="rentAcctBank"
                  :rules="[
                            { required: true, message: '请输入开户银行', trigger: 'blur'},
                            { pattern: /^\S+$/, message: '请正确输入开户银行' },
                            { min: 2, max: 12, message: ' 长度在 2 到 12 个字符 ', trigger: 'blur'}
                          ]">
                  <el-input v-model="AddContract.rentAcctBank"
                    :maxlength="14"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="银行账户："
                  prop="rentAcctBankcardId"
                  :rules="[
                            { required: true, message: '请输入银行账户', trigger: 'blur'},
                            { pattern: /^[0-9]*$/, message: '请输入数字' },
                            { pattern: /^\d{6,20}$/, message: '输入长度在 6 到 20 位' },
                          ]">
                  <el-input v-model="AddContract.rentAcctBankcardId"
                    :maxlength="22"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="手机号："
                  prop="rentAcctPhone"
                  :rules="[
                            { required: true, message: '请输入业主手机号', trigger: 'blur'},
                            { pattern: /^(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[8|9])\d{8,10}$/ ,message: '请输入正确的电话号码'}
                          ]">
                  <el-input v-model="AddContract.rentAcctPhone"
                    :maxlength="13"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="身份证号："
                  prop="rentAcctIdCard"
                  :rules="[
                            { required: true, message: '请输入业主身份证号', trigger: 'blur'},
                            { pattern: /^(\d{18}$|^\d{17}(\d|X|x))$/, message: '请输入18位身份证号', trigger: 'blur' }
                          ]">
                  <el-input v-model="AddContract.rentAcctIdCard"
                    :maxlength="20"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="model-border">
          <header class="model-header">附件信息
          </header>
          <div class="bdb-ddd">
            <header class="tentan-header">业主身份证附件
              <span class="font-default">(限10张)</span>
              <span v-if="IdCardPic"
                class="font-red">请上传完整的身份证图片</span>
            </header>
            <div class="pd-ten">
              <div :class="{'borderRed': IdCardPic ,'clearfix': true, 'pdb-20': true}">
                <my-image-upload ref="uploadIDcard"
                  showButtonText="添加图片"
                  :isAutoType="true"
                  :autoType="'IDCARD_FRONT'"
                  :showType="false"
                  v-model="filesIDcard"
                  :postAction="postAction"
                  :maximum="10">
                </my-image-upload>
              </div>
            </div>
          </div>
          <div class="bdb-ddd">
            <header class="tentan-header">房产证附件
              <span class="font-default">(限10张)</span>
              <span v-if="housePic"
                class="font-red">至少上传一张图片</span>
            </header>
            <div class="pd-ten">
              <div :class="{'borderRed': housePic ,'clearfix': true, 'pdb-20': true}">
                <my-image-upload ref="uploadHouse"
                  :isAutoType="true"
                  :autoType="'HOUSE_CERT'"
                  :showButtonText="'添加图片'"
                  :showType="false"
                  v-model="filesHouse"
                  :postAction="postAction"
                  :maximum="10">
                </my-image-upload>
              </div>
            </div>
          </div>
          <div class="bdb-ddd">
            <header class="tentan-header">合同附件
              <span class="font-default">(限30张)</span>
              <span v-if="contractPic"
                class="font-red">至少上传一张图片</span>
            </header>
            <div class="pd-ten">
              <div :class="{'borderRed': contractPic ,'clearfix': true, 'pdb-20': true}">
                <my-image-upload ref="uploadContract"
                  :showButtonText="'添加图片'"
                  :isAutoType="true"
                  :autoType="'CONTRACT_ATTACH'"
                  :showType="false"
                  v-model="filesContract"
                  :postAction="postAction"
                  :maximum="30">
                </my-image-upload>
              </div>
            </div>
          </div>
        </div>
        <div class="model-border">
          <header class="model-header">纸质合同信息</header>
          <div class="pd-ten pdt-20 pdr-20">
            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="合同编号："
                  prop="paperContractNumber"
                  :rules="[
                            { required: true, message: '请输入合同编号', trigger: 'blur'},
                            { pattern: /^([0-9]\d*$)|(?!^(\d+|[a-zA-Z]+|[~!-@#$%^&*?]+)$)^[\w~!-@#$%^&*?]{0,30}/, message: '请输入数字、26个英文字母或者特殊符号组成' },
                            { min: 2, max: 30, message: ' 长度在 2 到 30 个字符 ', trigger: 'blur'}
                          ]">
                  <el-input v-model="AddContract.paperContractNumber"
                    :maxlength="30"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="20">
                <el-form-item label="合同备注："
                  prop="contractDescription">
                  <el-input type="textarea"
                    :maxlength="200"
                    :rows="4"
                    v-model="AddContract.contractDescription"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-form>
    </div>
    <div class="dialog-footer">
      <el-button type="primary"
        size="mini"
        :loading="submitting"
        @click="handleSubmit">{{submitting? '执行中...' : '提交'}}</el-button>
      <el-button size="mini"
        @click="closeDialog">取消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import FileUpload from 'vue-upload-component';
import MyImageUpload from '@/components/MyImageUpload';
export default {
  data() {
    let endTimeRules = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请选择结束时间'));
      } else if ((new Date(value)).getTime() <= (new Date(this.AddContract.leaseForm.leaseCreateTime)).getTime()) {
        callback(new Error('结束时间必须大于起始时间'));
      }
      callback();
    };
    return {
      endTimeRules,
      requestSource: null, // 取消请求
      submitting: false,
      contarctUrl: '/security/room/contract/add',
      num1: 1,
      isRenew: false,
      contarctTitle: '添加合同',
      IdCardPic: false, // 身份证图片
      housePic: false,
      contractPic: false,
      AddContract: {
        'chargeForm': {
          'electricCharges': 0.67,
          'electricConsume': '',
          'gasCharges': 3.5,
          'internetCharges': undefined,
          'waterCharges': 2.67,
          'waterYield': ''
        },
        'leaseForm': {
          'buildingName': '',
          'gardenName': '',
          'number': '',
          'decorateDays': '', // 装修期
          'depositMoney': '',
          'id': '',
          'leaseDays': '',
          'payRate': '',
          'rentFreeDays': '',
          'leaseRoomPrice': '',
          leasePriceRateDesc: {},
          'payType': '',
          'rentMoney': '',
          'leaseCreateTime': '',
          'leaseFinalTime': ''
        },
        'pictureList': [
          {
            'pictureType': '',
            'pictureUrl': ''
          }
        ],
        'rentAcctBank': '',
        'rentAcctBankcardId': '',
        'rentAcctName': '',
        'roomId': '',
        city: 'SHENZHEN',
        'signupTime': '',
        'commitHouse': '',
        'paperContractNumber': '', // 纸质合同编号
        'contractDescription': '' // 合同描述
      },

      // 图片上传的默认参数
      filesIDcard: [],
      filesIDVerse: [],
      filesHouse: [],
      filesContract: [],

      postAction: '/mshz-mgr/security/room/contract/uploadPicture',
      selectParm: {},
      loading: false,
      gardenList: [],
      buildList: [],
      options: [],
      optionsBuild: [],
      optionsRoomNum: [],
      ownerContRules: {
        'leaseForm.leaseFinalTime': [
          { required: true, message: '请输入结束日期', trigger: 'blur' },
          { validator: endTimeRules, trigger: 'change' }
        ]
      }
    };
  },
  props: ['dialogVisible', 'DialogType', 'contractId', 'roomId', 'id'],
  created() {
    if (this.DialogType === 'Editor') {
      this.contarctTitle = '编辑合同';
      this.contarctUrl = '/security/room/contract/editContract';
      this.requestData();
    } else if (this.DialogType === 'Revise') {
      // 特改
      this.contarctTitle = '编辑合同';
      this.contarctUrl = '/security/room/contract/reviseContract';
      this.requestData();
    } else if (this.DialogType === 'Renew') {
      // 续签
      this.contarctTitle = '添加合同';
      this.contarctUrl = '/security/room/contract/renewContract';
      this.requestData();
    } else {
      if (this.roomId) {
        this.AddContract.roomId = this.roomId;
        this.getHouseInfo(this.roomId);
      }
      this.contarctTitle = '添加业主合同';
      this.contarctUrl = '/security/room/contract/add';
    }
  },
  methods: {
    // 关闭表格
    closeDialog(flag) {
      if (flag !== 'success') {
        this.cancelRequest();
      };
      this.$emit('changeDialog', false);
    },

    // 取消请求
    cancelRequest() {
      if (this.requestSource && (typeof this.requestSource.cancel === 'function')) {
        // 取消请求
        this.requestSource.cancel('请求已取消！');
      };
    },

    mapPicList(data) {
      if (!(data instanceof Array) && !data.length) {
        return [];
      }
      let CategoryPic = [];
      for (var i = 0; i < data.length; i++) {
        let pictureUrl;
        let id;
        if (data[i].success && data[i].response) {
          let resultData = JSON.parse(data[i].response.result);
          pictureUrl = resultData.result.url;
        } else if (data[i].typeInfo) {
          pictureUrl = data[i].pictureUrl;
          id = data[i].id;
        }
        let pictureType = data[i].pictureType;
        if (pictureUrl) {
          CategoryPic.push({
            pictureUrl,
            pictureType,
            id
          });
        }
      }
      return CategoryPic;
    },

    // 提交
    handleSubmit() {
      const IDVersePicList = this.mapPicList(this.filesIDVerse);
      const IdCardPicList = this.mapPicList(this.filesIDcard);
      const housePicList = this.mapPicList(this.filesHouse);
      const ContractPicList = this.mapPicList(this.filesContract);
      this.AddContract.pictureList = IdCardPicList.concat(housePicList, ContractPicList, IDVersePicList);
      this.AddContract.leaseForm.leasePriceRate = this.AddContract.leaseForm.leasePriceRateDesc;
      this.$refs.AddContract.validate((valid) => {
        if (valid) {
          if (!IdCardPicList.length) {
            this.IdCardPic = true;
            return false;
          } else if (!housePicList.length > 0) {
            this.housePic = true;
            return false;
          } else if (!ContractPicList.length > 0) {
            this.contractPic = true;
            return false;
          }
          this.submitting = true;
          this.requestSource = this.$axios.CancelToken.source();
          this.$axios.post(
            this.contarctUrl,
            this.AddContract,
            {
              cancelToken: this.requestSource.token
            }
          ).then((res) => {
            this.submitting = false;
            if (res.data.status === 'C0000') {
              this.$message({
                type: 'success',
                message: '合同保存成功',
                duration: 3000
              });
              this.$emit('refreshData');
              this.closeDialog('suceess');
            } else {
              this.$message({
                type: 'error',
                message: res.data.message,
                duration: 3000
              });
            }
          }).catch(err => {
            this.submitting = false;
            this.$message({
              type: 'error',
              message: err.message || '处理失败',
              duration: 3000
            });
          });
        } else {
          this.$message({
            type: 'error',
            message: '请完善表单信息！',
            duration: 3000
          });
          // console.log('error submit!!');
          return false;
        }
      });
    },

    // 分类返回的图片
    forPicList(list) {
      for (var j = 0, len = list.length; j < len; j++) {
        let currentObj = {
          thumb: list[j].pictureUrl.replace('{size}', '160x120'),
          pictureUrl: list[j].pictureUrl,
          pictureType: list[j].pictureType,
          pictureTypeDesc: list[j].pictureTypeDesc,
          id: list[j].id,
          type: 'image/jpeg',
          typeInfo: 'networkcomin'
        };
        switch (list[j].pictureType) {
          case 'IDCARD_FRONT':
            this.filesIDcard.push(currentObj);
            break;
          case 'IDCARD_VERSE':
            this.filesIDcard.push(currentObj);
            break;
          case 'HOUSE_CERT':
            this.filesHouse.push(currentObj);
            break;
          case 'CONTRACT_ATTACH':
            this.DialogType !== 'Renew' && this.filesContract.push(currentObj);
            break;
        }
      }
      // this.$refs.upload.add;
    },

    // 编辑获取数据
    requestData() {
      this.$axios.get(
        '/security/room/contract/queryContractDetail',
        {
          params: {
            id: this.contractId
            // id: '70ede68e-e192-4f33-8020-5817ddf02f5a'
          }
        }
      ).then((res) => {
        if (res.data.status === 'C0000') {
          let { result } = res.data;
          // this.AddContract = res.data.result;

          result.roomId = this.roomId;
          result.id = this.contractId;
          result.leaseForm.id = result.leaseForm.leaseId;
          result.commitHouse = result.commitHouseDesc;
          result.leaseForm.leasePriceRateDesc = result.leaseForm.leasePriceRate ? JSON.parse(result.leaseForm.leasePriceRate) : {};
          if (this.DialogType === 'Renew') {
            this.isRenew = true;
            delete result['id'];
            result.city = result.leaseForm.city;
            result.signupTime = '';

            let nowLeaseCreateTimeList = result.leaseForm.leaseFinalTimeDesc.split('-');
            nowLeaseCreateTimeList[2] = (+nowLeaseCreateTimeList[2]) + 1;

            result.leaseForm.leaseCreateTime = nowLeaseCreateTimeList.join('-');
            result.leaseForm.leaseFinalTime = '';
          } else {
            result.leaseForm.leaseCreateTime = result.leaseForm.leaseCreateTimeDesc;
            result.leaseForm.leaseFinalTime = result.leaseForm.leaseFinalTimeDesc;
            result.signupTime = result.signupTimeDesc;
          }
          this.$set(this, 'AddContract', result);
          this.forPicList(this.AddContract.pictureList);
        } else {
          this.$message.error('查询合同失败');
        }
      }).catch((err) => {
        this.$message.error(err.message || '服务器异常');
        console.log(err);
      });
    },

    // 楼盘联想
    remoteMethod(query) {
      if (query) {
        this.loading = true;

        this.$axios.get(
          '/security/room/manage/searchGarden',
          {
            params: {
              searchName: query
            }
          }
        ).then((res) => {
          this.loading = false;
          if (res.data.status === 'C0000') {
            this.gardenList = res.data.result.map((item) => {
              return {
                value: item.gardenName,
                label: item.gardenName
              };
            });
            this.options = this.gardenList.filter(item => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          } else {
            this.options = [];
          }
        }).catch((err) => {
          this.$message.error(err.message || '服务异常');
          console.log(err.message);
        });
      } else {
        this.options = [];
      }
    },

    // 楼栋联想
    remoteBuildName(query) {
      if (query !== '') {
        this.$axios.get(
          '/security/room/manage/searchBuilding',
          {
            params: {
              searchName: query,
              gardenName: this.AddContract.leaseForm.gardenName
            }
          }
        ).then((res) => {
          if (res.data.status === 'C0000') {
            this.buildList = res.data.result.map((item) => {
              return {
                value: item.buildingName,
                label: item.buildingName
              };
            });
            this.optionsBuild = this.buildList.filter(item => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          } else {
            this.optionsBuild = [];
          }
        }).catch((err) => {
          this.$message.error(err.message);
          console.log(err.message || '服务异常');
        });
      } else {
        // this.optionsBuild = [];
        this.requestBuild();
      }
    },
    // 单价计算
    countPrice() {
      if (this.AddContract.leaseForm.rentMoney && this.AddContract.leaseForm.area) {
        this.AddContract.leaseForm.leaseRoomPrice = (this.AddContract.leaseForm.rentMoney / this.AddContract.leaseForm.area).toFixed(2);
      }
    },

    selectGardenName(val) {
      this.AddContract.leaseForm.buildingName = '';
      this.AddContract.leaseForm.roomId = '';
      this.AddContract.leaseForm.number = '';
      if (val) {
        this.requestBuild();
      }
    },

    requestBuild() {
      this.$axios.get(
        '/security/room/manage/searchBuilding',
        {
          params: {
            searchName: undefined,
            gardenName: this.AddContract.leaseForm.gardenName
          }
        }
      ).then((res) => {
        if (res.data.status === 'C0000') {
          this.optionsBuild = res.data.result.map((item) => {
            return {
              value: item.buildingName,
              label: item.buildingName
            };
          });
        } else {
          this.optionsBuild = [];
        }
      }).catch((err) => {
        console.log(err);
      });
    },

    selectBuild(val) {
      this.AddContract.roomId = '';
      this.AddContract.number = '';
      this.AddContract.leaseForm.number = '';
      if (!val) {
        this.AddContract.leaseForm.buildingName = '';
        return;
      }
      this.$axios.get(
        '/security/room/manage/pickCommitRoomId',
        {
          params: {
            gardenName: this.AddContract.leaseForm.gardenName,
            buildingName: this.AddContract.leaseForm.buildingName
          }
        }
      ).then((res) => {
        if (res.data.status === 'C0000') {
          // console.log(res);
          this.optionsRoomNum = res.data.result;
        } else {
          this.optionsRoomNum = [];
        }
      });
    },

    selectRoomNum(val) {
      if (!val) {
        this.AddContract.roomId = '';
        this.AddContract.leaseForm.number = '';
        return;
      }
      for (let i = 0; i < this.optionsRoomNum.length; i++) {
        if (this.optionsRoomNum[i].roomId === val) {
          this.AddContract.roomId = val;
          this.AddContract.number = this.optionsRoomNum[i].label;
          break;
        }
      }
      this.getHouseInfo(this.AddContract.roomId);
    },

    // 获取房源基本信息
    getHouseInfo(id) {
      this.$axios.get(
        '/security/room/manage/queryRoomLease',
        {
          params: {
            id: id
          }
        }
      ).then((data) => {
        if (data.data.status === 'C0000') {
          const baseInfo = data.data.result;
          let myAddContract = JSON.parse(JSON.stringify(this.AddContract));
          myAddContract.city = baseInfo.city;
          myAddContract.leaseForm.rentMoney = baseInfo.rentMoney;
          myAddContract.leaseForm.leaseRoomPrice = baseInfo.leaseRoomPrice;
          myAddContract.leaseForm.depositMoney = baseInfo.depositMoney;
          myAddContract.leaseForm.payType = baseInfo.payType;
          myAddContract.leaseForm.payRate = baseInfo.payRate;
          myAddContract.leaseForm.rentFreeDays = baseInfo.rentFreeDays;
          myAddContract.leaseForm.decorateDays = baseInfo.decorateDays;
          myAddContract.leaseForm.area = baseInfo.area;
          myAddContract.leaseForm.id = baseInfo.leaseId;
          myAddContract.leaseForm.leasePriceRate = baseInfo.leasePriceRate;
          myAddContract.leaseForm.leasePriceRateDesc = myAddContract.leaseForm.leasePriceRate ? JSON.parse(myAddContract.leaseForm.leasePriceRate) : {};
          if (this.DialogType === 'Contract') {
            myAddContract.leaseForm.gardenName = baseInfo.gardenName;
            myAddContract.leaseForm.buildingName = baseInfo.buildingName;
            myAddContract.leaseForm.number = baseInfo.number;
            myAddContract.leaseForm.id = baseInfo.leaseId;
          }
          this.$set(this, 'AddContract', myAddContract);
        }
      }).catch((e) => {
        this.$message.error(e.message || '服务异常');
        console.log(e.message);
      });
    }
  },
  components: {
    FileUpload,
    MyImageUpload
  }
};
</script>
<style scoped>
/* el-select el-select--mini */
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
.tentan-header {
  height: 35px;
  line-height: 35px;
  padding: 0 20px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
}
.model-title-status {
  line-height: 35px;
  background-color: #fff;
  word-break: break-all;
}
.pay-rate-box {
  height: 30px;
  line-height: 30px;
  border: 1px solid #a6a6a6;
  border-radius: 4px;
  overflow: hidden;
}
.show-pay-rate {
  border-left: 1px solid #a6a6a6;
  background-color: #eee;
}
</style>
