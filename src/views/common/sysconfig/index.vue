<template>
  <div class="mod-config">
    <basic-container>
      <div class="header-search">
        <div class="lside">
          <el-form :inline="true">
            <el-form-item :label="$t('common.name')">
              <el-input v-model="queryDataFrom.name" :placeholder="$t('common.inputPrompt')"></el-input>
            </el-form-item>
            <el-button type="primary" class="btn-search" @click="getDataList(true)">{{$t('common.search')}}</el-button>
            <el-button type="primary" @click="resetSearch()">{{$t('common.reset')}}</el-button>
          </el-form>
        </div>
        <div class="rside">
          <el-button type="primary" plain @click="addOrUpdateHandle()">{{$t('common.add')}}</el-button>
        </div>
      </div>

      <div class="avue-crud">
        <el-table :data="dataList" border v-loading="dataListLoading">
          <el-table-column prop="name" align="center" :label="$t('common.name')" />
          <el-table-column prop="code" align="center" :label="$t('logManage.attributeCode')" />
          <el-table-column prop="value" align="center" :label="$t('logManage.attributeValueC')">
            <template slot-scope="scope">
              <span v-if="String(scope.row.value).length < 10">{{ scope.row.value }}</span>
              <el-popover v-else placement="top" width="400" trigger="hover">
                <div>
                  <span v-html="scope.row.value"></span>
                </div>
                <el-link :underline="false" type="primary" slot="reference">{{$t('common.view')}}</el-link>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="value" align="center" :label="$t('logManage.attributeValueE')">
            <template slot-scope="scope">
              <span v-if="String(scope.row.valueEn).length < 10">{{ scope.row.valueEn }}</span>
              <el-popover v-else placement="top" width="400" trigger="hover">
                <div>
                  <span v-html="scope.row.valueEn"></span>
                </div>
                <el-link :underline="false" type="primary" slot="reference">{{$t('common.view')}}</el-link>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" align="center" :formatter="formatter" :label="$t('common.createTime')">
          </el-table-column>
          <el-table-column align="center" :label="$t('common.operate')">
            <template slot-scope="scope">
              <el-button v-if="permissions.admin_sysconfig_edit" type="text" size="small" icon="el-icon-edit" @click="addOrUpdateHandle(scope.row)">{{$t('common.edit')}}</el-button>
              <el-button v-if="permissions.admin_sysconfig_del" type="text" size="small" icon="el-icon-delete" @click="deleteHandle(scope.row.id)">{{$t('common.delete')}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

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
      <!-- 弹窗, 新增 / 修改 -->
      <table-form
        v-if="addOrUpdateVisible"
        ref="addOrUpdate"
        @refreshDataList="getDataList"
      ></table-form>
    </basic-container>
  </div>
</template>

<script>
import { fetchList, delObj } from "@/api/common/sysconfig";
import TableForm from "./sysconfig-form";
import { mapGetters } from "vuex";
import { formatter } from "@/util/date";
export default {
  data() {
    return {
      dataForm: {
        key: "",
      },
      queryDataFrom: {
        name: null,
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      addOrUpdateVisible: false,
      infoVisible: false,
    };
  },
  components: {
    TableForm,
  },
  created() {
    this.getDataList();
  },
  computed: {
    ...mapGetters(["permissions"]),
  },
  methods: {
    formatter,
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
      let queryDataFrom = {};
      if (this.queryDataFrom) {
        for (let key in this.queryDataFrom) {
          if (this.queryDataFrom[key] || this.queryDataFrom[key] === 0) {
            queryDataFrom[key] = this.queryDataFrom[key];
          }
        }
      }
      fetchList(
        Object.assign(
          {
            current: this.pageIndex,
            size: this.pageSize,
          },
          queryDataFrom
        )
      ).then((response) => {
        this.dataList = response.records;
        this.totalPage = response.total;
      });
      this.dataListLoading = false;
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.getDataList();
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val;
      this.getDataList();
    },
    // 新增 / 修改
    addOrUpdateHandle(info) {
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init({ ...info })
      })
    },
    // 删除
    deleteHandle(id) {
      this.$confirm("确定要删除该数据码？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return delObj(id);
        })
        .then((data) => {
          this.$message.success("删除成功");
          this.getDataList();
        });
    },

    // 重置
    resetSearch() {
      this.queryDataFrom = {};
      this.pageIndex = 1;
      this.getDataList();
    },
  },
};
</script>
