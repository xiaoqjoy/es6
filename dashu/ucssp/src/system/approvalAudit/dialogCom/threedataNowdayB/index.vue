<template>
  <div>
    <div v-if="newOrOld2" class="import-message2">
      <div class="dialog-mask"></div>
      <div class="dialog-box">
        <div v-if="pOrCalert" class="dialog-box__top">
          <span class="title" v-html="formatText(newMessage.title)"></span>
          <span class="el-icon-close button button__close"></span>
          <div class="content">
            <div class="content_box">
              <div class="content_box_value">
                <span class="content_title">涉案企业:&nbsp;&nbsp;</span><span v-html="formatText(newMessage.name)"></span>
              </div>
              <div class="content_box_value">
                <span class="content_title">案件标题:&nbsp;&nbsp;</span><span v-html="formatText(newMessage.title)"></span>
              </div>
              <div class="content_box_value">
                <span class="content_title">案件类型:&nbsp;&nbsp;</span><span v-html="formatText(newMessage.writtype)"></span>
              </div>
              <div class="content_box_value">
                <span class="content_title">案件字号:&nbsp;&nbsp;</span><span v-html="formatText(newMessage.casenum)"></span>
              </div>
              <div class="content_box_value">
                <span class="content_title">审结日期:&nbsp;&nbsp;</span><span v-html="formatText(newMessage.sslong)"></span>
              </div>
              <div class="content_box_value">
                <span class="content_title">审理程序:&nbsp;&nbsp;</span><span v-html="formatText(newMessage.vprogram)"></span>
              </div>
              <div class="content_box_value">
                <span class="content_title">案由:&nbsp;&nbsp;</span><span v-html="formatText(newMessage.casetopic)"></span>
              </div>
              <div class="content_box_value">
                <span class="content_title">案件内容:&nbsp;&nbsp;</span><span v-html="formatText(newMessage.content)"></span>
              </div>
              <div class="content_box_value">
                <span class="content_title">执行法院:&nbsp;&nbsp;</span><span v-html="formatText(newMessage.court)"></span>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="dialog-box__top">
          <span class="title" v-html="formatText(newMessage.title)"></span>
          <span class="el-icon-close button button__close"></span>
          <div class="content">
            <div class="content_box">
              <div class="content_box_value">
                <span class="content_title">被执行人姓名或名称:&nbsp;&nbsp;</span><span v-html="formatText(newMessage.name)"></span>
              </div>
              <div class="content_box_value">
                <span class="content_title">证件号码:&nbsp;&nbsp;</span><span v-html="formatText(newMessage.id)"></span>
              </div>
              <div class="content_box_value">
                <span class="content_title">执行法院:&nbsp;&nbsp;</span><span v-html="formatText(newMessage.court)"></span>
              </div>
              <div class="content_box_value">
                <span class="content_title">执行案号:&nbsp;&nbsp;</span><span v-html="formatText(newMessage.casenum)"></span>
              </div>
              <div class="content_box_value">
                <span class="content_title">执行内容:&nbsp;&nbsp;</span><span v-html="formatText(newMessage.content)"></span>
              </div>
              <div class="content_box_value">
                <span class="content_title">立案时间:&nbsp;&nbsp;</span><span v-html="formatText(newMessage.sslong)"></span>
              </div>
              <div class="content_box_value">
                <span class="content_title">执行状态:&nbsp;&nbsp;</span><span v-html="formatText(newMessage.state)"></span>
              </div>
              <div class="content_box_value">
                <span class="content_title">异议备注:&nbsp;&nbsp;</span><span v-html="formatText(newMessage.remark)"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!newOrOld2" class="import-message2">
      <div class="dialog-mask"></div>
      <div class="dialog-box">
        <div v-if="pOrCalert" class="dialog-box__top">
          <span class="title">{{oldMessage.title}}</span>
          <span class="el-icon-close button button__close"></span>
          <div class="content">
            <div class="content_box">
              <div class="content_box_value" v-for="(item, index) in oldMessage.detail_content.onemsglist" :key="index">
                <span class="content_title">{{item.propername}}:</span>
                <div class="font_box">
                  <div v-html="item.propervalue" class="content_font"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="dialog-box__top">
          <span class="title">{{oldMessage.title}}</span>
          <span class="el-icon-close button button__close"></span>
          <div class="content">
            <div class="content_box">
              <div class="content_box_value" v-for="(item, index) in oldMessage.onemsglist" :key="index">
                <span class="content_title">{{item.propername}}:</span>
                <div class="font_box">
                  <div v-html="item.propervalue" class="content_font"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    // props: ['personMsgXQ', 'pOrCalert'],
    data() {
      return {
        newOrOld2: null,
        pOrCalert: true,
        newMessage: {},
        oldMessage: {}
      };
    },
    created() {
      this.newMessage = JSON.parse(localStorage.getItem('threeDataMsgNew'));
      this.oldMessage = JSON.parse(localStorage.getItem('threeDataMsgOld'));
      this.pOrCalert = JSON.parse(localStorage.getItem("pOrCalert"));
      // console.log(this.newMessage, 9999)
      // console.log(this.oldMessage, 8888)
      // console.log(null == this.oldMessage)
      if (this.oldMessage == null) {
        this.newOrOld2 = true;
      } else {
        this.newOrOld2 = false;
      }
      localStorage.removeItem("threeDataMsgNew");
      localStorage.removeItem("threeDataMsgOld");
      localStorage.removeItem("pOrCalert");
      if (this.pOrCalert === 'true') {
      this.pOrCalert = true;
    } else if (this.pOrCalert === 'false') {
      this.pOrCalert = false;
    }
    },
    methods: {
      createJson(json, prop, val) {
        // 如果 val 被忽略
        if (typeof val === "undefined") {
            // 删除属性
            delete json[prop];
        } else {
        // 添加 或 修改
          json[prop] = val;
        }
      },
      close_() {
        this.$emit("close_windowAlert");
      },
      formatText(str) {
        str = str || '';
        const name = this.newMessage.name;
        const arr = [name, '判决结果', '判决'];
        const reg = new RegExp(arr.join('|'), 'g');
        return str.replace(reg, '<i class="b">$&</i>');
      }
    }
  };
</script>

<style lang="less" scoped>
.import-message2{
  // height: 100%;
  .dialog-box{
    width: 100%;
    height: 100%;
    .content{
      overflow-y: auto;
      font-size: 20px;
      text-align: left;
      // width: 875px;
      height: auto;
      margin: 20px;
      box-shadow: 0 2px 6px 0 rgba(0,0,0,0.08);
      border-radius: 4px;
      .content_box{
        margin: 0 0 0 30px;
        line-height: 35px;
        .content_box_value{
          margin-top: 20px;
          .content_title{
            color: #666;
          }
          .font_box{
            display:inline-block;
            // width: 760px;
          }
          .content_font{
            vertical-align:text-top;
            line-height: 30px;
            p {
              letter-spacing: 5px;
              line-height: 30px;
            }
          }
        }
      }
    }
  }
  /deep/.b {
    background: blue;
    color: #fff;
    font-style: normal;
    font-weight: normal;
  }
}
</style>
