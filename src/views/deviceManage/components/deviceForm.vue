<template>
  <el-dialog
    :title="$t('common.edit')"
    :close-on-click-modal="false"
    :visible.sync="visible"
    :destroy-on-close="true"
    width="600px"
  >
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      label-width="180px"
    >
      <el-form-item :label="$t('deviceManage.deviceName')" prop="name">
        <el-input
          v-model="dataForm.name"
          :placeholder="$t('common.inputPrompt')"
        />
      </el-form-item>
      <el-form-item :label="$t('deviceManage.snCode')" prop="sn">
        <el-input
          v-model="dataForm.sn"
          :placeholder="$t('common.inputPrompt')"
        />
      </el-form-item>
      <!-- <el-form-item label="设备类型" prop="type">
        <el-radio-group v-model="dataForm.type">
          <el-radio :label="0">NB</el-radio>
          <el-radio :label="1" disabled>涂鸦</el-radio>
        </el-radio-group>
      </el-form-item> -->
      <el-form-item
        :label="$t('deviceManage.energyFlowSwitch')"
        prop="energyFlowSwitch"
      >
        <el-radio-group v-model="dataForm.energyFlowSwitch">
          <el-radio :label="0">{{ $t("menuManage.close") }}</el-radio>
          <el-radio :label="1">{{ $t("menuManage.open") }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="$t('deviceManage.timeZone')" prop="timeZone">
        <el-select
          v-model="dataForm.timeZone"
          filterable
          :placeholder="$t('common.selectPrompt')"
          style="width: 100%"
        >
          <el-option :label="$t('deviceManage.zeroZone')" :value="0" />
          <el-option :label="$t('deviceManage.eastFirstDistrict')" :value="1" />
          <el-option
            :label="$t('deviceManage.eastSecondDistrict')"
            :value="2"
          />
          <el-option :label="$t('deviceManage.eastThirdDistrict')" :value="3" />
          <el-option
            :label="$t('deviceManage.eastFourthDistrict')"
            :value="4"
          />
          <el-option :label="$t('deviceManage.eastFifthDistrict')" :value="5" />
          <el-option :label="$t('deviceManage.eastSixthDistrict')" :value="6" />
          <el-option
            :label="$t('deviceManage.eastSeventhDistrict')"
            :value="7"
          />
          <el-option
            :label="$t('deviceManage.eastEighthDistrict')"
            :value="8"
          />
          <el-option :label="$t('deviceManage.eastNinthDistrict')" :value="9" />
          <el-option
            :label="$t('deviceManage.eastTenthDistrict')"
            :value="10"
          />
          <el-option
            :label="$t('deviceManage.eastEleventhDistrict')"
            :value="11"
          />
          <el-option
            :label="$t('deviceManage.eastTwelfthDistrict')"
            :value="12"
          />
          <el-option
            :label="$t('deviceManage.westFirstDistrict')"
            :value="-1"
          />
          <el-option
            :label="$t('deviceManage.westSecondDistrict')"
            :value="-2"
          />
          <el-option
            :label="$t('deviceManage.westThirdDistrict')"
            :value="-3"
          />
          <el-option
            :label="$t('deviceManage.westFourthDistrict')"
            :value="-4"
          />
          <el-option
            :label="$t('deviceManage.westFifthDistrict')"
            :value="-5"
          />
          <el-option
            :label="$t('deviceManage.westSixthDistrict')"
            :value="-6"
          />
          <el-option
            :label="$t('deviceManage.westSeventhDistrict')"
            :value="-7"
          />
          <el-option
            :label="$t('deviceManage.westEighthDistrict')"
            :value="-8"
          />
          <el-option
            :label="$t('deviceManage.westNinthDistrict')"
            :value="-9"
          />
          <el-option
            :label="$t('deviceManage.westTenthDistrict')"
            :value="-10"
          />
          <el-option
            :label="$t('deviceManage.westEleventhDistrict')"
            :value="-11"
          />
        </el-select>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button class="import-btn" type="primary" @click="handleImportExcel">{{
        $t("deviceManage.batchImport")
      }}</el-button>
      <input
        type="file"
        ref="fileInput"
        style="display: none"
        @change="handleFileChange"
      />

      <el-button @click="visible = false">{{ $t("common.cancel") }}</el-button>
      <el-button
        :loading="loadingState"
        type="primary"
        @click="handleSubmit()"
        >{{ $t("common.confirm") }}</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import { addDevice, editDevice, importExcel } from "@/api/device";
import { qryModel } from "@/api/model";
import { qryDeviceType } from "@/api/deviceType";
export default {
  data() {
    return {
      visible: false,
      loadingState: false,
      dataForm: {},
      dataRule: {
        sn: [
          {
            required: true,
            message: this.$t("deviceManage.validateS"),
            trigger: "blur",
          },
        ],
        name: [
          {
            required: true,
            message: this.$t("deviceManage.validateD"),
            trigger: "blur",
          },
        ],
        energyFlowSwitch: [{ required: true, message: "", trigger: "blur" }],
        timeZone: [{ required: true, message: "", trigger: "blur" }],
      },
      modelList: [],
      typeList: [],
    };
  },
  created() {
    // qryModel({ status: 0, size: 100 }).then(res => {
    //   this.modelList = res.records
    // })
    // qryDeviceType({ size: 9999 }).then(res => {
    //   this.typeList = res.records
    // })
  },
  methods: {
    init(ilk, info) {
      this.dataForm = {
        ilk: ilk,
        name: null,
        timeZone: null,
        sn: null,
        type: 0,
        energyFlowSwitch: 1,
      };
      if (info) {
        for (const key in this.dataForm) {
          this.dataForm[key] = info[key];
        }
        this.dataForm.id = info.id;
      }
      this.visible = true;
      this.$nextTick(() => {
        this.$refs.dataForm.clearValidate();
      });
    },
    handleImportExcel() {
      //执行批量导入逻辑
      this.$refs.fileInput.click();
    },
    handleFileChange(event) {
      //处理文件选择逻辑
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("file", file);

      //向后端接口发送文件
      importExcel(formData) // 这里传递formData作为参数
        .then((response) => {
          this.$message.success(this.$t("deviceManage.batchImportSuccess"));
        })
        .catch((error) => {
          this.$message.error(this.$t("deviceManage.batchImportFailed"));
        });
    },

    handleSubmit() {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          this.loadingState = true;
          if (this.dataForm.id) {
            editDevice(this.dataForm)
              .then((res) => {
                this.$message.success(this.$t("common.successfulModification"));
                this.visible = false;
                this.$emit("back");
              })
              .finally(() => {
                this.loadingState = false;
              });
          } else {
            addDevice(this.dataForm)
              .then((res) => {
                this.$message.success(this.$t("common.addedSuccessfully"));
                this.visible = false;
                this.$emit("back");
              })
              .finally(() => {
                this.loadingState = false;
              });
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.btn {
  display: flex;
  justify-content: center;
}
.import-btn {
  margin-right: 10px;
}
</style>
