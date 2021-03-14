<template>
  <div class="login">
    <main>
      <p class="title">欢迎来到美食工厂</p>
      <div class="card">
        <div class="loginBox" v-if="isLogin">
          <h1>账号密码登录</h1>
          <Form ref="loginForm" :model="loginForm" style="padding:20px 20px 0 20px">
            <Form-item prop="user">
              <Input type="text" v-model="loginForm.user" placeholder="请输入账号" size="large" class="loginInput" />
            </Form-item>
            <Form-item prop="password">
              <Input type="password" v-model="loginForm.password" placeholder="请输入密码" size="large" class="loginInput" />
            </Form-item>
          </Form>
          <div class="rememberBox">
            <Checkbox v-model="remember">记住密码</Checkbox>
            <span class="forget">忘记密码？</span>
          </div>
          <div class="loginBtn">登录</div>
        </div>
        <div class="registerBox" v-else>
          <h1>注册美食工厂</h1>
          <Form ref="registerForm" :model="registerForm" style="padding:20px 20px 0 20px">
            <Form-item prop="user">
              <Input type="text" v-model="registerForm.user" placeholder="请输入账号" size="large" class="loginInput" />
            </Form-item>
            <Form-item prop="password">
              <Input type="password" v-model="registerForm.password" placeholder="请输入密码" size="large" class="loginInput" />
            </Form-item>
            <Form-item prop="surepassword">
              <Input type="password" v-model="registerForm.surepassword" placeholder="请再次输入密码" size="large" class="loginInput" />
            </Form-item>
          </Form>
          <div class="loginBtn">注册</div>
        </div>
        <h3 class="register" @click="isLogin = !isLogin">{{isLogin?'没有账号？立即注册':'已有账号？立即登录'}}</h3>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        user: '',
        password: ''
      },
      remember: false,
      isLogin: true,
      registerForm: {
        user: '',
        password: '',
        surepassword: ''
      }
    }
  },
  created() {
    this.isLogin = this.$route.params.isLogin;
  }
}
</script>

<style lang="less" scoped src="./login.less"/>
