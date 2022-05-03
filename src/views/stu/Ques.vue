<template>
  <div>
      <el-main>
      <div style="margin-bottom: 15px">
        <span style="font-size: 13px; margin-right: 10px;">赛事名称</span><el-input placeholder="请输入内容" v-model="ques_name" style="width: 250px; margin-top: 10px;"></el-input>
        <span style="font-size: 13px; margin-left: 10px;">参赛状态</span><el-input placeholder="请输入内容" v-model="ques_state" style="width: 250px; margin-left: 10px;"></el-input>
      <div style="float: right">
        <span style="margin-right: 10px"><el-button @click="load">查询</el-button></span>
        <span><el-button @click="empty">清空</el-button></span>
      </div>
      </div>
      <div style="float: left; margin-bottom: 10px">
        <el-button type="primary" style="margin-bottom:5px" @click="handleAdd"><i class="el-icon-circle-plus-outline" style="margin-right:5px"></i>加入团队</el-button>
      </div>
      <el-table :data="tableData" border strips :header-cell-class-name="headerBg"
      @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column type="index" :index="indexFn" width="50">
        </el-table-column>
        <el-table-column label="操作" width="250">
          <!-- eslint-disable-next-line -->
          <template slot-scope="scope">
                        <el-upload
                class="upload-demo"
                :action="actionUrl"
                multiple
                :limit="1"
                :on-exceed="handleExceed"
                :file-list="fileList">
                <el-button type="text">提交参赛作品</el-button>
            </el-upload> / 
            <el-button type="text" style="margin-left: 0" slot="reference">查看参赛作品</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="question.name" label="赛题名称" width="300">
        </el-table-column>
        <el-table-column prop="user_state" label="成员状态" width="300">
        </el-table-column>
        <el-table-column prop="work_state" label="作品状态">
        </el-table-column>
      </el-table>
      <div style="padding: 10px 0;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[2, 5, 10, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          style="float: right">
      </el-pagination>
      </div>
      <el-dialog title="填写邀请码" :visible.sync="dialogFormVisible" width="30%">
        <el-form :model="form" label-width="120px" :rules="rules" ref="form">
          <el-form-item label="团队邀请码：" prop="invite_id">
            <el-input v-model="form.invite_id">
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="save()">确 定</el-button>
        </div>
      </el-dialog>
    </el-main>
  </div>
</template>
<script>
import request from '../../utils/request'
export default {
  name: 'Ques',
  data() {
    return {
      actionUrl: "http://localhost:9090/team/upload_work/",
      team_id: '',
      ques_name: '',
      ques_state: '',
        tableData: [],
        tableCache: [],
        total: 0,
        pageNum: 1,
        pageSize: 5,
        gender_show: 0,
        name: '',
        organization: '',
        phone: '',
        headerBg: 'headerBg',
        dialogFormVisible: false,
        form: {
          invite_id: ''
        },
        rules: {
          name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
          gender: [{ required: true, message: '请选择性别', trigger: 'change' }]
        },
        multipleSelection: []
    }
},
    created() {
      this.load()
    },
    methods: {
      load() {
        request.post('/user/get_ques', window.localStorage.getItem('id')).then(res => {
        console.log(res)
        this.team_id = res[0].team_id
        this.actionUrl = this.actionUrl + this.team_id
        // for (var i = 0; i < res.length; i++) {
        //   this.tableData[i].question = res[i].question
        //   this.tableData[i].name = res[i].name
        // }
        // this.tableData = res
        this.tableCache = res
        // this.getTableData()
        this.total = res.length
        // console.log(this.tableData)
        // console.log(res.data)
        //根据team_id查询当前加入团队的成员
        request.post('/user/get_mem', this.team_id).then(res => {
          console.log("以下为团队成员")
          console.log(res)
          for (var i = 0; i < res.length; i++) {
            if (i === 0) {
              this.tableCache[0].user_state = res[i].name
            } else {
              this.tableCache[0].user_state = this.tableCache[0].user_state + ' / ' + res[i].name
            }
          }
          request.post('/team/get_workPath', this.team_id).then(res => {
            if (res.work_path != null) {              
              this.tableCache[0].work_state = '已提交'
            } else {
              this.tableCache[0].work_state = '未提交'
            }
          this.getTableData()
          console.log(this.tableData)            
          })

        })
      })
      },
      getTableData() {
          if (this.tableCache) {
          this.tableData = this.tableCache.slice(
            (this.pageNum - 1) * this.pageSize,
            this.pageNum * this.pageSize
        )            
          }
      },
            handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      },
      empty() {
        this.name = ''
        this.organization = ''
        this.phone = ''
        this.load()
      },
      indexFn(index) {
        index = (index + 1) + (this.pageNum - 1) * this.pageSize
        return index
      },
      handleSizeChange(pageSize) {
        this.pageSize = pageSize
        this.load()
      },
      handleCurrentChange(pageNum) {
        this.pageNum = pageNum
        this.load()
      },
      //加入团队
      handleAdd() {
        this.form = {}
        this.dialogFormVisible = true
      },      
      save() {
        request.get('/user/setTeam', {
          params: {
            id: window.localStorage.getItem('id'),
            invite_id: this.form.invite_id          
          }
        }).then(res => {
          if (res) {
            alert('加入团队成功')
            this.dialogFormVisible = false
            this.load()
          }
        })
      },
      handleEdit(row) {
        this.form = JSON.parse(JSON.stringify(row))
        this.dialogFormVisible = true
      },
      handleDele(id) {
        request.get('/admin/delete_admin/' + id).then(res => {
          if (res.code === 200) {
          this.$message.success('删除成功')
          this.load()
        } else {
          this.$message.error('删除失败')
        }
        })
      },
      handleSelectionChange(val) {
        console.log(val)
        this.multipleSelection = val
      },
      handleBatchDele() {
        const ids = this.multipleSelection.map(v => v.id)
        request.post('/admin/delete_batch', ids).then(res => {
          if (res === true) {
          this.$message.success('批量删除成功')
          this.load()
        } else {
          this.$message.error('批量删除失败')
        }
        })
      },
      exp() {
        window.open('http://localhost:9090/admin/export')
      },
      importSuccess() {
        this.$message.success('文件导入成功')
      }
    }
}
</script>
<style>
.headerBg {
  background: #fafafa!important;
}
</style>
