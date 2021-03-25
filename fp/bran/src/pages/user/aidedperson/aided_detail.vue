<template>
  <div>
    <x-header :left-options="{backText: ''}">受助人信息</x-header>
    <div class="box-withbar over-auto bg-f6f5f6">
      <!--基本信息-->
      <group class="group-clearbd" label-width="10em">
        <group-title slot="title" class="over-hidden">
          <router-link class="color-orange f-14 right_ope" :to="{name: 'aidedmodify',params: {id: aidedpersondetail.id}}" style="top: 6px"><i
            class="iconfont icon-f-text f-20"></i> 修改信息
          </router-link>
          基本信息
        </group-title>
        <cell title="姓名">
          <span class="color-999">{{aidedpersondetail.aided_person_name}}</span>
        </cell>
        <cell title="手机号">
          <span class="color-999" @click="getCall(aidedpersondetail.aided_person_tel)">{{aidedpersondetail.aided_person_tel}}</span>
        </cell>
        <cell title="身份证号">
          <span class="color-999">{{aidedpersondetail.idcard}}</span>
        </cell>
        <cell title="您与受助者关系">
          <span class="color-999">{{aidedpersondetail.relation_id}}</span>
        </cell>
        <cell title="地区">
          <span class="color-999">{{aidedpersondetail.region_name}}</span>
        </cell>
      </group>

      <!--收货地址-->
      <group class="group-clearbd">
        <group-title slot="title" class="over-hidden">
          <router-link class="color-orange f-14 right_ope" :to="addaddress()">+ 添加地址
          </router-link>
          收货地址
        </group-title>
        <template v-for="item in aidedpersondetail.userAddrVOs">
        <cell is-link value-align="left" @click.native="changeaddress(item)">
          <i slot="icon" class="iconfont icon-f-map f-20"></i>
          <div class="addinfo color-333">
            <h1 class="clearfix f-15 f-normal">
              <span class="f_r color-999 f-14">{{item.link_tel}}</span>
              {{item.linkman}}
            </h1>
            <p class="f-14">
              {{item.region_name+item.detail_addr}}
            </p>
          </div>
        </cell>
       <!-- <cell is-link value-align="left" link="aidedaddress">
          <i slot="icon" class="iconfont icon-f-map f-20"></i>
          <div class="addinfo color-333">
            <h1 class="clearfix f-15 f-normal">
              <span class="f_r color-999 f-14">13688321920</span>
              王刚碳
            </h1>
            <p class="f-14">
              湖南省永州市镇江县黄梅乡永州村
            </p>
          </div>
        </cell>-->
        </template>
      </group>

      <!--银行账户-->
      <group class="group-clearbd bank-list mb-12">
        <group-title slot="title" class="over-hidden">
          <router-link class="color-orange f-14 right_ope" :to="addbank()">+ 添加银行账户
          </router-link>
          银行账户
        </group-title>
        <template v-for="item in aidedpersondetail.userBankVOs">
          <cell   @click.native="changebank(item)" class="bank-item" is-link>
              <!-- 银行logo先注释了 -->
            <!-- <img class="v-middle" slot="icon" src="../../../../static/appimg/bank-icon-jianshe.png" width="50"> -->
            <div slot="title">
              <h1 class="f-16 color-333 f-normal">{{item.payee}}</h1>
              <p class="f-14 color-999 tit-nowrap" style="margin-bottom: 10px">{{item.bank_name}} {{item.open_bank}}</p>
            </div>
            <p slot="inline-desc" class="color-333 f-14">{{item.bank_account}}</p>
          </cell>

        </template>
        <!--<cell link="" class="bank-item">
          <img class="v-middle" slot="icon" src="../../../../static/appimg/bank-icon-jianshe.png" width="50">
          <div slot="title">
            <h1 class="f-16 color-333 f-normal">王钢蛋</h1>
            <p class="f-14 color-999 tit-nowrap" style="margin-bottom: 10px">中国建设银行 湖南永州城东城区安定门支行</p>
          </div>
          <p slot="inline-desc" class="color-333 f-14">6212********0540</p>
        </cell>
        <cell link="" class="bank-item">
          <img class="v-middle" slot="icon" src="../../../../static/appimg/bank-icon-zhaoshang.png" width="50">
          <div slot="title">
            <h1 class="f-16 color-333 f-normal">王钢蛋</h1>
            <p class="f-14 color-999" style="margin-bottom: 10px">中国建设银行 东城区安定门支行</p>
          </div>
          <p slot="inline-desc" class="color-333 f-14">6212********0540</p>
        </cell>-->
      </group>


    </div>

    <!--底部操作按钮-->
    <div class="fix-bottom btm-ope clearfix bg-ffffff">
      <router-link to   @click.native="gopublish" class="f_r btn-bordered btn-bordered-gray f-14" style="margin-right: 0">发需求</router-link>
      <!-- <router-link to="" class="f_r btn-bordered btn-bordered-gray f-14" style="margin-right:15px">历史需求</router-link> -->
      <router-link to="" @click.native="delAidedPerson" class="f_r btn-bordered btn-bordered-gray f-14" style="margin-right:15px">删除</router-link>
    </div>
    <div v-transfer-dom>
                <confirm v-model="show"
                    :title = 'title'
                    :confirm-text = 'confirm'
                    :cancel-text = 'cancel'
                    @on-cancel = "onCancel"
                    @on-confirm = "onConfirm">
                </confirm>
            </div>
  </div>
</template>

<script>
  import {XHeader, Group, GroupTitle, Confirm,Cell,TransferDomDirective as TransferDom} from 'vux'
  import {mapActions} from "vuex";
  import {mapState} from "vuex"
  import * as types from '../../../store/mutation-types.js'
  export default {
    name: "aided_detail",
    directives: {
        TransferDom
    },
    components: {XHeader, Group, GroupTitle, Cell,Confirm},
    data() {
        return {
            relationName:'',
            aidedName:'',
            show: false,
            title:'您确认删除此受助人?',
            confirm: '确认',
            cancel: '取消',
        }
    },
    created() {
      // 在页面挂载前就发起请求
      this.getAidedPersonDetail();

      console.log(this.alljson.recipients);
    },
    destroyed(){
       this.$store.commit(types.SET_AIDEDPERSON_DETAIL, {})
    },
    methods: {
      ...mapActions(["getAidedPersonDetail"]),
      async getAidedPersonDetail(){
       await this.$store.dispatch("getAidedPersonDetail",this)
        this.getRelation()
      },
      gopublish(){
      // window.nativeTabbar.selectedIndex(2)
          this.$router.push('/publish')
      },
      addaddress(){
        this.$store.state.addressdetail = null;
        debugger
        return "/aidedaddress/"+this.$route.params.id
      },
      changeaddress(item){
        this.$store.state.addressdetail = item;
        this.$router.push("/aidedaddress/"+this.$route.params.id)
        console.log( this.$store.state.addressdetail)
      },
    getRelation(){
       let relation = this.alljson.recipients.find(item =>
           item.value === this.aidedpersondetail.relation_id|| item.name === this.aidedpersondetail.relation_id
       )
       console.log(relation)
       //this.relationName = relation.name;
       this.aidedpersondetail.relation_id = relation.name;

   },
      addbank(){
        this.$store.state.bankdetail = null;
        return "/aidedbank/"+this.$route.params.id
      },
      changebank(item){
        this.$store.state.bankdetail = item;
        this.$router.push("/aidedbank/"+this.$route.params.id)
      },
        getCall(phoneNum){
          console.log(phoneNum)
          if(phoneNum != ''){
            // api.call({
            //     type: 'tel_prompt',
            //     number: phoneNum
            // });
        }

      },
      onCancel() {
          this.show = false;
      },
      onConfirm() {
           this.$http.post('hts/poor/userDel',{'id' :this.aidedpersondetail.id})
        .then(res => {
            this.showToast('','text','删除成功');
            this.$router.push('/aidedperson');
        })
      },
    //删除受助人
    delAidedPerson() {
        this.show = true;
    }


  },
  computed:{
    ...mapState(['alljson']),
    aidedpersondetail:function(){
      return this.$store.state.aidedpersondetail;
    }
  }

  }
</script>

<style scoped>
  /*group header右侧操作*/
  .group-clearbd >>> .weui-cells {
    margin-top: 0 !important;
    font-size: 15px;

  }

  .group-clearbd >>> .weui-cells:after {
    border: 0 none
  }

  .group-clearbd >>> .weui-cells:before {
    border: 0 none
  }

  .weui-cells__title {
    margin: 0;
    padding: 12px 15px;
    position: relative;
    font-size: 15px;
  }

  .right_ope {
    position: absolute;
    right: 15px;

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
    padding: 4px 0 4px 15px
  }

  .addinfo p {
    padding-top: 6px
  }

  /*银行卡列表*/
  .bank-item >>> .vux-cell-primary {
    overflow: hidden
  }

  .bank-item {
    padding: 15px
  }

  .bank-item >>> .vux-cell-primary {
    padding: 0 0 0 15px
  }

  .bank-item h1 {
    padding-bottom: 10px
  }

  .bank-item h1 span {
    padding-left: 10px
  }

  /*底部操作栏*/
  .btm-ope {
    padding: 12px 15px;
    border-top: 1px solid #eee;
    box-shadow: 0 -1px 12px rgba(0, 0, 0, 0.15);
  }
</style>
