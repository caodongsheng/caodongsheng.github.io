<template>
	<div class="scroll">
		<div class="scroll">
		<div class="fixed">
			<headerBackTitle headerTitle='项目列表'></headerBackTitle>
		</div>
		<div class="bigda">
			<!-- <div class="allList" v-for="(item,index) in zcdata">
				<compentList :zcdata="item" :zcuserid="zcuserid" :zctoken='zctoken'></compentList>
				<span class="lian" @click.stop="goQKL(item.blcurl)">
					<span>扶贫区块链</span>
					<a href="javascript:;">链上地址</a>
				</span>
			</div> -->

			<div class="allList"  v-for="(item,index) in zcdata">
				<conpentListnew :zcdata="item" ></conpentListnew>
			</div>
		</div>

		</div>
	</div>
</template>

<script>
	import compentList from '@/crowd_fund/compentList'
	import conpentListnew from '@/crowd_fund/compentListnew'
	import headerBackTitle from '@/components/header/headerBackTitle'
	export default {
		components:{
			compentList,
			conpentListnew,
			headerBackTitle

		},
		data () {
			return {
				zcdata : '',
				zcuserid:'',
				zctoken:'',
				code:'',
				zcnickname:''
			}
		},
		methods:{
			zcList () {
	           let data={
	              	acr010: "",
					acr012: "",
					pageIndex: 0,
					pageSize: 4,
					xmpx: 1
	           }
	           this.$https.post(this.BASE_URL+"cfs/zc/project/getfpzhongchouList",data)
	           .then(res => {
	               this.zcdata = res.data.data.data;
	               console.log(res.data.data.data);
	           })
	           .catch(function(err) {
	               console.log(err);
	           })
	       }
		},
		mounted() {
			// this.zcuserid = localStorage.getItem('zcuserid');
		},
		created() {
			this.zcList();
			// if(this.isWeixinCient()){
			// 	this.code = this.getUrlParamURLysas('code');
			// 	if(!localStorage.getItem('zcopenid') || localStorage.getItem('zcopenid') == undefined){
			// 		// this.wxchat();
			// 	}else{
			// 		this.zcuserid = localStorage.getItem('zcuserid');
			// 		this.zcnickname = localStorage.getItem('zcnickname');
			// 		this.zctoken = null
			// 	}
			// 	console.log(this.zcuserid,'useriduseriduserid')
			// }else{
			// 	this.zcnickname = this.$route.params.zcnickname
			// 	this.zcuserid = this.$route.params.zcuserid;
			// 	this.zctoken = this.$route.params.zctoken;
			// }

			
		},
		watch :{

		}
	}
</script>

<style scoped>
.bigda{
	margin-top: 60px;
	padding-bottom: 40px;
}
.fixed{
	position: absolute;
	top: 0;left: 0;
	overflow: auto;
	width: 100%;
	z-index: 9999;
}
.scroll{
	width: 100%;
	height: 100%;
	overflow:auto;
	-webkit-overflow-scrolling: touch;
}
.allList{
	box-sizing: border-box;

}
.lian{
	width: 100%;
	box-sizing: border-box;
	padding-left:11px;
	line-height: 0;
	background: url('../assets/images/qkl_icon.png') no-repeat 10px center;
	background-size:20px 20px;
}
.lian img{
	/*width: 20px;
	height: 20px;
	margin-top: 3px;*/

}
.lian span{
	margin-left: 25px;
	color: #417CC3;
}
.lian a{
	margin-left: ;
	color: #417CC3;
}
</style>
