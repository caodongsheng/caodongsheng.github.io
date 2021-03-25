<template>
  <div style="overflow: auto; height: 100%;background:#fff;">
    <div class="header-wrap">
      <x-header :left-options="{backText: '',preventGoBack: true}" @on-click-back="backToPre">{{headerTitle}}
        <router-link slot="right" to @click.native="toProve" >我来证明</router-link>
      </x-header>
    </div>


    <div class="mt-25 prove-box" v-for="(val, index) in vos" :key='index'>
      <!-- <img class="touxiang" :src="val.user_pic" style="border-radius:50%;"> -->
      <avatar width="35" height="35" :image="val.user_pic" :name="val.witness_name" class="touxiang"></avatar>
      <h4 class="f_l user-box-b color-333">{{val.witness_name}}</h4>
      <span v-if="val.is_certification == null"><i class="fa fa-id-card-o fa-lg" style="color:#39aede; padding-left: 5px;"></i></span>
      <span v-else class="shim"><i>已实名</i><ii>{{val.relationship}}</ii></span>
      <div class="clear"></div>
      <div class=" prove-content">
        <h3 class="color-999">{{val.comments}}</h3>
        <div class="weui-grids">
        	<a class="weui-grid" v-for="(item,index) in val.img" :key="index">
	          <img :src="item" @click="clickImg" alt="详情图片">
	        </a>
        </div>
        <p class="color-999">{{val.create_date}}</p>
      </div>
    </div>
		<!-- 放大图片 -->
    <big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>
     <div v-transfer-dom>
      <confirm
        v-model="showconfirm"
        title
        confirm-text="去登录"
        cancel-text="取消"
        @on-confirm="onConfirm()"
        @on-cancel
      >
        <p style="text-align:center;">您还未登录，请登录后再为其证明！</p>
      </confirm>
    </div>
    <div v-transfer-dom>
      <confirm
        v-model="showconfirmPhone"
        title
        confirm-text="确定"
        cancel-text="取消"
        @on-confirm="onConfirmPhone()"
        @on-cancel
      >
        <p style="text-align:center;">请先绑定手机号！</p>
      </confirm>
    </div>
    <div v-transfer-dom>
      <confirm
        v-model="showToCertification"
        title
        confirm-text="马上去认证"
        cancel-text="取消"
        @on-confirm="toRealName()"
        @on-cancel
      >
        <p style="text-align:center;">您还未进行实名认证，请通过认证后再为其证明！</p>
      </confirm>
    </div>
  </div>
</template>

<script>
	import BigImg from '../../../../components/imgDialog/BigImg'
import avatar from '../../../../components/util/avatar'
import {XHeader, Grid, GridItem, TransferDom,Confirm} from 'vux'

export default {
  components: {XHeader, avatar, Grid, GridItem, Confirm, 'big-img': BigImg},
  directives: { TransferDom },

  data () {
    return {
      	paramsID: 0,
      	vos: [],
      	showImg: false,
      imgSrc: '',
      headerTitle: '证明列表',
        showToCertification: false,
      showconfirmPhone: false,
      showconfirm: false,
      list: [{
        msrc: 'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
        src: 'http://ww1.sinaimg.cn/large/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
        w: 800,
        h: 400
      },
	      {
	        msrc: 'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwvqwuoaj20xc0p0t9s.jpg',
	        src: 'http://ww1.sinaimg.cn/large/663d3650gy1fplwvqwuoaj20xc0p0t9s.jpg',
	        w: 1200,
	        h: 900
	      }, {
	        msrc: 'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwwcynw2j20p00b4js9.jpg',
	        src: 'http://ww1.sinaimg.cn/large/663d3650gy1fplwwcynw2j20p00b4js9.jpg'
	      }]
    }
  },
  methods: {
    	clickImg (e) {
      this.showImg = true
      // 获取当前图片地址
      this.imgSrc = e.currentTarget.src
    },
    viewImg () {
      this.showImg = false
    },
    
     onConfirmPhone() {
          this.$router.push('/FirstBind')
      },
       onConfirm() {
      // this.$router.push({
      //   path: "/login",
      //   query: { redirect: location.hostname }
      // });
      // window.android.login()
      this.ModuleNative('AppReturnToLoginPage','需求详情去登录')
    },
    toRealName() {
      this.$router.push("/setrealname/0");
    },
     async toProve() {
      if (!this.G("token")) {
        this.showconfirm = true;
      } else {
      await this.$store.dispatch('getUser', { _this: this.$http })
         if (this.$store.state.user.is_certification == 1) {
          this.$router.push({
            name: "iToProve",
            params: { id: this.paramsID }
          });
        } else if(this.$store.state.user.is_certification == 0) {
          this.showToCertification = true;
        }
      }
    },
    //  toProve() {
    //   if (!this.G("token")) {
    //     this.showconfirm = true;
    //   } else {
    //     if (this.$store.state.user.mobile == null) {
    //       this.showconfirmPhone = true;
    //     } else if (
    //       this.$store.state.user.mobile !== null &&
    //       this.$store.state.user.is_certification == 1
    //     ) {
    //       this.$router.push({
    //         name: "iToProve",
    //         params: { id: this.paramsID }
    //       });
    //     } else if (
    //       this.$store.state.user.mobile !== null &&
    //       this.$store.state.user.is_certification == 0
    //     ) {
    //       this.showToCertification = true;
    //     }
    //   }
    // },
    getAllproveInfo () {
      this.paramsID = this.$route.params.id
      let _this = this
      this.$http.post('hts/help/getWitnessList', {'demand_code': this.$route.params.id})
          .then(function (response) {
            _this.vos = response.data.vos
            for (var i = 0; i < response.data.vos.length; i++) {
              	if (response.data.vos[i].is_cadre == 1) {
              		response.data.vos[i].is_cadre = true
              	} else {
              		response.data.vos[i].is_cadre = false
              	}
//            	let imglist =  response.data.vos[i].img;
//            	response.data.vos[i].img=[];
//            	for(var j=0;j<imglist.length ;j++){
//            		response.data.vos[i].img.push({'src':imglist[j]})
//            	}
            }
          })
          .catch(function (error) {
            if(error.msg){
            _this.showToast('', 'text', error.msg, '20em', '', 'middle')
            }
           
          })
    },
    backToPre () {
      this.$router.replace({path: '/loveNeed'+ '/' +this.paramsID})
    }

  },
  created: function () {
    this.getAllproveInfo()
  }
}
</script>

<style lang="less" scoped>
	/*.header-wrap .vux-header{
		background:-webkit-linear-gradient(bottom left, #e34103,#e65713,#ef7f33,#f08b15) !important;
    background:-o-linear-gradient(bottom left, #e34103,#e65713,#ef7f33,#f08b15) !important;
    background:-moz-linear-gradient(bottom left, #e34103,#e65713,#ef7f33,#f08b15) !important;
    background:linear-gradient(bottom left, #e34103,#e65713,#ef7f33,#f08b15) !important;
	}*/

  .vux-header-right a {
    color: #f37306 !important;
  }
	.mt-25 {
		margin-top: 25px;
	}
  .prove-box {
    padding: 0 15px;
    line-height: 35px;
    border-bottom: 1px solid #e5e5e5;
  }
  .touxiang {
    vertical-align: middle;
    float: left;
    width: 35px;
    height: 35px;
  }

  .prove-box h4 {
    text-align: center;
    padding-left: 10px;
    color: #39aede;
    overflow: hidden;
  }
	.color-333{
		color: #333!important;
	}
  .prove-box span {
    line-height: 35px;
    float: right;
  }
	.shim{
		width: 75px;
		height: 19px;
		line-height: 19px!important;
		color: #ee6b2b;
		border: 1px solid #EE6B2B;
		border-radius: 6px;
		margin-top: 7px;
	}
	.shim i{
		display: inline-block;
		width: 44px;
		text-align: center;
		font-size: 11px;
		border-right: 1px solid #EE6B2B;
		float: left;
	}
	.shim ii{
		display: inline-block;
		width: 30px;
		height: 100%;
		font-size: 11px;
		text-align: center;
		float: left;
	}
  .prove-content {
    padding-left: 45px;

  }
	.prove-content a:nth-child(3n+1){
		padding-left: 0px;
	}

	.prove-content a:nth-child(3n){
		padding-right: 0px;
	}
  .prove-content h3 {
    font-weight: normal;
  }
  .prove-content p{
  	margin-bottom: 20px;
  }

  .weui-grids {
    position: relative;
    overflow: hidden;
	}


  .weui-grid{
  	width: 30%;
  	padding: 0;
  	margin-right: 10px;
  	display: block;
  	float: left;
  }
  .weui-grid img{
  	width: 100%;
  }
	.weui-grids .weui-grid:nth-child(3n+3){
  	margin-right: 0;
  }
  .weui-grid:after {
    border: 0px solid #e5e5e5 !important;
  }

  .weui-grid:before {
    border: 0px solid #e5e5e5 !important;
  }

  .weui-grids:before {
    border: 0px solid #e5e5e5 !important;
  }

  .yishiming span {
    border: 1px solid #f37306;
    padding: 1px;

  }

  .yishiming .spana {
    border-right: 0px !important;
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
  }

  .yishiming .spanb {
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
  }
</style>

