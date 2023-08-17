<template>
  <div class="app-container calendar-list-container">
    <basic-container>
      <el-page-header @back="goBack" content="设备数据统计"></el-page-header>
      <el-descriptions title="设备信息" style="margin-top: 20px">
        <el-descriptions-item label="设备名称">{{
          deviceInfo.name
        }}</el-descriptions-item>
        <el-descriptions-item label="SN码">{{
          deviceInfo.sn
        }}</el-descriptions-item>
        <el-descriptions-item label="型号名称">{{
          deviceInfo.modelName
        }}</el-descriptions-item>
        <el-descriptions-item label="设备类型">{{
          deviceInfo.type === 0 ? "NB" : "涂鸦"
        }}</el-descriptions-item>
        <el-descriptions-item label="设备状态">{{
          deviceInfo.status | devStatusFilter
        }}</el-descriptions-item>
        <el-descriptions-item label="在线状态">{{
          deviceInfo.onlineStatus | onlineStatusFilter
        }}</el-descriptions-item>
        <el-descriptions-item label="创建时间">{{
          deviceInfo.createTime | parseTime
        }}</el-descriptions-item>
        <el-descriptions-item label="通讯棒软件版本">{{
          deviceInfo.versionNet
        }}</el-descriptions-item>

        <el-descriptions-item label="买电量">{{ deviceInfo.buyElectricity }}kWh</el-descriptions-item>
        <el-descriptions-item label="卖电量">{{ deviceInfo.sellElectricity }}kWh</el-descriptions-item>
        <el-descriptions-item label="光伏发电量">{{ deviceInfo.cumulativeElectricity }}kWh</el-descriptions-item>
        <el-descriptions-item label="总消耗">{{ deviceInfo.totalConsume }}kWh</el-descriptions-item>
        <el-descriptions-item label="累计收益">{{
          deviceInfo.cumulativeIncome
        }}</el-descriptions-item>
        <el-descriptions-item label="PV功率">{{ deviceInfo.pvPower }}W</el-descriptions-item>
        <el-descriptions-item label="设备备注">{{
          deviceInfo.remarks
        }}</el-descriptions-item>
      </el-descriptions>

      <el-descriptions title="用户信息" style="margin-top: 20px">
        <el-descriptions-item label="用户名称">{{
          deviceInfo.bindUserName
        }}</el-descriptions-item>
        <el-descriptions-item label="设备命名">{{
          deviceInfo.bindName
        }}</el-descriptions-item>
        <el-descriptions-item label="绑定时间">{{
          deviceInfo.bindTime | parseTime
        }}</el-descriptions-item>
      </el-descriptions>

      <el-descriptions title="安装商信息" style="margin-top: 20px">
        <el-descriptions-item label="安装商名称">{{
          deviceInfo.installerName
        }}</el-descriptions-item>
        <el-descriptions-item label="设备命名">{{
          deviceInfo.installName
        }}</el-descriptions-item>
        <el-descriptions-item label="安装时间">{{
          deviceInfo.installTime | parseTime
        }}</el-descriptions-item>
      </el-descriptions>

      <div style="margin-top: 20px">
        <el-form :inline="true">
          <el-form-item label="类型">
            <el-select v-model="listQuery.type" placeholder="请选择">
              <el-option label="日" :value="0"></el-option>
              <el-option label="月" :value="1"></el-option>
              <el-option label="年" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="时间范围">
            <el-date-picker v-model="timeList" type="daterange" value-format="timestamp" range-separator="至"
              start-placeholder="开始日期" end-placeholder="结束日期" @change="changeTime">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getData()">搜索</el-button>
            <el-button type="primary" @click="handleReset()">重置</el-button>
          </el-form-item>
        </el-form>
      </div>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-card style="margin-top: 0px">
            <div slot="header">
              <span>用电信息</span>
            </div>
            <div class="card-content">
              <ElectricityData :chartData="chartData1" />
            </div>
          </el-card>
        </el-col>

        <el-col :span="12">
          <el-card style="margin-top: 0px">
            <div slot="header" class="card-header">
              <span>发电收益</span>
              <span style="margin-left: 10px; font-weight: bold">(总收益：￥{{ money || 0 }})</span>
            </div>
            <div class="card-content">
              <IncomeData :chartData="chartData2" />
            </div>
          </el-card>                                                                              
        </el-col>
      </el-row>

      <el-card style="margin-top: 20px">
        <div slot="header">
          <span>实时功率</span>
          <el-date-picker style="margin-left: 10px" @change="getDevicePowerData" v-model="time" type="date"
            value-format="timestamp" placeholder="选择日期">
          </el-date-picker>
        </div>
        <div class="card-content">
          <PowerData :chartData="chartData3" />
        </div>
      </el-card>

      <el-card style="margin-top: 20px">
        <div slot="header">
          <span>实时数据</span>
          <el-date-picker style="margin-left: 10px" @change="getDeviceRecordData" v-model="time2" type="date"
            value-format="timestamp" placeholder="选择日期">
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
              <el-menu-item index="0">表格</el-menu-item>
              <el-menu-item index="1">曲线</el-menu-item>
            </el-menu>
          </div>
          <div v-if="activeIndex === '0'" style="margin-top: 20px;height: 560px">
            <el-table border stripe :data="recordData.slice((pageNum - 1) * pageSize, pageNum * pageSize)">
              <el-table-column align="center" label="时间">
                <template slot-scope="scope">
                  {{ scope.row.time }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="数据内容">
                <template slot-scope="scope">
                  {{ paramsList[paramsIndex].name }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="数值">
                <template slot-scope="scope">
                  {{ scope.row[paramsList[paramsIndex].value] }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="单位">
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
        { name: "DCDC温度", value: "dcdcTemperature", color: "#25C5D9", unit: "℃" },
        { name: "母线电压", value: "busbarVoltage", color: "#FD9F15", unit: "V" },
        { name: "PV1电压", value: "pv1Voltage", color: "#FDCB01", unit: "V" },
        { name: "PV1电流", value: "pv1Current", color: "#89BD77", unit: "A" },
        { name: "PV1功率", value: "pv1Power", color: "#25C5D9", unit: "W" },
        { name: "PV2电压", value: "pv2Voltage", color: "#D17DFD", unit: "V" },
        { name: "PV2电流", value: "pv2Current", color: "#409DFF", unit: "A" },
        { name: "PV2功率", value: "pv2Power", color: "#25C5D9", unit: "W" },
        { name: "电池电压", value: "batteryVoltage", color: "#FD9F15", unit: "V" },
        { name: "电池电流", value: "batteryCurrent", color: "#FDCB01", unit: "A" },

        { name: "电池功率", value: "batteryPower", color: "#D17DFD", unit: "W" },
        { name: "电池总SOC", value: "batteryTotalSoc", color: "#3F9DFF", unit: "%" },
        {
          name: "(A相)电网频率",
          value: "phaseAGridFrequency",
          color: "#89BD77",
          unit: "Hz"
        },
        { name: "(A相)电网电压", value: "phaseAGridVoltage", color: "#FD9F15", unit: "V" },
        { name: "电网有功功率", value: "gridActivePower", color: "#25C5D9", unit: "W" },
        { name: "CT电流", value: "ctCurrent", color: "#3F9DFF", unit: "A" },
        { name: "CT功率", value: "ctPower", color: "#FDCB01", unit: "W" },
        {
          name: "逆变侧温度",
          value: "inverterSideTemperature",
          color: "#3F9DFF",
          unit: "℃"
        },
        {
          name: "(A相)逆变输出频率",
          value: "phaseAInverterOutputFrequency",
          color: "#25C5D9",
          unit: "Hz"
        },
        {
          name: "(A相)逆变输出电压",
          value: "phaseAInverterOutputVoltage",
          color: "#FD9F15",
          unit: "V"
        },

        {
          name: "(A相)逆变输出电流",
          value: "phaseAInverterOutputCurrent",
          color: "#3F9DFF",
          unit: "A"
        },
        {
          name: "(A相)逆变有功功率",
          value: "phaseAInverterActivePower",
          color: "#89BD77",
          unit: "W"
        },
        { name: "(A相)负载电压", value: "phaseALoadVoltage", color: "#FDCB01", unit: "V" },
        { name: "(A相)负载电流", value: "phaseALoadCurrent", color: "#D17DFD", unit: "A" },
        {
          name: "(A相)负载有功功率",
          value: "phaseAActivePower",
          color: "#89BD77",
          unit: "W"
        },
        { name: "负载实时功率", value: "loadRealTimePower", color: "#25C5D9", unit: "W" },
        {
          name: "中间母线电压",
          value: "middleBusbarVoltage",
          color: "#3F9DFF",
          unit: "V"
        },
        { name: "BuckBoost电流", value: "buckBoostCurrent", color: "#FDCB01", unit: "A" },
        {
          name: "继电器中间电压",
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
