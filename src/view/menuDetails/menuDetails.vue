<template>
  <div class="container">
    <nav>
      <span v-for="(item,index) in nav" :key="index">
        <span class="navTitle">{{item}}</span>
        <span v-if="index!==nav.length-1"> > </span>
      </span>
    </nav>
    <div class="detailsBox">
      <h1>{{detailsObj.title}}</h1>
      <div class="infoBox">
        <div class="left">
          <img :src="detailsObj.image" :alt="detailsObj.title">
        </div>
        <div class="right">
          <div class="personalInfo">
            <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" size="60" />
            <span class="userName">{{detailsObj.userName}}</span>
          </div>
          <div class="introduce">
            <pre>{{detailsObj.introduce}}</pre>
          </div>
          <div class="material">
            <h1>用料</h1>
            <div class="materialBox" v-for="(item,index) in detailsObj.material" :key="index">
              <span>{{item.name}}</span>
              <span>{{item.size}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="menuStep">
        <h1>{{detailsObj.title}}制作步骤</h1>
        <div class="stepBox" v-for="(item,index) in detailsObj.step" :key="index">
          <span class="step">{{index+1}}</span>
          <span class="content">{{item.content}}</span>
          <img :src="item.stepImage">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'menuDetails',
  data () {
    return {
      nav: ['首页','分类','标题'],
      detailsObj: {
        title: '作品标题',
        image: '../../../static/footImg/foot1.jpg',
        userName: '作者1',
        introduce: `夏天不能少的就是雪糕啦，今天做一款浓香丝滑的牛奶布丁雪糕🍦，奶香浓郁真的超好吃呀～～
这款雪糕真的一点冰渣都没有，浓郁的奶香味，夹杂着葡萄干的甜香味，浓香丝滑，入口即化，葡萄干🍇的颗粒感，更让你回味无穷♾～ `,
        material: [
          {name:'牛奶',size:'200g'},
          {name:'淡奶油',size:'150g'},
          {name:'白糖',size:'适量'}
        ],
        step: [
          {
            content: '自制无冰渣葡萄干雪糕',
            stepImage: '../../../static/footImg/foot1.jpg'
          },
          {
            content: '奶香味浓郁，真的好好吃',
            stepImage: '../../../static/footImg/foot1.jpg'
          },
          {
            content: '记忆中的味道',
            stepImage: '../../../static/footImg/foot1.jpg'
          },
        ]
      }
    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped src="./menuDetails.less" />
