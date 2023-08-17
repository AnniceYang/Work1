<template>
  <el-dialog
    title="设备电池设置"
    :close-on-click-modal="false"
    :visible.sync="visible"
    width="650px"
  >
  <el-row :gutter="20">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" label-width="110px">
      <el-col :span="12">
        <el-form-item label="充电开关" prop="chargeSwitch">
          <el-radio-group v-model="dataForm.chargeSwitch">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="充电截至SOC" prop="chargeCutOff">
          <el-input v-model="dataForm.chargeCutOff" placeholder="请输入">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="充电时间段">
          <div v-for="(item, index) in dataForm.chargeTimeQuantum" :key="index" style="margin-bottom: 10px;">
            <el-time-picker style="width: 200px;" format="HH:mm"  value-format="HH:mm" placeholder="起始时间" v-model="item.start" />
            <el-time-picker style="width: 200px; margin-left: 10px;" format="HH:mm"  value-format="HH:mm" placeholder="结束时间" v-model="item.end" />
            <el-button @click="addChargeTime()" style="margin-left: 10px;" type="primary" icon="el-icon-plus" circle v-if="index === 0"  />
            <el-button @click="delChargeTime(index)" style="margin-left: 10px;" type="danger" icon="el-icon-delete" circle v-else />
          </div>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="卖电开关" prop="dischargeSwitch">
          <el-radio-group v-model="dataForm.dischargeSwitch">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="卖电截至SOC" prop="dischargeCutOff">
          <el-input v-model="dataForm.dischargeCutOff" type="Number" placeholder="请输入">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="卖电时间段">
          <div v-for="(item, index) in dataForm.dischargeTimeQuantum" :key="index" style="margin-bottom: 10px;">
            <el-time-picker style="width: 200px;" format="HH:mm"  value-format="HH:mm" placeholder="起始时间" v-model="item.start" />
            <el-time-picker style="width: 200px; margin-left: 10px;" format="HH:mm"  value-format="HH:mm" placeholder="结束时间" v-model="item.end" />
            <el-button @click="addDischargeTime()" style="margin-left: 10px;" type="primary" icon="el-icon-plus" circle v-if="index === 0"  />
            <el-button @click="delDischargeTime(index)" style="margin-left: 10px;" type="danger" icon="el-icon-delete" circle v-else />
          </div>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="放电开关" prop="releaseSwitch">
          <el-radio-group v-model="dataForm.releaseSwitch">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="放电截至SOC" prop="releaseCutOff">
          <el-input v-model="dataForm.releaseCutOff" type="Number" placeholder="请输入">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="放电时间段">
          <el-row v-for="(item, index) in dataForm.releaseTimeQuantum" :key="index" style="margin-bottom: 10px;">
            <el-time-picker style="width: 200px;" format="HH:mm"  value-format="HH:mm" placeholder="起始时间" v-model="item.start" />
            <el-time-picker style="width: 200px; margin-left: 10px;" format="HH:mm"  value-format="HH:mm" placeholder="结束时间" v-model="item.end" />
            <el-button @click="addReleaseTime()" style="margin-left: 10px;" type="primary" icon="el-icon-plus" circle v-if="index === 0"  />
            <el-button @click="delReleaseTime(index)" style="margin-left: 10px;" type="danger" icon="el-icon-delete" circle v-else />
          </el-row>
        </el-form-item>
      </el-col>
    </el-form>
  </el-row>
    <span slot="footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="warning" @click="handleDefault()">恢复默认设置</el-button>
      <el-button type="primary" @click="handleSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { qryCellInfo, addCellInfo, editCellInfo } from "@/api/device";
import { stat } from "fs";
export default {
  data() {
    return {
      visible: false,
      loadingState: false,
      dataForm: {},
      dataRule: {
        chargeCutOff: [{ required: true, message: "请输入充电时间段充电截至SOC", trigger: "blur" }],
        dischargeCutOff: [{ required: true, message: "请输入卖电时间段充电截至SOC", trigger: "blur" }]
      },
      deviceId: ''
    };
  },
  methods: {
    init(info) {
      this.dataForm = {
        chargeCutOff: null,
        dischargeCutOff: null,
        releaseCutOff: null,
        chargeTimeQuantum: [{ start: '00:00', end: '', sort: 1 }],
        dischargeTimeQuantum: [{ start: '00:00', end: '', sort: 1 }],
        releaseTimeQuantum: [{ start: '00:00', end: '', sort: 1 }],
        deviceId: info.id,
        chargeSwitch: 0,
        dischargeSwitch: 0,
        releaseSwitch: 0,
      };
      this.deviceId = info.id
      this.getInfo()
      
      this.visible = true
      this.$nextTick(() => {
        this.$refs.dataForm.clearValidate()
      });
    },
    getInfo() {
      qryCellInfo({ deviceId: this.deviceId }).then(res => {
        console.log(res)
        if (res && res.id) {
          this.dataForm = {
            chargeCutOff: res.chargeCutOff,
            dischargeCutOff: res.dischargeCutOff,
            releaseCutOff: res.releaseCutOff,
            chargeTimeQuantum: [{ start: '00:00', end: '', sort: 1 }],
            dischargeTimeQuantum: [{ start: '00:00', end: '', sort: 1 }],
            releaseTimeQuantum: [{ start: '00:00', end: '', sort: 1 }],
            deviceId: res.deviceId,
            chargeSwitch: res.chargeSwitch,
            dischargeSwitch: res.dischargeSwitch,
            releaseSwitch: res.releaseSwitch,
          };
          this.dataForm.chargeTimeQuantum = res.chargeTimeQuantum.map(item => {
            item.start = this.minToTime(item.start)
            item.end = this.minToTime(item.end)
            return item
          })
          this.dataForm.dischargeTimeQuantum = res.dischargeTimeQuantum.map(item => {
            item.start = this.minToTime(item.start)
            item.end = this.minToTime(item.end)
            return item
          })
          this.dataForm.releaseTimeQuantum = res.releaseTimeQuantum.map(item => {
            item.start = this.minToTime(item.start)
            item.end = this.minToTime(item.end)
            return item
          })
        }
      })
    },
    // 恢复默认
    handleDefault() {
      editCellInfo({ deviceId: this.deviceId }).then(res => {
        console.log(res)
        this.$message.success(this.$t('common.operationSuccessful'))
        this.getInfo()
      })
    },
    handleSubmit() {
      console.log('this.dataForm', this.dataForm)
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          this.loadingState = true;
          let info = JSON.parse(JSON.stringify(this.dataForm))
          info.chargeTimeQuantum = info.chargeTimeQuantum.map(item => {
            item.start = this.timeToMin(item.start)
            item.end = this.timeToMin(item.end)
            return item
          })
          info.dischargeTimeQuantum = info.dischargeTimeQuantum.map(item => {
            item.start = this.timeToMin(item.start)
            item.end = this.timeToMin(item.end)
            return item
          })
          info.releaseTimeQuantum = info.releaseTimeQuantum.map(item => {
            item.start = this.timeToMin(item.start)
            item.end = this.timeToMin(item.end)
            return item
          })
          // if (
          //   info.chargeTimeQuantum[0].start != 0 || info.chargeTimeQuantum[info.chargeTimeQuantum.length - 1].end != 1439 ||
          //   info.dischargeTimeQuantum[0].start != 0 || info.dischargeTimeQuantum[info.dischargeTimeQuantum.length - 1].end != 1439
          // ) {
          //   return this.$message.warning('时间段必须全天范围(00:00~23:59)')
          // }
          addCellInfo(info).then((res) => {
            this.$message.success(this.$t('common.successfulModification'));
            this.visible = false
            this.$emit("back");
          }).finally(() => {
            this.loadingState = false;
          });
        }
      });
    },
    verifyData(addData, state) {
      if (!addData.start || !addData.end) {
        this.$message.warning('请将数据填写完整')
        return false
      }
      let allData = []
      if (state === 'chargeTime') {
        allData = [ ...this.dataForm.dischargeTimeQuantum, ...this.dataForm.releaseTimeQuantum, ...this.dataForm.chargeTimeQuantum ]
      } else if (state === 'dischargeTime') {
        allData = [ ...this.dataForm.chargeTimeQuantum, ...this.dataForm.releaseTimeQuantum, ...this.dataForm.dischargeTimeQuantum ]
      } else if (state === 'releaseTime') {
        allData = [ ...this.dataForm.chargeTimeQuantum, ...this.dataForm.dischargeTimeQuantum, ...this.dataForm.releaseTimeQuantum ]
      }
      allData.pop()
      for (let i = 0; i < allData.length; i++) {
        let item = allData[i]
        let itemStart = this.timeToMin(item.start)
        let itemEnd = this.timeToMin(item.end)
        let addTimeStart = this.timeToMin(addData.start)
        let addTimeEnd = this.timeToMin(addData.end)
        if ((addTimeStart >= itemStart && addTimeStart <= itemEnd) || (addTimeEnd >= itemStart && addTimeEnd <= itemEnd)) {
          this.$message.warning('时间段范围不能重合')
          return false
        }
      }
      return true
    },
    addChargeTime() {
      const lastData = this.dataForm.chargeTimeQuantum[this.dataForm.chargeTimeQuantum.length - 1]
      if (this.verifyData(lastData, 'chargeTime')) {
        console.log('校验成功')
        const sort = lastData.sort + 1
        let startTime = ''
        if (lastData.end) {
          startTime = this.minToTime(this.timeToMin(lastData.end) + 1)
        }
        this.dataForm.chargeTimeQuantum.push({ start: startTime, end: '', sort: sort })
      }
    },
    delChargeTime(index) {
      this.dataForm.chargeTimeQuantum.splice(index, 1)
    },
    addDischargeTime() {
      const lastData = this.dataForm.dischargeTimeQuantum[this.dataForm.dischargeTimeQuantum.length - 1]
      if (this.verifyData(lastData, 'dischargeTime')) {
        const sort = lastData.sort + 1
        let startTime = ''
        if (lastData.end) {
          startTime = this.minToTime(this.timeToMin(lastData.end) + 1)
        }
        this.dataForm.dischargeTimeQuantum.push({ start: startTime, end: '', sort: sort })
      }
    },
    delDischargeTime(index) {
      this.dataForm.dischargeTimeQuantum.splice(index, 1)
    },
    addReleaseTime() {
      const lastData = this.dataForm.releaseTimeQuantum[this.dataForm.releaseTimeQuantum.length - 1]
      if (this.verifyData(lastData, 'releaseTime')) {
        const sort = lastData.sort + 1
        let startTime = ''
        if (lastData.end) {
          startTime = this.minToTime(this.timeToMin(lastData.end) + 1)
        }
        this.dataForm.releaseTimeQuantum.push({ start: startTime, end: '', sort: sort })
      }
    },
    delReleaseTime(index) {
      this.dataForm.releaseTimeQuantum.splice(index, 1)
    },
    // 时间转分钟
    timeToMin(time) {
      if (time) {
        let arr = time.split(':')
        return arr[0] * 60 + arr[1] * 1
      } else {
        return 0
      }
    },
    // 分钟转时间
    minToTime(min) {
      return min ? (Math.floor(min / 60) + ':' + min % 60) : '00:00'
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