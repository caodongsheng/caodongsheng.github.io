<template lang="html">
    <div class="asd">
        <div class="box"  @mouseenter="enter" @mousemove="move" @mouseleave="leave" :style="{'transform':'scale('+enterY+') translateX('+(moveX)+'px) translateY('+(moveY)+'px) rotateX('+moveY+'deg) rotateY('+moveX+'deg) '}" >
        </div>
    </div>
</template>

<script>
export default {
    components:{

    },
    data(){
        return {
            boxX:360,
            boxY:145,
            moveX:0,
            moveY:0,
            enterY:1,
        }
    },
    methods:{
        enter(){
            this.enterY=1.01
        },
        move(e){
            this.moveX=-(this.boxX-e.offsetX)/40*1.91;
            this.moveY=-(this.boxY-e.offsetY)/40*1.91;
        },
        leave(){
            this.moveX=0
            this.moveY=0
            this.enterY=1
        }
    },
    mounted(){

    },
}
</script>

<style lang="scss" scoped>
.asd{
    // transform-style: preserve-3d;
    width: 100vw;
    height: 800px;
    position: relative;

}
.asd:hover .box{
    // transition: ease all .5s;
    box-shadow: 0 0 20px 5px rgba(0,0,0,.5);
    background: rgba(255,255,255,.2)
}
.box{
    top: 50px;
    left: 100px;
    width: 720px;
    height: 290px;
    border-radius: 10px;
    box-sizing: border-box;
    background: rgba(255,255,255,.0);
    transition:  ease all 0s;
    overflow: hidden;
    position:absolute;
    &:hover{

    }
}
</style>
