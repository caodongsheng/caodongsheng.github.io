<template>
  <div>
    <x-header :left-options="{backText: ''}">
      信息修改
      <a slot="right" class="color-orange f-16" @click="saveuserinfo()">保存</a>
    </x-header>
    <div class="box-withheader over-auto bg-f6f5f6">
      <group class="group-clearbd mt-12" label-width="10em">
        <x-input title="受助人姓名" placeholder v-model="username" text-align="right" disabled></x-input>
        <x-input
          title="受助人身份证号"
          placeholder
          v-model="id_card"
          text-align="right"
          disabled
          class="border-bottom-1px"
        ></x-input>
        <!-- <cell title="受助人所在地">
           <span class="color-999">湖南省永州市永州县永州乡镇永州村</span>
        </cell>-->
        <my-address
          class="ipt"
          title="所在地"
          :readonly="true"
          placeholder="受助人所在地"
          @confirmAction="confirmFun"
          @hidePicker="hidePicker"
          v-model="addressvalue"
          ref="address"
        ></my-address>
        <x-input
          title="受助人联系方式"
          v-model="userPhone"
          placeholder="请输入11位手机号"
          text-align="right"
          :is-type="checkphonefun"
          :required="true"
          keyboard="number"
          @on-focus="inputFocus"
          :max="11"
        ></x-input>
        <popup-picker
          title="您与受助者关系"
          :data="relationlist"
          v-model="relation"
          show-name
          :columns="1"
          :required="true"
          :disabled="relationReadOnly"
          @on-hide="confirmValue"
        ></popup-picker>
      </group>
    </div>
  </div>
</template>

<script>
import { XHeader, Group, Cell, PopupPicker, XInput } from "vux";
import MyAddress from "@/components/util/myaddressnew3";
import { mapState, mapActions } from "vuex";
import { checkPhoneStr } from "@/util/validFun.js";

export default {
  name: "aided_modify",
  components: { XHeader, Group, Cell, PopupPicker, XInput, MyAddress },
  data() {
    return {
      timer: null,
      relation: [],
      username: "",
      userPhone: "",
      phonefail: true,
      id_card: "",
      userid: "",
      address: "",
      provinceid: "",
      cityid: "",
      districtid: "",
      townid: "",
      villageid: "",
      relationReadOnly: false,
      relationlist: []
    };
  },
  watch: {
    userPhone(val) {
      this.$nextTick(() => {
        this.userPhone = val.replace(/[^0-9]/g, "");
      });
    }
  },
  destroyed() {
    clearTimeout(this.timer);
  },
  methods: {
    ...mapActions(["getAidedPersonDetail"]),
    getAidedPersonDetail() {
      this.$store.dispatch("getAidedPersonDetail", this);
    },
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
    checkphonefun(value) {
      this.inputFocusout();
      let validobj = checkPhoneStr(value, "联系方式");
      if (!validobj.valid) {
        this.phonefail = true;
      } else {
        this.phonefail = false;
      }
      return validobj;
    },

    saveuserinfo() {
      if (this.phonefail) {
        let msg = checkPhoneStr(this.userPhone, "联系方式").msg;
        this.showToast("", "text", msg, "20em", "", "midddle");
        return false;
      }
      let self = this;
      this.helpId = this.userid;
      this.aided_person_tel = this.userPhone;
      // let a = this.relation.join("")
      // this.relation_id = a
      // this.relationlist.forEach((item) => {
      //     this.relation = item.value
      // })
      // obj.aidedPersonName = this.username;
      // obj.idcard = this.id_card;
      // obj.region_name = this.address;
      // obj.province_region_id = this.provinceid;
      // obj.city_region_id = this.cityid;
      // obj.county_region_id = this.districtid;
      // obj.village_region_id = this.townid;
      // obj.hamlet_region_id = this.villageid;
      this.$http
        .post("hts/poor/userEdit", {
          helpId: this.helpId,
          aided_person_tel: this.aided_person_tel,
          relation_id: this.relation[0]
        })
        .then(function(response) {
          if (response.data === "SUCCESS") {
            self.showToast("", "text", "保存成功", "20em", "", "midddle");
            self.$router.replace("/aideddetail/" + self.aidedpersondetail.id);
          } else {
            self.showToast("", "text", response.msg, "20em", "", "middle");
          }
        })
        .catch(function(error) {
          if (error.msg)
            self.showToast("", "text", error.msg, "20em", "", "middle");
        });
    },
    confirmValue() {
      //   this.relation =
      // this.relationlist.forEach((item) => {

      // })
      console.log(this.relation);
      if (this.relation[0] < 10) {
        this.relation[0] = this.relationlist[
          this.relation[0].substr(1, 1) - 1
        ].value;
      } else {
        this.relation[0] = this.relationlist[this.relation[0] - 1].value;
      }
    },
    confirmFun() {
      this.$refs.address.show = false;
    },
    hidePicker() {
      let str = "";
      for (let i = 0; i < this.addressvalue.length; i++) {
        str += this.addressvalue[i].regionName;
      }

      this.$refs.address.show = false;
    }
  },
  computed: {
    ...mapState(["alljson"]),
    aidedpersondetail: function() {
      return this.$store.state.aidedpersondetail;
    },
    addressvalue: {
      get: function() {
        let arr = [];
        if (this.address == "") return arr;
        else {
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
        }
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
        this.address = arr.reverse().join(" ");
      }
    }
  },
  created() {
    this.getAidedPersonDetail();
    this.relationlist = this.alljson.recipients;
    let userinfo = this.aidedpersondetail;

    this.userid = userinfo.id;
    this.username = userinfo.aided_person_name;
    this.userPhone = userinfo.aided_person_tel;
    this.id_card = userinfo.idcard;
    this.address = userinfo.region_name;
    this.provinceid = userinfo.province_region_id;
    this.cityid = userinfo.city_region_id;
    this.districtid = userinfo.county_region_id;
    this.townid = userinfo.village_region_id;
    this.villageid = userinfo.hamlet_region_id;
    console.log(userinfo.relation_id);

    let arr = this.alljson.recipients.find(
      item =>
        item.value === userinfo.relation_id ||
        item.name === userinfo.relation_id
    );

    this.relation[0] = arr.value;
    this.phonefail = false;
    //如果受助人关系存在 禁止修改
    if (this.userinfo.relation_id !== "") {
      this.relationReadOnly = true;
    }
  }
};
</script>

<style scoped>
/*group header右侧操作*/
.group-clearbd >>> .weui-cells {
  margin-top: 0 !important;
  font-size: 15px;
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

.border-bottom-1px:after {
  left: 15px;
  right: 15px;
}
</style>
