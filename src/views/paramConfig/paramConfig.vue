<template>
  <div class="container">
    <template>
      <!-- 运行信息 -->
      <el-card>
        <div slot="header">
          <span>{{ $t("parameterConfiguration.runInformation") }}</span>
          <el-switch
            style="margin-left: 10px"
            v-model="info.dataList[0].isShow"
            :active-value="1"
            :inactive-value="0"
            @change="changeFirstInfo(0)"
          />
          <el-button
            style="float: right; margin-top: -10px"
            type="primary"
            @click="handleSave"
            >{{ $t("common.save") }}</el-button
          >
        </div>
        <el-card
          v-for="(item, index) in info.dataList[0].dataList"
          style="margin-top: 10px"
        >
          <div slot="header">
            <span>{{
              $t(
                "parameterConfiguration." + info.dataList[0].dataList[index].key
              )
            }}</span>
            <el-switch
              style="margin-left: 10px"
              :active-value="1"
              :inactive-value="0"
              v-model="info.dataList[0].dataList[index].isShow"
              @change="changeSecondInfo(0, index)"
            />
          </div>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>{{ $t("parameterConfiguration.webStatus") }}</th>
                <th>{{ $t("parameterConfiguration.installerStatus") }}</th>
                <th>{{ $t("parameterConfiguration.consumerStatus") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item2, index2) in info.dataList[0].dataList[index]
                  .dataList"
              >
                <td>
                  {{
                    $t(
                      "parameterConfiguration." +
                        info.dataList[0].dataList[index].dataList[index2].key
                    )
                  }}
                </td>
                <td>
                  <el-switch
                    :active-value="1"
                    :inactive-value="0"
                    v-model="
                      info.dataList[0].dataList[index].dataList[index2].isShow
                    "
                  />
                </td>
                <td>
                  <el-switch
                    :active-value="1"
                    :inactive-value="0"
                    v-model="
                      info.dataList[0].dataList[index].dataList[index2]
                        .installerIsShow
                    "
                  />
                </td>
                <td>
                  <el-switch
                    :active-value="1"
                    :inactive-value="0"
                    v-model="
                      info.dataList[0].dataList[index].dataList[index2]
                        .consumerIsShow
                    "
                  />
                </td>
              </tr>
            </tbody>
          </table>
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
</style>
