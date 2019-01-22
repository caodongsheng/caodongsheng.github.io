<template lang="html">
    <div class="box">
        <button type="button" :class="['button',posi]">
            <slot></slot>
        </button>
    </div>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    props:{
        icon:{
            type:String,
            default:'',
        },
        posi:{
            type:String,
            default:'left'
        }
    }

}
</script>

<style lang="scss" scoped>
    .button{
        cursor:pointer;
        color: $color;
        height: $buttonHeight;
        line-height: $buttonHeight;
        padding: 0 1em;
        background: $buttonBg;
        border-radius: $borderRadius;
        border: 1px solid $borderColor;
        &:hover{
            border: 1px solid $borderColorHover;
        }
        &:active{
            background: $buttonActiveBg;
        }
    }
</style>
