<template>
  <el-dialog :title="$t('common.resetPassword')" :visible.sync="visible" width="520px" :close-on-click-modal="false">
    <el-form ref="dataForm" :model="dataForm" label-width="120px" :rules="rules">
      <el-form-item :label="$t('common.newPassword')" prop="password">
        <el-input v-model="dataForm.password" :placeholder="$t('common.newPassword')" type="password"/>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">{{$t('common.cancel')}}</el-button>
      <el-button type="primary" @click="handleSubmit()">{{$t('common.confirm')}}</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { editResetPassword } from "@/api/admin/user"
const validatePass = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("密码不能为空"));
  } else {
    let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
    if (!reg.test(value)) callback(new Error("请输入6-12位包含字母和数字的密码"));
    callback();
  }
};
export default {
  data () {
    return {
      visible: false,
      dataForm: {},
      rules: {
        password: [
          { required: true, message: this.$t('userManage.validatePassword'), trigger: "blur" },
        ]
      },
    }
  },
  methods: {
    init(userId) {
      this.dataForm = {
        userId: userId,
        password: ''
      }
      this.visible = true
    },
    handleSubmit() {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          editResetPassword(this.dataForm).then((data) => {
            this.$message.success(this.$t('common.resetSuccessful'))
            this.visible = false
          })
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
