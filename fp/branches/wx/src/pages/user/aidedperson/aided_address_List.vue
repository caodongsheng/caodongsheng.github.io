<template>
  <div>
    <x-header :left-options="{backText: ''}">收货地址</x-header>
    <div class="box-withheader over-auto bg-f6f5f6">
      <scroller :on-refresh="refresh">
        <group class="group-clearbd ">
          <template v-for="(item,index) in aidederAddressList">
            <cell value-align="left" class="bg-ffffff mb-12" >
              <div class="addinfo color-333">
                <h1 class="clearfix f-15 f-normal">
                  <span class="f_r color-999 f-14">{{item.link_tel}}</span>
                  {{item.linkman}}
                </h1>
                <p class="f-14">
                  {{item.detail_addr}}
                </p>
              </div>
              <div class="addope border-top-1px clearfix f-14">
              <span class="f_l" @click="chengeDefault(index,item)"><i
                class="iconfont  f-17  icon-f-succ"  :class="index===defaultIndex?'color-orange':'color-gray'"></i> 默认地址</span> 
                 <!-- <span class="f_l"><i
                class="iconfont  f-17 color-orange"></i> 默认地址</span>
                 <check-icon  :value="setDefault(index,item)" @click.native="chengeDefault(item)"></check-icon> 默认地址 -->
                <span class="f_r dis-inline" @click.stop="deleteaddress(item)">
                <i class="iconfont icon-f-del f-14"></i> 删除
              </span>
                <span class="f_r dis-inline color-999" style="margin-right: 30px" @click.stop="changeaddress(item)">
                <i class="iconfont icon-f-edit2 f-13"></i> 编辑
              </span>
              </div>
            </cell>
          </template>
        </group>
        <!--底部按钮-->
        <div class="btm-ope">
          <div @click="addaddress" class="btn-orange-lg dis-block text-center color-white">添加新地址</div>
        </div>
      </scroller>


    </div>

    <div v-transfer-dom>
      <confirm v-model="showconfirm" title="" confirm-text="确认" cancel-text="取消" @on-confirm="onConfirm()">
        <p style="text-align:center;">确认要删除吗?</p>
      </confirm>
    </div>
   <div v-transfer-dom>
      <confirm v-model="showdefaultconfirm" title="" confirm-text="确认" cancel-text="取消" @on-confirm="onDefaultConfirm()">
        <p style="text-align:center;">确认要设置此地址位默认地址?</p>
      </confirm>
    </div>
    <!-- <p class="loading" style="text-align:center;" v-show="showLoading">
      <inline-loading></inline-loading>
    </p> -->
  </div>

</template>

<script>
  import {mapState} from 'vuex';
  import {XHeader, Group, GroupTitle, Cell, TransferDom, Confirm,InlineLoading,CheckIcon} from 'vux'
  import * as types from '../../../store/mutation-types.js'

  export default {
    name: "aided_address_List",
    components: {XHeader, Group, GroupTitle, Cell, TransferDom, Confirm,InlineLoading,CheckIcon},
    directives: {
      TransferDom
    },
    beforeRouteLeave(to, from, next) {
      if (this.index !== -1) {
        to.meta.addressIndex = this.index
      }
      next()
    },
    computed: {
      ...mapState(['aidederAddressList', 'aidpersondata', 'demandDetail']),
      helpId() {
        if (this.aidpersondata) {
          return this.aidpersondata.helpId
        } else {
          return this.demandDetail.aideder_user_id
        }

      },
      defaultIndex() {
        let arr = this.aidederAddressList.filter(item => item.is_default === 1)
        if (arr.length === 0) {
          return 0
        } else {
          for (let i = 0; i < this.aidederAddressList.length; i++) {
            if (this.aidederAddressList[i].is_default === 1) {
              return i
            }
          }
        }

      }
    },
    data() {
      return {
        showconfirm: false,
        deleteId: '',
        setdefaultId:"",
        index: -1,
        showdefaultconfirm:false,
      }
    },
    methods: {
      async onDefaultConfirm(){
        
       let obj = {};
       obj.id = this.setdefaultId;
       obj.userId = this.helpId;
       obj.isDefault = 1;
        try {
          await this.$http.post('hts/poor/addressEdit', obj)
        } catch (e) {
          this.showToast('', 'text', e.msg?e.msg:"修改失败！")
          return
        }
       // this.$store.commit(types.DEL_AIDEDER_ADDRESS_, this.deletedId)
        //this.aidederAddressList = this.aidederAddressList.filter(item => item.id !== this.deletedId)
        await this.$store.dispatch('getAidederAddressList', {_this: this, aidedId: this.helpId})
        this.index = -2
      },
      setDefault(index,item) {
          let arr = this.aidederAddressList.filter(item => item.is_default === 1)
        if (arr.length === 0) {
          if(index==0) return true;
          else return false
        } else {
          if(item.is_default==1) return true;
          else return false;
         
        }
      },
      chengeDefault(index,item){
    
       if(index==this.defaultIndex) return ;
       else {
         this.showdefaultconfirm = true;
         this.setdefaultId = item.id;
       }
      },
      goBack(index) {
        // this.index = index
        // this.$router.go(-1)
      },
      addaddress() {
        this.$store.state.addressdetail = null;
        this.$router.push("/aidedaddress/"+this.helpId)
      },
      changeaddress(item) {
        this.$store.state.addressdetail = item;
        this.$router.push("/aidedaddress/"+this.helpId)
      },
      deleteaddress(item) {
        this.showconfirm = true;
        this.deletedId = item.id
      },
      async onConfirm() {
      
        try {
          await this.$http.post('hts/poor/addressDelete', {addrId: this.deletedId})
        } catch (e) {
          this.showToast('', 'text', '删除失败')
          return
        }
        this.$store.commit(types.DEL_AIDEDER_ADDRESS_, this.deletedId)
        //this.aidederAddressList = this.aidederAddressList.filter(item => item.id !== this.deletedId)
        await this.$store.dispatch('getAidederAddressList', {_this: this, aidedId: this.helpId})
        this.index = -2
      },
      async refresh(done) {
        await this.$store.dispatch('getAidederAddressList', {_this: this, aidedId: this.helpId})
        done(true)
      },
    }
  }
</script>

<style scoped>
  /*group header右侧操作*/
  .group-clearbd >>> .weui-cells {
    margin-top: 0 !important;
    font-size: 15px;
    background: transparent;
  }

  .group-clearbd >>> .weui-cells:after {
    border: 0 none
  }

  .group-clearbd >>> .weui-cells:before {
    border: 0 none
  }

  /*cell部分*/
  .weui-cell {
    padding: 14px 15px;
    font-size: 15px
  }

  .weui-cell:before {
    right: 15px
  }

  .weui-cell >>> .weui-cell__ft {
    font-size: 14px;
    padding-right: 0
  }

  .weui-cell.vux-tap-active >>> .weui-cell__ft {
    padding-right: 18px
  }

  /*地址*/
  .addinfo {
    padding: 4px 0 4px 0px
  }

  .addinfo p {
    padding-top: 6px
  }

  .addope {
    padding: 14px 0 0 0;
    margin-top: 14px
  }

  .btm-ope {
    padding: 10px 40px 30px 40px;
    margin-top: 30px;
  }

  /*弹窗样式*/
  .vux-confirm >>> .weui-dialog__btn_primary {
    color: #fff;
    background: #f37306
  }

  .vux-confirm >>> .weui-dialog__ft {
    font-size: 16px
  }

  .vux-confirm >>> .weui-dialog__bd {
    font-size: 16px
  }
/*加载*/
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
</style>
