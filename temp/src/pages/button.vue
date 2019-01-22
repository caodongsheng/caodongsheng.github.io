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
    }
}
</script>

<style lang="scss" scoped>
    .pad{
        padding:30px 0 0 50px;
    }
</style>
