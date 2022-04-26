<template>
  <div class="me-view-body"
       v-title
       :data-title="title">
    <el-container class="me-view-container">
      <el-main>

        <div class="me-view-card">
          <h1 class="me-view-title">{{name}}</h1>
          <div class="me-view-author">
            <div class="me-view-info">
              <div class="me-view-meta">
                <span>时间限制：{{this.time_limit+ '天 '}}</span>
                <span>报名时间： 2022年4月18日-2022年5月1日</span>
              </div>

            </div>

          </div>

          <div class="me-view-pic">
            <img class="work_pic"
                 :src="image_url">
          </div>

          <div class="me-view-content">{{desc}}</div>
          <el-row>
            <div class="like">
              <el-button type="primary"
                         @click="sign_up">点击进入报名入口</el-button>
            </div>
          </el-row>

        </div>
      </el-main>

    </el-container>
  </div>
</template>

<style>
.like {
  display: flex;
  justify-content: end;
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
  vertical-align: middle;
  height: 500px;
}
.me-view-pic img {
  max-width: 100%;
  max-height: 100%;
  display: block;
  margin: auto;
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
</style>
<script>
import request from '../utils/request'
export default {
  name: 'Admin',
  data () {
    return {
      id: 0,
      name: '',
      time_limit: 0,
      question_num: 0,
      desc: '',
      image_url: require('../assets/4.jpg')
    }
  },
  created () {
    this.load()
  },
  methods: {
    load () {
      request.get('/contest/get_contest/' + this.$route.query.id).then(res => {
        console.log(res)
        if (res !== null) {
          this.id = res.id
          this.name = res.name
          this.time_limit = res.time_limit
          this.question_num = res.question_number
          this.desc = res.desc
          // this.image_url = res.image
        } else {
          this.$message.error('请求失败')
        }
      })
    }
  },
  sign_up () {
    console.log('sign_up')
  }
}
</script>
