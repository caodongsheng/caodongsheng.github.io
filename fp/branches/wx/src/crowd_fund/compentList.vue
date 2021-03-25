<template>
	<div>
		<div class="contain">
			<i></i>
			<div class="contain_bottom">
				<div class="top">
					<img src="http://zgshfp.oos-website-cn.oos.ctyunapi.cn/bangfu/2018/11/6/2018-11-6-bc5ad4ad-5fe2-482c-8ef7-39e195edc6ac-max.png" alt=""></img>
					<p>中国扶贫基金会</p>
					<span>众筹</span>
					<div class="clear"></div>
				</div>
				<div class="center"  @click="goDetail">
					<img :src=zcdata.acr065?zcdata.acr065:imgUrl alt=""></img>
					<div>
						<p>{{zcdata.title}}</p>
						<div class="margin left">
							<Progress :proge='zcdata.progressnum'></Progress>
						</div>
						<div class="margin bottom">
							<span>目标金额<span class="color">3亿元</span></span>
							<span>已募集<span class="color">{{moneySplit(zcdata.alreadymoney)}}</span></span>
						</div>
					</div>
					<!-- <div class="clear"></div> -->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Progress from '@/crowd_fund/Progress'
	export default {
		components:{
			Progress
		},
		props:['zcdata','zcuserid','zctoken','zcnickname'],
		data () {
			return {
				imgUrl:require('../assets/images/gongzhang.png')
			}
		},
		methods :{
			moneySplit (projectAlM) {
	            if(projectAlM<10000){
	              projectAlM = projectAlM +'元';
	            }else if(projectAlM>=10000&&projectAlM<100000000){
	              projectAlM =Math.floor(projectAlM/10000)+'万元';


	            }else if(projectAlM>=100000000){
	              projectAlM =Math.floor(projectAlM/100000000)+'亿元';
	            }
	            return projectAlM
	          },
			goDetail () {

				// this.$router.push('/zcprojectDetail/'+this.zcdata.crowdId+'/'+this.zcuserid+'/'+this.zctoken)

				console.log(window.location.href,'这是当前跳转详情地址');
				if(this.isWeixinCient()){
					console.log('这是微信的跳转详情');
					console.log('/zcprojectDetail/'+this.zcdata.crowdId+'/'+this.zcuserid+'/'+encodeURIComponent(this.zcnickname)+'/'+this.zctoken)
					if(this.zcdata.crowdId){
						this.$router.push('/zcprojectDetail/'+this.zcdata.crowdId+'/'+this.zcuserid+'/'+encodeURIComponent(this.zcnickname)+'/'+this.zctoken)
					}else{
						this.$router.push('/zcprojectDetail/'+this.zcdata.crowdid+'/'+this.zcuserid+'/'+encodeURIComponent(this.zcnickname)+'/'+this.zctoken)
					}
				}else{
					// console.log('这是app的跳转详情')
					// console.log('{"title":"项目详情","url":"'+this.appjump_url+'/pages/index/#/zcprojectDetail/'+this.zcdata.crowdId+'/'+this.zcuserid+'/'+encodeURIComponent(this.zcnickname)+'/'+this.zctoken+'","navbarHidden":"YES"}')
					// if(this.zcdata.crowdId){
					// 	window.navigation.pushPage('{"title":"项目详情","url":"'+this.appjump_url+'/pages/index/#/zcprojectDetail/'+this.zcdata.crowdId+'/'+this.zcuserid+'/'+localStorage.getItem('zcnickname')+'/'+this.zctoken+'?histroy=black","navbarHidden":"YES"}');
					// }else{
					// 	window.navigation.pushPage('{"title":"项目详情","url":"'+this.appjump_url+'/pages/index/#/zcprojectDetail/'+this.zcdata.crowdid+'/'+encodeURIComponent(this.zcnickname)+'/'+this.zcuserid+'/'+this.zctoken+'?histroy=black","navbarHidden":"YES"}');
					// }

					if(this.zcdata.crowdId){
						this.$router.push('/zcprojectDetail/'+this.zcdata.crowdId+'/'+this.zcuserid+'/'+encodeURIComponent(this.zcnickname)+'/'+this.zctoken)
					}else{
						this.$router.push('/zcprojectDetail/'+this.zcdata.crowdid+'/'+this.zcuserid+'/'+encodeURIComponent(this.zcnickname)+'/'+this.zctoken)
					}

				}
			}
		},
		mounted () {
			console.log(this.zcnickname,'111111111111111111111111')
		}

	}
</script>

<style scoped>
.contain{
	width: 100%;
}
.contain i{
	height: 10px;
	display: block;
	background-color: #F6F6F6;
}
.contain_bottom{
	width: 100%;
	padding: 0 12px;
	box-sizing: border-box;
}
.top{
	width: 100%;
	margin-top: 10px;
}
.top img{
	width: 30px;
	height: 30px;
	float: left;
	border-radius: 50%;
}
.top p{
	float: left;
	line-height: 32px;
	margin-left: 10px;
	color: #999999;
}
.top span{
	float: right;
	padding: 0px 4px;
	border:1px solid #F48121;
	color: #F48121;
	border-radius: 5px;
}
.clear {
  clear: both;
 }
.center{
	width: 100%;
	overflow: hidden;
	margin: 5px 0 5px 0;
}
.center img{
	width: 100px;
	height: 100px;
	float: left;
}
.center>div{
	width: 68%;
	float: left;
	box-sizing: border-box;
	padding:0 0 0 5px;
}
.center>div p{
	color:#666;
	font-size: 14px;
	margin-left: 10px;
}
.margin{
	margin-top: 18px;
	font-size: 13px;
}
.left{
	padding: 0 0 0 5px;
	box-sizing: border-box;
}
.bottom{
	margin-left: 10px;
}
.color{
	color: #D3936D;
}
</style>
