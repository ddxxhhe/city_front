<template>
  <el-card style="width: 40%; margin: 20px auto;">
    <div style="font-size: 24px; margin-bottom:20px;">请登录</div>
    <el-form ref="form"
             :model="loginForm"
             label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="login">登录</el-button>
        <router-link to='/register'
                     style="margin-left: 20px;">
          <el-button>注册</el-button>
        </router-link>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import request from '../utils/request'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      login_expert: {
        name: '',
        password: ''
      },
      userToken: '',
      tag: ''
    }
  },
  methods: {
    ...mapMutations(['changeLogin']),
    login () {
      const _this = this
      if (this.loginForm.username === '' || this.loginForm.password === '') {
        alert('账号或密码不能为空')
      } else {
          this.tag = localStorage.getItem('expertTag')
          console.log(123)
        if (this.tag === "1") {
          this.login_expert.name = this.loginForm.username
          this.login_expert.password = this.loginForm.password
        request.post('/log_expert', this.login_expert).then(res => {
          console.log(res)
          if (res.code === '200') {
            console.log('success')
            // console.log(res)
            var storage = window.localStorage
            storage.id = res.id
            storage.role = 2
            storage.username = res.username
            _this.userToken = res.token
            // 将用户token保存到vuex中
            _this.changeLogin({ Authorization: _this.userToken })
            _this.$router.push('/about')
            alert('欢迎')
          } else {
            alert('账号或密码错误')
          }
        }).catch(error => {
          alert('账号或密码错误')
          console.log(error)
        })           
        } else {
         request.post('/login', this.loginForm).then(res => {
          console.log(res)
          if (res.code === '200') {
            console.log('success')
            // console.log(res)
            var storage = window.localStorage
            storage.id = res.id
            storage.role = res.role
            storage.username = res.username
            _this.userToken = res.token
            // 将用户token保存到vuex中
            _this.changeLogin({ Authorization: _this.userToken })
            _this.$router.push('/about')
            alert('欢迎')
          } else {
            alert('账号或密码错误')
          }
        }).catch(error => {
          alert('账号或密码错误')
          console.log(error)
        })           
        }

      }
    }
  }
}
</script>
