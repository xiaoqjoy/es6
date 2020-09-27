<template>
  <div class="drop_loan">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <div class="dialog-box__top">
        <h5 class="title_type">编辑</h5>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <div class="complete-product">
        <div class="dialog-box__middle-form">
          <el-form ref="form" label-width="100px" class="demo-form-inline" label-position="top">
            <div class="form__block bg__white border__radius-5">
              <div class="dialog-box__form__group">
                <el-form-item class="user">
                  <label>一级编号：</label>
                  <span v-html="form.codeLevelOne"></span>
                </el-form-item>
                <el-form-item class="user">
                  <label>二级编号：</label>
                  <span v-html="form.codeLevelTwo"></span>
                </el-form-item>
                <el-form-item id="dimensional" class="user">
                  <label>一级维度：</label>
                  <span v-html="form.titleLevelOne"></span>
                </el-form-item>
                <el-form-item id="secondary" label="二级维度">
                  <el-input maxlength="50" placeholder="请输入二级维度" v-model="form.titleLevelTwo"></el-input>
                </el-form-item>
              </div>
            </div>
          </el-form>
          <div class="form__bottom">
            <el-button class="add finish" type="primary" @click="saveFn">保存</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { configApi } from "../../../js/server.js"; // 接口

export default {
  props: ['item'],
  data() {
    return {
      form: {
        codeLevelOne: '',
        codeLevelTwo: '',
        titleLevelOne: '',
        titleLevelTwo: ''
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    close() {
      this.$emit('close', false);
    },
    init() {
      this.form = {
        codeLevelOne: this.item.codeLevelOne,
        codeLevelTwo: this.item.codeLevelTwo,
        titleLevelOne: this.item.titleLevelOne,
        titleLevelTwo: this.item.titleLevelTwo
      };
    },
    saveFn() {
      if (!this.form.titleLevelTwo) {
        this.confirmFn("二级维度不能为空");
        return;
      }
      const data = {
        codeLevelOne: this.form.codeLevelOne,
        codeLevelTwo: this.form.codeLevelTwo,
        idLevelTwo: this.item.idLevelTwo,
        newLevelOne: false,
        titleLevelOne: this.form.titleLevelOne,
        titleLevelTwo: this.form.titleLevelTwo
      };
      const url = `${configApi.derate_base}/derate_reason/twoLevel/save`;
      this.$MyFetch
        .post(url, data)
        .then((data = {}) => {
          console.log(data);
          this.confirmFn("修改成功", "success");
          this.$emit('close', true);
        })
        .catch(err => {
          this.$error(err.message);
        });
    }
  }
};
</script>
<style lang="less" scoped>
.drop_loan {
  .dialog-box {
    width: 590px;
    // height: 286px;
    border-radius: 4px;
    padding: 0px;
    .title_type {
      text-align: center;
      background: #fff;
      font-size: 18px;
      letter-spacing: 1.3px;
      padding-left: 20px;
      font-weight: bold;
      box-shadow: 0 2px 6px 0 #d0d0d0;
    }
    .mgtop {
      margin-top: 20px;
    }
    .el-form-item {
      width: 28%;
      margin-right: 40px;
    }
    .el-form-item .el-select {
      width: 245px;
    }
    .dialog-box__middle {
      height: 495px;
      .middle {
        .el-select {
          display: block;
        }
        .el-textarea__inner {
          background: #d0d0d0;
        }
      }
    }
    .dialog-box__middle-1200 {
      height: 442px;
      overflow-y: auto;
      margin: 0 20px;
      padding: 25px 30px;
      box-shadow: 0 2px 6px 0 #d0d0d0;
      .dialog-box__middle-top {
        padding: 20px 0;
        border-bottom: 1px solid #d0d0d0;
        .title {
          font-size: 16px;
          .icon__gan {
            margin-right: 10px;
          }
        }
      }
    }
    .dialog-box__top {
      margin: 0px;
    }
    .dialog-box__middle-form {
      overflow-y: auto;
      padding: 0 20px;
      .form__block {
        padding: 20px 30px;
        margin-bottom: 20px;
        // box-shadow: 0 2px 6px 0 #d0d0d0;
        .dialog-box__middle-top {
          padding-bottom: 20px;
          border-bottom: 1px solid #e9e9e9;
          .title {
            font-size: 16px;
            .icon__gan {
              margin-right: 10px;
            }
          }
        }
      }
    }
    .dialog-box__top {
      margin: 0px;
    }
    .complete-product {
      .dialog-box__middle-form {
        // height: 225px;
        .form__bottom {
          text-align: center;
          margin-top: 10px;
          margin-bottom: 30px;
          // position: absolute;
          // left: 50%;
          // margin-left: -100px;
          // bottom: 21px;
          .add {
            width: 200px;
          }
        }
        width: 590px;
        // height: 200px;
        padding: 0px;
        .form__block {
          width: 590px;
          padding: 0px;
          margin: 0px;
        }
        .dialog-box__form__group {
          padding-left: 30px;
          padding-top: 20px;
          // height: 225px;
          #dimensional {
            display: block;
            width: 560px;
          }
          #secondary {
            width: 530px;
          }
          .user {
            margin-bottom: 30px;
            label {
              font-size: 14px;
              color: #666;
            }
            span {
              font-size: 14px;
              color: #151515;
              line-height: 20px;
            }
            .username {
              margin-left: 40px;
            }
          }
          .el-form-item {
            .el-form-item__label .el-form-item__label {
              padding-bottom: 8px;
            }
            width: 245px;
            // margin-left: 20px;
            margin-right: 30px;
            margin-bottom: 20px;
          }
          .the-secondary-number {
            position: relative;
            top: -35px;
          }
        }
      }
    }
  }
}
</style>
