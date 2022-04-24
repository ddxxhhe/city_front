<template>
    <el-menu :default-openeds="[]" style="min-height: 100%; overflow-x: hidden"
     background-color="rgb(48, 65, 86)"
     text-color="#fff"
     active-text-color="#ffd04b"
     :collapse-transition="false"
     :collapse="isCollapse"
     router>
     <div style="height: 60px; line-height: 60px; text-align:center">
      <b style="color: white">学生信息管理</b>
    </div>
      <el-menu-item index="/ques">
      <template slot="title">
      <i class="el-icon-house"></i>
      <span slot="title">我的赛事</span>
      </template>
      </el-menu-item>
      <el-menu-item index="/awards">
      <template slot="title">
      <i class="el-icon-trophy"></i>
      <span slot="title">我的奖项</span>
      </template>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
        <i class="el-icon-menu"></i>
        <span slot="title">用户中心</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/password">个人密码修改</el-menu-item>
          <el-menu-item index="/info">修改个人信息</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
</template>
<script>
export default {
  name: 'AsideStu',
  props: {
    isCollapse: Boolean
  }
}
</script>
<style>
</style>
