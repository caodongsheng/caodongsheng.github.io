<template>
  <div>
    <!--头部-->
    <headerBackTitleShare :headerTitle='headerTitle' :vos="vos"></headerBackTitleShare>
    <!--选择捐助金额-->
    <div style="margin: 50px 0 20px 0"></div>

    <divider>选择捐助金额</divider>
    <flexbox :gutter="0" wrap="wrap">
      <flexbox-item style="margin:3%!important;" :span="41/150 " v-for="items in navList" :key="items.text">
        <div class="flex-demo" :class="{active:items.isActive}" @click="activeFun(items)">{{items.text}}</div>
      </flexbox-item>
    </flexbox>
    <div class="weui-cell__bda">
      <x-input style="" title="" placeholder="输入自定义金额" onkeypress="return event.keyCode>=48&&event.keyCode<=57"
               ng-pattern="/[^a-zA-Z]/"></x-input>
    </div>
    <!--我要留言-匿名支付-->
    <x-switch :title="('我要留言')" :value-map="['0', '1']" v-model="stringValue0"></x-switch>
    <x-switch :title="('匿名支付')" :value-map="['0', '1']" v-model="stringValue1"></x-switch>

    <!--提交-->
    <div style="margin-top: 50px"></div>
    <divider>我已阅读并同意（用户协议）</divider>
    <x-button type="primary">立即支付</x-button>


  </div>
</template>

<script>
import { Flexbox, FlexboxItem, Divider, XInput, XButton, XSwitch } from "vux";
import headerBackTitleShare from "../../../../components/header/headerBackTitleShare";
export default {
  components: {
    Flexbox,
    FlexboxItem,
    Divider,
    XInput,
    XButton,
    XSwitch,
    headerBackTitleShare
  },
  data() {
    return {
      headerTitle: "项目详情",
      stringValue0: "0",
      stringValue1: "1",
      navList: [
        { text: "¥10", isActive: true },
        { text: "¥20", isActive: false },
        { text: "¥50", isActive: false },
        { text: "¥100", isActive: false },
        { text: "¥200", isActive: false },
        { text: "¥500", isActive: false }
      ],
      vos:{}
    };
  },
  methods: {
    activeFun: function(data) {
      this.navList.forEach(function(obj) {
        obj.isActive = false;
      });
      data.isActive = !data.isActive;
    }
  },
   mounted(){
      this.vos.title = "一起来帮助他吧"
        this.vos.desc = "分享捐助链接，让更多人来帮扶他"
        this.vos.link = this.WinXinHost + '#' + location.href.split('#')[1]
        this.vos.imgUrl = "../../../../../../static/appimg/share_icon.png"
        this.vos.demandId = ""
  }
};
</script>

<style scoped>
.top-header {
  z-index: 1;
  width: 100%;
  background-color: #fff;
  display: table;
  position: relative;
}

.top-header .icona {
  width: 8.5%;
  float: left;
  position: absolute;
  top: 10px;
  left: 5px;
  vertical-align: middle;
}

/*只能添加图标*/
.top-header h3 {
  text-align: center;
  font-size: 1.9em;
  color: #333;
  display: table-cell;
  font-weight: normal;
  text-align: center;
  padding: 0.2em 0;
}

.top-header .iconb {
  width: 11%;
  position: absolute;
  top: 10px;
  right: 5px;
  vertical-align: middle;
}

/*只能添加图标*/

.flex-demo {
  text-align: center;
  border: 1px solid #ec0115;
  border-radius: 20px;
  height: 44px;
  line-height: 44px;
}

.flex-demo.active {
  background-color: #f9a549;
}

.vux-flexbox-item {
  margin: 3% !important;
}

.weui-cell__bda {
  border: 1px solid #ec0115;
  border-radius: 20px;
  width: 85%;
  margin: 0 auto;
  margin-top: 15px;
  margin-bottom: 15px;
}

.weui-input {
  padding: 15px;
}

.weui-btn_primary {
  background-color: #ff8326 !important;
}

.weui-btn {
  width: 70% !important;
}
</style>
