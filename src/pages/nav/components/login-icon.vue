<template>
  <div class="container flex jc-around ai-center border-bottom">
    <ul class="icon-wrapper flex jc-around">
      <li class="icon-list" v-for="item in loginIcons" :key="item.icon">
        <i :class="item.icon"></i>
        <p>{{item.text}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { loginIcons } from '../../../getInfos/getData'
export default {
  name: '',
  data () {
    return {
      loginIcons: []
    }
  },
  methods: {
    getIcons () {
      this.loginIcons = loginIcons()
    }
  },
  mounted () {
    this.getIcons()
  }
}
</script>

<style lang='scss' scoped>
@import '../../../assets/style/_variables.scss';
.container{
  height: 2rem;
  width: 100%;
  ul{
    width: 100%;
    .icon-list{
      text-align: center;
      padding: 0 .1rem;
      i{
        color:$bgcolor;
        font-size: .5rem;
        line-height: $iconWidth * 0.72;
      }
      p{
        font-size: $iconText - 0.04;
      }
    }
  }
}
</style>
