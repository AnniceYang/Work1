<template>
  <div class="app-container calendar-list-container">
    <basic-container>
      <div class="header-search">
        <div class="lside">
          <el-form :inline="true">
            <!-- <el-form-item label="等级">
              <el-select v-model="listQuery.grade" placeholder="请选择">
                <el-option label="国家" :value="0"></el-option>
                <el-option label="地区" :value="1"></el-option>
                <el-option label="居住地" :value="2"></el-option>
              </el-select>
            </el-form-item> -->
            <!-- <el-form-item>
              <el-button type="primary" @click="getData(true)">搜索</el-button>
              <el-button type="primary" @click="handleReset()">重置</el-button>
            </el-form-item> -->
          </el-form>
        </div>
        <div class="rside">
          <el-button type="primary" plain @click="handleAdd(0, 0)" v-if="permissions.admin_lsyregion_add">{{$t('common.add')}}</el-button>
        </div>
      </div>

      <div class="avue-crud">
        <el-table ref="table" :data="dataList" fit v-loading="listLoading">
          <!-- <el-table-column type="index" width="50"></el-table-column> -->
          <el-table-column label="" width="80px" />
          <el-table-column align="center" :label="$t('addressManage.countryName')">
            <template slot-scope="scope">
              <span>{{ scope.row.countryName }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" :label="$t('common.createTime')">
            <template slot-scope="scope">
              {{ scope.row.createTime | parseTime }}
            </template>
          </el-table-column>
          <el-table-column :label="$t('common.operate')" align="center" width="250">
            <template slot-scope="scope">
              <el-button type="text" @click="handleEdit(scope.row)" v-if="permissions.admin_lsyregion_edit">{{$t('common.edit')}}</el-button>
              <el-button type="text" style="color: red;" @click="handleDel(scope.row.id)" v-if="permissions.admin_lsyregion_del">{{$t('common.delete')}}</el-button>
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

      <AddressForm ref="addressForm" @back="refresh" />
    </basic-container>
  </div>
</template>
<script>
import { qryAddress, delAddress } from "@/api/address";
import AddressForm from "./components/addressForm.vue";
import { mapGetters } from "vuex"
export default {
  components: { AddressForm },
  data() {
    return {
      // 列表信息
      listLoading: false,
      dataList: [],
      total: 0,
      listQuery: {
        parentId: 0,
        current: 1,
        size: 10
      },
      tableKey: 10001,
    };
  },
  computed: {
    ...mapGetters(["permissions"]),
  },
  created() {
    this.getData();
  },
  methods: {
    getData(state) {
      this.listLoading = true
      state && (this.listQuery.current = 1)
      qryAddress(this.listQuery).then(res => {
        this.dataList = res.records.map(item => {
          item.hasChildren = true
          return item
        })
        this.total = res.total
      }).finally(() => {
        this.listLoading = false
      })
    },
    // 加载字数据
    loadChildren (tree, treeNode, resolve) {
      qryAddress({ size: 9999, parentId: tree.id }).then(res => {
        let result = []
        if (tree.grade === 1) {
          result = res.records
        } else {
          result = res.records.map(item => {
            item.hasChildren = true
            return item
          })
        }
        resolve(result)
      }).catch(_ => {
        resolve([])
      })
    },
    // 新增
    handleAdd(grade, id) {
      this.$nextTick(() => {
        this.$refs.addressForm.init('add', { grade: grade, parentId: id })
      });
    },
    handleEdit(info) {
      this.$nextTick(() => {
        this.$refs.addressForm.init('edit', info)
      });
    },
    // 删除
    handleDel(id) {
      this.$confirm(this.$t('common.sureDelete'), this.$t('common.prompt'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: "warning",
      }).then(() => {
        delAddress({ id }).then(() => {
          this.getData();
          this.$message.success(this.$t('common.successfullyDeleted'));
        });
      });
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
      this.tableKey = new Date().getTime()
      this.listQuery = {
        current: 1,
        size: 10,
        parentId: 0
      };
      this.getData()
    },
    refresh(info) {
      if (info.grade === 0) {
        // this.tableKey = new Date().getTime()
        this.getData()
      } else if (info.grade === 1) {
        qryAddress({ size: 9999, parentId: info.parentId }).then(res => {
          this.$refs.table.store.states.lazyTreeNodeMap[info.parentId] = res.records.map(item => {
            item.hasChildren = true
            return item
          })
        })
      } else if (info.grade === 2) {
        qryAddress({ size: 9999, parentId: info.parentId }).then(res => {
          this.$refs.table.store.states.lazyTreeNodeMap[info.parentId] = res.records
        })
      }
    }
  },
};
</script>

<style lang='scss' scoped>

</style>

