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

          <el-form-item :label="$t('faultInfo.raymond')" v-if="isAdmin">
            <el-select
              v-model="listQuery.raymond"
              :placeholder="$t('common.selectPrompt')"
            >
              <el-option :label="$t('common.yes')" :value="1"></el-option>
              <el-option :label="$t('common.no')" :value="0"></el-option>
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
              }}</el-button>
              <!-- 新增特定编辑按钮 -->
              <el-button type="warning" @click="openEditDialog">{{
                $t("faultInfo.specificEdit")
              }}</el-button>
            </template>
          </el-form-item>

          <el-dialog
            :title="$t('faultInfo.specificEdit')"
            :visible.sync="editDialogVisible"
            width="600px"
          >
            <el-form
              ref="editForm"
              :model="editForm"
              :rule="editRules"
              label-width="120px"
              label-position="right"
              class="edit-form"
            >
              <!-- SN号（必填） -->
              <el-form-item
                :label="$t('deviceManage.snCode')"
                prop="sn"
                class="requird-item"
              >
                <template #label>
                  <span
                    >{{ $t("deviceManage.snCode")
                    }}<span style="color: red">*</span></span
                  >
                </template>
                <el-input
                  v-model="editForm.sn"
                  :placeholder="$t('common.inputPrompt')"
                  clearable
                  style="width: 300px"
                />
              </el-form-item>

              <!-- 功能分组 -->
              <div class="function-group">
                <!-- 隐藏故障编码 -->
                <el-card shadow="never" class="group-card">
                  <div slot="header" class="card-header">
                    <span>{{ $t("faultInfo.hideAlarm") }}</span>
                  </div>
                  <el-form-item
                    :label="$t('faultInfo.faultCode')"
                    prop="faultCode"
                  >
                    <el-input
                      v-model="editForm.faultCode"
                      :placeholder="$t('common.inputPrompt')"
                      clearable
                      style="width: 300px"
                    />
                  </el-form-item>
                </el-card>

                <!-- 删除报警时间 -->
                <el-card shadow="never" class="group-card">
                  <div slot="header" class="card-header">
                    <span>{{ $t("faultInfo.deleteAlarm") }}</span>
                  </div>
                  <el-row :gutter="20">
                    <el-form-item
                      :label="$t('faultInfo.deleteStartTime')"
                      prop="beginTime"
                    >
                      <el-date-picker
                        v-model="editForm.beginTime"
                        type="datetime"
                        :placeholder="$t('common.selectPrompt')"
                        value-format="timestamp"
                        style="width: 220px"
                      />
                    </el-form-item>

                    <el-form-item
                      :label="$t('faultInfo.deleteEndTime')"
                      prop="endTime"
                    >
                      <el-date-picker
                        v-model="editForm.endTime"
                        type="datetime"
                        :placeholder="$t('common.selectPrompt')"
                        value-format="timestamp"
                        style="width: 220px"
                      />
                    </el-form-item>
                  </el-row>
                </el-card>
              </div>
            </el-form>

            <!-- 按钮 -->
            <div slot="footer">
              <el-button @click="editDialogVisible = false">{{
                $t("common.cancel")
              }}</el-button>
              <el-button
                type="primary"
                @click="handleEditConfirm"
                :loading="submitLoading"
                >{{ $t("common.confirm") }}</el-button
              >
            </div>
          </el-dialog>
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
import {
  qryDeviceAlarm,
  exportCurrentAlarm,
  delBatchFault,
} from "@/api/faultInfo";
import { baseUrl } from "@/config/env";
import { mapGetters } from "vuex";
export default {
  data() {
    const validateTime = (rule, value, callback) => {
      const { beginTime, endTime } = this.editForm;
      if ((beginTime && !endTime) || (!beginTime && endTime)) {
        callback(new Error(this.$t("faultInfo.timePairRequired")));
      } else if (beginTime && endTime && beginTime >= endTime) {
        callback(new Error(this.$t("faultInfo.endTimeAfterStart")));
      } else {
        callback();
      }
    };

    return {
      editDialogVisible: false,

      editForm: {
        sn: "",
        faultCode: "",

        beginTime: null,
        endTime: null,
      },
      submitLoading: false,
      editRules: {
        sn: [
          {
            required: true,
            message: this.$t("common.requiredField"),
            trigger: "blur",
          },
        ],
        beginTime: [{ validator: validateTime, trigger: "change" }],
        endTime: [{ validator: validateTime, trigger: "change" }],
      },

      // 列表信息
      listLoading: false,
      dataList: [],
      total: 0,
      listQuery: {
        current: 1,
        size: 10,
        raymond: null,
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
    openEditDialog() {
      this.editDialogVisible = true;
    },

    handleEditConfirm() {
      if (!this.editForm.sn) {
        this.$message.warning(this.$t("faultInfo.requiredField"));
        return;
      }
      if (
        (this.editForm.beginTime || this.editForm.endTime) &&
        !(this.editForm.beginTime && this.editForm.endTime)
      ) {
        this.$message.warning(this.$t("faultInfo.timePairRequired"));
        return;
      }
      if (this.editForm.beginTime && this.editForm.endTime) {
        const bTimeSec = Math.floor(this.editForm.beginTime / 1000);
        const eTimeSec = Math.floor(this.editForm.endTime / 1000);
        if (bTimeSec >= eTimeSec) {
          this.$message.warning(this.$t("faultInfo.endTimeAfterStart"));
          return;
        }
      } else if (!this.editForm.faultCode) {
        this.$message.warning(this.$t("faultInfo.faultCodeRequired"));
        return;
      }

      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.$confirm(
            this.$t("faultInfo.confirmDeleteAlarm"),
            this.$t("faultInfo.tip"),
            {
              confirmButtonText: this.$t("common.confirm"),
              cancelButtonText: this.$t("common.cancel"),
              type: "warning",
            }
          )
            .then(() => {
              this.submitLoading = true;
              const formData = this.editForm;
              const beginTime = formData.beginTime
                ? Math.floor(formData.beginTime / 1000)
                : null;
              const endTime = formData.endTime
                ? Math.floor(formData.endTime / 1000)
                : null;
              const requestData = {
                beginTime,
                endTime,

                faultCode: formData.faultCode,
                sn: formData.sn,
              };

              delBatchFault(requestData)
                .then(() => {
                  this.editDialogVisible = false;
                  this.submitLoading = false;
                  this.$message.success(this.$t("faultInfo.submitSuccess"));
                  this.getData(true);
                })
                .catch(() => {
                  this.submitLoading = false;
                  this.$message.error(this.$t("faultInfo.submitError"));
                });
            })
            .catch(() => {
              this.$message.info(this.$t("faultInfo.canceled"));
            });
        } else {
          this.$message.warning(this.$t("faultInfo.formValidationError"));
        }
      });
    },

    handleExport() {
      const { sn, faultCode, level, tpType, handleStatus, raymond } =
        this.listQuery;

      //construct the URL by replacing the default -1 with the actual values if present
      const snValue = sn || "sn";
      const faultCodeValue = faultCode || "fc";
      const levelValue = level !== undefined ? level : "-1";
      const tpTypeValue = tpType !== undefined ? tpType : "-1";
      const handleStatusValue =
        handleStatus !== undefined ? handleStatus : "-1";

      const raymondValue = raymond !== null ? (raymond ? "1" : "0") : "-1";

      const exportUrl = `${baseUrl}/excel/alarm/${snValue}/${faultCodeValue}/${levelValue}/${tpTypeValue}/${handleStatusValue}/${raymondValue}`;

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
        raymond: null,
      };
      this.getData();
    },
  },
};
</script>

<style lang="scss" scoped>
.edit-form {
  padding: 20px;
}

.function-group {
  margin-top: 20px;
}

.group-card {
  margin-bottom: 20px;
}

.card-header {
  font-weight: bold;
}

.requird-item {
  margin-bottom: 20px;
}
</style>
