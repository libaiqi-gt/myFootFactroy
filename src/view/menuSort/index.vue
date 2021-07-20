<template>
  <div class="menuSort">
    <main>
      <h1>食材分类</h1>
      <div class="tabel" v-for="(item,index) in sortList" :key="index">
        <div class="title">
          <span>{{item.name}}</span>
        </div>
        <div class="childFoodBox">
          <div v-for="(child,findex) in item.detailSort" :key="findex" class="child" @click="openSortCookbook(child.id)">
            <span>{{child.name}}</span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { getDetailsSort } from '@/api/home'
export default {
  name: 'menuSort',
  data () {
    return {
      sortList: [
        {
          title: '时令与热门',
          childFood: ['鸡肉','鸡翅','鸡蛋','牛肉','猪肉','排骨','鸡肉','鸡翅','鸡蛋','牛肉','猪肉','排骨']
        },
      ]
    }
  },
  methods: {
    getDetailsSortData(){
      getDetailsSort().then(res=>{
        this.sortList = res.filter(item=>{
          return item.detailSort.length !== 0;
        });
      });
    },
    openSortCookbook(id){
      this.$router.push({
        name: 'menuList',
        query: {smallClassId:id}
      });
    }
  },
  created(){
    this.getDetailsSortData();
  }
}
</script>

<style lang="less" scoped src="./index.less" />
