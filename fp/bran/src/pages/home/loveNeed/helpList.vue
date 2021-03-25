<template>
  <div class="helpRank"  @click="jumpDetails">
    <div class="helpRank-lf">
      <img class="huangguan" src="../../../../static/appimg/crown.png" alt="图片地址不正确">
      <p>帮扶榜</p>
    </div>
    <div class="helpRank-middle">
      <span v-if="vos3.length>0" v-for="(item,index) in vos3" :key='index'>
        <avatar width="30" height="30" :image="item.user_pic"  tsize="2" :name="item.nick_name"></avatar>
      </span>
      <p v-show="vos.length==0">暂无帮扶记录</p>
    </div>
    <i v-if="vos.length>3" class="helpRank-rg fa fa-chevron-right"></i>
  </div>
</template>

<script>
  import avatar from '../../../components/util/avatar'

  export default {
    components: {avatar},
    props: ['paramsID'],
    data () {
      return {
        vos: [], // 排行榜全部的内容
        vos3: [] // 排行榜前三个
      }
    },
    created () {
      let _this = this
      this.$http.post('hts/help/getHelpList', {
        demand_id: _this.paramsID
      })
        .then(function (response) {
          if (response.code == 'HTSI0000') {
            _this.vos = response.data.vos
            _this.vos3 = _this.vos.slice(0, 3)
          } else {
            _this.showToast('', 'text', '请求异常', '', 'middle')
          }
        })
        .catch(function (error) {
          _this.showToast('', 'text', '请求异常', '', 'middle')
        })
    },
    methods: {
      jumpDetails () {
        if (this.vos.length > 2) {
          this.$router.push({path: '/poverty/' + this.paramsID})
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .helpRank
    display flex
    padding 10px 18px
    margin-bottom 10px
    align-items center
    color #333
    background #fff
  .helpRank-lf
    display flex
    align-items center
    p
      padding 0 13px 0 8px
    .huangguan
      width: 19px;
      height: 15px !important;
  .helpRank-middle
    flex 1
    span
      display inline-block
      margin-right 11px
  .helpRank-rg
    color #bbb
</style>
