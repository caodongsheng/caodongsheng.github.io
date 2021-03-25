<template>
  <div>
    <x-header :left-options="{backText: ''}">{{getTitle()}}<a slot="right" class="color-orange f-16"  @click="saveaddressinfo()">保存</a></x-header>
    <div class="box-withheader over-auto bg-f6f5f6">
      <group class="group-clearbd mt-12 bg-ffffff mt-12" label-width="5.5em">
        <x-input title="收件人" v-model="linkman"  :is-type="checkName" :required="true" :min="2" :max="15"></x-input>
        <x-input title="手机号码" placeholder="请输入11位手机号" v-model="linkTel" class="border-bottom-1px" :is-type="checkphonefun" :required="true"  keyboard="number" :max="11" ></x-input>
      <!--  <cell title="所在地区" value-align="left">
           <span class="color-999">湖南省永州市永州县永州乡镇永州村</span>
         </cell>-->
        <my-address  title="所在地区" :readonly="false" placeholder="所在地区"
                    @confirmAction='confirmFun'
                    @hidePicker='hidePicker'
                    v-model="addressvalue" ref="address" :controlnum="3" ></my-address>
        <cell title="详细地址" align-items="flex-start" primary="content">
          <x-textarea placeholder="请输入详细地址信息，如街道、门牌号等" v-model="detailAddr"  
           :class="getClass"
            :min="4"
            :max="50"
           ></x-textarea>
        </cell>
        <x-input title="邮编" v-model="postcode"  placeholder="请输入6位邮编" :required="true"
          :is-type="checkCode"
          :min="3"
          :max="12"
         ></x-input>
      </group>
      <group class="group-clearbd defaultvalue mt-12 bg-ffffff">
        <x-switch title="是否设置为默认" v-model="is_default"></x-switch>
      </group>
    </div>
  </div>
</template>
<script>
  import {XHeader, Group, Cell, XInput, XTextarea, XSwitch, Alert} from 'vux'
  import MyAddress from '@/components/util/myaddressnew3'
    import {checkAddress,checkPostcardStr,checkNameStr,checkPhoneStr} from '@/util/validFun.js';

  export default {
    components: {XHeader, Group, Cell, XInput, XTextarea, XSwitch, MyAddress, Alert},
    name: 'addressAdd',
    data () {
      return {
        linkman: '',
        linkTel: '',
        detailAddr: '',
        address: '',
        provinceid: '',
        cityid: '',
        districtid: '',
        townid: '',
        villageid: '',
        postcode: '',
        type: '',
        is_default: false,
        id: '',
        phonefail:true,
        namefail:true,
        postcodefail:true,
        addressdetailfail:true

      }
    },
     watch:{
       linkTel(val){
      this.$nextTick(() => {
          this.linkTel = val.replace(/[^0-9]/g,'')
       
        })
    },
    detailAddr(val){
       
           this.$nextTick(() => {
           let pattern = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]]/
           this.detailAddr = val.replace(pattern, "");
             })
     
    },
    postcode(val){
       this.$nextTick(() => {
           this.postcode = val.replace(/[^\w\.\/]/ig, "");
             })
    }
    },
    methods: {
       checkphonefun(value){
         let validobj = checkPhoneStr(value,"手机号码")
        if(!validobj.valid){
            this.phonefail = true
         
            
        }
        else{
           this.phonefail = false
          
        }
        return validobj
      
      },
           valideContent(){
      let pattern =  /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]]/
      this.detailAddr = this.detailAddr.replace(pattern, ''); 
    },
     checkAddressFun(value){
     let validobj = checkAddress(value, 4, 50, "详细地址");
      if (!validobj.valid) {
        this.addressdetailfail = true;
      } else {
        this.addressdetailfail = false;
      }
      return validobj;
      },
     checkName(value) {
          let validobj = checkNameStr(value,2,15,"收件人姓名")
        if(!validobj.valid){
            this.namefail = true
         
            
        }
        else{
           this.namefail = false
          
        }
        return validobj
      },
      getTitle () {
        if (this.type == 'add') {
          return '新增地址'
        } else {
          return '编辑地址'
        }
      },
      saveaddressinfo () {
        if (this.namefail) {
          let msg =  checkNameStr(this.linkman,2,15,"收件人姓名").msg;
          this.showToast('', 'text', msg, '20em', '', 'middle')
          return
        }
        if (this.phonefail) {
         let msg =  checkPhoneStr(this.linkTel,"手机号码").msg;
          this.showToast('', 'text', msg, '20em', '', 'middle')
          return
        }
        if (!this.addressvalue) {
          this.showToast('', 'text', '请选择所在地', '20em', '', 'middle')
          return
        }
        if (this.addressdetailfail) {
          let obj =  checkAddress(this.detailAddr,4,50,"详细地址");
          if(!obj.valid){
          this.showToast('', 'text', obj.msg, '20em', '', 'middle')
          return false;
          }
        }
        if(this.postcodefail) {
             let msg =  checkPostcardStr(this.postcode,3,12,"邮编").msg;
          this.showToast('', 'text', msg, '20em', '', 'middle')
          return
        }
        

        let self = this
        let obj = {}
        obj.linkman = this.linkman
        obj.linkTel = this.linkTel
        obj.detailAddr = this.detailAddr
        obj.region_name = this.address
        obj.province_region_id = this.provinceid
        obj.city_region_id = this.cityid
        obj.county_region_id = this.districtid
        obj.village_region_id = this.townid
        obj.hamlet_region_id = this.villageid
        obj.postcode = this.postcode
        obj.isDefault = this.is_default == true ? 1 : 0
        if (this.type == 'add') {
          this.$http.post('uts/user/addressSave', obj)
            .then(function (response) {
              self.showToast('', 'text', '保存成功', '20em', '', 'top')
              self.$router.push({name: 'addressList'})
            })
            .catch(function (error) {
              if(error.msg){
              self.showToast('','text', error.msg,'20em','','middle');
              }
            })
        } else {
          obj.id = this.id
          this.$http.post('uts/user/addressEdit', obj)
            .then(function (response) {
              self.showToast('', 'text', '修改成功', '20em', '', 'middle')
              self.$router.push('/addressList')
            })
            .catch(function (error) {
               if(error.msg){
              self.showToast('', 'text', error.msg, '20em', '', 'middle')
               }
            })
        }
      },
      checkPhone () {
        let reg = /^(((1[3456789][0-9]{1})|(15[0-9]{1}))+\d{8})$/
        let flag = reg.test(this.linkTel)
        if (this.linkTel == '' || this.linkTel.length < 11 || this.linkTel.length > 11) {
          this.showToast('', 'text', '手机号码不能为空且必须为11位', '20em', '', 'middle')
          this.phonefail  = true
        }
        if (!flag) {
          this.showToast('', 'text', '手机号码格式不正确', '20em', '', 'middle')
           this.phonefail  = true
        }
        else{
           this.phonefail  = false
        }
      },
      checkCode () {
         let validobj = checkPostcardStr(value, 3, 12, "邮编");
      if (!validobj.valid) {
        this.postcodefail = true;
      } else {
        this.postcodefail = false;
      }
      return validobj;
      },
      confirmFun () {
        this.$refs.address.show = false
      },
      hidePicker () {
        this.$refs.address.show = false
      },
      regOverEnter (regOver) {
        this.regOver = false
      }

    },
    created () {

    },
    mounted () {
      let addressdetail = this.$store.state.addressdetail
      console.log(addressdetail)
      if (addressdetail != null) {
        this.type = 'change'
        this.id = addressdetail.id
        this.linkman = addressdetail.linkman
        this.detailAddr = addressdetail.detail_addr
        this.address = addressdetail.region_name
        this.linkTel = addressdetail.link_tel
        this.provinceid = addressdetail.province_region_id
        this.cityid = addressdetail.city_region_id
        this.districtid = addressdetail.county_region_id
        this.townid = addressdetail.village_region_id
        this.villageid = addressdetail.hamlet_region_id
        this.postcode = addressdetail.postcode
        this.is_default = addressdetail.is_default == 1
        this.namefail = false;
        this.addressdetailfail = false;
        this.phonefail = false;
        this.postcodefail = false;
      } else {
        this.type = 'add'
      }
    },
    computed: {
       getClass(){
      if(this.detailAddr.replace(/(^\s*)|(\s*$)/g, "").length<4){
        return "redfont"
      }
      else{
        return ""
      }
    },
      addressvalue: {
        get: function () {
          let arr = []
          if (this.address == '') return arr
          else {
            let provinceobj = {}
            let cityobj = {}
            let districtobj = {}
            let townobj = {}
            let villageobj = {}
            let addressarr = this.address.split(' ')
            if (addressarr.length > 4) {
              villageobj.regionName = addressarr[4]
              villageobj.id = this.villageid
              arr.push(villageobj)
            }
            if (addressarr.length > 3) {
              townobj.regionName = addressarr[3]
              townobj.id = this.townid
              arr.push(townobj)
            }
            if (addressarr.length > 2) {
              districtobj.regionName = addressarr[2]
              districtobj.id = this.districtid
              arr.push(districtobj)
            }
            if (addressarr.length > 1) {
              cityobj.regionName = addressarr[1]
              cityobj.id = this.cityid
              arr.push(cityobj)
            }
            if (addressarr.length > 0) {
              provinceobj.regionName = addressarr[0]
              provinceobj.id = this.provinceid
              arr.push(provinceobj)
            }
            return arr.reverse()
          }
        },
        set: function (addressarr) {
          let arr = []
          if (addressarr.length > 4) {
            this.villageid = addressarr[4].id
            arr.push(addressarr[4].regionName)
          }
          if (addressarr.length > 3) {
            this.townid = addressarr[3].id
            arr.push(addressarr[3].regionName)
          }
          if (addressarr.length > 2) {
            this.districtid = addressarr[2].id
            arr.push(addressarr[2].regionName)
          }
          if (addressarr.length > 1) {
            this.cityid = addressarr[1].id
            arr.push(addressarr[1].regionName)
          }
          if (addressarr.length > 0) {
            this.provinceid = addressarr[0].id
            arr.push(addressarr[0].regionName)
          }
          console.log(arr)
          this.address = arr.reverse().join(' ')
        }
      }
    }
  }
</script>

<style scoped>
  /*group去掉边线*/
  .group-clearbd >>> .weui-cells {
    margin-top: 0 !important;
    font-size: 15px;

  }
  .group-clearbd >>> .weui-cells {
    margin-top: 0;
    background: transparent;
  }

  .group-clearbd >>> .weui-cells:before, .group-clearbd >>> .weui-cells:after {
    border: 0 none
  }
  .weui-cell{padding: 14px 15px}
  .weui-cell:before{right:15px}
  .weui-cell >>> .weui-cell__ft {
    font-size: 14px;
    padding-right: 0
  }

  .weui-cell >>> input {
    font-size: 14px;
    color: #999
  }
.redfont >>> span{
color:red
}
  .weui-cell.vux-tap-active >>> .weui-cell__ft {
    padding-right: 18px
  }

  .vux-cell-box >>> .weui-cell {
    padding: 14px 15px;
    font-size: 15px
  }

  .vux-cell-box >>> .weui-cell:before {
    right: 15px
  }

  .vux-cell-box >>> .weui-cell .weui-cell__ft {
    padding-right: 0
  }

  .vux-cell-box >>> .weui-cell.vux-tap-active .weui-cell__ft {
    padding-right: 18px
  }

  .vux-cell-box >>> .weui-cell .vux-cell-value {
    font-size: 14px
  }

  /*文本域*/
  .vux-x-textarea {
    padding: 0;
    font-size: 14px
  }
.defaultvalue{
  position: relative;padding: 4px 0}

  .border-bottom-1px:after{left:15px;right:15px}
</style>
