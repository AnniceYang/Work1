<template>
  <el-dialog
    title="帮助添加/编辑"
    :close-on-click-modal="false"
    :visible.sync="visible"
    :destroy-on-close="true"
    width="900px"
  >
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      label-width="100px"
    >
      <el-form-item
        label="问题"
        prop="problem"
      >
        <el-input
          v-model="dataForm.problem"
          type="textarea"
          :rows="2"
          maxlength="50"
          placeholder="请输入"
        />
      </el-form-item>
      <el-form-item
        label="回答"
        prop="answer"
      >
        <el-input
          v-model="dataForm.answer"
          type="textarea"
          :rows="3"
          maxlength="200"
          placeholder="请输入"
        />
      </el-form-item>
    </el-form>

    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="visible = false">取消</el-button>
      <el-button
        type="primary"
        @click="handleSubmit()"
      >确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addHelp, editHelp } from '@/api/help'
export default {
  data () {
    return {
      visible: false,
      dataForm: {},
      dataRule: {
        problem: [{ required: true, message: "请输入问题", trigger: "blur" }],
        answer: [{ required: true, message: "请输入回答", trigger: "blur" }],
      },
    }
  },
  methods: {
    init (info) {
      this.dataForm = {
        problem: '',
        answer: ''
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
    handleSubmit () {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          if (this.dataForm.id) {
            editHelp(this.dataForm).then((res) => {
              this.$message.success(this.$t('common.successfulModification'));
              this.visible = false
              this.$emit('back')
            })
          } else {
            addHelp(this.dataForm).then((res) => {
              this.$message.success(this.$t('common.addedSuccessfully'))
              this.visible = false
              this.$emit('back')
            })
          }
        }
      })
    }
  }
}
</script>

<style>
</style>