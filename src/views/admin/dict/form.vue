<template>
  <div>
    <el-dialog
        :title="!dataForm.id ? '新增字典' : '修改字典'"
        :close-on-click-modal="false"
        :visible.sync="visible"
        width="50%">
        <el-form :model="dataForm" :rules="dataRule" ref="dataForm" label-width="130px">
          <el-form-item label="字典类型" prop="type">
            <el-input v-model="dataForm.type" maxlength="10" placeholder="请输入字典类型"></el-input>
          </el-form-item>
          <el-form-item label="系统内置" prop="system">
            <el-radio v-model="dataForm.system" :label="1">系统</el-radio>
            <el-radio v-model="dataForm.system" :label="0">业务</el-radio>
          </el-form-item>
          <el-form-item label="字典描述" >
            <el-input v-model="dataForm.description" maxlength="100" placeholder="请输入字典描述"></el-input>
          </el-form-item>
          <el-form-item label="字典备注" >
            <el-input v-model="dataForm.remarks" maxlength="255" placeholder="请输入字典备注"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="visible = false">取消</el-button>
          <el-button :loading="submitLoading" type="primary" @click="dataFormSubmit()">确定</el-button>
        </span>
      </el-dialog>
  </div>
</template>
<script>
import { addDict, editDict } from '@/api/admin/dict'
export default {
  name: '',
  data () {
    return {
      // 表单信息
      visible: false,
      storageList:[],
      dataForm: {},
      dataRule: {
        type: [{ required: true, message: '请输入字典类型', trigger: 'blur' }],
        system: [{ required: true, message: '请选择', trigger: 'blur' }]
      },
      submitLoading: false
    }
  },
  created () {
  },
  methods: {
    init(info) {
      this.dataForm = {
        description: "",
        remarks: "",
        system: 1,
        type: ""
      }
      if (info) {
        for (const key in this.dataForm) {
          this.dataForm[key] = info[key]
        }
        this.dataForm.id = info.id
      }
      this.visible = true
      this.$nextTick(() => {
        this.$refs.dataForm.clearValidate()
      })
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.submitLoading = true
          if (this.dataForm.id) {
            editDict(this.dataForm).then(res => {
              this.$message.success(this.$t('common.successfulModification'))
              this.visible = false
              this.$emit('back')
            }).finally(() => {
              this.submitLoading = false
            })
          } else {
            addDict(this.dataForm).then(res => {
              this.$message.success(this.$t('common.addedSuccessfully'))
              this.visible = false
              this.$emit('back')
            }).finally(() => {
              this.submitLoading = false
            })
          }
        }
      })
    },
  }
}
</script>

<style lang='scss' scoped>

</style>
