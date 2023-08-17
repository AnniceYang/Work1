<template>
  <el-card class="box-card" :body-style="{ padding: '0px' }">
    <div class="box-content">
      <div class="header">
        <span>储能</span>
        <el-button-group>
          <el-button :type="listQuery.type === 2 ? 'primary' : ''" @click="changeType(2)">近7天</el-button>
          <el-button :type="listQuery.type === 3 ? 'primary' : ''" @click="changeType(3)">近15天</el-button>
          <el-button :type="listQuery.type === 4 ? 'primary' : ''" @click="changeType(4)">近30天</el-button>
        </el-button-group>
      </div>
      <div class="content">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="hotelName" label="酒店名称" align="center" />
          <el-table-column prop="sellMoney" label="交易额" align="center" />
          <el-table-column prop="useBl" label="使用率" align="center" />
          <el-table-column prop="price" label="客单价" align="center" />
        </el-table>
      </div>
    </div>
  </el-card>
</template>
<script>
import { qryHomeDeal } from '@/api/home'
export default {
  name: '',
  data () {
    return {
      tableData:[],
      listQuery: {
        type: 2
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
      qryHomeDeal(this.listQuery).then(res => {
        console.log(res)
        this.tableData = res
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
  padding: 10px;
  box-sizing: border-box;
}
</style>
