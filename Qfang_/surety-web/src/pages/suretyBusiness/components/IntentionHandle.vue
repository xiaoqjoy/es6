<template>
  <div>
    <el-dialog
      class="dialogbody"
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="700px"
      @close="close()"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form ref="form" :model="form" label-width="140px">
        <el-row>
          <el-col :span="9">
            <el-form-item label="单据号：">
              <el-input></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="业务类型：">
              <el-input></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9">
            <el-form-item label="客户经理：">
              <el-input></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="创建日期：">
              <el-date-picker></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9">
            <el-form-item label="还款申请安排时间：">
              <el-input></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item :rules="rules" label="写还款申请时间：" required>
              <el-date-picker></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9">
            <el-form-item label="可赎楼时间：" required>
              <el-date-picker></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item :rules="rules" label="是否有信用贷款：" required>
              <el-radio>是</el-radio>
              <el-radio>否</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9">
            <el-form-item :rules="rules" label="是否罚息" required>
              <el-radio>是，要交罚息</el-radio>
              <el-radio>否</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item :rules="rules" label="是否要预存：" required>
              <el-radio>是</el-radio>
              <el-radio>否</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :rules="rules" label="供楼清单：">
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-change="handleChange"
              >
                <el-button type="success">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :rules="rules" label="申请回执：">
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-change="handleChange"
              >
                <el-button type="success">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :rules="rules" label="贷款合同：">
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-change="handleChange"
              >
                <el-button type="success">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item :rules="rules" label="贷款合同：">
              <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row class="dialog-bottom">
          <el-col :span="24">
            <el-form-item>
              <el-button type="primary">保存</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Sortable from "sortablejs";
// import axios from 'axios';
export default {
  props: {
  },
  watch: {
  },
  created() {
  },
  data() {
    return {
      form: {},
      dialogVisible: true,
      dialogTitle: "还款申请办理",
      rules: {},

    };
  },
  created() {
  },
  mounted() { },
  methods: {
    close(formName) {
      this.$emit("hideAddFlow", false);
    },
    onSubmit() {
      console.log('submit!');
    },
    handleChange(file, fileList) {
      this.fileList3 = fileList.slice(-3);
    }
  }
};
</script>
<style lang="less">
.el-dialog {
  .el-dialog__title {
    font-weight: 800;
  }
  .el-dialog__body {
    padding-bottom: 80px;
  }
  .el-form {
    .el-form-item {
      margin-bottom: 0;
    }
    .el-form-item__label {
      font-size: 12px;
    }
    .el-form-item {
      display: block;
    }
    .el-radio {
      span {
        font-size: 12px;
      }
    }
    .el-input {
      width: 180px;
    }
  }
  .dialog-bottom {
    position: absolute;
    background-color: #f3f3f3;
    width: 700px;
    padding: 0;
    left: 0;
    bottom: 0;
    .el-form-item {
      float: right;
      margin-right: 30px;
    }
  }
}
</style>
