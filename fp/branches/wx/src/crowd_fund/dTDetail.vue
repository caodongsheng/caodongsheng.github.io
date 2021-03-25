<template>
	<div class="dTdetail-wrapper">
		<headerBackTitle  headerTitle="发起一起捐"/>
		<div class="dTdetail-container">
			<publish-top :dTDetail="dTDetail">
				<div slot="raiseContainer" class="raiseContainer">
					<p>已募集</p>
					<p class="raiseMoney"><span>1111</span>元</p>
				</div>
			</publish-top>
			<!-- <publish-item></publish-item> -->
			<div class="supportList-container">
				<div class="support-head">
					<p>现有<span>34</span>企业员工参与捐赠</p>
					<a class="supportMore">查看全部</a>
				</div>
				<ul class="support-list">
					<li>
						<img class="logo" src="" alt="">
						<div class="info">
							<p>企业员工参与捐赠企业员工参企业员工参与捐赠企业员工参与捐赠与捐赠</p>
							<p class="block">扶贫区块链 链上地址</p>
						</div>
						<p class="money">捐赠<span>100元</span></p>
						<p class="time">12月30日</p>
					</li>
				</ul>
			</div>
		</div>
		<div class="supportContainer">
			<a class="supportBtn">我要支持</a>
		</div>
	</div>
</template>
<script>
	import headerBackTitle from '@/components/header/headerBackTitle'
	import publishTop from '@/components/donateTogether/publishTop'
	// import publishItem from '@/components/donateTogether/publishItem'
	export default {
		components: {
			publishTop,
			headerBackTitle,
			// publishItem
		},
		data() {
			return {
				dTDetail: ''
			}
		},
		methods: {
			getDtDetail () {
	   		let data={
	        groupDonationId: this.$route.params.id
	      }
        this.$https.post(this.BASE_URL+"grd/groupDonation/detail",
          this.qs.stringify(data),
          {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
          }
        )
        .then(res => {
          this.dTDetail = res.data.data;
          console.log(res.data.data);
        })
        .catch(function(err) {
        	console.log(err);
        })
	   	}
		},
		created() {
			this.getDtDetail()
		}
	}
</script>
<style lang="stylus" scoped>
	@import '../styl/mixin.styl'
	.dTdetail-wrapper
		height 100%
		background $bgF6
		.dTdetail-container
			position absolute
			top 47px
			bottom 87px
			width 100%
			background $bgF6
			overflow-y auto
			.raiseContainer
				df()
				flex-direction column
				margin 16px 20px 15px
				sc(13px,#a3a3a3)
				.raiseMoney
					sc(13px,#a3a3a3)
					span
						sc(16px,#f37306)
			.supportList-container
				background $colorWhite
				.support-head
					df(center,space-between)
					padding 13px 15px
					border-1px(0,0,#e5e5e5)
					@extend .border-1px
					p
						flex 1
						width 0
						margin-right 10px
						tit-nowrap()
					span
						sc(14px,#f37306)
					.supportMore
						width auto
						flex 0 0 auto
						padding-right 13px
						sc(14px,$colorNine)
						bis('../assets/images/arrow_right',10px,12px,right,center)
				.support-list
					padding 15px 15px 0
					li
						padding-bottom 15px
						df(center,space-between)
						border-1px(0,0,#e5e5e5)
						@extend .border-1px
						.logo
							flex 0 0 35px
							wh(35px,35px)
							margin-right 10px
							border-radius 50%
							background red
						.info
							flex 1
							width 0
							margin-right 10px
							// tit-nowrap()
							p
								sc(15px,$colorThree)
								tit-nowrap()
							.block
								padding-left 16px
								sc(13px,#3C78C2)
								bis('../assets/images/block',14px,14px,left,center)
								tit-nowrap()
						.money
							flex 0 0 auto
							width auto
							margin-right 10px
							sc(14px,$colorNine)
							span
								color #f37306
						.time
							flex 0 0 auto
							width auto
							color $colorNine		
		.supportContainer
			position absolute
			bottom 0
			width 100%
			padding 10px 0 30px 0
			text-align center
			background $colorWhite
			.supportBtn
				display inline-block
				wh(70%,47px)
				margin 0 auto
				sc(15px,$colorWhite)
				line-height 47px
				text-align center
				background linear-gradient(-180deg,rgba(253,139,42,1),rgba(255,129,37,1))
				border-radius 24px
				box-shadow 0 6px 38px rgba(255,104,37,0.33)
</style>