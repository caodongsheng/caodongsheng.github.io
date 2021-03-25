<template>
  <div class="app-container">
    <div class="conheader clearfix" align="right">
      <h3>{{$route.meta.title}}</h3>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-setting"
        @click="handleSelectionChange(4)"
        v-if="Number(this.level) == 1 && (level_list[0].id.indexOf('45') == 0 ||level_list[0].id.indexOf('43') == 0 || level_list[0].id.indexOf('50') == 0 || level_list[0].id.indexOf('52') == 0 || level_list[0].id.indexOf('51') == 0 || level_list[0].id.indexOf('61') == 0 || level_list[0].id.indexOf('34') == 0 || level_list[0].id.indexOf('42') == 0 || level_list[0].id.indexOf('22') == 0)"
      >设置终审权限</el-button>
      <el-button
        class="filter-item "
        style="margin-left: 10px;"
        type="warning"
        icon="el-icon-setting"
        @click="handleSelectionChange(3)"
        v-if="Number(this.level) == 1 && (level_list[0].id.indexOf('45') == 0 ||level_list[0].id.indexOf('43') == 0 || level_list[0].id.indexOf('50') == 0 || level_list[0].id.indexOf('52') == 0 || level_list[0].id.indexOf('51') == 0 || level_list[0].id.indexOf('61') == 0 || level_list[0].id.indexOf('34') == 0 || level_list[0].id.indexOf('42') == 0 || level_list[0].id.indexOf('22') == 0)"
      >取消终审权限</el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;background:#23bab7;border-color:#23bab7;"
        type="primary"
        icon="el-icon-edit"
        @click="editDemandExc"
      >导出</el-button>
      <!-- <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="addUsers"
        v-if="Number(this.level) !== 5"
      >增加用户</el-button> -->
    </div>
    <div class="filter-container">
      <el-row>
        <el-col :span="8">
          <span>姓名查询：</span>
          <el-input
            v-model="listQuery.name"
            style="width: 160px;"
            class="filter-item"
            placeholder="请输入姓名"
          />
        </el-col>
        <el-col :span="8">
          <span>手机号码：</span>
          <el-input
            v-model="listQuery.mobile"
            style="width: 160px;"
            class="filter-item"
            placeholder="请输入手机号码"
          />
        </el-col>
        <el-col :span="8">
          <span>身份证号：</span>
          <el-input
            v-model="listQuery.idcard"
            style="width: 190px;"
            class="filter-item"
            placeholder="请输入身份证号"
          />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <span>管理员类型：</span>
          <el-select
            v-model="listQuery.level"
            clearable
            style="width: 160px"
            class="filter-item"
            placeholder="级别"
          >
            <el-option
              v-for="item in levelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-col>
        <el-col :span="8">
          <span>在职状态：</span>
          <el-select
            v-model="listQuery.user_status"
            clearable
            style="width: 160px"
            class="filter-item"
            placeholder="在职状态"
          >
            <el-option
              v-for="item in userStatus"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-col>
        <el-col :span="8">
          <span>是否有终审权限：</span>
          <el-select
            v-model="listQuery.is_final_judgment"
            clearable
            style="width: 160px"
            class="filter-item"
            placeholder="是否终审"
          >
            <el-option
              v-for="item in examineStatus"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <span>管理区域：</span>
          <linkage :level="level" :level_list="level_list" @change="linkageChange"/>
        </el-col>
        <el-col :span="4">
          <el-button v-waves class type="primary" icon="el-icon-search" @click="getList">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      stripe
      highlight-current-row
      style="width: 100%;min-height:400px;"
      height="auto"
      @selection-change="selectionRowsChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>

      <el-table-column type="expand" label="负责区域">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="负责区域 :">
              <span v-for="item in props.row.region" :key="item.id">
                {{ item.region_name }}
                <br>
              </span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column min-width="50" label="ID" prop="id"/>
      <el-table-column width="70" align="center" label="姓名" prop="realname"/>
      <el-table-column width="100" align="center" label="手机号" prop="mobile"/>
      <el-table-column min-width="50" align="center" label="身份证号" prop="idcard"/>
      <el-table-column :formatter="levelFn" width="70" align="center" label="级别"/>
      <el-table-column
        :show-overflow-tooltip="true"
        width="150"
        align="center"
        label="开通时间"
        prop="register_date"
      />
      <el-table-column :formatter="statusFn" min-width="40" align="center" label="状态"/>
      <el-table-column width="370" align="center" label="操作" v-if="this.level!=5">
        <template slot-scope="scope">
          <el-button
            v-if="Number(level) != Number(scope.row.user_level)"
            size="mini"
            type="primary"
            @click.stop="edit(scope.row.id)"
            style="background:#ffc71d;border-color:#ffc71d;"
          >编辑</el-button>
          <el-button
            v-if="Number(level) != Number(scope.row.user_level)"
            size="mini"
            type="primary"
            @click.stop="statussSwitch(scope.row.id,scope.row.user_status)"
            style="background:#23bab7;border-color:#23bab7;"
          >{{scope.row.user_status | userStatus}}</el-button>
          <el-button
            size="mini"
            type="primary"
            style="background:#ffc71d;border-color:#ffc71d;"
            @click="resetPass(scope.row.id)"
          >重置密码</el-button>
          <el-button
            size="mini"
            type="primary"
            v-if="Number(level) == 1 && (level_list[0].id.indexOf('45') == 0 ||level_list[0].id.indexOf('43') == 0 || level_list[0].id.indexOf('50') == 0 || level_list[0].id.indexOf('52') == 0 || level_list[0].id.indexOf('51') == 0 || level_list[0].id.indexOf('61') == 0 || level_list[0].id.indexOf('34') == 0 || level_list[0].id.indexOf('42') == 0 || level_list[0].id.indexOf('22') == 0 ) && scope.row.user_level < 5 " 
            @click="setAdmin(scope.row)"
            style="background:#23bab7;border-color:#23bab7;"
          >{{scope.row.is_final_judgment==4?'取消':'设置'}}终审权限</el-button>
          <!-- && scope.row.is_celebrity -->
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
        <span style="float:left;line-height:34px;">共{{totalNum}}条数据</span>
      <el-pagination
        :current-page="listQuery.page"
        :page-size="listQuery.pageSize"
        :total="total"
        background
        layout=" prev, pager, next, jumper"
        @current-change="pagefn"
        v-if="total>listQuery.pageSize"
      />
      <span class="warnspan">仅能查看1000以内的数据，若需查看更多，请导出数据查看！</span>

    </div>
    <el-dialog :visible.sync="dialogFormVisible" title="扶贫干部详情及修改" :before-close="handleClose">
      <el-form
        ref="dataForm"
        :model="currentItem"
        label-position="left"
        label-width="100px"
        style=" margin-left:30px;"
      >
        <el-form-item label="id" prop="id">
          <el-input v-model="currentItem.id" :disabled="true" type="text" style="width:200px"/>
        </el-form-item>
        <el-form-item label="姓名" prop="realname">
          <el-input v-model="currentItem.realname" disabled type="text" style="width:200px"/>
        </el-form-item>
        <el-form-item label="身份证号码" prop="idcard">
          <el-input v-model="currentItem.idcard" :disabled="true" type="text" style="width:200px"/>
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile">
          <el-input v-model="currentItem.mobile" :disabled="true" type="text" style="width:200px"/>
        </el-form-item>
        <el-form-item label="注册时间" prop="register_time">
          <el-input
            v-model="currentItem.register_time"
            :disabled="true"
            type="text"
            style="width:200px"
          />
        </el-form-item>
        <el-form-item label="级别" prop="user_level">
          <el-select
            v-model="currentItem.user_level"
            clearable
            style="width: 160px"
            class="filter-item"
            placeholder="级别"
            @change="selectChange"
          >
            <el-option
              v-for="item in userLevelAdd"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="f_user_status">
          <el-radio-group v-model="currentItem.f_user_status">
            <el-radio :label="1">在职中</el-radio>
            <el-radio :label="0">已离职</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="负责区域" prop="type">
          <div v-for="(item,index) in currentItem.manageRegions" :key="item.id">
            <linkages
              :index="index"
              :level="level"
              :qlevel="changelevel===0?findUserLevel:changelevel"
              :level_list="level_list"
              @change="detailchange"
              :province_region_id="item.province_region_id"
              :city_region_id="item.city_region_id"
              :county_region_id="item.county_region_id"
              :village_region_id="item.village_region_id"
              :hamlet_region_id="item.hamlet_region_id"
            />
            <!-- <linkages
                     :num="changeSelect ===''? Number(item.user_level):changeSelect"
                     :index="index"
                     :level="level"
                     :level_list="level_list"
                     @change="detailchange"
                     :province_region_id="item.province_region_id"
                     :city_region_id="item.city_region_id"
                     :county_region_id="item.county_region_id"
                     :village_region_id="item.village_region_id"
            :hamlet_region_id="item.hamlet_region_id" />-->
            <!-- <template v-if="item.id"> -->
            <!-- <el-button type="primary" icon="el-icon-edit-outline"  @click="update(index)">{{item.readonly?'修改':'确定'}}</el-button> -->
            <el-button type="danger" icon="el-icon-error" @click="deletes(index)">删除</el-button>
            <!-- </template> -->
            <!-- <el-button type="success" icon="el-icon-circle-plus"  @click="successadd(index)">保存</el-button> -->
          </div>
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="add">追加管理员区域</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="success" icon="el-icon-circle-plus" @click="save()">保存</el-button>

        <el-button @click="end">关闭</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogFormVisibleAdd" title="扶贫干部增加">
      <el-form
        ref="ruleForm"
        :rules="addrules"
        :model="addUser"
        label-position="left"
        label-width="100px"
        style=" margin-left:30px;"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addUser.name" type="text" style="width:200px"/>
        </el-form-item>
        <el-form-item label="身份证号码" prop="idcard">
          <el-input v-model="addUser.idcard" type="text" style="width:200px"/>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="addUser.phone" type="text" style="width:200px"/>
        </el-form-item>
        <el-form-item label="级别" prop="identity">
          <el-select
            v-model="addUser.identity"
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
        <el-form-item label="负责区域" v-if="addUser.identity !==''">
          <linkages
            :index="addUser.identity"
            :level="level"
            :qlevel="addoptlevel"
            :level_list="level_list"
            @change="detailchangeadd"
            :province_region_id="idx[0]"
            :city_region_id="idx[1]"
            :county_region_id="idx[2]"
            :village_region_id="idx[3]"
            :hamlet_region_id="idx[4]"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="endAdd">关闭</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
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
    <!-- <el-dialog
      :visible.sync="continuedownload"
      width="30%"
      center>
      <span>无数导出，是否继续下载</span>
      <span slot="footer" class="dialog-footer">
		    <el-button @click="continuedownload = false">取 消</el-button>
		    <el-button type="primary" @click="confirmDownload">继续下载</el-button>
		  </span>
    </el-dialog> -->
  </div>
</template>

<script>
import { fetchPv, createArticle, updateArticle } from "@/api/article";
import waves from "@/directive/waves"; // 水波纹指令
import { parseTime } from "@/utils";
import linkage from "@/components/linkage";
import linkages from "@/components/linkageChange";
import { mapState } from "vuex";
import urlFunction from "../../api/urlFun.js";
import downloadfile from "../../utils/downloadfile.js";
import { Loading } from "element-ui";
import axios from 'axios'
export default {
  name: "DemandCheckList",
  components: {
    linkage,
    linkages
  },
  directives: {
    waves
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
    let validPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入电话号码"));
      } else if (value.length !== 11) {
        return callback(new Error("请输入正确的11位手机号码"));
      } else {
        return callback();
      }
    };

    return {
     // continuedownload:false,
      selectarr: [],
      exportVisible: false,
      loadingInstance: null,
      exportpageSize: 100000,
      totalNum:0,
      exportarr: [],
      addoptlevel: 0,
      changelevel: 0,
      refreshtoken: "",
      addrules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        idcard: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
          { validator: validID, trigger: "blur" }
        ],
        phone: [{ validator: validPhone, trigger: "blur" ,required: true}],
        identity: [{ required: true, message: "请输入级别", trigger: "change" }]
      },
      addUser: {
        phone: "",
        identity: "",
        name: "",
        idcard: "",
        territoryId: "",
        territory: ""
      },
      dialogFormVisibleAdd: false,
      level_list: JSON.parse(localStorage.leaderarrs),
      level: localStorage.leaderLevel,
      list: [],
      total: null,
      listLoading: true,
      listQuery: {
        keywords: "",
        page: 1,
        pageSize: 10,
        level: "",
        name: "",
        user_status: "",
        id: "",
        is_final_judgment:''
      },
      activeName: "first",
      levelOptions: [
        { id: 1, name: "省级管理员" },
        { id: 2, name: "市级管理员" },
        { id: 3, name: "县级管理员" },
        { id: 4, name: "乡级管理员" },
        { id: 5, name: "村级管理员" }
      ],
      currentItem: {},
      dialogFormVisible: false,
      userStatus: [
        { name: "全部", id: "" },
        { name: "在职中", id: 1 },
        { name: "已离职", id: 0 }
      ],
      examineStatus: [
        { name: "全部", id: "" },
        { name: "是", id: 4 },
        { name: "否", id: 3 }
      ]
    };
  },

  filters: {
    userStatus(value) {
      if (value === 1) {
        return "离职";
      } else {
        return "任职";
      }
    }
  },
  computed: {
    ...mapState(["user"]),

    findUserLevel() {
      let index = this.userLevelAdd.findIndex(
        opt => opt.id == this.currentItem.user_level
      );
      return this.userLevelAdd[index].optlevel;
    },
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
    },
    user_level() {
      return this.currentItem.user_level;
    },
    user_status() {
      return this.currentItem.user_status;
    },
    idx() {
      const idx = this.user.idx;
      return idx;
    }
  },
  watch: {
    // user_level(n,v){
    //   if(n === '' || v === undefined || n === undefined){
    //     return
    //   }
    //   this.modify()
    // },
    user_status(n, v) {
      if (n === "" || v === undefined || n === undefined) {
        return;
      }
      this.modify();
    }
  },
  created() {
    // console.log(';;;;',this.level_list[0].id.indexOf('52'))
    this.getList();
  },
  methods: {
    handleSelectionChange(status) {
      console.log('12312312',status,this.selectarr)
      if(this.selectarr.length==0){
        this.$notify({
            title: "失败",
            message:'请至少选择一个后操作',
            type: "error",
            duration:3000
          });
        return 
      }
      if(status==4){
        let result=this.selectarr.every((v)=>{
          return v.is_final_judgment!=4 && v.user_level<5
        })
        if(!result){
          this.$notify({
            title: "失败",
            message:'所选包含了已设置终审权限或村级管理员，请取消选择后操作',
            type: "error",
            duration:3000
          });
        }else{
          let arr=this.selectarr.map((v)=>{
            return v.id
          })
          let data={
            ids:arr,
            is_final_judgment:status
          }
          this.setAdminFn(data)
        }
      }else{
        let result=this.selectarr.every((v)=>{
          return v.is_final_judgment==4 && v.user_level<5
        })
        if(!result){
          this.$notify({
            title: "失败",
            message:'所选包含了未设置终审权限或村级管理员，请取消选择后操作',
            type: "error",
            duration:3000
          });
        }else{
          let arr=this.selectarr.map((v)=>{
            return v.id
          })
          let data={
            ids:arr,
            is_final_judgment:status
          }
          this.setAdminFn(data)
        }
      }
    },
    setAdminFn(data){
      this.$http.post("hts/management/updateFinalJudgment", data).then(res => {
          this.$notify({
            title: "提示",
            message:'设置成功',
            type: "success",
            duration:3000
          });
          this.getList()
      })
    },
    setAdmin(row){
      console.log(row)
      let is
      if(row.is_final_judgment==4){
        is=3
      }else{
        is=4
      }
      let data={
        ids:[row.id],
        is_final_judgment:is
      }
      this.setAdminFn(data)
    },
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
    // confirmDownload(){
    //    let urobj = {...this.listQuery}
    //     urlFunction(urobj).then(res => {
    //       let data = res.join("&").replace(/\"/g, "");
    //       // window.location.href = `http://dev2.fpmai.com/ets/excel/excelDown?token=${
    //       //   this.user.token
    //       // }&${data}`;
    //        let datastr = data==""?"":"&"+data;

    //        let url = process.env.BASE_API+`ets/excel/excelDown?token=${
    //       this.user.token
    //       }${datastr}`
    //      this.downloadFile(url);
    //     });


    // },
    selectionRowsChange(value) {
      this.selectarr = value;
      console.log('--',selectarr)
    },
    downloadFile(url) {
      downloadfile.fileDownload(url, {
        prepareCallback: function(url) {
          this.loadingInstance = Loading.service({fullscreen: true, text: '下载时间较长，请耐心等待...'});
        },
        successCallback: function(url) {
          this.loadingInstance.close();
        },
        failCallback: function(html, url) {
          this.loadingInstance.close();
        }
      });
    },
    handleClose(done) {
      this.end();
    },
    getFlag(level) {
      switch (level) {
        case 0:
          let karr0 = this.currentItem.manageRegions.filter(function(item) {
            return item.hamlet_region_id == "";
          });
          if (karr0.length > 0) return false;
          else return true;
          break;
        case 1:
          let karr1 = this.currentItem.manageRegions.filter(function(item) {
            return item.village_region_id == "";
          });

          if (karr1.length > 0) return false;
          else return true;
          break;
        case 2:
          let karr2 = this.currentItem.manageRegions.filter(function(item) {
            return item.county_region_id == "";
          });
          if (karr2.length > 0) return false;
          else return true;
          break;
        case 3:
          let karr3 = this.currentItem.manageRegions.filter(function(item) {
            return item.city_region_id == "";
          });
          if (karr3.length > 0) return false;
          else return true;
          break;
      }
    },
    async save() {
      let _this = this;
      let regionarr = [];
      let level =
        this.changelevel === 0 ? this.findUserLevel : this.changelevel;
      let flag = this.getFlag(level);
      if (!flag) {
        alert("必须选择对应级别的区域！");
        return;
      }
      for (let i = 0; i < this.currentItem.manageRegions.length; i++) {
        let str = "";
        let province_str =
          this.currentItem.manageRegions[i].province_region_id &&
          this.currentItem.manageRegions[i].province_region_id != ""
            ? this.currentItem.manageRegions[i].province_region_id
            : "";
        let citystr =
          this.currentItem.manageRegions[i].city_region_id &&
          this.currentItem.manageRegions[i].city_region_id != ""
            ? "," + this.currentItem.manageRegions[i].city_region_id
            : "";
        let countystr =
          this.currentItem.manageRegions[i].county_region_id &&
          this.currentItem.manageRegions[i].county_region_id != ""
            ? "," + this.currentItem.manageRegions[i].county_region_id
            : "";
        let villagestr =
          this.currentItem.manageRegions[i].village_region_id &&
          this.currentItem.manageRegions[i].village_region_id != ""
            ? "," + this.currentItem.manageRegions[i].village_region_id
            : "";
        let hamletstr =
          this.currentItem.manageRegions[i].hamlet_region_id &&
          this.currentItem.manageRegions[i].hamlet_region_id != ""
            ? "," + this.currentItem.manageRegions[i].hamlet_region_id
            : "";
        let tempid = "";
        let regionidarr = [
          hamletstr,
          villagestr,
          countystr,
          citystr,
          province_str
        ];
        for (let j = 0; j < regionidarr.length; j++) {
          if (regionidarr[j] !== "") {
            tempid = j;
            break;
          }
        }

        let reginname = "";
        await this.$http
          .post("/eai/authRegion/getAllParentId", {
            regionId: regionidarr[tempid].substring(1)
          })
          .then(function(res) {
            if (res[0]) {
              switch (tempid) {
                case 0:
                  reginname = `${res[0].regionName}#${res[1].regionName}#${
                    res[2].regionName
                  }#${res[3].regionName}#${
                    _this.currentItem.manageRegions[i].region_name
                  }`;
                  province_str = res[0].id;
                  citystr = "," + res[1].id;
                  countystr = "," + res[2].id;
                  villagestr = "," + res[3].id;
                  break;
                case 1:
                  reginname = `${res[0].regionName}#${res[1].regionName}#${
                    res[2].regionName
                  }#${_this.currentItem.manageRegions[i].region_name}`;
                  province_str = res[0].id;
                  citystr = "," + res[1].id;
                  countystr = "," + res[2].id;

                  break;
                case 2:
                  reginname = `${res[0].regionName}#${res[1].regionName}#${
                    _this.currentItem.manageRegions[i].region_name
                  }`;
                  province_str = res[0].id;
                  citystr = "," + res[1].id;
                  break;
                case 3:
                  reginname = `${res[0].regionName}#${
                    _this.currentItem.manageRegions[i].region_name
                  }`;
                  province_str = res[0].id;

                  break;
                case 4:
                  reginname = `${res[0].regionName}#${
                    _this.currentItem.manageRegions[i].region_name
                  }`;
                  province_str = res[0].id;
                  break;
              }
            }
          });

        if (province_str == undefined) continue;
        let temparr;
        switch (this.currentItem.user_level) {
          case 4:
            hamletstr = "";
            temparr = reginname.split("#");
            temparr.length = 4;
            reginname = temparr.join("#");
            break;
          case 3:
            hamletstr = "";
            villagestr = "";
            temparr = reginname.split("#");
            temparr.length = 3;
            reginname = temparr.join("#");
            break;
          case 2:
            hamletstr = "";
            villagestr = "";
            countystr = "";
            temparr = reginname.split("#");
            temparr.length = 2;
            reginname = temparr.join("#");
            break;
          case 1:
            hamletstr = "";
            villagestr = "";
            countystr = "";
            citystr = "";
            temparr = reginname.split("#");
            temparr.length = 1;
            reginname = temparr.join("#");
            break;
        }
        let idsstr = province_str +
          citystr +
          countystr +
          villagestr +
          hamletstr ;
        str =
          idsstr.split(",")[idsstr.split(",").length-1]
          +
          ":" +
          reginname.split("#")[reginname.split("#").length-1];
        regionarr.push(str);
      }
      if (regionarr.length == 0) {
        this.$notify({
          title: "提交数据错误",
          message: `至少有一条负责区域!`,
          type: "error"
        });
        return false;
      } else {
        let obj = {
          userId: this.currentItem.id,

          user_level: this.currentItem.user_level,
          user_status: this.currentItem.f_user_status,
          region_idxs: Array.from(new Set(regionarr))
        };
       // obj.token = this.refreshtoken;
        this.$http
          .post("hts/management/editOffice", obj, {
            headers: { "Content-Type": "application/json" }
          })
          .then(res => {
            this.$notify({
              title: "成功",
              message: `修改成功!`,
              type: "success"
            });
          });
      }
    },
    getOptLevel(value) {
      let index = this.userLevelAdd.findIndex(opt => opt.id === value);
      this.addoptlevel = this.userLevelAdd[index].optlevel;
    },
    selectChange(value) {
      let index = this.userLevelAdd.findIndex(opt => opt.id === value);
      this.changelevel = this.userLevelAdd[index].optlevel;
      //this.changeSelect = value
    },

    unpdea(id) {
      this.$http
        .post("uts/user/resetUser", {
          user_id: id
        })
        .then(res => {
          this.$notify({
            title: "成功",
            message: `修改成功,重置后密码为1234@qwer`,
            type: "success"
          });
        });
    },
    submitForm(formName) {
      if(this.addUser.territoryId==""||this.addUser.territory==""){
         this.$notify({
          title: "提交数据错误",
          message: `至少有一条负责区域!`,
          type: "error"
        });
        return false;
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http
            .post("/hts/management/cadreAddAdmin", this.addUser)
            .then(res => {
              this.$notify({
                title: "成功",
                message: "添加成功",
                type: "success"
              });
              this.dialogFormVisibleAdd = false;
            });
        } else {
          return false;
        }
      });
    },
    endAdd() {
      this.dialogFormVisibleAdd = false;
    },
    addUsers() {
      this.dialogFormVisibleAdd = true;
    },
    editDemandExc() {
      if (this.selectarr.length > 0) {
        let idarr = [];
        this.selectarr.forEach(val => {
          idarr.push(val.id);
        });
        let idstr = idarr.join(",");
        // window.location.href = `http://dev2.fpmai.com/ets/excel/excelDown?token=${
        //   this.user.token
        // }&id=${idstr}`;

        let obj = {};
        obj.token =  this.user.token;
        obj.id = idstr;
        this.exporthandler(process.env.BASE_API+`ets/excel/excelDown?token=${
        this.user.token
        }&id=${idstr}`,obj)
      } else {
        let urobj = {...this.listQuery}
        urlFunction(urobj).then(res => {
          let data = res.join("&").replace(/\"/g, "");
          // window.location.href = `http://dev2.fpmai.com/ets/excel/excelDown?token=${
          //   this.user.token
          // }&${data}`;
           let datastr = data==""?"":"&"+data;
            let obj = {...this.listQuery}
         obj.token =   this.user.token

           this.exporthandler(process.env.BASE_API+`ets/excel/excelDown?token=${
          this.user.token
          }${datastr}`,obj)

        });
      }
    },
    async  exporthandler(url,obj) {
      let pagetotal = 0
      let exporttotal = 0
      await this.$http.post("/ets/excel/excelDownCount", obj).then(response => {
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
        }else{
          pagetotal = Math.ceil(exporttotal/this.exportpageSize);
          for(let i=0;i<pagetotal;i++){
            let num = i+1
            if(i<pagetotal-1){
              this.exportarr.push({url:url+"&page="+num,page:num,from:i*this.exportpageSize+1,to:num*this.exportpageSize})
            }else{
              this.exportarr.push({url:url+"&page="+num,page:num,from:i*this.exportpageSize+1,to:exporttotal})
            }
          }
        }
     });

    },
    closeexport(){
      this.exportarr = [];

    },
    statussSwitch(id, s) {
      s = !s;
      let data = {
        userId: id,
        user_status: Number(s)
      };
      this.$http
        .post("/hts/management/editOffice", data, {
          headers: { "Content-Type": "application/json" }
        })
        .then(res => {
          this.$notify({
            title: "成功",
            message: "修改成功",
            type: "success"
          });
          this.list = [];
          this.getList();
        });
    },
    end() {
      this.dialogFormVisible = false;
      this.changelevel = 0;
      this.getList();
    },
    modify() {
      let data = {
        userId: this.currentItem.id,
        user_level: this.currentItem.user_level,
        user_status: this.currentItem.f_user_status
      };
      this.$http.post("/hts/management/editOffice", data).then(res => {
        this.$notify({
          title: "成功",
          message: "修改成功",
          type: "success"
        });
      });
    },
    update(i) {
      if (!this.currentItem.manageRegions[i].readonly) {
        //点击确认修改
        this.$http
          .post("/hts/management/editManageRegion", {
            id: this.currentItem.manageRegions[i].id,
            user_id: this.currentItem.manageRegions[i].user_id,
            province_region_id: this.currentItem.manageRegions[i]
              .province_region_id,
            city_region_id: this.currentItem.manageRegions[i].city_region_id,
            county_region_id: this.currentItem.manageRegions[i]
              .county_region_id,
            village_region_id: this.currentItem.manageRegions[i]
              .village_region_id,
            hamlet_region_id: this.currentItem.manageRegions[i]
              .hamlet_region_id,
            region_name: this.currentItem.manageRegions[i].region_name
          })
          .then(res => {
            this.currentItem.manageRegions[i].readonly = !this.currentItem
              .manageRegions[i].readonly;
            this.$notify({
              title: "成功",
              message: "修改成功",
              type: "success"
            });
          });
      } else {
        this.currentItem.manageRegions[i].readonly = !this.currentItem
          .manageRegions[i].readonly;
      }
    },
    deletes(i) {
       this.$http.post('/hts/management/getOfficerByLevelAndRegion', {
         region:this.currentItem.manageRegions[i].id,
         user_level:this.currentItem.user_level
       }).then(res => {
      this.currentItem.manageRegions.splice(i, 1);
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success'
        });
      })
    },

    add() {
      //追加区域
      let data = {};
      this.currentItem.manageRegions.push(data);
    },
    edit(id) {
      //编辑
      this.getManageDetal(id);
    },
    randomWord(randomFlag, min, max) {
      let str = "",
        range = min,
        arr = [
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "a",
          "b",
          "c",
          "d",
          "e",
          "f",
          "g",
          "h",
          "i",
          "j",
          "k",
          "l",
          "m",
          "n",
          "o",
          "p",
          "q",
          "r",
          "s",
          "t",
          "u",
          "v",
          "w",
          "x",
          "y",
          "z",
          "A",
          "B",
          "C",
          "D",
          "E",
          "F",
          "G",
          "H",
          "I",
          "J",
          "K",
          "L",
          "M",
          "N",
          "O",
          "P",
          "Q",
          "R",
          "S",
          "T",
          "U",
          "V",
          "W",
          "X",
          "Y",
          "Z"
        ];

      // 随机产生
      if (randomFlag) {
        range = Math.round(Math.random() * (max - min)) + min;
      }
      for (var i = 0; i < range; i++) {
        pos = Math.round(Math.random() * (arr.length - 1));
        str += arr[pos];
      }
      return str;
    },
    getManageDetal(id) {
      this.currentItem = {};
      this.dialogFormVisible = true;
     // this.refreshtoken = this.randomWord(false, 43);
      this.$http.post("/hts/management/detail", {
          uid: id
        }).then(res => {
          this.currentItem = res;
          this.currentItem.f_user_status = Number(res.f_user_status);
          this.currentItem.user_level = Number(res.user_level);
          this.currentItem.user_status = Number(res.user_status);
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
      this.addUser.territory = territoryname + endname;
      this.addUser.territoryId = id;
    },
    detailchange(n, i, id) {
      let endname = "";

      for (let j = n.length - 1; j >= 0; j--) {
        if (n[j].regionName !== "") {
          endname = n[j].regionName;
          break;
        }
      }

      // let str = "";

      // let tempstr = str.split("#")[0];
      // let orgarr = this.currentItem.manageRegions[i].region_name.split("-")
      // let temindex = orgarr.indexOf(tempstr);
      // if(temindex>0){
      //   for(let i=0;i<temindex;i++){
      //     str = orgarr[i]+"#"+str
      //   }
      // }
      // this.addUser.territory = str.trim();
      let data = {
        region_name: endname,
        user_id: this.currentItem.id,
        province_region_id: n[0].id,
        city_region_id: n[1].id,
        county_region_id: n[2].id,
        village_region_id: n[3].id,
        hamlet_region_id: n[4].id
      };
      if (this.level == 1) {
        data.province_region_id = this.currentItem.manageRegions[
          i
        ].province_region_id;
      }
      if (this.level == 2) {
        data.province_region_id = this.currentItem.manageRegions[
          i
        ].province_region_id;
      }
      if (this.level == 3) {
        data.province_region_id = this.currentItem.manageRegions[
          i
        ].province_region_id;
        data.city_region_id = this.currentItem.manageRegions[i].city_region_id;
      }
      if (this.level == 4) {
        data.province_region_id = this.currentItem.manageRegions[
          i
        ].province_region_id;
        data.city_region_id = this.currentItem.manageRegions[i].city_region_id;
        data.county_region_id = this.currentItem.manageRegions[
          i
        ].county_region_id;
      }
      if (this.level == 5) {
        data.province_region_id = this.currentItem.manageRegions[
          i
        ].province_region_id;
        data.city_region_id = this.currentItem.manageRegions[i].city_region_id;
        data.county_region_id = this.currentItem.manageRegions[
          i
        ].county_region_id;
        data.village_region_id = this.currentItem.manageRegions[
          i
        ].village_region_id;
      }
      Object.assign(this.currentItem.manageRegions[i], data);
    },
    linkageChange(n, key, id) {
        let num=true;
        for(let i=0;i<n.length;i++){
            if(n[i].id!=''){
                num=false;
                this.listQuery.keywords=n[i].id;
            }
        }
        if(num){
            this.listQuery.keywords=''
        }
    },
    status(num) {
      if (num == 1) {
        return "在职中";
      } else {
        return "已离职";
      }
    },
    levelFn(n) {
      switch (n.user_level) {
        case 1:
          return "省级";
        case 2:
          return "市级";
        case 3:
          return "县级";
        case 4:
          return "乡级";
        case 5:
          return "村级";
      }
    },
    statusFn(s) {
      return s.user_status == 1 ? "在职中" : "已离职";
    },
    async getList() {
      this.listLoading = true;
      this.list = [];
      await this.$http
        .post("/hts/management/group", this.listQuery)
        .then(res => {
          if (res.list.length) {
            this.list = res.list;
           let num = parseInt(res.totals)
           this.totalNum=parseInt(res.totals)
          this.total =  num>this.listQuery.pageSize*100?this.listQuery.pageSize*100:num

            this.listLoading = false;
          } else {
             this.total = 0;
            this.listLoading = false;
          }
        });
    },
    pagefn(index) {
      this.listQuery.page = index;
      this.getList();
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
.filter-container .filter-item {
  margin-bottom: 0;
}
.el-dialog__wrapper >>> .el-dialog {
  width: 1190px;
}
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
