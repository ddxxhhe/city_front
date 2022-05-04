<template>
  <div class="main_conf">
    <!-- <h1 style="margin-bottom:20px;">轮播图管理</h1> -->
    <el-card class="box-card"
             shadow="hover"
             style="width: 500px; margin:20px;">
      <div slot="header"
           class="clearfix">
        <span style="font-size: 24px;">作品展示管理</span>
      </div>
      <el-form :model="picForm"
               status-icon
               label-width="100px"
               class="demo-ruleForm">
        <el-form-item label="展示数量"
                      prop="picture_number">
          <el-input-number type="text"
                           v-model="picForm.work_number"
                           :min="2"
                           :max="10"></el-input-number>
        </el-form-item>
        <el-form-item label="排行策略">
          <el-select v-model="picForm.work_strategy">
            <el-option label="按热度"
                       value="按热度"></el-option>
            <el-option label="默认"
                       value="默认"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="submitForm(picForm)">确定</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card"
             shadow="hover"
             style="width: 500px; margin:20px">
      <div slot="header"
           class="clearfix">
        <span style="font-size: 24px;">轮播图管理</span>
      </div>
      <el-form :model="picForm"
               status-icon
               label-width="100px"
               class="demo-ruleForm">
        <el-form-item label="轮播图数量"
                      prop="number">
          <el-input-number type="text"
                           v-model="picForm.picture_number"
                           :min="1"
                           :max="9"
                           :disabled="isDisabled"></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="picForm.picture_show_all"
                       @change="handleChange">展示所有赛事图片</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="submitForm(picForm)">确定</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<style>
.main_conf {
  display: flex;
  justify-content: space-around;
}
</style>
<script>
import request from '../../utils/request'
export default {
  created () {
    this.load()
  },
  data () {
    return {
      picForm: [],
      isDisabled: false,
      checked: false
    }
  },
  methods: {
    load () {
      request.get('/team/strategy/1').then(res => {
        console.log(res)
        this.picForm = res
      })
    },
    handleChange () {
      this.isDisabled = this.checked
    },
    submitForm (form) {
      console.log(form)
      request.post("/team/modify_strategy", form).then(res => {
        console.log(res)
      })
    }
  }
}
</script>
