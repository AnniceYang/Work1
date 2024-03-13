<template>
  <el-dialog
    :title="$t('userManage.userAddEdit')"
    :visible.sync="visible"
    width="520px"
    :close-on-click-modal="false"
  >
    <el-form
      ref="dataForm"
      :model="dataForm"
      label-width="120px"
      :rules="rules"
    >
      <el-form-item :label="$t('common.loginAccount')" prop="username">
        <el-input
          v-model="dataForm.username"
          :placeholder="$t('common.loginAccount')"
          maxlength="20"
        />
      </el-form-item>
      <el-form-item :label="$t('common.userName')" prop="name">
        <el-input
          v-model="dataForm.name"
          :placeholder="$t('common.userName')"
          maxlength="10"
        />
      </el-form-item>
      <!-- <el-form-item label="手机号" prop="phone">
        <el-input v-model="dataForm.phone" placeholder="手机号" maxlength="11" />
      </el-form-item> -->
      <el-form-item
        :label="$t('common.loginPassword')"
        prop="password"
        v-if="!dataForm.userId"
      >
        <el-input
          v-model="dataForm.password"
          :placeholder="$t('common.loginPassword')"
          type="password"
        />
      </el-form-item>
      <el-form-item :label="$t('userManage.role')" prop="roleId">
        <el-select v-model="dataForm.roleId" style="width: 100%">
          <el-option
            v-for="item in roleList"
            :key="item.roleId"
            :label="item.label"
            :value="item.roleId"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('userManage.status')" prop="lockFlag">
        <el-radio v-model="dataForm.lockFlag" :label="0">{{
          $t("common.enable")
        }}</el-radio>
        <el-radio v-model="dataForm.lockFlag" :label="9">{{
          $t("common.disable")
        }}</el-radio>
      </el-form-item>
      <!-- <el-form-item label="头像" prop="fileId">
        <FileUpload ref="fileUpload" @change="uploadSuccess" />
        <span v-show="false">{{ dataForm.fileId }}</span>
      </el-form-item> -->
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">{{ $t("common.cancel") }}</el-button>
      <el-button type="primary" @click="handleSubmit()">{{
        $t("common.confirm")
      }}</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { putObj, addObj } from "@/api/admin/user";
import { deptRoleList } from "@/api/admin/role";
import FileUpload from "@/components/FileUpload/index";
const validatePass = (rule, value, callback) => {
  if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/.test(value)) {
    callback(new Error(this.$t("common.validatePass")));
  } else {
    callback();
  }
};
const validatePhone = (rule, value, callback) => {
  if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(value)) {
    callback(new Error(this.$t("common.validatePhone")));
  } else {
    callback();
  }
};
export default {
  components: { FileUpload },
  data() {
    return {
      visible: false,
      dataForm: {},
      rules: {
        username: [
          {
            required: true,
            message: this.$t("userManage.validateAccount"),
            trigger: "blur",
          },
        ],
        name: [
          {
            required: true,
            message: this.$t("userManage.validateName"),
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: this.$t("userManage.validatePassword"),
            trigger: "blur",
          },
        ],
        roleId: [
          {
            required: true,
            message: this.$t("userManage.validateRole"),
            trigger: "blur",
          },
        ],
        lockFlag: [{ required: true, message: "", trigger: "blur" }],
      },
      roleList: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
    };
  },
  created() {
    // deptRoleList().then(res => {
    //   this.roleList = res
    // })
    deptRoleList().then((res) => {
      this.roleList = res.map((item) => {
        return {
          roleId: item.roleId,
          label: this.getRoleName(item, this.$i18n.locale),
          value: item.roleId,
        };
      });
    });
  },
  methods: {
    getRoleName(item, locale) {
      if (locale === "en-US") {
        return item.roleNameEn;
      } else if (locale === "it") {
        return item.roleNameItaly;
      } else {
        return item.roleName;
      }
    },

    init(info) {
      console.log("info", info);
      this.dataForm = {
        avatar: null,
        lockFlag: 0,
        name: "",
        password: "",
        // phone: '',
        role: [],
        username: "",
        roleId: "",
      };
      if (info) {
        for (const key in info) {
          this.dataForm[key] = info[key];
        }
        this.dataForm.roleId = info.roleList[0].roleId;
        this.dataForm.id = info.id;
        this.dataForm.lockFlag = Number(info.lockFlag);
        console.log("this.dataForm.roleId", this.dataForm.roleId);
      }
      this.visible = true;
      this.$nextTick(() => {
        this.$refs.dataForm.clearValidate();
      });
    },
    // 上传图片
    uploadSuccess(e) {
      console.log(e);
      this.dataForm.avatar = e.filePath;
    },
    handleSubmit() {
      console.log(this.dataForm);
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          let userInfo = { ...this.dataForm };
          userInfo.role = [userInfo.roleId];
          if (this.dataForm.userId) {
            putObj(userInfo).then((res) => {
              this.$message.success(this.$t("common.successfulModification"));
              this.visible = false;
              this.$emit("back");
            });
          } else {
            addObj(userInfo).then((res) => {
              this.$message.success(this.$t("common.addedSuccessfully"));
              this.visible = false;
              this.$emit("back");
            });
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
