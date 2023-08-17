<template>
    <div :class="className" :style="{height:height,width:width}" />
  </template>
  
  <script>
  import echarts from 'echarts'
  require('echarts/theme/macarons') // echarts theme
  import { debounce } from '@/util/util'
  
  export default {
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '100%'
      },
      autoResize: {
        type: Boolean,
        default: true
      },
      chartData: {
        type: Object,
        default: () => { return {} }
      },
      title: {
        type: String,
        default: null
      }
    },
    data() {
      return {
        chart: null
      }
    },
    watch: {
      chartData: {
        deep: true,
        handler(val) {
          this.setOptions(val)
        }
      }
    },
    mounted() {
      this.initChart()
      if (this.autoResize) {
        this.__resizeHandler = debounce(() => {
          if (this.chart) {
            this.chart.resize()
          }
        }, 100)
        window.addEventListener('resize', this.__resizeHandler)
        setTimeout(() => {
          if (this.chart) {
            this.chart.resize()
          }
        }, 600)
      }
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      if (this.autoResize) {
        window.removeEventListener('resize', this.__resizeHandler)
      }
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      setOptions({ xData, yData, otherData } = {}) {
        this.chart.setOption({
          xAxis: {
            type: 'category',
            data: xData
          },
          legend: {
            // data: ['电池']
          },
          tooltip: {
            trigger: 'axis',
            // formatter: '{b0}<br />电池：{c0}w<br />'
          },
          grid: {
            top: 20,
            bottom: 80,
            right: 10,
            left: 50
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: yData,
              type: 'line',
              name: otherData.name,
              color: otherData.color,
              areaStyle: {
                opacity: 0.4,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                    offset: 0,
                    color: otherData.color
                    // color: '#25C5D9'
                },
                {
                    offset: 1,
                    color: '#FFFFFF'
                }
                ])
              },
              showSymbol: false,
            }
          ]
        })
      },
      initChart() {
        this.chart = echarts.init(this.$el, 'macarons')
        this.setOptions(this.chartData)
      }
    }
  }
  </script>
  