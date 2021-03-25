<template>
  <div class="app-container">
    <div class="conheader clearfix" align="right">
      <h3>{{$route.meta.title}}</h3>
    </div>
    <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
		  <el-form-item label="需求ID">
		    <el-input v-model="ruleForm.id" :disabled="true"></el-input>
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
		  <el-form-item label="选择水印" prop="region">
		    <el-select v-model="ruleForm.watermark_id" placeholder="请选择">
		    	<el-option v-for="item in leixing" :key="item.id" :label="item.name" :value="item.id"/>
		    </el-select>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
		  </el-form-item>
		</el-form>



    <TagsView ref="tag" v-show="false"/>
  </div>
</template>

<script type="text/ecmascript-6">
import { fetchPv, createArticle, updateArticle } from '@/api/article'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'
import linkage from '@/components/linkage'
import { TagsView } from '@/views/layout/components'
import { mapState } from "vuex";

export default {
  name: 'recomEdit',
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
        page: 1,
        limit: 10,
//      helpTypeCode:null,
        level: undefined,
        name: undefined,
        mobile: undefined,
        id: undefined
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
      activeName: 'first',
      leixing: [{id: '0',name: '封面默认'}, {id: '1',name: '普通默认'}],
      levelOptions: [{ id: 5, name: '村级管理员' }, { id: 4, name: '乡级管理员' }, { id: 3, name: '县级管理员' }, { id: 2, name: '市级管理员' },{ id: 1, name: '省级管理员' }],
      currentItem: { id: '33' },
      dialogFormVisible: false,
      dialogDetail: false,
      relate_pics: [],
      dialogStatus: '',
      pvData: [],
      ruleForm: {},
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
   ...mapState(["user"]),
   
   
  },
  watch:{

  },
  created() {
  	console.log("推荐编辑")
    this.getList()
  },
  methods: {
  	submitForm(formName) {
        this.$refs[formName].validate((valid) => {

          if (valid) {
          	console.log("此处关闭需求页")
          	console.log(this.$route)
          	this.$refs.tag.closeSelectedTag(this.$route)
            this.$http.post('/hts/management/editRecommendDemand',{
            	demand_id: this.ruleForm.demand_id,
            	id: this.ruleForm.id,
							re_desc: this.ruleForm.re_desc,
							relate_pics: this.ruleForm.relate_pics,
							title: this.ruleForm.title,
							start_date: String(this.ruleForm.start_date),
							end_datee: String(this.ruleForm.end_datee),
							watermark_id: this.ruleForm.watermark_id
            }).then(res => {
		            this.$notify({
		                title: '成功',
		                message: '修改成功',
		                type: 'success'
		            })

		        })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    modify(){
        let data={
            userId:this.currentItem.id,
            user_level:this.currentItem.user_level,
            user_status:this.currentItem.user_status
        }
        this.$http.post('/hts/management/editOffice',data ).then(res => {
            this.$notify({
                title: '成功',
                message: '修改成功',
                type: 'success'
            });
        })
    },
    update(i){
      if(!this.currentItem.manageRegions[i].readonly){
          //点击确认修改
          this.$http.post('/hts/management/editManageRegion', this.currentItem.manageRegions[i]).then(res => {
              this.currentItem.manageRegions[i].readonly=!this.currentItem.manageRegions[i].readonly;
              this.$notify({
                  title: '成功',
                  message: '修改成功',
                  type: 'success'
                });
          })
      }else{
          this.currentItem.manageRegions[i].readonly=!this.currentItem.manageRegions[i].readonly
      }
    },
    deletes(i){
      this.$http.post('/hts/management/delManageRegion', {
          regionId:this.currentItem.manageRegions[i].id
      }).then(res => {
          this.currentItem.manageRegions.splice(i,1)
          this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success'
            });
      })
    },
    successadd(i){
        this.$http.post('/hts/management/addManageRegion', this.currentItem.manageRegions[i]).then(res => {
            this.$set(this.currentItem.manageRegions[i],'id', res)
            this.$set(this.currentItem.manageRegions[i],'readonly', true)
            this.$notify({
                title: '成功',
                message: '添加成功',
                type: 'success'
              });
        })
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
    getList() {
      this.listLoading = true
      this.$http.post('/hts/management/getDemandDetail', {
      	demand_id : this.$route.params.id
      }).then(res => {
        this.ruleForm = res
        this.listLoading = false
      }).catch(error =>{
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
