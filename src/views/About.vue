<template>
  <el-container>
    <el-header style="height: 100px;">
      <div class="nav">
        <div>
          <i class="el-icon-s-shop"></i>
          <span class="title" style="line-height: 60px">智慧城市大赛管理系统</span>
        </div>
        <div class="user" style="line-height: 60px">
          <el-dropdown style="width: 70px" v-show="islogin">
            <span>{{username}}</span><i class="el-icon-arrow-down" style="margin-left: 5px;"></i>
            <el-dropdown-menu slot="dropdown">
        <router-link to='/reg/info' v-if="role==='0'">
          <el-dropdown-item>个人中心</el-dropdown-item>
        </router-link>
        <router-link to='/exp/exp_info' v-if="role==='2'">
          <el-dropdown-item>个人中心</el-dropdown-item>
        </router-link>
        <router-link to='/grxx' v-if="role==='255'">
          <el-dropdown-item>个人信息</el-dropdown-item>
        </router-link> 
              <router-link to='/xgmm' v-if="role==='255'">
                <el-dropdown-item>修改密码</el-dropdown-item>
              </router-link>
              <router-link to='/reg/password' v-if="role==='0'">
                <el-dropdown-item>修改密码</el-dropdown-item>
              </router-link>
              <router-link to='/exp/exp_pass' v-if="role==='2'">
                <el-dropdown-item>修改密码</el-dropdown-item>
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
            <!-- <router-link to='/login'
                         v-show="!islogin"> -->
            <el-button type="text" style="font-size: 10px;" @click="expEnter" v-show="!islogin">专家入口</el-button>
            <!-- </router-link> -->
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
  data() {
    return {
      islogin: localStorage.getItem('Authorization'),
      username: localStorage.getItem('username'),
      role: localStorage.getItem('role'),
      index: 0,
      contests: [],
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
          // console.log(res)
          this.works = res
      })
      request.get('/contest/get').then(res => {
          // console.log(res)
          this.contests = res
      })
      this.islogin = localStorage.getItem('Authorization')
      // console.log('1111')
      // console.log(this.islogin)
      console.log("以下为localStorage")
      console.log(localStorage)
    },
    expEnter() {
      var storage = window.localStorage
      storage.expertTag = 1
      this.$router.push('/login')
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
