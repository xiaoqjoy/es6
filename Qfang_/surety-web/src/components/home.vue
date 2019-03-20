<template>
  <div class="home">
    <h2 @click="goIndex">111</h2>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {

    }
  },
  methods: {
    goIndex(){
      this.$router.push('/index')
    }
  }
}
</script>

<style scoped lang="less">

</style>
