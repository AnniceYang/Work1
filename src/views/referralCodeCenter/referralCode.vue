<template>
  <div class="app-container calendar-list-container">
    <basic-container>
      <div class="header-title">
        <h2>{{ $t("referralCode.customerList") }}</h2>
      </div>

      <div class="avue-crud">
        <el-table border :data="dataList" fit v-loading="listLoading">
          <el-table-column
            align="center"
            :label="$t('referralCode.number')"
            width="60"
          >
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>

          <el-table-column
            align="center"
            prop="referralAccount"
            :label="$t('referralCode.referralAccount')"
            width="140"
          />
          <el-table-column
            align="center"
            prop="referralCode"
            :label="$t('referralCode.referralCode')"
          />

          <el-table-column
            align="center"
            prop="referralBankAccount"
            :label="$t('referralCode.referralBankAccount')"
            width="120"
          />

          <el-table-column
            align="center"
            prop="referralName"
            :label="$t('referralCode.referralName')"
          />
          <el-table-column
            align="center"
            prop="refereeAccount"
            :label="$t('referralCode.refereeAccount')"
            width="140"
          />
          <el-table-column
            align="center"
            prop="refereeName"
            :label="$t('referralCode.refereeName')"
          />
          <el-table-column
            align="center"
            prop="refereeBankAccount"
            :label="$t('referralCode.refereeBankAccount')"
            width="140"
          />
          <el-table-column
            align="center"
            prop="deviceSn"
            :label="$t('referralCode.deviceSn')"
          />
          <el-table-column
            align="center"
            prop="cashOutDate"
            :label="$t('referralCode.cashOutDate')"
            width="100"
          />

          <el-table-column
            :label="$t('referralCode.cashOutState')"
            align="center"
          >
            <template #default="scope">
              <el-button
                type="text"
                :style="{
                  color: scope.row.cashOutState === 1 ? 'green' : 'red',
                  cursor: 'pointer',
                }"
                @click="openCashOutDialog(scope.row)"
                >{{
                  scope.row.cashOutState === 1
                    ? $t("referralCode.cashOut1")
                    : $t("referralCode.cashOut0")
                }}</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>

      <el-dialog
        :title="$t('referralCode.cashOutState')"
        :visible.sync="cashOutDialogVisible"
        width="400px"
        center
        :modal="true"
        :close-on-click-modal="false"
        :show-close="true"
        class="custom-dialog"
      >
        <el-form>
          <el-form-item :label="$t('referralCode.cashOutState')">
            <el-select
              v-model="cashOutStatus"
              :placeholder="$t('common.selectPrompt')"
            >
              <el-option :label="$t('referralCode.cashOut0')" :value="0" />
              <el-option :label="$t('referralCode.cashOut1')" :value="1" />
            </el-select>
          </el-form-item>

          <div class="warning-text">
            <span style="color: red">{{
              $t("referralCode.cashOutWarning")
            }}</span>
          </div>

          <el-button type="primary" @click="updateCashOutStatus">
            {{ $t("common.save") }}
          </el-button>
          <el-button @click="closeDialog">{{ $t("common.cancel") }}</el-button>
        </el-form>
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

      <!-- <referStateForm ref="referStateForm" @back="getData" /> -->
    </basic-container>
  </div>
</template>
<script>
import { qryReferralList, editRefferState } from "@/api/installUser";

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
      cashOutDialogVisible: false,
      selectedReferralCashbackId: null,

      cashOutStatus: 0,
    };
  },
  // computed: {
  //   ...mapGetters(["permissions"]),
  // },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.listLoading = true;
      qryReferralList()
        .then((res) => {
          this.dataList = res;
          this.total = res.length;
        })
        .finally(() => {
          this.listLoading = false;
        });
    },

    openCashOutDialog(row) {
      this.selectedReferralCashbackId = row.referralCashbackId;

      this.cashOutStatus = row.cashOutState;
      this.cashOutDialogVisible = true;
    },

    closeDialog() {
      this.cashOutDialogVisible = false;
    },

    updateCashOutStatus() {
      const params = {
        referralCashbackId: this.selectedReferralCashbackId,
        cashOutState: this.cashOutStatus,
      };

      // 调用接口更新返现状态
      editRefferState(params)
        .then(() => {
          this.$message.success(this.$t("common.savesuccessfully"));
          this.closeDialog();
          this.getData(); // 更新列表数据
        })
        .catch(() => {
          this.$message.error(this.$t("common.savefailed"));
        });
    },

    // 每页数
    sizeChangeHandle(val) {
      this.listQuery.size = val;
      this.getData();
    },
    // 当前页
    currentChangeHandle(val) {
      this.listQuery.current = val;
      this.getData();
    },
  },
};
</script>

<style lang="scss" scoped>
.table-pagination {
  margin-top: 20px;
}

.custom-dialog {
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.warning-text {
  margin-top: 15px;
  margin-bottom: 25px;
  font-size: 16px;
  text-align: center;
  color: #f56c6c; /* 红色警示文本 */
  font-weight: bold;
}
</style>
