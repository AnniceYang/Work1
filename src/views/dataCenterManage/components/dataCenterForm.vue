<template>
  <el-dialog
    :title="$t('common.addOrEdit')"
    :close-on-click-modal="false"
    :visible.sync="visible"
    :destroy-on-close="true"
    width="800px"
  >
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" label-width="110px">
      <el-form-item :label="$t('dataCenter.title')" prop="title">
        <el-input v-model="dataForm.title" maxlength="200" :placeholder="$t('common.inputPrompt')" />
      </el-form-item>
      <el-form-item :label="$t('dataCenter.sketch')">
        <el-input v-model="dataForm.sketch" maxlength="255" type="textarea" :rows="2" :placeholder="$t('common.inputPrompt')" />
      </el-form-item>
      <el-form-item :label="$t('dataCenter.type')" prop="type">
        <el-select v-model="dataForm.type" :placeholder="$t('common.selectPrompt')" style="width: 100%;">
          <el-option  :label="$t('dataCenter.newsCenter')" :value="1" />
          <el-option  :label="$t('dataCenter.installationInstructions')" :value="2" />
          <el-option  :label="$t('dataCenter.installationVideo')" :value="3" />
          <el-option  :label="$t('dataCenter.userManual')" :value="4" />
          <el-option  :label="$t('dataCenter.troubleShooting')" :value="5" />
          <el-option  label="Q&A" :value="6" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('dataCenter.coverPhoto')">
        <FileUpload ref="fileUpload" @change="uploadSuccess" />
      </el-form-item>
      <el-form-item :label="$t('dataCenter.content')" prop="content">
        <tinymce ref="tinymce" :height="200" v-model="dataForm.content"/>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">{{ $t('common.cancel') }}</el-button>
      <el-button type="primary" @click="handleSubmit()">{{ $t('common.confirm') }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addDataCenter, editDataCenter } from "@/api/dataCenter";
import Tinymce from '@/components/Tinymce'
import FileUpload from '@/components/FileUpload/index'
export default {
  components: { Tinymce, FileUpload },
  data() {
    return {
      visible: false,
      loadingState: false,
      dataForm: {},
      dataRule: {
        title: [{ required: true, message: this.$t('dataCenter.validateTitle'), trigger: "blur" }],
        type: [{ required: true, message: this.$t('dataCenter.validateType'), trigger: ["blur", 'change'] }],
        content: [{ required: true, message: this.$t('dataCenter.validateContent'), trigger: ["blur", 'change'] }]
      },
      typeList: []
    };
  },
  methods: {
    init(info) {
      this.dataForm = {
        content: null,
        type: null,
        sketch: null,
        title: null
      };
      if (info) {
        for (const key in info) {
          this.dataForm[key] = info[key];
        }
        this.dataForm.id = info.id;
        this.dataForm.fileId = info.fileInfo ? info.fileInfo.fileId : ''
      }
      this.visible = true
      this.$nextTick(() => {
        this.$refs.dataForm.clearValidate()
        this.$refs.fileUpload.init(info && info.fileInfo ? info.fileInfo.filePath : '');
      });
    },
    handleSubmit() {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          this.loadingState = true;
          if (this.dataForm.id) {
            editDataCenter(this.dataForm).then((res) => {
              this.$message.success(this.$t('common.successfulModification'));
              this.visible = false
              this.$emit("back");
            }).finally(() => {
              this.loadingState = false;
            });
          } else {
            addDataCenter(this.dataForm).then((res) => {
              this.$message.success(this.$t('common.addedSuccessfully'));
              this.visible = false
              this.$emit("back");
            }).finally(() => {
              this.loadingState = false;
            });
          }
        }
      });
    },
    uploadSuccess (e) {
      this.dataForm.fileId = e.fileId
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