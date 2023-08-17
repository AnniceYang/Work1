<template>
  <div class="container">
    <template v-if="type === '0'">
      <el-card>
        <div slot="header">
          <span>运行信息</span>
          <el-switch
            style="margin-left: 10px"
            v-model="operationInformation.isShow"
            @change="changeOperationInformation"
          />
          <el-button
            style="float: right; margin-top: -10px"
            type="primary"
            @click="handleSave()"
            >保存</el-button
          >
        </div>

        <el-card>
          <div slot="header">
            <span>运行信息</span>
            <el-switch
              style="margin-left: 10px"
              v-model="operationInformation.runInformation"
              @change="changeOperationInformationItem('runInformation')"
            />
          </div>
          <el-descriptions title="" :column="4">
            <el-descriptions-item label="显示类型">
              <el-switch
                v-model="operationInformation.runInformationObj.displayType"
              />
            </el-descriptions-item>
            <el-descriptions-item label="MCU软件版本">
              <el-switch
                v-model="
                  operationInformation.runInformationObj.mcuSoftwareVersion
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="DSP软件版本">
              <el-switch
                v-model="
                  operationInformation.runInformationObj.dspSoftwareVersion
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="MCU硬件版本">
              <el-switch
                v-model="
                  operationInformation.runInformationObj.mcuHardwareVersion
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="DSP硬件版本">
              <el-switch
                v-model="
                  operationInformation.runInformationObj.dspHardwareVersion
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="系统当前模式">
              <el-switch
                v-model="
                  operationInformation.runInformationObj.currentModeOfTheSystem
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="系统运行状态">
              <el-switch
                v-model="operationInformation.runInformationObj.systemRunStatus"
              />
            </el-descriptions-item>
          </el-descriptions>
        </el-card>

        <el-card style="margin-top: 10px">
          <div slot="header">
            <span>基本信息</span>
            <el-switch
              style="margin-left: 10px"
              v-model="operationInformation.basicInformation"
              @change="changeOperationInformationItem('basicInformation')"
            />
          </div>
          <el-descriptions title="" :column="4">
            <el-descriptions-item label="DCDC温度">
              <el-switch
                v-model="
                  operationInformation.basicInformationObj.dcdcTemperature
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="国家码">
              <el-switch
                v-model="operationInformation.basicInformationObj.countryCode"
              />
            </el-descriptions-item>
            <el-descriptions-item label="母线电压">
              <el-switch
                v-model="operationInformation.basicInformationObj.busVoltage"
              />
            </el-descriptions-item>
            <el-descriptions-item label="日发电量">
              <el-switch
                v-model="
                  operationInformation.basicInformationObj.dailyPowerGeneration
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="总发电量">
              <el-switch
                v-model="
                  operationInformation.basicInformationObj.totalPowerGeneration
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="额定功率">
              <el-switch
                v-model="operationInformation.basicInformationObj.ratedPower"
              />
            </el-descriptions-item>
            <el-descriptions-item label="电池能量">
              <el-switch
                v-model="operationInformation.basicInformationObj.batteryEnergy"
              />
            </el-descriptions-item>
          </el-descriptions>
        </el-card>

        <el-card style="margin-top: 10px">
          <div slot="header">
            <span>PV信息</span>
            <el-switch
              style="margin-left: 10px"
              v-model="operationInformation.pvInformation"
              @change="changeOperationInformationItem('pvInformation')"
            />
          </div>
          <el-descriptions title="" :column="4">
            <el-descriptions-item label="PV1电压">
              <el-switch
                v-model="operationInformation.pvInformationObj.pv1Voltage"
              />
            </el-descriptions-item>
            <el-descriptions-item label="PV1电流">
              <el-switch
                v-model="operationInformation.pvInformationObj.pv1Current"
              />
            </el-descriptions-item>
            <el-descriptions-item label="PV1功率">
              <el-switch
                v-model="operationInformation.pvInformationObj.pv1Power"
              />
            </el-descriptions-item>
            <el-descriptions-item label="PV2电压">
              <el-switch
                v-model="operationInformation.pvInformationObj.pv2Voltage"
              />
            </el-descriptions-item>
            <el-descriptions-item label="PV2电流">
              <el-switch
                v-model="operationInformation.pvInformationObj.pv2Current"
              />
            </el-descriptions-item>
            <el-descriptions-item label="PV2功率">
              <el-switch
                v-model="operationInformation.pvInformationObj.pv2Power"
              />
            </el-descriptions-item>
          </el-descriptions>
        </el-card>

        <el-card style="margin-top: 10px">
          <div slot="header">
            <span>电池信息</span>
            <el-switch
              style="margin-left: 10px"
              v-model="operationInformation.batteryInformation"
              @change="changeOperationInformationItem('batteryInformation')"
            />
          </div>
          <el-descriptions title="" :column="4">
            <el-descriptions-item label="电池状态">
              <el-switch
                v-model="
                  operationInformation.batteryInformationObj.batteryStatus
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="电池电压">
              <el-switch
                v-model="
                  operationInformation.batteryInformationObj.batteryVoltage
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="电池电流">
              <el-switch
                v-model="
                  operationInformation.batteryInformationObj.batteryCurrent
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="电池功率">
              <el-switch
                v-model="
                  operationInformation.batteryInformationObj.batteryPower
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="电池总SOC">
              <el-switch
                v-model="
                  operationInformation.batteryInformationObj.batteryTotalSoc
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="BMS标志">
              <el-switch
                v-model="operationInformation.batteryInformationObj.bmsSign"
              />
            </el-descriptions-item>
          </el-descriptions>
        </el-card>

        <el-card style="margin-top: 10px">
          <div slot="header">
            <span>电网信息</span>
            <el-switch
              style="margin-left: 10px"
              v-model="operationInformation.powerGridInformation"
              @change="changeOperationInformationItem('powerGridInformation')"
            />
          </div>
          <el-descriptions title="" :column="4">
            <el-descriptions-item label="电网状态">
              <el-switch
                v-model="
                  operationInformation.powerGridInformationObj.powerGridStatus
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="A相电网频率">
              <el-switch
                v-model="
                  operationInformation.powerGridInformationObj.gridFrequencyA
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="B相电网频率">
              <el-switch
                v-model="
                  operationInformation.powerGridInformationObj.gridFrequencyB
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="C相电网频率">
              <el-switch
                v-model="
                  operationInformation.powerGridInformationObj.gridFrequencyC
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="A相电网电压">
              <el-switch
                v-model="
                  operationInformation.powerGridInformationObj.gridVoltageA
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="B相电网电压">
              <el-switch
                v-model="
                  operationInformation.powerGridInformationObj.gridVoltageB
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="C相电网电压">
              <el-switch
                v-model="
                  operationInformation.powerGridInformationObj.gridVoltageC
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="电网视在功率">
              <el-switch
                v-model="
                  operationInformation.powerGridInformationObj
                    .apparentPowerOfThePowerGrid
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="电网有功功率">
              <el-switch
                v-model="
                  operationInformation.powerGridInformationObj
                    .activePowerOfThePowerGrid
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="电网无功功率">
              <el-switch
                v-model="
                  operationInformation.powerGridInformationObj
                    .reactivePowerOfThePowerGrid
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="CT电流">
              <el-switch
                v-model="operationInformation.powerGridInformationObj.ctCurrent"
              />
            </el-descriptions-item>
            <el-descriptions-item label="CT功率">
              <el-switch
                v-model="operationInformation.powerGridInformationObj.ctPower"
              />
            </el-descriptions-item>
            <el-descriptions-item label="CT方向">
              <el-switch
                v-model="
                  operationInformation.powerGridInformationObj.ctDirection
                "
              />
            </el-descriptions-item>
          </el-descriptions>
        </el-card>

        <el-card style="margin-top: 10px">
          <div slot="header">
            <span>逆变器信息</span>
            <el-switch
              style="margin-left: 10px"
              v-model="operationInformation.inverterInformation"
              @change="changeOperationInformationItem('inverterInformation')"
            />
          </div>
          <el-descriptions title="" :column="4">
            <el-descriptions-item label="逆变器温度">
              <el-switch
                v-model="
                  operationInformation.inverterInformationObj
                    .inverterTemperature
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="逆变状态">
              <el-switch
                v-model="
                  operationInformation.inverterInformationObj.inversionState
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="A相逆变输出频率">
              <el-switch
                v-model="
                  operationInformation.inverterInformationObj
                    .inverterOutputFrequencyA
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="B相逆变输出频率">
              <el-switch
                v-model="
                  operationInformation.inverterInformationObj
                    .inverterOutputFrequencyB
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="C相逆变输出频率">
              <el-switch
                v-model="
                  operationInformation.inverterInformationObj
                    .inverterOutputFrequencyC
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="A相逆变输出电压">
              <el-switch
                v-model="
                  operationInformation.inverterInformationObj
                    .inverterOutputVoltageA
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="B相逆变输出电压">
              <el-switch
                v-model="
                  operationInformation.inverterInformationObj
                    .inverterOutputVoltageB
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="C相逆变输出电压">
              <el-switch
                v-model="
                  operationInformation.inverterInformationObj
                    .inverterOutputVoltageC
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="A相逆变输出电流">
              <el-switch
                v-model="
                  operationInformation.inverterInformationObj
                    .inverterOutputCurrentA
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="B相逆变输出电流">
              <el-switch
                v-model="
                  operationInformation.inverterInformationObj
                    .inverterOutputCurrentB
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="C相逆变输出电流">
              <el-switch
                v-model="
                  operationInformation.inverterInformationObj
                    .inverterOutputCurrentC
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="A相逆变视在功率">
              <el-switch
                v-model="
                  operationInformation.inverterInformationObj
                    .invertedApparentPowerA
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="B相逆变视在功率">
              <el-switch
                v-model="
                  operationInformation.inverterInformationObj
                    .invertedApparentPowerB
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="C相逆变视在功率">
              <el-switch
                v-model="
                  operationInformation.inverterInformationObj
                    .invertedApparentPowerC
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="A相逆变有功功率">
              <el-switch
                v-model="
                  operationInformation.inverterInformationObj
                    .invertedActivePowerA
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="B相逆变有功功率">
              <el-switch
                v-model="
                  operationInformation.inverterInformationObj
                    .invertedActivePowerB
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="C相逆变有功功率">
              <el-switch
                v-model="
                  operationInformation.inverterInformationObj
                    .invertedActivePowerC
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="A相逆变无功功率">
              <el-switch
                v-model="
                  operationInformation.inverterInformationObj
                    .invertedReactivePowerA
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="B相逆变无功功率">
              <el-switch
                v-model="
                  operationInformation.inverterInformationObj
                    .invertedReactivePowerB
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="C相逆变无功功率">
              <el-switch
                v-model="
                  operationInformation.inverterInformationObj
                    .invertedReactivePowerC
                "
              />
            </el-descriptions-item>
          </el-descriptions>
        </el-card>

        <el-card style="margin-top: 10px">
          <div slot="header">
            <span>负载信息</span>
            <el-switch
              style="margin-left: 10px"
              v-model="operationInformation.loadInformation"
              @change="changeOperationInformationItem('loadInformation')"
            />
          </div>
          <el-descriptions title="" :column="4">
            <el-descriptions-item label="A相负载电压">
              <el-switch
                v-model="operationInformation.loadInformationObj.loadVoltageA"
              />
            </el-descriptions-item>
            <el-descriptions-item label="B相负载电压">
              <el-switch
                v-model="operationInformation.loadInformationObj.loadVoltageB"
              />
            </el-descriptions-item>
            <el-descriptions-item label="C相负载电压">
              <el-switch
                v-model="operationInformation.loadInformationObj.loadVoltageC"
              />
            </el-descriptions-item>
            <el-descriptions-item label="A相负载电流">
              <el-switch
                v-model="operationInformation.loadInformationObj.loadCurrentA"
              />
            </el-descriptions-item>
            <el-descriptions-item label="B相负载电流">
              <el-switch
                v-model="operationInformation.loadInformationObj.loadCurrentB"
              />
            </el-descriptions-item>
            <el-descriptions-item label="C相负载电流">
              <el-switch
                v-model="operationInformation.loadInformationObj.loadCurrentC"
              />
            </el-descriptions-item>
            <el-descriptions-item label="A相负载视在功率">
              <el-switch
                v-model="
                  operationInformation.loadInformationObj.apparentPowerOfLoadA
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="B相负载视在功率">
              <el-switch
                v-model="
                  operationInformation.loadInformationObj.apparentPowerOfLoadB
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="C相负载视在功率">
              <el-switch
                v-model="
                  operationInformation.loadInformationObj.apparentPowerOfLoadC
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="A相负载有功功率">
              <el-switch
                v-model="
                  operationInformation.loadInformationObj.loadActivePowerA
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="B相负载有功功率">
              <el-switch
                v-model="
                  operationInformation.loadInformationObj.loadActivePowerB
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="C相负载有功功率">
              <el-switch
                v-model="
                  operationInformation.loadInformationObj.loadActivePowerC
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="A相负载功率百分比">
              <el-switch
                v-model="
                  operationInformation.loadInformationObj.loadPowerPercentageA
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="B相负载功率百分比">
              <el-switch
                v-model="
                  operationInformation.loadInformationObj.loadPowerPercentageB
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="C相负载功率百分比">
              <el-switch
                v-model="
                  operationInformation.loadInformationObj.loadPowerPercentageC
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="负载实时功率">
              <el-switch
                v-model="
                  operationInformation.loadInformationObj.realTimePowerOfLoad
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="用电量">
              <el-switch
                v-model="
                  operationInformation.loadInformationObj.powerConsumption
                "
              />
            </el-descriptions-item>
          </el-descriptions>
        </el-card>

        <el-card style="margin-top: 10px">
          <div slot="header">
            <span>电表信息</span>
            <el-switch
              style="margin-left: 10px"
              v-model="operationInformation.electricityMeterInformation"
              @change="
                changeOperationInformationItem('electricityMeterInformation')
              "
            />
          </div>
          <el-descriptions title="" :column="4">
            <el-descriptions-item label="电表正常标志">
              <el-switch
                v-model="
                  operationInformation.electricityMeterInformationObj
                    .normalIndicatorOfElectricityMeter
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="电表电压">
              <el-switch
                v-model="
                  operationInformation.electricityMeterInformationObj
                    .meterVoltage
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="当前组合有功电能">
              <el-switch
                v-model="
                  operationInformation.electricityMeterInformationObj
                    .currentCombinedActiveEnergy
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="当前正向有功电能">
              <el-switch
                v-model="
                  operationInformation.electricityMeterInformationObj
                    .currentPositiveActiveEnergy
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="当前反向有功电能">
              <el-switch
                v-model="
                  operationInformation.electricityMeterInformationObj
                    .currentReverseActiveEnergy
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="电表电流">
              <el-switch
                v-model="
                  operationInformation.electricityMeterInformationObj
                    .electricityMeterCurrent
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="电表功率">
              <el-switch
                v-model="
                  operationInformation.electricityMeterInformationObj
                    .electricityMeterPower
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="电表功率因数">
              <el-switch
                v-model="
                  operationInformation.electricityMeterInformationObj
                    .electricityMeterPowerFactor
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="电表频率">
              <el-switch
                v-model="
                  operationInformation.electricityMeterInformationObj
                    .electricityMeterFrequency
                "
              />
            </el-descriptions-item>
          </el-descriptions>
        </el-card>

        <el-card style="margin-top: 10px">
          <div slot="header">
            <span>其他信息</span>
            <el-switch
              style="margin-left: 10px"
              v-model="operationInformation.otherInformation"
              @change="changeOperationInformationItem('otherInformation')"
            />
          </div>
          <el-descriptions title="" :column="4">
            <el-descriptions-item label="自检状态">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj.selfInspectionStatus
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="自检实际保护阀值">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj
                    .selfCheckActualProtectionThreshold
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="自检实际保护时间">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj
                    .selfCheckActualProtectionTime
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="自检实时保护阀值">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj
                    .selfCheckRealTimeProtectionThreshold
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="USB状态">
              <el-switch
                v-model="operationInformation.otherInformationObj.usbStatus"
              />
            </el-descriptions-item>
            <el-descriptions-item label="能流图线编号1-8段标志">
              <el-switch
                v-model="operationInformation.otherInformationObj.energyFlowOne"
              />
            </el-descriptions-item>
            <el-descriptions-item label="能流图线编号9-16段标志">
              <el-switch
                v-model="operationInformation.otherInformationObj.energyFlowTwo"
              />
            </el-descriptions-item>
            <el-descriptions-item label="能流图开关编号1-16标志">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj.energyFlowThree
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="运行时间(天)">
              <el-switch
                v-model="operationInformation.otherInformationObj.runTimeDay"
              />
            </el-descriptions-item>
            <el-descriptions-item label="运行时间(时)">
              <el-switch
                v-model="operationInformation.otherInformationObj.runTimeHour"
              />
            </el-descriptions-item>
            <el-descriptions-item label="运行时间(分)">
              <el-switch
                v-model="operationInformation.otherInformationObj.runTimeMinute"
              />
            </el-descriptions-item>
            <el-descriptions-item label="运行时间(秒)">
              <el-switch
                v-model="operationInformation.otherInformationObj.runTimeSecond"
              />
            </el-descriptions-item>
            <el-descriptions-item label="当日用电量">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj
                    .dailyElectricityConsumption
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="累积用电量">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj
                    .accumulatedElectricityConsumption
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="当日并网量">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj
                    .dailyGridConnectionVolume
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="累积并网量">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj
                    .accumulatedGridConnectionQuantity
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="当日购电量">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj
                    .dailyElectricityPurchase
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="累积购电量">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj
                    .accumulatedPurchasingPower
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="当日充电量">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj.dailyChargingCapacity
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="累积充电量">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj
                    .accumulatedChargingCapacity
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="当日放电量">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj
                    .dailyDischargeCapacity
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="累积放电量">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj
                    .accumulatedDischargeCapacity
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="漏电流">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj.leakageCurrent
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="中间母线电压">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj
                    .intermediateBusbarVoltage
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="BuckBoost电流">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj.buckBoostCurrent
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="PVIso电压">
              <el-switch
                v-model="operationInformation.otherInformationObj.pvIsoVoltage"
              />
            </el-descriptions-item>
            <el-descriptions-item label="零地电压">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj.zeroGroundVoltage
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="逆变电流直流分量">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj
                    .dcComponentOfInverterCurrent
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="负载电压直流分量">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj
                    .dcComponentOfLoadVoltage
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="继电器中间电压">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj
                    .relayIntermediateVoltage
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="历史记录条数">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj
                    .numberOfHistoryRecords
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="电池充/放电加热使能状态">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj
                    .batteryChargingAndDischargingHeatingEnableState
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="电池出厂编码">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj.batteryFactoryCode
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="电池产品编号">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj.batteryProductNumber
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="电池出厂日期">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj.batteryFactoryDate
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="最大允许充电电流">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj
                    .maximumAllowableChargingCurrent
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="厂家信息">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj
                    .manufacturerInformation
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="逆变器序列号">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj.inverterSerialNumber
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="最大允许放电电流">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj
                    .maximumAllowableDischargeCurrent
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="逆变器允许电池最大充电电流">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj
                    .maximumChargingCurrentAllowedByTheInverterForTheBattery
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="逆变器允许电池最大放电电流">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj
                    .maximumDischargeCurrentAllowedByTheInverterForTheBattery
                "
              />
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-card>

      <el-card style="margin-top: 10px">
        <div slot="header">
          <span>系统设置</span>
          <el-switch
            style="margin-left: 10px"
            v-model="systemSet.isShow"
            @change="changeSystemSet"
          />
        </div>

        <el-card>
          <div slot="header">
            <span>常用设置</span>
            <el-switch
              style="margin-left: 10px"
              v-model="systemSet.commonSet"
              @change="changeSystemSetItem('commonSet')"
            />
          </div>
          <el-descriptions title="" :column="4">
            <el-descriptions-item label="设置系统时间">
              <el-switch v-model="systemSet.commonSetObj.systemTime" />
            </el-descriptions-item>
            <el-descriptions-item label="通讯协议类型">
              <el-switch
                v-model="systemSet.commonSetObj.communicationProtocolType"
              />
            </el-descriptions-item>
            <el-descriptions-item label="日发电量校准">
              <el-switch
                v-model="systemSet.commonSetObj.dailyPowerGenerationCalibration"
              />
            </el-descriptions-item>
            <el-descriptions-item label="总发电量校准">
              <el-switch
                v-model="systemSet.commonSetObj.totalPowerGenerationCalibration"
              />
            </el-descriptions-item>
            <el-descriptions-item label="清空用电量数据">
              <el-switch
                v-model="systemSet.commonSetObj.clearElectricityConsumptionData"
              />
            </el-descriptions-item>
            <el-descriptions-item label="清空发电量数据">
              <el-switch
                v-model="systemSet.commonSetObj.clearPowerGenerationData"
              />
            </el-descriptions-item>
            <el-descriptions-item label="开机命令">
              <el-switch v-model="systemSet.commonSetObj.bootCommand" />
            </el-descriptions-item>
            <el-descriptions-item label="关机命令">
              <el-switch v-model="systemSet.commonSetObj.shutdownCommand" />
            </el-descriptions-item>
            <el-descriptions-item label="取消关机命令">
              <el-switch
                v-model="systemSet.commonSetObj.cancelShutdownCommand"
              />
            </el-descriptions-item>
          </el-descriptions>
        </el-card>

        <el-card style="margin-top: 10px">
          <div slot="header">
            <span>通讯设置</span>
            <el-switch
              style="margin-left: 10px"
              v-model="systemSet.communicationSet"
              @change="changeSystemSetItem('communicationSet')"
            />
          </div>
          <el-descriptions title="" :column="4">
            <el-descriptions-item label="BMS型号">
              <el-switch v-model="systemSet.communicationSetObj.bmsModel" />
            </el-descriptions-item>
            <el-descriptions-item label="BMS地址">
              <el-switch v-model="systemSet.communicationSetObj.bmsAddress" />
            </el-descriptions-item>
            <el-descriptions-item label="BMS波特率">
              <el-switch v-model="systemSet.communicationSetObj.bmsBaud" />
            </el-descriptions-item>
            <el-descriptions-item label="锂电池块数">
              <el-switch
                v-model="
                  systemSet.communicationSetObj.numberOfLithiumBatteryBlocks
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="采集器通讯地址">
              <el-switch
                v-model="
                  systemSet.communicationSetObj.collectorCommunicationAddress
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="采集器通讯协议类型">
              <el-switch
                v-model="
                  systemSet.communicationSetObj
                    .collectorCommunicationProtocolType
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="采集器通讯波特率">
              <el-switch
                v-model="
                  systemSet.communicationSetObj.baudOfCollectorCommunication
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="设备通讯地址">
              <el-switch
                v-model="
                  systemSet.communicationSetObj.deviceCommunicationAddress
                "
              />
            </el-descriptions-item>
          </el-descriptions>
        </el-card>

        <el-card style="margin-top: 10px">
          <div slot="header">
            <span>高级设置</span>
            <el-switch
              style="margin-left: 10px"
              v-model="systemSet.advancedSet"
              @change="changeSystemSetItem('advancedSet')"
            />
          </div>
          <el-descriptions title="" :column="4">
            <el-descriptions-item label="并离网模式">
              <el-switch
                v-model="systemSet.advancedSetObj.parallelOffGridMode"
              />
            </el-descriptions-item>
            <el-descriptions-item label="系统模式设置">
              <el-switch v-model="systemSet.advancedSetObj.systemModeSet" />
            </el-descriptions-item>
            <el-descriptions-item label="PV连接设置">
              <el-switch v-model="systemSet.advancedSetObj.pvConnectionSet" />
            </el-descriptions-item>
            <el-descriptions-item label="额定输出电压设置">
              <el-switch
                v-model="systemSet.advancedSetObj.ratedOutputVoltageSet"
              />
            </el-descriptions-item>
            <el-descriptions-item label="额定输出频率设置">
              <el-switch
                v-model="systemSet.advancedSetObj.ratedOutputFrequencySet"
              />
            </el-descriptions-item>
            <el-descriptions-item label="电池类型设置">
              <el-switch v-model="systemSet.advancedSetObj.batteryTypeSet" />
            </el-descriptions-item>
            <el-descriptions-item label="电池充电电流">
              <el-switch
                v-model="systemSet.advancedSetObj.batteryChargingCurrent"
              />
            </el-descriptions-item>
            <el-descriptions-item label="电池放电电流">
              <el-switch
                v-model="systemSet.advancedSetObj.batteryDischargeCurrent"
              />
            </el-descriptions-item>
            <el-descriptions-item label="电池均充电压">
              <el-switch
                v-model="systemSet.advancedSetObj.batteryAverageChargingVoltage"
              />
            </el-descriptions-item>
            <el-descriptions-item label="电池浮充电压">
              <el-switch
                v-model="systemSet.advancedSetObj.batteryFloatChargingVoltage"
              />
            </el-descriptions-item>
            <el-descriptions-item label="电池EOD">
              <el-switch v-model="systemSet.advancedSetObj.batteryEod" />
            </el-descriptions-item>
            <el-descriptions-item label="电池DOD">
              <el-switch v-model="systemSet.advancedSetObj.batteryDod" />
            </el-descriptions-item>
            <el-descriptions-item label="并网SOC下限">
              <el-switch
                v-model="systemSet.advancedSetObj.lowerLimitOfGridConnectedSoc"
              />
            </el-descriptions-item>
            <el-descriptions-item label="离网SOC下限">
              <el-switch
                v-model="systemSet.advancedSetObj.offGridSocLowerLimit"
              />
            </el-descriptions-item>
            <el-descriptions-item label="电表-CT">
              <el-switch
                v-model="systemSet.advancedSetObj.electricityMeterCt"
              />
            </el-descriptions-item>
          </el-descriptions>
        </el-card>

        <!-- <el-card  style="margin-top: 10px;">
        <div slot="header">
          <span>电网过压设置</span>
          <el-switch style="margin-left: 10px;" v-model="systemSet.gridOvervoltageSet" @change="changeSystemSetItem('gridOvervoltageSet')" />
        </div>
        <el-descriptions title="" :column="4">
          <el-descriptions-item label="电网一段过压自检阀值">
            <el-switch v-model="systemSet.gridOvervoltageSetObj.selfInspectionThresholdForOvervoltageInTheFirstSectionOfThePowerGrid" />
          </el-descriptions-item>
          <el-descriptions-item label="电网一段过压自检时间">
            <el-switch v-model="systemSet.gridOvervoltageSetObj.powerGridOvervoltageSelfCheckTime" />
          </el-descriptions-item>
          <el-descriptions-item label="电网二段过压自检阀值">
            <el-switch v-model="systemSet.gridOvervoltageSetObj.thresholdForOvervoltageSelfCheckInSection2OfThePowerGrid" />
          </el-descriptions-item>
          <el-descriptions-item label="电网二段过压自检时间">
            <el-switch v-model="systemSet.gridOvervoltageSetObj.powerGridSection2OvervoltageSelfCheckTime" />
          </el-descriptions-item>
          <el-descriptions-item label="电网一段欠压自检阀值">
            <el-switch v-model="systemSet.gridOvervoltageSetObj.underVoltageSelfCheckThresholdOfTheFirstSectionOfThePowerGrid" />
          </el-descriptions-item>
          <el-descriptions-item label="电网一段欠压自检时间">
            <el-switch v-model="systemSet.gridOvervoltageSetObj.powerGridUndervoltageSelfCheckTime" />
          </el-descriptions-item>
          <el-descriptions-item label="电网二段欠压自检阀值">
            <el-switch v-model="systemSet.gridOvervoltageSetObj.underVoltageSelfCheckThresholdOfTheSecondSectionOfThePowerGrid" />
          </el-descriptions-item>
          <el-descriptions-item label="电网二段欠压自检时间">
            <el-switch v-model="systemSet.gridOvervoltageSetObj.underVoltageSelfCheckTimeOfTheSecondSectionOfThePowerGrid" />
          </el-descriptions-item>
          <el-descriptions-item label="电网一段过频自检阀值">
            <el-switch v-model="systemSet.gridOvervoltageSetObj.thresholdForSelfCheckOfOverFrequencyInTheFirstSectionOfThePowerGrid" />
          </el-descriptions-item>
          <el-descriptions-item label="电网一段过频自检时间">
            <el-switch v-model="systemSet.gridOvervoltageSetObj.selfInspectionTimeForPeriodOfOverfrequencyInThePowerGrid" />
          </el-descriptions-item>
          <el-descriptions-item label="电网二段过频自检阀值">
            <el-switch v-model="systemSet.gridOvervoltageSetObj.gridSection2OverfrequencySelfTestThreshold" />
          </el-descriptions-item>
          <el-descriptions-item label="电网二段过频自检时间">
            <el-switch v-model="systemSet.gridOvervoltageSetObj.powerGridSection2OverFrequencySelfCheckTime" />
          </el-descriptions-item>
          <el-descriptions-item label="电网一段欠频自检阀值">
            <el-switch v-model="systemSet.gridOvervoltageSetObj.underFrequencySelfCheckThresholdForTheFirstSectionOfThePowerGrid" />
          </el-descriptions-item>
          <el-descriptions-item label="电网一段欠频自检时间">
            <el-switch v-model="systemSet.gridOvervoltageSetObj.powerGridUnderfrequencySelfCheckTime" />
          </el-descriptions-item>
          <el-descriptions-item label="电网二段欠频自检阀值">
            <el-switch v-model="systemSet.gridOvervoltageSetObj.underFrequencySelfCheckThresholdOfTheSecondSectionOfThePowerGrid" />
          </el-descriptions-item>
          <el-descriptions-item label="电网二段欠频自检时间">
            <el-switch v-model="systemSet.gridOvervoltageSetObj.underFrequencySelfCheckTimeOfTheSecondSectionOfThePowerGrid" />
          </el-descriptions-item>
        </el-descriptions>
      </el-card> -->

        <el-card style="margin-top: 10px">
          <div slot="header">
            <span>其他设置</span>
            <el-switch
              style="margin-left: 10px"
              v-model="systemSet.otherSet"
              @change="changeSystemSetItem('otherSet')"
            />
          </div>
          <el-descriptions title="" :column="4">
            <el-descriptions-item label="复位设备通讯设置至初始值">
              <el-switch
                v-model="
                  systemSet.otherSetObj
                    .resetDeviceCommunicationSettingsToInitialValues
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="清空记录数据">
              <el-switch v-model="systemSet.otherSetObj.clearRecordData" />
            </el-descriptions-item>
            <el-descriptions-item label="恢复出厂设置">
              <el-switch v-model="systemSet.otherSetObj.factoryReset" />
            </el-descriptions-item>
            <el-descriptions-item label="逆变器重启">
              <el-switch v-model="systemSet.otherSetObj.inverterRestart" />
            </el-descriptions-item>
            <el-descriptions-item label="自检使能">
              <el-switch v-model="systemSet.otherSetObj.selfCheckEnable" />
            </el-descriptions-item>
            <el-descriptions-item label="手动清除故障">
              <el-switch
                v-model="systemSet.otherSetObj.manuallyClearingFaults"
              />
            </el-descriptions-item>
            <el-descriptions-item label="自动运行">
              <el-switch v-model="systemSet.otherSetObj.automaticOperation" />
            </el-descriptions-item>
            <el-descriptions-item label="手动解锁系统锁">
              <el-switch
                v-model="systemSet.otherSetObj.manuallyUnlockingTheSystemLock"
              />
            </el-descriptions-item>
            <el-descriptions-item label="设备通讯波特率">
              <el-switch
                v-model="systemSet.otherSetObj.deviceCommunicationBaud"
              />
            </el-descriptions-item>
            <el-descriptions-item label="设备通讯校验位选择">
              <el-switch
                v-model="
                  systemSet.otherSetObj.deviceCommunicationCheckBitSelection
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="设备通讯停止位选择">
              <el-switch
                v-model="
                  systemSet.otherSetObj.deviceCommunicationStopBitSelection
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="倒计时关闭逆变器">
              <el-switch
                v-model="systemSet.otherSetObj.countdownToTurnOffTheInverter"
              />
            </el-descriptions-item>
            <el-descriptions-item label="延时启动逆变器">
              <el-switch v-model="systemSet.otherSetObj.delayedStartInverter" />
            </el-descriptions-item>
            <el-descriptions-item label="国家码">
              <el-switch v-model="systemSet.otherSetObj.countryCode" />
            </el-descriptions-item>
            <el-descriptions-item label="系统时间设置">
              <el-switch v-model="systemSet.otherSetObj.systemTimeSetting" />
            </el-descriptions-item>
            <el-descriptions-item label="逆变有功设定">
              <el-switch
                v-model="systemSet.otherSetObj.inverterActivePowerSetting"
              />
            </el-descriptions-item>
            <el-descriptions-item label="485通讯协议类型">
              <el-switch
                v-model="systemSet.otherSetObj.communicationProtocolType485"
              />
            </el-descriptions-item>
            <el-descriptions-item label="485通讯地址">
              <el-switch
                v-model="systemSet.otherSetObj.communicationAddress485"
              />
            </el-descriptions-item>
            <el-descriptions-item label="485通讯波特率">
              <el-switch v-model="systemSet.otherSetObj.communicationBaud485" />
            </el-descriptions-item>
            <el-descriptions-item label="硬限制使能">
              <el-switch v-model="systemSet.otherSetObj.hardLimitEnable" />
            </el-descriptions-item>
            <el-descriptions-item label="硬限制功率设定值">
              <el-switch
                v-model="systemSet.otherSetObj.hardLimitPowerSettingValue"
              />
            </el-descriptions-item>
            <el-descriptions-item label="澳洲地区选择">
              <el-switch
                v-model="systemSet.otherSetObj.australianRegionSelection"
              />
            </el-descriptions-item>
            <el-descriptions-item label="蓝牙连接标志">
              <el-switch
                v-model="systemSet.otherSetObj.bluetoothConnectionFlag"
              />
            </el-descriptions-item>
            <el-descriptions-item label="PV有功设定">
              <el-switch v-model="systemSet.otherSetObj.pvActivePowerSetting" />
            </el-descriptions-item>
            <el-descriptions-item label="有功变化率限制">
              <el-switch
                v-model="systemSet.otherSetObj.limitOfActivePowerChangeRate"
              />
            </el-descriptions-item>
            <el-descriptions-item label="孤岛检测使能">
              <el-switch
                v-model="systemSet.otherSetObj.islandDetectionEnable"
              />
            </el-descriptions-item>
            <el-descriptions-item label="认证模式">
              <el-switch v-model="systemSet.otherSetObj.authenticationMode" />
            </el-descriptions-item>
            <el-descriptions-item label="当前系统运行模式控制源">
              <el-switch
                v-model="
                  systemSet.otherSetObj.currentSystemOperationModeControlSource
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="系统当前运行模式">
              <el-switch
                v-model="systemSet.otherSetObj.currentOperatingModeOfTheSystem"
              />
            </el-descriptions-item>
            <el-descriptions-item label="APP启动标志">
              <el-switch v-model="systemSet.otherSetObj.appStartupFlag" />
            </el-descriptions-item>
            <el-descriptions-item label="蜂鸣器响应时间">
              <el-switch v-model="systemSet.otherSetObj.buzzerResponseTime" />
            </el-descriptions-item>
            <el-descriptions-item label="交流类型">
              <el-switch v-model="systemSet.otherSetObj.communicationType" />
            </el-descriptions-item>
            <el-descriptions-item label="系统模式设置">
              <el-switch v-model="systemSet.otherSetObj.systemModeSettings" />
            </el-descriptions-item>
            <el-descriptions-item label="USB操作">
              <el-switch v-model="systemSet.otherSetObj.usbOperation" />
            </el-descriptions-item>
            <el-descriptions-item label="功率因数">
              <el-switch v-model="systemSet.otherSetObj.powerFactor" />
            </el-descriptions-item>
            <el-descriptions-item label="防逆流功率百分比">
              <el-switch
                v-model="systemSet.otherSetObj.antiBackflowPowerPercentage"
              />
            </el-descriptions-item>
            <el-descriptions-item label="最大输出功率百分比">
              <el-switch
                v-model="systemSet.otherSetObj.maximumOutputPowerPercentage"
              />
            </el-descriptions-item>
            <el-descriptions-item label="功率设置调节速率">
              <el-switch
                v-model="systemSet.otherSetObj.powerSettingAdjustmentRate"
              />
            </el-descriptions-item>
            <el-descriptions-item label="并网功率软起速率">
              <el-switch
                v-model="systemSet.otherSetObj.gridConnectedPowerSoftStartRate"
              />
            </el-descriptions-item>
            <el-descriptions-item label="无功功率控制模式">
              <el-switch
                v-model="systemSet.otherSetObj.reactivePowerControlMode"
              />
            </el-descriptions-item>
            <el-descriptions-item label="无功功率调节速率">
              <el-switch
                v-model="systemSet.otherSetObj.reactivePowerRegulationRate"
              />
            </el-descriptions-item>
            <el-descriptions-item label="电网电压保护上限值1">
              <el-switch
                v-model="
                  systemSet.otherSetObj.upperLimitValueOfGridVoltageProtection1
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="电网电压保护上限值2">
              <el-switch
                v-model="
                  systemSet.otherSetObj.upperLimitValueOfGridVoltageProtection2
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="电网电压保护上限值3">
              <el-switch
                v-model="
                  systemSet.otherSetObj.upperLimitValueOfGridVoltageProtection3
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="电网电压保护下限值1">
              <el-switch
                v-model="
                  systemSet.otherSetObj.lowerLimitValueOfGridVoltageProtection1
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="电网电压保护下限值2">
              <el-switch
                v-model="
                  systemSet.otherSetObj.lowerLimitValueOfGridVoltageProtection2
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="电网电压保护下限值3">
              <el-switch
                v-model="
                  systemSet.otherSetObj.lowerLimitValueOfGridVoltageProtection3
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="电网电压重连上限值">
              <el-switch
                v-model="
                  systemSet.otherSetObj.upperLimitValueOfGridVoltageReconnection
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="电网电压重连下限值">
              <el-switch
                v-model="
                  systemSet.otherSetObj.lowerLimitValueOfGridVoltageReconnection
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="电网电压保护上限时间1">
              <el-switch
                v-model="
                  systemSet.otherSetObj.upperLimitTimeOfGridVoltageProtection1
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="电网电压保护上限时间2">
              <el-switch
                v-model="
                  systemSet.otherSetObj.upperLimitTimeOfGridVoltageProtection2
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="电网电压保护上限时间3">
              <el-switch
                v-model="
                  systemSet.otherSetObj.upperLimitTimeOfGridVoltageProtection3
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="电网电压保护下限时间1">
              <el-switch
                v-model="
                  systemSet.otherSetObj.lowerLimitTimeOfGridVoltageProtection1
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="电网电压保护下限时间2">
              <el-switch
                v-model="
                  systemSet.otherSetObj.lowerLimitTimeOfGridVoltageProtection2
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="电网电压保护下限时间3">
              <el-switch
                v-model="
                  systemSet.otherSetObj.lowerLimitTimeOfGridVoltageProtection3
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="电网电压保护恢复时间">
              <el-switch
                v-model="
                  systemSet.otherSetObj.recoveryTimeOfGridVoltageProtection
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="电网频率保护上限值1">
              <el-switch
                v-model="
                  systemSet.otherSetObj
                    .upperLimitValueOfGridFrequencyProtection1
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="电网频率保护上限值2">
              <el-switch
                v-model="
                  systemSet.otherSetObj
                    .upperLimitValueOfGridFrequencyProtection2
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="电网频率保护上限值3">
              <el-switch
                v-model="
                  systemSet.otherSetObj
                    .upperLimitValueOfGridFrequencyProtection3
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="电网频率保护下限值1">
              <el-switch
                v-model="
                  systemSet.otherSetObj
                    .lowerLimitValueOfGridFrequencyProtection1
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="电网频率保护下限值2">
              <el-switch
                v-model="
                  systemSet.otherSetObj
                    .lowerLimitValueOfGridFrequencyProtection2
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="电网频率保护下限值3">
              <el-switch
                v-model="
                  systemSet.otherSetObj
                    .lowerLimitValueOfGridFrequencyProtection3
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="电网频率重连上限值">
              <el-switch
                v-model="
                  systemSet.otherSetObj
                    .upperLimitValueOfGridFrequencyReconnection
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="电网频率重连下限值">
              <el-switch
                v-model="
                  systemSet.otherSetObj
                    .lowerLimitValueOfGridFrequencyReconnection
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="电网频率保护上限时间1">
              <el-switch
                v-model="
                  systemSet.otherSetObj.gridFrequencyProtectionUpperLimitTime1
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="电网频率保护上限时间2">
              <el-switch
                v-model="
                  systemSet.otherSetObj.gridFrequencyProtectionUpperLimitTime2
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="电网频率保护上限时间3">
              <el-switch
                v-model="
                  systemSet.otherSetObj.gridFrequencyProtectionUpperLimitTime3
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="电网频率保护下限时间1">
              <el-switch
                v-model="
                  systemSet.otherSetObj.gridFrequencyProtectionLowerLimitTime1
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="电网频率保护下限时间2">
              <el-switch
                v-model="
                  systemSet.otherSetObj.gridFrequencyProtectionLowerLimitTime2
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="电网频率保护下限时间3">
              <el-switch
                v-model="
                  systemSet.otherSetObj.gridFrequencyProtectionLowerLimitTime3
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="电网频率保护恢复时间">
              <el-switch
                v-model="
                  systemSet.otherSetObj.recoveryTimeOfGridFrequencyProtection
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="电网10Min过压保护值">
              <el-switch
                v-model="
                  systemSet.otherSetObj
                    .tenMinOvervoltageProtectionValueOfThePowerGrid
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="连网等待时间">
              <el-switch
                v-model="systemSet.otherSetObj.networkingWaitingTime"
              />
            </el-descriptions-item>
            <el-descriptions-item label="重连等待时间">
              <el-switch v-model="systemSet.otherSetObj.reconnectWaitingTime" />
            </el-descriptions-item>
            <el-descriptions-item label="寒冷模式">
              <el-switch v-model="systemSet.otherSetObj.coldMode" />
            </el-descriptions-item>
            <el-descriptions-item label="无功功率百分比">
              <el-switch
                v-model="systemSet.otherSetObj.reactivePowerPercentage"
              />
            </el-descriptions-item>
            <el-descriptions-item label="Freq-Watt(曲线)使能">
              <el-switch v-model="systemSet.otherSetObj.freqWattCurveEnable" />
            </el-descriptions-item>
            <el-descriptions-item label="Volt-Watt(曲线)使能">
              <el-switch v-model="systemSet.otherSetObj.voltWattCurveEnable" />
            </el-descriptions-item>
            <el-descriptions-item label="Volt-Var(曲线)使能">
              <el-switch v-model="systemSet.otherSetObj.voltVarCurveEnable" />
            </el-descriptions-item>
            <el-descriptions-item label="PF-Watt(曲线)使能">
              <el-switch v-model="systemSet.otherSetObj.pfWattCurveEnable" />
            </el-descriptions-item>
            <el-descriptions-item label="定时模式类型">
              <el-switch v-model="systemSet.otherSetObj.timingModeType" />
            </el-descriptions-item>
            <el-descriptions-item label="设置量变更寄存器1">
              <el-switch
                v-model="systemSet.otherSetObj.setQuantityChangeRegister1"
              />
            </el-descriptions-item>
            <el-descriptions-item label="设置量变更寄存器2">
              <el-switch
                v-model="systemSet.otherSetObj.setQuantityChangeRegister2"
              />
            </el-descriptions-item>
            <el-descriptions-item label="设置量变更寄存器3">
              <el-switch
                v-model="systemSet.otherSetObj.setQuantityChangeRegister3"
              />
            </el-descriptions-item>
            <el-descriptions-item label="设置量变更寄存器4">
              <el-switch
                v-model="systemSet.otherSetObj.setQuantityChangeRegister4"
              />
            </el-descriptions-item>
            <el-descriptions-item label="设置量变更寄存器5">
              <el-switch
                v-model="systemSet.otherSetObj.setQuantityChangeRegister5"
              />
            </el-descriptions-item>
            <el-descriptions-item label="设置量变更寄存器6">
              <el-switch
                v-model="systemSet.otherSetObj.setQuantityChangeRegister6"
              />
            </el-descriptions-item>
            <el-descriptions-item label="设置量变更寄存器7">
              <el-switch
                v-model="systemSet.otherSetObj.setQuantityChangeRegister7"
              />
            </el-descriptions-item>
            <el-descriptions-item label="设置量变更寄存器8">
              <el-switch
                v-model="systemSet.otherSetObj.setQuantityChangeRegister8"
              />
            </el-descriptions-item>
            <el-descriptions-item label="电池参数显示方式">
              <el-switch
                v-model="systemSet.otherSetObj.batteryParameterDisplayMethod"
              />
            </el-descriptions-item>
            <el-descriptions-item label="当前显示参数的电池ID">
              <el-switch
                v-model="
                  systemSet.otherSetObj
                    .theBatteryIdOfTheCurrentDisplayedParameter
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="MOS控制">
              <el-switch v-model="systemSet.otherSetObj.mosControl" />
            </el-descriptions-item>
            <el-descriptions-item label="GPS通讯模块电源控制">
              <el-switch
                v-model="
                  systemSet.otherSetObj.gpsCommunicationModulePowerControl
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="实时时钟">
              <el-switch v-model="systemSet.otherSetObj.realTimeClock" />
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-card>

      <el-card style="margin-top: 10px">
        <div slot="header">
          <span>电池参数</span>
          <el-switch
            style="margin-left: 10px"
            v-model="batteryParameter.isShow"
            @change="changeBatteryParameter"
          />
        </div>

        <el-card>
          <div slot="header">
            <span>常用设置</span>
            <el-switch
              style="margin-left: 10px"
              v-model="batteryParameter.batterySet"
              @change="changeBatteryParameterItem('batterySet')"
            />
          </div>
          <el-descriptions title="" :column="4">
            <el-descriptions-item label="电池组ID">
              <el-switch
                v-model="batteryParameter.batterySetObj.batteryPackId"
              />
            </el-descriptions-item>
            <el-descriptions-item label="当前升级电池ID">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.currentUpgradedBatteryId
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="升级失败电池ID">
              <el-switch
                v-model="batteryParameter.batterySetObj.upgradeFailedBatteryId"
              />
            </el-descriptions-item>
            <el-descriptions-item label="电池包电芯串数 N">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.numberOfBatteryPackCellStringsN
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="温度探头的总数 X">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.totalNumberOfTemperatureProbesX
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="漏电流">
              <el-switch
                v-model="batteryParameter.batterySetObj.leakageCurrent"
              />
            </el-descriptions-item>
            <el-descriptions-item label="中间母线电压">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.intermediateBusbarVoltage
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="BuckBoost电流">
              <el-switch
                v-model="batteryParameter.batterySetObj.buckBoostCurrent"
              />
            </el-descriptions-item>
            <el-descriptions-item label="PVIso电压">
              <el-switch
                v-model="batteryParameter.batterySetObj.pvIsoVoltage"
              />
            </el-descriptions-item>
            <el-descriptions-item label="零地电压">
              <el-switch
                v-model="batteryParameter.batterySetObj.zeroGroundVoltage"
              />
            </el-descriptions-item>
            <el-descriptions-item label="逆变电流直流分量">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.dcComponentOfInverterCurrent
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="负载电压直流分量">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.dcComponentOfLoadVoltage
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="继电器中间电压">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.relayIntermediateVoltage
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="电芯电压1">
              <el-switch
                v-model="batteryParameter.batterySetObj.cellVoltage1"
              />
            </el-descriptions-item>
            <el-descriptions-item label="电芯电压2">
              <el-switch
                v-model="batteryParameter.batterySetObj.cellVoltage2"
              />
            </el-descriptions-item>
            <el-descriptions-item label="电芯电压3">
              <el-switch
                v-model="batteryParameter.batterySetObj.cellVoltage3"
              />
            </el-descriptions-item>
            <el-descriptions-item label="电芯电压4">
              <el-switch
                v-model="batteryParameter.batterySetObj.cellVoltage4"
              />
            </el-descriptions-item>
            <el-descriptions-item label="电芯电压5">
              <el-switch
                v-model="batteryParameter.batterySetObj.cellVoltage5"
              />
            </el-descriptions-item>
            <el-descriptions-item label="电芯电压6">
              <el-switch
                v-model="batteryParameter.batterySetObj.cellVoltage6"
              />
            </el-descriptions-item>
            <el-descriptions-item label="电芯电压7">
              <el-switch
                v-model="batteryParameter.batterySetObj.cellVoltage7"
              />
            </el-descriptions-item>
            <el-descriptions-item label="电芯电压8">
              <el-switch
                v-model="batteryParameter.batterySetObj.cellVoltage8"
              />
            </el-descriptions-item>
            <el-descriptions-item label="电芯电压9">
              <el-switch
                v-model="batteryParameter.batterySetObj.cellVoltage9"
              />
            </el-descriptions-item>
            <el-descriptions-item label="电芯电压10">
              <el-switch
                v-model="batteryParameter.batterySetObj.cellVoltage10"
              />
            </el-descriptions-item>
            <el-descriptions-item label="电芯电压11">
              <el-switch
                v-model="batteryParameter.batterySetObj.cellVoltage11"
              />
            </el-descriptions-item>
            <el-descriptions-item label="电芯电压12">
              <el-switch
                v-model="batteryParameter.batterySetObj.cellVoltage12"
              />
            </el-descriptions-item>
            <el-descriptions-item label="电芯电压13">
              <el-switch
                v-model="batteryParameter.batterySetObj.cellVoltage13"
              />
            </el-descriptions-item>
            <el-descriptions-item label="电芯电压14">
              <el-switch
                v-model="batteryParameter.batterySetObj.cellVoltage14"
              />
            </el-descriptions-item>
            <el-descriptions-item label="电芯电压15">
              <el-switch
                v-model="batteryParameter.batterySetObj.cellVoltage15"
              />
            </el-descriptions-item>
            <el-descriptions-item label="电芯电压16">
              <el-switch
                v-model="batteryParameter.batterySetObj.cellVoltage16"
              />
            </el-descriptions-item>
            <el-descriptions-item label="当前电流">
              <el-switch
                v-model="batteryParameter.batterySetObj.currentCurrent"
              />
            </el-descriptions-item>
            <el-descriptions-item label="State1">
              <el-switch v-model="batteryParameter.batterySetObj.state1" />
            </el-descriptions-item>
            <el-descriptions-item label="State2">
              <el-switch v-model="batteryParameter.batterySetObj.state2" />
            </el-descriptions-item>
            <el-descriptions-item label="State3">
              <el-switch v-model="batteryParameter.batterySetObj.state3" />
            </el-descriptions-item>
            <el-descriptions-item label="充电过流保护">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.chargingOvercurrentProtection
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="充电过流保护延时">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .chargingOvercurrentProtectionDelay
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="电芯过压保护">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.cellOvervoltageProtection
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="电芯过压保护延时">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.cellOvervoltageProtectionDelay
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="电芯过放保护">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.cellOverDischargeProtection
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="电芯过放保护延时">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .cellOverDischargeProtectionDelay
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="过压滞后电压">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.overvoltageHysteresisVoltage
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="过放滞后电压">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.overdischargeHysteresisVoltage
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="电芯过压恢复延时">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.cellOvervoltageRecoveryDelay
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="电芯过放恢复延时">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.cellOverDischargeRecoveryDelay
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="放电高温保护">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .highTemperatureProtectionDuringDischarge
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="放电高温保护恢复">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .highTemperatureProtectionRecoveryDuringDischarge
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="放电低温保护">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .lowTemperatureProtectionDuringDischarge
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="放电低温保护恢复">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .dischargeLowTemperatureProtectionRecovery
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="充电高温保护">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .highTemperatureProtectionDuringCharging
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="充电高温保护恢复">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .highTemperatureProtectionRecoveryDuringCharging
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="充电低温保护">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .lowTemperatureProtectionDuringCharging
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="充电低温保护恢复">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .lowTemperatureProtectionRecoveryDuringCharging
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="均衡开启电压">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.equalizingOpeningVoltage
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="均衡开启压差">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .equilibriumOpeningPressureDifference
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="电芯温度1">
              <el-switch
                v-model="batteryParameter.batterySetObj.cellTemperature1"
              />
            </el-descriptions-item>
            <el-descriptions-item label="电芯温度2">
              <el-switch
                v-model="batteryParameter.batterySetObj.cellTemperature2"
              />
            </el-descriptions-item>
            <el-descriptions-item label="电芯温度3">
              <el-switch
                v-model="batteryParameter.batterySetObj.cellTemperature3"
              />
            </el-descriptions-item>
            <el-descriptions-item label="电芯温度4">
              <el-switch
                v-model="batteryParameter.batterySetObj.cellTemperature4"
              />
            </el-descriptions-item>
            <el-descriptions-item label="MOS 温度">
              <el-switch
                v-model="batteryParameter.batterySetObj.mosTemperature"
              />
            </el-descriptions-item>
            <el-descriptions-item label="环境温度">
              <el-switch
                v-model="batteryParameter.batterySetObj.ambientTemperature"
              />
            </el-descriptions-item>
            <el-descriptions-item label="均衡状态1">
              <el-switch
                v-model="batteryParameter.batterySetObj.equilibriumState1"
              />
            </el-descriptions-item>
            <el-descriptions-item label="均衡状态2">
              <el-switch
                v-model="batteryParameter.batterySetObj.equilibriumState2"
              />
            </el-descriptions-item>
            <el-descriptions-item label="软件版本">
              <el-switch
                v-model="batteryParameter.batterySetObj.softwareVersion"
              />
            </el-descriptions-item>
            <el-descriptions-item label="硬件版本">
              <el-switch
                v-model="batteryParameter.batterySetObj.hardwareVersion"
              />
            </el-descriptions-item>
            <el-descriptions-item label="状态">
              <el-switch v-model="batteryParameter.batterySetObj.state" />
            </el-descriptions-item>
            <el-descriptions-item label="告警状态-电芯过放告警">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .alarmStatusCellOverDischargeAlarm
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="告警状态-总过放告警">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .alarmStatusTotalOverDischargeAlarm
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="告警状态-电芯过压告警">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.alarmStatusCellOvervoltageAlarm
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="告警状态-总过压告警">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .alarmStatusTotalOvervoltageAlarm
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="告警状态-放电过流告警">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .alarmStatusDischargeOvercurrentAlarm
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="告警状态-放电过温告警">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .alarmStatusDischargeOverTemperatureAlarm
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="告警状态-充电过温告警">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .alarmStatusChargingOverTemperatureAlarm
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="告警状态-环境高温告警">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .alarmStatusEnvironmentalHighTemperatureAlarm
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="告警状态-环境低温告警">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .alarmStatusEnvironmentalLowTemperatureAlarm
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="告警状态-SOC低告警">
              <el-switch
                v-model="batteryParameter.batterySetObj.alarmStatusSocLowAlarm"
              />
            </el-descriptions-item>
            <el-descriptions-item label="告警状态-MOS高温告警">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .alarmStatusMosHighTemperatureAlarm
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="电池SOC">
              <el-switch v-model="batteryParameter.batterySetObj.batterySoc" />
            </el-descriptions-item>
            <el-descriptions-item label="电池SOH">
              <el-switch v-model="batteryParameter.batterySetObj.batterySoh" />
            </el-descriptions-item>
            <el-descriptions-item label="循环次数">
              <el-switch
                v-model="batteryParameter.batterySetObj.numberOfCycles"
              />
            </el-descriptions-item>
            <el-descriptions-item label="放电剩余时间">
              <el-switch
                v-model="batteryParameter.batterySetObj.dischargeRemainingTime"
              />
            </el-descriptions-item>
            <el-descriptions-item label="充电剩余时间">
              <el-switch
                v-model="batteryParameter.batterySetObj.chargingRemainingTime"
              />
            </el-descriptions-item>
            <el-descriptions-item label="当前充电间隔">
              <el-switch
                v-model="batteryParameter.batterySetObj.currentChargingInterval"
              />
            </el-descriptions-item>
            <el-descriptions-item label="最长充电间隔">
              <el-switch
                v-model="batteryParameter.batterySetObj.maximumChargingInterval"
              />
            </el-descriptions-item>
            <el-descriptions-item label="电池总电压">
              <el-switch
                v-model="batteryParameter.batterySetObj.totalBatteryVoltage"
              />
            </el-descriptions-item>
            <el-descriptions-item label="电池包最高电压">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.maximumVoltageOfBatteryPack
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="电池包最低电压">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.minimumVoltageOfBatteryPack
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="最大允许放电电流">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .maximumAllowableDischargeCurrent
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="最大允许充电电流">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.maximumAllowableChargingCurrent
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="标准充电电压">
              <el-switch
                v-model="batteryParameter.batterySetObj.standardChargingVoltage"
              />
            </el-descriptions-item>
            <el-descriptions-item label="当前湿度">
              <el-switch
                v-model="batteryParameter.batterySetObj.currentHumidity"
              />
            </el-descriptions-item>
            <el-descriptions-item label="出厂编码">
              <el-switch v-model="batteryParameter.batterySetObj.factoryCode" />
            </el-descriptions-item>
            <el-descriptions-item label="产品编号">
              <el-switch
                v-model="batteryParameter.batterySetObj.productNumber"
              />
            </el-descriptions-item>
            <el-descriptions-item label="出厂日期">
              <el-switch
                v-model="batteryParameter.batterySetObj.dateOfProduction"
              />
            </el-descriptions-item>
            <el-descriptions-item label="电池检测电阻阻值">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.batteryDetectionResistanceValue
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="最高电芯温度">
              <el-switch
                v-model="batteryParameter.batterySetObj.maximumCellTemperature"
              />
            </el-descriptions-item>
            <el-descriptions-item label="最低电芯温度">
              <el-switch
                v-model="batteryParameter.batterySetObj.minimumCellTemperature"
              />
            </el-descriptions-item>
            <el-descriptions-item label="温差">
              <el-switch
                v-model="batteryParameter.batterySetObj.temperatureDifference"
              />
            </el-descriptions-item>
            <el-descriptions-item label="温差保护值">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .temperatureDifferenceProtectionValue
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="温差告警值">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.temperatureDifferenceAlarmValue
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="压差保护值">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .differentialPressureProtectionValue
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="压差告警值">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.differentialPressureAlarmValue
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="静置均衡时间">
              <el-switch
                v-model="batteryParameter.batterySetObj.staticEquilibriumTime"
              />
            </el-descriptions-item>
            <el-descriptions-item label="充电过流后自动恢复延时">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .automaticRecoveryDelayAfterChargingOvercurrent
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="充电过流后自动恢复锁定">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .automaticallyResumeLockingAfterOvercharging
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="放电过流后自动恢复延时">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .automaticRecoveryDelayAfterDischargeOvercurrent
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="放电过流后自动恢复锁定">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .automaticRecoveryLockingAfterDischargeOvercurrent
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="逆变器电流超过限制电流">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .theInverterCurrentExceedsTheLimitCurrent
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="电池参数显示方式">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.batteryParameterDisplayMethod
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="当前显示参数的电池ID">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .theBatteryIdOfTheCurrentDisplayedParameter
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="电池包设计容量">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.batteryPackDesignCapacity
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="当前电池满容量">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.currentBatteryFullCapacity
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="电池剩余容量">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.remainingBatteryCapacity
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="MOS控制">
              <el-switch v-model="batteryParameter.batterySetObj.mosControl" />
            </el-descriptions-item>
            <el-descriptions-item label="充/放电加热使能">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .chargingDischargingHeatingEnable
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="GPS通讯模块电源控制">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .gpsCommunicationModulePowerControl
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="实时时钟">
              <el-switch
                v-model="batteryParameter.batterySetObj.realTimeClock"
              />
            </el-descriptions-item>
            <el-descriptions-item label="放电过流1保护">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.dischargeOvercurrent1Protection
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="放电过流1延时">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.dischargeOvercurrent1Delay
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="环境高温保护">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .environmentalHighTemperatureProtection
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="环境高温保护恢复">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .environmentalHighTemperatureProtectionRecovery
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="环境低温保护">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .environmentalLowTemperatureProtection
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="环境低温保护恢复">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .environmentalLowTemperatureProtectionRecovery
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="总压过压保护">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .totalPressureOvervoltageProtection
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="总压过压保护恢复">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .totalPressureOvervoltageProtectionRecovery
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="总压过放保护">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .totalVoltageOvervoltageProtection
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="总压过放恢复">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .totalPressureOverDischargeRecovery
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="总压过压保护延时">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .totalVoltageOvervoltageProtectionDelay
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="总压过放保护延时">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .totalVoltageOverDischargeProtectionDelay
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="总过压恢复延时">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.totalOvervoltageRecoveryDelay
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="总过放恢复延时">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.totalOverdischargeRecoveryDelay
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="MOS高温保护">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.mosHighTemperatureProtection
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="MOS高温恢复">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.mosHighTemperatureRecovery
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="MOS高温保护延时">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .moshighTemperatureProtectionDelay
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="充满保护_总压高于">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .fullOfProtectionTotalPressureAbove
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="充满保护_充电电流低于">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .fullOfProtectionChargingCurrentBelow
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="充满保护_延时时间">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.fullOfProtectionDelayTime
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="加热/风扇开启温度">
              <el-switch
                v-model="batteryParameter.batterySetObj.heatingFanOnTemperature"
              />
            </el-descriptions-item>
            <el-descriptions-item label="加热/风扇恢复温度">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.heatingFanRecoveryTemperature
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="使能设置-电压告警">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.enableSettingsVoltageAlarm
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="使能设置-过流告警">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.enableSettingsOvercurrentAlarm
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="使能设置-过温告警">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .enableSettingsCellTemperatureAlarm
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="使能设置-MOS过温告警">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .enableSettingMosOverTemperatureAlarm
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="使能设置-电芯不均衡告警">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .enableSettingsCellImbalanceAlarm
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="使能设置-环境温度告警">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .enableSettingsAmbientTemperatureAlarm
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="使能设置-SOC低告警">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.enableSettingSocLowAlarm
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="使能设置-充电加热使能">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.enableSettingsUnlockSystemLocks
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="使能设置-总电压保护">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .enableSettingsTotalVoltageProtection
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="使能设置-充电过流后放电恢复功能">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .enableSettingsDischargeRecoveryAfterChargingOvercurrent
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="使能设置-放电过流后延时自动恢复功能">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .enableSettingsDelayAutomaticRecoveryAfterDischargeOvercurrent
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="使能设置-放电过流后充电恢复功能">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .enableSettingsChargingAfterDischargeOvercurrent
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="使能设置-静置均衡功能">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.enableSettingsStaticEquilibrium
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="系统锁状态序号">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.systemLockStatusSerialNumber
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="总压过压告警电压">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .totalVoltageOvervoltageAlarmVoltage
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="总压过放告警电压">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .totalVoltageOverDischargeAlarmVoltage
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="电芯过压告警电压">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.cellOvervoltageAlarmVoltage
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="电芯过放告警电压">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.cellOverDischargeAlarmVoltage
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="充电过流告警电流">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.chargingOvercurrentAlarmCurrent
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="放电过流告警电流">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .dischargeOvercurrentAlarmCurrent
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="充电高温告警温度">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .chargingHighTemperatureAlarmTemperature
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="充电低温告警温度">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .chargingLowTemperatureAlarmTemperature
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="放电高温告警温度">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .dischargeHighTemperatureAlarmTemperature
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="放电低温告警温度">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .dischargeLowTemperatureAlarmTemperature
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="MOS过温告警温度">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .mosOverTemperatureAlarmTemperature
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="MOS过温告警恢复温度">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .mosOverTemperatureAlarmRecoveryTemperature
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="电芯不均衡告警压差">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .batteryImbalanceAlarmPressureDifference
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="不均衡告警恢复压差">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .imbalanceAlarmRecoveryPressureDifference
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="环境高温告警">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .environmentalHighTemperatureAlarm
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="环境低温告警">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .environmentalLowTemperatureAlarm
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="SOC低告警">
              <el-switch v-model="batteryParameter.batterySetObj.socLowAlarm" />
            </el-descriptions-item>
            <el-descriptions-item label="充电限流功能">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.chargingCurrentLimitingFunction
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="掉电电压">
              <el-switch
                v-model="batteryParameter.batterySetObj.powerDownVoltage"
              />
            </el-descriptions-item>
            <el-descriptions-item label="掉电电流">
              <el-switch
                v-model="batteryParameter.batterySetObj.powerDownCurrent"
              />
            </el-descriptions-item>
            <el-descriptions-item label="掉电延时">
              <el-switch
                v-model="batteryParameter.batterySetObj.powerDownDelay"
              />
            </el-descriptions-item>
            <el-descriptions-item label="每月自放电率">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.monthlySelfDischargeRate
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="循环1次容量比">
              <el-switch
                v-model="batteryParameter.batterySetObj.cycle1CapacityRatio"
              />
            </el-descriptions-item>
            <el-descriptions-item label="SOC 0%单体电压">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.soc0PercentMonomerVoltage
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="每循1次满容量衰减">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .fullCapacityAttenuationOncePerCycle
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="通讯地址">
              <el-switch
                v-model="batteryParameter.batterySetObj.communicateAddress"
              />
            </el-descriptions-item>
            <el-descriptions-item label="自定义参数1">
              <el-switch
                v-model="batteryParameter.batterySetObj.customParameters1"
              />
            </el-descriptions-item>
            <el-descriptions-item label="自定义参数2">
              <el-switch
                v-model="batteryParameter.batterySetObj.customParameters2"
              />
            </el-descriptions-item>
            <el-descriptions-item label="自定义参数3">
              <el-switch
                v-model="batteryParameter.batterySetObj.customParameters3"
              />
            </el-descriptions-item>
            <el-descriptions-item label="自定义参数4">
              <el-switch
                v-model="batteryParameter.batterySetObj.customParameters4"
              />
            </el-descriptions-item>
            <el-descriptions-item label="自定义参数5">
              <el-switch
                v-model="batteryParameter.batterySetObj.customParameters5"
              />
            </el-descriptions-item>
            <el-descriptions-item label="自定义参数6">
              <el-switch
                v-model="batteryParameter.batterySetObj.customParameters6"
              />
            </el-descriptions-item>
            <el-descriptions-item label="自定义参数7">
              <el-switch
                v-model="batteryParameter.batterySetObj.customParameters7"
              />
            </el-descriptions-item>
            <el-descriptions-item label="自定义参数8">
              <el-switch
                v-model="batteryParameter.batterySetObj.customParameters8"
              />
            </el-descriptions-item>
            <el-descriptions-item label="自定义状态1">
              <el-switch
                v-model="batteryParameter.batterySetObj.customStatus1"
              />
            </el-descriptions-item>
            <el-descriptions-item label="自定义状态2">
              <el-switch
                v-model="batteryParameter.batterySetObj.customStatus2"
              />
            </el-descriptions-item>
            <el-descriptions-item label="放电/静置加热使能">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.dischargeStaticHeatingEnable
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="解锁系统锁">
              <el-switch
                v-model="batteryParameter.batterySetObj.unlockSystemLock"
              />
            </el-descriptions-item>
            <el-descriptions-item label="放电开启加热温度">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.dischargeOnHeatingTemperature
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="放电关闭加热温度">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.dischargeOffHeatingTemperature
                "
              />
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-card>

      <el-card style="margin-top: 10px">
        <div slot="header">
          <span>三相电表</span>
          <el-switch
            style="margin-left: 10px"
            v-model="threePhaseMeterParameter.isShow"
            @change="changeThreePhaseParameter"
          />
        </div>
        <el-card>
          <div slot="header">
            <span>基本设置</span>
            <el-switch
              style="margin-left: 10px"
              v-model="threePhaseMeterParameter.threePhaseMeterBasic"
              @change="changeThreePhaseParameterItem('threePhaseMeterBasic')"
            />
          </div>
          <el-descriptions title="" :column="4">
            <el-descriptions-item label="1 路组合有功总电能">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .oneCombinedActiveTotalElectricEnergy
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="2 路组合有功总电能">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .twoCombinedActiveTotalElectricEnergy
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="3 路组合有功总电能">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .threeCombinedActiveTotalElectricEnergy
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="4 路组合有功总电能">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .fourCombinedActiveTotalElectricEnergy
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="1 路当前正向有功总电能">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .oneCurrentTotalPositiveActiveEnergy
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="2 路当前正向有功总电能">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .twoCurrentTotalPositiveActiveEnergy
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="3 路当前正向有功总电能">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .threeCurrentTotalPositiveActiveEnergy
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="4 路当前正向有功总电能">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .fourCurrentTotalPositiveActiveEnergy
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="1 路当前反向有功总电能">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .oneCurrentTotalReserveActiveEnergy
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="2 路当前反向有功总电能">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .twoCurrentTotalReserveActiveEnergy
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="3 路当前反向有功总电能">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .threeCurrentTotalReserveActiveEnergy
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="4 路当前反向有功总电能">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .fourCurrentTotalReserveActiveEnergy
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="1 路 A 相电压">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.oneVoltageA
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="1 路 B 相电压">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.oneVoltageB
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="1 路 C 相电压">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.oneVoltageC
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="2 路 A 相电压">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.twoVoltageA
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="2 路 B 相电压">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.twoVoltageB
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="2 路 C 相电压">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.twoVoltageC
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="3 路 A 相电压">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.threeVoltageA
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="3 路 B 相电压">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.threeVoltageB
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="3 路 C 相电压">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.threeVoltageC
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="4 路 A 相电压">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.fourVoltageA
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="4 路 B 相电压">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.fourVoltageB
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="4 路 C 相电压">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.fourVoltageC
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="1 路 A 相电流">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.oneCurrentA
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="1 路 B 相电流">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.oneCurrentB
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="1 路 C 相电流">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.oneCurrentC
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="2 路 A 相电流">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.twoCurrentA
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="2 路 B 相电流">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.twoCurrentB
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="2 路 C 相电流">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.twoCurrentC
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="3 路 A 相电流">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.threeCurrentA
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="3 路 B 相电流">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.threeCurrentB
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="3 路 C 相电流">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.fourCurrentA
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="4 路 A 相电流">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.fourCurrentB
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="4 路 B 相电流">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.fourCurrentC
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="1 路有功总功率">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .oneTotalActivePower
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="1 路A相有功总功率">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .oneTotalActivePowerA
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="1 路B相有功总功率">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .oneTotalActivePowerB
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="1 路C相有功总功率">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .oneTotalActivePowerC
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="2 路有功总功率">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .twoTotalActivePower
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="2 路A相有功总功率">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .twoTotalActivePowerA
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="2 路 B 相有功总功率">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .twoTotalActivePowerB
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="2 路 C 相有功总功率">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .twoTotalActivePowerC
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="3 路有功总功率">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .threeTotalActivePower
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="3 路A相有功总功率">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .threeTotalActivePowerA
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="3 路 B 相有功总功率">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .threeTotalActivePowerB
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="3 路 C 相有功总功率">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .threeTotalActivePowerC
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="4 路有功总功率">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .fourTotalActivePower
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="4 路A相有功总功率">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .fourTotalActivePowerA
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="4 路B相有功总功率">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .fourTotalActivePowerB
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="4 路C相有功总功率">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .fourTotalActivePowerC
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="1 路总功率因数">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .onePowerFactorTotal
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="1 路 A 相功率因数">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.onePowerFactorA
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="1 路 B 相功率因数">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.onePowerFactorB
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="1 路 C 相功率因数">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.onePowerFactorC
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="2 路总功率因数">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .twoPowerFactorTotal
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="2 路 A 相功率因数">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.twoPowerFactorA
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="2 路 B 相功率因数">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.twoPowerFactorB
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="2 路 C 相功率因数">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.twoPowerFactorC
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="3 路总功率因数">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .threePowerFactorTotal
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="3 路 A 相功率因数">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .threePowerFactorA
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="3 路 B 相功率因数">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .threePowerFactorB
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="3 路 C 相功率因数">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .threePowerFactorC
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="4 路总功率因数">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .fourPowerFactorTotal
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="4 路 A 相功率因数">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.fourPowerFactorA
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="4 路 B 相功率因数">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.fourPowerFactorB
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="4 路 C 相功率因数">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.fourPowerFactorC
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="1 路频率">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.oneFrequency
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="2 路频率">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.twoFrequency
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="3 路频率">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.threeFrequency
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="4 路频率">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.fourFrequency
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="1 路无功总功率">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .oneTotalReactivePower
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="1 路 A 相无功总功率">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .oneTotalReactivePowerA
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="1 路 B 相无功总功率">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .oneTotalReactivePowerB
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="1 路 C 相无功总功率">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .oneTotalReactivePowerC
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="2 路无功总功率">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .twoTotalReactivePower
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="2 路 A 相无功总功率">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .twoTotalReactivePowerA
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="2 路 B 相无功总功率">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .twoTotalReactivePowerB
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="2 路 C 相无功总功率">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .twoTotalReactivePowerC
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="3 路无功总功率">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .threeTotalReactivePower
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="3 路 A 相无功总功率">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .threeTotalReactivePowerA
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="3 路 B 相无功总功率">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .threeTotalReactivePowerB
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="3 路 C 相无功总功率">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .threeTotalReactivePowerC
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="4 路无功总功率">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .fourTotalReactivePower
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="4 路 A 相无功总功率">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .fourTotalReactivePowerA
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="4 路 B 相无功总功率">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .fourTotalReactivePowerB
                "
              />
            </el-descriptions-item>
            <el-descriptions-item label="4 路 C 相无功总功率">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .fourTotalReactivePowerC
                "
              />
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-card>
    </template>
  </div>
</template>
<script>
import { qryConfigDataShow, saveConfigDataShow } from "@/api/device";
// 运行信息参数对象
const operationInformationList = [
  "runInformation",
  "basicInformation",
  "pvInformation",
  "batteryInformation",
  "powerGridInformation",
  "inverterInformation",
  "loadInformation",
  "electricityMeterInformation",
  "otherInformation",
];
const systemSetList = [
  "commonSet",
  "communicationSet",
  "advancedSet",
  "gridOvervoltageSet",
  "otherSet",
];
const batteryParameterList = ["batterySet"];
const threePhaseMeterParameterList = ["threePhaseMeterBasic"];
export default {
  name: "",
  data() {
    return {
      type: "0",
      operationInformation: {
        isShow: false,
        runInformation: false,
        runInformationObj: {
          displayType: false,
          mcuSoftwareVersion: false,
          dspSoftwareVersion: false,
          mcuHardwareVersion: false,
          dspHardwareVersion: false,
          currentModeOfTheSystem: false,
          systemRunStatus: false,
        },
        basicInformation: false,
        basicInformationObj: {
          dcdcTemperature: false,
          countryCode: false,
          busVoltage: false,
          dailyPowerGeneration: false,
          totalPowerGeneration: false,
          ratedPower: false,
          batteryEnergy: false,
        },
        pvInformation: false,
        pvInformationObj: {
          pv1Voltage: false,
          pv1Current: false,
          pv1Power: false,
          pv2Voltage: false,
          pv2Current: false,
          pv2Power: false,
        },
        batteryInformation: false,
        batteryInformationObj: {
          batteryStatus: false,
          batteryVoltage: false,
          batteryCurrent: false,
          batteryPower: false,
          batteryTotalSoc: false,
          bmsSign: false,
        },
        powerGridInformation: false,
        powerGridInformationObj: {
          powerGridStatus: false,
          gridFrequencyA: false,
          gridFrequencyB: false,
          gridFrequencyC: false,
          gridVoltageA: false,
          gridVoltageB: false,
          gridVoltageC: false,
          apparentPowerOfThePowerGrid: false,
          activePowerOfThePowerGrid: false,
          reactivePowerOfThePowerGrid: false,
          ctCurrent: false,
          ctPower: false,
          ctDirection: false,
        },
        inverterInformation: false,
        inverterInformationObj: {
          inverterTemperature: false,
          inversionState: false,
          inverterOutputFrequencyA: false,
          inverterOutputFrequencyB: false,
          inverterOutputFrequencyC: false,
          inverterOutputVoltageA: false,
          inverterOutputVoltageB: false,
          inverterOutputVoltageC: false,
          inverterOutputCurrentA: false,
          inverterOutputCurrentB: false,
          inverterOutputCurrentC: false,
          invertedApparentPowerA: false,
          invertedApparentPowerB: false,
          invertedApparentPowerC: false,
          invertedActivePowerA: false,
          invertedActivePowerB: false,
          invertedActivePowerC: false,
          invertedReactivePowerA: false,
          invertedReactivePowerB: false,
          invertedReactivePowerC: false,
        },
        loadInformation: false,
        loadInformationObj: {
          loadVoltageA: false,
          loadVoltageB: false,
          loadVoltageC: false,
          loadCurrentA: false,
          loadCurrentB: false,
          loadCurrentC: false,
          apparentPowerOfLoadA: false,
          apparentPowerOfLoadB: false,
          apparentPowerOfLoadC: false,
          loadActivePowerA: false,
          loadActivePowerB: false,
          loadActivePowerC: false,
          loadPowerPercentageA: false,
          loadPowerPercentageB: false,
          loadPowerPercentageC: false,
          realTimePowerOfLoad: false,
          powerConsumption: false,
        },
        electricityMeterInformation: false,
        electricityMeterInformationObj: {
          normalIndicatorOfElectricityMeter: false,
          meterVoltage: false,
          currentCombinedActiveEnergy: false,
          currentPositiveActiveEnergy: false,
          currentReverseActiveEnergy: false,
          electricityMeterCurrent: false,
          electricityMeterPower: false,
          electricityMeterPowerFactor: false,
          electricityMeterFrequency: false,
        },
        otherInformation: false,
        otherInformationObj: {
          selfInspectionStatus: false,
          selfCheckActualProtectionThreshold: false,
          selfCheckActualProtectionTime: false,
          selfCheckRealTimeProtectionThreshold: false,
          usbStatus: false,
          energyFlowOne: false,
          energyFlowTwo: false,
          energyFlowThree: false,
          runTimeDay: false,
          runTimeHour: false,
          runTimeMinute: false,
          runTimeSecond: false,
          dailyElectricityConsumption: false,
          accumulatedElectricityConsumption: false,
          dailyGridConnectionVolume: false,
          accumulatedGridConnectionQuantity: false,
          dailyElectricityPurchase: false,
          accumulatedPurchasingPower: false,
          dailyChargingCapacity: false,
          accumulatedChargingCapacity: false,
          dailyDischargeCapacity: false,
          accumulatedDischargeCapacity: false,
          leakageCurrent: false,
          intermediateBusbarVoltage: false,
          buckBoostCurrent: false,
          pvIsoVoltage: false,
          zeroGroundVoltage: false,
          dcComponentOfInverterCurrent: false,
          dcComponentOfLoadVoltage: false,
          relayIntermediateVoltage: false,
          numberOfHistoryRecords: false,
          batteryChargingAndDischargingHeatingEnableState: false,
          batteryFactoryCode: false,
          batteryProductNumber: false,
          batteryFactoryDate: false,
          maximumAllowableChargingCurrent: false,
          manufacturerInformation: false,
          inverterSerialNumber: false,
          maximumAllowableDischargeCurrent: false,
          maximumChargingCurrentAllowedByTheInverterForTheBattery: false,
          maximumDischargeCurrentAllowedByTheInverterForTheBattery: false,
        },
      },
      systemSet: {
        isShow: false,
        commonSet: false,
        commonSetObj: {
          systemTime: false,
          communicationProtocolType: false,
          dailyPowerGenerationCalibration: false,
          totalPowerGenerationCalibration: false,
          clearElectricityConsumptionData: false,
          clearPowerGenerationData: false,
          bootCommand: false,
          shutdownCommand: false,
          cancelShutdownCommand: false,
        },
        communicationSet: false,
        communicationSetObj: {
          bmsModel: false,
          bmsAddress: false,
          bmsBaud: false,
          numberOfLithiumBatteryBlocks: false,
          collectorCommunicationAddress: false,
          collectorCommunicationProtocolType: false,
          baudOfCollectorCommunication: false,
          deviceCommunicationAddress: false,
        },
        advancedSet: false,
        advancedSetObj: {
          parallelOffGridMode: false,
          systemModeSet: false,
          pvConnectionSet: false,
          ratedOutputVoltageSet: false,
          ratedOutputFrequencySet: false,
          batteryTypeSet: false,
          batteryChargingCurrent: false,
          batteryDischargeCurrent: false,
          batteryAverageChargingVoltage: false,
          batteryFloatChargingVoltage: false,
          batteryEod: false,
          batteryDod: false,
          lowerLimitOfGridConnectedSoc: false,
          offGridSocLowerLimit: false,
          electricityMeterCt: false,
        },
        gridOvervoltageSet: false,
        gridOvervoltageSetObj: {
          selfInspectionThresholdForOvervoltageInTheFirstSectionOfThePowerGrid: false,
          powerGridOvervoltageSelfCheckTime: false,
          thresholdForOvervoltageSelfCheckInSection2OfThePowerGrid: false,
          powerGridSection2OvervoltageSelfCheckTime: false,
          underVoltageSelfCheckThresholdOfTheFirstSectionOfThePowerGrid: false,
          powerGridUndervoltageSelfCheckTime: false,
          underVoltageSelfCheckThresholdOfTheSecondSectionOfThePowerGrid: false,
          underVoltageSelfCheckTimeOfTheSecondSectionOfThePowerGrid: false,
          thresholdForSelfCheckOfOverFrequencyInTheFirstSectionOfThePowerGrid: false,
          selfInspectionTimeForPeriodOfOverfrequencyInThePowerGrid: false,
          gridSection2OverfrequencySelfTestThreshold: false,
          powerGridSection2OverFrequencySelfCheckTime: false,
          underFrequencySelfCheckThresholdForTheFirstSectionOfThePowerGrid: false,
          powerGridUnderfrequencySelfCheckTime: false,
          underFrequencySelfCheckThresholdOfTheSecondSectionOfThePowerGrid: false,
          underFrequencySelfCheckTimeOfTheSecondSectionOfThePowerGrid: false,
        },
        otherSet: false,
        otherSetObj: {
          resetDeviceCommunicationSettingsToInitialValues: false,
          clearRecordData: false,
          factoryReset: false,
          inverterRestart: false,
          selfCheckEnable: false,
          manuallyClearingFaults: false,
          automaticOperation: false,
          manuallyUnlockingTheSystemLock: false,
          deviceCommunicationBaud: false,
          deviceCommunicationCheckBitSelection: false,
          deviceCommunicationStopBitSelection: false,
          countdownToTurnOffTheInverter: false,
          delayedStartInverter: false,
          countryCode: false,
          systemTimeSetting: false,
          inverterActivePowerSetting: false,
          communicationProtocolType485: false,
          communicationAddress485: false,
          communicationBaud485: false,
          hardLimitEnable: false,
          hardLimitPowerSettingValue: false,
          australianRegionSelection: false,
          bluetoothConnectionFlag: false,
          pvActivePowerSetting: false,
          limitOfActivePowerChangeRate: false,
          islandDetectionEnable: false,
          authenticationMode: false,
          currentSystemOperationModeControlSource: false,
          currentOperatingModeOfTheSystem: false,
          appStartupFlag: false,
          buzzerResponseTime: false,
          communicationType: false,
          systemModeSettings: false,
          usbOperation: false,
          powerFactor: false,
          antiBackflowPowerPercentage: false,
          maximumOutputPowerPercentage: false,
          powerSettingAdjustmentRate: false,
          gridConnectedPowerSoftStartRate: false,
          reactivePowerControlMode: false,
          reactivePowerRegulationRate: false,
          upperLimitValueOfGridVoltageProtection1: false,
          upperLimitValueOfGridVoltageProtection2: false,
          upperLimitValueOfGridVoltageProtection3: false,
          lowerLimitValueOfGridVoltageProtection1: false,
          lowerLimitValueOfGridVoltageProtection2: false,
          lowerLimitValueOfGridVoltageProtection3: false,
          upperLimitValueOfGridVoltageReconnection: false,
          lowerLimitValueOfGridVoltageReconnection: false,
          upperLimitTimeOfGridVoltageProtection1: false,
          upperLimitTimeOfGridVoltageProtection2: false,
          upperLimitTimeOfGridVoltageProtection3: false,
          lowerLimitTimeOfGridVoltageProtection1: false,
          lowerLimitTimeOfGridVoltageProtection2: false,
          lowerLimitTimeOfGridVoltageProtection3: false,
          recoveryTimeOfGridVoltageProtection: false,
          upperLimitValueOfGridFrequencyProtection1: false,
          upperLimitValueOfGridFrequencyProtection2: false,
          upperLimitValueOfGridFrequencyProtection3: false,
          lowerLimitValueOfGridFrequencyProtection1: false,
          lowerLimitValueOfGridFrequencyProtection2: false,
          lowerLimitValueOfGridFrequencyProtection3: false,
          upperLimitValueOfGridFrequencyReconnection: false,
          lowerLimitValueOfGridFrequencyReconnection: false,
          gridFrequencyProtectionUpperLimitTime1: false,
          gridFrequencyProtectionUpperLimitTime2: false,
          gridFrequencyProtectionUpperLimitTime3: false,
          gridFrequencyProtectionLowerLimitTime1: false,
          gridFrequencyProtectionLowerLimitTime2: false,
          gridFrequencyProtectionLowerLimitTime3: false,
          recoveryTimeOfGridFrequencyProtection: false,
          tenMinOvervoltageProtectionValueOfThePowerGrid: false,
          networkingWaitingTime: false,
          reconnectWaitingTime: false,
          coldMode: false,
          reactivePowerPercentage: false,
          freqWattCurveEnable: false,
          voltWattCurveEnable: false,
          voltVarCurveEnable: false,
          pfWattCurveEnable: false,
          timingModeType: false,
          setQuantityChangeRegister1: false,
          setQuantityChangeRegister2: false,
          setQuantityChangeRegister3: false,
          setQuantityChangeRegister4: false,
          setQuantityChangeRegister5: false,
          setQuantityChangeRegister6: false,
          setQuantityChangeRegister7: false,
          setQuantityChangeRegister8: false,
          batteryParameterDisplayMethod: false,
          theBatteryIdOfTheCurrentDisplayedParameter: false,
          mosControl: false,
          gpsCommunicationModulePowerControl: false,
          realTimeClock: false,
        },
      },
      batteryParameter: {
        isShow: false,
        batterySet: false,
        batterySetObj: {
          batteryPackId: false,
          currentUpgradedBatteryId: false,
          upgradeFailedBatteryId: false,
          numberOfBatteryPackCellStringsN: false,
          totalNumberOfTemperatureProbesX: false,
          leakageCurrent: false,
          intermediateBusbarVoltage: false,
          buckBoostCurrent: false,
          pvIsoVoltage: false,
          zeroGroundVoltage: false,
          dcComponentOfInverterCurrent: false,
          dcComponentOfLoadVoltage: false,
          relayIntermediateVoltage: false,
          cellVoltage1: false,
          cellVoltage2: false,
          cellVoltage3: false,
          cellVoltage4: false,
          cellVoltage5: false,
          cellVoltage6: false,
          cellVoltage7: false,
          cellVoltage8: false,
          cellVoltage9: false,
          cellVoltage10: false,
          cellVoltage11: false,
          cellVoltage12: false,
          cellVoltage13: false,
          cellVoltage14: false,
          cellVoltage15: false,
          cellVoltage16: false,
          currentCurrent: false,
          state1: false,
          state2: false,
          state3: false,
          chargingOvercurrentProtection: false,
          chargingOvercurrentProtectionDelay: false,
          cellOvervoltageProtection: false,
          cellOvervoltageProtectionDelay: false,
          cellOverDischargeProtection: false,
          cellOverDischargeProtectionDelay: false,
          overvoltageHysteresisVoltage: false,
          overdischargeHysteresisVoltage: false,
          cellOvervoltageRecoveryDelay: false,
          cellOverDischargeRecoveryDelay: false,
          highTemperatureProtectionDuringDischarge: false,
          highTemperatureProtectionRecoveryDuringDischarge: false,
          lowTemperatureProtectionDuringDischarge: false,
          dischargeLowTemperatureProtectionRecovery: false,
          highTemperatureProtectionDuringCharging: false,
          highTemperatureProtectionRecoveryDuringCharging: false,
          lowTemperatureProtectionDuringCharging: false,
          lowTemperatureProtectionRecoveryDuringCharging: false,
          equalizingOpeningVoltage: false,
          equilibriumOpeningPressureDifference: false,
          cellTemperature1: false,
          cellTemperature2: false,
          cellTemperature3: false,
          cellTemperature4: false,
          mosTemperature: false,
          ambientTemperature: false,
          equilibriumState1: false,
          equilibriumState2: false,
          softwareVersion: false,
          hardwareVersion: false,
          state: false,
          alarmStatusCellOverDischargeAlarm: false,
          alarmStatusTotalOverDischargeAlarm: false,
          alarmStatusCellOvervoltageAlarm: false,
          alarmStatusTotalOvervoltageAlarm: false,
          alarmStatusDischargeOvercurrentAlarm: false,
          alarmStatusDischargeOverTemperatureAlarm: false,
          alarmStatusChargingOverTemperatureAlarm: false,
          alarmStatusEnvironmentalHighTemperatureAlarm: false,
          alarmStatusEnvironmentalLowTemperatureAlarm: false,
          alarmStatusSocLowAlarm: false,
          alarmStatusMosHighTemperatureAlarm: false,
          batterySoc: false,
          batterySoh: false,
          numberOfCycles: false,
          dischargeRemainingTime: false,
          chargingRemainingTime: false,
          currentChargingInterval: false,
          maximumChargingInterval: false,
          totalBatteryVoltage: false,
          maximumVoltageOfBatteryPack: false,
          minimumVoltageOfBatteryPack: false,
          maximumAllowableDischargeCurrent: false,
          maximumAllowableChargingCurrent: false,
          standardChargingVoltage: false,
          currentHumidity: false,
          factoryCode: false,
          productNumber: false,
          dateOfProduction: false,
          batteryDetectionResistanceValue: false,
          maximumCellTemperature: false,
          minimumCellTemperature: false,
          temperatureDifference: false,
          temperatureDifferenceProtectionValue: false,
          temperatureDifferenceAlarmValue: false,
          differentialPressureProtectionValue: false,
          differentialPressureAlarmValue: false,
          staticEquilibriumTime: false,
          automaticRecoveryDelayAfterChargingOvercurrent: false,
          automaticallyResumeLockingAfterOvercharging: false,
          automaticRecoveryDelayAfterDischargeOvercurrent: false,
          automaticRecoveryLockingAfterDischargeOvercurrent: false,
          theInverterCurrentExceedsTheLimitCurrent: false,
          batteryParameterDisplayMethod: false,
          theBatteryIdOfTheCurrentDisplayedParameter: false,
          batteryPackDesignCapacity: false,
          currentBatteryFullCapacity: false,
          remainingBatteryCapacity: false,
          mosControl: false,
          chargingDischargingHeatingEnable: false,
          gpsCommunicationModulePowerControl: false,
          realTimeClock: false,
          chargingOvercurrentProtection: false,
          chargingOvercurrentProtectionDelay: false,
          cellOvervoltageProtection: false,
          cellOvervoltageProtectionDelay: false,
          cellOverDischargeProtection: false,
          cellOverDischargeProtectionDelay: false,
          overvoltageHysteresisVoltage: false,
          overdischargeHysteresisVoltage: false,
          cellOvervoltageRecoveryDelay: false,
          cellOverDischargeRecoveryDelay: false,
          highTemperatureProtectionDuringDischarge: false,
          highTemperatureProtectionRecoveryDuringDischarge: false,
          lowTemperatureProtectionDuringDischarge: false,
          dischargeLowTemperatureProtectionRecovery: false,
          highTemperatureProtectionDuringCharging: false,
          highTemperatureProtectionRecoveryDuringCharging: false,
          lowTemperatureProtectionDuringCharging: false,
          lowTemperatureProtectionRecoveryDuringCharging: false,
          equalizingOpeningVoltage: false,
          equilibriumOpeningPressureDifference: false,
          dischargeOvercurrent1Protection: false,
          dischargeOvercurrent1Delay: false,
          environmentalHighTemperatureProtection: false,
          environmentalHighTemperatureProtectionRecovery: false,
          environmentalLowTemperatureProtection: false,
          environmentalLowTemperatureProtectionRecovery: false,
          totalPressureOvervoltageProtection: false,
          totalPressureOvervoltageProtectionRecovery: false,
          totalVoltageOvervoltageProtection: false,
          totalPressureOverDischargeRecovery: false,
          totalVoltageOvervoltageProtectionDelay: false,
          totalVoltageOverDischargeProtectionDelay: false,
          totalOvervoltageRecoveryDelay: false,
          totalOverdischargeRecoveryDelay: false,
          mosHighTemperatureProtection: false,
          mosHighTemperatureRecovery: false,
          moshighTemperatureProtectionDelay: false,
          fullOfProtectionTotalPressureAbove: false,
          fullOfProtectionChargingCurrentBelow: false,
          fullOfProtectionDelayTime: false,
          heatingFanOnTemperature: false,
          heatingFanRecoveryTemperature: false,
          enableSettingsVoltageAlarm: false,
          enableSettingsOvercurrentAlarm: false,
          enableSettingsCellTemperatureAlarm: false,
          enableSettingMosOverTemperatureAlarm: false,
          enableSettingsCellImbalanceAlarm: false,
          enableSettingsAmbientTemperatureAlarm: false,
          enableSettingSocLowAlarm: false,
          enableSettingsUnlockSystemLocks: false,
          enableSettingsTotalVoltageProtection: false,
          enableSettingsDischargeRecoveryAfterChargingOvercurrent: false,
          enableSettingsDelayAutomaticRecoveryAfterDischargeOvercurrent: false,
          enableSettingsChargingAfterDischargeOvercurrent: false,
          enableSettingsStaticEquilibrium: false,
          systemLockStatusSerialNumber: false,
          totalVoltageOvervoltageAlarmVoltage: false,
          totalVoltageOverDischargeAlarmVoltage: false,
          cellOvervoltageAlarmVoltage: false,
          cellOverDischargeAlarmVoltage: false,
          chargingOvercurrentAlarmCurrent: false,
          dischargeOvercurrentAlarmCurrent: false,
          chargingHighTemperatureAlarmTemperature: false,
          chargingLowTemperatureAlarmTemperature: false,
          dischargeHighTemperatureAlarmTemperature: false,
          dischargeLowTemperatureAlarmTemperature: false,
          mosOverTemperatureAlarmTemperature: false,
          mosOverTemperatureAlarmRecoveryTemperature: false,
          batteryImbalanceAlarmPressureDifference: false,
          imbalanceAlarmRecoveryPressureDifference: false,
          environmentalHighTemperatureAlarm: false,
          environmentalLowTemperatureAlarm: false,
          socLowAlarm: false,
          chargingCurrentLimitingFunction: false,
          powerDownVoltage: false,
          powerDownCurrent: false,
          powerDownDelay: false,
          monthlySelfDischargeRate: false,
          cycle1CapacityRatio: false,
          soc0PercentMonomerVoltage: false,
          fullCapacityAttenuationOncePerCycle: false,
          communicateAddress: false,
          customParameters1: false,
          customParameters2: false,
          customParameters3: false,
          customParameters4: false,
          customParameters5: false,
          customParameters6: false,
          customParameters7: false,
          customParameters8: false,
          customStatus1: false,
          customStatus2: false,
          dischargeStaticHeatingEnable: false,
          unlockSystemLock: false,
          dischargeOnHeatingTemperature: false,
          dischargeOffHeatingTemperature: false,
        },
      },
      threePhaseMeterParameter: {
        isShow: false,
        threePhaseMeterBasic: false,
        threePhaseMeterBasicObj: {
          oneCombinedActiveTotalElectricEnergy: false,
          twoCombinedActiveTotalElectricEnergy: false,
          threeCombinedActiveTotalElectricEnergy: false,
          fourCombinedActiveTotalElectricEnergy: false,
          oneCurrentTotalPositiveActiveEnergy: false,
          twoCurrentTotalPositiveActiveEnergy: false,
          threeCurrentTotalPositiveActiveEnergy: false,
          fourCurrentTotalPositiveActiveEnergy: false,
          oneCurrentTotalReserveActiveEnergy: false,
          twoCurrentTotalReserveActiveEnergy: false,
          threeCurrentTotalReserveActiveEnergy: false,
          fourCurrentTotalReserveActiveEnergy: false,
          oneVoltageA: false,
          oneVoltageB: false,
          oneVoltageC: false,
          twoVoltageA: false,
          twoVoltageB: false,
          twoVoltageC: false,
          threeVoltageA: false,
          threeVoltageB: false,
          threeVoltageC: false,
          fourVoltageA: false,
          fourVoltageB: false,
          fourVoltageC: false,
          oneCurrentA: false,
          oneCurrentB: false,
          oneCurrentC: false,
          twoCurrentA: false,
          twoCurrentB: false,
          twoCurrentC: false,
          threeCurrentA: false,
          threeCurrentB: false,
          threeCurrentC: false,
          fourCurrentA: false,
          fourCurrentB: false,
          fourCurrentC: false,
          oneTotalActivePower: false,
          oneTotalActivePowerA: false,
          oneTotalActivePowerB: false,
          oneTotalActivePowerC: false,
          twoTotalActivePower: false,
          twoTotalActivePowerA: false,
          twoTotalActivePowerB: false,
          twoTotalActivePowerC: false,
          threeTotalActivePower: false,
          threeTotalActivePowerA: false,
          threeTotalActivePowerB: false,
          threeTotalActivePowerC: false,
          fourTotalActivePower: false,
          fourTotalActivePowerA: false,
          fourTotalActivePowerB: false,
          fourTotalActivePowerC: false,
          onePowerFactorTotal: false,
          onePowerFactorA: false,
          onePowerFactorB: false,
          onePowerFactorC: false,
          twoPowerFactorTotal: false,
          twoPowerFactorA: false,
          twoPowerFactorB: false,
          twoPowerFactorC: false,
          threePowerFactorTotal: false,
          threePowerFactorA: false,
          threePowerFactorB: false,
          threePowerFactorC: false,
          fourPowerFactorTotal: false,
          fourPowerFactorA: false,
          fourPowerFactorB: false,
          fourPowerFactorC: false,
          oneFrequency: false,
          twoFrequency: false,
          threeFrequency: false,
          fourFrequency: false,
          oneTotalReactivePower: false,
          oneTotalReactivePowerA: false,
          oneTotalReactivePowerB: false,
          oneTotalReactivePowerC: false,
          twoTotalReactivePower: false,
          twoTotalReactivePowerA: false,
          twoTotalReactivePowerB: false,
          twoTotalReactivePowerC: false,
          threeTotalReactivePower: false,
          threeTotalReactivePowerA: false,
          threeTotalReactivePowerB: false,
          threeTotalReactivePowerC: false,
          fourTotalReactivePower: false,
          fourTotalReactivePowerA: false,
          fourTotalReactivePowerB: false,
          fourTotalReactivePowerC: false,
        },
      },
    };
  },
  created() {
    qryConfigDataShow().then((res) => {
      console.log("查询", res);
      if (res && res.dataList && res.dataList.length === 4) {
        res.dataList.forEach((item) => {
          if (item.key === "operationInformation") {
            this.operationInformation.isShow = item.isShow === 1;
            item.dataList.forEach((i) => {
              this.operationInformation[`${i.key}`] = i.isShow === 1;
              i.dataList.forEach((j) => {
                this.operationInformation[`${i.key}Obj`][`${j.key}`] =
                  j.isShow === 1;
              });
            });
          } else if (item.key === "systemSet") {
            this.systemSet.isShow = item.isShow === 1;
            item.dataList.forEach((i) => {
              this.systemSet[`${i.key}`] = i.isShow === 1;
              i.dataList.forEach((j) => {
                this.systemSet[`${i.key}Obj`][`${j.key}`] = j.isShow === 1;
              });
            });
          } else if (item.key === "batteryParameter") {
            this.batteryParameter.isShow = item.isShow === 1;
            item.dataList.forEach((i) => {
              this.batteryParameter[`${i.key}`] = i.isShow === 1;
              i.dataList.forEach((j) => {
                this.batteryParameter[`${i.key}Obj`][`${j.key}`] =
                  j.isShow === 1;
              });
            });
          } else if (item.key === "threePhaseMeterParameter") {
            this.threePhaseMeterParameter.isShow = item.isShow === 1;
            item.dataList.forEach((i) => {
              this.threePhaseMeterParameter[`${i.key}`] = i.isShow === 1;
              i.dataList.forEach((j) => {
                this.threePhaseMeterParameter[`${i.key}Obj`][`${j.key}`] =
                  j.isShow === 1;
              });
            });
          }
        });
      }
    });
    console.log(this.threePhaseMeterParameter)
  },
  methods: {
    handleSave() {
      let info = {
        dataList: [
          {
            isShow: this.operationInformation.isShow ? 1 : 0,
            key: "operationInformation",
            dataList: [],
          },
          {
            isShow: this.systemSet.isShow ? 1 : 0,
            key: "systemSet",
            dataList: [],
          },
          {
            isShow: this.batteryParameter.isShow ? 1 : 0,
            key: "batteryParameter",
            dataList: [],
          },
          {
            isShow: this.threePhaseMeterParameter.isShow ? 1 : 0,
            key: "threePhaseMeterParameter",
            dataList: [],
          },
        ],
      };
      // 循环取页面7的数据
      for (let i = 0; i < operationInformationList.length; i++) {
        let key = operationInformationList[i];
        let obj = {
          dataList: [],
          key: key,
          isShow: this.operationInformation[key] ? 1 : 0,
        };
        for (const i in this.operationInformation[`${key}Obj`]) {
          obj.dataList.push({
            key: i,
            isShow: this.operationInformation[`${key}Obj`][i] ? 1 : 0,
          });
        }
        info.dataList[0].dataList.push(obj);
      }
      // 循环取页面8的数据
      for (let i = 0; i < systemSetList.length; i++) {
        let key = systemSetList[i];
        let obj = {
          dataList: [],
          key: key,
          isShow: this.systemSet[key] ? 1 : 0,
        };
        for (const i in this.systemSet[`${key}Obj`]) {
          obj.dataList.push({
            key: i,
            isShow: this.systemSet[`${key}Obj`][i] ? 1 : 0,
          });
        }
        info.dataList[1].dataList.push(obj);
      }
      // 循环取页面9的数据
      for (let i = 0; i < batteryParameterList.length; i++) {
        let key = batteryParameterList[i];
        let obj = {
          dataList: [],
          key: key,
          isShow: this.batteryParameter[key] ? 1 : 0,
        };
        for (const i in this.batteryParameter[`${key}Obj`]) {
          obj.dataList.push({
            key: i,
            isShow: this.batteryParameter[`${key}Obj`][i] ? 1 : 0,
          });
        }
        info.dataList[2].dataList.push(obj);
      }
      // 三相电表
      for (let i = 0; i < threePhaseMeterParameterList.length; i++) {
        let key = threePhaseMeterParameterList[i];
        let obj = {
          dataList: [],
          key: key,
          isShow: this.threePhaseMeterParameter[key] ? 1 : 0,
        };
        for (const i in this.threePhaseMeterParameter[`${key}Obj`]) {
          obj.dataList.push({
            key: i,
            isShow: this.threePhaseMeterParameter[`${key}Obj`][i] ? 1 : 0,
          });
        }
        info.dataList[3].dataList.push(obj);
      }
      // for (let i in this.threePhaseMeterParameter.threePhaseMeterBasic) {
      //   let obj = {
      //     key: i,
      //     isShow: this.threePhaseMeterParameter.threePhaseMeterBasic[i] ? 1 : 0
      //   }
      //   info.dataList[3].dataList.push(obj)
      // }
      console.log("info", info);
      saveConfigDataShow(info).then((res) => {
        this.$message.success("保存成功");
      });
    },
    // 切换页面7运行信息总开关
    changeOperationInformation(e) {
      for (const key in this.operationInformation) {
        if (key.indexOf("Obj") > -1) {
          for (const key2 in this.operationInformation[key]) {
            this.operationInformation[key][key2] = e;
          }
        } else {
          this.operationInformation[key] = e;
        }
      }
    },
    // 切换页面7运行信息  子类别
    changeOperationInformationItem(keyName) {
      for (const key in this.operationInformation[`${keyName}Obj`]) {
        this.operationInformation[`${keyName}Obj`][key] =
          this.operationInformation[keyName];
      }
    },
    // 切换页面8系统设置总开关
    changeSystemSet(e) {
      for (const key in this.systemSet) {
        if (key.indexOf("Obj") > -1) {
          for (const key2 in this.systemSet[key]) {
            this.systemSet[key][key2] = e;
          }
        } else {
          this.systemSet[key] = e;
        }
      }
    },
    // 切换页面8系统设置  子类别
    changeSystemSetItem(keyName) {
      for (const key in this.systemSet[`${keyName}Obj`]) {
        this.systemSet[`${keyName}Obj`][key] = this.systemSet[keyName];
      }
    },
    // 切换页面9电池参数 总开关
    changeBatteryParameter(e) {
      for (const key in this.batteryParameter) {
        if (key.indexOf("Obj") > -1) {
          for (const key2 in this.batteryParameter[key]) {
            this.batteryParameter[key][key2] = e;
          }
        } else {
          this.batteryParameter[key] = e;
        }
      }
      console.log(this.batteryParameter);
    },
    // 切换页面9电池参数 子类别
    changeBatteryParameterItem(keyName) {
      for (const key in this.batteryParameter[`${keyName}Obj`]) {
        this.batteryParameter[`${keyName}Obj`][key] =
          this.batteryParameter[keyName];
      }
    },
    changeThreePhaseParameter(e) {
      for (const key in this.threePhaseMeterParameter) {
        if (key.indexOf("Obj") > -1) {
          for (const key2 in this.threePhaseMeterParameter[key]) {
            this.threePhaseMeterParameter[key][key2] = e;
          }
        } else {
          this.threePhaseMeterParameter[key] = e;
        }
      }
      console.log(this.threePhaseMeterParameter);
    },
    changeThreePhaseParameterItem(keyName) {
      console.log(this.threePhaseMeterParameter[keyName]);
      for (const key in this.threePhaseMeterParameter[`${keyName}Obj`]) {
        this.threePhaseMeterParameter[`${keyName}Obj`][key] =
          this.threePhaseMeterParameter[keyName];
      }
      console.log(this.threePhaseMeterParameter)
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 0 10px;
}
</style>
