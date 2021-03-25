<template>
  <div class="app-container">
    <div class="conheader clearfix" align="right">
      <h3>{{$route.meta.title}}</h3>
    </div>
    <div class="filter-container">
      <el-row :gutter="20">
        <el-col :span="8">
          <span>审核：</span>
          <el-select v-model="showList.checkStatus" clearable style="width: 160px" class="filter-item" placeholder="是否审核">
            <el-option v-for="item in levelOptions" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-col>
        <el-col :span="8">
          <span>贫困户：</span>
          <el-select v-model="showList.isPoor" clearable style="width: 160px" class="filter-item" placeholder="是否贫困户">
            <el-option v-for="item in isPoor" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-col>
        <el-col :span="8">
          <span>需求ID：</span>
          <el-input v-model="showList.id" style="width: 190px;" class="filter-item" placeholder="请输入需求ID"/>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="8">
          <span>代发人：</span>
          <el-input v-model="showList.publishName" style="width: 190px;" class="filter-item" placeholder="请输入代发人姓名"/>
        </el-col>
        <el-col :span="8">
          <span>受助人：</span>
          <el-input v-model="showList.aidedName" style="width: 190px;" class="filter-item" placeholder="请输入受助人姓名"/>
        </el-col>
        <el-col :span="8">
          <span>身份证：</span>
          <el-input v-model="showList.aidedIdCard" style="width: 190px;" class="filter-item" placeholder="请输入身份证号"/>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="8">
          <span>代发人手机号：</span>
          <el-input v-model="showList.publishTel" style="width: 190px;" class="filter-item" placeholder="请输入代发人手机号"/>
        </el-col>
        <el-col :span="8">
          <span>受助人手机号：</span>
          <el-input v-model="showList.aidederTel" style="width: 190px;" class="filter-item" placeholder="请输入受助人手机号"/>
        </el-col>
        
      </el-row>
      <el-row :gutter="20">

      <el-col :span="20" >
          <span>查询区域：</span>
          <linkage :level="level" :level_list="level_list" @change="linkageChange"/>
        </el-col>
      <el-col :span="4">
        <el-button v-waves class="filter-item"  type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
      </el-col>
          </el-row>
    </div>
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      stripe
      fit
      highlight-current-row
      style="width: 100%;min-height:400px;"
      height="400">
      <el-table-column align="center" label="序号" type="index" width="45" prop="id"/>
      <el-table-column width="150" label="需求标题" prop="demand_title"/>
      <el-table-column width="70" align="center" label="帮扶类型" prop="help_type_code">
      <template slot-scope="scope">
        <p v-if = "scope.row.help_type_code == '1'">教育需求</p>
        <p v-if = "scope.row.help_type_code == '2'">医疗需求</p>
        <p v-if = "scope.row.help_type_code == '3'">住房需求</p>
        <p v-if = "scope.row.help_type_code == '4'">物品需求</p>
      </template>
      </el-table-column>
      <el-table-column width="70" align="center" label="需求ID" prop="id"/>
      <el-table-column width="70" align="center" label="受助人" prop="aideder_name"/>
      <el-table-column width="150" align="center" label="受助人联系方式" prop="aideder_tel"/>
      <el-table-column width="150" align="center" label="受助人身份证号" prop="aideder_idcard"/>
      <el-table-column width="200" align="center" label="受助人地区" prop="region_name"/>
      <el-table-column width="200" align="center" label="是否贫困户" prop="is_poor">
        <template slot-scope="scope">
          <p v-if = "scope.row.is_poor == '1'">贫困户</p>
          <p v-if = "scope.row.is_poor == '0'">非贫困户</p>
        </template>
      </el-table-column>
      <el-table-column width="120" align="center" label="二者关系" prop="user_relation">
        <template slot-scope="scope">
          <p v-if = "scope.row.user_relation == '01'">本人</p>
          <p v-if = "scope.row.user_relation == '02'">我帮助的贫困户</p>
          <p v-if = "scope.row.user_relation == '03'">我认识的贫困户</p>
          <p v-if = "scope.row.user_relation == '04'">儿子</p>
          <p v-if = "scope.row.user_relation == '05'">女儿</p>
          <p v-if = "scope.row.user_relation == '06'">亲戚</p>
          <p v-if = "scope.row.user_relation == '07'">朋友</p>
          <p v-if = "scope.row.user_relation == '08'">丈夫</p>
          <p v-if = "scope.row.user_relation == '09'">妻子</p>
          <p v-if = "scope.row.user_relation == '10'">父亲</p>
          <p v-if = "scope.row.user_relation == '11'">母亲</p>
          <p v-if = "scope.row.user_relation == '12'">管理员代发</p>
          <p v-if = "scope.row.user_relation == '13'">其他</p>
        </template>
      </el-table-column>
      <el-table-column width="150" align="center" label="发布人联系方式" prop="publish_tel"/>
      <el-table-column width="100" align="center" label="审核状态">
        <template slot-scope="scope">
          {{scope.row.review_status | statusReview}}
        </template>
      </el-table-column>
      <el-table-column width="70" align="center" label="发布人" prop="publish_name"/>
      <el-table-column width="150" align="center" label="发布时间" prop="create_date"/>
      <el-table-column width="150" fixed="right" align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleSelectionChange(scope.row)">详情</el-button>
          <el-button size="mini" type="primary" v-if = "Number(scope.row.review_status) %2 === 0" @click="editDe(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <span style="float:left;line-height:34px;">共{{totalNum}}条数据</span>
      <el-pagination :current-page.sync="listQuery.page"
                     :page-size="listQuery.pageSize"
                     :total="total"
                     background layout=" prev, pager, next, jumper"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     v-if="total>listQuery.pageSize" />
    </div>
    <el-dialog :visible.sync="dialogDetail" class="checkDialog" title="审核需求">
      <el-tabs v-model="activeName">
        <el-tab-pane label="需求详情" name="first" style="height:400px;overflow-x: hidden;overflow-y: scroll;line-height: 30px;">
          <div>
            <span class="label">需求ID</span><span>{{currentItem.id}}</span>
          </div>
          <div>
            <span class="label">受助人</span><span>{{currentItem.aideder_name}}</span>
          </div>
          <div>
            <span class="label">受助人身份证号码</span><span>{{currentItem.aideder_idcard}}</span>
          </div>
          <div>
            <span class="label">受助人手机号码</span><span>{{currentItem.aideder_tel}}</span>
          </div>
          <div>
            <span class="label">所属地区</span><span>{{currentItem.region_name}}</span>
          </div>
          <div>
            <span class="label">发布人</span><span>{{currentItem.publish_name}}</span>
          </div>
          <div>
            <span class="label">发布人联系方式</span><span>{{currentItem.publish_tel}}</span>
          </div>
          <div>
            <span class="label">发布人与受助人关系</span>
            <span v-if = "currentItem.user_relation === '01'">本人</span>
            <span v-if = "currentItem.user_relation === '02'">我帮扶的贫困户</span>
            <span v-if = "currentItem.user_relation === '03'">我认识的贫困户</span>
            <span v-if = "currentItem.user_relation === '04'">儿子</span>
            <span v-if = "currentItem.user_relation === '05'">女儿</span>
            <span v-if = "currentItem.user_relation === '06'">亲戚</span>
            <span v-if = "currentItem.user_relation === '07'">朋友</span>
            <span v-if = "currentItem.user_relation === '08'">丈夫</span>
            <span v-if = "currentItem.user_relation === '09'">妻子</span>
            <span v-if = "currentItem.user_relation === '10'">父亲</span>
            <span v-if = "currentItem.user_relation === '11'">母亲</span>
            <span v-if = "currentItem.user_relation === '12'">邻居</span>
            <span v-if = "currentItem.user_relation === '13'">其他</span>
          </div>
          <div style="overflow: auto;">
            <p style="width: 140px;float: left;margin: 6px;">需求详情</p>
            <p style="width: 400px;float: left;margin: 6px;">{{currentItem.demand_coment}}</p>
          </div>
          <div v-if = 'currentItemTwo.demand_type == "2"'>
            <span class="label">目标金额</span><span>{{currentItem.target_amount}}</span>
          </div>
          <div v-if = 'currentItemTwo.demand_type == "2"'>
            <span class="label">资金用途</span><span>{{currentItemTwo.demand_use}}</span>
          </div>
          <div>
            <span class="label">需求动态</span><span></span>
          </div>
          <div>
            <!-- <p v-for="item in currentItemThree" style="margin-left:6px">{{item.op_date}}<span style="display:inline-block; width:50px"></span>{{item.op_result}}</p> -->
            <p v-for="(item,index) in currentItemThree" style="margin-left:6px" :key="item+index">
              {{item.op_date}}
              <span style="display:inline-block; width:50px"></span>
              {{item.op_result+'；操作人：'+item.staff_name}}
              <!-- <span style="display:inline-block; width:50px"></span>
              <el-button v-if="item.check_state==0" @click="logsDetail(item)">审核不通过原因</el-button> -->
            </p>
          </div>
          <div v-if = "Number(currentItem.review_status) %2 === 0" class="center">
            <el-button type="primary" @click="handleShenhe()">审核通过</el-button>
            <el-button type="danger" @click="handleShenheError()">审核不通过</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="相关图片" name="second" style="height:400px;overflow-x: hidden;overflow-y: scroll;line-height: 30px;display: none;">
          <el-carousel :interval="2000" arrow="always">
            <el-carousel-item v-for="item in relate_pics" :key="item">
              <h3><img class="imgs" :src="item"></h3>
            </el-carousel-item>
          </el-carousel>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
    <el-dialog :visible.sync="what" class="checkDialog" title="审核不通过原因">
      <el-form :model="opinions" :rules="rulesTwo" ref="ruleForm" style="height: 150px;">
        <el-form-item prop="opinion">
          <el-input type="textarea" v-model="opinions.opinion" :autosize="{ minRows: 6, maxRows:8}" placeholder="请输入原因"></el-input>
        </el-form-item>
      </el-form>
      <div class="center">
        <el-button @click="handlequxiao()">取消</el-button>
        <el-button type="primary" @click="handlequeren()">确认</el-button>
      </div>
    </el-dialog >
    <!-- 终极审核 -->
    <el-dialog :visible.sync="operatorVis" class="checkDialog" title="审核不通过原因">
      <el-form :model="operationOpinions" :rules="rulesOperation" ref="rulesOperation" style="height: 150px;">
        <el-form-item prop="opinion">
          <el-input type="textarea" v-model="operationOpinions.opinion" :autosize="{ minRows: 6, maxRows:8}" placeholder="请输入原因"></el-input>
        </el-form-item>
      </el-form>
      <div class="center">
        <el-button @click="handleOperation()">取消</el-button>
        <el-button type="primary"  @click="noOperation()">确认</el-button>
      </div>
    </el-dialog >
    <el-dialog :visible.sync="dialogFormVisible" title="编辑需求">
      <el-form ref="dataForm" :rules="rules" label-position="left" label-width="160px" style="width: 500px; margin-left:30px;">
        <el-form-item label="受助人" prop="aideder_name">
          <el-input v-model="msg.aideder_name" disabled  type="text" />
        </el-form-item>
        <el-form-item label="受助人身份证号" prop="aideder_idcard">
          <el-input v-model="msg.aideder_idcard" disabled  type="number" />
        </el-form-item>
        <el-form-item label="受助人电话号码" prop="aideder_tel">
          <el-input v-model="msg.aideder_tel" disabled  type="number" />
        </el-form-item>
        <el-form-item label="需求标题">
          <el-input v-model="msg.demand_title" type="text" />
        </el-form-item>
        <el-form-item label="需求内容">
          <el-input v-model="msg.demand_coment"  type="textarea" :autosize="{ minRows: 5, maxRows: 10}"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="end">取消</el-button>
        <!-- <el-button v-if="dialogStatus=='create'" type="primary" @click="createData('ruleform')">确定</el-button>-->
        <el-button type="primary" @click="updateData('ruleform')">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel"/>
        <el-table-column prop="pv" label="Pv"/>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">确定</el-button>
      </span>
    </el-dialog>
    <edit-alert v-if="visible" :id="alertID" :visible.sync="visible"></edit-alert>
  </div>
</template>

<script>
  import { fetchPv, createArticle, updateArticle } from '@/api/article'
  import waves from '@/directive/waves' // 水波纹指令
  import { parseTime } from '@/utils'
import linkage from "@/components/linkage";
import editAlert from "@/views/help/edit";

  export default {
    name: 'DemandCheckList',
    directives: {
      waves
    },
    components:{
    linkage,
    editAlert
    },
    filters: {
      statusReview(value){
        if(Number(value) %2 === 0){
          return '待审核'
        }else{
          return '审核不通过'
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
    inject:['reload'],
    data() {
      return {
        operatorVis:false,
        totalNum:0,
        alertID:'',
        visible:false,
        tableKey: 0,
        list: null,
        total: null,
        listLoading: true,
        msg:{},
        listQuery: {
          token : '',
          pageNum: 1,
          pageSize: 10,
        },
        showList: {
          isPoor: '',
          checkStatus: '',
          page:1,
          sort:3,
          pageSize:10,
          operationalReviewStatus:''
        },
        activeName: 'first',
        ReviewStatus:[
          {
            id:"",
            name:"全部"
          },{
            id: '2',
            name: '待审核'
          }, {
            id: '3',
            name: '已审核'
          }, {
            id: '0',
            name: '审核通过'
          }, {
            id: '1',
            name: '审核不通过'
          }
        ],
        levelOptions: [
          {
            id:"",
            name:"全部"
          },{
            id: '01',
            name: '待审核'
          }, {
            id: '02',
            name: '审核不通过'
          }
        ],
        isPoor: [{id:'',name:"全部"},{ id: 1, name: '贫困户' }, { id: 0, name: '非贫困户' }],
        isOneself: [{ id: 1, name: '本人' }, { id: 0, name: '不是本人' }],
        showReviewer: false,
        currentItem: { id: '33' },
        currentItemTwo: {},
        currentItemThree: {},
        temp: {
          id: undefined,
          importance: 1,
          remark: '',
          timestamp: new Date(),
          title: '',
          type: '错误',
          status: 'published'
        },
        dialogFormVisible: false,
        dialogDetail: false,
        relate_pics: [],
        // dialogStatus: '',
        // textMap: {
        //   update: 'Edit',
        //   create: 'Create'
        // },
        dialogPvVisible: false,
        pvData: [],
        rulesTwo: {
          opinion: [
            { required: true, message: '请输入审核不通过原因', trigger: 'blur' },
            { min: 5, max: 100, message: '最少5个字符，最多100个字符', trigger: 'blur' }
          ]
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          demand_title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
          demand_coment: [{ required: true, message: '请输入内容', trigger: 'blur' }],
          target_amount: [{ required: true, message: '请输入金额', trigger: 'blur' }],
          remark: [{ required: true, message: '请输入用途', trigger: 'blur' }]
        },
        downloadLoading: false,
        shenhe:false,
        what:false,
        opinions: {
          opinion: ''
        },
        operationOpinions: {
          opinion: ''
        },
        rulesOperation: {
          opinion: [
            { required: true, message: '请输入审核不通过原因', trigger: 'blur' },
            { min: 5, max: 100, message: '最少5个字符，最多100个字符', trigger: 'blur' }
          ]
        },
        user_level: null,
        level_list: JSON.parse(localStorage.leaderarrs),
        level: localStorage.leaderLevel,
        rowObj:{}
      }
    },
    created() {
      this.getListCha()
      this.wait();
    },
    methods: {
      why(row){
        this.rowObj={}
        this.operatorVis=true;
        this.rowObj=row
      },
      handleOperation(){
        this.operatorVis=false;
        this.operationOpinions.opinion=''
      },
      noOperation(){
        this.$refs['rulesOperation'].validate((valid) => {
          if (valid) {

            this.operationAudit(this.rowObj.id,1,this.operationOpinions.opinion)
          }
        })
      },
      operationAudit(demandId,reviewStatus,reviewResult){
        let data={
           demandId:demandId,
           reviewStatus:reviewStatus,//审核状态 0:通过,1未通过
           reviewResult:reviewResult//审核不通过原因
        }
        this.$http.post('hts/management/finallyReview',data).then(res => {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.operatorVis = false
          this.getListCha()
        })
      },
      editDe(row){
        this.alertID=row.id
        console.log(this.alertID)
        this.visible=true
      },
      wait() {
        this.$http.post('hts/management/deskHead',).then(response => {
          this.$store.commit('SET_WAIT', parseInt(response.auditedDemandCount))
          this.$store.commit('SET_ADMIN', parseInt(response.auditedManagerCount))
          localStorage.totalT = parseInt(response.presentedDemandCount)
        })
      },
      linkageChange(n, m, b) {
        this.showList.regionOneId = b;
        // this.listQuery.pId = n[0].id
        // this.listQuery.cId = n[1].id
        // this.listQuery.xId = n[2].id
        // this.listQuery.vId = n[3].id
        // this.listQuery.hId = n[4].id
      },
      end(){
        this.dialogFormVisible = false
        this.getListCha()
        this.msg = {}
      //  this.reload()
      },
      getListCha() {
        if(this.$route.query.id) {
          this.showList.checkStatus = this.$route.query.id
          this.$route.query.id = ''
        }
        this.$http.post('hts/management/showList', this.showList).then(res => {
          this.list = res.vos
          this.total = parseInt(res.totals)
          this.totalNum=parseInt(res.totals)
          this.listLoading = false
          if(res.vos.length==0 && this.showList.page!=1){
            this.showList.page=this.showList.page - 1;
            this.getListCha()
          }
        })
      },
      handleFilter() {
        this.getListCha()
      },
      handleShenhe(){
        this.$http.post('/hts/management/isPass', {
          id: this.currentItem.id,
          isCheck: 1
        }).then(response => {
          var wait = this.$store.state.user.wait - 1
          this.$store.commit('SET_WAIT', wait)
          this.dialogDetail = false
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.listLoading = false
          this.getListCha()
        })
      },
      handlequxiao(){
        this.what = false
      },
      handlequeren(){
        if(this.opinions.opinion.length >= 5 && this.opinions.opinion.length <= 100){
          this.$http.post('hts/management/isPass', {
            id: this.currentItem.id,
            isCheck: 0,
            opinion: this.opinions.opinion
          }).then(response => {
            var wait2 = this.$store.state.user.wait - 1
            this.$store.commit('SET_WAIT', wait2)
            this.what = false
            this.dialogDetail =false
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.getListCha()
          })
        }
      },
      handleShenheError(){
        this.what = true;
      },
      handleSizeChange(val) {
        this.showList.pageSize = val
        this.getListCha()
      },
      handleCurrentChange(val) {
        this.showList.page = val
        this.getListCha()
      },
      handleModifyStatus(row, status) {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        row.status = status
      },
      handleSelectionChange(val) {
        this.dialogDetail = true
        this.currentItem = val
        if(val.relate_pics == '') {
          this.relate_pics = []
        }else{
          this.relate_pics = val.relate_pics.split(',')
        }
        this.$http.post('hts/help/detail', { demand_id: this.currentItem.id }).then(response => {
          this.currentItemTwo = response
        })
        this.$http.post('/hts/management/logs', {
          demandId: this.currentItem.id
        }).then(response => {
          this.currentItemThree = response
        })
      },
      editDemand(obj) {
        this.msg = {}
        this.msg = obj

        this.dialogFormVisible = true
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
        this.$http.post('hts/help/detail', { demand_id: row.id }).then(response => {
          this.currentItem = response
          this.dialogDetail = true
        })
      },
      updateData(dataForm) {
        if(this.msg.demand_coment || this.msg.demand_title){
          this.$http.post('/hts/management/updateDetail',{
            id:this.msg.id,
            demandComent:this.msg.demand_coment,
            demandTitle:this.msg.demand_title,
          }).then(res => {
            this.$message({
              showClose: true,
              message: '修改成功',
              type: 'success'
            })
            this.dialogFormVisible = false
           // this.reload()
            this.getListCha()
            this.msg = {}
          })
        }
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
      handleFetchPv(pv) {
        fetchPv(pv).then(response => {
          this.pvData = response.data.pvData
          this.dialogPvVisible = true
        })
      },
    }
  }
</script>
<style scoped>
  .label {width:140px;display:inline-block;margin:6px}
  .checkDialog >>> .el-dialog__body{padding-top:0px }
  .center{text-align: center}
  .img_span{width: 100%;float: left;}
  .img_span .imgs{
    display:block;width:100%;height: 250px;
  }
  .filter-container span{
    line-height: 50px;
    font-size: 14px;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
    height:300px;
  }
  .el-carousel__item h3 img{
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    width: 100%;
    height: 100%;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
