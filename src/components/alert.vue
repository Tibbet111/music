<template>
  <div>
    <transition>
      <div
        class="alert"
        v-show="isAlert"
      >{{alert}}</div>
    </transition>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    isAlert: { type: Boolean, default: false },
    alert: { type: String }
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang='scss' scoped>
.alert{
    position: fixed;
    left: 50%;
    bottom: 2rem;
    padding: .2rem;
    transform: translateX(-50%);
    font-size: smaller;
    border-radius: .3rem;
    background-color: rgba(68, 54, 54, 0.6);
    line-height: .2rem;
    color: #fff;
}
.v-enter-active,.v-leave-active{
    opacity: 1;
    transition: opacity .5s;
}
.v-enter,.v-leave-to{
    opacity: 0;
}
</style>
