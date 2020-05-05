<template>
  <div class="wrapper">
    <div v-show="!load">
      <div class="wrapper-top flex jc-between ai-center">
        <span class="title">全部</span>
        <span class="filter smallTag">
          <i class="recommend shaixuan"></i> 筛选
        </span>
      </div>
      <div class="img-col flex jc-between">
        <song-card v-for="item in list"
                   :key="item.id"
                   :playCount="item.playCount"
                   :name="item.name"
                   :albumId="item.id"
                   :picUrl="item.coverImgUrl"></song-card>
      </div>
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
      load: true,
      total: 0,
      num: 0
    }
  },
  methods: {
    async getList () {
      if (this.list.length) {
        if (this.num >= this.total) {
          console.log('没有数据了')
          return
        }
        const res = await this.$api.get('/top/playlist/highquality', {
          params: {
            limit: 21,
            before: this.list[this.list.length - 1].updateTime
          }
        })
        this.list = [...this.list, ...res.data.playlists]
        this.num += 21
      } else {
        const res = await this.$api.get('/top/playlist/highquality', {
          params: {
            limit: 21
          }
        })
        this.list = res.data.playlists
        this.load = false
        this.num = 21
        this.total = res.data.total
      }
    },
    moreList () {
      const scrollHeight = document.documentElement.scrollHeight
      const scrollTop = document.documentElement.scrollTop
      const clientHeight = document.documentElement.clientHeight
      if (scrollTop + clientHeight >= scrollHeight - 1) {
        this.getList()
      }
    }
  },
  created () {
    this.getList()
  },
  mounted () {
    window.addEventListener('scroll', this.moreList)
  }
}
</script>

<style lang='scss' scoped>
.wrapper{
  .wrapper-top{
    margin-bottom: .3rem;
    .filter{
      border: 1px solid #ccc;
      border-radius: .4rem;
      padding: 0.02rem;
      .recommend{
        font-size: 0.23rem;
    }
    }
  }
  .img-col{
    flex-wrap: wrap;
  }
}
</style>
