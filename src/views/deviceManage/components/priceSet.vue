<template>
  <el-dialog
    :title="$t('ordinaryUser.title')"
    :close-on-click-modal="false"
    :visible.sync="visible"
    width="800px"
  >
    <el-form
      :model="dataForm"
      ref="dataForm"
      label-width="110px"
      @submit.native.prevent="handleSubmit"
    >
      <!-- 买电时间段 -->
      <el-form-item :label="$t('ordinaryUser.time1')">
        <div
          v-for="(item, index) in dataForm.buyTimeQuantum"
          :key="index"
          style="margin-bottom: 10px"
        >
          <el-time-picker
            style="width: 150px"
            format="HH:mm"
            value-format="HH:mm"
            :placeholder="$t('common.startingTime')"
            v-model="item.start"
          />
          <el-time-picker
            style="width: 150px; margin-left: 10px"
            format="HH:mm"
            value-format="HH:mm"
            :placeholder="$t('common.endTime')"
            v-model="item.end"
          />
          <el-input
            type="number"
            :placeholder="$t('common.inputPrompt')"
            v-model="item.price"
            style="width: 200px; margin-left: 50px"
            step="0.01"
          >
            <template slot="append">/°</template>
          </el-input>
          <el-button
            @click="addChargeTime()"
            style="margin-left: 10px"
            type="primary"
            icon="el-icon-plus"
            circle
            v-if="index === 0"
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

      <!-- 卖电时间段 -->
      <el-form-item :label="$t('ordinaryUser.time2')">
        <div
          v-for="(item, index) in dataForm.sellTimeQuantum"
          :key="index"
          style="margin-bottom: 10px"
        >
          <el-time-picker
            style="width: 150px"
            format="HH:mm"
            value-format="HH:mm"
            :placeholder="$t('common.startingTime')"
            v-model="item.start"
          />
          <el-time-picker
            style="width: 150px; margin-left: 10px"
            format="HH:mm"
            value-format="HH:mm"
            :placeholder="$t('common.endTime')"
            v-model="item.end"
          />
          <el-input
            type="number"
            :placeholder="$t('common.inputPrompt')"
            v-model="item.price"
            style="width: 200px; margin-left: 50px"
            step="0.01"
          >
            <template slot="append">/°</template>
          </el-input>
          <el-button
            @click="addDischargeTime()"
            style="margin-left: 10px"
            type="primary"
            icon="el-icon-plus"
            circle
            v-if="index === 0"
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
    </el-form>

    <span slot="footer">
      <el-button @click="visible = false">{{ $t("common.cancel") }}</el-button>
      <el-button type="primary" @click="handleSubmit()">
        {{ $t("common.confirm") }}
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getDefaultCellInfo, saveAppUserCellInfo } from "@/api/appUser";
export default {
  data() {
    return {
      visible: false,
      loadingState: false,
      dataForm: {},
    };
  },
  methods: {
    // 初始化表单数据
    init(userInfo) {
      if (!userInfo || !userInfo.bindUserId) {
        this.$message.error(this.$t("deviceManage.missingUserBinding"));
        return;
      }
      this.dataForm = {
        userId: userInfo.bindUserId,
        // 初始化时price为空，方便用户输入
        buyTimeQuantum: [{ start: "00:00", end: "", price: "", sort: 1 }],
        sellTimeQuantum: [{ start: "00:00", end: "", price: "", sort: 1 }],
      };

      getDefaultCellInfo({ userId: userInfo.bindUserId }).then((res) => {
        if (res && res.id) {
          this.dataForm.buyTimeQuantum = res.buyTimeQuantum.map((item) => {
            return {
              ...item,
              start: this.minToTime(item.start),
              end: this.minToTime(item.end),
              // 转换为字符串方便输入
              price: item.price ? item.price.toString() : "",
            };
          });
          this.dataForm.sellTimeQuantum = res.sellTimeQuantum.map((item) => {
            return {
              ...item,
              start: this.minToTime(item.start),
              end: this.minToTime(item.end),
              price: item.price ? item.price.toString() : "",
            };
          });
        }
      });
      this.visible = true;
    },

    // 校验整个表单
    validateForm() {
      // 校验单个时间段（检查是否为空、截止时间是否大于起始时间）
      const validateTimePeriods = (timeQuantum, type) => {
        for (let i = 0; i < timeQuantum.length; i++) {
          const { start, end } = timeQuantum[i];
          if (!start || !end) {
            this.$message.error(this.$t("common.timeCannotBeEmpty"));
            return false;
          }
          if (this.timeToMin(start) >= this.timeToMin(end)) {
            this.$message.error(this.$t("common.endTimeError"));
            return false;
          }
        }
        // 检查是否存在时间段重叠（排序后只要后一个的开始小于前一个的结束即视为重叠）
        const intervals = timeQuantum.map((i) => [
          this.timeToMin(i.start),
          this.timeToMin(i.end),
        ]);
        intervals.sort((a, b) => a[0] - b[0]);
        for (let i = 1; i < intervals.length; i++) {
          if (intervals[i][0] <= intervals[i - 1][1]) {
            this.$message.error(this.$t("common.timeOverlapError"));
            return false;
          }
        }
        return true;
      };

      // 检查时间段是否完整覆盖全天 00:00 ~ 23:59（必须连续、无缝衔接）
      const checkFullCoverage = (timeQuantum, type) => {
        const intervals = timeQuantum.map((i) => [
          this.timeToMin(i.start),
          this.timeToMin(i.end),
        ]);
        intervals.sort((a, b) => a[0] - b[0]);
        if (intervals.length === 0 || intervals[0][0] !== 0) {
          this.$message.error(
            this.$t(
              type === "buy"
                ? "common.buyTimeNotFullCoverage"
                : "common.sellTimeNotFullCoverage"
            )
          );
          return false;
        }
        if (intervals[intervals.length - 1][1] !== 1439) {
          this.$message.error(
            this.$t(
              type === "buy"
                ? "common.buyTimeNotFullCoverage"
                : "common.sellTimeNotFullCoverage"
            )
          );
          return false;
        }
        // 判断各段是否衔接（后段开始时间必须等于前段结束时间加1分钟）
        for (let i = 1; i < intervals.length; i++) {
          if (intervals[i][0] !== intervals[i - 1][1] + 1) {
            this.$message.error(
              this.$t(
                type === "buy"
                  ? "common.buyTimeNotFullCoverage"
                  : "common.sellTimeNotFullCoverage"
              )
            );
            return false;
          }
        }
        return true;
      };

      // 校验买电时间段
      if (!validateTimePeriods(this.dataForm.buyTimeQuantum, "buy")) {
        return false;
      }
      if (!checkFullCoverage(this.dataForm.buyTimeQuantum, "buy")) {
        return false;
      }

      // 校验卖电时间段
      if (!validateTimePeriods(this.dataForm.sellTimeQuantum, "sell")) {
        return false;
      }
      if (!checkFullCoverage(this.dataForm.sellTimeQuantum, "sell")) {
        return false;
      }

      // 验证电价是否在合法范围内，并且小数点位数不超过7位
      const validatePrice = (price) => {
        if (isNaN(price) || price <= 0) {
          this.$message.error(this.$t("common.priceMustBeGreaterThanZero"));
          return false;
        }
        if (price > 100) {
          this.$message.error(this.$t("common.priceMustBeLessThan100"));
          return false;
        }
        if (!/^\d+(\.\d{1,7})?$/.test(price)) {
          this.$message.error(this.$t("common.priceDecimalLimit"));
          return false;
        }
        return true;
      };

      for (let i = 0; i < this.dataForm.buyTimeQuantum.length; i++) {
        if (!validatePrice(this.dataForm.buyTimeQuantum[i].price)) return false;
      }
      for (let i = 0; i < this.dataForm.sellTimeQuantum.length; i++) {
        if (!validatePrice(this.dataForm.sellTimeQuantum[i].price))
          return false;
      }

      return true;
    },

    // 提交保存数据
    handleSubmit() {
      console.log("电价设置 this.dataForm", this.dataForm);
      if (!this.validateForm()) return;

      this.loadingState = true;
      // 深拷贝数据，并将时间转换为分钟、价格转换为浮点数
      let info = JSON.parse(JSON.stringify(this.dataForm));
      info.buyTimeQuantum = info.buyTimeQuantum.map((item) => {
        item.start = this.timeToMin(item.start);
        item.end = this.timeToMin(item.end);
        item.price = parseFloat(item.price);
        return item;
      });
      info.sellTimeQuantum = info.sellTimeQuantum.map((item) => {
        item.start = this.timeToMin(item.start);
        item.end = this.timeToMin(item.end);
        item.price = parseFloat(item.price);
        return item;
      });

      saveAppUserCellInfo(info)
        .then(() => {
          this.$message.success(this.$t("common.successfulModification"));
          this.visible = false;
          this.$emit("back");
        })
        .finally(() => {
          this.loadingState = false;
        });
    },

    // 新增买电时间段（新增时 price 初始化为空，便于用户输入）
    addChargeTime() {
      const lastData =
        this.dataForm.buyTimeQuantum[this.dataForm.buyTimeQuantum.length - 1];
      const sort = lastData.sort + 1;
      let startTime = "";
      if (lastData.end) {
        startTime = this.minToTime(this.timeToMin(lastData.end) + 1);
      }
      this.dataForm.buyTimeQuantum.push({
        start: startTime,
        end: "",
        price: "",
        sort: sort,
      });
    },
    delChargeTime(index) {
      this.dataForm.buyTimeQuantum.splice(index, 1);
    },

    // 新增卖电时间段
    addDischargeTime() {
      const lastData =
        this.dataForm.sellTimeQuantum[this.dataForm.sellTimeQuantum.length - 1];
      const sort = lastData.sort + 1;
      let startTime = "";
      if (lastData.end) {
        startTime = this.minToTime(this.timeToMin(lastData.end) + 1);
      }
      this.dataForm.sellTimeQuantum.push({
        start: startTime,
        end: "",
        price: "",
        sort: sort,
      });
    },
    delDischargeTime(index) {
      this.dataForm.sellTimeQuantum.splice(index, 1);
    },

    // 将 HH:mm 转为分钟数
    timeToMin(time) {
      const arr = time.split(":");
      return parseInt(arr[0], 10) * 60 + parseInt(arr[1], 10);
    },

    // 将分钟数转为 HH:mm 格式
    minToTime(min) {
      const hours = Math.floor(min / 60)
        .toString()
        .padStart(2, "0");
      const minutes = (min % 60).toString().padStart(2, "0");
      return `${hours}:${minutes}`;
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
