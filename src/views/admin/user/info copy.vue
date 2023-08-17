

<template>
  <div class="app-container calendar-list-container">
    <basic-container>
      <template>
        <el-row>
          <el-form
            ref="dataForm"
            :model="dataForm"
            :rules="dataRule"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-form-item label="登录账户">
                  <el-input v-model="dataForm.username" disabled />
                </el-form-item>
                <el-form-item label="原密码" prop="password">
                  <el-input v-model="dataForm.password" type="password" maxlength="12" />
                </el-form-item>
                <el-form-item label="新密码" prop="newPassword">
                  <el-input v-model="dataForm.password" type="password" maxlength="12" />
                </el-form-item>
                <el-form-item label="确认密码" prop="newPassword2">
                  <el-input v-model="dataForm.password" type="password" maxlength="12" />
                </el-form-item>
                <el-form-item label="真实称名" prop="name">
                  <el-input v-model="dataForm.name" maxlength="10" />
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                  <el-input v-model="dataForm.phone" maxlength="11" />
                </el-form-item>
                <el-form-item label="性别">
                  <el-radio v-model="dataForm.sex" :label="0">男</el-radio>
                  <el-radio v-model="dataForm.sex" :label="1">女</el-radio>
                </el-form-item>
                <el-form-item label="生日" prop="birthDate">
                  <el-date-picker
                    v-model="dataForm.birthDate"
                    value-format="timestamp"
                    type="date"
                    :picker-options="pickerOptions"
                    placeholder="请选择日期">
                  </el-date-picker>
                </el-form-item>
                
                <el-form-item>
                  <el-button type="primary" @click="submitForm()">修改用户信息</el-button>
                </el-form-item>
              </div>
            </el-col>
          </el-form>
        </el-row>
      </template>
    </basic-container>
  </div>
</template>

<script>
import { mapState } from "vuex"
import { editInfo, editPassword } from "@/api/admin/user";

export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (this.dataForm.password !== "") {
        if (value !== this.dataForm.newPassword) {
          callback(new Error("两次输入密码不一致!"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    }
    const validatePwd = (rule, value, callback) => {
      if (!/^(\w){6,12}$/.test(value)) {
        callback(new Error("请输入6~12位密码"))
      } else if(!/^(?![^a-zA-Z]+$)(?!\D+$)/.test(value)) {
        callback(new Error("密码必须同时包含数字和字母"))
      } else {
        callback();
      }
    }
    const validatePhone = (rule, value, callback) => {
      if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(value)) {
        callback(new Error("请输入正确的手机号"))
      } else {
        callback()
      }
    }
    return {
      dataForm: {},
      dataRule: {
        name: [{ required: true, message: "请输入用户名称", trigger: "blur" }],
        phone: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          { validator: validatePhone, trigger: ["blur", 'change'] },
        ],
        password: [{ required: true, message: "请输入原密码", trigger: "blur" },
        { required: false, validator: validatePwd, trigger: ["blur", 'change'] }],
        newPassword: [{ required: true, message: "请输入新密码", trigger: "blur" },
        { required: false, validator: validatePwd, trigger: ["blur", 'change'] }],
        newPassword2: [{ required: true, message: "请再次输入新密码", trigger: "blur" },
        { required: false, validator: validatePass, trigger: ["blur", 'change'] }]
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      }
    };
  },
  created() {
    this.resetForm();
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
    }),
  },
  methods: {
    submitForm() {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          editInfo(this.dataForm).then((response) => {
            this.$notify.success(this.$t('common.successfulModification'));
            this.getUserInfo();
            // 修改后注销当前token,重新登录
            // this.$store.dispatch("LogOut").then(() => {
            //   location.reload();
            // });
          })
        }
      })
    },
    resetForm() {
      console.log('用户信息', this.userInfo)
      this.dataForm = {
        name: this.userInfo.name,
        phone: this.userInfo.phone,
        role: this.userInfo.roles,
        userId: this.userInfo.userId,
        username: this.userInfo.username,
        sex: this.userInfo.sex,
        birthDate: this.userInfo.birthDate ? this.userInfo.birthDate * 1000 : ''
      }
    }
  },
};
</script>
<style lang="scss">
@import "@/styles/info.scss";
</style>
