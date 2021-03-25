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
        <el-col :span="14" >
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
          <el-button
            v-waves
            class="filter-item"
            type="primary"
            icon="el-icon-search"
            @click.native="handleFilter"
            style="margin-top: 0px;"
          >查询</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="20">

      </el-row>
    </div>
    <el-table
    stripe
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      highlight-current-row
      style="width: 100%;min-height:400px;"
      height="auto"
      @selection-change="selectionRowsChange"
    >
      <!-- <el-table-column type="selection" width="55"></el-table-column> -->
      <el-table-column align="center" label="序号" type="index" width="65" />
      <el-table-column min-width="150" align="center" label="注册时间" prop="inviteTime" />
      <el-table-column min-width="150" align="center" label="手机号" prop="mobile" />
      <!-- <el-table-column min-width="150" align="center" label="邀请数量" prop="invitecount" /> -->
      <el-table-column min-width="150" align="center" label="邀请数量">
        <template slot-scope="scope">
          <p v-if=" scope.row.invitecount==null || scope.row.invitecount == 'null' || scope.row.invitecount == ''">0</p>
          <p v-else>{{scope.row.invitecount}}</p>
        </template>
      </el-table-column>
      <el-table-column width="100" fixed="right" align="center" label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.invitecount>0" size="mini" type="primary" @click="handleDetial(scope.row.inviteId)" style="background:#ffc71d;border-color:#ffc71d;">邀请详情</el-button>
          <span v-else>暂无操作</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        :current-page="listQuery.page"
        v-if="total>listQuery.pageSize"
        :page-size="listQuery.pageSize"
        :total="total"
        background
        layout="total, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
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
      listLoading: false,
      exportVisible:false,
      tableKey: 0,
      list: [],
      selectarr: [],
      exportpageSize: 50000,
      exportarr: [],
      total: null,
      listQuery: {
        start: "",
        end: "",
        page: 1,
        pageSize: 20,
        marked:'getinviteStatisticsDetails'
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
    };
  },
  created() {
    this.getDetail();
  },
  computed: {

  },
  methods: {
      downloadFile(url) {
          console.log('---',this.exportarr)
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
              console.log('失败-url',url)
            this.loadingInstance.close();
          }
      }).then((res)=>{

      },(res)=>{

      });
      },
      closeexport() {
        this.exportarr = [];
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
          // obj.token = this.user.token || '';
          obj.id = idstr;
          console.log('--',obj)
          this.exporthandler(
            process.env.BASE_API +
              `ets/excel/getinviteStatisticsDetailsDown?marked=getinviteStatisticsDetailsDown&id=${idstr}`,
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
            console.log('----',obj)
            // obj.token = this.user.token || '';
            this.exporthandler(
              process.env.BASE_API +
                `ets/excel/getinviteStatisticsDetailsDown?marked=getinviteStatisticsDetailsDown${datastr}`,
              obj
            );
          });
        }
      },
      async exporthandler(url, obj) {
        let pagetotal = 0;
        let exporttotal = 0;
        obj.start=obj.start
        delete obj.pageSize
        delete obj.pageIndex
        delete obj.page
        await axios.get(this.BASE_URL+"/server/extend/app/InvitationCodeExport/getinviteStatisticsDetailsTotal?marked=getinviteStatisticsDetailsTotal", {
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
            exporttotal = response.data.result.total==0;
            if (
              exporttotal < this.exportpageSize ||
              exporttotal == this.exportpageSize
            ) {
              pagetotal = 1;
              this.exportarr = [
                { url: url + "&pageSize="+this.exportpageSize, page: 1, from: 1, to: exporttotal }
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
      async exporthandler(url, obj) {
        let pagetotal = 0;
        let exporttotal = 0;
        obj.start=obj.start
        delete obj.pageSize
        delete obj.pageIndex
        delete obj.page
        // await axios.get(this.BASE_URL+"/server/extend/app/InvitationCodeExport/getinviteStatisticsDetailsTotal?marked=getinviteStatisticsDetailsTotal",{
        //     params: obj})
        //   .then(response => {
             
        //   });
          if(this.total==0){
               this.$message({
                  showClose: true,
                  message: "没有符合条件的数据，无法导出!",
                  type: "error"
                });
              return;
            }
            this.exportVisible = true;
            exporttotal = this.total;
            if (
              exporttotal < this.exportpageSize ||
              exporttotal == this.exportpageSize
            ) {
              pagetotal = 1;
              this.exportarr = [
                { url: url + "&pageSize="+this.exportpageSize, page: 1, from: 1, to: exporttotal }
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
      handleSizeChange(val) {
        this.listQuery.pageSize = val;
        this.list = [];
        this.getDetail();
      },
      handleCurrentChange(val) {
        this.listQuery.page = val;
        this.list = [];
        this.getDetail();
      },

      handleFilter(){
          this.getDetail();
      },
      handleDetial(id) {
          this.$router.push('invitationCodeDetail?id='+id)
      },
      async getDetail(){
          this.listQuery.pageIndex=this.listQuery.page-1
          this.listQuery.id=this.$route.query.id
          delete this.listQuery.page
        this.listLoading = true;
        await this.$http.get("/uts/invitation/getinviteStatisticsDetails",  {
            params: this.listQuery
          }).then(res => {
            console.log(res)
                  if (res.data.length) {
                    this.list = res.data;
                    setTimeout(() => {
                      let num = parseInt(res.total);
                      this.total =
                        num > this.listQuery.pageSize * 100
                          ? this.listQuery.pageSize * 100
                          : num;
                    }, 1000);
                  } else {
                    this.total = 0;
                    this.list=[]
                  }
                  this.listLoading = false;
          })
          .catch(error => {
            this.listLoading = false;
          });
          this.listQuery.page=this.listQuery.pageIndex+1
      },
      selectionRowsChange(value) {
        this.selectarr = value;
      },
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
