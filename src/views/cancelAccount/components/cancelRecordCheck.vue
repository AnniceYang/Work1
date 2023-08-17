<template>
  <el-dialog
    title="审核"
    :close-on-click-modal="false"
    :visible.sync="visible"
    width="600px"
  >
    <el-form label-width="110px">
      <el-form-item label="状态">
        <el-radio-group v-model="dataForm.status">
          <el-radio :label="1">审核通过</el-radio>
          <el-radio :label="2">审核拒绝</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注" v-if="dataForm.status === 2">
        <el-input v-model="dataForm.reject" type="textarea" :rows="2" maxlength="100" placeholder="请输入审核备注" />
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { checkCancelRecord } from "@/api/cancelAccount";
export default {
  data() {
    return {
      visible: false,
      loadingState: false,
      dataForm: {},
    };
  },
  methods: {
    init(info) {
      this.dataForm = { ...info }
      this.visible = true
    },
    handleSubmit() {
      this.loadingState = true;
      checkCancelRecord(this.dataForm).then((res) => {
        this.$message.success(this.$t('common.operationSuccessful'));
        this.visible = false
        this.$emit("back");
      }).finally(() => {
        this.loadingState = false;
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.btn {
  display: flex;
  justify-content: center;
}
</style>