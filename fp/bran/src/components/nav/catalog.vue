<template>
  <div class="box" v-show="catalog_show">
    <x-header :left-options="{backText: '',preventGoBack: true}" ref="ceshiheader" @on-click-back="end">
      栏目选择
    </x-header>
    <div class="box-withheader over-auto">
      <div class="cent item-wrap clearfix">
        <div class="item" v-for="(item,index) in datas" :key="index" @click="choice(item,index)">
          <span class="tit-nowrap">{{item.help_type_name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {XHeader} from 'vux'

  export default {
    components: {
      XHeader
    },
    data () {
      return {
        catalog_show: false
      }
    },
    props: ['datas'],
    methods: {
      choice (item, index) {
        this.$emit('goitem', item, index)
        this.end()
      },
      end () {
        this.catalog_show = false
      },
      show () {
        this.catalog_show = true
      }
    }
  }
</script>

<style lang="less" scoped>
  .box {
    position: absolute;
    left: 0;
    right:0;
    top: -48px;
    background: #fff;
    z-index: 9999;
    bottom: 100vh;
    height: 100vh;
    .end {
      padding-left: 5px;
    }
    .title {
      padding-left: 20px;
      font-size: 20px;
      color: #000;
      font-weight: bold;
      .detail {
        font-size: 12px;
        color: #666;
        font-weight: 500;
        margin-left: 5px;
      }
    }
    .cent {
      padding: 8px;
      box-sizing: border-box;
      padding-top: 20px;
      * {
        box-sizing: border-box;
      }
      .item {
        padding: 10px 7px;
        float: left;
        width: 33.333333%;
        span {
          display: block;
          border-radius: 3px;
          border: 1px solid #ccc;
          text-align: center;
          color: #666;
          width: 100%;
          padding: 10px 4px;
        }
      }
    }

  }
</style>
