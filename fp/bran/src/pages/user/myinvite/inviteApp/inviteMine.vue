<template>
  <div>
    <x-header :left-options="{'backText': '','preventGoBack':true}" @on-click-back="backTo">
      <a slot="right" class="top-msgtip dis-block" @click="toCodeL">
        <img
          style="width: 21px;height: 21px; background-color: #999"
          src="../img/header/set_img.png"
        >
      </a>
    </x-header>
    <div class="box-withbar over-auto bg-f6f5f6">
      <group class="group-clearbd bg-ffffff" label-align="left">
        <!-- <cell class="f-16" title="邀请好友" is-link link="inviteCode">
          <img slot="child" class="icon-code" src="../../../../static/appimg/icon-code.png" alt="" width="24">
        </cell>-->
        <cell class="f-16" title="邀请列表" is-link link="inviteList">
          <span class="color-999">{{inviteCount}}人</span>
        </cell>
      </group>
      <div class="myinvitecode">
        <avatar
          :name="nickname"
          :image="usericon"
          width="80"
          height="80"
          style="display: block;margin:0 auto"
        ></avatar>
        <h1 class="f-17 color-333 text-center f-normal">{{nickname}}</h1>
        <p class="f-14 color-999 text-center">
          <span class="f-bold color-333">{{area_t}}</span>
          &nbsp;&nbsp;{{area}}
        </p>
        <div id="qrCode" style="width: 165px;margin: 0 auto;"></div>
        <!-- <img class="codeimg dis-block block-center" :src="codeimg" width="70%"> -->
        <div class="Inv_Num_Code text-center">
          <span class="f_l">邀请码： {{NumCode}}</span>
          <div class="f-12 f_r color-666" @click="Copy(NumCode)" :disabled="isDisable">
            <a>复制</a>
          </div>
        </div>
        <p class="tip f-14 color-999 text-center">扫一扫上面的二维码图案，加入中国社会扶贫网</p>
      </div>
    </div>
    <!-- 复制成功弹窗 -->
    <div v-show="CopyShow" class="CopySucess">
      <p>复制成功</p>
    </div>
    <!-- 底部分享 -->
    <div class="fix-bottom bg-ffffff">
      <p
        @click="toShare()"
        class="f-20 dis-block text-center color-orange"
        style="height:53px;line-height:53px"
      >邀请</p>
      <!-- <share ref="sharea" :vos="vos"></share> -->
    </div>
  </div>
</template>


<script>
import { XHeader, Group, Cell } from "vux";
import { mapActions } from "vuex";
import QRCode from "qrcodejs2";
import avatar from "../../../../components/util/avatar";
// import share from "@/components/share/share";
  import shareUrlParamsFilter from '@/util/filter.js';
components: {
  QRCode: QRCode;
}
export default {
  name: "inviteMine",
  components: { XHeader, Group, Cell, avatar },
  data() {
    return {
      CopyShow: false,
      isDisable: false,
      NumCode: "00000000",
      wxURL: "https://wx.fpmai.com/m/index.html#/inviteislog?NumCode=",
      DefaultUserIcon: require("../../../../common/images/photo_default.jpg"),
      vos: {},
      inviteCount: 10,
      area_t: "",
      provName: "",
      cityName: "",
      countryName: "",
      countyName: "",
      villageName: ""
    };
  },
  created() {
        this.getInviteCode();
    this.getInviteCount();
   // this.getUser();
  
  },
  mounted() {
  
     this.CreateCode(this.NumCode);
  },
  computed: {
    visitnum: function() {
      return this.$store.state.visilist.length;
    },
    usericon: function() {
      if (
        this.$store.state.user &&
        JSON.stringify(this.$store.state.user) !== "{}"
      ) {
        if (this.$store.state.user.user_pic !== null) {
          return this.$store.state.user.user_pic;
        } else {
          return this.DefaultUserIcon;
        }
      }
    },
    nickname: function() {
      return this.$store.state.user.nick_name;
    },
    area: function() {
      return (
        this.provName +
        this.cityName +
        this.countyName +
        this.countryName +
        this.villageName
      );
    },
    organ_name: function() {
      return this.$store.state.user.org_name;
    }
  },
  methods: {
    ...mapActions(["getUser"]),
  getUser() {
   this.$store.dispatch("getUser", this);
    },
    // ...mapActions(["getInviteList"]),
    // getInviteList(){
    //   this.$store.dispatch("getInviteList",this)
    // },
    getInviteCount() {
      let self = this;
      this.$http
        .post("uts/invitationCode/getInviteCount", {
          userId: this.$store.state.user.id
        })
        .then(res => {
          if (res.code == "UTSI0000") {
            self.inviteCount = res.data;
          }
        });
    },
   async getInviteCode() {
      let self = this;
    
     await this.$http
        .post("uts/invitationCode/getDefaultQrCode", {
          userId: this.$store.state.user.id
        })
        .then(res => {
          if (res.code == "UTSI0000") {
            if (res.data == null) {
              self.$router.replace({
                path: "/inviteType",
                query: { rfrom: "inviteCode" }
              });
            } else {
              self.vos.title = "我的邀请码";
              self.vos.desc = "分享邀请码，让更多人来贡献爱心吧";
              self.vos.link =
                self.WinXinHost + "#/inviteShare?NumCode=" + res.data.userCode;
              self.vos.imgUrl = "../../../../static/appimg/share_icon.png";
              self.vos.demandId = "";
              if (self.isWeixinCient()) {
                self.setWeixinConfig(self.vos);
              }
              self.NumCode = res.data.userCode;
             
              self.getAreaCode(res.data);
              switch (res.data.qrType) {
                case 0:
                  self.area_t = "所在区域:";
                  break;
                case 1:
                  self.area_t = "任职区域:";
                  break;
                case 2:
                  self.area_t = "所在企业:";
                  break;
                default:
                  break;
              }
            }
          }
        });
    },
    getAreaCode(item) {
      this.getAreaName(item.userProvince, "province");
      this.getAreaName(item.userCity, "city");
      if (item.userVillage == null || item.userVillage == item.userCountry) {
        if (item.userCountry == null || item.userCountry == item.userCounty) {
          if (item.userCounty == null || item.userCounty == item.userCity) {
          } else {
            this.getAreaName(item.userCounty, "county");
          }
        } else {
          this.getAreaName(item.userCounty, "county");
          this.getAreaName(item.userCountry, "country");
        }
      } else {
        this.getAreaName(item.userCounty, "county");
        this.getAreaName(item.userCountry, "country");
        this.getAreaName(item.userVillage, "village");
      }
    },
    getAreaName(areacode, name) {
      let self = this;
      this.$http
        .post("eai/authRegion/selectRegionDate", { code: areacode })
        .then(res => {
          switch (name) {
            case "province":
              self.provName = res.data.regionName;
              break;
            case "city":
              self.cityName = res.data.regionName;
              break;
            case "county":
              self.countyName = res.data.regionName;
              break;
            case "country":
              self.countryName = res.data.regionName;
              break;
            case "village":
              self.villageName = res.data.regionName;
              break;
            default:
              break;
          }
        });
    },
    Copy: function(val) {
      let this_ = this;
      this.$copyText(val).then(
        function(e) {
          this_.isDisable = true;
          this_.CopyShow = true;
          setTimeout(function() {
            this_.CopyShow = false;
            this_.isDisable = false;
          }, 3000);
        },
        function(e) {}
      );
    },
    CreateCode: function(ss) {
      let self = this;
      let qrcode = new QRCode("qrCode", {
        width: 165,
        height: 165, // 高度
        text: self.wxURL + ss, // 二维码内容
        // render: 'table', // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
        colorDark: "#000",
        colorLight: "#f6f6f6"
      });
    },
    toShare() {
      if (this.isWeixinCient()) {
        alert('点击右上角"...",分享给朋友或朋友圈，让更多的人帮助TA');
      } else if (this.isapp()) {
           let shareTitle1 = this.vos.title;
      let shareContent1 = this.vos.desc;
      if(shareContent1.length>100){
        shareContent1 = shareContent1.substr(0,100);
      }
      let shareUrl = shareUrlParamsFilter(this.vos.link)
      let downloadImg = this.vos.imgUrl;
      let url = shareUrl;
      let shareInfo = '{"picurl":"' + this.H5PAY_URL + '/appia630/images/helpRecord/offline_share.jpg","title":"' + shareTitle1 + '","text":"' + shareContent1 + '","type":"' + 6 + '","url":"' + url + '","ischange":' + '"2"' + '}'
       window.share.getShareDetailView(shareInfo);
      } else {
        this.showToast("", "text", "网页上无法分享，请使用APP或微信");
      }
    },
    toCodeL() {
      this.$router.push("/inviteCode");
    },
    backTo() {
      this.$router.push("/user");
    }
  }
};
</script>

<style scoped>
/*group去掉边线*/

.group-clearbd >>> .weui-cells {
  margin-top: 0;
  background: transparent;
}

.group-clearbd >>> .weui-cells:before,
.group-clearbd >>> .weui-cells:after {
  border: 0 none;
}

.group-clearbd >>> .weui-cells {
  /*margin-top: 12px*/
}

.weui-cell,
.vux-cell-box >>> .weui-cell {
  padding: 14px 15px;
}

.weui-cell:before {
  left: 0;
}

.weui-cell >>> input {
  color: #999;
  font-size: 15px;
}

.weui-cell >>> .weui-cell__ft {
  font-size: 14px;
  padding-right: 0;
}

.weui-cell.vux-tap-active >>> .weui-cell__ft {
  padding-right: 18px;
}

.weui-cell_access >>> .weui-cell__ft:after {
  margin-top: -3px;
}
/*二维码图标*/
.icon-code {
  position: absolute;
  right: 33px;
}
/*文字描述*/
.myinvitecode {
  padding: 30px;
  vertical-align: middle;
}

.myinvitecode h1 {
  margin: 15px 0 0 0;
}

.myinvitecode p {
  margin-bottom: 20px;
}

.myinvitecode p.tip {
  margin-top: 20px;
}
/*底部分享按钮*/
.btm-logout {
  border-top: 1px solid #eee;
  box-shadow: 0 -1px 12px rgba(0, 0, 0, 0.15);
}
/**/
#qrCode > img {
  margin: 0 auto;
}
.CopySucess {
  position: fixed;
  bottom: 70px;
  width: 100%;
}
.CopySucess > p {
  background: rgba(0, 0, 0, 0.7);
  padding: 1px 3px;
  color: #fff;
  white-space: nowrap;
  width: 50px;
  margin: 0 auto;
}
.Inv_Num_Code {
  margin: 15px auto 0;
  width: 170px;
  height: 20px;
  line-height: 20px;
}
.Inv_Num_Code > span {
  font-size: 13px;
  font-weight: bold;
}
.Inv_Num_Code > div {
  width: 43px;
  height: 18px;
  line-height: 18px;
  border: solid 1px #666;
  border-radius: 3px;
}
</style>
