<template>
  <div class="login-wrapper">
      <!-- 未登录状态样式 -->
      <div class="no-login flex jc-around ai-center">
          <div class="content">
              <p>登陆网易云音乐</p>
              <p>手机电脑多端同步，尽享海量高品质音乐</p>
          </div>
          <router-link to="#" tag="button" class="to-login">立即登录</router-link>
      </div>

      <!-- 已经登录状态 -->
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
    }
  },
  methods: {}
}
</script>

<style lang='scss' scoped>
$font-size:0.2rem;
$color:rgba(0,0,0,.4);
.login-wrapper{
    height: 3rem;
    width: 100%;
    background-color:rgba(204, 204, 204, 0.3);
    padding: 0.6rem 0.23rem 0.9rem;
    .no-login{
        width: 100%;
        height: 100%;
        flex-direction: column;
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
