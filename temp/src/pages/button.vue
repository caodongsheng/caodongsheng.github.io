<template lang="html">
    <div class="pad">
        <gbutton>按钮</gbutton>
    </div>
</template>

<script>
import gbutton from '@/components/button'
import iconNav from '@/components/nav_icon'
export default {
    components:{
        gbutton
    },
    mounted(){
        // for(let i=(setTimeout(()=>console.log(i),2333),0);i<2;i++){
        //
        // }
        let i=(1,2)
        console.log(i)
    }
}
</script>

<style lang="scss" scoped>
    .pad{
        padding:30px 0 0 50px;
    }
</style>
