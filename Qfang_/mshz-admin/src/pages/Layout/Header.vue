<template>
  <div class="head">
    <div class="tags-container"
      ref="tagsContainer">
      <div class="tags-view"
        ref="tags-view">
        <div class="tags-width"
          ref="tagsWidth">
          <router-link ref="tag"
            v-for="tag in visitedTags"
            :to="tag.path"
            :key="tag.path"
            class="tags-view-item"
            :class="isActive(tag)? 'active' : '' ">
            {{tag.name}}
            <span class="el-icon-close"
              v-if=" tag.path!== '/Home'"
              @click="closeViewTags(tag, $event)"></span>
          </router-link>
        </div>
      </div>
    </div>
    <div class="use-info">
      <!-- <el-button type="text"
        @click="personDialog = true">
        <span class="text-color">
          <i class="icon-avatar icon iconfont icon-gerenzhongxin"></i> 个人中心</span>
      </el-button>
      <el-button type="text"
        @click="dialogFormVisible = true">
        <span class="text-color">
          <i class="icon iconfont icon-xiugaimima"></i> 修改密码</span>
      </el-button> -->
      <!-- <el-button type="text"
        @click="logout">
        <span class="text-color">
          <i class="icon iconfont icon-tuichu"></i> 退出</span>
      </el-button> -->

      <el-button type="text"
        v-if="$route.name && $route.name.indexOf('InventoryHouse') > -1"
        class="pdr-10"
        @click="$router.back()">返 回
      </el-button>
      <el-dropdown trigger="click"
        @visible-change="handleVisibleChanghe">
        <span class="el-dropdown-link">
          <div class="avatar">
            <i class="icon-avatar icon iconfont icon-morentouxiang"></i>
          </div>
          {{userInfo.name}} - {{userInfo.positionName}}<i :class="[dropdownVisit ? 'el-icon-arrow-up' : 'el-icon-arrow-down', 'el-icon--right']"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <el-button type="text"
              @click="personDialog = true">
              <span class="text-color">
                <i class="icon iconfont icon-gerenzhongxin"></i> 个人中心</span>
            </el-button>
          </el-dropdown-item>
          <el-dropdown-item>
            <el-button type="text"
              @click="dialogFormVisible = true">
              <span class="text-color">
                <i class="icon iconfont icon-xiugaimima"></i> 修改密码</span>
            </el-button>
          </el-dropdown-item>
          <el-dropdown-item>
            <slot v-if="userInfo.positionLinkModelList && userInfo.positionLinkModelList.length > 1">
              <el-popover v-if="userInfo.positionLinkModelList.length > 1"
                ref="popoverPosition"
                placement="left-start"
                trigger="hover">
                <a class="position-name-item"
                  href="javascript:;"
                  v-for="(item, index) in userInfo.positionLinkModelList"
                  :key="index"
                  @click="changePosition(item.id)">
                  {{item.orgName}} - {{item.positionName}}
                </a>
              </el-popover>

              <div class="position-wrapper">
                <a class="position-name"
                  href="javascript:;"
                  v-popover:popoverPosition>
                  <!-- {{userInfo.name}} - {{userInfo.positionName}} -->
                  <div class="el-button el-button--text">
                    <span class="text-color">
                      <i class="icon iconfont el-icon-refresh font-w"></i>
                      切换岗位
                    </span>
                  </div>
                  <!-- <i class="el-icon-arrow-down"></i> -->
                </a>
              </div>
            </slot>
          </el-dropdown-item>
          <el-dropdown-item>
            <el-button type="text"
              @click="logout">
              <span class="text-color">
                <i class="icon iconfont icon-tuichu"></i> 安全退出</span>
            </el-button>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog title="修改密码"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      append-to-body
      @close="revisePassword"
      width="600px">
      <div class="bgceee">
        <el-form :model="passform"
          ref="passsForm"
          :rules="passformRules"
          size="samll">
          <el-row>
            <el-col :offset="2"
              :span="18">
              <el-form-item label="旧密码"
                prop="oldPass">
                <el-input type="password"
                  v-model="passform.oldPass"
                  auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :offset="2"
              :span="18">
              <el-form-item label="新密码"
                prop="newPass">
                <el-input type="password"
                  v-model="passform.newPass"
                  auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :offset="2"
              :span="18">
              <el-form-item label="确认密码"
                prop="checkPass">
                <el-input type="password"
                  v-model="passform.checkPass"
                  auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="dialog-footer">
        <el-button type="primary"
          size="mini"
          @click="handleRevise">确 定</el-button>
        <el-button size="mini"
          @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog title="个人中心"
      :visible.sync="personDialog"
      :close-on-click-modal="false"
      append-to-body
      width="800px">
      <personal-center :personDialog.sync="personDialog"
        v-if="personDialog">
      </personal-center>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import md5 from 'js-md5';
import personalCenter from './PersonalCenter';

export default {
  components: {
    personalCenter
  },
  computed: {
    ...mapState([
      'userInfo',
      'visitedTags'
    ])
  },
  data() {
    let checkPassRules = (rule, value, callback) => {
      if (value !== this.passform.newPass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      timer: false,
      screenWidth: document.body.clientWidth,
      checkPassRules,
      personDialog: false,
      dialogFormVisible: false,
      passform: {
        oldPass: '',
        newPass: '',
        checkPass: ''
      },
      passformRules: {
        oldPass: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        newPass: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' },
          { pattern: /^\w+$/, message: '密码只能是数字、26个英文字母或者下划线' }
        ],
        checkPass: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' },
          { pattern: /^\w+$/, message: '密码只能是数字、26个英文字母或者下划线' },
          { validator: checkPassRules, trigger: 'blur' }
        ]
      },
      activeIndex: '',
      dropdownVisit: false
    };
  },

  mounted() {
    this.addViewtags();
    window.onresize = () => {
      this.screenWidth = document.body.clientWidth;
    };
  },
  methods: {
    // 调用登出接口，并清除存储的数据
    logout() {
      this.$store.dispatch('logout').then(() => {
        location.reload();
      });
    },

    revisePassword() {
      // 关闭弹框 清空表单
      this.$refs.passsForm.resetFields();
      // this.dialogFormVisible = true;
      // console.log(md5('123456'));
    },

    // 修改密码
    handleRevise() {
      this.$refs.passsForm.validate((valid) => {
        if (valid) {
          this.$axios.post(
            '/security/org/person/updatePsw',
            {
              newPswMd5: md5(this.passform.checkPass),
              oldPswMd5: md5(this.passform.oldPass)
            }
          ).then((res) => {
            if (res.data.status === 'C0000') {
              this.dialogFormVisible = false;
              this.$message.success('处理成功');
              // this.revisePassword();

              this.logout();
              // this.$router.push({ path: '/Login' });
            } else {
              this.$message.error('处理失败');
            }
          }).catch((e) => {
            this.dialogFormVisible = false;
            this.$message.error('处理失败');
          });
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
    // 是不是当前路由
    isActive(route) {
      return route.path === this.$route.path || route.name === this.$route.name;
    },
    // 获取当前路由
    getRoute() {
      if (this.$route.name) {
        return this.$route;
      }
      return false;
    },
    // 增加顶部导航标签
    addViewtags() {
      // 不存到 tags 的route
      let noTags = ['/InventoryHouse'];
      const route = this.getRoute();
      if (!route) {
        return false;
      }
      // 该路由是否不要存到 tags
      if (noTags.some(v => route.path.indexOf(v) > -1)) {
        return;
      }
      // 已有的不需要添加到 stroe
      for (let item of this.visitedTags) {
        if (item.path === route.path) {
          return;
        }
      }
      // console.log(this.visitedTags);
      // 增添该 route 到 store 存储
      this.$store.dispatch('addVisitedTags', route);
    },

    watchTagsList() {
      // 顶部栏容器的宽度
      const $tagsContainerWidth = this.$refs.tagsContainer.offsetWidth - 20;
      let tagsWidth = this.$refs.tagsWidth.offsetWidth;
      // “标签”所需要的宽度 ， 107单个标签的宽度
      if (tagsWidth + 120 > $tagsContainerWidth) {
        // 修改 stroe 的值
        this.$store.commit('handleChangeiSAdd', false);
        // this.openNotify();
        return false;
      } else {
        this.$store.commit('handleChangeiSAdd', true);
      }
    },

    // 关闭标签
    closeViewTags(view, $event) {
      // 删除 store 存储的 view（路由信息）
      this.$store.dispatch('delVisitedTags', view).then(tags => {
        // tags 是删除后的 taglist
        // 被删除的是不是当前的路由 或则 是在库存详情、编辑页进行关闭
        if (this.isActive(view) || this.$route.path.indexOf('InventoryHouse') > -1) {
          // 是 默认跳到最后一个
          const latestView = tags.slice(-1)[0];
          if (latestView) {
            this.$router.push(latestView.path);
          } else {
            this.$router.push('/');
          }
        }
      });
      // console.log($event);
      $event.preventDefault();
    },

    // 提示框
    openNotify() {
      this.$notify({
        title: '提示',
        message: '标签栏导航的“标签”已到最大限制值'
      });
    },

    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    changePosition(positionId) {
      this.$axios
        .post('security/org/person/changePosition', {
          id: positionId
        })
        .then(res => {
          if (res.data.status === 'C0000') {
            location.replace('/');
          } else {
            this.$message({
              type: 'warning',
              message: res.data.message
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleVisibleChanghe(data) {
      this.dropdownVisit = data;
    }
  },

  watch: {
    // 监听路由变化
    $route() {
      this.addViewtags();
    },
    visitedTags: {
      handler(value) {
        // 导航标签列表数据发生变化
        this.$nextTick(() => {
          this.watchTagsList();
        });
      },
      deep: true
    },
    screenWidth() {
      // 浏览器窗口发送变化
      if (!this.timer) {
        this.timer = true;
        setTimeout(() => {
          this.watchTagsList();
          this.timer = false;
        }, 1000);
      }
    }
  }
};
</script>

<style scoped>
.head {
  width: 100%;
  height: 50px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  font-size: 22px;
  background-color: #fff;
  box-shadow: 0px 2px 7px rgba(133, 133, 133, 0.4);
}

.use-info {
  /* display: none; */
  /* width: 176px; */
  line-height: 50px;
  padding-right: 20px;
  padding-left: 10px;
  background-color: #fff;
}
.text-color {
  color: #a39e9e;
}
.text-color:hover {
  color: #666;
}
.text-color:active {
  color: #333;
}

.tags-container {
  flex: 1;
  white-space: nowrap;
  position: relative;
  min-height: 50px;
  box-sizing: border-box;
  overflow: hidden;
  /* overflow-x: auto; */
  text-align: left;
}
.tags-view {
  display: inline-block;
  margin-top: 12px;
  margin-left: 20px;
  text-align: left;
}
.tags-view-item {
  display: inline-block;
  margin-left: 5px;
  padding: 5px 10px;
  height: 26px;
  min-width: 80px;
  line-height: 26px;
  border: 1px solid #eeeeee;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  color: #495060;
  background: #eeeeee;
  font-size: 14px;
  text-align: center;
  text-decoration: none;
}
.tags-view-item.active {
  background-color: #008842;
  color: #fff;
  border-color: #008842;
}
/* .tags-view-item.active::before {
  content: "";
  background: #fff;
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  position: relative;
  margin-right: 2px;
} */

.tags-view-item .el-icon-close {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  text-align: center;
  line-height: 16px;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  transform-origin: 100% 50%;
}
.tags-view-item .el-icon-close:before {
  transform: scale(0.8);
  display: inline-block;
}
.tags-view-item .el-icon-close:hover {
  background-color: #b4bccc;
  color: #fff;
}
.el-dropdown-link {
  cursor: pointer;
}
.el-dropdown-link:hover {
  color: #33a068;
}
.avatar {
  margin-right: 5px;
  display: inline-block;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background-color: #07984d;
  line-height: 32px;
  text-align: center;
  vertical-align: middle;
  overflow: hidden;
}
.icon-avatar {
  font-size: 28px;
  color: #fff;
}
.position-wrapper {
  margin-top: 10px;
  color: #ccc;
}

.position-name {
  color: #ccc;
  font-size: 12px;
}

.position-name-item {
  display: block;
  font-size: 14px;
  padding: 0 20px;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #333;
  height: 34px;
  line-height: 34px;
  box-sizing: border-box;
  cursor: pointer;
}
.position-name-item:hover {
  background-color: #f5f7fa;
}
</style>

