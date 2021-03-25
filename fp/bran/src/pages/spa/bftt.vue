<template lang="html">
  <div class="box">
    <x-header :left-options="{backText: ''}" style="border:0 none;border-bottom:1px solid #ccc">扶贫头条</x-header>
    <div class="posi">
      <div class="list">
        <scroller
      v-if='newList.length !== 0'
      :on-refresh="refresh"
      ref="scroller"
      :on-infinite="infinite"
      refresh-layer-color="#4b8bf4"
      loading-layer-color="#ec4949">
      <svg class="spinner" style="stroke: #4b8bf4;" slot="refresh-spinner" viewBox="0 0 64 64">
        <g stroke-width="7" stroke-linecap="round">
          <line x1="10" x2="10" y1="27.3836" y2="36.4931">
            <animate attributeName="y1" dur="750ms" values="16;18;28;18;16;16" repeatCount="indefinite"></animate>
            <animate attributeName="y2" dur="750ms" values="48;46;36;44;48;48" repeatCount="indefinite"></animate>
            <animate attributeName="stroke-opacity" dur="750ms" values="1;.4;.5;.8;1;1" repeatCount="indefinite"></animate>
          </line>
          <line x1="24" x2="24" y1="18.6164" y2="45.3836">
            <animate attributeName="y1" dur="750ms" values="16;16;18;28;18;16" repeatCount="indefinite"></animate>
            <animate attributeName="y2" dur="750ms" values="48;48;46;36;44;48" repeatCount="indefinite"></animate>
            <animate attributeName="stroke-opacity" dur="750ms" values="1;1;.4;.5;.8;1" repeatCount="indefinite"></animate>
          </line>
          <line x1="38" x2="38" y1="16.1233" y2="47.8767">
            <animate attributeName="y1" dur="750ms" values="18;16;16;18;28;18" repeatCount="indefinite"></animate>
            <animate attributeName="y2" dur="750ms" values="44;48;48;46;36;44" repeatCount="indefinite"></animate>
            <animate attributeName="stroke-opacity" dur="750ms" values=".8;1;1;.4;.5;.8" repeatCount="indefinite"></animate>
          </line>
          <line x1="52" x2="52" y1="16" y2="48"><animate attributeName="y1" dur="750ms" values="28;18;16;16;18;28" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="36;44;48;48;46;36" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values=".5;.8;1;1;.4;.5" repeatCount="indefinite"></animate></line></g></svg>
      <slot>
        <div class="item"  v-for="news in newList" @click="goDetail(news)">
            <p class="title">{{news.TITLE}}</p>
            <img :src="news.TITLE_IMAGE_URL" />
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
  import avatar from '../../components/util/avatar'
  import {XHeader} from 'vux'
  export default {
    components: {
      avatar,
      XHeader
    },
    data() {
      return {
        newList:[],
        page:1,
        totals:0,
      }
    },
    mounted(){
      
    },
    created() {
       this.getDate()
    },
    methods: {
      goDetail(news){
        let url = process.env.CMS_URL+news.ARTICLE_DYNIAMIC_URL
        console.log('cms详情',url)
        location.href=url
      },
      infinite (done) {
        setTimeout(()=>{
            this.page++;
            this.getDate(done)
            done()
        },1000)
      },
      refresh(done){
        setTimeout(()=>{
          this.page = 1;
          this.newList = [];
          this.getDate();
          done();
        },1000)
      },
      getDate(){
        // let url=process.env.BASE_URL+'/shfp/revision/zspt/columnget/getArticlePage'
        let url ='https://www.zgshfp.com.cn/shfp/revision/zspt/columnget/getArticlePage'
          this.$jsonp(url,{
                pageId:363036,
                pageIndex:this.page,
                pageSize:10
          }).then(res => {
              this.newList = [...this.newList,...res.result.informationInfos]
          })
       },
    }
  }
</script>

<style lang="less" scoped>
  .box{
    background: #f3f3f3;
    position:absolute;
    height:100%;
    width:100%;
    .posi{
      position: relative;
      overflow: auto;
      height: 100%;
    }
    .list{
      width: 100%;
      height: calc(~"100% - 47px");
      overflow: auto;
    }
     .item{
        width: 100%;
        box-sizing: border-box;
        height: 300px;
        padding: 15px;
        box-sizing: border-box;
        background: #fff;
        border-bottom: 1px solid #e5e5e5;
        img{
          width: 100%;
          height: 200px;
          object-fit:cover ;
        }
        p{
          font-size: 18px;
          padding-bottom: 10px;
        }
    }
  }
</style>


