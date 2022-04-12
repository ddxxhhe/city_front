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
          <el-menu-item index="/zjk">专家库</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
        <i class="el-icon-menu"></i>
        <span slot="title">初赛管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/psgl">评审管理</el-menu-item>
          <el-menu-item index="/pyzbgl">评阅指标管理</el-menu-item>
          <el-menu-item index="/pyjdgl">评阅进度管理</el-menu-item>
          <el-menu-item index="/pyjggl">评阅结果管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
       <el-submenu index="3">
          <template slot="title">
          <i class="el-icon-message"></i>
          <span slot="title">报名团队管理</span>
          </template>
          <el-menu-item index="/xtxxsh">选题信息审核</el-menu-item>
          <el-menu-item index="/bmtdgl">报名团队管理</el-menu-item>
          <el-menu-item index="/zpgl">作品管理</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
          <i class="el-icon-message"></i>
          <span slot="title">奖项设置</span>
          </template>
          <el-menu-item index="/jxgl">奖项管理</el-menu-item>
          <el-menu-item index="/csdwjxsz">参赛单位奖项设置</el-menu-item>
          <el-menu-item index="/grjxsz">个人奖项设置</el-menu-item>
          <el-menu-item index="/tdjxsz">团队奖项设置</el-menu-item>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">用户中心</span>
          </template>
          <el-menu-item index="/grmmxg">个人密码修改</el-menu-item>
          <el-menu-item index="/xggrxx">修改个人信息</el-menu-item>
          <el-menu-item index="/frontpage">主页管理</el-menu-item>
        </el-submenu>
        <el-submenu index="6">
          <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">赛事管理</span>
          </template>
          <el-menu-item index="/new_contest">发起赛事</el-menu-item>
          <el-menu-item index="/contest_manage">赛事管理</el-menu-item>
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
