<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @@Company: ZZCYI
 * @Author: 王
 * @Date: 2020-08-05 17:43:21
 * @LastEditors: liu
 * @LastEditTime: 2021-03-11 15:43:53
 * @Update Descripttion: 
-->
<template>
  <div class="upload-container">
    <!-- <el-button :style="{background:color,borderColor:color}" icon="el-icon-upload" size="mini" type="primary" @click=" dialogVisible=true">上传图片
    </el-button> -->
    <el-upload
      :disabled="disabled"
      :multiple="false"
      :show-file-list="false"
      :on-success="handleSuccess"
      :before-upload="beforeUpload"
      :action="uploadUrl"
      :headers="headersObj"
    >
      <el-button
        size="mini"
        :disabled="disabled"
        type="primary"
      >上传图片</el-button>
    </el-upload>
  </div>
</template>

<script>
// import { getToken } from 'api/qiniu'
import Vue from 'vue'
import { baseUrl } from "@/config/env"; // progress bar style
export default {
  name: 'EditorSlideUpload',
  props: {
    color: {
      type: String,
      default: '#1890ff'
    },
    disabled: {
      type: Boolean,
      default: false
    },
  },
  data () {
    return {
      headersObj: {
        'Authorization': 'Bearer ' + this.$store.getters.access_token
      },
      dialogVisible: false,
      listObj: {},
      fileList: [],
      uploadUrl: baseUrl + '/admin/file/info/upload/file'
    }
  },
  methods: {
    checkAllSuccess () {
      return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
    },
    handleSubmit () {
      const arr = Object.keys(this.listObj).map(v => this.listObj[v])
      if (!this.checkAllSuccess()) {
        this.$message('请等待所有图片上传成功 或 出现了网络问题，请刷新页面重新上传！')
        return
      }
      this.$emit('successCBK', arr)
      this.listObj = {}
      this.fileList = []
      this.dialogVisible = false
    },
    handleSuccess (response, file) {
      console.log('上传成功', response, file)
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          this.listObj[objKeyArr[i]].url = response.data.filePath
          this.listObj[objKeyArr[i]].hasSuccess = true
          this.handleSubmit()
          return
        }
      }
    },
    beforeUpload (file) {
      const _self = this
      const _URL = window.URL || window.webkitURL
      const fileName = file.uid
      this.listObj[fileName] = {}
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = _URL.createObjectURL(file)
        img.onload = function () {
          _self.listObj[fileName] = { hasSuccess: false, uid: file.uid, width: this.width, height: this.height }
        }
        resolve(true)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.editor-slide-upload {
  margin-bottom: 20px;
  /deep/ .el-upload--picture-card {
    width: 100%;
  }
}
</style>
