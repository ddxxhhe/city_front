<template>
  <div>
    <h1>{{ this.work.name }}</h1>
    <h1>{{ this.work.desc }}</h1>
    <h1>{{ this.work.reads }}</h1>
    <h1>{{ this.work.likes }}</h1>
  </div>
</template>
<style>
</style>
<script>
import request from '../utils/request'
export default {
  name: 'Admin',
  data () {
    return {
      work: {
        name: '作品名称',
        author: '张三，李四，王景轩',
        desc: '北京市字节跳动总部北京市字节跳动总部北京市字节跳动总部北京市字节跳动总部北京市字节跳动总部北京市字节跳动总部北京市字节跳动总部北京市字节跳动总部北京市字节跳动总部北京市字节跳动总部北京市字节跳动总部',
        likes: 100,
        reads: 1000
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
          // this.work = res
        } else {
          this.$message.error('请求失败')
        }
      })
    }
  }
}
</script>
