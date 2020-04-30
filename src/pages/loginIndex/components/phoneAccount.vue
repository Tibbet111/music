<template>
  <div class="wrapper">
      <div class="tips flex ai-center">未注册手机号登录后将自动创建账号</div>
      <div class="info flex ai-center"  ref="info">
          <span>+86</span>
          <input type="text"
          placeholder="请输入手机号"
          v-model.trim="phone"
          :autofocus="true"
          @input="showCancel">
          <i class="phone iconguanbi"
          v-show="show"
          @click="clearInput"></i>
      </div>
      <login-button @click.native="next"></login-button>
      <transition>
        <alert :is-alert="alert" alert="请输入11位数字的手机号"></alert>
      </transition>
  </div>
</template>

<script>
import loginButton from '../../../components/button'
import alert from '../../../components/alert'
export default {
  name: '',
  components: {
    loginButton,
    alert
  },
  data () {
    return {
      phone: '',
      show: false,
      timer: null,
      alert: false,
      flag: true
    }
  },
  methods: {
    showCancel () {
      this.show = true
      this.$refs.info.style.opacity = 1
    },
    clearInput () {
      this.phone = ''
      this.$refs.info.style.opacity = 0.5
    },
    async _determineRegistered (phone) {
      const res = await this.$api.get(`/cellphone/existence/check?phone=${phone}`)
      if (res.data.exist === 1) {
        this.$router.push({
          path: '/pwd',
          query: {
            phone
          }
        })
      } else if (res.data.exist === -1) {
        this.$router.push({
          path: '/verify',
          query: {
            phone
          }
        })
      }
    },
    next () {
      const reg = /^1[345789]\d{9}$/
      if (this.flag) {
        this.flag = false
        if (reg.test(this.phone)) {
          this._determineRegistered(this.phone)
        } else {
          this.alert = true
          setTimeout(() => {
            this.alert = false
          }, 1000)
        }
      }
      this.flag = true
    }
  }
}
</script>

<style lang='scss' scoped>
.wrapper{
    padding: 0.23rem;
    .tips{
        height: 2rem;
        width: 100%;
        color:#ccc;
        font-size: small;
    }
    .info{
        padding-bottom: 0.1rem;
        border-bottom: 1px solid #aaa;
        opacity: .5;
        input[type='text']{
            height: .3rem;
            padding:.2rem 0;
            border:none;
            margin-left:.5rem;
            flex: 1;
            caret-color: red;
        }
    }
}
</style>
