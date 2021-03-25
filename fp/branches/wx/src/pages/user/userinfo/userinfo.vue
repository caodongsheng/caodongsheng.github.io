<template>
  <div class="sigin-org" v-show="userdata">
    <div class="user-header-top clearfix">
      <!--左侧头像-->
      <div class="f_l header-leftinfo">
  
          <div class="flex-tab">
            <div class="flex-tab-cell tab-left v-middle" >
              
               <upload-icon ref="uploadicon" :isavata="true">
                <avatar :name="username" :image="usericon" tsize="2" width="50" height="50" ></avatar>
               </upload-icon>
            </div>
            <div class="flex-tab-cell tab-right v-middle" @click="gotoName()">
            
                <h1 class="f-18 color-333 oversize">{{username}}</h1>
                <p class="color-999 f-12 tit-2row-nowrap" v-if="userdata.type==1">{{authunion}}</p>
             
              <type
                :is_certification="user.is_certification"
                :is_poor="user.is_poor"
                :is_cadre="user.is_cadre"
              ></type>
            </div>
          </div>
      
      </div>
      <!--右侧积分/活跃度-->
      <div class="f-12 header-rightinfo bg-f6f5f6">
        <div class="fens">
          <img src="../title_png/num.png">
          <router-link v-if="userdata.type==1" to @click.native="openUrl()">至善信用分:{{creditScore}}</router-link>
        </div>
        <router-link v-if="userdata.type==2" to>活跃度: {{userdata.points}}</router-link>
      </div>
    </div>
    <flexbox class="user-header-bottom">
      <flexbox-item>
        <div class="flex-demo" @click="golove">
          <router-link to class="dis-block">
            <em class="dis-block text-center f-16 color-333">{{userdata.loveheat}}</em>
            <span class="dis-block text-center f-14 color-999 tit-nowrap">爱心热度</span>
          </router-link>
        </div>
      </flexbox-item>
      <flexbox-item>
        <div class="flex-demo" @click="gomypoints">
          <router-link to class="dis-block">
            <em class="dis-block text-center f-16 color-333">{{userdata.points}}</em>
            <span class="dis-block text-center f-14 color-999 tit-nowrap">我的积分</span>
          </router-link>
        </div>
      </flexbox-item>
      <flexbox-item>
        <div class="flex-demo" @click="goMissiona">
          <router-link to class="dis-block">
            <em class="dis-block text-center f-16 color-333">
              <img src="../../../common/images/user-icon-redu.png" width="15">
            </em>
            <span class="dis-block text-center f-14 color-999 tit-nowrap">任务与勋章</span>
          </router-link>
        </div>
      </flexbox-item>
    </flexbox>
  </div>
</template>
<script>
import avatar from "@/components/util/avatar";
import loveheat from "../userInform/loveheat";
import mytask from "../userInform/mytask";
import mypoints from "../userInform/myPoints";
import { mapActions, mapState } from "vuex";
import type from "./typeImg";
import open from "@/assets/js/openWin";
import UploadIcon from "../setting/uploadicon/UploadIcon";

let Base64 = require("js-base64").Base64;
export default {
  components: {
    avatar,
    loveheat,
    mytask,
    UploadIcon,
    mypoints,
    type
  },
  data() {
    return {
      creditScore: "",
      path: process.env.LO_URL + "/myLoveHeat.html?token=" + this.G("token"),
      mypointspath:
        process.env.LO_URL + "/myPoints.html?token=" + this.G("token"),
      goMissionb: process.env.LO_URL + "/medalAndTask.html",
      img: require("../../../assets/images/fpw_logo_small.png")
    };
  },
  props: {
    userdata: {
      type: Object,
      default: null
    }
     
  },
  created() {
   
     this.getUser();
     this.getCreditScore();
  },
  methods: {
    ...mapActions(["getUser"]),
    getUser() {
      this.$store.dispatch("getUser", { _this: this.$http });
    },
    gotoUpload(){
     this.$refs.uploadicon.setShowMenu()
    },
    gotoName(){
       this.$router.push( "/setnickname/" + this.username);
    },
    //爱心热度
    golove() {
      if (this.isWeixinCient()) {
        this.$router.push({ path: "/loveheat" });
      } else {
        let token, userId, nickName, userPic, createTime;
        token = this.G("token");
        userId = this.$store.state.user.id;
        nickName = this.$store.state.user.nick_name;
        userPic = this.$store.state.user.user_pic;
        createTime = this.$store.state.user.register_time;
        let msg = {
          user_id: userId,
          name: nickName,
          photo: userPic,
          create_time: createTime
        };
        let message = JSON.stringify(msg);
        message = Base64.encode(message);
        this.path =
          process.env.LO_URL +
          "/myLoveHeat.html?token=" +
          token +
          "&message=" +
          message;
        console.log(this.path);
        open(this.path, "爱心热度");
      }
    },
    //我的积分
    gomypoints() {
      if (this.isWeixinCient()) {
        this.$router.push({ path: "/mypoints" });
      } else {
        open(this.mypointspath, "我的积分");
      }
    },
    //任务与勋章
    goMissiona() {
      if (this.isWeixinCient()) {
        this.$router.push({ path: "/mytask" });
      } else {
        let token, userId, nickName, userPic, createTime;
        token = this.G("token");
        userId = this.$store.state.user.id;
        nickName = this.$store.state.user.nick_name;
        userPic = this.$store.state.user.user_pic;
        createTime = this.$store.state.user.register_time;
        this.goMissionb =
          process.env.LO_URL +
          "/medalAndTask.html?token=" +
          token +
          "&user_id=" +
          userId +
          "&name=" +
          nickName +
          "&name=" +
          nickName +
          "&photo=" +
          userPic +
          "&create_time=" +
          createTime;
        open(this.goMissionb, "任务与勋章");
      }
    },
    openUrl() {
      let token, userId, userType, userName, djresPath;
      userType = this.$store.state.user.is_cadre == 1 ? 2 : 1;
      userId = this.$store.state.user.id;
      userName = this.$store.state.user.nick_name;
      token = this.G("token");

      djresPath =
        process.env.ZHISHAN_URL +
        "byPro/dist/index.html?userType=" +
        userType +
        "&userId=" +
        userId +
        "&userName=" +
        userName +
        "&token=" +
        token;
      open(djresPath, "");
    },
    getCreditScore() {
      let userId =  this.$store.state.user.id;
      let userType = this.$store.state.usersetting.is_cadre;
      let type = null;
      if (userType == 1) {
        type = 2;
      } else {
        type = 1;
      }
      this.$https
        .get(
          process.env.BASE_API +
            "uas/personal/creditScore?userId=" +
            userId +
            "&type=" +
            type
        )
        .then(res => {
          this.creditScore = res.data.result.data.userScore;
        });
    }
  },
  computed: {
    ...mapState(["user"]),
    usericon() {
      if (
        this.$store.state.user &&
        JSON.stringify(this.$store.state.user) !== "{}"
      ) {
        if (
          this.$store.state.user.user_pic &&
          this.$store.state.user.user_pic !== ""
        ) {
          return this.$store.state.user.user_pic;
        } else {
          return this.img;
        }
      }
    },
    vtype: function() {
      if (this.$store.state.user.is_cadre === 1) {
        return "1";
      } else return "0";
    },
    isCertification: function() {
      return this.$store.state.user.is_celebrity === 1;
    },
    username: function() {
      if (JSON.stringify(this.$store.state.user) !== "{}") {
        return this.$store.state.user.nick_name;
      } else {
        return this.$store.state.usersetting.nick_name;
      }
    },
    authunion: function() {
      if (
        this.$store.state.user.org_name !== "" &&
        this.$store.state.user.org_name !== null
      ) {
        return "认证机构：" + this.$store.state.user.org_name;
      } else return "";
    }
  }
};
</script>
<style scoped>
.oversize {
  max-width: 110px;

  overflow: hidden;

  text-overflow: ellipsis;

  white-space: nowrap;
}
.user-header-top {
  padding: 20px 0;
  position: relative;
}

.user-header-top .tab-left {
  width: 65px;
}

.user-header-top .tab-left a {
  position: relative;
}

.user-header-top .iconfont {
  position: absolute;
  right: 10px;
  bottom: 0;
  line-height: 100%;
}
.user-header-bottom {
  padding: 12px 0;
  border-top: 1px solid #eee;
}

.user-header-bottom >>> .vux-flexbox-item {
  position: relative;
}

.user-header-bottom >>> .vux-flexbox-item:after {
  content: "";
  position: absolute;
  top: 10px;
  bottom: 10px;
  width: 1px;
  right: 0;
  background: #eee;
}

.user-header-bottom >>> .vux-flexbox-item:last-child:after {
  width: 0;
}

.header-leftinfo {
  padding: 0 130px 0 15px;
}

.header-rightinfo {
  position: absolute;
  right: 0;
  top: 50%;
  margin-top: -25px;
  height: 30px;
  line-height: 29px;
  padding: 0 15px 0 10px;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
}
.fens {
  display: flex;
  align-items: center;
}
.fens img {
  max-width: 100%;
  width: 12%;
  height: 12%;
  margin-right: 5px;
}
.fens a {
  flex: 1;
}
</style>
