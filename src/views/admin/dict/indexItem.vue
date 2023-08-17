<template>
  <div>
    <el-dialog
      title="字典详情"
      :close-on-click-modal="false"
      :visible.sync="visible"
      width="1100px">
      <el-button icon="el-icon-plus" type="primary" @click="handleAddOrEdit({ dictId: listQuery.dictId })">新增</el-button>
      <el-table :data="dataList" border fit v-loading="listLoading" style="margin-top: 10px;">
        <el-table-column label="编号" align="center" prop="code" />
        <el-table-column label="标签名" align="center" prop="label" />
        <el-table-column label="数据值" align="center" prop="value" />
        <el-table-column label="描述" align="center" prop="description" />
        <el-table-column label="排序" align="center" prop="sort" />
        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-edit" @click="handleAddOrEdit(scope.row)">编辑</el-button>
            <el-button type="text" style="color:red" icon="el-icon-delete" @click="handleDel(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <DictFromItem ref="dictFromItem" @back="handleBack" />
    </el-dialog>
  </div>
</template>
<script>
import { qryDictItemList, delDictItem } from '@/api/admin/dict'
import DictFromItem from './formItem.vue'
export default {
  name: '',
  components: { DictFromItem },
  data () {
    return {
      visible: false,
      listLoading: false,
      dataList: [],
      total: 0,
      listQuery: {
        current: 1,
        size: 10
      }
    }
  },
  methods: {
    init(id) {
      this.visible = true
      this.listQuery.dictId = id
      this.getData()
    },
    // 查询
    getData(state) {
      this.listLoading = true
      state && (this.listQuery.current = 1)
      qryDictItemList(this.listQuery).then(res => {
        this.dataList = res.records
        this.total = Number(res.total)
      }).finally(() => {
        this.listLoading = false
      })
    },
    handleAddOrEdit(info) {
      this.$refs.dictFromItem.init(info)
    },
    // 删除
    handleDel(id) {
      this.$confirm('确定要删除此条数据吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delDictItem({ id }).then(() => {
          this.getData()
          this.$message.success('删除成功')
        })
      })
    },
     // 每页数
    sizeChangeHandle(val) {
      this.listQuery.size = val
      this.getData(true)
    },
    // 当前页
    currentChangeHandle(val) {
      this.listQuery.current = val
      this.getData()
    },
    // 重置
    handleReset() {
      this.listQuery = {
        dictId: this.listQuery.dictId,
        current: 1,
        size: 10
      }
      this.getData()
    },
    handleBack() {
      this.getData()
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
