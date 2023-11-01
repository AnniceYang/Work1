<template>
  <div class="container">
    <template>
      <!-- 运行信息 -->
      <el-card>
        <div slot="header">
          <span>{{ $t("parameterConfiguration.systemSet") }}</span>
          <el-switch
            style="margin-left: 10px"
            v-model="info.dataList[1].isShow"
            :active-value="1"
            :inactive-value="0"
            @change="changeFirstInfo(1)"
          />
          <el-button
            style="float: right; margin-top: -10px"
            type="primary"
            @click="handleSave"
            >{{ $t("common.save") }}</el-button
          >
        </div>
        <el-card
          v-for="(item, index) in info.dataList[1].dataList"
          style="margin-top: 10px"
        >
          <div slot="header">
            <span>{{
              $t(
                "parameterConfiguration." + info.dataList[1].dataList[index].key
              )
            }}</span>
            <el-switch
              style="margin-left: 10px"
              :active-value="1"
              :inactive-value="0"
              v-model="info.dataList[1].dataList[index].isShow"
              @change="changeSecondInfo(1, index)"
            />
          </div>
          <div>
            <div class="line">
              <div class="item1"></div>
              <div class="item">
                {{ $t("parameterConfiguration.webView") }}
              </div>
              <div class="item">
                {{ $t("parameterConfiguration.webSet") }}
              </div>
              <div class="item">
                {{ $t("parameterConfiguration.installerView") }}
              </div>
              <div class="item">
                {{ $t("parameterConfiguration.installerSet") }}
              </div>
              <div class="item">
                {{ $t("parameterConfiguration.consumerView") }}
              </div>
              <div class="item">
                {{ $t("parameterConfiguration.consumerSet") }}
              </div>
            </div>
            <div
              class="line"
              v-for="(item2, index2) in info.dataList[1].dataList[index]
                .dataList"
            >
              <div class="item1">
                {{
                  $t(
                    "parameterConfiguration." +
                      info.dataList[1].dataList[index].dataList[index2].key
                  )
                }}
              </div>
              <div class="item">
                <el-switch
                  :active-value="1"
                  :inactive-value="0"
                  @change="adminChange(index,index2)"
                  v-model="
                    info.dataList[1].dataList[index].dataList[index2].isShow
                  "
                />
              </div>
              <div class="item">
                <el-switch
                  :active-value="1"
                  :inactive-value="0"
                  v-model="
                    info.dataList[1].dataList[index].dataList[index2].canSet
                  "
                />
              </div>
              <div class="item">
                <el-switch
                  :active-value="1"
                  :inactive-value="0"
                  @change="installerChange(index,index2)"
                  v-model="
                    info.dataList[1].dataList[index].dataList[index2]
                      .installerIsShow
                  "
                />
              </div>
              <div class="item">
                <el-switch
                  :active-value="1"
                  :inactive-value="0"
                  v-model="
                    info.dataList[1].dataList[index].dataList[index2]
                      .installerCanSet
                  "
                />
              </div>
              <div class="item">
                <el-switch
                  :active-value="1"
                  :inactive-value="0"
                  @change="consumerChange(index,index2)"
                  v-model="
                    info.dataList[1].dataList[index].dataList[index2]
                      .consumerIsShow
                  "
                />
              </div>
              <div class="item">
                <el-switch
                  :active-value="1"
                  :inactive-value="0"
                  v-model="
                    info.dataList[1].dataList[index].dataList[index2]
                      .consumerCanSet
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
import { info2 } from './config.js'
// import FileSaver from "file-saver";
import fs from 'fs'
// const fs = require('fs')
export default {
  name: "",
  data() {
    return {
      info: {},
      info2,
    };
  },
  created() {
    qryConfigDataShow().then((res) => {
      this.info = res;
      console.log("查询", res);
    //   let content = {a:'wangyue'}
    //   let blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    //   FileSaver.saveAs(blob, "./open.js");
        console.log('fs-----',fs)
    //   fs.writeFile("./1.js",res,function(err){
    //       if(err){
    //           return console.log('文件写入失败！'+err.message)
    //       }
    //       console.log('文件写入成功！')
    //   })
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
    adminChange(index,index2){
      this.info.dataList[1].dataList[index].dataList[index2].canSet = this.info.dataList[1].dataList[index].dataList[index2].isShow
    },
    installerChange(index,index2){
      this.info.dataList[1].dataList[index].dataList[index2].installerCanSet = this.info.dataList[1].dataList[index].dataList[index2].installerIsShow
    },
    consumerChange(index,index2){
      this.info.dataList[1].dataList[index].dataList[index2].consumerCanSet = this.info.dataList[1].dataList[index].dataList[index2].consumerIsShow
    }
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
