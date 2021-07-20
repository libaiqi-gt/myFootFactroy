<template>
  <div class="container">
    <nav>
      <span v-for="(item,index) in nav" :key="index">
        <span class="navTitle">{{item}}</span>
        <span v-if="index!==nav.length-1"> > </span>
      </span>
    </nav>
    <div class="detailsBox">
      <div class="title">
        <h1>{{detailsObj.title}}</h1>
        <span>点赞量：{{detailsObj.likeNum}}</span>
      </div>
      <div class="infoBox">
        <div class="left">
          <img :src="detailsObj.coverUrl" :alt="detailsObj.title">
        </div>
        <div class="right">
          <div class="personalInfo">
            <div>
              <Avatar :src="detailsObj.userAvatar? detailsObj.userAvatar :avatar" size="60" />
              <span class="userName">{{detailsObj.author}}</span>
            </div>
            <Button
              v-if="userInfo.id"
              style="margin-right:40px"
              :type="detailsObj.isLike? null :'info'"
              @click="setLike"
              size="large">{{detailsObj.isLike?'取消点赞':'点赞'}}</Button>
          </div>
          <div class="introduce">
            <pre>{{detailsObj.summary}}</pre>
          </div>
          <div class="material">
            <h1>用料</h1>
            <div class="materialBox" v-for="(item,index) in detailsObj.material" :key="index">
              <span>{{item.materialName}}</span>
              <span>{{item.weight}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="menuStep">
        <h1>{{detailsObj.title}}制作步骤</h1>
        <div class="stepBox" v-for="(item,index) in detailsObj.makeStep" :key="index">
          <span class="step">{{index+1}}</span>
          <span class="content">{{item.content}}</span>
          <img :src="item.stepUrl">
        </div>
      </div>
    </div>
    <div>
      <div class="commentHead">
        <h1>评论区</h1>
        <Button type="text" size="large" @click="onComment">{{userInfo.id?'点击评论':'登录后评论'}}</Button>
      </div>
      <div v-show="showCommentInput">
        <Input type="text" placeholder="请输入评论内容，按回车键发布！" @on-enter="addCommentData" v-model="commentContent"/>
      </div>
      <List>
        <div v-if="commentList.length !== 0">
          <ListItem v-for="(item,index) in commentList" :key="index">
            <ListItemMeta
              :avatar="item.userAvatar || avatar"
              :title="item.userName"
              :description="item.content" />
              <template slot="action" v-if="userInfo.id == item.userId">
                <Button type="text" icon="md-trash" style="font-size:20px" title="删除" @click="delComment(item.id)"></Button>
              </template>
          </ListItem>
        </div>
        <div v-else class="commentTip">
          <span>暂无评论</span>
        </div>
      </List>
    </div>
  </div>
</template>

<script>
import { getOneCookbook, getComment, addComment, setLike, delComment } from '@/api/home'
import {mapMutations} from 'vuex';
import avatar from '@/assets/avatar.jpg'
export default {
  name: 'menuDetails',
  computed: {
    userInfo(){
      return this.$store.state.user.userInfo;
    }
  },
  data () {
    return {
      nav: ['首页','分类','标题'],
      detailsObj: {},
      showCommentInput: false,
      commentContent: '',
      commentList: [],
      avatar
    }
  },
  methods: {
    // 获取菜谱详情、评论
    getOneCookbookData(){
      let params = {
        cookbookId: this.$route.params.id,
        userId: this.userInfo.id || ''
      };
      getOneCookbook(params).then(res=>{
        this.detailsObj = res;
      });
    },
    // 获取菜谱评论
    getComment(){
      let params = {
        cookbookId: this.$route.params.id
      };
      getComment(params).then(res=>{
        this.commentList = res.commentList;
      });
    },
    // 发布评论
    addCommentData(){
      const data = {
        cookbookId: this.$route.params.id,
        userId: this.userInfo.id,
        content: this.commentContent
      };
      addComment(data).then(res=>{
        this.getComment();
        this.$Message.success('评论成功！');
        this.commentContent = '';
        this.showCommentInput = false;
      })
    },
    // 点赞或取消点赞
    setLike(){
      const params = {
        userId: this.userInfo.id,
        cookbookId: this.$route.params.id,
        state: this.detailsObj.isLike ? 2 : 1
      };
      setLike(params).then(res=>{
        this.detailsObj.isLike ? this.detailsObj.likeNum-- : this.detailsObj.likeNum++;
        this.detailsObj.isLike = !this.detailsObj.isLike;
      });
    },
    // 删除评论
    delComment(id){
      delComment({id}).then(res=>{
        if(res === 'success'){
          this.getComment();
          this.$Message.success('删除成功！');
        }
      })
    },
    onComment(){
      if(this.userInfo.id){
        this.showCommentInput = true;
      }else{
        this.$router.push({
          name: 'login'
        })
      }
    }
  },
  created () {
    this.getOneCookbookData();
    this.getComment();
  }
}
</script>

<style lang="less" scoped src="./menuDetails.less" />
