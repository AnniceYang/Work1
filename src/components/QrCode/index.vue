<!-- 二维码展示 -->
<template>
  <!-- 二维码 -->
  <el-dialog
    :modal="false"
    :title="title"
    :visible.sync="dialogVisibleQRCode"
    :destroy-on-close="true"
    width="30%"
  >
    <div
      class="code-show"
      @click="downloadFile()"
    >
      <canvas
        id="QRCode"
        style="text-align:center"
      />
    </div>
  </el-dialog>
</template>
<script>
import QRCode from 'qrcode' // 引入生成二维码插件
export default {
  name: 'QRCode',
  props: {
    title: {
      type: String,
      default: '二维码'
    }
  },
  data () {
    return {
      qrCodeName: '',
      dialogVisibleQRCode: false
    }
  },
  methods: {
    // 查看二维码
    init (codeNo, codeName) {
      this.dialogVisibleQRCode = true
      const that = this
      this.$nextTick(() => {
        var msg = document.getElementById('QRCode')
        QRCode.toCanvas(msg, `${codeNo}`, {
          width: 250,
          height: 270
          // eslint-disable-next-line handle-callback-err
        }, function (error) {
          var context = document.getElementById('QRCode').getContext('2d')
          // 设置字体
          context.font = '14px bold 黑体'
          // 设置颜色
          context.fillStyle = '#0061C0'
          context.textAlign = 'center'
          // context.textBaseline = 'middle'
          // 绘制文字（参数：要写的字，x坐标，y坐标）
          that.qrCodeName = `${codeName}`
          context.fillText(that.qrCodeName, 125, 248)
          // 设置水平对齐方式
          that.url = context.canvas.toDataURL('image/png')
        }
        )
      })
    },
    // 下载图片
    downloadFile () {
      const aLink = document.createElement('a')
      const blob = this.base64ToBlob(this.url) // new Blob([content]);
      const evt = document.createEvent('HTMLEvents')
      evt.initEvent('click', true, true)// initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
      aLink.download = this.qrCodeName
      aLink.href = URL.createObjectURL(blob)
      aLink.click()
    },
    // base64转blob
    base64ToBlob (code) {
      const parts = code.split(';base64,')
      const contentType = parts[0].split(':')[1]
      const raw = window.atob(parts[1])
      const rawLength = raw.length

      const uInt8Array = new Uint8Array(rawLength)

      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i)
      }
      return new Blob([uInt8Array], { type: contentType })
    }
  }
}
</script>

<style lang='scss' scoped>
.code-show {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -30px;
  cursor: pointer;
}
</style>
