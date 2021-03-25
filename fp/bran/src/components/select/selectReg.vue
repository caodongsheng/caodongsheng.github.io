<template>
  <div class="select_tab">
    <div class="item" v-for="(item,index) in list" :key="index">
      <div :class="index==tab.index?'active':''" class="region-container" @click="Tactive">
        <span>{{names}}</span>
        <i></i>
      </div>
    </div>
    <transition name="move">
      <div class="opac" v-show="op_show">
          <div class="abs">
              <div class="examine">
                  <div class="cent">
                      <div class="lie1">
                          <scroller refresh-layer-color="#4b8bf4" loading-layer-color="#ec4949" class="posss">
                              <p @click="clickReg()">全部</p>
                              <p :class="regionid==index?'active':''" @click="clickReg(item)" v-for="(item,index) in dataList" :key="item.westRegionId" >{{ item.westRegionName }}</p>
                          </scroller>
                      </div>
                  </div>
              </div>
          </div>
          <div class="end" @click="end"></div>
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
    props:['datas'],
    data () {
      return {
       op_show:false,
       names:'地域',
       list:this.datas,
       regionid:9999,
       tab:{
          index:'1'
       },
       regionNameIdindex:'',
       dataList:[]
      }
    },
    computed: {
     
    },
    watch: {
      
    },
    methods :{
        end () {
        this.tab.index = '1';
        this.op_show = false;
      },
      clickReg(item){
        console.log(item)
        let arr=[]
        let chosee={}
        let state='城市'
        if(item){
          this.names=item.westRegionName
          chosee.category_name='城市'
          chosee.regionNameIdname=item.westRegionName
          chosee.id=item.westRegionId
        }else{
          this.names='全部'
          chosee.category_name='城市'
          chosee.regionNameIdname='全部'
          chosee.id=this.$store.state.city.id
        }
        
        console.log(arr)
        arr.push(state ,chosee)
        this.$emit('getdatas',arr)
        this.end()
      },
     Tactive () {
        if(this.tab.index=== '1'){
          this.tab.index = '0'
          this.op_show = true;
          this.getProvince();
        }else{
          this.end()
        }
      },
      getProvince(){
        if(this.$store.state.cityDates && this.$store.state.cityDates !='' && this.$store.state.cityDates != null && this.$store.state.cityDates!=undefined){
          this.dataList=this.$store.state.cityDates
        }else{
          this.$http.post('hts/help/getWestCityByEastCityId',{
            regionId:this.$store.state.city.id,
          }).then((res)=>{
            console.log(res)
              this.$store.state.cityDates=res.data
              this.dataList=res.data
          }).catch(function (error) {})
        }
          
      },
    },
    mounted (){
      
    },
    created(){
      
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
    width: 95%;
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
    padding-right: 15px;
    .item{
      flex: 1;
      text-align: center;
      font-size: 13px;
      color: #666666;
      .region-container{
        align-items: center;
        span{
          width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      input{
        position: relative;
        top: 2px;
        right: 2px;
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
          padding: 7px 7px;
          border-radius: 3px;
          margin-right: 10px;
          border: 1px solid #ccc;
          margin-bottom: 6px;
        }
      }
      .posss{
          position: static !important;
      }
      .cent{
        width: 100%;
        height:265px;
        overflow: hidden;
        .fourGrid{
          width: 25%;
        }
        .threeGrid{
          width: 33.3333%;
        }
        .twoGrid{
          width: 50%;
        }
        .lie1{
          // width: 25%;
          font-size: 14px;
          height: 265px;
          float: left;
          // overflow-y: scroll;
          overflow: hidden;
          -webkit-overflow-scrolling: touch;
          // overflow:scroll;
          // -webkit-overflow-scrolling:touch !important;
          // touch-action: pan-y !important;
          .gggg{
              min-height: 300px;
              height: auto;
          }
          p{
            width: 100%;
            height: 44px;
            line-height: 44px;
            box-sizing: border-box;
            padding-left: 15px;
            overflow: hidden;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color:#666;
            font-size: 14px;
          }
          .active{
            background:#f7f9f8;
            color: #ed6b2b;
          }
        }

        .lie2,.lie3{
          // width: 25%;
          background:#f7f9f8;
          .active{
            background:#ededed;
          }
        }
        .lie4{
          // width: 25%;
          background:#ededed;
          p{
            position: relative;
            width: 100%;
            height: 44px;
            line-height: 44px;
            box-sizing: border-box;
            padding-left: 15px;
            padding-right:23px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .active{
            background:#f7f9f8;
            color: #ed6b2b;
          }
          .i{
            display: none;
            // float: right;
            // margin-right: 10px;
            // margin-top: 8px;
          }
          .active{
            .i{
              position: absolute;
              right: 0;
              top: 8px;
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
      padding: 3px;
      box-sizing: border-box;
      .li{
        width: 100%;
        height: 36px;
        font-size: 12px;
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
        padding: 10px 0 10px 20px;
        .status_item{
          margin-right: 21px;
          margin-bottom: 10px;
          font-size: 12px;
          color:#666;
          width: 91px;
          height: 26px;
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
