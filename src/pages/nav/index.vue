<template>
  <div>
    <nav class="nav-wrapper flex">
      <div class="nav-left" @click="SHOW_LOGIN">
        <i class="nav iconnav ripple"></i>
      </div>
      <ul class="nav-center flex jc-around">
          <router-link tag="li"
          v-for="item in menu"
          :key="item.title"
          :to="item.path"
          :class="{active:$route.path===item.path}">{{item.title}}</router-link>
      </ul>
      <div class="nav-right flex jc-end">
        <i class="nav iconsousuo ripple"></i>
      </div>
    </nav>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <login-page></login-page>
  </div>
</template>

<script>
import loginPage from './components/loginPage'
import { mapMutations } from 'vuex'
export default {
  name: '',
  components: {
    loginPage
  },
  data () {
    return {
      menu: [
        { title: '我的', path: '/my' },
        { title: '发现', path: '/find' },
        { title: '朋友', path: '/friend' },
        { title: '视频', path: '/video' }
      ]
    }
  },
  methods: {
    ...mapMutations(['SHOW_LOGIN'])
  }
}
</script>

<style lang="scss" scoped>
@import url("//at.alicdn.com/t/font_1298894_8b2aso7zegl.css");
.nav-wrapper {
  padding: 0 0.3rem;
  height: 1rem;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 20;
  background-color: #fff;
  .nav-right {
    flex: 2;
  }
  .nav-center {
    flex: 6;
    li {
      color: #999999;
    }
    .active {
      transform: scale(1.3);
      font-weight: 400;
      color: #000000;
    }
  }
  .nav-left {
    flex: 2;
  }
}
.nav{
  font-size: .4rem;
}
</style>
