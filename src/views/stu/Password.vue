<template>
  <div>
    <el-main>
        <div class="main">
            <!-- <h1 style="margin-bottom:20px;">修改密码</h1> -->
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="原始密码" prop="oldPass" >
                    <el-input type="password" v-model="ruleForm.oldPass" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item style="margin-left: 55%">
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-main>
  </div>
</template>
<script>
import request from '../../utils/request'
export default {
  name: 'Password',
data() {
      var validateOldPass = (rule, value, callback) => {
          if (value === '') {
              callback(new Error('请输入原始密码'))
          } else {
          callback()
        }
      }
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
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        id: '',
        oldPassword: '',
        ruleForm: {
            oldPass: '',
            pass: '',
            checkPass: ''
        },
        rules: {
          oldPass: [
            { validator: validateOldPass, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      }
    },
    created() {
      this.load()
    },
    methods: {
      load() {
        this.id = localStorage.getItem('id')
        request.get('/user/get_user', {
          params: {
            id: this.id
          }
        }).then(res => {
          this.ruleForm.oldPass = res.password
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!')
          } else {
            console.log('error submit!!')
            return false
          }
        })
        request.get('/user/setPass', {
          params: {
            id: this.id,
            password: this.ruleForm.pass
          }
        }).then(res => {
          console.log(res)
          if (res) {
            alert('修改成功！')
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>
<style>
.main {
    width: 40%;
    margin-left: 25%;

}
</style>