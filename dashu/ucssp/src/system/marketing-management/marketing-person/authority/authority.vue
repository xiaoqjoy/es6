<style lang="less" rel="stylesheet/less" scoped>
  .drop_loan{
    .dialog-box{
      width: 700px;
      padding: 0;
      .dialog-box__middle{
        height:500px;
        overflow-y: auto;
        padding: 18px 42px 20px;
        .el-form-item {
          display: block;
          /deep/ .el-form-item__label {
            float: none;
            text-align: left;
            display: block;
          }
          /deep/ .el-form-item__content {
            display: block;
            width: 100%;
            .el-select {
              width: 245px;
              margin-top: 10px;
            }
          }
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
        .select-result__list{
          height: 170px;
          padding: 10px 15px;
          border: 1px solid @line-color;
          border-radius: 4px;
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
              margin-bottom: 5px;
              line-height: 28px;
              padding: 0px 8px;
              border: 1px solid #ddd;
              background: #ececec;
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
      .form__bottom {
        margin-top: 28px;
        text-align: center;
      }
    }
  }
</style>
<template>
  <div class="drop_loan">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <div class="dialog-box__top bg__white">
        <h5 class="title">角色授权</h5>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <div class="dialog-box__middle">
        <el-form>
          <el-form-item label="营销团队">
            <el-select filterable v-model="form.marketTeamId" placeholder="请选择营销团队" @change="changeTeam">
              <el-option v-for="team in marketingManagementTeams" :key="team.marketTeamId"
              :label="team.marketTeamName" :value="team.marketTeamId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="工种">
            <el-checkbox-group v-model="form.postTypes" @change="changePost">
              <el-checkbox v-for="code in post_type" :key="code.itemCode" :label="code.itemCode">{{ code.itemDesc }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <div class="select-result">
          <span class="title">选择结果</span>
          <ul class="select-result__list">
            <li class="item" v-for="(item, index) in roleArr" :key="index">
              <h5 class="company">{{item.team.marketTeamName}}:</h5>
              <ul class="role_list clearfix">
                <li class="role f__left" v-for="(itemR, indexR) in item.postTypes" :key="indexR" >{{itemR.itemDesc}} <i class="icon el-icon-close" @click="deleteRole(item, index, indexR)"></i></li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="form__bottom">
          <el-button class="add finish" type="primary" @click="finish">保存</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import '@common/css/dialog';
  export default{
    props: {
      userId: String,
      tableData: Array,
      marketingManagementTeams: Array,
      post_type: Array,
      post_level: Array
    },
    data() {
      return {
        roleArr: [],
        roleOri: [],
        team: {},
        form: {
          marketTeamId: '',
          postTypes: []
        }
      };
    },
    methods: {
      close() {
        this.$emit('close');
      },
      changeTeam(id) {
        this.marketingManagementTeams.forEach((team) => {
          if (team.marketTeamId === id) {
            this.team = team;
          }
        });
        let arr = [];
        this.roleArr.forEach((role) => {
          if (role.team.marketTeamId === id) {
            role.postTypes.forEach((post) => {
              arr.push(post.postTypeCode);
            });
          }
        });
        this.form.postTypes = arr;
      },
      changePost() {
        if (!this.form.marketTeamId) {
          this.form.postTypes = [];
          this.$message.warning("请先选择营销团队");
          return;
        }
        let index = -1;
        let postTypes = [];
        this.roleOri.forEach((role, i) => {
          if (role.team.marketTeamId === this.team.marketTeamId) {
            index = i;
          }
        });
        this.form.postTypes.forEach((type) => {
          let flag = false;
          if (index > -1) {
            this.roleOri[index].postTypes.forEach((post) => {
              if (post.postTypeCode === type) {
                postTypes.push(post);
                flag = true;
              }
            });
          }
          if (!flag) {
            this.post_type.forEach((post) => {
              if (type === post.itemCode) {
                post.postTypeCode = post.itemCode;
                postTypes.push(post);
              }
            });
          }
        });
        let data = {
          team: this.team,
          postTypes: postTypes
        };
        if (index === -1) {
          this.roleArr.forEach((role, i) => {
          if (role.team.marketTeamId === this.team.marketTeamId) {
            index = i;
          }
        });
        }
        if (index > -1) {
          if (data.postTypes.length > 0) {
            this.roleArr.splice(index, 1, data);
          } else {
            this.roleArr.splice(index, 1);
          }
        } else {
          this.roleArr.push(data);
        }
      },
      deleteRole(obj, index, indexR) {
        this.roleArr[index].postTypes.splice(indexR, 1);
        if (this.roleArr[index].postTypes.length === 0) {
          this.roleArr.splice(index, 1);
        }
        let posts = [];
        this.roleArr.forEach((role) => {
          if (role.team.marketTeamId === this.form.marketTeamId) {
            role.postTypes.forEach((type) => {
              posts.push(type.postTypeCode);
            });
          }
        });
        this.form.postTypes = posts;
      },
      finish() {
        let arr = [];
        this.roleArr.forEach((role) => {
          role.postTypes.forEach((post) => {
            arr.push({
              team: role.team,
              postTypes: post,
              availableDate: post.availableDate,
              unavailableDate: post.unavailableDate
            });
          });
        });
        this.$emit("finish", arr);
      }
    },
    mounted() {
      this.tableData.forEach((data) => {
        let flag = false;
        this.roleArr.forEach((role, i) => {
          if (data.team.marketTeamId === role.team.marketTeamId) {
            flag = true;
            this.roleArr[i].postTypes.push(data.postTypes);
          }
        });
        if (!flag) {
          this.roleArr.push({
            team: data.team,
            postTypes: [data.postTypes],
            availableDate: data.availableDate,
            unavailableDate: data.unavailableDate
          });
        }
      });
      this.roleOri = [...this.roleArr];
    }
  };
</script>
