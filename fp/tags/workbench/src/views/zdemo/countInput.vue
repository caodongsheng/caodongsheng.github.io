<template>
	<div>
		<el-input-number 
			v-model="num" 
			controls-position="right"
			:precision="0"
			:step="1"
			@change="handleChange"
			@blur=""
			:min="1"
			:max="10"
			@keyup.native="proving1">
		</el-input-number>
		<br />
		<el-input-number 
			v-model="smallNum" 
			:precision="2" 
			:step="0.1"
			@change="handleChangeSmallNum"
			@blur=""
			:min="0"
			:max="10">
		</el-input-number>
	</div>
</template>

<script>
	export default {
	    data() {
	      return {
	        num: 1,
	        smallNum:0
	      }
	    },
	    methods: {
	        handleChange(value) {
	            console.log(value)
	        },
	         proving1(){
		        check(this.num)
		    },
		    check(value) {
                let reg = /^[1-9]\d*$/;
                var _this = this;
                if (value) {
                    if (new RegExp(reg).test(value) == false) {
                        setTimeout(() => {
                            _this.actionDataForm.studNum = '';
                            _this.errorTip = true;
　　　　　　　　                 }, 500); 
                }else{ 
                	    this.errorTip = false; 
                    } 
                }
            },
            handleChangeSmallNum(value) {
            	console.log(value)
            }

	    }
	}
</script>

<style>
</style>