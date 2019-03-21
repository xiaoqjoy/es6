<template>
  <section>
    <div class="dialog-box">
      <div class="head-info pd-10-20">

        <h3 class="font-l pdb-10">{{houseForm.room.gardenName}}</h3>

        <div class="font-l">
          <span class="head-info-item">楼栋：{{houseForm.room.buildingName}}</span>

          <span class="head-info-item">房号：{{houseForm.room.number}}</span>

          <span class="head-info-item">{{houseForm.room.bedRoom}}房{{houseForm.room.livingRoom}}厅{{houseForm.room.toilet}}卫{{houseForm.room.kitchen}}厨{{houseForm.room.balcony}}阳</span>

          <span class="head-info-item">{{houseForm.room.area}}平方</span>

          <span class="head-info-item">{{houseForm.room.rentUseTypeDesc}}</span>
        </div>
      </div>
      <div class="pd-ten bgceee">
        <el-form size="mini"
          label-position="right"
          label-width="90px"
          ref="houseFormEdit"
          :model="houseForm"
          :rules="FormRules">
          <div class="house-base-info model-border pdt-20 pdl-20 pdr-20">
            <el-row>
              <el-col>
                <el-form-item label="房间标题："
                  prop="title">
                  <el-input v-model="houseForm.title"
                    clearable>
                    <template slot="append">限30个字</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="平日价格："
                  prop="price">
                  <el-input v-model="houseForm.price">
                    <template slot="append">元</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="周末价格："
                  prop="priceWeekend">
                  <el-input v-model="houseForm.priceWeekend">
                    <template slot="append">元</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item prop="weekend">
                  <el-checkbox-group v-model="houseForm.weekend">
                    <el-checkbox label="5"
                      name="周五">周五</el-checkbox>
                    <el-checkbox label="6"
                      name="type">周六</el-checkbox>
                    <el-checkbox label="7"
                      name="type">周日</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="床数："
                  prop="bedCount">
                  <el-input v-model.number="houseForm.bedCount"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="床规格："
                  prop="bedDesc">
                  <!-- <el-input v-model="houseForm.bedDesc">
                    <template slot="append">m</template>
                  </el-input> -->
                  <el-autocomplete v-model="houseForm.bedDesc"
                    :fetch-suggestions="querySearchBed">
                    <template slot="append">m</template>
                  </el-autocomplete>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="宜住人数："
                  prop="customerCount">
                  <el-input v-model.number="houseForm.customerCount"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div class="manager model-border house-info">
            <header class="model-header header-info">
              <span>管家</span>
              <el-button type="text"
                size="mini"
                class="owner-add"
                @click="manageDialog = true">
                <i class="icon iconfont icon-tianjia font-14"></i>添加</el-button>
            </header>
            <div class="pd-ten pdb-20">
              <el-row :gutter="15"
                v-for="(item, index) in houseForm.managers"
                :key="index"
                class="bd-eee">
                <el-col :span="9"
                  :offset="1">
                  <p class="content-item  font-l pdv-ten">
                    <span class="content-item-label">管家：</span>{{item.name}}
                  </p>
                </el-col>
                <el-col :span="9">
                  <p class="content-item  font-l pdv-ten">
                    <span class="content-item-label">手机：</span>{{item.phone}}
                  </p>
                </el-col>
                <el-col :span="5">
                  <div class="owner-del pdv-ten"
                    v-if="houseForm.managers.length > 1">
                    <el-button plain
                      size="mini"
                      @click="delManage(index)">删除</el-button>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="model-border">
            <header class="model-header">设施服务</header>
            <div class="pd-ten pdt-20">
              <el-form-item label="居家：">
                <div class="checkbox font-l">
                  <el-checkbox-group v-model="facilityForm.JUJIA">
                    <el-checkbox name="电视"
                      label="DIANSHI"
                      border>电视</el-checkbox>
                    <el-checkbox name="洗衣机"
                      label="XIYIJI"
                      border>洗衣机</el-checkbox>
                    <el-checkbox name="冰箱"
                      label="BINGXIANG"
                      border>冰箱</el-checkbox>
                    <el-checkbox name="WIFI"
                      label="WIFI"
                      border>WIFI</el-checkbox>
                    <el-checkbox name="空调"
                      label="KONGTIAO"
                      border>空调</el-checkbox>
                    <el-checkbox name="电水壶"
                      label="DIANSHUIHU"
                      border>电水壶</el-checkbox>
                    <el-checkbox name="电吹风"
                      label="DIANCHUIFENG"
                      border>电吹风</el-checkbox>
                    <el-checkbox name="熨斗"
                      label="YUNDOU"
                      border>熨斗</el-checkbox>
                  </el-checkbox-group>
                </div>
              </el-form-item>
              <el-form-item label="卫浴：">
                <div class="checkbox font-l">
                  <el-checkbox-group v-model="facilityForm.WEIYU">
                    <el-checkbox name="热水"
                      label="RESHUI"
                      border>热水</el-checkbox>
                    <el-checkbox name="卫浴"
                      label="WEIYU"
                      border>卫浴</el-checkbox>
                    <el-checkbox name="毛巾"
                      label="MAOJIN"
                      border>毛巾</el-checkbox>
                    <el-checkbox name="浴巾"
                      label="YUJIN"
                      border>浴巾</el-checkbox>
                    <el-checkbox name="牙具"
                      label="YAJU"
                      border>牙具</el-checkbox>
                    <el-checkbox name="香皂"
                      label="XIANGZAO"
                      border>香皂</el-checkbox>
                    <el-checkbox name="洗发水"
                      label="XIFASHUI"
                      border>洗发水</el-checkbox>
                    <el-checkbox name="卫生纸"
                      label="WEISHENGZHI"
                      border>卫生纸</el-checkbox>
                  </el-checkbox-group>
                </div>
              </el-form-item>
              <el-form-item label="厨房：">
                <div class="checkbox font-l">
                  <el-checkbox-group v-model="facilityForm.CHUFANG">
                    <el-checkbox name="电磁炉"
                      label="DIANCILU"
                      border>电磁炉</el-checkbox>
                    <el-checkbox name="锅具"
                      label="GUOJU"
                      border>锅具</el-checkbox>
                    <el-checkbox name="刀具"
                      label="DAOJU"
                      border>刀具</el-checkbox>
                    <el-checkbox name="电饭煲"
                      label="DIANFANBAO"
                      border>电饭煲</el-checkbox>
                    <el-checkbox name="餐具"
                      label="CANJU"
                      border>餐具</el-checkbox>
                  </el-checkbox-group>
                </div>

              </el-form-item>
              <el-form-item label="娱乐：">
                <div class="checkbox font-l">
                  <el-checkbox-group v-model="facilityForm.YUYE">
                    <el-checkbox name="KTV"
                      label="KTV"
                      border>KTV</el-checkbox>
                    <el-checkbox name="台球"
                      label="TAIQIU"
                      border>台球</el-checkbox>
                  </el-checkbox-group>
                </div>
              </el-form-item>
            </div>
          </div>
          <div class="model-border">
            <header class="model-header">入住须知</header>
            <div class="pd-ten pdt-20 pdl-20 pdr-20">
              <el-row :gutter="20">
                <el-col :span="6">
                  <el-form-item label="入住时间："
                    prop="inTime">
                    <el-time-picker v-model="houseForm.inTime"
                      value-format="HH:mm"
                      default-value="14:00"
                      prefix-icon="el-icon-time"
                      placeholder="任意时间点">
                    </el-time-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="退房时间："
                    prop="outTime">
                    <el-time-picker v-model="houseForm.outTime"
                      format="HH:mm"
                      value-format="HH:mm"
                      default-value="12:00"
                      prefix-icon="el-icon-time"
                      placeholder="任意时间点">
                    </el-time-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="押金："
                    prop="deposit"
                    clearable>
                    <el-input v-model="houseForm.deposit">
                      <template slot="append">元</template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-form-item label="房屋守则：">
                    <el-input type="textarea"
                      v-model="houseForm.remark"
                      :maxlength="300"
                      :autosize="{ minRows: 2}"
                      placeholder="如：1.不允许携带宠物；2.不提供加床服务，不能超远入住。等...">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="model-border">
            <header class="model-header">退订说明</header>
            <div class="pd-ten pdt-20 pdl-20 pdr-20">
              <el-row :gutter="20">
                <el-col :span="6">
                  <el-form-item label="是否允许："
                    prop="cancelAble">
                    <el-radio-group v-model="houseForm.cancelAble">
                      <el-radio :label="true">是</el-radio>
                      <el-radio :label="false">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item>
                    <el-row>
                      <el-col :span="10">
                        <span>离入住时间大于:</span>
                      </el-col>
                      <el-col :span="10">
                        <el-input v-model="houseForm.cancelDays"
                          :disabled="!houseForm.cancelAble"
                          clearable>
                          <template slot="append">天</template>
                        </el-input>
                      </el-col>
                    </el-row>

                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-form-item label="退订说明：">
                    <el-input type="textarea"
                      v-model="houseForm.cancelRemark"
                      :maxlength="300"
                      :autosize="{ minRows: 2}">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="model-border">
            <header class="model-header">房源描述</header>
            <div class="formdesc">
              <el-form-item prop="desc">
                <el-input type="textarea"
                  v-model="houseForm.desc"
                  :maxlength="500"
                  :autosize="{ minRows: 2}"
                  placeholder="请输入房源描述">
                </el-input>
              </el-form-item>
            </div>
          </div>
        </el-form>
        <div class="model-border">
          <header class="header-info">房源图片
            <span class="font-default">(限10张)</span>
            <span v-if="housePics"
              class="font-red">至少上传一张图片</span>
          </header>
          <div :class="{'borderRed': housePics ,'clearfix': true, 'pdb-20': true}">
            <my-image-upload ref="imageUpload"
              :showError="housePics"
              v-model="houseImages.files"
              :haveMian="true"
              :postAction="'/mshz-mgr/security/room/situation/uploadPicture'"
              :pictureTypeList="baseData.Picture"
              :maximum="10">
            </my-image-upload>
          </div>
        </div>
      </div>
    </div>
    <div class="dialog-footer">
      <el-button type="primary"
        size="mini"
        :loading="auditting"
        :disabled="submitting"
        v-if="houseForm.status !== 'ENABLED'"
        @click="handleSave('/security/room/situation/saveAndUp')">{{auditting? '执行中...' : '上架'}}</el-button>
      <el-button type="danger"
        size="mini"
        :disabled="auditting"
        :loading="submitting"
        @click="handleSave('/security/room/situation/save')">{{submitting? '执行中...' : '保存'}}</el-button>
      <el-button size="mini"
        @click="closeDialog">取消</el-button>

    </div>

    <el-dialog :visible.sync='manageDialog'
      :close-on-click-modal="false"
      width="950px"
      append-to-body>
      <organization v-if="manageDialog"
        v-on:addManager="handleAddManager"
        :managers="houseForm.managers"></organization>
      <!-- v-on:addManager="handleAddManager" -->
    </el-dialog>

  </section>

</template>

<script>
import FileUpload from 'vue-upload-component';
import Organization from './Organization';
import MyImageUpload from '@/components/MyImageUpload';
export default {
  data() {
    let depositRules = (rule, value, callback) => {
      // value = value.trim();
      if (+value === 0) {
        callback();
      } else if (!(/^[1-9]\d*00$/).test(value)) {
        callback(new Error('请输入100的倍数'));
      }
      callback();
    };
    return {
      requestSource: null, // 取消请求
      submitting: false, // 正在提交保存
      auditting: false, // 正在提交保存
      hasMain: false,
      depositRules,
      manageDialog: false,
      baseData: {},
      facilityForm: {
        JUJIA: [],
        WEIYU: [],
        CHUFANG: [],
        YUYE: []
      },
      houseForm: {
        bedCount: 1, // 床数
        bedDesc: '1.8*2', // 床规格
        cancelAble: 'false', // 是否允许退订
        cancelDays: 3, // 离入住时间大于
        cancelRemark: '', // 离入住时间大于
        customerCount: 2, // 适宜居住人数
        deposit: 300, // 押金
        desc: '', // 房源描述
        furnitures: [],
        id: '',
        inTime: '14:00', // 入住时间
        outTime: '12:00', // 离店时间
        price: 200, // 平日价格
        priceWeekend: 300, // 周末价格
        remark: '', // 补充说明
        title: '', // 标题
        managers: [ // 管家
          { 'name': '', 'managerId': '' }
        ],
        pictures: [ // 房源图片
          {
            'id': '',
            'main': false,
            'type': '',
            'url': ''
          }
        ],
        weekend: [], // 周末日设置，‘5，6，7’
        room: {
          gardenName: '',
          bulidingName: '',
          bedRoom: '', // 房间数
          livingRoom: '', // 客厅数
          toilet: '', // 厕所数
          kitchen: '', // 厨房数
          balcony: '', // 阳台数
          rentUseTypeDesc: '',
          area: ''
        }
      },
      FormRules: {
        bedCount: [
          { required: true, message: '请输入床数', trigger: 'blur' },
          { pattern: /^[0-9]\d*$/, message: '请输入1到10的数' }
        ], // 床数
        bedDesc: [
          { required: true, message: '请输入床规格', trigger: 'blur' },
          { min: 2, max: 10, message: ' 长度在 2 到 10 个字符 ', trigger: 'blur' }
        ], // 床规格
        cancelAble: [{ required: true, message: '请至少选择一个', trigger: 'change' }], // 是否允许退订
        cancelDays: [], // 离入住时间大于
        cancelRemark: [], // 离入住时间大于
        customerCount: [
          { required: true, message: '请输入适宜居住人数', trigger: 'blur' },
          { pattern: /^[0-9]\d*$/, message: '请输入正整数' },
          // { min: 1, max: 4, message: "长度在 1 到 3 位", trigger: "blur" },
          { pattern: /^[0-9]{1,2}$/, message: '输入长度在 1 到 2 位数' }
        ], // 适宜居住人数
        deposit: [{ validator: depositRules, trigger: 'blur' }], // 押金;
        desc: [
          { required: true, message: '请输入房源描述', trigger: 'blur' },
          { min: 2, max: 500, message: ' 长度在 2 到 10 个字符 ', trigger: 'blur' }
        ], // 房源描述
        furnitures: [],
        inTime: [{ required: true, message: '请选择时间', trigger: 'change' }], // 入住时间
        outTime: [{ required: true, message: '请选择时间', trigger: 'change' }], // 离店时间
        price: [
          { required: true, message: '请输入平日价格', trigger: 'blur' },
          { pattern: /^\d{1,5}(\.\d+)?$/, message: '整数长度在 1 到 5 位' },
          { pattern: /^[0-9]+(.[0-9]{1,2})?$/, message: '最多支持两位小数' }
        ], // 平日价格
        priceWeekend: [
          { required: true, message: '请输入周末价格', trigger: 'blur' },
          { pattern: /^\d{1,5}(\.\d+)?$/, message: '整数长度在 1 到 5 位' },
          { pattern: /^[0-9]+(.[0-9]{1,2})?$/, message: '最多支持两位小数' }
        ], // 周末价格
        remark: [], // 补充说明
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 2, max: 30, message: ' 长度在 2 到 30 个字符 ', trigger: 'blur' }
        ], // 标题
        weekend: [{ type: 'array', required: true, message: '请至少选择一天', trigger: 'change' }]
      },
      // 图片上传的默认参数
      housePics: false,
      houseImages: { files: [] }
    };
  },
  props: ['roomId', 'id'],
  created() {
    this.requestData();
    this.requestBaseData();
  },
  methods: {
    // 获取下来框的数据
    requestBaseData() {
      this.$axios.get(
        '/security/room/queryReturn'
      ).then((res) => {
        this.baseData = JSON.parse(res.data.result);
        // JSON.stringify(jsonobj)
      }).catch((e) => {
        console.log(e);
      });
    },

    // 获取楼盘基本信息
    requestData() {
      this.$axios.get(
        '/security/room/situation/pickSituation',
        {
          params: {
            id: this.id
          }
        }
      ).then((res) => {
        if (res.data.status === 'C0000') {
          const houseBase = res.data.result;
          // this.houseForm.id = this.id;
          this.houseForm.id = houseBase.id;
          this.houseForm = houseBase;
          // this.houseForm.outTime = '12:00';
          // this.houseForm.inTime = '13:00';
          this.houseForm.outTime = this.houseForm.outTimeDesc;
          this.houseForm.inTime = this.houseForm.inTimeDesc;
          this.furnitureForm(houseBase.weekend);
          var picList = res.data.result.pictures.map((item, index) => {
            return {
              // item.thumb = item.pictureUrl.replace('{size}', '300x300')
              thumb: item.url.replace('{size}', '160x120'),
              pictureUrl: item.url,
              pictureType: item.type,
              pictureTypeDesc: item.pictureTypeDesc,
              id: item.id,
              main: item.main,
              typeInfo: 'networkcomin'
            };
          });
          // this.$nextTick(() => {
          //   this.$refs.upload.add(picList);
          // });
          this.houseImages.files = picList;
          this.houseForm.pictures = [];
        } else {

        }
      }).catch((e) => {
        console.log(e);
      });
    },

    // 修改图片列表的数据结构符合发请求
    mapPicList() {
      if (this.houseImages.files.length > 0) {
        this.houseForm.pictures = [];
        for (var i = 0; i < this.houseImages.files.length; i++) {
          let url;
          let id;
          let type = this.houseImages.files[i].pictureType;
          let main = this.houseImages.files[i].main;
          if (main) {
            this.hasMain = true;
          }
          // 上传的图片
          if (this.houseImages.files[i].success && this.houseImages.files[i].response && this.houseImages.files[i].response.result) {
            let resultData = JSON.parse(this.houseImages.files[i].response.result);
            if (resultData.status === 'C0000') {
              url = resultData.result.url;
            }
            // url = JSON.parse(this.houseImages.files[i].response.result).result.url;
          } else if (this.houseImages.files[i].typeInfo) {
            // 请求返回的图片
            url = this.houseImages.files[i].pictureUrl;
            id = this.houseImages.files[i].id;
          }
          if (url) {
            this.houseForm.pictures.push({
              url,
              type,
              main,
              id
            });
          }
        }

        if (!this.hasMain) {
          this.$message.warning('请设置封面图！');
          return false;
        }
        if (!this.houseForm.pictures.length > 0) {
          this.$message({
            type: 'warning',
            message: '请上传图片',
            duration: 3000
          });
          this.housePics = true;
          return false;
        } else {
          this.housePics = false;
          return true;
        }
      } else {
        this.$message({
          type: 'warning',
          message: '请上传图片',
          duration: 3000
        });
        this.houseForm.pictures = [];
        this.housePics = true;
        return false;
      }
    },
    // 数据返回改格式
    furnitureForm(wek) {
      const list = this.houseForm.furnitures;
      for (let i = 0; i < list.length; i++) {
        const { type, name } = list[i];
        this.facilityForm[type].push(name);
      }
      if (wek.trim().length > 0) {
        this.houseForm.weekend = wek.split(',');
      } else {
        this.houseForm.weekend = [];
      }
    },

    // 发送数据改格式
    mapFurniture(data, type) {
      if (!(data instanceof Array)) {

      } else if (data.length > 0) {
        return data.map((item, index) => {
          return {
            name: item,
            type: type
          };
        });
      } else {
        return [];
      }
    },

    handleCheckHouseForm() {
      return new Promise((resolve, reject) => {
        this.$refs.houseFormEdit.validate((valid) => {
          if (valid) {
            resolve(valid);
          } else {
            this.$message.error('请完善表单信息！');
            reject(valid);
          }
        });
      });
    },

    // 保存
    handleSave(url) {
      let dat = this.mapPicList();
      if (!dat) {
        return false;
      }
      Promise.all([this.handleCheckHouseForm(), this.$refs.imageUpload.handleCheckType()]).then((res) => {
        const houseDate = JSON.parse(JSON.stringify(this.houseForm));
        // 把图片的数据格式转为符合请求的
        // 把设施服务的数据拼接为一个数组
        houseDate.furnitures = this.mapFurniture(this.facilityForm.JUJIA, 'JUJIA');
        houseDate.furnitures = houseDate.furnitures.concat(this.mapFurniture(this.facilityForm.WEIYU, 'WEIYU'));
        houseDate.furnitures = houseDate.furnitures.concat(this.mapFurniture(this.facilityForm.CHUFANG, 'CHUFANG'));
        houseDate.furnitures = houseDate.furnitures.concat(this.mapFurniture(this.facilityForm.YUYE, 'YUYE'));
        houseDate.weekend = houseDate.weekend.join(',');
        // this.houseForm.weekend = '5,6,7';
        if (url === '/security/room/situation/saveAndUp') {
          this.auditting = true;
        } else {
          this.submitting = true;
        }
        this.requestSource = this.$axios.CancelToken.source();
        this.$axios.post(
          url,
          houseDate,
          {
            cancelToken: this.requestSource.token
          }
        ).then((res) => {
          this.auditting = false;
          this.submitting = false;
          if (res.data.status === 'C0000') {
            this.$emit('refreshData');
            this.$message.success('操作成功！');
            this.closeDialog('success');
          } else {
            this.$message.error(res.data.message);
          }
        }).catch(err => {
          this.auditting = false;
          this.submitting = false;
          this.$message.error(err.message || '处理失败');
        });
      }).catch((err) => {
        console.log(err);
      });
    },

    // 增删管家
    handleAddManager(data) {
      let managersList = this.houseForm.managers;
      if (managersList.length >= 5) {
        return;
      }
      for (let j = 0; j < managersList.length; j++) {
        if (managersList[j].managerId === data.id) {
          this.$message.warning('该管家已添加');
          return;
        }
      }
      managersList.push({
        name: data.name,
        managerId: data.id,
        phone: data.phone

      });
    },

    delManage(index) {
      this.houseForm.managers.splice(index, 1);
    },

    // 关闭表格
    closeDialog(flag) {
      if (flag !== 'success') {
        this.cancelRequest();
      };
      this.$emit('changeDialog', false);
    },

    // 取消请求
    cancelRequest() {
      if (this.requestSource && typeof this.requestSource.cancel === 'function') {
        // 取消请求
        this.requestSource.cancel('请求已取消！');
      };
    },

    querySearchBed(queryString, cb) {
      var results = [
        { value: '1.8*2.0' },
        { value: '1.5*2.0' },
        { value: '1.2*2.0' },
        { value: '1.0*2.0' }];

      // 调用 callback 返回建议列表的数据
      cb(results);
    }
  },
  components: {
    FileUpload,
    Organization,
    MyImageUpload
  }
};
</script>

<style scoped>
/* .head-info {
  padding-left: 20px;
} */
.head-info-item {
  display: inline-block;
  padding: 0 15px;
  font-size: 14px;
  line-height: 16px;
  color: #999;
  border-left: 1px solid #eee;
}
.head-info-item:first-of-type {
  padding: 0 15px 0 0;
  border-left: none;
}
.header-info {
  text-align: left;
  height: 35px;
  line-height: 35px;
  font-weight: 600;
  padding: 0 20px;
  border-bottom: 1px solid #dddddd;
  background-color: #fafafa;
  color: #333;
}

.owner-add {
  color: #4b83af;
  cursor: pointer;
  float: right;
}
.house-info {
  min-height: 100px;
  border: 1px solid #dddddd;
  margin-bottom: 10px;
  background-color: #fff;
}
/* .border {
  border: 1px solid red;
} */

.bl-button {
  display: inline-block;
  height: 30px;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #a6a6a6;
  color: #5a5e66;
  -webkit-appearance: none;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  padding: 2px;
  font-size: 12px;
  font-weight: inherit;
  border-radius: 3px;
}
.bl-button:hover {
  background-color: #fff;
  border: 1px solid #999;
  color: #666;
}
.bl-button:active {
  background: #fff;
  border-color: #999;
  color: #333;
}
.formdesc {
  margin-left: -90px;
}
.formdesc >>> .el-textarea .el-textarea__inner {
  border: none;
}
.error-border {
  border: 1px solid #fa5555;
}

.rectangle {
  height: 50px;
  width: 26px;
  padding-top: 5px;
  writing-mode: tb-rl;
  line-height: 26px;
  color: #fff;
  background-color: #008842;
}
.rectangle-box {
  position: absolute;
  top: 0;
  left: 10px;
  width: 26px;
}
.span2 {
  height: 13px;
  width: 13px;
  display: block;
  position: relative;
  float: right;
}

.demoSpan2:before {
  content: "";
  height: 0;
  width: 0;
  display: block;
  border: 13px transparent solid;
  border-bottom-width: 0;
  border-right-width: 0;
  border-top-color: #008842;
  position: absolute;
  top: 0px;
  left: 0px;
}

.span3 {
  height: 13px;
  width: 13px;
  display: block;
  position: relative;
  float: left;
}

.demoSpan3:before {
  content: "";
  height: 0;
  width: 0;
  display: block;
  border: 13px transparent solid;
  border-bottom-width: 0;
  border-left-width: 0;
  border-top-color: #008842;
  position: absolute;
  top: 0px;
  left: 0px;
}
.pd-10-20 {
  padding: 10px 20px;
}
.bd-eee {
  border-bottom: 1px solid #eee;
}
:last-of-type.bd-eee {
  border: none;
}
</style>
