import ModalHelper from '../utils/modalScroll'

export default {
  // 显示左侧侧边框
  SHOW_LOGIN (state) {
    state.loginPage = true
    ModalHelper.afterOpen()
  },
  // 隐藏测边框
  HIDE_LOGIN (state) {
    state.loginPage = false
    ModalHelper.beforeClose()
  },
  // 日->晚
  TO_NIGHT (state) {
    console.log('切换到日间模式')
    state.iconyueliang1 = false
    state.icontaiyang = true
  },
  // 晚->日
  TO_SUN (state) {
    console.log('切换到夜晚模式')
    state.iconyueliang1 = true
    state.icontaiyang = false
  },
  // 切换
  TOGGLE_MODE (state) {
    if (state.iconyueliang1) {
      this._mutations.TO_NIGHT[0](state)
    } else if (state.icontaiyang) {
      this._mutations.TO_SUN[0](state)
    }
  },
  // 用户登录状态
  LOGIN_STATUS (state, num) {
    state.loginState = num
  },
  // 用户uid
  ACCOUNT_UID (state, id) {
    state.accountUid = id
  },
  // 用户等级
  ACCOUNT_LEVEL (state, num) {
    state.level = num
  },
  // 设置AlbumId
  SET_USING_ALBUM_ID (state, albumId) {
    state.albumId = albumId
  },
  // 播放状态
  SET_PLAY_STATUS (state, flag) {
    state.playStatus = flag
  },
  // 是否全屏
  SET_FULLSCREEN (state, flag) {
    state.fullScreen = flag
  },
  // 设置播放列表信息
  SET_AUDIO_LIST (state, list) {
    state.audioList = list
  },
  // 当前播放索引
  SET_PLAYING_INDEX (state, index) {
    state.playingIndex = index
  },
  // 当前播放列表
  SET_PLAY_LIST (state, list) {
    state.playList = list
  },
  // 当前播放模式
  SET_AUDIO_MODE (state, mode) {
    state.mode = mode
  },
  // 设置是否显示轮盘播放页面
  SET_PLAYING_SHOW (state, flag) {
    state.playingShow = flag
  }
}
