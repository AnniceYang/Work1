<template>
  <div class="app-container calendar-list-container">
    <basic-container>
      <el-page-header
        @back="goBack"
        :content="$t('deviceManage.equipmentDataStatistics')"
      >
      </el-page-header>
      <div class="export-container">
        <el-button
          v-if="isAdmin"
          class="export"
          type="primary"
          icon="el-icon-download"
          @click="showExportModal"
          >{{ $t("common.export") }}</el-button
        >

        <!-- Export Modal -->
        <el-dialog
          :title="$t('common.export')"
          :visible.sync="exportModalVisible"
          width="400px"
        >
          <el-form label-width="80px" :model="exportOptions">
            <el-form-item :label="$t('common.selectDataPage')">
              <el-select
                v-model="exportOptions.selectedPage"
                :placeholder="$t('common.selectPrompt')"
              >
                <!-- <el-option
                    :label="$t('common.exportNecessaryInfo')"
                    value="necessaryInfo"
                  ></el-option> -->
                <el-option
                  :label="`${$t('deviceManage.versionInfo')}(${$t(
                    'common.page'
                  )}31)`"
                  value="tpPage31"
                ></el-option>
                <el-option
                  :label="`${$t('deviceManage.energyFlowChart')}(${$t(
                    'common.page'
                  )}33)`"
                  value="tpPage33"
                ></el-option>
                <el-option
                  :label="`${$t('deviceManage.electricityInformation')}(${$t(
                    'common.page'
                  )}34)`"
                  value="tpPage34"
                ></el-option>
                <el-option
                  :label="`${$t('deviceManage.realTimePower')}(${$t(
                    'common.page'
                  )}35)`"
                  value="tpPage35"
                ></el-option>
                <el-option
                  :label="`${$t('deviceManage.monitorData')}(${$t(
                    'common.page'
                  )}41)`"
                  value="tpPage41"
                ></el-option>
                <el-option
                  :label="`${$t('deviceManage.primaryControlData')}(${$t(
                    'common.page'
                  )}42)`"
                  value="tpPage42"
                ></el-option>
                <el-option
                  :label="`${$t('deviceManage.meterData')}(${$t(
                    'common.page'
                  )}43)`"
                  value="tpPage43"
                ></el-option>
                <el-option
                  :label="`${$t('deviceManage.eastBCUData')}(${$t(
                    'common.page'
                  )}44)`"
                  value="tpPage44"
                ></el-option>
                <el-option
                  :label="`${$t('deviceManage.eastBMSData')}(${$t(
                    'common.page'
                  )}45)`"
                  value="tpPage45"
                ></el-option>
                <el-option
                  :label="`${$t('deviceManage.deviceInformation')}(${$t(
                    'common.page'
                  )}46)`"
                  value="tpPage46"
                ></el-option>
                <el-option
                  :label="`${$t('deviceManage.monitorSettings')}(${$t(
                    'common.page'
                  )}47)`"
                  value="tpPage47"
                ></el-option>
                <el-option
                  :label="`${$t('deviceManage.masterUser')}(${$t(
                    'common.page'
                  )}48)`"
                  value="tpPage48"
                ></el-option>
                <el-option
                  :label="`${$t('deviceManage.scheduledSettings')}(${$t(
                    'common.page'
                  )}49)`"
                  value="tpPage49"
                ></el-option>

                <el-option
                  :label="$t('faultInfo.alarmInfo')"
                  value="alarm"
                ></el-option>
                <el-option
                  :label="$t('common.onoffline')"
                  value="onoffline"
                ></el-option>
                <el-option
                  :label="$t('common.upgradeResult')"
                  value="upgradeResult"
                ></el-option>
                <!-- <el-option
                    :label="$t('common.userLoginLogs')"
                    value="login"
                  ></el-option> -->
              </el-select>
            </el-form-item>
          </el-form>

          <div style="text-align: center; margin-top: 20px">
            <el-button type="primary" @click="exportData">{{
              $t("common.export")
            }}</el-button>
            <el-button @click="hideExportModal">{{
              $t("common.cancel")
            }}</el-button>
          </div>
        </el-dialog>
      </div>

      <el-descriptions
        :title="$t('deviceManage.deviceInformation')"
        style="margin-top: 20px"
      >
        <!-- 升级结果弹窗 -->
        <el-dialog
          title="Upgrade Result"
          :visible.sync="isUpgradeResultVisible"
          width="30%"
          @close="handleDialogClose"
        >
          <span>{{ upgradeResultMessage }}</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="isUpgradeResultVisible = false">Close</el-button>
          </span>
        </el-dialog>

        <el-descriptions-item :label="$t('deviceManage.deviceName')">{{
          deviceInfo.name
        }}</el-descriptions-item>
        <el-descriptions-item :label="$t('deviceManage.snCode')"
          >{{ deviceInfo.sn }}
          <span style="margin-left: 15px"></span>
          <el-button
            v-if="isAdmin"
            class="unbind"
            icon="el-icon-more"
            @click="showEnergyFlow"
            >{{ $t("deviceManage.energyFlow") }}</el-button
          >

          <el-dialog
            :visible.sync="showFlowDialog"
            :title="$t('deviceManage.energyFlow')"
            :close-on-click-modal="false"
            @close="stopEnergyFlow"
            class="energy-flow-dialog"
            width="700px"
          >
            <div class="energy-flow-container">
              <template v-if="loading">
                <el-spin tip="Loading..." />
                <p>{{ $t("deviceManage.loadingMessage") }}</p>
              </template>
              <template v-else>
                <div class="energy-flow-content">
                  <!-- 上部文字和数值 -->
                  <div class="flow-item top">
                    <span class="flow-text">{{ $t("energyFlow.pv") }}</span>
                    <span class="flow-value"
                      >{{ energyFlowData.pvPower }} W</span
                    >
                  </div>

                  <!-- 下部文字和数值 -->
                  <div class="flow-item bottom">
                    <span class="flow-text">{{
                      $t("energyFlow.battery")
                    }}</span>
                    <span class="flow-value"
                      >{{ energyFlowData.batteryPower }} W</span
                    >
                  </div>

                  <!-- 左部文字和数值 -->
                  <div class="flow-item left">
                    <span class="flow-text">{{ $t("energyFlow.grid") }}</span>
                    <span class="flow-value"
                      >{{ energyFlowData.gridPower }} W</span
                    >
                  </div>

                  <!-- 右部文字和数值 -->
                  <div class="flow-item right">
                    <span class="flow-text">{{ $t("energyFlow.load") }}</span>
                    <span class="flow-value"
                      >{{ energyFlowData.loadPower }} W</span
                    >
                  </div>

                  <!-- 图片 -->
                  <img
                    :src="currentGif"
                    alt="Energy Flow"
                    class="energy-flow-img"
                  />
                </div>
              </template>
            </div>
          </el-dialog>
        </el-descriptions-item>
        <el-descriptions-item :label="$t('deviceManage.modelName')">{{
          deviceInfo.modelName
        }}</el-descriptions-item>
        <!-- <el-descriptions-item label="设备类型">{{
            deviceInfo.type === 0 ? "NB" : "涂鸦"
          }}</el-descriptions-item> -->
        <el-descriptions-item :label="$t('deviceManage.deviceStatus')">{{
          devStatusFilter[deviceInfo.status]
        }}</el-descriptions-item>

        <el-descriptions-item :label="$t('deviceManage.deviceStatus1')">{{
          getDeviceStatusWithupgradeProgress()
        }}</el-descriptions-item>
        <el-descriptions-item :label="$t('common.createTime')">{{
          deviceInfo.createTime | parseTime
        }}</el-descriptions-item>
        <el-descriptions-item
          :label="$t('deviceManage.communicationStickSoftwareVersion')"
          >{{ deviceInfo.versionNet }}</el-descriptions-item
        >

        <el-descriptions-item :label="$t('versionManage.inverterDSP')">{{
          deviceInfo.versionDsp
        }}</el-descriptions-item>
        <el-descriptions-item :label="$t('versionManage.Dsp2')">{{
          deviceInfo.versionDsp2
        }}</el-descriptions-item>
        <el-descriptions-item :label="$t('versionManage.inverterMCU')">{{
          deviceInfo.versionMcu
        }}</el-descriptions-item>
        <!-- <el-descriptions-item :label="$t('versionManage.bcu')">{{
          deviceInfo.versionBcu
        }}</el-descriptions-item>
        <el-descriptions-item :label="$t('versionManage.battery')">{{
          deviceInfo.versionBat
        }}</el-descriptions-item> -->

        <!-- <el-descriptions-item :label="$t('deviceManage.buyingElectricity')"
          >{{ deviceInfo.buyElectricity }}kWh</el-descriptions-item
        >
        <el-descriptions-item :label="$t('deviceManage.sellingElectricity')"
          >{{ deviceInfo.sellElectricity }}kWh</el-descriptions-item
        >
        <el-descriptions-item
          :label="$t('deviceManage.photovoltaicPowerGeneration')"
          >{{ deviceInfo.cumulativeElectricity }}kWh</el-descriptions-item
        >
        <el-descriptions-item :label="$t('deviceManage.totalConsumption')"
          >{{ deviceInfo.totalConsume }}kWh</el-descriptions-item
        >
        <el-descriptions-item :label="$t('deviceManage.cumulativeGain')">{{
          deviceInfo.cumulativeIncome
        }}</el-descriptions-item>
        <el-descriptions-item :label="$t('deviceManage.pvPower')"
          >{{ deviceInfo.pvPower }}W</el-descriptions-item
        >
        <el-descriptions-item :label="$t('deviceManage.equipmentRemarks')">{{
          deviceInfo.remarks
        }}</el-descriptions-item> -->

        <el-descriptions-item :label="$t('deviceManage.wifiFourRod')">{{
          deviceInfo.wifiFourRod == 1
            ? $t("deviceManage.wifi")
            : deviceInfo.wifiFourRod === 4
            ? $t("deviceManage.fourGmodel")
            : ""
        }}</el-descriptions-item>

        <el-descriptions-item :label="$t('deviceManage.tpType')">{{
          deviceInfo.tpType == 1
            ? $t("deviceManage.hm6Version")
            : deviceInfo.tpType === 3
            ? $t("deviceManage.threephaseVersion")
            : ""
        }}</el-descriptions-item>

        <el-descriptions-item :label="$t('deviceManage.energyFlowSwitch')">{{
          deviceInfo.energyFlowSwitch == 0
            ? $t("menuManage.close")
            : $t("menuManage.open")
        }}</el-descriptions-item>
        <el-descriptions-item
          :label="$t('deviceManage.batteryConditionSwitch')"
          >{{
            deviceInfo.batteryConditionSwitch == 0
              ? $t("menuManage.close")
              : $t("menuManage.open")
          }}</el-descriptions-item
        >
      </el-descriptions>

      <el-descriptions
        :title="$t('deviceManage.userInformation')"
        style="margin-top: 20px"
      >
        <el-descriptions-item :label="$t('deviceManage.userName')"
          >{{ deviceInfo.bindUserName }}

          <span style="margin-left: 15px"></span>
          <el-button
            v-if="isAdmin"
            class="unbind"
            type="danger"
            icon="el-icon-delete"
            @click="showUnbindModal('user')"
            >{{ $t("common.unbind") }}</el-button
          >
        </el-descriptions-item>

        <el-descriptions-item :label="$t('deviceManage.deviceName')">{{
          deviceInfo.bindName
        }}</el-descriptions-item>
        <el-descriptions-item :label="$t('deviceManage.bindingTime')">{{
          deviceInfo.bindTime | parseTime
        }}</el-descriptions-item>
      </el-descriptions>

      <div
        class="installer-container"
        style="display: flex; align-items: center"
      >
        <el-descriptions
          :title="$t('deviceManage.installerInformation')"
          style="margin-top: 20px"
        >
          <el-descriptions-item :label="$t('deviceManage.installerName')"
            >{{ deviceInfo.installerName }}
            <span style="margin-left: 15px"></span>
            <el-button
              v-if="isAdmin"
              class="unbind"
              type="danger"
              icon="el-icon-delete"
              @click="showUnbindModal('agent')"
              >{{ $t("common.unbind") }}</el-button
            >
          </el-descriptions-item>

          <el-descriptions-item :label="$t('deviceManage.deviceName')">{{
            deviceInfo.installName
          }}</el-descriptions-item>
          <el-descriptions-item :label="$t('deviceManage.installationTime')">{{
            deviceInfo.installTime | parseTime
          }}</el-descriptions-item>
        </el-descriptions>
      </div>

      <div style="margin-top: 20px">
        <el-form :inline="true">
          <el-form-item :label="$t('deviceManage.type')">
            <el-select
              v-model="listQuery.type"
              :placeholder="$t('common.selectPrompt')"
              @change="handleTypeChange"
            >
              <el-option :label="$t('deviceManage.day')" :value="0"></el-option>
              <el-option
                :label="$t('deviceManage.month')"
                :value="1"
              ></el-option>
              <el-option
                :label="$t('deviceManage.year')"
                :value="2"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            v-if="listQuery.type === 2"
            :label="$t('deviceManage.timeFrame')"
          >
            <el-date-picker
              v-model="startYear"
              type="year"
              :start-placeholder="$t('common.startingTime')"
              size="mini"
              format="yyyy"
              value-format="yyyy"
              @change="changeYearRange('start', startYear)"
              append-to-body
              style="width: 100px; margin-right: 5px"
            />
            <span>{{ $t("deviceManage.to") }}</span>
            <el-date-picker
              v-model="endYear"
              type="year"
              :end-placeholder="$t('common.endTime')"
              size="mini"
              format="yyyy"
              value-format="yyyy"
              @change="changeYearRange('end', endYear)"
              append-to-body
              style="width: 100px; margin-right: 5px"
            />
          </el-form-item>

          <el-form-item v-else :label="$t('deviceManage.timeFrame')">
            <el-date-picker
              v-model="timeList"
              :type="datePickerType"
              value-format="timestamp"
              :range-separator="$t('deviceManage.to')"
              :start-placeholder="$t('common.startingTime')"
              :end-placeholder="$t('common.endTime')"
              @change="changeTime"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getData()">{{
              $t("common.search")
            }}</el-button>
            <el-button type="primary" @click="handleReset()">{{
              $t("common.reset")
            }}</el-button>
          </el-form-item>
        </el-form>
      </div>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-card style="margin-top: 0px">
            <div slot="header">
              <span>{{ $t("deviceManage.electricityInformation") }}</span>
            </div>
            <div class="card-content">
              <ElectricityData :chartData="chartData1" />
            </div>
          </el-card>
        </el-col>

        <el-col :span="12">
          <el-card style="margin-top: 0px">
            <div slot="header" class="card-header">
              <span>{{ $t("deviceManage.powerGenerationRevenue") }}</span>
              <span style="margin-left: 10px; font-weight: bold"
                >({{ $t("deviceManage.totalRevenue") }}：{{ money || 0 }})</span
              >
            </div>
            <div class="card-content">
              <IncomeData :chartData="chartData2" />
            </div>
          </el-card>
        </el-col>
      </el-row>

      <el-card class="card3-content" style="margin-top: 20px">
        <div slot="header">
          <span>{{ $t("deviceManage.realTimePower") }}</span>
          <el-date-picker
            style="margin-left: 10px"
            @change="getDevicePowerData"
            v-model="time"
            type="date"
            value-format="timestamp"
            :placeholder="$t('common.selectPrompt')"
          >
          </el-date-picker>
        </div>
        <div class="card-content">
          <PowerData :chartData="chartData3" />
        </div>
      </el-card>

      <!-- <el-card v-if="isAdmin" style="margin-top: 20px">
          <div slot="header">
            <span>{{ $t("deviceManage.realTime") }}</span>
            <el-date-picker
              style="margin-left: 10px"
              @change="getDeviceRecordData"
              v-model="time2"
              type="date"
              value-format="timestamp"
              :placeholder="$t('common.selectPrompt')"
            >
            </el-date-picker>
          </div>
          <div class="card2-content">
            <div>
              <el-tag
                class="tag"
                v-for="(item, index) in paramsList"
                :key="item.value"
                :type="paramsIndex === index ? '' : 'info'"
                @click="handleRecordData(index)"
                effect="plain"
              >
                {{ item.name }}
              </el-tag>
            </div>
            <div class="menu">
              <el-menu
                :default-active="activeIndex"
                mode="horizontal"
                @select="handleSelect"
              >
                <el-menu-item index="0">{{
                  $t("deviceManage.table")
                }}</el-menu-item>
                <el-menu-item index="1">{{
                  $t("deviceManage.curve")
                }}</el-menu-item>
              </el-menu>
            </div>
            <div
              v-if="activeIndex === '0'"
              style="margin-top: 20px; height: 560px"
            >
              <el-table
                border
                stripe
                :data="
                  recordData.slice((pageNum - 1) * pageSize, pageNum * pageSize)
                "
              >
                <el-table-column align="center" :label="$t('deviceManage.time')">
                  <template slot-scope="scope">
                    {{ scope.row.time }}
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  :label="$t('deviceManage.dataContent')"
                >
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
            <div
              v-if="activeIndex === '1'"
              style="margin-top: 20px; height: 560px"
            >
              <RecordData :chartData="chartData4" />
            </div>
          </div>
        </el-card> -->
    </basic-container>
  </div>
</template>

<script>
import {
  qryDeviceElectricityData,
  qryDeviceIncomeData,
  qryDevicePowerData,
  qryDevicePowerDataTable,
  unbindAgent,
  unbindUser,
  getConfigData,
  qryDeviceBind,
} from "@/api/device";
import ElectricityData from "./electricityData.vue";
import IncomeData from "./incomeData.vue";
import PowerData from "./powerData.vue";
import RecordData from "./recordData.vue";
import moment from "moment";

import { baseUrl } from "@/config/env";
import axios from "axios";
import { mapState, mapActions } from "vuex";

import { baseMqtt } from "@/config/env";

const mqtt = require("mqtt/dist/mqtt.js");
export default {
  components: { ElectricityData, IncomeData, PowerData, RecordData },

  computed: {
    isAdmin() {
      return this.$store.state.user.roles.includes("1");
    },

    requireDateSelection() {
      const selectedPage = this.exportOptions.selectedPage;
      const pagesWithDateSelection = ["page3", "page7", "page9", "page13"];
      return pagesWithDateSelection.includes(selectedPage);
    },

    ...mapState({
      userInfo: (state) => state.user.userInfo,
    }),
  },

  data() {
    return {
      exportModalVisible: false,
      exportOptions: {
        selectedPage: null,
      },
      exportDate: [],
      type: "",
      date: "",

      deviceInfo: {},
      devStatusFilter: [
        this.$t("userManage.normal"),
        this.$t("deviceManage.maintenance"),
        this.$t("deviceManage.offline"),
        this.$t("deviceManage.error"),
      ],
      onlineStatusFilter: [
        this.$t("deviceManage.offline"),
        this.$t("deviceManage.online"),
        this.$t("deviceManage.updating"),
      ],
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
        yDataBatteryTotalSoc: [],
      },
      chartData4: {
        xData: [],
        yData: [],
        otherData: {},
      },
      money: 0,
      listQuery: {
        type: 0,
        startTime: "",
        endTime: "",
      },
      time: "",
      time2: "",
      startYear: null,
      endYear: null,
      timeList: [],
      datePickerType: "daterange",
      paramsList: [
        {
          name: this.$t("deviceManage.dcdcTemperature"),
          value: "dcdcTemperature",
          color: "#25C5D9",
          unit: "℃",
        },
        {
          name: this.$t("deviceManage.busbarVoltage"),
          value: "busbarVoltage",
          color: "#FD9F15",
          unit: "V",
        },
        {
          name: this.$t("deviceManage.pv1Voltage"),
          value: "pv1Voltage",
          color: "#FDCB01",
          unit: "V",
        },
        {
          name: this.$t("deviceManage.pv1Current"),
          value: "pv1Current",
          color: "#89BD77",
          unit: "A",
        },
        {
          name: this.$t("deviceManage.pv1Power"),
          value: "pv1Power",
          color: "#25C5D9",
          unit: "W",
        },
        {
          name: this.$t("deviceManage.pv2Voltage"),
          value: "pv2Voltage",
          color: "#D17DFD",
          unit: "V",
        },
        {
          name: this.$t("deviceManage.pv2Current"),
          value: "pv2Current",
          color: "#409DFF",
          unit: "A",
        },
        {
          name: this.$t("deviceManage.pv2Power"),
          value: "pv2Power",
          color: "#25C5D9",
          unit: "W",
        },
        {
          name: this.$t("deviceManage.batteryVoltage"),
          value: "batteryVoltage",
          color: "#FD9F15",
          unit: "V",
        },
        {
          name: this.$t("deviceManage.batteryCurrent"),
          value: "batteryCurrent",
          color: "#FDCB01",
          unit: "A",
        },

        {
          name: this.$t("deviceManage.batteryPower"),
          value: "batteryPower",
          color: "#D17DFD",
          unit: "W",
        },
        {
          name: this.$t("deviceManage.batteryTotalSoc"),
          value: "batteryTotalSoc",
          color: "#3F9DFF",
          unit: "%",
        },
        {
          name: this.$t("deviceManage.phaseAGridFrequency"),
          value: "phaseAGridFrequency",
          color: "#89BD77",
          unit: "Hz",
        },
        {
          name: this.$t("deviceManage.phaseAGridVoltage"),
          value: "phaseAGridVoltage",
          color: "#FD9F15",
          unit: "V",
        },
        {
          name: this.$t("deviceManage.gridActivePower"),
          value: "gridActivePower",
          color: "#25C5D9",
          unit: "W",
        },
        {
          name: this.$t("deviceManage.ctCurrent"),
          value: "ctCurrent",
          color: "#3F9DFF",
          unit: "A",
        },
        {
          name: this.$t("deviceManage.ctPower"),
          value: "ctPower",
          color: "#FDCB01",
          unit: "W",
        },
        {
          name: this.$t("deviceManage.inverterSideTemperature"),
          value: "inverterSideTemperature",
          color: "#3F9DFF",
          unit: "℃",
        },
        {
          name: this.$t("deviceManage.phaseAInverterOutputFrequency"),
          value: "phaseAInverterOutputFrequency",
          color: "#25C5D9",
          unit: "Hz",
        },
        {
          name: this.$t("deviceManage.phaseAInverterOutputVoltage"),
          value: "phaseAInverterOutputVoltage",
          color: "#FD9F15",
          unit: "V",
        },

        {
          name: this.$t("deviceManage.phaseAInverterOutputCurrent"),
          value: "phaseAInverterOutputCurrent",
          color: "#3F9DFF",
          unit: "A",
        },
        {
          name: this.$t("deviceManage.phaseAInverterActivePower"),
          value: "phaseAInverterActivePower",
          color: "#89BD77",
          unit: "W",
        },
        {
          name: this.$t("deviceManage.phaseALoadVoltage"),
          value: "phaseALoadVoltage",
          color: "#FDCB01",
          unit: "V",
        },
        {
          name: this.$t("deviceManage.phaseALoadCurrent"),
          value: "phaseALoadCurrent",
          color: "#D17DFD",
          unit: "A",
        },
        {
          name: this.$t("deviceManage.phaseALoadActivePower"),
          value: "phaseAActivePower",
          color: "#89BD77",
          unit: "W",
        },
        {
          name: this.$t("deviceManage.loadRealTimePower"),
          value: "loadRealTimePower",
          color: "#25C5D9",
          unit: "W",
        },
        {
          name: this.$t("deviceManage.middleBusbarVoltage"),
          value: "middleBusbarVoltage",
          color: "#3F9DFF",
          unit: "V",
        },
        {
          name: this.$t("deviceManage.buckBoostCurrent"),
          value: "buckBoostCurrent",
          color: "#FDCB01",
          unit: "A",
        },
        {
          name: this.$t("deviceManage.electricRelayMiddleVoltage"),
          value: "electricRelayMiddleVoltage",
          color: "#D17DFD",
          unit: "V",
        },
      ],
      recordData: [],
      pageNum: 1,
      pageSize: 10,
      paramsIndex: 0,
      activeIndex: "0",

      loading: false,
      // mqtt
      mqttClient: null,
      connectState: "init",
      interObj: null,

      upgradeProgress: null, //用来存储upgradeProgress
      fl: null,
      fileLength: null,
      oc: null,
      otaCrc: null,
      isUpgradeResultVisible: false,
      upgradeResultMessage: "",

      showFlowDialog: false,
      energyFlowData: {},
      currentGif: "",
      loading: false,
      flowUpdateInterval: null,
    };
  },
  methods: {
    //点击显示解绑确认弹窗的逻辑

    showUnbindModal(type) {
      let confirmText = "";
      let unbindFunction = null;
      const id = this.deviceInfo.id;

      if (type === "agent") {
        confirmText = this.$t("common.sureUnbindAgent");
        unbindFunction = unbindAgent;
      } else if (type === "user") {
        confirmText = this.$t("common.sureUnbindUser");
        unbindFunction = unbindUser;
      }

      this.$confirm(confirmText, this.$t("common.confirm"), {
        confirmButtonText: this.$t("common.confirm"),
        cancelButtonText: this.$t("common.cancel"),
        type: "warning",
      })
        .then(() => {
          unbindFunction({ id }).then((response) => {
            if (response) {
              qryDeviceBind({ id }).then((deviceInfoResponse) => {
                if (deviceInfoResponse) {
                  this.deviceInfo = deviceInfoResponse; // 更新设备信息
                  this.$message.success(this.$t("common.successfullyUnbind"));
                } else {
                  this.$message.error(this.$t("common.failedUpdateDeviceInfo"));
                }
              });
            } else {
              this.$message.error(this.$t("common.failedUnbind"));
            }
          });
        })
        .catch(() => {
          this.$message.error("An error occurred.");
        });
    },

    showExportModal() {
      this.exportModalVisible = true;
    },
    hideExportModal() {
      this.exportModalVisible = false;
    },

    exportData() {
      const page = this.exportOptions.selectedPage;
      const deviceId = this.deviceInfo.sn;

      let exportUrl = `${baseUrl}/excel/${page}/${deviceId}`;
      if (
        this.requireDateSelection &&
        this.exportDate &&
        this.exportDate.length > 0
      ) {
        const formattedStartDate = moment(
          this.exportDate[0].format("yyyy-MM-dd")
        );
        exportUrl += `/${formattedStartDate}`;
      }

      window.open(exportUrl, "_blank");

      this.hideExportModal();
    },

    init(info) {
      console.log("init", info);
      this.deviceInfo = { ...info };
      console.log("设备信息：", this.deviceInfo);
      this.handleMqttInit();
      // if (this.deviceInfo.onlineStatus === 1) {
      //   this.handleMqttInit();
      // } else {
      //   // this.$message.info("设备不在线");
      //   console.log("这个设备不在线");
      // }

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

    getDeviceStatusWithupgradeProgress() {
      const deviceStatus =
        this.onlineStatusFilter[this.deviceInfo.onlineStatus];
      let statusDisplay = deviceStatus;

      // Check if onlineStatus is 2 and user is an admin
      if (this.deviceInfo.onlineStatus === 2 && this.isAdmin) {
        // Handle undefined or null upgradeProgress
        const upgradeProgress = this.upgradeProgress || 0;
        let upgradeProgressDisplay = `(${upgradeProgress}%)`;
        let additionalInfo = "";

        // Use 0 as fallback for undefined or null values
        const fl = this.fl || 0;
        const fileLength = this.fileLength || 0;
        const oc = this.oc || 0;
        const otaCrc = this.otaCrc || 0;

        // Generate additional info string
        additionalInfo = ` (原文件: ${fl}, 收到文件: ${fileLength}, 下发CRC: ${oc}, 收到CRC: ${otaCrc})`;

        statusDisplay = `${deviceStatus} ${upgradeProgressDisplay}${additionalInfo}`;
      }

      return statusDisplay;
    },

    showEnergyFlow() {
      if (this.deviceInfo.onlineStatus === 1) {
        this.loading = true;
        this.showFlowDialog = true; // 显示对话框
        this.initEnergyFlow(); // 初始化能流图
      } else {
        this.$message.warning("设备不在线，无法显示能流图");
      }
    },

    startFlowUpdate() {
      this.getEnergyFlowData();
      if (this.flowUpdateInterval) {
        clearInterval(this.flowUpdateInterval); // 清除已有定时器
      }

      this.flowUpdateInterval = setInterval(() => {
        this.getEnergyFlowData();
      }, 5000);
    },

    // 停止能流图监听
    stopEnergyFlow() {
      this.showFlowDialog = false; // 关闭弹窗
      this.loading = false;
      if (this.flowUpdateInterval) {
        clearInterval(this.flowUpdateInterval);
        this.flowUpdateInterval = null;
      }
      if (this.mqttClient) {
        this.mqttClient.end(true, () => {
          console.log("MQTT 连接已断开");
        });
        this.mqttClient = null;
      }
    },

    getEnergyFlowData() {
      getConfigData({
        deviceId: this.deviceInfo.id,
        val: 33,
      })
        .then((response) => {
          this.loading = false;

          console.log("每 5 秒请求到的数据：", response);
        })
        .catch((error) => {
          this.loading = false;
          console.error("获取数据失败：", error);
        });
    },

    //初始化能流图数据监听
    initEnergyFlow() {
      if (this.deviceInfo.onlineStatus === 1) {
        this.mqttClient = mqtt.connect(baseMqtt, {
          protocolVersion: 4,
          reconnectPeriod: 1000,
          connectTimeout: 30 * 1000,
          resubscribe: true,
          keepalive: 3,
          clientId: "mqttjs_" + Math.random().toString(16).substr(2, 8),
        });

        this.mqttClient.on("connect", (res) => {
          this.connectState = "connect";
          this.subscribeEnergyFlowInfo(); //初次订阅
          console.log("mqtt连接成功", res);
        });

        this.mqttClient.on("message", (topic, message) => {
          const messageInfo = JSON.parse(message.toString());

          if (messageInfo.msgOperation === 5 && messageInfo.valType === 33) {
            const valData = JSON.parse(messageInfo.val);

            this.updateEnergyFlow(valData);
          }
        });
      } else {
        console.log("设备不在线状态，跳过MQTT连接");
      }
    },

    // 订阅EnergyFlow
    subscribeEnergyFlowInfo() {
      if (!this.mqttClient || this.connectState !== "connect") {
        console.log("====通讯未连接=====");
        this.toast("通讯未连接");
        return;
      }

      let subscriptionTimeout = setTimeout(() => {
        console.log("订阅主题超时");
      }, 3000);

      this.mqttClient.subscribe(
        `/APP/${this.deviceInfo.id}/NEWS`,
        (err, granted) => {
          if (!err) {
            clearTimeout(subscriptionTimeout);
            console.log("===订阅主题 订阅成功===");
            // 仅在需要时获取数据
            this.startFlowUpdate(); // 可选：根据你的逻辑决定是否需要调用
          }
        }
      );
    },

    updateEnergyFlow(data) {
      console.log(data, "接收到 page33 数据");

      // 根据接收到的能流图数据更新界面
      this.energyFlowData = {
        ...data,
        pvPower: data.pvPower || 0,
        gridPower: data.gridPower || 0,
        loadPower: data.loadPower || 0,
        batteryPower: data.batteryPower || 0,
      };

      let flowValue;
      try {
        if (data.flowTwo && this.isFlowValid(data.flowTwo)) {
          // 如果没有 flowOne 数据，则处理 flowTwo 数据
          flowValue = this.calculateFlow2Value(data.flowTwo);
          this.currentGif = `/img/threePhaseEnergyflowgif/detail_${flowValue}.gif`;
        } else {
          // 如果没有任何能流数据
          throw new Error("没有可用的能流数据");
        }

        console.log("计算的能流值：", flowValue);
        console.log("加载的 GIF 路径：", this.currentGif);
        this.loading = false;
      } catch (error) {
        console.error("加载 GIF 失败：", error);
        this.currentGif = null; // 处理错误路径
        this.loading = false;
      }
    },

    isFlowValid(flow) {
      // 校验 flow 数据是否有效（长度足够且不全是 0）
      return flow.length >= 16 && flow.some((bit) => bit !== 0);
    },

    calculateFlow2Value(flowTwo) {
      if (flowTwo && flowTwo.length >= 16) {
        // 根据位段定义解析各字段
        const batteryToLoad = parseInt(`${flowTwo[4]}${flowTwo[5]}`, 2); // BIT11 BIT10
        const gridToBattery = parseInt(`${flowTwo[6]}${flowTwo[7]}`, 2); // BIT9 BIT8
        const gridToLoad = parseInt(`${flowTwo[8]}${flowTwo[9]}`, 2); // BIT7 BIT6
        const pvToLoad = parseInt(`${flowTwo[10]}${flowTwo[11]}`, 2); // BIT5 BIT4
        const pvToBattery = parseInt(`${flowTwo[12]}${flowTwo[13]}`, 2); // BIT3 BIT2
        const pvToGrid = parseInt(`${flowTwo[14]}${flowTwo[15]}`, 2); // BIT1 BIT0

        // 将各字段按顺序拼接成字符串返回
        return `${batteryToLoad}${gridToBattery}${gridToLoad}${pvToLoad}${pvToBattery}${pvToGrid}`;
      }
      return "000000"; // 默认值（6个状态）
    },

    // mqtt初始化
    handleMqttInit() {
      if (this.deviceInfo.onlineStatus === 2) {
        this.mqttClient = mqtt.connect(baseMqtt, {
          protocolVersion: 4,
          reconnectPeriod: 1000,
          connectTimeout: 30 * 1000,
          resubscribe: true,
          keepalive: 60,
          clientId: "mqttjs_" + Math.random().toString(16).substr(2, 8),
        });

        this.mqttClient.on("connect", (res) => {
          this.connectState = "connect";
          this.subscribeInfo();
          console.log("mqtt连接成功", res);
        });

        this.mqttClient.on("message", (topic, message) => {
          const messageInfo = JSON.parse(message.toString());
          if (messageInfo.msgOperation === 5 && messageInfo.valType === 31) {
            const valData = JSON.parse(messageInfo.val);
            this.paramsChange(valData);
          }
        });
      } else {
        console.log("设备不在升级状态，跳过MQTT连接");
      }
    },

    // 订阅主题 /APP/设备id/NEWS
    subscribeInfo() {
      if (!this.mqttClient || this.connectState !== "connect") {
        console.log("====通讯未连接=====");
        this.toast("通讯未连接");

        return;
      }

      //超时处理
      let subscriptionTimeout = setTimeout(() => {
        console.log("订阅主题超时");
      }, 3000);

      this.mqttClient.subscribe(
        `/APP/${this.deviceInfo.id}/NEWS`,
        (err, granted) => {
          // console.log('订阅主题', `/APP/${this.deviceInfo.id}/NEWS`, err, granted)
          if (!err) {
            clearTimeout(subscriptionTimeout);
            console.log("===订阅主题 订阅成功===");
            //在订阅成功后尝试获取数据
            this.getData();
          }
        }
      );
    },

    // 数据处理转换
    paramsChange(res) {
      console.log(res, "res------收到啥？");
      this.upgradeProgress = res.upgradeProgress;
      this.fl = res.fl;
      this.fileLength = res.fileLength;
      this.oc = res.oc;
      this.otaCrc = res.otaCrc;

      if (res.upgradeResult) {
        this.upgradeResultMessage = res.upgradeResult;
        this.isUpgradeResultVisible = true;
      }
    },

    handleDialogClose() {
      this.isUpgradeResultVisible = false;
    },

    handleTypeChange() {
      if (this.listQuery.type === 0) {
        this.datePickerType = "daterange";
      } else if (this.listQuery.type === 1) {
        this.datePickerType = "monthrange";
      } else if (this.listQuery.type === 2) {
        this.datePickerType = "year";
      }
    },

    //处理年份范围选择
    changeYearRange(picker, value) {
      if (picker === "start") {
        // Update startYear, validate it against endYear
        const startYearTimestamp = new Date(value, 0, 1, 0, 0, 0).getTime();
        if (this.endYear && value > this.endYear) {
          this.$message.error(this.$t("deviceManage.startYearError")); // Error message
          return;
        }
        this.listQuery.startTime = startYearTimestamp / 1000;
        this.startYear = value; // Update the start year value
        this.listQuery.startDate = `${value}-01-01`;
      } else if (picker === "end") {
        // Update endYear, validate it against startYear
        const endYearTimestamp = new Date(value, 11, 31, 23, 59, 59).getTime();
        if (this.startYear && value < this.startYear) {
          this.$message.error(this.$t("deviceManage.endYearError")); // Error message
          return;
        }
        this.listQuery.endTime = endYearTimestamp / 1000;
        this.endYear = value; // Update the end year value
        this.listQuery.endDate = `${value}-12-31`;
      }
    },

    //校验年份范围
    validateYearRange() {
      if (this.listQuery.type === 2) {
        if (this.startYear > this.endYear) {
          return false;
        }
      }
      return true;
    },

    getData() {
      if (!this.validateYearRange()) {
        return;
      }
      this.getElectricityData();
      this.getIncomeData();
    },
    changeTime(e) {
      if (e) {
        const type = this.listQuery.type;
        if (type === 0) {
          this.listQuery.startTime = e[0] / 1000;
          this.listQuery.endTime = e[1] / 1000 + 86400;
        } else if (type === 1) {
          const startMonth = new Date(
            e[0].getFullYear(),
            e[0].getMonth(),
            1
          ).getTime();
          const endMonth = new Date(
            e[1].getFullYear(),
            e[1].getMonth() + 1,
            1
          ).getTime();

          this.listQuery.startTime = startMonth / 1000;
          this.listQuery.endTime = endMonth / 1000;
        }
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
      this.datePickerType = "daterange";
      this.getData();
    },
    getElectricityData() {
      let startDate, endDate;

      //判断选择的查询类型是否为按年查询
      if (this.listQuery.type === 2) {
        startDate = `${this.startYear}-01-01`;
        endDate = `${this.endYear}-12-31`;
      } else {
        startDate = moment(this.timeList[0]).format("YYYY-MM-DD");
        endDate = moment(this.timeList[1]).format("YYYY-MM-DD");
      }

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
          startDate: startDate,
          endDate: endDate,
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
      let startDate, endDate;

      //判断选择的查询类型是否为按年查询
      if (this.listQuery.type === 2) {
        startDate = `${this.startYear}-01-01`;
        endDate = `${this.endYear}-12-31`;
      } else {
        startDate = moment(this.timeList[0]).format("YYYY-MM-DD");
        endDate = moment(this.timeList[1]).format("YYYY-MM-DD");
      }

      (this.chartData2 = {
        xData: [],
        yDataSpontaneousIncome: [],
        yDataSellIncome: [],
        yDataAvgIncome: [],
      }),
        qryDeviceIncomeData({
          ...this.listQuery,
          deviceId: this.deviceInfo.id,
          startDate: startDate,
          endDate: endDate,
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
      const selectedDate = moment(this.time).format("YYYY-MM-DD");

      this.chartData3 = {
        xData: [],
        yDataBattery: [],
        yDataPvElec: [],
        yDataLoadElec: [],
        yDataFeedNetwork: [],
        yDataBuyElec: [],
        yDataBatteryTotalSoc: [],
      };
      qryDevicePowerData({
        date: selectedDate, //更新为所选择的日期
        time: this.time / 1000, //传递时间戳
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
            this.chartData3.yDataBatteryTotalSoc.push(item.batteryTotalSoc);
          });
        }
      });
    },
    getDeviceRecordData() {
      const selectedDate2 = moment(this.time2).format("YYYY-MM-DD");
      qryDevicePowerDataTable({
        date: selectedDate2,
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
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.pageNum = val;
    },
  },
};
</script>

<style lang="scss" scoped>
.export-container {
  position: relative;
  margin-top: 20px;
}
.export {
  position: absolute;
  top: 10px;
  right: 10px;
}

.card-content {
  height: 300px;
}

.tag {
  margin-right: 10px;
  margin-bottom: 10px;
  cursor: pointer;
}

.card3-content {
  margin-top: 20px;
}

.menu {
  /deep/ .el-menu--horizontal > .el-menu-item {
    height: 30px;
    line-height: 30px;
  }
}

.energy-flow-dialog {
  .el-dialog__body {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 12px;
  }
}

.energy-flow-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
}

.energy-flow-content {
  position: relative;
  width: 500px; /* 图片与文字区域限制在弹窗内 */
  height: 500px;
  background-color: #fff;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.energy-flow-img {
  width: 110%;
  height: 110%;
  object-fit: contain; /* 确保图片完整显示 */
  position: absolute;
  z-index: 1;
}

.flow-item {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
}

.flow-text {
  color: #555;
  font-size: 13px;
  font-weight: bold;
  text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
  margin-bottom: 4px;

  line-height: 1.2;
}

.flow-value {
  color: #333;
  font-size: 12px;
  font-weight: bold;

  line-height: 1.2;
}

/* 上部文字和数值 */
.top {
  top: 19%;
  left: 50%;
  transform: translateX(-50%);
}

/* 下部文字和数值 */
.bottom {
  bottom: 8%;
  left: 50%;
  transform: translateX(-50%);
}

/* 左部文字和数值 */
.left {
  top: 55%;
  left: 13%;
  transform: translateY(-50%);
}

/* 右部文字和数值 */
.right {
  top: 55%;
  right: 13%;
  transform: translateY(-50%);
}
</style>
