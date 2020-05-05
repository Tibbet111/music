<template>
  <div class="wrapper">
    <general-nav @returnPage="returnPage" class="titleFixed">
      <span class="text">排行榜</span>
    </general-nav>
    <page-loading v-show="load"></page-loading>
    <div v-show="!load">
      <div class="title">官方榜</div>
        <idx-card v-for="item in officialIdxList"
                  :key="item.id"
                  :imgUrl="item.coverImgUrl"
                  :tracks="item.tracks"
                  :idx="item.name"
                  :updateTime="item.updateFrequency"
                  @showIdxPage="showIdxPage(item)">
        </idx-card>
      <div class="title">推荐榜</div>
        <div class="img-col flex jc-between">
          <song-card v-for="item in recommendedIdxList"
                     :key="item.id"
                     :picUrl="item.coverImgUrl"
                     :name="item.name"
                     :idx="item.name"
                     @showIdxPage="showIdxPage(item)">
          </song-card>
        </div>
      <div class="title">更多榜单</div>
        <div class="img-col flex jc-between">
          <song-card v-for="item in moreIdxList"
                     :key="item.id"
                     :picUrl="item.coverImgUrl"
                     :name="item.name"
                     :idx="item.name"
                     @showIdxPage="showIdxPage(item)">
          </song-card>
        </div>
    </div>
  </div>
</template>

<script>
import generalNav from '../../components/generalNav'
import pageLoading from '../../components/pageLoading'
import idxCard from '../../components/idxCard'
import songCard from '../../components/song-card'
export default {
  name: '',
  components: {
    generalNav,
    pageLoading,
    idxCard,
    songCard
  },
  data () {
    return {
      load: true,
      officialIdxList: [],
      recommendedIdxList: [],
      moreIdxList: []
    }
  },
  methods: {
    returnPage () {
      this.$router.go(-1)
    },
    async getIdxInfo () {
      const res = await this.$api.get('/toplist/detail')
      this.officialIdxList = res.data.list.slice(0, 4)
      this.recommendedIdxList = res.data.list.slice(4, 10)
      this.moreIdxList = res.data.list.slice(10)
      this.load = false
    },
    showIdxPage (item) {
      this.$router.push({
        name: 'albumPage',
        params: {
          albumId: item.id,
          imgUrl: item.coverImgUrl,
          name: item.name
        }
      })
    }
  },
  created () {
    this.getIdxInfo()
  }
}
</script>

<style lang='scss' scoped>
.wrapper{
  padding: 0 .23rem;
  .titleFixed{
    position: sticky;
    left: 0;
    top: 0;
    z-index: 9;
    background-color: #fff;
    .text{
      font-size: 0.4rem;
    }
  }
  .title{
    font-weight: 700;
    height: 1rem;
    line-height: 1rem;
  }
  .img-col{
    flex-wrap: wrap;
  }
}
</style>
