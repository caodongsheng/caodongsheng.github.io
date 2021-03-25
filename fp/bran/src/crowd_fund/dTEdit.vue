<template>
	<div class="dTEdit-wrapper">
		<headerBackTitle  headerTitle="发起一起捐"/>
		<div class="edit-container">
			<listItem type="detail" :acr001="acr001" />
			<div class="edit-org">
				<p class="title">发起形式</p>
				<div class="org-logo"></div>
			</div>
			<div class="edit-info">
				<p class="title">企业名称</p>
				<div class="edit-top">
					<img :src="companyInfo.orgLogo" alt="">
					<p>{{companyInfo.orgName}}</p>
				</div>
				<p class="title">一起捐标题</p>
				<input type="text" v-model="itemTitle"  placeholder="给项目一个标题吧">
				<p class="title">发起说明(140字以内)</p>
				<textarea v-model="itemDescription" placeholder="写下发起说明,描述号召目的和目标吧!" name="" id="" rows="7"></textarea>
			</div>
		</div>
		<div class="nextContainer">
			<a @click="nextPublish" class="nextBtn">下一步</a>
		</div>
	</div>
</template>
<script>
	import headerBackTitle from '@/components/header/headerBackTitle'
	import listItem from '@/components/donateTogether/listItem'
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				itemTitle: '',
				itemDescription: '',
				acr001: '5021',
				companyInfo: '' //企业名称
			}
		},
		components: {
			headerBackTitle,
			listItem
		},
		computed: {
			...mapState([
				'user'
			])
		},
		methods: {
			// 点击下一步
			nextPublish() {
				this.L('itemTitle',this.itemTitle)
				this.L('itemDescription',this.itemDescription)
				this.$router.replace("/dTPublish/"+this.acr001)
			},
	   	// 获取企业名称
	   	getCompanyInfo() {
	   		let data = {
	   			epId: '527492462491467776'
	   		}
	   		this.$https.post(this.BASE_URL+"grd/groupDonation/getEnterpriseLogoAndNameById",
          data,
        )
        .then(res => {
        	this.companyInfo = res.data.data
        })
        .catch(function(err) {
        	console.log(err);
        })
	   	}
		},
		activated() {
			if(!this.$route.meta.isUseCache){
				this.dTEdit = []
			}	
		},
		created() {
			this.getCompanyInfo()
		}
	}
</script>
<style lang="stylus" scoped>
	@import '../styl/mixin'
	.dTEdit-wrapper
		height 100%
		background $bgF6
		.edit-container
			position absolute
			top 47px
			bottom 94px
			width 100%
			overflow-y auto
			.title
				sc(14px,$colorThree)
				font-weight bold
			.edit-org
				padding 20px 15px
				margin-bottom 10px
				background-color $colorWhite
				.org-logo
					height 75px
					background-position center bottom
					bis('../assets/images/dtCompany',61px,61px,center,bottom)
			.edit-info
				padding 15px
				background $colorWhite
				.edit-top
					df(center)
					margin 15px 0 21px
					img
						wh(49px,49px)
						margin-right 11px
						border-radius 50%
					p
						flex 1
						width 0
						sc(14px,$colorThree)
						tit-nowrap()
				input,textarea
					box-sizing border-box
					width 100%
					display	inline-block
					padding	10px
					margin 10px 0 13px
					sc(13px,#999)
					-webkit-appearance none
					border 1px solid #d2d2d2
					border-radius 8px
					outline none
		.nextContainer
			position absolute
			bottom 0
			width 100%
			padding 10px 0 37px 0
			text-align center
			background $colorWhite
			.nextBtn
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