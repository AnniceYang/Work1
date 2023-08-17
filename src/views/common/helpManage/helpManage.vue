<template>
  <div class="app-container calendar-list-container">
    <basic-container>
      <div class="header-search">
        <div class="lside">
          <el-form :inline="true">
            <el-form-item label="问题">
              <el-input
                v-model="listQuery.problem"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                icon="el-icon-search"
                @click="getData(true)"
                >搜索</el-button
              >
              <el-button type="primary" @click="handleReset()">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="rside">
          <el-button icon="el-icon-plus" type="primary" @click="handleForm()"
            >新增</el-button
          >
        </div>
      </div>

      <div class="avue-crud">
        <el-table :data="dataList" border fit v-loading="listLoading">
          <el-table-column prop="problem" align="center" label="问题" />
          <el-table-column prop="answer" align="center" label="回答" />
          <el-table-column align="center" label="创建时间" width="170">
            <template slot-scope="scope">
              {{ scope.row.createTime | parseTime }}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="200">
            <template slot-scope="scope">
              <el-button type="text" @click="handleForm(scope.row)">编辑</el-button>
              <el-button
                type="text"
                style="color: red"
                @click="handleDel(scope.row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="avue-crud__pagination">
        <el-pagination
          @size-change="sizeChangeHandle"
          @current-change="currentChangeHandle"
          :current-page="listQuery.current"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="listQuery.size"
          :total="total"
          background
          layout="total, sizes, prev, pager, next, jumper"
        >
        </el-pagination>
      </div>
    </basic-container>

    <HelpForm ref="helpForm" @back="getData" />
  </div>
</template>
<script>
import { qryHelp, delHelp } from "@/api/help";
import HelpForm from "./components/helpForm.vue";
export default {
  name: "UserEvaluate",
  components: { HelpForm },
  data() {
    return {
      // 列表信息
      listLoading: false,
      dataList: [],
      total: 0,
      listQuery: {
        current: 1,
        size: 10,
      },
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData(state) {
      this.listLoading = true;
      state && (this.listQuery.current = 1);
      qryHelp(this.listQuery)
        .then((res) => {
          this.dataList = res.records;
          this.total = res.total;
        })
        .finally(() => {
          this.listLoading = false;
        });
    },
    // 新增
    handleForm(info) {
      this.$refs.helpForm.init(info);
    },
    // 删除
    handleDel(id) {
      this.$confirm("确定要删除此条数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        delHelp(id).then(() => {
          this.getData();
          this.$message.success("删除成功");
        });
      });
    },
    // 每页数
    sizeChangeHandle(val) {
      this.listQuery.size = val;
      this.getData(true);
    },
    // 当前页
    currentChangeHandle(val) {
      this.listQuery.current = val;
      this.getData();
    },
    // 重置
    handleReset() {
      this.listQuery = {
        current: 1,
        size: 10,
      };
      this.getData(true);
    },
  },
};
</script>

<style lang='scss' scoped>
</style>
