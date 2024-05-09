<template>
  <el-dialog
    :title="$t('common.add')"
    :close-on-click-modal="false"
    :visible.sync="visible"
    :destroy-on-close="true"
    width="600px"
  >
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      label-width="145px"
    >
      <el-form-item :label="$t('upgradeInfo.upgradeType')" prop="type">
        <el-select
          v-model="dataForm.type"
          :placeholder="$t('common.selectPrompt')"
          @change="getVersionList"
          style="width: 100%"
        >
          <el-option
            :label="$t('upgradeInfo.networkConnectingBoard')"
            :value="1"
          />
          <el-option :label="$t('upgradeInfo.inverterMCU')" :value="2" />
          <el-option :label="$t('upgradeInfo.inverterDSP')" :value="3" />
          <el-option :label="$t('upgradeInfo.battery')" :value="4" />
          <el-option
            :label="$t('upgradeInfo.HighVoltageBatteryBCUModule')"
            :value="9"
          />
          <el-option
            :label="$t('upgradeInfo.HighVoltageBatteryBMSModule')"
            :value="10"
          />
          <el-option :label="$t('upgradeInfo.Dsp2')" :value="11" />
        </el-select>
      </el-form-item>
      <el-form-item
        :label="$t('upgradeInfo.upgradePackage')"
        prop="versionInfoId"
      >
        <el-select
          v-model="dataForm.versionInfoId"
          :placeholder="$t('common.selectPrompt')"
          filterable
          style="width: 100%"
        >
          <el-option
            v-for="item in versionList"
            :key="item.id"
            :label="`${item.versionName} - ${item.versionCode}`"
            :value="item.id"
          >
            <span style="float: left">{{ item.versionName }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px"
              >{{ $t("upgradeInfo.versionNumber") }}：{{
                item.versionCode
              }}</span
            >
          </el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="版本号" prop="versionCode">
        <el-input v-model="dataForm.versionCode" type="number" placeholder="请输入版本号" />
      </el-form-item> -->
      <el-form-item :label="$t('upgradeInfo.upgradeableVersion')">
        <!-- <el-input v-model="dataForm.versionUpgrade" type="number" placeholder="请输入可升级版本号" /> -->
        <el-tag
          v-for="(name, index) in versionUpgradeList"
          :key="index"
          class="el-tag"
          closable
          @close="versionUpgradeList.splice(index, 1)"
        >
          {{ name }}
        </el-tag>
        <el-input
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          class="input-new-tag"
          type="number"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
        <el-button
          v-else
          class="button-new-tag"
          size="small"
          @click="showInput()"
          >{{ $t("upgradeInfo.addVersionNumber") }}</el-button
        >
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
import { addUpdate } from "@/api/updateStatus";
import { getVersioninfo } from "@/api/common/versionUpgrade";
export default {
  data() {
    return {
      visible: false,
      loadingState: false,
      dataForm: {},
      versionList: [],
      dataRule: {
        type: [
          {
            required: true,
            message: this.$t("upgradeInfo.validateType"),
            trigger: "blur",
          },
        ],
        versionInfoId: [
          {
            required: true,
            message: this.$t("upgradeInfo.validatePackage"),
            trigger: "blur",
          },
        ],

        versionCode: [
          { required: true, message: "请输入版本号", trigger: "blur" },
        ],
        versionUpgrade: [
          { required: true, message: "请输入可升级版本号", trigger: "blur" },
        ],
      },
      versionUpgradeList: [],
      inputVisible: false,
      inputValue: "",
    };
  },
  methods: {
    init(info) {
      this.dataForm = {
        type: null,
        // versionCode: null,
        versionInfoId: null,
        versionUpgrade: null,
      };
      if (info) {
        for (const key in info) {
          this.dataForm[key] = info[key];
        }
        this.dataForm.id = info.id;
      }
      this.versionUpgradeList = [];
      this.versionList = [];
      this.visible = true;
      this.$nextTick(() => {
        this.$refs.dataForm.clearValidate();
      });
    },
    getVersionList() {
      this.dataForm.versionInfoId = null;
      getVersioninfo({ appType: this.dataForm.type + 1, size: 100 }).then(
        (res) => {
          this.versionList = res.records;
        }
      );
    },
    handleSubmit() {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          if (this.versionUpgradeList.length === 0) {
            this.$message.info(this.$t("upgradeInfo.validateNumber"));
            return;
          }
          this.loadingState = true;
          addUpdate({
            ...this.dataForm,
            versionUpgrade: this.versionUpgradeList.join(","),
          })
            .then((res) => {
              this.$message.success(this.$t("common.addedSuccessfully"));
              this.visible = false;
              this.$emit("back");
            })
            .finally(() => {
              this.loadingState = false;
            });
        }
      });
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.versionUpgradeList.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.el-tag {
  margin-right: 10px;
}
.button-new-tag {
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  vertical-align: bottom;
}
</style>
