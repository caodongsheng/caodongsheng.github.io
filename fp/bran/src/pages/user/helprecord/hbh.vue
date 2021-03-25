<template>
  <div class="helpRecord">
    <div class="header">
      <x-header :left-options="{backText: ''}">户帮户亲帮亲</x-header>
    </div>
    <div class="help-box">
      <div class="tab-box">
        <ul class="tab">
          <li
            @click="onClick(index)"
            v-for="(item, index) in tabs"
            :key="index"
            :class="{ active: publishStatus == index }"
          >
            {{ item.name }}
          </li>
        </ul>
        <p class="tishi">管理员请您确认是否收到以下帮扶:</p>
      </div >
      <div class="asd">
        <scroller
            v-if="list.length !== 0"
            :on-refresh="refresh"
            :on-infinite="infinite"
            refresh-layer-color="#4b8bf4"
            loading-layer-color="#ec4949" >
            <svg class="spinner" style="stroke: #4b8bf4;" slot="refresh-spinner" viewBox="0 0 64 64">
                <g stroke-width="7" stroke-linecap="round"><line x1="10" x2="10" y1="27.3836" y2="36.4931"><animate attributeName="y1" dur="750ms" values="16;18;28;18;16;16" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="48;46;36;44;48;48" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values="1;.4;.5;.8;1;1" repeatCount="indefinite"></animate></line><line x1="24" x2="24" y1="18.6164" y2="45.3836"><animate attributeName="y1" dur="750ms" values="16;16;18;28;18;16" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="48;48;46;36;44;48" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values="1;1;.4;.5;.8;1" repeatCount="indefinite"></animate></line><line x1="38" x2="38" y1="16.1233" y2="47.8767"><animate attributeName="y1" dur="750ms" values="18;16;16;18;28;18" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="44;48;48;46;36;44" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values=".8;1;1;.4;.5;.8" repeatCount="indefinite"></animate></line><line x1="52" x2="52" y1="16" y2="48"><animate attributeName="y1" dur="750ms" values="28;18;16;16;18;28" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="36;44;48;48;46;36" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values=".5;.8;1;1;.4;.5" repeatCount="indefinite"></animate></line></g></svg>
            <slot>
                <div class="helplist-wrap bg-f6f5f6">
                    <div class="help-list" v-for="(item, index) in list" :key="index">
                <div class="list-title-box">
                  <ul class="list-title">
                    <li class="img1"><img :src="item.headpath" alt="" /></li>
                    <li>
                      <div>{{ item.adminUsername }}</div>
                    </li>
                    <li>{{ item.createTime }}</li>
                  </ul>
                  <div class="dw">
                    <img src="../../../../static/appimg/dwhbh.png" alt="" />
                    <div class="ssx">
                      {{ item.adminRegionname }}
                    </div>
                  </div>
                </div>
                <div class="list-cont">
                  <div class="img2"><img :src="item.publishImages" alt="" /></div>
                  <div class="text">
                    {{ decodeURIComponent(item.publishInfo) }}
                  </div>
                </div>
                <div class="list-bottom">
                  <span></span>
                  <div
                    class="btn"
                    @click="onBtn(index, item)"
                    :class="{ active1: item.publishStatus == 1 }"
                  >
                    {{ publishStatus ? "已收到" : "确认收到" }}
                  </div>
                </div>
              </div>
                </div>   
            </slot>
            <svg class="spinner" style="fill: #ec4949;" slot="infinite-spinner" viewBox="0 0 64 64">
                    <g><circle cx="16" cy="32" stroke-width="0" r="3"><animate attributeName="fill-opacity" dur="750ms" values=".5;.6;.8;1;.8;.6;.5;.5" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="3;3;4;5;6;5;4;3" repeatCount="indefinite"></animate></circle><circle cx="32" cy="32" stroke-width="0" r="3.09351"><animate attributeName="fill-opacity" dur="750ms" values=".5;.5;.6;.8;1;.8;.6;.5" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="4;3;3;4;5;6;5;4" repeatCount="indefinite"></animate></circle><circle cx="48" cy="32" stroke-width="0" r="4.09351"><animate attributeName="fill-opacity" dur="750ms" values=".6;.5;.5;.6;.8;1;.8;.6" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="5;4;3;3;4;5;6;5" repeatCount="indefinite"></animate></circle></g></svg>
          </scroller>
          <div  v-else class="nocontent f-14 color-999 text-center bg-f6f5f6" style="padding: 182px 15px">
            <img class="dis-block" src="../../../../static/appimg/no-content.png" style="width:90px;margin:0 auto">
            <p style="padding-top: 10px">抱歉，您还没有记录~</p>
          </div>
      </div>
          
        
              
    </div>
  </div>
</template>
<script>

import { XHeader } from 'vux'
export default {
  name: "helpRecord",
  components: {
    XHeader,
  },
  data() {
    return {
      publishStatus: 0, //当前选中状态:0待确认, 1已确认, null全部
      currentPageNo: 1,
      pageSize: 10,
      povertyId: "", //用户ID
      publishId: "", //需求id
      tabs: [{ name: "待确认" }, { name: "已确认" }],
      list: [],
    };
  },
  created() {
    console.log("默认状态:", this.publishStatus);
    this.povertyId=this.$route.query.id
    console.log("userid:", this.povertyId);
    this.getList();
  },
  mounted() {
    // window.addEventListener(
    //   "scroll",
    //   this.debounce(this.lazyLoading, 500),
    //   true
    // ); // 滚动到底部，再加载的处理事件
  },
  methods: {
    infinite(done) {
        setTimeout (() => {
            // if(this.list.length < this.totals){
            //     this.currentPageNo++;
            //     this.getList();
            // } else {
            //     done(true);
            // }   
            console.log(123)
            this.currentPageNo++;
                this.getList(done);
        },1000)
    },
    refresh(done) {
        setTimeout(() => {
            this.list = [];
            this.currentPageNo = 1;
            this.getList(done);
            done(true);
        },1000)
     },
    debounce(fn, wait) {
      let timer = null;
      return function() {
        if (timer !== null) {
          clearTimeout(timer);
        }
        timer = setTimeout(fn, wait);
      };
    },
    lazyLoading() {
      alert()
      //滑动加载更多
      // 滚动到底部，再加载的处理事件
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      let clientHeight = document.documentElement.clientHeight;
      let scrollHeight = document.documentElement.scrollHeight;
      if (scrollTop + clientHeight >= scrollHeight) {
        // 如果滚动到接近底部，自动加载下一页
        //事件处理
        let totalPage = this.list.length;
        let Page = totalPage / this.pageSize;
        console.log("滚动到底了", Page);
        if (this.currentPageNo == Page) {
          this.currentPageNo++;
          this.getList();
        } else {
          return;
        }
      }
    },
    getList(done) {
      //帮扶记录详情列表
      let par = {
        publishStatus: this.publishStatus, //当前选中状态:0待确认, 1已确认, null全部
        currentPageNo: this.currentPageNo,
        pageSize: this.pageSize,
        povertyId: this.povertyId,
      };
      this.$http({
          url:'/tas/hunan/queryByStatusPorvert',
          method:'get',
          params:par,
          headers:{
              'Content-Type':'application/json'
          }
      }).then((res) => {
        if(res.data !==null){
          this.list = this.list.concat(res.data);
            if(done) {
              done(true);
          }
        }
        
      });
      
    },
    getState() {
      //修改帮扶确认状态
      let par = {
        publishId: this.publishId,
        publishStatus: 1,
        povertyId: this.povertyId,
      };
      this.$http({
          url:'/tas/hunan/updateByPorvertId',
          method:'get',
          params:par,
          headers:{
              'Content-Type':'application/json'
          }
      }).then((res) => {
        console.log("修改状态成功:", res);
        this.getList();
      });
    },
    onClick(index) {
      this.publishStatus = index;
      this.currentPageNo = 1;
      this.list=[]
      this.$nextTick(this.getList());
      console.log("当前状态:", this.publishStatus);
    },
    onBtn(index, data) {
      this.publishId = data.publishId;
      if (this.publishStatus == 0) {
        this.getState();
        console.log("点击后:", this.publishStatus);
      } else {
        return;
      }
    },
  },
};
</script>
<style lang="less" scoped>
.helpRecord {
  width: 100%;
  height: 100%;
}
.help-box {
  height: 100%;
  background: #f8f8f8;
}
.asd{
  width: 100%;
  height:  ~"calc(100% - 138px)" ;
  position: relative;
}
.tab-box {
  width: 100%;
  height: 70px;
  background: #fff;
  border-bottom: 1px solid #ccc;
}
.tab {
  display: flex;
  margin: 20px auto;
  width: 200px;
  height: 30px;
  border: 1px solid #e35215;
  border-radius: 8px;
  li {
    width: 50%;
    text-align: center;
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #e35215;
    line-height: 30px;
  }
  li:nth-of-type(2) {
    border-radius: 0px 4px 4px 0px;
  }
  li:nth-of-type(1) {
    border-radius: 4px 0px 0px 4px;
  }
}
.tishi {
  width: 184px;
  height: 12px;
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #e35215;
  line-height: 12px;
  margin-left: 15px;
}
.help-list {
  width: 374px;
  height: 210px;
  background: #ffffff;
  margin-bottom: 10px;
}
.list-title-box {
  padding: 10px 15px;
}
.dw {
  display: flex;
  position: relative;
  left: 15%;
  top: -12px;
  img {
    width: 7px;
    height: 10px;
    margin-right: 5px;
  }
  .ssx {
    width: 100%;
    height: 12px;
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #909191;
    line-height: 12px;
  }
}
.list-title {
  display: flex;
  justify-content: space-between;

  li:nth-of-type(2) {
    margin-left: -90px;
  }
  .img1 {
    margin-right: -20px;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
}
.list-cont {
  display: flex;
  width: 375px;
  height: 60px;
  background: #f8f8f8;
  padding: 15px;
  overflow: hidden;
  .img2 {
    width: 60px;
    height: 60px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .text {
    width: 278px;
    height: 58px;
    font-size: 13px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #666666;
    margin-left: 3px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
}
.list-bottom {
  display: flex;
  justify-content: space-between;
  padding-top: 8px;
  .btn {
    width: 73px;
    height: 25px;
    border: 1px solid #e35215;
    border-radius: 13px;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #e35215;
    line-height: 25px;
    margin-right: 13px;
    text-align: center;
  }
}
.active {
  background: #e35215;
  color: #fff !important;
}
.active1 {
  border: 1px solid #dcdcdc !important;
  color: #999999 !important;
}
</style>
