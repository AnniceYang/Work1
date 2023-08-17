<template>
  <div class="app-container calendar-list-container">
    <basic-container>
      <div class="header-search">
        <div class="lside">
          <el-form :inline="true">
            <el-form-item label="类型名称">
              <el-input v-model="listQuery.typeName" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" class="btn-search" @click="getData(true)">搜索</el-button>
              <el-button type="primary" @click="handleReset()">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="rside">
          <el-button type="primary" plain class="btn-set" @click="handleForm()" v-if="permissions.admin_comfeedbacktype_add">添加</el-button>
        </div>
      </div>

      <div class="avue-crud">
        <el-table :data="dataList" fit v-loading="listLoading">
          <el-table-column align="center" prop="sort" label="排序" width="100" />
          <el-table-column align="center" prop="typeName" label="类型名称" />
          <el-table-column align="center" label="创建时间" width="150">
            <template slot-scope="scope">
              {{ scope.row.createTime | parseTime }}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="250">
            <template slot-scope="scope">
              <el-button type="text" @click="handleForm(scope.row)" v-if="permissions.admin_comfeedbacktype_edit">编辑</el-button>
              <el-button type="text" style="color: red;" @click="handleDel(scope.row.id)" v-if="permissions.admin_comfeedbacktype_del">删除</el-button>
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

      <FeedFbackTypeForm ref="feedbackTypeForm" @back="getData" />
    </basic-container>
  </div>
</template>
<script>
import { qryFeedbackType, delFeedbackType } from '@/api/common/feedback'
import FeedFbackTypeForm from "./components/feedbackTypeForm.vue";
import { mapGetters } from "vuex"
export default {
  components: { FeedFbackTypeForm },
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
      qryFeedbackType(this.listQuery).then(res => {
        this.dataList = res.records
        this.total = res.total
      }).finally(() => {
        this.listLoading = false
      })
    },
    // 新增
    handleForm(info) {
      this.$nextTick(() => {
        this.$refs.feedbackTypeForm.init(info)
      });
    },
    // 删除
    handleDel(id) {
      this.$confirm("确定要删除此条数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        delFeedbackType({ id }).then(() => {
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

