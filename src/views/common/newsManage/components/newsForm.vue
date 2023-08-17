<template>
  <el-dialog
    :title="$t('common.addOrEdit')"
    :close-on-click-modal="false"
    :visible.sync="visible"
    :destroy-on-close="true"
    width="900px"
  >
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" label-width="100px">
      <el-form-item :label="$t('newsCenter.newsTitle')" prop="newsTitle">
        <el-input v-model="dataForm.newsTitle" maxlength="200" :placeholder="$t('common.inputPrompt')" />
      </el-form-item>
      <el-form-item :label="$t('newsCenter.coverPhoto')" prop="fileId">
        <FileUpload ref="fileUpload" @change="uploadSuccess" />
        <span v-show="false">{{ dataForm.fileId }}</span>
      </el-form-item>
      <el-form-item :label="$t('newsCenter.description')" prop="newsSketch">
        <el-input v-model="dataForm.newsSketch" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" maxlength="500" :placeholder="$t('common.inputPrompt')" />
      </el-form-item>
      <el-form-item :label="$t('newsCenter.content')" prop="newsContent">
        <tinymce ref="tinymce" :height="200" v-model="dataForm.newsContent"/>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">{{$t('common.cancel')}}</el-button>
      <el-button type="primary" @click="handleSubmit()">{{$t('common.confirm')}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import FileUpload from '@/components/FileUpload/index'
import { addNews, editNews } from "@/api/common/news"
import Tinymce from '@/components/Tinymce'
export default {
  components: { Tinymce, FileUpload },
  data() {
    return {
      visible: false,
      dataForm: {},
      dataRule: {
        fileId: [{ required: true, message: this.$t('newsCenter.validateP'), trigger: "blur" }],
        newsTitle: [{ required: true, message: this.$t('newsCenter.validateT'), trigger: "blur" }],
        newsSketch: [{ required: true, message: this.$t('newsCenter.validateD'), trigger: "blur" }],
        newsContent: [{ required: true, message: this.$t('newsCenter.validateC'), trigger: "blur" }],
      }
    };
  },
  methods: {
    init(info) {
      this.dataForm = {
        fileId: '',
        newsSketch: '',
        newsTitle: '',
        newsContent: ''
      };
      if (info) {
        for (const key in this.dataForm) {
          this.dataForm[key] = info[key];
        }
        this.dataForm.id = info.id;
        this.dataForm.fileId = info.fileInfo ? info.fileInfo.fileId : ''
      }
      this.visible = true;
      this.$nextTick(() => {
        this.$refs.dataForm.clearValidate();
        this.$refs.fileUpload.init(info && info.fileInfo ? info.fileInfo.filePath : '');
      });
    },
    handleSubmit() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          if (this.dataForm.id) {
            editNews(this.dataForm).then((res) => {
              this.$message.success(this.$t('common.successfulModification'));
              this.visible = false;
              this.$emit("back");
            });
          } else {
            addNews(this.dataForm).then((res) => {
              this.$message.success(this.$t('common.addedSuccessfully'));
              this.visible = false;
              this.$emit("back");
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

<style>
</style>