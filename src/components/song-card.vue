<template>
  <div style="width:30%">
        <div class="playlist">
          <span class="tag" v-if="playCount">
           <i class="card cardbofang"></i>
            {{playCount | setPlayCount}}
          </span>
          <div class="shadow"></div>
          <img :src="picUrl">
          <p class="twoLinesEllipsis">{{name}}</p>
        </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    playCount: { type: Number },
    name: { type: String },
    picUrl: { type: String }
  },
  data () {
    return {
    }
  },
  filters: {
    setPlayCount (val) {
      if (!val) {
        return ''
      }
      if (val > 100000000) {
        val = ((val / 100000000).toFixed(1)) + '亿'
        return val
      } else if (val > 10000) {
        val = Math.ceil(val / 10000) + '万'
        return val
      }
    }
  },
  methods: {
  }
}
</script>

<style lang='scss' scoped>
      .playlist{
        position: relative;
        .tag{
          position: absolute;
          color: #fff;
          right: 0.1rem;
          top: .1rem;
          font-size: 0.2rem;
          i{
            font-size: 0.2rem;
          }
        }
        .shadow{
          position: absolute;
          height: 2.1rem;
          width: 100%;
          box-shadow: 0 15px 21px -9px#999999 inset;
          border-radius: .2rem;
        }
        img{
          width: 100%;
          border-radius: .2rem;
        }
        p{
          margin: .2rem 0;
          letter-spacing: 1px;
          font-style: 0.23rem;
          line-height: 0.3rem;
        }
      }
</style>
