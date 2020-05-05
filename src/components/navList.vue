<template>
  <div class="wrapper flex ai-center" ref="navs">
    <ul>
      <router-link v-for="item in list"
                   :key="item.text"
                   tag="li"
                   class="nav-list"
                   replace
                   exact
                   :to="item.text | setPage">{{item.text}}</router-link>
    </ul>
    <span class="more">
      <i class="recommend ziyuanxhdpi"></i>
    </span>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    list: { type: Array }
  },
  filters: {
    setPage: function (val) {
      if (val) {
        if (val === '推荐') {
          val = '/recommend'
        } else if (val === '精品') {
          val = '/quality'
        } else {
          val = `/general/${val}`
        }
      }
      return val
    }
  },
  data () {
    return {
    }
  },
  methods: {}
}
</script>

<style lang='scss' scoped>
@import url("//at.alicdn.com/t/font_1396524_tr1owjj5u5.css");
@import '../assets/style/_variables.scss';
.wrapper{
  padding: 0 .23rem;
  border-bottom: 1px solid #ddd;
  background: #fff;
  ul{
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    margin-top: 0.16rem;
    position: relative;
    height: 0.8rem;
    &::-webkit-scrollbar{display: none;}
    .nav-list{
      min-width: 1.2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 0.2rem;
      height: 0.75rem;
      color: #000;
      position: relative;
      &::before{
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        margin: 0 auto;
        height: 100%;
        width: 0;
        border-bottom: 2px solid $bgcolor;
        transition: width .5s ease;
      }
      &.router-link-active {
        color: $bgcolor;
      }
      &.router-link-active::before{
        width: 100%;
      }
    }
  }
  .more{
    padding-top: .1rem;
    .recommend {
      font-size: 0.4rem;
    }
  }
}
</style>
