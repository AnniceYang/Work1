<template>
  <div class="app-container realTime">
    <basic-container>
      <el-page-header @back="goBack" :content="$t('deviceManage.deviceDetails')"></el-page-header>

      <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
        <el-menu-item index="7">{{$t('deviceManage.operationInformation')}}</el-menu-item>
        <el-menu-item index="8">{{$t('deviceManage.systemSettings')}}</el-menu-item>
        <el-menu-item index="9">{{$t('deviceManage.batteryParameters')}}</el-menu-item>
        <el-menu-item index="0">{{$t('deviceManage.selfTest')}}</el-menu-item>
      </el-menu>
      <div v-loading="loading">
      <el-card  style="margin-top: 20px;">
        <el-descriptions :title="$t('deviceManage.deviceInformation')" :column="3">
          <el-descriptions-item :label="$t('deviceManage.deviceName')">{{ deviceInfo.name }}</el-descriptions-item>
          <el-descriptions-item :label="$t('deviceManage.snCode')">{{ deviceInfo.sn }}</el-descriptions-item>
          <el-descriptions-item :label="$t('deviceManage.deviceStatus')">{{ deviceInfo.status | devStatusFilter }}</el-descriptions-item>
          <el-descriptions-item :label="$t('common.createTime')">{{ deviceInfo.createTime | parseTime }}</el-descriptions-item>
        </el-descriptions>
      </el-card>

      <template v-if="activeIndex === '7'">
        <el-card style="margin-top: 10px;" v-if="operationInformation.runInformation">
          <el-descriptions :title="$t('deviceManage.operationInformation')" :column="3">
            <el-descriptions-item :label="$t('deviceManage.displayType')" v-if="operationInformation.runInformationObj.displayType">
              {{ operationInformation.runInformationObj.displayTypeVal | displayTypeValFilter }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.MCUSoftwareVersion')" v-if="operationInformation.runInformationObj.mcuSoftwareVersion">{{ operationInformation.runInformationObj.mcuSoftwareVersionVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.DSPSoftwareVersion')" v-if="operationInformation.runInformationObj.dspSoftwareVersion">{{ operationInformation.runInformationObj.dspSoftwareVersionVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.MCUHardwareVersion')" v-if="operationInformation.runInformationObj.mcuHardwareVersion">{{ operationInformation.runInformationObj.mcuHardwareVersionVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.DSPHardwareVersion')" v-if="operationInformation.runInformationObj.dspHardwareVersion">{{ operationInformation.runInformationObj.dspHardwareVersionVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.currentModeOfTheSystem')" v-if="operationInformation.runInformationObj.currentModeOfTheSystem">
              {{ operationInformation.runInformationObj.currentModeOfTheSystemVal | systemModeFilter }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.systemOperationStatus')" v-if="operationInformation.runInformationObj.systemRunStatus">
              {{ operationInformation.runInformationObj.systemRunStatusVal | systemStateFilter }}
            </el-descriptions-item>
          </el-descriptions>
        </el-card>

        <el-card style="margin-top: 10px;" v-if="operationInformation.basicInformation">
          <el-descriptions :title="$t('deviceManage.basicInformation')" :column="3">
            <el-descriptions-item :label="$t('deviceManage.dcdcTemperature')" v-if="operationInformation.basicInformationObj.dcdcTemperature">{{ operationInformation.basicInformationObj.dcdcTemperatureVal }}℃</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.countryCode')" v-if="operationInformation.basicInformationObj.countryCode">
              {{ operationInformation.basicInformationObj.countryCodeVal | countryCodeValFilter }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.busbarVoltage')" v-if="operationInformation.basicInformationObj.busVoltage">{{ operationInformation.basicInformationObj.busVoltageVal }}V</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.dailyPowerGeneration')" v-if="operationInformation.basicInformationObj.dailyPowerGeneration">{{ operationInformation.basicInformationObj.dailyPowerGenerationVal }}kWh</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.totalPowerGeneration')" v-if="operationInformation.basicInformationObj.totalPowerGeneration">{{ operationInformation.basicInformationObj.totalPowerGenerationVal }}kWh</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.ratedPower')" v-if="operationInformation.basicInformationObj.ratedPower">{{ operationInformation.basicInformationObj.ratedPowerVal }}KW</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.batteryEnergy')" v-if="operationInformation.basicInformationObj.batteryEnergy">{{ operationInformation.basicInformationObj.batteryEnergyVal }}kWh</el-descriptions-item>
          </el-descriptions>
        </el-card>

        <el-card style="margin-top: 10px;" v-if="operationInformation.pvInformation">
          <el-descriptions :title="$t('deviceManage.pvInformation')" :column="3" >
            <el-descriptions-item :label="$t('deviceManage.pv1Voltage')" v-if="operationInformation.pvInformationObj.pv1Voltage">{{ operationInformation.pvInformationObj.pv1VoltageVal }}V</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.pv1Current')" v-if="operationInformation.pvInformationObj.pv1Current">{{ operationInformation.pvInformationObj.pv1CurrentVal }}A</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.pv1Power')" v-if="operationInformation.pvInformationObj.pv1Power">{{ operationInformation.pvInformationObj.pv1PowerVal }}W</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.pv2Voltage')" v-if="operationInformation.pvInformationObj.pv2Voltage">{{ operationInformation.pvInformationObj.pv2VoltageVal }}V</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.pv2Current')" v-if="operationInformation.pvInformationObj.pv2Current">{{ operationInformation.pvInformationObj.pv2CurrentVal }}A</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.pv2Power')" v-if="operationInformation.pvInformationObj.pv2Power">{{ operationInformation.pvInformationObj.pv2PowerVal }}W</el-descriptions-item>
          </el-descriptions>
        </el-card>

        <el-card style="margin-top: 10px;" v-if="operationInformation.batteryInformation">
          <el-descriptions :title="$t('deviceManage.batteryInfo')" :column="3">
            <el-descriptions-item :label="$t('deviceManage.batteryStatus')" v-if="operationInformation.batteryInformationObj.batteryStatus">
              {{ operationInformation.batteryInformationObj.batteryStatusVal | batteryStatusFilter }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.batteryVoltage')" v-if="operationInformation.batteryInformationObj.batteryVoltage">{{ operationInformation.batteryInformationObj.batteryVoltageVal }}V</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.batteryCurrent')" v-if="operationInformation.batteryInformationObj.batteryCurrent">{{ operationInformation.batteryInformationObj.batteryCurrentVal }}A</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.batteryPower')" v-if="operationInformation.batteryInformationObj.batteryPower">{{ operationInformation.batteryInformationObj.batteryPowerVal }}W</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.batteryTotalSoc')" v-if="operationInformation.batteryInformationObj.batteryTotalSoc">{{ operationInformation.batteryInformationObj.batteryTotalSocVal }}%</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.BMSlogo')" v-if="operationInformation.batteryInformationObj.bmsSign">
              {{ operationInformation.batteryInformationObj.bmsSignVal | BMSFilter }}
            </el-descriptions-item>
          </el-descriptions>
        </el-card>


        <el-card style="margin-top: 10px;" v-if="operationInformation.powerGridInformation">
          <el-descriptions :title="$t('deviceManage.powerGridInformation')" :column="3">
            <el-descriptions-item :label="$t('deviceManage.powerGridStatus')" v-if="operationInformation.powerGridInformationObj.powerGridStatus">
              {{ operationInformation.powerGridInformationObj.powerGridStatusVal | GridStateFilter }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.phaseAGridFrequency')" v-if="operationInformation.powerGridInformationObj.gridFrequencyA">{{ operationInformation.powerGridInformationObj.gridFrequencyAVal }}Hz</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.phaseBGridFrequency')" v-if="operationInformation.powerGridInformationObj.gridFrequencyB">{{ operationInformation.powerGridInformationObj.gridFrequencyBVal }}Hz</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.phaseCGridFrequency')" v-if="operationInformation.powerGridInformationObj.gridFrequencyC">{{ operationInformation.powerGridInformationObj.gridFrequencyCVal }}Hz</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.phaseAGridVoltage')" v-if="operationInformation.powerGridInformationObj.gridVoltageA">{{ operationInformation.powerGridInformationObj.gridVoltageAVal }}V</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.phaseBGridVoltage')" v-if="operationInformation.powerGridInformationObj.gridVoltageB">{{ operationInformation.powerGridInformationObj.gridVoltageBVal }}V</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.phaseCGridVoltage')" v-if="operationInformation.powerGridInformationObj.gridVoltageC">{{ operationInformation.powerGridInformationObj.gridVoltageCVal }}V</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.apparentPowerOfThePowerGrid')" v-if="operationInformation.powerGridInformationObj.apparentPowerOfThePowerGrid">{{ operationInformation.powerGridInformationObj.apparentPowerOfThePowerGridVal }}VA</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.gridActivePower')" v-if="operationInformation.powerGridInformationObj.activePowerOfThePowerGrid">{{ operationInformation.powerGridInformationObj.activePowerOfThePowerGridVal }}W</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.reactivePowerOfThePowerGrid')" v-if="operationInformation.powerGridInformationObj.reactivePowerOfThePowerGrid">{{ operationInformation.powerGridInformationObj.reactivePowerOfThePowerGridVal }}VAR</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.ctCurrent')" v-if="operationInformation.powerGridInformationObj.ctCurrent">{{ operationInformation.powerGridInformationObj.ctCurrentVal }}A</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.ctPower')" v-if="operationInformation.powerGridInformationObj.ctPower">{{ operationInformation.powerGridInformationObj.ctPowerVal }}W</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.CTDirection')" v-if="operationInformation.powerGridInformationObj.ctDirection">
              {{ operationInformation.powerGridInformationObj.ctDirectionVal | CTFilter }}
            </el-descriptions-item>
          </el-descriptions>
        </el-card>

        <el-card style="margin-top: 10px;" v-if="operationInformation.inverterInformation">
          <el-descriptions :title="$t('deviceManage.inverterInformation')" :column="3">
            <el-descriptions-item :label="$t('deviceManage.inverterSideTemperature')" v-if="operationInformation.inverterInformationObj.inverterTemperature">{{ operationInformation.inverterInformationObj.inverterTemperatureVal }}℃</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.inversionState')" v-if="operationInformation.inverterInformationObj.inversionState">
              {{ operationInformation.inverterInformationObj.inversionStateVal | invertingStateFilter }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.phaseAInverterOutputFrequency')" v-if="operationInformation.inverterInformationObj.inverterOutputFrequencyA">{{ operationInformation.inverterInformationObj.inverterOutputFrequencyAVal }}Hz</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.phaseBInverterOutputFrequency')" v-if="operationInformation.inverterInformationObj.inverterOutputFrequencyB">{{ operationInformation.inverterInformationObj.inverterOutputFrequencyBVal }}Hz</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.phaseCInverterOutputFrequency')" v-if="operationInformation.inverterInformationObj.inverterOutputFrequencyC">{{ operationInformation.inverterInformationObj.inverterOutputFrequencyCVal }}Hz</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.phaseAInverterOutputVoltage')" v-if="operationInformation.inverterInformationObj.inverterOutputVoltageA">{{ operationInformation.inverterInformationObj.inverterOutputVoltageAVal }}V</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.phaseBInverterOutputVoltage')" v-if="operationInformation.inverterInformationObj.inverterOutputVoltageB">{{ operationInformation.inverterInformationObj.inverterOutputVoltageBVal }}V</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.phaseCInverterOutputVoltage')" v-if="operationInformation.inverterInformationObj.inverterOutputVoltageC">{{ operationInformation.inverterInformationObj.inverterOutputVoltageCVal }}V</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.phaseAInverterOutputCurrent')" v-if="operationInformation.inverterInformationObj.inverterOutputCurrentA">{{ operationInformation.inverterInformationObj.inverterOutputCurrentAVal }}A</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.phaseBInverterOutputCurrent')" v-if="operationInformation.inverterInformationObj.inverterOutputCurrentB">{{ operationInformation.inverterInformationObj.inverterOutputCurrentBVal }}A</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.phaseCInverterOutputCurrent')" v-if="operationInformation.inverterInformationObj.inverterOutputCurrentC">{{ operationInformation.inverterInformationObj.inverterOutputCurrentCVal }}A</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.phaseAInverterApparentPower')" v-if="operationInformation.inverterInformationObj.invertedApparentPowerA">{{ operationInformation.inverterInformationObj.invertedApparentPowerAVal }}VA</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.phaseBInverterApparentPower')" v-if="operationInformation.inverterInformationObj.invertedApparentPowerB">{{ operationInformation.inverterInformationObj.invertedApparentPowerBVal }}VA</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.phaseCInverterApparentPower')" v-if="operationInformation.inverterInformationObj.invertedApparentPowerC">{{ operationInformation.inverterInformationObj.invertedApparentPowerCVal }}VA</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.phaseAInverterActivePower')" v-if="operationInformation.inverterInformationObj.invertedActivePowerA">{{ operationInformation.inverterInformationObj.invertedActivePowerAVal }}W</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.phaseBInverterActivePower')" v-if="operationInformation.inverterInformationObj.invertedActivePowerB">{{ operationInformation.inverterInformationObj.invertedActivePowerBVal }}W</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.phaseCInverterActivePower')" v-if="operationInformation.inverterInformationObj.invertedActivePowerC">{{ operationInformation.inverterInformationObj.invertedActivePowerCVal }}W</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.phaseAInverterReactivePower')" v-if="operationInformation.inverterInformationObj.invertedReactivePowerA">{{ operationInformation.inverterInformationObj.invertedReactivePowerAVal }}VAR</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.phaseAInverterReactivePower')" v-if="operationInformation.inverterInformationObj.invertedReactivePowerB">{{ operationInformation.inverterInformationObj.invertedReactivePowerBVal }}VAR</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.phaseAInverterReactivePower')" v-if="operationInformation.inverterInformationObj.invertedReactivePowerC">{{ operationInformation.inverterInformationObj.invertedReactivePowerCVal }}VAR</el-descriptions-item>
          </el-descriptions>
        </el-card>

        <el-card style="margin-top: 10px;" v-if="operationInformation.loadInformation">
          <el-descriptions :title="$t('deviceManage.loadInformation')" :column="3">
            <el-descriptions-item :label="$t('deviceManage.phaseALoadVoltage')" v-if="operationInformation.loadInformationObj.loadVoltageA">{{ operationInformation.loadInformationObj.loadVoltageAVal }}V</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.phaseBLoadVoltage')" v-if="operationInformation.loadInformationObj.loadVoltageB">{{ operationInformation.loadInformationObj.loadVoltageBVal }}V</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.phaseCLoadVoltage')" v-if="operationInformation.loadInformationObj.loadVoltageC">{{ operationInformation.loadInformationObj.loadVoltageCVal }}V</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.phaseALoadCurrent')" v-if="operationInformation.loadInformationObj.loadCurrentA">{{ operationInformation.loadInformationObj.loadCurrentAVal }}A</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.phaseBLoadCurrent')" v-if="operationInformation.loadInformationObj.loadCurrentB">{{ operationInformation.loadInformationObj.loadCurrentBVal }}A</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.phaseCLoadCurrent')" v-if="operationInformation.loadInformationObj.loadCurrentC">{{ operationInformation.loadInformationObj.loadCurrentCVal }}A</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.apparentPowerOfPhaseALoad')" v-if="operationInformation.loadInformationObj.apparentPowerOfLoadA">{{ operationInformation.loadInformationObj.apparentPowerOfLoadAVal }}VA</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.apparentPowerOfPhaseBLoad')" v-if="operationInformation.loadInformationObj.apparentPowerOfLoadB">{{ operationInformation.loadInformationObj.apparentPowerOfLoadBVal }}VA</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.apparentPowerOfPhaseCLoad')" v-if="operationInformation.loadInformationObj.apparentPowerOfLoadC">{{ operationInformation.loadInformationObj.apparentPowerOfLoadCVal }}VA</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.phaseALoadActivePower')" v-if="operationInformation.loadInformationObj.loadActivePowerA">{{ operationInformation.loadInformationObj.loadActivePowerAVal }}W</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.phaseBLoadActivePower')" v-if="operationInformation.loadInformationObj.loadActivePowerB">{{ operationInformation.loadInformationObj.loadActivePowerBVal }}W</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.phaseCLoadActivePower')" v-if="operationInformation.loadInformationObj.loadActivePowerC">{{ operationInformation.loadInformationObj.loadActivePowerCVal }}W</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.phaseALoadPowerPercentage')" v-if="operationInformation.loadInformationObj.loadPowerPercentageA">{{ operationInformation.loadInformationObj.loadPowerPercentageAVal }}%</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.phaseBLoadPowerPercentage')" v-if="operationInformation.loadInformationObj.loadPowerPercentageB">{{ operationInformation.loadInformationObj.loadPowerPercentageBVal }}%</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.phaseCLoadPowerPercentage')" v-if="operationInformation.loadInformationObj.loadPowerPercentageC">{{ operationInformation.loadInformationObj.loadPowerPercentageCVal }}%</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.loadRealTimePower')" v-if="operationInformation.loadInformationObj.realTimePowerOfLoad">{{ operationInformation.loadInformationObj.realTimePowerOfLoadVal }}W</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.powerConsumption')" v-if="operationInformation.loadInformationObj.powerConsumption">{{ operationInformation.loadInformationObj.powerConsumptionVal }}kWh</el-descriptions-item>
          </el-descriptions>
        </el-card>

        <el-card style="margin-top: 10px;" v-if="operationInformation.electricityMeterInformation">
          <el-descriptions :title="$t('deviceManage.electricityMeterInformation')" :column="3">
            <el-descriptions-item :label="$t('deviceManage.normalIndicatorOfElectricityMeter')" v-if="operationInformation.electricityMeterInformationObj.normalIndicatorOfElectricityMeter">
              {{ operationInformation.electricityMeterInformationObj.normalIndicatorOfElectricityMeterVal | meterNormalFilter }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.meterVoltage')" v-if="operationInformation.electricityMeterInformationObj.meterVoltage">{{ operationInformation.electricityMeterInformationObj.meterVoltageVal }}V</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.currentCombinedActiveEnergy')" v-if="operationInformation.electricityMeterInformationObj.currentCombinedActiveEnergy">{{ operationInformation.electricityMeterInformationObj.currentCombinedActiveEnergyVal }}kWh</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.currentPositiveActiveEnergy')" v-if="operationInformation.electricityMeterInformationObj.currentPositiveActiveEnergy">{{ operationInformation.electricityMeterInformationObj.currentPositiveActiveEnergyVal }}kWh</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.currentReverseActiveEnergy')" v-if="operationInformation.electricityMeterInformationObj.currentReverseActiveEnergy">{{ operationInformation.electricityMeterInformationObj.currentReverseActiveEnergyVal }}kWh</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.meterCurrent')" v-if="operationInformation.electricityMeterInformationObj.electricityMeterCurrent">{{ operationInformation.electricityMeterInformationObj.electricityMeterCurrentVal }}A</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.meterPower')" v-if="operationInformation.electricityMeterInformationObj.electricityMeterPower">{{ operationInformation.electricityMeterInformationObj.electricityMeterPowerVal }}W</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.meterPowerFactor')" v-if="operationInformation.electricityMeterInformationObj.electricityMeterPowerFactor">{{ operationInformation.electricityMeterInformationObj.electricityMeterPowerFactorVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.meterFrequency')" v-if="operationInformation.electricityMeterInformationObj.electricityMeterFrequency">{{ operationInformation.electricityMeterInformationObj.electricityMeterFrequencyVal }}Hz</el-descriptions-item>
          </el-descriptions>
        </el-card>

        <el-card style="margin-top: 10px;" v-if="operationInformation.otherInformation">
          <el-descriptions :title="$t('deviceManage.otherInformation')" :column="2">
            <el-descriptions-item :label="$t('deviceManage.selfInspectionStatus')" v-if="operationInformation.otherInformationObj.selfInspectionStatus">
              {{ operationInformation.otherInformationObj.selfInspectionStatusVal | selfCheckFilter }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.protectionThreshold')" v-if="operationInformation.otherInformationObj.selfCheckActualProtectionThreshold">
              {{ operationInformation.otherInformationObj.selfCheckActualProtectionThresholdVal }}V/Hz
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.protectionTime')" v-if="operationInformation.otherInformationObj.selfCheckActualProtectionTime">
              {{ operationInformation.otherInformationObj.selfCheckActualProtectionTimeVal }}ms
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.realTimeProtectionThreshold')" v-if="operationInformation.otherInformationObj.selfCheckRealTimeProtectionThreshold">
              {{ operationInformation.otherInformationObj.selfCheckRealTimeProtectionThresholdVal }}V/Hz
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.USBStatus')" v-if="operationInformation.otherInformationObj.usbStatus">
              {{ operationInformation.otherInformationObj.usbStatusVal | USBFilter }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.lineNumber1')" v-if="operationInformation.otherInformationObj.energyFlowOne">
              {{ operationInformation.otherInformationObj.energyFlowOneVal }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.lineNumber2')" v-if="operationInformation.otherInformationObj.energyFlowTwo">
              {{ operationInformation.otherInformationObj.energyFlowTwoVal | energyFlowFilter }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.switchNumber')" v-if="operationInformation.otherInformationObj.energyFlowThree">
              {{ operationInformation.otherInformationObj.energyFlowThreeVal }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.runTimeD')" v-if="operationInformation.otherInformationObj.runTimeDay">
              {{ operationInformation.otherInformationObj.runTimeDayVal }}d
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.runTimeH')" v-if="operationInformation.otherInformationObj.runTimeHour">
              {{ operationInformation.otherInformationObj.runTimeHourVal }}h
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.runTimeM')" v-if="operationInformation.otherInformationObj.runTimeMinute">
              {{ operationInformation.otherInformationObj.runTimeMinuteVal }}min
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.runTimeS')" v-if="operationInformation.otherInformationObj.runTimeSecond">
              {{ operationInformation.otherInformationObj.runTimeSecondVal }}s
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.dailyElectricityConsumption')" v-if="operationInformation.otherInformationObj.dailyElectricityConsumption">
              {{ operationInformation.otherInformationObj.dailyElectricityConsumptionVal }}kWh
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.accumulatedElectricityConsumption')" v-if="operationInformation.otherInformationObj.accumulatedElectricityConsumption">
              {{ operationInformation.otherInformationObj.accumulatedElectricityConsumptionVal }}kWh
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.dailyGridConnectionVolume')" v-if="operationInformation.otherInformationObj.dailyGridConnectionVolume">
              {{ operationInformation.otherInformationObj.dailyGridConnectionVolumeVal }}kWh
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.accumulatedGridConnectionQuantity')" v-if="operationInformation.otherInformationObj.accumulatedGridConnectionQuantity">
              {{ operationInformation.otherInformationObj.accumulatedGridConnectionQuantityVal }}kWh
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.dailyElectricityPurchase')" v-if="operationInformation.otherInformationObj.dailyElectricityPurchase">
              {{ operationInformation.otherInformationObj.dailyElectricityPurchaseVal }}kWh
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.accumulatedPurchasingPower')" v-if="operationInformation.otherInformationObj.accumulatedPurchasingPower">
              {{ operationInformation.otherInformationObj.accumulatedPurchasingPowerVal }}kWh
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.dailyChargingCapacity')" v-if="operationInformation.otherInformationObj.dailyChargingCapacity">
              {{ operationInformation.otherInformationObj.dailyChargingCapacityVal }}kWh
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.accumulatedChargingCapacity')" v-if="operationInformation.otherInformationObj.accumulatedChargingCapacity">
              {{ operationInformation.otherInformationObj.accumulatedChargingCapacityVal }}kWh
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.dailyDischargeCapacity')" v-if="operationInformation.otherInformationObj.dailyDischargeCapacity">
              {{ operationInformation.otherInformationObj.dailyDischargeCapacityVal }}kWh
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.accumulatedDischargeCapacity')" v-if="operationInformation.otherInformationObj.accumulatedDischargeCapacity">
              {{ operationInformation.otherInformationObj.accumulatedDischargeCapacityVal }}kWh
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.leakageCurrent')" v-if="operationInformation.otherInformationObj.leakageCurrent">
              {{ operationInformation.otherInformationObj.leakageCurrentVal }}mA
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.intermediateBusbarVoltage')" v-if="operationInformation.otherInformationObj.intermediateBusbarVoltage">
              {{ operationInformation.otherInformationObj.intermediateBusbarVoltageVal }}V
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.buckBoostCurrent')" v-if="operationInformation.otherInformationObj.buckBoostCurrent">
              {{ operationInformation.otherInformationObj.buckBoostCurrentVal }}A
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.PVIsoVoltage')" v-if="operationInformation.otherInformationObj.pvIsoVoltage">
              {{ operationInformation.otherInformationObj.pvIsoVoltageVal }}V
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.zeroGroundVoltage')" v-if="operationInformation.otherInformationObj.zeroGroundVoltage">
              {{ operationInformation.otherInformationObj.zeroGroundVoltageVal }}V
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.DCInverterCurrent')" v-if="operationInformation.otherInformationObj.dcComponentOfInverterCurrent">
              {{ operationInformation.otherInformationObj.dcComponentOfInverterCurrentVal }}mA
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.DCLoadVoltage')" v-if="operationInformation.otherInformationObj.dcComponentOfLoadVoltage">
              {{ operationInformation.otherInformationObj.dcComponentOfLoadVoltageVal }}mA
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.relayIntermediateVoltage')" v-if="operationInformation.otherInformationObj.relayIntermediateVoltage">
              {{ operationInformation.otherInformationObj.relayIntermediateVoltageVal }}V
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.numberOfRecords')" v-if="operationInformation.otherInformationObj.numberOfHistoryRecords">
              {{ operationInformation.otherInformationObj.numberOfHistoryRecordsVal }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.enableState')" v-if="operationInformation.otherInformationObj.batteryChargingAndDischargingHeatingEnableState">
              {{ operationInformation.otherInformationObj.batteryChargingAndDischargingHeatingEnableStateVal | batteryChargingAndDischargingHeatingEnableStateValFilter }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.factoryCode')" v-if="operationInformation.otherInformationObj.batteryFactoryCode">
              {{ operationInformation.otherInformationObj.batteryFactoryCodeVal }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.productNumber')" v-if="operationInformation.otherInformationObj.batteryProductNumber">
              {{ operationInformation.otherInformationObj.batteryProductNumberVal }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.factoryDate')" v-if="operationInformation.otherInformationObj.batteryFactoryDate">
              {{ operationInformation.otherInformationObj.batteryFactoryDateVal }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.chargingCurrent')" v-if="operationInformation.otherInformationObj.maximumAllowableChargingCurrent">
              {{ operationInformation.otherInformationObj.maximumAllowableChargingCurrentVal }}mA
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.manufacturerInformation')" v-if="operationInformation.otherInformationObj.manufacturerInformation">
              {{ operationInformation.otherInformationObj.manufacturerInformationVal }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.inverterSerialNumber')" v-if="operationInformation.otherInformationObj.inverterSerialNumber">
              {{ operationInformation.otherInformationObj.inverterSerialNumberVal }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.dischargeCurrent')" v-if="operationInformation.otherInformationObj.maximumAllowableDischargeCurrent">
              {{ operationInformation.otherInformationObj.maximumAllowableDischargeCurrentVal }}mA
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.chargingByBattery')" v-if="operationInformation.otherInformationObj.maximumChargingCurrentAllowedByTheInverterForTheBattery">
              {{ operationInformation.otherInformationObj.maximumChargingCurrentAllowedByTheInverterForTheBatteryVal }}A
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.dischargeByBattery')" v-if="operationInformation.otherInformationObj.maximumDischargeCurrentAllowedByTheInverterForTheBattery">
              {{ operationInformation.otherInformationObj.maximumDischargeCurrentAllowedByTheInverterForTheBatteryVal }}A
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </template>

      <template v-else-if="activeIndex === '8'">
        <el-card style="margin-top: 10px;" v-if="systemSet.commonSet">
          <el-descriptions :title="$t('deviceManage.commonSettings')" :column="3" border>
            <el-descriptions-item :label="$t('deviceManage.setSystemTime')" v-if="systemSet.commonSetObj.systemTime">
              <div style="display: flex;">
                <el-input v-model="systemSet.commonSetObj.systemTimeVal" :placeholder="$t('common.inputPrompt')" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('systemTime', systemSet.commonSetObj.systemTimeVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.communicationType')" v-if="systemSet.commonSetObj.communicationProtocolType">
              <div style="display: flex;">
                <el-select v-model="systemSet.commonSetObj.communicationProtocolTypeVal" :placeholder="$t('common.selectPrompt')" style="width: 100%;">
                  <el-option :label="$t('deviceManage.user')" value="0" />
                  <el-option :label="$t('deviceManage.engineer')" value="1" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('communicationProtocolType', systemSet.commonSetObj.communicationProtocolTypeVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.dailyCalibration')" v-if="systemSet.commonSetObj.dailyPowerGenerationCalibration">
              <div style="display: flex;">
                <el-input v-model="systemSet.commonSetObj.dailyPowerGenerationCalibrationVal" :placeholder="$t('common.inputPrompt')" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('dailyPowerGenerationCalibration', systemSet.commonSetObj.dailyPowerGenerationCalibrationVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.totalCalibration')" v-if="systemSet.commonSetObj.totalPowerGenerationCalibration">
              <div style="display: flex;">
                <el-input v-model="systemSet.commonSetObj.totalPowerGenerationCalibrationVal" :placeholder="$t('common.inputPrompt')" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('totalPowerGenerationCalibration', systemSet.commonSetObj.totalPowerGenerationCalibrationVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.clearConsumptionData')" v-if="systemSet.commonSetObj.clearElectricityConsumptionData">
              <div style="display: flex;">
                <el-select v-model="systemSet.commonSetObj.clearElectricityConsumptionDataVal" :placeholder="$t('common.selectPrompt')" style="width: 100%;">
                  <el-option label="0" value="0" />
                  <el-option label="确定" value="65535" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('clearElectricityConsumptionData', systemSet.commonSetObj.clearElectricityConsumptionDataVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.clearGenerationData')" v-if="systemSet.commonSetObj.clearPowerGenerationData">
              <div style="display: flex;">
                <el-select v-model="systemSet.commonSetObj.clearPowerGenerationDataVal" :placeholder="$t('common.selectPrompt')" style="width: 100%;">
                  <el-option label="0" value="0" />
                  <el-option label="确定" value="65535" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('clearPowerGenerationData', systemSet.commonSetObj.clearPowerGenerationDataVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.bootCommand')" v-if="systemSet.commonSetObj.bootCommand">
              <div style="display: flex;">
                <el-select v-model="systemSet.commonSetObj.bootCommandVal" :placeholder="$t('common.selectPrompt')" style="width: 100%;">
                  <el-option label="0" value="0" />
                  <el-option label="确定" value="65535" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('bootCommand', systemSet.commonSetObj.bootCommandVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.shutdownCommand')" v-if="systemSet.commonSetObj.shutdownCommand">
              <div style="display: flex;">
                <el-select v-model="systemSet.commonSetObj.shutdownCommandVal" :placeholder="$t('common.selectPrompt')" style="width: 100%;">
                  <el-option label="0" value="0" />
                  <el-option label="确定" value="65535" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('shutdownCommand', systemSet.commonSetObj.shutdownCommandVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.cancelShutdownCommand')" v-if="systemSet.commonSetObj.cancelShutdownCommand">
              <div style="display: flex;">
                <el-select v-model="systemSet.commonSetObj.cancelShutdownCommandVal" :placeholder="$t('common.selectPrompt')" style="width: 100%;">
                  <el-option label="0" value="0" />
                  <el-option label="确定" value="65535" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('cancelShutdownCommand', systemSet.commonSetObj.cancelShutdownCommandVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>

        <el-card  style="margin-top: 10px;" v-if="systemSet.communicationSet">
          <el-descriptions :label="$t('deviceManage.communicationSettings')" :column="3" border>
            <el-descriptions-item :label="$t('deviceManage.BMSModel')" v-if="systemSet.communicationSetObj.bmsModel">
              <div style="display: flex;">
                <el-select v-model="systemSet.communicationSetObj.bmsModelVal" :placeholder="$t('common.selectPrompt')" style="width: 100%;">
                  <el-option label="None" value="0" />
                  <el-option label="Pylontech" value="1" />
                  <el-option label="XT" value="2" />
                  <el-option label="Stealth" value="3" />
                  <el-option label="Pace" value="4" />
                  <el-option label="LeSY" value="5" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('bmsModel', systemSet.communicationSetObj.bmsModelVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.BMSAddress')" v-if="systemSet.communicationSetObj.bmsAddress">
              <div style="display: flex;">
                <el-input v-model="systemSet.communicationSetObj.bmsAddressVal" :placeholder="$t('common.inputPrompt')" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('bmsAddress', systemSet.communicationSetObj.bmsAddressVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.BMSBaudRate')" v-if="systemSet.communicationSetObj.bmsBaud">
              <div style="display: flex;">
                <el-select v-model="systemSet.communicationSetObj.bmsBaudVal" :placeholder="$t('common.selectPrompt')"  style="width: 100%;">
                  <el-option label="1200" value="1" />
                  <el-option label="2400" value="2" />
                  <el-option label="4800" value="3" />
                  <el-option label="9600" value="4" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('bmsBaud', systemSet.communicationSetObj.bmsBaudVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.numberOfLithiumBattery')" v-if="systemSet.communicationSetObj.numberOfLithiumBatteryBlocks">
              <div style="display: flex;">
                <el-input v-model="systemSet.communicationSetObj.numberOfLithiumBatteryBlocksVal" :placeholder="$t('common.inputPrompt')" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('numberOfLithiumBatteryBlocks', systemSet.communicationSetObj.numberOfLithiumBatteryBlocksVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.collectorAddress')"  v-if="systemSet.communicationSetObj.collectorCommunicationAddress">
              <div style="display: flex;">
                <el-input v-model="systemSet.communicationSetObj.collectorCommunicationAddressVal" :placeholder="$t('common.inputPrompt')" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('collectorCommunicationAddress', systemSet.communicationSetObj.collectorCommunicationAddressVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.collectorType')"  v-if="systemSet.communicationSetObj.collectorCommunicationProtocolType">
              <div style="display: flex;">
                <el-select v-model="systemSet.communicationSetObj.collectorCommunicationProtocolTypeVal" :placeholder="$t('common.selectPrompt')"  style="width: 100%;">
                  <el-option :label="$t('deviceManage.user')" value="0" />
                  <el-option :label="$t('deviceManage.engineer')" value="1" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('collectorCommunicationProtocolType', systemSet.communicationSetObj.collectorCommunicationProtocolTypeVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.collectorBaudRate')" v-if="systemSet.communicationSetObj.baudOfCollectorCommunication">
              <div style="display: flex;">
                <el-select v-model="systemSet.communicationSetObj.baudOfCollectorCommunicationVal" :placeholder="$t('common.selectPrompt')"  style="width: 100%;">
                  <el-option label="1200" value="1" />
                  <el-option label="2400" value="2" />
                  <el-option label="4800" value="3" />
                  <el-option label="9600" value="4" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('baudOfCollectorCommunication', systemSet.communicationSetObj.baudOfCollectorCommunicationVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.deviceAddress')" v-if="systemSet.communicationSetObj.deviceCommunicationAddress">
              <div style="display: flex;">
                <el-input v-model="systemSet.communicationSetObj.deviceCommunicationAddressVal" :placeholder="$t('common.inputPrompt')" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('deviceCommunicationAddress', systemSet.communicationSetObj.deviceCommunicationAddressVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>

        <el-card  style="margin-top: 10px;" v-if="systemSet.advancedSet">
          <el-descriptions :title="$t('deviceManage.advancedSetting')" :column="3" border>
            <el-descriptions-item :label="$t('deviceManage.parallelOffMode')"  v-if="systemSet.advancedSetObj.parallelOffGridMode">
              <div style="display: flex;">
                <el-select v-model="systemSet.advancedSetObj.parallelOffGridModeVal" :placeholder="$t('common.selectPrompt')"  style="width: 100%;">
                  <el-option :label="$t('deviceManage.gridConnectionMode')" value="0" />
                  <el-option :label="$t('deviceManage.antiBackflowMode')" value="1" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('parallelOffGridMode', systemSet.advancedSetObj.parallelOffGridModeVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.systemModeSettings')" v-if="systemSet.advancedSetObj.systemModeSet">
              <div style="display: flex;">
                <el-select v-model="systemSet.advancedSetObj.systemModeSetVal" :placeholder="$t('common.selectPrompt')"  style="width: 100%;">
                  <el-option label="UPS" value="0" />
                  <el-option label="EPS" value="1" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('systemModeSet', systemSet.advancedSetObj.systemModeSetVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.PVConnectionSettings')" v-if="systemSet.advancedSetObj.pvConnectionSet">
              <div style="display: flex;">
                <el-select v-model="systemSet.advancedSetObj.pvConnectionSetVal" :placeholder="$t('common.selectPrompt')"  style="width: 100%;">
                  <el-option :label="$t('deviceManage.independence')" value="0" />
                  <el-option :label="$t('deviceManage.paralleling')" value="1" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('pvConnectionSet', systemSet.advancedSetObj.pvConnectionSetVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.ratedOutputVoltageSetting')" v-if="systemSet.advancedSetObj.ratedOutputVoltageSet">
              <div style="display: flex;">
                <el-input v-model="systemSet.advancedSetObj.ratedOutputVoltageSetVal" :placeholder="$t('common.inputPrompt')">
                  <template slot="append">V</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('ratedOutputVoltageSet', systemSet.advancedSetObj.ratedOutputVoltageSetVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.ratedOutputFrequencySetting')" v-if="systemSet.advancedSetObj.ratedOutputFrequencySet">
              <div style="display: flex;">
                <el-input v-model="systemSet.advancedSetObj.ratedOutputFrequencySetVal" :placeholder="$t('common.inputPrompt')">
                  <template slot="append">Hz</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('ratedOutputFrequencySet', systemSet.advancedSetObj.ratedOutputFrequencySetVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.batteryTypeSettings')" v-if="systemSet.advancedSetObj.batteryTypeSet">
              <div style="display: flex;">
                <el-select v-model="systemSet.advancedSetObj.batteryTypeSetVal" :placeholder="$t('common.selectPrompt')" style="width: 100%;">
                  <el-option :label="$t('deviceManage.leadAcid')" value="0" />
                  <el-option :label="$t('deviceManage.lithiumBattery')" value="1" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('batteryTypeSet', systemSet.advancedSetObj.batteryTypeSetVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.batteryChargingCurrent')" v-if="systemSet.advancedSetObj.batteryChargingCurrent">
              <div style="display: flex;">
                <el-input v-model="systemSet.advancedSetObj.batteryChargingCurrentVal" :placeholder="$t('common.inputPrompt')">
                  <template slot="append">A</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('batteryChargingCurrent', systemSet.advancedSetObj.batteryChargingCurrentVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.batteryDischargeCurrent')" v-if="systemSet.advancedSetObj.batteryDischargeCurrent">
              <div style="display: flex;">
                <el-input v-model="systemSet.advancedSetObj.batteryDischargeCurrentVal" :placeholder="$t('common.inputPrompt')">
                  <template slot="append">A</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('batteryDischargeCurrent', systemSet.advancedSetObj.batteryDischargeCurrentVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.batteryAverageChargingVoltage')" v-if="systemSet.advancedSetObj.batteryAverageChargingVoltage">
              <div style="display: flex;">
                <el-input v-model="systemSet.advancedSetObj.batteryAverageChargingVoltageVal" :placeholder="$t('common.inputPrompt')">
                  <template slot="append">V</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('batteryAverageChargingVoltage', systemSet.advancedSetObj.batteryAverageChargingVoltageVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.batteryFloatChargingVoltage')" v-if="systemSet.advancedSetObj.batteryFloatChargingVoltage">
              <div style="display: flex;">
                <el-input v-model="systemSet.advancedSetObj.batteryFloatChargingVoltageVal" :placeholder="$t('common.inputPrompt')">
                  <template slot="append">V</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('batteryFloatChargingVoltage', systemSet.advancedSetObj.batteryFloatChargingVoltageVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.batteryEOD')" v-if="systemSet.advancedSetObj.batteryEod">
              <div style="display: flex;">
                <el-input v-model="systemSet.advancedSetObj.batteryEodVal" :placeholder="$t('common.inputPrompt')">
                  <template slot="append">V</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('batteryEod', systemSet.advancedSetObj.batteryEodVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.batteryDOD')" v-if="systemSet.advancedSetObj.batteryDod">
              <div style="display: flex;">
                <el-input v-model="systemSet.advancedSetObj.batteryDodVal" :placeholder="$t('common.inputPrompt')">
                  <template slot="append">V</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('batteryDod', systemSet.advancedSetObj.batteryDodVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.lowerLimitOfGridConnectedSOC')" v-if="systemSet.advancedSetObj.lowerLimitOfGridConnectedSoc">
              <div style="display: flex;">
                <el-input v-model="systemSet.advancedSetObj.lowerLimitOfGridConnectedSocVal" :placeholder="$t('common.inputPrompt')">
                  <template slot="append">%</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('lowerLimitOfGridConnectedSoc', systemSet.advancedSetObj.lowerLimitOfGridConnectedSocVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.offGridSOCLowerLimit')" v-if="systemSet.advancedSetObj.offGridSocLowerLimit">
              <div style="display: flex;">
                <el-input v-model="systemSet.advancedSetObj.offGridSocLowerLimitVal" :placeholder="$t('common.inputPrompt')">
                  <template slot="append">%</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('offGridSocLowerLimit', systemSet.advancedSetObj.offGridSocLowerLimitVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.electricityMeterCT')" v-if="systemSet.advancedSetObj.electricityMeterCt">
              <div style="display: flex;">
                <el-select v-model="systemSet.advancedSetObj.electricityMeterCtVal" :placeholder="$t('common.selectPrompt')" style="width: 100%;">
                  <el-option label="NULL" value="0" />
                  <el-option :label="$t('deviceManage.electricityMeter')" value="1" />
                  <el-option label="CT" value="2" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('electricityMeterCt', systemSet.advancedSetObj.electricityMeterCtVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>


        <el-card  style="margin-top: 10px;" v-if="systemSet.otherSet">
          <el-descriptions :title="$t('deviceManage.otherSettings')" :column="3" border>
            <el-descriptions-item :label="$t('deviceManage.resetDeviceInitialValues')" v-if="systemSet.otherSetObj.resetDeviceCommunicationSettingsToInitialValues">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.resetDeviceCommunicationSettingsToInitialValuesVal" :placeholder="$t('common.inputPrompt')" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('resetDeviceCommunicationSettingsToInitialValues', systemSet.otherSetObj.resetDeviceCommunicationSettingsToInitialValuesVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.clearRecordData')" v-if="systemSet.otherSetObj.clearRecordData">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.clearRecordDataVal" :placeholder="$t('common.inputPrompt')" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('clearRecordData', systemSet.otherSetObj.clearRecordDataVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.restoreFactorySettings')" v-if="systemSet.otherSetObj.factoryReset">
              <div style="display: flex;">
                <el-select v-model="systemSet.otherSetObj.factoryResetVal" :placeholder="$t('common.selectPrompt')" style="width: 100%;">
                  <el-option label="取消" value="0" />
                  <el-option label="确认" value="1" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('factoryReset', systemSet.otherSetObj.factoryResetVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.inverterRestart')" v-if="systemSet.otherSetObj.inverterRestart">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.inverterRestartVal" :placeholder="$t('common.inputPrompt')" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('inverterRestart', systemSet.otherSetObj.inverterRestartVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.selfCheckEnable')" v-if="systemSet.otherSetObj.selfCheckEnable">
              <div style="display: flex;">
                <el-select v-model="systemSet.otherSetObj.selfCheckEnableVal" :placeholder="$t('common.selectPrompt')" style="width: 100%;">
                  <el-option :label="$t('deviceManage.idle')" value="0" />
                  <el-option :label="$t('deviceManage.overvoltageForASection')" value="1" />
                  <el-option :label="$t('deviceManage.secondStageOvervoltage')" value="2" />
                  <el-option :label="$t('deviceManage.oneSectionUnderVoltage')" value="3" />
                  <el-option :label="$t('deviceManage.secondaryUndervoltage')" value="4" />
                  <el-option :label="$t('deviceManage.overfrequencyOfASegment')" value="5" />
                  <el-option :label="$t('deviceManage.secondStageOverfrequency')" value="6" />
                  <el-option :label="$t('deviceManage.oneUnderfrequency')" value="7" />
                  <el-option :label="$t('deviceManage.twoStageUnderfrequency')" value="8" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('selfCheckEnable', systemSet.otherSetObj.selfCheckEnableVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.manuallyClearingFaults')" v-if="systemSet.otherSetObj.manuallyClearingFaults">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.manuallyClearingFaultsVal" :placeholder="$t('common.inputPrompt')" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('manuallyClearingFaults', systemSet.otherSetObj.manuallyClearingFaultsVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.automaticOperation')" v-if="systemSet.otherSetObj.automaticOperation">
              <div style="display: flex;">
                <el-select v-model="systemSet.otherSetObj.automaticOperationVal" :placeholder="$t('common.selectPrompt')" style="width: 100%;">
                  <el-option :label="$t('deviceManage.handMovement')" value="0" />
                  <el-option :label="$t('deviceManage.automatic')" value="1" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('automaticOperation', systemSet.otherSetObj.automaticOperationVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.manuallyLock')" v-if="systemSet.otherSetObj.manuallyUnlockingTheSystemLock">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.manuallyUnlockingTheSystemLockVal" :placeholder="$t('common.inputPrompt')" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('manuallyUnlockingTheSystemLock', systemSet.otherSetObj.manuallyUnlockingTheSystemLockVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.deviceCommunicationBaudRate')" v-if="systemSet.otherSetObj.deviceCommunicationBaud">
              <div style="display: flex;">
                <el-select v-model="systemSet.otherSetObj.deviceCommunicationBaudVal" :placeholder="$t('common.selectPrompt')" style="width: 100%;">
                  <el-option label="1200" value="1" />
                  <el-option label="2400" value="2" />
                  <el-option label="4800" value="3" />
                  <el-option label="9600" value="4" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('deviceCommunicationBaud', systemSet.otherSetObj.deviceCommunicationBaudVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.deviceCheckBitSelection')" v-if="systemSet.otherSetObj.deviceCommunicationCheckBitSelection">
              <div style="display: flex;">
                <el-select v-model="systemSet.otherSetObj.deviceCommunicationCheckBitSelectionVal" :placeholder="$t('common.selectPrompt')" style="width: 100%;">
                  <el-option :label="$t('deviceManage.noCheckDigit')" value="0" />
                  <el-option :label="$t('deviceManage.evenParityCheck')" value="1" />
                  <el-option :label="$t('deviceManage.oddCheck')" value="2" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('deviceCommunicationCheckBitSelection', systemSet.otherSetObj.deviceCommunicationCheckBitSelectionVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.deviceStopBitSelection')" v-if="systemSet.otherSetObj.deviceCommunicationStopBitSelection">
              <div style="display: flex;">
                <el-select v-model="systemSet.otherSetObj.deviceCommunicationStopBitSelectionVal" :placeholder="$t('common.selectPrompt')" style="width: 100%;">
                  <el-option :label="$t('deviceManage.bitStopBit1')" value="0" />
                  <el-option :label="$t('deviceManage.bitStopBit2')" value="1" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('deviceCommunicationStopBitSelection', systemSet.otherSetObj.deviceCommunicationStopBitSelectionVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.countdownInverter')" v-if="systemSet.otherSetObj.countdownToTurnOffTheInverter">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.countdownToTurnOffTheInverterVal" :placeholder="$t('common.inputPrompt')" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('countdownToTurnOffTheInverter', systemSet.otherSetObj.countdownToTurnOffTheInverterVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.delayedStartInverter')" v-if="systemSet.otherSetObj.delayedStartInverter">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.delayedStartInverterVal" :placeholder="$t('common.inputPrompt')" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('delayedStartInverter', systemSet.otherSetObj.delayedStartInverterVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.countryCode')" v-if="systemSet.otherSetObj.countryCode">
              <div style="display: flex;">
                <el-select v-model="systemSet.otherSetObj.countryCodeVal" :placeholder="$t('common.selectPrompt')" style="width: 100%;">
                  <el-option :label="$t('deviceManage.China')" value="0" />
                  <el-option :label="$t('deviceManage.Italy')" value="1" />
                  <el-option :label="$t('deviceManage.Germany')" value="2" />
                  <el-option :label="$t('deviceManage.Australia')" value="3" />
                  <el-option :label="$t('deviceManage.Belgium')" value="4" />
                  <el-option :label="$t('deviceManage.SouthAfrica')" value="5" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('countryCode', systemSet.otherSetObj.countryCodeVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.systemTimeSetting')" v-if="systemSet.otherSetObj.systemTimeSetting">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.systemTimeSettingVal" :placeholder="$t('common.inputPrompt')" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('systemTimeSetting', systemSet.otherSetObj.systemTimeSettingVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.inverterActivePowerSetting')" v-if="systemSet.otherSetObj.inverterActivePowerSetting">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.inverterActivePowerSettingVal" :placeholder="$t('common.inputPrompt')">
                  <template slot="append">%</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('inverterActivePowerSetting', systemSet.otherSetObj.inverterActivePowerSettingVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.communicationProtocolType485')" v-if="systemSet.otherSetObj.communicationProtocolType485">
              <div style="display: flex;">
                <el-select v-model="systemSet.otherSetObj.communicationProtocolType485Val" :placeholder="$t('common.selectPrompt')" style="width: 100%;">
                  <el-option :label="$t('deviceManage.user')" value="0" />
                  <el-option :label="$t('deviceManage.engineer')" value="1" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('communicationProtocolType485', systemSet.otherSetObj.communicationProtocolType485Val)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.communicationAddress485')" v-if="systemSet.otherSetObj.communicationAddress485">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.communicationAddress485Val" :placeholder="$t('common.inputPrompt')" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('communicationAddress485', systemSet.otherSetObj.communicationAddress485Val)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.communicationBaudRate485')" v-if="systemSet.otherSetObj.communicationBaud485">
              <div style="display: flex;">
                <el-select v-model="systemSet.otherSetObj.communicationBaud485Val" :placeholder="$t('common.selectPrompt')" style="width: 100%;">
                  <el-option label="1200" value="1" />
                  <el-option label="2400" value="2" />
                  <el-option label="4800" value="3" />
                  <el-option label="9600" value="4" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('communicationBaud485', systemSet.otherSetObj.communicationBaud485Val)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.hardLimitEnable')" v-if="systemSet.otherSetObj.hardLimitEnable">
              <div style="display: flex;">
                <el-select v-model="systemSet.otherSetObj.hardLimitEnableVal" :placeholder="$t('common.selectPrompt')" style="width: 100%;">
                  <el-option :label="$t('deviceManage.enable')" value="1" />
                  <el-option :label="$t('deviceManage.shield')" value="0" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('hardLimitEnable', systemSet.otherSetObj.hardLimitEnableVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.hardLimitPower')" v-if="systemSet.otherSetObj.hardLimitPowerSettingValue">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.hardLimitPowerSettingValueVal" :placeholder="$t('common.inputPrompt')" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('hardLimitPowerSettingValue', systemSet.otherSetObj.hardLimitPowerSettingValueVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.australianRegionSelection')" v-if="systemSet.otherSetObj.australianRegionSelection">
              <div style="display: flex;">
                <el-select v-model="systemSet.otherSetObj.australianRegionSelectionVal" :placeholder="$t('common.selectPrompt')" style="width: 100%;">
                  <el-option :label="$t('deviceManage.AustraliaZoneA')" value="0" />
                  <el-option :label="$t('deviceManage.AustralianZoneB')" value="1" />
                  <el-option :label="$t('deviceManage.AustralianZoneC')" value="2" />
                  <el-option :label="$t('deviceManage.NewZealand')" value="3" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('australianRegionSelection', systemSet.otherSetObj.australianRegionSelectionVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.bluetoothConnectionFlag')" v-if="systemSet.otherSetObj.bluetoothConnectionFlag">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.bluetoothConnectionFlagVal" :placeholder="$t('common.inputPrompt')" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('bluetoothConnectionFlag', systemSet.otherSetObj.bluetoothConnectionFlagVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.PVActivePowerSetting')" v-if="systemSet.otherSetObj.pvActivePowerSetting">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.pvActivePowerSettingVal" :placeholder="$t('common.inputPrompt')">
                  <template slot="append">%</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('pvActivePowerSetting', systemSet.otherSetObj.pvActivePowerSettingVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.limitChangeRate')" v-if="systemSet.otherSetObj.limitOfActivePowerChangeRate">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.limitOfActivePowerChangeRateVal" :placeholder="$t('common.inputPrompt')" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('limitOfActivePowerChangeRate', systemSet.otherSetObj.limitOfActivePowerChangeRateVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.islandDetectionEnable')" v-if="systemSet.otherSetObj.islandDetectionEnable">
              <div style="display: flex;">
                <el-select v-model="systemSet.otherSetObj.islandDetectionEnableVal" :placeholder="$t('common.selectPrompt')" style="width: 100%;">
                  <el-option :label="$t('deviceManage.notEnable')" value="0" />
                  <el-option :label="$t('deviceManage.enable')" value="1" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('islandDetectionEnable', systemSet.otherSetObj.islandDetectionEnableVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.authenticationMode')" v-if="systemSet.otherSetObj.authenticationMode">
              <div style="display: flex;">
                <el-select v-model="systemSet.otherSetObj.authenticationModeVal" :placeholder="$t('common.selectPrompt')" style="width: 100%;">
                  <el-option :label="$t('menuManage.close')" value="0" />
                  <el-option :label="$t('menuManage.open')" value="1" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('authenticationMode', systemSet.otherSetObj.authenticationModeVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.controlSource')" v-if="systemSet.otherSetObj.currentSystemOperationModeControlSource">
              <div style="display: flex;">
                <el-select v-model="systemSet.otherSetObj.currentSystemOperationModeControlSourceVal" :placeholder="$t('common.selectPrompt')" style="width: 100%;">
                  <el-option :label="$t('deviceManage.MCUIssuedControl')" value="0" />
                  <el-option :label="$t('deviceManage.DSPIssuedControl')" value="1" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('currentSystemOperationModeControlSource', systemSet.otherSetObj.currentSystemOperationModeControlSourceVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.modeSystem')" v-if="systemSet.otherSetObj.currentOperatingModeOfTheSystem">
              <div style="display: flex;">
                <el-select v-model="systemSet.otherSetObj.currentOperatingModeOfTheSystemVal" :placeholder="$t('common.selectPrompt')" style="width: 100%;">
                  <el-option :label="$t('deviceManage.batteryPriorityMode')" value="0" />
                  <el-option :label="$t('deviceManage.homeLoadPriorityMode')" value="1" />
                  <el-option :label="$t('deviceManage.gridPriorityMode')" value="2" />
                  <el-option :label="$t('deviceManage.fullPowerFeedMode')" value="3" />
                  <el-option :label="$t('deviceManage.emergencyBackupMode')" value="4" />
                  <el-option :label="$t('deviceManage.acBackupMode')" value="5" />
                  <el-option :label="$t('deviceManage.purePVMode')" value="6" />
                  <el-option :label="$t('deviceManage.forcedOffGridMode')" value="7" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('currentOperatingModeOfTheSystem', systemSet.otherSetObj.currentOperatingModeOfTheSystemVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.APPStartupFlag')" v-if="systemSet.otherSetObj.appStartupFlag">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.appStartupFlagVal" :placeholder="$t('common.inputPrompt')" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('appStartupFlag', systemSet.otherSetObj.appStartupFlagVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.buzzerResponseTime')" v-if="systemSet.otherSetObj.buzzerResponseTime">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.buzzerResponseTimeVal" :placeholder="$t('common.inputPrompt')">
                  <template slot="append">min</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('buzzerResponseTime', systemSet.otherSetObj.buzzerResponseTimeVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.communicationType')" v-if="systemSet.otherSetObj.communicationType">
              <div style="display: flex;">
                <el-select v-model="systemSet.otherSetObj.communicationTypeVal" :placeholder="$t('common.selectPrompt')" style="width: 100%;">
                  <el-option :label="$t('deviceManage.powerGrid')" value="0" />
                  <el-option :label="$t('deviceManage.alternator')" value="1" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('communicationType', systemSet.otherSetObj.communicationTypeVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.systemModeSettings')" v-if="systemSet.otherSetObj.systemModeSettings">
              <div style="display: flex;">
                <el-select v-model="systemSet.otherSetObj.systemModeSettingsVal" :placeholder="$t('common.selectPrompt')" style="width: 100%;">
                  <el-option label="UPS" value="0" />
                  <el-option label="EPS" value="1" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('systemModeSettings', systemSet.otherSetObj.systemModeSettingsVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.USBOperation')" v-if="systemSet.otherSetObj.usbOperation">
              <div style="display: flex;">
                <el-select v-model="systemSet.otherSetObj.usbOperationVal" :placeholder="$t('common.selectPrompt')" style="width: 100%;">
                  <el-option :label="$t('deviceManage.nothing')" value="0" />
                  <el-option :label="$t('deviceManage.exportHistory')" value="1" />
                  <el-option :label="$t('deviceManage.exportConfigurationParameters')" value="2" />
                  <el-option :label="$t('deviceManage.importConfigurationParameters')" value="3" />
                  <el-option :label="$t('deviceManage.masterUpgrade')" value="4" />
                  <el-option :label="$t('deviceManage.monitoringUpgrade')" value="5" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('usbOperation', systemSet.otherSetObj.usbOperationVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.powerFactor')" v-if="systemSet.otherSetObj.powerFactor">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.powerFactorVal" :placeholder="$t('common.inputPrompt')" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('powerFactor', systemSet.otherSetObj.powerFactorVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.antiBackflowPowerPercentage')" v-if="systemSet.otherSetObj.antiBackflowPowerPercentage">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.antiBackflowPowerPercentageVal" :placeholder="$t('common.inputPrompt')">
                  <template slot="append">%</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('antiBackflowPowerPercentage', systemSet.otherSetObj.antiBackflowPowerPercentageVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.maximumOutputPowerPercentage')" v-if="systemSet.otherSetObj.maximumOutputPowerPercentage">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.maximumOutputPowerPercentageVal" :placeholder="$t('common.inputPrompt')">
                  <template slot="append">%</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('maximumOutputPowerPercentage', systemSet.otherSetObj.maximumOutputPowerPercentageVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.powerSettingAdjustmentRate')" v-if="systemSet.otherSetObj.powerSettingAdjustmentRate">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.powerSettingAdjustmentRateVal" :placeholder="$t('common.inputPrompt')">
                  <template slot="append">%Wmax/s</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('powerSettingAdjustmentRate', systemSet.otherSetObj.powerSettingAdjustmentRateVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.softStartRate')" v-if="systemSet.otherSetObj.gridConnectedPowerSoftStartRate">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.gridConnectedPowerSoftStartRateVal" :placeholder="$t('common.inputPrompt')">
                  <template slot="append">%Wmax/Min</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('gridConnectedPowerSoftStartRate', systemSet.otherSetObj.gridConnectedPowerSoftStartRateVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.reactivePowerControlMode')" v-if="systemSet.otherSetObj.reactivePowerControlMode">
              <div style="display: flex;">
                <el-select v-model="systemSet.otherSetObj.reactivePowerControlModeVal" :placeholder="$t('common.selectPrompt')" style="width: 100%;">
                  <el-option :label="$t('deviceManage.zeroReactivePower')" value="0" />
                  <el-option :label="$t('deviceManage.voltVarMode')" value="1" />
                  <el-option :label="$t('deviceManage.fixedFactorMode')" value="2" />
                  <el-option :label="$t('deviceManage.fixedReactiveMode')" value="3" />
                  <el-option :label="$t('deviceManage.cosMode')" value="4" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('reactivePowerControlMode', systemSet.otherSetObj.reactivePowerControlModeVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.reactivePowerRegulationRate')" v-if="systemSet.otherSetObj.reactivePowerRegulationRate">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.reactivePowerRegulationRateVal" :placeholder="$t('common.inputPrompt')">
                  <template slot="append">%VAmax/s</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('reactivePowerRegulationRate', systemSet.otherSetObj.reactivePowerRegulationRateVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.upperLimitValueOfVoltage1')" v-if="systemSet.otherSetObj.upperLimitValueOfGridVoltageProtection1">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.upperLimitValueOfGridVoltageProtection1Val" :placeholder="$t('common.inputPrompt')">
                  <template slot="append">V</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('upperLimitValueOfGridVoltageProtection1', systemSet.otherSetObj.upperLimitValueOfGridVoltageProtection1Val)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.upperLimitValueOfVoltage2')" v-if="systemSet.otherSetObj.upperLimitValueOfGridVoltageProtection2">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.upperLimitValueOfGridVoltageProtection2Val" :placeholder="$t('common.inputPrompt')">
                  <template slot="append">V</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('upperLimitValueOfGridVoltageProtection2', systemSet.otherSetObj.upperLimitValueOfGridVoltageProtection2Val)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.upperLimitValueOfVoltage3')" v-if="systemSet.otherSetObj.upperLimitValueOfGridVoltageProtection3">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.upperLimitValueOfGridVoltageProtection3Val" :placeholder="$t('common.inputPrompt')">
                  <template slot="append">V</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('upperLimitValueOfGridVoltageProtection3', systemSet.otherSetObj.upperLimitValueOfGridVoltageProtection3Val)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.lowerLimitValueOfProtection1')" v-if="systemSet.otherSetObj.lowerLimitValueOfGridVoltageProtection1">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.lowerLimitValueOfGridVoltageProtection1Val" :placeholder="$t('common.inputPrompt')">
                  <template slot="append">V</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('lowerLimitValueOfGridVoltageProtection1', systemSet.otherSetObj.lowerLimitValueOfGridVoltageProtection1Val)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.lowerLimitValueOfProtection2')" v-if="systemSet.otherSetObj.lowerLimitValueOfGridVoltageProtection2">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.lowerLimitValueOfGridVoltageProtection2Val" :placeholder="$t('common.inputPrompt')">
                  <template slot="append">V</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('lowerLimitValueOfGridVoltageProtection2', systemSet.otherSetObj.lowerLimitValueOfGridVoltageProtection2Val)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.lowerLimitValueOfProtection3')" v-if="systemSet.otherSetObj.lowerLimitValueOfGridVoltageProtection3">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.lowerLimitValueOfGridVoltageProtection3Val" :placeholder="$t('common.inputPrompt')">
                  <template slot="append">V</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('lowerLimitValueOfGridVoltageProtection3', systemSet.otherSetObj.lowerLimitValueOfGridVoltageProtection3Val)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.upperLimitValueVoltage')" v-if="systemSet.otherSetObj.upperLimitValueOfGridVoltageReconnection">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.upperLimitValueOfGridVoltageReconnectionVal" :placeholder="$t('common.inputPrompt')">
                  <template slot="append">V</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('upperLimitValueOfGridVoltageReconnection', systemSet.otherSetObj.upperLimitValueOfGridVoltageReconnectionVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.lowerLimitValueVoltage')" v-if="systemSet.otherSetObj.lowerLimitValueOfGridVoltageReconnection">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.lowerLimitValueOfGridVoltageReconnectionVal" :placeholder="$t('common.inputPrompt')">
                  <template slot="append">V</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('lowerLimitValueOfGridVoltageReconnection', systemSet.otherSetObj.lowerLimitValueOfGridVoltageReconnectionVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.voltageUpperLimitTime1')" v-if="systemSet.otherSetObj.upperLimitTimeOfGridVoltageProtection1">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.upperLimitTimeOfGridVoltageProtection1Val" :placeholder="$t('common.inputPrompt')">
                  <template slot="append">ms</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('upperLimitTimeOfGridVoltageProtection1', systemSet.otherSetObj.upperLimitTimeOfGridVoltageProtection1Val)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.voltageUpperLimitTime2')" v-if="systemSet.otherSetObj.upperLimitTimeOfGridVoltageProtection2">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.upperLimitTimeOfGridVoltageProtection2Val" :placeholder="$t('common.inputPrompt')">
                  <template slot="append">ms</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('upperLimitTimeOfGridVoltageProtection2', systemSet.otherSetObj.upperLimitTimeOfGridVoltageProtection2Val)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.voltageUpperLimitTime3')" v-if="systemSet.otherSetObj.upperLimitTimeOfGridVoltageProtection3">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.upperLimitTimeOfGridVoltageProtection3Val" :placeholder="$t('common.inputPrompt')">
                  <template slot="append">ms</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('upperLimitTimeOfGridVoltageProtection3', systemSet.otherSetObj.upperLimitTimeOfGridVoltageProtection3Val)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.voltageLowerLimitTime1')" v-if="systemSet.otherSetObj.lowerLimitTimeOfGridVoltageProtection1">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.lowerLimitTimeOfGridVoltageProtection1Val" :placeholder="$t('common.inputPrompt')">
                  <template slot="append">ms</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('lowerLimitTimeOfGridVoltageProtection1', systemSet.otherSetObj.lowerLimitTimeOfGridVoltageProtection1Val)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.voltageLowerLimitTime2')" v-if="systemSet.otherSetObj.lowerLimitTimeOfGridVoltageProtection2">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.lowerLimitTimeOfGridVoltageProtection2Val" :placeholder="$t('common.inputPrompt')">
                  <template slot="append">ms</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('lowerLimitTimeOfGridVoltageProtection2', systemSet.otherSetObj.lowerLimitTimeOfGridVoltageProtection2Val)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.voltageLowerLimitTime3')" v-if="systemSet.otherSetObj.lowerLimitTimeOfGridVoltageProtection3">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.lowerLimitTimeOfGridVoltageProtection3Val" :placeholder="$t('common.inputPrompt')">
                  <template slot="append">ms</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('lowerLimitTimeOfGridVoltageProtection3', systemSet.otherSetObj.lowerLimitTimeOfGridVoltageProtection3Val)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.recoveryTimeVoltageProtection')" v-if="systemSet.otherSetObj.recoveryTimeOfGridVoltageProtection">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.recoveryTimeOfGridVoltageProtectionVal" :placeholder="$t('common.inputPrompt')">
                  <template slot="append">ms</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('recoveryTimeOfGridVoltageProtection', systemSet.otherSetObj.recoveryTimeOfGridVoltageProtectionVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.upperLimitValue1')" v-if="systemSet.otherSetObj.upperLimitValueOfGridFrequencyProtection1">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.upperLimitValueOfGridFrequencyProtection1Val" :placeholder="$t('common.inputPrompt')">
                  <template slot="append">Hz</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('upperLimitValueOfGridFrequencyProtection1', systemSet.otherSetObj.upperLimitValueOfGridFrequencyProtection1Val)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.upperLimitValue2')" v-if="systemSet.otherSetObj.upperLimitValueOfGridFrequencyProtection2">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.upperLimitValueOfGridFrequencyProtection2Val" :placeholder="$t('common.inputPrompt')">
                  <template slot="append">Hz</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('upperLimitValueOfGridFrequencyProtection2', systemSet.otherSetObj.upperLimitValueOfGridFrequencyProtection2Val)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.upperLimitValue3')" v-if="systemSet.otherSetObj.upperLimitValueOfGridFrequencyProtection3">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.upperLimitValueOfGridFrequencyProtection3Val" :placeholder="$t('common.inputPrompt')">
                  <template slot="append">Hz</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('upperLimitValueOfGridFrequencyProtection3', systemSet.otherSetObj.upperLimitValueOfGridFrequencyProtection3Val)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.lowerLimitValue1')" v-if="systemSet.otherSetObj.lowerLimitValueOfGridFrequencyProtection1">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.lowerLimitValueOfGridFrequencyProtection1Val" :placeholder="$t('common.inputPrompt')">
                  <template slot="append">Hz</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('lowerLimitValueOfGridFrequencyProtection1', systemSet.otherSetObj.lowerLimitValueOfGridFrequencyProtection1Val)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.lowerLimitValue2')" v-if="systemSet.otherSetObj.lowerLimitValueOfGridFrequencyProtection2">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.lowerLimitValueOfGridFrequencyProtection2Val" :placeholder="$t('common.inputPrompt')">
                  <template slot="append">Hz</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('lowerLimitValueOfGridFrequencyProtection2', systemSet.otherSetObj.lowerLimitValueOfGridFrequencyProtection2Val)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.lowerLimitValue3')" v-if="systemSet.otherSetObj.lowerLimitValueOfGridFrequencyProtection3">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.lowerLimitValueOfGridFrequencyProtection3Val" :placeholder="$t('common.inputPrompt')">
                  <template slot="append">Hz</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('lowerLimitValueOfGridFrequencyProtection3', systemSet.otherSetObj.lowerLimitValueOfGridFrequencyProtection3Val)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.upperLimitValueFrequency')" v-if="systemSet.otherSetObj.upperLimitValueOfGridFrequencyReconnection">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.upperLimitValueOfGridFrequencyReconnectionVal" :placeholder="$t('common.inputPrompt')">
                  <template slot="append">Hz</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('upperLimitValueOfGridFrequencyReconnection', systemSet.otherSetObj.upperLimitValueOfGridFrequencyReconnectionVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.lowerLimitOfGridFrequency')" v-if="systemSet.otherSetObj.lowerLimitValueOfGridFrequencyReconnection">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.lowerLimitValueOfGridFrequencyReconnectionVal" :placeholder="$t('common.inputPrompt')">
                  <template slot="append">Hz</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('lowerLimitValueOfGridFrequencyReconnection', systemSet.otherSetObj.lowerLimitValueOfGridFrequencyReconnectionVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.upperLimitTime1')" v-if="systemSet.otherSetObj.gridFrequencyProtectionUpperLimitTime1">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.gridFrequencyProtectionUpperLimitTime1Val" :placeholder="$t('common.inputPrompt')">
                  <template slot="append">ms</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('gridFrequencyProtectionUpperLimitTime1', systemSet.otherSetObj.gridFrequencyProtectionUpperLimitTime1Val)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.upperLimitTime2')" v-if="systemSet.otherSetObj.gridFrequencyProtectionUpperLimitTime2">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.gridFrequencyProtectionUpperLimitTime2Val" :placeholder="$t('common.inputPrompt')">
                  <template slot="append">ms</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('gridFrequencyProtectionUpperLimitTime2', systemSet.otherSetObj.gridFrequencyProtectionUpperLimitTime2Val)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.upperLimitTime3')" v-if="systemSet.otherSetObj.gridFrequencyProtectionUpperLimitTime3">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.gridFrequencyProtectionUpperLimitTime3Val" :placeholder="$t('common.inputPrompt')">
                  <template slot="append">ms</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('gridFrequencyProtectionUpperLimitTime3', systemSet.otherSetObj.gridFrequencyProtectionUpperLimitTime3Val)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.lowerLimitTime1')" v-if="systemSet.otherSetObj.gridFrequencyProtectionLowerLimitTime1">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.gridFrequencyProtectionLowerLimitTime1Val" :placeholder="$t('common.inputPrompt')">
                  <template slot="append">ms</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('gridFrequencyProtectionLowerLimitTime1', systemSet.otherSetObj.gridFrequencyProtectionLowerLimitTime1Val)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.lowerLimitTime2')" v-if="systemSet.otherSetObj.gridFrequencyProtectionLowerLimitTime2">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.gridFrequencyProtectionLowerLimitTime2Val" :placeholder="$t('common.inputPrompt')">
                  <template slot="append">ms</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('gridFrequencyProtectionLowerLimitTime2', systemSet.otherSetObj.gridFrequencyProtectionLowerLimitTime2Val)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.lowerLimitTime3')" v-if="systemSet.otherSetObj.gridFrequencyProtectionLowerLimitTime3">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.gridFrequencyProtectionLowerLimitTime3Val" :placeholder="$t('common.inputPrompt')">
                  <template slot="append">ms</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('gridFrequencyProtectionLowerLimitTime3', systemSet.otherSetObj.gridFrequencyProtectionLowerLimitTime3Val)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.recoveryTimeOfGrid')" v-if="systemSet.otherSetObj.recoveryTimeOfGridFrequencyProtection">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.recoveryTimeOfGridFrequencyProtectionVal" :placeholder="$t('common.inputPrompt')">
                  <template slot="append">ms</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('recoveryTimeOfGridFrequencyProtection', systemSet.otherSetObj.recoveryTimeOfGridFrequencyProtectionVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.minOvervoltage10')" v-if="systemSet.otherSetObj.tenMinOvervoltageProtectionValueOfThePowerGrid">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.tenMinOvervoltageProtectionValueOfThePowerGridVal" :placeholder="$t('common.inputPrompt')">
                  <template slot="append">V</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('tenMinOvervoltageProtectionValueOfThePowerGrid', systemSet.otherSetObj.tenMinOvervoltageProtectionValueOfThePowerGridVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.networkingWaitingTime')" v-if="systemSet.otherSetObj.networkingWaitingTime">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.networkingWaitingTimeVal" :placeholder="$t('common.inputPrompt')">
                  <template slot="append">s</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('networkingWaitingTime', systemSet.otherSetObj.networkingWaitingTimeVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.reconnectWaitingTime')" v-if="systemSet.otherSetObj.reconnectWaitingTime">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.reconnectWaitingTimeVal" :placeholder="$t('common.inputPrompt')">
                  <template slot="append">s</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('reconnectWaitingTime', systemSet.otherSetObj.reconnectWaitingTimeVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.coldMode')" v-if="systemSet.otherSetObj.coldMode">
              <div style="display: flex;">
                <el-select v-model="systemSet.otherSetObj.coldModeVal" :placeholder="$t('common.selectPrompt')" style="width: 100%;">
                  <el-option :label="$t('menuManage.close')" value="0" />
                  <el-option :label="$t('menuManage.open')" value="1" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('coldMode', systemSet.otherSetObj.coldModeVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.reactivePowerPercentage')" v-if="systemSet.otherSetObj.reactivePowerPercentage">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.reactivePowerPercentageVal" :placeholder="$t('common.inputPrompt')">
                  <template slot="append">%</template>
                </el-input>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('reactivePowerPercentage', systemSet.otherSetObj.reactivePowerPercentageVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.freqWatt')" v-if="systemSet.otherSetObj.freqWattCurveEnable">
              <div style="display: flex;">
                <el-select v-model="systemSet.otherSetObj.freqWattCurveEnableVal" :placeholder="$t('common.selectPrompt')" style="width: 100%;">
                  <el-option :label="$t('deviceManage.notEnable')" value="0" />
                  <el-option :label="$t('deviceManage.enable')" value="1" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('freqWattCurveEnable', systemSet.otherSetObj.freqWattCurveEnableVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.voltWatt')" v-if="systemSet.otherSetObj.voltWattCurveEnable">
              <div style="display: flex;">
                <el-select v-model="systemSet.otherSetObj.voltWattCurveEnableVal" :placeholder="$t('common.selectPrompt')" style="width: 100%;">
                  <el-option :label="$t('deviceManage.notEnable')" value="0" />
                  <el-option :label="$t('deviceManage.enable')" value="1" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('voltWattCurveEnable', systemSet.otherSetObj.voltWattCurveEnableVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.voltVar')" v-if="systemSet.otherSetObj.voltVarCurveEnable">
              <div style="display: flex;">
                <el-select v-model="systemSet.otherSetObj.voltVarCurveEnableVal" :placeholder="$t('common.selectPrompt')" style="width: 100%;">
                  <el-option :label="$t('deviceManage.notEnable')" value="0" />
                  <el-option :label="$t('deviceManage.enable')" value="1" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('voltVarCurveEnable', systemSet.otherSetObj.voltVarCurveEnableVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.pFWatt')" v-if="systemSet.otherSetObj.pfWattCurveEnable">
              <div style="display: flex;">
                <el-select v-model="systemSet.otherSetObj.pfWattCurveEnableVal" :placeholder="$t('common.selectPrompt')" style="width: 100%;">
                  <el-option :label="$t('deviceManage.notEnable')" value="0" />
                  <el-option :label="$t('deviceManage.enable')" value="1" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('pfWattCurveEnable', systemSet.otherSetObj.pfWattCurveEnableVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.timingModeType')" v-if="systemSet.otherSetObj.timingModeType">
              <div style="display: flex;">
                <el-select v-model="systemSet.otherSetObj.timingModeTypeVal" :placeholder="$t('common.selectPrompt')" style="width: 100%;">
                  <el-option :label="$t('deviceManage.setByDate')" value="0" />
                  <el-option :label="$t('deviceManage.setByTime')" value="1" />
                  <el-option :label="$t('deviceManage.realTimeSwitchingOfMode')" value="2" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('timingModeType', systemSet.otherSetObj.timingModeTypeVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.changeRegister1')" v-if="systemSet.otherSetObj.setQuantityChangeRegister1">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.setQuantityChangeRegister1Val":placeholder="$t('common.inputPrompt')" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('setQuantityChangeRegister1', systemSet.otherSetObj.setQuantityChangeRegister1Val)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.changeRegister2')" v-if="systemSet.otherSetObj.setQuantityChangeRegister2">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.setQuantityChangeRegister2Val" :placeholder="$t('common.inputPrompt')" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('setQuantityChangeRegister2', systemSet.otherSetObj.setQuantityChangeRegister2Val)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.changeRegister3')" v-if="systemSet.otherSetObj.setQuantityChangeRegister3">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.setQuantityChangeRegister3Val" :placeholder="$t('common.inputPrompt')" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('setQuantityChangeRegister3', systemSet.otherSetObj.setQuantityChangeRegister3Val)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.changeRegister4')" v-if="systemSet.otherSetObj.setQuantityChangeRegister4">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.setQuantityChangeRegister4Val" :placeholder="$t('common.inputPrompt')" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('setQuantityChangeRegister4', systemSet.otherSetObj.setQuantityChangeRegister4Val)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.changeRegister5')" v-if="systemSet.otherSetObj.setQuantityChangeRegister5">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.setQuantityChangeRegister5Val" :placeholder="$t('common.inputPrompt')" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('setQuantityChangeRegister5', systemSet.otherSetObj.setQuantityChangeRegister5Val)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.changeRegister6')" v-if="systemSet.otherSetObj.setQuantityChangeRegister6">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.setQuantityChangeRegister6Val" :placeholder="$t('common.inputPrompt')" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('setQuantityChangeRegister6', systemSet.otherSetObj.setQuantityChangeRegister6Val)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.changeRegister7')" v-if="systemSet.otherSetObj.setQuantityChangeRegister7">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.setQuantityChangeRegister7Val" :placeholder="$t('common.inputPrompt')" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('setQuantityChangeRegister7', systemSet.otherSetObj.setQuantityChangeRegister7Val)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.changeRegister8')" v-if="systemSet.otherSetObj.setQuantityChangeRegister8">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.setQuantityChangeRegister8Val" :placeholder="$t('common.inputPrompt')" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('setQuantityChangeRegister8', systemSet.otherSetObj.setQuantityChangeRegister8Val)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.batteryDisplayMethod')" v-if="systemSet.otherSetObj.batteryParameterDisplayMethod">
              <div style="display: flex;">
                <el-select v-model="systemSet.otherSetObj.batteryParameterDisplayMethodVal" :placeholder="$t('common.selectPrompt')" style="width: 100%;">
                  <el-option :label="$t('deviceManage.automaticPolling')" value="0" />
                  <el-option :label="$t('deviceManage.manualSwitching')" value="1" />
                </el-select>
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('batteryParameterDisplayMethod', systemSet.otherSetObj.batteryParameterDisplayMethodVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.theBatteryID')" v-if="systemSet.otherSetObj.theBatteryIdOfTheCurrentDisplayedParameter">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.theBatteryIdOfTheCurrentDisplayedParameterVal" :placeholder="$t('common.inputPrompt')" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('theBatteryIdOfTheCurrentDisplayedParameter', systemSet.otherSetObj.theBatteryIdOfTheCurrentDisplayedParameterVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.MOSControl')" v-if="systemSet.otherSetObj.mosControl">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.mosControlVal" :placeholder="$t('common.inputPrompt')" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('mosControl', systemSet.otherSetObj.mosControlVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.GPSPowerControl')" v-if="systemSet.otherSetObj.gpsCommunicationModulePowerControl">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.gpsCommunicationModulePowerControlVal" :placeholder="$t('common.inputPrompt')" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('gpsCommunicationModulePowerControl', systemSet.otherSetObj.gpsCommunicationModulePowerControlVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.realTimeClock')" v-if="systemSet.otherSetObj.realTimeClock">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.realTimeClockVal" :placeholder="$t('common.inputPrompt')" />
                <el-button type="text" style="margin-left: 5px;" @click="handleSave('realTimeClock', systemSet.otherSetObj.realTimeClockVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </template>

      <template v-else-if="activeIndex === '9'">
        <el-card style="margin-top: 10px;" v-if="batteryParameter.batterySet">
          <el-descriptions :title="$t('deviceManage.batterySettings')" :column="2">
            <el-descriptions-item :label="$t('deviceManage.batteryPackID')" v-if="batteryParameter.batterySetObj.batteryPackId">{{ batteryParameter.batterySetObj.batteryPackIdVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.currentUpgradedBatteryID')" v-if="batteryParameter.batterySetObj.currentUpgradedBatteryId">{{ batteryParameter.batterySetObj.currentUpgradedBatteryIdVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.upgradeFailedBatteryID')" v-if="batteryParameter.batterySetObj.upgradeFailedBatteryId">{{ batteryParameter.batterySetObj.upgradeFailedBatteryIdVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.numberCellStringsN')" v-if="batteryParameter.batterySetObj.numberOfBatteryPackCellStringsN">{{ batteryParameter.batterySetObj.numberOfBatteryPackCellStringsNVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.numberProbesX')" v-if="batteryParameter.batterySetObj.totalNumberOfTemperatureProbesX">{{ batteryParameter.batterySetObj.totalNumberOfTemperatureProbesXVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.leakageCurrent')" v-if="batteryParameter.batterySetObj.leakageCurrent">{{ batteryParameter.batterySetObj.leakageCurrentVal }}mA</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.intermediateBusbarVoltage')" v-if="batteryParameter.batterySetObj.intermediateBusbarVoltage">{{ batteryParameter.batterySetObj.intermediateBusbarVoltageVal }}V</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.buckBoostCurrent')" v-if="batteryParameter.batterySetObj.buckBoostCurrent">{{ batteryParameter.batterySetObj.buckBoostCurrentVal }}A</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.PVIsoVoltage')" v-if="batteryParameter.batterySetObj.pvIsoVoltage">{{ batteryParameter.batterySetObj.pvIsoVoltageVal }}V</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.zeroGroundVoltage')" v-if="batteryParameter.batterySetObj.zeroGroundVoltage">{{ batteryParameter.batterySetObj.zeroGroundVoltageVal }}V</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.DCComponentOfInverterCurrent')" v-if="batteryParameter.batterySetObj.dcComponentOfInverterCurrent">{{ batteryParameter.batterySetObj.dcComponentOfInverterCurrentVal }}mA</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.DCComponentOfLoadVoltage')" v-if="batteryParameter.batterySetObj.dcComponentOfLoadVoltage">{{ batteryParameter.batterySetObj.dcComponentOfLoadVoltageVal }}mV</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.relayIntermediateVoltage')" v-if="batteryParameter.batterySetObj.relayIntermediateVoltage">{{ batteryParameter.batterySetObj.relayIntermediateVoltageVal }}V</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.cellVoltage1')" v-if="batteryParameter.batterySetObj.cellVoltage1">{{ batteryParameter.batterySetObj.cellVoltage1Val }}mV</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.cellVoltage2')" v-if="batteryParameter.batterySetObj.cellVoltage2">{{ batteryParameter.batterySetObj.cellVoltage2Val }}mV</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.cellVoltage3')" v-if="batteryParameter.batterySetObj.cellVoltage3">{{ batteryParameter.batterySetObj.cellVoltage3Val }}mV</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.cellVoltage4')" v-if="batteryParameter.batterySetObj.cellVoltage4">{{ batteryParameter.batterySetObj.cellVoltage4Val }}mV</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.cellVoltage5')" v-if="batteryParameter.batterySetObj.cellVoltage5">{{ batteryParameter.batterySetObj.cellVoltage5Val }}mV</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.cellVoltage6')" v-if="batteryParameter.batterySetObj.cellVoltage6">{{ batteryParameter.batterySetObj.cellVoltage6Val }}mV</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.cellVoltage7')" v-if="batteryParameter.batterySetObj.cellVoltage7">{{ batteryParameter.batterySetObj.cellVoltage7Val }}mV</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.cellVoltage8')" v-if="batteryParameter.batterySetObj.cellVoltage8">{{ batteryParameter.batterySetObj.cellVoltage8Val }}mV</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.cellVoltage9')" v-if="batteryParameter.batterySetObj.cellVoltage9">{{ batteryParameter.batterySetObj.cellVoltage9Val }}mV</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.cellVoltage10')" v-if="batteryParameter.batterySetObj.cellVoltage10">{{ batteryParameter.batterySetObj.cellVoltage10Val }}mV</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.cellVoltage11')" v-if="batteryParameter.batterySetObj.cellVoltage11">{{ batteryParameter.batterySetObj.cellVoltage11Val }}mV</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.cellVoltage12')" v-if="batteryParameter.batterySetObj.cellVoltage12">{{ batteryParameter.batterySetObj.cellVoltage12Val }}mV</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.cellVoltage13')" v-if="batteryParameter.batterySetObj.cellVoltage13">{{ batteryParameter.batterySetObj.cellVoltage13Val }}mV</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.cellVoltage14')" v-if="batteryParameter.batterySetObj.cellVoltage14">{{ batteryParameter.batterySetObj.cellVoltage14Val }}mV</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.cellVoltage15')" v-if="batteryParameter.batterySetObj.cellVoltage15">{{ batteryParameter.batterySetObj.cellVoltage15Val }}mV</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.cellVoltage16')" v-if="batteryParameter.batterySetObj.cellVoltage16">{{ batteryParameter.batterySetObj.cellVoltage16Val }}mV</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.electricCurrent')" v-if="batteryParameter.batterySetObj.currentCurrent">{{ batteryParameter.batterySetObj.currentCurrentVal }}mA</el-descriptions-item>
            <el-descriptions-item label="State1" v-if="batteryParameter.batterySetObj.state1">{{ batteryParameter.batterySetObj.state1Val }}</el-descriptions-item>
            <el-descriptions-item label="State2" v-if="batteryParameter.batterySetObj.state2">{{ batteryParameter.batterySetObj.state2Val }}</el-descriptions-item>
            <el-descriptions-item label="State3" v-if="batteryParameter.batterySetObj.state3">{{ batteryParameter.batterySetObj.state3Val }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.chargingOvercurrentProtection')" v-if="batteryParameter.batterySetObj.chargingOvercurrentProtection">{{ batteryParameter.batterySetObj.chargingOvercurrentProtectionVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.chargingOvercurrentProtectionDelay')" v-if="batteryParameter.batterySetObj.chargingOvercurrentProtectionDelay">{{ batteryParameter.batterySetObj.chargingOvercurrentProtectionDelayVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.cellOvervoltageProtection')" v-if="batteryParameter.batterySetObj.cellOvervoltageProtection">{{ batteryParameter.batterySetObj.cellOvervoltageProtectionVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.cellOvervoltageProtectionDelay')" v-if="batteryParameter.batterySetObj.cellOvervoltageProtectionDelay">{{ batteryParameter.batterySetObj.cellOvervoltageProtectionDelayVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.cellOverDischargeProtection')" v-if="batteryParameter.batterySetObj.cellOverDischargeProtection">{{ batteryParameter.batterySetObj.cellOverDischargeProtectionVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.cellOverDischargeProtectionDelay')" v-if="batteryParameter.batterySetObj.cellOverDischargeProtectionDelay">{{ batteryParameter.batterySetObj.cellOverDischargeProtectionDelayVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.overvoltageHysteresisVoltage')" v-if="batteryParameter.batterySetObj.overvoltageHysteresisVoltage">{{ batteryParameter.batterySetObj.overvoltageHysteresisVoltageVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.overdischargeHysteresisVoltage')" v-if="batteryParameter.batterySetObj.overdischargeHysteresisVoltage">{{ batteryParameter.batterySetObj.overdischargeHysteresisVoltageVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.cellOvervoltageRecoveryDelay')" v-if="batteryParameter.batterySetObj.cellOvervoltageRecoveryDelay">{{ batteryParameter.batterySetObj.cellOvervoltageRecoveryDelayVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.cellOverDischargeRecoveryDelay')" v-if="batteryParameter.batterySetObj.cellOverDischargeRecoveryDelay">{{ batteryParameter.batterySetObj.cellOverDischargeRecoveryDelayVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.highProtectionDuringDischarge')" v-if="batteryParameter.batterySetObj.highTemperatureProtectionDuringDischarge">{{ batteryParameter.batterySetObj.highTemperatureProtectionDuringDischargeVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.dischargeHighProtectionRecovery')" v-if="batteryParameter.batterySetObj.highTemperatureProtectionRecoveryDuringDischarge">{{ batteryParameter.batterySetObj.highTemperatureProtectionRecoveryDuringDischargeVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.lowProtectionDuringDischarge')" v-if="batteryParameter.batterySetObj.lowTemperatureProtectionDuringDischarge">{{ batteryParameter.batterySetObj.lowTemperatureProtectionDuringDischargeVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.dischargeLowProtectionRecovery')" v-if="batteryParameter.batterySetObj.dischargeLowTemperatureProtectionRecovery">{{ batteryParameter.batterySetObj.dischargeLowTemperatureProtectionRecoveryVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.highDuringCharging')" v-if="batteryParameter.batterySetObj.highTemperatureProtectionDuringCharging">{{ batteryParameter.batterySetObj.highTemperatureProtectionDuringChargingVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.highRecoveryDuringCharging')" v-if="batteryParameter.batterySetObj.highTemperatureProtectionRecoveryDuringCharging">{{ batteryParameter.batterySetObj.highTemperatureProtectionRecoveryDuringChargingVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.lowDuringCharging')" v-if="batteryParameter.batterySetObj.lowTemperatureProtectionDuringCharging">{{ batteryParameter.batterySetObj.lowTemperatureProtectionDuringChargingVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.lowRecoveryDuringCharging')" v-if="batteryParameter.batterySetObj.lowTemperatureProtectionRecoveryDuringCharging">{{ batteryParameter.batterySetObj.lowTemperatureProtectionRecoveryDuringChargingVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.equalizingOpeningVoltage')" v-if="batteryParameter.batterySetObj.equalizingOpeningVoltage">{{ batteryParameter.batterySetObj.equalizingOpeningVoltageVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.equilibriumOpeningPressureDifference')" v-if="batteryParameter.batterySetObj.equilibriumOpeningPressureDifference">{{ batteryParameter.batterySetObj.equilibriumOpeningPressureDifferenceVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.cellTemperature1')" v-if="batteryParameter.batterySetObj.cellTemperature1">{{ batteryParameter.batterySetObj.cellTemperature1Val }}℃</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.cellTemperature2')" v-if="batteryParameter.batterySetObj.cellTemperature2">{{ batteryParameter.batterySetObj.cellTemperature2Val }}℃</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.cellTemperature3')" v-if="batteryParameter.batterySetObj.cellTemperature3">{{ batteryParameter.batterySetObj.cellTemperature3Val }}℃</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.cellTemperature4')" v-if="batteryParameter.batterySetObj.cellTemperature4">{{ batteryParameter.batterySetObj.cellTemperature4Val }}℃</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.MOSTemperature')" v-if="batteryParameter.batterySetObj.mosTemperature">{{ batteryParameter.batterySetObj.mosTemperatureVal }}℃</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.ambientTemperature')" v-if="batteryParameter.batterySetObj.ambientTemperature">{{ batteryParameter.batterySetObj.ambientTemperatureVal }}℃</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.equilibriumState1')" v-if="batteryParameter.batterySetObj.equilibriumState1">
              {{ batteryParameter.batterySetObj.equilibriumState1Val }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.equilibriumState2')" v-if="batteryParameter.batterySetObj.equilibriumState2">
              {{ batteryParameter.batterySetObj.equilibriumState2Val }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.softwareVersion')" v-if="batteryParameter.batterySetObj.softwareVersion">{{ batteryParameter.batterySetObj.softwareVersionVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.hardwareVersion')" v-if="batteryParameter.batterySetObj.hardwareVersion">{{ batteryParameter.batterySetObj.hardwareVersionVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.state')" v-if="batteryParameter.batterySetObj.state">{{ batteryParameter.batterySetObj.stateVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.cellOverDischargeAlarm')" v-if="batteryParameter.batterySetObj.alarmStatusCellOverDischargeAlarm">
              {{ batteryParameter.batterySetObj.alarmStatusCellOverDischargeAlarmVal == 0 ? $t('deviceManage.nothing') : $t('deviceManage.alarm') }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.totalOverDischargeAlarm')" v-if="batteryParameter.batterySetObj.alarmStatusTotalOverDischargeAlarm">
              {{ batteryParameter.batterySetObj.alarmStatusTotalOverDischargeAlarmVal == 0 ? $t('deviceManage.nothing') : $t('deviceManage.alarm') }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.cellOvervoltageAlarm')" v-if="batteryParameter.batterySetObj.alarmStatusCellOvervoltageAlarm">
              {{ batteryParameter.batterySetObj.alarmStatusCellOvervoltageAlarmVal == 0 ? $t('deviceManage.nothing') : $t('deviceManage.alarm') }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.totalOvervoltageAlarm')" v-if="batteryParameter.batterySetObj.alarmStatusTotalOvervoltageAlarm">
              {{ batteryParameter.batterySetObj.alarmStatusTotalOvervoltageAlarmVal == 0 ? $t('deviceManage.nothing') : $t('deviceManage.alarm') }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.dischargeOvercurrentAlarm')" v-if="batteryParameter.batterySetObj.alarmStatusDischargeOvercurrentAlarm">
              {{ batteryParameter.batterySetObj.alarmStatusDischargeOvercurrentAlarmVal == 0 ? $t('deviceManage.nothing') : $t('deviceManage.alarm') }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.dischargeOverTemperatureAlarm')" v-if="batteryParameter.batterySetObj.alarmStatusDischargeOverTemperatureAlarm">
              {{ batteryParameter.batterySetObj.alarmStatusDischargeOverTemperatureAlarmVal == 0 ? $t('deviceManage.nothing') : $t('deviceManage.alarm') }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.chargingOverTemperatureAlarm')" v-if="batteryParameter.batterySetObj.alarmStatusChargingOverTemperatureAlarm">
              {{ batteryParameter.batterySetObj.alarmStatusChargingOverTemperatureAlarmVal == 0 ? $t('deviceManage.nothing') : $t('deviceManage.alarm') }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.environmentalHighTemperatureAlarm')" v-if="batteryParameter.batterySetObj.alarmStatusEnvironmentalHighTemperatureAlarm">
              {{ batteryParameter.batterySetObj.alarmStatusEnvironmentalHighTemperatureAlarmVal == 0 ? $t('deviceManage.nothing') : $t('deviceManage.alarm') }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.environmentalLowTemperatureAlarm')" v-if="batteryParameter.batterySetObj.alarmStatusEnvironmentalLowTemperatureAlarm">
              {{ batteryParameter.batterySetObj.alarmStatusEnvironmentalLowTemperatureAlarmVal == 0 ? $t('deviceManage.nothing') : $t('deviceManage.alarm') }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.SOCLowAlarm')" v-if="batteryParameter.batterySetObj.alarmStatusSocLowAlarm">
              {{ batteryParameter.batterySetObj.alarmStatusSocLowAlarmVal == 0 ? $t('deviceManage.nothing') : $t('deviceManage.alarm') }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.MOSHighTemperatureAlarm')" v-if="batteryParameter.batterySetObj.alarmStatusMosHighTemperatureAlarm">
              {{ batteryParameter.batterySetObj.alarmStatusMosHighTemperatureAlarmVal == 0 ? $t('deviceManage.nothing') : $t('deviceManage.alarm') }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.batterySOC')" v-if="batteryParameter.batterySetObj.batterySoc">{{ batteryParameter.batterySetObj.batterySocVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.batterySOH')" v-if="batteryParameter.batterySetObj.batterySoh">{{ batteryParameter.batterySetObj.batterySohVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.numberOfCycles')" v-if="batteryParameter.batterySetObj.numberOfCycles">{{ batteryParameter.batterySetObj.numberOfCyclesVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.dischargeRemainingTime')" v-if="batteryParameter.batterySetObj.dischargeRemainingTime">{{ batteryParameter.batterySetObj.dischargeRemainingTimeVal }}min</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.chargingRemainingTime')" v-if="batteryParameter.batterySetObj.chargingRemainingTime">{{ batteryParameter.batterySetObj.chargingRemainingTimeVal }}min</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.currentChargingInterval')" v-if="batteryParameter.batterySetObj.currentChargingInterval">{{ batteryParameter.batterySetObj.currentChargingIntervalVal }}h</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.maximumChargingInterval')" v-if="batteryParameter.batterySetObj.maximumChargingInterval">{{ batteryParameter.batterySetObj.maximumChargingIntervalVal }}h</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.totalBatteryVoltage')" v-if="batteryParameter.batterySetObj.totalBatteryVoltage">{{ batteryParameter.batterySetObj.totalBatteryVoltageVal }}mV</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.maximumVoltageOfPack')" v-if="batteryParameter.batterySetObj.maximumVoltageOfBatteryPack">{{ batteryParameter.batterySetObj.maximumVoltageOfBatteryPackVal }}mV</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.minimumVoltageOfPack')" v-if="batteryParameter.batterySetObj.minimumVoltageOfBatteryPack">{{ batteryParameter.batterySetObj.minimumVoltageOfBatteryPackVal }}mV</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.maximumAllowableDischargeCurrent')" v-if="batteryParameter.batterySetObj.maximumAllowableDischargeCurrent">{{ batteryParameter.batterySetObj.maximumAllowableDischargeCurrentVal }}mA</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.maximumAllowableChargingCurrent')" v-if="batteryParameter.batterySetObj.maximumAllowableChargingCurrent">{{ batteryParameter.batterySetObj.maximumAllowableChargingCurrentVal }}mA</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.standardChargingVoltage')" v-if="batteryParameter.batterySetObj.standardChargingVoltage">{{ batteryParameter.batterySetObj.standardChargingVoltageVal }}mV</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.currentHumidity')" v-if="batteryParameter.batterySetObj.currentHumidity">{{ batteryParameter.batterySetObj.currentHumidityVal }}RH%</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.factoryCode')" v-if="batteryParameter.batterySetObj.factoryCode">{{ batteryParameter.batterySetObj.factoryCodeVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.productNumber')" v-if="batteryParameter.batterySetObj.productNumber">{{ batteryParameter.batterySetObj.productNumberVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.dateOfProduction')" v-if="batteryParameter.batterySetObj.dateOfProduction">{{ batteryParameter.batterySetObj.dateOfProductionVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.batteryDetectionResistanceValue')" v-if="batteryParameter.batterySetObj.batteryDetectionResistanceValue">{{ batteryParameter.batterySetObj.batteryDetectionResistanceValueVal }}mΩ</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.maximumCellTemperature')" v-if="batteryParameter.batterySetObj.maximumCellTemperature">{{ batteryParameter.batterySetObj.maximumCellTemperatureVal }}℃</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.minimumCellTemperature')" v-if="batteryParameter.batterySetObj.minimumCellTemperature">{{ batteryParameter.batterySetObj.minimumCellTemperatureVal }}℃</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.temperatureDifference')" v-if="batteryParameter.batterySetObj.temperatureDifference">{{ batteryParameter.batterySetObj.temperatureDifferenceVal }}℃</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.temperatureProtectionValue')" v-if="batteryParameter.batterySetObj.temperatureDifferenceProtectionValue">{{ batteryParameter.batterySetObj.temperatureDifferenceProtectionValueVal }}mV</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.temperatureAlarmValue')" v-if="batteryParameter.batterySetObj.temperatureDifferenceAlarmValue">{{ batteryParameter.batterySetObj.temperatureDifferenceAlarmValueVal }}mV</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.differentialProtectionValue')" v-if="batteryParameter.batterySetObj.differentialPressureProtectionValue">{{ batteryParameter.batterySetObj.differentialPressureProtectionValueVal }}mV</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.differentialAlarmValue')" v-if="batteryParameter.batterySetObj.differentialPressureAlarmValue">{{ batteryParameter.batterySetObj.differentialPressureAlarmValueVal }}mV</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.staticEquilibriumTime')" v-if="batteryParameter.batterySetObj.staticEquilibriumTime">{{ batteryParameter.batterySetObj.staticEquilibriumTimeVal }}min</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.automaticRecoveryDelay')" v-if="batteryParameter.batterySetObj.automaticRecoveryDelayAfterChargingOvercurrent">{{ batteryParameter.batterySetObj.automaticRecoveryDelayAfterChargingOvercurrentVal }}min</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.automaticallyResumeLocking')" v-if="batteryParameter.batterySetObj.automaticallyResumeLockingAfterOvercharging">{{ batteryParameter.batterySetObj.automaticallyResumeLockingAfterOverchargingVal }}min</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.automaticRecoveryDelay')" v-if="batteryParameter.batterySetObj.automaticRecoveryDelayAfterDischargeOvercurrent">{{ batteryParameter.batterySetObj.automaticRecoveryDelayAfterDischargeOvercurrentVal }}min</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.automaticRecoveryLocking')" v-if="batteryParameter.batterySetObj.automaticRecoveryLockingAfterDischargeOvercurrent">{{ batteryParameter.batterySetObj.automaticRecoveryLockingAfterDischargeOvercurrentVal }}min</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.inverterCurrentLimit')" v-if="batteryParameter.batterySetObj.theInverterCurrentExceedsTheLimitCurrent">{{ batteryParameter.batterySetObj.theInverterCurrentExceedsTheLimitCurrentVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.batteryParameterDisplayMethod')" v-if="batteryParameter.batterySetObj.batteryParameterDisplayMethod">
              {{ batteryParameter.batterySetObj.batteryParameterDisplayMethodVal == 0 ? '自动轮询' : '自动轮询' }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.batteryIDParameter')" v-if="batteryParameter.batterySetObj.theBatteryIdOfTheCurrentDisplayedParameter">{{ batteryParameter.batterySetObj.theBatteryIdOfTheCurrentDisplayedParameterVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.batteryPackDesignCapacity')" v-if="batteryParameter.batterySetObj.batteryPackDesignCapacity">{{ batteryParameter.batterySetObj.batteryPackDesignCapacityVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.currentBatteryFullCapacity')" v-if="batteryParameter.batterySetObj.currentBatteryFullCapacity">{{ batteryParameter.batterySetObj.currentBatteryFullCapacityVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.remainingBatteryCapacity')" v-if="batteryParameter.batterySetObj.remainingBatteryCapacity">{{ batteryParameter.batterySetObj.remainingBatteryCapacityVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.MOSControl')" v-if="batteryParameter.batterySetObj.mosControl">{{ batteryParameter.batterySetObj.mosControlVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.chargingDischargingHeating')" v-if="batteryParameter.batterySetObj.chargingDischargingHeatingEnable">
              {{ batteryParameter.batterySetObj.chargingDischargingHeatingEnableVal }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.GPSPowerControl')" v-if="batteryParameter.batterySetObj.gpsCommunicationModulePowerControl">{{ batteryParameter.batterySetObj.gpsCommunicationModulePowerControlVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.realTimeClock')" v-if="batteryParameter.batterySetObj.realTimeClock">{{ batteryParameter.batterySetObj.realTimeClockVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.dischargeOvercurrentProtection')" v-if="batteryParameter.batterySetObj.dischargeOvercurrent1Protection">{{ batteryParameter.batterySetObj.dischargeOvercurrent1ProtectionVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.dischargeOvercurrentDelay')" v-if="batteryParameter.batterySetObj.dischargeOvercurrent1Delay">{{ batteryParameter.batterySetObj.dischargeOvercurrent1DelayVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.environmentalHighProtection')" v-if="batteryParameter.batterySetObj.environmentalHighTemperatureProtection">{{ batteryParameter.batterySetObj.environmentalHighTemperatureProtectionVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.environmentalHighProtectionRecovery')" v-if="batteryParameter.batterySetObj.environmentalHighTemperatureProtectionRecovery">{{ batteryParameter.batterySetObj.environmentalHighTemperatureProtectionRecoveryVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.environmentalLowProtection')" v-if="batteryParameter.batterySetObj.environmentalLowTemperatureProtection">{{ batteryParameter.batterySetObj.environmentalLowTemperatureProtectionVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.environmentalLowProtectionRecovery')" v-if="batteryParameter.batterySetObj.environmentalLowTemperatureProtectionRecovery">{{ batteryParameter.batterySetObj.environmentalLowTemperatureProtectionRecoveryVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.totalPressureOvervoltageProtection')" v-if="batteryParameter.batterySetObj.totalPressureOvervoltageProtection">{{ batteryParameter.batterySetObj.totalPressureOvervoltageProtectionVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.totalPressureOvervoltageProtectionRecovery')" v-if="batteryParameter.batterySetObj.totalPressureOvervoltageProtectionRecovery">{{ batteryParameter.batterySetObj.totalPressureOvervoltageProtectionRecoveryVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.totalVoltageOvervoltageProtection')" v-if="batteryParameter.batterySetObj.totalVoltageOvervoltageProtection">{{ batteryParameter.batterySetObj.totalVoltageOvervoltageProtectionVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.totalPressureOverdischargeRecovery')" v-if="batteryParameter.batterySetObj.totalPressureOverDischargeRecovery">{{ batteryParameter.batterySetObj.totalPressureOverDischargeRecoveryVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.totalOvervoltageProtectionDelay')" v-if="batteryParameter.batterySetObj.totalVoltageOvervoltageProtectionDelay">{{ batteryParameter.batterySetObj.totalVoltageOvervoltageProtectionDelayVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.totalOverdischargeProtectionDelay')" v-if="batteryParameter.batterySetObj.totalVoltageOverDischargeProtectionDelay">{{ batteryParameter.batterySetObj.totalVoltageOverDischargeProtectionDelayVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.totalOvervoltageRecoveryDelay')" v-if="batteryParameter.batterySetObj.totalOvervoltageRecoveryDelay">{{ batteryParameter.batterySetObj.totalOvervoltageRecoveryDelayVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.totalOverdischargeRecoveryDelay')" v-if="batteryParameter.batterySetObj.totalOverdischargeRecoveryDelay">{{ batteryParameter.batterySetObj.totalOverdischargeRecoveryDelayVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.MOSHighProtection')" v-if="batteryParameter.batterySetObj.mosHighTemperatureProtection">{{ batteryParameter.batterySetObj.mosHighTemperatureProtectionVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.MOSHighRecovery')" v-if="batteryParameter.batterySetObj.mosHighTemperatureRecovery">{{ batteryParameter.batterySetObj.mosHighTemperatureRecoveryVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.MOSHighProtectionDelay')" v-if="batteryParameter.batterySetObj.moshighTemperatureProtectionDelay">{{ batteryParameter.batterySetObj.moshighTemperatureProtectionDelayVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.fullTotalPressureAbove')" v-if="batteryParameter.batterySetObj.fullOfProtectionTotalPressureAbove">{{ batteryParameter.batterySetObj.fullOfProtectionTotalPressureAboveVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.fullChargingCurrentBelow')" v-if="batteryParameter.batterySetObj.fullOfProtectionChargingCurrentBelow">{{ batteryParameter.batterySetObj.fullOfProtectionChargingCurrentBelowVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.fullDelayTime')" v-if="batteryParameter.batterySetObj.fullOfProtectionDelayTime">{{ batteryParameter.batterySetObj.fullOfProtectionDelayTimeVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.heatingOnTemperature')" v-if="batteryParameter.batterySetObj.heatingFanOnTemperature">{{ batteryParameter.batterySetObj.heatingFanOnTemperatureVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.heatingRecoveryTemperature')" v-if="batteryParameter.batterySetObj.heatingFanRecoveryTemperature">{{ batteryParameter.batterySetObj.heatingFanRecoveryTemperatureVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.voltageAlarm')" v-if="batteryParameter.batterySetObj.enableSettingsVoltageAlarm">
              {{ batteryParameter.batterySetObj.enableSettingsVoltageAlarmVal == 1 ? $t('menuManage.open') : $t('menuManage.close') }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.overcurrentAlarm')" v-if="batteryParameter.batterySetObj.enableSettingsOvercurrentAlarm">
              {{ batteryParameter.batterySetObj.enableSettingsOvercurrentAlarmVal == 1 ? $t('menuManage.open') : $t('menuManage.close') }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.overTemperatureAlarm')" v-if="batteryParameter.batterySetObj.enableSettingsCellTemperatureAlarm">
              {{ batteryParameter.batterySetObj.enableSettingsCellTemperatureAlarmVal == 1 ? $t('menuManage.open') : $t('menuManage.close') }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.MOSOverTemperatureAlarm')" v-if="batteryParameter.batterySetObj.enableSettingMosOverTemperatureAlarm">
              {{ batteryParameter.batterySetObj.enableSettingMosOverTemperatureAlarmVal == 1 ? $t('menuManage.open') : $t('menuManage.close') }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.cellImbalanceAlarm')" v-if="batteryParameter.batterySetObj.enableSettingsCellImbalanceAlarm">
              {{ batteryParameter.batterySetObj.enableSettingsCellImbalanceAlarmVal == 1 ? $t('menuManage.open') : $t('menuManage.close') }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.ambientTemperatureAlarm')" v-if="batteryParameter.batterySetObj.enableSettingsAmbientTemperatureAlarm">
              {{ batteryParameter.batterySetObj.enableSettingsAmbientTemperatureAlarmVal == 1 ? $t('menuManage.open') : $t('menuManage.close') }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.SOCLowAlarm')" v-if="batteryParameter.batterySetObj.enableSettingSocLowAlarm">
              {{ batteryParameter.batterySetObj.enableSettingSocLowAlarmVal == 1 ? $t('menuManage.open') : $t('menuManage.close') }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.chargingAndHeatingEnable')" v-if="batteryParameter.batterySetObj.enableSettingsUnlockSystemLocks">
              {{ batteryParameter.batterySetObj.enableSettingsUnlockSystemLocksVal == 1 ? $t('menuManage.open') : $t('menuManage.close') }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.totalVoltageProtection')" v-if="batteryParameter.batterySetObj.enableSettingsTotalVoltageProtection">
              {{ batteryParameter.batterySetObj.enableSettingsTotalVoltageProtectionVal == 1 ? $t('menuManage.open') : $t('menuManage.close') }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.dischargeRecoveryFunction')" v-if="batteryParameter.batterySetObj.enableSettingsDischargeRecoveryAfterChargingOvercurrent">
              {{ batteryParameter.batterySetObj.enableSettingsDischargeRecoveryAfterChargingOvercurrentVal == 1 ? $t('menuManage.open') : $t('menuManage.close') }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.delayAutomaticRecoveryFunction')" v-if="batteryParameter.batterySetObj.enableSettingsDelayAutomaticRecoveryAfterDischargeOvercurrent">
              {{ batteryParameter.batterySetObj.enableSettingsDelayAutomaticRecoveryAfterDischargeOvercurrentVal == 1 ? $t('menuManage.open') : $t('menuManage.close') }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.chargingRecoveryFunction')" v-if="batteryParameter.batterySetObj.enableSettingsChargingAfterDischargeOvercurrent">
              {{ batteryParameter.batterySetObj.enableSettingsChargingAfterDischargeOvercurrentVal == 1 ? $t('menuManage.open') : $t('menuManage.close') }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.staticEqualizationFunction')" v-if="batteryParameter.batterySetObj.enableSettingsStaticEquilibrium">
              {{ batteryParameter.batterySetObj.enableSettingsStaticEquilibriumVal == 1 ? $t('menuManage.open') : $t('menuManage.close') }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.systemLockNumber')" v-if="batteryParameter.batterySetObj.systemLockStatusSerialNumber">
              {{ batteryParameter.batterySetObj.systemLockStatusSerialNumberVal | systemLockStatusSerialNumberValFilter }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.totalOvervoltageVoltage')" v-if="batteryParameter.batterySetObj.totalVoltageOvervoltageAlarmVoltage">{{ batteryParameter.batterySetObj.totalVoltageOvervoltageAlarmVoltageVal }}mV</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.totalOverdischargeVoltage')" v-if="batteryParameter.batterySetObj.totalVoltageOverDischargeAlarmVoltage">{{ batteryParameter.batterySetObj.totalVoltageOverDischargeAlarmVoltageVal }}mV</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.cellOvervoltageVoltage')" v-if="batteryParameter.batterySetObj.cellOvervoltageAlarmVoltage">
              {{ batteryParameter.batterySetObj.cellOvervoltageAlarmVoltageVal }}V
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.cellOverdischargeVoltage')" v-if="batteryParameter.batterySetObj.cellOverDischargeAlarmVoltage">
              {{ batteryParameter.batterySetObj.cellOverDischargeAlarmVoltageVal }}V
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.chargingOvercurrentAlarm')" v-if="batteryParameter.batterySetObj.chargingOvercurrentAlarmCurrent">{{ batteryParameter.batterySetObj.chargingOvercurrentAlarmCurrentVal }}A</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.dischargeOvercurrentAlarm')" v-if="batteryParameter.batterySetObj.dischargeOvercurrentAlarmCurrent">{{ batteryParameter.batterySetObj.dischargeOvercurrentAlarmCurrentVal }}A</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.chargingHighAlarm')" v-if="batteryParameter.batterySetObj.chargingHighTemperatureAlarmTemperature">{{ batteryParameter.batterySetObj.chargingHighTemperatureAlarmTemperatureVal }}℃</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.chargingLowAlarm')" v-if="batteryParameter.batterySetObj.chargingLowTemperatureAlarmTemperature">{{ batteryParameter.batterySetObj.chargingLowTemperatureAlarmTemperatureVal }}℃</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.dischargeHighAlarm')" v-if="batteryParameter.batterySetObj.dischargeHighTemperatureAlarmTemperature">{{ batteryParameter.batterySetObj.dischargeHighTemperatureAlarmTemperatureVal }}℃</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.dischargeLowAlarm')" v-if="batteryParameter.batterySetObj.dischargeLowTemperatureAlarmTemperature">{{ batteryParameter.batterySetObj.dischargeLowTemperatureAlarmTemperatureVal }}℃</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.MOSAlarmTemperature')" v-if="batteryParameter.batterySetObj.mosOverTemperatureAlarmTemperature">{{ batteryParameter.batterySetObj.mosOverTemperatureAlarmTemperatureVal }}℃</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.MOSRecoveryTemperature')" v-if="batteryParameter.batterySetObj.mosOverTemperatureAlarmRecoveryTemperature">{{ batteryParameter.batterySetObj.mosOverTemperatureAlarmRecoveryTemperatureVal }}℃</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.batteryImbalanceAlarmPressure')" v-if="batteryParameter.batterySetObj.batteryImbalanceAlarmPressureDifference">{{ batteryParameter.batterySetObj.batteryImbalanceAlarmPressureDifferenceVal }}mV</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.imbalancePressureDifference')" v-if="batteryParameter.batterySetObj.imbalanceAlarmRecoveryPressureDifference">{{ batteryParameter.batterySetObj.imbalanceAlarmRecoveryPressureDifferenceVal }}mV</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.environmentalHighTemperatureAlarm')" v-if="batteryParameter.batterySetObj.environmentalHighTemperatureAlarm">{{ batteryParameter.batterySetObj.environmentalHighTemperatureAlarmVal }}℃</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.environmentalLowTemperatureAlarm')" v-if="batteryParameter.batterySetObj.environmentalLowTemperatureAlarm">{{ batteryParameter.batterySetObj.environmentalLowTemperatureAlarmVal }}℃</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.SOCLowAlarm')" v-if="batteryParameter.batterySetObj.socLowAlarm">{{ batteryParameter.batterySetObj.socLowAlarmVal }}%</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.chargingCurrentLimiting')" v-if="batteryParameter.batterySetObj.chargingCurrentLimitingFunction">
              {{ batteryParameter.batterySetObj.chargingCurrentLimitingFunctionVal == 1 ? '启用' : '禁用' }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.powerDownVoltage')" v-if="batteryParameter.batterySetObj.powerDownVoltage">{{ batteryParameter.batterySetObj.powerDownVoltageVal }}mV</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.powerDownCurrent')" v-if="batteryParameter.batterySetObj.powerDownCurrent">{{ batteryParameter.batterySetObj.powerDownCurrentVal }}A</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.powerDownDelay')" v-if="batteryParameter.batterySetObj.powerDownDelay">{{ batteryParameter.batterySetObj.powerDownDelayVal }}min</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.monthlySelfDischargeRate')" v-if="batteryParameter.batterySetObj.monthlySelfDischargeRate">{{ batteryParameter.batterySetObj.monthlySelfDischargeRateVal }}%</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.capacityRatio')" v-if="batteryParameter.batterySetObj.cycle1CapacityRatio">{{ batteryParameter.batterySetObj.cycle1CapacityRatioVal }}%</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.SOCMonomerVoltage')" v-if="batteryParameter.batterySetObj.soc0PercentMonomerVoltage">{{ batteryParameter.batterySetObj.soc0PercentMonomerVoltageVal }}mV</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.fullCapacityOnce')" v-if="batteryParameter.batterySetObj.fullCapacityAttenuationOncePerCycle">{{ batteryParameter.batterySetObj.fullCapacityAttenuationOncePerCycleVal }}%</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.mailAddress')" v-if="batteryParameter.batterySetObj.communicateAddress">{{ batteryParameter.batterySetObj.communicateAddressVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.customParameter1')" v-if="batteryParameter.batterySetObj.customParameters1">{{ batteryParameter.batterySetObj.customParameters1Val }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.customParameter2')" v-if="batteryParameter.batterySetObj.customParameters2">{{ batteryParameter.batterySetObj.customParameters2Val }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.customParameter3')" v-if="batteryParameter.batterySetObj.customParameters3">{{ batteryParameter.batterySetObj.customParameters3Val }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.customParameter4')" v-if="batteryParameter.batterySetObj.customParameters4">{{ batteryParameter.batterySetObj.customParameters4Val }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.customParameter5')" v-if="batteryParameter.batterySetObj.customParameters5">{{ batteryParameter.batterySetObj.customParameters5Val }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.customParameter6')" v-if="batteryParameter.batterySetObj.customParameters6">{{ batteryParameter.batterySetObj.customParameters6Val }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.customParameter7')" v-if="batteryParameter.batterySetObj.customParameters7">{{ batteryParameter.batterySetObj.customParameters7Val }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.customParameter8')" v-if="batteryParameter.batterySetObj.customParameters8">{{ batteryParameter.batterySetObj.customParameters8Val }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.customStatus1')" v-if="batteryParameter.batterySetObj.customStatus1">{{ batteryParameter.batterySetObj.customStatus1Val }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.customStatus2')" v-if="batteryParameter.batterySetObj.customStatus2">{{ batteryParameter.batterySetObj.customStatus2Val }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.heatingEnable')" v-if="batteryParameter.batterySetObj.dischargeStaticHeatingEnable">{{ batteryParameter.batterySetObj.dischargeStaticHeatingEnableVal }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.unlockSystemLock')" v-if="batteryParameter.batterySetObj.unlockSystemLock">
              {{ batteryParameter.batterySetObj.unlockSystemLockVal == 1 ? $t('deviceManage.unlock') : $t('deviceManage.invalid') }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.onHeating')" v-if="batteryParameter.batterySetObj.dischargeOnHeatingTemperature">{{ batteryParameter.batterySetObj.dischargeOnHeatingTemperatureVal }}℃</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.offHeating')" v-if="batteryParameter.batterySetObj.dischargeOffHeatingTemperature">{{ batteryParameter.batterySetObj.dischargeOffHeatingTemperatureVal }}℃</el-descriptions-item>
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