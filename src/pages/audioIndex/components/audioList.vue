<template>
  <div @click.stop>
    <div class="mask"
         v-show="isShowAudioList"
         @click="$emit('showAudioList')"></div>
    <transition name="list-show"
                mode="out-in">
      <div class="audio-list pd23"
           v-show="isShowAudioList">
        <div class="list-title border-bottom flex jc-between ai-center">
          <div class="left">
            <span @click="changeMode">
              <i class="audio"
                 :class="[modeClass]"></i>
              <span>{{ modeText }}</span>
              <span class="list-num">({{ num }})</span>
            </span>
          </div>
          <div class="right">
            <span class="border-right pd23">
              <i class="audio audiowenjianjia"></i>
              收藏全部
            </span>
            <span class="pl23">
              <i class="audio audiolajitong"></i>
            </span>
          </div>
        </div>
        <ul class="scroll">
          <li class="list-item flex ai-center jc-between"
              v-for="(item, index) in audioList"
              :key="index"
              @click="audioThis(item, index)"
              :class="item.id === audioIng.id?'active':''">
            <i class="audio audiovolume"></i>
            <div class="info ellipsis">
              <span class="name">
                <i>{{item.name}}</i>
              </span>
              <span class="artist">
                <i v-for="(item, index) in artist(item)"
                   :key="index">{{ item.name }}</i>
              </span>
            </div>
            <!-- 删除此项歌曲 -->
            <span @click.stop="deleteSong(item)">
              <i class="audio audiochushaixuanxiang"></i>
            </span>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: '',
  props: {
    num: {
      type: Number
    },
    isShowAudioList: {
      type: Boolean,
      default: false
    },
    mode: {
      type: Number
    }
  },
  computed: {
    modeClass: function () {
      switch (this.mode) {
        case 0: // 列表循环
          return 'audioxunhuan'
        case 1: // 单曲循环
          return 'audiosingle-loop'
        case 2: // 随机播放
          return 'audiosuiji'
      }
      return ''
    },
    modeText () {
      switch (this.mode) {
        case 0: // 列表循环
          return '列表循环'
        case 1: // 单曲循环
          return '单曲循环'
        case 2: // 随机播放
          return '随机播放'
      }
      return ''
    },
    ...mapGetters({
      audioList: 'AUDIO_LIST',
      audioIng: 'PLAYING_SONG',
      playList: 'PLAT_LIST'
    })
  },
  methods: {
    artist (artist) {
      if (artist.artists) {
        return artist.artists
      } else {
        return artist.ar
      }
    },
    changeMode () {
      this.$emit('changeMode')
    },
    audioThis (item, index) {
      // 随机播放情况
      if (this.mode === 2) {
        /**
         * 找到对应歌曲的索引
         */
        index = this.playList.findIndex((song) => {
          return song.id === item.id
        })
      }
      this.setAudioIndex(index)
    },
    ...mapMutations({
      setAudioIndex: 'SET_PLAYING_INDEX'
    }),
    ...mapActions(['deleteSong'])
  }
}
</script>

<style lang='scss' scoped>
@import '../../../assets/style/_variables.scss';
.list-show-enter,
.list-show-leave-to {
  transform: translateY(7rem);
}

.list-show-enter-active,
.list-show-leave-active {
  transition: transform linear 0.3s;
}
.mask {
  position: fixed;
  z-index: 30;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
}
.audio-list {
  width: 100%;
  margin-right: 0.23rem;
  position: fixed;
  bottom: 0;
  z-index: 30;
  background-color: #fff;
  border-top-right-radius: 0.5rem;
  border-top-left-radius: 0.5rem;
  .list-title {
    height: 1rem;
  }
  .scroll {
    &::-webkit-scrollbar {
      width: 0 !important;
    }
    max-height: 6rem;
    overflow: scroll;
    .list-item {
      height: 1rem;
      .audiovolume {
        display: none;
      }
      &.active {
        color: $bgcolor;
        .audiovolume {
          display: block;
        }
        .artist {
          color: $bgcolor;
        }
      }
      .info {
        width: 80vw;
      }
      .artist {
        font-size: 0.24rem;
        color: #999;
        i {
          &::after {
            content: "/";
          }
          &:last-child::after {
            content: "";
          }
          &:first-child::before {
            content: "-";
          }
        }
      }
      .audiochushaixuanxiang {
        color: #bbb;
      }
    }
  }
}
</style>
