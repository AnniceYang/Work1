<template>
  <div class="upload-container">
    <el-button size="mini" type="primary" @click="showDialog">
      上传视频
    </el-button>
    <el-dialog :visible.sync="dialogVisible" append-to-body>
      <video v-if="videoUrl" ref="videoDom1" :src="videoUrl" width="225" height="150" controls="controls" />
      <el-upload
        v-loading="loadingapp"
        :multiple="false"
        :data="{fileName:'detailImg'}"
        :show-file-list="false"
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
        :headers="headersObj"
        :action="uploadUrl"
        class="editor-slide-upload"
        list-type="picture-card"
      >
        <el-button size="small" type="primary">
          点击上传视频
        </el-button>
      </el-upload>

      <el-button @click="dialogVisible = false">
        取消
      </el-button>
      <el-button type="primary" @click="handleSubmit">
        确定
      </el-button>
    </el-dialog>
  </div>
</template>

<script>
import { baseUrl } from "@/config/env";
export default {
  name: 'EditorSlideUpload',
  data() {
    return {
      videoUrl: '',
      loadingapp: false,
      dialogVisible: false,
      listObj: {},
      fileList: [],
      uploadUrl: baseUrl + '/admin/file/info/upload/file',
      url_: process.env.BASE_IMG,
      headersObj: {
        'Authorization': 'Bearer ' + this.$store.getters.access_token
      },
      drag: false
    }
  },
  methods: {
    showDialog() {
      this.videoUrl = ''
      this.dialogVisible = true
    },
    checkAllSuccess() {
      return this.videoUrl
    },
    handleSubmit() {
      if (!this.checkAllSuccess()) {
        this.$message('请等待视频上传成功 或 出现了网络问题，请刷新页面重新上传！')
        return
      }
      this.$emit('successCBK', this.videoUrl)
      this.dialogVisible = false
    },
    handleSuccess(response, file, fileList) {
      console.log('response', response)
      this.loadingapp = false
      this.videoUrl = response.data.filePath
      // console.log(response)
    },
    beforeUpload(file) {
      // const _self = this
      // const _URL = window.URL || window.webkitURL
      // const fileName = file.uid
      // this.listObj[fileName] = {}
      const isLt2M = file.size / 1024 / 1024 < 500
      return new Promise((resolve, reject) => {
        if (!isLt2M) {
          this.$message.error('上传视频大小不能超过500MB!')
          reject()
        } else {
          const isMP4 = file.type === 'video/mp4'
          if (!isMP4) {
            this.$message.error('请上传 MP4 格式的视频!')
            reject()
          } else {
            this.loadingapp = true
            resolve(true)
          }
        }

        // const img = new Image()
        // img.src = _URL.createObjectURL(file)
        // img.onload = function() {
        //   // _self.listObj[fileName] = { hasSuccess: false, uid: file.uid, width: this.width, height: this.height }
        // }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.editor-slide-upload {
  margin-bottom: 20px;
  /deep/ .el-upload--picture-card {
    width: 100%;
  }
}
</style>
<style scoped>
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	.divBox{
    margin-bottom: 20px;
    margin-right: 10px;
		/*flex-direction: row;*/
		float: left;
		position: relative;

	}
  .divBox:hover{
    cursor: move;
  }
	.imgSty{
		margin-left: 3px;
	}
	.delIcon{
		font-size: 28px;

		position: absolute;
		top: 0;
		right: 0;
		/* font-size: 50px; */
	}
	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}
	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
</style>
