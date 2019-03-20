
<template>
  <inventory-table ref="inventoryTable" tableType="firstNotRentType"></inventory-table>
</template>

<script>
import inventoryTable from './components/InventoryTable';
export default {
  name: 'FirstNotRentPage',
  components: {
    inventoryTable
  },
  computed: {
  },
  data() {
    return {

    };
  },
  props: {

  },
  beforeRouteEnter(to, from, next) {
    // 编辑页面完成后需要刷新数据
    if (from.name === 'InventoryHouseEdit') {
      next(vm => {
        vm.$refs.inventoryTable.requestData();
      });
    } else {
      next();
    }
  },
  mounted() {

  },
  methods: {

  }
};
</script>


<style scoped>
</style>
