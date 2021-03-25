<template>
	<div>
		<div class="publishTitle-wrapper">
			<img class="publist-banner" src="" alt="">
			<img class="publish-logo" src="" alt="">
			<p class="publish-org">由<span>{{type === 'publish' ? 111 :dTDetail.creatorName}}</span>发起</p>
			<p class="publish-title">{{type === 'publish' ? itemTitle : dTDetail.groupdonationTitle}}</p>
			<p class="publish-detail">{{type === 'publish' ? itemDescription :dTDetail.groupdonationDetail}}</p>
			<slot name="timeContainer"></slot>
			<slot name="raiseContainer"></slot>
		</div>
		<div class="itemContent-wrapper">
			<div class="itemContent-container">
				<div class="itemTop">
					<img :src="details.acr065" alt="">
					<div class="itemInfo">
						<p class="title">{{details.title}}</p>
						<p class="detail">{{details.acr013}}</p>
						<p class="org">善款接收：{{details.afa116?details.afa116:'中国扶贫基金会'}}</p>
					</div>
				</div>
				<div class="item-block">扶贫区块链 链上地址</div>
				<dTProgress :proge="details.progressNum" />
				<div class="raiseMoney">
					<p>目标<span>{{planMoney}}</span>{{details.planMoney>1000000?'万元':'元'}}</p>
					<p>已筹<span>{{alreadyMoney}}</span>{{details.alreadyMoney>1000000?'万元':'元'}}</p>
					<p>剩余<span>2454</span>天</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import dTProgress from '@/crowd_fund/Progress'
	export default {
		components: {
			dTProgress
		},
		props: ['dTDetail','type'],
		data() {
			return {
				acr001: this.$route.params.acr001,
				itemTitle: this.G("itemTitle"),
				itemDescription: this.G("itemDescription"),
				details: ''
			}
		},
		computed:{
			alreadyMoney() {
				if(this.details.alreadyMoney>=1000000){
					return this.details.alreadyMoney/10000
				}else{
					return this.details.alreadyMoney
				}
			},
			planMoney() {
				if(this.details.planMoney>=1000000){
					return this.details.planMoney/10000
				}else{
					return this.details.planMoney
				}
			}
		},
		methods: {
			getDetail () {
	   		let data={
	        acr001: this.acr001
	      }
        this.$https.post(this.BASE_URL+"cfs/zc/project/getLoadxmxx",
          data,
        )
        .then(res => {
          this.details = res.data.data;
          console.log(res.data.data);
        })
        .catch(function(err) {
        	console.log(err);
        })
	   	}
		},
		created() {
			this.getDetail()
		}
	}
</script>
<style lang="stylus" scoped>
	@import '../../styl/mixin.styl'
	$gray = #a3a3a3
	$orange = #f37306
	.commonPadding
		padding 0 20px
		tit-nowrap()
	.publishTitle-wrapper
		df()
		flex-direction column
		text-align center
		background $colorWhite
		.publist-banner
			height 123px
			background red
		.publish-logo
			wh(49px,49px)
			margin -25px auto 12px
			background green
			border-radius 50%
		.publish-org
			sc(13px,$gray)
			@extend .commonPadding
			span
				color $orange
		.publish-title
			@extend .commonPadding
			margin 27px 0 12px
			sc(15px,$colorThree)
		.publish-detail
			@extend .commonPadding
			sc(13px,$gray)
	.itemContent-wrapper
		padding 16px
		background $bgF6
		.itemContent-container
			padding 10px 10px 13px
			background $colorWhite 
		.itemTop
			df(center)
			img
				flex 0 0 98px
				margin-right 8px
				wh(98px,75px)
				object-fit cover
			.itemInfo
				flex 1
				width 0
				sc(13px,$colorNine)
				.title
					margin 0 0 10px
					tit-nowrap()
					sc(15px,$colorThree)
				.detail
					margin 0 0 10px
					tit-nowrap()
		.item-block
			margin 15px 0
			padding-left 17px
			sc(14px,$colorBlock)
			bis('../../assets/images/block',15px,15px,left,center)
		.raiseMoney
			df(center,space-between)
			margin-top 13px
			sc(13px,#666)
			span
				sc(12px,#d18d64)
</style>