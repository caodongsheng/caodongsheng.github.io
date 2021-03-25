<template>
	<div class="rankCompany-wrapper">
		<headerBackTitleShare  headerTitle="一起捐企业排行榜"/>
		<div class="rankCompany-container">
			<div class="rankTop-container">
				<div class="rankTop-list">
					<div class="rankTwo rankCommon">
						<img src="" alt="">
						<p class="name">中国移动111111</p>
						<p class="money">1560元</p>
						<p class="count">携手3256次</p>
					</div>
					<div class="rankOne rankCommon">
						<img src="" alt="">
						<p class="name">中国移动1111</p>
						<p class="money">1560元</p>
						<p class="count">携手3256次</p>
					</div>
					<div class="rankThree rankCommon">
						<img src="" alt="">
						<p class="name">中国移动11111</p>
						<p class="money">1560元</p>
						<p class="count">携手3256次</p>
					</div>
				</div>
			</div>
			<rank-list rankType="company">
				<span slot="sortCompany" class="sortCompany">4</span>
			</rank-list>
		</div>
	</div>
</template>
<script>
	import rankList from '@/components/donateTogether/rankList'
	import headerBackTitleShare from '@/components/header/headerBackTitleShare'
	export default {
		components: {
			rankList,
			headerBackTitleShare
		},
		data() {
			return {
			}
		},
		methods: {
			getRankCompany() {
				let data={
	        groupdonationId: ''
	      }
        this.$https.post(this.BASE_URL+"grd/groupDonation/listOfUserByGroupDonationID",
          data,
        )
        .then(res => {
          // this.details = res.data.data;
          // console.log(res.data.data);
        })
        .catch(function(err) {
        	console.log(err);
        })
			}
		}
	}
</script>
<style lang="stylus" scoped>
	@import '../styl/mixin'
	.sortCompany
		display inline-block
		margin-right 15px
		sc(13px,#333)
	.rankCompany-container
		.rankTop-container
			padding 43px 17px 20px
			bis('../assets/images/rankCompany')
			.rankTop-list
				df(flex-end)
				padding 0 0 19px 0
				font-size 0
				bis('../assets/images/rankbg')
				.rankCommon
					box-sizing border-box
					padding 0 10px
					text-align center
					font-size 0
					img
						display inline-block
						position relative
						border-radius 50%
					.name
						sc(14px,$colorThree)
						text-align center
						tit-nowrap()
					.money
						sc(15px,#f37306)
						text-align center
						tit-nowrap()
					.count
						sc(13px,$colorNine)
						text-align center
						tit-nowrap()
				.rankOne
					width 40%
					padding-top 22px
					font-size 0
					img
						wh(55px,55px)
						margin-bottom 30px
						border 2px solid #FEB005
						&:before
							position absolute
							wh(20px,15px)
							left 18px
							top -15px
							bis('../assets/images/rankOne')
							content ''
				.rankTwo
					width 30%
					img
						wh(45px,45px)
						margin-bottom 23px
						border 2px solid #E1E1E1
						&:before
							position absolute
							wh(15px,12px)
							left 14px
							top -12px
							bis('../assets/images/rankTwo')
							content ''
				.rankThree
					width 30%
					img
						wh(45px,45px)
						margin-bottom 23px
						border 2px solid #D4AD87
						&:before
							position absolute
							wh(15px,12px)
							left 14px
							top -12px
							bis('../assets/images/rankThree')
							content ''
</style>