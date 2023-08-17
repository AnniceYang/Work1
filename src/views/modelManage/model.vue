<template>
  <div class="app-container calendar-list-container">
    <basic-container>
      <div class="header-search">
        <div class="lside">
          <el-form :inline="true">
            <el-form-item :label="$t('modelManage.modeName')">
              <el-input v-model="listQuery.name" :placeholder="$t('common.inputPrompt')"></el-input>
            </el-form-item>
            <el-form-item :label="$t('modelManage.state')">
              <el-select v-model="listQuery.status" :placeholder="$t('common.selectPrompt')">
                <el-option :label="$t('modelManage.normal')" :value="0"></el-option>
                <el-option :label="$t('modelManage.toBeOpened')" :value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getData(true)">{{$t('common.search')}}</el-button>
              <el-button type="primary" @click="handleReset()">{{$t('common.reset')}}</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="rside">
          <!-- <el-button type="primary" plain @click="handleForm()" v-if="permissions.admin_lsydevice_add">添加</el-button> -->
        </div>
      </div>

      <div class="avue-crud">
        <el-table :data="dataList" fit v-loading="listLoading">
          <el-table-column align="center" prop="sort" :label="$t('modelManage.sort')" width="50" />
          <el-table-column align="center" prop="name" :label="$t('modelManage.modeName')" />
          <el-table-column align="center" prop="code" :label="$t('modelManage.modeEncoding')" />
          <el-table-column align="center" :label="$t('modelManage.state')">
            <template slot-scope="scope">
              {{ scope.row.status === 0 ? $t('modelManage.normal') : $t('modelManage.toBeOpened') }}
            </template>
          </el-table-column>

          <el-table-column align="center" prop="explanation" :label="$t('modelManage.modeDescription')" show-overflow-tooltip />
          <el-table-column align="center" :label="$t('common.createTime')" width="150">
            <template slot-scope="scope">
              {{ scope.row.createTime | parseTime }}
            </template>
          </el-table-column>
          <el-table-column :label="$t('common.operate')" align="center" width="250">
            <template slot-scope="scope">
              <el-button type="text" @click="handleForm(scope.row.id)" v-if="permissions.admin_lsydevice_edit">{{$t('common.edit')}}</el-button>
              <!-- <el-button type="text" style="color: red;" @click="handleDel(scope.row.id)" v-if="permissions.admin_lsydevice_del">删除</el-button> -->
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

      <ModelForm ref="modelForm" @back="getData" />
    </basic-container>
  </div>
</template>
<script>
import { qryModel, delModel } from "@/api/model";
import ModelForm from "./components/modelForm.vue";
import { mapGetters } from "vuex"
export default {
  components: { ModelForm },
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
      qryModel(this.listQuery).then(res => {
        this.dataList = res.records
        this.total = res.total
      }).finally(() => {
        this.listLoading = false
      })
    },
    // 新增
    handleForm(id) {
      this.$nextTick(() => {
        this.$refs.modelForm.init(id)
      });
    },
    // 删除
    handleDel(id) {
      this.$confirm(this.$t('common.sureDelete'), this.$t('common.prompt'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: "warning",
      }).then(() => {
        delModel({ id }).then(() => {
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

