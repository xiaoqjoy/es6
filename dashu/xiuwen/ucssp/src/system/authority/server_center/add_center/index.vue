<template>
  <div class="page-add-company">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <div class="dialog-box__top bg__white">
        <h5 class="title">{{!editObj.serviceId? '新增' : '编辑'}}个贷服务中心</h5>
        <span class="el-icon-close button button__close" @click="close(false)"></span>
      </div>
      <div class="dialog-box__middle">
        <el-form :inline="true"
                 :model="editObj"
                 ref="editForm"
                 :rules="rules"
                 class="demo-form-inline">
          <el-form-item prop="serviceName" class="form__item" label="个贷服务中心名称">
            <el-input v-model="editObj.serviceName" placeholder="请填写" maxlength="100"></el-input>
          </el-form-item>
          <el-form-item required prop="statusCode" class="form__item width_25" label="启用状态">
            <el-switch
              class="common__switch"
              :width="50"
              v-model="editObj.statusCode"
              active-text="启用"
              active-value="N"
              inactive-text="停用"
              inactive-value="U">
            </el-switch>
          </el-form-item>
          <el-form-item required prop="remotelySignContractCode" class="form__item width_25" label="是否远程面签">
            <el-switch
              class="common__switch"
              :width="50"
              v-model="editObj.remotelySignContractCode"
              active-text="是"
              active-value="T"
              inactive-text="否"
              inactive-value="F">
            </el-switch>
          </el-form-item>
          <el-form-item prop="leaderName" class="form__item"  label="负责人">
            <el-input v-model="editObj.leaderName" placeholder="请填写" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item prop="serviceMobilePhoneNum" class="form__item"  label="联系手机号">
            <el-input v-model="editObj.serviceMobilePhoneNum"></el-input>
          </el-form-item>
          <el-form-item label="所在区域" prop="area"  class="form__item area__box">
            <el-cascader
              :options="options"
              v-model="editObj.area">
            </el-cascader>
          </el-form-item>
          <el-form-item prop="phoneNum" class="form__item"  label="联系电话">
            <el-input v-model="editObj.phoneNum" placeholder="请填写固定电话"></el-input>
          </el-form-item>
          <el-form-item prop="addressTxt" class="form__item form__item__100 width_100"  label="详细地址">
            <el-input v-model="editObj.addressTxt" placeholder="请填写" maxlength="100"></el-input>
          </el-form-item>
          <el-form-item required prop="preparedSignCallNumCode" class="form__item width_25" label="备签排队">
            <el-switch
              class="common__switch"
              :width="50"
              v-model="editObj.preparedSignCallNumCode"
              active-text="是"
              active-value="T"
              inactive-text="否"
              inactive-value="F">
            </el-switch>
          </el-form-item>
          <el-form-item required prop="oneClickPrintContractCode" class="form__item width_25" label="是否一键打印">
            <el-switch
              class="common__switch"
              :width="50"
              v-model="editObj.oneClickPrintContractCode"
              active-text="是"
              active-value="T"
              inactive-text="否"
              inactive-value="F">
            </el-switch>
          </el-form-item>
          <el-form-item class="bottom__btn-box">
            <el-button type="primary" class="button button__blue width200" @click="submitFn">确认</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import '@common/css/dialog';
  import api from '../../js/server/server';
  import myRule from '@common/js/rules';
  export default{
    props: ['editObj'],
    data() {
      return {
        dropSelectShow: false, // 显示地区下拉项目
        options: [], // 地区编码字典
        defaultProps: {
          children: 'children',
          label: 'label'
        }, // 数据关系
        firstArea: '', // 展示选中的第一个地区,
        selectAreaArr: [], // 存放选中地区（包含该地区的所有信息）数组
        rules: {
          serviceName: [
            { required: true, message: '请输入个贷服务中心名称', trigger: 'blur' },
            { validator: myRule.companyNameRule, trigger: 'blur' }
          ],
          leaderName: [
            { required: true, message: '请输入负责人姓名', trigger: 'blur' },
            { validator: myRule.nameRule, trigger: 'blur' }
          ],
          serviceMobilePhoneNum: [
            { required: true, message: '请输入联系人手机号', trigger: 'blur' },
            { validator: myRule.phoneRule, trigger: 'blur' }
          ],
          addressTxt: [
            { required: true, message: '请输入详细地址', trigger: 'blur' },
            { validator: myRule.addressRule, trigger: 'blur' }
          ],
          phoneNum: [
            { required: true, message: '请输入联系电话', trigger: 'blur' },
            { validator: myRule.fix_phoneRule, trigger: 'blur' }
          ],
          area: [
            { required: true, message: '请选择个贷服务中心地址', trigger: 'blur' }
          ]
        }
      };
    },
    created() {
      this.getArea().then((data) => {
        this.options = data;
        this.$set(this.editObj, 'area', this.getAddressArr(this.editObj.area[0], this.options));
      });
    },
    components: {},
    methods: {
      close(update) {
        this.$emit('close', update);
      },
      submitFn() {
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            let query = Object.assign({}, this.editObj);
            query.area = [query.area[query.area.length - 1]];
            if (!this.editObj.serviceId) {
              // 新增分公司
              this.$MyFetch.post(api.serviceCenter.add, query)
                .then(() => {
                  this.confirmFn('新增成功！', 'success');
                  this.close(true);
                })
                .catch(err => {
                  this.confirmFn(err.message, 'error');
                });
            } else {
              // 编辑分公司
              this.$MyFetch.put(api.serviceCenter.edit, query)
                .then(() => {
                  this.confirmFn('修改成功！', 'success');
                  this.close(true);
                })
                .catch(err => {
                  this.confirmFn(err.message, 'error');
                });
            }
          }
        });
      }
    }
  };
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .page-add-company{
    .dialog-box{
      width: 700px;
      padding: 0;
      .dialog-box__middle{
        min-height:432px;
        padding: 18px 42px 30px;
        .demo-form-inline{
          margin-right: -31px;
          font-size: 0;
          .form__item{
            width: 50%;
            padding-right: 31px;
            margin-right: 0;
            /deep/ .el-form-item__content{
              width: 100%;
            }
            /deep/ .el-form-item__label{
              padding-bottom: 7px;
            }
          }
          .width_25{
            width: 25%;
          }
          .width_33{
            width: 33%;
          }
          .width_100{
            width: 100%;
          }
        }
        .bottom__btn-box{
          display: block;
          margin: 10px 31px 0 0;
          text-align: center;
        }
      }
      .area__box{
        position: relative;
        .area__button{
          width: 100%;
          line-height: 38px;
          padding-left: 15px;
          vertical-align: top;
          background: none;
          border: 1px solid @line-color;
          text-align: left;
          color: @font-gray;
          .icon{
            position:absolute;
            transform: rotateZ(180deg);
            right: 5px;
            top: 0;
            color: #c0c4cc;
          }
        }
        .area__button.isactive{
          border-color: @blue-light;
          .icon{
            transform: rotateZ(0);
          }
        }
        .tree__box{
          position: absolute;
          top: -180px;
          width: 100%;
          height: 180px;
          overflow-y: auto;
          border: 1px solid @line-color;
          background: #fff;
          z-index: 10;
          border-radius: 4px;
        }
      }
    }
  }
</style>
