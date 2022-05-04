<template>
  <div>
      <el-main>
      <div class="box">
          <div>
            <span style="font-size: 13px; margin-right: 10px;">赛事</span><el-input placeholder="请输入内容" v-model="contest" style="width: 250px;"></el-input>
          </div>
          <div>
            <span style="font-size: 13px; margin-right: 10px;">赛题</span><el-input placeholder="请输入内容" v-model="question" style="width: 250px;"></el-input>
          </div>
          <div>
            <span style="font-size: 13px; margin-right: 10px;">团队名称</span><el-input placeholder="请输入内容" v-model="team_name" style="width: 250px;"></el-input>
          </div>
      </div>
      <div class="box">
        <div>
            <span style="font-size: 13px; margin-right: 10px;">姓名</span><el-input placeholder="请输入内容" v-model="user_name" style="width: 250px; margin-top: 5px;"></el-input>
        </div>
        <div>
            <span style="font-size: 13px; margin-right: 10px;">学校</span><el-input placeholder="请输入内容" v-model="user_school" style="width: 250px; margin-top: 5px"></el-input>
        </div>
        <div>
            <span style="font-size: 13px; margin-right: 10px;">手机号</span><el-input placeholder="请输入内容" v-model="user_phone" style="width: 250px; margin-top: 5px"></el-input>
        </div>
      </div>
      <div style="margin-top: 5px">
        <span style="font-size: 13px; margin-top: 15px; margin-right: 20px; margin-left: 50px">是否获奖</span>
          <el-radio v-model="is_award" :label="1">是</el-radio>
          <el-radio v-model="is_award" :label="0">否</el-radio>
      </div>
      <div class="box1">
        <span style="margin-right: 10px"><el-button @click="load">查询</el-button></span>
        <span><el-button @click="empty">清空</el-button></span>
      </div>
      <div style="padding: 30px 0;">
        <div style="float: left; margin-top: 10px; margin-bottom: 10px">
            <el-button type="primary" style="margin-bottom:5px" @click="handleAdd"><i class="el-icon-upload2" style="margin-right:5px"></i>批量导入奖项设置</el-button>
        </div>
        <div style="float: right; margin-top: 10px; margin-bottom: 10px">
            <!-- <el-upload action="http://localhost:9090/admin/import" style="display:inline-block" :show-file-list="false" accept="xlsx" :on-success="importSuccess">
                <el-button style="margin-right: 10px"><i class="el-icon-upload2" style="margin-right:5px"></i>导入专家信息</el-button>
            </el-upload> -->
            <el-button @click="exp"><i class="el-icon-download" style="margin-right:5px"></i>导出个人获奖情况</el-button>
        </div>
      </div>
      <el-table :data="tableData" border strips :header-cell-class-name="headerBg"
      @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column type="index" :index="indexFn" width="50">
        </el-table-column>
        <el-table-column label="操作" width="80">
          <!-- eslint-disable-next-line -->
          <template slot-scope="scope">
            <el-button type="text" @click="handleEditAward(scope.row)">设置奖项</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="200">
        </el-table-column>
        <el-table-column prop="type" label="用户类型" width="200">
        </el-table-column>
        <el-table-column prop="award_show" label="获奖情况" width="160">
        </el-table-column>
        <el-table-column prop="team.name" label="团队名称" width="200">
        </el-table-column>
        <el-table-column prop="question.name" label="赛题" width="200">
        </el-table-column>
        <el-table-column prop="school" label="学校" width="200">
        </el-table-column>
        <el-table-column prop="phone" label="手机号" width="200">
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
      <el-dialog title="设置个人奖项" :visible.sync="dialogFormVisible" width="30%">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="奖项名称">
            <el-input v-model="form.name"></el-input>
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
  name: 'Grjxsz',
  data() {
    return {
        tableData: [],
        total: 0,
        pageNum: 1,
        pageSize: 5,
        name: '',
        contest: '',
        question: '',
        team: '',
        school: '',
        phone: '',
        team_name: '',
        user_name: '',
        user_school: '',
        user_phone: '',
        is_award: 0,
        award_show: '',
        tableCache: [],
        form: {},
        dialogFormVisible: false,
        headerBg: 'headerBg',
        multipleSelection: [],
        para: {}
    }
},
    created() {
      this.load()
    },
    methods: {
      load() {
        console.log(this.is_award)
        request.get('/user/query_info', {
          params: {
            contest: this.contest,
            question: this.question,
            team_name: this.team_name,
            user_name: this.user_name,
            user_school: this.user_school,
            user_phone: this.user_phone,
            is_award: this.is_award
          }
        }).then(res => {
        console.log(res)
        for (var i = 0; i < res.length; i++) {
          if (res[i].is_award === 0 || res[i].is_award === null) {
            res[i].award_show = '否'
          } else {
            res[i].award_show = '是'
          }
        }
        this.tableCache = res// 未判空
        // console.log(this.tableCache)
        this.getTableData()
        this.total = res.length
        // console.log(this.tableData)
      })
        // this.queryAward()
      },
      getTableData() {
          this.tableData = this.tableCache.slice(
            (this.pageNum - 1) * this.pageSize,
            this.pageNum * this.pageSize
        )
      },
      empty() {
        this.contest = ''
        this.question = ''
        this.team_name = ''
        this.user_name = ''
        this.user_school = ''
        this.user_phone = ''
        this.is_award = null
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
      handleCheckInfo(row) { // 查看信息
        this.InfoVisible = true
      },
      save(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            // this.handleChange(form)
            // console.log(this.form)
            request.post('/award/add_award', this.form).then(res => {
              // console.log(res)
              if (res === true) {
                // this.award_show = this.form.name
                // console.log(this.award_show)
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
      handleEditAward(row) { // 设置团队奖项
        this.form.team_id = JSON.parse(JSON.stringify(row)).id
        this.dialogFormVisible = true
      },
      handleDele(id) {
        request.get('/expert/delete_expert/' + id).then(res => {
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
        request.post('/expert/empty_remarks', ids).then(res => {
          if (res.code === 200) {
          this.$message.success('批量清空评审备注成功')
          this.load()
        } else {
          this.$message.error('批量清空评审备注失败')
        }
        })
      },
      exp() {
        window.open('http://localhost:9090/team/export')
      },
      importSuccess() {
        this.$message.success('文件导入成功')
      }
    }
}
</script>
<style>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
  .el-col {
    border-radius: 4px;
  }
  .bg-purple {
    background: #a2bedf;
  }
  .bg-purple-light {
    background: #809fe8;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
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
.box1 {
    float: right;
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
