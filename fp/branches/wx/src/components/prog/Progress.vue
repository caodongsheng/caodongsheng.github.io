<template>
	<div>
		<div class="all" ref="all">
			<div>
				<span ref="propsWidth" :style="propsWidth"></span>
				<i ref="progessWidth" :style="progessWidth" >{{ num }}</i>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['proge'],
		data () {
			return{
				progessWidth:{
					left:''
				},
				propsWidth:{
					width:''
				},
				num:this.proge+'%'
			}
		},
		methods: {
			progess () {
				// console.log('**********************',this.$refs.all.clientWidth)
				// console.log('**********************//////////',this.$refs.progessWidth.clientWidth)
				let distance
				if(	parseInt(this.proge)>=100){
			     this.num='完成'
			
					if(document.body.clientWidth<=320){
						distance=(this.$refs.all.clientWidth- (this.$refs.progessWidth.clientWidth-5))/100
					}else{
						distance=(this.$refs.all.clientWidth- (this.$refs.progessWidth.clientWidth-5))/100
					}
					this.proge=100
					// this.progessWidth.width =this.$refs.progessWidth.clientWidth +'px'
				}else{
					distance=(this.$refs.all.clientWidth- this.$refs.progessWidth.clientWidth)/100
					this.num=this.proge+'%'
				}
				this.progessWidth.left = (this.proge * distance) - 5 + 'px'
				this.propsWidth.width = (this.proge * distance) + 'px'
			}
		},
		computed:{

		},
		watch:{
			proge(n,v){
				this.progess()
			}
		},
		mounted (){
			this.progess()
		}
	}
</script>

<style scoped>
	.all{
		width: 100%;
		box-sizing: border-box;
	}
	.all div{
		width: 100%;
		height: 5px;
		background:#DCDCDC;
		border-radius: 10px;
		position: relative;
	}
	.all div span{
		height: 5px;
		position: absolute;
		top: 0;
		left: 0;
		border-radius: 10px 0 0 10px;
		background:#F67A11;
	}
	.all div i{
    	width:43px;
		line-height: 15px;
		font-size: 12px;
		padding: 0px 3px;
		position: absolute;
		top: -5px;
		background:#F67A11;
		color: #fff;
		text-align: center;
		border-radius: 10px;
	}
</style>
