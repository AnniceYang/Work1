<template>
  <el-dialog
    :title="$t('common.addOrEdit')"
    :close-on-click-modal="false"
    :visible.sync="visible"
    :destroy-on-close="true"
    width="600px"
  >
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" label-width="150px">
      <el-form-item :label="$t('classifyManage.classificationNameC')" prop="title">
        <el-input v-model="dataForm.title" :placeholder="$t('common.inputPrompt')" />
      </el-form-item>
      <el-form-item :label="$t('classifyManage.classificationNameE')" prop="titleEn">
        <el-input v-model="dataForm.titleEn" :placeholder="$t('common.inputPrompt')" />
      </el-form-item>
      <el-form-item :label="$t('classifyManage.description')" prop="sketch">
        <el-input v-model="dataForm.sketch" :placeholder="$t('common.inputPrompt')" />
      </el-form-item>
   
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">{{$t('common.cancel')}}</el-button>
      <el-button type="primary" @click="handleSubmit()">{{$t('common.confirm')}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addProblemClassify, editProblemClassify } from "@/api/common/problem"
export default {
  data() {
    return {
      visible: false,
      dataForm: {},
      dataRule: {
        title: [{ required: true, message: this.$t('classifyManage.validateC'), trigger: "blur" }],
        titleEn: [{ required: true, message: this.$t('classifyManage.validateE'), trigger: "blur" }],
        sketch: [{ required: true, message: this.$t('classifyManage.validateSketch'), trigger: "blur" }],
      }
    };
  },
  methods: {
    init(info) {
      this.dataForm = {
        sketch: '',
        title: '',
        titleEn: ''
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
            editProblemClassify(this.dataForm).then((res) => {
              this.$message.success(this.$t('common.successfulModification'));
              this.visible = false;
              this.$emit("back");
            });
          } else {
            addProblemClassify(this.dataForm).then((res) => {
              this.$message.success(this.$t('common.addedSuccessfully'));
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

<style>
</style>