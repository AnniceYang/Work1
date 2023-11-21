<template>
  <el-form
    ref="dataForm"
    :rules="loginRules"
    :model="dataForm"
    class="login-form"
    status-icon
    label-width="0"
  >
    <el-form-item prop="userName">
      <el-input
        v-model="dataForm.userName"
        size="small"
        auto-complete="off"
        :placeholder="$t('common.namePrompt')"
        @keyup.enter.native="handleLogin"
      >
        <i
          slot="prefix"
          class="icon-yonghuming"
        />
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        :type="passwordType"
        v-model="dataForm.password"
        size="small"
        auto-complete="off"
        show-password
        :placeholder="$t('common.passwordPrompt')"
        @keyup.enter.native="handleLogin"
      >
        <!-- <i
          slot="suffix"
          class="el-icon-view el-input__icon"
          @click="showPassword"
        /> -->
        <i
          slot="prefix"
          class="icon-mima"
        ></i>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button
        size="small"
        class="login-submit"
        @click.native.prevent="handleLogin"
      >{{$t('common.login')}}</el-button>
    </el-form-item>

    <el-popover
      :visible-arrow="false"
      v-model="showVarification"
      placement="top"
      width="326"
      trigger="manual"
    >
      <VerificationCode
        ref="dialogopen"
        :l="42"
        :r="10"
        :w="300"
        :h="150"
        :block_y="block_y"
        :imgurl="imgurl"
        :miniimgurl="miniimgurl"
        :slider-text="text"
        @success="onSuccess"
        @fail="onFail"
        @refresh="onRefresh"
        @back="back"
      >
      </VerificationCode>
    </el-popover>
  </el-form>
</template>

<script>
import { mapGetters } from "vuex";
import Verify from "@/components/verifition/Verify";
import VerificationCode from '../../components/verificationCode/verificationCode2'

import { verificationCode } from '@/api/login'



export default {
  name: "Userlogin",
  components: {
    Verify,
    VerificationCode
  },
  data () {
    return {
      loading: false,
      block_y: 0,
      imgurl: '',
      miniimgurl: '',
      text: '滑动验证',
      socialForm: {
        code: "",
        state: "",
      },
      dataForm: {
        userName: '',
        password: '',
        code: '',
        randomStr: ''
      },
      checked: false,
      chenckMoveid: '',
      code: {
        src: undefined,
        len: 4,
      },
      loginRules: {
        userName: [
          { required: true, message: this.$t('common.namePrompt'), trigger: "blur" },
        ],
        password: [
          { required: true, message: this.$t('common.passwordPrompt'), trigger: "blur" },
          // { min: 6, message: "密码长度最少为6位", trigger: "blur" },
        ],
      },
      passwordType: "password",
      showVarification: false, // 验证码显示
      isLoginBtnDisable: false
    };
  },
  computed: {
    ...mapGetters(["tagWel"]),
  },
  methods: {
    // 关闭验证码
    back () {
      this.imgurl = ''
      this.miniimgurl = ''
      this.showVarification = false
      this.state.loginBtn = false
    },
    onFail () {
    },
    // 验证码拖拉验证
    onSuccess (e) {
      var that = this
      // that.visible = false
      // const varificationCodeDataObj = {
      //   positionX: parseInt(e),
      //   key: that.chenckMoveid,
      //   positionY: that.block_y,
      //   removeIfSuccess: true
      // }
      let query = {
        password: that.dataForm.password,
        sessionUUID: that.chenckMoveid,
        imageCode: parseInt(e),
        userName: that.dataForm.userName,
      }
      this.$store.dispatch("LoginByUsername", query).then(() => {
        this.$store.dispatch("GetUserInfo");
        this.$store.dispatch("GetMenu", { type: true, id: '' }).then(data => {
          if (data.length !== 0) {
            this.$router.$avueRouter.formatRoutes(data, true);
            // 跳第一个菜单
            // this.$router.push({path: data[0].children.length > 0 ? data[0].children[0].path : data[0].path});
            this.$router.push({ path: '/deviceManage/device' });
          }
        })
      }).catch(err => {
        // this.onRefresh(1)
        this.imgurl = ''
        this.miniimgurl = ''
        this.showVarification = false
      })
    },
    // 刷新验证码
    onRefresh (e) {
      this.imgurl = ''
      this.miniimgurl = ''
      this.getImageVerifyCode(e)
    },
    // 获取验证码
    getImageVerifyCode (e) {
      let that = this
      verificationCode().then(res => {
        var imgobj = res

        that.chenckMoveid = imgobj.key
        that.block_y = imgobj.yHeight
        let backImage = 'data:image/jpg;base64,' + imgobj.backImage
        let slidingImage = 'data:image/jpg;base64,' + imgobj.slidingImage
        that.imgurl = backImage
        that.miniimgurl = slidingImage
        imgobj.xWidth = 5
        if (that.$refs.dialogopen) {
          that.$refs.dialogopen.reset(imgobj.yHeight)
        }
        if (!e) {
          // that.showVarification = false
          that.showVarification = true
        }
      })
    },
    showPassword () {
      this.passwordType == ""
        ? (this.passwordType = "password")
        : (this.passwordType = "");
    },
    handleLogin () {
      this.dataFormSubmit(); // 登录方法
      // this.$refs.loginForm.validate((valid) => {
      //   if (valid) {
      //     // this.$refs.verify.show();
      //   }
      // });
    },
    // 提交表单
    dataFormSubmit () {
      // this.$cookie.delete('Authorization')
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.getImageVerifyCode()
          this.showVarification = true
        }
      })
    },
    verificationClose (data) {
      const that = this
      if (data === 'show') {
        this.isLoginBtnDisable = false
        this.showVarification = true
        setTimeout(function () {
          that.showVarification = true
        }, 100)
      } else if (data === 'disable') {
        this.isLoginBtnDisable = true
        this.hideVcode()
      } else {
        this.isLoginBtnDisable = false
        this.hideVcode()
      }
    },
    hideVcode () {
      if (this.showVarification) {
        this.showVarification = false
        // this.getImageVerifyCode()s
      }
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/.el-popover {
  top: -100px !important;
}
</style>
