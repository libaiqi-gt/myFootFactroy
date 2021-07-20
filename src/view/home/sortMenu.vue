<template>
  <div class="container">
    <div v-for="(item,index) in sortMenuList" :key="index" class="menuItem" @click="openSortCookbook(item.id)">
      <img :src="`${item.imgUrl}`"/>
      <span style="padding-left:10px">{{item.name}}</span>
    </div>
  </div>
</template>

<script>
import { getSortCookbook } from '@/api/home'
export default {
  name: 'sortMenu',
  props: {
    sortMenuList: Array
  },
  data () {
    return {

    }
  },
  methods: {
    openSortCookbook(id){
      this.$router.push({
        name: 'menuList',
        query: {largeClassId:id}
      })
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  margin: 20px;
  max-width: 300px;
  border: 1px solid #f9f1db;
  background-color: #f9f1db;
  border-radius: 8px;
  box-shadow: 5px 5px 5px #eeeeee;
  .menuItem {
    display: flex;
    padding: 5px 20px;
    align-items: center;
    cursor: pointer;
    &:hover {
      background-color: rgb(241, 209, 120);
      border-radius: 8px;
    }
    img {
      width: 32px;
      height: 32px;
    }
  }
}
</style>
