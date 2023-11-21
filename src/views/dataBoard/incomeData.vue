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
      setOptions({ xData, yData } = {}) {
        this.chart.setOption({
          xAxis: {
            type: 'category',
            data: xData,
            axisTick: {
                show: false
            },
            axisLine:{
                lineStyle:{
                    color:'#C0C4CC'
                }
            },
          },
        //   legend: {
        //     data: [this.$t('deviceManage.spontaneousRevenue'), this.$t('deviceManage.electricitySalesRevenue'), this.$t('deviceManage.totalRevenue')]
        //   },
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            top: 20,
            bottom: 65,
            right: 20,
            left: 50
          },
          yAxis: {
            type: 'value',
            splitArea: false,
            axisTick: {
                show: false
            },
            axisLine:{
                lineStyle:{
                    color:'#C0C4CC'
                }
            },
          },
          series: [
            {
              data: yData,
              type: 'bar',
            //   name: this.$t('deviceManage.spontaneousRevenue'),
              color: '#208A42',
              barWidth: 10,
            },
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
  