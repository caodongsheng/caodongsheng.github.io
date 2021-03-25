<template>
	<div class="app-container">
		<el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
		    <el-radio-button label="top">top</el-radio-button>
		    <el-radio-button label="right">right</el-radio-button>
		    <el-radio-button label="bottom">bottom</el-radio-button>
		    <el-radio-button label="left">left</el-radio-button>
		</el-radio-group>
		<el-tabs :tab-position="tabPosition" style="min-height: 200px;">
		    <el-tab-pane label="用户管理">
		    	<h3>主表</h3>
		    	<el-table
				    ref="multipleTable"
				    :data="tableData3"
				    tooltip-effect="dark"
				    style="width: 100%"
				    @selection-change="handleSelectionChange">
				    <el-table-column
				      type="selection"
				      width="55">
				    </el-table-column>
				    <el-table-column
				      label="日期"
				      width="120">
				      <template slot-scope="scope">{{ scope.row.date }}</template>
				    </el-table-column>
				    <el-table-column
				      prop="name"
				      label="姓名"
				      width="120">
				    </el-table-column>
				    <el-table-column
				      prop="address"
				      label="地址"
				      show-overflow-tooltip>
				    </el-table-column>
				    <el-table-column width="100" align="center" label="操作主键">
				      	<template slot-scope="scope">
				            <el-switch
							    v-model="value2"
							    active-color="#13ce66"
							    inactive-color="#ff4949"
							    @change="change">
							</el-switch>
							
				        </template>
				    </el-table-column>
				    <el-table-column min-width="300" fixed="right" align="center" label="操作">
				      	<template slot-scope="scope">
				          <el-button size="mini" type="primary" @click="handleDetial(scope.row)">主键</el-button>
				          <el-button size="mini" type="primary" @click="handleClose(scope.row)">关闭</el-button>
				          <el-button size="mini" type="primary" @click.stop="statussSwitch(scope.row.id,scope.row.user_status)">{{scope.row.user_status==0?'冻结':'启用'}}</el-button>
				        </template>
				    </el-table-column>
				</el-table>
				<h3>子表</h3>
				<el-table
				    ref="multipleTable"
				    :data="tableData3"
				    tooltip-effect="dark"
				    style="width: 100%"
				    @selection-change="handleSelectionChange">
				    <el-table-column
				      type="selection"
				      width="55">
				    </el-table-column>
				    <el-table-column
				      label="日期"
				      width="120">
				      <template slot-scope="scope">{{ scope.row.date }}</template>
				    </el-table-column>
				    <el-table-column
				      prop="name"
				      label="姓名"
				      width="120">
				    </el-table-column>
				    <el-table-column
				      prop="address"
				      label="地址"
				      show-overflow-tooltip>
				    </el-table-column>
				    <el-table-column width="100" align="center" label="操作主键">
				      	<template slot-scope="scope">
				            <el-switch
							    v-model="value2"
							    active-color="#13ce66"
							    inactive-color="#ff4949"
							    @change="change">
							</el-switch>
							
				        </template>
				    </el-table-column>
				    <el-table-column min-width="300" fixed="right" align="center" label="操作">
				      	<template slot-scope="scope">
				          <el-button size="mini" type="primary" @click="handleDetial(scope.row)">主键</el-button>
				          <el-button size="mini" type="primary" @click="handleClose(scope.row)">关闭</el-button>
				          <el-button size="mini" type="primary" @click.stop="statussSwitch(scope.row.id,scope.row.user_status)">{{scope.row.user_status==0?'冻结':'启用'}}</el-button>
				        </template>
				    </el-table-column>
				</el-table>
				<div style="margin-top: 20px">
				    <el-button @click="toggleSelection([tableData3[1], tableData3[2]])">切换第二、第三行的选中状态</el-button>
				    <el-button @click="toggleSelection()">取消选择</el-button>
				</div>
		    </el-tab-pane>
		    <el-tab-pane label="配置管理">配置管理</el-tab-pane>
		    <el-tab-pane label="角色管理">角色管理</el-tab-pane>
		    <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
		</el-tabs>
				
	</div>
</template>

<script>
	export default {
	    data() {
	      return {
	      	value1: '',
	      	value2: '',
	      	//tabPosition="left|right|top|bottom"
	        tabPosition: 'top',
	        multipleSelection: [],
	        tableData3: [{
	        	id: 0,
	        	user_status: 0,
	        	date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1515 弄'
	        },{
	        	id: 1,
	        	user_status: 1,
	        	date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
	        },{
	        	id: 2,
	        	user_status: 0,
	        	date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
	        },{
	        	id: 3,
	        	user_status: 1,
	        	date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
	        }]
	      }
	    },
	    methods: {
	    	toggleSelection(rows) {
		        if (rows) {
		          rows.forEach(row => {
		            this.$refs.multipleTable.toggleRowSelection(row);
		          });
		        } else {
		          this.$refs.multipleTable.clearSelection();
		        }
		    },
		    handleSelectionChange(val) {
		    	// 增删改查
		    	console.log(val)
		        this.multipleSelection = val;
		        this.multipleSelection.map((value, index, array) => {
		        	console.log(this.multipleSelection[index].address)	
		        })
		        
		    },
		    change() {
		    	// 此处判断true或false
		    	console.log(this.value2)
		    },
		    statussSwitch(id,s) {
		    	console.log(id)
		    	console.log(s)
		    	let status=s
		        if(status==1){
		            status=0
		        }else{
		            status=1
		        }
		        //此处判断是否开启
		        this.tableData3.map((value, index, array) => {
		        	if(index == id){
		        		this.tableData3[id].user_status = status
		        	}
		        	
		        })
		      
		    }

	    }
	}
</script>

<style>
</style>