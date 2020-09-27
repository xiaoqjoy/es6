<template>
<!-- 冲销交易-发起 -->
    <div class="charge-against-accomplish">
      <sponsorIndex :name='name'></sponsorIndex>
    </div>
</template>
<script type="text/ecmascript-6">
import sponsorIndex from '../common/index';
export default {
    name: "charge-against-accomplish",
    data() {
        return {
            name: 'chargeAgainstaccomplish'
        };
    },
    methods: {
    },
    components: {
        sponsorIndex
    }
};
</script>
