<template>
  <el-dialog
    title="轮播图添加/编辑"
    :close-on-click-modal="false"
    :visible.sync="visible"
    :destroy-on-close="true"
    width="600px"
  >
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" label-width="100px">
      <el-form-item label="轮播图名称" prop="title">
        <el-input v-model="dataForm.title" placeholder="请输入轮播图名称" />
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
import { qryGenusIdList, addBanner, editBanner } from "@/api/common/banner"
import FileUpload from '@/components/FileUpload/index'
export default {
  components: { FileUpload },
  data() {
    return {
      visible: false,
      dataForm: {},
      dataRule: {
        fileId: [{ required: true, message: "请上传轮播图片", trigger: "blur" }],
        title: [{ required: true, message: "请输入轮播图名称", trigger: "blur" }]
      },
      classifyList: []
    };
  },
  created() {
    qryGenusIdList({ size: 999 }).then(res => {
      this.classifyList = res.records
    })
  },
  methods: {
    init(info) {
      this.dataForm = {
        genusId: this.classifyList[0].id,
        title: '',
        fileId: ''
      };
      if (info) {
        for (const key in this.dataForm) {
          this.dataForm[key] = info[key];
        }
        this.dataForm.id = info.id;
        this.dataForm.fileId = info.adminComFileInfosVo.fileId
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
            editBanner(this.dataForm).then((res) => {
              this.$message.success(this.$t('common.successfulModification'));
              this.visible = false;
              this.$emit("back");
            });
          } else {
            addBanner(this.dataForm).then((res) => {
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