<template>
  <el-dialog
    :title="isEditMode ? $t('common.edit') : $t('common.add')"
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

      <!-- 通讯棒类型 -->
      <el-form-item :label="$t('deviceManage.wifiFourRod')" prop="wifiFourRod">
        <el-radio-group v-model="dataForm.wifiFourRod">
          <el-radio :label="1">{{ $t("deviceManage.wifi") }}</el-radio>
          <el-radio :label="4">{{ $t("deviceManage.fourGmodel") }}</el-radio>
        </el-radio-group>
      </el-form-item>

      <!-- 机器型号 -->
      <el-form-item :label="$t('deviceManage.tpType')" prop="tpType">
        <el-radio-group v-model="dataForm.tpType">
          <el-radio :label="1">{{ $t("deviceManage.hm6Version") }}</el-radio>
          <el-radio :label="3">{{
            $t("deviceManage.threephaseVersion")
          }}</el-radio>
        </el-radio-group>
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

      <el-form-item
        :label="$t('deviceManage.batteryConditionSwitch')"
        prop="batteryConditionSwitch"
      >
        <el-radio-group v-model="dataForm.batteryConditionSwitch">
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
            :label="$t('deviceManage.eastNinthandHalfDistrict')"
            :value="9.5"
          />
          <el-option
            :label="$t('deviceManage.eastTenthDistrict')"
            :value="10"
          />
          <el-option
            :label="$t('deviceManage.eastTenthandHalfDistrict')"
            :value="10.5"
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
            :label="$t('deviceManage.eastThirteenthDistrict')"
            :value="13"
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

      <!-- page7调用频率 -->
      <el-form-item
        v-if="isEditMode && !isRoleExcluded && dataForm.tpType === 1"
        :label="$t('deviceManage.page7frequency')"
        prop="page7frequency"
      >
        <el-select
          v-model="dataForm.page7frequency"
          :placeholder="$t('common.selectPrompt')"
          style="width: 100%"
        >
          <el-option :label="$t('deviceManage.none')" :value="0" />
          <el-option v-for="i in 30" :key="i" :label="`${i}s`" :value="i" />
        </el-select>
      </el-form-item>
      <!-- 恢复采样时间 -->
      <el-form-item
        v-if="isEditMode && !isRoleExcluded && dataForm.tpType === 1"
        :label="$t('deviceManage.page7endDay')"
        prop="page7endDay"
      >
        <el-select
          v-model="dataForm.page7endDay"
          :placeholder="$t('common.selectPrompt')"
          style="width: 100%"
        >
          <el-option
            v-for="i in 30"
            :key="i"
            :label="`${i} ${$t('deviceManage.day')}`"
            :value="i"
          />
        </el-select>
      </el-form-item>

      <!-- 显示起始时间和结束时间 -->
      <el-form-item
        v-if="isEditMode && !isRoleExcluded && shouldShowTimeFields"
        :label="$t('deviceManage.page7beginTime')"
        prop="page7beginTime"
      >
        {{ formattedBeginTime }}
      </el-form-item>
      <el-form-item
        v-if="isEditMode && !isRoleExcluded && shouldShowTimeFields"
        :label="$t('deviceManage.page7endTime')"
        prop="page7endTime"
      >
        {{ formattedEndTime }}
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
import { addDevice, editDevice, importExcel, editFeedback } from "@/api/device";
import { qryModel } from "@/api/model";
import { qryDeviceType } from "@/api/deviceType";
export default {
  props: {
    isEditMode: Boolean,
    isRoleExcluded: Boolean,
    dataForm: Object,
  },
  data() {
    return {
      visible: false,
      loadingState: false,
      dataForm: {},
      isEditMode: false,

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

        wifiFourRod: [{ required: true, message: "", trigger: "blur" }],

        tpType: [{ required: true, message: "", trigger: "blur" }],

        energyFlowSwitch: [{ required: true, message: "", trigger: "blur" }],
        batteryConditionSwitch: [
          { required: true, message: "", trigger: "blur" },
        ],
        timeZone: [{ required: true, message: "", trigger: "blur" }],
        page7frequency: [
          {
            required: () =>
              this.isEditMode &&
              !this.isRoleExcluded &&
              this.dataForm.tpType === 1,
            message: "",
            trigger: "blur",
          },
        ],
        page7endDay: [
          {
            required: () =>
              this.isEditMode &&
              !this.isRoleExcluded &&
              this.dataForm.tpType === 1,
            message: "",
            trigger: "blur",
          },
        ],
      },
      modelList: [],
      typeList: [],
    };
  },
  computed: {
    isRoleExcluded() {
      return this.$store.state.user.roles.includes("3");
    },

    shouldShowTimeFields() {
      return (
        this.dataForm.tpType === 1 &&
        this.dataForm.page7beginTime &&
        this.dataForm.page7endTime &&
        this.dataForm.page7beginTime !== "0" &&
        this.dataForm.page7endTime !== "0"
      );
    },
    formattedBeginTime() {
      return this.formatTimestamp(this.dataForm.page7beginTime);
    },
    formattedEndTime() {
      return this.formatTimestamp(this.dataForm.page7endTime);
    },
  },

  methods: {
    // 查询设备回显信息
    fetchDeviceFeedback(info) {
      const query = { id: info.id };
      editFeedback(query)
        .then((res) => {
          console.log("--------返回的编辑响应", res);
          const data = res;

          this.dataForm = { ...this.dataForm, ...data };
          this.visible = true;
        })
        .catch((error) => {
          console.error("获取设备回显信息失败:", error);
        });
    },

    init(ilk, info, isEditMode = false) {
      this.isEditMode = isEditMode;
      this.dataForm = {
        ilk: ilk,
        id: null,
        name: null,
        timeZone: null,
        sn: null,
        type: 0,
        wifiFourRod: 1,
        tpType: 1,
        energyFlowSwitch: 1,
        batteryConditionSwitch: 1,
        page7frequency: 0,
        page7endDay: 1,
        page7beginTime: null,
        page7endTime: null,
      };
      if (this.isEditMode) {
        this.fetchDeviceFeedback(info);
      }

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
    formatTimestamp(timestamp) {
      if (!timestamp) return "--"; // 如果没有传入时间戳，返回默认值 "--"

      const timestampInMilliseconds = Number(timestamp) * 1000; // 转换时间戳为毫秒

      // 检查时间戳是否有效
      if (isNaN(timestampInMilliseconds) || timestampInMilliseconds < 0) {
        return "--"; // 如果是无效的时间戳，返回默认值 "--"
      }

      const date = new Date(timestampInMilliseconds); // 创建日期对象

      // 检查日期对象是否有效
      if (isNaN(date.getTime())) {
        return "--"; // 如果无法解析日期，返回默认值 "--"
      }

      // 提取时间并格式化
      const year = String(date.getFullYear()).slice(-2); // 取年份的后两位
      const month = String(date.getMonth() + 1).padStart(2, "0"); // 月份是0索引，需要加1并填充
      const day = String(date.getDate()).padStart(2, "0"); // 添加单日数字前的零
      const hour = String(date.getHours()).padStart(2, "0"); // 添加小时前的零
      const minute = String(date.getMinutes()).padStart(2, "0"); // 添加分钟前的零
      const second = String(date.getSeconds()).padStart(2, "0"); // 添加秒数前的零

      return `${year}-${month}-${day} ${hour}:${minute}:${second}`; // 格式化返回
    },

    handleSubmit() {
      this.$refs.dataForm.validate((valid) => {
        if (!valid) return; // 如果验证失败，直接返回
        this.loadingState = true; // 启用加载状态
        const payload = { ...this.dataForm };
        const apiCall = payload.id ? editDevice : addDevice;
        const successMessage = payload.id
          ? this.$t("common.successfulModification")
          : this.$t("common.addedSuccessfully");

        apiCall(payload)
          .then(() => {
            this.$message.success(successMessage); // 显示成功消息

            this.visible = false; // 关闭窗口
            this.$emit("refreshData"); // 通知父组件
          })
          .catch((error) => {
            console.error("提交失败：", error);
            this.$message.error(error.message || this.$t("common.savefailed")); // 显示错误提示
          })
          .finally(() => {
            this.loadingState = false; // 重置加载状态
          });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog-footer {
  display: flex;
  justify-content: flex-end; /* 按钮右对齐 */
  gap: 10px; /* 按钮之间的间距 */
  padding: 10px 20px; /* 增加内边距 */
}
.import-btn {
  margin-right: 20px;
}
</style>
