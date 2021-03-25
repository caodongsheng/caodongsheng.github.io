<template>

  <div class="avaterimg" :style="style">
    <div class="boxF" :style="repoter">
      <div class="boxS">
        <div class="boxT" :style="backgroun">
          <img :src="img" v-if="img !== undefined && img !== '' && img!==null" @error="setErrorImg" :style="style2">
          <!--<div v-if="img === undefined  || img === ''" :style="imgStyle">{{firstname}}</div>-->
          <badge text="V" v-if="vtype !== '0'&& vtype !== undefined" :style="badgeStyle"></badge>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import avt from './fpw_logo_small.png'
  import { Badge } from 'vux'
  //let colors = ['#cc0', '#0cc', '#c0c']
  export default {
    name: 'avatar',
    components: {
      Badge
    },
    data () {
      return {
        firstname: this.name,//.substring(0, 1),
        img: this.image
      }
    },
    computed: {
      style () {
        return {
          width: this.width + 'px',
          height: this.height + 'px',
          fontSize: Math.abs(this.width / 2.2) + 'pt',
          position: 'relative'
        }
      },
      style2(){
        return {
          width: '100%',
          height: this.height + 'px',
          fontSize: Math.abs(this.width / 2.2) + 'pt',
          position: 'relative'
        }
      },
      backgroun (){
        return {
          background: "#ff6325"//colors['this.name.charCodeAt(0) % 3'],
        }
      },
      repoter (){
        return {
          fontSize: Math.abs(this.height / 3.2) + 'pt',
          color: '#fff',
          left: this.width * 0.2 + 'px'
        }
      },
      imgStyle () {
        return {
          height:40+ 'px',
          lineHeight:40+ 'px',
          color: '#fff',
        }
      },
      size () {
        return Math.abs(this.width / 2) + 'pt'
      },
      badgeStyle () {
        return {
          top: this.width * 0.7 + 'px',
          left: this.height * 0.7 + 'px',
          background: '#319efe'
        }
      }
    },
    props: {
      width: {
        type: [String, Number],
        default: 54
      },
      height: {
        type: [String, Number],
        default: 40
      },
      image: String,
      name: String,
      vtype: {
        type: String,
        defalut: '0'
      },
      bgcolor: {
        type: String,
        defalut: '#ff0'
      }
    },
    methods: {
      setImg(){
        if(this.image!==undefined && this.image!==''&&this.image!==null){
          this.img= this.image
        }else{
          this.img = avt
        }
      },
      async firname (){
        let cnReg = /([\u4e00-\u9fa5]|[\u3000-\u303F]|[\uFF00-\uFF60])/g;
        if(this.name) {
          let mat = this.name.match(cnReg);

          if (mat) {
            if (this.name.length > 2) {

              return this.firstname = this.name.substring(this.name.length - 2);
            } else {
              return this.firstname = this.name.substring(this.name.length - 2);
            }
          } else {
            return this.firstname = this.name.substring(0, 2);
          }
        }else{
          return '爱'
        }
      },
      setErrorImg (e) {
        this.img = avt
      }
    },
    created(){
      this.setImg()
      this.firname()
    }
  }
</script>
<style scoped>
  .avaterimg{
    text-align:center;
    vertical-align: middle;
    display:inline-block;
    /*transform: rotate(-60deg);
    -ms-transform: rotate(-60deg);
    -moz-transform: rotate(-60deg);
    -webkit-transform: rotate(-60deg);
    overflow: hidden;*/
  }
  .boxF, .boxS, .boxT
  {
    width: 35px;
    height: 40px;
  }
  .boxF, .boxS,.boxT
  {
    visibility: hidden;
    overflow: hidden;
  }
  .boxF
  {
    transform: rotate(120deg);
    float: left;
    margin-left: 10px;
    -ms-transform: rotate(120deg);
    -moz-transform: rotate(120deg);
    -webkit-transform: rotate(120deg);
  }
  .boxS
  {
    transform: rotate(-60deg);
    -ms-transform: rotate(-60deg);
    -moz-transform: rotate(-60deg);
    -webkit-transform: rotate(-60deg);
  }
  .boxT
  {
    transform: rotate(-60deg);
    background: no-repeat 50% center;
    background-size: 125% auto;
    -ms-transform: rotate(-60deg);
    -moz-transform: rotate(-60deg);
    -webkit-transform: rotate(-60deg);
    visibility: visible;
    position: absolute;
    left: 0;
  }
</style>
