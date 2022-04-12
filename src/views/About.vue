<template>
  <el-container>
    <el-header style="height: 100px;">
      <div class="nav">
        <div>
          <i class="el-icon-s-shop"></i>
          <span class="title" style="line-height: 60px">智慧城市大赛系统</span>
        </div>
        <div class="user" style="line-height: 60px">
          <el-dropdown style="width: 70px">
            <span>用户</span><i class="el-icon-arrow-down" style="margin-left: 5px;"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </el-header>
    <el-main class="body">
      <div class="block">
        <el-carousel trigger="click" height="500px">
          <el-carousel-item v-for="(i, index) in list" :key="index">
            <img :src="i">
          </el-carousel-item>
        </el-carousel>
         <el-divider></el-divider>
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span style="font-size: 24px;">优秀作品展示</span>
          </div>
          <div v-for="(work, index) in works" :key="index">
            <el-link type="primary" style="font-size: 18px;">
              {{work.name}}
            </el-link>
          </div>
        </el-card>
      </div>
    </el-main>
  </el-container>
</template>

<style>
  .nav{
    display: flex;
    justify-content: space-between;
    border:1px solid gainsboro;
    height: 60px;
  }
  .title{
    margin:auto;
  }

  .body {
      background-color: rgb(179, 230, 245);
  }
  .block{
    margin:auto;
    width: 80%;
    background-color:rgb(179, 230, 245);
  }
  .el-carousel{
    vertical-align: middle;
  }
  .el-carousel img {
    max-width: 100%;
    max-height: 100%;
    display: block;
    margin: auto;
  }
  .fantastic{
    margin-top: 20px;
  }
</style>

<script>
import request from '../utils/request'
export default {
  name: 'App',
  data() {
    return {
      index: 0,
      works: [],
      list: Array(5)
        .fill()
        .map((_, i) => `http://localhost:9090/work/getImage/${i}/`)
    }
  },
  created() {
      this.load()
  },
  methods: {
    load() {
      request.get('/work/get_list').then(res => {
          console.log(res)
          this.works = res
      })
    }
  }
}
</script>
