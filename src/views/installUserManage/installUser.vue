<template>
  <div class="app-container calendar-list-container">
    <basic-container>
      <div class="header-search">
        <div class="lside">
          <el-form :inline="true">
            <el-form-item :label="$t('installUser.enterpriseName')">
              <el-input
                v-model="listQuery.name"
                :placeholder="$t('common.inputPrompt')"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('installUser.contactPerson')">
              <el-input
                v-model="listQuery.contacts"
                :placeholder="$t('common.inputPrompt')"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getData(true)">{{
                $t("common.search")
              }}</el-button>
              <el-button type="primary" @click="handleReset()">{{
                $t("common.reset")
              }}</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="rside">
          <el-button
            type="primary"
            plain
            @click="handleForm()"
            v-if="permissions.admin_lsyinstaller_add"
            >{{ $t("common.add") }}</el-button
          >
        </div>
      </div>

      <div class="avue-crud">
        <el-table border :data="dataList" fit v-loading="listLoading">
          <el-table-column
            align="center"
            prop="name"
            :label="$t('installUser.enterpriseName')"
          />
          <el-table-column
            align="center"
            prop="contacts"
            :label="$t('installUser.contactPerson')"
          />
          <!-- <el-table-column align="center" prop="roleName" :label="$t('userManage.role')" width="120"/> -->
          <el-table-column
            align="center"
            :label="$t('userManage.role')"
            width="100"
          >
            <template slot-scope="scope">
              {{ getRoleName(scope.row.roleId) }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="mail"
            :label="$t('installUser.email')"
          />
          <el-table-column
            align="center"
            prop="authCode"
            :label="$t('installUser.authorizationCode')"
          />
          <el-table-column
            align="center"
            prop="installerUserName"
            :label="$t('installUser.installerUserName')"
          />
          <el-table-column
            align="center"
            :label="$t('common.createTime')"
            width="160"
          >
            <template slot-scope="scope">
              {{ scope.row.createTime | parseTime }}
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('common.operate')"
            align="center"
            width="120"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="handleForm(scope.row)"
                v-if="permissions.admin_lsyinstaller_edit"
                >{{ $t("common.edit") }}</el-button
              >
              <el-button
                type="text"
                style="color: red"
                @click="handleDel(scope.row.id)"
                v-if="permissions.admin_lsyinstaller_del"
                >{{ $t("common.delete") }}</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="table-pagination">
        <el-pagination
          @size-change="sizeChangeHandle"
          @current-change="currentChangeHandle"
          :current-page="listQuery.current"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="listQuery.size"
          :total="total"
          background
          layout="total, sizes, prev, pager, next, jumper"
        />
      </div>

      <InstallUserForm ref="installUserForm" @back="getData" />
    </basic-container>
  </div>
</template>
<script>
import { qryInstallUser, delInstallUser } from "@/api/installUser";
import InstallUserForm from "./components/installUserForm.vue";
import { mapGetters } from "vuex";
export default {
  components: { InstallUserForm },
  data() {
    return {
      // 列表信息
      listLoading: false,
      dataList: [],
      total: 0,
      listQuery: {
        current: 1,
        size: 10,
      },
    };
  },
  computed: {
    ...mapGetters(["permissions"]),
  },
  created() {
    this.getData();
  },
  methods: {
    getRoleName(roleId) {
      switch (roleId) {
        case "1":
          return this.$t("common.admin");
        case "2":
          return this.$t("common.installer");
        case "3":
          return this.$t("common.user");
        case "4":
          return this.$t("common.dealer");
        case "5":
          return this.$t("common.distributor");
        default:
          return this.$("common.unknown");
      }
    },
    getData(state) {
      this.listLoading = true;
      state && (this.listQuery.current = 1);
      qryInstallUser(this.listQuery)
        .then((res) => {
          this.dataList = res.records;
          this.total = res.total;
        })
        .finally(() => {
          this.listLoading = false;
        });
    },
    // 新增
    handleForm(info) {
      this.$nextTick(() => {
        this.$refs.installUserForm.init(info);
      });
    },
    // 删除
    handleDel(id) {
      this.$confirm(this.$t("common.sureDelete"), this.$t("common.prompt"), {
        confirmButtonText: this.$t("common.confirm"),
        cancelButtonText: this.$t("common.cancel"),
        type: "warning",
      }).then(() => {
        delInstallUser({ id }).then(() => {
          this.getData();
          this.$message.success(this.$t("common.successfullyDeleted"));
        });
      });
    },
    // 每页数
    sizeChangeHandle(val) {
      this.listQuery.size = val;
      this.getData(true);
    },
    // 当前页
    currentChangeHandle(val) {
      this.listQuery.current = val;
      this.getData();
    },
    // 重置
    handleReset() {
      this.listQuery = {
        current: 1,
        size: 10,
      };
      this.getData();
    },
  },
};
</script>

<style lang="scss" scoped></style>
