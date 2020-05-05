<template>
  <div class="wrapper">
    <div class="img-col flex jc-between" v-show="!load">
      <song-card v-for="item in list"
                 :key="item.id"
                 :playCount="item.playCount"
                 :picUrl="item.coverImgUrl"
                 :albumId="item.id"
                 :name="item.name"></song-card>
    </div>
    <page-loading v-show="load"></page-loading>
  </div>
</template>

<script>
import songCard from '../../../components/song-card'
import pageLoading from '../../../components/pageLoading'
export default {
  name: '',
  components: {
    songCard,
    pageLoading
  },
  data () {
    return {
      list: [],
      load: true
    }
  },
  methods: {
    async getListInfo () {
      const res = await this.$api.get('/top/playlist', {
        params: {
          limit: 30,
          order: 'hot'
        }
      })
      this.list = res.data.playlists
      this.load = false
    }
  },
  created () {
    this.getListInfo()
  }
}
</script>

<style lang='scss' scoped>
  .wrapper{
    .img-col{
      flex-wrap: wrap;
    }
  }
</style>
