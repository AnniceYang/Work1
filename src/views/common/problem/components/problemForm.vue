<template>
  <el-dialog
    :title="$t('common.addOrEdit')"
    :close-on-click-modal="false"
    :visible.sync="visible"
    :destroy-on-close="true"
    width="900px"
  >
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" label-width="150px">
      <el-form-item :label="$t('problemManage.problemClassify')"  prop="problemClassId">
        <el-select v-model="dataForm.problemClassId" filterable :placeholder="$t('common.selectPrompt')" style="width: 100%;">
          <el-option v-for="item in classifyList" :key="item.id" :label="item.title" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('problemManage.titleC')" prop="title">
        <el-input v-model="dataForm.title" :placeholder="$t('common.inputPrompt')" />
      </el-form-item>
      <el-form-item :label="$t('problemManage.titleE')" prop="titleEn">
        <el-input v-model="dataForm.titleEn" :placeholder="$t('common.inputPrompt')" />
      </el-form-item>
      <el-form-item :label="$t('problemManage.contentC')" prop="contentInfo">
        <el-input v-model="dataForm.contentInfo" type="textarea" :autosize="{ minRows: 4, maxRows: 8}" :placeholder="$t('common.inputPrompt')" />
      </el-form-item>
      <el-form-item :label="$t('problemManage.contentE')" prop="contentInfoEn">
        <el-input v-model="dataForm.contentInfoEn" type="textarea" :autosize="{ minRows: 4, maxRows: 8}" :placeholder="$t('common.inputPrompt')" />
      </el-form-item>
   
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">{{$t('common.cancel')}}</el-button>
      <el-button type="primary" @click="handleSubmit()">{{$t('common.confirm')}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { qryProblemClassify, addProblem, editProblem } from "@/api/common/problem"
export default {
  data() {
    return {
      visible: false,
      dataForm: {},
      dataRule: {
        problemClassId: [{ required: true, message: this.$t('problemManage.validatePC'), trigger: "blur" }],
        title: [{ required: true, message: this.$t('problemManage.validateT'), trigger: "blur" }],
        titleEn: [{ required: true, message: this.$t('problemManage.validateT'), trigger: "blur" }],
        contentInfo: [{ required: true, message: this.$t('problemManage.validateC'), trigger: "blur" }],
        contentInfoEn: [{ required: true, message: this.$t('problemManage.validateC'), trigger: "blur" }],
      },
      classifyList: []
    };
  },
  created() {
    qryProblemClassify({ size: 999 }).then(res => {
      this.classifyList = res.records
    })
  },
  methods: {
    init(info) {
      this.dataForm = {
        contentInfo: '',
        problemClassId: '',
        title: '',
        titleEn: '',
        contentInfoEn: ''
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
            editProblem(this.dataForm).then((res) => {
              this.$message.success(this.$t('common.successfulModification'));
              this.visible = false;
              this.$emit("back");
            });
          } else {
            addProblem(this.dataForm).then((res) => {
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