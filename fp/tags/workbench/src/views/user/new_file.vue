<template>
	<el-col :span="16">
	  	<div class="bm">
	  		<p><span class="m">ID</span>  <span class="m_span">{{detial2.register_time}}</span></p>
	  	</div>
	  	<div class="bm">
	  		<p><span class="m">用户名</span>  <span class="m_span">{{detial2.nick_name}}</span></p>
	  	</div>
	  	<div class="bm">
	  		<p><span class="m">昵称</span>  <span class="m_span">{{detial2.register_time}}</span></p>
	  	</div>
	  	<div class="bm">
	  		<p><span class="m">姓名</span>  <span class="m_span">{{detial2.realname}}</span></p>
	  	</div>
	  	<div class="bm">
	  		<p><span class="m">账号/手机号</span>  <span class="m_span">{{detial2.mobile}}</span></p>
	  	</div>
	  	<div class="bm">
	  		<p><span class="m">第三方账号</span>  <span class="m_span">{{detial2.register_time}}</span></p>
	  	</div>
	  	<div class="bm">
	  		<p><span class="m">身份证号</span>  <span class="m_span">{{detial2.idcard}}</span></p>
	  	</div>
	  	<div class="bm">
	  		<p><span class="m">生日</span>  <span class="m_span">{{detial2.register_time}}</span></p>
	  	</div>
	  	<div class="bm">
	  		<p>
	  			<span class="m">级别</span>  
	  			<span class="m_span" v-if = "detial2.user_level == '5' ">村级管理员</span>
	  			<span class="m_span" v-if = "detial2.user_level == '4' ">乡级管理员</span>
	  			<span class="m_span" v-if = "detial2.user_level == '3' ">县级管理员</span>
	  			<span class="m_span" v-if = "detial2.user_level == '2' ">市级管理员</span>
	  			<span class="m_span" v-if = "detial2.user_level == '1' ">省级管理员</span>
	  		</p>
	  	</div>
	  	<div class="bm">
	  		<p><span class="m">注册时间</span>  <span class="m_span">{{detial2.register_time}}</span></p>
	  	</div>
	  	<div class="bm">
	  		<p>
	  			<span class="m">状态</span>  
	  			<span class="m_span" v-if = "detial2.user_status == '1'">正常</span>
	  			<span class="m_span" v-if = "detial2.user_status == '0'">冻结</span>
	  		</p>
	  	</div>
	  	<div class="bm">
	  			<div class="m p_top">负责区域</div>  
	  			<div>
	  				<p class="m_span paddr p_bottom" v-for="item in detial2.manageRegions">{{item.region_name}}</p>
	  			</div>
	  	</div>
	  	<div class="bm">
	  			<div class="m p_top">所在地区</div>  
	  			<div>
	  				<p class="m_span paddr p_bottom" v-for="item in detial2.manageRegions">{{item.region_name}}</p>
	  			</div>
	  	</div>
	  	<div class="bm">
	  			<div class="m p_top">爱心关注</div>  
	  			<div>
	  				<p class="m_span paddr p_bottom" v-for="item in detial2.manageRegions">{{item.region_name}}</p>
	  			</div>
	  	</div>
	  	<div class="bm">
	  		<p><span class="m">用户类型</span>  <span class="m_span">{{detial2.register_time}}</span></p>
	  	</div>
	  	<div class="bm">
	  		<p><span class="m">特殊权限</span>  <span class="m_span">{{detial2.register_time}}</span></p>
	  	</div>
	  	<div class="bm">
	  		<p><span class="m">管理级别</span>  <span class="m_span">{{detial2.register_time}}</span></p>
	  	</div>
	  	<div class="bm">
	  		<p><span class="m">机构名称</span>  <span class="m_span">{{detial2.register_time}}</span></p>
	  	</div>
	  	<div class="bm">
	  		<p><span class="m">注册时间</span>  <span class="m_span">{{detial2.register_time}}</span></p>
	  	</div>
	  	<div class="bm">
	  		<p><span class="m">最后登录</span>  <span class="m_span">{{detial2.register_time}}</span></p>
	  	</div>
	  	<div class="bm">
	  		<p><span class="m">状态</span>  <span class="m_span">{{detial2.register_time}}</span></p>
	  	</div>
	  	
	  	
	  	<div>
	  		<h3>地址信息</h3>
	  		<el-table
			    :data="tableData"
			    style="width: 100%">
			    <el-table-column prop="date" label="收货人"></el-table-column>
			    <el-table-column prop="date" label="地址信息"></el-table-column>
			    <el-table-column
			      prop="name"
			      label="详细地址">
			    </el-table-column>
			    <el-table-column
			      prop="address"
			      label="邮编">
			    </el-table-column>
			    <el-table-column
			      prop="address"
			      label="手机号">
			    </el-table-column>
			    <el-table-column
			      prop="address"
			      label="发布人">
			    </el-table-column>
			  </el-table>
	  	</div>
	  	<div>
	  		<h3>银行信息</h3>
	  		<el-table
			    :data="tableData"
			    style="width: 100%">
			    <el-table-column prop="date" label="收款人" width="180"></el-table-column>
			    <el-table-column prop="name" label="银行名称" width="180"></el-table-column>
			    <el-table-column prop="address" label="收款卡号"></el-table-column>
			    <el-table-column prop="address" label="发布人"></el-table-column>
			</el-table>
	  	</div>
	  </el-col>
</template>

<script>
</script>

<style>
</style>