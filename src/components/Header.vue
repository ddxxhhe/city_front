<template>
<div style="font-size: 12px; border-bottom: 1px solid #ccc; line-height: 60px; display: flex">
  <div style="flex: 1; font-size: 20px">
  <span :class="collapseBtnClass" style="cursor: pointer" @click="collapse"></span>

   <el-breadcrumb separator="/" style="display: inline-block; margin-left: 20px">
    <el-breadcrumb-item :to="'/'">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{ currentPathName }}</el-breadcrumb-item>
  </el-breadcrumb>
  </div>
  <el-dropdown style="width: 100px">
    <span>{{username}}</span><i class="el-icon-arrow-down" style="margin-left: 5px;"></i>
      <el-dropdown-menu slot="dropdown">
        <router-link to='/reg/info' v-if="role==='0'">
          <el-dropdown-item>个人信息</el-dropdown-item>
        </router-link>
        <router-link to='/grxx' v-if="role==='255'">
          <el-dropdown-item>个人信息</el-dropdown-item>
        </router-link> 
        <router-link to='/exp/exp_info' v-if="role==='2'">
          <el-dropdown-item>个人信息</el-dropdown-item>
        </router-link>        
        <router-link to='/reg/password' v-if="role==='0'">
          <el-dropdown-item>修改密码</el-dropdown-item>
        </router-link>
        <router-link to='/xgmm' v-if="role==='255'">
          <el-dropdown-item>修改密码</el-dropdown-item>
        </router-link>
        <router-link to='/exp/exp_pass' v-if="role==='2'">
          <el-dropdown-item>修改密码</el-dropdown-item>
        </router-link>
        <el-dropdown-item @click="exit">退出</el-dropdown-item>
      </el-dropdown-menu>
  </el-dropdown>
</div>

</template>
<script>
export default {
  name: 'Header',
  props: {
    collapseBtnClass: String,
    collapse: {}
  },
  computed: {
    currentPathName () {
      return this.$store.state.currentPathName
    }
  },
  data() {
    return {
      username: localStorage.getItem('username'),
      role: localStorage.getItem('role')
    }
  },
  methods: {
    exit () {
      console.log(123)
      window.localStorage.clear()
      window.location.reload()     
    }   
  }
}
</script>
<style>
</style>
