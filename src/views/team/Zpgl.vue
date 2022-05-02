<template>
  <div>
    <el-main>
      <div class="box">
        <div>
          <span style="font-size: 13px; margin-right: 10px;">赛题名称</span>
          <el-input placeholder="请输入内容"
                    v-model="question_name"
                    style="width: 250px;"></el-input>
        </div>
        <div>
          <span style="font-size: 13px; margin-right: 10px;">队长姓名</span>
          <el-input placeholder="请输入内容"
                    v-model="team_leader"
                    style="width: 250px;"></el-input>
        </div>
        <div>
          <span style="font-size: 13px; margin-right: 10px;">队长所属学校</span>
          <el-input placeholder="请输入内容"
                    v-model="leader_school"
                    style="width: 250px;"></el-input>
        </div>
      </div>
      <div class="box0">
        <div style="margin-right: 10%">
          <span style="font-size: 13px; margin-right: 10px;">队长手机号</span>
          <el-input placeholder="请输入内容"
                    v-model="leader_phone"
                    style="width: 250px;"></el-input>
        </div>
        <div>
          <span style="font-size: 13px; margin-right: 10px;">团队名称</span>
          <el-input placeholder="请输入内容"
                    v-model="name"
                    style="width: 250px;"></el-input>
        </div>
      </div>
      <el-row style="margin-bottom: 20px;">
        <el-col :span="8">
          <div style="margin-left: 12%">
            <span style="font-size: 13px; margin-right: 10px;">作品状态</span>
            <el-radio v-model="work_status"
                      label="1">未提交</el-radio>
            <el-radio v-model="work_status"
                      label="2">提交完成</el-radio>
          </div>
        </el-col>
        <el-col :span="8">
          <div style="margin-left: 12%">
            <span style="font-size: 13px; margin-right: 10px;">参赛状态</span>
            <el-radio v-model="contest_status"
                      label="processing">审核中</el-radio>
            <el-radio v-model="contest_status"
                      label="ok">审核通过</el-radio>
            <el-radio v-model="contest_status"
                      label="fail">审核未通过</el-radio>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="box1">
            <div>
              <span style="margin-left: 110px">
                <el-button @click="load">查询</el-button>
              </span>
              <span style="margin-left: 10px">
                <el-button @click="empty">清空</el-button>
              </span>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-table :data="tableData"
                border
                strips
                :header-cell-class-name="headerBg"
                @selection-change="handleSelectionChange">
        <el-table-column type="index"
                         :index="indexFn"
                         width="50">
        </el-table-column>
        <el-table-column label="操作"
                         width="160">
          <!-- eslint-disable-next-line -->
          <template slot-scope="scope">
            <el-button type="text"
                       style="margin-left: 0"
                       slot="reference"
                       @click="handleShow(scope.row.id)">查看作品</el-button>
            <el-button type="text"
                       style="margin-left: 0"
                       slot="reference"
                       @click="SearchOwner(scope.row.work_id)">查看首发者</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="question_name"
                         label="赛题"
                         width="140">
        </el-table-column>
        <el-table-column prop="name"
                         label="团队名称"
                         width="140">
        </el-table-column>
        <el-table-column prop="work_name"
                         label="作品名称"
                         width="200">
        </el-table-column>
        <el-table-column prop="team_leader"
                         label="队长姓名"
                         width="140">
        </el-table-column>
        <el-table-column prop="leader_school"
                         label="队长学校"
                         width="140">
        </el-table-column>
        <el-table-column prop="advisor"
                         label="指导教师">
        </el-table-column>
      </el-table>
      <div style="padding: 10px 0;">
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="pageNum"
                       :page-sizes="[2, 5, 10, 20]"
                       :page-size="pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="total"
                       style="float: right">
        </el-pagination>
      </div>
      <el-dialog title="作品信息"
                 :visible.sync="dialogFormVisible"
                 width="60%">
        <el-descriptions title="用户信息"
                         border>
          <el-descriptions-item label="作品名">{{this.workInfo.name}}</el-descriptions-item>
          <el-descriptions-item label="作者">{{this.workInfo.authors}}</el-descriptions-item>
          <el-descriptions-item label="赛事名">{{this.workInfo.contest_name}}</el-descriptions-item>
          <el-descriptions-item label="简介">{{this.workInfo.content}}</el-descriptions-item>
          <el-descriptions-item label="热度">{{this.workInfo.likes}}</el-descriptions-item>
          <el-descriptions-item label="作品链接">{{this.workInfo.urly}}</el-descriptions-item>
        </el-descriptions>
        <div slot="footer"
             class="dialog-footer">
          <el-button type="primary"
                     @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="作品信息"
                 :visible.sync="dialogFormVisible1"
                 width="60%">
        <el-descriptions title="首发团队信息"
                         border>
          <el-descriptions-item label="团队名">{{this.teamInfo.name}}</el-descriptions-item>
          <el-descriptions-item label="队长">{{this.teamInfo.team_leader}}</el-descriptions-item>
          <el-descriptions-item label="队长电话">{{this.teamInfo.leader_phone}}</el-descriptions-item>
          <el-descriptions-item label="队长学校">{{this.teamInfo.leader_school}}</el-descriptions-item>
          <el-descriptions-item label="指导教师">{{this.teamInfo.advisor}}</el-descriptions-item>
        </el-descriptions>
        <div slot="footer"
             class="dialog-footer">
          <el-button type="primary"
                     @click="dialogFormVisible1 = false">确 定</el-button>
        </div>
      </el-dialog>
    </el-main>
  </div>
</template>

<style>
.headerBg {
  background: #fafafa !important;
}
.box {
  width: 95%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-bottom: 10px;
}
.box0 {
  margin-left: 5%;
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
}
.box1 {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap-reverse;
  justify-content: space-around;
  margin-right: 10%;
  margin-bottom: 10px;
}
.box2 {
  width: 90%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 10px;
}
</style>

<script>
import request from '../../utils/request'
export default {
  name: 'Admin',
  data () {
    return {
      works: [],
      tableCache: [],
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 5,
      question_name: '',
      name: '',
      work_id: 0,
      work_name: '',
      work_status: 0,
      contest_status: '',
      team_leader: '',
      leader_school: '',
      leader_phone: '',
      advisor: '',
      headerBg: 'headerBg',
      dialogFormVisible: false,
      workInfo: {},
      teamInfo: {},
      form: {
        name: '',
        gender: ''
      },
      rules: {
      },
      multipleSelection: []
    }
  },
  created () {
    this.load()
  },
  methods: {
    load () {
      this.tableCache = []
      console.log('66666666')
      console.log(this.contest_status)
      const data = {
        question_name: this.question_name,
        name: this.name,
        contest_status: this.contest_status,
        leader_phone: this.leader_phone,
        leader_school: this.leader_school,
        team_leader: this.team_leader,
        work_status: this.work_status
      }
      request.post('/team/search_selection_info', data).then(res => {
        for (var i = 0; i < res.length; i++) {
          if (res[i].question != null) {
            res[i].question_name = res[i].question.name
          } else {
            res[i].question_name = '--'
          }
          if (res[i].work != null && res[i].work.length >= 1) {
            for (var j = 0; j < res[i].work.length; j++) {
              var temp = JSON.parse(JSON.stringify(res[i])) // deep copy
              var tempWork = res[i].work[j]
              temp.work = tempWork // 小写work字段 array
              temp.work_id = tempWork.id
              temp.work_name = tempWork.name
              temp.work_status = tempWork.work_status
              this.tableCache.push(temp)
            }
          } else {
            res[i].work = null
            res[i].work_id = 0
            res[i].work_name = null
            res[i].work_status = 0
            this.tableCache.push(res[i])
          }
        }
        console.log(this.tableCache)
        for (var k = 0; k < this.tableCache.length; k++) {
          console.log(k)
          console.log(this.tableCache[k].question_name)
        }
        this.total = this.tableCache.length
        this.getTableData()
      })
    },
    getTableData () {
      console.log(this.tableCache.length)
      this.tableData = this.tableCache.slice(
        (this.pageNum - 1) * this.pageSize,
        this.pageNum * this.pageSize
      )
    },
    empty () {
      this.question_name = ''
      this.name = ''
      this.team_leader = ''
      this.leader_school = ''
      this.leader_phone = ''
      this.load()
    },
    indexFn (index) {
      index = (index + 1) + (this.pageNum - 1) * this.pageSize
      return index
    },
    handleSizeChange (pageSize) {
      this.pageSize = pageSize
      this.getTableData()
    },
    handleCurrentChange (pageNum) {
      this.pageNum = pageNum
      this.getTableData()
    },
    handleAdd () {
      this.dialogFormVisible = true
      this.form = {}
    },
    save (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          request.post('/expert/add_expert', this.form).then(res => {
            // console.log(res)
            if (res.code === 200) {
              this.$message.success('保存成功')
              this.dialogFormVisible = false
              this.load()
            } else {
              this.$message.error('保存失败')
            }
          })
        } else {
          console.log('提交失败')
        }
      })
    },
    handleShow (id) {
      console.log('handleShow')
      console.log(id)
      request.get('/work/get/' + id).then(res => {
        console.log('res')
        console.log(res)
        if (res != null) {
          this.$message.success('查看成功')
          this.workInfo = res
          console.log(this.workInfo.name)
          this.dialogFormVisible = true
        } else {
          this.$message.error('查看失败')
        }
      })
    },
    SearchOwner (id) {
      console.log('SearchOwner')
      console.log(id)
      request.get('/block/query_owner/' + id).then(res => {
        console.log('res')
        console.log(res)
        if (res != null) {
          this.$message.success('查询成功')
          this.teamInfo = res
          console.log(this.teamInfo.name)
          this.dialogFormVisible1 = true
        } else {
          this.$message.error('查看失败')
        }
      })
    },
    handleSelectionChange (val) {
      // console.log(val)
      this.multipleSelection = val
    },
    handleBatchDele () {
      const ids = this.multipleSelection.map(v => v.id)
      request.post('/admin/delete_batch', ids).then(res => {
        if (res.code === 200) {
          this.$message.success('批量删除成功')
          this.load()
        } else {
          this.$message.error('批量删除失败')
        }
      })
    },
    exp () {
      window.open('http://localhost:9090/admin/export')
    },
    importSuccess () {
      this.$message.success('文件导入成功')
    }
  }
}
</script>
