<template>
  <div class="app-container">
  	<div class="conheader clearfix" align="right">
		      <h3>{{$route.meta.title}}</h3>
		</div>
    <div class="filter-container">
      <el-form>
          <el-row>
              <el-col :span="14">
                <el-form-item>
                  <span class="inputTip">选择区划:</span>
                  <linkage :level="level" :level_list="level_list" num="3" @change="linkageChange"
                  open="true"
                  :province_region_id="linkage.province_region_id"
                  :city_region_id="linkage.city_region_id"
                  :county_region_id="linkage.county_region_id"
                  :village_region_id="linkage.village_region_id"
                  :hamlet_region_id="linkage.hamlet_region_id"/>
                </el-form-item>
              </el-col>
          </el-row>
        <el-row>
            <el-form-item>
                <span class="inputTip">选择平台:</span>
                <el-select v-model="listQuery.platform" clearable style="width: 160px" class="filter-item" placeholder="选择平台" >
                  <el-option v-for="item in relations" :key="item.id" :label="item.name" :value="item.id"/>
                </el-select>
              <span class="inputTip" style="margin-left:10px;"> 状态:</span>
              <el-select v-model="listQuery.showStatus" clearable style="width: 160px" class="filter-item" placeholder="状态" >
                <el-option v-for="item in status" :key="item.id" :label="item.name" :value="item.id"/>
              </el-select>
              <el-button size="mini" type="primary" icon="el-icon-search" style="margin-left:10px;" @click="getList">查询</el-button>
              <el-button size="mini" type="primary" icon="el-icon-plus" @click="newsBanenr">新增</el-button>
            </el-form-item>

      </el-row>
      </el-form>
    </div>
    <el-table v-loading="listLoading" :key="tableKey" :data="list"  border highlight-current-row stripe>
      <!-- <el-table-column :index="indexMethod" align="center" label="序号" type="index" width="65"/> -->
      <el-table-column align="center" label="序号" type="index"/>
      <el-table-column align="center" label="平台" :formatter="platformFn"/>
      <el-table-column align="center" label="标题" prop="title"/>
      <el-table-column align="center" label="Banner图">
          <template slot-scope="scope">
              <img :src="scope.row.coverPic" alt="加载失败" class="coverPic">
          </template>
      </el-table-column>
      <el-table-column align="center" label="链接地址" prop="linkUrl"/>
      <el-table-column align="center" label="操作" min-width="160px" >
        <template slot-scope="scope">
          <el-button size="mini" type="primary" v-if="scope.row.showStatus==1" style="background:#23bab7;border-color:#23bab7;" @click="updtaBenner(scope.row)">修改</el-button>
          <el-button size="mini" type="primary" v-if="scope.row.showStatus==0" style="background:#23bab7;border-color:#23bab7;" @click="switchStatusFn(scope.row,1)">启用</el-button>
          <el-button size="mini" type="primary" v-if="scope.row.showStatus!=0" style="background:#23bab7;border-color:#23bab7;" @click="switchStatusFn(scope.row,0)">停用</el-button>
          <el-button size="mini" type="primary" v-if="scope.row.showStatus==1 && scope.$index>0" style="background:#23bab7;border-color:#23bab7;"  @click="move(scope,0)">上移</el-button>
          <el-button size="mini" type="primary" v-if="scope.row.showStatus==1 && scope.$index<(list.length-1)" style="background:#23bab7;border-color:#23bab7;" @click="move(scope,1)">下移</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination  v-if="total>listQuery.limit" :current-page="listQuery.page" :page-sizes="[10,20,30,50]" :page-size="listQuery.limit" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>
    <add-banner :visible.sync='visible' ref="addBanner" :bannerid="bannerid" @upData="getList"></add-banner>
  </div>
</template>

<script>
import { createArticle, updateArticle } from '@/api/article'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'
import linkage from '@/components/linkage'
import addBanner from '@/views/operate/addBanner'
import { mapState } from "vuex";

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
  components:{linkage,addBanner},
  data() {
    return {
      visible:false,
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      detailEdit: false,
      bannerid:'',
      listQuery: {
        page: 1,
        pageSize: 10,
        platform:1,
        showStatus:1,
        regionId:JSON.parse(localStorage.leaderarrs)[0].id,
      },
      linkage:{
          province_region_id:'',
          city_region_id:'',
          county_region_id:'',
          village_region_id:'',
          hamlet_region_id:'',
      },
      level_list: JSON.parse(localStorage.leaderarrs),
      level: localStorage.leaderLevel,
      relations: [
          {id:1,name:"App"},
          // {id:2,name:"微信"},
          // {id:0,name:"PC"}
      ],
      status: [{id:1,name:"启用"},{id:0,name:"停用"}],
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      showReviewer: false,
      dialogFormVisible: false,
      dialogStatus: '',
      dialogPvVisible: false,
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
      let id=JSON.parse(localStorage.leaderarrs)[0].id
      if(this.level==1){
          this.linkage.province_region_id=id
      }else if(this.level==2){
          this.linkage.city_region_id=id
      }else if(this.level==3){
          this.linkage.county_region_id=id
      }else if(this.level==4){
          this.linkage.village_region_id=id
      }else if(this.level==5){
          this.linkage.hamlet_region_id=id
      }
    this.getList()
  },
  computed: {
    ...mapState(["user"]),

  },
  methods: {
      move(scope,s){
          let data={
              id:scope.row.id,
              platform:scope.row.platform,
              sortNum:scope.row.sortNum,
              regionId:scope.row.regionId,
              upOrDown:s
          }
          this.$http.post('hts/management/upOrDown', data).then(res => {
              this.$message({
                message: '操作成功',
                type: 'success'
              })
              this.getList()

          })
      },
      switchStatusFn(row,s){
          let data={
              id:row.id,
              regionId:row.regionId,
              platform:row.platform,
              sortNum:row.sortNum,
              showStatus:s
          }
          this.$http.post('hts/management/stopOrStart', data).then(res => {
              this.$message({
                message: '操作成功',
                type: 'success'
              })
              this.getList()

          })
      },
      platformFn(row){
          let arr=this.relations.filter( (i, v,a) => {
              return i.id==row.platform
          })
          return arr[0].name
      },
      linkageChange(n, m, b){
          this.$refs.addBanner.linkDateChange(n)//告诉子组件修改了默认参数

          let num=true;
          for(let i=0;i<n.length;i++){
              if(n[i].id!=''){
                  num=false;
                  this.listQuery.regionId=n[i].id;
              }
          }
          if(num){
              this.listQuery.regionId=''
          }
          console.log(this.listQuery)
      },
      newsBanenr(){
          this.bannerid=''
          this.visible=true
          this.$refs.addBanner.reSet();
      },
      updtaBenner(row){
          if(row){
              this.bannerid=row.id;
              this.$refs.addBanner.getData(row.id);
              this.visible=true
          }

      },
    getList() {
        if(this.listQuery.regionId==''){
            this.$message({
              message: '查询失败,请选择区划',
              type: 'error'
            })
            return ;
        }
      this.listLoading = true
      this.$http.post('hts/management/getBannerList', this.listQuery).then(response => {
        this.list = response.list
        this.total = parseInt(response.total)
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
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
  .coverPic{
      width: 100%;
      height: auto;
      object-fit: cover;
  }
</style>
