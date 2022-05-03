<template>
      <el-main>
      <div style="margin-bottom: 5px">
        <span style="font-size: 13px; margin-right: 10px;">学校</span><el-input placeholder="请输入内容" v-model="name" style="width: 250px; margin-top: 10px;"></el-input>
        <span style="font-size: 13px; margin-top: 15px; margin-right: 20px; margin-left: 50px">
        是否获奖
          <el-radio v-model="is_award" :label="1" style="margin-left: 10px">是</el-radio>
          <el-radio v-model="is_award" :label="0">否</el-radio>
        </span>
      <div style="float: right">
        <span style="margin-right: 10px"><el-button @click="load">查询</el-button></span>
        <span><el-button @click="empty">清空</el-button></span>
      </div>
      </div>
            <div>
        <div style="float: left; margin-top: 10px; margin-bottom: 10px">
            <el-button type="primary" style="margin-bottom:5px"><i class="el-icon-upload2" style="margin-right:5px"></i>批量导入奖项设置</el-button>
        </div>
        <div style="float: right; margin-top: 10px; margin-bottom: 10px">
            <!-- <el-upload action="http://localhost:9090/admin/import" style="display:inline-block" :show-file-list="false" accept="xlsx" :on-success="importSuccess">
                <el-button style="margin-right: 10px"><i class="el-icon-upload2" style="margin-right:5px"></i>导入专家信息</el-button>
            </el-upload> -->
            <el-button @click="exp"><i class="el-icon-download" style="margin-right:5px"></i>导出参赛学校获奖情况</el-button>
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
        <el-table-column label="操作" width="140">
          <!-- eslint-disable-next-line -->
          <template slot-scope="scope">
            <el-button type="text" @click="AddOrgAward(scope.row)">设置奖项</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="学校" width="240">
        </el-table-column>
        <el-table-column prop="award_show" label="获奖情况" width="220">
        </el-table-column>
        <el-table-column prop="team_num" label="参赛队伍数" width="240">
        </el-table-column>
        <el-table-column prop="stu_num" label="参赛学生数" width="240">
        </el-table-column>
        <el-table-column prop="tea_num" label="指导教师数" width="240">
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
            <el-dialog title="设置参赛单位奖项" :visible.sync="dialogFormVisible" width="30%">
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
</template>

<script>
import request from '../../utils/request'
export default {
  name: 'Csdwjxsz',
  data() {
    return {
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 5,
      name: '',
      award_show: '',
      team_num: '',
      stu_num: '',
      tea_num: '',
      is_award: 0,
      tableCache: [],
      headerBg: 'headerBg',
      multipleSelection: [],
      dialogFormVisible: false,
      form: {}
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      request.get('/org/query_org', {
        params: {
          name: this.name,
          is_award: this.is_award
        }
      }).then(res => {
        console.log(res)
        for (var i = 0; i < res.length; i++) {
          res[i].name = res[i].organization_id + '【' + res[i].name + '】'
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
      })
    },
      getTableData() {
          this.tableData = this.tableCache.slice(
            (this.pageNum - 1) * this.pageSize,
            this.pageNum * this.pageSize
        )
      },
    empty() {
      this.name = ''
      this.is_award = ''
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
      handleSelectionChange(val) {
        console.log(val)
        this.multipleSelection = val
      },
      AddOrgAward(row) {
        this.form.org_id = JSON.parse(JSON.stringify(row)).id
        this.dialogFormVisible = true
      },
      save(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            // this.handleChange(form)
            // console.log(this.form)
            request.post('/award/add_org_award', this.form).then(res => {
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
      exp() {
        window.open('http://localhost:9090/org/export')
      }
  }
}
</script>
