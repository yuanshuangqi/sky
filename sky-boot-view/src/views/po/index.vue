<template>

    <div style="width: 600px;height:400px;"/>
</template>

<script>
    import echarts from 'echarts'
    require('echarts/theme/macarons') // echarts theme

    export default {
        data() {
            return {
                // 指定图表的配置项和数据
                option: {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: ['销量', '库存量']
                    },
                    xAxis: {
                        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                    },
                    yAxis: {},
                    series: [{
                        name: '销量',
                        type: 'bar',
                        stack: 'vistors',
                        barWidth: '60%',
                        data: [20, 20, 36, 10, 10, 20]
                    },
                        {
                            name: '库存量',
                            type: 'bar',
                            stack: 'vistors',
                            barWidth: '60%',
                            data: [10, 30, 20, 5, 5, 10]
                        }]
                }
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.initChart()
            })
        },
        methods: {
            initChart() { // 通过 echarts.init 方法初始化一个 echarts 实例并通过 setOption 方法生成一个简单的柱状图
                this.chart = echarts.init(this.$el, 'macarons')
                // 使用刚指定的配置项和数据显示图表。
                this.chart.setOption(this.option)
            }
        }
    }
</script>

<style lang="less" scoped>

</style>
