<template>
  <div class="list-item flex jc-between ai-center" @click="startSong" :class="{active:nowSong}">
    <!-- 图片 -->
    <div class="img-info" v-if="songImg">
      <img v-lazy="songImg">
    </div>
    <div class="index" v-if="num">
      <span :style="{'color':nowSong?'#dd001b':'#ccc'}">{{num}}</span>
    </div>
    <!-- 歌曲信息 -->
    <div class="song-info">
      <p class="song-name ellipsis" :class="{twoLine}" :style="{'color':nowSong?'#dd001b':''}">
        {{songName}}
        <span class="alia" v-show="alia">({{alia}})</span>
        <span v-if="transName" class="transName">{{transName}}</span>
      </p>
      <p class="song-artist ellipsis" v-if="type==='songList'" :style="{'color':nowSong?'#dd001b':'#ccc'}">
        <span>
          <span class="artist" v-for="item in artists" :key="item.id">{{item.name}}</span>
        </span>
        <span class="album-name">{{albumName}}</span>
      </p>
    </div>
    <!-- 按钮 -->
    <div class="icon">
      <i class="result diandiandian"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    songName: { type: String },
    alia: { type: String },
    songImg: { type: String },
    artists: { type: Array },
    albumName: { type: String },
    transName: { type: String, default: '' },
    type: { type: String, default: 'songList' },
    twoLine: { type: Boolean },
    num: { type: Number },
    nowSong: { type: Boolean, default: false }
  },
  data () {
    return {
      color: '#dd001b'
    }
  },
  methods: {
    startSong () {
      this.$emit('beginSong')
    }
  }
}
</script>

<style lang='scss' scoped>
@import url("//at.alicdn.com/t/font_1380711_cftenqb5flc.css");
.list-item{
  height: 1.2rem;
  &.active{
    color: #dd001b;
  }
  .img-info{
    width: 0.7rem;
    height: 0.7rem;
    margin-right: 0.4rem;
    img{
      border-radius: .1rem;
      height: 100%;
      width: 100%;
    }
  }
  .index{
    color: #999;
    margin-right: .4rem;
  }
  .song-info{
    flex: 1;
    flex-direction: column;
    .song-name{
      max-height: 0.4rem;
      line-height: 0.4rem;
      width: 75vw;
      .alia {
        color: #7c7b7d;
      }
      .transName{
        padding-left: 0.05rem;
        color: #dacdcd;
      }
      &.twoLine{
        max-height: 0.8rem;
        white-space: normal;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        overflow: hidden;
        /*! autoprefixer: off */
        -webkit-box-orient: vertical;
      }
    }
    .song-artist{
      font-size: .23rem;
      height: 0.4rem;
      line-height: 0.4rem;
      color: #7c7b7d;
      width: 75vw;
      .artist{
        &::after{
          content: '/';
        }
        &:last-child::after{
          content:''
        }
      }
      .album-name{
        &::before{
          content: '-';
        }
      }
    }
  }
  .icon{
    color: #ccc;
  }
}
</style>
