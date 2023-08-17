<template>
  <el-dialog
    title="意见反馈类型"
    :close-on-click-modal="false"
    :visible.sync="visible"
    :destroy-on-close="true"
    width="600px"
  >
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" label-width="110px">
      <el-form-item label="类型名称" prop="typeName">
        <el-input v-model="dataForm.typeName" maxlength="50" placeholder="请输入类型名称"  @keyup.enter.native="handleSubmit"/>
      </el-form-item>
      <el-form-item label="排序">
        <el-input v-model="dataForm.sort" type="number" placeholder="请输入排序" />
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addFeedbackType, editFeedbackType } from '@/api/common/feedback'
export default {
  data() {
    return {
      visible: false,
      loadingState: false,
      dataForm: {},
      dataRule: {
        typeName: [{ required: true, message: "请输入类型名称", trigger: "blur" }]
      }
    };
  },
  methods: {
    init(info) {
      this.dataForm = {
        typeName: "",
        sort: 0
      };
      if (info) {
        for (const key in info) {
          this.dataForm[key] = info[key];
        }
        this.dataForm.id = info.id;
      }
      this.visible = true
      this.$nextTick(() => {
        this.$refs.dataForm.clearValidate()
      });
    },
    handleSubmit() {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          this.loadingState = true;
          if (this.dataForm.id) {
            editFeedbackType(this.dataForm).then((res) => {
              this.$message.success(this.$t('common.successfulModification'));
              this.visible = false
              this.$emit("back");
            }).finally(() => {
              this.loadingState = false;
            });
          } else {
            addFeedbackType(this.dataForm).then((res) => {
              this.$message.success(this.$t('common.addedSuccessfully'));
              this.visible = false
              this.$emit("back");
            }).finally(() => {
              this.loadingState = false;
            });
          }
        }
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