/**
* Created by sindlly on 2018-12-27.
*/
<template>
    <Layout>
        <div slot="container" style="text-align: left">
            <Cell title="汇报者" style="background: #26a2ff;color: #fff"></Cell>
            <Radio style="max-height: 200px; overflow-y: auto"
                   align="left"
                    v-model="reporter"
                    :options="optionUser"
                   @input="getReporter">
            </Radio>
            <Cell title="项目经理" style="background: #26a2ff;color: #fff"></Cell>
            <Radio  style="max-height: 200px; overflow-y: auto"

                    v-model="pm"
                    :options="optionPM"
                    @input="getPM">
            </Radio>
            <div style="position: fixed;bottom: 41px;text-align: center">汇报者：{{reporter}}，项目经理：{{pm}}</div>
            <Button @click="submit" type="primary" size="large" style="position: fixed;bottom: 0;left: 0;" >提交</Button>
        </div>
    </Layout>
</template>

<script>
    import Layout from './layout'
    import { Radio,Toast,Button,Cell  } from 'mint-ui'
    import axios from 'axios'
    export default {
        components:{Layout,Radio,Toast,Button,Cell},
        data() {
            return {
                reporter:'',pm:'',
                optionUser:[
                    {label: '邓晓渝', value: '邓晓渝',}, {label: '林国池', value: '林国池',}, {label: '陈军', value: '陈军',},
                    {label: '骆林佳', value: '骆林佳',}, {label: '周旋', value: '周旋',}, {label: '安宁', value: '安宁',},
                    {label: '何贵川', value: '何贵川',}, {label: '刘玉帛', value: '刘玉帛',},{label: '李茂', value: '李茂',},
                    {label: '向锰', value: '向锰',}, {label: '黄宗培', value: '黄宗培',},{label: '罗庆波', value: '罗庆波',},
                    {label: '贺愚然', value: '贺愚然',}, {label: '杨霖', value: '杨霖',},{label: '黄浩', value: '黄浩',},
                    {label: '向巍', value: '向巍',},{label: '卢佳瑜', value: '卢佳瑜',}
                ],
                optionPM:[
                    {label: '邓晓渝', value: '邓晓渝',}, {label: '林国池', value: '林国池',}, {label: '陈军', value: '陈军',},
                    {label: '骆林佳', value: '骆林佳',}, {label: '周旋', value: '周旋',}, {label: '安宁', value: '安宁',},
                    {label: '何贵川', value: '何贵川',}, {label: '刘玉帛', value: '刘玉帛',},{label: '李茂', value: '李茂',},
                    {label: '向锰', value: '向锰',}, {label: '黄宗培', value: '黄宗培',},{label: '罗庆波', value: '罗庆波',},
                    {label: '贺愚然', value: '贺愚然',}, {label: '杨霖', value: '杨霖',},{label: '黄浩', value: '黄浩',},
                    {label: '向巍', value: '向巍',},{label: '卢佳瑜', value: '卢佳瑜',}
                ]
            }
        },
        mounted(){
            //处理加载完毕后的事件
        },
        methods: {
            submit(){
                var _this = this
                axios.get('/user/setUserInfo?name='+_this.reporter+'&pm='+_this.pm)
                    .then(function (response) {
                        if(response.data.code == 0){
                            Toast({
                                message: response.data.msg,
                                duration: 3000
                            });
                            _this.$router.push('/vote')
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
            getReporter(val){
                this.reporter = val
            },
            getPM(val){
                this.pm = val
            }
        }
    }
</script>
<style>
</style>