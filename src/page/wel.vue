<template>
  <div>
    <basic-container>
      <div class="banner-text">
        <span>
          <!-- <h5>欢迎进入管理系统后台服务</h5> -->
          <h5>{{$t('common.wel')}}</h5>
        </span>
      </div>
    </basic-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Wel',
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(['website'])
  },
  methods: {
    
  }
}
</script>

<style scoped="scoped" lang="scss">
  .el-collapse-item__header {
    display: block !important;
  }

  .wel-contailer {
    position: relative;
  }

  .banner-text {
    position: relative;
    padding: 0 20px;
    font-size: 20px;
    text-align: center;
    color: #333;
  }

  .banner-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.8;
    display: none;
  }

  .actor {
    height: 250px;
    overflow: hidden;
    font-size: 18px;
    color: #333;
  }

  .actor:after {
    content: '';
    width: 3px;
    height: 25px;
    vertical-align: -5px;
    margin-left: 5px;
    background-color: #333;
    display: inline-block;
    animation: blink 0.4s infinite alternate;
  }

  .typeing:after {
    animation: none;
  }

  @keyframes blink {
    to {
      opacity: 0;
    }
  }
</style>
