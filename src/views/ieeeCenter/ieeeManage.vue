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
            prop="deviceSn"
            :label="$t('ieee.deviceSn')"
          />
          <el-table-column
            align="center"
            prop="deviceNmi"
            :label="$t('ieee.deviceNmi')"
          />
          <el-table-column
            align="center"
            prop="deviceLFDI"
            :label="$t('ieee.deviceLFDI')"
          />
          <el-table-column
            align="center"
            prop="gridCompany"
            :label="$t('ieee.gridCompany')"
          />

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
              <el-option
                :label="$t('ieee.receivedGridList')"
                value="received"
              />
              <el-option :label="$t('ieee.sendRequestList')" value="sent" />
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

export default {
  data() {
    return {
      loading: false,
      deviceList: [
        {
          deviceSn: "SN123456",
          deviceNmi: "NMI789012",
          deviceLFDI: "LFDI345678",
          gridCompany: "Example Grid",
        },
        {
          deviceSn: "SN654321",
          deviceNmi: "NMI210987",
          deviceLFDI: "LFDI876543",
          gridCompany: "Test Grid",
        },
      ],
      exportDialogVisible: false,
      selectedDeviceSn: "",
      exportOptions: {
        selectedPage: "received",
      },
    };
  },

  methods: {
    fetchDeviceList() {
      this.loading = true;
      qryIeeeDeviceList()
        .then((res) => {
          this.deviceList = res;
        })
        .finally(() => {
          this.loading = false;
        });
    },

    openExportDialog(row) {
      this.selectedDeviceSn = row.deviceSn;
      this.exportDialogVisible = true;
    },

    exportData() {
      const page = this.exportOptions.selectedPage;
      const deviceId = this.selectedDeviceSn;
      console.log(`模拟导出: 设备SN=${deviceId}, 导出类别=${page}`);

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
}

.header-title {
  text-align: center;
  margin-bottom: 15px;
}

.avue-crud {
  padding: 0;
}

.custom-table {
  width: 100%;
  min-width: 800px;
}

.dialog-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}
</style>
