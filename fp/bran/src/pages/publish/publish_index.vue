<template>
  <div class="publish-wrap  animated fadeInRight">
    <!--<x-header :left-options="{backText: ''}">发布需求</x-header>-->
    <div class="box-withfooter over-auto">
    <header>
      <h3>发布需求</h3>
      <p>请选择帮助的类型</p>
    </header>
    <ul>
      <li v-for="(item,index) in vos">
        <div @click="goAidedPerson(item)">
          <div v-if="item.is_app_homepage===1">
            <img :src="item.icon_url">
            <span>{{item.help_type_name}}</span>
          </div>
        </div>
      </li>
    </ul>
    </div>
  <div class="btmback" >
    <span class="vux-close" @click="goback"></span>
  </div>
  </div>
</template>

<script>
  import {
    XHeader
  } from 'vux'
  import {mapState, mapActions} from 'vuex'
  export default {
    name: 'publish_index',
    components: {
      XHeader
    },
    data () {
      return {
        vos: []
      }
    },
    created () {
      this.getSelectList()
  },
    mounted () {
      this.init()
    },
    methods: {
      ...mapActions(['getSelectList']),
      getSelectList () {
        this.$store.dispatch('getSelectList', this)
      },
      init () {
        let arg = {}
        this.$http.post('hts/demand/oldHelpList', arg).then(data => {
          this.vos = data.data.vos
        }).catch(error => {
          this.showToast('', 'text', '查询类型失败')
        })
      },
      goAidedPerson (e) {
        let id = e.id
        this.L('id', id)
        this.$router.push({
          path: 'fullrecipient'
        })
      },
      
      
      goback(){
        console.log(this.$route.query.from)
        if(this.$route.query.from&&this.$route.query.from=="app" || typeof this.$route.query.from  == 'object'){
          console.log("从app进入发布需求")
        //  window.myhome.windowfinish();
        this.ModuleNative('close','返回原生')
        }else{
           console.log("从vue贵州页面进入发布需求")
          this.$router.go(-1)
        }
    
      }
    }
  }
</script>

<style lang="less" scoped>
.publish-wrap{
  position: absolute;
  left: 0;
  right: 0;
  top:0;
  bottom:0;
  background:url(../../../static/appimg/pubbg.jpg) no-repeat center top #fff;
  background-size:100% 100% ;
  z-index:999;
  /deep/h3{
    font-size: 18px;
    color:#333
  }
  .btmback{position: absolute;bottom:50px;left:0;right:0;text-align: center;
   span{display: inline-block;margin: 0 auto;width: 44px;
     height: 44px;background: rgba(255,255,255,0.3);border-radius: 50%;box-shadow: 0 0 25px rgba(0,0,0,0.1)}
  }
  .vux-close:before, .vux-close:after{left:50%;top:50%;margin-left:-11px;height:2px}
  .box-withfooter{
    bottom: 120px;}
  header{
    margin-top:60px;
    width:100%;
    text-align:center;
    p{
      color:#aaa;
      margin: 10px auto 20px auto;
      font-size: 16px;
    }
  }
  ul{
    width:75%;
    display:flex;
    flex-wrap: wrap;
    margin:0 auto;
    li{
      width:50%;
      height:auto;
      display:flex;
      align-items:center;
      justify-content:center;
      margin-top:10px;
      margin-bottom: 15px;
      img{
        width:78px;
        height:78px;
        /*border-radius:50%;*/
        display: block;
        /*box-shadow: 0 0 10px rgba(0,0,0,0.2);*/
      }
      span{
        font-size:15px;
        padding-top: 0px;
        padding-left:7px;
        display: inline-block;
        color:#666
      }
    }
  }
  .del{
    width:100%;
    text-align:center;
    position: absolute;
    bottom:25px;
    cursor: pointer;
  }
}

</style>
