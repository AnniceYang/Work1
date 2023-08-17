<template>
  <el-dialog
    title="设备型号信息"
    :close-on-click-modal="false"
    :visible.sync="visible"
    :destroy-on-close="true"
    width="600px"
  >
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" label-width="110px">
      <el-form-item label="型号名称" prop="name">
        <el-input v-model="dataForm.name" placeholder="请输入型号名称" />
      </el-form-item>
      <el-form-item label="总储能" prop="energyStorage">
        <el-input v-model="dataForm.energyStorage" type="Number" placeholder="请输入总储能" />
      </el-form-item>
      <el-form-item label="PV功率" prop="pvPower">
        <el-input v-model="dataForm.pvPower" type="Number" placeholder="请输入PV功率">
          <template slot="append">W</template>
        </el-input>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addDeviceType, editDeviceType } from "@/api/deviceType";
export default {
  data() {
    return {
      visible: false,
      loadingState: false,
      dataForm: {},
      dataRule: {
        name: [{ required: true, message: "请输入型号名称", trigger: "blur" }],
        energyStorage: [{ required: true, message: "请输入总储能", trigger: "blur" }],
        pvPower: [{ required: true, message: "请输入PV功率", trigger: "blur" }]
      }
    };
  },
  methods: {
    init(info) {
      this.dataForm = {
        name: null,
        energyStorage: null,
        pvPower: null
      };
      if (info) {
        for (const key in info) {
          this.dataForm[key] = info[key];
        }
        this.dataForm.id = info.id;
      }
      this.visible = true
      this.$nextTick(() => {
        this.$refs.dataForm.clearValidate()
      });
    },
    handleSubmit() {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          this.loadingState = true;
          if (this.dataForm.id) {
            editDeviceType(this.dataForm).then((res) => {
              this.$message.success(this.$t('common.successfulModification'));
              this.visible = false
              this.$emit("back");
            }).finally(() => {
              this.loadingState = false;
            });
          } else {
            addDeviceType(this.dataForm).then((res) => {
              this.$message.success(this.$t('common.addedSuccessfully'));
              this.visible = false
              this.$emit("back");
            }).finally(() => {
              this.loadingState = false;
            });
          }
        }
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.btn {
  display: flex;
  justify-content: center;
}
</style>