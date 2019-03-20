<template>
  <section class="dialog-box pd-20">
    <el-row>
      <el-col :span="12"
        class="bd-ddd h-500">
        <p class="font-c bgc-c h-40">组织</p>
        <div class="orgainzation pd-20">
          <el-tree :props="props"
            :load="loadNode"
            lazy
            accordion
            @node-click="handleNodeClick"
            header-align="center">
          </el-tree>
        </div>
      </el-col>
      <el-col :span="12"
        class="pdl-20">
        <p class="font-c bgc-c h-40">人员</p>
        <div class="man">
          <el-table :data="list"
            style="width: 100%;height=100%;"
            size="small"
            max-height="450"
            ref="manlist"
            header-align="center">
            <el-table-column prop="name"
              label="姓名"
              :min-width="150"
              align="center">
            </el-table-column>
            <el-table-column prop="positionName"
              label="职位"
              :min-width="150"
              align="center">
            </el-table-column>
            <el-table-column label="操作"
              :min-width="100"
              align="center">
              <template slot-scope="scope">
                <el-button type="text"
                  size="mini"
                  v-if="checkManager(scope.row)"
                  @click.stop="handleAdd(scope.$index, scope.row)">添加</el-button>
                <span v-else
                  class="c-9">已添加</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>

  </section>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      props: {
        label: 'name',
        children: 'children'
      },
      count: 1
    };
  },
  props: ['managers', 'type', 'managerName'],
  created() {
    // this.requestData();
  },
  methods: {

    requestData(id) {
      this.$axios.get(
        '/security/org/queryPersonPage',
        {
          params: {
            orgId: id
          }
        }
      ).then((res) => {
        this.list = res.data.items;
      });
    },

    handleNodeClick(data, node, a) {
      this.requestData(node.data.id);
    },

    loadNode(node, resolve) {
      this.$axios.get(
        'security/org/queryOrgTree', {
          params: node.level === 0 ? {} : {
            parentId: node.data.id
          }
        }
      ).then((res) => {
        if (res.data.status === 'C0000') {
          return resolve(res.data.result);
        }
      });
    },

    handleAdd(index, row) {
      if (this.type === 'addhouse') {
        this.$confirm('确定添加' + row.name + '管家?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          this.$emit('selectManager', {
            name: row.name,
            id: row.id,
            flag: false
          });
        }).catch(() => {

        });
      } else {
        if (this.managers.length >= 5) {
          this.$message.warning('管家最多只能是五个');
          return;
        }
        this.$confirm('确定添加' + row.name + '管家?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          this.$emit('addManager', row);
        }).catch(() => {

        });
      }
    },
    checkManager(data) {
      let id = data.id;
      let flag = true;
      if (this.managers && this.managers.length) {
        this.managers.forEach((val, key) => {
          if (val.managerId === id) {
            flag = false;
          }
        });
      } else if (this.managerName && this.managerName === data.name) {
        flag = false;
      }
      return flag;
    }
  }

};
</script>

<style scoped>
.man {
  height: 350px;
  width: 100%;
}
.h-500 {
  height: 500px;
}
.bgc-c {
  background-color: #eee;
}
.h-40 {
  height: 30px;
  line-height: 30px;
}
</style>
