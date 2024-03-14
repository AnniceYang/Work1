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
            <el-form-item :label="$t('deviceManage.serialNumber')">
              <el-input
                v-model="listQuery.serialNumber"
                :placeholder="$t('common.inputPrompt')"
              ></el-input>
            </el-form-item>
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
              :label="$t('deviceManage.installer')"
              v-if="permissions.admin_lsydevice_installer"
            >
              <el-select
                v-model="listQuery.installUserId"
                :placeholder="$t('common.selectPrompt')"
              >
                <el-option
                  :label="item.username"
                  :value="item.userId"
                  v-for="item in installUserList"
                  :key="item.userId"
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
          >
            <template slot-scope="scope">
              <!-- {{ scope.row.status | devStatusFilter }} -->
              {{ devStatusFilter[scope.row.status] }}
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
              <el-button type="text" @click="handleStatistics(scope.row)">{{
                $t("deviceManage.details")
              }}</el-button>
              <el-button
                type="text"
                @click="handleCellSet(scope.row)"
                v-if="permissions.admin_lsydevice_edit"
                >{{ $t("deviceManage.batterySettings") }}</el-button
              >
              <el-button
                type="text"
                @click="handleUpgrade(scope.row)"
                v-if="permissions.admin_dogappversioninfo_ota"
                >{{ $t("deviceManage.OTAupgrade") }}</el-button
              >

              <el-button
                type="text"
                @click="handleRecord(scope.row)"
                v-if="permissions.admin_lsydeviceupgrade_view"
                >{{ $t("deviceManage.upgradeRecord") }}</el-button
              >

              <el-button
                type="text"
                @click="handleRealTime(scope.row)"
                v-if="permissions.operation_info"
                >{{ $t("deviceManage.operationParameters") }}</el-button
              >
              <el-button
                type="text"
                @click="handleForm(scope.row)"
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
            </template>
          </el-table-column>
        </el-table>
      </div>
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

    <!-- 运行信息 -->
    <RealTimeData
      v-if="pageState === 3"
      ref="realTimeData"
      @back="pageState = 1"
    />

    <!-- 自检 -->
    <SelfTest v-if="pageState === 5" ref="selfTest" @back="pageState = 1" />
  </div>
</template>
<script>
import { qryAppUser } from "@/api/appUser";
import { qryDevice, delDevice } from "@/api/device";
import QrCode from "@/components/QrCode/index.vue";
import DeviceForm from "./components/deviceForm.vue";
import CellSet from "./components/cellSet.vue";
import DeviceStatistics from "./components/deviceStatistics.vue";
import RealTimeData from "./components/realTimeData.vue";
import UpdateRecord from "./components/updateRecord.vue";
import DeviceUpgrade from "./components/deviceUpgrade.vue";
import SelfTest from "./components/selfTest.vue";
import { mapGetters, mapState } from "vuex";
import { getUrlParams } from "@/util/util";
export default {
  components: {
    DeviceForm,
    CellSet,
    DeviceStatistics,
    RealTimeData,
    DeviceUpgrade,
    QrCode,
    UpdateRecord,
    SelfTest,
  },
  data() {
    return {
      pageState: 1,
      installUserList: [],
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
    };
  },
  computed: {
    ...mapGetters(["permissions"]),
    ...mapState({
      userInfo: (state) => state.user.userInfo,
    }),

    isAdmin() {
      return this.$store.state.user.roles.includes("1");
    },
  },
  mounted() {
    console.log(this.permissions);
  },
  created() {
    // 查询安装商用户
    qryAppUser({ type: 0, size: 999 }).then((res) => {
      this.installUserList = res.records;
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
    //Method to export data
    exportData() {
      if (!this.listQuery.installUserId) {
        this.$message.error(this.$t(common.selectedInstaller));
        return;
      }

      // const exportBaseUrl = "http://120.79.138.205:7072/excel"; // 测试服版
      const exportBaseUrl = "https://esybackend.esysunhome.com:7072/excel"; // 力胜源版
      // const exportBaseUrl = "http://3.126.27.80:7072/excel"; // ODM版
      const installerId = this.listQuery.installUserId;
      const exportUrl = `${exportBaseUrl}/deviceInfo/${installerId}`;

      window.open(exportUrl, "_blank");
    },

    getData(state) {
      this.listLoading = true;
      state && (this.listQuery.current = 1);
      const query = {
        ...this.listQuery,
        status: this.listQuery.deviceStatus,
      };
      qryDevice(query)
        .then((res) => {
          this.dataList = res.records;
          this.total = res.total;
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
    // 电池设置
    handleCellSet(info) {
      this.$refs.cellSet.init(info);
    },
    // 实时数据
    handleRealTime(info) {
      if (info.ilk === 0) {
        this.pageState = 3;
        this.$nextTick(() => {
          this.$refs.realTimeData.init(info);
        });
      }
    },
    // 统计
    handleStatistics(info) {
      this.pageState = 2;
      this.$nextTick(() => {
        this.$refs.deviceStatistics.init(info);
      });
    },
    // 新增
    handleForm(info) {
      this.$nextTick(() => {
        this.$refs.deviceForm.init(this.listQuery.ilk, info);
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

<style lang="scss" scoped></style>
