<template>
  <div>
    <div class="list flex ai-center" @click="searchIdx(idx)">
      <div class="img-info">
        <img :src="imgUrl">
        <span class="time">{{updateTime}}</span>
      </div>
      <div class="list-con">
        <div class="info ellipsis"
        v-for="(item, index) in tracks"
        :key="index">{{index + 1 +'.'}}
          <span>{{item.first}}</span> -
          <span>{{item.second}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    imgUrl: {
      type: String
    },
    tracks: {
      type: Array
    },
    updateTime: {
      type: String
    },
    idx: {
      type: String
    }
  },
  data () {
    return {
    }
  },
  methods: {
    searchIdx (idx) {
      switch (idx) {
        case '云音乐新歌榜':
          idx = 0
          break
        case '云音乐热歌榜':
          idx = 1
          break
        case '网易原创歌曲榜':
          idx = 2
          break
        case '云音乐飙升榜':
          idx = 3
          break
        case '云音乐说唱榜':
          idx = 23
          break
        case '云音乐ACG音乐榜':
          idx = 22
          break
        case 'KTV唛榜':
          idx = 7
          break
        case 'iTunes榜':
          idx = 8
          break
        case '日本Oricon周榜':
          idx = 10
          break
        case 'Hit FM Top榜':
          idx = 9
          break
        case '台湾Hito排行榜':
          idx = 20
          break
        case 'Beatport全球电子舞曲榜':
          idx = 21
          break
        case '法国 NRJ Vos Hits 周榜':
          idx = 20
          break
        case 'UK排行榜':
          idx = 5
          break
        case '美国Billboard周榜':
          idx = 6
          break
      }
      this.$emit('showIdxPage', idx)
    }
  }
}
</script>

<style lang='scss' scoped>
.list{
  height: 2rem;
  .img-info{
    width: 1.7rem;
    height: 1.7rem;
    position: relative;
    margin-right: .5rem;
    img{
      width: 100%;
      height: 100%;
      border-radius: 0.2rem;
    }
    .time{
      position: absolute;
      right: .09rem;
      bottom: 0.1rem;
      font-size: 0.2rem;
      color: #fff;
    }
  }
  .list-con{
    .info{
      height: 0.5rem;
      line-height: 0.5rem;
      width: 4.5rem;
    }
  }
}
</style>
