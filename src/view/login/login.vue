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
            <span class="forget" @click="showForget = true">忘记密码？</span>
          </div>
          <div class="loginBtn" @click="userLogin">登录</div>
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
          <div class="loginBtn" @click="register">注册</div>
        </div>
        <h3 class="register" @click="isLogin = !isLogin">{{isLogin?'没有账号？立即注册':'已有账号？立即登录'}}</h3>
      </div>
    </main>
    <Modal
      v-model="showForget"
      title="找回密码"
      >
      <Form ref="forgetRef" :model="forgetForm" :label-width="100" :rules="forgetFormRule">
        <FormItem label="账号：" prop="user" v-if="!forgetNext">
          <Input type="text" v-model="forgetForm.user" placeholder="请输入账号" size="large" style="width:250px" />
        </FormItem>
        <FormItem label="邮箱：" prop="email" v-if="!forgetNext">
          <Input type="text" v-model="forgetForm.email" placeholder="请输入邮箱" size="large" style="width:250px" />
        </FormItem>
        <FormItem label="新密码：" prop="password" v-if="forgetNext">
          <Input type="password" v-model="forgetForm.password" placeholder="请输入新密码" size="large" style="width:250px" />
        </FormItem>
        <FormItem label="确认密码：" prop="surepassword" v-if="forgetNext">
          <Input type="password" v-model="forgetForm.surepassword" placeholder="请再次输入密码" size="large" style="width:250px" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="close">取消</Button>
        <Button type="primary" v-if="!forgetNext" @click="validEmail" :loading="showEmailLoad">验证邮箱</Button>
        <Button type="primary" @click="updatePassword" v-else>确认提交</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import {mapMutations} from 'vuex';
import { login, addUser, getEmail, setNewPassword } from '@/api/login'
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
      },
      showForget: false,
      forgetForm: {
        user: '',
        email: '',
        password: '',
        surepassword: ''
      },
      showEmailLoad: false,
      forgetNext: false,
      forgetFormRule: {
        user:[{ required: true, message: '请输入账号', trigger: 'blur' }],
        email:[{ required: true, message: '请输入已绑定的邮箱', trigger: 'blur' }],
        password:[{ required: true, message: '请输入新密码', trigger: 'blur' }],
        surepassword:[{ required: true, message: '请再次输入新密码', trigger: 'blur' }]
      },
    }
  },
  methods: {
    ...mapMutations({
      'setUser': 'user/setUser'
    }),
    userLogin() {
      let data = {
        account: this.loginForm.user,
        password: this.loginForm.password
      };
      login(data).then(res=>{
        if(this.remember){
          this.$cookies.set('username',this.loginForm.user,'1d');
          this.$cookies.set('password',this.loginForm.password,'1d');
          this.$cookies.set('rememberMe',this.remember,'1d');
        }else{
          this.$cookies.remove('username');
          this.$cookies.remove('password');
          this.$cookies.remove('rememberMe');
        }
        if(res.message){
          this.$Message.success(res.message);
          this.setUser(res.user);
          this.$router.push({
            name: 'home'
          });
          this.$refs.loginForm.resetFields();
        } else {
          this.$Message.error(res);
        };
      });
    },
    register() {
      if (this.registerForm.password !== this.registerForm.surepassword) {
        this.$Message.error('两次密码输入不一致！');
        return;
      };
      let data = {
        account: this.registerForm.user,
        password: this.registerForm.password
      };
      addUser(data).then(res=>{
        if(res === '注册成功!'){
          this.$Message.success(res);
          this.$refs.registerForm.resetFields();
          this.isLogin = true;
        } else {
          this.$Message.error(res);
        }
      })
    },
    getCookie() {
      const username = this.$cookies.get('username');
      const password = this.$cookies.get('password');
      const rememberMe = this.$cookies.get('rememberMe');
      this.loginForm.user = username || '';
      this.loginForm.password = password || '';
      this.remember = Boolean(rememberMe) || false;
    },
    close(){
      this.forgetNext = false;
      this.$refs.forgetRef.resetFields();
      this.showForget = false;
    },
    // 验证邮箱
    validEmail(){
      this.$refs.forgetRef.validate((valid) => {
        if(valid){
          this.showEmailLoad = true;
          const params = {
            user: this.forgetForm.user,
            email: this.forgetForm.email
          };
          getEmail(params).then(res=>{
            this.showEmailLoad = false;
            if(res.message === 'success'){
              this.$Message.success('验证成功！');
              this.forgetNext = true;
            }else {
              this.$Message.error(res.tip);
            }
          });
        }
      });
    },
    // 确认修改密码
    updatePassword(){
      this.$refs.forgetRef.validate((valid) => {
        if(valid){
          if (this.forgetForm.password !== this.forgetForm.surepassword) {
            this.$Message.error('两次密码输入不一致！');
            return;
          };
          const data = {
            user: this.forgetForm.user,
            password: this.forgetForm.password
          };
          setNewPassword(data).then(res=>{
            if(res.message === 'success'){
              this.$Message.success('修改成功！');
              this.close();
            }else {
              this.$Message.error('修改失败，请重新修改');
            }
          });
        }
      });
    }
  },
  created() {
    this.isLogin = this.$route.params.isLogin || true;
    this.getCookie();
  }
}
</script>

<style lang="less" scoped src="./login.less"/>
