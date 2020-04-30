<template>
  <div class="btn flex jc-center">
      <button id="button"></button>
      <label class="label" for="btn">{{text}}</label>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    text: { type: String, default: '下一步' }
  },
  data () {
    return {
    }
  },
  methods: {}
}
</script>

<style lang='scss' scoped>
@import '../assets/style/_variables.scss';
.btn{
    text-align: center;
    #button{
        position: absolute;
        clip: rect(0, 0, 0, 0);
    }
    .label{
        margin-top: .5rem;
        padding: .3rem;
        border-radius: .5rem;
        background: $bgcolor;
        color:#fff;
        width: 80%;
        line-height: .3rem;
    }
}
</style>
