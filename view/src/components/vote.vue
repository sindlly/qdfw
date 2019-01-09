/**
* Created by sindlly on 2018-12-25.
*/
<template>
    <Layout>
        <div slot="container">
            <h2>成员：{{voter}}</h2>
            <Radio
                    :value.sync="Rvalue"
                    :options="options"
                    @input="getValue"
            >
            </Radio>
            <br>
            (项目经理：{{pm}})
            <Button @click="vote" type="primary" size="large" style="margin-top: 20px">提交</Button>
            <div style="position: fixed;bottom:0;left:0;width: 100%" @click="toAdmin" >
                <CellSwipe
                        title="设置"
                        is-link>
                </CellSwipe >
            </div>

        </div>
    </Layout>
</template>

<script>
    import Layout from './layout'
    import { Radio,Toast,Button,CellSwipe   } from 'mint-ui'
    import axios from 'axios'

    export default {
        components:{Layout,Radio,Toast,Button,CellSwipe },
        data() {
            return {
                Rvalue:'A',
                options:[
                    {
                        label: 'A',
                        value: 'A',
                    },
                    {
                        label: 'B',
                        value: 'B'
                    },
                    {
                        label: 'C',
                        value: 'C'
                    }
                ],
                voter:'',
                voterID:'',
                pm:'',
            }
        },
        mounted(){
            //处理加载完毕后的事件
            this.getUser()
        },
        methods: {
            getUser(){
                let _this = this
                axios.get('/user/user')
                    .then(function (response) {
                        if(response.data.code == 0){
                            _this.voter=response.data.data[0].name
                            _this.voterID=response.data.data[0].id
                            _this.pm=response.data.data[0].pm
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
            vote(){
                let _this = this
                console.log(_this.voterID )
                console.log(localStorage.hadVoteid )
                if(_this.voterID == localStorage.hadVoteid){
                    Toast({
                        message: "您已投过票",
                        duration: 3000
                    });
                }else{
                    let role = this.pm == localStorage.name ?2:localStorage.role  //判断是否是PM

                    axios.get('/user/vote?id='+_this.voterID+'&grade='+_this.Rvalue+'&role='+role)
                        .then(function (response) {
                            if(response.data.code == 0){
                                Toast({
                                    message: response.data.msg,
                                    duration: 3000
                                });
                                //将已投过的id存入localstorage
                                localStorage.setItem('hadVoteid',_this.voterID );
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


                }
            },
            getValue(val){
                console.log("her")
                this.Rvalue = val
            },
            toAdmin(){
                if(localStorage.name=="邓晓渝"){
                    this.$router.push('/admin')
                }else {
                    Toast({
                        message: "你没有权限~~！",
                        duration: 3000
                    });
                }
            }
        }
    }
</script>
<style>
</style>