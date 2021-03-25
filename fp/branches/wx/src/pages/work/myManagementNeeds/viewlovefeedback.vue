<template>
  <div>
    <!-- <x-header :left-options="{backText: ''}">查看感谢回馈</x-header> -->
    <x-header :left-options="{backText: '',preventGoBack: true}" @on-click-back="backToPre">查看感谢回馈</x-header>
    <div class="box-withheader over-auto" style="background:#eee" v-if = 'this.totals != 0 '>
     <scroller
      v-if='records.length !== 0'
      :on-refresh="refresh"
      :on-infinite="infinite" 
      refresh-layer-color="#4b8bf4"
      loading-layer-color="#ec4949">
        <svg class="spinner" style="stroke: #4b8bf4;" slot="refresh-spinner" viewBox="0 0 64 64">
        <g stroke-width="7" stroke-linecap="round"><line x1="10" x2="10" y1="27.3836" y2="36.4931"><animate attributeName="y1" dur="750ms" values="16;18;28;18;16;16" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="48;46;36;44;48;48" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values="1;.4;.5;.8;1;1" repeatCount="indefinite"></animate></line><line x1="24" x2="24" y1="18.6164" y2="45.3836"><animate attributeName="y1" dur="750ms" values="16;16;18;28;18;16" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="48;48;46;36;44;48" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values="1;1;.4;.5;.8;1" repeatCount="indefinite"></animate></line><line x1="38" x2="38" y1="16.1233" y2="47.8767"><animate attributeName="y1" dur="750ms" values="18;16;16;18;28;18" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="44;48;48;46;36;44" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values=".8;1;1;.4;.5;.8" repeatCount="indefinite"></animate></line><line x1="52" x2="52" y1="16" y2="48"><animate attributeName="y1" dur="750ms" values="28;18;16;16;18;28" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="36;44;48;48;46;36" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values=".5;.8;1;1;.4;.5" repeatCount="indefinite"></animate></line></g></svg>
       <slot>
      <div>
        <div class="dyn-timeline">
          <div class="dyn-timeline-list">
            <div class="dyn-timeline-item flex-tab" style="background:#fff;margin-top:10px;" v-for="(items,index) in records" :key="index">
              <div class="flex-tab-cell tab-right" style="padding:10px;">
                <p class="color-333 f-14 tit-2row-nowrap">{{items.dynamic_comment}}</p>
                <!--图片组带预览-->
                <div class="photospre" v-if = "items.img != ''" style="padding-top:10px;">
                  <div :id="getId(index)">
                    <span  class="photo-item" style="padding-right:10px;" v-for="(item, i) in items.formattedImags" :key="i">
                      <img  class="previewer-demo-img" :src="item.src" width="30%" @click="show(i,index)">
                    </span>
                  </div>
                  <div v-transfer-dom>
                    <previewer :list="items.formattedImags1" ref="previewer" :options="options(index)" :style="getTop"></previewer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </slot>
       <svg class="spinner" style="fill: #ec4949;" slot="infinite-spinner" viewBox="0 0 64 64">
        <g><circle cx="16" cy="32" stroke-width="0" r="3"><animate attributeName="fill-opacity" dur="750ms" values=".5;.6;.8;1;.8;.6;.5;.5" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="3;3;4;5;6;5;4;3" repeatCount="indefinite"></animate></circle><circle cx="32" cy="32" stroke-width="0" r="3.09351"><animate attributeName="fill-opacity" dur="750ms" values=".5;.5;.6;.8;1;.8;.6;.5" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="4;3;3;4;5;6;5;4" repeatCount="indefinite"></animate></circle><circle cx="48" cy="32" stroke-width="0" r="4.09351"><animate attributeName="fill-opacity" dur="750ms" values=".6;.5;.5;.6;.8;1;.8;.6" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="5;4;3;3;4;5;6;5" repeatCount="indefinite"></animate></circle></g></svg>
    </scroller>
    </div>
  </div>
</template>

<script>
  //import
  import {mapState, mapGetters} from "vuex";
  import scrolltemplate from "@/components/scroll/scrollcomponent"
  import avatar from '../../../components/util/avatar'
  import {
    XHeader,
    Badge,
    Previewer,
    Group,
    XTextarea,
    TransferDom,
    Confirm
  } from "vux";
  import {timingSafeEqual} from "crypto";
import { setTimeout } from 'timers';

  export default {
    name: "love_dynamics",
    directives: {
      TransferDom
    },
    components: {
      XHeader,
      Badge,
      Previewer,
      Group,
      XTextarea,
      TransferDom,
      Confirm,
      avatar,
      scrolltemplate,
      
    },
    // beforeRouteEnter(to, from, next) {
    //    next(vm => {
    //        if(from.path.indexOf('thankFeedback') != -1) {
    //            vm.routepath = '/mypublist/'+from.path.substr(-1)
    //        }
    //    })
        
    // },
    data() {
      return {
        shows: false,
        shows1: false,
        page: 1,
        page1:1,
        records: [],
        introduct: "",
        replyusername: "",
        replyid: "",
        routepath:'',
        indexs: "",
        index1: "",
        totals: "",
        records1: [],
        loadMore: false,
        loadMore1:false,
        pageSize: '',
        resIndex: '',
        init:false,
        Reply1:true,
        Reply2:false,
        Reply3:false,
        end:false
      };
    },
    computed: {
      ...mapState(["demandDetail"]),
     getTop(){
       return {
         top:window.localStorage.getItem("hheight")
       }
    },

      demandId() {
        return this.$route.params.demandId;
      }
    },
    methods: {
        backToPre() {
          //  if(this.routepath != '') {
          //      this.$router.replace(this.routepath)
          //  }else {
               this.$router.go(-1)
         //  }
        },
      dynamic(done) {
        let self = this;
        let arr = [];
        this.$http
          .post("hts/help/dynamic", {
            demand_code: this.demandId,
            page: this.page,
            dynamic_type:4
          })
          .then(res => {
            this.totals = res.data.totals;
            this.pageSize = res.data.pageSize
            arr = res.data.vos;
            if(this.page == 1) {    
                }else {
                    self.records= [...self.records,...arr]; 
                }
                if(done) done(true)
            arr.forEach(rec => {
              rec.formattedImags = [];
              rec.formattedImags1 = [];
              if(rec.img) {
                    rec.img.forEach(item => {
                        let img = {};
                        let img1 = {};
                        let img2 = {};
                        img.src = item;
                        img1 = item;
                        if(img1.indexOf('min') !== -1) {
                            let imgArr = img1.replace('min', 'max');
                            // let imgArr1 = imgArr.join("-");
                            img2.src = imgArr;
                            rec.formattedImags.push(img);
                            rec.formattedImags1.push(img2);
                        }
                        // let imgArr = img1.split("-");
                        // imgArr.splice(imgArr.length - 1, 1, "max.jpg");
                        // let imgArr1 = imgArr.join("-");
                        
                    });
                }
            });

             if(this.init){
              this.records = arr;
              this.init = false
            }else if (this.loadMore) {
              this.records = [...this.records, ...arr]
              this.loadMore = false
            } else {
              let itemToBeUpdated = arr[this.resIndex]
              this.$set(this.records,this.indexs,itemToBeUpdated)
            }

          });
      },
      getId(index) {
        return "preview" + index;
      },
      show(i, index) {
        this.$refs.previewer[index].show(i);
      },
      options(ind) {
        let that = this;
        return {
          getThumbBoundsFn(index) {
            let parent = that.$el.querySelectorAll("#preview" + ind);
            let thumbnail = parent[0].querySelectorAll(".previewer-demo-img")[
              index
              ];
            let pageYScroll =
              window.pageYOffset || document.documentElement.scrollTop;
            let rect = thumbnail.getBoundingClientRect();
            return {x: rect.left, y: rect.top + pageYScroll, w: rect.width};
          }
        };
      },
      infinite(done){
            setTimeout(()=>{
                if(this.records.length < this.totals) {
                    this.page++;
                    this.dynamic(done);
                }else {
                    done(true)
                }
              
            },1500) 
      },
      refresh(done){
            setTimeout(()=>{
              this.page = 1;
              this.dynamic(done);
            done()
            },1500)
      }
    },
    created() {
      this.init = true
        this.dynamic();
    }
  };
</script>
<style scoped>

</style>

