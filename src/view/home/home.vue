<template>
  <div>
    <Icon type="ios-add-circle" />
  </div>
</template>

<script>
import { getList } from '@/api/home'
export default {
  name: 'home',
  data () {
    return {

    }
  },
  methods: {
    getList(){
      getList().then(res=>{
        console.log(res);
      })
    }
  },
  created(){
    this.getList();
  }
}
</script>