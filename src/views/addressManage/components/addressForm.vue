<template>
  <el-dialog
    :title="$t('common.addOrEdit')"
    :close-on-click-modal="false"
    :visible.sync="visible"
    :destroy-on-close="true"
    width="600px"
  >
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" label-width="110px">
      <el-form-item :label="$t('addressManage.countryName')" prop="countryName" v-if="dataForm.grade === 0">
        <el-input v-model="dataForm.countryName" maxlength="20" :placeholder="$t('common.inputPrompt')" />
      </el-form-item>
      <el-form-item label="地区" prop="regionName" v-else-if="dataForm.grade === 1">
        <el-input v-model="dataForm.regionName" maxlength="20" placeholder="请输入地区名称" />
      </el-form-item>
      <el-form-item label="居住地" prop="residenceName" v-else-if="dataForm.grade === 2">
        <el-input v-model="dataForm.residenceName" maxlength="20" placeholder="请输入居住地名称" />
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">{{$t('common.cancel')}}</el-button>
      <el-button type="primary" @click="handleSubmit()">{{$t('common.confirm')}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addAddress, editAddress } from "@/api/address";
export default {
  data() {
    return {
      visible: false,
      loadingState: false,
      dataForm: {},
      dataRule: {
        countryName: [{ required: true, message: this.$t('addressManage.validateC'), trigger: "blur" }],
        regionName: [{ required: true, message: "请输入地区名称", trigger: "blur" }],
        residenceName: [{ required: true, message: "请输入居住地名称", trigger: "blur" }],
      }
    };
  },
  methods: {
    init(type, info) {
      this.dataForm = {
        grade: 0,
        parentId: 0,
        countryName: null,
        regionName: null,
        residenceName: null
      };
      if (type === 'add') {
        this.dataForm = { ...this.dataForm, ...info }
      } else {
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
            editAddress(this.dataForm).then((res) => {
              this.$message.success(this.$t('common.successfulModification'));
              this.visible = false
              this.$emit("back", this.dataForm);
            }).finally(() => {
              this.loadingState = false;
            });
          } else {
            addAddress(this.dataForm).then((res) => {
              this.$message.success(this.$t('common.addedSuccessfully'));
              this.visible = false
              this.$emit("back", this.dataForm);
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

</style>