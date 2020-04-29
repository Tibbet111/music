<template>
  <div>
      <transition name="mask-show">
          <div class="mask" v-show="loginPage"
          @click="HIDE_LOGIN"
          @touchmove.prevent
          ></div>
      </transition>
      <transition name="login-show" mode="out-in">
        <login v-show="loginPage" @touchmove.prevent></login>
      </transition>
  </div>
</template>

<script>
import login from './login'
import { mapGetters, mapMutations } from 'vuex'
export default {
  components: {
    login
  },
  name: '',
  data () {
    return {
    }
  },
  methods: {
    ...mapMutations(['HIDE_LOGIN'])
  },
  computed: {
    ...mapGetters({ loginPage: 'LOGIN_PAGE' })
  }
}
</script>

<style lang='scss' scoped>
.mask{
    position: fixed;
    z-index: 21;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, .7);
}
.mask-show-enter,.mask-show-leave-to{
  opacity: 0;
}
.mask-show-enter-active,.mask-show-leave-active{
  transition: opacity linear .3s;
}
.login-show-enter,.login-show-leave-to{
  transform: translateX(-6rem);
}
.login-show-enter-active,.login-show-leave-active{
  transition: transform linear .3s;
}

</style>
