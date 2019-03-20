<template>
  <section>
    <section class="dialog-box">
      <el-form :model="ad" :rules="rules" ref="ad" label-width="100px" class="ad-form" size="mini">
        <el-form-item label="位置：" prop="position">
          <el-select v-model="ad.position" placeholder="请选择" @change="getAdAmount">
            <el-option label="首页" value="首页"></el-option>
            <!-- <el-option label="列表详情页" value="列表详情页"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="标题：" prop="title" required :minlength="5" :maxlength="30">
          <el-input v-model="ad.title" :disabled="disabled" />
        </el-form-item>
        <el-form-item label="摘要：" prop="summary">
          <el-input type="textarea" v-model="ad.summary" :minlength="1" :maxlength="100" :disabled="disabled" />
        </el-form-item>
        <el-form-item label="图片：" required>
          <div class="font-l">
            <file-upload extensions="gif,jpg,jpeg,png" accept="image/png,image/gif,image/jpeg" name="file" class="upload-picture" post-action="/mshz-mgr/security/oms/advertManager/upAdvertPicture" v-model="imageList" @input-filter="inputFilter" @input-file="inputFile" ref="upload">
              <div v-if="imageShow.length > 0" class="upload-button">
                <img :src="imageShow" /> 重新上传图片
              </div>
              <div v-else class="upload-button">
                <img src="/static/img/placeholder-image.png" /> 上传广告图片
              </div>
            </file-upload>
            <div class="upload-hint">支持 PNG、JPG 格式，广告图片规则: 800×600</div>
          </div>
          <!-- <input type="hidden" v-model="imageShow" prop="imageShow" /> -->
        </el-form-item>
        <el-form-item label="链接：" prop="advertUrl">
          <el-input v-model="ad.advertUrl" :disabled="disabled" />
        </el-form-item>
      </el-form>
    </section>
    <section class="dialog-footer">
      <el-button type="primary" size="mini" @click="handleSubmit('ad')" :disabled="disabled">保 存</el-button>
      <el-button size="mini" @click="closeDialog">取 消</el-button>
    </section>
  </section>
</template>
<script>
import FileUpload from 'vue-upload-component';
export default {
  components: {
    FileUpload
  },
  data() {
    return {
      disabled: false,
      imageList: [],
      imageShow: '',
      ad: {
        advertUrl: '',
        image: '',
        position: '',
        summary: '',
        title: ''
      },
      rules: {
        position: [{ required: true, message: '请至少选择一种位置', trigger: 'change' }],
        title: [
          { required: true, message: '请输入标题！', trigger: 'blur' },
          { min: 5, max: 30, message: '标题长度在 5 到 30 个字符！', trigger: 'blur' }
        ],
        summary: [{ min: 1, max: 100, message: '摘要长度在 1 到 100 个字符！', trigger: 'blur' }],
        imageShow: [{ required: true, message: '请上传广告图片！', trigger: 'blur' }],
        advertUrl: [
          { required: true, message: '请输入广告链接！', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              let match = /((http|https):\/\/)(([a-zA-Z0-9._-]+\.[a-zA-Z]{2,6})|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,4})*(\/[a-zA-Z0-9&%_./-~-]*)?/;
              if (!match.test(value)) {
                callback(new Error('请输入正确广告链接！'));
              } else {
                callback();
              }
            },
            trigger: 'blur'
          }
        ]
      }
    };
  },
  props: ['adId', 'adUrl'],
  mounted() {
    this.adId !== -1 && this.requestData();
  },
  methods: {
    requestData() {
      this.$axios
        .get('security/oms/advertManager/queryAdvert', {
          params: {
            id: this.adId
          }
        })
        .then(res => {
          if (res.data.status === 'C0000') {
            this.ad = res.data.result;
            this.imageShow = this.ad.image.replace('{size}', '120x100');
          } else {
            this.$message({
              type: 'warning',
              message: res.data.message
            });
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error(err.message || '服务器异常');
        });
    },
    // 查询已上架的广告数量
    getAdAmount(val) {
      this.$axios.post('/security/oms/advertManager/queryUpShelvesAdvert',
        {
          position: val
        }
      ).then((res) => {
        if (res.data.status === 'C0000') {
          if (res.data.result >= 5) {
            this.disabled = true;
            this.$message({
              type: 'warning',
              duration: 3000,
              message: val + '的广告已到最大上架数 5 条，请先下架一部分广告，再进行添加操作'
            });
          } else if (res.data.result < 5) {
            this.disabled = false;
          }
        }
      });
    },
    closeDialog() {
      this.$emit('toggleAddAdDialog', false);
    },
    handleSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.imageShow.length === 0) {
            this.$message({
              type: 'warning',
              message: '请上传广告图片！'
            });
          } else {
            this.saveAd();
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    saveAd() {
      this.$axios
        .post(this.adUrl, this.ad)
        .then(res => {
          if (res.data.status === 'C0000') {
            this.$emit('toggleAddAdDialog', true);
            this.$message({
              type: 'success',
              message: '处理成功'
            });
          } else if (res.data.status === 'C0001' || res.data.status === 'S0601') {
            // S0601: 新增成功后，最大上架数已达到 5 条，则提示用户，并刷新列表
            this.$message({
              type: 'warning',
              message: res.data.message
            });
            this.$emit('toggleAddAdDialog', true);
          } else {
            this.$message({
              type: 'warning',
              message: res.data.message
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    inputFile(newFile, oldFile, prevent) {
      if (newFile && oldFile) {
        if (newFile.success) {
          // success
          console.log(newFile);
          if (newFile.response.status === 'C0000') {
            this.ad.image = newFile.response.result.url;
            this.imageShow = this.ad.image.replace('{size}', '120x100');
          } else {
            this.$message.error(newFile.response.message + ' ' + newFile.response.result);
          }

          // console.log(this.ad.image);
          // this.$refs.upload.active = false;
        }
      }
      // Automatic upload
      if (Boolean(newFile) !== Boolean(oldFile) || oldFile.error !== newFile.error) {
        if (!this.$refs.upload.active) {
          this.$refs.upload.active = true;
        }
      }
    },
    inputFilter(newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        if (!/\.(gif|jpg|jpeg|png)$/i.test(newFile.name)) {
          this.$message({
            type: 'warning',
            message: '请选择正确格式的图片！'
          });
          return prevent();
        }
      }
      if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
        newFile.url = '';
        let URL = window.URL || window.webkitURL;
        if (URL && URL.createObjectURL) {
          newFile.url = URL.createObjectURL(newFile.file);

          let img = new Image();  // 手动创建一个Image对象
          img.src = newFile.url;// 创建Image的对象的url
          let that = this;
          img.onload = function() {
            if (this.width < 800 && this.height < 600) {
              that.$refs.upload.update(newFile, { error: 'size' });
              that.$message({
                type: 'warning',
                message: '图片高要大于600px，宽要大于800px'
              });
            }
          };
          img = null;
        }
      }
    }
  }
};
</script>
<style scoped>
/* .dialog-box {
  height: 400px;
} */
.ad-form {
  margin-top: 1rem;
  margin-right: 2rem;
}
.upload-picture {
  text-align: left;
  width: 120px;
  float: left;
  line-height: 24px;
}
.upload-picture img {
  width: 120px;
  height: 100px;
  display: block;
}
.upload-button {
  width: 120px;
  text-align: center;
}
.upload-hint {
  float: left;
  margin-top: 91px;
}
</style>
