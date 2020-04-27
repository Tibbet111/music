<template>
  <div>
    <div class="swiper-container">
      <van-swipe :autoplay="3000" indicator-color="#dd001b">
        <van-swipe-item v-for="(item) in swiperList" :key="item.bannerId">
          <img v-lazy="item.pic">
          <span class="title"
              :style="{background:item.titleColor}">{{item.typeTitle}}</span>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      swiperList: []
    }
  },
  methods: {
    async getSwiper () {
      const res = await this.$api.get('/banner?type=1')
      this.swiperList = res.data.banners
    }
  },
  created () {
    this.getSwiper()
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/style/_variables.scss';
.swiper-container{
  padding: 0.2rem;
  height: 0;
  width: 100%;
  padding-bottom: 40%;
  overflow: hidden;
  img{
    height: 100%;
    width: 100%;
    border-radius: $imgBorderRadius;
  }
  .title{
    position: absolute;
    right: 0.02rem;
    bottom: 0.05rem;
    color: #fff;
    font-size: smaller;
    padding: 3px 6px;
    opacity: .8;
    border-top-left-radius: $imgBorderRadius;
  }
}
</style>
