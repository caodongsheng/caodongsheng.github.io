<template>
  <div>
    <div class="header-wrap">
    <x-header :left-options="{backText: '',preventGoBack: true}" @on-click-back="backToPre">{{headerTitle}}

        <a slot="right" @click="toShare"><i class="iconfont icon-f-share2 f-20"></i></a>
      </x-header>
    </div>
    <share ref="sharea" :vos='vos'></share>
  </div>
</template>

<script>
import { XHeader } from 'vux'
import share from '../share/share'

export default {
  components: { XHeader, share },
  props: ['headerTitle',"vos", "routepath"],
  data() {
    return {
      show: false
    }
  },
  methods: {
    toShare() {
      if (this.isWeixinCient()) {
        // let obj = {}
        // obj.title = `中国社会扶贫网，让爱在阳光下链接-${
        //   this.vos.region_name.indexOf('县') > 0
        //     ? this.vos.region_name.split('县')[0] + '县'
        //     : this.vos.region_name.split('市')[0] + '市'
        // }的需求${this.vos.demand_title}`
        // obj.desc = this.vos.demand_coment
        // obj.link = this.WinXinHost + '#' + location.href.split('#')[1]
        // obj.imgUrl = this.vos.imgUrl[0]
        // obj.demandId = this.vos.id;

      //  this.setWeixinConfig(this.vos)
         alert('点击右上角"...",分享给朋友或朋友圈，让更多的人帮助TA')
      } else if(window.api){
        this.$refs.sharea.toShare()
      }
      else{
                 this.showToast('', 'text', '网页上无法分享，请使用APP或微信')

      }
    },
    backToPre() {
       if(window.location.search.startsWith("from=")){
       this.$router.replace("/recom")
      }
      else   this.$router.go(-1)
    }
  },
  mounted(){
      if (this.isWeixinCient()) {
        this.setWeixinConfig(this.vos)
      }
  }
}
</script>

<style lang="less" scoped>
</style>
