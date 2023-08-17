<template>
  <el-dialog
    title="设备信息"
    :close-on-click-modal="false"
    :visible.sync="visible"
    :destroy-on-close="true"
    width="600px"
  >
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" label-width="110px">
      <el-form-item label="等级" prop="grade">
        <el-radio-group v-model="dataForm.grade">
          <el-radio :label="0">国家</el-radio>
          <el-radio :label="1">地区</el-radio>
          <el-radio :label="2">居住地</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="国家" prop="countryId" v-if="dataForm.grade !== 0">
        <el-select v-model="dataForm.countryId" placeholder="请选择" @change="getRegion">
          <el-option v-for="item in countryList" :key="item.id" :label="item.countryName" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="国家" prop="regionId" v-if="dataForm.grade === 2">
        <el-select v-model="dataForm.regionId" placeholder="请选择">
          <el-option v-for="item in regionList" :key="item.id" :label="item.regionName" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="国家" prop="countryName" v-if="dataForm.grade === 0">
        <el-input v-model="dataForm.countryName" maxlength="20" placeholder="请输入国家名称" />
      </el-form-item>
      <el-form-item label="地区" prop="regionName" v-else-if="dataForm.grade === 1">
        <el-input v-model="dataForm.regionName" maxlength="20" placeholder="请输入地区名称" />
      </el-form-item>
      <el-form-item label="居住地" prop="residenceName" v-else-if="dataForm.grade === 2">
        <el-input v-model="dataForm.residenceName" maxlength="20" placeholder="请输入居住地名称" />
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addAddress, editAddress, qryAddress } from "@/api/address";
export default {
  data() {
    return {
      visible: false,
      loadingState: false,
      dataForm: {},
      dataRule: {
        countryName: [{ required: true, message: "请输入国家名称", trigger: "blur" }],
        regionName: [{ required: true, message: "请输入地区名称", trigger: "blur" }],
        residenceName: [{ required: true, message: "请输入居住地名称", trigger: "blur" }],
        countryId: [{ required: true, message: "请选择国家", trigger: "blur" }],
        regionId: [{ required: true, message: "请选择地区", trigger: "blur" }]
      },
      countryList: [],
      regionList: []
    };
  },
  created() {
    qryAddress({ parentId: 0, size: 999 }).then(res => {
      this.countryList = res.records
    })
  },
  methods: {
    init(info) {
      this.dataForm = {
        grade: 0,
        parentId: 0,
        countryId: '',
        regionId: '',
        countryName: null,
        regionName: null,
        residenceName: null
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
    getRegion(e) {
      this.dataForm.regionId = ''
      qryAddress({ parentId: e, size: 999 }).then(res => {
        this.regionList = res.records
      })
    },
    handleSubmit() {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          this.loadingState = true;
          if (this.dataForm.grade === 0) {
            this.dataForm.parentId = 0
          } else if (this.dataForm.grade === 1) {
            this.dataForm.parentId = this.dataForm.countryId
          } else if (this.dataForm.grade === 2) {
            this.dataForm.parentId = this.dataForm.regionId
          }
          if (this.dataForm.id) {
            editAddress(this.dataForm).then((res) => {
              this.$message.success(this.$t('common.successfulModification'));
              this.visible = false
              this.$emit("back");
            }).finally(() => {
              this.loadingState = false;
            });
          } else {
            addAddress(this.dataForm).then((res) => {
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