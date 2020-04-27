<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <swiper></swiper>
      <icon></icon>
      <song-list ref="songList"></song-list>
      <new-song></new-song>
    </van-pull-refresh>
  </div>
</template>

<script>
import swiper from './components/swipe'
import icon from './components/icon'
import songList from './components/songList'
import newSong from './components/newSong'
import { Toast } from 'vant'
export default {
  name: '',
  components: {
    swiper,
    icon,
    songList,
    newSong
  },
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    onRefresh () {
      this.$refs.songList.getAlbum()
      setTimeout(() => {
        Toast('刷新成功')
        this.isLoading = false
      }, 500)
    }
  }
}
</script>

<style lang='scss' scoped>
@import url("//at.alicdn.com/t/font_1295705_yfxum6q2gip.css");
</style>
