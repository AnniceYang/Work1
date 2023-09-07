<template>
  <div class="container">
    <template v-if="type === '0'">
      <el-card>
        <div slot="header">
          <span>{{$t('parameterConfiguration.OperationInformation')}}</span>
          <el-switch
            style="margin-left: 10px"
            v-model="operationInformation.isShow"
            @change="changeOperationInformation"
          />
          <el-button
            style="float: right; margin-top: -10px"
            type="primary"
            @click="handleSave()"
            >{{$t('common.save')}}</el-button
          >
        </div>

        <el-card>
          <div slot="header">
            <span>{{$t('parameterConfiguration.OperationInformation')}}</span>
            <el-switch
              style="margin-left: 10px"
              v-model="operationInformation.runInformation"
              @change="changeOperationInformationItem('runInformation')"
            />
          </div>
          <el-descriptions title="" :column="3">
            <el-descriptions-item :label="$t('parameterConfiguration.DisplayType')">
              <el-switch
                v-model="operationInformation.runInformationObj.displayType"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.MCUSoftwareVersion')">
              <el-switch
                v-model="
                  operationInformation.runInformationObj.mcuSoftwareVersion
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.DSPSoftwareVersion')">
              <el-switch
                v-model="
                  operationInformation.runInformationObj.dspSoftwareVersion
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.MCUHardwareVersion')">
              <el-switch
                v-model="
                  operationInformation.runInformationObj.mcuHardwareVersion
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.DSPHardwareVersion')">
              <el-switch
                v-model="
                  operationInformation.runInformationObj.dspHardwareVersion
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CurrentModeOfTheSystem')">
              <el-switch
                v-model="
                  operationInformation.runInformationObj.currentModeOfTheSystem
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.SystemOperationStatus')">
              <el-switch
                v-model="operationInformation.runInformationObj.systemRunStatus"
              />
            </el-descriptions-item>
          </el-descriptions>
        </el-card>

        <el-card style="margin-top: 10px">
          <div slot="header">
            <span>{{$t('parameterConfiguration.BasicInformation')}}</span>
            <el-switch
              style="margin-left: 10px"
              v-model="operationInformation.basicInformation"
              @change="changeOperationInformationItem('basicInformation')"
            />
          </div>
          <el-descriptions title="" :column="3">
            <el-descriptions-item :label="$t('parameterConfiguration.DCDCTemperature')">
              <el-switch
                v-model="
                  operationInformation.basicInformationObj.dcdcTemperature
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CountryCode')">
              <el-switch
                v-model="operationInformation.basicInformationObj.countryCode"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.BusVoltage')">
              <el-switch
                v-model="operationInformation.basicInformationObj.busVoltage"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.DailyPowerGeneration')">
              <el-switch
                v-model="
                  operationInformation.basicInformationObj.dailyPowerGeneration
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TotalPowerGeneration')">
              <el-switch
                v-model="
                  operationInformation.basicInformationObj.totalPowerGeneration
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.RatedPower')">
              <el-switch
                v-model="operationInformation.basicInformationObj.ratedPower"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.BatteryEnergy')">
              <el-switch
                v-model="operationInformation.basicInformationObj.batteryEnergy"
              />
            </el-descriptions-item>
          </el-descriptions>
        </el-card>

        <el-card style="margin-top: 10px">
          <div slot="header">
            <span>{{$t('parameterConfiguration.PVInformation')}}</span>
            <el-switch
              style="margin-left: 10px"
              v-model="operationInformation.pvInformation"
              @change="changeOperationInformationItem('pvInformation')"
            />
          </div>
          <el-descriptions title="" :column="3">
            <el-descriptions-item :label="$t('parameterConfiguration.PV1Voltage')">
              <el-switch
                v-model="operationInformation.pvInformationObj.pv1Voltage"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.PV1Current')">
              <el-switch
                v-model="operationInformation.pvInformationObj.pv1Current"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.PV1Power')">
              <el-switch
                v-model="operationInformation.pvInformationObj.pv1Power"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.PV2Voltage')">
              <el-switch
                v-model="operationInformation.pvInformationObj.pv2Voltage"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.PV2Current')">
              <el-switch
                v-model="operationInformation.pvInformationObj.pv2Current"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.PV2Power')">
              <el-switch
                v-model="operationInformation.pvInformationObj.pv2Power"
              />
            </el-descriptions-item>
          </el-descriptions>
        </el-card>

        <el-card style="margin-top: 10px">
          <div slot="header">
            <span>{{$t('parameterConfiguration.BatteryInformation')}}</span>
            <el-switch
              style="margin-left: 10px"
              v-model="operationInformation.batteryInformation"
              @change="changeOperationInformationItem('batteryInformation')"
            />
          </div>
          <el-descriptions title="" :column="3">
            <el-descriptions-item :label="$t('parameterConfiguration.BatteryStatus')">
              <el-switch
                v-model="
                  operationInformation.batteryInformationObj.batteryStatus
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.BatteryVoltage')">
              <el-switch
                v-model="
                  operationInformation.batteryInformationObj.batteryVoltage
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.BatteryCurrent')">
              <el-switch
                v-model="
                  operationInformation.batteryInformationObj.batteryCurrent
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.BatteryPower')">
              <el-switch
                v-model="
                  operationInformation.batteryInformationObj.batteryPower
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TotalSOCOfBattery')">
              <el-switch
                v-model="
                  operationInformation.batteryInformationObj.batteryTotalSoc
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.BMSLogo')">
              <el-switch
                v-model="operationInformation.batteryInformationObj.bmsSign"
              />
            </el-descriptions-item>
          </el-descriptions>
        </el-card>

        <el-card style="margin-top: 10px">
          <div slot="header">
            <span>{{$t('parameterConfiguration.PowerGridInformation')}}</span>
            <el-switch
              style="margin-left: 10px"
              v-model="operationInformation.powerGridInformation"
              @change="changeOperationInformationItem('powerGridInformation')"
            />
          </div>
          <el-descriptions title="" :column="3">
            <el-descriptions-item :label="$t('parameterConfiguration.PowerGridStatus')">
              <el-switch
                v-model="
                  operationInformation.powerGridInformationObj.powerGridStatus
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.AphaseGridFrequency')">
              <el-switch
                v-model="
                  operationInformation.powerGridInformationObj.gridFrequencyA
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.BphaseGridFrequency')">
              <el-switch
                v-model="
                  operationInformation.powerGridInformationObj.gridFrequencyB
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CphaseGridFrequency')">
              <el-switch
                v-model="
                  operationInformation.powerGridInformationObj.gridFrequencyC
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.AphaseGridVoltage')">
              <el-switch
                v-model="
                  operationInformation.powerGridInformationObj.gridVoltageA
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.BphaseGridVoltage')">
              <el-switch
                v-model="
                  operationInformation.powerGridInformationObj.gridVoltageB
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CphaseGridVoltage')">
              <el-switch
                v-model="
                  operationInformation.powerGridInformationObj.gridVoltageC
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.ApparentPowerOfThePowerGrid')">
              <el-switch
                v-model="
                  operationInformation.powerGridInformationObj
                    .apparentPowerOfThePowerGrid
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.ActivePowerOfThePowerGrid')">
              <el-switch
                v-model="
                  operationInformation.powerGridInformationObj
                    .activePowerOfThePowerGrid
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.ReactivePowerOfThePowerGrid')">
              <el-switch
                v-model="
                  operationInformation.powerGridInformationObj
                    .reactivePowerOfThePowerGrid
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CTCurrent')">
              <el-switch
                v-model="operationInformation.powerGridInformationObj.ctCurrent"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CTPower')">
              <el-switch
                v-model="operationInformation.powerGridInformationObj.ctPower"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CTDirection')">
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
            <span>{{$t('parameterConfiguration.InverterInformation')}}</span>
            <el-switch
              style="margin-left: 10px"
              v-model="operationInformation.inverterInformation"
              @change="changeOperationInformationItem('inverterInformation')"
            />
          </div>
          <el-descriptions title="" :column="2">
            <el-descriptions-item :label="$t('parameterConfiguration.InverterTemperature')">
              <el-switch
                v-model="
                  operationInformation.inverterInformationObj
                    .inverterTemperature
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.InversionState')">
              <el-switch
                v-model="
                  operationInformation.inverterInformationObj.inversionState
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.AphaseInverterOutputFrequency')">
              <el-switch
                v-model="
                  operationInformation.inverterInformationObj
                    .inverterOutputFrequencyA
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.BphaseInverterOutputFrequency')">
              <el-switch
                v-model="
                  operationInformation.inverterInformationObj
                    .inverterOutputFrequencyB
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CphaseInverterOutputFrequency')">
              <el-switch
                v-model="
                  operationInformation.inverterInformationObj
                    .inverterOutputFrequencyC
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.AphaseInverterOutputVoltage')">
              <el-switch
                v-model="
                  operationInformation.inverterInformationObj
                    .inverterOutputVoltageA
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.BphaseInverterOutputVoltage')">
              <el-switch
                v-model="
                  operationInformation.inverterInformationObj
                    .inverterOutputVoltageB
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CphaseInverterOutputVoltage')">
              <el-switch
                v-model="
                  operationInformation.inverterInformationObj
                    .inverterOutputVoltageC
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.AphaseInverterOutputCurrent')">
              <el-switch
                v-model="
                  operationInformation.inverterInformationObj
                    .inverterOutputCurrentA
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.BphaseInverterOutputCurrent')">
              <el-switch
                v-model="
                  operationInformation.inverterInformationObj
                    .inverterOutputCurrentB
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CphaseInverterOutputCurrent')">
              <el-switch
                v-model="
                  operationInformation.inverterInformationObj
                    .inverterOutputCurrentC
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.AphaseInverterApparentPower')">
              <el-switch
                v-model="
                  operationInformation.inverterInformationObj
                    .invertedApparentPowerA
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.BphaseInverterApparentPower')">
              <el-switch
                v-model="
                  operationInformation.inverterInformationObj
                    .invertedApparentPowerB
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.ChaseInverterApparentPower')">
              <el-switch
                v-model="
                  operationInformation.inverterInformationObj
                    .invertedApparentPowerC
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.AphaseInverterActivePower')">
              <el-switch
                v-model="
                  operationInformation.inverterInformationObj
                    .invertedActivePowerA
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.BphaseInverterActivePower')">
              <el-switch
                v-model="
                  operationInformation.inverterInformationObj
                    .invertedActivePowerB
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CphaseInverterActivePower')">
              <el-switch
                v-model="
                  operationInformation.inverterInformationObj
                    .invertedActivePowerC
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.AphaseInverterReactivePower')">
              <el-switch
                v-model="
                  operationInformation.inverterInformationObj
                    .invertedReactivePowerA
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.BphaseInverterReactivePower')">
              <el-switch
                v-model="
                  operationInformation.inverterInformationObj
                    .invertedReactivePowerB
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CphaseInverterReactivePower')">
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
            <span>{{$t('parameterConfiguration.LoadInformation')}}</span>
            <el-switch
              style="margin-left: 10px"
              v-model="operationInformation.loadInformation"
              @change="changeOperationInformationItem('loadInformation')"
            />
          </div>
          <el-descriptions title="" :column="2">
            <el-descriptions-item :label="$t('parameterConfiguration.AphaseLoadVoltage')">
              <el-switch
                v-model="operationInformation.loadInformationObj.loadVoltageA"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.BphaseLoadVoltage')">
              <el-switch
                v-model="operationInformation.loadInformationObj.loadVoltageB"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CphaseLoadVoltage')">
              <el-switch
                v-model="operationInformation.loadInformationObj.loadVoltageC"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.AphaseLoadCurrent')">
              <el-switch
                v-model="operationInformation.loadInformationObj.loadCurrentA"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.BphaseLoadCurrent')">
              <el-switch
                v-model="operationInformation.loadInformationObj.loadCurrentB"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CphaseLoadCurrent')">
              <el-switch
                v-model="operationInformation.loadInformationObj.loadCurrentC"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.ApparentPowerOfAphaseLoad')">
              <el-switch
                v-model="
                  operationInformation.loadInformationObj.apparentPowerOfLoadA
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.ApparentPowerOfBphaseLoad')">
              <el-switch
                v-model="
                  operationInformation.loadInformationObj.apparentPowerOfLoadB
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.ApparentPowerOfCphaseLoad')">
              <el-switch
                v-model="
                  operationInformation.loadInformationObj.apparentPowerOfLoadC
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.ActivePowerOfAphaseLoad')">
              <el-switch
                v-model="
                  operationInformation.loadInformationObj.loadActivePowerA
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.ActivePowerOfBphaseLoad')">
              <el-switch
                v-model="
                  operationInformation.loadInformationObj.loadActivePowerB
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.ActivePowerOfCphaseLoad')">
              <el-switch
                v-model="
                  operationInformation.loadInformationObj.loadActivePowerC
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.AphaseLoadPowerPercentage')">
              <el-switch
                v-model="
                  operationInformation.loadInformationObj.loadPowerPercentageA
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.BphaseLoadPowerPercentage')">
              <el-switch
                v-model="
                  operationInformation.loadInformationObj.loadPowerPercentageB
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CphaseLoadPowerPercentage')">
              <el-switch
                v-model="
                  operationInformation.loadInformationObj.loadPowerPercentageC
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.RealTimePowerOfLoad')">
              <el-switch
                v-model="
                  operationInformation.loadInformationObj.realTimePowerOfLoad
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.PowerConsumption')">
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
            <span>{{$t('parameterConfiguration.ElectricityMeterInformation')}}</span>
            <el-switch
              style="margin-left: 10px"
              v-model="operationInformation.electricityMeterInformation"
              @change="
                changeOperationInformationItem('electricityMeterInformation')
              "
            />
          </div>
          <el-descriptions title="" :column="3">
            <el-descriptions-item :label="$t('parameterConfiguration.NormalIndicatorOfElectricityMeter')">
              <el-switch
                v-model="
                  operationInformation.electricityMeterInformationObj
                    .normalIndicatorOfElectricityMeter
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.MeterVoltage')">
              <el-switch
                v-model="
                  operationInformation.electricityMeterInformationObj
                    .meterVoltage
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CurrentCombinedActiveEnergy')">
              <el-switch
                v-model="
                  operationInformation.electricityMeterInformationObj
                    .currentCombinedActiveEnergy
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CurrentPositiveActiveEnergy')">
              <el-switch
                v-model="
                  operationInformation.electricityMeterInformationObj
                    .currentPositiveActiveEnergy
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CurrentReverseActiveEnergy')">
              <el-switch
                v-model="
                  operationInformation.electricityMeterInformationObj
                    .currentReverseActiveEnergy
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.ElectricityMeterCurrent')">
              <el-switch
                v-model="
                  operationInformation.electricityMeterInformationObj
                    .electricityMeterCurrent
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.MeterPower')">
              <el-switch
                v-model="
                  operationInformation.electricityMeterInformationObj
                    .electricityMeterPower
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.MeterPowerFactor')">
              <el-switch
                v-model="
                  operationInformation.electricityMeterInformationObj
                    .electricityMeterPowerFactor
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.MeterFrequency')">
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
            <span>{{$t('parameterConfiguration.OtherInformation')}}</span>
            <el-switch
              style="margin-left: 10px"
              v-model="operationInformation.otherInformation"
              @change="changeOperationInformationItem('otherInformation')"
            />
          </div>
          <el-descriptions title="" :column="2">
            <el-descriptions-item :label="$t('parameterConfiguration.SelfInspectionStatus')">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj.selfInspectionStatus
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.SelfCheckActualProtectionThreshold')">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj
                    .selfCheckActualProtectionThreshold
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.SelfCheckActualProtectionTime')">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj
                    .selfCheckActualProtectionTime
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.SelfCheckRealtimeProtectionThreshold')">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj
                    .selfCheckRealTimeProtectionThreshold
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.USBStatus')">
              <el-switch
                v-model="operationInformation.otherInformationObj.usbStatus"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.IdentificationOfEnergyFlowDiagramLineNumbersOneEight')">
              <el-switch
                v-model="operationInformation.otherInformationObj.energyFlowOne"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.IdentificationOfEnergyFlowDiagramLineNumbersNineSixteen')">
              <el-switch
                v-model="operationInformation.otherInformationObj.energyFlowTwo"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.IdentificationOfEnergyFlowDiagramLineNumbersOneSixteen')">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj.energyFlowThree
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.RunningTimeDays')">
              <el-switch
                v-model="operationInformation.otherInformationObj.runTimeDay"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.RunningTimeHours')">
              <el-switch
                v-model="operationInformation.otherInformationObj.runTimeHour"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.RunningTimeMinutes')">
              <el-switch
                v-model="operationInformation.otherInformationObj.runTimeMinute"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.RunTimeSeconds')">
              <el-switch
                v-model="operationInformation.otherInformationObj.runTimeSecond"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.DailyElectricityConsumption')">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj
                    .dailyElectricityConsumption
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.AccumulatedElectricityConsumption')">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj
                    .accumulatedElectricityConsumption
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.DailyGridConnectionVolume')">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj
                    .dailyGridConnectionVolume
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.AccumulatedGridConnectionQuantity')">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj
                    .accumulatedGridConnectionQuantity
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.DailyElectricityPurchase')">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj
                    .dailyElectricityPurchase
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.AccumulatedPurchasingPower')">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj
                    .accumulatedPurchasingPower
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.DailyChargingCapacity')">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj.dailyChargingCapacity
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.AccumulatedChargingCapacity')">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj
                    .accumulatedChargingCapacity
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.DailyDischargeCapacity')">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj
                    .dailyDischargeCapacity
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.AccumulatedDischargeCapacity')">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj
                    .accumulatedDischargeCapacity
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.LeakageCurrent')">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj.leakageCurrent
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.IntermediateBusbarVoltage')">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj
                    .intermediateBusbarVoltage
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.BuckBoostCurrent')">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj.buckBoostCurrent
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.PVIsoVoltage')">
              <el-switch
                v-model="operationInformation.otherInformationObj.pvIsoVoltage"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.ZeroGroundVoltage')">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj.zeroGroundVoltage
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.DCComponentOfInverterCurrent')">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj
                    .dcComponentOfInverterCurrent
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.DCComponentOfLoadVoltage')">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj
                    .dcComponentOfLoadVoltage
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.RelayIntermediateVoltage')">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj
                    .relayIntermediateVoltage
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.NumberOfHistoryRecords')">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj
                    .numberOfHistoryRecords
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.BatteryChargingDischargingHeatingEnableState')">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj
                    .batteryChargingAndDischargingHeatingEnableState
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.BatteryFactoryCode')">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj.batteryFactoryCode
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.BatteryProductNumber')">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj.batteryProductNumber
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.BatteryFactoryDate')">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj.batteryFactoryDate
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.MaximumAllowableChargingCurrent')">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj
                    .maximumAllowableChargingCurrent
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.ManufacturerInformation')">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj
                    .manufacturerInformation
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.InverterSerialNumber')">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj.inverterSerialNumber
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.MaximumAllowableDischargeCurrent')">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj
                    .maximumAllowableDischargeCurrent
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TheMaximumChargingCurrentAllowedByTheInverterForTheBattery')">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj
                    .maximumChargingCurrentAllowedByTheInverterForTheBattery
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TheMaximumDischargeCurrentAllowedByTheInverterForTheBattery')">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj
                    .maximumDischargeCurrentAllowedByTheInverterForTheBattery
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.modbusDecodingVersion')">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj
                    .modbusDecodeVersion
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.deviceTypeIdentifier1')">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj
                    .deviceTypeSignOne
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.deviceTypeIdentifier2')">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj
                    .deviceTypeSignTwo
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.deviceTypeIdentifier3')">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj
                    .deviceTypeSignThree
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.protocolAddress144')">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj
                    .protocolAddress144
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.protocolAddress146')">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj
                    .protocolAddress146
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.protocolAddress148')">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj
                    .protocolAddress148
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.protocolAddress150')">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj
                    .protocolAddress150
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.protocolAddress152')">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj
                    .protocolAddress152
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.protocolAddress153')">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj
                    .protocolAddress153
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.protocolAddress154')">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj
                    .protocolAddress154
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.protocolAddress155')">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj
                    .protocolAddress155
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.protocolAddress156')">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj
                    .protocolAddress156
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.protocolAddress157')">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj
                    .protocolAddress157
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.protocolAddress158')">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj
                    .protocolAddress158
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.protocolAddress159')">
              <el-switch
                v-model="
                  operationInformation.otherInformationObj
                    .protocolAddress159
                "
              />
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-card>

      <el-card style="margin-top: 10px">
        <div slot="header">
          <span>{{$t('parameterConfiguration.SystemSettings')}}</span>
          <el-switch
            style="margin-left: 10px"
            v-model="systemSet.isShow"
            @change="changeSystemSet"
          />
        </div>

        <el-card>
          <div slot="header">
            <span>{{$t('deviceManage.commonSettings')}}</span>
            <el-switch
              style="margin-left: 10px"
              v-model="systemSet.commonSet"
              @change="changeSystemSetItem('commonSet')"
            />
          </div>
          <el-descriptions title="" :column="3">
            <el-descriptions-item :label="$t('parameterConfiguration.SetSystemTime')">
              <el-switch v-model="systemSet.commonSetObj.systemTime" />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CommunicationProtocolType')">
              <el-switch
                v-model="systemSet.commonSetObj.communicationProtocolType"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.DailyPowerGenerationCalibration')">
              <el-switch
                v-model="systemSet.commonSetObj.dailyPowerGenerationCalibration"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TotalPowerGenerationCalibration')">
              <el-switch
                v-model="systemSet.commonSetObj.totalPowerGenerationCalibration"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.clearBatteryData')">
              <el-switch
                v-model="systemSet.commonSetObj.clearBatteryData"
              />
            </el-descriptions-item>
            <!-- <el-descriptions-item :label="$t('parameterConfiguration.ClearElectricityConsumptionData')">
              <el-switch
                v-model="systemSet.commonSetObj.clearElectricityConsumptionData"
              />
            </el-descriptions-item> -->
            <!-- <el-descriptions-item :label="$t('parameterConfiguration.ClearPowerGenerationData')">
              <el-switch
                v-model="systemSet.commonSetObj.clearPowerGenerationData"
              />
            </el-descriptions-item> -->
            <el-descriptions-item :label="$t('parameterConfiguration.BootCommand')">
              <el-switch v-model="systemSet.commonSetObj.bootCommand" />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.ShutdownCommand')">
              <el-switch v-model="systemSet.commonSetObj.shutdownCommand" />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CancelShutdownCommand')">
              <el-switch
                v-model="systemSet.commonSetObj.cancelShutdownCommand"
              />
            </el-descriptions-item>
          </el-descriptions>
        </el-card>

        <el-card style="margin-top: 10px">
          <div slot="header">
            <span>{{$t('deviceManage.communicationSettings')}}</span>
            <el-switch
              style="margin-left: 10px"
              v-model="systemSet.communicationSet"
              @change="changeSystemSetItem('communicationSet')"
            />
          </div>
          <el-descriptions title="" :column="3">
            <el-descriptions-item :label="$t('parameterConfiguration.BMSModel')">
              <el-switch v-model="systemSet.communicationSetObj.bmsModel" />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.BMSAddress')">
              <el-switch v-model="systemSet.communicationSetObj.bmsAddress" />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.BMSBaudRate')">
              <el-switch v-model="systemSet.communicationSetObj.bmsBaud" />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.NumberOfLithiumBatteryBlocks')">
              <el-switch
                v-model="
                  systemSet.communicationSetObj.numberOfLithiumBatteryBlocks
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CollectorCommunicationAddress')">
              <el-switch
                v-model="
                  systemSet.communicationSetObj.collectorCommunicationAddress
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CollectorCommunicationProtocolType')">
              <el-switch
                v-model="
                  systemSet.communicationSetObj
                    .collectorCommunicationProtocolType
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CollectorCommunicationBaudRate')">
              <el-switch
                v-model="
                  systemSet.communicationSetObj.baudOfCollectorCommunication
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.DeviceCommunicationAddress')">
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
            <span>{{$t('parameterConfiguration.AdvancedSetting')}}</span>
            <el-switch
              style="margin-left: 10px"
              v-model="systemSet.advancedSet"
              @change="changeSystemSetItem('advancedSet')"
            />
          </div>
          <el-descriptions title="" :column="3">
            <el-descriptions-item :label="$t('parameterConfiguration.DeviceCommunicationAddress')">
              <el-switch
                v-model="systemSet.advancedSetObj.parallelOffGridMode"
              />
            </el-descriptions-item>ParallelOffGridMode
            <el-descriptions-item :label="$t('parameterConfiguration.SystemModeSettings')">
              <el-switch v-model="systemSet.advancedSetObj.systemModeSet" />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.PVConnectionSettings')">
              <el-switch v-model="systemSet.advancedSetObj.pvConnectionSet" />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.RatedOutputVoltageSetting')">
              <el-switch
                v-model="systemSet.advancedSetObj.ratedOutputVoltageSet"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.RatedOutputFrequencySetting')">
              <el-switch
                v-model="systemSet.advancedSetObj.ratedOutputFrequencySet"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.BatteryTypeSettings')">
              <el-switch v-model="systemSet.advancedSetObj.batteryTypeSet" />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.BatteryChargingCurrent')">
              <el-switch
                v-model="systemSet.advancedSetObj.batteryChargingCurrent"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.BatteryDischargeCurrent')">
              <el-switch
                v-model="systemSet.advancedSetObj.batteryDischargeCurrent"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.BatteryAverageChargingVoltage')">
              <el-switch
                v-model="systemSet.advancedSetObj.batteryAverageChargingVoltage"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.BatteryFloatChargingVoltage')">
              <el-switch
                v-model="systemSet.advancedSetObj.batteryFloatChargingVoltage"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.BatteryEOD')">
              <el-switch v-model="systemSet.advancedSetObj.batteryEod" />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.BatteryDOD')">
              <el-switch v-model="systemSet.advancedSetObj.batteryDod" />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.LowerLimitOfGridConnectedSOC')">
              <el-switch
                v-model="systemSet.advancedSetObj.lowerLimitOfGridConnectedSoc"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.OffGridSOCLowerLimit')">
              <el-switch
                v-model="systemSet.advancedSetObj.offGridSocLowerLimit"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.ElectricityMeterCT')">
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
            <span>{{$t('parameterConfiguration.OtherSettings')}}</span>
            <el-switch
              style="margin-left: 10px"
              v-model="systemSet.otherSet"
              @change="changeSystemSetItem('otherSet')"
            />
          </div>
          <el-descriptions title="" :column="2">
            <el-descriptions-item :label="$t('parameterConfiguration.ResetDeviceCommunicationSettingsToInitialValues')">
              <el-switch
                v-model="
                  systemSet.otherSetObj
                    .resetDeviceCommunicationSettingsToInitialValues
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.ClearRecordData')">
              <el-switch v-model="systemSet.otherSetObj.clearRecordData" />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.RestoreFactorySettings')">
              <el-switch v-model="systemSet.otherSetObj.factoryReset" />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.InverterRestart')">
              <el-switch v-model="systemSet.otherSetObj.inverterRestart" />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.SelfCheckEnable')">
              <el-switch v-model="systemSet.otherSetObj.selfCheckEnable" />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.ManuallyClearingFaults')">
              <el-switch
                v-model="systemSet.otherSetObj.manuallyClearingFaults"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.AutomaticOperation')">
              <el-switch v-model="systemSet.otherSetObj.automaticOperation" />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.ManuallyUnlockingTheSystemLock')">
              <el-switch
                v-model="systemSet.otherSetObj.manuallyUnlockingTheSystemLock"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.DeviceCommunicationBaudRate')">
              <el-switch
                v-model="systemSet.otherSetObj.deviceCommunicationBaud"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.DeviceCommunicationCheckBitSelection')">
              <el-switch
                v-model="
                  systemSet.otherSetObj.deviceCommunicationCheckBitSelection
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.DeviceCommunicationStopBitSelection')">
              <el-switch
                v-model="
                  systemSet.otherSetObj.deviceCommunicationStopBitSelection
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CountdownToTurnOffTheInverter')">
              <el-switch
                v-model="systemSet.otherSetObj.countdownToTurnOffTheInverter"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.DelayedStartInverter')">
              <el-switch v-model="systemSet.otherSetObj.delayedStartInverter" />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CountryCode')">
              <el-switch v-model="systemSet.otherSetObj.countryCode" />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.SystemTimeSetting')">
              <el-switch v-model="systemSet.otherSetObj.systemTimeSetting" />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.InverterActivePowerSetting')">
              <el-switch
                v-model="systemSet.otherSetObj.inverterActivePowerSetting"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.FourEightFiveCommunicationProtocolType')">
              <el-switch
                v-model="systemSet.otherSetObj.communicationProtocolType485"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.FourEightFiveCommunicationAddress')">
              <el-switch
                v-model="systemSet.otherSetObj.communicationAddress485"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.FourEightFiveCommunicationBaudRate')">
              <el-switch v-model="systemSet.otherSetObj.communicationBaud485" />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.HardLimitEnable')">
              <el-switch v-model="systemSet.otherSetObj.hardLimitEnable" />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.HardLimitPowerSettingValue')">
              <el-switch
                v-model="systemSet.otherSetObj.hardLimitPowerSettingValue"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.AustralianRegionSelection')">
              <el-switch
                v-model="systemSet.otherSetObj.australianRegionSelection"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.BluetoothConnectionFlag')">
              <el-switch
                v-model="systemSet.otherSetObj.bluetoothConnectionFlag"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.PVActivePowerSetting')">
              <el-switch v-model="systemSet.otherSetObj.pvActivePowerSetting" />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.LimitOfActivePowerChangeRate')">
              <el-switch
                v-model="systemSet.otherSetObj.limitOfActivePowerChangeRate"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.IslandDetectionEnable')">
              <el-switch
                v-model="systemSet.otherSetObj.islandDetectionEnable"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.AuthenticationMode')">
              <el-switch v-model="systemSet.otherSetObj.authenticationMode" />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CurrentSystemOperationModeControlSource')">
              <el-switch
                v-model="
                  systemSet.otherSetObj.currentSystemOperationModeControlSource
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CurrentOperatingModeOfTheSystem')">
              <el-switch
                v-model="systemSet.otherSetObj.currentOperatingModeOfTheSystem"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.APPStartupFlag')">
              <el-switch v-model="systemSet.otherSetObj.appStartupFlag" />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.BuzzerResponseTime')">
              <el-switch v-model="systemSet.otherSetObj.buzzerResponseTime" />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CommunicationType')">
              <el-switch v-model="systemSet.otherSetObj.communicationType" />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.SystemModeSettings')">
              <el-switch v-model="systemSet.otherSetObj.systemModeSettings" />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.USBOperation')">
              <el-switch v-model="systemSet.otherSetObj.usbOperation" />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.PowerFactor')">
              <el-switch v-model="systemSet.otherSetObj.powerFactor" />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.AntiBackflowPowerPercentage')">
              <el-switch
                v-model="systemSet.otherSetObj.antiBackflowPowerPercentage"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.MaximumOutputPowerPercentage')">
              <el-switch
                v-model="systemSet.otherSetObj.maximumOutputPowerPercentage"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.PowerSettingAdjustmentRate')">
              <el-switch
                v-model="systemSet.otherSetObj.powerSettingAdjustmentRate"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.GridConnectedPowerSoftStartRate')">
              <el-switch
                v-model="systemSet.otherSetObj.gridConnectedPowerSoftStartRate"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.ReactivePowerControlMode')">
              <el-switch
                v-model="systemSet.otherSetObj.reactivePowerControlMode"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.ReactivePowerRegulationRate')">
              <el-switch
                v-model="systemSet.otherSetObj.reactivePowerRegulationRate"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.UpperLimitValueOfGridVoltageProtectionOne')">
              <el-switch
                v-model="
                  systemSet.otherSetObj.upperLimitValueOfGridVoltageProtection1
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.UpperLimitValueOfGridVoltageProtectionTwo')">
              <el-switch
                v-model="
                  systemSet.otherSetObj.upperLimitValueOfGridVoltageProtection2
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.UpperLimitValueOfGridVoltageProtectionThree')">
              <el-switch
                v-model="
                  systemSet.otherSetObj.upperLimitValueOfGridVoltageProtection3
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.LowerLimitValueOfGridVoltageProtection1')">
              <el-switch
                v-model="
                  systemSet.otherSetObj.lowerLimitValueOfGridVoltageProtection1
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.LowerLimitValueOfGridVoltageProtection2')">
              <el-switch
                v-model="
                  systemSet.otherSetObj.lowerLimitValueOfGridVoltageProtection2
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.LowerLimitValueOfGridVoltageProtection3')">
              <el-switch
                v-model="
                  systemSet.otherSetObj.lowerLimitValueOfGridVoltageProtection3
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.UpperLimitValueOfGridVoltageReconnection')">
              <el-switch
                v-model="
                  systemSet.otherSetObj.upperLimitValueOfGridVoltageReconnection
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.LowerLmitOfGridVoltageReconnection')">
              <el-switch
                v-model="
                  systemSet.otherSetObj.lowerLimitValueOfGridVoltageReconnection
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.GridVoltageProtectionUpperLimitTimeOne')">
              <el-switch
                v-model="
                  systemSet.otherSetObj.upperLimitTimeOfGridVoltageProtection1
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.GridVoltageProtectionUpperLimitTimeTwo')">
              <el-switch
                v-model="
                  systemSet.otherSetObj.upperLimitTimeOfGridVoltageProtection2
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.GridVoltageProtectionUpperLimitTimeThree')">
              <el-switch
                v-model="
                  systemSet.otherSetObj.upperLimitTimeOfGridVoltageProtection3
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.GridVoltageProtectionLowerLimitTimeOne')">
              <el-switch
                v-model="
                  systemSet.otherSetObj.lowerLimitTimeOfGridVoltageProtection1
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.GridVoltageProtectionLowerLimitTimeTwo')">
              <el-switch
                v-model="
                  systemSet.otherSetObj.lowerLimitTimeOfGridVoltageProtection2
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.GridVoltageProtectionLowerLimitTimeThree')">
              <el-switch
                v-model="
                  systemSet.otherSetObj.lowerLimitTimeOfGridVoltageProtection3
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.RecoveryTimeOfGridFrequencyProtection')">
              <el-switch
                v-model="
                  systemSet.otherSetObj.recoveryTimeOfGridVoltageProtection
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.UpperLimitValueOfGridFrequencyProtectionOne')">
              <el-switch
                v-model="
                  systemSet.otherSetObj
                    .upperLimitValueOfGridFrequencyProtection1
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.UpperLimitValueOfGridFrequencyProtectionTwo')">
              <el-switch
                v-model="
                  systemSet.otherSetObj
                    .upperLimitValueOfGridFrequencyProtection2
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.UpperLimitValueOfGridFrequencyProtectionThree')">
              <el-switch
                v-model="
                  systemSet.otherSetObj
                    .upperLimitValueOfGridFrequencyProtection3
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.LowerLimitValueOfGridFrequencyProtectionOne')">
              <el-switch
                v-model="
                  systemSet.otherSetObj
                    .lowerLimitValueOfGridFrequencyProtection1
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.LowerLimitValueOfGridFrequencyProtectionTwo')">
              <el-switch
                v-model="
                  systemSet.otherSetObj
                    .lowerLimitValueOfGridFrequencyProtection2
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.LowerLimitValueOfGridFrequencyProtectionThree')">
              <el-switch
                v-model="
                  systemSet.otherSetObj
                    .lowerLimitValueOfGridFrequencyProtection3
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.UpperLimitValueOfGridFrequencyReconnection')">
              <el-switch
                v-model="
                  systemSet.otherSetObj
                    .upperLimitValueOfGridFrequencyReconnection
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.LowerLimitOfGridFrequencyReconnection')">
              <el-switch
                v-model="
                  systemSet.otherSetObj
                    .lowerLimitValueOfGridFrequencyReconnection
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.GridFrequencyProtectionUpperLimitTimeOne')">
              <el-switch
                v-model="
                  systemSet.otherSetObj.gridFrequencyProtectionUpperLimitTime1
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.GridFrequencyProtectionUpperLimitTimeTwo')">
              <el-switch
                v-model="
                  systemSet.otherSetObj.gridFrequencyProtectionUpperLimitTime2
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.GridFrequencyProtectionUpperLimitTimeThree')">
              <el-switch
                v-model="
                  systemSet.otherSetObj.gridFrequencyProtectionUpperLimitTime3
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.GridFrequencyProtectionLowerLimitTimeOne')">
              <el-switch
                v-model="
                  systemSet.otherSetObj.gridFrequencyProtectionLowerLimitTime1
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.GridFrequencyProtectionLowerLimitTimeTwo')">
              <el-switch
                v-model="
                  systemSet.otherSetObj.gridFrequencyProtectionLowerLimitTime2
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.GridFrequencyProtectionLowerLimitTimeThree')">
              <el-switch
                v-model="
                  systemSet.otherSetObj.gridFrequencyProtectionLowerLimitTime3
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.RecoveryTimeOfGridFrequencyProtection')">
              <el-switch
                v-model="
                  systemSet.otherSetObj.recoveryTimeOfGridFrequencyProtection
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TenMinOvervoltageProtectionValueOfThePowerGrid')">
              <el-switch
                v-model="
                  systemSet.otherSetObj
                    .tenMinOvervoltageProtectionValueOfThePowerGrid
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.NetworkingWaitingTime')">
              <el-switch
                v-model="systemSet.otherSetObj.networkingWaitingTime"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.ReconnectWaitingTime')">
              <el-switch v-model="systemSet.otherSetObj.reconnectWaitingTime" />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.ColdMode')">
              <el-switch v-model="systemSet.otherSetObj.coldMode" />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.ReactivePowerPercentage')">
              <el-switch
                v-model="systemSet.otherSetObj.reactivePowerPercentage"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.FreqWattCurveEnable')">
              <el-switch v-model="systemSet.otherSetObj.freqWattCurveEnable" />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.VoltWattCurveEnable')">
              <el-switch v-model="systemSet.otherSetObj.voltWattCurveEnable" />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.VoltVarCurveEnable')">
              <el-switch v-model="systemSet.otherSetObj.voltVarCurveEnable" />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.PFWattCurveEnable')">
              <el-switch v-model="systemSet.otherSetObj.pfWattCurveEnable" />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TimingModeType')">
              <el-switch v-model="systemSet.otherSetObj.timingModeType" />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.SetQuantityChangeRegisterOne')">
              <el-switch
                v-model="systemSet.otherSetObj.setQuantityChangeRegister1"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.SetQuantityChangeRegisterTwo')">
              <el-switch
                v-model="systemSet.otherSetObj.setQuantityChangeRegister2"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.SetQuantityChangeRegisterThree')">
              <el-switch
                v-model="systemSet.otherSetObj.setQuantityChangeRegister3"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.SetQuantityChangeRegisterFour')">
              <el-switch
                v-model="systemSet.otherSetObj.setQuantityChangeRegister4"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.SetQuantityChangeRegisterFive')">
              <el-switch
                v-model="systemSet.otherSetObj.setQuantityChangeRegister5"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.SetQuantityChangeRegisterSix')">
              <el-switch
                v-model="systemSet.otherSetObj.setQuantityChangeRegister6"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.SetQuantityChangeRegisterSeven')">
              <el-switch
                v-model="systemSet.otherSetObj.setQuantityChangeRegister7"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.SetQuantityChangeRegisterEight')">
              <el-switch
                v-model="systemSet.otherSetObj.setQuantityChangeRegister8"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.BatteryParameterDisplayMethod')">
              <el-switch
                v-model="systemSet.otherSetObj.batteryParameterDisplayMethod"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TheBatteryIDOfTheCurrentDisplayedParameter')">
              <el-switch
                v-model="
                  systemSet.otherSetObj
                    .theBatteryIdOfTheCurrentDisplayedParameter
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.MOSCntrol')">
              <el-switch v-model="systemSet.otherSetObj.mosControl" />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.GPSCommunicationModulePowerControl')">
              <el-switch
                v-model="
                  systemSet.otherSetObj.gpsCommunicationModulePowerControl
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.RealTimeClock')">
              <el-switch v-model="systemSet.otherSetObj.realTimeClock" />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.ACCoupling')">
              <el-switch v-model="systemSet.otherSetObj.acCoupling" />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.emptyElectricityMeterEnergy')">
              <el-switch v-model="systemSet.otherSetObj.emptyElectricityMeterEnergy" />
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-card>

      <el-card style="margin-top: 10px">
        <div slot="header">
          <span>{{$t('parameterConfiguration.BatteryParameters')}}</span>
          <el-switch
            style="margin-left: 10px"
            v-model="batteryParameter.isShow"
            @change="changeBatteryParameter"
          />
        </div>

        <el-card>
          <div slot="header">
            <span>{{$t('deviceManage.commonSettings')}}</span>
            <el-switch
              style="margin-left: 10px"
              v-model="batteryParameter.batterySet"
              @change="changeBatteryParameterItem('batterySet')"
            />
          </div>
          <el-descriptions title="" :column="2">
            <el-descriptions-item :label="$t('parameterConfiguration.BatteryPackID')">
              <el-switch
                v-model="batteryParameter.batterySetObj.batteryPackId"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CurrentUpgradedBatteryID')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.currentUpgradedBatteryId
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.UpgradeFailedBatteryID')">
              <el-switch
                v-model="batteryParameter.batterySetObj.upgradeFailedBatteryId"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.NumberOfBatteryPackCellStringsN')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.numberOfBatteryPackCellStringsN
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TotalNumberOfTemperatureProbesX')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.totalNumberOfTemperatureProbesX
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.LeakageCurrent')">
              <el-switch
                v-model="batteryParameter.batterySetObj.leakageCurrent"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.IntermediateBusbarVoltage')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.intermediateBusbarVoltage
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.BuckBoostCurrent')">
              <el-switch
                v-model="batteryParameter.batterySetObj.buckBoostCurrent"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.PVIsoVoltage')">
              <el-switch
                v-model="batteryParameter.batterySetObj.pvIsoVoltage"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.ZeroGroundVoltage')">
              <el-switch
                v-model="batteryParameter.batterySetObj.zeroGroundVoltage"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.DCComponentOfInverterCurrent')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.dcComponentOfInverterCurrent
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.DCComponentOfLoadVoltage')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.dcComponentOfLoadVoltage
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.RelayIntermediateVoltage')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.relayIntermediateVoltage
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CellVoltageOne')">
              <el-switch
                v-model="batteryParameter.batterySetObj.cellVoltage1"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CellVoltageTwo')">
              <el-switch
                v-model="batteryParameter.batterySetObj.cellVoltage2"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CellVoltageThree')">
              <el-switch
                v-model="batteryParameter.batterySetObj.cellVoltage3"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CellVoltageFour')">
              <el-switch
                v-model="batteryParameter.batterySetObj.cellVoltage4"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CellVoltageFive')">
              <el-switch
                v-model="batteryParameter.batterySetObj.cellVoltage5"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CellVoltageSix')">
              <el-switch
                v-model="batteryParameter.batterySetObj.cellVoltage6"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CellVoltageSeven')">
              <el-switch
                v-model="batteryParameter.batterySetObj.cellVoltage7"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CellVoltageEight')">
              <el-switch
                v-model="batteryParameter.batterySetObj.cellVoltage8"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CellVoltageNine')">
              <el-switch
                v-model="batteryParameter.batterySetObj.cellVoltage9"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CellVoltageTen')">
              <el-switch
                v-model="batteryParameter.batterySetObj.cellVoltage10"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CellVoltageEleven')">
              <el-switch
                v-model="batteryParameter.batterySetObj.cellVoltage11"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CellVoltageTwelve')">
              <el-switch
                v-model="batteryParameter.batterySetObj.cellVoltage12"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CellVoltageThirteen')">
              <el-switch
                v-model="batteryParameter.batterySetObj.cellVoltage13"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CellVoltageFourteen')">
              <el-switch
                v-model="batteryParameter.batterySetObj.cellVoltage14"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CellVoltageFifteen')">
              <el-switch
                v-model="batteryParameter.batterySetObj.cellVoltage15"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CellVoltageSixteen')">
              <el-switch
                v-model="batteryParameter.batterySetObj.cellVoltage16"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CurrentCurrent')">
              <el-switch
                v-model="batteryParameter.batterySetObj.currentCurrent"
              />
            </el-descriptions-item>
            <!-- <el-descriptions-item :label="$t('parameterConfiguration.State1')">
              <el-switch v-model="batteryParameter.batterySetObj.state1" />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.State2')">
              <el-switch v-model="batteryParameter.batterySetObj.state2" />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.State3')">
              <el-switch v-model="batteryParameter.batterySetObj.state3" />
            </el-descriptions-item> -->
            <el-descriptions-item :label="$t('parameterConfiguration.ChargingOvercurrentProtection')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.chargingOvercurrentProtection
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.ChargingOvercurrentProtectionDelay')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .chargingOvercurrentProtectionDelay
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CellOvervoltageProtection')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.cellOvervoltageProtection
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CellOvervoltageProtectionDelay')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.cellOvervoltageProtectionDelay
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CellOverDischargeProtection')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.cellOverDischargeProtection
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CellOverDischargeProtectionDelay')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .cellOverDischargeProtectionDelay
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.OvervoltageHysteresisVoltage')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.overvoltageHysteresisVoltage
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.OverdischargeHysteresisVoltage')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.overdischargeHysteresisVoltage
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CellOvervoltageRecoveryDelay')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.cellOvervoltageRecoveryDelay
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CellOverDischargeRecoveryDelay')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.cellOverDischargeRecoveryDelay
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.HighTemperatureProtectionDuringDischarge')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .highTemperatureProtectionDuringDischarge
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.HighTemperatureProtectionRecoveryDuringDischarge')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .highTemperatureProtectionRecoveryDuringDischarge
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.LowTemperatureProtectionDuringDischarge')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .lowTemperatureProtectionDuringDischarge
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.DischargeLowtemperatureProtectionRecovery')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .dischargeLowTemperatureProtectionRecovery
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.HighTemperatureProtectionDuringCharging')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .highTemperatureProtectionDuringCharging
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.HighTemperatureProtectionRecoveryDuringCharging')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .highTemperatureProtectionRecoveryDuringCharging
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.LowTemperatureProtectionDuringCharging')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .lowTemperatureProtectionDuringCharging
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.LowTemperatureProtectionRecoveryCuringCharging')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .lowTemperatureProtectionRecoveryDuringCharging
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.EqualizingOpeningVoltage')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.equalizingOpeningVoltage
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.EquilibriumOpeningPressureDifference')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .equilibriumOpeningPressureDifference
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CellTemperatureOne')">
              <el-switch
                v-model="batteryParameter.batterySetObj.cellTemperature1"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CellTemperatureTwo')">
              <el-switch
                v-model="batteryParameter.batterySetObj.cellTemperature2"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CellTemperatureThree')">
              <el-switch
                v-model="batteryParameter.batterySetObj.cellTemperature3"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CellTemperatureFour')">
              <el-switch
                v-model="batteryParameter.batterySetObj.cellTemperature4"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.MOSTemperature')">
              <el-switch
                v-model="batteryParameter.batterySetObj.mosTemperature"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.AmbientTemperature')">
              <el-switch
                v-model="batteryParameter.batterySetObj.ambientTemperature"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.EquilibriumState1')">
              <el-switch
                v-model="batteryParameter.batterySetObj.equilibriumState1"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.EquilibriumState2')">
              <el-switch
                v-model="batteryParameter.batterySetObj.equilibriumState2"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.SoftwareVersion')">
              <el-switch
                v-model="batteryParameter.batterySetObj.softwareVersion"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.HardwareVrsion')">
              <el-switch
                v-model="batteryParameter.batterySetObj.hardwareVersion"
              />
            </el-descriptions-item>
            <!-- <el-descriptions-item :label="$t('parameterConfiguration.State')">
              <el-switch v-model="batteryParameter.batterySetObj.state" />
            </el-descriptions-item> -->
            <el-descriptions-item :label="$t('deviceManage.alarmStateBit0')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .alarmStateBit0
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.alarmStateBit1')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .alarmStateBit1
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.alarmStateBit2')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.alarmStateBit2
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.alarmStateBit3')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .alarmStateBit3
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.alarmStateBit4')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .alarmStateBit4
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.alarmStateBit5')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .alarmStateBit5
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.alarmStateBit6')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .alarmStateBit6
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.alarmStateBit7')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .alarmStateBit7
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.alarmStateBit8')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .alarmStateBit8
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.alarmStateBit9')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .alarmStateBit9
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.alarmStateBit10')">
              <el-switch
                v-model="batteryParameter.batterySetObj.alarmStateBit10"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.alarmStateBit11')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .alarmStateBit11
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.BatterySOC')">
              <el-switch v-model="batteryParameter.batterySetObj.batterySoc" />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.BatterySOH')">
              <el-switch v-model="batteryParameter.batterySetObj.batterySoh" />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.NumberOfCycles')">
              <el-switch
                v-model="batteryParameter.batterySetObj.numberOfCycles"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.DischargeRemainingTime')">
              <el-switch
                v-model="batteryParameter.batterySetObj.dischargeRemainingTime"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.ChargingRemainingTime')">
              <el-switch
                v-model="batteryParameter.batterySetObj.chargingRemainingTime"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CurrentChargingInterval')">
              <el-switch
                v-model="batteryParameter.batterySetObj.currentChargingInterval"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.MaximumChargingInterval')">
              <el-switch
                v-model="batteryParameter.batterySetObj.maximumChargingInterval"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TotalBatteryVoltage')">
              <el-switch
                v-model="batteryParameter.batterySetObj.totalBatteryVoltage"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.MaximumVoltageOfBatteryPack')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.maximumVoltageOfBatteryPack
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.MinimumVoltageOfBatteryPack')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.minimumVoltageOfBatteryPack
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.MaximumAllowableDischargeCurrent')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .maximumAllowableDischargeCurrent
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.MaximumAllowableChargingCurrent')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.maximumAllowableChargingCurrent
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.StandardChargingVoltage')">
              <el-switch
                v-model="batteryParameter.batterySetObj.standardChargingVoltage"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CurrentHumidity')">
              <el-switch
                v-model="batteryParameter.batterySetObj.currentHumidity"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.FactoryCode')">
              <el-switch v-model="batteryParameter.batterySetObj.factoryCode" />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.ProductNumber')">
              <el-switch
                v-model="batteryParameter.batterySetObj.productNumber"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.DateOfProduction')">
              <el-switch
                v-model="batteryParameter.batterySetObj.dateOfProduction"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.BatteryDetectionResistanceValue')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.batteryDetectionResistanceValue
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.MaximumCellTemperature')">
              <el-switch
                v-model="batteryParameter.batterySetObj.maximumCellTemperature"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.MinimumCellTemperature')">
              <el-switch
                v-model="batteryParameter.batterySetObj.minimumCellTemperature"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TemperatureDifference')">
              <el-switch
                v-model="batteryParameter.batterySetObj.temperatureDifference"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TemperatureDifferenceProtectionValue')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .temperatureDifferenceProtectionValue
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TemperatureDifferenceAlarmValue')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.temperatureDifferenceAlarmValue
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.DifferentialPressureProtectionValue')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .differentialPressureProtectionValue
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.DifferentialPressureAlarmValue')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.differentialPressureAlarmValue
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.StaticEquilibriumTime')">
              <el-switch
                v-model="batteryParameter.batterySetObj.staticEquilibriumTime"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.AutomaticRecoveryDelayAfterChargingOvercurrent')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .automaticRecoveryDelayAfterChargingOvercurrent
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.AutomaticallyResumeLockingAfterOvercharging')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .automaticallyResumeLockingAfterOvercharging
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.AutomaticRecoveryDelayAfterDischargeOvercurrent')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .automaticRecoveryDelayAfterDischargeOvercurrent
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.AutomaticRecoveryLockingAfterDischargeOvercurrent')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .automaticRecoveryLockingAfterDischargeOvercurrent
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TheInverterCurrentExceedsTheLimitCurrent')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .theInverterCurrentExceedsTheLimitCurrent
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.BatteryParameterDisplayMethod')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.batteryParameterDisplayMethod
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TheBatteryIDOfTheCurrentDisplayedParameter')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .theBatteryIdOfTheCurrentDisplayedParameter
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.BatteryPackDesignCapacity')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.batteryPackDesignCapacity
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CurrentBatteryFullCapacity')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.currentBatteryFullCapacity
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.RemainingBatteryCapacity')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.remainingBatteryCapacity
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.MOSControl')">
              <el-switch v-model="batteryParameter.batterySetObj.mosControl" />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.ChargingDischargingHeatingEnable')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .chargingDischargingHeatingEnable
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.GPSCommunicationModulePowerControl')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .gpsCommunicationModulePowerControl
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.RealTimeClock')">
              <el-switch
                v-model="batteryParameter.batterySetObj.realTimeClock"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.DischargeOvercurrent1Protection')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.dischargeOvercurrent1Protection
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.DischargeOvercurrent1Delay')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.dischargeOvercurrent1Delay
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.EnvironmentalHighTemperatureProtection')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .environmentalHighTemperatureProtection
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.EnvironmentalHighTemperatureProtectionRecovery')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .environmentalHighTemperatureProtectionRecovery
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.EnvironmentalLowTemperatureProtection')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .environmentalLowTemperatureProtection
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.EnvironmentalLowTemperatureProtection')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .environmentalLowTemperatureProtectionRecovery
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TotalVoltageOvervoltageProtection')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .totalPressureOvervoltageProtection
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TotalPressureOverDischargeRecovery')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .totalPressureOvervoltageProtectionRecovery
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TotalVoltageOvervoltageProtection')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .totalVoltageOvervoltageProtection
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TotalPressureOverDischargeRecovery')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .totalPressureOverDischargeRecovery
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TotalVoltageOvervoltageProtectionDelay')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .totalVoltageOvervoltageProtectionDelay
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TotalVoltageOverDischargeProtectionDelay')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .totalVoltageOverDischargeProtectionDelay
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TotalOvervoltageRecoveryDelay')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.totalOvervoltageRecoveryDelay
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TotalOverdischargeRecoveryDelay')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.totalOverdischargeRecoveryDelay
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.MOSHighTemperatureProtection')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.mosHighTemperatureProtection
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.MOSHighTemperatureRecovery')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.mosHighTemperatureRecovery
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.MOSHighTemperatureProtectionDelay')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .moshighTemperatureProtectionDelay
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.FullOfProtectionTotalPressureAbove')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .fullOfProtectionTotalPressureAbove
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.FullOfProtectionChargingCurrentBelow')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .fullOfProtectionChargingCurrentBelow
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.FullOfProtectionDelayTime')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.fullOfProtectionDelayTime
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.HeatingFanOnTemperature')">
              <el-switch
                v-model="batteryParameter.batterySetObj.heatingFanOnTemperature"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.HeatingFanRecoveryTemperature')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.heatingFanRecoveryTemperature
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.EnableSettingsVoltageAlarm')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.enableSettingBit0
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.EnableSettingsOvercurrentAlarm')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.enableSettingBit1
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.EnableSettingsOverTemperatureAlarm')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .enableSettingBit2
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.EnableSettingMOSOverTemperatureAlarm')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .enableSettingBit3
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.EnableSettingsCellImbalanceAlarm')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .enableSettingBit4
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.EnableSettingsAmbientTemperatureAlarm')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .enableSettingBit5
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.EnableSettingMOSOverTemperatureAlarm')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.enableSettingBit6
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.EnableSettingsChargingAndHeatingEnable')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.enableSettingBit7
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.EnableSettingsTotalVoltageProtection')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .enableSettingBit8
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.EnableSettingsDischargeRecoveryFunctionAfterChargingOvercurrent')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .enableSettingBit9
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.EnableSettingsDelayAutomaticRecoveryFunctionAfterDischargeOvercurrent')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .enableSettingBit10
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.EnableSettingsChargingRecoveryFunctionAfterDischargeOvercurrent')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .enableSettingBit11
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.EnableSettingsStaticEqualizationFunction')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.enableSettingBit12
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.SystemLockStatusSerialNumber')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.systemLockStatusSerialNumber
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TotalVoltageOvervoltageAlarmVoltage')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .totalVoltageOvervoltageAlarmVoltage
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TotalVoltageOverDischargeAlarmVoltage')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .totalVoltageOverDischargeAlarmVoltage
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CellOvervoltageAlarmVoltage')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.cellOvervoltageAlarmVoltage
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CellOverDischargeAlarmVoltage')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.cellOverDischargeAlarmVoltage
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.ChargingOvercurrentAlarmCurrent')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.chargingOvercurrentAlarmCurrent
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.DischargeOvercurrentAlarmCurrent')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .dischargeOvercurrentAlarmCurrent
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.ChargingHighTemperatureAlarmTemperature')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .chargingHighTemperatureAlarmTemperature
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.ChargingLowTemperatureAlarmTemperature')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .chargingLowTemperatureAlarmTemperature
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.DischargeHighTemperatureAlarmTemperature')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .dischargeHighTemperatureAlarmTemperature
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.DischargeLowTemperatureAlarmTemperature')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .dischargeLowTemperatureAlarmTemperature
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.MOSOverTemperatureAlarmTemperature')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .mosOverTemperatureAlarmTemperature
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.MOSOverTemperatureAlarmRecoveryTemperature')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .mosOverTemperatureAlarmRecoveryTemperature
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.BatteryImbalanceAlarmPressureDifference')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .batteryImbalanceAlarmPressureDifference
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.BatteryImbalanceAlarmPressureDifference')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .imbalanceAlarmRecoveryPressureDifference
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.EnvironmentalHighTemperatureAlarm')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .environmentalHighTemperatureAlarm
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.EnvironmentalLowTemperatureAlarm')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .environmentalLowTemperatureAlarm
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.SOCLowAlarm')">
              <el-switch v-model="batteryParameter.batterySetObj.socLowAlarm" />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.ChargingCurrentLimitingFunction')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.chargingCurrentLimitingFunction
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.PowerDownVoltage')">
              <el-switch
                v-model="batteryParameter.batterySetObj.powerDownVoltage"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.PowerDownCurrent')">
              <el-switch
                v-model="batteryParameter.batterySetObj.powerDownCurrent"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.PowerDownDelay')">
              <el-switch
                v-model="batteryParameter.batterySetObj.powerDownDelay"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.MonthlySelfDischargeRate')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.monthlySelfDischargeRate
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.Cycle1CapacityRatio')">
              <el-switch
                v-model="batteryParameter.batterySetObj.cycle1CapacityRatio"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.SOC0MonomerVoltage')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.soc0PercentMonomerVoltage
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.FullCapacityAttenuationOncePerCycle')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj
                    .fullCapacityAttenuationOncePerCycle
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.MailAddress')">
              <el-switch
                v-model="batteryParameter.batterySetObj.communicateAddress"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CustomParameter2')">
              <el-switch
                v-model="batteryParameter.batterySetObj.customParameters1"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CustomParameter1')">
              <el-switch
                v-model="batteryParameter.batterySetObj.customParameters2"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CustomParameter3')">
              <el-switch
                v-model="batteryParameter.batterySetObj.customParameters3"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CustomParameter4')">
              <el-switch
                v-model="batteryParameter.batterySetObj.customParameters4"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CustomParameter5')">
              <el-switch
                v-model="batteryParameter.batterySetObj.customParameters5"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CustomParameter6')">
              <el-switch
                v-model="batteryParameter.batterySetObj.customParameters6"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CustomParameter7')">
              <el-switch
                v-model="batteryParameter.batterySetObj.customParameters7"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CustomParameter8')">
              <el-switch
                v-model="batteryParameter.batterySetObj.customParameters8"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CustomStatus1')">
              <el-switch
                v-model="batteryParameter.batterySetObj.customStatus1"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.CustomStatus2')">
              <el-switch
                v-model="batteryParameter.batterySetObj.customStatus2"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.DischargeStaticHeatingEnable')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.dischargeStaticHeatingEnable
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.UnlockSystemLock')">
              <el-switch
                v-model="batteryParameter.batterySetObj.unlockSystemLock"
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.DischargeOnHeatingTemperature')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.dischargeOnHeatingTemperature
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.DischargeOffHeatingTemperature')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.dischargeOffHeatingTemperature
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.stateDischargeState1')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.stateOneBit0
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.stateChargingState1')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.stateOneBit1
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.stateChargerState1')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.stateOneBit2
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.stateMOSTemperature1')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.stateOneBit4
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.stateAmbientTemperature1')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.stateOneBit5
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.stateCellOvervoltage1')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.stateOneBit8
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.stateTotalPressureOvervoltage1')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.stateOneBit9
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.stateFullProtection1')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.stateOneBit12
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.stateCellUndervoltage2')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.stateTwoBit0
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.stateTotalVoltageUndervoltage2')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.stateTwoBit1
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.stateHighTemperatureProtectionDuringCharging2')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.stateTwoBit8
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.stateLowTemperatureProtectionDuringCharging2')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.stateTwoBit9
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.stateMOSHighTemperatureProtection2')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.stateTwoBit10
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.stateHighTemperatureProtectionDuringDischarge2')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.stateTwoBit12
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.stateLowTemperatureProtectionDuringDischarge2')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.stateTwoBit13
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.stateDischargeShortCircuitProtection3')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.stateThreeBit0
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.stateDischargeOvercurrentProtection3')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.stateThreeBit1
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.stateChargingOvercurrentProtection3')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.stateThreeBit2
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.stateEnvironmentalHighTemperatureProtection3')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.stateThreeBit4
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.stateEnvironmentalLowTemperatureProtection3')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.stateThreeBit5
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.stateCellOvervoltageSystemLock3')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.stateThreeBit8
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.stateBatteryUndervoltageSystemLock3')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.stateThreeBit9
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.stateChargingOvercurrentSystemLock3')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.stateThreeBit10
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.stateDischargeOvercurrentSystemLock3')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.stateThreeBit11
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.stateChargingOverTemperatureSystemLock3')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.stateThreeBit12
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.stateDischargeOverTemperatureSystemLock3')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.stateThreeBit13
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.stateChargingUndervoltageSystemLock3')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.stateThreeBit14
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.stateDischargeUndervoltageSystemLock3')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.stateThreeBit15
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.statusHeatingStatus')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.stateBit0
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.statusDischargeMOSSwitch')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.stateBit1
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.statusChargingMOSSwitch')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.stateBit2
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.statusTemperatureAcquisitionFailure')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.stateBit8
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.statusVoltageAcquisitionFailure')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.stateBit9
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.statusDischargeMOSFailure')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.stateBit10
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.statusChargingMOSFailure')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.stateBit11
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.statusBatteryImbalanceAlarm')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.stateBit12
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.statusDischargeLowTemperatureAlarm')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.stateBit14
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.statusChargingLowTemperatureAlarm')">
              <el-switch
                v-model="
                  batteryParameter.batterySetObj.stateBit15
                "
              />
            </el-descriptions-item>

          </el-descriptions>
        </el-card>
      </el-card>

      <el-card style="margin-top: 10px">
        <div slot="header">
          <span>{{$t('parameterConfiguration.ThreePhaseElectricityMeter')}}</span>
          <el-switch
            style="margin-left: 10px"
            v-model="threePhaseMeterParameter.isShow"
            @change="changeThreePhaseParameter"
          />
        </div>
        <el-card>
          <div slot="header">
            <span>{{$t('parameterConfiguration.BasicSettings')}}</span>
            <el-switch
              style="margin-left: 10px"
              v-model="threePhaseMeterParameter.threePhaseMeterBasic"
              @change="changeThreePhaseParameterItem('threePhaseMeterBasic')"
            />
          </div>
          <el-descriptions title="" :column="3">
            <el-descriptions-item :label="$t('parameterConfiguration.OneCircuitCombinedActiveTotalElectricalEnergy')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .oneCombinedActiveTotalElectricEnergy
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TwoCircuitCombinedActiveTotalElectricalEnergy')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .twoCombinedActiveTotalElectricEnergy
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.ThreeCircuitCombinedActiveTotalElectricalEnergy')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .threeCombinedActiveTotalElectricEnergy
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.FourCircuitCombinedActiveTotalElectricalEnergy')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .fourCombinedActiveTotalElectricEnergy
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.OneCurrentPositiveActiveTotalElectricEnergy')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .oneCurrentTotalPositiveActiveEnergy
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TwoCurrentPositiveActiveTotalElectricEnergy')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .twoCurrentTotalPositiveActiveEnergy
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.ThreeCurrentPositiveActiveTotalElectricEnergy')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .threeCurrentTotalPositiveActiveEnergy
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.FourCurrentPositiveActiveTotalElectricEnergy')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .fourCurrentTotalPositiveActiveEnergy
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.OneCurrentReverseActiveTotalElectricEnergy')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .oneCurrentTotalReserveActiveEnergy
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TwoCurrentReverseActiveTotalElectricEnergy')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .twoCurrentTotalReserveActiveEnergy
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.ThreeCurrentReverseActiveTotalElectricEnergy')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .threeCurrentTotalReserveActiveEnergy
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.FourCurrentReverseActiveTotalElectricEnergy')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .fourCurrentTotalReserveActiveEnergy
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.OneCircuitAphaseVoltage')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.oneVoltageA
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.OneCircuitBphaseVoltage')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.oneVoltageB
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.OneCircuitCphaseVoltage')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.oneVoltageC
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TwoCircuitAphaseVoltage')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.twoVoltageA
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TwoCircuitBphaseVoltage')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.twoVoltageB
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TwoCircuitCphaseVoltage')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.twoVoltageC
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.ThreeCircuitAphaseVoltage')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.threeVoltageA
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.ThreeCircuitBphaseVoltage')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.threeVoltageB
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.ThreeCircuitCphaseVoltage')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.threeVoltageC
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.FourCircuitAphaseVoltage')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.fourVoltageA
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.FourCircuitBphaseVoltage')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.fourVoltageB
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.FourCircuitCphaseVoltage')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.fourVoltageC
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.OneCircuitAphaseCurrent')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.oneCurrentA
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.OneCircuitBphaseCurrent')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.oneCurrentB
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.OneCircuitCphaseCurrent')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.oneCurrentC
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TwoCircuitAphaseCurrent')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.twoCurrentA
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TwoCircuitBphaseCurrent')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.twoCurrentB
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TwoCircuitCphaseCurrent')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.twoCurrentC
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.ThreeCircuitAphaseCurrent')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.threeCurrentA
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.ThreeCircuitBphaseCurrent')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.threeCurrentB
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.ThreeCircuitCphaseCurrent')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.threeCurrentC
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.FourCircuitAphaseCurrent')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.fourCurrentA
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.FourCircuitBphaseCurrent')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.fourCurrentB
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.FourCircuitCphaseCurrent')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.fourCurrentC
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TotalActivePowerOfOneChannel')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .oneTotalActivePower
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TotalActivePowerOf1circuitAphase')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .oneTotalActivePowerA
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TotalActivePowerOf1circuitBphase')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .oneTotalActivePowerB
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TotalActivePowerOf1circuitCphase')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .oneTotalActivePowerC
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TotalPowerOf2wayActivePower')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .twoTotalActivePower
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TotalActivePowerOf2circuitAphase')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .twoTotalActivePowerA
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TotalActivePowerOf2circuitBphase')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .twoTotalActivePowerB
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TotalActivePowerOf2circuitCphase')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .twoTotalActivePowerC
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TotalPowerOf3wayActivePower')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .threeTotalActivePower
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TotalActivePowerOf3phaseA')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .threeTotalActivePowerA
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TotalActivePowerOf3phaseB')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .threeTotalActivePowerB
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TotalActivePowerOf3phaseC')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .threeTotalActivePowerC
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TotalPowerOf4wayActivePower')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .fourTotalActivePower
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TotalActivePowerOf4phaseA')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .fourTotalActivePowerA
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TotalActivePowerOf4phaseB')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .fourTotalActivePowerB
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TotalActivePowerOf4phaseC')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .fourTotalActivePowerC
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.OneChannelTotalPowerFactor')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .onePowerFactorTotal
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.OneCircuitAphasePowerFactor')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.onePowerFactorA
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.OneCircuitBphasePowerFactor')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.onePowerFactorB
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.OneCircuitCphasePowerFactor')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.onePowerFactorC
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TwoWayTotalPowerFactor')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .twoPowerFactorTotal
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TwoWayAphasePowerFactor')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.twoPowerFactorA
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TwoWayBphasePowerFactor')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.twoPowerFactorB
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TwoWayCphasePowerFactor')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.twoPowerFactorC
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.ThreeWayTotalPowerFactor')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .threePowerFactorTotal
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.ThreeWayAphasePowerFactor')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .threePowerFactorA
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.ThreeWayBphasePowerFactor')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .threePowerFactorB
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.ThreeWayCphasePowerFactor')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .threePowerFactorC
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.ThreeWayCphasePowerFactor')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .fourPowerFactorTotal
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.FourWayTotalPowerFactor')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.fourPowerFactorA
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.FourWayBphasePowerFactor')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.fourPowerFactorB
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.FourWayCphasePowerFactor')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.fourPowerFactorC
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.OneChannelFrequency')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.oneFrequency
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TwoChannelFrequency')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.twoFrequency
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.ThreeChannelFrequency')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.threeFrequency
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.FourChannelFrequency')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj.fourFrequency
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TotalReactivePowerOfOneChannel')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .oneTotalReactivePower
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TotalReactivePowerOf1circuitAphase')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .oneTotalReactivePowerA
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TotalReactivePowerOf1circuitBphase')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .oneTotalReactivePowerB
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TotalReactivePowerOf1circuitCphase')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .oneTotalReactivePowerC
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TotalReactivePowerOfTwoChannel')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .twoTotalReactivePower
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TotalReactivePowerOf2circuitAphase')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .twoTotalReactivePowerA
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TotalReactivePowerOf2circuitBphase')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .twoTotalReactivePowerB
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TotalReactivePowerOf2circuitCphase')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .twoTotalReactivePowerC
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TotalReactivePowerOfThreeChannel')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .threeTotalReactivePower
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TotalReactivePowerOf3circuitAphase')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .threeTotalReactivePowerA
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TotalReactivePowerOf3circuitBphase')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .threeTotalReactivePowerB
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TotalReactivePowerOf3circuitCphase')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .threeTotalReactivePowerC
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TotalReactivePowerOfFourChannel')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .fourTotalReactivePower
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TotalReactivePowerOf4circuitAphase')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .fourTotalReactivePowerA
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TotalReactivePowerOf4circuitBphase')">
              <el-switch
                v-model="
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .fourTotalReactivePowerB
                "
              />
            </el-descriptions-item>
            <el-descriptions-item :label="$t('parameterConfiguration.TotalReactivePowerOf4circuitCphase')">
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
          modbusDecodeVersion: false,
          deviceTypeSignOne: false,
          deviceTypeSignTwo: false,
          deviceTypeSignThree: false,
          protocolAddress144: false,
          protocolAddress146: false,
          protocolAddress148: false,
          protocolAddress150: false,
          protocolAddress152: false,
          protocolAddress153: false,
          protocolAddress154: false,
          protocolAddress155: false,
          protocolAddress156: false,
          protocolAddress157: false,
          protocolAddress158: false,
          protocolAddress159: false,
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
          // clearElectricityConsumptionData: false,
          // clearPowerGenerationData: false,
          clearBatteryData: false,
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
          acCoupling: false,
          emptyElectricityMeterEnergy: false,
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
          // state1: false,
          // state2: false,
          // state3: false,
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
          // state: false,

          alarmStateBit0: false,
          alarmStateBit1: false,
          alarmStateBit2: false,
          alarmStateBit3: false,
          alarmStateBit4: false,
          alarmStateBit5: false,
          alarmStateBit6: false,
          alarmStateBit7: false,
          alarmStateBit8: false,
          alarmStateBit9: false,
          alarmStateBit10: false,
          alarmStateBit11: false,
          
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
          enableSettingBit0: false,
          enableSettingBit1: false,
          enableSettingBit2: false,
          enableSettingBit3: false,
          enableSettingBit4: false,
          enableSettingBit5: false,
          enableSettingBit6: false,
          enableSettingBit7: false,
          enableSettingBit8: false,
          enableSettingBit9: false,
          enableSettingBit10: false,
          enableSettingBit11: false,
          enableSettingBit12: false,
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
          stateOneBit0: false,
          stateOneBit1: false,
          stateOneBit2: false,
          stateOneBit4: false,
          stateOneBit5: false,
          stateOneBit8: false,
          stateOneBit9: false,
          stateOneBit12: false,
          stateTwoBit0: false,
          stateTwoBit1: false,
          stateTwoBit8: false,
          stateTwoBit9: false,
          stateTwoBit10: false,
          stateTwoBit12: false,
          stateTwoBit13: false,
          stateThreeBit0: false,
          stateThreeBit1: false,
          stateThreeBit2: false,
          stateThreeBit4: false,
          stateThreeBit5: false,
          stateThreeBit8: false,
          stateThreeBit9: false,
          stateThreeBit10: false,
          stateThreeBit11: false,
          stateThreeBit12: false,
          stateThreeBit13: false,
          stateThreeBit14: false,
          stateThreeBit15: false,
          stateBit0: false,
          stateBit1: false,
          stateBit2: false,
          stateBit8: false,
          stateBit9: false,
          stateBit10: false,
          stateBit11: false,
          stateBit12: false,
          stateBit14: false,
          stateBit15: false,
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
