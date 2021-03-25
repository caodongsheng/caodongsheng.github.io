<template>
	<div>
		<div class="list" @click="goDetail">
			<p class="imgtitle">
				<img :src="zcdata.acr065?zcdata.acr065:imgUrl" alt="">
			</p>
			<p class="titlefont">{{zcdata.title}}</p>
			<span class="lian" @click.stop="goQKL(zcdata.blcurl)">
				<span>扶贫区块链</span>
				<a href="javascript:;">链上地址</a>
			</span>
			<div class="progress">
				<Progress :proge='zcdata.progressnum'></Progress>
			</div>
			<div class="total_money">
				<flexbox style="margin-top: 13px">
				    <flexbox-item>
				      <div class="rank-item">
				      	<span class="f-16 color-999 dis-block color text-left">目标金额/元</span>
				        <em class="  dis-block f-12 f-bold moneyc  text-left">{{toThousands(zcdata.planmoney)}}</em>
				      </div>
				    </flexbox-item>
				    <flexbox-item>
				      <div class="rank-item">
				      	<span class="f-16 color-999 dis-block color text-center">已募集/元</span>
				        <em class="dis-block f-12 f-bold moneyc text-center">{{toThousands(zcdata.alreadymoney)}}</em>
				      </div>
				    </flexbox-item>
				    <flexbox-item>
				      <div class="rank-item">
				      	<span class="f-16 color-999 dis-block color text-right">支持次数/次</span>
				        <em class="  dis-block f-12 f-bold moneyc text-right">{{ zcdata.personnum }}</em>
				      </div>
				    </flexbox-item>
				</flexbox>
			</div>
		</div>
		
		<span class="border dis-block"></span>
	</div>
</template>

<script>
import open from '@/assets/js/openWin'
import Progress from '@/crowd_fund/Progress'
import { Flexbox, TabItem } from 'vux'
export default {
	components: { Progress,Flexbox,TabItem},
	props:['zcdata'],
	data () {
		return {
			imgUrl:require('../assets/images/gongzhang.png')
		}
	},
	methods :{
		toThousands(nStr) {
		     nStr += '';
		     let x = nStr.split('.');
		     let x1 = x[0];
		     let x2 = x.length > 1 ? '.' + x[1] : '';
		     var rgx = /(\d+)(\d{3})/;
		     while (rgx.test(x1)) {
		     x1 = x1.replace(rgx, '$1' + ',' + '$2');
		     }
		     return x1 + x2;
		     },
		     replaceStr:function(content){
		        var reg = /习近平班底|中国末代接班群第六代|江泽民|茉莉花革命|习近平|操纵十八大|毛泽东|中共九十年功罪|政权保卫战|枪|法轮功|赖昌星|邓小平|信用卡套现|轻松筹|水滴筹|腾讯公益|爱心筹|骗子|水滴互助|小姐|卖淫/g;
		        var showC = content.replace(reg,function( $reg ){
		            var r = '';
		            for ( var i=0;i<$reg.length;i++ )
		            {
		                r += '*';
		            }
		            return r;
		        })
		        return showC;
		},
		goQKL (data) {
			if(this.isWeixinCient()){
				window.location.href=this.QKL_URL+data
			}else{
				if(this.isios()){
				window.native.appLoadUrl(this.QKL_URL+data);
				}
				else{
					location.href = this.QKL_URL+data;
				}
			}
		},
		goDetail () {
			if(this.zcdata.crowdId){
				this.$router.push('/zcprojectDetail/'+this.zcdata.crowdId)
			}else{
				this.$router.push('/zcprojectDetail/'+this.zcdata.crowdid);
			}
		}
	},
	mounted () {
		console.log(this.zcdata)
	}
}
</script>

<style scoped>
.list{
	width: 100%;
	padding:  0 4%;
	box-sizing: border-box;
}
.imgtitle{
	width: 100%;
	margin-top: 15px;
}
.imgtitle img{
	width: 100%;
	height: 200px;
}
.titlefont{
	font-size: 18px;
	margin-bottom: 3px;
}
.lian{
	width: 100%;
	box-sizing: border-box;
	line-height: 0;
	background: url('../assets/images/qkl_icon.png') no-repeat 0px center;
	background-size:20px 20px;
	font-size: 14px;
}
.lian span{
	margin-left: 25px;
	color: #417CC3;
}
.lian a{
	color: #417CC3;
}
.progress{
	width: 100%;
	margin-top: 10px;
}
.rank-item:after{
	border-right: none;
}
.moneyc{
	color: ##0F0F0F;
}
.color{
	color: #686868;
}
.border{
	width: 100%;
	height: 20px;
	background: #F1F1F1;
}
.total_money{
	margin-bottom: 8px;
}
</style>