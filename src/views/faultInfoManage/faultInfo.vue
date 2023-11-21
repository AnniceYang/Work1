<template>
  <div class="app-container calendar-list-container">
    
    <basic-container>
      <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1" v-show="permissions.admin_lsyinfo_show">{{$t('faultInfo.faultInformation')}}</el-menu-item>
        <el-menu-item index="2">{{$t('faultInfo.faultAlarm')}}</el-menu-item>
      </el-menu>

      <div v-show="activeIndex === '1'" style="margin-top: 20px;">
        <div class="header-search">
          <div class="lside">
            <el-form :inline="true">
              <el-form-item :label="$t('faultInfo.faultCode')">
                <el-input v-model="listQuery.code" :placeholder="$t('common.inputPrompt')"></el-input>
              </el-form-item>
              <el-form-item :label="$t('faultInfo.faultLevel')">
                <el-select v-model="listQuery.level" :placeholder="$t('common.selectPrompt')">
                  <el-option :label="$t('faultInfo.oneLevel')" :value="1"></el-option>
                  <el-option :label="$t('faultInfo.twoLevel')" :value="2"></el-option>
                  <el-option :label="$t('faultInfo.threeLevel')" :value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item :label="$t('faultInfo.faultInformation')">
                <el-input v-model="listQuery.content" :placeholder="$t('common.inputPrompt')"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="getData(true)">{{$t('common.search')}}</el-button>
                <el-button type="primary" @click="handleReset()">{{$t('common.reset')}}</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="rside">
            <el-button type="primary" plain @click="handleAddorEdit()" v-if="permissions.admin_lsyfault_add">{{$t('common.add')}}</el-button>
          </div>
        </div>
        <div class="avue-crud">
          <el-table :data="dataList" border fit v-loading="listLoading">
            <el-table-column align="center" :label="$t('faultInfo.faultLevel')" prop="level" width="110">
              <template slot-scope="scope">
                {{ faultLevelFilter[scope.row.level - 1] }}
              </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('faultInfo.displayOrNot')" prop="level" width="120">
              <template slot-scope="scope">
                <el-tag type="success" v-if="scope.row.installerDisplay === 1">{{$t('faultInfo.display')}}</el-tag>
                <el-tag type="info" v-else-if="scope.row.installerDisplay === 0">{{$t('faultInfo.hide')}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('faultInfo.faultCode')" prop="code" width="110"/>
            <el-table-column align="center" :label="$t('faultInfo.faultInformation')" prop="content" />
            <el-table-column align="center" :label="$t('faultInfo.possibleCauses')" prop="possibleCauses" />
            <el-table-column align="center" :label="$t('faultInfo.solutionMeasures')" width="150">
              <template slot-scope="scope">
                <el-popover placement="top" width="375" trigger="hover">
                  <div>
                    <span v-html="scope.row.solutions"></span>
                  </div>
                  <el-link :underline="false" type="primary" slot="reference">{{$t('common.view')}}</el-link>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('common.createTime')" width="160">
              <template slot-scope="scope">
                {{ scope.row.createTime | parseTime }}
              </template>
            </el-table-column>
            <el-table-column :label="$t('common.operate')" align="center" width="100">
              <template slot-scope="scope">
                <el-button type="text" @click="handleAddorEdit(scope.row)" v-if="permissions.admin_lsyfault_edit">{{$t('common.edit')}}</el-button>
                <el-button type="text" style="color: red;" @click="handleDel(scope.row.id)" v-if="permissions.admin_lsyfault_del">{{$t('common.delete')}}</el-button>
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
      </div>

      <div v-show="activeIndex === '2'" style="margin-top: 20px;">
        <PoliceList ref="policeList" />
      </div>

    </basic-container>

    <FaultInfoForm ref="faultInfoForm" @back="getData" />
  </div>
</template>
<script>
import { qryFaultInfo, delFaultInfo } from '@/api/faultInfo'
import { mapGetters } from "vuex"
import FaultInfoForm from './components/faultInfoForm.vue'
import PoliceList from './policeList.vue'
export default {
  components: { FaultInfoForm, PoliceList },
  data () {
    return {
      activeIndex: '1',
      // 列表信息
      listLoading: false,
      dataList: [],
      total: 0,
      listQuery: {
        current: 1,
        size: 10
      },
      faultLevelFilter: [this.$t('faultInfo.oneLevel'),this.$t('faultInfo.twoLevel'),this.$t('faultInfo.threeLevel')]
    }
  },
  computed: {
    ...mapGetters(["permissions"]),
  },
  created () {
    this.getData()
  },
  mounted(){
    this.activeIndex = this.permissions.admin_lsyinfo_show ? '1' : '2'
    // conosle.log(this.permissions.admin_lsyinfo_show)
  },
  methods: {
    handleSelect(index) {
      this.activeIndex = index
    },
    getData(state) {
      this.listLoading = true
      state && (this.listQuery.current = 1)
      qryFaultInfo(this.listQuery).then(res => {
        this.dataList = res.records
        this.total = res.total
      }).finally(() => {
        this.listLoading = false
      })
    },
    // 删除
    handleDel(id) {
      this.$confirm(this.$t('common.sureDelete'), this.$t('common.prompt'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        delFaultInfo({ id }).then(() => {
          this.getData()
          this.$message.success(this.$t('common.successfullyDeleted'))
        })
      })
    },
    // 添加 or 编辑
    handleAddorEdit(info) {
      this.$refs.faultInfoForm.init(info)
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
        size: 10
      }
      this.getData(true)
    }
  }
}
</script>

<style lang='scss'>
  .wscnph {
    width: 100%;
  }

</style>
