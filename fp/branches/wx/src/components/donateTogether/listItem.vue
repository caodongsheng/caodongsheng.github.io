<template>
	<div class="listItem-wrapper">
		<div v-if="type === 'detail'" class="listItem-container border-1px">
			<img :src="details.acr065" alt="">
			<div class="listItem-content">
				<p class="title">{{details.title}}</p>
				<p class="content">{{details.acr013}}</p>
				<div class="raise-situation">
					<p>已募集<span>{{alreadyMoney}}</span>{{details.alreadyMoney>1000000?'万元':'元'}}</p>
					<p>支持次数<span>{{details.personNum}}</span>次</p>
				</div>
			</div>
		</div>
		<div v-if="type === 'list'" @click="toListDetail(list.groupdonationId,list.acr001)" class="listItem-container border-1px">
			<img :src="list.appImage" alt="">
			<div class="listItem-content">
				<p class="title">{{list.acr002}}</p>
				<p class="content">{{list.acr013}}</p>
				<div class="raise-situation">
					<p>已募集<span>{{alreadyMoney}}</span>{{list.donateNum>1000000?'万元':'元'}}</p>
					<p>支持次数<span>{{list.donateTimes}}</span>次</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		props:['acr001','type','list'],
		data() {
			return {
				details: ''
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
	   	},
	   	toListDetail(groupdonationId,acr001) {
	   		// 列表进入详情
	   		this.$router.push('/dTDetail/'+groupdonationId+'/'+acr001)
	   	}
		},
		computed:{
			alreadyMoney() {
				let money = this.type === 'detail'?this.details.alreadyMoney:this.list.donateNum
				if(money >= 1000000){
					return money/10000
				}else{
					return money
				}
			}
		},
		created() {
			if(this.type === 'detail') {
				this.getDetail()
			}
		}
	}
</script>
<style lang="stylus" scoped>
	@import '../../styl/mixin.styl'
	.listItem-container
		df(center)
		padding 13px 15px 15px
		background $colorWhite
		border-1px(0,0,#E1E1E1)
		img
			flex 0 0 110px
			wh(110px,85px)
			margin-right 11px
			object-fit cover
		.listItem-content
			flex 1
			width 0
			font-size 0
			.title
				sc(15px,#333)
				tit-mutirow-nowrap(2)
			.content
				margin-bottom 23px
				sc(13px,#999)
				tit-nowrap()
			.raise-situation
				df()
				sc(13px,#999)
				span
					sc(13px,$colorOrange)
				p
					&:first-child
						margin-right 16px
</style>