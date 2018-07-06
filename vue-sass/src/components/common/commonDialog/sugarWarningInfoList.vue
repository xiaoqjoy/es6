<template>
    <div class="sugarWarningInfo tac" v-show="sugarWarningTableShow">
        <div class="triangle"></div>
        <el-table
        :data="tableData"
        :row-class-name="tableRowClassName"
        style="width: 100%"
        @row-click="clickRow">
            <el-table-column
                prop="patientName"
                label="姓名"
                width="70">
            </el-table-column>
            <el-table-column
                prop="diabetesType"
                label="糖尿病类型"
                width="120">
            </el-table-column>
            <el-table-column
                prop="sugarTestTime"
                label="时间"
                width="110">
            </el-table-column>
            <el-table-column
                prop="timeType"
                label="时间段"
                width="70">
            </el-table-column>
            <el-table-column
                prop="sugar"
                label="血糖值"
                width="70">
            </el-table-column>
        </el-table>
        <div class="checkMore" @click="toSugarWarning">查看所有预警数据 >></div>
    </div>
</template>
<style scoped lang="less">
    .sugarWarningInfo {
        background-color: #fff;
        box-sizing: border-box;
        position: fixed;
        right: 100px;
        top: 70px;
        z-index: 2500;
        box-shadow:0px 0px 5px #ccc;
    }
    .triangle {
        width: 20px;
        height: 20px;
        background-color: #fff;
        position: absolute;
        right: 150px;
        top: -5px;
        transform: rotate(45deg);
    }
    .checkMore{
        width: 100%;
        height: 40px;
        line-height: 40px;
        color: #8b9eba;
        background-color: #F7F8FA;
        cursor: pointer;
    }
</style>
<style>
    .sugarWarningInfo .el-table td, .el-table th.is-leaf {
        border: none;
    }
    .sugarWarningInfo .el-table::before {
        height: 0;
    }
    .sugarWarningInfo .el-table thead th{
        text-align: center;
        color: #000;
        border-bottom: 1px solid #e0e0e0;
    }
    .sugarWarningInfo .el-table td,.sugarWarningInfo .el-table th{
        padding: 5px 0;
    }
    .sugarWarningInfo tbody tr.readed td{
        color: #e0e0e0;
    }
    .sugarWarningInfo tbody tr td:nth-child(1){
        color: #409EFF;
    }
    .sugarWarningInfo tbody tr td:nth-child(5){
        color: #f36868;
    }
</style>

<script>
export default {
    name: 'sugarWarningInfoList',
    data () {
        return {
            tableData: [],
            sugarWarningTableShow: false
        }
    },
    methods: {
        toSugarWarning () {
            this.$router.push('/sugarWarningPage');
            this.sugarWarningTableShow = false;
        },
        tableRowClassName({row}) {
            if (row.isRead == '1') {
                return 'readed';
            } else {
                return 'unRead';
            }
        },
        clickRow (row) {
            let _this = this;
            if (row.customerId) {
                if (row.isRead == '2') {
                    this.$api.signSugarWarningReaded({ids:row.id}, res => {
                        row.isRead = '1';
                        _this.$parent.getUnreadSum();
                    });
                }
                if (this.$router.history.current.name == 'patientDetail') {
                    this.$router.replace({
                        name: 'patientDetail',
                        query: {
                            cusTomId: row.customerId,
                            userCusId: row.userCustomerId,
                            fileNumber: row.fileNumber
                        }
                    })
                } else {
                    this.$router.push({
                        name: 'patientDetail',
                        query: {
                            cusTomId: row.customerId,
                            userCusId: row.userCustomerId,
                            fileNumber: row.fileNumber
                        }
                    })
                }
            }
        }
    }
}
</script>
