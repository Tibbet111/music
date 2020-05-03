<template>
  <div id="app">
    <router-view/>
    <play-song v-show="AUDIO_LIST.length"></play-song>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import playSong from './pages/audioIndex/index'
export default {
  components: {
    playSong
  },
  computed: {
    ...mapGetters(['AUDIO_LIST'])
  }
}
</script>
<style lang="scss">
#app {
  height: 100vh;
  width: 100vw;
}
</style>
