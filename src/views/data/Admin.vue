<template>
  <div>
      <el-main>
      <div style="margin-bottom: 15px">
        <span style="font-size: 13px; margin-right: 10px;">姓名</span><el-input placeholder="请输入内容" v-model="name" style="width: 250px; margin-top: 10px;"></el-input>
        <span style="font-size: 13px; margin-left: 10px;">所在单位</span><el-input placeholder="请输入内容" v-model="organization" style="width: 250px; margin-left: 10px;"></el-input>
        <span style="font-size: 13px; margin-left: 15px;">手机号</span><el-input placeholder="请输入内容" v-model="phone" style="width: 250px; margin-top: 5px; margin-left: 10px;"></el-input>
      <div style="float: right">
        <span style="margin-right: 10px"><el-button @click="load">查询</el-button></span>
        <span><el-button @click="empty">清空</el-button></span>
      </div>
      </div>
      <div style="float: left; margin-bottom: 10px">
        <el-button type="primary" style="margin-bottom:5px" @click="handleAdd"><i class="el-icon-circle-plus-outline" style="margin-right:5px"></i>新增管理员</el-button>
        <el-button type="danger" style="margin-bottom:5px" @click="handleBatchDele"><i class="el-icon-remove-outline" style="margin-right:5px"></i>批量删除</el-button>
      </div>
      <div style="float: right; margin-bottom: 10px">
        <el-upload action="http://localhost:9090/admin/import" style="display:inline-block" :show-file-list="false" accept="xlsx" :on-success="importSuccess">
        <el-button style="margin-bottom:5px; margin-right: 10px"><i class="el-icon-upload2"></i>导入管理员信息</el-button>
        </el-upload>
        <el-button style="margin-bottom:5px" @click="exp"><i class="el-icon-download" style="margin-left:5px"></i>导出管理员信息</el-button>
      </div>
      <el-table :data="tableData" border strips :header-cell-class-name="headerBg"
      @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column type="index" :index="indexFn" width="50">
        </el-table-column>
        <el-table-column label="操作" width="160">
          <!-- eslint-disable-next-line -->
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(scope.row)">修改管理员信息</el-button> / <el-popconfirm
  confirm-button-text='确定'
  cancel-button-text='我再想想'
  icon="el-icon-info"
  icon-color="red"
  title="您确定删除吗？"
  @confirm="handleDele(scope.row.id)"
>
            <el-button type="text" style="margin-left: 0" slot="reference">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="140">
        </el-table-column>
        <el-table-column prop="gender_show" label="性别" width="100">
        </el-table-column>
        <el-table-column prop="organization" label="所在单位" width="140">
        </el-table-column>
        <el-table-column prop="phone" label="手机号" width="140">
        </el-table-column>
        <el-table-column prop="email" label="电子邮箱" width="160">
        </el-table-column>
        <el-table-column prop="create_date" label="创建时间">
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
      <el-dialog title="管理员信息" :visible.sync="dialogFormVisible" width="30%">
        <el-form :model="form" label-width="90px" :rules="rules" ref="form">
          <el-form-item label="姓名">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-select v-model="form.gender" placeholder="请选择性别" style="width: 290px">
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="0"></el-option>
            </el-select>
          </el-form-item>
           <el-form-item label="所在单位" prop="organization">
            <el-input v-model="form.organization">
            </el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="form.phone">
            </el-input>
          </el-form-item>
          <el-form-item label="电子邮箱" prop="email">
            <el-input v-model="form.email">
            </el-input>
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
    created() {
      this.load()
    },
    methods: {
      load() {
        request.get('/admin/query_num', {
          params: {
            name: this.name,
            organization: this.organization,
            phone: this.phone,
            pageNum: this.pageNum,
            pageSize: this.pageSize
          }
        }).then(res => {
        console.log(res)
        for (var i = 0; i < res.length; i++) {
            if (res[i].gender === 1) {
                res[i].gender_show = '男'
            } else {
                res[i].gender_show = '女'
            }
        }
        this.tableData = res
        this.getTableData()
        this.total = res.length
        // console.log(res.data)
        // console.log(res.total)
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
      handleEdit(row) {
        this.form = JSON.parse(JSON.stringify(row))
        this.dialogFormVisible = true
      },
      handleDele(id) {
        request.get('/admin/delete_admin/' + id).then(res => {
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
</style>
