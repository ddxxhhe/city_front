<template>
  <div>
      <el-main>
      <div style="margin-bottom: 15px">
        <span style="font-size: 13px; margin-right: 10px;">指标名称</span><el-input placeholder="请输入内容" v-model="rule_name" style="width: 250px; margin-top: 10px;"></el-input>
      <div style="float: right">
        <span style="margin-right: 10px"><el-button @click="load">查询</el-button></span>
        <span><el-button @click="empty">清空</el-button></span>
      </div>
      </div>
      <div style="float: left; margin-bottom: 10px">
        <el-button type="primary" style="margin-bottom:5px" @click="handleAdd"><i class="el-icon-circle-plus-outline" style="margin-right:5px"></i>新增评阅指标</el-button>
      </div>
      <div style="float: right; margin-bottom: 10px">
        <el-button style="margin-bottom:5px" @click="exp"><i class="el-icon-download" style="margin-left:5px"></i>导出指标信息</el-button>
      </div>
      <el-table :data="tableData" border strips :header-cell-class-name="headerBg">
        <el-table-column type="index" :index="indexFn" width="50">
        </el-table-column>
        <el-table-column label="操作" width="220">
          <!-- eslint-disable-next-line -->
          <template slot-scope="scope">
            <el-button type="text" @click="checkRule(scope.row)">查看指标</el-button> / <el-button type="text" style="margin-left: 0" @click="preSheet(scope.row)">预览评分表</el-button> / <el-popconfirm
  confirm-button-text='确定'
  cancel-button-text='我再想想'
  icon="el-icon-info"
  icon-color="red"
  title="您确定置为无效吗？"
  @confirm="handleInvalid(scope.row.id)"
>
            <el-button type="text" style="margin-left: 0" slot="reference">置为无效</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="指标名称" width="200">
        </el-table-column>
        <el-table-column prop="title_colu" label="评分表表头数量" width="160">
        </el-table-column>
        <el-table-column prop="is_use_wei" label="是否加权求和" width="140">
        </el-table-column>
        <el-table-column prop="is_valid" label="是否有效" width="140">
        </el-table-column>
        <el-table-column prop="head_info_1" label="评分表表头1" width="180">
        </el-table-column>
        <el-table-column prop="head_info_2" label="评分表表头2" width="180">
        </el-table-column>
        <el-table-column prop="head_info_3" label="评分表表头3" width="180">
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
      <el-dialog title="预览评分表" :visible.sync="preFormVisible" width="40%">
      <el-table :data="review_info" border strips :header-cell-class-name="headerBg">
        <el-table-column type="index" label="序号" :index="indexFn" width="50">
        </el-table-column>
        <el-table-column prop="scorePoint" label="评分点" width="220">
        </el-table-column>
        <el-table-column prop="remarks" label="备注" width="220">
        </el-table-column>
        <el-table-column label="评分" width="110">
        </el-table-column>
      </el-table>
      <el-form label-width="80px" style="margin-top: 15px">
  <el-form-item label="分数">
    <el-input :disabled="true" style="width: 150px"></el-input>
  </el-form-item>
  <el-form-item label="评审意见">
      <el-input
  type="textarea"
  :rows="2"
  v-model="textarea">
</el-input>
  </el-form-item>
      </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="preFormVisible = false">关 闭</el-button>
        </div>
      </el-dialog>
      <el-dialog title="查看指标" :visible.sync="checkRuleVisible" width="50%">
          <el-steps :active="active" finish-status="success" simple>
  <el-step title="维护指标基本信息" ></el-step>
  <el-step title="维护评分表信息" ></el-step>
  </el-steps>
<div style="margin-top: 20px" v-if="active === 0">
指标基本信息
<el-divider></el-divider>
      <el-form :label-position="labelPosition" label-width="140px" :model="rule_info">
            <el-row>
                <el-col :span="8">
                    <el-form-item label="指标名称：">
                      {{this.rule_info.name}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="是否加权求和：">
                      {{this.rule_info.is_use_wei}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="评分表表头数量：">
                        {{this.rule_info.title_colu}}
                    </el-form-item>
                </el-col>
            </el-row>
      </el-form>
评分表表头信息
<el-divider></el-divider>
      <el-form :label-position="labelPosition" label-width="140px" :model="rule_info">
            <el-row>
                <el-col :span="8">
                    <el-form-item label="评分表表头1：">
                      {{this.title_info[0]}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="评分表表头2：">
                      {{this.title_info[1]}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="评分表表头3：">
                        {{this.title_info[2]}}
                    </el-form-item>
                </el-col>
            </el-row>
      </el-form>
</div>
<div style="margin-top: 20px" v-if="active === 1">
          <el-table :data="ruleData" border strips :header-cell-class-name="headerBg">
        <el-table-column type="index" :index="indexFn" width="50" label="序号">
        </el-table-column>
        <el-table-column prop="scorePoint" label="评分点" width="180">
        </el-table-column>
        <el-table-column prop="remarks" label="备注" width="180">
        </el-table-column>
        <el-table-column prop="minPoint" label="最小分值" width="180">
        </el-table-column>
        <el-table-column prop="fulPoint" label="满分" width="180">
        </el-table-column>
      </el-table>
</div>
        <div slot="footer" class="dialog-footer">
              <el-button @click="back">{{this.beforeButton}}</el-button>
              <el-button type="primary" @click="next">{{this.afterButton}}</el-button>
        </div>
      </el-dialog>
    </el-main>
  </div>
</template>
<script>
import request from '../../utils/request'
export default {
  name: 'Pyzbgl',
  data() {
    return {
        temp: [],
        ruleData: [],
        rule_info: {},
        beforeButton: '关 闭',
        afterButton: '下一步',
        active: 0,
        input: '',
        textarea: '',
        tableData: [],
        review_info: [],
        title_info: [],
        total: 0,
        pageNum: 1,
        pageSize: 5,
        name: '',
        rule_name: '',
        headerBg: 'headerBg',
        preFormVisible: false,
        checkRuleVisible: false,
        head_info_1: '',
        head_info_2: '',
        head_info_3: '',
        form: {}
    }
},
    created() {
      this.load()
    },
    methods: {
      load() {
        request.get('/rule/query_rule', {
          params: {
            name: this.rule_name
          }
        }).then(res => {
        console.log(res)
        for (var i = 0; i < res.length; i++) {
          this.title_info = res[i].head_info.split('/')
          res[i].head_info_1 = this.title_info[0]
          res[i].head_info_2 = this.title_info[1]
          res[i].head_info_3 = this.title_info[2]
        }
        this.tableCache = res
        this.getTableData()
        this.total = res.length
        // console.log(res.data)
        // console.log(res.total)
      })
      },
      getTableData() {
          this.tableData = this.tableCache.slice(
            (this.pageNum - 1) * this.pageSize,
            this.pageNum * this.pageSize
        )
      },
      empty() {
        this.rule_name = ''
        this.load()
      },
      back() {
        this.active--
        if (this.active === -1) {
          this.checkRuleVisible = false
        }
        if (this.active === 0) {
          this.beforeButton = '关  闭'
          this.afterButton = '下一步'
        }
      },
      next() {
        this.active++
        if (this.active === 1) {
          request.get('/ruleItem/query_ruleItem', {
            params: {
              rule_id: this.temp.id
            }
          }).then(res => {
            this.ruleData = res
          })
        }
        if (this.active === 2) {
          this.checkRuleVisible = false
        }
        this.beforeButton = '上一步'
        this.afterButton = '完  成'
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
      save(form) {
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
      preSheet(row) {
        request.get('/ruleItem/query_ruleItem', {
          params: {
            rule_id: row.id
          }
        }).then(res => {
          this.review_info = res
        })
        this.preFormVisible = true
      },
      checkRule(row) {
        this.checkRuleVisible = true
        this.active = 0
        this.beforeButton = '关 闭'
        this.afterButton = '下一步'
        this.temp = row
        request.get('rule/get/' + row.id, {
          params: {
            id: row.id
          }
        }).then(res => {
          this.rule_info = res
          this.title_info = this.rule_info.head_info.split('/')
        })
        // if (this.active === 1) {
        //   request.get('/ruleItem/query_ruleItem', {
        //     params: {
        //       rule_id: row.id
        //     }
        //   }).then(res => {
        //     this.ruleData = res
        //   })
        // }
      },
      handleEdit(row) {
        this.form = JSON.parse(JSON.stringify(row))
        this.dialogFormVisible = true
      },
      handleInvalid(id) {
        request.get('/rule/invalid_rule', {
          params: {
            rule_id: id
          }
        }).then(res => {
          if (res === true) {
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
        request.post('/admin/delete_batch', ids).then(res => {
          if (res === true) {
          this.$message.success('批量删除成功')
          this.load()
        } else {
          this.$message.error('批量删除失败')
        }
        })
      },
      exp() {
        window.open('http://localhost:9090/rule/export')
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
</style>
