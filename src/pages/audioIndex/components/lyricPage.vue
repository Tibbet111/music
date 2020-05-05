<template>
  <div class="wrapper" ref="lyric">
    <div class="full" v-if="noLyric">{{noLyricText}}</div>
    <ul  v-if="!noLyric">
      <li v-for="(item,index) in lyricArray"
      :key="item.time"
      :class="{active:nowLyricIndex === index}"
      class="ellipsis">{{item | setWords}}</li>
    </ul>
  </div>
</template>

<script>
const REM = document.body.clientWidth * 0.14
export default {
  name: '',
  props: {
    lyricArray: {
      type: Array
    },
    // 当前播放的歌词索引
    nowLyricIndex: {
      type: Number
    },
    noLyric: {
      type: Boolean
    },
    noLyricText: {
      type: String
    }
  },
  data () {
    return {
    }
  },
  filters: {
    setWords (val) {
      if (val && val.words) {
        return val.words
      }
    }
  },
  methods: {
    setScroll (index) {
      // 这里求出中线的位置为 8.3 rem
      // 通过 歌词容器的高度 / 2 - 每个 li 的高度 / 2
      // 每次移动是移动一行歌词的高度，一行歌词高度是 0.6 rem
      const top = index * 0.6 * REM
      // this.marginTop = top + 'rem'
      this.$refs.lyric.scroll({
        top,
        left: 0,
        behavior: 'smooth' //  smooth(平滑滚动),instant(瞬间滚动),默认auto
      })
    }
  }
}
</script>

<style lang='scss' scoped>
  .wrapper{
    height: 7.6rem;
    margin: .6rem 0;
    color: #ccc;
    overflow: scroll;
    &::-webkit-scrollbar{display: none;}
    ul{
      padding-top: 3.5rem;
      text-align: center;
      transition: margin-top 0.7s;;
      li{
        height: 0.6rem;
        line-height: 1.5;
        &.active{
          color: #fff;
        }
      }
    }
    .full{
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>
