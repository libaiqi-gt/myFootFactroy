<template>
  <div class="container">
    <div class="leftBox">
      <div class="sortList" @click="sortType">
        <span v-for="(item,index) in sortList" :key="index">{{item}}</span>
      </div>
    </div>
    <div class="rightBox">
      <h1>{{cookbookTitle}}</h1>
      <div class="foodContainer">
        <div class="foodBox" v-for="(item,index) in foodList" :key="index">
          <img :src="item.coverUrl" @click="openDetail(item.id)">
          <div class="foodInfo">
            <h2 @click="openDetail(item.id)">{{item.title}}</h2>
            <div class="sortBox">
              <span v-for="(material,sindex) in item.material" :key="sindex">
                <span class="name">{{material.materialName}}</span>
                <span>{{sindex === item.material.length - 1 ? '': '、'}}</span>
              </span>
            </div>
            <p>点赞 {{item.likeNum}}</p>
            <p class="author">{{item.author}}</p>
          </div>
        </div>
      </div>
      <div class="page">
        <Page :total="totle" show-total :page-size="limit" :current="page" @on-change="changePage" />
      </div>
    </div>
  </div>
</template>

<script>
import food from '@/assets/food.jpg'
import { getAllCookbook, getCookbook, getSortCookbook, searchCookbook } from '@/api/home'
export default {
  name: 'menuList',
  data () {
    return {
      sortList: [
        '全部分类',
        '所有菜谱',
        '新秀菜谱',
        '流行菜谱'
      ],
      foodList: [],
      cookbookTitle: '所有菜谱',
      largeClassId: null,
      smallClassId: null,
      searchValue: null,
      page: 1,
      limit:10,
      totle: 0,
      type: 0, // 当前搜索的菜谱类型（0为所有菜谱，1为新秀菜谱，2为流行菜谱，3为搜索菜谱，4为大类搜索菜谱，5为小类搜索菜谱）
    }
  },
  methods: {
    // 获取所有菜谱
    getAllCookbookData(){
      let params = {
        page: this.page,
        limit: this.limit
      };
      getAllCookbook(params).then(res=>{
        // this.$router.push({ query: {} });
        this.cookbookTitle = '所有菜谱';
        this.foodList = res.cookbookList;
        this.totle = res.totle;
      })
    },
    // 获取新秀菜谱
    getCookbookData(cookbookType){
      let params = {
        cookbookType: cookbookType,
        page: this.page,
        limit: this.limit
      };
      getCookbook(params).then(res=>{
        switch(cookbookType){
          case 'new':
            this.cookbookTitle = '新秀菜谱';
            break;
          case 'popular':
            this.cookbookTitle = '流行菜谱';
            break;
        };
        // this.$router.push({ query: {} });
        this.foodList = res.cookbookList;
        this.totle = res.totle;
      })
    },
    // 根据分类搜素菜谱
    getSortCookbook(){
      let params = {
        largeClassId: this.largeClassId,
        smallClassId: this.smallClassId,
        page:this.page,
        limit:this.limit
      };
      getSortCookbook(params).then(res=>{
        this.foodList = res.cookbookList;
        this.totle = res.totle;
      })
    },
    // 搜索菜谱
    searchCookbookData(){
      let params = {
        title: this.searchValue,
        page: this.page,
        limit: this.limit
      }
      searchCookbook(params).then(res=>{
        this.foodList = res.cookbookList;
        this.totle = res.totle;
      })
    },
    // 选择菜谱的类型
    sortType(e){
      switch(e.target.innerHTML){
        case '所有菜谱':
          this.type = 0;
          this.getAllCookbookData();
          break;
        case '新秀菜谱':
          this.page = 1;
          this.limit = 10;
          this.type = 1;
          this.getCookbookData('new');
          break;
        case '流行菜谱':
          this.page = 1;
          this.limit = 10;
          this.type = 2;
          this.getCookbookData('popular');
          break;
        case '全部分类':
          this.$router.push({
            name: 'menuSort'
          })
      }
    },
    // 打开详情页
    openDetail (creationId) {
      this.$router.push({
        path: `/menuDetails/${creationId}`
      })
    },
    // 改变页码
    changePage (page) {
      this.page = page;
      switch(this.type){
        case 0:
          this.getAllCookbookData();
          break;
        case 1:
          this.getCookbookData('new');
          break;
        case 2:
          this.getCookbookData('popular');
          break;
        case 3:
          this.searchCookbookData();
          break;
        case 4:
          this.getSortCookbook();
          break;
        case 5:
          this.getSortCookbook();
          break;
      };
    }
  },
  created(){
    if(this.$route.query.largeClassId){
      this.largeClassId = this.$route.query.largeClassId;
      this.type = 4;
      this.getSortCookbook();
    }else if(this.$route.query.smallClassId){
      this.smallClassId = this.$route.query.smallClassId;
      this.type = 5;
      this.getSortCookbook();
    }else if(this.$route.query.searchValue){
      this.searchValue = this.$route.query.searchValue;
      this.type = 3;
      this.searchCookbookData();
    }else{
      this.getAllCookbookData();
    }
  },
  watch:{
    $route: {
      handler(){
        if(this.$route.query.searchValue){
          this.page = 1;
          this.limit = 10;
          this.type = 3;
          this.searchValue = this.$route.query.searchValue;
          this.searchCookbookData();
        }
      }
    }
  }
}
</script>

<style lang="less" scoped src="./menuList.less" />
