<template>
    <div class="add-user">
      <div class="dialog-mask"></div>
      <div class="dialog-box">
        <div class="dialog-box__top bg__white">
          <h5 class="title">{{this.editObj.type === 'add' ? '新增' : '编辑'}}用户</h5>
          <span class="el-icon-close button button__close" @click="close(false)"></span>
        </div>
        <div class="dialog-box__middle">
          <el-form :inline="true"
                   :model="editObj"
                   :rules="rules"
                   ref="checkForm"
                   class="demo-form-inline">
            <el-form-item prop="userId" class="form__item" label="用户编号">
              <el-input
                v-model="editObj.userId"
                placeholder="请输入用户名"
                :disabled="this.editObj.type !== 'add'">
                <template slot="prepend" v-if="this.editObj.type === 'add'">tp-</template>
              </el-input>
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
            <el-form-item prop="userName" class="form__item"  label="用户姓名">
              <el-input v-model="editObj.userName"></el-input>
            </el-form-item>
            <el-form-item prop="mobilePhoneNum" class="form__item"  label="手机号码">
              <el-input v-model="editObj.mobilePhoneNum"></el-input>
            </el-form-item>
            <el-form-item class="form__item"  label="选择部门">
              <el-cascader
                placeholder="请选择部门"
                clearable
                :options="departments"
                :props="departmentConfig"
                :show-all-levels="false"
                v-model="departmentArr"
                @change="selectDepartment"
                change-on-select
              ></el-cascader>
            </el-form-item>
            <el-form-item class="form__item"  label="密码">
              <el-input v-model="editObj.password" disabled></el-input>
            </el-form-item>
            <el-form-item class="transfer__label"  label="选择角色">
              <el-transfer
                :props="roleConfig"
                ref="transfer"
                :titles="['全选', '全选']"
                filterable
                :left-default-checked="leftChecked"
                :filter-method="filterMethod"
                filter-placeholder="请输入角色名"
                v-model="roleArr"
                @change="handleChange"
                :data="roleList">
              </el-transfer>
            </el-form-item>
            <div class="select-result">
              <span class="title">选择结果</span>
              <div class="select-result__box">
                <ul class="select-result__list">
                  <li class="item" v-for="(item, index) in departmentRoleArr" :key="index">
                    <h5 class="company">{{item.departmentName}}:</h5>
                    <ul class="role_list clearfix">
                      <li class="role f__left" v-for="(itemR, indexR) in item.roleArr" :key="indexR" >角色{{itemR.roleName}} <i class="icon el-icon-close" @click="deleteRole(item, index, indexR)"></i></li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
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
    props: ['editObj', 'departments'],
    data() {
      return {
        // 部门级联 数据关系字典
        departmentConfig: {
          label: 'departmentName',
          children: 'children',
          value: 'departmentId'
        },
        // 部门被选中的值
        departmentArr: [],
        // 角色 数据关系字典
        roleConfig: {
          label: 'roleName',
          key: 'roleId'
        },
        // 所有角色列表
        roleList: [],
        // 角色穿梭框 左边被勾选的值
        leftChecked: [],
        // 角色穿梭宽 被移动到右边的值（被手选后绑定的值）
        roleArr: [],
        // 穿梭框筛选
        filterMethod(query, item) {
          return item.roleName.indexOf(query) > -1;
        },
        // 选中部门+角色结果列表
        departmentRoleArr: [],
        rules: {
          userId: [
            { required: true, message: '请输入账号名', trigger: 'blur' },
            { validator: (rule, value, callback) => {
                const valReg = /^[\u4e00-\u9fa5\w]{1,20}$/;
                if (!valReg.test(value) && !!value && (this.editObj.type === 'add')) {
                  return callback(new Error('请输入20个字符以内的数字/字母/汉字'));
                } else {
                  callback();
                }
              },
              trigger: 'blur' }
          ],
          userName: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { validator: myRule.nameRule, trigger: 'blur' }
          ],
          mobilePhoneNum: [
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            { validator: myRule.phoneRule, trigger: 'blur' }
          ]
        }
      };
    },
    created() {
      this.getAllRole()
        .then(() => {
          if (this.editObj.type !== 'add') {
            this.getRoleInfoByUm(this.editObj.userId)
              .then((data = []) => {
                this.getDepartmentRoleArr(data);
              });
          }
        });
      this.editObj.password = this.editObj.password ? this.editObj.password : 123456;
    },
    components: {},
    methods: {
      close(update) {
        this.$emit('close', update);
      },
      selectDepartment() {
        this.leftChecked = [];
        this.roleArr = [];
        let roleArr = [];
        let departmentId = this.departmentArr[this.departmentArr.length - 1];
        this.departmentRoleArr.forEach((v) => {
          if (v.departmentId === departmentId) {
            roleArr = v.roleArr;
          }
        });
        roleArr.forEach((v) => {
          this.roleArr.push(v.roleId);
        });
        this.$refs.transfer.$refs.leftPanel.handleAllCheckedChange();
      },
      // 穿梭框变化时
      handleChange() {
        if (this.departmentArr.length <= 0) {
          this.confirmFn('请先选择部门后，再选择对应角色！');
          return;
        }
        // 获取所选部门所有信息用于展示
        let departmentInfo = JSON.parse(JSON.stringify(this.getDepartmentInfo(this.departmentArr[this.departmentArr.length - 1])));
        // 获取所选角色所有信息用于展示
        let roleArr = JSON.parse(JSON.stringify(this.getRoleInfo(this.roleArr)));
        departmentInfo.roleArr = roleArr;
        // 判断部门+角色数组中是否已经有该部门与角色的信息
        // 如果没有 就推入一个
        // 如果有 就覆盖掉之前的角色信息
        // 如果是清空了这个部门的角色 那就删掉这条记录
        let hasExist = false;
        this.departmentRoleArr.forEach((v, index) => {
          if (v.departmentId === departmentInfo.departmentId) {
            hasExist = true;
            if (roleArr.length === 0) {
              this.departmentRoleArr.splice(index, 1);
            } else {
              this.$set(v, 'roleArr', roleArr);
            }
          }
        });
        if (!hasExist) {
          this.departmentRoleArr.push(departmentInfo);
        }
      },
      // 由输入的um账号查询用户信息
      getUserInfo(userId) {
        if (!userId) {
          this.editObj.userName = '';
          return;
        }
        this.$MyFetch.get(api.user.getUserInfo + userId + '/UIUserInfo')
          .then((data = {}) => {
            if (data.list.length > 0) {
              this.editObj.userName = data.list[0].name;
            } else {
              this.editObj.userName = '';
            }
          })
          .catch(err => {
            this.confirmFn(err.message, 'error');
          });
      },
      // 编辑时由um账号获取部门角色信息
      getRoleInfoByUm(userId) {
        return new Promise((resolve, reject) => {
          this.$MyFetch.get(api.user.getRoleInfo + userId + '/Roles')
            .then(data => {
              resolve(data.list);
            })
            .catch(err => {
              this.confirmFn(err.message);
            });
        });
      },
      // 获取所有角色
      getAllRole() {
        return new Promise((resolve, reject) => {
          this.$MyFetch.get(api.role.queryRole, {statusCode: 'N'})
            .then((data) => {
              this.roleList = data.list;
              resolve();
            })
            .catch(err => {
              console.log(err);
            });
        });
      },
      // 将后台返回的角色id+部门id转化成 departmentRoleArr格式用于回显
      getDepartmentRoleArr(arr) {
        // 将数据转化成 [{departmentId: '', roleArr: []}]的形式
        let dRArr = [];
        arr.forEach((v) => {
          let hasDepartment = false;
          dRArr.forEach((p, index) => {
            if (p.departmentId === v.departmentId) {
              hasDepartment = true;
              dRArr[index].roleArr.push(v.roleId);
            }
          });
          if (!hasDepartment) {
            dRArr.push({
              departmentId: v.departmentId,
              roleArr: [v.roleId]
            });
          }
        });
        // 将drArr 数据格式进一步转化成 [{departmentId: '', departmentName: '', roleArr: [{roleId:'', roleName: ''}]}]
        let resultArr = [];
        dRArr.forEach((v) => {
          let obj = this.getDepartmentInfo(v.departmentId);
          obj.roleArr = [...this.getRoleInfo(v.roleArr)];
          resultArr.push(obj);
        });
        this.departmentRoleArr = [...resultArr];
      },
      // 由角色id数组返回角色id+角色名数组
      getRoleInfo(arr) {
        let resultArr = [];
        this.roleList.forEach((v) => {
          arr.forEach((n) => {
            if (n === v.roleId) {
              resultArr.push(v);
            }
          });
        });
        return resultArr;
      },
      // 由部门id返回对应的部门id + 部门名
      getDepartmentInfo(id) {
        let obj = {};
        let findDepartment = (departmentArr, id) => {
          departmentArr.forEach((v) => {
            if (v.departmentId === id) {
              obj = v;
            } else if (v.data.length > 0) {
              findDepartment(v.data, id);
            }
          });
        };
        findDepartment(this.departments, id);
        return obj;
      },
      // 选择结果上 删除角色
      deleteRole(obj, index, indexR) {
        // 将部门和 穿梭框置空 以免相互影响
        this.departmentArr = [];
        this.roleArr = [];
        this.$refs.transfer.$refs.leftPanel.handleAllCheckedChange();
        obj.roleArr.splice(indexR, 1);
        if (obj.roleArr.length === 0) {
          this.departmentRoleArr.splice(index, 1);
        }
      },
      // 提交
      submitFn() {
        this.$refs.checkForm.validate((valid) => {
          if (valid) {
            if (this.departmentRoleArr.length === 0) {
              this.confirmFn('请选择部门对应的角色');
              return;
            }
            let role = [];
            this.departmentRoleArr.forEach((v) => {
              v.roleArr.forEach((n) => {
                role.push({
                  departmentId: v.departmentId,
                  roleId: n.roleId
                });
              });
            });
            this.editObj.role = role;
            let data = JSON.parse(JSON.stringify(this.editObj));
            if (this.editObj.type === 'add') {
              data.userId = 'tp-' + data.userId;
              this.$MyFetch.post(api.user.add, data)
                .then(() => {
                  this.confirmFn('新增成功！', 'success');
                  this.close(true);
                })
                .catch(err => {
                  this.confirmFn(err.message, 'error');
                });
            } else {
              this.$MyFetch.put(api.user.edit, data)
                .then(() => {
                  this.confirmFn('更新成功！', 'success');
                  this.close(true);
                })
                .catch(err => {
                  this.confirmFn(err.message, 'error');
                });
            }
          } else {
            this.confirmFn('请检查错误');
          }
        });
      }
    }
  };
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .add-user{
    .dialog-box{
      width: 700px;
      padding: 0 0 20px 0;
      background: #fff;
      .dialog-box__middle{
        height:500px;
        overflow-y: auto;
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
        }
        .bottom__btn-box{
          display: block;
          margin: 20px 31px 0 0;
          text-align: center;
        }
      }
      .transfer__label{
        /deep/.el-form-item__label{
          display: block;
          margin-bottom: 8px;
          text-align: left;
        }
      }
      .select-result{
        margin-right: 40px;
        .title{
          display: block;
          font-size: 14px;
          color: @font-gray;
          padding-bottom: 8px;
        }
        .select-result__box{
          border: 1px solid @line-color;
          padding: 10px 0px;
          border-radius: 4px;
          .select-result__list{
            height: 170px;
            padding: 0px 15px;
            overflow-y: auto;
            font-size: 14px;
            .item{
              padding-bottom: 5px;
              .company{
                line-height: 20px;
                margin-bottom: 5px;
              }
              .role{
                margin-right: 10px;
                margin-bottom: 10px;
                line-height: 28px;
                padding: 0px 8px;
                border: 1px solid #ddd;
                background: #F9FAFB;
                border-radius: 4px;
                .icon{
                  padding-left: 14px;
                  color: @blue-light;
                  font-weight: 900;
                  line-height: 28px;
                  cursor:pointer;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
