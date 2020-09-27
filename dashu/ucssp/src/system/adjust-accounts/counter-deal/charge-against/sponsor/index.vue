<template>
<!-- 冲销交易-发起 -->
    <div class="charge-against-sponsor">
      <sponsorIndex :name='name'></sponsorIndex>
    </div>
</template>
<script type="text/ecmascript-6">
import sponsorIndex from '../common/index';
export default {
    name: "charge-against-sponsor",
    data() {
        return {
            name: 'chargeAgainstsponsor'
        };
    },
    methods: {
    },
    components: {
        sponsorIndex
    }
};
</script>
