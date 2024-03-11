<template>
  <basic-container>
    <div class="avue-crud">
      <el-form :inline="true">
        <el-form-item>
          <el-button
            v-if="permissions.sys_menu_add"
            icon="el-icon-plus"
            type="primary"
            @click="addOrUpdateHandle(false)"
            >{{ $t("common.add") }}</el-button
          >
        </el-form-item>
      </el-form>

      <el-table
        border
        v-loading="loading"
        :data="menuList"
        row-key="id"
        :tree-props="{ children: 'children', hasChildren: 'hasChildrens' }"
      >
        <el-table-column
          :prop="
            $store.getters.language === 'en-US'
              ? 'nameEn'
              : $StorageEvent.getters.language === 'it'
              ? 'nameItaly'
              : 'name'
          "
          :label="$t('menuManage.menuName')"
          :show-overflow-tooltip="true"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="icon"
          :label="$t('menuManage.icon')"
          align="center"
          width="100"
        >
          <template slot-scope="scope">
            <i :class="scope.row.icon" />
          </template>
        </el-table-column>
        <el-table-column
          prop="sort"
          :label="$t('menuManage.sort')"
          width="60"
        ></el-table-column>
        <el-table-column
          prop="path"
          :label="$t('menuManage.componentPath')"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="type"
          :label="$t('menuManage.type')"
          width="100"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.type === '0'">{{
              $t("menuManage.left")
            }}</el-tag>
            <el-tag type="success" v-if="scope.row.type === '2'">{{
              $t("menuManage.top")
            }}</el-tag>
            <el-tag type="info" v-if="scope.row.type === '1'">{{
              $t("menuManage.button")
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="keepAlive"
          :label="$t('menuManage.buffer')"
          width="80"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag type="info" v-if="scope.row.keepAlive === '0'">{{
              $t("menuManage.close")
            }}</el-tag>
            <el-tag type="success" v-if="scope.row.keepAlive === '1'">{{
              $t("menuManage.open")
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="permission"
          :label="$t('menuManage.permissionIdentification')"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          :label="$t('menuManage.operate')"
          align="center"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="scope">
            <el-button
              size="small"
              type="text"
              icon="el-icon-plus"
              @click="addOrUpdateHandle(false, scope.row.id)"
              v-if="permissions.sys_menu_add"
              >{{ $t("common.add") }}
            </el-button>
            <el-button
              size="small"
              type="text"
              icon="el-icon-edit"
              @click="addOrUpdateHandle(true, scope.row.id)"
              v-if="permissions.sys_menu_edit"
              >{{ $t("common.edit") }}
            </el-button>
            <el-button
              size="small"
              type="text"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"
              v-if="permissions.sys_menu_del"
              >{{ $t("common.delete") }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <table-form
        v-if="addOrUpdateVisible"
        ref="addOrUpdate"
        @refreshDataList="getList"
      ></table-form>
    </div>
  </basic-container>
</template>

<script>
import { delObj, fetchMenuTree } from "@/api/admin/menu";
import TableForm from "./menu-form";
import { mapGetters } from "vuex";

export default {
  name: "Menu",
  components: { TableForm },
  data() {
    return {
      addOrUpdateVisible: false,
      // 遮罩层
      loading: true,
      // 菜单表格树数据
      menuList: [],
      // 菜单树选项
      menuOptions: [],
    };
  },
  created() {
    this.getList();

    console.log(
      "Language property: ",
      this.$store.getters.language === "en-US"
        ? "nameEn"
        : this.$store.getters.language === "it"
        ? "nameItaly"
        : "label"
    );
  },

  computed: {
    ...mapGetters(["permissions"]),
  },
  methods: {
    addOrUpdateHandle(isEdit, id) {
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(isEdit, id);
      });
    },
    getList() {
      this.loading = true;
      fetchMenuTree(false).then((response) => {
        this.menuList = response;
        this.loading = false;
      });
    },
    handleDelete(row) {
      this.$confirm(this.$t("menuManage.sureDelete"), this.$t("common.warn"), {
        confirmButtonText: this.$t("common.confirm"),
        cancelButtonText: this.$t("common.cancel"),
        type: "warning",
      })
        .then(function () {
          return delObj(row.id);
        })
        .then(() => {
          this.getList();
          this.$message.success(this.$t("common.successfullyDeleted"));
        });
    },
  },
};
</script>
