<template>
  <h1>{{this.$route.query.id}}</h1>
</template>
<style>
</style>
<script>
import request from '../utils/request'
export default {
  name: 'Admin',
  data () {
    return {
      contest: {
        name: '',
        time_limit: 0,
        question_number: 0,
        image_url: '',
				desc: '',
				likes: 0,
				reads: 0
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
        if (res !== null) {
          this.contest = res.data
        } else {
          this.$message.error('请求失败')
        }
      })
    }
  }
}
</script>
