<template>
    <song-list-page
    :imgUrl='pic'
    height="3.6rem"
    title="每日推荐"
    :isAlbum="false"
    :load="load"
    @startPlayAll="startPlay">
    <song-list v-for="(item,index) in songList"
    :key="item.id"
    :artists="item.artists"
    :songName="item.name"
    :songImg="item.album.picUrl"
    :albumName="item.album.name"
    :transName="item.transName"
    @beginSong="setAudioList(item, index)"
    :nowSong="item.id === playingSong.id"></song-list>
    <should-login v-show="isLogin == 0"></should-login>
    </song-list-page>
</template>

<script>
import songListPage from '../../components/songListPage'
import songList from '../../components/songList'
import shouldLogin from '../../components/shouldLogin'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: '',
  components: {
    songListPage,
    shouldLogin,
    songList
  },
  data () {
    return {
      songList: [],
      pic: '',
      load: ''
    }
  },
  methods: {
    ...mapActions(['selectPlay', 'startPlayAll']),
    getRecSongs () {
      // eslint-disable-next-line eqeqeq
      if (Number(this.isLogin) !== 0) {
        this.$api.get('/recommend/songs').then(res => {
          this.songList = res.data.recommend
          this.pic = res.data.recommend[0].album.picUrl
          this.load = false
        // eslint-disable-next-line handle-callback-err
        }).catch(err => {
          this.load = false
        })
      } else {
        this.load = false
      }
    },
    setAudioList (item, index) {
      this.selectPlay({
        list: this.songList,
        index
      })
    },
    startPlay () {
      this.startPlayAll({
        list: this.songList
      })
    }
  },
  computed: {
    ...mapGetters({
      isLogin: 'LOGIN_STATE',
      playingSong: 'PLAYING_SONG'
    })
  },
  created () {
    this.getRecSongs()
  }
}
</script>

<style lang='scss' scoped>

</style>
