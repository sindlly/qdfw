te/**
* Created by sindlly on 2018-12-25.
*/
<template>
  <div class="main">
    <Header fixed title="前端服务组2018工作总结"></Header>
    <h2>成员登录</h2>
    <Field label="用户名" placeholder="请输入中文名字" v-model="name"></Field>
    <br>
    <Button @click="login" type="primary" size="large">登录</Button>
  </div>
</template>

<script>
  import axios from 'axios'
  import { Button, Field,Cell,Header,Toast } from 'mint-ui'
    export default {
        components:{Button, Field ,Cell,Header,Toast  },
        data() {
            return {
                name:''
            }
        },
        mounted(){
            //处理加载完毕后的事件
        },
        methods: {
            login(){
                let _this = this
                axios.get('/user/login?name='+this.name)
                    .then(function (response) {
                        if(response.data.code == 0){
                            Toast({
                                message: response.data.msg,
                                duration: 3000
                            });
                            localStorage.setItem('id', response.data.result.list[0]._id);
                            localStorage.setItem('role', response.data.result.list[0].role);
                            localStorage.setItem('name', response.data.result.list[0].name);
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
            }
        }
    }
</script>
<style>
  .main{
    margin-top: 50px;
  }
</style>