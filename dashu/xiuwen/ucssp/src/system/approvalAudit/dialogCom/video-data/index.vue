<template>
  <div class="import-message">
    <div class="dialog-mask" @click="close_()"></div>
    <div class="dialog-box">
      <div class="product-title">
        <span class="product_title_head strong_font">影像资料</span>
        <span class="el-icon-close button button__close" @click="close_()"></span>
      </div>
      <el-row :gutter="20">
        <el-col :span="5"><div class="grid-content bg-purple">
          <div class="content content_nav">
            <a v-for="(i,index) in videoNav" :key="index" :class="{clickNav : index===curId}" @click="tab(index)"><div class="blue_font">{{i}}</div></a>
          </div>
          </div></el-col>
        <el-col :span="18">
          <div class="grid-content bg-purple">
            <div class="content picture">
            </div>
            <div class="picture_btn">
            <span><img src="../../../../assets/img/left-icon.png" alt=""></span>
            <span><img src="../../../../assets/img/right-icon.png" alt=""></span>
            <span><img src="../../../../assets/img/bigicon.png" alt=""></span>
            <span><img src="../../../../assets/img/small-icon.png" alt=""></span>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import "@common/css/dialog";
import {aprAudApi} from "../../js/server.js";

  export default {
    data() {
      return {
        curId: 0,
        videoNav: [
          '个人信息',
          '单位信息',
          '联系人信息',
          '产品信息',
          '面签意见',
          '三方数据',
          '历史申请',
          '关联信息',
          '信用报告',
          '工商信息',
          '风险参数',
          '电核结论',
          '审批结论',
          '审计退回原因'
        ],
        dialogImageUrl: '',
        dialogVisible: false
      };
    },
    methods: {
      tab(index) {
        this.curId = index;
      },
      close_() {
        this.$emit("clsoe_windowAlert");
      },
      handleRemove(file, fileList) {
          console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;
      }
  },
  created() {
    this.$MyFetch.get(`${aprAudApi.taskDetail.imagePage}/${this.$route.query.appID}`)
    .then((data = {}) => {
      console.log('影视资料成功', data);
    })
    .catch(err => {
      this.$error(err.message);
    });
  }
  };
</script>

<style scoped>
  .dialog-box {
    background: #f9fafb;
    width: 946px;
    height: 600px;
  }
   /* 字体 */
  .strong_font {
    font-weight: bold;
  }
  .gray_font {
    color: #666;
    font-size: 14px;
  }
  .blue_font{
    font-size: 14px;
    color: #538bf1;
  }
  .black_font {
    font-size: 14px;
    color: #151515;
  }
  /* 标题 */
  .product-title{
    height: 60px;
  }
  .product_title_head{
    line-height: 60px;
  }
  .el-icon-close {
    position: absolute;
    top: 21px;
    right: 43px;
    cursor: pointer;
    width: 12.4px;
    font-weight: bold;
  }
  /* 导航栏 */
.content_nav {
  margin: 19px 0 0 0;
  width: 142px;
  height: 531px;
}
a{
  text-decoration: none;
}
.content_nav > a {
  display: block;
  height: 36px;
  text-align: left;
  line-height: 36px;
}
.content_nav > a > p {
  text-align: left;
  height: 36px;
  line-height: 36px;
  margin-left: 24px;
}
.content_nav > a > span {
  text-align: left;
  height: 36px;
  line-height: 36px;
  margin-left: 24px;
}
.content_nav > a > div {
  text-align: left;
  height: 36px;
  line-height: 36px;
  margin-left: 24px;
}
.content_nav > a:hover {
  background: #eef1f6;
}
.clickNav {
  border-left: 4px solid #538bf1;
  background: #f0f8fc;
}
 /* 插入图片 */
.picture{
  margin-top: 30px;
  width: 700px;
  height: 456px;
}
.picture>img{
  margin-top: 20%;
}
</style>
