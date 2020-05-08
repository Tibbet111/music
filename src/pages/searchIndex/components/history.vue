<template>
  <div class="history pd23" v-if="history.length">
    <div class="history-title flex jc-between">
      <span>历史记录</span>
      <i class="search iconlajitong"
         @click="clearHistory"></i>
    </div>
    <div class="wrapper">
      <div class="container">
        <ul class="icon-group flex ai-center">
          <li class="icon-list flex ai-center jc-center"
          v-for="(item,index) in history"
          :key="index"
          @click="toSearch(item)">{{item}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Bus from '../../../utils/Bus'
export default {
  name: '',
  data () {
    return {
      history: []
    }
  },
  methods: {
    getHistory () {
      Bus.$on('history', history => {
        this.history = history
      })
    },
    clearHistory () {
      localStorage.removeItem('keys')
      this.history = []
    },
    toSearch (item) {
      Bus.$emit('search', item)
    }
  },
  created () {
    this.getHistory()
  }
}
</script>

<style lang='scss' scoped>
.history{
  margin-top: 0.3rem;
  .history-title{
    height: 0.8rem;
    line-height: 0.8rem;
    .iconlajitong{
      font-size: 0.4rem;
    }
  }
  .wrapper{
    height: 0.5rem;
    overflow: hidden;
    .container{
      overflow-x: scroll;
      &::-webkit-scrollbar{display: none;}
      .icon-group{
        height: 0.5rem;
        white-space: nowrap;
        flex-wrap: nowrap;
        width: auto;
        .icon-list{
          background: #eee;
          margin-right: .3rem;
          padding: .15rem;
          height: 0.44rem;
          border-radius: .5rem;
          font-size: small;
        }
      }
    }
  }
}
</style>
