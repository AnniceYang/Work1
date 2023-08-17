<template>
  <el-dialog
    :title="$t('common.addOrEdit')"
    :close-on-click-modal="false"
    :visible.sync="visible"
    :destroy-on-close="true"
    width="600px"
  >
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" label-width="140px">
      <el-form-item :label="$t('installUser.enterpriseName')" prop="name">
        <el-input v-model="dataForm.name" :placeholder="$t('common.inputPrompt')" />
      </el-form-item>
      <el-form-item :label="$t('installUser.contactPerson')" prop="contacts">
        <el-input v-model="dataForm.contacts" :placeholder="$t('common.inputPrompt')" />
      </el-form-item>
      <el-form-item :label="$t('installUser.email')" prop="mail">
        <el-input v-model="dataForm.mail" :placeholder="$t('common.inputPrompt')" />
      </el-form-item>
      <el-form-item :label="$t('installUser.authorizationCode')" prop="authCode">
        <el-input v-model="dataForm.authCode" :placeholder="$t('common.inputPrompt')" />
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">{{$t('common.cancel')}}</el-button>
      <el-button type="primary" @click="handleSubmit()">{{$t('common.confirm')}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addInstallUser, editInstallUser } from "@/api/installUser";
export default {
  data() {
    return {
      visible: false,
      loadingState: false,
      dataForm: {},
      dataRule: {
        authCode: [{ required: true, message: this.$t('installUser.validateA'), trigger: "blur" }],
        contacts: [{ required: true, message: this.$t('installUser.validateC'), trigger: "blur" }],
        mail: [{ required: true, message: this.$t('installUser.validateM'), trigger: "blur" }],
        name: [{ required: true, message: this.$t('installUser.validateE'), trigger: "blur" }]
      }
    };
  },
  methods: {
    init(info) {
      this.dataForm = {
        authCode: null,
        contacts: null,
        mail: null,
        name: null
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
            editInstallUser(this.dataForm).then((res) => {
              this.$message.success(this.$t('common.successfulModification'));
              this.visible = false
              this.$emit("back");
            }).finally(() => {
              this.loadingState = false;
            });
          } else {
            addInstallUser(this.dataForm).then((res) => {
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