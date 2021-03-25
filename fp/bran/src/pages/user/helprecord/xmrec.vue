<template>
  <scroller
    v-if="list.length !== 0"
    :on-refresh="refresh"
    :on-infinite="infinite"
    refresh-layer-color="#4b8bf4"
    loading-layer-color="#ec4949">
    <svg class="spinner" style="stroke: #4b8bf4;" slot="refresh-spinner" viewBox="0 0 64 64">
        <g stroke-width="7" stroke-linecap="round"><line x1="10" x2="10" y1="27.3836" y2="36.4931"><animate attributeName="y1" dur="750ms" values="16;18;28;18;16;16" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="48;46;36;44;48;48" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values="1;.4;.5;.8;1;1" repeatCount="indefinite"></animate></line><line x1="24" x2="24" y1="18.6164" y2="45.3836"><animate attributeName="y1" dur="750ms" values="16;16;18;28;18;16" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="48;48;46;36;44;48" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values="1;1;.4;.5;.8;1" repeatCount="indefinite"></animate></line><line x1="38" x2="38" y1="16.1233" y2="47.8767"><animate attributeName="y1" dur="750ms" values="18;16;16;18;28;18" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="44;48;48;46;36;44" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values=".8;1;1;.4;.5;.8" repeatCount="indefinite"></animate></line><line x1="52" x2="52" y1="16" y2="48"><animate attributeName="y1" dur="750ms" values="28;18;16;16;18;28" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="36;44;48;48;46;36" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values=".5;.8;1;1;.4;.5" repeatCount="indefinite"></animate></line></g></svg>
    <slot>
        <div class="helplist-wrap bg-f6f5f6" style="padding-top:15px;">
            <zcitem :item="item" v-for="(item,index) in list" :key="index"></zcitem>
        </div>
    </slot>
    <svg class="spinner" style="fill: #ec4949;" slot="infinite-spinner" viewBox="0 0 64 64">
            <g><circle cx="16" cy="32" stroke-width="0" r="3"><animate attributeName="fill-opacity" dur="750ms" values=".5;.6;.8;1;.8;.6;.5;.5" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="3;3;4;5;6;5;4;3" repeatCount="indefinite"></animate></circle><circle cx="32" cy="32" stroke-width="0" r="3.09351"><animate attributeName="fill-opacity" dur="750ms" values=".5;.5;.6;.8;1;.8;.6;.5" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="4;3;3;4;5;6;5;4" repeatCount="indefinite"></animate></circle><circle cx="48" cy="32" stroke-width="0" r="4.09351"><animate attributeName="fill-opacity" dur="750ms" values=".6;.5;.5;.6;.8;1;.8;.6" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="5;4;3;3;4;5;6;5" repeatCount="indefinite"></animate></circle></g></svg>
  </scroller>
   <div  v-else class="nocontent f-14 color-999 text-center bg-f6f5f6" style="padding: 182px 15px">
        <img class="dis-block" src="../../../../static/appimg/no-content.png" style="width:90px;margin:0 auto">
        <p v-if="ajax" style="padding-top: 10px">抱歉，您还没有项目帮扶记录~</p>
      </div>
</template>

<script>
  import { Badge } from 'vux'
  import zcitem from "./zcitem"
  import scrolltemplate from "@/components/scroll/scrollcomponent"
  import {mapActions} from "vuex";
   import * as types from '@/store/mutation-types.js'
import { setTimeout } from 'timers';

  export default {
    props:["datevalue","datelist","date"],
    name: "record_capital",
    components:{ Badge,zcitem,scrolltemplate},
    data(){
      return{
        // end:false,
        capitalpage: 1,
        list:[],
        totals:0,
        page: 0,
        ajax:false
      }
    },
    created() {
        this.ajax=false
      this.getCapitalList();
    },
    watch:{
        userId(){
            console.log('watch...')
            this.getCapitalList()
        }
    },
    methods:{
    infinite(done) {
        setTimeout (() => {
            if(this.list.length < this.totals){
                this.page++;
                this.getCapitalList(done);
            } else {
                done(true);
            }
        },1000)
    },
    refresh(done) {
        setTimeout(() => {
            this.list = [];
            this.page = 0;
            this.getCapitalList();
            done(true);
        },1000)
     },
    getCapitalList(done) {
        if(this.userId){
            this.ajax=false
            this.$http({
                url:'/cfs/zc/project/getDfHelpRecordList',
                method:'post',
                data:{
                    pageIndex:this.page ,
                    pageSize: 5,
                    acr026:this.userId,
                },
                headers:{
                    'Content-Type':'application/json'
                }
            }).then(res => {
                if(res.data.data!= null){
                    this.list = [...this.list, ...res.data.data];
                    this.totals = res.data.total;
                    if(done) {
                        done(true);
                    }
                    this.ajax=true
                }else{
                    this.list = [...this.list, ...[]];
                    if(done) {
                        done(true);
                    }
                    this.ajax=true
                }

            }).catch(err => {
                if(err.msg)
                this.showToast('','text',err.msg,'20em','','middle');
                this.ajax=true  
            })
        }


    },
},
    mounted() {

    //   this.list = this.datelist;
    },
    computed:{
        userId(){
            return this.$store.state.user.id
        },
      helplist(){
        // if(this.$store.state.capital_list.length<10){
        //   this.end = true
        // }
        // else{
        //   this.end = false
        // }
        // this.list = this.list.concat(this.$store.state.capital_list)
        // if(this.datelist.length > 0) {
        //   return this.datelist
        // }
        // return   this.list
        // if(this.datelist.length > 0) {
        //     return this.datelist;
        // }
        if(this.date.length !== 0) {
            return this.datelist;
        }
        return this.list
      }
    }

  }
</script>

<style scoped>

</style>
