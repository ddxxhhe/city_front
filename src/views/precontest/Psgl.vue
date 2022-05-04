<template>
  <div>
    <el-main>
      <div style="margin-bottom: 15px">
        <span style="font-size: 13px; margin-right: 10px;">批次名称</span>
        <el-input placeholder="请输入内容"
                  v-model="batch_name"
                  style="width: 250px; margin-top: 10px;"></el-input>
        <span style="font-size: 13px; margin-left: 10px;">评审指标</span>
        <el-input placeholder="请输入内容"
                  v-model="rule_name"
                  style="width: 250px; margin-left: 10px;"></el-input>
        <span style="font-size: 13px; margin-left: 15px;">赛事名称</span>
        <el-input placeholder="请输入内容"
                  v-model="contest_name"
                  style="width: 250px; margin-top: 5px; margin-left: 10px;"></el-input>
        <div style="float: right">
          <span style="margin-right: 10px">
            <el-button @click="load">查询</el-button>
          </span>
          <span>
            <el-button @click="empty">清空</el-button>
          </span>
        </div>
      </div>
      <div style="float: left; margin-bottom: 10px">
        <el-button type="primary"
                   style="margin-bottom:5px"
                   @click="handleAdd"><i class="el-icon-circle-plus-outline"
             style="margin-right:5px"></i>新增批次</el-button>
      </div>
      <div style="float: right; margin-bottom: 10px">
        <el-button style="margin-bottom:5px"
                   @click="exp"><i class="el-icon-download"
             style="margin-left:5px"></i>导出评审批次信息</el-button>
      </div>
      <el-table :data="tableData"
                border
                strips
                :header-cell-class-name="headerBg">
        <el-table-column type="index"
                         :index="indexFn"
                         width="50">
        </el-table-column>
        <el-table-column label="操作"
                         width="120">
          <!-- eslint-disable-next-line -->
          <template slot-scope="scope">
            <el-button type="text"
                       @click="checkInfo(scope.row)">查看批次信息</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="name"
                         label="批次名称"
                         width="140">
        </el-table-column>
        <el-table-column prop="rule.name"
                         label="评审指标"
                         width="140">
        </el-table-column>
        <el-table-column prop="contest.name"
                         label="赛事名称"
                         width="140">
        </el-table-column>
        <el-table-column prop="work_expert"
                         label="作品评审专家数量"
                         width="120">
        </el-table-column>
        <el-table-column prop="expert_work"
                         label="专家评审作品数量"
                         width="120">
        </el-table-column>
        <el-table-column prop="start_date"
                         label="评审开始时间"
                         width="210">
        </el-table-column>
        <el-table-column prop="end_date"
                         label="评审截止时间"
                         width="210">
        </el-table-column>
        <el-table-column prop="is_aveg"
                         label="是否去除最大最小成绩"
                         width="160">
        </el-table-column>
        <el-table-column prop="is_max"
                         label="是否只取最大成绩"
                         width="140">
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
      <el-dialog title="批次信息"
                 :visible.sync="dialogFormVisible"
                 width="30%">
        <el-form :model="form"
                 label-width="160px"
                 ref="form">
          <el-form-item v-if="!!this.batchForm.name"
                        label="批次名称">
            ：{{this.batchForm.name}}
          </el-form-item>
          <el-form-item v-if="!!(this.batchForm.rule).name"
                        label="评审指标">
            ：{{(this.batchForm.rule).name}}
          </el-form-item>
          <el-form-item label="赛事名称">
            ：{{(this.batchForm.contest).name}}
          </el-form-item>
          <el-form-item label="作品评审专家数量">
            ：{{this.batchForm.work_expert}}
          </el-form-item>
          <el-form-item label="专家评审作品数量">
            ：{{this.batchForm.expert_work}}
          </el-form-item>
          <el-form-item label="评审开始时间">
            ：{{this.batchForm.start_date}}
          </el-form-item>
          <el-form-item label="评审截止时间">
            ：{{this.batchForm.end_date}}
          </el-form-item>
          <el-form-item label="是否去除最大最小成绩">
            ：{{this.batchForm.is_aveg}}
          </el-form-item>
          <el-form-item label="是否只取最大成绩">
            ：{{this.batchForm.is_max}}
          </el-form-item>
        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <el-button @click="dialogFormVisible = false">关 闭</el-button>
        </div>
      </el-dialog>
      <el-dialog title="新增批次"
                 :visible.sync="dialogVisible"
                 width="70%">
        <el-steps :active="active"
                  finish-status="success"
                  simple>
          <el-step title="批次基本信息"></el-step>
          <el-step title="选择作品"></el-step>
          <el-step title="选择专家"></el-step>
          <el-step title="评审任务分配"></el-step>
        </el-steps>
        <div style="margin-top: 20px"
             v-if="active === 0">
          <el-form :label-position="labelPosition"
                   label-width="140px"
                   :model="batchCache"
                   ref="batchCache">
            <el-row>
              <el-col :span="8">
                <el-form-item label="批次名称"
                              :required="true">
                  <el-input v-model="batchCache.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="评审指标"
                              :required="true">
                  <el-select v-model="batchCache.rule_id"
                             placeholder="请选择评审指标"
                             style="width: 220px">
                    <el-option label="自由选题"
                               value="1"></el-option>
                    <el-option label="政府出题"
                               value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="作品评审专家数量"
                              :required="true">
                  <el-input v-model="batchCache.work_expert"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="专家评审作品上限"
                              :required="true">
                  <el-input v-model="batchCache.expert_work"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="评审开始日期"
                              :required="true">
                  <el-date-picker v-model="batchCache.start_date"
                                  type="date"
                                  placeholder="选择开始日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="评审截至日期"
                              :required="true">
                  <el-date-picker v-model="batchCache.end_date"
                                  type="date"
                                  placeholder="选择截至日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="去除最大最小成绩">
                  <el-radio v-model="is_aveg"
                            label="是">是</el-radio>
                  <el-radio v-model="is_aveg"
                            label="否">否</el-radio>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="只取最大成绩">
                  <el-radio v-model="is_max"
                            label="是">是</el-radio>
                  <el-radio v-model="is_max"
                            label="否">否</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div style="margin-top: 20px"
             v-if="active === 1">
          <el-table :data="tableTeamData"
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
            <el-table-column prop="name"
                             label="团队名称"
                             width="180">
            </el-table-column>
            <el-table-column prop="question.name"
                             label="赛题"
                             width="180">
            </el-table-column>
            <el-table-column prop="team_leader"
                             label="队长姓名"
                             width="180">
            </el-table-column>
            <el-table-column prop="leader_school"
                             label="队长所在学校"
                             width="180">
            </el-table-column>
            <el-table-column prop="leader_phone"
                             label="队长手机号"
                             width="180">
            </el-table-column>
            <el-table-column prop="advisor"
                             label="指导教师"
                             width="160">
            </el-table-column>
            <el-table-column prop="submit_date"
                             label="提交作品时间"
                             width="220">
            </el-table-column>
          </el-table>
        </div>
        <div style="margin-top: 20px"
             v-if="active === 2">
          <el-table :data="tableExpertData"
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
            <el-table-column prop="name"
                             label="姓名"
                             width="140">
            </el-table-column>
            <el-table-column prop="gender_show"
                             label="性别"
                             width="100">
            </el-table-column>
            <el-table-column prop="organization_name"
                             label="所在单位"
                             width="140">
            </el-table-column>
            <el-table-column prop="major_name"
                             label="专业名称"
                             width="140">
            </el-table-column>
            <el-table-column prop="research_direction"
                             label="研究方向"
                             width="140">
            </el-table-column>
            <el-table-column prop="remarks"
                             label="评阅备注"
                             width="140">
            </el-table-column>
            <el-table-column prop="phone"
                             label="手机号"
                             width="140">
            </el-table-column>
            <el-table-column prop="email"
                             label="电子邮箱"
                             width="140">
            </el-table-column>
            <el-table-column prop="create_date"
                             label="创建时间"
                             width="220">
            </el-table-column>
          </el-table>
        </div>
        <div style="margin-top: 20px"
             v-if="active === 3">
          <el-table :data="tableAlloctionData"
                    border
                    strips
                    :header-cell-class-name="headerBg">
            <el-table-column type="selection"
                             width="55">
            </el-table-column>
            <el-table-column type="index"
                             label="序号"
                             :index="indexFn"
                             width="50">
            </el-table-column>
            <el-table-column prop="name"
                             label="团队名称"
                             width="200">
            </el-table-column>
            <el-table-column prop="question.name"
                             label="赛题名称"
                             width="200">
            </el-table-column>
            <el-table-column prop="leader_school"
                             label="所属单位"
                             width="200">
            </el-table-column>
            <el-table-column prop="work_expert"
                             label="已分配专家数量"
                             width="140">
            </el-table-column>
            <el-table-column prop="experts"
                             label="专家"
                             width="400">
            </el-table-column>
          </el-table>
        </div>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="back">{{this.beforeButton}}</el-button>
          <el-button type="primary"
                     @click="nextStep">下一步</el-button>
        </span>
      </el-dialog>
    </el-main>
  </div>
</template>
<script>
import request from '../../utils/request'
export default {
  name: 'Psgl',
  data () {
    return {
      temp: {},
      batchCache: { //   暂存新建批次
        name: '',
        rule_id: '',
        work_expert: 0,
        expert_work: 0,
        start_date: '',
        end_date: '',
        is_aveg: '否',
        is_max: '否'
      },
      labelPosition: 'right',
      beforeButton: '取消',
      active: 0,
      tableData: [],
      tableCache: [],
      tableTeamData: [],
      tableExpertData: [],
      tableAlloctionData: [],
      total: 0,
      pageNum: 1,
      pageSize: 5,
      batchForm: {
        rule: {},
        contest: {}
      },
      batch_id: 20,
      rule: {},
      contest: {},
      question: '',
      team_name: '',
      team_leader: '',
      leader_school: '',
      leader_phone: '',
      advisor: '',
      submit_date: '',
      is_award: '',
      name: '',
      batch_name: '',
      rule_name: '',
      contest_name: '',
      work_expert: 0,
      expert_work: 0,
      start_date: '',
      end_date: '',
      is_aveg: '否',
      is_max: '否',
      headerBg: 'headerBg',
      dialogFormVisible: false,
      dialogVisible: false,
      form: {
        batch_name: '',
        rule_name: '',
        contest_name: ''
      },
      multipleWorkSelection: [], //   存取选择的作品
      multipleExpertSelection: [], //   存取选择的专家
      expert_works: [] //  专家已分配的工作数
    }
  },
  created () {
    this.load()
  },
  methods: {
    load () {
      this.form.batch_name = this.batch_name
      this.form.rule_name = this.rule_name
      this.form.contest_name = this.contest_name
      request.post('/batch/query_batch', this.form).then(res => {
        //   console.log(res)
        this.tableCache = res
        this.getTableData()
        this.total = res.length
        //   console.log(res.data)
        //   console.log(res.total)
      })
    },
    getTableData () {
      this.tableData = this.tableCache.slice(
        (this.pageNum - 1) * this.pageSize,
        this.pageNum * this.pageSize
      )
    },
    empty () {
      this.batch_name = ''
      this.rule_name = ''
      this.contest_name = ''
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
      this.active = 0
      this.dialogVisible = true
      this.form = {}
      if (this.active === 0) {
        this.beforeButton = '关  闭'
      } else {
        this.beforeButton = '上一步'
      }
    },
    save (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          request.post('/admin/save_admin', this.form).then(res => {
            console.log(res)
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
    checkInfo (row) {
      this.batchForm = JSON.parse(JSON.stringify(row))
      //   console.log(this.batchForm)
      this.dialogFormVisible = true
    },
    back () {
      this.active--
      if (this.active === -1) {
        this.dialogVisible = false
      }
      if (this.active === 0) {
        this.beforeButton = '关  闭'
      } else {
        this.beforeButton = '上一步'
      }
    },
    nextStep () {
      this.active++
      console.log(this.active)
      if (this.active === 4) {
        this.dialogVisible = false
      }
      this.beforeButton = '上一步'
      if (this.active === 1) { //   请求作品
        request.get('/team/query_info', {
          params: {
            contest: '',
            question: '',
            team_name: '',
            team_leader: '',
            leader_school: '',
            leader_phone: '',
            is_award: 1
          }
        }).then(res => {
          //   console.log(res)
          this.tableTeamData = res//   未判空
          //   console.log(this.tableCache)
          //   this.total = res.length
          //   console.log(this.tableData)
          this.multipleWorkSelection = this.multipleSelection
        })
        //   console.log(999)
        //   console.log(this.multipleWorkSelection)
      }
      if (this.active === 2) { //   请求专家
        request.get('/expert/get').then(res => {
          for (var i = 0; i < res.length; i++) {
            if (res[i].gender === 1) {
              res[i].gender_show = '男'
            } else {
              res[i].gender_show = '女'
            }
          }
          this.tableExpertData = res
          this.multipleExpertSelection = this.multipleSelection
        })
      }
      if (this.active === 3) {
        //   console.log(this.multipleWorkSelection)
        //   console.log(this.multipleExpertSelection)
        //   展示分配成果，成果显示为this.tableAllocationData
        //   this.tableAlloctionData = this.multipleWorkSelection //   缺少作品对应的专家数和专家信息
        //  先新增批次
        //  然后拿到批次id再新增分配
        request.post('/batch/add_batch', this.batchCache).then(res => {
          //   console.log(this.batchCache)
          //   _this.batch_id = res.batch_id
          //   console.log(res.code)
          if (res.code === 200) {
            this.batch_id = res.batch_id
            //   console.log(777)
            //   console.log(this.batch_id)
            //   console.log(this.multipleExpertSelection.length)
            //   console.log(this.multipleWorkSelection.length)
            for (var i1 = 0; i1 < this.multipleExpertSelection.length; i1++) {
              this.expert_works[i1] = 0 //  第i个专家已经分配的作品数
            }
            this.batchCache.work_expert = parseInt(this.batchCache.work_expert)
            for (var i2 = 0; i2 < this.multipleWorkSelection.length; i2++) {
              var tempId = this.multipleWorkSelection[i2]
              request.get('/work/set_workExp', {
                params: {
                  id: tempId,
                  work_expert: this.batchCache.work_expert
                }
              }).then(res => {
                if (res) {
                  alert('设置成功')
                }
              })
            }
            for (var i = 0; i < this.multipleWorkSelection.length; i++) {
              var num = 0 //  num表示第i个作品接受评审的专家数
              console.log(11)
              for (var j = 0; j < this.multipleExpertSelection.length; j++) {
                //   console.log(this.batchCache.work_expert) //  每个作品需要对应的专家数量
                //   console.log(num)
                //   console.log(this.batchCache.work_expert)
                console.log(22)
                console.log(num)
                console.log(this.batchCache.work_expert)
                console.log(num === this.batchCache.work_expert)
                if (num === this.batchCache.work_expert) { //   作品达到评审数量
                  //   console.log(this.multipleWorkSelection[i].work_expert)
                  this.multipleWorkSelection[i].work_expert = num
                  console.log(33)
                  break
                } else {
                  console.log(44)
                  //   console.log(this.expert_works[j])
                  //   console.log(this.batchCache.expert_work)
                  if (this.expert_works[j] < this.batchCache.expert_work) {
                    //   console.log(this.multipleExpertSelection[j])
                    this.multipleWorkSelection[i].experts = this.multipleExpertSelection[j].name + ','
                    this.expert_works[j]++
                    num++
                    var expertID = this.multipleExpertSelection[j].id
                    var teamID = this.multipleWorkSelection[i].id
                    var para = {}
                    para.expertID = expertID
                    para.teamID = teamID
                    para.batch_id = this.batch_id
                    para.is_valid = 0
                    //   console.log(para)
                    request.post('/allocation/add_allocation', para).then(res => {
                      console.log(res)
                      if (res.code !== 200) {
                        this.$message.error('分配失败')
                        this.dialogVisible = false
                      }
                    })
                  }
                }
              }
            }
          } else {
            this.$message.error('新增批次失败')
            this.dialogVisible = false
          }
        })
        //   直接在前端进行分配，然后传到后端进行add_allocation
        //   request.post()
      }
    },
    handleSelectionChange (val) {
      //   console.log(val)
      if (this.active === 1) {
        this.multipleWorkSelection = val
      }
      if (this.active === 2) {
        this.multipleExpertSelection = val
      }
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
      window.open('http://  localhost:9090/batch/export')
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
