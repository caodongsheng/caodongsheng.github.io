<template>
  <div class="needProve-container">
    <!--需求证明-->
    <p class="needProve-title">需求证明</p>
    <div class="content-container">
      <div class="prove-content" v-for="(items,index) in proveListData" :key="index">
        <div class="content-left">
          <p>{{items.user_type}}</p>
        </div>
        <div class="content-right">
          <p class="right-content">{{items.real_name}}</p>
          <p class="right-tip" v-for="(item,index) in items.content" :key="index"><i
            class="fa fa-check-circle"></i><span>{{item}}</span></p>
        </div>
      </div>
      <!--平台声明-->
      <div class="prove-content">
        <div class="content-left">
          <p>平台声明</p>
        </div>
        <div class="content-right">
          <p class="plat-declare">以上信息是个人求助信息，由当地扶贫干部审核确定真实性，不属于慈善募捐，感谢您的关注和爱心付出。</p>
        </div>
        <div class="content-bottom clear"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import avatar from '../../../../components/util/avatar'
  import { TransferDom, Confirm} from 'vux'

  export default {
    directives: {TransferDom},
    components: {avatar,Confirm},
    props: ['paramsID'],
    data() {
      return {
        proveID: 0,
        proveListData: [],
        toprove: [], // 已有63人为他证明
        provePeople:false,
        peopleCount:0,
        showconfirm: false
      }
    },
    methods: {
      proveTab: function (proveID) {
        this.proveID = proveID
      },
    },
    created() {
      // 需求证明
      let _this = this
      this.$http.post('hts/help/getDemandProof', {
        demand_id: this.paramsID
      })
        .then(function (response) {
          _this.proveListData = response.data.vos;
        })
        .catch(function (error) {
        })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .needProve-container
    padding 0 17px 20px
    margin-bottom 10px
    background #fff
    .needProve-title
      padding 16px 0 17px
      font-size 16px
      color #333
    .content-container
      padding 0 12px
      background #F6F6F6
      border-radius 9px
      .prove-content
        position relative
        display flex
        padding 15px 0
        &:after
          position absolute
          bottom 0
          width 100%
          content ""
          border-top 1px solid #E5E5E5
        .content-left
          flex 0 0 26.6666%
          font-size 13px
          color #333
        .content-right
          felx 1
          p
            &:last-child
              margin-bottom 0
          .plat-declare
            color #999
            font-size 13px
          .right-content
            margin-bottom 12px
            color #666
            font-size 13px
          .right-tip
            display flex
            align-items center
            margin-bottom 10px
            font-size 12px
            color #78C06E
            span
              margin-left 5px

      .complaint
        padding 15px 0
        font-size 12px
        text-align center
        a
          color #999
    .reference-title
      padding 20px 0 0
      font-size 15px
      color #333
      .toproveLink
        float right
        color #F37306
        text-decoration underline
    .reference-list
      display flex
      margin 20px 0 13px
      &.active
        justify-content space-between
      li
        position relative
        margin-right 5%
        &.arrow
          &:after
            position absolute
            left 25%
            bottom -13px
            border-left 7px solid transparent
            border-bottom 7px solid #F6F6F6
            border-right 7px solid transparent
            border-top 0px solid #F6F6F6
            content ""
      li,.moreProve
        .bd-radius-cir
          width 35px
          height 35px
          border-radius 50%
    .reference-content
      padding 12px 13px
      background-color #F6F6F6
      border-radius 4px
      p
        &:first-child
          color #39AEDE
          font-size 14px
          margin-bottom 10px
          i
            margin-left 5px
        &:last-child
          color #999
          font-size 13px
</style>
