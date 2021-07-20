<template>
  <header>
    <Row>
      <Col span="6">
        <img src="../assets/logo1.png" alt="美食工厂" class="logo">
      </Col>
      <Col span="14">
        <div class="searchBox" v-show="this.$route.name !== 'login'">
          <Input v-model="seachValue" search placeholder="输入内容搜索" size="large" @on-search="searchCookbook"/>
        </div>
        <div class="menu">
          <ul @click="openRoute">
            <li v-for="(item,index) in menuList" :key="index">{{item}}</li>
          </ul>
        </div>
      </Col>
      <Col span="4">
        <div class="avatarBox">
          <Dropdown trigger="hover" @on-click="openMenuItem">
            <Avatar :src="userInfo.avatar? userInfo.avatar :avatar"
              size="large"
              style="cursor: pointer;"
              v-if="userInfo.id" />
            <DropdownMenu slot="list">
              <DropdownItem name="addCookbook">发布菜谱</DropdownItem>
              <DropdownItem name="personal">个人中心</DropdownItem>
              <DropdownItem name="service">服务中心</DropdownItem>
              <DropdownItem name="admin" v-if="userInfo.id === 1">管理中心</DropdownItem>
              <DropdownItem name="outLogin">退出登录</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <span @click="openLogin(true)" v-if="!userInfo.id">登录</span>
          <span v-if="!userInfo.id">|</span>
          <span @click="openLogin(false)" v-if="!userInfo.id">注册</span>
          <div v-if="userInfo.id" style="padding-left:10px;display:inline-block;font-size:16px">{{userInfo.name || userInfo.account}}</div>
        </div>
      </Col>
    </Row>
    <Modal
      v-model="showMeTip"
      title="关于我们"
      @on-ok="showMeTip = false"
      @on-cancel="showMeTip = false">
      <div>该网站目前只有作者一人全程制作与维护。</div>
      <div>如需联系作者</div>
      <div>QQ:892208148</div>
    </Modal>
  </header>
</template>

<script>
import {mapMutations} from 'vuex';
import avatar from '@/assets/avatar.jpg'
export default {
  name: 'headMenu',
  computed: {
    userInfo(){
      return this.$store.state.user.userInfo;
    }
  },
  data () {
    return {
      menuList: ['首页','菜单','食材分类','关于我们'],
      showMeTip: false,
      seachValue: '',
      avatar
    }
  },
  methods:{
    ...mapMutations({
      'outLogin': 'user/outLogin'
    }),
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
        case '关于我们':
          this.showMeTip = true;
          return;
      };
      this.$router.push({
        name: name
      });
    },
    openMenuItem(name) {
      switch(name){
        case 'addCookbook':
          this.$router.push({
            name: 'addCookbook'
          });
          break;
        case 'outLogin':
          this.outLogin();
          this.$router.push({
            name: 'home'
          });
          break;
        case 'personal':
          this.$router.push({
            name: 'personal'
          });
          break;
        case 'service':
          this.$router.push({
            name: 'feedback'
          });
          break;
        case 'admin':
          this.$router.push({
            name: 'admin'
          });
          break;
      }
    },
    searchCookbook(value){
      if(value){
        this.$router.push({
          name: 'menuList',
          query: {searchValue:value}
        });
        this.seachValue = '';
      }
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
