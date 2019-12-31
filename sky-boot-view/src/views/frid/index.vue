<template>
    <div class="main">
        <div id="fridData" style="width: 800px;height: 600px;"></div>
        <div id="total" style="width: 250px;height: 600px;">
            <ul class="totalData">
                <li class="itemCount" v-for="(item, index) in total" :key="index">
                    {{item.processName}}<br>
                    {{item.totalCount}}
                </li>
                <li id="20" class="30">你好</li>
            </ul>
        </div>
    </div>
</template>
<script>
    import echarts from 'echarts'
    import {getList,getData} from 'api/frid'

    export default {
        name: '',
        data() {
            return {
                charts: '',
                total: [],
                query: {
                    dateFrom: '',
                    dateTo: ''
                },
                production:[]
            }
        },
        methods: {

            getProduction(){
                getData(this.query).then(res => {
                    this.production = res.data.productionInfoList;
                    console.log(this.production);
                })
            },
            search() {
                getList().then(res => {
                    this.total = res.data.fridDataInfoList;
                    console.log(this.total)
                    this.$nextTick(function () {
                     this.drawPie('fridData');
                    })
                })
            },
            drawPie(id) {
                const processList = this.total.map(item => {
                    return {
                        value: item.totalCount,
                        name: item.processName
                    }
                })
                const productionList = this.production.map(item => {
                    return {
                        id: item.id,
                        dicId: item.dicId,
                        value: item.productionQty,
                        name: item.dicValue
                    }
                })
                this.charts = echarts.init(document.getElementById(id))
                this.charts.setOption({
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data: ['吊牌', '包装', '检针', '出货', '捆包']
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            selectedMode: 'single',
                            radius: [0, '30%'],

                            label: {
                                normal: {
                                    position: 'inner'
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: processList
                        },
                        {
                            data: productionList,
                            name: '访问来源',
                            type: 'pie',
                            radius: ['40%', '55%'],
                            label: {
                                normal: {
                                    formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                                    backgroundColor: '#eee',
                                    borderColor: '#aaa',
                                    borderWidth: 1,
                                    borderRadius: 4,

                                    rich: {
                                        a: {
                                            color: '#999',
                                            lineHeight: 22,
                                            align: 'center'
                                        },
                                        hr: {
                                            borderColor: '#aaa',
                                            width: '100%',
                                            borderWidth: 0.5,
                                            height: 0
                                        },
                                        b: {
                                            fontSize: 16,
                                            lineHeight: 33
                                        },
                                        per: {
                                            color: '#eee',
                                            backgroundColor: '#334455',
                                            padding: [2, 4],
                                            borderRadius: 2
                                        }
                                    }
                                }
                            }

                        }
                    ]
                })
            }
        },

        //调用
        mounted() {
            this.getProduction();
            this.search();
        },
    }


</script>
<style scoped lang="less">
    .main{
        display: flex;
        align-items: flex-start;

    }

    #fridData {
    }

    #total {
    }

    .itemCount {
        font-size: 20px;
        height: 80px;
        text-align:center;
        padding: 10px;
        color: black;
        position: relative;
        margin-top: 20px;
        margin-left: 50px;
        border: 5px;
        border-style:outset;
        border-radius: 30px;
        list-style:none;
        border-color: red;
    }

</style>