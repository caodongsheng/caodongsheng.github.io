<template>
	<div class="dtList-wrapper">
		<headerBackTitle  headerTitle="发布的一起捐"/>
		<tab v-model="index" :line-width="1" active-color="#ed6b2b" custom-bar-width="35%">
      <tab-item :selected="activeTab === item" v-for="(item,index) in listTab" @on-item-click="tabSwitch(index,item)" :key="'tab'+index">{{item}}</tab-item>
    </tab>
    <!-- 一起捐项目列表 -->
    <ul>
<!--     	<li v-show="index===0" type='list'>11111</list-item></li>
    	<li v-show="index===1" type='list'>222</list-item></li> -->
    	<li v-show="index===1" v-for="(item,index) in finishList" :key="'finish'+index"><list-item type='list' :list="item"></list-item></li>
    	<li v-show="index===0" v-for="(item,index) in unfinishList" :key="'unfinish'+index"><list-item type='list' :list="item"></list-item></li>
    </ul>
    <div v-if="unfinishList.length == 0 && index == 0" class="noList">
    	<p>暂无数据</p>
    </div>
    <div v-if="finishList.length == 0 && index == 1" class="noList">
    	<p>暂无数据</p>
    </div>
	</div>
</template>
<script>
	import {Tab, TabItem} from 'vux'
	import {mapState} from 'vuex'
	import headerBackTitle from '@/components/header/headerBackTitle'
	import listItem from '@/components/donateTogether/listItem'
	export default {
		components:{
			listItem,
			headerBackTitle,
			Tab,
			TabItem
		},
		data() {
			return {
				acr001:'5021',
				index: 0,
				listTab: ['进行中', '已完成'],
				activeTab: '进行中',
				queryState: 1,//查询状态 1是进行中，2是已完成
				isFirst: true, //是否第一次切换
				finishList: [], //已完成数据
				unfinishList: [] //进行中数据
			}
		},
		computed: {
			...mapState([
					'user'
				])
		},
		methods: {
			tabSwitch(index,item) {
				this.activeTab = item
				if(index==0) {
	        this.queryState = 1;
	      }else {
	        this.queryState = 2;
	      }
				if(this.isFirst) {
					this.isFirst = false
					this.getList()
				}
			},
			getList() {
				let data = {
	        epId: '527492462491467776',
	        finished: this.queryState
	      }
        this.$https.post(this.BASE_URL+"grd/groupDonation/listOfGroupDonationByCreatorID",
          data
        )
        .then(res => {
        	if(this.queryState === 1) {
          	this.unfinishList.push(...res.data.data.records)
        	}else {
          	this.finishList.push(...res.data.data.records)
        	}
        })
        .catch(function(err) {
        	console.log(err);
        })
			}
		},
		created() {
			this.getList()
		}
	}
</script>
<style lang="stylus" scoped>
	@import '../styl/mixin.styl'
	.dtList-wrapper
		height 100%
		background $bgF6
	.vux-tab-wrap
		padding-top 38px !important
		margin-bottom 10px
		>>>.vux-tab-container
			height 38px
			.vux-tab
				height 38px
				.vux-tab-item
					line-height 38px
					background none
</style>
