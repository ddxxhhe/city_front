<template>
    <el-menu :default-openeds="[]" style="min-height: 100%; overflow-x: hidden"
     background-color="rgb(48, 65, 86)"
     text-color="#fff"
     active-text-color="#ffd04b"
     :collapse-transition="false"
     :collapse="isCollapse"
     router>
     <div style="height: 60px; line-height: 60px; text-align:center">
      <b style="color: white">专家信息管理</b>
    </div>
      <el-menu-item index="/exp/job">
      <template slot="title">
      <i class="el-icon-house"></i>
      <span slot="title">评审任务</span>
      </template>
      </el-menu-item>
      <el-menu-item index="/exp/history">
      <template slot="title">
      <i class="el-icon-finished"></i>
      <span slot="title">评审历史</span>
      </template>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
        <i class="el-icon-menu"></i>
        <span slot="title">个人信息</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/exp/exp_pass">个人密码修改</el-menu-item>
          <el-menu-item index="/exp/exp_info">修改个人信息</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
</template>
<script>
export default {
  name: 'AsideExp',
  props: {
    isCollapse: Boolean
  }
}
</script>
<style>
</style>
