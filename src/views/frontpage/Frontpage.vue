<template>
  <div class="main">
    <!-- <h1 style="margin-bottom:20px;">轮播图管理</h1> -->
    <el-card class="box-card" shadow="hover" style="width: 500px; margin:20px;">
      <div slot="header" class="clearfix">
              <span style="font-size: 24px;">作品展示管理</span>
      </div>
      <el-form :model="form" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="展示数量" prop="number">
            <el-input-number type="text" v-model="form.number" :min="2" :max="10"></el-input-number>
        </el-form-item>
        <el-form-item label="排行策略">
            <el-select v-model="form.strategy">
                <el-option label="按浏览量" value="browse"></el-option>
                <el-option label="按点赞量" value="likes"></el-option>
                <el-option label="综合排序" value="synthesis"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('form')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card" shadow="hover" style="width: 500px; margin:20px">
      <div slot="header" class="clearfix">
              <span style="font-size: 24px;">轮播图管理</span>
      </div>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="轮播图数量" prop="number">
            <el-input-number type="text" v-model="ruleForm.number" :min="1" :max="9" :disabled="isDisabled"></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checked" @change="handleChange">展示所有赛事图片</el-checkbox>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<style>
.main{
  display: flex;
  justify-content: space-around;
}
</style>
<script>
  export default {
    data() {
      return {
        fileList: [],
        ruleForm: [],
        form: [],
        isDisabled: false,
        checked: false
        }
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList)
      },
      handlePreview(file) {
        console.log(file)
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`)
      },
      handleChange() {
        this.isDisabled = this.checked
      }
    }
  }
</script>
