<template>
    <div class="import-message bankCard" >
      <div class="dialog-mask"></div>
      <div class="dialog-box" v-loading='formLoading'>
        <!-- 头部 -->
        <div class="dialog-box__top">
          <h5 class="title bg__white">编辑</h5>
          <span class="el-icon-close button button__close" @click="close_()"></span>
        </div>
        <!-- 主体部分 -->
        <div class="dialog-box__body">
          <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
            <!-- 单位信息 -->
            <div class="anti-fraud_dialog-box__middle">
              <div class="center">
                <ul class="clearfix">
                  <li class="f__left">
                    <p><span>*</span>合作机构</p>
                    <el-form-item prop="orgId">
                      <el-select v-model="ruleForm.orgId" placeholder="请选择" filterable clearable @change='orgIdChange'>
                        <el-option v-for="item in partnerList" :key="item.partnerCd" :value="item.partnerCd" :label="item.partnerName"></el-option>
                      </el-select>
                    </el-form-item>
                  </li>
                  <li class="f__right">
                    <p><span>*</span>一级产品</p>
                    <el-form-item prop="primaryProductCode">
                      <el-select v-model="ruleForm.primaryProductCode" multiple clearable collapse-tags placeholder="请选择" @change="primaryProductChange" >
                        <el-option v-for="item in topBusinessType" :key="item.codeValue" :label="item.codeText" :value="item.codeValue">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </li>
                  <li class="f__left">
                    <p><span>*</span>收款卡卡bin校验</p>
                    <el-form-item prop="checkBin">
                      <el-select v-model="ruleForm.checkBin" placeholder="请选择">
                        <el-option v-for="item in checkBins" :key="item.value" :value="item.value" :label="item.label"></el-option>
                      </el-select>
                    </el-form-item>
                  </li>
                  <li class="f__right">
                    <p><span>*</span>收款卡四要素校验</p>
                    <el-form-item prop="checkElement">
                      <el-select v-model="ruleForm.checkElement" placeholder="请选择">
                        <el-option v-for="item in checkElements" :key="item.value" :value="item.value" :label="item.label"></el-option>
                      </el-select>
                    </el-form-item>
                  </li>
                  <li class="f__left li_textarea">
                    <p>备注<a>（限20个汉字）</a></p>
                    <el-form-item prop="remark">
                      <el-input type="textarea" maxlength="20" v-model="ruleForm.remark"></el-input>
                    </el-form-item>
                  </li>
                </ul>
              </div>
            </div>
          </el-form>
        </div>
        <!-- 底部 -->
        <div class="text-center">
          <el-button type="primary" @click="save">确定</el-button>
        </div>
      </div>
    </div>
</template>
<script type="text/ecmascript-6">
import "@common/css/dialog";
import { accountApi } from "../../../account/js/server.js"; // 接口
export default {
  props: {
    partnerList: {
      type: Array,
      default: function() {
        return [];
      }
    },
    topBusinessType: {
      type: Array,
      default: function() {
        return [];
      }
    },
    editForm: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      // 收款卡卡bin校验
      checkBins: [
        {
          label: "是",
          value: "Y"
        },
        {
          label: "否",
          value: "N"
        }
      ],
      // 收款卡四要素校验
      checkElements: [
        {
          label: "是",
          value: "Y"
        },
        {
          label: "否",
          value: "N"
        }
      ],
      primaryProductName: [],
      // 加载状态
      formLoading: false,
      // 正则验证
      rules: {
        orgId: [
          {
            required: true,
            message: "合作机构不能为空",
            trigger: "blur"
          }
        ],
        primaryProductCode: [
          {
            required: true,
            message: "一级产品不能为空",
            trigger: "blur"
          }
        ],
        checkBin: [
          {
            required: true,
            message: "收款卡卡bin校验不能为空",
            trigger: "blur"
          }
        ],
        checkElement: [
          {
            required: true,
            message: "收款卡四要素校验不能为空",
            trigger: "blur"
          }
        ]
      },
      ruleForm: {}
    };
  },
  // 组件
  components: {},
  created() {
    this.ruleForm = Object.assign({}, this.editForm);
    this.ruleForm.primaryProductCode = this.editForm.primaryProductCode.split(
      ","
    );
    this.ruleForm.primaryProductName = this.editForm.primaryProductName.split(
      ","
    );
    // console.log(this.ruleForm);
  },
  methods: {
    // 新增接口
    save() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          // console.log(this.ruleForm);
          // 新增->保存按钮
          let req = {
            id: this.ruleForm.id,
            orgId: this.ruleForm.orgId,
            orgName: this.ruleForm.orgName,
            primaryProductName: this.ruleForm.primaryProductName.join(","),
            primaryProductCode: this.ruleForm.primaryProductCode.join(","),
            checkBin: this.ruleForm.checkBin,
            checkElement: this.ruleForm.checkElement,
            remark: this.ruleForm.remark
          };
          // console.log(req);
          let url =
            accountApi.bankCard_check_rule_maintain.updateBankCardCheckInfo;
          this.formLoading = true;
          this.$MyFetch
            .post(url, req)
            .then((data = {}) => {
              this.formLoading = false;
              // console.log(data);
              this.$message({
                message: data,
                type: "success"
              });
              this.$parent.refer(1);
              this.close_();
            })
            .catch(err => {
              this.formLoading = false;
              this.close_();
              this.$error(err.message);
            });
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    orgIdChange(val) {
      this.partnerList.map(item => {
        if (item.partnerCd === val) {
          this.ruleForm.orgName = item.partnerName;
        }
      });
    },
    primaryProductChange(val) {
      // console.log(val);
      // console.log(this.topBusinessType);
      this.ruleForm.primaryProductName = [];
      this.topBusinessType.map(value => {
        val.map(v => {
          if (value.codeValue === v) {
            // console.log(value);
            this.ruleForm.primaryProductName.push(value.codeText);
          }
        });
      });
    },
    // 关闭弹窗
    close_() {
      this.$emit("clsoe_windowAlert2");
    }
  }
};
</script>
<style lang="less" rel="stylesheet/less">
</style>
<style lang="less" rel="stylesheet/less" scoped>
.import-message {
  .dialog-box {
    width: 566px;
    background: #FFFFFF;
    .el-form-item {
      margin-right: 0;
    }
    .dialog-box__body {
      overflow-y: auto;
      overflow-x: hidden;
      height: 296px;
    }
  }
}
//关闭按钮
.el-icon-close {
  position: absolute;
  font-size: 32px;
  top: 12px;
  right: 10px;
  cursor: pointer;
}
.anti-fraud_dialog-box__middle {
  width: 566px;
  overflow: hidden;
  background: #fff;
  border-radius: 4px;
}
.center {
  text-align: left;
  overflow: hidden;
  margin: 0 38px;
  ul {
    li {
      overflow: hidden;
      .el-form-item {
        height: 40px;
        margin-bottom: 20px;
      }
      &.li_textarea {
        height: 120px;
      }
    }
    a {
      margin-top: 10px;
      font-size: 12px;
    }
  }
  p {
    color: #bbbbbb;
    font-size: 12px;
    padding-bottom: 10px;
    span {
      color: #f00;
      display: inline-block;
      margin-right: 10px;
    }
  }
}
// 保存按钮
.text-center {
  text-align: center;
}
.el-button--primary {
  width: 200px;
  height: 40px;
  margin: 8px 0px 10px;
  background: #538bf1;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #fff;
}
/deep/ li .el-form-item input{
  width: 225px;
}
/deep/ li .el-form-item textarea{
  width: 490px;
}

</style>
