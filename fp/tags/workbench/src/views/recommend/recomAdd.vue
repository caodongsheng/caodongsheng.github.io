<template>
  <div class="app-container">
    <div class="conheader clearfix" align="right">
      <h3>{{$route.meta.title}}</h3>
    </div>
    <div class="conheader clearfix" align="right">
      <el-button type="primary" @click="sure">选择需求</el-button>
    </div>
    <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
		  <el-form-item label="需求ID">
		    <el-input v-model="ruleForm.demand_id"></el-input>
		  </el-form-item>
		  <el-form-item label="推荐标题">
		    <el-input v-model="ruleForm.title"></el-input>
		  </el-form-item>
		  <!--<el-form-item label="需求图片">
		    我是图片
		  </el-form-item>-->
		  <el-form-item label="开始时间">
		    <el-col :span="11">
		      <el-form-item>
				    <el-date-picker
				      v-model="ruleForm.start_date"
				      type="date"
				      placeholder="选择日期"
               :picker-options="pickerOptionsStart"
              value-format="yyyy-MM-dd">
				    </el-date-picker>
		      </el-form-item>
		    </el-col>
		  </el-form-item>
		  <el-form-item label="结束时间">
		    <el-col :span="11">
		      <el-form-item>
				    <el-date-picker
				      v-model="ruleForm.end_datee"
				      type="date"
				      placeholder="选择日期"
               :picker-options="pickerOptionsEnd"
              value-format="yyyy-MM-dd">
				    </el-date-picker>
		      </el-form-item>
		    </el-col>
		  </el-form-item>
		  <el-form-item label="描述" prop="desc">
		    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="ruleForm.re_desc"></el-input>
		  </el-form-item>
		  <!--<el-form-item label="选择水印" prop="region">
		    <el-select v-model="ruleForm.watermark_id" placeholder="请选择">
		    	<el-option v-for="item in leixing" :key="item.id" :label="item.name" :value="item.id"/>
		    </el-select>
		  </el-form-item>-->
		  <el-form-item>
		    <el-button type="primary" @click.stop="submitForm('ruleForm')">保存</el-button>
		    <!--<el-button type="primary" @click="">取消</el-button>-->
		  </el-form-item>
		</el-form>
    <el-dialog :visible.sync="dialogFormVisible" title="爱心需求列表" >
    	<div class="filter-container">
      <el-row :gutter="20">
        <el-col :span="8">
          <span>受助人真实姓名:</span>
          <el-input v-model="listQuery.aideder_name" placeholder="受助人姓名" style="width: 160px" class="filter-item"></el-input>
        </el-col>
        <el-col :span="8">
          <span>受助人手机号:</span>
          <el-input v-model="listQuery.aideder_tel" placeholder="受助人手机号" style="width: 160px" class="filter-item"></el-input>
        </el-col>
        <el-col :span="8">
          <span>受助人身份证号:</span>
          <el-input v-model="listQuery.aideder_idcard" placeholder="受助人身份证号" style="width: 160px" class="filter-item"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <span>发布人真实姓名:</span>
          <el-input v-model="listQuery.publish_name" placeholder="发布人姓名" style="width: 160px" class="filter-item"></el-input>
        </el-col>
        <el-col :span="8">
          <span>发布人手机号:</span>
          <el-input v-model="listQuery.publish_tel" placeholder="发布人手机号" style="width: 160px" class="filter-item"></el-input>
        </el-col>
        <el-col :span="8">
          <span>发布人ID:</span>
          <el-input v-model="listQuery.create_by" placeholder="发布人ID" style="width: 160px" class="filter-item"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <!--<el-col :span="8">
          <span>排序:</span>
          <el-select v-model="listQuery.isPoor" clearable style="width: 160px" class="filter-item" placeholder="请排序">
            <el-option v-for="item in isPoorOptions" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-col>-->
        <el-col :span="8">
          <span>需求ID:</span>
          <el-input v-model="listQuery.id" placeholder="需求ID" style="width: 160px" class="filter-item"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="20">
          <span>查询区域:</span>
          <linkage :level="level" :level_list="level_list" @change="linkageChange"/>
        </el-col>
        <el-col :span="4">
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="getList">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      fit
      highlight-current-row
      style="width: 100%;min-height:400px;"
      height="400"
      @current-change=""
      @row-click="choose">
      <el-table-column align="center"  label="序号" type="index" width="45"/>
      <el-table-column min-width="50" align="center" label="需求ID" prop="id"/>
      <el-table-column min-width="50" align="center" label="受助人姓名" prop="aideder_name"/>
      <el-table-column width="100" align="center" label="受助人手机号" prop="aideder_tel"/>
      <el-table-column width="170" align="center" label="受助人身份证号" prop="aideder_idcard"/>
      <el-table-column min-width="100" align="center" label="所属区域" prop="region_name"/>
      <el-table-column min-width="50" align="center" label="发布人姓名" prop="publish_name"/>
      <el-table-column width="170" align="center" label="审核上线时间" prop="create_date"/>
      <!--<el-table-column width="160" align="center" label="操作" prop="aideder_name">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="examine(scope.row.id,1)">通过</el-button>
          <el-button size="mini" type="primary" @click="examine(scope.row.id,2)">不通过</el-button>
        </template>
      </el-table-column>-->
    </el-table>
    <div class="pagination-container">
      <el-pagination :current-page="listQuery.page" :page-sizes="[10,20,30, 50]"  v-if="total>listQuery.limit" :page-size="listQuery.limit" :total="total" background layout="total,  prev, pager, next, jumper" @current-change="pagefn"/>
    </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="end">关闭</el-button>
        <el-button type="primary" @click="end">确定</el-button>
      </div>
    </el-dialog>
    <TagsView ref="tag" v-show="false"/>
  </div>
</template>

<script>
import { fetchPv, createArticle, updateArticle } from '@/api/article'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'
import linkage from '@/components/linkage'
import { TagsView } from '@/views/layout/components'
export default {
  name: 'recomAdd',
  components: {
    linkage,
    TagsView
  },
  directives: {
    waves
  },
  data() {
    return {
    	value6: "",
      level_list: JSON.parse(localStorage.leaderarrs),
      level: localStorage.leaderLevel,
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        province_region_id: '',
        city_region_id: '',
        county_region_id: '',
        village_region_id: '',
        hamlet_region_id: '',
        aideder_name: '',
				aideder_tel: '',
				aideder_idcard: '',
				publish_name: '',
				publish_tel: '',
				create_by: '',
				id: '',
        page: 1,
        pageSize: 10,
      },
            pickerOptionsStart: {
        disabledDate: time => {
          let endDateVal = this.ruleForm.end_date;
            if (endDateVal) {
            return (
              time.getTime() > new Date(endDateVal).getTime()
            );
          } else {
            return time.getTime() > Date.now();
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: time => {
          let beginDateVal = this.ruleForm.start_date;
          if (beginDateVal) {
            return (
            time.getTime() <
              new Date(beginDateVal).getTime()-1*1000*24*60*60 ||time.getTime()>Date.now()
            );
          }
          else {
            return time.getTime() > Date.now();
          }

        },
      },
      dataTip: {},
      activeName: 'first',
      leixing: [{id: '0',name: '封面默认'}, {id: '1',name: '普通默认'}],
      isPoorOptions: [{ id: 1, name: '发布时间由近到远' }, { id: 2, name: '发布时间由远到近' }, { id: 3, name: '审核时间由近到远' }, { id: 4, name: '审核时间由远到近' }],
      currentItem: { id: '33' },
      dialogFormVisible: false,
      dialogDetail: false,
      relate_pics: [],
      dialogStatus: '',
      dialogPvVisible: false,
      pvData: [],
      ruleForm: {
          demand_id: '',
          re_desc: '',
          title: '',
          start_date: '',
          end_datee: '',
          column_id: ''
        },
      rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
    }
  },
  computed:{
      user_level(){
          return this.currentItem.user_level
      },
      user_status(){
          return this.currentItem.user_status
      }
  },
  watch:{
      user_level(n,v){
          if(n === '' || v === undefined || n === undefined){
              return
          }
          this.modify()
      },
      user_status(n,v){
          if(n === '' || v === undefined || n === undefined){
              return
          }
          this.modify()
      }
  },
  created() {
    this.getList()
  },
  methods: {
  	sure() {
  		this.dialogFormVisible = true
  	},
  	submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
          	this.$refs.tag.closeSelectedTag(this.$route)
            this.$http.post('/hts/management/insertRecommendDetail', this.ruleForm).then(res => {
            this.$notify({
		                title: '成功',
		                message: '添加成功',
		                type: 'success'
		           });
		        })
          } else {
            return false;
          }
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    end(){
        this.dialogFormVisible=false;
//      this.getList()
    },
    detailchange(n,i){
        let str=''
        for(let i=0;i<n.length;i++){
             str+=n[i].regionName+' '
        }
        let data={
            region_name:str,
            user_id:this.currentItem.id,
            province_region_id : n[0].id,
            city_region_id : n[1].id,
            county_region_id : n[2].id,
            village_region_id : n[3].id,
            hamlet_region_id : n[4].id
        }
        Object.assign(this.currentItem.manageRegions[i],data)
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
    open(q) {
      this.$refs.table.toggleRowExpansion(q)
    },


    choose(row, event, column) {
    	this.ruleForm.demand_id = row.id
    	this.ruleForm.title = row.demand_title
    	this.ruleForm.re_desc = row.demand_coment
    	this.ruleForm.column_id = row.help_type_code
//  	this.ruleForm.re_template = row.re_template
      this.ruleForm.cover_pic = row.cover_pic
      this.ruleForm.watermark_id =  row.cover_pic
      this.ruleForm.sort_num = row.sort_num
      this.ruleForm.link_typ = row.link_typ
      this.ruleForm.link_url = row.link_url
      this.ruleForm.relate_pics = row.relate_pics
      this.ruleForm.province_region_id = row.province_region_id
      this.ruleForm.city_region_id = row.city_region_id
			this.ruleForm.county_region_id = row.county_region_id
			this.ruleForm.show_status = 1
    	this.dialogFormVisible = false
    },
    getList() {
      this.listLoading = true
      this.$http.post('/hts/management/getDemandId', this.listQuery).then(res => {
        this.list = res.vos
        this.total = parseInt(res.totals)
        this.listLoading = false
      })
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
