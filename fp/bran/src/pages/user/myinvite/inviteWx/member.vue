<template>
    <div>
    <div class="headtu">
        <!-- <span><</span> -->
        用户注册
    </div>
<div class="">
    <img src="../img/zcsd.png" alt="" class="fta">
</div>
<div class="poerser">
    <p>恭喜你成为社会扶贫网的一员,</p>
    <p>并与<span>{{usheng}}{{text}}-{{uname}}</span>完成绑定</p>
</div>
<div class="footer" @click="fhi">立即帮扶</div>
    </div>
</template>
<script>
    export default{
        data:function(){
            return{
                text:"",
                usheng:"",
                uname:""
            }
        },
    mounted:function(){
        var that=this
        var fghgr=that.$route.query.ycode 
        that.$http.post("uts/invitationCode/getMsgByCode",{invitationCode:fghgr}).then((result) => {
            console.log(result)
            if(result.data.qrType==1){
                that.text="扶贫干部";
                var fei=result.data.userProvince
                that.$http.post('eai/authRegion/selectRegionDate',{code:fei}).then(res=>{
                // that.$jsonp("https://www.shfp1017.org.cn/ssoredis/invitationCode/getZoning?village="+fei).then((result)=>{
                    that.usheng=res.data.regionName
                })
                that.uname=result.data.userName;
            }
            if(result.data.qrType==0){
                that.text="爱心人士";
                var fei=result.result.date.userProvince
                console.log(fei)
                that.$http.post('eai/authRegion/selectRegionDate',{code:fei}).then(res=>{
                // that.$jsonp("https://www.shfp1017.org.cn/ssoredis/invitationCode/getZoning?village="+fei).then((result)=>{
                    // console.log(result)
                    // that.usheng=result.result.village
                    that.usheng=res.data.regionName
                })
                that.uname=result.data.userName;
                // that.uname=result.result.date.userName;
            }
            if(result.data.qrType==2){
                that.text="";
                that.usheng=result.data.companyName;
                that.uname=result.data.userName;
            } 
        }).catch((err) => {
               
        });
         
    }, 
    methods:{
        fhi:function(){
            window.location.href="https://wx.fpmai.com/m/index.html"
        }    
    }
}


</script>
<style>
*{margin: 0;padding: 0}
.headtu{
    width: 100%;
    height: 2.5rem;
    background-color: #FD8B2B;
    text-align: center;
    color: #ffffff;
    line-height: 2.5rem
}

.headtu span{float: left;margin-left: .5rem;color: #ffffff}
.fta{width:55%;margin: 3.5rem auto;display: block;}
.footer{bottom: 0;width: 100%;height: 2.5rem;background: #FD8B2B;position: fixed;text-align:center;color: #ffffff;line-height: 2.5rem}
.poerser{width: 100%;text-align: center}
.poerser p{height: 1.5rem}
.poerser span{color: #FD8B2B}
</style>
