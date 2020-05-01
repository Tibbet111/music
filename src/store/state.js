export default {
  loginPage: false, // 侧边栏显示与否
  icontaiyang: false, // 日间模式
  iconyueliang1: true, // 夜间模式
  loginState: localStorage.getItem('loginStatus') || 0, // 登录状态
  accountUid: localStorage.getItem('accountUid') || 0, // 用户uid
  level: 0,
  albumId: 0 // 当前唱片id
}
