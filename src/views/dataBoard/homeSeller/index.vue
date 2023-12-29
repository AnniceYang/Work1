<template>
  <div class="app-container calendar-list-container">
    <div class="container">
      <el-select
        v-model="selectedInstaller"
        placeholder="Select Installer"
        @change="loadInstallerData"
      >
        <el-option
          v-for="installer in installers"
          :key="installer.id"
          :label="installer.name"
          :value="installer.id"
        />
      </el-select>

      <div class="top">
        <!-- Add dropdown menu to select dealer -->
        <div v-if="selectedInstaller" class="top-item"></div>
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
        <div class="center-item">
          <div class="center-item-title">
            <img src="@/assets/img/home-photovoltaic.png" />
            <span>{{ $t("dataBoard.equipmentStatusStatistics") }}</span>
          </div>
          <div class="center-content">
            <DeviceStatus :chartData="chartData" />
          </div>
        </div>
        <div class="center-item">
          <div class="center-item-title">
            <img src="@/assets/img/home-install.png" />
            <span>{{ $t("dataBoard.installationStatistics") }}</span>
          </div>
          <div class="center-content2">
            <div class="center-content-left">
              <div class="point1"></div>
              <div>
                <span class="val">{{
                  total.installedPower ? total.installedPower : 0
                }}</span
                >kWh
              </div>
              <div>{{ $t("dataBoard.installationPower") }}</div>
            </div>
            <div class="center-content-right">
              <div class="point2"></div>
              <div>
                <span class="val">{{
                  total.installedCapacity ? total.installedCapacity : 0
                }}</span
                >kWh
              </div>
              <div>{{ $t("dataBoard.installationCapacity") }}</div>
            </div>
          </div>
        </div>
        <div class="center-item">
          <div class="center-item-title">
            <img src="@/assets/img/home-deviceStatus.png" />
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
  //...(import necessary APIs for dealer data)
  getInstallers,
  getTotalByDistributor,
  electricityData,
  electricityIncome,
  electricityPower,
} from "@/api/home/dealer";

// import {
//   getTotal,
//   electricityData,
//   electricityIncome,
//   electricityPower,
// } from "@/api/home/installer";
import ElectricityData from "../electricityData.vue";
import IncomeData from "../incomeData.vue";
import DeviceStatus from "./deviceStatus.vue";
import PowerData from "../powerData.vue";
import { mapGetters } from "vuex";
import moment from "moment";
export default {
  components: { DeviceStatus, ElectricityData, IncomeData, PowerData },
  data() {
    return {
      selectedInstaller: null,
      installers: [],

      total: {},
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
    //Load distributor data on component mount
    this.loadInstallers();

    getTotal().then((res) => {
      this.total = res;
      this.chartData.data = [
        {
          value: res.normalNum ? res.normalNum : 0,
          name: this.$t("dataBoard.normal"),
          rate: res.normalPercentage,
        },
        {
          value: res.offlineNum ? res.offlineNum : 0,
          name: this.$t("dataBoard.offLine"),
          rate: res.offlinePercentage,
        },
        {
          value: res.wrongNum ? res.wrongNum : 0,
          name: this.$t("dataBoard.errorReporting"),
          rate: res.wrongPercentage,
        },
      ];
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
    this.getElectricityData();
    this.getElectricityIncome();
    this.getPowerData();
  },
  methods: {
    loadDistributors() {
      //Fetch distributors from your API and populate the 'distributor' array
      //Example API call:
      getDistributors().then((res) => (this.distributors = res));
    },

    async loadInstallers() {
      //Fetch installer data based on the selected distributor
      try {
        const response = await getInstallers();
        this.installers = response.data;
      } catch (error) {
        console.error("Error fetching installers:", error);
      }
    },

    async loadInstallerData() {
      if (this.selectedInstaller) {
        try {
          const response = await getTotalByDistributor({
            installerId: this.selectedInstaller,
          });

          this.total = response.data;
          this.getElectricityData();
          this.getElectricityIncome();
          this.getPowerData();
        } catch (error) {
          console.error("Error fetching installer data:", error);
        }
      }
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
      electricityData(this.electricityInfo).then((res) => {
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
      electricityIncome(this.incomeInfo).then((res) => {
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
        console.log(this.chartData2);
      });
    },
    getPowerData() {
      electricityPower({
        time: this.time3 / 1000,
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
  padding-top: 20px;
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
}
.unit1 {
  margin-left: 15px;
  background: rgba(32, 138, 66, 0.1);
  padding: 5px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: bold;
  color: #208a42;
}
.unit2 {
  margin-left: 15px;
  background: rgba(253, 159, 21, 0.1);
  padding: 5px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: bold;
  color: #fd9f15;
}

.center {
  display: flex;
  // flex-wrap: wrap;
  justify-content: space-between;
}
.center-item {
  // height: 110px;
  width: calc((100% - 30px) / 3);
  border-radius: 20px;
  background: #fff;
  // margin-bottom: 15px;
  // padding: 20px;
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
  justify-content: center;
  align-items: center;
  height: 220px;
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
