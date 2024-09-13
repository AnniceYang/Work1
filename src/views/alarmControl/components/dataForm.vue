<template>
  <el-dialog
    :title="$t('common.addOrEdit')"
    :close-on-click-modal="false"
    :visible.sync="visible"
    :destroy-on-close="true"
    width="900px"
  >
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      label-width="120px"
    >
      <el-form-item :label="$t('alarmControl.alarmEncoding')" prop="code">
        <el-input
          v-model="dataForm.code"
          maxlength="50"
          :placeholder="$t('common.inputPrompt')"
        />
      </el-form-item>
      <el-form-item :label="$t('alarmControl.alarmName')" prop="name">
        <el-input
          v-model="dataForm.name"
          maxlength="50"
          :placeholder="$t('common.inputPrompt')"
        />
      </el-form-item>
      <el-form-item
        :label="$t('alarmControl.displayOrNot')"
        prop="show"
        v-if="isAdmin"
      >
        <el-radio-group v-model="dataForm.show">
          <el-radio :label="0">{{ $t("common.no") }}</el-radio>
          <el-radio :label="1">{{ $t("common.yes") }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="$t('alarmControl.description')" prop="illustrate">
        <el-input
          v-model="dataForm.illustrate"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4 }"
          :placeholder="$t('common.inputPrompt')"
        />
      </el-form-item>
      <el-form-item :label="$t('alarmControl.sort')">
        <el-input
          v-model="dataForm.sort"
          type="number"
          :placeholder="$t('common.inputPrompt')"
        />
      </el-form-item>
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
import { addAlarmControl, editAlarmControl } from "@/api/alarmControl";
export default {
  computed: {
    isAdmin() {
      return this.$store.state.user.roles.includes("1");
    },
  },

  data() {
    return {
      visible: false,
      dataForm: {},
      dataRule: {
        show: [{ required: true, message: "", trigger: "blur" }],
        code: [
          {
            required: true,
            message: this.$t("alarmControl.validateC"),
            trigger: "blur",
          },
        ],
        illustrate: [
          {
            required: true,
            message: this.$t("alarmControl.validateD"),
            trigger: "blur",
          },
        ],
        name: [
          {
            required: true,
            message: this.$t("alarmControl.validateN"),
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    init(info) {
      this.dataForm = {
        code: null,
        illustrate: null,
        sort: 0,
        name: null,
        show: 0,
      };
      if (info) {
        for (const key in this.dataForm) {
          this.dataForm[key] = info[key];
        }
        this.dataForm.id = info.id;
      }
      this.visible = true;
      this.$nextTick(() => {
        this.$refs.dataForm.clearValidate();
      });
    },
    handleSubmit() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          if (this.dataForm.id) {
            editAlarmControl(this.dataForm).then((res) => {
              this.$message.success(this.$t("common.successfulModification"));
              this.visible = false;
              this.$emit("back");
            });
          } else {
            addAlarmControl(this.dataForm).then((res) => {
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

<style></style>
