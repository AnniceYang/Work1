

<template>
  <div class="execution">
    <basic-container>
      <avue-crud
        ref="crud"
        :page.sync="page"
        :data="tableData"
        :table-loading="tableLoading"
        :option="tableOption"
        :permission="permissionList"
        @on-load="getList"
        @search-change="searchChange"
        @refresh-change="refreshChange"
        @size-change="sizeChange"
        @current-change="currentChange"
        @row-del="handleDel"
      >
        <template slot="id" slot-scope="scope">
          <span>{{ scope.row.user_info.id }}</span>
        </template>
        <template slot="username" slot-scope="scope">
          <span>{{ scope.row.user_info.username }}</span>
        </template>
      </avue-crud>
    </basic-container>
  </div>
</template>

<script>
import { delObj, fetchList } from "@/api/admin/token";
import { tableOption } from "@/const/crud/admin/token";
import { mapGetters } from "vuex";

export default {
  name: "Token",
  data() {
    return {
      tableData: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20, // 每页显示多少条
      },
      tableLoading: false,
      tableOption: tableOption,
    };
  },
  created() {},
  mounted: function () {},
  computed: {
    ...mapGetters(["permissions"]),
    permissionList() {
      return {
        delBtn: this.vaildData(this.permissions.sys_token_del, false),
      };
    },
  },
  methods: {
    getList(page, params) {
      this.tableLoading = true;
      fetchList(
        Object.assign(
          {
            current: page.currentPage,
            size: page.pageSize,
          },
          params
        )
      ).then((response) => {
        this.tableData = response.records;
        this.page.total = response.total;
        this.tableLoading = false;
      });
    },
    handleDel: function (row, index) {
      var _this = this;
      this.$confirm("是否强制" + row.user_info.username + "下线?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return delObj(row.access_token);
        })
        .then(() => {
          _this.$message.success("强制下线成功");
        });
    },
    refreshChange() {
      this.getList(this.page);
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize;
    },
    currentChange(current) {
      this.page.currentPage = current;
    },
    searchChange(params, done) {
      this.page.currentPage = 1;
      this.getList(this.page, params);
      done();
    },
  },
};
</script>
