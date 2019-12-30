<template>
    <div class="main">
        <div id="fridData" style="width: 800px;height: 600px;"></div>
        <div id="total" style="width: 200px;height: 600px;">
            <ul>
                <li class="itemCount" v-for="(item, index) in total" :key="index">
                    {{item.processName}}<br>
                    {{item.totalCount}}
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import echarts from 'echarts'
    import {getList} from 'api/order'

    export default {
        name: '',
        data() {

            return {
                charts: '',
                total: []
            }
        },
        methods: {
            // search(){
            //     axios.get('http://localhost:8082/frid/data')
            //                     .then(function (response){
            //                            this.total = response.data;
            //                         });
            // },
            search() {
                getList().then(res => {
                    this.total = res.data.fridDataInfoList;
                    console.log(this.total)
                })
            },
            drawPie(id) {
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
                            data: [
                                {value: 335, name: '吊牌', selected: true},
                                {value: 679, name: '包装'},
                                {value: 1548, name: '检针'},
                                {value: 1548, name: '出货'},
                                {value: 1548, name: '捆包'}

                            ]
                        },
                        {
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
                            },
                            data: [
                                {value: 200, name: '吊牌机1'},
                                {value: 310, name: '吊牌机2'},
                                {value: 234, name: '吊牌机3'},
                                {value: 135, name: '包装机1'},
                                {value: 1048, name: '包装机2'},
                                {value: 251, name: '包装机3'},
                                {value: 147, name: '检针机1'},
                                {value: 102, name: '检针机2'}

                            ]
                        }
                    ]
                })
            }
        },

        created() {
            this.search();
        },

        //调用
        mounted() {
            this.$nextTick(function () {
                this.drawPie('fridData');
            })
        }
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
        background-color: #486586;
        font-size: 20px;
        height: 80px;
        margin-top: 20px;
        margin-left: 20px;
        padding: 10px;
        color: #fff;
    }
</style>