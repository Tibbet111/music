<template>
  <div class="wrapper">
    <general-nav @returnPage="returnPage" class="nav">
      <span class="text">歌单广场</span>
    </general-nav>
    <nav-list :list="list" class="fix"></nav-list>
    <keep-alive>
      <router-view class="content"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import generalNav from '../../components/generalNav'
import navList from '../../components/navList'
export default {
  name: '',
  components: {
    generalNav,
    navList
  },
  data () {
    return {
      list: [
        {
          text: '推荐',
          path: '/recommend'
        }, {
          text: '精品',
          path: '/fine'
        }, {
          text: '欧美',
          path: '/general'
        }, {
          text: '电子',
          path: '/general'
        }, {
          text: '民谣',
          path: '/general'
        }, {
          text: '轻音乐',
          path: '/general'
        }, {
          text: '韩语',
          path: '/general'
        }
      ]
    }
  },
  methods: {
    returnPage () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang='scss' scoped>
.wrapper{
  .fix{
    position: sticky;
    top: 1rem;
    left: 0;
    z-index: 9;
  }
  .nav{
    padding: 0 .23rem;
    position: sticky;
    top:0;
    left: 0;
    z-index: 9;
    background: #fff;
    .text{
      font-size: 0.4rem;
      vertical-align: 5px;
    }
  }
  .content{
    padding: 0 .23rem;
    margin-top: .4rem;
  }
}
</style>
