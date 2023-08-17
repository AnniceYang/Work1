<template>
  <div class="avue-top">
    <div class="top-bar__left" style="display: flex;">
      <div
        v-if="showCollapse"
        :class="[{ 'avue-breadcrumb--active': isCollapse }]"
        class="avue-breadcrumb"
      >
        <i
          style="cursor: pointer;"
          class="icon-navicon"
          @click="setCollapse"
        />
      </div>
      <!-- <div class="name">
        {{ website.title }}
      </div> -->
    </div>
    <div class="top-bar__title">
      <div v-if="showMenu" class="top-bar__item top-bar__item--show">
        <top-menu />
      </div>
    </div>
    <div class="top-bar__right">
      <el-dropdown>
        <div class="user" style="color: #ffffff; font-size: 18px;">
          {{ userInfo.objName || userInfo.name }}
          <i class="el-icon-arrow-down el-icon--right" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item divided @click.native="handleInfo">{{$t('common.personalInformation')}}</el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">{{$t('common.logout')}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <top-setting ref="seting" />
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
import { fullscreenToggel, listenfullscreen } from '@/util/util'
import topLock from './top-lock'
import topMenu from './top-menu'
import topTheme from './top-theme'
import topLogs from './top-logs'
import topColor from './top-color'
import topSetting from './top-setting'

export default {
  name: 'Top',
  components: {
    topLock,
    topMenu,
    topTheme,
    topLogs,
    topColor,
    topSetting,
  },
  filters: {},
  data () {
    return {
      mobile: '',
      messageList: [],
      // messageNum: 0
    }
  },
  computed: {
    ...mapState({
      showDebug: state => state.common.showDebug,
      showTheme: state => state.common.showTheme,
      showLock: state => state.common.showLock,
      showFullScreen: state => state.common.showFullScreen,
      showCollapse: state => state.common.showCollapse,
      showMenu: state => state.common.showMenu,
      showColor: state => state.common.showColor
    }),
    ...mapGetters([
      'website',
      'userInfo',
      'isFullScreen',
      'tagWel',
      'tagList',
      'isCollapse',
      'tag',
      'logsLen',
      'logsFlag',
      'messageNum'
    ])
  },
  created () {
    console.log('userInfo', this.userInfo)
  },
  mounted () {
    listenfullscreen(this.setScreen)
  },
  methods: {
    // 刷新
    handleRefresh() {
      location.reload()
    },
    // 跳转个人信息
    handleInfo () {
      this.$router.push('/info/index')
    },
    handleScreen () {
      fullscreenToggel()
    },
    setCollapse () {
      this.$store.commit('SET_COLLAPSE')
    },
    setScreen () {
      this.$store.commit('SET_FULLSCREEN')
    },
    logout () {
      this.$confirm(this.$t('common.logoutPrompt'), this.$t('common.prompt'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('LogOut').then(() => {
          this.$router.push({ path: '/login' })
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.top-bar__right {
  /deep/ .el-color-picker__color {
    border: none;
  }
}

.avue-top {
  background: #333333;
  color: #ffffff;
  font-size: 18px;
}

.name {
  display: flex;
  align-items: center;
  font-size: 22px;
  margin-left: 10px;
}
.message-info {
  width: 300px;
  height: 100%;
  display: flex;
  align-items: center;
  margin-left: 10px;
  cursor: pointer;
  .message-info-main {
    width: 300px;
    height: 30px;
    line-height: 30px;
    border-radius: 6px;
    border: 1px solid #ffffff;
    padding: 0 6px;
    font-size: 14px;
    color: #ffffff;
    
    .message-info-main-text {
      width: 288px;
      display: inline-block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
.service {
  display: flex;
  align-items: center;
  margin-right: 30px;
}
.user {
  display: flex;
  align-items: center;
}
.message {
  display: flex;
  align-items: center;
  margin-right: 30px;
  cursor: pointer;
  span {
    margin-left: 5px;
  }
}
</style>
