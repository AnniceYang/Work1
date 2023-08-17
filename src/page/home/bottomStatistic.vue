<template>
  <el-row :gutter="20">
    <el-col :span="12">
      <el-card class="box-card" :body-style="{ padding: '0px' }">
        <div class="box-content">
          <div class="lside" style="background: #2d8cf0;">
            <img src="~@/assets/img/money.png" alt="">
          </div>
          <div class="rside">
            <span class="num">{{ statistic.allSy || 0 }}</span>
            <span class="label">总收益</span>
          </div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card class="box-card" :body-style="{ padding: '0px' }">
        <div class="box-content">
          <div class="lside" style="background: #ff9900;">
            <img src="~@/assets/img/money.png" alt="">
          </div>
          <div class="rside">
            <span class="num">{{ statistic.daySy || 0 }}</span>
            <span class="label">每日收益</span>
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
