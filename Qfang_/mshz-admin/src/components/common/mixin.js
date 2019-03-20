export const handlePages = {
  data() {
    return {
      currentPage: 1, // 分页当前第几页
      recordCount: 20, // 数据总数
      pageSize: 20, // 每页的数据量
      pageCount: 1 /// 总页数
    };
  },
  methods: {
    requestData() {
      // 方法名与组件同名，调用组件内部的
      console.log('没有调用');
    },

    // 分页每页几条
    handleSizeChange(val) {
      this.pageSize = val;
      this.requestData();
    },

    // 跳到第几页
    // handlePageChange
    handlePageChange(val) {
      this.currentPage = val;
      this.requestData();
    }

  }
};

// 用于下拉框 关键字联想管家
export const selectBD = {
  data() {
    return {
      BDList: []
    };
  },
  methods: {

    remoteMethodBD(query) {
      if (query) {
        this.$axios.get(
          '/security/room/queryReturnBd',
          {
            params: {
              personKey: query
            }
          }
        ).then((res) => {
          if (res.data.status === 'C0000') {
            // this.gardenList = res.data.result.map((item) => {
            //   return {
            //     value: item.id,
            //     label: item.gardenName,
            //     gardenId: item.id,
            //     geographyArea: item.geographyArea
            //   };
            // });
            this.BDList = res.data.result;
          } else {
            this.BDList = [];
          }
        }).catch((res) => {
          this.BDList = [];
          console.log(res);
        });
      } else {
        this.BDList = [];
      }
    },
    initBdList(id, name) {
      const orgItem = this.BDList.find((item, index) => {
        return item.id === id;
      });
      if (!orgItem) {
        this.BDList.push({
          id: id,
          bdName: name
        });
      }
    }
  }
};

// 截取 gardenName；
export const truncateGardenName = {
  data() {
    return {
    };
  },
  methods: {
    handelCutGardenName(name) {
      // <span v-if="scope.row.gardenName.indexOf('，') !== -1">{{scope.row.gardenName.split('，')[0]}}</span>
      // <span v-else>{{scope.row.gardenName.split(',')[0]}}</span>
      if (name.indexOf('，') !== -1) {
        return name.split('，')[0];
      } else {
        return name.split(',')[0];
      }
    }
  }
};
