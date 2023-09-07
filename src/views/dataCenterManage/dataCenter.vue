<template>
  <div class="app-container calendar-list-container">
    <basic-container>
      <div class="header-search">
        <div class="lside">
          <el-form :inline="true">
            <el-form-item :label="$t('dataCenter.title')">
              <el-input v-model="listQuery.title" :placeholder="$t('common.inputPrompt')"></el-input>
            </el-form-item>
            <el-form-item :label="$t('dataCenter.type')">
              <el-select v-model="listQuery.type" :placeholder="$t('common.selectPrompt')">
                <el-option  :label="$t('dataCenter.newsCenter')" :value="1" />
                <el-option  :label="$t('dataCenter.installationInstructions')" :value="2" />
                <el-option  :label="$t('dataCenter.installationVideo')" :value="3" />
                <el-option  :label="$t('dataCenter.userManual')" :value="4" />
                <el-option  :label="$t('dataCenter.troubleShooting')" :value="5" />
                <el-option  label="Q&A" :value="6" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getData(true)">{{$t('common.search')}}</el-button>
              <el-button type="primary" @click="handleReset()">{{$t('common.reset')}}</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="rside">
          <el-button type="primary" plain @click="handleForm()" v-if="permissions.admin_lsydatacenter_add">{{$t('common.add')}}</el-button>
        </div>
      </div>

      <div class="avue-crud">
        <el-table :data="dataList" fit v-loading="listLoading">
          <el-table-column align="center" prop="title" :label="$t('dataCenter.title')" />
          <el-table-column align="center" prop="sketch" show-overflow-tooltip :label="$t('dataCenter.sketch')" />
          <el-table-column align="center" :label="$t('dataCenter.coverPhoto')">
            <template slot-scope="scope" v-if="scope.row.fileInfo">
              <el-image
                style="height: 50px"
                :src="scope.row.fileInfo.filePath" 
                :preview-src-list="[scope.row.fileInfo.filePath]">
              </el-image>
            </template>
          </el-table-column>
          <el-table-column align="center" :label="$t('dataCenter.type')">
            <template slot-scope="scope">
              <!-- {{ scope.row.type | dataTypeList }} -->
              {{ dataTypeList[scope.row.type - 1] }}
            </template>
          </el-table-column>
          <el-table-column align="center" :label="$t('common.createTime')" width="150">
            <template slot-scope="scope">
              {{ scope.row.createTime | parseTime }}
            </template>
          </el-table-column>
          <el-table-column :label="$t('common.operate')" align="center" width="250">
            <template slot-scope="scope">
              <el-button type="text" @click="handleForm(scope.row)" v-if="permissions.admin_lsydatacenter_edit">{{$t('common.edit')}}</el-button>
              <el-button type="text" style="color: red;" @click="handleDel(scope.row.id)" v-if="permissions.admin_lsydatacenter_del">{{$t('common.delete')}}</el-button>
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

      <DataCenterForm ref="dataCenterForm" @back="getData" />
    </basic-container>
  </div>
</template>
<script>
import { qryDataCenter, delDataCenter } from "@/api/dataCenter";
import DataCenterForm from "./components/dataCenterForm.vue";
import { qryDictItemData } from '@/api/admin/dict'
import { mapGetters } from "vuex"
export default {
  components: { DataCenterForm },
  data() {
    return {
      // 列表信息
      listLoading: false,
      dataList: [],
      dataTypeList: [this.$t('dataCenter.newsCenter'), this.$t('dataCenter.installationInstructions'), this.$t('dataCenter.installationVideo'), this.$t('dataCenter.userManual'), this.$t('dataCenter.troubleShooting'), 'Q&A'],
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
      qryDataCenter(this.listQuery).then(res => {
        this.dataList = res.records
        this.total = res.total
      }).finally(() => {
        this.listLoading = false
      })
    },
    // 新增
    handleForm(info) {
      this.$nextTick(() => {
        this.$refs.dataCenterForm.init(info)
      });
    },
    // 删除
    handleDel(id) {
      this.$confirm(this.$t('common.sureDelete'), this.$t('common.prompt'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: "warning",
      }).then(() => {
        delDataCenter({ id }).then(() => {
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

