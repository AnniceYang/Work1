<template>
  <div class="avue-logo">
    <transition name="fade">
      <span
        v-if="keyCollapse"
        key="0"
        class="avue-logo_subtitle"
        @click="goIndex"
      >
        <!-- {{website.subtitle}} -->
        {{ $t("common.subtitle") }}
      </span>
    </transition>
    <transition-group name="fade">
      <span
        v-if="!keyCollapse"
        key="1"
        class="avue-logo_title"
        @click="goIndex"
      >
        <!-- {{ $t('common.websiteName') }} -->
        <img src="@/assets/img/header-logo.png" />
      </span>
    </transition-group>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Logo",
  computed: {
    ...mapGetters(["website", "keyCollapse"]),
  },
  methods: {
    goIndex: function () {
      window.location.href = "/";
    },
  },
};
</script>

<style lang="scss">
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-active {
  transition: opacity 2.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.avue-logo {
  position: fixed;
  top: 0;
  left: 0;
  width: 240px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  // background-color: #20222a;
  // background-color: red;
  // font-size: 20px;
  overflow: hidden;
  box-sizing: border-box;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.15);
  // color: rgba(255, 255, 255, 1);
  z-index: 1024;
  &_title {
    // display: block;
    // text-align: center;
    // font-weight: 300;
    // font-size: 16px;
  }
  &_subtitle {
    display: block;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    color: #fff;
  }
}
</style>
