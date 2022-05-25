<template>
  <div :class="className" :style="{height:height,width:width}">
  </div>
</template>

<script>
// import * as echarts from 'echarts'
import * as echarts from "echarts";
export default {
    props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '600px'
    }
  },
  mounted () {
    this.query()
  },
  created () {
    this.connect()
    this.testQuery()
  },
  data () {
    return {
      protocol: 'bolt',
      host: '127.0.0.1',
      port: 7687,
      username: 'neo4j',
      password: '123456',
      idList: [], //暂存节点id，防止冲突
      echartsData: [], //节点数据
      echartsRelation: [], //节点间关系
      myChart: '',
      id: '',
      name: '',
      category: '',
      symbolSize: ''
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
      // console.log(session)
      session.run('MATCH p = (m) --> (n) RETURN m, n, p')
        .then(res => {
          let records = res.records
          for (let i = 0; i < records.length; i++) {
            // console.log(records[i]._fields[0].properties.name)
            //_fields[0]\[1]均为节点，[2]为关系
            // console.log(records[i]._fields[2].segments[0].relationship.properties)
            for (let j = 0; j <= 1; j++) {              
              this.id = records[i]._fields[j].properties._id
              if (this.idList.includes(this.id) === false) {
                this.idList.push(this.id)
                this.name = records[i]._fields[j].properties.name
                this.category = records[i]._fields[j].properties.category
                this.symbolSize = records[i]._fields[j].properties.symbolSize     
                this.echartsData.push({
                  id: this.id,
                  name: this.name,
                  category: parseInt(this.category),
                  symbolSize: parseInt(this.symbolSize)
                })         
              }
            }     
            this.echartsRelation.push({
              source: parseInt(records[i]._fields[2].start.properties._id),
              target: parseInt(records[i]._fields[2].end.properties._id),
              value: records[i]._fields[2].segments[0].relationship.type
            })
          }
          this.getGraph(this.echartsData, this.echartsRelation)
        }).then(() => {
          session.close()
        })
    },
    getGraph(p1, p2) {
      this.myChart = echarts.init(this.$el)
      let mydata = p1
      let links = p2
      console.log(mydata)
      console.log(links)
            let option = {
                    // 提示框的配置
                    tooltip: {
                        trigger: 'item'//设置提示框的内容和格式 节点和边都显示name属性
                    },
                    //图形上的文本标签，可用于说明图形的一些数据信息
                    label: {
                        fontSize: 12
                    },
                    legend: {
                        x: "center",
                        show: true
                    },
                    series: [
                        {
                            type: 'graph',// 类型:关系图
                            layout: 'force',//图的布局，类型为力导图
                            symbolSize: 50,//节点大小
                            emphasis: {
                                focus: 'adjacency'
                            },//当鼠标移动到节点上，突出显示节点以及节点的边和邻接节点
                            draggable: true,//指示节点是否可以拖动
                            roam: true,
                            // 两端的样式（无 / 箭头）
                            edgeSymbol: ['none', 'arrow'],
                            // 不同节点的颜色之类的配置
                            categories: [{
                                name: '赛事',
                                itemStyle: {
                                        color: "lightgreen"
                                }
                            }, {
                                name: '分赛',
                                itemStyle: {
                                        color: "orange",
                                }
                            }, {
                                name: '赛道',
                                itemStyle: {
                                        color: "pink",
                                }
                            }, {
                                name: '赛题',
                                itemStyle: {
                                        color: "lightblue",
                                }
                            },{
                                name: '作品',
                                itemStyle: {
                                        color: "#fcce4c",
                                }
                            },{
                                 name: '成果',
                                itemStyle: {
                                        color: "purple",
                                }                             
                            }],
                            // 节点上的文字
                            label: {
                                    show: true,
                                    fontSize: 12,
                                    color: "black",
                            },
                            force: {
                                repulsion: 1200,//节点之间的斥力因子。支持数组表达斥力范围，值越大斥力越大。
                                gravity: 0.1, //节点受到的向中心的引力因子。该值越大节点越往中心点靠拢。
                            },
                            edgeSymbolSize: [4, 6], // 边两端的标记(箭头)大小，可以是一个数组分别指定两端，也可以是单个统一指定。
                            // 边上显示的文字
                            edgeLabel: {
                                    show: true,
                                    fontSize: 12,
                                    formatter: "{c}"
                            },
                            // 节点数据
                            data: mydata,
                            // 关系数据
                            links: links,
                            // 边的样式
//                                   data: [
// {"id": "0", "name": "第七届智慧城市创意与设计大赛", "symbolSize": 70, "category": 0},
// {"id": "1", "name": "创意设计赛", "symbolSize": 55, "category": 1},
// {"id": "2", "name": "算法分析赛", "symbolSize": 55, "category": 1},
// {"id": "3", "name": "定向赛道", "symbolSize": 50, "category": 2},
        // {
        //   name: 'Node 1',
        //   x: 300,
        //   y: 300
        // },
        // {
        //   name: 'Node 2',
        //   x: 800,
        //   y: 300
        // },
        // {
        //   name: 'Node 3',
        //   x: 550,
        //   y: 100
        // },
        // {
        //   name: 'Node 4',
        //   x: 550,
        //   y: 500
        // }
      // ],
      // links: [],
      // links: [
      //   {
      //     source: 'Node 2',
      //     target: 'Node 1',
      //     label: {
      //       show: true
      //     },
      //     lineStyle: {
      //       curveness: 0.2
      //     }
      //   },
      //   {
      //     source: 'Node 1',
      //     target: 'Node 3'
      //   },
      //   {
      //     source: 'Node 2',
      //     target: 'Node 3'
      //   },
      //   {
      //     source: 'Node 2',
      //     target: 'Node 4'
      //   },
      //   {
      //     source: 'Node 1',
      //     target: 'Node 4'
      //   }
      // ],
                            lineStyle: {
                                    opacity: 0.9,
                                    width: 1.1,
                                    curveness: 0,
                                    color: "#262626",
                            }
                        }
                    ]
            };     
            this.myChart.setOption(option); 
    }
  }
}
</script>