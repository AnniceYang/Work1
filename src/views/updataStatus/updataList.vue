<template>
  <div class="app-container calendar-list-container">
    <basic-container>
      <div class="header-search">
        <div class="lside">
          <el-form :inline="true">
            <el-form-item :label="$t('upgradeInfo.versionNumber')">
              <el-input
                v-model="listQuery.versionCode"
                :placeholder="$t('common.inputPrompt')"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('upgradeInfo.upgradeType')">
              <el-select
                v-model="listQuery.type"
                :placeholder="$t('common.selectPrompt')"
              >
                <el-option
                  :label="$t('upgradeInfo.networkConnectingBoard')"
                  :value="1"
                />
                <el-option :label="$t('upgradeInfo.inverterMCU')" :value="2" />
                <el-option :label="$t('upgradeInfo.inverterDSP')" :value="3" />
                <el-option :label="$t('upgradeInfo.battery')" :value="4" />
                <el-option :label="$t('upgradeInfo.IIcb')" :value="6" />
                <el-option :label="$t('upgradeInfo.IIdb')" :value="7" />
                <el-option :label="$t('upgradeInfo.IIbattery')" :value="8" />
                <el-option
                  :label="$t('upgradeInfo.HighVoltageBatteryBCUModule')"
                  :value="9"
                />
                <el-option
                  :label="$t('upgradeInfo.HighVoltageBatteryBMSModule')"
                  :value="10"
                />
                <el-option :label="$t('upgradeInfo.Dsp2')" :value="11" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getData(true)">{{
                $t("common.search")
              }}</el-button>
              <el-button type="primary" @click="handleReset()">{{
                $t("common.reset")
              }}</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="rside">
          <el-button
            type="primary"
            plain
            @click="handleForm()"
            v-if="permissions.admin_lsyupgrade_add"
            >{{ $t("common.add") }}</el-button
          >
        </div>
      </div>

      <div class="avue-crud">
        <el-table :data="dataList" fit v-loading="listLoading">
          <el-table-column
            align="center"
            prop="versionCode"
            :label="$t('upgradeInfo.versionNumber')"
            min-width="150"
          />
          <el-table-column
            align="center"
            prop="versionUpgrade"
            :label="$t('upgradeInfo.upgradeableVersion')"
            min-width="150"
          />
          <el-table-column align="center" :label="$t('upgradeInfo.state')">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status === 1">{{
                $t("upgradeInfo.distributed")
              }}</el-tag>
              <el-tag v-else-if="scope.row.status === 0" type="info">{{
                $t("upgradeInfo.toBeIssued")
              }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            :label="$t('upgradeInfo.upgradeType')"
            min-width="150"
          >
            <template slot-scope="scope">
              {{ scope.row.type | updateType }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            :label="$t('upgradeInfo.updateTime')"
            min-width="150"
          >
            <template slot-scope="scope">
              {{ scope.row.updateTime | parseTime }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            :label="$t('common.createTime')"
            min-width="150"
          >
            <template slot-scope="scope">
              {{ scope.row.createTime | parseTime }}
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('common.operate')"
            align="center"
            min-width="150"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                :disabled="scope.row.status === 1"
                @click="handleSend(scope.row.id)"
                v-if="permissions.admin_lsyupgrade_issued"
                >下发</el-button
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

      <UpdateForm ref="updateForm" @back="getData" />
    </basic-container>
  </div>
</template>
<script>
import { qryUpdate, sendUpdate } from "@/api/updateStatus";
import UpdateForm from "./components/updateForm.vue";
import { mapGetters } from "vuex";
export default {
  components: { UpdateForm },
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
    };
  },
  computed: {
    ...mapGetters(["permissions"]),
  },
  created() {
    this.getData();
  },
  methods: {
    getData(state) {
      this.listLoading = true;
      state && (this.listQuery.current = 1);
      qryUpdate(this.listQuery)
        .then((res) => {
          this.dataList = res.records;
          this.total = res.total;
        })
        .finally(() => {
          this.listLoading = false;
        });
    },
    // 新增
    handleForm(info) {
      this.$nextTick(() => {
        this.$refs.updateForm.init(info);
      });
    },
    // 下发
    handleSend(id) {
      this.$confirm("确定要下发此版本吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        sendUpdate({ id }).then(() => {
          this.getData();
          this.$message.success("下发成功");
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
      };
      this.getData();
    },
  },
};
</script>

<style lang="scss" scoped></style>
