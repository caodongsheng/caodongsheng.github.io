<template>
  <div style="width:100%" class="address3">
    <cell
      :title="title"
      v-show="showcell"
      @click.native="onClick"
      :is-link="!readonly"
      :class="readonly? 'addreadonly':''"
      disabled
    >
      <span class="vux-cell-placeholder" v-if="shouldShowPlaceholder">{{ placeholder }}</span>
      <span class="vux-cell-value" v-if="!shouldShowPlaceholder">{{ displayFormat(value) }}</span>
    </cell>
    <div v-transfer-dom>
      <popup v-model="show">
        <div>
          <popup-header
            :left-text="cancelText"
            :right-text="confirmText"
            :title="title"
            :show-bottom-border="false"
            @on-click-left="hideFun"
            @on-click-right="showFun">
          </popup-header>
          <!-- 省市区三级联动 -->
          <!-- 居住地址三级联动选项 -->
          <div class="bg-ffffff" v-show="showselect">
            <div style="line-height:34px;padding-top:5px;padding-left:15px;color:#666">已选 ↓</div>
            <div  class="bg-f6f5f6" style="line-height: 24px;padding: 10px 15px;color:#666">
              <span v-show="provinceobj">{{provinceobj?provinceobj.regionName+getMid(cityobj):''}}</span>
              <span v-show="cityobj">{{cityobj?cityobj.regionName+getMid(districtobj):''}}</span>
              <span v-show="districtobj">{{districtobj?districtobj.regionName+getMid(townobj):''}}</span>
              <span v-show="townobj"> {{townobj?townobj.regionName+getMid(villageobj):''}}</span>
              <span v-show="villageobj"> {{villageobj?villageobj.regionName+"":''}}</span>
            </div>
          </div>

          <div style="background-color: white;border-bottom:#e7e7e7 1px solid" class="areadiv">
            <div v-if="controlnum>0"><span @click="provinceSelected()" :class="showProvince?'active':''">省份</span></div>
            <div v-if="controlnum>1"><span @click="citySelected()" :class="showCity?'active':''">城市</span></div>
            <div v-if="controlnum>2"><span @click="districtSelected()" :class="showDistrict?'active':''">区/县</span></div>
            <div v-if="controlnum>3"><span @click="townSelected()" :class="showTown?'active':''">乡/镇</span></div>
            <div v-if="controlnum>4"><span @click="villageSelected()" :class="showVillage?'active':''">村</span></div>
          </div>

        </div>
        <!-- <ul class="ulclss" style="height:350px;overflow-x: hidden;overflow-y: auto;-webkit-overflow-scrolling:touch;background:white;"> -->
          <div class="ulclss" style="height:350px; width:100%;position:relative;overflow: hidden;-webkit-overflow-scrolling:touch;background:white;">
            
           <template v-if="showProvince">
           <scroller refresh-layer-color="#4b8bf4" loading-layer-color="#ec4949" >

          <p class="addList" v-for="(v,k) in info" :key="v.id" @click="getProvinceId(v.id, v.regionName,k)" :class="v.selected === true ? 'active' : ''">
            {{v.regionName}}
           </p>
            </scroller>

           </template>
          <template  v-if="showCity">
                       <scroller refresh-layer-color="#4b8bf4" loading-layer-color="#ec4949" >

          <p class="addList"  :key="v.id" v-for="(v,k) in showCityList" @click="getCityId(v.id, v.regionName,k)" :class="v.selected ? 'active' : ''">
            {{v.regionName}}
            </p>
               </scroller>
           </template>
           <template   v-if="showDistrict">
                                    <scroller refresh-layer-color="#4b8bf4" loading-layer-color="#ec4949"  >
  
          <p class="addList" v-for="(v,k) in showDistrictList"  :key="v.id" @click="getDistrictId(v.id, v.regionName,k)" :class="v.selected ? 'active' : ''">
            {{v.regionName}}
            <span v-if="v.selected === true" class="spanchecked"></span>
            </p>
             </scroller>
           </template>
             <template  v-if="showTown">  
                                                   <scroller refresh-layer-color="#4b8bf4" loading-layer-color="#ec4949"  >
                                                       
          <p class="addList"  v-for="(v,k) in showTownList" :key="v.id" @click="getTownId(v.id, v.regionName,k)" :class="v.selected ? 'active' : ''">
            {{v.regionName}}
            </p>
               </scroller>
        </template>
        <template  v-if="showVillage">   
                                                             <scroller refresh-layer-color="#4b8bf4" loading-layer-color="#ec4949"  >
                                                       
          <p class="addList" v-for="(v,k) in showVillageList"  :key="v.id" @click="getVillageId(v.id, v.regionName,k)" :class="v.selected ? 'active' : ''">
            {{v.regionName}}
            </p>
            </scroller>
        </template>
          </div>
      </popup>

    </div>

  </div>
</template>


<script>
  import {Picker, Flexbox, FlexboxItem, XButton, PopupHeader, TransferDom, Popup, Cell} from 'vux'

  export default {
    name: 'myaddress',
    directives: {
      TransferDom
    },
    components: {
      Cell,
      Picker,
      Flexbox,
      FlexboxItem,
      Popup,
      XButton,
      PopupHeader
    },

    props: {
      readonly: Boolean,
      placeholder: String,
      controlnum:{
        type:Number,
        default:6
      },
      showcell:{
        type:Boolean,
        default:true
      },
      value: false,

      'title': {
        type: String,
        default: ''
      },
      'cancelText': {
        type: String,
        default: '取消'
      },
      'confirmText': {
        type: String,
        default: '确定'
      },
      displayFormat: {
        type: Function,
        default: (value) => {
          let arr = [];
          value.map(a => {
            arr.push(a.regionName)
          })

          return arr.join(" ");
        }
      }
    },
    computed: {

      shouldShowPlaceholder() {

        if (!this.value.length) {
          return true;
        }else{
          return false;
        }

      }
    },

    created: function () {
      if (this.value.length>0) {
        this.showselect = true;

      }else{
        this.showselect = false;
      }
    },
    watch: {
      value: function (val) {
        if (val.length>0) {
          this.showselect = true;

        }else{
          this.showselect = false;
        }
        this.getValue(val);

      }
    },
    mounted: function () {
      this.getValue(this.value);
    },
    methods: {
      getMid(obj){
        if(obj){
          return " —"
        }
        else return "";
      },
      getValue(val) {
        let self = this;

        if (val.length > 4 || val.length > 3) {


          self.provinceobj = {};
          self.$set(self.provinceobj, "regionName", val[0].regionName);
          self.$set(self.provinceobj, "id", val[0].id);
          self.cityobj = {};
          self.$set(self.cityobj, "regionName", val[1].regionName);
          self.$set(self.cityobj, "id", val[1].id)
          self.districtobj = {};
          self.$set(self.districtobj, "regionName", val[2].regionName);
          self.$set(self.districtobj, "id", val[2].id);
          self.townobj = {};
          self.$set(self.townobj, "regionName", val[3].regionName);
          self.$set(self.townobj, "id", val[3].id);
          if (val.length == 5) {
            self.villageobj = {};
            self.$set(self.villageobj, "regionName", val[4].regionName);
            self.$set(self.villageobj, "id", val[4].id);
            self.getVillageList(val[3].id, function () {
              let cindex = self.showVillageList.findIndex(function (value) {
                return value.regionName == self.villageobj.regionName;
              })
              self.showVillageList.map(a => {
                a.selected = false
              })
              self.showVillageList[cindex].selected = true
            });
          }
          else {
            if(this.controlnum<5){
              self.getTownList(val[2].id, function () {
              });
            }
           else  self.getVillageList(val[3].id, function () {

            });
          }
        }
        else if (val.length > 2) {
          self.provinceobj = {};
          self.$set(self.provinceobj, "regionName", val[0].regionName);
          self.$set(self.provinceobj, "id", val[0].id);
          self.cityobj = {};
          self.$set(self.cityobj, "regionName", val[1].regionName);
          self.$set(self.cityobj, "id", val[1].id)
          self.districtobj = {};
          self.$set(self.districtobj, "regionName", val[2].regionName);
          self.$set(self.districtobj, "id", val[2].id);
          if(this.controlnum<4){
            self.getDistrictList(val[1].id, function () {

            });
          }
          else {
            self.getTownList(val[2].id, function () {
            });
          }

        }
        else if (val.length > 1) {

          self.provinceobj = {};
          self.$set(self.provinceobj, "regionName", val[0].regionName);
          self.$set(self.provinceobj, "id", val[0].id);
          self.cityobj = {};
          self.$set(self.cityobj, "regionName", val[1].regionName);
          self.$set(self.cityobj, "id", val[1].id)
          if(this.controlnum<3){
            self.getCityList(val[0].id, function () {

            });
          }
          else {
            self.getDistrictList(val[1].id, function () {

            });
          }

        }
        else if (val.length > 0) {

          self.provinceobj = {};
          self.$set(self.provinceobj, "regionName", val[0].regionName);
          self.$set(self.provinceobj, "id", val[0].id);
          self.getCityList(val[0].id, function () {

          });
          if(this.controlnum<2){
            self.getProvince(function () {

            });
          }
          else {
            self.getCityList(val[0].id, function () {

            });
          }

        }
        else {
          self.getProvince(function () {

          });
        }
      },
      getCityList(id, callback) {
        let self = this;
        this.$store.dispatch("getRegionListById", {
          id: id, type: 2, callackfun: function () {
             self.showCity = true
             self.showProvince = false
           
            self.showDistrict = false;
            self.showTown = false;
            self.showVillage = false;
            self.showCityList = self.$store.state.citylist;
            
            callback()
          }, nodatafun: function () {
          }
          , owner: self
        });


      },
      getDistrictList(id, callback) {

        let self = this;

        this.$store.dispatch("getRegionListById", {
          id: id, type: 3, callackfun: function () {
           self.showDistrict = true;
            self.showProvince = false
            self.showCity = false
            
            self.showTown = false;
            self.showVillage = false;
            self.showDistrictList = self.$store.state.districtlist;
           
            callback();
          }, nodatafun: function () {
            self.getCityList(self.provinceobj.id, function () {
              let cindex = self.showCityList.findIndex(function (value) {
                return value.regionName == self.cityobj.regionName;
              })
              self.showCityList.map(a => {
                a.selected = false
              })
              self.showCityList[cindex].selected = true
            })
          }
          , owner: self
        });

      },
      getTownList(id, callback) {

        let self = this;

        this.$store.dispatch("getRegionListById", {
          id: id, type: 4, callackfun: function () {
            self.showTown = true;
             self.showProvince = false
            self.showCity = false
            self.showDistrict = false;
            
            self.showVillage = false;
            self.showTownList = self.$store.state.townlist;
           
            callback();
          }, nodatafun: function () {
            self.getDistrictList(self.cityobj.id, function () {
              let cindex = self.showDistrictList.findIndex(function (value) {
                return value.regionName == self.districtobj.regionName;
              })
              self.showDistrictList.map(a => {
                a.selected = false
              })
              self.showDistrictList[cindex].selected = true
            })
          }
          , owner: self
        });

      },
      getVillageList(id, callback) {
        let self = this;
        this.$store.dispatch("getRegionListById", {
          id: id, type: 5, callackfun: function () {
            self.showVillage = true
            self.showProvince = false
            self.showCity = false
            self.showDistrict = false;
            self.showTown = false;
            self.showVillageList = self.$store.state.villagelist;
            
            callback();
          }, nodatafun: function () {
            self.getTownList(self.districtobj.id, function () {
              let cindex = self.showTownList.findIndex(function (value) {
                return value.regionName == self.townobj.regionName;
              })
              self.showTownList.map(a => {
                a.selected = false
              })
              self.showTownList[cindex].selected = true
            })
          }
          , owner: self
        });
      },
      getProvince(callback) {
        /**let self = this;

        this.$store.dispatch("getRegionListById", {
          id: "100", type: 1, callackfun: function () {
             self.showProvince = true
              self.showCity = false
            self.showDistrict = false;
            self.showTown = false;
            self.showVillage = false;
            self.info = self.$store.state.provincelist;
           
           
            callback();
          }, nodatafun: function () {
          }
          , owner: self
        });*/
		  this.showProvince = true
          this.showCity = false
          this.showDistrict = false;
          this.showTown = false;
          this.showVillage = false;
          this.info = [{id:"520000000000",regionName:"贵州省"}]
          callback();
      },

      onClick() {
        if (!this.readonly) {
          this.show = true
        }
      },
      getProvinceId: function (code, input, index) {
        let self = this;

        this.showDistrictList = false
        this.showTownList = false;
        this.showVillageList = false;
        this.info.map(a => {
          a.selected = false
        })
        this.info[index].selected = true
        this.provinceobj = {};
        this.$set(this.provinceobj, "regionName", input);
        this.$set(this.provinceobj, "id", code)
        this.showselect = true;
        this.cityobj = null;
        this.districtobj = null;
        this.townobj = null;
        this.villageobj = null;
        if (this.controlnum != 0 && this.controlnum < 2) return false;
        this.$store.dispatch("getRegionListById", {
          id: code, type: 2, callackfun: function () {
            self.showCity = true
           self.showProvince = false
            self.showDistrict = false;
            self.showTown = false;
            self.showVillage = false;
            self.showCityList = self.$store.state.citylist;
           
          }, nodatafun: function () {
            self.showCityList = false

          }
          , owner: self
        });
      },
      getCityId: function (code, input, index) {
        let self = this;

        this.showTownList = false;
        this.showVillageList = false;
        // 点击选择当前
        this.showCityList.map(a => {
          a.selected = false
        })
        this.showCityList[index].selected = true
        this.cityobj = {};
        this.$set(this.cityobj, "regionName", input);
        this.$set(this.cityobj, "id", code)
        this.districtobj = null;
        this.townobj = null;
        this.villageobj = null;
        this.showselect = true;
        if (this.controlnum != 0 && this.controlnum < 3) return false;
        this.$store.dispatch("getRegionListById", {
          id: code, type: 3, callackfun: function () {
             self.showDistrict = true;
              self.showProvince = false
            self.showCity = false         
            self.showTown = false;
            self.showVillage = false;
            self.showDistrictList = self.$store.state.districtlist;
           
          }, nodatafun: function () {
            self.showDistrictList = false

          }
          , owner: self
        });
      },
      getDistrictId: function (code, input, index) {

        this.showVillageList = false;
        this.showDistrictList.map(a => {
          a.selected = false
        })
        this.showDistrictList[index].selected = true
        this.districtobj = {};

        this.$set(this.districtobj, "regionName", input);
        this.$set(this.districtobj, "id", code)

        this.townobj = null;
        this.villageobj = null;
        this.showselect = true;
        let self = this;
        if (this.controlnum !== 0 && this.controlnum < 4) return false;
        this.$store.dispatch("getRegionListById", {
          id: code, type: 4, callackfun: function () {
             self.showTown = true;
              self.showProvince = false
            self.showCity = false
            self.showDistrict = false;          
            self.showVillage = false;
            self.showTownList = self.$store.state.townlist;
           
          }, nodatafun: function () {

            self.showTownList = false;

          }
          , owner: self
        });
      },
      getTownId: function (code, input, index) {
        let self = this;


        this.showTownList.map(a => {
          a.selected = false
        })
        this.showTownList[index].selected = true
        this.townobj = {};
        this.$set(this.townobj, "regionName", input);
        this.$set(this.townobj, "id", code)

        this.villageobj = null;
        this.showselect = true;
        if (this.controlnum !== 0 && this.controlnum < 5) return false;
        this.$store.dispatch("getRegionListById", {
          id: code, type: 5, callackfun: function () {
            self.showVillage = true;
            self.showProvince = false
            self.showCity = false
            self.showDistrict = false;
            self.showTown = false;
            self.showVillageList = self.$store.state.villagelist;
           
          }, nodatafun: function () {

            self.showVillageList = false;
          }
          , owner: self
        });
      },
      getVillageId: function (code, input, index) {
        this.showselect = true;
        // 点击选择当前
        this.showVillageList.map(a => {
          a.selected = false
        })
        this.showVillageList[index].selected = true
        this.villageobj = {};
        this.$set(this.villageobj, "regionName", input);
        this.$set(this.villageobj, "id", code)

      },
      provinceSelected: function () {
        let self = this;
        if (this.provinceobj) {
          if (!this.info) {
            this.getProvince(function () {
              let pindex = self.info.findIndex(function (value) {
                return value.regionName == self.provinceobj.regionName;
              })
              self.info.map(a => {
                a.selected = false
              })
              self.info[pindex].selected = true
            });
          }

        }
        else {
          // 清除市级和区级列表
          this.showCityList = false
          this.showDistrictList = false
          this.showTownList = false;
          this.showVillageList = false;
          // 清除市级和区级选项


        }
        this.showProvince = true
        this.showCity = false
        this.showDistrict = false
        this.showTown = false;
        this.showVillage = false;


      },
      citySelected: function () {
        let self = this;
        if (this.cityobj) {
          if (!this.showCityList) {
            this.getCityList(this.provinceobj.id, function () {
              let cindex = self.showCityList.findIndex(function (value) {
                return value.regionName === self.cityobj.regionName;
              })
              self.showCityList.map(a => {
                a.selected = false
              })
              self.showCityList[cindex].selected = true
            });
          }

        }

        // 选项页面的切换
        this.showProvince = false
        this.showCity = true
        this.showDistrict = false
        this.showTown = false;
        this.showVillage = false;

      },
      districtSelected: function () {
        let self = this;
        if (this.districtobj) {
          if (!this.showDistrictList) {
            this.getDistrictList(this.cityobj.id, function () {
              let dindex = self.showDistrictList.findIndex(function (value) {
                return value.regionName == self.districtobj.regionName;
              })
              self.showDistrictList.map(a => {
                a.selected = false
              })
              self.showDistrictList[dindex].selected = true
            });
          }

        }
        // 选项页面的切换
        this.showProvince = false
        this.showCity = false
        this.showDistrict = true;
        this.showTown = false;
        this.showVillage = false;

      },
      townSelected: function () {
        let self = this;
        if (this.townobj) {
          if (!this.showTownList) {
            this.getTownList(this.districtobj.id, function () {
              let tindex = self.showTownList.findIndex(function (value) {
                return value.regionName == self.townobj.regionName;
              })
              self.showTownList.map(a => {
                a.selected = false
              })
              self.showTownList[tindex].selected = true
            });
          }

        }
        // 选项页面的切换
        this.showProvince = false
        this.showCity = false
        this.showDistrict = false;
        this.showTown = true;
        this.showVillage = false;

      },
      villageSelected: function () {
        let self = this;
        if (this.villageobj) {
          if (!this.showVillageList) {
            this.getVillageList(this.townobj.id, function () {
              let tindex = self.showVillageList.findIndex(function (value) {
                return value.regionName == self.villageobj.regionName;
              })
              self.showVillageList.map(a => {
                a.selected = false
              })
              self.showVillageList[tindex].selected = true
            });
          }


        }
        this.showProvince = false
        this.showCity = false
        this.showDistrict = false;
        this.showTown = false;
        this.showVillage = true;
      },

      cancelFun() {
        this.$emit('hidePicker');

      },
      confirmFun() {


      },
      hideFun() {
        this.$emit('hidePicker');
      },
      getReturnValue() {
        let inputvalue = [];
        if (this.provinceobj) {
          inputvalue.push(this.provinceobj)
        }
        if (this.cityobj) {
          inputvalue.push(this.cityobj)
        }
        if (this.districtobj) {
          inputvalue.push(this.districtobj)
        }
        if (this.townobj) {
          inputvalue.push(this.townobj)
        }
        if (this.villageobj) {
          inputvalue.push(this.villageobj)
        }
        return inputvalue;
      },
      showFun() {
        let returnvalue = this.getReturnValue();
        if(this.controlnum<6) {
          if (this.controlnum > returnvalue.length) {
            // alert("必须选择到" + this.controlstate[this.controlnum - 1])
            this.showToast('','text','必须选择到' + this.controlstate[this.controlnum - 1],'20em','top')
          }
          else {
            this.$emit('input', returnvalue);
            this.$emit('hidePicker');
          }
        }
        else{
          this.$emit('input', returnvalue);
            this.$emit('hidePicker');
        }
      }

    },
    data() {
      return {
        controlstate:["省级","市级","区级","乡级","村级"],

        currentstate: 0,
        showProvince: true,
        showCity: false,
        showDistrict: false,
        showTown: false,
        showVillage: false,
        showselect:false,

        info: false,
        showCityList: false,
        showDistrictList: false,
        showTownList: false,
        showVillageList: false,


        provinceobj: false,
        cityobj: false,
        districtobj: false,
        townobj: false,
        villageobj: false,
        show: false,


      }
    }
  }
</script>

<style  scoped>
  .address {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 121;
    background: #fff;
    width: 100%;
    height: 430px

  }
  .address3>>>.vux-cell-primary{flex:none}
  .address3>>>.weui-cell__ft{flex:1;text-align: right}
  .weui-cell.addreadonly>>>.weui-cell__ft{padding-right: 0}

  .title {
    padding-top: 4px;
    padding-bottom: 5px;
    background-color: #fbf9fe;
  }

  .title h4 {
    display: inline-block;
    font-size: 18px;
    font-weight: normal;
  }

  .area {
    display: inline-block;
    font-size: 15px;
    margin-left: 10px;
  }

  .selectarea {
    display: inline-block;
    font-size: 15px;
    margin-left: 0px;
  }

 .addList {
    padding: 0 15px;
    font-size: 14px;
    line-height: 40px;
position: relative;

  }
  .addList:after{
    content: '';
    position: absolute;
    bottom: 0;
    left:0;right:0;
    border-bottom: 1px solid #ddd;
    transform: scaleY(0.5);
  }
  .addList:last-child:after{
    border:0 none
  }

   .active{
    color: red;
          }



  /*选择导航部分*/
  .areadiv {
    display: flex;
    line-height: 40px;
    font-weight: bold;
  }

  .areadiv div {
    flex: 1;
    text-align: center;
    position: relative;
  }
  .areadiv div:before{
    content:'';
    position:absolute;
    width: 6px;
    height: 6px;
    border: 1px solid #888;
    border-width: 1px 0 0 1px;
    transform: rotate(135deg);
    left:-3px;
    top:17px
  }

  .areadiv div:first-child:before{
    border:0 none
  }
  .areadiv div span {
    display: inline-block;
    padding: 0 6px
  }

  .areadiv .active {
    color: red;
    border-bottom: 3px solid red;
  }

  ul .active {
    color: red;
  }

  ul .spanchecked {
    display: inline-block;
    content: "\EA08";
    color: red;
    font-size: 16px;

  }

  .box {
    padding: 0 15px;
    margin-top: 120px;
    height: 300px;
  }

  .itemclass {
    border: 1px solid #ececec;
    padding: 5px 15px;
    margin: 5px 10px;

  }

  .item-selectedclass {
    border: 1px solid green;
  }
  .weui-cell >>> .weui-cell__ft{padding-right:18px}
  .weui-cell >>> .weui-cell__ft .vux-cell-value{font-size: 14px}

</style>
