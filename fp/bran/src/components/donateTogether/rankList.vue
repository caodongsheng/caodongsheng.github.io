<template>
	<div class="rankList-wrapper">
		<ul class="rankList-container">
			<li class="border-1px">
				<slot name="sortStaff"></slot>
				<slot name="sortCompany"></slot>
				<img class="touxiang" src="" alt="">
				<div class="listMiddle">
					<p>阿里巴巴集团阿里巴巴集团阿里巴巴集团阿里巴巴集团阿里巴巴集团</p>
					<slot name="listBlock"></slot>
				</div>
				<div class="listRight">
					<p class="rightMoney">836元</p>
					<p class="rightTime">11</p>
				</div>
			</li>
		</ul>
	</div>
</template>
<script>
	export default {
		props: ['rankType','list'],
		data() {
			return {

			}
		}
	}
</script>
<style lang="stylus" scoped>
	@import '../../styl/mixin.styl'
	.rankList-wrapper
		.rankList-container
			li
				df(center)
				padding 3px 28px 6px 20px
				border-1px(20px,28px,#e5e5e5)
				.touxiang
					flex 0 0 auto
					wh(35px,35px)
					margin-right 13px
					border-radius 50%
					background red
				.listMiddle
					df(center)
					flex 1
					p
						flex 1
						width 0
						margin-right 10px
						tit-nowrap()
						sc(14px,$colorThree)
					.listBlock
						width auto
						flex 0 0 auto
						sc(13px,#32b4ff)
				.listRight
					flex 0 0 auto
					margin-top 18px
					text-align right
					.rightMoney
						sc(15px,#f37306)
					.rightTime
						sc(13px,$colorNine)
</style>