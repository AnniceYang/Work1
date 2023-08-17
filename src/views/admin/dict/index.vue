<template>
  <div class="app-container calendar-list-container">
    <basic-container>
      <div class="header-search" style="display: flex; justify-content: space-between;">
        <div class="lside">
          <el-form :inline="true">
            <el-form-item label="字典类型">
              <el-input v-model="listQuery.type" placeholder="请输入字典类型" />
            </el-form-item>
            <el-form-item label="系统内置">
              <el-select v-model="listQuery.system" filterable>
                <el-option label="系统" :value="1" />
                <el-option label="业务" :value="0" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="getData(true)">搜索</el-button>
              <el-button type="primary" @click="handleReset()">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="rside">
          <el-button icon="el-icon-plus" type="primary" @click="handleAddOrEdit()">新增</el-button>
        </div>
      </div>
      <div class="avue-crud" >
        <el-table :data="dataList" border fit v-loading="listLoading">
          <el-table-column label="字典类型" align="center" prop="type" />
          <el-table-column label="字典描述" align="center" prop="description" />
          <el-table-column label="字典备注" align="center" prop="remarks" />
          <el-table-column label="系统内置" align="center">
            <template slot-scope="scope">
              {{ scope.row.system === 0 ? '业务' : '系统' }}
            </template>
          </el-table-column>
          <el-table-column label="创建时间" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d}') }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" icon="el-icon-view" @click="handleDetail(scope.row.id)">详情</el-button>
              <el-button type="text" icon="el-icon-edit" @click="handleAddOrEdit(scope.row)">编辑</el-button>
              <el-button type="text" style="color:red" icon="el-icon-delete" @click="handleDel(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="avue-crud__pagination">
        <el-pagination
          @size-change="sizeChangeHandle"
          @current-change="currentChangeHandle"
          :current-page="listQuery.current"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="listQuery.size"
          :total="total"
          background
          layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
      </div>

      <DictFrom ref="dictFrom" @back="handleBack" />
      <IndexItem ref="dictItem" />
    </basic-container>
  </div>
</template>
<script>
import { qryDictList, delDict } from '@/api/admin/dict'
import DictFrom from './form.vue'
import IndexItem from './indexItem.vue'
export default {
  name: 'Dict',
  components: { DictFrom, IndexItem },
  data () {
    return {
      listLoading: false,
      dataList: [],
      total: 0,
      listQuery: {
        current: 1,
        size: 10
      }
    }
  },
  created () {
    this.getData()
  },
  methods: {
    // 查询
    getData(state) {
      this.listLoading = true
      state && (this.listQuery.current = 1)
      qryDictList(this.listQuery).then(res => {
        this.dataList = res.records
        this.total = Number(res.total)
      }).finally(() => {
        this.listLoading = false
      })
    },
    // 详情
    handleDetail(id) {
      this.$refs.dictItem.init(id)
    },
    // 编辑
    handleAddOrEdit(info) {
      this.$refs.dictFrom.init(info)
    },
    // 删除
    handleDel(id) {
      this.$confirm('确定要删除此条数据吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delDict({ id }).then(() => {
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
        current: 1,
        size: 10
      }
      this.getData(true)
    },
    handleBack() {
      this.getData()
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
