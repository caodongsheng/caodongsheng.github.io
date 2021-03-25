<template>
    <div>
        <img class="yind_img" @click="clickLeft" src="../../assets/images/yind_x.png"/>
    </div>
</template>
<script>
export default {
    methods: {
    	data(){
			return {
				//由于vueg的嵌套路由默认不启动转场动画，需要在其匹配组件中设置为启用
				vuegConfig:{
					disable:false
				}
			}
		},
        clickLeft:function() {
        	// router转场后会自动触发vueg的转场特效
            switch (this.$route.name) {
                case 'default':
                case 'page1':
                    this.$router.push({
                        name: 'page2'
                    })
                    break
                case 'page2':
                    this.$router.push({
                        name: 'page3'
                    })
                    break
            }
        },
    }
}
</script>
<style scoped>
div {
    background: url(../../assets/images/yind_2.jpg);
    background-size: 100% 100%;
}
.yind_img{
	width: 162px;
	height: 74px;
	bottom:82px ;
	left: 50%;
	margin-left: -81px;
	position: absolute;
}
</style>