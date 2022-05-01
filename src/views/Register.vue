<template>
  <div>
    <el-main>
      <el-card class="main">
        <h1 style="margin-bottom: 10px;">用户注册</h1>
        <el-form ref="form"
                 :model="form"
                 label-width="80px">
          <el-form-item label="用户名"
                        required>
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="姓名"
                        required>
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱"
                        required>
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="手机号"
                        required>
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="form.gender">
              <el-option label="男"
                         value="1"></el-option>
              <el-option label="女"
                         value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="生日">
            <el-date-picker type="date"
                            placeholder="选择日期"
                            v-model="form.birthday"
                            style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="学校">
            <el-input v-model="form.school"></el-input>
          </el-form-item>
          <el-form-item label="密码"
                        prop="password"
                        required>
            <el-input type="password"
                      v-model="form.password"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码"
                        prop="checkPass"
                        required>
            <el-input type="password"
                      v-model="form.checkPass"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="onSubmit('form')">注册</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-main>
  </div>
</template>
<script>
import request from '../utils/request'
export default {
  name: 'Register',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      username: 'dsf',
      name: 'sdsd',
      email: 'wr@sd.com',
      phone: '12312312123',
      gender: '男',
      birthday: '20000101',
      school: '北航',
      form: {
        username: '',
        name: '',
        email: '',
        phone: '',
        gender: '',
        birthday: '',
        school: ''
      },
      dialogFormVisible: false,
      rules: {
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      multipleSelection: []
    }
  },
  created () {
    this.load()
  },
  methods: {
    load () {
      this.Msg = 'hello'
    },
    handleModify () {
      this.dialogFormVisible = true
    },
    onSubmit (form) {
      const _this = this
      this.$refs[form].validate((valid) => {
        if (valid) {
          console.log(666)
          console.log(this.form)
          request.post('/user/add_user', this.form).then(res => {
            if (res.code === 200) {
              this.$message.success('注册成功')
              _this.$router.push('/login')
            } else {
              this.$message.error('注册失败，请重试')
            }
          })
        } else {
          console.log('请填入正确的信息')
        }
      })
    }
  }
}
</script>
<style>
.main {
  margin-left: 30%;
  width: 40%;
}
.info {
  margin-bottom: 20px;
  font-size: 18px;
}
</style>