<style lang="less" rel="stylesheet/less" scoped>
// 公共样式
.margin_r_60 {
  margin-right: 60px;
}
// 去掉element表格的默认全选按钮
/deep/ th .el-checkbox {
      display: none;
}
// 弹窗总box
.drop_loan {
  .dialog-mask {
    z-index: 1000;
  }
  .dialog-box {
    height: 255px;
    width: 580px;
    padding: 0px;
    .dialog-box__top {
      margin: 0px;
    }
    .title_type {
      text-align: center;
      background: #fff;
      font-size: 18px;
      color: #000;
      letter-spacing: 1.3px;
      padding-left: 20px;
      font-weight: normal;
      font-family: PingFangSC-Regular;
    }
    .dialog-box__middle-form {
      width: 100%;
      padding: 0 40px;
      height: auto;
      // 中间内容区域
      .dialog-box_top{
        font-size: 12px;
        color: #BBBBBB;
        margin: 30px 0 10px;
      }
      .dialog-box_content{
        width: 100%;
        display: flex;
        margin-bottom: 30px;
        .uploader_input{
          flex:1;
        }
        .uploader_button{
          .avatar-uploader{
            background: #FFFFFF;
            border: 1px solid #538BF1;
            border-radius: 4px;
            font-size: 14px;
            color: #538BF1;
            text-align: center;
            margin-left: 20px;
            /deep/ .el-button--primary{
              width: 98px;
              height: 38px;
              background: #fff;
              color: #538BF1;
              border: 0;
            }
          }
        }
      }
      // 按钮部分
      .form__bottom {
        left: 50%;
        padding-bottom: 30px;
        background-color: rgba(255, 255, 255);
        .add {
          width: 200px;
        }
      }
    }
  }
  /*表单区块*/
  .dialog-box__middle-form {
    .form__bottom {
      text-align: center;
      padding-bottom: 20px;
    }
  }
  // 弹窗下部分
  .complete-product {
    width: 100%;
  }
}
</style>
<template>
  <div class="drop_loan">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <!-- 弹窗上部分 -->
      <div class="dialog-box__top">
        <h5 class="title_type">引入还款文件</h5>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <!-- 弹窗下部分 -->
      <div class="complete-product">
        <div class="dialog-box__middle-form">
          <!-- 内容区 -->
          <div class="dialog-box_top">请选择文件</div>
          <div class="dialog-box_content">
            <div class="uploader_input">
              <el-input
                placeholder="*********"
                v-model="uploaderInput"
                :disabled="true">
              </el-input>
            </div>
            <div class="uploader_button">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <el-button slot="trigger" size="small" type="primary">浏览</el-button>
              </el-upload>
            </div>
          </div>
          <div class="form__bottom">
            <el-button class="add finis button h" type="primary" @click="finish">确认</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import "@common/css/dialog";
import pagination from "@components/pagination"; // 分页条
export default {
  data() {
    return {
       fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
      selectedData: {}, // 单选选择的那条数据
      user_name: '', // 客户姓名
      charge_Off_num: '', // 出账编号
      repayment_num: '', // 还款期次
      value1: '', // 应还日期
      form: {
        guarantee_name: "",
        certificate_type_code: "",
        contact_num: "",
        house_area_num: ""
      },
      for_: [], // 渲染数据列表
      pageConfig: {
        account: 5, // 总条数
        pageSize: 5, // 一页有几条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      }, // 分页
      uploaderInput: '' // 文件名
    };
  },
  filters: {
    // 加密 -- 用 * 代替
    encrypt: function(data) {
      let str = '';
      for (let i = 0; i < data.length; i++) {
        str += '*';
      }
      return str;
    }
  },
  methods: {
    beforeAvatarUpload(file, fileList) {
      this.uploaderInput = file.name;
      console.log(file, fileList);
    },
    handleAvatarSuccess(file) {
      console.log(file, file.name);
    },
    // 分页
    jump(pageNum) {
      console.log(pageNum);
      // 当前页
    },
    clickSelectAll(selection, row) {
        if (selection.length > 0) {
            selection.splice(1, selection.length);
        }
    },
    select(selection, row) {
      if (selection.length === 0) {
        } else if (selection.length === 1) {
        } else {
            selection.shift();
            this.rowCheck(row);
        }
    },
    rowCheck(row, column, e) {
    },
    // 清空按钮
    empty() {
      this.charge_Off_num = '';
      this.repayment_num = '';
      this.value1 = '';
      this.user_name = '';
    },
    // 查询按钮
    refer() {
      console.log('查询');
    },
    // 关闭弹窗
    close() {
      this.$emit("closeImportFile");
    },
    // 打开保存修改配置
    finish() {
      this.$emit("finiseImportFile");
    }
  },
  components: {
    pagination
  },
  mounted() {
  }
};
</script>
