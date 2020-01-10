<template>
    <div class="main">
        <div id="fridData" style="width: 60%;height: 600px;"></div>
        <div class="total" style="width: 500px;height: 600px;">
            <div class="searchBar">
                <div class="datePicker">
                    <div class="block">
                        <span class="demonstration">开始日期</span>
                        <el-date-picker
                                v-model="query.dateFrom"
                                type="date"
                                placeholder="选择日期">
                        </el-date-picker>
                    </div>
                    <div class="block">
                        <span class="demonstration">结束日期</span>
                        <el-date-picker
                                v-model="query.dateTo"
                                align="right"
                                type="date"
                                placeholder="选择日期"
                                :picker-options="pickerOptions">
                        </el-date-picker>
                    </div>
                </div>
                <el-button type="primary"  icon="el-icon-search" @click="searchData">检 索</el-button>
            </div>
            <span class="totalData">
                <ul>
                    <li class="itemCount" v-for="(item, index) in total" :key="index">
                        {{item.processName}}<br>
                        {{item.totalCount}}
                    </li>
                </ul>
            </span>
        </div>
    </div>
</template>
<script>
    import echarts from 'echarts'
    import {getList,getData} from 'api/dataanalytics'

    export default {
        name: '',
        data() {
            return {
                charts: '',
                total: [],
                production:[],
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
                query: {
                    dateFrom: new Date(),
                    dateTo: new Date(),
                },
            }
        },
        components: {
        },
        methods: {

            getProduction(){
                getData(this.query).then(res => {
                    this.production = res.data.productionInfoList;
                    this.search();
                })
            },
            searchData() {
                this.getProduction()
             },
            search() {
                getList(this.query).then(res => {
                    this.total = res.data.fridDataInfoList;
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
        },
    }


</script>
<style scoped lang="less">
    .main{
        display: flex;
        align-items: flex-start;

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
    .searchBar{
        display: flex;
        align-items: flex-start;

    }
    .datePicker{
        display: flex;
        align-items: flex-start;

    }
    .el-button--primary {
        margin-top: 20px;
    }
    ul{
        width: 200px;
        float:right;
    }

</style>