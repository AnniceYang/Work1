<template>
  <el-card class="box-card" :body-style="{ padding: '0px' }">
    <div class="box-content">
      <div class="header">
        <span>运营趋势</span>
        <el-button-group>
          <el-button :type="listQuery.type === 2 ? 'primary' : ''" @click="changeType(2)">近7天</el-button>
          <el-button :type="listQuery.type === 3 ? 'primary' : ''" @click="changeType(3)">近15天</el-button>
          <el-button :type="listQuery.type === 4 ? 'primary' : ''" @click="changeType(4)">近30天</el-button>
        </el-button-group>
      </div>
      <div class="content">
        <BarChart height="250px" :chartData="chartData" />
      </div>
    </div>
  </el-card>
</template>
<script>
import { qryHomeStatistic } from '@/api/home'
import BarChart from './barChart.vue'
export default {
  name: '',
  components: { BarChart },
  data () {
    return {
      listQuery: {
        type: 2
      },
      chartData: {
        xData: [],
        yData: []
      }
    }
  },
  methods: {
    init(id) {
      this.listQuery.agentId = id
      this.getData()
    },
    changeType(e) {
      this.listQuery.type = e
      this.getData()
    },
    getData() {
      this.chartData = {
        xData: [],
        yDataOrderNum: [],
        yDataPrice: [],
        yDataSellMoney: []
      }
      qryHomeStatistic(this.listQuery).then(res => {
        console.log('图表', res)
        res.forEach(item => {
          this.chartData.xData.push(item.time)
          this.chartData.yDataOrderNum.push(item.orderNum)
          this.chartData.yDataPrice.push(item.price)
          this.chartData.yDataSellMoney.push(item.sellMoney)
        })
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  padding: 0 10px;
  box-sizing: border-box;
  border-bottom: 1px solid #e8eaec;
}
.content {
  height: 250px;
}
</style>
