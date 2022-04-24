<template>
  <div>
      <el-main>
      <el-row style="margin-bottom: 20px;">
        <el-col :span="8">
          <div>
            <span style="font-size: 13px; margin-right: 10px;">赛题</span><el-input placeholder="请输入内容" v-model="question_name" style="width: 250px;"></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div style="margin-left: 12%">
              <span style="font-size: 13px; margin-right: 10px;">赛事状态</span>
              <el-radio v-model="work_status" label="1">已归档</el-radio>
              <el-radio v-model="work_status" label="2">未归档</el-radio>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="box1">
            <div>
              <span style="margin-left: 110px" type="primary"><el-button @click="load">查询</el-button></span>
              <span style="margin-left: 10px"><el-button @click="empty">清空</el-button></span>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-table :data="tableData" border strips :header-cell-class-name="headerBg"
      @selection-change="handleSelectionChange">
        <el-table-column type="index" :index="indexFn" width="50">
        </el-table-column>
        <el-table-column label="操作">
          <!-- eslint-disable-next-line -->
          <template slot-scope="scope">
            <el-button type="text" style="margin-left: 0" slot="reference" @click="handleEdit(scope.row.work_id)">编辑信息</el-button>
            <span style="color:#409EFF;">/</span>
            <el-button type="text" style="margin-left: 0" slot="reference" @click="handleDelete(scope.row.work_id)">下线赛事</el-button>
            <span style="color:#409EFF;">/</span>
            <el-button type="text" style="margin-left: 0" slot="reference" @click="handleAddQuestion(scope.row.work_id)">添加赛题</el-button>
            <span style="color:#409EFF;">/</span>
            <el-upload
                class="upload-demo"
                action="http://localhost:9090/contest/upload_Image/4"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="1"
                :on-exceed="handleExceed"
                :file-list="fileList">
                <el-button size="small" type="primary">配置图片</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="赛事名称">
        </el-table-column>
        <el-table-column prop="time_limit" label="时间限制天数" width="200">
        </el-table-column>
        <el-table-column prop="question_number" label="赛题数" width="200">
        </el-table-column>
        <el-table-column prop="contest_status" label="归档状态" width="200">
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
      <el-dialog title="编辑信息" :visible.sync="dialogFormVisibleEdit" width="30%">
        <el-form :model="editForm" label-width="90px" :rules="rules" ref="form">
            <el-form-item label="赛事名称" prop="name" required>
                <el-input type="text" v-model="editForm.contest_name"></el-input>
            </el-form-item>
            <el-form-item label="举办时间" required>
                <el-col :span="11">
                    <el-date-picker type="date" placeholder="开始日期" v-model="editForm.start_time" style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col class="line" :span="2" style="color: white;">-</el-col>
                <el-col :span="11">
                    <el-date-picker type="date" placeholder="结束日期" v-model="editForm.end_time" style="width: 100%;"></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="备注" prop="comment">
                <el-input type="textarea" autosize v-model="editForm.comment" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
          <el-button type="primary" @click="save('editForm')">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="添加赛题" :visible.sync="dialogFormVisibleAdd" width="30%">
        <el-form :model="form" label-width="90px" :rules="rules" ref="form">
          <el-form-item label="赛题名称" required>
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="comment">
                <el-input type="textarea" autosize v-model="form.checkPass" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="save('form')">确 定</el-button>
        </div>
      </el-dialog>
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
        dialogFormVisibleAdd: false,
        dialogFormVisibleEdit: false,
        form: {
          name: '',
          gender: ''
        },
        rules: {
        },
        multipleSelection: [],
        editForm: {
          contest_name: '',
          start_time: '',
          end_time: '',
          comment: ''
        }
    }
},
    created() {
      this.load()
    },
    methods: {
      load() {
        this.tableCache = []
        console.log('66666666')
        console.log(this.contest_status)
        const data = {
          question_name: this.question_name,
          work_status: this.work_status
        }
        request.post('/contest/search', data).then(res => {
          console.log(res)
          this.tableCache = res
          this.getTableData()
      })
      },
      getTableData() {
          console.log(this.tableCache)
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
      handleEdit(id) {
        this.dialogFormVisibleEdit = true
      },
      handleDelete(id) { // 下线是修改archive_status字段 而非del有待商榷
        request.post('/contest/modify_contest', id).then(res => {
              // console.log(res)
              if (res.code === 200) {
                this.$message.success('编辑成功')
                this.dialogFormVisible = false
                this.load()
              } else {
                this.$message.error('编辑失败')
              }
            })
      },
      handleAddQuestion(id) {
          this.dialogFormVisibleAdd = true
      },
      save(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            request.post('/contest/modify_contest', form).then(res => {
              // console.log(res)
              if (res.code === 200) {
                this.$message.success('编辑成功')
                this.dialogFormVisible = false
                this.load()
              } else {
                this.$message.error('编辑失败')
              }
            })
          } else {
            console.log('提交失败')
          }
        })
      },
      handleShow(id) {
        console.log('id')
        console.log(id)
        request.get('/work/get/' + id).then(res => {
          console.log(res)
        if (res != null) {
          this.dialogFormVisible = true
          this.$message.success('查看成功')
          this.load()
        } else {
          this.$message.error('查看失败')
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
      handleRemove(file, fileList) {
        console.log(file, fileList)
      },
      handlePreview(file) {
        console.log(file)
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`)
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
    justify-content:space-between;
    margin-bottom: 10px;
}
</style>