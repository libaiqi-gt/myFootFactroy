<template>
  <div class="menuSort">
    <main>
      <h1>食材分类</h1>
      <div class="tabel" v-for="(item,index) in sortList" :key="index">
        <div class="title">
          <span>{{item.title}}</span>
        </div>
        <div class="childFoodBox">
          <div v-for="(child,findex) in item.childFood" :key="findex" class="child">
            <span>{{child}}</span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'menuSort',
  data () {
    return {
      sortList: [
        {
          title: '时令与热门',
          childFood: ['鸡肉','鸡翅','鸡蛋','牛肉','猪肉','排骨','鸡肉','鸡翅','鸡蛋','牛肉','猪肉','排骨']
        },
        {
          title: '肉禽类',
          childFood: ['猪肉','排骨','里脊','猪蹄','五花肉','肋排','牛肉','牛排','肥牛','羊肉','猪肝','猪肘']
        },
        {
          title: '肉禽类',
          childFood: ['猪肉','排骨','里脊','猪蹄','五花肉','肋排','牛肉','牛排','肥牛','羊肉','猪肝','猪肘']
        },
        {
          title: '肉禽类',
          childFood: ['猪肉','排骨','里脊','猪蹄','五花肉','肋排','牛肉','牛排','肥牛','羊肉','猪肝','猪肘']
        },
        {
          title: '肉禽类',
          childFood: ['猪肉','排骨','里脊','猪蹄','五花肉','肋排','牛肉','牛排','肥牛','羊肉','猪肝','猪肘']
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped src="./index.less" />
