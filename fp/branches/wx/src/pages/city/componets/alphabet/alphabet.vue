<template>
  <div class="zimu">
    <ul>
      <li class="item" v-for="(list,index) in letters" @click="hand"
          @touchstart="handstart"
          @touchmove="handmove"
          @touchend="handend"
          :ref="list">{{list}}
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return{
        touchStarts:false,
        index:''
      }
    },
    computed: {
      letters() {
        const letters =[]
        for(let i in this.cities){
          letters.push(i)
        }
        return letters
      }
    },
    props: {
      cities:Object
    },
    methods:{
      hand(e){
        this.$emit("change",e.target.innerText)
      },
      handstart(){
        this.touchStarts=true
      },
      handmove(e){
        if(this.touchStarts){
          const startY= this.$refs["#"][0].offsetTop
          //需要计算出 第一个字母和顶部的差
          const touchY =e.touches[0].clientY - 60
          //获取第一根手指头在滑动区域的y坐标点
          const index= Math.floor((touchY - startY ) / 20)
          //除每个字母的高度//获取下标
          if(index >= 0 && index< this.letters.length){
            this.$emit("change",this.letters[index])
          }
        }
      },
      handend(){
        this.touchStarts=false
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .zimu{
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 1.5rem;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    color: #666;
    background: #f4f4f4;
    .item{
      line-height: 1.5;
    }
  }
</style>
