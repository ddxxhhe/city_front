<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import * as echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme

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
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {

  //     var ROOT_PATH =
  // 'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples';
      this.chart = echarts.init(this.$el)
this.chart.showLoading();
console.log("graph")
$.getJSON('http://localhost:9090/contest/getJson', graph => {
  console.log(graph)
  this.chart.hideLoading();
  graph.nodes.forEach(node => {
    node.label = {
      // show: node.symbolSize > 30
      show: true
    };
  });
  this.chart.setOption({
    title: {
      text: '本届赛事实体关系图',
      top: 'top',
      left: 'left'
    },
    tooltip: {
      formatter:function(x) {
        return x.name
      }
    },
    legend: [
      {
        // selectedMode: 'single',
        height: 10,
        left: 'center',
        textStyle: {
          // color:(params)=>(params),
          fontSize:13
        },
        data: graph.categories.map(a => {
          return a.name;
        })
      }
    ],
    animationDuration: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: [
      {
        name: 'Les Miserables',
        type: 'graph',
        layout: 'force',
        data: graph.nodes,
        links: graph.links,
        categories: graph.categories,
        roam: true,
        label: {
           show: true,
           textStyle: {
             fontSize: 11,
             color: "white"
           }
        },
        draggable: true,
        focusNodeAdjacency: true,
        lineStyle: {
          color: 'source',
          curveness: 0.3
        },
                        force: {
                            // 力引导图基本配置
                            // initLayout: , // 力引导的初始化布局，默认使用xy轴的标点
                            repulsion: 200, // 节点之间的斥力因子。支持数组表达斥力范围，值越大斥力越大。
                            gravity: 0.02, // 节点受到的向中心的引力因子。该值越大节点越往中心点靠拢。
                            edgeLength: 200, // 边的两个节点之间的距离，这个距离也会受 repulsion影响 。值越大则长度越长
                            layoutAnimation: true // 因为力引导布局会在多次迭代后才会稳定，这个参数决定是否显示布局的迭代动画
                            // 在浏览器端节点数据较多（>100）的时候不建议关闭，布局过程会造成浏览器假死。                        
                        },

                        // itemStyle:{//配置节点的颜色
                        //         color: param => {
                        //             let colorList = ['#fc853e','#28cad8','#9564bf','#bd407e','#28cad8','#e5a214','#e5a211','#e5a212'];
                        //             return colorList[param.dataIndex]
                        //         },
                        //         label:{
                        //             show:true,
                        //             position:'top',
                        //             formatter:'{b}\n{c}'
                        //         },
                        //         opacity:0.9,//设置透明度，为0时不绘制
                        // },
                        edgeSymbol: ['circle', 'arrow'],//边两端的标记类型
                        edgeSymbolSize:[4,8],//边两端的标记大小
                        edgeLabel: {
                                show: true,
                                textStyle: {
                                    fontSize: 12,
                                    color:"black"
                                },                                               
                                formatter: (x) => {
                                    return x.data.name;
                                }
                        },
                        symbolSize:function(val,param){//配置节点的尺寸
                            let sizeList = [75,70,65,60,55,50,45,40,];
                            return sizeList[param.dataIndex];
                        },
                        lineStyle:{//关系边的公用线条样式
                                show:true,
                                color:'target',//决定边的颜色是与起点相同还是终点相同
                                curveness:0.3//变得曲度，支持从0到1的值，值越大曲度越大 
                        },
        emphasis: {
          focus: 'adjacency',
          lineStyle: {
            width: 10
          }
        }
      }
    ]
  })
});
  }
}
}
</script>
