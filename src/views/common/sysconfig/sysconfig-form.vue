<template>
  <el-dialog
    :title="!dataForm.id ? $t('common.add') : $t('common.edit')"
    :close-on-click-modal="false"
    :visible.sync="visible"
    :destroy-on-close="true"
    :before-close="handleClose"
    width="900px"
  >
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit()"
      label-width="120px"
    >
      <el-form-item :label="$t('common.name')" prop="name">
        <el-input v-model="dataForm.name"></el-input>
      </el-form-item>
      <el-form-item :label="$t('logManage.attributeCode')" prop="code">
        <el-input v-model="dataForm.code" :disabled="dataForm.id ? true : false"></el-input>
      </el-form-item>
      <el-form-item :label="$t('logManage.inputType')" size="mini">
        <el-radio-group v-model="inputType">
          <el-radio :label="0">{{ $t('logManage.text') }}</el-radio>
          <el-radio :label="1">{{ $t('logManage.multilineText') }}</el-radio>
          <el-radio :label="2">{{ $t('logManage.richText') }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="inputType===0||inputType===1" :label="$t('logManage.attributeValueC')" prop="value">
        <el-input
          v-model="dataForm.value"
          :type="inputType===0?'text':'textarea'"
          :rows="2"
          autosize
        ></el-input>
      </el-form-item>
      <el-form-item v-else :label="$t('logManage.attributeValueC')" prop="value">
        <div>
          <tinymce ref="paramValue" :height="200" v-model="dataForm.value"/>
        </div>
      </el-form-item>

      <el-form-item v-if="inputType===0||inputType===1" :label="$t('logManage.attributeValueE')" prop="valueEn">
        <el-input
          v-model="dataForm.valueEn"
          :type="inputType===0?'text':'textarea'"
          :rows="2"
          autosize
        ></el-input>
      </el-form-item>
      <el-form-item v-else :label="$t('logManage.attributeValueE')" prop="valueEn">
        <div>
          <tinymce ref="paramValueEn" :height="200" v-model="dataForm.valueEn"/>
        </div>
      </el-form-item>
      <!-- <el-form-item label="属性值" prop="value">
        <el-input v-model="dataForm.value"   type="textarea"
                  :rows="4" placeholder="属性值"></el-input>
      </el-form-item> -->
      <!-- <el-form-item label="备注" prop="remark">
      <el-input v-model="dataForm.remark"   type="textarea"
                :rows="4" placeholder="备注"></el-input>
    </el-form-item> -->
    </el-form>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="handleClose()">{{$t('common.cancel')}}</el-button>
      <el-button
        type="primary"
        @click="dataFormSubmit()"
      >{{$t('common.confirm')}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getObj, addObj, putObj } from '@/api/common/sysconfig'
import Tinymce from '@/components/Tinymce'
export default {
  components: { Tinymce },
  data () {
    return {
      inputType: 2,
      visible: false,
      noUse: true,
      dataForm: {
        id: '',
        name: '',
        code: '',
        dictFlag: '',
        dictTypeId: '',
        value: '',
        valueEn: '',
        remark: '',
        createBy: '',
        createTime: '',
        updateBy: '',
        updateTime: ''
      },
      dataRule: {
        name: [
          { required: true, message: this.$t('logManage.validateName'), trigger: 'blur' }
        ],
        code: [
          { required: true, message: this.$t('logManage.validateCode'), trigger: 'blur' }
        ],
        value: [
          { required: true, message: this.$t('logManage.validateValue'), trigger: 'blur' }
        ],
        valueEn: [{ required: true, message: this.$t('logManage.validateValue'), trigger: 'blur' }]
      }
    }
  },
  methods: {
    init (info) {
      console.log('info', info)
      this.inputType = 2
      this.dataForm = {
        code: null,
        id: null,
        name: null,
        remark: null,
        value: null,
        valueEn: null
      }
      if (info) {
        this.dataForm = {
          code: info.code,
          id: info.id,
          name: info.name,
          remark: info.remark,
          value: info.value,
          valueEn: info.valueEn
        }
        if (['PRIVACY_POLICY', 'ABOUT_US', 'USER_AGREEMENT'].indexOf(this.dataForm.code) > -1) {
          this.inputType = 2
          this.$nextTick(() => {
            this.$refs.paramValue.setContent(this.dataForm.value)
            this.$refs.paramValueEn.setContent(this.dataForm.valueEn)
          })
        }
      }
      this.visible = true
    },
    // 表单提交
    dataFormSubmit () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if (this.dataForm.id) {
            putObj(this.dataForm).then(data => {
              this.$message.success(this.$t('common.successfulModification'))
              this.visible = false
              this.$emit('refreshDataList')
            });
          } else {
            addObj(this.dataForm).then(data => {
              this.$message.success(this.$t('common.addedSuccessfully'))
              this.visible = false
              this.$emit('refreshDataList')
            })
          }
        }
      })
    },
    handleClose() {
      this.inputType = 0
      this.dataForm = {
        code: null,
        id: null,
        name: null,
        remark: null,
        value: null
      }
      this.visible = false
    }
  }
}
</script>
