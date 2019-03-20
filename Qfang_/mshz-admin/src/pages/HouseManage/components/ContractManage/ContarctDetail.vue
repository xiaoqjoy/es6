<template>
  <section>
    <div class="contartct-detail">
      <div v-if="errorInfo" class="org_box">
        <span class="org_bot_cor"></span>
        边框法实现底部90度尖角对话框
        <i class="el-icon-close info-close" @click="errorInfo=false"></i>
      </div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="合同信息" name="second">
          <contarct-info :id="roomId" :contractId="contractId" v-on:setParam="getParam" v-on:setOldcontractId="getOldcontractId"></contarct-info>
        </el-tab-pane>
        <el-tab-pane name="fourth">
          <span slot="label">审核记录</span>
          <audit-log :id="roomId" :contractId="contractId"></audit-log>
        </el-tab-pane>
        <el-tab-pane label="修改记录" name="five">
          <amendant-record :id="roomId" :contractId="contractId" :type="type"></amendant-record>
        </el-tab-pane>
      </el-tabs>
    </div>

    <el-dialog width="50%" title="审核" :visible.sync="innerVisible" append-to-body>
      <div>
        <h3>确定要{{message}}{{bdName}}提交的“{{gardenName}} {{buildingName}} {{number}}”的收房合同吗？</h3>
        <el-input type="textarea" :rows="7" placeholder="请输入原因" v-model="remark"></el-input>
      </div>
      <div class="dialog-footer">
        <el-button type="primary" size="mini" @click="handleAudit">{{message}}</el-button>
        <el-button size="mini" @click="innerVisible = false, remark='' ">取消</el-button>
      </div>
    </el-dialog>
    <div v-if="!readOnly" class="dialog-footer">
      <el-button type="primary" size="mini" @click="Pass" :disabled="disabled">审核通过</el-button>
      <el-button type="danger" size="mini" @click="notPass" :disabled="disabled">审核不通过</el-button>
    </div>

    <el-dialog title="合同详情" :visible.sync='OldcontractDialog' :close-on-click-modal="false" width="950px" append-to-body>
      <contarct-info :id="roomId" v-if="OldcontractDialog" :contractId="OldcontractId" :showOldList="showOldList"></contarct-info>
    </el-dialog>
  </section>
</template>
<script>
// import HouseInfo from './HouseInfo'; // 房源详情
import FollowInfo from '../Housing//FollowInfo'; // 跟进信息
import AuditLog from '../Housing//AuditLog'; // 审核记录
import AmendantRecord from '../Housing//AmendantRecord';
import ContarctInfo from './ContarctInfo';

export default {
  name: 'ContarctDetail',
  data() {
    return {
      bdName: '',
      disabled: false,
      showOldList: true,
      type: 'contract',
      errorInfo: false,
      filtrateVisible: true, // 搜索
      message: '通过',
      activeName: 'second',
      innerVisible: false,
      gardenName: '',
      buildingName: '',
      number: '',
      remark: '',
      operateAction: '',
      OldcontractDialog: false,
      OldcontractId: ''
    };
  },
  props: ['id', 'readOnly', 'roomId', 'contractId'],
  methods: {
    handleAudit() {
      this.$axios.post(
        '/security/room/contract/audit',
        {
          remark: this.remark,
          id: this.contractId,
          operateAction: this.operateAction
        }
      ).then((res) => {
        if (res.data.status === 'C0000') {
          if (res.data.result) {
            this.$message.success('审核成功');
            this.$emit('refreshData');
            this.disabled = true;
          } else {
            this.$message.error('操作失败！');
          }
          this.innerVisible = false;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    notPass() {
      this.message = '不通过';
      this.innerVisible = true;
      this.operateAction = 'AUDIT_NO';
    },
    Pass() {
      this.message = '通过';
      this.innerVisible = true;
      this.operateAction = 'AUDIT_YES';
    },
    getParam(data) {
      this.gardenName = data.gardenName;
      this.buildingName = data.buildingName;
      this.number = data.number;
      this.bdName = data.bdName;
    },
    openAudit(message, type) {
      this.$message({
        showClose: true,
        duration: 2,
        message: message,
        type: type
      });
    },

    getOldcontractId(data) {
      this.OldcontractId = data.oldContractId;
      this.OldcontractDialog = true;
    }
  },
  components: {
    FollowInfo,
    AuditLog,
    AmendantRecord,
    ContarctInfo
  }
};
</script>
<style scoped>
.contartct-detail {
  position: relative;
}
.contartct-info {
  width: 20px;
  height: 20px;
  position: absolute;
  top: 50px;
  left: 107px;
  background-color: red;
}
.org_box {
  margin-bottom: 30px;
  padding: 5px 10px;
  color: #c55454;
  background: #fff;
  position: absolute;
  top: 50px;
  left: 107px;
  z-index: 9999;
  font-size: 12px;
  box-shadow: -2px 2px 10px #ccc;
}
.org_bot_cor {
  width: 0;
  height: 0;
  font-size: 0;
  border-width: 10px;
  border-style: solid;
  border-color: transparent transparent white;
  _border-color: white white white;
  overflow: hidden;
  position: absolute;
  left: 20px;
  top: -20px;
}
.info-close {
  display: inline-block;
  margin: 5px;
  color: #666;
  font-size: 14px;
  cursor: pointer;
}
.el-icon-close:hover {
  background-color: #b4bccc;
  color: #fff;
  border-radius: 50%;
}
</style>

