<template>
  <div>
    <x-header :left-options="{backText: ''}">{{helpState[aidedObj.status]}}</x-header>
    <div class="box-withbar over-auto bg-f6f5f6" :style="constainerHeight">
      <!--需求基本信息-->
      <div class="info-base bg-ffffff mb-12">
        <div class="flex-tab">
          <div class="flex-tab-cell tab-left linkonly">
            <img :src="aidedObj.image" width="80" height="80">
          </div>
          <div class="flex-tab-cell tab-right">
            <h1 class="color-333 f-16 f-normal tit-nowrap">{{aidedObj.demand_title}}</h1>
            <p class="color-999 f-14 tit-2row-nowrap">{{aidedObj.demendComent}}</p>
          </div>
        </div>
      </div>


      <!--收货地址-->
      <div class="address bg-ffffff mb-12">
        <group class="group-clearbd">
          <cell class="f-16" title="收货地址"></cell>
        </group>
        <div class="clearfix name-area f-14">
          <span class="f_l"><em class="color-999">收货人：</em>{{aidedObj.aideder_name}}</span><span class="f_r">{{aidedObj.aideder_tel}}</span>
        </div>
        <div class="add-area flex-tab-cell f-14">
          <div class="flex-tab-cell tab-left v-top color-999" style="width: 50px;">地址：</div>
          <div class="flex-tab-cell tab-right v-top">{{aidedObj.aideder_address}}</div>
          <!-- <div class="flex-tab-cell tab-right v-top">{{aidedObj.region_name + aidedObj.aideder_name}}</div> -->
        </div>
      </div>

      <!--帮扶详情-->
      <div class="helprecord bg-ffffff mb-12">
        <group class="group-clearbd">
          <cell class="f-16" title="帮扶详情">
          </cell>
        </group>
        <div class="recordshow">
          <router-link to="" class="dis-block">
            <h1 class="clearfix  f-14 f-normal">
              <em class="f_r color-999">{{createTime}}</em>
              <span class="dis-block tit-nowrap f-16">你捐赠了{{aidedObj.demand_use}}</span>
            </h1>
            <p class="f-14 color-999">
              {{aidedObj.bf_detail}}
            </p>
          </router-link>
          <swiper :options="swiperOption" ref="mySwiper" class="scrollswiper">
            <swiper-slide v-for="(item1,index1) in aidedObj.img" :key="index1">
              <!-- <img :src="item1" class="previewer-demo-img" @click="show(index1)"> -->
              <div class="previewer-demo-img" style="padding-top:100%" @click="show(index1)" :style="{backgroundImage:'url('+item1+')',backgroundSize:'cover',backgroundPosition:'center'}">
              </div>
            </swiper-slide>
          </swiper>
          <div v-transfer-dom>
            <previewer :list="goodsImglist" ref="previewer" :options="options"  :style="getTop"></previewer>
          </div>
        </div>


      </div>

      <!--捐赠方式-->
      <div class="helpway bg-ffffff mb-12">
        <group class="group-clearbd">
          <!--捐赠方式：面对面v-if-->
          <cell class="f-16" title="捐赠方式" value="面对面捐赠" v-if="helpway===1"></cell>
          <!--捐赠方式：快递v-if-->
          <cell class="f-16" title="捐赠方式" value="快递" v-if="helpway===2"></cell>
        </group>
        <!--需求编号及状态-->
        <div class="pub-state bg-ffffff  f-14">
          <span class="color-999">需求编号：{{aidedObj.demend_code}}</span>
          <div class="state-timeline-head">
            <span class="color-999">需求状态：{{helpState[aidedObj.status]}}</span>
          </div>
          <span class="color-999">帮扶时间：{{aidedObj.contribute_time}}</span>
        </div>
      </div>
    </div>
    <!--底部操作-->
    <div class="btm-ope" v-if="aidedObj.status==1">
      <div class="f-12 resttime"><i class="fa fa-clock-o" aria-hidden="true"></i> 还剩{{aidedObj.countdown}}送出物品</div>

        <router-link :to="{name: 'helpHeWriteExp',params: {id: aidedID, demandId: demandCode, type: helpway}}" class="f_r btn-bordered btn-bordered-orange f-15">送出帮扶物</router-link>
        <router-link to="" @click.native="showconfirm=!showconfirm" class="f_r btn-bordered btn-bordered-gray f-15">取消帮扶</router-link>      <div class="btngroup clearfix">
      </div>
    </div>

    <!--删除帮扶提示弹窗-->
    <div v-transfer-dom>
      <confirm v-model="showconfirm" title="友情提示" confirm-text="继续捐赠" cancel-text="取消捐赠"
        @on-cancel="cancelDonate" @on-confirm="continueDonate">
        <p class="f-14 text-center" style="line-height: 24px;margin: 15px 0">
          此时取消捐赠，之前填写的捐赠信息将被清空，建议您继续完成编辑</p>
      </confirm>
    </div>

  </div>
</template>

<script>
  import {XHeader, Group, Cell, CellBox, XButton,  Previewer, TransferDom,Confirm} from 'vux'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'

  export default {
    components: {XHeader, Group, Cell, CellBox, XButton, swiper, swiperSlide, Previewer,Confirm},
    name: "mypub_goods",
    directives: {
      TransferDom
    },
    data() {
      return {
        showconfirm:false,
        aidedObj:{},
        aidedID:this.$route.params.id,
        // 帮扶方式 1.面对面 2.快递
        helpway: this.$route.params.helppattern,
        demandCode:'',
        aidedName: '',
        createTime: '',
        goodsImglist: [],
        helpState: ['待认领','待送出','已送出','帮扶成功','已关闭'],
        swiperOption: {
          notNextTick: true,
          slidesPerView: 3,
          spaceBetween: 10
        },
        options: {
          getThumbBoundsFn(index) {
            let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
            let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
            let rect = thumbnail.getBoundingClientRect()
            return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
          }
        }

      }
    },
    created(){
        this.$http.post('hts/record/goods',{
            'povertyCode': this.$route.params.id
        })
        .then(res => {
  
            this.aidedObj = res.data;
            this.createTime = this.aidedObj.create_date.substr(5,5);
            // this.goodsimglist = this.aidedObj.img;
            let imgList = this.aidedObj.img
            imgList.forEach((item) => {
                let img = {}
                img.src = item
                this.goodsImglist.push(img)
            })



            this.demandCode = res.data.demend_code;
            this.aidedName = res.data.aideder_name
            console.log(this.demandCode)
        })
        .catch(err => {
            console.log(err);
        })
    },
     computed:{
     getTop(){
       return {
         top:window.localStorage.getItem("hheight")
       }
    },

  },
    methods: {
    
      show(index1) {
        this.$refs.previewer.show(index1)
      },
      //取消帮扶
      cancelDonate(){
            this.$http.post('hts/record/close',{
                'id': this.aidedID
            })
            .then(res => {

                this.showToast('','text','取消帮扶成功','20em','','middle');
                this.$router.push('/loveNeed/'+ this.aidedObj.demend_code);
            })
            .catch(err => {

                this.showToast('','text','取消帮扶失败','','middle');
            })

      },
       constainerHeight:function(){
      if(this.aidedObj.status==1){
        return {
          bottom:'80px'
        }
      }
      else{
        return {
           bottom:'0px'
        }
      }
       },
      continueDonate(){
          this.showconfirm = false;
      }
    }
  }
</script>


<style scoped>
  .box-withbar {
    bottom: 55px
  }

  .weui-cell_access >>> .weui-cell__ft:after {
    margin-top: -2px
  }

  .group-clearbd >>> .weui-cells {
    margin-top: 0
  }

  .group-clearbd >>> .weui-cells:before, .group-clearbd >>> .weui-cells:after {
    border: 0 none
  }

  /*需求基本信息*/
  .info-base {
    padding: 15px 15px
  }

  .info-base .tab-left {
    width: 90px
  }

  .info-base .tab-right {
    position: relative
  }

  .info-base .tab-right h1 {
    line-height: 100%;
  }

  .info-base .tab-right p {
    position: absolute;
    bottom: 0
  }

  .info-base .tab-right p span {
    padding-right: 10px;
  }

  /*收货地址部分*/

  .address .name-area {
    padding: 15px 15px;
    border-top: 1px solid #eee
  }

  .address {
    background: url('/static/appimg/address-bg.jpg') repeat-x bottom #fff;
    background-size: auto 5px
  }

  .address .add-area {
    padding: 0 15px 20px 15px;
  }

  /*帮扶详情部分*/
  .recordshow {
    border-top: 1px solid #eee;
    padding: 10px 15px;
  }

  .recordshow h1 span {
    padding: 0 10px 6px 0
  }

  .recordshow h1 em {
    padding-top: 4px
  }

  .recordshow p {
    padding-bottom: 10px
  }

  /*需求编号和进展状态*/
  .pub-state {
    padding: 15px 15px 15px 15px;
    border-top: 1px solid #eee;
  }

  .state-timeline-head {
    padding: 5px 0
  }

  /*底部操作栏*/
  .resttime {
    line-height: 26px;
    background: #ee8753;
    color: #ffffff;
    padding: 0 15px;
  }

  .btm-ope {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 222;
  }
.btm-ope .btngroup{    padding: 13px 15px;
  border-top: 0px solid #eee;}
  .btm-ope .btn-bordered {
    margin-right: 10px
  }

  .btm-ope .btn-bordered.btn-bordered-orange {
    margin-right: 0
  }


</style>
