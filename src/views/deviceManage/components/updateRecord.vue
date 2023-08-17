<template>
  <el-dialog
    :title='`${info.name}-升级记录`'
    :visible.sync="visible"
    width="900px"
  >
    <div class="avue-crud">
      <el-table :data="dataList" fit v-loading="listLoading">
        <el-table-column align="center" prop="versionCode" label="	版本号" />
        <el-table-column align="center" label="升级状态">
          <template slot-scope="scope">
            {{ scope.row.status | updateStatusFilter }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="升级类型">
          <template slot-scope="scope">
            {{ scope.row.type | updateType }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="更新时间" width="150">
          <template slot-scope="scope">
            {{ scope.row.updateTime | parseTime }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="创建时间" width="150">
          <template slot-scope="scope">
            {{ scope.row.createTime | parseTime }}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="table-pagination">
      <el-pagination
        @size-change="sizeChangeHandle"
        @current-change="currentChangeHandle"
        :current-page="listQuery.current"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="listQuery.size"
        :total="total"
        background
        layout="total, sizes, prev, pager, next, jumper"
      />
    </div>
  </el-dialog>
</template>

<script>
import { deviceUpdateRecord } from "@/api/device";
export default {
  data() {
    return {
      visible: false,
      listLoading: false,
      dataList: [],
      info: {},
      total: 0,
      listQuery: {
        current: 1,
        size: 5
      }
    };
  },
  methods: {
    init(info) {
      this.info = { ...info }
      this.visible = true
      this.listQuery = {
        current: 1,
        size: 5,
        deviceId: info.id
      }
      this.dataList = []
      this.getData()
    },
    getData() {
      this.listLoading = true
      deviceUpdateRecord(this.listQuery).then(res => {
        this.dataList = res.records
        this.total = res.total
      }).finally(() => {
        this.listLoading = false
      })
    },
    // 每页数
    sizeChangeHandle(val) {
      this.listQuery.size = val
      this.listQuery.current = 1
      this.getData()
    },
    // 当前页
    currentChangeHandle(val) {
      this.listQuery.current = val
      this.getData()
    },
  },
};
</script>

<style lang="scss" scoped>
</style>