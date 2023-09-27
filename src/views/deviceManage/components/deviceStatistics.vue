<template>
  <div class="app-container calendar-list-container">
    <basic-container>
      <el-page-header @back="goBack" :content="$t('deviceManage.equipmentDataStatistics')"></el-page-header>
      <el-descriptions :title="$t('deviceManage.deviceInformation')" style="margin-top: 20px">
        <el-descriptions-item :label="$t('deviceManage.deviceName')">{{
          deviceInfo.name
        }}</el-descriptions-item>
        <el-descriptions-item :label="$t('deviceManage.snCode')">{{
          deviceInfo.sn
        }}</el-descriptions-item>
        <el-descriptions-item :label="$t('deviceManage.modelName')">{{
          deviceInfo.modelName
        }}</el-descriptions-item>
        <!-- <el-descriptions-item label="设备类型">{{
          deviceInfo.type === 0 ? "NB" : "涂鸦"
        }}</el-descriptions-item> -->
        <el-descriptions-item :label="$t('deviceManage.deviceStatus')">{{
          devStatusFilter[deviceInfo.status]
        }}</el-descriptions-item>
        <el-descriptions-item :label="$t('deviceManage.onlineStatus')">{{
          onlineStatusFilter[deviceInfo.onlineStatus]
        }}</el-descriptions-item>
        <el-descriptions-item :label="$t('common.createTime')">{{
          deviceInfo.createTime | parseTime
        }}</el-descriptions-item>
        <el-descriptions-item :label="$t('deviceManage.communicationStickSoftwareVersion')">{{
          deviceInfo.versionNet
        }}</el-descriptions-item>

        <el-descriptions-item :label="$t('deviceManage.buyingElectricity')">{{ deviceInfo.buyElectricity }}kWh</el-descriptions-item>
        <el-descriptions-item :label="$t('deviceManage.sellingElectricity')">{{ deviceInfo.sellElectricity }}kWh</el-descriptions-item>
        <el-descriptions-item :label="$t('deviceManage.photovoltaicPowerGeneration')">{{ deviceInfo.cumulativeElectricity }}kWh</el-descriptions-item>
        <el-descriptions-item :label="$t('deviceManage.totalConsumption')">{{ deviceInfo.totalConsume }}kWh</el-descriptions-item>
        <el-descriptions-item :label="$t('deviceManage.cumulativeGain')">{{
          deviceInfo.cumulativeIncome
        }}</el-descriptions-item>
        <el-descriptions-item :label="$t('deviceManage.pvPower')">{{ deviceInfo.pvPower }}W</el-descriptions-item>
        <el-descriptions-item :label="$t('deviceManage.equipmentRemarks')">{{
          deviceInfo.remarks
        }}</el-descriptions-item>
        <el-descriptions-item :label="$t('deviceManage.energyFlowSwitch')">{{
          deviceInfo.energyFlowSwitch == 0 ? $t('menuManage.close') : $t('menuManage.open')
        }}</el-descriptions-item>
      </el-descriptions>

      <el-descriptions :title="$t('deviceManage.userInformation')" style="margin-top: 20px">
        <el-descriptions-item :label="$t('deviceManage.userName')">{{
          deviceInfo.bindUserName
        }}</el-descriptions-item>
        <el-descriptions-item :label="$t('deviceManage.deviceName')">{{
          deviceInfo.bindName
        }}</el-descriptions-item>
        <el-descriptions-item :label="$t('deviceManage.bindingTime')">{{
          deviceInfo.bindTime | parseTime
        }}</el-descriptions-item>
      </el-descriptions>

      <el-descriptions :title="$t('deviceManage.installerInformation')" style="margin-top: 20px">
        <el-descriptions-item :label="$t('deviceManage.installerName')">{{
          deviceInfo.installerName
        }}</el-descriptions-item>
        <el-descriptions-item :label="$t('deviceManage.deviceName')">{{
          deviceInfo.installName
        }}</el-descriptions-item>
        <el-descriptions-item :label="$t('deviceManage.installationTime')">{{
          deviceInfo.installTime | parseTime
        }}</el-descriptions-item>
      </el-descriptions>

      <div style="margin-top: 20px">
        <el-form :inline="true">
          <el-form-item :label="$t('deviceManage.type')">
            <el-select v-model="listQuery.type" :placeholder="$t('common.selectPrompt')">
              <el-option :label="$t('deviceManage.day')" :value="0"></el-option>
              <el-option :label="$t('deviceManage.month')" :value="1"></el-option>
              <el-option :label="$t('deviceManage.year')" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('deviceManage.timeFrame')">
            <el-date-picker v-model="timeList" type="daterange" value-format="timestamp" :range-separator="$t('deviceManage.to')"
              :start-placeholder="$t('common.startingTime')" :end-placeholder="$t('common.endTime')" @change="changeTime">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getData()">{{$t('common.search')}}</el-button>
            <el-button type="primary" @click="handleReset()">{{$t('common.reset')}}</el-button>
          </el-form-item>
        </el-form>
      </div>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-card style="margin-top: 0px">
            <div slot="header">
              <span>{{$t('deviceManage.electricityInformation')}}</span>
            </div>
            <div class="card-content">
              <ElectricityData :chartData="chartData1" />
            </div>
          </el-card>
        </el-col>

        <el-col :span="12">
          <el-card style="margin-top: 0px">
            <div slot="header" class="card-header">
              <span>{{$t('deviceManage.powerGenerationRevenue')}}</span>
              <span style="margin-left: 10px; font-weight: bold">({{$t('deviceManage.totalRevenue')}}：￥{{ money || 0 }})</span>
            </div>
            <div class="card-content">
              <IncomeData :chartData="chartData2" />
            </div>
          </el-card>                                                                              
        </el-col>
      </el-row>

      <el-card style="margin-top: 20px">
        <div slot="header">
          <span>{{$t('deviceManage.realTimePower')}}</span>
          <el-date-picker style="margin-left: 10px" @change="getDevicePowerData" v-model="time" type="date"
            value-format="timestamp" :placeholder="$t('common.selectPrompt')">
          </el-date-picker>
        </div>
        <div class="card-content">
          <PowerData :chartData="chartData3" />
        </div>
      </el-card>

      <el-card style="margin-top: 20px">
        <div slot="header">
          <span>{{$t('deviceManage.realTime')}}</span>
          <el-date-picker style="margin-left: 10px" @change="getDeviceRecordData" v-model="time2" type="date"
            value-format="timestamp" :placeholder="$t('common.selectPrompt')">
          </el-date-picker>
        </div>
        <div class="card2-content">
          <div>
            <el-tag class="tag" v-for="(item, index) in paramsList" :key="item.value"
              :type="paramsIndex === index ? '' : 'info'" @click="handleRecordData(index)" effect="plain">
              {{ item.name }}
            </el-tag>
          </div>
          <div class="menu">
            <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
              <el-menu-item index="0">{{$t('deviceManage.table')}}</el-menu-item>
              <el-menu-item index="1">{{$t('deviceManage.curve')}}</el-menu-item>
            </el-menu>
          </div>
          <div v-if="activeIndex === '0'" style="margin-top: 20px;height: 560px">
            <el-table border stripe :data="recordData.slice((pageNum - 1) * pageSize, pageNum * pageSize)">
              <el-table-column align="center" :label="$t('deviceManage.time')">
                <template slot-scope="scope">
                  {{ scope.row.time }}
                </template>
              </el-table-column>
              <el-table-column align="center" :label="$t('deviceManage.dataContent')">
                <template slot-scope="scope">
                  {{ paramsList[paramsIndex].name }}
                </template>
              </el-table-column>
              <el-table-column align="center" :label="$t('deviceManage.value')">
                <template slot-scope="scope">
                  {{ scope.row[paramsList[paramsIndex].value] }}
                </template>
              </el-table-column>
              <el-table-column align="center" :label="$t('deviceManage.unit')">
                <template slot-scope="scope">
                  {{ paramsList[paramsIndex].unit }}
                </template>
              </el-table-column>
            </el-table>
            <div class="avue-crud__pagination">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNo"
                :page-size="pageSize"
                :total="recordData.length"
                layout="total, prev, pager, next, jumper"
              >
              </el-pagination>
            </div>
          </div>
          <div v-if="activeIndex === '1'" style="margin-top: 20px; height: 560px">
            <RecordData :chartData="chartData4" />
          </div>
        </div>
      </el-card>
    </basic-container>
  </div>
</template>

<script>
import {
  qryDeviceElectricityData,
  qryDeviceIncomeData,
  qryDevicePowerData,
} from "@/api/device";
import ElectricityData from "./electricityData.vue";
import IncomeData from "./incomeData.vue";
import PowerData from "./powerData.vue";
import RecordData from "./recordData.vue";
import moment from "moment";
export default {
  components: { ElectricityData, IncomeData, PowerData, RecordData },
  data() {
    return {
      deviceInfo: {},
      devStatusFilter:[this.$t('userManage.normal'),this.$t('deviceManage.maintenance'),this.$t('deviceManage.offline'),this.$t('deviceManage.error')],
      onlineStatusFilter: [this.$t('deviceManage.offline'), this.$t('deviceManage.online'), this.$t('deviceManage.updating')],
      chartData1: {
        xData: [],
        yDataTotalElec: [],
        yDataLoadElec: [],
        yDataPvElec: [],
        yDataFeedNetwork: [],
        yDataBuyElec: [],
      },
      chartData2: {
        xData: [],
        yDataSpontaneousIncome: [],
        yDataSellIncome: [],
        yDataAvgIncome: [],
      },
      chartData3: {
        xData: [],
        yDataBattery: [],
        yDataPvElec: [],
        yDataLoadElec: [],
        yDataFeedNetwork: [],
        yDataBuyElec: [],
      },
      chartData4: {
        xData: [],
        yData: [],
        otherData: {},
      },
      money: 0,
      listQuery: {
        type: 0,
      },
      time: "",
      time2: "",
      timeList: [],
      paramsList: [
        { name: this.$t('deviceManage.dcdcTemperature'), value: "dcdcTemperature", color: "#25C5D9", unit: "℃" },
        { name: this.$t('deviceManage.busbarVoltage'), value: "busbarVoltage", color: "#FD9F15", unit: "V" },
        { name: this.$t('deviceManage.pv1Voltage'), value: "pv1Voltage", color: "#FDCB01", unit: "V" },
        { name: this.$t('deviceManage.pv1Current'), value: "pv1Current", color: "#89BD77", unit: "A" },
        { name: this.$t('deviceManage.pv1Power'), value: "pv1Power", color: "#25C5D9", unit: "W" },
        { name: this.$t('deviceManage.pv2Voltage'), value: "pv2Voltage", color: "#D17DFD", unit: "V" },
        { name: this.$t('deviceManage.pv2Current'), value: "pv2Current", color: "#409DFF", unit: "A" },
        { name: this.$t('deviceManage.pv2Power'), value: "pv2Power", color: "#25C5D9", unit: "W" },
        { name: this.$t('deviceManage.batteryVoltage'), value: "batteryVoltage", color: "#FD9F15", unit: "V" },
        { name: this.$t('deviceManage.batteryCurrent'), value: "batteryCurrent", color: "#FDCB01", unit: "A" },

        { name: this.$t('deviceManage.batteryPower'), value: "batteryPower", color: "#D17DFD", unit: "W" },
        { name: this.$t('deviceManage.batteryTotalSoc'), value: "batteryTotalSoc", color: "#3F9DFF", unit: "%" },
        {
          name: this.$t('deviceManage.phaseAGridFrequency'),
          value: "phaseAGridFrequency",
          color: "#89BD77",
          unit: "Hz"
        },
        { name: this.$t('deviceManage.phaseAGridVoltage'), value: "phaseAGridVoltage", color: "#FD9F15", unit: "V" },
        { name: this.$t('deviceManage.gridActivePower'), value: "gridActivePower", color: "#25C5D9", unit: "W" },
        { name: this.$t('deviceManage.ctCurrent'), value: "ctCurrent", color: "#3F9DFF", unit: "A" },
        { name: this.$t('deviceManage.ctPower'), value: "ctPower", color: "#FDCB01", unit: "W" },
        {
          name: this.$t('deviceManage.inverterSideTemperature'),
          value: "inverterSideTemperature",
          color: "#3F9DFF",
          unit: "℃"
        },
        {
          name: this.$t('deviceManage.phaseAInverterOutputFrequency'),
          value: "phaseAInverterOutputFrequency",
          color: "#25C5D9",
          unit: "Hz"
        },
        {
          name: this.$t('deviceManage.phaseAInverterOutputVoltage'),
          value: "phaseAInverterOutputVoltage",
          color: "#FD9F15",
          unit: "V"
        },

        {
          name: this.$t('deviceManage.phaseAInverterOutputCurrent'),
          value: "phaseAInverterOutputCurrent",
          color: "#3F9DFF",
          unit: "A"
        },
        {
          name: this.$t('deviceManage.phaseAInverterActivePower'),
          value: "phaseAInverterActivePower",
          color: "#89BD77",
          unit: "W"
        },
        { name: this.$t('deviceManage.phaseALoadVoltage'), value: "phaseALoadVoltage", color: "#FDCB01", unit: "V" },
        { name: this.$t('deviceManage.phaseALoadCurrent'), value: "phaseALoadCurrent", color: "#D17DFD", unit: "A" },
        {
          name: this.$t('deviceManage.phaseALoadActivePower'),
          value: "phaseAActivePower",
          color: "#89BD77",
          unit: "W"
        },
        { name: this.$t('deviceManage.loadRealTimePower'), value: "loadRealTimePower", color: "#25C5D9", unit: "W" },
        {
          name: this.$t('deviceManage.middleBusbarVoltage'),
          value: "middleBusbarVoltage",
          color: "#3F9DFF",
          unit: "V"
        },
        { name: this.$t('deviceManage.buckBoostCurrent'), value: "buckBoostCurrent", color: "#FDCB01", unit: "A" },
        {
          name: this.$t('deviceManage.electricRelayMiddleVoltage'),
          value: "electricRelayMiddleVoltage",
          color: "#D17DFD",
          unit: "V"
        },
      ],
      recordData: [],
      pageNum: 1,
      pageSize: 10,
      paramsIndex: 0,
      activeIndex: "0",
    };
  },
  methods: {
    init(info) {
      this.time = this.time2 = moment().unix() * 1000;
      this.listQuery.endTime =
        moment(moment().format("YYYY-MM-DD") + " 23:59:59").unix() + 1;
      this.listQuery.startTime = moment(
        moment().subtract(6, "days").format("YYYY-MM-DD") + " 00:00:00"
      ).unix();
      this.timeList = [
        this.listQuery.startTime * 1000,
        this.listQuery.endTime * 1000 - 1000,
      ];
      this.deviceInfo = { ...info };
      this.getData();
      this.getDevicePowerData();
      this.getDeviceRecordData();
    },
    getData() {
      this.getElectricityData();
      this.getIncomeData();
    },
    changeTime(e) {
      if (e) {
        this.listQuery.startTime = e[0] / 1000;
        this.listQuery.endTime = e[1] / 1000 + 86401;
      } else {
        this.listQuery.startTime = this.listQuery.endTime = "";
      }
    },
    handleReset() {
      this.listQuery = {
        type: 0,
        startTime: moment(
          moment().subtract(6, "days").format("YYYY-MM-DD") + " 00:00:00"
        ).unix(),
        endTime: moment(moment().format("YYYY-MM-DD") + " 23:59:59").unix() + 1,
      };
      this.timeList = [
        this.listQuery.startTime * 1000,
        this.listQuery.endTime * 1000 - 1000,
      ];
      this.getData();
    },
    getElectricityData() {
      (this.chartData1 = {
        xData: [],
        yDataTotalElec: [],
        yDataLoadElec: [],
        yDataPvElec: [],
        yDataFeedNetwork: [],
        yDataBuyElec: [],
      }),
        qryDeviceElectricityData({
          ...this.listQuery,
          deviceId: this.deviceInfo.id,
        }).then((res) => {
          if (res) {
            res.forEach((item) => {
              this.chartData1.xData.push(item.time);
              this.chartData1.yDataTotalElec.push(item.totalElec);
              this.chartData1.yDataLoadElec.push(item.loadElec);
              this.chartData1.yDataPvElec.push(item.pvElec);
              this.chartData1.yDataFeedNetwork.push(item.feedNetwork);
              this.chartData1.yDataBuyElec.push(item.buyElec);
            });
          }
        });
    },
    getIncomeData() {
      (this.chartData2 = {
        xData: [],
        yDataSpontaneousIncome: [],
        yDataSellIncome: [],
        yDataAvgIncome: [],
      }),
        qryDeviceIncomeData({
          ...this.listQuery,
          deviceId: this.deviceInfo.id,
        }).then((res) => {
          if (res) {
            this.money = res.totalIncome;
            res.incomeDataList.forEach((item) => {
              this.chartData2.xData.push(item.time);
              this.chartData2.yDataSpontaneousIncome.push(
                item.spontaneousIncome
              );
              this.chartData2.yDataSellIncome.push(item.sellIncome);
              this.chartData2.yDataAvgIncome.push(item.avgIncome);
            });
          }
        });
    },
    getDevicePowerData() {
      (this.chartData3 = {
        xData: [],
        yDataBattery: [],
        yDataPvElec: [],
        yDataLoadElec: [],
        yDataFeedNetwork: [],
        yDataBuyElec: [],
      }),
        qryDevicePowerData({
          time: this.time / 1000,
          deviceId: this.deviceInfo.id,
        }).then((res) => {
          if (res) {
            res.forEach((item) => {
              this.chartData3.xData.push(item.time);
              this.chartData3.yDataBattery.push(item.battery);
              this.chartData3.yDataPvElec.push(item.pvElec);
              this.chartData3.yDataLoadElec.push(item.loadElec);
              this.chartData3.yDataFeedNetwork.push(item.feedNetwork);
              this.chartData3.yDataBuyElec.push(item.buyElec);
            });
          }
        });
    },
    getDeviceRecordData() {
      qryDevicePowerData({
        time: this.time2 / 1000,
        deviceId: this.deviceInfo.id,
      }).then((res) => {
        if (res) {
          this.recordData = res;
          this.handleRecordData();
        }
      });
    },
    handleRecordData(index) {
      this.chartData4 = {
        xData: [],
        yData: [],
        otherData: {},
      };
      this.paramsIndex = index || 0;
      this.recordData.forEach((item) => {
        this.chartData4.xData.push(item.time);
        const { value } = this.paramsList[this.paramsIndex];
        this.chartData4.yData.push(item[value]);
      });
      this.chartData4.otherData = this.paramsList[this.paramsIndex];
    },
    goBack() {
      this.$emit("back");
    },
    handleSelect(e) {
      this.activeIndex = e;
    },
    handleSizeChange(val) {
      this.pageSize=val;
    },
    handleCurrentChange(val) {
      this.pageNum = val;
    }
  },
};
</script>

<style lang="scss" scoped>
.card-content {
  height: 300px;
}

.tag {
  margin-right: 10px;
  margin-bottom: 10px;
  cursor: pointer;
}

.card2-content {}

.menu {
  /deep/ .el-menu--horizontal>.el-menu-item {
    height: 30px;
    line-height: 30px;
  }
}
</style>
