<template>
  <div class="app-container">
    <div class="conheader clearfix" align="right">
      <h3>{{$route.meta.title}}</h3>
    </div>
    <div class="filter-container">
      <el-row :gutter="20">
        <el-col :span="8">
          <span>推荐需求： </span>
          <el-select v-model="listQuery.column_id" clearable style="width: 160px" class="filter-item" placeholder="请选择状态">
            <el-option v-for="item in leixing" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-col>
        <!--<el-col :span="8">
          <span>关键字：</span>
          <el-input v-model="listQuery.aidedName" placeholder="请输入关键字" style="width: 160px" class="filter-item"></el-input>
        </el-col>-->
      </el-row>
      <el-row :gutter="20">
        <el-col :span="20" v-if = "listQuery.user_level == '3'">
          <span>管理区域：</span>
          <linkage :level="level" :level_list="level_list" @change="linkageChange"/>
        </el-col>
        <el-col :span="20" v-if = "listQuery.user_level == '2'">
          <span>管理区域：</span>
          <linkage :level="level" :level_list="level_list" @change="linkageChange"/>
        </el-col>
        <el-col :span="20" v-if = "listQuery.user_level == '1' || listQuery.user_level == '4' || listQuery.user_level == '5'"></el-col>
        <el-col :span="4">
          <el-button v-waves class="" type="primary" icon="el-icon-search" @click="getListCha">查询</el-button>
          <el-button v-waves class="" type="primary" icon="el-icon-add" @click="addConment">添加</el-button>
        </el-col>
      </el-row>
    </div>
    <el-table
      v-loading="listLoading"
      ref="table"
      :key="tableKey"
      :data="list"
      fit
      highlight-current-row
      style="width: 100%;min-height:400px;"
      height="auto"
      :row-key="getRowKeys"
      :expand-row-keys="expands"
      @row-click="open"
      @current-change="">
      <el-table-column type="expand" label="查看">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="主键 :">
              <span>{{listL.id}}</span>
            </el-form-item><br />
            <el-form-item label="推荐类型 :">
              <span v-if = "listL.column_id == '1'">医疗需求</span>
              <span v-if = "listL.column_id == '2'">教育需求</span>
              <span v-if = "listL.column_id == '3'">住房需求</span>
              <span v-if = "listL.column_id == '4'">物品需求</span>
            </el-form-item><br />
            <el-form-item label="推荐标题 :">
              <span>{{listL.title}}</span>
            </el-form-item><br />
            <el-form-item label="上架下架 :">
              <span>上架</span>
            </el-form-item><br />
            <el-form-item label="排序 :">
              <span>{{listL.sort_num}}</span>
            </el-form-item><br />
            <el-form-item label="需求编号 :">
              <span>{{listL.demand_id}}</span>
            </el-form-item><br />
            <el-form-item label="投放开始时间 :">
              <span>{{listL.start_date}}</span>
            </el-form-item><br />
            <el-form-item label="投放截止时间 :">
              <span>{{listL.end_datee}}</span>
            </el-form-item><br />
            <el-form-item label="下架时间 :">
            	<!--暂时后台没返回-->
              <span></span>
            </el-form-item><br />
            <el-form-item label="下架人名称 :">
            	<!--暂时后台没返回-->
              <span></span>
            </el-form-item><br />
            <el-form-item label="创建时间 :">
              <span>{{listL.create_date}}</span>
            </el-form-item><br />
            <el-form-item label="创建者名称 :">
              <span>{{listL.create_name}}</span>
            </el-form-item><br />
            <!--<el-form-item label="水印 :">
              <span>{{listL.id}}</span>
            </el-form-item><br />-->
          </el-form>
        </template>
      </el-table-column>
      <el-table-column min-width="50" label="需求ID" align="center" prop="id"/>
      <el-table-column min-width="70" align="center" label="所属栏目">
        <template slot-scope="scope">
          <p v-if = "scope.row.column_id == '1'">医疗需求</p>
          <p v-if = "scope.row.column_id == '2'">教育需求</p>
          <p v-if = "scope.row.column_id == '3'">住房需求</p>
          <p v-if = "scope.row.column_id == '4'">物品需求</p>
        </template>
      </el-table-column>
      <el-table-column min-width="100" align="center" label="项目标题" prop="title"/>
      <el-table-column min-width="70" align="center" label="上架下架">
      	<template slot-scope="scope">
          <p v-if = "true">上架</p> 
        </template>
      </el-table-column>
      <el-table-column min-width="150" align="center" label="操作" prop="aideder_name">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click.stop="edit(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="primary" @click.stop="statussSwitch(scope.row.id)">下架</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination :current-page="listQuery.page"  v-if="total>listQuery.pageSize" :page-sizes="[10,20,30, 50]" :page-size="listQuery.pageSize" :total="total" background layout="total,  prev, pager, next, jumper" @current-change="pagefn"/>
    </div>
  </div>
</template>

<script>
import { fetchPv, createArticle, updateArticle } from '@/api/article'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'
import linkage from '@/components/linkage'

export default {
  name: 'recomDemand',
  components: {
    linkage
  },
  directives: {
    waves
  },
  data() {
    return {
      level_list: JSON.parse(localStorage.leaderarrs),
      level: localStorage.leaderLevel,
      tableKey: 0,
      list: [],
      listL: null,
      total: null,
      listLoading: true,
      listQuery: {
      	column_id: null,
      	user_level: localStorage.leaderLevel,
        province_region_id: '',
        city_region_id: '',
        county_region_id: '',
        village_region_id: '',
        hamlet_region_id: '',
        page: 1,
        pageSize: 10, 
      },
      activeName: 'first',
      leixing: [{id: '1',name: '医疗需求'}, {id: '2',name: '教育需求'}, {id: '3',name: '住房需求'}, {id: '4',name: '物品需求'}],
      levelOptions: [{ id: 5, name: '村级管理员' }, { id: 4, name: '乡级管理员' }, { id: 3, name: '县级管理员' }, { id: 2, name: '市级管理员' },{ id: 1, name: '省级管理员' }],
      currentItem: { id: '33' },
      dialogFormVisible: false,
      dialogDetail: false,
      relate_pics: [],
      dialogStatus: '',
      dialogPvVisible: false,
      pvData: [],
      detial: {},
      getRowKeys(row) {
        return row.id;
      },
      expands: []
    }
  },
  computed:{
      
  },
  watch:{
//  '$route' (to, from) {
//    console.log(this.$route.query)
//  }
  },
  created() {
  	console.log("推荐需求")
    this.getList()
  },
  methods: {
    statussSwitch(id){ //推荐下架
        let data={
            id:id
        }
        if(this.listQuery.user_level == 2 || this.listQuery.user_level == 3) {
        	this.$http.post('/hts/management/delRecommendDemand',data ).then(res => {
	            this.$notify({
	                title: '成功',
	                message: '修改成功',
	                type: 'success'
	            });
	            this.getList()
	        })
        }else{
        	this.$notify({
	          title: '提示',
	          message: '对不起，您没有下架权限',
	          type: 'error'
	        });
        }
        
    },
    edit(id){ //推荐编辑
    	if (this.listQuery.user_level == 2 || this.listQuery.user_level == 3) {
    		this.$router.push('recomEdit'+id)
    	} else{
    		this.$notify({
	          title: '提示',
	          message: '对不起，您没有编辑权限',
	          type: 'error'
	      });
    	}
        
    },
    addConment(){ //推荐添加
    	  if (this.listQuery.user_level == 2 || this.listQuery.user_level == 3) {
    	  	this.$router.push('recomAdd')
    	  } else{
    	  	this.$notify({
	          title: '提示',
	          message: '对不起，您没有添加权限',
	          type: 'error'
	        });
    	  }    
    },
    linkageChange(n) {
      this.listQuery.province_region_id = n[0].id
      this.listQuery.city_region_id = n[1].id
      this.listQuery.county_region_id = n[2].id
      this.listQuery.village_region_id = n[3].id
      this.listQuery.hamlet_region_id = n[4].id
    },
    levelFn(n) {
      switch (n.user_level) {
        case 1:
          return '省级'
        case 2:
          return '市级'
        case 3:
          return '县级'
        case 4:
          return '乡级'
        case 5:
          return '村级'
      }
    },
    open(row, event, column){
      //this.$refs.table.toggleRowExpansion(row)
      this.expands = []
      this.expands.push(row.id)
    	// 点击行事件
    	this.$http.post('/hts/management/getDemandDetail', {demand_id:row.id}).then(res => {
    		console.log(res)
    		this.listL = res
    	})
    },
    getListCha() {
    	this.getList()
    },
    getList() {
    	//获得数据，因为后台做判断SO此处也需要加判断,此处直接跳走去哪
    	if (this.listQuery.user_level == 1 || this.listQuery.user_level == 4 || this.listQuery.user_level == 5) {
        this.$router.push('/errorPage/404')
    	} else{
    		this.listLoading = true
	      this.$http.post('/hts/management/getRecommend', this.listQuery).then(res => {
	        this.list = res.vos
	        this.total = parseInt(res.totals)
	        this.listLoading = false
	      }).catch(error => {
	      	this.listLoading = false
	      })
    	}
      
    },
    pagefn(index) {
      this.listQuery.page = index
      this.getList()
    }

  }
}
</script>
<style scoped>
  .label {width:140px;display:inline-block;margin:6px}
  .checkDialog >>> .el-dialog__body{padding-top:0px }
  .filter-container span{
      line-height: 50px;
      font-size: 14px;
  }
  .filter-container .filter-item{
      margin-bottom: 0;

  }
  .el-dialog__wrapper >>> .el-dialog{
      width: 1190px;
  }
</style>
