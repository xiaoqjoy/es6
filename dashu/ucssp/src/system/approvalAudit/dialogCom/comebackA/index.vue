<template>
  <div class="import-message">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <div class="dialog-box__top">
        <span class="title">退回</span>
        <span class="el-icon-close button button__close" @click="close_()"></span>
      </div>
      <div class="product-content">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="top" label-width="100px" class="demo-ruleForm" hide-required-asterisk>
          <el-form-item label="退回原因" prop="region">
            <el-select :disabled="disabled || !isShow" class="form__select" v-model="ruleForm.region" placeholder="请选择">
              <el-option  v-for="(item,index) in comebackReasonCode"
            :key="index"
            :label="item.configTitle"
            :value='item.configCode'
            ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注" class="el-form__remark">
            <el-input :disabled="disabled || !isShow" class="form__textarea" maxlength="200" type="textarea" v-model="remarkTxt" resize="none"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <el-button type="primary" class="remark_btn" :disabled="disabled || !isShow" @click="submitForm" v-if="isShow">确认退回</el-button>
    </div>
  </div>
</template>

<script>
import { aprAudApi } from "../../js/server.js";

export default {
  props: ["surveyStatusCode", "comebackReasonCode", 'appOrAud', 'disabled'],
  data() {
    return {
      label: [],
      remarkTxt: "",
      ruleForm: {
        region: "",
        desc: ""
      },
      rules: {
        region: [
          { required: true, message: "分类内容不能为空", trigger: "change" }
        ],
        desc: [{ required: true, message: "备注内容不能为空", trigger: "blur" }]
      }
    };
  },
  computed: {
    isShow() {
      if (this.surveyStatusCode === "Underway") {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    // 退回1
    submitForm() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          let data = {
            remarkTxt: this.remarkTxt,
            sendBackReasonCode: [this.ruleForm.region]
          };
          this.$MyFetch
            .post(
              `${aprAudApi.aud.taskDetail.sendBackOper}/${this.$route.query.appID}`,
              data
            )
            .then((data = {}) => {
              this.$router.push({name: 'audit-pending', path: '/audit-pending'});
              console.log("退回");
            })
            .catch(err => {
              this.$error(err.message);
            });
          this.close_();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    close_() {
      this.$emit("clsoe_windowAlert");
    }
  },
  created() {
    console.log(this.disabled, this.surveyStatusCode);
  }
};
</script>

<style lang="less" scoped>
.import-message {
  .dialog-box {
    width: 946px;
    height: 406px;
    .product-title {
      height: 60px;
    }
    .product_title_head {
      line-height: 80px;
      font-weight: bold;
    }
    .el-icon-close {
      position: absolute;
      top: 10px;
      right: 20px;
      cursor: pointer;
      font-weight: bold;
    }
    .product-content {
      margin: 9px;
      width: 886px;
      margin: 20px auto;
      > p {
        text-align: left;
        line-height: 40px;
        font-size: 12px;
        color: #bbbbbb;
        letter-spacing: 1.09px;
      }
      > .select {
        width: 886px;
        text-align: left;
      }
      > textarea {
        border: 1px solid #d0d0d0;
        border-radius: 4px;
        resize: none;
        width: 886px;
        height: 102px;
      }
      .product-content-title {
        font-size: 14px;
        color: #333333;
        text-align: left;
        > span {
          border: 1px solid #538bf1;
          margin-right: 10px;
        }
        line-height: 50px;
      }
      .el-form {
        text-align: left;
        .form__select {
          width: 886px;
        }
        .form__textarea {
          width: 886px;
        }
        .text__center {
          text-align: center;
        }
        .el-form__remark {
          /deep/ .el-form-item__label {
            border-left: 2px solid #538bf1;
            font-size: 14px;
            color: #333333;
            margin-bottom: 10px;
            padding: 0 0 0 5px;
          }
        }
      }
    }
    .remark_btn{
      width: 200px;
    }
  }
  .blue__border {
    border: 1px solid #538bf1;
  }
  /deep/ .dialog-box .el-select .el-select__tags {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 30px;
  }
}
/deep/ .el-select-dropdown__item span{
  display: inline-block;
  width: 800px;
}
/deep/.el-popper .del-scrollbar .el-select-dropdown__wrap .el-select-dropdown__list {
  max-width: 850px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
