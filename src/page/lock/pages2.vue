<template>
  <div>
    详情页
    <el-button @click="toRoute()">切换</el-button>
  </div>
</template>
<script>
export default {
  name: '',
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
    toRoute() {
      this.$router.push('/pages1')
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
