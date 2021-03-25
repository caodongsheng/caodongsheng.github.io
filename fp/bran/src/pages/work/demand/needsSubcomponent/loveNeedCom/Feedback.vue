<template>
    <div>
        <div class="state-timeline-content">
          <timeline class="time">
            <timeline-item v-for="(item,index) in bottomCount" :key="index">
               <div class="left recent f-normal f-12"><p>{{timelinelist[index].prodate}}</p></div> 
              <div class="recent f-normal f-14">
                  <div class="title">
                    <p><span class="name">{{timelinelist[index].name}}</span><span>{{timelinelist[index].Progress}}</span></p>
                    <p class="tb" @click="aa()">图标</p>
                    </div>
              <div class="img">
                  <p>
                      {{timelinelist[index].content}}
                  </p>
                  <ul>
                      <li v-for="(items,index) in timelinelist[index].img" :key="index">
                          <img v-lazy="getmidpic(items)" alt="">
                      </li>
                  </ul>
              </div>
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
              <em></em>
              </div>
            </timeline-item>
            <div class="xian">
                <span class="radios"></span>
                <span class="dashed"></span>
            </div>
            <div class="box">
                  <div class="box-left">
                       <span class="Sharp-angle"></span>
                        <span class="Sharp-sx"></span>
                        <span @click="lookMore" class="dynamic">查看更多爱心反馈</span>
                  </div>
              </div>
          </timeline>
          
        </div>
        <projectile v-show="onFetching"></projectile>
    </div>
</template>
<script>
import { Timeline, TimelineItem } from "vux";
import projectile from "./projectile";
 import { getMidPic } from "@/util/getMid";

export default {
  components: { Timeline, TimelineItem, projectile },
  data() {
    return {
      count: 3,
      onFetching: false,
      bottomCount: 2,
      name: "",
      timelinelist: [
        {
          prodate: "2天前",
          name: "村级管理员丽丽",
          Progress: "发布进展",
          content:
            "第三方第三方第三方第三方第三方撒旦撒多撒阿萨德撒地方打工丰东股份撒旦撒多撒多",
          img: [
            "./static/appimg/foods-img02.jpg",
            "./static/appimg/foods-img01.jpg",
            "./static/appimg/foods-img03.jpg"
          ]
        },
        {
          prodate: "5天前",
          name: "驻村第一书记 王海兵",
          Progress: "代发",
          content: "第三方第三方第三方第三方第三方撒旦撒多撒"
        },
        {
          prodate: "5天前",
          name: "驻村第一书记 王海兵",
          Progress: "代发",
          content: "第三方第三方第三方第三方第三方撒旦撒多撒"
        },
        {
          prodate: "5天前",
          name: "驻村第一书记 王海兵",
          Progress: "代发",
          content: "第三方第三方第三方第三方第三方撒旦撒多撒"
        },
        {
          prodate: "2天前",
          name: "村级管理员丽丽",
          Progress: "发布进展",
          content:
            "第三方第三方第三方第三方第三方撒旦撒多撒阿萨德撒地方打工丰东股份撒旦撒多撒多",
          img: [
            "./static/appimg/foods-img02.jpg",
            "./static/appimg/foods-img01.jpg",
            "./static/appimg/foods-img03.jpg"
          ]
        }
      ]
    };
  },
  methods: {
     getmidpic(imgurl){
    return getMidPic(imgurl)
    },
    aa() {
      if (this.onFetching == false) {
        this.onFetching = true;
      } else {
        this.onFetching = false;
      }
    },
    bb: function(aa) {
      
    },
    //查看更多
    lookMore(e) {
      if (e.target.innerHTML == "查看更多爱心反馈") {
        this.bottomCount = this.timelinelist.length;
        e.target.innerHTML = "收起";
      } else {
        this.bottomCount = 2;
        e.target.innerHTML = "查看更多爱心反馈";
      }
    }
  }
};
</script>
<style scoped>
.chat {
  width: 95%;
  height: auto;
  background: #eee;
  border-radius: 5px;
}
.chat-box {
  padding-left: 10px;
  position: relative;
}
.box-left {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 75px;
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
.box {
  width: 100%;
  position: absolute;
  bottom: -21px;
  left: 0;
}
.time {
  position: relative;
}
.title {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.radios {
  display: inline-block;
  width: 7px;
  height: 7px;
  border: 1px solid #f37306;
  border-radius: 50%;
  position: absolute;
  bottom: -58px;
  left: -5.5px;
}
.title span {
  font-size: 13px;
  padding-right: 3px;
}
.tb {
  padding-right: 10px;
}
.name {
  color: #3baee4;
}
.img p {
  font-size: 10px;
}
.img ul {
  display: flex;
}
.img ul li {
  margin-right: 10px;
  margin-bottom: 10px;
}
.img ul li img {
  width: 60px;
  height: 60px;
}
.img p {
  margin: 10px 0;
}
.xian {
  height: 70%;
  position: absolute;
  bottom: 45px;
  left: 85px;
  border-left: 2px solid orange;
}
.xian span {
  color: #f37306;
}
.Sharp-angle {
  display: inline-block;
  width: 7px;
  height: 7px;
  border-top: 1px solid #f37306;
  border-right: 1px solid #f37306;
  transform: rotate(-135deg);
  position: absolute;
  top: 9px;
  left: 26px;
}
.Sharp-sx {
  display: inline-block;
  height: 8px;
  border-right: 1px solid #fff;
  position: absolute;
  top: 9px;
  left: 30px;
}
.dynamic {
  margin-left: 30px;
  padding: 3px 5px;
  border: 1px solid #f37306;
  border-radius: 3px;
  color: #f37306;
}
.dashed {
  width: 0px;
  height: 50px;
  display: inline-block;
  border: 1px dashed orange;
  position: absolute;
  left: -2px;
  bottom: -50px;
}
.solid {
  width: 0px;
  height: 50px;
  border: 1px solid orange;
}
.vux-timeline {
  padding: 10px 2px 10px 80px;
}

.vux-timeline-item >>> .vux-timeline-item-content {
  padding: 0 0 1.5rem 1.6rem;
}

.left {
  position: absolute;
  top: 0;
  left: -70px;
  text-align: center;
  width: 90px;
}

.vux-timeline-item >>> .vux-timeline-item-content {
  color: #999;
}
.vux-timeline-item >>> .vux-timeline-item-tail {
  background-color: orange;
  height: 100% !important;
}

.vux-timeline-item >>> .vux-timeline-item-head-first {
  background-color: #f37306 !important;
  border-color: #f9bd8a !important;
  width: 10px;
  height: 10px;
  top: 2px;
  left: -3px;
}
.vux-timeline-item >>> .weui-icon-success-no-circle {
  font-size: 20px;
}

.vux-timeline-item
  >>> .vux-timeline-item-checked.weui-icon-success-no-circle::before {
  font-size: 0;
  position: absolute;
  left: 2px;
  top: 2px;
}

.vux-timeline-item >>> .vux-timeline-item-color {
  background-color: #f37306;
  border: 4px solid #f9bd8a;
}

.vux-timeline-item >>> .vux-timeline-item-head {
  width: 10px;
  height: 10px;
  left: -3px;
  top: 3px;
}
</style>


