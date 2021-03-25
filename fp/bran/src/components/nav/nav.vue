<template>
  <!--首页路由菜单-->
  <div class="tab-tit">

    <tab :line-width="3" active-color='#ed6b2b' :animate="animate_flag"  >


      <tab-item  v-for="(item, index) in vos"  :key="index" :selected="$store.state.nav_index==index" @on-item-click="handler">
          <!-- <tab-item  v-for="(item, index) in vos"  :key="index"  @on-item-click="handler"> -->
        <a @click="goitem(item,index)">{{item.help_type_name}}</a>
      </tab-item>
      <div class="catalog_view"></div>
    </tab>

    <div class="catalog" @click="catalog_show">
      <!--<i class="fa fa-bars" aria-hidden="true"></i>-->
      <i class="iconnavmore"></i>
    </div>
    <catalog :datas="vos" @goitem ="goitem" ref="catalog"></catalog>


  </div>
</template>

<script>
  import { Tab, TabItem} from 'vux'
  import catalog from '@/components/nav/catalog'
import { debuglog } from 'util';
  import { mapState} from "vuex";
  export default {
    name: 'navs',
    components: {
      Tab,
      TabItem,
      catalog
    },
    data () {
      return {
        animate_flag: false,
        // tag: '推荐',
        vos:[]
     //   vos: [{help_type_name: '推荐', link_url: '/recom'}, {help_type_name: '教育帮扶', link_url: '/demand4/448071783933804544'}, {help_type_name: '物品帮扶', link_url: '/demand5/448502411594563584'}, {help_type_name: '医疗帮扶', link_url: '/demand2/448502271404146688'}, {help_type_name: '住房帮扶', link_url: '/demand3/448502355504136192'}, {help_type_name: '扶贫展示', link_url: '/example'}, {help_type_name: '扶贫展示', link_url: '/example'}]
      }
    },
    computed: {
      ...mapState(["city"])
    },
    methods: {
      handler (i, e) {

      },
      goitem (item, index) {
        let _this = this
        this.$store.state.nav_index = index
        this.$emit('chrid', index)
        // if(item.link_url=="/Exhibition"){
        //    open(process.env.EX_URL, "",function(){
        //       _this.$router.push("/Exhibition")
        //     });
        // }
        // else if(item.link_url=="/example"){
        //    open(process.env.CMS_URL, "",function(){
        //       _this.$router.push("/example")
        //     });
        // }
        // else
        this.$router.push(item.link_url)
        // this.$router.push(item.link_url+"?from=app&name="+this.city.name+"&id="+this.city.id+"&provinceArea="+this.city.provinceArea+"&provinceName="+this.city.provinceName+"&type="+this.city.type+"&token="+this.G("token")+"&userid="+this.G("userid")+"&nickname="+this.G("nickname"))
          // this.tag=this.vos[index+1]
      },
      end () {
        this.catalog_show = false
      },
      catalog_show () {
        this.$refs.catalog.show()
      },
      // 获得所有的导航内容
      getAllNav () {
        let _this = this
        if (localStorage.getItem('newNavlist') != null&&localStorage.getItem('newNavlist')!="") {
        
              this.vos = JSON.parse(localStorage.getItem('navlist'))
          if(this.$route.path!="/demandContainer"&&this.$route.path!=_this.vos[this.$store.state.nav_index].link_url){
           let att = this.vos.find((element) => (element.link_url == this.$route.path)) 
           let index  =_this.vos.indexOf(att)
             this.$store.state.nav_index = index
              _this.$emit('chrid', index);
               _this.$router.replace(att.link_url)
          }
          else{
                _this.$emit('chrid', this.$store.state.nav_index)
             _this.$router.replace(_this.vos[this.$store.state.nav_index].link_url)
          }
        }
        else this.$http.post('hts/demand/helpList')
          .then(function (response) {
            localStorage.setItem('newNavlist',1)
            localStorage.setItem('navlist', JSON.stringify(response.data.vos))
            _this.vos = response.data.vos
            _this.$store.state.nav_index = 0
             _this.$emit('chrid', 0)
        // if(item.link_url=="/Exhibition"){
        //    open(process.env.EX_URL, "",function(){
        //       _this.$router.push("/Exhibition")
        //     });
        // }
        // else if(item.link_url=="/example"){
        //    open(process.env.CMS_URL, "",function(){
        //       _this.$router.push("/example")
        //     });
        // }
        // else
          _this.$router.replace(_this.vos[0].link_url)
          })
      }

    },
    created: function () {
      this.getAllNav()
    },
    activated(){
     for (let i = 0, len = this.vos.length; i < len; i++) {
          if (this.$route.path == this.vos[i].link_url) {
            this.$store.state.nav_index = i
          }
        }
    },
    watch: {
      '$route' (to, from) {
        for (let i = 0, len = this.vos.length; i < len; i++) {
          console.log(this.vos[i].link_url)
          if (this.$route.path == this.vos[i].link_url) {
            this.$store.state.nav_index = i
          }
        }
      }
    },
    mounted () {
      // vux tab 默认选中bug 处理
      setTimeout(() => {
        this.animate_flag = true
      }, 1000)
    }
  }
</script>

<style scoped lang="less">
  .vux-tab-wrap /deep/ .scrollable{padding-bottom: 0}
  .vux-tab-wrap /deep/ .scrollable  .vux-tab-ink-bar{bottom:0}

  .vux-tab-wrap /deep/ .vux-tab {
    height: 44px!important;
  }
.index-wrap .vux-tab-wrap:after{
}

 .vux-tab-wrap {
    position: relative;
    height: 44px!important;
    padding-right: 15px;
    padding-top: 0!important;
    margin-bottom: 0!important;
  }
.tab-tit{
    /*overflow: hidden;*/
    // top:44px;
}
  .vux-tab-wrap /deep/ .vux-tab-container{height:44px!important}
  .vux-tab-item a{ display: block;font-size: 15px}
  /*.vux-tab-item a:hover{color:rgb(237, 107, 43);display: block}*/
  .catalog_view{
      -webkit-box-flex: 1;
       flex: 0 0 8%;
  }
  .catalog{
      width:40px;
    height: 43px;
      position: absolute;
      right: 0;
      top: 0;
      background: #fff;
      z-index: 3;
    text-align: center;
    border-bottom:0px solid #e5e5e5;

     i{
        /*font-size: 18px;*/
         /*padding-top: 13px;*/
        /*box-shadow: -10px 0 30px #fff;*/
        display: inline-block;
       color:#333
      }
    i.iconnavmore{
      display: block;
      width: 18px;
      height: 15px;
      background: url("../../assets/images/navmore.png" ) no-repeat;
      background-size: 100% auto;
      position: absolute;
      top:16px;right:15px
    }
  }
</style>
