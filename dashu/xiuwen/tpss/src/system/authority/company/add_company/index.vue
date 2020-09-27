<template>
  <div class="page-add-company">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <div class="dialog-box__top bg__white">
        <h5 class="title">{{editObj.organizationId ? '编辑' : '新增'}}分公司</h5>
        <span class="el-icon-close button button__close" @click="close(false)"></span>
      </div>
      <div class="dialog-box__middle">
        <el-form :inline="true"
                 :model="editObj"
                 ref="editForm"
                 :rules="rules"
                 class="demo-form-inline">
          <el-form-item prop="organizationName" class="form__item" label="分公司名称">
            <el-input v-model="editObj.organizationName" placeholder="请填写" maxlength="100"></el-input>
          </el-form-item>
          <el-form-item required prop="statusCode" class="form__item" label="启用状态">
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
          <el-form-item prop="parentOrganizationId" class="form__item"  label="上级分公司">
            <el-select
              v-model="editObj.parentOrganizationId"
              collapse-tags
              clearable
              placeholder="请选择">
              <el-option
                v-for="(item, index) in companyArr"
                :key="index"
                :label="item.organizationName"
                :value="item.organizationId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item  class="form__item" prop="organizationLevelCode" label="分公司级别">
            <el-select
              v-model="editObj.organizationLevelCode"
              collapse-tags
              clearable
              placeholder="请选择">
              <el-option label="总公司" value="C"></el-option>
              <el-option label="分公司" value="B"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="leaderName" class="form__item"  label="负责人">
            <el-input v-model="editObj.leaderName" placeholder="请填写" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item prop="leaderPostName" class="form__item"  label="负责人职务">
            <el-input v-model="editObj.leaderPostName" placeholder="请填写" maxlength="10"></el-input>
          </el-form-item>
          <el-form-item prop="phoneNum" class="form__item"  label="联系电话">
            <el-input v-model="editObj.phoneNum" placeholder="请填写"></el-input>
          </el-form-item>
          <div class="el-form-item form__item area__box">
            <p class="lab"><span class="icon icon__star">*</span>区域</p>
            <button class="button area__button"
                    type="button"
                    @click="dropSelectShow=!dropSelectShow"
                    :class="{isactive:dropSelectShow}">
              {{selectAreaArr[0] ? '' : '请选择'}}
              <el-tag  size="mini" v-if="selectAreaArr.length > 0">{{selectAreaArr[0] ? selectAreaArr[0].label : ''}}</el-tag>
              <el-tag  size="mini" v-if="selectAreaArr.length > 1">...</el-tag>
              <i class="icon el-select__caret el-input__icon el-icon-arrow-up"></i>
            </button>
            <transition name="el-zoom-in-bottom">
              <div class="tree__box" v-show="dropSelectShow">
                <el-tree
                  :data="options"
                  show-checkbox
                  node-key="value"
                  ref="tree"
                  :props="defaultProps"
                  @check-change="getSelectArr"
                  class="tree"></el-tree>
              </div>
            </transition>
          </div>
          <el-form-item prop="addressTxt" class="form__item form__item__100"  label="详细地址">
            <el-input v-model="editObj.addressTxt" placeholder="请填写" maxlength="100"></el-input>
          </el-form-item>
          <el-form-item class="form__item" prop="service"  label="可面签个贷服务中心">
            <el-select
              v-model="editObj.service"
              multiple
              placeholder="请选择">
              <el-option :label="item.serviceName"
                         :value="item.serviceId"
                         v-for="(item, index) in serviceList"
                         :key="index"></el-option>
            </el-select>
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
    props: {
      editObj: {
        default() {
          return {
            organizationName: '',
            statusCode: 'N',
            parentOrganizationId: '',
            organizationLevelCode: 'C',
            leaderName: '',
            leaderPostName: '',
            phoneNum: '',
            area: [],
            addressTxt: '',
            service: []
          };
        }
      }
    },
    data() {
      return {
        // 验证规则
        rules: {
          organizationName: [
            { required: true, message: '请输入分公司名称', trigger: 'blur' },
            { validator: myRule.companyNameRule, trigger: 'blur' }
          ],
          leaderName: [
            { required: true, message: '请输入负责人名称', trigger: 'blur' },
            { validator: myRule.nameRule, trigger: 'blur' }
          ],
          leaderPostName: [
            { required: true, message: '请输入负责人职务', trigger: 'blur' },
            { validator: myRule.allChart, trigger: 'blur' }
          ],
          phoneNum: [
            { required: true, message: '请输入联系电话', trigger: 'blur' },
            { validator: myRule.allPhoneRule, trigger: 'blur' }
          ],
          addressTxt: [
            { required: true, message: '请输入详细地址', trigger: 'blur' },
            { validator: myRule.addressRule, trigger: 'blur' }
          ],
          service: [
            { required: true, message: '请选择个贷服务中心', trigger: 'change' }
          ]
        },
        dropSelectShow: false, // 显示地区下拉项目
        options: [], // 地区编码字典
        serviceList: [], // 所有服务中心字典
        defaultProps: {
          children: 'children',
          label: 'label'
        }, // 数据关系
        firstArea: '', // 展示选中的第一个地区,
        selectAreaArr: [], // 存放选中地区（包含该地区的所有信息）数组
        companyArr: []
      };
    },
    created() {
      this.queryApi();
      this.getArea().then((data) => {
        this.options = data;
        this.setCheckedKeys();
        this.$nextTick(() => {
          this.selectAreaArr = [...this.$refs.tree.getCheckedNodes()];
        });
      });
      this.getAllServiceCenter();
    },
    components: {},
    methods: {
      close(update) {
        this.$emit('close', update);
      },
      // 获取上级分公司码表
      queryApi() {
        this.$MyFetch.get(api.company.queryCompany, {statusCode: 'N'})
          .then((data) => {
            this.companyArr = [...data.list];
          })
          .catch(err => {
            this.confirmFn(err.message, 'error');
          });
      },
      // 勾选地区时设置显示问题
      getSelectArr() {
        this.selectAreaArr = [...this.$refs.tree.getCheckedNodes()];
        this.editObj.area = [...this.$refs.tree.getCheckedKeys()];
      },
      // 地区回显
      setCheckedKeys() {
        this.$refs.tree.setCheckedKeys(this.editObj.area);
      },
      // 获取所有个贷服务中心
      getAllServiceCenter() {
        this.$MyFetch.get(api.serviceCenter.getAllCenter, {statusCode: 'N'})
          .then((data) => {
            this.serviceList = [...data.list];
          })
          .catch(err => {
            this.confirmFn(err.message, 'error');
          });
      },
      submitFn() {
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            if (this.editObj.area.length === 0) {
              this.confirmFn('请选择地区！', 'error');
            } else {
              if (!this.editObj.organizationId) {
                // 新增分公司
                this.$MyFetch.post(api.company.addCompany, this.editObj)
                  .then(() => {
                    this.confirmFn('新增成功！', 'success');
                    this.close(true);
                  })
                  .catch(err => {
                    this.confirmFn(err.message, 'error');
                  });
              } else {
                // 编辑分公司
                this.$MyFetch.put(api.company.editCompany, this.editObj)
                  .then(() => {
                    this.confirmFn('修改成功！', 'success');
                    this.close(true);
                  })
                  .catch(err => {
                    this.confirmFn(err.message, 'error');
                  });
              }
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
      padding: 0 0 20px 0;
      background: #fff;
      .dialog-box__middle{
        min-height:432px;
        padding: 18px 42px 0px;
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
          .form__item__100{
            width: 100%;
          }
        }
        .bottom__btn-box{
          display: block;
          margin: 10px 31px 0 0;
          text-align: center;
        }
        .area__box{
          position: relative;
          .area__button{
            width: 100%;
            height: 40px;
            padding-left: 15px;
            vertical-align: top;
            background: none;
            border: 1px solid @line-color;
            text-align: left;
            color: @font-gray;
            .icon{
              position:absolute;
              transform: rotateZ(180deg);
              right: 35px;
              top: 12px;
              color: #c0c4cc;
              font-size: 14px;
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
            top: -158px;
            width: 100%;
            height: 180px;
            overflow-y: auto;
            border: 1px solid @line-color;
            background: #fff;
            z-index: 10;
            border-radius: 4px;
          }
          .lab{
            padding: 0 0 7px;
            line-height: 17px;
            font-size: 12px;
            color: @font-gray;
            .icon__star{
              color: @red;
              margin-right: 5px;
            }
          }
        }
      }
    }
  }
</style>
