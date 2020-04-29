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
  }
}
