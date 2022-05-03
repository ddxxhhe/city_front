<template>
  <el-container>
    <el-header style="height: 100px;">
      <div class="nav">
        <div>
          <i class="el-icon-s-shop"></i>
          <span class="title"
                style="line-height: 60px">智慧城市大赛管理系统</span>
        </div>
        <div class="user"
             style="line-height: 60px">
          <el-dropdown style="width: 70px"
                       v-show="islogin">
            <span>{{username}}</span><i class="el-icon-arrow-down"
               style="margin-left: 5px;"></i>
            <el-dropdown-menu slot="dropdown">
              <router-link to='/grxx'>
                <el-dropdown-item>个人信息</el-dropdown-item>
              </router-link>
              <router-link to='/xgmm'>
                <el-dropdown-item>修改密码</el-dropdown-item>
              </router-link>
              <router-link to='/home'
                           v-show="isAdmin">
                <el-dropdown-item>管理后台</el-dropdown-item>
              </router-link>
              <el-dropdown-item>
                <div @click="exit">退出</div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <div class="head_right">
            <router-link to='/login'
                         v-show="!islogin">
              <div style="font-size: 10px;margin-right: 4px">登录</div>
            </router-link>
            <router-link to='/register'
                         v-show="!islogin">
              <div style="font-size: 10px;margin-right: 4px">注册</div>
            </router-link>
            <router-link to='/log_expert'
                         v-show="!islogin">
              <div style="font-size: 10px;">专家入口</div>
            </router-link>
          </div>
        </div>
      </div>
    </el-header>
    <el-main class="body">
      <div class="block">
        <el-carousel trigger="click"
                     height="500px"
                     ref="carousel">
          <el-carousel-item v-for="(item, index) in contests"
                            :key="index">
            <router-link :to="{path: '/contest_detail', query: {id: item.id }}">
              <img :src="buildUrl(item.image)">
            </router-link>
          </el-carousel-item>
        </el-carousel>
        <el-divider></el-divider>
        <div class="cards">
          <el-card class="box-card"
                   shadow="hover"
                   style="width: 40%">
            <div slot="header"
                 class="clearfix">
              <span style="font-size: 24px;">赛事列表</span>
            </div>
            <div v-for="(contest, index) in contests"
                 :key="index">
              <router-link :to="{path: '/contest_detail', query: {id: contest.id }}">
                {{contest.name}}
              </router-link>
            </div>
          </el-card>
          <el-card class="box-card"
                   shadow="hover"
                   style="width: 40%">
            <div slot="header"
                 class="clearfix">
              <span style="font-size: 24px;">优秀作品展示</span>
            </div>
            <div v-for="(work, index) in works"
                 :key="index">
              <router-link :to="{path: '/work_detail', query: {id: work.id }}">
                {{work.name}}
              </router-link>
            </div>
          </el-card>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<style>
.cards {
  display: flex;
  justify-content: space-around;
}
.nav {
  display: flex;
  justify-content: space-between;
  border: 1px solid gainsboro;
  height: 60px;
}
.title {
  margin: auto;
}

.body {
  background-color: rgb(179, 230, 245);
}
.block {
  margin: auto;
  width: 80%;
  background-color: rgb(179, 230, 245);
}
.el-carousel {
  vertical-align: middle;
}
.el-carousel img {
  max-width: 100%;
  max-height: 100%;
  display: block;
  margin: auto;
}
.fantastic {
  margin-top: 20px;
}
.head_right {
  display: flex;
}
</style>

<script>
import request from '../utils/request'
export default {
  name: 'App',
  data () {
    return {
      islogin: localStorage.getItem('Authorization'),
      isAdmin: localStorage.getItem('role') === '255',
      username: localStorage.getItem('username'),
      index: 0,
      contests: [],
      works: [],
      list: Array(5)
        .fill()
        .map((_, i) => `http://localhost:9090/work/getImage/${i}/`),
      imgs: [
        { url: require('../assets/1.jpg'), id: 1 },
        { url: require('../assets/2.jpg'), id: 2 },
        { url: require('../assets/3.jpg'), id: 3 },
        { url: require('../assets/4.jpg'), id: 4 },
        { url: require('../assets/5.jpg'), id: 5 },
        { url: require('../assets/6.jpg'), id: 6 },
        { url: require('../assets/7.jpg'), id: 7 }
      ]
    }
  },
  created () {
    this.load()
  },
  methods: {
    load () {
      console.log('Admin')
      console.log(localStorage.getItem('role'))
      console.log(this.isAdmin)
      request.get('/work/get_list').then(res => {
        console.log(res)
        this.works = res
      })
      request.get('/contest/get').then(res => {
        this.contests = res
        console.log(this.contests)
      })
      this.islogin = localStorage.getItem('Authorization')
      console.log('1111')
      console.log(this.islogin)
    },
    exit () {
      console.log('exit')
      window.localStorage.clear()
      window.location.reload()
    },
    linkTo () {
      const activeIndex = this.$refs.carousel.activeIndex
      window.open(this.imgs[activeIndex].link, '_blank')
    },
    buildUrl (url) {
      console.log(url)
      if (url === null || url === '' || typeof url === 'undefined') {
        return require('../assets/undefined.jpg')
      }
      return require('../assets/' + url)
    }
  }
}
</script>
