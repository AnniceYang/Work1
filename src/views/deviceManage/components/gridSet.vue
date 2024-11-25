<template>
  <el-dialog
    :title="$t('deviceManage.gridSettingsAus')"
    :visible.sync="isVisible"
    width="500px"
    class="grid-settings-dialog"
  >
    <el-form :model="form" label-width="120px">
      <el-form-item :label="$t('deviceManage.powerGrid')">
        <el-select
          v-model="form.selectedGrid"
          :placeholder="$t('common.selectPrompt')"
        >
          <el-option
            v-for="grid in gridList"
            :key="grid.id"
            :label="grid.name"
            :value="grid.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('deviceManage.nmi')">
        <el-input v-model="form.nmi" :placeholder="$t('common.inputPrompt')" />
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">{{ $t("common.cancel") }}</el-button>
      <el-button type="primary" @click="saveSettings">
        {{ $t("common.save") }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { listPowerGrid, saveGridNMI, qryPowerGrid } from "@/api/device";

export default {
  name: "GridSet",
  props: {
    selectedRow: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isVisible: false, // 控制弹窗显示
      form: {
        selectedGrid: null,
        nmi: "",
      },
      gridList: [], // 存储从接口获取的电网公司数据
    };
  },
  methods: {
    // 初始化方法，传入父组件的 sn
    init(sn) {
      console.log("Initializing GridSet SN: ", sn);

      this.sn = sn;

      // 显示弹窗
      this.isVisible = true;

      // 获取电网公司列表
      this.loadPowerGridList();

      this.loadGridInfo();
    },

    // 获取电网公司列表
    loadPowerGridList() {
      listPowerGrid()
        .then((response) => {
          if (response) {
            // 将返回的电网公司名称数组转化为对象数组
            this.gridList = response.map((grid) => ({
              id: grid, // 使用电网名称作为唯一ID
              name: grid, // 电网名称
            }));
            console.log("Grid list loaded:", this.gridList);
          } else {
            console.error("电网公司数据加载失败:", response.msg);
          }
        })
        .catch((error) => {
          console.error("获取电网公司列表失败:", error);
        });
    },

    // 通过 SN 查询电网信息
    loadGridInfo() {
      qryPowerGrid({ sn: this.sn })
        .then((response) => {
          if (response) {
            // 更新表单数据
            this.form.selectedGrid = response.powerGrid || null;
            this.form.nmi = response.nmi || "";
            console.log("Loaded grid info:", response);
          } else {
            console.error("电网信息查询失败:", response.msg);
          }
        })
        .catch((error) => {
          console.error("获取电网信息失败:", error);
        });
    },

    closeDialog() {
      this.isVisible = false;
    },

    // 保存设置
    saveSettings() {
      console.log("Saving GridSet settings:", this.form);

      // 确保选择了电网公司和 NMI
      if (!this.form.selectedGrid || !this.form.nmi) {
        this.$message.error(this.$t("common.inputInvalid"));
        return;
      }

      const sn = this.sn;
      const powerGrid = this.form.selectedGrid;
      const nmi = this.form.nmi;

      saveGridNMI({ sn, powerGrid, nmi })
        .then(() => {
          this.$message.success(this.$t("common.savesuccessfully"));
          this.closeDialog();
        })
        .catch((error) => {
          console.error("保存电网设置失败:", error);
          this.$message.error(this.$t("common.savefailed"));
        });
    },
  },
};
</script>

<style scoped>
.grid-settings-dialog {
  text-align: center;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
