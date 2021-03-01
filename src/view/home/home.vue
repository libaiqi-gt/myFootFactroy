<template>
  <div class="home">
    <header>
      <Row>
        <Col span="6">
          <img src="../../assets/logo1.png" alt="美食工厂" class="logo">
        </Col>
        <Col span="14">
          <div class="searchBox">
            <Input search placeholder="输入内容搜索" size="large"/>
          </div>
          <div class="menu">
            <ul>
              <li v-for="(item,index) in menuList" :key="index">{{item}}</li>
            </ul>
          </div>
        </Col>
        <Col span="4">
          <div class="avatarBox">
            <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" size="large" />
            <span @click="openLogin">登录</span>
            <span>|</span>
            <span>注册</span>
          </div>
        </Col>
      </Row>
    </header>
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
            <div class="foodBox" v-for="(item,index) in dailyMenuList" :key="index">
              <div class="imgContainer">
                <img :src="item.imageUrl" :alt="item.title">
              </div>
              <p class="title">{{item.title}}</p>
              <p class="author">{{item.author}}</p>
            </div>
          </div>
        </div>
        <div class="newMenu">
          <div class="newMenuHead">
            <h1>新秀菜谱</h1>
            <p>全部</p>
          </div>
          <div class="foodListBox">
            <ul>
              <li class="foodLiItem" v-for="(item,index) in newFoodList" :key="index">
                <div class="imgContainer">
                  <img :src="item.imageUrl" :alt="item.title">
                </div>
                <p class="title">{{item.title}}</p>
                <p class="author">{{item.author}}</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="hotMenu">
          <div class="newMenuHead">
            <h1>最近流行</h1>
            <p>全部</p>
          </div>
          <div class="foodListBox">
            <ul>
              <li class="foodLiItem" v-for="(item,index) in hotFoodList" :key="index">
                <div class="imgContainer">
                  <img :src="item.imageUrl" :alt="item.title">
                </div>
                <p class="title">{{item.title}}</p>
                <p class="author">{{item.author}}</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="ingredients">
          <div class="newMenuHead">
            <h1>时令食材</h1>
            <p>更多</p>
          </div>
          <ul>
            <li class="foodBox" v-for="(item,index) in ingredientsList" :key="index">
              <div style="cursor: pointer;">
                <img :src="item.imageUrl" :alt="item.title">
                <p class="title">{{item.title}}</p>
              </div>
              <p class="remarks" style="color: rgb(199, 196, 196);">{{item.remarks}}</p>
            </li>
          </ul>
        </div>
      </main>
    </div>
    <footer>
      <div class="footerBox">
        <p>唯美食于爱不可辜负🧡 </p>
        <p>Copyright © 2021 柏岐 · </p>
      </div>
    </footer>
  </div>
</template>

<script>
import sortMenu from './sortMenu'
import { getList } from '@/api/home'
export default {
  name: 'home',
  components: { sortMenu },
  data () {
    return {
      menuList: ['首页','菜谱分类','菜单','关于我们'],
      carouselIndex: 0,
      imgList: [
        '../../../static/bg1.jpg',
        '../../../static/bg2.jpg'
      ],
      sortMenuList: [
        {
          title: '素类',
          image: '../../../static/sortMenuImg/huacai.png'
        },
        {
          title: '肉类',
          image: '../../../static/sortMenuImg/niupai.png'
        },
        {
          title: '蛋类',
          image: '../../../static/sortMenuImg/jidan.png'
        },
        {
          title: '主食',
          image: '../../../static/sortMenuImg/mifan.png'
        },
        {
          title: '面食',
          image: '../../../static/sortMenuImg/miantiao.png'
        },
        {
          title: '海鲜',
          image: '../../../static/sortMenuImg/longxia.png'
        },
        {
          title: '粥',
          image: '../../../static/sortMenuImg/zhou.png'
        },
        {
          title: '饮品',
          image: '../../../static/sortMenuImg/yinpin.png'
        },
        {
          title: '烘焙',
          image: '../../../static/sortMenuImg/pisa.png'
        },
        {
          title: '小吃',
          image: '../../../static/sortMenuImg/wanzi.png'
        }
      ],
      dailyMenuList:[
        {
          title:'菜谱1',
          imageUrl: '../../../static/footImg/foot1.jpg',
          author: '作者1'
        },
        {
          title:'菜谱2',
          imageUrl: '../../../static/footImg/foot2.jpg',
          author: '作者2'
        },
        {
          title:'菜谱3',
          imageUrl: '../../../static/footImg/foot3.jpg',
          author: '作者3'
        }
      ],
      newFoodList: [
        {
          title:'菜谱1',
          imageUrl: '../../../static/footImg/foot1.jpg',
          author: '作者1'
        },
        {
          title:'菜谱2',
          imageUrl: '../../../static/footImg/foot2.jpg',
          author: '作者2'
        },
        {
          title:'菜谱3',
          imageUrl: '../../../static/footImg/foot3.jpg',
          author: '作者3'
        },
        {
          title:'菜谱4',
          imageUrl: '../../../static/footImg/foot4.jpg',
          author: '作者4'
        },
        {
          title:'菜谱5',
          imageUrl: '../../../static/footImg/foot5.jpg',
          author: '作者5'
        },
        {
          title:'菜谱6',
          imageUrl: '../../../static/footImg/foot6.jpg',
          author: '作者6'
        },
      ],
      hotFoodList: [
        {
          title:'菜谱1',
          imageUrl: '../../../static/footImg/foot1.jpg',
          author: '作者1'
        },
        {
          title:'菜谱2',
          imageUrl: '../../../static/footImg/foot2.jpg',
          author: '作者2'
        },
        {
          title:'菜谱3',
          imageUrl: '../../../static/footImg/foot3.jpg',
          author: '作者3'
        },
        {
          title:'菜谱4',
          imageUrl: '../../../static/footImg/foot4.jpg',
          author: '作者4'
        },
        {
          title:'菜谱5',
          imageUrl: '../../../static/footImg/foot5.jpg',
          author: '作者5'
        },
        {
          title:'菜谱6',
          imageUrl: '../../../static/footImg/foot6.jpg',
          author: '作者6'
        },
        {
          title:'菜谱7',
          imageUrl: '../../../static/footImg/foot7.jpg',
          author: '作者7'
        },
        {
          title:'菜谱8',
          imageUrl: '../../../static/footImg/foot8.jpg',
          author: '作者8'
        },
        {
          title:'菜谱9',
          imageUrl: '../../../static/footImg/foot1.jpg',
          author: '作者9'
        },
        {
          title:'菜谱10',
          imageUrl: '../../../static/footImg/foot2.jpg',
          author: '作者10'
        },
        {
          title:'菜谱11',
          imageUrl: '../../../static/footImg/foot3.jpg',
          author: '作者11'
        },
        {
          title:'菜谱12',
          imageUrl: '../../../static/footImg/foot4.jpg',
          author: '作者12'
        },
      ],
      ingredientsList: [
        {
          title:'白菜',
          imageUrl: '../../../static/IngredientsImg/baicai.jpg',
          remarks: '百财不换'
        },
        {
          title:'白萝卜',
          imageUrl: '../../../static/IngredientsImg/bailuobo.jpg',
          remarks: '赛人参'
        },
        {
          title:'山药',
          imageUrl: '../../../static/IngredientsImg/shanyao.jpg',
          remarks: '补虚上品“小人参”'
        },
        {
          title:'芋头',
          imageUrl: '../../../static/IngredientsImg/yutou.jpg',
          remarks: '芋，我所欲也'
        },
        {
          title:'紫薯',
          imageUrl: '../../../static/IngredientsImg/zishu.jpg',
          remarks: '高贵优雅紫'
        },
        {
          title:'板栗',
          imageUrl: '../../../static/IngredientsImg/banli.jpg',
          remarks: '举累了放嘴里'
        },
        {
          title:'牛肉',
          imageUrl: '../../../static/IngredientsImg/niurou.jpg',
          remarks: '牛气冲天不解释'
        },
        {
          title:'猪里脊',
          imageUrl: '../../../static/IngredientsImg/zhuliji.png',
          remarks: '超嫩小鲜肉'
        },
        {
          title:'羊肉',
          imageUrl: '../../../static/IngredientsImg/yangrou.jpg',
          remarks: '暖身的恩物'
        },
        {
          title:'乌鸡',
          imageUrl: '../../../static/IngredientsImg/wuji.jpg',
          remarks: '滋补强身战斗鸡'
        },
        {
          title:'鸡翅',
          imageUrl: '../../../static/IngredientsImg/jichi.jpg',
          remarks: '老少通吃'
        },
        {
          title:'排骨',
          imageUrl: '../../../static/IngredientsImg/paigu.jpg',
          remarks: '可记得吮指之乐'
        },
      ]
    }
  },
  methods: {
    getList(){
      getList().then(res=>{
        console.log(res);
      })
    },
    // 打开登陆页
    openLogin () {
      this.$router.push({
        name: 'login'
      })
    }
  },
  created(){
    // this.getList();
  }
}
</script>

<style lang="less" scoped src="./home.less"/>

