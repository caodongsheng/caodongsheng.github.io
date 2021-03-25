<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
    <div class="systitle">扶贫干部工作台</div>
    <!-- <div class="cms">
        <cms></cms>
    </div> -->
    <div class="cms">
        <!-- <bi></bi> -->
    </div>
    <div class="right-menu">
      <!--<error-log class="errLog-container right-menu-item"/>-->
      <div style="float: left;">
      	<el-button type="text" @click="waitT" class="asd"><span style="color:#fff;float:left;line-height:18px;">待审核需求</span><span class="tips_button">{{wait}}</span></el-button>
	    <el-button type="text" @click="putForwardT" class="asd2"><span style="color:#fff;float:left;line-height:18px;">可提现需求</span><span class="tips_buttonT">{{totalT}}</span></el-button>
	      <!-- <el-button type="text" @click="administratorsT" v-if="Number(this.$store.state.user.leaderLevel) !== 5"><span style="color:#fff">管理员审核</span><span class="tips_buttonTr">{{$store.state.user.admin}}</span></el-button> -->
      </div>
      <!-- <el-tooltip content="全屏" effect="dark" placement="bottom">
        <screenfull class="screenfull right-menu-item"/>
      </el-tooltip> -->

      <!-- <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar" :onerror="errorImg">
          <i class="el-icon-caret-bottom"/>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              控制台
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown> -->
      <span class="loouts" @click="logout">退出</span>
    </div>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import LangSelect from '@/components/LangSelect'
import ThemePicker from '@/components/ThemePicker'
import cms from '@/components/cms'
import bi from '@/components/bi'
// import Bus from '@/assets/Bus'
export default {
	data() {
		return {
      total: 0,
      totalT:0,
			totalTr: 0,
      errorImg:'this.src="' + require('../../../assets/ErrorImg.png') + '"'
		}
	},
  components: {
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    LangSelect,
    ThemePicker,
    cms,
    bi
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'wait',
      'avatar'
    ]),

  },
  created() {
    this.waitD()
    // Bus.$on("userpic",(res)=>{
    //    this.avatar = res;
    //   })
    //this.wait2()
    //this.administrators()
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
    },
    //待审核需求
    async waitD() {
     await 	this.$http.post('hts/management/deskHead',
    ).then(response => {
        this.$store.commit('SET_WAIT', parseInt(response.auditedDemandCount))
         this.$store.commit('SET_ADMIN', parseInt(response.auditedManagerCount))
            localStorage.totalT = parseInt(response.presentedDemandCount)
            this.totalT = localStorage.totalT
      })
    },
    // wait2() {
    //   this.$http.post('hts/management/showList', {
    //     pageNum: 1,
    //     pageSize: 20,
    //     sort:3,
    //     demandStatus:4,
    //     state:1
    //   }).then(response => {
    //     localStorage.totalT = parseInt(response.totals)
    //     this.totalT = localStorage.totalT
    //   })
    // },
    //管理员审核
    administrators() {

    	if(this.$store.state.user.leaderLevel !== '5'){
        this.$http.post('/hts/management/isCheck', {
          page: 1,
          pageSize: 10,
          level: undefined
        }).then(response => {
          console.log(response)
          this.$store.commit('SET_ADMIN', parseInt(response.total))
        })
      }
    },
    waitT() {
    	this.$router.push({ path: '/help/demandCheckList',query:{id:'01'} })
    },
    putForwardT() {
    	this.$router.push({ path: '/help/demandManagerList',query:{id:4} })
    },
    administratorsT() {
    	this.$router.push({ path: '/manager/managerCheckList' })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.loouts{
    font-size: 12px;
    text-decoration:underline;
    color: #fff;
    margin-right: 22px;
    margin-left: 20px;
    cursor:pointer;
}
.tips_button{
	display: block;
    float: left;
	background-color:rgba(255,255,255,.5);
    border-radius: 4px;
	color: #304155;
	padding:3px 5px;
	margin-left: 5px;
    width: 40px;
}
.asd{
    margin-top: 6px;
    float: left;
    padding-right: 0px;
}
.asd2{
    margin-top: 6px;
    float: left;
    margin-left: 0px;
}
.tips_buttonT{
    display: block;
	display: inline-block;
	background-color:rgba(255,255,255,.5);
	color: #304155;
	padding:3px 5px;
	border-radius: 4px;
	margin-left: 5px;
    width: 40px;

}

.tips_buttonTr{
	display: inline-block;
	background-color: #F56C6C;
	color: #FFFFFF;
	padding: 5px;
	border-radius: 50%;
	margin-left: 5px;
}
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container{
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus{
     outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international{
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
.cms{
    float: left;
    cursor: pointer;
    font-size: 20px;
    color: #fff;
    margin-left: 30px;
}
</style>
