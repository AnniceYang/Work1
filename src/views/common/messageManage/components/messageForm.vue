<template>
  <el-dialog
    :title="$t('common.addOrEdit')"
    :close-on-click-modal="false"
    :visible.sync="visible"
    :destroy-on-close="true"
    width="900px"
  >
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" label-width="140px">
      <el-form-item :label="$t('messageManage.messageTitle')" prop="newsTitle">
        <el-input v-model="dataForm.newsTitle" maxlength="200" :placeholder="$t('common.inputPrompt')" />
      </el-form-item>
      <el-form-item :label="$t('messageManage.description')" prop="newsSketch">
        <el-input type="textarea" v-model="dataForm.newsSketch" maxlength="200" :placeholder="$t('common.inputPrompt')" />
      </el-form-item>
      <el-form-item :label="$t('messageManage.coverPhoto')">
        <FileUpload ref="fileUpload" @change="uploadSuccess" />
      </el-form-item>
      <el-form-item :label="$t('messageManage.messageContent')" prop="newsContent">
        <tinymce ref="tinymce" :height="200" v-model="dataForm.newsContent"/>
      </el-form-item>
      <el-form-item :label="$t('messageManage.messageTerminal')" prop="newsClient">
        <el-radio-group v-model="dataForm.newsClient">
          <el-radio :label="0">{{$t('common.user')}}</el-radio>
          <el-radio :label="1">{{$t('common.distributor')}}</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">{{$t('common.cancel')}}</el-button>
      <el-button type="primary" @click="handleSubmit()">{{$t('common.confirm')}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addMessage, editMessage } from "@/api/common/message"
import Tinymce from '@/components/Tinymce'
import FileUpload from '@/components/FileUpload/index'
export default {
  components: { Tinymce, FileUpload },
  data() {
    return {
      visible: false,
      dataForm: {},
      dataRule: {
        newsTitle: [{ required: true, message: this.$t('messageManage.validateTitle'), trigger: "blur" }],
        newsContent: [{ required: true, message: this.$t('messageManage.validateContent'), trigger: "blur" }],
        newsClient: [{ required: true, message: "", trigger: "blur" }],
        newsSketch: [{ required: true, message: this.$t('messageManage.validateSketch'), trigger: "blur" }],
      }
    };
  },
  methods: {
    init(info) {
      this.dataForm = {
        newsClient: 0,
        newsType: 0,
        userId: -1,
        newsTitle: '',
        fileId: '',
        newsContent: '',
        newsSketch: ''
      };
      if (info) {
        for (const key in this.dataForm) {
          this.dataForm[key] = info[key];
        }
        this.dataForm.id = info.id;
        this.dataForm.fileId = info.adminComFileInfosVo ? info.adminComFileInfosVo.fileId : ''
      }
      this.visible = true;
      this.$nextTick(() => {
        this.$refs.dataForm.clearValidate();
        this.$refs.fileUpload.init(info && info.adminComFileInfosVo ? info.adminComFileInfosVo.filePath : '');
      });
    },
    handleSubmit() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          if (this.dataForm.id) {
            editMessage(this.dataForm).then((res) => {
              this.$message.success(this.$t('common.successfulModification'));
              this.visible = false;
              this.$emit("back");
            });
          } else {
            addMessage(this.dataForm).then((res) => {
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