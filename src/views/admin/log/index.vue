

<template>
  <div class="log">
    <basic-container>
      <div style="float:left;display: flex;margin-bottom: 10px">
        <el-form
          :inline="true"
          :model="queryDataFrom"
        >
          <el-form-item :label="$t('logManage.userName')">
            <el-input
              v-model="queryDataFrom.username"
              style="marginRight:10px;width: 200px;"
              clearable
              :placeholder="$t('common.inputPrompt')"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('logManage.userOperation')">
            <el-input
              v-model="queryDataFrom.operation"
              style="marginRight:10px;width: 200px;"
              clearable
              :placeholder="$t('common.inputPrompt')"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              class="filter-item"
              style="margin-left: 10px;"
              type="primary"
              icon="el-icon-search"
              @click="getDataList"
            >{{$t('common.search')}}
            </el-button>
            <el-button
              type="primary"
              class="filter-item btn"
              @click="resetSearch()"
            >{{$t('common.reset')}}</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table
        :data="dataList"
        border
        v-loading="dataListLoading"
      >
        <!-- <el-table-column
          header-align="center"
          align="center"
          label="序号"
          type="index"
          width="50px"
        >
        </el-table-column> -->
        <el-table-column
          prop="username"
          header-align="center"
          align="center"
          :label="$t('logManage.userName')"
          min-width="50"
        >
        </el-table-column>
        <el-table-column
          prop="operation"
          header-align="center"
          align="center"
          :label="$t('logManage.userOperation')"
          min-width="70"
        >
        </el-table-column>
        <el-table-column
          prop="method"
          header-align="center"
          align="center"
          :label="$t('logManage.requestMethod')"
          min-width="100"
        >
        </el-table-column>
        <el-table-column
          prop="params"
          header-align="center"
          align="center"
          :label="$t('logManage.requestParameters')"
          min-width="80"
        >
          <template slot-scope="scope">
            <el-popover
              v-if="scope.row.params&&scope.row.params.length>20"
              placement="top"
              width="375"
              trigger="hover"
              @show="popoverShow(scope.row.params)"
            >
              <div>
                <span v-html="scope.row.params"></span>
              </div>
              <el-link
                :underline="false"
                type="primary"
                slot="reference"
              >{{$t('common.view')}}</el-link>
            </el-popover>
            <span v-else>{{scope.row.params}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="time"
          header-align="center"
          align="center"
          :label="$t('logManage.executionTime')"
          min-width="60"
        >
        </el-table-column>
        <el-table-column
          prop="ip"
          header-align="center"
          align="center"
          :label="$t('logManage.ipAddress')"
          width="110"
        >
        </el-table-column>
        <el-table-column align="center" :label="$t('common.createTime')" width="160">
          <template slot-scope="scope">
            {{ scope.row.createDate | parseTime }}
          </template>
        </el-table-column>
        <el-table-column
          prop="ip"
          header-align="center"
          align="center"
          :label="$t('common.operate')"
          width="80"
        >
          <template slot-scope="scope">
            <el-button
              v-if="permissions.sys_log_del"
              type="text"
              size="small"
              @click="handleDel(scope.row)"
            >
              {{$t('common.delete')}}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="avue-crud__pagination">
        <el-pagination
          @size-change="sizeChangeHandle"
          @current-change="currentChangeHandle"
          :current-page="pageIndex"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          :total="totalPage"
          background
          layout="total, sizes, prev, pager, next, jumper"
        >
        </el-pagination>
      </div>
    </basic-container>
  </div>
</template>
<script>
import { delObj, fetchList } from '@/api/admin/log'
import { tableOption } from '@/const/crud/admin/log'
import { mapGetters } from 'vuex'


export default {
  name: 'Log',
  data () {
    return {
      dataList: [],
      searchForm: {},
      queryDataFrom: {},
      totalPage: 0,
      pageIndex: 1,
      pageSize: 10,
      tableLoading: false,
      tableOption: tableOption
    }
  },
  computed: {
    ...mapGetters(['permissions']),
    permissionList () {
      return {
        delBtn: this.vaildData(this.permissions.sys_log_del, false)
      }
    }
  },
  created () {
    this.getDataList()
  },
  methods: {
    // 获取数据列表
    getDataList () {

      this.dataListLoading = true
      let queryDataFrom = {}
      if (this.queryDataFrom) {
        for (let key in this.queryDataFrom) {
          if (this.queryDataFrom[key] || this.queryDataFrom[key] === 0) {
            queryDataFrom[key] = this.queryDataFrom[key]
          }
        }
      }
      fetchList(Object.assign({
        current: this.pageIndex,
        size: this.pageSize
      }, queryDataFrom)).then(response => {
        this.dataList = response.records
        this.totalPage = response.total
      })
      this.dataListLoading = false
    },
    // 每页数
    sizeChangeHandle (val) {
      this.pageSize = val
      this.pageIndex = 1
      this.getDataList()
    },
    // 当前页
    currentChangeHandle (val) {
      this.pageIndex = val
      this.getDataList()
    },
    handleDel: function (row) {
      this.$confirm(this.$t('logManage.sureDelete'), this.$t('common.warn'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(function () {
        return delObj(row.id)
      }).then(() => {
        this.getDataList()
        this.$message.success(this.$t('common.successfullyDeleted'))
      })
    },
    resetSearch () {
      this.queryDataFrom = {}
      this.pageIndex = 1

      this.getDataList()

    },
    searchChange (form, done) {
      this.searchForm = form
      this.page.currentPage = 1
      this.getList(this.page, form)
      done()
    },
    sizeChange (pageSize) {
      this.page.pageSize = pageSize
    },
    currentChange (current) {
      this.page.currentPage = current
    },
    refreshChange () {
      this.getList(this.page)
    }
  }
}
</script>
