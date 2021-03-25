<template>
  <div>
    <x-header :left-options="{backText: '',preventGoBack:true}"  @on-click-back="goack">帮扶详情</x-header>

    <div class="over-auto box-withbar bg-f6f5f6" style="bottom: 55px">

      <assistitem :item="capitaldetail"></assistitem>
      <div class="list-info bg-ffffff">
        <div class="list-info-header clearfix">
          <span class="f_l">帮扶金额</span><em class="color-orange f_r">{{capitaldetail.paid_money}} 元</em>
        </div>
        <div class="list-info-content clearfix">
          <ul class="f-14">
            <li><span class="color-999">扶贫单号：</span>{{capitaldetail.id}}</li>
            <li><span class="color-999">需求编号：</span>{{capitaldetail.demend_code}} </li>
            <li><span class="color-999">交易时间：</span>{{capitaldetail.contribute_time}}</li>
            <li><span class="color-999">支付方式：</span>{{getDisType(capitaldetail.paytype)}}支付</li>
          </ul>
          <!--复制按钮-->
          <!-- <span class="btn-copy f-14 bd-radius-4" @click="copyText">复制</span> -->
          <!-- <input type="button" class="btn-copy f-14 bd-radius-4" value="复制" @click="copyText" data-clipboard-text=capitaldetail.id ref="copy"> -->
        </div>
      </div>
    </div>


    <div class="list-state clearfix">
      <router-link
        to=""
        class="f_r btn-bordered btn-bordered-orange f-16"
        @click.native="gocartification()">帮扶证书</router-link>
      <router-link
          to=""
        @click.native="gotoHelphe()"
        class="f_r btn-bordered btn-bordered-gray f-16"
        v-if="this.capitaldetail.demandStatus == 3">再次帮扶</router-link>
    </div>
  </div>
</template>

<script>
  import {XHeader, Badge, Range} from 'vux'
  import assistitem from '@/components/assist/assistitem'
  import {mapActions, mapState} from 'vuex'

export default {
    name: 'record_capital_detail',
    components: {XHeader, Badge, Range, assistitem},
    data () {
      return {
        postadata: {},
        paytypes: [],
        copyBtn: null,
        capitaldetail: {}
        // demandStatus: ''
      }
    },
    created () {
      // 在页面挂载前就发起请求
      this.getCapitalDetail()
      // this.gocartification()
      this.paytypes = this.alljson.PayTypeEnum
    },
    methods: {
       gotoHelphe(){
               if (this.isios()) {
            let linkStr=process.env.PJ_URL +"payview/helphe.html?demand_code=" +
                this.capitaldetail.demend_code+
                "&userid=" + localStorage.getItem("userid")+
                "&token=" + localStorage.getItem("token")+ "&payname=" +process.env.WX_MCHTYPE+"&jdomain=" +process.env.BASE_API+"&path="+this.$route.path
             ;
            //  if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
                  window.native.appLoadUrl(linkStr)
       }
       else{
       this.$router.push(
              "/helpHe/" +  this.capitaldetail.demend_code+ "/" +  this.capitaldetail.user_name
            );
       }
        // let linkStr=process.env.PJ_URL +"payview/helphe.html?demand_code=" +
        //        this.capitaldetail.demend_code +
        //         "&userid=" +localStorage.getItem("userid")+
        //         "&token=" + localStorage.getItem("token")+"&path="+this.$route.path
        //      ;
        //      if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
        //           window.native.appLoadUrl(linkStr)
        //      }else{
        //          location.href =  linkStr
        //      }
      },
      gocartification () {
         this.$router.push({name:'certificate',query:{to: this.capitaldetail.user_name,target:this.capitaldetail.paid_money+"元",user:this.nickName,crtime:this.capitaldetail.contribute_time}});
        // this.postadata.type = 0
        // this.postadata.povertyCode = this.$route.params.id
        // this.$store.dispatch('getCertificate', this)
      },
      getCapitalDetail() {
          this.$http.post('hts/record/capital',{povertyCode: this.$route.params.id})
          .then(res => {
              this.capitaldetail = res.data
          })
      },
      getDisType (type) {
        let oj = this.paytypes.find((n) => n.code === type)
        if (oj) {
          return oj.value
        }
        return ''
      },
      goack () {
         if (this.$route.query.flag == 1) {
        history.go(-5);
        return false;
      } else {
        this.$router.go(-1);
      }
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
