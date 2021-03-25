<template>

	<div class="scroll">
		<div class="">
		<div class="fixed">
			<headerBackTitle :headerTitle='details.title' :vos="shareInfo"></headerBackTitle>
		</div>
			<div class="bigda">
				<div class="titleimg">
					<img :src="details.acr065" alt="">
					<i><img src="../assets/images/status.png" height="60" width="114" alt=""></i>
				</div>
			<h3 class="banner_title">慈善募捐 | {{details.title}} | 中国社会扶贫网</h3>
			<div class="chain_title" @click="goQKL(details.blcurl)">
				<span>扶贫区块链   </span>
				<a href="javascript:;">链上地址</a>
			</div>
			<div class="xmxq_range">
			    <Progress :proge='details.progressNum'></Progress>
			 </div>
			 <div class="clear"></div>
			<div class="total_money">
				<flexbox style="margin-top: 8px">
				    <flexbox-item>
				      <div class="rank-item">
				        <em class="color-orange  dis-block f-14 f-bold">{{toThousands(details.planMoney)}}</em>
				        <span class="f-11 color-999 dis-block">目标金额/元</span>
				      </div>
				    </flexbox-item>
				    <flexbox-item>
				      <div class="rank-item">
				        <em class="color-orange  dis-block f-14 f-bold">{{toThousands(details.alreadyMoney)}}</em>
				        <span class="f-11 color-999 dis-block">已募集/元</span>
				      </div>
				    </flexbox-item>
				    <flexbox-item>
				      <div class="rank-item">
				        <em class="color-orange  dis-block f-14 f-bold">{{details.personNum}}</em>
				        <span class="f-11 color-999 dis-block">支持次数/次</span>
				      </div>
				    </flexbox-item>
				</flexbox>
			</div>
			<span class="border_c"></span>
		  	<ul class="xqul">
		    	<li>
		      		<i></i>
		      		<p>发起机构：</p>
		      		<a href="javascript:;" class="active">国务院扶贫开发领导小组办公室</a>
		    	</li>
		    	<li>
		      		<i class="display"></i>
		      		<p></p>
		      		<a href="javascript:;" class="active margin">{{acr001==5001?'中华人民共和国教育部':'国家卫生健康委员会'}}</a>
				</li>
				<li>
				      <i></i>
				      <p>善款接收：</p>
				      <a href="javascript:;" @click="goOrg(details.acr025)">{{details.afa116?details.afa116:'中国扶贫基金会'}}</a>
				</li>
				<li @click='bangfuishow'>
				      <i></i>
				      <p>帮扶对象：</p>
				      <a href="javascript:;">{{details.acr034}}</a>
				      <img src="../assets/images/wenhao.png" height="15" width="15" alt="">
				</li>
				<li>
				      <i></i>
				      <p>上线时间：</p>
				      <a href="javascript:;" class="active">{{details.aar020}}-{{details.aar021}}</a>
				</li>
		  	</ul>
		  	<span class="border_c"></span>
		  	<!-- vux组件 -->
		  	<tab v-model="index" bar-active-color="#FF6A00" active-color="#FF6A00">
		  		<!-- <tab-item  v-for="(item, index) in list2" :key="index" :badge-label="index==0?'':'2'">{{item}}</tab-item> -->
		  		<tab-item>项目详情</tab-item>
		  		<tab-item  :badge-label="String(infototal)" badge-background='#f6f6f6' badge-color="#fd8b2a">项目进展</tab-item>
		  		<tab-item  :badge-label="String(supporlisttotal>100?'99+':supporlisttotal)" badge-background='#f6f6f6' badge-color="#fd8b2a">支持动态</tab-item>
	  		</tab>
		  	<div class="tab-contain">
			    <div v-if="index === 0" class="imgwidthbaixinyu">
			    	<h4 class="zcjian">慈善组织公开募捐编号</h4>
			    	<p class="jred">{{ details.collectingNum }}</p>
			    	<h4 class="zcjian">项目简介</h4>
			    	<p class="jred color1">{{ details.acr013 }}</p>
			    	<h4>项目说明</h4>
			    	<p v-html="details.arc066?details.arc066:'暂无数据'"></p>
			    </div>
			    <div v-if="index === 1" class="padding">
			      <div v-for="(item,index) in infoquery" v-if="infototal !== 0" class="jinzhanmargin">
			      	<h4>{{ item.title }}</h4>
			      	<p class="color">{{ item.afr013 }}由项目工作人员发布</p>
			      	<p class="jinzhanp">{{ item.acr063 }}</p>
			      	<p class="jinzhanimgwidth">
				      	<img :src="t" alt="" v-for="t in getImgList(item.imageurl)">
				      	<div class="clear"></div>
			      	</p>
			      </div>
			      <div v-if="infototal == 0" class="nomatch">
			      	暂无项目进展
			      </div>
			    </div>
			    <div v-if="index === 2" class="ss" :style="contentStyleObj">

			    <scroller
			        v-if='supporlist.length !== 0'
			        :on-refresh="refresh"
			        :on-infinite="infinite"
			        refresh-layer-color="#4b8bf4"
			        loading-layer-color="#ec4949">
			        <svg class="spinner" style="stroke: #4b8bf4;" slot="refresh-spinner" viewBox="0 0 64 64">
			          <g stroke-width="7" stroke-linecap="round">
			            <line x1="10" x2="10" y1="27.3836" y2="36.4931">
			              <animate attributeName="y1" dur="750ms" values="16;18;28;18;16;16" repeatCount="indefinite"></animate>
			              <animate attributeName="y2" dur="750ms" values="48;46;36;44;48;48" repeatCount="indefinite"></animate>
			              <animate attributeName="stroke-opacity" dur="750ms" values="1;.4;.5;.8;1;1" repeatCount="indefinite"></animate>
			            </line>
			            <line x1="24" x2="24" y1="18.6164" y2="45.3836">
			              <animate attributeName="y1" dur="750ms" values="16;16;18;28;18;16" repeatCount="indefinite"></animate>
			              <animate attributeName="y2" dur="750ms" values="48;48;46;36;44;48" repeatCount="indefinite"></animate>
			              <animate attributeName="stroke-opacity" dur="750ms" values="1;1;.4;.5;.8;1" repeatCount="indefinite"></animate>
			            </line>
			            <line x1="38" x2="38" y1="16.1233" y2="47.8767">
			              <animate attributeName="y1" dur="750ms" values="18;16;16;18;28;18" repeatCount="indefinite"></animate>
			              <animate attributeName="y2" dur="750ms" values="44;48;48;46;36;44" repeatCount="indefinite"></animate>
			              <animate attributeName="stroke-opacity" dur="750ms" values=".8;1;1;.4;.5;.8" repeatCount="indefinite"></animate>
			            </line>
			            <line x1="52" x2="52" y1="16" y2="48"><animate attributeName="y1" dur="750ms" values="28;18;16;16;18;28" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="36;44;48;48;46;36" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values=".5;.8;1;1;.4;.5" repeatCount="indefinite"></animate></line></g></svg>
			        <slot>
			          <zcHelprecord :supporlist="supporlist" @childbyvalue="childbyvalue" :sjmon="sjmon"></zcHelprecord>
			        </slot>
			        <svg class="spinner" style="fill: #ec4949;" slot="infinite-spinner" viewBox="0 0 64 64">
			          <g><circle cx="16" cy="32" stroke-width="0" r="3"><animate attributeName="fill-opacity" dur="750ms" values=".5;.6;.8;1;.8;.6;.5;.5" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="3;3;4;5;6;5;4;3" repeatCount="indefinite"></animate></circle><circle cx="32" cy="32" stroke-width="0" r="3.09351"><animate attributeName="fill-opacity" dur="750ms" values=".5;.5;.6;.8;1;.8;.6;.5" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="4;3;3;4;5;6;5;4" repeatCount="indefinite"></animate></circle><circle cx="48" cy="32" stroke-width="0" r="4.09351"><animate attributeName="fill-opacity" dur="750ms" values=".6;.5;.5;.6;.8;1;.8;.6" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="5;4;3;3;4;5;6;5" repeatCount="indefinite"></animate></circle></g></svg>
			      </scroller>
			      <div v-if="supporlist.length == 0" class="nomatch">
			        没有更多支持者
			      </div>
			    </div>
			 </div>
			 <zcfooter :acr001="acr001" :sum='details.acr014' :acr002="details.title" :zcuserid='zcuserid' :zctoken='zctoken' :zcnickname="zcnickname"></zcfooter>
			</div>
		</div>

		<div class="bjall" v-show='bangfu'>
			<div>
				<a href="javascript:;" @click="bangfuishow"></a>
				<p>{{details.acr034}}</p>
			</div>
		</div>

	</div>
</template>

<script>
import { Range, Flexbox,Tab, TabItem } from 'vux'
import open from '@/assets/js/openWin'
import headerBackTitle from '@/components/header/headerBackTitleShare'
import Progress from '@/crowd_fund/Progress'
import zcHelprecord from '@/crowd_fund/zcHelprecord'
import zcfooter from '@/crowd_fund/zcfooter'
const list = () => ['项目详情', '项目进展', '爱心反馈']
  export default {
  	components:{
  		headerBackTitle,
  		Range,
  		Flexbox,
  		Tab,
  		TabItem,
  		Progress,
  		zcHelprecord,
  		zcfooter
  	},
    data () {
      return {
      	list2:list(),
      	index:0,
      	proge:2,
      	acr001:this.$route.params.id,
      	details:'',
      	infoquery:[],
      	supporlist:[],
      	sortIndex:0,
      	sjmon:1,
      	infototal:'',
      	supporlisttotal:'',
      	zcuserid:'',
      	zctoken:'',
      	zcnickname:'',
		histroy:false,
		bangfu:false,
		shareInfo:{},     //app分享信息
		contentStyleObj:{
			height:''
		}
    // window.share.getShareDetailView(shareInfo);

      }
   },
   methods:{
   	getHeight(){
      	this.contentStyleObj.height=window.innerHeight-90+'px';
    },
   	bangfuishow() {
   		if(this.bangfu == false){
   			this.bangfu = true
   		}else{
   			this.bangfu = false
   		}
   	},
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
			console.log(this.QKL_URL+data)
			if(this.isios()){
				window.native.appLoadUrl(this.QKL_URL+data);
				}
				else{
					location.href = this.QKL_URL+data;
				}
		}
   	},
	getImgList(strImg){

		 let a=strImg.split(',')
		 console.log('*****************',a)
		 return a
	},
	goOrg(org_user_id){
		this.$router.push('/zcorganDetails/'+org_user_id)
	},
   	childbyvalue (value) {
   		this.sjmon = value;
   		this.sortIndex = 0;
   		this.getsuuporlist();
   	},
   	refresh (done) {
   		this.sortIndex = 0
 		this.getsuuporlist(done);
   	},
 	infinite (done) {
 		this.sortIndex++
 		this.getsuuporlist(done);
 	},
   	getDetail () {
   		let data={
               acr001: this.acr001
           }
           this.$https.post(this.BASE_URL+"cfs/zc/project/getLoadxmxx",
                data,
            )
           .then(res => {
               this.details = res.data.data;
			   this.shareInfo = {
		   			title :  this.details.title|| '中国社会扶贫网',
		   			desc: this.details.acr013,
		   			link : this.WinXinHost + '#' + location.href.split('#')[1],
		   			imgUrl: this.details.acr065
		   		};
               console.log(res.data.data);
           })
           .catch(function(err) {
               console.log(err);
           })
   	},
   	getProScheInfoQuery () {
   		let data={
               acr001: this.acr001
           }
           this.$https.post(this.BASE_URL+"cfs/ajaxpagequery/zc/z005/proScheInfoQuery",
                this.qs.stringify(data),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                }
            )
           .then(res => {
               this.infoquery = res.data.result.pageresult.data;
               this.infototal = res.data.result.pageresult.total;
           })
           .catch(function(err) {
               console.log(err);
           })
   	},

   	getsuuporlist (done,has) {
      let data={
               acr001: this.acr001,
               pageIndex:this.sortIndex,
               pageSize:8,
               sjmon:this.sjmon
           }
           this.$https.post(this.BASE_URL+"cfs/ajaxpagequery/zc/z005/supportlist",
                this.qs.stringify(data),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                }
            )
           .then(res => {
	           	if(this.sortIndex == 0){
	           		this.supporlist = res.data.result.pageresult.data
	           		this.supporlisttotal = res.data.result.pageresult.total
	           	}else{
	           		for(let i=0;i<res.data.result.pageresult.data.length;i++){
	               		this.supporlist.push(res.data.result.pageresult.data[i])
	               	}
	           	}
	           	if(!res.data.result.pageresult.data.length){
	           		return
	           	}
	           	if(done){
               		done()
               	}
           })
           .catch(function(err) {
               console.log(err);
           })
    }
   },
   mounted (){
   	this.getHeight()
		if(this.$route.query.histroy){
			this.histroy=true
		}
   		this.zcuserid = this.$route.params.zcuserid
   		this.zctoken = this.$route.params.zctoken
   		this.zcnickname = decodeURIComponent(this.$route.params.zcnickname)
   		this.getProScheInfoQuery();
   		this.getDetail();
   		this.getsuuporlist();

   		console.log(window.location.href,'这是当前地址啊啊啊啊啊啊啊啊啊啊啊啊',this.$route.query)
   		console.log(this.$route.params.id,this.$route.params.zcuserid,this.$route.params.zcnickname,this.$route.params.zctoken,'这是打印的信息啊啊啊啊啊啊啊啊');
   },
   watch :{

   }
 }
</script>

<style scoped>
.jred{
	color: #F01313;
}
.bjall{
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,0.5);
	position: fixed;
	top: 0;
	left: 0;
	z-index: 9999999;
}
.bjall div{
	width: 80%;
	height: 40%;
	background: #fff;
	margin-top: 40%;
	margin-left: 10%;
	border-radius: 15px;
	position: relative;
	padding: 20px;
    box-sizing: border-box;
}
.bjall div a{
	width: 30px;
	height: 30px;
	background-image: url('../assets/images/t_mask.png');
	background-size: 30px;
	position: absolute;
	top: -30px;
	right: -8px;
}
.bjall div p{
	margin-top: 15px;
	margin-left: 15px;
}
.padding{
	padding-bottom: 60px;
}
.nomatch{
	text-align: center;
	margin: 20px 0;
}
.bigda{
	margin-top: 47px;
	-webkit-overflow-scrolling: touch;
}
.fixed{
	position: absolute;
	top: 0;left: 0;
	overflow: auto;
	width: 100%;
	z-index: 9999;
}
.ss{
    position: relative;
    overflow: hidden;
    box-sizing:border-box;
    height: 400px;
}
.scroll{
	overflow: auto;
	width: 100%;
	height: 100%;
}
.titleimg{
	width: 100%;
	height: 200px;
	position: relative;
}
.titleimg>img{
	width: 100%;
	height: 200px;
}
.titleimg>i {
	height: 26px;
    width: 51px;
	position: absolute;
	top: 30px;
	right: 0;
}
.titleimg>i>img{
	width: 100%;
	height: 100%;
}
.banner_title{
	width: 100%;
	font-size: 14px;
	padding: 0 10px;
	margin: 7px 0 8px 0;
	box-sizing: border-box;
}
.chain_title{
	padding-left: 10px;
	background: url('../assets/images/qkl_icon.png') no-repeat 10px center;
	background-size:20px 20px;
	/*height: 82px;*/
}
.chain_title span{
	font-size: 15px;
	color: #417CC3;
	margin-left: 25px;
}
.chain_title a{
	font-size: 15px;
	color: #417CC3;
}
.xmxq_range{
	margin-top: 12px;
	padding: 0 6px;
}
.rank-item span{
	font-size: 26px
}
.rank-item{
	padding-left: 10px;
}
.rank-item:after{
	border-right: none;
}
.total_money{
	padding-left: 11px;
}
.border_c{
	width: 100%;
	height: 15px;
	background:#F6F6F6;
	display: inline-block;
}

  .xqul{padding: 0px; margin: 0px;text-decoration: none;}
  .xqul li {
    padding: 0px;
    margin: 0px;
    text-decoration: none;
    border-bottom: none;
    list-style: none;
    width: 90%;
    margin: 0 auto;
    padding: 0;
    line-height: 2em;
  }
  .xqul li:last-child{
  	margin-bottom: 20px;
  }
  .xqul li:first-child{
  	margin-top: 20px;
  }
.xqul li p {
  background-size: 21.2%;
  color: #333333;
  /*float: left;*/
  display: inline;
  width: 20%;
}
.xqul li i {
  width: 10px;
  height: 10px;
  display: inline-block;
  background:#666666;
  border-radius: 50%;
}
.xqul li i.display{
	display: none;
}
.xqul li a{
  /*padding-left: 10px;*/
  color: #32b4ff;
  text-decoration: underline;
  }
  .xqul li a.active{
  	color: #747474;
  	text-decoration: none;
  }
  .xqul li a.margin{
  	margin-left: 87px;
  }
  .vux-tab .vux-tab-item.vux-tab-selected{
  	/*color: #F37306!important;*/
  }
  .tab-bar-active-color{
  	color: #F37306;
  }
  .tab-contain{
  	padding: 0 11px;
  	width: 100%;
  	box-sizing: border-box;
  }
  .imgwidthbaixinyu{
  	padding-bottom: 100px;
  }
  .color{
  	color: #666;
  	margin: 6px 0;
  }
  .zcjian{
  	margin-top: 6px;
  }
  .jinzhanimgwidth{
  	width: 100%;
  	display: block;
  }
   .jinzhanimgwidth img{
  	width: 30%;
  	height: 100px;
  	float: left;
  	margin-right: 3%;
  	margin-top: 3%;
  }
  .jinzhanmargin{
  	margin-top: 30px;
  }
  .jinzhanp{
  	color: #666;
  	margin-bottom: 10px;
  }
</style>


<style>
	.imgwidthbaixinyu img{
		width: 100% !important;
	}
	.imgwidthbaixinyu p{
		width: 100% !important;
		overflow: hidden;
	}
</style>
