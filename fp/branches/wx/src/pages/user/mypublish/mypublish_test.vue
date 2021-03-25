<template>
    <div>
      <x-header :left-options="{backText: ''}" >发布的需求<a slot="right" class="color-orange f-16">发布需求</a></x-header>
      <div class="box-withheader over-auto bg-f6f5f6">
        <div class="publish-catelist bg-ffffff text-center">
          <grid :show-vertical-dividers="true" :show-lr-borders="false" :cols="2">
            <grid-item v-for="(item,index) in iconlist" :key="index" :link="item.url">
              <img :src="item.icon" width="22" class="v-middle"><span class="f-16" style="padding-left: 8px">{{item.name}}</span>
              <p class="text-center f-14  color-999">{{item.totle}}条</p>
            </grid-item>
          </grid>
        </div>

      </div>
    </div>
</template>

<script>
  import {XHeader,Grid,GridItem} from 'vux'
    export default {
        name: "mypublish",
      components:{XHeader,Grid,GridItem},
      data(){
          return{
            iconlist:[{
              url: '/mypublist',
              icon: './static/appimg/user-pub-all.png',
              name: '全部需求',
              totle:4
            },{
              url: '/mypublist',
              icon: './static/appimg/user-pub-yl.png',
              name: '医疗需求',
              totle:2
            },{
              url: '/mypublist',
              icon: './static/appimg/user-pub-jy.png',
              name: '教育需求',
              totle:0
            },{
              url: '',
              icon: './static/appimg/user-pub-zf.png',
              name: '住房需求',
              totle:0
            },{
              url: '',
              icon: './static/appimg/user-pub-ms.png',
              name: '民生需求',
              totle:0
            },{
              url: '',
              icon: './static/appimg/user-pub-wp.png',
              name: '物品需求',
              totle:0
            }]


          }
      }
    }
</script>

<style scoped>
  .weui-grids:before{border:0 none}
  .weui-grid{padding: 30px 10px}
</style>
