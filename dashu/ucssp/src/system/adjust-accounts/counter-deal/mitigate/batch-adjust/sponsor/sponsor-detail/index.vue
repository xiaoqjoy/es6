<style lang="less" scoped>

</style>
<template>
   <div class="batch-sponsor-detail">
       <commonDetail :name='name'></commonDetail>
   </div>
</template>
<script type="text/ecmascript-6">
import commonDetail from "../../common/detail"; // 主页面
export default {
    data() {
        return {
            name: 'sponsorDetail'
        };
    },
    components: {
        commonDetail
    }
};
</script>
