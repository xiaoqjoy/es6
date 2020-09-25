<template>
  <div class="upload_com">
    <div>
      <!-- <p class="el-form-item__label">
        <span :class="{required: required}" v-if="required">*</span>
        {{label}}
      </p> -->
      <div class="el-form-item__content">
        <div class="el-input">
          <input type="file"
            ref="uploadInput"
            class="upload_input"
            @change="tirggerFile"
          >
          <div class="text el-input__inner ellipsis" @click="browse">{{fileName}}</div>
          <el-button type="text" @click="browse" :size="size">浏览</el-button>
          <el-button :loading="loading"
            type="warning"
            :size="size"
            @click="uploadFn">上传
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    required: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    accept: {
      type: Array,
      default: () => ([])
    },
    size: {
      type: String,
      default: 'mini'
    },
    index: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      fileName: '',
      file: null,
      loading: false
    };
  },
  methods: {
    browse() {
      // 打开浏览框
      this.$refs.uploadInput.click();
    },
    tirggerFile(event) {
      let accept = this.accept;
      this.file = event.target.files[0];
      if (!this.file) {
        this.fileName = null;
        return;
      }
      this.fileName = this.file.name;
      let fileFormat = this.fileName.substring(this.fileName.lastIndexOf('.') + 1);
      if (accept.length !== 0 && !accept.includes(fileFormat.toLocaleLowerCase())) {
        let text = `请选择 ${accept.join(', ')} 格式的文件`;
        this.$error(text);
        this.file = null;
        this.fileName = null;
      }
    },
    uploadFn() {
      if (!this.file) return;
      this.loading = true;
      this.$upload(this.file).then(_data => {
        let filePathArry = _data.filePath.split('/');
        let fileName = filePathArry[filePathArry.length - 1];
        _data.fileName = fileName;
        _data.index = this.index;
        this.loading = false;
        this.$emit('success', _data);
      }).catch(_err => {
        this.loading = false;
        this.$emit('error', _err);
      });
    }
  }
};
</script>

<style lang="less">
  .upload_com {
    .upload_input {
      display: none;
    }
    .text {
      border: 1px solid #d0d0d0;
      border-radius: 4px !important;
      width: 70%;
      height: 36px;
      background: #fff;
      cursor: pointer;
      line-height: 36px;
    }
  }
</style>
