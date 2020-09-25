<template>
<!-- 冲销交易-发起 -->
    <div class="charge-against-reCheck">
      <sponsorIndex :name='name'></sponsorIndex>
    </div>
</template>
<script type="text/ecmascript-6">
import sponsorIndex from '../common/index';
export default {
    name: "charge-against-reCheck",
    data() {
        return {
            name: 'chargeAgainstreCheck'
        };
    },
    methods: {
    },
    components: {
        sponsorIndex
    }
};
</script>
