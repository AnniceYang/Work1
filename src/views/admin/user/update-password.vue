<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @@Company: ZZCYI
 * @Author: liu
 * @Date: 2021-04-06 09:29:34
 * @LastEditors: liu
 * @LastEditTime: 2021-04-06 09:47:50
 * @Update Descripttion: 
-->
<template>
  <el-dialog
    title="重置密码"
    :visible.sync="visible"
    :append-to-body="true"
  >
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit()"
      label-width="80px"
    >
      <el-form-item
        label="账号"
        v-if="userInfo"
      >
        <span>{{ userInfo.username }}</span>
      </el-form-item>
      <el-form-item
        label="新密码"
        prop="password"
      >
        <el-input
          type="password"
          v-model="dataForm.password"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="确认密码"
        prop="confirmPassword"
      >
        <el-input
          type="password"
          v-model="dataForm.confirmPassword"
        ></el-input>
      </el-form-item>
    </el-form>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="visible = false">取消</el-button>
      <el-button
        type="primary"
        @click="dataFormSubmit()"
      >确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { editResetPassword } from '@/api/admin/user'

export default {
  data () {
    var validateConfirmPassword = (rule, value, callback) => {
      if (this.dataForm.password !== value) {
        callback(new Error('确认密码与新密码不一致'))
      } else {
        callback()
      }
    }
    return {
      visible: false,
      userInfo: null,
      dataForm: {
        userId: null,
        password: '',
        confirmPassword: ''
      },
      dataRule: {
        password: [
          { required: true, message: '新密码不能为空', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '确认密码不能为空', trigger: 'blur' },
          { validator: validateConfirmPassword, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 初始化
    init (row) {
      this.userInfo = row
      this.dataForm.userId = row.userId
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
      })
    },
    // 表单提交
    dataFormSubmit () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          editResetPassword(this.dataForm).then(res => {
            if (res && Number(res.data.code) === 0) {
              this.$message({
                message: this.$t('common.resetSuccessful'),
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.visible = false
                }
              })
            } else {
              this.$message({
                message: data.msg,
                type: 'error',
                duration: 1500
              })
            }

          })

        }
      })
    }
  }
}
</script>

