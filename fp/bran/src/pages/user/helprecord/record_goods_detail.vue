<template>
  <div>
    <x-header :left-options="{backText: '',preventGoBack:true}"  @on-click-back="goack">{{helpState[aidedPersonObj.status]}}</x-header>
    <div class="over-auto bg-f6f5f6" :class="canDo(aidedPersonObj.status)?'box-withbar':'box-withheader'" style="padding-bottom:20px;">
      <!--需求基本信息-->
      <div class="info-base bg-ffffff mb-12" @click="goToDetail()">
        <div class="flex-tab">
          <div class="flex-tab-cell tab-left linkonly">
            <img v-lazy="getmidpic(aidedPersonObj.image)" width="80" height="80">
          </div>
          <div class="flex-tab-cell tab-right">
            <h1 class="color-333 f-16 f-normal tit-nowrap">{{aidedPersonObj.demand_title}}</h1>
            <p class="color-999 f-14 tit-2row-nowrap">{{aidedPersonObj.demendComent}}</p>
          </div>
        </div>
      </div>

      <!--收货地址-->
      <div class="address bg-ffffff mb-12">
        <group class="group-clearbd">
          <cell title="收货地址"></cell>
        </group>
        <div class="clearfix name-area f-14">
          <span class="f_l"><em class="color-999">收货人：</em> {{aidedPersonObj.aideder_name}}</span><span class="f_r">{{aidedPersonObj.aideder_tel}}</span>
        </div>
        <div class="add-area flex-tab f-14">
          <div class="flex-tab-cell tab-left v-top color-999" style="width: 50px;">地址：</div>
          <div class="flex-tab-cell tab-right v-top">{{aidedPersonObj.aideder_address}}</div>
        </div>
      </div>

      <!--帮扶详情-->
      <div class="help-fooddetail bg-ffffff mb-12">
        <group class="group-clearbd">
          <cell title="帮扶详情"></cell>
        </group>
        <div class="detailshow">
          <router-link to="" class="dis-block">
           <h1 class="clearfix  f-14 f-normal">
              <em class="f_r color-999">{{createTime}}</em>
              <span class="dis-block tit-nowrap f-16 color-999">你帮扶了<b class="color-333 f-normal">{{aidedPersonObj.demand_use}}</b></span>
            </h1>
            <p class="f-14 color-999">
              {{aidedPersonObj.bf_detail}}
            </p>
          </router-link>
          <swiper :options="swiperOption" ref="mySwiper" class="scrollswiper">
            <swiper-slide v-for="(item1,index1) in aidedPersonObj.img" :key="index1">
              <!-- <img :src="item1" class="previewer-demo-img" @click="show(index1)"> -->
              <div class="previewer-demo-img" v-lazy:background-image="getmidpic(item1)" style="padding-top:100%" @click="show(index1)" :style="{backgroundSize:'cover',backgroundPosition:'center'}">
              </div>
            </swiper-slide>
          </swiper>
          <div v-transfer-dom>
            <previewer :list="goodsImglist" ref="previewer" :options="options" :style="getTop"></previewer>
          </div>
        </div>
      </div>

      <!--捐赠方式-->
      <div class="helpway bg-ffffff mb-12">
        <group class="group-clearbd">
          <!--捐赠方式：面对面v-if-->
          <cell title="帮扶方式" value="面对面" v-if="aidedPersonObj.help_pattern===1"></cell>
          <!--捐赠方式：快递v-if-->
          <cell title="帮扶方式" value="快递" v-if="aidedPersonObj.help_pattern===2"></cell>
          <cell></cell>
        </group>
      </div>
      <!--v-if=快递，物流信息-->
      <div class="transport bg-ffffff mb-12" v-if="aidedPersonObj.help_pattern===2 && aidedPersonObj.express_no !== null">
        <group class="group-clearbd">
          <cell title="物流信息"></cell>
        </group>
        <group class="group-clearbd">
          <cell-box   class="trans-con">
            <div class="color-999 f-14">
              <p>快递公司：{{aidedPersonObj.express_org}}</p>
              <p>物流单号：{{aidedPersonObj.express_no}}</p>
            </div>
          </cell-box>
        </group>
      </div>

      <!--v-if=面对面，帮扶人信息-->
      <div class="donor bg-ffffff mb-12" v-if="aidedPersonObj.help_pattern===1 && aidedPersonObj.donor_link_man !== null">
        <cell title="帮扶人信息"></cell>
        <div class="donor-content">
          <ul class="f-14">
            <li><span class="color-999">捐赠人：</span>{{aidedPersonObj.donor}}</li>
            <li><span class="color-999">联系人：</span>{{aidedPersonObj.donor_link_man}}</li>
            <li><span class="color-999">联系电话：</span>{{aidedPersonObj.donor_link_tel}}</li>
          </ul>
        </div>
      </div>

      <!--需求编号及状态-->
      <div class="pub-state bg-ffffff  f-14 mb-12">
        <ul class="f-14">
          <li><span class="color-999">需求编号：</span>{{aidedPersonObj.demend_code}}</li>
          <li><span class="color-999">需求状态：</span>{{helpState[aidedPersonObj.status]}}</li>
          <li v-if="aidedPersonObj.status == 4"><span class="color-999">关闭时间：</span>{{aidedPersonObj.close_date}}</li>
          <li v-else><span class="color-999">帮扶时间：</span>{{aidedPersonObj.contribute_time}}</li>
        </ul>
      </div>
    </div>

    <!--底部操作-->
    <div class="btm-ope clearfix">
     <!-- 待送出-->
      <template v-if="aidedPersonObj.status == 1" style="padding: 10px 15px;border-top: 1px solid #eee;">
      <span class="color-orange f_l f-14" style="padding-top: 4px">还剩{{aidedPersonObj.countdown}}送出</span>
      <router-link :to="{name: 'helpHeWriteExp', params:{id: aidedID,demandId: aidedPersonObj.demend_code ,type:helpway}}" class="f_r btn-bordered btn-bordered-orange f-16">送出帮扶物</router-link>
      <router-link to="" class="f_r btn-bordered btn-bordered-gray f-16" @click.native="showconfirm=true">取消帮扶</router-link>
      </template>
       <template v-if="aidedPersonObj.status == 4" style="padding: 10px 15px;border-top: 1px solid #eee;">
      <router-link to="" class="f_r btn-bordered btn-bordered-gray f-16" @click.native="showconfirmDelete = true">删除记录</router-link>
      </template>
      <!-- <template v-if="aidedPersonObj.stauts == 3" style="padding: 10px 15px;border-top: 1px solid #eee;">
        <router-link to="" class="f_r btn-bordered btn-bordered-orange f-16">查看感谢回馈</router-link>

      </template> -->
    </div>

    <!--取消帮扶弹窗-->
    <div v-transfer-dom>
      <confirm v-model="showconfirm" title="" confirm-text="继续捐赠" cancel-text="取消捐赠" @on-cancel="cancelDonate" @on-confirm="continueDonate">
        <p style="text-align:center;">此时返回，之前填写的捐赠信息将被删除，建议您继续完成编辑</p>
      </confirm>
    </div>
    <div v-transfer-dom>
      <confirm v-model="showconfirmDelete" title="" confirm-text="确认" cancel-text="取消" @on-confirm="onConfirm()" @on-cancel="onCancel()">
        <p style="text-align:center;">确认删除此记录</p>
      </confirm>
    </div>
  </div>
</template>
··
<script>
  import {XHeader,Group, Cell, CellBox, XButton, Timeline, TimelineItem, Range, Previewer, TransferDom,Confirm} from 'vux'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import {mapActions,mapState} from "vuex";
 import { getMidPic } from "@/util/getMid";

  export default {
    components: {
      XHeader,
      Group,
      Cell,
      CellBox,
      XButton,
      Timeline,
      TimelineItem,
      Range,
      swiper,
      swiperSlide,
      Previewer,
      Confirm
    },
    name: "record_goods_detail",
    directives: {
      TransferDom
    },
    data() {
      return {
        goodstatuss: [],
        showconfirmDelete:false,
        showconfirm: false,
        helpState: ['待认领','待送出','已送出','帮扶成功','已关闭'],
        aidedPersonObj: {},
        aidedID:this.$route.params.id,
        helpway:null,
        goodsImglist:[],
        createTime: '',
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
    created() {
        this.getGoodDetail();
    },
    methods: {
       getmidpic(imgurl){
    return getMidPic(imgurl)
    },
       async onConfirm() {
       try{
            await this.$http.post('hts/myDemand/delHelpRecord', {id: this.aidedID})
            this.showToast('','text','删除成功','20em','','middle');
            this.$router.go(-1);   
            this.showconfirmDelete = false      
        } catch (err) {
         
              this.showToast('', 'text', '删除失败')
           
         
        }
         this.showconfirmDelete = false     
      },
       getGoodDetail() {   
         let _this = this;    
      this.$http.post('hts/record/goods', {
      'povertyCode': this.$route.params.id
    }).then(function (response) {
        if (typeof response.data === 'object') {
          _this.aidedPersonObj = response.data
          _this.helpway = _this.aidedPersonObj.help_pattern;
        _this.createTime = _this.aidedPersonObj.create_date;
        _this.getGoodsImglist();
        } else {
          // alert(response.msg)
        }
      })
      },
      canDo(status) {
        if (status == 6) {
          return true;
        } else if (status == 10) {
          return true;
        }
        else if (status == 11) {
          return true;
        }
        else {
          return false;
        }

      },
      goack() {
        this.$router.go(-1)
      },
      show(index1) {
        this.$refs.previewer.show(index1)
      },
      goodstatus: function (type) {
        let oj = this.goodstatuss.find((n) => n.code === type)
        if (oj) {
          return oj.value
        }
        return '';
      },
      cancelDonate() {
           this.$http.post('hts/record/close',{
                 'id': this.aidedID
             }).then(res => {
                 this.showToast('','text','取消帮扶成功','20em','','middle');
                 this.$router.push({name: 'loveNeed', params:{id: this.aidedPersonObj.demend_code}});
             })
      },
      continueDonate(){
          this.showconfirm = false;
      },
      goToDetail(){
          this.$router.push({name: 'loveNeed', params:{id: this.aidedPersonObj.demend_code}});
      },
      getGoodsImglist() {
          if(this.aidedPersonObj.img) {
               let imgList = this.aidedPersonObj.img;
                imgList.forEach((item) => {
                let img = {};
                    img.src = item;
                    this.goodsImglist.push(img);
          })
          }
         
      }
    },
 computed:{
     getTop(){
       return {
         top:window.localStorage.getItem("hheight")
       }
    },

  },
    mounted() {
    }
  }

</script>



<style scoped>
  .box-withbar{bottom:55px}
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

  .address .add-area {
    padding: 0 15px 20px 15px;
    background: url('../../../../static/appimg/address-bg.jpg') repeat-x bottom;
    background-size: auto 5px
  }

  .add-area {box-sizing: border-box}

  /*帮扶人信息*/
  .donor-content {
    padding: 10px 15px;
    border-top: 1px solid #eee;
  }

  .donor-content ul li {
    padding: 5px 0
  }

  /*帮扶详情部分*/
  .detailshow {
    border-top: 1px solid #eee;
    padding: 10px 15px;
  }

  .detailshow h1 span {
    padding: 0 10px 6px 0
  }

  .detailshow h1 em {
    padding-top: 4px
  }

  .detailshow p {
    padding-bottom: 10px
  }

  /*需求编号和进展状态*/
  .pub-state {
    padding: 15px 15px 15px 15px;
  }


  .pub-state ul li {
    padding: 5px 0
  }

  /*物流信息部分*/

  .trans-con{border-top:1px solid #eee;padding:15px 30px 15px 15px}


  /*底部操作栏*/
  .btm-ope {
    /*padding: 3px 15px;*/
    /*border-top: 1px solid #eee;*/
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background:#fff;
    overflow: hidden;
    z-index:222;
  }

  .btm-ope .btn-bordered {
    margin-right: 10px
  }

  .btm-ope .btn-bordered.btn-bordered-orange {
    margin-right: 0
  }
  /*弹窗样式*/
  .vux-confirm>>>.weui-dialog__btn_primary{color:#fff;background:#f37306}
  .vux-confirm>>>.weui-dialog__ft{font-size: 16px}
  .vux-confirm>>>.weui-dialog__bd{font-size:16px}

</style>
