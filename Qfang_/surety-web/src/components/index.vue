<template>
  <div class="index">
    <h2>index</h2>
    <h1 @click="go">HelloWorld</h1>
    <el-button>index</el-button>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {

    }
  },
  methods: {
    go(){
      this.$router.push('/HelloWorld')
    }
  }
}
</script>

<style scoped lang="less">

</style>
