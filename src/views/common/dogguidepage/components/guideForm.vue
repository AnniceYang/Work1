<template>
  <el-dialog
    title="启动页添加/编辑"
    :close-on-click-modal="false"
    :visible.sync="visible"
    :destroy-on-close="true"
    width="600px"
  >
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" label-width="100px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="dataForm.title" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="dataForm.description" maxlength="50" placeholder="请输入描述" />
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model="dataForm.sort" type="number" placeholder="请输入排序" />
      </el-form-item>
      <el-form-item label="图片" prop="fileId">
        <FileUpload ref="fileUpload" @change="uploadSuccess" />
        <span v-show="false">{{ dataForm.fileId }}</span>
      </el-form-item>
   
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addGuide, editGuide } from "@/api/common/guide"
import FileUpload from '@/components/FileUpload/index'
export default {
  components: { FileUpload },
  data() {
    return {
      visible: false,
      dataForm: {},
      dataRule: {
        fileId: [{ required: true, message: "请上传图片", trigger: "blur" }],
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        description: [{ required: true, message: "请输入描述", trigger: "blur" }],
        sort: [{ required: true, message: "请输入排序", trigger: "blur" }],
      },
      classifyList: []
    };
  },
  methods: {
    init(info) {
      this.dataForm = {
        description: '',
        title: '',
        fileId: '',
        sort: 0,
        type: 0,
        guideType: 0
      };
      if (info) {
        for (const key in this.dataForm) {
          this.dataForm[key] = info[key];
        }
        this.dataForm.id = info.id;
        this.dataForm.fileId = info.adminComFileInfosPageVo ? info.adminComFileInfosPageVo.fileId : ''
      }
      this.visible = true;
      this.$nextTick(() => {
        this.$refs.dataForm.clearValidate();
        this.$refs.fileUpload.init(info && info.adminComFileInfosPageVo ? info.adminComFileInfosPageVo.filePath : '');
      });
    },
    handleSubmit() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          if (this.dataForm.id) {
            editGuide(this.dataForm).then((res) => {
              this.$message.success(this.$t('common.successfulModification'));
              this.visible = false;
              this.$emit("back");
            });
          } else {
            addGuide(this.dataForm).then((res) => {
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