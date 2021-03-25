<template>
  <div>
    <button @click="returnClick">{{returntitle}}</button>
    <div style="padding:10px 10px 40px 10px;"  v-if="storagelist.length>0">
      <p style="padding: 5px 5px 5px 2px;color:#888;">历史记录</p>
      <button  @click="deletecache" style="float:right">删除</button>
      <checker
        default-item-class="itemclass"
        selected-item-class="item-selectedclass">
      <checker-item :value="item" v-for="(item, index) in storagelist " :key="index"  @on-item-click="onStorageItemClick">{{valueFormat2(item)}}</checker-item>

  </checker>
  </div>
<div>
<div  class="box">
  <p style="padding: 5px 5px 5px 2px;color:#888;">{{asynctitle}}</p>
  <checker
    default-item-class="itemclass"
    selected-item-class="item-selectedclass"  v-show="step==0">
  <checker-item :value="data" v-for="(data, index) in provincelist " :key="index"  @on-item-click="onItemClick">{{valueFormat(data)}}</checker-item>

</checker>
<checker
default-item-class="itemclass"
selected-item-class="item-selectedclass" v-show="step==1">
<checker-item :value="data" v-for="(data, index) in citylist " :key="index"   @on-item-click="onItemClick">{{valueFormat(data)}}</checker-item>

  </checker>
<checker
default-item-class="itemclass"
selected-item-class="item-selectedclass"  v-show="step==2">
<checker-item :value="data" v-for="(data, index) in districtlist " :key="index"  @on-item-click="onItemClick">{{valueFormat(data)}}</checker-item>

  </checker>
<checker
default-item-class="itemclass"
selected-item-class="item-selectedclass"  v-show="step==3">
<checker-item :value="data" v-for="(data, index) in townlist " :key="index"  @on-item-click="onItemClick">{{valueFormat(data)}}</checker-item>

  </checker>
<checker
default-item-class="itemclass"
selected-item-class="item-selectedclass"  v-show="step==4">
<checker-item :value="data" v-for="(data, index) in villagelist " :key="index"  @on-item-click="onItemClick">{{valueFormat(data)}}</checker-item>

  </checker>
  </div>
  </div>
  </div>
</template>
  <script>
  const SEARCH_MAX_LENGTH = 3
  import {Checker,CheckerItem} from 'vux'

  export default{
    name: 'chooseaddress',
      data(){
        return {
          provincelist: [],
          citylist: [],
          districtlist: [],
          townlist: [],
          villagelist: [],
          step: 0,
          storagelist: []
        }
      },
    components: {
      Checker,
      CheckerItem
    },
      props:{

        valueFormat:{
          type:Function,
          default:function(value) {
            return value.name;
         }
        },
        valueFormat2:{
          type:Function,
          default:function(value) {
            return value.alias;
          }
        }
      },
      mounted:function(){
        this.getLocalStorage();
        this.getProvinceList();

      },
      computed:{
        returntitle(){
          switch(this.step){
            case 0:
                  return "返回";
            case 1:
                  return "返回省份";
            case 2:
                  return "返回城市";
            case 3:
                  return "返回区县";
            case 4:
                  return "返回城镇";
          }
        },
        asynctitle(){
          switch(this.step){
            case 0:
              return "省份";
            case 1:
              return "城市";
            case 2:
              return "区县";
            case 3:
              return "城镇";
            case 4:
              return "村庄";
          }
        }
      },
      methods:{
        getLocalStorage(){
          let newLocal= localStorage.addresslist;
          if (newLocal!= "" && newLocal!= undefined) {
            this.storagelist= JSON.parse(newLocal);
          }
          else{
            this.storagelist= [];
          }
        },
        getProvinceList(){
          this.provincelist = []
          let allprovince = {name:"全国",value:"0",alias:"全国",parentid:""};
          this.provincelist.push(allprovince);
          let info = [
            {value:'1', name: '北京',alias:"北京",parentid:"1"},
            {value:'2', name: '天津',alias:"天津",parentid:"1"},
            {value:'3', name: '河北',alias:"河北",parentid:"1"}

          ];
          for(let i=0;i<info.length;i++) {
            this.provincelist.push(info[i]);
          }
        },
        getAreaData(data){
          switch(this.step){
            case 1:
              this.citylist = [];
              let currcity = {name:"全部",value:data.value,alias:data.name,parentid:""}
              this.citylist.push(currcity)
             let showCityList = [
                {value:'3', name: '石家庄',alias: '石家庄',parentid:data.value},
                {value:'4', name: '唐山',alias: '唐山',parentid:data.value},
                {value:'5', name: '秦皇岛',alias: '唐山',parentid:data.value}
              ]
              for(let i=0;i<showCityList.length;i++) {
                this.citylist.push(showCityList[i]);
              }
              break;
            case 2:
              this.districtlist = [];
              let currdistrict = {name:"全部",value:data.value,alias:data.name,parentid:""}
              this.districtlist.push(currdistrict)
              let showDistrictList=[{value: '37', name: '长安区',alias: '长安区',parentid:data.value},
                {value:'38', name: '桥东区',alias: '桥东区',parentid:data.value},
                {value:'39', name: '桥西区',alias: '桥西区',parentid:data.value},
                {value:'40', name: '新华区',alias: '新华区',parentid:data.value},
                {value:'41', name: '井陉矿区',alias: '井陉矿区',parentid:data.value},
                {value:'42', name: '裕华区',alias: '裕华区',parentid:data.value},
                {value:'43', name: '井陉县',alias: '井陉县',parentid:data.value},
                {value:'44', name: '正定县',alias: '正定县',parentid:data.value},
                {value:'45', name: '栾城县',alias: '栾城县',parentid:data.value},
                {value:'46', name: '行唐县',alias: '行唐县',parentid:data.value},
                {value:'47', name: '灵寿县',alias: '灵寿县',parentid:data.value},
                {value:'48', name: '高邑县',alias: '高邑县',parentid:data.value},
                {value:'49', name: '深泽县',alias: '深泽县',parentid:data.value},
                {value:'50', name: '赞皇县',alias: '赞皇县',parentid:data.value},
                {value:'51', name: '无极县',alias: '无极县',parentid:data.value},
                {value:'52', name: '平山县',alias: '平山县',parentid:data.value},
                {value:'53', name: '元氏县',alias: '元氏县',parentid:data.value},
                {value:'54', name: '赵县',alias: '赵县',parentid:data.value},
                {value:'55', name: '辛集市',alias: '辛集市',parentid:data.value},
                {value:'56', name: '藁城市',alias: '藁城市',parentid:data.value},
                {value:'57', name: '晋州市',alias: '晋州市',parentid:data.value},
                {value:'58', name: '新乐市',alias: '新乐市',parentid:data.value},
                {value:'59', name: '鹿泉市',alias: '鹿泉市',parentid:data.value}]
              for(let i=0;i<showDistrictList.length;i++) {
                this.districtlist.push(showDistrictList[i]);
              }
              break;
            case 3:
              this.townlist = [];
              let currtown = {name:"全部",value:data.value,alias:data.name,parentid:""}
              this.townlist.push(currtown)
              let showTownList=[{value: '80', name: '镇1',alias: '镇1',parentid:data.value},
                {value:'62', name: '镇2',alias: '镇2',parentid:data.value},
                {value:'63', name: '镇3',alias: '镇3',parentid:data.value},
                {value:'64',name: '镇4',alias: '镇4',parentid:data.value},
                {value:'65', name: '镇5',alias: '镇5',parentid:data.value},
                {value:'66',name: '镇6',alias: '镇6',parentid:data.value},
                {value:'67', name: '镇7',alias: '镇7',parentid:data.value},
                {value:'68', name: '镇8',alias: '镇8',parentid:data.value},
                {value:'69', name: '镇9',alias: '镇9',parentid:data.value},
                {value:'70', name: '镇10',alias: '镇10',parentid:data.value}

              ];
              for(let i=0;i<showTownList.length;i++) {
                this.townlist.push(showTownList[i]);
              }
              break;
            case 4:
              this.villagelist = [];
              let currvillage = {name:"全部",value:data.value,alias:data.name,parentid:""}
              this.villagelist.push(currvillage)
              let showVillageList=[{value: '90', name: '村1',alias: '村1',parentid:data.value},
                {value:'91', name: '村2',alias: '村2',parentid:data.value},
                {value:'92', name: '村3',alias: '村3',parentid:data.value},
                {value:'93',name: '村4',alias: '村4',parentid:data.value},
                {value:'94', name: '村5',alias: '村5',parentid:data.value},
                {value:'95',name: '村6',alias: '村6',parentid:data.value}


              ]
              for(let i=0;i<showVillageList.length;i++) {
                this.villagelist.push(showVillageList[i]);
              }
              break;

          }
        },
        onItemClick (value, disabled) {
          console.log(value, disabled)
          if(value.parentid!="") {
            this.step++;
            if(this.step<5){
              //ajax根据value的value去取下面的地域区划
              this.getAreaData(value);
            }
            else{
              this.saveHistory(value);
              this.$emit("endshow",value)
              this.step--;

            }
          }
          else{
            this.saveHistory(value);
            this.$emit("endshow",value)
          }
        },
        insertArray(arr, val, compare, maxLen) {
          const index = arr.findIndex(compare)
          if (index === 0) {
            return
          }
          if (index > 0) {
            arr.splice(index, 1)
          }
          arr.unshift(val) // 插入到数组最前
          if (maxLen && arr.length > maxLen) {
            arr.pop() // 删除末位元素
          }
        },
        saveHistory(query) {
          let searches = JSON.parse(localStorage["addresslist"]==""||localStorage["addresslist"]==undefined?"[]":localStorage["addresslist"]);
          this.insertArray(searches, query, (item) => {
            return item.value === query.value
          }, SEARCH_MAX_LENGTH)
          localStorage["addresslist"] = JSON.stringify(searches);
          this.getLocalStorage();
        },
        onStorageItemClick(value,disabled){
          this.saveHistory(value);
          this.$emit("endshow",value)
        },
        returnClick:function(){
          this.step--;
          if(this.step<0){
            this.step = 0;
            this.$emit("endshow",null)
          }

        },
        deletecache:function(){
          localStorage.removeItem("addresslist");
          this.getLocalStorage();

        }
      }
    }
  </script>
<style scoped>
.box {
  padding: 0 15px;
}
.itemclass {
  border: 1px solid #ececec;
  padding: 5px 15px;
  margin:5px 10px;

}
.item-selectedclass{
  border: 1px solid green;
}
</style>
