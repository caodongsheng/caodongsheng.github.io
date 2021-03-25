<template>
  <div>
    <x-header :left-options="{backText: ''}">帮扶中</x-header>
    <div class="box-withheader over-auto bg-f6f5f6">

      <!--搜索框-->
      <div class="search-white">
        <x-input title="" placeholder="搜索">
          <i slot="label" class="fa fa-search" aria-hidden="true"></i>
        </x-input>
      </div>
      <!--搜索结果和筛选-->
      <div class="aid-infoarea">
        <span class="f-14 ser-resnum color-999">搜索结果：3244人</span>
        <select-tab ref="selectTab" :datas='selects' @getdatas="getdatas"></select-tab>
      </div>
      <!--用户列表-->
      <div class="personlist over-auto">
        <!--分组-->
        <div class="list-group ">
          <div class="list-letter color-333 f-14">A</div>
          <router-link to="" class="list-item flex-tab linkonly  bg-ffffff">
            <div class="flex-tab-cell tab-left v-middle" style="width:55px">
              <img class="dis-block v-middle bd-radius-cir" width="45" src="../../../../static/appimg/user-photo01.jpg"
                   alt="">
            </div>
            <div class="flex-tab-cell tab-right v-middle">
              <div class="top clearfix">
                <span class="f_l color-333 f-16 f-bold">张小三</span><badge text="贫困户"  class="f_l f-12 badge-red"></badge>
                <span class="f_r color-333 f-16 f-bold">13669448829</span>
              </div>
              <p class="tit-nowrap color-999 f-14">乌鲁木齐乌鲁木齐乌鲁木齐乌鲁木齐乌鲁木齐乌鲁木齐</p>
            </div>
          </router-link>
          <router-link to="" class="list-item flex-tab linkonly  bg-ffffff">
            <div class="flex-tab-cell tab-left v-middle" style="width:55px">
              <img class="dis-block v-middle bd-radius-cir" width="45" src="../../../../static/appimg/user-photo01.jpg"
                   alt="">
            </div>
            <div class="flex-tab-cell tab-right v-middle">
              <div class="top clearfix">
                <span class="f_l color-333 f-16 f-bold">张小三</span>
                <span class="f_r color-333 f-16 f-bold">13669448829</span>
              </div>
              <p class="tit-nowrap color-999 f-14">乌鲁木齐乌鲁木齐乌鲁木齐乌鲁木齐乌鲁木齐乌鲁木齐</p>
            </div>
          </router-link>


        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import selectTab from '@/components/select/selectTab'
  import {XHeader, Flexbox, FlexboxItem, XInput,Badge} from 'vux'

  export default {
    name: "aidperson_test",
    components: {
      selectTab,
      XHeader, Flexbox, FlexboxItem, XInput,Badge
    },
    data() {
      return {

        selects: [

          {
            title: '用户类型',
            type: 2,
            typefor: 2,
            list_index: 1,//当前选中item
            list: ['全部', '贫困户', '非贫困户']
          },

          {
            title: '地域',
            type: 2,  //是否下拉形式
            typefor: 1,  //下拉样式
            ischeckbox: true, // true 多选   false 单选
            list_index: -1, //选中默认值
            demand: 1, //0 需求 1 地域
            list: [],  //tree数据，selecthttp.js 加载
          },

        ],

      }
    },
    methods: {
      getdatas(v) {
        console.log(v)
      },
      getsearch(v) {
        // console.log(v)
      },
      end() { //关闭select
        this.$refs.selectTab.end()
      }
    }
  }
</script>

<style scoped>
  /*搜索框*/
  .search-white >>> .weui-cell {
    border-radius: 5px
  }

  /*搜索结果数量和筛选*/
  .aid-infoarea {
    position: relative;
    padding: 5px 0;
    background: #fff;border-bottom: 1px solid #eee;
  }

  .select_tab {
    justify-content: flex-end
  }
  .select_tab>>>.opac{top:45px!important}
  .select_tab >>> .item {
    flex: 0 0 25% !important;
    font-size: 14px !important
  }

  .ser-resnum {
    position: absolute;
    left: 15px;
    top: 13px;
    z-index: 9999
  }

  /*用户列表*/
  .personlist {
    position: absolute;
    top: 110px;
    bottom: 0;
    left: 0;
    right: 0
  }

  .personlist * {
    box-sizing: border-box
  }
.vux-badge{box-sizing: content-box;margin-left: 5px;margin-top:4px}
  .list-group .list-letter {
    padding: 2px 15px
  }

  .list-group .list-item {
    padding: 12px 40px 12px 15px;
    border-bottom: 1px solid #eee
  }

  .list-group .list-item:last-child {
    border-width: 0
  }
  .list-group .list-item p{padding-top: 6px}
</style>
