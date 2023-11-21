<template>
  <div class="app-container calendar-list-container">
    <basic-container>
      <div class="header-search">
        <div class="lside">
          <el-form :inline="true">
           <el-form-item :label="$t('versionManage.type')">
              <el-select v-model="listQuery.appType" :placeholder="$t('common.selectPrompt')">
                <el-option :label="$t('versionManage.android')" :value="0" />
                <el-option :label="$t('versionManage.ios')" :value="1" />
                <el-option :label="$t('versionManage.networkConnectingBoard')" :value="2" />
                <el-option :label="$t('versionManage.inverterMCU')" :value="3" />
                <el-option :label="$t('versionManage.inverterDSP')" :value="4" />
                <el-option :label="$t('versionManage.battery')" :value="5" />
                <el-option :label="$t('versionManage.IIcb')" :value="6" />
                <el-option :label="$t('versionManage.IIdb')" :value="7" />
                <el-option :label="$t('versionManage.IIbattery')" :value="8" />
              </el-select>
            </el-form-item>
             <el-form-item :label="$t('versionManage.version')">
              <el-input v-model="listQuery.versionCode" clearable :placeholder="$t('common.inputPrompt')"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getData(true)">{{ $t('common.search') }}</el-button>
              <el-button type="primary" @click="handleReset()">{{ $t('common.reset') }}</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="rside">
          <el-button type="primary" @click="handleAddOrEdit()">{{ $t('common.add') }}</el-button>
        </div>
      </div>
      <div class="avue-crud" >
        <el-table :data="dataList" border fit v-loading="listLoading">
          <el-table-column :label="$t('versionManage.type')" align="center" width="200">
            <template slot-scope="scope">
              <span>{{ appTypeFilter[scope.row.appType] }}</span>
              <span v-if="scope.row.appType < 2">-{{ scope.row.appItem === 1 ? $t('common.user') : $t('common.distributor') }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('versionManage.download')" align="center" prop="adminComFileInfosVo.filePath" min-width="150" />
          <el-table-column :label="$t('versionManage.version')" align="center" prop="versionCode"  width="200" />
          <el-table-column :label="$t('versionManage.versionName')" align="center" prop="versionName" width="200"  />
          <el-table-column :label="$t('versionManage.notes')" align="center" prop="remarks" width="200"  />
          <el-table-column :label="$t('common.createTime')" align="center" width="200" >
            <template slot-scope="scope">
              <span>{{ scope.row.createTime | parseTime }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('common.operate')" align="center" width="200">
            <template slot-scope="scope">
              <el-button type="text" style="color:red" icon="el-icon-delete" @click="handleDel(scope.row.id)">{{ $t('common.delete') }}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="avue-crud__pagination">
        <el-pagination
          @size-change="sizeChangeHandle"
          @current-change="currentChangeHandle"
          :current-page="listQuery.current"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="listQuery.size"
          :total="total"
          background
          layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
      </div>
      <el-dialog
        :title="$t('common.add')"
        :close-on-click-modal="false"
        :visible.sync="visible"
        :destroy-on-close="true"
        width="50%">
        <el-form :model="dataForm" :rules="dataRule" ref="dataForm" label-width="130px">
          <el-form-item :label="$t('versionManage.type')">
            <el-radio v-model="dataForm.appType" :label="0">{{$t('versionManage.android')}}</el-radio>
            <el-radio v-model="dataForm.appType" :label="1">{{$t('versionManage.ios')}}</el-radio>
            <el-radio v-model="dataForm.appType" :label="2">{{$t('versionManage.networkConnectingBoard')}}</el-radio>
            <el-radio v-model="dataForm.appType" :label="3">{{$t('versionManage.inverterMCU')}}</el-radio>
            <el-radio v-model="dataForm.appType" :label="4">{{$t('versionManage.inverterDSP')}}</el-radio>
            <el-radio v-model="dataForm.appType" :label="5">{{$t('versionManage.battery')}}</el-radio>
            <el-radio v-model="dataForm.appType" :label="6">{{$t('versionManage.IIcb')}}</el-radio>
            <el-radio v-model="dataForm.appType" :label="7">{{$t('versionManage.IIdb')}}</el-radio>
            <el-radio v-model="dataForm.appType" :label="8">{{$t('versionManage.IIbattery')}}</el-radio>
          </el-form-item>
          <el-form-item :label="$t('versionManage.appType')" v-if="dataForm.appType < 2">
            <el-radio v-model="dataForm.appItem" :label="1">{{$t('common.user')}}</el-radio>
            <el-radio v-model="dataForm.appItem" :label="0">{{$t('common.distributor')}}</el-radio>
          </el-form-item>
          <el-form-item :label="$t('versionManage.file')" prop="adminComFileInfosAddDto.fileId">
            <el-upload
              class="upload-demo"
              drag
              :headers="header"
              :action="baseUrl + '/admin/file/info/upload/file'"
              :on-success="handleAvatarSuccess"
              :accept="dataForm.appType === 0 ? '.apk' : (dataForm.appType === 1 ?'.ipa' : '')"
              >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">{{ $t('versionManage.upload1') }} <em>{{ $t('versionManage.upload2') }}</em></div>
            </el-upload>
            <span style="display: none;">{{ dataForm.fileId }}</span>
          </el-form-item>
          <el-form-item :label="$t('versionManage.version')" prop="versionCode">
            <el-input v-model="dataForm.versionCode" type="Number"></el-input>
          </el-form-item>
          <el-form-item :label="$t('versionManage.versionName')" prop="versionName">
            <el-input v-model="dataForm.versionName" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item :label="$t('versionManage.notes')" >
            <el-input v-model="dataForm.remarks" maxlength="50"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="visible = false">{{$t('common.cancel')}}</el-button>
          <el-button type="primary" @click="dataFormSubmit()">{{$t('common.confirm')}}</el-button>
        </span>
      </el-dialog>
    </basic-container>
  </div>
</template>
<script>
import { getVersioninfo, AddVersioninfo, delVersioninfo } from '@/api/common/versionUpgrade'
import store from '@/store'
export default {
  name: 'BannerClassify',
  data () {
    return {
      // 列表信息
      listLoading: false,
      dataList: [],
      total: 0,
      listQuery: {
        current: 1,
        size: 10,
      },
      header: { Authorization: 'Bearer ' + store.getters.access_token },
      // 表单信息
      visible: false,
      storageList:[],
      dataForm: {},
      dataRule: {
        'adminComFileInfosAddDto.fileId': [{ required: true, message: this.$t('versionManage.validateFile'), trigger: 'blur' }],
        versionCode: [{ required: true, message: this.$t('versionManage.validateCode'), trigger: 'blur' }],
        versionName: [{ required: true, message: this.$t('versionManage.validateName'), trigger: 'blur' }]
      },
      cabinetId:null,
      appTypeFilter: [this.$t('versionManage.android'),this.$t('versionManage.ios'),this.$t('versionManage.networkConnectingBoard'),
      this.$t('versionManage.inverterMCU'),this.$t('versionManage.inverterDSP'),this.$t('versionManage.battery'),
      this.$t('versionManage.IIcb'), this.$t('versionManage.IIdb'), this.$t('versionManage.IIbattery')],
    }
  },
  created () {
    this.getData()
  },
  methods: {
    //获取柜子
    getData(state) {
      this.listLoading = true
      state && (this.listQuery.current = 1)
      getVersioninfo(this.listQuery).then(res => {
        this.dataList = res.records
        this.total = Number(res.total)
      }).finally(() => {
        this.listLoading = false
      })
    },
    // 删除
    handleDel(id) {
      this.$confirm(this.$t('versionManage.sureDelete'), this.$t('common.prompt'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        delVersioninfo({ id }).then(() => {
          this.getData()
          this.$message.success(this.$t('common.delete'))
        })
      })
    },
    // 新增
    handleAddOrEdit() {
      this.dataForm = {
        adminComFileInfosAddDto:{
          fileId:null,
          filePath:null
        },
        appType:0,
        appItem: 1,
        compulsoryUp: 1,
        planUpType: 0,
        upType: 1,
        upUrlType: 0,
        versionCode:null,
        versionName: '',
        remarks: ''
      }
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    //上传文件
    handleAvatarSuccess(res, file){
      console.log(res)
      if (res.code === 1) {
        this.$message.error(res.msg || '上传失败')
        return
      }
      this.dataForm.adminComFileInfosAddDto.fileId=res.data.fileId
      this.dataForm.adminComFileInfosAddDto.filePath=res.data.filePath
    },
    // 表单提交
    dataFormSubmit() {
      console.log(this.dataForm)
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if (this.dataForm.id) {
            EditBoxtype(this.dataForm).then(res => {
              this.$message.success(this.$t('common.successfulModification'))
              this.visible = false
              this.getData()
            })
          } else {
            AddVersioninfo(this.dataForm).then(res => {
              this.$message.success(this.$t('common.addedSuccessfully'))
              this.visible = false
              this.getData()
            })
          }
        }
      })
    },
     // 每页数
    sizeChangeHandle(val) {
      this.listQuery.size = val
      this.getData(true)
    },
    // 当前页
    currentChangeHandle(val) {
      this.listQuery.current = val
      this.getData()
    },
    // 重置
    handleReset() {
      this.listQuery = {
        current: 1,
        size: 10,
        monitorName:null,
      }
      this.getData(true)
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
