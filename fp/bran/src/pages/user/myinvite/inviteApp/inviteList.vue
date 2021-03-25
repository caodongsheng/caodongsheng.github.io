<template>
  <div>
    <x-header :left-options="{backText: ''}"  title="邀请列表">
    <a slot="right" @click="showSX">
        <span style="width: 21px;height: 21px;color:#333">筛选</span>
      </a></x-header>
    <div class="box-withheader over-auto">
      <div v-show="shaixuan" class="CodeLists">
        <div>
          <div>
            <p :class="isselected[0]?'sxSelected':'sxNoSelect'" @click="getPointList(1000,1000)">显示全部</p>
            <p v-for="(item,index) in CodeList" :class="isselected[index+1]?'sxSelected':'sxNoSelect'"  @click="getPointList(item.userCode,index)">{{showInviteType(item.qrType,index)}}</p>
          </div>
        </div>
      </div>
      <!--if没有地址-->
      <div v-if="noList" class="nocontent f-14 color-999 text-center" style="padding: 30px 15px">
        <img class="dis-block" src="../../../../../static/appimg/no-friend.png" style="width:90px;margin:0 auto">
        <p style="margin-top: 15px">您还没有邀请任何好友</p>
      </div>

      <group v-else class="group-clearbd bg-ffffff"  label-align="left">
        <cell class="f-16" title="邀请好友"  v-for="(item,index) in invitelist" :key="index">
          <img slot="icon" class="leftphoto dis-inline bd-radius-cir" :src="item.user_pic" :onerror="defaultIconImg" alt="" width="50" height="50">
          <div slot="title" class="leftcontent">
            <h1 class="f-16 f-normal">{{item.userName}}</h1>
            <p class="color-999 f-14">注册时间：{{item.createTime}}</p>
          </div>
          <div class="color-orange ListFrom">
            <div v-if="item.qrType==0">
              <img src="../img/typeimg/from_person.png">
              <p>爱心人士邀请</p>
            </div>
            <div v-else-if="item.qrType==2">
              <img src="../img/typeimg/from_company.png">
              <p>企业邀请</p>
            </div>
            <div v-else="item.qrType==1">
              <img src="../img/typeimg/from_cadre.png">
              <p>扶贫干部邀请</p>
            </div>
            <!-- <img class="righticon dis-block block-center" src="../../../../../static/appimg/icon-lovehand.png" alt="" width="24">
            <span class="f-12">帮扶<i>{{item.count}}</i>次</span> -->
          </div>
        </cell>
      </group>
    </div>
  </div>
</template>

<script>
  import {XHeader, Group, Cell} from 'vux'
    export default {
        name: "inviteList",
      components:{XHeader, Group, Cell},
      data(){
        return{
          shaixuan:false,
          isselected:[true,],
          pagesize:8,
          pageCount:1,
          userCode:'',
          noList:true,
          arr:[],
          CodeList:[],
          invitelist:[
            /*{
              invitephoto:'./static/appimg/user-photo01.jpg',
              inviteusername:'一条火龙',
              regtime:'2018-10-10',
              helpnum:1
            },{
              invitephoto:'./static/appimg/user-photo02.jpg',
              inviteusername:'张三丰',
              regtime:'2018-12-21',
              helpnum:2
            }*/
          ],
          defaultIconImg:'this.src="https://www.zgshfp.com.cn/PovertyRelief/shfp.png"'
        }
      },
      mounted(){
        for(let i = 0 ; i < this.pagesize ;i++){
          this.arr.push({})
        }
        let params={
          userId:this.$store.state.user.id,
        }
        this.getListAll(params)
        this.getCodeListAll()
      },
      computed:{
        /*invitelist(){
          return this.$store.state.visilist
        }*/
      },
      methods:{
        showSX(){
          this.shaixuan=true;
        },
        getListAll(params){
          let self=this;
          this.$http.post('uts/invitationCode/getInvitePeopleList',params).then(res=>{
            if(res.code='UTSI0000'){
              if(res.data.length>0){
                self.noList=false;
              }
              if(res.data.length<params.pageSize){
                this.pageCount=1000
              }
              // self.invitelist=res.data;
              let IconImgUrl,IconDefaultImgUrl
              for(var i=0;i<res.data.length;i++){
                if(res.data[i].user_pic){
                  self.$set(self.arr[i],'IconImg',IconImgUrl+res.data[i].user_pic);
                }else {
                  self.$set(self.arr[i],'IconImg',IconDefaultImgUrl)
                }
                self.$set(self.arr[i],'userName',res.data[i].userName);
                self.$set(self.arr[i],'createTime',res.data[i].createtime.substring(0,10));
                self.$set(self.arr[i],'qrType',res.data[i].qrType);
                self.ListArr.push(self.arr[i])
              }
            }
          })
        },
        getPointList(inviteCode,index){
          for(let i=0;i<this.isselected.length;i++){
            this.$set(this.isselected,i,false)
          }
          if(index != 1000){
            this.$set(this.isselected,index+1,true);
          }else if (index == 1000) {
            this.$set(this.isselected,0,true);
          }
          this.shaixuan=false;
          this.pageCount=1;
          this.userCode=inviteCode;
          let params=this.getParams();
          this.ListArr=[];
          this.getListAll(params);
        },
        getParams(){
          if(this.userCode==1000){
            return {
              // userId:this.$store.state.Public.userId,
              userId:this.$store.state.user.id,
              pageSize:this.pagesize,
              pageNow:this.pageCount
            }
          }else{
            return {
              // userId:this.$store.state.Public.userId,
              userId:this.$store.state.user.id,
              inviteCode:this.userCode,
              pageSize:this.pagesize,
              pageNow:this.pageCount
            }
          } 
        },
        nextArr(){
          if(this.pageCount==1000){
            alert('您邀请的好友都在这里啦！')
          }else{
            this.pageCount+=1;
            let params = this.getParams();
            this.getListAll(params)
          }
        },
        getCodeListAll(){
          let self = this;
          let params={
            userId:this.$store.state.user.id 
          }
          this.$http.post('uts/invitationCode/getQrCodeListAll',params).then(res=>{
            let r = res.data;
            console.log(r)
                var j=0;var k=0;var l=0;
                var CodeList_a=[];
                var CodeList_g=[];
                var CodeList_q=[];
            for(let i=0;i<r.length;i++){
              if(r[i].qrType==0){
                self.$set(CodeList_a,j,r[i])
                j+=1
              }
              else if(r[i].qrType==1){
                self.$set(CodeList_g,k,r[i])
                k+=1
              }
              else if(r[i].qrType==2){
                self.$set(CodeList_q,l,r[i])
                l+=1
              }
            }
            self.gNum=CodeList_g.length;
            self.qNum=CodeList_q.length;
            self.aNum=CodeList_a.length;

            for(let i=0;i<CodeList_g.length;i++){
              self.CodeList.push(CodeList_g[i])
              self.isselected.push(false)
            }
            for(let i=0;i<CodeList_q.length;i++){
              self.CodeList.push(CodeList_q[i])
              self.isselected.push(false)
            }
            for(let i=0;i<CodeList_a.length;i++){
              self.CodeList.push(CodeList_a[i])
              self.isselected.push(false)
            }
          }).catch(error=>{
            console.log(error)
          })
        },
        showInviteType(type,index){
          var i=0;
          if (type==1) {
            if(index==0){
              return '扶贫干部邀请'
            }else{
              let s = index+1
              return  '扶贫干部邀请'+s
            }
          }else if (type==2) {
            let qn=index-this.gNum;
            if(qn==0){
              return '企业邀请'
            }else{
              let s = qn+1
              return  '企业邀请'+s
            }
          }else if(type==0){
            let an=index-this.qNum-this.gNum;
            if(an==0){
              return '爱心人士邀请'
            }else{
              let s = an+1
              return  '爱心人士邀请'+s
            }
          }
        },
      }
    }
</script>

<style scoped>
  /*group去掉边线*/

  .group-clearbd >>> .weui-cells {
    margin-top: 0;
    background: transparent;
  }

  .group-clearbd >>> .weui-cells:before, .group-clearbd >>> .weui-cells:after {
    border: 0 none
  }

  .group-clearbd >>> .weui-cells {
    margin-top: 12px
  }

  .weui-cell, .vux-cell-box >>> .weui-cell {
    padding: 14px 15px
  }

  .weui-cell:before {
    left: 0
  }

  .weui-cell >>> input {
    color: #999;
    font-size: 15px
  }

  .weui-cell >>> .weui-cell__ft {
    font-size: 14px;
    padding-right: 0
  }

  .weui-cell.vux-tap-active >>> .weui-cell__ft {
    padding-right: 18px
  }

  .weui-cell_access >>> .weui-cell__ft:after {
    margin-top: -3px
  }

  /*title区域*/
  .leftcontent{padding: 0 20px}
  .leftcontent h1{margin-bottom: 5px;}
  .righticon{margin-bottom: 4px}
  /**/
  .ListFrom{
    width:80px;
    height: 35px;
    float: right;
    margin:auto 0;
    font-size: 11px;
    color: #999;
    text-align: center;
  }
  .ListFrom img{
    width: 17px;
    height: 17px;
  }
  /**/
  .CodeLists{
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.3);
  position: fixed;
  z-index: 2;
}
.CodeLists>div{
  opacity: 1;
  width: 100%;
  height: auto;
  background: #FFF;
  padding-top: 15px;
  padding-bottom: 15px;
  overflow: hidden;
}
.CodeLists>div>div{
  width: 95%;
  margin: 0 auto;
  display: flex;
  flex-flow: wrap;
  justify-content : flex-start;
}
.CodeLists>div p{
  width: 30%;
  height: 30px;
  margin: 0 1.3% 10px 1.2%;
  border-radius: 5px;
  text-align: center;
  line-height: 30px;
  font-size: 12px;
}
.sxSelected{
  border: solid 1px #FD9F66;
  color: #FD9F66;
}
.sxNoSelect{
  border: solid 1px #ccc;
  color: #333;
}
</style>
