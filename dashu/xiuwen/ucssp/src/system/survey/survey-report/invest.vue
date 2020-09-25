<template>
<div>
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <div class="dialog-box__top">
        <h5 class="title bg__white">业外投资</h5>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <div class="dialog-box__middle">
        <el-form-item label="企业名称" prop="companyName" class="width530">
            <el-input maxlength="50" v-model="svyStaffReport.companyName" placeholder="请输入"></el-input>
          </el-form-item>

          <el-form-item label="是否注册" prop="register">
            <el-select v-model="svyStaffReport.register" placeholder="请选择">
              <el-option
                v-for="item in judge"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="一级行业" prop="primaryIndustry">
            <el-select v-model="svyStaffReport.primaryIndustry" placeholder="请选择" @change="setSecondIndustry">
              <el-option
                v-for="item in fieldConfig.industrysConfig"
                :key="item.sortNum"
                :label="item.itemDesc"
                :value="item.itemCode"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="二级行业" prop="secondIndustry" class="width245">
            <el-select v-model="svyStaffReport.secondIndustry" placeholder="请选择">
              <el-option
                v-for="item in secondIndustrysConfig"
                :key="item.sortNum"
                :label="item.itemDesc"
                :value="item.itemCode"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="主营业务描述" prop="businessDetail" class="width530">
            <el-input maxlength="200" v-model="svyStaffReport.businessDetail" placeholder="请输入"></el-input>
          </el-form-item>

          <el-form-item label="主营性质" prop="jobLimit">
            <el-input maxlength="2"></el-input>
          </el-form-item>

          <el-form-item label="企业类型" prop="jobLimit">
            <el-input maxlength="2"></el-input>
          </el-form-item>

          <el-form-item label="是否本地企业" prop="localCompany">
            <el-select v-model="svyStaffReport.localCompany" placeholder="请选择">
              <el-option
                v-for="item in judge"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="经营年限" prop="ageLimit">
            <el-input @keyup.native="limitNumber(svyStaffReport.ageLimit)" maxlength="2" v-model="svyStaffReport.ageLimit"></el-input>
          </el-form-item>

          <el-form-item label="占股情况" prop="jobLimit">
            <el-input maxlength="2"></el-input>
          </el-form-item>

          <el-form-item label="盈利状态" prop="jobLimit">
            <el-input maxlength="2"></el-input>
          </el-form-item>

          <el-form-item label="申请人加入年限" prop="applyYear">
            <el-input @keyup.native="limitNumber(svyStaffReport.applyYear)" maxlength="2" v-model="svyStaffReport.applyYear"></el-input>
          </el-form-item>

          <el-form-item label="申请人是否参与经营" prop="applyCompany">
            <el-select v-model="svyStaffReport.applyCompany" placeholder="请选择">
              <el-option
                v-for="item in judge"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="投资金额" prop="investMoney">
            <el-input @keyup.native="limitMoney(svyStaffReport.investMoney)" maxlength="7" v-model="svyStaffReport.investMoney"></el-input>
          </el-form-item>

          <el-form-item label="利润分成" prop="profitShare">
            <el-input @keyup.native="limitMoney(svyStaffReport.profitShare)" maxlength="7" v-model="svyStaffReport.profitShare"></el-input>
          </el-form-item>

          <el-form-item label="今年投资(包括已投入和需投入资金）" prop="todayInvest">
            <el-input @keyup.native="limitMoney(svyStaffReport.todayInvest)" maxlength="7" v-model="svyStaffReport.todayInvest"></el-input>
          </el-form-item>

        <div class="btn_group">
            <el-button type="warning" style="width:140px" @click="save">保存</el-button>
            <el-button type="primary" style="width:140px" @click="cancel">取消</el-button>
        </div>

      </div>
    </div>
</div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            secondIndustrysConfig: [] // 二级行业
        };
    },
    props: ['svyStaffReport', 'judge'],
    created() {},
    methods: {
        close() {
            this.$emit('closeMessageBox');
        },
        cancel() {
            this.$emit('closeMessageBox');
        },
        save() {},
        setSecondIndustry() {
            this.$emit('setSecondIndustry');
        }
    },
    computed: {
        ...mapGetters([
            "fieldConfig" // vuex 传参
        ])
    }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
.dialog-box{
    width: 70%;
}
</style>
