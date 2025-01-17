<template>
  <div class="app-container calendar-list-container">
    <basic-container>
      <div class="header-search">
        <div class="lside">
          <el-form :inline="true">
            <el-form-item :label="$t('common.loginAccount')">
              <el-input
                v-model="listQuery.username"
                :placeholder="$t('common.inputPrompt')"
              ></el-input>
            </el-form-item>
            <!-- <el-form-item label="用户名">
              <el-input v-model="listQuery.name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
              <el-input v-model="listQuery.phone" placeholder="请输入"></el-input>
            </el-form-item> -->
            <el-form-item>
              <el-button
                type="primary"
                class="btn-search"
                @click="getData(true)"
                >{{ $t("common.search") }}</el-button
              >
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
            @click="handledAddorEdit()"
            v-if="permissions.sys_user_add"
            >{{ $t("common.add") }}</el-button
          >
        </div>
      </div>

      <div class="avue-crud">
        <el-table :data="dataList" border v-loading="listLoading">
          <el-table-column
            align="center"
            :label="$t('common.loginAccount')"
            prop="username"
          />
          <!-- <el-table-column align="center" label="用户名" prop="name"/>
          <el-table-column align="center" label="手机号" prop="phone"/> -->
          <el-table-column align="center" :label="$t('userManage.role')">
            <template slot-scope="scope">
              <div v-if="scope.row.roleList.length > 0">
                {{ roleList[scope.row.roleList[0].roleId - 1] }}
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" :label="$t('userManage.status')">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.lockFlag === '0'">{{
                $t("userManage.normal")
              }}</el-tag>
              <el-tag type="danger" v-else-if="scope.row.lockFlag === '9'">{{
                $t("userManage.lock")
              }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            :label="$t('userManage.operate')"
            width="280"
          >
            <template slot-scope="scope">
              <div v-if="scope.row.username !== 'admin'">
                <!-- <el-button
                  type="text"
                  v-if="permissions.sys_user_lock"
                  @click="handleNormal(scope.row.userId)"
                  >{{
                    scope.row.lockFlag == "0"
                      ? $t("common.disable")
                      : $t("common.restore")
                  }}</el-button
                > -->
                <el-button
                  type="text"
                  v-if="permissions.sys_user_edit"
                  @click="handledAddorEdit(scope.row)"
                  >{{ $t("common.edit") }}</el-button
                >
                <el-button
                  type="text"
                  v-if="permissions.sys_user_password_reset"
                  @click="handleResetPwd(scope.row.userId)"
                  >{{ $t("common.resetPassword") }}</el-button
                >
                <el-button
                  type="text"
                  v-if="permissions.sys_user_del"
                  style="color: red"
                  @click="deleteHandle(scope.row.userId)"
                  >{{ $t("common.delete") }}</el-button
                >
              </div>
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

      <!-- 重置密码 -->
      <ResetPwd ref="resetPwd" />

      <!-- 用户添加 / 编辑 -->
      <UserForm ref="userForm" @back="getData" />
    </basic-container>
  </div>
</template>

<script>
import { delObj, fetchList, nouse } from "@/api/admin/user";
import { mapGetters } from "vuex";

import ResetPwd from "./components/resetPwd.vue";
import UserForm from "./components/userForm.vue";
export default {
  components: { ResetPwd, UserForm },
  data() {
    return {
      dataList: [],
      total: 0,
      listLoading: false,
      listQuery: {
        current: 1,
        size: 10,
      },
      roleList: [
        this.$t("common.admin"),
        this.$t("deviceManage.installer"),
        this.$t("deviceManage.user"),
        this.$t("common.dealer"),
        this.$t("common.distributor"),
      ],
    };
  },
  created() {
    this.getData();
  },
  computed: {
    ...mapGetters(["permissions"]),
  },
  methods: {
    getData(state) {
      this.listLoading = true;
      state && (this.listQuery.current = 1);
      fetchList(this.listQuery)
        .then((res) => {
          console.log("=========", res);
          this.dataList = res.records;
          this.total = res.total;
        })
        .finally(() => {
          this.listLoading = false;
        });
    },
    // 添加 编辑
    handledAddorEdit(info) {
      this.$refs.userForm.init(info);
    },
    // 重置密码
    handleResetPwd(userId) {
      this.$refs.resetPwd.init(userId);
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
    // 冻结
    handleNormal(id) {
      nouse({ id }).then((res) => {
        this.$message.success(this.$t("common.operationSuccessful"));
        this.getData();
      });
    },
    // 删除
    deleteHandle(id) {
      this.$confirm(
        this.$t("userManage.sureDelete"),
        this.$t("common.prompt"),
        {
          confirmButtonText: this.$t("common.confirm"),
          cancelButtonText: this.$t("common.cancel"),
          type: "warning",
        }
      ).then(() => {
        delObj(id).then((res) => {
          this.$message.success(this.$t("common.successfullyDeleted"));
          this.getData();
        });
      });
    },
  },
};
</script>
<style lang="scss" scoped></style>
