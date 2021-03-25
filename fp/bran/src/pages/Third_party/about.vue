<template>
    <div class="asd">
        <div class="box">
            <x-header :left-options="{backText: ''}">{{"关于我们"}}</x-header>
        </div>
        <div class="cent">
            <img src="../../../static/appimg/AboutMe.jpg" alt="">
        </div>
    </div>
</template>
<script>
import {XHeader} from "vux";
export default {
    components:{
        XHeader
    },
}
</script>
<style lang="less" scope="">
    .asd{
        background: #fff;
        width: 100%;
        height: 100%;
        overflow:scroll;
    }
    .box {
        width: 100%;
        height: auto;
        position:fixed;
    }
    .cent{
        width: 100%;
        height:auto;
        padding-top: 47px;
        img{
            width: 100%;
        }
    }
</style>