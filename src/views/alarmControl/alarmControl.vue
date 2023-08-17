<template>
  <div class="app-container calendar-list-container">
    <basic-container>
      <div class="header-search">
        <div class="lside">
          <el-form :inline="true">
            <el-form-item :label="$t('alarmControl.alarmEncoding')">
              <el-input v-model="listQuery.code" :placeholder="$t('common.inputPrompt')"></el-input>
            </el-form-item>
            <el-form-item :label="$t('alarmControl.alarmName')">
              <el-input v-model="listQuery.name" :placeholder="$t('common.inputPrompt')"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getData(true)">{{$t('common.search')}}</el-button>
              <el-button type="primary" @click="handleReset()">{{$t('common.reset')}}</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="rside">
          <el-button type="primary" plain @click="handleForm()" v-if="permissions.admin_lsyalarmcontrol_add">{{$t('common.add')}}</el-button>
        </div>
      </div>

      <div class="avue-crud">
        <el-table :data="dataList" fit v-loading="listLoading">
          <el-table-column align="center" prop="sort" :label="$t('alarmControl.sort')" width="50" />
          <el-table-column align="center" prop="code" :label="$t('alarmControl.alarmEncoding')" />
          <el-table-column align="center" prop="name" :label="$t('alarmControl.alarmName')" />
          <el-table-column align="center" :label="$t('alarmControl.displayOrNot')">
            <template slot-scope="scope">
              {{ scope.row.show === 0 ? $t('common.no') : $t('common.yes') }}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="illustrate" :label="$t('alarmControl.description')" show-overflow-tooltip />
          <el-table-column align="center" :label="$t('alarmControl.createTime')" width="150">
            <template slot-scope="scope">
              {{ scope.row.createTime | parseTime }}
            </template>
          </el-table-column>
          <el-table-column :label="$t('common.operate')" align="center" width="250">
            <template slot-scope="scope">
              <el-button type="text" @click="handleForm(scope.row)" v-if="permissions.admin_lsyalarmcontrol_edit">{{$t('common.edit')}}</el-button>
              <el-button type="text" style="color: red;" @click="handleDel(scope.row.id)" v-if="permissions.admin_lsyalarmcontrol_del">{{$t('common.delete')}}</el-button>
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

      <DataForm ref="dataForm" @back="getData" />
    </basic-container>
  </div>
</template>
<script>
import { qryAlarmControl, delAlarmControl } from "@/api/alarmControl";
import DataForm from "./components/dataForm.vue";
import { mapGetters } from "vuex"
export default {
  components: { DataForm },
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
      qryAlarmControl(this.listQuery).then(res => {
        this.dataList = res.records
        this.total = res.total
      }).finally(() => {
        this.listLoading = false
      })
    },
    // 新增
    handleForm(info) {
      this.$nextTick(() => {
        this.$refs.dataForm.init(info)
      });
    },
    // 删除
    handleDel(id) {
      this.$confirm(this.$t('common.sureDelete'), this.$t('common.prompt'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: "warning",
      }).then(() => {
        delAlarmControl({ id }).then(() => {
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

