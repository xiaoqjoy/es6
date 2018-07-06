<template>
  <div class="sugarWarningSetBox" v-show="dialogVisible">
    <el-dialog
    title="血糖预警设置"
    :visible.sync="dialogVisible"
    width="30%"
    :close-on-click-modal="false"
    :before-close="handleClose">
        <div class="warningSetContentBox clearfix">
            <div class="contentLeft floatLeft">
                <div class="switchBox clearfix">
                    <div class="floatLeft fw700">血糖预警弹窗设置</div>
                    <el-switch
                        style="display: block;float:right;"
                        v-model="switchDialog"
                        active-color="#13BB8E"
                        inactive-color="#B2B8CD"
                        active-text="ON"
                        inactive-text="OFF"
                        @change="sugarDialogChange">
                    </el-switch>
                </div>
                <div class="setvalueBox">
                    <div class="item colorBlack">
                        <span>低于&nbsp;</span>
                        <el-input v-model="inputValueList[0]" @blur="validValueSet(0, 0.1, 3.9)" :disabled="dialogInputDisable"></el-input>
                        <span>&nbsp;mmol/L&nbsp;</span>
                        <span>&nbsp;进行预警</span>
                    </div>
                    <div class="colorRed" v-show="warnMessageList[0]">最低值输入范围0.1~3.9</div>
                    <div class="item colorBlack">
                        <span>高于&nbsp;</span>
                        <el-input v-model="inputValueList[1]" @blur="validValueSet(1, 7.0, 33.3)" :disabled="dialogInputDisable"></el-input>
                        <span>&nbsp;mmol/L&nbsp;</span>
                        <span>&nbsp;进行预警</span>
                    </div>
                    <div class="colorRed" v-show="warnMessageList[1]">最高值输入范围7.0~33.3</div>
                    <div class="hint">当患者测量血糖值在上述设置范围内时 , 系统会自动弹出窗口预警。</div>
                </div>
            </div>
            <div class="contentRight floatRight">
                <div class="switchBox clearfix">
                    <div class="floatLeft fw700">血糖预警短信设置</div>
                    <el-switch
                        style="display: block;float:right;"
                        v-model="switchShortMessage"
                        active-color="#13BB8E"
                        inactive-color="#B2B8CD"
                        active-text="ON"
                        inactive-text="OFF"
                        @change="sugarshortMessageChange">
                    </el-switch>
                </div>
                <div class="setvalueBox">
                    <div class="item colorBlack">
                        <span>低于&nbsp;</span>
                        <el-input v-model="inputValueList[2]" @blur="validValueSet(2, 0.1, 3.9)" :disabled="dialogshortMessageDisable"></el-input>
                        <span>&nbsp;mmol/L&nbsp;</span>
                        <span>&nbsp;进行预警</span>
                    </div>
                    <div class="colorRed" v-show="warnMessageList[2]">最低值输入范围0.1~3.9</div>
                    <div class="item colorBlack">
                        <span>高于&nbsp;</span>
                        <el-input v-model="inputValueList[3]" @blur="validValueSet(3, 15, 33.3)" :disabled="dialogshortMessageDisable"></el-input>
                        <span>&nbsp;mmol/L&nbsp;</span>
                        <span>&nbsp;进行预警</span>
                    </div>
                    <div class="colorRed" v-show="warnMessageList[3]">最高值输入范围15.0~33.3</div>
                    <div class="hint">当患者测量血糖值在上述设置范围内时 , 系统会自动向医生发送短信预警。</div>
                </div>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="setSugarWarning">确定</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<style scoped lang="less">
    .sugarWarningSetBox {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
    }
    .warningSetContentBox .item {
        margin: 10px 0;
    }
    .sugarWarningSetBox .warningSetContentBox .contentLeft,
    .sugarWarningSetBox .warningSetContentBox .contentRight{
        height: 250px;
        width: 48%;
        background-color: #F7F9FA;
        padding: 20px;
        box-sizing: border-box;
    }
    .sugarWarningSetBox .warningSetContentBox .hint {
        color: #999;
        line-height: 20px;
    }
</style>
<style lang="less">
    .sugarWarningSetBox .el-dialog {
        width: 34.8% !important;
        position: absolute;
        border-radius: 10px;
        top:50%;
        left:50%;
        margin:0 !important;
        transform: translate(-50%, -50%);
    }
    .sugarWarningSetBox .el-dialog__header {
      text-align: left;
      border-bottom: 1px solid #E0E0E0;
    }
    .warningSetContentBox .el-input {
        width: 35%;
    }
    .warningSetContentBox .el-input__inner {
        height: 25px;
        line-height: 25px;
    }
</style>

<script>
  export default {
    name: 'sugarWarningSet',
    data () {
      return {
          dialogVisible: false,
          switchDialog: true,
          switchShortMessage: false,
          inputValueList: ['3.9', '15.0', '3.0', '20.0'],
          dialogInputDisable: false,
          dialogshortMessageDisable: true,
          warnMessageList: [false, false, false, false],
          scopeId: '', //私有Id , 区别是用户医生自己设置还是医生为患者设置
          isUser: false,
          idDialog: '',
          idShortMessage: '',
          createUserId:''
      }
    },
    methods: {
      handleClose () {
        this.dialogVisible = false;
      },
      sugarDialogChange (status) {
        // this.dialogInputDisable 是false表示弹窗预警是开的
        this.dialogInputDisable = !status;
      },
      sugarshortMessageChange (status) {
          this.dialogshortMessageDisable = !status;
      },
      // 关闭初始化弹窗 , 除非后台返回不然一直是初始化的
      init () {
          this.switchDialog = true;
          this.switchShortMessage = false;
          this.inputValueList = ['3.9', '15.0', '3.0', '20.0'];
          this.dialogInputDisable = false;
          this.dialogshortMessageDisable = true;
          this.warnMessageList = [false, false, false, false];
      },
      // 验证值的合法性
      validValueSet (index, minvalue, maxvalue) {
          // index , 第几个输入框
          let value = this.inputValueList[index];
          if (!!value && (value * 1 < minvalue || value * 1 > maxvalue)) {
              this.$set(this.warnMessageList, index, true);
          } else {
              this.$set(this.warnMessageList, index, false);
          }
      },
      // 设置预警阀值点击确认
      setSugarWarning () {
            let _this = this;
            // 解构数组
            let [value1, value2, value3, value4] = this.warnMessageList;
            let data = [
              {minValue: this.inputValueList[0],maxValue: this.inputValueList[1], type:1, status: !this.dialogInputDisable ? '1' : '2', scope: this.scopeId, isUser: this.isUser, id: this.idDialog,createUserId: this.createUserId},
              {minValue: this.inputValueList[2],maxValue: this.inputValueList[3], type:2, status: !this.dialogshortMessageDisable ? '1' : '2', scope: this.scopeId, isUser: this.isUser, id: this.idShortMessage,createUserId: this.createUserId}
            ];
            if (!value1 && !value2 && !value3 && !value4) {
                data.forEach((item, index) => {
                    _this.$api.setSugarWarningValue(item, res => {
                        _this.dialogVisible = false;
                    });
                })
            }
      }
    }
  }
</script>