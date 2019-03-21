<template>
  <section>
    <div class="dialog-box">
      <div class="bgc-f">
        <div class="pd-20">
          <h3 class="pdb-10">{{ info.gardenName }} {{ info.buildingName }}-{{ info.roomNo }}-{{reserve.bedRoomName || info.bedRoomName}}</h3>
          <el-row class="font-l">
            <el-col :span="3"
              class="font-12 c-9">
              <span>状态：</span>
              <span v-if="reserve.roomStatus == 'WAIT_TO_RENT'">待租</span>
              <span v-else-if="reserve.roomStatus == 'ALREADY_RENT'">已租</span>
            </el-col>
            <el-col :span="6"
              class="font-12 c-9">
              <span>发房管家：</span>
              <span>{{ reserve.managerName }}</span>
            </el-col>
          </el-row>
        </div>
        <div class="bgceee">
          <div class="model-border">
            <header class="model-header">预定客户
            </header>
            <el-form ref="checkoutForm"
              :model="checkoutData"
              :rules="Rules"
              size="mini"
              label-position="right"
              label-width="100px">
              <div class="pd-20">
                <el-row :gutter="10">
                  <el-col :span="12">
                    <el-form-item label="客户姓名："
                      prop="name">
                      <el-input type="text"
                        :maxlength="11"
                        v-model="checkoutData.name">
                      </el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="12">
                    <el-form-item label="客户手机号："
                      prop="phone">
                      <el-input type="text"
                        :maxlength="13"
                        v-model="checkoutData.phone">
                      </el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="12">
                    <el-form-item label="证件类型："
                      prop="type">
                      <el-select v-model="checkoutData.type"
                        placeholder="请选择"
                        clearable>
                        <el-option value="IDCARD"
                          label="身份证"></el-option>
                        <el-option value="PASSPORT"
                          label="护照"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="证件号："
                      prop="idCard">
                      <el-input type="text"
                        :maxlength="18"
                        v-model="checkoutData.idCard"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="12">
                    <el-form-item label="起租日期："
                      prop="rentTime"
                      size="mini">
                      <el-date-picker v-model="checkoutData.rentTime"
                        :picker-options="pickerOptions"
                        :disabled="false"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        type="date">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </el-form>
          </div>
          <div class="model-border">
            <header class="model-header">身份证附件
              <span class="font-default">(最多上传2张)</span>
              <span v-if="!IdCardPic"
                class="font-red">至少上传一张图片</span>
            </header>
            <div :class="{'pd-ten':true, 'red-border':!IdCardPic}">
              <div class="clearfix min-h-200">
                <my-image-upload :showButtonText="'添加图片'"
                  :isAutoType="true"
                  :delectList="true"
                  :autoType="'ID_ATTACH'"
                  :showType="false"
                  v-model="checkoutData.idCardPictrue"
                  :postAction="postAction"
                  :maximum="2">
                </my-image-upload>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="dialog-footer">
      <el-button type="primary"
        @click="handleSumit"
        size="mini">确定</el-button>
      <el-button size="mini"
        @click="closeDialog">取消</el-button>
    </div>
  </section>
</template>

<script>
import MyImageUpload from '@/components/MyImageUpload';
export default {
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        }
      },
      postAction: '/mshz-mgr/security/roomStatus/contract/attachUploadTool',
      IdCardPic: true,
      dialogImageUrl: '',
      dialogVisible: false,
      Rules: {
        name: [
          { required: true, message: '请输入客户姓名', trigger: 'blur' },
          { max: 10, message: '最多输入10个字' }
        ],
        phone: [
          { required: true, message: '请输入客户手机号', trigger: 'blur' },
          { pattern: /^(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[8|9])\d{8,10}$/, message: '请输入正确的电话号码' },
          { pattern: /^[0-9]{1,13}$/, message: '最大可输入13位数字' }
        ],
        type: [
          { required: true, message: '请选择证件类型', trigger: 'blur' }
        ],
        idCard: [
          { required: true, message: '请输入证件号', trigger: 'blur' },
          { pattern: /(^[0-9]{5,20}$)|(^[a-zA-Z0-9]{16,20}$)/, message: '请输入数字，字母' },
          { pattern: /^\d{17,18}(\d|x|X)$/, message: '请输入正确的证件号' }
        ],
        rentTime: [
          { required: true, message: '请选择起租日期', trigger: 'blur' }
        ]
      },
      checkoutData: {
        type: 'IDCARD',
        name: '',
        phone: '',
        idCard: '',
        rentTime: '',
        idCardPictrue: []
      }
    };
  },
  props: ['reserve', 'info'],     // 父组件传值过来
  methods: {
    // 房源预定 提交
    handleSumit(data, reload) {
      this.$refs.checkoutForm.validate((valid) => {
        if (valid) {
          const picAdr = this.mapPicList(this.checkoutData.idCardPictrue);
          const data = this.checkoutData;
          this.$axios.post('/security/longorder/booking/saveBooking', {
            certNo: data.idCard,
            certType: data.type,
            customerName: data.name,
            customerPhone: data.phone,
            rentDate: data.rentTime,
            bookingSaveAttachForm: picAdr,
            longSituationId: this.reserve.situationId,
            roomId: this.reserve.roomId
          }
          ).then((res) => {
            if (res.data.result && res.data.status === 'C0000') {
              this.$message.success('预定成功');
              // 刷新列表数据
              this.$emit('refreshData');
              // 刷新房态地下
              this.$emit('refreshCount');
              this.closeDialog();
              // 关闭弹窗
              this.$emit('closeParentDialog');
              this.$alert('预定成功，房源将保留30分钟，请督促客户尽快支付', {
                confirmButtonText: '我知道了'
              });
            } else {
              this.$message.error(res.data.message);
            }
          });
        } else {
          this.$message.error('请完善表单信息!');
          return false;
        }
      });
    },

    // 遍历上传的图片，取得上传成功的图片
    mapPicList(data) {
      if (!(data instanceof Array) && !data.length) {
        return;
      }
      let CategoryPic = [];
      for (var i = 0; i < data.length; i++) {
        let picAddr;
        // 上传成功的图片
        if (data[i].success && data[i].response && data[i].response.result) {
          let resultData = JSON.parse(data[i].response.result);
          if (resultData.status === 'C0000') {
            picAddr = resultData.result.url;
          }
          // 接口请求的回的图片
        } else if (data[i].typeInfo) {
          picAddr = data[i].pictureUrl;
        }
        // 有 url的
        if (picAddr) {
          CategoryPic.push({
            picAddr
          });
        }
      }
      return CategoryPic;
    },
    // 关闭表格
    closeDialog() {
      this.$emit('update:reserveDialog', false);
    }
  },
  components: {
    MyImageUpload
  }
};
</script>

<style scoped>
.min-h-200 {
  min-height: 200px;
}
</style>

