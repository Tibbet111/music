<template>
  <div class="wrapper">
    <login-nav @returnPage="returnPage">
      <span class="text">手机号登录</span>
    </login-nav>
    <router-view></router-view>
  </div>
</template>

<script>
import loginNav from '../../components/generalNav'
export default {
  name: '',
  components: {
    loginNav
  },
  data () {
    return {
    }
  },
  methods: {
    returnPage () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang='scss' scoped>
.wrapper{
  padding: .23rem;
}
.text{
  font-size: 0.4rem;
}
</style>
