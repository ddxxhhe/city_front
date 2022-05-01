<template>
<el-container style="min-height: 100vh">
  <el-aside :width="sideWidth + 'px'" style="background-color: rgb(238, 241, 246); box-shadow: 2px 0 6px rgb(0 21 41 / 35%)">
    <AsideExp :isCollapse="isCollapse"/>
  </el-aside>
  <el-container>
    <h2>智慧城市产业资源可信共享与交换系统</h2>
    <h1>大赛服务子系统</h1>
    <el-header>
      <Header :collapseBtnClass="collapseBtnClass" :collapse="collapse"/>
    </el-header>
    <router-view />
  </el-container>
</el-container>
</template>

<script>
// @ is an alias to /src
import AsideExp from '../components/AsideExp'
import Header from '../components/Header'
export default {
  name: 'ManageExp',
    data() {
        return {
            collapseBtnClass: 'el-icon-s-fold',
            isCollapse: false,
            sideWidth: 200
        }
    },
    components: {
      AsideExp,
      Header
    },
    methods: {
      collapse() {
        this.isCollapse = !(this.isCollapse)
        if (this.isCollapse) {
          this.sideWidth = 64
          this.collapseBtnClass = 'el-icon-s-unfold'
        } else {
          this.sideWidth = 200
          this.collapseBtnClass = 'el-icon-s-fold'
        }
      }
}
}
</script>

<style>
</style>
