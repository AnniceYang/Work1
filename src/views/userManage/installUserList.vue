<template>
  <div class="app-container calendar-list-container">
    <basic-container>
      <div class="header-search">
        <div class="lside">
          <el-form :inline="true">
            <el-form-item :label="$t('ordinaryUser.userName')">
              <el-input
                v-model="listQuery.username"
                :placeholder="$t('common.inputPrompt')"
              ></el-input>
            </el-form-item>
            <!-- <el-form-item label="状态">
              <el-select v-model="listQuery.lockFlag" placeholder="请选择">
                <el-option label="正常" :value="0" />
                <el-option label="锁定" :value="9" />
              </el-select>
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
      </div>

      <div class="avue-crud">
        <el-table :data="dataList" fit v-loading="listLoading">
          <el-table-column
            align="center"
            prop="username"
            :label="$t('ordinaryUser.userName')"
          />
          <el-table-column
            align="center"
            prop="contacts"
            :label="$t('ordinaryUser.contacts')"
          />
          <el-table-column
            align="center"
            prop="contactNumber"
            :label="$t('ordinaryUser.telephone')"
          />
          <el-table-column
            align="center"
            :label="$t('ordinaryUser.address')"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{
                `${scope.row.countryName}${scope.row.regionName}${scope.row.residenceName}${scope.row.address}`
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="timeZone"
            :label="$t('ordinaryUser.timeZone')"
          />
          <el-table-column align="center" :label="$t('common.userType')">
            <template slot-scope="scope">
              {{
                scope.row.type === 0
                  ? $t("common.distributor1")
                  : $t("common.user")
              }}
            </template>
          </el-table-column>
          <!-- <el-table-column align="center" label="状态">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.lockFlag === 0" type="success">正常</el-tag>
              <el-tag v-else-if="scope.row.lockFlag === 9" type="info">锁定</el-tag>
            </template>
          </el-table-column> -->
          <el-table-column align="center" :label="$t('common.createTime')">
            <template slot-scope="scope">
              {{ scope.row.createTime | parseTime }}
            </template>
          </el-table-column>
          <el-table-column :label="$t('common.operate')" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="handleDevice(scope.row.userId)">{{
                $t("ordinaryUser.viewDevice")
              }}</el-button>
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
    </basic-container>
  </div>
</template>
<script>
import { qryAppUser } from "@/api/appUser";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      // 列表信息
      listLoading: false,
      dataList: [],
      total: 0,
      listQuery: {
        current: 1,
        size: 10,
        type: 0,
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
    getData(state) {
      this.listLoading = true;
      state && (this.listQuery.current = 1);
      qryAppUser(this.listQuery)
        .then((res) => {
          this.dataList = res.records;
          this.total = res.total;
        })
        .finally(() => {
          this.listLoading = false;
        });
    },
    // 查看设备
    handleDevice(id) {
      this.$router.push({
        path: "/deviceManage/device/index",
        query: { installUserId: id },
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
        type: 0,
      };
      this.getData();
    },
  },
};
</script>

<style lang="scss" scoped></style>
