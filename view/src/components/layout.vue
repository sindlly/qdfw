<template>
    <div class="mian">
        <Header fixed title="前端服务组2018工作总结">
            <div  @click="$router.go(-1)" slot="left">
                <Button icon="back"></Button>
            </div>
            <Button icon="more" slot="right" @click="toDisplay"></Button>
        </Header>
        <div class="container">
            <slot name="container"></slot>
        </div>
    </div>
</template>

<script>
    import { Header, Button } from 'mint-ui'
    export default {
        name: "layout",
        components:{Header,Button},
        methods:{
            toDisplay(){
                if(localStorage.role>1||localStorage.name == "邓晓渝"){
                    this.$router.push('/display')
                }
            }
        }
    }
</script>

<style scoped>

</style>