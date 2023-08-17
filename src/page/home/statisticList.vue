<template>
  <el-card class="box-card" :body-style="{ padding: '0px' }">
    <div class="box-content">
      <div class="header">
        <span>运营统计</span>
        <el-button-group>
          <el-button :type="listQuery.type === 1 ? 'primary' : ''" @click="changeType(1)">今天</el-button>
          <el-button :type="listQuery.type === 0 ? 'primary' : ''" @click="changeType(0)">昨天</el-button>
          <el-button :type="listQuery.type === 2 ? 'primary' : ''" @click="changeType(2)">近7天</el-button>
          <el-button :type="listQuery.type === 3 ? 'primary' : ''" @click="changeType(3)">近15天</el-button>
          <el-button :type="listQuery.type === 4 ? 'primary' : ''" @click="changeType(4)">近30天</el-button>
        </el-button-group>
      </div>
      <div class="content">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="name" label="分类" align="center" />
          <el-table-column prop="data" label="充电线" align="center" />
        </el-table>
      </div>
    </div>
  </el-card>
</template>
<script>
import { qryHomeStatisticList } from '@/api/home'
export default {
  name: '',
  data () {
    return {
      tableData:[
        { name: '借出笔数', data: 0 },
        { name: '还入笔数', data: 0 },
        { name: '交易金额', data: 0 },
        { name: '客单价', data: 0 }
      ],
      listQuery: {
        type: 1
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
      qryHomeStatisticList(this.listQuery).then(res => {
        console.log(res)
        this.tableData = [
          { name: '借出笔数', data: res.jcNum || 0 },
          { name: '还入笔数', data: res.hrNum || 0 },
          { name: '交易金额', data: res.sellMoney || 0 },
          { name: '客单价', data: res.price || 0 }
        ]
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
  padding: 10px;
  box-sizing: border-box;
}
</style>
