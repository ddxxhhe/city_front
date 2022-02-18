<template>
<div style="font-size: 12px; border-bottom: 1px solid #ccc; line-height: 60px; display: flex">
  <div style="flex: 1; font-size: 20px">
  <span :class="collapseBtnClass" style="cursor: pointer" @click="collapse"></span>

   <el-breadcrumb separator="/" style="display: inline-block; margin-left: 20px">
    <el-breadcrumb-item :to="'/'">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{ currentPathName }}</el-breadcrumb-item>
  </el-breadcrumb>
  </div>
  <el-dropdown style="width: 70px">
    <span>王小虎</span><i class="el-icon-arrow-down" style="margin-left: 5px;"></i>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item>个人信息</el-dropdown-item>
      <el-dropdown-item>退出</el-dropdown-item>
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
  }
}
</script>
<style>
</style>
