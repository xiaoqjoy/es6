<template>
  <section>
    <section class="take-dialog pd-20">
      <el-row class="pdb-20">
        <el-col v-if="addLookType === 'house'"
          :span="8">
          <el-input placeholder="输入楼盘/楼栋/房号搜索"
            size="mini"
            clearable
            @keyup.enter.native="handlePageChange(1)"
            v-model="keyword"
            :maxlength="15">
          </el-input>
        </el-col>
        <el-col :offset="1"
          :span="6">
          <el-input placeholder="请输入管家姓名搜索"
            size="mini"
            v-model="managerName"
            @keyup.enter.native="handlePageChange(1)"
            clearable
            :maxlength="12">
          </el-input>
        </el-col>
        <el-col :offset="1"
          :span="6">
          <el-button type="primary"
            @click="handlePageChange(1)"
            size="mini">搜 索</el-button>
        </el-col>
      </el-row>
      <div class="border-ddd selection-box">
        <slot v-if="addLookType === 'company' && isFistCompany">
          <div class="c-9 flex-center hg-100">请在上面的搜索框输入关键字检索</div>
        </slot>
        <slot v-else>
          <el-table :data="dataList"
            height="300"
            ref="selectionBox"
            @selection-change="handleSelectionChange"
            style="width: 100%"
            size="mini">

            <el-table-column type="selection"
              width="55">
            </el-table-column>

            <slot v-if="addLookType === 'house'">
              <el-table-column label="房源"
                align="left"
                :min-width="200">
                <template slot-scope="scope">
                  {{scope.row.gardenName}} {{scope.row.buildingName}} {{scope.row.roomNumber}} {{scope.row.bedRoomNum}}
                </template>
              </el-table-column>
              <el-table-column label="户型"
                :min-width="100">
                <template slot-scope="scope">
                  {{scope.row.bedRoom}}房{{scope.row.livingRoom}}厅
                </template>
              </el-table-column>
              <el-table-column prop="longLeaseTypeDesc"
                label="模式"
                :min-width="100">
              </el-table-column>
              <el-table-column label="面积"
                :min-width="100">
                <template slot-scope="area">
                  {{area.row.area}}㎡
                </template>
              </el-table-column>
            </slot>

            <el-table-column prop="managerName"
              label="管家"
              :min-width="80">
            </el-table-column>
            <slot v-if="addLookType === 'company'">
              <el-table-column prop="group"
                label="组织"
                :min-width="100">
              </el-table-column>
              <el-table-column prop="phone"
                label="手机号"
                :min-width="100">
              </el-table-column>
            </slot>

          </el-table>
          <el-pagination class="take-pagination"
            @size-change="handleSizeChange"
            @current-change="handlePageChange"
            :current-page="currentPage"
            :page-sizes="[20, 30, 50]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="recordCount">
          </el-pagination>
        </slot>

      </div>
      <div class="pdt-20">
        <h4>已选{{addLookType === 'house'? '物业' : '陪看人'}}</h4>
        <div>
          <span class="line-h-40 pdr-10"
            v-for="(item,index) in selectionList"
            :key="index">
            <el-button size="mini">
              <slot v-if="addLookType === 'house' && item"> {{item.gardenName}} {{item.buildingName}} {{item.roomNumber}} {{item.bedRoomNum}}</slot>
              <slot v-else-if="addLookType === 'company' && item">{{item.managerName}}</slot>
              <i @click="delSelectionItem(index)"
                class="escort-close el-icon-close"></i>
            </el-button>
            <!--  -->
          </span>
        </div>
      </div>
    </section>
    <section class="dialog-footer">
      <el-button type="primary"
        size="mini"
        @click="handleSubmit">确 定</el-button>
      <el-button size="mini"
        @click="closeDialog">取 消</el-button>
    </section>
  </section>
</template>
<script>
import { handlePages } from '@/components/common/mixin';
export default {
  mixins: [handlePages],
  data() {
    return {
      dataList: [],
      isFistCompany: true,

      keyword: '',
      managerName: '',
      selectionList: [], // 所有已选
      myAlreadyList: [] // 上页已选
    };
  },
  // props: ['addLookType', 'alreadyList'],
  props: {
    addLookType: {
      type: String,
      default: 'house'
    },
    alreadyList: {
      type: Array,
      default: () => []
    }
  },
  created() {
    this.url = '/security/leadLook/queryRoomInfoPage';

    if (this.alreadyList && this.alreadyList.length) {
      //  复制父组件传来的，便于后面的额修改
      this.myAlreadyList = JSON.parse(JSON.stringify(this.alreadyList));
    }
    if (this.addLookType === 'house') {
      this.requestData('first');
      this.url = '/security/leadLook/queryRoomInfoPage';
    } else {
      this.url = '/security/leadLook/queryManagerInfoPage';
      // 选择陪看人 默认不请求，先把所选的 赋值给 当页已选的
      this.selectionList = this.myAlreadyList;
    }
  },
  methods: {
    // 获取
    requestData(type) {
      this.isFistCompany = false;
      if (type !== 'first') {
        // 在分页或所搜索前 把当前页的已选数据 push 到已选的 list 中
        // this.myAlreadyList.push(...this.selectionList);
        this.myAlreadyList = this.selectionList;
      }
      if (this.managerName.trim().length === 0 && this.addLookType !== 'house') {
        this.$message({
          type: 'warning',
          message: '关键字不能为空',
          duration: 3000
        });
        return;
      }
      this.$axios.get(
        this.url,
        {
          params: this.getParams()
        }
      ).then((res) => {
        this.isFistCompany = false;
        if (res.data.status === 'C0000') {
          let { result } = res.data;
          // this.currentPage = result.currentPage;
          this.pageCount = result.pageCount;
          this.recordCount = result.recordCount;
          this.dataList = result.items;
          this.$nextTick(() => {
            this.handleFitrate(this.myAlreadyList, true);
          });
        } else {
          this.$message.error(res.data.message);
          this.dataList = [];
        }
      }).catch((err) => {
        this.$message.error(err.message || '服务器异常');
        console.log(err);
      });
    },

    getParams() {
      let requestData = {
        pageSize: this.pageSize,
        currentPage: this.currentPage,
        keyword: this.keyword || undefined,
        managerName: this.managerName || undefined
      };
      if (this.addLookType === 'company') {
        delete requestData.keyword;
      };
      return requestData;
    },

    // 选择发生变化
    handleSelectionChange(val) {
      // concat
      // 已选的合并当前页选的
      this.selectionList = this.myAlreadyList.concat(val);
      // 超过5条 不给选择，提示
      if (this.selectionList.length > 5) {
        // let delList = this.selectionList.slice(5);
        this.toggleSelection(this.selectionList.slice(5), false);
        this.$message.warning('最多能选五条');
      }
    },

    handleFitrate(arr, flag) {
      // flag 选择 ture 不选 false
      if (!(arr instanceof Array) && !arr.length) {
        return;
      }
      // this.toggleSelection(this.alreadyList);
      // 遍历当前业的数据，是否有已选的 筛选出已选的 传入列表组件
      let mySelectList = [];
      for (let i = arr.length - 1; i >= 0; i--) {
        let currentItem = this.dataList.find((value, j) => {
          return value.id === arr[i].id;
        });
        if (currentItem) {
          currentItem.currentPage = true;
          mySelectList.unshift(currentItem);
          // 截掉已经传入组件并已选的数据
          this.myAlreadyList.splice(i, 1);
        }
      }
      this.toggleSelection(mySelectList, flag);
    },

    delSelectionItem(index) {
      // this.handleFitrate(this.selectionList, false);
      // 如果索引大于 上页已选 的索引，则是当前页选的，就调用方法从组件内删除。
      if (this.myAlreadyList.length - 1 < index) {
        this.$refs.selectionBox.toggleRowSelection(this.selectionList[index], false);
      } else {
        this.selectionList.splice(index, 1);
      }
    },

    toggleSelection(rows, flag) {
      // 改变 列表 选择框的状态 ，true 选上，false 取消选择。
      rows.forEach(row => {
        if (!row) {
          return;
        }
        this.$refs.selectionBox.toggleRowSelection(row, flag);
      });
    },

    //  传值
    handleSubmit() {
      this.$emit('updateSelectionList', {
        type: this.addLookType,
        list: this.selectionList
      });
      this.closeDialog();
    },

    closeDialog() {
      this.$emit('closeDialog');
    }
  }
};
</script>
<style scoped>
.take-dialog {
  min-height: 500px;
  margin-bottom: 2px;
  box-sizing: border-box;
}
.take-pagination {
  /* display: none; */
  width: 100%;
  /* padding-top: 9px; */
  box-sizing: border-box;
  background-color: #fafafa;
}
.selection-box {
  height: 333px;
}
.selection-box >>> .el-table__header-wrapper .has-gutter .el-checkbox__inner {
  display: none;
}

.escort-close.el-icon-close {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  text-align: center;
  line-height: 16px;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  transform-origin: 100% 50%;
}
.escort-close.el-icon-close:before {
  transform: scale(0.8);
  display: inline-block;
}
.escort-close.el-icon-close:hover {
  background-color: #b4bccc;
  color: #fff;
}
</style>


