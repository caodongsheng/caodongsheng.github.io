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
          <span>姓名:</span>
          <el-input
            v-model="listQuery.name"
            placeholder="姓名，模糊查询"
            style="width: 160px"
            class="filter-item"
          ></el-input>
        </el-col>
        <el-col :span="8">
          <span>手机号:&nbsp;&nbsp;</span>
          <el-input
            v-model="listQuery.mobile"
            placeholder="手机，精确查询"
            style="width: 160px"
            class="filter-item"
          ></el-input>
        </el-col>
        <el-col :span="8">
          <span>身份证号:</span>
          <el-input
            v-model="listQuery.idCard"
            placeholder="身份证号，精确查询"
            style="width: 160px"
            class="filter-item"
          ></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <span>来源:</span>
          <el-select
            v-model="listQuery.user_source"
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
          <span>是否贫困:</span>
          <el-select
            v-model="listQuery.isPoor"
            clearable
            style="width: 160px"
            class="filter-item"
            placeholder="请选择"
          >
            <el-option
              v-for="item in isPoorOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-col>
        <el-col :span="8">
          <span>是否干部:</span>
          <el-select
            v-model="listQuery.isCarde"
            clearable
            style="width: 160px"
            class="filter-item"
            placeholder="请选择"
          >
            <el-option
              v-for="item in isCardeOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="14">
          <span>注册时间:</span>
          <el-date-picker
            v-model="listQuery.registerTime_start"
            type="date"
            placeholder="请选择开始日期"
            :picker-options="pickerOptionsStart"
            value-format="yyyy-MM-dd"
          ></el-date-picker> —
          <el-date-picker
            v-model="listQuery.registerTime_end"
            type="date"
            placeholder="请选择结束日期"
            :picker-options="pickerOptionsEnd"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-col>
        <el-col :span="10">
          <span>是否冻结:</span>
          <el-select
            v-model="listQuery.user_status"
            clearable
            style="width: 160px"
            class="filter-item"
            placeholder="请选择"
          >
            <el-option
              v-for="item in userstatusList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="20" v-if="Number(this.level) !== 5">
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
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column align="center" label="序号" type="index" width="65" />
      <el-table-column min-width="150" align="center" label="ID" prop="id" />
      <el-table-column min-width="150" align="center" label="用户名" prop="login_name" />
      <el-table-column min-width="150" align="center" label="真实姓名" prop="realname" />
      <el-table-column min-width="150" align="center" label="手机号" prop="mobile" />
      <el-table-column min-width="150" align="center" label="昵称" prop="nick_name" />
      <el-table-column min-width="150" align="center" label="区域">
        <template slot-scope="scope">
          <p>{{getRegions(scope.row)}}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="150" align="center" label="用户类型">
        <template slot-scope="scope">
          <p>{{type(scope.row)}}</p>
        </template>
      </el-table-column>
      <!--<el-table-column min-width="150" align="center" label="特殊权限"/>-->
      <el-table-column min-width="150" align="center" label="来源">
        <template slot-scope="scope">
          <p v-if="scope.row.user_source === '0'">PC</p>

          <p v-if="scope.row.user_source === '1'">APP</p>

          <p v-if="scope.row.user_source === '2'">微信</p>
        </template>
      </el-table-column>
      <el-table-column min-width="150" align="center" label="爱心关注" prop="concern_region_name">
        <template slot-scope="scope">
          <p>{{getConcorn(scope.row)}}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="150" align="center" label="状态">
        <template slot-scope="scope">
          <p v-if="scope.row.user_status == '0'">冻结</p>
          <p v-if="scope.row.user_status == '1'">正常</p>
        </template>
      </el-table-column>
      <el-table-column min-width="150" align="center" label="是否贫困">
        <template slot-scope="scope">
          <p v-if="scope.row.is_poor == '0'">非贫困户</p>
          <p v-if="scope.row.is_poor == '1'">贫困户</p>
        </template>
      </el-table-column>
      <el-table-column min-width="150" align="center" label="身份证号" prop="idcard" />
      <el-table-column min-width="150" align="center" label="注册时间" prop="register_time" />
      <el-table-column min-width="150" align="center" label="最后登录" prop="login_time" />
      <el-table-column min-width="150" align="center" label="性别">
        <template slot-scope="scope">
          <p v-if="scope.row.gender == '0'">女</p>
          <p v-if="scope.row.gender == '1'">男</p>
        </template>
      </el-table-column>
      <!--<el-table-column min-width="150" align="center" label="热度" prop="hot_degree"/>-->
      <!--<el-table-column min-width="150" align="center" label="积分" prop="hot_degree"/>-->
      <el-table-column width="300" fixed="right" align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleDetial(scope.row.id)" style="background:#ffc71d;border-color:#ffc71d;">详情</el-button>
          <el-button
            size="mini"
            type="primary"
            v-if="canUpdate(scope.row)"
            @click="updateTomanager(scope.row)"
            style="background:#23bab7;border-color:#23bab7;"
          >升级为管理员</el-button>
          <el-button
            size="mini"
            type="primary"
            v-if="scope.row.is_poor == 1"
            style="background:#23bab7;border-color:#23bab7;"
            @click="resetPass(scope.row.id)"
          >重置密码</el-button>
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
    <el-dialog :visible.sync="dialogFormVisibleAdd" title="升级为扶贫干部">
      <el-form
        ref="ruleForm"
        :rules="addrules"
        :model="addUser"
        label-position="left"
        label-width="100px"
        style=" margin-left:30px;"
      >
        <el-form-item label="姓名" prop="realname">
          <el-input
            v-model="addUser.realname"
            type="text"
            :readonly="readonlyname"
            style="width:200px"
          />
          <el-input v-model="addUser.is_certification" type="hidden" style="width:200px" />
        </el-form-item>
        <el-form-item label="身份证号" prop="idcard">
          <el-input
            v-model="addUser.idcard"
            type="text"
            :readonly="readonlyname"
            style="width:200px"
          />
        </el-form-item>
        <el-form-item label="级别" prop="user_level">
          <el-select
            v-model="addUser.user_level"
            clearable
            @change="getOptLevel"
            style="width: 160px"
            class="filter-item"
            placeholder="级别"
          >
            <el-option
              v-for="item in userLevelAdd"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="负责区域" v-if="addUser.user_level !==''">
          <linkages
            :index="addUser.user_level"
            :level="level"
            :qlevel="addoptlevel"
            :level_list="level_list"
            @change="detailchangeadd"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="endAdd">关闭</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
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
      exportpageSize: 100000,
      exportarr: [],
      selectarr: [],
      typeOptions: [],
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
        idCard: "",
        mobile: "",
        region_id: "",
        registerTime_start: "",
        registerTime_end: "",
        user_source: "",
        page: 1,
        pageSize: 20,
        isCarde: "",
        isPoor: ""
      },
      pickerOptionsStart: {
        disabledDate: time => {
          let endDateVal = this.listQuery.registerTime_end;
          if (endDateVal != "") {
            return time.getTime() > new Date(endDateVal).getTime();
          } else {
            return time.getTime() > Date.now();
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: time => {
          let beginDateVal = this.listQuery.registerTime_start;
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
      resetPass(id){
          let data={
              user_id:id,
              token:this.$store.state.user.token
          }
            this.$http.post("uts/user/resetPassword", data)
              .then(res => {
                  this.$notify({
                    title: "提示",
                    message:'重置成功,新密码：'+res,
                    type: "success",
                    duration:3000
                  });
              })
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
    getRegions(data) {
      // if (value.region_idsx_name == null) return "";
      // if (value.region_idsx_name.length == 0) return "";
      // else {
      //   return value.region_idsx_name.join(",");
      // }
      return data.first_concern_region_name && data.first_concern_region_name != ""
        ? data.first_concern_region_name
        : "";
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
        this.exporthandler(
          process.env.BASE_API +
            `ets/excel/userExcelDown?token=${this.user.token}&id=${idstr}`,
          obj
        );
      } else {
        let urlobj = { ...this.listQuery };

        urlFunction(urlobj).then(res => {
          let data = res.join("&").replace(/\"/g, "");
          let datastr = data == "" ? "" : "&" + data;
          // window.location.href = `http://dev2.fpmai.com/ets/excel/userExcelDown?token=${this.user.token}&${data}`
          let obj = { ...this.listQuery };
          obj.token = this.user.token;
          this.exporthandler(
            process.env.BASE_API +
              `ets/excel/userExcelDown?token=${this.user.token}${datastr}`,
            obj
          );
        });
      }
    },
    async exporthandler(url, obj) {
      let pagetotal = 0;
      let exporttotal = 0;
      await this.$http
        .post("/ets/excel/userExcelDownCount", obj)
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
          if (
            exporttotal < this.exportpageSize ||
            exporttotal == this.exportpageSize
          ) {
            pagetotal = 1;
            this.exportarr = [
              { url: url + "&page=1", page: 1, from: 1, to: exporttotal }
            ];
          } else {
            pagetotal = Math.ceil(exporttotal / this.exportpageSize);
            for (let i = 0; i < pagetotal; i++) {
              let num = i + 1;
              if (i < pagetotal - 1) {
                this.exportarr.push({
                  url: url + "&page=" + num,
                  page: num,
                  from: i * this.exportpageSize + 1,
                  to: num * this.exportpageSize
                });
              } else {
                this.exportarr.push({
                  url: url + "&page=" + num,
                  page: num,
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
    async getList() {
      this.listLoading = true;
      await this.$http
        .post("/uts/user/ESselectUser", this.listQuery)
        .then(res => {
          if (res.list.length) {
            this.list = res.list;
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
            this.totalNum=0
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
      this.$router.push("userDetial" + id);
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
