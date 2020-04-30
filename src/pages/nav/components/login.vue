<template>
  <div class="login-menu">
      <login-top :loginStatus="loginStatus"></login-top>
      <login-icon></login-icon>
      <login-icon-top></login-icon-top>
      <login-icon-bottom></login-icon-bottom>
      <login-bottom @logout="logout"></login-bottom>
  </div>
</template>

<script>
import loginTop from './loginTop'
import loginIcon from './login-icon'
import loginIconTop from './login-icons-top'
import loginIconBottom from './login-icon-bottom'
import loginBottom from './login-bottom'
import { mapMutations } from 'vuex'
export default {
  components: {
    loginTop,
    loginIcon,
    loginIconTop,
    loginIconBottom,
    loginBottom
  },
  name: '',
  data () {
    return {
      loginStatus: Number(localStorage.getItem('loginStatus'))
    }
  },
  methods: {
    ...mapMutations(['LOGIN_STATUS']),
    async logout () {
      const res = await this.$api.get('/logout')
      if (res.data.code === 200) {
        localStorage.setItem('loginStatus', 0)
        this.LOGIN_STATUS(0)
        location.reload()
      }
    }
  }
}
</script>

<style lang='scss' scoped>
@import url('http://at.alicdn.com/t/font_1322263_rqiqhmq0u9o.css');
.login-menu {
  position: fixed;
  z-index: 21;
  height: 100vh;
  overflow-y: auto;
  top: 0;
  left: 0;
  background: #fff;
  width: 6rem;
}
</style>
