<template>
  <div :style="[playList.length>0?{paddingBottom:'1rem'}:{}]">
    <search-input ref="search"></search-input>
    <history></history>
    <hot-search @stopLoading="stopLoading"
                @search="search"
                v-show="!loading"></hot-search>
    <page-loading v-show="loading"></page-loading>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import searchInput from '../../components/searchInput'
import history from './components/history'
import hotSearch from './components/hotSearch'
import pageLoading from '../../components/pageLoading'
export default {
  name: '',
  components: {
    searchInput,
    history,
    hotSearch,
    pageLoading
  },
  data () {
    return {
      loading: true
    }
  },
  computed: {
    ...mapGetters({
      playList: 'AUDIO_LIST'
    })
  },
  methods: {
    stopLoading () {
      this.loading = false
    },
    search (keyword) {
      if (keyword) {
        this.$refs.search.searchKey(keyword)
      }
    }
  }
}
</script>

<style lang='scss' scoped>
@import url("http://at.alicdn.com/t/font_1379594_vh7eh105cbo.css");
@import url('http://at.alicdn.com/t/font_1371990_3libmbu82og.css')
</style>
