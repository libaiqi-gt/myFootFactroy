<template>
  <div class="container">
    <div class="leftBox">
      <div class="sortList">
        <span v-for="(item,index) in sortList" :key="index">{{item}}</span>
      </div>
    </div>
    <div class="rightBox">
      <h1>本周最受欢迎</h1>
      <div class="foodContainer">
        <div class="foodBox" v-for="(item,index) in foodList" :key="index">
          <img :src="item.img">
          <div class="foodInfo">
            <h2>{{item.title}}</h2>
            <div class="sortBox">
              <span v-for="(sort,sindex) in item.sort" :key="sindex">
                <span class="name">{{sort.name}}</span>
                <span>{{sindex === item.sort.length-1 ? '': '、'}}</span>
              </span>
            </div>
            <p>收藏 {{item.collectNum}}</p>
            <p class="author">{{item.author}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import food from '@/assets/food.jpg'
export default {
  name: 'menuList',
  data () {
    return {
      sortList: [
        '全部分类',
        '本周最受欢迎',
        '新秀菜谱',
        '往期头条',
        '月度最佳',
        '流行菜谱'
      ],
      foodList: [
        {
          img: food,
          title: '自制童年记忆里的牛奶布丁🌸秒杀外面卖的',
          sort: [
            {id: 1, name: '牛奶'},
            {id: 2, name: '淡奶油'},
            {id: 3, name: '白糖'},
            {id: 4, name: '淀粉'}
          ],
          author: '甜妈美食记',
          collectNum: 2
        },
        {
          img: food,
          title: '自制童年记忆里的牛奶布丁🌸秒杀外面卖的',
          sort: [
            {id: 1, name: '牛奶'},
            {id: 2, name: '淡奶油'},
            {id: 3, name: '白糖'},
            {id: 4, name: '淀粉'}
          ],
          author: '甜妈美食记',
          collectNum: 2
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped src="./menuList.less" />
