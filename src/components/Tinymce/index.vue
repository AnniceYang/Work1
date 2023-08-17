<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @@Company: ZZCYI
 * @Author: liu
 * @Date: 2021-03-09 14:30:18
 * @LastEditors: liu
 * @LastEditTime: 2021-03-11 15:45:07
 * @Update Descripttion: 
-->
<template>
  <div
    :class="{fullscreen:fullscreen}"
    class="tinymce-container editor-container"
  >
    <textarea
      :id="tinymceId"
      class="tinymce-textarea"
    />
    <div class="editor-custom-btn-container">
      <editorImage
        color="#1890ff"
        :disabled="readType=='readonly'"
        class="editor-upload-btn"
        @successCBK="imageSuccessCBK"
      />
    </div>
    <div class="editor-custom-btn-container" style="right: 100px;">
      <EditorVideo
        class="editor-upload-btn"
        @successCBK="videoSuccessCBK"
      />
    </div>
  </div>
</template>

<script>
import editorImage from './components/editorImage'
import EditorVideo from './components/EditorVideo.vue'
import plugins from './plugins'
import toolbar from './toolbar'
import load from './dynamicLoadScript'
import { baseUrl } from "@/config/env"; // progress bar style
// const tinymceCDN = 'https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/tinymce.min.js'

export default {
  name: 'Tinymce',
  components: { editorImage, EditorVideo },
  props: {
    id: {
      type: String,
      default: function () {
        return 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
      }
    },
    value: {
      type: String,
      default: ''
    },
    readType: {
      type: String,
      default: 'design'
    },
    toolbar: {
      type: Array,
      required: false,
      default () {
        return []
      }
    },
    menubar: {
      type: String,
      default: 'file edit insert view format table'
    },
    height: {
      type: Number,
      required: false,
      default: 360
    },
    // hasChange: {
    //   type: Boolean,
    //   default: false
    // },
    // hasInit: {
    //   type: Boolean,
    //   default: false
    // },
    // tinymceId: {
    //   type: String,
    //   default: function () {
    //     return this.id
    //   }
    // },
    // fullscreen: {
    //   type: Boolean,
    //   default: false
    // },
    // languageTypeList: {
    //   type: Object,
    //   default: function () {
    //     return {
    //       'en': 'en',
    //       'zh': 'zh_CN'
    //     }
    //   }
    // },
    // url_: {
    //   type: String,
    //   default: function () {
    //     return window.SITE_CONFIG.baseUrl
    //   }
    // }
  },
  data () {
    return {
      hasChange: false,
      hasInit: false,
      tinymceId: this.id,
      fullscreen: false,
      languageTypeList: {
        'en': 'en',
        'zh': 'zh_CN'
      },
      url_: baseUrl
    }
  },
  computed: {
    // language () {
    //   return this.languageTypeList[this.$store.getters.language]
    // }
  },
  watch: {
    value (val) {
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() => {
          window.tinymce.get(this.tinymceId).setContent(val || '')
        })

      }
    },
    // language () {
    //   this.destroyTinymce()
    //   this.$nextTick(() => this.initTinymce())
    // }
  },
  mounted () {
    this.initTinymce()
  },
  activated () {
    if (window.tinymce) {
      this.initTinymce()
    }
  },
  deactivated () {
    this.destroyTinymce()
  },
  destroyed () {
    this.destroyTinymce()
  },
  methods: {
    // init () {
    //   // dynamic load tinymce from cdn
    //   load(tinymceCDN, (err) => {
    //     if (err) {
    //       this.$message.error(err.message)
    //       return
    //     }
    //     this.initTinymce()
    //   })
    // },
    initTinymce () {
      const _this = this
      window.tinymce.init({
        language: this.language || 'zh_CN',
        selector: `#${this.tinymceId}`,
        height: this.height,
        body_class: 'panel-body ',
        object_resizing: false,
        toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
        menubar: this.menubar,
        plugins: plugins,
        end_container_on_empty_block: true,
        powerpaste_word_import: 'clean',
        code_dialog_height: 450,
        code_dialog_width: 1000,
        // fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt 40pt",
        advlist_bullet_styles: 'square',
        advlist_number_styles: 'default',
        imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
        default_link_target: '_blank',
        link_title: false,
        convert_urls: false, // 让上传图片显示出来链接
        nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
        init_instance_callback: editor => {
          if (_this.value) {
            editor.setContent(_this.value)
          }
          _this.hasInit = true
          editor.on('NodeChange Change KeyUp SetContent', () => {
            this.hasChange = true
            this.$emit('input', editor.getContent())
          })
        },
        setup (editor) {
          editor.on('FullscreenStateChanged', (e) => {
            _this.fullscreen = e.state
          })
        },
        // 整合七牛上传
        // images_dataimg_filter(img) {
        //   setTimeout(() => {
        //     const $image = $(img);
        //     $image.removeAttr('width');
        //     $image.removeAttr('height');
        //     if ($image[0].height && $image[0].width) {
        //       $image.attr('data-wscntype', 'image');
        //       $image.attr('data-wscnh', $image[0].height);
        //       $image.attr('data-wscnw', $image[0].width);
        //       $image.addClass('wscnph');
        //     }
        //   }, 0);
        //   return img
        // },
        // images_upload_handler(blobInfo, success, failure, progress) {
        //   progress(0);
        //   const token = _this.$store.getters.token;
        //   getToken(token).then(response => {
        //     const url = response.data.qiniu_url;
        //     const formData = new FormData();
        //     formData.append('token', response.data.qiniu_token);
        //     formData.append('key', response.data.qiniu_key);
        //     formData.append('file', blobInfo.blob(), url);
        //     upload(formData).then(() => {
        //       success(url);
        //       progress(100);
        //     })
        //   }).catch(err => {
        //     failure('出现未知问题，刷新页面，或者联系程序员')
        //   });
        // },
      })
      if (this.readType === 'design') {
        window.tinymce.editors[this.tinymceId].setMode('design');//开启编辑模式
      } else {
        window.tinymce.editors[this.tinymceId].setMode('readonly');//开启只读模式
      }
      // window.tinymce.editors[this.tinymceId].setMode(this.readType);//开启只读模式|开启编辑模式
      // window.tinymce.editors[this.tinymceId].setMode('design');//开启编辑模式
      // window.tinymce.editors[this.tinymceId].setMode('readonly');//开启只读模式
    },
    destroyTinymce () {
      if (window.tinymce.get(this.tinymceId)) {
        window.tinymce.get(this.tinymceId).destroy()
      }
    },
    setContent (value) {
      window.tinymce.get(this.tinymceId).setContent(value)
    },
    getContent () {
      window.tinymce.get(this.tinymceId).getContent()
    },
    imageSuccessCBK (arr) {
      console.log('上传',arr)
      const _this = this
      arr.forEach(v => {
        window.tinymce.get(_this.tinymceId).insertContent(`<img class="wscnph" src="${v.url}" >`)
      })
    },
    videoSuccessCBK(url) {
      // console.log(url)
      const _this = this
      if (url) {
        const sourceStr = encodeURI('<source src="' + url + '" type="video/mp4" />')
        window.tinymce.get(_this.tinymceId).insertContent(`<p>
            <span class="mce-preview-object mce-object-video" contenteditable="false" data-mce-object="video" data-mce-p-allowfullscreen="allowfullscreen" data-mce-p-frameborder="no" data-mce-p-scrolling="no" data-mce-p-src=${url} data-mce-html=${sourceStr}>
              <video src=${url} style="width:100%;margin:0;" controls="controls">
              </video>
            </span>
        </p>`)
      } else {
        this.$message({
          type: 'error',
          message: '请先上传视频'
        })
      }
    }
  }
}
</script>



<style scoped>
.tinymce-container {
  position: relative;
}
.tinymce-container >>> .mce-fullscreen {
  z-index: 10000;
}
.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}
.editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: -2px;
  padding: 0;
  /*z-index: 2005;*/
}
.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}
.editor-upload-btn {
  display: inline-block;
}
</style>

