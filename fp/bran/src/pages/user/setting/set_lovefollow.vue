<template>
  <div>
    <x-header :left-options="{backText: ''}">
      爱心关注
      <a slot="right" class="color-orange f-16"   @click.stop.prevent="saveloveaddress">保存</a>
    </x-header>
    <div class="box-withheader over-auto bg-f6f5f6">
      <group
        class="group-clearbd bg-ffffff"
        label-width="6.5em"
        label-margin-right="2em"
        label-align="left"
      >
        <my-address
          title="爱心关注地区"
       
          placeholder="选择地区"
          @confirmAction="confirmFun"
          @hidePicker="hidePicker"
          v-model="addressvalue"
          ref="address"
        ></my-address>
      </group>
    </div>
  </div>
</template>


<script>
  import { XHeader, Group, Cell } from "vux";
  import MyAddress from "@/components/util/myaddressnew3";
  import {mapState,mapActions} from 'vuex'
  export default {
    name: "set_lovefollow",
    components: { XHeader, Group, Cell, MyAddress },
    data() {
      return {
        addressvalue: [],
        address: "",
        provinceid: "",
        cityid: "",
        districtid: "",
        townid: "",
        villageid: "",
        isnull:true
       
      };
    },
    computed:{
      ...mapState(["user"]),
    // readonly:function(){
    //  if(this.user.is_poor === 1||!this.isnull){
    //   return true
    //   }else{
    //   return  false
    //   }
    // }
     },
    methods: {
      ...mapActions(["getUser"]),
      getUser() {
        this.$store.dispatch('getUser', { _this: this.$http });
      },
      confirmFun() {
        this.$refs.address.show = false;
      },
      hidePicker() {
        this.$refs.address.show = false;
      },
      saveloveaddress() {
        let addressarr = this.addressvalue;
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
        this.submitaddress();
      },
      submitaddress() {
        let self = this;
        if(this.provinceid === ''){
          this.showToast('','text','请选择关注地区','20em','','top');
          return;
        }
        this.$http.post("uts/user/concern", {
          concern_region_name: this.address,
          concern_hamlet_region_id: this.villageid,
          concern_village_region_id: this.townid,
          concern_county_region_id: this.districtid,
          concern_city_region_id: this.cityid,
          concern_province_region_id: this.provinceid
        }).then(function(response) {
            self.showToast('','text','保存成功');
            self.isnull = false;
            self.getUser();
            self.$router.go(-1);
          })
          .catch(function(error) {
            if(error.msg)
            self.showToast('','text',error.msg,'20em','','middle');
          });
      },
      getarr(addressdata) {
        this.address = addressdata.concern_region_name;
        this.villageid = addressdata.concern_hamlet_region_id;
        this.townid = addressdata.concern_village_region_id;
        this.districtid = addressdata.concern_county_region_id;
        this.cityid = addressdata.concern_city_region_id;
        this.provinceid = addressdata.concern_province_region_id;
        let arr = [];
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
        this.addressvalue = arr.reverse();
        if( this.addressvalue.length>0) this.isnull = false;
        else this.isnull = true;
        /* let addressvaluearr =  arr.reverse();
          for(let j=0;j<addressvaluearr.length;j++) {
            this.$set(this.addressvalue, j, addressvaluearr[j])
          }*/
      },
      getLoveAddress() {
        let self = this;
        this.$http.post("uts/user/concern").then(function(response) {
            if (typeof response.data == "object") {
              if (
                response.data.concern_region_name &&
                response.data.concern_region_name !== ""
              ) {
                self.getarr(response.data);
              } else {
                self.addressvalue = [];
                self.isnull = true;
              }
            } else {
              //alert(response.msg)
              self.showToast("", "text", response.msg, "20em", "top");
            }
          })

      }
    },
    created() {
     
      this.getLoveAddress();
    },
    userDetail() {
      return this.$store.state.user;
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
  margin-top: 12px;
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
</style>
