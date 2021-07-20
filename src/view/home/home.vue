<template>
  <div class="home">
    <div class="carouselBox">
      <div class="carousel">
        <Carousel autoplay v-model="carouselIndex" loop :autoplay-speed="4000">
          <CarouselItem v-for="(item,index) in imgList" :key="index">
              <img :src="item" class="carouselImg">
          </CarouselItem>
        </Carousel>
      </div>
    </div>
    <div class="main">
      <aside>
        <sortMenu :sortMenuList="sortMenuList"></sortMenu>
      </aside>
      <main>
        <div class="dailyMenu">
          <h1>每日推荐菜谱</h1>
          <div class="dailyMenuBox">
            <div class="foodBox" v-for="(item,index) in dailyMenuList" :key="index" @click="openDetail(item.id)">
              <div class="imgContainer">
                <img :src="item.coverUrl" :alt="item.title">
              </div>
              <p class="title" :title="item.title">{{item.title}}</p>
              <p class="author">{{item.author}}</p>
            </div>
          </div>
        </div>
        <div class="newMenu">
          <div class="newMenuHead">
            <h1>新秀菜谱</h1>
            <!-- <p>全部</p> -->
          </div>
          <div class="foodListBox">
            <ul>
              <li class="foodLiItem" v-for="(item,index) in newFoodList" :key="index" @click="openDetail(item.id)">
                <div class="imgContainer">
                  <img :src="item.coverUrl" :alt="item.title">
                </div>
                <p class="title" :title="item.title">{{item.title}}</p>
                <p class="author">{{item.author}}</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="hotMenu">
          <div class="newMenuHead">
            <h1>最近流行</h1>
            <!-- <p>全部</p> -->
          </div>
          <div class="foodListBox">
            <ul>
              <li class="foodLiItem" v-for="(item,index) in hotFoodList" :key="index" @click="openDetail(item.id)">
                <div class="imgContainer">
                  <img :src="item.coverUrl" :alt="item.title">
                </div>
                <p class="title" :title="item.title">{{item.title}}</p>
                <p class="author">{{item.author}}</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="ingredients">
          <div class="newMenuHead">
            <h1>时令食材</h1>
            <p @click="openFoodSort">更多</p>
          </div>
          <ul>
            <li class="foodBox" v-for="(item,index) in ingredientsList" :key="index" @click="openSortCookbook(item.id)">
              <div style="cursor: pointer;">
                <img :src="item.imgUrl" :alt="item.name">
                <p class="title">{{item.name}}</p>
              </div>
            </li>
          </ul>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import sortMenu from './sortMenu'
import { getList, getcookbookSort, getCookbook, getSeasonOrHot } from '@/api/home'
export default {
  name: 'home',
  components: { sortMenu },
  data () {
    return {
      carouselIndex: 0,
      cookbookType: 'recommend',
      imgList: [
        '../../../static/bg1.jpg',
        '../../../static/bg2.jpg'
      ],
      sortMenuList: [],
      dailyMenuList:[],
      newFoodList: [],
      hotFoodList: [],
      ingredientsList: [],
      page: 1,
      limit: 3
    }
  },
  methods: {
    // 获取侧边导航栏菜谱分类
    async getcookbookSortData() {
      await getcookbookSort().then(res=>{
        this.sortMenuList = res;
      })
    },
    // 打开详情页
    openDetail (creationId) {
      this.$router.push({
        path: `/menuDetails/${creationId}`
      })
    },
    // 获取菜谱
    async getCookbookData (cookbookType) {
      this.cookbookType = cookbookType;
      let params = {
        cookbookType: cookbookType,
        page: this.page,
        limit: this.limit
      };
      await getCookbook(params).then(res=>{
        switch(cookbookType){
          case 'new':
            this.newFoodList = res.cookbookList;
            break;
          case 'recommend':
            this.dailyMenuList = res.cookbookList;
            break;
          case 'popular':
            this.hotFoodList = res.cookbookList;
            break;
        };
      })
    },
    // 获取每日推荐菜谱
    getRecommend(){
      this.page = 1;
      this.limit = 3;
      this.getCookbookData('recommend');
    },
    // 获取新秀菜谱
    getNew(){
      this.page = 1;
      this.limit = 6;
      this.getCookbookData('new');
    },
    // 获取流行菜谱
    getPopular(){
      this.page = 1;
      this.limit = 6;
      this.getCookbookData('popular');
    },
    // 获取时令食材
    async getSeasonOrHotData(){
      let params = {
        type: 'season',
        page: 1,
        limit:16
      };
      getSeasonOrHot(params).then(res=>{
        this.ingredientsList = res.foodList;
      })
    },
    openFoodSort(){
      this.$router.push({
        name: 'menuSort'
      })
    },
    openSortCookbook(id){
      this.$router.push({
        name: 'menuList',
        query: {smallClassId:id}
      });
    }
  },
  created(){
    this.getcookbookSortData();
    this.getRecommend();
    this.getNew();
    this.getPopular();
    this.getSeasonOrHotData();
  }
}
</script>

<style lang="less" scoped src="./home.less"/>

