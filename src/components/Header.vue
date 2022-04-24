<template>
  <div style="font-size: 12px; border-bottom: 1px solid #ccc; line-height: 60px; display: flex">
    <div style="flex: 1; font-size: 20px">
      <span :class="collapseBtnClass"
            style="cursor: pointer"
            @click="collapse"></span>

      <el-breadcrumb separator="/"
                     style="display: inline-block; margin-left: 20px">
        <el-breadcrumb-item :to="'/'">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ currentPathName }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-dropdown style="width: 70px">
      <span>{{username}}</span><i class="el-icon-arrow-down"
         style="margin-left: 5px;"></i>
      <el-dropdown-menu slot="dropdown">
        <router-link to='/grxx'>
          <el-dropdown-item>个人信息</el-dropdown-item>
        </router-link>
        <router-link to='/xgmm'>
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
  data () {
    return {
      username: localStorage.getItem('username')
    }
  },
  methods: {
    exit () {
      window.localStorage.clear()
      window.location.reload()
    }
  }
}
</script>
<style>
</style>
