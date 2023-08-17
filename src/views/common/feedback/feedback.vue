<template>
  <div class="app-container calendar-list-container">
    <basic-container>
      <div class="header-search">
        <div class="lside">
          <el-form :inline="true">
            <el-form-item :label="$t('opinionManage.processingStatus')">
              <el-select v-model="listQuery.feedbackState" :placeholder="$t('common.selectPrompt')">
                <el-option :label="$t('opinionManage.toBeProcessed')" :value="0" />
                <el-option :label="$t('opinionManage.processed')" :value="3" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="getData(true)">{{ $t('common.search') }}</el-button>
              <el-button type="primary" @click="handleReset()">{{ $t('common.reset') }}</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="rside">
        </div>
      </div>

      <div class="avue-crud">
        <el-table :data="dataList" border fit v-loading="listLoading">
          <!-- <el-table-column align="center" label="意见类型">
            <template slot-scope="scope">
              {{ scope.row.feedbackType | feedbackTypeFilter }}
            </template>
          </el-table-column> -->
          <el-table-column align="center" :label="$t('opinionManage.userAccount')" prop="username" />
          <el-table-column align="center" :label="$t('opinionManage.contactInformation')" prop="telephone" />
          <el-table-column align="center" :label="$t('opinionManage.processingStatus')">
            <template slot-scope="scope">
              {{ scope.row.feedbackState | feedbackStateFilter }}
            </template>
          </el-table-column>
          <el-table-column align="center" :label="$t('opinionManage.opinionContent')" prop="contentInfo" show-overflow-tooltip />
          <el-table-column align="center" :label="$t('opinionManage.picture')">
            <template slot-scope="scope" v-if="scope.row.adminComFileInfosVo.length > 0">
              <div style="display: flex; flex-direction: column; align-items: center;">
                <el-image
                  style="height: 50px"
                  :src="scope.row.adminComFileInfosVo[0].filePath" 
                  :preview-src-list="scope.row.adminComFileInfosVo.map(item => { return item.filePath })">
                </el-image>
                <span>共{{ scope.row.adminComFileInfosVo.length }}张</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" :label="$t('common.createTime')" width="200">
            <template slot-scope="scope">
              {{ scope.row.createTime | parseTime }}
            </template>
          </el-table-column>
          <el-table-column :label="$t('common.operate')" align="center" width="200">
            <template slot-scope="scope">
              <el-button type="text" v-if="scope.row.feedbackState !== 3" @click="handleAudit(scope.row.id)">处理</el-button>
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
  </div>
</template>
<script>
import { qryFeedback, delFeedback, disposeFeedback } from '@/api/common/feedback'
import { mapGetters } from "vuex"
export default {
  data () {
    return {
      // 列表信息
      listLoading: false,
      dataList: [],
      total: 0,
      listQuery: {
        current: 1,
        size: 10
      },
      typeList: []
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
      qryFeedback(this.listQuery).then(res => {
        this.dataList = res.records.map(item => {
          item.imgList = []
          if (item.adminComFileInfosVo && item.adminComFileInfosVo.length > 0) {
            item.imgList = item.adminComFileInfosVo.map(i => { return item.filePath })
          }
          return item
        })
        this.total = res.total
      }).finally(() => {
        this.listLoading = false
      })
    },
    // 删除
    handleDel(id) {
      this.$confirm('确定要删除此条数据吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delFeedback({ id }).then(() => {
          this.getData()
          this.$message.success('删除成功')
        })
      })
    },
    // 处理
    handleAudit(id) {
      this.$prompt('请输入回复内容', '处理', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: '您的反馈已收到吗，我们会尽快处理'
      }).then(({ value }) => {
        disposeFeedback({ id, contentReply: value, feedbackState: 3 }).then(res => {
          this.getData()
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
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
