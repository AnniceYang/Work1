<template>
  <el-dialog
    :title="$t('deviceManage.OTAupgrade')"
    :close-on-click-modal="false"
    :visible.sync="visible"
    :destroy-on-close="true"
    width="600px"
  >
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      label-width="200px"
    >
      <el-form-item :label="$t('deviceManage.deviceName')" class="wrap-text">
        <el-input v-model="deviceInfo.name" disabled />
      </el-form-item>
      <el-form-item :label="$t('deviceManage.upgradeType')" class="wrap-text">
        <el-select
          v-model="appType"
          :placeholder="$t('common.selectPrompt')"
          @change="getVersionList"
          style="width: 100%"
        >
          <el-option
            v-for="item in appTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        :label="$t('deviceManage.upgradePackage')"
        prop="id"
        class="wrap-text"
      >
        <el-select
          v-model="dataForm.id"
          :placeholder="$t('common.selectPrompt')"
          style="width: 100%"
        >
          <el-option
            v-for="item in versionList"
            :key="item.id"
            :label="item.versionName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">{{ $t("common.cancel") }}</el-button>
      <el-button type="primary" @click="handleSubmit()">{{
        $t("common.confirm")
      }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { deviceUpgrade } from "@/api/device";
import { getVersioninfo } from "@/api/common/versionUpgrade";
export default {
  data() {
    return {
      visible: false,
      loadingState: false,
      deviceInfo: {},
      dataForm: {},
      appType: null,
      appTypeList: [],
      dataRule: {
        id: [
          {
            required: true,
            message: this.$t("deviceManage.validateP"),
            trigger: "blur",
          },
        ],
      },
      versionList: [],
    };
  },
  methods: {
    init(info) {
      console.log("info", info);
      this.deviceInfo = info;
      this.dataForm = {
        deviceId: info.id,
        id: null,
      };
      if (info.ilk === 1) {
        this.appTypeList = [
          { name: this.$t("deviceManage.IIcb"), id: 6 },
          { name: this.$t("deviceManage.IIdb"), id: 7 },
          { name: this.$t("deviceManage.IIbattery"), id: 8 },
        ];
      } else {
        this.appTypeList = [
          { name: this.$t("deviceManage.networkConnectingBoard"), id: 2 },
          { name: this.$t("deviceManage.inverterMCU"), id: 3 },
          { name: this.$t("deviceManage.inverterDSP"), id: 4 },
          { name: this.$t("deviceManage.battery"), id: 5 },
          { name: this.$t("deviceManage.HighVoltageBatteryBCUModule"), id: 9 },
          { name: this.$t("deviceManage.HighVoltageBatteryBMSModule"), id: 10 },
        ];
      }
      this.appType = null;
      this.versionList = [];
      this.visible = true;
      this.$nextTick(() => {
        this.$refs.dataForm.clearValidate();
      });
    },
    getVersionList() {
      this.dataForm.id = null;
      getVersioninfo({ appType: this.appType, size: 100 }).then((res) => {
        this.versionList = res.records;
      });
    },
    handleSubmit() {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          this.loadingState = true;
          deviceUpgrade(this.dataForm)
            .then((res) => {
              this.$message.success(this.$t("deviceManage.success"));
              this.visible = false;
            })
            .finally(() => {
              this.loadingState = false;
            });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap-text {
  white-space: normal;
}
.btn {
  display: flex;
  justify-content: center;
}
</style>
