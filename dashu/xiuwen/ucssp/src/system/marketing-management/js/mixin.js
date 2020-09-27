import { userInfo } from '@common/js/localStorage';
export default {
  computed: {
    isAdmin() {
      let flag = false;
      if (this.userInfo.role) {
        this.userInfo.role.forEach((role) => {
          if (role.roleId.toLowerCase() === "cpms_r_mm_0001") {
            flag = true;
          }
        });
      }
      return flag;
    },
    isManager() {
      let flag = false;
      this.belongToUserIds.forEach((user) => {
        if (user.userId.toLowerCase() === this.userInfo.userId.toLowerCase()) {
          flag = true;
        }
      });
      return flag;
    },
    isTeamLeader() {
      let flag = false;
      if (this.userInfo.role) {
        this.userInfo.role.forEach((role) => {
          if (role.roleId.toLowerCase() === "cpms_r_mm_0003") {
            flag = true;
          }
        });
      }
      return flag;
    },
    canAdd() {
      if (this.isAdmin || this.isTeamLeader || this.isManager) {
        return true;
      } else {
        return false;
      }
    },
    belongToUserId() {
      return this.userInfo.userId;
    }
  },
  data() {
    return {
      userInfo: JSON.parse(userInfo.getUserInfo())
    };
  }
};
