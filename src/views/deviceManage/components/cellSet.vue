<template>
  <el-dialog
    :title="$t('deviceManage.deviceBatterySettings')"
    :close-on-click-modal="false"
    :visible.sync="visible"
    width="800px"
  >
    <el-row :gutter="20">
      <el-form
        :model="dataForm"
        :rules="dataRule"
        ref="dataForm"
        label-width="200px"
      >
        <el-col :span="12">
          <el-form-item
            :label="$t('deviceManage.chargingSwitch')"
            prop="chargeSwitch"
          >
            <el-radio-group v-model="dataForm.chargeSwitch">
              <el-radio :label="1">{{ $t("common.enable") }}</el-radio>
              <el-radio :label="0">{{ $t("common.disable") }}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            :label="$t('deviceManage.socOfChargeUp')"
            prop="chargeCutOff"
          >
            <el-input
              v-model="dataForm.chargeCutOff"
              :placeholder="$t('common.inputPrompt')"
            >
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item :label="$t('deviceManage.timePeriodOfCharging')">
            <div
              v-for="(item, index) in dataForm.chargeTimeQuantum"
              :key="index"
              style="margin-bottom: 10px"
            >
              <el-time-picker
                style="width: 200px"
                format="HH:mm"
                value-format="HH:mm"
                :placeholder="$t('common.startingTime')"
                v-model="item.start"
                :disabled="dataForm.chargeSwitch === 0"
              />
              <el-time-picker
                style="width: 200px; margin-left: 10px"
                format="HH:mm"
                value-format="HH:mm"
                :placeholder="$t('common.endTime')"
                v-model="item.end"
                :disabled="dataForm.chargeSwitch === 0"
              />
              <el-button
                @click="addChargeTime()"
                style="margin-left: 10px"
                type="primary"
                icon="el-icon-plus"
                circle
                v-if="index === 0 && dataForm.chargeSwitch === 1"
              />
              <el-button
                @click="delChargeTime(index)"
                style="margin-left: 10px"
                type="danger"
                icon="el-icon-delete"
                circle
                v-else
              />
            </div>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item
            :label="$t('deviceManage.electricitySellingSwitch')"
            prop="dischargeSwitch"
          >
            <el-radio-group v-model="dataForm.dischargeSwitch">
              <el-radio :label="1">{{ $t("common.enable") }}</el-radio>
              <el-radio :label="0">{{ $t("common.disable") }}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            :label="$t('deviceManage.socOfSellElectricity')"
            prop="dischargeCutOff"
          >
            <el-input
              v-model="dataForm.dischargeCutOff"
              type="Number"
              :placeholder="$t('common.inputPrompt')"
            >
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item
            :label="$t('deviceManage.timePeriodOfElectricitySales')"
          >
            <div
              v-for="(item, index) in dataForm.dischargeTimeQuantum"
              :key="index"
              style="margin-bottom: 10px"
            >
              <el-time-picker
                style="width: 200px"
                format="HH:mm"
                value-format="HH:mm"
                :placeholder="$t('common.startingTime')"
                v-model="item.start"
                :disabled="dataForm.dischargeSwitch === 0"
              />
              <el-time-picker
                style="width: 200px; margin-left: 10px"
                format="HH:mm"
                value-format="HH:mm"
                :placeholder="$t('common.endTime')"
                v-model="item.end"
                :disabled="dataForm.dischargeSwitch === 0"
              />
              <el-button
                @click="addDischargeTime()"
                style="margin-left: 10px"
                type="primary"
                icon="el-icon-plus"
                circle
                v-if="index === 0 && dataForm.dischargeSwitch === 1"
              />
              <el-button
                @click="delDischargeTime(index)"
                style="margin-left: 10px"
                type="danger"
                icon="el-icon-delete"
                circle
                v-else
              />
            </div>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item
            :label="$t('deviceManage.dischargeSwitch')"
            prop="releaseSwitch"
          >
            <el-radio-group v-model="dataForm.releaseSwitch">
              <el-radio :label="1">{{ $t("common.enable") }}</el-radio>
              <el-radio :label="0">{{ $t("common.disable") }}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            :label="$t('deviceManage.socOfDischargingOff')"
            prop="releaseCutOff"
          >
            <el-input
              v-model="dataForm.releaseCutOff"
              type="Number"
              :placeholder="$t('common.inputPrompt')"
            >
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item :label="$t('deviceManage.timePeriodOfDischarging')">
            <el-row
              v-for="(item, index) in dataForm.releaseTimeQuantum"
              :key="index"
              style="margin-bottom: 10px"
            >
              <el-time-picker
                style="width: 200px"
                format="HH:mm"
                value-format="HH:mm"
                :placeholder="$t('common.startingTime')"
                v-model="item.start"
                :disabled="dataForm.releaseSwitch === 0"
              />
              <el-time-picker
                style="width: 200px; margin-left: 10px"
                format="HH:mm"
                value-format="HH:mm"
                :placeholder="$t('common.endTime')"
                v-model="item.end"
                :disabled="dataForm.releaseSwitch === 0"
              />
              <el-button
                @click="addReleaseTime()"
                style="margin-left: 10px"
                type="primary"
                icon="el-icon-plus"
                circle
                v-if="index === 0 && dataForm.releaseSwitch === 1"
              />
              <el-button
                @click="delReleaseTime(index)"
                style="margin-left: 10px"
                type="danger"
                icon="el-icon-delete"
                circle
                v-else
              />
            </el-row>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <span slot="footer">
      <el-button @click="visible = false">{{ $t("common.cancel") }}</el-button>
      <el-button type="warning" @click="handleDefault()">{{
        $t("deviceManage.restoreDefaultSettings")
      }}</el-button>
      <el-button type="primary" @click="handleSubmit()">{{
        $t("common.confirm")
      }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { qryCellInfo, addCellInfo, editCellInfo } from "@/api/device";
import { stat } from "fs";
export default {
  data() {
    return {
      visible: false,
      loadingState: false,
      dataForm: {},
      dataRule: {
        chargeCutOff: [
          {
            required: true,
            message: this.$t("deviceManage.validateCharge"),
            trigger: "blur",
          },
        ],
        dischargeCutOff: [
          {
            required: true,
            message: this.$t("deviceManage.validateDischarge"),
            trigger: "blur",
          },
        ],
      },
      deviceId: "",
    };
  },
  watch: {
    "dataForm.chargeSwitch"(newVal) {
      if (newVal === 1 && this.dataForm.chargeTimeQuantum.length === 0) {
        this.dataForm.chargeTimeQuantum.push({
          start: "00:00",
          end: "00:00",
          sort: 1,
        });
      }
    },
    "dataForm.dischargeSwitch"(newVal) {
      if (newVal === 1 && this.dataForm.dischargeTimeQuantum.length === 0) {
        this.dataForm.dischargeTimeQuantum.push({
          start: "00:00",
          end: "00:00",
          sort: 1,
        });
      }
    },
    "dataForm.releaseSwitch"(newVal) {
      if (newVal === 1 && this.dataForm.releaseTimeQuantum.length === 0) {
        this.dataForm.releaseTimeQuantum.push({
          start: "00:00",
          end: "00:00",
          sort: 1,
        });
      }
    },
  },
  methods: {
    init(info) {
      this.dataForm = {
        chargeCutOff: null,
        dischargeCutOff: null,
        releaseCutOff: null,
        chargeTimeQuantum: [{ start: "00:00", end: "00:00", sort: 1 }],
        dischargeTimeQuantum: [{ start: "00:00", end: "00:00", sort: 1 }],
        releaseTimeQuantum: [{ start: "00:00", end: "00:00", sort: 1 }],
        deviceId: info.id,
        chargeSwitch: 0,
        dischargeSwitch: 0,
        releaseSwitch: 0,
      };
      this.deviceId = info.id;
      this.getInfo();

      this.visible = true;
      this.$nextTick(() => {
        this.$refs.dataForm.clearValidate();
      });
    },
    getInfo() {
      qryCellInfo({ deviceId: this.deviceId }).then((res) => {
        console.log(res);
        if (res && res.id) {
          this.dataForm = {
            chargeCutOff: res.chargeCutOff,
            dischargeCutOff: res.dischargeCutOff,
            releaseCutOff: res.releaseCutOff,
            chargeTimeQuantum: res.chargeTimeQuantum.length
              ? res.chargeTimeQuantum.map((item) => ({
                  ...item,
                  start: this.minToTime(item.start),
                  end: this.minToTime(item.end),
                }))
              : [{ start: "00:00", end: "00:00", sort: 1 }],
            dischargeTimeQuantum: res.dischargeTimeQuantum.length
              ? res.dischargeTimeQuantum.map((item) => ({
                  ...item,
                  start: this.minToTime(item.start),
                  end: this.minToTime(item.end),
                }))
              : [{ start: "00:00", end: "00:00", sort: 1 }],
            releaseTimeQuantum: res.releaseTimeQuantum.length
              ? res.releaseTimeQuantum.map((item) => ({
                  ...item,
                  start: this.minToTime(item.start),
                  end: this.minToTime(item.end),
                }))
              : [{ start: "00:00", end: "00:00", sort: 1 }],
            deviceId: res.deviceId,
            chargeSwitch: res.chargeSwitch,
            dischargeSwitch: res.dischargeSwitch,
            releaseSwitch: res.releaseSwitch,
          };
          this.dataForm.chargeTimeQuantum = res.chargeTimeQuantum.map(
            (item) => {
              item.start = this.minToTime(item.start);
              item.end = this.minToTime(item.end);
              return item;
            }
          );
          this.dataForm.dischargeTimeQuantum = res.dischargeTimeQuantum.map(
            (item) => {
              item.start = this.minToTime(item.start);
              item.end = this.minToTime(item.end);
              return item;
            }
          );
          this.dataForm.releaseTimeQuantum = res.releaseTimeQuantum.map(
            (item) => {
              item.start = this.minToTime(item.start);
              item.end = this.minToTime(item.end);
              return item;
            }
          );
        }
      });
    },
    // 恢复默认
    handleDefault() {
      editCellInfo({ deviceId: this.deviceId }).then((res) => {
        console.log(res);
        this.$message.success(this.$t("common.operationSuccessful"));
        this.getInfo();
      });
    },

    // 校验时间段逻辑
    validateTimeSettings() {
      const errors = [];

      // 校验转换为分钟后的时间段
      const convertToMinutes = (timeQuantum) => {
        return timeQuantum.map((item) => ({
          start: this.timeToMin(item.start),
          end: this.timeToMin(item.end),
        }));
      };

      // 检查是否填写了起始时间和截止时间
      const validateEmptyStartEnd = (timeQuantum, label) => {
        timeQuantum.forEach((item) => {
          if (item.start === undefined || item.end === undefined) {
            errors.push(this.$t("deviceManage.timeEmptyError", { label }));
          }
        });
      };

      // 验证单个功能内部的时间段
      const validateOverlap = (timeQuantum, label) => {
        // 检查每个时间段的起始时间是否大于或等于结束时间
        timeQuantum.forEach((item) => {
          if (item.start >= item.end) {
            errors.push(this.$t("deviceManage.timeStartEndError"));
          }
        });

        // 排序时间段后再进行重叠检测
        const sorted = timeQuantum
          .filter((item) => item.start && item.end)
          .sort((a, b) => a.start - b.start); // 使用数字比较，确保按时间顺序排序
        for (let i = 0; i < sorted.length - 1; i++) {
          if (sorted[i].end > sorted[i + 1].start) {
            errors.push(this.$t("deviceManage.timeOverlapError"));
          }
        }
      };

      // 验证功能间时间段是否重叠
      const validateCrossFeatureOverlap = (time1, time2, label1, label2) => {
        time1.forEach((t1) => {
          time2.forEach((t2) => {
            if (t1.end > t2.start && t1.start < t2.end) {
              errors.push(this.$t("deviceManage.timeOverlapError"));
            }
          });
        });
      };

      // 校验每个功能的时间段是否填写并转换为分钟
      if (this.dataForm.chargeSwitch === 1) {
        const chargeTimeQuantum = convertToMinutes(
          this.dataForm.chargeTimeQuantum
        );
        validateEmptyStartEnd(
          chargeTimeQuantum,
          this.$t("deviceManage.timePeriodOfCharging")
        );
        validateOverlap(
          chargeTimeQuantum,
          this.$t("deviceManage.timePeriodOfCharging")
        );
      }
      if (this.dataForm.dischargeSwitch === 1) {
        const dischargeTimeQuantum = convertToMinutes(
          this.dataForm.dischargeTimeQuantum
        );
        validateEmptyStartEnd(
          dischargeTimeQuantum,
          this.$t("deviceManage.timePeriodOfDischarging")
        );
        validateOverlap(
          dischargeTimeQuantum,
          this.$t("deviceManage.timePeriodOfDischarging")
        );
      }
      if (this.dataForm.releaseSwitch === 1) {
        const releaseTimeQuantum = convertToMinutes(
          this.dataForm.releaseTimeQuantum
        );
        validateEmptyStartEnd(
          releaseTimeQuantum,
          this.$t("deviceManage.timePeriodOfElectricitySales")
        );
        validateOverlap(
          releaseTimeQuantum,
          this.$t("deviceManage.timePeriodOfElectricitySales")
        );
      }

      // 功能之间时间段的交叉验证
      if (
        this.dataForm.chargeSwitch === 1 &&
        this.dataForm.dischargeSwitch === 1
      ) {
        const chargeTimeQuantum = convertToMinutes(
          this.dataForm.chargeTimeQuantum
        );
        const dischargeTimeQuantum = convertToMinutes(
          this.dataForm.dischargeTimeQuantum
        );
        validateCrossFeatureOverlap(
          chargeTimeQuantum,
          dischargeTimeQuantum,
          this.$t("deviceManage.timePeriodOfCharging"),
          this.$t("deviceManage.timePeriodOfElectricitySales")
        );
      }
      if (
        this.dataForm.chargeSwitch === 1 &&
        this.dataForm.releaseSwitch === 1
      ) {
        const chargeTimeQuantum = convertToMinutes(
          this.dataForm.chargeTimeQuantum
        );
        const releaseTimeQuantum = convertToMinutes(
          this.dataForm.releaseTimeQuantum
        );
        validateCrossFeatureOverlap(
          chargeTimeQuantum,
          releaseTimeQuantum,
          this.$t("deviceManage.timePeriodOfCharging"),
          this.$t("deviceManage.timePeriodOfDischarging")
        );
      }
      if (
        this.dataForm.dischargeSwitch === 1 &&
        this.dataForm.releaseSwitch === 1
      ) {
        const dischargeTimeQuantum = convertToMinutes(
          this.dataForm.dischargeTimeQuantum
        );
        const releaseTimeQuantum = convertToMinutes(
          this.dataForm.releaseTimeQuantum
        );
        validateCrossFeatureOverlap(
          dischargeTimeQuantum,
          releaseTimeQuantum,
          this.$t("deviceManage.timePeriodOfElectricitySales"),
          this.$t("deviceManage.timePeriodOfDischarging")
        );
      }

      return errors;
    },

    // 校验时间段重叠
    checkTimeOverlap() {
      const timePeriods = [];

      // 只添加启用的功能时间段
      if (this.dataForm.chargeSwitch === 1) {
        timePeriods.push(
          ...this.dataForm.chargeTimeQuantum.map((item) => ({
            type: "charging",
            start: this.timeToMin(item.start),
            end: this.timeToMin(item.end),
          }))
        );
      }

      if (this.dataForm.dischargeSwitch === 1) {
        timePeriods.push(
          ...this.dataForm.dischargeTimeQuantum.map((item) => ({
            type: "discharging",
            start: this.timeToMin(item.start),
            end: this.timeToMin(item.end),
          }))
        );
      }

      if (this.dataForm.releaseSwitch === 1) {
        timePeriods.push(
          ...this.dataForm.releaseTimeQuantum.map((item) => ({
            type: "selling",
            start: this.timeToMin(item.start),
            end: this.timeToMin(item.end),
          }))
        );
      }

      // 校验重叠
      for (let i = 0; i < timePeriods.length; i++) {
        for (let j = i + 1; j < timePeriods.length; j++) {
          if (
            timePeriods[i].start < timePeriods[j].end &&
            timePeriods[i].end > timePeriods[j].start
          ) {
            this.$message.error(this.$t("deviceManage.timeOverlapError"));
            return false;
          }
        }
      }
      return true; // 没有重叠
    },

    handleSubmit() {
      console.log("this.dataForm", this.dataForm);

      const errors = this.validateTimeSettings();
      if (errors.length > 0) {
        this.$message.error(errors.join("\n"));
        return;
      }

      if (!this.checkTimeOverlap()) {
        return; // 如果校验失败，直接返回
      }

      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          this.loadingState = true;
          let info = JSON.parse(JSON.stringify(this.dataForm));
          info.chargeTimeQuantum = info.chargeTimeQuantum.map((item) => {
            item.start = this.timeToMin(item.start);
            item.end = this.timeToMin(item.end);
            return item;
          });
          info.dischargeTimeQuantum = info.dischargeTimeQuantum.map((item) => {
            item.start = this.timeToMin(item.start);
            item.end = this.timeToMin(item.end);
            return item;
          });
          info.releaseTimeQuantum = info.releaseTimeQuantum.map((item) => {
            item.start = this.timeToMin(item.start);
            item.end = this.timeToMin(item.end);
            return item;
          });
          // if (
          //   info.chargeTimeQuantum[0].start != 0 || info.chargeTimeQuantum[info.chargeTimeQuantum.length - 1].end != 1439 ||
          //   info.dischargeTimeQuantum[0].start != 0 || info.dischargeTimeQuantum[info.dischargeTimeQuantum.length - 1].end != 1439
          // ) {
          //   return this.$message.warning('时间段必须全天范围(00:00~23:59)')
          // }
          addCellInfo(info)
            .then((res) => {
              this.$message.success(this.$t("common.successfulModification"));
              this.visible = false;
              this.$emit("back");
            })
            .finally(() => {
              this.loadingState = false;
            });
        }
      });
    },
    verifyData(addData, state) {
      if (!addData.start || !addData.end) {
        this.$message.warning(this.$t("deviceManage.validateData"));
        return false;
      }
      let allData = [];
      if (state === "chargeTime") {
        allData = [
          ...this.dataForm.dischargeTimeQuantum,
          ...this.dataForm.releaseTimeQuantum,
          ...this.dataForm.chargeTimeQuantum,
        ];
      } else if (state === "dischargeTime") {
        allData = [
          ...this.dataForm.chargeTimeQuantum,
          ...this.dataForm.releaseTimeQuantum,
          ...this.dataForm.dischargeTimeQuantum,
        ];
      } else if (state === "releaseTime") {
        allData = [
          ...this.dataForm.chargeTimeQuantum,
          ...this.dataForm.dischargeTimeQuantum,
          ...this.dataForm.releaseTimeQuantum,
        ];
      }
      allData.pop();
      for (let i = 0; i < allData.length; i++) {
        let item = allData[i];
        let itemStart = this.timeToMin(item.start);
        let itemEnd = this.timeToMin(item.end);
        let addTimeStart = this.timeToMin(addData.start);
        let addTimeEnd = this.timeToMin(addData.end);
        if (
          (addTimeStart >= itemStart && addTimeStart <= itemEnd) ||
          (addTimeEnd >= itemStart && addTimeEnd <= itemEnd)
        ) {
          this.$message.warning(this.$t("deviceManage.validateTimePeriod"));
          return false;
        }
      }
      return true;
    },
    addChargeTime() {
      const lastData =
        this.dataForm.chargeTimeQuantum[
          this.dataForm.chargeTimeQuantum.length - 1
        ];
      const sort = lastData ? lastData.sort + 1 : 1;
      let startTime = "";
      if (lastData && lastData.end) {
        startTime = this.minToTime(this.timeToMin(lastData.end) + 1);
      }
      this.dataForm.chargeTimeQuantum.push({
        start: startTime,
        end: "",
        sort: sort,
      });
    },
    delChargeTime(index) {
      this.dataForm.chargeTimeQuantum.splice(index, 1);
    },
    addDischargeTime() {
      const lastData =
        this.dataForm.dischargeTimeQuantum[
          this.dataForm.dischargeTimeQuantum.length - 1
        ];
      const sort = lastData ? lastData.sort + 1 : 1;
      let startTime = "";
      if (lastData && lastData.end) {
        startTime = this.minToTime(this.timeToMin(lastData.end) + 1);
      }
      this.dataForm.dischargeTimeQuantum.push({
        start: startTime,
        end: "",
        sort: sort,
      });
    },
    delDischargeTime(index) {
      this.dataForm.dischargeTimeQuantum.splice(index, 1);
    },
    addReleaseTime() {
      const lastData =
        this.dataForm.releaseTimeQuantum[
          this.dataForm.releaseTimeQuantum.length - 1
        ];
      const sort = lastData ? lastData.sort + 1 : 1;
      let startTime = "";
      if (lastData && lastData.end) {
        startTime = this.minToTime(this.timeToMin(lastData.end) + 1);
      }
      this.dataForm.releaseTimeQuantum.push({
        start: startTime,
        end: "",
        sort: sort,
      });
    },
    delReleaseTime(index) {
      this.dataForm.releaseTimeQuantum.splice(index, 1);
    },
    // 时间转分钟
    timeToMin(time) {
      if (time) {
        let arr = time.split(":");
        return arr[0] * 60 + arr[1] * 1;
      } else {
        return 0;
      }
    },
    // 分钟转时间
    minToTime(min) {
      return min ? Math.floor(min / 60) + ":" + (min % 60) : "00:00";
    },
  },
};
</script>

<style lang="scss" scoped>
.btn {
  display: flex;
  justify-content: center;
}
</style>
