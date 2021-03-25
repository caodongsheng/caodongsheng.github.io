<template>
  <div>
    <x-header :left-options="{backText: ''}">{{title}}
      <!--<a slot="right"><i class="iconfont icon-f-sear f-20"></i></a>-->
    </x-header>
    <!--头部筛选草稿箱-->
    <div class="box-withheader">
      <div class="list-topoperate display-flex f-16 bg-ffffff color-999">
        <selectTab ref="selectTab" :datas='selects' :demandType="demandtype" :typeCode="typeCode" @getdatas="getdatas"></selectTab>
        <selectRegion :datas='selects2' @getdatas="getdatas"></selectRegion>
      </div>
      <!--总计-->
      <div class="box-withheader-nav bg-f6f5f6" ref="scroll">
     
        <!--需求列表-->
        <scroller
          v-if='mypublist.length !== 0'
          :on-refresh="refresh"
          :on-infinite="infinite"
          refresh-layer-color="#4b8bf4"
          loading-layer-color="#ec4949">
          <svg class="spinner" style="stroke: #4b8bf4;" slot="refresh-spinner" viewBox="0 0 64 64">
            <g stroke-width="7" stroke-linecap="round"><line x1="10" x2="10" y1="27.3836" y2="36.4931"><animate attributeName="y1" dur="750ms" values="16;18;28;18;16;16" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="48;46;36;44;48;48" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values="1;.4;.5;.8;1;1" repeatCount="indefinite"></animate></line><line x1="24" x2="24" y1="18.6164" y2="45.3836"><animate attributeName="y1" dur="750ms" values="16;16;18;28;18;16" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="48;48;46;36;44;48" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values="1;1;.4;.5;.8;1" repeatCount="indefinite"></animate></line><line x1="38" x2="38" y1="16.1233" y2="47.8767"><animate attributeName="y1" dur="750ms" values="18;16;16;18;28;18" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="44;48;48;46;36;44" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values=".8;1;1;.4;.5;.8" repeatCount="indefinite"></animate></line><line x1="52" x2="52" y1="16" y2="48"><animate attributeName="y1" dur="750ms" values="28;18;16;16;18;28" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="36;44;48;48;46;36" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values=".5;.8;1;1;.4;.5" repeatCount="indefinite"></animate></line></g></svg>
          <slot>
               <div class="f-14 list-total">共{{totalPages}}条</div>
            <div class="mypublist bg-ffffff mb-15" v-for="(item,index1) in mypublist" :key="index1" ref="pubItem">
              <div class="list-header clearfix">
                <span class="tit-nowrap color-333 f-16">受助人：{{item.aideder_name}}</span>
              </div>
              <div class="list-content">
                <div class="dis-block linkonly" @click=getHelpType(item.demand_type,item.id)>
                  <div class="flex-tab">
                    <div class="flex-tab-cell tab-left">
                      <img :src="item.img_url||'../../static/appimg/rec/slh3.png'" width="80" height="80">
                    </div>
                    <div class="flex-tab-cell tab-right">
                      <h1 class="color-333 f-16 f-normal tit-nowrap">{{item.demand_title}}</h1>
                      <p class="color-999 f-14 tit-2row-nowrap">{{item.demand_coment}}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="list-state clearfix">
                <div class="f_l f-14" :class="STATUS_MAP_UI[item.demand_status].textColor">
                  {{STATUS_MAP_UI[item.demand_status].statusText}}
                </div>
                <div class="display-flex right-btn-contatiner">
                  <p v-for="(btn,index) in STATUS_MAP_UI[item.demand_status].listButtonArray"
                     :key="index"
                       v-if="isshow(item,btn.text)"
                     :class="{'btn-bordered-gray':index===0,'btn-bordered-orange':index===1,}"
                     class="ml-10  f-14">
                    <span v-if="item.demand_status ===3  &&  btn.text.indexOf('信息')>-1 ">6</span>
                    

                    <span v-else @click="remindUrl(btn,item)">{{btn.text}}</span>
                    <!-- <contatiner :text='btn.text' :demenId='item.id' :url='btn.url'></contatiner> -->
                  </p>
                  <p   class="ml-10  f-14 btn-bordered-orange" v-if="towarn(item)">
                  <span  @click="remind(item)">提醒一下</span>
                  </p>
                   <p   class="ml-10  f-14 btn-bordered-gray" v-else-if="haswarned(item)">
                    <span >已提醒</span>
                    </p>
                   <p 
                         v-if="isFshow(item.is_feedback)"
                         :class="{'btn-bordered-gray':index===0,'btn-bordered-orange':index===1,}"
                         class="ml-10  f-14">
                           <span @click="remindFeedBack('viewlovefeedback',item)"> 查看感谢回馈</span>
                 
               </p>
                </div>
              </div>
            </div>
            <div @click='getData' v-if="hasMore  > totalPages" class="loading">
              {{hasMore}}
              <spinner type="ios"></spinner>
            </div>
          </slot>
          <svg class="spinner" style="fill: #ec4949;" slot="infinite-spinner" viewBox="0 0 64 64">
            <g><circle cx="16" cy="32" stroke-width="0" r="3"><animate attributeName="fill-opacity" dur="750ms" values=".5;.6;.8;1;.8;.6;.5;.5" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="3;3;4;5;6;5;4;3" repeatCount="indefinite"></animate></circle><circle cx="32" cy="32" stroke-width="0" r="3.09351"><animate attributeName="fill-opacity" dur="750ms" values=".5;.5;.6;.8;1;.8;.6;.5" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="4;3;3;4;5;6;5;4" repeatCount="indefinite"></animate></circle><circle cx="48" cy="32" stroke-width="0" r="4.09351"><animate attributeName="fill-opacity" dur="750ms" values=".6;.5;.5;.6;.8;1;.8;.6" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="5;4;3;3;4;5;6;5" repeatCount="indefinite"></animate></circle></g></svg>
        </scroller>
      </div>
    </div>
  </div>
</template>

<script>
  import { XHeader, XImg, Spinner } from 'vux'
  import STATUS_MAP_UI from './STATUS_MAP_UI'
  import selectTab from '@/components/select/selectTab'
  import { getMinPic } from '../../../util/getMin'
  import selectRegion from '@/components/select/selectRegion'
  import { setTimeout } from 'timers'
    import {get_status_list} from '@/components/select/selectHttp'

  export default {
    name: 'mypub_list',
    components: { XHeader, XImg, Spinner, selectTab, selectRegion },
    data () {
      return {
        demandStatus: '',
        demandTypes: '',
        demandtype: '',
        pageNum: 1,
        mypublist: [],
        totalPages: 1,
        isLoading: false,
        helpType: '',
        STATUS_MAP_UI: STATUS_MAP_UI,
        isPoor: '',
        self: '',
        str: '',
        header: [
          '全部需求',
          '教育需求',
          '医疗需求',
          '住房需求',
          '物品需求',
          //   '民生需求'
        ],
        title: '',
        selects: [
          { title: '本人审核', type: 1,active:false},
          {
            title: '需求类型',
            type: 2, // 是否下拉形式
            typefor: 1, // 下拉样式
            ischeckbox: false, // true 多选   false 单选
            list_index: -1, // 选中默认值
            demand: 0, // 0 需求 1 地域
            list: [] // tree数据，selecthttp.js 加载
          },

          {
            title: '状态',
            type: 2,
            typefor: 3,
            list_index: 0,
            list: []
          }
        ],
        selects2: [
          {
            title: '地域',
            type: 2, // 是否下拉形式
            typefor: 1, // 下拉样式
            list_index: -1, // 选中默认值
            demand: 0, // 0 需求 1 地域
            parmas_id: JSON.parse(localStorage.getItem('leaderId')), // 筛选管理员需求，所需参数
            // parmas_id:'',  //筛选地域时默认为空，全部地域搜索
            list: [] // tree数据，selecthttp.js 加载
          }
        ],
        cityid: '',
        key: ''
      }
    },
    computed: {
      typeCode () {
        this.demandtype = this.$route.params.typeCode
        return this.$route.params.typeCode == 0
          ? (this.$route.params.typeCode = '')
          : this.$route.params.typeCode
      },
    
      hasMore () {
        return this.mypublist.length < this.totalPages
      }
    },
    methods: {
      towarn(item){
      if(item.demand_status==4){
      }
      return item.demand_status==4&&item.remind_state==0
      },
      haswarned(item){
      return item.demand_status==4&&item.remind_state==1

      },
       isshow(item,text){
       if(text!="填写感谢回馈"&&text!="重新编辑"){
         return true
       }
       else{
         if(text=="填写感谢回馈"){
         if(item.is_feedback&&item.is_feedback>0){
           return false
         }
         return true
       }
       else{
          if(item.is_self==1){
           return true
         }
         return false
       }
       }
      },
      isFshow(feednum){
       if(feednum&&feednum>0){
           return true
         }
         return false
      },
      remindFeedBack(url,item){
        this.$router.push({
              name: url,
              params: { demandId: item.id }
            })
      },
      getdatas (datas) {
        if(this.typeCode ==0 && datas[1].help_type_code) {
                this.demandtype = datas[1].help_type_code;
         }
        this.mypublist = []
        this.pageNum = 1
        this.totalPages = 1
        this.TypeCode = datas[1].help_type_code
        if (datas[1].help_type_code == 0) {
          this.TypeCode = ''
        } else {
          this.TypeCode = datas[1].id
        }

        if (datas[0].check) {
          this.self = 1
        } else {
          this.self = ''
        }
        if (datas[1].category_name === '贵州省') {
          this.cityid = datas[1].id
          this.TypeCode = this.key
        }
        if (datas[1].category_name === '城市') {
          this.cityid = datas[1].id
          this.TypeCode = this.key
        }
        if (datas.length === 3) {
      let statusText=datas[2]
        if(statusText==='全部'){
          this.demandStatus=''
        }else{
         let list=get_status_list(this,2,this.demandtype,this.G('leaderLevel'));

          if(list.indexOf(datas[2])>-1){
          for(let key in STATUS_MAP_UI){
            if(STATUS_MAP_UI[key].statusText===datas[2]){
              this.key = datas[1].id
              this.demandStatus = key
              break
            }
          }
          }
          else{
             this.selects[2].title = "状态"
              this.selects[2].list_index = 0   
             this.demandStatus=''
          }
          if (datas[3] === '全部') {
             this.selects[2].title = "状态"
              this.selects[2].list_index = 0  
              this.demandStatus = ''
            } else if (datas[3] === '发布超时') {
              this.demandStatus = 8
            }

        }
          // for (let key in STATUS_MAP_UI) {
          //   if (datas[2] === STATUS_MAP_UI[key].statusText) {
          //     this.key = datas[1].id
          //     this.demandStatus = key
          //   } else if (datas[3] === '全部') {
          //     this.demandStatus = ''
          //   } else if (datas[3] === '发布超时') {
          //     this.demandStatus = 8
          //   }
          // }
        }
       
        this.getData()
      },
      // 按钮提醒一下
      remind (item) {
    //   let time = new Date()
   //     let state = item.remind_state
        this.$http.post('hts/management/msgRemind', {
          demandId: item.id
        })
          .then(res => {
         
           // if (time.getDay() === 1) {
              item.remind_state = 1
              this.showToast('', 'text', '已成功提醒!')
           // } else {
          //    item.remind_state = 1
          //  }
          }).catch(error => {
          if (error.code == 'X0002') {
            item.remind_state = 0
           
          } else if (error.code == 'M2003') {
            item.remind_state = 1
         
          }
          if(error.msg)
           this.showToast('', 'text', error.msg)
        })
      },
      remindUrl (btn, item) {

        if(btn.text === '提醒一下'){
          this.$http.post('/hts/management/msgRemind',{
            demandId:item.id
          }).then((res) => {
            this.showToast('', 'text', res.msg)
          })
          .catch((err) => {
            if(err.msg)
            this.showToast('', 'text', err.msg)
          })
        }else{
          if (btn.url !== '') {
            this.$router.push({
              name: btn.url,
              params: { demandId: item.id }
            })
          }
        }
      },
      getData (done) {
        let msg = {
          page: this.pageNum,
          helpTypeCode: this.typeCode,
          demandStatus: this.demandStatus,
          demandTypes: this.TypeCode,
          isOneself: this.self,
          regionOneId: this.cityid,
          state: 1,
          sort:3
        }
     
        this.$http.post('hts/management/showList', msg).then(res => {
          res.data.vos.map(item => {
            if (item.demand_status === -1) {
              item.demand_status = 0
            }
          })
          this.mypublist = [...this.mypublist, ...res.data.vos]
          this.title = this.header[this.typeCode === 0 ? 0 : this.typeCode]
          this.totalPages = res.data.totals
          // 获取天数  7天提醒一下
          // this.mypublist.map(res => {
          //   let dateTimeStamp = new Date(res.remind_date).getTime()
          //   let minute = 1000 * 60
          //   let hour = minute * 60
          //   let day = hour * 24
          //   let month = day * 30
          //   let now = new Date().getTime()
          //   let diffValue = now - dateTimeStamp
          //   let dayC = diffValue / day
          //   if (res.remind_date === null) {
          //     res.remind_state = 0
          //   } else if (parseInt(dayC) > 7) {
          //     res.remind_state = 0
          //   } else {
          //     res.remind_state = 1
          //   }
          // })
          if (done) {
            done(true)
          }
        })
      },
      getHelpType (type, id) {
        type == 2
          ? this.$router.push({
            name: 'myManagement_capital',
            params: { demandId: id }
          })
          : this.$router.push({
            name: 'myManagement_goods',
            params: { demandId: id }
          })
      },
      changetype (imgurl) {
        return getMinPic(imgurl)
      },
      refresh (done) {
        setTimeout(() => {
          this.mypublist = []
          this.pageNum = 1
          this.getData(done)
          done()
        }, 1500)
      },
      infinite (done) {
        setTimeout(() => {
          this.pageNum++
          this.getData(done)
          done(true)
        }, 1500)
      }
    },
    created () {
       this.L('flag',2)
      this.getData()
      // if (this.mypublist.length !== 0) {
      //   this.remind()
      // }
      //状态根据需求类型不同做相应的调整
      this.demandtype = this.typeCode;
    }
  }
</script>

<style scoped lang="less">
  .list-total {
    padding: 5px 15px;
  }

  .list-topoperate {
    padding: 0;
  }

  .list-topoperate span {
    display: inline-block;
    padding: 10px 30px 10px 15px;
  }

  .list-topoperate i.icon-caret {
    display: inline-block;
    position: relative;
    width: 0;
    height: 0;
    border: 4px solid;
    border-color: #999 transparent transparent transparent;
    top: 2px;
    left: 4px;
  }

  .list-topoperate em {
    padding: 6px 15px;
  }
  .loading {
    text-align: center;
    color: gray;
  }
  .list-header {
    padding: 10px 15px;
    border-bottom: 1px solid #eee;
  }

  .list-content {
    padding: 15px 15px;
  }

  .list-content .tab-left {
    width: 90px;
  }

  .list-content .tab-right {
    position: relative;
  }

  .list-content .tab-right h1 {
    line-height: 100%;
  }

  .list-content .tab-right p {
    position: absolute;
    bottom: 0;
  }

  .list-content .tab-right p span {
    padding-right: 10px;
  }

  .list-state {
    padding: 10px 15px;
    border-top: 1px solid #eee;
    .right-btn-contatiner {
      justify-content: flex-end;
      .btn-bordered {
        margin-left: 10px;
      }
    }
  }
  .box-withheader-nav {
    position: absolute;
    top: 39px;
    bottom: 0;
    left: 0;
    right: 0;
  }
  ._v-container {
    top: 10px;
  }
</style>
