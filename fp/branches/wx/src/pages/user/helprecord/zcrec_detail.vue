<template>
  <div>
    <x-header :left-options="{backText: '',preventGoBack:true}"  @on-click-back="goack">帮扶详情</x-header>

    <div class="over-auto box-withbar bg-f6f5f6" style="bottom: 55px">
        <img src="../../../assets/images/zcbanner.png" alt="" style="width:100%;height:90px;margin-bottom:5px;">
      <zcassistitem :item="capitaldetail"></zcassistitem>
      <div class="list-info bg-ffffff">
        <div class="list-info-header clearfix">
          <span class="f_l f-13">支持金额</span><em class="color-orange f_r">{{capitaldetail.afq007}} 元</em>
        </div>
        <div class="list-info-content clearfix">
          <ul class="f-12">
            <li><span class="color-999">扶贫单号：</span>{{capitaldetail.afq005}}</li>
            <!-- <li><span class="color-999">需求编号：</span>{{capitaldetail.demand_code}} </li> -->
            <li><span class="color-999">交易时间：</span>{{capitaldetail.afq065}}</li>
            <li><span class="color-999">支付方式：</span>微信支付</li>
          </ul>
          <!--复制按钮-->
          <!-- <span class="btn-copy f-14 bd-radius-4" @click="copyText">复制</span> -->
          <!-- <input type="button" class="btn-copy f-14 bd-radius-4" value="复制" @click="copyText" data-clipboard-text=capitaldetail.id ref="copy"> -->
        </div>
      </div>
    </div>


    <div class="list-state clearfix">
      <a class="f_r btn-bordered btn-bordered-orange f-16" @click="gocartification(capitaldetail)">&nbsp;&nbsp;&nbsp;证书&nbsp;&nbsp;&nbsp;</a>
      <a  class="f_r btn-bordered btn-bordered-gray f-16" @click="payhelp(capitaldetail)">再次支持</a>
    </div>
  </div>
</template>

<script>
  import {XHeader, Badge, Range} from 'vux'
  import zcassistitem from '@/components/assist/zcassistitem'
  import {mapActions, mapState} from 'vuex'
  import open from '@/assets/js/openWin'

export default {
    name: 'record_capital_detail',
    components: {XHeader, Badge, Range, zcassistitem},
    data () {
      return {
        postadata: {},
        paytypes: [],
        copyBtn: null,
        capitaldetail:{},
        // demandStatus: ''
      }
    },
    created () {
      // 在页面挂载前就发起请求
      // this.getCapitalDetail()
      this.paytypes = this.alljson.PayTypeEnum
    },
    mounted () {
        this.getZcDetail()
    },
    methods: {
      ...mapActions(['getCapitalDetail', 'getCertificate']),
      async getCapitalDetail () {
        await this.$store.dispatch('getCapitalDetail', this)
        // this.demandStatus = this.$store.state.capitaldetail.demandStatus
      },
      getZcDetail(){
          this.$https({
              method: 'post',
              url: this.BASE_URL+'cfs/zc/project/getHelpDetails',
              data: {
                  acr026:this.$store.state.user.id,
                  afq005:this.$route.params.id,
                  acr001:this.$route.params.projectid,
                  token:localStorage.token,
                  // acr026:'517276231125696518'
              },
          }).then(res => {
              this.capitaldetail=res.data.data

          }).catch(err => {
            if(err.msg)
              this.showToast('','text',err.msg,'20em','','middle');
          })
      },
      payhelp(item){
          if (window.api && window.api.systemType == "ios") {
            console.log('这是ios的我要支持')
            api.openApp({
              iosUrl:
                // "http://wx.fpmai.com/pages/index/#/zchelphe/"+item.acr001+'/'+item.planMoney+'/'+item.title+'/'+this.$store.state.user.id+'/'+window.localStorage.getItem("token")+'/'+this.$store.state.user.login_name
                //sum    // acr002
                 this.H5PAY_URL+"/pages/index/payMoney.html?acr001="+item.acr001+'&acr002='+item.title+'&sum='+item.planMoney+'&token='+window.localStorage.getItem("token")+'&userid='+this.$store.state.user.id+'&login_name='+this.$store.state.user.login_name
            });
          } else if(window.api && window.api.systemType =="android") {
            console.log('这是安卓的我要支持');
            open(this.H5PAY_URL+"/pages/index/payMoney.html?acr001="+item.acr001+'&acr002='+item.title+'&sum='+item.planMoney+'&token='+window.localStorage.getItem("token")+'&userid='+this.$store.state.user.id+'&login_name='+this.$store.state.user.login_name, '确认支付').then(res => {
                return res
            })
          }else if(this.isWeixinCient()){
            console.log('这是微信的我要支持')
            this.$router.replace('/zchelphe/'+item.acr001+'/'+item.planMoney+'/'+item.title);
          }else{
            this.showToast('','text','请在app或微信内打开','20em','','')
          }
      },
      gocartification (item) {
          this.$router.push('/zccertificate/'+item.acr001+'/'+this.$store.state.user.nick_name+'/'+item.afq065+'/'+item.title)
      },
      getDisType (type) {
        let oj = this.paytypes.find((n) => n.code === type)
        if (oj) {
          return oj.value
        }
        return ''
      },
      goack () {
        this.$router.push('/record/zcrec')
      },
    //   copyText () {
    //       let _this = this;
    //       let clipboard = _this.copyBtn;
    //       clipboard.on('success', function() {
    //           console.log('复制成功');
    //           clipboard.destroy();
    //       })
    //       clipboard.on('error', function() {
    //           console.log('复制失败');
    //           clipboard.destroy();
    //       })
    //   }
    },
    computed: {
      ...mapState(['alljson']),
      // capitaldetail () {
      //   return this.$store.state.capitaldetail
      // },
      nickName () {
        // return this.$store.state.user.nick_name
        if (this.$store.state.user.realname) {
          return this.$store.state.user.realname
        } else {
          return this.$store.state.user.nick_name
        }
      }
    }
  }
</script>

<style scoped>
  .list-header {
    padding: 10px 15px
  }

  .list-content {
    padding: 10px 15px
  }

  .list-content .tab-left {
    width: 100px
  }

  .list-content .tab-right {
    position: relative
  }

  .list-content .tab-right h1 {
    line-height: 130%;
  }

  .list-content .tab-right p {
    position: absolute;
    bottom: 0
  }

  .list-content .tab-right p span {
    padding-right: 10px;
  }

  .list-info .list-info-header {
    padding: 10px 15px 10px;
    border-bottom: 1px solid #eee
  }

  .list-info .list-info-content {
    padding: 10px 15px 10px;
    position: relative
  }

  .list-info-content ul li {
    padding: 4px 0
  }

  .list-state {
    padding: 13px 15px;
    border-top: 1px solid #eee;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0
  }

  .list-state .btn-bordered {
    margin-right: 10px
  }

  .list-state .btn-bordered.btn-bordered-orange {
    margin-right: 0
  }

  .list-header .vux-badge {
    margin-top: 5px
  }

  .btn-copy {
    display: inline-block;
    position: absolute;
    right: 15px;
    top: 20px;
    border: 1px solid #ddd;
    padding: 1px 10px
  }

  /*进度条*/

  .vux-range-input-box {
    padding: 8px 0;
    margin: 0 !important
  }

  .vux-range-input-box >>> .range-max, .vux-range-input-box >>> .range-min {
    display: none
  }

  .vux-range-input-box >>> .range-bar-disabled {
    opacity: 1
  }

  .vux-range-input-box >>> .range-handle {
    background-color: #f8711a;
    cursor: move;
    height: 10px;
    left: 0;
    position: absolute;
    width: 20px;
    border-radius: 2px;
    top: -3px !important;
    box-shadow: none;

  }

  .vux-range-input-box >>> .range-quantity {
    background-color: #f15717;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .vux-range-input-box >>> .range-bar {
    background-color: #e6e6e6;
  }

  .range-spe {
    position: absolute !important;
    bottom: 30px;
    left: 0;
    right: 0
  }
</style>
