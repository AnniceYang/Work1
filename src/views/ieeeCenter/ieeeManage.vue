<template>
  <div class="app-container ieee-device-container">
    <basic-container>
      <div class="header-title">
        <h2>{{ $t("ieee.ieeeTitle") }}</h2>
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
      qryIeeeDeviceList()
        .then((res) => {
          console.log("res.records------ieee导出是", res.records);
          this.deviceList = res.records;
        })
        .finally(() => {
          this.loading = false;
        });
    },

    formatDate(timestamp) {
      return timestamp ? moment(timestamp).format("YYYY-MM-DD") : "-";
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

.avue-crud {
  padding: 0;
}

.custom-table {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
}

.export-button {
  color: #409eff;
  font-size: 14px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;

  .el-button {
    margin-left: 10px;
  }
}
</style>
