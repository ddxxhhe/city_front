<template>
  <div>
    <el-main>
        <div class="main">
            <!-- <h1 style="margin-bottom: 30px;">{{username}}的个人信息</h1>
            <div class="info">用户名：{{username}}</div>
            <div class="info">姓名：{{name}}</div>
            <div class="info">电子邮箱：{{email}}</div>
            <div class="info">手机号：{{phone}}</div>
            <div class="info">性别：{{gender}}</div>
            <div class="info">生日：{{birthday}}</div>
            <div class="info">学校：{{school}}</div>
            <el-button type="primary" style="margin-left: 0; margin-top: 10px;" slot="reference" @click="handleModify()">修改信息</el-button> -->
            <el-form label-width="180px">
  <el-form-item label="用户名：">
    <el-input v-model="username" :disabled="true"></el-input>
  </el-form-item>
  <el-form-item label="姓名：">
    <el-input v-model="name" :disabled="true"></el-input>
  </el-form-item>
  <el-form-item label="电子邮箱：">
    <el-input v-model="email" :disabled="true"></el-input>
  </el-form-item>
  <el-form-item label="手机号：">
    <el-input v-model="phone" :disabled="true"></el-input>
  </el-form-item>
  <el-form-item label="性别：">
    <el-input v-model="gender" :disabled="true"></el-input>
  </el-form-item>
  <el-form-item label="生日：">
    <el-input v-model="birthday" :disabled="true"></el-input>
  </el-form-item>
  <el-form-item label="学校：">
    <el-input v-model="school" :disabled="true"></el-input>
  </el-form-item> 
            </el-form>
              <el-button type="primary" style="margin-left: 85%; margin-top: 10px;" slot="reference" @click="handleModify()">修改信息</el-button>            
            

            <el-dialog title="修改个人信息" :visible.sync="dialogFormVisible" width="30%">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="用户名">
                        <el-input v-model="form.username"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="电子邮箱">
                        <el-input v-model="form.email"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号">
                        <el-input v-model="form.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-select v-model="form.gender">
                            <el-option label="男" value="male"></el-option>
                            <el-option label="女" value="female"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="生日">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.birthday" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="学校">
                        <el-input v-model="form.school"></el-input>
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
// import request from '../../utils/request'
export default {
  name: 'Info',
  data() {
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
        },
        multipleSelection: []
    }
},
    created() {
      this.load()
    },
    methods: {
        load() {
            this.Msg = 'hello'
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