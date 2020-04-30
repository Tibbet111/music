<template>
  <div class="container">
      <div class="title flex jc-between ai-center">
          <div class="font">推荐歌单</div>
          <div class="button">歌单广场</div>
      </div>
      <page-loading style="height:5rem" v-show="load"></page-loading>
      <div class="content flex jc-around">
        <song-card v-for="item in playList"
        :key="item.id"
        :picUrl="item.picUrl"
        :name="item.name"
        :playCount="item.playCount"
        :albumId="item.id"></song-card>
      </div>
  </div>
</template>

<script>
import pageLoading from '../../../components/pageLoading'
import songCard from '../../../components/song-card'
export default {
  name: '',
  components: {
    pageLoading,
    songCard
  },
  data () {
    return {
      load: true,
      playList: []
    }
  },
  methods: {
    async getAlbum () {
      const res = await this.$api.get('/personalized?limit=6')
      this.playList = res.data.result
      this.load = false
    }
  },
  mounted () {
    this.getAlbum()
  }
}
</script>

<style lang='scss' scoped>
@import url("//at.alicdn.com/t/font_1396631_tp8pq8axas.css");
.container{
    border-top: 1px solid #eaeaea;
    padding: 0 0.23rem;
    .title{
        height: 1.2rem;
        .font{
            font-size: 0.3rem;
            font-weight: 700;
        }
        .button{
            border: 1px solid #ccc;
            border-radius: 1rem;
            padding: 0.1rem 0.1rem 0.1rem 0.13rem;
            font-size: 0.2rem;
            letter-spacing: 0.05rem;
        }
    }
    .content{
      flex-wrap: wrap;
      width: 100%;
    }
}
</style>
