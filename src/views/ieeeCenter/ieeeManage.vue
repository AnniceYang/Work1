<template>
  <div class="app-container ieee-device-container">
    <basic-container>
      <div class="header-title">
        <h2>{{ $t("ieee.ieeeTitle") }}</h2>
      </div>

      <div class="search-bar">
        <el-input
          v-model="sn"
          :placeholder="$t('ieee.deviceSn')"
          style="width: 200px; margin-right: 10px"
          clearable
        />
        <el-button type="primary" @click="searchDeviceList">{{
          $t("common.search")
        }}</el-button>
      </div>

      <div class="avue-crud">
        <el-table
          border
          :data="deviceList"
          fit
          v-loading="loading"
          class="custom-table"
        >
          <el-table-column align="center" :label="$t('ieee.index')" width="50">
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>

          <el-table-column
            align="center"
            prop="sn"
            :label="$t('ieee.deviceSn')"
          />
          <el-table-column
            align="center"
            prop="nmi"
            :label="$t('ieee.deviceNmi')"
          />
          <el-table-column
            align="center"
            prop="lfdi"
            :label="$t('ieee.deviceLFDI')"
          />
          <el-table-column
            align="center"
            prop="powerGrid"
            :label="$t('ieee.gridCompany')"
          />

          <el-table-column
            align="center"
            prop="registered"
            :label="$t('ieee.registerState')"
            ><template slot-scope="scope">{{
              scope.row.registered === 1
                ? $t("ieee.registered")
                : $t("ieee.notRegistered")
            }}</template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="createTime"
            :label="$t('ieee.createTime')"
          >
            <template slot-scope="scope">
              {{ formatDate(scope.row.createTime) }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="updateTime"
            :label="$t('ieee.updateTime')"
          >
            <template slot-scope="scope">
              {{ formatDate(scope.row.updateTime) }}
            </template>
          </el-table-column>

          <el-table-column
            :label="$t('ieee.operation')"
            align="center"
            width="120"
          >
            <template slot-scope="scope">
              <el-button type="text" @click="openExportDialog(scope.row)">{{
                $t("ieee.export")
              }}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <el-dialog
        :title="$t('ieee.export')"
        :visible.sync="exportDialogVisible"
        width="350px"
        center
      >
        <el-form>
          <el-form-item :label="$t('ieee.export')">
            <el-select
              v-model="exportOptions.selectedPage"
              :placeholder="$t('common.selectPrompt')"
              style="width: 100%"
            >
              <el-option :label="$t('ieee.receivedGridList')" value="receive" />
              <el-option :label="$t('ieee.sendRequestList')" value="send" />
            </el-select>
          </el-form-item>

          <div class="dialog-footer">
            <el-button type="primary" @click="exportData">
              {{ $t("ieee.export") }}
            </el-button>
            <el-button @click="exportDialogVisible = false">
              {{ $t("common.cancel") }}
            </el-button>
          </div>
        </el-form>
      </el-dialog>

      <div class="table-pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next"
          :total="pagination.total"
        />
      </div>
    </basic-container>
  </div>
</template>

<script>
import { qryIeeeDeviceList } from "@/api/device";
import moment from "moment";
import { baseUrl } from "@/config/env";

export default {
  data() {
    return {
      loading: false,
      deviceList: [],
      sn: "",
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
      exportDialogVisible: false,
      selectedDeviceSn: "",
      exportOptions: {
        selectedPage: "receive",
      },
    };
  },

  created() {
    this.fetchDeviceList();
  },

  methods: {
    fetchDeviceList() {
      this.loading = true;

      const params = {
        sn: this.sn || null,
        current: this.pagination.currentPage, // 发送当前页码
        size: this.pagination.pageSize, // 发送每页数量
      };
      qryIeeeDeviceList(params)
        .then((res) => {
          console.log("res.records------ieee导出是", res.records);
          this.deviceList = res.records;
          this.pagination.total = res.total;
          this.pagination.currentPage = res.current || 1;
        })
        .finally(() => {
          this.loading = false;
        });
    },

    searchDeviceList() {
      this.pagination.currentPage = 1; // 重置到第一页
      this.fetchDeviceList();
    },

    formatDate(timestamp) {
      return timestamp ? moment(timestamp).format("YYYY-MM-DD") : "-";
    },

    //处理分页大小变化
    handleSizeChange(newSize) {
      this.pagination.pageSize = newSize;
      this.fetchDeviceList(); // 重新请求数据
    },

    /** 处理页码变化 */
    handleCurrentChange(newPage) {
      this.pagination.currentPage = newPage;
      this.fetchDeviceList(); // 重新请求数据
    },

    openExportDialog(row) {
      this.selectedDeviceSn = row.sn;
      this.exportDialogVisible = true;
    },

    exportData() {
      if (!this.selectedDeviceSn) {
        this.$message.error("请选择设备");
        return;
      }

      const page = this.exportOptions.selectedPage;
      const deviceId = this.selectedDeviceSn;
      console.log(`模拟导出: 设备SN=${deviceId}, 导出类别=${page}`);

      let exportUrl = `${baseUrl}/excel/ieee/${page}/${deviceId}`;
      window.open(exportUrl, "_blank");

      this.exportDialogVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  display: flex;
  justify-content: center;
}

.basic-container {
  width: 100%;
  max-width: 1200px;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.header-title {
  text-align: center;
  margin-bottom: 20px;
  h2 {
    font-size: 22px;
    font-weight: 600;
    color: #333;
  }
}

.search-bar {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.custom-table {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
}

.table-pagination {
  display: flex;
  justify-content: center;
  margin-top: 15px;
}
</style>
