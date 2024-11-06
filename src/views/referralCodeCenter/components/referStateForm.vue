<template>
  <el-dialog
    :title="$t('referralCode.cashOutState')"
    v-model="cashOutDialogVisible"
    @close="handleClose"
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
      <el-button type="primary" @click="updateCashOutStatus">{{
        $t("common.save")
      }}</el-button>
      <el-button @click="closeDialog">{{ $t("common.cancel") }}</el-button>
    </el-form>
  </el-dialog>
</template>

<script>
import { editRefferState } from "@/api/installUser";

export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    referralCashbackId: {
      type: Number,
      required: true,
    },
    initialStatus: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      cashOutStatus: this.initialStatus,
    };
  },
  watch: {
    initialStatus(val) {
      this.cashOutStatus = val;
    },
  },
  methods: {
    closeDialog() {
      this.$emit("update:visible", false);
    },
    updateCashOutStatus() {
      const params = {
        referralCashbackId: this.referralCashbackId,
        cashOutState: this.cashOutStatus,
      };
      editRefferState(params)
        .then(() => {
          this.$message.success(this.$t("common.savesuccessfully"));
          this.closeDialog();
          this.$emit("status-updated"); // 通知父组件刷新数据
        })
        .catch(() => {
          this.$message.error(this.$t("common.savefailed"));
        });
    },
    handleClose() {
      this.closeDialog();
    },
  },
};
</script>
