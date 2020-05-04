<template>
  <div class="bottom-audio flex ai-center jc-between" @click="returnFull">
    <div class="img-info" ref="circle">
      <img :src="imgUrl">
    </div>
    <div class="con-info">
      <p class="name ellipsis">{{name}}</p>
      <p class="lyric lyric">
        <span class="artist" v-for="item in artist"
              :key="item.id" v-show="!lyric">{{item.name}}
        </span>
        <span class="album-name" v-show="!lyric">{{albumName}}</span>
        <span v-show="lyric">{{lyric}}</span>
      </p>
    </div>
    <div class="button">
      <span class="circle">
        <i class="audio"
           @click.stop="play"
           :class="{audiozantingtingzhi: isPlay, audiobofang2: !isPlay}"></i>
      </span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: '',
  props: {
    imgUrl: { type: String },
    name: { type: String },
    albumName: { type: String },
    artist: { type: [String, Array] },
    lyric: { type: String }
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
  methods: {
    returnFull () {
      this.$emit('returnFull')
    },
    play () {
      this.$emit('play')
    }
  }
}
</script>

<style lang='scss' scoped>
.bottom-audio{
  padding: 0 .23rem;
  position: fixed;
  height: 1rem;
  width: 100vw;
  bottom: 0;
  z-index: 9;
  background-color: #fff;
  .img-info{
    width: 0.7rem;
    height: 0;
    padding-bottom: 0.7rem;
    border-radius: 50%;
    overflow: hidden;
    transform-origin: center;
    animation: rotating 24s linear infinite;
    img{
      width: 0.7rem;
      height: 0.7rem;
    }
  }
  .con-info{
    flex: 1;
    margin-left: 0.16rem;
    width: 4.6rem;
    .name{
      font-size: 0.26rem;
      line-height: 1.5;
    }
    .lyric{
      color: #ded7d4;
      font-size: 0.18rem;
      line-height: 1.5;
      .artist {
        &::after {
          content: "/";
        }
        &:last-child::after {
          content: "";
        }
      }
      .album-name {
        &::before {
          content: "-";
        }
      }
    }
  }
  .button{
    .circle{
      display: inline-block;
      text-align: center;
      line-height: 0.4rem;
      width: 0.4rem;
      height: 0.4rem;
      border-radius: 50%;
      margin-left: 0.1rem;
      .audio{
        margin-left: 0;
        font-size: 0.3rem;
      }
    }
  }
  @keyframes rotating {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
