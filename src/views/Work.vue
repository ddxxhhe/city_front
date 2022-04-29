<template>
  <div class="me-view-body"
       v-title
       :data-title="title">
    <el-container class="me-view-container">

      <div class="me-view-card">
        <h1 class="me-view-title">{{name}}</h1>
        <div class="me-view-author">
          <div class="me-view-info">
            <span>{{author.nickname}}</span>
            <div class="me-view-meta">
              <span>作者：{{author+ ' '}}</span>
              <span>{{createDate | format}}</span>
              <span>喜欢 {{likes}}</span>
            </div>

          </div>

        </div>

        <div class="me-view-pic">
          <img class="work_pic"
               :src="image_url">
        </div>

        <div class="me-view-content">{{desc}}</div>
        <el-row>
          <el-col class="me-view-tag">
            赛事标签
            <span class="me-view-meta">{{contest_name}}</span>
          </el-col>
          <div class="like">
            <el-button type="primary"
                       @click="like"
                       v-show="!liked">点个赞</el-button>
            <el-button @click="rm_like"
                       v-show="liked">取消赞</el-button>
          </div>
        </el-row>

      </div>

    </el-container>
  </div>
</template>

<style>
.like {
  display: flex;
  justify-content: flex-end;
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
  font-size: 14px;
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
      author: '',
      desc: '',
      likes: 0,
      image_url: require('../assets/4.jpg'),
      contest_name: '',
      comment: {
        content: []
      }
    }
  },
  created () {
    this.load()
  },
  methods: {
    load () {
      request.get('/work/get/' + this.$route.query.id).then(res => {
        console.log(res)
        if (res !== null) {
          this.id = res.id
          this.name = res.name
          this.contest_name = res.contest_name
          this.desc = res.desc
          this.likes = res.likes
          this.author = res.authors
        } else {
          this.$message.error('请求失败')
        }
      })
    },
    like () {
      console.log(this.id)
      request.get('/work/like/' + this.id).then(res => {
        console.log(res)
      })
      this.likes += 1
      this.liked = true
      console.log(this.likes)
    },
    rm_like () {
      request.get('/work/revert_like/' + this.id).then(res => {
        console.log(res)
      })
      if (this.likes > 0) {
        this.likes -= 1
      }
      this.liked = false
      console.log(this.likes)
    }
  }
}
</script>
