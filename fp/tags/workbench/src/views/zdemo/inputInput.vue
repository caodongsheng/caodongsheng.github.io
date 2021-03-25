<template>
	<div>
		<h3>邮箱</h3>
		<el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
		  <el-form-item
		    prop="email"
		    label="邮箱"
		    :rules="[
		      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
		      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
		    ]"
		  >
		    <el-input v-model="dynamicValidateForm.email"></el-input>
		  </el-form-item>
		  <el-form-item
		    v-for="(domain, index) in dynamicValidateForm.domains"
		    :label="'域名' + index"
		    :key="domain.key"
		    :prop="'domains.' + index + '.value'"
		    :rules="{
		      required: true, message: '域名不能为空', trigger: 'blur'
		    }"
		  >
		    <el-input v-model="domain.value"></el-input><el-button @click.prevent="removeDomain(domain)">删除</el-button>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
		    <el-button @click="addDomain">新增域名</el-button>
		    <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
		  </el-form-item>
		</el-form>
		<h3>手机号</h3>
		    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
		        <el-form-item label="手机号" prop="phone">
		            <el-input v-model="ruleForm.phone"/>
		        </el-form-item>
            </el-form>
		<h3>信用卡号</h3>
		    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
		        <el-form-item label="信用卡号" prop="xcard">
		            <el-input v-model="ruleForm.xcard"/>
		        </el-form-item>
           </el-form>
		<h3>身份证号</h3>
		    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
		        <el-form-item label="身份证号" prop="isCard">
		            <el-input v-model="ruleForm.isCard"/>
		        </el-form-item>
           </el-form>
		<h3>url</h3>
		    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
		        <el-form-item label="URL" prop="urll">
		            <el-input v-model="ruleForm.urll"/>
		        </el-form-item>
           </el-form>
	</div>
</template>
<script>
  export default {
    data() {
    	var checkPhone = (rule, value, callback) => {
	        if (!value) {
	            return callback(new Error('手机号不能为空'));
	        } else {
	            const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
	            console.log(reg.test(value));
	            if (reg.test(value)) {
	                callback();
	            } else {
	                return callback(new Error('请输入正确的手机号'));
	            }
        },
        var checkIsCard = (rule, value, callback) => {
        	if (!value) {
        		return callback(new Error('身份证号不能为空'));
        	} else{
        		const rega = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
        		console.log(rega.test(value))
        		if (rega.test(value)) {
        			callback()
        		} else{
        			return callback(new Error('请输入正确的身份证号'))
        		}
        	}
        },
        var checkUrll = (rule, value, callback) => {
            if (!value) {
            	return callback(new Error('URL不能为空'))
            } else{
            	const regUrl = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/
        		console.log(regUrl.test(value))
            	if (regUrl.test(value)) {
            		callback()
            	} else{
            		return callback(new Error('请输入正确的URL'))
            	}
            }        	
        },
        var checkXcard = (rule, value, callback) => {
        	if (!value) {
        		return  callback(new Error('信用卡号不能为空'))
        	} else{
        		const regXcard = /^((?:4\d{3})|(?:5[1-5]\d{2})|(?:6011)|(?:3[68]\d{2})|(?:30[012345]\d))[ -]?(\d{4})[ -]?(\d{4})[ -]?(\d{4}|3[4,7]\d{13})$/
        		console.log(regXcard.test(value))
        		if (regXcard.test(value)) {
        			callback()
        		} else{
        			return callback(new Error('请输入正确的信用卡号'))
        		}
        	}
        }
        
      return {
        dynamicValidateForm: {
          domains: [{
            value: ''
          }],
          email: ''
        },
        ruleForm: {
          phone: '',
          isCard: '',
          urll: '',
          xcard: ''
        },
        rules: {
          phone: [
            {validator: checkPhone, trigger: 'blur'}
          ],
          isCard: [
            {validator: checkIsCard, trigger: 'blur'}
          ],
          urll: [
            {validator: checkUrll, trigger: 'blur'}
          ],
          xcard: [
            {validator: checkXcard, trigger: 'blur'}
          ]
          
        }
        
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      removeDomain(item) {
        var index = this.dynamicValidateForm.domains.indexOf(item)
        if (index !== -1) {
          this.dynamicValidateForm.domains.splice(index, 1)
        }
      },
      addDomain() {
        this.dynamicValidateForm.domains.push({
          value: '',
          key: Date.now()
        });
      }
    }
  }
</script>
<style>
	
</style>