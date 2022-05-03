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
            <el-button type="text" @click="EditRes(scope.row)">录入评审结果</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="question.name" label="赛题名称" width="300">
        </el-table-column>
        <el-table-column prop="sum" label="分数" width="300">
        </el-table-column>
        <el-table-column prop="batch.start_date" label="任务发布日期" width="300">
        </el-table-column>
        <el-table-column prop="batch.end_date" label="评阅截止日期" width="300">
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
            <el-dialog title="录入评阅结果" :visible.sync="dialogFormVisible" width="50%">
            <el-form ref="form" :model="form" label-width="100px">
                    <el-form-item label="作品信息：">
                        test
                    </el-form-item>
                    <el-form-item label="评审信息：">
                    </el-form-item>
                    <el-form-item>
                    <!-- </el-form-item>
            </el-form> -->
                <el-table
      :data="form.tableJobData" border
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
        label="评分" prop="mask" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-form-item :prop="'tableJobData.' + scope.$index + '.mask'">
            <el-input v-model="scope.row.mask" style="width:100%"></el-input>
          </el-form-item>
        </template>
      </el-table-column>
    </el-table>
                        </el-form-item>
                    <el-form-item label="总分：">
                      <el-input :disabled="true" v-model="form.sum"></el-input>
                    </el-form-item>
                    <el-form-item label="评审意见：">
                      <el-input type="textarea" v-model="form.advice"></el-input>
                    </el-form-item>                           
            </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">关 闭</el-button>
          <el-button @click="tempSubmit()">暂 存</el-button>
          <el-button type="primary" @click="submit()">提 交</el-button>
        </div>
      </el-dialog>
    </el-main>
  </div>
</template>
<script>
import request from '../../utils/request'
export default {
  name: 'job',
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
        form: {
          scope: [],
          // sum: 0, //总分
          advice: '', //评价
          tableJobData: []
        },
        multipleSelection: [],
        para: {
          id : '',
          masks: '',
          sum: '',
          advice: ''
        },
        work_id: ''
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
            is_valid: 0
          }
        }).then(res => {
        // console.log("以下为res")
        // console.log(res)
        this.tableData = res
        this.getTableData()
        this.total = res.length
        // console.log("以下为tableData")
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
      calSum() {
        this.form.sum = 0
        for (var i = 0; i < this.form.tableJobData; i++) {
          this.form.sum += parseInt(this.form.tableJobData[i].mask)
          console.log(this.form.sum)
        }
      },
      EditRes(row) {
        // this.rule_id = row.batch.rule_id
        request.get('/ruleItem/query_ruleItem', {
          params: {
            rule_id: row.batch.rule_id
          }
        }).then(res => {
          this.form.tableJobData = res
        var scores = row.masks.split("/")
        console.log(scores)
        console.log(this.form)
        console.log(this.form.tableJobData.length)
        // for (var i = 0; i < this.form.tableJobData.length; i++) {
        //   if (scores[i] != '' && scores[i] != null && scores[i] != 'undefined') {
        //     this.form.tableJobData[i].mask = scores[i]
        //   } else {
        //     this.form.tableJobData[i].mask = ''
        //   }
        // }
        this.form.sum = row.sum
        this.form.advice = row.advice          
        })
        // this.form.sum = 0
        // for (var i = 0; i < this.form.tableJobData; i++) {
        //   this.form.sum += parseInt(this.form.tableJobData[i].mask)
        //   console.log(this.form.sum)
        // }
        this.para.id = row.id
        //看之前是否有暂存
        // console.log(row)
        // console.log(this.form)

        // console.log(this.form)
        this.dialogFormVisible = true
        // console.log("以下为row")
        // console.log(row)
        this.work_id = row.work.id
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
      },
      tempSubmit() { //暂存
        this.para.sum = 0
        console.log(this.form)
        for (var i = 0; i < this.form.tableJobData.length; i++) {
          this.para.sum += parseInt(this.form.tableJobData[i].mask)
          if (this.para.masks != '') {
            this.para.masks = this.para.masks + '/' + this.form.tableJobData[i].mask
          } else {
            this.para.masks = this.form.tableJobData[i].mask
          }
        }
        this.para.advice = this.form.advice
        request.post('/allocation/tempSubmit', this.para).then(res => {
          if (res) {
            alert("暂存成功")
            this.dialogFormVisible = false
            this.load()
          }
        })
      },
      submit() {
        this.para.sum = 0
        console.log("以下为form")
        console.log(this.form)
        for (var i = 0; i < this.form.tableJobData.length; i++) {
          this.para.sum += parseInt(this.form.tableJobData[i].mask)
          if (this.para.masks != '') {
            this.para.masks = this.para.masks + '/' + this.form.tableJobData[i].mask
          } else {
            this.para.masks = this.form.tableJobData[i].mask
          }
        }
        this.para.advice = this.form.advice
        console.log(this.para)
        request.post('/allocation/submit', this.para).then(res => {
          if (res) {
            alert('提交成功')
            this.dialogFormVisible = false
            console.log("以下为work_id")
            console.log(this.work_id)
            request.post('/work/add_Review', this.work_id).then(res => {
              if (res) {
                alert("作品审核成功")
              }
            })
            this.load()
          }
        })
        //提交时
        // console.log(this.form)
      }
    }
}
</script>
<style>
.headerBg {
  background: #fafafa!important;
}
</style>

