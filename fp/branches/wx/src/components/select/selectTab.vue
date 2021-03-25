
<template>
  <div class="select_tab">
    <div class="item" v-for="(item,index) in tab.tab_list" :key="index" @click="tabswitch(index)">
      <div v-if="item.type==1">
        <input type="checkbox" v-model="item.active" :id="'checkboxs'+index"><label :for="'checkboxs'+index"><span>{{item.title}}</span></label>
      </div>
      <div v-if="item.type==2" :class="index==tab.index?'active':''">
        <span>{{item.title}}</span><i></i>
      </div>
    </div>
    <transition name="move">
      <div class="opac" v-show="op_show" @click="backhide">
        <div class="abs" v-for="(item,index) in tab.tab_list" >
          <div class="examine" v-if="item.typefor==1" v-show="tab.index==index">
            <div class="history" v-show="history_show">
              <div class="history_title">
                <icon type="waiting-circle" style="color:#ccc;font-size:20px"></icon>
                <span>历史记录</span>
              </div>
              <div class="hisory_cent">
                <span v-for="item in history_list">{{item.category_name}}</span>
              </div>
            </div>
            <div class="cent">
              <div class="lie1">
                <p :class="item.list_index==-1?'active':''" @click.stop="item.list_index=-1;lis2_index=-1">{{demand_value[item.demand]}}</p>
                <p v-for="(et,index) in item.list" :class="item.list_index==index?'active':''" @click.stop="item.list_index=index;lis2_index=-1;lis3_index=[]" :key="index">{{et.category_name}}</p>
              </div>
              <div class="lie1 lie2" v-if="item.list_index!=-1&&item.list[item.list_index].nodes.length>0">
                <p :class="lis2_index==-1?'active':''" @click.stop="lis2_index=-1">全部</p>
                <p v-for="(et,index) in item.list[item.list_index].nodes" :class="lis2_index==index?'active':''" @click.stop="lis2_index=index;lis3_index=[];" :key="index">{{et.category_name}}</p>
              </div>
              <div class="lie1 lie3" v-if="lis2_index!=-1&&item.list[item.list_index].nodes[lis2_index].nodes.length>0">
                <p @click.stop="all" :class="lis3_index.length==0?'active':''">
                  全部
                  <x-icon type="ios-checkmark-empty" size="25" class="i"></x-icon>
                </p>
                <p v-for="(et,index) in item.list[item.list_index].nodes[lis2_index].nodes" :class="mapclass(index)?'active':''" @click.stop="maplis3(index,item.ischeckbox)">
                  {{et.category_name}}
                  <x-icon type="ios-checkmark-empty" size="25" class="i"></x-icon>
                </p>
              </div>
            </div>
            <div class="btns">
              <div @click.stop="reset(index)">重置</div>
              <div class="sucess" @click.stop="end(true)">完成</div>
            </div>
          </div>
          <div class="item_cent" v-if="item.typefor==2" v-show="tab.index==index">
            <div class="li " v-for="(et,index) in item.list" :class="item.list_index==index?'active':''" @click.stop="item_end(item,index)">{{et}}</div>
          </div>
          <div class="item_cent" v-if="item.typefor==3" v-show="tab.index==index">
            <div class="status">
              <div class="status_item" v-for="(et,index) in item.list" :class="item.list_index==index?'active':''" @click="item_end(item,index)">{{et}}</div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import {get_type_list,get_status_list} from './selectHttp'
  import {Icon} from 'vux'
  export default {
    components:{
      Icon
    },
    props:['datas','code','demandType','typeCode'],
    data(){
      return {
        history_show:false,
        demand_value:['全部分类','全国'],
        op_show:false,  //
        lis2_index:-1,  //需求二级index
        lis3_index:[], //需求三级数组。
        tab:{
          index:-1,
          tab_list:this.datas
        },
        history_list:[],
        arr:[],
        codes: this.code
      }
    },
    methods:{
      backhide(){
        this.op_show = false
      },
      reset(index){
        this.tab.tab_list[index].list_index=-1;
        this.lis2_index=-1;
        this.lis3_index=[];
        this.end(true)
      },
      all(){
        this.lis3_index=[];
      },
      mapclass(index){
        for(let i=0;i<this.lis3_index.length;i++){
          if(index===this.lis3_index[i]){
            return true
          }
        }
        return false ;
      },
      maplis3(index,item){
        if(item){ //是否多选
          if(this.lis3_index.length===0){
            this.lis3_index.push(index);
            return ;
          }
          for(let i=0;i<this.lis3_index.length;i++){
            if(index===this.lis3_index[i]){
              this.lis3_index.splice(i,1)
              return
            }
          }
          this.lis3_index.push(index)
        }else{ //单选
          this.lis3_index=[];
          this.lis3_index.push(index)
        }

      },
      maplist(){
        for(let j=0;j<this.tab.tab_list.length;j++){
          if(this.tab.tab_list[j].typefor===1){
            for(let i=0;i<this.tab.tab_list[j].list.length;i++){
              this.$set(this.tab.tab_list[j].list[i],'active',0)
            }
          }
        }
      },
      item_end(item,index){
        item.list_index=index;
        this.end()

      },
      end(is){
        // console.log('is',is)
        let radio=true;
        if(is){
          let obj=[]

          let index=-1;
          for(let i=0;i<this.datas.length;i++){
            if(this.datas[i].type===2 && this.datas[i].typefor===1 ){
              if(this.datas[i].demand===1){
                obj={
                  "id": "0000",
                  "help_type_code": "0",
                  "category_name": "全国",
                }
              }else{
                obj={
                  "id": "0000",
                  "help_type_code": "0",
                  "category_name": "全部分类",
                }
              }

              index=i
              if(this.datas[i].list[this.datas[i].list_index]!== undefined){

                if(this.datas[i].list[this.datas[i].list_index].nodes[this.lis2_index] !== undefined){
                  if(this.lis3_index.length>0){
                    index=i

                    if(this.datas[i].ischeckbox){
                      radio=false;
                      obj=[]
                      for(let t=0;t<this.lis3_index.length;t++){
                        obj.push(this.datas[i].list[this.datas[i].list_index].nodes[this.lis2_index].nodes[this.lis3_index[t]])
                      }
                    }else{
                      radio=true
                      obj=this.datas[i].list[this.datas[i].list_index].nodes[this.lis2_index].nodes[this.lis3_index[0]]
                    }
                  }else{
                    index=i
                    obj=this.datas[i].list[this.datas[i].list_index].nodes[this.lis2_index]
                  }
                }else{
                  index=i
                  obj=this.datas[i].list[this.datas[i].list_index]
                }
              }else{
              }

            }
          }

          this.op_show=false;
          this.tab.index=-1;


          this.arr[index]=obj
        }else{
          this.op_show=false;
          this.tab.index=-1;
        }
        for(let i=0;i<this.tab.tab_list.length;i++){
          if(this.tab.tab_list[i].type===1){//check
            this.arr[i]={check:this.tab.tab_list[i].active}
          }else if(this.tab.tab_list[i].type===2){ //下拉
            if(this.tab.tab_list[i].typefor===2){//用户类型
              this.arr[i]=this.tab.tab_list[i].list[this.tab.tab_list[i].list_index];
              if(this.arr[i]==='全部'){
                this.tab.tab_list[i].title='用户类型'
              }else{
                this.tab.tab_list[i].title=this.arr[i]
              }

            }else if(this.tab.tab_list[i].typefor===3){ //状态
              this.arr[i]=this.tab.tab_list[i].list[this.tab.tab_list[i].list_index]
              if(this.arr[i]==='全部'){
                this.tab.tab_list[i].title='全部'
              }
              else{
                this.tab.tab_list[i].title=this.arr[i]
              }
            }
            else if(this.tab.tab_list[i].typefor===1){ //需求 地域
              let radio=true;
              let obj=[];
              if(this.tab.tab_list[i].demand===1){
                if(radio){
                  for(let i=0;i<this.$store.state.history_address.length;i++){
                    if(this.$store.state.history_address[i].id === this.tab.tab_list[i].id){
                      return
                    }
                  }
                  if(this.$store.state.history_address.length>7){
                    this.$store.state.history_address.shift();
                  }
                  this.$store.state.history_address.push(this.tab.tab_list[i]);
                }else{
                  let a = new Set(this.tab.tab_list[i].id);
                  let b = new Set(this.$store.state.history_address);
                  let union =  Array.from(new Set([...b, ...a]));
                  if(union.length>8){
                    union.splice(0,union.length-8);
                  }
                  this.$store.state.history_address = union;
                }
                if(this.arr[i] === undefined){
                  this.arr[i]={
                    "id": "0000",
                    "help_type_code": "0",
                    "category_name": "全国",
                  }
                }
              }else if(this.tab.tab_list[i].demand===0){ //需求
                if(this.arr[i] === undefined){
                  this.arr[i]={
                    "id": "0000",
                    "help_type_code": "0",
                    "category_name": "全部分类",
                  }
                }else{
                  this.tab.tab_list[i].title=this.arr[i].category_name
                }
              }
            }
          }

        }
        this.$emit('getdatas',this.arr)
      },
      tabswitch(index){
        this.$store.state.indexId = 8;
        if(index===this.tab.index){
          if(this.tab.tab_list[index].type===1){
            this.op_show=false;
            this.tab.index=-1;
            if(this.tab.tab_list[index].active){
              this.tab.tab_list[index].active=false;
            }else{
              this.tab.tab_list[index].active=true
            }
            this.end()
          }else{
            if(this.op_show){
              this.op_show=false;
              this.tab.index=-1;
            }else{
              this.op_show=true;
            }
          }
        }else{
          if(this.tab.tab_list[index].type===1){
            this.op_show=false;
            if(this.tab.tab_list[index].active){
              this.tab.tab_list[index].active=false;
            }else{
              this.tab.tab_list[index].active=true
            }
            this.end()
          }else{
            this.op_show=true;
          }
          this.tab.index=index;
        }
      },
      map_data(){
        for(let i=0;i<this.datas.length;i++){
          if(this.datas[i].type===2 && this.datas[i].typefor===1){ //需求分类  添加数据
            this.datas[i].list=get_type_list(this,this.datas[i].demand,this.code,this.typeCode);
          }
          else if(this.datas[i].type===2 && this.datas[i].typefor===3){
            this.datas[i].list=get_status_list(this,i,this.demandType,this.G('leaderLevel'));
          }
        }
      },
      ishistory(){
        for(let i=0;i<this.datas.length;i++){
          if(this.datas[i].type===2 && this.datas[i].typefor===1){ //需求分类  添加数据
            // console.log(this.datas[i].demand,this.$store.state.history_address.length)
            if(this.datas[i].demand === 1 && this.$store.state.history_address.length > 0){ //是地域
              this.history_show=true;
              this.history_list=this.$store.state.history_address;
            }else{
              this.history_show=false;
            }
          }

        }
      }
    },
    computed: {
      listenshowpage1() {
        return this.$store.state.indexId;
      }
    },

    watch:{
      datas:{
        handler: function(val, oldVal){
          this.tab.tab_lsit = val;
         // this.tab.index = 0;
        },
        deep: true
      },
      op_show(n,v){
        if(n){
          this.ishistory();
          this.map_data();
          // console.log(this.datas[0].list_index);
        }else{

        }

      },
      listenshowpage1: function(a, b) {
        if(a === 2){
          this.op_show=false;
          this.tab.index=-1;
        }
      }

    },
    mounted(){
      this.map_data();
    },
  }
</script>

<style lang="less" scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .move-enter-active, .move-leave-active{
    transition: all 0.3s ease;
  }
  .move-enter, .move-leave-active{
    opacity: 0;
    transform: translateY(0px);
  }
  .move-enter, .move-leave-active .in{
    // transform: rotate(45deg)
    transform: translateY(-30px);
  }
  .select_tab{
    width: 100%;
    height: 39px;
    // border-bottom: 1px solid #e5e5e5;
    display: flex;
    box-sizing: border-box;
    z-index: 1000;
    background-color: #fff;
    top: 0;
    left:0;
    padding: 3px;
    line-height: 32px;
    /*position: relative;*/
    .item{
      flex: 1;
      text-align: center;
      font-size: 13px;
      color: #666666;
      input{
        position: relative;
        top: 2px;
        right: 2px;
        height: 14px!important;
        width: 14px!important;
      }
      i{
        width:0;
        height:0;
        border-width:0 4px 4px;
        border-style:solid;
        border-color:transparent transparent #666666;/*透明 透明  灰*/
        position:relative;
        top: -10px;
        left: 10px;
      }
      .active i{
        border-width:4px 4px 0;
        top: 10px;
        border-color:#f37306 transparent transparent;/*灰 透明 透明 */
      }
      .active span{
        color:#f37306;
      }
    }
    .opac{
      width: 100vw;
      height: 100vh;
      background:rgba(0,0,0,.5);
      position: absolute;
      left: 0;
      top: 40px;
      z-index: 999;
      .abs{
        position: absolute;
        top:0;
        left:0;
        width: 100%;
        z-index: 1;
      }
      .end{
        width: 100%;
        height: 100%;
      }
    }
    .posss{
      position: static !important;
    }
    // .education >>> .actionSheet >>> .body >>> .content >>> .list1{
    //     overflow: scroll;
    // }
    .examine{
      width: 100%;
      height: auto;
      background: #fff;
      position: relative;
      padding-bottom: 47px;
      .history{
        width: 100%;
        height: auto;
        .history_title{
          font-size: 14px;
          padding: 5px 10px;
          box-sizing: border-box;
          color: #666;
        }
      }
      .hisory_cent{
        width: 100%;
        height: auto;
        padding: 0px 10px 5px;
        box-sizing: border-box;
        overflow: hidden;
        span{
          float:left;
          font-size: 12px;
          line-height: 12px;
          padding: 2px 7px;
          border-radius: 3px;
          margin-right: 10px;
          border: 1px solid #ccc;
          margin-bottom: 6px;
        }
      }
      .cent{
        width: 100%;
        height:265px;

        .lie1{
          width: 33.333%;
          font-size: 14px;
          height: 265px;
          float: left;
          overflow: auto;
          p{
            width: 100%;
            height: 44px;
            line-height: 44px;
            box-sizing: border-box;
            padding-left: 20px;
            color:#666;
            font-size: 14px;
          }
          .active{
            background:#f7f9f8;
            color: #ed6b2b;
          }
        }
        .lie2{

          .lie1{
            width: 33.333%;
            font-size: 14px;
            height: 265px;
            float: left;
            overflow: scroll;
            -webkit-overflow-scrolling: touch;
            p{
              overflow: hidden;
              width: 100%;
              height: 44px;
              line-height: 44px;
              box-sizing: border-box;
              padding-left: 20px;
            }
            .active{
              background:#f7f9f8;
              color: #ed6b2b;
            }
          }


          width: 33.33%;
          background:#f7f9f8;
          .active{
            background:#ededed;
          }
        }
        .lie3{
          width: 33.33%;
          background:#ededed;
          .i{
            display: none;
            float: right;
            margin-right: 10px;
            margin-top: 8px;
          }
          .active{
            background:#ededed;
            .i{
              display:inline-block;
              fill: #ed6b2b;
            }
          }
        }
      }
      .btns{
        height:45px;
        width: 100%;
        overflow: hidden;
        position: absolute;
        bottom: 0;
        z-index: 1;
        box-shadow: 0 -5px 10px #e5e5e5;
        div{
          width: 50%;
          float:left;
          height: auto;
          line-height: 45px;
          text-align: center;
          color:#333
        }
        .sucess{
          background-color: #ed6b2b;
          color: #fff;
        }
      }
    }
    .item_cent{
      width: 100%;
      height: auto;
      background: #fff;
      padding: 3px 15px;
      box-sizing: border-box;
      .li{
        width: 100%;
        height: 36px;
        font-size: 14px;
        /* padding:3px 20px;*/
        color: #666;
      }
      .active{
        color: #f37306;
      }
      .status{
        width: 100%;
        height: auto;
        display: flex;
        box-sizing: border-box;
        flex-wrap:wrap;
        // justify-content: space-between;
        margin: 10px 0 10px 0;
        /*padding: 10px 0 10px 20px;*/
        .status_item{
          /*margin-right: 21px;
          margin-bottom: 10px;*/
          margin:10px 0 10px 0;
          font-size: 12px;
          color:#666;
          // width: 91px;
          flex: 0 30%;
          height: 26px;
          margin-right: 5px;
          justify-content: center;
          text-align: center;
          line-height: 26px;
          border-radius: 3px;
          border: 1px solid #ccc;
        }
        .active{
          border: 1px solid #f37306;
          color: #f37306;
        }

      }

    }
  }
</style>
