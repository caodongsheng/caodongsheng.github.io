<template>
	<div class="itemContent-wrapper">
		<div class="itemContent-container">
			<div class="itemTop">
				<img src="" alt="">
				<div class="itemInfo">
					<p class="title">教育助学项目</p>
					<p class="detail">关爱失学的空间考虑的是健康减肥洛杉矶附近</p>
					<p class="org">善款接收：中国二次或</p>
				</div>
			</div>
			<div class="item-block">扶贫区块链 链上地址</div>
			<dTProgress :proge="80" />
			<div class="raiseMoney">
				<p>目标<span>2454</span>元</p>
				<p>已筹<span>2454</span>元</p>
				<p>剩余<span>2454</span>天</p>
			</div>
		</div>
	</div>
</template>
<script>
	import dTProgress from '@/crowd_fund/Progress'
	export default {
		components: {
			dTProgress
		}
	}
</script>
<style lang="stylus" scoped>
	@import '../../styl/mixin.styl'
	.itemContent-wrapper
		padding 16px
		background $bgF6
		.itemContent-container
			padding 10px 10px 13px
			background $colorWhite 
		.itemTop
			df(center)
			img
				flex 0 0 20%
				margin-right 8px
				width 20%
				height auto
			.itemInfo
				flex 1
				width 0
				sc(13px,$colorNine)
				.title
					margin 0 0 13px
					tit-nowrap()
					sc(15px,$colorThree)
				.detail
					margin 0 0 12px
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