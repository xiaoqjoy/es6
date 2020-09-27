<style lang="less" scoped>

</style>
<template>
   <div class="batch-sponsor">
       <commonIndex :name='name'></commonIndex>
   </div>
</template>
<script type="text/ecmascript-6">
import commonIndex from "../common/index"; // 主页面
export default {
    data() {
        return {
            name: 'sponsor'
        };
    },
    components: {
        commonIndex
    }
};
</script>
