<template>
  <div class="avaterimg" :style="style">
    <img v-lazy="getminpic(img)" @error="setErrorImg" :style="style">
    <!--<div v-if="img === undefined  || img === '' || img === null" :style="imgStyle">{{firstname}}</div>-->
    <badge text="V" v-if="vtype !== '0'&& vtype !== undefined" :style="badgeStyle"></badge>
  </div>
</template>
<script>
  import { Badge } from 'vux'
  import avt from './fpw_logo_small.png'
  import {getMinPic} from "@/util/getMin"
import { getMidPic } from '@/util/getMid';
  let colors = ['#ed6b2b', '#ed6b2b', '#ed6b2b']
  export default {
    name: 'avatar',
    components: {
      Badge
    },
    data () {
      return {
        firstname: this.name,
        img: this.image&&this.image!=""?this.image:avt,
        fontSizeBit: 2.5,
        bgColor: '#ff6325'
      }
    },
    computed: {
   
      style () {
        return {
          width: this.width + 'px',
          height: this.height + 'px',
          fontSize: Math.abs(this.width / 3) + 'pt',
          // background: this.bgColor, // colors[this.name.charCodeAt(0) % 3],
          borderRadius: '100%',
          position: 'relative'
        }
      },
      imgStyle () {
        return {
          position: 'absolute',
          width: this.width + 'px',
          height:this.height+ 'px',
          lineHeight:this.height+ 'px',
          fontSize: Math.abs(this.width / this.fontSizeBit) + 'pt',
          color: '#fff',
          textAlign:'center',
          top: 0
        }
      },
      size () {
        return Math.abs(this.width / 2) + 'pt'
      },
      badgeStyle () {
        return {
          position: 'absolute',
          top: this.width * 0.7 + 'px',
          left: this.height * 0.7 + 'px',
          background: '#319efe'
        }
      }
    },
    props: {
      width: {
        type: [String, Number],
        default: 40
      },
      height: {
        type: [String, Number],
        default: 40
      },
      image:  {
        type: String,
        default: ""
      },
      tsize:String,
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
      getminpic(url){
        console.log(getMidPic(url))
      return getMidPic(url)
      },
      firname () {
    		let tsize_ = this.tsize
      	let cnReg = /([\u4e00-\u9fa5]|[\u3000-\u303F]|[\uFF00-\uFF60])/g
				let mat = cnReg.test(this.name)
				if(this.name){
					if(tsize_=== '2'){
            this.fontSizeBit = 3.6
            this.bgColor = '#FA58AC'
            return this.firstname = this.name.substring(0, 2)

					}else{
						return this.firstname = this.name.substring(this.name.length - 1)
					}
				}else{
          this.img = avt
				}
      },
      setErrorImg (e) {
        this.img = avt
      },
      setImg(){
        if(this.image&&this.image!==''){
          this.img= this.image
        }else{
          this.img = avt
        }
      }
    },
    created (){
     // this.setImg()
      // 设置作为头像显示的首二字或未一字，现方案改用默认头像，注释
      this.firname()
    }
  }
</script>
<style scoped>
  .avaterimg{
    text-align:center;
    vertical-align: middle;
    display:inline-block;
    background: none;
  }
</style>
