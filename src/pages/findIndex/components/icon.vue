<template>
  <div class="container flex jc-around">
    <icon v-for="item in icons" :key="item.icon" :icons="item" :bgcolor="true" @goPage="goPage(item.linkTo)">
        <span class="today" v-if="item.text === '每日推荐'">{{today}}</span>
    </icon>
  </div>
</template>

<script>
import { findIcons } from '../../../getInfos/getData'
import icon from '../../../components/icon'
export default {
  name: '',
  components: {
    icon
  },
  data () {
    return {
      icons: []
    }
  },
  methods: {
    iniData () {
      this.icons = findIcons()
    },
    goPage (link) {
      if (link === 'personalFm') {

      } else {
        this.$router.push(link)
      }
    }
  },
  mounted () {
    this.iniData()
  },
  computed: {
    today: function () {
      return new Date().getDate()
    }
  }
}
</script>

<style lang='scss' scoped>
.container{
  width: 100%;
  padding: 0.2rem 0 0.3rem;
  height: 2rem;
  .today{
    position: absolute;
    top: 0.09rem;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.2rem;
  }
}
</style>
