<template>
  <div>
    <div class="header">
      头部
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
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
  methods: {}
}
</script>

<style lang='scss' scoped>
.content {
  margin-top: 100px;
  width: 100vw;
  height: 400px;
  background: #eee;
}
</style>
