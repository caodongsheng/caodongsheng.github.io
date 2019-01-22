<template lang="html">
    <div class="">
        <div class="box " :class="{class_active:!$store.state.navfalg}" @click="swfn">
            <div class="iocn "></div>
        </div>
    </div>
</template>

<script>
export default {
    name:'iconnav',
    data(){
        return{
            icon_active:false,
        }
    },
    methods:{
        swfn(){
            this.$store.state.navfalg=!this.$store.state.navfalg
        }
    },
    mounted(){
    }
}
</script>

<style lang="scss" scoped>
    .box{
        width: 60px;
        height: 60px;
        background-color: #000;
        box-sizing: border-box;
        border-radius: 50%;
        position: relative;
        box-shadow:0 5px 10px  rgba(0,0,0,.5);
        cursor: pointer;
        transition: ease all 0.5s;
        .iocn{
            width: 30px;
            height: 4px;
            background: #fff;
            border-radius: 2px;
            position:absolute;
            top: 28px;
            left: 15px;
            transition: ease all .5s;
        }
        .iocn:before{
            transition: ease all .5s;
            width: 30px;
            height: 4px;
            background: #fff;
            border-radius: 2px;
            position:absolute;
            content: "";
            left: 0;
            top: -9px;
        }
        .iocn:after{
            transition: ease all .5s;
            width: 30px;
            height: 4px;
            background: #fff;
            border-radius: 2px;
            position:absolute;
            content: "";
            left: 0;
            top: 9px;
        }

    }
    .box:hover{
        background-color: rgba(51,122,187,9);

    }
    .class_active{
        background: #999;
    }
    .class_active .iocn{
        width: 0;
    }
    .class_active .iocn::before{
        transform: translateY(9px) rotate(45deg);
    }
    .class_active .iocn::after{
        transform: translateY(-9px) rotate(-45deg);
    }
</style>
