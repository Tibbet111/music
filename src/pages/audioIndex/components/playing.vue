<template>
  <div class="wrapper">
    <div class="great" :class="{rotate:!isPlay}"></div>
    <div class="circle-bg" ref="circle">
      <div class="song-img" :class="isPlay?'song-img-animation':''">
        <img :src="imgUrl">
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: '',
  props: {
    imgUrl: { type: String }
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      isPlay: 'PLAY_STATUS'
    })
  },
  watch: {
    isPlay (val) {
      if (val) {
        this.$refs.circle.style.animationPlayState = 'running'
      } else {
        this.$refs.circle.style.animationPlayState = 'paused'
      }
    }
  },
  methods: {}
}
</script>

<style lang='scss' scoped>
.wrapper{
  height: 7.6rem;
  margin: 0.6rem 0;
  position: relative;
  overflow: hidden;
  .great{
    position: fixed;
    z-index: 1;
    left: 50%;
    transform:  translate(-50%) rotate(0deg);
    transform-origin: top left;
    transition: transform .2s;
    width: 2rem;
    height: 0;
    padding-bottom: 2.5rem;
    background-image: url("https://s2.ax1x.com/2019/09/13/nrJyJP.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    &.rotate{
      transform: translate(-50%) rotate(-16deg);;
    }
  }
  .circle-bg{
    display: flex;
    justify-content: center;
    width: 80vw;
    margin: 1.4rem auto;
    height: 0;
    padding-bottom: 80vw;
    background-image: url("https://s2.ax1x.com/2019/09/12/n0yYqK.md.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    transform-origin: center;
    animation: rotating 24s linear infinite;
    .song-img{
      border: 1px solid #000;
      width: 3.6rem;
      height: 0;
      padding-bottom: 3.6rem;
      border-radius: 50%;
      margin-top: 1rem;
      overflow: hidden;
      img{
        width: 3.6rem;
        height: 3.6rem;
      }
    }
  }
}
@keyframes rotating {
  100%{
    transform: rotate(360deg);
  }
}
</style>
