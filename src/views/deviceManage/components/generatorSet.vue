<template>
  <el-dialog
    :title="$t('deviceManage.generatorSettings')"
    :visible.sync="isVisible"
    width="600px"
    append-to-body
    @close="handleClose"
  >
    <el-form
      :model="form"
      :rules="rules"
      ref="generatorForm"
      label-width="160px"
    >
      <!-- Generator Enable Switch -->
      <el-form-item :label="$t('generator.onOff')" prop="onOff">
        <el-switch
          v-model="form.onOff"
          :active-value="1"
          :inactive-value="0"
          :active-text="$t('generator.on')"
          :inactive-text="$t('generator.off')"
        />
      </el-form-item>

      <!-- Diesel Rated Power -->
      <el-form-item :label="$t('generator.ratedPower')" prop="ratedPower">
        <el-select
          v-model="form.ratedPower"
          :placeholder="$t('common.selectPrompt')"
          clearable
        >
          <el-option
            v-for="power in dieselPowerOptions"
            :key="power"
            :label="power + ' kW'"
            :value="power"
          />
        </el-select>
      </el-form-item>

      <!-- Available Power Percentage -->
      <el-form-item
        :label="$t('generator.availablePowerPercentage')"
        prop="availablePowerPercentage"
      >
        <div class="input-container">
          <el-input-number
            v-model="form.availablePowerPercentage"
            :min="0"
            :max="100"
            :step="1"
            :placeholder="$t('generator.availablePowerPercentage')"
          />
          <span class="percent-symbol">%</span>
        </div>
      </el-form-item>

      <!-- Control Mode -->
      <el-form-item
        :label="$t('generator.controlModelDto')"
        prop="controlModeId"
      >
        <el-select
          v-model="form.controlModelDto.controlModeId"
          :placeholder="$t('common.selectPrompt')"
          clearable
          @change="updateControlModeName"
        >
          <el-option
            v-for="mode in controlModeOptions"
            :key="mode.controlModeId"
            :label="mode.controlModeName"
            :value="mode.controlModeId"
          />
        </el-select>
      </el-form-item>

      <!-- SOC 范围 -->
      <div v-if="form.controlModelDto.controlModeId === '1'" class="soc-range">
        <el-form-item :label="$t('generator.socRange')" prop="socLimit">
          <div class="soc-slot">
            <el-input
              v-model="form.controlModelDto.socLowerLimit"
              :placeholder="$t('generator.lowerLimit')"
              class="soc-input"
            />
            <span class="soc-divider">-</span>
            <el-input
              v-model="form.controlModelDto.socUpperLimit"
              :placeholder="$t('generator.upperLimit')"
              class="soc-input"
            />
          </div>
        </el-form-item>
      </div>

      <!-- 时间范围 -->
      <div v-if="form.controlModelDto.controlModeId === '2'" class="time-range">
        <el-form-item :label="$t('generator.timeRange')" prop="timeSlotDtoList">
          <div
            v-for="(timeSlot, index) in form.controlModelDto.timeSlotDtoList"
            :key="index"
            class="time-slot"
          >
            <el-time-picker
              v-model="timeSlot.start"
              :placeholder="$t('generator.startingTime')"
              class="time-input"
              format="HH:mm"
              value-format="HH:mm"
            />
            <span class="time-divider">-</span>
            <el-time-picker
              v-model="timeSlot.end"
              :placeholder="$t('generator.endTime')"
              class="time-input"
              format="HH:mm"
              value-format="HH:mm"
            />

            <el-button
              v-if="form.controlModelDto.timeSlotDtoList.length > 1"
              @click="removeTimeSlot(index)"
              type="danger"
              icon="el-icon-delete"
              class="remove-btn"
            ></el-button>
            <el-button
              v-if="form.controlModelDto.timeSlotDtoList.length === index + 1"
              @click="addTimeSlot"
              type="primary"
              icon="el-icon-plus"
            ></el-button>
          </div>
        </el-form-item>
      </div>

      <!-- Output Mode -->
      <el-form-item :label="$t('generator.outputModelDto')" prop="outputModeId">
        <el-select
          v-model="form.outputModelDto.outputModeId"
          :placeholder="$t('common.selectPrompt')"
          clearable
          @change="updateOutputModeName"
        >
          <el-option
            v-for="output in outputModeOptions"
            :key="output.outputModeId"
            :label="output.outputModeName"
            :value="output.outputModeId"
          />
        </el-select>
      </el-form-item>

      <!-- Battery Charging Power -->
      <div
        v-if="form.outputModelDto.outputModeId === '1'"
        class="battery-power"
      >
        <el-form-item
          :label="$t('generator.batteryChargingPower')"
          prop="batteryChargingPower"
        >
          <el-input-number
            v-model="form.batteryChargingPower"
            :min="0"
            :placeholder="$t('common.inputPrompt')"
          />
          <span class="percent-symbol">kW</span>
        </el-form-item>
      </div>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="deleteGenerator">{{ $t("common.delete") }}</el-button>
      <el-button @click="handleClose">{{ $t("common.cancel") }}</el-button>
      <el-button type="primary" @click="saveSettings">{{
        $t("common.save")
      }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {
  qryGenerator,
  listGeneratorControlMode,
  listGeneratorOutputMode,
  generatorSet,
  delGenerator,
  qryDeviceBind,
} from "@/api/device";

export default {
  data() {
    return {
      isVisible: false,
      form: {
        deviceId: null,
        onOff: 0,
        ratedPower: null,
        availablePowerPercentage: null,
        controlModelDto: {
          controlModeId: null,
          controlModeName: null,
          socUpperLimit: "",
          socLowerLimit: "",
          timeSlotDtoList: [
            {
              start: "00:00",
              end: "00:00",
              sort: 1,
            },
          ],
        },
        outputModelDto: {
          outputModeId: null,
          outputModeName: null,
        },
        batteryChargingPower: null,
      },
      dieselPowerOptions: [10, 20, 30, 40, 50],
      controlModeOptions: [],
      outputModeOptions: [],
      rules: {
        ratedPower: [
          {
            required: true,
            message: this.$t("generator.ratedPowerWarning"),
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    fetchDropdownOptions() {
      Promise.all([listGeneratorControlMode(), listGeneratorOutputMode()])
        .then(([controlModes, outputModes]) => {
          this.controlModeOptions = controlModes || [];
          this.outputModeOptions = outputModes || [];
        })
        .catch((error) => {
          console.error("加载下拉选项失败：", error);
        });
    },

    updateControlModeName() {
      const selectedMode = this.controlModeOptions.find(
        (option) =>
          option.controlModeId === this.form.controlModelDto.controlModeId
      );
      if (selectedMode) {
        this.form.controlModelDto.controlModeName =
          selectedMode.controlModeName;
      }
    },

    updateOutputModeName() {
      const selectedMode = this.outputModeOptions.find(
        (option) =>
          option.outputModeId === this.form.outputModelDto.outputModeId
      );
      if (selectedMode) {
        this.form.outputModelDto.outputModeName = selectedMode.outputModeName;
      }
    },

    // Convert time to minutes (HH:mm -> minutes)
    convertToMinutes(time) {
      const [hours, minutes] = time.split(":");
      return parseInt(hours) * 60 + parseInt(minutes);
    },

    // Convert minutes to HH:mm
    convertToTimeFormat(minutes) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${hours.toString().padStart(2, "0")}:${mins
        .toString()
        .padStart(2, "0")}`;
    },

    addTimeSlot() {
      this.form.controlModelDto.timeSlotDtoList.push({
        start: "00:00",
        end: "00:00",
        sort: this.form.controlModelDto.timeSlotDtoList.length + 1,
      });
    },

    removeTimeSlot(index) {
      this.form.controlModelDto.timeSlotDtoList.splice(index, 1);
    },

    saveSettings() {
      const timeSlotList = this.form.controlModelDto.timeSlotDtoList.map(
        (timeSlot) => {
          if (
            this.convertToMinutes(timeSlot.end) <=
            this.convertToMinutes(timeSlot.start)
          ) {
            this.$message.error(this.$t("generator.timeWarning"));
            throw new Error(this.$t("generator.timeWarning"));
          }
          return {
            start: this.convertToMinutes(timeSlot.start),
            end: this.convertToMinutes(timeSlot.end),
          };
        }
      );

      const data = {
        ...this.form,
        controlModelDto: {
          ...this.form.controlModelDto,
          timeSlotDtoList: timeSlotList,
        },
      };

      generatorSet(data)
        .then(() => {
          this.$message.success(this.$t("common.savesuccessfully"));
          this.handleClose();
        })
        .catch((error) => {
          console.error("保存失败：", error);
          this.$message.error(this.$t("common.savefailed"));
        });
    },

    deleteGenerator() {
      delGenerator({ deviceId: this.form.deviceId })
        .then(() => {
          this.$message.success(this.$t("common.successfullyDeleted"));

          this.resetForm();

          // Close and reset the form
          this.handleClose();

          // No need to re-fetch data immediately after deletion since form will be empty
        })
        .catch((error) => {
          this.$message.error("删除失败，请重试！");
          console.error(error);
        });
    },

    handleClose() {
      this.isVisible = false;
    },

    // 初始化方法：加载发电机设置详情和下拉选项
    init(deviceId) {
      this.form.deviceId = deviceId;
      this.isVisible = true;

      if (!deviceId) {
        this.resetForm();
        return;
      } else {
        // Otherwise, fetch the device details
        qryGenerator({ deviceId })
          .then((response) => {
            if (response) {
              this.form = {
                ...this.form,
                ...response,
                controlModelDto: {
                  ...this.form.controlModelDto,
                  ...response.controlModelDto,
                  timeSlotDtoList: response.controlModelDto.timeSlotDtoList.map(
                    (timeSlot) => ({
                      start: this.convertToTimeFormat(timeSlot.start),
                      end: this.convertToTimeFormat(timeSlot.end),
                      sort: timeSlot.sort || 1,
                    })
                  ),
                },
                outputModelDto: {
                  ...this.form.outputModelDto,
                  ...response.outputModelDto,
                },
              };

              this.updateControlModeName();
              this.updateOutputModeName();
            }
          })
          .catch((error) => {
            console.error("获取发电机详情失败：", error);
          });
      }
      this.fetchDropdownOptions(); // Always fetch dropdown options on init
    },

    resetForm() {
      this.form = {
        deviceId: null,
        onOff: 0,
        ratedPower: null,
        availablePowerPercentage: null,
        controlModelDto: {
          controlModeId: null,
          controlModeName: null,
          socUpperLimit: "",
          socLowerLimit: "",
          timeSlotDtoList: [
            {
              start: "",
              end: "",
              sort: 1,
            },
          ],
        },
        outputModelDto: {
          outputModeId: null,
          outputModeName: null,
        },
        batteryChargingPower: null,
      };
    },
  },

  mounted() {
    this.fetchDropdownOptions();
  },
};
</script>

<style scoped>
.dialog-footer {
  text-align: right;
}

.input-container {
  display: flex;
  align-items: center;
}

.percent-symbol {
  margin-left: 8px;
  font-size: 14px;
}

/* 通用范围输入框样式 */
.soc-slot,
.time-slot {
  display: flex;
  align-items: center;
  margin-bottom: 10px; /* 每组之间的间距 */
  gap: 10px; /* 输入框和分隔符之间的间距 */
}

.soc-input,
.time-input {
  flex: 1;
}

.soc-divider,
.time-divider {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin: 0 10px;
}

/* 整体 SOC 范围布局 */
.soc-range {
  margin-top: 20px;
}

.soc-range .el-form-item__label {
  font-size: 14px;
  font-weight: bold;
}
</style>
