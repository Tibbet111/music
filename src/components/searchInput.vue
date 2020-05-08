<template>
  <div class="wrapper pd23 flex jc-between">
    <i class="iconfont zuojiantou"
       @click="returnPage"></i>
    <input type="text"
      class="search"
      :placeholder="placeholder"
      ref="input"
      autofocus="autofocus"
      v-model.trim="keywords">
    <i v-show="keywords"
      @click="clearInput"
      class="iconfont guanbi"></i>
    <i class="iconfont geshou"></i>
    <!-- 搜索建议 -->
    <div class="floatInfo pd23" v-show="showList">
      <ul>
        <li class="blue border-bottom" @click="searchKey(keywords)">搜索<span class="text">{{keywords}}</span></li>
        <li v-for="item in searchList"
            :key="item.keyword"
            class="item border-bottom flex ai-center"
            @click="searchKey(item.keyword)">
            <i class="iconfont sousuo"></i>
          {{item.keyword}}
        </li>
      </ul>
    </div>
    <div class="mask" v-show="showList" @click="showList=false"></div>
  </div>
</template>

<script>
import Bus from '../utils/Bus'
export default {
  name: '',
  props: {
    keyword: { type: String, default: '' }
  },
  data () {
    return {
      placeholder: '',
      keywords: '',
      showList: false,
      timer: null,
      searchList: []
    }
  },
  watch: {
    keywords (val, oVal) {
      if (this.keywords === this.keyword) {
        this.hideList()
        return
      }
      if (this.keywords.length > 0) {
        this.displayList()
        this.setSearchList(val)
      } else {
        this.hideList()
      }
    },
    keyword: {
      immediate: true,
      handler (nVal, oVal) {
        if (nVal) {
          this.keywords = nVal
        }
      }
    }
  },
  methods: {
    returnPage () {
      this.$router.go(-1)
    },
    clearInput () {
      this.keywords = ''
    },
    displayList () {
      this.showList = true
    },
    hideList () {
      this.showList = false
    },
    async getPlaceHolder () {
      const res = await this.$api.get('/search/default')
      this.placeholder = res.data.data.showKeyword
    },
    async getSuggestList (keyword) {
      const res = await this.$api.get(`/search/suggest?keywords=${keyword}&type=mobile`)
      this.searchList = res.data.result.allMatch
    },
    setSearchList (keyword) {
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }
      this.timer = setTimeout(() => {
        this.getSuggestList(keyword).catch(err => console.log(err.message))
      }, 500)
    },
    // 跳转搜索内容
    searchKey (keyword) {
      this.setHistory(keyword)
      this.hideList()
      this.clearInput()
      this.pushKey(keyword)
      this.$router.push({
        name: 'searchResult',
        params: {
          result: keyword
        }
      })
    },
    setHistory (keyword) {
      const keys = localStorage.getItem('keys') ? localStorage.getItem('keys').split(',') : []
      if (keyword && keys.indexOf(keyword) === -1) {
        keys.unshift(keyword)
        localStorage.setItem('keys', keys)
      }
      Bus.$emit('history', keys)
    },
    // 历史记录搜索
    historySearch () {
      Bus.$on('search', keyword => {
        this.$router.push({
          name: 'searchResult',
          params: {
            result: keyword
          }
        })
      })
    },
    pushKey (keyword) {
      this.$nextTick(() => {
        Bus.$emit('push', keyword)
      })
    }
  },
  mounted () {
    this.setHistory()
  },
  created () {
    // 默认搜索建议
    this.getPlaceHolder().catch(err => console.log(err.message))
    this.historySearch()
  }
}
</script>

<style lang='scss' scoped>
.wrapper{
  height: 0.7rem;
  line-height: 0.7rem;
  .search{
    flex: 1;
    border: none;
    border-bottom: 1px solid #aaa;
    margin-left: 0.3rem;
  }
  .iconfont{
    font-size: 0.5rem;
  }
  .guanbi{
    position: absolute;
    right: 1rem;
  }
  .geshou {
    margin-left: 0.3rem;
  }
  .floatInfo{
    width: 5.7rem;
    position: absolute;
    top: 0.8rem;
    left: 0.7rem;
    box-shadow: 0 2px 10px #aaa;
    background-color: #fff;
    z-index: 2;
    li{
      height: 0.8rem;
      line-height: 0.8rem;
      color: #888;
      .iconfont{
        margin-right: .2rem;
      }
    }
    .blue{
      color: #38f;
      .text{
        margin-left: .2rem;
      }
    }
  }
  .mask{
      position: fixed;
      top: 0.7rem;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: 1;
      opacity: 0;
    }
}
</style>
