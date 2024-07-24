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
        <div
          class="top-item clickable"
          @click="handleExport('/excel/snOffline')"
        >
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
        <div class="top-item clickable" @click="handleExport('/excel/snError')">
          <div class="item-line">
            <img class="img" src="@/assets/img/alarmDevice.png" />
            <span class="text">{{ $t("dataBoard.errorDevices") }}</span>
          </div>
          <div class="item-line">
            <span class="val">{{ total.wrongNum ? total.wrongNum : 0 }}</span>
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
            <el-select
              v-model="selectedInstaller"
              @change="fetchInstallerData"
              :placeholder="$t('common.selectInstaller')"
            >
              <el-option :label="Null" :value="''"></el-option>
              <el-option
                v-for="installer in installers"
                :key="installer.userId"
                :label="installer.username"
                :value="installer.userId"
              ></el-option>
            </el-select>
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
          <!-- <div class="center-content2">
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
          </div> -->
          <div class="center-content2">
            <div class="circle-container">
              <div class="circle" :style="{ backgroundColor: '#4CAF50' }">
                <div class="circle-content">
                  <div class="point"></div>
                  <div>
                    <span class="val">{{ circles[0].value }}</span>
                  </div>
                  <div class="text1">{{ circles[0].text }}</div>
                </div>
              </div>

              <div class="circle" :style="{ backgroundColor: '#FF9800' }">
                <div class="circle-content">
                  <div class="point"></div>
                  <div>
                    <span class="val">{{ circles[1].value }} </span>
                    <span class="kWh">kWh</span>
                  </div>
                  <div class="text1">{{ circles[1].text }}</div>
                </div>
              </div>

              <div class="circle" :style="{ backgroundColor: '#2196F3' }">
                <div class="circle-content">
                  <div class="point"></div>
                  <div>
                    <span class="val">{{ circles[2].value }}</span>
                  </div>
                  <div class="text1">{{ circles[2].text }}</div>
                </div>
              </div>

              <div class="circle" :style="{ backgroundColor: '#F44336' }">
                <div class="circle-content">
                  <div class="point"></div>
                  <div>
                    <span class="val">{{ circles[3].value }}</span>
                    <span class="kWh">kWh</span>
                  </div>
                  <div class="text1">{{ circles[3].text }}</div>
                </div>
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
import { listAgent, installData } from "@/api/device";
import { baseUrl } from "@/config/env";
import DeviceStatus from "./deviceStatus.vue";

import { mapGetters } from "vuex";
import moment from "moment";
export default {
  components: { DeviceStatus },
  data() {
    return {
      total: {
        onlineNum: 0,
        installedNum: 0,
        offlineNum: 0,
        wrongNum: 0,
        installedPower: 0,
        installedCapacity: 0,
      },
      chartData: {
        data: [],
      },

      installers: [], //存储安装商列表
      selectedInstaller: "", //选中的安装商
      circles: [
        { text: this.$t("dataBoard.installationNum"), value: 0 },
        { text: this.$t("dataBoard.installationPower"), value: 0 },
        { text: this.$t("dataBoard.batteryNum"), value: 0 },
        { text: this.$t("dataBoard.installationCapacity"), value: 0 },
      ],

      listLoading: false,
    };
  },
  mounted() {
    this.fetchInstallers();
    this.fetchInstallerData();

    getTotalcount().then((res) => {
      console.log("API Response: ", res);
      this.total.onlineNum = res.onlineNum;
      this.total.installedNum = res.installedNum;
      this.total.offlineNum = res.offlineNum;
      this.total.wrongNum = res.wrongNum;
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
      console.log("Error Devices: ", this.total.wrongNum);
    });
  },
  methods: {
    fetchInstallers() {
      listAgent()
        .then((res) => {
          this.installers = res;
        })
        .catch((error) => {
          console.error("Error fetching installers: ", error);
        });
    },

    fetchInstallerData() {
      const installUserId = this.selectedInstaller;
      if (installUserId) {
        installData({ installUserId })
          .then((res) => {
            this.circles[0].value = res.installedNum || 0;
            this.circles[1].value = res.installedPower || 0;
            this.circles[2].value = res.batteryNum || 0;
            this.circles[3].value = res.installedCapacity || 0;
          })
          .catch((error) => {
            console.error("Error fetching installer data: ", error);
          });
      } else {
        installData().then((res) => {
          this.circles[0].value = res.installedNum || 0;
          this.circles[1].value = res.installedPower || 0;
          this.circles[2].value = res.batteryNum || 0;
          this.circles[3].value = res.installedCapacity || 0;
        });
      }
    },

    handleExport(endpoint) {
      const exportUrl = `${baseUrl}${endpoint}`;

      window.open(exportUrl, "_blank");
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

.clickable {
  cursor: pointer;
  transition: box-shadow 0.2s;
}
.clickable :hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
.item-line {
  display: flex;
  align-items: center;
  justify-content: center;
}
.img {
  width: 20px;
  height: 20px;
}
.text {
  font-size: 20px;
  font-weight: bold;
  margin-left: 10px;
}

.val {
  margin-top: 20px;
  font-size: 48px;
  font-weight: bold;
  color: #000;
}

.center {
  display: flex;

  justify-content: space-between;

  flex-wrap: wrap;
}
.center-item {
  width: 100%;
  border-radius: 20px;
  background: #fff;

  padding: 20px;
}
.center-item-title {
  display: flex;
  align-items: center;

  justify-content: space-between;
  margin-bottom: 20px;
}
.text {
  font-size: 20px;
  font-weight: bold;
}

.center-content2 {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.circle-container {
  display: flex;
  justify-content: space-between;

  width: 100%;
}
.circle {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  display: flex;

  align-items: center;
  justify-content: center;
}
.circle-content {
  text-align: center;
}
.circle-val {
  margin-top: 20px;
  font-size: 48px;
  font-weight: bold;
  color: #000;
}
.text1 {
  margin-top: 10px;
  font-size: 20px;
  font-weight: bold;
  color: #666;
}
.kWh {
  font-size: 16px;
  vertical-align: super;
}
</style>
