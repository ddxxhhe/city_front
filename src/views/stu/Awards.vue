<template>
  <div>
    <el-main>
      <div style="margin-bottom: 15px">
        <span style="font-size: 13px; margin-right: 10px;">奖项名称</span>
        <el-input placeholder="请输入内容"
                  v-model="awards_name"
                  style="width: 250px; margin-top: 10px;"></el-input>
        <div style="float: right">
          <span style="margin-right: 10px">
            <el-button @click="load">查询</el-button>
          </span>
          <span>
            <el-button @click="empty">清空</el-button>
          </span>
        </div>
      </div>
      <el-table :data="tableData"
                border
                strips
                :header-cell-class-name="headerBg"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection"
                         width="55">
        </el-table-column>
        <el-table-column type="index"
                         :index="indexFn"
                         width="50">
        </el-table-column>
        <el-table-column label="操作"
                         width="100">
          <!-- eslint-disable-next-line -->
          <template slot-scope="scope">
            <el-button type="text"
                       @click="checkInfo(scope.row)">查看奖项</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="name"
                         label="奖项名称"
                         width="300">
        </el-table-column>
        <el-table-column prop="contest.name"
                         label="赛事名称"
                         width="300">
        </el-table-column>
        <el-table-column prop="question.name"
                         label="赛题名称"
                         width="300">
        </el-table-column>
        <el-table-column prop="team.name"
                         label="团队名称"
                         width="300">
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
      <el-dialog title="奖项信息"
                 :visible.sync="dialogFormVisible"
                 width="30%">
        <el-form :model="form"
                 label-width="160px"
                 ref="form">
          <el-form-item v-if="!!this.awardForm.name"
                        label="奖项名称">
            ：{{this.awardForm.name}}
          </el-form-item>
          <el-form-item v-if="!!(this.awardForm.contest).name"
                        label="赛事名称">
            ：{{(this.awardForm.contest).name}}
          </el-form-item>
          <el-form-item label="赛题名称">
            ：{{(this.awardForm.question).name}}
          </el-form-item>
          <el-form-item label="团队名称">
            ：{{(this.awardForm.team).name}}
          </el-form-item>
        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <el-button @click="dialogFormVisible = false">关 闭</el-button>
        </div>
      </el-dialog>
    </el-main>
  </div>
</template>
<script>
import request from '../../utils/request'
export default {
  name: 'Awards',
  data () {
    return {
      id: '',
      awards_name: '',
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 5,
      gender_show: 0,
      name: '',
      organization: '',
      phone: '',
      headerBg: 'headerBg',
      dialogFormVisible: false,
      awardForm: {
        name: '',
        contest: {},
        question: {},
        team: {}
      },
      form: {
        name: '',
        gender: ''
      },
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        gender: [{ required: true, message: '请选择性别', trigger: 'change' }]
      },
      multipleSelection: []
    }
  },
  created () {
    this.load()
  },
  methods: {
    load () {
      this.id = localStorage.getItem('id')
      request.post('/award/search_award', this.id).then(res => {
        // console.log(res)
        // for (var i = 0; i < res.length; i++) {

        // }
        this.tableData = res
        console.log(111)
        console.log(this.tableData)
        this.getTableData()
        this.total = res.length
        // console.log(res.data)
        console.log(res.total)
      })
    },
    getTableData () {
      if (this.tableCache) {
        this.tableData = this.tableCache.slice(
          (this.pageNum - 1) * this.pageSize,
          this.pageNum * this.pageSize
        )
      }
    },
    checkInfo (row) {
      // this.awardForm = JSON.parse(JSON.stringify(row))
      // console.log(this.batchForm)
      this.awardForm = row
      this.dialogFormVisible = true
    },
    empty () {
      this.name = ''
      this.organization = ''
      this.phone = ''
      this.load()
    },
    indexFn (index) {
      index = (index + 1) + (this.pageNum - 1) * this.pageSize
      return index
    },
    handleSizeChange (pageSize) {
      this.pageSize = pageSize
      this.load()
    },
    handleCurrentChange (pageNum) {
      this.pageNum = pageNum
      this.load()
    },
    handleAdd () {
      this.dialogFormVisible = true
      this.form = {}
    },
    handleEdit (row) {
      this.form = JSON.parse(JSON.stringify(row))
      this.dialogFormVisible = true
    },
    handleDele (id) {
      request.get('/admin/delete_admin/' + id).then(res => {
        if (res.code === 200) {
          this.$message.success('删除成功')
          this.load()
        } else {
          this.$message.error('删除失败')
        }
      })
    },
    handleSelectionChange (val) {
      console.log(val)
      this.multipleSelection = val
    },
    handleBatchDele () {
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
</style>
