<template>
  <div class="app-container">
    <div class="conheader clearfix" align="right">
      <h3>{{$route.meta.title}}</h3>
    </div>
    <div class="filter-container">
      <el-row :gutter="20">
        <el-col :span="8" v-if="Number(this.level) === 1 || Number(this.level) === 2 || Number(this.level) === 3">
          <span>类型：</span>
          <el-select v-model="listQuery.level" clearable style="width: 160px" class="filter-item" placeholder="管理员级别">
            <el-option v-for="item in leaderLevels" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-col>
        <el-col :span="8">
          <span>姓名：</span>
          <el-input v-model="listQuery.name" style="width: 160px;" class="filter-item" placeholder="请输入姓名"/>
        </el-col>
        <el-col :span="8">
          <span>手机：</span>
          <el-input v-model="listQuery.mobile" style="width: 160px;" class="filter-item" placeholder="请输入手机号码"/>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <span>身份证 :</span>
          <el-input v-model="listQuery.idcard" style="width: 190px;" class="filter-item" placeholder="请输入身份证号"/>
        </el-col>
        <el-col :span="8">
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
      >
      <el-table-column align="center" label="序号" type="index" width="45" prop="id"/>
      <el-table-column min-width="10" label="姓名" prop="realname"/>
      <el-table-column :formatter="levelFn" width="70" align="center" label="申请级别"/>
      <el-table-column width="100" align="center" label="手机号" prop="mobile"/>
      <el-table-column width="170" align="center" label="身份证号" prop="idcard"/>
      <el-table-column min-width="50" align="center" label="负责区域" prop="region_name"/>
      <el-table-column width="170" align="center" label="申请日期" prop="apply_date"/>
      <el-table-column width="160" align="center" label="操作" prop="aideder_name">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="examine(scope.row.id,1)">通过</el-button>
          <el-button size="mini" type="primary" @click="examine(scope.row.id,2)">不通过</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination :current-page="listQuery.page"  v-if="total>listQuery.limit" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" :total="total" background layout="total,  prev, pager, next, jumper" @current-change="pagefn"/>
    </div>
  </div>
</template>

<script>
  import { fetchPv, createArticle, updateArticle } from '@/api/article'
  import waves from '@/directive/waves' // 水波纹指令
  import { parseTime } from '@/utils'
  import {mapState} from 'vuex'

  export default {
    name: 'DemandCheckList',
    directives: {
      waves
    },
    computed: {
      ...mapState([
        'user'
      ]),
      leaderLevels(){
        switch (Number(this.level)) {
          case 1:
            this.levelOptions.push({ id: 2, name: '市级管理员' },{ id: 3, name: '县级管理员' },{ id: 4, name: '乡级管理员' },{ id: 5, name: '村级管理员' })
            break;
          case 2:
            this.levelOptions.push({ id: 3, name: '县级管理员' },{ id: 4, name: '乡级管理员' },{ id: 5, name: '村级管理员' })
            break;
          case 3:
            this.levelOptions.push({ id: 4, name: '乡级管理员' },{ id: 5, name: '村级管理员' })
            break;
        }
        return this.levelOptions
      }
    },
    data() {
      return {
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          pageSize: 10,
          level: undefined,
          name: undefined,
          mobile: undefined,
          idcard: undefined
        },
        levelOptions: [],
        tableKey:0,
         level: localStorage.leaderLevel
      }
    },
    created() {
      this.getList()
    },
    methods: {
      examine(id,status){
        let data={
          id,
          status,
        }
        if(status===2){
          this.$prompt('请输入不通过原因', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          }).then(({ value }) => {
            data.check_opinion=value
            this.approve(data)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消输入'
            });
          });
        }else{
          
          this.approve(data)
        }

      },
      approve(data){
        this.$http.post('/hts/management/approve',data).then(res => {
        	var admin = this.$store.state.user.admin - 1
          this.$store.commit('SET_ADMIN', admin)
          this.$message({
            type: 'success',
            message: '成功 '
          });
          this.getList()
        })
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
      pagefn(index) {
        this.listQuery.page = index
        this.getList()
      },
      getList() {
        this.listLoading = true
        this.$http.post('/hts/management/isCheck', this.listQuery).then(res => {
          this.list = res.list
          this.total = parseInt(res.total)
          this.listLoading = false
        })
      }
    }
  }
</script>
<style scoped>
  .label {width:140px;display:inline-block;margin:6px}
  .checkDialog >>> .el-dialog__body{padding-top:0px }
  .filter-container .filter-item{
    margin-bottom: 0;
  }
  .filter-container span{
    line-height: 50px;
    font-size: 14px;
  }
</style>
