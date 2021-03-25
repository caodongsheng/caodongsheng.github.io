<template>
  <div>
    <x-header :left-options="{backText: ''}">爱心反馈
    <!-- <x-header :left-options="{backText: '',preventGoBack: true}" @on-click-back="backToPre">爱心反馈 -->
      <router-link slot="right" class="color-orange f-15" :to="{name:'loveFeedback',params:{id:demandId}}">发布
      </router-link>
    </x-header>
    <div class="box-withheader over-auto">
      <div style="padding: 15px 15px 15px 4px">
        <!--爱心反馈时间轴-->
        <div class="dyn-timeline">
          <div class="dyn-timeline-list">
            <div class="dyn-timeline-item flex-tab" v-for="(items,index) in records" :key="index">
              <div class="flex-tab-cell tab-left text-center">
                <span class="color-999 f-12">{{items.timeAxis}}</span>
                <!-- <em></em> -->
              </div>
              <div class="flex-tab-cell tab-mid text-center">
                <avatar :name="items.publisher_name" :image="items.user_pic" width="45" height="45" ></avatar>
              </div>
              <div class="flex-tab-cell tab-right">
                <span class="name  f-14">{{items.publisher_name}}</span>
                <span class="f-14 color-999">发布进展</span>
                 <!-- <i class="f_r fa fa-commenting-o color-999" style="padding-top: 2px"
                                            @click="reply(index,items.id,items.demand_code)"></i> -->
                <p class="color-333 f-14 tit-2row-nowrap">{{items.dynamic_comment}}</p>
                <!--图片组带预览-->

                <div class="photospre" v-if = "items.img != ''">
                  <div class="photo-items clearfix" :id="getId(index)">
                    <div  class="photo-item" v-for="(item, i) in items.formattedImags" :key="i">
                      <img  class="previewer-demo-img" :src="item.src" width="100" @click="show(i,index)">
                    </div>
                  </div>
                  <div v-transfer-dom>
                    <previewer :list="items.formattedImags1" ref="previewer" :options="options(index)" :style="getTop"></previewer>
                  </div>
                </div>
                <!--评论回帖区域-->
                <!-- <div>
                  <div class="comment" v-if="items.replyList != null">
                    <div class="comment-item bg-f6f5f6  f-13 color-999" v-for="(item,index1) in items.replyList" :key="index1">
                      <div v-if="item.publisher_id == item.reply_id">
                        <span class="color-orange" @click="replyPerson(index,index1)">{{item.publisher_name}}：</span>
                        {{item.dynamic_comment}}
                      </div>
                      <p v-else>
                        <span class="color-blue" @click="replyPerson(index,index1)">{{item.publisher_name}}</span>
                        <span class="black">回复  {{item.reply_user_name}}</span>
                        {{item.dynamic_comment}}
                      </p>
                    </div>
                    <p class="color-blue f-14" style="background:#f6f5f6;padding-left:10px ;padding-bottom:5px" v-if = "records[index].replyList.length >= 10" v-show="Reply1" @click="checkmore(index)">共{{records[index].replyCount}}条回复></p>
                    <p class="color-blue " style="background:#f6f5f6;padding-left:10px ;padding-bottom:5px" v-if = "records[index].replyList.length >= 10" v-show="Reply2" @click="checkmore(index)">查看更多评论</p>
                  </div>
                </div> -->
                <!--日期-->
                <p class="color-999 f-12 date">{{items.create_date}}</p>
              </div>
              <!-- 回复弹框  -->
              <div v-transfer-dom>
                <confirm v-model="shows"
                         title="回复TA的留言"
                         @on-cancel="onCancel"
                         @on-confirm="onConfirm(
                                records[indexs].demand_code,records[indexs].publisher_name,records[indexs].id,records[indexs].publisher_id)">
                  <div class="ipt">
                    <x-textarea  id="message"  :class="getClass" v-model="introduct" name="message" class="f-14" :min="5" :max="500" placeholder="写点什么吧" ></x-textarea>
                  </div>
                </confirm>
              </div>
              <div v-transfer-dom>
                <confirm v-model="shows1"
                         title="回复TA的留言"
                         @on-cancel="onCancel1"
                         @on-confirm="onConfirm(
                              records[indexs].demand_code,
                              records[indexs].replyList[indexs1].publisher_name,
                              records[indexs].id,
                              records[indexs].replyList[indexs1].publisher_id)">
                  <div class="ipt">

                    <x-textarea  id="message"  :class="getClass" v-model="introduct" name="message" class="f-14" :min="5" :max="500"  placeholder="写点什么吧" ></x-textarea>

                  </div>
                </confirm>
              </div>
            </div>
          </div>
          <!--查看更多动态-->
          <router-link to="" class="dyn-timeline-viewmore linkonly dis-inline">
            <div v-if="records.length < 10">
            </div>
            <div v-else-if="records.length >= totals">
            </div>
            <div v-else>
              <em></em>
              <span class="dis-inline color-orange bg-f6f5f6 f-16" @click="More">查看更多爱心反馈</span>
            </div>
          </router-link>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapGetters} from "vuex";
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
import {checkDesc} from '@/util/validFun.js';

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
      avatar
    },
    watch:{
     introduct(val){
       
           this.$nextTick(() => {
           let pattern = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]]/
           this.introduct = val.replace(pattern, "");
             })
     
    }
    },
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
        Reply3:false
      };
    },
    computed: {
      ...mapState(["demandDetail"]),
      demandId() {
        return this.$route.params.demandId;
      },
    
     getTop(){
       return {
         top:window.localStorage.getItem("hheight")
       }
    },

       getClass(){
      if(this.introduct.replace(/(^\s*)|(\s*$)/g, "").length<5){
        return "redfont"
      }
      else{
        return ""
      }
    },
    },
    methods: {
      
        valideContent(){
      let pattern = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]]/
      this.introduct = this.introduct.replace(pattern, ''); 
    },
        // backToPre() {
        //     this.$router.replace('/mypublist/'+ this.$route.params.code)
        // },
      dynamic() {
        let arr = [];
        this.$http
          .post("hts/help/dynamic", {
            demand_code: this.demandId,
            page: this.page,
            dynamic_type:2
          })
          .then(res => {
            this.totals = res.data.totals;
            this.pageSize = res.data.pageSize
            arr = res.data.vos;
            arr.forEach(rec => {
            //   rec.formattedImags = [];
            //   rec.formattedImags1 = [];
            //   rec.img.map(item => {
            //     let img = {};
            //     let img1 = {};
            //     let img2 = {};
            //     img.src = item;
            //     img1 = item;
            //     let imgArr = img1.split("-");
            //     imgArr.splice(imgArr.length - 1, 1, "max.jpg");
            //     let imgArr1 = imgArr.join("-");
            //     img2.src = imgArr1;
            //     rec.formattedImags.push(img);
            //     rec.formattedImags1.push(img2);
            //   });
                rec.formattedImags = [];
                rec.formattedImags1 = [];
                if(rec.img) {
                    rec.img.map(item => {
                        let img = {};
                        let img1 = {};
                        let img2 = {};
                        img.src = item;
                        img1 = item;
                        // let imgArr = img1.split("-");
                        // imgArr.splice(imgArr.length - 1, 1, "max.jpeg");
                        if(img1.indexOf("min") != -1) {
                            let imgArr = img1.replace('min','max').split("-");
                            let imgArr1 = imgArr.join("-");
                            img2.src = imgArr1;
                        rec.formattedImags.push(img);
                        rec.formattedImags1.push(img2);
                        }
                        
                        
                    })
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
      reply(ind, demand_code, dynamic_id) {
        this.indexs = ind;
        this.shows = "";
      },
      replyPerson(i, ind) {
        this.indexs = i;
        this.indexs1 = ind;
        this.shows1 = "";
      },
      onConfirm(demand_code, publisher_name, id, publisher_id) {
                   let obj = checkDesc(this.introduct,5,500,"爱心反馈内容")
        if(!obj.valid){
         this.showToast("", "text",obj.msg);
        return;
        }else{
          if (!/[^\x00-\xff]{5,500}$/.test(this.introduct.replace(/(^\s*)|(\s*$)/g, "")))
          {
            this.showToast("", "text","爱心反馈输入有误，必须是中文字符");
           return
          }
        }
        this.$http
          .post("hts/help/reply", {
            demand_code: demand_code,
            dynamic_comment: this.introduct,
            ly_id: id,
            reply_user_name: publisher_name,
            reply_id: publisher_id
          })
          .then(res => {
              this.page = parseInt(this.indexs / this.pageSize) + 1
              this.resIndex = this.indexs % this.pageSize
              //console.log(this.resIndex,'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq')
              this.introduct = "";
              this.dynamic()
          });
      },
      onCancel() {
      },
      onCancel1() {
      },
      More() {
        if (this.records.length < this.totals) {
          this.page++;
          this.loadMore = true
          this.dynamic();
        }
      },
      checkmore(ind){
        if(this.records[ind].replyList.length >= 10){
                 this.Reply1 = false;
                 this.Reply2 = true;
                 this.page1++;
                 this.loadMore1 = true;
                 let records = this.records[ind].replyList;
                this.$http
                    .post("hts/help/getReply", {
                      demand_code: this.records[ind].demand_code,
                      dynamic_id: this.records[ind].id,
                      page: this.page1
                    })
                    .then(res=>{
                      let more = res.data.vos;
                      if(this.loadMore1){
                        this.records[ind].replyList = [...records,...more]
                      }
                      if(res.data.vos.length < 10){
                          this.Reply2 = false;
                      }
                    })
            }
      }
    },
    created() {
      this.init = true
      this.dynamic();
    }
  };
</script>
<style scoped>
  /*textarea样式*/
  .vux-x-textarea{border:1px solid #d9d9d9;margin:10px auto 20px auto}
  .vux-confirm>>>.weui-mask{background:rgba(0,0,0,0.2)}
  /*动态时间轴*/
  .dyn-timeline-item {
    height: 100%;
  }
  .redfont >>>span{
    color:#ff0000;
  }
  .dyn-timeline-item .tab-left {
    width: 55px;
    padding-top: 13px;
    padding-bottom: 20px
  }

  .dyn-timeline-item .tab-left * {
    box-sizing: border-box
  }

  .dyn-timeline-item .tab-left em {
    display: block;
    width: 1px;
    background: #eee;
    height: 100%;
    margin: 0 auto;
    margin-bottom: 0px;
    margin-top: 5px
  }

  .dyn-timeline-item .tab-mid {
    width: 55px
  }

  .dyn-timeline-item .tab-mid img {
    margin: 0 auto;
    margin-top: 5px
  }

  .dyn-timeline-item .tab-right {
    padding-left: 5px
  }

  .dyn-timeline-item .tab-right p {
    padding-top: 5px
  }

  /*物品图片组展示*/
  .photospre {
    margin-top: 10px
  }

  .photospre .photo-items {
    margin: -5px;
  }

  .photospre .photo-items * {
    box-sizing: border-box
  }

  .photospre .photo-items .photo-item {
    padding: 5px;
    float: left;
    width: 33.333333%;
    font-size: 0
  }

  .photospre .photo-items .photo-item img {
    width: 100%
  }

  /*评论回帖区域*/
  .comment {
    padding: 0
  }

  .comment .comment-item:first-child{margin-top:10px;padding-top:5px}
  .comment >>>.comment-item:last-child{padding-bottom:5px}
  .comment .comment-item {
    padding:0px 10px 5px 10px
  }

  /*动态时间轴内日期*/
  .dyn-timeline-item .date {
    padding: 5px 0;
    border-bottom: 1px solid #eee;
    margin-bottom: 10px
  }

  .dyn-timeline-item:last-child .date {
    border: 0 none
  }

  /*查看更多动态*/
  .dyn-timeline-viewmore {
    position: relative
  }

  .dyn-timeline-viewmore span {
    padding: 5px 15px;
    position: relative;
    margin-left: 70px;
    background: #ededed
  }

  .dyn-timeline-viewmore span:before {
    width: 0px;
    position: absolute;
    left: -14px;
    top: 11px;
    content: '';
    height: 0;
    border: 7px solid;
    border-color: transparent #ededed transparent transparent;
  }

  .dyn-timeline-viewmore em {
    display: block;
    width: 12px;
    height: 12px;
    background: #ededed;
    position: absolute;
    left: 21px;
    top: 11px;
    border-radius: 50%
  }
</style>
