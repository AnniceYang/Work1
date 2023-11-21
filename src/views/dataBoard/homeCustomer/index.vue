<template>
  <div class="app-container calendar-list-container">
    <div class="container">
      <el-select v-model="deviceId" style="margin-bottom: 15px">
        <el-option
          :label="item.sn"
          :value="item.id"
          v-for="item in list"
          @change="changeDevice"
        />
      </el-select>
      <div class="top">
        <div class="top-item">
          <div class="item-line">
            <img class="img" src="@/assets/img/home-photovoltaic.png" />
            <span class="text">{{ $t("dataBoard.todayPPG") }}</span>
          </div>
          <div class="item-line">
            <span class="val">{{ total.pvElec ? total.pvElec : 0 }}</span>
            <span class="unit1">kWh</span>
          </div>
        </div>
        <div class="top-item">
          <div class="item-line">
            <img class="img" src="@/assets/img/home-electricity.png" />
            <span class="text">{{ $t("dataBoard.todayET") }}</span>
          </div>
          <div class="item-line">
            <span class="val">{{ total.buyElec ? total.buyElec : 0 }}</span>
            <span class="unit2">kWh</span>
          </div>
        </div>
        <div class="top-item">
          <div class="item-line">
            <img class="img" src="@/assets/img/home-electricity.png" />
            <span class="text">{{ $t("dataBoard.todaySE") }}</span>
          </div>
          <div class="item-line">
            <span class="val">{{
              total.feedNetwork ? total.feedNetwork : 0
            }}</span>
            <span class="unit1">kWh</span>
          </div>
        </div>
        <div class="top-item">
          <div class="item-line">
            <img class="img" src="@/assets/img/home-consume.png" />
            <span class="text">{{ $t("dataBoard.todayCT") }}</span>
          </div>
          <div class="item-line">
            <span class="val">{{ total.dayElec ? total.dayElec : 0 }}</span>
            <span class="unit2">kWh</span>
          </div>
        </div>
        <div class="top-item">
          <div class="item-line">
            <img class="img" src="@/assets/img/home-photovoltaic.png" />
            <span class="text">{{ $t("dataBoard.totalPPG") }}</span>
          </div>
          <div class="item-line">
            <span class="val">{{ total.totalPv ? total.totalPv : 0 }}</span>
            <span class="unit1">kWh</span>
          </div>
        </div>
        <div class="top-item">
          <div class="item-line">
            <img class="img" src="@/assets/img/home-electricity.png" />
            <span class="text">{{ $t("dataBoard.totalET") }}</span>
          </div>
          <div class="item-line">
            <span class="val">{{ total.totalBuy ? total.totalBuy : 0 }}</span>
            <span class="unit2">kWh</span>
          </div>
        </div>
        <div class="top-item">
          <div class="item-line">
            <img class="img" src="@/assets/img/home-electricity.png" />
            <span class="text">{{ $t("dataBoard.totalSE") }}</span>
          </div>
          <div class="item-line">
            <span class="val">{{ total.totalFeed ? total.totalFeed : 0 }}</span>
            <span class="unit1">kWh</span>
          </div>
        </div>
        <div class="top-item">
          <div class="item-line">
            <img class="img" src="@/assets/img/home-consume.png" />
            <span class="text">{{ $t("dataBoard.totalCT") }}</span>
          </div>
          <div class="item-line">
            <span class="val">{{ total.totalElec ? total.totalElec : 0 }}</span>
            <span class="unit2">kWh</span>
          </div>
        </div>
      </div>
      <div class="center">
        <div class="center-item1">
          <div class="center-item1-top">
            <div class="center-item-title">
              <img src="@/assets/img/home-electricity.png" />
              <span>{{ $t("dataBoard.realTimeStatus") }}</span>
            </div>
            <div class="center-item1-content">
              <div class="item1-line1">
                <div class="item-line">
                  <img class="img" src="@/assets/img/home-status.png" />
                  <span>{{ $t("dataBoard.discharging") }}</span>
                </div>
                <div class="item-line">
                  <span class="val">{{ data2.batterySoc ? data2.batterySoc : 0 }}</span>
                  <span class="unit1">%</span>
                </div>
              </div>
              <div class="item1-line1">
                <div class="item-line">
                  <img class="img" src="@/assets/img/home-power.png" />
                  <span>{{ $t("deviceManage.pvPower") }}</span>
                </div>
                <div class="item-line">
                  <span class="val">{{ data2.pvPower ? data2.pvPower : 0 }}</span>
                  <span class="unit1">w</span>
                </div>
              </div>
            </div>
          </div>
          <div class="center-item1-bottom">
            <div class="item1-line2">
              <div>
                <span class="val">{{ data2.gridPower ? data2.gridPower : 0 }}</span>
                <span>w</span>
              </div>
              <div>{{ $t("deviceManage.powerGrid") }}</div>
            </div>
            <div class="item1-line2">
              <div>
                <span class="val">{{ data2.batteryPower ? data2.batteryPower : 0 }}</span>
                <span>w</span>
              </div>
              <div>{{ $t("deviceManage.battery") }}</div>
            </div>
            <div class="item1-line2">
              <div>
                <span class="val">{{ data2.loadPower ? data2.loadPower : 0 }}</span>
                <span>w</span>
              </div>
              <div>{{ $t("deviceManage.load") }}</div>
            </div>
          </div>
        </div>
        <div class="center-item">
          <div class="center-item-title">
            <img src="@/assets/img/home-proportion.png" />
            <span>{{ $t("dataBoard.ratioStatistics") }}</span>
          </div>
          <div class="center-content2">
            <div class="center-content2-item">
              <DeviceStatus :chartData="chartData4" color="#208A42"/>
            </div>
            <div class="center-content2-item">
              <DeviceStatus :chartData="chartData5" color="#FD9F15"/>
            </div>
          </div>
        </div>
        <div class="center-item">
          <div class="center-item-title">
            <img src="@/assets/img/home-energy.png" />
            <span>{{ $t("dataBoard.energyConsumptionStatistics") }}</span>
          </div>
          <div class="center-content3">
            <div class="center-content3-line">
              <div class="text">{{ $t("dataBoard.CO2Reduction") }}</div>
              <div class="val">{{ total.co2Num ? total.co2Num : 0 }}</div>
              <div class="unit1">t</div>
            </div>
            <div class="center-content3-line">
              <div class="text">{{ $t("dataBoard.save") }}</div>
              <div class="val">{{ total.saveNum ? total.saveNum : 0 }}</div>
              <div class="unit2">t</div>
            </div>
            <div class="center-content3-line">
              <div class="text">{{ $t("dataBoard.plant") }}</div>
              <div class="val">{{ total.plantNum ? total.plantNum : 0 }}</div>
              <div class="unit1">t</div>
            </div>
          </div>
        </div>
      </div>
      <div class="electricity-data">
        <div class="data-title">
          <div class="data-title-left">
            <img src="@/assets/img/home-electricityInformation.png" />
            <span>{{ $t("deviceManage.electricityInformation") }}</span>
          </div>
          <div class="data-title-right">
            <span
              :class="electricityInfo.type === 0 ? 'active-type' : ''"
              @click="changeElectricityType(0)"
              >{{ $t("deviceManage.day") }}</span
            >
            <span
              :class="electricityInfo.type === 1 ? 'active-type' : ''"
              @click="changeElectricityType(1)"
              >{{ $t("deviceManage.month") }}</span
            >
            <span
              :class="electricityInfo.type === 2 ? 'active-type' : ''"
              @click="changeElectricityType(2)"
              >{{ $t("deviceManage.year") }}</span
            >
            <el-date-picker
              width="150px"
              v-model="time1"
              value-format="timestamp"
              type="daterange"
              @change="changeTime"
              style="width: 260px"
              :range-separator="$t('deviceManage.to')"
              :start-placeholder="$t('common.startingTime')"
              :end-placeholder="$t('common.endTime')"
            >
            </el-date-picker>
          </div>
        </div>
        <div class="data-content">
          <el-radio-group
            v-model="radio1"
            @change="getElectricityData"
            class="data-content-radio"
          >
            <el-radio :label="0">{{ $t("deviceManage.capacity") }}</el-radio>
            <el-radio :label="1">{{
              $t("deviceManage.photovoltaicPowerGeneration")
            }}</el-radio>
            <el-radio :label="2">{{
              $t("deviceManage.sellingElectricity")
            }}</el-radio>
            <el-radio :label="3">{{
              $t("deviceManage.buyingElectricity")
            }}</el-radio>
          </el-radio-group>
          <ElectricityData :chartData="chartData1" />
        </div>
      </div>
      <div class="electricity-data">
        <div class="data-title">
          <div class="data-title-left">
            <img src="@/assets/img/home-income.png" />
            <span>{{ $t("deviceManage.powerGenerationRevenue") }}</span>
          </div>
          <div class="data-title-right">
            <span
              :class="incomeInfo.type === 0 ? 'active-type' : ''"
              @click="changeIncomeType(0)"
              >{{ $t("deviceManage.day") }}</span
            >
            <span
              :class="incomeInfo.type === 1 ? 'active-type' : ''"
              @click="changeIncomeType(1)"
              >{{ $t("deviceManage.month") }}</span
            >
            <span
              :class="incomeInfo.type === 2 ? 'active-type' : ''"
              @click="changeIncomeType(2)"
              >{{ $t("deviceManage.year") }}</span
            >
            <el-date-picker
              width="150px"
              v-model="time2"
              value-format="timestamp"
              type="daterange"
              @change="changeTime2"
              style="width: 260px"
              :range-separator="$t('deviceManage.to')"
              :start-placeholder="$t('common.startingTime')"
              :end-placeholder="$t('common.endTime')"
            >
            </el-date-picker>
          </div>
        </div>
        <div class="data-content">
          <div class="data-content-line">
            <div>
              {{ $t("deviceManage.totalRevenue") }}
              <span class="val">{{ totalIncome }}</span>
            </div>
            <el-radio-group
              v-model="radio2"
              @change="getElectricityIncome"
              class="data-content-radio"
            >
              <el-radio :label="0">{{
                $t("deviceManage.spontaneousRevenue")
              }}</el-radio>
              <el-radio :label="1">{{
                $t("deviceManage.electricitySalesRevenue")
              }}</el-radio>
              <el-radio :label="2">{{
                $t("deviceManage.totalRevenue")
              }}</el-radio>
            </el-radio-group>
          </div>
          <IncomeData :chartData="chartData2" />
        </div>
      </div>
      <div class="electricity-data">
        <div class="data-title">
          <div class="data-title-left">
            <img src="@/assets/img/home-power.png" />
            <span>{{ $t("deviceManage.realTimePower") }}</span>
          </div>
          <div class="data-title-right">
            <el-date-picker
              width="150px"
              v-model="time3"
              type="date"
              @change="getPowerData"
              value-format="timestamp"
              :placeholder="$t('common.selectPrompt')"
            >
            </el-date-picker>
          </div>
        </div>
        <div class="data-content">
          <el-radio-group
            v-model="radio3"
            @change="getPowerData"
            class="data-content-radio"
          >
            <el-radio :label="0">{{ $t("deviceManage.battery") }}</el-radio>
            <el-radio :label="1">{{
              $t("deviceManage.photovoltaic")
            }}</el-radio>
            <el-radio :label="2">{{ $t("deviceManage.load") }}</el-radio>
            <el-radio :label="3">{{
              $t("deviceManage.sellingElectricity")
            }}</el-radio>
            <el-radio :label="4">{{
              $t("deviceManage.buyingElectricity")
            }}</el-radio>
          </el-radio-group>
          <PowerData :chartData="chartData3" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  deviceList,
  getTotal,
  electricityData,
  electricityIncome,
  electricityPower,
} from "@/api/home/customer";
import ElectricityData from "../electricityData.vue";
import DeviceStatus from "./deviceStatus.vue";
import IncomeData from "../incomeData.vue";
import PowerData from "../powerData.vue";
import { mapGetters } from "vuex";
import moment from "moment";

import { getConfigData } from "@/api/device";
import { baseMqtt } from "@/config/env";
import { mapState } from "vuex";
const mqtt = require("mqtt/dist/mqtt.js");
export default {
  components: { ElectricityData, IncomeData, PowerData, DeviceStatus },
  data() {
    return {
      list: [],
      deviceId: "",
      mqttClient: null,
      connectState: "init",
      chartData4: {
        data: [],
      },
      chartData5: {
        data: [],
      },

      total: {},
      data2: {},
      chartData: {
        data: [],
      },

      electricityInfo: {
        startTime: null,
        endTime: null,
        type: 0,
      },
      radio1: 0,
      time1: [],
      chartData1: {
        xData: [],
        yData: [],
      },

      incomeInfo: {
        startTime: null,
        endTime: null,
        type: 0,
      },
      totalIncome: 0,
      radio2: 0,
      time2: [],
      chartData2: {
        xData: [],
        yData: [],
      },

      radio3: 0,
      time3: moment().unix() * 1000,
      chartData3: {
        xData: [],
        yData: [],
      },
      listLoading: false,
    };
  },
  mounted() {
    deviceList().then((res) => {
      if (res.length > 0) {
        this.list = res;
        this.deviceId = res[0].id;
        this.changeDevice();
        this.handleMqttInit();
      }
    });
    this.electricityInfo.endTime = this.incomeInfo.endTime =
      moment(moment().format("YYYY-MM-DD") + " 23:59:59").unix() + 1;
    this.electricityInfo.startTime = this.incomeInfo.startTime = moment(
      moment().subtract(30, "days").format("YYYY-MM-DD") + " 00:00:00"
    ).unix();
    this.time1 = this.time2 = [
      this.electricityInfo.startTime * 1000,
      this.electricityInfo.endTime * 1000 - 1000,
    ];
  },
  methods: {
    // mqtt初始化
    handleMqttInit() {
      this.mqttClient = mqtt.connect(baseMqtt, {
        protocolVersion: 4,
        reconnectPeriod: 1000,
        connectTimeout: 30 * 1000,
        resubscribe: true,
        keepalive: 3,
        clientId: "mqttjs_" + Math.random().toString(16).substr(2, 8),
      });
      this.mqttClient
        .on("connect", (res) => {
          this.connectState = "connect";
          this.subscribeInfo();
          console.log("用户端mqtt连接成功", res);
        })
        .on("message", (topic, message) => {
          const messageInfo = JSON.parse(message.toString());
          if (messageInfo.msgOperation === 1) {
            this.data2 = JSON.parse(messageInfo.val);
            console.log("dataList", JSON.parse(messageInfo.val));
          }
        });
    },
    // 订阅主题 /APP/设备id/NEWS
    subscribeInfo() {
      if (!this.mqttClient || this.connectState !== "connect") {
        this.toast("通讯未连接");
        return;
      }
      this.mqttClient.subscribe(
        `/APP/${this.deviceId}/NEWS`,
        (err, granted) => {
          if (!err) {
            console.log("===订阅主题 订阅成功===");
            this.getData();
          }
        }
      );
    },
    getData() {
      getConfigData({ deviceId: this.deviceId, val: 3 });
    },
    changeDevice() {
      getTotal({ deviceId: this.deviceId }).then((res) => {
        this.total = res;
        this.chartData4.data = [
          { value: res.selfUseProportion, name: '自用比例' },
          { value: 100 - res.selfUseProportion, name: '' }
        ];
        this.chartData5.data = [
          { value: res.sellElecProportion, name: '卖电比例' },
          { value: 100 - res.sellElecProportion, name: '' }
        ];
      });
      this.getElectricityData();
      this.getElectricityIncome();
      this.getPowerData();
    },
    changeElectricityType(type) {
      this.electricityInfo.type = type;
      this.getElectricityData();
    },
    changeTime(e) {
      if (e) {
        this.electricityInfo.startTime = e[0] / 1000;
        this.electricityInfo.endTime = e[1] / 1000 + 86401;
      } else {
        this.electricityInfo.startTime = this.electricityInfo.endTime = "";
      }
      this.getElectricityData();
    },
    getElectricityData() {
      electricityData({
        ...this.electricityInfo,
        deviceId: this.deviceId,
      }).then((res) => {
        this.chartData1.xData = res.map((item) => {
          return item.time;
        });
        this.chartData1.yData = res.map((item) => {
          if (this.radio1 === 0) {
            return item.loadElec;
          }
          if (this.radio1 === 1) {
            return item.pvElec;
          }
          if (this.radio1 === 2) {
            return item.feedNetwork;
          }
          if (this.radio1 === 3) {
            return item.buyElec;
          }
        });
      });
    },
    changeIncomeType(type) {
      this.incomeInfo.type = type;
      this.getElectricityIncome();
    },
    changeTime2(e) {
      if (e) {
        this.incomeInfo.startTime = e[0] / 1000;
        this.incomeInfo.endTime = e[1] / 1000 + 86401;
      } else {
        this.incomeInfo.startTime = this.incomeInfo.endTime = "";
      }
      this.getElectricityIncome();
    },
    getElectricityIncome() {
      electricityIncome({ ...this.incomeInfo, deviceId: this.deviceId }).then(
        (res) => {
          this.totalIncome = res.totalIncome;
          this.chartData2.xData = res.incomeDataList.map((item) => {
            return item.time;
          });
          this.chartData2.yData = res.incomeDataList.map((item) => {
            if (this.radio2 === 0) {
              return item.spontaneousIncome;
            }
            if (this.radio2 === 1) {
              return item.sellIncome;
            }
            if (this.radio2 === 2) {
              return item.totalIncome;
            }
          });
        }
      );
    },
    getPowerData() {
      electricityPower({
        time: this.time3 / 1000,
        deviceId: this.deviceId,
      }).then((res) => {
        this.chartData3.xData = res.map((item) => {
          return item.time;
        });
        this.chartData3.yData = res.map((item) => {
          if (this.radio3 === 0) {
            return item.battery;
          }
          if (this.radio3 === 1) {
            return item.pvElec;
          }
          if (this.radio3 === 2) {
            return item.loadElec;
          }
          if (this.radio3 === 3) {
            return item.feedNetwork;
          }
          if (this.radio3 === 4) {
            return item.buyElec;
          }
        });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  padding: 20px;
}
.top {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.top-item {
  height: 110px;
  // width: 20px;
  width: calc((100% - 45px) / 4);
  border-radius: 20px;
  background: #fff;
  margin-bottom: 15px;
  // margin-top: 15px;
  padding: 20px;
}
.item-line {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.text {
  margin-left: 10px;
}
.val {
  font-size: 28px;
  font-weight: bold;
  margin-right: 10px;
}
.unit1 {
  // margin-left: 10px;
  background: rgba(32, 138, 66, 0.1);
  padding: 5px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: bold;
  color: #208a42;
}
.unit2 {
  // margin-left: 10px;
  background: rgba(253, 159, 21, 0.1);
  padding: 5px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: bold;
  color: #fd9f15;
}

.center {
  display: flex;
  justify-content: space-between;
}
.center-item {
  width: calc((100% - 30px) / 3);
  height: 260px;
  border-radius: 20px;
  background: #fff;
}
.center-item1 {
  width: calc((100% - 30px) / 3);
  height: 260px;
}
.center-item1-top {
  border-radius: 20px;
  background: #fff;
  height: 155px;
  margin-bottom: 15px;
  width: 100%;
}
.center-item1-bottom {
  border-radius: 20px;
  background: #fff;
  height: 90px;
  margin-bottom: 10px;
  width: 100%;
  display: flex;
}
.center-item1-content {
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 105px;
  width: 100%;
}
.item1-line1 {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.item1-line1 img {
  margin-right: 10px;
}
.item1-line2 {
  width: 33.3%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.center-item-title {
  height: 50px;
  display: flex;
  align-items: center;
  // line-height: 50px;
  border-bottom: 1px solid #eeeeee;
}
.center-item-title img {
  margin-left: 20px;
}
.center-item-title span {
  margin-left: 10px;
}
.center-content {
  // display: flex;
  // justify-content: center;
  // align-items: center;
  height: 220px;
}
.center-content2 {
  display: flex;
  // justify-content: center;
  // align-items: center;
  height: 220px;
}
.center-content2-item {
  // border: 1px solid red;
  width: 50%;
}
.center-content-left {
  // height: 200px;
  position: relative;
  // padding-top: 40%;
  // width: 40%;
  width: 160px;
  height: 160px;
  background: rgba(32, 138, 66, 0.1);
  border-radius: 50%;
  left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.point1 {
  width: 20px;
  height: 20px;
  background: rgba(32, 138, 66, 0.3);
  border-radius: 50%;
}
.center-content-right {
  width: 160px;
  height: 160px;
  background: rgba(253, 159, 21, 0.1);
  border-radius: 50%;
  // padding-top: 40%;
  position: relative;
  right: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.point2 {
  width: 20px;
  height: 20px;
  background: rgba(253, 159, 21, 0.3);
  border-radius: 50%;
}
.center-content3 {
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
}
.center-content3-line {
  display: flex;
  align-items: center;
  // height: 220px;
  width: 80%;
  border-radius: 6px;
  margin-top: 25px;
  // margin-bottom: 20px;
  border: 1px solid #208a42;
}
.center-content3-line .text {
  width: 80px;
  // border: 1px solid #208A42;
}

.electricity-data {
  background: #fff;
  border-radius: 20px;
  margin-top: 15px;
}
.data-title {
  display: flex;
  height: 50px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #eeeeee;
  padding-left: 20px;
  padding-right: 20px;
}
.data-title-left {
  display: flex;
  align-items: center;
}
.data-title-left span {
  margin-left: 15px;
}
.data-title-right span {
  display: inline-block;
  width: 50px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #dddddd;
  border-radius: 6px;
  margin-right: 10px;
  text-align: center;
}
.active-type {
  background: #208a42;
  color: #ffffff;
}
.data-content {
  height: 280px;
}
.data-content-line {
  display: flex;
  // margin-top: 10px;
}
.data-content-line div {
  width: 50%;
  // border: 1px solid red;
  margin-left: 30px;
  display: flex;
  align-items: center;
}
.data-content-line span {
  margin-left: 10px;
}
.data-content-radio {
  margin-top: 10px;
  height: 20px;
  line-height: 20px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-right: 20px;
}
</style>
