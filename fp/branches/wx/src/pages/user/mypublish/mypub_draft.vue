<template>
  <div>
    <x-header :left-options="{backText: ''}">草稿箱
      <a slot="right" class="f-16" style="color:#999!important" @click="doManager">{{managername}}</a>
    </x-header>
    <div class="over-auto bg-f6f5f6" :class="isManager?'box-withbar':'box-withheader'">
      <!--总计-->
      <div class="f-14 list-total">共500条</div>
      <!--需求列表-->
      <div class="mypublist bg-ffffff mb-15" v-for="(item,index) in mypublist" :key="index">
        <div class="list-header clearfix">
          <check-icon :value.sync="item.ischeck" class="f_r" v-if="isManager"></check-icon>
          <span class="tit-nowrap color-333 f-16">受助人：{{item.name}}</span>
        </div>
        <div class="list-content">
          <router-link :to="item.url" class="dis-block linkonly">
            <div class="flex-tab">
              <div class="flex-tab-cell tab-left">
                <img :src="item.proimg" width="80">
              </div>
              <div class="flex-tab-cell tab-right">
                <h1 class="color-333 f-16 f-normal tit-nowrap">{{item.title}}</h1>
                <p class="color-999 f-14 tit-2row-nowrap">{{item.des}}</p>
              </div>
            </div>
          </router-link>
        </div>

        <!--待审核状态-->
        <div class="list-state clearfix">
          <router-link to="" class="f_r btn-bordered btn-bordered-gray f-14" style="margin-right: 0">继续编辑</router-link>
        </div>
      </div>
    </div>

    <!--底部全选-->
    <div class="fix-bottom btm-checkall clearfix bg-ffffff"  v-if="isManager">
      <check-icon :value.sync="allcheck"  class="f_l">全选</check-icon>
      <router-link to="" class="f_r btn-bordered btn-bordered-gray f-14" style="margin-right: 0">删除需求</router-link>
    </div>
  </div>
</template>

<script>
  import {XHeader, CheckIcon} from 'vux'

  export default {
    name: "mypub_draft",
    components: {XHeader, CheckIcon},
    data() {
      return {
        managername: '管理',
        isManager: false,
        allcheck:false,
        mypublist: [{
          url: '/capitaldetail',
          name: '马大帅',
          proimg: './static/appimg/pro-img.jpg',
          title: '不要让孩子失去美丽的童年',
          des: '请大家帮忙给孩子买个杯子，家境实在贫困，孩子上学喝水难',
          ischeck: false
        }, {
          url: '',
          name: '马大帅',
          proimg: './static/appimg/pro-img.jpg',
          title: '不要让孩子失去美丽的童年不要让孩子失去美丽的童年',
          des: '请大家帮忙给孩子买个杯子，家境实在贫困，孩子上学喝水难不要让孩子失去美丽的童年',
          ischeck: true
        }, {
          url: '',
          name: '马大帅',
          proimg: './static/appimg/pro-img.jpg',
          title: '不要让孩子失去美丽的童年',
          des: '请大家帮忙给孩子买个杯子，家境实在贫困，孩子上学喝水难',
          ischeck: false
        }]
      }

    },
    methods: {
      doManager: function () {
        this.isManager = !this.isManager;
        if (this.isManager === true) {
          this.managername = '完成'
        } else {
          this.managername = '管理'
        }

      }
    }
  }
</script>

<style scoped>
  .list-total {
    padding: 5px 15px
  }

  .list-topoperate em {
    padding: 6px 15px
  }

  .list-header {
    padding: 10px 15px;
    border-bottom: 1px solid #eee
  }

  .list-content {
    padding: 15px 15px
  }

  .list-content .tab-left {
    width: 90px
  }

  .list-content .tab-right {
    position: relative
  }

  .list-content .tab-right h1 {
    line-height: 100%;
  }

  .list-content .tab-right p {
    position: absolute;
    bottom: 0
  }

  .list-content .tab-right p span {
    padding-right: 10px;
  }

  .list-state {
    padding: 10px 15px;
    border-top: 1px solid #eee
  }

  /*选中状态*/

 .vux-check-icon >>> .weui-icon-success:before,  .vux-check-icon >>> .weui-icon-success-circle:before {
    color: #fd8b2a
  }

  .btm-checkall {
    padding: 13px;
    border-top: 1px solid #eee;
    box-shadow: 0 -1px 12px rgba(0,0,0,0.15);
  }

</style>
