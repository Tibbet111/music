<template>
  <div>
      <transition>
          <div class="loading"
               v-show="loading">
               <p></p>
          </div>
      </transition>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    loading: { type: Boolean, default: true }
  },
  data () {
    return {
    }
  },
  methods: {}
}
</script>

<style lang='scss' scoped>
    .v-enter-active,
    .v-leave-active {
      transition: opacity 0.5s;
    }
    .v-enter,
    .v-leave-to {
      opacity: 0;
    }
    .loading{
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        padding: .13rem;
        font-size: smaller;
        border-radius: 8px;
        p{
            width: 1rem;
            height: 1rem;
            border: 3px solid #ccc;
            border-top-color: #666;
            border-radius: 50%;
            margin: 0 auto;
            animation: rotate 1s linear infinite;
        }
        @keyframes rotate {
            from {
                transform:  rotate(0deg);
            }
            to{
                transform: rotate(360deg);
            }
        }
    }
</style>
