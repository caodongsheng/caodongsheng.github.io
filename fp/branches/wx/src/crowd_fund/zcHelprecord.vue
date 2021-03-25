<template>
  <div>
    <div class="content">
      <div class="main">
        <div class="sort">
          <span :class="{active:sjmon==1}" @click=emitTop>按时间</span>
          <span :class="{active:sjmon==2}" @click=emitTop1>按金额</span>
          <div class="clear"></div>
        </div>

        <div class="content-main">
          <div class="center" v-for="(item,inex) in supporlist">
            <img :src=item.headpath?getHeadth(item.headpath):imgUrl height="90" width="90" alt="">
            <div class="center-bottom">
              <span class="one">
                <em>{{ item.nickname?nicknamesolice(item.nickname):'爱心人士' }}</em>
                <em class="color">捐赠<span class="active">{{item.afq007}}</span>元</em>
                <em>{{ timenew(item.afq065) }}</em>
              </span>
              <div class="chain_title" @click="goQKL(item.blcurl)">
                <span>扶贫区块链   </span>
                <a href="javascript:;">链上地址</a>
              </div>
            </div>
            <div class="clear"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import open from '@/assets/js/openWin'
export default {
  props:['supporlist','sjmon'],
  data () {
    return {
      imgUrl:require('../assets/images/fpw_logo_small.png')
    }
  },
  methods: {
    nicknamesolice (a) {
      if(a.length>9){
        a = a.slice(0,9)+'...'
      }
      return a
    },
    getHeadth (head) {
      return 'https://res.zgshfp.com.cn/upload/shfp/user/'+head
    },
    goQKL (data) {
      if(this.isWeixinCient()){
        window.location.href=this.QKL_URL+data
      }else{
        // window.location.href=this.QKL_URL+data+'&platform=app'
        console.log(this.QKL_URL+'/'+data)
        open(this.QKL_URL+'/'+data, '扶贫区块链').then(res => {
          return res
        })

      }
    },
    emitTop () {
      this.$emit('childbyvalue',1)
    },
    emitTop1 (n) {
      this.$emit('childbyvalue', 2)
    },
    timenew(loveTime){
      let loTime = this.getDateTimeStamp(loveTime);
      let minute = 1000 * 60;
        let hour = minute * 60;
        let day = hour * 24;
        let halfamonth = day * 15;
        let month = day * 30;
        let now = new Date().getTime();
        let diffValue = now - loTime;
        if(diffValue < 0){return;}
        let monthC =diffValue/month;
        let weekC =diffValue/(7*day);
        let dayC =diffValue/day;
        let hourC =diffValue/hour;
        let minC =diffValue/minute;
        let time = new Date(loTime);
        if(dayC>1&&monthC<=1){
            loTime=""+ parseInt(dayC) +"天前";
        }
        else if(hourC>=1&&dayC<1){
            loTime=""+ parseInt(hourC) +"小时前";
        }
        else if(minC>=1&&hourC<1){
            loTime=""+ parseInt(minC) +"分钟前";
        }else if(minC<1){
            loTime="刚刚";
        }else{
            loTime= this.formatDate(time)
        }
        return loTime
    },
    getDateTimeStamp (dateStr) {
        return Date.parse(dateStr.replace(/-/gi,"/"));
    },
    formatDate(now) {
        var year=now.getFullYear();
        var month=now.getMonth()+1;
        var date=now.getDate();
        var hour=now.getHours();
        var minute=now.getMinutes();
        var second=now.getSeconds();
        return year+"-"+month+"-"+date;
    } 
  },
  mounted () {
    
  },
  watch:{

  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.main
  width: 100%;
  box-sizing: border-box;
  margin:30px 0 5px 0;
  .sort
    width:46%;
    margin:0 auto;
    background:#f6f6f6;
    line-height:30px;
    border-radius:13px;
    span
      width: 50%;
      float:left;
      padding:0 0 0 17px;
      box-sizing: border-box;
      background:url('../assets/images/shot-ye.png') no-repeat 60px center;
      background-size:10px;
      &.active
        color:#fff;
        background-color:#f37306;
        background-image:url('../assets/images/shot-no.png') no-repeat 60px center;
  .content-main
    width:100%;
    .center
      width:100%;
      border-bottom:1px solid #E9E9E9;
      box-sizing:border-box;
      padding-bottom:15px;
      img
        width:40px;
        height:40px;
        float:left;
        margin: 15px 0 0 4px;
        border-radius:50%;
      .center-bottom
        float:left;
        width:83%;
        margin-top:10px;

.one
 width:100%;
 float:left;
 height:30px;

</style>

<style scoped>
.sort span:first-child{
 border-radius: 13px 0 0 13px;
}
.sort span:nth-child(2){
 border-radius: 0 13px 13px 0;
}
  .chain_title{
    float: left;
  background: url('../assets/images/qkl_icon.png') no-repeat 8px center;
  background-size:20px 20px;
  padding-left: 35px;
}
.chain_title span{
  font-size: 15px;
  color: #417CC3;
}
.chain_title a{
  font-size: 15px;
  color: #417CC3;
}
.clear{
  clear: both;
}
.one em:first-child{
  color: #333333;
  float: left;
  margin-left: 12px;
  font-size: 12px;
  width: 40%;
}
.one em:nth-child(2){
  color: #333333;
  float: left;
  margin-left: 12px;
  font-size: 12px;
}
.one em:last-child{
  float: right;
  color: #9D9D9D;
}
.color{
  color: #9D9D9D;
}
.active{
  color:#f37306;
}
</style>

