<template>
  <div class="app-container calendar-list-container">
    <div class="container">
      <div class="top">
        <!-- Online Devices -->
        <div class="top-item">
          <div class="item-line">
            <img class="img" src="@/assets/img/onlineDevice.png" />
            <span class="text">{{ $t("dataBoard.onlineDevices") }}</span>
          </div>
          <div class="item-line">
            <span class="val">{{ total.onlineNum ? total.onlineNum : 0 }}</span>
          </div>
        </div>

        <!-- Total Installed Devices -->
        <div class="top-item">
          <div class="item-line">
            <img class="img" src="@/assets/img/totalDevice.png" />
            <span class="text">{{
              $t("dataBoard.totalInstalledDevices")
            }}</span>
          </div>
          <div class="item-line">
            <span class="val">{{
              total.installedNum ? total.installedNum : 0
            }}</span>
          </div>
        </div>

        <!-- Offline Devices -->
        <div class="top-item">
          <div class="item-line">
            <img class="img" src="@/assets/img/offlineDevice.png" />
            <span class="text">{{ $t("dataBoard.offlineDevices") }}</span>
          </div>
          <div class="item-line">
            <span class="val">{{
              total.offlineNum ? total.offlineNum : 0
            }}</span>
          </div>
        </div>

        <!-- Error Devices -->
        <div class="top-item">
          <div class="item-line">
            <img class="img" src="@/assets/img/alarmDevice.png" />
            <span class="text">{{ $t("dataBoard.errorDevices") }}</span>
          </div>
          <div class="item-line">
            <span class="val">{{ total.errorNum ? total.errorNum : 0 }}</span>
          </div>
        </div>
      </div>

      <!-- Installation Statistics -->
      <div class="center">
        <div class="center-item">
          <div class="center-item-title">
            <img src="@/assets/img/home-photovoltaic.png" />
            <span class="text">{{
              $t("dataBoard.installationStatistics")
            }}</span>
          </div>
          <!-- <div class="center-content">
            <DeviceStatus :chartData="chartData" />
          </div>
        </div>
        <div class="center-item">
          <div class="center-item-title">
            <img src="@/assets/img/home-install.png" />
            <span>{{ $t("dataBoard.installationStatistics") }}</span>
          </div> -->
          <div class="center-content2">
            <div class="center-content-left">
              <div class="point1"></div>
              <div>
                <span class="val">{{
                  total.installedPower ? total.installedPower : 0
                }}</span>
                kWh
              </div>
              <div class="text1">{{ $t("dataBoard.installationPower") }}</div>
            </div>
            <div class="center-content-right">
              <div class="point2"></div>
              <div>
                <span class="val">{{
                  total.installedCapacity ? total.installedCapacity : 0
                }}</span>
                <div class="kwh">kWh</div>
              </div>
              <div class="text1">
                {{ $t("dataBoard.installationCapacity") }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getTotalcount } from "@/api/home/backend";
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
      total: {
        onlineNum: 0,
        installedNum: 0,
        offlineNum: 0,
        errorNum: 0,
        installedPower: 0,
        installedCapacity: 0,
      },
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
    getTotalcount().then((res) => {
      console.log("API Response: ", res);
      this.total.onlineNum = res.onlineNum;
      this.total.installedNum = res.installedNum;
      this.total.offlineNum = res.offlineNum;
      this.total.errorNum = res.errorNum;
      this.total.installedPower = res.installedPower;
      this.total.installedCapacity = res.installedCapacity;
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
  },
  methods: {
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
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.top-item {
  height: 150px;
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
  font-size: 20px;
  margin-left: 10px;
}

.text1 {
  margin-top: 10px;
}

.kwh {
  margin-left: 50px;
}
.val {
  font-size: 48px;
  font-weight: bold;
  margin-top: 5px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
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
  height: 350px;
  width: 100%;
  border-radius: 20px;
  background: #fff;
  margin-bottom: 15px;
  padding: 20px;
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
  height: 100%;
}
.center-content-left {
  // height: 200px;
  position: relative;
  // padding-top: 40%;
  // width: 40%;
  width: 180px;
  height: 180px;
  margin-left: 5px;
  background: rgba(32, 138, 66, 0.1);
  border-radius: 50%;
  left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.point1 {
  width: 40px;
  height: 40px;
  background: rgba(32, 138, 66, 0.3);
  border-radius: 50%;
}
.center-content-right {
  width: 180px;
  height: 180px;
  margin-left: 5px;
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
  width: 40px;
  height: 40px;
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
