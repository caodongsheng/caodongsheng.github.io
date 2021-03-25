<template>
  <div>
    <x-header :left-options="{backText: '',preventGoBack:true}"  @on-click-back="goback">地址管理</x-header>
    <div class="box-withheader over-auto  bg-f6f5f6">
      <!--if没有地址-->
      <div v-if="addressList.length==0" class="nocontent f-14 color-999 text-center" style="padding: 30px 15px">
        <img class="dis-block" src="../../../../../static/appimg/no-address.png" style="width:90px;margin:0 auto">
        <p style="margin-top: 15px">暂无地址</p>
      </div>
      <!--地址列表-->
      <div v-else class="address-list">
        <group class="group-clearbd">
          <cell value-align="left" class="bg-ffffff mb-12" v-for="(item,index) in addressList" :key="index" v-show="isDelete(item)">
            <div class="addinfo color-333">
              <h1 class="clearfix f-17 f-normal">
                <span class="f_r color-999 f-15">{{item.link_tel}}</span>
                {{item.linkman}}
              </h1>
              <p class="f-14">
                {{item.region_name}}    {{item.detail_addr}}
              </p>
            </div>
            <div class="addope border-top-1px clearfix f-14">
              <!-- <span class="f_l" v-if="item.is_default"><i class="iconfont icon-f-succ f-17 color-orange"></i> 默认地址</span> -->
              <check-icon :value.sync="checkBox.items[index]" type="plain" selected-label-style="{color: '#FF9900'}" @click.native="changeDefault(item,index)">默认地址</check-icon>
              <span class="f_r dis-inline"><i class="iconfont icon-f-del f-14" @click="deleteaddress(item)"></i> 删除</span>
              <router-link class="f_r dis-inline color-999" style="margin-right: 30px" to="/addressAdd" @click.native="changeAddress(item)"><i class="iconfont icon-f-edit2 f-13"></i> 编辑</router-link>
            </div>
          </cell>

        </group>
      </div>
      <!--底部按钮-->
      <div class="btm-ope" :class="addressList.length>0?'':'fix-bottom'">
        <router-link  @click.native="addressAdd()" to="/addressAdd" class="btn-orange-lg dis-block text-center color-white">添加新地址</router-link>
      </div>
    </div>

    <div v-transfer-dom>
        <confirm v-model="show"
                :title = 'title'
                :confirm-text = 'confirm'
                :cancel-text = 'cancel'
                @on-confirm = "onConfirm">
        </confirm>
    </div>
  </div>
</template>

<script>
  import {XHeader, Group, Cell,Toast,Confirm,TransferDomDirective as TransferDom,CheckIcon,} from 'vux'
  import {mapActions,mapState} from "vuex";
  export default {
    directives: {
        TransferDom
    },
    components: {XHeader, Group, Cell,Toast,Confirm,CheckIcon},
    name: "addressList",
    data() {
      return {
           title: '确认删除该条地址?',
            confirm: '确认',
            cancel: '取消',
            show: false,
            addressId: '',
            addressList: [],
            checkBox: {
                checked: false,
                items: {}
            },
      }

    },
   
    methods:{
    //   ...mapActions(["getUserAddressList"]),
      changeAddress(item){
        this.$store.state.addressdetail = item;

      },
      addressAdd(){
        this.$store.state.addressdetail = null;
      },
       getUserAddressList(){
            // await this.$store.dispatch("getUserAddressList",this)
            this.$http.post('uts/user/addressList')
            .then(res => {
                this.addressList = res.data
                this.addressList.forEach((item ,index) => {
                    if(item.is_default === 1) {
                        this.checkBox.items[index] = true;
                    }else {
                        this.checkBox.items[index] = false;
                    }
                })
            })
            // .catch(err => {
            //     this.showToast('','text',err.msg,'20em','','middle')
            // })
            

      },
      isDelete(item){
        if(item.isdelete){
          return false
        }
        return true
      },
      deleteaddress(item){
          this.show = true;
          this.addressId = item.id
        // let self = this;
        // let deleid = item.id
        // this.$http.post('uts/user/addressDelete',{addrId:deleid})
        //   .then(function (response) {
        //     if (response.data == "SUCCESS") {
        //     //   alert("删除成功")
        //       self.showToast('','text','删除成功','20em','','top');
        //       self.$store.dispatch("getUserAddressList",self)
        //       self.$set(item,"isdelete",true);

        //     }
        //     else {
        //       //alert(response.msg)
        //       this.showToast('','text',response.msg,'20em','top');
        //     }
        //   })

      },
      onConfirm() {
          this.addressList.forEach((item) =>  {
              if(item.id === this.addressId) {
                  this.$http.post('uts/user/addressDelete', {addrId: item.id})
                  .then(res => {
                      this.showToast('','text','删除成功','20em','','middle');
                      this.getUserAddressList()
                      
                  })
                  .catch(err => {
                    if(err.msg)
                      this.showToast('','text',err.msg,'20em','','middle');
                  })
              }
          })
      },
      changeDefault(item,index) {
            // if(this.checkBox.items[index] == true) {
            //     console.log('1111')
            //     this.checkBox.items[index] = false;
            // }else {
            //     this.checkBox.items[index] = true;
            // }
            let obj = {};
            obj.linkman = item.linkman;
            obj.linkTel = item.link_tel;
            obj.detailAddr = item.detail_addr;
            obj.region_name = item.region_name;
            obj.province_region_id = item.province_region_id;
            obj.city_region_id = item.city_region_id;
            obj.county_region_id = item.county_region_id;
            obj.postcode = item.postcode;
            obj.id = item.id;
            if(this.checkBox.items[index] === true) {
                obj.isDefault = 1;
            }else {
                obj.isDefault = 0;
            }
            this.$http.post('uts/user/addressEdit', obj)
            .then(res => {
                this.showToast('', 'text', '修改成功', '20em', '', 'middle');
                this.getUserAddressList();
                this.$router.replace('/setting');
            })

      },
      goback(){
        this.$router.push("/setting")
      }

    },
    created() {
        this.checkBox.items = {}
      // 在页面挂载前就发起请求
      this.getUserAddressList();
    },
    mounted() {
        this.addressList.forEach((item ,index) => {
            if(item.is_default === 1) {
               this.checkBox.items[index] = true;
            }
        })
    },
    computed:{
    //   addresslist:function(){
    //      return this.$store.state.user_addresslist;
    //  }
    }
  }
</script>

<style scoped>
  /*group去掉边线*/

  .group-clearbd >>> .weui-cells {
    margin-top: 0;
    background: transparent;
  }

  .group-clearbd >>> .weui-cells:before, .group-clearbd >>> .weui-cells:after {
    border: 0 none
  }
  .weui-cell{padding: 14px 15px}
  .weui-cell:before{border:0 none}
  /*地址*/
  .addinfo {
    padding: 4px 0 4px 0
  }

  .addinfo p {
    padding-top: 10px
  }
.addope{padding: 14px 0 0 0;margin-top:14px}
  /*底部按钮*/
  .btm-ope {
    padding: 10px 40px 30px 40px;
    margin-top: 30px;
  }
</style>
