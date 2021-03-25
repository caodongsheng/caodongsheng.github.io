<template>
       <div>
           <div class="titl">
               <div class="jr">
                 <span 
                 v-for="(item,index) in conNav" 
                :class="{active:index == num}"
                @click="tab(index)" :key="index">{{item.name}}</span>
               </div>
           </div>
           <div>
               <div>
                    <div class="box2">
                        <dl v-for="(i,index) in bottomCount" :key="index">
                            <dt><img v-lazy="getMidPic(Helprecord[index].img)" alt=""></dt>
                            <dd>
                                <div class="tit">
                                    <p>
                                        <b>{{Helprecord[index].name}}</b>
                                        <span class="bf">帮扶了<a>{{Helprecord[index].prc}}</a>元</span>
                                    </p>
                                    <p @click="aa()">图标</p>
                                </div>
                                <div class="con">{{Helprecord[index].con}}</div>
                                <div><i class="icon-huo"></i>{{Helprecord[index].rd}}爱心热度</div>
                                <div class="chat">
                                <div class="chat-box">
                                    <span class="sj"></span>
                                    <p>
                                        <span class="full-name">张三</span>: <span class="full-speak">hello</span>
                                    </p>
                                    <p>
                                        <span class="full-name">李四</span>: <span class="full-speak">hi</span>
                                    </p>
                                </div>
                    </div>
                            </dd>
                        </dl>
                        <p @click="gd" v-show="showList1" class="Morerecords">更多纪录</p>
                    </div>     
               </div>
           </div>
           <projectile  v-show="onFetching"></projectile>
      </div> 
</template>
<script>
import { Scroller, LoadMore } from "vux";
import projectile from "./projectile";
 import { getMidPic } from "@/util/getMid";

export default {
  components: {
    Scroller,
    LoadMore,
    projectile
  },
  data() {
    return {
      projectile: false,
      num: 1,
      showList1: true,
      scrollTop: 0,
      onFetching: false,
      bottomCount: 2,
      conNav: [{ id: 1, name: "按时间" }, { id: 2, name: "按金额" }],
      arr: [],
      Helprecord: [
        {
          img: "./static/appimg/zmlb_head-.png",
          name: "公益天使",
          prc: 150,
          con: "双丰收高吃个饭拉开距离",
          rd: 30
          //   time:new data()
        },
        {
          img: "./static/appimg/zmlb_head-.png",
          name: "公益天使",
          prc: 190,
          con: "双丰收高吃个饭拉开距离",
          rd: 30
          //   time:new data()
        },
        {
          img: "./static/appimg/zmlb_head-.png",
          name: "公益天使",
          prc: 210,
          con: "双丰收高吃个饭拉开距离",
          rd: 30
          //   time:new data()
        },
        {
          img: "./static/appimg/zmlb_head-.png",
          name: "公益天使",
          prc: 460,
          con: "双丰收高吃个饭拉开距离",
          rd: 30
          //   time:new data()
        },
        {
          img: "./static/appimg/zmlb_head-.png",
          name: "公益天使",
          prc: 550,
          con: "双丰收高吃个饭拉开距离",
          rd: 30
          //   time:new data()
        },
        {
          img: "./static/appimg/zmlb_head-.png",
          name: "公益天使",
          prc: 320,
          con: "双丰收高吃个饭拉开距离",
          rd: 30
          //   time:new data()
        },
        {
          img: "./static/appimg/zmlb_head-.png",
          name: "公益天使",
          prc: 144,
          con: "双丰收高吃个饭拉开距离",
          rd: 30
          //   time:new data()
        },
        {
          img: "./static/appimg/zmlb_head-.png",
          name: "公益天使",
          prc: 890,
          con: "双丰收高吃个饭拉开距离",
          rd: 30
          //   time:new data()
        },
        {
          img: "./static/appimg/zmlb_head-.png",
          name: "公益天使",
          prc: 1010,
          con: "双丰收高吃个饭拉开距离",
          rd: 30
          //   time:new data()
        },
        {
          img: "./static/appimg/zmlb_head-.png",
          name: "公益天使",
          prc: 1210,
          con: "双丰收高吃个饭拉开距离",
          rd: 30
          //   time:new data()
        },
        {
          img: "./static/appimg/zmlb_head-.png",
          name: "公益天使",
          prc: 9080,
          con: "双丰收高吃个饭拉开距离",
          rd: 30
          //   time:new data()
        },
        {
          img: "./static/appimg/zmlb_head-.png",
          name: "公益天使",
          prc: 103260,
          con: "双丰收高吃个饭拉开距离",
          rd: 30
          //   time:new data()
        },
        {
          img: "./static/appimg/zmlb_head-.png",
          name: "公益天使",
          prc: 10860,
          con: "双丰收高吃个饭拉开距离",
          rd: 30
          //   time:new data()
        }
      ]
    };
  },
  methods: {
    //点击更多记录显示收起
    gd(e) {
      if (e.target.innerHTML == "更多记录") {
        this.bottomCount = this.Helprecord.length;
        e.target.innerHTML = "收起";
      } else {
        this.bottomCount = 2;
        e.target.innerHTML = "更多记录";
      }
    },
    //点击弹出回复留言
    aa() {
      if (this.onFetching == false) {
        this.onFetching = true;
      } else {
        this.onFetching = false;
      }
    },
    //时间与金额的切换
    tab(index) {
      this.num = index;
    },
    onScroll(pos) {
      this.scrollTop = pos.top;
    },
    onCellClick() {
      //window.alert("cell click");
    },
    onClickButton() {
      //window.alert("click");
    },
    changeList() {
      this.showList1 = false;
      this.$nextTick(() => {
        this.$refs.scroller.reset({
          top: 0
        });
      });
    }
  }
};
</script>
<style lang="less" scoped>
.chat {
  width: 95%;
  height: auto;
  background: #eee;
  border-radius: 5px;
  margin-top: 10px;
}
.Morerecords {
  width: 100%;
  height: 45px;
  line-height: 45px;
  text-align: center;
  color: orange;
}
.chat-box {
  padding-left: 10px;
  position: relative;
}
.sj {
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid #eee;
  position: absolute;
  top: -10px;
  left: 30px;
}
.chat-box p {
  line-height: 30px;
}
.titl {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  .jr {
    background: #eee;
    padding: 5px 8px;
    border-radius: 5px;
    font-size: 15x;
    span:nth-child(1) {
      padding-right: 5px;
      border-right: 1px solid #ccc;
    }
    span:nth-child(2) {
      padding-left: 5px;
    }
  }
}
.box2 {
  width: 100%;
  dl {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
    dt {
      padding: 0 10px;
    }
    dd {
      width: 100%;
      div {
        line-height: 30px;
      }
      .tit {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .icon {
          padding-right: 10px;
        }
        .bf {
          a {
            color: orange;
          }
        }
      }
    }
  }
}
.active {
  color: orange;
}
</style>

