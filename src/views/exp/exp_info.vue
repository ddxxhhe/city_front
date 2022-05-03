<template>
  <div>
    <el-main>
        <div class="main">
            <el-form label-width="180px">
  <el-form-item label="姓名：">
    <el-input v-model="info.name" :disabled="true"></el-input>
  </el-form-item>
  <el-form-item label="性别：">
    <el-input v-model="info.gender_show" :disabled="true"></el-input>
  </el-form-item>
  <el-form-item label="组织名称：">
    <el-input v-model="info.organization_name" :disabled="true"></el-input>
  </el-form-item>
  <el-form-item label="手机号：">
    <el-input v-model="info.phone" :disabled="true"></el-input>
  </el-form-item>
  <el-form-item label="电子邮箱：">
    <el-input v-model="info.email" :disabled="true"></el-input>
  </el-form-item>
  <el-form-item label="专业名称：">
    <el-input v-model="info.major_name" :disabled="true"></el-input>
  </el-form-item>
  <el-form-item label="研究方向：">
    <el-input v-model="info.research_direction" :disabled="true"></el-input>
  </el-form-item> 
            </el-form>
              <el-button type="primary" style="margin-left: 85%; margin-top: 10px;" slot="reference" @click="handleModify()">修改信息</el-button>            
            

            <el-dialog title="修改个人信息" :visible.sync="dialogFormVisible" width="30%">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="姓名">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-input v-model="form.gender_show"></el-input>
                    </el-form-item>
                    <el-form-item label="组织名称">
                        <el-input v-model="form.organization_name"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号">
                        <el-input v-model="form.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="电子邮箱">
                        <el-input v-model="form.email"></el-input>
                    </el-form-item>
                    <el-form-item label="专业名称">
                        <el-input v-model="form.major_name"></el-input>
                    </el-form-item>
                      <el-form-item label="研究方向">
                        <el-input v-model="form.research_direction"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">提交</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
    </el-main>
  </div>
</template>
<script>
import request from '../../utils/request'
export default {
  name: 'exp_info',
  data() {
    return {
        info: {
        name: '',
        email: '',
        phone: '',
        gender_show: '',
        organization_name: '',
        major_name: '',
        research_direction: ''
        },
        form: {
            name: '',
            email: '',
            phone: '',
            gender: '',
            organization_name: '',
            major_name: '',
            research_direction: ''
        },
        dialogFormVisible: false,
        rules: {
        },
        multipleSelection: []
    }
},
    created() {
      this.load()
    },
    methods: {
        load() {
            this.id = window.localStorage.getItem('id')
            console.log(this.id)
            request.get('/expert/get_exp', {
              params: {
                id: this.id
              }
            }).then(res => {
              this.info = res
              if (res.gender === 1) {
                this.info.gender_show = '男'
              } else {
                this.info.gender_show = '女'
              }
            })           
        },
        handleModify() {
            this.dialogFormVisible = true
        },
        onSubmit() {
        }
    }
}
</script>
<style>
.main {
    margin-left: 20%;
    width: 40%;
}
.info {
    margin-bottom: 20px;
    font-size: 18px;
}
</style>