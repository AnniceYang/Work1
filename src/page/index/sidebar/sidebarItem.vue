<template>
  <div class="menu-wrapper">
    <template v-for="item in menu">
      <el-menu-item
        v-if="validatenull(item[childrenKey]) && vaildRoles(item)"
        :index="item[pathKey]"
        :key="item[labelKey]"
        :class="{ 'is-active': vaildAvtive(item) }"
        @click="open(item)"
      >
        <i :class="item[iconKey]" />
        <span slot="title" :alt="item[pathKey]">{{ item[labelKey] }}</span>
      </el-menu-item>
      <el-submenu v-else :index="item[pathKey]" :key="item[labelKey]">
        <template slot="title">
          <i :class="item[iconKey]" />
          <span
            slot="title"
            :class="{ 'el-menu--display': collapse && first }"
            >{{ item[labelKey] }}</span
          >
        </template>
        <template v-for="(child, cindex) in item[childrenKey]">
          <el-menu-item
            v-if="validatenull(child[childrenKey]) && vaildRoles(child)"
            :index="(child[pathKey], cindex)"
            :class="{ 'is-active': vaildAvtive(child) }"
            :key="child[labelKey]"
            @click="open(child)"
          >
            <i :class="child[iconKey]" />
            <span slot="title">{{ child[labelKey] }}</span>
          </el-menu-item>
          <sidebar-item
            v-else
            :menu="[child]"
            :key="cindex"
            :props="props"
            :screen="screen"
            :collapse="collapse"
          />
        </template>
      </el-submenu>
    </template>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { validatenull } from "@/util/validate";
// import config from './config.js'
export default {
  name: "SidebarItem",
  props: {
    menu: {
      type: Array,
    },
    screen: {
      type: Number,
    },
    first: {
      type: Boolean,
      default: false,
    },
    props: {
      type: Object,
      default: () => {
        return {};
      },
    },
    collapse: {
      type: Boolean,
    },
    language: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      // config: config
    };
  },
  created() {},
  mounted() {},
  computed: {
    ...mapGetters(["roles", "language"]),
    labelKey() {
      const key =
        this.language === "en-US"
          ? "nameEn"
          : this.language === "it"
          ? "nameItaly"
          : "label";
      console.log("Label key:", key);
      return key;
    },
    pathKey() {
      return this.props.path;
    },
    iconKey() {
      return this.props.icon;
    },
    childrenKey() {
      return this.props.children;
    },
    nowTagValue() {
      return this.$router.$avueRouter.getValue(this.$route);
    },
    // labelKey() {
    //   return this.props.label || this.config.propsDefault.label
    // },
    // pathKey() {
    //   return this.props.path || this.config.propsDefault.path
    // },
    // iconKey() {
    //   return this.props.icon || this.config.propsDefault.icon
    // },
    // childrenKey() {
    //   return this.props.children || this.config.propsDefault.children
    // },
    // nowTagValue() {
    //   return this.$router.$avueRouter.getValue(this.$route)
    // }
  },
  methods: {
    vaildAvtive(item) {
      const groupFlag = (item["group"] || []).some((ele) =>
        this.$route.path.includes(ele)
      );
      return this.nowTagValue === item[this.pathKey] || groupFlag;
    },
    vaildRoles(item) {
      item.meta = item.meta || {};
      return item.meta.roles ? item.meta.roles.includes(this.roles) : true;
    },
    validatenull(val) {
      return validatenull(val);
    },
    open(item) {
      if (this.screen <= 1) this.$store.commit("SET_COLLAPSE");
      this.$router.$avueRouter.group = item.group;
      this.$router
        .push({
          path: this.$router.$avueRouter.getPath({
            name: item[this.labelKey],
            src: item[this.pathKey],
          }),
          query: item.query,
        })
        .catch(() => {});
    },
  },
};
</script>
<style lang="scss" scoped>
.menu-wrapper {
  width: 250px;
}
</style>
