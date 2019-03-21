<template>
  <el-dialog :title="contarctTitle"
    :visible.sync='dialogVisible'
    :close-on-click-modal="false"
    :before-close="closeDialog"
    width="950px">
    <div class="dialog-box bgceee">
      <el-form ref="AddContract"
        :model="AddContract"
        size="mini"
        label-position="right"
        label-width="90px">
        <div class="model-border">
          <div class="pd-ten pdt-20 pdr-20">
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item label="楼盘："
                  prop="leaseForm.gardenName"
                  :rules="[
                      { required: true, message: '楼盘', trigger: 'change' },
                      ]">
                  <el-input v-if="DialogType === 'Editor' || DialogType === 'Contract'"
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
                  <el-input v-if="DialogType === 'Editor' || DialogType === 'Contract'"
                    v-model="AddContract.leaseForm.buildingName"
                    :disabled="true"></el-input>
                  <el-select v-else
                    v-model="AddContract.leaseForm.buildingName"
                    placeholder="请选择"
                    :loading="loading"
                    @change="selectBuild"
                    clearable>
                    <el-option v-for="(item, index) in optionsBuild"
                      :key="index"
                      :label="item.buildingName"
                      :value="item.buildingName">
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
                  <el-input v-if="DialogType === 'Editor' || DialogType === 'Contract'"
                    v-model="AddContract.leaseForm.number"
                    :disabled="true"></el-input>
                  <el-select v-else
                    v-model="AddContract.leaseForm.number"
                    placeholder="请选择"
                    :loading="loading"
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
                       { pattern: /^[0-9]\d*$/, message: '请输入正整数' },
                       { pattern: /^[0-9]{1,3}$/, message: '输入长度在 1 到 3 位数' }
                      ]">
                  <el-input v-model="AddContract.leaseForm.area"
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
                      { pattern: /^[0-9]\d*$/, message: '请输入正整数' },
                      { pattern: /^[0-9]{3,5}$/, message: '输入数字长度在 3 到 5 位' }
                      ]">
                  <el-input v-model="AddContract.leaseForm.rentMoney"
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
                      { pattern: /^\d{1,3}(\.\d+)?$/, message: '整数长度在 1 到 3 位' },
                      { pattern: /^[0-9]+(.[0-9]{1,2})?$/, message: '最多支持两位小数' }
                      ]">
                  <el-input v-model="AddContract.leaseForm.leaseRoomPrice">
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
                      { pattern: /^[0-9]{3,5}$/, message: '输入长度在 3 到 5 位' }
                      ]">
                  <el-input v-model="AddContract.leaseForm.depositMoney">
                    <template slot="append">元</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="付租方式："
                  prop="leaseForm.payType"
                  :rules="[{ required: true, message: '请选择一种付款方式', trigger: 'change' }]">
                  <!-- <el-input v-model="AddContract.leaseForm.payType"></el-input> -->
                  <el-select v-model="AddContract.leaseForm.payType"
                    placeholder="付款方式">
                    <el-option label="月付"
                      value="MONTHLY_PAYMENT"></el-option>
                    <el-option label="二月付"
                      value="DOUBLE_MONTH_PAY"></el-option>
                    <el-option label="季付"
                      value="QUARTERLY_PAYMENT"></el-option>
                    <el-option label="半年付"
                      value="HALF_YEAR_PAY"></el-option>
                    <el-option label="年付"
                      value="YEARLY_PAYMENT"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="租金递增："
                  prop="leaseForm.payRate"
                  :rules="[
                       { pattern: /^(([1-9]|[12][0-9]|30)|(([1-9]|[12][0-9])\.[0-9]{1,2}))$/, message: '必须为小于30' },
                      ]">
                  <el-input v-model="AddContract.leaseForm.payRate">
                    <template slot="append">%/年</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item label="免租期："
                  prop="leaseForm.rentFreeDays"
                  :rules="[
                      { pattern: /^[0-9]{1,3}$/, message: '输入长度在 1 到 3 位' },
                      { pattern: /^[1-9]\d*$/, message: '请输入正整数' }
                      ]">
                  <el-input v-model="AddContract.leaseForm.rentFreeDays">
                    <template slot="append">天/年</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="装修期："
                  prop="leaseForm.decorateDays"
                  :rules="[
                      { required: true, message: '请输入装修期', trigger: 'blur' },
                      { pattern: /^[1-9]\d*$/, message: '请输入正整数' }
                      ]">
                  <el-input v-model="AddContract.leaseForm.decorateDays">
                    <template slot="append">天</template>
                  </el-input>
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
                <el-form-item label="租期起始："
                  prop="leaseForm.leaseCreateTime"
                  type="date"
                  size="mini"
                  :rules="[{ required: true, message: '请输入租期起始', trigger: 'blur' }]">
                  <el-date-picker v-model="AddContract.leaseForm.leaseCreateTime"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    type="date">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="租期结束："
                  prop="leaseForm.leaseFinalTime"
                  type="date"
                  size="mini"
                  :rules="[{ required: true, message: '请输入租期结束', trigger: 'blur' }]">
                  <el-date-picker v-model="AddContract.leaseForm.leaseFinalTime"
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
          <header class="model-header">收租账号</header>
          <div class="pd-ten pdt-20 pdr-20">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="姓名："
                  prop="rentAcctName"
                  :rules="[
                            { required: true, message: '请输入业主姓名', trigger: 'blur'},
                            { min: 2, max: 12, message: ' 长度在 2 到 12 个字符 ', trigger: 'blur'}
                          ]">
                  <el-input v-model="AddContract.rentAcctName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="开户银行："
                  prop="rentAcctBank"
                  :rules="[
                            { required: true, message: '请输入开户银行', trigger: 'blur'},
                            { min: 2, max: 12, message: ' 长度在 2 到 30 个字符 ', trigger: 'blur'}
                          ]">
                  <el-input v-model="AddContract.rentAcctBank"></el-input>
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
                  <el-input v-model="AddContract.rentAcctBankcardId"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="model-border">
          <header class="model-header">业主身份证
            <span v-if="IdCardPic"
              class="font-red">请上传完整的身份证图片</span>
          </header>
          <div class="pd-ten">
            <div class="clearfix">
              <file-upload v-show="!filesIDcard.length"
                class="file-upload"
                :post-action="postAction"
                :extensions="extensions"
                :accept="accept"
                :maximum="2"
                :multiple="multiple"
                :size="size || 0"
                :thread="thread < 1 ? 1 : (thread > 5 ? 5 : thread)"
                :headers="headers"
                :data="data"
                :drop="false"
                :drop-directory="dropDirectory"
                :add-index="addIndex"
                v-model="filesIDcard"
                @input-filter="inputFilter"
                @input-file="inputFile"
                ref="uploadIDcard">
                <p class="pdt-30">
                  <span class="upload-img">
                    <i class="icon iconfont icon-tianjia add-font"></i>
                  </span>
                  <span class="inb-100">添加正面图</span>
                </p>
              </file-upload>
              <div class="img-item"
                v-for="(file) in filesIDcard"
                :key="file.id">
                <div class="img-item-content">
                  <div v-if="(file.error && !file.typeInfo) || updateImg(file)"
                    class="upload-info">
                    <p class="c-red font-c font-w">上传失败</p>
                    <!-- <p v-else-if="file.success">success</p>
                        <p v-else-if="file.active">active</p> -->
                  </div>
                  <span class="del-img"
                    @click.prevent="$refs.uploadIDcard.remove(file)">
                    <i class="icon iconfont icon-lajitong"></i>
                  </span>
                  <div class="progress"
                    v-if="file.active || file.progress !== '0.00' && file.progress != 100.00 && !file.typeInfo">
                    <div :class="{'progress-bar': true, 'progress-bar-striped': true, 'bg-danger': file.error, 'progress-bar-animated': file.active}"
                      role="progressbar"
                      :style="{width: file.progress + '%'}">{{file.progress}}%</div>
                  </div>
                  <img class="img-content"
                    v-if="file.thumb"
                    :src="file.thumb"
                    @click="con(file)" />
                </div>
                <div class="img-type">
                </div>
              </div>

              <file-upload v-show="!filesIDVerse.length"
                class="file-upload"
                :post-action="postAction"
                :extensions="extensions"
                :accept="accept"
                :maximum="2"
                :multiple="multiple"
                :size="size || 0"
                :thread="thread < 1 ? 1 : (thread > 5 ? 5 : thread)"
                :headers="headers"
                :data="data"
                :drop="false"
                :drop-directory="dropDirectory"
                :add-index="addIndex"
                v-model="filesIDVerse"
                @input-filter="inputFilter"
                @input-file="inputFile"
                ref="uploadIDVerse">
                <p class="pdt-30">
                  <span class="upload-img">
                    <i class="icon iconfont icon-tianjia add-font"></i>
                  </span>
                  <span class="inb-100">添加反面图</span>
                </p>
              </file-upload>
              <div class="img-item"
                v-for="(file) in filesIDVerse"
                :key="file.id">
                <div class="img-item-content">
                  <div v-if="(file.error && !file.typeInfo) || updateImg(file)"
                    class="upload-info">
                    <p class="c-red font-c font-w">上传失败</p>
                    <!-- <p v-else-if="file.success">success</p>
                        <p v-else-if="file.active">active</p> -->
                  </div>
                  <span class="del-img"
                    @click.prevent="$refs.uploadIDVerse.remove(file)">
                    <i class="icon iconfont icon-lajitong"></i>
                  </span>
                  <div class="progress"
                    v-if="file.active || file.progress !== '0.00' && file.progress != 100.00 && !file.typeInfo">
                    <div :class="{'progress-bar': true, 'progress-bar-striped': true, 'bg-danger': file.error, 'progress-bar-animated': file.active}"
                      role="progressbar"
                      :style="{width: file.progress + '%'}">{{file.progress}}%</div>
                  </div>
                  <img class="img-content"
                    v-if="file.thumb"
                    :src="file.thumb"
                    @click="con(file)" />
                </div>
                <div class="img-type">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="model-border">
          <header class="model-header">房产证
            <span class="font-default">(限5张)</span>
            <span v-if="housePic"
              class="font-red">至少上传一张图片</span>
          </header>
          <div class="pd-ten">
            <div class="clearfix">
              <file-upload class="file-upload"
                :post-action="postAction"
                :extensions="extensions"
                :accept="accept"
                :maximum="5"
                :multiple="multiple"
                :size="size || 0"
                :thread="thread < 1 ? 1 : (thread > 5 ? 5 : thread)"
                :headers="headers"
                :data="data"
                :drop="drop"
                :drop-directory="dropDirectory"
                :add-index="addIndex"
                v-model="filesHouse"
                @input-filter="inputFilter"
                @input-file="inputFile"
                ref="uploadHouse">
                <p class="pdt-30">
                  <span class="upload-img">
                    <i class="icon iconfont icon-tianjia add-font"></i>
                  </span>
                  <span class="inb-100">添加图片</span>
                </p>
              </file-upload>
              <div class="img-item"
                v-for="(file) in filesHouse"
                :key="file.id">
                <div class="img-item-content">
                  <div v-if="(file.error && !file.typeInfo) || updateImg(file)"
                    class="upload-info">
                    <p class="c-red font-c font-w">上传失败</p>
                    <!-- <p v-else-if="file.success">success</p>
                        <p v-else-if="file.active">active</p> -->
                  </div>
                  <span class="del-img"
                    @click.prevent="$refs.uploadHouse.remove(file)">
                    <i class="icon iconfont icon-lajitong"></i>
                  </span>
                  <div class="progress"
                    v-if="file.active || file.progress !== '0.00' && file.progress != 100.00 && !file.typeInfo">
                    <div :class="{'progress-bar': true, 'progress-bar-striped': true, 'bg-danger': file.error, 'progress-bar-animated': file.active}"
                      role="progressbar"
                      :style="{width: file.progress + '%'}">{{file.progress}}%</div>
                  </div>
                  <img class="img-content"
                    v-if="file.thumb"
                    :src="file.thumb"
                    @click="con(file)" />
                </div>
                <div class="img-type">
                  <!-- <el-input  v-model="file.pictureType"></el-input> -->
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="model-border">
          <header class="model-header">合同附件
            <span class="font-default">(限5张)</span>
            <span v-if="contractPic"
              class="font-red">至少上传一张图片</span>
          </header>
          <div class="pd-ten">
            <div class="clearfix">
              <file-upload class="file-upload"
                :post-action="postAction"
                :extensions="extensions"
                :accept="accept"
                :maximum="5"
                :multiple="multiple"
                :size="size || 0"
                :thread="thread < 1 ? 1 : (thread > 5 ? 5 : thread)"
                :headers="headers"
                :data="data"
                :drop="drop"
                :drop-directory="dropDirectory"
                :add-index="addIndex"
                v-model="filesContract"
                @input-filter="inputFilter"
                @input-file="inputFile"
                ref="uploadContract">
                <p class="pdt-30">
                  <span class="upload-img">
                    <i class="icon iconfont icon-tianjia add-font"></i>
                  </span>
                  <span class="inb-100">添加图片</span>
                </p>
              </file-upload>
              <div class="img-item"
                v-for="(file) in filesContract"
                :key="file.id">
                <div class="img-item-content">
                  <div v-if="(file.error && !file.typeInfo) || updateImg(file)"
                    class="upload-info">
                    <p class="c-red font-c font-w">上传失败</p>
                    <!-- <p v-else-if="file.success">success</p>
                        <p v-else-if="file.active">active</p> -->
                  </div>
                  <span class="del-img"
                    @click.prevent="$refs.uploadContract.remove(file)">
                    <i class="icon iconfont icon-lajitong"></i>
                  </span>
                  <div class="progress"
                    v-if="file.active || (file.progress !== '0.00' && file.progress != 100.00) && !file.typeInfo">
                    <div :class="{'progress-bar': true, 'progress-bar-striped': true, 'bg-danger': file.error, 'progress-bar-animated': file.active}"
                      role="progressbar"
                      :style="{width: file.progress + '%'}">{{file.progress}}%</div>
                  </div>
                  <img class="img-content"
                    v-if="file.thumb"
                    :src="file.thumb"
                    @click="con(file)" />
                </div>
                <div class="img-type">
                </div>
              </div>
            </div>
          </div>
        </div>

      </el-form>
    </div>
    <div class="dialog-footer">
      <el-button type="primary"
        size="mini"
        @click="handleSubmit">提交</el-button>
      <el-button size="mini"
        @click="closeDialog">取消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import FileUpload from 'vue-upload-component';
export default {
  data() {
    return {
      contarctUrl: '/security/room/contract/add',
      num1: 1,
      contarctTitle: '添加合同',
      IdCardPic: false,
      housePic: false,
      contractPic: false,
      gardenName: '',
      buildingName: '',
      roomNum: '',
      leaseDays: [],
      BaseData: {
        'buildingName': '',
        'decorateDays': '',
        'depositMoney': '',
        'gardenName': '',
        'leaseCreateTime': '',
        'leaseCreateTimeDesc': '',
        'leaseDays': '',
        'leaseFinalTime': '',
        'leaseFinalTimeDesc': '',
        'leaseRoomPrice': '',
        'number': '',
        'payRate': '',
        'payType': '',
        'payTypeDesc': '',
        'rentFreeDays': '',
        'rentMoney': '',
        'roomId': '00f1cf6f-2eb9-4b4b-ad3c-95a03795dea4'
      },
      AddContract: {
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
        'commitHouse': ''
      },
      // 图片上传的默认参数
      filesIDcard: [],
      filesIDVerse: [],
      filesHouse: [],
      filesContract: [],
      // maximum: 10, // 最大文件数
      accept: 'image/png,image/gif,image/jpeg,image/webp',
      extensions: 'gif,jpg,jpeg,png,webp', // 允许上传的文件后缀
      // extensions: ['gif', 'jpg', 'jpeg','png', 'webp'],
      // extensions: /\.(gif|jpe?g|png|webp)$/i,
      minSize: 1024, // 最小字节
      size: 5242880, // 上传的最大字节
      multiple: true, // 是否支持多文件
      // directory: false, // 是否开启文件夹上传
      drop: true,
      dropDirectory: false, // 是否开启拖拽目录
      addIndex: false,
      thread: 3, // 同时并发上传数量
      name: 'file',
      postAction: '/mshz-mgr/security/room/contract/uploadPicture',
      headers: {},
      data: {},
      autoCompress: 1024 * 1024 * 5, // 压缩图片的值
      uploadAuto: true, //  是否自动上传
      selectParm: {},
      loading: false,
      restaurants: [],
      options: [],
      optionsBuild: [],
      optionsRoomNum: []
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
      this.contarctTitle = '添加合同';
      this.contarctUrl = '/security/room/contract/add';
    }
  },
  methods: {
    // 关闭表格
    closeDialog() {
      this.$emit('changeDialog', false);
    },

    mapPicList(data) {
      if (!(data instanceof Array) && !data.length > 0) {
        return;
      }
      let CategoryPic = [];
      for (var i = 0; i < data.length; i++) {
        let pictureUrl;
        let id;
        if (data[i].success && data[i].response && data[i].response.result) {
          let resultData = JSON.parse(data[i].response.result);
          if (resultData.status === 'C0000') {
            pictureUrl = resultData.result.url;
          }
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
      this.$refs.AddContract.validate((valid) => {
        if (valid) {
          if (!IDVersePicList.length > 0 && !IdCardPicList.length > 0) {
            this.IdCardPic = true;
            return false;
          } else if (!housePicList.length > 0) {
            this.housePic = true;
            return false;
          } else if (!ContractPicList.length > 0) {
            this.contractPic = true;
            return false;
          }
          let selt = this;
          selt.$axios.post(
            this.contarctUrl,
            selt.AddContract
          ).then((res) => {
            if (res.data.status === 'C0000') {
              this.$message.success('合同保存成功');
              selt.$emit('refreshData');
              selt.closeDialog();
            } else {
              this.$message.error(res.data.message);
            }
          });
        } else {
          this.$message.error('请完善表单信息！');
          // console.log('error submit!!');
          return false;
        }
      });
    },

    // 分类返回的图片
    forPicList(list) {
      // let housePic = [];
      // let contractPic = [];
      for (var j = 0, len = list.length; j < len; j++) {
        if (list[j].pictureType === 'IDCARD_FRONT') {
          // 正面
          this.$refs.uploadIDcard.add({
            thumb: list[j].pictureUrl.replace('{size}', '160x120'),
            pictureUrl: list[j].pictureUrl,
            pictureType: list[j].pictureType,
            pictureTypeDesc: list[j].pictureTypeDesc,
            id: list[j].id,
            type: 'image/jpeg',
            typeInfo: 'networkcomin'
          });
        } else if (list[j].pictureType === 'IDCARD_VERSE') {
          // 反面
          this.$refs.uploadIDVerse.add({
            thumb: list[j].pictureUrl.replace('{size}', '160x120'),
            pictureUrl: list[j].pictureUrl,
            pictureType: list[j].pictureType,
            pictureTypeDesc: list[j].pictureTypeDesc,
            id: list[j].id,
            type: 'image/jpeg',
            typeInfo: 'networkcomin'
          });
        } else if (list[j].pictureType === 'HOUSE_CERT') {
          // 房产证
          this.$refs.uploadHouse.add({
            thumb: list[j].pictureUrl.replace('{size}', '160x120'),
            pictureUrl: list[j].pictureUrl,
            pictureType: list[j].pictureType,
            pictureTypeDesc: list[j].pictureTypeDesc,
            id: list[j].id,
            type: 'image/jpeg',
            typeInfo: 'networkcomin'
          });
        } else if (list[j].pictureType === 'CONTRACT_ATTACH' && this.DialogType !== 'Renew') {
          // 合同
          this.$refs.uploadContract.add({
            thumb: list[j].pictureUrl.replace('{size}', '160x120'),
            pictureUrl: list[j].pictureUrl,
            pictureType: list[j].pictureType,
            pictureTypeDesc: list[j].pictureTypeDesc,
            id: list[j].id,
            type: 'image/jpeg',
            typeInfo: 'networkcomin'
          });
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
          }
        }
      ).then((res) => {
        if (res.data.status === 'C0000') {
          this.AddContract = res.data.result;
          this.forPicList(this.AddContract.pictureList);
          this.AddContract.roomId = this.roomId;
          this.AddContract.id = this.contractId;
          this.AddContract.leaseForm.id = this.AddContract.leaseForm.leaseId;
          if (this.DialogType === 'Renew') {
            delete this.AddContract['id'];
            this.AddContract.city = this.AddContract.leaseForm.city;
            this.AddContract.commitHouse = '';
            this.AddContract.signupTime = '';
            this.AddContract.leaseForm.leaseCreateTime = '';
            this.AddContract.leaseForm.leaseFinalTime = '';
          } else {
            this.AddContract.leaseForm.leaseCreateTime = this.AddContract.leaseForm.leaseCreateTimeDesc;
            this.AddContract.leaseForm.leaseFinalTime = this.AddContract.leaseForm.leaseFinalTimeDesc;
            this.AddContract.commitHouse = this.AddContract.commitHouseDesc;
            this.AddContract.signupTime = this.AddContract.signupTimeDesc;
          }
        } else {
          this.$message.error('查询合同失败');
        }
      }).catch((err) => {
        this.$message.error(err.message || '服务器异常');
        console.log(err);
      });
    },

    // 上传图片的方法
    con(file) {
      console.log(file);
    },

    inputFilter(newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        // Before adding a file
        // 添加文件前
        // Filter system files or hide files
        // 过滤系统文件 和隐藏文件
        if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
          return prevent();
        }
        // Filter php html js file
        // 过滤 php html js 文件
        if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
          return prevent();
        }
        // Automatic compression
        // 自动压缩
        // if (newFile.file && newFile.type.substr(0, 6) === 'image/' && this.autoCompress > 0 && this.autoCompress < newFile.size) {
        //   newFile.error = 'compressing';
        //   const imageCompressor = new ImageCompressor(null, {
        //     convertSize: Infinity,
        //     maxWidth: 512,
        //     maxHeight: 512
        //   });
        //   imageCompressor.compress(newFile.file)
        //     .then((file) => {
        //       this.$refs.uploadIDcard.update(newFile, { error: '', file, size: file.size, type: file.type });
        //       this.$refs.uploadHouse.update(newFile, { error: '', file, size: file.size, type: file.type });
        //       this.$refs.uploadContract.update(newFile, { error: '', file, size: file.size, type: file.type });
        //       this.$refs.uploadIDVerse.update(newFile, { error: '', file, size: file.size, type: file.type });
        //     })
        //     .catch((err) => {
        //       this.$refs.uploadIDcard.update(newFile, { error: err.message || 'compress' });
        //       this.$refs.uploadHouse.update(newFile, { error: err.message || 'compress' });
        //       this.$refs.uploadContract.update(newFile, { error: err.message || 'compress' });
        //       this.$refs.uploadIDVerse.update(newFile, { error: err.message || 'compress' });
        //     });
        // }
      }
      if (newFile && (!oldFile || newFile.file !== oldFile.file) && !newFile.typeInfo) {
        // typeInfo 是否是后台返回的
        // Create a blob field
        // 创建 blob 字段
        newFile.blob = '';
        newFile.pictureType = '';
        let URL = window.URL || window.webkitURL;
        if (URL && URL.createObjectURL) {
          newFile.blob = URL.createObjectURL(newFile.file);
        }
        // Thumbnails
        // 缩略图
        newFile.thumb = '';
        if (newFile.blob && newFile.type.substr(0, 6) === 'image/') {
          newFile.thumb = newFile.blob;

          let img = new Image();  // 手动创建一个Image对象
          img.src = newFile.thumb;// 创建Image的对象的url
          let that = this;
          img.onload = function() {
            if (this.width < 800 && this.height < 600) {
              that.$refs.uploadIDcard.update(newFile, { error: 'sominsize' });
              that.$refs.uploadHouse.update(newFile, { error: 'sominsize' });
              that.$refs.uploadContract.update(newFile, { error: 'sominsize' });
              that.$refs.uploadIDVerse.update(newFile, { error: 'sominsize' });
              that.$message({
                type: 'warning',
                message: '图片高要大于600px，宽要大于800px'
              });
            }
          };
          img = null;
        }
      }
    },

    // add, update, remove File Event
    inputFile(newFile, oldFile) {
      if (newFile && oldFile) {
        // update
        if (newFile.active && !oldFile.active) {
          // beforeSend
          // min size
          if (newFile.size >= 0 && this.minSize > 0 && newFile.size < this.minSize) {
            this.$refs.uploadIDcard.update(newFile, { error: 'sominsize' });
            this.$refs.uploadHouse.update(newFile, { error: 'sominsize' });
            this.$refs.uploadContract.update(newFile, { error: 'sominsize' });
            this.$refs.uploadIDVerse.update(newFile, { error: 'sominsize' });
          }
          if (newFile.size >= 0 && this.size > 0 && newFile.size > this.size) {
            this.$refs.uploadIDcard.update(newFile, { error: 'sobig' });
            this.$refs.uploadHouse.update(newFile, { error: 'sobig' });
            this.$refs.uploadContract.update(newFile, { error: 'sobig' });
            this.$refs.uploadIDVerse.update(newFile, { error: 'sobig' });
          }
        }
        if (newFile.progress !== oldFile.progress) {
          // progress
        }
        if (newFile.error && !oldFile.error) {
          // error
        }
        if (newFile.success && !oldFile.success) {
          // success
          this.$refs.uploadIDcard.update(newFile, { pictureType: 'IDCARD_FRONT' });
          this.$refs.uploadHouse.update(newFile, { pictureType: 'HOUSE_CERT' });
          this.$refs.uploadContract.update(newFile, { pictureType: 'CONTRACT_ATTACH' });
          this.$refs.uploadIDVerse.update(newFile, { pictureType: 'IDCARD_VERSE' });
        }
      }
      if (!newFile && oldFile) {
        // remove
        if (oldFile.success && oldFile.response.id) {
          // $.ajax({
          //   type: 'DELETE',
          //   url: '/upload/delete?id=' + oldFile.response.id,
          // })
        }
      }
      // 自动上传
      if (Boolean(newFile) !== Boolean(oldFile) || oldFile.error !== newFile.error) {
        if (this.uploadAuto && !this.$refs.uploadIDcard.active) {
          this.$refs.uploadIDcard.active = true;
        }
        if (this.uploadAuto && !this.$refs.uploadHouse.active) {
          this.$refs.uploadHouse.active = true;
        }
        if (this.uploadAuto && !this.$refs.uploadContract.active) {
          this.$refs.uploadContract.active = true;
        }
        if (this.uploadAuto && !this.$refs.uploadIDVerse.active) {
          this.$refs.uploadIDVerse.active = true;
        }
      }
    },

    // 楼盘联想
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;

        this.$axios.get(
          '/security/room/manage/searchGarden',
          {
            params: {
              searchName: query
            }
          }
        ).then((res) => {
          if (res.data.status === 'C0000') {
            this.restaurants = res.data.result.map((item) => {
              return {
                value: item.gardenName,
                label: item.gardenName
              };
            });
            this.loading = false;
            this.options = this.restaurants.filter(item => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          } else {

          }
        }).catch((res) => {
          console.log(res);
        });
      } else {
        this.options = [];
      }
    },

    // 单价计算
    countPrice() {
      if (this.AddContract.leaseForm.rentMoney && this.AddContract.leaseForm.area) {
        this.AddContract.leaseForm.leaseRoomPrice = (this.AddContract.leaseForm.rentMoney / this.AddContract.leaseForm.area).toFixed(2);
      }
    },

    selectGardenName(val) {
      this.$axios.get(
        '/security/room/manage/searchBuilding',
        {
          params: {
            gardenName: this.AddContract.leaseForm.gardenName
          }
        }
      ).then((res) => {
        if (res.data.status === 'C0000') {
          this.optionsBuild = res.data.result;
        } else {
          this.optionsBuild = [];
        }
      });
    },

    selectBuild(val) {
      this.$axios.get(
        '/security/room/manage/searchRoomNum',
        {
          params: {
            gardenName: this.AddContract.leaseForm.gardenName,
            buildingName: this.AddContract.leaseForm.buildingName
          }
        }
      ).then((res) => {
        if (res.data.status === 'C0000') {
          this.optionsRoomNum = res.data.result;
        } else {
          this.optionsRoomNum = [];
        }
      });
    },

    selectRoomNum(val) {
      if (!val) {
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

    updateImg(data) {
      if (data.typeInfo || data.error || data.active) {
        return false;
      }
      if (data.success && data.response.status && data.response.status === 'C0000') {
        return (JSON.parse(data.response.result).status !== 'C0000');
      } else {
        return true;
      }
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
          this.AddContract.city = baseInfo.city;
          this.AddContract.leaseForm.rentMoney = baseInfo.rentMoney;
          this.AddContract.leaseForm.leaseRoomPrice = baseInfo.leaseRoomPrice;
          this.AddContract.leaseForm.depositMoney = baseInfo.depositMoney;
          this.AddContract.leaseForm.payType = baseInfo.payType;
          this.AddContract.leaseForm.payRate = baseInfo.payRate;
          this.AddContract.leaseForm.rentFreeDays = baseInfo.rentFreeDays;
          this.AddContract.leaseForm.decorateDays = baseInfo.decorateDays;
          this.AddContract.leaseForm.area = baseInfo.area;
          this.AddContract.leaseForm.id = baseInfo.leaseId;
          if (this.DialogType === 'Contract') {
            this.AddContract.leaseForm.gardenName = baseInfo.gardenName;
            this.AddContract.leaseForm.buildingName = baseInfo.buildingName;
            this.AddContract.leaseForm.number = baseInfo.number;
            this.AddContract.leaseForm.id = baseInfo.leaseId;
          }
        }
      }).catch((e) => {
        console.log(e);
      });
    }
  },
  components: {
    FileUpload
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
</style>
