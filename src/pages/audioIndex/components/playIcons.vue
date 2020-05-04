<template>
  <div>
    <div class="wrapper flex jc-around ai-center">
      <i class="audio"
        @click="changeLikeStatus(playingSong.id)"
        :class="{audioshoucang: isLike, audioshoucang1:!isLike}"></i>
      <i class="audio audioxiazai"></i>
      <i class="audio audiocaidan"></i>
    </div>
    <alert :alert="alert" :isAlert="isAlert"></alert>
  </div>
</template>

<script>
import alert from '../../../components/alert'
import { mapGetters } from 'vuex'
export default {
  name: '',
  components: {
    alert
  },
  props: {
    isLike: {
      type: Boolean
    }
  },
  data () {
    return {
      alert: '',
      isAlert: false
    }
  },
  computed: {
    ...mapGetters({
      playingSong: 'PLAYING_SONG'
    }),
    _isLike: {
      get () {
        return this.isLike
      },
      set (val) {
        this.$emit('update_isLike', val)
      }
    }
  },
  methods: {
    async changeLikeStatus (id) {
      const res = await this.$api.get('/like', {
        params: {
          id,
          like: !this.isLike
        }
      })
      if (res.data.code === 200) {
        this._isLike = !this.isLike
        if (!this.isLike) {
          this.alert = '喜欢成功'
          this.isAlert = true
          setTimeout(() => {
            this.isAlert = false
          }, 1000)
        } else {
          this.alert = '取消喜欢'
          this.isAlert = true
          setTimeout(() => {
            this.isAlert = false
          }, 1000)
        }
      }
    }
  }
}
</script>

<style lang='scss' scoped>
  .wrapper{
    .audio{
    font-size: .7rem;
    color:#bdc3c7;
    &.audioshoucang{
      color:#e74c3c;
    }
  }
  }
</style>
