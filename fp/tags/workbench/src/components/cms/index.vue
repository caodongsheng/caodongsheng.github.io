<template >
  <div class="" @click="asd">CMS</div>
</template>

<script>
import https from 'axios'
import {mapState} from 'vuex'
  export default {
    name: 'cms',
    data(){
      return {
        // this.this.$store.state.user.mobile
        // url:"http://cmsadmin.zgshfp.com.cn/eportal/ui?moduleId=3bd705667f084c91a1ca13bfcf11342a&struts.portlet.action=/portlet/easy-site-login!login.action&idCard=&mphone=", //生产
        // url:"http://cmsadmin.shfp1017.org.cn/eportal/ui?moduleId=87b76bbf1d8e4282a4d575d97fbe9e17&struts.portlet.action=/portlet/easy-site-login!login.action"           //测试
        url:'?userId='+this.$store.state.user.userid,
        cmsUrl:'https://cmsadmin.zgshfp.com.cn/eportal/ui?moduleId=3bd705667f084c91a1ca13bfcf11342a&struts.portlet.action=/portlet/easy-site-login!login.action&mphone='
      }
    },
    computed: {
    },
    mounted(){
        this.asd()
    },
    methods:{
        asd(){
            // this.$jsonp(process.env.CMS_PATH+this.url, {},{
            //   headers: {
            //     Authorization:this.$store.state.user.token
            //   },
            //   emulateJSON: true
            // }).then(res => {
            //     if(res.success){
            //         window.open(res.result)
            //     }else{
            //         alert('访问失败')
            //     }
            // }).catch(err => {
            //   console.log(err)
            // })
            // this.$http.post('hts/management/cms',{inaccess_token:this.$store.state.user.token})
            //   .then(res=>{
            //     window.open(res)
            //   })
            let mobile=''
            https({
                method: 'get',
                url: process.env.CMS_PATH+this.url,
            }).then(res=>{
                console.log('res--------',res)
                if(res.data.code=='TASI0000'){
                    mobile=res.data.data;
                    // https({
                    //     method: 'get',
                    //     url: this.cmsUrl+mobile,
                    //
                    // }).then(res2=>{
                    //     console.log('22222res2--------',res2)
                    //     if(res2.data.success==true){
                    //         let tempPage=window.open(''," _blank");
                    //         tempPage.location=res2.data.result
                    //         this.$router.push('/dashboard')
                    //     }else{
                    //         alert('登录失败')
                    //     }
                    // }).catch(res=>{
                    //
                    // })
                    this.$jsonp(this.cmsUrl+mobile, {},{

                    }).then(res2 => {
                        if(res2.success==true){
                            let tempPage=window.open(''," _blank");
                            tempPage.location=res2.result
                            this.$router.push('/dashboard')
                        }else{
                            alert('登录失败')
                        }
                    }).catch(err => {
                      console.log(err)
                    })
                }else{
                    alert('访问失败')
                }
            }).catch(res=>{

            })
        },

    },
  }
</script>

<style lang="css">
</style>
