<template>
  <div class="top-menu">
    <el-menu :default-active="activeIndex" mode="horizontal" text-color="#333">
      <template v-for="(item, index) in items">
        <el-menu-item
          :index="item.parentId + ''"
          :key="index"
          @click.native="openMenu(item)"
        >
          <template slot="title">
            <i :class="item.icon" />
            <span>{{ item.label }}</span>
          </template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "TopMenu",
  inject: ["Index"],
  data() {
    return {
      activeIndex: "0",
      items: [],
    };
  },

  created() {
    // 显示顶部菜单
    this.getTopMenu();
    // 用户权限加载
    this.getUserInfo();
  },
  computed: {
    ...mapGetters(["menu"]),
  },
  methods: {
    getTopMenu() {
      this.$store.dispatch("GetTopMenu").then((res) => {
        this.items = res;
      });
    },
    openMenu(item) {
      this.Index.openMenu(item);
    },
    getUserInfo() {
      // 更新sessionStore 权限信息
      this.$store.dispatch("GetUserInfo");
    },
  },
};
</script>
