<template>
  <div class="wrapper" @scroll="scrollList">
    <!-- 头部 -->
    <div class="container-top" :style="{height}">
      <div class="blur-bg" :style="{backgroundImage:`url(${imgUrl})`}"></div>
      <!-- 通过isAlbum判断是否是歌单，分别出标题滚动隐藏，每日推荐的导航 -->
      <global-nav v-if="!isAlbum"
      class="fixed"
      :imgUrl="imgUrl"
      :opacity="opacity"
      @returnPage="returnPage">
      <span v-show="listFixed">{{iTitle}}</span>
      </global-nav>
      <!-- 歌单导航 -->
      <global-nav v-if="isAlbum"
      class="fixed"
      :imgUrl="imgUrl"
      :opacity="opacity"
      @returnPage="returnPage">
      <span>{{iTitle}}</span>
      </global-nav>
      <!-- 每日推荐日期 -->
      <div class="date" v-if="!isAlbum">
        <span class="day">{{day}}</span>
        <span class="month">{{month}}</span>
      </div>
      <div class="info" v-if="!isAlbum">查收属于您的今日推荐</div>
      <!-- 歌单页面图像，作者介绍等 -->
      <div class="album-info" v-if="isAlbum">
        <div class="info-top flex jc-between">
          <div class="img-info">
            <img v-lazy="imgUrl">
            <span class="play-count">
            <i class="date-song bofang"></i>
            {{playCount|setPlay}}
            </span>
          </div>
          <div class="info-con">
            <p class="album-name twoLinesEllipsis">{{albumTitle}}</p>
            <div class="creator">
              <div class="img-info">
                <img v-lazy="creatorImgUrl">
              </div>
              <span>{{author}}
                <i class="date-song iconfontjiantou5"></i>
              </span>
            </div>
            <div class="desc-wrapper flex ai-center" v-if="description">
              <span class="desc twoLinesEllipsis">{{description}}</span>
              <i class="date-song iconfontjiantou5"></i>
            </div>
          </div>
        </div>
        <!-- 收藏评论 -->
        <div class="icons flex jc-around ai-center">
          <div class="comments" @click="goComments">
            <i class="date-song pinglun"></i>
            <span>{{commentCount|setCom}}</span>
          </div>
          <div class="comments">
            <i class="date-song fenxiang"></i>
            <span>{{shareCount|setShare}}</span>
          </div>
          <div class="comments">
            <i class="date-song xiazai"></i>
            <span>下载</span>
          </div>
          <div class="comments">
            <i class="date-song duoxuankuang"></i>
            <span>多选</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 一些标题选项 -->
    <div class="container-title flex jc-between ai-center" :class="listFixed?'listFixed':''">
      <span>
        <i class="date-song cbofang"></i>
          播放全部
        <span class="count" v-if="isAlbum">(共{{trackCount}}首)</span>
      </span>
      <span v-if="!isAlbum">
        <i class="date-song caidan"></i>
          多选
      </span>
      <!-- 收藏按钮 -->
      <div class="collection" v-if="isAlbum"
      :class="{'bg' : !isSubInItem}"
      ref="collection">
        <span v-show="!isSubInItem" @click="addCollection">+收藏({{subscribedCountItem|setCol}})</span>
        <span v-show="isSubInItem" @click="deleteCollection">
          <i class="date-song wenjianjia"></i>
          {{subscribedCountItem | setCol}}
        </span>
      </div>
    </div>
    <!-- 内容 -->
    <div class="container-content"
    :style="[{'marginTop' : top}]"
    v-show="!load">
      <slot></slot>
    </div>
    <page-loading v-show="load"></page-loading>
  </div>
</template>

<script>
import globalNav from './generalNav'
import pageLoading from './pageLoading'
const REM = document.body.clientWidth * 0.14
const setNum = function (val) {
  if (!val) {
    return ''
  }
  if (val > 100000000) {
    val = ((val / 100000000).toFixed(1)) + '亿'
  } else if (val > 10000) {
    val = ((val / 10000).toFixed(1)) + '万'
  }
  return val
}
export default {
  name: '',
  components: {
    globalNav,
    pageLoading
  },
  props: {
    height: { type: String, default: '6rem' },
    imgUrl: { type: String },
    title: { type: String },
    isAlbum: { type: Boolean, default: true },
    load: { type: Boolean },
    albumId: { type: Number },
    playCount: { type: Number },
    albumTitle: { type: String },
    author: { type: String },
    creatorImgUrl: { type: String },
    description: { type: String },
    commentCount: { type: Number },
    shareCount: { type: Number },
    trackCount: { type: Number },
    subscribedCount: { type: Number },
    isSubIn: { type: Boolean }
  },
  data () {
    return {
      iTitle: this.title,
      opacity: '0',
      top: '0',
      listFixed: false,
      isSubInItem: false,
      subscribedCountItem: 0
    }
  },
  filters: {
    setPlay (val) {
      return setNum(val)
    },
    setCom (val) {
      if (!val) {
        return '评论'
      }
      return setNum(val)
    },
    setShare (val) {
      if (!val) {
        return '分享'
      }
      return setNum(val)
    },
    setCol (val) {
      return setNum(val)
    }
  },
  watch: {
    title (val) {
      this.iTitle = val
    },
    subscribedCount (val) {
      this.subscribedCountItem = val
      if (val === 0 || !val) {
        this.$refs.collection.style.display = 'none'
      } else {
        this.$refs.collection.style.display = 'block'
      }
    },
    isSubIn (val) {
      this.isSubInItem = val
    }
  },
  methods: {
    returnPage () {
      this.$router.go(-1)
    },
    goComments () {
      this.$router.push({
        path: '/comments',
        query: {
          playlistId: this.albumId,
          title: this.albumTitle,
          author: this.author,
          imgUrl: this.imgUrl
        }
      })
    },
    async addCollection () {
      const id = this.albumId
      // eslint-disable-next-line no-unused-vars
      const res = await this.$api.get('/playlist/subscribe', {
        params: {
          t: 1,
          id
        }
      })
      this.isSubInItem = true
      ++this.subscribedCountItem
    },
    async deleteCollection () {
      const id = this.albumId
      // eslint-disable-next-line no-unused-vars
      const res = await this.$api.get('/playlist/subscribe', {
        params: {
          t: 2,
          id
        }
      })
      this.isSubInItem = false
      --this.subscribedCountItem
    },
    scrollList (e) {
      const top = e.target.scrollTop
      // 若当前不是唱片
      if (!this.isAlbum) {
        this.opacity = this.opacity <= 1 ? top / (2.6 * REM) + '' : ''
        if (top >= 136) {
          this.listFixed = true
          this.top = '1rem'
        } else {
          this.listFixed = false
          this.top = '0'
        }
      } else {
        // 是唱片,滚动式标题改变
        this.opacity = this.opacity <= 1 ? top / (5 * REM) + '' : '1'
        if (top >= 2.6 * REM) {
          this.iTitle = this.albumTitle
        } else {
          this.iTitle = this.title
        }
        if (top >= 5 * REM) {
          this.listFixed = true
          this.top = '1rem'
        } else {
          this.listFixed = false
          this.top = '0'
        }
      }
    }
  },
  computed: {
    day () {
      const date = new Date()
      return date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    },
    month () {
      const date = new Date()
      return date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    }
  }
}
</script>

<style lang='scss' scoped>
@import url("//at.alicdn.com/t/font_1394963_t6jt71rtm9.css");
.wrapper{
  height: 100vh;
  width: 100%;
  overflow-y: scroll;
  .container-top{
    width: 100%;
    color: #fff;
    position: relative;
    overflow: hidden;
    background-color: rgba(0, 0, 0, .5);
    .blur-bg{
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: -1;
      filter: blur(50px);
      background-position: center;
      background-size: cover;
    }
    .fixed{
      position: fixed;
      width: 100%;
      z-index: 9;
      top: 0;
      padding: 0 0.23rem;
      border-bottom:none;
      span{
        padding-left: .1rem;
        font-size: .3rem;
        font-weight: 600;
        vertical-align:.1rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .album-info{
      padding: 1.5rem .23rem 0 .23rem;
      .info-top{
        height: 3rem;
        overflow: hidden;
        .img-info{
          width: 2.6rem;
          height: 2.6rem;
          border-radius: 0.11rem;
          position: relative;
          overflow: hidden;
          img{
            width: 2.6rem;
            height: 2.6rem;
          }
          .play-count{
            position: absolute;
            top: 0.1rem;
            right: 0.1rem;
            .bofang{
              font-size: 0.24rem;
            }
          }
        }
        .info-con{
          width: 3.6rem;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          .album-name{
            font-size: 0.36rem;
            line-height: 1.5;
          }
          .creator{
            height: 1rem;
            color: #ccc;
            display: flex;
            align-items: center;
            .img-info{
              width: 0.6rem;
              height: 0.6rem;
              margin-right: 0.4rem;
              border-radius: 50%;
              overflow: hidden;
              img{
                width: 0.6rem;
                height: 0.6rem;
              }
            }
          }
          .desc-wrapper{
            color: #ccc;
            .desc{
              width: 3rem;
            }
          }
        }
      }
      .icons{
        margin-top: .2rem;
        .comments{
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          .date-song{
            font-size: .4rem;
            margin-bottom: .2rem;
          }
        }
      }
    }
    .date{
      padding: 0 .23rem;
      padding-top: 1.5rem;
      .day{
        font-size: .7rem;
      }
      .month{
        font-size: .4rem;
        color: #c8d6e5;
        &:before{
          content: '/';
        }
      }
    }
    .info{
      padding: 0 .23rem;
      margin-top: .7rem;
    }
  }
  .container-title{
    padding: 0 .23rem;
    height: 1rem;
    background: #fff;
    font-size: .3rem;
    line-height: 1rem;
    &.listFixed{
      position: fixed;
      width: 100%;
      z-index: 9;
      top: 1rem;
    }
    span{
      font-size: .3rem;
      line-height: 1rem;
    }
    .count{
      color: #999;
      font-size: small;
    }
    .collection{
      padding: 0 .23rem;
      font-size: smaller;
      border-radius: 0.4rem;
      color: #999;
      height: 0.6rem;
      line-height: 0.1rem;
      span{
        line-height: 0.6rem;
      }
      &.bg{
        background: linear-gradient(to bottom, #ff1a00 19%, #ff1a00 50%);
        color: #fff;
      }
    }
  }
  .container-content{
    position: relative;
    z-index: 4;
    width: 100%;
    padding: .1rem .23rem;
    background-color: #fff;
  }
}
</style>
