<template>
  <div class="app-container realTime">
    <basic-container>
      <el-page-header @back="goBack" :content="`${deviceInfo.sn}设备自检`"></el-page-header>
      <el-form label-width="80px" style="margin-top: 10px;" :inline="true">
        <el-form-item label="自检项目">
          <el-select v-model="checkVal" placeholder="请选择">
            <el-option label="空闲" :value="0" />
            <el-option label="一段过压(59.S1)" :value="1" />
            <el-option label="二段过压(59.S2)" :value="2" />
            <el-option label="一段欠压(27.S1)" :value="3" />
            <el-option label="二段欠压(27.S2)" :value="4" />
            <el-option label="一段过频(81>.S1)" :value="5" />
            <el-option label="二段过频(81>.S2)" :value="6" />
            <el-option label="一段欠频(81<.S1)" :value="7" />
            <el-option label="二段欠频(81<.S2)" :value="8" />
          </el-select>
        </el-form-item>
        <el-form-item >
          <el-button :loading="loadingState" @click="handleSubmit" type="primary">自检</el-button>
        </el-form-item>
      </el-form>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-table :data="tableData1" style="width: 100%">
            <el-table-column prop="type" label="类目" width="200" />
            <el-table-column prop="unit" label="单位" />
            <el-table-column prop="value" label="数值" />
            <el-table-column prop="range" label="范围" />
          </el-table>
        </el-col>

        <el-col :span="12">
          <el-table :data="tableData2" style="width: 100%">
            <el-table-column prop="type" label="类目" width="200" />
            <el-table-column prop="unit" label="单位" />
            <el-table-column prop="value" label="数值" />
            <el-table-column prop="range" label="范围" />
          </el-table>
        </el-col>

        <el-col :span="24">
          <el-card class="box-card">
            <div slot="header">
              <span>自检记录</span>
            </div>
            <el-form :inline="true">
              <el-form-item label="自检结果">
                <el-select v-model="listQuery.checkStatus" placeholder="请选择">
                  <el-option label="成功" :value="0" />
                  <el-option label="失败" :value="1" />
                </el-select>
              </el-form-item>
              <el-form-item label="自检项目">
                <el-select v-model="listQuery.type" placeholder="请选择">
                  <el-option label="空闲" :value="0" />
                  <el-option label="一段过压(59.S1)" :value="1" />
                  <el-option label="二段过压(59.S2)" :value="2" />
                  <el-option label="一段欠压(27.S1)" :value="3" />
                  <el-option label="二段欠压(27.S2)" :value="4" />
                  <el-option label="一段过频(81>.S1)" :value="5" />
                  <el-option label="二段过频(81>.S2)" :value="6" />
                  <el-option label="一段欠频(81<.S1)" :value="7" />
                  <el-option label="二段欠频(81<.S2)" :value="8" />
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="getData(true)">搜索</el-button>
                <el-button type="primary" @click="handleReset()">重置</el-button>
              </el-form-item>
            </el-form>
            <el-table :data="listData" style="width: 100%">
              <el-table-column label="自检项目">
                <template slot-scope="scope">
                  {{ scope.row.type | selfTestTypeFilter }}
                </template>
              </el-table-column>
              <el-table-column label="自检结果">
                <template slot-scope="scope">
                  <el-tag type="success" v-if="scope.row.checkStatus === 0">成功</el-tag>
                  <el-tag type="danger" v-else>失败</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="selfCheckActualProtectionThreshold" label="自检实际保护阀值" />
              <el-table-column prop="selfCheckActualProtectionTime" label="自检实际保护时间" />
              <el-table-column prop="selfCheckRealTimeProtectionThreshold" label="自检实时保护阀值" />
              <el-table-column align="center" label="自检时间" width="150">
                <template slot-scope="scope">
                  {{ scope.row.checkTime | parseTime }}
                </template>
              </el-table-column>
            </el-table>
            <div style="display: flex; justify-content: center;">
              <el-pagination
                @current-change="currentChangeHandle"
                :current-page="listQuery.current"
                :page-size="listQuery.size"
                :total="total"
                layout="total, prev, pager, next"
              />
            </div>
            
          </el-card>
        </el-col>
      </el-row>
  
    </basic-container>
  </div>
</template>

<script>
import { baseMqtt } from "@/config/env"
const mqtt = require("mqtt/dist/mqtt.js");
import { selfCheck, getConfigData, qrySelfCheckNew, qrySelfCheckRecord } from "@/api/device";
export default {
  data() {
    return {
      visible: false,
      loadingState: false,
      checkVal: 0,
      deviceInfo: {},
      tableData1: [],
      tableData2: [],
      timeOutObj: null,
      listQuery: {
        current: 1,
        size: 5
      },
      listData: [],
      total: 0,
      // mqtt
      mqttClient: null,
      connectState: "init",
      interObj: null,
    };
  },
  methods: {
    init(info) {
      this.deviceInfo = info
      this.handleMqttInit()
      this.initData()
      this.getData(true)
    },
    // 开始自检
    handleSubmit() {
      this.loadingState = true;
      this.timeOutObj && clearTimeout(this.timeOutObj)
      this.timeOutObj = setTimeout(() => {
        this.$message.error('通讯无响应')
        this.loadingState = false
      }, 60000)
      selfCheck({ checkVal: this.checkVal, deviceId: this.deviceInfo.id }).catch(() => {
        clearTimeout(this.timeOutObj)
        this.loadingState = false;
      })
    },
    // 查询最新自检数据  只渲染最后三个字段
    getNewData() {
      qrySelfCheckNew({ deviceId: this.deviceInfo.id, type: 0 }).then(res => {
        if (res) {
          this.tableData2[6].value = res.selfCheckActualProtectionThreshold
          this.tableData2[7].value = res.selfCheckActualProtectionTime
          this.tableData2[8].value = res.selfCheckRealTimeProtectionThreshold
        }
      })
    },
    getData(state) {
      state && (this.listQuery.current = 1)
      qrySelfCheckRecord(this.listQuery).then(res => {
        this.listData = res.records
        this.total = res.total
      })
    },
    // 当前页
    currentChangeHandle(val) {
      this.listQuery.current = val
      this.getData()
    },
    // 重置
    handleReset() {
      this.listQuery = {
        current: 1,
        size: 5,
      };
      this.getData()
    },
    // mqtt初始化
    handleMqttInit() {
      this.mqttClient = mqtt.connect(baseMqtt, {
        protocolVersion: 4,
        reconnectPeriod: 1000,
        connectTimeout: 30 * 1000,
        resubscribe: true,
        keepalive: 3,
        clientId: "mqttjs_" + Math.random().toString(16).substr(2, 8),
      });
      this.mqttClient.on("connect", (res) => {
        this.connectState = "connect";
        this.subscribeInfo();
        console.log("mqtt连接成功", res);
      }).on("message", (topic, message) => {
        const messageInfo = JSON.parse(message.toString());
        console.log('msgOperation===>',  messageInfo.msgOperation, messageInfo.valType)
        if (messageInfo.msgOperation === 5 && messageInfo.valType === 12) { // 只渲染除最后三个外的
          console.log('初始化数据', JSON.parse(messageInfo.val))
          const valInfo = JSON.parse(messageInfo.val)
          this.tableData1[0].value = valInfo.upperLimitValueOfGridVoltageProtection1
          this.tableData1[1].value = valInfo.gridVoltageProtectionUpperLimitTime1
          this.tableData1[2].value = valInfo.upperLimitValueOfGridVoltageProtection2
          this.tableData1[3].value = valInfo.gridVoltageProtectionUpperLimitTime2
          this.tableData1[4].value = valInfo.lowerLimitValueOfGridVoltageProtection1
          this.tableData1[5].value = valInfo.gridVoltageProtectionLowerLimitTime1
          this.tableData1[6].value = valInfo.lowerLimitValueOfGridVoltageProtection2
          this.tableData1[7].value = valInfo.gridVoltageProtectionLowerLimitTime2
          this.tableData1[8].value = valInfo.upperLimitValueOfGridFrequencyProtection1
          this.tableData1[9].value = valInfo.gridFrequencyProtectionUpperLimitTime1
          this.tableData2[0].value = valInfo.upperLimitValueOfGridFrequencyProtection2
          this.tableData2[1].value = valInfo.gridFrequencyProtectionUpperLimitTime2
          this.tableData2[2].value = valInfo.lowerLimitValueOfGridFrequencyProtection1
          this.tableData2[3].value = valInfo.gridFrequencyProtectionLowerLimitTime1
          this.tableData2[4].value = valInfo.lowerLimitValueOfGridFrequencyProtection2
          this.tableData2[5].value = valInfo.gridFrequencyProtectionLowerLimitTime2
        } else if (messageInfo.msgOperation === 15) { // 只渲染最后三个  0自检成功   1自检失败
          this.loadingState = false
          clearTimeout(this.timeOutObj)
          if (messageInfo.valType === 0) {
            console.log('自检最新数据', JSON.parse(messageInfo.val))
            const valInfo = JSON.parse(messageInfo.val)
            this.tableData2[6].value = valInfo.selfCheckActualProtectionThreshold
            this.tableData2[7].value = valInfo.selfCheckActualProtectionTime
            this.tableData2[8].value = valInfo.selfCheckRealTimeProtectionThreshold
          } else if (messageInfo.valType === 1) {
            this.$message.error('自检失败')
          }
        } else if (messageInfo.msgOperation === 14) { // 1下发成功   2下发失败
          if (messageInfo.valType === 2) {
            this.loadingState = false
            clearTimeout(this.timeOutObj)
            this.$message.error('下发失败')
          }
        }
      });
    },
    // 订阅主题 /APP/设备id/NEWS
    subscribeInfo() {
      if (!this.mqttClient || this.connectState !== 'connect') {
        this.toast('通讯未连接')
        return
      }
      this.mqttClient.subscribe(`/APP/${this.deviceInfo.id}/NEWS`, (err, granted) => {
        console.log('订阅主题', `/APP/${this.deviceInfo.id}/NEWS`, err, granted)
        if (!err) {
          console.log('===订阅主题 订阅成功===')
          getConfigData({ deviceId: this.deviceInfo.id, val: 12 })
          this.getNewData()
        }
      })
    },
    initData() {
      this.tableData1 = [
        { type: '电网电压保护上限值1', unit: 'V', value: '', range: '208~300' },
        { type: '电网电压保护上限时间1', unit: 'ms', value: '', range: '0~30000' },
        { type: '电网电压保护上限值2', unit: 'V', value: '', range: '208~300' },
        { type: '电网电压保护上限时间2', unit: 'ms', value: '', range: '0~30000' },
        { type: '电网电压保护下限值1', unit: 'V', value: '', range: '0~216' },
        { type: '电网电压保护下限时间1', unit: 'ms', value: '', range: '0~30000' },
        { type: '电网电压保护下限值2', unit: 'V', value: '', range: '0~216' },
        { type: '电网电压保护下限时间2', unit: 'ms', value: '', range: '0~30000' },
        { type: '电网频率保护上限值1', unit: 'Hz', value: '', range: '50~65' },
        { type: '电网频率保护上限时间1', unit: 'ms', value: '', range: '0~30000' },
      ]
      this.tableData2 =[
        { type: '电网频率保护上限值2', unit: 'Hz', value: '', range: '50~65' },
        { type: '电网频率保护上限时间2', unit: 'ms', value: '', range: '0~30000' },
        { type: '电网频率保护下限值1', unit: 'Hz', value: '', range: '45~60' },
        { type: '电网频率保护下限时间1', unit: 'ms', value: '', range: '0~30000' },
        { type: '电网频率保护下限值2', unit: 'Hz', value: '', range: '45~60' },
        { type: '电网频率保护下限时间2', unit: 'ms', value: '', range: '0~30000' },
        { type: '自检实际保护阀值', unit: 'V(/Hz)', value: '', range: '' },
        { type: '自检实际保护时间', unit: 'ms', value: '', range: '' },
        { type: '自检实时保护阀值', unit: 'V(/Hz)', value: '', range: '' },
      ]
    },
    goBack() {
      this.$emit('back')
    },
  },
  beforeDestroy() {
    console.log("页面卸载了====关闭mqtt客户端连接");
    if (this.mqttClient) {
      this.mqttClient.end(true);
        this.mqttClient = null;
        this.connectState = "init"
        this.interObj && clearInterval(this.interObj)
        this.timeOutObj && clearTimeout(this.timeOutObj)
    }
  },
};
</script>

<style lang="scss" scoped>
.btn {
  display: flex;
  justify-content: center;
}
</style>