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
                  )}1)`"
                  value="page1"
                ></el-option>
                <el-option
                  :label="`${$t('deviceManage.energyFlowChart')}(${$t(
                    'common.page'
                  )}3)`"
                  value="page3"
                ></el-option>
                <el-option
                  :label="`${$t('deviceManage.electricityInformation')}(${$t(
                    'common.page'
                  )}4)`"
                  value="page4"
                ></el-option>
                <el-option
                  :label="`${$t('deviceManage.realTimePower')}(${$t(
                    'common.page'
                  )}5)`"
                  value="page5"
                ></el-option>
                <el-option
                  :label="`${$t('deviceManage.operationInformation')}(${$t(
                    'common.page'
                  )}7)`"
                  value="page7"
                ></el-option>
                <el-option
                  :label="`${$t('deviceManage.systemSettings')}(${$t(
                    'common.page'
                  )}8)`"
                  value="page8"
                ></el-option>
                <el-option
                  :label="`${$t('deviceManage.batteryParameters')}(${$t(
                    'common.page'
                  )}9)`"
                  value="page9"
                ></el-option>

                <el-option
                  :label="`${$t('deviceManage.scheduledSettings')}(${$t(
                    'common.page'
                  )}11)`"
                  value="page11"
                ></el-option>

                <el-option
                  :label="`${$t('parameterConfiguration.selfTestReport')}(${$t(
                    'common.page'
                  )}12)`"
                  value="page12"
                ></el-option>
                <el-option
                  :label="`${$t(
                    'parameterConfiguration.threePhaseMeterBasic'
                  )}(${$t('common.page')}13)`"
                  value="page13"
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
        <el-descriptions-item :label="$t('deviceManage.deviceName')"
          >{{ deviceInfo.name }}

          <span style="margin-left: 15px"></span>
          <el-button
            v-if="isAdmin"
            class="unbind"
            icon="el-icon-more"
            @click="showDetailModal()"
            >{{ $t("deviceManage.deviceDetails") }}</el-button
          >

          <!-- 弹窗组件 -->
          <el-dialog
            :visible.sync="detailModalVisible"
            title="设备详情"
            width="60%"
          >
            <el-descriptions>
              <el-descriptions-item
                :label="$t('deviceManage.modbusDecodeVer')"
                >{{ detailedDeviceInfo.modbusDecodeVer }}</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('deviceManage.typeIdentifierOne')"
                >{{
                  detailedDeviceInfo.typeIdentifierOne
                }}</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('deviceManage.typeIdentifierTwo')"
                >{{
                  detailedDeviceInfo.typeIdentifierTwo
                }}</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('deviceManage.typeIdentifierThree')"
                >{{
                  detailedDeviceInfo.typeIdentifierThree
                }}</el-descriptions-item
              >
              <el-descriptions-item :label="$t('deviceManage.equipmentName')">{{
                detailedDeviceInfo.equipmentName
              }}</el-descriptions-item>
              <el-descriptions-item
                :label="$t('deviceManage.equipmentModel')"
                >{{ detailedDeviceInfo.equipmentModel }}</el-descriptions-item
              >
              <el-descriptions-item :label="$t('deviceManage.corporateName')">{{
                detailedDeviceInfo.corporateName
              }}</el-descriptions-item>
              <el-descriptions-item
                :label="$t('deviceManage.firmwareVersionSystemVersion')"
                >{{
                  detailedDeviceInfo.firmwareVersionSystemVersion
                }}</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('deviceManage.monitoringProgramVersion')"
                >{{
                  detailedDeviceInfo.monitoringProgramVersion
                }}</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('deviceManage.chipTwoProgramVersion')"
                >{{
                  detailedDeviceInfo.chipTwoProgramVersion
                }}</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('deviceManage.chipThreeProgramVersion')"
                >{{
                  detailedDeviceInfo.chipThreeProgramVersion
                }}</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('deviceManage.chipFourProgramVersion')"
                >{{
                  detailedDeviceInfo.chipFourProgramVersion
                }}</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('deviceManage.chipFiveProgramVersion')"
                >{{
                  detailedDeviceInfo.chipFiveProgramVersion
                }}</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('deviceManage.chipSixProgramVersion')"
                >{{
                  detailedDeviceInfo.chipSixProgramVersion
                }}</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('deviceManage.chipSevenProgramVersion')"
                >{{
                  detailedDeviceInfo.chipSevenProgramVersion
                }}</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('deviceManage.chipEightProgramVersion')"
                >{{
                  detailedDeviceInfo.chipEightProgramVersion
                }}</el-descriptions-item
              >
              <el-descriptions-item :label="$t('deviceManage.serialNumber')">{{
                detailedDeviceInfo.serialNumber
              }}</el-descriptions-item>
            </el-descriptions>
          </el-dialog>
        </el-descriptions-item>

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

        <el-descriptions-item :label="$t('deviceManage.deviceStatus1')">{{
          getDeviceStatusWithNetVersion()
        }}</el-descriptions-item>

        <!-- <el-descriptions-item :label="$t('deviceManage.onlineStatus')">{{
          onlineStatusFilter[deviceInfo.onlineStatus]
        }}</el-descriptions-item> -->
        <el-descriptions-item :label="$t('common.createTime')">{{
          deviceInfo.createTime | parseTime
        }}</el-descriptions-item>
        <el-descriptions-item
          :label="$t('deviceManage.communicationStickSoftwareVersion')"
          >{{ deviceInfo.versionNet }}</el-descriptions-item
        >

        <el-descriptions-item :label="$t('deviceManage.buyingElectricity')"
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
        }}</el-descriptions-item>

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
          <el-form-item :label="$t('deviceManage.timeFrame')">
            <el-date-picker
              v-model="timeList"
              type="daterange"
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
                >({{ $t("deviceManage.totalRevenue") }}：￥{{
                  money || 0
                }})</span
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

      <el-card v-if="isAdmin" style="margin-top: 20px">
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
      </el-card>
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
  qryDeviceDetail,
} from "@/api/device";
import ElectricityData from "./electricityData.vue";
import IncomeData from "./incomeData.vue";
import PowerData from "./powerData.vue";
import RecordData from "./recordData.vue";
import moment from "moment";

import { baseUrl } from "@/config/env";
import axios from "axios";
import { mapState, mapActions } from "vuex";
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
      detailModalVisible: false, //控制弹窗显示
      detailedDeviceInfo: {}, //保存设备详细信息

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
      },
      time: "",
      time2: "",
      timeList: [],
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
    };
  },
  methods: {
    //设备详情弹窗
    showDetailModal() {
      const id = this.deviceInfo.id;

      qryDeviceDetail({ id })
        .then((response) => {
          this.detailedDeviceInfo = {
            modbusDecodeVer: response.modbusDecodeVer,
            typeIdentifierOne: response.typeIdentifierOne,
            typeIdentifierTwo: response.typeIdentifierTwo,
            typeIdentifierThree: response.typeIdentifierThree,
            equipmentName: response.equipmentName,
            equipmentModel: response.equipmentModel,
            corporateName: response.corporateName,
            firmwareVersionSystemVersion: response.firmwareVersionSystemVersion,
            monitoringProgramVersion: response.monitoringProgramVersion,
            chipTwoProgramVersion: response.chipTwoProgramVersion,
            chipThreeProgramVersion: response.chipThreeProgramVersion,
            chipFourProgramVersion: response.chipFourProgramVersion,
            chipFiveProgramVersion: response.chipFiveProgramVersion,
            chipSixProgramVersion: response.chipSixProgramVersion,
            chipSevenProgramVersion: response.chipSevenProgramVersion,
            chipEightProgramVersion: response.chipEightProgramVersion,
            serialNumber: response.serialNumber,
          };
          this.detailModalVisible = true; //显示弹窗
          console.log("这个detailedDeviceInfo是：", this.detailedDeviceInfo);
        })
        .catch((error) => {
          console.error("Failed to fetch device details: ", error);
        });
    },

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
            console.log(response);
            if (response) {
              this.$message.success(this.$t("common.successfullyUnbind"));
            } else {
              this.$message.error(this.$t("common.failedUnbind"));
            }
          }); //调用对应的解绑接口
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

    getDeviceStatusWithNetVersion() {
      const deviceStatus =
        this.onlineStatusFilter[this.deviceInfo.onlineStatus];
      let netVersionDisplay = "(0 %)";

      if (this.deviceInfo.onlineStatus === 2) {
        if (this.netVersion !== null) {
          console.log("this.netVersion已经取到值为：", this.netVersion);
          netVersionDisplay = `(${this.netVersion} %)`;
        }
      }

      return `${deviceStatus} ${netVersionDisplay}`;
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
      const startDate = moment(this.timeList[0]).format("YYYY-MM-DD");
      const endDate = moment(this.timeList[1]).format("YYYY-MM-DD");
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
      const startDate = moment(this.timeList[0]).format("YYYY-MM-DD");
      const endDate = moment(this.timeList[1]).format("YYYY-MM-DD");
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
          // console.log("后端接口返回实时功率数据：", res);
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
</style>
