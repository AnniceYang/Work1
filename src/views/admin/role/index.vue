

<template>
  <div class="app-container calendar-list-container">
    <basic-container>
      <div class="avue-crud">
        <el-table :data="dataList" border fit v-loading="listLoading">
          <!-- <el-table-column align="center" prop="roleName" :label="$t('roleManage.roleName')" /> -->
          <el-table-column :label="$t('roleManage.roleName')" align="center">
            <template slot-scope="scope">
              {{roleList[scope.row.roleId - 1]}}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="roleCode" :label="$t('roleManage.roleIdentification')" />
          <el-table-column align="center" prop="roleDesc" :label="$t('roleManage.roleDescription')" />
          <el-table-column :label="$t('common.operate')" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="handlePermission(scope.row)">{{$t('roleManage.authority')}}</el-button>
              <!-- <el-button type="text" @click="handleForm(scope.row)">编辑</el-button>
              <el-button type="text" style="color: red;" @click="handleDel(scope.row.id)">删除</el-button> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="table-pagination">
        <el-pagination
          @size-change="sizeChangeHandle"
          @current-change="currentChangeHandle"
          :current-page="listQuery.current"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="listQuery.size"
          :total="total"
          background
          layout="total, sizes, prev, pager, next, jumper"
        />
      </div>
    </basic-container>

    <el-dialog
      :visible.sync="visible"
      :close-on-click-modal="false"
      :title="$t('roleManage.assignPermissions')">
      <div class="dialog-main-tree">
      <el-tree
        ref="menuTree"
        :data="treeData"
        :default-checked-keys="checkedKeys"
        :check-strictly="false"
        :props="defaultProps"
        :filter-node-method="filterNode"
        class="filter-tree"
        node-key="id"
        highlight-current
        show-checkbox
        default-expand-all/>
      </div>
      <div slot="footer"
        class="dialog-footer">
        <el-button
          type="primary"
                   size="small"
          @click="updatePermession(roleId)">{{$t('common.update')}}
        </el-button>
        <el-button type="default" size="small" @click="visible = false">{{$t('common.cancel')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addObj, delObj, fetchList, fetchRoleTree, permissionUpd, putObj } from '@/api/admin/role'
import { fetchMenuTree } from '@/api/admin/menu'
import { mapGetters } from 'vuex'

export default {
  name: 'TableRole',
  data() {
    return {
      listLoading: false,
      dataList: [],
      total: 0,
      listQuery: {
        current: 1,
        size: 10
      },
      visible: false,
      treeData: [],
      checkedKeys: [],
      defaultProps: {
        label: 'name',
        value: 'id'
      },
      roleList: [this.$t('common.admin'), this.$t('deviceManage.installer'), this.$t('deviceManage.user')],
    }
  },
  created() {
    this.getData()
  },
  computed: {
    ...mapGetters(['permissions'])
  },
  methods: {
    getData(state) {
      this.listLoading = true
      state && (this.listQuery.current = 1)
      fetchList(this.listQuery).then(res => {
        this.dataList = res.records
        this.total = res.total
      }).finally(() => {
        this.listLoading = false
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
        size: 10,
      };
      this.getData()
    },
    handleCreate() {
      this.$refs.crud.rowAdd()
    },
    handleUpdate(row, index) {
      this.$refs.crud.rowEdit(row, index)
    },
    handlePermission(row) {
      fetchRoleTree(row.roleId)
        .then(response => {
          this.checkedKeys = response
          return fetchMenuTree()
        })
        .then(response => {
          this.treeData = response
          // 解析出所有的太监节点
          this.checkedKeys = this.resolveAllEunuchNodeId(this.treeData, this.checkedKeys, [])
          this.visible = true
          this.roleId = row.roleId
          this.roleCode = row.roleCode
        })
    },
    /**
     * 解析出所有的太监节点id
     * @param json 待解析的json串
     * @param idArr 原始节点数组
     * @param temp 临时存放节点id的数组
     * @return 太监节点id数组
     */
    resolveAllEunuchNodeId(json, idArr, temp) {
      for (let i = 0; i < json.length; i++) {
        const item = json[i]
        // 存在子节点，递归遍历;不存在子节点，将json的id添加到临时数组中
        if (item.children && item.children.length !== 0) {
          this.resolveAllEunuchNodeId(item.children, idArr, temp)
        } else {
          temp.push(idArr.filter(id => id === item.id))
        }
      }
      return temp
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    handleDel(id) {
      this.$confirm("确定要删除此条数据吗?", '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delObj(row.roleId)
      }).then(() => {
        this.getList(this.page)
        this.$notify.success('删除成功')
      })
    },
    create(row, done, loading) {
      if (this.form.dsType === 1) {
        this.form.dsScope = this.$refs.scopeTree.getCheckedKeys().join(',')
      }
      addObj(this.form).then(() => {
        this.getList(this.page)
        done()
        this.$notify.success('创建成功')
      }).catch(() => {
        loading()
      })
    },
    update(row, index, done, loading) {
      if (this.form.dsType === 1) {
        this.form.dsScope = this.$refs.scopeTree.getCheckedKeys().join(',')
      }
      putObj(this.form).then(() => {
        this.getList(this.page)
        done()
        this.$notify.success(this.$t('common.successfulModification'))
      }).catch(() => {
        loading()
      })
    },
    updatePermession (roleId) {
        this.menuIds = ''
        this.menuIds = this.$refs.menuTree.getCheckedKeys().join(',').concat(',').concat(this.$refs.menuTree.getHalfCheckedKeys().join(','))
        permissionUpd(roleId, this.menuIds).then(() => {
            this.visible = false
            this.$notify.success(this.$t('common.successfulModification'))
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-dialog__wrapper {
  .el-dialog {
    width: 61% !important;
  .dialog-main-tree {
    max-height: 400px;
    overflow-y: auto;
  }
  }
  .el-form-item__label {
    width: 20% !important;
    padding-right: 20px;
  }
  .el-form-item__content {
    margin-left: 20% !important;
  }
  }
</style>
