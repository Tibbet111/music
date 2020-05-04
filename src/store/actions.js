// 产生随机数
function getRandomIndex (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// 打乱一个数组
function shuffle (arr) {
  const _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    const j = getRandomIndex(0, i)
    const t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

function findIndex (list, song) {
  return list.findIndex(item => {
    return item.id === song.id
  })
}

export default {
  // 点击歌曲进行播放
  selectPlay ({ commit, state }, { list, index }) {
    commit('SET_AUDIO_LIST', list)
    if (state.mode === 2) {
      const randomList = shuffle(list)
      commit('SET_PLAY_LIST', list)
      index = findIndex(randomList, state.audioList[index])
    } else {
      commit('SET_PLAY_LIST', list)
    }
    commit('SET_PLAYING_INDEX', index)
    commit('SET_PLAY_STATUS', true)
    commit('SET_FULLSCREEN', true)
  },
  // 播放全部
  startPlayAll ({ commit }, { list }) {
    commit('SET_AUDIO_LIST', list)
    commit('SET_PLAYING_INDEX', 0)
    commit('SET_PLAY_LIST', list)
    commit('SET_PLAY_STATUS', true)
    commit('SET_FULLSCREEN', true)
    commit('SET_AUDIO_MODE', 0)
  },
  // 向播放列表添加歌曲
  addToPlayList ({ commit, state }, song) {
    const audioList = state.audioList
    const playList = state.playList
    // 查找列表中是否有插入的歌曲
    const findSongIndex = findIndex(audioList, song)
    if (findSongIndex > -1) {
      commit('SET_PLAYING_INDEX', findSongIndex)
    }
    playList.unshift(song)
    audioList.unshift(song)
    commit('SET_PLAYING_INDEX', 0)
    commit('SET_PLAY_STATUS', true)
  }
}
