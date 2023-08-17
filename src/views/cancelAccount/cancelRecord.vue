<template>
  <div class="app-container calendar-list-container">
    <basic-container>
      <div class="header-search">
        <div class="lside">
          <el-form :inline="true">
            <el-form-item :label="$t('common.userType')">
              <el-select v-model="listQuery.userType" :placeholder="$t('common.selectPrompt')">
                <el-option :value="2" :label="$t('common.user')" />
                <el-option :value="1" :label="$t('common.distributor')" />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('cancelRecord.cancelEmail')">
              <el-input v-model="listQuery.mail" :placeholder="$t('common.inputPrompt')"></el-input>
            </el-form-item>
            <el-form-item :label="$t('cancelRecord.processingStatus')">
              <el-select v-model="listQuery.status" :placeholder="$t('common.selectPrompt')">
                <el-option :value="0" :label="$t('cancelRecord.toBeProcessed')" />
                <el-option :value="1" :label="$t('cancelRecord.pass')" />
                <el-option :value="2" :label="$t('cancelRecord.refuse')" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" class="btn-search" @click="getData(true)">{{$t('common.search')}}</el-button>
              <el-button type="primary" @click="handleReset()">{{ $t('common.reset') }}</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>

      <div class="avue-crud">
        <el-table :data="dataList" fit v-loading="listLoading">
          <el-table-column align="center" :label="$t('common.userType')">
            <template slot-scope="scope">
              {{ scope.row.userType | userTypeFilter }}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="mail" :label="$t('cancelRecord.cancelEmail')" />
          <el-table-column align="center" :label="$t('cancelRecord.cancellationType')">
            <template slot-scope="scope">
              {{ scope.row.type | logoutTypeFilter }}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="remarks" :label="$t('cancelRecord.reason')" show-overflow-tooltip />
          <el-table-column align="center" :label="$t('cancelRecord.processingStatus')">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status === 0">{{$t('cancelRecord.toBeProcessed')}}</el-tag>
              <el-tag type="success" v-else-if="scope.row.status === 1">{{$t('cancelRecord.pass')}}</el-tag>
              <el-tag type="danger" v-else-if="scope.row.status === 2">{{$t('cancelRecord.refuse')}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="reject" :label="$t('cancelRecord.remarks')" show-overflow-tooltip />
          <el-table-column align="center" :label="$t('common.createTime')" width="250">
            <template slot-scope="scope">
              {{ scope.row.createTime | parseTime }}
            </template>
          </el-table-column>
          <el-table-column :label="$t('common.operate')" align="center">
            <template slot-scope="scope">
              <el-button type="text" v-if="permissions.admin_comuserlogout_audit && scope.row.status === 0" @click="handleForm(scope.row.id)">{{$t('common.process')}}</el-button>
              <el-button type="text" style="color: red;" @click="handleDel(scope.row.id)" v-if="permissions.admin_comuserlogout_del">{{$t('common.delete')}}</el-button>
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

      <!-- 审核 -->
      <CancelCheck ref="cancelCheck" @back="getData" />
    </basic-container>


  </div>
</template>
<script>
import { qryCancelRecord, delCancelRecord } from "@/api/cancelAccount";
import CancelCheck from './components/cancelRecordCheck.vue'
import { mapGetters } from "vuex"
export default {
  components: { CancelCheck },
  data() {
    return {
      // 列表信息
      listLoading: false,
      dataList: [],
      total: 0,
      listQuery: {
        current: 1,
        size: 10
      }
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
      qryCancelRecord(this.listQuery).then(res => {
        this.dataList = res.records
        this.total = res.total
      }).finally(() => {
        this.listLoading = false
      })
    },
    // 审核
    handleForm(id) {
      const info = {
        id: id,
        reject: "",
        status: 1
      }
      this.$refs.cancelCheck.init(info)
    },
    // 删除
    handleDel(id) {
      this.$confirm("确定要删除此条数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        delAddress({ id }).then(() => {
          this.getData();
          this.$message.success("删除成功");
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
      this.listQuery = {
        current: 1,
        size: 10,
      };
      this.getData()
    }
  },
};
</script>

<style lang='scss' scoped>

</style>

