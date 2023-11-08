<template>
  <el-dialog
    :title="$t('ordinaryUser.title')"
    :close-on-click-modal="false"
    :visible.sync="visible"
    width="800px"
  >
    <el-form :model="dataForm" ref="dataForm" label-width="110px">
      <el-form-item :label="$t('ordinaryUser.time1')">
        <div v-for="(item, index) in dataForm.buyTimeQuantum" :key="index" style="margin-bottom: 10px;">
          <el-time-picker style="width: 150px;" format="HH:mm"  value-format="HH:mm" :placeholder="$t('common.startingTime')" v-model="item.start" />
          <el-time-picker style="width: 150px; margin-left: 10px;" format="HH:mm"  value-format="HH:mm" :placeholder="$t('common.endTime')" v-model="item.end" />
          <el-input :placeholder="$t('common.inputPrompt')" v-model="item.price" style="width: 200px;margin-left: 10px;">
            <template slot="append">{{$t('ordinaryUser.yuan')}}</template>
          </el-input>
          <el-button @click="addChargeTime()" style="margin-left: 10px;" type="primary" icon="el-icon-plus" circle v-if="index === 0"  />
          <el-button @click="delChargeTime(index)" style="margin-left: 10px;" type="danger" icon="el-icon-delete" circle v-else />
        </div>
      </el-form-item>
      <el-form-item :label="$t('ordinaryUser.time2')">
        <div v-for="(item, index) in dataForm.sellTimeQuantum" :key="index" style="margin-bottom: 10px;">
          <el-time-picker style="width: 150px;" format="HH:mm"  value-format="HH:mm" :placeholder="$t('common.startingTime')" v-model="item.start" />
          <el-time-picker style="width: 150px; margin-left: 10px;" format="HH:mm"  value-format="HH:mm" :placeholder="$t('common.endTime')" v-model="item.end" />
          <el-input :placeholder="$t('common.inputPrompt')" v-model="item.price" style="width: 200px;margin-left: 10px;">
            <template slot="append">{{$t('ordinaryUser.yuan')}}</template>
          </el-input>
          <el-button @click="addDischargeTime()" style="margin-left: 10px;" type="primary" icon="el-icon-plus" circle v-if="index === 0"  />
          <el-button @click="delDischargeTime(index)" style="margin-left: 10px;" type="danger" icon="el-icon-delete" circle v-else />
        </div>
      </el-form-item>
    </el-form>

    <span slot="footer">
      <el-button @click="visible = false">{{$t('common.cancel')}}</el-button>
      <el-button type="primary" @click="handleSubmit()">{{$t('common.confirm')}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getDefaultCellInfo, saveDefaultCellInfo } from "@/api/appUser";
export default {
  data() {
    return {
      visible: false,
      loadingState: false,
      dataForm: {},
    };
  },
  methods: {
    init() {
      this.dataForm = {
        buyTimeQuantum: [{ start: '00:00', end: '', price: '', sort: 1 }],
        sellTimeQuantum: [{ start: '00:00', end: '', price: '', sort: 1 }]
      };
      getDefaultCellInfo({ userId: 0 }).then(res => {
        if (res && res.id) {
          this.dataForm.buyTimeQuantum = res.buyTimeQuantum.map(item => {
            item.start = this.minToTime(item.start)
            item.end = this.minToTime(item.end)
            return item
          })
          this.dataForm.sellTimeQuantum = res.sellTimeQuantum.map(item => {
            item.start = this.minToTime(item.start)
            item.end = this.minToTime(item.end)
            return item
          })
        }
      })
      this.visible = true
    },
    handleSubmit() {
      console.log('this.dataForm', this.dataForm)
      this.loadingState = true;
      let info = JSON.parse(JSON.stringify(this.dataForm))
      info.buyTimeQuantum = info.buyTimeQuantum.map(item => {
        item.start = this.timeToMin(item.start)
        item.end = this.timeToMin(item.end)
        return item
      })
      info.sellTimeQuantum = info.sellTimeQuantum.map(item => {
        item.start = this.timeToMin(item.start)
        item.end = this.timeToMin(item.end)
        return item
      })
      console.log('info', info)
      saveDefaultCellInfo(info).then((res) => {
        this.$message.success(this.$t('common.addedSuccessfully'));
        this.visible = false
      }).finally(() => {
        this.loadingState = false;
      });
    },
    addChargeTime() {
      const lastData = this.dataForm.buyTimeQuantum[this.dataForm.buyTimeQuantum.length - 1]
      const sort = lastData.sort + 1
      let startTime = ''
      if (lastData.end) {
        startTime = this.minToTime(this.timeToMin(lastData.end) + 1)
      }
      this.dataForm.buyTimeQuantum.push({ start: startTime, end: '', sort: sort })
    },
    delChargeTime(index) {
      this.dataForm.buyTimeQuantum.splice(index, 1)
    },
    addDischargeTime() {
      const lastData = this.dataForm.sellTimeQuantum[this.dataForm.sellTimeQuantum.length - 1]
      const sort = lastData.sort + 1
      let startTime = ''
      if (lastData.end) {
        startTime = this.minToTime(this.timeToMin(lastData.end) + 1)
      }
      this.dataForm.sellTimeQuantum.push({ start: startTime, end: '', sort: sort })
    },
    delDischargeTime(index) {
      this.dataForm.sellTimeQuantum.splice(index, 1)
    },
    // 时间转分钟
    timeToMin(time) {
      let arr = time.split(':')
      return arr[0] * 60 + arr[1] * 1
    },
    // 分钟转时间
    minToTime(min) {
      return Math.floor(min / 60) + ':' + min % 60
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