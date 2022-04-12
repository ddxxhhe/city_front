<template>
  <div>
      <el-main>
      <div class="box">
          <div>
            <span style="font-size: 13px; margin-right: 10px;">批次名称</span><el-input placeholder="请输入内容" v-model="rev_info.batch_name" style="width: 250px;"></el-input>
          </div>
          <div>
            <span style="font-size: 13px; margin-right: 10px;">团队名称</span><el-input placeholder="请输入内容" v-model="rev_info.team_name" style="width: 250px;"></el-input>
          </div>
          <div>
            <span style="font-size: 13px; margin-right: 10px;">作品名称</span><el-input placeholder="请输入内容" v-model="rev_info.work_name" style="width: 250px;"></el-input>
          </div>
      </div>
      <div class="box">
        <div>
            <span style="font-size: 13px; margin-right: 10px;">赛题名称</span><el-input placeholder="请输入内容" v-model="rev_info.ques_name" style="width: 250px; margin-top: 5px;"></el-input>
        </div>
        <div>
            <span style="font-size: 13px; margin-right: 10px;">专家名称</span><el-input placeholder="请输入内容" v-model="rev_info.expert_name" style="width: 250px; margin-top: 5px;"></el-input>
        </div>
        <div>
            <span style="font-size: 13px; margin-right: 10px;">专家单位</span><el-input placeholder="请输入内容" v-model="rev_info.expert_organization_name" style="width: 250px; margin-top: 5px;"></el-input>
        </div>
      </div>
      <div>
        <span style="font-size: 13px; margin-right: 10px;  margin-top: 5px; margin-left: 59px">评阅状态</span>
          <el-radio-group v-model="rev_info.is_valid">
    <el-radio :label="0">全部</el-radio>
    <el-radio :label="1">已评阅</el-radio>
    <el-radio :label="2">未评阅</el-radio>
  </el-radio-group>
      </div>
      <div class="box1">
        <span style="margin-right: 10px"><el-button @click="load">查询</el-button></span>
        <span><el-button @click="empty">清空</el-button></span>
      </div>
      <div style="padding: 30px 0;">
        <div style="float: right; margin-top: 10px; margin-bottom: 10px">
            <!-- <el-upload action="http://localhost:9090/admin/import" style="display:inline-block" :show-file-list="false" accept="xlsx" :on-success="importSuccess">
                <el-button style="margin-right: 10px"><i class="el-icon-upload2" style="margin-right:5px"></i>导入专家信息</el-button>
            </el-upload> -->
            <el-button @click="exp"><i class="el-icon-download" style="margin-right:5px"></i>导出评阅信息</el-button>
        </div>
      </div>
      <el-table :data="tableData" border strips :header-cell-class-name="headerBg">
        <el-table-column type="index" :index="indexFn" width="50">
        </el-table-column>
        <el-table-column label="操作" width="140">
          <!-- eslint-disable-next-line -->
          <template slot-scope="scope">
            <el-button type="text" @click="checkRevInfo(scope.row)">查看评阅结果</el-button> / <el-popconfirm
  confirm-button-text='确定'
  cancel-button-text='我再想想'
  icon="el-icon-info"
  icon-color="red"
  title="您确定退回吗？"
  @confirm="handleInvalid(scope.row.id)"
>
            <el-button type="text" style="margin-left: 0" slot="reference">退回</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
        <el-table-column prop="batch.name" label="批次名称" width="180">
        </el-table-column>
        <el-table-column prop="team.name" label="团队名称" width="180">
        </el-table-column>
        <el-table-column prop="work.name" label="作品名称" width="180">
        </el-table-column>
        <el-table-column prop="question.name" label="赛题名称" width="180">
        </el-table-column>
        <el-table-column prop="expert.name" label="专家名称" width="160">
        </el-table-column>
        <el-table-column prop="expert.organization_name" label="专家所在单位" width="180">
        </el-table-column>
        <el-table-column prop="rev_show" label="评阅状态" width="160">
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
      <el-dialog title="查看评阅结果" :visible.sync="dialogFormVisible" width="50%">
  <div>
        <el-table :data="tablePreData" border strips :header-cell-class-name="headerBg">
        <el-table-column type="index" :index="indexFn" width="50" label="序号">
        </el-table-column>
        <el-table-column prop="scorePoint" label="评分项" width="240">
        </el-table-column>
        <el-table-column prop="remarks" label="备注" width="240">
        </el-table-column>
        <el-table-column prop="score" label="评分">
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">分数：{{this.tempSum}}</div>
      <div style="margin-top: 10px">评审意见：{{this.tempAdvice}}</div>
  </div>
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
  name: 'Pyjdgl',
  data() {
    return {
        rev_info: {
          is_valid: 0
        },
        tableData: [],
        tablePreData: [], // 查看评阅结果
        tempScore: [], // 临时存储分数
        tempSum: 0,
        tempAdvice: '',
        total: 0,
        pageNum: 1,
        pageSize: 5,
        gender_show: 0,
        name: '',
        gender: '',
        organization: '',
        major_name: '',
        phone: '',
        research_direction: '',
        remarks: '',
        tableCache: [],
        headerBg: 'headerBg',
        dialogFormVisible: false,
        form: {
          name: '',
          gender: '',
          organization: '',
          major_name: '',
          phone: '',
          research_direction: '',
          remarks: ''
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
        request.post('/allocation/query_allocation', this.rev_info).then(res => {
          console.log(this.rev_info)
        console.log(res)
        for (var i = 0; i < res.length; i++) {
            if (res[i].is_valid === 1) {
                res[i].rev_show = '已评阅'
            } else if (res[i].is_valid === 2) {
                res[i].rev_show = '未评阅'
            }
        }
        this.tableCache = res// 未判空
        this.getTableData()
        this.total = res.length
        console.log(this.tableData)
      })
      },
      getTableData() {
          this.tableData = this.tableCache.slice(
            (this.pageNum - 1) * this.pageSize,
            this.pageNum * this.pageSize
        )
      },
      empty() {
        this.rev_info = {}
        this.rev_info.is_valid = 0
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
      checkRevInfo(row) { // 查看评阅结果
        this.dialogFormVisible = true
        console.log(row)
        this.tempScore = row.masks.split('/')
        this.tempSum = row.sum
        this.tempAdvice = row.advice
        request.get('/allocation/get/' + row.id, {
          params: {
            id: row.id
          }
        }).then(res => {
          console.log(res)
          // for (var i = 0; i < res.length; i++) {
          //   this.tablePreData[i].scorePoint = res[i].scorePoint
          //   this.tablePreData[i].remarks = res[i].remarks
          //   this.tablePreData[i].score = this.tempScore[i]
          // }
          this.tablePreData = res
          for (var i = 0; i < res.length; i++) {
            this.tablePreData[i].score = this.tempScore[i]
          }
        })
      },
      handleInvalid(id) {
        request.post('/allocation/back', id).then(res => {
          if (res.code === 200) {
          this.$message.success('更新成功')
          this.load()
        } else {
          this.$message.error('更新失败')
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
        window.open('http://localhost:9090/expert/export')
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
