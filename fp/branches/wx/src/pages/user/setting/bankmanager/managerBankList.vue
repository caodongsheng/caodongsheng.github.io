<template>
  <div>
    <x-header :left-options="{backText: '',preventGoBack:true}"  @on-click-back="goback">银行账号</x-header>
    <div class="box-withheader over-auto  bg-f6f5f6">
      <!--if没有地址-->
      <div v-if="banklist.length==0" class="nocontent f-14 color-999 text-center" style="padding: 30px 15px">
        <img class="dis-block" src="../../../../../static/appimg/no-address.png" style="width:90px;margin:0 auto">
        <p style="margin-top: 15px">暂无账号</p>
      </div>
      <!--地址列表-->
      <div v-else class="address-list">
        <group class="group-clearbd">
          <cell value-align="left" class="bg-ffffff mb-12" v-for="(item,index) in banklist" :key="index" v-show="isDelete(item)">
            <div class="bankinfo color-333">
              <h1 class="clearfix f-17 f-normal">
                <span class="f_r color-999 f-15">{{item.bank_name}}</span>
                {{item.payee}}
              </h1>
              <p class="f-14">
               开户行： {{item.open_bank}}
              </p>
              <p class="f-14">
                银行卡号： {{item.bank_account}}
              </p>
            </div>
            <div class="addope border-top-1px clearfix f-14">
              <span class="f_l" v-if="item.is_default"><i class="iconfont icon-f-succ f-17 color-orange"></i> 默认账号</span>
              <span class="f_r dis-inline" @click="deletebank(item)"><i class="iconfont icon-f-del f-14"></i> 删除</span>
              <router-link class="f_r dis-inline color-999" style="margin-right: 30px" to="/managerBankAdd" @click.native="changeBank(item)"><i class="iconfont icon-f-edit2 f-13"></i> 编辑</router-link>
            </div>
          </cell>

        </group>
      </div>
      <!--底部按钮-->
      <div class="btm-ope" :class="banklist.length>0?'':'fix-bottom'">
        <router-link to="/managerBankAdd" class="btn-orange-lg dis-block text-center color-white" @click.native="addBank()">添加新账号</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import {XHeader, Group, Cell} from 'vux'
  import {mapActions} from "vuex";
  export default {
    components: {XHeader, Group, Cell},
    name: "managerBankAdd",
    data() {
      return {
      /*  hasList: true, // 是否有地址
        banklist:[{
          username:'王刚弹',
          bankname:'中国工商银行',
          openbank:'湖南省永州市镇江县黄梅乡永州村',
          banknum:'6222************4324',
          isDefault:true
          }, {
          username:'张三丰',
          bankname:'中国建设银行',
          openbank:'湖南省永州市镇江县黄梅乡永州村',
          banknum:'6222************4324',
          isDefault:false
          }
        ]*/
      }
    },
    methods:{
      ...mapActions(["getUserBankList"]),
      getUserBankList(){
        this.$store.dispatch("getUserBankList",this)
      },
      addBank(){
        this.$store.state.bankdetail = null;
      },
      isDelete(item){
        if(item.isdelete){
          return false
        }
        return true
      },
      deletebank(item){
        let self = this;
        let deleid = item.id;
        this.$http.post('uts/user/bankDelete',{bankId:deleid})
          .then(function (response) {
            if (response.data == "SUCCESS") {
              self.$store.dispatch("getUserBankList",self)
              self.$set(item,"isdelete",true);
            }
            else {
              //alert(response.msg)
              self.showToast('','text',response.msg,'20em','top');
            }
          })
      },
      changeBank(item){
        this.$store.state.bankdetail = item;
      },
      goback(){
        this.$router.push("/setting")
      }

      },
      created() {
        // 在页面挂载前就发起请求
        this.getUserBankList();
      },
    computed:{
      banklist:function(){
        return this.$store.state.user_banklist;
      }
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

  .bankinfo p {
    padding-top: 10px
  }
.addope{padding: 14px 0 0 0;margin-top:14px}
  /*底部按钮*/
  .btm-ope {
    padding: 10px 40px 30px 40px;
    margin-top: 30px;
  }
</style>
