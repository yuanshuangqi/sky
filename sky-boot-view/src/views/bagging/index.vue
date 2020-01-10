<template>
<div>
    <div class="page-header">
        <div class="page-header-search">
            <el-form :inline="true" :model="search" ref="searchForm" @submit.native.prevent>
                <el-form-item prop="menuName">
                    <span class="condition">PO单号 </span> <el-input v-model="search.orderNo" placeholder="PO单号" size="small" @keydown.enter.native="query"/>
                    <span class="condition">SKU</span><el-input v-model="search.skuCode" placeholder="SKU" size="small" @keydown.enter.native="query"/>
                    <span class="condition">款号</span><el-input v-model="search.sampleCode" placeholder="款号" size="small" @keydown.enter.native="query"/><br>
                    <span class="condition"> 尺码</span><el-input v-model="search.sizeCode" placeholder="尺码" size="small" @keydown.enter.native="query"/>
                    <span class="condition">颜色</span><el-input v-model="search.colorCode" placeholder="颜色" size="small" @keydown.enter.native="query"/>
                    <span class="condition">产线</span>
                    <div class="el-input">
                    <el-select v-model="search.production" clearable="true" filterable placeholder="产线">
                        <el-option
                                v-for="item in options"
                                :key="item.id"
                                :label="item.dicValue"
                                :value="item.id">
                        </el-option>
                    </el-select>
                    </div><br>
                    <!--<el-input v-model="search.production" placeholder="产线" size="small" @keydown.enter.native="query"/>-->
                    <span class="condition">包装时间</span>
                    <div class="el-input">
                    <el-date-picker
                            v-model="search.dateFrom"
                            type="date"
                            placeholder="选择日期">
                    </el-date-picker>
                    </div>
                    <span class="condition">至</span>
                    <div class="el-input">
                    <el-date-picker
                            v-model="search.dateTo"
                            align="right"
                            type="date"
                            placeholder="选择日期"
                            :picker-options="pickerOptions">
                    </el-date-picker>
                    </div>
                </el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="query">检 索</el-button>
            </el-form>
        </div>
    </div>
    <div class="page-main">
        <el-table :data="paggingData" size="small">
            <el-table-column prop="orderNo" label="PO单号"/>
            <el-table-column prop="buCode" label="国家"/>
            <el-table-column prop="skuCode" label="SKU"/>
            <el-table-column prop="sampleCode" label="款号"/>
            <el-table-column prop="color" label="颜色"/>
            <el-table-column prop="size" label="尺寸"/>
            <el-table-column prop="PatternDimensionCode" label="花型"/>
            <el-table-column prop="orderQty" label="计划数"/>
            <el-table-column prop="scanNum" label="扫描数"/>

        </el-table>
    </div>
    <div class="page-footer">
        <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="search.currentPage"
                :page-size=search.pageSize
                layout="total,sizes, prev, pager, next"
                :total="search.total">
                :pager-count="5"
        </el-pagination>
    </div>
</div>
</template>

<script>
    import {getData,getDictionaryInfo} from 'api/bagging'

    export default {
        name: "index",
        components:{

        },
        data(){
            return {
                paggingData:[],
                editObj:null,
                search:{
                    orderNo:'',
                    skuCode:'',
                    sampleCode:'',
                    sizeCode:'',
                    colorCode:'',
                    production:'',
                    dateFrom: new Date().getTime() - 3600 * 1000 * 24 * 7,
                    dateTo: new Date(),
                    currentPage: 1,
                    pageSize: 20,
                    total: 1000,
                },
                options: [],
                value: '',
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
            }
        },
        methods:{
            handleSizeChange(val) {

                console.log(`每页 ${val} 条`);
                this.search.pageSize=val
                this.loadTableData()
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.search.currentPage=val
                this.loadTableData()
            },
            query(){
                this.loadTableData()
            },
            reloadParentData(){
                this.loadTableData()
            },
            loadTableData(){
                getData(this.search).then(res => {
                        this.paggingData = res.data.baggingData
                        this.search.currentPage = res.data.currentPage
                        this.search.pageSize = res.data.pageSize
                        this.search.total = res.data.total
                })
            },
            loadDictionary(){
                getDictionaryInfo('Bagging').then(res => {
                    this.options = res.data.data.items
                })
            }

        },
        created() {
            this.loadDictionary()
            this.loadTableData()
        }
    }
</script>

<style lang="less" scoped>
    .el-input{width: 300px}
    .condition{ cursor: pointer;
        display: inline-block;
        padding: 3px 6px;
        text-align: right;
        width: 60px;
        vertical-align: top;}
</style>
