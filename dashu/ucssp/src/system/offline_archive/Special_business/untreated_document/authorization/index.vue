<style lang="less" rel="stylesheet/less" scoped>
.drop_loan {
  .dialog-box {
    width: 560px;
    min-height: 276px;
    .title_type {
      text-align: center;
      background: #fff;
      letter-spacing: 1.3px;
      font-weight: bold;
      span {
        font-size: 16px;
        font-weight: 900;
      }
    }
    .form__bottom {
      display: inline-block;
      .el-button {
        width: 200px;
        height: 40px;
      }
    }
    .no {
      position: absolute;
      left: 60px;
      bottom: 30px;
    }
    .yes {
      position: absolute;
      right: 60px;
      bottom: 30px;
    }
    .title_type {
      font-size: 14px;
      color: #333333;
      letter-spacing: 1.07px;
      text-align: center;
    }
    .el-form {
      margin: 20px 0px 60px 30px;
      /deep/.el-input {
        width: 370px;
      }
      .product {
        margin-bottom: 20px;
        padding-right: 20px;
        span {
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #999999;
          line-height: 20px;
          img {
            width: 15px;
            margin-left: 10px;
          }
        }
        .content {
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #333333;
          line-height: 20px;
        }
      }
      .canReconsider {
        background: rgba(245, 95, 95, 0.2);
        color: red;
        margin-left: 10px;
      }
    }
    .confirm {
      width: 100px;
      height: 40px;
      background: #ffffff;
      border: 1px solid #538bf1;
      border-radius: 4px;
      position: absolute;
      top: 108px;
      right: 30px;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #538bf1;
      letter-spacing: 1.07px;
      text-align: center;
    }
  }
}
</style>
<template>
  <div class="drop_loan">
    <div class="dialog-mask"></div>
    <div class="dialog-box" v-loading="loading"
    element-loading-text="数据加载中">
      <div class="dialog-box__top">
        <div class="title_type">
          <span>选择建档原因</span>
        </div>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
        label-width="100px"
        class="demo-form-inline"
        label-position="top"
      >
        <el-form-item label="授权原因">
          <el-select
            class="selectionbar"
            v-model="form.certificate_type_code"
            placeholder="请选择授权原因"
          >
            <el-option
              v-for="item in role"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否重签" v-if="judge">
          <el-select class="selectionbar" disabled v-model="form.guarantee_name" placeholder="重签资料">
            <el-option
              v-for="item in material"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <div v-for="(item, index) in product" :key="index" class="product">
          <span>产品{{item.sortNum}}:</span>
          <span class="content">{{item.productName}}</span>
          <span>
            <img v-if="item.canReconsider" src="../../../../../common/img/check-circle.png">
            <span class="canReconsider" v-if="!item.canReconsider">{{item.noReconsiderReason}}</span>
          </span>
        </div>
        <!-- <div class="product" v-if="judge"><span>产品一:</span><span class="content">西安银行+西安银行+大数融担+大数时贷+信用贷</span></div> -->
      </el-form>
      <el-button class="confirm" @click="finish">确定</el-button>
      <div class="form__bottom yes">
        <el-button class="add finish" @click="close">取消</el-button>
      </div>
      <div class="form__bottom no">
        <el-button :disabled="!judgea" class="add finish" type="primary" @click="new_built">新建</el-button>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { configApi } from "../../../js/server.js"; // 接口
import "@common/css/dialog";
export default {
  data() {
    return {
      judge: false,
      judgea: false,
      product: [],
      loading: false,
      role: [
        { label: "我司否决复议业务", value: "030" },
        {
          label: "合作机构放款否决业务",
          value: "020"
        }
      ],
      material: [
        {
          label: "重签资料",
          value: 1
        },
        {
          label: "不重签资料",
          value: 2
        }
      ],
      form: {
        certificate_type_code: ""
      },
      rules: {
        guarantee_name: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ]
      }
    };
  },
  props: ["id", "refer"],
  methods: {
    close() {
      this.$emit("clsoe_windowAlert_s");
    },
    finish() {
      let url = configApi.authReason;
      let data = {
        authReasonCode: this.form.certificate_type_code, // 当前页
        id: this.id // 当前多少条数据
      };
      this.$MyFetch
        .get(url, data)
        .then((data = {}) => {
          console.log(data);
          this.judgea = true;
          this.judge = true;
          this.product = data.products;
          if (data.resignInd) {
            this.form.guarantee_name = 1;
          } else {
            this.form.guarantee_name = 2;
          }
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    new_built() {
      this.loading = true;
      let url = configApi.saveAuthReason;
      console.log(this.id);
      let data = {
        authReasonCode: this.form.certificate_type_code, // 当前页
        id: this.id // 当前多少条数据
      };
      this.$MyFetch
        .post(url, data)
        .then((data = {}) => {
          this.loading = false;
          this.$emit("clsoe_windowAlert_s");
          this.refer(1);
        })
        .catch(err => {
          this.$error(err.message);
          this.loading = false;
        });
    }
  }
};
</script>
