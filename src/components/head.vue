<template>
  <header>
    <Row>
      <Col span="6">
        <img src="../assets/logo1.png" alt="美食工厂" class="logo">
      </Col>
      <Col span="14">
        <div class="searchBox" v-show="this.$route.name !== 'login'">
          <Input search placeholder="输入内容搜索" size="large"/>
        </div>
        <div class="menu">
          <ul @click="openRoute">
            <li v-for="(item,index) in menuList" :key="index">{{item}}</li>
          </ul>
        </div>
      </Col>
      <Col span="4">
        <div class="avatarBox">
          <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" size="large" />
          <span @click="openLogin(true)">登录</span>
          <span>|</span>
          <span @click="openLogin(false)">注册</span>
        </div>
      </Col>
    </Row>
  </header>
</template>

<script>
export default {
  name: 'headMenu',
  data () {
    return {
      menuList: ['首页','菜单','食材分类','关于我们']
    }
  },
  methods:{
    // 打开登陆页
    openLogin (isLogin) {
      this.$router.push({
        name: 'login',
        params: {
          isLogin: isLogin?true:false
        }
      })
    },
    openRoute (e) {
      let name = 'home';
      switch(e.target.innerHTML){
        case '首页':
          name = 'home';
          break;
        case '菜单':
          name = 'menuList'
          break;
        case '食材分类':
          name = 'menuSort'
          break;
      };
      this.$router.push({
        name: name
      });
    }
  }
}
</script>

<style lang="less" scoped>
header{
  min-height: 80px;
  border-bottom: 1px solid #eee;
  background-color: white;
  .logo{
    height: 60px;
    margin: 10px;
    margin-left: 50px;
  }
  .searchBox{
    display: inline-block;
    width: 300px;
    margin: 20px;
  }
  .menu{
    display: inline-block;
    margin: 20px;
    ul{
      list-style-type: none;
      li{
        display: inline-block;
        margin: 0 10px;
        cursor: pointer;
        font-size: 18px;
        &:hover{
          color: var(--themeColor);
        }
      }
    }
  }
  .avatarBox{
    margin: 20px;
    span{
      font-size: 16px;
      display: inline-block;
      &:nth-child(2){
        margin-left: 10px;
        cursor: pointer;
        &:hover{
          color: #ef475d;
        }
      }
      &:nth-child(4){
        cursor: pointer;
        &:hover{
          color: #ef475d;
        }
      }
    }
  }
}
</style>
