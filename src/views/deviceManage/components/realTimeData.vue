<template>
  <div class="app-container realTime">
    <basic-container>
      <el-page-header @back="goBack" content="设备详细信息"></el-page-header>

      <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
        <el-menu-item index="7">运行信息</el-menu-item>
        <el-menu-item index="8">系统设置</el-menu-item>
        <el-menu-item index="9">电池参数</el-menu-item>
        <el-menu-item index="0">自检</el-menu-item>
      </el-menu>
      <div v-loading="loading">
      <el-card  style="margin-top: 20px;">
        <el-descriptions title="设备信息" :column="4">
          <el-descriptions-item label="设备名称">{{ deviceInfo.name }}</el-descriptions-item>
          <el-descriptions-item label="SN码">{{ deviceInfo.sn }}</el-descriptions-item>
          <el-descriptions-item label="设备状态">{{ deviceInfo.status | devStatusFilter }}</el-descriptions-item>
          <el-descriptions-item label="创建时间">{{ deviceInfo.createTime | parseTime }}</el-descriptions-item>
        </el-descriptions>
      </el-card>

      <template v-if="activeIndex === '7'">
        <el-card style="margin-top: 10px;" v-if="operationInformation.runInformation">
          <el-descriptions title="运行信息" :column="4">
            <el-descriptions-item label="显示类型" v-if="operationInformation.runInformationObj.displayType">
              {{ operationInformation.runInformationObj.displayTypeVal | displayTypeValFilter }}
            </el-descriptions-item>
            <el-descriptions-item label="MCU软件版本" v-if="operationInformation.runInformationObj.mcuSoftwareVersion">{{ operationInformation.runInformationObj.mcuSoftwareVersionVal }}</el-descriptions-item>
            <el-descriptions-item label="DSP软件版本" v-if="operationInformation.runInformationObj.dspSoftwareVersion">{{ operationInformation.runInformationObj.dspSoftwareVersionVal }}</el-descriptions-item>
            <el-descriptions-item label="MCU硬件版本" v-if="operationInformation.runInformationObj.mcuHardwareVersion">{{ operationInformation.runInformationObj.mcuHardwareVersionVal }}</el-descriptions-item>
            <el-descriptions-item label="DSP硬件版本" v-if="operationInformation.runInformationObj.dspHardwareVersion">{{ operationInformation.runInformationObj.dspHardwareVersionVal }}</el-descriptions-item>
            <el-descriptions-item label="系统当前模式" v-if="operationInformation.runInformationObj.currentModeOfTheSystem">
              {{ operationInformation.runInformationObj.currentModeOfTheSystemVal | systemModeFilter }}
            </el-descriptions-item>
            <el-descriptions-item label="系统运行状态" v-if="operationInformation.runInformationObj.systemRunStatus">
              {{ operationInformation.runInformationObj.systemRunStatusVal | systemStateFilter }}
            </el-descriptions-item>
          </el-descriptions>
        </el-card>

        <el-card style="margin-top: 10px;" v-if="operationInformation.basicInformation">
          <el-descriptions title="基本信息" :column="4">
            <el-descriptions-item label="DCDC温度" v-if="operationInformation.basicInformationObj.dcdcTemperature">{{ operationInformation.basicInformationObj.dcdcTemperatureVal }}℃</el-descriptions-item>
            <el-descriptions-item label="国家码" v-if="operationInformation.basicInformationObj.countryCode">
              {{ operationInformation.basicInformationObj.countryCodeVal | countryCodeValFilter }}
            </el-descriptions-item>
            <el-descriptions-item label="母线电压" v-if="operationInformation.basicInformationObj.busVoltage">{{ operationInformation.basicInformationObj.busVoltageVal }}V</el-descriptions-item>
            <el-descriptions-item label="日发电量" v-if="operationInformation.basicInformationObj.dailyPowerGeneration">{{ operationInformation.basicInformationObj.dailyPowerGenerationVal }}kWh</el-descriptions-item>
            <el-descriptions-item label="总发电量" v-if="operationInformation.basicInformationObj.totalPowerGeneration">{{ operationInformation.basicInformationObj.totalPowerGenerationVal }}kWh</el-descriptions-item>
            <el-descriptions-item label="额定功率" v-if="operationInformation.basicInformationObj.ratedPower">{{ operationInformation.basicInformationObj.ratedPowerVal }}KW</el-descriptions-item>
            <el-descriptions-item label="电池能量" v-if="operationInformation.basicInformationObj.batteryEnergy">{{ operationInformation.basicInformationObj.batteryEnergyVal }}kWh</el-descriptions-item>
          </el-descriptions>
        </el-card>

        <el-card style="margin-top: 10px;" v-if="operationInformation.pvInformation">
          <el-descriptions title="PV信息" :column="4" >
            <el-descriptions-item label="PV1电压" v-if="operationInformation.pvInformationObj.pv1Voltage">{{ operationInformation.pvInformationObj.pv1VoltageVal }}V</el-descriptions-item>
            <el-descriptions-item label="PV1电流" v-if="operationInformation.pvInformationObj.pv1Current">{{ operationInformation.pvInformationObj.pv1CurrentVal }}A</el-descriptions-item>
            <el-descriptions-item label="PV1功率" v-if="operationInformation.pvInformationObj.pv1Power">{{ operationInformation.pvInformationObj.pv1PowerVal }}W</el-descriptions-item>
            <el-descriptions-item label="PV2电压" v-if="operationInformation.pvInformationObj.pv2Voltage">{{ operationInformation.pvInformationObj.pv2VoltageVal }}V</el-descriptions-item>
            <el-descriptions-item label="PV2电流" v-if="operationInformation.pvInformationObj.pv2Current">{{ operationInformation.pvInformationObj.pv2CurrentVal }}A</el-descriptions-item>
            <el-descriptions-item label="PV2功率" v-if="operationInformation.pvInformationObj.pv2Power">{{ operationInformation.pvInformationObj.pv2PowerVal }}W</el-descriptions-item>
          </el-descriptions>
        </el-card>

        <el-card style="margin-top: 10px;" v-if="operationInformation.batteryInformation">
          <el-descriptions title="电池信息" :column="4">
            <el-descriptions-item label="电池状态" v-if="operationInformation.batteryInformationObj.batteryStatus">
              {{ operationInformation.batteryInformationObj.batteryStatusVal | batteryStatusFilter }}
            </el-descriptions-item>
            <el-descriptions-item label="电池电压" v-if="operationInformation.batteryInformationObj.batteryVoltage">{{ operationInformation.batteryInformationObj.batteryVoltageVal }}V</el-descriptions-item>
            <el-descriptions-item label="电池电流" v-if="operationInformation.batteryInformationObj.batteryCurrent">{{ operationInformation.batteryInformationObj.batteryCurrentVal }}A</el-descriptions-item>
            <el-descriptions-item label="电池功率" v-if="operationInformation.batteryInformationObj.batteryPower">{{ operationInformation.batteryInformationObj.batteryPowerVal }}W</el-descriptions-item>
            <el-descriptions-item label="电池总SOC" v-if="operationInformation.batteryInformationObj.batteryTotalSoc">{{ operationInformation.batteryInformationObj.batteryTotalSocVal }}%</el-descriptions-item>
            <el-descriptions-item label="BMS标志" v-if="operationInformation.batteryInformationObj.bmsSign">
              {{ operationInformation.batteryInformationObj.bmsSignVal | BMSFilter }}
            </el-descriptions-item>
          </el-descriptions>
        </el-card>


        <el-card style="margin-top: 10px;" v-if="operationInformation.powerGridInformation">
          <el-descriptions title="电网信息" :column="4">
            <el-descriptions-item label="电网状态" v-if="operationInformation.powerGridInformationObj.powerGridStatus">
              {{ operationInformation.powerGridInformationObj.powerGridStatusVal | GridStateFilter }}
            </el-descriptions-item>
            <el-descriptions-item label="A相电网频率" v-if="operationInformation.powerGridInformationObj.gridFrequencyA">{{ operationInformation.powerGridInformationObj.gridFrequencyAVal }}Hz</el-descriptions-item>
            <el-descriptions-item label="B相电网频率" v-if="operationInformation.powerGridInformationObj.gridFrequencyB">{{ operationInformation.powerGridInformationObj.gridFrequencyBVal }}Hz</el-descriptions-item>
            <el-descriptions-item label="C相电网频率" v-if="operationInformation.powerGridInformationObj.gridFrequencyC">{{ operationInformation.powerGridInformationObj.gridFrequencyCVal }}Hz</el-descriptions-item>
            <el-descriptions-item label="A相电网电压" v-if="operationInformation.powerGridInformationObj.gridVoltageA">{{ operationInformation.powerGridInformationObj.gridVoltageAVal }}V</el-descriptions-item>
            <el-descriptions-item label="B相电网电压" v-if="operationInformation.powerGridInformationObj.gridVoltageB">{{ operationInformation.powerGridInformationObj.gridVoltageBVal }}V</el-descriptions-item>
            <el-descriptions-item label="C相电网电压" v-if="operationInformation.powerGridInformationObj.gridVoltageC">{{ operationInformation.powerGridInformationObj.gridVoltageCVal }}V</el-descriptions-item>
            <el-descriptions-item label="电网视在功率" v-if="operationInformation.powerGridInformationObj.apparentPowerOfThePowerGrid">{{ operationInformation.powerGridInformationObj.apparentPowerOfThePowerGridVal }}VA</el-descriptions-item>
            <el-descriptions-item label="电网有功功率" v-if="operationInformation.powerGridInformationObj.activePowerOfThePowerGrid">{{ operationInformation.powerGridInformationObj.activePowerOfThePowerGridVal }}W</el-descriptions-item>
            <el-descriptions-item label="电网无功功率" v-if="operationInformation.powerGridInformationObj.reactivePowerOfThePowerGrid">{{ operationInformation.powerGridInformationObj.reactivePowerOfThePowerGridVal }}VAR</el-descriptions-item>
            <el-descriptions-item label="CT电流" v-if="operationInformation.powerGridInformationObj.ctCurrent">{{ operationInformation.powerGridInformationObj.ctCurrentVal }}A</el-descriptions-item>
            <el-descriptions-item label="CT功率" v-if="operationInformation.powerGridInformationObj.ctPower">{{ operationInformation.powerGridInformationObj.ctPowerVal }}W</el-descriptions-item>
            <el-descriptions-item label="CT方向" v-if="operationInformation.powerGridInformationObj.ctDirection">
              {{ operationInformation.powerGridInformationObj.ctDirectionVal | CTFilter }}
            </el-descriptions-item>
          </el-descriptions>
        </el-card>

        <el-card style="margin-top: 10px;" v-if="operationInformation.inverterInformation">
          <el-descriptions title="逆变器信息" :column="4">
            <el-descriptions-item label="逆变器温度" v-if="operationInformation.inverterInformationObj.inverterTemperature">{{ operationInformation.inverterInformationObj.inverterTemperatureVal }}℃</el-descriptions-item>
            <el-descriptions-item label="逆变状态" v-if="operationInformation.inverterInformationObj.inversionState">
              {{ operationInformation.inverterInformationObj.inversionStateVal | invertingStateFilter }}
            </el-descriptions-item>
            <el-descriptions-item label="A相逆变输出频率" v-if="operationInformation.inverterInformationObj.inverterOutputFrequencyA">{{ operationInformation.inverterInformationObj.inverterOutputFrequencyAVal }}Hz</el-descriptions-item>
            <el-descriptions-item label="B相逆变输出频率" v-if="operationInformation.inverterInformationObj.inverterOutputFrequencyB">{{ operationInformation.inverterInformationObj.inverterOutputFrequencyBVal }}Hz</el-descriptions-item>
            <el-descriptions-item label="C相逆变输出频率" v-if="operationInformation.inverterInformationObj.inverterOutputFrequencyC">{{ operationInformation.inverterInformationObj.inverterOutputFrequencyCVal }}Hz</el-descriptions-item>
            <el-descriptions-item label="A相逆变输出电压" v-if="operationInformation.inverterInformationObj.inverterOutputVoltageA">{{ operationInformation.inverterInformationObj.inverterOutputVoltageAVal }}V</el-descriptions-item>
            <el-descriptions-item label="B相逆变输出电压" v-if="operationInformation.inverterInformationObj.inverterOutputVoltageB">{{ operationInformation.inverterInformationObj.inverterOutputVoltageBVal }}V</el-descriptions-item>
            <el-descriptions-item label="C相逆变输出电压" v-if="operationInformation.inverterInformationObj.inverterOutputVoltageC">{{ operationInformation.inverterInformationObj.inverterOutputVoltageCVal }}V</el-descriptions-item>
            <el-descriptions-item label="A相逆变输出电流" v-if="operationInformation.inverterInformationObj.inverterOutputCurrentA">{{ operationInformation.inverterInformationObj.inverterOutputCurrentAVal }}A</el-descriptions-item>
            <el-descriptions-item label="B相逆变输出电流" v-if="operationInformation.inverterInformationObj.inverterOutputCurrentB">{{ operationInformation.inverterInformationObj.inverterOutputCurrentBVal }}A</el-descriptions-item>
            <el-descriptions-item label="C相逆变输出电流" v-if="operationInformation.inverterInformationObj.inverterOutputCurrentC">{{ operationInformation.inverterInformationObj.inverterOutputCurrentCVal }}A</el-descriptions-item>
            <el-descriptions-item label="A相逆变视在功率" v-if="operationInformation.inverterInformationObj.invertedApparentPowerA">{{ operationInformation.inverterInformationObj.invertedApparentPowerAVal }}VA</el-descriptions-item>
            <el-descriptions-item label="B相逆变视在功率" v-if="operationInformation.inverterInformationObj.invertedApparentPowerB">{{ operationInformation.inverterInformationObj.invertedApparentPowerBVal }}VA</el-descriptions-item>
            <el-descriptions-item label="C相逆变视在功率" v-if="operationInformation.inverterInformationObj.invertedApparentPowerC">{{ operationInformation.inverterInformationObj.invertedApparentPowerCVal }}VA</el-descriptions-item>
            <el-descriptions-item label="A相逆变有功功率" v-if="operationInformation.inverterInformationObj.invertedActivePowerA">{{ operationInformation.inverterInformationObj.invertedActivePowerAVal }}W</el-descriptions-item>
            <el-descriptions-item label="B相逆变有功功率" v-if="operationInformation.inverterInformationObj.invertedActivePowerB">{{ operationInformation.inverterInformationObj.invertedActivePowerBVal }}W</el-descriptions-item>
            <el-descriptions-item label="C相逆变有功功率" v-if="operationInformation.inverterInformationObj.invertedActivePowerC">{{ operationInformation.inverterInformationObj.invertedActivePowerCVal }}W</el-descriptions-item>
            <el-descriptions-item label="A相逆变无功功率" v-if="operationInformation.inverterInformationObj.invertedReactivePowerA">{{ operationInformation.inverterInformationObj.invertedReactivePowerAVal }}VAR</el-descriptions-item>
            <el-descriptions-item label="B相逆变无功功率" v-if="operationInformation.inverterInformationObj.invertedReactivePowerB">{{ operationInformation.inverterInformationObj.invertedReactivePowerBVal }}VAR</el-descriptions-item>
            <el-descriptions-item label="C相逆变无功功率" v-if="operationInformation.inverterInformationObj.invertedReactivePowerC">{{ operationInformation.inverterInformationObj.invertedReactivePowerCVal }}VAR</el-descriptions-item>
          </el-descriptions>
        </el-card>

        <el-card style="margin-top: 10px;" v-if="operationInformation.loadInformation">
          <el-descriptions title="负载信息" :column="4">
            <el-descriptions-item label="A相负载电压" v-if="operationInformation.loadInformationObj.loadVoltageA">{{ operationInformation.loadInformationObj.loadVoltageAVal }}V</el-descriptions-item>
            <el-descriptions-item label="B相负载电压" v-if="operationInformation.loadInformationObj.loadVoltageB">{{ operationInformation.loadInformationObj.loadVoltageBVal }}V</el-descriptions-item>
            <el-descriptions-item label="C相负载电压" v-if="operationInformation.loadInformationObj.loadVoltageC">{{ operationInformation.loadInformationObj.loadVoltageCVal }}V</el-descriptions-item>
            <el-descriptions-item label="A相负载电流" v-if="operationInformation.loadInformationObj.loadCurrentA">{{ operationInformation.loadInformationObj.loadCurrentAVal }}A</el-descriptions-item>
            <el-descriptions-item label="B相负载电流" v-if="operationInformation.loadInformationObj.loadCurrentB">{{ operationInformation.loadInformationObj.loadCurrentBVal }}A</el-descriptions-item>
            <el-descriptions-item label="C相负载电流" v-if="operationInformation.loadInformationObj.loadCurrentC">{{ operationInformation.loadInformationObj.loadCurrentCVal }}A</el-descriptions-item>
            <el-descriptions-item label="A相负载视在功率" v-if="operationInformation.loadInformationObj.apparentPowerOfLoadA">{{ operationInformation.loadInformationObj.apparentPowerOfLoadAVal }}VA</el-descriptions-item>
            <el-descriptions-item label="B相负载视在功率" v-if="operationInformation.loadInformationObj.apparentPowerOfLoadB">{{ operationInformation.loadInformationObj.apparentPowerOfLoadBVal }}VA</el-descriptions-item>
            <el-descriptions-item label="C相负载视在功率" v-if="operationInformation.loadInformationObj.apparentPowerOfLoadC">{{ operationInformation.loadInformationObj.apparentPowerOfLoadCVal }}VA</el-descriptions-item>
            <el-descriptions-item label="A相负载有功功率" v-if="operationInformation.loadInformationObj.loadActivePowerA">{{ operationInformation.loadInformationObj.loadActivePowerAVal }}W</el-descriptions-item>
            <el-descriptions-item label="B相负载有功功率" v-if="operationInformation.loadInformationObj.loadActivePowerB">{{ operationInformation.loadInformationObj.loadActivePowerBVal }}W</el-descriptions-item>
            <el-descriptions-item label="C相负载有功功率" v-if="operationInformation.loadInformationObj.loadActivePowerC">{{ operationInformation.loadInformationObj.loadActivePowerCVal }}W</el-descriptions-item>
            <el-descriptions-item label="A相负载功率百分比" v-if="operationInformation.loadInformationObj.loadPowerPercentageA">{{ operationInformation.loadInformationObj.loadPowerPercentageAVal }}%</el-descriptions-item>
            <el-descriptions-item label="B相负载功率百分比" v-if="operationInformation.loadInformationObj.loadPowerPercentageB">{{ operationInformation.loadInformationObj.loadPowerPercentageBVal }}%</el-descriptions-item>
            <el-descriptions-item label="C相负载功率百分比" v-if="operationInformation.loadInformationObj.loadPowerPercentageC">{{ operationInformation.loadInformationObj.loadPowerPercentageCVal }}%</el-descriptions-item>
            <el-descriptions-item label="负载实时功率" v-if="operationInformation.loadInformationObj.realTimePowerOfLoad">{{ operationInformation.loadInformationObj.realTimePowerOfLoadVal }}W</el-descriptions-item>
            <el-descriptions-item label="用电量" v-if="operationInformation.loadInformationObj.powerConsumption">{{ operationInformation.loadInformationObj.powerConsumptionVal }}kWh</el-descriptions-item>
          </el-descriptions>
        </el-card>

        <el-card style="margin-top: 10px;" v-if="operationInformation.electricityMeterInformation">
          <el-descriptions title="电表信息" :column="4">
            <el-descriptions-item label="电表正常标志" v-if="operationInformation.electricityMeterInformationObj.normalIndicatorOfElectricityMeter">
              {{ operationInformation.electricityMeterInformationObj.normalIndicatorOfElectricityMeterVal | meterNormalFilter }}
            </el-descriptions-item>
            <el-descriptions-item label="电表电压" v-if="operationInformation.electricityMeterInformationObj.meterVoltage">{{ operationInformation.electricityMeterInformationObj.meterVoltageVal }}V</el-descriptions-item>
            <el-descriptions-item label="当前组合有功电能" v-if="operationInformation.electricityMeterInformationObj.currentCombinedActiveEnergy">{{ operationInformation.electricityMeterInformationObj.currentCombinedActiveEnergyVal }}kWh</el-descriptions-item>
            <el-descriptions-item label="当前正向有功电能" v-if="operationInformation.electricityMeterInformationObj.currentPositiveActiveEnergy">{{ operationInformation.electricityMeterInformationObj.currentPositiveActiveEnergyVal }}kWh</el-descriptions-item>
            <el-descriptions-item label="当前反向有功电能" v-if="operationInformation.electricityMeterInformationObj.currentReverseActiveEnergy">{{ operationInformation.electricityMeterInformationObj.currentReverseActiveEnergyVal }}kWh</el-descriptions-item>
            <el-descriptions-item label="电表电流" v-if="operationInformation.electricityMeterInformationObj.electricityMeterCurrent">{{ operationInformation.electricityMeterInformationObj.electricityMeterCurrentVal }}A</el-descriptions-item>
            <el-descriptions-item label="电表功率" v-if="operationInformation.electricityMeterInformationObj.electricityMeterPower">{{ operationInformation.electricityMeterInformationObj.electricityMeterPowerVal }}W</el-descriptions-item>
            <el-descriptions-item label="电表功率因数" v-if="operationInformation.electricityMeterInformationObj.electricityMeterPowerFactor">{{ operationInformation.electricityMeterInformationObj.electricityMeterPowerFactorVal }}</el-descriptions-item>
            <el-descriptions-item label="电表频率" v-if="operationInformation.electricityMeterInformationObj.electricityMeterFrequency">{{ operationInformation.electricityMeterInformationObj.electricityMeterFrequencyVal }}Hz</el-descriptions-item>
          </el-descriptions>
        </el-card>

        <el-card style="margin-top: 10px;" v-if="operationInformation.otherInformation">
          <el-descriptions title="其他信息" :column="4">
            <el-descriptions-item label="自检状态" v-if="operationInformation.otherInformationObj.selfInspectionStatus">
              {{ operationInformation.otherInformationObj.selfInspectionStatusVal | selfCheckFilter }}
            </el-descriptions-item>
            <el-descriptions-item label="自检实际保护阀值" v-if="operationInformation.otherInformationObj.selfCheckActualProtectionThreshold">
              {{ operationInformation.otherInformationObj.selfCheckActualProtectionThresholdVal }}V/Hz
            </el-descriptions-item>
            <el-descriptions-item label="自检实际保护时间" v-if="operationInformation.otherInformationObj.selfCheckActualProtectionTime">
              {{ operationInformation.otherInformationObj.selfCheckActualProtectionTimeVal }}ms
            </el-descriptions-item>
            <el-descriptions-item label="自检实时保护阀值" v-if="operationInformation.otherInformationObj.selfCheckRealTimeProtectionThreshold">
              {{ operationInformation.otherInformationObj.selfCheckRealTimeProtectionThresholdVal }}V/Hz
            </el-descriptions-item>
            <el-descriptions-item label="USB状态" v-if="operationInformation.otherInformationObj.usbStatus">
              {{ operationInformation.otherInformationObj.usbStatusVal | USBFilter }}
            </el-descriptions-item>
            <el-descriptions-item label="能流图线编号1-8段标志" v-if="operationInformation.otherInformationObj.energyFlowOne">
              {{ operationInformation.otherInformationObj.energyFlowOneVal }}
            </el-descriptions-item>
            <el-descriptions-item label="能流图线编号9-16段标志" v-if="operationInformation.otherInformationObj.energyFlowTwo">
              {{ operationInformation.otherInformationObj.energyFlowTwoVal | energyFlowFilter }}
            </el-descriptions-item>
            <el-descriptions-item label="能流图开关编号1-16标志" v-if="operationInformation.otherInformationObj.energyFlowThree">
              {{ operationInformation.otherInformationObj.energyFlowThreeVal }}
            </el-descriptions-item>
            <el-descriptions-item label="运行时间(天)" v-if="operationInformation.otherInformationObj.runTimeDay">
              {{ operationInformation.otherInformationObj.runTimeDayVal }}d
            </el-descriptions-item>
            <el-descriptions-item label="运行时间(时)" v-if="operationInformation.otherInformationObj.runTimeHour">
              {{ operationInformation.otherInformationObj.runTimeHourVal }}h
            </el-descriptions-item>
            <el-descriptions-item label="运行时间(分)" v-if="operationInformation.otherInformationObj.runTimeMinute">
              {{ operationInformation.otherInformationObj.runTimeMinuteVal }}min
            </el-descriptions-item>
            <el-descriptions-item label="运行时间(秒)" v-if="operationInformation.otherInformationObj.runTimeSecond">
              {{ operationInformation.otherInformationObj.runTimeSecondVal }}s
            </el-descriptions-item>
            <el-descriptions-item label="当日用电量" v-if="operationInformation.otherInformationObj.dailyElectricityConsumption">
              {{ operationInformation.otherInformationObj.dailyElectricityConsumptionVal }}kWh
            </el-descriptions-item>
            <el-descriptions-item label="累积用电量" v-if="operationInformation.otherInformationObj.accumulatedElectricityConsumption">
              {{ operationInformation.otherInformationObj.accumulatedElectricityConsumptionVal }}kWh
            </el-descriptions-item>
            <el-descriptions-item label="当日并网量" v-if="operationInformation.otherInformationObj.dailyGridConnectionVolume">
              {{ operationInformation.otherInformationObj.dailyGridConnectionVolumeVal }}kWh
            </el-descriptions-item>
            <el-descriptions-item label="累积并网量" v-if="operationInformation.otherInformationObj.accumulatedGridConnectionQuantity">
              {{ operationInformation.otherInformationObj.accumulatedGridConnectionQuantityVal }}kWh
            </el-descriptions-item>
            <el-descriptions-item label="当日购电量" v-if="operationInformation.otherInformationObj.dailyElectricityPurchase">
              {{ operationInformation.otherInformationObj.dailyElectricityPurchaseVal }}kWh
            </el-descriptions-item>
            <el-descriptions-item label="累积购电量" v-if="operationInformation.otherInformationObj.accumulatedPurchasingPower">
              {{ operationInformation.otherInformationObj.accumulatedPurchasingPowerVal }}kWh
            </el-descriptions-item>
            <el-descriptions-item label="当日充电量" v-if="operationInformation.otherInformationObj.dailyChargingCapacity">
              {{ operationInformation.otherInformationObj.dailyChargingCapacityVal }}kWh
            </el-descriptions-item>
            <el-descriptions-item label="累积充电量" v-if="operationInformation.otherInformationObj.accumulatedChargingCapacity">
              {{ operationInformation.otherInformationObj.accumulatedChargingCapacityVal }}kWh
            </el-descriptions-item>
            <el-descriptions-item label="当日放电量" v-if="operationInformation.otherInformationObj.dailyDischargeCapacity">
              {{ operationInformation.otherInformationObj.dailyDischargeCapacityVal }}kWh
            </el-descriptions-item>
            <el-descriptions-item label="累积放电量" v-if="operationInformation.otherInformationObj.accumulatedDischargeCapacity">
              {{ operationInformation.otherInformationObj.accumulatedDischargeCapacityVal }}kWh
            </el-descriptions-item>
            <el-descriptions-item label="漏电流" v-if="operationInformation.otherInformationObj.leakageCurrent">
              {{ operationInformation.otherInformationObj.leakageCurrentVal }}mA
            </el-descriptions-item>
            <el-descriptions-item label="中间母线电压" v-if="operationInformation.otherInformationObj.intermediateBusbarVoltage">
              {{ operationInformation.otherInformationObj.intermediateBusbarVoltageVal }}V
            </el-descriptions-item>
            <el-descriptions-item label="BuckBoost电流" v-if="operationInformation.otherInformationObj.buckBoostCurrent">
              {{ operationInformation.otherInformationObj.buckBoostCurrentVal }}A
            </el-descriptions-item>
            <el-descriptions-item label="PVIso电压" v-if="operationInformation.otherInformationObj.pvIsoVoltage">
              {{ operationInformation.otherInformationObj.pvIsoVoltageVal }}V
            </el-descriptions-item>
            <el-descriptions-item label="零地电压" v-if="operationInformation.otherInformationObj.zeroGroundVoltage">
              {{ operationInformation.otherInformationObj.zeroGroundVoltageVal }}V
            </el-descriptions-item>
            <el-descriptions-item label="逆变电流直流分量" v-if="operationInformation.otherInformationObj.dcComponentOfInverterCurrent">
              {{ operationInformation.otherInformationObj.dcComponentOfInverterCurrentVal }}mA
            </el-descriptions-item>
            <el-descriptions-item label="负载电压直流分量" v-if="operationInformation.otherInformationObj.dcComponentOfLoadVoltage">
              {{ operationInformation.otherInformationObj.dcComponentOfLoadVoltageVal }}mA
            </el-descriptions-item>
            <el-descriptions-item label="继电器中间电压" v-if="operationInformation.otherInformationObj.relayIntermediateVoltage">
              {{ operationInformation.otherInformationObj.relayIntermediateVoltageVal }}V
            </el-descriptions-item>
            <el-descriptions-item label="历史记录条数" v-if="operationInformation.otherInformationObj.numberOfHistoryRecords">
              {{ operationInformation.otherInformationObj.numberOfHistoryRecordsVal }}
            </el-descriptions-item>
            <el-descriptions-item label="电池充/放电加热使能状态" v-if="operationInformation.otherInformationObj.batteryChargingAndDischargingHeatingEnableState">
              {{ operationInformation.otherInformationObj.batteryChargingAndDischargingHeatingEnableStateVal | batteryChargingAndDischargingHeatingEnableStateValFilter }}
            </el-descriptions-item>
            <el-descriptions-item label="电池出厂编码" v-if="operationInformation.otherInformationObj.batteryFactoryCode">
              {{ operationInformation.otherInformationObj.batteryFactoryCodeVal }}
            </el-descriptions-item>
            <el-descriptions-item label="电池产品编号" v-if="operationInformation.otherInformationObj.batteryProductNumber">
              {{ operationInformation.otherInformationObj.batteryProductNumberVal }}
            </el-descriptions-item>
            <el-descriptions-item label="电池出厂日期" v-if="operationInformation.otherInformationObj.batteryFactoryDate">
              {{ operationInformation.otherInformationObj.batteryFactoryDateVal }}
            </el-descriptions-item>
            <el-descriptions-item label="最大允许充电电流" v-if="operationInformation.otherInformationObj.maximumAllowableChargingCurrent">
              {{ operationInformation.otherInformationObj.maximumAllowableChargingCurrentVal }}mA
            </el-descriptions-item>
            <el-descriptions-item label="厂家信息" v-if="operationInformation.otherInformationObj.manufacturerInformation">
              {{ operationInformation.otherInformationObj.manufacturerInformationVal }}
            </el-descriptions-item>
            <el-descriptions-item label="逆变器序列号" v-if="operationInformation.otherInformationObj.inverterSerialNumber">
              {{ operationInformation.otherInformationObj.inverterSerialNumberVal }}
            </el-descriptions-item>
            <el-descriptions-item label="最大允许放电电流" v-if="operationInformation.otherInformationObj.maximumAllowableDischargeCurrent">
              {{ operationInformation.otherInformationObj.maximumAllowableDischargeCurrentVal }}mA
            </el-descriptions-item>
            <el-descriptions-item label="逆变器允许电池最大充电电流" v-if="operationInformation.otherInformationObj.maximumChargingCurrentAllowedByTheInverterForTheBattery">
              {{ operationInformation.otherInformationObj.maximumChargingCurrentAllowedByTheInverterForTheBatteryVal }}A
            </el-descriptions-item>
            <el-descriptions-item label="逆变器允许电池最大放电电流" v-if="operationInformation.otherInformationObj.maximumDischargeCurrentAllowedByTheInverterForTheBattery">
              {{ operationInformation.otherInformationObj.maximumDischargeCurrentAllowedByTheInverterForTheBatteryVal }}A
            </el-descriptions-item>
          </el-descriptions>
        </el-card>

      </template>

      <template v-else-if="activeIndex === '8'">
        <el-card style="margin-top: 10px;" v-if="systemSet.commonSet">
          <el-descriptions title="常用设置" :column="3" border>
            <el-descriptions-item label="设置系统时间(年，月)" v-if="systemSet.commonSetObj.systemTime">
              <div style="display: flex;">
                <el-input v-model="systemSet.commonSetObj.systemTimeVal" placeholder="请输入" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('systemTime', systemSet.commonSetObj.systemTimeVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="通讯协议类型" v-if="systemSet.commonSetObj.communicationProtocolType">
              <div style="display: flex;">
                <el-select v-model="systemSet.commonSetObj.communicationProtocolTypeVal" placeholder="请选择" style="width: 100%;">
                  <el-option label="用户" value="0" />
                  <el-option label="工程师" value="1" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('communicationProtocolType', systemSet.commonSetObj.communicationProtocolTypeVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="日发电量校准" v-if="systemSet.commonSetObj.dailyPowerGenerationCalibration">
              <div style="display: flex;">
                <el-input v-model="systemSet.commonSetObj.dailyPowerGenerationCalibrationVal" placeholder="请输入" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('dailyPowerGenerationCalibration', systemSet.commonSetObj.dailyPowerGenerationCalibrationVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="总发电量校准" v-if="systemSet.commonSetObj.totalPowerGenerationCalibration">
              <div style="display: flex;">
                <el-input v-model="systemSet.commonSetObj.totalPowerGenerationCalibrationVal" placeholder="请输入" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('totalPowerGenerationCalibration', systemSet.commonSetObj.totalPowerGenerationCalibrationVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="清空用电量数据" v-if="systemSet.commonSetObj.clearElectricityConsumptionData">
              <div style="display: flex;">
                <el-select v-model="systemSet.commonSetObj.clearElectricityConsumptionDataVal" placeholder="请选择" style="width: 100%;">
                  <el-option label="0" value="0" />
                  <el-option label="确定" value="65535" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('clearElectricityConsumptionData', systemSet.commonSetObj.clearElectricityConsumptionDataVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="清空发电量数据" v-if="systemSet.commonSetObj.clearPowerGenerationData">
              <div style="display: flex;">
                <el-select v-model="systemSet.commonSetObj.clearPowerGenerationDataVal" placeholder="请选择" style="width: 100%;">
                  <el-option label="0" value="0" />
                  <el-option label="确定" value="65535" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('clearPowerGenerationData', systemSet.commonSetObj.clearPowerGenerationDataVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="开机命令" v-if="systemSet.commonSetObj.bootCommand">
              <div style="display: flex;">
                <el-select v-model="systemSet.commonSetObj.bootCommandVal" placeholder="请选择" style="width: 100%;">
                  <el-option label="0" value="0" />
                  <el-option label="确定" value="65535" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('bootCommand', systemSet.commonSetObj.bootCommandVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="关机命令" v-if="systemSet.commonSetObj.shutdownCommand">
              <div style="display: flex;">
                <el-select v-model="systemSet.commonSetObj.shutdownCommandVal" placeholder="请选择" style="width: 100%;">
                  <el-option label="0" value="0" />
                  <el-option label="确定" value="65535" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('shutdownCommand', systemSet.commonSetObj.shutdownCommandVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="取消关机命令" v-if="systemSet.commonSetObj.cancelShutdownCommand">
              <div style="display: flex;">
                <el-select v-model="systemSet.commonSetObj.cancelShutdownCommandVal" placeholder="请选择" style="width: 100%;">
                  <el-option label="0" value="0" />
                  <el-option label="确定" value="65535" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('cancelShutdownCommand', systemSet.commonSetObj.cancelShutdownCommandVal)">保存</el-button>
              </div>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>

        <el-card  style="margin-top: 10px;" v-if="systemSet.communicationSet">
          <el-descriptions title="通讯设置" :column="3" border>
            <el-descriptions-item label="BMS型号" v-if="systemSet.communicationSetObj.bmsModel">
              <div style="display: flex;">
                <el-select v-model="systemSet.communicationSetObj.bmsModelVal" placeholder="请选择" style="width: 100%;">
                  <el-option label="None" value="0" />
                  <el-option label="Pylontech" value="1" />
                  <el-option label="XT" value="2" />
                  <el-option label="Stealth" value="3" />
                  <el-option label="Pace" value="4" />
                  <el-option label="LeSY" value="5" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('bmsModel', systemSet.communicationSetObj.bmsModelVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="BMS地址" v-if="systemSet.communicationSetObj.bmsAddress">
              <div style="display: flex;">
                <el-input v-model="systemSet.communicationSetObj.bmsAddressVal" placeholder="请输入" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('bmsAddress', systemSet.communicationSetObj.bmsAddressVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="BMS波特率" v-if="systemSet.communicationSetObj.bmsBaud">
              <div style="display: flex;">
                <el-select v-model="systemSet.communicationSetObj.bmsBaudVal" placeholder="请选择"  style="width: 100%;">
                  <el-option label="1200" value="1" />
                  <el-option label="2400" value="2" />
                  <el-option label="4800" value="3" />
                  <el-option label="9600" value="4" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('bmsBaud', systemSet.communicationSetObj.bmsBaudVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="锂电池块数" v-if="systemSet.communicationSetObj.numberOfLithiumBatteryBlocks">
              <div style="display: flex;">
                <el-input v-model="systemSet.communicationSetObj.numberOfLithiumBatteryBlocksVal" placeholder="请输入" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('numberOfLithiumBatteryBlocks', systemSet.communicationSetObj.numberOfLithiumBatteryBlocksVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="采集器通讯地址" v-if="systemSet.communicationSetObj.collectorCommunicationAddress">
              <div style="display: flex;">
                <el-input v-model="systemSet.communicationSetObj.collectorCommunicationAddressVal" placeholder="请输入" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('collectorCommunicationAddress', systemSet.communicationSetObj.collectorCommunicationAddressVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="采集器通讯协议类型" v-if="systemSet.communicationSetObj.collectorCommunicationProtocolType">
              <div style="display: flex;">
                <el-select v-model="systemSet.communicationSetObj.collectorCommunicationProtocolTypeVal" placeholder="请选择"  style="width: 100%;">
                  <el-option label="用户" value="0" />
                  <el-option label="工程师" value="1" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('collectorCommunicationProtocolType', systemSet.communicationSetObj.collectorCommunicationProtocolTypeVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="采集器通讯波特率" v-if="systemSet.communicationSetObj.baudOfCollectorCommunication">
              <div style="display: flex;">
                <el-select v-model="systemSet.communicationSetObj.baudOfCollectorCommunicationVal" placeholder="请选择"  style="width: 100%;">
                  <el-option label="1200" value="1" />
                  <el-option label="2400" value="2" />
                  <el-option label="4800" value="3" />
                  <el-option label="9600" value="4" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('baudOfCollectorCommunication', systemSet.communicationSetObj.baudOfCollectorCommunicationVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="设备通讯地址" v-if="systemSet.communicationSetObj.deviceCommunicationAddress">
              <div style="display: flex;">
                <el-input v-model="systemSet.communicationSetObj.deviceCommunicationAddressVal" placeholder="请输入" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('deviceCommunicationAddress', systemSet.communicationSetObj.deviceCommunicationAddressVal)">保存</el-button>
              </div>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>

        <el-card  style="margin-top: 10px;" v-if="systemSet.advancedSet">
          <el-descriptions title="高级设置" :column="3" border>
            <el-descriptions-item label="并离网模式" v-if="systemSet.advancedSetObj.parallelOffGridMode">
              <div style="display: flex;">
                <el-select v-model="systemSet.advancedSetObj.parallelOffGridModeVal" placeholder="请选择"  style="width: 100%;">
                  <el-option label="并网模式" value="0" />
                  <el-option label="防逆流模式" value="1" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('parallelOffGridMode', systemSet.advancedSetObj.parallelOffGridModeVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="系统模式设置" v-if="systemSet.advancedSetObj.systemModeSet">
              <div style="display: flex;">
                <el-select v-model="systemSet.advancedSetObj.systemModeSetVal" placeholder="请选择"  style="width: 100%;">
                  <el-option label="UPS" value="0" />
                  <el-option label="EPS" value="1" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('systemModeSet', systemSet.advancedSetObj.systemModeSetVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="PV连接设置" v-if="systemSet.advancedSetObj.pvConnectionSet">
              <div style="display: flex;">
                <el-select v-model="systemSet.advancedSetObj.pvConnectionSetVal" placeholder="请选择"  style="width: 100%;">
                  <el-option label="独立" value="0" />
                  <el-option label="并联" value="1" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('pvConnectionSet', systemSet.advancedSetObj.pvConnectionSetVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="额定输出电压设置" v-if="systemSet.advancedSetObj.ratedOutputVoltageSet">
              <div style="display: flex;">
                <el-input v-model="systemSet.advancedSetObj.ratedOutputVoltageSetVal" placeholder="请输入">
                  <template slot="append">V</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('ratedOutputVoltageSet', systemSet.advancedSetObj.ratedOutputVoltageSetVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="额定输出频率设置" v-if="systemSet.advancedSetObj.ratedOutputFrequencySet">
              <div style="display: flex;">
                <el-input v-model="systemSet.advancedSetObj.ratedOutputFrequencySetVal" placeholder="请输入">
                  <template slot="append">Hz</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('ratedOutputFrequencySet', systemSet.advancedSetObj.ratedOutputFrequencySetVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="电池类型设置" v-if="systemSet.advancedSetObj.batteryTypeSet">
              <div style="display: flex;">
                <el-select v-model="systemSet.advancedSetObj.batteryTypeSetVal" placeholder="请选择" style="width: 100%;">
                  <el-option label="铅酸" value="0" />
                  <el-option label="锂电" value="1" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('batteryTypeSet', systemSet.advancedSetObj.batteryTypeSetVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="电池充电电流" v-if="systemSet.advancedSetObj.batteryChargingCurrent">
              <div style="display: flex;">
                <el-input v-model="systemSet.advancedSetObj.batteryChargingCurrentVal" placeholder="请输入">
                  <template slot="append">A</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('batteryChargingCurrent', systemSet.advancedSetObj.batteryChargingCurrentVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="电池放电电流" v-if="systemSet.advancedSetObj.batteryDischargeCurrent">
              <div style="display: flex;">
                <el-input v-model="systemSet.advancedSetObj.batteryDischargeCurrentVal" placeholder="请输入">
                  <template slot="append">A</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('batteryDischargeCurrent', systemSet.advancedSetObj.batteryDischargeCurrentVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="电池均充电压" v-if="systemSet.advancedSetObj.batteryAverageChargingVoltage">
              <div style="display: flex;">
                <el-input v-model="systemSet.advancedSetObj.batteryAverageChargingVoltageVal" placeholder="请输入">
                  <template slot="append">V</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('batteryAverageChargingVoltage', systemSet.advancedSetObj.batteryAverageChargingVoltageVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="电池浮充电压" v-if="systemSet.advancedSetObj.batteryFloatChargingVoltage">
              <div style="display: flex;">
                <el-input v-model="systemSet.advancedSetObj.batteryFloatChargingVoltageVal" placeholder="请输入">
                  <template slot="append">V</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('batteryFloatChargingVoltage', systemSet.advancedSetObj.batteryFloatChargingVoltageVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="电池EOD" v-if="systemSet.advancedSetObj.batteryEod">
              <div style="display: flex;">
                <el-input v-model="systemSet.advancedSetObj.batteryEodVal" placeholder="请输入">
                  <template slot="append">V</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('batteryEod', systemSet.advancedSetObj.batteryEodVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="电池DOD" v-if="systemSet.advancedSetObj.batteryDod">
              <div style="display: flex;">
                <el-input v-model="systemSet.advancedSetObj.batteryDodVal" placeholder="请输入">
                  <template slot="append">V</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('batteryDod', systemSet.advancedSetObj.batteryDodVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="并网SOC下限" v-if="systemSet.advancedSetObj.lowerLimitOfGridConnectedSoc">
              <div style="display: flex;">
                <el-input v-model="systemSet.advancedSetObj.lowerLimitOfGridConnectedSocVal" placeholder="请输入">
                  <template slot="append">%</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('lowerLimitOfGridConnectedSoc', systemSet.advancedSetObj.lowerLimitOfGridConnectedSocVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="离网SOC下限" v-if="systemSet.advancedSetObj.offGridSocLowerLimit">
              <div style="display: flex;">
                <el-input v-model="systemSet.advancedSetObj.offGridSocLowerLimitVal" placeholder="请输入">
                  <template slot="append">%</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('offGridSocLowerLimit', systemSet.advancedSetObj.offGridSocLowerLimitVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="电表-CT" v-if="systemSet.advancedSetObj.electricityMeterCt">
              <div style="display: flex;">
                <el-select v-model="systemSet.advancedSetObj.electricityMeterCtVal" placeholder="请选择" style="width: 100%;">
                  <el-option label="NULL" value="0" />
                  <el-option label="电表" value="1" />
                  <el-option label="CT" value="2" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('electricityMeterCt', systemSet.advancedSetObj.electricityMeterCtVal)">保存</el-button>
              </div>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>

        <!-- <el-card  style="margin-top: 10px;" v-if="systemSet.gridOvervoltageSet">
          <el-descriptions title="电网过压设置" :column="3" border>
            <el-descriptions-item label="电网一段过压自检阀值" v-if="systemSet.gridOvervoltageSetObj.selfInspectionThresholdForOvervoltageInTheFirstSectionOfThePowerGrid">
              <div style="display: flex;">
                <el-input v-model="systemSet.gridOvervoltageSetObj.selfInspectionThresholdForOvervoltageInTheFirstSectionOfThePowerGridVal" placeholder="请输入" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('selfInspectionThresholdForOvervoltageInTheFirstSectionOfThePowerGrid', systemSet.otherSetObj.selfInspectionThresholdForOvervoltageInTheFirstSectionOfThePowerGridVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="电网一段过压自检时间" v-if="systemSet.gridOvervoltageSetObj.powerGridOvervoltageSelfCheckTime">
              <div style="display: flex;">
                <el-input v-model="systemSet.gridOvervoltageSetObj.powerGridOvervoltageSelfCheckTimeVal" placeholder="请输入" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('powerGridOvervoltageSelfCheckTime', systemSet.otherSetObj.powerGridOvervoltageSelfCheckTimeVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="电网二段过压自检阀值" v-if="systemSet.gridOvervoltageSetObj.thresholdForOvervoltageSelfCheckInSection2OfThePowerGrid">
              <div style="display: flex;">
                <el-input v-model="systemSet.gridOvervoltageSetObj.thresholdForOvervoltageSelfCheckInSection2OfThePowerGridVal" placeholder="请输入" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('thresholdForOvervoltageSelfCheckInSection2OfThePowerGrid', systemSet.otherSetObj.thresholdForOvervoltageSelfCheckInSection2OfThePowerGridVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="电网二段过压自检时间" v-if="systemSet.gridOvervoltageSetObj.powerGridSection2OvervoltageSelfCheckTime">
              <div style="display: flex;">
                <el-input v-model="systemSet.gridOvervoltageSetObj.powerGridSection2OvervoltageSelfCheckTimeVal" placeholder="请输入" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('powerGridSection2OvervoltageSelfCheckTime', systemSet.otherSetObj.powerGridSection2OvervoltageSelfCheckTimeVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="电网一段欠压自检阀值" v-if="systemSet.gridOvervoltageSetObj.underVoltageSelfCheckThresholdOfTheFirstSectionOfThePowerGrid">
              <div style="display: flex;">
                <el-input v-model="systemSet.gridOvervoltageSetObj.underVoltageSelfCheckThresholdOfTheFirstSectionOfThePowerGridVal" placeholder="请输入" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('underVoltageSelfCheckThresholdOfTheFirstSectionOfThePowerGrid', systemSet.otherSetObj.underVoltageSelfCheckThresholdOfTheFirstSectionOfThePowerGridVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="电网一段欠压自检时间" v-if="systemSet.gridOvervoltageSetObj.powerGridUndervoltageSelfCheckTime">
              <div style="display: flex;">
                <el-input v-model="systemSet.gridOvervoltageSetObj.powerGridUndervoltageSelfCheckTimeVal" placeholder="请输入" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('powerGridUndervoltageSelfCheckTime', systemSet.otherSetObj.powerGridUndervoltageSelfCheckTimeVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="电网二段欠压自检阀值" v-if="systemSet.gridOvervoltageSetObj.underVoltageSelfCheckThresholdOfTheSecondSectionOfThePowerGrid">
              <div style="display: flex;">
                <el-input v-model="systemSet.gridOvervoltageSetObj.underVoltageSelfCheckThresholdOfTheSecondSectionOfThePowerGridVal" placeholder="请输入" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('underVoltageSelfCheckThresholdOfTheSecondSectionOfThePowerGrid', systemSet.otherSetObj.underVoltageSelfCheckThresholdOfTheSecondSectionOfThePowerGridVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="电网二段欠压自检时间" v-if="systemSet.gridOvervoltageSetObj.underVoltageSelfCheckTimeOfTheSecondSectionOfThePowerGrid">
              <div style="display: flex;">
                <el-input v-model="systemSet.gridOvervoltageSetObj.underVoltageSelfCheckTimeOfTheSecondSectionOfThePowerGridVal" placeholder="请输入" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('underVoltageSelfCheckTimeOfTheSecondSectionOfThePowerGrid', systemSet.otherSetObj.underVoltageSelfCheckTimeOfTheSecondSectionOfThePowerGridVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="电网一段过频自检阀值" v-if="systemSet.gridOvervoltageSetObj.thresholdForSelfCheckOfOverFrequencyInTheFirstSectionOfThePowerGrid">
              <div style="display: flex;">
                <el-input v-model="systemSet.gridOvervoltageSetObj.thresholdForSelfCheckOfOverFrequencyInTheFirstSectionOfThePowerGridVal" placeholder="请输入" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('thresholdForSelfCheckOfOverFrequencyInTheFirstSectionOfThePowerGrid', systemSet.otherSetObj.thresholdForSelfCheckOfOverFrequencyInTheFirstSectionOfThePowerGridVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="电网一段过频自检时间" v-if="systemSet.gridOvervoltageSetObj.selfInspectionTimeForPeriodOfOverfrequencyInThePowerGrid">
              <div style="display: flex;">
                <el-input v-model="systemSet.gridOvervoltageSetObj.selfInspectionTimeForPeriodOfOverfrequencyInThePowerGridVal" placeholder="请输入" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('selfInspectionTimeForPeriodOfOverfrequencyInThePowerGrid', systemSet.otherSetObj.selfInspectionTimeForPeriodOfOverfrequencyInThePowerGridVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="电网二段过频自检阀值" v-if="systemSet.gridOvervoltageSetObj.gridSection2OverfrequencySelfTestThreshold">
              <div style="display: flex;">
                <el-input v-model="systemSet.gridOvervoltageSetObj.gridSection2OverfrequencySelfTestThresholdVal" placeholder="请输入" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('gridSection2OverfrequencySelfTestThreshold', systemSet.otherSetObj.gridSection2OverfrequencySelfTestThresholdVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="电网二段过频自检时间" v-if="systemSet.gridOvervoltageSetObj.powerGridSection2OverFrequencySelfCheckTime">
              <div style="display: flex;">
                <el-input v-model="systemSet.gridOvervoltageSetObj.powerGridSection2OverFrequencySelfCheckTimeVal" placeholder="请输入" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('powerGridSection2OverFrequencySelfCheckTime', systemSet.otherSetObj.powerGridSection2OverFrequencySelfCheckTimeVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="电网一段欠频自检阀值" v-if="systemSet.gridOvervoltageSetObj.underFrequencySelfCheckThresholdForTheFirstSectionOfThePowerGrid">
              <div style="display: flex;">
                <el-input v-model="systemSet.gridOvervoltageSetObj.underFrequencySelfCheckThresholdForTheFirstSectionOfThePowerGridVal" placeholder="请输入" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('underFrequencySelfCheckThresholdForTheFirstSectionOfThePowerGrid', systemSet.otherSetObj.underFrequencySelfCheckThresholdForTheFirstSectionOfThePowerGridVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="电网一段欠频自检时间" v-if="systemSet.gridOvervoltageSetObj.powerGridUnderfrequencySelfCheckTime">
              <div style="display: flex;">
                <el-input v-model="systemSet.gridOvervoltageSetObj.powerGridUnderfrequencySelfCheckTimeVal" placeholder="请输入" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('powerGridUnderfrequencySelfCheckTime', systemSet.otherSetObj.powerGridUnderfrequencySelfCheckTimeVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="电网二段欠频自检阀值" v-if="systemSet.gridOvervoltageSetObj.underFrequencySelfCheckThresholdOfTheSecondSectionOfThePowerGrid">
              <div style="display: flex;">
                <el-input v-model="systemSet.gridOvervoltageSetObj.underFrequencySelfCheckThresholdOfTheSecondSectionOfThePowerGridVal" placeholder="请输入" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('underFrequencySelfCheckThresholdOfTheSecondSectionOfThePowerGrid', systemSet.otherSetObj.underFrequencySelfCheckThresholdOfTheSecondSectionOfThePowerGridVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="电网二段欠频自检时间" v-if="systemSet.gridOvervoltageSetObj.underFrequencySelfCheckTimeOfTheSecondSectionOfThePowerGrid">
              <div style="display: flex;">
                <el-input v-model="systemSet.gridOvervoltageSetObj.underFrequencySelfCheckTimeOfTheSecondSectionOfThePowerGridVal" placeholder="请输入" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('underFrequencySelfCheckTimeOfTheSecondSectionOfThePowerGrid', systemSet.otherSetObj.underFrequencySelfCheckTimeOfTheSecondSectionOfThePowerGridVal)">保存</el-button>
              </div>
            </el-descriptions-item>
          </el-descriptions>
        </el-card> -->

        <el-card  style="margin-top: 10px;" v-if="systemSet.otherSet">
          <el-descriptions title="其他设置" :column="3" border>
            <el-descriptions-item label="复位设备通讯设置至初始值" v-if="systemSet.otherSetObj.resetDeviceCommunicationSettingsToInitialValues">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.resetDeviceCommunicationSettingsToInitialValuesVal" placeholder="请输入" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('resetDeviceCommunicationSettingsToInitialValues', systemSet.otherSetObj.resetDeviceCommunicationSettingsToInitialValuesVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="清空记录数据" v-if="systemSet.otherSetObj.clearRecordData">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.clearRecordDataVal" placeholder="请输入" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('clearRecordData', systemSet.otherSetObj.clearRecordDataVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="恢复出厂设置" v-if="systemSet.otherSetObj.factoryReset">
              <div style="display: flex;">
                <el-select v-model="systemSet.otherSetObj.factoryResetVal" placeholder="请选择" style="width: 100%;">
                  <el-option label="取消" value="0" />
                  <el-option label="确认" value="1" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('factoryReset', systemSet.otherSetObj.factoryResetVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="逆变器重启" v-if="systemSet.otherSetObj.inverterRestart">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.inverterRestartVal" placeholder="请输入" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('inverterRestart', systemSet.otherSetObj.inverterRestartVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="自检使能" v-if="systemSet.otherSetObj.selfCheckEnable">
              <div style="display: flex;">
                <el-select v-model="systemSet.otherSetObj.selfCheckEnableVal" placeholder="请选择" style="width: 100%;">
                  <el-option label="空闲" value="0" />
                  <el-option label="一段过压(59.S1)" value="1" />
                  <el-option label="二段过压(59.S2)" value="2" />
                  <el-option label="一段欠压(27.S1)" value="3" />
                  <el-option label="二段欠压(27.S2)" value="4" />
                  <el-option label="一段过频(81>.S1)" value="5" />
                  <el-option label="二段过频(81>.S2)" value="6" />
                  <el-option label="一段欠频(81<.S1)" value="7" />
                  <el-option label="二段欠频(81<.S2)" value="8" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('selfCheckEnable', systemSet.otherSetObj.selfCheckEnableVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="手动清除故障" v-if="systemSet.otherSetObj.manuallyClearingFaults">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.manuallyClearingFaultsVal" placeholder="请输入" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('manuallyClearingFaults', systemSet.otherSetObj.manuallyClearingFaultsVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="自动运行" v-if="systemSet.otherSetObj.automaticOperation">
              <div style="display: flex;">
                <el-select v-model="systemSet.otherSetObj.automaticOperationVal" placeholder="请选择" style="width: 100%;">
                  <el-option label="手动" value="0" />
                  <el-option label="自动" value="1" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('automaticOperation', systemSet.otherSetObj.automaticOperationVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="手动解锁系统锁" v-if="systemSet.otherSetObj.manuallyUnlockingTheSystemLock">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.manuallyUnlockingTheSystemLockVal" placeholder="请输入" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('manuallyUnlockingTheSystemLock', systemSet.otherSetObj.manuallyUnlockingTheSystemLockVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="设备通讯波特率" v-if="systemSet.otherSetObj.deviceCommunicationBaud">
              <div style="display: flex;">
                <el-select v-model="systemSet.otherSetObj.deviceCommunicationBaudVal" placeholder="请选择" style="width: 100%;">
                  <el-option label="1200" value="1" />
                  <el-option label="2400" value="2" />
                  <el-option label="4800" value="3" />
                  <el-option label="9600" value="4" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('deviceCommunicationBaud', systemSet.otherSetObj.deviceCommunicationBaudVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="设备通讯校验位选择" v-if="systemSet.otherSetObj.deviceCommunicationCheckBitSelection">
              <div style="display: flex;">
                <el-select v-model="systemSet.otherSetObj.deviceCommunicationCheckBitSelectionVal" placeholder="请选择" style="width: 100%;">
                  <el-option label="无校验位" value="0" />
                  <el-option label="偶校验" value="1" />
                  <el-option label="奇校验" value="2" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('deviceCommunicationCheckBitSelection', systemSet.otherSetObj.deviceCommunicationCheckBitSelectionVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="设备通讯停止位选择" v-if="systemSet.otherSetObj.deviceCommunicationStopBitSelection">
              <div style="display: flex;">
                <el-select v-model="systemSet.otherSetObj.deviceCommunicationStopBitSelectionVal" placeholder="请选择" style="width: 100%;">
                  <el-option label="1位停止位" value="0" />
                  <el-option label="2位停止位" value="1" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('deviceCommunicationStopBitSelection', systemSet.otherSetObj.deviceCommunicationStopBitSelectionVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="倒计时关闭逆变器" v-if="systemSet.otherSetObj.countdownToTurnOffTheInverter">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.countdownToTurnOffTheInverterVal" placeholder="请输入" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('countdownToTurnOffTheInverter', systemSet.otherSetObj.countdownToTurnOffTheInverterVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="延时启动逆变器" v-if="systemSet.otherSetObj.delayedStartInverter">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.delayedStartInverterVal" placeholder="请输入" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('delayedStartInverter', systemSet.otherSetObj.delayedStartInverterVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="国家码" v-if="systemSet.otherSetObj.countryCode">
              <div style="display: flex;">
                <el-select v-model="systemSet.otherSetObj.countryCodeVal" placeholder="请选择" style="width: 100%;">
                  <el-option label="中国" value="0" />
                  <el-option label="意大利" value="1" />
                  <el-option label="德国" value="2" />
                  <el-option label="澳大利亚" value="3" />
                  <el-option label="比利时" value="4" />
                  <el-option label="南非" value="5" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('countryCode', systemSet.otherSetObj.countryCodeVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="系统时间设置" v-if="systemSet.otherSetObj.systemTimeSetting">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.systemTimeSettingVal" placeholder="请输入" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('systemTimeSetting', systemSet.otherSetObj.systemTimeSettingVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="逆变有功设定" v-if="systemSet.otherSetObj.inverterActivePowerSetting">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.inverterActivePowerSettingVal" placeholder="请输入">
                  <template slot="append">%</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('inverterActivePowerSetting', systemSet.otherSetObj.inverterActivePowerSettingVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="485通讯协议类型" v-if="systemSet.otherSetObj.communicationProtocolType485">
              <div style="display: flex;">
                <el-select v-model="systemSet.otherSetObj.communicationProtocolType485Val" placeholder="请选择" style="width: 100%;">
                  <el-option label="用户" value="0" />
                  <el-option label="工程师" value="1" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('communicationProtocolType485', systemSet.otherSetObj.communicationProtocolType485Val)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="485通讯地址" v-if="systemSet.otherSetObj.communicationAddress485">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.communicationAddress485Val" placeholder="请输入" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('communicationAddress485', systemSet.otherSetObj.communicationAddress485Val)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="485通讯波特率" v-if="systemSet.otherSetObj.communicationBaud485">
              <div style="display: flex;">
                <el-select v-model="systemSet.otherSetObj.communicationBaud485Val" placeholder="请选择" style="width: 100%;">
                  <el-option label="1200" value="1" />
                  <el-option label="2400" value="2" />
                  <el-option label="4800" value="3" />
                  <el-option label="9600" value="4" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('communicationBaud485', systemSet.otherSetObj.communicationBaud485Val)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="硬限制使能" v-if="systemSet.otherSetObj.hardLimitEnable">
              <div style="display: flex;">
                <el-select v-model="systemSet.otherSetObj.hardLimitEnableVal" placeholder="请选择" style="width: 100%;">
                  <el-option label="使能" value="1" />
                  <el-option label="屏蔽" value="0" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('hardLimitEnable', systemSet.otherSetObj.hardLimitEnableVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="硬限制功率设定值" v-if="systemSet.otherSetObj.hardLimitPowerSettingValue">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.hardLimitPowerSettingValueVal" placeholder="请输入" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('hardLimitPowerSettingValue', systemSet.otherSetObj.hardLimitPowerSettingValueVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="澳洲地区选择" v-if="systemSet.otherSetObj.australianRegionSelection">
              <div style="display: flex;">
                <el-select v-model="systemSet.otherSetObj.australianRegionSelectionVal" placeholder="请选择" style="width: 100%;">
                  <el-option label="澳洲A区" value="0" />
                  <el-option label="澳洲B区" value="1" />
                  <el-option label="澳洲C区" value="2" />
                  <el-option label="新西兰" value="3" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('australianRegionSelection', systemSet.otherSetObj.australianRegionSelectionVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="蓝牙连接标志" v-if="systemSet.otherSetObj.bluetoothConnectionFlag">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.bluetoothConnectionFlagVal" placeholder="请输入" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('bluetoothConnectionFlag', systemSet.otherSetObj.bluetoothConnectionFlagVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="PV有功设定" v-if="systemSet.otherSetObj.pvActivePowerSetting">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.pvActivePowerSettingVal" placeholder="请输入">
                  <template slot="append">%</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('pvActivePowerSetting', systemSet.otherSetObj.pvActivePowerSettingVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="有功变化率限制" v-if="systemSet.otherSetObj.limitOfActivePowerChangeRate">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.limitOfActivePowerChangeRateVal" placeholder="请输入" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('limitOfActivePowerChangeRate', systemSet.otherSetObj.limitOfActivePowerChangeRateVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="孤岛检测使能" v-if="systemSet.otherSetObj.islandDetectionEnable">
              <div style="display: flex;">
                <el-select v-model="systemSet.otherSetObj.islandDetectionEnableVal" placeholder="请选择" style="width: 100%;">
                  <el-option label="不使能" value="0" />
                  <el-option label="使能" value="1" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('islandDetectionEnable', systemSet.otherSetObj.islandDetectionEnableVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="认证模式" v-if="systemSet.otherSetObj.authenticationMode">
              <div style="display: flex;">
                <el-select v-model="systemSet.otherSetObj.authenticationModeVal" placeholder="请选择" style="width: 100%;">
                  <el-option label="关闭" value="0" />
                  <el-option label="开启" value="1" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('authenticationMode', systemSet.otherSetObj.authenticationModeVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="当前系统运行模式控制源" v-if="systemSet.otherSetObj.currentSystemOperationModeControlSource">
              <div style="display: flex;">
                <el-select v-model="systemSet.otherSetObj.currentSystemOperationModeControlSourceVal" placeholder="请选择" style="width: 100%;">
                  <el-option label="MCU 下发控制" value="0" />
                  <el-option label="DSP 下发控制" value="1" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('currentSystemOperationModeControlSource', systemSet.otherSetObj.currentSystemOperationModeControlSourceVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="系统当前运行模式" v-if="systemSet.otherSetObj.currentOperatingModeOfTheSystem">
              <div style="display: flex;">
                <el-select v-model="systemSet.otherSetObj.currentOperatingModeOfTheSystemVal" placeholder="请选择" style="width: 100%;">
                  <el-option label="电池优先模式" value="0" />
                  <el-option label="家庭负载优先模式" value="1" />
                  <el-option label="电网优先模式" value="2" />
                  <el-option label="全功率馈网模式" value="3" />
                  <el-option label="应急后备模式" value="4" />
                  <el-option label="AC充电关应急后备模式" value="5" />
                  <el-option label="纯PV模式" value="6" />
                  <el-option label="强制离网模式" value="7" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('currentOperatingModeOfTheSystem', systemSet.otherSetObj.currentOperatingModeOfTheSystemVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="APP启动标志" v-if="systemSet.otherSetObj.appStartupFlag">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.appStartupFlagVal" placeholder="请输入" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('appStartupFlag', systemSet.otherSetObj.appStartupFlagVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="蜂鸣器响应时间" v-if="systemSet.otherSetObj.buzzerResponseTime">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.buzzerResponseTimeVal" placeholder="请输入">
                  <template slot="append">min</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('buzzerResponseTime', systemSet.otherSetObj.buzzerResponseTimeVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="交流类型" v-if="systemSet.otherSetObj.communicationType">
              <div style="display: flex;">
                <el-select v-model="systemSet.otherSetObj.communicationTypeVal" placeholder="请选择" style="width: 100%;">
                  <el-option label="电网" value="0" />
                  <el-option label="发电机" value="1" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('communicationType', systemSet.otherSetObj.communicationTypeVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="系统模式设置" v-if="systemSet.otherSetObj.systemModeSettings">
              <div style="display: flex;">
                <el-select v-model="systemSet.otherSetObj.systemModeSettingsVal" placeholder="请选择" style="width: 100%;">
                  <el-option label="UPS" value="0" />
                  <el-option label="EPS" value="1" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('systemModeSettings', systemSet.otherSetObj.systemModeSettingsVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="USB操作" v-if="systemSet.otherSetObj.usbOperation">
              <div style="display: flex;">
                <el-select v-model="systemSet.otherSetObj.usbOperationVal" placeholder="请选择" style="width: 100%;">
                  <el-option label="无" value="0" />
                  <el-option label="导出历史记录" value="1" />
                  <el-option label="导出配置参数" value="2" />
                  <el-option label="导入配置参数" value="3" />
                  <el-option label="主控升级" value="4" />
                  <el-option label="监控升级" value="5" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('usbOperation', systemSet.otherSetObj.usbOperationVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="功率因数" v-if="systemSet.otherSetObj.powerFactor">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.powerFactorVal" placeholder="请输入" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('powerFactor', systemSet.otherSetObj.powerFactorVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="防逆流功率百分比" v-if="systemSet.otherSetObj.antiBackflowPowerPercentage">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.antiBackflowPowerPercentageVal" placeholder="请输入">
                  <template slot="append">%</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('antiBackflowPowerPercentage', systemSet.otherSetObj.antiBackflowPowerPercentageVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="最大输出功率百分比" v-if="systemSet.otherSetObj.maximumOutputPowerPercentage">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.maximumOutputPowerPercentageVal" placeholder="请输入">
                  <template slot="append">%</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('maximumOutputPowerPercentage', systemSet.otherSetObj.maximumOutputPowerPercentageVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="功率设置调节速率" v-if="systemSet.otherSetObj.powerSettingAdjustmentRate">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.powerSettingAdjustmentRateVal" placeholder="请输入">
                  <template slot="append">%Wmax/s</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('powerSettingAdjustmentRate', systemSet.otherSetObj.powerSettingAdjustmentRateVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="并网功率软起速率" v-if="systemSet.otherSetObj.gridConnectedPowerSoftStartRate">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.gridConnectedPowerSoftStartRateVal" placeholder="请输入">
                  <template slot="append">%Wmax/Min</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('gridConnectedPowerSoftStartRate', systemSet.otherSetObj.gridConnectedPowerSoftStartRateVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="无功功率控制模式" v-if="systemSet.otherSetObj.reactivePowerControlMode">
              <div style="display: flex;">
                <el-select v-model="systemSet.otherSetObj.reactivePowerControlModeVal" placeholder="请选择" style="width: 100%;">
                  <el-option label="无功为零" value="0" />
                  <el-option label="Volt-Var模式" value="1" />
                  <el-option label="固定功因模式" value="2" />
                  <el-option label="固定无功模式" value="3" />
                  <el-option label="Cos(P)模式" value="4" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('reactivePowerControlMode', systemSet.otherSetObj.reactivePowerControlModeVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="无功功率调节速率" v-if="systemSet.otherSetObj.reactivePowerRegulationRate">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.reactivePowerRegulationRateVal" placeholder="请输入">
                  <template slot="append">%VAmax/s</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('reactivePowerRegulationRate', systemSet.otherSetObj.reactivePowerRegulationRateVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="电网电压保护上限值1" v-if="systemSet.otherSetObj.upperLimitValueOfGridVoltageProtection1">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.upperLimitValueOfGridVoltageProtection1Val" placeholder="请输入">
                  <template slot="append">V</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('upperLimitValueOfGridVoltageProtection1', systemSet.otherSetObj.upperLimitValueOfGridVoltageProtection1Val)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="电网电压保护上限值2" v-if="systemSet.otherSetObj.upperLimitValueOfGridVoltageProtection2">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.upperLimitValueOfGridVoltageProtection2Val" placeholder="请输入">
                  <template slot="append">V</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('upperLimitValueOfGridVoltageProtection2', systemSet.otherSetObj.upperLimitValueOfGridVoltageProtection2Val)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="电网电压保护上限值3" v-if="systemSet.otherSetObj.upperLimitValueOfGridVoltageProtection3">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.upperLimitValueOfGridVoltageProtection3Val" placeholder="请输入">
                  <template slot="append">V</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('upperLimitValueOfGridVoltageProtection3', systemSet.otherSetObj.upperLimitValueOfGridVoltageProtection3Val)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="电网电压保护下限值1" v-if="systemSet.otherSetObj.lowerLimitValueOfGridVoltageProtection1">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.lowerLimitValueOfGridVoltageProtection1Val" placeholder="请输入">
                  <template slot="append">V</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('lowerLimitValueOfGridVoltageProtection1', systemSet.otherSetObj.lowerLimitValueOfGridVoltageProtection1Val)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="电网电压保护下限值2" v-if="systemSet.otherSetObj.lowerLimitValueOfGridVoltageProtection2">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.lowerLimitValueOfGridVoltageProtection2Val" placeholder="请输入">
                  <template slot="append">V</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('lowerLimitValueOfGridVoltageProtection2', systemSet.otherSetObj.lowerLimitValueOfGridVoltageProtection2Val)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="电网电压保护下限值3" v-if="systemSet.otherSetObj.lowerLimitValueOfGridVoltageProtection3">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.lowerLimitValueOfGridVoltageProtection3Val" placeholder="请输入">
                  <template slot="append">V</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('lowerLimitValueOfGridVoltageProtection3', systemSet.otherSetObj.lowerLimitValueOfGridVoltageProtection3Val)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="电网电压重连上限值" v-if="systemSet.otherSetObj.upperLimitValueOfGridVoltageReconnection">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.upperLimitValueOfGridVoltageReconnectionVal" placeholder="请输入">
                  <template slot="append">V</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('upperLimitValueOfGridVoltageReconnection', systemSet.otherSetObj.upperLimitValueOfGridVoltageReconnectionVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="电网电压重连下限值" v-if="systemSet.otherSetObj.lowerLimitValueOfGridVoltageReconnection">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.lowerLimitValueOfGridVoltageReconnectionVal" placeholder="请输入">
                  <template slot="append">V</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('lowerLimitValueOfGridVoltageReconnection', systemSet.otherSetObj.lowerLimitValueOfGridVoltageReconnectionVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="电网电压保护上限时间1" v-if="systemSet.otherSetObj.upperLimitTimeOfGridVoltageProtection1">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.upperLimitTimeOfGridVoltageProtection1Val" placeholder="请输入">
                  <template slot="append">ms</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('upperLimitTimeOfGridVoltageProtection1', systemSet.otherSetObj.upperLimitTimeOfGridVoltageProtection1Val)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="电网电压保护上限时间2" v-if="systemSet.otherSetObj.upperLimitTimeOfGridVoltageProtection2">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.upperLimitTimeOfGridVoltageProtection2Val" placeholder="请输入">
                  <template slot="append">ms</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('upperLimitTimeOfGridVoltageProtection2', systemSet.otherSetObj.upperLimitTimeOfGridVoltageProtection2Val)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="电网电压保护上限时间3" v-if="systemSet.otherSetObj.upperLimitTimeOfGridVoltageProtection3">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.upperLimitTimeOfGridVoltageProtection3Val" placeholder="请输入">
                  <template slot="append">ms</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('upperLimitTimeOfGridVoltageProtection3', systemSet.otherSetObj.upperLimitTimeOfGridVoltageProtection3Val)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="电网电压保护下限时间1" v-if="systemSet.otherSetObj.lowerLimitTimeOfGridVoltageProtection1">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.lowerLimitTimeOfGridVoltageProtection1Val" placeholder="请输入">
                  <template slot="append">ms</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('lowerLimitTimeOfGridVoltageProtection1', systemSet.otherSetObj.lowerLimitTimeOfGridVoltageProtection1Val)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="电网电压保护下限时间2" v-if="systemSet.otherSetObj.lowerLimitTimeOfGridVoltageProtection2">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.lowerLimitTimeOfGridVoltageProtection2Val" placeholder="请输入">
                  <template slot="append">ms</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('lowerLimitTimeOfGridVoltageProtection2', systemSet.otherSetObj.lowerLimitTimeOfGridVoltageProtection2Val)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="电网电压保护下限时间3" v-if="systemSet.otherSetObj.lowerLimitTimeOfGridVoltageProtection3">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.lowerLimitTimeOfGridVoltageProtection3Val" placeholder="请输入">
                  <template slot="append">ms</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('lowerLimitTimeOfGridVoltageProtection3', systemSet.otherSetObj.lowerLimitTimeOfGridVoltageProtection3Val)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="电网电压保护恢复时间" v-if="systemSet.otherSetObj.recoveryTimeOfGridVoltageProtection">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.recoveryTimeOfGridVoltageProtectionVal" placeholder="请输入">
                  <template slot="append">ms</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('recoveryTimeOfGridVoltageProtection', systemSet.otherSetObj.recoveryTimeOfGridVoltageProtectionVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="电网频率保护上限值1" v-if="systemSet.otherSetObj.upperLimitValueOfGridFrequencyProtection1">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.upperLimitValueOfGridFrequencyProtection1Val" placeholder="请输入">
                  <template slot="append">Hz</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('upperLimitValueOfGridFrequencyProtection1', systemSet.otherSetObj.upperLimitValueOfGridFrequencyProtection1Val)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="电网频率保护上限值2" v-if="systemSet.otherSetObj.upperLimitValueOfGridFrequencyProtection2">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.upperLimitValueOfGridFrequencyProtection2Val" placeholder="请输入">
                  <template slot="append">Hz</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('upperLimitValueOfGridFrequencyProtection2', systemSet.otherSetObj.upperLimitValueOfGridFrequencyProtection2Val)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="电网频率保护上限值3" v-if="systemSet.otherSetObj.upperLimitValueOfGridFrequencyProtection3">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.upperLimitValueOfGridFrequencyProtection3Val" placeholder="请输入">
                  <template slot="append">Hz</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('upperLimitValueOfGridFrequencyProtection3', systemSet.otherSetObj.upperLimitValueOfGridFrequencyProtection3Val)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="电网频率保护下限值1" v-if="systemSet.otherSetObj.lowerLimitValueOfGridFrequencyProtection1">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.lowerLimitValueOfGridFrequencyProtection1Val" placeholder="请输入">
                  <template slot="append">Hz</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('lowerLimitValueOfGridFrequencyProtection1', systemSet.otherSetObj.lowerLimitValueOfGridFrequencyProtection1Val)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="电网频率保护下限值2" v-if="systemSet.otherSetObj.lowerLimitValueOfGridFrequencyProtection2">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.lowerLimitValueOfGridFrequencyProtection2Val" placeholder="请输入">
                  <template slot="append">Hz</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('lowerLimitValueOfGridFrequencyProtection2', systemSet.otherSetObj.lowerLimitValueOfGridFrequencyProtection2Val)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="电网频率保护下限值3" v-if="systemSet.otherSetObj.lowerLimitValueOfGridFrequencyProtection3">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.lowerLimitValueOfGridFrequencyProtection3Val" placeholder="请输入">
                  <template slot="append">Hz</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('lowerLimitValueOfGridFrequencyProtection3', systemSet.otherSetObj.lowerLimitValueOfGridFrequencyProtection3Val)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="电网频率重连上限值" v-if="systemSet.otherSetObj.upperLimitValueOfGridFrequencyReconnection">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.upperLimitValueOfGridFrequencyReconnectionVal" placeholder="请输入">
                  <template slot="append">Hz</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('upperLimitValueOfGridFrequencyReconnection', systemSet.otherSetObj.upperLimitValueOfGridFrequencyReconnectionVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="电网频率重连下限值" v-if="systemSet.otherSetObj.lowerLimitValueOfGridFrequencyReconnection">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.lowerLimitValueOfGridFrequencyReconnectionVal" placeholder="请输入">
                  <template slot="append">Hz</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('lowerLimitValueOfGridFrequencyReconnection', systemSet.otherSetObj.lowerLimitValueOfGridFrequencyReconnectionVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="电网频率保护上限时间1" v-if="systemSet.otherSetObj.gridFrequencyProtectionUpperLimitTime1">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.gridFrequencyProtectionUpperLimitTime1Val" placeholder="请输入">
                  <template slot="append">ms</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('gridFrequencyProtectionUpperLimitTime1', systemSet.otherSetObj.gridFrequencyProtectionUpperLimitTime1Val)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="电网频率保护上限时间2" v-if="systemSet.otherSetObj.gridFrequencyProtectionUpperLimitTime2">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.gridFrequencyProtectionUpperLimitTime2Val" placeholder="请输入">
                  <template slot="append">ms</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('gridFrequencyProtectionUpperLimitTime2', systemSet.otherSetObj.gridFrequencyProtectionUpperLimitTime2Val)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="电网频率保护上限时间3" v-if="systemSet.otherSetObj.gridFrequencyProtectionUpperLimitTime3">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.gridFrequencyProtectionUpperLimitTime3Val" placeholder="请输入">
                  <template slot="append">ms</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('gridFrequencyProtectionUpperLimitTime3', systemSet.otherSetObj.gridFrequencyProtectionUpperLimitTime3Val)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="电网频率保护下限时间1" v-if="systemSet.otherSetObj.gridFrequencyProtectionLowerLimitTime1">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.gridFrequencyProtectionLowerLimitTime1Val" placeholder="请输入">
                  <template slot="append">ms</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('gridFrequencyProtectionLowerLimitTime1', systemSet.otherSetObj.gridFrequencyProtectionLowerLimitTime1Val)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="电网频率保护下限时间2" v-if="systemSet.otherSetObj.gridFrequencyProtectionLowerLimitTime2">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.gridFrequencyProtectionLowerLimitTime2Val" placeholder="请输入">
                  <template slot="append">ms</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('gridFrequencyProtectionLowerLimitTime2', systemSet.otherSetObj.gridFrequencyProtectionLowerLimitTime2Val)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="电网频率保护下限时间3" v-if="systemSet.otherSetObj.gridFrequencyProtectionLowerLimitTime3">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.gridFrequencyProtectionLowerLimitTime3Val" placeholder="请输入">
                  <template slot="append">ms</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('gridFrequencyProtectionLowerLimitTime3', systemSet.otherSetObj.gridFrequencyProtectionLowerLimitTime3Val)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="电网频率保护恢复时间" v-if="systemSet.otherSetObj.recoveryTimeOfGridFrequencyProtection">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.recoveryTimeOfGridFrequencyProtectionVal" placeholder="请输入">
                  <template slot="append">ms</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('recoveryTimeOfGridFrequencyProtection', systemSet.otherSetObj.recoveryTimeOfGridFrequencyProtectionVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="电网10Min过压保护值" v-if="systemSet.otherSetObj.tenMinOvervoltageProtectionValueOfThePowerGrid">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.tenMinOvervoltageProtectionValueOfThePowerGridVal" placeholder="请输入">
                  <template slot="append">V</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('tenMinOvervoltageProtectionValueOfThePowerGrid', systemSet.otherSetObj.tenMinOvervoltageProtectionValueOfThePowerGridVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="连网等待时间" v-if="systemSet.otherSetObj.networkingWaitingTime">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.networkingWaitingTimeVal" placeholder="请输入">
                  <template slot="append">s</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('networkingWaitingTime', systemSet.otherSetObj.networkingWaitingTimeVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="重连等待时间" v-if="systemSet.otherSetObj.reconnectWaitingTime">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.reconnectWaitingTimeVal" placeholder="请输入">
                  <template slot="append">s</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('reconnectWaitingTime', systemSet.otherSetObj.reconnectWaitingTimeVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="寒冷模式" v-if="systemSet.otherSetObj.coldMode">
              <div style="display: flex;">
                <el-select v-model="systemSet.otherSetObj.coldModeVal" placeholder="请选择" style="width: 100%;">
                  <el-option label="关闭" value="0" />
                  <el-option label="开启" value="1" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('coldMode', systemSet.otherSetObj.coldModeVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="无功功率百分比" v-if="systemSet.otherSetObj.reactivePowerPercentage">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.reactivePowerPercentageVal" placeholder="请输入">
                  <template slot="append">%</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('reactivePowerPercentage', systemSet.otherSetObj.reactivePowerPercentageVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="Freq-Watt(曲线)使能" v-if="systemSet.otherSetObj.freqWattCurveEnable">
              <div style="display: flex;">
                <el-select v-model="systemSet.otherSetObj.freqWattCurveEnableVal" placeholder="请选择" style="width: 100%;">
                  <el-option label="不使能" value="0" />
                  <el-option label="使能" value="1" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('freqWattCurveEnable', systemSet.otherSetObj.freqWattCurveEnableVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="Volt-Watt(曲线)使能" v-if="systemSet.otherSetObj.voltWattCurveEnable">
              <div style="display: flex;">
                <el-select v-model="systemSet.otherSetObj.voltWattCurveEnableVal" placeholder="请选择" style="width: 100%;">
                  <el-option label="不使能" value="0" />
                  <el-option label="使能" value="1" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('voltWattCurveEnable', systemSet.otherSetObj.voltWattCurveEnableVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="Volt-Var(曲线)使能" v-if="systemSet.otherSetObj.voltVarCurveEnable">
              <div style="display: flex;">
                <el-select v-model="systemSet.otherSetObj.voltVarCurveEnableVal" placeholder="请选择" style="width: 100%;">
                  <el-option label="不使能" value="0" />
                  <el-option label="使能" value="1" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('voltVarCurveEnable', systemSet.otherSetObj.voltVarCurveEnableVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="PF-Watt(曲线)使能" v-if="systemSet.otherSetObj.pfWattCurveEnable">
              <div style="display: flex;">
                <el-select v-model="systemSet.otherSetObj.pfWattCurveEnableVal" placeholder="请选择" style="width: 100%;">
                  <el-option label="不使能" value="0" />
                  <el-option label="使能" value="1" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('pfWattCurveEnable', systemSet.otherSetObj.pfWattCurveEnableVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="定时模式类型" v-if="systemSet.otherSetObj.timingModeType">
              <div style="display: flex;">
                <el-select v-model="systemSet.otherSetObj.timingModeTypeVal" placeholder="请选择" style="width: 100%;">
                  <el-option label="按日期设置" value="0" />
                  <el-option label="按时间设置" value="1" />
                  <el-option label="实时切换当前系统运行模式" value="2" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('timingModeType', systemSet.otherSetObj.timingModeTypeVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="设置量变更寄存器1" v-if="systemSet.otherSetObj.setQuantityChangeRegister1">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.setQuantityChangeRegister1Val" placeholder="请输入" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('setQuantityChangeRegister1', systemSet.otherSetObj.setQuantityChangeRegister1Val)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="设置量变更寄存器2" v-if="systemSet.otherSetObj.setQuantityChangeRegister2">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.setQuantityChangeRegister2Val" placeholder="请输入" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('setQuantityChangeRegister2', systemSet.otherSetObj.setQuantityChangeRegister2Val)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="设置量变更寄存器3" v-if="systemSet.otherSetObj.setQuantityChangeRegister3">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.setQuantityChangeRegister3Val" placeholder="请输入" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('setQuantityChangeRegister3', systemSet.otherSetObj.setQuantityChangeRegister3Val)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="设置量变更寄存器4" v-if="systemSet.otherSetObj.setQuantityChangeRegister4">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.setQuantityChangeRegister4Val" placeholder="请输入" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('setQuantityChangeRegister4', systemSet.otherSetObj.setQuantityChangeRegister4Val)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="设置量变更寄存器5" v-if="systemSet.otherSetObj.setQuantityChangeRegister5">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.setQuantityChangeRegister5Val" placeholder="请输入" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('setQuantityChangeRegister5', systemSet.otherSetObj.setQuantityChangeRegister5Val)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="设置量变更寄存器6" v-if="systemSet.otherSetObj.setQuantityChangeRegister6">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.setQuantityChangeRegister6Val" placeholder="请输入" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('setQuantityChangeRegister6', systemSet.otherSetObj.setQuantityChangeRegister6Val)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="设置量变更寄存器7" v-if="systemSet.otherSetObj.setQuantityChangeRegister7">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.setQuantityChangeRegister7Val" placeholder="请输入" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('setQuantityChangeRegister7', systemSet.otherSetObj.setQuantityChangeRegister7Val)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="设置量变更寄存器8" v-if="systemSet.otherSetObj.setQuantityChangeRegister8">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.setQuantityChangeRegister8Val" placeholder="请输入" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('setQuantityChangeRegister8', systemSet.otherSetObj.setQuantityChangeRegister8Val)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="电池参数显示方式" v-if="systemSet.otherSetObj.batteryParameterDisplayMethod">
              <div style="display: flex;">
                <el-select v-model="systemSet.otherSetObj.batteryParameterDisplayMethodVal" placeholder="请选择" style="width: 100%;">
                  <el-option label="自动轮询" value="0" />
                  <el-option label="手动切换" value="1" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('batteryParameterDisplayMethod', systemSet.otherSetObj.batteryParameterDisplayMethodVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="当前显示参数的电池ID" v-if="systemSet.otherSetObj.theBatteryIdOfTheCurrentDisplayedParameter">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.theBatteryIdOfTheCurrentDisplayedParameterVal" placeholder="请输入" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('theBatteryIdOfTheCurrentDisplayedParameter', systemSet.otherSetObj.theBatteryIdOfTheCurrentDisplayedParameterVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="MOS控制" v-if="systemSet.otherSetObj.mosControl">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.mosControlVal" placeholder="请输入" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('mosControl', systemSet.otherSetObj.mosControlVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="GPS通讯模块电源控制" v-if="systemSet.otherSetObj.gpsCommunicationModulePowerControl">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.gpsCommunicationModulePowerControlVal" placeholder="请输入" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('gpsCommunicationModulePowerControl', systemSet.otherSetObj.gpsCommunicationModulePowerControlVal)">保存</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="实时时钟" v-if="systemSet.otherSetObj.realTimeClock">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.realTimeClockVal" placeholder="请输入" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('realTimeClock', systemSet.otherSetObj.realTimeClockVal)">保存</el-button>
              </div>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </template>

      <template v-else-if="activeIndex === '9'">
        <el-card style="margin-top: 10px;" v-if="batteryParameter.batterySet">
          <el-descriptions title="电池设置" :column="4">
            <el-descriptions-item label="电池组ID" v-if="batteryParameter.batterySetObj.batteryPackId">{{ batteryParameter.batterySetObj.batteryPackIdVal }}</el-descriptions-item>
            <el-descriptions-item label="当前升级电池ID" v-if="batteryParameter.batterySetObj.currentUpgradedBatteryId">{{ batteryParameter.batterySetObj.currentUpgradedBatteryIdVal }}</el-descriptions-item>
            <el-descriptions-item label="升级失败电池ID" v-if="batteryParameter.batterySetObj.upgradeFailedBatteryId">{{ batteryParameter.batterySetObj.upgradeFailedBatteryIdVal }}</el-descriptions-item>
            <el-descriptions-item label="电池包电芯串数 N" v-if="batteryParameter.batterySetObj.numberOfBatteryPackCellStringsN">{{ batteryParameter.batterySetObj.numberOfBatteryPackCellStringsNVal }}</el-descriptions-item>
            <el-descriptions-item label="温度探头的总数 X" v-if="batteryParameter.batterySetObj.totalNumberOfTemperatureProbesX">{{ batteryParameter.batterySetObj.totalNumberOfTemperatureProbesXVal }}</el-descriptions-item>
            <el-descriptions-item label="漏电流" v-if="batteryParameter.batterySetObj.leakageCurrent">{{ batteryParameter.batterySetObj.leakageCurrentVal }}mA</el-descriptions-item>
            <el-descriptions-item label="中间母线电压" v-if="batteryParameter.batterySetObj.intermediateBusbarVoltage">{{ batteryParameter.batterySetObj.intermediateBusbarVoltageVal }}V</el-descriptions-item>
            <el-descriptions-item label="BuckBoost电流" v-if="batteryParameter.batterySetObj.buckBoostCurrent">{{ batteryParameter.batterySetObj.buckBoostCurrentVal }}A</el-descriptions-item>
            <el-descriptions-item label="PVIso电压" v-if="batteryParameter.batterySetObj.pvIsoVoltage">{{ batteryParameter.batterySetObj.pvIsoVoltageVal }}V</el-descriptions-item>
            <el-descriptions-item label="零地电压" v-if="batteryParameter.batterySetObj.zeroGroundVoltage">{{ batteryParameter.batterySetObj.zeroGroundVoltageVal }}V</el-descriptions-item>
            <el-descriptions-item label="逆变电流直流分量" v-if="batteryParameter.batterySetObj.dcComponentOfInverterCurrent">{{ batteryParameter.batterySetObj.dcComponentOfInverterCurrentVal }}mA</el-descriptions-item>
            <el-descriptions-item label="负载电压直流分量" v-if="batteryParameter.batterySetObj.dcComponentOfLoadVoltage">{{ batteryParameter.batterySetObj.dcComponentOfLoadVoltageVal }}mV</el-descriptions-item>
            <el-descriptions-item label="继电器中间电压" v-if="batteryParameter.batterySetObj.relayIntermediateVoltage">{{ batteryParameter.batterySetObj.relayIntermediateVoltageVal }}V</el-descriptions-item>
            <el-descriptions-item label="电芯电压1" v-if="batteryParameter.batterySetObj.cellVoltage1">{{ batteryParameter.batterySetObj.cellVoltage1Val }}mV</el-descriptions-item>
            <el-descriptions-item label="电芯电压2" v-if="batteryParameter.batterySetObj.cellVoltage2">{{ batteryParameter.batterySetObj.cellVoltage2Val }}mV</el-descriptions-item>
            <el-descriptions-item label="电芯电压3" v-if="batteryParameter.batterySetObj.cellVoltage3">{{ batteryParameter.batterySetObj.cellVoltage3Val }}mV</el-descriptions-item>
            <el-descriptions-item label="电芯电压4" v-if="batteryParameter.batterySetObj.cellVoltage4">{{ batteryParameter.batterySetObj.cellVoltage4Val }}mV</el-descriptions-item>
            <el-descriptions-item label="电芯电压5" v-if="batteryParameter.batterySetObj.cellVoltage5">{{ batteryParameter.batterySetObj.cellVoltage5Val }}mV</el-descriptions-item>
            <el-descriptions-item label="电芯电压6" v-if="batteryParameter.batterySetObj.cellVoltage6">{{ batteryParameter.batterySetObj.cellVoltage6Val }}mV</el-descriptions-item>
            <el-descriptions-item label="电芯电压7" v-if="batteryParameter.batterySetObj.cellVoltage7">{{ batteryParameter.batterySetObj.cellVoltage7Val }}mV</el-descriptions-item>
            <el-descriptions-item label="电芯电压8" v-if="batteryParameter.batterySetObj.cellVoltage8">{{ batteryParameter.batterySetObj.cellVoltage8Val }}mV</el-descriptions-item>
            <el-descriptions-item label="电芯电压9" v-if="batteryParameter.batterySetObj.cellVoltage9">{{ batteryParameter.batterySetObj.cellVoltage9Val }}mV</el-descriptions-item>
            <el-descriptions-item label="电芯电压10" v-if="batteryParameter.batterySetObj.cellVoltage10">{{ batteryParameter.batterySetObj.cellVoltage10Val }}mV</el-descriptions-item>
            <el-descriptions-item label="电芯电压11" v-if="batteryParameter.batterySetObj.cellVoltage11">{{ batteryParameter.batterySetObj.cellVoltage11Val }}mV</el-descriptions-item>
            <el-descriptions-item label="电芯电压12" v-if="batteryParameter.batterySetObj.cellVoltage12">{{ batteryParameter.batterySetObj.cellVoltage12Val }}mV</el-descriptions-item>
            <el-descriptions-item label="电芯电压13" v-if="batteryParameter.batterySetObj.cellVoltage13">{{ batteryParameter.batterySetObj.cellVoltage13Val }}mV</el-descriptions-item>
            <el-descriptions-item label="电芯电压14" v-if="batteryParameter.batterySetObj.cellVoltage14">{{ batteryParameter.batterySetObj.cellVoltage14Val }}mV</el-descriptions-item>
            <el-descriptions-item label="电芯电压15" v-if="batteryParameter.batterySetObj.cellVoltage15">{{ batteryParameter.batterySetObj.cellVoltage15Val }}mV</el-descriptions-item>
            <el-descriptions-item label="电芯电压16" v-if="batteryParameter.batterySetObj.cellVoltage16">{{ batteryParameter.batterySetObj.cellVoltage16Val }}mV</el-descriptions-item>
            <el-descriptions-item label="当前电流" v-if="batteryParameter.batterySetObj.currentCurrent">{{ batteryParameter.batterySetObj.currentCurrentVal }}mA</el-descriptions-item>
            <el-descriptions-item label="State1" v-if="batteryParameter.batterySetObj.state1">{{ batteryParameter.batterySetObj.state1Val }}</el-descriptions-item>
            <el-descriptions-item label="State2" v-if="batteryParameter.batterySetObj.state2">{{ batteryParameter.batterySetObj.state2Val }}</el-descriptions-item>
            <el-descriptions-item label="State3" v-if="batteryParameter.batterySetObj.state3">{{ batteryParameter.batterySetObj.state3Val }}</el-descriptions-item>
            <el-descriptions-item label="充电过流保护" v-if="batteryParameter.batterySetObj.chargingOvercurrentProtection">{{ batteryParameter.batterySetObj.chargingOvercurrentProtectionVal }}</el-descriptions-item>
            <el-descriptions-item label="充电过流保护延时" v-if="batteryParameter.batterySetObj.chargingOvercurrentProtectionDelay">{{ batteryParameter.batterySetObj.chargingOvercurrentProtectionDelayVal }}</el-descriptions-item>
            <el-descriptions-item label="电芯过压保护" v-if="batteryParameter.batterySetObj.cellOvervoltageProtection">{{ batteryParameter.batterySetObj.cellOvervoltageProtectionVal }}</el-descriptions-item>
            <el-descriptions-item label="电芯过压保护延时" v-if="batteryParameter.batterySetObj.cellOvervoltageProtectionDelay">{{ batteryParameter.batterySetObj.cellOvervoltageProtectionDelayVal }}</el-descriptions-item>
            <el-descriptions-item label="电芯过放保护" v-if="batteryParameter.batterySetObj.cellOverDischargeProtection">{{ batteryParameter.batterySetObj.cellOverDischargeProtectionVal }}</el-descriptions-item>
            <el-descriptions-item label="电芯过放保护延时" v-if="batteryParameter.batterySetObj.cellOverDischargeProtectionDelay">{{ batteryParameter.batterySetObj.cellOverDischargeProtectionDelayVal }}</el-descriptions-item>
            <el-descriptions-item label="过压滞后电压" v-if="batteryParameter.batterySetObj.overvoltageHysteresisVoltage">{{ batteryParameter.batterySetObj.overvoltageHysteresisVoltageVal }}</el-descriptions-item>
            <el-descriptions-item label="过放滞后电压" v-if="batteryParameter.batterySetObj.overdischargeHysteresisVoltage">{{ batteryParameter.batterySetObj.overdischargeHysteresisVoltageVal }}</el-descriptions-item>
            <el-descriptions-item label="电芯过压恢复延时" v-if="batteryParameter.batterySetObj.cellOvervoltageRecoveryDelay">{{ batteryParameter.batterySetObj.cellOvervoltageRecoveryDelayVal }}</el-descriptions-item>
            <el-descriptions-item label="电芯过放恢复延时" v-if="batteryParameter.batterySetObj.cellOverDischargeRecoveryDelay">{{ batteryParameter.batterySetObj.cellOverDischargeRecoveryDelayVal }}</el-descriptions-item>
            <el-descriptions-item label="放电高温保护" v-if="batteryParameter.batterySetObj.highTemperatureProtectionDuringDischarge">{{ batteryParameter.batterySetObj.highTemperatureProtectionDuringDischargeVal }}</el-descriptions-item>
            <el-descriptions-item label="放电高温保护恢复" v-if="batteryParameter.batterySetObj.highTemperatureProtectionRecoveryDuringDischarge">{{ batteryParameter.batterySetObj.highTemperatureProtectionRecoveryDuringDischargeVal }}</el-descriptions-item>
            <el-descriptions-item label="放电低温保护" v-if="batteryParameter.batterySetObj.lowTemperatureProtectionDuringDischarge">{{ batteryParameter.batterySetObj.lowTemperatureProtectionDuringDischargeVal }}</el-descriptions-item>
            <el-descriptions-item label="放电低温保护恢复" v-if="batteryParameter.batterySetObj.dischargeLowTemperatureProtectionRecovery">{{ batteryParameter.batterySetObj.dischargeLowTemperatureProtectionRecoveryVal }}</el-descriptions-item>
            <el-descriptions-item label="充电高温保护" v-if="batteryParameter.batterySetObj.highTemperatureProtectionDuringCharging">{{ batteryParameter.batterySetObj.highTemperatureProtectionDuringChargingVal }}</el-descriptions-item>
            <el-descriptions-item label="充电高温保护恢复" v-if="batteryParameter.batterySetObj.highTemperatureProtectionRecoveryDuringCharging">{{ batteryParameter.batterySetObj.highTemperatureProtectionRecoveryDuringChargingVal }}</el-descriptions-item>
            <el-descriptions-item label="充电低温保护" v-if="batteryParameter.batterySetObj.lowTemperatureProtectionDuringCharging">{{ batteryParameter.batterySetObj.lowTemperatureProtectionDuringChargingVal }}</el-descriptions-item>
            <el-descriptions-item label="充电低温保护恢复" v-if="batteryParameter.batterySetObj.lowTemperatureProtectionRecoveryDuringCharging">{{ batteryParameter.batterySetObj.lowTemperatureProtectionRecoveryDuringChargingVal }}</el-descriptions-item>
            <el-descriptions-item label="均衡开启电压" v-if="batteryParameter.batterySetObj.equalizingOpeningVoltage">{{ batteryParameter.batterySetObj.equalizingOpeningVoltageVal }}</el-descriptions-item>
            <el-descriptions-item label="均衡开启压差" v-if="batteryParameter.batterySetObj.equilibriumOpeningPressureDifference">{{ batteryParameter.batterySetObj.equilibriumOpeningPressureDifferenceVal }}</el-descriptions-item>
            <el-descriptions-item label="电芯温度1" v-if="batteryParameter.batterySetObj.cellTemperature1">{{ batteryParameter.batterySetObj.cellTemperature1Val }}℃</el-descriptions-item>
            <el-descriptions-item label="电芯温度2" v-if="batteryParameter.batterySetObj.cellTemperature2">{{ batteryParameter.batterySetObj.cellTemperature2Val }}℃</el-descriptions-item>
            <el-descriptions-item label="电芯温度3" v-if="batteryParameter.batterySetObj.cellTemperature3">{{ batteryParameter.batterySetObj.cellTemperature3Val }}℃</el-descriptions-item>
            <el-descriptions-item label="电芯温度4" v-if="batteryParameter.batterySetObj.cellTemperature4">{{ batteryParameter.batterySetObj.cellTemperature4Val }}℃</el-descriptions-item>
            <el-descriptions-item label="MOS 温度" v-if="batteryParameter.batterySetObj.mosTemperature">{{ batteryParameter.batterySetObj.mosTemperatureVal }}℃</el-descriptions-item>
            <el-descriptions-item label="环境温度" v-if="batteryParameter.batterySetObj.ambientTemperature">{{ batteryParameter.batterySetObj.ambientTemperatureVal }}℃</el-descriptions-item>
            <el-descriptions-item label="均衡状态1" v-if="batteryParameter.batterySetObj.equilibriumState1">
              {{ batteryParameter.batterySetObj.equilibriumState1Val }}
            </el-descriptions-item>
            <el-descriptions-item label="均衡状态2" v-if="batteryParameter.batterySetObj.equilibriumState2">
              {{ batteryParameter.batterySetObj.equilibriumState2Val }}
            </el-descriptions-item>
            <el-descriptions-item label="软件版本" v-if="batteryParameter.batterySetObj.softwareVersion">{{ batteryParameter.batterySetObj.softwareVersionVal }}</el-descriptions-item>
            <el-descriptions-item label="硬件版本" v-if="batteryParameter.batterySetObj.hardwareVersion">{{ batteryParameter.batterySetObj.hardwareVersionVal }}</el-descriptions-item>
            <el-descriptions-item label="状态" v-if="batteryParameter.batterySetObj.state">{{ batteryParameter.batterySetObj.stateVal }}</el-descriptions-item>
            <el-descriptions-item label="告警状态-电芯过放告警" v-if="batteryParameter.batterySetObj.alarmStatusCellOverDischargeAlarm">
              {{ batteryParameter.batterySetObj.alarmStatusCellOverDischargeAlarmVal == 0 ? '无' : '告警' }}
            </el-descriptions-item>
            <el-descriptions-item label="告警状态-总过放告警" v-if="batteryParameter.batterySetObj.alarmStatusTotalOverDischargeAlarm">
              {{ batteryParameter.batterySetObj.alarmStatusTotalOverDischargeAlarmVal == 0 ? '无' : '告警' }}
            </el-descriptions-item>
            <el-descriptions-item label="告警状态-电芯过压告警" v-if="batteryParameter.batterySetObj.alarmStatusCellOvervoltageAlarm">
              {{ batteryParameter.batterySetObj.alarmStatusCellOvervoltageAlarmVal == 0 ? '无' : '告警' }}
            </el-descriptions-item>
            <el-descriptions-item label="告警状态-总过压告警" v-if="batteryParameter.batterySetObj.alarmStatusTotalOvervoltageAlarm">
              {{ batteryParameter.batterySetObj.alarmStatusTotalOvervoltageAlarmVal == 0 ? '无' : '告警' }}
            </el-descriptions-item>
            <el-descriptions-item label="告警状态-放电过流告警" v-if="batteryParameter.batterySetObj.alarmStatusDischargeOvercurrentAlarm">
              {{ batteryParameter.batterySetObj.alarmStatusDischargeOvercurrentAlarmVal == 0 ? '无' : '告警' }}
            </el-descriptions-item>
            <el-descriptions-item label="告警状态-放电过温告警" v-if="batteryParameter.batterySetObj.alarmStatusDischargeOverTemperatureAlarm">
              {{ batteryParameter.batterySetObj.alarmStatusDischargeOverTemperatureAlarmVal == 0 ? '无' : '告警' }}
            </el-descriptions-item>
            <el-descriptions-item label="告警状态-充电过温告警" v-if="batteryParameter.batterySetObj.alarmStatusChargingOverTemperatureAlarm">
              {{ batteryParameter.batterySetObj.alarmStatusChargingOverTemperatureAlarmVal == 0 ? '无' : '告警' }}
            </el-descriptions-item>
            <el-descriptions-item label="告警状态-环境高温告警" v-if="batteryParameter.batterySetObj.alarmStatusEnvironmentalHighTemperatureAlarm">
              {{ batteryParameter.batterySetObj.alarmStatusEnvironmentalHighTemperatureAlarmVal == 0 ? '无' : '告警' }}
            </el-descriptions-item>
            <el-descriptions-item label="告警状态-环境低温告警" v-if="batteryParameter.batterySetObj.alarmStatusEnvironmentalLowTemperatureAlarm">
              {{ batteryParameter.batterySetObj.alarmStatusEnvironmentalLowTemperatureAlarmVal == 0 ? '无' : '告警' }}
            </el-descriptions-item>
            <el-descriptions-item label="告警状态-SOC低告警" v-if="batteryParameter.batterySetObj.alarmStatusSocLowAlarm">
              {{ batteryParameter.batterySetObj.alarmStatusSocLowAlarmVal == 0 ? '无' : '告警' }}
            </el-descriptions-item>
            <el-descriptions-item label="告警状态-MOS高温告警" v-if="batteryParameter.batterySetObj.alarmStatusMosHighTemperatureAlarm">
              {{ batteryParameter.batterySetObj.alarmStatusMosHighTemperatureAlarmVal == 0 ? '无' : '告警' }}
            </el-descriptions-item>
            <el-descriptions-item label="电池SOC" v-if="batteryParameter.batterySetObj.batterySoc">{{ batteryParameter.batterySetObj.batterySocVal }}</el-descriptions-item>
            <el-descriptions-item label="电池SOH" v-if="batteryParameter.batterySetObj.batterySoh">{{ batteryParameter.batterySetObj.batterySohVal }}</el-descriptions-item>
            <el-descriptions-item label="循环次数" v-if="batteryParameter.batterySetObj.numberOfCycles">{{ batteryParameter.batterySetObj.numberOfCyclesVal }}</el-descriptions-item>
            <el-descriptions-item label="放电剩余时间" v-if="batteryParameter.batterySetObj.dischargeRemainingTime">{{ batteryParameter.batterySetObj.dischargeRemainingTimeVal }}min</el-descriptions-item>
            <el-descriptions-item label="充电剩余时间" v-if="batteryParameter.batterySetObj.chargingRemainingTime">{{ batteryParameter.batterySetObj.chargingRemainingTimeVal }}min</el-descriptions-item>
            <el-descriptions-item label="当前充电间隔" v-if="batteryParameter.batterySetObj.currentChargingInterval">{{ batteryParameter.batterySetObj.currentChargingIntervalVal }}h</el-descriptions-item>
            <el-descriptions-item label="最长充电间隔" v-if="batteryParameter.batterySetObj.maximumChargingInterval">{{ batteryParameter.batterySetObj.maximumChargingIntervalVal }}h</el-descriptions-item>
            <el-descriptions-item label="电池总电压" v-if="batteryParameter.batterySetObj.totalBatteryVoltage">{{ batteryParameter.batterySetObj.totalBatteryVoltageVal }}mV</el-descriptions-item>
            <el-descriptions-item label="电池包最高电压" v-if="batteryParameter.batterySetObj.maximumVoltageOfBatteryPack">{{ batteryParameter.batterySetObj.maximumVoltageOfBatteryPackVal }}mV</el-descriptions-item>
            <el-descriptions-item label="电池包最低电压" v-if="batteryParameter.batterySetObj.minimumVoltageOfBatteryPack">{{ batteryParameter.batterySetObj.minimumVoltageOfBatteryPackVal }}mV</el-descriptions-item>
            <el-descriptions-item label="最大允许放电电流" v-if="batteryParameter.batterySetObj.maximumAllowableDischargeCurrent">{{ batteryParameter.batterySetObj.maximumAllowableDischargeCurrentVal }}mA</el-descriptions-item>
            <el-descriptions-item label="最大允许充电电流" v-if="batteryParameter.batterySetObj.maximumAllowableChargingCurrent">{{ batteryParameter.batterySetObj.maximumAllowableChargingCurrentVal }}mA</el-descriptions-item>
            <el-descriptions-item label="标准充电电压" v-if="batteryParameter.batterySetObj.standardChargingVoltage">{{ batteryParameter.batterySetObj.standardChargingVoltageVal }}mV</el-descriptions-item>
            <el-descriptions-item label="当前湿度" v-if="batteryParameter.batterySetObj.currentHumidity">{{ batteryParameter.batterySetObj.currentHumidityVal }}RH%</el-descriptions-item>
            <el-descriptions-item label="出厂编码" v-if="batteryParameter.batterySetObj.factoryCode">{{ batteryParameter.batterySetObj.factoryCodeVal }}</el-descriptions-item>
            <el-descriptions-item label="产品编号" v-if="batteryParameter.batterySetObj.productNumber">{{ batteryParameter.batterySetObj.productNumberVal }}</el-descriptions-item>
            <el-descriptions-item label="出厂日期" v-if="batteryParameter.batterySetObj.dateOfProduction">{{ batteryParameter.batterySetObj.dateOfProductionVal }}</el-descriptions-item>
            <el-descriptions-item label="电池检测电阻阻值" v-if="batteryParameter.batterySetObj.batteryDetectionResistanceValue">{{ batteryParameter.batterySetObj.batteryDetectionResistanceValueVal }}mΩ</el-descriptions-item>
            <el-descriptions-item label="最高电芯温度" v-if="batteryParameter.batterySetObj.maximumCellTemperature">{{ batteryParameter.batterySetObj.maximumCellTemperatureVal }}℃</el-descriptions-item>
            <el-descriptions-item label="最低电芯温度" v-if="batteryParameter.batterySetObj.minimumCellTemperature">{{ batteryParameter.batterySetObj.minimumCellTemperatureVal }}℃</el-descriptions-item>
            <el-descriptions-item label="温差" v-if="batteryParameter.batterySetObj.temperatureDifference">{{ batteryParameter.batterySetObj.temperatureDifferenceVal }}℃</el-descriptions-item>
            <el-descriptions-item label="温差保护值" v-if="batteryParameter.batterySetObj.temperatureDifferenceProtectionValue">{{ batteryParameter.batterySetObj.temperatureDifferenceProtectionValueVal }}mV</el-descriptions-item>
            <el-descriptions-item label="温差告警值" v-if="batteryParameter.batterySetObj.temperatureDifferenceAlarmValue">{{ batteryParameter.batterySetObj.temperatureDifferenceAlarmValueVal }}mV</el-descriptions-item>
            <el-descriptions-item label="压差保护值" v-if="batteryParameter.batterySetObj.differentialPressureProtectionValue">{{ batteryParameter.batterySetObj.differentialPressureProtectionValueVal }}mV</el-descriptions-item>
            <el-descriptions-item label="压差告警值" v-if="batteryParameter.batterySetObj.differentialPressureAlarmValue">{{ batteryParameter.batterySetObj.differentialPressureAlarmValueVal }}mV</el-descriptions-item>
            <el-descriptions-item label="静置均衡时间" v-if="batteryParameter.batterySetObj.staticEquilibriumTime">{{ batteryParameter.batterySetObj.staticEquilibriumTimeVal }}min</el-descriptions-item>
            <el-descriptions-item label="充电过流后自动恢复延时" v-if="batteryParameter.batterySetObj.automaticRecoveryDelayAfterChargingOvercurrent">{{ batteryParameter.batterySetObj.automaticRecoveryDelayAfterChargingOvercurrentVal }}min</el-descriptions-item>
            <el-descriptions-item label="充电过流后自动恢复锁定" v-if="batteryParameter.batterySetObj.automaticallyResumeLockingAfterOvercharging">{{ batteryParameter.batterySetObj.automaticallyResumeLockingAfterOverchargingVal }}min</el-descriptions-item>
            <el-descriptions-item label="放电过流后自动恢复延时" v-if="batteryParameter.batterySetObj.automaticRecoveryDelayAfterDischargeOvercurrent">{{ batteryParameter.batterySetObj.automaticRecoveryDelayAfterDischargeOvercurrentVal }}min</el-descriptions-item>
            <el-descriptions-item label="放电过流后自动恢复锁定" v-if="batteryParameter.batterySetObj.automaticRecoveryLockingAfterDischargeOvercurrent">{{ batteryParameter.batterySetObj.automaticRecoveryLockingAfterDischargeOvercurrentVal }}min</el-descriptions-item>
            <el-descriptions-item label="逆变器电流超过限制电流" v-if="batteryParameter.batterySetObj.theInverterCurrentExceedsTheLimitCurrent">{{ batteryParameter.batterySetObj.theInverterCurrentExceedsTheLimitCurrentVal }}</el-descriptions-item>
            <el-descriptions-item label="电池参数显示方式" v-if="batteryParameter.batterySetObj.batteryParameterDisplayMethod">
              {{ batteryParameter.batterySetObj.batteryParameterDisplayMethodVal == 0 ? '自动轮询' : '自动轮询' }}
            </el-descriptions-item>
            <el-descriptions-item label="当前显示参数的电池ID" v-if="batteryParameter.batterySetObj.theBatteryIdOfTheCurrentDisplayedParameter">{{ batteryParameter.batterySetObj.theBatteryIdOfTheCurrentDisplayedParameterVal }}</el-descriptions-item>
            <el-descriptions-item label="电池包设计容量" v-if="batteryParameter.batterySetObj.batteryPackDesignCapacity">{{ batteryParameter.batterySetObj.batteryPackDesignCapacityVal }}</el-descriptions-item>
            <el-descriptions-item label="当前电池满容量" v-if="batteryParameter.batterySetObj.currentBatteryFullCapacity">{{ batteryParameter.batterySetObj.currentBatteryFullCapacityVal }}</el-descriptions-item>
            <el-descriptions-item label="电池剩余容量" v-if="batteryParameter.batterySetObj.remainingBatteryCapacity">{{ batteryParameter.batterySetObj.remainingBatteryCapacityVal }}</el-descriptions-item>
            <el-descriptions-item label="MOS控制" v-if="batteryParameter.batterySetObj.mosControl">{{ batteryParameter.batterySetObj.mosControlVal }}</el-descriptions-item>
            <el-descriptions-item label="充/放电加热使能" v-if="batteryParameter.batterySetObj.chargingDischargingHeatingEnable">
              {{ batteryParameter.batterySetObj.chargingDischargingHeatingEnableVal }}
            </el-descriptions-item>
            <el-descriptions-item label="GPS通讯模块电源控制" v-if="batteryParameter.batterySetObj.gpsCommunicationModulePowerControl">{{ batteryParameter.batterySetObj.gpsCommunicationModulePowerControlVal }}</el-descriptions-item>
            <el-descriptions-item label="实时时钟" v-if="batteryParameter.batterySetObj.realTimeClock">{{ batteryParameter.batterySetObj.realTimeClockVal }}</el-descriptions-item>
            <el-descriptions-item label="放电过流1保护" v-if="batteryParameter.batterySetObj.dischargeOvercurrent1Protection">{{ batteryParameter.batterySetObj.dischargeOvercurrent1ProtectionVal }}</el-descriptions-item>
            <el-descriptions-item label="放电过流1延时" v-if="batteryParameter.batterySetObj.dischargeOvercurrent1Delay">{{ batteryParameter.batterySetObj.dischargeOvercurrent1DelayVal }}</el-descriptions-item>
            <el-descriptions-item label="环境高温保护" v-if="batteryParameter.batterySetObj.environmentalHighTemperatureProtection">{{ batteryParameter.batterySetObj.environmentalHighTemperatureProtectionVal }}</el-descriptions-item>
            <el-descriptions-item label="环境高温保护恢复" v-if="batteryParameter.batterySetObj.environmentalHighTemperatureProtectionRecovery">{{ batteryParameter.batterySetObj.environmentalHighTemperatureProtectionRecoveryVal }}</el-descriptions-item>
            <el-descriptions-item label="环境低温保护" v-if="batteryParameter.batterySetObj.environmentalLowTemperatureProtection">{{ batteryParameter.batterySetObj.environmentalLowTemperatureProtectionVal }}</el-descriptions-item>
            <el-descriptions-item label="环境低温保护恢复" v-if="batteryParameter.batterySetObj.environmentalLowTemperatureProtectionRecovery">{{ batteryParameter.batterySetObj.environmentalLowTemperatureProtectionRecoveryVal }}</el-descriptions-item>
            <el-descriptions-item label="总压过压保护" v-if="batteryParameter.batterySetObj.totalPressureOvervoltageProtection">{{ batteryParameter.batterySetObj.totalPressureOvervoltageProtectionVal }}</el-descriptions-item>
            <el-descriptions-item label="总压过压保护恢复" v-if="batteryParameter.batterySetObj.totalPressureOvervoltageProtectionRecovery">{{ batteryParameter.batterySetObj.totalPressureOvervoltageProtectionRecoveryVal }}</el-descriptions-item>
            <el-descriptions-item label="总压过放保护" v-if="batteryParameter.batterySetObj.totalVoltageOvervoltageProtection">{{ batteryParameter.batterySetObj.totalVoltageOvervoltageProtectionVal }}</el-descriptions-item>
            <el-descriptions-item label="总压过放恢复" v-if="batteryParameter.batterySetObj.totalPressureOverDischargeRecovery">{{ batteryParameter.batterySetObj.totalPressureOverDischargeRecoveryVal }}</el-descriptions-item>
            <el-descriptions-item label="总压过压保护延时" v-if="batteryParameter.batterySetObj.totalVoltageOvervoltageProtectionDelay">{{ batteryParameter.batterySetObj.totalVoltageOvervoltageProtectionDelayVal }}</el-descriptions-item>
            <el-descriptions-item label="总压过放保护延时" v-if="batteryParameter.batterySetObj.totalVoltageOverDischargeProtectionDelay">{{ batteryParameter.batterySetObj.totalVoltageOverDischargeProtectionDelayVal }}</el-descriptions-item>
            <el-descriptions-item label="总过压恢复延时" v-if="batteryParameter.batterySetObj.totalOvervoltageRecoveryDelay">{{ batteryParameter.batterySetObj.totalOvervoltageRecoveryDelayVal }}</el-descriptions-item>
            <el-descriptions-item label="总过放恢复延时" v-if="batteryParameter.batterySetObj.totalOverdischargeRecoveryDelay">{{ batteryParameter.batterySetObj.totalOverdischargeRecoveryDelayVal }}</el-descriptions-item>
            <el-descriptions-item label="MOS高温保护" v-if="batteryParameter.batterySetObj.mosHighTemperatureProtection">{{ batteryParameter.batterySetObj.mosHighTemperatureProtectionVal }}</el-descriptions-item>
            <el-descriptions-item label="MOS高温恢复" v-if="batteryParameter.batterySetObj.mosHighTemperatureRecovery">{{ batteryParameter.batterySetObj.mosHighTemperatureRecoveryVal }}</el-descriptions-item>
            <el-descriptions-item label="MOS高温保护延时" v-if="batteryParameter.batterySetObj.moshighTemperatureProtectionDelay">{{ batteryParameter.batterySetObj.moshighTemperatureProtectionDelayVal }}</el-descriptions-item>
            <el-descriptions-item label="充满保护_总压高于" v-if="batteryParameter.batterySetObj.fullOfProtectionTotalPressureAbove">{{ batteryParameter.batterySetObj.fullOfProtectionTotalPressureAboveVal }}</el-descriptions-item>
            <el-descriptions-item label="充满保护_充电电流低于" v-if="batteryParameter.batterySetObj.fullOfProtectionChargingCurrentBelow">{{ batteryParameter.batterySetObj.fullOfProtectionChargingCurrentBelowVal }}</el-descriptions-item>
            <el-descriptions-item label="充满保护_延时时间" v-if="batteryParameter.batterySetObj.fullOfProtectionDelayTime">{{ batteryParameter.batterySetObj.fullOfProtectionDelayTimeVal }}</el-descriptions-item>
            <el-descriptions-item label="加热/风扇开启温度" v-if="batteryParameter.batterySetObj.heatingFanOnTemperature">{{ batteryParameter.batterySetObj.heatingFanOnTemperatureVal }}</el-descriptions-item>
            <el-descriptions-item label="加热/风扇恢复温度" v-if="batteryParameter.batterySetObj.heatingFanRecoveryTemperature">{{ batteryParameter.batterySetObj.heatingFanRecoveryTemperatureVal }}</el-descriptions-item>
            <el-descriptions-item label="使能设置-电压告警" v-if="batteryParameter.batterySetObj.enableSettingsVoltageAlarm">
              {{ batteryParameter.batterySetObj.enableSettingsVoltageAlarmVal == 1 ? '开' : '关' }}
            </el-descriptions-item>
            <el-descriptions-item label="使能设置-过流告警" v-if="batteryParameter.batterySetObj.enableSettingsOvercurrentAlarm">
              {{ batteryParameter.batterySetObj.enableSettingsOvercurrentAlarmVal == 1 ? '开' : '关' }}
            </el-descriptions-item>
            <el-descriptions-item label="使能设置-过温告警" v-if="batteryParameter.batterySetObj.enableSettingsCellTemperatureAlarm">
              {{ batteryParameter.batterySetObj.enableSettingsCellTemperatureAlarmVal == 1 ? '开' : '关' }}
            </el-descriptions-item>
            <el-descriptions-item label="使能设置-MOS过温告警" v-if="batteryParameter.batterySetObj.enableSettingMosOverTemperatureAlarm">
              {{ batteryParameter.batterySetObj.enableSettingMosOverTemperatureAlarmVal == 1 ? '开' : '关' }}
            </el-descriptions-item>
            <el-descriptions-item label="使能设置-电芯不均衡告警" v-if="batteryParameter.batterySetObj.enableSettingsCellImbalanceAlarm">
              {{ batteryParameter.batterySetObj.enableSettingsCellImbalanceAlarmVal == 1 ? '开' : '关' }}
            </el-descriptions-item>
            <el-descriptions-item label="使能设置-环境温度告警" v-if="batteryParameter.batterySetObj.enableSettingsAmbientTemperatureAlarm">
              {{ batteryParameter.batterySetObj.enableSettingsAmbientTemperatureAlarmVal == 1 ? '开' : '关' }}
            </el-descriptions-item>
            <el-descriptions-item label="使能设置-SOC低告警" v-if="batteryParameter.batterySetObj.enableSettingSocLowAlarm">
              {{ batteryParameter.batterySetObj.enableSettingSocLowAlarmVal == 1 ? '开' : '关' }}
            </el-descriptions-item>
            <el-descriptions-item label="使能设置-充电加热使能" v-if="batteryParameter.batterySetObj.enableSettingsUnlockSystemLocks">
              {{ batteryParameter.batterySetObj.enableSettingsUnlockSystemLocksVal == 1 ? '开' : '关' }}
            </el-descriptions-item>
            <el-descriptions-item label="使能设置-总电压保护" v-if="batteryParameter.batterySetObj.enableSettingsTotalVoltageProtection">
              {{ batteryParameter.batterySetObj.enableSettingsTotalVoltageProtectionVal == 1 ? '开' : '关' }}
            </el-descriptions-item>
            <el-descriptions-item label="使能设置-充电过流后放电恢复功能" v-if="batteryParameter.batterySetObj.enableSettingsDischargeRecoveryAfterChargingOvercurrent">
              {{ batteryParameter.batterySetObj.enableSettingsDischargeRecoveryAfterChargingOvercurrentVal == 1 ? '开' : '关' }}
            </el-descriptions-item>
            <el-descriptions-item label="使能设置-放电过流后延时自动恢复功能" v-if="batteryParameter.batterySetObj.enableSettingsDelayAutomaticRecoveryAfterDischargeOvercurrent">
              {{ batteryParameter.batterySetObj.enableSettingsDelayAutomaticRecoveryAfterDischargeOvercurrentVal == 1 ? '开' : '关' }}
            </el-descriptions-item>
            <el-descriptions-item label="使能设置-放电过流后充电恢复功能" v-if="batteryParameter.batterySetObj.enableSettingsChargingAfterDischargeOvercurrent">
              {{ batteryParameter.batterySetObj.enableSettingsChargingAfterDischargeOvercurrentVal == 1 ? '开' : '关' }}
            </el-descriptions-item>
            <el-descriptions-item label="使能设置-静置均衡功能" v-if="batteryParameter.batterySetObj.enableSettingsStaticEquilibrium">
              {{ batteryParameter.batterySetObj.enableSettingsStaticEquilibriumVal == 1 ? '开' : '关' }}
            </el-descriptions-item>
            <el-descriptions-item label="系统锁状态序号" v-if="batteryParameter.batterySetObj.systemLockStatusSerialNumber">
              {{ batteryParameter.batterySetObj.systemLockStatusSerialNumberVal | systemLockStatusSerialNumberValFilter }}
            </el-descriptions-item>
            <el-descriptions-item label="总压过压告警电压" v-if="batteryParameter.batterySetObj.totalVoltageOvervoltageAlarmVoltage">{{ batteryParameter.batterySetObj.totalVoltageOvervoltageAlarmVoltageVal }}mV</el-descriptions-item>
            <el-descriptions-item label="总压过放告警电压" v-if="batteryParameter.batterySetObj.totalVoltageOverDischargeAlarmVoltage">{{ batteryParameter.batterySetObj.totalVoltageOverDischargeAlarmVoltageVal }}mV</el-descriptions-item>
            <el-descriptions-item label="电芯过压告警电压" v-if="batteryParameter.batterySetObj.cellOvervoltageAlarmVoltage">
              {{ batteryParameter.batterySetObj.cellOvervoltageAlarmVoltageVal }}V
            </el-descriptions-item>
            <el-descriptions-item label="电芯过放告警电压" v-if="batteryParameter.batterySetObj.cellOverDischargeAlarmVoltage">
              {{ batteryParameter.batterySetObj.cellOverDischargeAlarmVoltageVal }}V
            </el-descriptions-item>
            <el-descriptions-item label="充电过流告警电流" v-if="batteryParameter.batterySetObj.chargingOvercurrentAlarmCurrent">{{ batteryParameter.batterySetObj.chargingOvercurrentAlarmCurrentVal }}A</el-descriptions-item>
            <el-descriptions-item label="放电过流告警电流" v-if="batteryParameter.batterySetObj.dischargeOvercurrentAlarmCurrent">{{ batteryParameter.batterySetObj.dischargeOvercurrentAlarmCurrentVal }}A</el-descriptions-item>
            <el-descriptions-item label="充电高温告警温度" v-if="batteryParameter.batterySetObj.chargingHighTemperatureAlarmTemperature">{{ batteryParameter.batterySetObj.chargingHighTemperatureAlarmTemperatureVal }}℃</el-descriptions-item>
            <el-descriptions-item label="充电低温告警温度" v-if="batteryParameter.batterySetObj.chargingLowTemperatureAlarmTemperature">{{ batteryParameter.batterySetObj.chargingLowTemperatureAlarmTemperatureVal }}℃</el-descriptions-item>
            <el-descriptions-item label="放电高温告警温度" v-if="batteryParameter.batterySetObj.dischargeHighTemperatureAlarmTemperature">{{ batteryParameter.batterySetObj.dischargeHighTemperatureAlarmTemperatureVal }}℃</el-descriptions-item>
            <el-descriptions-item label="放电低温告警温度" v-if="batteryParameter.batterySetObj.dischargeLowTemperatureAlarmTemperature">{{ batteryParameter.batterySetObj.dischargeLowTemperatureAlarmTemperatureVal }}℃</el-descriptions-item>
            <el-descriptions-item label="MOS过温告警温度" v-if="batteryParameter.batterySetObj.mosOverTemperatureAlarmTemperature">{{ batteryParameter.batterySetObj.mosOverTemperatureAlarmTemperatureVal }}℃</el-descriptions-item>
            <el-descriptions-item label="MOS过温告警恢复温度" v-if="batteryParameter.batterySetObj.mosOverTemperatureAlarmRecoveryTemperature">{{ batteryParameter.batterySetObj.mosOverTemperatureAlarmRecoveryTemperatureVal }}℃</el-descriptions-item>
            <el-descriptions-item label="电芯不均衡告警压差" v-if="batteryParameter.batterySetObj.batteryImbalanceAlarmPressureDifference">{{ batteryParameter.batterySetObj.batteryImbalanceAlarmPressureDifferenceVal }}mV</el-descriptions-item>
            <el-descriptions-item label="不均衡告警恢复压差" v-if="batteryParameter.batterySetObj.imbalanceAlarmRecoveryPressureDifference">{{ batteryParameter.batterySetObj.imbalanceAlarmRecoveryPressureDifferenceVal }}mV</el-descriptions-item>
            <el-descriptions-item label="环境高温告警" v-if="batteryParameter.batterySetObj.environmentalHighTemperatureAlarm">{{ batteryParameter.batterySetObj.environmentalHighTemperatureAlarmVal }}℃</el-descriptions-item>
            <el-descriptions-item label="环境低温告警" v-if="batteryParameter.batterySetObj.environmentalLowTemperatureAlarm">{{ batteryParameter.batterySetObj.environmentalLowTemperatureAlarmVal }}℃</el-descriptions-item>
            <el-descriptions-item label="SOC低告警" v-if="batteryParameter.batterySetObj.socLowAlarm">{{ batteryParameter.batterySetObj.socLowAlarmVal }}%</el-descriptions-item>
            <el-descriptions-item label="充电限流功能" v-if="batteryParameter.batterySetObj.chargingCurrentLimitingFunction">
              {{ batteryParameter.batterySetObj.chargingCurrentLimitingFunctionVal == 1 ? '启用' : '禁用' }}
            </el-descriptions-item>
            <el-descriptions-item label="掉电电压" v-if="batteryParameter.batterySetObj.powerDownVoltage">{{ batteryParameter.batterySetObj.powerDownVoltageVal }}mV</el-descriptions-item>
            <el-descriptions-item label="掉电电流" v-if="batteryParameter.batterySetObj.powerDownCurrent">{{ batteryParameter.batterySetObj.powerDownCurrentVal }}A</el-descriptions-item>
            <el-descriptions-item label="掉电延时" v-if="batteryParameter.batterySetObj.powerDownDelay">{{ batteryParameter.batterySetObj.powerDownDelayVal }}min</el-descriptions-item>
            <el-descriptions-item label="每月自放电率" v-if="batteryParameter.batterySetObj.monthlySelfDischargeRate">{{ batteryParameter.batterySetObj.monthlySelfDischargeRateVal }}%</el-descriptions-item>
            <el-descriptions-item label="循环1次容量比" v-if="batteryParameter.batterySetObj.cycle1CapacityRatio">{{ batteryParameter.batterySetObj.cycle1CapacityRatioVal }}%</el-descriptions-item>
            <el-descriptions-item label="SOC 0%单体电压" v-if="batteryParameter.batterySetObj.soc0PercentMonomerVoltage">{{ batteryParameter.batterySetObj.soc0PercentMonomerVoltageVal }}mV</el-descriptions-item>
            <el-descriptions-item label="每循1次满容量衰减" v-if="batteryParameter.batterySetObj.fullCapacityAttenuationOncePerCycle">{{ batteryParameter.batterySetObj.fullCapacityAttenuationOncePerCycleVal }}%</el-descriptions-item>
            <el-descriptions-item label="通讯地址" v-if="batteryParameter.batterySetObj.communicateAddress">{{ batteryParameter.batterySetObj.communicateAddressVal }}</el-descriptions-item>
            <el-descriptions-item label="自定义参数1" v-if="batteryParameter.batterySetObj.customParameters1">{{ batteryParameter.batterySetObj.customParameters1Val }}</el-descriptions-item>
            <el-descriptions-item label="自定义参数2" v-if="batteryParameter.batterySetObj.customParameters2">{{ batteryParameter.batterySetObj.customParameters2Val }}</el-descriptions-item>
            <el-descriptions-item label="自定义参数3" v-if="batteryParameter.batterySetObj.customParameters3">{{ batteryParameter.batterySetObj.customParameters3Val }}</el-descriptions-item>
            <el-descriptions-item label="自定义参数4" v-if="batteryParameter.batterySetObj.customParameters4">{{ batteryParameter.batterySetObj.customParameters4Val }}</el-descriptions-item>
            <el-descriptions-item label="自定义参数5" v-if="batteryParameter.batterySetObj.customParameters5">{{ batteryParameter.batterySetObj.customParameters5Val }}</el-descriptions-item>
            <el-descriptions-item label="自定义参数6" v-if="batteryParameter.batterySetObj.customParameters6">{{ batteryParameter.batterySetObj.customParameters6Val }}</el-descriptions-item>
            <el-descriptions-item label="自定义参数7" v-if="batteryParameter.batterySetObj.customParameters7">{{ batteryParameter.batterySetObj.customParameters7Val }}</el-descriptions-item>
            <el-descriptions-item label="自定义参数8" v-if="batteryParameter.batterySetObj.customParameters8">{{ batteryParameter.batterySetObj.customParameters8Val }}</el-descriptions-item>
            <el-descriptions-item label="自定义状态1" v-if="batteryParameter.batterySetObj.customStatus1">{{ batteryParameter.batterySetObj.customStatus1Val }}</el-descriptions-item>
            <el-descriptions-item label="自定义状态2" v-if="batteryParameter.batterySetObj.customStatus2">{{ batteryParameter.batterySetObj.customStatus2Val }}</el-descriptions-item>
            <el-descriptions-item label="放电/静置加热使能" v-if="batteryParameter.batterySetObj.dischargeStaticHeatingEnable">{{ batteryParameter.batterySetObj.dischargeStaticHeatingEnableVal }}</el-descriptions-item>
            <el-descriptions-item label="解锁系统锁" v-if="batteryParameter.batterySetObj.unlockSystemLock">
              {{ batteryParameter.batterySetObj.unlockSystemLockVal == 1 ? '解锁' : '无效' }}
            </el-descriptions-item>
            <el-descriptions-item label="放电开启加热温度" v-if="batteryParameter.batterySetObj.dischargeOnHeatingTemperature">{{ batteryParameter.batterySetObj.dischargeOnHeatingTemperatureVal }}℃</el-descriptions-item>
            <el-descriptions-item label="放电关闭加热温度" v-if="batteryParameter.batterySetObj.dischargeOffHeatingTemperature">{{ batteryParameter.batterySetObj.dischargeOffHeatingTemperatureVal }}℃</el-descriptions-item>
          </el-descriptions>
        </el-card>
      </template>

      <template v-else-if="activeIndex === '0'">
        <SelfTest ref="selfTest" />
      </template>
      </div>
      

    </basic-container>
  </div>
</template>

<script>
import { getConfigData, saveConfigData } from '@/api/device'
import SelfTest from './selfTest.vue'
import { baseMqtt } from "@/config/env"
const mqtt = require("mqtt/dist/mqtt.js");
export default {
  components: { SelfTest },
  data() {
    return {
      deviceInfo: {},
      activeIndex: '7',
      loading: false,
      // mqtt
      mqttClient: null,
      connectState: "init",
      interObj: null,
      // 配置参数
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
          maximumDischargeCurrentAllowedByTheInverterForTheBattery: false
        }
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
          systemTimeVal: '',
          communicationProtocolTypeVal: '',
          dailyPowerGenerationCalibrationVal: '',
          totalPowerGenerationCalibrationVal: '',
          clearElectricityConsumptionDataVal: '',
          clearPowerGenerationDataVal: '',
          bootCommandVal: '',
          shutdownCommandVal: '',
          cancelShutdownCommandVal: '',
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
          bmsModelVal: '',
          bmsAddressVal: '',
          bmsBaudVal: '',
          numberOfLithiumBatteryBlocksVal: '',
          collectorCommunicationAddressVal: '',
          collectorCommunicationProtocolTypeVal: '',
          baudOfCollectorCommunicationVal: '',
          deviceCommunicationAddressVal: '',
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
          parallelOffGridModeVal: '',
          systemModeSetVal: '',
          pvConnectionSetVal: '',
          ratedOutputVoltageSetVal: '',
          ratedOutputFrequencySetVal: '',
          batteryTypeSetVal: '',
          batteryChargingCurrentVal: '',
          batteryDischargeCurrentVal: '',
          batteryAverageChargingVoltageVal: '',
          batteryFloatChargingVoltageVal: '',
          batteryEodVal: '',
          batteryDodVal: '',
          lowerLimitOfGridConnectedSocVal: '',
          offGridSocLowerLimitVal: '',
          electricityMeterCtVal: '',
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
          selfInspectionThresholdForOvervoltageInTheFirstSectionOfThePowerGridVal: '',
          powerGridOvervoltageSelfCheckTimeVal: '',
          thresholdForOvervoltageSelfCheckInSection2OfThePowerGridVal: '',
          powerGridSection2OvervoltageSelfCheckTimeVal: '',
          underVoltageSelfCheckThresholdOfTheFirstSectionOfThePowerGridVal: '',
          powerGridUndervoltageSelfCheckTimeVal: '',
          underVoltageSelfCheckThresholdOfTheSecondSectionOfThePowerGridVal: '',
          underVoltageSelfCheckTimeOfTheSecondSectionOfThePowerGridVal: '',
          thresholdForSelfCheckOfOverFrequencyInTheFirstSectionOfThePowerGridVal: '',
          selfInspectionTimeForPeriodOfOverfrequencyInThePowerGridVal: '',
          gridSection2OverfrequencySelfTestThresholdVal: '',
          powerGridSection2OverFrequencySelfCheckTimeVal: '',
          underFrequencySelfCheckThresholdForTheFirstSectionOfThePowerGridVal: '',
          powerGridUnderfrequencySelfCheckTimeVal: '',
          underFrequencySelfCheckThresholdOfTheSecondSectionOfThePowerGridVal: '',
          underFrequencySelfCheckTimeOfTheSecondSectionOfThePowerGridVal: '',
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
          resetDeviceCommunicationSettingsToInitialValuesVal: '',
          clearRecordDataVal: '',
          factoryResetVal: '',
          inverterRestartVal: '',
          selfCheckEnableVal: '',
          manuallyClearingFaultsVal: '',
          automaticOperationVal: '',
          manuallyUnlockingTheSystemLockVal: '',
          deviceCommunicationBaudVal: '',
          deviceCommunicationCheckBitSelectionVal: '',
          deviceCommunicationStopBitSelectionVal: '',
          countdownToTurnOffTheInverterVal: '',
          delayedStartInverterVal: '',
          countryCodeVal: '',
          systemTimeSettingVal: '',
          inverterActivePowerSettingVal: '',
          communicationProtocolType485Val: '',
          communicationAddress485Val: '',
          communicationBaud485Val: '',
          hardLimitEnableVal: '',
          hardLimitPowerSettingValueVal: '',
          australianRegionSelectionVal: '',
          bluetoothConnectionFlagVal: '',
          pvActivePowerSettingVal: '',
          limitOfActivePowerChangeRateVal: '',
          islandDetectionEnableVal: '',
          authenticationModeVal: '',
          currentSystemOperationModeControlSourceVal: '',
          currentOperatingModeOfTheSystemVal: '',
          appStartupFlagVal: '',
          buzzerResponseTimeVal: '',
          communicationTypeVal: '',
          systemModeSettingsVal: '',
          usbOperationVal: '',
          powerFactorVal: '',
          antiBackflowPowerPercentageVal: '',
          maximumOutputPowerPercentageVal: '',
          powerSettingAdjustmentRateVal: '',
          gridConnectedPowerSoftStartRateVal: '',
          reactivePowerControlModeVal: '',
          reactivePowerRegulationRateVal: '',
          upperLimitValueOfGridVoltageProtection1Val: '',
          upperLimitValueOfGridVoltageProtection2Val: '',
          upperLimitValueOfGridVoltageProtection3Val: '',
          lowerLimitValueOfGridVoltageProtection1Val: '',
          lowerLimitValueOfGridVoltageProtection2Val: '',
          lowerLimitValueOfGridVoltageProtection3Val: '',
          upperLimitValueOfGridVoltageReconnectionVal: '',
          lowerLimitValueOfGridVoltageReconnectionVal: '',
          upperLimitTimeOfGridVoltageProtection1Val: '',
          upperLimitTimeOfGridVoltageProtection2Val: '',
          upperLimitTimeOfGridVoltageProtection3Val: '',
          lowerLimitTimeOfGridVoltageProtection1Val: '',
          lowerLimitTimeOfGridVoltageProtection2Val: '',
          lowerLimitTimeOfGridVoltageProtection3Val: '',
          recoveryTimeOfGridVoltageProtectionVal: '',
          upperLimitValueOfGridFrequencyProtection1Val: '',
          upperLimitValueOfGridFrequencyProtection2Val: '',
          upperLimitValueOfGridFrequencyProtection3Val: '',
          lowerLimitValueOfGridFrequencyProtection1Val: '',
          lowerLimitValueOfGridFrequencyProtection2Val: '',
          lowerLimitValueOfGridFrequencyProtection3Val: '',
          upperLimitValueOfGridFrequencyReconnectionVal: '',
          lowerLimitValueOfGridFrequencyReconnectionVal: '',
          gridFrequencyProtectionUpperLimitTime1Val: '',
          gridFrequencyProtectionUpperLimitTime2Val: '',
          gridFrequencyProtectionUpperLimitTime3Val: '',
          gridFrequencyProtectionLowerLimitTime1Val: '',
          gridFrequencyProtectionLowerLimitTime2Val: '',
          gridFrequencyProtectionLowerLimitTime3Val: '',
          recoveryTimeOfGridFrequencyProtectionVal: '',
          tenMinOvervoltageProtectionValueOfThePowerGridVal: '',
          networkingWaitingTimeVal: '',
          reconnectWaitingTimeVal: '',
          coldModeVal: '',
          reactivePowerPercentageVal: '',
          freqWattCurveEnableVal: '',
          voltWattCurveEnableVal: '',
          voltVarCurveEnableVal: '',
          pfWattCurveEnableVal: '',
          timingModeTypeVal: '',
          setQuantityChangeRegister1Val: '',
          setQuantityChangeRegister2Val: '',
          setQuantityChangeRegister3Val: '',
          setQuantityChangeRegister4Val: '',
          setQuantityChangeRegister5Val: '',
          setQuantityChangeRegister6Val: '',
          setQuantityChangeRegister7Val: '',
          setQuantityChangeRegister8Val: '',
          batteryParameterDisplayMethodVal: '',
          theBatteryIdOfTheCurrentDisplayedParameterVal: '',
          mosControlVal: '',
          gpsCommunicationModulePowerControlVal: '',
          realTimeClockVal: ''
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
          dischargeOffHeatingTemperature: false
        }
      },
    }
  },
  
  methods: {
    handleSave(key, val) {
      saveConfigData({
        deviceId: this.deviceInfo.id,
        paramSetList: [{ dataVal: val, key: key }],
      }).then(res => {
        this.$message.success('保存成功')
      })
    },
    init(info) {
      console.log('init', info)
      this.deviceInfo = { ...info }
      if (this.deviceInfo.onlineStatus === 1) {
        this.handleMqttInit()
      } else {
        this.$message.info('设备不在线')
      }
    },
    handleSelect(index) {
      if (this.deviceInfo.onlineStatus === 1) {
        this.activeIndex = index
        if (index === '0') {
          this.$nextTick(() => {
            this.$refs.selfTest.init(this.deviceInfo)
          })
        } else {
          this.getData()
        }
      } else {
        this.$message.info('设备不在线')
      }
    },
    goBack() {
      this.$emit('back')
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
        console.log('topic', topic)
        const messageInfo = JSON.parse(message.toString());
        console.log('设备信息',  messageInfo)
        if (this.activeIndex === '0') {
          this.$refs.selfTest.initMqttData(messageInfo)
        } else {
          if (messageInfo.msgOperation === 5) {
            this.loading = false
            console.log('dataList', JSON.parse(messageInfo.val))
            this.paramsChange(JSON.parse(messageInfo.val))
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
          this.getData()
        }
      })
    },
    // 数据处理转换
    paramsChange(res) {
      res.forEach(item => {
        if (item.key === 'operationInformation' && this.activeIndex === '7') {
          this.operationInformation.isShow = item.isShow === 1
          item.dataList && item.dataList.forEach(i => {
            this.operationInformation[`${i.key}`] = i.isShow === 1
            i.dataList.forEach(j => {
              this.operationInformation[`${i.key}Obj`][`${j.key}`] = j.isShow === 1
              this.operationInformation[`${i.key}Obj`][`${j.key}Val`] = j.val
            })
          })
          console.log('this.operationInformation', this.operationInformation)
        } else if (item.key === 'systemSet' && this.activeIndex === '8') {
          this.systemSet.isShow = item.isShow === 1
          item.dataList && item.dataList.forEach(i => {
            this.systemSet[`${i.key}`] = i.isShow === 1
            i.dataList.forEach(j => {
              this.systemSet[`${i.key}Obj`][`${j.key}`] = j.isShow === 1
              this.systemSet[`${i.key}Obj`][`${j.key}Val`] = j.val
            })
          })
          console.log('this.systemSet', this.systemSet)
        } else if (item.key === 'batteryParameter' && this.activeIndex === '9') {
          this.batteryParameter.isShow = item.isShow === 1
          item.dataList && item.dataList.forEach(i => {
            this.batteryParameter[`${i.key}`] = i.isShow === 1
            i.dataList.forEach(j => {
              this.batteryParameter[`${i.key}Obj`][`${j.key}`] = j.isShow === 1
              this.batteryParameter[`${i.key}Obj`][`${j.key}Val`] = j.val
            })
          })
          console.log('this.batteryParameter', this.batteryParameter)
        }
      })
    },
    getData() {
      this.loading = true
      getConfigData({ deviceId: this.deviceInfo.id, val: Number(this.activeIndex) }).catch(() => {
        this.loading = false
      })
    },
  },
  beforeDestroy() {
    console.log("页面卸载了====关闭mqtt客户端连接");
    if (this.mqttClient) {
      this.mqttClient.end(true);
      this.mqttClient = null;
      this.connectState = "init"
      this.interObj && clearInterval(this.interObj)
    }
  },
}
</script>

<style lang="scss">
.realTime {
  .el-descriptions-item__container {
    align-items: center !important;
  }
}

</style>