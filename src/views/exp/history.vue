<template>
  <div>
      <el-main>
      <div style="margin-bottom: 15px">
        <span style="font-size: 13px; margin-right: 10px;">赛事名称</span><el-input placeholder="请输入内容" v-model="awards_name" style="width: 250px; margin-top: 10px;"></el-input>
      <div style="float: right">
        <span style="margin-right: 10px"><el-button @click="load">查询</el-button></span>
        <span><el-button @click="empty">清空</el-button></span>
      </div>
      </div>
      <el-table :data="tableData" border strips :header-cell-class-name="headerBg">
        <el-table-column type="index" :index="indexFn" width="50">
        </el-table-column>
        <el-table-column label="操作" width="120">
          <!-- eslint-disable-next-line -->
          <template slot-scope="scope">
            <el-button type="text" @click="CheckRes(scope.row)">查看评阅结果</el-button>
          </template>
        </el-table-column>     
        <el-table-column prop="question.name" label="赛题名称" width="300">
        </el-table-column>
        <el-table-column prop="team.name" label="团队名称" width="300">
        </el-table-column>
        <el-table-column prop="sum" label="总分" width="300">
        </el-table-column>
        <el-table-column prop="finish_date" label="评阅完成日期" width="300">
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
            <el-dialog title="评阅结果" :visible.sync="dialogFormVisible" width="50%">
                <el-table
      :data="tableJobData" border
      style="width: 100%">
      <el-table-column type="index" :index="indexFn" label="序号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="scorePoint"
        label="评分点"
        width="230">
      </el-table-column>
      <el-table-column
        prop="remarks"
        label="备注">
      </el-table-column>
            <el-table-column
        label="评分" prop="mask">
      </el-table-column>
    </el-table>
    <el-form label-width="100px" style="margin-top:20px">
                    <el-form-item label="总分：" prop="sum">
                    {{this.preForm.sum}}
                    </el-form-item>
                    <el-form-item label="评审意见：" prop="advice">
                    {{this.preForm.advice}}
                    </el-form-item>                           
            </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">关 闭</el-button>
        </div>
      </el-dialog>
    </el-main>
  </div>
</template>
<script>
import request from '../../utils/request'
export default {
  name: 'history',
  data() {
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
        tableJobData: [],
        preForm: {
          sum: '', //总分
          advice: '' //评价
        }
    }
},
    created() {
      this.load()
    },
    methods: {
      load() {
        this.id = localStorage.getItem('id')
        console.log(this.id)
        request.get('/allocation/queryById', {
          params: {            
            expert_id: this.id,
            is_valid: 1
          }
        }).then(res => {
        console.log(res)
        this.tableData = res
        this.getTableData()
        this.total = res.length
        // console.log(this.tableData)
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
      CheckRes(row) { //查看评阅结果
        // this.rule_id = row.batch.rule_id
        request.get('/ruleItem/query_ruleItem', {
          params: {
            rule_id: row.batch.rule_id
          }
        }).then(res => {
          console.log(res)
          console.log(row)
          this.preForm.sum = row.sum
          this.preForm.advice = row.advice
          this.tableJobData = res
          if (row.masks) {
          console.log(row.masks)  
          var maskTable = row.masks.split("/")          
          for (var i = 0; i < this.tableJobData.length; i++) {
            this.tableJobData[i].mask = maskTable[i]
          }                      
          }

          // this.form.tableJobData.mask = res.masks.split("/")
        })
        // this.form.sum = 0
        // for (var i = 0; i < this.form.tableJobData; i++) {
        //   this.form.sum += parseInt(this.form.tableJobData[i].mask)
        //   console.log(this.form.sum)
        // }
        this.dialogFormVisible = true
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
      handleAdd() {
        this.dialogFormVisible = true
        this.form = {}
      },
      handleEdit(row) {
        this.form = JSON.parse(JSON.stringify(row))
        this.dialogFormVisible = true
      },
      handleSelectionChange(val) {
        console.log(val)
        this.multipleSelection = val
      }
    }
}
</script>
<style>
.headerBg {
  background: #fafafa!important;
}
</style>

