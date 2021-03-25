<template>
  <div class="app-container">
    <div class="conheader clearfix" align="right">
      <h3>{{$route.meta.title}}</h3>
      <el-button class="filter-item" style="margin-left: 10px;background:#23bab7;border-color:#23bab7" type="primary" icon="el-icon-edit" @click="editDemandExc" >导出</el-button>
    </div>
    <div class="filter-container">
      <el-form>
        <el-row :span="24" style="margin-bottom:10px;">
          <el-col :span="8">
              <span class="inputTip">用户类型:</span>
              <el-select v-model="listQuery.userType" clearable style="width: 160px" class="filter-item" placeholder="用户类型" >
                <el-option v-for="item in relations" :key="item.id" :label="item.name" :value="item.id"/>
              </el-select>
          </el-col>
          <el-col :span="8">
            <span class="inputTip">姓名:</span>
            <el-input v-model="listQuery.aidedPersonName" label="姓名" style="width: 160px;" class="filter-item gapStyle" placeholder="请输入受助人姓名"/>
          </el-col>
          <el-col :span="8">
            <span class="inputTip">手机号码:</span>
            <el-input v-model="listQuery.aidedPersonTel" label="手机号码" style="width: 160px;" class="filter-item gapStyle" placeholder="请输入受助人手机号码"/>
          </el-col>
        </el-row>
        <el-row>
           <el-col :span="24">
            <span class="inputTip">所在区域:</span>
            <linkage :level="level" :level_list="level_list" @change="linkageChange"/>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="18">
            <span class="inputTip">身份证号:</span>
            <el-input v-model="listQuery.idcard" label="身份证号" style="width: 240px;" class="filter-item gapStyle" placeholder="请输入受助人身份证号"/>
          </el-col>

          <el-col :span="2">
            <el-button v-waves class="filter-item" style="margin-top: 0px;"  type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-table v-loading="listLoading" :key="tableKey" :data="list" border highlight-current-row  stripe   @selection-change="selectionRowsChange">
      <el-table-column type="selection" width="55" ></el-table-column>

      <!-- <el-table-column :index="indexMethod" align="center" label="序号" type="index" width="65"/> -->
      <el-table-column align="center" label="序号" type="index"/>
      <el-table-column align="center" label="id" prop="id"/>
      <el-table-column align="center" label="姓名" prop="aided_person_name"/>
      <el-table-column align="center" label="手机号码" prop="aided_person_tel"/>
      <el-table-column align="center" label="身份证号" prop="idcard"/>
      <el-table-column align="center" label="用户类型">
        <template slot-scope="scope">
          <span>{{scope.row.user_type | usertype}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" label="发起人" prop="userType"/> -->
      <el-table-column align="center" label="所在区域" prop="region_name"/>
      <!--<el-table-column align="center" label="操作" min-width="160px" >-->
        <!--<template slot-scope="scope">-->
          <!--<el-button size="mini" type="primary" @click="poorDetail(scope.row.id)">受助人详情</el-button>-->
        <!--</template>-->
      <!--</el-table-column>-->
    </el-table>
    <div class="pagination-container">
        <span style="float:left;line-height:34px;">共{{totalNum}}条数据</span>
      <el-pagination v-if="total>listQuery.pageSize"
            :current-page="listQuery.page"
             :page-size="listQuery.pageSize"
              :total="total"
               background layout=" prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>

    </div>
    <span class="warnspan">仅能查看1000以内的数据，若需查看更多，请导出数据查看！</span>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="类型" prop="type">
          <el-select v-model="temp.type" class="filter-item" placeholder="Please select">
            <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
          </el-select>
        </el-form-item>
        <el-form-item prop="timestamp">
          <el-date-picker v-model="temp.timestamp" type="datetime" placeholder="Please pick a date"/>
        </el-form-item>
        <el-form-item prop="title">
          <el-input v-model="temp.title"/>
        </el-form-item>
        <el-form-item >
          <el-select v-model="temp.status" class="filter-item" placeholder="Please select">
            <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item"/>
          </el-select>
        </el-form-item>
        <el-form-item >
          <el-rate v-model="temp.importance" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max="3" style="margin-top:8px;"/>
        </el-form-item>
        <el-form-item>
          <el-input :autosize="{ minRows: 2, maxRows: 4}" v-model="temp.remark" type="textarea" placeholder="Please input"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">11</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">11</el-button>
        <el-button v-else type="primary" @click="updateData">11</el-button>
      </div>
    </el-dialog>
     <el-dialog :visible.sync="exportVisible" title="选择导出页码" @close="closeexport">
       <!-- <div class="pagination-container">
      <el-pagination
        :current-page="exportpage"
        :page-size="exportpageSize"
        :total="total"
        background
        layout="total, prev, pager, next, jumper"

        @current-change="handleExportChange"
      />
       <el-button type="primary" @click="downloadFile()">确定</el-button>
    </div> -->
   <el-card>
                         <div  class="exportdiv" v-for="(item,index) in exportarr" :key="item.url"><span class="m">第{{index+1}}页:第{{item.from}}条——第{{item.to}}条</span>  <el-button type="primary" icon="el-icon-download" class="exportbutton" @click="downloadFile(item.url)">下载</el-button></div>

          </el-card>
    </el-dialog>
  </div>
</template>

<script>
  import { createArticle, updateArticle } from '@/api/article'
  import waves from '@/directive/waves' // 水波纹指令
  import { parseTime } from '@/utils'
  import linkage from '@/components/linkage'
  import {mapState} from 'vuex'
  import urlFunction from '../../api/urlFun.js'
  import downloadfile from "../../utils/downloadfile.js"
  import { Loading } from 'element-ui'

  const calendarTypeOptions = [
    { key: 'CN', display_name: 'China' },
    { key: 'US', display_name: 'USA' },
    { key: 'JP', display_name: 'Japan' },
    { key: 'EU', display_name: 'Eurozone' }
  ]

  const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
    acc[cur.key] = cur.display_name
    return acc
  }, {})

  export default {
    name: 'PoorList',
    directives: {
      waves
    },
    computed: {
      ...mapState([
        'user'
      ]),
    },
    components:{linkage},
    filters: {
      usertype(value){
        if(value === 0){
          return "非贫困户"
        }else{
          return "贫困户"
        }
      },
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'info',
          deleted: 'danger'
        }
        return statusMap[status]
      },
      typeFilter(type) {
        return calendarTypeKeyValue[type]
      }
    },
    data() {
      return {
      exportVisible:false,
      loadingInstance:null,
      exportpageSize:100000,
      totalNum:0,
      exportarr:[],
        selectarr:[],
        level_list: JSON.parse(localStorage.leaderarrs),
        level: localStorage.leaderLevel,
        tableKey: 0,
        list: null,
        total: null,
        listLoading: true,
        detailEdit: false,
        listQuery: {
          province_region_id: '',
          city_region_id: '',
          county_region_id: '',
          village_region_id: '',
          hamlet_region_id: '',
          page: 1,
          pageSize: 10,
          userType:'',
          aidedPersonName: '',
          aidedPersonTel: '',
          idcard: '',
          countys:'',
        },
        relations: [{id:0,name:"非贫困户"},{id:1,name:"贫困户"}],
        calendarTypeOptions,
        sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
        statusOptions: ['published', 'draft', 'deleted'],
        showReviewer: false,
        temp: {
          id: undefined,
          importance: 1,
          remark: '',
          timestamp: new Date(),
          title: '',
          type: '',
          status: 'published'
        },
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: 'Edit',
          create: 'Create'
        },
        pvData: [],
        rules: {
          type: [{ required: true, message: 'type is required', trigger: 'change' }],
          timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
          title: [{ required: true, message: 'title is required', trigger: 'blur' }]
        },
        downloadLoading: false
      }
    },
    created() {
      this.getList()
    },
    methods: {
      selectionRowsChange(value){
    this.selectarr = value
    },
      downloadFile(url) {
     downloadfile.fileDownload(url,{
			  prepareCallback: function(url){
          this.loadingInstance = Loading.service({fullscreen: true, text: '下载时间较长，请耐心等待...'});
			  },
			  successCallback: function(url){
			    this.loadingInstance.close();
			  },
			  failCallback: function (html, url) {
			    this.loadingInstance.close();
			   }
			}
)

    },
      editDemandExc(){
        if(this.selectarr.length>0){
      let idarr = [];
      this.selectarr.forEach(val =>{
        idarr.push(val.id)
      })
      let idstr = idarr.join(",")
        // window.location.href = `http://dev2.fpmai.com/ets/excel/poorExcelDown?token=${this.user.token}&aidedId=${
        //  idstr
        // }`;
        let obj = {};
        obj.token =  this.user.token;
        obj.aidedId = idstr;
        this.exporthandler(process.env.BASE_API+`ets/excel/poorExcelDown?token=${this.user.token}&aidedId=${
         idstr
        }`,obj)
      }
      else{
                let urlobj = {...this.listQuery}

        urlFunction(urlobj).then(res => {
          let data = res.join("&").replace(/\"/g, "");
          let datastr = data==""?"":"&"+data;
          //window.location.href = `http://dev2.fpmai.com/ets/excel/poorExcelDown?token=${this.user.token}&${data}`
        let obj = {...this.listQuery}
         obj.token =   this.user.token
           this.exporthandler(process.env.BASE_API+`ets/excel/poorExcelDown?token=${this.user.token}${datastr}`,obj)
       })
      }
      },
       async  exporthandler(url,obj) {
    let pagetotal = 0
    let exporttotal = 0
     await this.$http
        .post("/ets/excel/poorExcelDownCount", obj)
        .then(response => {
            if(response.totals==0){
             this.$message({
            showClose: true,
            message: "没有符合条件的数据，无法导出!",
            type: "error"
          });
            return;
          }
            this.exportVisible = true;
          exporttotal = response.totals;
            if(exporttotal<this.exportpageSize||exporttotal==this.exportpageSize){
       pagetotal = 1;
      this.exportarr = [{url:url+"&page=1",page:1,from:1,to:exporttotal}]
    }
    else{
       pagetotal = Math.ceil(exporttotal/this.exportpageSize);
       for(let i=0;i<pagetotal;i++){
         let num = i+1
         if(i<pagetotal-1){
         this.exportarr.push({url:url+"&page="+num,page:num,from:i*this.exportpageSize+1,to:num*this.exportpageSize})
         }
         else{
         this.exportarr.push({url:url+"&page="+num,page:num,from:i*this.exportpageSize+1,to:exporttotal})

         }
       }
    }

      });

    },
     closeexport(){
      this.exportarr = [];

    },
      getList() {
        this.listLoading = true
        this.$http.post('hts/management/searchPoor', this.listQuery).then(response => {
          this.list = response.list
         let num = parseInt(response.total)
          this.total =  num>this.listQuery.pageSize*100?this.listQuery.pageSize*100:num
          this.totalNum=num
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
      },
      poorDetail(id){
        // 受助人详情
        this.$router.push({
          path:"/poor/editPoorlist",
          query:{
            state:1,
            id:id
          }
        })
      },
      linkageChange(n,b,m) {
        this.listQuery.countys = m
        this.listQuery.province_region_id = n[0].id
        this.listQuery.city_region_id = n[1].id
        this.listQuery.county_region_id = n[2].id
        this.listQuery.village_region_id = n[3].id
        this.listQuery.hamlet_region_id = n[4].id
      },
      handleFilter() {
        // 查询触发
        this.listQuery.page = 1
        this.getList()
      },
      handleSizeChange(val) {
        // 每页条数改变触发
        this.listQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        // 当前页数改变触发
        this.listQuery.page = val
        this.getList()
      },
      handleModifyStatus(row, status) {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        row.status = status
      },
      resetTemp() {
        this.temp = {
          id: undefined,
          importance: 1,
          remark: '',
          timestamp: new Date(),
          title: '',
          status: 'published',
          type: ''
        }
      },
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
            this.temp.author = 'vue-element-admin'
            createArticle(this.temp).then(() => {
              this.list.unshift(this.temp)
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
            })
          }
        })
      },
      handleUpdate(row) {
        this.temp = Object.assign({}, row) // copy obj
        this.temp.timestamp = new Date(this.temp.timestamp)
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            const tempData = Object.assign({}, this.temp)
            tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
            updateArticle(tempData).then(() => {
              for (const v of this.list) {
                if (v.id === this.temp.id) {
                  const index = this.list.indexOf(v)
                  this.list.splice(index, 1, this.temp)
                  break
                }
              }
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success',
                duration: 2000
              })
            })
          }
        })
      },
      handleDelete(row) {
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
        const index = this.list.indexOf(row)
        this.list.splice(index, 1)
      },
    }
  }
</script>
<style scoped>
  .filter-container .filter-item{margin-bottom: 0}
  .gapStyle{margin: 0 7px 0 0;}
  .inputTip{display: inline-block;margin-right: 7px;font-size:14px;color:#606266;text-align: left;font-weight: 500;}
.exportbutton {
 float:right;
 margin:0px
}
.exportdiv{
  height: 40px;
}
.el-pagination{
    text-align: center;
}
.warnspan{
    font-size: 14px;
    height: auto;
    color: red;
    line-height: 30px;
    text-align: center;
    display: block;
    width: 100%;
}
</style>
