<template>
  <nav class="nav flex ai-center border-bottom">
      <i class="phone iconzuojiantou" @click="goBack"></i>
      <slot></slot>
  </nav>
</template>

<script>
export default {
  name: '',
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
  .phone{
    font-size: 0.7rem;
    padding-right: 5px;
    font-weight: 300;
  }
}
</style>
