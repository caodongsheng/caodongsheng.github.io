<template>
  <div>
    <x-header :left-options="{backText: ''}" style="border:0 none">管理员注册</x-header>
    <div class="box-withheader over-auto">
      <p class="color-orange title-text f-12">
        该注册功能只限村级和乡级扶贫干部提交注册信息,信息提交后请等待上级管理员审核
      </p>

      <div class="reg-content">
        <div class="input">
          <popup-picker title="身份选择"  :data="list" v-model="identity" value-text-align="right" @on-hide="onhide"></popup-picker>
        </div>
        <div>
          <div class="input">
            <x-input title="真实姓名" text-align="right" placeholder="请输入姓名" v-model="name" :is-type="checkName" :required="true">
            </x-input>
          </div>
          <div class="input">

            <!-- <x-input title="身份证" text-align='right' placeholder="请输入身份证" v-model="idcard" > -->

            <!-- <x-input title="身份证" text-align='right' placeholder="请输入身份证" v-model="idcard"> -->

            <x-input title="身份证号" text-align='right' :min="15" :max="18"  placeholder="请输入身份证" v-model="idcard" :is-type="checkIDCard" :required="true"  >

            </x-input>
          </div>
        </div>

        <!-- <group>
          <x-input title="负责区域" placeholder="请选择负责区域"  @on-focus="chooseArea" ref="area">
          </x-input>
        </group> -->
        <div class="myaddress">
          <div class="input">
            <div class="ipt">
              <my-address :readonly="addressReadOnly"
                          @hidePicker="hidePicker"
                          v-model="addressvalue"
                          :controlnum = num
                          ref="region_name"
                          title="负责区域"
                          placeholder="请选择负责区域" >
              </my-address>
            </div>
          </div>
        </div>
        <x-button class="btn-orange-lg" type="primary" action-type="button" @click.native="saveInputValue">下一步</x-button>
      </div>

      <!--报错弹窗-->
      <alert v-model="errorShow" :title="errorDialogTitle"> {{errorDialogContent}}</alert>
    </div>
  </div>
</template>

<script>
  import {
    Group,
    Cell,
    XInput,
    XButton,
    XHeader,
    Alert,
    Divider,
    PopupPicker
  } from "vux";
  import adminReg2 from "./adminReg2";
  import MyAddress from "../../components/util/myaddressnew3";
  import {checkNameStr,checkIDCardStr} from '@/util/validFun.js';

  export default {
    components: {
      Group,
      Cell,
      XInput,
      XButton,
      XHeader,
      MyAddress,
      Alert,
      Divider,
      PopupPicker,
      adminReg2
    },
    data() {
      return {
        idcardfail:true,
        namefail:true,
        errorDialogTitle: "友情提示", // 报错题目
        errorDialogContent: "", // 报错信息
        errorShow: false,
        list: [["乡级管理员", "村级管理员"]],
        identity: ['村级管理员'], // 身份选择
        name: "", // 姓名
        idcard: "", // 身份证号
        addressvalue: [],
        num: 5,
       // address: "",
        provinceid: "",
        cityid: "",
        districtid: "",
        townid: "",
        villageid: "",
        callbackobj: null,
        value: [],
        region_id: [],
        // is_cadre: "",
        // is_certification: "",
        addressReadOnly: false
        // territory: '山东济南' // 负责区域
      };
    },
    methods: {
      // 提交
        saveInputValue() {
            if(this.namefail){
               this.errorShow = true;
                this.errorDialogContent = checkNameStr(this.name,2,15,"您的姓名").msg
                return;
            }
            if(this.idcardfail){
               this.errorShow = true;
                this.errorDialogContent = checkIDCardStr(this.idcard,"身份证号").msg
                return;
            }

           
            if(this.addressvalue.length == 0) {
                this.errorShow = true;
                this.errorDialogContent = '请选择您的负责区域';
                return;
            }
            let identityID = null;
        if (this.identity[0] == "乡级管理员") {
          identityID = "4";
        }
        if (this.identity[0] == "村级管理员") {
          identityID = "5";
        }
        var storage = window.localStorage;
        this.$router.push({name: 'adminReg2'});
        this.L('identityID', identityID);
        this.L('name', this.name)
        this.L('idcard',this.idcard);
      },
      checkName(value) {
           let validobj = checkNameStr(value,2,15,"您的姓名")
        if(!validobj.valid){
            this.namefail = true
            
        }
        else{
           this.namefail = false
            
        }
        return validobj;
      },
      // chooseArea() {
      //   this.$refs.address.show = true;
      // },
      onhide(type) {
        let identityID = null;
        if (this.identity[0] === "乡级管理员") {
          identityID = "4";
          this.num = 4;
          let arr = [];
          this.addressvalue = "";
          this.$refs.region_name.innerHTML = "请选择负责区域";
          if (this.addressvalue.length > 3) {
            this.townid = this.addressvalue[3].id;
            arr.push(this.addressvalue[3].regionName);
          }
          if (this.addressvalue.length > 2) {
            this.districtid = this.addressvalue[2].id;
            arr.push(this.addressvalue[2].regionName);
          }
          if (this.addressvalue.length > 1) {
            this.cityid = this.addressvalue[1].id;
            arr.push(this.addressvalue[1].regionName);
          }
          if (this.addressvalue[0] > 0) {
            this.provinceid = this.addressvalue[0].id;
            arr.push(this.addressvalue[0].regionName);
          }
          //this.address = arr.reverse().join("");
        }
        if (this.identity[0] === "村级管理员") {
          identityID = "5";
          this.num = 5;
          this.addressvalue = "";
          this.$refs.region_name.innerHTML = "请选择负责区域";
        }
        if (type === true) {
          let storage = window.localStorage;
          storage.setItem("identity", this.identity[0]); // 管理员级别
          storage.setItem("identityID", identityID); // 管理员区域id
        } else {

        }
      },
      hidePicker() {
        //点击确定按钮后的回调
        this.$refs.region_name.show = false;
        let arr = [];
        let idarr = []
        //获取用户选择城市列表的长度判断用户选择的具体级别列表(省 市 县 乡 村)
        if (this.addressvalue.length > 4) {
          this.hamlet_region_id = this.addressvalue[4].id;
          arr.push(this.addressvalue[4].regionName);
          idarr.push(this.addressvalue[4].id);
        }
        if (this.addressvalue.length > 3) {
          this.village_region_id = this.addressvalue[3].id;
          arr.push(this.addressvalue[3].regionName);
           idarr.push(this.addressvalue[3].id);
        }
        if (this.addressvalue.length > 2) {
          this.county_region_id = this.addressvalue[2].id;
          arr.push(this.addressvalue[2].regionName);
           idarr.push(this.addressvalue[2].id);
        }
        if (this.addressvalue.length > 1) {
          this.city_region_id = this.addressvalue[1].id;
          arr.push(this.addressvalue[1].regionName);
          idarr.push(this.addressvalue[1].id);
        }
        if (this.addressvalue.length > 0) {
          this.province_region_id = this.addressvalue[0].id;
          arr.push(this.addressvalue[0].regionName);
           idarr.push(this.addressvalue[0].id);
        }
      
        this.region_name = arr.reverse().join(" ");
        let region_ids = idarr.reverse().join(" ");
        localStorage.setItem("territory", this.region_name);
        localStorage.setItem(
          "territoryId",
         region_ids
        );
      },
      checkIDCard(value) {
          let validobj =  checkIDCardStr(value,"身份证号")
      if(!validobj.valid){
            this.idcardfail = true
            
        }
        else{
           this.idcardfail = false
        }
        return validobj  
      }
      //
    },
    watch: {
       idcard(val){
        this.$nextTick(() => {
          this.idcard = val.replace(/[^\a-\z\A-\Z0-9]/g,'')
       
        })
    },
      callbackobj: function(value) {
        if (value) {
          this.addressReadOnly = true;
          this.region_name = value.region_name;
          this.province_region_id = value.province_region_id;
          this.city_region_id = value.city_region_id;
          this.county_region_id = value.county_region_id;
          this.village_region_id = value.village_region_id;
          this.hamlet_region_id = value.hamlet_region_id;
        }
      },
      region_name: function(value) {
        let arr = [];
        if (value == "") return arr;
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
    created() {
    //   this.is_cadre = this.$store.state.user.is_cadre;
    //   this.is_certification = this.$store.state.user.is_certification;
    }
  };
</script>

<style lang="" scoped>
  .weui-cell,
  .vux-cell-box >>> .weui-cell {
    padding: 0 0;
  }
  .weui-cell>>> label {
      font-size: 15px;
  }
  .input >>> .weui-cell {
    padding: 0 0;
  }
  .input >>> .vux-label {
    width: 78px;
  }
  .weui-cell >>> .weui-label,
  .vux-cell-box >>> .weui-label {
    font-size: 15px;
  }
  .btn-orange-lg {
    margin-top: 40px;
    margin-bottom: 30px;
  }
  .vux-cell-box >>> .weui-cell__ft {
    padding-right: 18px;
    color: #999;
  }

  .vux-popup-header-right {
    color: #000000 !important;
  }

  .weui-cell__hd {
    width: 30% !important;
  }
  .myaddress {
    width: 100%;
  }
  .myaddress .plmsg {
    color: #999;
    flex: 1;
    font-size: 10px;
    padding-top: 3px;
  }
  .input {
    border-bottom: 1px solid #d9d9d9;
    margin: 0 30px;
    padding: 20px 0;
  }
  .input .ipt {
    padding-left: 0;
    display: flex;
  }
  button.weui-btn,
  input.weui-btn {
    width: 80%;
  }
  .title-text {
    margin: 0 30px;
    padding-top: 30px;
  }
  .weui-cell .weui-cell__bd .weui-input {
    padding-left: 20px;
  }
</style>
