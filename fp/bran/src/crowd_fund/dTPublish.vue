<template>
	<div class="publish-wrapper">
		<headerBackTitle  headerTitle="发起一起捐"/>
		<div class="publish-container">
			<publish-top type="publish">
				<div slot="timeContainer" class="timeContainer">
					<span>2018/05/08截止</span>
				</div>
			</publish-top>
			<!-- <publish-item></publish-item> -->
		</div>
		<div class="publish-bottom">
			<a @click="backEdit">返回编辑</a>
			<a @click="finishPublish">完成发起</a>
		</div>
		<!-- 完成发起的弹框 -->
		<div v-if="publishSuccess" class="success-container">
			<div class="successAlert">
				<div class="successIcon"></div>
				<div class="closeAlert">
					<a @click="clsoeAlert"></a>
				</div>
				<p class="successTitle">恭喜</p>
				<p class="successDetail">您的一起捐项目已经创建成功</p>
				<p class="successDetail">分享给朋友进行一起捐吧</p>
				<a class="share">分享</a>
			</div>
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
			// publishItem,
			headerBackTitle
		},
		data() {
			return {
				publishSuccess: false
			}
		},
		methods: {
			backEdit() {
				this.$router.push('/dTEdit')
			},
			finishPublish() {
				let data = {
	        crowdfundingId: 5021,
	        creatorName: 1111,
	        creatorId: '527492462491467776',
	        groupdonationTitle: this.G("itemTitle"),
	        groupdonationDetail: this.G("itemDescription")
	      }
        this.$https.post(this.BASE_URL+"grd/groupDonation/create",
          this.qs.stringify(data),
          {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
          }
        )
        .then(res => {
        	if(res.data.code == 'CFSI0000') {
						this.publishSuccess = !this.publishSuccess
        	}
        })
        .catch(function(err) {
        	console.log(err);
        })
			},
			clsoeAlert() {
				// 发起成功后关闭弹框
				this.publishSuccess = !this.publishSuccess
				this.$router.push('/dTDetail')
			}
		},
		beforeRouteLeave (to, from, next) {        
	    if (to.name == 'dTEdit') {
	      to.meta.isUseCache = true;    
	    }        
	    next();
		}
	}
</script>
<style lang="stylus" scoped>
	@import '../styl/mixin'
	.publish-wrapper
		height 100%
		background $bgF6
		.publish-container
			position absolute
			top 47px
			bottom 49px
			width 100%
			overflow-y auto
		.publish-bottom
			df(center)
			position absolute
			bottom 0
			wh(100%,49px)
			line-height 49px
			a
				width 50%
				text-align center
				&:first-child
					sc(16px,#333)
					background $colorWhite
				&:last-child
					sc(16px,$colorWhite)
					background #F37306
		.timeContainer
			df(center,center)
			position relative
			margin 16px 20px 15px
			&:after
				position absolute
				width 100%
				height 1px
				background #e5e5e5
				content ""
				z-index 1
			span
				z-index 2
				sc(13px,#a3a3a3)
				background #e5e5e5
				border-radius 3px
	.success-container
		position fixed
		top 0
		bottom 0
		left 0
		right 0
		z-index 2
		background rgba(0,0,0,.5)
		.successAlert
			position relative
			width 70%
			padding 10px 15px 22px 15px
			margin 50% auto 0
			text-align center
			background $colorWhite
			border-radius 6px
			.successIcon
				position absolute
				left 50%
				top -35px
				margin-left -35px
				wh(70px,70px)
				bis("../assets/images/iconDT")
			.closeAlert
				a
					float right
					display inline-block
					wh(14px,14px)
					bis("../assets/images/closeDT")
			.successTitle
				margin 50px 0 18px
				sc(17px,$colorThree)
			.successDetail
				margin-bottom 10px
				sc(14px,$colorNine)
			.share
				display inline-block
				wh(50%,45px)
				margin-top 20px
				sc(15px,#f37306)
				line-height 45px
				bis('../assets/images/borderDT')
</style>