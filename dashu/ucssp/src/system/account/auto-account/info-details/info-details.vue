<style lang="less" rel="stylesheet/less" scoped>
.drop_loan {
  .dialog-box {
    width: 900px;
    .title_type {
      text-align: center;
      background: #fff;
      font-size: 18px;
      letter-spacing: 1.3px;
      padding-left: 20px;
      font-weight: bold;
      box-shadow: 0 2px 6px 0 #d0d0d0;
    }
    .el-form-item {
      width: 245px;
      margin-right: 30px;
      &.large {
        width: 520px;
      }
      &:nth-child(4n) {
        margin-right: 0;
      }
    }
    .dialog-box__middle-form {
      overflow-y: auto;
      // padding: 0 20px;
      .form__block {
        padding: 20px 30px;
        // margin-bottom: 20px;
        box-shadow: 0 2px 6px 0 #d0d0d0;
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
      .demo-form-inline {
        margin-bottom: 0;
      }
      .form__bottom {
        left: 50%;
        padding-bottom: 30px;
        background-color: rgba(255, 255, 255);
        text-align: center;
        padding-bottom: 20px;
        .add {
          width: 200px;
          height: 41px;
        }
      }
    }
  }
}
</style>

<template>
  <div class="container">
    <div class="drop_loan">
      <div class="dialog-mask"></div>
      <div class="dialog-box">
        <div class="dialog-box__top">
          <h5 class="title_type">自动出账信息</h5>
          <span class="el-icon-close button button__close" @click="close"></span>
        </div>
        <div class="complete-product">
          <div class="dialog-box__middle-form">
            <el-form
              :model="form"
              :rules="rules"
              ref="form"
              class="demo-form-inline"
              label-position="top"
            >
              <div class="form__block bg__white border__radius-5" >
                <div class="line">
                  <el-form-item class="large" label="产品名称" prop="productName">
                    <el-select v-model="form.productName" placeholder="请选择产品名称" filterable @change="changeProduct">
                      <el-option v-for="item in productList" :key="item.productCode" :label="item.productName" :value="item.productName"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="line">
                  <el-form-item label="产品ID" prop="productId">
                    <el-input v-model="form.productId" :disabled="true"></el-input>
                  </el-form-item>
                </div>
                <div class="line">
                  <el-form-item label="渠道名称" prop="channelNames">
                    <el-select v-model="form.channelNames" placeholder="请选择渠道名称" multiple filterable @change="changeChannel">
                      <el-option v-for="item in channelList" :key="item.channelCode" :label="item.channelName" :value="item.channelName"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="渠道编码" prop="channelCode">
                    <el-input v-model="form.channelCode" :disabled="true"></el-input>
                  </el-form-item>
                  <el-form-item label="是否启用自动出账" prop="isAutoAllotAccount">
                    <el-select v-model="form.isAutoAllotAccount">
                      <el-option :value="false" label="否"></el-option>
                      <el-option :value="true" label="是"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>
              <div class="form__bottom">
                <el-button class="add finish" type="primary" @click="save">保存</el-button>
              </div>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { accountApi } from '../../js/server';
export default {
  name: "autoAccount-detail",
  data() {
    return {
      channelNames: [],
      form: {},
      rules: {
        productName: [
          { required: true, message: '请选择产品名称', trigger: 'change' }
        ],
        productId: [
          { required: true, message: '请先选择产品名称', trigger: 'blur' }
        ],
        channelNames: [
          { required: true, message: '请选择渠道名称', trigger: 'change' }
        ],
        channelCode: [
          { required: true, message: '请先选择渠道名称', trigger: 'blur' }
        ],
        isAutoAllotAccount: [
          { required: true, message: '请选择是否启用自动出账', trigger: 'change' }
        ]
      }
    };
  },
  props: {
    row: Object,
    productList: Array,
    channelList: Array
  },
  methods: {
    close() {
      this.$emit("close");
    },
    save() {
      Object.assign(this.form, {
        channelName: this.form.channelNames.join(",")
      });
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$MyFetch.post(accountApi.autoAccount.saveOrupdate, this.form).then((data) => {
            this.$message.success("保存成功！");
            this.$emit("close", true);
          }).catch((err) => {
            this.$error(err.message);
          });
        }
      });
    },
    changeProduct() {
      this.productList.forEach((item) => {
        if (this.form.productName === item.productName) {
          this.form.productId = item.productCode;
          this.$refs.form.clearValidate("productId");
        }
      });
    },
    changeChannel() {
      let channelCodes = [];
      this.form.channelNames.forEach((channelName) => {
        this.channelList.forEach((item) => {
          if (item.channelName === channelName) {
            channelCodes.push(item.channelCode);
          }
        });
      });
      this.form.channelCode = channelCodes.join(",");
      this.$refs.form.clearValidate("channelCode");
    }
  },
  mounted() {
    let row = this.$lodash.cloneDeep(this.row);
    if (row.channelName) {
      row.channelNames = row.channelName.split(",");
    } else {
      row.isAutoAllotAccount = true;
      row.channelNames = [];
      this.$nextTick(() => {
        this.$refs.form.clearValidate("channelNames");
      });
    }
    this.form = row;
  }
};
</script>
