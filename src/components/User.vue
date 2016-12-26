<template>
    <div>
        <div>is user:{{$route.params.userName}}{{$route.params.id}}</div>
        <router-view>ffff</router-view>
    </div>
</template>
<style>
    body{
        background-color:#ff0000;
    }
</style>
<script>
    export default{
        data(){
            return{
              msg: '?'
            }
        },
        components:{
            //'other-component':OtherComponent,
            //HeaderComponent,
        }
    }
</script>
