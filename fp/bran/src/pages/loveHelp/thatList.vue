<template>
  <div>
  <x-header :left-options="{backText: ''}" >证明列表<a slot="right" class="color-orange f-16">我来证明</a></x-header>

    <div>
      <panel :list="list1" :type="type"></panel>
    </div>

  </div>
</template>

<script>
  import { XHeader, Panel } from 'vux'
  export default {
    components: {
      XHeader,
      Panel
    },
    data () {
      return {
        type: '5',
        list1: [{
          src: './static/appimg/zmlb_head-.png',
          fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          title: '内蒙古自治区 乌兰察布市土默特右旗扶贫办 <img src="./static/appimg/zmlb_head_logo.png">',
          desc: '情况属实，请大家多多帮助',
          url: '/component/cell',
          meta: {
            source: '',
            date: '2018-9-19',
            other: '14:30:21'
          }
        },
          {
            src: './static/appimg/zmlb_head-.png',
            fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
            title: '公益天使 <span >已实名</span><span >亲戚</span>',
            desc: '情况属实，请大家多多帮助',
            url: '/component/cell',
            meta: {
              source: '',
              date: '2018-9-19',
              other: '14:30:21'
            }
          },
          {
            src: './static/appimg/zmlb_head-.png',
            fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
            title: '内蒙古自治区 乌兰察布市土默特右旗扶贫办 <img src="./static/appimg/zmlb_head_logo.png">',
            desc: '情况属实，请大家多多帮助',
            url: '/component/cell',
            meta: {
              source: '',
              date: '2018-9-19',
              other: '14:30:21'
            }
          },
        ],

      }
    }
  }
</script>

<style scoped>
  .weui-media-box__title {
    color: #39aede;
  }
  .weui-media-box__title img{
    vertical-align:middle;
  }
  .weui-media-box__title span{
    border: 1px solid #f37306;
    border-radius:5px ;
    float: right;
    color: #f37306;
  }
  .weui-media-box__desc{
    font-size: 19px!important;
  }
</style>
