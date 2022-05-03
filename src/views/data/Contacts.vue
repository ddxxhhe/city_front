<template>
  <div>
    <el-main>
      <div style="margin-bottom: 15px">
        <span style="font-size: 13px; margin-right: 10px;">单位代码</span><el-input placeholder="请输入内容" v-model="organization_id" style="width: 250px; margin-top: 10px;"></el-input>
        <span style="font-size: 13px; margin-left: 50px;">单位名称</span><el-input placeholder="请输入内容" v-model="organization_name" style="width: 250px; margin-left: 10px;"></el-input>
      </div>
      <div style="float: right">
        <span style="margin-right: 10px"><el-button @click="load">查询</el-button></span>
        <span><el-button @click="empty">清空</el-button></span>
      </div>
      <el-dialog title="联系人信息" :visible.sync="dialogTableVisible">
  <el-table :data="gridData">
    <el-table-column property="name" label="姓名" width="200"></el-table-column>
    <el-table-column property="organization" label="所在单位" width="250"></el-table-column>
    <el-table-column property="phone" label="联系电话"></el-table-column>
  </el-table>
</el-dialog>
    <div style="font-size: 12px; border-bottom: 1px solid #ccc; line-height: 60px; display: flex; margin-top: 60px">
    </div>
    </el-main>
  </div>
</template>

<script>
import request from '../../utils/request'
export default {
  name: 'Contacts',
  data() {
    return {
      organization_id: '',
      organization_name: '',
      dialogTableVisible: false,
      gridData: [{
        name: '',
        organization: '',
        phone: ''
      }]
    }
  },
  created() {
  },
  methods: {
    empty() {
      this.organization_id = ''
      this.organization_name = ''
    },
    load() {
      this.dialogTableVisible = true
      request.get('/master/query_master', {
        params: {
          organization_id: this.organization_id,
          organization_name: this.organization_name
        }
      }).then(res => {
        console.log(res)
        this.gridData.splice(0, this.gridData.length)
        for (var i = 0; i < res.length; i++) {
          this.gridData.push({ name: res[i].name, organization: res[i].organization_name, phone: res[i].phone })
        }
        console.log(this.gridData)
      })
    }
  }
}
</script>

<style>

</style>
