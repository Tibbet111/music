<template>
  <div class="wrapper">
      <div class="info">
          <input type="password"
          v-model="password"
          placeholder="请输入密码">
          <span>忘记密码</span>
      </div>
      <login-button text="登录" @click.native="login"></login-button>
      <alert :is-alert="alert" :alert="text"></alert>
      <loading :loading="loading"></loading>
  </div>
</template>

<script>
import loginButton from '../../../components/button'
import alert from '../../../components/alert'
import loading from '../../../components/loading'
import { mapMutations } from 'vuex'
export default {
  name: '',
  components: {
    loginButton,
    alert,
    loading
  },
  data () {
    return {
      password: '',
      alert: false,
      loading: false,
      timer: null,
      flag: true,
      phone: this.$route.query.phone,
      text: '用户名或密码错误'
    }
  },
  methods: {
    ...mapMutations({
      setState: 'LOGIN_STATUS',
      setUid: 'ACCOUNT_UID',
      setLevel: 'ACCOUNT_LEVEL'
    }),
    // 提示警告
    showAlert () {
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }
      this.alert = true
      this.timer = setTimeout(() => {
        this.alert = false
      }, 1000)
    },
    // 登陆成功
    success () {
      this.loading = false
      this._getLoginState()
    },
    async _getLoginState () {
      const res = await this.$api.get('/login/status')
      if (res.data.code === 200) {
        const data = res.data.profile
        this.setState(1)
        localStorage.setItem('loginStatus', 1)
        localStorage.setItem('userInfo', JSON.stringify(data))
        this.setUid(data.userId)
        const userDetail = await this.$api.get(`/user/detail?uid=${data.userId}`)
        const level = userDetail.data.level
        this.setLevel(level)
        localStorage.setItem('level', level)
        this.$router.push('/find')
      }
    },
    async login () {
      if (this.password === '' && this.flag) {
        this.flag = false
        this.text = '请输入密码'
        this.showAlert()
      } else {
        this.loading = true
        const res = await this.$api.get('/login/cellphone', {
          params: {
            phone: this.phone,
            password: this.password
          }
        })
        if (res.data.code === 502) {
          this.text = '用户名或密码错误'
          this.showAlert()
          this.loading = false
          this.password = ''
        } else {
          localStorage.setItem('account', this.phone)
          this.success()
        }
      }
      this.flag = true
    }
  },
  mounted () {
  }
}
</script>

<style lang='scss' scoped>
    .wrapper{
        padding: .23rem;
        .info{
            padding-bottom: .1rem;
            border-bottom: 1px solid #aaa;
            display: flex;
            align-items: center;
            margin-top: 1rem;
            input[type='password']{
                height: .3rem;
                padding:.2rem 0.1rem;
                border:none;
                flex: 1;
                caret-color: red;
            }
        }
    }
</style>
