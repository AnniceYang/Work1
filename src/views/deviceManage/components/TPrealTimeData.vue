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
        <el-menu-item index="41">{{
          $t("deviceManage.monitorData")
        }}</el-menu-item>

        <el-menu-item index="42">{{
          $t("deviceManage.primaryControlData")
        }}</el-menu-item>

        <el-menu-item index="43">{{
          $t("deviceManage.meterData")
        }}</el-menu-item>

        <el-menu-item index="44">{{
          $t("deviceManage.eastBCUData")
        }}</el-menu-item>

        <el-menu-item index="45">{{
          $t("deviceManage.eastBMSData")
        }}</el-menu-item>

        <el-menu-item index="46">{{
          $t("deviceManage.deviceInformation")
        }}</el-menu-item>

        <el-menu-item index="47">{{
          $t("deviceManage.monitorSettings")
        }}</el-menu-item>

        <el-menu-item index="48">{{
          $t("deviceManage.masterUser")
        }}</el-menu-item>

        <el-menu-item index="49">{{
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
      </el-menu>
      <div v-loading="loading">
        <el-card style="margin-top: 20px">
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

        <!-- 三相系统的专属 -->
        <template v-if="activeIndex === '41'">
          <el-card style="margin-top: 10px">
            <el-descriptions
              :title="$t('deviceManage.monitorData')"
              :column="3"
            >
              <el-descriptions-item :label="$t('threePhase.TP_0X04_0')">
                {{ TP_0X04_0Filter[voListMap["41"]["TP_0X04_0"].val] }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X04_1')">{{
                voListMap["41"]["TP_0X04_1"].val
              }}</el-descriptions-item>

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2')"
                v-if="CCIsDisplay('41', 'TP_0X04_2')"
                >{{ voListMap["41"]["TP_0X04_2"].val }}</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_8')"
                v-if="CCIsDisplay('41', 'TP_0X04_8')"
                >{{
                  TP_0X04_8Filter[voListMap["41"]["TP_0X04_8"].val]
                }}</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_9')"
                v-if="CCIsDisplay('41', 'TP_0X04_9')"
              >
                {{ voListMap["41"]["TP_0X04_9"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_14')"
                v-if="CCIsDisplay('41', 'TP_0X04_14')"
              >
                {{ TP_0X04_14Filter[voListMap["41"]["TP_0X04_14"].val] }}
              </el-descriptions-item>

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_18')"
                v-if="CCIsDisplay('41', 'TP_0X04_18')"
              >
                {{ BMSFilter[voListMap["41"]["TP_0X04_18"].val] }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_19')"
                v-if="CCIsDisplay('41', 'TP_0X04_19')"
              >
                {{ meterNormalFilter[voListMap["41"]["TP_0X04_19"].val] }}
              </el-descriptions-item>

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_24')"
                v-if="CCIsDisplay('41', 'TP_0X04_24')"
                >{{
                  voListMap["41"]["TP_0X04_24"].val
                }}kWh</el-descriptions-item
              >

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_25')"
                v-if="CCIsDisplay('41', 'TP_0X04_25')"
                >{{ voListMap["41"]["TP_0X04_25"].val }}%</el-descriptions-item
              >

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_31_32')"
                v-if="CCIsDisplay('41', 'TP_0X04_31_32')"
                >{{
                  voListMap["41"]["TP_0X04_31_32"].val
                }}kWh</el-descriptions-item
              >

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_33_34')"
                v-if="CCIsDisplay('41', 'TP_0X04_33_34')"
                >{{
                  voListMap["41"]["TP_0X04_33_34"].val
                }}kWh</el-descriptions-item
              >

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_35_36')"
                v-if="CCIsDisplay('41', 'TP_0X04_35_36')"
              >
                {{ voListMap["41"]["TP_0X04_35_36"].val }}kWh
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_37_38')"
                v-if="CCIsDisplay('41', 'TP_0X04_37_38')"
              >
                {{ voListMap["41"]["TP_0X04_37_38"].val }}kWh
              </el-descriptions-item>

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_39_40')"
                v-if="CCIsDisplay('41', 'TP_0X04_39_40')"
              >
                {{ voListMap["41"]["TP_0X04_39_40"].val }}kWh
              </el-descriptions-item>

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_41_42')"
                v-if="CCIsDisplay('41', 'TP_0X04_41_42')"
              >
                {{ voListMap["41"]["TP_0X04_41_42"].val }}kWh
              </el-descriptions-item>

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_43_44')"
                v-if="CCIsDisplay('41', 'TP_0X04_43_44')"
              >
                {{ voListMap["41"]["TP_0X04_43_44"].val }}kWh
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_45_46')"
                v-if="CCIsDisplay('41', 'TP_0X04_45_46')"
              >
                {{ voListMap["41"]["TP_0X04_45_46"].val }}kWh
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_47_48')"
                v-if="CCIsDisplay('41', 'TP_0X04_47_48')"
              >
                {{ voListMap["41"]["TP_0X04_47_48"].val }}kWh
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_49_50')"
                v-if="CCIsDisplay('41', 'TP_0X04_49_50')"
              >
                {{ voListMap["41"]["TP_0X04_49_50"].val }}kWh
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_51_52')"
                v-if="CCIsDisplay('41', 'TP_0X04_51_52')"
              >
                {{ voListMap["41"]["TP_0X04_51_52"].val }}kWh
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_53_54')"
                v-if="CCIsDisplay('41', 'TP_0X04_53_54')"
              >
                {{ voListMap["41"]["TP_0X04_53_54"].val }}kWh
              </el-descriptions-item>

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_55_56')"
                v-if="CCIsDisplay('41', 'TP_0X04_55_56')"
              >
                {{ voListMap["41"]["TP_0X04_55_56"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_57_58')"
                v-if="CCIsDisplay('41', 'TP_0X04_57_58')"
              >
                {{ voListMap["41"]["TP_0X04_57_58"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_59_60')"
                v-if="CCIsDisplay('41', 'TP_0X04_59_60')"
              >
                {{ voListMap["41"]["TP_0X04_59_60"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_61_62')"
                v-if="CCIsDisplay('41', 'TP_0X04_61_62')"
              >
                {{ voListMap["41"]["TP_0X04_61_62"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_63')"
                v-if="CCIsDisplay('41', 'TP_0X04_63')"
              >
                {{ voListMap["41"]["TP_0X04_63"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_64')"
                v-if="CCIsDisplay('41', 'TP_0X04_64')"
              >
                {{ voListMap["41"]["TP_0X04_64"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_65')"
                v-if="CCIsDisplay('41', 'TP_0X04_65')"
              >
                {{ voListMap["41"]["TP_0X04_65"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_66')"
                v-if="CCIsDisplay('41', 'TP_0X04_66')"
              >
                {{ voListMap["41"]["TP_0X04_66"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_67')"
                v-if="CCIsDisplay('41', 'TP_0X04_67')"
              >
                {{ voListMap["41"]["TP_0X04_67"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_68')"
                v-if="CCIsDisplay('41', 'TP_0X04_68')"
              >
                {{ voListMap["41"]["TP_0X04_68"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_69')"
                v-if="CCIsDisplay('41', 'TP_0X04_69')"
              >
                {{ voListMap["41"]["TP_0X04_69"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_70')"
                v-if="CCIsDisplay('41', 'TP_0X04_70')"
              >
                {{ voListMap["41"]["TP_0X04_70"].val }}
              </el-descriptions-item>

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_77')"
                v-if="CCIsDisplay('41', 'TP_0X04_77')"
              >
                {{ voListMap["41"]["TP_0X04_77"].val }}d
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_78')"
                v-if="CCIsDisplay('41', 'TP_0X04_78')"
              >
                {{ voListMap["41"]["TP_0X04_78"].val }}h
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_79')"
                v-if="CCIsDisplay('41', 'TP_0X04_79')"
              >
                {{ voListMap["41"]["TP_0X04_79"].val }}min
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_80')"
                v-if="CCIsDisplay('41', 'TP_0X04_80')"
              >
                {{ voListMap["41"]["TP_0X04_80"].val }}s
              </el-descriptions-item>
            </el-descriptions>
          </el-card>
        </template>

        <template v-if="activeIndex === '42'">
          <el-card style="margin-top: 10px">
            <el-descriptions
              :title="$t('deviceManage.primaryControlData')"
              :column="3"
            >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1024')"
                v-if="CCIsDisplay('42', 'TP_0X04_1024')"
              >
                {{ voListMap["42"]["TP_0X04_1024"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1025')"
                v-if="CCIsDisplay('42', 'TP_0X04_1025')"
                >{{ voListMap["42"]["TP_0X04_1025"].val }}</el-descriptions-item
              >

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1026')"
                v-if="CCIsDisplay('42', 'TP_0X04_1026')"
                >{{ voListMap["42"]["TP_0X04_1026"].val }}</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1027')"
                v-if="CCIsDisplay('42', 'TP_0X04_1027')"
                >{{ voListMap["42"]["TP_0X04_1027"].val }}</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1028')"
                v-if="CCIsDisplay('42', 'TP_0X04_1028')"
              >
                {{ voListMap["42"]["TP_0X04_1028"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1029')"
                v-if="CCIsDisplay('42', 'TP_0X04_1029')"
              >
                {{ voListMap["42"]["TP_0X04_1029"].val }}kVar
              </el-descriptions-item>

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1030')"
                v-if="CCIsDisplay('42', 'TP_0X04_1030')"
              >
                {{ voListMap["42"]["TP_0X04_1030"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1031')"
                v-if="CCIsDisplay('42', 'TP_0X04_1031')"
              >
                {{ countryCodeFilter[voListMap["42"]["TP_0X04_1031"].val] }}
              </el-descriptions-item>

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1032')"
                v-if="CCIsDisplay('42', 'TP_0X04_1032')"
              >
                {{ voListMap["42"]["TP_0X04_1032"].val }}V
              </el-descriptions-item>

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1033')"
                v-if="CCIsDisplay('42', 'TP_0X04_1033')"
              >
                {{ voListMap["42"]["TP_0X04_1033"].val }}W
              </el-descriptions-item>

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1034')"
                v-if="CCIsDisplay('42', 'TP_0X04_1034')"
              >
                {{ systemModeFilter[voListMap["42"]["TP_0X04_1034"].val] }}
              </el-descriptions-item>

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1035')"
                v-if="CCIsDisplay('42', 'TP_0X04_1035')"
              >
                {{ controlSourceFilter[voListMap["42"]["TP_0X04_1035"].val] }}
              </el-descriptions-item>

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1036')"
                v-if="CCIsDisplay('42', 'TP_0X04_1036')"
                >{{ voListMap["42"]["TP_0X04_1036"].val }}</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1037')"
                v-if="CCIsDisplay('42', 'TP_0X04_1037')"
                >{{
                  voListMap["42"]["TP_0X04_1037"].val
                }}kW</el-descriptions-item
              >

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1038')"
                v-if="CCIsDisplay('42', 'TP_0X04_1038')"
                >{{ voListMap["42"]["TP_0X04_1038"].val }}</el-descriptions-item
              >

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1039_1040')"
                v-if="CCIsDisplay('42', 'TP_0X04_1039_1040')"
                >{{
                  voListMap["42"]["TP_0X04_1039_1040"].val
                }}Wh</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1041_1042')"
                v-if="CCIsDisplay('42', 'TP_0X04_1041_1042')"
                >{{
                  voListMap["42"]["TP_0X04_1041_1042"].val
                }}Wh</el-descriptions-item
              >

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1043_1044')"
                v-if="CCIsDisplay('42', 'TP_0X04_1043_1044')"
                >{{
                  voListMap["42"]["TP_0X04_1043_1044"].val
                }}Wh</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1045_1046')"
                v-if="CCIsDisplay('42', 'TP_0X04_1045_1046')"
                >{{
                  voListMap["42"]["TP_0X04_1045_1046"].val
                }}Wh</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1050')"
                v-if="CCIsDisplay('42', 'TP_0X04_1050')"
              >
                {{ systemStateFilter[voListMap["42"]["TP_0X04_1050"].val] }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1051')"
                v-if="CCIsDisplay('42', 'TP_0X04_1051')"
                >{{ voListMap["42"]["TP_0X04_1051"].val }}</el-descriptions-item
              >

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1052')"
                v-if="CCIsDisplay('42', 'TP_0X04_1052')"
              >
                {{ batteryStatusFilter[voListMap["42"]["TP_0X04_1052"].val] }}
              </el-descriptions-item>

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1053')"
                v-if="CCIsDisplay('42', 'TP_0X04_1053')"
              >
                {{ GridStateFilter[voListMap["42"]["TP_0X04_1053"].val] }}
              </el-descriptions-item>

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1054')"
                v-if="CCIsDisplay('42', 'TP_0X04_1054')"
              >
                {{ invertingStateFilter[voListMap["42"]["TP_0X04_1054"].val] }}
              </el-descriptions-item>

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1055')"
                v-if="CCIsDisplay('42', 'TP_0X04_1055')"
                >{{
                  faultStatusFilter[voListMap["42"]["TP_0X04_1055"].val]
                }}</el-descriptions-item
              >

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1057')"
                v-if="CCIsDisplay('42', 'TP_0X04_1057')"
                >{{
                  voListMap["42"]["TP_0X04_1057"].val
                }}V</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1058')"
                v-if="CCIsDisplay('42', 'TP_0X04_1058')"
                >{{
                  voListMap["42"]["TP_0X04_1058"].val
                }}A</el-descriptions-item
              >

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1059')"
                v-if="CCIsDisplay('42', 'TP_0X04_1059')"
                >{{
                  voListMap["42"]["TP_0X04_1059"].val
                }}V</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1060')"
                v-if="CCIsDisplay('42', 'TP_0X04_1060')"
                >{{
                  voListMap["42"]["TP_0X04_1060"].val
                }}A</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1061')"
                v-if="CCIsDisplay('42', 'TP_0X04_1061')"
                >{{
                  voListMap["42"]["TP_0X04_1061"].val
                }}kW</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1062')"
                v-if="CCIsDisplay('42', 'TP_0X04_1062')"
                >{{
                  voListMap["42"]["TP_0X04_1062"].val
                }}kW</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1063')"
                v-if="CCIsDisplay('42', 'TP_0X04_1063')"
                >{{ voListMap["42"]["TP_0X04_1063"].val }}V
              </el-descriptions-item>

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1064')"
                v-if="CCIsDisplay('42', 'TP_0X04_1064')"
                >{{
                  voListMap["42"]["TP_0X04_1064"].val
                }}kΩ</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1065')"
                v-if="CCIsDisplay('42', 'TP_0X04_1065')"
                >{{
                  voListMap["42"]["TP_0X04_1065"].val
                }}kΩ</el-descriptions-item
              >

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1066')"
                v-if="CCIsDisplay('42', 'TP_0X04_1066')"
                >{{
                  voListMap["42"]["TP_0X04_1066"].val
                }}V</el-descriptions-item
              >

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1067')"
                v-if="CCIsDisplay('42', 'TP_0X04_1067')"
                >{{
                  voListMap["42"]["TP_0X04_1067"].val
                }}V</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1068')"
                v-if="CCIsDisplay('42', 'TP_0X04_1068')"
                >{{
                  voListMap["42"]["TP_0X04_1068"].val
                }}V</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1070')"
                v-if="CCIsDisplay('42', 'TP_0X04_1070')"
                >{{
                  voListMap["42"]["TP_0X04_1070"].val
                }}V</el-descriptions-item
              >

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1071')"
                v-if="CCIsDisplay('42', 'TP_0X04_1071')"
                >{{
                  voListMap["42"]["TP_0X04_1071"].val
                }}V</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1072')"
                v-if="CCIsDisplay('42', 'TP_0X04_1072')"
                >{{
                  voListMap["42"]["TP_0X04_1072"].val
                }}A</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1073')"
                v-if="CCIsDisplay('42', 'TP_0X04_1073')"
                >{{
                  voListMap["42"]["TP_0X04_1073"].val
                }}W</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1074')"
                v-if="CCIsDisplay('42', 'TP_0X04_1074')"
                >{{
                  voListMap["42"]["TP_0X04_1074"].val
                }}%</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1075')"
                v-if="CCIsDisplay('42', 'TP_0X04_1075')"
                >{{
                  voListMap["42"]["TP_0X04_1075"].val
                }}%</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1076')"
                v-if="CCIsDisplay('42', 'TP_0X04_1076')"
                >{{
                  voListMap["42"]["TP_0X04_1076"].val
                }}A</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1077')"
                v-if="CCIsDisplay('42', 'TP_0X04_1077')"
                >{{
                  voListMap["42"]["TP_0X04_1077"].val
                }}A</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1078')"
                v-if="CCIsDisplay('42', 'TP_0X04_1078')"
                >{{
                  voListMap["42"]["TP_0X04_1078"].val
                }}Min</el-descriptions-item
              >
            </el-descriptions>
          </el-card>

          <el-card style="margin-top: 10px">
            <el-descriptions
              :title="$t('deviceManage.powerGridInformation')"
              :column="3"
            >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1082')"
                v-if="CCIsDisplay('42', 'TP_0X04_1082')"
                >{{
                  voListMap["42"]["TP_0X04_1082"].val
                }}V</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1083')"
                v-if="CCIsDisplay('42', 'TP_0X04_1083')"
                >{{
                  voListMap["42"]["TP_0X04_1083"].val
                }}V</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1084')"
                v-if="CCIsDisplay('42', 'TP_0X04_1084')"
                >{{
                  voListMap["42"]["TP_0X04_1084"].val
                }}V</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1085')"
                v-if="CCIsDisplay('42', 'TP_0X04_1085')"
                >{{
                  voListMap["42"]["TP_0X04_1085"].val
                }}A</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1086')"
                v-if="CCIsDisplay('42', 'TP_0X04_1086')"
                >{{
                  voListMap["42"]["TP_0X04_1086"].val
                }}A</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1087')"
                v-if="CCIsDisplay('42', 'TP_0X04_1087')"
                >{{
                  voListMap["42"]["TP_0X04_1087"].val
                }}A</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1088')"
                v-if="CCIsDisplay('42', 'TP_0X04_1088')"
                >{{
                  voListMap["42"]["TP_0X04_1088"].val
                }}Hz</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1089')"
                v-if="CCIsDisplay('42', 'TP_0X04_1089')"
                >{{
                  voListMap["42"]["TP_0X04_1089"].val
                }}Hz</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1090')"
                v-if="CCIsDisplay('42', 'TP_0X04_1090')"
                >{{
                  voListMap["42"]["TP_0X04_1090"].val
                }}Hz</el-descriptions-item
              >

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1091_1092')"
                v-if="CCIsDisplay('42', 'TP_0X04_1091_1092')"
                >{{
                  voListMap["42"]["TP_0X04_1091_1092"].val
                }}VA</el-descriptions-item
              >

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1093_1094')"
                v-if="CCIsDisplay('42', 'TP_0X04_1093_1094')"
                >{{
                  voListMap["42"]["TP_0X04_1093_1094"].val
                }}VA</el-descriptions-item
              >

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1095_1096')"
                v-if="CCIsDisplay('42', 'TP_0X04_1095_1096')"
                >{{
                  voListMap["42"]["TP_0X04_1095_1096"].val
                }}VA</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1097_1098')"
                v-if="CCIsDisplay('42', 'TP_0X04_1097_1098')"
                >{{
                  voListMap["42"]["TP_0X04_1097_1098"].val
                }}W</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1099_1100')"
                v-if="CCIsDisplay('42', 'TP_0X04_1099_1100')"
                >{{
                  voListMap["42"]["TP_0X04_1099_1100"].val
                }}W</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1101_1102')"
                v-if="CCIsDisplay('42', 'TP_0X04_1101_1102')"
                >{{
                  voListMap["42"]["TP_0X04_1101_1102"].val
                }}W</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1103_1104')"
                v-if="CCIsDisplay('42', 'TP_0X04_1103_1104')"
                >{{
                  voListMap["42"]["TP_0X04_1103_1104"].val
                }}VAR</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1105_1106')"
                v-if="CCIsDisplay('42', 'TP_0X04_1105_1106')"
                >{{
                  voListMap["42"]["TP_0X04_1105_1106"].val
                }}VAR</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1107_1108')"
                v-if="CCIsDisplay('42', 'TP_0X04_1107_1108')"
                >{{
                  voListMap["42"]["TP_0X04_1107_1108"].val
                }}VAR</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1109_1110')"
                v-if="CCIsDisplay('42', 'TP_0X04_1109_1110')"
                >{{
                  voListMap["42"]["TP_0X04_1109_1110"].val
                }}VA</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1111_1112')"
                v-if="CCIsDisplay('42', 'TP_0X04_1111_1112')"
                >{{
                  voListMap["42"]["TP_0X04_1111_1112"].val
                }}W</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1113_1114')"
                v-if="CCIsDisplay('42', 'TP_0X04_1113_1114')"
                >{{
                  voListMap["42"]["TP_0X04_1113_1114"].val
                }}VAR</el-descriptions-item
              >

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1115')"
                v-if="CCIsDisplay('42', 'TP_0X04_1115')"
                >{{ voListMap["42"]["TP_0X04_1115"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1116')"
                v-if="CCIsDisplay('42', 'TP_0X04_1116')"
                >{{ voListMap["42"]["TP_0X04_1116"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1117')"
                v-if="CCIsDisplay('42', 'TP_0X04_1117')"
                >{{ voListMap["42"]["TP_0X04_1117"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1118')"
                v-if="CCIsDisplay('42', 'TP_0X04_1118')"
                >{{ voListMap["42"]["TP_0X04_1118"].val }}
              </el-descriptions-item>

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1119')"
                v-if="CCIsDisplay('42', 'TP_0X04_1119')"
                >{{ voListMap["42"]["TP_0X04_1119"].val }}A
              </el-descriptions-item>

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1120')"
                v-if="CCIsDisplay('42', 'TP_0X04_1120')"
                >{{ voListMap["42"]["TP_0X04_1120"].val }}A
              </el-descriptions-item>

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1121')"
                v-if="CCIsDisplay('42', 'TP_0X04_1121')"
                >{{ voListMap["42"]["TP_0X04_1121"].val }}A
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1122_1123')"
                v-if="CCIsDisplay('42', 'TP_0X04_1122_1123')"
                >{{ voListMap["42"]["TP_0X04_1122_1123"].val }}W
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1124_1125')"
                v-if="CCIsDisplay('42', 'TP_0X04_1124_1125')"
                >{{ voListMap["42"]["TP_0X04_1124_1125"].val }}W
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1126_1127')"
                v-if="CCIsDisplay('42', 'TP_0X04_1126_1127')"
                >{{ voListMap["42"]["TP_0X04_1126_1127"].val }}W
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1128_1129')"
                v-if="CCIsDisplay('42', 'TP_0X04_1128_1129')"
                >{{
                  voListMap["42"]["TP_0X04_1128_1129"].val
                }}W</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1130')"
                v-if="CCIsDisplay('42', 'TP_0X04_1130')"
                >{{ voListMap["42"]["TP_0X04_1130"].val }}</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1131')"
                v-if="CCIsDisplay('42', 'TP_0X04_1131')"
                >{{ voListMap["42"]["TP_0X04_1131"].val }}</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1132')"
                v-if="CCIsDisplay('42', 'TP_0X04_1132')"
                >{{ voListMap["42"]["TP_0X04_1132"].val }}</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1133')"
                v-if="CCIsDisplay('42', 'TP_0X04_1133')"
              >
                {{ voListMap["42"]["TP_0X04_1133"].val }}mA
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1134')"
                v-if="CCIsDisplay('42', 'TP_0X04_1134')"
              >
                {{ voListMap["42"]["TP_0X04_1134"].val }}V
              </el-descriptions-item>
            </el-descriptions>
          </el-card>

          <el-card style="margin-top: 10px">
            <el-descriptions
              :title="$t('deviceManage.inverterInformation')"
              :column="3"
            >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1141')"
                v-if="CCIsDisplay('42', 'TP_0X04_1141')"
                >{{ voListMap["42"]["TP_0X04_1141"].val }}V
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1142')"
                v-if="CCIsDisplay('42', 'TP_0X04_1142')"
                >{{ voListMap["42"]["TP_0X04_1142"].val }}V
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1143')"
                v-if="CCIsDisplay('42', 'TP_0X04_1143')"
                >{{ voListMap["42"]["TP_0X04_1143"].val }}V
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1144')"
                v-if="CCIsDisplay('42', 'TP_0X04_1144')"
                >{{ voListMap["42"]["TP_0X04_1144"].val }}A
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1145')"
                v-if="CCIsDisplay('42', 'TP_0X04_1145')"
                >{{ voListMap["42"]["TP_0X04_1145"].val }}A
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1146')"
                v-if="CCIsDisplay('42', 'TP_0X04_1146')"
                >{{ voListMap["42"]["TP_0X04_1146"].val }}A
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1147')"
                v-if="CCIsDisplay('42', 'TP_0X04_1147')"
                >{{
                  voListMap["42"]["TP_0X04_1147"].val
                }}Hz</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1148')"
                v-if="CCIsDisplay('42', 'TP_0X04_1148')"
                >{{
                  voListMap["42"]["TP_0X04_1148"].val
                }}Hz</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1149')"
                v-if="CCIsDisplay('42', 'TP_0X04_1149')"
                >{{
                  voListMap["42"]["TP_0X04_1149"].val
                }}Hz</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1150_1151')"
                v-if="CCIsDisplay('42', 'TP_0X04_1150_1151')"
                >{{
                  voListMap["42"]["TP_0X04_1150_1151"].val
                }}VA</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1152_1153')"
                v-if="CCIsDisplay('42', 'TP_0X04_1152_1153')"
                >{{
                  voListMap["42"]["TP_0X04_1152_1153"].val
                }}VA</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1154_1155')"
                v-if="CCIsDisplay('42', 'TP_0X04_1154_1155')"
                >{{
                  voListMap["42"]["TP_0X04_1154_1155"].val
                }}VA</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1156_1157')"
                v-if="CCIsDisplay('42', 'TP_0X04_1156_1157')"
                >{{
                  voListMap["42"]["TP_0X04_1156_1157"].val
                }}W</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1158_1159')"
                v-if="CCIsDisplay('42', 'TP_0X04_1158_1159')"
                >{{
                  voListMap["42"]["TP_0X04_1158_1159"].val
                }}W</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1160_1161')"
                v-if="CCIsDisplay('42', 'TP_0X04_1160_1161')"
                >{{
                  voListMap["42"]["TP_0X04_1160_1161"].val
                }}W</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1162_1163')"
                v-if="CCIsDisplay('42', 'TP_0X04_1162_1163')"
                >{{
                  voListMap["42"]["TP_0X04_1162_1163"].val
                }}VAR</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1164_1165')"
                v-if="CCIsDisplay('42', 'TP_0X04_1164_1165')"
                >{{
                  voListMap["42"]["TP_0X04_1164_1165"].val
                }}VAR</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1166_1167')"
                v-if="CCIsDisplay('42', 'TP_0X04_1166_1167')"
                >{{
                  voListMap["42"]["TP_0X04_1166_1167"].val
                }}VAR</el-descriptions-item
              >

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1168_1169')"
                v-if="CCIsDisplay('42', 'TP_0X04_1168_1169')"
                >{{ voListMap["42"]["TP_0X04_1168_1169"].val }}VA
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1170_1171')"
                v-if="CCIsDisplay('42', 'TP_0X04_1170_1171')"
                >{{ voListMap["42"]["TP_0X04_1170_1171"].val }}W
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1172_1173')"
                v-if="CCIsDisplay('42', 'TP_0X04_1172_1173')"
                >{{ voListMap["42"]["TP_0X04_1172_1173"].val }}VAR
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1174')"
                v-if="CCIsDisplay('42', 'TP_0X04_1174')"
                >{{ voListMap["42"]["TP_0X04_1174"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1175')"
                v-if="CCIsDisplay('42', 'TP_0X04_1175')"
                >{{ voListMap["42"]["TP_0X04_1175"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1176')"
                v-if="CCIsDisplay('42', 'TP_0X04_1176')"
                >{{ voListMap["42"]["TP_0X04_1176"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1177')"
                v-if="CCIsDisplay('42', 'TP_0X04_1177')"
                >{{ voListMap["42"]["TP_0X04_1177"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1178')"
                v-if="CCIsDisplay('42', 'TP_0X04_1178')"
                >{{ voListMap["42"]["TP_0X04_1178"].val }}mV
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1179')"
                v-if="CCIsDisplay('42', 'TP_0X04_1179')"
                >{{ voListMap["42"]["TP_0X04_1179"].val }}mV
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1180')"
                v-if="CCIsDisplay('42', 'TP_0X04_1180')"
                >{{ voListMap["42"]["TP_0X04_1180"].val }}mV
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1181')"
                v-if="CCIsDisplay('42', 'TP_0X04_1181')"
                >{{ voListMap["42"]["TP_0X04_1181"].val }}mA
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1182')"
                v-if="CCIsDisplay('42', 'TP_0X04_1182')"
                >{{ voListMap["42"]["TP_0X04_1182"].val }}mA
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1183')"
                v-if="CCIsDisplay('42', 'TP_0X04_1183')"
                >{{ voListMap["42"]["TP_0X04_1183"].val }}mA
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1184')"
                v-if="CCIsDisplay('42', 'TP_0X04_1184')"
                >{{ voListMap["42"]["TP_0X04_1184"].val }}A
              </el-descriptions-item>
            </el-descriptions>
          </el-card>

          <el-card style="margin-top: 10px">
            <el-descriptions
              :title="$t('deviceManage.loadInformation')"
              :column="3"
            >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1191')"
                v-if="CCIsDisplay('42', 'TP_0X04_1191')"
                >{{
                  voListMap["42"]["TP_0X04_1191"].val
                }}V</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1192')"
                v-if="CCIsDisplay('42', 'TP_0X04_1192')"
                >{{
                  voListMap["42"]["TP_0X04_1192"].val
                }}V</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1193')"
                v-if="CCIsDisplay('42', 'TP_0X04_1193')"
                >{{
                  voListMap["42"]["TP_0X04_1193"].val
                }}V</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1194')"
                v-if="CCIsDisplay('42', 'TP_0X04_1194')"
                >{{
                  voListMap["42"]["TP_0X04_1194"].val
                }}A</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1195')"
                v-if="CCIsDisplay('42', 'TP_0X04_1195')"
                >{{
                  voListMap["42"]["TP_0X04_1195"].val
                }}A</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1196')"
                v-if="CCIsDisplay('42', 'TP_0X04_1196')"
                >{{
                  voListMap["42"]["TP_0X04_1196"].val
                }}A</el-descriptions-item
              >

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1197')"
                v-if="CCIsDisplay('42', 'TP_0X04_1197')"
                >{{ voListMap["42"]["TP_0X04_1197"].val }}Hz
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1198')"
                v-if="CCIsDisplay('42', 'TP_0X04_1198')"
                >{{ voListMap["42"]["TP_0X04_1198"].val }}Hz
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1199')"
                v-if="CCIsDisplay('42', 'TP_0X04_1199')"
                >{{ voListMap["42"]["TP_0X04_1199"].val }}Hz
              </el-descriptions-item>

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1200_1201')"
                v-if="CCIsDisplay('42', 'TP_0X04_1200_1201')"
                >{{
                  voListMap["42"]["TP_0X04_1200_1201"].val
                }}VA</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1202_1203')"
                v-if="CCIsDisplay('42', 'TP_0X04_1202_1203')"
                >{{
                  voListMap["42"]["TP_0X04_1202_1203"].val
                }}VA</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1204_1205')"
                v-if="CCIsDisplay('42', 'TP_0X04_1204_1205')"
                >{{
                  voListMap["42"]["TP_0X04_1204_1205"].val
                }}VA</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1206_1207')"
                v-if="CCIsDisplay('42', 'TP_0X04_1206_1207')"
                >{{
                  voListMap["42"]["TP_0X04_1206_1207"].val
                }}W</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1208_1209')"
                v-if="CCIsDisplay('42', 'TP_0X04_1208_1209')"
                >{{
                  voListMap["42"]["TP_0X04_1208_1209"].val
                }}W</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1210_1211')"
                v-if="CCIsDisplay('42', 'TP_0X04_1210_1211')"
                >{{
                  voListMap["42"]["TP_0X04_1210_1211"].val
                }}W</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1212_1213')"
                v-if="CCIsDisplay('42', 'TP_0X04_1212_1213')"
                >{{ voListMap["42"]["TP_0X04_1212_1213"].val }}VAR
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1214_1215')"
                v-if="CCIsDisplay('42', 'TP_0X04_1214_1215')"
                >{{ voListMap["42"]["TP_0X04_1214_1215"].val }}VAR
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1216_1217')"
                v-if="CCIsDisplay('42', 'TP_0X04_1216_1217')"
                >{{ voListMap["42"]["TP_0X04_1216_1217"].val }}VAR
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1218_1219')"
                v-if="CCIsDisplay('42', 'TP_0X04_1218_1219')"
                >{{ voListMap["42"]["TP_0X04_1218_1219"].val }}VA
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1220_1221')"
                v-if="CCIsDisplay('42', 'TP_0X04_1220_1221')"
                >{{ voListMap["42"]["TP_0X04_1220_1221"].val }}W
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1222_1223')"
                v-if="CCIsDisplay('42', 'TP_0X04_1222_1223')"
                >{{ voListMap["42"]["TP_0X04_1222_1223"].val }}VAR
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1224')"
                v-if="CCIsDisplay('42', 'TP_0X04_1224')"
                >{{ voListMap["42"]["TP_0X04_1224"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1225')"
                v-if="CCIsDisplay('42', 'TP_0X04_1225')"
                >{{ voListMap["42"]["TP_0X04_1225"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1226')"
                v-if="CCIsDisplay('42', 'TP_0X04_1226')"
                >{{ voListMap["42"]["TP_0X04_1226"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1227')"
                v-if="CCIsDisplay('42', 'TP_0X04_1227')"
                >{{ voListMap["42"]["TP_0X04_1227"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1228_1229')"
                v-if="CCIsDisplay('42', 'TP_0X04_1228_1229')"
                >{{ voListMap["42"]["TP_0X04_1228_1229"].val }}W
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1230_1231')"
                v-if="CCIsDisplay('42', 'TP_0X04_1230_1231')"
                >{{ voListMap["42"]["TP_0X04_1230_1231"].val }}W
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1232_1233')"
                v-if="CCIsDisplay('42', 'TP_0X04_1232_1233')"
                >{{ voListMap["42"]["TP_0X04_1232_1233"].val }}W
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1234_1235')"
                v-if="CCIsDisplay('42', 'TP_0X04_1234_1235')"
                >{{ voListMap["42"]["TP_0X04_1234_1235"].val }}W
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1236')"
                v-if="CCIsDisplay('42', 'TP_0X04_1236')"
                >{{ voListMap["42"]["TP_0X04_1236"].val }}%
              </el-descriptions-item>
            </el-descriptions>
          </el-card>

          <el-card style="margin-top: 10px">
            <el-descriptions
              :title="$t('deviceManage.GeneratorInformation')"
              :column="3"
            >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1242')"
                v-if="CCIsDisplay('42', 'TP_0X04_1242')"
                >{{ voListMap["42"]["TP_0X04_1242"].val }}V
              </el-descriptions-item>

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1243')"
                v-if="CCIsDisplay('42', 'TP_0X04_1243')"
                >{{ voListMap["42"]["TP_0X04_1243"].val }}V
              </el-descriptions-item>

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1244')"
                v-if="CCIsDisplay('42', 'TP_0X04_1244')"
                >{{ voListMap["42"]["TP_0X04_1244"].val }}V
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1245')"
                v-if="CCIsDisplay('42', 'TP_0X04_1245')"
                >{{ voListMap["42"]["TP_0X04_1245"].val }}A
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1246')"
                v-if="CCIsDisplay('42', 'TP_0X04_1246')"
                >{{ voListMap["42"]["TP_0X04_1246"].val }}A
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1247')"
                v-if="CCIsDisplay('42', 'TP_0X04_1247')"
                >{{ voListMap["42"]["TP_0X04_1247"].val }}A
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1248')"
                v-if="CCIsDisplay('42', 'TP_0X04_1248')"
                >{{ voListMap["42"]["TP_0X04_1248"].val }}Hz
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1249')"
                v-if="CCIsDisplay('42', 'TP_0X04_1249')"
                >{{ voListMap["42"]["TP_0X04_1249"].val }}Hz
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1250')"
                v-if="CCIsDisplay('42', 'TP_0X04_1250')"
                >{{ voListMap["42"]["TP_0X04_1250"].val }}Hz
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1251_1252')"
                v-if="CCIsDisplay('42', 'TP_0X04_1251_1252')"
                >{{ voListMap["42"]["TP_0X04_1251_1252"].val }}VA
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1253_1254')"
                v-if="CCIsDisplay('42', 'TP_0X04_1253_1254')"
                >{{ voListMap["42"]["TP_0X04_1253_1254"].val }}VA
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1255_1256')"
                v-if="CCIsDisplay('42', 'TP_0X04_1255_1256')"
                >{{ voListMap["42"]["TP_0X04_1255_1256"].val }}VA
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1257_1258')"
                v-if="CCIsDisplay('42', 'TP_0X04_1257_1258')"
                >{{ voListMap["42"]["TP_0X04_1257_1258"].val }}W
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1259_1260')"
                v-if="CCIsDisplay('42', 'TP_0X04_1259_1260')"
                >{{ voListMap["42"]["TP_0X04_1259_1260"].val }}W
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1261_1262')"
                v-if="CCIsDisplay('42', 'TP_0X04_1261_1262')"
                >{{ voListMap["42"]["TP_0X04_1261_1262"].val }}W
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1263_1264')"
                v-if="CCIsDisplay('42', 'TP_0X04_1263_1264')"
                >{{ voListMap["42"]["TP_0X04_1263_1264"].val }}VAR
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1265_1266')"
                v-if="CCIsDisplay('42', 'TP_0X04_1265_1266')"
                >{{ voListMap["42"]["TP_0X04_1265_1266"].val }}VAR
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1267_1268')"
                v-if="CCIsDisplay('42', 'TP_0X04_1267_1268')"
                >{{ voListMap["42"]["TP_0X04_1267_1268"].val }}VAR
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1269_1270')"
                v-if="CCIsDisplay('42', 'TP_0X04_1269_1270')"
                >{{ voListMap["42"]["TP_0X04_1269_1270"].val }}VA
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1271_1272')"
                v-if="CCIsDisplay('42', 'TP_0X04_1271_1272')"
                >{{ voListMap["42"]["TP_0X04_1271_1272"].val }}W
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1273_1274')"
                v-if="CCIsDisplay('42', 'TP_0X04_1273_1274')"
                >{{ voListMap["42"]["TP_0X04_1273_1274"].val }}VAR
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1275')"
                v-if="CCIsDisplay('42', 'TP_0X04_1275')"
                >{{ voListMap["42"]["TP_0X04_1275"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1276')"
                v-if="CCIsDisplay('42', 'TP_0X04_1276')"
                >{{ voListMap["42"]["TP_0X04_1276"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1277')"
                v-if="CCIsDisplay('42', 'TP_0X04_1277')"
                >{{ voListMap["42"]["TP_0X04_1277"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1278')"
                v-if="CCIsDisplay('42', 'TP_0X04_1278')"
                >{{ voListMap["42"]["TP_0X04_1278"].val }}
              </el-descriptions-item>
            </el-descriptions>
          </el-card>

          <el-card style="margin-top: 10px">
            <el-descriptions
              :title="$t('deviceManage.otherInformation')"
              :column="3"
            >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1279')"
                v-if="CCIsDisplay('42', 'TP_0X04_1279')"
                >{{ voListMap["42"]["TP_0X04_1279"].val }}V
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1280')"
                v-if="CCIsDisplay('42', 'TP_0X04_1280')"
                >{{ voListMap["42"]["TP_0X04_1280"].val }}V
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1281')"
                v-if="CCIsDisplay('42', 'TP_0X04_1281')"
                >{{ voListMap["42"]["TP_0X04_1281"].val }}V
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1282')"
                v-if="CCIsDisplay('42', 'TP_0X04_1282')"
                >{{ voListMap["42"]["TP_0X04_1282"].val }}V
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1283')"
                v-if="CCIsDisplay('42', 'TP_0X04_1283')"
                >{{ voListMap["42"]["TP_0X04_1283"].val }}V
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1284')"
                v-if="CCIsDisplay('42', 'TP_0X04_1284')"
                >{{ voListMap["42"]["TP_0X04_1284"].val }}V
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1285')"
                v-if="CCIsDisplay('42', 'TP_0X04_1285')"
                >{{ voListMap["42"]["TP_0X04_1285"].val }}℃
              </el-descriptions-item>

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1286')"
                v-if="CCIsDisplay('42', 'TP_0X04_1286')"
                >{{
                  voListMap["42"]["TP_0X04_1286"].val
                }}℃</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1287')"
                v-if="CCIsDisplay('42', 'TP_0X04_1287')"
                >{{ voListMap["42"]["TP_0X04_1287"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1291')"
                v-if="CCIsDisplay('42', 'TP_0X04_1291')"
                >{{ voListMap["42"]["TP_0X04_1291"].val }}
              </el-descriptions-item>

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1294')"
                v-if="CCIsDisplay('42', 'TP_0X04_1294')"
              >
                {{ selfCheckFilter[voListMap["42"]["TP_0X04_1294"].val] }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1295')"
                v-if="CCIsDisplay('42', 'TP_0X04_1295')"
              >
                {{ voListMap["42"]["TP_0X04_1295"].val }}V/Hz
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1296')"
                v-if="CCIsDisplay('42', 'TP_0X04_1296')"
              >
                {{ voListMap["42"]["TP_0X04_1296"].val }}ms
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_1297')"
                v-if="CCIsDisplay('42', 'TP_0X04_1297')"
              >
                {{ voListMap["42"]["TP_0X04_1297"].val }}V/Hz
              </el-descriptions-item>
            </el-descriptions>
          </el-card>
        </template>

        <template v-if="activeIndex === '43'">
          <el-card style="margin-top: 10px">
            <el-descriptions :title="$t('deviceManage.meterData')" :column="3">
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2048')"
                v-if="CCIsDisplay('43', 'TP_0X04_2048')"
              >
                {{ voListMap["43"]["TP_0X04_2048"].val }}kWh
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2049')"
                v-if="CCIsDisplay('43', 'TP_0X04_2049')"
                >{{
                  voListMap["43"]["TP_0X04_2049"].val
                }}kWh</el-descriptions-item
              >

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2050')"
                v-if="CCIsDisplay('43', 'TP_0X04_2050')"
                >{{
                  voListMap["43"]["TP_0X04_2050"].val
                }}kWh</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2051')"
                v-if="CCIsDisplay('43', 'TP_0X04_2051')"
                >{{
                  voListMap["43"]["TP_0X04_2051"].val
                }}kWh</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2052')"
                v-if="CCIsDisplay('43', 'TP_0X04_2052')"
              >
                {{ voListMap["43"]["TP_0X04_2052"].val }}kWh
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2053')"
                v-if="CCIsDisplay('43', 'TP_0X04_2053')"
              >
                {{ voListMap["43"]["TP_0X04_2053"].val }}kWh
              </el-descriptions-item>

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2054')"
                v-if="CCIsDisplay('43', 'TP_0X04_2054')"
              >
                {{ voListMap["43"]["TP_0X04_2054"].val }}kWh
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2055')"
                v-if="CCIsDisplay('43', 'TP_0X04_2055')"
              >
                {{ voListMap["43"]["TP_0X04_2055"].val }}kWh
              </el-descriptions-item>

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2056')"
                v-if="CCIsDisplay('43', 'TP_0X04_2056')"
                >{{
                  voListMap["43"]["TP_0X04_2056"].val
                }}kWh</el-descriptions-item
              >

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2057')"
                v-if="CCIsDisplay('43', 'TP_0X04_2057')"
                >{{
                  voListMap["43"]["TP_0X04_2057"].val
                }}kWh</el-descriptions-item
              >

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2058')"
                v-if="CCIsDisplay('43', 'TP_0X04_2058')"
                >{{
                  voListMap["43"]["TP_0X04_2058"].val
                }}kWh</el-descriptions-item
              >

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2059')"
                v-if="CCIsDisplay('43', 'TP_0X04_2059')"
                >{{
                  voListMap["43"]["TP_0X04_2059"].val
                }}kWh</el-descriptions-item
              >

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2060')"
                v-if="CCIsDisplay('43', 'TP_0X04_2060')"
              >
                {{ voListMap["43"]["TP_0X04_2060"].val }}V
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2061')"
                v-if="CCIsDisplay('43', 'TP_0X04_2061')"
              >
                {{ voListMap["43"]["TP_0X04_2061"].val }}V
              </el-descriptions-item>

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2062')"
                v-if="CCIsDisplay('43', 'TP_0X04_2062')"
              >
                {{ voListMap["43"]["TP_0X04_2062"].val }}V
              </el-descriptions-item>

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2063')"
                v-if="CCIsDisplay('43', 'TP_0X04_2063')"
              >
                {{ voListMap["43"]["TP_0X04_2063"].val }}V
              </el-descriptions-item>

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2064')"
                v-if="CCIsDisplay('43', 'TP_0X04_2064')"
              >
                {{ voListMap["43"]["TP_0X04_2064"].val }}V
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2065')"
                v-if="CCIsDisplay('43', 'TP_0X04_2065')"
              >
                {{ voListMap["43"]["TP_0X04_2065"].val }}V
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2066')"
                v-if="CCIsDisplay('43', 'TP_0X04_2066')"
              >
                {{ voListMap["43"]["TP_0X04_2066"].val }}V
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2067')"
                v-if="CCIsDisplay('43', 'TP_0X04_2067')"
              >
                {{ voListMap["43"]["TP_0X04_2067"].val }}V
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2068')"
                v-if="CCIsDisplay('43', 'TP_0X04_2068')"
              >
                {{ voListMap["43"]["TP_0X04_2068"].val }}V
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2069')"
                v-if="CCIsDisplay('43', 'TP_0X04_2069')"
              >
                {{ voListMap["43"]["TP_0X04_2069"].val }}V
              </el-descriptions-item>

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2070')"
                v-if="CCIsDisplay('43', 'TP_0X04_2070')"
              >
                {{ voListMap["43"]["TP_0X04_2070"].val }}V
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2071')"
                v-if="CCIsDisplay('43', 'TP_0X04_2071')"
              >
                {{ voListMap["43"]["TP_0X04_2071"].val }}V
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2072')"
                v-if="CCIsDisplay('43', 'TP_0X04_2072')"
              >
                {{ voListMap["43"]["TP_0X04_2072"].val }}A
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2073')"
                v-if="CCIsDisplay('43', 'TP_0X04_2073')"
              >
                {{ voListMap["43"]["TP_0X04_2073"].val }}A
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2074')"
                v-if="CCIsDisplay('43', 'TP_0X04_2074')"
              >
                {{ voListMap["43"]["TP_0X04_2074"].val }}A
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2075')"
                v-if="CCIsDisplay('43', 'TP_0X04_2075')"
              >
                {{ voListMap["43"]["TP_0X04_2075"].val }}A
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2076')"
                v-if="CCIsDisplay('43', 'TP_0X04_2076')"
              >
                {{ voListMap["43"]["TP_0X04_2076"].val }}A
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2077')"
                v-if="CCIsDisplay('43', 'TP_0X04_2077')"
              >
                {{ voListMap["43"]["TP_0X04_2077"].val }}A
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2078')"
                v-if="CCIsDisplay('43', 'TP_0X04_2078')"
              >
                {{ voListMap["43"]["TP_0X04_2078"].val }}A
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2079')"
                v-if="CCIsDisplay('43', 'TP_0X04_2079')"
              >
                {{ voListMap["43"]["TP_0X04_2079"].val }}A
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2080')"
                v-if="CCIsDisplay('43', 'TP_0X04_2080')"
              >
                {{ voListMap["43"]["TP_0X04_2080"].val }}A
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2081')"
                v-if="CCIsDisplay('43', 'TP_0X04_2081')"
              >
                {{ voListMap["43"]["TP_0X04_2081"].val }}A
              </el-descriptions-item>

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2082')"
                v-if="CCIsDisplay('43', 'TP_0X04_2082')"
              >
                {{ voListMap["43"]["TP_0X04_2082"].val }}A
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2083')"
                v-if="CCIsDisplay('43', 'TP_0X04_2083')"
              >
                {{ voListMap["43"]["TP_0X04_2083"].val }}A
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2084')"
                v-if="CCIsDisplay('43', 'TP_0X04_2084')"
              >
                {{ voListMap["43"]["TP_0X04_2084"].val }}kW
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2085')"
                v-if="CCIsDisplay('43', 'TP_0X04_2085')"
              >
                {{ voListMap["43"]["TP_0X04_2085"].val }}kW
              </el-descriptions-item>

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2086')"
                v-if="CCIsDisplay('43', 'TP_0X04_2086')"
              >
                {{ voListMap["43"]["TP_0X04_2086"].val }}kW
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2087')"
                v-if="CCIsDisplay('43', 'TP_0X04_2087')"
              >
                {{ voListMap["43"]["TP_0X04_2087"].val }}kW
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2088')"
                v-if="CCIsDisplay('43', 'TP_0X04_2088')"
              >
                {{ voListMap["43"]["TP_0X04_2088"].val }}kW
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2089')"
                v-if="CCIsDisplay('43', 'TP_0X04_2089')"
              >
                {{ voListMap["43"]["TP_0X04_2089"].val }}kW
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2090')"
                v-if="CCIsDisplay('43', 'TP_0X04_2090')"
              >
                {{ voListMap["43"]["TP_0X04_2090"].val }}kW
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2091')"
                v-if="CCIsDisplay('43', 'TP_0X04_2091')"
              >
                {{ voListMap["43"]["TP_0X04_2091"].val }}kW
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2092')"
                v-if="CCIsDisplay('43', 'TP_0X04_2092')"
              >
                {{ voListMap["43"]["TP_0X04_2092"].val }}kW
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2093')"
                v-if="CCIsDisplay('43', 'TP_0X04_2093')"
              >
                {{ voListMap["43"]["TP_0X04_2093"].val }}kW
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2094')"
                v-if="CCIsDisplay('43', 'TP_0X04_2094')"
              >
                {{ voListMap["43"]["TP_0X04_2094"].val }}kW
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2095')"
                v-if="CCIsDisplay('43', 'TP_0X04_2095')"
              >
                {{ voListMap["43"]["TP_0X04_2095"].val }}kW
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2096')"
                v-if="CCIsDisplay('43', 'TP_0X04_2096')"
              >
                {{ voListMap["43"]["TP_0X04_2096"].val }}kW
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2097')"
                v-if="CCIsDisplay('43', 'TP_0X04_2097')"
              >
                {{ voListMap["43"]["TP_0X04_2097"].val }}kW
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2098')"
                v-if="CCIsDisplay('43', 'TP_0X04_2098')"
              >
                {{ voListMap["43"]["TP_0X04_2098"].val }}kW
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2099')"
                v-if="CCIsDisplay('43', 'TP_0X04_2099')"
              >
                {{ voListMap["43"]["TP_0X04_2099"].val }}kW
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2100')"
                v-if="CCIsDisplay('43', 'TP_0X04_2100')"
              >
                {{ voListMap["43"]["TP_0X04_2100"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2101')"
                v-if="CCIsDisplay('43', 'TP_0X04_2101')"
              >
                {{ voListMap["43"]["TP_0X04_2101"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2102')"
                v-if="CCIsDisplay('43', 'TP_0X04_2102')"
              >
                {{ voListMap["43"]["TP_0X04_2102"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2103')"
                v-if="CCIsDisplay('43', 'TP_0X04_2103')"
              >
                {{ voListMap["43"]["TP_0X04_2103"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2104')"
                v-if="CCIsDisplay('43', 'TP_0X04_2104')"
              >
                {{ voListMap["43"]["TP_0X04_2104"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2105')"
                v-if="CCIsDisplay('43', 'TP_0X04_2105')"
              >
                {{ voListMap["43"]["TP_0X04_2105"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2106')"
                v-if="CCIsDisplay('43', 'TP_0X04_2106')"
              >
                {{ voListMap["43"]["TP_0X04_2106"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2107')"
                v-if="CCIsDisplay('43', 'TP_0X04_2107')"
              >
                {{ voListMap["43"]["TP_0X04_2107"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2108')"
                v-if="CCIsDisplay('43', 'TP_0X04_2108')"
              >
                {{ voListMap["43"]["TP_0X04_2108"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2109')"
                v-if="CCIsDisplay('43', 'TP_0X04_2109')"
              >
                {{ voListMap["43"]["TP_0X04_2109"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2110')"
                v-if="CCIsDisplay('43', 'TP_0X04_2110')"
              >
                {{ voListMap["43"]["TP_0X04_2110"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2111')"
                v-if="CCIsDisplay('43', 'TP_0X04_2111')"
              >
                {{ voListMap["43"]["TP_0X04_2111"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2112')"
                v-if="CCIsDisplay('43', 'TP_0X04_2112')"
              >
                {{ voListMap["43"]["TP_0X04_2112"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2113')"
                v-if="CCIsDisplay('43', 'TP_0X04_2113')"
              >
                {{ voListMap["43"]["TP_0X04_2113"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2114')"
                v-if="CCIsDisplay('43', 'TP_0X04_2114')"
              >
                {{ voListMap["43"]["TP_0X04_2114"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2115')"
                v-if="CCIsDisplay('43', 'TP_0X04_2115')"
              >
                {{ voListMap["43"]["TP_0X04_2115"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2116')"
                v-if="CCIsDisplay('43', 'TP_0X04_2116')"
              >
                {{ voListMap["43"]["TP_0X04_2116"].val }}Hz
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2117')"
                v-if="CCIsDisplay('43', 'TP_0X04_2117')"
              >
                {{ voListMap["43"]["TP_0X04_2117"].val }}Hz
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2118')"
                v-if="CCIsDisplay('43', 'TP_0X04_2118')"
              >
                {{ voListMap["43"]["TP_0X04_2118"].val }}Hz
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2119')"
                v-if="CCIsDisplay('43', 'TP_0X04_2119')"
              >
                {{ voListMap["43"]["TP_0X04_2119"].val }}Hz
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2120')"
                v-if="CCIsDisplay('43', 'TP_0X04_2120')"
              >
                {{ voListMap["43"]["TP_0X04_2120"].val }}kvar
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2121')"
                v-if="CCIsDisplay('43', 'TP_0X04_2121')"
              >
                {{ voListMap["43"]["TP_0X04_2121"].val }}kvar
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2122')"
                v-if="CCIsDisplay('43', 'TP_0X04_2122')"
              >
                {{ voListMap["43"]["TP_0X04_2122"].val }}kvar
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2123')"
                v-if="CCIsDisplay('43', 'TP_0X04_2123')"
              >
                {{ voListMap["43"]["TP_0X04_2123"].val }}kvar
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2124')"
                v-if="CCIsDisplay('43', 'TP_0X04_2124')"
              >
                {{ voListMap["43"]["TP_0X04_2124"].val }}kvar
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2125')"
                v-if="CCIsDisplay('43', 'TP_0X04_2125')"
              >
                {{ voListMap["43"]["TP_0X04_2125"].val }}kvar
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2126')"
                v-if="CCIsDisplay('43', 'TP_0X04_2126')"
              >
                {{ voListMap["43"]["TP_0X04_2126"].val }}kvar
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2127')"
                v-if="CCIsDisplay('43', 'TP_0X04_2127')"
              >
                {{ voListMap["43"]["TP_0X04_2127"].val }}kvar
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2128')"
                v-if="CCIsDisplay('43', 'TP_0X04_2128')"
              >
                {{ voListMap["43"]["TP_0X04_2128"].val }}kvar
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2129')"
                v-if="CCIsDisplay('43', 'TP_0X04_2129')"
              >
                {{ voListMap["43"]["TP_0X04_2129"].val }}kvar
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2130')"
                v-if="CCIsDisplay('43', 'TP_0X04_2130')"
              >
                {{ voListMap["43"]["TP_0X04_2130"].val }}kvar
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2131')"
                v-if="CCIsDisplay('43', 'TP_0X04_2131')"
              >
                {{ voListMap["43"]["TP_0X04_2131"].val }}kvar
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2132')"
                v-if="CCIsDisplay('43', 'TP_0X04_2132')"
              >
                {{ voListMap["43"]["TP_0X04_2132"].val }}kvar
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2133')"
                v-if="CCIsDisplay('43', 'TP_0X04_2133')"
              >
                {{ voListMap["43"]["TP_0X04_2133"].val }}kvar
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2134')"
                v-if="CCIsDisplay('43', 'TP_0X04_2134')"
              >
                {{ voListMap["43"]["TP_0X04_2134"].val }}kvar
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_2135')"
                v-if="CCIsDisplay('43', 'TP_0X04_2135')"
              >
                {{ voListMap["43"]["TP_0X04_2135"].val }}kvar
              </el-descriptions-item>
            </el-descriptions>
          </el-card>
        </template>

        <template v-if="activeIndex === '44'">
          <el-card style="margin-top: 10px">
            <el-descriptions
              :title="$t('deviceManage.eastBCUData')"
              :column="3"
            >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4096')"
                v-if="CCIsDisplay('44', 'TP_0X04_4096')"
              >
                {{ voListMap["44"]["TP_0X04_4096"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4097')"
                v-if="CCIsDisplay('44', 'TP_0X04_4097')"
                >{{
                  displayFilter[voListMap["44"]["TP_0X04_4097"].val]
                }}</el-descriptions-item
              >

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4098')"
                v-if="CCIsDisplay('44', 'TP_0X04_4098')"
                >{{ voListMap["44"]["TP_0X04_4098"].val }}</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4106')"
                v-if="CCIsDisplay('44', 'TP_0X04_4106')"
                >{{ voListMap["44"]["TP_0X04_4106"].val }}</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4107')"
                v-if="CCIsDisplay('44', 'TP_0X04_4107')"
              >
                {{ voListMap["44"]["TP_0X04_4107"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4108')"
                v-if="CCIsDisplay('44', 'TP_0X04_4108')"
              >
                {{ voListMap["44"]["TP_0X04_4108"].val }}
              </el-descriptions-item>

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4109')"
                v-if="CCIsDisplay('44', 'TP_0X04_4109')"
              >
                {{ voListMap["44"]["TP_0X04_4109"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4110')"
                v-if="CCIsDisplay('44', 'TP_0X04_4110')"
              >
                {{ voListMap["44"]["TP_0X04_4110"].val }}
              </el-descriptions-item>

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4111')"
                v-if="CCIsDisplay('44', 'TP_0X04_4111')"
                >{{ voListMap["44"]["TP_0X04_4111"].val }}</el-descriptions-item
              >

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4112')"
                v-if="CCIsDisplay('44', 'TP_0X04_4112')"
                >{{ voListMap["44"]["TP_0X04_4112"].val }}</el-descriptions-item
              >

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4113')"
                v-if="CCIsDisplay('44', 'TP_0X04_4113')"
                >{{ voListMap["44"]["TP_0X04_4113"].val }}</el-descriptions-item
              >

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4114')"
                v-if="CCIsDisplay('44', 'TP_0X04_4114')"
                >{{ voListMap["44"]["TP_0X04_4114"].val }}</el-descriptions-item
              >

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4115')"
                v-if="CCIsDisplay('44', 'TP_0X04_4115')"
              >
                {{ voListMap["44"]["TP_0X04_4115"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4116')"
                v-if="CCIsDisplay('44', 'TP_0X04_4116')"
              >
                {{ powerOnStageFilter[voListMap["44"]["TP_0X04_4116"].val] }}
              </el-descriptions-item>

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4117')"
                v-if="CCIsDisplay('44', 'TP_0X04_4117')"
              >
                {{ systemWorkFilter[voListMap["44"]["TP_0X04_4117"].val] }}
              </el-descriptions-item>

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4118')"
                v-if="CCIsDisplay('44', 'TP_0X04_4118')"
              >
                {{ voListMap["44"]["TP_0X04_4118"].val }}%
              </el-descriptions-item>

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4119')"
                v-if="CCIsDisplay('44', 'TP_0X04_4119')"
              >
                {{ voListMap["44"]["TP_0X04_4119"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4120')"
                v-if="CCIsDisplay('44', 'TP_0X04_4120')"
              >
                {{ voListMap["44"]["TP_0X04_4120"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4121')"
                v-if="CCIsDisplay('44', 'TP_0X04_4121')"
              >
                {{ voListMap["44"]["TP_0X04_4121"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4122')"
                v-if="CCIsDisplay('44', 'TP_0X04_4122')"
              >
                {{ voListMap["44"]["TP_0X04_4122"].val }}℃
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4123')"
                v-if="CCIsDisplay('44', 'TP_0X04_4123')"
              >
                {{ voListMap["44"]["TP_0X04_4123"].val }}℃
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4124')"
                v-if="CCIsDisplay('44', 'TP_0X04_4124')"
              >
                {{ voListMap["44"]["TP_0X04_4124"].val }}℃
              </el-descriptions-item>

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4125')"
                v-if="CCIsDisplay('44', 'TP_0X04_4125')"
              >
                {{ voListMap["44"]["TP_0X04_4125"].val }}℃
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4126')"
                v-if="CCIsDisplay('44', 'TP_0X04_4126')"
              >
                {{ voListMap["44"]["TP_0X04_4126"].val }}V
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4127')"
                v-if="CCIsDisplay('44', 'TP_0X04_4127')"
              >
                {{ voListMap["44"]["TP_0X04_4127"].val }}V
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4128')"
                v-if="CCIsDisplay('44', 'TP_0X04_4128')"
              >
                {{ reasonFilter[voListMap["44"]["TP_0X04_4128"].val] }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4129')"
                v-if="CCIsDisplay('44', 'TP_0X04_4129')"
              >
                {{ connectFilter[voListMap["44"]["TP_0X04_4129"].val] }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4130')"
                v-if="CCIsDisplay('44', 'TP_0X04_4130')"
              >
                {{ connectFilter[voListMap["44"]["TP_0X04_4130"].val] }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4131')"
                v-if="CCIsDisplay('44', 'TP_0X04_4131')"
              >
                {{ voListMap["44"]["TP_0X04_4131"].val }}A
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4132')"
                v-if="CCIsDisplay('44', 'TP_0X04_4132')"
              >
                {{ voListMap["44"]["TP_0X04_4132"].val }}A
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4133')"
                v-if="CCIsDisplay('44', 'TP_0X04_4133')"
              >
                {{ voListMap["44"]["TP_0X04_4133"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4134')"
                v-if="CCIsDisplay('44', 'TP_0X04_4134')"
              >
                {{ voListMap["44"]["TP_0X04_4134"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4135')"
                v-if="CCIsDisplay('44', 'TP_0X04_4135')"
              >
                {{ voListMap["44"]["TP_0X04_4135"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4136')"
                v-if="CCIsDisplay('44', 'TP_0X04_4136')"
              >
                {{ voListMap["44"]["TP_0X04_4136"].val }}
              </el-descriptions-item>

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4137')"
                v-if="CCIsDisplay('44', 'TP_0X04_4137')"
              >
                {{ voListMap["44"]["TP_0X04_4137"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4138')"
                v-if="CCIsDisplay('44', 'TP_0X04_4138')"
              >
                {{ voListMap["44"]["TP_0X04_4138"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4139')"
                v-if="CCIsDisplay('44', 'TP_0X04_4139')"
              >
                {{ voListMap["44"]["TP_0X04_4139"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4140')"
                v-if="CCIsDisplay('44', 'TP_0X04_4140')"
              >
                {{ voListMap["44"]["TP_0X04_4140"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4141')"
                v-if="CCIsDisplay('44', 'TP_0X04_4141')"
              >
                {{ voListMap["44"]["TP_0X04_4141"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4142')"
                v-if="CCIsDisplay('44', 'TP_0X04_4142')"
              >
                {{ voListMap["44"]["TP_0X04_4142"].val }}V
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4143')"
                v-if="CCIsDisplay('44', 'TP_0X04_4143')"
              >
                {{ voListMap["44"]["TP_0X04_4143"].val }}W
              </el-descriptions-item>
            </el-descriptions>
          </el-card>
        </template>

        <template v-if="activeIndex === '45'">
          <el-card style="margin-top: 10px">
            <el-descriptions
              :title="$t('deviceManage.eastBMSData')"
              :column="3"
            >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4608')"
                v-if="CCIsDisplay('45', 'TP_0X04_4608')"
              >
                {{ voListMap["45"]["TP_0X04_4608"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4609')"
                v-if="CCIsDisplay('45', 'TP_0X04_4609')"
                >{{
                  BMSdisplayFilter[voListMap["45"]["TP_0X04_4609"].val]
                }}</el-descriptions-item
              >

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4618')"
                v-if="CCIsDisplay('45', 'TP_0X04_4618')"
                >{{
                  voListMap["45"]["TP_0X04_4618"].val
                }}V</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4619')"
                v-if="CCIsDisplay('45', 'TP_0X04_4619')"
                >{{
                  chargeFilter[voListMap["45"]["TP_0X04_4619"].val]
                }}</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4620')"
                v-if="CCIsDisplay('45', 'TP_0X04_4620')"
              >
                {{ voListMap["45"]["TP_0X04_4620"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4621')"
                v-if="CCIsDisplay('45', 'TP_0X04_4621')"
              >
                {{ voListMap["45"]["TP_0X04_4621"].val }}
              </el-descriptions-item>

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4622')"
                v-if="CCIsDisplay('45', 'TP_0X04_4622')"
              >
                {{ voListMap["45"]["TP_0X04_4622"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4623')"
                v-if="CCIsDisplay('45', 'TP_0X04_4623')"
              >
                {{ voListMap["45"]["TP_0X04_4623"].val }}
              </el-descriptions-item>

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4624')"
                v-if="CCIsDisplay('45', 'TP_0X04_4624')"
                >{{
                  voListMap["45"]["TP_0X04_4624"].val
                }}A</el-descriptions-item
              >

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4625')"
                v-if="CCIsDisplay('45', 'TP_0X04_4625')"
                >{{
                  voListMap["45"]["TP_0X04_4625"].val
                }}%</el-descriptions-item
              >

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4626')"
                v-if="CCIsDisplay('45', 'TP_0X04_4626')"
                >{{
                  voListMap["45"]["TP_0X04_4626"].val
                }}%</el-descriptions-item
              >

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4627')"
                v-if="CCIsDisplay('45', 'TP_0X04_4627')"
                >{{
                  voListMap["45"]["TP_0X04_4627"].val
                }}℃</el-descriptions-item
              >

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4628')"
                v-if="CCIsDisplay('45', 'TP_0X04_4628')"
              >
                {{ voListMap["45"]["TP_0X04_4628"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4629')"
                v-if="CCIsDisplay('45', 'TP_0X04_4629')"
              >
                {{ voListMap["45"]["TP_0X04_4629"].val }}
              </el-descriptions-item>

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4630')"
                v-if="CCIsDisplay('45', 'TP_0X04_4630')"
              >
                {{ voListMap["45"]["TP_0X04_4630"].val }}℃
              </el-descriptions-item>

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4631')"
                v-if="CCIsDisplay('45', 'TP_0X04_4631')"
              >
                {{ voListMap["45"]["TP_0X04_4631"].val }}
              </el-descriptions-item>

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4632')"
                v-if="CCIsDisplay('45', 'TP_0X04_4632')"
              >
                {{ voListMap["45"]["TP_0X04_4632"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4633')"
                v-if="CCIsDisplay('45', 'TP_0X04_4633')"
              >
                {{ voListMap["45"]["TP_0X04_4633"].val }}mV
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4634')"
                v-if="CCIsDisplay('45', 'TP_0X04_4634')"
              >
                {{ voListMap["45"]["TP_0X04_4634"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4635')"
                v-if="CCIsDisplay('45', 'TP_0X04_4635')"
              >
                {{ voListMap["45"]["TP_0X04_4635"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4636')"
                v-if="CCIsDisplay('45', 'TP_0X04_4636')"
              >
                {{ voListMap["45"]["TP_0X04_4636"].val }}mV
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4637')"
                v-if="CCIsDisplay('45', 'TP_0X04_4637')"
              >
                {{ voListMap["45"]["TP_0X04_4637"].val }}
              </el-descriptions-item>

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4638')"
                v-if="CCIsDisplay('45', 'TP_0X04_4638')"
              >
                {{ voListMap["45"]["TP_0X04_4638"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4639')"
                v-if="CCIsDisplay('45', 'TP_0X04_4639')"
              >
                {{ voListMap["45"]["TP_0X04_4639"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4640')"
                v-if="CCIsDisplay('45', 'TP_0X04_4640')"
              >
                {{ voListMap["45"]["TP_0X04_4640"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4641')"
                v-if="CCIsDisplay('45', 'TP_0X04_4641')"
              >
                {{ voListMap["45"]["TP_0X04_4641"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4642')"
                v-if="CCIsDisplay('45', 'TP_0X04_4642')"
              >
                {{ voListMap["45"]["TP_0X04_4642"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4643')"
                v-if="CCIsDisplay('45', 'TP_0X04_4643')"
              >
                {{ voListMap["45"]["TP_0X04_4643"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4644')"
                v-if="CCIsDisplay('45', 'TP_0X04_4644')"
              >
                {{ voListMap["45"]["TP_0X04_4644"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4645')"
                v-if="CCIsDisplay('45', 'TP_0X04_4645')"
              >
                {{ voListMap["45"]["TP_0X04_4645"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4646')"
                v-if="CCIsDisplay('45', 'TP_0X04_4646')"
              >
                {{ voListMap["45"]["TP_0X04_4646"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4647')"
                v-if="CCIsDisplay('45', 'TP_0X04_4647')"
              >
                {{ voListMap["45"]["TP_0X04_4647"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4648')"
                v-if="CCIsDisplay('45', 'TP_0X04_4648')"
              >
                {{ voListMap["45"]["TP_0X04_4648"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_4649')"
                v-if="CCIsDisplay('45', 'TP_0X04_4649')"
              >
                {{ voListMap["45"]["TP_0X04_4649"].val }}A
              </el-descriptions-item>

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5120')"
                v-if="CCIsDisplay('45', 'TP_0X04_5120')"
              >
                {{ voListMap["45"]["TP_0X04_5120"].val }}V
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5121')"
                v-if="CCIsDisplay('45', 'TP_0X04_5121')"
              >
                {{ voListMap["45"]["TP_0X04_5121"].val }}V
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5122')"
                v-if="CCIsDisplay('45', 'TP_0X04_5122')"
              >
                {{ voListMap["45"]["TP_0X04_5122"].val }} </el-descriptions-item
              >V
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5123')"
                v-if="CCIsDisplay('45', 'TP_0X04_5123')"
              >
                {{ voListMap["45"]["TP_0X04_5123"].val }}V
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5124')"
                v-if="CCIsDisplay('45', 'TP_0X04_5124')"
              >
                {{ voListMap["45"]["TP_0X04_5124"].val }}V
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5125')"
                v-if="CCIsDisplay('45', 'TP_0X04_5125')"
              >
                {{ voListMap["45"]["TP_0X04_5125"].val }}V
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5126')"
                v-if="CCIsDisplay('45', 'TP_0X04_5126')"
              >
                {{ voListMap["45"]["TP_0X04_5126"].val }}V
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5127')"
                v-if="CCIsDisplay('45', 'TP_0X04_5127')"
              >
                {{ voListMap["45"]["TP_0X04_5127"].val }}V
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5128')"
                v-if="CCIsDisplay('45', 'TP_0X04_5128')"
              >
                {{ voListMap["45"]["TP_0X04_5128"].val }}V
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5129')"
                v-if="CCIsDisplay('45', 'TP_0X04_5129')"
              >
                {{ voListMap["45"]["TP_0X04_5129"].val }}V
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5130')"
                v-if="CCIsDisplay('45', 'TP_0X04_5130')"
              >
                {{ voListMap["45"]["TP_0X04_5130"].val }}V
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5131')"
                v-if="CCIsDisplay('45', 'TP_0X04_5131')"
              >
                {{ voListMap["45"]["TP_0X04_5131"].val }}V
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5132')"
                v-if="CCIsDisplay('45', 'TP_0X04_5132')"
              >
                {{ voListMap["45"]["TP_0X04_5132"].val }}V
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5133')"
                v-if="CCIsDisplay('45', 'TP_0X04_5133')"
              >
                {{ voListMap["45"]["TP_0X04_5133"].val }}V
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5134')"
                v-if="CCIsDisplay('45', 'TP_0X04_5134')"
              >
                {{ voListMap["45"]["TP_0X04_5134"].val }}V
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5135')"
                v-if="CCIsDisplay('45', 'TP_0X04_5135')"
              >
                {{ voListMap["45"]["TP_0X04_5135"].val }}V
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5136')"
                v-if="CCIsDisplay('45', 'TP_0X04_5136')"
              >
                {{ voListMap["45"]["TP_0X04_5136"].val }}V
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5137')"
                v-if="CCIsDisplay('45', 'TP_0X04_5137')"
              >
                {{ voListMap["45"]["TP_0X04_5137"].val }}V
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5138')"
                v-if="CCIsDisplay('45', 'TP_0X04_5138')"
              >
                {{ voListMap["45"]["TP_0X04_5138"].val }}V
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5139')"
                v-if="CCIsDisplay('45', 'TP_0X04_5139')"
              >
                {{ voListMap["45"]["TP_0X04_5139"].val }}V
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5140')"
                v-if="CCIsDisplay('45', 'TP_0X04_5140')"
              >
                {{ voListMap["45"]["TP_0X04_5140"].val }}V
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5141')"
                v-if="CCIsDisplay('45', 'TP_0X04_5141')"
              >
                {{ voListMap["45"]["TP_0X04_5141"].val }}V
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5142')"
                v-if="CCIsDisplay('45', 'TP_0X04_5142')"
              >
                {{ voListMap["45"]["TP_0X04_5142"].val }}V
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5143')"
                v-if="CCIsDisplay('45', 'TP_0X04_5143')"
              >
                {{ voListMap["45"]["TP_0X04_5143"].val }}V
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5144')"
                v-if="CCIsDisplay('45', 'TP_0X04_5144')"
              >
                {{ voListMap["45"]["TP_0X04_5144"].val }}℃
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5145')"
                v-if="CCIsDisplay('45', 'TP_0X04_5145')"
              >
                {{ voListMap["45"]["TP_0X04_5145"].val }}℃
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5146')"
                v-if="CCIsDisplay('45', 'TP_0X04_5146')"
              >
                {{ voListMap["45"]["TP_0X04_5146"].val }}℃
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5147')"
                v-if="CCIsDisplay('45', 'TP_0X04_5147')"
              >
                {{ voListMap["45"]["TP_0X04_5147"].val }}℃
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5148')"
                v-if="CCIsDisplay('45', 'TP_0X04_5148')"
              >
                {{ voListMap["45"]["TP_0X04_5148"].val }}℃
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5149')"
                v-if="CCIsDisplay('45', 'TP_0X04_5149')"
              >
                {{ voListMap["45"]["TP_0X04_5149"].val }}℃
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5150')"
                v-if="CCIsDisplay('45', 'TP_0X04_5150')"
              >
                {{ voListMap["45"]["TP_0X04_5150"].val }}℃
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5151')"
                v-if="CCIsDisplay('45', 'TP_0X04_5151')"
              >
                {{ voListMap["45"]["TP_0X04_5151"].val }}℃
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5152')"
                v-if="CCIsDisplay('45', 'TP_0X04_5152')"
              >
                {{ voListMap["45"]["TP_0X04_5152"].val }}℃
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5153')"
                v-if="CCIsDisplay('45', 'TP_0X04_5153')"
              >
                {{ voListMap["45"]["TP_0X04_5153"].val }}℃
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5154')"
                v-if="CCIsDisplay('45', 'TP_0X04_5154')"
              >
                {{ voListMap["45"]["TP_0X04_5154"].val }}℃
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5155')"
                v-if="CCIsDisplay('45', 'TP_0X04_5155')"
              >
                {{ voListMap["45"]["TP_0X04_5155"].val }}℃
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5156')"
                v-if="CCIsDisplay('45', 'TP_0X04_5156')"
              >
                {{ voListMap["45"]["TP_0X04_5156"].val }}℃
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5157')"
                v-if="CCIsDisplay('45', 'TP_0X04_5157')"
              >
                {{ voListMap["45"]["TP_0X04_5157"].val }}℃
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5158')"
                v-if="CCIsDisplay('45', 'TP_0X04_5158')"
              >
                {{ voListMap["45"]["TP_0X04_5158"].val }}℃
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5159')"
                v-if="CCIsDisplay('45', 'TP_0X04_5159')"
              >
                {{ voListMap["45"]["TP_0X04_5159"].val }}℃
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5160')"
                v-if="CCIsDisplay('45', 'TP_0X04_5160')"
              >
                {{ voListMap["45"]["TP_0X04_5160"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5161')"
                v-if="CCIsDisplay('45', 'TP_0X04_5161')"
              >
                {{ errorFilter[voListMap["45"]["TP_0X04_5161"].val] }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5162')"
                v-if="CCIsDisplay('45', 'TP_0X04_5162')"
              >
                {{ alarmFilter[voListMap["45"]["TP_0X04_5162"].val] }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5632')"
                v-if="CCIsDisplay('45', 'TP_0X04_5632')"
              >
                {{ voListMap["45"]["TP_0X04_5632"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5633')"
                v-if="CCIsDisplay('45', 'TP_0X04_5633')"
              >
                {{ voListMap["45"]["TP_0X04_5633"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5634')"
                v-if="CCIsDisplay('45', 'TP_0X04_5634')"
              >
                {{ voListMap["45"]["TP_0X04_5634"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5635')"
                v-if="CCIsDisplay('45', 'TP_0X04_5635')"
              >
                {{ voListMap["45"]["TP_0X04_5635"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5636')"
                v-if="CCIsDisplay('45', 'TP_0X04_5636')"
              >
                {{ voListMap["45"]["TP_0X04_5636"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5637')"
                v-if="CCIsDisplay('45', 'TP_0X04_5637')"
              >
                {{ voListMap["45"]["TP_0X04_5637"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5638')"
                v-if="CCIsDisplay('45', 'TP_0X04_5638')"
              >
                {{ voListMap["45"]["TP_0X04_5638"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5639')"
                v-if="CCIsDisplay('45', 'TP_0X04_5639')"
              >
                {{ voListMap["45"]["TP_0X04_5639"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5640')"
                v-if="CCIsDisplay('45', 'TP_0X04_5640')"
              >
                {{ voListMap["45"]["TP_0X04_5640"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5641')"
                v-if="CCIsDisplay('45', 'TP_0X04_5641')"
              >
                {{ voListMap["45"]["TP_0X04_5641"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5642')"
                v-if="CCIsDisplay('45', 'TP_0X04_5642')"
              >
                {{ voListMap["45"]["TP_0X04_5642"].val }}V
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5643')"
                v-if="CCIsDisplay('45', 'TP_0X04_5643')"
              >
                {{ voListMap["45"]["TP_0X04_5643"].val }}V
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5644')"
                v-if="CCIsDisplay('45', 'TP_0X04_5644')"
              >
                {{ voListMap["45"]["TP_0X04_5644"].val }}V
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5645')"
                v-if="CCIsDisplay('45', 'TP_0X04_5645')"
              >
                {{ voListMap["45"]["TP_0X04_5645"].val }}V
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5646')"
                v-if="CCIsDisplay('45', 'TP_0X04_5646')"
              >
                {{ voListMap["45"]["TP_0X04_5646"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5647')"
                v-if="CCIsDisplay('45', 'TP_0X04_5647')"
              >
                {{ voListMap["45"]["TP_0X04_5647"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5648')"
                v-if="CCIsDisplay('45', 'TP_0X04_5648')"
              >
                {{ voListMap["45"]["TP_0X04_5648"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5649')"
                v-if="CCIsDisplay('45', 'TP_0X04_5649')"
              >
                {{ voListMap["45"]["TP_0X04_5649"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5650')"
                v-if="CCIsDisplay('45', 'TP_0X04_5650')"
              >
                {{ voListMap["45"]["TP_0X04_5650"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5651')"
                v-if="CCIsDisplay('45', 'TP_0X04_5651')"
              >
                {{ voListMap["45"]["TP_0X04_5651"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5652')"
                v-if="CCIsDisplay('45', 'TP_0X04_5652')"
              >
                {{ voListMap["45"]["TP_0X04_5652"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5653')"
                v-if="CCIsDisplay('45', 'TP_0X04_5653')"
              >
                {{ voListMap["45"]["TP_0X04_5653"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5654')"
                v-if="CCIsDisplay('45', 'TP_0X04_5654')"
              >
                {{ voListMap["45"]["TP_0X04_5654"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5655')"
                v-if="CCIsDisplay('45', 'TP_0X04_5655')"
              >
                {{ voListMap["45"]["TP_0X04_5655"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5656')"
                v-if="CCIsDisplay('45', 'TP_0X04_5656')"
              >
                {{ voListMap["45"]["TP_0X04_5656"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5657')"
                v-if="CCIsDisplay('45', 'TP_0X04_5657')"
              >
                {{ voListMap["45"]["TP_0X04_5657"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5658')"
                v-if="CCIsDisplay('45', 'TP_0X04_5658')"
              >
                {{ voListMap["45"]["TP_0X04_5658"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5659')"
                v-if="CCIsDisplay('45', 'TP_0X04_5659')"
              >
                {{ voListMap["45"]["TP_0X04_5659"].val }}
              </el-descriptions-item>

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5660')"
                v-if="CCIsDisplay('45', 'TP_0X04_5660')"
              >
                {{ voListMap["45"]["TP_0X04_5660"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5662')"
                v-if="CCIsDisplay('45', 'TP_0X04_5662')"
              >
                {{ voListMap["45"]["TP_0X04_5662"].val }}V
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5663')"
                v-if="CCIsDisplay('45', 'TP_0X04_5663')"
              >
                {{ voListMap["45"]["TP_0X04_5663"].val }}V
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5664')"
                v-if="CCIsDisplay('45', 'TP_0X04_5664')"
              >
                {{ voListMap["45"]["TP_0X04_5664"].val }}V
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5665')"
                v-if="CCIsDisplay('45', 'TP_0X04_5665')"
              >
                {{ voListMap["45"]["TP_0X04_5665"].val }}V
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5666')"
                v-if="CCIsDisplay('45', 'TP_0X04_5666')"
              >
                {{ voListMap["45"]["TP_0X04_5666"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5667')"
                v-if="CCIsDisplay('45', 'TP_0X04_5667')"
              >
                {{ MOSFilter[voListMap["45"]["TP_0X04_5667"].val] }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5668')"
                v-if="CCIsDisplay('45', 'TP_0X04_5668')"
              >
                {{ voListMap["45"]["TP_0X04_5668"].val }}A
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5669')"
                v-if="CCIsDisplay('45', 'TP_0X04_5669')"
              >
                {{ voListMap["45"]["TP_0X04_5669"].val }}℃
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5670')"
                v-if="CCIsDisplay('45', 'TP_0X04_5670')"
              >
                {{ voListMap["45"]["TP_0X04_5670"].val }}℃
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5671')"
                v-if="CCIsDisplay('45', 'TP_0X04_5671')"
              >
                {{ voListMap["45"]["TP_0X04_5671"].val }}℃
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5672')"
                v-if="CCIsDisplay('45', 'TP_0X04_5672')"
              >
                {{ MOSFilter[voListMap["45"]["TP_0X04_5672"].val] }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5673')"
                v-if="CCIsDisplay('45', 'TP_0X04_5673')"
              >
                {{ MOSFilter[voListMap["45"]["TP_0X04_5673"].val] }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5674')"
                v-if="CCIsDisplay('45', 'TP_0X04_5674')"
              >
                {{ MOSFilter[voListMap["45"]["TP_0X04_5674"].val] }}
              </el-descriptions-item>

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5692')"
                v-if="CCIsDisplay('45', 'TP_0X04_5692')"
              >
                {{ voListMap["45"]["TP_0X04_5692"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5693')"
                v-if="CCIsDisplay('45', 'TP_0X04_5693')"
              >
                {{ voListMap["45"]["TP_0X04_5693"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5694')"
                v-if="CCIsDisplay('45', 'TP_0X04_5694')"
              >
                {{ voListMap["45"]["TP_0X04_5694"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5695')"
                v-if="CCIsDisplay('45', 'TP_0X04_5695')"
              >
                {{ voListMap["45"]["TP_0X04_5695"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5696')"
                v-if="CCIsDisplay('45', 'TP_0X04_5696')"
              >
                {{ voListMap["45"]["TP_0X04_5696"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5697')"
                v-if="CCIsDisplay('45', 'TP_0X04_5697')"
              >
                {{ voListMap["45"]["TP_0X04_5697"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5698')"
                v-if="CCIsDisplay('45', 'TP_0X04_5698')"
              >
                {{ voListMap["45"]["TP_0X04_5698"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5699')"
                v-if="CCIsDisplay('45', 'TP_0X04_5699')"
              >
                {{ voListMap["45"]["TP_0X04_5699"].val }}
              </el-descriptions-item>

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5700')"
                v-if="CCIsDisplay('45', 'TP_0X04_5700')"
              >
                {{ MOSFilter[voListMap["45"]["TP_0X04_5700"].val] }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5701')"
                v-if="CCIsDisplay('45', 'TP_0X04_5701')"
              >
                {{ fuseFilter[voListMap["45"]["TP_0X04_5701"].val] }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5702')"
                v-if="CCIsDisplay('45', 'TP_0X04_5702')"
              >
                {{ voListMap["45"]["TP_0X04_5702"].val }}℃
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5703')"
                v-if="CCIsDisplay('45', 'TP_0X04_5703')"
              >
                {{ voListMap["45"]["TP_0X04_5703"].val }}℃
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5704')"
                v-if="CCIsDisplay('45', 'TP_0X04_5704')"
              >
                {{ voListMap["45"]["TP_0X04_5704"].val }}A
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5705')"
                v-if="CCIsDisplay('45', 'TP_0X04_5705')"
              >
                {{ voListMap["45"]["TP_0X04_5705"].val }}A
              </el-descriptions-item>

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5719')"
                v-if="CCIsDisplay('45', 'TP_0X04_5719')"
              >
                {{ totalStatusFilter[voListMap["45"]["TP_0X04_5719"].val] }}
              </el-descriptions-item>

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5720')"
                v-if="CCIsDisplay('45', 'TP_0X04_5720')"
              >
                {{ voListMap["45"]["TP_0X04_5720"].val }}V
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5721')"
                v-if="CCIsDisplay('45', 'TP_0X04_5721')"
              >
                {{ voListMap["45"]["TP_0X04_5721"].val }}A
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_5722')"
                v-if="CCIsDisplay('45', 'TP_0X04_5722')"
              >
                {{ voListMap["45"]["TP_0X04_5722"].val }}W
              </el-descriptions-item>
            </el-descriptions>
          </el-card>
        </template>

        <template v-if="activeIndex === '46'">
          <el-card style="margin-top: 10px">
            <el-descriptions
              :title="$t('deviceManage.deviceInformation')"
              :column="3"
            >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_32768')"
                v-if="CCIsDisplay('46', 'TP_0X04_32768')"
              >
                {{ voListMap["46"]["TP_0X04_32768"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_32769')"
                v-if="CCIsDisplay('46', 'TP_0X04_32769')"
                >{{
                  voListMap["46"]["TP_0X04_32769"].val
                }}</el-descriptions-item
              >

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_32770')"
                v-if="CCIsDisplay('46', 'TP_0X04_32770')"
                >{{
                  voListMap["46"]["TP_0X04_32770"].val
                }}</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_32771')"
                v-if="CCIsDisplay('46', 'TP_0X04_32771')"
                >{{
                  voListMap["46"]["TP_0X04_32771"].val
                }}</el-descriptions-item
              >
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_32772_32779')"
                v-if="CCIsDisplay('46', 'TP_0X04_32772_32779')"
              >
                {{ voListMap["46"]["TP_0X04_32772_32779"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_32780_32787')"
                v-if="CCIsDisplay('46', 'TP_0X04_32780_32787')"
              >
                {{ voListMap["46"]["TP_0X04_32780_32787"].val }}
              </el-descriptions-item>

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_32788_32795')"
                v-if="CCIsDisplay('46', 'TP_0X04_32788_32795')"
              >
                {{ voListMap["46"]["TP_0X04_32788_32795"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_32796')"
                v-if="CCIsDisplay('46', 'TP_0X04_32796')"
              >
                {{ voListMap["46"]["TP_0X04_32796"].val }}
              </el-descriptions-item>

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_32797')"
                v-if="CCIsDisplay('46', 'TP_0X04_32797')"
                >{{
                  voListMap["46"]["TP_0X04_32797"].val
                }}</el-descriptions-item
              >

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_32798')"
                v-if="CCIsDisplay('46', 'TP_0X04_32798')"
                >{{
                  voListMap["46"]["TP_0X04_32798"].val
                }}</el-descriptions-item
              >

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_32799')"
                v-if="CCIsDisplay('46', 'TP_0X04_32799')"
                >{{
                  voListMap["46"]["TP_0X04_32799"].val
                }}</el-descriptions-item
              >

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_32800')"
                v-if="CCIsDisplay('46', 'TP_0X04_32800')"
                >{{
                  voListMap["46"]["TP_0X04_32800"].val
                }}</el-descriptions-item
              >

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_32801')"
                v-if="CCIsDisplay('46', 'TP_0X04_32801')"
              >
                {{ voListMap["46"]["TP_0X04_32801"].val }}
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_32802')"
                v-if="CCIsDisplay('46', 'TP_0X04_32802')"
              >
                {{ voListMap["46"]["TP_0X04_32802"].val }}
              </el-descriptions-item>

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_32803')"
                v-if="CCIsDisplay('46', 'TP_0X04_32803')"
              >
                {{ voListMap["46"]["TP_0X04_32803"].val }}
              </el-descriptions-item>

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_32804')"
                v-if="CCIsDisplay('46', 'TP_0X04_32804')"
              >
                {{ voListMap["46"]["TP_0X04_32804"].val }}
              </el-descriptions-item>

              <el-descriptions-item
                :label="$t('threePhase.TP_0X04_32805_32812')"
                v-if="CCIsDisplay('46', 'TP_0X04_32805_32812')"
              >
                {{ voListMap["46"]["TP_0X04_32805_32812"].val }}
              </el-descriptions-item>
            </el-descriptions>
          </el-card>
        </template>

        <template v-else-if="activeIndex === '47'">
          <el-card style="margin-top: 10px">
            <el-descriptions
              :title="$t('deviceManage.monitorSettings')"
              :column="3"
              border
            >
              <el-descriptions-item :label="$t('threePhase.TP_0X03_0')">
                <div style="display: flex">
                  <el-select
                    v-model="settingList['TP_0X03_0Val']"
                    :placeholder="$t('common.selectPrompt')"
                    v-if="CCIsDisplay('47', 'TP_0X03_0')"
                    style="width: 100%"
                  >
                    <el-option label="0" value="0" />
                    <el-option :label="$t('common.confirm')" value="65535" />
                  </el-select>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('47', 'TP_0X03_0')"
                    @click="
                      handleSave1('TP_0X03_0', settingList['TP_0X03_0Val'])
                    "
                  >
                    {{ $t("common.save") }}
                  </el-button>
                </div>
              </el-descriptions-item>

              <el-descriptions-item :label="$t('threePhase.TP_0X03_1')">
                <div style="display: flex">
                  <el-select
                    v-model="settingList['TP_0X03_1Val']"
                    :placeholder="$t('common.selectPrompt')"
                    v-if="CCIsDisplay('47', 'TP_0X03_1')"
                    style="width: 100%"
                  >
                    <el-option :label="0" value="0" />
                    <el-option :label="$t('common.confirm')" value="65535" />
                  </el-select>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('47', 'TP_0X03_1')"
                    @click="
                      handleSave1('TP_0X03_1', settingList['TP_0X03_1Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>

              <el-descriptions-item :label="$t('threePhase.TP_0X03_3')">
                <div style="display: flex">
                  <el-select
                    v-model="settingList['TP_0X03_3Val']"
                    :placeholder="$t('common.selectPrompt')"
                    v-if="CCIsDisplay('47', 'TP_0X03_3')"
                    style="width: 100%"
                  >
                    <el-option label="0" value="0" />
                    <el-option :label="$t('common.confirm')" value="65535" />
                  </el-select>
                  <!-- <el-input v-model="systemSet.otherSetObj.clearRecordDataVal" :placeholder="$t('common.inputPrompt')" /> -->
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('47', 'TP_0X03_3')"
                    @click="
                      handleSave1('TP_0X03_3', settingList['TP_0X03_3Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>

              <el-descriptions-item :label="$t('threePhase.TP_0X03_4')">
                <div style="display: flex">
                  <el-select
                    v-model="settingList['TP_0X03_4Val']"
                    :placeholder="$t('common.selectPrompt')"
                    v-if="CCIsDisplay('47', 'TP_0X03_4')"
                    style="width: 100%"
                  >
                    <el-option label="0" value="0" />
                    <el-option :label="$t('common.confirm')" value="1" />
                  </el-select>
                  <!-- <el-input v-model="systemSet.otherSetObj.resetDeviceCommunicationSettingsToInitialValuesVal" :placeholder="$t('common.inputPrompt')" /> -->
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('47', 'TP_0X03_4')"
                    @click="
                      handleSave1('TP_0X03_4', settingList['TP_0X03_4Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_5')">
                <div style="display: flex">
                  <!-- <el-input v-model="systemSet.otherSetObj.inverterRestartVal" :placeholder="$t('common.inputPrompt')" /> -->
                  <el-select
                    v-model="settingList['TP_0X03_5Val']"
                    :placeholder="$t('common.selectPrompt')"
                    v-if="CCIsDisplay('47', 'TP_0X03_5')"
                    style="width: 100%"
                  >
                    <el-option label="0" value="0" />
                    <el-option :label="$t('common.confirm')" value="65535" />
                  </el-select>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('47', 'TP_0X03_5')"
                    @click="
                      handleSave1('TP_0X03_5', settingList['TP_0X03_5Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_6')">
                <div style="display: flex">
                  <el-select
                    v-model="settingList['TP_0X03_6Val']"
                    :placeholder="$t('common.selectPrompt')"
                    v-if="CCIsDisplay('47', 'TP_0X03_6')"
                    style="width: 100%"
                  >
                    <el-option label="0" value="0" />
                    <el-option :label="$t('common.confirm')" value="65535" />
                  </el-select>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('47', 'TP_0X03_6')"
                    @click="
                      handleSave1('TP_0X03_6', settingList['TP_0X03_6Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_7')">
                <div style="display: flex">
                  <!-- <el-input v-model="systemSet.otherSetObj.manuallyClearingFaultsVal" :placeholder="$t('common.inputPrompt')" /> -->
                  <el-select
                    v-model="settingList['TP_0X03_7Val']"
                    :placeholder="$t('common.selectPrompt')"
                    v-if="CCIsDisplay('47', 'TP_0X03_7')"
                    style="width: 100%"
                  >
                    <el-option label="0" value="0" />
                    <el-option :label="$t('common.confirm')" value="65535" />
                  </el-select>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('47', 'TP_0X03_7')"
                    @click="
                      handleSave1('TP_0X03_7', settingList['TP_0X03_7Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>

              <el-descriptions-item :label="$t('threePhase.TP_0X03_8')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_8Val']"
                    v-if="CCIsDisplay('47', 'TP_0X03_8')"
                    :placeholder="$t('common.inputPrompt')"
                  >
                    <template slot="append">Min</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('47', 'TP_0X03_8')"
                    @click="
                      handleSave1('TP_0X03_8', settingList['TP_0X03_8Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>

              <el-descriptions-item :label="$t('threePhase.TP_0X03_9')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_9Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('47', 'TP_0X03_9')"
                  >
                    <template slot="append">Min</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('47', 'TP_0X03_9')"
                    @click="
                      handleSave1('TP_0X03_9', settingList['TP_0X03_9Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>

              <el-descriptions-item :label="$t('threePhase.TP_0X03_10')">
                <div style="display: flex">
                  <el-select
                    v-model="settingList['TP_0X03_10Val']"
                    :placeholder="$t('common.selectPrompt')"
                    v-if="CCIsDisplay('47', 'TP_0X03_10')"
                    style="width: 100%"
                  >
                    <el-option label="0" value="0" />
                    <el-option :label="$t('common.confirm')" value="65535" />
                  </el-select>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('47', 'TP_0X03_10')"
                    @click="
                      handleSave1('TP_0X03_10', settingList['TP_0X03_10Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_11')">
                <div style="display: flex">
                  <el-select
                    v-model="settingList['TP_0X03_11Val']"
                    :placeholder="$t('common.selectPrompt')"
                    v-if="CCIsDisplay('47', 'TP_0X03_11')"
                    style="width: 100%"
                  >
                    <el-option label="0" value="0" />
                    <el-option :label="$t('common.confirm')" value="65535" />
                  </el-select>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('47', 'TP_0X03_11')"
                    @click="
                      handleSave1('TP_0X03_11', settingList['TP_0X03_11Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_20_21_22')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_20_21_22Val']"
                    v-if="CCIsDisplay('47', 'TP_0X03_20_21_22')"
                    :placeholder="$t('common.inputPrompt')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('47', 'TP_0X03_20_21_22')"
                    @click="
                      handleSave1(
                        'TP_0X03_20_21_22',
                        settingList['TP_0X03_20_21_22Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_26')">
                <div style="display: flex">
                  <el-select
                    v-model="settingList['TP_0X03_26Val']"
                    :placeholder="$t('common.selectPrompt')"
                    v-if="CCIsDisplay('47', 'TP_0X03_26')"
                    style="width: 100%"
                  >
                    <el-option :label="$t('deviceManage.user')" value="0" />
                    <el-option :label="$t('deviceManage.engineer')" value="1" />
                  </el-select>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('47', 'TP_0X03_26')"
                    @click="
                      handleSave1('TP_0X03_26', settingList['TP_0X03_26Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_27')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_27Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('47', 'TP_0X03_27')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('47', 'TP_0X03_27')"
                    @click="
                      handleSave1('TP_0X03_27', settingList['TP_0X03_27Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>

              <el-descriptions-item :label="$t('threePhase.TP_0X03_28')">
                <div style="display: flex">
                  <el-select
                    v-model="settingList['TP_0X03_28Val']"
                    :placeholder="$t('common.selectPrompt')"
                    v-if="CCIsDisplay('47', 'TP_0X03_28')"
                    style="width: 100%"
                  >
                    <el-option label="1200" value="1" />
                    <el-option label="2400" value="2" />
                    <el-option label="4800" value="3" />
                    <el-option label="9600" value="4" />
                  </el-select>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('47', 'TP_0X03_28')"
                    @click="
                      handleSave1('TP_0X03_28', settingList['TP_0X03_28Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_31')">
                <div style="display: flex">
                  <el-select
                    v-model="settingList['TP_0X03_31Val']"
                    :placeholder="$t('common.selectPrompt')"
                    v-if="CCIsDisplay('47', 'TP_0X03_31')"
                    style="width: 100%"
                  >
                    <el-option :label="$t('deviceManage.user')" value="0" />
                    <el-option :label="$t('deviceManage.engineer')" value="1" />
                  </el-select>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('47', 'TP_0X03_31')"
                    @click="
                      handleSave1('TP_0X03_31', settingList['TP_0X03_31Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_32')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_32Val']"
                    v-if="CCIsDisplay('47', 'TP_0X03_32')"
                    :placeholder="$t('common.inputPrompt')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('47', 'TP_0X03_32')"
                    @click="
                      handleSave1('TP_0X03_32', settingList['TP_0X03_32Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>

              <el-descriptions-item :label="$t('threePhase.TP_0X03_33')">
                <div style="display: flex">
                  <el-select
                    v-model="settingList['TP_0X03_33Val']"
                    v-if="CCIsDisplay('47', 'TP_0X03_33')"
                    :placeholder="$t('common.selectPrompt')"
                    style="width: 100%"
                  >
                    <el-option label="1200" value="1" />
                    <el-option label="2400" value="2" />
                    <el-option label="4800" value="3" />
                    <el-option label="9600" value="4" />
                  </el-select>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('47', 'TP_0X03_33')"
                    @click="
                      handleSave1('TP_0X03_33', settingList['TP_0X03_33Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_41')">
                <div style="display: flex">
                  <el-select
                    v-model="settingList['TP_0X03_41Val']"
                    v-if="CCIsDisplay('47', 'TP_0X03_41')"
                    :placeholder="$t('common.selectPrompt')"
                    style="width: 100%"
                  >
                    <el-option label="None" value="0" />
                    <el-option label="East" value="6" />
                  </el-select>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('47', 'TP_0X03_41')"
                    @click="
                      handleSave1('TP_0X03_41', settingList['TP_0X03_41Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>

              <el-descriptions-item :label="$t('threePhase.TP_0X03_44')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_44Val']"
                    v-if="CCIsDisplay('47', 'TP_0X03_44')"
                    :placeholder="$t('common.inputPrompt')"
                  >
                    <template slot="append"></template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('47', 'TP_0X03_44')"
                    @click="
                      handleSave1('TP_0X03_44', settingList['TP_0X03_44Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_45')">
                <div style="display: flex">
                  <el-select
                    v-model="settingList['TP_0X03_45Val']"
                    :placeholder="$t('common.selectPrompt')"
                    v-if="CCIsDisplay('47', 'TP_0X03_45')"
                    style="width: 100%"
                  >
                    <el-option :label="$t('threePhase.auto')" value="0" />
                    <el-option
                      :label="$t('deviceManage.handMovement')"
                      value="1"
                    />
                  </el-select>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('47', 'TP_0X03_45')"
                    @click="
                      handleSave1('TP_0X03_45', settingList['TP_0X03_45Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>

              <el-descriptions-item :label="$t('threePhase.TP_0X03_46')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_46Val']"
                    v-if="CCIsDisplay('47', 'TP_0X03_46')"
                    :placeholder="$t('common.inputPrompt')"
                  >
                    <template slot="append"></template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('47', 'TP_0X03_46')"
                    @click="
                      handleSave1('TP_0X03_46', settingList['TP_0X03_46Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_47')">
                <div style="display: flex">
                  <el-select
                    v-model="settingList['TP_0X03_47Val']"
                    v-if="CCIsDisplay('47', 'TP_0X03_47')"
                    :placeholder="$t('common.selectPrompt')"
                    style="width: 100%"
                  >
                    <el-option :label="$t('threePhase.auto')" value="0" />
                    <el-option
                      :label="$t('deviceManage.handMovement')"
                      value="1"
                    />
                  </el-select>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('47', 'TP_0X03_47')"
                    @click="
                      handleSave1('TP_0X03_47', settingList['TP_0X03_47Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>

              <el-descriptions-item :label="$t('threePhase.TP_0X03_53')">
                <div style="display: flex">
                  <el-select
                    v-model="settingList['TP_0X03_53Val']"
                    :placeholder="$t('common.selectPrompt')"
                    v-if="CCIsDisplay('47', 'TP_0X03_53')"
                    style="width: 100%"
                  >
                    <el-option label="0" value="0" />
                    <el-option :label="$t('common.confirm')" value="65535" />
                  </el-select>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('47', 'TP_0X03_53')"
                    @click="
                      handleSave1('TP_0X03_53', settingList['TP_0X03_53Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>

              <el-descriptions-item :label="$t('threePhase.TP_0X03_54')">
                <div style="display: flex">
                  <el-select
                    v-model="settingList['TP_0X03_54Val']"
                    :placeholder="$t('common.selectPrompt')"
                    v-if="CCIsDisplay('47', 'TP_0X03_54')"
                    style="width: 100%"
                  >
                    <el-option label="0" value="0" />
                    <el-option :label="$t('common.confirm')" value="65535" />
                  </el-select>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('47', 'TP_0X03_54')"
                    @click="
                      handleSave1('TP_0X03_54', settingList['TP_0X03_54Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>

              <el-descriptions-item :label="$t('threePhase.TP_0X03_55')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_55Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('47', 'TP_0X03_55')"
                  >
                    <template slot="append">Min</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('47', 'TP_0X03_55')"
                    @click="
                      handleSave1('TP_0X03_55', settingList['TP_0X03_55Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_56')">
                <div style="display: flex">
                  <el-select
                    v-model="settingList['TP_0X03_56Val']"
                    :placeholder="$t('common.selectPrompt')"
                    v-if="CCIsDisplay('47', 'TP_0X03_56')"
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
                  </el-select>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('47', 'TP_0X03_56')"
                    @click="
                      handleSave1('TP_0X03_56', settingList['TP_0X03_56Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_57')">
                <div style="display: flex">
                  <el-select
                    v-model="settingList['TP_0X03_57Val']"
                    :placeholder="$t('common.selectPrompt')"
                    v-if="CCIsDisplay('47', 'TP_0X03_57')"
                    style="width: 100%"
                  >
                    <el-option label="0" value="0" />
                    <el-option :label="$t('common.confirm')" value="65535" />
                  </el-select>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('47', 'TP_0X03_57')"
                    @click="
                      handleSave1('TP_0X03_57', settingList['TP_0X03_57Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_58')">
                <div style="display: flex">
                  <el-select
                    v-model="settingList['TP_0X03_58Val']"
                    v-if="CCIsDisplay('47', 'TP_0X03_58')"
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
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('47', 'TP_0X03_58')"
                    @click="
                      handleSave1('TP_0X03_58', settingList['TP_0X03_58Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_71')">
                <div style="display: flex">
                  <el-select
                    v-model="settingList['TP_0X03_71Val']"
                    :placeholder="$t('common.selectPrompt')"
                    v-if="CCIsDisplay('47', 'TP_0X03_71')"
                    style="width: 100%"
                  >
                    <el-option
                      :label="$t('deviceManage.setByDate')"
                      value="0"
                    />
                    <el-option
                      :label="$t('deviceManage.setByTime')"
                      value="1"
                    />
                    <el-option
                      :label="$t('deviceManage.realTimeSwitchingOfMode')"
                      value="2"
                    />
                  </el-select>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('47', 'TP_0X03_71')"
                    @click="
                      handleSave1('TP_0X03_71', settingList['TP_0X03_71Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_72')">
                <div style="display: flex">
                  <el-select
                    v-model="settingList['TP_0X03_72Val']"
                    :placeholder="$t('common.selectPrompt')"
                    v-if="CCIsDisplay('47', 'TP_0X03_72')"
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
                    <el-option
                      :label="$t('deviceManage.purePVMode')"
                      value="6"
                    />
                    <el-option
                      :label="$t('deviceManage.forcedOffGridMode')"
                      value="7"
                    />
                  </el-select>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('47', 'TP_0X03_72')"
                    @click="
                      handleSave1('TP_0X03_72', settingList['TP_0X03_72Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
            </el-descriptions>
          </el-card>
        </template>

        <template v-else-if="activeIndex === '48'">
          <el-card style="margin-top: 10px">
            <el-descriptions
              :title="$t('deviceManage.masterUser')"
              :column="3"
              border
            >
              <el-descriptions-item :label="$t('threePhase.TP_0X03_1024')">
                <div style="display: flex">
                  <el-select
                    v-model="settingList['TP_0X03_1024Val']"
                    :placeholder="$t('common.selectPrompt')"
                    v-if="CCIsDisplay('48', 'TP_0X03_1024')"
                    style="width: 100%"
                  >
                    <el-option :label="$t('deviceManage.China')" value="0" />
                    <el-option :label="$t('deviceManage.Italy')" value="1" />
                    <el-option :label="$t('deviceManage.Germany')" value="2" />
                    <el-option
                      :label="$t('deviceManage.Australia')"
                      value="3"
                    />
                    <el-option :label="$t('deviceManage.Belgium')" value="4" />
                    <el-option
                      :label="$t('deviceManage.SouthAfrica')"
                      value="5"
                    />
                    <el-option :label="$t('deviceManage.England')" value="6" />
                    <el-option :label="$t('deviceManage.Spain')" value="7" />
                  </el-select>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1024')"
                    @click="
                      handleSave2(
                        'TP_0X03_1024',
                        settingList['TP_0X03_1024Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>

              <el-descriptions-item :label="$t('threePhase.TP_0X03_1025')">
                <div style="display: flex">
                  <el-select
                    v-model="settingList['TP_0X03_1025Val']"
                    :placeholder="$t('common.selectPrompt')"
                    v-if="CCIsDisplay('48', 'TP_0X03_1025')"
                    style="width: 100%"
                  >
                    <el-option
                      :label="$t('deviceManage.handMovement')"
                      value="0"
                    />
                    <el-option
                      :label="$t('deviceManage.automatic')"
                      value="1"
                    />
                  </el-select>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1025')"
                    @click="
                      handleSave2(
                        'TP_0X03_1025',
                        settingList['TP_0X03_1025Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>

              <el-descriptions-item :label="$t('threePhase.TP_0X03_1026')">
                <div style="display: flex">
                  <el-select
                    v-model="settingList['TP_0X03_1026Val']"
                    :placeholder="$t('common.selectPrompt')"
                    v-if="CCIsDisplay('48', 'TP_0X03_1026')"
                    style="width: 100%"
                  >
                    <el-option :label="$t('deviceManage.enable')" value="1" />
                    <el-option :label="$t('deviceManage.shield')" value="0" />
                  </el-select>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1026')"
                    @click="
                      handleSave2(
                        'TP_0X03_1026',
                        settingList['TP_0X03_1026Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>

              <el-descriptions-item :label="$t('threePhase.TP_0X03_1027')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_1027Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('48', 'TP_0X03_1027')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1027')"
                    @click="
                      handleSave2(
                        'TP_0X03_1027',
                        settingList['TP_0X03_1027Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>

              <el-descriptions-item :label="$t('threePhase.TP_0X03_1028')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_1028Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('48', 'TP_0X03_1028')"
                  >
                    <template slot="append">%</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1028')"
                    @click="
                      handleSave2(
                        'TP_0X03_1028',
                        settingList['TP_0X03_1028Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_1029')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_1029Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('48', 'TP_0X03_1029')"
                  >
                    <template slot="append">%</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1029')"
                    @click="
                      handleSave2(
                        'TP_0X03_1029',
                        settingList['TP_0X03_1029Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_1030')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_1030Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('48', 'TP_0X03_1030')"
                  >
                    <template slot="append">%Wmax/s</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1030')"
                    @click="
                      handleSave2(
                        'TP_0X03_1030',
                        settingList['TP_0X03_1030Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_1031')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_1031Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('48', 'TP_0X03_1031')"
                  >
                    <template slot="append">%Wmax/Min</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1031')"
                    @click="
                      handleSave2(
                        'TP_0X03_1031',
                        settingList['TP_0X03_1031Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>

              <el-descriptions-item :label="$t('threePhase.TP_0X03_1032')">
                <div style="display: flex">
                  <el-select
                    v-model="settingList['TP_0X03_1032Val']"
                    :placeholder="$t('common.selectPrompt')"
                    v-if="CCIsDisplay('48', 'TP_0X03_1032')"
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
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1032')"
                    @click="
                      handleSave2(
                        'TP_0X03_1032',
                        settingList['TP_0X03_1032Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_1033')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_1033Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('48', 'TP_0X03_1033')"
                  >
                    <template slot="append">%VAmax/s</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1033')"
                    @click="
                      handleSave2(
                        'TP_0X03_1033',
                        settingList['TP_0X03_1033Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_1034')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_1034Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('48', 'TP_0X03_1034')"
                  >
                    <template slot="append">%</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1034')"
                    @click="
                      handleSave2(
                        'TP_0X03_1034',
                        settingList['TP_0X03_1034Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_1035')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_1035Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('48', 'TP_0X03_1035')"
                  >
                    <template slot="append">%</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1035')"
                    @click="
                      handleSave2(
                        'TP_0X03_1035',
                        settingList['TP_0X03_1035Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_1036')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_1036Val']"
                    v-if="CCIsDisplay('48', 'TP_0X03_1036')"
                    :placeholder="$t('common.inputPrompt')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1036')"
                    @click="
                      handleSave2(
                        'TP_0X03_1036',
                        settingList['TP_0X03_1036Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_1037')">
                <div style="display: flex">
                  <el-select
                    v-model="settingList['TP_0X03_1037Val']"
                    :placeholder="$t('common.selectPrompt')"
                    v-if="CCIsDisplay('48', 'TP_0X03_1037')"
                    style="width: 100%"
                  >
                    <el-option
                      :label="$t('deviceManage.notEnable')"
                      value="0"
                    />
                    <el-option :label="$t('deviceManage.enable')" value="1" />
                  </el-select>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1037')"
                    @click="
                      handleSave2(
                        'TP_0X03_1037',
                        settingList['TP_0X03_1037Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>

              <el-descriptions-item :label="$t('threePhase.TP_0X03_1038')">
                <div style="display: flex">
                  <el-select
                    v-model="settingList['TP_0X03_1038Val']"
                    :placeholder="$t('common.selectPrompt')"
                    v-if="CCIsDisplay('48', 'TP_0X03_1038')"
                    style="width: 100%"
                  >
                    <el-option :label="$t('menuManage.close')" value="0" />
                    <el-option :label="$t('menuManage.open')" value="1" />
                  </el-select>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1038')"
                    @click="
                      handleSave2(
                        'TP_0X03_1038',
                        settingList['TP_0X03_1038Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_1039')">
                <div style="display: flex">
                  <el-select
                    v-model="settingList['TP_0X03_1039Val']"
                    :placeholder="$t('common.selectPrompt')"
                    v-if="CCIsDisplay('48', 'TP_0X03_1039')"
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
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1039')"
                    @click="
                      handleSave2(
                        'TP_0X03_1039',
                        settingList['TP_0X03_1039Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_1040')">
                <div style="display: flex">
                  <el-select
                    v-model="settingList['TP_0X03_1040Val']"
                    v-if="CCIsDisplay('48', 'TP_0X03_1040')"
                    :placeholder="$t('common.selectPrompt')"
                    style="width: 100%"
                  >
                    <el-option :label="$t('deviceManage.inactive')" value="0" />
                    <el-option :label="$t('deviceManage.activate')" value="1" />
                  </el-select>

                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1040')"
                    @click="
                      handleSave2(
                        'TP_0X03_1040',
                        settingList['TP_0X03_1040Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>

              <el-descriptions-item :label="$t('threePhase.TP_0X03_1041')">
                <div style="display: flex">
                  <el-select
                    v-model="settingList['TP_0X03_1041Val']"
                    :placeholder="$t('common.selectPrompt')"
                    v-if="CCIsDisplay('48', 'TP_0X03_1041')"
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
                    <el-option
                      :label="$t('deviceManage.NewZealand')"
                      value="3"
                    />
                  </el-select>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1041')"
                    @click="
                      handleSave2(
                        'TP_0X03_1041',
                        settingList['TP_0X03_1041Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_1042')">
                <div style="display: flex">
                  <el-select
                    v-model="settingList['TP_0X03_1042Val']"
                    :placeholder="$t('common.selectPrompt')"
                    v-if="CCIsDisplay('48', 'TP_0X03_1042')"
                    style="width: 100%"
                  >
                    <el-option
                      :label="$t('deviceManage.powerGrid')"
                      value="0"
                    />
                    <el-option
                      :label="$t('deviceManage.alternator')"
                      value="1"
                    />
                  </el-select>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1042')"
                    @click="
                      handleSave2(
                        'TP_0X03_1042',
                        settingList['TP_0X03_1042Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_1043')">
                <div style="display: flex">
                  <el-select
                    v-model="settingList['TP_0X03_1043Val']"
                    :placeholder="$t('common.selectPrompt')"
                    v-if="CCIsDisplay('48', 'TP_0X03_1043')"
                    style="width: 100%"
                  >
                    <el-option label="UPS" value="0" />
                    <el-option label="EPS" value="1" />
                  </el-select>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1043')"
                    @click="
                      handleSave2(
                        'TP_0X03_1043',
                        settingList['TP_0X03_1043Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_1044')">
                <div style="display: flex">
                  <el-select
                    v-model="settingList['TP_0X03_1044Val']"
                    :placeholder="$t('common.selectPrompt')"
                    v-if="CCIsDisplay('48', 'TP_0X03_1044')"
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
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1044')"
                    @click="
                      handleSave2(
                        'TP_0X03_1044',
                        settingList['TP_0X03_1044Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_1045')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_1045Val']"
                    v-if="CCIsDisplay('48', 'TP_0X03_1045')"
                    :placeholder="$t('common.inputPrompt')"
                  >
                    <template slot="append">V</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1045')"
                    @click="
                      handleSave2(
                        'TP_0X03_1045',
                        settingList['TP_0X03_1045Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_1046')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_1046Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('48', 'TP_0X03_1046')"
                  >
                    <template slot="append">Hz</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1046')"
                    @click="
                      handleSave2(
                        'TP_0X03_1046',
                        settingList['TP_0X03_1046Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_1047')">
                <div style="display: flex">
                  <el-select
                    v-model="settingList['TP_0X03_1047Val']"
                    :placeholder="$t('common.selectPrompt')"
                    v-if="CCIsDisplay('48', 'TP_0X03_1047')"
                    style="width: 100%"
                  >
                    <el-option :label="$t('deviceManage.leadAcid')" value="0" />
                    <el-option
                      :label="$t('deviceManage.lithiumBattery')"
                      value="1"
                    />
                  </el-select>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1047')"
                    @click="
                      handleSave2(
                        'TP_0X03_1047',
                        settingList['TP_0X03_1047Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_1048')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_1048Val']"
                    v-if="CCIsDisplay('48', 'TP_0X03_1048')"
                    :placeholder="$t('common.inputPrompt')"
                  >
                    <template slot="append">A</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1048')"
                    @click="
                      handleSave2(
                        'TP_0X03_1048',
                        settingList['TP_0X03_1048Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_1049')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_1049Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('48', 'TP_0X03_1049')"
                  >
                    <template slot="append">A</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1049')"
                    @click="
                      handleSave2(
                        'TP_0X03_1049',
                        settingList['TP_0X03_1049Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_1050')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_1050Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('48', 'TP_0X03_1050')"
                  >
                    <template slot="append">V</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1050')"
                    @click="
                      handleSave2(
                        'TP_0X03_1050',
                        settingList['TP_0X03_1050Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_1051')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_1051Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('48', 'TP_0X03_1051')"
                  >
                    <template slot="append">V</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1051')"
                    @click="
                      handleSave2(
                        'TP_0X03_1051',
                        settingList['TP_0X03_1051Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_1052')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_1052Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('48', 'TP_0X03_1052')"
                  >
                    <template slot="append">V</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1052')"
                    @click="
                      handleSave2(
                        'TP_0X03_1052',
                        settingList['TP_0X03_1052Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_1053')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_1053Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('48', 'TP_0X03_1053')"
                  >
                    <template slot="append">V</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1053')"
                    @click="
                      handleSave2(
                        'TP_0X03_1053',
                        settingList['TP_0X03_1053Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_1054')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_1054Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('48', 'TP_0X03_1054')"
                  >
                    <template slot="append">%</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1054')"
                    @click="
                      handleSave2(
                        'TP_0X03_1054',
                        settingList['TP_0X03_1054Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_1055')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_1055Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('48', 'TP_0X03_1055')"
                  >
                    <template slot="append">%</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1055')"
                    @click="
                      handleSave2(
                        'TP_0X03_1055',
                        settingList['TP_0X03_1055Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_1056')">
                <div style="display: flex">
                  <el-select
                    v-model="settingList['TP_0X03_1056Val']"
                    :placeholder="$t('common.selectPrompt')"
                    v-if="CCIsDisplay('48', 'TP_0X03_1056')"
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
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1056')"
                    @click="
                      handleSave2(
                        'TP_0X03_1056',
                        settingList['TP_0X03_1056Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_1057')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_1057Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('48', 'TP_0X03_1057')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1057')"
                    @click="
                      handleSave2(
                        'TP_0X03_1057',
                        settingList['TP_0X03_1057Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>

              <el-descriptions-item :label="$t('threePhase.TP_0X03_1058')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_1058Val']"
                    v-if="CCIsDisplay('48', 'TP_0X03_1058')"
                    :placeholder="$t('common.inputPrompt')"
                  >
                    <template slot="append">V</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1058')"
                    @click="
                      handleSave2(
                        'TP_0X03_1058',
                        settingList['TP_0X03_1058Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_1059')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_1059Val']"
                    v-if="CCIsDisplay('48', 'TP_0X03_1059')"
                    :placeholder="$t('common.inputPrompt')"
                  >
                    <template slot="append">V</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1059')"
                    @click="
                      handleSave2(
                        'TP_0X03_1059',
                        settingList['TP_0X03_1059Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_1060')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_1060Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('48', 'TP_0X03_1060')"
                  >
                    <template slot="append">V</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1060')"
                    @click="
                      handleSave2(
                        'TP_0X03_1060',
                        settingList['TP_0X03_1060Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_1061')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_1061Val']"
                    v-if="CCIsDisplay('48', 'TP_0X03_1061')"
                    :placeholder="$t('common.inputPrompt')"
                  >
                    <template slot="append">V</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1061')"
                    @click="
                      handleSave2(
                        'TP_0X03_1061',
                        settingList['TP_0X03_1061Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_1062')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_1062Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('48', 'TP_0X03_1062')"
                  >
                    <template slot="append">V</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1062')"
                    @click="
                      handleSave2(
                        'TP_0X03_1062',
                        settingList['TP_0X03_1062Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_1063')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_1063Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('48', 'TP_0X03_1063')"
                  >
                    <template slot="append">V</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1063')"
                    @click="
                      handleSave2(
                        'TP_0X03_1063',
                        settingList['TP_0X03_1063Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_1064')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_1064Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('48', 'TP_0X03_1064')"
                  >
                    <template slot="append">V</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1064')"
                    @click="
                      handleSave2(
                        'TP_0X03_1064',
                        settingList['TP_0X03_1064Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_1065')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_1065Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('48', 'TP_0X03_1065')"
                  >
                    <template slot="append">V</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1065')"
                    @click="
                      handleSave2(
                        'TP_0X03_1065',
                        settingList['TP_0X03_1065Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_1066')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_1066Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('48', 'TP_0X03_1066')"
                  >
                    <template slot="append">ms</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1066')"
                    @click="
                      handleSave2(
                        'TP_0X03_1066',
                        settingList['TP_0X03_1066Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_1067')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_1067Val']"
                    v-if="CCIsDisplay('48', 'TP_0X03_1067')"
                    :placeholder="$t('common.inputPrompt')"
                  >
                    <template slot="append">ms</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1067')"
                    @click="
                      handleSave2(
                        'TP_0X03_1067',
                        settingList['TP_0X03_1067Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_1068')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_1068Val']"
                    v-if="CCIsDisplay('48', 'TP_0X03_1068')"
                    :placeholder="$t('common.inputPrompt')"
                  >
                    <template slot="append">ms</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1068')"
                    @click="
                      handleSave2(
                        'TP_0X03_1068',
                        settingList['TP_0X03_1068Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_1069')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_1069Val']"
                    v-if="CCIsDisplay('48', 'TP_0X03_1069')"
                    :placeholder="$t('common.inputPrompt')"
                  >
                    <template slot="append">ms</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1069')"
                    @click="
                      handleSave2(
                        'TP_0X03_1069',
                        settingList['TP_0X03_1069Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_1070')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_1070Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('48', 'TP_0X03_1070')"
                  >
                    <template slot="append">ms</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1070')"
                    @click="
                      handleSave2(
                        'TP_0X03_1070',
                        settingList['TP_0X03_1070Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_1071')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_1071Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('48', 'TP_0X03_1071')"
                  >
                    <template slot="append">ms</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1071')"
                    @click="
                      handleSave2(
                        'TP_0X03_1071',
                        settingList['TP_0X03_1071Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_1072')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_1072Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('48', 'TP_0X03_1072')"
                  >
                    <template slot="append">ms</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1072')"
                    @click="
                      handleSave2(
                        'TP_0X03_1072',
                        settingList['TP_0X03_1072Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_1073')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_1073Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('48', 'TP_0X03_1073')"
                  >
                    <template slot="append">Hz</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1073')"
                    @click="
                      handleSave2(
                        'TP_0X03_1073',
                        settingList['TP_0X03_1073Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_1074')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_1074Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('48', 'TP_0X03_1074')"
                  >
                    <template slot="append">Hz</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1074')"
                    @click="
                      handleSave2(
                        'TP_0X03_1074',
                        settingList['TP_0X03_1074Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_1075')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_1075Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('48', 'TP_0X03_1075')"
                  >
                    <template slot="append">Hz</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1075')"
                    @click="
                      handleSave2(
                        'TP_0X03_1075',
                        settingList['TP_0X03_1075Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_1076')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_1076Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('48', 'TP_0X03_1076')"
                  >
                    <template slot="append">Hz</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1076')"
                    @click="
                      handleSave2(
                        'TP_0X03_1076',
                        settingList['TP_0X03_1076Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_1077')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_1077Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('48', 'TP_0X03_1077')"
                  >
                    <template slot="append">Hz</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1077')"
                    @click="
                      handleSave2(
                        'TP_0X03_1077',
                        settingList['TP_0X03_1077Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_1078')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_1078Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('48', 'TP_0X03_1078')"
                  >
                    <template slot="append">Hz</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1078')"
                    @click="
                      handleSave2(
                        'TP_0X03_1078',
                        settingList['TP_0X03_1078Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_1079')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_1079Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('48', 'TP_0X03_1079')"
                  >
                    <template slot="append">Hz</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1079')"
                    @click="
                      handleSave2(
                        'TP_0X03_1079',
                        settingList['TP_0X03_1079Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_1080')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_1080Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('48', 'TP_0X03_1080')"
                  >
                    <template slot="append">Hz</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1080')"
                    @click="
                      handleSave2(
                        'TP_0X03_1080',
                        settingList['TP_0X03_1080Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_1081')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_1081Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('48', 'TP_0X03_1081')"
                  >
                    <template slot="append">ms</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1081')"
                    @click="
                      handleSave2(
                        'TP_0X03_1081',
                        settingList['TP_0X03_1081Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_1082')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_1082Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('48', 'TP_0X03_1082')"
                  >
                    <template slot="append">ms</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1082')"
                    @click="
                      handleSave2(
                        'TP_0X03_1082',
                        settingList['TP_0X03_1082Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_1083')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_1083Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('48', 'TP_0X03_1083')"
                  >
                    <template slot="append">ms</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1083')"
                    @click="
                      handleSave2(
                        'TP_0X03_1083',
                        settingList['TP_0X03_1083Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_1084')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_1084Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('48', 'TP_0X03_1084')"
                  >
                    <template slot="append">ms</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1084')"
                    @click="
                      handleSave2(
                        'TP_0X03_1084',
                        settingList['TP_0X03_1084Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_1085')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_1085Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('48', 'TP_0X03_1085')"
                  >
                    <template slot="append">ms</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1085')"
                    @click="
                      handleSave2(
                        'TP_0X03_1085',
                        settingList['TP_0X03_1085Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_1086')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_1086Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('48', 'TP_0X03_1086')"
                  >
                    <template slot="append">ms</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1086')"
                    @click="
                      handleSave2(
                        'TP_0X03_1086',
                        settingList['TP_0X03_1086Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_1087')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_1087Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('48', 'TP_0X03_1087')"
                  >
                    <template slot="append">ms</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1087')"
                    @click="
                      handleSave2(
                        'TP_0X03_1087',
                        settingList['TP_0X03_1087Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_1088')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_1088Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('48', 'TP_0X03_1088')"
                  >
                    <template slot="append">V</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1088')"
                    @click="
                      handleSave2(
                        'TP_0X03_1088',
                        settingList['TP_0X03_1088Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_1089')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_1089Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('48', 'TP_0X03_1089')"
                  >
                    <template slot="append">s</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1089')"
                    @click="
                      handleSave2(
                        'TP_0X03_1089',
                        settingList['TP_0X03_1089Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_1090')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_1090Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('48', 'TP_0X03_1090')"
                  >
                    <template slot="append">s</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1090')"
                    @click="
                      handleSave2(
                        'TP_0X03_1090',
                        settingList['TP_0X03_1090Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>

              <el-descriptions-item :label="$t('threePhase.TP_0X03_1091')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_1091Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('48', 'TP_0X03_1091')"
                  >
                    <template slot="append">%</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1091')"
                    @click="
                      handleSave2(
                        'TP_0X03_1091',
                        settingList['TP_0X03_1091Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_1092')">
                <div style="display: flex">
                  <el-select
                    v-model="settingList['TP_0X03_1092Val']"
                    :placeholder="$t('common.selectPrompt')"
                    v-if="CCIsDisplay('48', 'TP_0X03_1092')"
                    style="width: 100%"
                  >
                    <el-option
                      :label="$t('deviceManage.notEnable')"
                      value="0"
                    />
                    <el-option :label="$t('deviceManage.enable')" value="1" />
                  </el-select>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1092')"
                    @click="
                      handleSave2(
                        'TP_0X03_1092',
                        settingList['TP_0X03_1092Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_1093')">
                <div style="display: flex">
                  <el-select
                    v-model="settingList['TP_0X03_1093Val']"
                    :placeholder="$t('common.selectPrompt')"
                    v-if="CCIsDisplay('48', 'TP_0X03_1093')"
                    style="width: 100%"
                  >
                    <el-option
                      :label="$t('deviceManage.notEnable')"
                      value="0"
                    />
                    <el-option :label="$t('deviceManage.enable')" value="1" />
                  </el-select>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1093')"
                    @click="
                      handleSave2(
                        'TP_0X03_1093',
                        settingList['TP_0X03_1093Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_1094')">
                <div style="display: flex">
                  <el-select
                    v-model="settingList['TP_0X03_1094Val']"
                    :placeholder="$t('common.selectPrompt')"
                    v-if="CCIsDisplay('48', 'TP_0X03_1094')"
                    style="width: 100%"
                  >
                    <el-option
                      :label="$t('deviceManage.notEnable')"
                      value="0"
                    />
                    <el-option :label="$t('deviceManage.enable')" value="1" />
                  </el-select>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1094')"
                    @click="
                      handleSave2(
                        'TP_0X03_1094',
                        settingList['TP_0X03_1094Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_1095')">
                <div style="display: flex">
                  <el-select
                    v-model="settingList['TP_0X03_1095Val']"
                    :placeholder="$t('common.selectPrompt')"
                    v-if="CCIsDisplay('48', 'TP_0X03_1095')"
                    style="width: 100%"
                  >
                    <el-option
                      :label="$t('deviceManage.notEnable')"
                      value="0"
                    />
                    <el-option :label="$t('deviceManage.enable')" value="1" />
                  </el-select>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1095')"
                    @click="
                      handleSave2(
                        'TP_0X03_1095',
                        settingList['TP_0X03_1095Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_1096')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_1096Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('48', 'TP_0X03_1096')"
                  >
                    <template slot="append">%</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1096')"
                    @click="
                      handleSave2(
                        'TP_0X03_1096',
                        settingList['TP_0X03_1096Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_1097')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_1097Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('48', 'TP_0X03_1097')"
                  >
                    <template slot="append">%</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1097')"
                    @click="
                      handleSave2(
                        'TP_0X03_1097',
                        settingList['TP_0X03_1097Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_1098')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_1098Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('48', 'TP_0X03_1098')"
                  >
                    <template slot="append">%</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1098')"
                    @click="
                      handleSave2(
                        'TP_0X03_1098',
                        settingList['TP_0X03_1098Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_1099')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_1099Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('48', 'TP_0X03_1099')"
                  >
                    <template slot="append">%</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1099')"
                    @click="
                      handleSave2(
                        'TP_0X03_1099',
                        settingList['TP_0X03_1099Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_1100')">
                <div style="display: flex">
                  <el-select
                    v-model="settingList['TP_0X03_1100Val']"
                    :placeholder="$t('common.selectPrompt')"
                    v-if="CCIsDisplay('48', 'TP_0X03_1100')"
                    style="width: 100%"
                  >
                    <el-option :label="$t('threePhase.three')" value="0" />
                    <el-option :label="$t('threePhase.four')" value="1" />
                  </el-select>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('48', 'TP_0X03_1100')"
                    @click="
                      handleSave2(
                        'TP_0X03_1100',
                        settingList['TP_0X03_1100Val']
                      )
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
            </el-descriptions>
          </el-card>
        </template>

        <template v-else-if="activeIndex === '49'">
          <el-card style="margin-top: 10px">
            <el-descriptions
              :title="$t('deviceManage.scheduledSettings')"
              :column="3"
              border
            >
              <el-descriptions-item :label="$t('threePhase.TP_0X03_76')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_76Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_76')"
                  >
                    <template slot="append">Month</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_76')"
                    @click="
                      handleSave3('TP_0X03_76', settingList['TP_0X03_76Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_77')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_77Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_77')"
                  >
                    <template slot="append">Month</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_77')"
                    @click="
                      handleSave3('TP_0X03_77', settingList['TP_0X03_77Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_78')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_78Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_78')"
                  >
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_78')"
                    @click="
                      handleSave3('TP_0X03_78', settingList['TP_0X03_78Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_79')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_79Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_79')"
                  >
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_79')"
                    @click="
                      handleSave3('TP_0X03_79', settingList['TP_0X03_79Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_80')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_80Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_80')"
                  >
                    <template slot="append">h</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_80')"
                    @click="
                      handleSave3('TP_0X03_80', settingList['TP_0X03_80Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>

              <el-descriptions-item :label="$t('threePhase.TP_0X03_81')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_81Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_81')"
                  >
                    <template slot="append">min</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_81')"
                    @click="
                      handleSave3('TP_0X03_81', settingList['TP_0X03_81Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>

              <el-descriptions-item :label="$t('threePhase.TP_0X03_82')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_82Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_82')"
                  >
                    <template slot="append">h</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_82')"
                    @click="
                      handleSave3('TP_0X03_82', settingList['TP_0X03_82Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_83')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_83Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_83')"
                  >
                    <template slot="append">min</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_83')"
                    @click="
                      handleSave3('TP_0X03_83', settingList['TP_0X03_83Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_84')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_84Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_84')"
                  >
                    <template slot="append">h</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_84')"
                    @click="
                      handleSave3('TP_0X03_84', settingList['TP_0X03_84Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_85')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_85Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_85')"
                  >
                    <template slot="append">min</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_85')"
                    @click="
                      handleSave3('TP_0X03_85', settingList['TP_0X03_85Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_86')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_86Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_86')"
                  >
                    <template slot="append">h</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_86')"
                    @click="
                      handleSave3('TP_0X03_86', settingList['TP_0X03_86Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_87')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_87Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_87')"
                  >
                    <template slot="append">min</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_87')"
                    @click="
                      handleSave3('TP_0X03_87', settingList['TP_0X03_87Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_88')">
                <div style="display: flex">
                  <el-select
                    v-model="settingList['TP_0X03_88Val']"
                    :placeholder="$t('common.selectPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_88')"
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
                    <el-option
                      :label="$t('deviceManage.purePVMode')"
                      value="6"
                    />
                    <el-option
                      :label="$t('deviceManage.forcedOffGridMode')"
                      value="7"
                    />
                  </el-select>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_88')"
                    @click="
                      handleSave3('TP_0X03_88', settingList['TP_0X03_88Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>

              <el-descriptions-item :label="$t('threePhase.TP_0X03_89')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_89Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_89')"
                  >
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_89')"
                    @click="
                      handleSave3('TP_0X03_89', settingList['TP_0X03_89Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_90')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_90Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_90')"
                  >
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_90')"
                    @click="
                      handleSave3('TP_0X03_90', settingList['TP_0X03_90Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_91')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_91Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_91')"
                  >
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_91')"
                    @click="
                      handleSave3('TP_0X03_91', settingList['TP_0X03_91Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
            </el-descriptions>
          </el-card>

          <el-card style="margin-top: 10px">
            <el-descriptions :column="3" border>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_92')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_92Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_92')"
                  >
                    <template slot="append">Month</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_92')"
                    @click="
                      handleSave3('TP_0X03_92', settingList['TP_0X03_92Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_93')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_93Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_93')"
                  >
                    <template slot="append">Month</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_93')"
                    @click="
                      handleSave3('TP_0X03_93', settingList['TP_0X03_93Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_94')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_94Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_94')"
                  >
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_94')"
                    @click="
                      handleSave3('TP_0X03_94', settingList['TP_0X03_94Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_95')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_95Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_95')"
                  >
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_95')"
                    @click="
                      handleSave3('TP_0X03_95', settingList['TP_0X03_95Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>

              <el-descriptions-item :label="$t('threePhase.TP_0X03_96')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_96Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_96')"
                  >
                    <template slot="append">h</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_96')"
                    @click="
                      handleSave3('TP_0X03_96', settingList['TP_0X03_96Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_97')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_97Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_97')"
                  >
                    <template slot="append">min</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_97')"
                    @click="
                      handleSave3('TP_0X03_97', settingList['TP_0X03_97Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_98')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_98Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_98')"
                  >
                    <template slot="append">h</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_98')"
                    @click="
                      handleSave3('TP_0X03_98', settingList['TP_0X03_98Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_99')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_99Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_99')"
                  >
                    <template slot="append">min</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_99')"
                    @click="
                      handleSave3('TP_0X03_99', settingList['TP_0X03_99Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_100')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_100Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_100')"
                  >
                    <template slot="append">h</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_100')"
                    @click="
                      handleSave3('TP_0X03_100', settingList['TP_0X03_100Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_101')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_101Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_101')"
                  >
                    <template slot="append">min</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_101')"
                    @click="
                      handleSave3('TP_0X03_101', settingList['TP_0X03_101Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_102')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_102Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_102')"
                  >
                    <template slot="append">h</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_102')"
                    @click="
                      handleSave3('TP_0X03_102', settingList['TP_0X03_102Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_103')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_103Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_103')"
                  >
                    <template slot="append">min</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_103')"
                    @click="
                      handleSave3('TP_0X03_103', settingList['TP_0X03_103Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_104')">
                <div style="display: flex">
                  <el-select
                    v-model="settingList['TP_0X03_104Val']"
                    :placeholder="$t('common.selectPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_104')"
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
                    <el-option
                      :label="$t('deviceManage.purePVMode')"
                      value="6"
                    />
                    <el-option
                      :label="$t('deviceManage.forcedOffGridMode')"
                      value="7"
                    />
                  </el-select>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_104')"
                    @click="
                      handleSave3('TP_0X03_104', settingList['TP_0X03_104Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_105')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_105Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_105')"
                  >
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_105')"
                    @click="
                      handleSave3('TP_0X03_105', settingList['TP_0X03_105Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_106')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_106Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_106')"
                  >
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_106')"
                    @click="
                      handleSave3('TP_0X03_106', settingList['TP_0X03_106Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_107')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_107Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_107')"
                  >
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_107')"
                    @click="
                      handleSave3('TP_0X03_107', settingList['TP_0X03_107Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
            </el-descriptions>
          </el-card>

          <el-card style="margin-top: 10px">
            <el-descriptions :column="3" border>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_108')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_108Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_108')"
                  >
                    <template slot="append">Month</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_108')"
                    @click="
                      handleSave3('TP_0X03_108', settingList['TP_0X03_108Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_109')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_109Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_109')"
                  >
                    <template slot="append">Month</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_109')"
                    @click="
                      handleSave3('TP_0X03_109', settingList['TP_0X03_109Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_110')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_110Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_110')"
                  >
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_110')"
                    @click="
                      handleSave3('TP_0X03_110', settingList['TP_0X03_110Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_111')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_111Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_111')"
                  >
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_111')"
                    @click="
                      handleSave3('TP_0X03_111', settingList['TP_0X03_111Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>

              <el-descriptions-item :label="$t('threePhase.TP_0X03_112')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_112Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_112')"
                  >
                    <template slot="append">h</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_112')"
                    @click="
                      handleSave3('TP_0X03_112', settingList['TP_0X03_112Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_113')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_113Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_113')"
                  >
                    <template slot="append">min</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_113')"
                    @click="
                      handleSave3('TP_0X03_113', settingList['TP_0X03_113Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_114')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_114Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_114')"
                  >
                    <template slot="append">h</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_114')"
                    @click="
                      handleSave3('TP_0X03_114', settingList['TP_0X03_114Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_115')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_115Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_115')"
                  >
                    <template slot="append">min</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_115')"
                    @click="
                      handleSave3('TP_0X03_115', settingList['TP_0X03_115Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_116')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_116Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_116')"
                  >
                    <template slot="append">h</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_116')"
                    @click="
                      handleSave3('TP_0X03_116', settingList['TP_0X03_116Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_117')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_117Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_117')"
                  >
                    <template slot="append">min</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_117')"
                    @click="
                      handleSave3('TP_0X03_117', settingList['TP_0X03_117Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_118')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_118Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_118')"
                  >
                    <template slot="append">h</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_118')"
                    @click="
                      handleSave3('TP_0X03_118', settingList['TP_0X03_118Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_119')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_119Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_119')"
                  >
                    <template slot="append">min</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_119')"
                    @click="
                      handleSave3('TP_0X03_119', settingList['TP_0X03_119Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_120')">
                <div style="display: flex">
                  <el-select
                    v-model="settingList['TP_0X03_120Val']"
                    :placeholder="$t('common.selectPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_120')"
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
                    <el-option
                      :label="$t('deviceManage.purePVMode')"
                      value="6"
                    />
                    <el-option
                      :label="$t('deviceManage.forcedOffGridMode')"
                      value="7"
                    />
                  </el-select>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_120')"
                    @click="
                      handleSave3('TP_0X03_120', settingList['TP_0X03_120Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_121')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_121Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_121')"
                  >
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_121')"
                    @click="
                      handleSave3('TP_0X03_121', settingList['TP_0X03_121Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_122')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_122Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_122')"
                  >
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_122')"
                    @click="
                      handleSave3('TP_0X03_122', settingList['TP_0X03_122Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_123')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_123Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_123')"
                  >
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_123')"
                    @click="
                      handleSave3('TP_0X03_123', settingList['TP_0X03_123Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
            </el-descriptions>
          </el-card>

          <el-card style="margin-top: 10px">
            <el-descriptions :column="3" border>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_124')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_124Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_124')"
                  >
                    <template slot="append">Month</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_124')"
                    @click="
                      handleSave3('TP_0X03_124', settingList['TP_0X03_124Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_125')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_125Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_125')"
                  >
                    <template slot="append">Month</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_125')"
                    @click="
                      handleSave3('TP_0X03_125', settingList['TP_0X03_125Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_126')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_126Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_126')"
                  >
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_126')"
                    @click="
                      handleSave3('TP_0X03_126', settingList['TP_0X03_126Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_127')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_127Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_127')"
                  >
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_127')"
                    @click="
                      handleSave3('TP_0X03_127', settingList['TP_0X03_127Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>

              <el-descriptions-item :label="$t('threePhase.TP_0X03_128')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_128Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_128')"
                  >
                    <template slot="append">h</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_128')"
                    @click="
                      handleSave3('TP_0X03_128', settingList['TP_0X03_128Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_129')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_129Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_129')"
                  >
                    <template slot="append">min</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_129')"
                    @click="
                      handleSave3('TP_0X03_129', settingList['TP_0X03_129Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_130')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_130Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_130')"
                  >
                    <template slot="append">h</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_130')"
                    @click="
                      handleSave3('TP_0X03_130', settingList['TP_0X03_130Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_131')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_131Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_131')"
                  >
                    <template slot="append">min</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_131')"
                    @click="
                      handleSave3('TP_0X03_131', settingList['TP_0X03_131Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_132')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_132Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_132')"
                  >
                    <template slot="append">h</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_132')"
                    @click="
                      handleSave3('TP_0X03_132', settingList['TP_0X03_132Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_133')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_133Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_133')"
                  >
                    <template slot="append">min</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_133')"
                    @click="
                      handleSave3('TP_0X03_133', settingList['TP_0X03_133Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_134')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_134Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_134')"
                  >
                    <template slot="append">h</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_134')"
                    @click="
                      handleSave3('TP_0X03_134', settingList['TP_0X03_134Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_135')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_135Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_135')"
                  >
                    <template slot="append">min</template>
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_135')"
                    @click="
                      handleSave3('TP_0X03_135', settingList['TP_0X03_135Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_136')">
                <div style="display: flex">
                  <el-select
                    v-model="settingList['TP_0X03_136Val']"
                    :placeholder="$t('common.selectPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_136')"
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
                    <el-option
                      :label="$t('deviceManage.purePVMode')"
                      value="6"
                    />
                    <el-option
                      :label="$t('deviceManage.forcedOffGridMode')"
                      value="7"
                    />
                  </el-select>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_136')"
                    @click="
                      handleSave3('TP_0X03_136', settingList['TP_0X03_136Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_137')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_137Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_137')"
                  >
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_137')"
                    @click="
                      handleSave3('TP_0X03_137', settingList['TP_0X03_137Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_138')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_138Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_138')"
                  >
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_138')"
                    @click="
                      handleSave3('TP_0X03_138', settingList['TP_0X03_138Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_139')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_139Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_139')"
                  >
                  </el-input>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_139')"
                    @click="
                      handleSave3('TP_0X03_139', settingList['TP_0X03_139Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
            </el-descriptions>
          </el-card>

          <el-card style="margin-top: 10px">
            <el-descriptions :column="3" border>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_140')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_140Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_140')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_140')"
                    @click="
                      handleSave3('TP_0X03_140', settingList['TP_0X03_140Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_141')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_141Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_141')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_141')"
                    @click="
                      handleSave3('TP_0X03_141', settingList['TP_0X03_141Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_142')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_142Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_142')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_142')"
                    @click="
                      handleSave3('TP_0X03_142', settingList['TP_0X03_142Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>

              <el-descriptions-item :label="$t('threePhase.TP_0X03_143')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_143Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_143')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_143')"
                    @click="
                      handleSave3('TP_0X03_143', settingList['TP_0X03_143Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_144')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_144Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_144')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_144')"
                    @click="
                      handleSave3('TP_0X03_144', settingList['TP_0X03_144Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_145')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_145Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_145')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_145')"
                    @click="
                      handleSave3('TP_0X03_145', settingList['TP_0X03_145Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_146')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_146Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_146')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_146')"
                    @click="
                      handleSave3('TP_0X03_146', settingList['TP_0X03_146Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_147')">
                <div style="display: flex">
                  <el-select
                    v-model="settingList['TP_0X03_147Val']"
                    :placeholder="$t('common.selectPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_147')"
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
                    <el-option
                      :label="$t('deviceManage.purePVMode')"
                      value="6"
                    />
                    <el-option
                      :label="$t('deviceManage.forcedOffGridMode')"
                      value="7"
                    />
                  </el-select>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_147')"
                    @click="
                      handleSave3('TP_0X03_147', settingList['TP_0X03_147Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_148')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_148Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_148')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_148')"
                    @click="
                      handleSave3('TP_0X03_148', settingList['TP_0X03_148Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
            </el-descriptions>
          </el-card>

          <el-card style="margin-top: 10px">
            <el-descriptions :column="3" border>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_140')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_140Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_140')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_140')"
                    @click="
                      handleSave3('TP_0X03_140', settingList['TP_0X03_140Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_141')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_141Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_141')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_141')"
                    @click="
                      handleSave3('TP_0X03_141', settingList['TP_0X03_141Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_142')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_142Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_142')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_142')"
                    @click="
                      handleSave3('TP_0X03_142', settingList['TP_0X03_142Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>

              <el-descriptions-item :label="$t('threePhase.TP_0X03_143')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_143Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_143')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_143')"
                    @click="
                      handleSave3('TP_0X03_143', settingList['TP_0X03_143Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_144')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_144Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_144')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_144')"
                    @click="
                      handleSave3('TP_0X03_144', settingList['TP_0X03_144Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_145')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_145Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_145')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_145')"
                    @click="
                      handleSave3('TP_0X03_145', settingList['TP_0X03_145Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_146')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_146Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_146')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_146')"
                    @click="
                      handleSave3('TP_0X03_146', settingList['TP_0X03_146Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_147')">
                <div style="display: flex">
                  <el-select
                    v-model="settingList['TP_0X03_147Val']"
                    :placeholder="$t('common.selectPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_147')"
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
                    <el-option
                      :label="$t('deviceManage.purePVMode')"
                      value="6"
                    />
                    <el-option
                      :label="$t('deviceManage.forcedOffGridMode')"
                      value="7"
                    />
                  </el-select>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_147')"
                    @click="
                      handleSave3('TP_0X03_147', settingList['TP_0X03_147Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_148')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_148Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_148')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_148')"
                    @click="
                      handleSave3('TP_0X03_148', settingList['TP_0X03_148Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
            </el-descriptions>
          </el-card>

          <el-card style="margin-top: 10px">
            <el-descriptions :column="3" border>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_149')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_149Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_149')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_149')"
                    @click="
                      handleSave3('TP_0X03_149', settingList['TP_0X03_149Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_150')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_150Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_150')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_150')"
                    @click="
                      handleSave3('TP_0X03_150', settingList['TP_0X03_150Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_151')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_151Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_151')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_151')"
                    @click="
                      handleSave3('TP_0X03_151', settingList['TP_0X03_151Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>

              <el-descriptions-item :label="$t('threePhase.TP_0X03_152')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_152Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_152')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_152')"
                    @click="
                      handleSave3('TP_0X03_152', settingList['TP_0X03_152Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_153')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_153Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_153')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_153')"
                    @click="
                      handleSave3('TP_0X03_153', settingList['TP_0X03_153Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_154')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_154Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_154')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_154')"
                    @click="
                      handleSave3('TP_0X03_154', settingList['TP_0X03_154Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_155')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_155Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_155')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_155')"
                    @click="
                      handleSave3('TP_0X03_155', settingList['TP_0X03_155Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_156')">
                <div style="display: flex">
                  <el-select
                    v-model="settingList['TP_0X03_156Val']"
                    :placeholder="$t('common.selectPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_156')"
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
                    <el-option
                      :label="$t('deviceManage.purePVMode')"
                      value="6"
                    />
                    <el-option
                      :label="$t('deviceManage.forcedOffGridMode')"
                      value="7"
                    />
                  </el-select>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_156')"
                    @click="
                      handleSave3('TP_0X03_156', settingList['TP_0X03_156Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_157')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_157Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_157')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_157')"
                    @click="
                      handleSave3('TP_0X03_157', settingList['TP_0X03_157Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
            </el-descriptions>
          </el-card>

          <el-card style="margin-top: 10px">
            <el-descriptions :column="3" border>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_158')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_158Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_158')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_158')"
                    @click="
                      handleSave3('TP_0X03_158', settingList['TP_0X03_158Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_159')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_159Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_159')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_159')"
                    @click="
                      handleSave3('TP_0X03_159', settingList['TP_0X03_159Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_160')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_160Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_160')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_160')"
                    @click="
                      handleSave3('TP_0X03_160', settingList['TP_0X03_160Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>

              <el-descriptions-item :label="$t('threePhase.TP_0X03_161')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_161Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_161')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_161')"
                    @click="
                      handleSave3('TP_0X03_161', settingList['TP_0X03_161Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_162')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_162Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_162')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_162')"
                    @click="
                      handleSave3('TP_0X03_162', settingList['TP_0X03_162Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_163')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_163Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_163')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_163')"
                    @click="
                      handleSave3('TP_0X03_163', settingList['TP_0X03_163Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_164')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_164Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_164')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_164')"
                    @click="
                      handleSave3('TP_0X03_164', settingList['TP_0X03_164Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_165')">
                <div style="display: flex">
                  <el-select
                    v-model="settingList['TP_0X03_165Val']"
                    :placeholder="$t('common.selectPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_165')"
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
                    <el-option
                      :label="$t('deviceManage.purePVMode')"
                      value="6"
                    />
                    <el-option
                      :label="$t('deviceManage.forcedOffGridMode')"
                      value="7"
                    />
                  </el-select>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_165')"
                    @click="
                      handleSave3('TP_0X03_165', settingList['TP_0X03_165Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_166')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_166Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_166')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_166')"
                    @click="
                      handleSave3('TP_0X03_166', settingList['TP_0X03_166Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
            </el-descriptions>
          </el-card>

          <el-card style="margin-top: 10px">
            <el-descriptions :column="3" border>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_167')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_167Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_167')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_167')"
                    @click="
                      handleSave3('TP_0X03_167', settingList['TP_0X03_167Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_168')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_168Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_168')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_168')"
                    @click="
                      handleSave3('TP_0X03_168', settingList['TP_0X03_168Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_169')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_169Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_169')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_169')"
                    @click="
                      handleSave3('TP_0X03_169', settingList['TP_0X03_169Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>

              <el-descriptions-item :label="$t('threePhase.TP_0X03_170')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_170Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_170')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_170')"
                    @click="
                      handleSave3('TP_0X03_170', settingList['TP_0X03_170Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_171')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_171Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_171')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_171')"
                    @click="
                      handleSave3('TP_0X03_171', settingList['TP_0X03_171Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_172')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_172Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_172')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_172')"
                    @click="
                      handleSave3('TP_0X03_172', settingList['TP_0X03_172Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_173')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_173Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_173')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_173')"
                    @click="
                      handleSave3('TP_0X03_173', settingList['TP_0X03_173Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_174')">
                <div style="display: flex">
                  <el-select
                    v-model="settingList['TP_0X03_174Val']"
                    :placeholder="$t('common.selectPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_174')"
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
                    <el-option
                      :label="$t('deviceManage.purePVMode')"
                      value="6"
                    />
                    <el-option
                      :label="$t('deviceManage.forcedOffGridMode')"
                      value="7"
                    />
                  </el-select>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_174')"
                    @click="
                      handleSave3('TP_0X03_174', settingList['TP_0X03_174Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_175')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_175Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_175')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_175')"
                    @click="
                      handleSave3('TP_0X03_175', settingList['TP_0X03_175Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
            </el-descriptions>
          </el-card>

          <el-card style="margin-top: 10px">
            <el-descriptions :column="3" border>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_176')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_176Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_176')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_176')"
                    @click="
                      handleSave3('TP_0X03_176', settingList['TP_0X03_176Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_177')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_177Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_177')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_177')"
                    @click="
                      handleSave3('TP_0X03_177', settingList['TP_0X03_177Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_178')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_178Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_178')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_178')"
                    @click="
                      handleSave3('TP_0X03_178', settingList['TP_0X03_178Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>

              <el-descriptions-item :label="$t('threePhase.TP_0X03_179')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_179Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_179')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_179')"
                    @click="
                      handleSave3('TP_0X03_179', settingList['TP_0X03_179Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_180')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_180Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_180')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_180')"
                    @click="
                      handleSave3('TP_0X03_180', settingList['TP_0X03_180Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_181')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_181Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_181')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_181')"
                    @click="
                      handleSave3('TP_0X03_181', settingList['TP_0X03_181Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_182')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_182Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_182')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_182')"
                    @click="
                      handleSave3('TP_0X03_182', settingList['TP_0X03_182Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_183')">
                <div style="display: flex">
                  <el-select
                    v-model="settingList['TP_0X03_183Val']"
                    :placeholder="$t('common.selectPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_183')"
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
                    <el-option
                      :label="$t('deviceManage.purePVMode')"
                      value="6"
                    />
                    <el-option
                      :label="$t('deviceManage.forcedOffGridMode')"
                      value="7"
                    />
                  </el-select>
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_183')"
                    @click="
                      handleSave3('TP_0X03_183', settingList['TP_0X03_183Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_184')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_184Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_184')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_184')"
                    @click="
                      handleSave3('TP_0X03_184', settingList['TP_0X03_184Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
            </el-descriptions>
          </el-card>

          <el-card style="margin-top: 10px">
            <el-descriptions :column="3" border>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_185')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_185Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_185')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_185')"
                    @click="
                      handleSave3('TP_0X03_185', settingList['TP_0X03_185Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_186')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_186Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_186')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_186')"
                    @click="
                      handleSave3('TP_0X03_186', settingList['TP_0X03_186Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_187')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_187Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_187')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_187')"
                    @click="
                      handleSave3('TP_0X03_187', settingList['TP_0X03_187Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>

              <el-descriptions-item :label="$t('threePhase.TP_0X03_188')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_188Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_188')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_188')"
                    @click="
                      handleSave3('TP_0X03_188', settingList['TP_0X03_188Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_189')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_189Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_189')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_189')"
                    @click="
                      handleSave3('TP_0X03_189', settingList['TP_0X03_189Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_190')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_190Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_190')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_190')"
                    @click="
                      handleSave3('TP_0X03_190', settingList['TP_0X03_190Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_191')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_191Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_191')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_191')"
                    @click="
                      handleSave3('TP_0X03_191', settingList['TP_0X03_191Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_192')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_192Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_192')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_192')"
                    @click="
                      handleSave3('TP_0X03_192', settingList['TP_0X03_192Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_193')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_193Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_193')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_193')"
                    @click="
                      handleSave3('TP_0X03_193', settingList['TP_0X03_193Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_194')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_194Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_194')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_194')"
                    @click="
                      handleSave3('TP_0X03_194', settingList['TP_0X03_194Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_195')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_195Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_195')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_195')"
                    @click="
                      handleSave3('TP_0X03_195', settingList['TP_0X03_195Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_196')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_196Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_196')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_196')"
                    @click="
                      handleSave3('TP_0X03_196', settingList['TP_0X03_196Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_197')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_197Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_197')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_197')"
                    @click="
                      handleSave3('TP_0X03_197', settingList['TP_0X03_197Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_198')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_198Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_198')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_198')"
                    @click="
                      handleSave3('TP_0X03_198', settingList['TP_0X03_198Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_199')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_199Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_199')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_199')"
                    @click="
                      handleSave3('TP_0X03_199', settingList['TP_0X03_199Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_200')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_200Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_200')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_200')"
                    @click="
                      handleSave3('TP_0X03_200', settingList['TP_0X03_200Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_201')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_201Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_201')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_201')"
                    @click="
                      handleSave3('TP_0X03_201', settingList['TP_0X03_201Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_202')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_202Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_202')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_202')"
                    @click="
                      handleSave3('TP_0X03_202', settingList['TP_0X03_202Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_203')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_203Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_203')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_203')"
                    @click="
                      handleSave3('TP_0X03_203', settingList['TP_0X03_203Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_204')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_204Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_204')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_204')"
                    @click="
                      handleSave3('TP_0X03_204', settingList['TP_0X03_204Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_205')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_205Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_205')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_205')"
                    @click="
                      handleSave3('TP_0X03_205', settingList['TP_0X03_205Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_206')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_206Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_206')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_206')"
                    @click="
                      handleSave3('TP_0X03_206', settingList['TP_0X03_206Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_207')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_207Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_207')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_207')"
                    @click="
                      handleSave3('TP_0X03_207', settingList['TP_0X03_207Val'])
                    "
                    >{{ $t("common.save") }}</el-button
                  >
                </div>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('threePhase.TP_0X03_208')">
                <div style="display: flex">
                  <el-input
                    v-model="settingList['TP_0X03_208Val']"
                    :placeholder="$t('common.inputPrompt')"
                    v-if="CCIsDisplay('49', 'TP_0X03_208')"
                  />
                  <el-button
                    type="text"
                    style="margin-left: 5px"
                    v-if="CCIsSetting('49', 'TP_0X03_208')"
                    @click="
                      handleSave3('TP_0X03_208', settingList['TP_0X03_208Val'])
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
                  $t(
                    'parameterConfiguration.oneCurrentTotalPositiveActiveEnergy'
                  )
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
                  $t(
                    'parameterConfiguration.twoCurrentTotalPositiveActiveEnergy'
                  )
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
                  $t(
                    'parameterConfiguration.oneCurrentTotalReserveActiveEnergy'
                  )
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
                  $t(
                    'parameterConfiguration.twoCurrentTotalReserveActiveEnergy'
                  )
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
                  $t(
                    'parameterConfiguration.fourCurrentTotalReserveActiveEnergy'
                  )
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
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .oneVoltageAVal
                }}V
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('parameterConfiguration.oneVoltageB')"
                v-if="threePhaseMeterParameterIsDisplay('oneVoltageB')"
              >
                {{
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .oneVoltageBVal
                }}V
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('parameterConfiguration.oneVoltageC')"
                v-if="threePhaseMeterParameterIsDisplay('oneVoltageC')"
              >
                {{
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .oneVoltageCVal
                }}V
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('parameterConfiguration.twoVoltageA')"
                v-if="threePhaseMeterParameterIsDisplay('twoVoltageA')"
              >
                {{
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .twoVoltageAVal
                }}V
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('parameterConfiguration.twoVoltageB')"
                v-if="threePhaseMeterParameterIsDisplay('twoVoltageB')"
              >
                {{
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .twoVoltageBVal
                }}V
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('parameterConfiguration.twoVoltageC')"
                v-if="threePhaseMeterParameterIsDisplay('twoVoltageC')"
              >
                {{
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .twoVoltageCVal
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
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .oneCurrentAVal
                }}A
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('parameterConfiguration.oneCurrentB')"
                v-if="threePhaseMeterParameterIsDisplay('oneCurrentB')"
              >
                {{
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .oneCurrentBVal
                }}A
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('parameterConfiguration.oneCurrentC')"
                v-if="threePhaseMeterParameterIsDisplay('oneCurrentC')"
              >
                {{
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .oneCurrentCVal
                }}A
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('parameterConfiguration.twoCurrentA')"
                v-if="threePhaseMeterParameterIsDisplay('twoCurrentA')"
              >
                {{
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .twoCurrentAVal
                }}A
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('parameterConfiguration.twoCurrentB')"
                v-if="threePhaseMeterParameterIsDisplay('twoCurrentB')"
              >
                {{
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .twoCurrentBVal
                }}A
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('parameterConfiguration.twoCurrentC')"
                v-if="threePhaseMeterParameterIsDisplay('twoCurrentC')"
              >
                {{
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .twoCurrentCVal
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
                v-if="
                  threePhaseMeterParameterIsDisplay('threeTotalActivePower')
                "
              >
                {{
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .threeTotalActivePowerVal
                }}kW
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('parameterConfiguration.threeTotalActivePowerA')"
                v-if="
                  threePhaseMeterParameterIsDisplay('threeTotalActivePowerA')
                "
              >
                {{
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .threeTotalActivePowerAVal
                }}kW
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('parameterConfiguration.threeTotalActivePowerB')"
                v-if="
                  threePhaseMeterParameterIsDisplay('threeTotalActivePowerB')
                "
              >
                {{
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .threeTotalActivePowerBVal
                }}kW
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('parameterConfiguration.threeTotalActivePowerC')"
                v-if="
                  threePhaseMeterParameterIsDisplay('threeTotalActivePowerC')
                "
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
                v-if="
                  threePhaseMeterParameterIsDisplay('fourTotalActivePowerA')
                "
              >
                {{
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .fourTotalActivePowerAVal
                }}kW
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('parameterConfiguration.fourTotalActivePowerB')"
                v-if="
                  threePhaseMeterParameterIsDisplay('fourTotalActivePowerB')
                "
              >
                {{
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .fourTotalActivePowerBVal
                }}kW
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('parameterConfiguration.fourTotalActivePowerC')"
                v-if="
                  threePhaseMeterParameterIsDisplay('fourTotalActivePowerC')
                "
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
                v-if="
                  threePhaseMeterParameterIsDisplay('threePowerFactorTotal')
                "
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
                v-if="
                  threePhaseMeterParameterIsDisplay('oneTotalReactivePower')
                "
              >
                {{
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .oneTotalReactivePowerVal
                }}Kvar
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('parameterConfiguration.oneTotalReactivePowerA')"
                v-if="
                  threePhaseMeterParameterIsDisplay('oneTotalReactivePowerA')
                "
              >
                {{
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .oneTotalReactivePowerAVal
                }}Kvar
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('parameterConfiguration.oneTotalReactivePowerB')"
                v-if="
                  threePhaseMeterParameterIsDisplay('oneTotalReactivePowerB')
                "
              >
                {{
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .oneTotalReactivePowerBVal
                }}Kvar
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('parameterConfiguration.oneTotalReactivePowerC')"
                v-if="
                  threePhaseMeterParameterIsDisplay('oneTotalReactivePowerC')
                "
              >
                {{
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .oneTotalReactivePowerCVal
                }}Kvar
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('parameterConfiguration.twoTotalReactivePower')"
                v-if="
                  threePhaseMeterParameterIsDisplay('twoTotalReactivePower')
                "
              >
                {{
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .twoTotalReactivePowerVal
                }}Kvar
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('parameterConfiguration.twoTotalReactivePowerA')"
                v-if="
                  threePhaseMeterParameterIsDisplay('twoTotalReactivePowerA')
                "
              >
                {{
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .twoTotalReactivePowerAVal
                }}Kvar
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('parameterConfiguration.twoTotalReactivePowerB')"
                v-if="
                  threePhaseMeterParameterIsDisplay('twoTotalReactivePowerB')
                "
              >
                {{
                  threePhaseMeterParameter.threePhaseMeterBasicObj
                    .twoTotalReactivePowerBVal
                }}Kvar
              </el-descriptions-item>
              <el-descriptions-item
                :label="$t('parameterConfiguration.twoTotalReactivePowerC')"
                v-if="
                  threePhaseMeterParameterIsDisplay('twoTotalReactivePowerC')
                "
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
                v-if="
                  threePhaseMeterParameterIsDisplay('fourTotalReactivePower')
                "
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
      </div>
    </basic-container>
  </div>
</template>

<script>
import {
  getConfigData,
  savePage47ConfigData,
  savePage48ConfigData,
  savePage49ConfigData,
  batteryUpgrade,
  batterySetCustom,
  updateEnable,
  qryTpConfigDataShow,
} from "@/api/device";

import SelfTest from "./selfTest.vue";
import { baseMqtt } from "@/config/env";
import { mapState } from "vuex";
const mqtt = require("mqtt/dist/mqtt.js");
export default {
  watch: {
    "batteryParameter.batterySetObj.lowTemperatureProtectionDuringChargingVal"(
      newValue
    ) {
      this.formData.lowTemperatureProtectionDuringCharging = newValue;
    },
  },
  components: { SelfTest },
  data() {
    return {
      formData: {},
      deviceInfo: {},
      TP_0X04_0Filter: {
        1: this.$t("threePhase.EAST"), // 将 '1' 映射到 "EAST"
        2: this.$t("threePhase.LESY"), // 将 '2' 映射到 "LESY"
      },
      TP_0X04_8Filter: {
        0: this.$t("threePhase.none"),
        1: this.$t("threePhase.exportHistoricalRecords"),
        2: this.$t("threePhase.exportParamConfigurations"),
        3: this.$t("threePhase.importParamConfigurations"),
        4: this.$t("threePhase.upgradeInverterMonitor"),
        5: this.$t("threePhase.upgradeInverterControl"),
        6: this.$t("threePhase.importFirmware"),
      },
      TP_0X04_14Filter: {
        0: this.$t("threePhase.none"),
        1: this.$t("deviceManage.overvoltageForASection"),
        2: this.$t("deviceManage.secondStageOvervoltage"),
        3: this.$t("deviceManage.oneSectionUnderVoltage"),
        4: this.$t("deviceManage.secondaryUndervoltage"),
        5: this.$t("deviceManage.overfrequencyOfASegment"),
        6: this.$t("deviceManage.secondStageOverfrequency"),
        7: this.$t("deviceManage.oneUnderfrequency"),
        8: this.$t("deviceManage.oneUnderfrequency"),
      },

      devStatusFilter: [
        this.$t("userManage.normal"),
        this.$t("deviceManage.maintenance"),
        this.$t("deviceManage.offline"),
        this.$t("deviceManage.error"),
      ],
      systemModeFilter: {
        0: this.$t("deviceManage.batteryPriorityMode"),
        1: this.$t("deviceManage.homeLoadPriorityMode"),
        2: this.$t("deviceManage.gridPriorityMode"),
        3: this.$t("deviceManage.fullPowerFeedMode"),
        4: this.$t("deviceManage.emergencyBackupMode"),
        5: this.$t("deviceManage.acBackupMode"),
        6: this.$t("deviceManage.purePVMode"),
        7: this.$t("deviceManage.forcedOffGridMode"),
      },
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

      controlSourceFilter: {
        0: this.$t("deviceManage.MCUIssuedControl"),
        1: this.$t("deviceManage.DSPIssuedControl"),
      },
      countryCodeFilter: {
        0: this.$t("deviceManage.China"),
        1: this.$t("deviceManage.Italy"),
        2: this.$t("deviceManage.Germany"),
        3: this.$t("deviceManage.Australia"),
        4: this.$t("deviceManage.Belgium"),
        5: this.$t("deviceManage.SouthAfrica"),
        // this.$t("deviceManage.England"),
        // this.$t("deviceManage.Spain"),
      },
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
      BMSdisplayFilter: {
        0: this.$t("threePhase.BMSdisplay1"),
        1: this.$t("threePhase.BMSdisplay2"),
      },
      chargeFilter: {
        0: this.$t("threePhase.chargeStatenone"),
        1: this.$t("threePhase.chargeState1"),
        2: this.$t("threePhase.chargeState2"),
      },
      errorFilter: {
        0: this.$t("threePhase.normal"),
        1: this.$t("threePhase.error"),
      },
      alarmFilter: {
        0: this.$t("threePhase.normal"),
        1: this.$t("threePhase.alarm"),
      },
      MOSFilter: {
        0: this.$t("threePhase.close"),
        1: this.$t("threePhase.open"),
      },
      fuseFilter: {
        0: this.$t("threePhase.fuseStatus0"),
        1: this.$t("threePhase.fuseStatus1"),
      },
      totalStatusFilter: {
        0: this.$t("threePhase.totalStatus0"),
        1: this.$t("threePhase.totalStatus1"),
        2: this.$t("threePhase.totalStatus2"),
        3: this.$t("threePhase.totalStatus3"),
      },

      BMSFilter: {
        0: this.$t("deviceManage.BMS1"),
        1: this.$t("deviceManage.BMS2"),
      },
      faultStatusFilter: {
        0: this.$t("threePhase.noFault"),
        1: this.$t("threePhase.faultStatus1"),
        2: this.$t("threePhase.faultStatus2"),
      },
      displayFilter: {
        0: this.$t("threePhase.BCUdisplay1"),
        1: this.$t("threePhase.BCUdisplay2"),
      },
      powerOnStageFilter: {
        0: this.$t("threePhase.noStage"),
        1: this.$t("threePhase.powerOnStage1"),
        2: this.$t("threePhase.powerOnStage2"),
        3: this.$t("threePhase.powerOnStage3"),
        4: this.$t("threePhase.powerOnStage4"),
      },
      systemWorkFilter: {
        0: this.$t("threePhase.workState1"),
        1: this.$t("threePhase.workState2"),
        2: this.$t("threePhase.workState3"),
      },
      reasonFilter: {
        0: this.$t("threePhase.noReason"),
        1: this.$t("threePhase.reason1"),
        2: this.$t("threePhase.reason2"),
        3: this.$t("threePhase.reason3"),
      },
      connectFilter: {
        0: this.$t("threePhase.connect1"),
        1: this.$t("threePhase.connect2"),
      },
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
      meterNormalFilter: {
        0: this.$t("deviceManage.meterNormal1"),
        1: this.$t("deviceManage.meterNormal2"),
      },
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
      activeIndex: "41",
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
      settingList: {
        TP_0X03_0Val: "",
        TP_0X03_1Val: "",
        TP_0X03_3Val: "",
        TP_0X03_4Val: "",
        TP_0X03_5Val: "",
        TP_0X03_6Val: "",
        TP_0X03_7Val: "",
        TP_0X03_8Val: "",
        TP_0X03_9Val: "",
        TP_0X03_10Val: "",
        TP_0X03_11Val: "",

        TP_0X03_20_21_22Val: "",
        TP_0X03_26Val: "",
        TP_0X03_27Val: "",
        TP_0X03_28Val: "",
        TP_0X03_31Val: "",
        TP_0X03_32Val: "",
        TP_0X03_33Val: "",
        TP_0X03_41Val: "",
        TP_0X03_44Val: "",
        TP_0X03_45Val: "",
        TP_0X03_46Val: "",
        TP_0X03_47Val: "",

        TP_0X03_53Val: "",
        TP_0X03_54Val: "",
        TP_0X03_55Val: "",
        TP_0X03_56Val: "",
        TP_0X03_57Val: "",
        TP_0X03_58Val: "",

        TP_0X03_71Val: "",
        TP_0X03_72Val: "",

        //page48 主控用户
        TP_0X03_1024Val: "",
        TP_0X03_1025Val: "",
        TP_0X03_1026Val: "",
        TP_0X03_1027Val: "",
        TP_0X03_1028Val: "",
        TP_0X03_1029Val: "",
        TP_0X03_1030Val: "",
        TP_0X03_1031Val: "",
        TP_0X03_1032Val: "",
        TP_0X03_1033Val: "",
        TP_0X03_1034Val: "",
        TP_0X03_1035Val: "",
        TP_0X03_1036Val: "",
        TP_0X03_1037Val: "",
        TP_0X03_1038Val: "",
        TP_0X03_1039Val: "",
        TP_0X03_1040Val: "",
        TP_0X03_1041Val: "",
        TP_0X03_1042Val: "",
        TP_0X03_1043Val: "",
        TP_0X03_1044Val: "",
        TP_0X03_1045Val: "",
        TP_0X03_1046Val: "",
        TP_0X03_1047Val: "",

        TP_0X03_1048Val: "",
        TP_0X03_1049Val: "",
        TP_0X03_1050Val: "",
        TP_0X03_1051Val: "",
        TP_0X03_1052Val: "",
        TP_0X03_1053Val: "",
        TP_0X03_1054Val: "",
        TP_0X03_1055Val: "",
        TP_0X03_1056Val: "",
        TP_0X03_1057Val: "",
        TP_0X03_1058Val: "",
        TP_0X03_1059Val: "",
        TP_0X03_1060Val: "",

        TP_0X03_1061Val: "",
        TP_0X03_1062Val: "",
        TP_0X03_1063Val: "",
        TP_0X03_1064Val: "",
        TP_0X03_1065Val: "",
        TP_0X03_1066Val: "",
        TP_0X03_1067Val: "",
        TP_0X03_1068Val: "",
        TP_0X03_1069Val: "",
        TP_0X03_1070Val: "",
        TP_0X03_1071Val: "",
        TP_0X03_1072Val: "",
        TP_0X03_1073Val: "",
        TP_0X03_1074Val: "",
        TP_0X03_1075Val: "",
        TP_0X03_1076Val: "",
        TP_0X03_1077Val: "",
        TP_0X03_1078Val: "",
        TP_0X03_1079Val: "",
        TP_0X03_1080Val: "",

        TP_0X03_1081Val: "",
        TP_0X03_1082Val: "",
        TP_0X03_1083Val: "",
        TP_0X03_1084Val: "",
        TP_0X03_1085Val: "",
        TP_0X03_1086Val: "",
        TP_0X03_1087Val: "",
        TP_0X03_1088Val: "",
        TP_0X03_1089Val: "",
        TP_0X03_1090Val: "",

        TP_0X03_1091Val: "",
        TP_0X03_1092Val: "",
        TP_0X03_1093Val: "",
        TP_0X03_1094Val: "",
        TP_0X03_1095Val: "",
        TP_0X03_1096Val: "",
        TP_0X03_1097Val: "",
        TP_0X03_1098Val: "",
        TP_0X03_1099Val: "",
        TP_0X03_1100Val: "",

        TP_0X03_76Val: "",
        TP_0X03_77Val: "",
        TP_0X03_78Val: "",
        TP_0X03_79Val: "",
        TP_0X03_80Val: "",
        TP_0X03_81Val: "",
        TP_0X03_82Val: "",
        TP_0X03_83Val: "",
        TP_0X03_84Val: "",
        TP_0X03_85Val: "",
        TP_0X03_86Val: "",
        TP_0X03_87Val: "",
        TP_0X03_88Val: "",
        TP_0X03_89Val: "",
        TP_0X03_90Val: "",
        TP_0X03_91Val: "",
        TP_0X03_92Val: "",
        TP_0X03_93Val: "",
        TP_0X03_94Val: "",
        TP_0X03_95Val: "",
        TP_0X03_96Val: "",
        TP_0X03_97Val: "",
        TP_0X03_98Val: "",
        TP_0X03_99Val: "",
        TP_0X03_100Val: "",
        TP_0X03_101Val: "",
        TP_0X03_102Val: "",
        TP_0X03_103Val: "",
        TP_0X03_104Val: "",
        TP_0X03_105Val: "",
        TP_0X03_106Val: "",
        TP_0X03_107Val: "",
        TP_0X03_108Val: "",
        TP_0X03_109Val: "",
        TP_0X03_110Val: "",
        TP_0X03_111Val: "",
        TP_0X03_112Val: "",
        TP_0X03_113Val: "",
        TP_0X03_114Val: "",
        TP_0X03_115Val: "",
        TP_0X03_116Val: "",
        TP_0X03_117Val: "",
        TP_0X03_118Val: "",
        TP_0X03_119Val: "",
        TP_0X03_120Val: "",

        TP_0X03_121Val: "",
        TP_0X03_122Val: "",
        TP_0X03_123Val: "",
        TP_0X03_124Val: "",
        TP_0X03_125Val: "",
        TP_0X03_126Val: "",
        TP_0X03_127Val: "",
        TP_0X03_128Val: "",
        TP_0X03_129Val: "",
        TP_0X03_130Val: "",

        TP_0X03_131Val: "",
        TP_0X03_132Val: "",
        TP_0X03_133Val: "",
        TP_0X03_134Val: "",
        TP_0X03_135Val: "",
        TP_0X03_136Val: "",
        TP_0X03_137Val: "",
        TP_0X03_138Val: "",
        TP_0X03_139Val: "",
        TP_0X03_140Val: "",
        TP_0X03_141Val: "",
        TP_0X03_142Val: "",
        TP_0X03_143Val: "",
        TP_0X03_144Val: "",
        TP_0X03_145Val: "",
        TP_0X03_146Val: "",
        TP_0X03_147Val: "",
        TP_0X03_148Val: "",
        TP_0X03_149Val: "",
        TP_0X03_150Val: "",
        TP_0X03_151Val: "",
        TP_0X03_152Val: "",
        TP_0X03_153Val: "",
        TP_0X03_154Val: "",
        TP_0X03_155Val: "",
        TP_0X03_156Val: "",
        TP_0X03_157Val: "",
        TP_0X03_158Val: "",
        TP_0X03_159Val: "",
        TP_0X03_160Val: "",
        TP_0X03_161Val: "",
        TP_0X03_162Val: "",
        TP_0X03_163Val: "",
        TP_0X03_164Val: "",
        TP_0X03_165Val: "",
        TP_0X03_166Val: "",
        TP_0X03_167Val: "",
        TP_0X03_168Val: "",
        TP_0X03_169Val: "",
        TP_0X03_170Val: "",

        TP_0X03_171Val: "",
        TP_0X03_172Val: "",
        TP_0X03_173Val: "",
        TP_0X03_174Val: "",
        TP_0X03_175Val: "",
        TP_0X03_176Val: "",
        TP_0X03_177Val: "",
        TP_0X03_178Val: "",
        TP_0X03_179Val: "",
        TP_0X03_180Val: "",

        TP_0X03_181Val: "",
        TP_0X03_182Val: "",
        TP_0X03_183Val: "",
        TP_0X03_184Val: "",
        TP_0X03_185Val: "",
        TP_0X03_186Val: "",
        TP_0X03_187Val: "",
        TP_0X03_188Val: "",
        TP_0X03_189Val: "",
        TP_0X03_190Val: "",
        TP_0X03_191Val: "",
        TP_0X03_192Val: "",
        TP_0X03_193Val: "",
        TP_0X03_194Val: "",
        TP_0X03_195Val: "",
        TP_0X03_196Val: "",
        TP_0X03_197Val: "",
        TP_0X03_198Val: "",
        TP_0X03_199Val: "",
        TP_0X03_200Val: "",

        TP_0X03_201Val: "",
        TP_0X03_202Val: "",
        TP_0X03_203Val: "",
        TP_0X03_204Val: "",
        TP_0X03_205Val: "",
        TP_0X03_206Val: "",
        TP_0X03_207Val: "",
        TP_0X03_208Val: "",
      },
      voListMap: {},
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

    saveConfigSettings1(sendData) {
      console.log("Sending config data to backend: ", sendData);

      savePage47ConfigData(sendData)
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

    handleSave1(key, val) {
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
      } else {
        // For other settings
        const sendData = {
          deviceId: this.deviceInfo.id,
          paramSetList: [{ dataVal: val, key: key }],
        };
        this.saveConfigSettings1(sendData);
      }
    },
    handleSave2(key, val) {
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
      } else {
        // For other settings
        const sendData = {
          deviceId: this.deviceInfo.id,
          paramSetList: [{ dataVal: val, key: key }],
        };
        this.saveConfigSettings2(sendData);
      }
    },
    saveConfigSettings2(sendData) {
      console.log("Sending config data to backend: ", sendData);

      savePage48ConfigData(sendData)
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

    handleSave3(key, val) {
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
      } else {
        // For other settings
        const sendData = {
          deviceId: this.deviceInfo.id,
          paramSetList: [{ dataVal: val, key: key }],
        };
        this.saveConfigSettings3(sendData);
      }
    },
    saveConfigSettings3(sendData) {
      console.log("Sending config data to backend: ", sendData);

      savePage49ConfigData(sendData)
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
      console.log(this.deviceInfo);
      if (this.deviceInfo.onlineStatus === 1) {
        this.handleMqttInit();
      } else {
        this.$message.info("设备不在线");
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
            if (messageInfo.msgOperation === 5) {
              console.log("dataList", JSON.parse(messageInfo.val));
              console.log("MessageInfo:", messageInfo);
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

    //page41~49所有配置显示与否
    CCIsDisplay(pageType, key) {
      let role = this.userInfo.roles[0];
      const isShowValue = this.voListMap[pageType][key].isShow;
      const installerIsShowValue =
        this.voListMap[pageType][key].installerIsShow;
      const consumerIsShowValue = this.voListMap[pageType][key].consumerIsShow;
      // 根据角色不同，构造要检查的属性名

      if (role == "1") {
        if (isShowValue) {
          return true;
        } else {
          return false;
        }
      } else if (role == "2") {
        if (installerIsShowValue) {
          return true;
        } else {
          return false;
        }
      } else if (role == "3") {
        if (consumerIsShowValue) {
          return true;
        } else {
          return false;
        }
      }

      // 如果无法确定要检查的属性名，则默认返回true
      if (!isShowValue) {
        return true;
      }
    },

    //设置量---v-if保存按钮专用

    CCIsSetting(pageType, key) {
      let role = this.userInfo.roles[0];
      const IsSet = this.voListMap[pageType][key].canSet;
      const installerIsSet = this.voListMap[pageType][key].installerCanSet;
      const consumerIsSet = this.voListMap[pageType][key].consumerCanSet;
      // 根据角色不同，构造要检查的属性名

      if (role == "1") {
        if (IsSet) {
          return true;
        } else {
          return false;
        }
      } else if (role == "2") {
        if (installerIsSet) {
          return true;
        } else {
          return false;
        }
      } else if (role == "3") {
        if (consumerIsSet) {
          return true;
        } else {
          return false;
        }
      }

      // 如果无法确定要检查的属性名，则默认返回true
      if (!IsSet) {
        return true;
      }
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
      return true;
    },
    // 数据处理转换
    paramsChange(res) {
      console.log(res, "res------");
      console.log(Array.isArray(res), "res是数组吗"); //false
      console.log("res类型是：", typeof res); //object
      console.log(res.pageType, "res.pageType值");

      if (res.pageType && res.voList) {
        //Clear voListMap for the current pageType
        this.clearVoListMap(res.pageType);

        this.voListMap[res.pageType] = {};

        console.log("这个voList的类型是：", typeof this.voList);
        console.log(`page ${res.pageType} 的 this.voList是`, this.voList);

        res.voList.forEach((item) => {
          const key = `${item.key}Val`;
          if (this.settingList.hasOwnProperty(key)) {
            this.$set(this.settingList, key, item.val);
          }

          this.$set(this.voListMap[res.pageType], item.key, {
            val: item.val,
            isShow: item.isShow,
            installerIsShow: item.installerIsShow,
            consumerIsShow: item.consumerIsShow,
            canSet: item.canSet,
            installerCanSet: item.installerCanSet,
            consumerCanSet: item.consumerCanSet,
            unit: item.unit,
          });

          // this.$set(this.voListMap, item.key, item.val);

          // //添加其他属性到this.voListMap
          // this.$set(this.voListMap, `${item.key}isShow`, item.isShow);
          // this.$set(
          //   this.voListMap,
          //   `${item.key}installerIsShow`,
          //   item.installerIsShow
          // );
          // this.$set(
          //   this.voListMap,
          //   `${item.key}consumerIsShow`,
          //   item.consumerIsShow
          // );
          // this.$set(this.voListMap, `${item.key}unit`, item.unit);

          // this.voListMap[res.pageType].push(item);
        });
        console.log("this.voListMap:里面是啥呢？", this.voListMap);
        console.log("this.settingList:里面是什么？", this.settingList);
      }
    },

    clearVoListMap(pageType) {
      if (this.voListMap[pageType]) {
        delete this.voListMap[pageType];
      }
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
