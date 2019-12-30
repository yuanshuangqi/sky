<template>
    <el-dialog title="新增用户" :visible.sync="addDialogVisible" :close-on-click-modal="false">
        <el-form label-position="right" :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="80px">
            <el-form-item label="用户名" prop="account">
                <el-input v-model="addForm.account" :maxlength="20" autocomplete="off"/>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
                <el-radio v-model="sex" label="1">男</el-radio>
                <el-radio v-model="sex" label="0">女</el-radio>
            </el-form-item>
            <el-form-item label="电话号码" prop="phone">
                <el-input v-model="addForm.phone"  autocomplete="off"/>
            </el-form-item>
            <el-form-item label="部门" prop="dept.id">
                <el-tree-select :styles="elSelectStyle" v-model="addForm.dept.id" :selectParams="selectParams" :treeParams="treeParams" />
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="addFormSubmit">确 定</el-button>
            <el-button type="info" @click="resetAddForm">重 置</el-button>
            <el-button @click="closeDialog">取 消</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import {addUser} from 'api/user'
    export default {
        name: "index",
        props:{
            addChildDialogVisible:Boolean,
            deptTreeData:Array
        },
        data(){
          return {
              addForm:{
                  account:'',
                  phone:'',
                  dept:{
                      id:''
                  },
                  sex:'1'
              },
              addFormRules:{
                  account:[
                      { required: true, message: '用户名不能为空', trigger: 'blur' },
                  ]
              },
              elSelectStyle:{
                  width: '100%'
              },
              selectParams: {
                  clearable: true,
              },
              treeParams: {
                  'check-strictly': true,
                  'default-expand-all': true,
                  'expand-on-click-node': false,
                  data: [],
                  props: {
                      value: 'id',
                      label: 'deptName',
                      checkStrictly: true
                  }
              }
          }
        },
        computed:{
            addDialogVisible:{
                get(){
                    return this.$props.addChildDialogVisible
                },
                set(){
                    this.closeDialog()
                }

            }
        },
        methods:{
            closeDialog(){
                this.$emit('closeAddDialog')
            },
            resetAddForm(){
                this.$refs.addFormRef.resetFields()
            },
            addFormSubmit(){
                addUser(this.addForm).then(res => {
                    let result = res.data
                    if(result.success){
                        this.$message.success(result.message)
                        this.closeDialog()
                        this.$emit('reloadParentData')
                    }
                })
            }
        },
        watch:{
        deptTreeData(val){
            this.treeParams.data = val
        }
        }
    }
</script>

<style lang="less" scoped>
</style>
