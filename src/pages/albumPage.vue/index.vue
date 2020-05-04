<template>
  <song-list-page
  :title="title"
  :load="load"
  :imgUrl="imgUrl"
  :albumId="Number(albumId)"
  :playCount="albumInfo.playCount"
  :albumTitle="name"
  :author="albumInfo.creator ? albumInfo.creator.nickname : albumInfo.album ? albumInfo.album.artist.name : ''"
  :creatorImgUrl="albumInfo.creator ? albumInfo.creator.avatarUrl : albumInfo.album ? albumInfo.album.artist.picUrl:''"
  :description="albumInfo.description ? albumInfo.description : albumInfo.album ? albumInfo.album.description : ''"
  :commentCount="albumInfo.commentCount ? albumInfo.commentCount : albumInfo.album ? albumInfo.album.info.commentCount : 0"
  :shareCount="albumInfo.shareCount ? albumInfo.shareCount : albumInfo.album ? albumInfo.album.info.shareCount : 0"
  :trackCount="albumInfo.trackCount ? albumInfo.trackCount : albumInfo.album ? albumInfo.album.size : 0"
  :subscribedCount="albumInfo.subscribedCount"
  :isSubIn="albumInfo.subscribed"
  @startPlayAll="startPlay"
  >
  <song-list v-for="(item,index) in albumInfo.tracks || albumInfo.songs"
    :key="item.id"
    :songName="item.name"
    :artists="item.ar"
    :albumName="item.al.name"
    :num="index+1"
    @beginSong="setAudioList(item, index)"
    :nowSong="item.id === playingSong.id"></song-list>
  </song-list-page>
</template>

<script>
import songListPage from '../../components/songListPage'
import songList from '../../components/songList'
import { mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  name: 'albumPage',
  components: {
    songListPage,
    songList
  },
  data () {
    return {
      load: true,
      albumId: 0,
      imgUrl: '',
      name: '',
      title: '歌单',
      albumInfo: {}
    }
  },
  computed: {
    ...mapGetters({
      playingSong: 'PLAYING_SONG'
    })
  },
  methods: {
    ...mapMutations({
      setAlbumId: 'SET_USING_ALBUM_ID'
    }),
    ...mapActions(['selectPlay', 'startPlayAll']),
    setAudioList (item, index) {
      this.selectPlay({
        list: this.albumInfo.tracks || this.albumInfo.songs,
        index
      })
    },
    getParams () {
      this.albumId = this.$route.params.albumId
      this.name = this.$route.params.name
      this.imgUrl = this.$route.params.imgUrl
    },
    // 获取歌单信息
    async getAlbumInfo (id) {
      const res = await this.$api.get(`/playlist/detail?id=${id}`)
      this.load = false
      this.albumInfo = res.data.playlist
    },
    startPlay () {
      this.startPlayAll({
        list: this.albumInfo.tracks || this.albumInfo.songs
      })
    }
  },
  created () {
    this.getParams()
    this.getAlbumInfo(this.albumId)
    this.setAlbumId(this.albumId)
  }
}
</script>

<style lang='scss' scoped>

</style>
