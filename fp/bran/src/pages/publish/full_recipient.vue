<template>
  <div>
    <x-header :left-options="{backText: '',preventGoBack:true}" @on-click-back="confirmBack">发布需求</x-header>
    <div class="fullrecipient box-withheader over-auto">
      <div class="content">
        <div class="tip">
          <div>请填写贫困户的个人信息，自动保存记录</div>
          <div class="btn-view">
            <div :class="chooseTab === 1?'active':''" @click="chooseSelf" v-if="userType !=='' && userType.indexOf('管理员') == -1">本人</div>
            <div :class="chooseTab === 2?'active':''" @click="chooseAidedPerson('my')">我的受助人</div>
            <div :class="chooseTab === 3?'active':''" @click="chooseAidedPerson('all')" v-if="userType !=='' && userType.indexOf('管理员') != -1">管辖区受助人</div>
          </div>
        </div>
        <div class="item">
          <x-input
          @on-focus="inputFocus" 
            @on-blur="authenticate"
            title="受助人姓名"
            :is-type="checkName" :required="true"
            :min="2"
            :max="20"
            placeholder="请输入受助人姓名"
            v-model.trim="aided_person_name"
            :disabled="nameAndIdcardReadOnly"
          ></x-input>
        </div>
        <div class="item">
          <x-input
            @on-focus="inputFocus"
            @on-blur="authenticate"
            title="身份证号"
            :is-type="checkIdCard"
            :required="true"
            placeholder="请输入受助人身份证号"
            v-model.trim="idcard"
            :disabled="nameAndIdcardReadOnly"
           
          ></x-input>
        </div>
        <div class="item">
          <x-input
            @on-focus="inputFocus"
            title="联系方式"
            placeholder="请输入11位手机号码"
          
            v-model.trim="aided_person_tel"
            @on-blur="checkPhone"
             keyboard="number" :max="11"></x-input>
         
        </div>
        <div class="address item">
          <my-address
            :readonly="addressReadOnly"
            @hidePicker="hidePicker"
            v-model="addressvalue"
            :controlnum="5"
            ref="region_name"
            title="所在地"
            placeholder="自动匹配"
          ></my-address>
        </div>
        <div class="item">
          <popup-picker
            title="与您的关系"
            value-text-align="left"
            :required="true"
            :data="relationlist"
            :columns="1"
            show-name
            v-model="relationvalue"
            :disabled="relationReadOnly"
          ></popup-picker>
        </div>
      </div>
      <div class="btn">
        <div @click="goNext" class="btn-orange-lg">下一步</div>
      </div>
    </div>
        <!--关闭需求弹窗-->
    <div v-transfer-dom>
      <confirm
        v-model="showconfirm"
        title
        confirm-text="继续编辑"
        cancel-text="放弃编辑"
        @on-confirm="continueEdit()"
        @on-cancel="onCancel()"
        style="height:auto;overflow: auto"
      >
        <p style="text-align:center;">此时返回，已编辑的内容会丢失，建议您继续完成编辑</p>
      </confirm>
    </div>
  </div>
</template>

<script>
import * as types from "../../store/mutation-types.js";
  import {checkPhoneStr,checkNameStr,checkIDCardStr} from '@/util/validFun.js';

import { Base64 } from "js-base64";
import {
  XHeader,
  XInput,
  ViewBox,
  PopupPicker,
  XButton,
  XNumber,
  ChinaAddressData,
  XAddress,
  XTextarea,
  XSwitch,
  Confirm,
  TransferDom
} from "vux";
import MyAddress from "../../components/util/myaddressnew3";
import { mapState } from "vuex";

export default {
  name: "fullrecipient",
  directives: {
    TransferDom
  },
  components: {
    XHeader,
    ViewBox,
    XInput,
    PopupPicker,
    XAddress,
    XButton,
    XNumber,
    XTextarea,
    XSwitch,
    MyAddress,
    Confirm
  },
  beforeRouteLeave(to, from, next) {
    if (!to.path.includes("goPublish")) {
      this.$store.commit(types.SET_AIDEDPERSON_DATA, null);
    }
    next();
  },
  data() {
    return {
      timer:null,
      namefail:true,
      relationlist: [],
      addressData: ChinaAddressData,
      canValid: false, // 渲染前不可校验
      addresstitle: "所在地",
      region_name: "",
      province_region_id: "",
      city_region_id: "",
      county_region_id: "",
      village_region_id: "",
      hamlet_region_id: "",
      user_type: "",
      relationvalue: [],
      addressvalue: [],
      callbackobj: null,
      idcard: "",
      aided_person_name: "",
      page: 1,
      aided_person_tel: "",
      verified: false,
      helpId: "",
      nameAndIdcardReadOnly: false,
      addressReadOnly: true,
      userIdCard: "",
      relationReadOnly: false,
      isOneself: "",
      phonefail:true,
      idcardfail:true,
      showconfirm: false,
      isappback:false,
      userType: '',
      chooseTab: 0
    };
  },
  // 模板渲染成html前调用
  created() {
    this.relationlist = this.alljson.recipients;
    this.userType = this.$store.state.user.userType;
  },
  mounted() {
    this.canValid = true; // 渲染后可校验
    this.callbackobj = this.deepCopy(this.aidpersondata);
  },
  watch: {
    userTypes(v,n){
      if(v!=n ){
        console.log(v,'--',n)
        this.userType = v;
      }
    },
    aided_person_tel(val){
      this.$nextTick(() => {
          this.aided_person_tel = val.replace(/[^0-9]/g,'')
       
        })
    },
 idcard(val){
        this.$nextTick(() => {
          this.idcard = val.replace(/[^\a-\z\A-\Z0-9]/g,'')
       
        })
    },
    callbackobj(value) {
      if (value) {
        this.chooseTab = this.$store.state.fullrecipientChooseTab;
        this.nameAndIdcardReadOnly = true;
        this.verified = true;
        /*
        判断是否我的受助人 
          1.是: 调用assignData方法，
          2.否则为管辖区域受助人，调用assignJurisdictionData方法
        */
        if(this.chooseTab === 2) {
          this.assignData(value);
        }else {
          this.assignJurisdictionData(value)
        }
        if (value.relation_id&&value.relation_id !== "") {
          // 如果过来的受助人关系已存在，不允许修改
          this.relationReadOnly = true;
        }
      }
    },
    region_name(value) {
      let arr = [];
      if (!value) return arr;
      else {
        let provinceobj = {};
        let cityobj = {};
        let districtobj = {};
        let townobj = {};
        let villageobj = {};
        let addressarr = value.split(" ");
        if (addressarr.length > 4) {
          villageobj.regionName = addressarr[4];
          villageobj.id = this.hamlet_region_id;
          arr.push(villageobj);
        }
        if (addressarr.length > 3) {
          townobj.regionName = addressarr[3];
          townobj.id = this.village_region_id;
          arr.push(townobj);
        }
        if (addressarr.length > 2) {
          districtobj.regionName = addressarr[2];
          districtobj.id = this.county_region_id;
          arr.push(districtobj);
        }
        if (addressarr.length > 1) {
          cityobj.regionName = addressarr[1];
          cityobj.id = this.city_region_id;
          arr.push(cityobj);
        }
        if (addressarr.length > 0) {
          provinceobj.regionName = addressarr[0];
          provinceobj.id = this.province_region_id;
          arr.push(provinceobj);
        }
        this.addressvalue = arr.reverse();
      }
    }
  },
  computed: {
    ...mapState(["alljson"]),
    userTypes(){
      return this.$store.state.user.userType
    },
    aidpersondata() {
      return this.$store.state.aidpersondata;
    }
  },
   destroyed() {
     clearTimeout(this.timer);
   },
  methods: {
        /*导航返回相关操作*/
    onCancel() {
      this.$router.go(-1);
    },
    confirmBack() {
      this.showconfirm = true;
    },
    continueEdit(){
      if(this.isappback){
    history.pushState(null, null, document.URL);
      }
    },
      inputFocus() {
       clearTimeout(this.timer);
     },
    checkIdCard(value){
 let validobj =  checkIDCardStr(value,"身份证号")
      if(!validobj.valid){
            this.idcardfail = true
           
        }
        else{
           this.idcardfail = false
        
        }
        return validobj
    },
     checkphonefun(value){
         let validobj = checkPhoneStr(value,"联系方式")
        if(!validobj.valid){
            this.phonefail = true
         
            
        }
        else{
           this.phonefail = false
          
        }
          return validobj;
      },
      checkName(value) {
         let validobj = checkNameStr(value,2,15,"受助人姓名")
        if(!validobj.valid){
            this.namefail = true
            
        }
        else{
           this.namefail = false
            
        }
        return validobj;
      },
    deepCopy(data) {
      return JSON.parse(JSON.stringify(data));
    },
    checkPhone() {
        this.timer = setTimeout(() => {
        const scrollHeight =
          document.documentElement.scrollTop || document.body.scrollTop || 0;
        window.scrollTo(0, Math.max(scrollHeight - 1, 0));
      }, 100);
      // if(!this.verified) return;
         let validobj = checkPhoneStr(this.aided_person_tel,"联系方式")
        if(!validobj.valid){
            this.phonefail = true
            this.showToast('','text',validobj.msg,'20em','','middle');
        }
        else{
           this.phonefail = false
        }
       
    },
    /*选择受助人*/
    chooseAidedPerson(type) {
      this.chooseTab = type === 'my' ? 2 : 3; 
      this.relationvalue = [];
      this.relationReadOnly = false;
      this.$store.state.fullrecipientChooseTab = this.chooseTab;
      this.$router.push({
        name: "aidedperson",
        params: {
          pathName: "fullrecipient",
        },
        query:{
          aidedpersonType: type
        }
      });
    },
    /*选择本人*/
    chooseSelf() {
      /*
        1.获取本人信息，将姓名（realname）、身份证号放入放到对应数据中
        2.调用失去焦点后调用的方法，进行身份认证，取认证数据的所在地信息及手机号 放到对应数据中
        3.若认证数据中手机号不存在，取本人账户信息的手机号
       */
      const userInfo = this.$store.state.user;
      this.relationvalue = [];
      this.relationReadOnly = false;
      this.nameAndIdcardReadOnly = false;
      // 显示点击颜色
      this.chooseTab = 1;
      this.$store.state.fullrecipientChooseTab = this.chooseTab;
      this.assignSelfData(userInfo)
    },
    /*实名认证*/
    async authenticate() {
      this.timer = setTimeout(() => {
        const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
        window.scrollTo(0, Math.max(scrollHeight - 1, 0));
      }, 100);
      if(this.namefail||this.idcardfail) return;
      if (this.aided_person_name && this.idcard) {
        let res;
        try {
          res = await this.$http.post(
            "hts/demand/archivingCardAndAuthentication",
            {
              name: this.aided_person_name,
              idCard: this.idcard
            }
          );
        } catch (err) {
          if (err.code === "O3000") {
            this.showToast(
              "",
              "text",
              "身份证号输入有误",
              "20em",
              "",
              "middle"
            );
            this.idcard = "";
            return;
          }
          if (err.code === "03011") {
            this.showToast(
              "",
              "text",
              "实名认证失败，请重新输入，您还有" + err.data + "次机会"
            );
            this.aided_person_name = "";
            this.idcard = "";
            return;
          }
          if (err.code === "03017") {
            this.showToast(
              "",
              "text",
              "实名认证超过日次数，请12个小时以后重试"
            );
            this.aided_person_name = "";
            this.idcard = "";
            return;
          } else {
            this.showToast("", "text", "实名认证失败", "20em", "", "top");
          }
          return false;
        }
        if(res.data.userleavel != 0){
          this.showToast("", "text", "受助人不是建档立卡贫困户", "20em", "", "top");
          return false;
        }
        this.assignData(res.data);
        if (res.data.relation_id != null) {
          this.relationReadOnly = true;
        }

        this.isOneself = res.data.isOneself;
        this.verified = true;
        //   this.nameAndIdcardReadOnly = true
        if (!this.region_name) {
          this.addressReadOnly = false;
        }
        if (this.isOneself) {
          this.relationvalue[0] = "01";
          this.relationReadOnly = true;
        }
      }
    },

    /*点击下一步*/
    async goNext() {
      if (this.namefail) {
        this.showToast("", "text", "请输入正确的姓名！", "20em", "", "middle");
        return;
      }
      if (this.idcardfail) {
        this.showToast("", "text", "请检查身份证号是否输入正确！");
        return;
      }
      /*if (!this.aided_person_tel) {
        this.showToast("", "text", "手机号不能为空", "20em", "", "middle");
        return;
      } else if (this.aided_person_tel.length !== 11) {
        this.showToast("", "text", "手机号输入有误", "20em", "", "middle");
        return;
      }*/
      // if(this.aided_person_tel == null){
      //   this.showToast("", "text", "联系方式不能为空");
      // }else{
      //   this.checkPhone(this.aided_person_tel)
      // }
      this.checkPhone(this.aided_person_tel)

      // var validobj = checkPhoneStr(this.aided_person_tel,"联系方式")
      // if(!validobj.valid){
      //   // this.checkPhone(this.aided_person_tel)
      //   this.showToast('','text',validobj.msg,'20em','','middle');
      // }
      if(this.phonefail){
        // this.showToast("", "text", "请输入正确手机号码！", "20em", "", "middle");
        console.log(this.phonefail);
        return;
      }
      if (this.addressvalue.length === 0) {
        this.showToast("", "text", "地址不能为空", "20em", "", "middle");
        return;
      }

      if (!this.relationvalue[0]) {
        this.showToast("", "text", "与您的关系不能为空", "20em", "", "middle");
        return;
      }

      let arg = {};
      arg.user_type = this.user_type;
      arg.helpId = this.helpId;
      arg.province_region_id = this.province_region_id;
      arg.city_region_id = this.city_region_id;
      arg.county_region_id = this.county_region_id;
      arg.village_region_id = this.village_region_id;
      arg.hamlet_region_id = this.hamlet_region_id;
      arg.region_name = this.region_name;
      arg.aided_person_tel = this.aided_person_tel;
      arg.relation_id = this.relationvalue[0];
      arg.user_type = this.user_type;
      if (this.verified) {
        try {
          await this.$http.post("hts/demand/updateUserHelp", arg);
          this.$store.commit(types.SET_AIDEDPERSON_DATA, arg);
          this.$router.push("goPublish");
        } catch (err) {
          if (err.code === "03007") {
            this.showToast(
              "",
              "text",
              "此受助人已有5个需求正在帮扶中，暂时不能发布！"
            );
          } else {
            if (err.msg) this.showToast("", "text", err.msg, "20em", "", "top");
          }
        }
      }
    },
    hidePicker() {
      // 点击城市确定的回调
      this.$refs.region_name.show = false;
      let arr = [];
      if (this.addressvalue.length > 4) {
        this.hamlet_region_id = this.addressvalue[4].id;
        arr.push(this.addressvalue[4].regionName);
      }
      if (this.addressvalue.length > 3) {
        this.village_region_id = this.addressvalue[3].id;
        arr.push(this.addressvalue[3].regionName);
      }
      if (this.addressvalue.length > 2) {
        this.county_region_id = this.addressvalue[2].id;
        arr.push(this.addressvalue[2].regionName);
      }
      if (this.addressvalue.length > 1) {
        this.city_region_id = this.addressvalue[1].id;
        arr.push(this.addressvalue[1].regionName);
      }
      if (this.addressvalue.length > 0) {
        this.province_region_id = this.addressvalue[0].id;
        arr.push(this.addressvalue[0].regionName);
      }
      this.region_name = arr.reverse().join(" ");
    },

    getAddressId(index) {
      return this.addressvalue[index].id;
    },
    confirmFun() {
      this.$refs.region_name.show = false;
    },
    assignData(value) {
      this.helpId = value.id || value.helpId;
      this.aided_person_name = value.aided_person_name;
      this.idcard = value.idcard;
      /*本人：认证接口返回的参数无手机号时，取本人账户信息中的手机号*/
      if(!value.aided_person_tel && this.chooseTab === 1){
        this.aided_person_tel = this.$store.state.user.mobile;
      }else if(!value.aided_person_tel && this.chooseTab === 3) {
        // 管辖区受助人： 认证接口的手机号不存在，输入框显示管辖区受助人列表接口中的手机号。
        // 列表数据接受方法已经赋值手机号,故不没有赋值逻辑
        this.aided_person_tel = value.aided_person_tel ? value.aided_person_tel : '';
      }else{
        this.aided_person_tel = value.aided_person_tel ? value.aided_person_tel : '';
      }

      this.region_name = value.region_name;
      this.province_region_id = value.province_region_id;
      this.city_region_id = value.city_region_id;
      this.county_region_id = value.county_region_id;
      this.village_region_id = value.village_region_id;
      this.hamlet_region_id = value.hamlet_region_id;
      if(value.relation_id) {
        let arr = this.alljson.recipients.find(item =>
          item.value === value.relation_id|| item.name ===  value.relation_id
        )
        this.relationvalue[0] = arr.value;
      }

      this.user_type = value.user_type;
      this.phonefail = false;
      this.namefail = false;
      this.idcardfail = false;
      console.log(value,this.relationvalue,'assignData')
    },
    // 账号个人信息放置到输入框内
    assignSelfData(value) {
      // this.helpId = value.id;
      this.aided_person_name = value.realname;
      this.idcard = value.idcard;
      this.relationvalue[0] = "01"; //与您的关系显示 本人
      this.relationReadOnly = true;

      this.user_type = 1;
      this.phonefail = false;
      this.namefail = false;
      this.idcardfail = false;
      if(this.aided_person_name && this.idcard){
        this.authenticate();
      }
      // this.nameAndIdcardReadOnly = true; //姓名、身份证禁止修改
      console.log(value,this.relationvalue,'assignSelfData')
    },
    // 管辖区受助人数据放入
    assignJurisdictionData(value) {
      // this.helpId = value.id;
      this.aided_person_name = value.aided_person_name;
      this.idcard = value.idcard;
      if(value.relation_id) {
        let arr = this.alljson.recipients.find(item =>
          item.value === value.relation_id|| item.name ===  value.relation_id
        )
        this.relationvalue[0] = arr.value;
      }else {
        // 接口没返回与受助人的关系时
        this.relationvalue[0] = "12"; //与您的关系显示 管理员待发
      }
      this.user_type = value.user_type;
      this.aided_person_tel = value.aided_person_tel;
      this.phonefail = false;
      this.namefail = false;
      this.idcardfail = false;
      if(this.aided_person_name && this.idcard){
        this.authenticate();
      }
      console.log(value,this.relationvalue,'assignJurisdictionData')
    }
  }
};
</script>

<style lang="less">
@import "../../less/base.less";

.fullrecipient {
  .vux-cell-bd p {
    width: 75px;
    color: #666;
    .fs(15px);
  }
  .bg(#f6f6f6);
  .h(auto);
  .content {
    .mt(0);
    .item {
      border-bottom: 10px solid #f6f6f6;
      padding: 0.2em 0;
      .weui-cell__ft {
        height: auto;
      }
    }
    .bg(#ffffff);
    .tip {
      .color(#f37307);
      .fs(15px);
      .p2(16px, 15px);
      .bg(#f6f6f6);

      .btn-view {
        .flex();
        margin-top: 10px;
        >div {
          .color(#999999);
          .p2(4px, 10px);
          .fs(12px);
          margin-right: 5px;
          border: 1px solid #999999;
          border-radius: 4px;
          &.active {
            .color(#f37306);
            border: 1px solid #f37306;
          }
        }
      }
    }
    .address {
      .flex();
      .p2(0.2em, 0);
      .jc(space-between);
    }
  }
  .btn {
    div {
      .bg(#fd8b2b);
      .color(#ffffff);
      .p2(0.6em, 0);
      .ta(center);
      .br(2em);
      .m4(40px, 2em, 30px, 2em);
    }
  }
  .weui-cell__hd {
    .w(auto);
    .fs(15px);
    .color(#666666);
  }
  .weui-input {
    .fs(14px);
    .ta(right);
  }
  .vux-popup-picker-select {
    text-align: right !important;
  }
}
</style>
