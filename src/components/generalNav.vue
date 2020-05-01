<template>
  <nav class="nav flex ai-center">
    <div class="blur-bg"
    v-if="imgUrl"
    :style="{backgroundImage:'url('+imgUrl+')',opacity}"></div>
      <i class="phone iconzuojiantou" @click="goBack"></i>
      <slot></slot>
      <slot name="artist"></slot>
  </nav>
</template>

<script>
export default {
  name: '',
  props: {
    imgUrl: {
      type: String,
      default: ''
    },
    opacity: {
      type: String,
      default: '0'
    }
  },
  data () {
    return {
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang='scss' scoped>
@import url("//at.alicdn.com/t/font_1550123_8ybvu6bwh0w.css");
@import url("//at.alicdn.com/t/font_1351323_oxqdjg3rufq.css");

.nav{
  height: 1rem;
  width: 100%;
  line-height: 1rem;
  overflow: hidden;
  .blur-bg{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
    background-size: cover;
    background-position: center bottom;
    filter: blur(50px);
    margin: -100px;
  }
  .phone{
    font-size: 0.7rem;
    padding-right: 5px;
    font-weight: 300;
  }
}
</style>
