<template>
  <div class="wrapper border-bottom">
    <ul class="flex jc-center">
      <li
        v-for="item in loginIconsBottom"
        :key="item.icon"
      >
        <i
          class="login"
          :class="item.icon"
        ></i>
        <span>{{item.text}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { loginIconsBottom } from '../../../getInfos/getData'
export default {
  name: '',
  data () {
    return {
      loginIconsBottom: []
    }
  },
  methods: {
    getIcon () {
      this.loginIconsBottom = loginIconsBottom()
    }
  },
  mounted () {
    this.getIcon()
  }
}
</script>

<style lang='scss' scoped>
$fontSize: 0.31rem;
.wrapper {
  padding: 0.2rem 0.23rem;
  ul {
    flex-direction: column;
    li {
      margin: 0.2rem 0;
      i {
        margin-right: $fontSize/2;
        font-size: $fontSize * 1.3;
        vertical-align: -2px;
      }
      span {
        font-size: 0.3rem;
      }
    }
  }
}
</style>
