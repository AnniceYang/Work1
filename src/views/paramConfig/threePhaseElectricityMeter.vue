<template>
    <div class="container">
      <template>
        <!-- 运行信息 -->
        <el-card>
          <div slot="header">
            <span>{{ $t("parameterConfiguration.threePhaseMeterBasic") }}</span>
            <el-switch
              style="margin-left: 10px"
              v-model="info.dataList[3].isShow"
              :active-value="1"
              :inactive-value="0"
              @change="changeFirstInfo(3)"
            />
            <el-button
              style="float: right; margin-top: -10px"
              type="primary"
              @click="handleSave"
              >{{ $t("common.save") }}</el-button
            >
          </div>
          <el-card
            v-for="(item, index) in info.dataList[3].dataList"
            style="margin-top: 10px"
          >
            <div slot="header">
              <span>{{
                $t(
                  "parameterConfiguration." + info.dataList[3].dataList[index].key
                )
              }}</span>
              <el-switch
                style="margin-left: 10px"
                :active-value="1"
                :inactive-value="0"
                v-model="info.dataList[3].dataList[index].isShow"
                @change="changeSecondInfo(3, index)"
              />
            </div>
            <div>
              <div class="line">
                <div class="item1"></div>
                <div class="item">
                  {{ $t("parameterConfiguration.webView") }}
                </div>
                <div class="item">
                  {{ $t("parameterConfiguration.installerView") }}
                </div>
                <div class="item">
                  {{ $t("parameterConfiguration.consumerView") }}
                </div>
              </div>
              <div
                class="line"
                v-for="(item2, index2) in info.dataList[3].dataList[index]
                  .dataList"
              >
                <div class="item1">
                  {{
                    $t(
                      "parameterConfiguration." +
                        info.dataList[3].dataList[index].dataList[index2].key
                    )
                  }}
                </div>
                <div class="item">
                  <el-switch
                    :active-value="1"
                    :inactive-value="0"
                    v-model="
                      info.dataList[3].dataList[index].dataList[index2].isShow
                    "
                  />
                </div>
                <div class="item">
                  <el-switch
                    :active-value="1"
                    :inactive-value="0"
                    v-model="
                      info.dataList[3].dataList[index].dataList[index2]
                        .installerIsShow
                    "
                  />
                </div>
                <div class="item">
                  <el-switch
                    :active-value="1"
                    :inactive-value="0"
                    v-model="
                      info.dataList[3].dataList[index].dataList[index2]
                        .consumerIsShow
                    "
                  />
                </div>
              </div>
            </div>
          </el-card>
        </el-card>
      </template>
    </div>
  </template>
  <script>
  import { qryConfigDataShow, saveConfigDataShow } from "@/api/device";
  export default {
    name: "",
    data() {
      return {
        info: {},
      };
    },
    created() {
      qryConfigDataShow().then((res) => {
        this.info = res;
        console.log("查询", res);
      });
    },
    methods: {
      handleSave() {
        console.log(this.info);
        saveConfigDataShow(this.info).then((res) => {
          this.$message.success("保存成功");
        });
      },
      changeFirstInfo(index) {
        let item = this.info.dataList[index];
        let value = item.isShow;
        item.dataList.map((i) => {
          i.isShow = value;
          i.dataList.map((i2) => {
            for (let key in i2) {
              if (key !== "key" && key !== "unit" && key !== "val") {
                i2[key] = value;
              }
            }
          });
        });
      },
      changeSecondInfo(firstIndex, secondIndex) {
        let currentItem = this.info.dataList[firstIndex].dataList[secondIndex];
        let value = currentItem.isShow;
        currentItem.dataList.map((item) => {
          for (let key in item) {
            if (key !== "key" && key !== "unit" && key !== "val") {
              item[key] = value;
            }
          }
        });
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .container {
    padding: 0 10px;
  }
  .line {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
  }
  .item1 {
    width: 55%;
    border: 1px solid #eeeeee;
    margin-right: 1px;
    margin-top: 1px;
    text-align: center;
  }
  .item {
    width: 15%;
    border: 1px solid #eeeeee;
    margin-right: 1px;
    margin-top: 1px;
    text-align: center;
  }
  </style>
  