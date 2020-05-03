export default {
  loginPage: false, // 侧边栏显示与否
  icontaiyang: false, // 日间模式
  iconyueliang1: true, // 夜间模式
  loginState: localStorage.getItem('loginStatus') || 0, // 登录状态
  accountUid: localStorage.getItem('accountUid') || 0, // 用户uid
  level: 0,
  albumId: 0, // 当前唱片id
  playStatus: false, // 当前是否在播放
  audioList: [], // 展示播放列表信息
  playList: [], // 存储各种播放模式播放列表
  mode: 0, // 0:列表循环，1：单曲循环，2：随机播放
  playingIndex: -1, // 当前正在播放的索引
  playingShow: true, // 显示转盘播放页面
  offsetLyric: 0, // 歌词偏移
  fullScreen: false // 是否全屏
}
