<template>
  <div class="audioPage">
    <transition name="audio">
      <div class="full" v-show="isFull">
      <audio-nav class="color" height="0" @returnPage="close">
        <scroll-text :name="name" :artist="artist"></scroll-text>
      </audio-nav>
      <playing :imgUrl="imgUrl" v-show="playingShow"  @click.native="setPlayingShow(false)"></playing>
      <lyric-page :lyricArray="ruleLyric"
                  :nowLyricIndex="nowLyricIndex"
                  ref="lyric"
                  :noLyric="noLyric"
                  :noLyricText="noLyricText"
                  v-show="!playingShow"
                  @click.native="setPlayingShow(true)"></lyric-page>
      <play-icons :isLike="isLike" @update_isLike="update_isLike"></play-icons>
      <bar
           :allTime="allTime"
           :time="playTime"
           :width="progressWidth"
           @time="changeTime"></bar>
      <function-button @play="toggle"
                       @prev="prevSong"
                       @next="nextSong"
                       @changeMode="changeMode"
                       :mode="mode"
                       @showAudioList="showAudioList"></function-button>
    </div>
    </transition>
    <audio-list :isShowAudioList="isShowAudioList"
                @showAudioList="showAudioList"
                :num="playList.length"
                :mode="mode"
                @changeMode="changeMode"
                @empty="empty"></audio-list>
    <small-audio v-show="!isFull"
           :imgUrl="imgUrl"
           :name="name"
           :artist="artist"
           :albumName="albumName"
           :lyric="nowLyric"
           @returnFull="returnFull"
           @play="toggle"></small-audio>
    <audio ref="audio"
    :src="url"
    autoplay
    @canplay="ready"
    @error="error"
    preload="auto"
    @ended="end"></audio>
  </div>
</template>

<script>
import audioNav from '../../components/generalNav'
import scrollText from '../../components/scrollText'
import playing from './components/playing'
import playIcons from './components/playIcons'
import bar from './components/bar'
import functionButton from './components/functionButton'
import lyricPage from './components/lyricPage'
import smallAudio from './components/small'
import audioList from './components/audioList';
import { randomArr } from '../../utils/randomArr.js'
import { mapGetters, mapMutations } from 'vuex'
export default {
  components: {
    audioNav,
    scrollText,
    playing,
    bar,
    playIcons,
    lyricPage,
    functionButton,
    smallAudio,
    audioList
  },
  name: '',
  data () {
    return {
      url: '',
      playTime: '00:00',
      allTime: 0,
      progressWidth: 0,
      artist: [],
      imgUrl: '',
      albumName: '',
      readySong: false,
      canSong: true,
      name: '',
      lyric: '',
      nowLyric: '',
      nowLyricIndex: -1,
      ruleLyric: [],
      noLyric: false,
      isShowAudioList: false,
      noLyricText: '',
      isLike: false,
      oldSong: {}
    }
  },
  computed: {
    ...mapGetters({
      status: 'PLAY_STATUS',
      list: 'AUDIO_LIST',
      mode: 'MODE',
      playList: 'PLAT_LIST',
      playingShow: 'PLAYING_SHOW',
      offsetLyric: 'OFFSET_LYRIC',
      isFull: 'FULLSCREEN',
      index: 'PLATING_INDEX',
      playingSong: 'PLAYING_SONG'
    })
  },
  watch: {
    playingSong (val, oldVal) {
      this.oldSong = oldVal
      this.artist = val.album ? val.album.artists : val.ar ? val.ar : ''
      this.name = this.setName(val.name)
      this.allTime = val.duration ? val.duration : val.dt ? val.dt : 0
      this.albumName = val.al ? val.al.name : val.album ? val.album.name : ''
      this.imgUrl = val.album
        ? val.album.picUrl
        : val.al
          ? val.al.picUrl
          : val.album
            ? val.album.artist.img1v1Url : val.coverUrl ? val.coverUrl : ''
      this.checkSong(val.id)
    },
    'platList.length': function (nVal) {
      if (!nVal) {
        this.isShowAudioList = false
      }
    }
  },
  methods: {
    ...mapMutations({
      setFull: 'SET_FULLSCREEN',
      setPlayingShow: 'SET_PLAYING_SHOW',
      setStatus: 'SET_PLAY_STATUS',
      setIndex: 'SET_PLAYING_INDEX',
      setMode: 'SET_AUDIO_MODE',
      setPlayList: 'SET_PLAY_LIST',
      setAudioList: 'SET_AUDIO_LIST'
    }),
    update_isLike (val) {
      this.isLike = val
    },
    close () {
      this.setFull(false)
    },
    setName (val) {
      const reg = /<\/?.+?\/?>/g
      val = val.replace(reg, '')
      return val
    },
    // 恢复全屏
    returnFull () {
      this.setFull(true)
    },
    // 看该歌曲是否能播放
    async checkSong (id) {
      const res = await this.$api.get(`/check/music?id=${id}`)
      if (res.data.success) {
        this.canSong = true
        this.getSongUrl(id)
        this.getSongLyric(id)
      } else {
        console.log('该音乐暂时无法播放')
      }
    },
    // 获取歌曲URL
    async getSongUrl (id) {
      const res = await this.$api.get(`/song/url?id=${id}`)
      if (res.data.code === 200 && res.data.data[0].url) {
        this.url = res.data.data[0].url
        this.audioTimeUpdate()
        this.toPlay()
      } else {
        const index = this.playList.findIndex(item => {
          return item.id === this.oldSong.id
        })
        this.setIndex(index)
      }
    },
    // 获取歌曲歌词
    async getSongLyric (id) {
      const res = await this.$api.get(`/lyric?id=${id}`)
      if (res.data.nolyric) {
        this.ruleLyric = []
        this.nowLyric = ''
        this.noLyric = true
        this.noLyricText = '纯音乐，请欣赏'
        return
      }
      this.noLyric = false
      this.lyric = res.data.lrc.lyric
      if (!this.lyric.trim()) {
        // 没有歌词
        this.noLyricText = '暂时没有歌词'
        this.ruleLyric = []
        this.nowLyric = ''
        this.noLyric = true
        return
      }
      this.ruleLyric = this.createLrcArray(this.lyric)
    },
    // 创建歌词数组，通过换行符分隔 {time: , word: }
    createLrcArray (lyric) {
      const parts = lyric.split('\n')
      parts.pop()
      const lyricArray = []
      parts.forEach(item => {
        const temp = this.changeToObject(item)
        if (temp.words) {
          lyricArray.push(temp)
        }
      })
      return lyricArray
    },
    changeToObject (item) {
      const words = item.split(']')[1]
      const reg = /\w{0,}:\w{0,}.\w{0,}/g
      let timeArray = reg.exec(item)
      if (!timeArray) {
        return
      }
      timeArray = timeArray[0].split(':')
      const min = parseInt(timeArray[0]) // 分钟
      const sec = parseFloat(timeArray[1]) // 秒
      const time = min * 60 + sec
      return {
        time,
        words
      }
    },
    // 添加歌曲时间更新事件
    audioTimeUpdate () {
      this.$refs.audio.removeEventListener('timeupdate', this.setTime)
      this.$refs.audio.addEventListener('timeupdate', this.setTime)
    },
    // 设置播放时长
    setTime () {
      const audio = this.$refs.audio
      const min = Math.floor(audio.currentTime / 60)
      const sec = Math.floor(audio.currentTime - min * 60)
      let minVal, secVal
      // 小于十分钟加上0
      if (min < 10) {
        minVal = '0' + min
      } else {
        minVal = min
      }
      // 秒数
      if (sec < 10) {
        secVal = '0' + sec
      } else {
        secVal = sec
      }
      // 时间拼接展示
      this.playTime = minVal + ':' + secVal
      const braLength = audio.currentTime / audio.duration * 100
      this.setProgress(braLength)
      // 倘若有歌词设置偏移
      if (!this.noLyric) {
        const playTime = audio.currentTime + this.offsetLyric
        const index = this.getCurrentIndex(playTime, this.ruleLyric)
        this.nowLyricIndex = index
        // 设置歌词显示
        this.showLyric(index, this.ruleLyric)
        // 设置歌词页面的显示规则,传入当前歌词索引信息
        this.$refs.lyric.setScroll(this.nowLyricIndex)
      }
    },
    // 获取当前歌词索引
    getCurrentIndex (time, lyricArray) {
      for (let i = lyricArray.length - 1; i >= 0; i--) {
        const element = lyricArray[i].time
        if (time > element) {
          return i
        }
        if (!element) {
          return -1
        }
      }
      return -1
    },
    // 设置当前歌词显示信息
    showLyric (index, array) {
      if (index !== -1) {
        const words = array[index].words
        this.nowLyric = words
      }
    },
    // 设置进度条长度
    setProgress (val) {
      if (val < 0 || val > 100) {
        return
      }
      this.progressWidth = val
    },
    // 改变时间
    changeTime (time) {
      const audio = this.$refs.audio
      const current = time * audio.duration / 100
      audio.currentTime = current
    },
    // 播放暂停
    toggle () {
      if (this.status) {
        this.toPause()
      } else {
        this.toPlay()
      }
    },
    // 暂停播放
    toPause () {
      this.$refs.audio.pause()
      this.setStatus(false)
    },
    // 播放歌曲
    toPlay () {
      this.$refs.audio.play()
      this.setStatus(true)
    },
    // 上一首歌曲
    prevSong () {
      if (!this.readySong) {
        return
      }
      let nowIndex = this.index - 1
      if (nowIndex === -1) {
        nowIndex = this.list.length - 1
      }
      this.setIndex(nowIndex)
      this.readySong = false
    },
    // 下一首歌曲
    nextSong () {
      let nowIndex = this.index + 1
      if (nowIndex === this.list.length) {
        nowIndex = 0
      }
      this.setIndex(nowIndex)
      this.readySong = false
    },
    // 改变播放模式
    changeMode () {
      const mode = (this.mode + 1) % 3
      this.setMode(mode)
      let shufflePlayList
      if (mode === 2) {
        shufflePlayList = this.shuffle(this.list)
        this.resetCurrentIndex(shufflePlayList)
        this.setPlayList(shufflePlayList)
      }
    },
    /**
     * 设置当前播放索引
     * 当在切换随机播放时，通过寻找原来的歌曲id来实现不会切换歌曲index
     */
    resetCurrentIndex (list) {
      const index = list.findIndex(item => {
        return item.id === this.playingSong.id
      })
      this.setIndex(index)
    },
    // 获取随机值
    shuffle (arr) {
      return randomArr(arr, arr.length)
    },
    // 显示歌曲列表
    showAudioList () {
      this.isShowAudioList = !this.isShowAudioList
    },
    // 播放资源
    ready () {
      this.readySong = true
    },
    // 出错
    error () {
      this.readySong = false
    },
    // 播放完成时
    end () {
      switch (this.mode) {
        case 0 :
          this.nextSong()
          break
        case 1:
          this.loop()
          break
        case 2:
          this.nextSong()
          break
      }
    },
    // 单曲循环
    loop () {
      this.$refs.audio.currentTime = 0
      this.toPlay()
    },
    // 清空
    empty () {
      this.setPlayList([])
      this.setAudioList([])
    }
  }
}
</script>

<style lang='scss' scoped>
@import url("//at.alicdn.com/t/font_1410851_orgxdud5s8j.css");
.full{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 25;
  background-color: #7f8c8d;
  padding: 0 .23rem;
  .color {
    padding-top: 0.2rem;
    color: #fff;
  }
}
 .audio-enter,.audio-leave-to{
    transform: translateY(100vh);
  }
  .audio-enter-active,.audio-leave-active{
    transition: transform linear .3s;
  }
</style>
