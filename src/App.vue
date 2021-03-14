<template>
  <div id="app">
    <Affix>
      <headMenu></headMenu>
    </Affix>
    <router-view v-wechat-title="$route.meta.title"></router-view>
    <footer>
      <div class="footerBox">
        <p>唯美食于爱不可辜负🧡 </p>
        <p>Copyright © 2021 柏岐 · </p>
      </div>
    </footer>
  </div>
</template>

<script>
import headMenu from './components/head'
export default {
  name: 'App',
  components: { headMenu }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  footer{
    width: 100%;
    height: 120px;
    margin-top: 40px;
    background-color: var(--footerColor);
    .footerBox{
      text-align: center;
      line-height: 30px;
      padding-top: 20px;
    }
    p{
      &:nth-child(1){
        font-size: 20px;
      }
    }
  }
}

</style>
