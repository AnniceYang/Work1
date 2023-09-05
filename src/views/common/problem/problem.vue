<template>
  <div class="app-container calendar-list-container">
    <basic-container>
      <div class="header-search">
        <div class="lside">
          <el-form :inline="true">
            <el-form-item :label="$t('problemManage.title')">
              <el-input v-model="listQuery.title" :placeholder="$t('common.inputPrompt')"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="getData(true)">{{$t('common.search')}}</el-button>
              <el-button type="primary" @click="handleReset()">{{$t('common.reset')}}</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="rside">
          <el-button icon="el-icon-plus" type="primary" @click="handleAddorEdit()">{{$t('common.add')}}</el-button>
        </div>
      </div>

      <div class="avue-crud">
        <el-table :data="dataList" border fit v-loading="listLoading">
          <el-table-column align="center" :label="$t('problemManage.problemClassify')" prop="problemClassName" width="180px" />
          <el-table-column align="center" :label="$t('problemManage.titleC')" prop="title" width="180px" />
          <el-table-column align="center" :label="$t('problemManage.titleE')" prop="titleEn" width="200px" />
          <el-table-column align="center" :label="$t('problemManage.contentC')" prop="contentInfo" show-overflow-tooltip />
          <el-table-column align="center" :label="$t('problemManage.contentE')" prop="contentInfoEn" show-overflow-tooltip />
          <el-table-column align="center" :label="$t('common.createTime')" width="160">
            <template slot-scope="scope">
              {{ scope.row.createTime | parseTime }}
            </template>
          </el-table-column>
          <el-table-column :label="$t('common.operate')" align="center" width="120">
            <template slot-scope="scope">
              <el-button type="text" @click="handleAddorEdit(scope.row)">{{$t('common.edit')}}</el-button>
              <el-button type="text" style="color: red;" @click="handleDel(scope.row.id)">{{$t('common.delete')}}</el-button>
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
    </basic-container>

    <ProblemForm ref="problemForm" @back="getData" />
  </div>
</template>
<script>
import { qryProblem, delProblem } from '@/api/common/problem'
import { mapGetters } from "vuex"
import ProblemForm from './components/problemForm.vue'
export default {
  components: { ProblemForm },
  data () {
    return {
      // 列表信息
      listLoading: false,
      dataList: [],
      total: 0,
      listQuery: {
        current: 1,
        size: 10
      }
    }
  },
  computed: {
    ...mapGetters(["permissions"]),
  },
  created () {
    this.getData()
  },
  methods: {
    getData(state) {
      this.listLoading = true
      state && (this.listQuery.current = 1)
      qryProblem(this.listQuery).then(res => {
        this.dataList = res.records
        this.total = res.total
      }).finally(() => {
        this.listLoading = false
      })
    },
    // 删除
    handleDel(id) {
      this.$confirm(this.$t('common.sureDelete'), this.$t('common.prompt'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        delProblem({ id }).then(() => {
          this.getData()
          this.$message.success(this.$t('common.successfullyDeleted'))
        })
      })
    },
    // 添加 or 编辑
    handleAddorEdit(info) {
      this.$refs.problemForm.init(info)
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
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
