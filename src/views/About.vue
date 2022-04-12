<template>
  <div class="block">
    <el-carousel trigger="click" height="500px">
      <el-carousel-item v-for="(i, index) in list" :key="index">
        <img :src="i">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style>
  .title{
    margin:auto;
  }
  .block{
    margin:auto;
    width: 80%;
  }
  .el-carousel{
    border:1px solid black;
    vertical-align: middle;
  }
  .el-carousel__item {
    border:1px solid black;
  }
  .el-carousel img {
    max-width: 100%;
    max-height: 100%;
    display: block;
    margin: auto;
  }
</style>

<script>
export default {
  name: 'App',
  data() {
    return {
      index: 0,
      list: Array(5)
        .fill()
        .map((_, i) => `http://localhost:9090/work/getImage/${i}/`)
    }
  }
}
</script>