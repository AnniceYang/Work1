<template>
  <div class="app-container realTime">
    <basic-container>
      <el-page-header
        @back="goBack"
        :content="$t('deviceManage.deviceDetails')"
      ></el-page-header>

      <el-menu
        :default-active="activeIndex"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="7">{{
          $t("deviceManage.operationInformation")
        }}</el-menu-item>
        <el-menu-item index="8">{{
          $t("deviceManage.systemSettings")
        }}</el-menu-item>
        <el-menu-item index="9" v-if="isAdmin">{{
          $t("deviceManage.batteryParameters")
        }}</el-menu-item>

        <el-menu-item index="11" v-if="isAdmin">{{
          $t("deviceManage.scheduledSettings")
        }}</el-menu-item>

        <el-menu-item index="13" v-if="deviceInfo.threePhase">{{
          $t("parameterConfiguration.threePhaseMeterBasic")
        }}</el-menu-item>
        <el-menu-item
          index="0"
          v-if="systemSet.otherSetObj.countryCodeVal == '1'"
          >{{ $t("deviceManage.selfTest") }}</el-menu-item
        >
        <div class="fixed-sn-box" v-if="isAdmin">
          SN Code: {{ deviceInfo.sn }}
        </div>
      </el-menu>

      <div v-loading="loading">
        <el-card style="margin-top: 20px; position: relative">
          <el-descriptions
            :title="$t('deviceManage.deviceInformation')"
            :column="3"
          >
            <el-descriptions-item :label="$t('deviceManage.deviceName')">{{
              deviceInfo.name
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.snCode')">{{
              deviceInfo.sn
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('deviceManage.deviceStatus')">{{
              devStatusFilter[deviceInfo.status]
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('common.createTime')">{{
              deviceInfo.createTime | parseTime
            }}</el-descriptions-item>
          </el-descriptions>
        </el-card>
      </div>

      <template v-if="activeIndex === '7'">
        <el-card
          style="margin-top: 10px"
          v-if="operationInformation.runInformation"
        >
          <el-descriptions
            :title="$t('deviceManage.operationInformation')"
            :column="3"
          >
            <el-descriptions-item
              :label="$t('deviceManage.displayType')"
              v-if="
                operationInformationIsDisplay(
                  'runInformationObj',
                  'displayType'
                )
              "
            >
              {{
                operationInformation.runInformationObj.displayTypeVal
                  | displayTypeValFilter
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.MCUSoftwareVersion')"
              v-if="
                operationInformationIsDisplay(
                  'runInformationObj',
                  'mcuSoftwareVersion'
                )
              "
              >{{
                operationInformation.runInformationObj.mcuSoftwareVersionVal
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.DSPSoftwareVersion')"
              v-if="
                operationInformationIsDisplay(
                  'runInformationObj',
                  'dspSoftwareVersion'
                )
              "
              >{{
                operationInformation.runInformationObj.dspSoftwareVersionVal
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.MCUHardwareVersion')"
              v-if="
                operationInformationIsDisplay(
                  'runInformationObj',
                  'mcuHardwareVersion'
                )
              "
              >{{
                operationInformation.runInformationObj.mcuHardwareVersionVal
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.DSPHardwareVersion')"
              v-if="
                operationInformationIsDisplay(
                  'runInformationObj',
                  'dspHardwareVersion'
                )
              "
              >{{
                operationInformation.runInformationObj.dspHardwareVersionVal
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.currentModeOfTheSystem')"
              v-if="
                operationInformationIsDisplay(
                  'runInformationObj',
                  'currentModeOfTheSystem'
                )
              "
            >
              <!-- {{ operationInformation.runInformationObj.currentModeOfTheSystemVal | systemModeFilter }} -->
              {{
                systemModeFilter[
                  operationInformation.runInformationObj
                    .currentModeOfTheSystemVal
                ]
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.systemOperationStatus')"
              v-if="
                operationInformationIsDisplay(
                  'runInformationObj',
                  'systemRunStatus'
                )
              "
            >
              {{
                systemStateFilter[
                  operationInformation.runInformationObj.systemRunStatusVal
                ]
              }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('common.wifiStrength')"
              >{{
                getWifiStrengthLevel(
                  operationInformation.runInformationObj.wifiStrengthVal
                )
              }}
              <span
                >&nbsp; ({{
                  operationInformation.runInformationObj.wifiStrengthVal
                }})</span
              ></el-descriptions-item
            >
          </el-descriptions>
        </el-card>

        <el-card
          style="margin-top: 10px"
          v-if="operationInformation.basicInformation"
        >
          <el-descriptions
            :title="$t('deviceManage.basicInformation')"
            :column="3"
          >
            <el-descriptions-item
              :label="$t('deviceManage.dcdcTemperature')"
              v-if="
                operationInformationIsDisplay(
                  'basicInformationObj',
                  'dcdcTemperature'
                )
              "
              >{{
                operationInformation.basicInformationObj.dcdcTemperatureVal
              }}℃</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.countryCode')"
              v-if="
                operationInformationIsDisplay(
                  'basicInformationObj',
                  'countryCode'
                )
              "
            >
              {{
                countryCodeValFilter[
                  operationInformation.basicInformationObj.countryCodeVal
                ]
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.busbarVoltage')"
              v-if="
                operationInformationIsDisplay(
                  'basicInformationObj',
                  'busVoltage'
                )
              "
              >{{
                operationInformation.basicInformationObj.busVoltageVal
              }}V</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.dailyPowerGeneration')"
              v-if="
                operationInformationIsDisplay(
                  'basicInformationObj',
                  'dailyPowerGeneration'
                )
              "
              >{{
                operationInformation.basicInformationObj
                  .dailyPowerGenerationVal
              }}kWh</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.totalPowerGeneration')"
              v-if="
                operationInformationIsDisplay(
                  'basicInformationObj',
                  'totalPowerGeneration'
                )
              "
              >{{
                operationInformation.basicInformationObj
                  .totalPowerGenerationVal
              }}kWh</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.ratedPower')"
              v-if="
                operationInformationIsDisplay(
                  'basicInformationObj',
                  'ratedPower'
                )
              "
              >{{
                operationInformation.basicInformationObj.ratedPowerVal
              }}KW</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.batteryEnergy')"
              v-if="
                operationInformationIsDisplay(
                  'basicInformationObj',
                  'batteryEnergy'
                )
              "
              >{{
                operationInformation.basicInformationObj.batteryEnergyVal
              }}kWh</el-descriptions-item
            >
          </el-descriptions>
        </el-card>

        <el-card style="margin-top: 10px" v-if="operationInformation.hm12Info">
          <el-descriptions :title="$t('deviceManage.hm12Info')" :column="3">
            <el-descriptions-item
              :label="$t('deviceManage.HM_0X04_16')"
              v-if="operationInformationIsDisplay('hm12InfoObj', 'HM_0X04_16')"
              >{{
                HM_0X04_16ValFilter[
                  operationInformation.hm12InfoObj.HM_0X04_16Val
                ]
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.HM_0X04_36')"
              v-if="operationInformationIsDisplay('hm12InfoObj', 'HM_0X04_36')"
            >
              {{ operationInformation.hm12InfoObj.HM_0X04_36Val }}V
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM_0X04_51')"
              v-if="operationInformationIsDisplay('hm12InfoObj', 'HM_0X04_51')"
              >{{
                operationInformation.hm12InfoObj.HM_0X04_51Val
              }}℃</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.HM_0X04_110')"
              v-if="operationInformationIsDisplay('hm12InfoObj', 'HM_0X04_110')"
              >{{
                HM_0X04_110ValFilter[
                  operationInformation.hm12InfoObj.HM_0X04_110Val
                ]
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.HM_0X04_115')"
              v-if="operationInformationIsDisplay('hm12InfoObj', 'HM_0X04_115')"
              >{{
                HM_0X04_115ValFilter[
                  operationInformation.hm12InfoObj.HM_0X04_115Val
                ]
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.HM_0X04_117')"
              v-if="operationInformationIsDisplay('hm12InfoObj', 'HM_0X04_117')"
              >{{
                operationInformation.hm12InfoObj.HM_0X04_117Val
              }}%</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.HM_0X04_160')"
              v-if="operationInformationIsDisplay('hm12InfoObj', 'HM_0X04_160')"
              >{{
                HM_0X04_160ValFilter[
                  operationInformation.hm12InfoObj.HM_0X04_160Val
                ]
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.HM_0X04_171')"
              v-if="operationInformationIsDisplay('hm12InfoObj', 'HM_0X04_171')"
              >{{
                operationInformation.hm12InfoObj.HM_0X04_171Val
              }}A</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.HM_0X04_32772_32779')"
              v-if="
                operationInformationIsDisplay(
                  'hm12InfoObj',
                  'HM_0X04_32772_32779'
                )
              "
              >{{
                operationInformation.hm12InfoObj.HM_0X04_32772_32779Val
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.HM_0X04_32780_32787')"
              v-if="
                operationInformationIsDisplay(
                  'hm12InfoObj',
                  'HM_0X04_32780_32787'
                )
              "
              >{{
                operationInformation.hm12InfoObj.HM_0X04_32780_32787Val
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.HM_0X04_32788_32795')"
              v-if="
                operationInformationIsDisplay(
                  'hm12InfoObj',
                  'HM_0X04_32788_32795'
                )
              "
              >{{
                operationInformation.hm12InfoObj.HM_0X04_32788_32795Val
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.HM_0X04_32796')"
              v-if="
                operationInformationIsDisplay('hm12InfoObj', 'HM_0X04_32796')
              "
              >{{
                operationInformation.hm12InfoObj.HM_0X04_32796Val
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.HM_0X04_32797')"
              v-if="
                operationInformationIsDisplay('hm12InfoObj', 'HM_0X04_32797')
              "
              >{{
                operationInformation.hm12InfoObj.HM_0X04_32797Val
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.HM_0X04_32813_32820')"
              v-if="
                operationInformationIsDisplay(
                  'hm12InfoObj',
                  'HM_0X04_32813_32820'
                )
              "
              >{{
                operationInformation.hm12InfoObj.HM_0X04_32813_32820Val
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.HM_0X04_440')"
              v-if="operationInformationIsDisplay('hm12InfoObj', 'HM_0X04_440')"
              >{{
                HM_0X04_440ValFilter[
                  operationInformation.hm12InfoObj.HM_0X04_440Val
                ]
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.HM_0X04_308')"
              v-if="operationInformationIsDisplay('hm12InfoObj', 'HM_0X04_308')"
              >{{
                operationInformation.hm12InfoObj.HM_0X04_308Val
              }}mA</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.HM_0X04_430')"
              v-if="operationInformationIsDisplay('hm12InfoObj', 'HM_0X04_430')"
              >{{
                operationInformation.hm12InfoObj.HM_0X04_430Val
              }}V</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.HM_0X04_431')"
              v-if="operationInformationIsDisplay('hm12InfoObj', 'HM_0X04_431')"
              >{{
                operationInformation.hm12InfoObj.HM_0X04_431Val
              }}A</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.HM_0X04_432')"
              v-if="operationInformationIsDisplay('hm12InfoObj', 'HM_0X04_432')"
              >{{
                operationInformation.hm12InfoObj.HM_0X04_432Val
              }}Hz</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.HM_0X04_433')"
              v-if="operationInformationIsDisplay('hm12InfoObj', 'HM_0X04_433')"
              >{{
                operationInformation.hm12InfoObj.HM_0X04_433Val
              }}VA</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.HM_0X04_434')"
              v-if="operationInformationIsDisplay('hm12InfoObj', 'HM_0X04_434')"
              >{{
                operationInformation.hm12InfoObj.HM_0X04_434Val
              }}W</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.HM_0X04_435')"
              v-if="operationInformationIsDisplay('hm12InfoObj', 'HM_0X04_435')"
              >{{
                operationInformation.hm12InfoObj.HM_0X04_435Val
              }}VAR</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.HM_0X04_436')"
              v-if="operationInformationIsDisplay('hm12InfoObj', 'HM_0X04_436')"
              >{{
                HM_0X04_436ValFilter[
                  operationInformation.hm12InfoObj.HM_0X04_436Val
                ]
              }}</el-descriptions-item
            >
          </el-descriptions>
        </el-card>

        <el-card
          style="margin-top: 10px"
          v-if="operationInformation.pvInformation"
        >
          <el-descriptions
            :title="$t('deviceManage.pvInformation')"
            :column="3"
          >
            <el-descriptions-item
              :label="$t('deviceManage.pv1Voltage')"
              v-if="
                operationInformationIsDisplay('pvInformationObj', 'pv1Voltage')
              "
              >{{
                operationInformation.pvInformationObj.pv1VoltageVal
              }}V</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.pv1Current')"
              v-if="
                operationInformationIsDisplay('pvInformationObj', 'pv1Current')
              "
              >{{
                operationInformation.pvInformationObj.pv1CurrentVal
              }}A</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.pv1Power')"
              v-if="
                operationInformationIsDisplay('pvInformationObj', 'pv1Power')
              "
              >{{
                operationInformation.pvInformationObj.pv1PowerVal
              }}W</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.pv2Voltage')"
              v-if="
                operationInformationIsDisplay('pvInformationObj', 'pv2Voltage')
              "
              >{{
                operationInformation.pvInformationObj.pv2VoltageVal
              }}V</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.pv2Current')"
              v-if="
                operationInformationIsDisplay('pvInformationObj', 'pv2Current')
              "
              >{{
                operationInformation.pvInformationObj.pv2CurrentVal
              }}A</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.pv2Power')"
              v-if="
                operationInformationIsDisplay('pvInformationObj', 'pv2Power')
              "
              >{{
                operationInformation.pvInformationObj.pv2PowerVal
              }}W</el-descriptions-item
            >
          </el-descriptions>
        </el-card>

        <el-card
          style="margin-top: 10px"
          v-if="operationInformation.batteryInformation"
        >
          <el-descriptions :title="$t('deviceManage.batteryInfo')" :column="3">
            <el-descriptions-item
              :label="$t('deviceManage.batteryStatus')"
              v-if="
                operationInformationIsDisplay(
                  'batteryInformationObj',
                  'batteryStatus'
                )
              "
            >
              {{
                batteryStatusFilter[
                  operationInformation.batteryInformationObj.batteryStatusVal
                ]
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.batteryVoltage')"
              v-if="
                operationInformationIsDisplay(
                  'batteryInformationObj',
                  'batteryVoltage'
                )
              "
              >{{
                operationInformation.batteryInformationObj.batteryVoltageVal
              }}V</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.batteryCurrent')"
              v-if="
                operationInformationIsDisplay(
                  'batteryInformationObj',
                  'batteryCurrent'
                )
              "
              >{{
                operationInformation.batteryInformationObj.batteryCurrentVal
              }}A</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.batteryPower')"
              v-if="
                operationInformationIsDisplay(
                  'batteryInformationObj',
                  'batteryPower'
                )
              "
              >{{
                operationInformation.batteryInformationObj.batteryPowerVal
              }}W</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.batteryTotalSoc')"
              v-if="
                operationInformationIsDisplay(
                  'batteryInformationObj',
                  'batteryTotalSoc'
                )
              "
              >{{
                operationInformation.batteryInformationObj.batteryTotalSocVal
              }}%</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.BMSlogo')"
              v-if="
                operationInformationIsDisplay(
                  'batteryInformationObj',
                  'bmsSign'
                )
              "
            >
              {{
                BMSFilter[operationInformation.batteryInformationObj.bmsSignVal]
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.PROTOCOL_ADDR_250')"
              v-if="
                operationInformationIsDisplay(
                  'batteryInformationObj',
                  'PROTOCOL_ADDR_250'
                )
              "
              >{{
                operationInformation.batteryInformationObj.PROTOCOL_ADDR_250Val
              }}V
            </el-descriptions-item>
          </el-descriptions>
        </el-card>

        <el-card
          style="margin-top: 10px"
          v-if="operationInformation.powerGridInformation"
        >
          <el-descriptions
            :title="$t('deviceManage.powerGridInformation')"
            :column="3"
          >
            <el-descriptions-item
              :label="$t('deviceManage.powerGridStatus')"
              v-if="
                operationInformationIsDisplay(
                  'powerGridInformationObj',
                  'powerGridStatus'
                )
              "
            >
              {{
                GridStateFilter[
                  operationInformation.powerGridInformationObj
                    .powerGridStatusVal
                ]
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.phaseAGridFrequency')"
              v-if="
                operationInformationIsDisplay(
                  'powerGridInformationObj',
                  'gridFrequencyA'
                )
              "
              >{{
                operationInformation.powerGridInformationObj.gridFrequencyAVal
              }}Hz</el-descriptions-item
            >
            <!-- <el-descriptions-item
              :label="$t('deviceManage.phaseBGridFrequency')"
              v-if="
                operationInformationIsDisplay(
                  'powerGridInformationObj',
                  'gridFrequencyB'
                )
              "
              >{{
                operationInformation.powerGridInformationObj.gridFrequencyBVal
              }}Hz</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.phaseCGridFrequency')"
              v-if="
                operationInformationIsDisplay(
                  'powerGridInformationObj',
                  'gridFrequencyC'
                )
              "
              >{{
                operationInformation.powerGridInformationObj.gridFrequencyCVal
              }}Hz</el-descriptions-item
            > -->
            <el-descriptions-item
              :label="$t('deviceManage.phaseAGridVoltage')"
              v-if="
                operationInformationIsDisplay(
                  'powerGridInformationObj',
                  'gridVoltageA'
                )
              "
              >{{
                operationInformation.powerGridInformationObj.gridVoltageAVal
              }}V</el-descriptions-item
            >
            <!-- <el-descriptions-item
              :label="$t('deviceManage.phaseBGridVoltage')"
              v-if="
                operationInformationIsDisplay(
                  'powerGridInformationObj',
                  'gridVoltageB'
                )
              "
              >{{
                operationInformation.powerGridInformationObj.gridVoltageBVal
              }}V</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.phaseCGridVoltage')"
              v-if="
                operationInformationIsDisplay(
                  'powerGridInformationObj',
                  'gridVoltageC'
                )
              "
              >{{
                operationInformation.powerGridInformationObj.gridVoltageCVal
              }}V</el-descriptions-item
            > -->
            <el-descriptions-item
              :label="$t('deviceManage.apparentPowerOfThePowerGrid')"
              v-if="
                operationInformationIsDisplay(
                  'powerGridInformationObj',
                  'apparentPowerOfThePowerGrid'
                )
              "
              >{{
                operationInformation.powerGridInformationObj
                  .apparentPowerOfThePowerGridVal
              }}VA</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.gridActivePower')"
              v-if="
                operationInformationIsDisplay(
                  'powerGridInformationObj',
                  'activePowerOfThePowerGrid'
                )
              "
              >{{
                operationInformation.powerGridInformationObj
                  .activePowerOfThePowerGridVal
              }}W</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.reactivePowerOfThePowerGrid')"
              v-if="
                operationInformationIsDisplay(
                  'powerGridInformationObj',
                  'reactivePowerOfThePowerGrid'
                )
              "
              >{{
                operationInformation.powerGridInformationObj
                  .reactivePowerOfThePowerGridVal
              }}VAR</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.ctCurrent')"
              v-if="
                operationInformationIsDisplay(
                  'powerGridInformationObj',
                  'ctCurrent'
                )
              "
              >{{
                operationInformation.powerGridInformationObj.ctCurrentVal
              }}A</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.ctPower')"
              v-if="
                operationInformationIsDisplay(
                  'powerGridInformationObj',
                  'ctPower'
                )
              "
              >{{
                operationInformation.powerGridInformationObj.ctPowerVal
              }}W</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.CTDirection')"
              v-if="
                operationInformationIsDisplay(
                  'powerGridInformationObj',
                  'ctDirection'
                )
              "
            >
              {{
                CTFilter[
                  operationInformation.powerGridInformationObj.ctDirectionVal
                ]
              }}
            </el-descriptions-item>
          </el-descriptions>
        </el-card>

        <el-card
          style="margin-top: 10px"
          v-if="operationInformation.inverterInformation"
        >
          <el-descriptions
            :title="$t('deviceManage.inverterInformation')"
            :column="3"
          >
            <el-descriptions-item
              :label="$t('deviceManage.inverterSideTemperature')"
              v-if="
                operationInformationIsDisplay(
                  'inverterInformationObj',
                  'inverterTemperature'
                )
              "
              >{{
                operationInformation.inverterInformationObj
                  .inverterTemperatureVal
              }}℃</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.inversionState')"
              v-if="
                operationInformationIsDisplay(
                  'inverterInformationObj',
                  'inversionState'
                )
              "
            >
              {{
                invertingStateFilter[
                  operationInformation.inverterInformationObj.inversionStateVal
                ]
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.phaseAInverterOutputFrequency')"
              v-if="
                operationInformationIsDisplay(
                  'inverterInformationObj',
                  'inverterOutputFrequencyA'
                )
              "
              >{{
                operationInformation.inverterInformationObj
                  .inverterOutputFrequencyAVal
              }}Hz</el-descriptions-item
            >
            <!-- <el-descriptions-item
              :label="$t('deviceManage.phaseBInverterOutputFrequency')"
              v-if="
                operationInformationIsDisplay(
                  'inverterInformationObj',
                  'inverterOutputFrequencyB'
                )
              "
              >{{
                operationInformation.inverterInformationObj
                  .inverterOutputFrequencyBVal
              }}Hz</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.phaseCInverterOutputFrequency')"
              v-if="
                operationInformationIsDisplay(
                  'inverterInformationObj',
                  'inverterOutputFrequencyC'
                )
              "
              >{{
                operationInformation.inverterInformationObj
                  .inverterOutputFrequencyCVal
              }}Hz</el-descriptions-item
            > -->
            <el-descriptions-item
              :label="$t('deviceManage.phaseAInverterOutputVoltage')"
              v-if="
                operationInformationIsDisplay(
                  'inverterInformationObj',
                  'inverterOutputVoltageA'
                )
              "
              >{{
                operationInformation.inverterInformationObj
                  .inverterOutputVoltageAVal
              }}V</el-descriptions-item
            >
            <!-- <el-descriptions-item
              :label="$t('deviceManage.phaseBInverterOutputVoltage')"
              v-if="
                operationInformationIsDisplay(
                  'inverterInformationObj',
                  'inverterOutputVoltageB'
                )
              "
              >{{
                operationInformation.inverterInformationObj
                  .inverterOutputVoltageBVal
              }}V</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.phaseCInverterOutputVoltage')"
              v-if="
                operationInformationIsDisplay(
                  'inverterInformationObj',
                  'inverterOutputVoltageC'
                )
              "
              >{{
                operationInformation.inverterInformationObj
                  .inverterOutputVoltageCVal
              }}V</el-descriptions-item
            > -->
            <el-descriptions-item
              :label="$t('deviceManage.phaseAInverterOutputCurrent')"
              v-if="
                operationInformationIsDisplay(
                  'inverterInformationObj',
                  'inverterOutputCurrentA'
                )
              "
              >{{
                operationInformation.inverterInformationObj
                  .inverterOutputCurrentAVal
              }}A</el-descriptions-item
            >
            <!-- <el-descriptions-item
              :label="$t('deviceManage.phaseBInverterOutputCurrent')"
              v-if="
                operationInformationIsDisplay(
                  'inverterInformationObj',
                  'inverterOutputCurrentB'
                )
              "
              >{{
                operationInformation.inverterInformationObj
                  .inverterOutputCurrentBVal
              }}A</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.phaseCInverterOutputCurrent')"
              v-if="
                operationInformationIsDisplay(
                  'inverterInformationObj',
                  'inverterOutputCurrentC'
                )
              "
              >{{
                operationInformation.inverterInformationObj
                  .inverterOutputCurrentCVal
              }}A</el-descriptions-item
            > -->
            <el-descriptions-item
              :label="$t('deviceManage.phaseAInverterApparentPower')"
              v-if="
                operationInformationIsDisplay(
                  'inverterInformationObj',
                  'invertedApparentPowerA'
                )
              "
              >{{
                operationInformation.inverterInformationObj
                  .invertedApparentPowerAVal
              }}VA</el-descriptions-item
            >
            <!-- <el-descriptions-item
              :label="$t('deviceManage.phaseBInverterApparentPower')"
              v-if="
                operationInformationIsDisplay(
                  'inverterInformationObj',
                  'invertedApparentPowerB'
                )
              "
              >{{
                operationInformation.inverterInformationObj
                  .invertedApparentPowerBVal
              }}VA</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.phaseCInverterApparentPower')"
              v-if="
                operationInformationIsDisplay(
                  'inverterInformationObj',
                  'invertedApparentPowerC'
                )
              "
              >{{
                operationInformation.inverterInformationObj
                  .invertedApparentPowerCVal
              }}VA</el-descriptions-item
            > -->
            <el-descriptions-item
              :label="$t('deviceManage.phaseAInverterActivePower')"
              v-if="
                operationInformationIsDisplay(
                  'inverterInformationObj',
                  'invertedActivePowerA'
                )
              "
              >{{
                operationInformation.inverterInformationObj
                  .invertedActivePowerAVal
              }}W</el-descriptions-item
            >
            <!-- <el-descriptions-item
              :label="$t('deviceManage.phaseBInverterActivePower')"
              v-if="
                operationInformationIsDisplay(
                  'inverterInformationObj',
                  'invertedActivePowerB'
                )
              "
              >{{
                operationInformation.inverterInformationObj
                  .invertedActivePowerBVal
              }}W</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.phaseCInverterActivePower')"
              v-if="
                operationInformationIsDisplay(
                  'inverterInformationObj',
                  'invertedActivePowerC'
                )
              "
              >{{
                operationInformation.inverterInformationObj
                  .invertedActivePowerCVal
              }}W</el-descriptions-item
            > -->
            <el-descriptions-item
              :label="$t('deviceManage.phaseAInverterReactivePower')"
              v-if="
                operationInformationIsDisplay(
                  'inverterInformationObj',
                  'invertedReactivePowerA'
                )
              "
              >{{
                operationInformation.inverterInformationObj
                  .invertedReactivePowerAVal
              }}VAR</el-descriptions-item
            >
            <!-- <el-descriptions-item
              :label="$t('deviceManage.phaseBInverterReactivePower')"
              v-if="
                operationInformationIsDisplay(
                  'inverterInformationObj',
                  'invertedReactivePowerB'
                )
              "
              >{{
                operationInformation.inverterInformationObj
                  .invertedReactivePowerBVal
              }}VAR</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.phaseCInverterReactivePower')"
              v-if="
                operationInformationIsDisplay(
                  'inverterInformationObj',
                  'invertedReactivePowerC'
                )
              "
              >{{
                operationInformation.inverterInformationObj
                  .invertedReactivePowerCVal
              }}VAR</el-descriptions-item
            > -->
          </el-descriptions>
        </el-card>

        <el-card
          style="margin-top: 10px"
          v-if="operationInformation.loadInformation"
        >
          <el-descriptions
            :title="$t('deviceManage.loadInformation')"
            :column="3"
          >
            <el-descriptions-item
              :label="$t('deviceManage.phaseALoadVoltage')"
              v-if="
                operationInformationIsDisplay(
                  'loadInformationObj',
                  'loadVoltageA'
                )
              "
              >{{
                operationInformation.loadInformationObj.loadVoltageAVal
              }}V</el-descriptions-item
            >
            <!-- <el-descriptions-item
              :label="$t('deviceManage.phaseBLoadVoltage')"
              v-if="
                operationInformationIsDisplay(
                  'loadInformationObj',
                  'loadVoltageB'
                )
              "
              >{{
                operationInformation.loadInformationObj.loadVoltageBVal
              }}V</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.phaseCLoadVoltage')"
              v-if="
                operationInformationIsDisplay(
                  'loadInformationObj',
                  'loadVoltageC'
                )
              "
              >{{
                operationInformation.loadInformationObj.loadVoltageCVal
              }}V</el-descriptions-item
            > -->
            <el-descriptions-item
              :label="$t('deviceManage.phaseALoadCurrent')"
              v-if="
                operationInformationIsDisplay(
                  'loadInformationObj',
                  'loadCurrentA'
                )
              "
              >{{
                operationInformation.loadInformationObj.loadCurrentAVal
              }}A</el-descriptions-item
            >
            <!-- <el-descriptions-item
              :label="$t('deviceManage.phaseBLoadCurrent')"
              v-if="
                operationInformationIsDisplay(
                  'loadInformationObj',
                  'loadCurrentB'
                )
              "
              >{{
                operationInformation.loadInformationObj.loadCurrentBVal
              }}A</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.phaseCLoadCurrent')"
              v-if="
                operationInformationIsDisplay(
                  'loadInformationObj',
                  'loadCurrentC'
                )
              "
              >{{
                operationInformation.loadInformationObj.loadCurrentCVal
              }}A</el-descriptions-item
            > -->
            <el-descriptions-item
              :label="$t('deviceManage.apparentPowerOfPhaseALoad')"
              v-if="
                operationInformationIsDisplay(
                  'loadInformationObj',
                  'apparentPowerOfLoadA'
                )
              "
              >{{
                operationInformation.loadInformationObj.apparentPowerOfLoadAVal
              }}VA</el-descriptions-item
            >
            <!-- <el-descriptions-item
              :label="$t('deviceManage.apparentPowerOfPhaseBLoad')"
              v-if="
                operationInformationIsDisplay(
                  'loadInformationObj',
                  'apparentPowerOfLoadB'
                )
              "
              >{{
                operationInformation.loadInformationObj.apparentPowerOfLoadBVal
              }}VA</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.apparentPowerOfPhaseCLoad')"
              v-if="
                operationInformationIsDisplay(
                  'loadInformationObj',
                  'apparentPowerOfLoadC'
                )
              "
              >{{
                operationInformation.loadInformationObj.apparentPowerOfLoadCVal
              }}VA</el-descriptions-item
            > -->
            <el-descriptions-item
              :label="$t('deviceManage.phaseALoadActivePower')"
              v-if="
                operationInformationIsDisplay(
                  'loadInformationObj',
                  'loadActivePowerA'
                )
              "
              >{{
                operationInformation.loadInformationObj.loadActivePowerAVal
              }}W</el-descriptions-item
            >
            <!-- <el-descriptions-item
              :label="$t('deviceManage.phaseBLoadActivePower')"
              v-if="
                operationInformationIsDisplay(
                  'loadInformationObj',
                  'loadActivePowerB'
                )
              "
              >{{
                operationInformation.loadInformationObj.loadActivePowerBVal
              }}W</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.phaseCLoadActivePower')"
              v-if="
                operationInformationIsDisplay(
                  'loadInformationObj',
                  'loadActivePowerC'
                )
              "
              >{{
                operationInformation.loadInformationObj.loadActivePowerCVal
              }}W</el-descriptions-item
            > -->
            <el-descriptions-item
              :label="$t('deviceManage.phaseALoadPowerPercentage')"
              v-if="
                operationInformationIsDisplay(
                  'loadInformationObj',
                  'loadPowerPercentageA'
                )
              "
              >{{
                operationInformation.loadInformationObj.loadPowerPercentageAVal
              }}%</el-descriptions-item
            >
            <!-- <el-descriptions-item
              :label="$t('deviceManage.phaseBLoadPowerPercentage')"
              v-if="
                operationInformationIsDisplay(
                  'loadInformationObj',
                  'loadPowerPercentageB'
                )
              "
              >{{
                operationInformation.loadInformationObj.loadPowerPercentageBVal
              }}%</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.phaseCLoadPowerPercentage')"
              v-if="
                operationInformationIsDisplay(
                  'loadInformationObj',
                  'loadPowerPercentageC'
                )
              "
              >{{
                operationInformation.loadInformationObj.loadPowerPercentageCVal
              }}%</el-descriptions-item
            > -->
            <el-descriptions-item
              :label="$t('deviceManage.loadRealTimePower')"
              v-if="
                operationInformationIsDisplay(
                  'loadInformationObj',
                  'realTimePowerOfLoad'
                )
              "
              >{{
                operationInformation.loadInformationObj.realTimePowerOfLoadVal
              }}W</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.powerConsumption')"
              v-if="
                operationInformationIsDisplay(
                  'loadInformationObj',
                  'powerConsumption'
                )
              "
              >{{
                operationInformation.loadInformationObj.powerConsumptionVal
              }}kWh</el-descriptions-item
            >
          </el-descriptions>
        </el-card>

        <el-card
          style="margin-top: 10px"
          v-if="operationInformation.electricityMeterInformation"
        >
          <el-descriptions
            :title="$t('deviceManage.electricityMeterInformation')"
            :column="3"
          >
            <el-descriptions-item
              :label="$t('deviceManage.normalIndicatorOfElectricityMeter')"
              v-if="
                operationInformationIsDisplay(
                  'electricityMeterInformationObj',
                  'normalIndicatorOfElectricityMeter'
                )
              "
            >
              {{
                meterNormalFilter[
                  operationInformation.electricityMeterInformationObj
                    .normalIndicatorOfElectricityMeterVal
                ]
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.meterVoltage')"
              v-if="
                operationInformationIsDisplay(
                  'electricityMeterInformationObj',
                  'meterVoltage'
                )
              "
              >{{
                operationInformation.electricityMeterInformationObj
                  .meterVoltageVal
              }}V</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.currentCombinedActiveEnergy')"
              v-if="
                operationInformationIsDisplay(
                  'electricityMeterInformationObj',
                  'currentCombinedActiveEnergy'
                )
              "
              >{{
                operationInformation.electricityMeterInformationObj
                  .currentCombinedActiveEnergyVal
              }}kWh</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.currentPositiveActiveEnergy')"
              v-if="
                operationInformationIsDisplay(
                  'electricityMeterInformationObj',
                  'currentPositiveActiveEnergy'
                )
              "
              >{{
                operationInformation.electricityMeterInformationObj
                  .currentPositiveActiveEnergyVal
              }}kWh</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.currentReverseActiveEnergy')"
              v-if="
                operationInformationIsDisplay(
                  'electricityMeterInformationObj',
                  'currentReverseActiveEnergy'
                )
              "
              >{{
                operationInformation.electricityMeterInformationObj
                  .currentReverseActiveEnergyVal
              }}kWh</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.meterCurrent')"
              v-if="
                operationInformationIsDisplay(
                  'electricityMeterInformationObj',
                  'electricityMeterCurrent'
                )
              "
              >{{
                operationInformation.electricityMeterInformationObj
                  .electricityMeterCurrentVal
              }}A</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.meterPower')"
              v-if="
                operationInformationIsDisplay(
                  'electricityMeterInformationObj',
                  'electricityMeterPower'
                )
              "
              >{{
                operationInformation.electricityMeterInformationObj
                  .electricityMeterPowerVal
              }}W</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.meterPowerFactor')"
              v-if="
                operationInformationIsDisplay(
                  'electricityMeterInformationObj',
                  'electricityMeterPowerFactor'
                )
              "
              >{{
                operationInformation.electricityMeterInformationObj
                  .electricityMeterPowerFactorVal
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.meterFrequency')"
              v-if="
                operationInformationIsDisplay(
                  'electricityMeterInformationObj',
                  'electricityMeterFrequency'
                )
              "
              >{{
                operationInformation.electricityMeterInformationObj
                  .electricityMeterFrequencyVal
              }}Hz</el-descriptions-item
            >
          </el-descriptions>
        </el-card>

        <el-card
          style="margin-top: 10px"
          v-if="operationInformation.otherInformation"
        >
          <el-descriptions
            :title="$t('deviceManage.otherInformation')"
            :column="2"
          >
            <el-descriptions-item
              :label="$t('deviceManage.selfInspectionStatus')"
              v-if="
                operationInformationIsDisplay(
                  'otherInformationObj',
                  'selfInspectionStatus'
                )
              "
            >
              {{
                selfCheckFilter[
                  operationInformation.otherInformationObj
                    .selfInspectionStatusVal
                ]
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.protectionThreshold')"
              v-if="
                operationInformationIsDisplay(
                  'otherInformationObj',
                  'selfCheckActualProtectionThreshold'
                )
              "
            >
              {{
                operationInformation.otherInformationObj
                  .selfCheckActualProtectionThresholdVal
              }}V/Hz
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.protectionTime')"
              v-if="
                operationInformationIsDisplay(
                  'otherInformationObj',
                  'selfCheckActualProtectionTime'
                )
              "
            >
              {{
                operationInformation.otherInformationObj
                  .selfCheckActualProtectionTimeVal
              }}ms
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.realTimeProtectionThreshold')"
              v-if="
                operationInformationIsDisplay(
                  'otherInformationObj',
                  'selfCheckRealTimeProtectionThreshold'
                )
              "
            >
              {{
                operationInformation.otherInformationObj
                  .selfCheckRealTimeProtectionThresholdVal
              }}V/Hz
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.USBStatus')"
              v-if="
                operationInformationIsDisplay(
                  'otherInformationObj',
                  'usbStatus'
                )
              "
            >
              {{
                USBFilter[operationInformation.otherInformationObj.usbStatusVal]
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.lineNumber1')"
              v-if="
                operationInformationIsDisplay(
                  'otherInformationObj',
                  'energyFlowOne'
                )
              "
            >
              {{ operationInformation.otherInformationObj.energyFlowOneVal }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.lineNumber2')"
              v-if="
                operationInformationIsDisplay(
                  'otherInformationObj',
                  'energyFlowTwo'
                )
              "
            >
              {{
                energyFlowFilter[
                  operationInformation.otherInformationObj.energyFlowTwoVal
                ]
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.switchNumber')"
              v-if="
                operationInformationIsDisplay(
                  'otherInformationObj',
                  'energyFlowThree'
                )
              "
            >
              {{ operationInformation.otherInformationObj.energyFlowThreeVal }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.runTimeD')"
              v-if="
                operationInformationIsDisplay(
                  'otherInformationObj',
                  'runTimeDay'
                )
              "
            >
              {{ operationInformation.otherInformationObj.runTimeDayVal }}d
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.runTimeH')"
              v-if="
                operationInformationIsDisplay(
                  'otherInformationObj',
                  'runTimeHour'
                )
              "
            >
              {{ operationInformation.otherInformationObj.runTimeHourVal }}h
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.runTimeM')"
              v-if="
                operationInformationIsDisplay(
                  'otherInformationObj',
                  'runTimeMinute'
                )
              "
            >
              {{ operationInformation.otherInformationObj.runTimeMinuteVal }}min
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.runTimeS')"
              v-if="
                operationInformationIsDisplay(
                  'otherInformationObj',
                  'runTimeSecond'
                )
              "
            >
              {{ operationInformation.otherInformationObj.runTimeSecondVal }}s
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.dailyElectricityConsumption')"
              v-if="
                operationInformationIsDisplay(
                  'otherInformationObj',
                  'dailyElectricityConsumption'
                )
              "
            >
              {{
                operationInformation.otherInformationObj
                  .dailyElectricityConsumptionVal
              }}kWh
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.accumulatedElectricityConsumption')"
              v-if="
                operationInformationIsDisplay(
                  'otherInformationObj',
                  'accumulatedElectricityConsumption'
                )
              "
            >
              {{
                operationInformation.otherInformationObj
                  .accumulatedElectricityConsumptionVal
              }}kWh
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.dailyGridConnectionVolume')"
              v-if="
                operationInformationIsDisplay(
                  'otherInformationObj',
                  'dailyGridConnectionVolume'
                )
              "
            >
              {{
                operationInformation.otherInformationObj
                  .dailyGridConnectionVolumeVal
              }}kWh
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.accumulatedGridConnectionQuantity')"
              v-if="
                operationInformationIsDisplay(
                  'otherInformationObj',
                  'accumulatedGridConnectionQuantity'
                )
              "
            >
              {{
                operationInformation.otherInformationObj
                  .accumulatedGridConnectionQuantityVal
              }}kWh
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.dailyElectricityPurchase')"
              v-if="
                operationInformationIsDisplay(
                  'otherInformationObj',
                  'dailyElectricityPurchase'
                )
              "
            >
              {{
                operationInformation.otherInformationObj
                  .dailyElectricityPurchaseVal
              }}kWh
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.accumulatedPurchasingPower')"
              v-if="
                operationInformationIsDisplay(
                  'otherInformationObj',
                  'accumulatedPurchasingPower'
                )
              "
            >
              {{
                operationInformation.otherInformationObj
                  .accumulatedPurchasingPowerVal
              }}kWh
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.dailyChargingCapacity')"
              v-if="
                operationInformationIsDisplay(
                  'otherInformationObj',
                  'dailyChargingCapacity'
                )
              "
            >
              {{
                operationInformation.otherInformationObj
                  .dailyChargingCapacityVal
              }}kWh
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.accumulatedChargingCapacity')"
              v-if="
                operationInformationIsDisplay(
                  'otherInformationObj',
                  'accumulatedChargingCapacity'
                )
              "
            >
              {{
                operationInformation.otherInformationObj
                  .accumulatedChargingCapacityVal
              }}kWh
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.dailyDischargeCapacity')"
              v-if="
                operationInformationIsDisplay(
                  'otherInformationObj',
                  'dailyDischargeCapacity'
                )
              "
            >
              {{
                operationInformation.otherInformationObj
                  .dailyDischargeCapacityVal
              }}kWh
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.accumulatedDischargeCapacity')"
              v-if="
                operationInformationIsDisplay(
                  'otherInformationObj',
                  'accumulatedDischargeCapacity'
                )
              "
            >
              {{
                operationInformation.otherInformationObj
                  .accumulatedDischargeCapacityVal
              }}kWh
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.leakageCurrent')"
              v-if="
                operationInformationIsDisplay(
                  'otherInformationObj',
                  'leakageCurrent'
                )
              "
            >
              {{ operationInformation.otherInformationObj.leakageCurrentVal }}mA
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.intermediateBusbarVoltage')"
              v-if="
                operationInformationIsDisplay(
                  'otherInformationObj',
                  'intermediateBusbarVoltage'
                )
              "
            >
              {{
                operationInformation.otherInformationObj
                  .intermediateBusbarVoltageVal
              }}V
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.buckBoostCurrent')"
              v-if="
                operationInformationIsDisplay(
                  'otherInformationObj',
                  'buckBoostCurrent'
                )
              "
            >
              {{
                operationInformation.otherInformationObj.buckBoostCurrentVal
              }}A
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.PVIsoVoltage')"
              v-if="
                operationInformationIsDisplay(
                  'otherInformationObj',
                  'pvIsoVoltage'
                )
              "
            >
              {{ operationInformation.otherInformationObj.pvIsoVoltageVal }}V
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.zeroGroundVoltage')"
              v-if="
                operationInformationIsDisplay(
                  'otherInformationObj',
                  'zeroGroundVoltage'
                )
              "
            >
              {{
                operationInformation.otherInformationObj.zeroGroundVoltageVal
              }}V
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.DCInverterCurrent')"
              v-if="
                operationInformationIsDisplay(
                  'otherInformationObj',
                  'dcComponentOfInverterCurrent'
                )
              "
            >
              {{
                operationInformation.otherInformationObj
                  .dcComponentOfInverterCurrentVal
              }}mA
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.DCLoadVoltage')"
              v-if="
                operationInformationIsDisplay(
                  'otherInformationObj',
                  'dcComponentOfLoadVoltage'
                )
              "
            >
              {{
                operationInformation.otherInformationObj
                  .dcComponentOfLoadVoltageVal
              }}mA
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.relayIntermediateVoltage')"
              v-if="
                operationInformationIsDisplay(
                  'otherInformationObj',
                  'relayIntermediateVoltage'
                )
              "
            >
              {{
                operationInformation.otherInformationObj
                  .relayIntermediateVoltageVal
              }}V
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.numberOfRecords')"
              v-if="
                operationInformationIsDisplay(
                  'otherInformationObj',
                  'numberOfHistoryRecords'
                )
              "
            >
              {{
                operationInformation.otherInformationObj
                  .numberOfHistoryRecordsVal
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.enableState')"
              v-if="
                operationInformationIsDisplay(
                  'otherInformationObj',
                  'batteryChargingAndDischargingHeatingEnableState'
                )
              "
            >
              {{
                heatingEnableFilter[
                  operationInformation.otherInformationObj
                    .batteryChargingAndDischargingHeatingEnableStateVal
                ]
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.factoryCode')"
              v-if="
                operationInformationIsDisplay(
                  'otherInformationObj',
                  'batteryFactoryCode'
                )
              "
            >
              {{
                operationInformation.otherInformationObj.batteryFactoryCodeVal
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.productNumber')"
              v-if="
                operationInformationIsDisplay(
                  'otherInformationObj',
                  'batteryProductNumber'
                )
              "
            >
              {{
                operationInformation.otherInformationObj.batteryProductNumberVal
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.factoryDate')"
              v-if="
                operationInformationIsDisplay(
                  'otherInformationObj',
                  'batteryFactoryDate'
                )
              "
            >
              {{
                operationInformation.otherInformationObj.batteryFactoryDateVal
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.chargingCurrent')"
              v-if="
                operationInformationIsDisplay(
                  'otherInformationObj',
                  'maximumAllowableChargingCurrent'
                )
              "
            >
              {{
                operationInformation.otherInformationObj
                  .maximumAllowableChargingCurrentVal
              }}mA
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.manufacturerInformation')"
              v-if="
                operationInformationIsDisplay(
                  'otherInformationObj',
                  'manufacturerInformation'
                )
              "
            >
              {{
                operationInformation.otherInformationObj
                  .manufacturerInformationVal
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.inverterSerialNumber')"
              v-if="
                operationInformationIsDisplay(
                  'otherInformationObj',
                  'inverterSerialNumber'
                )
              "
            >
              {{
                operationInformation.otherInformationObj.inverterSerialNumberVal
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.dischargeCurrent')"
              v-if="
                operationInformationIsDisplay(
                  'otherInformationObj',
                  'maximumAllowableDischargeCurrent'
                )
              "
            >
              {{
                operationInformation.otherInformationObj
                  .maximumAllowableDischargeCurrentVal
              }}mA
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.chargingByBattery')"
              v-if="
                operationInformationIsDisplay(
                  'otherInformationObj',
                  'maximumChargingCurrentAllowedByTheInverterForTheBattery'
                )
              "
            >
              {{
                operationInformation.otherInformationObj
                  .maximumChargingCurrentAllowedByTheInverterForTheBatteryVal
              }}A
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.dischargeByBattery')"
              v-if="
                operationInformationIsDisplay(
                  'otherInformationObj',
                  'maximumDischargeCurrentAllowedByTheInverterForTheBattery'
                )
              "
            >
              {{
                operationInformation.otherInformationObj
                  .maximumDischargeCurrentAllowedByTheInverterForTheBatteryVal
              }}A
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.modbusDecodingVersion')"
              v-if="
                operationInformationIsDisplay(
                  'otherInformationObj',
                  'modbusDecodeVersion'
                )
              "
            >
              {{
                operationInformation.otherInformationObj.modbusDecodeVersionVal
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.deviceTypeIdentifier1')"
              v-if="
                operationInformationIsDisplay(
                  'otherInformationObj',
                  'deviceTypeSignOne'
                )
              "
            >
              {{
                operationInformation.otherInformationObj.deviceTypeSignOneVal
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.deviceTypeIdentifier2')"
              v-if="
                operationInformationIsDisplay(
                  'otherInformationObj',
                  'deviceTypeSignTwo'
                )
              "
            >
              {{
                operationInformation.otherInformationObj.deviceTypeSignTwoVal
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.deviceTypeIdentifier3')"
              v-if="
                operationInformationIsDisplay(
                  'otherInformationObj',
                  'deviceTypeSignThree'
                )
              "
            >
              {{
                operationInformation.otherInformationObj.deviceTypeSignThreeVal
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.protocolAddress144')"
              v-if="
                operationInformationIsDisplay(
                  'otherInformationObj',
                  'protocolAddress144'
                )
              "
            >
              {{
                operationInformation.otherInformationObj.protocolAddress144Val
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.protocolAddress146')"
              v-if="
                operationInformationIsDisplay(
                  'otherInformationObj',
                  'protocolAddress146'
                )
              "
            >
              {{
                operationInformation.otherInformationObj.protocolAddress146Val
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.protocolAddress148')"
              v-if="
                operationInformationIsDisplay(
                  'otherInformationObj',
                  'protocolAddress148'
                )
              "
            >
              {{
                operationInformation.otherInformationObj.protocolAddress148Val
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.protocolAddress150')"
              v-if="
                operationInformationIsDisplay(
                  'otherInformationObj',
                  'protocolAddress150'
                )
              "
            >
              {{
                operationInformation.otherInformationObj.protocolAddress150Val
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.protocolAddress152')"
              v-if="
                operationInformationIsDisplay(
                  'otherInformationObj',
                  'protocolAddress152'
                )
              "
            >
              {{
                operationInformation.otherInformationObj.protocolAddress152Val
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.protocolAddress153')"
              v-if="
                operationInformationIsDisplay(
                  'otherInformationObj',
                  'protocolAddress153'
                )
              "
            >
              {{
                operationInformation.otherInformationObj.protocolAddress153Val
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.protocolAddress154')"
              v-if="
                operationInformationIsDisplay(
                  'otherInformationObj',
                  'protocolAddress154'
                )
              "
            >
              {{
                operationInformation.otherInformationObj.protocolAddress154Val
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.protocolAddress155')"
              v-if="
                operationInformationIsDisplay(
                  'otherInformationObj',
                  'protocolAddress155'
                )
              "
            >
              {{
                operationInformation.otherInformationObj.protocolAddress155Val
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.protocolAddress156')"
              v-if="
                operationInformationIsDisplay(
                  'otherInformationObj',
                  'protocolAddress156'
                )
              "
            >
              {{
                operationInformation.otherInformationObj.protocolAddress156Val
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.protocolAddress157')"
              v-if="
                operationInformationIsDisplay(
                  'otherInformationObj',
                  'protocolAddress157'
                )
              "
            >
              {{
                operationInformation.otherInformationObj.protocolAddress157Val
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.protocolAddress158')"
              v-if="
                operationInformationIsDisplay(
                  'otherInformationObj',
                  'protocolAddress158'
                )
              "
            >
              {{
                operationInformation.otherInformationObj.protocolAddress158Val
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.protocolAddress159')"
              v-if="
                operationInformationIsDisplay(
                  'otherInformationObj',
                  'protocolAddress159'
                )
              "
            >
              {{
                operationInformation.otherInformationObj.protocolAddress159Val
              }}
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </template>

      <template v-else-if="activeIndex === '8'">
        <el-card style="margin-top: 10px" v-if="systemSet.commonSet">
          <el-descriptions
            :title="$t('deviceManage.commonSettings')"
            :column="3"
            border
          >
            <el-descriptions-item
              :label="$t('deviceManage.setSystemTime')"
              v-if="systemSetIsDisplay('commonSetObj', 'systemTime')"
            >
              <div style="display: flex">
                <el-input
                  v-model="systemSet.commonSetObj.systemTimeVal"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="systemSetBtnIsDisplay('commonSetObj', 'systemTime')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'systemTime',
                      systemSet.commonSetObj.systemTimeVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.communicationType')"
              v-if="
                systemSetIsDisplay('commonSetObj', 'communicationProtocolType')
              "
            >
              <div style="display: flex">
                <el-select
                  v-model="systemSet.commonSetObj.communicationProtocolTypeVal"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option :label="$t('deviceManage.user')" value="0" />
                  <el-option :label="$t('deviceManage.engineer')" value="1" />
                </el-select>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'commonSetObj',
                      'communicationProtocolType'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'communicationProtocolType',
                      systemSet.commonSetObj.communicationProtocolTypeVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.dailyCalibration')"
              v-if="
                systemSetIsDisplay(
                  'commonSetObj',
                  'dailyPowerGenerationCalibration'
                )
              "
            >
              <div style="display: flex">
                <el-input
                  v-model="
                    systemSet.commonSetObj.dailyPowerGenerationCalibrationVal
                  "
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'commonSetObj',
                      'dailyPowerGenerationCalibration'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'dailyPowerGenerationCalibration',
                      systemSet.commonSetObj.dailyPowerGenerationCalibrationVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.totalCalibration')"
              v-if="
                systemSetIsDisplay(
                  'commonSetObj',
                  'totalPowerGenerationCalibration'
                )
              "
            >
              <div style="display: flex">
                <el-input
                  v-model="
                    systemSet.commonSetObj.totalPowerGenerationCalibrationVal
                  "
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'commonSetObj',
                      'totalPowerGenerationCalibration'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'totalPowerGenerationCalibration',
                      systemSet.commonSetObj.totalPowerGenerationCalibrationVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.clearBatteryData')"
              v-if="systemSetIsDisplay('commonSetObj', 'clearBatteryData')"
            >
              <div style="display: flex">
                <el-select
                  v-model="systemSet.commonSetObj.clearBatteryDataVal"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option label="0" value="0" />
                  <el-option :label="$t('common.confirm')" value="65535" />
                </el-select>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay('commonSetObj', 'clearBatteryData')
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'clearBatteryData',
                      systemSet.commonSetObj.clearBatteryDataVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.bootCommand')"
              v-if="systemSetIsDisplay('commonSetObj', 'bootCommand')"
            >
              <div style="display: flex">
                <el-select
                  v-model="systemSet.commonSetObj.bootCommandVal"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option label="0" value="0" />
                  <el-option :label="$t('common.confirm')" value="65535" />
                </el-select>
                <el-button
                  v-if="systemSetBtnIsDisplay('commonSetObj', 'bootCommand')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'bootCommand',
                      systemSet.commonSetObj.bootCommandVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.shutdownCommand')"
              v-if="systemSetIsDisplay('commonSetObj', 'shutdownCommand')"
            >
              <div style="display: flex">
                <el-select
                  v-model="systemSet.commonSetObj.shutdownCommandVal"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option label="0" value="0" />
                  <el-option :label="$t('common.confirm')" value="65535" />
                </el-select>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay('commonSetObj', 'shutdownCommand')
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'shutdownCommand',
                      systemSet.commonSetObj.shutdownCommandVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.cancelShutdownCommand')"
              v-if="systemSetIsDisplay('commonSetObj', 'cancelShutdownCommand')"
            >
              <div style="display: flex">
                <el-select
                  v-model="systemSet.commonSetObj.cancelShutdownCommandVal"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option label="0" value="0" />
                  <el-option :label="$t('common.confirm')" value="65535" />
                </el-select>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'commonSetObj',
                      'cancelShutdownCommand'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'cancelShutdownCommand',
                      systemSet.commonSetObj.cancelShutdownCommandVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>

        <el-card style="margin-top: 10px" v-if="systemSet.communicationSet">
          <el-descriptions
            :label="$t('deviceManage.communicationSettings')"
            :column="3"
            border
          >
            <el-descriptions-item
              :label="$t('deviceManage.BMSModel')"
              v-if="systemSetIsDisplay('communicationSetObj', 'bmsModel')"
            >
              <div style="display: flex">
                <el-select
                  v-model="systemSet.communicationSetObj.bmsModelVal"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option label="None" value="0" />
                  <el-option label="Pylontech" value="1" />
                  <el-option label="XT" value="2" />
                  <el-option label="Stealth" value="3" />
                  <el-option label="Pace" value="4" />
                  <el-option label="LeSY" value="5" />
                </el-select>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay('communicationSetObj', 'bmsModel')
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'bmsModel',
                      systemSet.communicationSetObj.bmsModelVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.BMSAddress')"
              v-if="systemSetIsDisplay('communicationSetObj', 'bmsAddress')"
            >
              <div style="display: flex">
                <el-input
                  v-model="systemSet.communicationSetObj.bmsAddressVal"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="
                    systemSetBtnIsDisplay('communicationSetObj', 'bmsAddress')
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'bmsAddress',
                      systemSet.communicationSetObj.bmsAddressVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.BMSBaudRate')"
              v-if="systemSetIsDisplay('communicationSetObj', 'bmsBaud')"
            >
              <div style="display: flex">
                <el-select
                  v-model="systemSet.communicationSetObj.bmsBaudVal"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option label="1200" value="1" />
                  <el-option label="2400" value="2" />
                  <el-option label="4800" value="3" />
                  <el-option label="9600" value="4" />
                </el-select>
                <el-button
                  v-if="systemSetBtnIsDisplay('communicationSetObj', 'bmsBaud')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'bmsBaud',
                      systemSet.communicationSetObj.bmsBaudVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.numberOfLithiumBattery')"
              v-if="
                systemSetIsDisplay(
                  'communicationSetObj',
                  'numberOfLithiumBatteryBlocks'
                )
              "
            >
              <div style="display: flex">
                <el-input
                  v-model="
                    systemSet.communicationSetObj
                      .numberOfLithiumBatteryBlocksVal
                  "
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'communicationSetObj',
                      'numberOfLithiumBatteryBlocks'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'numberOfLithiumBatteryBlocks',
                      systemSet.communicationSetObj
                        .numberOfLithiumBatteryBlocksVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.collectorAddress')"
              v-if="
                systemSetIsDisplay(
                  'communicationSetObj',
                  'collectorCommunicationAddress'
                )
              "
            >
              <div style="display: flex">
                <el-input
                  v-model="
                    systemSet.communicationSetObj
                      .collectorCommunicationAddressVal
                  "
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'communicationSetObj',
                      'collectorCommunicationAddress'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'collectorCommunicationAddress',
                      systemSet.communicationSetObj
                        .collectorCommunicationAddressVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.collectorType')"
              v-if="
                systemSetIsDisplay(
                  'communicationSetObj',
                  'collectorCommunicationProtocolType'
                )
              "
            >
              <div style="display: flex">
                <el-select
                  v-model="
                    systemSet.communicationSetObj
                      .collectorCommunicationProtocolTypeVal
                  "
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option :label="$t('deviceManage.user')" value="0" />
                  <el-option :label="$t('deviceManage.engineer')" value="1" />
                </el-select>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'communicationSetObj',
                      'collectorCommunicationProtocolType'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'collectorCommunicationProtocolType',
                      systemSet.communicationSetObj
                        .collectorCommunicationProtocolTypeVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.collectorBaudRate')"
              v-if="
                systemSetIsDisplay(
                  'communicationSetObj',
                  'baudOfCollectorCommunication'
                )
              "
            >
              <div style="display: flex">
                <el-select
                  v-model="
                    systemSet.communicationSetObj
                      .baudOfCollectorCommunicationVal
                  "
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option label="1200" value="1" />
                  <el-option label="2400" value="2" />
                  <el-option label="4800" value="3" />
                  <el-option label="9600" value="4" />
                </el-select>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'communicationSetObj',
                      'baudOfCollectorCommunication'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'baudOfCollectorCommunication',
                      systemSet.communicationSetObj
                        .baudOfCollectorCommunicationVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.deviceAddress')"
              v-if="
                systemSetIsDisplay(
                  'communicationSetObj',
                  'deviceCommunicationAddress'
                )
              "
            >
              <div style="display: flex">
                <el-input
                  v-model="
                    systemSet.communicationSetObj.deviceCommunicationAddressVal
                  "
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'communicationSetObj',
                      'deviceCommunicationAddress'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'deviceCommunicationAddress',
                      systemSet.communicationSetObj
                        .deviceCommunicationAddressVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>

        <el-card style="margin-top: 10px" v-if="systemSet.advancedSet">
          <el-descriptions
            :title="$t('deviceManage.advancedSetting')"
            :column="3"
            border
          >
            <el-descriptions-item
              :label="$t('deviceManage.parallelOffMode')"
              v-if="systemSetIsDisplay('advancedSetObj', 'parallelOffGridMode')"
            >
              <div style="display: flex">
                <el-select
                  v-model="systemSet.advancedSetObj.parallelOffGridModeVal"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option
                    :label="$t('deviceManage.gridConnectionMode')"
                    value="0"
                  />
                  <el-option
                    :label="$t('deviceManage.antiBackflowMode')"
                    value="1"
                  />
                </el-select>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'advancedSetObj',
                      'parallelOffGridMode'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'parallelOffGridMode',
                      systemSet.advancedSetObj.parallelOffGridModeVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.systemModeSettings')"
              v-if="systemSetIsDisplay('advancedSetObj', 'systemModeSet')"
            >
              <div style="display: flex">
                <el-select
                  v-model="systemSet.advancedSetObj.systemModeSetVal"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option label="UPS" value="0" />
                  <el-option label="EPS" value="1" />
                </el-select>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay('advancedSetObj', 'systemModeSet')
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'systemModeSet',
                      systemSet.advancedSetObj.systemModeSetVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.PVConnectionSettings')"
              v-if="systemSetIsDisplay('advancedSetObj', 'pvConnectionSet')"
            >
              <div style="display: flex">
                <el-select
                  v-model="systemSet.advancedSetObj.pvConnectionSetVal"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option
                    :label="$t('deviceManage.independence')"
                    value="0"
                  />
                  <el-option
                    :label="$t('deviceManage.paralleling')"
                    value="1"
                  />
                </el-select>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay('advancedSetObj', 'pvConnectionSet')
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'pvConnectionSet',
                      systemSet.advancedSetObj.pvConnectionSetVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.ratedOutputVoltageSetting')"
              v-if="
                systemSetIsDisplay('advancedSetObj', 'ratedOutputVoltageSet')
              "
            >
              <div style="display: flex">
                <el-input
                  v-model="systemSet.advancedSetObj.ratedOutputVoltageSetVal"
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">V</template>
                </el-input>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'advancedSetObj',
                      'ratedOutputVoltageSet'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'ratedOutputVoltageSet',
                      systemSet.advancedSetObj.ratedOutputVoltageSetVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.ratedOutputFrequencySetting')"
              v-if="
                systemSetIsDisplay('advancedSetObj', 'ratedOutputFrequencySet')
              "
            >
              <div style="display: flex">
                <el-input
                  v-model="systemSet.advancedSetObj.ratedOutputFrequencySetVal"
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">Hz</template>
                </el-input>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'advancedSetObj',
                      'ratedOutputFrequencySet'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'ratedOutputFrequencySet',
                      systemSet.advancedSetObj.ratedOutputFrequencySetVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.batteryTypeSettings')"
              v-if="systemSetIsDisplay('advancedSetObj', 'batteryTypeSet')"
            >
              <div style="display: flex">
                <el-select
                  v-model="systemSet.advancedSetObj.batteryTypeSetVal"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option :label="$t('deviceManage.leadAcid')" value="0" />
                  <el-option
                    :label="$t('deviceManage.lithiumBattery')"
                    value="1"
                  />
                </el-select>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay('advancedSetObj', 'batteryTypeSet')
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'batteryTypeSet',
                      systemSet.advancedSetObj.batteryTypeSetVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.batteryChargingCurrent')"
              v-if="
                systemSetIsDisplay('advancedSetObj', 'batteryChargingCurrent')
              "
            >
              <div style="display: flex">
                <el-input
                  v-model="systemSet.advancedSetObj.batteryChargingCurrentVal"
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">A</template>
                </el-input>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'advancedSetObj',
                      'batteryChargingCurrent'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'batteryChargingCurrent',
                      systemSet.advancedSetObj.batteryChargingCurrentVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.batteryDischargeCurrent')"
              v-if="
                systemSetIsDisplay('advancedSetObj', 'batteryDischargeCurrent')
              "
            >
              <div style="display: flex">
                <el-input
                  v-model="systemSet.advancedSetObj.batteryDischargeCurrentVal"
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">A</template>
                </el-input>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'advancedSetObj',
                      'batteryDischargeCurrent'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'batteryDischargeCurrent',
                      systemSet.advancedSetObj.batteryDischargeCurrentVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.batteryAverageChargingVoltage')"
              v-if="
                systemSetIsDisplay(
                  'advancedSetObj',
                  'batteryAverageChargingVoltage'
                )
              "
            >
              <div style="display: flex">
                <el-input
                  v-model="
                    systemSet.advancedSetObj.batteryAverageChargingVoltageVal
                  "
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">V</template>
                </el-input>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'advancedSetObj',
                      'batteryAverageChargingVoltage'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'batteryAverageChargingVoltage',
                      systemSet.advancedSetObj.batteryAverageChargingVoltageVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.batteryFloatChargingVoltage')"
              v-if="
                systemSetIsDisplay(
                  'advancedSetObj',
                  'batteryFloatChargingVoltage'
                )
              "
            >
              <div style="display: flex">
                <el-input
                  v-model="
                    systemSet.advancedSetObj.batteryFloatChargingVoltageVal
                  "
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">V</template>
                </el-input>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'advancedSetObj',
                      'batteryFloatChargingVoltage'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'batteryFloatChargingVoltage',
                      systemSet.advancedSetObj.batteryFloatChargingVoltageVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.batteryEOD')"
              v-if="systemSetIsDisplay('advancedSetObj', 'batteryEod')"
            >
              <div style="display: flex">
                <el-input
                  v-model="systemSet.advancedSetObj.batteryEodVal"
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">V</template>
                </el-input>
                <el-button
                  v-if="systemSetBtnIsDisplay('advancedSetObj', 'batteryEod')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'batteryEod',
                      systemSet.advancedSetObj.batteryEodVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.batteryDOD')"
              v-if="systemSetIsDisplay('advancedSetObj', 'batteryDod')"
            >
              <div style="display: flex">
                <el-input
                  v-model="systemSet.advancedSetObj.batteryDodVal"
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">V</template>
                </el-input>
                <el-button
                  v-if="systemSetBtnIsDisplay('advancedSetObj', 'batteryDod')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'batteryDod',
                      systemSet.advancedSetObj.batteryDodVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.lowerLimitOfGridConnectedSOC')"
              v-if="
                systemSetIsDisplay(
                  'advancedSetObj',
                  'lowerLimitOfGridConnectedSoc'
                )
              "
            >
              <div style="display: flex">
                <el-tooltip content="Range: 15-80%" placement="top">
                  <el-input
                    v-model.number="
                      systemSet.advancedSetObj.lowerLimitOfGridConnectedSocVal
                    "
                    type="number"
                    :placeholder="$t('common.inputPrompt')"
                  >
                    <template slot="append">%</template>
                  </el-input>
                </el-tooltip>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'advancedSetObj',
                      'lowerLimitOfGridConnectedSoc'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSaveWithValidation(
                      'lowerLimitOfGridConnectedSoc',
                      systemSet.advancedSetObj.lowerLimitOfGridConnectedSocVal,
                      15,
                      80
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.offGridSOCLowerLimit')"
              v-if="
                systemSetIsDisplay('advancedSetObj', 'offGridSocLowerLimit')
              "
            >
              <div style="display: flex">
                <el-tooltip content="Range: 0-15%" placement="top">
                  <el-input
                    v-model.number="
                      systemSet.advancedSetObj.offGridSocLowerLimitVal
                    "
                    type="number"
                    :placeholder="$t('common.inputPrompt')"
                  >
                    <template slot="append">%</template>
                  </el-input>
                </el-tooltip>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'advancedSetObj',
                      'offGridSocLowerLimit'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSaveWithValidation(
                      'offGridSocLowerLimit',
                      systemSet.advancedSetObj.offGridSocLowerLimitVal,
                      0,
                      15
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.electricityMeterCT')"
              v-if="systemSetIsDisplay('advancedSetObj', 'electricityMeterCt')"
            >
              <div style="display: flex">
                <el-select
                  v-model="systemSet.advancedSetObj.electricityMeterCtVal"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option label="NULL" value="0" />
                  <el-option
                    :label="$t('deviceManage.electricityMeter')"
                    value="1"
                  />
                  <el-option label="CT" value="2" />
                </el-select>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'advancedSetObj',
                      'electricityMeterCt'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'electricityMeterCt',
                      systemSet.advancedSetObj.electricityMeterCtVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.PROTOCOL_ADDR_405')"
              v-if="systemSetIsDisplay('advancedSetObj', 'PROTOCOL_ADDR_405')"
            >
              <div style="display: flex">
                <el-input
                  v-model="systemSet.advancedSetObj.PROTOCOL_ADDR_405Val"
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">Ah</template>
                </el-input>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay('advancedSetObj', 'PROTOCOL_ADDR_405')
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'PROTOCOL_ADDR_405',
                      systemSet.advancedSetObj.PROTOCOL_ADDR_405Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.PROTOCOL_ADDR_406')"
              v-if="systemSetIsDisplay('advancedSetObj', 'PROTOCOL_ADDR_406')"
            >
              <div style="display: flex">
                <el-select
                  v-model="systemSet.advancedSetObj.PROTOCOL_ADDR_406Val"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option :label="$t('deviceManage.none')" value="0" />
                  <el-option
                    :label="'1:' + $t('deviceManage.forceDischarging')"
                    value="1"
                  />
                  <el-option
                    :label="'2:' + $t('deviceManage.forceCharging')"
                    value="2"
                  />
                </el-select>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay('advancedSetObj', 'PROTOCOL_ADDR_406')
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'PROTOCOL_ADDR_406',
                      systemSet.advancedSetObj.PROTOCOL_ADDR_406Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.PROTOCOL_ADDR_407')"
              v-if="systemSetIsDisplay('advancedSetObj', 'PROTOCOL_ADDR_407')"
            >
              <div style="display: flex">
                <el-select
                  v-model="systemSet.advancedSetObj.PROTOCOL_ADDR_407Val"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option
                    :label="'0:' + $t('deviceManage.normalregulation')"
                    value="0"
                  />
                  <el-option
                    :label="'1:' + $t('deviceManage.lesy')"
                    value="1"
                  />
                </el-select>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay('advancedSetObj', 'PROTOCOL_ADDR_407')
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'PROTOCOL_ADDR_407',
                      systemSet.advancedSetObj.PROTOCOL_ADDR_407Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.PROTOCOL_ADDR_408')"
              v-if="systemSetIsDisplay('advancedSetObj', 'PROTOCOL_ADDR_408')"
            >
              <div style="display: flex">
                <el-input
                  v-model="systemSet.advancedSetObj.PROTOCOL_ADDR_408Val"
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">W</template>
                </el-input>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay('advancedSetObj', 'PROTOCOL_ADDR_408')
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'PROTOCOL_ADDR_408',
                      systemSet.advancedSetObj.PROTOCOL_ADDR_408Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.PROTOCOL_ADDR_441')"
              v-if="
                systemSetIsDisplay('advancedSetObj', 'PROTOCOL_ADDR_441') &&
                systemSet.otherSetObj.countryCodeVal == '6'
              "
            >
              <div style="display: flex">
                <el-input
                  v-model="systemSet.advancedSetObj.PROTOCOL_ADDR_441Val"
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">%</template>
                </el-input>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay('advancedSetObj', 'PROTOCOL_ADDR_441')
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'PROTOCOL_ADDR_441',
                      systemSet.advancedSetObj.PROTOCOL_ADDR_441Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>

        <el-card style="margin-top: 10px" v-if="systemSet.alternatorSet">
          <el-descriptions
            :title="$t('deviceManage.alternatorSet')"
            :column="3"
            border
          >
            <el-descriptions-item
              :label="$t('deviceManage.PROTOCOL_ADDR_409')"
              v-if="systemSetIsDisplay('alternatorSetObj', 'PROTOCOL_ADDR_409')"
            >
              <div style="display: flex">
                <el-select
                  v-model="systemSet.alternatorSetObj.PROTOCOL_ADDR_409Val"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option :label="$t('deviceManage.prohibit')" value="0" />
                  <el-option :label="$t('deviceManage.enable')" value="1" />
                </el-select>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'alternatorSetObj',
                      'PROTOCOL_ADDR_409'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'PROTOCOL_ADDR_409',
                      systemSet.alternatorSetObj.PROTOCOL_ADDR_409Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>

            <el-descriptions-item
              :label="$t('deviceManage.PROTOCOL_ADDR_410')"
              v-if="systemSetIsDisplay('alternatorSetObj', 'PROTOCOL_ADDR_410')"
            >
              <div style="display: flex">
                <el-input
                  v-model="systemSet.alternatorSetObj.PROTOCOL_ADDR_410Val"
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">V</template>
                </el-input>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'alternatorSetObj',
                      'PROTOCOL_ADDR_410'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'PROTOCOL_ADDR_410',
                      systemSet.alternatorSetObj.PROTOCOL_ADDR_410Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.PROTOCOL_ADDR_411')"
              v-if="systemSetIsDisplay('alternatorSetObj', 'PROTOCOL_ADDR_411')"
            >
              <div style="display: flex">
                <el-input
                  v-model="systemSet.alternatorSetObj.PROTOCOL_ADDR_411Val"
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">%</template>
                </el-input>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'alternatorSetObj',
                      'PROTOCOL_ADDR_411'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'PROTOCOL_ADDR_411',
                      systemSet.alternatorSetObj.PROTOCOL_ADDR_411Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>

            <el-descriptions-item
              :label="$t('deviceManage.PROTOCOL_ADDR_412')"
              v-if="systemSetIsDisplay('alternatorSetObj', 'PROTOCOL_ADDR_412')"
            >
              <div style="display: flex">
                <el-input
                  v-model="systemSet.alternatorSetObj.PROTOCOL_ADDR_412Val"
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">V</template>
                </el-input>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'alternatorSetObj',
                      'PROTOCOL_ADDR_412'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'PROTOCOL_ADDR_412',
                      systemSet.alternatorSetObj.PROTOCOL_ADDR_412Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.PROTOCOL_ADDR_413')"
              v-if="systemSetIsDisplay('alternatorSetObj', 'PROTOCOL_ADDR_413')"
            >
              <div style="display: flex">
                <el-input
                  v-model="systemSet.alternatorSetObj.PROTOCOL_ADDR_413Val"
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">%</template>
                </el-input>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'alternatorSetObj',
                      'PROTOCOL_ADDR_413'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'PROTOCOL_ADDR_413',
                      systemSet.alternatorSetObj.PROTOCOL_ADDR_413Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>

            <el-descriptions-item
              :label="$t('deviceManage.PROTOCOL_ADDR_414')"
              v-if="systemSetIsDisplay('alternatorSetObj', 'PROTOCOL_ADDR_414')"
            >
              <div style="display: flex">
                <el-input
                  v-model="systemSet.alternatorSetObj.PROTOCOL_ADDR_414Val"
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">Min</template>
                </el-input>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'alternatorSetObj',
                      'PROTOCOL_ADDR_414'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'PROTOCOL_ADDR_414',
                      systemSet.alternatorSetObj.PROTOCOL_ADDR_414Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>

            <el-descriptions-item
              :label="$t('deviceManage.PROTOCOL_ADDR_415')"
              v-if="systemSetIsDisplay('alternatorSetObj', 'PROTOCOL_ADDR_415')"
            >
              <div style="display: flex">
                <el-input
                  v-model="systemSet.alternatorSetObj.PROTOCOL_ADDR_415Val"
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">kW</template>
                </el-input>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'alternatorSetObj',
                      'PROTOCOL_ADDR_415'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'PROTOCOL_ADDR_415',
                      systemSet.alternatorSetObj.PROTOCOL_ADDR_415Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>

            <el-descriptions-item
              :label="$t('deviceManage.PROTOCOL_ADDR_416')"
              v-if="systemSetIsDisplay('alternatorSetObj', 'PROTOCOL_ADDR_416')"
            >
              <div style="display: flex">
                <el-select
                  v-model="systemSet.alternatorSetObj.PROTOCOL_ADDR_416Val"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option :label="$t('deviceManage.prohibit')" value="0" />
                  <el-option :label="$t('deviceManage.enable')" value="1" />
                </el-select>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'alternatorSetObj',
                      'PROTOCOL_ADDR_416'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'PROTOCOL_ADDR_416',
                      systemSet.alternatorSetObj.PROTOCOL_ADDR_416Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.PROTOCOL_ADDR_417')"
              v-if="systemSetIsDisplay('alternatorSetObj', 'PROTOCOL_ADDR_417')"
            >
              <div style="display: flex">
                <el-select
                  v-model="systemSet.alternatorSetObj.PROTOCOL_ADDR_417Val"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option :label="$t('deviceManage.prohibit')" value="0" />
                  <el-option :label="$t('deviceManage.enable')" value="1" />
                </el-select>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'alternatorSetObj',
                      'PROTOCOL_ADDR_417'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'PROTOCOL_ADDR_417',
                      systemSet.alternatorSetObj.PROTOCOL_ADDR_417Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>

            <el-descriptions-item
              :label="$t('deviceManage.PROTOCOL_ADDR_418')"
              v-if="systemSetIsDisplay('alternatorSetObj', 'PROTOCOL_ADDR_418')"
            >
              <div style="display: flex">
                <el-select
                  v-model="systemSet.alternatorSetObj.PROTOCOL_ADDR_418Val"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option
                    :label="$t('deviceManage.feedForward0')"
                    value="0"
                  />
                  <el-option
                    :label="$t('deviceManage.feedForward1')"
                    value="1"
                  />
                  <el-option
                    :label="$t('deviceManage.feedForward2')"
                    value="2"
                  />
                </el-select>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'alternatorSetObj',
                      'PROTOCOL_ADDR_418'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'PROTOCOL_ADDR_418',
                      systemSet.alternatorSetObj.PROTOCOL_ADDR_418Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.PROTOCOL_ADDR_419')"
              v-if="systemSetIsDisplay('alternatorSetObj', 'PROTOCOL_ADDR_419')"
            >
              <div style="display: flex">
                <el-input
                  v-model="systemSet.alternatorSetObj.PROTOCOL_ADDR_419Val"
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">%</template>
                </el-input>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'alternatorSetObj',
                      'PROTOCOL_ADDR_419'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'PROTOCOL_ADDR_419',
                      systemSet.alternatorSetObj.PROTOCOL_ADDR_419Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>

            <el-descriptions-item
              :label="$t('deviceManage.PROTOCOL_ADDR_420')"
              v-if="systemSetIsDisplay('alternatorSetObj', 'PROTOCOL_ADDR_420')"
            >
              <div style="display: flex">
                <el-input
                  v-model="systemSet.alternatorSetObj.PROTOCOL_ADDR_420Val"
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">Hz</template>
                </el-input>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'alternatorSetObj',
                      'PROTOCOL_ADDR_420'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'PROTOCOL_ADDR_420',
                      systemSet.alternatorSetObj.PROTOCOL_ADDR_420Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.PROTOCOL_ADDR_421')"
              v-if="systemSetIsDisplay('alternatorSetObj', 'PROTOCOL_ADDR_421')"
            >
              <div style="display: flex">
                <el-input
                  v-model="systemSet.alternatorSetObj.PROTOCOL_ADDR_421Val"
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">Hz</template>
                </el-input>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'alternatorSetObj',
                      'PROTOCOL_ADDR_421'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'PROTOCOL_ADDR_421',
                      systemSet.alternatorSetObj.PROTOCOL_ADDR_421Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.PROTOCOL_ADDR_422')"
              v-if="systemSetIsDisplay('alternatorSetObj', 'PROTOCOL_ADDR_422')"
            >
              <div style="display: flex">
                <el-input
                  v-model="systemSet.alternatorSetObj.PROTOCOL_ADDR_422Val"
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">V</template>
                </el-input>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'alternatorSetObj',
                      'PROTOCOL_ADDR_422'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'PROTOCOL_ADDR_422',
                      systemSet.alternatorSetObj.PROTOCOL_ADDR_422Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.PROTOCOL_ADDR_423')"
              v-if="systemSetIsDisplay('alternatorSetObj', 'PROTOCOL_ADDR_423')"
            >
              <div style="display: flex">
                <el-input
                  v-model="systemSet.alternatorSetObj.PROTOCOL_ADDR_423Val"
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">V</template>
                </el-input>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'alternatorSetObj',
                      'PROTOCOL_ADDR_423'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'PROTOCOL_ADDR_423',
                      systemSet.alternatorSetObj.PROTOCOL_ADDR_423Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>

        <el-card style="margin-top: 10px" v-if="systemSet.otherSet">
          <el-descriptions
            :title="$t('deviceManage.otherSettings')"
            :column="3"
            border
          >
            <el-descriptions-item
              :label="$t('deviceManage.resetDeviceInitialValues')"
              v-if="
                systemSetIsDisplay(
                  'otherSetObj',
                  'resetDeviceCommunicationSettingsToInitialValues'
                )
              "
            >
              <div style="display: flex">
                <el-select
                  v-model="
                    systemSet.otherSetObj
                      .resetDeviceCommunicationSettingsToInitialValuesVal
                  "
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option label="0" value="0" />
                  <el-option :label="$t('common.confirm')" value="65535" />
                </el-select>
                <!-- <el-input v-model="systemSet.otherSetObj.resetDeviceCommunicationSettingsToInitialValuesVal" :placeholder="$t('common.inputPrompt')" /> -->
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'otherSetObj',
                      'resetDeviceCommunicationSettingsToInitialValues'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'resetDeviceCommunicationSettingsToInitialValues',
                      systemSet.otherSetObj
                        .resetDeviceCommunicationSettingsToInitialValuesVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.clearRecordData')"
              v-if="systemSetIsDisplay('otherSetObj', 'clearRecordData')"
            >
              <div style="display: flex">
                <el-select
                  v-model="systemSet.otherSetObj.clearRecordDataVal"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option label="0" value="0" />
                  <el-option :label="$t('common.confirm')" value="65535" />
                </el-select>
                <!-- <el-input v-model="systemSet.otherSetObj.clearRecordDataVal" :placeholder="$t('common.inputPrompt')" /> -->
                <el-button
                  v-if="systemSetBtnIsDisplay('otherSetObj', 'clearRecordData')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'clearRecordData',
                      systemSet.otherSetObj.clearRecordDataVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.restoreFactorySettings')"
              v-if="systemSetIsDisplay('otherSetObj', 'factoryReset')"
            >
              <div style="display: flex">
                <el-select
                  v-model="systemSet.otherSetObj.factoryResetVal"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option :label="$t('common.cancel')" value="0" />
                  <el-option :label="$t('common.confirm')" value="1" />
                </el-select>
                <el-button
                  v-if="systemSetBtnIsDisplay('otherSetObj', 'factoryReset')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'factoryReset',
                      systemSet.otherSetObj.factoryResetVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.inverterRestart')"
              v-if="systemSetIsDisplay('otherSetObj', 'inverterRestart')"
            >
              <div style="display: flex">
                <!-- <el-input v-model="systemSet.otherSetObj.inverterRestartVal" :placeholder="$t('common.inputPrompt')" /> -->
                <el-select
                  v-model="systemSet.otherSetObj.inverterRestartVal"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option label="0" value="0" />
                  <el-option :label="$t('common.confirm')" value="65535" />
                </el-select>
                <el-button
                  v-if="systemSetBtnIsDisplay('otherSetObj', 'inverterRestart')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'inverterRestart',
                      systemSet.otherSetObj.inverterRestartVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.selfCheckEnable')"
              v-if="systemSetIsDisplay('otherSetObj', 'selfCheckEnable')"
            >
              <div style="display: flex">
                <el-select
                  v-model="systemSet.otherSetObj.selfCheckEnableVal"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option :label="$t('deviceManage.idle')" value="0" />
                  <el-option
                    :label="$t('deviceManage.overvoltageForASection')"
                    value="1"
                  />
                  <el-option
                    :label="$t('deviceManage.secondStageOvervoltage')"
                    value="2"
                  />
                  <el-option
                    :label="$t('deviceManage.oneSectionUnderVoltage')"
                    value="3"
                  />
                  <el-option
                    :label="$t('deviceManage.secondaryUndervoltage')"
                    value="4"
                  />
                  <el-option
                    :label="$t('deviceManage.overfrequencyOfASegment')"
                    value="5"
                  />
                  <el-option
                    :label="$t('deviceManage.secondStageOverfrequency')"
                    value="6"
                  />
                  <el-option
                    :label="$t('deviceManage.oneUnderfrequency')"
                    value="7"
                  />
                  <el-option
                    :label="$t('deviceManage.twoStageUnderfrequency')"
                    value="8"
                  />
                </el-select>
                <el-button
                  v-if="systemSetBtnIsDisplay('otherSetObj', 'selfCheckEnable')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'selfCheckEnable',
                      systemSet.otherSetObj.selfCheckEnableVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.manuallyClearingFaults')"
              v-if="systemSetIsDisplay('otherSetObj', 'manuallyClearingFaults')"
            >
              <div style="display: flex">
                <!-- <el-input v-model="systemSet.otherSetObj.manuallyClearingFaultsVal" :placeholder="$t('common.inputPrompt')" /> -->
                <el-select
                  v-model="systemSet.otherSetObj.manuallyClearingFaultsVal"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option label="0" value="0" />
                  <el-option :label="$t('common.confirm')" value="65535" />
                </el-select>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'otherSetObj',
                      'manuallyClearingFaults'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'manuallyClearingFaults',
                      systemSet.otherSetObj.manuallyClearingFaultsVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.automaticOperation')"
              v-if="systemSetIsDisplay('otherSetObj', 'automaticOperation')"
            >
              <div style="display: flex">
                <el-select
                  v-model="systemSet.otherSetObj.automaticOperationVal"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option
                    :label="$t('deviceManage.handMovement')"
                    value="0"
                  />
                  <el-option :label="$t('deviceManage.automatic')" value="1" />
                </el-select>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay('otherSetObj', 'automaticOperation')
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'automaticOperation',
                      systemSet.otherSetObj.automaticOperationVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.manuallyLock')"
              v-if="
                systemSetIsDisplay(
                  'otherSetObj',
                  'manuallyUnlockingTheSystemLock'
                )
              "
            >
              <div style="display: flex">
                <!-- <el-input v-model="systemSet.otherSetObj.manuallyUnlockingTheSystemLockVal" :placeholder="$t('common.inputPrompt')" /> -->
                <el-select
                  v-model="
                    systemSet.otherSetObj.manuallyUnlockingTheSystemLockVal
                  "
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option label="0" value="0" />
                  <el-option :label="$t('common.confirm')" value="65535" />
                </el-select>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'otherSetObj',
                      'manuallyUnlockingTheSystemLock'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'manuallyUnlockingTheSystemLock',
                      systemSet.otherSetObj.manuallyUnlockingTheSystemLockVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.deviceCommunicationBaudRate')"
              v-if="
                systemSetIsDisplay('otherSetObj', 'deviceCommunicationBaud')
              "
            >
              <div style="display: flex">
                <el-select
                  v-model="systemSet.otherSetObj.deviceCommunicationBaudVal"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option label="1200" value="1" />
                  <el-option label="2400" value="2" />
                  <el-option label="4800" value="3" />
                  <el-option label="9600" value="4" />
                </el-select>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'otherSetObj',
                      'deviceCommunicationBaud'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'deviceCommunicationBaud',
                      systemSet.otherSetObj.deviceCommunicationBaudVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.deviceCheckBitSelection')"
              v-if="
                systemSetIsDisplay(
                  'otherSetObj',
                  'deviceCommunicationCheckBitSelection'
                )
              "
            >
              <div style="display: flex">
                <el-select
                  v-model="
                    systemSet.otherSetObj
                      .deviceCommunicationCheckBitSelectionVal
                  "
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option
                    :label="$t('deviceManage.noCheckDigit')"
                    value="0"
                  />
                  <el-option
                    :label="$t('deviceManage.evenParityCheck')"
                    value="1"
                  />
                  <el-option :label="$t('deviceManage.oddCheck')" value="2" />
                </el-select>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'otherSetObj',
                      'deviceCommunicationCheckBitSelection'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'deviceCommunicationCheckBitSelection',
                      systemSet.otherSetObj
                        .deviceCommunicationCheckBitSelectionVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.deviceStopBitSelection')"
              v-if="
                systemSetIsDisplay(
                  'otherSetObj',
                  'deviceCommunicationStopBitSelection'
                )
              "
            >
              <div style="display: flex">
                <el-select
                  v-model="
                    systemSet.otherSetObj.deviceCommunicationStopBitSelectionVal
                  "
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option
                    :label="$t('deviceManage.bitStopBit1')"
                    value="0"
                  />
                  <el-option
                    :label="$t('deviceManage.bitStopBit2')"
                    value="1"
                  />
                </el-select>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'otherSetObj',
                      'deviceCommunicationStopBitSelection'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'deviceCommunicationStopBitSelection',
                      systemSet.otherSetObj
                        .deviceCommunicationStopBitSelectionVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.countdownInverter')"
              v-if="
                systemSetIsDisplay(
                  'otherSetObj',
                  'countdownToTurnOffTheInverter'
                )
              "
            >
              <div style="display: flex">
                <el-input
                  v-model="
                    systemSet.otherSetObj.countdownToTurnOffTheInverterVal
                  "
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'otherSetObj',
                      'countdownToTurnOffTheInverter'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'countdownToTurnOffTheInverter',
                      systemSet.otherSetObj.countdownToTurnOffTheInverterVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.delayedStartInverter')"
              v-if="systemSetIsDisplay('otherSetObj', 'delayedStartInverter')"
            >
              <div style="display: flex">
                <el-input
                  v-model="systemSet.otherSetObj.delayedStartInverterVal"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="
                    systemSetBtnIsDisplay('otherSetObj', 'delayedStartInverter')
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'delayedStartInverter',
                      systemSet.otherSetObj.delayedStartInverterVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.countryCode')"
              v-if="systemSetIsDisplay('otherSetObj', 'countryCode')"
            >
              <div style="display: flex">
                <el-select
                  v-model="systemSet.otherSetObj.countryCodeVal"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option :label="$t('deviceManage.China')" value="0" />
                  <el-option :label="$t('deviceManage.Italy')" value="1" />
                  <el-option :label="$t('deviceManage.Germany')" value="2" />
                  <el-option :label="$t('deviceManage.Australia')" value="3" />
                  <el-option :label="$t('deviceManage.Belgium')" value="4" />
                  <el-option
                    :label="$t('deviceManage.SouthAfrica')"
                    value="5"
                  />
                  <el-option :label="$t('deviceManage.England')" value="6" />
                  <el-option :label="$t('deviceManage.Spain')" value="7" />
                  <!-- <el-option
                      :label="$t('deviceManage.Europe50549')"
                      value="8"
                    /> -->
                  <el-option :label="$t('deviceManage.Ireland')" value="9" />
                  <el-option :label="$t('deviceManage.France')" value="10" />
                  <el-option :label="$t('deviceManage.Greece')" value="11" />
                </el-select>
                <el-button
                  v-if="systemSetBtnIsDisplay('otherSetObj', 'countryCode')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'countryCode',
                      systemSet.otherSetObj.countryCodeVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <!-- <el-descriptions-item :label="$t('deviceManage.systemTimeSetting')" v-if="systemSetIsDisplay('otherSetObj', 'systemTimeSetting')">
              <div style="display: flex;">
                <el-input v-model="systemSet.otherSetObj.systemTimeSettingVal" :placeholder="$t('common.inputPrompt')" />
                <el-button v-if="systemSetBtnIsDisplay('otherSetObj', 'systemTimeSetting')" type="text" style="margin-left: 5px;" @click="handleSave('systemTimeSetting', systemSet.otherSetObj.systemTimeSettingVal)">{{$t('common.save')}}</el-button>
              </div>
            </el-descriptions-item> -->
            <el-descriptions-item
              :label="$t('deviceManage.inverterActivePowerSetting')"
              v-if="
                systemSetIsDisplay('otherSetObj', 'inverterActivePowerSetting')
              "
            >
              <div style="display: flex">
                <el-input
                  v-model="systemSet.otherSetObj.inverterActivePowerSettingVal"
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">%</template>
                </el-input>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'otherSetObj',
                      'inverterActivePowerSetting'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'inverterActivePowerSetting',
                      systemSet.otherSetObj.inverterActivePowerSettingVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.communicationProtocolType485')"
              v-if="
                systemSetIsDisplay(
                  'otherSetObj',
                  'communicationProtocolType485'
                )
              "
            >
              <div style="display: flex">
                <el-select
                  v-model="
                    systemSet.otherSetObj.communicationProtocolType485Val
                  "
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option :label="$t('deviceManage.user')" value="0" />
                  <el-option :label="$t('deviceManage.engineer')" value="1" />
                </el-select>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'otherSetObj',
                      'communicationProtocolType485'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'communicationProtocolType485',
                      systemSet.otherSetObj.communicationProtocolType485Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.communicationAddress485')"
              v-if="
                systemSetIsDisplay('otherSetObj', 'communicationAddress485')
              "
            >
              <div style="display: flex">
                <el-input
                  v-model="systemSet.otherSetObj.communicationAddress485Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'otherSetObj',
                      'communicationAddress485'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'communicationAddress485',
                      systemSet.otherSetObj.communicationAddress485Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.communicationBaudRate485')"
              v-if="systemSetIsDisplay('otherSetObj', 'communicationBaud485')"
            >
              <div style="display: flex">
                <el-select
                  v-model="systemSet.otherSetObj.communicationBaud485Val"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option label="1200" value="1" />
                  <el-option label="2400" value="2" />
                  <el-option label="4800" value="3" />
                  <el-option label="9600" value="4" />
                </el-select>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay('otherSetObj', 'communicationBaud485')
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'communicationBaud485',
                      systemSet.otherSetObj.communicationBaud485Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.hardLimitEnable')"
              v-if="systemSetIsDisplay('otherSetObj', 'hardLimitEnable')"
            >
              <div style="display: flex">
                <el-select
                  v-model="systemSet.otherSetObj.hardLimitEnableVal"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option :label="$t('deviceManage.enable')" value="1" />
                  <el-option :label="$t('deviceManage.shield')" value="0" />
                </el-select>
                <el-button
                  v-if="systemSetBtnIsDisplay('otherSetObj', 'hardLimitEnable')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'hardLimitEnable',
                      systemSet.otherSetObj.hardLimitEnableVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.hardLimitPower')"
              v-if="
                systemSetIsDisplay('otherSetObj', 'hardLimitPowerSettingValue')
              "
            >
              <div style="display: flex">
                <el-input
                  v-model="systemSet.otherSetObj.hardLimitPowerSettingValueVal"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'otherSetObj',
                      'hardLimitPowerSettingValue'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'hardLimitPowerSettingValue',
                      systemSet.otherSetObj.hardLimitPowerSettingValueVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.australianRegionSelection')"
              v-if="
                systemSetIsDisplay(
                  'otherSetObj',
                  'australianRegionSelection'
                ) && systemSet.otherSetObj.countryCodeVal == '3'
              "
            >
              <div style="display: flex">
                <el-select
                  v-model="systemSet.otherSetObj.australianRegionSelectionVal"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option
                    :label="$t('deviceManage.AustraliaZoneA')"
                    value="0"
                  />
                  <el-option
                    :label="$t('deviceManage.AustralianZoneB')"
                    value="1"
                  />
                  <el-option
                    :label="$t('deviceManage.AustralianZoneC')"
                    value="2"
                  />
                  <el-option :label="$t('deviceManage.NewZealand')" value="3" />
                </el-select>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'otherSetObj',
                      'australianRegionSelection'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'australianRegionSelection',
                      systemSet.otherSetObj.australianRegionSelectionVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.bluetoothConnectionFlag')"
              v-if="
                systemSetIsDisplay('otherSetObj', 'bluetoothConnectionFlag')
              "
            >
              <div style="display: flex">
                <el-input
                  v-model="systemSet.otherSetObj.bluetoothConnectionFlagVal"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'otherSetObj',
                      'bluetoothConnectionFlag'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'bluetoothConnectionFlag',
                      systemSet.otherSetObj.bluetoothConnectionFlagVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.PVActivePowerSetting')"
              v-if="systemSetIsDisplay('otherSetObj', 'pvActivePowerSetting')"
            >
              <div style="display: flex">
                <el-input
                  v-model="systemSet.otherSetObj.pvActivePowerSettingVal"
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">%</template>
                </el-input>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay('otherSetObj', 'pvActivePowerSetting')
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'pvActivePowerSetting',
                      systemSet.otherSetObj.pvActivePowerSettingVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.limitChangeRate')"
              v-if="
                systemSetIsDisplay(
                  'otherSetObj',
                  'limitOfActivePowerChangeRate'
                )
              "
            >
              <div style="display: flex">
                <el-input
                  v-model="
                    systemSet.otherSetObj.limitOfActivePowerChangeRateVal
                  "
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'otherSetObj',
                      'limitOfActivePowerChangeRate'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'limitOfActivePowerChangeRate',
                      systemSet.otherSetObj.limitOfActivePowerChangeRateVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.islandDetectionEnable')"
              v-if="systemSetIsDisplay('otherSetObj', 'islandDetectionEnable')"
            >
              <div style="display: flex">
                <el-select
                  v-model="systemSet.otherSetObj.islandDetectionEnableVal"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option :label="$t('deviceManage.notEnable')" value="0" />
                  <el-option :label="$t('deviceManage.enable')" value="1" />
                </el-select>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'otherSetObj',
                      'islandDetectionEnable'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'islandDetectionEnable',
                      systemSet.otherSetObj.islandDetectionEnableVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.authenticationMode')"
              v-if="systemSetIsDisplay('otherSetObj', 'authenticationMode')"
            >
              <div style="display: flex">
                <el-select
                  v-model="systemSet.otherSetObj.authenticationModeVal"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option :label="$t('menuManage.close')" value="0" />
                  <el-option :label="$t('menuManage.open')" value="1" />
                </el-select>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay('otherSetObj', 'authenticationMode')
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'authenticationMode',
                      systemSet.otherSetObj.authenticationModeVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.controlSource')"
              v-if="
                systemSetIsDisplay(
                  'otherSetObj',
                  'currentSystemOperationModeControlSource'
                )
              "
            >
              <div style="display: flex">
                <el-select
                  v-model="
                    systemSet.otherSetObj
                      .currentSystemOperationModeControlSourceVal
                  "
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option
                    :label="$t('deviceManage.MCUIssuedControl')"
                    value="0"
                  />
                  <el-option
                    :label="$t('deviceManage.DSPIssuedControl')"
                    value="1"
                  />
                </el-select>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'otherSetObj',
                      'currentSystemOperationModeControlSource'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'currentSystemOperationModeControlSource',
                      systemSet.otherSetObj
                        .currentSystemOperationModeControlSourceVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.modeSystem')"
              v-if="
                systemSetIsDisplay(
                  'otherSetObj',
                  'currentOperatingModeOfTheSystem'
                )
              "
            >
              <div style="display: flex">
                <el-select
                  v-model="
                    systemSet.otherSetObj.currentOperatingModeOfTheSystemVal
                  "
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option
                    :label="$t('deviceManage.batteryPriorityMode')"
                    value="0"
                  />
                  <el-option
                    :label="$t('deviceManage.homeLoadPriorityMode')"
                    value="1"
                  />
                  <el-option
                    :label="$t('deviceManage.gridPriorityMode')"
                    value="2"
                  />
                  <el-option
                    :label="$t('deviceManage.fullPowerFeedMode')"
                    value="3"
                  />
                  <el-option
                    :label="$t('deviceManage.emergencyBackupMode')"
                    value="4"
                  />
                  <el-option
                    :label="$t('deviceManage.acBackupMode')"
                    value="5"
                  />
                  <el-option :label="$t('deviceManage.purePVMode')" value="6" />
                  <el-option
                    :label="$t('deviceManage.forcedOffGridMode')"
                    value="7"
                  />
                </el-select>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'otherSetObj',
                      'currentOperatingModeOfTheSystem'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'currentOperatingModeOfTheSystem',
                      systemSet.otherSetObj.currentOperatingModeOfTheSystemVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.APPStartupFlag')"
              v-if="systemSetIsDisplay('otherSetObj', 'appStartupFlag')"
            >
              <div style="display: flex">
                <el-input
                  v-model="systemSet.otherSetObj.appStartupFlagVal"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="systemSetBtnIsDisplay('otherSetObj', 'appStartupFlag')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'appStartupFlag',
                      systemSet.otherSetObj.appStartupFlagVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.buzzerResponseTime')"
              v-if="systemSetIsDisplay('otherSetObj', 'buzzerResponseTime')"
            >
              <div style="display: flex">
                <el-input
                  v-model="systemSet.otherSetObj.buzzerResponseTimeVal"
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">min</template>
                </el-input>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay('otherSetObj', 'buzzerResponseTime')
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'buzzerResponseTime',
                      systemSet.otherSetObj.buzzerResponseTimeVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.communicationType')"
              v-if="systemSetIsDisplay('otherSetObj', 'communicationType')"
            >
              <div style="display: flex">
                <el-select
                  v-model="systemSet.otherSetObj.communicationTypeVal"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option :label="$t('deviceManage.powerGrid')" value="0" />
                  <el-option :label="$t('deviceManage.alternator')" value="1" />
                </el-select>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay('otherSetObj', 'communicationType')
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'communicationType',
                      systemSet.otherSetObj.communicationTypeVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.systemModeSettings')"
              v-if="systemSetIsDisplay('otherSetObj', 'systemModeSettings')"
            >
              <div style="display: flex">
                <el-select
                  v-model="systemSet.otherSetObj.systemModeSettingsVal"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option label="UPS" value="0" />
                  <el-option label="EPS" value="1" />
                </el-select>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay('otherSetObj', 'systemModeSettings')
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'systemModeSettings',
                      systemSet.otherSetObj.systemModeSettingsVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.USBOperation')"
              v-if="systemSetIsDisplay('otherSetObj', 'usbOperation')"
            >
              <div style="display: flex">
                <el-select
                  v-model="systemSet.otherSetObj.usbOperationVal"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option :label="$t('deviceManage.nothing')" value="0" />
                  <el-option
                    :label="$t('deviceManage.exportHistory')"
                    value="1"
                  />
                  <el-option
                    :label="$t('deviceManage.exportConfigurationParameters')"
                    value="2"
                  />
                  <el-option
                    :label="$t('deviceManage.importConfigurationParameters')"
                    value="3"
                  />
                  <el-option
                    :label="$t('deviceManage.masterUpgrade')"
                    value="4"
                  />
                  <el-option
                    :label="$t('deviceManage.monitoringUpgrade')"
                    value="5"
                  />
                  <el-option
                    :label="$t('deviceManage.batteryUpgrade')"
                    value="6"
                  />
                </el-select>
                <el-button
                  v-if="systemSetBtnIsDisplay('otherSetObj', 'usbOperation')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'usbOperation',
                      systemSet.otherSetObj.usbOperationVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.powerFactor')"
              v-if="systemSetIsDisplay('otherSetObj', 'powerFactor')"
            >
              <div style="display: flex">
                <el-input
                  v-model="systemSet.otherSetObj.powerFactorVal"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="systemSetBtnIsDisplay('otherSetObj', 'powerFactor')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'powerFactor',
                      systemSet.otherSetObj.powerFactorVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.antiBackflowPowerPercentage')"
              v-if="
                systemSetIsDisplay('otherSetObj', 'antiBackflowPowerPercentage')
              "
            >
              <div style="display: flex">
                <el-input
                  v-model="systemSet.otherSetObj.antiBackflowPowerPercentageVal"
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">%</template>
                </el-input>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'otherSetObj',
                      'antiBackflowPowerPercentage'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'antiBackflowPowerPercentage',
                      systemSet.otherSetObj.antiBackflowPowerPercentageVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.maximumOutputPowerPercentage')"
              v-if="
                systemSetIsDisplay(
                  'otherSetObj',
                  'maximumOutputPowerPercentage'
                )
              "
            >
              <div style="display: flex">
                <el-input
                  v-model="
                    systemSet.otherSetObj.maximumOutputPowerPercentageVal
                  "
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">%</template>
                </el-input>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'otherSetObj',
                      'maximumOutputPowerPercentage'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'maximumOutputPowerPercentage',
                      systemSet.otherSetObj.maximumOutputPowerPercentageVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.powerSettingAdjustmentRate')"
              v-if="
                systemSetIsDisplay('otherSetObj', 'powerSettingAdjustmentRate')
              "
            >
              <div style="display: flex">
                <el-input
                  v-model="systemSet.otherSetObj.powerSettingAdjustmentRateVal"
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">%Wmax/Min</template>
                </el-input>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'otherSetObj',
                      'powerSettingAdjustmentRate'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'powerSettingAdjustmentRate',
                      systemSet.otherSetObj.powerSettingAdjustmentRateVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.softStartRate')"
              v-if="
                systemSetIsDisplay(
                  'otherSetObj',
                  'gridConnectedPowerSoftStartRate'
                )
              "
            >
              <div style="display: flex">
                <el-input
                  v-model="
                    systemSet.otherSetObj.gridConnectedPowerSoftStartRateVal
                  "
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">%Wmax/Min</template>
                </el-input>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'otherSetObj',
                      'gridConnectedPowerSoftStartRate'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'gridConnectedPowerSoftStartRate',
                      systemSet.otherSetObj.gridConnectedPowerSoftStartRateVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.reactivePowerControlMode')"
              v-if="
                systemSetIsDisplay('otherSetObj', 'reactivePowerControlMode')
              "
            >
              <div style="display: flex">
                <el-select
                  v-model="systemSet.otherSetObj.reactivePowerControlModeVal"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option
                    :label="$t('deviceManage.zeroReactivePower')"
                    value="0"
                  />
                  <el-option
                    :label="$t('deviceManage.voltVarMode')"
                    value="1"
                  />
                  <el-option
                    :label="$t('deviceManage.fixedFactorMode')"
                    value="2"
                  />
                  <el-option
                    :label="$t('deviceManage.fixedReactiveMode')"
                    value="3"
                  />
                  <el-option :label="$t('deviceManage.cosMode')" value="4" />
                </el-select>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'otherSetObj',
                      'reactivePowerControlMode'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'reactivePowerControlMode',
                      systemSet.otherSetObj.reactivePowerControlModeVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.reactivePowerRegulationRate')"
              v-if="
                systemSetIsDisplay('otherSetObj', 'reactivePowerRegulationRate')
              "
            >
              <div style="display: flex">
                <el-input
                  v-model="systemSet.otherSetObj.reactivePowerRegulationRateVal"
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">%VAmax/s</template>
                </el-input>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'otherSetObj',
                      'reactivePowerRegulationRate'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'reactivePowerRegulationRate',
                      systemSet.otherSetObj.reactivePowerRegulationRateVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.upperLimitValueOfVoltage1')"
              v-if="
                systemSetIsDisplay(
                  'otherSetObj',
                  'upperLimitValueOfGridVoltageProtection1'
                )
              "
            >
              <div style="display: flex">
                <el-input
                  v-model="
                    systemSet.otherSetObj
                      .upperLimitValueOfGridVoltageProtection1Val
                  "
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">V</template>
                </el-input>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'otherSetObj',
                      'upperLimitValueOfGridVoltageProtection1'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'upperLimitValueOfGridVoltageProtection1',
                      systemSet.otherSetObj
                        .upperLimitValueOfGridVoltageProtection1Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.upperLimitValueOfVoltage2')"
              v-if="
                systemSetIsDisplay(
                  'otherSetObj',
                  'upperLimitValueOfGridVoltageProtection2'
                )
              "
            >
              <div style="display: flex">
                <el-input
                  v-model="
                    systemSet.otherSetObj
                      .upperLimitValueOfGridVoltageProtection2Val
                  "
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">V</template>
                </el-input>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'otherSetObj',
                      'upperLimitValueOfGridVoltageProtection2'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'upperLimitValueOfGridVoltageProtection2',
                      systemSet.otherSetObj
                        .upperLimitValueOfGridVoltageProtection2Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.upperLimitValueOfVoltage3')"
              v-if="
                systemSetIsDisplay(
                  'otherSetObj',
                  'upperLimitValueOfGridVoltageProtection3'
                )
              "
            >
              <div style="display: flex">
                <el-input
                  v-model="
                    systemSet.otherSetObj
                      .upperLimitValueOfGridVoltageProtection3Val
                  "
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">V</template>
                </el-input>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'otherSetObj',
                      'upperLimitValueOfGridVoltageProtection3'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'upperLimitValueOfGridVoltageProtection3',
                      systemSet.otherSetObj
                        .upperLimitValueOfGridVoltageProtection3Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.lowerLimitValueOfProtection1')"
              v-if="
                systemSetIsDisplay(
                  'otherSetObj',
                  'lowerLimitValueOfGridVoltageProtection1'
                )
              "
            >
              <div style="display: flex">
                <el-input
                  v-model="
                    systemSet.otherSetObj
                      .lowerLimitValueOfGridVoltageProtection1Val
                  "
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">V</template>
                </el-input>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'otherSetObj',
                      'lowerLimitValueOfGridVoltageProtection1'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'lowerLimitValueOfGridVoltageProtection1',
                      systemSet.otherSetObj
                        .lowerLimitValueOfGridVoltageProtection1Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.lowerLimitValueOfProtection2')"
              v-if="
                systemSetIsDisplay(
                  'otherSetObj',
                  'lowerLimitValueOfGridVoltageProtection2'
                )
              "
            >
              <div style="display: flex">
                <el-input
                  v-model="
                    systemSet.otherSetObj
                      .lowerLimitValueOfGridVoltageProtection2Val
                  "
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">V</template>
                </el-input>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'otherSetObj',
                      'lowerLimitValueOfGridVoltageProtection2'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'lowerLimitValueOfGridVoltageProtection2',
                      systemSet.otherSetObj
                        .lowerLimitValueOfGridVoltageProtection2Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.lowerLimitValueOfProtection3')"
              v-if="
                systemSetIsDisplay(
                  'otherSetObj',
                  'lowerLimitValueOfGridVoltageProtection3'
                )
              "
            >
              <div style="display: flex">
                <el-input
                  v-model="
                    systemSet.otherSetObj
                      .lowerLimitValueOfGridVoltageProtection3Val
                  "
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">V</template>
                </el-input>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'otherSetObj',
                      'lowerLimitValueOfGridVoltageProtection3'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'lowerLimitValueOfGridVoltageProtection3',
                      systemSet.otherSetObj
                        .lowerLimitValueOfGridVoltageProtection3Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.upperLimitValueVoltage')"
              v-if="
                systemSetIsDisplay(
                  'otherSetObj',
                  'upperLimitValueOfGridVoltageReconnection'
                )
              "
            >
              <div style="display: flex">
                <el-input
                  v-model="
                    systemSet.otherSetObj
                      .upperLimitValueOfGridVoltageReconnectionVal
                  "
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">V</template>
                </el-input>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'otherSetObj',
                      'upperLimitValueOfGridVoltageReconnection'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'upperLimitValueOfGridVoltageReconnection',
                      systemSet.otherSetObj
                        .upperLimitValueOfGridVoltageReconnectionVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.lowerLimitValueVoltage')"
              v-if="
                systemSetIsDisplay(
                  'otherSetObj',
                  'lowerLimitValueOfGridVoltageReconnection'
                )
              "
            >
              <div style="display: flex">
                <el-input
                  v-model="
                    systemSet.otherSetObj
                      .lowerLimitValueOfGridVoltageReconnectionVal
                  "
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">V</template>
                </el-input>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'otherSetObj',
                      'lowerLimitValueOfGridVoltageReconnection'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'lowerLimitValueOfGridVoltageReconnection',
                      systemSet.otherSetObj
                        .lowerLimitValueOfGridVoltageReconnectionVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.voltageUpperLimitTime1')"
              v-if="
                systemSetIsDisplay(
                  'otherSetObj',
                  'upperLimitTimeOfGridVoltageProtection1'
                )
              "
            >
              <div style="display: flex">
                <el-input
                  v-model="
                    systemSet.otherSetObj
                      .upperLimitTimeOfGridVoltageProtection1Val
                  "
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">ms</template>
                </el-input>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'otherSetObj',
                      'upperLimitTimeOfGridVoltageProtection1'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'upperLimitTimeOfGridVoltageProtection1',
                      systemSet.otherSetObj
                        .upperLimitTimeOfGridVoltageProtection1Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.voltageUpperLimitTime2')"
              v-if="
                systemSetIsDisplay(
                  'otherSetObj',
                  'upperLimitTimeOfGridVoltageProtection2'
                )
              "
            >
              <div style="display: flex">
                <el-input
                  v-model="
                    systemSet.otherSetObj
                      .upperLimitTimeOfGridVoltageProtection2Val
                  "
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">ms</template>
                </el-input>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'otherSetObj',
                      'upperLimitTimeOfGridVoltageProtection2'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'upperLimitTimeOfGridVoltageProtection2',
                      systemSet.otherSetObj
                        .upperLimitTimeOfGridVoltageProtection2Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.voltageUpperLimitTime3')"
              v-if="
                systemSetIsDisplay(
                  'otherSetObj',
                  'upperLimitTimeOfGridVoltageProtection3'
                )
              "
            >
              <div style="display: flex">
                <el-input
                  v-model="
                    systemSet.otherSetObj
                      .upperLimitTimeOfGridVoltageProtection3Val
                  "
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">ms</template>
                </el-input>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'otherSetObj',
                      'upperLimitTimeOfGridVoltageProtection3'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'upperLimitTimeOfGridVoltageProtection3',
                      systemSet.otherSetObj
                        .upperLimitTimeOfGridVoltageProtection3Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.voltageLowerLimitTime1')"
              v-if="
                systemSetIsDisplay(
                  'otherSetObj',
                  'lowerLimitTimeOfGridVoltageProtection1'
                )
              "
            >
              <div style="display: flex">
                <el-input
                  v-model="
                    systemSet.otherSetObj
                      .lowerLimitTimeOfGridVoltageProtection1Val
                  "
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">ms</template>
                </el-input>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'otherSetObj',
                      'lowerLimitTimeOfGridVoltageProtection1'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'lowerLimitTimeOfGridVoltageProtection1',
                      systemSet.otherSetObj
                        .lowerLimitTimeOfGridVoltageProtection1Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.voltageLowerLimitTime2')"
              v-if="
                systemSetIsDisplay(
                  'otherSetObj',
                  'lowerLimitTimeOfGridVoltageProtection2'
                )
              "
            >
              <div style="display: flex">
                <el-input
                  v-model="
                    systemSet.otherSetObj
                      .lowerLimitTimeOfGridVoltageProtection2Val
                  "
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">ms</template>
                </el-input>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'otherSetObj',
                      'lowerLimitTimeOfGridVoltageProtection2'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'lowerLimitTimeOfGridVoltageProtection2',
                      systemSet.otherSetObj
                        .lowerLimitTimeOfGridVoltageProtection2Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.voltageLowerLimitTime3')"
              v-if="
                systemSetIsDisplay(
                  'otherSetObj',
                  'lowerLimitTimeOfGridVoltageProtection3'
                )
              "
            >
              <div style="display: flex">
                <el-input
                  v-model="
                    systemSet.otherSetObj
                      .lowerLimitTimeOfGridVoltageProtection3Val
                  "
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">ms</template>
                </el-input>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'otherSetObj',
                      'lowerLimitTimeOfGridVoltageProtection3'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'lowerLimitTimeOfGridVoltageProtection3',
                      systemSet.otherSetObj
                        .lowerLimitTimeOfGridVoltageProtection3Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.recoveryTimeVoltageProtection')"
              v-if="
                systemSetIsDisplay(
                  'otherSetObj',
                  'recoveryTimeOfGridVoltageProtection'
                )
              "
            >
              <div style="display: flex">
                <el-input
                  v-model="
                    systemSet.otherSetObj.recoveryTimeOfGridVoltageProtectionVal
                  "
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">ms</template>
                </el-input>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'otherSetObj',
                      'recoveryTimeOfGridVoltageProtection'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'recoveryTimeOfGridVoltageProtection',
                      systemSet.otherSetObj
                        .recoveryTimeOfGridVoltageProtectionVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.upperLimitValue1')"
              v-if="
                systemSetIsDisplay(
                  'otherSetObj',
                  'upperLimitValueOfGridFrequencyProtection1'
                )
              "
            >
              <div style="display: flex">
                <el-input
                  v-model="
                    systemSet.otherSetObj
                      .upperLimitValueOfGridFrequencyProtection1Val
                  "
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">Hz</template>
                </el-input>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'otherSetObj',
                      'upperLimitValueOfGridFrequencyProtection1'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'upperLimitValueOfGridFrequencyProtection1',
                      systemSet.otherSetObj
                        .upperLimitValueOfGridFrequencyProtection1Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.upperLimitValue2')"
              v-if="
                systemSetIsDisplay(
                  'otherSetObj',
                  'upperLimitValueOfGridFrequencyProtection2'
                )
              "
            >
              <div style="display: flex">
                <el-input
                  v-model="
                    systemSet.otherSetObj
                      .upperLimitValueOfGridFrequencyProtection2Val
                  "
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">Hz</template>
                </el-input>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'otherSetObj',
                      'upperLimitValueOfGridFrequencyProtection2'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'upperLimitValueOfGridFrequencyProtection2',
                      systemSet.otherSetObj
                        .upperLimitValueOfGridFrequencyProtection2Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.upperLimitValue3')"
              v-if="
                systemSetIsDisplay(
                  'otherSetObj',
                  'upperLimitValueOfGridFrequencyProtection3'
                )
              "
            >
              <div style="display: flex">
                <el-input
                  v-model="
                    systemSet.otherSetObj
                      .upperLimitValueOfGridFrequencyProtection3Val
                  "
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">Hz</template>
                </el-input>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'otherSetObj',
                      'upperLimitValueOfGridFrequencyProtection3'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'upperLimitValueOfGridFrequencyProtection3',
                      systemSet.otherSetObj
                        .upperLimitValueOfGridFrequencyProtection3Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.lowerLimitValue1')"
              v-if="
                systemSetIsDisplay(
                  'otherSetObj',
                  'lowerLimitValueOfGridFrequencyProtection1'
                )
              "
            >
              <div style="display: flex">
                <el-input
                  v-model="
                    systemSet.otherSetObj
                      .lowerLimitValueOfGridFrequencyProtection1Val
                  "
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">Hz</template>
                </el-input>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'otherSetObj',
                      'lowerLimitValueOfGridFrequencyProtection1'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'lowerLimitValueOfGridFrequencyProtection1',
                      systemSet.otherSetObj
                        .lowerLimitValueOfGridFrequencyProtection1Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.lowerLimitValue2')"
              v-if="
                systemSetIsDisplay(
                  'otherSetObj',
                  'lowerLimitValueOfGridFrequencyProtection2'
                )
              "
            >
              <div style="display: flex">
                <el-input
                  v-model="
                    systemSet.otherSetObj
                      .lowerLimitValueOfGridFrequencyProtection2Val
                  "
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">Hz</template>
                </el-input>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'otherSetObj',
                      'lowerLimitValueOfGridFrequencyProtection2'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'lowerLimitValueOfGridFrequencyProtection2',
                      systemSet.otherSetObj
                        .lowerLimitValueOfGridFrequencyProtection2Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.lowerLimitValue3')"
              v-if="
                systemSetIsDisplay(
                  'otherSetObj',
                  'lowerLimitValueOfGridFrequencyProtection3'
                )
              "
            >
              <div style="display: flex">
                <el-input
                  v-model="
                    systemSet.otherSetObj
                      .lowerLimitValueOfGridFrequencyProtection3Val
                  "
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">Hz</template>
                </el-input>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'otherSetObj',
                      'lowerLimitValueOfGridFrequencyProtection3'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'lowerLimitValueOfGridFrequencyProtection3',
                      systemSet.otherSetObj
                        .lowerLimitValueOfGridFrequencyProtection3Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.upperLimitValueFrequency')"
              v-if="
                systemSetIsDisplay(
                  'otherSetObj',
                  'upperLimitValueOfGridFrequencyReconnection'
                )
              "
            >
              <div style="display: flex">
                <el-input
                  v-model="
                    systemSet.otherSetObj
                      .upperLimitValueOfGridFrequencyReconnectionVal
                  "
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">Hz</template>
                </el-input>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'otherSetObj',
                      'upperLimitValueOfGridFrequencyReconnection'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'upperLimitValueOfGridFrequencyReconnection',
                      systemSet.otherSetObj
                        .upperLimitValueOfGridFrequencyReconnectionVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.lowerLimitOfGridFrequency')"
              v-if="
                systemSetIsDisplay(
                  'otherSetObj',
                  'lowerLimitValueOfGridFrequencyReconnection'
                )
              "
            >
              <div style="display: flex">
                <el-input
                  v-model="
                    systemSet.otherSetObj
                      .lowerLimitValueOfGridFrequencyReconnectionVal
                  "
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">Hz</template>
                </el-input>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'otherSetObj',
                      'lowerLimitValueOfGridFrequencyReconnection'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'lowerLimitValueOfGridFrequencyReconnection',
                      systemSet.otherSetObj
                        .lowerLimitValueOfGridFrequencyReconnectionVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.upperLimitTime1')"
              v-if="
                systemSetIsDisplay(
                  'otherSetObj',
                  'gridFrequencyProtectionUpperLimitTime1'
                )
              "
            >
              <div style="display: flex">
                <el-input
                  v-model="
                    systemSet.otherSetObj
                      .gridFrequencyProtectionUpperLimitTime1Val
                  "
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">ms</template>
                </el-input>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'otherSetObj',
                      'gridFrequencyProtectionUpperLimitTime1'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'gridFrequencyProtectionUpperLimitTime1',
                      systemSet.otherSetObj
                        .gridFrequencyProtectionUpperLimitTime1Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.upperLimitTime2')"
              v-if="
                systemSetIsDisplay(
                  'otherSetObj',
                  'gridFrequencyProtectionUpperLimitTime2'
                )
              "
            >
              <div style="display: flex">
                <el-input
                  v-model="
                    systemSet.otherSetObj
                      .gridFrequencyProtectionUpperLimitTime2Val
                  "
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">ms</template>
                </el-input>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'otherSetObj',
                      'gridFrequencyProtectionUpperLimitTime2'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'gridFrequencyProtectionUpperLimitTime2',
                      systemSet.otherSetObj
                        .gridFrequencyProtectionUpperLimitTime2Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.upperLimitTime3')"
              v-if="
                systemSetIsDisplay(
                  'otherSetObj',
                  'gridFrequencyProtectionUpperLimitTime3'
                )
              "
            >
              <div style="display: flex">
                <el-input
                  v-model="
                    systemSet.otherSetObj
                      .gridFrequencyProtectionUpperLimitTime3Val
                  "
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">ms</template>
                </el-input>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'otherSetObj',
                      'gridFrequencyProtectionUpperLimitTime3'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'gridFrequencyProtectionUpperLimitTime3',
                      systemSet.otherSetObj
                        .gridFrequencyProtectionUpperLimitTime3Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.lowerLimitTime1')"
              v-if="
                systemSetIsDisplay(
                  'otherSetObj',
                  'gridFrequencyProtectionLowerLimitTime1'
                )
              "
            >
              <div style="display: flex">
                <el-input
                  v-model="
                    systemSet.otherSetObj
                      .gridFrequencyProtectionLowerLimitTime1Val
                  "
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">ms</template>
                </el-input>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'otherSetObj',
                      'gridFrequencyProtectionLowerLimitTime1'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'gridFrequencyProtectionLowerLimitTime1',
                      systemSet.otherSetObj
                        .gridFrequencyProtectionLowerLimitTime1Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.lowerLimitTime2')"
              v-if="
                systemSetIsDisplay(
                  'otherSetObj',
                  'gridFrequencyProtectionLowerLimitTime2'
                )
              "
            >
              <div style="display: flex">
                <el-input
                  v-model="
                    systemSet.otherSetObj
                      .gridFrequencyProtectionLowerLimitTime2Val
                  "
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">ms</template>
                </el-input>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'otherSetObj',
                      'gridFrequencyProtectionLowerLimitTime2'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'gridFrequencyProtectionLowerLimitTime2',
                      systemSet.otherSetObj
                        .gridFrequencyProtectionLowerLimitTime2Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.lowerLimitTime3')"
              v-if="
                systemSetIsDisplay(
                  'otherSetObj',
                  'gridFrequencyProtectionLowerLimitTime3'
                )
              "
            >
              <div style="display: flex">
                <el-input
                  v-model="
                    systemSet.otherSetObj
                      .gridFrequencyProtectionLowerLimitTime3Val
                  "
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">ms</template>
                </el-input>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'otherSetObj',
                      'gridFrequencyProtectionLowerLimitTime3'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'gridFrequencyProtectionLowerLimitTime3',
                      systemSet.otherSetObj
                        .gridFrequencyProtectionLowerLimitTime3Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.recoveryTimeOfGrid')"
              v-if="
                systemSetIsDisplay(
                  'otherSetObj',
                  'recoveryTimeOfGridFrequencyProtection'
                )
              "
            >
              <div style="display: flex">
                <el-input
                  v-model="
                    systemSet.otherSetObj
                      .recoveryTimeOfGridFrequencyProtectionVal
                  "
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">ms</template>
                </el-input>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'otherSetObj',
                      'recoveryTimeOfGridFrequencyProtection'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'recoveryTimeOfGridFrequencyProtection',
                      systemSet.otherSetObj
                        .recoveryTimeOfGridFrequencyProtectionVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.minOvervoltage10')"
              v-if="
                systemSetIsDisplay(
                  'otherSetObj',
                  'tenMinOvervoltageProtectionValueOfThePowerGrid'
                )
              "
            >
              <div style="display: flex">
                <el-input
                  v-model="
                    systemSet.otherSetObj
                      .tenMinOvervoltageProtectionValueOfThePowerGridVal
                  "
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">V</template>
                </el-input>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'otherSetObj',
                      'tenMinOvervoltageProtectionValueOfThePowerGrid'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'tenMinOvervoltageProtectionValueOfThePowerGrid',
                      systemSet.otherSetObj
                        .tenMinOvervoltageProtectionValueOfThePowerGridVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.networkingWaitingTime')"
              v-if="systemSetIsDisplay('otherSetObj', 'networkingWaitingTime')"
            >
              <div style="display: flex">
                <el-input
                  v-model="systemSet.otherSetObj.networkingWaitingTimeVal"
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">s</template>
                </el-input>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'otherSetObj',
                      'networkingWaitingTime'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'networkingWaitingTime',
                      systemSet.otherSetObj.networkingWaitingTimeVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.reconnectWaitingTime')"
              v-if="systemSetIsDisplay('otherSetObj', 'reconnectWaitingTime')"
            >
              <div style="display: flex">
                <el-input
                  v-model="systemSet.otherSetObj.reconnectWaitingTimeVal"
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">s</template>
                </el-input>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay('otherSetObj', 'reconnectWaitingTime')
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'reconnectWaitingTime',
                      systemSet.otherSetObj.reconnectWaitingTimeVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.coldMode')"
              v-if="systemSetIsDisplay('otherSetObj', 'coldMode')"
            >
              <div style="display: flex">
                <el-select
                  v-model="systemSet.otherSetObj.coldModeVal"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option :label="$t('menuManage.close')" value="0" />
                  <el-option :label="$t('menuManage.open')" value="1" />
                </el-select>
                <el-button
                  v-if="systemSetBtnIsDisplay('otherSetObj', 'coldMode')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave('coldMode', systemSet.otherSetObj.coldModeVal)
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.reactivePowerPercentage')"
              v-if="
                systemSetIsDisplay('otherSetObj', 'reactivePowerPercentage')
              "
            >
              <div style="display: flex">
                <el-input
                  v-model="systemSet.otherSetObj.reactivePowerPercentageVal"
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">%</template>
                </el-input>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'otherSetObj',
                      'reactivePowerPercentage'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'reactivePowerPercentage',
                      systemSet.otherSetObj.reactivePowerPercentageVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.freqWatt')"
              v-if="systemSetIsDisplay('otherSetObj', 'freqWattCurveEnable')"
            >
              <div style="display: flex">
                <el-select
                  v-model="systemSet.otherSetObj.freqWattCurveEnableVal"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option :label="$t('deviceManage.notEnable')" value="0" />
                  <el-option :label="$t('deviceManage.enable')" value="1" />
                </el-select>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay('otherSetObj', 'freqWattCurveEnable')
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'freqWattCurveEnable',
                      systemSet.otherSetObj.freqWattCurveEnableVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.voltWatt')"
              v-if="systemSetIsDisplay('otherSetObj', 'voltWattCurveEnable')"
            >
              <div style="display: flex">
                <el-select
                  v-model="systemSet.otherSetObj.voltWattCurveEnableVal"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option :label="$t('deviceManage.notEnable')" value="0" />
                  <el-option :label="$t('deviceManage.enable')" value="1" />
                </el-select>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay('otherSetObj', 'voltWattCurveEnable')
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'voltWattCurveEnable',
                      systemSet.otherSetObj.voltWattCurveEnableVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.voltVar')"
              v-if="systemSetIsDisplay('otherSetObj', 'voltVarCurveEnable')"
            >
              <div style="display: flex">
                <el-select
                  v-model="systemSet.otherSetObj.voltVarCurveEnableVal"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option :label="$t('deviceManage.notEnable')" value="0" />
                  <el-option :label="$t('deviceManage.enable')" value="1" />
                </el-select>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay('otherSetObj', 'voltVarCurveEnable')
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'voltVarCurveEnable',
                      systemSet.otherSetObj.voltVarCurveEnableVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.pFWatt')"
              v-if="systemSetIsDisplay('otherSetObj', 'pfWattCurveEnable')"
            >
              <div style="display: flex">
                <el-select
                  v-model="systemSet.otherSetObj.pfWattCurveEnableVal"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option :label="$t('deviceManage.notEnable')" value="0" />
                  <el-option :label="$t('deviceManage.enable')" value="1" />
                </el-select>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay('otherSetObj', 'pfWattCurveEnable')
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'pfWattCurveEnable',
                      systemSet.otherSetObj.pfWattCurveEnableVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.timingModeType')"
              v-if="systemSetIsDisplay('otherSetObj', 'timingModeType')"
            >
              <div style="display: flex">
                <el-select
                  v-model="systemSet.otherSetObj.timingModeTypeVal"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option :label="$t('deviceManage.setByDate')" value="0" />
                  <el-option :label="$t('deviceManage.setByTime')" value="1" />
                  <el-option
                    :label="$t('deviceManage.realTimeSwitchingOfMode')"
                    value="2"
                  />
                </el-select>
                <el-button
                  v-if="systemSetBtnIsDisplay('otherSetObj', 'timingModeType')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'timingModeType',
                      systemSet.otherSetObj.timingModeTypeVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.changeRegister1')"
              v-if="
                systemSetIsDisplay('otherSetObj', 'setQuantityChangeRegister1')
              "
            >
              <div style="display: flex">
                <el-input
                  v-model="systemSet.otherSetObj.setQuantityChangeRegister1Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'otherSetObj',
                      'setQuantityChangeRegister1'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'setQuantityChangeRegister1',
                      systemSet.otherSetObj.setQuantityChangeRegister1Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.changeRegister2')"
              v-if="
                systemSetIsDisplay('otherSetObj', 'setQuantityChangeRegister2')
              "
            >
              <div style="display: flex">
                <el-input
                  v-model="systemSet.otherSetObj.setQuantityChangeRegister2Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'otherSetObj',
                      'setQuantityChangeRegister2'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'setQuantityChangeRegister2',
                      systemSet.otherSetObj.setQuantityChangeRegister2Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.changeRegister3')"
              v-if="
                systemSetIsDisplay('otherSetObj', 'setQuantityChangeRegister3')
              "
            >
              <div style="display: flex">
                <el-input
                  v-model="systemSet.otherSetObj.setQuantityChangeRegister3Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'otherSetObj',
                      'setQuantityChangeRegister3'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'setQuantityChangeRegister3',
                      systemSet.otherSetObj.setQuantityChangeRegister3Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.changeRegister4')"
              v-if="
                systemSetIsDisplay('otherSetObj', 'setQuantityChangeRegister4')
              "
            >
              <div style="display: flex">
                <el-input
                  v-model="systemSet.otherSetObj.setQuantityChangeRegister4Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'otherSetObj',
                      'setQuantityChangeRegister4'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'setQuantityChangeRegister4',
                      systemSet.otherSetObj.setQuantityChangeRegister4Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.changeRegister5')"
              v-if="
                systemSetIsDisplay('otherSetObj', 'setQuantityChangeRegister5')
              "
            >
              <div style="display: flex">
                <el-input
                  v-model="systemSet.otherSetObj.setQuantityChangeRegister5Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'otherSetObj',
                      'setQuantityChangeRegister5'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'setQuantityChangeRegister5',
                      systemSet.otherSetObj.setQuantityChangeRegister5Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.changeRegister6')"
              v-if="
                systemSetIsDisplay('otherSetObj', 'setQuantityChangeRegister6')
              "
            >
              <div style="display: flex">
                <el-input
                  v-model="systemSet.otherSetObj.setQuantityChangeRegister6Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'otherSetObj',
                      'setQuantityChangeRegister6'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'setQuantityChangeRegister6',
                      systemSet.otherSetObj.setQuantityChangeRegister6Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.changeRegister7')"
              v-if="
                systemSetIsDisplay('otherSetObj', 'setQuantityChangeRegister7')
              "
            >
              <div style="display: flex">
                <el-input
                  v-model="systemSet.otherSetObj.setQuantityChangeRegister7Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'otherSetObj',
                      'setQuantityChangeRegister7'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'setQuantityChangeRegister7',
                      systemSet.otherSetObj.setQuantityChangeRegister7Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.changeRegister8')"
              v-if="
                systemSetIsDisplay('otherSetObj', 'setQuantityChangeRegister8')
              "
            >
              <div style="display: flex">
                <el-input
                  v-model="systemSet.otherSetObj.setQuantityChangeRegister8Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'otherSetObj',
                      'setQuantityChangeRegister8'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'setQuantityChangeRegister8',
                      systemSet.otherSetObj.setQuantityChangeRegister8Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.batteryDisplayMethod')"
              v-if="
                systemSetIsDisplay(
                  'otherSetObj',
                  'batteryParameterDisplayMethod'
                )
              "
            >
              <div style="display: flex">
                <el-select
                  v-model="
                    systemSet.otherSetObj.batteryParameterDisplayMethodVal
                  "
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option
                    :label="$t('deviceManage.automaticPolling')"
                    value="0"
                  />
                  <el-option
                    :label="$t('deviceManage.manualSwitching')"
                    value="1"
                  />
                </el-select>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'otherSetObj',
                      'batteryParameterDisplayMethod'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'batteryParameterDisplayMethod',
                      systemSet.otherSetObj.batteryParameterDisplayMethodVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.theBatteryID')"
              v-if="
                systemSetIsDisplay(
                  'otherSetObj',
                  'theBatteryIdOfTheCurrentDisplayedParameter'
                )
              "
            >
              <div style="display: flex">
                <el-input
                  v-model="
                    systemSet.otherSetObj
                      .theBatteryIdOfTheCurrentDisplayedParameterVal
                  "
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'otherSetObj',
                      'theBatteryIdOfTheCurrentDisplayedParameter'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'theBatteryIdOfTheCurrentDisplayedParameter',
                      systemSet.otherSetObj
                        .theBatteryIdOfTheCurrentDisplayedParameterVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.MOSControl')"
              v-if="systemSetIsDisplay('otherSetObj', 'mosControl')"
            >
              <div style="display: flex">
                <el-input
                  v-model="systemSet.otherSetObj.mosControlVal"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="systemSetBtnIsDisplay('otherSetObj', 'mosControl')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'mosControl',
                      systemSet.otherSetObj.mosControlVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.GPSPowerControl')"
              v-if="
                systemSetIsDisplay(
                  'otherSetObj',
                  'gpsCommunicationModulePowerControl'
                )
              "
            >
              <div style="display: flex">
                <el-input
                  v-model="
                    systemSet.otherSetObj.gpsCommunicationModulePowerControlVal
                  "
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'otherSetObj',
                      'gpsCommunicationModulePowerControl'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'gpsCommunicationModulePowerControl',
                      systemSet.otherSetObj
                        .gpsCommunicationModulePowerControlVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.ACCoupling')"
              v-if="systemSetIsDisplay('otherSetObj', 'acCoupling')"
            >
              <div style="display: flex">
                <el-select
                  v-model="systemSet.otherSetObj.acCouplingVal"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option :label="$t('deviceManage.prohibit')" value="1" />
                  <el-option :label="$t('deviceManage.enable')" value="2" />
                </el-select>
                <el-button
                  v-if="systemSetBtnIsDisplay('otherSetObj', 'acCoupling')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'acCoupling',
                      systemSet.otherSetObj.acCouplingVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.emptyElectricityMeterEnergy')"
              v-if="
                systemSetIsDisplay('otherSetObj', 'emptyElectricityMeterEnergy')
              "
            >
              <div style="display: flex">
                <el-select
                  v-model="systemSet.otherSetObj.emptyElectricityMeterEnergyVal"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option label="0" value="0" />
                  <el-option :label="$t('common.confirm')" value="65535" />
                </el-select>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay(
                      'otherSetObj',
                      'emptyElectricityMeterEnergy'
                    )
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'emptyElectricityMeterEnergy',
                      systemSet.otherSetObj.emptyElectricityMeterEnergyVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.protocolAddress194')"
              v-if="
                systemSetIsDisplay('otherSetObj', 'protocolAddress194') &&
                systemSet.otherSetObj.countryCodeVal == '3'
              "
            >
              <div style="display: flex">
                <el-select
                  v-model="systemSet.otherSetObj.protocolAddress194Val"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option :label="$t('deviceManage.prohibit')" value="1" />
                  <el-option :label="$t('deviceManage.enable')" value="2" />
                </el-select>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay('otherSetObj', 'protocolAddress194')
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'protocolAddress194',
                      systemSet.otherSetObj.protocolAddress194Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.cellOverDischargeProtection')"
              v-if="systemSetIsDisplay('otherSetObj', 'protocolAddress313')"
            >
              <div style="display: flex">
                <el-input
                  v-model="systemSet.otherSetObj.protocolAddress313Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="
                    systemSetBtnIsDisplay('otherSetObj', 'protocolAddress313')
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'protocolAddress313',
                      systemSet.otherSetObj.protocolAddress313Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.powerDownVoltage')"
              v-if="systemSetIsDisplay('otherSetObj', 'protocolAddress358')"
            >
              <div style="display: flex">
                <el-input
                  v-model="systemSet.otherSetObj.protocolAddress358Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="
                    systemSetBtnIsDisplay('otherSetObj', 'protocolAddress358')
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'protocolAddress358',
                      systemSet.otherSetObj.protocolAddress358Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.activationInAustralia')"
              v-if="
                systemSetIsDisplay('otherSetObj', 'protocolAddress195') &&
                systemSet.otherSetObj.countryCodeVal == '3'
              "
            >
              <div style="display: flex">
                <el-select
                  v-model="systemSet.otherSetObj.protocolAddress195Val"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option :label="$t('deviceManage.inactive')" value="0" />
                  <el-option :label="$t('deviceManage.activate')" value="1" />
                </el-select>
                <!-- <el-input v-model="systemSet.otherSetObj.protocolAddress195Val" :placeholder="$t('common.inputPrompt')" /> -->
                <el-button
                  v-if="
                    systemSetBtnIsDisplay('otherSetObj', 'protocolAddress195')
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'protocolAddress195',
                      systemSet.otherSetObj.protocolAddress195Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>

            <el-descriptions-item
              :label="$t('deviceManage.protocolAddress341')"
              v-if="systemSetIsDisplay('otherSetObj', 'protocolAddress341')"
            >
              <div style="display: flex">
                <el-input
                  v-model="systemSet.otherSetObj.protocolAddress341Val"
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">V</template>
                </el-input>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay('otherSetObj', 'protocolAddress341')
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'protocolAddress341',
                      systemSet.otherSetObj.protocolAddress341Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.protocolAddress314')"
              v-if="systemSetIsDisplay('otherSetObj', 'protocolAddress314')"
            >
              <div style="display: flex">
                <el-input
                  v-model="systemSet.otherSetObj.protocolAddress314Val"
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">V</template>
                </el-input>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay('otherSetObj', 'protocolAddress314')
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'protocolAddress314',
                      systemSet.otherSetObj.protocolAddress314Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.protocolAddress328')"
              v-if="systemSetIsDisplay('otherSetObj', 'protocolAddress328')"
            >
              <div style="display: flex">
                <el-input
                  v-model="systemSet.otherSetObj.protocolAddress328Val"
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">V</template>
                </el-input>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay('otherSetObj', 'protocolAddress328')
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'protocolAddress328',
                      systemSet.otherSetObj.protocolAddress328Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.protocolAddress329')"
              v-if="systemSetIsDisplay('otherSetObj', 'protocolAddress329')"
            >
              <div style="display: flex">
                <el-input
                  v-model="systemSet.otherSetObj.protocolAddress329Val"
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">V</template>
                </el-input>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay('otherSetObj', 'protocolAddress329')
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'protocolAddress329',
                      systemSet.otherSetObj.protocolAddress329Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.protocolAddress340')"
              v-if="systemSetIsDisplay('otherSetObj', 'protocolAddress340')"
            >
              <div style="display: flex">
                <el-input
                  v-model="systemSet.otherSetObj.protocolAddress340Val"
                  :placeholder="$t('common.inputPrompt')"
                >
                  <template slot="append">V</template>
                </el-input>
                <el-button
                  v-if="
                    systemSetBtnIsDisplay('otherSetObj', 'protocolAddress340')
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'protocolAddress340',
                      systemSet.otherSetObj.protocolAddress340Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>

            <el-descriptions-item
              :label="$t('deviceManage.PROTOCOL_ADDR_442')"
              v-if="
                systemSetIsDisplay('otherSetObj', 'PROTOCOL_ADDR_442') &&
                (systemSet.otherSetObj.countryCodeVal == '10' ||
                  systemSet.otherSetObj.countryCodeVal == '11')
              "
            >
              <div style="display: flex">
                <el-select
                  v-model="systemSet.otherSetObj.PROTOCOL_ADDR_442Val"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option :label="$t('deviceManage.island0')" value="0" />
                  <el-option :label="$t('deviceManage.island1')" value="1" />
                  <el-option :label="$t('deviceManage.island2')" value="2" />
                </el-select>

                <el-button
                  v-if="
                    systemSetBtnIsDisplay('otherSetObj', 'PROTOCOL_ADDR_442')
                  "
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'PROTOCOL_ADDR_442',
                      systemSet.otherSetObj.PROTOCOL_ADDR_442Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>

            <el-descriptions-item
              :label="$t('deviceManage.realTimeClock')"
              v-if="systemSetIsDisplay('otherSetObj', 'realTimeClock')"
            >
              <div style="display: flex">
                <el-input
                  v-model="systemSet.otherSetObj.realTimeClockVal"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="systemSetBtnIsDisplay('otherSetObj', 'realTimeClock')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave(
                      'realTimeClock',
                      systemSet.otherSetObj.realTimeClockVal
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </template>

      <template v-else-if="activeIndex === '9'">
        <el-card style="margin-top: 10px" v-if="batteryParameter.batterySet">
          <el-descriptions
            :title="$t('deviceManage.batterySettings')"
            :column="2"
          >
            <el-descriptions-item
              :label="$t('deviceManage.batteryPackID')"
              v-if="batteryParameterIsDisplay('batteryPackId')"
              >{{
                batteryParameter.batterySetObj.batteryPackIdVal
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.currentUpgradedBatteryID')"
              v-if="batteryParameterIsDisplay('currentUpgradedBatteryId')"
              >{{
                batteryParameter.batterySetObj.currentUpgradedBatteryIdVal
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.upgradeFailedBatteryID')"
              v-if="batteryParameterIsDisplay('upgradeFailedBatteryId')"
              >{{
                batteryParameter.batterySetObj.upgradeFailedBatteryIdVal
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.numberCellStringsN')"
              v-if="
                batteryParameterIsDisplay('numberOfBatteryPackCellStringsN')
              "
              >{{
                batteryParameter.batterySetObj
                  .numberOfBatteryPackCellStringsNVal
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.numberProbesX')"
              v-if="
                batteryParameterIsDisplay('totalNumberOfTemperatureProbesX')
              "
              >{{
                batteryParameter.batterySetObj
                  .totalNumberOfTemperatureProbesXVal
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.leakageCurrent')"
              v-if="batteryParameterIsDisplay('leakageCurrent')"
              >{{
                batteryParameter.batterySetObj.leakageCurrentVal
              }}mA</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.intermediateBusbarVoltage')"
              v-if="batteryParameterIsDisplay('intermediateBusbarVoltage')"
              >{{
                batteryParameter.batterySetObj.intermediateBusbarVoltageVal
              }}V</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.buckBoostCurrent')"
              v-if="batteryParameterIsDisplay('buckBoostCurrent')"
              >{{
                batteryParameter.batterySetObj.buckBoostCurrentVal
              }}A</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.PVIsoVoltage')"
              v-if="batteryParameterIsDisplay('pvIsoVoltage')"
              >{{
                batteryParameter.batterySetObj.pvIsoVoltageVal
              }}V</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.zeroGroundVoltage')"
              v-if="batteryParameterIsDisplay('zeroGroundVoltage')"
              >{{
                batteryParameter.batterySetObj.zeroGroundVoltageVal
              }}V</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.DCComponentOfInverterCurrent')"
              v-if="batteryParameterIsDisplay('dcComponentOfInverterCurrent')"
              >{{
                batteryParameter.batterySetObj.dcComponentOfInverterCurrentVal
              }}mA</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.DCComponentOfLoadVoltage')"
              v-if="batteryParameterIsDisplay('dcComponentOfLoadVoltage')"
              >{{
                batteryParameter.batterySetObj.dcComponentOfLoadVoltageVal
              }}mV</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.relayIntermediateVoltage')"
              v-if="batteryParameterIsDisplay('relayIntermediateVoltage')"
              >{{
                batteryParameter.batterySetObj.relayIntermediateVoltageVal
              }}V</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.cellVoltage1')"
              v-if="batteryParameterIsDisplay('cellVoltage1')"
              >{{
                batteryParameter.batterySetObj.cellVoltage1Val
              }}mV</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.cellVoltage2')"
              v-if="batteryParameterIsDisplay('cellVoltage2')"
              >{{
                batteryParameter.batterySetObj.cellVoltage2Val
              }}mV</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.cellVoltage3')"
              v-if="batteryParameterIsDisplay('cellVoltage3')"
              >{{
                batteryParameter.batterySetObj.cellVoltage3Val
              }}mV</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.cellVoltage4')"
              v-if="batteryParameterIsDisplay('cellVoltage4')"
              >{{
                batteryParameter.batterySetObj.cellVoltage4Val
              }}mV</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.cellVoltage5')"
              v-if="batteryParameterIsDisplay('cellVoltage5')"
              >{{
                batteryParameter.batterySetObj.cellVoltage5Val
              }}mV</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.cellVoltage6')"
              v-if="batteryParameterIsDisplay('cellVoltage6')"
              >{{
                batteryParameter.batterySetObj.cellVoltage6Val
              }}mV</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.cellVoltage7')"
              v-if="batteryParameterIsDisplay('cellVoltage7')"
              >{{
                batteryParameter.batterySetObj.cellVoltage7Val
              }}mV</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.cellVoltage8')"
              v-if="batteryParameterIsDisplay('cellVoltage8')"
              >{{
                batteryParameter.batterySetObj.cellVoltage8Val
              }}mV</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.cellVoltage9')"
              v-if="batteryParameterIsDisplay('cellVoltage9')"
              >{{
                batteryParameter.batterySetObj.cellVoltage9Val
              }}mV</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.cellVoltage10')"
              v-if="batteryParameterIsDisplay('cellVoltage10')"
              >{{
                batteryParameter.batterySetObj.cellVoltage10Val
              }}mV</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.cellVoltage11')"
              v-if="batteryParameterIsDisplay('cellVoltage11')"
              >{{
                batteryParameter.batterySetObj.cellVoltage11Val
              }}mV</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.cellVoltage12')"
              v-if="batteryParameterIsDisplay('cellVoltage12')"
              >{{
                batteryParameter.batterySetObj.cellVoltage12Val
              }}mV</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.cellVoltage13')"
              v-if="batteryParameterIsDisplay('cellVoltage13')"
              >{{
                batteryParameter.batterySetObj.cellVoltage13Val
              }}mV</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.cellVoltage14')"
              v-if="batteryParameterIsDisplay('cellVoltage14')"
              >{{
                batteryParameter.batterySetObj.cellVoltage14Val
              }}mV</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.cellVoltage15')"
              v-if="batteryParameterIsDisplay('cellVoltage15')"
              >{{
                batteryParameter.batterySetObj.cellVoltage15Val
              }}mV</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.cellVoltage16')"
              v-if="batteryParameterIsDisplay('cellVoltage16')"
              >{{
                batteryParameter.batterySetObj.cellVoltage16Val
              }}mV</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.electricCurrent')"
              v-if="batteryParameterIsDisplay('currentCurrent')"
              >{{
                batteryParameter.batterySetObj.currentCurrentVal
              }}mA</el-descriptions-item
            >
            <!-- <el-descriptions-item label="State1" v-if="batteryParameter.batterySetObj.state1">{{ batteryParameter.batterySetObj.state1Val }}</el-descriptions-item>
            <el-descriptions-item label="State2" v-if="batteryParameter.batterySetObj.state2">{{ batteryParameter.batterySetObj.state2Val }}</el-descriptions-item>
            <el-descriptions-item label="State3" v-if="batteryParameter.batterySetObj.state3">{{ batteryParameter.batterySetObj.state3Val }}</el-descriptions-item> -->
            <el-descriptions-item
              :label="$t('deviceManage.chargingOvercurrentProtection')"
              v-if="batteryParameterIsDisplay('chargingOvercurrentProtection')"
              >{{
                batteryParameter.batterySetObj.chargingOvercurrentProtectionVal
              }}A
              <!-- <div class="input-container">
                  <el-input
                    type="number"
                    id="chargingOvercurrentProtection"
                    v-model="formData.chargingOvercurrentProtection"
                    :min="1"
                    :max="250"
                    class="custom-input"
                  ></el-input>
                  <span>A</span>
                  <el-button
                    @click="savechargingOvercurrentProtection"
                    class="save-button"
                    >{{ $t("common.save") }}</el-button
                  >
                </div> -->
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.chargingOvercurrentProtectionDelay')"
              v-if="
                batteryParameterIsDisplay('chargingOvercurrentProtectionDelay')
              "
              >{{
                batteryParameter.batterySetObj
                  .chargingOvercurrentProtectionDelayVal
              }}s
              <!-- <div class="input-container">
                  <el-input
                    type="number"
                    id="chargingOvercurrentProtectionDelay"
                    v-model="formData.chargingOvercurrentProtectionDelay"
                    :min="1"
                    :max="50"
                    class="custom-input"
                  ></el-input>
                  <span>s</span>
                  <el-button
                    @click="savechargingOvercurrentProtectionDelay"
                    class="save-button"
                    >{{ $t("common.save") }}</el-button
                  >
                </div> -->
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.cellOvervoltageProtection')"
              v-if="batteryParameterIsDisplay('cellOvervoltageProtection')"
              >{{
                batteryParameter.batterySetObj.cellOvervoltageProtectionVal
              }}V
              <!-- <div class="input-container">
                  <el-input
                    type="number"
                    id="cellOvervoltageProtection"
                    v-model="formData.cellOvervoltageProtection"
                    class="custom-input"
                  ></el-input>
                  <span>mV</span>
                  <el-button
                    @click="savecellOvervoltageProtection"
                    class="save-button"
                    >{{ $t("common.save") }}</el-button
                  >
                </div> -->
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.cellOvervoltageProtectionDelay')"
              v-if="batteryParameterIsDisplay('cellOvervoltageProtectionDelay')"
              >{{
                batteryParameter.batterySetObj
                  .cellOvervoltageProtectionDelayVal
              }}ms
              <!-- <div class="input-container">
                  <el-input
                    type="number"
                    id="cellOvervoltageProtectionDelay"
                    v-model="formData.cellOvervoltageProtectionDelay"
                    :min="100"
                    :max="10000"
                    class="custom-input"
                  ></el-input>
                  <span>ms</span>
                  <el-button
                    @click="savecellOvervoltageProtectionDelay"
                    class="save-button"
                    >{{ $t("common.save") }}</el-button
                  >
                </div> -->
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.cellOverDischargeProtection')"
              v-if="batteryParameterIsDisplay('cellOverDischargeProtection')"
            >
                           
              <div class="input-container">
                               
                <el-input
                  type="number"
                  v-model.number="formData.cellOverDischargeProtection"
                  class="custom-input"
                ></el-input>
                <span>V</span>                
                <el-button
                  @click="saveBatteryParameter('cellOverDischargeProtection')"
                  class="save-button"
                  >{{ $t("common.save") }}</el-button
                >
                             
              </div></el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.cellOverDischargeProtectionDelay')"
              v-if="
                batteryParameterIsDisplay('cellOverDischargeProtectionDelay')
              "
              >{{
                batteryParameter.batterySetObj
                  .cellOverDischargeProtectionDelayVal
              }}ms
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.overvoltageHysteresisVoltage')"
              v-if="batteryParameterIsDisplay('overvoltageHysteresisVoltage')"
              >{{
                batteryParameter.batterySetObj.overvoltageHysteresisVoltageVal
              }}V
              <!-- <div class="input-container">
                  <el-input
                    type="number"
                    id="overvoltageHysteresisVoltage"
                    v-model="formData.overvoltageHysteresisVoltage"
                    class="custom-input"
                  ></el-input>
                  <span>V</span>
                  <el-button
                    @click="saveovervoltageHysteresisVoltage"
                    class="save-button"
                    >{{ $t("common.save") }}</el-button
                  >
                </div> -->
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.overdischargeHysteresisVoltage')"
              v-if="batteryParameterIsDisplay('overdischargeHysteresisVoltage')"
            >
              <div class="input-container">
                <el-input
                  type="number"
                  id="overdischargeHysteresisVoltage"
                  v-model="formData.overdischargeHysteresisVoltage"
                  class="custom-input"
                ></el-input>
                <span>V</span>
                <el-button
                  @click="
                    saveBatteryParameter('overdischargeHysteresisVoltage')
                  "
                  class="save-button"
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.cellOvervoltageRecoveryDelay')"
              v-if="batteryParameterIsDisplay('cellOvervoltageRecoveryDelay')"
              >{{
                batteryParameter.batterySetObj.cellOvervoltageRecoveryDelayVal
              }}s
              <!-- <div class="input-container">
                  <el-input
                    type="number"
                    id="cellOvervoltageRecoveryDelay"
                    v-model="formData.cellOvervoltageRecoveryDelay"
                    :min="1"
                    :max="50"
                    class="custom-input"
                  ></el-input>
                  <span>s</span>
                  <el-button
                    @click="savecellOvervoltageRecoveryDelay"
                    class="save-button"
                    >{{ $t("common.save") }}</el-button
                  >
                </div> -->
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.cellOverDischargeRecoveryDelay')"
              v-if="batteryParameterIsDisplay('cellOverDischargeRecoveryDelay')"
              >{{
                batteryParameter.batterySetObj
                  .cellOverDischargeRecoveryDelayVal
              }}s
              <!-- <div class="input-container">
                  <el-input
                    type="number"
                    id="cellOverDischargeRecoveryDelay"
                    v-model="formData.cellOverDischargeRecoveryDelay"
                    :min="1"
                    :max="50"
                    class="custom-input"
                  ></el-input>
                  <span>s</span>
                  <el-button
                    @click="savecellOverDischargeRecoveryDelay"
                    class="save-button"
                    >{{ $t("common.save") }}</el-button
                  >
                </div> -->
            </el-descriptions-item>
            <el-descriptions-item
              :label="
                $t('deviceManage.highTemperatureProtectionDuringDischarge')
              "
              v-if="
                batteryParameterIsDisplay(
                  'highTemperatureProtectionDuringDischarge'
                )
              "
              >{{
                batteryParameter.batterySetObj
                  .highTemperatureProtectionDuringDischargeVal
              }}℃
              <!-- <div class="input-container">
                  <el-input
                    type="number"
                    id="highTemperatureProtectionDuringDischarge"
                    v-model="formData.highTemperatureProtectionDuringDischarge"
                    :min="0"
                    :max="70"
                    class="custom-input"
                  ></el-input>
                  <span>℃</span>
                  <el-button
                    @click="savehighTemperatureProtectionDuringDischarge"
                    class="save-button"
                    >{{ $t("common.save") }}</el-button
                  >
                </div> -->
            </el-descriptions-item>
            <el-descriptions-item
              :label="
                $t(
                  'deviceManage.highTemperatureProtectionRecoveryDuringDischarge'
                )
              "
              v-if="
                batteryParameterIsDisplay(
                  'highTemperatureProtectionRecoveryDuringDischarge'
                )
              "
              >{{
                batteryParameter.batterySetObj
                  .highTemperatureProtectionRecoveryDuringDischargeVal
              }}℃
              <!-- <div class="input-container">
                  <el-input
                    type="number"
                    id="highTemperatureProtectionRecoveryDuringDischarge"
                    v-model="
                      formData.highTemperatureProtectionRecoveryDuringDischarge
                    "
                    :min="0"
                    :max="70"
                    class="custom-input"
                  ></el-input>
                  <span>℃</span>
                  <el-button
                    @click="
                      savehighTemperatureProtectionRecoveryDuringDischarge
                    "
                    class="save-button"
                    >{{ $t("common.save") }}</el-button
                  >
                </div> -->
            </el-descriptions-item>
            <el-descriptions-item
              :label="
                $t('deviceManage.lowTemperatureProtectionDuringDischarge')
              "
              v-if="
                batteryParameterIsDisplay(
                  'lowTemperatureProtectionDuringDischarge'
                )
              "
              >{{
                batteryParameter.batterySetObj
                  .lowTemperatureProtectionDuringDischargeVal
              }}℃
              <!-- <div class="input-container">
                  <el-input
                    type="number"
                    id="lowTemperatureProtectionDuringDischarge"
                    v-model="formData.lowTemperatureProtectionDuringDischarge"
                    :min="0"
                    :max="70"
                    class="custom-input"
                  ></el-input>
                  <span>℃</span>
                  <el-button
                    @click="savelowTemperatureProtectionDuringDischarge"
                    class="save-button"
                    >{{ $t("common.save") }}</el-button
                  >
                </div> -->
            </el-descriptions-item>
            <el-descriptions-item
              :label="
                $t('deviceManage.dischargeLowTemperatureProtectionRecovery')
              "
              v-if="
                batteryParameterIsDisplay(
                  'dischargeLowTemperatureProtectionRecovery'
                )
              "
              >{{
                batteryParameter.batterySetObj
                  .dischargeLowTemperatureProtectionRecoveryVal
              }}℃
              <!-- <div class="input-container">
                  <el-input
                    type="number"
                    id="dischargeLowTemperatureProtectionRecovery"
                    v-model="formData.dischargeLowTemperatureProtectionRecovery"
                    :min="0"
                    :max="70"
                    class="custom-input"
                  ></el-input>
                  <span>℃</span>
                  <el-button
                    @click="savedischargeLowTemperatureProtectionRecovery"
                    class="save-button"
                    >{{ $t("common.save") }}</el-button
                  >
                </div> -->
            </el-descriptions-item>
            <el-descriptions-item
              :label="
                $t('deviceManage.highTemperatureProtectionDuringCharging')
              "
              v-if="
                batteryParameterIsDisplay(
                  'highTemperatureProtectionDuringCharging'
                )
              "
              >{{
                batteryParameter.batterySetObj
                  .highTemperatureProtectionDuringChargingVal
              }}℃
              <!-- <div class="input-container">
                  <el-input
                    type="number"
                    id="highTemperatureProtectionDuringCharging"
                    v-model="formData.highTemperatureProtectionDuringCharging"
                    :min="0"
                    :max="70"
                    class="custom-input"
                  ></el-input>
                  <span>℃</span>
                  <el-button
                    @click="savehighTemperatureProtectionDuringCharging"
                    class="save-button"
                    >{{ $t("common.save") }}</el-button
                  >
                </div> -->
            </el-descriptions-item>
            <el-descriptions-item
              :label="
                $t(
                  'deviceManage.highTemperatureProtectionRecoveryDuringCharging'
                )
              "
              v-if="
                batteryParameterIsDisplay(
                  'highTemperatureProtectionRecoveryDuringCharging'
                )
              "
              >{{
                batteryParameter.batterySetObj
                  .highTemperatureProtectionRecoveryDuringChargingVal
              }}℃
              <!-- <div class="input-container">
                  <el-input
                    type="number"
                    id="highTemperatureProtectionRecoveryDuringCharging"
                    v-model="
                      formData.highTemperatureProtectionRecoveryDuringCharging
                    "
                    :min="0"
                    :max="70"
                    class="custom-input"
                  ></el-input>
                  <span>℃</span>
                  <el-button
                    @click="savehighTemperatureProtectionRecoveryDuringCharging"
                    class="save-button"
                    >{{ $t("common.save") }}</el-button
                  >
                </div> -->
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.lowDuringCharging')"
              v-if="
                batteryParameterIsDisplay(
                  'lowTemperatureProtectionDuringCharging'
                )
              "
            >
              <div class="input-container">
                <el-input
                  type="number"
                  id="lowTempCharging"
                  v-model.number="
                    formData.lowTemperatureProtectionDuringCharging
                  "
                  :min="0"
                  :max="70"
                  class="custom-input"
                ></el-input>
                <span>℃</span>
                <el-button
                  @click="saveLowTemperatureProtectionDuringCharging"
                  class="save-button"
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>

            <!-- {{
                  batteryParameter.batterySetObj
                    .lowTemperatureProtectionDuringChargingVal
                }}℃</el-descriptions-item> -->

            <el-descriptions-item
              :label="$t('deviceManage.lowRecoveryDuringCharging')"
              v-if="
                batteryParameterIsDisplay(
                  'lowTemperatureProtectionRecoveryDuringCharging'
                )
              "
              ><div class="input-container">
                <el-input
                  type="number"
                  id="lowTempRecoveryCharging"
                  v-model.number="
                    formData.lowTemperatureProtectionRecoveryDuringCharging
                  "
                  :min="0"
                  :max="70"
                  class="custom-input"
                ></el-input>
                <span>℃</span>
                <el-button
                  @click="saveLowTemperatureProtectionRecoveryDuringCharging"
                  class="save-button"
                  >{{ $t("common.save") }}</el-button
                >
              </div></el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.equalizingOpeningVoltage')"
              v-if="batteryParameterIsDisplay('equalizingOpeningVoltage')"
              >{{
                batteryParameter.batterySetObj.equalizingOpeningVoltageVal
              }}V</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.equilibriumOpeningPressureDifference')"
              v-if="
                batteryParameterIsDisplay(
                  'equilibriumOpeningPressureDifference'
                )
              "
              >{{
                batteryParameter.batterySetObj
                  .equilibriumOpeningPressureDifferenceVal
              }}mV</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.cellTemperature1')"
              v-if="batteryParameterIsDisplay('cellTemperature1')"
              >{{
                batteryParameter.batterySetObj.cellTemperature1Val
              }}℃</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.cellTemperature2')"
              v-if="batteryParameterIsDisplay('cellTemperature2')"
              >{{
                batteryParameter.batterySetObj.cellTemperature2Val
              }}℃</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.cellTemperature3')"
              v-if="batteryParameterIsDisplay('cellTemperature3')"
              >{{
                batteryParameter.batterySetObj.cellTemperature3Val
              }}℃</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.cellTemperature4')"
              v-if="batteryParameterIsDisplay('cellTemperature4')"
              >{{
                batteryParameter.batterySetObj.cellTemperature4Val
              }}℃</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.MOSTemperature')"
              v-if="batteryParameterIsDisplay('mosTemperature')"
              >{{
                batteryParameter.batterySetObj.mosTemperatureVal
              }}℃</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.ambientTemperature')"
              v-if="batteryParameterIsDisplay('ambientTemperature')"
              >{{
                batteryParameter.batterySetObj.ambientTemperatureVal
              }}℃</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.equilibriumState1')"
              v-if="batteryParameterIsDisplay('equilibriumState1')"
            >
              {{ batteryParameter.batterySetObj.equilibriumState1Val }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.equilibriumState2')"
              v-if="batteryParameterIsDisplay('equilibriumState2')"
            >
              {{ batteryParameter.batterySetObj.equilibriumState2Val }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.softwareVersion')"
              v-if="batteryParameterIsDisplay('softwareVersion')"
              >{{
                batteryParameter.batterySetObj.softwareVersionVal
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.hardwareVersion')"
              v-if="batteryParameterIsDisplay('hardwareVersion')"
              >{{
                batteryParameter.batterySetObj.hardwareVersionVal
              }}</el-descriptions-item
            >
            <!-- <el-descriptions-item :label="$t('deviceManage.state')" v-if="batteryParameter.batterySetObj.state">{{ batteryParameter.batterySetObj.stateVal }}</el-descriptions-item> -->

            <el-descriptions-item
              :label="$t('deviceManage.alarmStateBit0')"
              v-if="batteryParameterIsDisplay('alarmStateBit0')"
            >
              {{
                batteryParameter.batterySetObj.alarmStateBit0Val == 0
                  ? $t("deviceManage.nothing")
                  : $t("deviceManage.alarm")
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.alarmStateBit1')"
              v-if="batteryParameterIsDisplay('alarmStateBit1')"
            >
              {{
                batteryParameter.batterySetObj.alarmStateBit1Val == 0
                  ? $t("deviceManage.nothing")
                  : $t("deviceManage.alarm")
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.alarmStateBit2')"
              v-if="batteryParameterIsDisplay('alarmStateBit2')"
            >
              {{
                batteryParameter.batterySetObj.alarmStateBit2Val == 0
                  ? $t("deviceManage.nothing")
                  : $t("deviceManage.alarm")
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.alarmStateBit3')"
              v-if="batteryParameterIsDisplay('alarmStateBit3')"
            >
              {{
                batteryParameter.batterySetObj.alarmStateBit3Val == 0
                  ? $t("deviceManage.nothing")
                  : $t("deviceManage.alarm")
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.alarmStateBit4')"
              v-if="batteryParameterIsDisplay('alarmStateBit4')"
            >
              {{
                batteryParameter.batterySetObj.alarmStateBit4Val == 0
                  ? $t("deviceManage.nothing")
                  : $t("deviceManage.alarm")
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.alarmStateBit5')"
              v-if="batteryParameterIsDisplay('alarmStateBit5')"
            >
              {{
                batteryParameter.batterySetObj.alarmStateBit5Val == 0
                  ? $t("deviceManage.nothing")
                  : $t("deviceManage.alarm")
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.alarmStateBit6')"
              v-if="batteryParameterIsDisplay('alarmStateBit6')"
            >
              {{
                batteryParameter.batterySetObj.alarmStateBit6Val == 0
                  ? $t("deviceManage.nothing")
                  : $t("deviceManage.alarm")
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.alarmStateBit7')"
              v-if="batteryParameterIsDisplay('alarmStateBit7')"
            >
              {{
                batteryParameter.batterySetObj.alarmStateBit7Val == 0
                  ? $t("deviceManage.nothing")
                  : $t("deviceManage.alarm")
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.alarmStateBit8')"
              v-if="batteryParameterIsDisplay('alarmStateBit8')"
            >
              {{
                batteryParameter.batterySetObj.alarmStateBit8Val == 0
                  ? $t("deviceManage.nothing")
                  : $t("deviceManage.alarm")
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.alarmStateBit9')"
              v-if="batteryParameterIsDisplay('alarmStateBit9')"
            >
              {{
                batteryParameter.batterySetObj.alarmStateBit9Val == 0
                  ? $t("deviceManage.nothing")
                  : $t("deviceManage.alarm")
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.alarmStateBit10')"
              v-if="batteryParameterIsDisplay('alarmStateBit10')"
            >
              {{
                batteryParameter.batterySetObj.alarmStateBit10Val == 0
                  ? $t("deviceManage.nothing")
                  : $t("deviceManage.alarm")
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.alarmStateBit11')"
              v-if="batteryParameterIsDisplay('alarmStateBit11')"
            >
              {{
                batteryParameter.batterySetObj.alarmStateBit11Val == 0
                  ? $t("deviceManage.nothing")
                  : $t("deviceManage.alarm")
              }}
            </el-descriptions-item>

            <el-descriptions-item
              :label="$t('deviceManage.batterySOC')"
              v-if="batteryParameterIsDisplay('batterySoc')"
              >{{
                batteryParameter.batterySetObj.batterySocVal
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.batterySOH')"
              v-if="batteryParameterIsDisplay('batterySoh')"
              >{{
                batteryParameter.batterySetObj.batterySohVal
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.numberOfCycles')"
              v-if="batteryParameterIsDisplay('numberOfCycles')"
              >{{
                batteryParameter.batterySetObj.numberOfCyclesVal
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.dischargeRemainingTime')"
              v-if="batteryParameterIsDisplay('dischargeRemainingTime')"
              >{{
                batteryParameter.batterySetObj.dischargeRemainingTimeVal
              }}min</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.chargingRemainingTime')"
              v-if="batteryParameterIsDisplay('chargingRemainingTime')"
              >{{
                batteryParameter.batterySetObj.chargingRemainingTimeVal
              }}min</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.currentChargingInterval')"
              v-if="batteryParameterIsDisplay('currentChargingInterval')"
              >{{
                batteryParameter.batterySetObj.currentChargingIntervalVal
              }}h</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.maximumChargingInterval')"
              v-if="batteryParameterIsDisplay('maximumChargingInterval')"
              >{{
                batteryParameter.batterySetObj.maximumChargingIntervalVal
              }}h</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.totalBatteryVoltage')"
              v-if="batteryParameterIsDisplay('totalBatteryVoltage')"
              >{{
                batteryParameter.batterySetObj.totalBatteryVoltageVal
              }}mV</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.maximumVoltageOfPack')"
              v-if="batteryParameterIsDisplay('maximumVoltageOfBatteryPack')"
              >{{
                batteryParameter.batterySetObj.maximumVoltageOfBatteryPackVal
              }}mV</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.minimumVoltageOfPack')"
              v-if="batteryParameterIsDisplay('minimumVoltageOfBatteryPack')"
              >{{
                batteryParameter.batterySetObj.minimumVoltageOfBatteryPackVal
              }}mV</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.maximumAllowableDischargeCurrent')"
              v-if="
                batteryParameterIsDisplay('maximumAllowableDischargeCurrent')
              "
              >{{
                batteryParameter.batterySetObj
                  .maximumAllowableDischargeCurrentVal
              }}mA</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.maximumAllowableChargingCurrent')"
              v-if="
                batteryParameterIsDisplay('maximumAllowableChargingCurrent')
              "
              >{{
                batteryParameter.batterySetObj
                  .maximumAllowableChargingCurrentVal
              }}mA</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.standardChargingVoltage')"
              v-if="batteryParameterIsDisplay('standardChargingVoltage')"
              >{{
                batteryParameter.batterySetObj.standardChargingVoltageVal
              }}mV</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.currentHumidity')"
              v-if="batteryParameterIsDisplay('currentHumidity')"
              >{{
                batteryParameter.batterySetObj.currentHumidityVal
              }}RH%</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.factoryCode')"
              v-if="batteryParameterIsDisplay('factoryCode')"
              >{{
                batteryParameter.batterySetObj.factoryCodeVal
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.productNumber')"
              v-if="batteryParameterIsDisplay('productNumber')"
              >{{
                batteryParameter.batterySetObj.productNumberVal
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.dateOfProduction')"
              v-if="batteryParameterIsDisplay('dateOfProduction')"
              >{{
                batteryParameter.batterySetObj.dateOfProductionVal
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.batteryDetectionResistanceValue')"
              v-if="
                batteryParameterIsDisplay('batteryDetectionResistanceValue')
              "
              >{{
                batteryParameter.batterySetObj
                  .batteryDetectionResistanceValueVal
              }}mΩ</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.maximumCellTemperature')"
              v-if="batteryParameterIsDisplay('maximumCellTemperature')"
              >{{
                batteryParameter.batterySetObj.maximumCellTemperatureVal
              }}℃</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.minimumCellTemperature')"
              v-if="batteryParameterIsDisplay('minimumCellTemperature')"
              >{{
                batteryParameter.batterySetObj.minimumCellTemperatureVal
              }}℃</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.temperatureDifference')"
              v-if="batteryParameterIsDisplay('temperatureDifference')"
              >{{
                batteryParameter.batterySetObj.temperatureDifferenceVal
              }}℃</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.temperatureProtectionValue')"
              v-if="
                batteryParameterIsDisplay(
                  'temperatureDifferenceProtectionValue'
                )
              "
              >{{
                batteryParameter.batterySetObj
                  .temperatureDifferenceProtectionValueVal
              }}mV</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.temperatureAlarmValue')"
              v-if="
                batteryParameterIsDisplay('temperatureDifferenceAlarmValue')
              "
              >{{
                batteryParameter.batterySetObj
                  .temperatureDifferenceAlarmValueVal
              }}mV</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.differentialProtectionValue')"
              v-if="
                batteryParameterIsDisplay('differentialPressureProtectionValue')
              "
              >{{
                batteryParameter.batterySetObj
                  .differentialPressureProtectionValueVal
              }}mV</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.differentialAlarmValue')"
              v-if="batteryParameterIsDisplay('differentialPressureAlarmValue')"
              >{{
                batteryParameter.batterySetObj
                  .differentialPressureAlarmValueVal
              }}mV</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.staticEquilibriumTime')"
              v-if="batteryParameterIsDisplay('staticEquilibriumTime')"
              >{{
                batteryParameter.batterySetObj.staticEquilibriumTimeVal
              }}min</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.automaticRecoveryDelayC')"
              v-if="
                batteryParameterIsDisplay(
                  'automaticRecoveryDelayAfterChargingOvercurrent'
                )
              "
              >{{
                batteryParameter.batterySetObj
                  .automaticRecoveryDelayAfterChargingOvercurrentVal
              }}min</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.automaticallyResumeLocking')"
              v-if="
                batteryParameterIsDisplay(
                  'automaticallyResumeLockingAfterOvercharging'
                )
              "
              >{{
                batteryParameter.batterySetObj
                  .automaticallyResumeLockingAfterOverchargingVal
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.automaticRecoveryDelay')"
              v-if="
                batteryParameterIsDisplay(
                  'automaticRecoveryDelayAfterDischargeOvercurrent'
                )
              "
              >{{
                batteryParameter.batterySetObj
                  .automaticRecoveryDelayAfterDischargeOvercurrentVal
              }}min</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.automaticRecoveryLocking')"
              v-if="
                batteryParameterIsDisplay(
                  'automaticRecoveryLockingAfterDischargeOvercurrent'
                )
              "
              >{{
                batteryParameter.batterySetObj
                  .automaticRecoveryLockingAfterDischargeOvercurrentVal
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.inverterCurrentLimit')"
              v-if="
                batteryParameterIsDisplay(
                  'theInverterCurrentExceedsTheLimitCurrent'
                )
              "
              >{{
                batteryParameter.batterySetObj
                  .theInverterCurrentExceedsTheLimitCurrentVal
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.batteryParameterDisplayMethod')"
              v-if="batteryParameterIsDisplay('batteryParameterDisplayMethod')"
            >
              {{
                batteryParameter.batterySetObj
                  .batteryParameterDisplayMethodVal == 0
                  ? $t("deviceManage.automaticPolling")
                  : $t("deviceManage.manualSwitching")
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.batteryIDParameter')"
              v-if="
                batteryParameterIsDisplay(
                  'theBatteryIdOfTheCurrentDisplayedParameter'
                )
              "
              >{{
                batteryParameter.batterySetObj
                  .theBatteryIdOfTheCurrentDisplayedParameterVal
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.batteryPackDesignCapacity')"
              v-if="batteryParameterIsDisplay('batteryPackDesignCapacity')"
              >{{
                batteryParameter.batterySetObj.batteryPackDesignCapacityVal
              }}mAH</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.currentBatteryFullCapacity')"
              v-if="batteryParameterIsDisplay('currentBatteryFullCapacity')"
              >{{
                batteryParameter.batterySetObj.currentBatteryFullCapacityVal
              }}mAH</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.remainingBatteryCapacity')"
              v-if="batteryParameterIsDisplay('remainingBatteryCapacity')"
              >{{
                batteryParameter.batterySetObj.remainingBatteryCapacityVal
              }}mAH</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.MOSControl')"
              v-if="batteryParameterIsDisplay('mosControl')"
              >{{
                batteryParameter.batterySetObj.mosControlVal
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.chargingDischargingHeating')"
              v-if="
                batteryParameterIsDisplay('chargingDischargingHeatingEnable')
              "
            >
              {{
                batteryParameter.batterySetObj
                  .chargingDischargingHeatingEnableVal
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.GPSPowerControl')"
              v-if="
                batteryParameterIsDisplay('gpsCommunicationModulePowerControl')
              "
              >{{
                batteryParameter.batterySetObj
                  .gpsCommunicationModulePowerControlVal
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.realTimeClock')"
              v-if="batteryParameterIsDisplay('realTimeClock')"
              >{{
                batteryParameter.batterySetObj.realTimeClockVal
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.dischargeOvercurrentProtection')"
              v-if="
                batteryParameterIsDisplay('dischargeOvercurrent1Protection')
              "
              >{{
                batteryParameter.batterySetObj
                  .dischargeOvercurrent1ProtectionVal
              }}A</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.dischargeOvercurrentDelay')"
              v-if="batteryParameterIsDisplay('dischargeOvercurrent1Delay')"
              >{{
                batteryParameter.batterySetObj.dischargeOvercurrent1DelayVal
              }}s</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.environmentalHighProtection')"
              v-if="
                batteryParameterIsDisplay(
                  'environmentalHighTemperatureProtection'
                )
              "
              >{{
                batteryParameter.batterySetObj
                  .environmentalHighTemperatureProtectionVal
              }}℃</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.environmentalHighProtectionRecovery')"
              v-if="
                batteryParameterIsDisplay(
                  'environmentalHighTemperatureProtectionRecovery'
                )
              "
              >{{
                batteryParameter.batterySetObj
                  .environmentalHighTemperatureProtectionRecoveryVal
              }}℃</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.environmentalLowProtection')"
              v-if="
                batteryParameterIsDisplay(
                  'environmentalLowTemperatureProtection'
                )
              "
              >{{
                batteryParameter.batterySetObj
                  .environmentalLowTemperatureProtectionVal
              }}℃</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.environmentalLowProtectionRecovery')"
              v-if="
                batteryParameterIsDisplay(
                  'environmentalLowTemperatureProtectionRecovery'
                )
              "
              >{{
                batteryParameter.batterySetObj
                  .environmentalLowTemperatureProtectionRecoveryVal
              }}℃</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.totalPressureOvervoltageProtection')"
              v-if="
                batteryParameterIsDisplay('totalPressureOvervoltageProtection')
              "
              >{{
                batteryParameter.batterySetObj
                  .totalPressureOvervoltageProtectionVal
              }}mV</el-descriptions-item
            >
            <el-descriptions-item
              :label="
                $t('deviceManage.totalPressureOvervoltageProtectionRecovery')
              "
              v-if="
                batteryParameterIsDisplay(
                  'totalPressureOvervoltageProtectionRecovery'
                )
              "
              >{{
                batteryParameter.batterySetObj
                  .totalPressureOvervoltageProtectionRecoveryVal
              }}mV</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.totalVoltageOvervoltageProtection')"
              v-if="
                batteryParameterIsDisplay('totalVoltageOvervoltageProtection')
              "
            >
                           
              <div class="input-container">
                               
                <el-input
                  type="number"
                  id="totalVoltageOvervoltageProtection"
                  v-model.number="formData.totalVoltageOvervoltageProtection"
                  class="custom-input"
                ></el-input>
                                <span>mV</span>                
                <el-button
                  @click="
                    saveBatteryParameter('totalVoltageOvervoltageProtection')
                  "
                  class="save-button"
                  >{{ $t("common.save") }}</el-button
                >
                             
              </div></el-descriptions-item
            >
             
            <el-descriptions-item
              :label="$t('deviceManage.totalPressureOverdischargeRecovery')"
              v-if="
                batteryParameterIsDisplay('totalPressureOverDischargeRecovery')
              "
            >
                           
              <div class="input-container">
                               
                <el-input
                  type="number"
                  id="totalPressureOverDischargeRecovery"
                  v-model.number="formData.totalPressureOverDischargeRecovery"
                  class="custom-input"
                ></el-input>
                                <span>mV</span>                
                <el-button
                  @click="
                    saveBatteryParameter('totalPressureOverDischargeRecovery')
                  "
                  class="save-button"
                  >{{ $t("common.save") }}</el-button
                >
                             
              </div></el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.totalOvervoltageProtectionDelay')"
              v-if="
                batteryParameterIsDisplay(
                  'totalVoltageOvervoltageProtectionDelay'
                )
              "
              >{{
                batteryParameter.batterySetObj
                  .totalVoltageOvervoltageProtectionDelayVal
              }}ms</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.totalOverdischargeProtectionDelay')"
              v-if="
                batteryParameterIsDisplay(
                  'totalVoltageOverDischargeProtectionDelay'
                )
              "
              >{{
                batteryParameter.batterySetObj
                  .totalVoltageOverDischargeProtectionDelayVal
              }}ms</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.totalOvervoltageRecoveryDelay')"
              v-if="batteryParameterIsDisplay('totalOvervoltageRecoveryDelay')"
              >{{
                batteryParameter.batterySetObj.totalOvervoltageRecoveryDelayVal
              }}s</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.totalOverdischargeRecoveryDelay')"
              v-if="
                batteryParameterIsDisplay('totalOverdischargeRecoveryDelay')
              "
              >{{
                batteryParameter.batterySetObj
                  .totalOverdischargeRecoveryDelayVal
              }}s</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.MOSHighProtection')"
              v-if="batteryParameterIsDisplay('mosHighTemperatureProtection')"
              >{{
                batteryParameter.batterySetObj.mosHighTemperatureProtectionVal
              }}℃</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.MOSHighRecovery')"
              v-if="batteryParameterIsDisplay('mosHighTemperatureRecovery')"
              >{{
                batteryParameter.batterySetObj.mosHighTemperatureRecoveryVal
              }}℃</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.MOSHighProtectionDelay')"
              v-if="
                batteryParameterIsDisplay('moshighTemperatureProtectionDelay')
              "
              >{{
                batteryParameter.batterySetObj
                  .moshighTemperatureProtectionDelayVal
              }}s</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.fullTotalPressureAbove')"
              v-if="
                batteryParameterIsDisplay('fullOfProtectionTotalPressureAbove')
              "
              >{{
                batteryParameter.batterySetObj
                  .fullOfProtectionTotalPressureAboveVal
              }}mV</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.fullChargingCurrentBelow')"
              v-if="
                batteryParameterIsDisplay(
                  'fullOfProtectionChargingCurrentBelow'
                )
              "
              >{{
                batteryParameter.batterySetObj
                  .fullOfProtectionChargingCurrentBelowVal
              }}mA</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.fullDelayTime')"
              v-if="batteryParameterIsDisplay('fullOfProtectionDelayTime')"
              >{{
                batteryParameter.batterySetObj.fullOfProtectionDelayTimeVal
              }}s</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.heatingOnTemperature')"
              v-if="batteryParameterIsDisplay('heatingFanOnTemperature')"
              ><div class="input-container">
                <el-input
                  type="number"
                  id="heatingFanOnTemperature"
                  v-model.number="formData.heatingFanOnTemperature"
                  :min="0"
                  :max="160"
                  class="custom-input"
                ></el-input
                ><span>℃</span>
                <el-button
                  @click="saveHeatingFanOnTemperature"
                  class="save-button"
                  >{{ $t("common.save") }}</el-button
                >
              </div></el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.heatingRecoveryTemperature')"
              v-if="batteryParameterIsDisplay('heatingFanRecoveryTemperature')"
              ><div class="input-container">
                <el-input
                  type="number"
                  id="heatingFanRecoveryTemperature"
                  v-model.number="formData.heatingFanRecoveryTemperature"
                  :min="0"
                  :max="160"
                  class="custom-input"
                ></el-input
                ><span>℃</span>
                <el-button
                  @click="saveHeatingFanRecoveryTemperature"
                  class="save-button"
                  >{{ $t("common.save") }}</el-button
                >
              </div></el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.voltageAlarm')"
              v-if="batteryParameterIsDisplay('enableSettingBit0')"
            >
              {{
                batteryParameter.batterySetObj.enableSettingBit0Val == 1
                  ? $t("menuManage.open")
                  : $t("menuManage.close")
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.overcurrentAlarm')"
              v-if="batteryParameterIsDisplay('enableSettingBit1')"
            >
              {{
                batteryParameter.batterySetObj.enableSettingBit1Val == 1
                  ? $t("menuManage.open")
                  : $t("menuManage.close")
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.overTemperatureAlarm')"
              v-if="batteryParameterIsDisplay('enableSettingBit2')"
            >
              {{
                batteryParameter.batterySetObj.enableSettingBit2Val == 1
                  ? $t("menuManage.open")
                  : $t("menuManage.close")
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.MOSOverTemperatureAlarm')"
              v-if="batteryParameterIsDisplay('enableSettingBit3')"
            >
              {{
                batteryParameter.batterySetObj.enableSettingBit3Val == 1
                  ? $t("menuManage.open")
                  : $t("menuManage.close")
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.cellImbalanceAlarm')"
              v-if="batteryParameterIsDisplay('enableSettingBit4')"
            >
              <div class="input-container">
                <el-select
                  v-model="formData.enableSettingBit4"
                  style="width: 100px"
                >
                  <el-option
                    :label="$t('menuManage.close')"
                    value="0"
                  ></el-option>
                  <el-option
                    :label="$t('menuManage.open')"
                    value="1"
                  ></el-option>
                </el-select>
                <el-button @click="saveEnableSettings" class="save-button">{{
                  $t("common.save")
                }}</el-button>
              </div>
            </el-descriptions-item>

            <el-descriptions-item
              :label="$t('deviceManage.ambientTemperatureAlarm')"
              v-if="batteryParameterIsDisplay('enableSettingBit5')"
            >
              {{
                batteryParameter.batterySetObj.enableSettingBit5Val == 1
                  ? $t("menuManage.open")
                  : $t("menuManage.close")
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.SOCLowAlarm')"
              v-if="batteryParameterIsDisplay('enableSettingBit6')"
            >
              {{
                batteryParameter.batterySetObj.enableSettingBit6Val == 1
                  ? $t("menuManage.open")
                  : $t("menuManage.close")
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.chargingAndHeatingEnable')"
              v-if="batteryParameterIsDisplay('enableSettingBit7')"
            >
              {{
                batteryParameter.batterySetObj.enableSettingBit7Val == 1
                  ? $t("menuManage.open")
                  : $t("menuManage.close")
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.totalVoltageProtection')"
              v-if="batteryParameterIsDisplay('enableSettingBit8')"
            >
              {{
                batteryParameter.batterySetObj.enableSettingBit8Val == 1
                  ? $t("menuManage.open")
                  : $t("menuManage.close")
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.dischargeRecoveryFunction')"
              v-if="batteryParameterIsDisplay('enableSettingBit9')"
            >
              {{
                batteryParameter.batterySetObj.enableSettingBit9Val == 1
                  ? $t("menuManage.open")
                  : $t("menuManage.close")
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.delayAutomaticRecoveryFunction')"
              v-if="batteryParameterIsDisplay('enableSettingBit10')"
            >
              {{
                batteryParameter.batterySetObj.enableSettingBit10Val == 1
                  ? $t("menuManage.open")
                  : $t("menuManage.close")
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.chargingRecoveryFunction')"
              v-if="batteryParameterIsDisplay('enableSettingBit11')"
            >
              {{
                batteryParameter.batterySetObj.enableSettingBit11Val == 1
                  ? $t("menuManage.open")
                  : $t("menuManage.close")
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.staticEqualizationFunction')"
              v-if="batteryParameterIsDisplay('enableSettingBit12')"
            >
              {{
                batteryParameter.batterySetObj.enableSettingBit12Val == 1
                  ? $t("menuManage.open")
                  : $t("menuManage.close")
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.systemLockNumber')"
              v-if="batteryParameterIsDisplay('systemLockStatusSerialNumber')"
            >
              {{
                systemLockStatusSerialNumberValFilter[
                  batteryParameter.batterySetObj.systemLockStatusSerialNumberVal
                ]
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.totalOvervoltageVoltage')"
              v-if="
                batteryParameterIsDisplay('totalVoltageOvervoltageAlarmVoltage')
              "
              >{{
                batteryParameter.batterySetObj
                  .totalVoltageOvervoltageAlarmVoltageVal
              }}mV</el-descriptions-item
            >
             
            <el-descriptions-item
              :label="$t('deviceManage.totalOverdischargeVoltage')"
              v-if="
                batteryParameterIsDisplay(
                  'totalVoltageOverDischargeAlarmVoltage'
                )
              "
            >
                           
              <div class="input-container">
                               
                <el-input
                  type="number"
                  id="totalVoltageOverDischargeAlarmVoltage"
                  v-model.number="
                    formData.totalVoltageOverDischargeAlarmVoltage
                  "
                  class="custom-input"
                ></el-input>
                                <span>mV</span>                
                <el-button
                  @click="
                    saveBatteryParameter(
                      'totalVoltageOverDischargeAlarmVoltage'
                    )
                  "
                  class="save-button"
                  >{{ $t("common.save") }}</el-button
                >
                             
              </div></el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.cellOvervoltageVoltage')"
              v-if="batteryParameterIsDisplay('cellOvervoltageAlarmVoltage')"
            >
              {{
                batteryParameter.batterySetObj.cellOvervoltageAlarmVoltageVal
              }}V
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.cellOverdischargeVoltage')"
              v-if="batteryParameterIsDisplay('cellOverDischargeAlarmVoltage')"
            >
                           
              <div class="input-container">
                               
                <el-input
                  type="number"
                  id="cellOverDischargeAlarmVoltage"
                  v-model.number="formData.cellOverDischargeAlarmVoltage"
                  class="custom-input"
                ></el-input>
                                <span>V</span>                
                <el-button
                  @click="saveBatteryParameter('cellOverDischargeAlarmVoltage')"
                  class="save-button"
                  >{{ $t("common.save") }}</el-button
                >
                             
              </div></el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.chargingOvercurrentAlarm')"
              v-if="
                batteryParameterIsDisplay('chargingOvercurrentAlarmCurrent')
              "
              >{{
                batteryParameter.batterySetObj
                  .chargingOvercurrentAlarmCurrentVal
              }}A</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.dischargeOvercurrentAlarm')"
              v-if="
                batteryParameterIsDisplay('dischargeOvercurrentAlarmCurrent')
              "
              >{{
                batteryParameter.batterySetObj
                  .dischargeOvercurrentAlarmCurrentVal
              }}A</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.chargingHighAlarm')"
              v-if="
                batteryParameterIsDisplay(
                  'chargingHighTemperatureAlarmTemperature'
                )
              "
              >{{
                batteryParameter.batterySetObj
                  .chargingHighTemperatureAlarmTemperatureVal
              }}℃</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.chargingLowAlarm')"
              v-if="
                batteryParameterIsDisplay(
                  'chargingLowTemperatureAlarmTemperature'
                )
              "
              >{{
                batteryParameter.batterySetObj
                  .chargingLowTemperatureAlarmTemperatureVal
              }}℃</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.dischargeHighAlarm')"
              v-if="
                batteryParameterIsDisplay(
                  'dischargeHighTemperatureAlarmTemperature'
                )
              "
              >{{
                batteryParameter.batterySetObj
                  .dischargeHighTemperatureAlarmTemperatureVal
              }}℃</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.dischargeLowAlarm')"
              v-if="
                batteryParameterIsDisplay(
                  'dischargeLowTemperatureAlarmTemperature'
                )
              "
              >{{
                batteryParameter.batterySetObj
                  .dischargeLowTemperatureAlarmTemperatureVal
              }}℃</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.MOSAlarmTemperature')"
              v-if="
                batteryParameterIsDisplay('mosOverTemperatureAlarmTemperature')
              "
              >{{
                batteryParameter.batterySetObj
                  .mosOverTemperatureAlarmTemperatureVal
              }}℃</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.MOSRecoveryTemperature')"
              v-if="
                batteryParameterIsDisplay(
                  'mosOverTemperatureAlarmRecoveryTemperature'
                )
              "
              >{{
                batteryParameter.batterySetObj
                  .mosOverTemperatureAlarmRecoveryTemperatureVal
              }}℃</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.batteryImbalanceAlarmPressure')"
              v-if="
                batteryParameterIsDisplay(
                  'batteryImbalanceAlarmPressureDifference'
                )
              "
            >
              <div class="input-container">
                <el-input
                  type="number"
                  id="batteryImbalanceAlarmPressureDifference"
                  v-model.number="
                    formData.batteryImbalanceAlarmPressureDifference
                  "
                  class="custom-input"
                ></el-input>
                <span>mV</span>
                <el-button
                  @click="
                    saveBatteryParameter(
                      'batteryImbalanceAlarmPressureDifference'
                    )
                  "
                  class="save-button"
                  >{{ $t("common.save") }}</el-button
                >
              </div></el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.imbalancePressureDifference')"
              v-if="
                batteryParameterIsDisplay(
                  'imbalanceAlarmRecoveryPressureDifference'
                )
              "
              ><div class="input-container">
                <el-input
                  type="number"
                  id="imbalanceAlarmRecoveryPressureDifference"
                  v-model.number="
                    formData.imbalanceAlarmRecoveryPressureDifference
                  "
                  class="custom-input"
                ></el-input>
                <span>mV</span>
                <el-button
                  @click="
                    saveBatteryParameter(
                      'imbalanceAlarmRecoveryPressureDifference'
                    )
                  "
                  class="save-button"
                  >{{ $t("common.save") }}</el-button
                >
              </div></el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.environmentalHighTemperatureAlarm')"
              v-if="
                batteryParameterIsDisplay('environmentalHighTemperatureAlarm')
              "
              >{{
                batteryParameter.batterySetObj
                  .environmentalHighTemperatureAlarmVal
              }}℃</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.environmentalLowTemperatureAlarm')"
              v-if="
                batteryParameterIsDisplay('environmentalLowTemperatureAlarm')
              "
              >{{
                batteryParameter.batterySetObj
                  .environmentalLowTemperatureAlarmVal
              }}℃</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.SOCLowAlarm')"
              v-if="batteryParameterIsDisplay('socLowAlarm')"
              >{{
                batteryParameter.batterySetObj.socLowAlarmVal
              }}%</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.chargingCurrentLimiting')"
              v-if="
                batteryParameterIsDisplay('chargingCurrentLimitingFunction')
              "
            >
              {{
                batteryParameter.batterySetObj
                  .chargingCurrentLimitingFunctionVal == 1
                  ? $t("common.enable")
                  : $t("common.disable")
              }}
            </el-descriptions-item>

            <el-descriptions-item
              :label="$t('deviceManage.powerDownVoltage')"
              v-if="batteryParameterIsDisplay('powerDownVoltage')"
            >
                           
              <div class="input-container">
                               
                <el-input
                  type="number"
                  id="powerDownVoltage"
                  v-model.number="formData.powerDownVoltage"
                  class="custom-input"
                ></el-input>
                                <span>V</span>                
                <el-button
                  @click="saveBatteryParameter('powerDownVoltage')"
                  class="save-button"
                  >{{ $t("common.save") }}</el-button
                >
                             
              </div></el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.powerDownCurrent')"
              v-if="batteryParameterIsDisplay('powerDownCurrent')"
              >{{
                batteryParameter.batterySetObj.powerDownCurrentVal
              }}A</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.powerDownDelay')"
              v-if="batteryParameterIsDisplay('powerDownDelay')"
              >{{
                batteryParameter.batterySetObj.powerDownDelayVal
              }}min</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.monthlySelfDischargeRate')"
              v-if="batteryParameterIsDisplay('monthlySelfDischargeRate')"
              >{{
                batteryParameter.batterySetObj.monthlySelfDischargeRateVal
              }}%</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.capacityRatio')"
              v-if="batteryParameterIsDisplay('cycle1CapacityRatio')"
              >{{
                batteryParameter.batterySetObj.cycle1CapacityRatioVal
              }}%</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.SOCMonomerVoltage')"
              v-if="batteryParameterIsDisplay('soc0PercentMonomerVoltage')"
              >{{
                batteryParameter.batterySetObj.soc0PercentMonomerVoltageVal
              }}mV</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.fullCapacityOnce')"
              v-if="
                batteryParameterIsDisplay('fullCapacityAttenuationOncePerCycle')
              "
              >{{
                batteryParameter.batterySetObj
                  .fullCapacityAttenuationOncePerCycleVal
              }}%</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.mailAddress')"
              v-if="batteryParameterIsDisplay('communicateAddress')"
              >{{
                batteryParameter.batterySetObj.communicateAddressVal
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.customParameter1')"
              v-if="batteryParameterIsDisplay('customParameters1')"
            >
              <div class="input-container">
                <el-input
                  type="number"
                  id="customParameters1"
                  v-model.number="formData.customParameters1"
                  :min="0"
                  :step="0.01"
                  class="custom-input"
                  :formatter="formatCustomParameters"
                  :parser="parseCustomParameters"
                ></el-input>
                <span></span>
                <el-button
                  @click="saveCustomParameters(1)"
                  class="save-button"
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.customParameter2')"
              v-if="batteryParameterIsDisplay('customParameters2')"
              >{{
                batteryParameter.batterySetObj.customParameters2Val
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.customParameter3')"
              v-if="batteryParameterIsDisplay('customParameters3')"
              >{{
                batteryParameter.batterySetObj.customParameters3Val
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.customParameter4')"
              v-if="batteryParameterIsDisplay('customParameters4')"
              >{{
                batteryParameter.batterySetObj.customParameters4Val
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.customParameter5')"
              v-if="batteryParameterIsDisplay('customParameters5')"
              ><div class="input-container">
                <el-input
                  type="number"
                  id="customParameters5"
                  v-model.number="formData.customParameters5"
                  :min="0"
                  :step="0.01"
                  class="custom-input"
                  :formatter="formatCustomParameters"
                  :parser="parseCustomParameters"
                ></el-input>
                <span></span>
                <el-button
                  @click="saveCustomParameters(5)"
                  class="save-button"
                  >{{ $t("common.save") }}</el-button
                >
              </div></el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.customParameter6')"
              v-if="batteryParameterIsDisplay('customParameters6')"
              >{{
                batteryParameter.batterySetObj.customParameters6Val
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.customParameter7')"
              v-if="batteryParameterIsDisplay('customParameters7')"
              >{{
                batteryParameter.batterySetObj.customParameters7Val
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.customParameter8')"
              v-if="batteryParameterIsDisplay('customParameters8')"
              ><div class="input-container">
                <el-input
                  type="number"
                  id="customParameters8"
                  v-model.number="formData.customParameters8"
                  :min="0"
                  :step="0.01"
                  class="custom-input"
                  :formatter="formatCustomParameters"
                  :parser="parseCustomParameters"
                ></el-input>
                <span></span>
                <el-button
                  @click="saveCustomParameters(8)"
                  class="save-button"
                  >{{ $t("common.save") }}</el-button
                >
              </div></el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.customStatus1')"
              v-if="batteryParameterIsDisplay('customStatus1')"
              >{{
                batteryParameter.batterySetObj.customStatus1Val
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.customStatus2')"
              v-if="batteryParameterIsDisplay('customStatus2')"
              >{{
                batteryParameter.batterySetObj.customStatus2Val
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.heatingEnable')"
              v-if="batteryParameterIsDisplay('dischargeStaticHeatingEnable')"
              >{{
                batteryParameter.batterySetObj.dischargeStaticHeatingEnableVal
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.unlockSystemLock')"
              v-if="batteryParameterIsDisplay('unlockSystemLock')"
            >
              {{
                batteryParameter.batterySetObj.unlockSystemLockVal == 1
                  ? $t("deviceManage.unlock")
                  : $t("deviceManage.invalid")
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.onHeating')"
              v-if="batteryParameterIsDisplay('dischargeOnHeatingTemperature')"
            >
              <div class="input-container">
                <el-input
                  type="number"
                  id="dischargeOnHeatingTemperature"
                  v-model.number="formData.dischargeOnHeatingTemperature"
                  :min="0"
                  :max="160"
                  class="custom-input"
                ></el-input>
                <span>℃</span>
                <el-button
                  @click="savedischargeOnHeatingTemperature"
                  class="save-button"
                  >{{ $t("common.save") }}</el-button
                >
              </div></el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.offHeating')"
              v-if="batteryParameterIsDisplay('dischargeOffHeatingTemperature')"
              ><div class="input-container">
                <el-input
                  type="number"
                  id="dischargeOffHeatingTemperature"
                  v-model.number="formData.dischargeOffHeatingTemperature"
                  :min="0"
                  :max="160"
                  class="custom-input"
                ></el-input>
                <span>℃</span>
                <el-button
                  @click="savedischargeOffHeatingTemperature"
                  class="save-button"
                  >{{ $t("common.save") }}</el-button
                >
              </div></el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.stateDischargeState1')"
              v-if="batteryParameterIsDisplay('stateOneBit0')"
              >{{
                +batteryParameter.batterySetObj.stateOneBit0Val
                  ? $t("deviceManage.discharging")
                  : $t("deviceManage.noDischarge")
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.stateChargingState1')"
              v-if="batteryParameterIsDisplay('stateOneBit1')"
              >{{
                +batteryParameter.batterySetObj.stateOneBit1Val
                  ? $t("deviceManage.charging")
                  : $t("deviceManage.noCharging")
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.stateChargerState1')"
              v-if="batteryParameterIsDisplay('stateOneBit2')"
              >{{
                +batteryParameter.batterySetObj.stateOneBit2Val
                  ? $t("deviceManage.connected")
                  : $t("deviceManage.notConnected")
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.stateMOSTemperature1')"
              v-if="batteryParameterIsDisplay('stateOneBit4')"
              >{{
                +batteryParameter.batterySetObj.stateOneBit4Val
                  ? $t("deviceManage.withMOStemperature")
                  : $t("deviceManage.noMOStemperature")
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.stateAmbientTemperature1')"
              v-if="batteryParameterIsDisplay('stateOneBit5')"
              >{{
                +batteryParameter.batterySetObj.stateOneBit5Val
                  ? $t("deviceManage.withAmbientTemperature")
                  : $t("deviceManage.noAmbientTemperature")
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.stateCellOvervoltage1')"
              v-if="batteryParameterIsDisplay('stateOneBit8')"
              >{{
                +batteryParameter.batterySetObj.stateOneBit8Val
                  ? $t("deviceManage.overvoltage")
                  : $t("deviceManage.noOvervoltage")
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.stateTotalPressureOvervoltage1')"
              v-if="batteryParameterIsDisplay('stateOneBit9')"
              >{{
                +batteryParameter.batterySetObj.stateOneBit9Val
                  ? $t("deviceManage.overvoltage")
                  : $t("deviceManage.noOvervoltage")
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.stateFullProtection1')"
              v-if="batteryParameterIsDisplay('stateOneBit12')"
              >{{
                +batteryParameter.batterySetObj.stateOneBit12Val
                  ? $t("deviceManage.fullOfProtection")
                  : $t("deviceManage.noFullProtection")
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.stateCellUndervoltage2')"
              v-if="batteryParameterIsDisplay('stateTwoBit0')"
              >{{
                +batteryParameter.batterySetObj.stateTwoBit0Val
                  ? $t("deviceManage.undervoltage")
                  : $t("deviceManage.noUndervoltage")
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.stateTotalVoltageUndervoltage2')"
              v-if="batteryParameterIsDisplay('stateTwoBit1')"
              >{{
                +batteryParameter.batterySetObj.stateTwoBit1Val
                  ? $t("deviceManage.undervoltage")
                  : $t("deviceManage.noUndervoltage")
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="
                $t('deviceManage.stateHighTemperatureProtectionDuringCharging2')
              "
              v-if="batteryParameterIsDisplay('stateTwoBit8')"
              >{{
                +batteryParameter.batterySetObj.stateTwoBit8Val
                  ? $t("deviceManage.highDuringCharging")
                  : $t("deviceManage.highWithoutCharging")
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="
                $t('deviceManage.stateLowTemperatureProtectionDuringCharging2')
              "
              v-if="batteryParameterIsDisplay('stateTwoBit9')"
              >{{
                +batteryParameter.batterySetObj.stateTwoBit9Val
                  ? $t("deviceManage.lowDuringCharging")
                  : $t("deviceManage.lowWithoutCharging")
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.stateMOSHighTemperatureProtection2')"
              v-if="batteryParameterIsDisplay('stateTwoBit10')"
              >{{
                +batteryParameter.batterySetObj.stateTwoBit10Val
                  ? $t("deviceManage.MOShigh")
                  : $t("deviceManage.NoMOShigh")
              }}</el-descriptions-item
            >

            <el-descriptions-item
              :label="
                $t(
                  'deviceManage.stateHighTemperatureProtectionDuringDischarge2'
                )
              "
              v-if="batteryParameterIsDisplay('stateTwoBit12')"
              >{{
                +batteryParameter.batterySetObj.stateTwoBit12Val
                  ? $t("deviceManage.highDuringDischarge")
                  : $t("deviceManage.highWithoutDischarge")
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="
                $t('deviceManage.stateLowTemperatureProtectionDuringDischarge2')
              "
              v-if="batteryParameterIsDisplay('stateTwoBit13')"
              >{{
                +batteryParameter.batterySetObj.stateTwoBit13Val
                  ? $t("deviceManage.lowDuringDischarge")
                  : $t("deviceManage.lowWithoutDischarge")
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.stateDischargeShortCircuitProtection3')"
              v-if="batteryParameterIsDisplay('stateThreeBit0')"
              >{{
                +batteryParameter.batterySetObj.stateThreeBit0Val
                  ? $t("deviceManage.dischargeShortCircuit")
                  : $t("deviceManage.noDischargeShortCircuit")
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.stateDischargeOvercurrentProtection3')"
              v-if="batteryParameterIsDisplay('stateThreeBit1')"
              >{{
                +batteryParameter.batterySetObj.stateThreeBit1Val
                  ? $t("deviceManage.dischargeOvercurrent")
                  : $t("deviceManage.noDischargeOvercurrent")
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.stateChargingOvercurrentProtection3')"
              v-if="batteryParameterIsDisplay('stateThreeBit2')"
              >{{
                +batteryParameter.batterySetObj.stateThreeBit2Val
                  ? $t("deviceManage.chargingOvercurrent")
                  : $t("deviceManage.noChargingOvercurrent")
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="
                $t('deviceManage.stateEnvironmentalHighTemperatureProtection3')
              "
              v-if="batteryParameterIsDisplay('stateThreeBit4')"
              >{{
                +batteryParameter.batterySetObj.stateThreeBit4Val
                  ? $t("deviceManage.environmentalHighTemperature")
                  : $t("deviceManage.noEnvironmentalHighTemperature")
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="
                $t('deviceManage.stateEnvironmentalLowTemperatureProtection3')
              "
              v-if="batteryParameterIsDisplay('stateThreeBit5')"
              >{{
                +batteryParameter.batterySetObj.stateThreeBit5Val
                  ? $t("deviceManage.environmentalLowTemperature")
                  : $t("deviceManage.noEnvironmentalLowTemperature")
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.stateCellOvervoltageSystemLock3')"
              v-if="batteryParameterIsDisplay('stateThreeBit8')"
              >{{
                +batteryParameter.batterySetObj.stateThreeBit8Val
                  ? $t("deviceManage.trigger")
                  : $t("deviceManage.nothing")
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.stateBatteryUndervoltageSystemLock3')"
              v-if="batteryParameterIsDisplay('stateThreeBit9')"
              >{{
                +batteryParameter.batterySetObj.stateThreeBit9Val
                  ? $t("deviceManage.trigger")
                  : $t("deviceManage.nothing")
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.stateChargingOvercurrentSystemLock3')"
              v-if="batteryParameterIsDisplay('stateThreeBit10')"
              >{{
                +batteryParameter.batterySetObj.stateThreeBit10Val
                  ? $t("deviceManage.trigger")
                  : $t("deviceManage.nothing")
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.stateDischargeOvercurrentSystemLock3')"
              v-if="batteryParameterIsDisplay('stateThreeBit11')"
              >{{
                +batteryParameter.batterySetObj.stateThreeBit11Val
                  ? $t("deviceManage.trigger")
                  : $t("deviceManage.nothing")
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="
                $t('deviceManage.stateChargingOverTemperatureSystemLock3')
              "
              v-if="batteryParameterIsDisplay('stateThreeBit12')"
              >{{
                +batteryParameter.batterySetObj.stateThreeBit12Val
                  ? $t("deviceManage.trigger")
                  : $t("deviceManage.nothing")
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="
                $t('deviceManage.stateDischargeOverTemperatureSystemLock3')
              "
              v-if="batteryParameterIsDisplay('stateThreeBit13')"
              >{{
                +batteryParameter.batterySetObj.stateThreeBit13Val
                  ? $t("deviceManage.trigger")
                  : $t("deviceManage.nothing")
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.stateChargingUndervoltageSystemLock3')"
              v-if="batteryParameterIsDisplay('stateThreeBit14')"
              >{{
                +batteryParameter.batterySetObj.stateThreeBit14Val
                  ? $t("deviceManage.trigger")
                  : $t("deviceManage.nothing")
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.stateDischargeUndervoltageSystemLock3')"
              v-if="batteryParameterIsDisplay('stateThreeBit15')"
              >{{
                +batteryParameter.batterySetObj.stateThreeBit15Val
                  ? $t("deviceManage.trigger")
                  : $t("deviceManage.nothing")
              }}</el-descriptions-item
            >

            <el-descriptions-item
              :label="$t('deviceManage.statusHeatingStatus')"
              v-if="batteryParameterIsDisplay('stateBit0')"
              >{{
                +batteryParameter.batterySetObj.stateBit0Val
                  ? $t("deviceManage.heatingState")
                  : $t("deviceManage.nonHeatingState")
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.statusDischargeMOSSwitch')"
              v-if="batteryParameterIsDisplay('stateBit1')"
              >{{
                +batteryParameter.batterySetObj.stateBit1Val
                  ? $t("menuManage.open")
                  : $t("menuManage.close")
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.statusChargingMOSSwitch')"
              v-if="batteryParameterIsDisplay('stateBit2')"
              >{{
                +batteryParameter.batterySetObj.stateBit2Val
                  ? $t("menuManage.open")
                  : $t("menuManage.close")
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.statusTemperatureAcquisitionFailure')"
              v-if="batteryParameterIsDisplay('stateBit8')"
              >{{
                +batteryParameter.batterySetObj.stateBit8Val
                  ? $t("deviceManage.loseEfficacy")
                  : $t("deviceManage.nothing")
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.statusVoltageAcquisitionFailure')"
              v-if="batteryParameterIsDisplay('stateBit9')"
              >{{
                +batteryParameter.batterySetObj.stateBit9Val
                  ? $t("deviceManage.loseEfficacy")
                  : $t("deviceManage.nothing")
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.statusDischargeMOSFailure')"
              v-if="batteryParameterIsDisplay('stateBit10')"
              >{{
                +batteryParameter.batterySetObj.stateBit10Val
                  ? $t("deviceManage.loseEfficacy")
                  : $t("deviceManage.nothing")
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.statusChargingMOSFailure')"
              v-if="batteryParameterIsDisplay('stateBit11')"
              >{{
                +batteryParameter.batterySetObj.stateBit11Val
                  ? $t("deviceManage.loseEfficacy")
                  : $t("deviceManage.nothing")
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.statusBatteryImbalanceAlarm')"
              v-if="batteryParameterIsDisplay('stateBit12')"
              >{{
                +batteryParameter.batterySetObj.stateBit12Val
                  ? $t("deviceManage.giveAnAlarm")
                  : $t("deviceManage.nothing")
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.statusDischargeLowTemperatureAlarm')"
              v-if="batteryParameterIsDisplay('stateBit14')"
              >{{
                +batteryParameter.batterySetObj.stateBit14Val
                  ? $t("deviceManage.giveAnAlarm")
                  : $t("deviceManage.nothing")
              }}</el-descriptions-item
            >
            <el-descriptions-item
              :label="$t('deviceManage.statusChargingLowTemperatureAlarm')"
              v-if="batteryParameterIsDisplay('stateBit15')"
              >{{
                +batteryParameter.batterySetObj.stateBit15Val
                  ? $t("deviceManage.giveAnAlarm")
                  : $t("deviceManage.nothing")
              }}</el-descriptions-item
            >
          </el-descriptions>
        </el-card>
      </template>

      <template v-else-if="activeIndex === '11'">
        <el-card style="margin-top: 10px">
          <el-descriptions
            :title="$t('deviceManage.scheduledSettings')"
            :column="3"
            border
          >
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_80')"
              v-if="timeSettingIsDisplay('specialDateOneObj', 'HM6_0X03_80')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.specialDateOneObj.HM6_0X03_80Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('specialDateOneObj', 'HM6_0X03_80')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_80',
                      subList.specialDateOneObj.HM6_0X03_80Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_81')"
              v-if="timeSettingIsDisplay('specialDateOneObj', 'HM6_0X03_81')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.specialDateOneObj.HM6_0X03_81Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('specialDateOneObj', 'HM6_0X03_81')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_81',
                      subList.specialDateOneObj.HM6_0X03_81Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_82')"
              v-if="timeSettingIsDisplay('specialDateOneObj', 'HM6_0X03_82')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.specialDateOneObj.HM6_0X03_82Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('specialDateOneObj', 'HM6_0X03_82')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_82',
                      subList.specialDateOneObj.HM6_0X03_82Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_83')"
              v-if="timeSettingIsDisplay('specialDateOneObj', 'HM6_0X03_83')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.specialDateOneObj.HM6_0X03_83Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('specialDateOneObj', 'HM6_0X03_83')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_83',
                      subList.specialDateOneObj.HM6_0X03_83Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_84')"
              v-if="timeSettingIsDisplay('specialDateOneObj', 'HM6_0X03_84')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.specialDateOneObj.HM6_0X03_84Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('specialDateOneObj', 'HM6_0X03_84')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_84',
                      subList.specialDateOneObj.HM6_0X03_84Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_85')"
              v-if="timeSettingIsDisplay('specialDateOneObj', 'HM6_0X03_85')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.specialDateOneObj.HM6_0X03_85Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('specialDateOneObj', 'HM6_0X03_85')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_85',
                      subList.specialDateOneObj.HM6_0X03_85Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_86')"
              v-if="timeSettingIsDisplay('specialDateOneObj', 'HM6_0X03_86')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.specialDateOneObj.HM6_0X03_86Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('specialDateOneObj', 'HM6_0X03_86')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_86',
                      subList.specialDateOneObj.HM6_0X03_86Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_87')"
              v-if="timeSettingIsDisplay('specialDateOneObj', 'HM6_0X03_87')"
            >
              <div style="display: flex">
                <el-select
                  v-model="subList.specialDateOneObj.HM6_0X03_87Val"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option
                    :label="$t('deviceManage.batteryPriorityMode')"
                    value="0"
                  />
                  <el-option
                    :label="$t('deviceManage.homeLoadPriorityMode')"
                    value="1"
                  />
                  <el-option
                    :label="$t('deviceManage.gridPriorityMode')"
                    value="2"
                  />
                  <el-option
                    :label="$t('deviceManage.fullPowerFeedMode')"
                    value="3"
                  />
                  <el-option
                    :label="$t('deviceManage.emergencyBackupMode')"
                    value="4"
                  />
                  <el-option
                    :label="$t('deviceManage.acBackupMode')"
                    value="5"
                  />
                  <el-option :label="$t('deviceManage.purePVMode')" value="6" />
                  <el-option
                    :label="$t('deviceManage.forcedOffGridMode')"
                    value="7"
                  />
                </el-select>
                <el-button
                  type="text"
                  style="margin-left: 5px"
                  v-if="timeSettingIsSet('specialDateOneObj', 'HM6_0X03_87')"
                  @click="
                    handleSave11(
                      'HM6_0X03_87',
                      subList.specialDateOneObj.HM6_0X03_87Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_88')"
              v-if="timeSettingIsDisplay('specialDateOneObj', 'HM6_0X03_88')"
            >
              <div style="display: flex">
                <el-select
                  v-model="subList.specialDateOneObj.HM6_0X03_88Val"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option
                    :label="$t('deviceManage.batteryPriorityMode')"
                    value="0"
                  />
                  <el-option
                    :label="$t('deviceManage.homeLoadPriorityMode')"
                    value="1"
                  />
                  <el-option
                    :label="$t('deviceManage.gridPriorityMode')"
                    value="2"
                  />
                  <el-option
                    :label="$t('deviceManage.fullPowerFeedMode')"
                    value="3"
                  />
                  <el-option
                    :label="$t('deviceManage.emergencyBackupMode')"
                    value="4"
                  />
                  <el-option
                    :label="$t('deviceManage.acBackupMode')"
                    value="5"
                  />
                  <el-option :label="$t('deviceManage.purePVMode')" value="6" />
                  <el-option
                    :label="$t('deviceManage.forcedOffGridMode')"
                    value="7"
                  />
                </el-select>
                <el-button
                  type="text"
                  style="margin-left: 5px"
                  v-if="timeSettingIsSet('specialDateOneObj', 'HM6_0X03_88')"
                  @click="
                    handleSave11(
                      'HM6_0X03_88',
                      subList.specialDateOneObj.HM6_0X03_88Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>

        <el-card style="margin-top: 10px">
          <el-descriptions :column="3" border>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_89')"
              v-if="timeSettingIsDisplay('specialDateTwoObj', 'HM6_0X03_89')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.specialDateTwoObj.HM6_0X03_89Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('specialDateTwoObj', 'HM6_0X03_89')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_89',
                      subList.specialDateTwoObj.HM6_0X03_89Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_90')"
              v-if="timeSettingIsDisplay('specialDateTwoObj', 'HM6_0X03_90')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.specialDateTwoObj.HM6_0X03_90Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('specialDateTwoObj', 'HM6_0X03_90')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_90',
                      subList.specialDateTwoObj.HM6_0X03_90Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_91')"
              v-if="timeSettingIsDisplay('specialDateTwoObj', 'HM6_0X03_91')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.specialDateTwoObj.HM6_0X03_91Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('specialDateTwoObj', 'HM6_0X03_91')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_91',
                      subList.specialDateTwoObj.HM6_0X03_91Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_92')"
              v-if="timeSettingIsDisplay('specialDateTwoObj', 'HM6_0X03_92')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.specialDateTwoObj.HM6_0X03_92Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('specialDateTwoObj', 'HM6_0X03_92')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_92',
                      subList.specialDateTwoObj.HM6_0X03_92Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_93')"
              v-if="timeSettingIsDisplay('specialDateTwoObj', 'HM6_0X03_93')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.specialDateTwoObj.HM6_0X03_93Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('specialDateTwoObj', 'HM6_0X03_93')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_93',
                      subList.specialDateTwoObj.HM6_0X03_93Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_94')"
              v-if="timeSettingIsDisplay('specialDateTwoObj', 'HM6_0X03_94')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.specialDateTwoObj.HM6_0X03_94Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('specialDateTwoObj', 'HM6_0X03_94')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_94',
                      subList.specialDateTwoObj.HM6_0X03_94Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_95')"
              v-if="timeSettingIsDisplay('specialDateTwoObj', 'HM6_0X03_95')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.specialDateTwoObj.HM6_0X03_95Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('specialDateTwoObj', 'HM6_0X03_95')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_95',
                      subList.specialDateTwoObj.HM6_0X03_95Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_96')"
              v-if="timeSettingIsDisplay('specialDateTwoObj', 'HM6_0X03_96')"
            >
              <div style="display: flex">
                <el-select
                  v-model="subList.specialDateTwoObj.HM6_0X03_96Val"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option
                    :label="$t('deviceManage.batteryPriorityMode')"
                    value="0"
                  />
                  <el-option
                    :label="$t('deviceManage.homeLoadPriorityMode')"
                    value="1"
                  />
                  <el-option
                    :label="$t('deviceManage.gridPriorityMode')"
                    value="2"
                  />
                  <el-option
                    :label="$t('deviceManage.fullPowerFeedMode')"
                    value="3"
                  />
                  <el-option
                    :label="$t('deviceManage.emergencyBackupMode')"
                    value="4"
                  />
                  <el-option
                    :label="$t('deviceManage.acBackupMode')"
                    value="5"
                  />
                  <el-option :label="$t('deviceManage.purePVMode')" value="6" />
                  <el-option
                    :label="$t('deviceManage.forcedOffGridMode')"
                    value="7"
                  />
                </el-select>
                <el-button
                  type="text"
                  style="margin-left: 5px"
                  v-if="timeSettingIsSet('specialDateTwoObj', 'HM6_0X03_96')"
                  @click="
                    handleSave11(
                      'HM6_0X03_96',
                      subList.specialDateTwoObj.HM6_0X03_96Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_97')"
              v-if="timeSettingIsDisplay('specialDateTwoObj', 'HM6_0X03_97')"
            >
              <div style="display: flex">
                <el-select
                  v-model="subList.specialDateTwoObj.HM6_0X03_97Val"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option
                    :label="$t('deviceManage.batteryPriorityMode')"
                    value="0"
                  />
                  <el-option
                    :label="$t('deviceManage.homeLoadPriorityMode')"
                    value="1"
                  />
                  <el-option
                    :label="$t('deviceManage.gridPriorityMode')"
                    value="2"
                  />
                  <el-option
                    :label="$t('deviceManage.fullPowerFeedMode')"
                    value="3"
                  />
                  <el-option
                    :label="$t('deviceManage.emergencyBackupMode')"
                    value="4"
                  />
                  <el-option
                    :label="$t('deviceManage.acBackupMode')"
                    value="5"
                  />
                  <el-option :label="$t('deviceManage.purePVMode')" value="6" />
                  <el-option
                    :label="$t('deviceManage.forcedOffGridMode')"
                    value="7"
                  />
                </el-select>
                <el-button
                  type="text"
                  style="margin-left: 5px"
                  v-if="timeSettingIsSet('specialDateTwoObj', 'HM6_0X03_97')"
                  @click="
                    handleSave11(
                      'HM6_0X03_97',
                      subList.specialDateTwoObj.HM6_0X03_97Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>

        <el-card style="margin-top: 10px">
          <el-descriptions :column="3" border>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_98')"
              v-if="timeSettingIsDisplay('specialDateThreeObj', 'HM6_0X03_98')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.specialDateThreeObj.HM6_0X03_98Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('specialDateThreeObj', 'HM6_0X03_98')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_98',
                      subList.specialDateThreeObj.HM6_0X03_98Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_99')"
              v-if="timeSettingIsDisplay('specialDateThreeObj', 'HM6_0X03_99')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.specialDateThreeObj.HM6_0X03_99Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('specialDateThreeObj', 'HM6_0X03_99')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_99',
                      subList.specialDateThreeObj.HM6_0X03_99Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_100')"
              v-if="timeSettingIsDisplay('specialDateThreeObj', 'HM6_0X03_100')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.specialDateThreeObj.HM6_0X03_100Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('specialDateThreeObj', 'HM6_0X03_100')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_100',
                      subList.specialDateThreeObj.HM6_0X03_100Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_101')"
              v-if="timeSettingIsDisplay('specialDateThreeObj', 'HM6_0X03_101')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.specialDateThreeObj.HM6_0X03_101Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('specialDateThreeObj', 'HM6_0X03_101')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_101',
                      subList.specialDateThreeObj.HM6_0X03_101Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_102')"
              v-if="timeSettingIsDisplay('specialDateThreeObj', 'HM6_0X03_102')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.specialDateThreeObj.HM6_0X03_102Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('specialDateThreeObj', 'HM6_0X03_102')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_102',
                      subList.specialDateThreeObj.HM6_0X03_102Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_103')"
              v-if="timeSettingIsDisplay('specialDateThreeObj', 'HM6_0X03_103')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.specialDateThreeObj.HM6_0X03_103Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('specialDateThreeObj', 'HM6_0X03_103')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_103',
                      subList.specialDateThreeObj.HM6_0X03_103Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_104')"
              v-if="timeSettingIsDisplay('specialDateThreeObj', 'HM6_0X03_104')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.specialDateThreeObj.HM6_0X03_104Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('specialDateThreeObj', 'HM6_0X03_104')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_104',
                      subList.specialDateThreeObj.HM6_0X03_104Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_105')"
              v-if="timeSettingIsDisplay('specialDateThreeObj', 'HM6_0X03_105')"
            >
              <div style="display: flex">
                <el-select
                  v-model="subList.specialDateThreeObj.HM6_0X03_105Val"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option
                    :label="$t('deviceManage.batteryPriorityMode')"
                    value="0"
                  />
                  <el-option
                    :label="$t('deviceManage.homeLoadPriorityMode')"
                    value="1"
                  />
                  <el-option
                    :label="$t('deviceManage.gridPriorityMode')"
                    value="2"
                  />
                  <el-option
                    :label="$t('deviceManage.fullPowerFeedMode')"
                    value="3"
                  />
                  <el-option
                    :label="$t('deviceManage.emergencyBackupMode')"
                    value="4"
                  />
                  <el-option
                    :label="$t('deviceManage.acBackupMode')"
                    value="5"
                  />
                  <el-option :label="$t('deviceManage.purePVMode')" value="6" />
                  <el-option
                    :label="$t('deviceManage.forcedOffGridMode')"
                    value="7"
                  />
                </el-select>
                <el-button
                  type="text"
                  style="margin-left: 5px"
                  v-if="timeSettingIsSet('specialDateThreeObj', 'HM6_0X03_105')"
                  @click="
                    handleSave11(
                      'HM6_0X03_105',
                      subList.specialDateThreeObj.HM6_0X03_105Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_106')"
              v-if="timeSettingIsDisplay('specialDateThreeObj', 'HM6_0X03_106')"
            >
              <div style="display: flex">
                <el-select
                  v-model="subList.specialDateThreeObj.HM6_0X03_106Val"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option
                    :label="$t('deviceManage.batteryPriorityMode')"
                    value="0"
                  />
                  <el-option
                    :label="$t('deviceManage.homeLoadPriorityMode')"
                    value="1"
                  />
                  <el-option
                    :label="$t('deviceManage.gridPriorityMode')"
                    value="2"
                  />
                  <el-option
                    :label="$t('deviceManage.fullPowerFeedMode')"
                    value="3"
                  />
                  <el-option
                    :label="$t('deviceManage.emergencyBackupMode')"
                    value="4"
                  />
                  <el-option
                    :label="$t('deviceManage.acBackupMode')"
                    value="5"
                  />
                  <el-option :label="$t('deviceManage.purePVMode')" value="6" />
                  <el-option
                    :label="$t('deviceManage.forcedOffGridMode')"
                    value="7"
                  />
                </el-select>
                <el-button
                  type="text"
                  style="margin-left: 5px"
                  v-if="timeSettingIsSet('specialDateThreeObj', 'HM6_0X03_106')"
                  @click="
                    handleSave11(
                      'HM6_0X03_106',
                      subList.specialDateThreeObj.HM6_0X03_106Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>

        <el-card style="margin-top: 10px">
          <el-descriptions :column="3" border>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_107')"
              v-if="timeSettingIsDisplay('specialDateFourObj', 'HM6_0X03_107')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.specialDateFourObj.HM6_0X03_107Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('specialDateFourObj', 'HM6_0X03_107')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_107',
                      subList.specialDateFourObj.HM6_0X03_107Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_108')"
              v-if="timeSettingIsDisplay('specialDateFourObj', 'HM6_0X03_108')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.specialDateFourObj.HM6_0X03_108Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('specialDateFourObj', 'HM6_0X03_108')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_108',
                      subList.specialDateFourObj.HM6_0X03_108Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_109')"
              v-if="timeSettingIsDisplay('specialDateFourObj', 'HM6_0X03_109')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.specialDateFourObj.HM6_0X03_109Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('specialDateFourObj', 'HM6_0X03_109')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_109',
                      subList.specialDateFourObj.HM6_0X03_109Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_110')"
              v-if="timeSettingIsDisplay('specialDateFourObj', 'HM6_0X03_110')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.specialDateFourObj.HM6_0X03_110Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('specialDateFourObj', 'HM6_0X03_110')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_110',
                      subList.specialDateFourObj.HM6_0X03_110Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_111')"
              v-if="timeSettingIsDisplay('specialDateFourObj', 'HM6_0X03_111')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.specialDateFourObj.HM6_0X03_111Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('specialDateFourObj', 'HM6_0X03_111')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_111',
                      subList.specialDateFourObj.HM6_0X03_111Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_112')"
              v-if="timeSettingIsDisplay('specialDateFourObj', 'HM6_0X03_112')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.specialDateFourObj.HM6_0X03_112Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('specialDateFourObj', 'HM6_0X03_112')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_112',
                      subList.specialDateFourObj.HM6_0X03_112Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_113')"
              v-if="timeSettingIsDisplay('specialDateFourObj', 'HM6_0X03_113')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.specialDateFourObj.HM6_0X03_113Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('specialDateFourObj', 'HM6_0X03_113')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_113',
                      subList.specialDateFourObj.HM6_0X03_113Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_114')"
              v-if="timeSettingIsDisplay('specialDateFourObj', 'HM6_0X03_114')"
            >
              <div style="display: flex">
                <el-select
                  v-model="subList.specialDateFourObj.HM6_0X03_114Val"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option
                    :label="$t('deviceManage.batteryPriorityMode')"
                    value="0"
                  />
                  <el-option
                    :label="$t('deviceManage.homeLoadPriorityMode')"
                    value="1"
                  />
                  <el-option
                    :label="$t('deviceManage.gridPriorityMode')"
                    value="2"
                  />
                  <el-option
                    :label="$t('deviceManage.fullPowerFeedMode')"
                    value="3"
                  />
                  <el-option
                    :label="$t('deviceManage.emergencyBackupMode')"
                    value="4"
                  />
                  <el-option
                    :label="$t('deviceManage.acBackupMode')"
                    value="5"
                  />
                  <el-option :label="$t('deviceManage.purePVMode')" value="6" />
                  <el-option
                    :label="$t('deviceManage.forcedOffGridMode')"
                    value="7"
                  />
                </el-select>
                <el-button
                  type="text"
                  style="margin-left: 5px"
                  v-if="timeSettingIsSet('specialDateFourObj', 'HM6_0X03_114')"
                  @click="
                    handleSave11(
                      'HM6_0X03_114',
                      subList.specialDateFourObj.HM6_0X03_114Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_115')"
              v-if="timeSettingIsDisplay('specialDateFourObj', 'HM6_0X03_115')"
            >
              <div style="display: flex">
                <el-select
                  v-model="subList.specialDateFourObj.HM6_0X03_115Val"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option
                    :label="$t('deviceManage.batteryPriorityMode')"
                    value="0"
                  />
                  <el-option
                    :label="$t('deviceManage.homeLoadPriorityMode')"
                    value="1"
                  />
                  <el-option
                    :label="$t('deviceManage.gridPriorityMode')"
                    value="2"
                  />
                  <el-option
                    :label="$t('deviceManage.fullPowerFeedMode')"
                    value="3"
                  />
                  <el-option
                    :label="$t('deviceManage.emergencyBackupMode')"
                    value="4"
                  />
                  <el-option
                    :label="$t('deviceManage.acBackupMode')"
                    value="5"
                  />
                  <el-option :label="$t('deviceManage.purePVMode')" value="6" />
                  <el-option
                    :label="$t('deviceManage.forcedOffGridMode')"
                    value="7"
                  />
                </el-select>
                <el-button
                  type="text"
                  style="margin-left: 5px"
                  v-if="timeSettingIsSet('specialDateFourObj', 'HM6_0X03_115')"
                  @click="
                    handleSave11(
                      'HM6_0X03_115',
                      subList.specialDateFourObj.HM6_0X03_115Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>

        <el-card style="margin-top: 10px">
          <el-descriptions :column="3" border>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_116')"
              v-if="timeSettingIsDisplay('specialDateFiveObj', 'HM6_0X03_116')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.specialDateFiveObj.HM6_0X03_116Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('specialDateFiveObj', 'HM6_0X03_116')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_116',
                      subList.specialDateFiveObj.HM6_0X03_116Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_117')"
              v-if="timeSettingIsDisplay('specialDateFiveObj', 'HM6_0X03_117')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.specialDateFiveObj.HM6_0X03_117Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('specialDateFiveObj', 'HM6_0X03_117')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_117',
                      subList.specialDateFiveObj.HM6_0X03_117Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_118')"
              v-if="timeSettingIsDisplay('specialDateFiveObj', 'HM6_0X03_118')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.specialDateFiveObj.HM6_0X03_118Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('specialDateFiveObj', 'HM6_0X03_118')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_118',
                      subList.specialDateFiveObj.HM6_0X03_118Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_119')"
              v-if="timeSettingIsDisplay('specialDateFiveObj', 'HM6_0X03_119')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.specialDateFiveObj.HM6_0X03_119Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('specialDateFiveObj', 'HM6_0X03_119')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_119',
                      subList.specialDateFiveObj.HM6_0X03_119Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_120')"
              v-if="timeSettingIsDisplay('specialDateFiveObj', 'HM6_0X03_120')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.specialDateFiveObj.HM6_0X03_120Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('specialDateFiveObj', 'HM6_0X03_120')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_120',
                      subList.specialDateFiveObj.HM6_0X03_120Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_121')"
              v-if="timeSettingIsDisplay('specialDateFiveObj', 'HM6_0X03_121')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.specialDateFiveObj.HM6_0X03_121Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('specialDateFiveObj', 'HM6_0X03_121')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_121',
                      subList.specialDateFiveObj.HM6_0X03_121Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_122')"
              v-if="timeSettingIsDisplay('specialDateFiveObj', 'HM6_0X03_122')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.specialDateFiveObj.HM6_0X03_122Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('specialDateFiveObj', 'HM6_0X03_122')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_122',
                      subList.specialDateFiveObj.HM6_0X03_122Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_123')"
              v-if="timeSettingIsDisplay('specialDateFiveObj', 'HM6_0X03_123')"
            >
              <div style="display: flex">
                <el-select
                  v-model="subList.specialDateFiveObj.HM6_0X03_123Val"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option
                    :label="$t('deviceManage.batteryPriorityMode')"
                    value="0"
                  />
                  <el-option
                    :label="$t('deviceManage.homeLoadPriorityMode')"
                    value="1"
                  />
                  <el-option
                    :label="$t('deviceManage.gridPriorityMode')"
                    value="2"
                  />
                  <el-option
                    :label="$t('deviceManage.fullPowerFeedMode')"
                    value="3"
                  />
                  <el-option
                    :label="$t('deviceManage.emergencyBackupMode')"
                    value="4"
                  />
                  <el-option
                    :label="$t('deviceManage.acBackupMode')"
                    value="5"
                  />
                  <el-option :label="$t('deviceManage.purePVMode')" value="6" />
                  <el-option
                    :label="$t('deviceManage.forcedOffGridMode')"
                    value="7"
                  />
                </el-select>
                <el-button
                  type="text"
                  style="margin-left: 5px"
                  v-if="timeSettingIsSet('specialDateFiveObj', 'HM6_0X03_123')"
                  @click="
                    handleSave11(
                      'HM6_0X03_123',
                      subList.specialDateFiveObj.HM6_0X03_123Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_124')"
              v-if="timeSettingIsDisplay('specialDateFiveObj', 'HM6_0X03_124')"
            >
              <div style="display: flex">
                <el-select
                  v-model="subList.specialDateFiveObj.HM6_0X03_124Val"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option
                    :label="$t('deviceManage.batteryPriorityMode')"
                    value="0"
                  />
                  <el-option
                    :label="$t('deviceManage.homeLoadPriorityMode')"
                    value="1"
                  />
                  <el-option
                    :label="$t('deviceManage.gridPriorityMode')"
                    value="2"
                  />
                  <el-option
                    :label="$t('deviceManage.fullPowerFeedMode')"
                    value="3"
                  />
                  <el-option
                    :label="$t('deviceManage.emergencyBackupMode')"
                    value="4"
                  />
                  <el-option
                    :label="$t('deviceManage.acBackupMode')"
                    value="5"
                  />
                  <el-option :label="$t('deviceManage.purePVMode')" value="6" />
                  <el-option
                    :label="$t('deviceManage.forcedOffGridMode')"
                    value="7"
                  />
                </el-select>
                <el-button
                  type="text"
                  style="margin-left: 5px"
                  v-if="timeSettingIsSet('specialDateFiveObj', 'HM6_0X03_124')"
                  @click="
                    handleSave11(
                      'HM6_0X03_124',
                      subList.specialDateFiveObj.HM6_0X03_124Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>

        <el-card style="margin-top: 10px">
          <el-descriptions :column="3" border>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_128')"
              v-if="timeSettingIsDisplay('quarterOneObj', 'HM6_0X03_128')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.quarterOneObj.HM6_0X03_128Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('quarterOneObj', 'HM6_0X03_128')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_128',
                      subList.quarterOneObj.HM6_0X03_128Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_129')"
              v-if="timeSettingIsDisplay('quarterOneObj', 'HM6_0X03_129')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.quarterOneObj.HM6_0X03_129Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('quarterOneObj', 'HM6_0X03_129')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_129',
                      subList.quarterOneObj.HM6_0X03_129Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_130')"
              v-if="timeSettingIsDisplay('quarterOneObj', 'HM6_0X03_130')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.quarterOneObj.HM6_0X03_130Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('quarterOneObj', 'HM6_0X03_130')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_130',
                      subList.quarterOneObj.HM6_0X03_130Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_131')"
              v-if="timeSettingIsDisplay('quarterOneObj', 'HM6_0X03_131')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.quarterOneObj.HM6_0X03_131Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('quarterOneObj', 'HM6_0X03_131')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_131',
                      subList.quarterOneObj.HM6_0X03_131Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_132')"
              v-if="timeSettingIsDisplay('quarterOneObj', 'HM6_0X03_132')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.quarterOneObj.HM6_0X03_132Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('quarterOneObj', 'HM6_0X03_132')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_132',
                      subList.quarterOneObj.HM6_0X03_132Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_133')"
              v-if="timeSettingIsDisplay('quarterOneObj', 'HM6_0X03_133')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.quarterOneObj.HM6_0X03_133Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('quarterOneObj', 'HM6_0X03_133')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_133',
                      subList.quarterOneObj.HM6_0X03_133Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_134')"
              v-if="timeSettingIsDisplay('quarterOneObj', 'HM6_0X03_134')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.quarterOneObj.HM6_0X03_134Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('quarterOneObj', 'HM6_0X03_134')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_134',
                      subList.quarterOneObj.HM6_0X03_134Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_135')"
              v-if="timeSettingIsDisplay('quarterOneObj', 'HM6_0X03_135')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.quarterOneObj.HM6_0X03_135Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('quarterOneObj', 'HM6_0X03_135')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_135',
                      subList.quarterOneObj.HM6_0X03_135Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_136')"
              v-if="timeSettingIsDisplay('quarterOneObj', 'HM6_0X03_136')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.quarterOneObj.HM6_0X03_136Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('quarterOneObj', 'HM6_0X03_136')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_136',
                      subList.quarterOneObj.HM6_0X03_136Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_137')"
              v-if="timeSettingIsDisplay('quarterOneObj', 'HM6_0X03_137')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.quarterOneObj.HM6_0X03_137Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('quarterOneObj', 'HM6_0X03_137')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_137',
                      subList.quarterOneObj.HM6_0X03_137Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_138')"
              v-if="timeSettingIsDisplay('quarterOneObj', 'HM6_0X03_138')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.quarterOneObj.HM6_0X03_138Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('quarterOneObj', 'HM6_0X03_138')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_138',
                      subList.quarterOneObj.HM6_0X03_138Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_139')"
              v-if="timeSettingIsDisplay('quarterOneObj', 'HM6_0X03_139')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.quarterOneObj.HM6_0X03_139Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('quarterOneObj', 'HM6_0X03_139')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_139',
                      subList.quarterOneObj.HM6_0X03_139Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_140')"
              v-if="timeSettingIsDisplay('quarterOneObj', 'HM6_0X03_140')"
            >
              <div style="display: flex">
                <el-select
                  v-model="subList.quarterOneObj.HM6_0X03_140Val"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option
                    :label="$t('deviceManage.batteryPriorityMode')"
                    value="0"
                  />
                  <el-option
                    :label="$t('deviceManage.homeLoadPriorityMode')"
                    value="1"
                  />
                  <el-option
                    :label="$t('deviceManage.gridPriorityMode')"
                    value="2"
                  />
                  <el-option
                    :label="$t('deviceManage.fullPowerFeedMode')"
                    value="3"
                  />
                  <el-option
                    :label="$t('deviceManage.emergencyBackupMode')"
                    value="4"
                  />
                  <el-option
                    :label="$t('deviceManage.acBackupMode')"
                    value="5"
                  />
                  <el-option :label="$t('deviceManage.purePVMode')" value="6" />
                  <el-option
                    :label="$t('deviceManage.forcedOffGridMode')"
                    value="7"
                  />
                </el-select>
                <el-button
                  type="text"
                  style="margin-left: 5px"
                  v-if="timeSettingIsSet('quarterOneObj', 'HM6_0X03_140')"
                  @click="
                    handleSave11(
                      'HM6_0X03_140',
                      subList.quarterOneObj.HM6_0X03_140Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_141')"
              v-if="timeSettingIsDisplay('quarterOneObj', 'HM6_0X03_141')"
            >
              <div style="display: flex">
                <el-select
                  v-model="subList.quarterOneObj.HM6_0X03_141Val"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option
                    :label="$t('deviceManage.batteryPriorityMode')"
                    value="0"
                  />
                  <el-option
                    :label="$t('deviceManage.homeLoadPriorityMode')"
                    value="1"
                  />
                  <el-option
                    :label="$t('deviceManage.gridPriorityMode')"
                    value="2"
                  />
                  <el-option
                    :label="$t('deviceManage.fullPowerFeedMode')"
                    value="3"
                  />
                  <el-option
                    :label="$t('deviceManage.emergencyBackupMode')"
                    value="4"
                  />
                  <el-option
                    :label="$t('deviceManage.acBackupMode')"
                    value="5"
                  />
                  <el-option :label="$t('deviceManage.purePVMode')" value="6" />
                  <el-option
                    :label="$t('deviceManage.forcedOffGridMode')"
                    value="7"
                  />
                </el-select>
                <el-button
                  type="text"
                  style="margin-left: 5px"
                  v-if="timeSettingIsSet('quarterOneObj', 'HM6_0X03_141')"
                  @click="
                    handleSave11(
                      'HM6_0X03_141',
                      subList.quarterOneObj.HM6_0X03_141Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_142')"
              v-if="timeSettingIsDisplay('quarterOneObj', 'HM6_0X03_142')"
            >
              <div style="display: flex">
                <el-select
                  v-model="subList.quarterOneObj.HM6_0X03_142Val"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option
                    :label="$t('deviceManage.batteryPriorityMode')"
                    value="0"
                  />
                  <el-option
                    :label="$t('deviceManage.homeLoadPriorityMode')"
                    value="1"
                  />
                  <el-option
                    :label="$t('deviceManage.gridPriorityMode')"
                    value="2"
                  />
                  <el-option
                    :label="$t('deviceManage.fullPowerFeedMode')"
                    value="3"
                  />
                  <el-option
                    :label="$t('deviceManage.emergencyBackupMode')"
                    value="4"
                  />
                  <el-option
                    :label="$t('deviceManage.acBackupMode')"
                    value="5"
                  />
                  <el-option :label="$t('deviceManage.purePVMode')" value="6" />
                  <el-option
                    :label="$t('deviceManage.forcedOffGridMode')"
                    value="7"
                  />
                </el-select>
                <el-button
                  type="text"
                  style="margin-left: 5px"
                  v-if="timeSettingIsSet('quarterOneObj', 'HM6_0X03_142')"
                  @click="
                    handleSave11(
                      'HM6_0X03_142',
                      subList.quarterOneObj.HM6_0X03_142Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_143')"
              v-if="timeSettingIsDisplay('quarterOneObj', 'HM6_0X03_143')"
            >
              <div style="display: flex">
                <el-select
                  v-model="subList.quarterOneObj.HM6_0X03_143Val"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option
                    :label="$t('deviceManage.batteryPriorityMode')"
                    value="0"
                  />
                  <el-option
                    :label="$t('deviceManage.homeLoadPriorityMode')"
                    value="1"
                  />
                  <el-option
                    :label="$t('deviceManage.gridPriorityMode')"
                    value="2"
                  />
                  <el-option
                    :label="$t('deviceManage.fullPowerFeedMode')"
                    value="3"
                  />
                  <el-option
                    :label="$t('deviceManage.emergencyBackupMode')"
                    value="4"
                  />
                  <el-option
                    :label="$t('deviceManage.acBackupMode')"
                    value="5"
                  />
                  <el-option :label="$t('deviceManage.purePVMode')" value="6" />
                  <el-option
                    :label="$t('deviceManage.forcedOffGridMode')"
                    value="7"
                  />
                </el-select>
                <el-button
                  type="text"
                  style="margin-left: 5px"
                  v-if="timeSettingIsSet('quarterOneObj', 'HM6_0X03_143')"
                  @click="
                    handleSave11(
                      'HM6_0X03_143',
                      subList.quarterOneObj.HM6_0X03_143Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>

        <el-card style="margin-top: 10px">
          <el-descriptions :column="3" border>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_144')"
              v-if="timeSettingIsDisplay('quarterTwoObj', 'HM6_0X03_144')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.quarterTwoObj.HM6_0X03_144Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('quarterTwoObj', 'HM6_0X03_144')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_144',
                      subList.quarterTwoObj.HM6_0X03_144Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_145')"
              v-if="timeSettingIsDisplay('quarterTwoObj', 'HM6_0X03_145')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.quarterTwoObj.HM6_0X03_145Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('quarterTwoObj', 'HM6_0X03_145')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_145',
                      subList.quarterTwoObj.HM6_0X03_145Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_146')"
              v-if="timeSettingIsDisplay('quarterTwoObj', 'HM6_0X03_146')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.quarterTwoObj.HM6_0X03_146Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('quarterTwoObj', 'HM6_0X03_146')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_146',
                      subList.quarterTwoObj.HM6_0X03_146Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_147')"
              v-if="timeSettingIsDisplay('quarterTwoObj', 'HM6_0X03_147')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.quarterTwoObj.HM6_0X03_147Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('quarterTwoObj', 'HM6_0X03_147')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_147',
                      subList.quarterTwoObj.HM6_0X03_147Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_148')"
              v-if="timeSettingIsDisplay('quarterTwoObj', 'HM6_0X03_148')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.quarterTwoObj.HM6_0X03_148Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('quarterTwoObj', 'HM6_0X03_148')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_148',
                      subList.quarterTwoObj.HM6_0X03_148Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_149')"
              v-if="timeSettingIsDisplay('quarterTwoObj', 'HM6_0X03_149')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.quarterTwoObj.HM6_0X03_149Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('quarterTwoObj', 'HM6_0X03_149')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_149',
                      subList.quarterTwoObj.HM6_0X03_149Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_150')"
              v-if="timeSettingIsDisplay('quarterTwoObj', 'HM6_0X03_150')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.quarterTwoObj.HM6_0X03_150Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('quarterTwoObj', 'HM6_0X03_150')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_150',
                      subList.quarterTwoObj.HM6_0X03_150Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_151')"
              v-if="timeSettingIsDisplay('quarterTwoObj', 'HM6_0X03_151')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.quarterTwoObj.HM6_0X03_151Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('quarterTwoObj', 'HM6_0X03_151')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_151',
                      subList.quarterTwoObj.HM6_0X03_151Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_152')"
              v-if="timeSettingIsDisplay('quarterTwoObj', 'HM6_0X03_152')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.quarterTwoObj.HM6_0X03_152Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('quarterTwoObj', 'HM6_0X03_152')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_152',
                      subList.quarterTwoObj.HM6_0X03_152Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_153')"
              v-if="timeSettingIsDisplay('quarterTwoObj', 'HM6_0X03_153')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.quarterTwoObj.HM6_0X03_153Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('quarterTwoObj', 'HM6_0X03_153')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_153',
                      subList.quarterTwoObj.HM6_0X03_153Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_154')"
              v-if="timeSettingIsDisplay('quarterTwoObj', 'HM6_0X03_154')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.quarterTwoObj.HM6_0X03_154Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('quarterTwoObj', 'HM6_0X03_154')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_154',
                      subList.quarterTwoObj.HM6_0X03_154Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_155')"
              v-if="timeSettingIsDisplay('quarterTwoObj', 'HM6_0X03_155')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.quarterTwoObj.HM6_0X03_155Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('quarterTwoObj', 'HM6_0X03_155')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_155',
                      subList.quarterTwoObj.HM6_0X03_155Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_156')"
              v-if="timeSettingIsDisplay('quarterTwoObj', 'HM6_0X03_156')"
            >
              <div style="display: flex">
                <el-select
                  v-model="subList.quarterTwoObj.HM6_0X03_156Val"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option
                    :label="$t('deviceManage.batteryPriorityMode')"
                    value="0"
                  />
                  <el-option
                    :label="$t('deviceManage.homeLoadPriorityMode')"
                    value="1"
                  />
                  <el-option
                    :label="$t('deviceManage.gridPriorityMode')"
                    value="2"
                  />
                  <el-option
                    :label="$t('deviceManage.fullPowerFeedMode')"
                    value="3"
                  />
                  <el-option
                    :label="$t('deviceManage.emergencyBackupMode')"
                    value="4"
                  />
                  <el-option
                    :label="$t('deviceManage.acBackupMode')"
                    value="5"
                  />
                  <el-option :label="$t('deviceManage.purePVMode')" value="6" />
                  <el-option
                    :label="$t('deviceManage.forcedOffGridMode')"
                    value="7"
                  />
                </el-select>
                <el-button
                  type="text"
                  style="margin-left: 5px"
                  v-if="timeSettingIsSet('quarterTwoObj', 'HM6_0X03_156')"
                  @click="
                    handleSave11(
                      'HM6_0X03_156',
                      subList.quarterTwoObj.HM6_0X03_156Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_157')"
              v-if="timeSettingIsDisplay('quarterTwoObj', 'HM6_0X03_157')"
            >
              <div style="display: flex">
                <el-select
                  v-model="subList.quarterTwoObj.HM6_0X03_157Val"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option
                    :label="$t('deviceManage.batteryPriorityMode')"
                    value="0"
                  />
                  <el-option
                    :label="$t('deviceManage.homeLoadPriorityMode')"
                    value="1"
                  />
                  <el-option
                    :label="$t('deviceManage.gridPriorityMode')"
                    value="2"
                  />
                  <el-option
                    :label="$t('deviceManage.fullPowerFeedMode')"
                    value="3"
                  />
                  <el-option
                    :label="$t('deviceManage.emergencyBackupMode')"
                    value="4"
                  />
                  <el-option
                    :label="$t('deviceManage.acBackupMode')"
                    value="5"
                  />
                  <el-option :label="$t('deviceManage.purePVMode')" value="6" />
                  <el-option
                    :label="$t('deviceManage.forcedOffGridMode')"
                    value="7"
                  />
                </el-select>
                <el-button
                  type="text"
                  style="margin-left: 5px"
                  v-if="timeSettingIsSet('quarterTwoObj', 'HM6_0X03_157')"
                  @click="
                    handleSave11(
                      'HM6_0X03_157',
                      subList.quarterTwoObj.HM6_0X03_157Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_158')"
              v-if="timeSettingIsDisplay('quarterTwoObj', 'HM6_0X03_158')"
            >
              <div style="display: flex">
                <el-select
                  v-model="subList.quarterTwoObj.HM6_0X03_158Val"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option
                    :label="$t('deviceManage.batteryPriorityMode')"
                    value="0"
                  />
                  <el-option
                    :label="$t('deviceManage.homeLoadPriorityMode')"
                    value="1"
                  />
                  <el-option
                    :label="$t('deviceManage.gridPriorityMode')"
                    value="2"
                  />
                  <el-option
                    :label="$t('deviceManage.fullPowerFeedMode')"
                    value="3"
                  />
                  <el-option
                    :label="$t('deviceManage.emergencyBackupMode')"
                    value="4"
                  />
                  <el-option
                    :label="$t('deviceManage.acBackupMode')"
                    value="5"
                  />
                  <el-option :label="$t('deviceManage.purePVMode')" value="6" />
                  <el-option
                    :label="$t('deviceManage.forcedOffGridMode')"
                    value="7"
                  />
                </el-select>
                <el-button
                  type="text"
                  style="margin-left: 5px"
                  v-if="timeSettingIsSet('quarterTwoObj', 'HM6_0X03_158')"
                  @click="
                    handleSave11(
                      'HM6_0X03_158',
                      subList.quarterTwoObj.HM6_0X03_158Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_159')"
              v-if="timeSettingIsDisplay('quarterTwoObj', 'HM6_0X03_159')"
            >
              <div style="display: flex">
                <el-select
                  v-model="subList.quarterTwoObj.HM6_0X03_159Val"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option
                    :label="$t('deviceManage.batteryPriorityMode')"
                    value="0"
                  />
                  <el-option
                    :label="$t('deviceManage.homeLoadPriorityMode')"
                    value="1"
                  />
                  <el-option
                    :label="$t('deviceManage.gridPriorityMode')"
                    value="2"
                  />
                  <el-option
                    :label="$t('deviceManage.fullPowerFeedMode')"
                    value="3"
                  />
                  <el-option
                    :label="$t('deviceManage.emergencyBackupMode')"
                    value="4"
                  />
                  <el-option
                    :label="$t('deviceManage.acBackupMode')"
                    value="5"
                  />
                  <el-option :label="$t('deviceManage.purePVMode')" value="6" />
                  <el-option
                    :label="$t('deviceManage.forcedOffGridMode')"
                    value="7"
                  />
                </el-select>
                <el-button
                  type="text"
                  style="margin-left: 5px"
                  v-if="timeSettingIsSet('quarterTwoObj', 'HM6_0X03_159')"
                  @click="
                    handleSave11(
                      'HM6_0X03_159',
                      subList.quarterTwoObj.HM6_0X03_159Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>

        <el-card style="margin-top: 10px">
          <el-descriptions :column="3" border>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_160')"
              v-if="timeSettingIsDisplay('quarterThreeObj', 'HM6_0X03_160')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.quarterThreeObj.HM6_0X03_160Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('quarterThreeObj', 'HM6_0X03_160')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_160',
                      subList.quarterThreeObj.HM6_0X03_160Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_161')"
              v-if="timeSettingIsDisplay('quarterThreeObj', 'HM6_0X03_161')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.quarterThreeObj.HM6_0X03_161Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('quarterThreeObj', 'HM6_0X03_161')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_161',
                      subList.quarterThreeObj.HM6_0X03_161Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_162')"
              v-if="timeSettingIsDisplay('quarterThreeObj', 'HM6_0X03_162')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.quarterThreeObj.HM6_0X03_162Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('quarterThreeObj', 'HM6_0X03_162')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_162',
                      subList.quarterThreeObj.HM6_0X03_162Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_163')"
              v-if="timeSettingIsDisplay('quarterThreeObj', 'HM6_0X03_163')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.quarterThreeObj.HM6_0X03_163Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('quarterThreeObj', 'HM6_0X03_163')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_163',
                      subList.quarterThreeObj.HM6_0X03_163Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_164')"
              v-if="timeSettingIsDisplay('quarterThreeObj', 'HM6_0X03_164')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.quarterThreeObj.HM6_0X03_164Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('quarterThreeObj', 'HM6_0X03_164')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_164',
                      subList.quarterThreeObj.HM6_0X03_164Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_165')"
              v-if="timeSettingIsDisplay('quarterThreeObj', 'HM6_0X03_165')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.quarterThreeObj.HM6_0X03_165Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('quarterThreeObj', 'HM6_0X03_165')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_165',
                      subList.quarterThreeObj.HM6_0X03_165Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_166')"
              v-if="timeSettingIsDisplay('quarterThreeObj', 'HM6_0X03_166')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.quarterThreeObj.HM6_0X03_166Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('quarterThreeObj', 'HM6_0X03_166')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_166',
                      subList.quarterThreeObj.HM6_0X03_166Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_167')"
              v-if="timeSettingIsDisplay('quarterThreeObj', 'HM6_0X03_167')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.quarterThreeObj.HM6_0X03_167Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('quarterThreeObj', 'HM6_0X03_167')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_167',
                      subList.quarterThreeObj.HM6_0X03_167Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_168')"
              v-if="timeSettingIsDisplay('quarterThreeObj', 'HM6_0X03_168')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.quarterThreeObj.HM6_0X03_168Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('quarterThreeObj', 'HM6_0X03_168')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_168',
                      subList.quarterThreeObj.HM6_0X03_168Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_169')"
              v-if="timeSettingIsDisplay('quarterThreeObj', 'HM6_0X03_169')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.quarterThreeObj.HM6_0X03_169Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('quarterThreeObj', 'HM6_0X03_169')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_169',
                      subList.quarterThreeObj.HM6_0X03_169Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_170')"
              v-if="timeSettingIsDisplay('quarterThreeObj', 'HM6_0X03_170')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.quarterThreeObj.HM6_0X03_170Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('quarterThreeObj', 'HM6_0X03_170')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_170',
                      subList.quarterThreeObj.HM6_0X03_170Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_171')"
              v-if="timeSettingIsDisplay('quarterThreeObj', 'HM6_0X03_171')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.quarterThreeObj.HM6_0X03_171Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('quarterThreeObj', 'HM6_0X03_171')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_171',
                      subList.quarterThreeObj.HM6_0X03_171Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_172')"
              v-if="timeSettingIsDisplay('quarterThreeObj', 'HM6_0X03_172')"
            >
              <div style="display: flex">
                <el-select
                  v-model="subList.quarterThreeObj.HM6_0X03_172Val"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option
                    :label="$t('deviceManage.batteryPriorityMode')"
                    value="0"
                  />
                  <el-option
                    :label="$t('deviceManage.homeLoadPriorityMode')"
                    value="1"
                  />
                  <el-option
                    :label="$t('deviceManage.gridPriorityMode')"
                    value="2"
                  />
                  <el-option
                    :label="$t('deviceManage.fullPowerFeedMode')"
                    value="3"
                  />
                  <el-option
                    :label="$t('deviceManage.emergencyBackupMode')"
                    value="4"
                  />
                  <el-option
                    :label="$t('deviceManage.acBackupMode')"
                    value="5"
                  />
                  <el-option :label="$t('deviceManage.purePVMode')" value="6" />
                  <el-option
                    :label="$t('deviceManage.forcedOffGridMode')"
                    value="7"
                  />
                </el-select>
                <el-button
                  type="text"
                  style="margin-left: 5px"
                  v-if="timeSettingIsSet('quarterThreeObj', 'HM6_0X03_172')"
                  @click="
                    handleSave11(
                      'HM6_0X03_172',
                      subList.quarterThreeObj.HM6_0X03_172Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_173')"
              v-if="timeSettingIsDisplay('quarterThreeObj', 'HM6_0X03_173')"
            >
              <div style="display: flex">
                <el-select
                  v-model="subList.quarterThreeObj.HM6_0X03_173Val"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option
                    :label="$t('deviceManage.batteryPriorityMode')"
                    value="0"
                  />
                  <el-option
                    :label="$t('deviceManage.homeLoadPriorityMode')"
                    value="1"
                  />
                  <el-option
                    :label="$t('deviceManage.gridPriorityMode')"
                    value="2"
                  />
                  <el-option
                    :label="$t('deviceManage.fullPowerFeedMode')"
                    value="3"
                  />
                  <el-option
                    :label="$t('deviceManage.emergencyBackupMode')"
                    value="4"
                  />
                  <el-option
                    :label="$t('deviceManage.acBackupMode')"
                    value="5"
                  />
                  <el-option :label="$t('deviceManage.purePVMode')" value="6" />
                  <el-option
                    :label="$t('deviceManage.forcedOffGridMode')"
                    value="7"
                  />
                </el-select>
                <el-button
                  type="text"
                  style="margin-left: 5px"
                  v-if="timeSettingIsSet('quarterThreeObj', 'HM6_0X03_173')"
                  @click="
                    handleSave11(
                      'HM6_0X03_173',
                      subList.quarterThreeObj.HM6_0X03_173Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_174')"
              v-if="timeSettingIsDisplay('quarterThreeObj', 'HM6_0X03_174')"
            >
              <div style="display: flex">
                <el-select
                  v-model="subList.quarterThreeObj.HM6_0X03_174Val"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option
                    :label="$t('deviceManage.batteryPriorityMode')"
                    value="0"
                  />
                  <el-option
                    :label="$t('deviceManage.homeLoadPriorityMode')"
                    value="1"
                  />
                  <el-option
                    :label="$t('deviceManage.gridPriorityMode')"
                    value="2"
                  />
                  <el-option
                    :label="$t('deviceManage.fullPowerFeedMode')"
                    value="3"
                  />
                  <el-option
                    :label="$t('deviceManage.emergencyBackupMode')"
                    value="4"
                  />
                  <el-option
                    :label="$t('deviceManage.acBackupMode')"
                    value="5"
                  />
                  <el-option :label="$t('deviceManage.purePVMode')" value="6" />
                  <el-option
                    :label="$t('deviceManage.forcedOffGridMode')"
                    value="7"
                  />
                </el-select>
                <el-button
                  type="text"
                  style="margin-left: 5px"
                  v-if="timeSettingIsSet('quarterThreeObj', 'HM6_0X03_174')"
                  @click="
                    handleSave11(
                      'HM6_0X03_174',
                      subList.quarterThreeObj.HM6_0X03_174Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_175')"
              v-if="timeSettingIsDisplay('quarterThreeObj', 'HM6_0X03_175')"
            >
              <div style="display: flex">
                <el-select
                  v-model="subList.quarterThreeObj.HM6_0X03_175Val"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option
                    :label="$t('deviceManage.batteryPriorityMode')"
                    value="0"
                  />
                  <el-option
                    :label="$t('deviceManage.homeLoadPriorityMode')"
                    value="1"
                  />
                  <el-option
                    :label="$t('deviceManage.gridPriorityMode')"
                    value="2"
                  />
                  <el-option
                    :label="$t('deviceManage.fullPowerFeedMode')"
                    value="3"
                  />
                  <el-option
                    :label="$t('deviceManage.emergencyBackupMode')"
                    value="4"
                  />
                  <el-option
                    :label="$t('deviceManage.acBackupMode')"
                    value="5"
                  />
                  <el-option :label="$t('deviceManage.purePVMode')" value="6" />
                  <el-option
                    :label="$t('deviceManage.forcedOffGridMode')"
                    value="7"
                  />
                </el-select>
                <el-button
                  type="text"
                  style="margin-left: 5px"
                  v-if="timeSettingIsSet('quarterThreeObj', 'HM6_0X03_175')"
                  @click="
                    handleSave11(
                      'HM6_0X03_175',
                      subList.quarterThreeObj.HM6_0X03_175Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>

        <el-card style="margin-top: 10px">
          <el-descriptions :column="3" border>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_176')"
              v-if="timeSettingIsDisplay('quarterFourObj', 'HM6_0X03_176')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.quarterFourObj.HM6_0X03_176Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('quarterFourObj', 'HM6_0X03_176')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_176',
                      subList.quarterFourObj.HM6_0X03_176Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_177')"
              v-if="timeSettingIsDisplay('quarterFourObj', 'HM6_0X03_177')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.quarterFourObj.HM6_0X03_177Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('quarterFourObj', 'HM6_0X03_177')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_177',
                      subList.quarterFourObj.HM6_0X03_177Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_178')"
              v-if="timeSettingIsDisplay('quarterFourObj', 'HM6_0X03_178')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.quarterFourObj.HM6_0X03_178Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('quarterFourObj', 'HM6_0X03_178')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_178',
                      subList.quarterFourObj.HM6_0X03_178Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_179')"
              v-if="timeSettingIsDisplay('quarterFourObj', 'HM6_0X03_179')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.quarterFourObj.HM6_0X03_179Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('quarterFourObj', 'HM6_0X03_179')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_179',
                      subList.quarterFourObj.HM6_0X03_179Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_180')"
              v-if="timeSettingIsDisplay('quarterFourObj', 'HM6_0X03_180')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.quarterFourObj.HM6_0X03_180Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('quarterFourObj', 'HM6_0X03_180')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_180',
                      subList.quarterFourObj.HM6_0X03_180Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_181')"
              v-if="timeSettingIsDisplay('quarterFourObj', 'HM6_0X03_181')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.quarterFourObj.HM6_0X03_181Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('quarterFourObj', 'HM6_0X03_181')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_181',
                      subList.quarterFourObj.HM6_0X03_181Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_182')"
              v-if="timeSettingIsDisplay('quarterFourObj', 'HM6_0X03_182')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.quarterFourObj.HM6_0X03_182Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('quarterFourObj', 'HM6_0X03_182')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_182',
                      subList.quarterFourObj.HM6_0X03_182Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_183')"
              v-if="timeSettingIsDisplay('quarterFourObj', 'HM6_0X03_183')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.quarterFourObj.HM6_0X03_183Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('quarterFourObj', 'HM6_0X03_183')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_183',
                      subList.quarterFourObj.HM6_0X03_183Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_184')"
              v-if="timeSettingIsDisplay('quarterFourObj', 'HM6_0X03_184')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.quarterFourObj.HM6_0X03_184Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('quarterFourObj', 'HM6_0X03_184')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_184',
                      subList.quarterFourObj.HM6_0X03_184Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_185')"
              v-if="timeSettingIsDisplay('quarterFourObj', 'HM6_0X03_185')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.quarterFourObj.HM6_0X03_185Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('quarterFourObj', 'HM6_0X03_185')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_185',
                      subList.quarterFourObj.HM6_0X03_185Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_186')"
              v-if="timeSettingIsDisplay('quarterFourObj', 'HM6_0X03_186')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.quarterFourObj.HM6_0X03_186Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('quarterFourObj', 'HM6_0X03_186')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_186',
                      subList.quarterFourObj.HM6_0X03_186Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_187')"
              v-if="timeSettingIsDisplay('quarterFourObj', 'HM6_0X03_187')"
            >
              <div style="display: flex">
                <el-input
                  v-model="subList.quarterFourObj.HM6_0X03_187Val"
                  :placeholder="$t('common.inputPrompt')"
                />
                <el-button
                  v-if="timeSettingIsSet('quarterFourObj', 'HM6_0X03_187')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_187',
                      subList.quarterFourObj.HM6_0X03_187Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_188')"
              v-if="timeSettingIsDisplay('quarterFourObj', 'HM6_0X03_188')"
            >
              <div style="display: flex">
                <el-select
                  v-model="subList.quarterFourObj.HM6_0X03_188Val"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option
                    :label="$t('deviceManage.batteryPriorityMode')"
                    value="0"
                  />
                  <el-option
                    :label="$t('deviceManage.homeLoadPriorityMode')"
                    value="1"
                  />
                  <el-option
                    :label="$t('deviceManage.gridPriorityMode')"
                    value="2"
                  />
                  <el-option
                    :label="$t('deviceManage.fullPowerFeedMode')"
                    value="3"
                  />
                  <el-option
                    :label="$t('deviceManage.emergencyBackupMode')"
                    value="4"
                  />
                  <el-option
                    :label="$t('deviceManage.acBackupMode')"
                    value="5"
                  />
                  <el-option :label="$t('deviceManage.purePVMode')" value="6" />
                  <el-option
                    :label="$t('deviceManage.forcedOffGridMode')"
                    value="7"
                  />
                </el-select>
                <el-button
                  type="text"
                  style="margin-left: 5px"
                  v-if="timeSettingIsSet('quarterFourObj', 'HM6_0X03_188')"
                  @click="
                    handleSave11(
                      'HM6_0X03_188',
                      subList.quarterFourObj.HM6_0X03_188Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_189')"
              v-if="timeSettingIsDisplay('quarterFourObj', 'HM6_0X03_189')"
            >
              <div style="display: flex">
                <el-select
                  v-model="subList.quarterFourObj.HM6_0X03_189Val"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option
                    :label="$t('deviceManage.batteryPriorityMode')"
                    value="0"
                  />
                  <el-option
                    :label="$t('deviceManage.homeLoadPriorityMode')"
                    value="1"
                  />
                  <el-option
                    :label="$t('deviceManage.gridPriorityMode')"
                    value="2"
                  />
                  <el-option
                    :label="$t('deviceManage.fullPowerFeedMode')"
                    value="3"
                  />
                  <el-option
                    :label="$t('deviceManage.emergencyBackupMode')"
                    value="4"
                  />
                  <el-option
                    :label="$t('deviceManage.acBackupMode')"
                    value="5"
                  />
                  <el-option :label="$t('deviceManage.purePVMode')" value="6" />
                  <el-option
                    :label="$t('deviceManage.forcedOffGridMode')"
                    value="7"
                  />
                </el-select>
                <el-button
                  type="text"
                  style="margin-left: 5px"
                  v-if="timeSettingIsSet('quarterFourObj', 'HM6_0X03_189')"
                  @click="
                    handleSave11(
                      'HM6_0X03_189',
                      subList.quarterFourObj.HM6_0X03_189Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_190')"
              v-if="timeSettingIsDisplay('quarterFourObj', 'HM6_0X03_190')"
            >
              <div style="display: flex">
                <el-select
                  v-model="subList.quarterFourObj.HM6_0X03_190Val"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option
                    :label="$t('deviceManage.batteryPriorityMode')"
                    value="0"
                  />
                  <el-option
                    :label="$t('deviceManage.homeLoadPriorityMode')"
                    value="1"
                  />
                  <el-option
                    :label="$t('deviceManage.gridPriorityMode')"
                    value="2"
                  />
                  <el-option
                    :label="$t('deviceManage.fullPowerFeedMode')"
                    value="3"
                  />
                  <el-option
                    :label="$t('deviceManage.emergencyBackupMode')"
                    value="4"
                  />
                  <el-option
                    :label="$t('deviceManage.acBackupMode')"
                    value="5"
                  />
                  <el-option :label="$t('deviceManage.purePVMode')" value="6" />
                  <el-option
                    :label="$t('deviceManage.forcedOffGridMode')"
                    value="7"
                  />
                </el-select>
                <el-button
                  type="text"
                  style="margin-left: 5px"
                  v-if="timeSettingIsSet('quarterFourObj', 'HM6_0X03_190')"
                  @click="
                    handleSave11(
                      'HM6_0X03_190',
                      subList.quarterFourObj.HM6_0X03_190Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_191')"
              v-if="timeSettingIsDisplay('quarterFourObj', 'HM6_0X03_191')"
            >
              <div style="display: flex">
                <el-select
                  v-model="subList.quarterFourObj.HM6_0X03_191Val"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option
                    :label="$t('deviceManage.batteryPriorityMode')"
                    value="0"
                  />
                  <el-option
                    :label="$t('deviceManage.homeLoadPriorityMode')"
                    value="1"
                  />
                  <el-option
                    :label="$t('deviceManage.gridPriorityMode')"
                    value="2"
                  />
                  <el-option
                    :label="$t('deviceManage.fullPowerFeedMode')"
                    value="3"
                  />
                  <el-option
                    :label="$t('deviceManage.emergencyBackupMode')"
                    value="4"
                  />
                  <el-option
                    :label="$t('deviceManage.acBackupMode')"
                    value="5"
                  />
                  <el-option :label="$t('deviceManage.purePVMode')" value="6" />
                  <el-option
                    :label="$t('deviceManage.forcedOffGridMode')"
                    value="7"
                  />
                </el-select>
                <el-button
                  type="text"
                  style="margin-left: 5px"
                  v-if="timeSettingIsSet('quarterFourObj', 'HM6_0X03_191')"
                  @click="
                    handleSave11(
                      'HM6_0X03_191',
                      subList.quarterFourObj.HM6_0X03_191Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>

        <el-card style="margin-top: 10px">
          <el-descriptions :column="3" border>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_196')"
              v-if="timeSettingIsDisplay('hourSettingObj', 'HM6_0X03_196')"
            >
              <div style="display: flex">
                <el-select
                  v-model="subList.hourSettingObj.HM6_0X03_196Val"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option
                    :label="$t('deviceManage.batteryPriorityMode')"
                    value="0"
                  />
                  <el-option
                    :label="$t('deviceManage.homeLoadPriorityMode')"
                    value="1"
                  />
                  <el-option
                    :label="$t('deviceManage.gridPriorityMode')"
                    value="2"
                  />
                  <el-option
                    :label="$t('deviceManage.fullPowerFeedMode')"
                    value="3"
                  />
                  <el-option
                    :label="$t('deviceManage.emergencyBackupMode')"
                    value="4"
                  />
                  <el-option
                    :label="$t('deviceManage.acBackupMode')"
                    value="5"
                  />
                  <el-option :label="$t('deviceManage.purePVMode')" value="6" />
                  <el-option
                    :label="$t('deviceManage.forcedOffGridMode')"
                    value="7"
                  />
                </el-select>
                <el-button
                  v-if="timeSettingIsSet('hourSettingObj', 'HM6_0X03_196')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_196',
                      subList.hourSettingObj.HM6_0X03_196Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_197')"
              v-if="timeSettingIsDisplay('hourSettingObj', 'HM6_0X03_197')"
            >
              <div style="display: flex">
                <el-select
                  v-model="subList.hourSettingObj.HM6_0X03_197Val"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option
                    :label="$t('deviceManage.batteryPriorityMode')"
                    value="0"
                  />
                  <el-option
                    :label="$t('deviceManage.homeLoadPriorityMode')"
                    value="1"
                  />
                  <el-option
                    :label="$t('deviceManage.gridPriorityMode')"
                    value="2"
                  />
                  <el-option
                    :label="$t('deviceManage.fullPowerFeedMode')"
                    value="3"
                  />
                  <el-option
                    :label="$t('deviceManage.emergencyBackupMode')"
                    value="4"
                  />
                  <el-option
                    :label="$t('deviceManage.acBackupMode')"
                    value="5"
                  />
                  <el-option :label="$t('deviceManage.purePVMode')" value="6" />
                  <el-option
                    :label="$t('deviceManage.forcedOffGridMode')"
                    value="7"
                  />
                </el-select>
                <el-button
                  v-if="timeSettingIsSet('hourSettingObj', 'HM6_0X03_197')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_197',
                      subList.hourSettingObj.HM6_0X03_197Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_198')"
              v-if="timeSettingIsDisplay('hourSettingObj', 'HM6_0X03_198')"
            >
              <div style="display: flex">
                <el-select
                  v-model="subList.hourSettingObj.HM6_0X03_198Val"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option
                    :label="$t('deviceManage.batteryPriorityMode')"
                    value="0"
                  />
                  <el-option
                    :label="$t('deviceManage.homeLoadPriorityMode')"
                    value="1"
                  />
                  <el-option
                    :label="$t('deviceManage.gridPriorityMode')"
                    value="2"
                  />
                  <el-option
                    :label="$t('deviceManage.fullPowerFeedMode')"
                    value="3"
                  />
                  <el-option
                    :label="$t('deviceManage.emergencyBackupMode')"
                    value="4"
                  />
                  <el-option
                    :label="$t('deviceManage.acBackupMode')"
                    value="5"
                  />
                  <el-option :label="$t('deviceManage.purePVMode')" value="6" />
                  <el-option
                    :label="$t('deviceManage.forcedOffGridMode')"
                    value="7"
                  />
                </el-select>
                <el-button
                  v-if="timeSettingIsSet('hourSettingObj', 'HM6_0X03_198')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_198',
                      subList.hourSettingObj.HM6_0X03_198Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_199')"
              v-if="timeSettingIsDisplay('hourSettingObj', 'HM6_0X03_199')"
            >
              <div style="display: flex">
                <el-select
                  v-model="subList.hourSettingObj.HM6_0X03_199Val"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option
                    :label="$t('deviceManage.batteryPriorityMode')"
                    value="0"
                  />
                  <el-option
                    :label="$t('deviceManage.homeLoadPriorityMode')"
                    value="1"
                  />
                  <el-option
                    :label="$t('deviceManage.gridPriorityMode')"
                    value="2"
                  />
                  <el-option
                    :label="$t('deviceManage.fullPowerFeedMode')"
                    value="3"
                  />
                  <el-option
                    :label="$t('deviceManage.emergencyBackupMode')"
                    value="4"
                  />
                  <el-option
                    :label="$t('deviceManage.acBackupMode')"
                    value="5"
                  />
                  <el-option :label="$t('deviceManage.purePVMode')" value="6" />
                  <el-option
                    :label="$t('deviceManage.forcedOffGridMode')"
                    value="7"
                  />
                </el-select>
                <el-button
                  v-if="timeSettingIsSet('hourSettingObj', 'HM6_0X03_199')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_199',
                      subList.hourSettingObj.HM6_0X03_199Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_200')"
              v-if="timeSettingIsDisplay('hourSettingObj', 'HM6_0X03_200')"
            >
              <div style="display: flex">
                <el-select
                  v-model="subList.hourSettingObj.HM6_0X03_200Val"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option
                    :label="$t('deviceManage.batteryPriorityMode')"
                    value="0"
                  />
                  <el-option
                    :label="$t('deviceManage.homeLoadPriorityMode')"
                    value="1"
                  />
                  <el-option
                    :label="$t('deviceManage.gridPriorityMode')"
                    value="2"
                  />
                  <el-option
                    :label="$t('deviceManage.fullPowerFeedMode')"
                    value="3"
                  />
                  <el-option
                    :label="$t('deviceManage.emergencyBackupMode')"
                    value="4"
                  />
                  <el-option
                    :label="$t('deviceManage.acBackupMode')"
                    value="5"
                  />
                  <el-option :label="$t('deviceManage.purePVMode')" value="6" />
                  <el-option
                    :label="$t('deviceManage.forcedOffGridMode')"
                    value="7"
                  />
                </el-select>
                <el-button
                  v-if="timeSettingIsSet('hourSettingObj', 'HM6_0X03_200')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_200',
                      subList.hourSettingObj.HM6_0X03_200Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_201')"
              v-if="timeSettingIsDisplay('hourSettingObj', 'HM6_0X03_201')"
            >
              <div style="display: flex">
                <el-select
                  v-model="subList.hourSettingObj.HM6_0X03_201Val"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option
                    :label="$t('deviceManage.batteryPriorityMode')"
                    value="0"
                  />
                  <el-option
                    :label="$t('deviceManage.homeLoadPriorityMode')"
                    value="1"
                  />
                  <el-option
                    :label="$t('deviceManage.gridPriorityMode')"
                    value="2"
                  />
                  <el-option
                    :label="$t('deviceManage.fullPowerFeedMode')"
                    value="3"
                  />
                  <el-option
                    :label="$t('deviceManage.emergencyBackupMode')"
                    value="4"
                  />
                  <el-option
                    :label="$t('deviceManage.acBackupMode')"
                    value="5"
                  />
                  <el-option :label="$t('deviceManage.purePVMode')" value="6" />
                  <el-option
                    :label="$t('deviceManage.forcedOffGridMode')"
                    value="7"
                  />
                </el-select>
                <el-button
                  v-if="timeSettingIsSet('hourSettingObj', 'HM6_0X03_201')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_201',
                      subList.hourSettingObj.HM6_0X03_201Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_202')"
              v-if="timeSettingIsDisplay('hourSettingObj', 'HM6_0X03_202')"
            >
              <div style="display: flex">
                <el-select
                  v-model="subList.hourSettingObj.HM6_0X03_202Val"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option
                    :label="$t('deviceManage.batteryPriorityMode')"
                    value="0"
                  />
                  <el-option
                    :label="$t('deviceManage.homeLoadPriorityMode')"
                    value="1"
                  />
                  <el-option
                    :label="$t('deviceManage.gridPriorityMode')"
                    value="2"
                  />
                  <el-option
                    :label="$t('deviceManage.fullPowerFeedMode')"
                    value="3"
                  />
                  <el-option
                    :label="$t('deviceManage.emergencyBackupMode')"
                    value="4"
                  />
                  <el-option
                    :label="$t('deviceManage.acBackupMode')"
                    value="5"
                  />
                  <el-option :label="$t('deviceManage.purePVMode')" value="6" />
                  <el-option
                    :label="$t('deviceManage.forcedOffGridMode')"
                    value="7"
                  />
                </el-select>
                <el-button
                  v-if="timeSettingIsSet('hourSettingObj', 'HM6_0X03_202')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_202',
                      subList.hourSettingObj.HM6_0X03_202Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_203')"
              v-if="timeSettingIsDisplay('hourSettingObj', 'HM6_0X03_203')"
            >
              <div style="display: flex">
                <el-select
                  v-model="subList.hourSettingObj.HM6_0X03_203Val"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option
                    :label="$t('deviceManage.batteryPriorityMode')"
                    value="0"
                  />
                  <el-option
                    :label="$t('deviceManage.homeLoadPriorityMode')"
                    value="1"
                  />
                  <el-option
                    :label="$t('deviceManage.gridPriorityMode')"
                    value="2"
                  />
                  <el-option
                    :label="$t('deviceManage.fullPowerFeedMode')"
                    value="3"
                  />
                  <el-option
                    :label="$t('deviceManage.emergencyBackupMode')"
                    value="4"
                  />
                  <el-option
                    :label="$t('deviceManage.acBackupMode')"
                    value="5"
                  />
                  <el-option :label="$t('deviceManage.purePVMode')" value="6" />
                  <el-option
                    :label="$t('deviceManage.forcedOffGridMode')"
                    value="7"
                  />
                </el-select>
                <el-button
                  v-if="timeSettingIsSet('hourSettingObj', 'HM6_0X03_203')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_203',
                      subList.hourSettingObj.HM6_0X03_203Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_204')"
              v-if="timeSettingIsDisplay('hourSettingObj', 'HM6_0X03_204')"
            >
              <div style="display: flex">
                <el-select
                  v-model="subList.hourSettingObj.HM6_0X03_204Val"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option
                    :label="$t('deviceManage.batteryPriorityMode')"
                    value="0"
                  />
                  <el-option
                    :label="$t('deviceManage.homeLoadPriorityMode')"
                    value="1"
                  />
                  <el-option
                    :label="$t('deviceManage.gridPriorityMode')"
                    value="2"
                  />
                  <el-option
                    :label="$t('deviceManage.fullPowerFeedMode')"
                    value="3"
                  />
                  <el-option
                    :label="$t('deviceManage.emergencyBackupMode')"
                    value="4"
                  />
                  <el-option
                    :label="$t('deviceManage.acBackupMode')"
                    value="5"
                  />
                  <el-option :label="$t('deviceManage.purePVMode')" value="6" />
                  <el-option
                    :label="$t('deviceManage.forcedOffGridMode')"
                    value="7"
                  />
                </el-select>
                <el-button
                  v-if="timeSettingIsSet('hourSettingObj', 'HM6_0X03_204')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_204',
                      subList.hourSettingObj.HM6_0X03_204Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_205')"
              v-if="timeSettingIsDisplay('hourSettingObj', 'HM6_0X03_205')"
            >
              <div style="display: flex">
                <el-select
                  v-model="subList.hourSettingObj.HM6_0X03_205Val"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option
                    :label="$t('deviceManage.batteryPriorityMode')"
                    value="0"
                  />
                  <el-option
                    :label="$t('deviceManage.homeLoadPriorityMode')"
                    value="1"
                  />
                  <el-option
                    :label="$t('deviceManage.gridPriorityMode')"
                    value="2"
                  />
                  <el-option
                    :label="$t('deviceManage.fullPowerFeedMode')"
                    value="3"
                  />
                  <el-option
                    :label="$t('deviceManage.emergencyBackupMode')"
                    value="4"
                  />
                  <el-option
                    :label="$t('deviceManage.acBackupMode')"
                    value="5"
                  />
                  <el-option :label="$t('deviceManage.purePVMode')" value="6" />
                  <el-option
                    :label="$t('deviceManage.forcedOffGridMode')"
                    value="7"
                  />
                </el-select>
                <el-button
                  v-if="timeSettingIsSet('hourSettingObj', 'HM6_0X03_205')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_205',
                      subList.hourSettingObj.HM6_0X03_205Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_206')"
              v-if="timeSettingIsDisplay('hourSettingObj', 'HM6_0X03_206')"
            >
              <div style="display: flex">
                <el-select
                  v-model="subList.hourSettingObj.HM6_0X03_206Val"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option
                    :label="$t('deviceManage.batteryPriorityMode')"
                    value="0"
                  />
                  <el-option
                    :label="$t('deviceManage.homeLoadPriorityMode')"
                    value="1"
                  />
                  <el-option
                    :label="$t('deviceManage.gridPriorityMode')"
                    value="2"
                  />
                  <el-option
                    :label="$t('deviceManage.fullPowerFeedMode')"
                    value="3"
                  />
                  <el-option
                    :label="$t('deviceManage.emergencyBackupMode')"
                    value="4"
                  />
                  <el-option
                    :label="$t('deviceManage.acBackupMode')"
                    value="5"
                  />
                  <el-option :label="$t('deviceManage.purePVMode')" value="6" />
                  <el-option
                    :label="$t('deviceManage.forcedOffGridMode')"
                    value="7"
                  />
                </el-select>
                <el-button
                  v-if="timeSettingIsSet('hourSettingObj', 'HM6_0X03_206')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_206',
                      subList.hourSettingObj.HM6_0X03_206Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_207')"
              v-if="timeSettingIsDisplay('hourSettingObj', 'HM6_0X03_207')"
            >
              <div style="display: flex">
                <el-select
                  v-model="subList.hourSettingObj.HM6_0X03_207Val"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option
                    :label="$t('deviceManage.batteryPriorityMode')"
                    value="0"
                  />
                  <el-option
                    :label="$t('deviceManage.homeLoadPriorityMode')"
                    value="1"
                  />
                  <el-option
                    :label="$t('deviceManage.gridPriorityMode')"
                    value="2"
                  />
                  <el-option
                    :label="$t('deviceManage.fullPowerFeedMode')"
                    value="3"
                  />
                  <el-option
                    :label="$t('deviceManage.emergencyBackupMode')"
                    value="4"
                  />
                  <el-option
                    :label="$t('deviceManage.acBackupMode')"
                    value="5"
                  />
                  <el-option :label="$t('deviceManage.purePVMode')" value="6" />
                  <el-option
                    :label="$t('deviceManage.forcedOffGridMode')"
                    value="7"
                  />
                </el-select>
                <el-button
                  v-if="timeSettingIsSet('hourSettingObj', 'HM6_0X03_207')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_207',
                      subList.hourSettingObj.HM6_0X03_207Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_208')"
              v-if="timeSettingIsDisplay('hourSettingObj', 'HM6_0X03_208')"
            >
              <div style="display: flex">
                <el-select
                  v-model="subList.hourSettingObj.HM6_0X03_208Val"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option
                    :label="$t('deviceManage.batteryPriorityMode')"
                    value="0"
                  />
                  <el-option
                    :label="$t('deviceManage.homeLoadPriorityMode')"
                    value="1"
                  />
                  <el-option
                    :label="$t('deviceManage.gridPriorityMode')"
                    value="2"
                  />
                  <el-option
                    :label="$t('deviceManage.fullPowerFeedMode')"
                    value="3"
                  />
                  <el-option
                    :label="$t('deviceManage.emergencyBackupMode')"
                    value="4"
                  />
                  <el-option
                    :label="$t('deviceManage.acBackupMode')"
                    value="5"
                  />
                  <el-option :label="$t('deviceManage.purePVMode')" value="6" />
                  <el-option
                    :label="$t('deviceManage.forcedOffGridMode')"
                    value="7"
                  />
                </el-select>
                <el-button
                  v-if="timeSettingIsSet('hourSettingObj', 'HM6_0X03_208')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_208',
                      subList.hourSettingObj.HM6_0X03_208Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_209')"
              v-if="timeSettingIsDisplay('hourSettingObj', 'HM6_0X03_209')"
            >
              <div style="display: flex">
                <el-select
                  v-model="subList.hourSettingObj.HM6_0X03_209Val"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option
                    :label="$t('deviceManage.batteryPriorityMode')"
                    value="0"
                  />
                  <el-option
                    :label="$t('deviceManage.homeLoadPriorityMode')"
                    value="1"
                  />
                  <el-option
                    :label="$t('deviceManage.gridPriorityMode')"
                    value="2"
                  />
                  <el-option
                    :label="$t('deviceManage.fullPowerFeedMode')"
                    value="3"
                  />
                  <el-option
                    :label="$t('deviceManage.emergencyBackupMode')"
                    value="4"
                  />
                  <el-option
                    :label="$t('deviceManage.acBackupMode')"
                    value="5"
                  />
                  <el-option :label="$t('deviceManage.purePVMode')" value="6" />
                  <el-option
                    :label="$t('deviceManage.forcedOffGridMode')"
                    value="7"
                  />
                </el-select>
                <el-button
                  v-if="timeSettingIsSet('hourSettingObj', 'HM6_0X03_209')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_209',
                      subList.hourSettingObj.HM6_0X03_209Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_210')"
              v-if="timeSettingIsDisplay('hourSettingObj', 'HM6_0X03_210')"
            >
              <div style="display: flex">
                <el-select
                  v-model="subList.hourSettingObj.HM6_0X03_210Val"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option
                    :label="$t('deviceManage.batteryPriorityMode')"
                    value="0"
                  />
                  <el-option
                    :label="$t('deviceManage.homeLoadPriorityMode')"
                    value="1"
                  />
                  <el-option
                    :label="$t('deviceManage.gridPriorityMode')"
                    value="2"
                  />
                  <el-option
                    :label="$t('deviceManage.fullPowerFeedMode')"
                    value="3"
                  />
                  <el-option
                    :label="$t('deviceManage.emergencyBackupMode')"
                    value="4"
                  />
                  <el-option
                    :label="$t('deviceManage.acBackupMode')"
                    value="5"
                  />
                  <el-option :label="$t('deviceManage.purePVMode')" value="6" />
                  <el-option
                    :label="$t('deviceManage.forcedOffGridMode')"
                    value="7"
                  />
                </el-select>
                <el-button
                  v-if="timeSettingIsSet('hourSettingObj', 'HM6_0X03_210')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_210',
                      subList.hourSettingObj.HM6_0X03_210Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_211')"
              v-if="timeSettingIsDisplay('hourSettingObj', 'HM6_0X03_211')"
            >
              <div style="display: flex">
                <el-select
                  v-model="subList.hourSettingObj.HM6_0X03_211Val"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option
                    :label="$t('deviceManage.batteryPriorityMode')"
                    value="0"
                  />
                  <el-option
                    :label="$t('deviceManage.homeLoadPriorityMode')"
                    value="1"
                  />
                  <el-option
                    :label="$t('deviceManage.gridPriorityMode')"
                    value="2"
                  />
                  <el-option
                    :label="$t('deviceManage.fullPowerFeedMode')"
                    value="3"
                  />
                  <el-option
                    :label="$t('deviceManage.emergencyBackupMode')"
                    value="4"
                  />
                  <el-option
                    :label="$t('deviceManage.acBackupMode')"
                    value="5"
                  />
                  <el-option :label="$t('deviceManage.purePVMode')" value="6" />
                  <el-option
                    :label="$t('deviceManage.forcedOffGridMode')"
                    value="7"
                  />
                </el-select>
                <el-button
                  v-if="timeSettingIsSet('hourSettingObj', 'HM6_0X03_211')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_211',
                      subList.hourSettingObj.HM6_0X03_211Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_212')"
              v-if="timeSettingIsDisplay('hourSettingObj', 'HM6_0X03_212')"
            >
              <div style="display: flex">
                <el-select
                  v-model="subList.hourSettingObj.HM6_0X03_212Val"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option
                    :label="$t('deviceManage.batteryPriorityMode')"
                    value="0"
                  />
                  <el-option
                    :label="$t('deviceManage.homeLoadPriorityMode')"
                    value="1"
                  />
                  <el-option
                    :label="$t('deviceManage.gridPriorityMode')"
                    value="2"
                  />
                  <el-option
                    :label="$t('deviceManage.fullPowerFeedMode')"
                    value="3"
                  />
                  <el-option
                    :label="$t('deviceManage.emergencyBackupMode')"
                    value="4"
                  />
                  <el-option
                    :label="$t('deviceManage.acBackupMode')"
                    value="5"
                  />
                  <el-option :label="$t('deviceManage.purePVMode')" value="6" />
                  <el-option
                    :label="$t('deviceManage.forcedOffGridMode')"
                    value="7"
                  />
                </el-select>
                <el-button
                  v-if="timeSettingIsSet('hourSettingObj', 'HM6_0X03_212')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_212',
                      subList.hourSettingObj.HM6_0X03_212Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_213')"
              v-if="timeSettingIsDisplay('hourSettingObj', 'HM6_0X03_213')"
            >
              <div style="display: flex">
                <el-select
                  v-model="subList.hourSettingObj.HM6_0X03_213Val"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option
                    :label="$t('deviceManage.batteryPriorityMode')"
                    value="0"
                  />
                  <el-option
                    :label="$t('deviceManage.homeLoadPriorityMode')"
                    value="1"
                  />
                  <el-option
                    :label="$t('deviceManage.gridPriorityMode')"
                    value="2"
                  />
                  <el-option
                    :label="$t('deviceManage.fullPowerFeedMode')"
                    value="3"
                  />
                  <el-option
                    :label="$t('deviceManage.emergencyBackupMode')"
                    value="4"
                  />
                  <el-option
                    :label="$t('deviceManage.acBackupMode')"
                    value="5"
                  />
                  <el-option :label="$t('deviceManage.purePVMode')" value="6" />
                  <el-option
                    :label="$t('deviceManage.forcedOffGridMode')"
                    value="7"
                  />
                </el-select>
                <el-button
                  v-if="timeSettingIsSet('hourSettingObj', 'HM6_0X03_213')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_213',
                      subList.hourSettingObj.HM6_0X03_213Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_214')"
              v-if="timeSettingIsDisplay('hourSettingObj', 'HM6_0X03_214')"
            >
              <div style="display: flex">
                <el-select
                  v-model="subList.hourSettingObj.HM6_0X03_214Val"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option
                    :label="$t('deviceManage.batteryPriorityMode')"
                    value="0"
                  />
                  <el-option
                    :label="$t('deviceManage.homeLoadPriorityMode')"
                    value="1"
                  />
                  <el-option
                    :label="$t('deviceManage.gridPriorityMode')"
                    value="2"
                  />
                  <el-option
                    :label="$t('deviceManage.fullPowerFeedMode')"
                    value="3"
                  />
                  <el-option
                    :label="$t('deviceManage.emergencyBackupMode')"
                    value="4"
                  />
                  <el-option
                    :label="$t('deviceManage.acBackupMode')"
                    value="5"
                  />
                  <el-option :label="$t('deviceManage.purePVMode')" value="6" />
                  <el-option
                    :label="$t('deviceManage.forcedOffGridMode')"
                    value="7"
                  />
                </el-select>
                <el-button
                  v-if="timeSettingIsSet('hourSettingObj', 'HM6_0X03_214')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_214',
                      subList.hourSettingObj.HM6_0X03_214Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_215')"
              v-if="timeSettingIsDisplay('hourSettingObj', 'HM6_0X03_215')"
            >
              <div style="display: flex">
                <el-select
                  v-model="subList.hourSettingObj.HM6_0X03_215Val"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option
                    :label="$t('deviceManage.batteryPriorityMode')"
                    value="0"
                  />
                  <el-option
                    :label="$t('deviceManage.homeLoadPriorityMode')"
                    value="1"
                  />
                  <el-option
                    :label="$t('deviceManage.gridPriorityMode')"
                    value="2"
                  />
                  <el-option
                    :label="$t('deviceManage.fullPowerFeedMode')"
                    value="3"
                  />
                  <el-option
                    :label="$t('deviceManage.emergencyBackupMode')"
                    value="4"
                  />
                  <el-option
                    :label="$t('deviceManage.acBackupMode')"
                    value="5"
                  />
                  <el-option :label="$t('deviceManage.purePVMode')" value="6" />
                  <el-option
                    :label="$t('deviceManage.forcedOffGridMode')"
                    value="7"
                  />
                </el-select>
                <el-button
                  v-if="timeSettingIsSet('hourSettingObj', 'HM6_0X03_215')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_215',
                      subList.hourSettingObj.HM6_0X03_215Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_216')"
              v-if="timeSettingIsDisplay('hourSettingObj', 'HM6_0X03_216')"
            >
              <div style="display: flex">
                <el-select
                  v-model="subList.hourSettingObj.HM6_0X03_216Val"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option
                    :label="$t('deviceManage.batteryPriorityMode')"
                    value="0"
                  />
                  <el-option
                    :label="$t('deviceManage.homeLoadPriorityMode')"
                    value="1"
                  />
                  <el-option
                    :label="$t('deviceManage.gridPriorityMode')"
                    value="2"
                  />
                  <el-option
                    :label="$t('deviceManage.fullPowerFeedMode')"
                    value="3"
                  />
                  <el-option
                    :label="$t('deviceManage.emergencyBackupMode')"
                    value="4"
                  />
                  <el-option
                    :label="$t('deviceManage.acBackupMode')"
                    value="5"
                  />
                  <el-option :label="$t('deviceManage.purePVMode')" value="6" />
                  <el-option
                    :label="$t('deviceManage.forcedOffGridMode')"
                    value="7"
                  />
                </el-select>
                <el-button
                  v-if="timeSettingIsSet('hourSettingObj', 'HM6_0X03_216')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_216',
                      subList.hourSettingObj.HM6_0X03_216Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_217')"
              v-if="timeSettingIsDisplay('hourSettingObj', 'HM6_0X03_217')"
            >
              <div style="display: flex">
                <el-select
                  v-model="subList.hourSettingObj.HM6_0X03_217Val"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option
                    :label="$t('deviceManage.batteryPriorityMode')"
                    value="0"
                  />
                  <el-option
                    :label="$t('deviceManage.homeLoadPriorityMode')"
                    value="1"
                  />
                  <el-option
                    :label="$t('deviceManage.gridPriorityMode')"
                    value="2"
                  />
                  <el-option
                    :label="$t('deviceManage.fullPowerFeedMode')"
                    value="3"
                  />
                  <el-option
                    :label="$t('deviceManage.emergencyBackupMode')"
                    value="4"
                  />
                  <el-option
                    :label="$t('deviceManage.acBackupMode')"
                    value="5"
                  />
                  <el-option :label="$t('deviceManage.purePVMode')" value="6" />
                  <el-option
                    :label="$t('deviceManage.forcedOffGridMode')"
                    value="7"
                  />
                </el-select>
                <el-button
                  v-if="timeSettingIsSet('hourSettingObj', 'HM6_0X03_217')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_217',
                      subList.hourSettingObj.HM6_0X03_217Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_218')"
              v-if="timeSettingIsDisplay('hourSettingObj', 'HM6_0X03_218')"
            >
              <div style="display: flex">
                <el-select
                  v-model="subList.hourSettingObj.HM6_0X03_218Val"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option
                    :label="$t('deviceManage.batteryPriorityMode')"
                    value="0"
                  />
                  <el-option
                    :label="$t('deviceManage.homeLoadPriorityMode')"
                    value="1"
                  />
                  <el-option
                    :label="$t('deviceManage.gridPriorityMode')"
                    value="2"
                  />
                  <el-option
                    :label="$t('deviceManage.fullPowerFeedMode')"
                    value="3"
                  />
                  <el-option
                    :label="$t('deviceManage.emergencyBackupMode')"
                    value="4"
                  />
                  <el-option
                    :label="$t('deviceManage.acBackupMode')"
                    value="5"
                  />
                  <el-option :label="$t('deviceManage.purePVMode')" value="6" />
                  <el-option
                    :label="$t('deviceManage.forcedOffGridMode')"
                    value="7"
                  />
                </el-select>
                <el-button
                  v-if="timeSettingIsSet('hourSettingObj', 'HM6_0X03_218')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_218',
                      subList.hourSettingObj.HM6_0X03_218Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('deviceManage.HM6_0X03_219')"
              v-if="timeSettingIsDisplay('hourSettingObj', 'HM6_0X03_219')"
            >
              <div style="display: flex">
                <el-select
                  v-model="subList.hourSettingObj.HM6_0X03_219Val"
                  :placeholder="$t('common.selectPrompt')"
                  style="width: 100%"
                >
                  <el-option
                    :label="$t('deviceManage.batteryPriorityMode')"
                    value="0"
                  />
                  <el-option
                    :label="$t('deviceManage.homeLoadPriorityMode')"
                    value="1"
                  />
                  <el-option
                    :label="$t('deviceManage.gridPriorityMode')"
                    value="2"
                  />
                  <el-option
                    :label="$t('deviceManage.fullPowerFeedMode')"
                    value="3"
                  />
                  <el-option
                    :label="$t('deviceManage.emergencyBackupMode')"
                    value="4"
                  />
                  <el-option
                    :label="$t('deviceManage.acBackupMode')"
                    value="5"
                  />
                  <el-option :label="$t('deviceManage.purePVMode')" value="6" />
                  <el-option
                    :label="$t('deviceManage.forcedOffGridMode')"
                    value="7"
                  />
                </el-select>
                <el-button
                  v-if="timeSettingIsSet('hourSettingObj', 'HM6_0X03_219')"
                  type="text"
                  style="margin-left: 5px"
                  @click="
                    handleSave11(
                      'HM6_0X03_219',
                      subList.hourSettingObj.HM6_0X03_219Val
                    )
                  "
                  >{{ $t("common.save") }}</el-button
                >
              </div>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </template>

      <template v-else-if="activeIndex === '13'">
        <el-card
          style="margin-top: 10px"
          v-if="threePhaseMeterParameter.threePhaseMeterBasic"
        >
          <el-descriptions
            :title="$t('parameterConfiguration.threePhaseMeterBasic')"
            :column="2"
          >
            <el-descriptions-item
              :label="
                $t(
                  'parameterConfiguration.oneCombinedActiveTotalElectricEnergy'
                )
              "
              v-if="
                threePhaseMeterParameterIsDisplay(
                  'oneCombinedActiveTotalElectricEnergy'
                )
              "
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .oneCombinedActiveTotalElectricEnergyVal
              }}kWh
            </el-descriptions-item>
            <el-descriptions-item
              :label="
                $t(
                  'parameterConfiguration.twoCombinedActiveTotalElectricEnergy'
                )
              "
              v-if="
                threePhaseMeterParameterIsDisplay(
                  'twoCombinedActiveTotalElectricEnergy'
                )
              "
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .twoCombinedActiveTotalElectricEnergyVal
              }}kWh
            </el-descriptions-item>
            <el-descriptions-item
              :label="
                $t(
                  'parameterConfiguration.threeCombinedActiveTotalElectricEnergy'
                )
              "
              v-if="
                threePhaseMeterParameterIsDisplay(
                  'threeCombinedActiveTotalElectricEnergy'
                )
              "
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .threeCombinedActiveTotalElectricEnergyVal
              }}kWh
            </el-descriptions-item>
            <el-descriptions-item
              :label="
                $t(
                  'parameterConfiguration.fourCombinedActiveTotalElectricEnergy'
                )
              "
              v-if="
                threePhaseMeterParameterIsDisplay(
                  'fourCombinedActiveTotalElectricEnergy'
                )
              "
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .fourCombinedActiveTotalElectricEnergyVal
              }}kWh
            </el-descriptions-item>
            <el-descriptions-item
              :label="
                $t('parameterConfiguration.oneCurrentTotalPositiveActiveEnergy')
              "
              v-if="
                threePhaseMeterParameterIsDisplay(
                  'oneCurrentTotalPositiveActiveEnergy'
                )
              "
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .oneCurrentTotalPositiveActiveEnergyVal
              }}kWh
            </el-descriptions-item>
            <el-descriptions-item
              :label="
                $t('parameterConfiguration.twoCurrentTotalPositiveActiveEnergy')
              "
              v-if="
                threePhaseMeterParameterIsDisplay(
                  'twoCurrentTotalPositiveActiveEnergy'
                )
              "
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .twoCurrentTotalPositiveActiveEnergyVal
              }}kWh
            </el-descriptions-item>
            <el-descriptions-item
              :label="
                $t(
                  'parameterConfiguration.threeCurrentTotalPositiveActiveEnergy'
                )
              "
              v-if="
                threePhaseMeterParameterIsDisplay(
                  'threeCurrentTotalPositiveActiveEnergy'
                )
              "
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .threeCurrentTotalPositiveActiveEnergyVal
              }}kWh
            </el-descriptions-item>
            <el-descriptions-item
              :label="
                $t(
                  'parameterConfiguration.fourCurrentTotalPositiveActiveEnergy'
                )
              "
              v-if="
                threePhaseMeterParameterIsDisplay(
                  'fourCurrentTotalPositiveActiveEnergy'
                )
              "
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .fourCurrentTotalPositiveActiveEnergyVal
              }}kWh
            </el-descriptions-item>
            <el-descriptions-item
              :label="
                $t('parameterConfiguration.oneCurrentTotalReserveActiveEnergy')
              "
              v-if="
                threePhaseMeterParameterIsDisplay(
                  'oneCurrentTotalReserveActiveEnergy'
                )
              "
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .oneCurrentTotalReserveActiveEnergyVal
              }}kWh
            </el-descriptions-item>
            <el-descriptions-item
              :label="
                $t('parameterConfiguration.twoCurrentTotalReserveActiveEnergy')
              "
              v-if="
                threePhaseMeterParameterIsDisplay(
                  'twoCurrentTotalReserveActiveEnergy'
                )
              "
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .twoCurrentTotalReserveActiveEnergyVal
              }}kWh
            </el-descriptions-item>
            <el-descriptions-item
              :label="
                $t(
                  'parameterConfiguration.threeCurrentTotalReserveActiveEnergy'
                )
              "
              v-if="
                threePhaseMeterParameterIsDisplay(
                  'threeCurrentTotalReserveActiveEnergy'
                )
              "
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .threeCurrentTotalReserveActiveEnergyVal
              }}kWh
            </el-descriptions-item>
            <el-descriptions-item
              :label="
                $t('parameterConfiguration.fourCurrentTotalReserveActiveEnergy')
              "
              v-if="
                threePhaseMeterParameterIsDisplay(
                  'fourCurrentTotalReserveActiveEnergy'
                )
              "
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .fourCurrentTotalReserveActiveEnergyVal
              }}kWh
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.oneVoltageA')"
              v-if="threePhaseMeterParameterIsDisplay('oneVoltageA')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj.oneVoltageAVal
              }}V
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.oneVoltageB')"
              v-if="threePhaseMeterParameterIsDisplay('oneVoltageB')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj.oneVoltageBVal
              }}V
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.oneVoltageC')"
              v-if="threePhaseMeterParameterIsDisplay('oneVoltageC')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj.oneVoltageCVal
              }}V
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.twoVoltageA')"
              v-if="threePhaseMeterParameterIsDisplay('twoVoltageA')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj.twoVoltageAVal
              }}V
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.twoVoltageB')"
              v-if="threePhaseMeterParameterIsDisplay('twoVoltageB')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj.twoVoltageBVal
              }}V
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.twoVoltageC')"
              v-if="threePhaseMeterParameterIsDisplay('twoVoltageC')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj.twoVoltageCVal
              }}V
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.threeVoltageA')"
              v-if="threePhaseMeterParameterIsDisplay('threeVoltageA')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .threeVoltageAVal
              }}V
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.threeVoltageB')"
              v-if="threePhaseMeterParameterIsDisplay('threeVoltageB')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .threeVoltageBVal
              }}V
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.threeVoltageC')"
              v-if="threePhaseMeterParameterIsDisplay('threeVoltageC')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .threeVoltageCVal
              }}V
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.fourVoltageA')"
              v-if="threePhaseMeterParameterIsDisplay('fourVoltageA')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .fourVoltageAVal
              }}V
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.fourVoltageB')"
              v-if="threePhaseMeterParameterIsDisplay('fourVoltageB')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .fourVoltageBVal
              }}V
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.fourVoltageC')"
              v-if="threePhaseMeterParameterIsDisplay('fourVoltageC')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .fourVoltageCVal
              }}V
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.oneCurrentA')"
              v-if="threePhaseMeterParameterIsDisplay('oneCurrentA')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj.oneCurrentAVal
              }}A
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.oneCurrentB')"
              v-if="threePhaseMeterParameterIsDisplay('oneCurrentB')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj.oneCurrentBVal
              }}A
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.oneCurrentC')"
              v-if="threePhaseMeterParameterIsDisplay('oneCurrentC')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj.oneCurrentCVal
              }}A
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.twoCurrentA')"
              v-if="threePhaseMeterParameterIsDisplay('twoCurrentA')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj.twoCurrentAVal
              }}A
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.twoCurrentB')"
              v-if="threePhaseMeterParameterIsDisplay('twoCurrentB')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj.twoCurrentBVal
              }}A
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.twoCurrentC')"
              v-if="threePhaseMeterParameterIsDisplay('twoCurrentC')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj.twoCurrentCVal
              }}A
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.threeCurrentA')"
              v-if="threePhaseMeterParameterIsDisplay('threeCurrentA')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .threeCurrentAVal
              }}A
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.threeCurrentB')"
              v-if="threePhaseMeterParameterIsDisplay('threeCurrentB')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .threeCurrentBVal
              }}A
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.threeCurrentC')"
              v-if="threePhaseMeterParameterIsDisplay('threeCurrentC')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .threeCurrentCVal
              }}A
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.fourCurrentA')"
              v-if="threePhaseMeterParameterIsDisplay('fourCurrentA')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .fourCurrentAVal
              }}A
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.fourCurrentB')"
              v-if="threePhaseMeterParameterIsDisplay('fourCurrentB')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .fourCurrentBVal
              }}A
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.fourCurrentC')"
              v-if="threePhaseMeterParameterIsDisplay('fourCurrentC')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .fourCurrentCVal
              }}A
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.oneTotalActivePower')"
              v-if="threePhaseMeterParameterIsDisplay('oneTotalActivePower')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .oneTotalActivePowerVal
              }}kW
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.oneTotalActivePowerA')"
              v-if="threePhaseMeterParameterIsDisplay('oneTotalActivePowerA')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .oneTotalActivePowerAVal
              }}kW
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.oneTotalActivePowerB')"
              v-if="threePhaseMeterParameterIsDisplay('oneTotalActivePowerB')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .oneTotalActivePowerBVal
              }}kW
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.oneTotalActivePowerC')"
              v-if="threePhaseMeterParameterIsDisplay('oneTotalActivePowerC')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .oneTotalActivePowerCVal
              }}kW
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.twoTotalActivePower')"
              v-if="threePhaseMeterParameterIsDisplay('twoTotalActivePower')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .twoTotalActivePowerVal
              }}kW
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.twoTotalActivePowerA')"
              v-if="threePhaseMeterParameterIsDisplay('twoTotalActivePowerA')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .twoTotalActivePowerAVal
              }}kW
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.twoTotalActivePowerB')"
              v-if="threePhaseMeterParameterIsDisplay('twoTotalActivePowerB')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .twoTotalActivePowerBVal
              }}kW
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.twoTotalActivePowerC')"
              v-if="threePhaseMeterParameterIsDisplay('twoTotalActivePowerC')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .twoTotalActivePowerCVal
              }}kW
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.threeTotalActivePower')"
              v-if="threePhaseMeterParameterIsDisplay('threeTotalActivePower')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .threeTotalActivePowerVal
              }}kW
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.threeTotalActivePowerA')"
              v-if="threePhaseMeterParameterIsDisplay('threeTotalActivePowerA')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .threeTotalActivePowerAVal
              }}kW
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.threeTotalActivePowerB')"
              v-if="threePhaseMeterParameterIsDisplay('threeTotalActivePowerB')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .threeTotalActivePowerBVal
              }}kW
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.threeTotalActivePowerC')"
              v-if="threePhaseMeterParameterIsDisplay('threeTotalActivePowerC')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .threeTotalActivePowerCVal
              }}kW
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.fourTotalActivePower')"
              v-if="threePhaseMeterParameterIsDisplay('fourTotalActivePower')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .fourTotalActivePowerVal
              }}kW
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.fourTotalActivePowerA')"
              v-if="threePhaseMeterParameterIsDisplay('fourTotalActivePowerA')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .fourTotalActivePowerAVal
              }}kW
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.fourTotalActivePowerB')"
              v-if="threePhaseMeterParameterIsDisplay('fourTotalActivePowerB')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .fourTotalActivePowerBVal
              }}kW
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.fourTotalActivePowerC')"
              v-if="threePhaseMeterParameterIsDisplay('fourTotalActivePowerC')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .fourTotalActivePowerCVal
              }}kW
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.onePowerFactorTotal')"
              v-if="threePhaseMeterParameterIsDisplay('onePowerFactorTotal')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .onePowerFactorTotalVal
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.onePowerFactorA')"
              v-if="threePhaseMeterParameterIsDisplay('onePowerFactorA')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .onePowerFactorAVal
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.onePowerFactorB')"
              v-if="threePhaseMeterParameterIsDisplay('onePowerFactorB')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .onePowerFactorBVal
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.onePowerFactorC')"
              v-if="threePhaseMeterParameterIsDisplay('onePowerFactorC')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .onePowerFactorCVal
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.twoPowerFactorTotal')"
              v-if="threePhaseMeterParameterIsDisplay('twoPowerFactorTotal')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .twoPowerFactorTotalVal
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.twoPowerFactorA')"
              v-if="threePhaseMeterParameterIsDisplay('twoPowerFactorA')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .twoPowerFactorAVal
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.twoPowerFactorB')"
              v-if="threePhaseMeterParameterIsDisplay('twoPowerFactorB')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .twoPowerFactorBVal
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.twoPowerFactorC')"
              v-if="threePhaseMeterParameterIsDisplay('twoPowerFactorC')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .twoPowerFactorCVal
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.threePowerFactorTotal')"
              v-if="threePhaseMeterParameterIsDisplay('threePowerFactorTotal')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .threePowerFactorTotalVal
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.threePowerFactorA')"
              v-if="threePhaseMeterParameterIsDisplay('threePowerFactorA')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .threePowerFactorAVal
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.threePowerFactorB')"
              v-if="threePhaseMeterParameterIsDisplay('threePowerFactorB')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .threePowerFactorBVal
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.threePowerFactorC')"
              v-if="threePhaseMeterParameterIsDisplay('threePowerFactorC')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .threePowerFactorCVal
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.fourPowerFactorTotal')"
              v-if="threePhaseMeterParameterIsDisplay('fourPowerFactorTotal')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .fourPowerFactorTotalVal
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.fourPowerFactorA')"
              v-if="threePhaseMeterParameterIsDisplay('fourPowerFactorA')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .fourPowerFactorAVal
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.fourPowerFactorB')"
              v-if="threePhaseMeterParameterIsDisplay('fourPowerFactorB')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .fourPowerFactorBVal
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.fourPowerFactorC')"
              v-if="threePhaseMeterParameterIsDisplay('fourPowerFactorC')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .fourPowerFactorCVal
              }}
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.oneFrequency')"
              v-if="threePhaseMeterParameterIsDisplay('oneFrequency')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .oneFrequencyVal
              }}Hz
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.twoFrequency')"
              v-if="threePhaseMeterParameterIsDisplay('twoFrequency')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .twoFrequencyVal
              }}Hz
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.threeFrequency')"
              v-if="threePhaseMeterParameterIsDisplay('threeFrequency')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .threeFrequencyVal
              }}Hz
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.fourFrequency')"
              v-if="threePhaseMeterParameterIsDisplay('fourFrequency')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .fourFrequencyVal
              }}Hz
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.oneTotalReactivePower')"
              v-if="threePhaseMeterParameterIsDisplay('oneTotalReactivePower')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .oneTotalReactivePowerVal
              }}Kvar
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.oneTotalReactivePowerA')"
              v-if="threePhaseMeterParameterIsDisplay('oneTotalReactivePowerA')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .oneTotalReactivePowerAVal
              }}Kvar
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.oneTotalReactivePowerB')"
              v-if="threePhaseMeterParameterIsDisplay('oneTotalReactivePowerB')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .oneTotalReactivePowerBVal
              }}Kvar
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.oneTotalReactivePowerC')"
              v-if="threePhaseMeterParameterIsDisplay('oneTotalReactivePowerC')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .oneTotalReactivePowerCVal
              }}Kvar
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.twoTotalReactivePower')"
              v-if="threePhaseMeterParameterIsDisplay('twoTotalReactivePower')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .twoTotalReactivePowerVal
              }}Kvar
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.twoTotalReactivePowerA')"
              v-if="threePhaseMeterParameterIsDisplay('twoTotalReactivePowerA')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .twoTotalReactivePowerAVal
              }}Kvar
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.twoTotalReactivePowerB')"
              v-if="threePhaseMeterParameterIsDisplay('twoTotalReactivePowerB')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .twoTotalReactivePowerBVal
              }}Kvar
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.twoTotalReactivePowerC')"
              v-if="threePhaseMeterParameterIsDisplay('twoTotalReactivePowerC')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .twoTotalReactivePowerCVal
              }}Kvar
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.threeTotalReactivePower')"
              v-if="
                threePhaseMeterParameterIsDisplay('threeTotalReactivePower')
              "
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .threeTotalReactivePowerVal
              }}Kvar
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.threeTotalReactivePowerA')"
              v-if="
                threePhaseMeterParameterIsDisplay('threeTotalReactivePowerA')
              "
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .threeTotalReactivePowerAVal
              }}Kvar
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.threeTotalReactivePowerB')"
              v-if="
                threePhaseMeterParameterIsDisplay('threeTotalReactivePowerB')
              "
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .threeTotalReactivePowerBVal
              }}Kvar
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.threeTotalReactivePowerC')"
              v-if="
                threePhaseMeterParameterIsDisplay('threeTotalReactivePowerC')
              "
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .threeTotalReactivePowerCVal
              }}Kvar
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.fourTotalReactivePower')"
              v-if="threePhaseMeterParameterIsDisplay('fourTotalReactivePower')"
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .fourTotalReactivePowerVal
              }}Kvar
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.fourTotalReactivePowerA')"
              v-if="
                threePhaseMeterParameterIsDisplay('fourTotalReactivePowerA')
              "
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .fourTotalReactivePowerAVal
              }}Kvar
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.fourTotalReactivePowerB')"
              v-if="
                threePhaseMeterParameterIsDisplay('fourTotalReactivePowerB')
              "
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .fourTotalReactivePowerBVal
              }}Kvar
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('parameterConfiguration.fourTotalReactivePowerC')"
              v-if="
                threePhaseMeterParameterIsDisplay('fourTotalReactivePowerC')
              "
            >
              {{
                threePhaseMeterParameter.threePhaseMeterBasicObj
                  .fourTotalReactivePowerCVal
              }}Kvar
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </template>

      <template v-else-if="activeIndex === '0'">
        <SelfTest ref="selfTest" />
      </template>
    </basic-container>
  </div>
</template>

<script>
import {
  getConfigData,
  saveConfigData,
  batteryUpgrade,
  batterySetCustom,
  updateEnable,
  savePage11ConfigData,
} from "@/api/device";
import SelfTest from "./selfTest.vue";
import { baseMqtt } from "@/config/env";
import { mapState } from "vuex";
const mqtt = require("mqtt/dist/mqtt.js");
export default {
  watch: {
    "batteryParameter.batterySetObj.dischargeOnHeatingTemperatureVal"(
      newValue
    ) {
      this.formData.dischargeOnHeatingTemperature = newValue;
    },
    "batteryParameter.batterySetObj.dischargeOffHeatingTemperatureVal"(
      newValue
    ) {
      this.formData.dischargeOffHeatingTemperature = newValue;
    },
    "batteryParameter.batterySetObj.lowTemperatureProtectionDuringChargingVal"(
      newValue
    ) {
      this.formData.lowTemperatureProtectionDuringCharging = newValue;
    },
    "batteryParameter.batterySetObj.lowTemperatureProtectionRecoveryDuringChargingVal"(
      newValue
    ) {
      this.formData.lowTemperatureProtectionRecoveryDuringCharging = newValue;
    },
    "batteryParameter.batterySetObj.heatingFanOnTemperatureVal"(newValue) {
      this.formData.heatingFanOnTemperature = newValue;
    },
    "batteryParameter.batterySetObj.heatingFanRecoveryTemperatureVal"(
      newValue
    ) {
      this.formData.heatingFanRecoveryTemperature = newValue;
    },

    "batteryParameter.batterySetObj.chargingOvercurrentProtectionVal"(
      newValue
    ) {
      this.formData.chargingOvercurrentProtection = newValue;
    },
    "batteryParameter.batterySetObj.chargingOvercurrentProtectionDelayVal"(
      newValue
    ) {
      this.formData.chargingOvercurrentProtectionDelay = newValue;
    },
    "batteryParameter.batterySetObj.cellOvervoltageProtectionVal"(newValue) {
      this.formData.cellOvervoltageProtection = newValue;
    },
    "batteryParameter.batterySetObj.cellOvervoltageProtectionDelayVal"(
      newValue
    ) {
      this.formData.cellOvervoltageProtectionDelay = newValue;
    },
    "batteryParameter.batterySetObj.cellOverDischargeProtectionVal"(newValue) {
      this.formData.cellOverDischargeProtection = newValue;
    },
    "batteryParameter.batterySetObj.cellOverDischargeProtectionDelayVal"(
      newValue
    ) {
      this.formData.cellOverDischargeProtectionDelay = newValue;
    },
    "batteryParameter.batterySetObj.overvoltageHysteresisVoltageVal"(newValue) {
      this.formData.overvoltageHysteresisVoltage = newValue;
    },
    "batteryParameter.batterySetObj.overdischargeHysteresisVoltageVal"(
      newValue
    ) {
      this.formData.overdischargeHysteresisVoltage = newValue;
    },
    "batteryParameter.batterySetObj.cellOvervoltageRecoveryDelayVal"(newValue) {
      this.formData.cellOvervoltageRecoveryDelay = newValue;
    },
    "batteryParameter.batterySetObj.cellOverDischargeRecoveryDelayVal"(
      newValue
    ) {
      this.formData.cellOverDischargeRecoveryDelay = newValue;
    },
    "batteryParameter.batterySetObj.highTemperatureProtectionDuringDischargeVal"(
      newValue
    ) {
      this.formData.highTemperatureProtectionDuringDischarge = newValue;
    },
    "batteryParameter.batterySetObj.highTemperatureProtectionRecoveryDuringDischargeVal"(
      newValue
    ) {
      this.formData.highTemperatureProtectionRecoveryDuringDischarge = newValue;
    },
    "batteryParameter.batterySetObj.lowTemperatureProtectionDuringDischargeVal"(
      newValue
    ) {
      this.formData.lowTemperatureProtectionDuringDischarge = newValue;
    },
    "batteryParameter.batterySetObj.dischargeLowTemperatureProtectionRecoveryVal"(
      newValue
    ) {
      this.formData.dischargeLowTemperatureProtectionRecovery = newValue;
    },
    "batteryParameter.batterySetObj.highTemperatureProtectionDuringChargingVal"(
      newValue
    ) {
      this.formData.highTemperatureProtectionDuringCharging = newValue;
    },
    "batteryParameter.batterySetObj.highTemperatureProtectionRecoveryDuringChargingVal"(
      newValue
    ) {
      this.formData.highTemperatureProtectionRecoveryDuringCharging = newValue;
    },
    "batteryParameter.batterySetObj.customParameters1Val"(newValue) {
      this.formData.customParameters1 = newValue;
    },
    "batteryParameter.batterySetObj.customParameters5Val"(newValue) {
      this.formData.customParameters5 = newValue;
    },
    "batteryParameter.batterySetObj.customParameters8Val"(newValue) {
      this.formData.customParameters8 = newValue;
    },
    "batteryParameter.batterySetObj.batteryImbalanceAlarmPressureDifferenceVal"(
      newValue
    ) {
      this.formData.batteryImbalanceAlarmPressureDifference = newValue;
    },
    "batteryParameter.batterySetObj.imbalanceAlarmRecoveryPressureDifferenceVal"(
      newValue
    ) {
      this.formData.imbalanceAlarmRecoveryPressureDifference = newValue;
    },

    "batteryParameter.batterySetObj.enableSettingBit4Val"(newValue) {
      this.formData.enableSettingBit4 = newValue;
    },

    "batteryParameter.batterySetObj.powerDownVoltageVal"(newValue) {
      this.formData.powerDownVoltage = newValue;
    },
    "batteryParameter.batterySetObj.cellOverDischargeAlarmVoltageVal"(
      newValue
    ) {
      this.formData.cellOverDischargeAlarmVoltage = newValue;
    },
    "batteryParameter.batterySetObj.totalVoltageOvervoltageProtectionVal"(
      newValue
    ) {
      this.formData.totalVoltageOvervoltageProtection = newValue;
    },
    "batteryParameter.batterySetObj.totalPressureOverDischargeRecoveryVal"(
      newValue
    ) {
      this.formData.totalPressureOverDischargeRecovery = newValue;
    },
    "batteryParameter.batterySetObj.totalVoltageOverDischargeAlarmVoltageVal"(
      newValue
    ) {
      this.formData.totalVoltageOverDischargeAlarmVoltage = newValue;
    },
  },
  components: { SelfTest },
  data() {
    return {
      formData: {
        enableSettingBit4: null,

        customParameters1: null,
        customParameters5: null,
        customParameters8: null,

        batteryImbalanceAlarmPressureDifference: null,
        imbalanceAlarmRecoveryPressureDifference: null,

        powerDownVoltage: null,
        cellOverDischargeAlarmVoltage: null,
        totalVoltageOvervoltageProtection: null,
        totalPressureOverDischargeRecovery: null,
        totalVoltageOverDischargeAlarmVoltage: null,

        lowTemperatureProtectionDuringCharging: null,
        lowTemperatureProtectionRecoveryDuringCharging: null,

        dischargeOnHeatingTemperature: null,
        dischargeOffHeatingTemperature: null,

        heatingFanOnTemperature: null,
        heatingFanRecoveryTemperature: null,

        chargingOvercurrentProtection: null,
        chargingOvercurrentProtectionDelay: null,

        cellOvervoltageProtection: null,
        cellOvervoltageProtectionDelay: null,

        cellOverDischargeProtection: null,
        cellOverDischargeProtectionDelay: null,

        overvoltageHysteresisVoltage: null,
        overdischargeHysteresisVoltage: null,

        cellOvervoltageRecoveryDelay: null,
        cellOverDischargeRecoveryDelay: null,

        highTemperatureProtectionDuringDischarge: null,
        highTemperatureProtectionRecoveryDuringDischarge: null,
        lowTemperatureProtectionDuringDischarge: null,
        dischargeLowTemperatureProtectionRecovery: null,

        highTemperatureProtectionDuringCharging: null,
        highTemperatureProtectionRecoveryDuringCharging: null,
      },
      deviceInfo: {},

      devStatusFilter: [
        this.$t("userManage.normal"),
        this.$t("deviceManage.maintenance"),
        this.$t("deviceManage.offline"),
        this.$t("deviceManage.error"),
      ],
      systemModeFilter: [
        this.$t("deviceManage.batteryPriorityMode"),
        this.$t("deviceManage.homeLoadPriorityMode"),
        this.$t("deviceManage.gridPriorityMode"),
        this.$t("deviceManage.fullPowerFeedMode"),
        this.$t("deviceManage.emergencyBackupMode"),
        this.$t("deviceManage.acBackupMode"),
        this.$t("deviceManage.purePVMode"),
        this.$t("deviceManage.forcedOffGridMode"),
      ],
      systemStateFilter: [
        this.$t("deviceManage.nothing"),
        this.$t("deviceManage.systemState1"),
        this.$t("deviceManage.systemState2"),
        this.$t("deviceManage.systemState3"),
        this.$t("deviceManage.systemState4"),
        this.$t("deviceManage.systemState5"),
        this.$t("deviceManage.systemState6"),
        this.$t("deviceManage.systemState7"),
        this.$t("deviceManage.systemState8"),
        this.$t("deviceManage.systemState9"),
        this.$t("deviceManage.systemState10"),
      ],
      countryCodeValFilter: [
        this.$t("deviceManage.China"),
        this.$t("deviceManage.Italy"),
        this.$t("deviceManage.Germany"),
        this.$t("deviceManage.Australia"),
        this.$t("deviceManage.Belgium"),
        this.$t("deviceManage.SouthAfrica"),
        this.$t("deviceManage.England"),
        this.$t("deviceManage.Spain"),
        this.$t("deviceManage.Europe50549"),
        this.$t("deviceManage.Ireland"),
        this.$t("deviceManage.France"),
        this.$t("deviceManage.Greece"),
      ],
      HM_0X04_16ValFilter: [
        this.$t("deviceManage.MCUIssuedControl"),
        this.$t("deviceManage.DSPIssuedControl"),
      ],

      HM_0X04_110ValFilter: [
        this.$t("deviceManage.none"),
        this.$t("deviceManage.overvoltageForASection"),
        this.$t("deviceManage.secondStageOvervoltage"),
        this.$t("deviceManage.oneSectionUnderVoltage"),
        this.$t("deviceManage.secondaryUndervoltage"),
        this.$t("deviceManage.overfrequencyOfASegment"),
        this.$t("deviceManage.secondStageOverfrequency"),
        this.$t("deviceManage.oneUnderfrequency"),
        this.$t("deviceManage.twoStageUnderfrequency"),
      ],

      HM_0X04_115ValFilter: [
        this.$t("deviceManage.none"),
        this.$t("deviceManage.process1"),
      ],

      HM_0X04_160ValFilter: [
        this.$t("threePhase.noFault"),
        this.$t("threePhase.faultStatus1"),
        this.$t("threePhase.faultStatus2"),
      ],

      HM_0X04_440ValFilter: [
        this.$t("deviceManage.none"),
        this.$t("deviceManage.forceDischarging"),
        this.$t("deviceManage.forceCharging"),
      ],

      HM_0X04_436ValFilter: [
        this.$t("deviceManage.generatorState0"),
        this.$t("deviceManage.generatorState1"),
        this.$t("deviceManage.generatorState2"),
        this.$t("deviceManage.generatorState3"),
        this.$t("deviceManage.generatorState4"),
        this.$t("deviceManage.generatorState5"),
      ],

      batteryStatusFilter: [
        this.$t("deviceManage.nothing"),
        this.$t("deviceManage.batteryStatus1"),
        this.$t("deviceManage.batteryStatus2"),
        this.$t("deviceManage.batteryStatus3"),
        this.$t("deviceManage.batteryStatus4"),
        this.$t("deviceManage.batteryStatus5"),
        this.$t("deviceManage.batteryStatus6"),
        this.$t("deviceManage.batteryStatus7"),
      ],
      BMSFilter: [this.$t("deviceManage.BMS1"), this.$t("deviceManage.BMS2")],
      GridStateFilter: [
        "N/A",
        this.$t("deviceManage.GridState1"),
        this.$t("deviceManage.GridState2"),
        this.$t("deviceManage.GridState3"),
      ],
      CTFilter: [
        this.$t("deviceManage.CT1"),
        this.$t("deviceManage.CT2"),
        this.$t("deviceManage.CT3"),
      ],
      invertingStateFilter: [
        "N/A",
        this.$t("deviceManage.invertingState1"),
        this.$t("deviceManage.invertingState2"),
      ],
      meterNormalFilter: [
        this.$t("deviceManage.meterNormal1"),
        this.$t("deviceManage.meterNormal2"),
      ],
      selfCheckFilter: [
        "NULL",
        this.$t("deviceManage.selfCheck1"),
        this.$t("deviceManage.selfCheck2"),
        this.$t("deviceManage.selfCheck3"),
      ],
      USBFilter: [
        this.$t("deviceManage.nothing"),
        this.$t("deviceManage.USB1"),
        this.$t("deviceManage.USB2"),
        this.$t("deviceManage.USB3"),
        this.$t("deviceManage.USB4"),
        this.$t("deviceManage.USB5"),
        this.$t("deviceManage.USB6"),
        this.$t("deviceManage.USB7"),
      ],
      energyFlowFilter: [
        this.$t("deviceManage.energyFlow1"),
        this.$t("deviceManage.energyFlow2"),
        this.$t("deviceManage.energyFlow3"),
        this.$t("deviceManage.energyFlow4"),
      ],
      heatingEnableFilter: [
        this.$t("deviceManage.heatingEnableState1"),
        this.$t("deviceManage.heatingEnableState2"),
        this.$t("deviceManage.heatingEnableState3"),
        this.$t("deviceManage.heatingEnableState4"),
        this.$t("deviceManage.heatingEnableState5"),
      ],
      systemLockStatusSerialNumberValFilter: [
        this.$t("deviceManage.systemLockStatus1"),
        this.$t("deviceManage.systemLockStatus2"),
        this.$t("deviceManage.systemLockStatus3"),
        this.$t("deviceManage.systemLockStatus4"),
        this.$t("deviceManage.systemLockStatus5"),
        this.$t("deviceManage.systemLockStatus6"),
        this.$t("deviceManage.systemLockStatus7"),
        this.$t("deviceManage.systemLockStatus8"),
        this.$t("deviceManage.systemLockStatus9"),
        this.$t("deviceManage.systemLockStatus10"),
        this.$t("deviceManage.systemLockStatus11"),
        this.$t("deviceManage.systemLockStatus12"),
        this.$t("deviceManage.systemLockStatus13"),
      ],
      activeIndex: "7",
      loading: false,
      // mqtt
      mqttClient: null,
      connectState: "init",
      interObj: null,
      // 配置参数
      operationInformation: {
        isShow: false,
        runInformation: false,
        runInformationObj: {},
        basicInformation: false,
        basicInformationObj: {},
        hm12Info: false,
        hm12InfoObj: {},
        pvInformation: false,
        pvInformationObj: {},
        batteryInformation: false,
        batteryInformationObj: {},
        powerGridInformation: false,
        powerGridInformationObj: {},
        inverterInformation: false,
        inverterInformationObj: {},
        loadInformation: false,
        loadInformationObj: {},
        electricityMeterInformation: false,
        electricityMeterInformationObj: {},
        otherInformation: false,
        otherInformationObj: {},
      },
      systemSet: {
        isShow: false,
        commonSet: false,
        commonSetObj: {},
        communicationSet: false,
        communicationSetObj: {},
        advancedSet: false,
        advancedSetObj: {},
        alternatorSet: false,
        alternatorSetObj: {},
        gridOvervoltageSet: false,
        gridOvervoltageSetObj: {},
        otherSet: false,
        otherSetObj: {},
      },
      batteryParameter: {
        isShow: false,
        batterySet: false,
        batterySetObj: {},
      },
      threePhaseMeterParameter: {
        isShow: false,
        threePhaseMeterBasic: false,
        threePhaseMeterBasicObj: {},
      },

      subList: {
        specialDateOneObj: {},
        specialDateTwoObj: {},
        specialDateThreeObj: {},
        specialDateFourObj: {},
        specialDateFiveObj: {},
        quarterOneObj: {},
        quarterTwoObj: {},
        quarterThreeObj: {},
        quarterFourObj: {},
        hourSettingObj: {},
      },
    };
  },
  computed: {
    isAdmin() {
      return this.$store.state.user.roles.includes("1");
    },

    // 计算属性，根据 WiFi 强度值计算强度级别
    getWifiStrengthLevel() {
      return (wifiStrength) => {
        console.log("WifiStrength is:" + wifiStrength);
        if (wifiStrength >= -40 && wifiStrength <= -30) {
          //   console.log(wifiStrength);
          // console.log("222----------");
          return this.$t("common.strong");
        } else if (wifiStrength >= -85 && wifiStrength < -40) {
          return this.$t("common.medium");
        } else if (wifiStrength < -90) {
          return this.$t("common.weak");
        } else {
          return this.$t("common.unknown"); // 可以根据需要设置默认值
        }
      };
    },

    ...mapState({
      userInfo: (state) => state.user.userInfo,
    }),
  },
  mounted() {
    console.log("userInfo---------", userInfo);
  },

  methods: {
    //完善单相并离网soc下限设置
    handleSaveWithValidation(key, value, min, max) {
      value = parseFloat(value);
      console.log("Value entered:", value); //Validate range

      if (value < min || value > max) {
        this.$message.error(`Please enter value between ${min}% and ${max}%.`);
        return;
      }
      this.handleSave(key, value);
    },

    saveEnableSettings() {
      const sendData = {
        deviceId: this.deviceInfo.id,
        paramSetList: [
          {
            key: "enableSettingBit4",
            dataVal: this.formData.enableSettingBit4 === "1" ? 1 : 0,
          },
        ],
      };

      updateEnable(sendData)
        .then((response) => {
          console.log("使能设置已更新");
          this.$message.success(this.$t("common.savesuccessfully"));
        })
        .catch((error) => {
          console.error("更新使能设置时出错： ", error);
          this.$message.error(this.$t("common.savefailed"));
        });
    },

    saveBatteryParameter(parameterKey) {
      const sendData = {
        deviceId: this.deviceInfo.id,
        paramSetList: [
          {
            key: parameterKey,
            dataVal: this.formData[parameterKey],
          },
        ],
      };

      batterySetCustom(sendData)
        .then((response) => {
          this.$message.success(this.$t("common.savesuccessfully"));
        })
        .catch((error) => {
          console.error("Error saving settings: ", error);
          this.$message.error(this.$t("common.savefailed"));
        });
    },

    saveCustomParameters(parameterNumber) {
      const sendData = {
        deviceId: this.deviceInfo.id,
        paramSetList: [
          {
            key: `customParameters${parameterNumber}`,
            dataVal: this.formData[`customParameters${parameterNumber}`],
          },
        ],
      };

      batterySetCustom(sendData)
        .then((response) => {
          this.$message.success(this.$t("common.savesuccessfully"));
        })
        .catch((error) => {
          console.error("Error saving settings: ", error);
          this.$message.error(this.$t("common.savefailed"));
        });
    },

    formatCustomParameters(value) {
      //将输入值格式化为最多两位小数的字符串
      const parsedValue = parseFloat(value);
      if (isNaN(parsedValue)) {
        return "";
      }
      //保留两位小数
      return parseFloat(parsedValue.toFixed(2)).toString();
    },
    parseCustomParameters(value) {
      //将输入的数字解析为数字
      const parsedValue = parseFloat(value);
      if (isNaN(parsedValue)) {
        return 0;
      }
      //确保不为负数
      return parsedValue >= 0 ? parsedValue : 0;
    },

    saveLowTemperatureProtectionDuringCharging() {
      this.saveTemperatureSetting("lowTemperatureProtectionDuringCharging");
    },

    saveLowTemperatureProtectionRecoveryDuringCharging() {
      this.saveTemperatureSetting(
        "lowTemperatureProtectionRecoveryDuringCharging"
      );
    },

    savedischargeOnHeatingTemperature() {
      this.saveTemperatureSetting("dischargeOnHeatingTemperature");
    },

    savedischargeOffHeatingTemperature() {
      this.saveTemperatureSetting("dischargeOffHeatingTemperature");
    },

    saveHeatingFanOnTemperature() {
      this.saveTemperatureSetting("heatingFanOnTemperature");
    },

    saveHeatingFanRecoveryTemperature() {
      this.saveTemperatureSetting("heatingFanRecoveryTemperature");
    },

    saveTemperatureSetting(key) {
      const value = this.formData[key];
      const sendData = {
        deviceId: this.deviceInfo.id,
        lowTemperature: {
          lowTemperatureProtectionDuringCharging:
            this.formData.lowTemperatureProtectionDuringCharging,
          lowTemperatureProtectionRecoveryDuringCharging:
            this.formData.lowTemperatureProtectionRecoveryDuringCharging,
        },
        heatingFan: {
          heatingFanOnTemperature: this.formData.heatingFanOnTemperature,
          heatingFanRecoveryTemperature:
            this.formData.heatingFanRecoveryTemperature,
        },
        discharge: {
          dischargeOnHeatingTemperature:
            this.formData.dischargeOnHeatingTemperature,
          dischargeOffHeatingTemperature:
            this.formData.dischargeOffHeatingTemperature,
        },
        [key]: value,
      };
      this.batteryUpgrade(sendData, key);
    },

    batteryUpgrade(data, key) {
      const { deviceId, lowTemperature, heatingFan, discharge } = data;

      const requestData = {
        deviceId,
        ...(key.includes("lowTemperature") ? lowTemperature : {}),
        ...(key.includes("heatingFan") ? heatingFan : {}),
        ...(key.includes("discharge") ? discharge : {}),
        [key]: data[key],
      };

      batteryUpgrade(requestData)
        .then((response) => {
          console.log("Sending to backend: ", data);
          console.log("Response from backend: ", response);

          if (response && response.deviceId === deviceId) {
            // Update the formData based on the key
            if (key.includes("lowTemperature")) {
              this.formData.lowTemperatureProtectionDuringCharging =
                response[key];
              this.formData.lowTemperatureProtectionRecoveryDuringCharging =
                response[key];
            } else if (key.includes("discharge")) {
              this.formData.dischargeOnHeatingTemperature = response[key];
              this.formData.dischargeOffHeatingTemperature = response[key];
            } else if (key.includes("heatingFan")) {
              this.formData.heatingFanOnTemperature = response[key];

              this.formData.heatingFanRecoveryTemperature = response[key];
            }

            this.$message.success(this.$t("common.savesuccessfully"));
          } else {
            console.log("response format from the backend");
            this.$message.success(this.$t("common.savesuccessfully"));
          }
        })
        .catch((error) => {
          console.error("Error saving settings: ", error);
          this.$message.error(this.$t("common.savefailed"));
        });
    },

    handleSave11(key, val) {
      if (
        this.systemSet.otherSetObj.countryCodeVal === "7" &&
        key !== "countryCode"
      ) {
        this.$message.info(this.$t("common.cannotBeChanged"));
        return;
      }
      const sendData = {
        deviceId: this.deviceInfo.id,
        paramSetList: [{ dataVal: val, key: key }],
      };
      this.savePage11ConfigSettings(sendData);
    },

    savePage11ConfigSettings(sendData) {
      console.log("Sending page11 config data to backend: ", sendData);

      savePage11ConfigData(sendData)
        .then((response) => {
          console.log("Config Page11 settings saved: ", response);

          // Update the front-end input values if needed
          // ...

          this.$message.success(this.$t("common.savesuccessfully"));
        })
        .catch((error) => {
          console.error("Error saving config settings: ", error);
          this.$message.error(this.$t("common.savefailed"));
        });
    },

    saveConfigSettings(sendData) {
      console.log("Sending config data to backend: ", sendData);

      saveConfigData(sendData)
        .then((response) => {
          console.log("Config settings saved: ", response);

          // Update the front-end input values if needed
          // ...

          this.$message.success(this.$t("common.savesuccessfully"));
        })
        .catch((error) => {
          console.error("Error saving config settings: ", error);
          this.$message.error(this.$t("common.savefailed"));
        });
    },

    handleSave(key, val) {
      if (
        this.systemSet.otherSetObj.countryCodeVal === "7" &&
        key !== "countryCode"
      ) {
        this.$message.info(this.$t("common.cannotBeChanged"));
        return;
      }

      if (key.includes("lowTemperature") || key.includes("heatingFan")) {
        // For temperature-related settings
        this.saveTemperatureSettings(
          "lowTemperatureProtectionDuringCharging",
          val,
          "lowTemperatureProtectionRecoveryDuringCharging"
        );
      } else if (key.includes("discharge")) {
        this.saveTemperatureSettings(
          "dischargeOnHeatingTemperature",
          val,
          "dischargeOffHeatingTemperature"
        );
      } else {
        // For other settings
        const sendData = {
          deviceId: this.deviceInfo.id,
          paramSetList: [{ dataVal: val, key: key }],
        };
        this.saveConfigSettings(sendData);
      }
    },

    handleConfigSave(key, val) {
      if (
        this.systemSet.otherSetObj.countryCodeVal === "7" &&
        key !== "countryCode"
      ) {
        this.$message.info(this.$t("common.cannotBeChanged"));
        return;
      }

      const sendData = {
        deviceId: this.deviceInfo.id,
        paramSetList: [{ dataVal: val, key: key }],
      };
      this.saveConfigSettings(sendData);
    },

    init(info) {
      console.log("init", info);
      this.deviceInfo = { ...info };
      console.log("设备信息： ", this.deviceInfo);
      if (this.deviceInfo.onlineStatus === 1) {
        this.handleMqttInit();
      } else {
        this.$message.info("设备不在线");
        console.log("这个设备不在线");
      }
    },
    handleSelect(index) {
      if (this.deviceInfo.onlineStatus === 1) {
        this.activeIndex = index;
        if (index === "0") {
          this.$nextTick(() => {
            this.$refs.selfTest.init(this.deviceInfo);
          });
        } else {
          this.getData();
        }
      } else {
        this.$message.info("设备不在线");
      }
    },
    goBack() {
      this.$emit("back");
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
      this.mqttClient
        .on("connect", (res) => {
          this.connectState = "connect";
          this.subscribeInfo();
          // this.loading = false
          console.log("mqtt连接成功", res);
        })
        .on("message", (topic, message) => {
          const messageInfo = JSON.parse(message.toString());
          if (this.activeIndex === "0") {
            this.$refs.selfTest.initMqttData(messageInfo);
          } else {
            if (this.activeIndex === "11" && messageInfo.valType === 11) {
              console.log("page11 messageInfo:", JSON.parse(messageInfo.val));

              this.loading = false;
              this.paramsChange(JSON.parse(messageInfo.val));
            } else if (
              this.activeIndex === "13" &&
              messageInfo.valType === 13
            ) {
              console.log("page13 messageInfo:", JSON.parse(messageInfo.val));

              this.loading = false;
              this.paramsChange(JSON.parse(messageInfo.val));
            } else if (messageInfo.msgOperation === 5) {
              console.log("dataList", JSON.parse(messageInfo.val));

              this.loading = false;
              this.paramsChange(JSON.parse(messageInfo.val));
            }
          }
        });
    },
    // 订阅主题 /APP/设备id/NEWS
    subscribeInfo() {
      if (!this.mqttClient || this.connectState !== "connect") {
        this.toast("通讯未连接");
        return;
      }
      this.mqttClient.subscribe(
        `/APP/${this.deviceInfo.id}/NEWS`,
        (err, granted) => {
          // console.log('订阅主题', `/APP/${this.deviceInfo.id}/NEWS`, err, granted)
          if (!err) {
            console.log("===订阅主题 订阅成功===");
            this.getData();
          }
        }
      );
    },
    // 运行信息
    operationInformationIsDisplay(key1, key2) {
      let role = this.userInfo.roles[0];
      // console.log(
      //   "运行信息参数配置" + this.operationInformation[key1][key2 + "isShow"]
      // );
      if (role == "1") {
        if (this.operationInformation[key1][key2 + "isShow"]) {
          return true;
        } else {
          return false;
        }
      }
      if (role == "2") {
        if (this.operationInformation[key1][key2 + "installerIsShow"]) {
          return true;
        } else {
          return false;
        }
      }
      if (role == "3") {
        if (this.operationInformation[key1][key2 + "consumerIsShow"]) {
          return true;
        } else {
          return false;
        }
      }
      if (role == "4") {
        if (this.operationInformation[key1][key2 + "installerIsShow"]) {
          return true;
        } else {
          return false;
        }
      }
      if (role == "5") {
        if (this.operationInformation[key1][key2 + "installerIsShow"]) {
          return true;
        } else {
          return false;
        }
      }
      return true;
    },
    // 系统设置
    systemSetIsDisplay(key1, key2) {
      let role = this.userInfo.roles[0];
      // console.log(this.operationInformation[key1][key2 + 'isShow'])
      if (role == "1") {
        if (this.systemSet[key1][key2 + "isShow"]) {
          return true;
        } else {
          return false;
        }
      }
      if (role == "2") {
        if (this.systemSet[key1][key2 + "installerIsShow"]) {
          return true;
        } else {
          return false;
        }
      }
      if (role == "3") {
        if (this.systemSet[key1][key2 + "consumerIsShow"]) {
          return true;
        } else {
          return false;
        }
      }
      if (role == "4") {
        if (this.systemSet[key1][key2 + "installerIsShow"]) {
          return true;
        } else {
          return false;
        }
      }
      if (role == "5") {
        if (this.systemSet[key1][key2 + "installerIsShow"]) {
          return true;
        } else {
          return false;
        }
      }
      return true;
    },
    // 系统设置--保存
    systemSetBtnIsDisplay(key1, key2) {
      let role = this.userInfo.roles[0];
      // console.log(this.operationInformation[key1][key2 + 'isShow'])
      if (role == "1") {
        if (this.systemSet[key1][key2 + "canSet"]) {
          return true;
        } else {
          return false;
        }
      }
      if (role == "2") {
        if (this.systemSet[key1][key2 + "installerCanSet"]) {
          return true;
        } else {
          return false;
        }
      }
      if (role == "3") {
        if (this.systemSet[key1][key2 + "consumerCanSet"]) {
          return true;
        } else {
          return false;
        }
      }
      if (role == "4") {
        if (this.systemSet[key1][key2 + "installerCanSet"]) {
          return true;
        } else {
          return false;
        }
      }
      if (role == "5") {
        if (this.systemSet[key1][key2 + "installerCanSet"]) {
          return true;
        } else {
          return false;
        }
      }
      return true;
    },

    //单相定时设置配置
    timeSettingIsDisplay(key1, key2) {
      let role = this.userInfo.roles[0];
      if (role == "1") {
        if (this.subList[key1][key2 + "isShow"]) {
          return true;
        } else {
          return false;
        }
      }
      if (role == "2") {
        if (this.subList[key1][key2 + "installerIsShow"]) {
          return true;
        } else {
          return false;
        }
      }
      if (role == "3") {
        if (this.subList[key1][key2 + "consumerIsShow"]) {
          return true;
        } else {
          return false;
        }
      }
      if (role == "4") {
        if (this.subList[key1][key2 + "installerIsShow"]) {
          return true;
        } else {
          return false;
        }
      }
      if (role == "5") {
        if (this.subList[key1][key2 + "installerIsShow"]) {
          return true;
        } else {
          return false;
        }
      }
      return true;
    },

    timeSettingIsSet(key1, key2) {
      let role = this.userInfo.roles[0];
      if (role == "1") {
        if (this.subList[key1][key2 + "canSet"]) {
          return true;
        } else {
          return false;
        }
      }
      if (role == "2") {
        if (this.subList[key1][key2 + "installerCanSet"]) {
          return true;
        } else {
          return false;
        }
      }
      if (role == "3") {
        if (this.subList[key1][key2 + "consumerCanSet"]) {
          return true;
        } else {
          return false;
        }
      }
      if (role == "4") {
        if (this.subList[key1][key2 + "installerCanSet"]) {
          return true;
        } else {
          return false;
        }
      }
      if (role == "5") {
        if (this.subList[key1][key2 + "installerCanSet"]) {
          return true;
        } else {
          return false;
        }
      }
      return true;
    },

    // 电池参数
    batteryParameterIsDisplay(key2) {
      let role = this.userInfo.roles[0];
      // console.log(this.batteryParameter[key1][key2 + 'isShow'])
      if (role == "1") {
        if (this.batteryParameter["batterySetObj"][key2 + "isShow"]) {
          return true;
        } else {
          return false;
        }
      }
      if (role == "2") {
        if (this.batteryParameter["batterySetObj"][key2 + "installerIsShow"]) {
          return true;
        } else {
          return false;
        }
      }
      if (role == "3") {
        if (this.batteryParameter["batterySetObj"][key2 + "consumerIsShow"]) {
          return true;
        } else {
          return false;
        }
      }
      if (role == "4") {
        if (this.batteryParameter["batterySetObj"][key2 + "installerIsShow"]) {
          return true;
        } else {
          return false;
        }
      }
      if (role == "5") {
        if (this.batteryParameter["batterySetObj"][key2 + "installerIsShow"]) {
          return true;
        } else {
          return false;
        }
      }
      return true;
    },
    // 三相
    threePhaseMeterParameterIsDisplay(key2) {
      let role = this.userInfo.roles[0];
      // console.log(this.batteryParameter[key1][key2 + 'isShow'])
      if (role == "1") {
        if (
          this.threePhaseMeterParameter["threePhaseMeterBasicObj"][
            key2 + "isShow"
          ]
        ) {
          return true;
        } else {
          return false;
        }
      }
      if (role == "2") {
        if (
          this.threePhaseMeterParameter["threePhaseMeterBasicObj"][
            key2 + "installerIsShow"
          ]
        ) {
          return true;
        } else {
          return false;
        }
      }
      if (role == "3") {
        if (
          this.threePhaseMeterParameter["threePhaseMeterBasicObj"][
            key2 + "consumerIsShow"
          ]
        ) {
          return true;
        } else {
          return false;
        }
      }
      if (role == "4") {
        if (
          this.threePhaseMeterParameter["threePhaseMeterBasicObj"][
            key2 + "installerIsShow"
          ]
        ) {
          return true;
        } else {
          return false;
        }
      }
      if (role == "5") {
        if (
          this.threePhaseMeterParameter["threePhaseMeterBasicObj"][
            key2 + "installerIsShow"
          ]
        ) {
          return true;
        } else {
          return false;
        }
      }
      return true;
    },
    // 数据处理转换
    paramsChange(res) {
      console.log(res, "res------");
      console.log(Array.isArray(res), "res是数组吗");

      const subListKeys = Object.keys(this.subList);

      if (res.pageType && res.subList) {
        res.subList.forEach((item) => {
          const ObjKey = `${item.subName}Obj`;
          if (subListKeys.includes(ObjKey)) {
            item.voList.forEach((vo) => {
              this.$set(this.subList[ObjKey], vo.key + "Val", vo.val);
              this.$set(this.subList[ObjKey], vo.key + "isShow", vo.isShow);
              this.$set(this.subList[ObjKey], vo.key + "canSet", vo.canSet);
              this.$set(
                this.subList[ObjKey],
                vo.key + "installerIsShow",
                vo.installerIsShow
              );
              this.$set(
                this.subList[ObjKey],
                vo.key + "installerCanSet",
                vo.installerCanSet
              );
              this.$set(
                this.subList[ObjKey],
                vo.key + "consumerIsShow",
                vo.consumerIsShow
              );
              this.$set(
                this.subList[ObjKey],
                vo.key + "consumerCanSet",
                vo.consumerCanSet
              );
              this.$set(this.subList[ObjKey], vo.key + "unit", vo.unit);
            });
          }
        });
        console.log("page11中的参数：", this.subList.specialDateOneObj);
      }

      if (!Array.isArray(res)) {
        return;
      }
      res.forEach((item) => {
        if (item.key === "operationInformation" && this.activeIndex === "7") {
          this.operationInformation.isShow = item.isShow === 1;
          item.dataList &&
            item.dataList.forEach((i) => {
              this.operationInformation[`${i.key}`] = i.isShow === 1;
              i.dataList.forEach((j) => {
                this.$set(
                  this.operationInformation[`${i.key}Obj`],
                  `${j.key}isShow`,
                  j.isShow
                );
                this.$set(
                  this.operationInformation[`${i.key}Obj`],
                  `${j.key}installerIsShow`,
                  j.installerIsShow
                );
                this.$set(
                  this.operationInformation[`${i.key}Obj`],
                  `${j.key}consumerIsShow`,
                  j.consumerIsShow
                );
                this.$set(
                  this.operationInformation[`${i.key}Obj`],
                  `${j.key}Val`,
                  j.val
                );
              });
            });
          console.log("this.operationInformation", this.operationInformation);
        } else if (item.key === "systemSet" && this.activeIndex === "8") {
          this.systemSet.isShow = item.isShow === 1;
          item.dataList &&
            item.dataList.forEach((i) => {
              this.systemSet[`${i.key}`] = i.isShow === 1;
              i.dataList.forEach((j) => {
                // this.$set(this.systemSet[`${i.key}Obj`], `${j.key}`, j.isShow === 1)
                // this.$set(this.systemSet[`${i.key}Obj`], `${j.key}Val`, j.val)
                this.$set(
                  this.systemSet[`${i.key}Obj`],
                  `${j.key}isShow`,
                  j.isShow
                );
                this.$set(
                  this.systemSet[`${i.key}Obj`],
                  `${j.key}canSet`,
                  j.canSet
                );
                this.$set(
                  this.systemSet[`${i.key}Obj`],
                  `${j.key}installerIsShow`,
                  j.installerIsShow
                );
                this.$set(
                  this.systemSet[`${i.key}Obj`],
                  `${j.key}installerCanSet`,
                  j.installerCanSet
                );
                this.$set(
                  this.systemSet[`${i.key}Obj`],
                  `${j.key}consumerIsShow`,
                  j.consumerIsShow
                );
                this.$set(
                  this.systemSet[`${i.key}Obj`],
                  `${j.key}consumerCanSet`,
                  j.consumerCanSet
                );
                this.$set(this.systemSet[`${i.key}Obj`], `${j.key}Val`, j.val);
              });
            });
          // console.log('this.systemSet', this.systemSet)
        } else if (
          item.key === "batteryParameter" &&
          this.activeIndex === "9"
        ) {
          this.batteryParameter.isShow = item.isShow === 1;
          item.dataList &&
            item.dataList.forEach((i) => {
              this.batteryParameter[`${i.key}`] = i.isShow === 1;
              i.dataList.forEach((j) => {
                // this.$set(this.batteryParameter[`${i.key}Obj`], `${j.key}`, j.isShow === 1)
                this.$set(
                  this.batteryParameter[`${i.key}Obj`],
                  `${j.key}isShow`,
                  j.isShow
                );
                this.$set(
                  this.batteryParameter[`${i.key}Obj`],
                  `${j.key}installerIsShow`,
                  j.installerIsShow
                );
                this.$set(
                  this.batteryParameter[`${i.key}Obj`],
                  `${j.key}consumerIsShow`,
                  j.consumerIsShow
                );
                this.$set(
                  this.batteryParameter[`${i.key}Obj`],
                  `${j.key}Val`,
                  j.val
                );
              });
            });
          // console.log('this.batteryParameter', this.batteryParameter)
        } else if (
          item.key === "threePhaseMeterParameter" &&
          this.activeIndex === "13"
        ) {
          this.threePhaseMeterParameter.isShow = item.isShow === 1;
          item.dataList &&
            item.dataList.forEach((i) => {
              this.threePhaseMeterParameter[`${i.key}`] = i.isShow === 1;
              i.dataList.forEach((j) => {
                // this.$set(this.threePhaseMeterParameter[`${i.key}Obj`], `${j.key}`, j.isShow === 1)
                this.$set(
                  this.threePhaseMeterParameter[`${i.key}Obj`],
                  `${j.key}isShow`,
                  j.isShow
                );
                this.$set(
                  this.threePhaseMeterParameter[`${i.key}Obj`],
                  `${j.key}installerIsShow`,
                  j.installerIsShow
                );
                this.$set(
                  this.threePhaseMeterParameter[`${i.key}Obj`],
                  `${j.key}consumerIsShow`,
                  j.consumerIsShow
                );
                this.$set(
                  this.threePhaseMeterParameter[`${i.key}Obj`],
                  `${j.key}Val`,
                  j.val
                );
              });
            });
          console.log(
            "this.threePhaseMeterParameter",
            this.threePhaseMeterParameter
          );
        }
      });
    },
    getData() {
      this.loading = true;
      getConfigData({
        deviceId: this.deviceInfo.id,
        val: Number(this.activeIndex),
      }).catch(() => {
        this.loading = false;
      });
      setTimeout(() => {
        this.loading = false;
      }, 3000);
    },
  },
  beforeDestroy() {
    console.log("页面卸载了====关闭mqtt客户端连接");
    window.removeEventListener("scroll", this.handleScroll);
    if (this.mqttClient) {
      this.mqttClient.end(true);
      this.mqttClient = null;
      this.connectState = "init";
      this.interObj && clearInterval(this.interObj);
    }
  },
};
</script>

<style lang="scss">
.realTime {
  .el-descriptions-item__container {
    align-items: center !important;
  }
}

.fixed-sn-box {
  position: fixed;
  top: 180px;
  right: 100px;
  background-color: green;
  padding: 10px;
  border: 1px solid #dcdcdc;
  border-radius: 20px;
  font-size: 18px;
  color: white;
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}
.input-container {
  display: flex;
  align-items: center;
}

.input-container span {
  margin-right: 10px;
}
.custom-input {
  width: 100px;
  margin-right: 10px;
}
.save-button {
  border: none;
  width: auto;
  color: green;
}
</style>
