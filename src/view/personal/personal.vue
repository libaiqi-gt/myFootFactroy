<template>
  <div class="container">
    <Card class="userInfo" :padding="0">
      <div slot="title">
        <span>个人信息</span>
      </div>
      <div class="avatar" title="点击上传头像">
        <Upload
          ref="uploadAvatar"
          :show-upload-list="false"
          :action="`http://127.0.0.1:3000/user/upload/${userInfo.id}`"
          :format="['jpg','jpeg','png']"
          :on-success="uploadSuccess"
          class="avatarUploadBox"
        >
          <Avatar :src="userInfo.avatar? userInfo.avatar :avatar" size="80" />
        </Upload>
      </div>
      <div class="userInfoList" v-for="(item,index) in userInfoList" :key="index">
        <Icon :type="item.icon" />
        <span>{{`${item.title}：${item.value}`}}</span>
        <span v-if="item.operate" class="operate" @click="uploadInfo(item.title)">{{item.operate}}</span>
      </div>
    </Card>
    <Card class="cookbookInfo" >
      <Tabs value="userCookbook">
        <TabPane label="作品" name="userCookbook">
          <div class="menuBox">
            <div class="foodBox" v-for="(item,index) in userCookbookList" :key="index" @click="openDetail(item.id)">
              <div class="imgContainer">
                <img :src="item.coverUrl" :alt="item.title">
              </div>
              <p class="title" :title="item.title">{{item.title}}</p>
              <p class="author">{{item.author}}</p>
              <Icon type="md-close" class="delete" @click.stop="delCookbook(item.id)" />
            </div>
          </div>
          <div class="pageBox">
            <Page
              :total="userCookbookTotle"
              :page-size="limit"
              :current="page"
              @on-change="changePage"
              show-total />
          </div>
        </TabPane>
      </Tabs>
    </Card>
    <Modal
      v-model="showSet"
      :title="modalTitle"
      @on-ok="sureSet"
      @on-cancel="cancel">
      <Form ref="formRef" :model="formData" :label-width="80" :rules="rule">
        <FormItem label="昵称:" prop="uploadName" v-if="modalTitle === '修改昵称'">
          <Input v-model="formData.uploadName" placeholder="请输入需要设置的昵称" style="width:250px" />
        </FormItem>
        <FormItem label="邮箱:" prop="uploadEmail" v-if="modalTitle === '修改邮箱'">
          <Input v-model="formData.uploadEmail" type="email" placeholder="请输入需要设置的邮箱" style="width:250px" />
        </FormItem>
        <FormItem label="原密码:" prop="password" v-if="modalTitle === '修改密码'">
          <Input v-model="formData.password" type="password" placeholder="请输入原密码" style="width:250px" />
        </FormItem>
        <FormItem label="新密码:" prop="newPassword" v-if="modalTitle === '修改密码'">
          <Input v-model="formData.newPassword" type="password" placeholder="请输入新密码" style="width:250px" />
        </FormItem>
        <FormItem label="确认密码:" prop="newPassword2" v-if="modalTitle === '修改密码'">
          <Input v-model="formData.newPassword2" type="password" placeholder="请再次输入新密码" style="width:250px" />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import {mapMutations} from 'vuex';
import { setName, setEmail, setPassword, upload, getUserCookbook } from '@/api/user'
import { delCookbook } from '@/api/home'
import avatar from '@/assets/avatar.jpg'
export default {
  name:'personal',
  computed: {
    userInfo(){
      return this.$store.state.user.userInfo;
    },
    userInfoList(){
      let userInfo = this.$store.state.user.userInfo;
      return [
        {
          icon: 'md-pricetags',
          title: '账号',
          value: userInfo.account
        },
        {
          icon: 'ios-contact',
          title: '昵称',
          value: userInfo.name?userInfo.name:'暂未设置昵称',
          operate: userInfo.name?'修改昵称':'绑定昵称'
        },
        {
          icon: 'md-mail',
          title: '邮箱',
          value: userInfo.email?userInfo.email:'暂未绑定邮箱',
          operate: userInfo.email? '修改邮箱':'绑定邮箱'
        },
        {
          icon: 'ios-paper',
          title: '发布菜谱数',
          value: this.userCookbookTotle
        },
        {
          icon: 'ios-film',
          title: '注册日期',
          value: this.formatDate(userInfo.createDate)
        },
        {
          icon: 'ios-build',
          title: '安全设置',
          value: '',
          operate: '修改密码'
        },
      ]
    }
  },
  data(){
    return {
      avatar,
      showSet: false,
      modalTitle: '',
      formData: {
        uploadName: ''
      },
      rule: {
        uploadName: [{ required: true, message: '昵称不能为空！', trigger: 'blur' }],
        uploadEmail: [{ required: true, message: '邮箱不能为空！', trigger: 'blur' }],
        password: [{ required: true, message: '原密码不能为空！', trigger: 'blur' }],
        newPassword: [{ required: true, message: '新密码不能为空！', trigger: 'blur' }],
        newPassword2: [{ required: true, message: '确认密码不能为空！', trigger: 'blur' }]
      },
      page: 1,
      limit: 10,
      userCookbookTotle: 0,
      userCookbookList: []
    }
  },
  methods: {
    ...mapMutations({
      'setUser': 'user/setUser'
    }),
    // 修改用户名
    setUserName () {
      let params = {
        userName: this.formData.uploadName,
        userId: this.userInfo.id
      };
      setName(params).then(res=>{
        if(!res.message) {
          this.$Message.error(res);
        } else if(res.message === 'success'){
          this.setUser(res.userInfo);
          this.$Message.success('昵称修改成功！');
          this.showSet = false;
          this.$refs.formRef.resetFields();
        };
      });
    },
    // 修改邮箱
    setUserEmail () {
      let params = {
        email: this.formData.uploadEmail,
        userId: this.userInfo.id
      };
      setEmail(params).then(res=>{
        if(!res.message) {
          this.$Message.error(res);
        } else if(res.message === 'success'){
          this.setUser(res.userInfo);
          this.$Message.success('邮箱修改成功！');
          this.showSet = false;
          this.$refs.formRef.resetFields();
        };
      })
    },
    // 修改密码
    setUserPassword () {
      let params = {
        password: this.formData.password,
        newPassword: this.formData.newPassword,
        userId: this.userInfo.id
      };
      setPassword(params).then(res=>{
        if(!res.message) {
          this.$Message.error(res);
        } else if(res.message === 'success'){
          this.$Message.success('密码修改成功！');
          this.showSet = false;
          this.$refs.formRef.resetFields();
        };
      })
    },
    // 获取用户菜谱
    getUserCookbookData(){
      let params = {
        userId: this.userInfo.id,
        page: this.page,
        limit: this.limit
      }
      getUserCookbook(params).then(res=>{
        this.userCookbookList = res.cookbookList;
        this.userCookbookTotle = res.totle;
      });
    },
    // 头像上传成功
    uploadSuccess(response, file, fileList){
      console.log(response, file, fileList);
      if(response.message === 'success'){
        this.setUser(response.userInfo);
        this.$Message.success('头像修改成功！');
      }
    },
    uploadInfo (value) {
      switch(value){
        case '昵称':
          this.modalTitle = '修改昵称';
          break;
        case '邮箱':
          this.modalTitle = '修改邮箱';
          break;
        case '安全设置':
          this.modalTitle = '修改密码';
          break;
      };
      this.showSet = true;
    },
    // 确定修改
    sureSet () {
      this.$refs.formRef.validate((valid) => {
        if(valid){
          switch(this.modalTitle){
            case '修改昵称':
              this.setUserName();
              break;
            case '修改邮箱':
              this.setUserEmail()
              break;
            case '修改密码':
              this.setUserPassword();
              break;
          };
        }
      });
    },
    // 删除菜谱
    delCookbook(id){
      const params = {
        cookbookId:id
      };
      delCookbook(params).then(res=>{
        this.getUserCookbookData();
        this.$Message.success('删除成功！');
      })
    },
    // 取消修改
    cancel () {
      this.showSet = false;
      this.$refs.formRef.resetFields();
    },
    // 格式化时间 yyyy-mm-dd hh:mm:ss
    formatDate(date){
      let formatDate = new Date(date);
      let month = formatDate.getMonth() + 1;
      let year = formatDate.getFullYear();
      let day = formatDate.getDate();
      let h = formatDate.getHours();
      let min = formatDate.getMinutes();
      let second = formatDate.getSeconds();
      if (month<10) month = '0' + month;
      if (day<10) day = '0' + day;
      if (h<10) h = '0' + h;
      if (min<10) min = '0' + min;
      if (second<10) second = '0' + second;
      return `${[year,month, day].join('-')}  ${[h,min,second].join(':')}`;
    },
    // 打开详情页
    openDetail (creationId) {
      this.$router.push({
        path: `/menuDetails/${creationId}`
      })
    },
    // 改变作品页码
    changePage(value){
      this.page = value;
      this.getUserCookbookData();
    }
  },
  created(){
    this.getUserCookbookData();
  }
}
</script>

<style lang="less" scoped src="./personal.less" />
