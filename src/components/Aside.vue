<template>
    <el-menu :default-openeds="['1', '3']" style="min-height: 100%; overflow-x: hidden"
     background-color="rgb(48, 65, 86)"
     text-color="#fff"
     active-text-color="#ffd04b"
     :collapse-transition="false"
     :collapse="isCollapse"
     router>
     <div style="height: 60px; line-height: 60px; text-align:center">
      <b style="color: white">后台管理系统</b>
    </div>
      <el-menu-item index="/">
      <template slot="title">
      <i class="el-icon-house"></i>
      <span slot="title">系统主页</span>
      </template>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
        <i class="el-icon-message"></i>
        <span slot="title">基础数据管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/admin">赛区管理员</el-menu-item>
          <el-menu-item index="1-2">专家库</el-menu-item>
          <el-menu-item index="1-3">研究生培养单位联系人</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
        <i class="el-icon-menu"></i>
        <span slot="title">初赛管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1">评审管理</el-menu-item>
          <el-menu-item index="2-2">评阅指标管理</el-menu-item>
          <el-menu-item index="2-3">评阅进度管理</el-menu-item>
          <el-menu-item index="2-4">评阅结果管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
</template>
<script>
export default {
  name: 'Aside',
  props: {
    isCollapse: Boolean
  }
}
</script>
<style>
</style>
