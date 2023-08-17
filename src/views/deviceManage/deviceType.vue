<template>
  <div class="app-container calendar-list-container">
    <basic-container>
      <div class="header-search">
        <div class="lside">
          <el-form :inline="true">
            <el-form-item label="型号名称">
              <el-input v-model="listQuery.name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getData(true)">搜索</el-button>
              <el-button type="primary" @click="handleReset()">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="rside">
          <el-button type="primary" plain @click="handleForm()" v-if="permissions.admin_lsydevicemodel_add">添加</el-button>
        </div>
      </div>

      <div class="avue-crud">
        <el-table :data="dataList" fit v-loading="listLoading">
          <el-table-column align="center" prop="name" label="型号名称" />
          <el-table-column align="center" prop="energyStorage" label="总储能" />
          <el-table-column align="center" prop="pvPower" label="PV功率(W)" />
          <el-table-column align="center" label="创建时间" width="150">
            <template slot-scope="scope">
              {{ scope.row.createTime | parseTime }}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="250">
            <template slot-scope="scope">
              <el-button type="text" @click="handleForm(scope.row)" v-if="permissions.admin_lsydevicemodel_edit">编辑</el-button>
              <el-button type="text" style="color: red;" @click="handleDel(scope.row.id)" v-if="permissions.admin_lsydevicemodel_del">删除</el-button>
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

      <DeviceTypeForm ref="deviceTypeForm" @back="getData" />
    </basic-container>
  </div>
</template>
<script>
import { qryDeviceType, delDeviceType } from "@/api/deviceType";
import DeviceTypeForm from "./components/deviceTypeForm.vue";
import { mapGetters } from "vuex"
export default {
  components: { DeviceTypeForm },
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
      qryDeviceType(this.listQuery).then(res => {
        this.dataList = res.records
        this.total = res.total
      }).finally(() => {
        this.listLoading = false
      })
    },
    // 新增
    handleForm(info) {
      this.$nextTick(() => {
        this.$refs.deviceTypeForm.init(info)
      });
    },
    // 删除
    handleDel(id) {
      this.$confirm("确定要删除此条数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        delDeviceType({ id }).then(() => {
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

