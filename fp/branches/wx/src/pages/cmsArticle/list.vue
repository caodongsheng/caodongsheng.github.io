<template>
    <div class="box">
        <x-header :left-options="{backText: ''}"  ></x-header>
        <div class="nav">
            <div v-for="(item,index) in navList" :key="item+index+'123123'">
                <span :class="index==navIndex?'span':''" @click="navFn(item,index)">{{item.columnName}}</span>
            </div>
            
        </div>
        <div class="asd">
            <scroller
            v-if="list.length !== 0"
            :on-refresh="refresh"
            :on-infinite="infinite"
            refresh-layer-color="#4b8bf4"
            loading-layer-color="#ec4949" >
            <svg class="spinner" style="stroke: #4b8bf4;" slot="refresh-spinner" viewBox="0 0 64 64">
                <g stroke-width="7" stroke-linecap="round"><line x1="10" x2="10" y1="27.3836" y2="36.4931"><animate attributeName="y1" dur="750ms" values="16;18;28;18;16;16" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="48;46;36;44;48;48" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values="1;.4;.5;.8;1;1" repeatCount="indefinite"></animate></line><line x1="24" x2="24" y1="18.6164" y2="45.3836"><animate attributeName="y1" dur="750ms" values="16;16;18;28;18;16" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="48;48;46;36;44;48" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values="1;1;.4;.5;.8;1" repeatCount="indefinite"></animate></line><line x1="38" x2="38" y1="16.1233" y2="47.8767"><animate attributeName="y1" dur="750ms" values="18;16;16;18;28;18" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="44;48;48;46;36;44" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values=".8;1;1;.4;.5;.8" repeatCount="indefinite"></animate></line><line x1="52" x2="52" y1="16" y2="48"><animate attributeName="y1" dur="750ms" values="28;18;16;16;18;28" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="36;44;48;48;46;36" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values=".5;.8;1;1;.4;.5" repeatCount="indefinite"></animate></line></g></svg>
            <slot>
                <div class="helplist-wrap bg-f6f5f6">
                    <div class="item" v-for="(item,index) in list" :key="item.news_id+index" @click="goDetail(item)">
                        <div class="mar">
                            <img :src="item.thumbnail_url" alt="" v-if="item.thumbnail_url">
                            <img src="../../assets/images/defaultApp.png" alt="" v-else>
                            <div class="r">
                                <div class="rig">
                                    <p>{{item.news_title}}</p>
                                </div>
                                <span>{{item.publish_time}}</span>
                            </div>
                        </div>
                    </div>
                </div>   
            </slot>
            <svg class="spinner" style="fill: #ec4949;" slot="infinite-spinner" viewBox="0 0 64 64">
                    <g><circle cx="16" cy="32" stroke-width="0" r="3"><animate attributeName="fill-opacity" dur="750ms" values=".5;.6;.8;1;.8;.6;.5;.5" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="3;3;4;5;6;5;4;3" repeatCount="indefinite"></animate></circle><circle cx="32" cy="32" stroke-width="0" r="3.09351"><animate attributeName="fill-opacity" dur="750ms" values=".5;.5;.6;.8;1;.8;.6;.5" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="4;3;3;4;5;6;5;4" repeatCount="indefinite"></animate></circle><circle cx="48" cy="32" stroke-width="0" r="4.09351"><animate attributeName="fill-opacity" dur="750ms" values=".6;.5;.5;.6;.8;1;.8;.6" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="5;4;3;3;4;5;6;5" repeatCount="indefinite"></animate></circle></g></svg>
        </scroller>
        </div>
        
    </div>
  
</template>
<script>
import {XHeader} from 'vux'
export default {
    components: { XHeader},
    data(){
        return {
            navList:[],
            list:[],
            navIndex:0,
            pageSize:10,
            pageIndex:1,
            code:'',
            totals:0,
        }
    },
    mounted(){
        this.getNav()
    },
    methods:{
        goDetail(item){
            this.$router.push('/cmsDetail?id='+item.news_id)
        },
        navFn(item,index){
            console.log(item)
            this.navIndex=index;
            this.pageIndex=1;
            this.list=[]
            this.code=item.columnCode
            this.getList()
        },
        getList(){
             let data={
                "txnBodyCom": {
                    "column_code":this.code,
                    "handleWay":"0"
                },
                "txnCommCom": {
                    "tRecInPage": this.pageSize, 
                    "tPageJump": this.pageIndex,
                }
            }
            let _this=this
            this.$https({
                method:"post",
                url:process.env.XFFP_URL+'fp/fsx11004',
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                data:data,
            }).then(function (e) {
                if(e.data['C-API-Status']=='00'){
                    console.log('222', JSON.parse(e.data['C-Response-Body']).list)

                    _this.list= _this.list.concat(JSON.parse(e.data['C-Response-Body']).list)
                   console.log(_this.list)
                   _this.totals=JSON.parse(e.data['C-Response-Body']).txnCommCom.totalRec
                }
            }).catch(error => {
               
            })
        },
        getNav(){
            let data={
                "txnBodyCom": {
                    "columnCatalog":"00",
                    "parentCode":"fpzs"
                },
                "txnCommCom": {
                    "tRecInPage": 10, 
                    "tPageJump": 1,
                }
            }
            let _this=this
            this.$https({
                method:"post",
                url:process.env.XFFP_URL+'fp/fsx11003',
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                data:data,
            }).then(function (e) {
                console.log(e.data['C-API-Status'])
                if(e.data['C-API-Status']=='00'){
                   _this.navList= JSON.parse(e.data['C-Response-Body']).list
                   _this.code=_this.navList[0].columnCode
                   _this.getList()
                }
            }).catch(error => {
               
            })
        },
        infinite(done) {
            setTimeout (() => {
                if(this.list.length < this.totals){
                    this.pageIndex++;
                    this.getList(done);
                } else {
                    done(true);
                }   
            },1000)
        },
        refresh(done) {
            setTimeout(() => {
                this.list = [];
                this.pageIndex = 1;
                this.getList()
                done(true);
            },1000)
        },
    }
}
</script>
<style lang="less" scoped>
.box{
    width: 100%;
    height: 100%;
    background:#fff;
}
    .nav{
        height: 46px;
        background: #F7F8FA;
        line-height: 46px;
        overflow: hidden;
        div{
            font-size: 16px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color:#000;
            float: left;
            width: 50%;
            text-align: center;
            .span{
                border-bottom: 2px solid #E35125;
                color: #E35125;
            }
        }
    }
    .asd{
        width: 100%;
        height: ~"calc(100% - 93px)" ;
        position: relative;
        .item{
            background:#fff;
            width: 100%;
            height: auto;
            box-sizing: border-box;
            .mar{
                margin-left:15px;
                width: ~"calc(100% - 15px)";
                height: auto;
                padding: 15px 15px 15px 0;
                border-bottom: 1px solid #ECECEC;
                overflow: hidden;
                img{
                    width: 142px;
                    height: 79px;
                    background: #D8D8D8;
                    border-radius: 2px;
                    float: left;
                }
                .r{
                    margin-left:12px;
                    width: ~"calc(100% - 154px)";
                    float: left;
                    .rig{
                        margin-bottom: 12px;
                        text-overflow: -o-ellipsis-lastline;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        line-clamp: 2;
                        -webkit-box-orient: vertical;
                        
                        font-size: 16px;
                        font-family: PingFangSC-Medium, PingFang SC;
                        font-weight: 500;
                        color: #333333;
                        line-height: 21px;
                        overflow: hidden;
                    }
                    span{
                        font-size: 12px;
                        font-family: PingFangSC-Regular, PingFang SC;
                        font-weight: 400;
                        color: #999999;
                        line-height: 18px;
                    }
                }
                
            }
        }
    }
</style>