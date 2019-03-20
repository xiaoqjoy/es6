// 校验是否存在传入的指定权限
// 示例： <el-button v-if="checkPermission('ORDER_EDIT')" type="success" size="small" @click="handleEdit">修改</el-button>

const checkPermission = {
  // eslint-disable-next-line
  install(Vue, options) {
    Vue.mixin({
      methods: {
        checkPermission(data) {
          let permissionList = this.$store.state.permission;
          if (permissionList && permissionList.length && permissionList.includes(data)) {
            return true;
          }
          return false;
        }
      }
    });
  }
};

export default checkPermission;
