<template>
  <div class="container">
    <div v-for="(item,index) in sortMenuList" :key="index" class="menuItem">
      <img :src="item.image"/>
      <span style="padding-left:10px">{{item.title}}</span>
    </div>
  </div>
</template>

<script>
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
