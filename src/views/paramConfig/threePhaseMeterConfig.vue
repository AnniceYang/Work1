<template>
  <!-- 容器 -->
  <div class="container">
    <el-card>
      <!-- 保存按钮 -->
      <el-button
        style="float: right; margin-top: -10px"
        type="primary"
        @click="handleSave"
      >
        {{ $t("common.save") }}
      </el-button>
      <!-- 表格 -->
      <div class="table-container" style="margin-top: 35px">
        <!-- 表头 -->
        <div class="line">
          <div class="item1"></div>
          <div class="item">{{ $t("parameterConfiguration.webView") }}</div>
          <div class="item">
            {{ $t("parameterConfiguration.installerView") }}
          </div>
          <div class="item">
            {{ $t("parameterConfiguration.consumerView") }}
          </div>
        </div>
        <!-- 数据行 -->
        <div v-for="(item, index) in info.voList" :key="index">
          <div class="line">
            <div class="item1">
              {{ $t("parameterConfiguration." + item.key) }}
            </div>
            <div class="item">
              <el-switch
                :active-value="1"
                :inactive-value="0"
                v-model="item.isShow"
              />
            </div>
            <div class="item">
              <el-switch
                :active-value="1"
                :inactive-value="0"
                v-model="item.installerIsShow"
              />
            </div>
            <div class="item">
              <el-switch
                :active-value="1"
                :inactive-value="0"
                v-model="item.consumerIsShow"
              />
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { qryTpConfigDataShow, TpConfigModify } from "@/api/device";

export default {
  name: "",
  data() {
    return {
      info: {}, // 初始化数据为空对象
    };
  },
  created() {
    // 在组件创建时获取数据
    qryTpConfigDataShow({ pageType: 43 }).then((res) => {
      this.info = res; // 将获取到的数据存入组件的 info 属性中
      console.log("查询", res);
    });
  },
  methods: {
    // 保存数据的方法
    handleSave() {
      console.log(this.info);
      const requestData = {
        pageType: 43,
        voList: this.info.voList,
      };
      TpConfigModify(requestData).then((res) => {
        this.$message.success("保存成功");
        qryTpConfigDataShow({ pageType: 43 }).then((res) => {
          this.info.res;
        });
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
