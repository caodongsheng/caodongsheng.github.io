<template>
  <div class="app-container">
    <div class="conheader clearfix" align="right">
      <h3>{{$route.meta.title}}</h3>
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="editDemandExc"
        style="background:#23bab7;border-color:#23bab7;"
      >导出</el-button>
    </div>
    <div class="filter-container">
      <el-row :gutter="20">
        <el-col :span="8">
          <span>扶贫干部:</span>
          <el-input
            v-model="listQuery.adminUsername"
            placeholder="扶贫干部"
            style="width: 160px"
            class="filter-item"
          ></el-input>
        </el-col>
        <el-col :span="8">
          <span>受助贫困户:</span>
          <el-input
            v-model="listQuery.porvertName"
            placeholder="受助贫困户"
            style="width: 160px"
            class="filter-item"
          ></el-input>
        </el-col>
        <el-col :span="8">
          <span>帮扶类型:</span>
          <el-select
            v-model="listQuery.itemType"
            clearable
            style="width: 160px"
            class="filter-item"
            placeholder="请选择"
          >
            <el-option
              v-for="item in helpType"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <span>确认状态:</span>
          <el-select
            v-model="listQuery.publishStatus"
            clearable
            style="width: 160px"
            class="filter-item"
            placeholder="请选择"
          >
            <el-option
              v-for="item in zhuangtai"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-col>
        <el-col :span="8">
          <span>帮扶形式:</span>
          <el-select
            v-model="listQuery.isOrg"
            clearable
            style="width: 160px"
            class="filter-item"
            placeholder="请选择"
          >
            <el-option
              v-for="item in helpForm"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col>
          <span>录入时间:</span>
          <el-date-picker
            v-model="listQuery.startCreatTime"
            type="date"
            placeholder="请选择开始日期"
            :picker-options="pickerOptionsStart"
            value-format="yyyy-MM-dd"
          ></el-date-picker> —
          <el-date-picker
            v-model="listQuery.endCreatTime"
            type="date"
            placeholder="请选择结束日期"
            :picker-options="pickerOptionsEnd"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col>
          <span>确认时间:</span>
          <el-date-picker
            v-model="listQuery.startCheckDateTime"
            type="date"
            placeholder="请选择开始日期"
            :picker-options="pickerStart"
            value-format="yyyy-MM-dd"
          ></el-date-picker> —
          <el-date-picker
            v-model="listQuery.endCheckDateTime"
            type="date"
            placeholder="请选择结束日期"
            :picker-options="pickerEnd"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="20" >
          <span>查询区域:</span>
          <linkage :level="level" :level_list="level_list" @change="linkageChange" />
        </el-col>
        <el-col :span="4">
          <el-button
            v-waves
            class="filter-item"
            type="primary"
            icon="el-icon-search"
            @click.native="handleFilter"
          >查询</el-button>
        </el-col>
      </el-row>
    </div>
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      stripe
      border
      highlight-current-row
      style="width: 100%;min-height:400px;"
      height="auto"
      @selection-change="selectionRowsChange"
    >
      <!-- <el-table-column type="selection" width="55"></el-table-column> -->
      <el-table-column align="center" label="序号" type="index" width="65" />
      <el-table-column min-width="150" align="center" label="需求ID" prop="publishId" />
      <el-table-column min-width="150" align="center" label="扶贫干部" prop="adminUsername" />
      <el-table-column min-width="150" :show-overflow-tooltip="true" align="center" label="受助贫困户" prop="povertyName" />
      <el-table-column min-width="150" align="center" label="所属地区" prop="adminRegionname" />
      <el-table-column min-width="150" align="center" label="录入时间" prop="createTime" />
      <el-table-column min-width="150" align="center" label="确认时间" prop="checkDatetime" />
      <el-table-column min-width="150" align="center" label="确认状态">
        <template slot-scope="scope">
          <p>{{getRegions(scope.row)}}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="150" align="center" label="需求类型">
        <template slot-scope="scope">
          <p>{{getType(scope.row)}}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="150" align="center" label="帮扶形式">
        <template slot-scope="scope">
          <p>{{getIsOrg(scope.row)}}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="150" align="center" label="帮扶企业/组织" prop="orgName" />
      <el-table-column width="300" fixed="right" align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleDetial(scope.row.publishId)" style="background:#ffc71d;border-color:#ffc71d;">详情</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="updateTomanager(scope.row)"
            v-if="level<=3 && scope.row.publishStatus!=1"
            style="background:#23bab7;border-color:#23bab7;"
          >编辑</el-button>
          <el-button
            size="mini"
            type="primary"
             v-if="level<=3"
            style="background:#23bab7;border-color:#23bab7;"
            @click="opera(scope.row.publishId)"
          >操作日志</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
        <span style="float:left;line-height:34px;">共{{totalNum}}条数据</span>
      <el-pagination
        :current-page="listQuery.currentPageNo"
        v-if="total>listQuery.pageSize"
        :page-size="listQuery.pageSize"
        :total="total"
        background
        layout=" prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
      <span class="warnspan">仅能查看2000以内的数据，若需查看更多，请导出数据查看！</span>
    </div>
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
      </div>-->
      <el-card>
        <div class="exportdiv" v-for="(item,index) in exportarr" :key="item.url">
          <span class="m">第{{index+1}}页:第{{item.from}}条——第{{item.to}}条</span>
          <el-button
            type="primary"
            icon="el-icon-download"
            class="exportbutton"
            @click="downloadFile(item.url)"
          >下载</el-button>
        </div>
      </el-card>
    </el-dialog>
    <el-dialog :visible.sync="detailvis" title="户帮户亲帮亲详情">
      <el-row class="pd">
        <el-col :span="4">需求ID:</el-col >
        <el-col :span="12">{{detailObj.publishId}}</el-col>
      </el-row>
      <el-row class="pd">
        <el-col :span="4">需求图片:</el-col >
        <el-col :span="20">
          <img :src="item" alt="" @click="imgclick(item)"  v-for="item in imgList" :key="item" style="cursor:-webkit-zoom-in;width:100px;height:100px;float:left;">
        </el-col>
      </el-row>
      <el-row class="pd">
        <el-col :span="4">管理员姓名:</el-col >
        <el-col :span="12">{{detailObj.adminUsername}}</el-col>
      </el-row>
      <el-row class="pd">
        <el-col :span="4">管理员手机:</el-col >
        <el-col :span="12">{{detailObj.adminMobile}}</el-col>
      </el-row>
      <el-row class="pd">
        <el-col :span="4">贫困户姓名:</el-col >
        <el-col :span="12">{{detailObj.povertyName}}</el-col>
      </el-row>
      <el-row class="pd">
        <el-col :span="4">所属地区:</el-col >
        <el-col :span="12">{{detailObj.adminRegionname}}</el-col>
      </el-row>
      <el-row class="pd">
        <el-col :span="4">帮扶类型:</el-col >
        <el-col :span="12">{{detailObj.isOrg==1?'集体帮扶':'一对一帮扶'}}</el-col>
      </el-row>
      <el-row class="pd" v-if="detailObj.isOrg==1">
        <el-col :span="4">企业名称:</el-col >
        <el-col :span="12">{{detailObj.orgName}}</el-col>
      </el-row>
      <el-row class="pd">
        <el-col :span="4">物品:</el-col >
        <el-col :span="12">{{detailObj.article==null?'0':detailObj.article}}件</el-col>
      </el-row>
      <el-row class="pd" >
        <el-col :span="4">服务:</el-col >
        <el-col :span="16" style="border:1px solid #ccc">
          <el-row style="border-bottom:1px solid #ccc">
            <el-col :span="6" class="pd" style="padding-left:10px;border-right:1px solid #ccc">陪护照看</el-col >
            <el-col :span="18" class="pd">{{detailObj.care==null?'0':detailObj.care}}次</el-col >
          </el-row>
          <el-row style="border-bottom:1px solid #ccc">
            <el-col :span="6" class="pd" style="padding-left:10px;border-right:1px solid #ccc">心理健康</el-col >
            <el-col :span="18" class="pd">{{detailObj.health==null?'0':detailObj.health}}次</el-col >
          </el-row> 
          <el-row style="border-bottom:1px solid #ccc">
            <el-col :span="6" class="pd" style="padding-left:10px;border-right:1px solid #ccc">环境卫生</el-col >
            <el-col :span="18" class="pd">{{detailObj.clean==null?'0':detailObj.clean}}次</el-col >
          </el-row>
           <el-row style="border-bottom:1px solid #ccc">
            <el-col :span="6" class="pd" style="padding-left:10px;border-right:1px solid #ccc">医疗服务</el-col >
            <el-col :span="18" class="pd">{{detailObj.medical==null?'0':detailObj.medical}}次</el-col >
          </el-row>
          <el-row>
            <el-col :span="6" class="pd" style="padding-left:10px;border-right:1px solid #ccc">其他服务</el-col >
            <el-col :span="18" class="pd">{{detailObj.other==null?'0':detailObj.other}}次</el-col >
          </el-row>
        </el-col>
      </el-row>
      <el-row class="pd">
        <el-col :span="4">资金:</el-col >
        <el-col :span="12">{{detailObj.funds==null?'0':detailObj.funds}}元</el-col>
      </el-row>
      <el-row class="pd">
        <el-col :span="4">需求描述:</el-col >
        <el-col :span="12">{{decodeURI(detailObj.publishInfo)}}</el-col>
      </el-row>
    </el-dialog>
    <el-dialog :visible.sync="operationvis" title="操作日志" >
      <el-table
        :data="operaList"
        border
        style="width: 100%">
        <el-table-column align="center" label="序号" type="index" width="65" />
        <el-table-column
          prop="publishId"
          label="需求ID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="changeTime"
          label="变更时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="changeUsername"
          label="变更人">
        </el-table-column>
        <el-table-column
          prop="message"
          label="变更内容">
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog :visible.sync="dialogFormVisibleAdd" title="编辑需求">
      <el-form
        ref="ruleForm"
        :rules="upData"
        :model="upData"
        label-position="left"
        label-width="100px"
        style=" margin-left:30px;"
      >
        <el-form-item label="需求详情" prop="realname">
          <el-input
            v-model="upData.publishInfo"
            type="textarea"
            :rows="6"
            placeholder="请输入内容"
            :readonly="readonlyname"
          />
        </el-form-item>
        {{imgUpList.length}}
        <el-form-item label="需求图片" >
           <div class="imgs">
              <div class="position"  v-for="(item,index) in imgUpList" :key="item+index">
                  <div class="end" @click="deteleImg(item,index)">
                      <span></span>
                  </div>
                  <img :src="item"  alt="">
              </div>
              <div v-show="imgUpList.length<3">
                <el-upload
                  class="avatar-uploader"
                  :action="action"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <i class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              </div>
          </div>
        </el-form-item>
        </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="endAdd">关闭</el-button>
        <el-button type="primary" @click="submitForm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import waves from "@/directive/waves"; // 水波纹指令
import axios from 'axios'
import linkage from "@/components/linkage";
import { fetchPv, createArticle, updateArticle } from "@/api/article";
import { parseTime } from "@/utils";
import urlFunction from "../../api/urlFun.js";
import linkages from "@/components/linkageChange";

import { mapState } from "vuex";
import "element-ui/lib/theme-chalk/index.css";
import downloadfile from "../../utils/downloadfile.js";
import { Loading } from "element-ui";
export default {
  name: "DemandList",
  directives: {
    waves
  },
  components: {
    linkage,
    linkages
  },
  data() {
    let validID = (rule, value, callback) => {
      if (value == "" || value == undefined) {
        return callback();
      } else {
        let reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
        if (!reg.test(value)) {
          return callback(new Error("身份证号码不正确"));
        } else {
          return callback();
        }
      }
    };
    return {
      readonlyname: false,
      manager_id: "",
      totalNum:0,
      imgUpList:[],
      action:process.env.BASE_API+'/cfs/file/uploads',
      addUser: {
        realname: "",
        is_certification: 0,
        user_level: "",
        user_id: "",
        idcard: "",
        region: ""
        //  territoryId: "",
        //  territory: ""
      },
      upData: {
        realname: [{ required: true, message: "请输入详情", trigger: "blur" }],
        
      },
      detailvis:false,
      operationvis:false,
      dialogFormVisibleAdd: false,
      exportVisible: false,
      loadingInstance: null,
      operaList:[],
      exportpageSize: 10000,
      exportarr: [],
      selectarr: [],
      typeOptions: [],
      detailObj:{},
      level_list: JSON.parse(localStorage.leaderarrs),
      level: localStorage.leaderLevel,
      activeName: "first",
      tableKey: 0,
      list: [],
      total: null,
      comMent: null,
      isAddImgShow: true,
      imgArr: [],
      listLoading: false,
      dialogAiVisible: false,
      fileList: [],
      fileList2: [],
      dialogStatus: null,
      relate_pics: [],
      listQuery: {
        adminUsername: "",
        porvertName:"",
        isOrg:"",
        region_id: "",
        startCreatTime: "",
        startCheckDateTime:"",
        itemType:"",
        endCreatTime: "",
        publishStatus: "",//確認狀態
        currentPageNo: 1,
        pageSize: 20,
        itemClassify:"",
        endCheckDateTime:"",
        region_id:JSON.parse(localStorage.leaderarrs)[0].id
      },
      pickerOptionsStart: {
        disabledDate: time => {
          let endDateVal = this.listQuery.endCreatTime;
          if (endDateVal != "") {
            return time.getTime() > new Date(endDateVal).getTime();
          } else {
            return time.getTime() > Date.now();
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: time => {
          let beginDateVal = this.listQuery.startCreatTime;
          if (beginDateVal != "") {
            return (
              time.getTime() <
                new Date(beginDateVal).getTime() - 1 * 1000 * 24 * 60 * 60 ||
              time.getTime() > Date.now()
            );
          } else {
            return time.getTime() > Date.now();
          }
        }
      },
      pickerStart: {
        disabledDate: time => {
          let endDateVal = this.listQuery.endCheckDateTime;
          if (endDateVal != "") {
            return time.getTime() > new Date(endDateVal).getTime();
          } else {
            return time.getTime() > Date.now();
          }
        }
      },
      pickerEnd: {
        disabledDate: time => {
          let beginDateVal = this.listQuery.startCheckDateTime;
          if (beginDateVal != "") {
            return (
              time.getTime() <
                new Date(beginDateVal).getTime() - 1 * 1000 * 24 * 60 * 60 ||
              time.getTime() > Date.now()
            );
          } else {
            return time.getTime() > Date.now();
          }
        }
      },
      detail: {},
      props: {
        value: "id",
        label: "regionName",
        children: "cities"
      },
      rules: {
        demand_title: [
          {
            required: true,
            message: "请输入标题",
            trigger: "blur"
          }
        ],
        demand_coment: [
          {
            required: true,
            message: "请输入内容",
            trigger: "blur"
          }
        ],
        target_amount: [
          {
            required: true,
            message: "请输入金额",
            trigger: "blur"
          }
        ],
        remark: [
          {
            required: true,
            message: "请输入用途",
            trigger: "blur"
          }
        ]
      },
      queryType: [
        {
          id: "name",
          name: "姓名"
        },
        {
          id: "idcord",
          name: "身份证号"
        },
        {
          id: "phone",
          name: "贫困户手机号"
        }
      ],
      isPoorOptions: [
        {
          id: "",
          name: "全部"
        },
        {
          id: "0",
          name: "非贫困户"
        },
        {
          id: "1",
          name: "贫困户"
        }
      ],
      isCardeOptions: [
        {
          id: "",
          name: "全部"
        },
        {
          id: "1",
          name: "干部"
        },
        {
          id: "0",
          name: "非干部"
        }
      ],
      userstatusList: [
        {
          id: "",
          name: "全部"
        },
        {
          id: "0",
          name: "冻结"
        },
        {
          id: "1",
          name: "正常"
        }
      ],
      leixing: [
        {
          id: "1",
          name: "省级管理员"
        },
        {
          id: "2",
          name: "市级管理员"
        },
        {
          id: "3",
          name: "县级管理员"
        },
        {
          id: "4",
          name: "乡级管理员"
        },
        {
          id: "5",
          name: "村级管理员"
        },
        {
          id: "6",
          name: "超级县级管理员"
        },
        {
          id: "7",
          name: "爱心人士"
        },
        {
          id: "8",
          name: "贫困户"
        },
        {
          id: "9",
          name: "慈善组织"
        },
        {
          id: "10",
          name: "非公募组织"
        },
        { id: "11", name: "企业" },
        {
          id: "12",
          name: "学校"
        },
        {
          id: "13",
          name: "政府"
        }
      ],
      zhuangtai: [
        {
          id: "",
          name: "全部"
        },
        {
          id: "1",
          name: "已确认"
        },
        {
          id: "0",
          name: "待确认"
        },
      ],
      helpType: [
        {
          id: "",
          name: "全部"
        },
        {
          id: "0",
          name: "物品"
        },
        {
          id: "1",
          name: "服务"
        },
        {
          id: "2",
          name: "资金"
        },
      ],
      helpForm: [
        {
          id: "",
          name: "全部"
        },
        {
          id: "0",
          name: "一对一帮扶"
        },
        {
          id: "1",
          name: "集体帮扶"
        },
      ],
      currentItem: {
        id: "33"
      },
      currentItem2: {
        id: "33"
      },
      upData:{},
      currentItem3: { id: "33" },
      currentItem4: { id: "33" },
      dialogDetail: false,
      dialogFormVisible: false,
      selectedOptions: [],
      user_level: null,
      aiList: null,
      totalAi: null,
      tips: "提醒一下",
      result: [],
      addoptlevel: 0,
      imgUploadArg: {},
      excelData: [],
      imgList:[],
      id:''
    };
  },
  created() {
    this.getList();
  },
  computed: {
    ...mapState(["user"]),
    userLevelAdd() {
      const arr = [];
      const level = Number(this.level);
      switch (level) {
        case 1:
          arr.push(
            { id: 2, name: "市级管理员", optlevel: 3 },
            { id: 3, name: "县级管理员", optlevel: 2 },
            { id: 4, name: "乡级管理员", optlevel: 1 },
            { id: 5, name: "村级管理员", optlevel: 0 }
          );
          break;
        case 2: //市级管理员
          arr.push(
            { id: 3, name: "县级管理员", optlevel: 2 },
            { id: 4, name: "乡级管理员", optlevel: 1 },
            { id: 5, name: "村级管理员", optlevel: 0 }
          );
          break;
        case 3: //县级管理员
          arr.push(
            { id: 4, name: "乡级管理员", optlevel: 1 },
            { id: 5, name: "村级管理员", optlevel: 0 }
          );
          break;
        case 4: //乡级管理员
          arr.push({ id: 5, name: "村级管理员", optlevel: 0 });
          break;
        case 5: //乡级管理员
          arr.push({ id: 5, name: "村级管理员", optlevel: 0 });
          break;
      }
      return arr;
    }
  },
  methods: {
      imgclick(url){
        window.open(url)
      },
     beforeAvatarUpload(e,a){
            console.log('1231231312312',e,a)
        },
      handleRemove(file) {
        console.log(file);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleDownload(file) {
        console.log(file);
      },
      opera(id){
        this.operaList=[]
        this.operationvis=true;
          this.$http.get("/tas/hunan/selectLogList?currentPageNo=1&pageSize=100&publishId="+id)
              .then(res => {
                console.log(res)
                  this.operaList=res
              })
      },
    submitForm(formName) {
            console.log(this.imgUpList)
            let str=this.imgUpList.join(",")
            let userid=this.$store.state.user.userid
            let username=this.$store.state.user.real_name
            let data={
              adminUserid:userid,
              adminUsername:username,
              id:this.id,
              publishInfo:encodeURI(this.upData.publishInfo),
              publishImages:str
            }
            this.$http.post("/tas/hunan/updateById",data)
              .then(res => {
                this.$notify({
                  title: "成功",
                  message: "保存成功",
                  type: "success"
                });
                this.dialogFormVisibleAdd = false;
                this.getList()
              });
         
    },
    async detailchangeadd(n, i, id) {
      let territoryname = "";
      await this.$http
        .post("/eai/authRegion/getAllParentId", {
          regionId: id
        })
        .then(function(res) {
          if (res[0]) {
            for (let i = 0; i < res.length; i++) {
              territoryname += res[i].regionName + "-";
            }
          }
        });
      let endname = "";

      for (let j = n.length - 1; j >= 0; j--) {
        if (n[j].regionName !== "") {
          endname = n[j].regionName;
          break;
        }
      }
      // this.addUser.territory = territoryname + endname;
      // this.addUser.territoryId = id;
      this.addUser.region = id + ":" + territoryname + endname;
    },
    selectionRowsChange(value) {
      this.selectarr = value;
    },
    endAdd() {
      this.dialogFormVisibleAdd = false;
      this.addUser = {
        realname: "",
        is_certification: 0,
        user_level: "",
        user_id: "",
        region: ""
      };
    },
    updateTomanager(data) {
      this.id=data.publishId
      this.dialogFormVisibleAdd = true;
      this.upData.publishInfo=decodeURI(data.publishInfo);
      this.imgUpList=[];
      this.imgUpList=data.publishImages.split(',')
    },
    getOptLevel(value) {
      let index = this.userLevelAdd.findIndex(opt => opt.id === value);
      this.addoptlevel = this.userLevelAdd[index].optlevel;
    },
    canUpdate(data) {
      if (
        Number(data.user_status) === 1 &&
        Number(data.is_cadre) === 0 &&
        localStorage.leaderLevel < 5
      ) {
        return true;
      }
      return false;
    },
    downloadFile(url) {
      downloadfile.fileDownload(url, {
        prepareCallback: function(url) {
          this.loadingInstance = Loading.service({
            fullscreen: true,
            text: "下载时间较长，请耐心等待..."
          });
        },
        successCallback: function(url) {
          this.loadingInstance.close();
        },
        failCallback: function(html, url) {
          this.loadingInstance.close();
        }
      });
    },
    type(value) {
      if (Number(value.is_poor) === 0 && Number(value.is_cadre) === 0) {
        return `非贫困户,非干部`;
      } else if (Number(value.is_poor) === 1 && Number(value.is_cadre) === 1) {
        return `贫困户,干部`;
      } else if (Number(value.is_poor) === 0 && Number(value.is_cadre) === 1) {
        return `非贫困户,干部`;
      } else if (Number(value.is_poor) === 1 && Number(value.is_cadre) === 0) {
        return `贫困户,非干部`;
      } else {
        return `爱心人士`;
      }
    },
    getRegions(value) {
      let a
      if(value.publishStatus==1){
        a= '已确认'
      }else if(value.publishStatus==0){
        a= '待确认'
      }else{
        a = '111'
      }
      return a
    },
    getType(value) {
      let a=''
      if(value.article>0){
        a += ' 物品, '
      }
      if(value.funds>0){
        a += ' 资金, '
      }
      if(value.service>0){
        a += ' 服务 '
      }
      return a
    },
    getIsOrg(value) {
      let a
      if(value.isOrg==1){
        a = '集体帮扶'
      }else{
        a = '一对一帮扶'
      }
      return a
    },
    editDemandExc() {
      if (this.selectarr.length > 0) {
        let idarr = [];
        this.selectarr.forEach(val => {
          idarr.push(val.id);
        });
        let idstr = idarr.join(",");
        // window.location.href = `http://dev2.fpmai.com/ets/excel/userExcelDown?token=${this.user.token}&id=${
        //  idstr
        // }`;
        let obj = {};
        obj.token = this.user.token;
        obj.id = idstr;
        console.log('111111111111',idstr)
        this.exporthandler(
          process.env.BASE_API +
            `/ets/excel/hunanExcelDown?token=${this.user.token}&id=${idstr}`,
          obj
        );
      } else {
        let urlobj = { 
          adminRegionid:this.listQuery.region_id,
          pageSizes:this.exportpageSize,
          currentPageNo:this.listQuery.currentPageNo,
          publishStatus:this.listQuery.publishStatus,
          isOrg:this.listQuery.isOrg,
          adminUsername:this.listQuery.adminUsername,
          startCreatTime:this.listQuery.startCreatTime,
          startCheckDateTime:this.listQuery.startCheckDateTime,
          porvertName:this.listQuery.porvertName,
          itemType:this.listQuery.itemType,
          itemClassify:this.listQuery.itemClassify,
          endCreatTime:this.listQuery.endCreatTime,
          endCheckDateTime:this.listQuery.endCheckDateTime
        };
        urlFunction(urlobj).then(res => {
          let data = res.join("&").replace(/\"/g, "");
          let datastr = data == "" ? "" : "&" + data;
          // window.location.href = `http://dev2.fpmai.com/ets/excel/userExcelDown?token=${this.user.token}&${data}`
          let obj = { 
            adminRegionid:this.listQuery.region_id,
            currentPageNo:this.listQuery.currentPageNo,
            pageSizes:this.listQuery.pageSize,
            publishStatus:this.listQuery.publishStatus,
            isOrg:this.listQuery.isOrg,
            adminUsername:this.listQuery.adminUsername,
            startCreatTime:this.listQuery.startCreatTime,
            startCheckDateTime:this.listQuery.startCheckDateTime,
            porvertName:this.listQuery.porvertName,
            itemType:this.listQuery.itemType,
            itemClassify:this.listQuery.itemClassify,
            endCreatTime:this.listQuery.endCreatTime,
            endCheckDateTime:this.listQuery.endCheckDateTime
           };
          obj.token = this.user.token;
          this.exporthandler(
            process.env.BASE_API +
              `/ets/excel/hunanExcelDown?token=${this.user.token}${datastr}`,
            obj
          );
        });
      }
    },
    async exporthandler(url, obj) {
      let pagetotal = 0;
      let exporttotal = 0;
      await this.$http
        .post("/tas/hunan/selectPublishListSize", obj)
        .then(response => {
          console.log(response)
           if(response.totals==0){
             this.$message({
            showClose: true,
            message: "没有符合条件的数据，无法导出!",
            type: "error"
          });
            return;
          }
          this.exportVisible = true;
          exporttotal = response;
          if (
            exporttotal < this.exportpageSize ||
            exporttotal == this.exportpageSize
          ) {
            pagetotal = 1;
            this.exportarr = [
              { url: url + "&currentPageNo=1", currentPageNo: 1, from: 1, to: exporttotal }
            ];
          } else {
            pagetotal = Math.ceil(exporttotal / this.exportpageSize);
            for (let i = 0; i < pagetotal; i++) {
              let num = i + 1;
              if (i < pagetotal - 1) {
                this.exportarr.push({
                  url: url + "&currentPageNo=" + num ,
                  currentPageNo: num,
                  from: i * this.exportpageSize + 1,
                  to: num * this.exportpageSize
                });
              } else {
                this.exportarr.push({
                  url: url + "&currentPageNo=" + num,
                  currentPageNo: num,
                  from: i * this.exportpageSize + 1,
                  to: exporttotal
                });
              }
            }
          }
        });
    },
    closeexport() {
      this.exportarr = [];
    },
    linkageChange(n) {
      let arr = [];
      if (n[0].id) {
        arr.push(n[0].id);
      }
      if (n[1].id) {
        arr.push(n[1].id);
      }
      if (n[2].id) {
        arr.push(n[2].id);
      }
      if (n[3].id) {
        arr.push(n[3].id);
      }
      if (n[4].id) {
        arr.push(n[4].id);
      }
      this.listQuery.region_id = arr[arr.length - 1];
    },
    deteleImg(item,index){
        this.imgUpList.splice(index,1)
    },
    handleAvatarSuccess(e,a){
        console.log('asdas',e,a)
        if(e.status==200){
            this.imgUpList.push(e.urls)
        }else{
            alert('图片上传失败')
        }
    },
    async getList() {
      this.listLoading = true;
      await this.$http.get("/tas/hunan/selectPublishList",{
        params: {
          adminRegionid:this.listQuery.region_id,
          currentPageNo:this.listQuery.currentPageNo,
          pageSize:this.listQuery.pageSize,
          publishStatus:this.listQuery.publishStatus,
          isOrg:this.listQuery.isOrg,
          adminUsername:this.listQuery.adminUsername,
          startCreatTime:this.listQuery.startCreatTime,
          startCheckDateTime:this.listQuery.startCheckDateTime,
          porvertName:this.listQuery.porvertName,
          itemType:this.listQuery.itemType,
          itemClassify:this.listQuery.itemClassify,
          endCreatTime:this.listQuery.endCreatTime,
          endCheckDateTime:this.listQuery.endCheckDateTime
        },
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }).then(res => {
            console.log(res)
          if (res.publishList.length) {
            this.list = res.publishList;
            setTimeout(() => {
              let num = parseInt(res.total);
              this.total =
                num > this.listQuery.pageSize * 100
                  ? this.listQuery.pageSize * 100
                  : num;
                  this.totalNum=parseInt(res.total)
            }, 1000);
          } else {
            this.total = 0;
          }
          this.listLoading = false;
        })
        .catch(error => {
          this.listLoading = false;
        });
    },
    handleFilter() {
      this.listQuery.currentPageNo = 1;
      this.list = [];
      this.getList();
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.list = [];
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.currentPageNo = val;
      this.list = [];
      this.getList();
    },
    handleDetial(id) {
      console.log(id)
      this.detailvis=true
      this.$http.get("/tas/hunan/queryById?id="+id).then(res=>{
        this.detailObj=res
       this.imgList= res.publishImages.split(',');
      })
    },
    getConcorn(data) {
      return data.concern_region_name && data.concern_region_name != ""
        ? data.concern_region_name
        : "";
    }
  }
};
</script>
<style scoped lang="scss">
.label {
  width: 140px;
  display: inline-block;
  margin: 6px;
}

.checkDialog >>> .el-dialog__body {
  padding-top: 0px;
}
.filter-container span {
  line-height: 50px;
  font-size: 14px;
}
.center {
  text-align: center;
}

.img_span {
  width: 100%;
  float: left;
}

.img_span .imgs {
  display: block;
  width: 100%;
  height: 250px;
}
.pd {
  padding: 10px 0px 10px 0px;
}
.wh {
  width: 100%;
}
.tx {
  text-align: center;
}

.h4 {
  height: 400px;
  overflow-x: hidden;
  overflow-y: scroll;
  line-height: 30px;
  text-align: center;
  display: none;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
  height: 300px;
}
.el-carousel__item h3 img {
  display: inline-block;
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

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.exportbutton {
  float: right;
  margin: 0px;
}
.exportdiv {
  height: 40px;
}
.el-pagination{
    text-align: center;
}
.warnspan {
  font-size: 14px;
  height: auto;
  color: red;
  line-height: 30px;
  text-align: center;
  display: block;
  width: 100%;
}
.imgs{
      .position{
          float: left;
          position: relative;
      }
      img{
          width: 127px;
          height: 127px;
          margin-right: 9px;
          margin-bottom: 9px;
          object-fit: cover;

      }
      .end{
        position: absolute;
        right: 0px;
        width: 20px;
        height: 20px;
        top: -10px;
        border-radius: 50%;
        background: #666;
        cursor: pointer;
        span{
            position: absolute;
            width: 14px;
            margin-left: 3px;
            transform: rotate(45deg);
            height: 2px;
            background-color: #fff;
            top: 9px;
            &::after{
                content:"";
                display:block;
                width: 14px;
                transform: rotate(90deg);
                height: 2px;
                background-color: #fff;
            }
        }
      }
}
.avatar-uploader{
    display: inline-block;
}
  .avatar-uploader .el-upload {
    display: inline-block;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    border: 1px dashed #d9d9d9;
    width: 127px;
    height: 127px;
    line-height: 127px;
    text-align: center;
  }
  .avatar {
    width: 127px;
    height: 127px;
    display: block;
  }
</style>
