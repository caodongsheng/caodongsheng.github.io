<template>
	<div>
		<div class="all">
			<div>
				<span ref="propsWidth"></span>
				<i ref="progessWidth">{{ proge }}%</i>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['proge'],
		data () {
			return{

			}
		},
		methods: {
			progess () {
				if(this.proge>=100){
					this.$refs.progessWidth.style.left = '90%'
					this.$refs.propsWidth.style.width = '100%';
				}else if (this.proge<10){
					this.$refs.progessWidth.style.left = (this.proge-2)+'%'
					this.$refs.propsWidth.style.width = this.proge+'%';
				}else{
					this.$refs.progessWidth.style.left = (this.proge-2)+'%'
					this.$refs.propsWidth.style.width = this.proge+'%';
				}
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
		height: 10px;
		background:#DCDCDC;
		border-radius: 10px;
		position: relative;
	}
	.all div span{
		height: 10px;
		position: absolute;
		top: 0;
		left: 0;
		border-radius: 10px;
		background:#F67A11;
	}
	.all div i{
		font-size: 12px;
		padding: 0px 3px;
		position: absolute;
		top: -6px;
		background:#F67A11;
		color: #fff;
		border-radius: 10px;
	}
</style>