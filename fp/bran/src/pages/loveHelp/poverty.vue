<template>
  <!--帮扶帮详情-->
  <div>
    <div>
      <headerBackTitleShare :headerTitle="headerTitle" :vos="sharevos"></headerBackTitleShare>
    </div>
    <div class="box-withheader">
      <scrolltemplate
        v-if="demandlist.length !== 0"
        :infinitefun="infinitefun"
        :end="end"
        :refreshfun="refreshfun"
        ref="myscroller"
        class="bg-f6f5f6"
      >
        <div class="title">
          <marquee
            behavior="scroll"
            direction="left"
            loop="infinite"
            scrollamount="5"
            scrolldelay="30"
          >{{alleviation}}</marquee>
        </div>


        <div class="banner">
          <div class="banner-list" v-for="(item,index) in vos" :key="index">


          



            <avatarsix :image="item.user_pic" :name="item.nick_name" class="img"></avatarsix>

            <!-- <p class="num">
              <img src="../../common/images/user-icon-redu.png" alt />
              {{item.help_money * 2}}
            </p> -->

            <p class="name">{{item.nick_name}}</p>
            <p class="prc">{{item.help_money}}元</p>
            <p class="number">给{{item.together}}人贡献爱心</p>
          </div>
        </div>



        <div class="list bg-ffffff">
          <!--<scroller lock-x :scroll-bottom-offst="200">-->
          <ul>
            <li v-for="(item,index) in vosOther" :key="index">
              <div class="left">
                <p>{{index+4}}</p>
                <p class="img">
                  <avatar width="35" height="35" :image="item.user_pic" :name="item.nick_name"></avatar>
                </p>
                <p>{{item.nick_name}}</p>
               <!--  <p class="icon">
                 <img src="../../common/images/user-icon-redu.png" alt />
                 {{item.help_money*2}}
               </p> -->
              </div>
              <div class="right">
                <p class="prc">{{item.help_money}}元</p>
                <p class="num">给{{item.together}}个人贡献爱心</p>
              </div>
            </li>
          </ul>
        </div>

        <!--<recommand  :item="item1" :type="item1.re_template"  v-for="(item1,index) in demandlist" :key="index"></recommand>-->
      </scrolltemplate>
    </div>
  </div>
</template>

<script>
import headerBackTitleShare from "../../components/header/headerBackTitleShare";
import { XHeader, Scroller } from "vux";
import avatar from "../../components/util/avatar";
import avatarsix from "../../components/util/avatarsix";
import scrolltemplate from "@/components/scroll/scrollcomponent";
export default {
  components: {
    XHeader,
    Scroller,
    headerBackTitleShare,
    avatar,
    avatarsix,
    scrolltemplate
  },
  data() {
    return {
      vos: [],
      page: 1,
      end: false,
      demandlist: [],
      vosOther: [],
      headerTitle: "爱心需求扶贫榜",
      alleviation: "爱心需求扶贫榜说明 : 根据爱心人士帮扶金额的排名形成的榜单",
      list: null,
      sharevos: {}
    };
  },
  methods: {
    getdemandlist: function(data, callback) {
      if (data.vos.length < 10) {
        this.end = true;
      } else {
        this.end = false;
      }
      let arr = data.vos;
      for (let j = 0; j < arr.length; j++) {
        this.demandlist.push(arr[j]);
      }
      let otherNum = this.demandlist.length - 3;
      this.vos = this.demandlist.slice(0, 3);
      if (this.demandlist.length > 3) {
        this.vosOther = this.demandlist.slice(3, otherNum);
      }
      //        this.vos = [{ "help_money": 1100,"nick_name":"单纯的","user_id": "13" },{ "help_money": 900,"nick_name":"ghkk", "user_id": "12"},{ "help_money": 700,"nick_name":"sts","user_id": "11"}]//,{"help_money": 200,"user_id": "14"}
      //        this.vosOther = [{ "help_money": 1100,"nick_name":"单纯的","user_id": "13" },{ "help_money": 900,"nick_name":"ddds", "user_id": "12"},{ "help_money": 700,"nick_name":"ddds","user_id": "11"},{"help_money": 200,"nick_name":"是ds","user_id": "14"}]
      if (callback) callback();
    },

    infinitefun(callback) {
      if (!this.end) {
        this.page++;
        this.getDemands(callback);
      }
    },

    refreshfun() {
      this.page = 1;
      this.demandlist = [];
      this.getDemands();
    },
    getDemands(callback) {
      let self = this;
      this.$http
        .post("hts/help/getHelpList", {
          page: this.page,
          pageSize: 10,
          demand_id: this.$route.params.id
        })
        .then(function(response) {
          self.getdemandlist(response.data, callback);
        })
        .catch(error => {
          if (error.msg) this.showToast("", "text", error.msg, "20em", "top");
        });
    }
  },
  created() {
    this.page = 1;
    this.demandlist = [];
    this.help_type_code = this.$route.params.id;
    this.getDemands();
  },
  mounted() {
    this.sharevos = {};
    this.sharevos.title = "爱心需求扶贫榜";
    this.sharevos.desc = "中国社会扶贫网，让爱在阳光下链接";
    this.sharevos.link = this.WinXinHost + "#" + location.href.split("#")[1];

    this.sharevos.imgUrl = this.H5PAY_URL + "static/appimg/share_icon.png";
    this.sharevos.demandId = "";
  }
};
</script>
<style lang="less" scoped>
.header-wrap {
  overflow-x: hidden;
}
.title {
  height: 30px;
  background: #fff2e9;
  line-height: 30px;
  marquee {
    color: #f37306;
    font-size: 10px;
  }
}
.banner {
  height: 17.7rem;
  width: 100%;
  background-image: url(../../../static/appimg/fupinbangbg1.png);
  background-size: 100%;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;


   -webkit-box-align: center;
    -moz-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;

    -webkit-box-pack: center;
    -moz-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;

  position: relative;
}
.banner-list {
  width: 32%;
  height: auto;
  margin-top: 3rem;
  text-align: center;
  p {
    margin: 0 auto;
    line-height: 25px;
  }
  .img {
    width: 50px;
    height: 40px;
    text-align: center;
    margin-top: 10px;
    border-radius: 50%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .num {
    color: #999999;
    font-size: 6pt;
    img {
      width: 12px;
      padding-right: 2px;
    }
  }
  .name {
    font-weight: bold;
    font-size: 8pt;
  }
  .prc {
    color: #f37306;
    font-size: 8pt;
  }
  .number {
    font-size: 3pt !important;
    color: #999999;
  }
}
.banner-list:nth-child(1) {
  height: auto;
  position: absolute;
  bottom: 2rem;
  /*box-shadow: 0 0 10px rgba(0,0,0,0.2);*/
  padding-top: 30px;
  /*padding-bottom:18px;*/
  z-index: 2;
  margin-left:-16%;
  left:50%;
  .img {
    -webkit-transform: scale(1.2);
    -moz-transform: scale(1.2);
    -o-transform: scale(1.2);
    transform: scale(1.2);
    line-height: 45px;
    &:before {
      content: "";
      position: absolute;
      width: 30px;
      height: 18px;
      background: url(../../../static/appimg/eva-cup01.png) no-repeat center top;
      background-size: 100% auto;
      left: 50%;
      transform: translateX(-50%);
      -webkit-transform: translateX(-50%);
      -moz-transform: translateX(-50%);
      -o-transform: translateX(-50%);
      top: -14px;
      z-index: 3;
    }
  }
}
.banner-list:nth-child(2) {
  position: relative;
  padding-top: 15px;
  margin-right: 30px;
  /*box-shadow: 0 0 10px rgba(0,0,0,0.2);*/
  .img {
    &:before {
      content: "";
      position: absolute;
      width: 25px;
      height: 18px;
      background: url(../../../static/appimg/eva-cup02.png) no-repeat center top;
      background-size: 100% auto;
      left: 50%;
      transform: translateX(-50%);
      -webkit-transform: translateX(-50%);
      -moz-transform: translateX(-50%);
      -o-transform: translateX(-50%);
      top: -15px;
      z-index: 3;
    }
  }
}
.banner-list:nth-child(3) {
  position: relative;
  padding-top: 15px;
  margin-left: 70px;
  /*box-shadow: 0 0 10px rgba(0,0,0,0.2);*/
  .img {
    &:before {
      content: "";
      position: absolute;
      width: 25px;
      height: 18px;
      background: url(../../../static/appimg/eva-cup03.png) no-repeat center top;
      background-size: 100% auto;
      left: 50%;
      transform: translateX(-50%);
      -webkit-transform: translateX(-50%);
      -moz-transform: translateX(-50%);
      -o-transform: translateX(-50%);
      top: -15px;
      z-index: 3;
    }
  }
}


  
.banner-list:hover {
  z-index: 999;
}
.list {
  width: 100%;
  overflow-x: hidden;
  ul {
    width: 100%;
    li {
      position: relative;
      padding: 8px 15px;
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &:first-child {
        &:before {
          border: 0 none;
        }
      }
      &:before {
        content: "";
        position: absolute;
        left: 15px;
        right: 15px;
        top: 0;
        border-top: 1px solid #d9d9d9;
        transform: scaleY(0.5);
         -webkit-transform: scale(0.5);
    -moz-transform: scale(0.5);
    -o-transform: scale(0.5);
      }
      .left {
        display: flex;
        justify-content: space-between;
        align-items: center;
        p {
          margin-right: 15px;
          float: left;
        }
        .icon {
          vertical-align: middle;
          img {
            width: 12px;
            padding-right: 3px;
          }
        }
        .img {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          line-height: 30px;
          text-align: center;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .right {
        text-align: center;
        .prc {
          color: #f37306;
          font-size: 11pt;
        }
        .num {
          font-size: 6pt;
          color: #999999;
        }
      }
    }
  }
}
</style>




