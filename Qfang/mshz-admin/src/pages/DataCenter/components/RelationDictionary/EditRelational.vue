<template>
  <section class="edit-relational">
    <div class="dialog-box">
      <div class="el-table table-body el-table--fit el-table--border el-table--scrollable-y el-table--enable-row-hover el-table--enable-row-transition el-table--mini">
        <div class="el-table__body-wrapper">
          <table cellspacing="0" cellpadding="0" border="0" class="el-table__body">
            <thead class="has-gutter">
              <tr>
                <th class="is-center is-leaf" width="100">
                  <div class="cell">公司名称</div>
                </th>
                <th class="is-center is-leaf" width="180">
                  <div class="cell">区域</div>
                </th>
                <th class="is-center is-leaf" width="180">
                  <div class="cell">楼盘名称</div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="el-table__row">
                <td class="is-center">
                  <div class="cell">
                    <div>我司</div>
                  </div>
                </td>
                <td class="is-center">
                  <div class="cell">
                    <div>{{editData.area}}</div>
                  </div>
                </td>
                <td class="is-center">
                  <div class="cell">
                    <div>{{editData.gardenName}}</div>
                  </div>
                </td>
              </tr>
              <tr class="el-table__row">
                <td class="is-center">
                  <div class="cell">
                    <div>{{editData.destType}}</div>
                  </div>
                </td>
                <td class="is-center">
                  <div class="cell">
                    <el-input size="mini" v-model="editData.destArea" placeholder="请填写区域" />
                  </div>
                </td>
                <td class="is-center">
                  <div class="cell">
                    <el-input size="mini" v-model="editData.destGardenName" placeholder="请填写楼盘名称" />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
    <div class="dialog-footer">
      <el-button type="primary" size="mini" :loading="submitting" @click="handleSubmit">{{submitting? '保存中...' : '保存'}}
      </el-button>
      <el-button size="mini" @click="closeDialog">取消</el-button>
    </div>
  </section>
</template>
<script>
export default {
  name: 'EditRelational',
  data() {
    return {
      submitting: false,
      editData: {
        destArea: '',
        destGardenName: ''
      }
    };
  },
  props: {
    data: Object
  },
  created() {
    this.editData = JSON.parse(JSON.stringify(this.data));
  },
  methods: {
    handleSubmit() {
      let destArea = this.editData.destArea.trim();
      let destGardenName = this.editData.destGardenName.trim();
      if (destArea === '') {
        this.$message.error('请填写区域');
        return;
      }
      if (destGardenName === '') {
        this.$message.error('请填写楼盘名称');
        return;
      }
      this.submitting = true;
      let editData = this.editData;
      this.$axios.post('/security/room/rentCompare/updateGarden', {
        area: editData.area,
        destArea: editData.destArea,
        destGardenName: editData.destGardenName,
        destRegion: editData.destRegion,
        gardenName: editData.gardenName,
        id: editData.id,
        region: editData.region
      }).then(({ data }) => {
        this.submitting = false;
        if (data.status === 'C0000') {
          this.$message.success('保存成功');
          this.$emit('refreshData');
        } else {
          this.$message.error(data.message || '保存失败');
        }
      });
    },
    closeDialog() {
      this.$emit('changeDialog', false);
    }
  }
};
</script>
<style lang="scss" scoped>
.edit-relational {
  .dialog-box {
    height: auto;
    padding: 20px;
  }
  table {
    width: 100%;
  }
  /deep/ .el-input__inner {
    text-align: center;
  }
}
</style>

