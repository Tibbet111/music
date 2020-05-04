<template>
  <div class="container">
      <div class="title flex jc-between ai-center">
        <div class="font">
          <span :class="{active:type == 'newDish'}" @click="type='newDish'">新碟</span>
          <i style="color:#ddd">|</i>
          <span :class="{active:type == 'newSong'}" @click="type='newSong'">新歌</span>
        </div>
        <div class="button">更多新碟</div>
      </div>
      <page-loading style="height:5rem" v-show="load"></page-loading>
      <div class="content flex jc-around" v-show="type==='newDish'">
        <song-card v-for="item in newDish"
        :key="item.id"
        :picUrl="item.picUrl"
        :name="item.name"
        :albumId="item.id"></song-card>
      </div>
      <div class="content flex jc-around" v-show="type==='newSong'">
        <song-card v-for="item in newSongs"
        :key="item.id"
        :picUrl="item.album.picUrl"
        :name="item.name"
        @click.native="beginAudio(item)"></song-card>
      </div>
  </div>
</template>

<script>
import songCard from '../../../components/song-card'
import pageLoading from '../../../components/pageLoading'
import { randomArr } from '../../../utils/randomArr'
import { mapActions } from 'vuex'
export default {
  name: '',
  components: {
    songCard,
    pageLoading
  },
  data () {
    return {
      type: 'newDish',
      newSongs: [],
      newDish: [],
      load: true
    }
  },
  methods: {
    ...mapActions(['addToPlayList']),
    async getNewSong () {
      const res = await this.$api.get('/top/song')
      const arr = res.data.data
      const newSongs = randomArr(arr, 3)
      this.newSongs = newSongs
      this.load = false
    },
    async getNewDish () {
      const res = await this.$api.get('/top/album')
      const arr = res.data.albums
      const newDish = randomArr(arr, 3)
      this.newDish = newDish
      this.load = false
    },
    beginAudio (item) {
      this.addToPlayList(item)
    }
  },
  mounted () {
    this.getNewSong()
    this.getNewDish()
  }
}
</script>

<style lang='scss' scoped>
.container{
  padding: 0.23rem;
  span{
    font-size: 0.24rem;
    &.active{
      font-size: 0.3rem;
      font-weight: 700;
    }
  }
  .button{
    border: 1px solid #ccc;
    border-radius: 1rem;
    padding: 0.1rem 0.1rem 0.1rem 0.13rem;
    font-size: 0.2rem;
    letter-spacing: 0.05rem;
  }
  .content{
    margin-top: .4rem;
  }
}
</style>
