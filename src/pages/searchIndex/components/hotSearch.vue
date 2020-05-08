<template>
  <div class="hot-search pd23">
    <p class="title">热搜榜</p>
    <ul>
      <li class="search-list flex"
          v-for="(item,index) in hotSearchList"
          :key="item.content"
          @click="search(item.searchWord)">
          <span class="num">{{index+1}}</span>
          <div class="song-info">
            <div class="song-title flex">
              <p class="name">{{item.searchWord}}</p>
              <span class="num">{{item.score}}</span>
              <img v-if="item.iconUrl"
                   class="png"
                   :src="item.iconUrl">
            </div>
            <div class="introduce">{{item.content}}</div>
          </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      hotSearchList: []
    }
  },
  methods: {
    async getHotSearchList () {
      const res = await this.$api.get('/search/hot/detail')
      this.hotSearchList = res.data.data
      this.$emit('stopLoading', false)
    },
    search (keyword) {
      this.$emit('search', keyword)
    }
  },
  created () {
    this.getHotSearchList().catch(err => err)
  }
}
</script>

<style lang='scss' scoped>
@import '../../../assets/style/_variables.scss';
.hot-search{
  margin-top: 0.6rem;
  .search-list{
    margin: 0.2rem 0;
    &:nth-child(1) >.num,&:nth-child(2) >.num,&:nth-child(3) >.num{
      color: $bgcolor;
    }
    >.num {
      font-size: 0.26rem;
      line-height: 1rem;
    }
    .song-info{
      flex: 1;
      margin-left: .5rem;
      .song-title{
        line-height: 0.6rem;
        .name{
          margin-right: 0.1rem;
        }
        .num{
          color: #aaa;
          font-size: 0.24rem;
        }
        .png{
          margin-left: 0.2rem;
          height: 0.2rem;
          margin-top: 0.2rem;
        }
      }
    }
    .introduce{
      font-size: 0.23rem;
      color: #aaa;
    }
  }
}
</style>
