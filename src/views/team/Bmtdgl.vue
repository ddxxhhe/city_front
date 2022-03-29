<template>
  <div>
      <el-main>
      <div class="box">
          <div>
            <span style="font-size: 13px; margin-right: 10px;">赛题</span><el-input placeholder="请输入内容" v-model="question_name" style="width: 250px;"></el-input>
          </div>
          <div>
            <span style="font-size: 13px; margin-right: 10px;">队长姓名</span><el-input placeholder="请输入内容" v-model="team_leader" style="width: 250px;"></el-input>
          </div>
          <div>
            <span style="font-size: 13px; margin-right: 10px;">队长所属学校</span><el-input placeholder="请输入内容" v-model="leader_school" style="width: 250px;"></el-input>
          </div>
      </div>
      <div class="box0">
          <div style="margin-right: 10%">
            <span style="font-size: 13px; margin-right: 10px;">队长手机号</span><el-input placeholder="请输入内容" v-model="leader_phone" style="width: 250px;"></el-input>
        </div>
        <div>
            <span style="font-size: 13px; margin-right: 10px;">作品状态</span>
            <el-radio v-model="work_status" label="1">未提交</el-radio>
            <el-radio v-model="work_status" label="2">提交完成</el-radio>
        </div>
      </div>
      <div class="box1">
        <span style="margin-left: 110px"><el-button @click="load">查询</el-button></span>
        <span style="margin-left: 10px"><el-button @click="empty">清空</el-button></span>
      </div>
      <el-table :data="tableData" border strips :header-cell-class-name="headerBg"
      @selection-change="handleSelectionChange">
        <el-table-column type="index" :index="indexFn" width="50">
        </el-table-column>
        <el-table-column label="操作" width="160">
          <!-- eslint-disable-next-line -->
          <template slot-scope="scope">
            <el-popconfirm
              confirm-button-text='确定'
              cancel-button-text='我再想想'
              icon="el-icon-info"
              icon-color="red"
              title="注销团队会同时删除相关的作品，您确定删除吗？"
              @confirm="handleDele(scope.row.id)"
            >
            <el-button type="text" style="margin-left: 0" slot="reference">注销团队</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
        <el-table-column prop="question_name" label="赛题" width="140">
        </el-table-column>
        <el-table-column prop="name" label="团队名称" width="140">
        </el-table-column>
        <el-table-column prop="work_name" label="作品名称" width="200">
        </el-table-column>
        <el-table-column prop="team_leader" label="队长姓名" width="140">
        </el-table-column>
        <el-table-column prop="leader_school" label="队长学校" width="140">
        </el-table-column>
        <el-table-column prop="advisor" label="指导教师">
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
    </el-main>
  </div>
</template>
<script>
import request from '../../utils/request'
export default {
  name: 'Admin',
  data() {
    return {
        works: [],
        tableCache: [],
        tableData: [],
        total: 0,
        pageNum: 1,
        pageSize: 5,
        question_name: '',
        name: '',
        work_name: '',
        work_status: 0,
        team_leader: '',
        leader_school: '',
        leader_phone: '',
        advisor: '',
        headerBg: 'headerBg',
        dialogFormVisible: false,
        form: {
          name: '',
          gender: ''
        },
        rules: {
        },
        multipleSelection: []
    }
},
    created() {
      this.load()
    },
    methods: {
      load() {
        this.tableCache = []
        console.log('66666666')
        console.log(this.team_leader)
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
                temp.work_name = tempWork.name
                temp.work_status = tempWork.work_status
                this.tableCache.push(temp)
              }
            } else {
                res[i].work = null
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
      getTableData() {
          console.log(this.tableCache.length)
          this.tableData = this.tableCache.slice(
            (this.pageNum - 1) * this.pageSize,
            this.pageNum * this.pageSize
        )
      },
      empty() {
        this.question_name = ''
        this.name = ''
        this.team_leader = ''
        this.leader_school = ''
        this.leader_phone = ''
        this.load()
      },
      indexFn(index) {
        index = (index + 1) + (this.pageNum - 1) * this.pageSize
        return index
      },
      handleSizeChange(pageSize) {
        this.pageSize = pageSize
        this.getTableData()
      },
      handleCurrentChange(pageNum) {
        this.pageNum = pageNum
        this.getTableData()
      },
      handleAdd() {
        this.dialogFormVisible = true
        this.form = {}
      },
      save(form) {
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
      handleEdit(row) {
        this.form = JSON.parse(JSON.stringify(row))
        this.dialogFormVisible = true
      },
      handleDele(id) {
        request.get('/team/delete/' + id).then(res => {
          console.log(res)
          if (res === true) {
          this.$message.success('删除成功')
          this.load()
        } else {
          this.$message.error('删除失败')
        }
        })
      },
      handleSelectionChange(val) {
        // console.log(val)
        this.multipleSelection = val
      },
      handleBatchDele() {
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
.box {
    width:95%;
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
    flex-wrap: wrap;
    justify-content:left;
    margin-bottom: 10px;
}
.box1 {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap-reverse;
    justify-content: flex-end;
    margin-right: 10%;
    margin-bottom: 10px;
}
.box2 {
    width: 90%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content:space-between;
    margin-bottom: 10px;
}

</style>
