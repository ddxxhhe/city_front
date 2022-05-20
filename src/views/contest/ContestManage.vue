<template>
  <div>
    <el-main>
      <el-row style="margin-bottom: 20px;">
        <el-col :span="8">
          <div>
            <span style="font-size: 13px; margin-right: 10px;">赛事名称</span>
            <el-input placeholder="请输入内容"
                      v-model="form.name"
                      style="width: 250px;"></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div style="margin-left: 12%">
            <span style="font-size: 13px; margin-right: 10px;">赛事状态</span>
            <el-radio v-model="form.archive_status"
                      label="1">进行中</el-radio>
            <el-radio v-model="form.archive_status"
                      label="2">已归档</el-radio>
            <el-radio v-model="form.archive_status"
                      label="0">未开始</el-radio>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="box1">
            <div>
              <span style="margin-left: 110px"
                    type="primary">
                <el-button @click="search">查询</el-button>
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
        <el-table-column label="操作">
          <!-- eslint-disable-next-line -->
          <template slot-scope="scope">
            <el-button type="text"
                       style="margin-left: 0"
                       slot="reference"
                       @click="handleEdit(scope.row)">编辑信息</el-button>
            <span style="color:#409EFF;">/</span>
            <el-button type="text"
                       style="margin-left: 0"
                       slot="reference"
                       @click="handleDelete(scope.row.id)">下线赛事</el-button>
            <span style="color:#409EFF;">/</span>
            <el-button type="text"
                       style="margin-left: 0"
                       slot="reference"
                       @click="handleAddQuestion(scope.row.id)">添加赛题</el-button>
            <span style="color:#409EFF;">/</span>
            <el-upload class="upload-demo"
                       :action="uploadUrl(scope.row.id)"
                       :on-preview="handlePreview"
                       :on-remove="handleRemove"
                       :before-remove="beforeRemove"
                       multiple
                       :limit="1"
                       :on-exceed="handleExceed"
                       :file-list="fileList">
              <el-button size="small"
                         type="primary">配置图片</el-button>
              <div slot="tip"
                   class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </template>
        </el-table-column>
        <el-table-column prop="name"
                         label="赛事名称">
        </el-table-column>
        <el-table-column prop="start_time"
                         label="开始时间"
                         type="date"
                         width="200">
        </el-table-column>
        <el-table-column prop="end_time"
                         label="结束时间"
                         width="200">
        </el-table-column>
        <el-table-column prop="apply_start"
                         label="报名开始"
                         type="date"
                         width="200">
        </el-table-column>
        <el-table-column prop="apply_end"
                         label="报名结束"
                         width="200">
        </el-table-column>
        <el-table-column prop="status"
                         label="归档状态"
                         width="200">
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
      <el-dialog title="编辑信息"
                 :visible.sync="dialogFormVisibleEdit"
                 width="30%">
        <el-form :model="editForm"
                 label-width="90px"
                 :rules="rules"
                 ref="form">
          <el-form-item label="赛事名称"
                        prop="name">
            <el-input type="text"
                      v-model="editForm.name"></el-input>
          </el-form-item>
          <el-form-item label="举办时间">
            <el-col :span="11">
              <el-date-picker type="date"
                              placeholder="开始日期"
                              value-format="yyyy-MM-dd HH:mm:ss"
                              v-model="editForm.start_time"
                              style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line"
                    :span="2"
                    style="color: white;">-</el-col>
            <el-col :span="11">
              <el-date-picker type="date"
                              placeholder="结束日期"
                              value-format="yyyy-MM-dd HH:mm:ss"
                              v-model="editForm.end_time"
                              style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="报名时间">
            <el-col :span="11">
              <el-date-picker type="date"
                              placeholder="报名开始"
                              value-format="yyyy-MM-dd HH:mm:ss"
                              v-model="editForm.apply_start"
                              style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line"
                    :span="2"
                    style="color: white;">-</el-col>
            <el-col :span="11">
              <el-date-picker type="date"
                              placeholder="报名结束"
                              value-format="yyyy-MM-dd HH:mm:ss"
                              v-model="editForm.apply_end"
                              style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="备注"
                        prop="comment">
            <el-input type="textarea"
                      autosize
                      v-model="editForm.content"
                      autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <el-button @click="dialogFormVisibleEdit = false">取消</el-button>
          <el-button type="primary"
                     @click="save(editForm)">确定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="添加赛题"
                 :visible.sync="dialogFormVisibleAdd"
                 width="30%">
        <el-form :model="question_form"
                 label-width="90px"
                 :rules="rules"
                 ref="form">
          <el-form-item label="赛题名称"
                        required>
            <el-input v-model="question_form.name"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="备注"
                        prop="comment">
            <el-input type="textarea"
                      autosize
                      v-model="question_form.content"
                      autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary"
                     @click="submitAdd(question_form)">确 定</el-button>
        </div>
      </el-dialog>
    </el-main>
  </div>
</template>
<script>
import request from '../../utils/request'
export default {
  name: 'Admin',
  data () {
    return {
      contest_id: 0,
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
      contest_name: '',
      start_time: '',
      end_time: '',
      apply_start: '',
      apply_end: '',
      content: '',
      id: '',
      uploadID: 0,
      form: {
        name: '',
        archive_status: 0
      },
      editForm: {

      },
      rules: {
      },
      multipleSelection: [],
      question_form: {
        name: '',
        content: '',
        contest_id: 0
      }
    }
  },
  created () {
    this.load()
  },
  methods: {
    load () {
      this.tableCache = []
      request.get('/contest/get').then(res => {
        console.log(res)
        for (var i = 0; i < res.length; i++) {
          if (res[i].archive_status === 1) {
            res[i].status = '进行中'
          } else if (res[i].archive_status === 2) {
            res[i].status = '已下线'
          } else {
            res[i].status = '未开始'
          }
        }
        this.tableCache = res
        this.total = this.tableCache.length
        this.getTableData()
      })
    },
    beforeUpload (id) {
      this.uploadID = id // 上传携带的参数名
    },
    uploadUrl (id) {
      console.log('addddddddddddd')
      console.log(this.uploadID)
      const url = 'http://localhost:9090/contest/upload_Image/' + id
      console.log(url)
      return url
    },
    search () {
      this.tableCache = []
      const data = {
        name: this.form.name,
        archive_status: this.form.archive_status
      }
      request.post('/contest/search', data).then(res => {
        console.log(res)
        for (var i = 0; i < res.length; i++) {
          if (res[i].archive_status === 1) {
            res[i].status = '进行中'
          } else if (res[i].archive_status === 2) {
            res[i].status = '已下线'
          } else {
            res[i].status = '未开始'
          }
        }
        this.tableCache = res
        this.total = this.tableCache.length
        console.log('sdasd')
        console.log(this.total)
        this.getTableData()
      })
    },
    getTableData () {
      console.log('cache')
      console.log(this.tableCache)
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
      this.question_form = {}
    },
    handleEdit (row) {
      this.editForm = JSON.parse(JSON.stringify(row))
      console.log('editForm')
      console.log(this.editForm)
      this.dialogFormVisibleEdit = true
    },
    submitAdd (form) {
      request.post('/question/add', form).then(res => {
        if (res !== null) {
          console.log(res)
          this.$message.success('添加成功')
          this.dialogFormVisibleAdd = false
        } else {
          this.$message.error('添加失败')
        }
      })
    },
    handleDelete (id) {
      // 下线是修改archive_status字段 而非del有待商榷
      const delForm = {
        id: id,
        archive_status: 2 // 已结束
      }
      request.post('/contest/modify_contest', delForm).then(res => {
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
    handleAddQuestion (id) {
      this.dialogFormVisibleAdd = true
      this.question_form.contest_id = id
      console.log('3445')
      console.log(this.question_form)
    },
    save (form) {
      request.post('/contest/modify_contest', form).then(res => {
        // console.log(res)
        if (res.code === 200) {
          this.$message.success('编辑成功')
          this.dialogFormVisible = false
          this.load()
          this.dialogFormVisibleEdit = false
        } else {
          this.$message.error('编辑失败')
        }
      })
    },
    handleShow (id) {
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
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
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
