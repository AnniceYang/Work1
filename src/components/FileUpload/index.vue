<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @@Company: ZZCYI
 * @Author: 王
 * @Date: 2020-08-05 17:43:21
 * @LastEditors: 王
 * @LastEditTime: 2020-10-12 09:16:30
 * @Update Descripttion: 图片上传  成功返回图片路径
-->
<template>
  <div>
    <el-upload
      :action="baseUrl + '/admin/file/info/upload/file'"
      :headers="header"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      list-type="picture"
      accept="image/*"
      :multiple="multiple"
    >
      <template v-if="!multiple">
        <div v-if="!imgUrl" class="avatar-uploader" :style="`width: ${width}px; height: ${height}px;`">
          <i class="el-icon-plus"/>
        </div>
        <img v-else :src="imgUrl" class="avatar" :style="`min-width: ${width}px; height: ${height}px;border-radius: 5px;`">
      </template>
      <template v-else>
        <div class="avatar-uploader">
          <i class="el-icon-plus"/>
        </div>
      </template>
    </el-upload>
    <div class="img-show" v-if="multiple">
      <div v-for="(item, index) in imgUrlList" :key="index" class="img-item">
        <img :src="item.filePath" class="avatar">
        <img src="../../assets/img/del.png" class="del-img" @click="delImg(index)">
      </div>
    </div>

  </div>
</template>

<script>
  import store from '@/store'
  import { compressUpload } from '@/util/util'
  export default {
    props: {
      // 是否多图
      multiple: {
        type: Boolean,
        default: false
      },
      // 数组下标 sku列表使用
      index: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        width: 100,
        height: 100,
        imgUrlList: [],
        header: { Authorization: 'Bearer ' + store.getters.access_token },
        imgUrl: ''
      }
    },
    methods: {
      init(imgs, width = 100, height = 100) {
        // console.log('imgs', imgs, width)
        this.width = width
        this.height = height
        if (this.multiple) {
          this.imgUrlList = imgs
        } else {
          this.imgUrl = imgs
        }
      },
      // 上传成功
      handleAvatarSuccess(res, file) {
        console.log(res)
        if (res.code === 1) {
          this.$message.error(res.msg)
        } else {
          this.$message.success('上传成功')
          if (this.multiple) {
            this.imgUrlList.push(res.data)
            this.$emit('change', this.imgUrlList, this.index)
          } else {
            this.imgUrl = res.data.filePath
            this.$emit('change', res.data, this.index)
          }
        }
      },
       // 删除图片
      delImg(index) {
        this.imgUrlList.splice(index, 1)
        this.$emit('change', this.imgUrlList)
      },
      beforeAvatarUpload(file) {
        // if ((file.size / 1024 / 1024) > 5) {
        //   this.$message.error('上传图片大小不能超过 5MB!')
        //   return false
        // }
        return new Promise((resolve, reject) => {
          const image = new Image()
          image.src = URL.createObjectURL(file)
          image.onload = () => {
            const resultBlob = compressUpload(image, file)
            resolve(resultBlob)
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.avatar-uploader {
  text-align: center;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed #999999;
  border-radius: 10px;
}
.img-show {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  .img-item {
    width: 100px;
    height: 100px;
    position: relative;
    margin-right: 10px;
    .avatar {
      width: 100px;
      height: 100px;
      border-radius: 5px;
    }
    .del-img {
      cursor: pointer;
      width: 15px;
      height: 15px;
      position: absolute;
      right: -5px;
      top: -5px;
    }
  }
}
</style>
