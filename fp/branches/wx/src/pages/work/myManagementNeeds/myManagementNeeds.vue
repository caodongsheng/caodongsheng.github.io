<template>
  <div>
    <x-header :left-options="{backText: ''}">我管理的需求

    </x-header>
    <div class="box-withheader over-auto bg-f6f5f6">
      <div class="publish-catelist bg-ffffff text-center">
        <grid :show-vertical-dividers="true" :show-lr-borders="false" :cols="2">
          <grid-item v-for="(item,index) in iconlist" :key="index"
                     :link="{name: 'myManagement_list', params: {typeCode: item.typeCode,header:item.name}}">
            <img :src="item.icon" width="22" class="v-middle">
            <span class="f-16" style="padding-left: 8px">{{item.name}}需求</span>
            <p class="text-center f-14  color-999">{{data[item.name]?data[item.name]:0}}条</p>
          </grid-item>
        </grid>
      </div>
    </div>

    <!--未实名认证提示弹窗-->
    <div v-transfer-dom>
      <confirm v-model="showconfirm" title="" confirm-text="马上去认证" cancel-text="取消" @on-confirm="onConfirm()">
        <p style="text-align:center;">您还未进行实名认证，请通过认证后再发布需求！</p>
      </confirm>
    </div>

  </div>
</template>

<script>
  import {XHeader, Grid, GridItem,TransferDom, Confirm} from 'vux'

  export default {
    name: "mypublish",
    components: {XHeader, Grid, GridItem,TransferDom, Confirm},
    directives: {TransferDom},
    created() {
      this.getData()
    },
    data() {
      return {
        showconfirm: false,
        iconlist: [
          {
            icon: 'static/appimg/user-pub-all.png',
            name: '全部',
            typeCode: 0
          },
          {
            icon: 'static/appimg/user-pub-yl.png',
            name: '医疗',
            typeCode: 2
          },
          {
            icon: 'static/appimg/user-pub-jy.png',
            name: '教育',
            typeCode: 1
          },
          {
            icon: 'static/appimg/user-pub-zf.png',
            name: '住房',
            typeCode: 3
          },
        //   {
        //     icon: 'static/appimg/user-pub-ms.png',
        //     name: '民生',
        //     typeCode: 5
        //   },
          {
            icon: 'static/appimg/user-pub-wp.png',
            name: '物品',
            typeCode: 4
          }],
        data: {}
      }
    },
    methods: {
      async getData() {
        let res = await this.$http.post('hts/management/demandTypeNums')
        this.data = res.data
      },
      publishDemand(){
        if (this.$store.state.user.is_certification == 1) {
          this.$router.push('/publish')
        } else {
          this.showconfirm = true
        }
      },
      onConfirm() {
        this.$router.push('/setrealname/0')
      }
    }
  }
</script>

<style scoped>
  .weui-grids:before {
    border: 0 none
  }

  .weui-grid {
    padding: 30px 10px
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
</style>
