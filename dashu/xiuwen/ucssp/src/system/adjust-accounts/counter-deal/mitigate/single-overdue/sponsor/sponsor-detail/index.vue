
<template>
  <!-- 拖动窗口组件 -->
  <transition name="scale">
    <div class="popup" v-show="isShowDialog" :style="{left: clientX + 'px',top: clientY + 'px',width: popupWidth + 'px',height: popupHeight + 'px'}" >
          <div class="popup-top" @mousedown="down" @mouseup="up">
            <span>交易明细</span>
            <div class="dialog-top-right">
              <!-- <i class="iconfont icon-video theme" v-if="applicationId"></i> -->
              <!-- <span class="theme" @click.stop="$showImage(applicationId, menuDesc)" v-if="applicationId">上传影像资料</span> -->
              <i class="el-icon-close" @mousedown.stop="close_open" title="关闭"></i>
            </div>
          </div>
          <div class="tables">
            <el-table
              :default-sort="{prop: 'date', order: 'descending'}"
              :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#ececec'}"
              ref="multipleTable"
              max-height="398"
              :data="for_"
              tooltip-effect="dark"
              style="width: 100%">
              <el-table-column width="200" prop="trans_serial_no" label="总单号"></el-table-column>
              <el-table-column width="200" prop="bill_no" label="单据号"></el-table-column>
              <el-table-column prop="sterm" label="期次"></el-table-column>
              <el-table-column width="100" prop="bill_type" label="单据类型"></el-table-column>
              <el-table-column prop="bill_status" label="单据状态"></el-table-column>
              <el-table-column width="100" prop="pay_date" label="应还日期"></el-table-column>
              <el-table-column width="100" prop="acc_date" label="记账日期"></el-table-column>
              <el-table-column prop="pay_corp" label="应还本金"></el-table-column>
              <el-table-column prop="actual_corp" label="实还本金"></el-table-column>
              <el-table-column prop="pay_inte" label="应还利息"></el-table-column>
              <el-table-column prop="actual_inte" label="实还利息"></el-table-column>
              <el-table-column prop="pay_fine" label="应还罚息"></el-table-column>
              <el-table-column prop="actual_fine" label="实还罚息"></el-table-column>
              <el-table-column prop="pay_compound" label="应还复利"></el-table-column>
              <el-table-column prop="actual_compound" label="实还复利"></el-table-column>
              <el-table-column width="100" prop="pay_bank_fine" label="应还银行罚息"></el-table-column>
              <el-table-column width="100" prop="actual_bank_fine" label="实还银行罚息"></el-table-column>
              <el-table-column width="100" prop="pay_bank_compound" label="应还银行复利"></el-table-column>
              <el-table-column width="100" prop="actual_bank_compound" label="实还银行复利"></el-table-column>
              <el-table-column width="100" prop="dd_pay_fine" label="应还代垫罚息"></el-table-column>
              <el-table-column width="100" prop="dd_actual_fine" label="实还代垫罚息"></el-table-column>
              <el-table-column width="100" prop="dd_pay_compound" label="应还代垫复利"></el-table-column>
              <el-table-column width="100" prop="dd_actual_compound" label="实还代垫复利"></el-table-column>
              <el-table-column prop="pay_amount" label="应还费用"></el-table-column>
              <el-table-column prop="actual_amount" label="实还费用"></el-table-column>
              <el-table-column width="100" prop="fee_name" label="费用类型"></el-table-column>
              <el-table-column width="150" prop="acc_user" label="制单人"></el-table-column>
            </el-table>
          </div>
          <pagination @jump-page="jump" :page="pageConfig" class="pagination"></pagination>
    </div>
  </transition>
</template>

<script>
import { counterDealApi } from "@/system/adjust-accounts/counter-deal/js/server"; // 接口
import pagination from "@components/pagination"; // 分页条
export default {
  name: "popup",
  props: {
    // 交易总单交易号
    tetail_data: {
      type: Object
    },
    // 拖动弹框的显示与隐藏
    isShowDialog: {
      type: Boolean,
      default: false
    },
    // 是否水平居中，图片路径是水平居中
    center: {
      type: Boolean,
      default: true
    },
    // 拖动弹框的宽度
    width: {
      type: Number,
      default: 400
    },
    // 拖动弹框的高度
    height: {
      type: Number,
      default: 300
    }
  },
  components: {
    pagination
  },
  data() {
    return {
      for_: [],
      pageConfig: {
        account: 0, // 总条数
        pageSize: 10, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      }, // 分页
      // entryInformationList: [], // 交易总单明细列表
      isDrag: false, // 是否需要拖动
      clientX: 0, // 左边距离
      clientY: 50, // 顶部距离
      OffsetX: 0, // 离父元素左边距离
      OffsetY: 0, // 离父元素顶部距离

      isScale: false, // 是否需要放大缩小
      scaleArrow: 'top-left', // 缩放的方向，top-left：左上角，top-right：右上角，bottom-left：左下角，bottom-right：右下角
      popupWidth: 1200,
      popupHeight: 600,
      clientXClick: 0, // 鼠标点击时的左边距离
      clientYClick: 0 // 鼠标点击时的顶部距离
    };
  },
  mounted() {
    console.log(this.tetail_data);
    this.refer();
  },
  watch: {
    isShowDialog(newVal, oldVal) {
      // 初始化宽高
      this.popupWidth = this.width;
      this.popupHeight = this.height;

      if (newVal) {
        // 这是默认位置
        if (this.center) {
          // 居中
          this.clientY = 50;
          this.clientX = document.body.clientWidth / 2 - this.width / 2;
          return;
        }
        // 显示右上角
        this.clientX = document.body.clientWidth - this.width - 50;
      }
    }
  },
  methods: {
    // 关闭弹窗
    close_open() {
      this.$emit("clsoe_windowDetail");
    },
    // 分页
    jump(pageNum) {
       let queryData = {
        eq: {
          loan_no: this.tetail_data.loanNo,
          sterm: this.tetail_data.sterm
        },
        orderParam: "stermDesc"
      };
      this.loanParameter(queryData, pageNum);
    },
    // 明细
    loanParameter(res, current) {
      res = res || {};
      current = current || 1;
      let url = counterDealApi.loanAccountQueryBillLists + "?current=" + current + "&size=10";
      this.$MyFetch.post(url, res)
      .then((data = {}) => {
        this.for_ = data.records;
        // 总条数
        this.pageConfig.account = data.total || 1;
        // 当前页
        this.pageConfig.currentPage = data.current || 1;
        // 一页有几条数据 pageSize
        this.pageConfig.pageSize = data.size || 10;
      })
      .catch(err => {
        this.$error(err.message);
      });
    },
    // // 查询
    refer() {
      let queryData = {
        eq: {
          trans_serial_no: this.tetail_data.transSerialNo
        }
      };
      this.loanParameter(queryData);
    },
    // window鼠标滑动事件，进行窗口拖动操作
    winFn(e) {
      // e.preventDefault();
      if (this.isDrag) {
        this.clientX = e.clientX - this.offsetX; // 左边距离 = 鼠标滑动时窗口左边距离 - 离父元素左边距离（固定）
        this.clientY = e.clientY - this.offsetY; // 顶部距离 = 鼠标滑动时窗口顶部距离 - 离父元素顶部距离（固定）
      }
    },

    // window鼠标滑动事件，进行放大缩小
    scaleFn (e) {
      // console.log(e)
      // console.log(this.clientX)

      if (this.isScale) {
        switch (this.scaleArrow) {
          case 'top-left':
            this.popupWidth = this.popupWidth + (this.clientX - e.clientX); // 宽度 + （左边距离 - 鼠标滑动时窗口左边距离）
            this.popupHeight = this.popupHeight + (this.clientY - e.clientY); // 高度 + （顶部距离 - 鼠标滑动时窗口顶部距离）

            this.clientX = e.clientX;
            this.clientY = e.clientY;
            break;
          case 'top-right':
            this.popupWidth = this.popupWidth - (this.clientXClick - e.clientX);
            this.popupHeight = this.popupHeight + (this.clientY - e.clientY);

            this.clientXClick = e.clientX;
            this.clientY = e.clientY;
            break;
          case 'bottom-left':
            this.popupWidth = this.popupWidth + (this.clientX - e.clientX);
            this.popupHeight = this.popupHeight - (this.clientYClick - e.clientY);

            this.clientX = e.clientX;
            this.clientYClick = e.clientY;
            break;
          case 'bottom-right':
            this.popupWidth = this.popupWidth - (this.clientXClick - e.clientX);
            this.popupHeight = this.popupHeight - (this.clientYClick - e.clientY);

            this.clientXClick = e.clientX;
            this.clientYClick = e.clientY;
            break;
          default:
            break;
        }
      }
    },

    down(e) {
      // e.preventDefault();

      // console.log('鼠标点击时');
      // console.log(e)
      // console.log(e.offsetY)

      this.clientXClick = e.clientX;
      this.clientYClick = e.clientY;

      // 放大缩小的方向
      switch (e.target) {
        case this.$refs.topLeft:
          this.scaleArrow = 'top-left';
          break;
        case this.$refs.topRight:
          this.scaleArrow = 'top-right';
          break;
        case this.$refs.bottomLeft:
          this.scaleArrow = 'bottom-left';
          break;
        case this.$refs.bottomRight:
          this.scaleArrow = 'bottom-right';
          break;
        default:
          break;
      }
      if (this.$refs.topLeft === e.target || this.$refs.topRight === e.target || this.$refs.bottomLeft === e.target || this.$refs.bottomRight === e.target) {
        this.isScale = true;
        window.addEventListener('mousemove', this.scaleFn, false); // 鼠标点击窗口时，添加window滑动事件scaleFn，进行放大缩小操作
      } else {
        // 鼠标点击时初始化离父元素左边距离和顶部距离，避免点击窗口时自动跳到左上角（原点）位置上
        // this.offsetX = e.offsetX;
        // this.offsetY = e.offsetY;

        this.offsetX = e.clientX - this.clientX; // 离父元素左边距离 = 左边距离 - 原点横坐标
        this.offsetY = e.clientY - this.clientY; // 离父元素顶部距离 = 顶部距离 - 原点纵坐标

        this.isDrag = true;
        window.addEventListener('mousemove', this.winFn, false); // 鼠标点击窗口时，添加window滑动事件winFn，进行窗口拖动操作
      }
    },
    up(e) {
      // console.log('鼠标释放时')
      if (this.isScale) {
        this.isScale = false;
        window.removeEventListener('mousemove', this.scaleFn, false); // 鼠标释放时，移出window滑动事件scaleFn，释放mousemove所引起的性能瓶颈问题
      } else if (this.isDrag) {
        this.isDrag = false;
        window.removeEventListener('mousemove', this.winFn, false);
      }
    }
  }
};
</script>

<style lang="less" scoped>
// 显示与隐藏，放大与缩小的动画
.scale-enter,
.scale-leave-to {
  transform: scale(0);
  opacity: 0;
}
.scale-enter-active,
.scale-leave-active {
  transition: all 0.5s;
}
.pagination {
  margin-top: 40px;
  margin-right: 20px;
}

.popup {
  // cursor: move;
  position: fixed;
  background-color:#fff;
  // cursor: move;
  z-index: 10000;
  box-shadow: 0 5px 38px 0 rgba(0, 0, 8, 1);
  // overflow: scroll-y;

  .scale-btn{
    position: absolute;
    width: 30px;
    height: 30px;
    background-color: transparent;
  }
  .top-left {
    top: -10px;
    left: -10px;
    cursor: nw-resize;
  }
  .top-right {
    top: -10px;
    right: -10px;
    cursor: ne-resize;
  }
  .bottom-left{
    bottom: -10px;
    left: -10px;
    cursor: sw-resize;
  }
  .bottom-right{
    bottom: -10px;
    right: -10px;
    cursor: se-resize;
  }

  .cover{
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: transparent;
  }
  .popup-top > span {
    font-size: 18px;
    font-weight: bold;
  }
  .popup-top {
    cursor: move;
    font-size: 14px;
    height: 40px;
    line-height: 40px;
    text-align:center;
    background-color: #fff;
    .dialog-top-right {
      position: absolute;
      top: 0;
      right: 0;
      height: 40px;
      display: flex;
      align-items:center;
      .icon-video{
        margin-right: 5px;
        font-size: 14px;
      }
      span{
        cursor: pointer;
      }
      .el-icon-close{
        cursor: pointer;
        margin: 0 10px 0 20px;
      }
    }
  }
  img {
    width: 100%;
    display: block;
  }
  .close {
    position: absolute;
    right: 0;
    margin: 15px;
    font-size: 26px;
    color: #ccc;
    cursor: pointer;
  }
  // 表格总体样式
  .tables {
    overflow-y: auto;
    overflow-x: hidden;
    height: 400px;
    width: 97%;
    margin: 0px auto;
    border: 1px solid #d0d0d0;
    margin-top: 21px;
    border-radius: 4px;
    .headline_t {
      height: 40px;
      border: 0px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      line-height: 40px;
    }
    /deep/ .el-collapse {
      border-top: #ebeef5;
      border-bottom: #ebeef5;
    }
  }
}
</style>
