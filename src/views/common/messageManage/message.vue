<template>
  <div class="app-container calendar-list-container">
    <basic-container>
      <div class="header-search">
        <div class="lside">
          <el-form :inline="true">
            <el-form-item :label="$t('messageManage.messageTitle')">
              <el-input v-model="listQuery.newsTitle" :placeholder="$t('common.inputPrompt')"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="getData(true)">{{ $t('common.search') }}</el-button>
              <el-button type="primary" @click="handleReset()">{{ $t('common.reset') }}</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="rside">
          <el-button icon="el-icon-plus" type="primary" @click="handleAddorEdit()" v-if="permissions.admin_dognews_add">{{ $t('common.add') }}</el-button>
        </div>
      </div>

      <div class="avue-crud">
        <el-table :data="dataList" border fit v-loading="listLoading">
          <el-table-column align="center" :label="$t('messageManage.messageTitle')" prop="newsTitle" show-overflow-tooltip />
          <el-table-column align="center" :label="$t('messageManage.description')" prop="newsSketch" show-overflow-tooltip />
          <el-table-column align="center" :label="$t('messageManage.coverPhoto')">
            <template slot-scope="scope" v-if="scope.row.adminComFileInfosVo">
              <el-image
                style="height: 50px"
                :src="scope.row.adminComFileInfosVo.filePath" 
                :preview-src-list="[scope.row.adminComFileInfosVo.filePath]">
              </el-image>
            </template>
          </el-table-column>
          <el-table-column align="center" :label="$t('messageManage.messageContent')">
            <template slot-scope="scope">
              <el-popover placement="top" width="375" trigger="hover">
                <div>
                  <span v-html="scope.row.newsContent"></span>
                </div>
                <el-link :underline="false" type="primary" slot="reference">{{$t('common.view')}}</el-link>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column align="center" :label="$t('common.createTime')" width="200">
            <template slot-scope="scope">
              {{ scope.row.createTime | parseTime }}
            </template>
          </el-table-column>
          <el-table-column :label="$t('common.operate')" align="center" width="200" v-if="permissions.admin_dognews_edit || permissions.admin_dognews_del">
            <template slot-scope="scope">
              <el-button type="text" @click="handleAddorEdit(scope.row)" v-if="permissions.admin_dognews_edit">编辑</el-button>
              <el-button type="text" style="color: red;" @click="handleDel(scope.row.id)" v-if="permissions.admin_dognews_del">删除</el-button>
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

    <MessageForm ref="messageForm" @back="getData" />
  </div>
</template>
<script>
import { qryMessage, delMessage } from '@/api/common/message'
import { mapGetters } from "vuex"
import MessageForm from './components/messageForm.vue'
export default {
  components: { MessageForm },
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
      qryMessage(this.listQuery).then(res => {
        this.dataList = res.records
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
        delMessage({ id }).then(() => {
          this.getData()
          this.$message.success('删除成功')
        })
      })
    },
    // 添加 or 编辑
    handleAddorEdit(info) {
      this.$refs.messageForm.init(info)
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

<style lang='scss'>
  .wscnph {
    width: 100%;
  }

</style>
