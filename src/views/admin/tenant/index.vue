
<template>
  <div class="execution">
    <basic-container>
      <avue-crud
        ref="crud"
        :page.sync="page"
        :data="tableData"
        :permission="permissionList"
        :table-loading="tableLoading"
        :option="tableOption"
        @on-load="getList"
        @search-change="searchChange"
        @refresh-change="refreshChange"
        @size-change="sizeChange"
        @current-change="currentChange"
        @row-update="handleUpdate"
        @row-save="handleSave"
        @row-del="rowDel"/>
    </basic-container>
  </div>
</template>

<script>
  import {addObj, delObj, fetchPage, putObj} from '@/api/admin/tenant'
  import {tableOption} from '@/const/crud/admin/tenant'
  import {mapGetters} from 'vuex'

  export default {
    name: 'Tenant',
    data() {
      return {
        tableData: [],
        searchForm: {},
        page: {
          total: 0, // 总页数
          currentPage: 1, // 当前页数
          pageSize: 20 // 每页显示多少条
        },
        tableLoading: false,
        tableOption: tableOption
      }
    },
    computed: {
      ...mapGetters(['permissions']),
      permissionList() {
        return {
          addBtn: this.vaildData(this.permissions.admin_systenant_add, false),
          delBtn: this.vaildData(this.permissions.admin_systenant_del, false),
          editBtn: this.vaildData(this.permissions.admin_systenant_edit, false)
        }
      }
    },
    methods: {
      getList(page, params) {
        this.tableLoading = true
        fetchPage(Object.assign({
          current: page.currentPage,
          size: page.pageSize
        }, params, this.searchForm)).then(response => {
          this.tableData = response.records
          this.page.total = response.total
          this.tableLoading = false
        }).catch(() => {
          this.tableLoading = false
        })
      },
      rowDel: function (row, index) {
        var _this = this
        this.$confirm('是否确认删除ID为' + row.id, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          return delObj(row.id)
        }).then(data => {
          _this.$message.success('删除成功')
          this.getList(this.page)
        })
      },
      handleUpdate: function (row, index, done, loading) {
        putObj(row).then(data => {
          this.$message.success(this.$t('common.successfulModification'))
          done()
          this.getList(this.page)
        }).catch(() => {
          loading()
        })
      },
      handleSave: function (row, done, loading) {
        addObj(row).then(data => {
          this.$message.success(this.$t('common.addedSuccessfully'))
          done()
          this.getList(this.page)
        }).catch(() => {
          loading()
        })
      },
      searchChange(form, done) {
        this.searchForm = form
        this.page.currentPage = 1
        this.getList(this.page, form)
        done()
      },
      refreshChange() {
        this.getList(this.page)
      },
      sizeChange(pageSize) {
        this.page.pageSize = pageSize
      },
      currentChange(current) {
        this.page.currentPage = current
      },
    }
  }
</script>
