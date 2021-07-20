<template>
  <div class="container">
    <h1>发布菜谱</h1>
    <Form ref="addForm" :model="addForm" :label-width="100" class="formBox" :rules="rule">
      <FormItem label="菜谱标题:" prop="title">
        <Input v-model="addForm.title" placeholder="请输入菜谱标题" style="width:230px"/>
      </FormItem>
      <FormItem label="菜谱简介:" prop="summary">
        <Input v-model="addForm.summary" type="textarea" :autoSize="{minRow:3,maxRows:6}" placeholder="请输入菜谱简介" style="width:230px"/>
      </FormItem>
      <FormItem label="菜谱封面:" prop="coverUrl">
        <div>
          <Upload
            ref="uploadCover"
            :show-upload-list="false"
            action="http://127.0.0.1:3000/cookbook/upload"
            :on-success="uploadCoverSuccess"
            :format="['jpg','jpeg','png']"
            type="drag"
            style="display: inline-block;"
            >
            <div class="uploadCoverBox">
              <img :src="addForm.coverUrl" style="width:100%" v-if="addForm.coverUrl">
              <Icon type="ios-camera" size="25" v-if="!addForm.coverUrl"></Icon>
            </div>
          </Upload>
        </div>
      </FormItem>
      <FormItem label="菜谱大类:" prop="largeClass">
        <Select v-model="addForm.largeClass" placeholder="请选择菜谱大类" style="width:230px" @on-change="getSmallSortData">
          <Option v-for="item in largeClassList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="菜谱小类:" prop="smallClass">
        <Select v-model="addForm.smallClass" multiple placeholder="请选择菜谱小类" style="width:230px">
          <Option v-for="item in smallClassList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <!-- <FormItem label="菜谱视频:" prop="videoUrl">
        <Upload
          ref="uploadVideo"
          :show-upload-list="false"
          action="http://127.0.0.1:3000/cookbook/upload"
          :on-success="uploadVideoSuccess"
          :format="['mp4','rmvb','rm','3gp','avi','mpeg','mpg','wmv']"
          type="drag"
          style="display: inline-block;"
          >
          <div class="uploadCoverBox">
            <Icon type="md-videocam" size="25"/>
          </div>
        </Upload>
      </FormItem> -->
      <FormItem label="菜谱用料:" prop="material">
        <div v-for="(item,index) in addForm.material" :key="index" class="materialInput">
          <Input v-model="addForm.material[index].materialName" placeholder="请输入用料名" style="width:230px"/>
          <Input v-model="addForm.material[index].weight" placeholder="请输入所需分量" style="width:230px"/>
        </div>
        <div class="addMaterial">
          <Icon type="md-add" size="25" class="icon" @click="addMaterial"/>
          <Icon type="md-remove" size="25" class="icon" @click="delMaterial"/>
        </div>
      </FormItem>
      <FormItem :label="`制作步骤${index+1}:`" prop="makeStep" v-for="(item,index) in addForm.makeStep" :key="index">
        <Input v-model="addForm.makeStep[index].content" type="textarea" :autoSize="{minRow:3,maxRows:6}" placeholder="请输入步骤内容" style="width:230px"/>
        <div style="margin:10px">
          <Upload
            action="http://127.0.0.1:3000/cookbook/upload"
            :show-upload-list="false"
            :on-success="(response, file, fileList)=>uploadStepImg(response, file, fileList,index)"
            :format="['jpg','jpeg','png']"
            type="drag"
            style="display: inline-block;"
            >
            <div class="uploadCoverBox">
              <img :src="addForm.makeStep[index].stepUrl" style="width:100%" v-if="addForm.makeStep[index].stepUrl">
              <Icon type="ios-camera" size="25" v-if="!addForm.makeStep[index].stepUrl"></Icon>
              <span v-if="!addForm.makeStep[index].stepUrl">上传本步骤相关制作图片</span>
            </div>
          </Upload>
        </div>
      </FormItem>
      <div class="addMaterial">
        <Icon type="md-add" size="25" class="icon" @click="addMakeStep"/>
        <Icon type="md-remove" size="25" class="icon" @click="delMakeStep"/>
      </div>
    </Form>
    <div class="btnBox">
      <Button type="primary" size="large" style="margin:0 20px" @click="addCookbookData">发布</Button>
      <Button size="large" @click="backHome">返回</Button>
    </div>
  </div>
</template>

<script>
import { addCookbook, getcookbookSort, getSmallSort } from '@/api/home'
export default {
  name: 'addCookbook',
  data(){
    return {
      addForm: {
        title: '',
        summary: '',
        coverUrl: null,
        largeClass: '',
        smallClass: '',
        videoUrl: null,
        material: [
          {
            materialName: '',
            weight: ''
          }
        ],
        makeStep: [
          {stepNum: 1, content: '', stepUrl: null}
        ]
      },
      largeClassList:[],
      smallClassList:[],
      rule: {
        title: [{ required: true, message: '菜谱标题不能为空', trigger: 'blur' }],
        summary: [{ required: true, message: '菜谱简介不能为空', trigger: 'blur' }],
        coverUrl: [{ required: true, message: '菜谱封面不能为空' }],
        largeClass: [{ required: true, message: '菜谱大类不能为空', }],
      }
    }
  },
  methods:{
    // 获取菜谱大类
    getcookbookSortData(){
      getcookbookSort().then(res=>{
        this.largeClassList = res;
      });
    },
    // 根据菜谱大类获取菜谱小类
    getSmallSortData(value){
      let params = {
        largeClassId:value
      };
      getSmallSort(params).then(res=>{
        this.smallClassList = res;
        console.log(this.addForm.largeClass);
      })
    },
    uploadCoverSuccess (response, file, fileList) {
      this.addForm.coverUrl = `/static/${response.filename}`;
    },
    uploadVideoSuccess (response, file, fileList) {
      this.addForm.videoUrl = `/static/${response.filename}`;
    },
    uploadStepImg (response, file, fileList, index) {
      this.addForm.makeStep[index].stepUrl = `/static/${response.filename}`;
    },
    // 新增用料输入
    addMaterial(){
      this.addForm.material.push({
        materialName: '',
        weight: ''
      })
    },
    // 删减用料输入
    delMaterial(){
      if(this.addForm.material.length === 1){
        return;
      } else {
        this.addForm.material.pop();
      }
    },
    // 新增步骤输入
    addMakeStep(){
      this.addForm.makeStep.push({
        stepNum: this.addForm.makeStep.length+1,
        content: '',
        stepUrl: null
      });
    },
    // 删减步骤输入
    delMakeStep(){
      if(this.addForm.makeStep.length === 1){
        return;
      } else {
        this.addForm.makeStep.pop();
      }
    },
    // 返回首页
    backHome(){
      this.$router.push({
        name: 'home'
      })
    },
    // 发布菜谱
    addCookbookData(){
      this.$refs.addForm.validate((valid) => {
        if(valid) {
          let data = {
            title: this.addForm.title,
            summary: this.addForm.summary,
            coverUrl: this.addForm.coverUrl,
            largeClass: this.addForm.largeClass,
            smallClass: this.addForm.smallClass.toString(),
            author: this.$store.state.user.userInfo.name || this.$store.state.user.userInfo.account,
            authorId: this.$store.state.user.userInfo.id,
            videoUrl: this.addForm.videoUrl,
            material: this.addForm.material,
            makeStep: this.addForm.makeStep
          };
          addCookbook(data).then(res=>{
            this.$Message.success('发布成功!');
            this.$router.push({
              name: 'home'
            });
          })
        }
      });
    }
  },
  created(){
    this.getcookbookSortData();
  }
}
</script>

<style lang="less" scoped src="./addCookbook.less"/>
