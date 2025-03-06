<template>
  <div class="app-container calendar-list-container">
    <basic-container v-show="pageState === 1">
      <div class="header-search">
        <div class="lside">
          <el-form :inline="true">
            <el-form-item :label="$t('deviceManage.deviceName')">
              <el-input
                v-model="listQuery.name"
                :placeholder="$t('common.inputPrompt')"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('deviceManage.snCode')">
              <el-input
                v-model="listQuery.sn"
                :placeholder="$t('common.inputPrompt')"
              ></el-input>
            </el-form-item>
            <template v-show="isAdmin">
              <el-form-item :label="$t('deviceManage.cellVoltage')">
                <el-select
                  v-model="listQuery.cellVoltage"
                  :placeholder="$t('common.inputPrompt')"
                >
                  <el-option
                    :label="$t('deviceManage.normal')"
                    value="0"
                  ></el-option>
                  <el-option
                    :label="$t('deviceManage.error')"
                    value="1"
                  ></el-option>
                </el-select>
              </el-form-item>
            </template>
            <el-form-item :label="$t('deviceManage.onlineStatus')">
              <el-select
                v-model="listQuery.onlineStatus"
                :placeholder="$t('common.selectPrompt')"
              >
                <el-option
                  :label="$t('deviceManage.offline')"
                  :value="0"
                ></el-option>
                <el-option
                  :label="$t('deviceManage.online')"
                  :value="1"
                ></el-option>
                <el-option
                  :label="$t('deviceManage.updating')"
                  :value="2"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              :label="$t('common.agent')"
              v-if="permissions.admin_lsydevice_installer"
            >
              <el-select
                v-model="listQuery.installUserId"
                :placeholder="$t('common.selectPrompt')"
                filterable
                :filter-method="filterInstallUser"
                @focus="resetFilter"
              >
                <el-option
                  v-for="item in filterInstallUserList"
                  :key="item.userId"
                  :label="item.username"
                  :value="item.userId"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item :label="$t('deviceManage.deviceStatus')">
              <el-select
                v-model="listQuery.deviceStatus"
                :placeholder="$t('common.selectPrompt')"
              >
                <el-option
                  :label="$t('deviceManage.normal')"
                  :value="0"
                ></el-option>
                <el-option
                  :label="$t('deviceManage.error')"
                  :value="3"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item :label="$t('faultInfo.tpType')">
              <el-select
                v-model="listQuery.tpType"
                :placeholder="$t('common.selectPrompt')"
              >
                <el-option
                  :label="$t('faultInfo.singlePhase')"
                  :value="1"
                ></el-option>
                <el-option
                  :label="$t('faultInfo.threePhase')"
                  :value="3"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item :label="$t('deviceManage.serialNumber')">
              <el-input
                v-model="listQuery.serialNumber"
                :placeholder="$t('common.inputPrompt')"
                @input="handleSerialNumberSearch"
              />
            </el-form-item>

            <el-form-item :label="$t('common.timeZone')">
              <el-select
                v-model="listQuery.timeZone"
                :placeholder="$t('common.selectPrompt')"
              >
                <el-option
                  :label="$t('deviceManage.zeroZone')"
                  :value="0"
                ></el-option>
                <el-option
                  :label="$t('deviceManage.eastFirstDistrict')"
                  :value="1"
                ></el-option>
                <el-option
                  :label="$t('deviceManage.eastSecondDistrict')"
                  :value="2"
                ></el-option>
                <el-option
                  :label="$t('deviceManage.eastThirdDistrict')"
                  :value="3"
                ></el-option>
                <el-option
                  :label="$t('deviceManage.eastFourthDistrict')"
                  :value="4"
                ></el-option>
                <el-option
                  :label="$t('deviceManage.eastFifthDistrict')"
                  :value="5"
                ></el-option>
                <el-option
                  :label="$t('deviceManage.eastSixthDistrict')"
                  :value="6"
                ></el-option>
                <el-option
                  :label="$t('deviceManage.eastSeventhDistrict')"
                  :value="7"
                ></el-option>
                <el-option
                  :label="$t('deviceManage.eastEighthDistrict')"
                  :value="8"
                ></el-option>
                <el-option
                  :label="$t('deviceManage.eastNinthDistrict')"
                  :value="9"
                ></el-option>
                <el-option
                  :label="$t('deviceManage.eastNinthandHalfDistrict')"
                  :value="9.5"
                ></el-option>
                <el-option
                  :label="$t('deviceManage.eastTenthDistrict')"
                  :value="10"
                ></el-option>
                <el-option
                  :label="$t('deviceManage.eastTenthandHalfDistrict')"
                  :value="10.5"
                ></el-option>
                <el-option
                  :label="$t('deviceManage.eastEleventhDistrict')"
                  :value="11"
                ></el-option>
                <el-option
                  :label="$t('deviceManage.eastTwelfthDistrict')"
                  :value="12"
                ></el-option>
                <el-option
                  :label="$t('deviceManage.eastThirteenthDistrict')"
                  :value="13"
                ></el-option>
                <el-option
                  :label="$t('deviceManage.westFirstDistrict')"
                  :value="-1"
                ></el-option>
                <el-option
                  :label="$t('deviceManage.westSecondDistrict')"
                  :value="-2"
                ></el-option>
                <el-option
                  :label="$t('deviceManage.westThirdDistrict')"
                  :value="-3"
                ></el-option>
                <el-option
                  :label="$t('deviceManage.westFourthDistrict')"
                  :value="-4"
                ></el-option>
                <el-option
                  :label="$t('deviceManage.westFifthDistrict')"
                  :value="-5"
                ></el-option>
                <el-option
                  :label="$t('deviceManage.westSixthDistrict')"
                  :value="-6"
                ></el-option>
                <el-option
                  :label="$t('deviceManage.westSeventhDistrict')"
                  :value="-7"
                ></el-option>
                <el-option
                  :label="$t('deviceManage.westEighthDistrict')"
                  :value="-8"
                ></el-option>
                <el-option
                  :label="$t('deviceManage.westNinthDistrict')"
                  :value="-9"
                ></el-option>
                <el-option
                  :label="$t('deviceManage.westTenthDistrict')"
                  :value="-10"
                ></el-option>
                <el-option
                  :label="$t('deviceManage.westEleventhDistrict')"
                  :value="-11"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item :label="$t('common.usernameEmail')">
              <el-input
                v-model="listQuery.username"
                :placeholder="$t('common.inputPrompt')"
                @input="handleUserNameSearch"
              />
            </el-form-item>

            <el-form-item :label="$t('deviceManage.countryCode')">
              <el-select
                v-model="listQuery.countryCode"
                :placeholder="$t('common.selectPrompt')"
              >
                <el-option
                  :label="$t('deviceManage.China')"
                  :value="0"
                ></el-option>

                <el-option
                  :label="$t('deviceManage.Italy')"
                  :value="1"
                ></el-option>
                <el-option
                  :label="$t('deviceManage.Germany')"
                  :value="2"
                ></el-option>
                <el-option
                  :label="$t('deviceManage.Australia')"
                  :value="3"
                ></el-option>
                <el-option
                  :label="$t('deviceManage.Belgium')"
                  :value="4"
                ></el-option>
                <el-option
                  :label="$t('deviceManage.SouthAfrica')"
                  :value="5"
                ></el-option>
                <el-option
                  :label="$t('deviceManage.England')"
                  :value="6"
                ></el-option>
                <el-option
                  :label="$t('deviceManage.Spain')"
                  :value="7"
                ></el-option>
                <el-option
                  :label="$t('deviceManage.Ireland')"
                  :value="9"
                ></el-option>
                <el-option
                  :label="$t('deviceManage.France')"
                  :value="10"
                ></el-option>
                <el-option
                  :label="$t('deviceManage.Greece')"
                  :value="11"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="getData(true)">{{
                $t("common.search")
              }}</el-button>
              <el-button type="primary" @click="handleReset()">{{
                $t("common.reset")
              }}</el-button>
              <template v-if="isAdmin">
                <el-button
                  type="primary"
                  @click="exportData"
                  :disabled="!listQuery.installUserId"
                  >{{ $t("common.export") }}</el-button
                ></template
              >
            </el-form-item>
          </el-form>
        </div>
        <el-dialog
          :title="$t('common.deviceSelfcheck')"
          :visible.sync="selfCheckVisible"
          width="400px"
          :show-close="false"
          custom-class="self-check-dialog"
        >
          <div>
            <div class="sn-display">
              <strong>SN: {{ currentSn }}</strong>
            </div>
          </div>

          <div
            v-for="item in selfCheckItems"
            :key="item.key"
            class="self-check-item"
          >
            <span>{{ item.label }}</span>
            <span v-if="item.loading">Loading...</span>

            <span v-else-if="item.status !== null">
              <span v-if="item.key === 'wifiConnectivity'" class="wifi-signal">
                {{ getWifiSignalStrength(item.status) }}</span
              >
              <i
                v-else
                :class="{
                  'el-icon-check status-success large-icon': item.status === 1,
                  'el-icon-close status-failure large-icon': item.status !== 1,
                }"
              ></i>
            </span>

            <span v-else class="loading-icon">Loading...</span>
            <!-- Simple loading indicator -->
          </div>

          <div
            class="instruction-message"
            :class="{
              'success-message': instructionMessageType === 'msg1',
              'error-message': instructionMessageType === 'msg2',
            }"
          >
            {{ isLoading ? "Loading..." : `(${instructionMessage})` }}
          </div>

          <div class="dialog-footer">
            <el-button type="primary" @click="selfCheckVisible = false">{{
              $t("common.confirm")
            }}</el-button>
          </div>
        </el-dialog>

        <div class="rside">
          <el-button
            type="primary"
            plain
            @click="handleForm()"
            v-if="permissions.admin_lsydevice_add"
            >{{ $t("common.add") }}</el-button
          >
        </div>
      </div>

      <div class="avue-crud">
        <el-table :data="dataList" fit v-loading="listLoading">
          <el-table-column
            align="center"
            prop="name"
            :label="$t('deviceManage.deviceName')"
          />
          <el-table-column :label="$t('deviceManage.snCode')" align="center">
            <template slot-scope="scope">
              <el-link
                type="primary"
                :underline="false"
                @click="handleLook(scope.row.sn, scope.row.sn)"
                >{{ scope.row.sn }}</el-link
              >
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="serialNumber"
            :label="$t('deviceManage.serialNumber')"
          />
          <!-- <el-table-column align="center" label="设备类型">
            <template slot-scope="scope">
              {{ scope.row.type === 0 ? 'NB' : '涂鸦' }}
            </template>
          </el-table-column> -->
          <el-table-column
            align="center"
            :label="$t('deviceManage.deviceStatus')"
            prop="deviceStatus"
          >
            <template slot-scope="scope">
              <!-- {{ scope.row.status | devStatusFilter }} -->
              {{ devStatusFilter[scope.row.status] }}
            </template>
          </el-table-column>

          <el-table-column
            align="center"
            :label="$t('faultInfo.tpType')"
            prop="tpType"
          >
            <template slot-scope="scope">
              <!-- {{ scope.row.status | devStatusFilter }} -->
              {{
                scope.row.tpType === 1
                  ? $t("faultInfo.singlePhase")
                  : $t("faultInfo.threePhase")
              }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            :label="$t('deviceManage.onlineStatus')"
          >
            <template slot-scope="scope">
              <!-- {{ scope.row.onlineStatus | onlineStatusFilter }} -->
              {{ onlineStatusFilter[scope.row.onlineStatus] }}
            </template>
          </el-table-column>
          <el-table-column align="center" :label="$t('deviceManage.timeZone')">
            <template slot-scope="scope">
              <!-- {{ scope.row.timeZone | timeZoneFilter }} -->
              {{ timeZoneFilter(scope.row.timeZone) }}
            </template>
          </el-table-column>
          <!-- <el-table-column align="center" prop="bindUserName" :label="$t('deviceManage.userName')" show-overflow-tooltip /> -->
          <el-table-column
            align="center"
            prop="installUserName"
            :label="$t('deviceManage.installer')"
            show-overflow-tooltip
          />
          <!-- <el-table-column align="center" :label="$t('common.createTime')" width="150">
            <template slot-scope="scope">
              {{ scope.row.createTime | parseTime }}
            </template>
          </el-table-column> -->

          <el-table-column
            :label="$t('common.operate')"
            align="center"
            width="250"
            fixed="right"
          >
            <template slot-scope="scope">
              <div class="operate-buttons">
                <el-button type="text" @click="handleStatistics(scope.row)">{{
                  $t("deviceManage.details")
                }}</el-button>
                <el-button
                  type="text"
                  @click="openUserSettingDialog(scope.row)"
                  v-if="permissions.userSettings"
                  >{{ $t("deviceManage.userSettings") }}</el-button
                >
                <el-button
                  type="text"
                  @click="handleUpgrade(scope.row)"
                  v-if="permissions.admin_dogappversioninfo_ota"
                  >{{ $t("deviceManage.OTAupgrade") }}</el-button
                >
              </div>

              <!-- <el-button
                type="text"
                @click="handleRecord(scope.row)"
                v-if="permissions.admin_lsydeviceupgrade_view"
                >{{ $t("deviceManage.upgradeRecord") }}</el-button
              > -->
              <div class="operate-buttons">
                <el-button
                  type="text"
                  @click="handleRealTime(scope.row)"
                  v-if="permissions.operation_info"
                  >{{ $t("deviceManage.operationParameters") }}</el-button
                >
                <el-button
                  type="text"
                  @click="handleSelfCheck(scope.row.id, scope.row.sn)"
                  v-if="permissions.deviceSelfcheck"
                  >{{ $t("common.deviceSelfcheck") }}</el-button
                >
                <el-button
                  type="text"
                  @click="handleForm1(scope.row)"
                  v-if="permissions.admin_lsydevice_edit"
                  >{{ $t("common.edit") }}</el-button
                >
                <el-button
                  type="text"
                  style="color: red"
                  @click="handleDel(scope.row.id)"
                  v-if="permissions.admin_lsydevice_del"
                  >{{ $t("common.delete") }}</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <el-dialog
        :title="$t('deviceManage.userSettings')"
        :visible.sync="isDialogVisible"
        width="400px"
        class="centered-dialog"
      >
        <el-row class="dialog-content" justify="center" align="middle">
          <el-col :span="24">
            <el-button
              class="dialog-button"
              type="primary"
              block
              @click="handleCellSet"
              >{{ $t("deviceManage.batterySettings") }}</el-button
            >
          </el-col>
          <el-col :span="24">
            <el-button
              class="dialog-button"
              type="primary"
              block
              @click="handleGeneratorSettings"
              >{{ $t("deviceManage.generatorSettings") }}</el-button
            >
          </el-col>
          <el-col :span="24">
            <el-button
              v-if="isAdmin"
              class="dialog-button"
              type="primary"
              block
              @click="handlePriceSettings"
              >{{ $t("deviceManage.priceSettings") }}</el-button
            >
          </el-col>
          <el-col :span="24">
            <el-button
              v-if="selectedRow.countryCode === '3'"
              class="dialog-button"
              type="primary"
              block
              @click="handleGridSettings"
              >{{ $t("deviceManage.gridSettingsAus") }}</el-button
            >
          </el-col>
        </el-row>
      </el-dialog>

      <div class="table-pagination">
        <el-pagination
          @size-change="sizeChangeHandle"
          @current-change="currentChangeHandle"
          :current-page="listQuery.current"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="listQuery.size"
          :total="total"
          background
          layout="total, sizes, prev, pager, next, jumper"
        />
      </div>

      <!-- 添加/编辑 -->
      <DeviceForm ref="deviceForm" @back="getData" />

      <!-- 电池设置 -->
      <CellSet ref="cellSet" @back="getData" />

      <!-- 电网公司（澳洲）设置 -->
      <GridSet ref="gridSet" />

      <!-- 发电机设置 -->
      <GeneratorSet
        :deviceId="selectedRow ? selectedRow.id : null"
        ref="generatorSet"
      />

      <!-- 电价设置 -->
      <PriceSet
        :deviceId="selectedRow ? selectedRow.id : null"
        ref="priceSet"
      />

      <!-- ota升级 -->
      <DeviceUpgrade ref="deviceUpgrade" />

      <!-- 设备二维码 -->
      <QrCode ref="qrCode" :title="$t('deviceManage.snCode')" />

      <!-- 升级记录 -->
      <UpdateRecord ref="updateRecord" />
    </basic-container>

    <!-- 详情 -->
    <DeviceStatistics
      v-if="pageState === 2"
      ref="deviceStatistics"
      @back="pageState = 1"
    />

    <!-- 三相详情 -->
    <TPdeviceStatistics
      v-if="pageState === 4"
      ref="TPdeviceStatistics"
      @back="pageState = 1"
    />

    <!-- 运行信息 -->
    <RealTimeData
      v-if="pageState === 3"
      ref="realTimeData"
      @back="pageState = 1"
    />

    <!-- 三相运行信息 -->
    <TPrealTimeData
      v-if="pageState === 6"
      ref="TPrealTimeData"
      @back="pageState = 1"
    />

    <!-- 自检 -->
    <SelfTest v-if="pageState === 5" ref="selfTest" @back="pageState = 1" />
  </div>
</template>
<script>
import { qryAppUser, qryinstallUser } from "@/api/appUser";
import { qryDevice, delDevice, checkDevice, qryDeviceBind } from "@/api/device";
import QrCode from "@/components/QrCode/index.vue";
import DeviceForm from "./components/deviceForm.vue";
import CellSet from "./components/cellSet.vue";
import GridSet from "./components/gridSet.vue";
import GeneratorSet from "./components/generatorSet.vue";
import PriceSet from "./components/priceSet.vue";
import DeviceStatistics from "./components/deviceStatistics.vue";
import TPdeviceStatistics from "./components/TPdeviceStatistics.vue";
import RealTimeData from "./components/realTimeData.vue";
import TPrealTimeData from "./components/TPrealTimeData.vue";

import { baseUrl } from "@/config/env";
import UpdateRecord from "./components/updateRecord.vue";
import DeviceUpgrade from "./components/deviceUpgrade.vue";
import SelfTest from "./components/selfTest.vue";
import { mapGetters, mapState } from "vuex";
import { getUrlParams } from "@/util/util";
import { Base64 } from "js-base64";

export default {
  components: {
    DeviceForm,
    CellSet,
    GridSet,
    GeneratorSet,
    PriceSet,
    DeviceStatistics,
    TPdeviceStatistics,
    RealTimeData,
    TPrealTimeData,
    DeviceUpgrade,
    QrCode,
    UpdateRecord,
    SelfTest,
  },
  data() {
    return {
      isDialogVisible: false,

      selectedRow: {
        type: Object,
        required: true,
        default: () => ({ countryCode: null }),
      },
      nmi: "",

      selfCheckVisible: false,
      selfCheckItems: [
        {
          key: "wifiConnectivity",
          label: this.$t("deviceManage.wifiConnectivity"),
          status: null,
          loading: true,
        },
        {
          key: "systemStatus",
          label: this.$t("deviceManage.systemStatus"),
          status: null,
          loading: true,
        },
        {
          key: "pvConnection",
          label: this.$t("deviceManage.pvConnection"),
          status: null,
          loading: true,
        },
        {
          key: "bmsConnection",
          label: this.$t("deviceManage.bmsConnection"),
          status: null,
          loading: true,
        },
        {
          key: "gridConnection",
          label: this.$t("deviceManage.gridConnection"),
          status: null,
          loading: true,
        },
        {
          key: "meterConnection",
          label: this.$t("deviceManage.meterConnection"),
          status: null,
          loading: true,
        },
      ],

      pageState: 1,
      installUserList: [],
      filterInstallUserList: [],

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
      listLoading: false,
      dataList: [],
      total: 0,
      listQuery: {
        ilk: "0",
        current: 1,
        size: 10,
      },
      users: [],
      filteredUsers: [],
    };
  },
  computed: {
    ...mapGetters(["permissions"]),
    ...mapState({
      userInfo: (state) => state.user.userInfo,
    }),

    isLoading() {
      return this.selfCheckItems.some((item) => item.loading);
    },

    instructionMessage() {
      if (this.isLoading) return "";

      const allSuccess = this.selfCheckItems.every((item) => {
        return item.key === "wifiConnectivity" || item.status === 1;
      });
      return allSuccess
        ? this.$t("common.instructionMsg1")
        : this.$t("common.instructionMsg2");
    },

    instructionMessageType() {
      if (this.isLoading) return ""; // Show nothing while loading
      return this.selfCheckItems.every(
        (item) => item.key === "wifiConnectivity" || item.status === 1
      )
        ? "msg1"
        : "msg2"; // Return msg1 or msg2 based on conditions
    },

    isAdmin() {
      return this.$store.state.user.roles.includes("1");
    },
  },
  mounted() {
    console.log(this.permissions);
  },
  created() {
    // 查询安装商用户
    qryinstallUser().then((res) => {
      this.installUserList = res;
      this.filterInstallUserList = res;
      console.log("installUserList是：", this.installUserList);
    });

    // 解析url
    console.log(
      "decodeURIComponent(window.location.href)",
      decodeURIComponent(window.location.href)
    );
    const params = getUrlParams(decodeURIComponent(window.location.href));
    console.log("params", params);
    if (params && params.installUserId) {
      this.listQuery.installUserId = params.installUserId;
    }

    this.getData();
  },
  methods: {
    handleSerialNumberSearch() {
      const searchTerm = this.listQuery.serialNumber.toLowerCase();

      this.filteredSerialNumbers = this.serialNumbers.filter((serial) =>
        serial.toLowerCase().includes(searchTerm)
      );
    },

    handleUserNameSearch() {
      if (!this.listQuery.username) {
        this.filteredUsers = this.users;
      } else {
        const searchQuery = this.listQuery.username.toLowerCase();
        this.filteredUsers = this.users.filter((user) =>
          user.name.toLowerCase().includes(searchQuery)
        );
      }
    },

    //安装商列表模糊查询
    filterInstallUser(query) {
      if (!query) {
        this.filterInstallUserList = this.installUserList; //输入为空时，显示完整列表
        return;
      }

      const lowerCaseQuery = query.toLowerCase();
      this.filterInstallUserList = this.installUserList.filter(
        (item) => item.username.toLowerCase().startsWith(lowerCaseQuery) //根据用户名模糊匹配
      );
    },
    // 重置过滤列表为完整列表
    resetFilter() {
      this.filterInstallUserList = this.installUserList;
    },

    //UserSettings dialog巴啦啦
    openUserSettingDialog(scopeRow) {
      this.selectedRow = scopeRow;
      this.isDialogVisible = true;
    },

    // 电池设置
    handleCellSet() {
      if (this.$refs.cellSet && this.selectedRow) {
        console.log("Selected Row for CellSet:", this.selectedRow);

        // // Close the dialog
        this.isDialogVisible = false;

        // Wait for DOM updates to complete
        this.$nextTick(() => {
          // Initialize cellSet after the dialog has been removed
          this.$refs.cellSet.init(this.selectedRow);
        });
      }
    },

    // 电网公司（澳洲）设置
    handleGridSettings() {
      if (this.$refs.gridSet && this.selectedRow) {
        console.log("Selected Row for GridSet:", this.selectedRow);

        // 关闭主对话框
        this.isDialogVisible = false;

        // 等待 DOM 更新完成后再初始化子组件
        this.$nextTick(() => {
          this.$refs.gridSet.init(this.selectedRow.sn); // 初始化电网公司设置
        });
      }
    },

    // 电价设置
    handlePriceSettings() {
      // console.log(
      //   "用户设置bindUserId的值----------",
      //   this.selectedRow.bindUserId
      // );
      if (!this.selectedRow.bindUserId || this.selectedRow.bindUserId === "0") {
        this.$message.error(this.$t("deviceManage.missingUserBinding"));
        return;
      }
      this.isDialogVisible = false;
      this.$nextTick(() => {
        this.$refs.priceSet.init(this.selectedRow);
      });
    },

    // 发电机设置
    handleGeneratorSettings() {
      if (this.$refs.generatorSet && this.selectedRow) {
        // console.log("Selected Row for GeneratorSet:", this.selectedRow);

        // console.log("传递的id是：", this.selectedRow.id);

        // Close the main dialog
        this.isDialogVisible = false;

        // Wait for DOM updates to complete
        this.$nextTick(() => {
          // Initialize generatorSet with the selected row data
          this.$refs.generatorSet.init(this.selectedRow.id);
        });
      }
    },

    getWifiSignalStrength(signal) {
      let strengthLabel = this.$t("common.unknown"); // Default to unknown

      if (signal >= -40 && signal <= -30) {
        strengthLabel = `${this.$t("common.strong")} (${signal} dBm)`;
      } else if (signal >= -85 && signal < -40) {
        strengthLabel = `${this.$t("common.medium")} (${signal} dBm)`;
      } else if (signal < -90) {
        strengthLabel = `${this.$t("common.weak")} (${signal} dBm)`;
      }

      return strengthLabel;
    },

    handleSelfCheck(id, sn) {
      this.selfCheckVisible = true; // Open dialog

      this.currentSn = sn;

      //Set loading state to true for all items
      this.selfCheckItems.forEach((item) => {
        item.loading = true;
      });

      checkDevice({ id })
        .then((response) => {
          // Update each item based on the response data
          this.selfCheckItems.forEach((item) => {
            if (item.key === "wifiConnectivity") {
              item.status = response[item.key]; // Use value directly for wifi
            } else {
              item.status = response[item.key] === 1 ? 1 : 0; // Set 1 for success, 0 for failure
            }
            item.loading = false;
          });
        })
        .catch((error) => {
          console.error("Error fetching device check status:", error);
          this.selfCheckItems.forEach((item) => {
            item.loading = false;
          });
        });
    },

    //Method to export data
    exportData() {
      if (!this.listQuery.installUserId) {
        this.$message.error(this.$t(common.selectedInstaller));
        return;
      }

      const installerId = this.listQuery.installUserId;
      const exportUrl = `${baseUrl}/excel/deviceInfo/${installerId}`;

      window.open(exportUrl, "_blank");
    },

    getData(state) {
      this.listLoading = true;
      state && (this.listQuery.current = 1);

      //生成signature参数
      const secretId = "esy27h4AKIDz8kr09bsJ5yKB5j913fly";
      const timestamp = Math.floor(Date.now() / 1000); //获取当前时间戳（秒）
      const rawString = `secretId=${secretId}&timestamp=${timestamp}`;
      const signature = Base64.encode(rawString);

      const query = {
        ...this.listQuery,
        status: this.listQuery.deviceStatus,
        // tpType: this.listQuery.tpType,
        signature: signature, //添加signature参数
      };
      qryDevice(query)
        .then((res) => {
          this.dataList = res.records;
          this.total = res.total;
          console.log("设备列表返回的是：", this.dataList);
        })
        .finally(() => {
          this.listLoading = false;
        });
    },
    // 切换电池种类
    changeMenu(e) {
      this.listQuery.ilk = e;
      this.getData(true);
    },
    // 升级记录
    handleRecord(info) {
      this.$refs.updateRecord.init(info);
    },
    // 查看二维码
    handleLook(id, name) {
      this.$refs.qrCode.init(id, name);
    },
    // ota升级
    handleUpgrade(info) {
      this.$refs.deviceUpgrade.init(info);
    },

    // 实时数据
    handleRealTime(info) {
      if (info.tpType === 1) {
        this.pageState = 3; //Assuming pageState 3 is for sing-phase real-time data
        this.$nextTick(() => {
          this.$refs.realTimeData.init(info);
        });
      } else {
        this.pageState = 6;
        this.$nextTick(() => {
          this.$refs.TPrealTimeData.init(info);
        });
      }
    },
    // 统计
    handleStatistics(info) {
      qryDeviceBind({ id: info.id }).then((deviceInfoResponse) => {
        if (deviceInfoResponse) {
          this.deviceInfo = { ...deviceInfoResponse }; // **强制刷新设备信息**
        }

        if (info.tpType === 1) {
          this.pageState = 2;
          this.$nextTick(() => {
            this.$refs.deviceStatistics.init(this.deviceInfo);
            window.scrollTo(0, 0);
          });
        } else {
          this.pageState = 4;
          this.$nextTick(() => {
            this.$refs.TPdeviceStatistics.init(this.deviceInfo);
            window.scrollTo(0, 0);
          });
        }
      });
    },

    // 新增
    handleForm(info) {
      this.$nextTick(() => {
        this.dataForm = {};
        this.$refs.deviceForm.init(this.listQuery.ilk, info);
        this.visible = true;
      });
    },

    //编辑
    handleForm1(info) {
      this.$nextTick(() => {
        this.$refs.deviceForm.init(this.listQuery.ilk, info, true);
        this.visible = true;
      });
    },
    // 删除
    handleDel(id) {
      this.$confirm(this.$t("common.sureDelete"), this.$t("common.prompt"), {
        confirmButtonText: this.$t("common.confirm"),
        cancelButtonText: this.$t("common.cancel"),
        type: "warning",
      }).then(() => {
        delDevice({ id }).then(() => {
          this.getData();
          this.$message.success(this.$t("common.successfullyDeleted"));
        });
      });
    },
    // 每页数
    sizeChangeHandle(val) {
      this.listQuery.size = val;
      this.getData(true);
    },
    // 当前页
    currentChangeHandle(val) {
      this.listQuery.current = val;
      this.getData();
    },
    // 重置
    handleReset() {
      this.listQuery = {
        current: 1,
        size: 10,
        ilk: this.listQuery.ilk,
      };
      this.getData();
    },
    timeZoneFilter(val) {
      let str = "";
      switch (Number(val)) {
        case 0:
          str = this.$t("deviceManage.zeroZone");
          break;
        case 1:
          str = this.$t("deviceManage.eastFirstDistrict");
          break;
        case 2:
          str = this.$t("deviceManage.eastSecondDistrict");
          break;
        case 3:
          str = this.$t("deviceManage.eastThirdDistrict");
          break;
        case 4:
          str = this.$t("deviceManage.eastFourthDistrict");
          break;
        case 5:
          str = this.$t("deviceManage.eastFifthDistrict");
          break;
        case 6:
          str = this.$t("deviceManage.eastSixthDistrict");
          break;
        case 7:
          str = this.$t("deviceManage.eastSeventhDistrict");
          break;
        case 8:
          str = this.$t("deviceManage.eastEighthDistrict");
          break;
        case 9:
          str = this.$t("deviceManage.eastNinthDistrict");
          break;
        case 9.5:
          str = this.$t("deviceManage.eastNinthandHalfDistrict");
          break;
        case 10:
          str = this.$t("deviceManage.eastTenthDistrict");
          break;
        case 10.5:
          str = this.$t("deviceManage.eastTenthandHalfDistrict");
          break;
        case 11:
          str = this.$t("deviceManage.eastEleventhDistrict");
          break;
        case 12:
          str = this.$t("deviceManage.eastTwelfthDistrict");
          break;
        case 13:
          str = this.$t("deviceManage.eastThirteenthDistrict");
          break;
        case -1:
          str = this.$t("deviceManage.westFirstDistrict");
          break;
        case -2:
          str = this.$t("deviceManage.westSecondDistrict");
          break;
        case -3:
          str = this.$t("deviceManage.westThirdDistrict");
          break;
        case -4:
          str = this.$t("deviceManage.westFourthDistrict");
          break;
        case -5:
          str = this.$t("deviceManage.westFifthDistrict");
          break;
        case -6:
          str = this.$t("deviceManage.westSixthDistrict");
          break;
        case -7:
          str = this.$t("deviceManage.westSeventhDistrict");
          break;
        case -8:
          str = this.$t("deviceManage.westEighthDistrict");
          break;
        case -9:
          str = this.$t("deviceManage.westNinthDistrict");
          break;
        case -10:
          str = this.$t("deviceManage.westTenthDistrict");
          break;
        case -11:
          str = this.$t("deviceManage.westEleventhDistrict");
          break;
        default:
          break;
      }
      return str;
    },
  },
};
</script>

<style lang="scss" scoped>
.header-search {
  display: flex;
  flex-wrap: nowrap; /* 防止换行 */
  width: 100%; /* 确保占满父容器 */
  justify-content: space-between;
}

.el-form {
  display: flex;
  flex-wrap: wrap;
}
.rside {
  margin-top: 170px;
}

.large-icon {
  font-size: 32px;
  margin-left: 8px;
}

.status-success {
  color: green; /* Set color to green for success */
}

.status-failure {
  color: red; /* Set color to red for failure */
}

.wifi-signal {
  font-size: 18px;
  font-weight: bold;
  color: green;
}

.sn-display {
  margin-bottom: 10px;
  font-weight: bold;
}

.self-check-items {
  margin-bottom: 20px;
}
.self-check-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
}

.instruction-message {
  text-align: center;
  font-weight: bold;
  margin: 20px 0;
}

.success-message {
  color: green; /* Green for success message */
}

.error-message {
  color: red; /* Red for error message */
}

.dialog-footer {
  display: flex;
  justify-content: center; /* Center the footer content */
  padding-top: 10px; /* Spacing above the button */
}

.loading-icon {
  font-style: italic; /* Add some styling to the loading text */
}

.operate-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.operate-buttons > .el-button {
  margin: 5px;
}
.centered-dialog .el-dialog__body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 20px 0;
}

.dialog-content {
  width: 100%; /* 确保按钮宽度占据全宽 */
}

.dialog-button {
  margin-bottom: 15px; /* 设置按钮之间的间距 */
}
</style>
