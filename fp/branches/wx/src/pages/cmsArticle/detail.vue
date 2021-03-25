<template>
    <div class="box">
        <x-header :left-options="{backText: '',preventGoBack:true}" @on-click-back="back">
        <a slot="right" @click="toShare"><i class="iconfont icon-f-share2 f-20"></i></a>
        </x-header>
        <div class="asd">
            <div class="detail">
                <div class="title">{{vos.title}}</div>
                <div class="time">
                    作者：<span>{{vos.author}}</span>  发布时间：{{vos.publish_time}}
                </div>
                <div class="cen" v-html="vos.get_memo"></div>
            </div>
        </div>
    </div>
  
</template>
<script>
import {XHeader} from 'vux'
import share from '@/components/share/share'
import shareUrlParamsFilter from '@/util/filter.js';
export default {
    components: { XHeader,share},
    data(){
        return {
            vos:{},
            inf:{}
        }
    },
    mounted(){
        this.getList()
    },
    methods:{
        back(){
            // console.log(this.$router.history)
            
            // window.history.go(-1)
            
            // if(window.history.length<=2){
                
            //     alert(1)
               
            // }else{
            //     alert(2)
            //     this.$router.back(-1)
            // }
             window.history.go(-1)
        },
        getList(){
            console.log(this.$route)
             let data={
                "txnBodyCom": {
                    "id":this.$route.query.id
                },
                "txnCommCom": {
                     "tStsTraceId": "tStsTraceId",
                    "txnIttChnlCgyCode": "BC01C007",
                    "txnIttChnlId": "C0071234567890987654321"
                }
            }
            let _this=this
            this.$https({
                method:"post",
                url:process.env.XFFP_URL+'fp/fsx11005',
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                data:data,
            }).then(function (e) {
                if(e.data['C-API-Status']=='00'){
                    _this.vos= JSON.parse(e.data['C-Response-Body']).date
                    console.log(_this.vos)
                }
            }).catch(error => {
               
            })
        },
        toShare() {
            
            // if (this.isWeixinCient()) {
            //     alert('点击右上角"...",分享给朋友或朋友圈，让更多的人帮助TA')
            // }else if(window.api){
            //     this.$refs.sharea.toShare()
            // }else{
            //         this.showToast('', 'text', '网页上无法分享，请使用APP或微信')
            // }
            if (this.isWeixinCient()) {
                alert('点击右上角"...",分享给朋友或朋友圈，让更多的人帮助TA');
            } else if (this.isapp()) {
                let u = navigator.userAgent
                let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
                
                console.log(this.vos)
                let shareTitle1 = this.vos.title || '';
                let shareContent1 = this.vos.sum_mary || '';
                let shareUrl = window.location.href
                let downloadImg = this.vos.thumbnail_url || 'http://djres.fpmai.com/gzddpt/static/appimg/share_icon.png';
                let url = shareUrl;
                let shareInfo =
                '{"picurl":"' +
                downloadImg+'","title":"' +
                shareTitle1 +
                '","text":"' +
                shareContent1 +
                '","type":"' +
                6 +
                '","url":"' +
                url +
                '","ischange":' +
                '"2"' +
                "}";
                console.log('分享参数',shareInfo)
                if(isiOS){
                    window.share.getShareDetailView(shareInfo)
                }else{
                    javascript: android.getShareDetailView(shareInfo)
                }
                // this.ModuleNative('share',shareInfo)
            } else {
                this.showToast("", "text", "网页上无法分享，请使用APP或微信");
            }
        },
    }
}
</script>
<style lang="less" scoped>
.box{
    width: 100%;
    height: 100%;
    background: #F7F8FA;
    .asd{
        width: 100%;
        height: ~"calc(100% - 47px)" ;
        margin-top: 10px;
        position: relative;
        background: #fff;
        overflow-y: scroll;
        .detail{
            width: 100%;
            height: auto;
            box-sizing: border-box;
            padding: 12px;
            .title{
                font-size: 20px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #2F2F2F;
                line-height: 28px;
            }
            .time{
                margin-top: 10px;
                font-size: 12px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #999999;
                line-height: 17px;
                span{
                    margin-right: 14px;
                }
            }
            img{
                width: 100%;
                height: 192px;
                display: block;
                margin: 15px 0;
            }
            .cen{
                width: 100%;
                margin-top: 20px;
                height: auto;
                font-size: 14px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #2F2F2F;
                line-height: 25px;
            }
        }
    }
}
    
</style>