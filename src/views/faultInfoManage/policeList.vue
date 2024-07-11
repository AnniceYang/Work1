<template>
  <div>
    <div class="header-search">
      <div class="lside">
        <el-form :inline="true">
          <el-form-item :label="$t('faultInfo.snCode')">
            <el-input
              v-model="listQuery.sn"
              :placeholder="$t('common.inputPrompt')"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('faultInfo.faultCode')">
            <el-input
              v-model="listQuery.faultCode"
              :placeholder="$t('common.inputPrompt')"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('faultInfo.faultLevel')">
            <el-select
              v-model="listQuery.level"
              :placeholder="$t('common.selectPrompt')"
            >
              <el-option
                :label="$t('faultInfo.oneLevel')"
                :value="1"
              ></el-option>
              <el-option
                :label="$t('faultInfo.twoLevel')"
                :value="2"
              ></el-option>
              <el-option
                :label="$t('faultInfo.threeLevel')"
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
          <el-form-item :label="$t('faultInfo.alarmStatus')">
            <el-select
              v-model="listQuery.handleStatus"
              :placeholder="$t('common.selectPrompt')"
            >
              <el-option
                :label="$t('faultInfo.currentAlarm')"
                :value="0"
              ></el-option>
              <el-option
                :label="$t('faultInfo.historicalAlarm')"
                :value="1"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              class="btn-search"
              @click="getData(true)"
              >{{ $t("common.search") }}</el-button
            >
            <el-button type="primary" @click="handleReset()">{{
              $t("common.reset")
            }}</el-button>
            <template v-if="isAdmin"
              ><el-button type="primary" @click="handleExport()">{{
                $t("common.export")
              }}</el-button></template
            >
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div class="avue-crud">
      <el-table :data="dataList" border fit v-loading="listLoading">
        <el-table-column
          align="center"
          prop="sn"
          :label="$t('faultInfo.equipmentCode')"
          show-overflow-tooltip
        />
        <el-table-column
          align="center"
          prop="content"
          :label="$t('faultInfo.faultInformation')"
          show-overflow-tooltip
        />
        <el-table-column
          align="center"
          prop="faultCode"
          :label="$t('faultInfo.faultCode')"
          show-overflow-tooltip
        />
        <el-table-column
          align="center"
          :label="$t('faultInfo.tpType')"
          prop="tpType"
          width="110"
        >
          <template slot-scope="scope">
            {{
              scope.row.tpType === 1
                ? $t("faultInfo.singlePhase")
                : $t("faultInfo.threePhase")
            }}
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('faultInfo.faultLevel')">
          <template slot-scope="scope">
            {{ faultLevelFilter[scope.row.level - 1] }}
          </template>
        </el-table-column>
        <!-- <el-table-column
          align="center"
          prop="possibleCauses"
          :label="$t('faultInfo.possibleCauses')"
          show-overflow-tooltip
        /> -->

        <el-table-column
          align="center"
          :label="$t('faultInfo.processingStatus')"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.handleStatus === 0">{{
              $t("faultInfo.occur")
            }}</span>
            <span v-else-if="scope.row.handleStatus === 1">{{
              $t("faultInfo.disappear")
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          :label="$t('faultInfo.alarmTime')"
          width="160"
        >
          <template slot-scope="scope">
            {{ scope.row.alarmTime | parseTime }}
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
  </div>
</template>
<script>
import { qryDeviceAlarm, exportCurrentAlarm } from "@/api/faultInfo";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      // 列表信息
      listLoading: false,
      dataList: [],
      total: 0,
      listQuery: {
        current: 1,
        size: 10,
      },
      faultLevelFilter: [
        this.$t("faultInfo.oneLevel"),
        this.$t("faultInfo.twoLevel"),
        this.$t("faultInfo.threeLevel"),
      ],
    };
  },
  computed: {
    ...mapGetters(["permissions"]),

    isAdmin() {
      return this.$store.state.user.roles.includes("1");
    },
  },
  created() {
    this.getData();
  },
  methods: {
    handleExport() {
      const exportBaseUrl = "http://120.79.138.205:7072"; // 测试服版
      // const exportBaseUrl = "https://esybackend.esysunhome.com:7072"; // 力胜源版
      // const exportBaseUrl = "https://pubbackend.esysunhome.com:7072"; // ODM版

      const exportUrl = `${exportBaseUrl}/excel/currentAlarm`;

      window.open(exportUrl, "_blank");
    },

    //处理数据
    processData(data) {
      this.dataList = data.records.map((item) => {
        if (item.faultCode.startsWith("Dec")) {
          item.tpType = 1;
        } else if (item.faultCode.startsWith("TP")) {
          item.tpType = 3;
        }
        return item;
      });
      this.total = data.total;
    },

    getData(state) {
      this.listLoading = true;
      state && (this.listQuery.current = 1);
      qryDeviceAlarm(this.listQuery)
        .then((res) => {
          this.processData(res);
          // this.dataList = res.records;
          // this.total = res.total;
        })
        .finally(() => {
          this.listLoading = false;
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
      };
      this.getData();
    },
  },
};
</script>

<style lang="scss" scoped></style>
