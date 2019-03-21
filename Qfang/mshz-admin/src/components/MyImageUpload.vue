
<template>
  <!-- :class="{'borderRed': showError ,'clearfix': true, 'pdb-20': true}" -->
  <div class="updload-box">
    <file-upload v-show="isShowInput"
      class="file-upload"
      :post-action="postAction"
      :extensions="extensions"
      :accept="accept"
      :timeout="300 * 1000"
      :maximum="maximum"
      :multiple="multiple"
      :directory="directory"
      :size="size || 0"
      :thread="thread < 1 ? 1 : (thread > 5 ? 5 : thread)"
      :drop="drop"
      :drop-directory="dropDirectory"
      :add-index="addIndex"
      v-model="picList.files"
      @input-filter="inputFilter"
      @input-file="inputFile"
      ref="upload">
      <p class="pdt-30">
        <span class="upload-img">
          <i class="icon iconfont icon-tianjia add-font"></i>
        </span>
        <span class="inb-100">{{showButtonText}}</span>
      </p>
    </file-upload>
    <el-form ref="imgList"
      :model="picList">
      <div class="img-item"
        v-for="(file, index) in picList.files"
        :key="index">
        <div class="img-item-content">
          <div v-if="file.main"
            class="rectangle-box">
            <div class="rectangle">
              封面图
            </div>
            <span class="demoSpan2 span2"></span>
            <span class="demoSpan3 span3"></span>
          </div>
          <div v-if="(file.error && !file.typeInfo)"
            class="upload-info">
            <p class="c-red font-c font-w font-16">上传失败！<br />
              <span class="font-12">{{errorMessage}}</span>
            </p>
          </div>
          <span class="del-img"
            @click.prevent="handleDelImg(file)">
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
            :src="file.thumb" />
        </div>
        <div v-if="!((file.error && !file.typeInfo)) && showType"
          class="img-type">
          <slot v-if="haveMian">
            <el-row>
              <el-col :span="15">
                <el-form-item :prop=" 'files.'+index +'.pictureType'"
                  :rules="[
                            { required: true, message: '请选择图片类型', trigger: 'change'},
                          ]">
                  <el-select v-model="file['pictureType']"
                    placeholder="请选择"
                    size="mini">
                    <el-option :label="item.value"
                      :value="item.key"
                      v-for="(item, index) in pictureTypeList"
                      :key="index"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="9"
                class="font-r">
                <el-form-item>
                  <el-button class="bl-button"
                    v-if="file.main"
                    size="mini"
                    @click="handleCover(index)">取消封面</el-button>
                  <el-button class="bl-button"
                    v-else
                    size="mini"
                    @click="handleCover(index)">设置封面</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </slot>
          <slot v-else>
            <el-row>
              <el-col :span="24">
                <el-form-item :prop=" 'files.'+index +'.pictureType'"
                  :rules="[{ required: checkType, message: '请选择图片类型', trigger: 'change'},
                          ]">
                  <el-select v-model="file.pictureType"
                    placeholder="请选择类型"
                    size="mini">
                    <el-option :label="item.value"
                      :value="item.key"
                      v-for="(item, index) in pictureTypeList"
                      :key="index">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </slot>

        </div>
      </div>
    </el-form>
  </div>
</template>

<script>

/*

传进来的格式：
{
  thumb: item.pictureUrl.replace('{size}', '160x120'), // 小图url
  pictureUrl: item.pictureUrl, // 图片url
  pictureType: item.pictureType, // 图片类型
  pictureTypeDesc: item.pictureTypeDesc, // 图片类型中文描述
  id: item.id,  // 图片id
  type: 'image/jpeg',
  typeInfo: 'networkcomin' // 标识是接口请求回来的
}

传出的数据结构：
1.如是传进来的，同上
2.新上传的：调用组件上传成功后的 数据结构。

*/

import FileUpload from 'vue-upload-component';
export default {
  name: 'MyImageUpload',
  props: {
    // 最多限制
    maximum: {
      type: Number,
      default: 5
    },

    // 上传单张隐藏上传按钮
    isSingle: {
      type: Boolean,
      default: false
    },

    // 同时上传的数量
    thread: {
      type: Number,
      default: 3
    },

    // 是否自动添加图片类别
    isAutoType: {
      type: Boolean,
      default: false
    },

    // 添加的图片类别
    autoType: {
      type: String,
      default: ''
    },

    // 上传的 url
    postAction: {
      type: String
    },

    // putAction: {
    //   type: String
    // },

    // 删除的list
    delectList: {
      type: Boolean,
      default: false
    },

    // 是否需要主图
    haveMian: {
      type: Boolean,
      default: false
    },

    // 是否展示类别选择列表
    pictureTypeList: {
      type: Array
    },
    // 是否展示类别选择
    showType: {
      type: Boolean,
      default: true
    },
    // 图片类别是否必要
    checkType: {
      type: Boolean,
      default: true
    },
    // 上传按钮展示文本
    showButtonText: {
      type: String,
      default: '添加房源图片'
    },

    showError: {
      type: Boolean,
      default: false
    },

    value: {
      type: Array,
      default: () => []
    }

    // filterMethod: Function

  },
  data() {
    return {
      isShowInput: true,
      errorMessage: '上传失败',
      showErrorMessage: '上传失败',
      hasMain: false, // 主图
      delImgList: [], // 删除的图片
      // // 图片上传的默认参数
      housePic: false,
      pictype: '',
      picList: {
        files: []
      },
      accept: 'image/png,image/gif,image/jpeg,image/webp',
      extensions: 'gif,jpg,jpeg,png,webp', // 允许上传的文件后缀
      minSize: 1024, // 最小字节
      size: 10000000, // 上传的最大字节
      multiple: true, // 允许多个文件
      directory: false, // 是否开启文件夹上传
      drop: true, // 拖拽上传
      dropDirectory: false, // 是否开启拖拽目录
      addIndex: false,
      name: 'file',
      // postAction: 'mshz-mgr/security/room/manage/uploadPicture',
      autoCompress: 1024 * 1024 * 5, // 压缩图片的值
      uploadAuto: true //  是否自动上传
    };
  },

  methods: {
    handleCheckType() {
      return new Promise((resolve, reject) => {
        this.$refs.imgList.validate((valid) => {
          if (valid) {
            resolve(valid);
          } else {
            this.$message({
              type: 'warning',
              message: '请选择图片类别'
            });
            reject(valid);
          }
        });
      });
    },

    // 检查图片是否上传成功
    // updateImg(data) {
    //   if (data.typeInfo || data.error || data.active) {
    //     return false;
    //   }
    //   if (data.success && data.response.status && data.response.status === 'C0000') {
    //     return (JSON.parse(data.response.result).status !== 'C0000');
    //   } else {
    //     return true;
    //   }
    // },

    // 上传图片的方法
    checkFile(file) {
      console.log(file);
      // console.log(this.houseInfo.pictureList);
      // console.log(this.$refs.upload);
    },

    inputFilter(newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        // Before adding a file
        // 添加文件前
        // Filter system picList.files or hide picList.files
        // 过滤系统文件 和隐藏文件
        if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
          return prevent();
        }
        // Filter php html js file
        // 过滤 php html js 文件
        if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
          return prevent();
        }
        // if (!/\.(gif|jpg|jpeg|png)$/i.test(newFile.name)) {
        //   this.$message({
        //     type: 'warning',
        //     message: '请选择正确格式的图片！'
        //   });
        //   return prevent();
        // }
      }
      if (newFile && (!oldFile || newFile.file !== oldFile.file) && !newFile.typeInfo) {
        // typeInfo 是否是后台返回的
        // Create a blob field
        // 创建 blob 字段
        newFile.blob = '';
        newFile.pictureType = '';
        newFile.status = 'VALID';
        if (this.isAutoType) {
          newFile.pictureType = this.autoType;
        }
        if (this.haveMian) {
          newFile.main = false;
        }
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
              that.$refs.upload.update(newFile, { error: 'somin' });
              // that.$message({
              //   type: 'warning',
              //   message: '图片高要大于600px，宽要大于800px'
              // });
            }
          };
          img = null;
        }
      }
    },

    // add, update, remove File Event
    inputFile(newFile, oldFile) {
      if (newFile && oldFile) {
        if (!newFile.active && oldFile.active) {
          // 获得相应数据
          // console.log('response', newFile.response);
          if (newFile.xhr) {
            //  获得响应状态码
            // console.log('status', newFile.xhr.status);
            if (newFile.xhr.status === 200) {
              if (newFile.response.status === 'C0000' && JSON.parse(newFile.response.result).status === 'C0000') {
              } else {
                this.$refs.upload.update(newFile, { error: 'server' });
              }
            } else {
              this.$refs.upload.update(newFile, { error: 'server' });
            }
          }
        }
        if (newFile.active && !oldFile.active) {
          // update
          // if (newFile.active && !oldFile.active)
          // beforeSend
          // min size
          if (newFile.size >= 0 && this.minSize > 0 && newFile.size < this.minSize) {
            this.$refs.upload.update(newFile, { error: 'somin' });
          }
          if (newFile.size >= 0 && this.size > 0 && newFile.size > this.size) {
            this.$refs.upload.update(newFile, { error: 'size' });
          }
        }
        // if (newFile.progress !== oldFile.progress) { }
        if (newFile.error && !oldFile.error) {
          // error
          // 错误提示
          // console.log(newFile.error);
          this.handleShowError(newFile.error);
        }
        if (newFile.success && !oldFile.success) {
          // success
          // console.log(newFile, '----新上传的');
          this.handleEmitFiles();
        }
      }

      if (!newFile && oldFile) {
        // remove
        if (this.isSingle) {
          this.isShowInput = true;
        }
        // if (oldFile.success && oldFile.response.id) { }
      }

      // 自动上传
      if (Boolean(newFile) !== Boolean(oldFile) || oldFile.error !== newFile.error) {
        if (this.uploadAuto && !this.$refs.upload.active) {
          this.$refs.upload.active = true;
        }
      }
    },

    handleShowError(val) {
      switch (val) {
        case 'size':
          this.handlePromptMessage('太大了，图片最大10M');
          break;
        case 'somin':
          this.handlePromptMessage('太小了，图片至少:800X600');
          break;
        case 'extension':
          this.handlePromptMessage('不支持改格式的文件');
          break;
        case 'timeout':
          this.handlePromptMessage('上传超时');
          break;
        case 'abort':
          this.handlePromptMessage('上传中止');
          break;
        case 'network':
          this.handlePromptMessage('网络异常');
          break;
        case 'server':
          this.handlePromptMessage('服务异常');
          break;
        case 'denied':
          this.handlePromptMessage('上传：denied');
          break;
        default:
          this.handlePromptMessage('上传异常');
      }
    },

    // 删除图片
    handleDelImg(file) {
      // 接口需要标识请求回来删掉的图片
      if (file.id && file.typeInfo) {
        let myDelItem;
        myDelItem = this.picList.files.find((item) => {
          return item.id === file.id;
        });

        if (myDelItem) {
          myDelItem.status = 'INVALID';
          myDelItem.statusDesc = '无效';
        }
        this.delImgList.push(myDelItem);
      }
      // console.log(this.delImgList, '删掉的');
      this.$refs.upload.remove(file);
      // 父组件是否需要 记录 删去接口的数据
      if (this.delectList) {
        this.$emit('getDelList', this.delImgList);
      }
      // 删除成功
      this.handleEmitFiles();
    },

    // 设置封面
    handleCover(i) {
      this.hasMain = true;
      for (let j = 0; j < this.picList.files.length; j++) {
        this.picList.files[j].main = false;
        if (i === j) {
          this.picList.files[i].main = true;
        }
      }
    },

    handlePromptMessage(message) {
      this.errorMessage = message;
      this.$message({
        type: 'warning',
        message: message,
        duration: 3000
      });
    },

    // 更新数据到父组件
    handleEmitFiles() {
      // 直接返回list ，过滤 筛选 到父组件做，每个接口需要的字段、数据结构不一样。
      let sendList = this.picList.files.concat([]);
      // if (typeof this.filterMethod === 'function') {
      //   sendList = this.filterMethod(sendList);
      // } else {

      // }
      // console.log(sendList);
      this.$emit('input', sendList);
    },

    // 更新一波
    updateFiles(val) {
      this.$refs.upload.clear();
      this.$refs.upload.add(val);
    }

  },
  watch: {
    value: {
      handler(val, oldval) {
        // 更新的list 不为空，判断是否 和 更新到父组件的 list 相等，相等不需要更新
        if (val.length !== 0 && val.length === this.picList.files.length) {
          for (let i = 0; i < val.length; i++) {
            if (val[i].id !== this.picList.files[i].id) {
              this.$nextTick(() => {
                this.updateFiles(val);
              });
              console.log(val, '找到了');
              // 如果找到 id 不相等的 直接更新组件内的数据，跳出循环。
              break;
            }
          }
        } else if (val.length > 0 && this.picList.files.length === 0) {
          // 更新的list 不为空，组件内 list 为空。直接 add 。
          this.$nextTick(() => {
            this.$refs.upload.add(val);
          });
        } else {
          // 其他情况
          // this.picList.files.length > val.length  || this.picList.files.length < val.length
          this.$nextTick(() => {
            this.updateFiles(val);
          });
        }
      },
      immediate: true,
      deep: true
    },
    'picList.files'(val) {
      if (this.isSingle) {
        (this.picList.files.length === 1) && (this.isShowInput = false);
      }
    }
  },
  components: {
    FileUpload
  }
};
</script>

<style scoped>
.updload-box {
  min-height: 190px;
}
.img-item {
  margin: 15px;
  width: 160px;
  height: 160px;
  float: left;
}

.img-item-content {
  width: 160px;
  height: 120px;
  position: relative;
  border: 1px solid #ddd;
}

.del-img {
  display: block;
  width: 30px;
  height: 30px;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 99;
  line-height: 30px;
  text-align: center;
  color: #999;
  background-color: #333;
}

.upload-info {
  padding-top: 30px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 90;
  background-color: rgba(182, 176, 176, 0.8);
  overflow: hidden;
  word-break: break-all;
  /* line-height: 120px; */
}

.img-item-box {
  margin: 15px;
  width: 160px;
  height: 120px;
  float: left;
}

.img-content {
  display: block;
  width: 100%;
  height: 100%;
  outline: 0;
  border: 0;
  /* border: 1px solid #dddddd; */
}

.file-upload {
  margin: 15px;
  width: 160px;
  height: 120px;
  float: left;
  text-align: center;
  cursor: pointer;
  /* line-height: 60px; */
  color: #008842;
  background-color: #fafafa;
  border: 1px solid #dddddd;
  border-radius: 3px;
}

.upload-img i.add-font {
  font-size: 30px;
}

.progress {
  width: 100%;
  position: absolute;
  top: 50%;
  display: -ms-flexbox;
  display: flex;
  overflow: hidden;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  background-color: #e9ecef;
  /* background-color: #1069c2; */
  border-radius: 8px;
}

.bg-danger {
  background-color: #fa5555 !important;
}

.progress-bar-striped {
  background-image: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.15) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.15) 75%,
    transparent 75%,
    transparent
  );
  background-size: 16px 16px;
}

.progress-bar {
  height: 16px;
  line-height: 16px;
  color: #fff;
  background-color: #008842;
  transition: width 0.6s ease;
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
</style>

