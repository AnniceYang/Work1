<template>
  <div>
    <el-dialog
        :title="!dataForm.id ? '新增字典项' : '修改字典项'"
        :close-on-click-modal="false"
        :visible.sync="visible"
        append-to-body
        width="50%">
        <el-form :model="dataForm" :rules="dataRule" ref="dataForm" label-width="130px">
          <el-form-item label="编号" prop="code">
            <el-input v-model="dataForm.code" maxlength="100" placeholder="请输入编号"></el-input>
          </el-form-item>
          <el-form-item label="标签名" prop="label">
            <el-input v-model="dataForm.label" maxlength="100" placeholder="请输入标签名"></el-input>
          </el-form-item>
          <el-form-item label="数据值" prop="value">
            <el-input v-model="dataForm.value" maxlength="100" placeholder="请输入数据值"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="dataForm.description" maxlength="100" placeholder="请输入描述"></el-input>
          </el-form-item>
           <el-form-item label="排序" prop="sort">
            <el-input v-model="dataForm.sort" type="Number" placeholder="请输入备注"></el-input>
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
import { addDictItem, editDictItem } from '@/api/admin/dict'
export default {
  name: '',
  data () {
    return {
      // 表单信息
      visible: false,
      storageList:[],
      dataForm: {},
      dataRule: {
        code: [{ required: true, message: '请输入编号', trigger: 'blur' }],
        label: [{ required: true, message: '请输入标签名', trigger: 'blur' }],
        value: [{ required: true, message: '请输入数据值', trigger: 'blur' }],
        sort: [{ required: true, message: '请输入排序', trigger: 'blur' }],
      },
      submitLoading: false
    }
  },
  created () {
  },
  methods: {
    init(info) {
      this.dataForm = {
        code: "",
        description: "",
        dictId: info.dictId,
        label: "",
        remarks: "",
        sort: 0,
        value: ""
      }
      if (info.id) {
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
            editDictItem(this.dataForm).then(res => {
              this.$message.success(this.$t('common.successfulModification'))
              this.visible = false
              this.$emit('back')
            }).finally(() => {
              this.submitLoading = false
            })
          } else {
            addDictItem(this.dataForm).then(res => {
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
