<template>
  <el-container>
    <el-header style="height: 0px;">
      <div class="nav">
        <div>
          <i class="el-icon-s-shop"></i>
          <span class="title"
                style="line-height: 60px">赛事详情</span>
        </div>
      </div>
    </el-header>
    <el-main>
      <div class="me-view-body">
        <el-container class="me-view-container">
          <el-main>

            <div class="me-view-card">
              <h1 class="me-view-title">{{name}}</h1>

              <div class="me-view-pic">
                <img class="work_pic"
                     :src="buildUrl(image_url)">
              </div>

              <div class="me-view-author">
                <div class="me-view-info">
                  <div class="me-view-meta">
                    <span>比赛介绍： {{this.content}}</span>
                  </div>
                  <div class="me-view-meta">
                    <span>报名时间： {{this.apply_start}}-{{this.apply_end}}</span>
                  </div>
                  <div class="me-view-meta">
                    <span>比赛时间： {{this.start_time}}-{{this.end_time}}</span>
                  </div>
                </div>
              </div>
              <el-row>
                <div class="like">
                  <el-button type="primary"
                             @click="sign_up()">点击进入报名入口</el-button>
                </div>
              </el-row>
            </div>
            <el-dialog title="新增团队信息"
                       :visible.sync="dialogFormVisible"
                       width="30%">
              <el-dialog width="30%"
                         title="团队邀请码"
                         :visible.sync="innerVisible"
                         append-to-body>
                <b style="font-size: 20px">{{this.invite_id}}</b>
              </el-dialog>
              <el-alert title="默认新增团队发起人为队长"
                        type="warning">
              </el-alert>
              <el-form ref="form"
                       :model="form"
                       label-width="120px">
                <el-form-item label="团队名称"
                              :required="true">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="队长姓名">
                  <el-input v-model="form.team_leader"></el-input>
                </el-form-item>
                <el-form-item label="队长所属学校">
                  <el-input v-model="form.leader_school"></el-input>
                </el-form-item>
                <el-form-item label="队长手机号">
                  <el-input v-model="form.leader_phone"></el-input>
                </el-form-item>
                <el-form-item label="指导老师">
                  <el-input v-model="form.advisor"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary"
                             @click="submitTeam()">提交</el-button>
                  <el-button @click="dialogFormVisible = false">取消</el-button>
                </el-form-item>
              </el-form>
            </el-dialog>
          </el-main>

        </el-container>
      </div>
    </el-main>
  </el-container>
</template>

<style>
.like {
  display: flex;
  justify-content: flex-start;
  margin-top: 20px;
}
.me-view-body {
  display: flex;
  justify-content: center;
  width: 80%;
  margin: 100px auto 140px;
}
.me-view-card {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.el-main {
  overflow: hidden;
}
.me-view-title {
  font-size: 34px;
  font-weight: 700;
  line-height: 1.3;
}
.me-view-author {
  /*margin: 30px 0;*/
  margin-top: 30px;
  vertical-align: middle;
  margin-bottom: 10px;
}
.me-view-picture {
  width: 40px;
  height: 40px;
  border: 1px solid #ddd;
  border-radius: 50%;
  vertical-align: middle;
  background-color: #409eff;
}
.me-view-pic {
  height: 500px;
  display: flex;
  justify-content: start;
}
.me-view-pic img {
  max-width: 100%;
  max-height: 100%;
  display: block;
}
.me-view-info {
  display: inline-block;
  vertical-align: middle;
  margin-left: 8px;
}
.me-view-meta {
  font-size: 16px;
  color: #969696;
}
.me-view-content {
  margin-top: 30px;
  font-size: 18px;
  color: #505050;
  background-color: #f0f0f0;
}
.me-view-end {
  margin-top: 20px;
}
.me-view-tag {
  font-size: 12px;
  margin-top: 20px;
  padding-left: 6px;
  border-left: 4px solid #c5cac3;
}
.me-view-tag-item {
  font-size: 12px;
  margin: 0 4px;
}
.me-view-comment {
  margin-top: 60px;
}
.me-view-comment-title {
  font-weight: 600;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 20px;
}
.me-view-comment-write {
  margin-top: 20px;
}
.me-view-comment-text {
  font-size: 16px;
}
.v-show-content {
  padding: 8px 25px 15px 0px !important;
}
.v-note-wrapper .v-note-panel {
  box-shadow: none !important;
}
.v-note-wrapper .v-note-panel .v-note-show .v-show-content,
.v-note-wrapper .v-note-panel .v-note-show .v-show-content-html {
  background: #fff !important;
}
.nav {
  display: flex;
  justify-content: space-between;
  border: 1px solid gainsboro;
  height: 60px;
}
</style>
<script>
import request from '../utils/request'
export default {
  name: 'Contest',
  data () {
    return {
      id: 0,
      name: '',
      time_limit: 0,
      question_num: 0,
      content: '',
      image_url: 'undefined.jpg',
      dialogFormVisible: false,
      innerVisible: false,
      invite_id: '',
      team_id: '',
      form: {
        name: '',
        team_leader: '',
        leader_school: '',
        leader_phone: '',
        advisor: '',
        question_id: ''
      }
    }
  },
  created () {
    this.load()
  },
  methods: {
    load () {
      request.get('/contest/get_contest/' + this.$route.query.id).then(res => {
        console.log(res)
        if (res) {
          this.id = res.id
          this.name = res.name
          this.time_limit = res.time_limit
          this.question_num = res.question_number
          this.content = res.content
          this.apply_start = res.apply_start
          this.apply_end = res.apply_end
          this.start_time = res.start_time
          this.end_time = res.end_time
          console.log(1111)
          console.log(res.image)
          if (res.image !== null) {
            this.image_url = res.image
          }
        } else {
          this.$message.error('请求失败')
        }
      })
    },
    sign_up () {
      this.dialogFormVisible = true
    },
    buildUrl (url) {
      console.log(url)
      if (url === null || url === '' || typeof url === 'undefined') {
        return require('../assets/undefined.jpg')
      }
      return require('../assets/' + url)
    },
    submitTeam () {
      this.form.question_id = this.id
      request.post('/team/add', this.form).then(res => {
        console.log(res)
        this.team_id = res.id
        this.invite_id = res.invite_id
        request.get('/team/setInviteId', {
          params: {
            id: this.team_id,
            invite_id: this.invite_id
          }
        }).then(res => {
          if (res) {
            alert('报名成功')
          }
        })
      })
      this.innerVisible = true
    }
  },


}
</script>
