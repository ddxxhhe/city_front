<template>
  <div>
    <el-main>
        <div class="main">
            <h1 style="margin-bottom:20px;">发起新一届赛事</h1>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="赛事名称" prop="name" required>
                    <el-input type="text" v-model="ruleForm.oldPass"></el-input>
                </el-form-item>
                <el-form-item label="举办时间" required>
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="开始日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2" style="color: white;">-</el-col>
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="结束日期" v-model="ruleForm.date2" style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="备注" prop="comment">
                    <el-input type="textarea" autosize v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-main>
  </div>
</template>
<script>
// import request from '../../utils/request'
export default {
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
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!')
          } else {
            console.log('error submit!!')
            return false
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
    width: 60%;
}

</style>
