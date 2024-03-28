<template>
  <div class="app-container calendar-list-container">
    <basic-container>
      <template>
        <el-row>
          <el-form
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
            label-width="140px"
            class="demo-ruleForm"
          >
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-form-item :label="$t('common.loginAccount')">
                  <el-input v-model="ruleForm.username" disabled />
                </el-form-item>
                <el-form-item :label="$t('common.phoneNumber')">
                  <el-input v-model="ruleForm.phone" />
                </el-form-item>
                <el-form-item :label="$t('common.userName')" prop="name">
                  <el-input v-model="ruleForm.name" />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm()">{{
                    $t("common.modifyingUserName")
                  }}</el-button>
                </el-form-item>
              </div>
            </el-col>
          </el-form>
        </el-row>
        <el-row>
          <el-form
            :model="dataForm"
            ref="dataForm"
            :rules="dataRule"
            label-width="140px"
          >
            <el-col :span="12">
              <el-form-item
                :label="$t('common.originalPassword')"
                prop="password"
              >
                <el-input
                  v-model="dataForm.password"
                  show-password
                  :placeholder="$t('common.inputPrompt')"
                />
              </el-form-item>
              <el-form-item
                :label="$t('common.newPassword')"
                prop="newPassword"
              >
                <el-input
                  v-model="dataForm.newPassword"
                  show-password
                  :placeholder="$t('common.inputPrompt')"
                />
              </el-form-item>
              <el-form-item
                :label="$t('common.confirmPassword')"
                prop="newPassword2"
              >
                <el-input
                  v-model="dataForm.newPassword2"
                  show-password
                  :placeholder="$t('common.inputPrompt')"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="changePwd()">{{
                  $t("common.changePassword")
                }}</el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </template>
    </basic-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { editInfo, editPassword } from "@/api/admin/user";
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (this.dataForm.password !== "") {
        if (value !== this.dataForm.newPassword) {
          callback(new Error($t("common.passwordCheck")));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    const validatePhone = (rule, value, callback) => {
      if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(value)) {
        callback(new Error($t("common.phoneNumberCheck")));
      } else {
        callback();
      }
    };
    const validatePwd = (rule, value, callback) => {
      if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/.test(value)) {
        callback(new Error($t("common.passwordEnter")));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {},
      rules: {
        name: [
          {
            required: true,
            trigger: "blur",
            message: $t("common.nameMessage"),
          },
        ],
        sex: [
          {
            required: true,
            message: $t("common.genderMessage"),
            trigger: "blur",
          },
        ],
        phone: [
          {
            required: true,
            message: $t("common.phoneNumberNotempty"),
            trigger: "blur",
          },
          { validator: validatePhone, trigger: ["blur", "change"] },
        ],
        birthDate: [
          { required: true, message: $t("common.birthCheck"), trigger: "blur" },
        ],
      },

      visible: false,
      dataForm: {},
      dataRule: {
        password: [
          {
            required: true,
            message: $t("common.enterOriginPassword"),
            trigger: "blur",
          },
        ],
        newPassword: [
          {
            required: true,
            message: $t("common.enterNewPassword"),
            trigger: "blur",
          },
        ],
        newPassword2: [
          {
            required: true,
            message: $t("common.enterOnceNewPassword"),
            trigger: "blur",
          },
          {
            required: false,
            validator: validatePass,
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  created() {
    this.getUserInfo();
    this.resetForm();
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
    }),
  },
  methods: {
    getUserInfo() {
      // 更新用户信息
      this.$store.dispatch("GetUserInfo");
    },
    resetForm() {
      console.log("用户信息", this.userInfo);
      this.ruleForm = {
        area: this.userInfo.area,
        birthDate: this.userInfo.birthDate,
        city: this.userInfo.city,
        lockFlag: 0,
        name: this.userInfo.name,
        phone: this.userInfo.phone,
        objId: this.userInfo.objId,
        province: this.userInfo.province,
        role: this.userInfo.roles,
        sex: this.userInfo.sex,
        userId: this.userInfo.userId,
        username: this.userInfo.username,
      };
      if (this.userInfo.adminComFileInfosVo) {
        this.ruleForm.fileId = this.userInfo.adminComFileInfosVo.fileId;
        this.$nextTick(() => {
          this.$refs.fileUpload.init(
            this.userInfo.adminComFileInfosVo
              ? this.userInfo.adminComFileInfosVo.filePath
              : ""
          );
        });
      }
    },
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          editInfo(this.ruleForm).then((response) => {
            this.$notify.success(this.$t("common.successfulModification"));
            this.getUserInfo();
          });
        }
      });
    },
    changePwd() {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          editPassword(this.dataForm).then((res) => {
            this.$notify.success(this.$t("common.successfulModification"));
            this.$store.dispatch("LogOut").then(() => {
              location.reload();
            });
          });
        }
      });
    },
  },
};
</script>
<style lang="scss">
@import "@/styles/info.scss";
</style>
