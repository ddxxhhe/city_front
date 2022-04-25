<template>
  <div class="neo4jMain">
    <div class="addContent">
      <el-form :inline="true"
               :model="formInline"
               :rules="rules"
               ref="neo4jform">
        <el-form-item label="开始节点名称"
                      prop="startNode">
          <el-input v-model="formInline.startNode"
                    placeholder="请输入开始节点名称"></el-input>
        </el-form-item>
        <el-form-item label="关系名称"
                      prop="relationName">
          <el-input v-model="formInline.relationName"
                    placeholder="请输入关系名称"></el-input>
        </el-form-item>
        <el-form-item label="结束节点名称"
                      prop="endNode">
          <el-input v-model="formInline.endNode"
                    placeholder="请输入结束节点名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="onSubmit">提交</el-button>
          <!--          <el-button type="primary" @click="onDelete">清空表</el-button>-->
        </el-form-item>
      </el-form>
    </div>
    <div class="echarts"
         ref="echarts">
    </div>
  </div>
</template>

<script>
// import * as echarts from 'echarts'

export default {
  name: 'Main.vue',
  mounted () {
    this.query()
  },
  created () {
    this.connect()
    this.testQuery()
  },
  data () {
    return {
      formInline: {
        startNode: '',
        endNode: '',
        relationName: ''
      },
      rules: {
        startNode: [{ required: true, trigger: 'blur' }],
        endNode: [{ required: true, trigger: 'blur' }],
        relationName: [{ required: true, trigger: 'blur' }]
      },
      protocol: 'bolt',
      host: '127.0.0.1',
      port: 7687,
      username: 'neo4j',
      password: '123456',
      echartsData: [],
      nodesRelation: []
    }
  },
  methods: {
    connect () {
      return this.$neo4j.connect(this.protocol, this.host, this.port, this.username, this.password)
    },
    driver () {
      // Get a driver instance
      return this.$neo4j.getDriver()
    },
    testQuery () { // @yangjingping: 这里是test类 按照这个test类的写法就可以拿到neo中的数据JSON格式
      const session = this.$neo4j.getSession()
      console.log(1)
      session.run('MATCH (n) RETURN n')
        .then(res => {
          console.log(res)
        })
        .then(() => {
          session.close()
        })
    }
  }
}
</script>
