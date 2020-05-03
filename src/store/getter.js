const getters = {
  LOGIN_PAGE: state => state.loginPage,
  ICON_SUN: state => state.icontaiyang,
  ICON_NIGHT: state => state.iconyueliang1,
  LOGIN_STATE: state => state.loginState,
  ACCOUNT_UID: state => state.accountUid,
  LEVEL: state => state.level,
  ALBUM_ID: state => state.albumId,
  PLAY_STATUS: state => state.playStatus,
  AUDIO_LIST: state => state.audioList,
  PLATING_INDEX: state => state.playingIndex,
  PLAT_LIST: state => state.playList,
  MODE: state => state.mode,
  OFFSET_LYRIC: state => state.offsetLyric,
  PLAYING_SHOW: state => state.playingShow,
  FULLSCREEN: state => state.fullScreen,
  PLAYING_SONG: state => {
    return state.playList[state.playingIndex] || {}
  }
}

export default getters
