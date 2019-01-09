/**
* Created by sindlly on 2018-12-27.
*/
<template>
    <Layout>
        <div slot="container" style="text-align: left">
            <h2>投票结果</h2>
            <div v-for="item in users">
                <Cell :title=item.name v-if="item.name != '李孟君'">
                    <span class="grade">A:{{ item.grade.A }}</span>
                    <span class="grade">B:{{ item.grade.B }}</span>
                    <span class="grade">C:{{ item.grade.C }}</span>
                </Cell>
            </div>
            <download-excel
                    class = "export-excel-wrapper"
                    :data = "users"
                    :fields = "json_fields"
                    name = "filename.xls">
                <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
                <!-- <el-button type="primary" size="small">导出EXCEL</el-button> -->
            </download-excel>
        </div>
    </Layout>

</template>

<script>
    import Layout from './layout'
    import { Radio,Toast,Button,Cell } from 'mint-ui'
    import axios from 'axios'
    /*import Vue from 'vue'
    import JsonExcel from 'vue-json-excel'
    Vue.component('downloadExcel', JsonExcel)*/
    export default {
        components:{Layout,Radio,Toast,Button,Cell },
        data() {
            return {
                users:[],
                grade:[],
                json_fields:{

                }
            }
        },
        mounted(){
            this.getUsers()
        },
        methods: {
            getUsers(){
                let _this = this
                axios.get('/user/users')
                    .then(function (response) {
                        if(response.data.code == 0){
                            _this.users = response.data.data
                        }else{
                            Toast({
                                message: response.data.msg,
                                duration: 3000
                            });
                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
        }
    }
</script>
<style>
    .mint-cell-title{
        flex: 1;
    }
    .mint-cell-value{
        flex: 2;
    }
    .grade{
        display: inline-block;
        width: 4rem;
    }
</style>