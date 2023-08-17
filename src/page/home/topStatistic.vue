<template>
  <el-row :gutter="20">
    <el-col :span="12">
      <el-card class="box-card" :body-style="{ padding: '0px' }">
        <div class="box-content">
          <div class="lside" style="background: #2d8cf0;">
            <img src="~@/assets/img/line.png" alt="">
          </div>
          <div class="rside">
            <span class="num">{{ statistic.allNum || 0 }}</span>
            <span class="label">旗下充电线</span>
          </div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card class="box-card" :body-style="{ padding: '0px' }">
        <div class="box-content">
          <div class="lside" style="background: #ff9900;">
            <img src="~@/assets/img/line.png" alt="">
          </div>
          <div class="rside">
            <span class="num">{{ statistic.trNum || 0 }}</span>
            <span class="label">使用充电线</span>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
import { qryHomeTop } from '@/api/home'
export default {
  name: '',
  data () {
    return {
      statistic: {
        allNum: 0,
        trNum: 0
      }
    }
  },
  methods: {
    init(id) {
      console.log('进来了头部', id)
      qryHomeTop({ agentId: id }).then(res => {
        console.log('统计', res)
        this.statistic = res
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.box-card {
  height: 110px;
  border-radius: 10px;
  width: 100%;
  .box-content {
    width: 100%;
    display: flex;
  }
  .lside {
    width: 33%;
    height: 110px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 32px;
      height: 32px;
    }
  }
  .rside {
    width: 67%;
    height: 110px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .num {
      font-size: 35px;
      font-weight: 600;
    }
    .label {
      font-size: 14px;
      margin-top: 10px;
    }
  }
}
</style>
