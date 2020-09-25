<template>
  <div class="abnormal_review_reason_config survey_config_list">
    <div class="b_content">
      <el-button class="b_button query" @click="add(false)" >新增</el-button>
    </div>
    <div class="table_box">
      <el-table
        :data="tableData" height="500"
        style="width: 100%" ref="cutoverTab"
        @row-click="clickRow">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            v-for="(item, key) in columnList" :key='key'
            :prop="item.prop"
            :type="item.type"
            :label="item.label"
            :width="item.width">
          </el-table-column>
           <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="todo(scope.row, true)">
              操作
              </el-button>
            </template>
          </el-table-column>
      </el-table>
    </div>
    <div class="page_box">
      <pagination @jump-page='handleCurrentChange' :page='searchInfo' class="pagination"></pagination>
    </div>
    <div class="business-btn">
      <el-button class="b_button stop_btn width200" @click="disableHandler">停用</el-button>
      <el-button class="b_button query width200" @click="enableHandler">启用</el-button>
    </div>

    <el-dialog class="dialog rule-dialog" :title="title" :before-close="colseHandle" :visible.sync="dialogVisible" width="700px" center>
      <div class="dialog_top" v-if="edit">
        编号：{{reviewForm.itemCode}}
      </div>
      <div class="main">
        <el-form ref="reviewForm" label-position="top" :rules="reviewRules" :model="reviewForm" label-width="80px">
          <el-form-item label="异常原因" prop="itemDesc">
            <el-input type="textarea" maxlength="50" v-model="reviewForm.itemDesc" placeholder="" :rows="4"></el-input>
          </el-form-item>
          <el-form-item class="btn-wrap">
            <el-button type="primary" class="width200" @click="saveReview">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import pagination from "@components/pagination"; // 分页条
import {surveyApi} from "../../js/server.js";
export default {
  name: 'abnormal-review-reason-config',
  data() {
    return {
      edit: false,
      dialogVisible: false, // 弹窗状态
      columnList: [
        { label: '序号', type: 'index', width: '50' },
        { label: '编号', prop: 'itemCode' },
        { label: '异常原因', prop: 'itemDesc' },
        { label: '状态', prop: 'status' },
        { label: '登记人', prop: 'createdBy' },
        { label: '登记时间', prop: 'createdDate' }
      ],
      title: '新增复核异常原因',
      tableData: [],
      // id: 'T02', // 编号
      // 查询信息
      searchInfo: {
        pageNum: 1,
        pageSize: 10,
        serviceName: "",
        userName: "",
        account: 0,
        currentPage: 1,
        showJumpButton: true
      },
      reviewForm: {
        itemDesc: '',
        id: '',
        statusInd: true
      },
      reviewRules: {
        itemDesc: [
          { required: true, trigger: 'blur', message: '请填写异常原因' }
        ]
      }
    };
  },
  methods: {
    saveReview() {
      this.$refs.reviewForm.validate(valid => {
        if (valid) {
          let data = {
            categoryCode: 'survey_abnormal',
            itemDesc: this.reviewForm.itemDesc,
            statusInd: this.reviewForm.statusInd,
            itemCode: this.reviewForm.itemCode
          };
          this.saveReviewApi(this.edit, data);
        }
      });
    },
    saveReviewApi(_edit, _data) {
      let url = surveyApi.abnormalAdd;
      if (_edit) {
        url = surveyApi.abnormalUpdate;
        _data = {
          reqList: _data instanceof Array ? _data : [_data]
        };
      }
      this.$MyFetch.post(url, _data).then(_data => {
        this.colseHandle(() => {
          this.dialogVisible = false;
        });
        this.getList(this.searchInfo.currentPage);
        if (_edit) {
          this.confirmFn('更新成功');
          return;
        }
        this.confirmFn('新增成功');
      }).catch(_err => {
        this.confirmFn(_err.message, 'error');
      });
    },
    todo(row, isEdit) {
      this.edit = isEdit;
      this.title = '编辑复核异常原因';
      this.reviewForm = JSON.parse(JSON.stringify(row));
      this.dialogVisible = true;
    },
    getList(_page) {
      this.searchInfo.currentPage = _page;
      let data = {
        pageNum: this.searchInfo.currentPage,
        pageSize: this.searchInfo.pageSize
      };
      this.$MyFetch.get(surveyApi.queryAbnormal, data).then(data => {
        this.tableData = data.list;
        this.tableData.forEach((_v, _i) => {
          _v.status = _v.statusInd ? '启用' : '停用';
        });
        this.searchInfo.account = data.total;
        this.searchInfo.currentPage = data.pageNum;
      }).catch((err) => {
        this.$error(err.message);
      });
    },
    // 列表翻页
    handleCurrentChange(val) {
      this.searchInfo.pageNum = val;
      this.searchInfo.currentPage = val;
      this.getList(this.searchInfo.currentPage);
    },
    add(isEdit) {
      this.edit = isEdit;
      this.dialogVisible = true;
    },
    colseHandle(done) {
      this.isEdit = false;
      this.dialogVisible = false;
      this.title = '新增复核异常原因';
      if (this.$refs.reviewForm) {
        this.$refs.reviewForm.clearValidate();
      }
      this.reviewForm = Object.assign({
        itemDesc: '',
        id: '',
        statusInd: true
      });
      done();
    },
    clickRow(_row, _column, _event) {
      this.$refs.cutoverTab.toggleRowSelection(_row);
    },
    mutilList(_flag = true) {
      let list = this.$refs.cutoverTab.selection.map(_v => {
        _v.statusInd = _flag;
        return _v;
      });
      if (!list.length) {
        this.$error('请先选择至少一条记录');
      }
      return list;
    },
    disableHandler() {
      let list = this.mutilList(false);
      this.saveReviewApi(true, list);
    },
    enableHandler() {
      let list = this.mutilList(true);
      this.saveReviewApi(true, list);
    }
  },
  created() {
    this.getList(1);
  },
  components: {
    pagination
  }
};
</script>

<style lang="less">
  .abnormal_review_reason_config{
    .dialog.rule-dialog {
      .main {
        margin-top: 10px;
      }
    }
    .btn-wrap > div {
      text-align: center;
    }
    .business-btn {
      text-align: center;
    }
    .query {
      background: #538bf1;
      color: #ffffff;
      border: 1px solid #538bf1;
    }
    .stop_btn {
      background: #ffffff;
      color: #538bf1;
      border: 1px solid #538bf1;
    }
    .b_content {
      text-align: left;
      // 查询和清空的公有样式
      .b_button {
        width: 100px;
        height: 40px;
        border-radius: 4px;
        font-size: 14px;
        vertical-align: top;
        margin-bottom: 10px;
      }
    }
  }
</style>
