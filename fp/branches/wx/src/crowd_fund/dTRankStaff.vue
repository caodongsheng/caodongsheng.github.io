<template>
	<div class="rankStaff-wrapper">
		<headerBackTitleShare  headerTitle="一起捐排行榜"/>
		<div class="rankStaff-container">
			<div class="donateName"><span>阿里巴巴集团11111111</span></div>
			<div class="rankType-container">
				<div class="rankType">
					<span>11</span>
					<span>122</span>
				</div>
			</div>
			<rank-list>
				<span slot="sortStaff" class="sortStaff">1</span>
				<p slot="listBlock" class="listBlock">扶贫区块链</p>
			</rank-list>
		</div>
	</div>
</template>
<script>
	import rankList from '@/components/donateTogether/rankList'
	import headerBackTitleShare from '@/components/header/headerBackTitleShare'
	export default {
		data() {
			return {
				rankType: [{id: 1, name: '按时间'}, {id: 2, name: '按金额'}]
			}
		},
		components: {
			rankList,
			headerBackTitleShare
		}
	}
</script>
<style lang="stylus" scoped>
	@import '../styl/mixin'
	.rankStaff-container
		.donateName
			wh(100%,66px)
			df(center,center)
			margin 6px auto 0
			// padding 0 40px
			text-align center
			line-height 66px
			box-sizing border-box
			span
				max-width 80%
				display inline-block
				position relative
				padding 0 50px
				margin 0 auto
				sc(16px,#F37306)
				tit-nowrap()
				box-sizing border-box
				&:before
					position absolute
					content ''
					width 40px
					margin-left -50px
					height 100%
					bis('../assets/images/leftStaff')
					background-size 40px 100%
				// &:after
				// 	position absolute
				// 	content ''
				// 	width 40px
				// 	margin-left 10px
				// 	height 100%
				bis('../assets/images/rightStaff')
				background-size 40px 100%
				background-position right
		.rankType-container
			margin 12px 0 5px
			.rankType
				df(center,center)
				width 42.6666%
				margin 0 auto
				bis('../assets/images/rankType')
				// border-radius 5px
				span
					width 50%
					font-size 14px
					text-align center
					&:first-child
						height 29px
						line-height 29px
						color #999
					&:last-child
						height 28px
						line-height 29px
						color #fff
		.sortStaff
			display inline-block
			margin-right 15px
			sc(13px,#333)
</style>