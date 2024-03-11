<!--
 * @Descripttion:
 * @version: 1.0.0
 * @@Company: ZZCYI
 * @Author: 贾
 * @Date: 2020-09-29 14:32:37
 * @LastEditors: 贾
 * @LastEditTime: 2021-04-25 14:15:21
 * @Update Descripttion:
-->
<template>
  <el-dropdown
    trigger="click"
    class="international"
    @command="handleSetLanguage"
  >
    <div>
      <i class="icon-yuyan"></i>
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :disabled="language === 'zh-CN'" command="zh-CN">
        中文
      </el-dropdown-item>
      <el-dropdown-item :disabled="language === 'en-US'" command="en-US">
        English
      </el-dropdown-item>
      <el-dropdown-item :disabled="language === 'it'" command="it">
        Italiano
      </el-dropdown-item>
      <!-- <el-dropdown-item :disabled="language==='es'" command="es">
        Español
      </el-dropdown-item>
      <el-dropdown-item :disabled="language==='ja'" command="ja">
        日本語
      </el-dropdown-item> -->
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  computed: {
    language() {
      return this.$store.getters.language;
    },
  },
  methods: {
    handleSetLanguage(lang) {
      this.$i18n.locale = lang;
      this.$store.commit("SET_LANGUAGE", lang);
      // this.$store.dispatch('common/setLanguage', lang)
      this.$message({
        message: "Switch Language Success",
        type: "success",
      });
      window.location.reload();
    },
    // handleSetLanguage(lang) {
    //   this.$i18n.locale = lang
    //   this.$store.dispatch('app/setLanguage', lang)
    //   this.$message({
    //     message: 'Switch Language Success',
    //     type: 'success'
    //   })
    // }
  },
};
</script>
