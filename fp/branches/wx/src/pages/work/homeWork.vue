<template lang="html">
  <div class="box">
    <div class="btn" @click="btns">返回</div>
    <div class="bg">
      <div v-if="data">

        <div class="pic">
          <avatar :name="username" :image="usericon" tsize="2" width="50" height="50"></avatar>
          <!-- <img :src="data.user_pic" alt=""> -->
        </div>
        <div class="name"><span>{{data.realname}}</span><span class="grade">LV.{{data.user_level}}</span></div>
        <i>{{data.levelName}}</i>
      </div>
      <div class="examine" @click="Audit">
        <img src="../../assets/images/icon_1.png" alt="">
        <span>审核需求</span>
        <span class="num" v-if="data">{{data.demand_num}}</span>
      </div>
    </div>
    <div class="cart">
      <div class="cent" v-for="item in list" :key="item.pic">
        <router-link @click.native="getLink(item.link)" to="">
          <img :src="item.pic" alt="">
          <p>{{item.name}}</p>
        </router-link>
      </div>

    </div>


    <div class="Region" @click="toregionlist">
      <div class="clearfix">
        <img src="../../assets/images/icon_6.png" alt="">
        <span>管辖区域</span>
        <span class="num" v-if="this.data">{{regnum}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import avatar from '../../components/util/avatar'

  export default {
    components: {
      avatar
    },
    data() {
      return {
        regnum: 0,
        list: [
          {
            pic: require('../../assets/images/icon_2.png'),
            name: '我管理的需求',
            link: '/myManagementNeeds'
          },
          {
            pic: require('../../assets/images/icon_3.png'),
            name: '公告',
            link: ''
          },
          {
            pic: require('../../assets/images/icon_5.png'),
            name: '数据统计',
            link: ''
          },
          {
            pic: require('../../assets/images/icon_4.png'),
            name: '扶贫干部管理',
            link: '/helpManage'
          }
        ],
        num: 1,
        data: {},
      }
    },

    created() {
      this.$http.post('hts/management/workbench').then(res => {
        this.data = res.data
        let needArr = []
        let retId = res.data
        let ret = res.data.regionName
        this.regnum = ret.length
        for (let i in ret) {
          let msg = {
            id: null,
            regionName: null
          }
           let regArr = []
          if(ret[i].regionName.indexOf("-")>-1&&ret[i].regionName.split('-').length>1){
            regArr = ret[i].regionName.split('-')
          }
          else{
            regArr = ret[i].regionName.split(' ')
          }
          msg.id = ret[i].id
          if (retId.user_level === 1) {
            msg.regionName = regArr[0]
          } else if (retId.user_level === 2) {
            msg.regionName = regArr[1]
          } else if (retId.user_level === 3) {
            msg.regionName = regArr[2]
          } else if (retId.user_level === 4) {
            msg.regionName = regArr[3]
          } else {
            msg.regionName = regArr[4]
          }
          needArr.push(msg)
        }

        /*
        下面的一些不知道有什么用,反正没删
         */
        let regionName = this.data.regionName[0].regionName.replace(/[ ]/g, ',')
        let regionNameArr = regionName.split(',')


        // 缓存管理员级别ID

        this.L('leaderId', JSON.stringify(needArr))
        //缓存管理员级别level
        this.L('leaderLevel', this.data.user_level);
        // 根据管理员的级别缓存对应的区域名称
        switch (this.data.user_level) {
          case 1:
            this.L('leaderRegionName', regionNameArr[0])
            break
          case 2:
            this.L('leaderRegionName', regionNameArr[1])
            break
          case 3:
            this.L('leaderRegionName', regionNameArr[2])
            break
          case 4:
            this.L('leaderRegionName', regionNameArr[3])
            break
          case 5:
            this.L('leaderRegionName', regionNameArr[4])
            break
        }
      })
      .catch (err => {
          if(err.code == 'G4002') {
              this.showToast('','text','用户无权限或干部审核未通过','20em','','middle');
              this.$router.replace('/user');
          }
          if(err.code == 'D2999') {
              this.showToast('','text','该账号已被禁用，启用请联系上级管理员','20em','','middle');
              this.$router.replace('/user');
          }
      })
  },

    methods: {
      getLink(linkurl){
        if(linkurl==""){
              this.showToast('','text','暂未开放此功能！','20em','','middle');

        }
        else{
           this.$router.push(linkurl);
        }
      },
      Audit() {
        this.$router.push({name: 'waitCheckDemand', params: {states: '01'}})
      },
      toregionlist() {
        this.$router.push({name: 'regionList', params: {states: '01'}})
      },
      // 点击返回上一级
      btns() {
         this.$router.replace('/user');
      }
    },
    computed: {
      usericon: function () {
        return this.$store.state.user.user_pic
      },
      vtype: function () {
        if (this.$store.state.user.is_cadre === 1) {
          return '1'
        } else return '0'
      },
      isCertification: function () {
        return this.$store.state.user.is_celebrity === 1
      },
      username: function () {
        return this.$store.state.user.nick_name
      },
      authunion: function () {
        if (this.$store.state.user.org_name !== '') {
          return '认证机构：' + this.$store.state.user.org_name
        } else return ''
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../less/work/homeWork.less";

  .btn {
    position: absolute;
    top: 0px;
    right: 0px;
    z-index: 9999;
    color: #fff;
    width:50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }

  .myRegion {
    width: 90%;
    left: 5%;
    box-sizing: border-box;
    margin-top: 10px;
    background: #fff;
    font-size: 14px;
    border-radius: 5px;
    text-align: center;
    border: 2px solid #fff;
    box-shadow: 0 0 5px #ccc;
    position: relative;
    top: 15px;
  }
</style>
