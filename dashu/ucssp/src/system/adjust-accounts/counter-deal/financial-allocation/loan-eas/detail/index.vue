<style lang="less" rel="stylesheet/less" scoped>
  .dialog-box {
    width: 1000px;
  }
  .row {
    padding: 0 40px;
    line-height: 40px;
    strong {
      font-weight: bold;
    }
  }
  .el-row:first-child {
    text-align: center;
  }
  .form__bottom {
    margin-top: 20px;
    text-align: center;
  }
</style>
<template>
  <div class="drop_loan">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <div class="dialog-box__top">
        <h5 class="title bg__white">{{ type }}</h5>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <div class="complete-product">
        <div class="dialog-box__middle-form">
          <div class="row">
            <el-row :gutter="40">
              <el-col :span=8>&nbsp;</el-col>
              <el-col :span=8>信贷金蝶</el-col>
              <el-col :span=8>EAS</el-col>
            </el-row>
            <el-row :gutter="40">
              <el-col :span=8>科目编码</el-col>
              <el-col :span=8><el-input v-model="form.caesSubjectNo"></el-input></el-col>
              <el-col :span=8><el-input v-model="form.easSubjectNo"></el-input></el-col>
            </el-row>
            <el-row :gutter="40">
              <el-col :span=8>科目名称</el-col>
              <el-col :span=8><el-input v-model="form.caesName"></el-input></el-col>
              <el-col :span=8><el-input v-model="form.easName"></el-input></el-col>
            </el-row>
            <el-row :gutter="40">
              <el-col :span=8>辅助科目类型1</el-col>
              <el-col :span=8><el-input v-model="form.caesTypeOne"></el-input></el-col>
              <el-col :span=8><el-input v-model="form.easTypeOne"></el-input></el-col>
            </el-row>
            <el-row :gutter="40">
              <el-col :span=8>辅助科目编码1</el-col>
              <el-col :span=8><el-input v-model="form.caesNoOne"></el-input></el-col>
              <el-col :span=8><el-input v-model="form.easNoOne"></el-input></el-col>
            </el-row>
            <el-row :gutter="40">
              <el-col :span=8>辅助科目名称1</el-col>
              <el-col :span=8><el-input v-model="form.caesNameOne"></el-input></el-col>
              <el-col :span=8><el-input v-model="form.easNameOne"></el-input></el-col>
            </el-row>
            <el-row :gutter="40">
              <el-col :span=8>辅助科目类型2</el-col>
              <el-col :span=8><el-input v-model="form.caesTypeTwo"></el-input></el-col>
              <el-col :span=8><el-input v-model="form.easTypeTwo"></el-input></el-col>
            </el-row>
            <el-row :gutter="40">
              <el-col :span=8>辅助科目编码2</el-col>
              <el-col :span=8><el-input v-model="form.caesNoTwo"></el-input></el-col>
              <el-col :span=8><el-input v-model="form.easNoTwo"></el-input></el-col>
            </el-row>
            <el-row :gutter="40">
              <el-col :span=8>辅助科目名称2</el-col>
              <el-col :span=8><el-input v-model="form.caesNameTwo"></el-input></el-col>
              <el-col :span=8><el-input v-model="form.easNameTwo"></el-input></el-col>
            </el-row>
          </div>
          <div class="form__bottom">
            <el-button class="add" type="primary" @click="save">保存</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { eas } from '../../../js/server';
export default{
  props: {
    row: Object
  },
  data() {
    return {
      type: '',
      form: {
      },
      rules: {
      }
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
    save() {
      let url = Object.keys(this.row).length > 0 ? eas.updateCaesEasMap : eas.createdCaesEasMap;
      let loading = this.$loading({
        text: "",
        spinner: "",
        background: "transparent"
      });
      this.$MyFetch.post(url, this.form)
        .then((data) => {
          this.$message.success(this.type + "成功！");
          this.close();
          loading.close();
        })
        .catch((e) => {
          this.$message.error(e.message);
          loading.close();
        });
    }
  },
  mounted() {
    if (Object.keys(this.row).length > 0) {
      this.type = '修改';
      this.form = JSON.parse(JSON.stringify(this.row));
    } else {
      this.type = '新增';
    }
  }
};
</script>
