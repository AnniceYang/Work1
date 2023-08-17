<template>
  <div
    id="slideVerify"
    class="slide-verify"
    :style="widthlable"
    onselectstart="return false;"
  >
    <canvas
      ref="canvas"
      :width="w"
      :height="h"
    />

    <canvas
      ref="block"
      :width="w"
      :height="h"
      class="slide-verify-block"
    />
    <!-- <div class="slide-verify-refresh-icon" @click="refresh" /> -->
    <div
      class="slide-verify-slider"
      :style="widthlable"
      :class="{'container-active': containerActive, 'container-success': containerSuccess, 'container-fail': containerFail}"
    >
      <div
        class="slide-verify-slider-mask"
        :style="{width: sliderMaskWidth}"
      >
        <div
          class="slide-verify-slider-mask-item"
          :style="{left: sliderLeft}"
          @mousedown="sliderDown"
          @touchstart="touchStartEvent"
          @touchmove="touchMoveEvent"
          @touchend="touchEndEvent"
        >
          <div class="slide-verify-slider-mask-item-icon">
            <!-- <a-icon type="double-right" /> -->
            <i class="el-icon-d-arrow-right"></i>
          </div>
        </div>

      </div>
      <span class="slide-verify-slider-text">{{ sliderText }}</span>
    </div>
    <div style="display:flex;margin-top:20px">
      <div>
        <!-- <a-icon
          type="reload"
          style="font-size: 25px;margin-right: 15px;cursor: pointer;"
        /> -->

        <i
          class="el-icon-refresh-right"
          style="font-size: 25px;cursor: pointer;"
          @click="refresh"
        ></i>
      </div>
      <div>
        <i
          class="el-icon-circle-close"
          style="font-size: 25px;cursor: pointer;"
          @click="close"
        ></i>
      </div>
      <div style="margin-left: auto"></div>
    </div>
  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
const PI = Math.PI
function sum (x, y) {
  return x + y
}

function square (x) {
  return x * x
}
export default {
  name: 'SlideVerify',
  props: {
    // block length
    l: {
      type: Number,
      default: 42
    },
    // block radius
    r: {
      type: Number,
      default: 10
    },
    // canvas width
    w: {
      type: Number,
      default: 310
    },
    // canvas height
    h: {
      type: Number,
      default: 155
    },
    blockX: {
      type: Number,
      default: 150
    },
    blockY: {
      type: Number,
      default: 0
    },
    sliderText: {
      type: String,
      default: 'Slide filled right'
    },
    imgurl: {
      type: String,
      default: ''
    },
    miniimgurl: {
      type: String,
      default: ''
    }

  },
  watch: {
    miniimgurl: {
      handler (newName, oldName) {
        this.miniImgUrl = newName
      },
      immediate: true
    },
    imgurl: {
      handler (newName, oldName) {
        this.imgUrl = newName
        this.initImg()
      },
      immediate: true
    },
  },
  data () {
    return {
      containerActive: false, // container active class
      containerSuccess: false, // container success class
      containerFail: false, // container fail class
      canvasCtx: null,
      blockCtx: null,
      block: null,
      canvasStr: null,
      L: this.l + this.r * 2 + 3, // block real lenght
      img: undefined,
      originX: undefined,
      originY: undefined,
      isMouseDown: false,
      trail: [],
      widthlable: '',
      // blockY: '',
      imgUrl: '',
      miniImgUrl: '',
      // miniimgurl: '',
      sliderLeft: 0, // block right offset
      sliderMaskWidth: 0 // mask width
    }
  },
  created () {
  },
  mounted () {
    // 随机生成数this.block_x =
    this.init()
    this.reset(this.block_y)
  },
  methods: {
    init () {
      this.$forceUpdate()
      this.initDom()
      this.bindEvents()
      this.widthlable = 'width:' + this.w + 'px;'
    },
    initDom () {
      this.block = this.$refs.block
      this.canvasStr = this.$refs.canvas

      this.canvasCtx = this.canvasStr.getContext('2d')
      this.blockCtx = this.block.getContext('2d')
    },
    initImg (h) {
      var that = this
      const img = document.createElement('img')
      img.onload = onload
      img.onerror = () => {
        img.src = that.imgUrl
      }

      img.src = that.imgUrl
      img.onload = function () {
        that.canvasCtx.drawImage(img, 0, 0, that.w, that.h)
      }

      this.img = img
      const img1 = document.createElement('img')
      var blockCtx = that.blockCtx
      // eslint-disable-next-line camelcase
      const block_y = h || that.block_y
      img1.onerror = () => {
        img1.src = that.miniImgUrl
      }
      img1.src = that.miniImgUrl
      img1.onload = function () {
        if (blockCtx) {
          blockCtx.drawImage(img1, 0, block_y, 46, 46)
        }
      }
    },
    refresh () {
      this.$emit('refresh')
    },
    close () {
      this.$emit('back')
    },
    sliderDown (event) {
      this.originX = event.clientX
      this.originY = event.clientY
      this.isMouseDown = true
    },
    touchStartEvent (e) {
      this.originX = e.changedTouches[0].pageX
      this.originY = e.changedTouches[0].pageY
      this.isMouseDown = true
    },
    bindEvents () {
      document.addEventListener('mousemove', (e) => {
        if (!this.isMouseDown) return false
        const moveX = e.clientX - this.originX
        const moveY = e.clientY - this.originY
        if (moveX < 0 || moveX + 15 >= this.w) return false
        const blockLeft = (this.w - 40 - 20) / (this.w - 40) * moveX
        this.sliderLeft = blockLeft + 'px'
        this.block.style.left = blockLeft + 'px'
        this.containerActive = true // add active
        this.sliderMaskWidth = blockLeft + 'px'
        this.trail.push(moveY)
      })
      document.addEventListener('mouseup', (e) => {
        if (!this.isMouseDown) return false
        this.isMouseDown = false
        if (e.clientX === this.originX) return false
        this.containerActive = false // remove active
        this.verify()
      })
    },
    touchMoveEvent (e) {
      if (!this.isMouseDown) return false
      const moveX = e.changedTouches[0].pageX - this.originX
      const moveY = e.changedTouches[0].pageY - this.originY
      if (moveX < 0 || moveX + 38 >= this.w) return false
      this.sliderLeft = moveX + 'px'
      const blockLeft = (this.w - 40 - 20) / (this.w - 40) * moveX
      this.block.style.left = blockLeft + 'px'

      this.containerActive = true
      this.sliderMaskWidth = moveX + 'px'
      this.trail.push(moveY)
    },
    touchEndEvent (e) {
      if (!this.isMouseDown) return false
      this.isMouseDown = false
      if (e.changedTouches[0].pageX === this.originX) return false
      this.containerActive = false
      this.verify()
    },
    verify () {
      const arr = this.trail // drag y move distance
      const average = arr.reduce(sum) / arr.length // average
      const deviations = arr.map(x => x - average) // deviation array
      // eslint-disable-next-line no-unused-vars
      const stddev = Math.sqrt(deviations.map(square).reduce(sum) / arr.length) // standard deviation
      const left = parseInt(this.block.style.left)
      this.$emit('success', left)
    },
    reset (h) {
      this.containerActive = false
      this.containerSuccess = false
      this.containerFail = false
      this.sliderLeft = 0
      this.block.style.left = 0
      this.sliderMaskWidth = 0
      this.canvasCtx.clearRect(0, 0, this.w, this.h)
      this.blockCtx.clearRect(0, 0, this.w, this.h)
      this.initImg(h)
    }

  }
}
</script>
<style scoped>
.slide-verify {
  position: relative;
  width: 300px;
}
.slide-verify-block {
  position: absolute;
  left: 0;
  top: 0;
}

.slide-verify-refresh-icon {
  position: absolute;
  right: 0;
  top: 0;
  width: 34px;
  height: 34px;
  cursor: pointer;
  background-size: 34px 471px;
}

.slide-verify-slider {
  position: relative;
  text-align: center;
  width: 310px;
  height: 40px;
  line-height: 40px;
  margin-top: 15px;
  background: #f7f9fa;
  color: #45494c;
  border: 1px solid #e4e7eb;
}

.slide-verify-slider-mask {
  position: absolute;
  left: 0;
  top: 0;
  height: 40px;
  border: 0 solid #1991fa;
  background: #d1e9fe;
}

.slide-verify-slider-mask-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  background: #fff;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: background 0.2s linear;
}

.slide-verify-slider-mask-item:hover {
  background: #1991fa;
}

.slide-verify-slider-mask-item:hover .slide-verify-slider-mask-item-icon {
  background-position: 0 -13px;
}

.slide-verify-slider-mask-item-icon {
  /* position: absolute;
        top: 15px;
        left: 13px;
        width: 14px;
        height: 12px; */
  font-size: 32px;
  /* background: url("../../assets/img/guide.png") 0 -437px; */
  /* background-size: 34px 471px */
}
.container-active .slide-verify-slider-mask-item {
  height: 38px;
  top: -1px;
  border: 1px solid #1991fa;
  color: #fff;
}

.container-active .slide-verify-slider-mask {
  height: 38px;
  border-width: 1px;
}

.container-success .slide-verify-slider-mask-item {
  height: 38px;
  top: -1px;
  border: 1px solid #52ccba;
  background-color: #52ccba !important;
}

.container-success .slide-verify-slider-mask {
  height: 38px;
  border: 1px solid #52ccba;
  background-color: #d2f4ef;
}

.container-success .slide-verify-slider-mask-item-icon {
  background-position: 0 0 !important;
}

.container-fail .slide-verify-slider-mask-item {
  height: 38px;
  top: -1px;
  border: 1px solid #f57a7a;
  background-color: #f57a7a !important;
}

.container-fail .slide-verify-slider-mask {
  height: 38px;
  border: 1px solid #f57a7a;
  background-color: #fce1e1;
}

.container-fail .slide-verify-slider-mask-item-icon {
  top: 14px;
  background-position: 0 -82px !important;
}

.container-active .slide-verify-slider-text,
.container-success .slide-verify-slider-text,
.container-fail .slide-verify-slider-text {
  display: none;
}
</style>
