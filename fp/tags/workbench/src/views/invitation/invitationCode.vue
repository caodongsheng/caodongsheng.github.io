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
        <el-col >
            <span>邀请码:&nbsp;&nbsp;</span>
            <el-input
              v-model="listQuery.inviteCode"
              placeholder="请输入邀请码"
              style="width: 160px"
              class="filter-item"
              clearable
            ></el-input>
          <span>机构名称:</span>
          <el-input
            v-model="listQuery.name"
            placeholder="按邀请者机构名称查询"
            style="width: 160px"
            class="filter-item"
            clearable
          ></el-input>
          <span>手机号:&nbsp;&nbsp;</span>
          <el-input
            v-model="listQuery.mobile"
            placeholder="按邀请者手机号查询"
            style="width: 160px"
            class="filter-item"
            clearable
          ></el-input>

         
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col>
         <span>注册时间:</span>
          <el-date-picker
            v-model="listQuery.start"
            type="date"
            placeholder="请选择开始日期"
            :picker-options="pickerOptionsStart"
            value-format="yyyy-MM-dd"
          ></el-date-picker> —
          <el-date-picker
            v-model="listQuery.end"
            type="date"
            placeholder="请选择结束日期"
            :picker-options="pickerOptionsEnd"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24" v-if="Number(this.level) !== 5">
          <span>按邀请者地域查询:</span>
          <linkage :level="level" :level_list="level_list" @change="linkageChange" />
          <el-button
            v-waves
            class="filter-item"
            type="primary"
            icon="el-icon-search"
            @click.native="handleFilter"
            style="margin-top:0;"
          >查询</el-button>
        </el-col>
      </el-row>
    </div>
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      highlight-current-row
      style="width: 100%;min-height:400px;"
      height="auto"
      stripe
      @selection-change="selectionRowsChange"
    >
      <!-- <el-table-column type="selection" width="55"></el-table-column> -->
      <el-table-column align="center" label="序号" type="index" width="65" />
      <el-table-column min-width="150" align="center" label="注册时间" prop="invite_time" />
      <el-table-column min-width="150" align="center" label="手机号" prop="mobile" />
       <el-table-column min-width="150" align="center" label="昵称" prop="invitename" />
      <!-- <el-table-column min-width="150" align="center" label="当前邀请类型">
        <template slot-scope="scope">
          <p v-if="scope.row.defaulttype == '0'">个人</p>
          <p v-if="scope.row.defaulttype == '1'">扶贫干部</p>
          <p v-if="scope.row.defaulttype == '2'">企业/单位</p>
          <p v-if="scope.row.defaulttype == '3'">学校</p>
          <p v-if="scope.row.defaulttype == '4'">政府/机关</p>
        </template>
      </el-table-column> -->
      <el-table-column min-width="150" align="center" label="当前邀请类型" prop="defaulttype" />
      <el-table-column min-width="150" align="center" label="当前邀请机构名称" prop="defaultenterprise" />
      <el-table-column min-width="150" align="center" label="当前邀请地域" prop="defaultaddr" />
      <el-table-column min-width="150" align="center" label="邀请者" prop="name" />
      <!-- <el-table-column min-width="150" align="center" label="邀请数量" prop="invitecount" /> -->
      <el-table-column min-width="150" align="center" label="邀请数量">
        <template slot-scope="scope">
          <p v-if=" scope.row.invitecount==null || scope.row.invitecount == 'null' || scope.row.invitecount == ''">0</p>
          <p v-else>{{scope.row.invitecount}}</p>
        </template>
      </el-table-column>
      <!-- <el-table-column min-width="150" align="center" label="邀请者类型">
        <template slot-scope="scope">
          <p v-if="scope.row.invitetype == '0'">个人</p>
          <p v-if="scope.row.invitetype == '1'">扶贫干部</p>
          <p v-if="scope.row.invitetype == '2'">企业/单位</p>
          <p v-if="scope.row.invitetype == '3'">学校</p>
          <p v-if="scope.row.invitetype == '4'">政府/机关</p>
        </template>
      </el-table-column> -->
      <el-table-column min-width="150" align="center" label="邀请者类型" prop="invitetype" />
      <el-table-column min-width="150" align="center" label="邀请者机构名称" prop="enterprise_name" />
      <el-table-column min-width="150" align="center" label="邀请者区域"  prop="inviteaddr"></el-table-column>
      <el-table-column min-width="150" align="center" label="捐赠金额" prop="money" />
      
      <el-table-column width="100" fixed="right" align="center" label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.invitecount>0" size="mini" type="primary" style="background:#ffc71d;border-color:#ffc71d;" @click="handleDetial(scope.row.invite_id)">邀请详情</el-button>
          <span v-else>暂无操作</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
        <span style="float:left;line-height:34px;">共{{totalNum}}条数据</span>
      <el-pagination
        :current-page="listQuery.page"
        v-if="total>listQuery.pageSize"
        :page-size="listQuery.pageSize"
        :total="total"
        background
        layout="prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
      <span class="warnspan">仅能查看2000以内的数据，若需查看更多，请导出数据查看！</span>
      <span class="warnspan"></span>
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
  </div>
</template>

<script>
import axios from 'axios'
import waves from "@/directive/waves"; // 水波纹指令
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
      addrules: {
        realname: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        idcard: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
          { validator: validID, trigger: "blur" }
        ],
        user_level: [
          { required: true, message: "请输入级别", trigger: "change" }
        ]
      },
      dialogFormVisibleAdd: false,
      exportVisible: false,
      loadingInstance: null,
      exportpageSize: 50000,
      exportarr: [],
      selectarr: [],
      typeOptions: [],
      // level_list: [],
      // level: 1,
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
        name: "",
        mobile: "",
        region_id: "",
        start: '',
        inviteCode:'',
        end:'',
        page: 1,
        pageSize: 20,
        marked:'getinviteStatisticsList',
      },
      pickerOptionsStart: {
        disabledDate: time => {
          let endDateVal = this.listQuery.end;
          if (endDateVal != "") {
            return time.getTime() > new Date(endDateVal).getTime();
          } else {
            return time.getTime() > Date.now();
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: time => {
          let beginDateVal = this.listQuery.start;
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
          id: "0",
          name: "PC"
        },
        {
          id: "1",
          name: "APP"
        },
        {
          id: "2",
          name: "微信"
        }
      ],
      currentItem: {
        id: "33"
      },
      currentItem2: {
        id: "33"
      },
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
      excelData: []
    };
  },
  created() {

    this.getList();
  },
  mounted(){
      let dateTime=new Date();
      dateTime=dateTime.setDate(dateTime.getDate()-1);
      dateTime=new Date(dateTime);
      this.listQuery.end=this.formatTime(dateTime)

      let dateTime2=new Date();
      dateTime2=dateTime2.setDate(dateTime2.getDate()-7);
      dateTime2=new Date(dateTime2);
      this.listQuery.start=this.formatTime((dateTime2))
      console.log(this.formatTime(dateTime2),',++++)')
      this.$http.post("/eai/authRegion/selectDate", {
          parentId: 100
      }).then((res)=> {
          // console.log('--',res)
            this.level_list=res
        });
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
      formatTime(date) {
      /* 从Date对象（标准时间格式）返回对应数据 */
      var date = new Date(date);
      let year = date.getFullYear();
      let month = date.getMonth()+1;
      let day = date.getDate();
      let hour = date.getHours();
      let minute = date.getMinutes();
      let second = date.getSeconds();
      return year + '-' + month + '-' + day ;
      },
      invitecountFn(num){
          console.log(num)
          return num ? num :'0'
      },
      reset(){
          this.listQuery= {
            name: "",
            mobile: "",
            region_id: "",
            start: "",
            end: "",
            page: 1,
            pageSize: 20,
          }
      },
    submitForm(formName) {
      if (
        this.addUser.region != "" &&
        (this.addUser.region.split(":")[0] != "" ||
          this.addUser.region.split(":")[1] != "")
      ) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.$http
              .post("/hts/management/updateAdmin", this.addUser)
              .then(res => {
                this.$notify({
                  title: "成功",
                  message: "添加成功",
                  type: "success"
                });
                this.dialogFormVisibleAdd = false;
                (this.addUser = {
                  realname: "",
                  is_certification: 0,
                  user_level: "",
                  user_id: "",
                  region: ""
                }),
                  this.handleFilter();
              });
          } else {
            return false;
          }
        });
      } else {
        this.$notify({
          title: "提交数据错误",
          message: `至少有一条负责区域!`,
          type: "error"
        });
        return false;
      }
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
      // debugger;
      this.addUser.user_id = data.id;
      this.addUser.is_certification =
        data.is_certification == null ? 0 : data.is_certification;
      if (this.addUser.is_certification == 0) {
        this.addUser.realname = "";
        this.addUser.idcard = "";
        this.readonlyname = false;
      } else {
        this.addUser.realname = data.realname;
        this.addUser.idcard = data.idcard;
        this.readonlyname = true;
      }
      this.dialogFormVisibleAdd = true;
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
        console.log('---',url,'==============',this.exportarr)
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
    }).then((res)=>{

    },(res)=>{

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
      if (value.region_idsx_name == null) return "";
      if (value.region_idsx_name.length == 0) return "";
      else {
        return value.region_idsx_name.join(",");
      }
    },
    async exporthandler(url, obj) {
      let pagetotal = 0;
      let exporttotal = 0;
      delete obj.pageSize
      delete obj.pageIndex
      console.log('------',obj)
      await axios.get(this.BASE_URL+"/server/extend/app/InvitationCodeExport/getinviteStatisticsListTotal?marked=getinviteStatisticsListTotal", {
          params: obj})
        .then(response => {
           if(response.data.result.total==0){
             this.$message({
            showClose: true,
            message: "没有符合条件的数据，无法导出!",
            type: "error"
          });
            return;
          }
          this.exportVisible = true;
          exporttotal = response.data.result.total;;
          if (
            exporttotal < this.exportpageSize ||
            exporttotal == this.exportpageSize
          ) {
            pagetotal = 1;
            this.exportarr = [
              { url: url + "&pageSize="+this.exportpageSize+"&page=1", page: 1, from: 1, to: exporttotal }
            ];
          } else {
            pagetotal = Math.ceil(exporttotal / this.exportpageSize);
            for (let i = 0; i < pagetotal; i++) {
              let num = i + 1;
              if (i < pagetotal - 1) {
                  this.listQuery.pageIndex=num
                this.exportarr.push({
                  url: url + "&pageSize="+this.exportpageSize+"&pageIndex="+(num-1),
                  page: num,
                  from: i * this.exportpageSize + 1,
                  to: num * this.exportpageSize
                });
              } else {
                  this.listQuery.pageIndex=num
                this.exportarr.push({
                  url: url + "&pageSize="+this.exportpageSize+"&pageIndex="+(num-1),
                  page: num,
                  from: i * this.exportpageSize + 1,
                  to: exporttotal
                });
              }
            }
          }
        });
    },
    editDemandExc() {
        console.log(this.selectarr)
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
        this.exporthandler(
          process.env.BASE_API +
            `ets/excel/getinviteStatisticsListDown?marked=getinviteStatisticsListDown&id=${idstr}`,
            //  http://dev2.fpmai.com/ets/excel/getinviteStatisticsListDown?pageIndex=1&pageSize=10&province=420000000000
          obj
        );
      } else {
        let urlobj = { ...this.listQuery };
        delete urlobj.pageIndex
        urlFunction(urlobj).then(res => {
          let data = res.join("&").replace(/\"/g, "");
          let datastr = data == "" ? "" : "&" + data;
          // window.location.href = `http://dev2.fpmai.com/ets/excel/userExcelDown?token=${this.user.token}&${data}`
          let obj = { ...this.listQuery };
          obj.token = this.user.token;
          this.exporthandler(
            process.env.BASE_API +
              `ets/excel/getinviteStatisticsListDown?marked=getinviteStatisticsListDown${datastr}`,
            obj
          );
        });
      }
    },
    async exporthandler(url, obj) {
      let pagetotal = 0;
      let exporttotal = 0;
      delete obj.pageSize
      delete obj.pageIndex
      // await axios.get(this.BASE_URL+"/server/extend/app/InvitationCodeExport/getinviteStatisticsListTotal?marked=getinviteStatisticsListTotal",  {
      //     params: obj})
      //   .then(response => {
           
      //   });
        if(this.totalNum==0){
             this.$message({
                showClose: true,
                message: "没有符合条件的数据，无法导出!",
                type: "error"
              });
              return;
          }
          this.exportVisible = true;
          exporttotal = this.totalNum;
          if (
            exporttotal < this.exportpageSize ||
            exporttotal == this.exportpageSize
          ) {
            pagetotal = 1;
            this.exportarr = [
              { url: url + "&pageSize="+this.exportpageSize+"&page=1", page: 1, from: 1, to: exporttotal }
            ];
          } else {
            pagetotal = Math.ceil(exporttotal / this.exportpageSize);
            for (let i = 0; i < pagetotal; i++) {
              let num = i + 1;
              if (i < pagetotal - 1) {
                  this.listQuery.pageIndex=num
                this.exportarr.push({
                  url: url + "&pageSize="+this.exportpageSize+"&pageIndex="+(num-1),
                  page: num,
                  from: i * this.exportpageSize + 1,
                  to: num * this.exportpageSize
                });
              } else {
                  this.listQuery.pageIndex=num
                this.exportarr.push({
                  url: url + "&pageSize="+this.exportpageSize+"&pageIndex="+(num-1),
                  page: num,
                  from: i * this.exportpageSize + 1,
                  to: exporttotal
                });
              }
            }
          }
    },
    closeexport() {
      this.exportarr = [];
    },
    linkageChange(n,b,m) {
        console.log(n,m,b)
      this.listQuery.province = n[0].id
      this.listQuery.city = n[1].id
      this.listQuery.county = n[2].id
      this.listQuery.country = n[3].id
      this.listQuery.village = n[4].id
    },
    // linkageChange(n) {
    //   let arr = [];
    //   if (n[0].id) {
    //     arr.push(n[0].id);
    //   }
    //   if (n[1].id) {
    //     arr.push(n[1].id);
    //   }
    //   if (n[2].id) {
    //     arr.push(n[2].id);
    //   }
    //   if (n[3].id) {
    //     arr.push(n[3].id);
    //   }
    //   if (n[4].id) {
    //     arr.push(n[4].id);
    //   }
    //   this.listQuery.province=arr[0];
    //   this.listQuery.city=arr[1];
    //   this.listQuery.county=arr[2];
    //   this.listQuery.country=arr[3];
    //   this.listQuery.village=arr[4];
    // },
    async getList() {
        this.listQuery.pageIndex=this.listQuery.page-1
        this.listQuery.enterpriseName=this.listQuery.name
        this.listQuery.phone=this.listQuery.mobile
        delete this.listQuery.page
      this.listLoading = true;
      ///uts/invitation/getinviteStatisticsList?pageIndex=1&pageSize=10
      await this.$http.get("/uts/invitation/getinviteStatisticsList", {
          params: this.listQuery})
        .then(res => {
            console.log('--',res)
                if (res) {
                  this.list = res.data;
                  setTimeout(() => {
                       this.totalNum=parseInt(res.total)
                    let num = parseInt(res.total);
                    this.total =
                      num > this.listQuery.pageSize * 100
                        ? this.listQuery.pageSize * 100
                        : num;
                  }, 1000);
                } else {
                  this.total = 0;
                  this.totalNum=0;
                  this.list=[]
                }
                this.listLoading = false;
        })
        .catch(error => {
          this.listLoading = false;
        });
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.list = [];
      this.getList();
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.list = [];
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.list = [];
      this.getList();
    },
    handleDetial(id) {
      this.$router.push('invitationCodeDetail?id='+id)
    },
    getConcorn(data) {
      return data.concern_region_name && data.concern_region_name != ""
        ? data.concern_region_name
        : "";
    }
  }
};
</script>
<style scoped>
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
</style>
