<template>
<!-- 为 ECharts 准备一个具备大小的 DOM -->
  <div>
  <el-row>
  <el-col :span="12">
  <div class="first">
    <Radar />
  </div>
  </el-col>
  <el-col :span="12">
    <div class="first">
      <Pie style="first"/>
    </div>   
  </el-col>
</el-row>
      <Graph />
      <el-divider></el-divider>
      <KG />
  </div>
</template>
<script>
import Radar from '../../components/radar.vue'
import Pie from '../../components/pie.vue'
import Graph from '../../components/Graph.vue'
import KG from '../KG.vue'
export default {
  components: { 
    Radar,
    Pie,
    Graph,
    KG
  },
  name: 'DataManage'
}
</script>
<style lang="less">
.first {
  padding-top: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
</style>
