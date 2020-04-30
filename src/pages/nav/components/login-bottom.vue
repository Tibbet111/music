<template>
  <div class="container border-bottom flex jc-around ai-center">
    <span @click="TOGGLE_MODE">
      <i class="login" :class="{ iconyueliang1,icontaiyang}"></i>
      <span>{{ iconyueliang1?'夜':'日' }}间模式</span>
    </span>
    <span>
      <i class="login iconshezhi"></i>
      <span>设置</span>
    </span>
    <span @click="logout">
      <i class="login icondianyuan"></i>
      <span>退出</span>
    </span>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: '',
  data () {
    return {
    }
  },
  methods: {
    ...mapMutations(['TOGGLE_MODE']),
    logout () {
      this.$emit('logout')
    }
  },
  computed: {
    ...mapGetters({
      iconyueliang1: 'ICON_NIGHT',
      icontaiyang: 'ICON_SUN',
      modeText: 'MODE_TEXT'
    })
  }
}
</script>

<style lang='scss' scoped>
.container{
  width: 6rem;
  height: .9rem;
  position: fixed;
  bottom: 0;
  z-index: 2;
  background: #fff;
  font-size: .3rem;
  padding: .2rem .23rem;
  border-top: 1px solid #eaeaea;
  box-shadow: 0 1px 2px 0px rgba(0,0,0,.3);
  i{
    font-size: .4rem;
    margin-right: 0.08rem;
    vertical-align: -2px;
  }
}
</style>
