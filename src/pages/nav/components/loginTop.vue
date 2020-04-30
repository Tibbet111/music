<template>
  <div class="login-wrapper" :class="{bgcolor:!loginStatus}">
      <!-- 未登录状态样式 -->
      <div class="no-login flex jc-around ai-center"
        v-if="!loginStatus">
          <div class="content">
              <p>登陆网易云音乐</p>
              <p>手机电脑多端同步，尽享海量高品质音乐</p>
          </div>
          <router-link to="/login" tag="button" class="to-login">立即登录</router-link>
      </div>

      <!-- 已经登录状态 -->
        <div class="login flex jc-start ai-center" v-if="loginStatus">
            <router-link to="/user_info" tag="div" class="avatar">
                <img :src="avatar">
            </router-link>
            <div class="nickname flex">
                <span class="username">{{nickname}}</span>
                <span class="level">Lv.{{level}}</span>
            </div>
        </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    loginStatus: { type: Number, default: 0 }
  },
  data () {
    return {
      avatar: '',
      nickname: '',
      level: 0
    }
  },
  methods: {
    getUserInfo () {
      const user = JSON.parse(localStorage.getItem('userInfo')) || ''
      this.level = localStorage.getItem('level')
      this.avatar = user.avatarUrl || ''
      this.nickname = user.nickname || ''
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang='scss' scoped>
@import '../../../assets/style/_variables.scss';
$font-size:0.2rem;
$color:rgba(0,0,0,.4);
.login-wrapper{
    height: 3rem;
    width: 100%;
    padding: 1rem 0.23rem 0.9rem;
    &.bgcolor{
    background-color:rgba(204, 204, 204, 0.3);
    }
    .login{
        width: 100%;
        height: 100%;
        .avatar{
            text-align: center;
            width: 1.8rem;
            height: 1.8rem;
            margin-right: .5rem;
            img{
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
        }
        .nickname{
            flex-direction: column;
            .username{
                font-size: .6rem;
            }
            .level{
                margin-top: .2rem;
                font-size: .4rem;
                background: $bgcolor;
                color: #fff;
                padding: .04rem 0.1rem;
                border-radius: .4rem;
                width: 1rem;
            }
        }
    }
    .no-login{
        width: 100%;
        height: 100%;
        flex-direction: column;
        padding-right: .15rem;
        .content{
            text-align: center;
            p{
                font-size: $font-size;
                padding: 0.1rem 0;
                color: $color;
            }
        }
        .to-login{
            border-radius: 0.5rem;
            padding: 0.15rem 0.5rem;
            color: $color;
            border: 1px solid $color;
            background: transparent;
            font-size: $font-size;
            margin-top: 0.1rem;
        }
    }
}
</style>
