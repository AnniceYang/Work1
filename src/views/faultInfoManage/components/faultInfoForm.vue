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
      label-width="180px"
    >
      <el-form-item :label="$t('faultInfo.faultLevel')" prop="level">
        <el-radio-group v-model="dataForm.level">
          <el-radio :label="1">{{ $t("faultInfo.oneLevel") }}</el-radio>
          <el-radio :label="2">{{ $t("faultInfo.twoLevel") }}</el-radio>
          <el-radio :label="3">{{ $t("faultInfo.threeLevel") }}</el-radio>
        </el-radio-group>
      </el-form-item>

      <!-- <el-form-item :label="$t('faultInfo.tpType')" prop="tpType">
        <el-radio-group v-model="dataForm.tpType">
          <el-radio :label="1">{{ $t("faultInfo.singlePhase") }}</el-radio>
          <el-radio :label="3">{{ $t("faultInfo.threePhase") }}</el-radio>
        </el-radio-group>
      </el-form-item> -->

      <el-form-item :label="$t('faultInfo.faultCode')" prop="code">
        <el-input
          v-model="dataForm.code"
          maxlength="50"
          :placeholder="$t('common.inputPrompt')"
        />
      </el-form-item>
      <el-form-item :label="$t('faultInfo.faultInformation')" prop="content">
        <el-input
          v-model="dataForm.content"
          maxlength="200"
          :placeholder="$t('common.inputPrompt')"
        />
      </el-form-item>
      <!-- <el-form-item label="安装商端是否显示" prop="installerDisplay"> -->
      <el-form-item
        :label="$t('faultInfo.displayOrNot')"
        prop="installerDisplay"
        v-if="isAdmin"
      >
        <el-radio-group v-model="dataForm.installerDisplay">
          <el-radio :label="1">{{ $t("faultInfo.display") }}</el-radio>
          <el-radio :label="0">{{ $t("faultInfo.hide") }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- <el-form-item
        :label="$t('faultInfo.possibleCauses')"
        prop="possibleCauses"
      >
        <el-input
          v-model="dataForm.possibleCauses"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4 }"
          maxlength="500"
          :placeholder="$t('common.inputPrompt')"
        />
      </el-form-item> -->
      <el-form-item :label="$t('faultInfo.solutionMeasures')" prop="solutions">
        <tinymce ref="tinymce" :height="200" v-model="dataForm.solutions" />
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
import { addFaultInfo, editFaultInfo } from "@/api/faultInfo";
import Tinymce from "@/components/Tinymce";
export default {
  components: { Tinymce },

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
        code: [
          {
            required: true,
            message: this.$t("faultInfo.validateC"),
            trigger: "blur",
          },
        ],
        level: [{ required: true, message: "", trigger: "blur" }],
        tpType: [{ required: true, message: "", trigger: "blur" }],
        content: [
          {
            required: true,
            message: this.$t("faultInfo.validateI"),
            trigger: "blur",
          },
        ],
        possibleCauses: [
          {
            required: true,
            message: this.$t("faultInfo.validateP"),
            trigger: "blur",
          },
        ],
        solutions: [
          {
            required: true,
            message: this.$t("faultInfo.validateS"),
            trigger: "blur",
          },
        ],
        installerDisplay: [{ required: true, message: "", trigger: "blur" }],
      },
    };
  },
  methods: {
    init(info) {
      this.dataForm = {
        code: null,
        content: null,
        level: 1,
        tpType: 1,
        installerDisplay: 0,
        possibleCauses: null,
        solutions: null,
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
            editFaultInfo(this.dataForm).then((res) => {
              this.$message.success(this.$t("common.successfulModification"));
              this.visible = false;
              this.$emit("back");
            });
          } else {
            addFaultInfo(this.dataForm).then((res) => {
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

<style scoped></style>
