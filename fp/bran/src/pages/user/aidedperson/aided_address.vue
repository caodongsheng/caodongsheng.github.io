<template>
  <div>
    <x-header :left-options="{backText: ''}">
      地址管理
      <a slot="right" class="color-orange f-16" @click="saveaddressinfo()">保存</a>
    </x-header>
    <div class="box-withheader over-auto bg-f6f5f6">
      <group class="group-clearbd mt-12" label-width="5.5em">
        <x-input title="收件人" v-model="getLinkMan" readonly></x-input>
        <x-input
          title="手机号码"
          v-model="getLinkTel"
          placehilder="请输入11位手机号"
          type="tel"
          class="border-bottom-1px"
          readonly
        ></x-input>
        <!-- <cell title="所在地区" value-align="left">
           <span class="color-999">湖南省永州市永州县永州乡镇永州村</span>
        </cell>-->
        <my-address
          title="所在地"
          :readonly="false"
          placeholder="受助人收货地址"
          @confirmAction="confirmFun"
          @hidePicker="hidePicker"
          v-model="addressvalue"
          ref="address"
        ></my-address>
        <cell title="详细地址" align-items="flex-start" primary="content">
          <x-textarea
            placeholder="请输入详细地址信息，如街道、门牌号等"
            v-model="detailAddr"
            :min="4"
            :max="50"
            @on-focus="inputFocus"
            @on-blur="inputFocusout"
            :class="getClass"
          ></x-textarea>
        </cell>
        <x-input
          title="邮编"
          v-model="postcode"
          placeholder="请输入6位邮编"
          :required="true"
          :is-type="checkCode"
          :min="3"
          :max="12"
          @on-focus="inputFocus"
        ></x-input>
        <!--<cell title="是否设置为默认">-->
        <!--<check-icon :value.sync="is_default" type="plain"></check-icon>-->
        <!--</cell>-->
      </group>

      <group class="group-clearbd defaultvalue mt-12 bg-ffffff">
        <x-switch title="是否设置为默认" v-model="is_default"></x-switch>
      </group>
    </div>

    <!-- <p class="loading" style="text-align:center;" v-show="showLoading">
      <inline-loading></inline-loading>
    </p>-->
    <!-- <div class="lightBox" v-show="showPrompt"></div> -->
  </div>
</template>

<script>
import {
  XHeader,
  Group,
  Cell,
  XInput,
  XTextarea,
  CheckIcon,
  XSwitch,
  InlineLoading
} from "vux";
import MyAddress from "@/components/util/myaddressnew3";
import { mapState } from "vuex";
import { checkAddress, checkPostcardStr } from "@/util/validFun.js";
export default {
  name: "aided_address",
  components: {
    XHeader,
    Group,
    Cell,
    XInput,
    XTextarea,
    MyAddress,
    CheckIcon,
    XSwitch,
    InlineLoading
  },
  data() {
    return {
      timer: null,
      addressdetailfail: true,
      postcodefail: true,
      phonefail: true,
      userId: "",
      linkman: "",
      linkTel: "",
      detailAddr: "",
      address: "",
      provinceid: "",
      cityid: "",
      districtid: "",
      townid: "",
      villageid: "",
      postcode: "",
      type: "",
      is_default: false,
      routeFrom: "",
      isUploading: false,
      showLoading: false,
      showPrompt: false
    };
  },
  watch: {
    detailAddr(val) {
      this.$nextTick(() => {
        let pattern = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]]/;
        this.detailAddr = val.replace(pattern, "");
      });
    },
    postcode(val) {
      this.$nextTick(() => {
        this.postcode = val.replace(/[^\w\.\/]/gi, "");
      });
    }
  },
  destroyed() {
    clearTimeout(this.timer);
  },
  methods: {
    inputFocus() {
      clearTimeout(this.timer);
    },

    inputFocusout() {
      this.timer = setTimeout(() => {
        const scrollHeight =
          document.documentElement.scrollTop || document.body.scrollTop || 0;
        window.scrollTo(0, Math.max(scrollHeight - 1, 0));
      }, 100);
    },
    async getAidedPersonDetail() {
      await this.$store.dispatch("getAidedPersonDetail", this);
    },
    checkAddressFun(detailAddr) {
      let validobj = checkAddress(this.detailAddr, 4, 50, "详细地址");
      if (!validobj.valid) {
        this.addressdetailfail = true;
      } else {
        this.addressdetailfail = false;
      }
      return validobj;
    },
    checkCode(value) {
      this.inputFocusout();
      let validobj = checkPostcardStr(value, 3, 12, "邮编");
      if (!validobj.valid) {
        this.postcodefail = true;
      } else {
        this.postcodefail = false;
      }
      return validobj;
    },
    valideContent() {
      let pattern = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]]/;
      this.detailAddr = this.detailAddr.replace(pattern, "");
    },
    saveaddressinfo() {
      if (this.isUploading) {
        return;
      }
      // if (!this.linkman) {
      //   this.showToast('', 'text', '请输入收件人姓名')
      //   return
      // }else if(!/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/.test(this.linkman)) {
      //     this.showToast('','text','姓名输入有误','20em','','middle')
      // }
      if (this.address == "") {
        this.showToast("", "text", "请选择受助人所在地", "20em", "", "middle");
        return;
      }
      if (this.addressdetailfail) {
        let obj = checkAddress(this.detailAddr, 4, 50, "详细地址");
        if (!obj.valid) {
          this.showToast("", "text", obj.msg, "20em", "", "middle");
          return false;
        }
      }
      if (this.postcodefail) {
        let msg = checkPostcardStr(this.postcode, 3, 12, "邮编").msg;
        this.showToast("", "text", msg, "20em", "", "middle");
        return;
      }
      let self = this;
      let obj = {};
      obj.userId = this.userId;
      obj.linkman = this.linkman;
      obj.linkTel = this.linkTel;
      obj.detailAddr = this.detailAddr;
      obj.region_name = this.address;
      obj.province_region_id = this.provinceid;
      obj.city_region_id = this.cityid;
      obj.county_region_id = this.districtid;
      obj.village_region_id = this.townid;
      obj.hamlet_region_id = this.villageid;
      obj.postcode = this.postcode;
      obj.isDefault = this.is_default == true ? 1 : 0;
      this.isUploading = true;
      //this.showLoading=true
      this.showPrompt = true;
      if (this.type == "add") {
        this.$http
          .post("hts/poor/addressSave", obj)
          .then(function(response) {
            self.showToast("", "text", "保存成功");
            self.showLoading = false;
            self.showPrompt = false;
            let arg = { _this: self, aidedId: self.userId };
            if (self.routeFrom.includes("aideddetail")) {
              self.$router.push("/aideddetail/" + obj.userId);
            }
            if (self.routeFrom.includes("aidedAddressList")) {
              self.$store
                .dispatch("getAidederAddressList", arg)
                .then(() => {
                  self.showLoading = false;
                  self.showPrompt = false;
                  self.$router.go(-1);
                })
                .catch(err => {
                  self.showLoading = false;
                  self.showPrompt = false;
                  self.isUploading = false;
                  if (err.msg) {
                    self.showToast("", "text", err.msg);
                  }
                });
            }
            if (self.routeFrom.includes("goPublish")) {
              self.$store
                .dispatch("getAidederAddressList", arg)
                .then(() => {
                  self.$router.go(-1);
                  self.showLoading = false;
                  self.showPrompt = false;
                })
                .catch(err => {
                  self.showLoading = false;
                  self.showPrompt = false;
                  self.isUploading = false;
                  if (err.msg) self.showToast("", "text", err.msg);
                });
            }
          })
          .catch(function(error) {
            self.isUploading = false;
            self.showLoading = false;
            self.showPrompt = false;
            if (error.msg) self.showToast("", "text", error.msg);
          });
      } else {
        obj.id = this.id;
        this.$http
          .post("hts/poor/addressEdit", obj)
          .then(function(response) {
            //console.log("修改成功")
            //self.showToast('', 'text', '修改成功');
            let arg = { _this: self, aidedId: self.userId };
            if (self.routeFrom.includes("aideddetail")) {
              self.$router.push("/aideddetail/" + obj.userId);
            }
            if (self.routeFrom.includes("aidedAddressList")) {
              console.log("arg:", arg);
              self.$store
                .dispatch("getAidederAddressList", arg)
                .then(() => {
                  console.log("要跳转了");
                  self.$router.go(-1);
                })
                .catch(err => {
                  self.isUploading = false;
                  self.showLoading = false;
                  self.showPrompt = false;
                  if (err.msg) {
                    self.showToast("", "text", err.msg);
                  }
                });
            }
          })
          .catch(function(error) {
            self.isUploading = false;
            self.showLoading = false;
            self.showPrompt = false;
            if (error.msg) self.showToast("", "text", error.msg);
          });
      }
    },
    confirmFun() {
      this.$refs.address.show = false;
    },
    hidePicker() {
      this.$refs.address.show = false;
    }
  },
  created() {
    if (this.$route.params.id != "noid") {
      this.getAidedPersonDetail();
      let userinfo = this.$store.state.aidedpersondetail;
      if (userinfo.id) {
        this.userId = userinfo.id;
      } else {
        if (this.aidpersondata) {
          this.userId = this.aidpersondata.helpId;
        } else {
          this.userId = this.demandDetail.aideder_user_id;
        }
      }
    }
  },
  mounted() {
    let addressdetail = this.$store.state.addressdetail;
    console.log(addressdetail);
    if (addressdetail != null) {
      this.type = "change";
      this.id = addressdetail.id;
      this.linkman = addressdetail.linkman;
      this.detailAddr = addressdetail.detail_addr;
      this.addressdetailfail = false;
      this.postcodefail = false;
      this.address = addressdetail.region_name;
      this.linkTel = addressdetail.link_tel;
      this.provinceid = addressdetail.province_region_id;
      this.cityid = addressdetail.city_region_id;
      this.districtid = addressdetail.county_region_id;
      this.townid = addressdetail.village_region_id;
      this.villageid = addressdetail.hamlet_region_id;
      this.postcode = addressdetail.postcode;
      this.is_default = addressdetail.is_default == 1 ? true : false;
      this.phonefail = false;
    } else {
      this.type = "add";
    }
  },
  computed: {
    ...mapState(["aidpersondata", "demandDetail"]),
    aidedpersondetail: function() {
      return this.$store.state.aidedpersondetail;
    },
    getClass() {
      if (this.detailAddr.replace(/(^\s*)|(\s*$)/g, "").length < 4) {
        return "redfont";
      } else {
        return "";
      }
    },
    getLinkMan() {
      let userinfo = this.aidedpersondetail;
      let addressdetail = this.$store.state.addressdetail;
      if (this.type == "change") {
        this.linkman = addressdetail.linkman;
        return addressdetail.linkman;
      } else {
        this.linkman = userinfo.aided_person_name;
        return userinfo.aided_person_name;
      }
    },
    getLinkTel() {
      let userinfo = this.aidedpersondetail;
      let addressdetail = this.$store.state.addressdetail;
      if (this.type == "change") {
        this.linkTel = addressdetail.link_tel;
        return addressdetail.link_tel;
      } else {
        this.linkTel = userinfo.aided_person_tel;
        return userinfo.aided_person_tel;
      }
    },
    addressvalue: {
      get: function() {
        let arr = [];
        if (this.address == "") return arr;
        let provinceobj = {};
        let cityobj = {};
        let districtobj = {};
        let townobj = {};
        let villageobj = {};
        let addressarr = this.address.split(" ");
        if (addressarr.length > 4) {
          villageobj.regionName = addressarr[4];
          villageobj.id = this.villageid;
          arr.push(villageobj);
        }
        if (addressarr.length > 3) {
          townobj.regionName = addressarr[3];
          townobj.id = this.townid;
          arr.push(townobj);
        }
        if (addressarr.length > 2) {
          districtobj.regionName = addressarr[2];
          districtobj.id = this.districtid;
          arr.push(districtobj);
        }
        if (addressarr.length > 1) {
          cityobj.regionName = addressarr[1];
          cityobj.id = this.cityid;
          arr.push(cityobj);
        }
        if (addressarr.length > 0) {
          provinceobj.regionName = addressarr[0];
          provinceobj.id = this.provinceid;
          arr.push(provinceobj);
        }
        return arr.reverse();
      },
      set: function(addressarr) {
        let arr = [];
        if (addressarr.length > 4) {
          this.villageid = addressarr[4].id;
          arr.push(addressarr[4].regionName);
        }
        if (addressarr.length > 3) {
          this.townid = addressarr[3].id;
          arr.push(addressarr[3].regionName);
        }
        if (addressarr.length > 2) {
          this.districtid = addressarr[2].id;
          arr.push(addressarr[2].regionName);
        }
        if (addressarr.length > 1) {
          this.cityid = addressarr[1].id;
          arr.push(addressarr[1].regionName);
        }
        if (addressarr.length > 0) {
          this.provinceid = addressarr[0].id;
          arr.push(addressarr[0].regionName);
        }
        console.log(arr);
        this.address = arr.reverse().join(" ");
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.routeFrom = from.path;
      console.log("vm.routeFrom:", vm.routeFrom);
    });
  }
};
</script>

<style scoped>
/*group header右侧操作*/
.group-clearbd >>> .weui-cells {
  margin-top: 0 !important;
  font-size: 15px;
}
.redfont >>> span {
  color: red;
}
.group-clearbd >>> .weui-cells:after {
  border: 0 none;
}

.group-clearbd >>> .weui-cells:before {
  border: 0 none;
}

/*cell部分*/
.weui-cell {
  padding: 14px 15px;
  font-size: 15px;
}

.weui-cell:before {
  right: 15px;
}

.weui-cell >>> .weui-cell__ft {
  font-size: 14px;
  padding-right: 0;
}

.weui-cell >>> input {
  font-size: 14px;
  color: #999;
}

.weui-cell.vux-tap-active >>> .weui-cell__ft {
  padding-right: 18px;
}

.vux-cell-box >>> .weui-cell {
  padding: 14px 15px;
  font-size: 15px;
}

.vux-cell-box >>> .weui-cell:before {
  right: 15px;
}

.vux-cell-box >>> .weui-cell .weui-cell__ft {
  padding-right: 0;
}

.vux-cell-box >>> .weui-cell.vux-tap-active .weui-cell__ft {
  padding-right: 18px;
}

.vux-cell-box >>> .weui-cell .vux-cell-value {
  font-size: 14px;
}

/*文本域*/
.vux-x-textarea {
  padding: 0;
  font-size: 14px;
}

.defaultvalue {
  position: relative;
  padding: 4px 0;
}

.border-bottom-1px:after {
  left: 15px;
  right: 15px;
}

.loading {
  width: 100px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
.loading .weui-loading {
  width: 50px;
  height: 50px;
}
.lightBox {
  position: absolute;
  z-index: 1000;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
}
</style>
